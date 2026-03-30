# AUREX — Documentación Técnica y Funcional v4.0
*Actualizado: 30/03/2026 — Para consultas de usuarios e inversores*

---

## 1. QUÉ ES AUREX

AUREX es una aplicación financiera avanzada desarrollada en HTML/CSS/JavaScript Vanilla, desplegada en GitHub Pages con backend de datos en Supabase. Combina seguimiento de portafolio en tiempo real, mercados globales, análisis IA y un índice propietario multivariable de sentimiento de mercado.

**Competidores de referencia:** Yahoo Finance, Investing.com, Bloomberg Mobile  
**Diferenciador clave:** Integración algorítmica de geopolítica cuantitativa (GDELT) + macro FED (FRED API) + cripto + acciones en UN SOLO índice propietario.

---

## 2. ARQUITECTURA

- **Frontend:** HTML5 + CSS3 + JavaScript Vanilla (sin frameworks)
- **Hosting:** GitHub Pages (fmoscon-creator.github.io/aurex-app)
- **Base de datos:** Supabase (PostgreSQL)
- **Fuentes de datos en tiempo real:**
  - Binance API (cripto: precios 24h, klines para RSI)
  - Yahoo Finance via corsproxy.io (acciones, ETFs, futuros, materias primas)
  - FRED API / Federal Reserve (tasas FED, CPI, PBI, PPI)
  - GDELT Project (eventos geopolíticos globales en tiempo real)
  - VIX / Yahoo Finance (volatilidad implícita S&P 500)

---

## 3. TABS Y SECCIONES

### 3.1 PORTAFOLIO
- Valor total del portafolio en USD
- Variación desde precio de compra (ganancia/pérdida)
- Mejor activo del período
- Indicador de señales de Mercados del Mundo (banderas con estado abierto/cerrado)
- **AUREX PULSE™** — índice de sentimiento multivariable
- **Banner Futuros & Macro** — 11 instrumentos en tiempo real
- **Termómetro de Riesgo** — señal de alta convicción IA
- Lista de activos del portafolio con precios y variaciones

### 3.2 MERCADOS
- **Banner de EVENTOS** — ticker de noticias de alto impacto de Señales IA
- Indicadores de mercados del mundo
- **Banner Futuros & Macro** — idéntico al de Portafolio
- **AUREX PULSE™** — filtrado automáticamente por categoría activa
- Tabs de categorías: Cripto, Acciones, Stable & DeFi, Futuros, Metales, Bonos
- Selector de timeframe: 24h, 7d, 1m, 3m, 1a
- Indicador de mercado cerrado: **"Ult. cierre"** en dorado cuando el mercado está fuera de horario
- Botón "Editar orden" con flechas ▲▼ para reordenar activos

### 3.3 WATCHLIST
- Lista de seguimiento personalizada

### 3.4 SEÑALES IA
- Motor algorítmico de señales (BAJISTA / ALCISTA / CONF. IA)
- RSI14 real desde klines de Binance y Yahoo Finance
- Banner de noticias del día

### 3.5 ALERTAS
- Alertas de precio configurables

### 3.6 PERFIL
- Gestión de cuenta usuario

---

## 4. AUREX PULSE™ — ÍNDICE DE SENTIMIENTO

### 4.1 Nombre comercial
- **En la app:** AUREX PULSE™
- **En pitch/popup:** AUREX FEAR & GREED 14X™
- **Tagline:** "El índice de sentimiento más completo del mercado"

### 4.2 Las 5 zonas del gauge
| Rango | Color | Significado |
|-------|-------|-------------|
| 0–20 | Rojo intenso | Miedo Extremo |
| 21–40 | Naranja | Miedo |
| 41–60 | Amarillo | Neutral |
| 61–80 | Verde claro | Codicia |
| 81–100 | Verde intenso | Codicia Extrema |

**El gauge es semicircular**, va de rojo (izquierda) a verde (derecha), con aguja indicando el valor actual.

### 4.3 Variables activas (12 de 14 en producción)

