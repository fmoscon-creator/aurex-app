// AUREX ThemeContext
// Modos: 'light' | 'dark' | 'system'
// - 'system' sigue el modo del iPhone (useColorScheme de RN)
// - 'light' y 'dark' fuerzan el modo elegido por el usuario
//
// Persistencia: preference guardada en AsyncStorage 'theme_preference'
// Default para usuarios nuevos: 'light' (Modo Claro — decisión Fernando 13/abril)

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { THEMES } from './theme';

const STORAGE_KEY = 'theme_preference';
const DEFAULT_PREFERENCE = 'light';

const ThemeContext = createContext({
  theme: THEMES.dark,           // tokens del modo activo
  mode: 'dark',                 // 'light' | 'dark' — resultado efectivo
  preference: DEFAULT_PREFERENCE, // 'light' | 'dark' | 'system' — lo que el usuario eligió
  setPreference: () => {},
});

export function ThemeProvider({ children }) {
  const systemScheme = useColorScheme(); // 'light' | 'dark' | null
  const [preference, setPreferenceState] = useState(DEFAULT_PREFERENCE);
  const [loaded, setLoaded] = useState(false);

  // Cargar preferencia guardada al montar
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved === 'light' || saved === 'dark' || saved === 'system') {
          setPreferenceState(saved);
        }
      } catch (e) {
        // silent fail — queda el default
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  // Calcular modo efectivo
  const mode = preference === 'system'
    ? (systemScheme === 'light' ? 'light' : 'dark')
    : preference;

  const theme = THEMES[mode];

  const setPreference = async (newPref) => {
    if (newPref !== 'light' && newPref !== 'dark' && newPref !== 'system') return;
    setPreferenceState(newPref);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, newPref);
    } catch (e) {
      // silent fail
    }
  };

  // NO bloquear el render mientras carga AsyncStorage.
  // El BootSplash nativo cubre la pantalla durante esos pocos ms,
  // y el tema final se aplica apenas se resuelva el AsyncStorage.
  // (loaded queda como state por si en el futuro queremos usarlo)

  return (
    <ThemeContext.Provider value={{ theme, mode, preference, setPreference }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook para consumir el tema en componentes
// Uso: const { theme, mode, preference, setPreference } = useTheme();
export function useTheme() {
  return useContext(ThemeContext);
}
