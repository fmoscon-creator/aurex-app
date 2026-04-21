# PENDING REVIEW — Cache AsyncStorage para Señales IA y Pulse (4 archivos)

---

## Problema
Si Railway cae → sin señales IA ni Pulse en toda la app. Pantallas vacías.

## Fix
Al recibir datos exitosos del backend → guardar en AsyncStorage.
Si backend falla → leer de AsyncStorage (datos de la última sesión exitosa).

---

## Archivos modificados (NATIVA — branch dev)

### IAScreen.js
- Import: `import AsyncStorage from '@react-native-async-storage/async-storage'` (NUEVO)
- `loadSignals` éxito (L114): `AsyncStorage.setItem('aurex_ia_cache', JSON.stringify({ signals, prices, ts }))`
- `loadSignals` fallo (antes del cálculo local): lee `aurex_ia_cache`, si existe → usa esos datos + log con antigüedad en minutos

### MercadosScreen.js (ya tenía AsyncStorage importado)
- `loadPulse` éxito (L626): `AsyncStorage.setItem('aurex_pulse_cache', JSON.stringify({ data, ts }))`
- `loadPulse` fallo: lee `aurex_pulse_cache` como FALLBACK 1 antes del cálculo local (FALLBACK 2)
- `loadIASignals` éxito (L672): `AsyncStorage.setItem('aurex_ia_signals_map', JSON.stringify(map))`
- `loadIASignals` fallo: lee `aurex_ia_signals_map`

### WatchlistScreen.js
- Import: `import AsyncStorage from '@react-native-async-storage/async-storage'` (NUEVO)
- `loadSignals` éxito (L312): `AsyncStorage.setItem('aurex_wl_ia_cache', JSON.stringify(map))`
- `loadSignals` fallo: lee `aurex_wl_ia_cache`

### PortfolioScreen.js (ya tenía AsyncStorage importado)
- `useEffect ia-signals` éxito (L211): `AsyncStorage.setItem('aurex_port_ia_cache', JSON.stringify(sigs))`
- `useEffect ia-signals` fallo: lee `aurex_port_ia_cache`

---

## Keys AsyncStorage usadas

| Key | Qué guarda | Dónde se escribe | Dónde se lee |
|-----|-----------|-----------------|-------------|
| aurex_ia_cache | { signals, prices, ts } | IAScreen | IAScreen |
| aurex_pulse_cache | { data, ts } | MercadosScreen | MercadosScreen |
| aurex_ia_signals_map | { simbolo: signal } | MercadosScreen | MercadosScreen |
| aurex_wl_ia_cache | { simbolo: signal } | WatchlistScreen | WatchlistScreen |
| aurex_port_ia_cache | { simbolo: signal } | PortfolioScreen | PortfolioScreen |

## Impacto
- Señales IA: cache en 4 screens
- Pulse: cache en MercadosScreen
- Si Railway cae → app muestra últimos datos conocidos (nunca vacía)
- No toca backend ni PWA
