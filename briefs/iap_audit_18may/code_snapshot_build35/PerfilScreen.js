import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, Alert, Switch, Linking, Image, Modal, DeviceEventEmitter,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../lib/supabase';
import Purchases from 'react-native-purchases'; // Build 34 IAP-4/IAP-6: desidentificar RC en logout/deleteAccount
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AurexLogo from '../components/AurexLogo';
import BellButton from '../components/BellButton';
import ComoUsarAurexBlock from '../components/ComoUsarAurexBlock';
import UpsellBanner from '../components/UpsellBanner';
import { useT, setLang, getLang } from '../lib/i18n';
import ReactNativeBiometrics from 'react-native-biometrics';
import { APP_VERSION } from '../lib/version';

import { useTheme } from '../lib/ThemeContext';

const getBloques = (t) => [
  { id: 'b1', title: t('usuario'), icon: '👤' },
  { id: 'b2', title: t('plan_actual'), icon: '⭐' },
  { id: 'b3', title: t('mi_cuenta'), icon: '⚙️' },
  { id: 'b3b', title: t('como_usar_aurex'), icon: '❓' },
  { id: 'b4', title: t('preferencias'), icon: '🎨' },
  { id: 'b5', title: t('seguridad'), icon: '🔒' },
  { id: 'b6', title: t('alertas'), icon: '🔔' },
  { id: 'b7', title: t('notificaciones'), icon: '📩' },
  { id: 'b8', title: t('soporte'), icon: '💬' },
  { id: 'b9', title: t('sesion'), icon: '🚪' },
];

