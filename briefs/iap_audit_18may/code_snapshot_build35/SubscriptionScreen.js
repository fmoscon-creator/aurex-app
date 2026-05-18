import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, ScrollView, DeviceEventEmitter } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Purchases from 'react-native-purchases';
import { useT } from '../lib/i18n';
import { supabase } from '../lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTheme } from '../lib/ThemeContext';

const BACKEND = 'https://aurex-app-production.up.railway.app';

export default function SubscriptionScreen({ navigation }) {
  const { theme: C } = useTheme();
  const st = useMemo(() => makeStyles(C), [C]);
  const t = useT();
  const [offerings, setOfferings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  // Build 18 fix #8: leer plan actual del usuario al iniciar para no mostrar "Quiero PRO" si ya es PRO
  const [currentPlan, setCurrentPlan] = useState('FREE');

  useEffect(() => {
    loadOfferings();
    loadCurrentPlan();
  }, []);

  const loadCurrentPlan = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const uid = session?.user?.id;
      if (!uid) {
        // Fallback al cache local
        const cached = await AsyncStorage.getItem('aurex_plan');
        if (cached) setCurrentPlan(cached);
        return;
      }
      const r = await fetch(`${BACKEND}/api/usuario/${uid}`, {
        headers: session?.access_token ? { 'Authorization': `Bearer ${session.access_token}` } : {},
      });
      if (r.ok) {
        const d = await r.json();
        const p = String(d?.plan || 'FREE').toUpperCase();
        if (['FREE', 'PRO', 'ELITE'].includes(p)) {
          setCurrentPlan(p);
          try { await AsyncStorage.setItem('aurex_plan', p); } catch {}
        }
      }
    } catch (e) {
      // Fallback al cache local
      try {
        const cached = await AsyncStorage.getItem('aurex_plan');
        if (cached) setCurrentPlan(cached);
      } catch {}
    }
  };

  const loadOfferings = async () => {
    try {
      const off = await Purchases.getOfferings();
      setOfferings(off);
    } catch (e) {
      // Build 22 Bug #6: superficiar error real + log para debug
      console.error('[SUB] loadOfferings failed:', e);
      Alert.alert('Error', e.message || e.toString() || 'No se pudieron cargar los planes.');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (pkg) => {
    try {
      setPurchasing(true);
      const { customerInfo } = await Purchases.purchasePackage(pkg);

      // Build 22 Bug #8: debug detallado del customerInfo retornado
      console.log('[SUB] customerInfo post-purchase:', JSON.stringify(customerInfo?.entitlements?.active || {}, null, 2));
      console.log('[SUB] entitlement keys:', Object.keys(customerInfo?.entitlements?.active || {}));

      const hasPro = !!customerInfo?.entitlements?.active?.['pro'];
      const hasElite = !!customerInfo?.entitlements?.active?.['elite'];

      if (hasPro || hasElite) {
        // Build 22 Bug #8: actualizar UI local + AsyncStorage + emitir evento global
        // para que PerfilScreen y resto de la app refresquen sin esperar al backend.
        const newPlan = hasElite ? 'ELITE' : 'PRO';
        setCurrentPlan(newPlan);
        try { await AsyncStorage.setItem('aurex_plan', newPlan); } catch {}
        DeviceEventEmitter.emit('plan_changed', { plan: newPlan, source: 'purchase' });
        Alert.alert(t('listo'), t('plan_activado'));
        navigation.goBack();
      } else {
        // Compra exitosa pero RC no otorgó entitlement (sandbox License Tester u otro caso).
        console.warn('[SUB] purchase OK pero sin entitlement activo. Keys recibidas:', Object.keys(customerInfo?.entitlements?.active || {}));
        Alert.alert(
          'Compra procesada',
          'La compra se completó pero la activación del plan puede demorar unos minutos. Si no se activa, escribinos.'
        );
      }
    } catch (e) {
      // Build 22 Bug #6: log + fallback
      console.error('[SUB] purchase failed:', e);
      if (!e.userCancelled) {
        // Build 35 DEBUG temporal: mostrar TODOS los detalles del error en pantalla
        // ProGuard strippea console.error en release, por eso necesitamos Alert visible.
        // REVERTIR este Alert detallado en Build 36 una vez identificado el codigo.
        const debugInfo = [
          `code: ${e.code || 'N/A'}`,
          `readableErrorCode: ${e.readableErrorCode || 'N/A'}`,
          `userCancelled: ${e.userCancelled}`,
          `underlyingErrorMessage: ${e.underlyingErrorMessage || 'N/A'}`,
          `message: ${e.message || 'N/A'}`,
        ].join('\n');
        Alert.alert('Error IAP debug', debugInfo);
      }
    } finally {
      setPurchasing(false);
    }
  };

  const handleRestore = async () => {
    try {
      setPurchasing(true);
      const customerInfo = await Purchases.restorePurchases();
      const activeKeys = Object.keys(customerInfo?.entitlements?.active || {});
      console.log('[SUB] restore entitlement keys:', activeKeys);

      if (activeKeys.length > 0) {
        // Build 22 Bug #8: idem handlePurchase — sync local + emitir evento.
        const hasElite = !!customerInfo.entitlements.active['elite'];
        const newPlan = hasElite ? 'ELITE' : 'PRO';
        setCurrentPlan(newPlan);
        try { await AsyncStorage.setItem('aurex_plan', newPlan); } catch {}
        DeviceEventEmitter.emit('plan_changed', { plan: newPlan, source: 'restore' });
        Alert.alert(t('listo'), t('plan_activado'));
        navigation.goBack();
      } else {
        Alert.alert('Sin compras activas', 'No encontramos compras previas para restaurar en esta cuenta.');
      }
    } catch (e) {
      // Build 22 Bug #6
      console.error('[SUB] restore failed:', e);
      Alert.alert('Error', e.message || e.toString() || 'No se pudo restaurar la compra.');
    } finally {
      setPurchasing(false);
    }
  };

  if (loading) {
    return (
      <View style={[st.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={C.gold} />
      </View>
    );
  }

  const packages = offerings?.current?.availablePackages || [];

  return (
    <SafeAreaView style={st.container}>
      <ScrollView contentContainerStyle={st.scroll}>
        {/* Header */}
        <TouchableOpacity style={st.backBtn} onPress={() => navigation.goBack()}>
          <Text style={st.backText}>{t('volver')}</Text>
        </TouchableOpacity>

        <Text style={st.title}>{t('elegir_plan')}</Text>
        <Text style={st.subtitle}>{t('todos_planes_incluyen')}</Text>

        {/* Plan FREE — Build 18 fix #8: badge "Plan actual" solo si efectivamente es FREE */}
        <View style={[st.card, st.cardFree]}>
          <View style={st.cardHeader}>
            <Text style={st.planName}>FREE</Text>
            <Text style={st.planPrice}>$0</Text>
          </View>
          <Text style={st.planDesc}>{t('para_empezar')}</Text>
          {currentPlan === 'FREE' && (
            <View style={st.badge}>
              <Text style={st.badgeText}>{t('plan_actual')}</Text>
            </View>
          )}
        </View>

        {/* Planes de RevenueCat */}
        {packages.length === 0 ? (
          <View style={st.card}>
            <Text style={{ color: C.textSec, textAlign: 'center' }}>{t('cargando')}</Text>
          </View>
        ) : (
          packages.map((pkg) => {
            const isPro = pkg.product.identifier.includes('pro');
            const accentColor = isPro ? C.purple : C.gold;
            // Build 18 fix #8: detectar si el usuario YA tiene este plan
            const planNombre = isPro ? 'PRO' : 'ELITE';
            const yaTiene = currentPlan === planNombre;
            return (
              <View key={pkg.identifier} style={[st.card, { borderColor: accentColor }]}>
                <View style={st.cardHeader}>
                  <Text style={[st.planName, { color: accentColor }]}>
                    {planNombre}
                  </Text>
                  <Text style={st.planPrice}>{pkg.product.priceString}</Text>
                </View>
                <Text style={st.planDesc}>{pkg.product.description}</Text>
                {yaTiene ? (
                  <View style={[st.badge, { backgroundColor: '#1A2A1A' }]}>
                    <Text style={st.badgeText}>{t('plan_actual')}</Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={[st.buyBtn, { backgroundColor: accentColor }]}
                    onPress={() => handlePurchase(pkg)}
                    disabled={purchasing}
                  >
                    {purchasing ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <Text style={st.buyBtnText}>{isPro ? t('quiero_pro') : t('quiero_elite')}</Text>
                    )}
                  </TouchableOpacity>
                )}
              </View>
            );
          })
        )}

        {/* Restaurar compras */}
        <TouchableOpacity style={st.restoreBtn} onPress={handleRestore} disabled={purchasing}>
          <Text style={st.restoreText}>{t('restaurar_compras')}</Text>
        </TouchableOpacity>

        <Text style={st.legal}>
          {t('disclaimer_suscripcion')}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const makeStyles = (C) => StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  scroll: { padding: 20, paddingBottom: 40 },
  backBtn: { marginBottom: 16 },
  backText: { color: C.gold, fontSize: 14 },
  title: { fontSize: 24, fontWeight: '700', color: C.text, marginBottom: 6 },
  subtitle: { fontSize: 13, color: C.textSec, marginBottom: 24 },
  card: { backgroundColor: C.card, borderRadius: 12, borderWidth: 1, borderColor: C.border, padding: 16, marginBottom: 14 },
  cardFree: { borderColor: C.border },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  planName: { fontSize: 18, fontWeight: '700', color: C.text },
  planPrice: { fontSize: 18, fontWeight: '700', color: C.text },
  planDesc: { fontSize: 12, color: C.textSec, marginBottom: 12 },
  badge: { backgroundColor: '#1A2A1A', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 4, alignSelf: 'flex-start' },
  badgeText: { fontSize: 11, color: C.green },
  buyBtn: { borderRadius: 8, padding: 12, alignItems: 'center', marginTop: 4 },
  buyBtnText: { fontSize: 14, fontWeight: '600', color: '#fff' },
  restoreBtn: { alignItems: 'center', marginTop: 8, marginBottom: 16 },
  restoreText: { fontSize: 13, color: C.textSec, textDecorationLine: 'underline' },
  legal: { fontSize: 10, color: C.textSec, textAlign: 'center', lineHeight: 15 },
});
