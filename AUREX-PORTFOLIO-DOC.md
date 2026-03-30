# AUREX — Documentación Completa: Portfolio & Mercados

**Versión:** 2.0 (Marzo 2026)
**Plataforma:** GitHub Pages + Supabase | Vanilla HTML/CSS/JS
**Objetivo:** Aplicación financiera con señales IA para inversores retail y profesionales

---

## 🏆 POSICIONAMIENTO COMPETITIVO

AUREX compite directamente con Yahoo Finance, Investing.com, Bloomberg y Binance App, diferenciándose por:

| Característica | Yahoo Finance | Investing.com | Binance | **AUREX** |
|---|---|---|---|---|
| Señales IA propias | ❌ | ❌ | Parcial | ✅ 8 variables |
| Fear & Greed multi-asset | ❌ | ❌ | Solo crypto | ✅ Crypto + Acciones |
| Futuros + Bonos + VIX en tiempo real | ✅ | ✅ | ❌ | ✅ |
| Termómetro de riesgo del portfolio | ❌ | ❌ | ❌ | ✅ |
| Simulador de escenarios | ❌ | ❌ | ❌ | ✅ |
| 52 semanas con texto educativo | Parcial | Parcial | ❌ | ✅ |
| Banner de mercados globales | ❌ | ❌ | ❌ | ✅ 11 mercados |
| Texto educativo para principiantes | ❌ | ❌ | ❌ | ✅ |

---

## 📊 TAB PORTFOLIO — Funciones Completas

### 1. RESUMEN DE CARTERA (Header)

Panel superior con métricas globales de la cartera en tiempo real:

- **VALOR TOTAL**: Suma de valor actual de todos los activos (precio de mercado × cantidad)
- **P&L USD**: Ganancia o pérdida en dólares desde el precio de compra (en verde si positivo, rojo si negativo)
- **P&L %**: Variación porcentual global de la cartera
- **ACTIVOS**: Cantidad de activos distintos en cartera
- **MEJOR**: Activo con mayor % de ganancia en el período seleccionado

Fuentes: Binance (cripto) + Yahoo Finance via corsproxy.io (acciones, ETFs, metales, bonos)

---

### 2. BANNER DE MERCADOS GLOBALES

Banner horizontal scrolleable con estado en tiempo real de los principales mercados financieros mundiales.

**Mercados disponibles (11 total):**

| Mercado | Zona horaria | Horario (UTC) |
|---|---|---|
| 🇺🇸 EEUU | New York | 13:30–20:00 |
| 🇦🇷 ARG | Buenos Aires | 14:00–21:00 |
| 🇧🇷 BRASIL | São Paulo | 13:00–19:35 |
| 🇬🇧 LONDRES | London | 08:00–16:30 |
| 🇪🇸 ESPAÑA | Madrid | 08:00–16:30 |
| 🇩🇪 ALEMANIA | Frankfurt | 08:00–16:30 |
| 🇫🇷 FRANCIA | Paris | 08:00–16:30 |
| 🇯🇵 JAPÓN | Tokyo | 00:00–06:30 |
| 🇨🇳 CHINA | Shanghai | 01:30–07:00 |
| 🇭🇰 HONG KONG | HK | 01:30–08:00 |
| 🌏 ASIA | Regional | 00:00–06:00 |

**Por cada mercado muestra:**
- Estado: 🟢 ABIERTO / 🔴 CERRADO
- Tiempo restante: "Abre en Xh Ym" / "Cierra en Xh Ym"
- Fin de semana: calcula reapertura del lunes

**Configurable:** botón ✏️ permite activar/desactivar mercados (guarda en localStorage). Activos por defecto: EEUU, ARG, ASIA.

---

### 3. BANNER DE FUTUROS, ÍNDICES, BONOS Y COMMODITIES ⭐ NUEVO

Banner horizontal scrolleable con datos en tiempo real de los principales instrumentos financieros globales. Equivalente a lo que usan traders profesionales en terminales Bloomberg.

**Instrumentos incluidos:**

