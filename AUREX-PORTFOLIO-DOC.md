# AUREX — Documentación Completa: Portfolio & Mercados

**Versión:** 3.0 (Marzo 2026)
**Plataforma:** GitHub Pages + Supabase | Vanilla HTML/CSS/JS
**Objetivo:** Aplicación financiera con señales IA para inversores retail y profesionales

---

## 🏆 POSICIONAMIENTO COMPETITIVO

| Característica | Yahoo Finance | Investing.com | Binance | **AUREX** |
|---|---|---|---|---|
| Señales IA propias | ❌ | ❌ | Parcial | ✅ 8 variables |
| AUREX PULSE™ (F&G 14 variables) | ❌ | ❌ | 5 vars solo cripto | ✅ 14 vars, 6 categorías |
| Futuros + Bonos + VIX en tiempo real | ✅ | ✅ | ❌ | ✅ |
| Macro FED (FRED API) | ❌ | ❌ | ❌ | ✅ |
| Geopolítica algorítmica (GDELT) | ❌ | ❌ | ❌ | ✅ |
| Termómetro de riesgo del portfolio | ❌ | ❌ | ❌ | ✅ |
| Simulador de escenarios | ❌ | ❌ | ❌ | ✅ |
| 52 semanas con texto educativo | Parcial | Parcial | ❌ | ✅ |
| Banner mercados globales (11 países) | ❌ | ❌ | ❌ | ✅ |
| Texto educativo para principiantes | ❌ | ❌ | ❌ | ✅ |

---

## ⚡ AUREX PULSE™ — Fear & Greed 14X

### Nombre comercial
- **En la app:** AUREX PULSE™
- **En el popup / pitch:** AUREX FEAR & GREED 14X™
- **Tagline:** *"El índice de sentimiento más completo del mercado. 14 variables. Un solo número."*

### ¿Qué es?
Índice propietario que mide en tiempo real el estado emocional y técnico de los mercados financieros globales en una escala de 0 a 100. Combina 14 variables de 6 categorías y 4 fuentes de datos. Disponible en **Portfolio** y **Mercados**, con filtros de categoría clickeables.

### Las 5 Zonas

| Valor | Emoji | Zona | Color | Significado |
|---|---|---|---|---|
| 0–20 | 😱 | Miedo Extremo | 🔴 Rojo oscuro | Pánico. Históricamente zona de oportunidad de compra. |
| 21–40 | 😰 | Miedo | 🟠 Naranja | Cautela. Inversores vendiendo. Analizar antes de actuar. |
| 41–60 | 😐 | Neutral | 🟡 Amarillo | Mercado equilibrado. Analizar fundamentals. |
| 61–80 | 😏 | Codicia | 🟢 Verde | Optimismo. Precios pueden estar elevados. |
| 81–100 | 🤑 | Codicia Extrema | 💚 Verde brillante | Euforia. Alta probabilidad de corrección próxima. |

### Las 14 Variables — AUREX FEAR & GREED 14X™

#### 🪙 CRIPTO (20% en GLOBAL)
| # | Variable | Fuente | Peso Global | Lógica |
|---|---|---|---|---|
| 1 | BTC momentum 24h | Binance | 12% | BTC subiendo = codicia. Cayendo = miedo. Termómetro principal del cripto. |
| 2 | ETH momentum 24h | Binance | 8% | Confirma o contradice BTC. Divergencia = señal de precaución. |

#### 📈 SENTIMIENTO ACCIONES (22% en GLOBAL)
| # | Variable | Fuente | Peso Global | Lógica |
|---|---|---|---|---|
| 3 | VIX — Índice de Volatilidad | Yahoo Finance | 14% | VIX > 30 = pánico. VIX < 15 = calma y codicia. Indicador más usado por institucionales. |
| 4 | S&P500 momentum | Yahoo Finance | 8% | Salud del índice más representativo del mundo. |

#### ⚡ FUTUROS DE ÍNDICES (21% en GLOBAL)
| # | Variable | Fuente | Peso Global | Lógica |
|---|---|---|---|---|
| 5 | ES=F — S&P500 Futuro | Yahoo Finance | 8% | Anticipa apertura de bolsa. Futuro verde = expectativa alcista. |
| 6 | NQ=F — Nasdaq Futuro | Yahoo Finance | 6% | Tecnología y growth. Alta correlación con cripto. |
| 7 | YM=F — Dow Jones Futuro | Yahoo Finance | 4% | Empresas industriales/financieras. Ancla de estabilidad. |
| 8 | RTY=F — Russell 2000 Futuro | Yahoo Finance | 3% | Empresas pequeñas EEUU. Sube = inversores tomando riesgo = alcista. |

