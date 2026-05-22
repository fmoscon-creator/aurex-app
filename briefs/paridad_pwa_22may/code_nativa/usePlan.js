// Build 18 fix #10 + #11: hook reutilizable que devuelve el plan del usuario y lo refresca
// (a) al montar la screen
// (b) cada vez que la screen vuelve a foco (useFocusEffect)
// (c) cada vez que la app vuelve a foreground desde background (AppState)
// + fallback a AsyncStorage 'aurex_plan' si el backend no responde.
//
// Uso típico:
//   const { plan, loadPlan } = usePlan();
//   // plan === 'FREE' | 'PRO' | 'ELITE'

import { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, DeviceEventEmitter } from 'react-native';
import { supabase } from './supabase';

const BACKEND = 'https://aurex-app-production.up.railway.app';
const VALID = ['FREE', 'PRO', 'ELITE'];

// Build 18 fix #12 + #13: tipos de alerta permitidos por plan (espejo del backend PLAN_LIMITS en aurex-backend/server.js).
// Si cambia el backend, actualizar acá también.
export const PLAN_ALERT_TYPES = {
  FREE:  ['umbral', 'precio', 'porcentaje', 'precio_objetivo', 'variacion_brusca', 'max_min', 'apertura', 'rsi_extremo'],
  PRO:   ['umbral', 'precio', 'porcentaje', 'precio_objetivo', 'variacion_brusca', 'max_min', 'apertura', 'alta_conviccion_ia', 'cambio_senal', 'senal_portfolio', 'cambio_zona_pulse', 'por_categoria', 'termometro_riesgo', 'fed_fomc', 'cpi_pbi', 'earnings', 'rsi_extremo'],
  ELITE: ['umbral', 'precio', 'porcentaje', 'precio_objetivo', 'variacion_brusca', 'max_min', 'apertura', 'alta_conviccion_ia', 'cambio_senal', 'senal_portfolio', 'cambio_zona_pulse', 'por_categoria', 'termometro_riesgo', 'fed_fomc', 'cpi_pbi', 'earnings', 'geopolitica_gdelt', 'rsi_extremo'],
};

// Helper: ¿el plan actual permite este tipo de alerta?
export function planAllowsAlertType(plan, tipo) {
  const list = PLAN_ALERT_TYPES[(plan || 'FREE').toUpperCase()] || PLAN_ALERT_TYPES.FREE;
  return list.includes((tipo || '').toLowerCase());
}

export function usePlan() {
  const [plan, setPlan] = useState('FREE');

  const loadPlan = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const uid = session?.user?.id;
      if (!uid) {
        // Sin sesión → fallback cache local
        const cached = await AsyncStorage.getItem('aurex_plan');
        if (cached && VALID.includes(cached)) setPlan(cached);
        return;
      }
      const headers = session?.access_token ? { 'Authorization': `Bearer ${session.access_token}` } : {};
      const r = await fetch(`${BACKEND}/api/usuario/${uid}`, { headers });

      // Build 19 BUG P0 fix — Capa 2 self-heal: si la fila en tabla 'usuarios' no existe
      // (caso usuario nuevo donde Capa 1 falló en POST, o tester legacy sin fila),
      // crearla acá con plan='FREE' default y retry. Guard de email obligatorio para
      // no insertar basura. POST es idempotente (server.js:1375 hace select por email).
      if (r.status === 404) {
        const email = session?.user?.email;
        if (!email) {
          console.warn('[usePlan] session sin email, skip auto-heal');
          return;
        }
        try {
          const post = await fetch(`${BACKEND}/api/usuario`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...headers },
            body: JSON.stringify({ id: uid, email, plan: 'FREE' }),
          });
          if (!post.ok) return;
          const r2 = await fetch(`${BACKEND}/api/usuario/${uid}`, { headers });
          if (!r2.ok) return;
          const d2 = await r2.json();
          const p2 = String(d2?.plan || 'FREE').toUpperCase();
          if (VALID.includes(p2)) {
            setPlan(p2);
            try { await AsyncStorage.setItem('aurex_plan', p2); } catch {}
          }
          return;
        } catch (e) {
          console.warn('[usePlan] auto-heal POST fallo:', e.message);
          return;
        }
      }

      if (!r.ok) return;
      const d = await r.json();
      const p = String(d?.plan || 'FREE').toUpperCase();
      if (VALID.includes(p)) {
        setPlan(p);
        try { await AsyncStorage.setItem('aurex_plan', p); } catch {}
      }
    } catch (e) {
      // Fallback cache local si el backend no responde
      try {
        const cached = await AsyncStorage.getItem('aurex_plan');
        if (cached && VALID.includes(cached)) setPlan(cached);
      } catch {}
    }
  }, []);

  // Carga al montar
  useEffect(() => { loadPlan(); }, [loadPlan]);

  // Item #10: refresh cada vez que la screen vuelve a foco
  useFocusEffect(useCallback(() => { loadPlan(); }, [loadPlan]));

  // Item #11: refresh cuando la app vuelve a foreground (background → active)
  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') loadPlan();
    });
    return () => sub.remove();
  }, [loadPlan]);

  // Build 22 Bug #8: listener global plan_changed para que TODOS los consumers del hook
  // (UpsellBanner, Portfolio, Perfil, Mercados, etc) se refresquen automaticamente cuando
  // SubscriptionScreen emite el evento tras una compra/restore exitoso. Evita tener que
  // agregar listeners individuales en cada screen.
  useEffect(() => {
    const sub = DeviceEventEmitter.addListener('plan_changed', (data) => {
      if (data?.plan && VALID.includes(data.plan)) {
        setPlan(data.plan);
        AsyncStorage.setItem('aurex_plan', data.plan).catch(() => {});
      } else {
        // Sin payload con plan explicito → forzar reload desde backend
        loadPlan();
      }
    });
    return () => sub.remove();
  }, [loadPlan]);

  return { plan, loadPlan };
}