| Categoría | Símbolo | Nombre |
|---|---|---|
| 🔵 FUTUROS | ES=F | S&P500 Futuro |
| 🔵 FUTUROS | NQ=F | Nasdaq Futuro |
| 🔵 FUTUROS | YM=F | Dow Jones Futuro |
| 🔵 FUTUROS | RTY=F | Russell 2000 Futuro |
| 🟡 COMOD | GC=F | Oro |
| 🟡 COMOD | CL=F | Petróleo WTI |
| 🟡 COMOD | SI=F | Plata |
| ⚪ BONOS | ^TNX | US Treasury 10Y Yield |
| ⚪ BONOS | ^IRX | US Treasury 2Y Yield |
| 🟣 MACRO | DX-Y.NYB | Dólar Index (DXY) |
| 🔴 SENTIM | ^VIX | VIX (Índice de Volatilidad) |

**Por cada instrumento muestra:**
- Categoría con color identificador
- Nombre corto + indicador de estado (● verde = operando, ○ gris = cerrado)
- Precio actual
- % cambio en verde (sube) o rojo (baja)

**Actualización:** automática cada 60 segundos. Fuente: Yahoo Finance.

**Valor para el usuario:** Permite leer el "pulso" del mercado global antes de que abran las bolsas — información antes exclusiva de traders institucionales, ahora disponible en AUREX.

---

### 4. ÍNDICE MIEDO / CODICIA ⭐ NUEVO

Gauge semicircular visual que mide el sentimiento general del mercado en una escala de 0 a 100, inspirado en el Fear & Greed Index pero **único en AUREX** porque combina datos de crypto Y mercados tradicionales.

**Zonas del índice:**

| Valor | Zona | Color | Interpretación |
|---|---|---|---|
| 0–20 | Miedo Extremo | 🔴 Rojo oscuro | Pánico. Históricamente zona de oportunidad de compra |
| 21–40 | Miedo | 🟠 Rojo | Cautela. Analizar antes de actuar |
| 41–60 | Neutral | 🟡 Amarillo | Mercado equilibrado. Momento de analizar fundamentals |
| 61–80 | Codicia | 🟢 Verde | Optimismo. Cuidado con sobrevaluación |
| 81–100 | Codicia Extrema | 💚 Verde claro | Euforia. Alta probabilidad de corrección próxima |

**Variables utilizadas (4 fuentes en tiempo real):**

| Variable | Fuente | Peso |
|---|---|---|
| BTC momentum 24h | Binance API | 35% |
| ETH momentum 24h | Binance API | 15% |
| VIX (volatilidad S&P500) | Yahoo Finance | 35% |
| S&P500 momentum | Yahoo Finance | 15% |

**Muestra además:**
- Valor VIX actual
- % cambio BTC 24h
- % cambio S&P500
- Texto educativo dinámico según zona

**Botón ?:** Popup explicativo completo para usuarios sin experiencia.

**Actualización:** automática cada 5 minutos.

**Diferenciador vs Binance:** El Fear & Greed de Binance solo mide cripto. El de AUREX integra también la volatilidad del S&P500 (VIX) y el momentum de acciones USA, dando una visión multi-mercado única.

---

### 5. TERMÓMETRO DE RIESGO DEL PORTFOLIO

Barra visual que muestra cómo está distribuido el capital del portfolio según las señales de la IA.

**Colores de la barra:**

| Segmento | Color | Significado |
|---|---|---|
| ALCISTA | 🟢 Verde | Capital en activos con señal alcista (sube) |
| ALTA CONV-IA | 🟡 Dorado | Capital en activos con señal de alta convicción IA |
| BAJISTA | 🔴 Rojo | Capital en activos con señal bajista (baja) |
| SIN SEÑAL | ⚫ Gris | Capital en activos sin señal activa |

**Texto explicativo dinámico:** El sistema detecta la situación dominante y genera un mensaje en lenguaje natural. Ejemplos:
- "✅ Portafolio mayormente ALCISTA — la IA detecta momentum positivo en tus activos"
- "⚠️ Tenés capital en zona de MÁXIMA ATENCIÓN — la IA detecta movimiento fuerte inminente"
- "🔴 Portafolio en zona de PRECAUCIÓN — más de la mitad de tu capital está en activos bajistas"