#### 🛢️ COMMODITIES (21% en GLOBAL)
| # | Variable | Fuente | Peso Global | Lógica |
|---|---|---|---|---|
| 9 | GC=F — Oro | Yahoo Finance | 8% | Activo refugio. Oro subiendo = huida al refugio = miedo. Invertido al score. |
| 10 | SI=F — Plata | Yahoo Finance | 4% | Confirma señal del oro. Oro + Plata subiendo = refugio confirmado. |
| 11 | CL=F — Petróleo WTI | Yahoo Finance | 5% | Muy alto = presión inflacionaria. Muy bajo = recesión. Variable de doble filo. |
| 12 | HG=F — Cobre ("Dr. Copper") | Yahoo Finance | 4% | Mejor predictor del crecimiento económico global. Cobre sube = economía crece = alcista. Exclusivo AUREX. |

#### 🏦 MACRO FED (12% en GLOBAL)
| # | Variable | Fuente | Peso Global | Lógica |
|---|---|---|---|---|
| 13 | Tasa Federal Funds Rate | FRED API (Fed Reserve) | 12% | Tasa subiendo = tightening = presión bajista. Tasa bajando = easing = alcista. Score 0–100 calculado desde delta mensual. Fallback: VIX-based proxy si FRED no responde. |

#### 🌍 GEOPOLÍTICA (4% en GLOBAL)
| # | Variable | Fuente | Peso Global | Lógica |
|---|---|---|---|---|
| 14 | Tensión Geopolítica Global | GDELT Project | 4% | Análisis de millones de noticias globales en tiempo real. Tono promedio de noticias → score. Solo empuja hacia miedo (asimétrico). Fallback: VIX-proxy si GDELT no responde. Actualización cada 15 min. |

### Filtros de Categoría
El gauge cambia dinámicamente al seleccionar: 🌐 GLOBAL | 🪙 CRIPTO | 📈 ACCIONES | 🛢️ COMOD | ⚡ FUTUROS. En Mercados, el filtro cambia automáticamente al cambiar de tab.

### Aclaración importante
*"* Índice AUREX propio — 14 variables de 6 fuentes. Difiere de Binance (solo cripto, 5 vars) y CNN (solo acciones, 7 vars)."*

### Diferenciador vs competencia
| | CNN F&G | Binance F&G | **AUREX PULSE 14X™** |
|---|---|---|---|
| Variables | 7 | 5-6 | **14** |
| Cripto | ❌ | ✅ | ✅ |
| Acciones/VIX | ✅ | ❌ | ✅ |
| Futuros de índices | ❌ | ❌ | ✅ |
| Commodities (Oro, Cobre, Petróleo) | ❌ | ❌ | ✅ |
| Macro FED (tasa de interés) | ❌ | ❌ | ✅ |
| Geopolítica algorítmica (GDELT) | ❌ | ❌ | ✅ |
| Segmentado por categoría de activo | ❌ | ❌ | ✅ |
| Texto educativo para principiantes | ❌ | Parcial | ✅ |

---

## 📊 TAB PORTFOLIO — Funciones Completas

### 1. RESUMEN DE CARTERA (Header)
- **VALOR TOTAL**: Suma de valor actual (precio de mercado × cantidad)
- **P&L USD**: Ganancia/pérdida en dólares desde precio de compra
- **P&L %**: Variación porcentual global
- **ACTIVOS**: Cantidad de activos distintos
- **MEJOR**: Activo con mayor % de ganancia

### 2. BANNER MERCADOS GLOBALES
11 mercados con estado ABIERTO/CERRADO + tiempo restante. Configurable con toggle + localStorage.

Mercados: 🇺🇸 EEUU | 🇦🇷 ARG | 🇧🇷 BRASIL | 🇬🇧 LONDRES | 🇪🇸 ESPAÑA | 🇩🇪 ALEMANIA | 🇫🇷 FRANCIA | 🇯🇵 JAPÓN | 🇨🇳 CHINA | 🇭🇰 HONG KONG | 🌏 ASIA

