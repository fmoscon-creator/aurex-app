// SignupScreen — Build 19 fix BUG P0 14-may
// Crea cuentas nuevas via supabase.auth.signUp. Antes de Build 19 no existia,
// la app solo tenia LoginScreen → usuarios nuevos quedaban bloqueados con
// "Invalid login credentials". Reportado 14-may PM con 2 users reales.

import React, { useState, useMemo } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, ActivityIndicator, KeyboardAvoidingView, Platform
} from 'react-native';
import { supabase } from '../lib/supabase';
import Purchases from 'react-native-purchases'; // Build 34 IAP-3: identificar usuario con RC post-signup
import AurexLogo from '../components/AurexLogo';
import { BRAND_NAME } from '../lib/brand';
import { useTheme } from '../lib/ThemeContext';
import { useT } from '../lib/i18n';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignupScreen({ onSuccess, onGoToLogin }) {
  const { theme: C } = useTheme();
  const t = useT();
  const styles = useMemo(() => makeStyles(C), [C]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  async function signUp() {
    setStatus('');
    // Validaciones cliente — feedback inmediato sin pegarle a Supabase
    if (!email || !email.includes('@')) {
      setStatus('Email invalido');
      return;
    }
    if (!password || password.length < 6) {
      setStatus('La contrasena debe tener al menos 6 caracteres');
      return;
    }
    if (password !== password2) {
      setStatus('Las contrasenas no coinciden');
      return;
    }

    setLoading(true);
    setStatus(t('conectando') || 'Conectando...');

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        // Manejar errores comunes con mensajes claros
        const msg = (error.message || '').toLowerCase();
        if (msg.includes('already registered') || msg.includes('already exists') || msg.includes('duplicate')) {
          setStatus('Este email ya tiene cuenta. Toca "Ya tengo cuenta" para entrar.');
        } else if (msg.includes('invalid email')) {
          setStatus('Email invalido');
        } else if (msg.includes('weak password') || msg.includes('password')) {
          setStatus('Contrasena muy debil. Usa al menos 6 caracteres con letras y numeros.');
        } else {
          setStatus('Error: ' + error.message);
        }
        setLoading(false);
        return;
      }

      // Si la sesión vino directa (confirm email OFF en Supabase) → login automatico
      if (data?.session) {
        // Build 19 BUG P0 fix — Capa 1 self-heal optimista:
        // crear fila en tabla 'usuarios' (plan='FREE' default). Si falla, no bloquea
        // al user — la Capa 2 (usePlan auto-heal en 404) recupera al siguiente GET.
        try {
          const BACKEND = 'https://aurex-app-production.up.railway.app';
          await fetch(`${BACKEND}/api/usuario`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: data.user.id,
              email: data.user.email,
              plan: 'FREE',
            }),
          });
        } catch (e) {
          console.warn('[Signup] POST /api/usuario fallo, Capa 2 lo recupera en next GET:', e.message);
        }
        // Build 34 IAP-3: identificar usuario con RC post-signup exitoso (despues del POST /api/usuario
        // para garantizar que la fila Supabase existe antes de que RC mande webhook)
        try { await Purchases.logIn(data.user.id); } catch (e) { console.warn('[IAP-3] Purchases.logIn fallo:', e?.message); }
        setStatus(t('entrando') || 'Entrando...');
        setLoading(false);
        if (onSuccess) onSuccess();
        return;
      }

      // Si requiere confirmación por email, avisarle al user
      if (data?.user && !data.session) {
        setLoading(false);
        Alert.alert(
          'Revisa tu email',
          'Te enviamos un email para confirmar tu cuenta. Despues vuelve aca para ingresar.',
          [{ text: 'OK', onPress: () => onGoToLogin && onGoToLogin() }]
        );
        return;
      }

      // Caso raro
      setStatus('Respuesta inesperada del servidor');
      setLoading(false);
    } catch (e) {
      setStatus('Red: ' + (e.message || 'sin conexion'));
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.logoWrap}>
          <AurexLogo size={120} noBackground />
        </View>
        <Text style={styles.logo}>{BRAND_NAME}</Text>
        <Text style={styles.subtitle}>Crear cuenta gratis</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={C.textDim}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          autoCorrect={false}
        />

        <View style={styles.passwordWrap}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder={'Contrasena (min 6)'}
            placeholderTextColor={C.textDim}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPassword(v => !v)}>
            <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁'}</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder={'Repetir contrasena'}
          placeholderTextColor={C.textDim}
          value={password2}
          onChangeText={setPassword2}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button} onPress={signUp} disabled={loading}>
          {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.buttonText}>Crear cuenta</Text>}
        </TouchableOpacity>

        {status ? <Text style={styles.status}>{status}</Text> : null}

        {/* Build 19 v3: botón Opción C — gris #1f2530 + borde dorado + texto dorado.
            Consistencia visual con "Ya tengo cuenta" slide 4 y "No tengo cuenta" LoginScreen. */}
        <TouchableOpacity onPress={onGoToLogin} style={styles.btnOpcionC}>
          <Text style={styles.btnOpcionCText}>Ya tengo cuenta — Ingresar</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const makeStyles = (C) => StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg, justifyContent: 'center', padding: 24 },
  logoWrap: { alignItems: 'center', marginBottom: 8 },
  logo: { fontSize: 36, fontWeight: 'bold', color: C.gold, textAlign: 'center', marginBottom: 4 },
  subtitle: { fontSize: 14, color: C.textSec, textAlign: 'center', marginBottom: 32 },
  input: { backgroundColor: C.card, color: C.text, borderRadius: 12, padding: 14, marginBottom: 14, fontSize: 15, borderWidth: 1, borderColor: C.border2 },
  passwordWrap: { position: 'relative' },
  passwordInput: { paddingRight: 48 },
  eyeBtn: { position: 'absolute', right: 12, top: 0, bottom: 14, width: 36, alignItems: 'center', justifyContent: 'center' },
  eyeIcon: { fontSize: 22 },
  button: { backgroundColor: C.gold, borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 6 },
  buttonText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  status: { color: C.textSec, fontSize: 13, textAlign: 'center', marginTop: 14, paddingHorizontal: 8 },
  linkWrap: { alignItems: 'center', marginTop: 22, padding: 8 },
  linkText: { color: C.gold, fontSize: 13, fontWeight: '600', textDecorationLine: 'underline' },
  // Build 19 v3: Opción C — fondo gris + borde dorado + texto dorado
  btnOpcionC: {
    marginTop: 18,
    backgroundColor: '#1f2530',
    borderWidth: 1,
    borderColor: C.gold,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
  },
  btnOpcionCText: {
    color: C.gold,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