**Botón ?:** Popup educativo que explica cada señal:
- BAJISTA: "El activo tiene momentum negativo claro. Precio cayendo, volumen vendedor."
- ALCISTA: "El activo tiene momentum positivo claro. Precio subiendo, volumen comprador."
- CONF. IA (Alta Convicción): "Señal más valiosa y rara. El activo está en punto de indecisión técnica extrema. 1–2 activos máximo por día."

---

### 6. LISTADO DE ACTIVOS DEL PORTFOLIO

Lista de todos los activos incorporados con diseño de 2 líneas por fila, optimizado para iPhone 390px:

**Línea 1 (superior):**
- Logo del activo (imagen o inicial coloreada)
- Símbolo + categoría (cripto/accion/ETF/etc.)
- Valor actual en USD (precio × cantidad)
- Botón eliminar (🗑️)

**Línea 2 (inferior):**
- Cantidad @ precio de compra
- % de cambio (verde positivo, rojo negativo)
- Tabs de período: **24h | 7d | 1m | 3m | 1y**

**Nota para acciones fuera de horario:** cuando el mercado está cerrado, el % se muestra en gris con etiqueta "ult.cierre" para indicar que es el último precio de cierre.

---

### 7. PANEL DE DETALLE DEL ACTIVO

Al tocar cualquier activo del listado se abre un panel modal centrado con 5 bloques:

**Bloque 1 — Métricas principales:**

| Dato | Descripción |
|---|---|
| Precio de compra | Precio al que se incorporó al portfolio |
| Cantidad | Unidades en cartera |
| P&L USD | Ganancia/pérdida en dólares |
| Fecha entrada | Fecha de incorporación |
| Mín 52 semanas | Mínimo histórico del último año |
| Máx 52 semanas | Máximo histórico del último año |

**Bloque 2 — Indicador 52 Semanas:**

Barra visual que muestra dónde está el precio actual dentro del rango anual:

| Posición | Zona | Texto |
|---|---|---|
| 0–30% | 🟢 Zona Baja | "El activo cotiza cerca de sus mínimos del año. Históricamente zona de acumulación." |
| 30–70% | 🟡 Zona Media | "El activo está en zona intermedia. Sin sesgo claro de dirección." |
| 70–100% | 🔴 Zona Alta | "El activo cotiza cerca de sus máximos del año. Posible zona de distribución." |

Fuentes: Binance klines interval=1w limit=52 (cripto) | Yahoo Finance meta.fiftyTwoWeekLow/High (acciones)

**Bloque 3 — Señal de la IA:**
- Dirección: ALCISTA / BAJISTA / ALTA CONV-IA
- Probabilidades: % de subida, % de baja, % de alta convicción
- Argumentos: 5 razones técnicas y fundamentales

**Bloque 4 — Análisis de Variables IA:**
- RSI, Tendencia, Volumen, Volatilidad, Correlación de mercado, Oro/Petróleo, Dato Macro, Earnings Proximity
- Cada variable con valor numérico y estado (positivo/negativo/neutro)

**Bloque 5 — Simulador de Escenarios:**
- Slider interactivo: -50% a +50% de variación del precio actual
- Muestra en tiempo real: nuevo precio estimado | nuevo P&L | impacto en portfolio total
- Ideal para planificar toma de ganancias o evaluar posibles pérdidas

---

## 📈 TAB MERCADOS — Funciones Completas

### 1. BANNER DE MERCADOS GLOBALES
Igual al de Portfolio — mismos 11 mercados con estado ABIERTO/CERRADO en tiempo real.

### 2. BANNER DE FUTUROS, ÍNDICES, BONOS ⭐ NUEVO
Igual al de Portfolio — S&P500 fut, Nasdaq fut, Oro, Petróleo, US 10Y, VIX y más. Actualización cada 60 segundos.

