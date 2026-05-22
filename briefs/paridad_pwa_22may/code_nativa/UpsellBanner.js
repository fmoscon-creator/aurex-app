// UpsellBanner — Build 18 Bloque 3
// Banner compacto persistente que invita al FREE/PRO a upgrade. Visible en
// PerfilScreen + MercadosScreen. Se oculta automaticamente para usuarios ELITE.
// Texto cambia segun plan actual (FREE -> PRO, PRO -> ELITE).

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../lib/ThemeContext';
import { usePlan } from '../lib/usePlan';

export default function UpsellBanner({ compact = false, customTitle = null, customSubtitle = null }) {
  const { theme: C } = useTheme();
  const { plan } = usePlan();
  const navigation = useNavigation();

  // ELITE: sin banner — nada que upsellear
  if (plan === 'ELITE') return null;

  const isFree = plan === 'FREE' || !plan;
  const targetPlan = isFree ? 'PRO' : 'ELITE';
  const targetColor = isFree ? '#A78BFA' : '#D4A017';
  // Build 22 Bug #7: customTitle/customSubtitle overridean los textos default
  // (usado en PortfolioScreen para mostrar copy específico de portfolio).
  const titulo = customTitle || (isFree
    ? 'Pasate a PRO — $9,99/mes'
    : 'Pasate a ELITE — $19,99/mes');
  const subtitulo = customSubtitle || (isFree
    ? 'Activos ilimitados · 14 tipos de alertas · Telegram en tiempo real'
    : 'AUREX Pulse completo · RSI/MACD · Alertas geopolíticas GDELT');

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Subscription')}
      activeOpacity={0.8}
      style={{
        marginHorizontal: 14,
        marginVertical: compact ? 6 : 10,
        padding: compact ? 10 : 12,
        borderRadius: 12,
        backgroundColor: `${targetColor}15`,
        borderWidth: 1,
        borderColor: `${targetColor}40`,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <View style={{
        width: 36, height: 36, borderRadius: 18,
        backgroundColor: targetColor,
        alignItems: 'center', justifyContent: 'center',
      }}>
        <Text style={{ fontSize: 18 }}>{isFree ? '⚡' : '👑'}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 13, fontWeight: '800', color: targetColor }}>
          {titulo}
        </Text>
        <Text style={{ fontSize: 11, color: C.textSec, marginTop: 2 }}>
          {subtitulo}
        </Text>
      </View>
      <Text style={{ fontSize: 18, color: targetColor, fontWeight: '700' }}>›</Text>
    </TouchableOpacity>
  );
}
