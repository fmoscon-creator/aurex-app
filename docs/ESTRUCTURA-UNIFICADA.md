# AUREX — Estructura Unificada de Datos
## Documento de referencia — Abril 2026

---

## PRINCIPIO FUNDAMENTAL

> **Una sola fuente de verdad para cada dato.**
> La PWA (aurex.live) y la App Nativa iOS leen del MISMO lugar.
> Si un dato aparece diferente entre ambas plataformas, es un bug.

---

## ARQUITECTURA

```
                    BACKEND RAILWAY
          aurex-app-production.up.railway.app
          ┌─────────────────────────────────┐
          │  GET /api/ia-signals            │ ← Senales IA (cada 5 min)
          │  GET /api/pulse                 │ ← AUREX Pulse score
          │  GET /api/portfolio/:userId     │ ← Portfolio + logos
          │  GET /api/yahoo?symbol=X        │ ← Proxy Yahoo Finance
          │  POST /api/portfolio            │ ← Agregar activo
          │  DELETE /api/portfolio/:id      │ ← Eliminar activo
          └──────────┬──────────┬───────────┘
                     │          │
              ┌──────┘          └──────┐
              ▼                        ▼
    ┌─────────────────┐     ┌─────────────────┐
    │   aurex.live     │     │   App Nativa     │
    │   (PWA)          │     │   (iOS)          │
    │   GitHub Pages   │     │   React Native   │
    └─────────────────┘     └─────────────────┘
         IDENTICAS              IDENTICAS
```

---

## FUENTES DE DATOS — Tabla de referencia

### 1. SENALES IA (Motor de 10 variables)

| Campo | Valor |
|-------|-------|
| **Fuente unica** | Backend Railway |
| **Endpoint** | `GET /api/ia-signals` |
| **Frecuencia** | Recalcula cada 5 minutos via cron |
| **Activos** | 350 desde `activos.json` (74 con señales IA propias del motor AUREX IA según `AUREX-IA-DOC.md` sección 8) |
| **PWA** | Lee de este endpoint. Fallback: calculo local |
| **Nativa** | Lee de este endpoint. Fallback: motor iaEngine.js local |

**10 Variables del motor:**
1. Tendencia 24h
2. RSI-14 (calculado desde closes 30d)
3. Volumen relativo (24h vs promedio)
4. Volatilidad (high-low / precio)
5. Correlacion (BTC para crypto, SPY para acciones)
6. Oro/Petroleo (impacto macro)
7. Macro (flag evento FED/CPI)
8. Earnings (flag reportes proximos)
9. MACD (EMA12 vs EMA26)
10. Soporte/Resistencia (posicion en rango 30d)

---

### 2. AUREX PULSE (Indicador de sentimiento)

| Campo | Valor |
|-------|-------|
| **Fuente unica** | Backend Railway |
| **Endpoint** | `GET /api/pulse` |
| **Frecuencia** | Recalcula cada 5 minutos via cron |
| **PWA** | Lee de este endpoint. Fallback: calculo local |
| **Nativa** | Lee de este endpoint |

**Variables ponderadas:**
- BTC posicion 90d (35%)
- BTC momentum (15%)
- ETH momentum (8%)
- VIX (20%)
- S&P 500 (8%)
- Futuros ES (5%)
- Oro (5%)
- Petroleo (4%)

**Rangos:**
- 0-20: MIEDO EXTREMO
- 21-40: MIEDO
- 41-60: NEUTRAL
- 61-80: CODICIA
- 81-100: CODICIA EXTREMA

---

### 3. PORTFOLIO (Cartera del usuario)

| Campo | Valor |
|-------|-------|
| **Base de datos** | Supabase tabla `portfolio` |
| **Endpoint** | `GET /api/portfolio/:userId` |
| **PWA** | Lee de Supabase directo (SDK JS) |
| **Nativa** | Lee del endpoint backend (que consulta Supabase) |
| **Resultado** | Items enriquecidos con `logo` y `ySymbol` de activos.json |

---

### 4. PRECIOS EN VIVO