### 3. ÍNDICE MIEDO / CODICIA ⭐ NUEVO
Igual al de Portfolio — gauge semicircular con valor 0–100, texto educativo y botón ? explicativo.

### 4. TABS DE CATEGORÍAS
- **Cripto** (BTC, ETH, SOL, BNB, XRP, ADA, AVAX, DOT, LINK, MATIC, DOGE, SHIB...)
- **Acciones** (USA: AAPL, MSFT, GOOGL, AMZN, NVDA, TSLA... | ARG: GGAL, YPF, BMA...)
- **Stable & DeFi** (USDT, USDC, DAI, WBTC...)
- **Futuros** (ES=F, NQ=F, GC=F, CL=F, SI=F...)
- **Metales** (GC=F, SI=F, PL=F, HG=F...)
- **Bonos** (TLT, IEF, LQD, HYG, ^TNX...)

### 5. LISTADO POR CATEGORÍA
Cada activo muestra: símbolo + nombre | precio actual | % cambio 24h

---

## 🤖 MOTOR DE SEÑALES IA — Variables y Probabilidades

### Las 3 señales posibles:

**BAJISTA** → El activo tiene momentum negativo claro. Precio cayendo, volumen vendedor, correlación negativa. La IA dice: "alta probabilidad de que siga bajando".

**ALCISTA** → El activo tiene momentum positivo claro. Precio subiendo, volumen comprador, correlación positiva. La IA dice: "alta probabilidad de que siga subiendo".

**ALTA CONV-IA** → Es la señal MÁS valiosa y MÁS rara. Significa que el activo está en un punto de indecisión técnica extrema — está a punto de romper fuerte en alguna dirección, pero todavía no se definió. Alta volatilidad, señales contradictorias, confluencia de factores. El usuario lo lee como: "este activo está en zona de decisión, puede explotar para cualquier lado, máxima atención". No es un residuo ni la mayoría — debe ser 1 a 2 activos máximo por día cuando realmente se da.

### Las 8 variables del algoritmo:

| # | Variable | Descripción | Fuente |
|---|---|---|---|
| 1 | RSI Simulado | Momentum: compara precio actual vs hace 24h. Determina sobrecomprado/sobrevendido | Binance / Yahoo |
| 2 | Tendencia 24h | Variación % real desde Binance o Yahoo Finance. Dirección y fuerza del movimiento | Binance / Yahoo |
| 3 | Volumen Relativo | Volumen actual vs promedio histórico. Volumen alto + precio subiendo = señal fuerte | Binance / Yahoo |
| 4 | Volatilidad | Amplitud del rango de precio en últimas horas. Alta volatilidad = ruptura inminente | Calculada |
| 5 | Correlación de Mercado | Si BTC sube fuerte → altcoins tienden a seguirlo. Si S&P500 cae → acciones correlacionan | Binance + Yahoo |
| 6 | Oro y Petróleo | Oro al alza = aversión al riesgo = presión bajista en crypto/growth. Petróleo al alza = presión inflacionaria | Yahoo Finance (GC=F, CL=F) |
| 7 | Dato Macro del Día | Fed, IPC, IPP, PBI, empleo. Aumenta factor de incertidumbre y ajusta probabilidades | FRED API + calendario económico |
| 8 | Earnings Proximity | Si empresa reporta balances en próximos 7 días → aumenta volatilidad esperada | Yahoo Finance earnings calendar |

### Rango realista de probabilidades:

| Señal | Probabilidad típica | Significado |
|---|---|---|
| BAJISTA 75% | 55%–88% | 75% de probabilidad de que el precio siga bajando en 24–48hs según modelo de 8 variables |
| ALCISTA 68% | 55%–88% | 68% de probabilidad de suba en próximas 24–48hs |
| ALTA CONV-IA 85% ALCISTA | 55%–88% | 85% de confianza en movimiento fuerte inminente con dirección confirmada |

**Nunca por debajo de 52% (sin señal) ni por encima de 90% (certeza imposible en mercados).**

---

## 🛠️ ESPECIFICACIONES TÉCNICAS