### 3. BANNER FUTUROS & MACRO
11 instrumentos en tiempo real: ES=F, NQ=F, YM=F, RTY=F, GC=F, CL=F, SI=F, ^TNX, ^IRX, DX-Y.NYB, ^VIX. Actualización cada 60 segundos.

### 4. AUREX PULSE™ (ver sección completa arriba)
Gauge con 14 variables. Disponible en Portfolio Y Mercados.

### 5. TERMÓMETRO DE RIESGO
Barra que muestra distribución del capital por señal IA: ALCISTA | ALTA CONV-IA | BAJISTA | SIN SEÑAL. Texto educativo dinámico + botón ? con popup explicativo.

### 6. LISTADO DE ACTIVOS (2 líneas por fila)
- Línea 1: Logo + Símbolo + Categoría + Valor actual USD + botón eliminar
- Línea 2: Cantidad @ precio + % cambio + tabs 24h|7d|1m|3m|1y
- Mercado cerrado: % en gris con etiqueta "ult.cierre"

### 7. PANEL DE DETALLE DEL ACTIVO (5 bloques)
- **Bloque 1**: Precio compra | Cantidad | P&L USD | Fecha entrada | Mín 52s | Máx 52s
- **Bloque 2**: Barra 52 semanas con texto interpretativo (🟢 Zona Baja / 🟡 Zona Media / 🔴 Zona Alta)
- **Bloque 3**: Señal IA (ALCISTA/BAJISTA/ALTA CONV-IA) con probabilidades
- **Bloque 4**: 8 variables del algoritmo IA con valores en tiempo real
- **Bloque 5**: Simulador de Escenarios (slider -50%/+50% → nuevo precio, P&L, impacto portfolio)

---

## 📈 TAB MERCADOS — Funciones Completas

- **Banner Mercados Globales** — igual que Portfolio
- **Banner Futuros & Macro** — igual que Portfolio (actualización 60s)
- **AUREX PULSE™** — igual que Portfolio, cambia por categoría al cambiar de tab automáticamente
- **Tabs de categorías**: Cripto | Acciones USA | Acciones ARG | Stable & DeFi | Futuros | Metales | Bonos
- **Listado por categoría**: símbolo + nombre + precio + % 24h

---

## 🤖 MOTOR DE SEÑALES IA — Variables y Probabilidades

### Las 3 señales
- **BAJISTA**: Momentum negativo claro. Precio cayendo, volumen vendedor. IA: "alta probabilidad de que siga bajando".
- **ALCISTA**: Momentum positivo claro. Precio subiendo, volumen comprador. IA: "alta probabilidad de que siga subiendo".
- **ALTA CONV-IA**: Señal más valiosa y rara. Indecisión técnica extrema. A punto de romper fuerte en alguna dirección. 1-2 activos máximo por día.

### Las 8 variables del algoritmo IA
| # | Variable | Fuente | Lógica |
|---|---|---|---|
| 1 | RSI Simulado | Binance/Yahoo | Momentum vs hace 24h. Sobrecomprado/sobrevendido. |
| 2 | Tendencia 24h | Binance/Yahoo | Variación % real. Dirección y fuerza. |
| 3 | Volumen Relativo | Binance/Yahoo | Volumen actual vs promedio. Volumen alto + precio sube = señal fuerte. |
| 4 | Volatilidad | Calculada | Amplitud del rango de precio. Alta volatilidad = ruptura inminente. |
| 5 | Correlación de Mercado | Binance + Yahoo | Si BTC sube → altcoins suelen seguir. Si S&P500 cae → acciones correlacionan. |
| 6 | Oro y Petróleo | Yahoo Finance | Oro alto = aversión riesgo = presión bajista. Petróleo alto = inflación = presión FED. |
| 7 | Dato Macro del Día | FRED API | Fed, IPC, PBI, empleo. Aumenta incertidumbre. |
| 8 | Earnings Proximity | Yahoo Finance | Balance en próximos 7 días → aumenta volatilidad esperada. |

### Probabilidades
- Rango realista: **55% a 88%**. Nunca < 52% (sin señal) ni > 90% (certeza imposible).
- BAJISTA 75% = 75% de probabilidad de que el precio siga bajando en 24-48hs
- ALCISTA 68% = 68% de probabilidad de suba en próximas 24-48hs
- ALTA CONV-IA 85% ALCISTA = 85% de confianza en movimiento fuerte inminente con dirección confirmada