| Variable | Fuente | Peso | Descripción | Interpretación |
|----------|--------|------|-------------|----------------|
| **BTC momentum** | Binance | 12% | Variación % de precio BTC en las últimas 24h | Positivo = codicia cripto activa |
| **ETH momentum** | Binance | 8% | Variación % de precio ETH en las últimas 24h | Confirma tendencia cripto |
| **VIX volatilidad** | Yahoo Finance | 14% | Índice de volatilidad implícita S&P 500 | VIX > 30 = miedo extremo; VIX < 15 = codicia |
| **S&P500 momentum** | Yahoo Finance | 8% | Variación % S&P 500 últimas 24h | Pulso del mercado acciones USA |
| **ES=F S&P Futuro** | Yahoo Finance | 8% | Futuro del S&P 500 (ES=F) | Expectativa mercado antes de apertura |
| **NQ=F Nasdaq Fut** | Yahoo Finance | 6% | Futuro del Nasdaq (NQ=F) | Expectativa tecnología |
| **YM=F Dow Futuro** | Yahoo Finance | 4% | Futuro del Dow Jones (YM=F) | Expectativa industria/blue chips |
| **RTY=F Russell Fut** | Yahoo Finance | 3% | Futuro del Russell 2000 | Expectativa small caps |
| **Oro GC=F** | Yahoo Finance | 8% | Precio del Oro (GC=F) | Activo refugio: sube = miedo; baja = codicia |
| **Plata SI=F** | Yahoo Finance | 4% | Precio de la Plata (SI=F) | Confirma tendencia metales preciosos |
| **Petróleo CL=F** | Yahoo Finance | 5% | Precio del petróleo WTI (CL=F) | Sube = actividad económica/inflación |
| **Cobre HG=F** | Yahoo Finance | 4% | Precio del cobre (HG=F) | "Doctor Copper": indicador de crecimiento global |
| **Macro FED** | FRED API | 12% | Tasa FED + CPI + PBI + PPI | Presión macro: tasas altas = miedo; datos fuertes = codicia |
| **Geopolítica** | GDELT Project | 4% | Eventos bélicos y catástrofes en tiempo real | Conflictos activos = miedo extremo |

*Total pesos: 100% | Variables en producción: 12/14 activas*

### 4.4 Filtros por categoría
El PULSE puede mostrarse segmentado por tipo de activo:
- **GLOBAL** — todas las variables combinadas (valor global del mercado)
- **CRIPTO** — ponderado hacia BTC/ETH momentum + VIX adaptado
- **ACCIONES** — ponderado hacia S&P500, futuros, VIX
- **COMODITIES** — ponderado hacia Oro, Plata, Petróleo, Cobre

**En Mercados:** el filtro se activa automáticamente según la tab seleccionada (Cripto → CRIPTO, Acciones → ACCIONES, etc.)

### 4.5 Diferencia con el índice de Binance y CNN
| | AUREX PULSE™ | Binance Fear & Greed | CNN Fear & Greed |
|--|--|--|--|
| Variables | 14 de 6 fuentes | 5 variables cripto | 7 variables acciones |
| Cobertura | Global (cripto + acciones + macro + geo) | Solo cripto | Solo acciones USA |
| Geopolítica | ✅ GDELT en tiempo real | ❌ | ❌ |
| Macro FED | ✅ FRED API | ❌ | Parcial |
| Futuros | ✅ 4 contratos | ❌ | ❌ |
| Commodities | ✅ Oro, Plata, Petróleo, Cobre | ❌ | ❌ |

**Por eso** el índice AUREX puede diferir del de Binance (ej: AUREX=47 Neutral vs Binance=25 Miedo) — son metodologías distintas con universos distintos.

### 4.6 Ponderación del cálculo MACRO FED (FRED API)
Se toman 4 indicadores macro con fallback automático:
- **Tasa FED** — tasa de fondos federales (mensual): alta tasa = más miedo
- **CPI** — inflación anual: > 3% = presión = miedo; < 2% = confianza = codicia
- **PBI** — crecimiento real: > 2% = codicia; < 0% = miedo extremo
- **PPI** — inflación productora: anticipa CPI futuro