### Stack tecnológico:
- **Frontend:** Vanilla HTML5 / CSS3 / JavaScript ES2020+
- **Hosting:** GitHub Pages (zero cost, alta disponibilidad)
- **Base de datos:** Supabase (PostgreSQL) con Row Level Security
- **Autenticación:** Supabase Auth (anónima + email/password)
- **APIs de datos:** Binance REST API + Yahoo Finance via corsproxy.io + FRED API

### APIs utilizadas:

| API | Datos | Frecuencia |
|---|---|---|
| Binance /ticker/24hr | Precio, % 24h, volumen cripto | Cada 30s |
| Binance /klines?interval=1w&limit=52 | Min/Max 52 semanas cripto | Al abrir detalle |
| Yahoo Finance /v8/finance/chart | Precio, meta, histórico acciones | Cada 60s |
| Yahoo Finance ^VIX, ^GSPC | VIX + S&P500 para Fear&Greed | Cada 5min |
| Yahoo Finance ES=F, NQ=F, GC=F... | Futuros e índices | Cada 60s |
| Supabase | Portfolio del usuario (CRUD) | En tiempo real |

### Arquitectura del portfolio:
- Datos guardados en Supabase: simbolo, cantidad, precio_compra, fecha_entrada, user_id
- Precios en tiempo real cacheados en window._pcPrices
- Señales IA cacheadas en window._iaSignals (refresh cada 5 minutos)
- Fear & Greed cacheado en window._fearGreedCache (refresh cada 5 minutos)
- Futuros cacheados en window._futuresCache (refresh cada 60 segundos)

---

## 📅 ROADMAP DE DESARROLLO

### ✅ Completado (Sesión actual — Marzo 2026)

| Función | Estado |
|---|---|
| Modales centrados (agregar activo + detalle) | ✅ |
| Banner mercados globales (11 países) | ✅ |
| Banner configurable con toggle + localStorage | ✅ |
| Banner replicado en tab Mercados | ✅ |
| Termómetro de Riesgo con texto educativo + ? | ✅ |
| Listado 2 líneas (logos + tabs visibles en iPhone) | ✅ |
| Tabs 24h | 7d | 1m | 3m | 1y en listado | ✅ |
| Indicador 52 semanas (barra + texto interpretativo) | ✅ |
| Mín/Máx 52 semanas en grid de detalle | ✅ |
| Simulador de Escenarios (slider -50%/+50%) | ✅ |
| **Índice Miedo/Codicia — gauge SVG** | ✅ |
| **Banner Futuros/Índices/Bonos/VIX** | ✅ |
| **Ambos indicadores en Portfolio Y Mercados** | ✅ |

### 🔜 Próximo (Semana 2 — Abril 2026)

| Función | Fecha objetivo |
|---|---|
| Señales IA con RSI real + tendencia + volumen | Lun 30/03 |
| Watchlist persistente (botón estrella en Mercados) | Mar 31/03 |
| Revisión conjunta Semana 1 | Mié 01/04 |
| Buffer fixes + commit cierre Semana 1 | Jue 02/04 |
| Conversor — rotación parcial/total de activos | Semana 2 |

---

## 💡 PROPUESTA DE VALOR PARA INVERSORES

AUREX combina en una sola app lo que antes requería 4 herramientas diferentes:

1. **Bloomberg Terminal** → datos de futuros, bonos, VIX, mercados globales en tiempo real
2. **TradingView** → análisis técnico, señales, indicadores visuales
3. **Binance App** → Fear & Greed Index, datos de cripto
4. **Portfolio tracker** → seguimiento P&L, simulador de escenarios

Todo en una interfaz mobile-first, diseñada para ser entendida por usuarios principiantes sin sacrificar la profundidad que exigen los expertos.

**Diferenciador principal:** texto educativo en TODOS los indicadores — el usuario siempre sabe QUÉ significa el dato y QUÉ acción tomar.

---

*Documento generado y mantenido automáticamente por AUREX Dev System*
*Última actualización: Marzo 2026 — v2.0*
