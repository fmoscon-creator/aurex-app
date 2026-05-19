// AUREX BellButton — campana del header con badge de cantidad sin leer
// Se incluye en el header de las 6 TABs (Portfolio, Mercados, Watchlist, IA, Alertas, Perfil).
// Tap → navega a "MisAlertas".
//
// El count se obtiene self-contained vía useUnreadAlertsCount (Build 8 bloque 5d):
// hook que refresca el badge en cada focus de la screen donde está montado el BellButton.
// Decisión Escritorio: Opción Focus (NO realtime) para Build 8.
//
// Props:
//   onPress: () => void

import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useTheme } from '../lib/ThemeContext';
import { useUnreadAlertsCount } from '../lib/alertasService';

export default function BellButton({ onPress }) {
  const { theme: C } = useTheme();
  const [count] = useUnreadAlertsCount();
  const showBadge = typeof count === 'number' && count > 0;
  const badgeText = count > 99 ? '99+' : String(count);

  return (
    <TouchableOpacity
      onPress={onPress}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      style={{ position: 'relative', padding: 4 }}
    >
      <Text style={{ fontSize: 22, color: C.gold }}>{`\u{1F514}`}</Text>
      {showBadge ? (
        <View
          style={{
            position: 'absolute',
            top: -2,
            right: 0,
            minWidth: 16,
            height: 16,
            borderRadius: 8,
            backgroundColor: C.red,
            borderWidth: 2,
            borderColor: C.navBg,
            paddingHorizontal: 4,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 9, color: '#fff', fontWeight: '800' }}>{badgeText}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}