Conversión: cada indicador se normaliza a 0-100, luego se promedia con la ponderación del 12% global.

### 4.7 Cálculo de Geopolítica (GDELT Project)
GDELT registra eventos globales en tiempo real (guerras, catástrofes, conflictos). El algoritmo:
1. Consulta los últimos 7 días de eventos con intensidad media y alta
2. Penaliza el índice según frecuencia de eventos negativos
3. Sin eventos = 50 (neutral); conflictos activos = < 20 (miedo extremo)
4. Incluye fallback automático si GDELT no responde

---

## 5. BANNER FUTUROS & MACRO

Presente en **Portafolio** y **Mercados**. Muestra en tiempo real (Yahoo Finance):

| Chip | Instrumento | Ticker |
|------|-------------|--------|
| S&P500 | S&P 500 Spot | ^GSPC |
| ES=F | S&P 500 Futuro | ES=F |
| Nasdaq | Nasdaq Composite | ^IXIC |
| NQ=F | Nasdaq Futuro | NQ=F |
| Dow | Dow Jones | ^DJI |
| YM=F | Dow Futuro | YM=F |
| Russell | Russell 2000 | ^RUT |
| Oro | Gold Futuro | GC=F |
| Plata | Silver Futuro | SI=F |
| Petróleo | WTI Crude | CL=F |
| Brent | Brent Crude | BNO |

---

## 6. SEÑALES IA — MOTOR ALGORÍTMICO

### 6.1 Tipos de señal
- **BAJISTA** — precio cayendo, volumen vendedor, correlación negativa. IA: "alta probabilidad de que siga bajando"
- **ALCISTA** — precio subiendo, volumen comprador, correlación positiva. IA: "alta probabilidad de que siga subiendo"
- **CONF. IA (Confluencia IA)** — señal más valiosa y rara. El activo está en indecisión técnica extrema, punto de ruptura en cualquier dirección. Máx. 1-2 por día.

### 6.2 Cómo leer las probabilidades
- **BAJISTA 75%** = 75% de probabilidad de que el precio siga bajando en las próximas 24-48hs
- **ALCISTA 68%** = 68% de probabilidad de subida en próximas 24-48hs
- **ALTA CONV-IA 85% ALCISTA** = señal más fuerte del día, 85% de convicción
- **Rango realista:** 55% a 88%. Nunca < 52% (sin señal) ni > 90% (certeza imposible)

### 6.3 Variables del algoritmo IA (en implementación)
1. **RSI14 real** — calculado desde 16 velas diarias (Binance klines para cripto, Yahoo range=30d para acciones)
2. **Tendencia multiperiodo** — comparación 1d/7d/30d
3. **Volumen real** — ratio volumen actual vs promedio 14 días
4. **Momentum precio** — variación % 24h normalizada
5. **Correlación BTC** — para cripto: correlación con BTC últimos 7 días
6. **Señal MACD** — dirección de la divergencia
7. **Soporte/Resistencia** — distancia % al nivel técnico más cercano
8. **Macro contexto** — alineación con índice AUREX PULSE

---

## 7. RSI14 REAL — IMPLEMENTACIÓN TÉCNICA

### 7.1 Fuentes de datos
- **Cripto:** Binance klines API (/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=16)
- **Acciones/ETFs:** Yahoo Finance chart API (interval=1d&range=30d)

### 7.2 Cálculo RSI14
```
RSI = 100 - (100 / (1 + RS))
RS = Promedio de ganancias (14 días) / Promedio de pérdidas (14 días)
```
- Se obtienen los últimos 16 cierres diarios
- Se calculan 15 variaciones día a día
- Se separan ganancias y pérdidas
- Se promedian con suavizado Wilder (EMA exponencial)

### 7.3 Cache en tiempo de sesión
Los valores RSI se cachean en `window._rsiCache[symbol]` para no refetchar en cada render. En producción hay hasta **74 activos** en cache simultáneamente.

