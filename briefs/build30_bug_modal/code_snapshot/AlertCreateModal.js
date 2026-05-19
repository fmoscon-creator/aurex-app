// AUREX AlertCreateModal — mini-form para crear alerta puntual de precio (Build 8)
// Se usa desde TAP modal de Portfolio y panel expandido de Watchlist.
//
// Props:
//   visible: boolean
//   onClose: () => void
//   asset: { simbolo, tipo_activo, precio_actual }
//   userId: string (UUID del user en Supabase)
//   onCreated?: () => void (callback opcional tras crear)
//
// Comportamiento (mockup #6 Drive):
// - Dirección: Arriba (verde) / Abajo (rojo) — define color de acentos
// - Tipo: Precio $ (absoluto) o Porcentaje % (relativo al precio actual)
// - Conversión % → precio absoluto se hace en cliente al crear:
//     valor_objetivo = precio_actual * (1 ± valor/100)
//   Esto evita cambios de schema y mantiene compatibilidad con backend actual.
// - POST /api/alertas con { user_id, simbolo, tipo_activo, valor_objetivo, direccion }
// - On success: showToast con "Alerta creada. La verás aquí 🔔 cuando se dispare."

import React, { useState, useEffect, useMemo } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../lib/ThemeContext';
import { useT } from '../lib/i18n';
import { showToast } from './Toast';
import { supabase } from '../lib/supabase';
import PlanLimitModal from './PlanLimitModal';
import { useNavigation } from '@react-navigation/native';
import { mapTipoAlerta } from '../lib/alertas';

const BACKEND = 'https://aurex-app-production.up.railway.app';

const fmtP = (p) => {
  if (!p && p !== 0) return '---';
  if (p >= 1000) return '$' + Math.round(p).toLocaleString('es-AR');
  if (p >= 1) return '$' + p.toFixed(2);
  if (p >= 0.01) return '$' + p.toFixed(4);
  return '$' + p.toFixed(6);
};