| Tipo | Fuente | URL |
|------|--------|-----|
| **Crypto** | Binance API (publica, sin key) | `https://api.binance.com/api/v3/ticker/24hr?symbol={SYM}USDT` |
| **Acciones/ETF/Commodities** | Yahoo Finance via Railway proxy | `https://aurex-app-production.up.railway.app/api/yahoo?symbol={SYM}&interval=1d&range=5d` |
| **Klines historico** | Binance (crypto) | `https://api.binance.com/api/v3/klines?symbol={SYM}USDT&interval=1d&limit=N` |

**REGLA:** Ambas plataformas usan las MISMAS fuentes de precios:
- Crypto: siempre Binance
- No-crypto: siempre Yahoo via Railway proxy

---

### 5. LOGOS

| Tipo | Fuente | URL |
|------|--------|-----|
| **Crypto** | CoinGecko (hardcoded en activos.json) | Ejemplo: `https://assets.coingecko.com/coins/images/1/small/bitcoin.png` |
| **Acciones/ETF** | Financial Modeling Prep | `https://financialmodelingprep.com/image-stock/{SYMBOL}.png` |
| **Especiales** | SVG inline base64 (en activos.json) | ORO, metales, algunos commodities |

**REGLA:** El backend devuelve el campo `logo` de `activos.json` con cada activo del portfolio.
Ambas plataformas usan ese logo. No generan URLs por su cuenta.

---

### 6. FORMATO NUMERICO

| Campo | Valor |
|-------|-------|
| **Sistema** | `locale.js` con 8 idiomas |
| **Default** | `es-AR` (Espanol Argentina) |
| **Guardado** | AsyncStorage key `aurex_lang` |

**Idiomas y formatos:**
| Idioma | Codigo | Formato |
|--------|--------|---------|
| Espanol | es-AR | 22.361,63 (punto miles, coma decimal) |
| English | en-US | 22,361.63 (coma miles, punto decimal) |
| Portugues | pt-BR | 22.361,63 |
| Francais | fr-FR | 22.361,63 |
| Italiano | it-IT | 22.361,63 |
| Chino | zh-CN | 22,361.63 |
| Hindi | hi-IN | 22,361.63 |
| Arabe | ar-SA | 22,361.63 |

**REGLA:** Todas las pantallas importan `fmt`, `fmtPrice`, `fmtPct` de `locale.js`.
Cuando el usuario cambia idioma en Perfil, el formato cambia en toda la app.

---

### 7. TERMOMETRO DE RIESGO

| Campo | Valor |
|-------|-------|
| **Fuente senales** | Backend `/api/ia-signals` |
| **Fuente precios** | Binance (crypto) + Yahoo Railway (acciones) |
| **Calculo** | Valor total por direccion = (precio x cantidad) agrupado por ALCISTA/BAJISTA/ALTA CONV/SIN SENAL |

**REGLA:** Tanto PWA como nativa usan las senales del backend (direccion en MAYUSCULAS).
La PWA normaliza a minusculas internamente. La nativa usa mayusculas directo.

---

## REPOSITORIOS

| Componente | Repo | URL |
|------------|------|-----|
| **PWA** | aurex-app | https://github.com/fmoscon-creator/aurex-app |
| **Backend** | aurex-backend | https://github.com/fmoscon-creator/aurex-backend |
| **App Nativa** | Local | /Users/fernandomoscon/AurexApp |

---

## SERVICIOS

| Servicio | URL | Funcion |
|----------|-----|---------|
| **PWA** | https://aurex.live | GitHub Pages |
| **Backend** | https://aurex-app-production.up.railway.app | Railway (auto-deploy desde aurex-backend) |
| **Base de datos** | https://dklljnfhlzmfsfmxrpie.supabase.co | Supabase (auth + portfolio + watchlist) |
| **Precios crypto** | https://api.binance.com | Binance (publica) |
| **Precios acciones** | Via Railway proxy | Yahoo Finance |

---

## REGLAS DE DESARROLLO

1. **Si un dato existe en el backend, AMBAS plataformas lo leen de ahi. Nunca calcular localmente.**
2. **Sin datos demo, fake, Math.sin, seeds. TODO real.**
3. **Formato numerico depende del idioma elegido por el usuario.**
4. **Logos vienen de activos.json (backend). No hardcodear URLs.**
5. **Validar siempre en ambas plataformas antes de marcar como terminado.**
6. **El backend es la fuente unica de verdad.**

---

*Ultima actualizacion: 6 de abril de 2026*
*Generado por Claude Opus 4.6 para AUREX*
