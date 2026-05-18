import React, { useState, useMemo } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, ActivityIndicator, KeyboardAvoidingView, Platform
} from 'react-native';
import { supabase } from '../lib/supabase';
import Purchases from 'react-native-purchases'; // Build 34 IAP-2: identificar usuario con RC post-login
import AurexLogo from '../components/AurexLogo';
import { useTheme } from '../lib/ThemeContext';
import { useT } from '../lib/i18n';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen({ onSuccess, onGoToSignup }) {
  const { theme: C } = useTheme();
  const t = useT();
  const styles = useMemo(() => makeStyles(C), [C]);

  const [email, setEmail] = useState(__DEV__ ? 'fmoscon@gmail.com' : '');
  const [password, setPassword] = useState(__DEV__ ? 'fm31012000' : '');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  async function signIn() {
    setLoading(true);
    setStatus(t('conectando'));

    // Intento 1: SDK Supabase
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (!error && data?.session) {
        // Build 34 IAP-2 Path 1: identificar usuario con RC post-login SDK
        try { await Purchases.logIn(data.user.id); } catch (e) { console.warn('[IAP-2.1] Purchases.logIn fallo:', e?.message); }
        setStatus(t('entrando'));
        setLoading(false);
        if (onSuccess) onSuccess();
        return;
      }
      if (error) setStatus('SDK: ' + error.message);
    } catch (e) {
      setStatus('SDK fallo, probando fetch directo...');
    }

    // Intento 2: Fetch directo (evita problemas de red del SDK)
    try {
      const res = await fetch('https://dklljnfhlzmfsfmxrpie.supabase.co/auth/v1/token?grant_type=password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrbGxqbmZobHptZnNmbXhycGllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1MzI3NDcsImV4cCI6MjA5MDEwODc0N30.FxegnijMue_K9jPqzY7gwNABaVpyyB6Io_ZkWLMSX9k',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.access_token) {
        setStatus('Fetch OK — seteando sesion...');
        await supabase.auth.setSession({
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        });
        // Build 34 IAP-2 Path 2: identificar usuario con RC post-setSession (fetch directo)
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (user?.id) await Purchases.logIn(user.id);
        } catch (e) { console.warn('[IAP-2.2] Purchases.logIn fallo:', e?.message); }
        setStatus(t('entrando'));
        setLoading(false);
        if (onSuccess) onSuccess();
        return;
      }
      setStatus('Error: ' + (data.error_description || data.msg || 'Sin respuesta'));
    } catch (e) {
      setStatus('Red: ' + e.message);
    }

    setLoading(false);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.logoWrap}>
        <AurexLogo size={160} noBackground />
      </View>
      <Text style={styles.logo}>AUREX</Text>
      <Text style={styles.subtitle}>{t('portfolio_tracker_ia')}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={C.textDim}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <View style={styles.passwordWrap}>
        <TextInput
          style={[styles.input, styles.passwordInput]}
          placeholder={t('contrasena')}
          placeholderTextColor={C.textDim}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.eyeBtn}
          onPress={() => setShowPassword(v => !v)}
        >
          <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={signIn} disabled={loading}>
        {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.buttonText}>{t('ingresar')}</Text>}
      </TouchableOpacity>
      {status ? <Text style={styles.status}>{status}</Text> : null}
      {/* Build 19 v2: botón a signup (Opción C — gris + borde dorado) para users que se equivocaron de flow */}
      {onGoToSignup && (
        <TouchableOpacity
          onPress={onGoToSignup}
          style={{
            marginTop: 22,
            backgroundColor: '#1f2530',
            borderWidth: 1,
            borderColor: C.gold,
            borderRadius: 12,
            padding: 14,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: C.gold, fontSize: 14, fontWeight: '700', letterSpacing: 0.3 }}>
            No tengo cuenta — Crear cuenta gratis
          </Text>
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const makeStyles = (C) => StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg, justifyContent: 'center', padding: 24 },
  logoWrap: { alignItems: 'center', marginBottom: 12 },
  logo: { fontSize: 42, fontWeight: 'bold', color: C.gold, textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 16, color: C.textSec, textAlign: 'center', marginBottom: 48 },
  input: { backgroundColor: C.card, color: C.text, borderRadius: 12, padding: 16, marginBottom: 16, fontSize: 16, borderWidth: 1, borderColor: C.border2 },
  passwordWrap: { position: 'relative', marginBottom: 16 },
  passwordInput: { marginBottom: 0, paddingRight: 48 },
  eyeBtn: { position: 'absolute', right: 12, top: 0, bottom: 0, width: 36, alignItems: 'center', justifyContent: 'center' },
  eyeIcon: { fontSize: 22 },
  button: { backgroundColor: C.gold, borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  status: { color: C.textSec, fontSize: 12, textAlign: 'center', marginTop: 16 },
});
