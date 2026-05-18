import React, { useEffect, useState, useRef } from 'react';
import { Platform, AppState, DeviceEventEmitter } from 'react-native';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Purchases, { LOG_LEVEL } from 'react-native-purchases';
import { supabase } from './src/lib/supabase';
import RootNavigator from './src/navigation/RootNavigator';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import { initLang } from './src/lib/i18n';
import ReactNativeBiometrics from 'react-native-biometrics';
import SplashView from './src/components/SplashView';
import BootSplash from 'react-native-bootsplash';
import { ThemeProvider } from './src/lib/ThemeContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { registerForPushNotifications, setupNotificationHandlers, setupTokenRefreshListener } from './src/lib/pushNotifications';
import Toast, { showToast } from './src/components/Toast';

const REVENUECAT_IOS_KEY = 'appbf4b308ae6';
const REVENUECAT_ANDROID_KEY = 'goog_HfiemofhuhAKeWYfNZfLGrlyIDp';

// Envuelve toda la app con el ThemeProvider una sola vez.
// De esta forma la preference del tema se mantiene aunque cambie `step`.
export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

function AppContent() {
  const [step, setStep] = useState('loading'); // loading | onboarding | login | app
  const [mountedAt] = useState(Date.now());
  // Build 13 fix bug 3: ref para limpiar listener de token refresh entre sesiones
  const tokenRefreshUnsubRef = useRef(null);

  useEffect(() => {
    Purchases.setLogLevel(LOG_LEVEL.VERBOSE);
    if (Platform.OS === 'ios') {
      Purchases.configure({ apiKey: REVENUECAT_IOS_KEY });
    } else if (Platform.OS === 'android') {
      Purchases.configure({ apiKey: REVENUECAT_ANDROID_KEY });
    }
    // Build 34 IAP-1: si hay sesion Supabase al boot, identificar al usuario con RC
    // para que RevenueCat reciba eventos webhook con el UUID Supabase real (no $RCAnonymousID)
    (async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user?.id) {
          await Purchases.logIn(session.user.id);
        }
      } catch (e) {
        console.warn('[IAP-1] Purchases.logIn boot fallo:', e?.message);
      }
    })();
  }, []);

  // Item 2 Build 3: refrescar sesion cuando la app vuelve a foreground.
  // Soluciona logout al minimizar — el JWT expira en background y autoRefreshToken
  // no se ejecuta porque el JS thread esta suspendido. Al volver a "active",
  // forzamos refreshSession() para recuperar token sin signOut automatico.
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        supabase.auth.refreshSession().catch(() => { /* silent */ });
      }
    });
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    // Lee directo de AsyncStorage + decode JWT. Sin fetch, siempre instantáneo.
    // Supabase SDK hace el refresh del token en background cuando sea necesario.
    const hasValidSession = async () => {
      try {
        const stored = await AsyncStorage.getItem('sb-dklljnfhlzmfsfmxrpie-auth-token');
        if (!stored) return false;
        const parsed = JSON.parse(stored);
        const token = parsed?.access_token;
        if (!token) return false;
        // JWT: header.payload.signature — decodificar payload (base64url)
        const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64));
        const now = Math.floor(Date.now() / 1000);
        return typeof payload.exp === 'number' && payload.exp > now;
      } catch (e) {
        return false;
      }
    };

    const init = async () => {
      // Init language (rápido, lectura AsyncStorage)
      await initLang();
      // Check onboarding
      const onboardingDone = await AsyncStorage.getItem('aurex_onboarding_done');
      if (!onboardingDone) {
        setStep('onboarding');
        return;
      }
      // Verificar sesión por JWT local (instantáneo, sin red)
      let sessionOk = await hasValidSession();
      // Build 18/25 fix BUG G (logout espontáneo post 1+ hora):
      // Si el access_token expiró pero el refresh_token sigue válido (vive 30 días),
      // intentar refreshSession() ANTES de kick to Login. Esto evita que el usuario
      // tenga que re-ingresar email+password cada vez que vuelve después de 1 hora.
      if (!sessionOk) {
        try {
          const { data, error } = await supabase.auth.refreshSession();
          if (data?.session && !error) {
            sessionOk = true;
            console.log('[BUG-G fix] Sesión recuperada vía refreshSession');
          }
        } catch (e) { /* refresh falló, ir a login normalmente */ }
      }
      if (!sessionOk) {
        setStep('login');
        return;
      }
      // Hay sesión válida → si tiene biometrics, pedir Face ID
      const bioEnabled = await AsyncStorage.getItem('perfil_biometric');
      if (bioEnabled === 'true') {
        try {
          const rnBiometrics = new ReactNativeBiometrics();
          const { success } = await rnBiometrics.simplePrompt({ promptMessage: 'Desbloquear AUREX' });
          if (!success) { setStep('login'); return; }
        } catch (e) { /* sensor not available, skip */ }
      }
      setStep('app');
    };
    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      // Build 16 BUG G: diagnóstico re-login post-update. adb logcat | grep BUILD16-G
      console.log('[BUILD16-G] auth event:', _event, 'session:', s ? 'present' : 'null', 't:', Date.now() - mountedAt, 'ms');
      if (s && step === 'login') setStep('app');
      if (!s && _event === 'SIGNED_OUT') setStep('login');
      // FCM: registrar token apenas hay session hidratada (sin race con auth.getUser()).
      // SIGNED_IN = login fresh. INITIAL_SESSION = boot con sesión pre-existente.
      if (s?.user && (_event === 'SIGNED_IN' || _event === 'INITIAL_SESSION')) {
        registerForPushNotifications(s.user.id).catch((e) => console.warn('FCM register:', e));
        // Build 13 bug 3: enganchar listener de refresh para esta sesión
        if (tokenRefreshUnsubRef.current) tokenRefreshUnsubRef.current();
        tokenRefreshUnsubRef.current = setupTokenRefreshListener(s.user.id);
      }
      // Build 13 bug 3: cleanup del listener al cerrar sesión
      if (!s && _event === 'SIGNED_OUT' && tokenRefreshUnsubRef.current) {
        tokenRefreshUnsubRef.current();
        tokenRefreshUnsubRef.current = null;
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  // Build 8: handlers de push foreground/tap.
  // Foreground reemplaza Alert.alert (modal bloqueante) por toast + badge:
  // - SO sigue mostrando notificación nativa (no se toca)
  // - Toast in-app de 3s que NO bloquea la UX
  // - Badge de la campana sube automáticamente vía useFocusEffect del header
  // (mockup #7 valida los 3 efectos simultáneos).
  useEffect(() => {
    if (step !== 'app') return;
    const unsubscribe = setupNotificationHandlers({
      onForeground: async (msg) => {
        const title = msg?.notification?.title || msg?.data?.title || 'Alerta';
        const body = msg?.notification?.body || msg?.data?.body || '';
        // Build 15 BUG B: mostrar notif del SO en foreground (Android no lo hace automáticamente).
        try {
          await notifee.displayNotification({
            title, body,
            android: { channelId: 'aurex_default', importance: AndroidImportance.HIGH, smallIcon: 'ic_stat_notification', pressAction: { id: 'default' } },
          });
        } catch (e) { /* notifee falla silencioso, queda solo el toast */ }
        // Toast in-app (UX existente)
        showToast({ title, message: body });
        // Build 15 BUG F: refrescar badge campana en sincronía con el toast.
        DeviceEventEmitter.emit('alerta_recibida');
      },
      onOpened: () => { /* TODO: deep-link a MisAlertas en futura iteración */ },
    });
    return () => { if (unsubscribe) unsubscribe(); };
  }, [step]);

  // Ocultar BootSplash nativo cuando App.js termina de cargar
  // (el splash se mantuvo visible desde el arranque iOS, bypasseando el blanco)
  // Garantiza un mínimo de 2 segundos visible para evitar "flash" cuando la app carga rápido
  useEffect(() => {
    if (step !== 'loading') {
      const elapsed = Date.now() - mountedAt;
      const minDuration = 2000;
      const delay = Math.max(0, minDuration - elapsed);
      setTimeout(() => BootSplash.hide({ fade: true }), delay);
    }
  }, [step, mountedAt]);

  // Build 19 BUG P0 fix: onboarding ahora distingue 'signup' (boton grande)
  // vs 'login' (link "Ya tengo cuenta"). target = 'signup' | 'login' | undefined (back-compat).
  const finishOnboarding = async (target) => {
    await AsyncStorage.setItem('aurex_onboarding_done', '1');
    setStep(target === 'signup' ? 'signup' : 'login');
  };

  const finishLogin = () => {
    setStep('app');
  };

  if (step === 'loading') return <SplashView />;

  if (step === 'onboarding') {
    return <OnboardingScreen onFinish={finishOnboarding} />;
  }

  if (step === 'login') {
    return <LoginScreen onSuccess={finishLogin} onGoToSignup={() => setStep('signup')} />;
  }

  if (step === 'signup') {
    return <SignupScreen onSuccess={finishLogin} onGoToLogin={() => setStep('login')} />;
  }

  return (
    <NavigationContainer>
      <RootNavigator />
      <Toast />
    </NavigationContainer>
  );
}