export default function AlertCreateModal({ visible, onClose, asset, userId, onCreated }) {
  const { theme: C } = useTheme();
  const t = useT();
  const [direccion, setDireccion] = useState('arriba');
  const [tipo, setTipo] = useState('precio');
  const [valor, setValor] = useState('');
  const [submitting, setSubmitting] = useState(false);
  // Build 18 fix #7: paywall info cuando backend rechaza con 403 plan_limit_reached
  const [planLimitInfo, setPlanLimitInfo] = useState({ visible: false });
  const navigation = useNavigation();
  // Build 9 bug 6: leer userId real de supabase.auth (en vez del USER_ID hardcoded
  // que se pasaba por prop y causaba INSERT failure por foreign key constraint)
  const [realUserId, setRealUserId] = useState(null);
  // Build 10 fix 6.4: si pasados 5s no cargó realUserId, mostrar opción de retry
  const [authTimeout, setAuthTimeout] = useState(false);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user?.id) setRealUserId(data.user.id);
    }).catch(() => {});
    const timer = setTimeout(() => setAuthTimeout(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Build 10 fix 6.5 (bug 6b): resetear state cuando se abre el modal
  useEffect(() => {
    if (visible) {
      setValor('');
      setDireccion('arriba');
      setTipo('precio');
      setSubmitting(false);
    }
  }, [visible]);

  const isUp = direccion === 'arriba';
  const accentColor = isUp ? C.green : C.red;
  const accentBg = isUp ? `${C.green}1A` : `${C.red}1A`;
  const precioActual = asset?.precio_actual || 0;
  // Build 27 Bug 2.2: panel info collapsable explicando tipos de alerta
  const [showInfo, setShowInfo] = useState(false);

  // Build 27 Bug 2.1+2.2: valorObjetivo = precio absoluto destino (para preview y display al usuario).
  // - Para tipo 'precio' (precio_objetivo): destino = precio_actual + delta (delta = num si arriba, -num si abajo)
  // - Para tipo 'porcentaje' (variacion_brusca): destino = precio_actual * (1 ± num/100)
  const valorObjetivo = useMemo(() => {
    const num = parseFloat(valor);
    if (!num || num <= 0) return null;
    if (!precioActual) return null;
    if (tipo === 'precio') {
      return isUp ? precioActual + num : precioActual - num;
    }
    const factor = isUp ? 1 + (num / 100) : 1 - (num / 100);
    return precioActual * factor;
  }, [valor, tipo, isUp, precioActual]);

  // Build 27 Bug 2.1: valorEnviadoBackend = lo que viaja al backend en valor_objetivo.
  // - tipo 'precio' → DELTA absoluto en $ con signo segun direccion (+num o -num).
  //   Backend nuevo Build 27: target = precio_base + valor_objetivo.
  // - tipo 'porcentaje' → precio absoluto calculado (semantica vieja, NO usa precio_base, NO usa logica delta).
  const valorEnviadoBackend = useMemo(() => {
    const num = parseFloat(valor);
    if (!num || num <= 0) return null;
    if (tipo === 'precio') return isUp ? num : -num;
    // tipo === 'porcentaje' → precio absoluto calculado (igual que valorObjetivo)
    return valorObjetivo;
  }, [valor, tipo, isUp, valorObjetivo]);

  const handleSubmit = async () => {
    // Build 10 fix 6.3: console.log explícito visible en adb logcat para debug
    console.log('[crear-alerta] tap submit', {
      realUserId,
      userId,
      valor,
      valorObjetivo,
      asset: asset?.simbolo,
      submitting,
    });

    const uid = realUserId || userId;

    // Build 10 fix 6.2: validación inline con toast por cada caso
    // (en lugar de early return silencioso que dejaba al user sin feedback)
    if (submitting) {
      console.log('[crear-alerta] bloqueado: ya procesando');
      return;
    }
    if (!asset) {
      console.log('[crear-alerta] bloqueado: asset null');
      showToast({ title: '✕ Error', message: 'No se identificó el activo. Cerrá y reintentá.' });
      return;
    }
    if (!valorObjetivo) {
      console.log('[crear-alerta] bloqueado: valor inválido', { valor, parsed: parseFloat(valor) });
      showToast({ title: '✕ Falta el valor', message: 'Ingresá un valor mayor a 0.' });
      return;
    }
    if (!uid) {
      console.log('[crear-alerta] bloqueado: sesión no detectada');
      showToast({ title: '✕ Sesión', message: 'No se detectó tu sesión. Cerrá y reabrí la app.' });
      return;
    }

    setSubmitting(true);
    try {
      // Build 18 fix #7: agregar JWT en Authorization para que backend valide owner del recurso
      const { data: { session } } = await supabase.auth.getSession();
      const authHeader = session?.access_token ? { 'Authorization': `Bearer ${session.access_token}` } : {};
      const res = await fetch(`${BACKEND}/api/alertas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader },
        body: JSON.stringify({
          user_id: uid,
          simbolo: asset.simbolo,
          tipo_activo: asset.tipo_activo || 'accion',
          // Build 22 Bug #4: mapear 'precio' -> 'precio_objetivo', 'porcentaje' -> 'variacion_brusca'
          // para matchear los nombres canónicos del backend PLAN_LIMITS.
          tipo: mapTipoAlerta(tipo),
          // Build 27 Bug 2.1: valor enviado al backend:
          // - tipo 'precio' (precio_objetivo): DELTA con signo (+num o -num). Backend calcula target = precio_base + valor.
          // - tipo 'porcentaje' (variacion_brusca): precio absoluto calculado (semantica vieja, sin precio_base).
          valor_objetivo: valorEnviadoBackend,
          direccion: direccion,
        }),
      });
      console.log('[crear-alerta] response status', res.status);
      // Build 18 fix #7: manejar 403 plan_limit_reached con PlanLimitModal
      if (res.status === 403) {
        const errData = await res.json().catch(() => ({}));
        if (errData?.error === 'plan_limit_reached') {
          setSubmitting(false);
          setPlanLimitInfo({
            visible: true,
            plan: errData.plan || 'FREE',
            message: errData.message || `Tu plan no incluye alertas tipo "${tipo}". Pasate a PRO o ELITE.`,
          });
          return;
        }
      }
      if (!res.ok) {
        const errBody = await res.text().catch(() => '');
        throw new Error(`Backend ${res.status}: ${errBody.slice(0, 80)}`);
      }
      const created = t('alerta_creada');
      const dotIdx = created.indexOf('.');
      const title = dotIdx > 0 ? created.slice(0, dotIdx + 1) : created;
      const message = dotIdx > 0 ? created.slice(dotIdx + 1).trim() : '';
      showToast({ title, message });
      setValor('');
      if (typeof onCreated === 'function') onCreated();
      onClose();
    } catch (e) {
      console.warn('[crear-alerta] catch error:', e?.message || e);
      showToast({ title: '✕ Error', message: e?.message?.slice(0, 100) || 'Intentá de nuevo' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      {/* Build 30 B29-2 rediseno: KAV envolvente + flex-end (anclado abajo).
          Diferencia critica con Build 28: alli KAV envolvia justifyContent:'center' -> modal se iba arriba.
          Aqui KAV envuelve justifyContent:'flex-end' -> modal sube exactamente lo necesario desde abajo. */}
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.78)' }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={0}
          style={{ flex: 1 }}
        >
          <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 20, paddingHorizontal: 16 }}>
            <View style={{ backgroundColor: C.card, borderWidth: 2.5, borderColor: accentColor, borderRadius: 16, padding: 18, width: '100%', maxWidth: 320, maxHeight: Dimensions.get('window').height * 0.82 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <Text style={{ fontSize: 14, fontWeight: '800', color: accentColor, letterSpacing: 0.3 }}>
              {`\u{1F514} ${t('crear_alerta_precio')}`}
            </Text>
            <TouchableOpacity onPress={onClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Text style={{ fontSize: 20, color: C.textSec }}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Build 28 fix Bug 1+2: ScrollView interno toma espacio restante entre header y botones.
              Si contenido (asset preview + dir + tipo + leyenda + valor + preview destino) excede, scroll vertical.
              Si cabe, no aparece scrollbar. */}
          <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets={true} style={{ flexShrink: 1 }}>

          {asset ? (
            <View style={{ backgroundColor: accentBg, padding: 10, borderRadius: 8, marginBottom: 12, alignItems: 'center' }}>
              <Text style={{ fontSize: 16, fontWeight: '800', color: C.text }}>{asset.simbolo}</Text>
              {precioActual > 0 ? (
                <Text style={{ fontSize: 11, color: C.textSec, marginTop: 2 }}>{fmtP(precioActual)}</Text>
              ) : null}
            </View>
          ) : null}

          <Text style={{ fontSize: 11, color: C.textSec, fontWeight: '700', marginBottom: 6, letterSpacing: 0.3 }}>
            {(t('alerta_direccion') || 'Direccion').toUpperCase()}
          </Text>
          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
            <TouchableOpacity
              onPress={() => setDireccion('arriba')}
              style={{ flex: 1, backgroundColor: isUp ? C.green : C.bg, borderWidth: 1.5, borderColor: isUp ? C.green : C.border, borderRadius: 10, padding: 10, alignItems: 'center' }}
            >
              <Text style={{ fontSize: 12, fontWeight: '800', color: isUp ? '#fff' : C.text }}>{t('alerta_arriba')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setDireccion('abajo')}
              style={{ flex: 1, backgroundColor: !isUp ? C.red : C.bg, borderWidth: 1.5, borderColor: !isUp ? C.red : C.border, borderRadius: 10, padding: 10, alignItems: 'center' }}
            >
              <Text style={{ fontSize: 12, fontWeight: '800', color: !isUp ? '#fff' : C.text }}>{t('alerta_abajo')}</Text>
            </TouchableOpacity>
          </View>

          {/* Build 27 Bug 2.2: label TIPO + icono ⓘ tappable para abrir leyenda explicativa */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <Text style={{ fontSize: 11, color: C.textSec, fontWeight: '700', letterSpacing: 0.3 }}>
              {(t('alerta_tipo') || 'Tipo').toUpperCase()}
            </Text>
            <TouchableOpacity onPress={() => setShowInfo(!showInfo)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              {/* Build 28 fix Bug 3: color gold (neutral) en lugar de accentColor (verde/rojo) que se confundia con info alcista */}
              <Text style={{ fontSize: 14, color: C.gold, fontWeight: '700' }}>{showInfo ? '✕ Cerrar' : 'ⓘ ¿Cómo funciona?'}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
            <TouchableOpacity
              onPress={() => setTipo('precio')}
              style={{ flex: 1, backgroundColor: tipo === 'precio' ? accentColor : C.bg, borderWidth: 1.5, borderColor: tipo === 'precio' ? accentColor : C.border, borderRadius: 10, padding: 10, alignItems: 'center' }}
            >
              <Text style={{ fontSize: 12, fontWeight: '800', color: tipo === 'precio' ? '#fff' : C.text }}>{t('alerta_tipo_precio')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTipo('porcentaje')}
              style={{ flex: 1, backgroundColor: tipo === 'porcentaje' ? accentColor : C.bg, borderWidth: 1.5, borderColor: tipo === 'porcentaje' ? accentColor : C.border, borderRadius: 10, padding: 10, alignItems: 'center' }}
            >
              <Text style={{ fontSize: 12, fontWeight: '800', color: tipo === 'porcentaje' ? '#fff' : C.text }}>{t('alerta_tipo_porcentaje')}</Text>
            </TouchableOpacity>
          </View>

          <Text style={{ fontSize: 11, color: C.textSec, fontWeight: '700', marginBottom: 6, letterSpacing: 0.3 }}>
            {(t('alerta_valor_label') || 'Valor').toUpperCase()}
          </Text>
          <View style={{ alignItems: 'center', marginBottom: 6 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: accentColor, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4, maxWidth: 220, width: '100%' }}>
              <Text style={{ fontSize: 16, color: C.textSec, marginRight: 4, minWidth: 14 }}>{tipo === 'precio' ? '$' : ''}</Text>
              <TextInput
                value={valor}
                onChangeText={(v) => setValor(v.replace(/[^0-9.]/g, ''))}
                keyboardType="decimal-pad"
                placeholder="0.00"
                placeholderTextColor={C.textDim}
                style={{ flex: 1, fontSize: 18, fontWeight: '700', color: C.text, paddingVertical: 4, textAlign: 'center', minWidth: 80 }}
              />
              <Text style={{ fontSize: 16, color: C.textSec, marginLeft: 4, minWidth: 14, textAlign: 'right' }}>{tipo === 'porcentaje' ? '%' : ''}</Text>
            </View>
          </View>
          {/* Build 27 Bug 2.2: preview vivo enriquecido con 3 datos (precio actual + objetivo calculado + delta) */}
          {valorObjetivo && precioActual ? (
            <View style={{ backgroundColor: accentBg, borderWidth: 1, borderColor: accentColor + '60', borderRadius: 8, padding: 8, marginBottom: 6, marginTop: 4 }}>
              <Text style={{ fontSize: 11, color: C.textSec, textAlign: 'center', marginBottom: 2 }}>
                {`${asset?.simbolo || 'Activo'} ahora: `}
                <Text style={{ fontWeight: '700', color: C.text }}>{fmtP(precioActual)}</Text>
              </Text>
              <Text style={{ fontSize: 13, color: accentColor, textAlign: 'center', fontWeight: '800' }}>
                {`Dispara en ${fmtP(valorObjetivo)}`}
              </Text>
              <Text style={{ fontSize: 10, color: C.textSec, textAlign: 'center', fontStyle: 'italic', marginTop: 2 }}>
                {tipo === 'precio'
                  ? `(${isUp ? 'subió' : 'bajó'} $${parseFloat(valor) || 0})`
                  : `(${isUp ? 'subió' : 'bajó'} ${valor || 0}%)`}
              </Text>
            </View>
          ) : null}

          {/* Build 28 fix Bug 1+2: cierre ScrollView interno. Botones siguientes quedan FIJOS al footer del modal. */}
          </ScrollView>

          <View style={{ flexDirection: 'row', gap: 8, marginTop: 14 }}>
            <TouchableOpacity
              onPress={onClose}
              style={{ borderWidth: 1.5, borderColor: C.border, borderRadius: 10, padding: 12, paddingHorizontal: 16 }}
            >
              <Text style={{ fontSize: 13, fontWeight: '700', color: C.textSec }}>{t('cancelar')}</Text>
            </TouchableOpacity>
            {/* Build 10 fix 6.1 + 6.4: aceptar tap siempre, mostrar spinner si auth no cargó.
                La validación se hizo inline en handleSubmit con toast específico por caso. */}
            <TouchableOpacity
              onPress={handleSubmit}
              activeOpacity={0.7}
              style={{ flex: 1, backgroundColor: accentColor, borderRadius: 10, padding: 12, alignItems: 'center', opacity: submitting ? 0.5 : 1, flexDirection: 'row', justifyContent: 'center', gap: 8 }}
            >
              {!realUserId && !authTimeout ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : null}
              <Text style={{ fontSize: 13, fontWeight: '800', color: '#fff' }}>
                {`\u{1F514} ${t('crear_alerta_corto')}`}
              </Text>
            </TouchableOpacity>
          </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
      {/* Build 29 B28-1: leyenda ⓘ ahora como Modal secundario independiente.
          Patron copiado de MisAlertasScreen showHelp. NO afecta layout del modal padre.
          maxHeight 60% + ScrollView interno + cerrar X arriba a la derecha. */}
      <Modal visible={showInfo} transparent animationType="fade" onRequestClose={() => setShowInfo(false)} statusBarTranslucent={true}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center', padding: 16 }}>
          <View style={{ backgroundColor: C.card, borderWidth: 2, borderColor: C.gold, borderRadius: 16, padding: 18, width: '100%', maxWidth: 320, maxHeight: Dimensions.get('window').height * 0.6 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <Text style={{ fontSize: 14, fontWeight: '800', color: C.gold, letterSpacing: 0.3 }}>ⓘ ¿Cómo funciona?</Text>
              <TouchableOpacity onPress={() => setShowInfo(false)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Text style={{ fontSize: 20, color: C.textSec }}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ backgroundColor: C.bg, borderWidth: 1, borderColor: C.border, borderRadius: 10, padding: 12, marginBottom: 10 }}>
                <Text style={{ fontSize: 12, color: C.text, lineHeight: 18, marginBottom: 8 }}>
                  <Text style={{ fontWeight: '800', color: accentColor }}>$ Precio</Text>
                  {`: te avisa cuando el precio sube o baja $X desde ahora.\n`}
                  <Text style={{ fontStyle: 'italic', color: C.textSec }}>{`Ej: ${asset?.simbolo || 'BTC'} ahora ${fmtP(precioActual)} + alerta arriba "1" → te avisa al llegar a ${fmtP(precioActual ? precioActual + 1 : 0)}.`}</Text>
                </Text>
                <Text style={{ fontSize: 12, color: C.text, lineHeight: 18 }}>
                  <Text style={{ fontWeight: '800', color: accentColor }}>% Porcentaje</Text>
                  {`: te avisa cuando el precio cambia X% desde ahora.\n`}
                  <Text style={{ fontStyle: 'italic', color: C.textSec }}>{`Ej: ${asset?.simbolo || 'BTC'} ahora ${fmtP(precioActual)} + alerta arriba "1%" → te avisa al llegar a ${fmtP(precioActual ? precioActual * 1.01 : 0)}.`}</Text>
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Build 18 fix #7: paywall cuando backend rechaza por plan_limit_reached */}
      <PlanLimitModal
        visible={planLimitInfo.visible}
        plan={planLimitInfo.plan}
        message={planLimitInfo.message}
        onClose={() => setPlanLimitInfo({ visible: false })}
        onUpgrade={() => {
          setPlanLimitInfo({ visible: false });
          onClose(); // cerrar también el modal de creación de alerta
          try { navigation.navigate('Subscription'); } catch {}
        }}
      />
    </Modal>
  );
}
