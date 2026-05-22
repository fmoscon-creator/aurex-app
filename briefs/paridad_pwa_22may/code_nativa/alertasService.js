// AUREX alertasService — capa de datos para "Mis alertas" (Sistema B, Build 8)
// Lee/actualiza directo desde Supabase. RLS aplicado al schema de alertas_historial
// filtra por user_id automáticamente vía join con alertas.user_id = auth.uid().
// NO toca el backend Railway.

import { useState, useCallback, useEffect } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { supabase } from './supabase';

// Lista alertas del historial del user activas (no borradas).
export async function listAlertas() {
  try {
    // Build 13 fix bug 2: verificar sesión activa antes del query.
    // Si auth.uid() es null, RLS bloquea silenciosamente (0 filas, sin error).
    const { data: sessionData } = await supabase.auth.getSession();
    const uid = sessionData?.session?.user?.id;
    if (!uid) {
      console.warn('[alertasService] listAlertas: sin sesión activa');
      return { data: [], error: 'no-session' };
    }
    // Build 28 fix Bug 4+5: traer tambien campos config (direccion, valor_objetivo, precio_base, tipo, disparada_at)
    // del JOIN para que MisAlertasScreen card pueda mostrar UI correcta verde/rojo + config.
    // El JOIN devuelve objeto (FK 1:1 alertas_historial → alertas), accesible via a.alertas.X en frontend.
    const { data, error } = await supabase
      .from('alertas_historial')
      .select('id, alerta_id, simbolo, precio_disparado, created_at, leida, borrada, telegram_enviado, fcm_enviado, analisis_ia, alertas!inner(user_id, direccion, valor_objetivo, precio_base, tipo, disparada_at)')
      .eq('alertas.user_id', uid)
      .eq('borrada', false)
      .order('created_at', { ascending: false });
    if (error) {
      console.warn('[alertasService] listAlertas error:', error);
      return { data: [], error };
    }
    return { data: data || [], error: null };
  } catch (e) {
    console.warn('[alertasService] listAlertas exception:', e);
    return { data: [], error: e };
  }
}

// Cuenta alertas SIN LEER. head:true = solo count, no devuelve rows (perf).
export async function countUnread() {
  try {
    // Build 13 fix bug 2: verificar sesión activa + filtro explícito user_id
    const { data: sessionData } = await supabase.auth.getSession();
    const uid = sessionData?.session?.user?.id;
    if (!uid) return 0;
    const { count, error } = await supabase
      .from('alertas_historial')
      .select('id, alertas!inner(user_id)', { count: 'exact', head: true })
      .eq('alertas.user_id', uid)
      .eq('leida', false)
      .eq('borrada', false);
    if (error) return 0;
    return count || 0;
  } catch (e) {
    return 0;
  }
}

// Marca alertas como leídas. Recibe array de IDs.
export async function markAsRead(ids) {
  if (!Array.isArray(ids) || ids.length === 0) return { ok: false };
  try {
    const { error } = await supabase
      .from('alertas_historial')
      .update({ leida: true })
      .in('id', ids);
    return { ok: !error, error };
  } catch (e) {
    return { ok: false, error: e };
  }
}

// Borrado lógico (soft delete). Recibe array de IDs.
export async function softDelete(ids) {
  if (!Array.isArray(ids) || ids.length === 0) return { ok: false };
  try {
    const { error } = await supabase
      .from('alertas_historial')
      .update({ borrada: true })
      .in('id', ids);
    return { ok: !error, error };
  } catch (e) {
    return { ok: false, error: e };
  }
}

// Hook para usar en headers (BellButton): refresca el count cada vez que
// la screen vuelve a focus. No usa realtime (decisión Escritorio:
// Opción Focus para Build 8, Realtime queda para Build 9 si Fernando lo pide).
export function useUnreadAlertsCount() {
  const [count, setCount] = useState(0);

  const refresh = useCallback(async () => {
    const c = await countUnread();
    setCount(c);
  }, []);

  useFocusEffect(useCallback(() => {
    refresh();
  }, [refresh]));

  // Build 15 BUG F: refrescar badge cuando llega push foreground sin esperar
  // al próximo focus. Sincroniza con el toast disparado en App.js onForeground.
  useEffect(() => {
    const sub = DeviceEventEmitter.addListener('alerta_recibida', refresh);
    return () => sub.remove();
  }, [refresh]);

  return [count, refresh];
}
