// Componente LIVE reutilizable — incluye:
// - Punto verde pulsante
// - Texto "LIVE"
// - Timestamp "hace X min" relativo al prop lastUpdate
// - Auto-refresh del texto cada 30 seg
// - Bilingüe ES↔EN usando useT()

import React, { useState, useEffect } from 'react';
import { View, Text, Platform } from 'react-native';
import { useTheme } from '../lib/ThemeContext';
import { useT } from '../lib/i18n';

export default function LiveIndicator({ lastUpdate }) {
  const { theme: C } = useTheme();
  const t = useT();
  const [, setTick] = useState(0);

  // Re-render cada 30 seg para refrescar "hace X min"
  useEffect(() => {
    const iv = setInterval(() => setTick(x => x + 1), 30000);
    return () => clearInterval(iv);
  }, []);

  const formatRelativeTime = (ts) => {
    if (!ts) return '';
    const diff = Math.floor((Date.now() - ts) / 1000);
    if (diff < 10) return t('time_ahora');
    if (diff < 60) return t('time_hace_seg').replace('{n}', diff);
    const mins = Math.floor(diff / 60);
    if (mins < 60) return t('time_hace_min').replace('{n}', mins);
    const hrs = Math.floor(mins / 60);
    return t('time_hace_h').replace('{n}', hrs);
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
      <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: C.green }} />
      <Text style={{ fontSize: 10, color: C.text, fontWeight: '600' }}>LIVE</Text>
      {lastUpdate && Platform.OS !== 'ios' ? (
        <Text style={{ fontSize: 9, color: C.textSec, marginLeft: 4 }}>· {formatRelativeTime(lastUpdate)}</Text>
      ) : null}
    </View>
  );
}