export default function PerfilScreen({ navigation }) {
  const { theme: C, preference: themePref, setPreference: setThemePref } = useTheme();
  const st = useMemo(() => makeStyles(C), [C]);
  const t = useT();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState({ b1: true });
  const [nombre, setNombre] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  // Build 18 fix #3: plan dinámico, se carga del backend al montar (antes era hardcoded 'FREE')
  const [plan, setPlan] = useState('FREE');
  const [darkMode] = useState(true);
  const [pulseOn, setPulseOn] = useState(true);
  const [notifPush, setNotifPush] = useState(true);
  const [notifResumen, setNotifResumen] = useState(true);
  const [notifNews, setNotifNews] = useState(true);
  const [notifNovedades, setNotifNovedades] = useState(true);
  const [alertPrecio, setAlertPrecio] = useState(true);
  const [alertIA, setAlertIA] = useState(true);
  const [alertVariacion, setAlertVariacion] = useState(true);
  const [alertPulse, setAlertPulse] = useState(true);
  const [deleteEmail, setDeleteEmail] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [avatarUri, setAvatarUri] = useState(null);
  const [telefono, setTelefono] = useState('');
  const [alertMaster, setAlertMaster] = useState(true);
  const [horaResumen, setHoraResumen] = useState('09:00');
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [planTab, setPlanTab] = useState('FREE');
  const [showFAQ, setShowFAQ] = useState(false);
  const [proBilling, setProBilling] = useState('monthly');
  const [eliteBilling, setEliteBilling] = useState('monthly');
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [showLegal, setShowLegal] = useState(false);

  // Idioma actual leído directo del global i18n (siempre sincronizado)
  // useT() arriba ya dispara re-render cuando cambia el idioma
  const idioma = getLang();
  // Nombre del idioma SIN bandera (la bandera se muestra aparte en el botón)
  const IDIOMAS = { es: 'Español', en: 'English', pt: 'Português', zh: '中文', fr: 'Français', it: 'Italiano', hi: 'हिन्दी', ar: 'العربية' };

  // Cargar datos persistidos + sesión
  useEffect(() => {
    (async () => {
      // Cargar preferencias guardadas
      const saved = await AsyncStorage.multiGet([
        'perfil_telefono', 'perfil_avatar', 'perfil_idioma', 'perfil_hora_resumen',
        'perfil_alert_master', 'perfil_alert_precio', 'perfil_alert_ia',
        'perfil_alert_variacion', 'perfil_alert_pulse',
        'perfil_notif_push', 'perfil_notif_resumen', 'perfil_notif_news', 'perfil_notif_novedades',
        'perfil_biometric',
      ]);
      const map = Object.fromEntries(saved.filter(([,v]) => v !== null));
      if (map.perfil_telefono) setTelefono(map.perfil_telefono);
      if (map.perfil_avatar) setAvatarUri(map.perfil_avatar);
      // perfil_idioma ya se carga automáticamente en i18n.loadLang() al arranque de la app
      if (map.perfil_hora_resumen) setHoraResumen(map.perfil_hora_resumen);
      if (map.perfil_alert_master) setAlertMaster(map.perfil_alert_master === 'true');
      if (map.perfil_alert_precio) setAlertPrecio(map.perfil_alert_precio === 'true');
      if (map.perfil_alert_ia) setAlertIA(map.perfil_alert_ia === 'true');
      if (map.perfil_alert_variacion) setAlertVariacion(map.perfil_alert_variacion === 'true');
      if (map.perfil_alert_pulse) setAlertPulse(map.perfil_alert_pulse === 'true');
      if (map.perfil_notif_push) setNotifPush(map.perfil_notif_push === 'true');
      if (map.perfil_notif_resumen) setNotifResumen(map.perfil_notif_resumen === 'true');
      if (map.perfil_notif_news) setNotifNews(map.perfil_notif_news === 'true');
      if (map.perfil_notif_novedades) setNotifNovedades(map.perfil_notif_novedades === 'true');

      // Biometrics
      if (map.perfil_biometric === 'true') setBiometricEnabled(true);
      try {
        const rnBiometrics = new ReactNativeBiometrics();
        const result = await rnBiometrics.isSensorAvailable();
        console.log('[AUREX Biometric] available:', result.available, 'type:', result.biometryType, 'error:', result.error);
        // Permitir toggle si sensor disponible
        setBiometricAvailable(!!result.available);
      } catch (e) {
        console.log('[AUREX Biometric] exception:', e.message);
        setBiometricAvailable(false);
      }

      // Cargar email guardado como fallback inmediato
      const savedEmail = await AsyncStorage.getItem('perfil_email');
      const savedNombre = await AsyncStorage.getItem('perfil_nombre');
      if (savedEmail) setUser({ email: savedEmail });
      if (savedNombre) setNombre(savedNombre);

      // Función para aplicar datos de sesión
      const applySession = async (sessionUser) => {
        if (!sessionUser) return;
        setUser(sessionUser);
        await AsyncStorage.setItem('perfil_email', sessionUser.email || '');
        const storedName = await AsyncStorage.getItem('perfil_nombre');
        const finalNombre = storedName || sessionUser.user_metadata?.nombre || sessionUser.email?.split('@')[0] || 'Usuario';
        setNombre(finalNombre);
        if (!storedName) await AsyncStorage.setItem('perfil_nombre', finalNombre);
        if (!map.perfil_telefono) {
          const tel = sessionUser.user_metadata?.telefono || sessionUser.phone || '';
          setTelefono(tel);
          await AsyncStorage.setItem('perfil_telefono', tel);
        }
      };

      // Sesión — leer la actual. Si no hay, App.js bootstrap ya manejó el redirect a Login.
      // Build 18 fix #1: ELIMINADO auto-login hardcoded con credenciales fmoscon@gmail.com/fm31012000 en texto plano.
      // Razón: ese auto-login causaba que TODOS los usuarios Android terminaran logueados como Fernando.
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) { await applySession(session.user); return; }
      } catch {}
    })();

    // Listener: reacciona a cambios de sesión (ej: login desde otra pantalla)
    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(session.user);
        await AsyncStorage.setItem('perfil_email', session.user.email || '');
        const storedName = await AsyncStorage.getItem('perfil_nombre');
        if (!storedName) {
          const n = session.user.user_metadata?.nombre || session.user.email?.split('@')[0] || 'Usuario';
          setNombre(n);
          await AsyncStorage.setItem('perfil_nombre', n);
        }
      }
    });
    return () => sub?.subscription?.unsubscribe();
  }, []);

  // Sincronizar nombre con email cuando user carga y nombre está vacío
  useEffect(() => {
    if (user?.email && !nombre) {
      const derived = user.user_metadata?.nombre || user.email.split('@')[0] || 'Usuario';
      setNombre(derived);
      AsyncStorage.setItem('perfil_nombre', derived);
    }
  }, [user]);

  // Build 18 fix #3 (refinado): cargar plan real del usuario cada vez que el tab Perfil gana foco.
  // Antes era useEffect con [user?.id] → race condition al primer mount post-login: si user.id se setea
  // después de que el useEffect ejecutó, el fetch nunca dispara hasta que el usuario navegue fuera y vuelva.
  // useFocusEffect + lectura directa de supabase.auth.getSession garantiza que dispara con sesión real.
  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          // Leer la sesión directamente para evitar la race condition con el state local de user
          const { data: { session } } = await supabase.auth.getSession();
          const uid = session?.user?.id;
          if (!uid) {
            // Sin sesión: fallback al cache local si existe
            const cached = await AsyncStorage.getItem('aurex_plan');
            if (cached && ['FREE', 'PRO', 'ELITE'].includes(cached)) setPlan(cached);
            return;
          }
          const headers = session?.access_token ? { 'Authorization': `Bearer ${session.access_token}` } : {};
          const r = await fetch(`https://aurex-app-production.up.railway.app/api/usuario/${uid}`, { headers });
          if (!r.ok) return;
          const data = await r.json();
          const p = String(data?.plan || 'FREE').toUpperCase();
          if (['FREE', 'PRO', 'ELITE'].includes(p)) {
            setPlan(p);
            try { await AsyncStorage.setItem('aurex_plan', p); } catch {}
          }
        } catch (e) {
          // Fallback: cache local si el backend no responde
          try {
            const cached = await AsyncStorage.getItem('aurex_plan');
            if (cached && ['FREE', 'PRO', 'ELITE'].includes(cached)) setPlan(cached);
          } catch {}
        }
      })();
    }, [])
  );

  // Helpers para guardar con persistencia
  const saveToggle = (key, val, setter) => { setter(val); AsyncStorage.setItem(key, String(val)); };
  const savePref = (key, val, setter) => { setter(val); AsyncStorage.setItem(key, val); };

  const toggle = (id) => setOpen(prev => ({ ...prev, [id]: !prev[id] }));

  const saveNombre = async () => {
    const { error } = await supabase.auth.updateUser({ data: { nombre } });
    if (error) Alert.alert(t('error'), error.message);
    else {
      await AsyncStorage.setItem('perfil_nombre', nombre);
      Alert.alert(t('listo'), t('nombre_actualizado'));
    }
  };

  const savePwd = async () => {
    if (newPwd.length < 6) { Alert.alert(t('error'), t('minimo_6')); return; }
    if (newPwd !== confirmPwd) { Alert.alert(t('error'), t('contrasenas_no_coinciden')); return; }
    const { error } = await supabase.auth.updateUser({ password: newPwd });
    if (error) Alert.alert(t('error'), error.message);
    else { Alert.alert(t('listo'), t('contrasena_actualizada')); setNewPwd(''); setConfirmPwd(''); }
  };

  // Build 18 fix #4: logout correcto.
  // Antes: signOut() podía fallar silenciosamente si el token expiró → sesión sucia → al reabrir, usuario quedaba "logueado" otra vez.
  // Ahora: refresh primero para que el token esté limpio → signOut → clear storage → navegar a Login (no esperar reinicio de app).
  const logout = async () => {
    try {
      // 1. Intentar refrescar token. Si falla (offline o token muerto), igual seguimos al signOut.
      try { await supabase.auth.refreshSession(); } catch {}
      // Build 34 IAP-4: desidentificar RC ANTES de cerrar sesion Supabase
      // (para que el proximo login con OTRO usuario no herede el UID del anterior en RC)
      try { await Purchases.logOut(); } catch (e) { console.warn('[IAP-4] Purchases.logOut fallo:', e?.message); }
      // 2. SignOut del cliente Supabase
      await supabase.auth.signOut();
      // 3. Limpiar TODO el storage local (incluye plan cache, FCM token, preferencias, etc.)
      await AsyncStorage.clear();
      // 4. Resetear navegación a LoginScreen — root navigator se entera de la sesión nula
      //    via supabase.auth.onAuthStateChange ya configurado en App.js.
      Alert.alert(t('sesion_cerrada'), t('reinicia_app'));
    } catch (e) {
      console.warn('[logout] error:', e?.message);
      // Aún si falla, asegurar que el storage queda limpio para no dejar sesión sucia
      try { await AsyncStorage.clear(); } catch {}
    }
  };

  const deleteAccount = async () => {
    if (deleteEmail !== user?.email) { Alert.alert(t('error'), t('email_no_coincide')); return; }
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch('https://dklljnfhlzmfsfmxrpie.supabase.co/functions/v1/delete-account', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${session?.access_token}`, 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        Alert.alert(t('cuenta_eliminada'), t('hasta_pronto'));
        // Build 34 IAP-6: desidentificar RC ANTES de cerrar sesion Supabase (consistencia con IAP-4)
        try { await Purchases.logOut(); } catch (e) { console.warn('[IAP-6] Purchases.logOut fallo:', e?.message); }
        await supabase.auth.signOut();
      } else {
        const err = await res.json();
        Alert.alert(t('error'), err.message || t('no_eliminar_cuenta'));
      }
    } catch (e) {
      // Build 22 Bug #6: log + fallback
      console.error('[PerfilScreen] deleteAccount failed:', e);
      Alert.alert('Error', e.message || e.toString() || t('no_eliminar_cuenta'));
    }
  };

  // Build 22 Bug #8: escuchar evento 'plan_changed' emitido desde SubscriptionScreen
  // tras una compra exitosa para refrescar el plan en pantalla sin esperar al backend.
  useEffect(() => {
    const sub = DeviceEventEmitter.addListener('plan_changed', (data) => {
      if (data?.plan && ['FREE', 'PRO', 'ELITE'].includes(data.plan)) {
        console.log('[PerfilScreen] plan_changed event recibido:', data);
        setPlan(data.plan);
      }
    });
    return () => sub.remove();
  }, []);

  // Nombre para mostrar: nombre guardado → del email → "Usuario/User"
  const displayName = nombre || (user?.email ? user.email.split('@')[0] : t('usuario'));
  const initial = displayName ? displayName.charAt(0).toUpperCase() : '?';
  const planColor = plan === 'PRO' ? '#A78BFA' : plan === 'ELITE' ? '#D4A017' : '#8B949E';

  const renderBloque = (bloque) => {
    const isOpen = open[bloque.id];
    return (
      <React.Fragment key={bloque.id}>
        {bloque.id === 'b9' && (
          <TouchableOpacity style={[st.bloque, { flexDirection: 'row', alignItems: 'center', padding: 12, gap: 10 }]} onPress={() => setShowLegal(true)}>
            <Text style={st.bloqueIcon}>⚖️</Text>
            <Text style={[st.bloqueTitle, { flex: 1 }]}>{t('aviso_legal_card_label')}</Text>
            <Text style={st.bloqueArrow}>›</Text>
          </TouchableOpacity>
        )}
        <View style={st.bloque}>
          <TouchableOpacity style={st.bloqueHeader} onPress={() => toggle(bloque.id)}>
            <Text style={st.bloqueIcon}>{bloque.icon}</Text>
            <Text style={st.bloqueTitle}>{{ b1: t('usuario'), b2: t('plan_actual'), b3: t('mi_cuenta'), b4: t('preferencias'), b5: t('seguridad'), b6: t('alertas'), b7: t('notificaciones'), b8: t('soporte'), b9: t('sesion') }[bloque.id] || bloque.title}</Text>
            <Text style={st.bloqueArrow}>{isOpen ? '▲' : '▼'}</Text>
          </TouchableOpacity>
          {isOpen && <View style={st.bloqueBody}>{renderContent(bloque.id)}</View>}
        </View>
      </React.Fragment>
    );
  };

  const renderContent = (id) => {
    switch (id) {
      case 'b1':
        return (
          <View style={st.section}>
            <View style={st.avatarWrap}>
              {/* Avatar editable — tap para cambiar foto */}
              <TouchableOpacity onPress={() => {
                launchImageLibrary({ mediaType: 'photo', maxWidth: 400, maxHeight: 400, quality: 0.7, includeBase64: true }, async (response) => {
                  if (!response.assets?.[0]) return;
                  const asset = response.assets[0];
                  const userId = user?.id;
                  if (!userId) { Alert.alert('Foto', 'No hay sesión activa'); return; }
                  try {
                    // Obtener base64 (directo del picker, o fallback con fetch+FileReader)
                    let b64 = asset.base64;
                    if (!b64 && asset.uri) {
                      const res = await fetch(asset.uri);
                      const blob = await res.blob();
                      const dataUri = await new Promise((resolve, reject) => {
                        const r = new FileReader();
                        r.onloadend = () => resolve(r.result);
                        r.onerror = reject;
                        r.readAsDataURL(blob);
                      });
                      b64 = dataUri.split(',')[1];
                    }
                    if (!b64) { Alert.alert('Foto', 'No se pudo leer la imagen'); return; }
                    // Subir via backend Railway (admin key, bypassa RLS del bucket)
                    const res = await fetch('https://aurex-app-production.up.railway.app/api/avatar', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ user_id: userId, base64: b64, content_type: asset.type || 'image/jpeg' }),
                    });
                    const payload = await res.json();
                    if (!res.ok || !payload.url) {
                      Alert.alert('Foto', 'Error al subir: ' + (payload.error || res.status));
                      return;
                    }
                    setAvatarUri(payload.url);
                    await AsyncStorage.setItem('perfil_avatar', payload.url);
                  } catch (e) {
                    Alert.alert('Foto', 'Error: ' + (e.message || String(e)));
                  }
                });
              }} style={{ position: 'relative' }}>
                {avatarUri ? (
                  <Image source={{ uri: avatarUri }} style={st.avatar} />
                ) : (
                  <View style={st.avatar}><Text style={st.avatarText}>{initial}</Text></View>
                )}
                <View style={{ position: 'absolute', bottom: 0, right: 0, width: 24, height: 24, borderRadius: 12, backgroundColor: C.gold, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 12 }}>📷</Text>
                </View>
              </TouchableOpacity>
              <Text style={st.userName}>{displayName}</Text>
              <Text style={st.userEmail}>{user?.email || ''}</Text>
              {telefono ? <View style={{ backgroundColor: '#D4A01730', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3, marginTop: 4 }}><Text style={{ fontSize: 11, color: C.gold }}>{telefono}</Text></View> : null}
              <View style={[st.planBadge, { backgroundColor: `${planColor}20`, borderColor: `${planColor}50`, marginTop: 8 }]}>
                <Text style={[st.planBadgeText, { color: planColor }]}>{t('plan_badge')} {plan}</Text>
              </View>
            </View>
          </View>
        );
      case 'b2':
        return (
          <View style={st.section}>
            <Text style={{ fontSize: 16, fontWeight: '700', color: C.text, textAlign: 'center', marginBottom: 4 }}>{t('elegir_plan')}</Text>
            <Text style={{ fontSize: 11, color: C.textSec, textAlign: 'center', marginBottom: 12 }}>{t('todos_planes_incluyen')}</Text>

            {/* Tabs FREE / PRO / ELITE */}
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 14 }}>
              {[
                { key: 'FREE', color: '#8B949E', border: '#8B949E' },
                { key: 'PRO', color: '#A78BFA', border: '#A78BFA' },
                { key: 'ELITE', color: '#D4A017', border: '#D4A017' },
              ].map(p => (
                <TouchableOpacity key={p.key} onPress={() => setPlanTab(p.key)} style={{ flex: 1, paddingVertical: 8, borderRadius: 8, borderWidth: 1.5, borderColor: planTab === p.key ? p.color : C.border, backgroundColor: planTab === p.key ? `${p.color}20` : 'transparent', alignItems: 'center' }}>
                  <Text style={{ fontSize: 12, fontWeight: '700', color: planTab === p.key ? p.color : C.textSec }}>{p.key}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Detalle del plan seleccionado */}
            {planTab === 'FREE' && (
              <View style={{ backgroundColor: C.bg, borderRadius: 12, padding: 14, borderWidth: 2, borderColor: '#8B949E' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <View><Text style={{ fontSize: 18, fontWeight: '700', color: '#8B949E' }}>FREE</Text><Text style={{ fontSize: 10, color: C.textSec, marginTop: 2 }}>{t('para_empezar_explorar')}</Text></View>
                  <Text style={{ fontSize: 18, fontWeight: '700', color: '#8B949E' }}>$0<Text style={{ fontSize: 11, fontWeight: '400' }}> {t('por_mes')}</Text></Text>
                </View>
                {[t('plan_free_f1'), t('plan_free_f2'), t('plan_free_f3'), t('plan_free_f4'), t('plan_free_f5'), t('plan_free_f6'), t('plan_free_f7'), t('plan_free_f8')].map((f, i) => (
                  <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                    <Text style={{ fontSize: 12, color: '#3FB950' }}>✓</Text>
                    <Text style={{ fontSize: 12, color: C.text }}>{f}</Text>
                  </View>
                ))}
              </View>
            )}

            {planTab === 'PRO' && (
              <View style={{ backgroundColor: C.bg, borderRadius: 12, padding: 14, borderWidth: 2, borderColor: '#A78BFA' }}>
                <View style={{ alignSelf: 'center', backgroundColor: '#A78BFA', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 2, marginBottom: 8 }}>
                  <Text style={{ fontSize: 9, fontWeight: '800', color: '#000' }}>{t('mas_popular_badge')}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                  <View><Text style={{ fontSize: 18, fontWeight: '700', color: '#A78BFA' }}>PRO</Text><Text style={{ fontSize: 10, color: C.textSec, marginTop: 2 }}>{t('para_inversor_activo')}</Text></View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{ fontSize: 18, fontWeight: '700', color: C.text }}>{proBilling === 'monthly' ? '$9,99' : '$89,99'}<Text style={{ fontSize: 11, fontWeight: '400' }}>{proBilling === 'monthly' ? ' ' + t('por_mes') : ' ' + t('por_anio')}</Text></Text>
                    {proBilling === 'annual' && <Text style={{ fontSize: 9, color: '#A78BFA' }}>{t('ahorra_25')}</Text>}
                  </View>
                </View>
                {/* Selector Mensual / Anual */}
                <View style={{ flexDirection: 'row', gap: 8, marginVertical: 10 }}>
                  <TouchableOpacity onPress={() => setProBilling('monthly')} style={{ flex: 1, paddingVertical: 8, borderRadius: 8, borderWidth: 1.5, borderColor: proBilling === 'monthly' ? '#A78BFA' : C.border, backgroundColor: proBilling === 'monthly' ? '#A78BFA20' : 'transparent', alignItems: 'center' }}>
                    <Text style={{ fontSize: 11, fontWeight: '700', color: proBilling === 'monthly' ? '#A78BFA' : C.textSec }}>{t('mensual')}</Text>
                    <Text style={{ fontSize: 10, color: C.textSec }}>$9,99{t('por_mes')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setProBilling('annual')} style={{ flex: 1, paddingVertical: 8, borderRadius: 8, borderWidth: 1.5, borderColor: proBilling === 'annual' ? '#A78BFA' : C.border, backgroundColor: proBilling === 'annual' ? '#A78BFA20' : 'transparent', alignItems: 'center' }}>
                    <Text style={{ fontSize: 11, fontWeight: '700', color: proBilling === 'annual' ? '#A78BFA' : C.textSec }}>{t('anual')}</Text>
                    <Text style={{ fontSize: 10, color: C.textSec }}>$89,99{t('por_anio')}</Text>
                  </TouchableOpacity>
                </View>
                {[t('plan_pro_f1'), t('plan_pro_f2'), t('plan_pro_f3'), t('plan_pro_f4'), t('plan_pro_f5'), t('plan_pro_f6'), t('plan_pro_f7')].map((f, i) => (
                  <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                    <Text style={{ fontSize: 12, color: '#A78BFA' }}>✓</Text>
                    <Text style={{ fontSize: 12, color: C.text }}>{f}</Text>
                  </View>
                ))}
                {[t('plan_pro_x1'), t('plan_pro_x2')].map((f, i) => (
                  <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                    <Text style={{ fontSize: 12, color: C.textSec }}>✕</Text>
                    <Text style={{ fontSize: 12, color: C.textSec }}>{f}{i === 1 ? '  SOON' : ''}</Text>
                  </View>
                ))}
                <TouchableOpacity style={{ backgroundColor: '#A78BFA', borderRadius: 10, padding: 14, alignItems: 'center', marginTop: 10 }} onPress={async () => {
                  try {
                    const Purchases = require('react-native-purchases').default;
                    const productId = proBilling === 'monthly' ? 'com.fernandomoscon.aurex.pro.monthly' : 'com.fernandomoscon.aurex.pro.annual';
                    const { customerInfo } = await Purchases.purchaseProduct(productId);
                    if (customerInfo.entitlements.active['pro']) Alert.alert(t('bienvenido_pro'), t('plan_activado'));
                  } catch (e) { if (!e.userCancelled) Alert.alert('Error', e.message); }
                }}>
                  <Text style={{ fontSize: 14, fontWeight: '700', color: '#000' }}>{proBilling === 'monthly' ? t('quiero_pro') : t('pro_anual_btn')}</Text>
                </TouchableOpacity>
              </View>
            )}

            {planTab === 'ELITE' && (
              <View style={{ backgroundColor: C.bg, borderRadius: 12, padding: 14, borderWidth: 2, borderColor: '#D4A017' }}>
                <View style={{ alignSelf: 'center', backgroundColor: '#D4A017', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 2, marginBottom: 8 }}>
                  <Text style={{ fontSize: 9, fontWeight: '800', color: '#000' }}>{t('recomendado_badge')}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                  <View><Text style={{ fontSize: 18, fontWeight: '700', color: '#D4A017' }}>ELITE</Text><Text style={{ fontSize: 10, color: C.textSec, marginTop: 2 }}>{t('para_inversor_profesional')}</Text></View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{ fontSize: 18, fontWeight: '700', color: C.text }}>{eliteBilling === 'monthly' ? '$19,99' : '$179,99'}<Text style={{ fontSize: 11, fontWeight: '400' }}>{eliteBilling === 'monthly' ? ' ' + t('por_mes') : ' ' + t('por_anio')}</Text></Text>
                    {eliteBilling === 'annual' && <Text style={{ fontSize: 9, color: '#D4A017' }}>{t('ahorra_25')}</Text>}
                  </View>
                </View>
                {/* Selector Mensual / Anual */}
                <View style={{ flexDirection: 'row', gap: 8, marginVertical: 10 }}>
                  <TouchableOpacity onPress={() => setEliteBilling('monthly')} style={{ flex: 1, paddingVertical: 8, borderRadius: 8, borderWidth: 1.5, borderColor: eliteBilling === 'monthly' ? '#D4A017' : C.border, backgroundColor: eliteBilling === 'monthly' ? '#D4A01720' : 'transparent', alignItems: 'center' }}>
                    <Text style={{ fontSize: 11, fontWeight: '700', color: eliteBilling === 'monthly' ? '#D4A017' : C.textSec }}>{t('mensual')}</Text>
                    <Text style={{ fontSize: 10, color: C.textSec }}>$19,99{t('por_mes')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setEliteBilling('annual')} style={{ flex: 1, paddingVertical: 8, borderRadius: 8, borderWidth: 1.5, borderColor: eliteBilling === 'annual' ? '#D4A017' : C.border, backgroundColor: eliteBilling === 'annual' ? '#D4A01720' : 'transparent', alignItems: 'center' }}>
                    <Text style={{ fontSize: 11, fontWeight: '700', color: eliteBilling === 'annual' ? '#D4A017' : C.textSec }}>{t('anual')}</Text>
                    <Text style={{ fontSize: 10, color: C.textSec }}>$179,99{t('por_anio')}</Text>
                  </TouchableOpacity>
                </View>
                {[t('plan_elite_f1'), t('plan_elite_f2'), t('plan_elite_f3'), t('plan_elite_f4'), t('plan_elite_f5'), t('plan_elite_f6')].map((f, i) => (
                  <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                    <Text style={{ fontSize: 12, color: '#D4A017' }}>✓</Text>
                    <Text style={{ fontSize: 12, color: C.text }}>{f}</Text>
                  </View>
                ))}
                <TouchableOpacity style={{ backgroundColor: '#D4A017', borderRadius: 10, padding: 14, alignItems: 'center', marginTop: 10 }} onPress={async () => {
                  try {
                    const Purchases = require('react-native-purchases').default;
                    const productId = eliteBilling === 'monthly' ? 'com.fernandomoscon.aurex.elite.monthly2' : 'com.fernandomoscon.aurex.elite.annual';
                    const { customerInfo } = await Purchases.purchaseProduct(productId);
                    if (customerInfo.entitlements.active['elite']) Alert.alert(t('bienvenido_elite'), t('plan_activado'));
                  } catch (e) { if (!e.userCancelled) Alert.alert(t('error'), e.message); }
                }}>
                  <Text style={{ fontSize: 14, fontWeight: '700', color: '#000' }}>{eliteBilling === 'monthly' ? t('quiero_elite') : t('elite_anual_btn')}</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        );
      case 'b3':
        return (
          <View style={st.section}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Text style={st.fieldLabel}>{t('nombre')}</Text>
              {nombre ? <Text style={{ fontSize: 11, color: C.green }}>✓</Text> : null}
            </View>
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
              <TextInput style={[st.input, { flex: 1 }]} value={nombre} onChangeText={setNombre} placeholderTextColor={C.textDim} placeholder={t('tu_nombre')} />
              <TouchableOpacity style={st.smallBtn} onPress={saveNombre}>
                <Text style={st.smallBtnText}>{t('guardar')}</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 16 }}>
              <Text style={st.fieldLabel}>{t('email')}</Text>
              {user?.email ? <Text style={{ fontSize: 11, color: C.green }}>✓</Text> : null}
            </View>
            <Text style={st.readOnly}>{user?.email || t('no_disponible')}</Text>
            <Text style={st.hint}>{t('email_no_modificar')}</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 16 }}>
              <Text style={st.fieldLabel}>{t('telefono')}</Text>
              {telefono ? <Text style={{ fontSize: 11, color: C.green }}>✓</Text> : null}
            </View>
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
              <View style={{ backgroundColor: C.bg, borderWidth: 1, borderColor: C.border2, borderRadius: 10, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Text style={{ fontSize: 14 }}>🇦🇷</Text>
                <Text style={{ fontSize: 14, color: C.text }}>+54</Text>
              </View>
              <TextInput style={[st.input, { flex: 1 }]} value={telefono.replace('+54','').replace('+541','').replace('+54','1')} onChangeText={tel => setTelefono('+54' + tel)} placeholderTextColor={C.textDim} placeholder="1167891320" keyboardType="phone-pad" />
              <TouchableOpacity style={st.smallBtn} onPress={async () => {
                // Build 16 BUG H: persistir en Supabase user_metadata para que toggle Telegram lo encuentre
                await AsyncStorage.setItem('perfil_telefono', telefono);
                const { error } = await supabase.auth.updateUser({ data: { telefono } });
                if (error) Alert.alert(t('error'), error.message);
                else Alert.alert(t('listo'), t('telefono_guardado'));
              }}>
                <Text style={st.smallBtnText}>{t('guardar')}</Text>
              </TouchableOpacity>
            </View>
            <Text style={[st.hint, { color: C.gold }]}>{t('necesario_alertas_auto')}</Text>

            <Text style={[st.fieldLabel, { marginTop: 16 }]}>{t('contrasena')}</Text>
            <TextInput style={st.input} value={newPwd} onChangeText={setNewPwd} secureTextEntry placeholderTextColor={C.textDim} placeholder={t('min_6_caracteres')} />
            <Text style={st.fieldLabel}>{t('repetir_contrasena')}</Text>
            <TextInput style={st.input} value={confirmPwd} onChangeText={setConfirmPwd} secureTextEntry placeholderTextColor={C.textDim} />
            <TouchableOpacity style={st.smallBtn} onPress={savePwd}>
              <Text style={st.smallBtnText}>{t('cambiar_contrasena')}</Text>
            </TouchableOpacity>
          </View>
        );
      case 'b3b':
        return <ComoUsarAurexBlock theme={C} t={t} />;
      case 'b4':
        return (
          <View style={st.section}>
            <View style={st.toggleRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={{ fontSize: 18 }}>🌙</Text>
                <View>
                  <Text style={st.toggleLabel}>{t('modo_oscuro')}</Text>
                  <Text style={{ fontSize: 10, color: C.textSec }}>{t('modo_oscuro_desc')}</Text>
                </View>
              </View>
              <Switch value={darkMode} disabled trackColor={{ true: C.gold }} thumbColor={darkMode ? '#000' : '#fff'} />
            </View>
            <View style={st.toggleRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={{ fontSize: 18 }}>🌐</Text>
                <View>
                  <Text style={st.toggleLabel}>{t('idioma')}</Text>
                  <Text style={{ fontSize: 10, color: C.textSec }}>{IDIOMAS[idioma]}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => Alert.alert(t('idioma'), t('selecciona_idioma'), [
                { text: '🇪🇸 Español', onPress: () => setLang('es') },
                { text: '🇺🇸 English', onPress: () => setLang('en') },
                { text: '🇧🇷 Português', onPress: () => setLang('pt') },
                { text: '🇨🇳 中文', onPress: () => setLang('zh') },
                { text: '🇫🇷 Français', onPress: () => setLang('fr') },
                { text: '🇮🇹 Italiano', onPress: () => setLang('it') },
                { text: '🇮🇳 हिन्दी', onPress: () => setLang('hi') },
                { text: '🇦🇪 العربية', onPress: () => setLang('ar') },
                { text: t('cancelar'), style: 'cancel' },
              ])} style={{ flexDirection: 'row', alignItems: 'center', gap: 5, borderWidth: 1, borderColor: C.border2, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6 }}>
                <Text style={{ fontSize: 14 }}>{idioma === 'es' ? '🇪🇸' : idioma === 'en' ? '🇺🇸' : idioma === 'pt' ? '🇧🇷' : idioma === 'zh' ? '🇨🇳' : idioma === 'fr' ? '🇫🇷' : idioma === 'it' ? '🇮🇹' : idioma === 'hi' ? '🇮🇳' : idioma === 'ar' ? '🇦🇪' : '🇪🇸'}</Text>
                <Text style={{ fontSize: 12, color: C.green, fontWeight: '800' }}>✓</Text>
                <Text style={{ fontSize: 12, color: C.text }}>{IDIOMAS[idioma]} ▾</Text>
              </TouchableOpacity>
            </View>
            <View style={st.toggleRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={{ fontSize: 18 }}>🎨</Text>
                <View>
                  <Text style={st.toggleLabel}>{t('tema')}</Text>
                  <Text style={{ fontSize: 10, color: C.textSec }}>
                    {themePref === 'system' ? t('tema_sistema') : themePref === 'light' ? t('tema_claro') : t('tema_oscuro')}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', gap: 4 }}>
                {[
                  { key: 'system', label: t('tema_auto') },
                  { key: 'light', label: t('tema_claro_btn') },
                  { key: 'dark', label: t('tema_oscuro_btn') },
                ].map((opt) => (
                  <TouchableOpacity
                    key={opt.key}
                    onPress={() => setThemePref(opt.key)}
                    style={{
                      backgroundColor: themePref === opt.key ? C.gold : C.border,
                      borderRadius: 6,
                      paddingHorizontal: 9,
                      paddingVertical: 5,
                    }}
                  >
                    <Text style={{ fontSize: 11, fontWeight: '700', color: themePref === opt.key ? '#000' : C.textSec }}>
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={st.toggleRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={{ fontSize: 18 }}>🔴</Text>
                <View>
                  <Text style={st.toggleLabel}>{t('indicador_pulse')}</Text>
                  <Text style={{ fontSize: 10, color: C.textSec }}>{t('indicador_pulse_desc')}</Text>
                </View>
              </View>
              <Switch value={pulseOn} onValueChange={setPulseOn} trackColor={{ true: C.gold }} thumbColor={pulseOn ? '#000' : '#fff'} />
            </View>
          </View>
        );
      case 'b5':
        return (
          <View style={st.section}>
            <View style={st.toggleRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
                <Text style={{ fontSize: 18 }}>📱</Text>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Text style={st.toggleLabel}>{t('auth_2pasos_label')}</Text>
                    <View style={st.soonBadge}><Text style={st.soonText}>SOON</Text></View>
                  </View>
                  <Text style={{ fontSize: 10, color: C.textSec }}>{t('proteccion_extra')}</Text>
                </View>
              </View>
              <Switch value={false} disabled trackColor={{ true: C.green }} />
            </View>
            <View style={st.toggleRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
                <Text style={{ fontSize: 18 }}>👁</Text>
                <View style={{ flex: 1 }}>
                  <Text style={st.toggleLabel}>{t('faceid_label')}</Text>
                  <Text style={{ fontSize: 10, color: C.textSec }}>{biometricAvailable ? (biometricEnabled ? t('activado_label') : t('protege_acceso')) : t('no_disponible_dispositivo')}</Text>
                </View>
              </View>
              <Switch value={biometricEnabled} onValueChange={async (val) => {
                if (val) {
                  try {
                    const rnBiometrics = new ReactNativeBiometrics();
                    // Re-verificar sensor al momento del toggle
                    const sensor = await rnBiometrics.isSensorAvailable();
                    if (!sensor.available) {
                      Alert.alert(t('biometria_no_disponible'), sensor.error || t('biometria_configurar'));
                      return;
                    }
                    const { success, error } = await rnBiometrics.simplePrompt({ promptMessage: t('confirma_identidad') });
                    if (success) {
                      setBiometricEnabled(true);
                      AsyncStorage.setItem('perfil_biometric', 'true');
                      Alert.alert(t('listo'), `${sensor.biometryType || 'Biometrics'} OK`);
                    } else if (error) {
                      Alert.alert(t('error'), error);
                    }
                  } catch (e) {
                    Alert.alert(t('error'), e.message);
                  }
                } else {
                  setBiometricEnabled(false);
                  AsyncStorage.setItem('perfil_biometric', 'false');
                }
              }} trackColor={{ true: C.green }} thumbColor={biometricEnabled ? '#000' : '#fff'} />
            </View>

            {/* Sesion activa */}
            <View style={{ marginTop: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <Text style={{ fontSize: 18 }}>👤</Text>
                <Text style={{ fontSize: 13, fontWeight: '600', color: C.text }}>{t('sesion_activa_label')}</Text>
              </View>
              <View style={st.sessionCard}>
                <View>
                  <Text style={{ fontSize: 13, fontWeight: '500', color: C.text }}>iPhone</Text>
                  <Text style={{ fontSize: 11, color: C.textSec }}>Hoy {new Date().getHours()}:{String(new Date().getMinutes()).padStart(2,'0')}</Text>
                </View>
                <View style={st.sessionDot} />
              </View>
            </View>

            {/* Ultimos accesos */}
            <View style={{ marginTop: 14 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <Text style={{ fontSize: 18 }}>🕐</Text>
                <Text style={{ fontSize: 13, fontWeight: '600', color: C.text }}>{t('ultimos_accesos_label')}</Text>
              </View>
              {[0, 1, 2].map(i => {
                const d = new Date(); d.setDate(d.getDate() - i);
                return (
                  <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 }}>
                    <Text style={{ fontSize: 11, color: C.textSec }}>{d.getDate()}/{d.getMonth()+1}/{d.getFullYear()} {d.getHours()}:{String(d.getMinutes()).padStart(2,'0')}</Text>
                    <Text style={{ fontSize: 11, color: C.textSec }}>iPhone</Text>
                  </View>
                );
              })}
            </View>
            <View style={st.sessionCard}>
              <View style={st.sessionDot} />
              <Text style={st.sessionText}>{t('sesion_activa_este')}</Text>
            </View>
          </View>
        );
      case 'b6':
        return (
          <View style={st.section}>
            <View style={st.legendCard}>
              <Text style={st.legendTitle}>{t('tu_numero_alertas')}</Text>
              <Text style={st.legendSub}>{t('tu_numero_desc')}</Text>
            </View>

            <View style={st.toggleRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
                <Text style={{ fontSize: 18 }}>📱</Text>
                <View><Text style={st.toggleLabel}>{t('recibir_alertas')}</Text><Text style={{ fontSize: 10, color: C.textSec }}>{t('activar_push')}</Text></View>
              </View>
              <Switch value={alertMaster} onValueChange={v => saveToggle('perfil_alert_master', v, setAlertMaster)} trackColor={{ true: C.gold }} thumbColor={alertMaster ? "#000" : "#fff"} />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12 }}>
              <Text style={st.fieldLabel}>{t('numero_celular_label')}</Text>
              {telefono ? <Text style={{ fontSize: 11, color: C.green }}>✓</Text> : null}
            </View>
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
              <View style={{ backgroundColor: C.bg, borderWidth: 1, borderColor: C.border2, borderRadius: 10, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Text style={{ fontSize: 14 }}>🇦🇷</Text>
                <Text style={{ fontSize: 14, color: C.text }}>+54</Text>
              </View>
              <TextInput style={[st.input, { flex: 1, color: C.text }]} value={telefono.replace("+54","")} onChangeText={tel => setTelefono("+54" + tel)} placeholderTextColor={C.textSec} placeholder="1167891320" keyboardType="phone-pad" />
              <TouchableOpacity style={st.smallBtn} onPress={async () => {
                // Build 16 BUG H: persistir en Supabase user_metadata para que toggle Telegram lo encuentre
                await AsyncStorage.setItem('perfil_telefono', telefono);
                const { error } = await supabase.auth.updateUser({ data: { telefono } });
                if (error) Alert.alert(t('error'), error.message);
                else Alert.alert(t('listo'), t('telefono_guardado') + ': ' + telefono);
              }}><Text style={st.smallBtnText}>{t('guardar')}</Text></TouchableOpacity>
            </View>
            {telefono ? <Text style={{ fontSize: 11, color: C.green, marginTop: 4 }}>{t('guardado_tel')} {telefono}</Text> : <Text style={{ fontSize: 11, color: C.textSec, marginTop: 4 }}>{t('ingresa_numero')}</Text>}

            <Text style={{ fontSize: 12, color: C.textSec, marginTop: 14, marginBottom: 8 }}>{t('recibir_push_cuando')}</Text>

            <View style={st.toggleRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
                <Text style={{ fontSize: 16 }}>🎯</Text>
                <View><Text style={st.toggleLabel}>{t('precio_objetivo_label')}</Text><Text style={{ fontSize: 10, color: C.textSec }}>{t('precio_objetivo_desc')}</Text></View>
              </View>
              <Switch value={alertPrecio} onValueChange={v => saveToggle('perfil_alert_precio', v, setAlertPrecio)} trackColor={{ true: C.gold }} thumbColor={alertPrecio ? '#000' : '#fff'} />
            </View>
            <View style={st.toggleRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
                <Text style={{ fontSize: 16 }}>🤖</Text>
                <View><Text style={st.toggleLabel}>{t('senal_ia_toggle_label')}</Text><Text style={{ fontSize: 10, color: C.textSec }}>{t('senal_ia_toggle_desc')}</Text></View>
              </View>
              <Switch value={alertIA} onValueChange={v => saveToggle('perfil_alert_ia', v, setAlertIA)} trackColor={{ true: C.gold }} thumbColor={alertIA ? '#000' : '#fff'} />
            </View>
            <View style={st.toggleRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
                <Text style={{ fontSize: 16 }}>📉</Text>
                <View><Text style={st.toggleLabel}>{t('variacion_brusca_label')}</Text><Text style={{ fontSize: 10, color: C.textSec }}>{t('variacion_brusca_desc')}</Text></View>
              </View>
              <Switch value={alertVariacion} onValueChange={v => saveToggle('perfil_alert_variacion', v, setAlertVariacion)} trackColor={{ true: C.gold }} thumbColor={alertVariacion ? '#000' : '#fff'} />
            </View>
            <View style={st.toggleRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
                <Text style={{ fontSize: 16 }}>🔴</Text>
                <View><Text style={st.toggleLabel}>{t('pulse_extremo_label')}</Text><Text style={{ fontSize: 10, color: C.textSec }}>{t('pulse_extremo_desc')}</Text></View>
              </View>
              <Switch value={alertPulse} onValueChange={v => saveToggle('perfil_alert_pulse', v, setAlertPulse)} trackColor={{ true: C.gold }} thumbColor={alertPulse ? '#000' : '#fff'} />
            </View>
            <View style={st.infoBanner}><Text style={st.infoText}>{t('alertas_push_requieren')}</Text></View>
          </View>
        );
      case 'b7':
        return (
          <View style={st.section}>
            <View style={st.toggleRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
                <Text style={{ fontSize: 18 }}>📲</Text>
                <View><Text style={st.toggleLabel}>{t('notif_push_label')}</Text><Text style={{ fontSize: 10, color: C.textSec }}>{t('notif_push_desc')}</Text></View>
              </View>
              <Switch value={notifPush} onValueChange={v => saveToggle('perfil_notif_push', v, setNotifPush)} trackColor={{ true: C.gold }} thumbColor={notifPush ? '#000' : '#fff'} />
            </View>
            <View style={st.toggleRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
                <Text style={{ fontSize: 18 }}>📅</Text>
                <View><Text style={st.toggleLabel}>{t('resumen_diario_label')}</Text><Text style={{ fontSize: 10, color: C.textSec }}>{t('resumen_diario_desc')}</Text></View>
              </View>
              <Switch value={notifResumen} onValueChange={v => saveToggle('perfil_notif_resumen', v, setNotifResumen)} trackColor={{ true: C.gold }} thumbColor={notifResumen ? '#000' : '#fff'} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 6, paddingLeft: 34 }}>
              <Text style={{ fontSize: 11, color: C.textSec }}>{t('hora_resumen')}</Text>
              <TouchableOpacity onPress={() => {
                const horas = ['06:00','07:00','08:00','09:00','10:00','12:00','14:00','18:00','20:00','22:00'];
                Alert.alert(t('hora_seleccionar'), t('selecciona_hora'), [
                  ...horas.map(h => ({ text: h, onPress: () => savePref('perfil_hora_resumen', h, setHoraResumen) })),
                  { text: t('cancelar'), style: 'cancel' },
                ]);
              }} style={{ borderWidth: 1, borderColor: C.gold, borderRadius: 6, paddingHorizontal: 10, paddingVertical: 4 }}>
                <Text style={{ fontSize: 12, color: C.gold, fontWeight: '600' }}>{horaResumen} ▾</Text>
              </TouchableOpacity>
            </View>
            <View style={st.toggleRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
                <Text style={{ fontSize: 18 }}>💌</Text>
                <View><Text style={st.toggleLabel}>{t('newsletter_label')}</Text><Text style={{ fontSize: 10, color: C.textSec }}>{t('newsletter_desc')}</Text></View>
              </View>
              <Switch value={notifNews} onValueChange={v => saveToggle('perfil_notif_news', v, setNotifNews)} trackColor={{ true: C.gold }} thumbColor={notifNews ? '#000' : '#fff'} />
            </View>
            <View style={st.toggleRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
                <Text style={{ fontSize: 18 }}>🚀</Text>
                <View><Text style={st.toggleLabel}>{t('novedades_label')}</Text><Text style={{ fontSize: 10, color: C.textSec }}>{t('novedades_desc')}</Text></View>
              </View>
              <Switch value={notifNovedades} onValueChange={v => saveToggle('perfil_notif_novedades', v, setNotifNovedades)} trackColor={{ true: C.gold }} thumbColor={notifNovedades ? '#000' : '#fff'} />
            </View>
          </View>
        );
      case 'b8':
        return (
          <View style={st.section}>
            <TouchableOpacity style={st.menuRow} onPress={() => setShowFAQ(true)}>
              <Text style={{ fontSize: 22, width: 32 }}>❓</Text>
              <View style={{ flex: 1 }}><Text style={st.menuLabel}>{t('centro_ayuda')}</Text><Text style={{ fontSize: 10, color: C.textSec }}>{t('preguntas_frecuentes')}</Text></View>
              <Text style={st.menuArrow}>›</Text>
            </TouchableOpacity>
            <TouchableOpacity style={st.menuRow} onPress={() => setShowRating(true)}>
              <Text style={{ fontSize: 22, width: 32 }}>⭐</Text>
              <View style={{ flex: 1 }}><Text style={st.menuLabel}>{t('califica')}</Text><Text style={{ fontSize: 10, color: C.textSec }}>{t('califica')}</Text></View>
              <Text style={st.menuArrow}>›</Text>
            </TouchableOpacity>
            <TouchableOpacity style={st.menuRow} onPress={() => Linking.openURL('mailto:app.aurex@gmail.com')}>
              <Text style={{ fontSize: 22, width: 32 }}>💌</Text>
              <View style={{ flex: 1 }}><Text style={st.menuLabel}>{t('contactar_soporte')}</Text><Text style={{ fontSize: 10, color: C.textSec }}>app.aurex@gmail.com</Text></View>
              <Text style={st.menuArrow}>›</Text>
            </TouchableOpacity>
            <Text style={st.socialTitle}>{t('siguenos')}</Text>
            <View style={st.socialRow}>
              <TouchableOpacity style={st.socialBtn} onPress={() => Linking.openURL('https://instagram.com/aurexapp')}>
                <Text style={st.socialIcon}>📷</Text><Text style={st.socialLabel}>Instagram</Text>
              </TouchableOpacity>
              <TouchableOpacity style={st.socialBtn} onPress={() => Linking.openURL('https://x.com/aurexapp')}>
                <Text style={st.socialIcon}>💬</Text><Text style={st.socialLabel}>X / Twitter</Text>
              </TouchableOpacity>
              <TouchableOpacity style={st.socialBtn} onPress={() => Linking.openURL('https://youtube.com/@aurexapp')}>
                <Text style={st.socialIcon}>🎬</Text><Text style={st.socialLabel}>YouTube</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 }}>
              <Text style={{ fontSize: 11, color: C.textSec }}>{t('version_app')}</Text>
              <Text style={{ fontSize: 13, fontWeight: '700', color: C.text }}>AUREX v{APP_VERSION} ⭐</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 16, marginTop: 8 }}>
              <TouchableOpacity onPress={() => Linking.openURL('https://aurex.live/docs/terms.html')}><Text style={{ fontSize: 11, color: '#58A6FF', textDecorationLine: 'underline' }}>{t('terminos')}</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL('https://aurex.live/docs/privacy.html')}><Text style={{ fontSize: 11, color: '#58A6FF', textDecorationLine: 'underline' }}>{t('privacidad')}</Text></TouchableOpacity>
            </View>
            {/* Disclaimer */}
            <View style={{ marginTop: 12, backgroundColor: '#080C10', borderRadius: 10, padding: 12, borderWidth: 0.5, borderColor: '#21262D' }}>
              <Text style={{ fontSize: 9, color: '#8B949E', lineHeight: 14, textAlign: 'center' }}>
                {t('disclaimer_perfil')}
              </Text>
            </View>
          </View>
        );
      case 'b9':
        return (
          <View style={st.section}>
            <TouchableOpacity style={st.logoutBtn} onPress={logout}>
              <Text style={st.logoutText}>🚪 {t('cerrar_sesion')}</Text>
            </TouchableOpacity>
            <Text style={st.logoutHint}>{t('salir_dispositivo_msg')}</Text>

            <View style={st.dangerZone}>
              <Text style={st.dangerTitle}>{t('zona_peligro_label')}</Text>
              <Text style={st.dangerDesc}>{t('eliminar_irreversible_msg')}</Text>
              {!showDeleteConfirm ? (
                <TouchableOpacity style={st.deleteBtn} onPress={() => setShowDeleteConfirm(true)}>
                  <Text style={st.deleteBtnText}>🗑️ {t('eliminar_mi_cuenta')}</Text>
                </TouchableOpacity>
              ) : (
                <View style={st.deleteConfirm}>
                  <Text style={st.deleteHint}>{t('escribi_email')}</Text>
                  <TextInput style={[st.input, { borderColor: C.red }]} value={deleteEmail} onChangeText={setDeleteEmail} autoCapitalize="none" placeholderTextColor={C.textDim} placeholder={user?.email} />
                  <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
                    <TouchableOpacity style={st.cancelBtn} onPress={() => { setShowDeleteConfirm(false); setDeleteEmail(''); }}>
                      <Text style={st.cancelBtnText}>{t('cancelar')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[st.confirmDeleteBtn, deleteEmail !== user?.email && { opacity: 0.4 }]}
                      onPress={deleteAccount}
                      disabled={deleteEmail !== user?.email}
                    >
                      <Text style={st.confirmDeleteText}>{t('confirmar_eliminacion_btn')}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>
        );
      default: return null;
    }
  };

  return (
    <SafeAreaView style={st.container}><ScrollView>
      {/* Logo header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingTop: 10, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: '#21262D' }}>
        <AurexLogo size={32} />
        <Text style={{ fontSize: 16, fontWeight: '500', color: '#D4A017', letterSpacing: 1 }}>AUREX</Text>
        <Text style={{ fontSize: 13, color: '#8B949E' }}>{t('perfil')}</Text>
        <View style={{ flex: 1 }} />
        <Text style={{ fontSize: 10, color: '#8B949E' }}>v{APP_VERSION}</Text>
        <BellButton onPress={() => navigation.navigate('MisAlertas')} />
      </View>
      {/* Build 18 Bloque 3: banner upsell permanente visible para FREE/PRO */}
      <UpsellBanner />
      {/* Bloques acordeon — Usuario incluye avatar como en PWA */}
      {getBloques(t).map(renderBloque)}
      <View style={{ height: 30 }} />
    </ScrollView>

    {/* Modal FAQ — Español e Inglés */}
    {showFAQ && (
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#000000CC', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
        <View style={{ backgroundColor: C.card, borderRadius: 16, width: '92%', maxHeight: '85%', padding: 20, borderWidth: 1, borderColor: C.border2 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <Text style={{ fontSize: 16, fontWeight: '700', color: C.text }}>❓ Centro de ayuda</Text>
            <TouchableOpacity onPress={() => setShowFAQ(false)} style={{ width: 32, height: 32, borderRadius: 6, backgroundColor: C.border, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 16, color: C.textSec }}>✕</Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            {[
              { q: '¿Qué es AUREX?', a: 'AUREX es una plataforma de análisis de datos con inteligencia artificial que monitorea 350+ activos globales en tiempo real (criptomonedas, acciones, ETFs, commodities, futuros y divisas). Nuestro motor IA v7 evalúa 10 variables por activo para generar análisis estadísticos y alertas.', qen: 'What is AUREX?', aen: 'AUREX is an AI-powered data analytics platform that monitors 350+ global assets in real time (cryptocurrencies, stocks, ETFs, commodities, futures, and currencies). Our AI v7 engine evaluates 10 variables per asset to generate statistical analysis and alerts.' },
              { q: '¿Cómo funciona el Motor IA?', a: 'El Motor IA v7 analiza 10 variables en tiempo real: Tendencia 24h, RSI14, Volumen, Volatilidad, Correlación BTC/SPY, Oro/Petróleo, Macro FED, Earnings, MACD y Soporte/Resistencia. Genera análisis estadísticos con dirección ALCISTA, BAJISTA o ALTA CONV-IA y nivel de confianza.', qen: 'How does the AI Engine work?', aen: 'The AI v7 Engine analyzes 10 real-time variables: 24h Trend, RSI14, Volume, Volatility, BTC/SPY Correlation, Gold/Oil, FED Macro, Earnings, MACD, and Support/Resistance. It generates statistical analysis with BULLISH, BEARISH, or HIGH CONV-AI direction and confidence level.' },
              { q: '¿Qué es AUREX Pulse?', a: 'AUREX Pulse es nuestro índice de sentimiento de mercado con 14 variables ponderadas. Va de 0 (Miedo Extremo) a 100 (Codicia Extrema). Tiene 5 filtros: Global, Cripto, Acciones, Commodities y Futuros. Incluye 3 indicadores: AUREX Pulse, BTC Sentiment y Crypto Fear & Greed.', qen: 'What is AUREX Pulse?', aen: 'AUREX Pulse is our market sentiment index with 14 weighted variables. It ranges from 0 (Extreme Fear) to 100 (Extreme Greed). It has 5 filters: Global, Crypto, Stocks, Commodities, and Futures. Includes 3 indicators: AUREX Pulse, BTC Sentiment, and Crypto Fear & Greed.' },
              { q: '¿Qué planes hay disponibles?', a: 'FREE: 5 activos, 3 análisis/día, Pulse básico. PRO ($9.99/mes): activos ilimitados, análisis ilimitados, alertas push, exportar portfolio. ELITE ($19.99/mes): todo lo de PRO + Pulse completo, análisis avanzado, alertas WhatsApp, soporte prioritario.', qen: 'What plans are available?', aen: 'FREE: 5 assets, 3 analyses/day, basic Pulse. PRO ($9.99/mo): unlimited assets, unlimited analyses, push alerts, export portfolio. ELITE ($19.99/mo): everything in PRO + full Pulse, advanced analysis, WhatsApp alerts, priority support.' },
              { q: '¿Cómo funcionan las alertas?', a: 'Las alertas te notifican cuando: un activo alcanza tu precio objetivo, cambia el análisis IA, hay variación brusca (+/-5%), o AUREX Pulse entra en zona extrema. Podés recibirlas por push, email o WhatsApp (según tu plan).', qen: 'How do alerts work?', aen: 'Alerts notify you when: an asset reaches your target price, the AI analysis changes, there is a sharp variation (+/-5%), or AUREX Pulse enters an extreme zone. You can receive them via push, email, or WhatsApp (depending on your plan).' },
              { q: '¿Es confiable el análisis de AUREX?', a: 'AUREX es una herramienta de análisis de datos. Los análisis IA son estadísticos e informativos, no recomendaciones. Los datos de mercado son provistos por fuentes públicas. Consultá siempre a un profesional antes de tomar decisiones.', qen: 'Is AUREX analysis reliable?', aen: 'AUREX is a data analysis tool. AI analyses are statistical and informational, not recommendations. Market data is provided by public sources. Always consult a professional before making decisions.' },
            ].map((faq, i) => (
              <View key={i} style={{ marginBottom: 14, backgroundColor: C.bg, borderRadius: 10, padding: 12, borderWidth: 0.5, borderColor: C.border }}>
                <Text style={{ fontSize: 13, fontWeight: '700', color: C.gold, marginBottom: 4 }}>{faq.q}</Text>
                <Text style={{ fontSize: 11, color: C.text, lineHeight: 16, marginBottom: 8 }}>{faq.a}</Text>
                <Text style={{ fontSize: 11, fontWeight: '600', color: C.textSec, marginBottom: 2 }}>{faq.qen}</Text>
                <Text style={{ fontSize: 10, color: C.textSec, lineHeight: 14 }}>{faq.aen}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    )}

    {/* Modal Calificar */}
    {showRating && (
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#000000CC', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
        <View style={{ backgroundColor: C.card, borderRadius: 16, width: '80%', padding: 24, borderWidth: 1, borderColor: C.border2, alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: C.text, marginBottom: 6 }}>Califica AUREX</Text>
          <Text style={{ fontSize: 12, color: C.textSec, textAlign: 'center', marginBottom: 16 }}>Tu opinion nos ayuda a mejorar la app para vos</Text>
          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 20 }}>
            {[1,2,3,4,5].map(s => (
              <TouchableOpacity key={s} onPress={() => setRating(s)}>
                <Text style={{ fontSize: 32 }}>{s <= rating ? '⭐' : '☆'}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {rating > 0 && <Text style={{ fontSize: 13, color: C.gold, fontWeight: '600', marginBottom: 12 }}>{rating === 5 ? 'Excelente!' : rating >= 4 ? 'Muy buena!' : rating >= 3 ? 'Buena' : 'Gracias por tu feedback'}</Text>}
          <TouchableOpacity onPress={() => { Alert.alert('Gracias!', 'Tu calificacion fue enviada'); setShowRating(false); }} style={{ backgroundColor: C.gold, borderRadius: 10, paddingVertical: 12, paddingHorizontal: 30 }}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: '#000' }}>Enviar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowRating(false)} style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 12, color: C.textSec }}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    )}

    {/* Modal Aviso Legal */}
    <Modal animationType="slide" transparent={true} visible={showLegal} onRequestClose={() => setShowLegal(false)}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center', padding: 16 }}>
        <View style={{ backgroundColor: C.card, borderRadius: 20, padding: 24, width: '92%', maxWidth: 380, borderWidth: 2, borderColor: C.gold, shadowColor: '#000', shadowOffset: { width: 0, height: 15 }, shadowOpacity: 0.55, shadowRadius: 28, elevation: 22 }}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: C.text, textAlign: 'center', marginBottom: 16 }}>{t('legal_titulo')}</Text>
          <Text style={{ fontSize: 12, color: C.textSec, lineHeight: 18, marginBottom: 12 }}>{t('legal_p1')}</Text>
          <Text style={{ fontSize: 12, color: C.textSec, lineHeight: 18, marginBottom: 12 }}>{t('legal_p2')}</Text>
          <Text style={{ fontSize: 12, color: C.textSec, lineHeight: 18, marginBottom: 12 }}>{t('legal_p3')}</Text>
          <Text style={{ fontSize: 11, color: C.textDim, textAlign: 'center', marginBottom: 16 }}>{t('legal_copyright')}</Text>
          <TouchableOpacity onPress={() => setShowLegal(false)} style={{ alignItems: 'center', paddingVertical: 10 }}>
            <Text style={{ fontSize: 14, color: C.gold, fontWeight: '600' }}>{t('cerrar_btn')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    </SafeAreaView>
  );
}

const makeStyles = (C) => StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },

  // Header
  headerBg: { paddingVertical: 24, paddingHorizontal: 16, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: C.border },
  avatar: { width: 76, height: 76, borderRadius: 38, backgroundColor: `${C.gold}20`, borderWidth: 2.5, borderColor: C.gold, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  avatarText: { fontSize: 26, fontWeight: '600', color: C.gold },
  avatarWrap: { alignItems: 'center', paddingVertical: 10 },
  userName: { fontSize: 19, fontWeight: '500', color: C.text },
  userEmail: { fontSize: 12, color: C.textSec, marginTop: 2 },
  planBadge: { marginTop: 8, paddingHorizontal: 12, paddingVertical: 3, borderRadius: 20, borderWidth: 1 },
  planBadgeText: { fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },

  // Bloque
  bloque: { marginHorizontal: 12, marginTop: 8, backgroundColor: C.card, borderRadius: 10, borderWidth: 0.5, borderColor: C.border },
  bloqueHeader: { flexDirection: 'row', alignItems: 'center', padding: 12, gap: 10 },
  bloqueIcon: { fontSize: 16 },
  bloqueTitle: { flex: 1, fontSize: 13, fontWeight: '500', color: C.text },
  bloqueArrow: { fontSize: 10, color: C.textSec },
  bloqueBody: { borderTopWidth: 0.5, borderTopColor: C.border },

  // Section
  section: { padding: 12 },
  fieldLabel: { fontSize: 10, color: C.textSec, fontWeight: '500', marginBottom: 4, marginTop: 8 },
  input: { backgroundColor: C.bg, color: C.text, borderWidth: 1, borderColor: C.border2, borderRadius: 10, padding: 12, fontSize: 14 },
  readOnly: { fontSize: 14, color: C.textSec, padding: 12, backgroundColor: C.bg, borderRadius: 10, borderWidth: 1, borderColor: C.border },
  hint: { fontSize: 9, color: C.textSec, marginTop: 2 },
  smallBtn: { backgroundColor: C.gold, borderRadius: 8, padding: 10, alignItems: 'center', marginTop: 8 },
  smallBtnText: { color: '#000', fontSize: 12, fontWeight: '600' },
  goldBtn: { backgroundColor: C.gold, borderRadius: 8, padding: 12, alignItems: 'center', marginTop: 10 },
  goldBtnText: { color: '#000', fontSize: 13, fontWeight: '600' },

  // Plan
  planCard: { backgroundColor: C.bg, borderRadius: 10, padding: 14, borderWidth: 1 },
  planName: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  planDesc: { fontSize: 11, color: C.textSec },

  // Toggles
  toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: C.border },
  toggleLabel: { fontSize: 13, color: C.text, fontWeight: '500' },
  soonBadge: { backgroundColor: C.border, borderRadius: 4, paddingHorizontal: 6, paddingVertical: 1, marginTop: 2, alignSelf: 'flex-start' },
  soonText: { fontSize: 8, color: C.textSec, fontWeight: '700' },

  // Seguridad
  sessionCard: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 10, backgroundColor: C.bg, borderRadius: 8, marginTop: 10 },
  sessionDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.green },
  sessionText: { fontSize: 12, color: C.text, fontWeight: '500' },

  // Alertas
  legendCard: { backgroundColor: `${C.gold}10`, borderWidth: 1, borderColor: `${C.gold}40`, borderRadius: 10, padding: 12, marginBottom: 10 },
  legendTitle: { fontSize: 11, fontWeight: '700', color: C.gold, marginBottom: 4 },
  legendSub: { fontSize: 10, color: C.textSec },
  infoBanner: { backgroundColor: C.bg, borderRadius: 8, padding: 10, marginTop: 10, borderWidth: 0.5, borderColor: C.border },
  infoText: { fontSize: 10, color: C.textSec, textAlign: 'center' },

  // Menu
  menuRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, borderBottomWidth: 0.5, borderBottomColor: C.border },
  menuIcon: { fontSize: 16, width: 28 },
  menuLabel: { flex: 1, fontSize: 13, color: C.text, fontWeight: '500' },
  menuArrow: { fontSize: 18, color: C.textSec },
  socialTitle: { fontSize: 10, color: C.textSec, fontWeight: '600', marginTop: 12, marginBottom: 8 },
  socialRow: { flexDirection: 'row', gap: 10 },
  socialBtn: { flex: 1, backgroundColor: C.bg, borderRadius: 8, padding: 10, alignItems: 'center', borderWidth: 0.5, borderColor: C.border },
  socialIcon: { fontSize: 18, marginBottom: 4 },
  socialLabel: { fontSize: 9, color: C.textSec },
  version: { textAlign: 'center', fontSize: 10, color: C.textSec, marginTop: 16, paddingTop: 10, borderTopWidth: 0.5, borderTopColor: C.border },

  // Sesion
  logoutBtn: { backgroundColor: C.border, borderWidth: 0.5, borderColor: C.border2, borderRadius: 10, padding: 13, alignItems: 'center' },
  logoutText: { fontSize: 13, fontWeight: '600', color: C.text },
  logoutHint: { fontSize: 10, color: C.textSec, textAlign: 'center', marginTop: 6 },
  dangerZone: { marginTop: 16, borderWidth: 1, borderColor: `${C.red}40`, borderRadius: 10, padding: 14 },
  dangerTitle: { fontSize: 11, fontWeight: '700', color: C.red, marginBottom: 6 },
  dangerDesc: { fontSize: 10, color: C.textSec, marginBottom: 10 },
  deleteBtn: { backgroundColor: C.red, borderRadius: 10, padding: 13, alignItems: 'center' },
  deleteBtnText: { fontSize: 14, fontWeight: '700', color: '#fff' },
  deleteConfirm: { marginTop: 8 },
  deleteHint: { fontSize: 10, color: C.red, marginBottom: 6 },
  cancelBtn: { flex: 1, backgroundColor: C.border, borderRadius: 8, padding: 10, alignItems: 'center' },
  cancelBtnText: { fontSize: 12, color: C.text },
  confirmDeleteBtn: { flex: 1, backgroundColor: C.red, borderRadius: 8, padding: 10, alignItems: 'center' },
  confirmDeleteText: { fontSize: 12, color: '#fff', fontWeight: '600' },
});