---

## 🛠️ ESPECIFICACIONES TÉCNICAS

### Stack
- Frontend: Vanilla HTML5 / CSS3 / JavaScript ES2020+
- Hosting: GitHub Pages
- Base de datos: Supabase (PostgreSQL + RLS)
- Auth: Supabase Auth (anónima + email/password)

### APIs utilizadas
| API | Datos | Frecuencia |
|---|---|---|
| Binance /ticker/24hr | Precio, % 24h, volumen cripto | Cada 30s |
| Binance /klines?interval=1w&limit=52 | Min/Max 52 semanas cripto | Al abrir detalle |
| Yahoo Finance /v8/finance/chart | Precio, meta, histórico acciones/ETFs | Cada 60s |
| Yahoo Finance ^VIX, ^GSPC | VIX + S&P500 para AUREX PULSE | Cada 5min |
| Yahoo Finance ES=F, NQ=F, GC=F... | Futuros, commodities, bonos | Cada 60s |
| FRED API (stlouisfed.org) | Tasa Federal Funds Rate | Cada 5min |
| GDELT Project API v2 | Tensión geopolítica global | Cada 5min |
| Supabase | Portfolio usuario (CRUD) | En tiempo real |

### Caches en memoria
- window._pulseRaw: datos crudos de las 14 variables (refresh 5min)
- window._pulseCache: scores calculados por categoría (GLOBAL/CRIPTO/ACCIONES/COMOD/FUTUROS)
- window._futuresCache: datos del banner futuros (refresh 60s)
- window._pcPrices: precios actuales del portfolio
- window._iaSignals: señales IA (refresh 5min)

---

## ✅ FUNCIONES IMPLEMENTADAS

| Función | Estado |
|---|---|
| Modales centrados (agregar activo + detalle) | ✅ |
| Banner mercados globales 11 países | ✅ |
| Banner Futuros & Macro (11 instrumentos) | ✅ |
| **AUREX PULSE™ — Gauge SVG** | ✅ |
| **AUREX PULSE™ — 12 variables activas** | ✅ |
| **AUREX PULSE™ — Macro FED (FRED API)** | ✅ |
| **AUREX PULSE™ — Geopolítica (GDELT)** | ✅ |
| **AUREX PULSE™ — Filtros por categoría** | ✅ |
| **AUREX PULSE™ — Cambia por tab en Mercados** | ✅ |
| **AUREX PULSE™ — Botón "Ver variables" visible** | ✅ |
| **AUREX PULSE™ — Asterisco con aclaración** | ✅ |
| Termómetro de Riesgo con texto educativo + ? | ✅ |
| Listado 2 líneas (logos + tabs iPhone) | ✅ |
| Tabs 24h | 7d | 1m | 3m | 1y | ✅ |
| Indicador 52 semanas con texto interpretativo | ✅ |
| Mín/Máx 52 semanas en grid de detalle | ✅ |
| Simulador de Escenarios (slider -50%/+50%) | ✅ |

## 🔜 ROADMAP PRÓXIMO

| Función | Fecha |
|---|---|
| Señales IA con RSI real + tendencia + volumen | Lun 30/03 |
| Watchlist persistente (botón estrella) | Mar 31/03 |
| Revisión conjunta Semana 1 | Mié 01/04 |
| Conversor — rotación de activos simulada | Semana 2 |

---

## 💡 PROPUESTA DE VALOR PARA INVERSORES

AUREX combina en una sola app lo que antes requería 4 herramientas:
1. **Bloomberg Terminal** → futuros, bonos, VIX, mercados globales en tiempo real
2. **TradingView** → análisis técnico, señales, indicadores visuales
3. **Binance App + CNN** → Fear & Greed Index, pero AUREX tiene 14X variables
4. **Portfolio tracker** → P&L, simulador de escenarios, termómetro de riesgo

Todo mobile-first, diseñado para ser entendido por principiantes sin sacrificar la profundidad que exigen los expertos.

**Diferenciador principal:** AUREX PULSE™ es el único índice de sentimiento del mercado que combina cripto, acciones, futuros, commodities, macro FED y geopolítica en un solo número — con texto educativo en cada indicador.

---

*AUREX-PORTFOLIO-DOC.md v3.0 — Marzo 2026*
*Mantenido automáticamente por AUREX Dev System*