### 7.4 Interpretación del RSI
| Valor | Zona | Señal |
|-------|------|-------|
| < 30 | Sobreventa extrema | Posible reversión alcista |
| 30-45 | Territorio bajista | Confirmación bajista |
| 45-55 | Neutral | Sin señal clara |
| 55-70 | Territorio alcista | Confirmación alcista |
| > 70 | Sobrecompra | Posible reversión bajista |

---

## 8. BANNER DE NOTICIAS (EVENTOS) EN MERCADOS

Ticker horizontal animado que muestra eventos de alto y medio impacto registrados por el motor de Señales IA (`window._IA_EVENTOS`). Idéntico al banner que corre en la tab Señales IA. Muestra el tipo de evento y descripción. Tiene botón X para cerrar. Se actualiza en tiempo real con cada refresh de Señales IA.

---

## 9. TIMEFRAMES EN MERCADOS

### 9.1 Opciones disponibles
| Botón | Rango Yahoo | Descripción |
|-------|-------------|-------------|
| **24h** | range=2d, interval=1d | Variación respecto al cierre anterior |
| **7d** | range=7d, interval=1d | Variación últimos 7 días |
| **1m** | range=1mo, interval=1d | Variación último mes |
| **3m** | range=3mo, interval=1wk | Variación últimos 3 meses |
| **1a** | range=1y, interval=1wk | Variación último año |

### 9.2 Indicador de mercado cerrado
Cuando el mercado está **fuera de horario** (marketState = CLOSED / PRE / POST), aparece la etiqueta **"Ult. cierre"** en color dorado (D4A017) en negrita debajo del precio, indicando que el valor mostrado es el último precio de cierre registrado.

---

## 10. EDITAR ORDEN EN MERCADOS

Al hacer click en **"Editar orden"**, se activa el modo de reordenamiento:
- Aparece banner superior: "Arrastrar para reordenar — Tocar para ocultar"
- Cada activo muestra botones **▲** (subir) y **▼** (bajar)
- Los cambios de orden son inmediatos y visuales dentro de la sesión
- Al hacer click en **"Listo"**, se desactiva el modo edición y los botones desaparecen

---

## 11. INDICADORES DE MERCADO DEL MUNDO

Banner superior en ambas tabs mostrando el estado de 6 bolsas globales:
- 🇺🇸 EEUU (NYSE/NASDAQ)
- 🇦🇷 ARG (BYMA)
- 🇪🇸 ESPAÑA (BME)
- 🇯🇵 JAPÓN (TSE)
- 🇬🇧 UK (LSE)
- 🇩🇪 ALEMANIA (XETRA)

**Estados:** 🟢 ABIERTO (verde) / 🔴 CERRADO (rojo) con cuenta regresiva hasta apertura/cierre.

---

## 12. HISTORIAL DE COMMITS (SESIONES TÉCNICAS)

| SHA | Descripción |
|-----|-------------|
| ec3818f3 | Fear&Greed gauge + Futures/Indices/Bonds banner Portfolio & Mercados |
| babb609b | AUREX PULSE 14X — 12 variables, filtros por categoría, asterisco |
| c85df014 | AUREX PULSE Commit B — FRED API + GDELT integrados con fallback |
| f2d82a99 | Compact Portfolio, news banner Mercados, RSI14 real (74 activos) |
| b3e1e541 | Mercados: Ult.cierre label, timeframes 3m/1a, stf(), toggleEdit() flechas |

---

## 13. ROADMAP

### Semana del 30/03 — 05/04/2026
- ✅ RSI14 real implementado
- ✅ Timeframes 3m y 1a en Mercados
- ✅ Indicador "Ult. cierre" mercado cerrado
- ✅ Editar orden con flechas ▲▼
- 🔄 **Señales IA completas** (algoritmo 8 variables: RSI + tendencia + volumen)
- ⬜ Watchlist persistente
- ⬜ Revisión conjunta Semana 1

### Semana 2 — 07/04/2026+
- ⬜ Conversor de activos
- ⬜ Alertas de precio (push notifications)
- ⬜ Portafolio social / comparación con benchmark

---

*AUREX — Inteligencia financiera al alcance de todos*  
*Documentación mantenida en GitHub: AUREX-PORTFOLIO-DOC.md*
