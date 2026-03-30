# AUREX IA™ — SEÑALES INTELIGENTES
### Documentación completa para usuarios e inversores
#### Versión 7 — Motor de 10 variables — Actualizado 30/03/2026

---

## 1. ¿QUÉ ES AUREX IA™?

AUREX IA™ es el motor de análisis de inteligencia artificial integrado en la app AUREX. Analiza en tiempo real **74 activos financieros** — cripto, acciones, ETFs, metales, materias primas y bonos — y emite señales de dirección con probabilidad estadística para las próximas 24–48 horas.

No reemplaza al asesor financiero. Es una herramienta de análisis técnico y cuantitativo que agrega 10 fuentes de información independientes en un único indicador accionable, diseñado para inversores activos que necesitan una visión objetiva y sin sesgos emocionales del mercado.

---

## 2. TIPOS DE SEÑAL

### 📈 ALCISTA
El activo tiene momentum positivo. Precio subiendo, volumen comprador, RSI en zona favorable, correlación positiva con el mercado. La IA estima entre **55% y 82% de probabilidad** de que el precio continúe al alza en las próximas 24–48 horas.

### 📉 BAJISTA
El activo tiene momentum negativo. Precio cayendo, volumen vendedor, RSI deteriorado, correlación negativa. La IA estima entre **55% y 82% de probabilidad** de que el precio continúe a la baja.

### ⚡ ALTA CONV-IA (Alta Convicción IA)
La señal **más valiosa y más rara** del sistema. Solo se emite cuando el score del modelo supera un umbral alto Y hay al menos un catalizador activo (RSI extremo, evento macro, earnings próximos, volumen anómalo). Significa que el activo está en un punto de decisión técnica extrema — a punto de moverse fuerte. Aparece en **máximo 1–3 activos por día**. Probabilidad: **85%–88%**. Siempre incluye sub-dirección (↑ ALCISTA o ↓ BAJISTA).

---

## 3. CÓMO LEER LAS PROBABILIDADES

| Señal | Lectura | Significado |
|---|---|---|
| BAJISTA 75% | 75% de prob. de baja | En 24–48hs, 3 de cada 4 escenarios del modelo apuntan a baja |
| ALCISTA 68% | 68% de prob. de suba | En 24–48hs, el modelo ve más factores alcistas que bajistas |
| ALTA CONV-IA 88% ALCISTA | Máxima convicción | Todas las variables alineadas, señal más fuerte del día |

> **Rango realista: 55% a 88%.** Nunca por debajo de 52% (sin señal) ni por encima de 90% (certeza imposible en mercados financieros). Esto es por diseño — el modelo es honesto sobre los límites del análisis cuantitativo.

---

## 4. LAS 10 VARIABLES DEL MOTOR IA

Cada señal es el resultado de puntuar 10 variables independientes. El score total (suma ponderada) determina la dirección y la probabilidad de la señal.

| # | Variable | Fuente | Peso | Descripción | Interpretación |
|---|---|---|---|---|---|
| 1 | **Tendencia 24h** | Binance / Yahoo Finance | **Alto** | Variación % del precio en las últimas 24 horas | Positivo = momentum alcista inmediato; Negativo = presión vendedora activa |
| 2 | **RSI14 Real** | Binance klines / Yahoo | **Alto** | Índice de Fuerza Relativa calculado sobre 16 velas diarias reales con suavizado Wilder | <30 = sobreventa extrema (rebote probable); >70 = sobrecompra (corrección probable); 30–45 = bajista; 55–70 = alcista |
| 3 | **Volumen Real** | Binance / Yahoo Finance | **Alto** | Ratio de volumen actual vs promedio de los últimos 5 días | >1.8x con suba = fuerte convicción compradora; >1.8x con baja = distribución activa; <0.6x = movimiento sin convicción |
| 4 | **Volatilidad** | Calculado (high–low/precio) | **Medio** | Amplitud del rango diario como porcentaje del precio | >6% = riesgo elevado; 3–6% = volatilidad moderada; <3% = movimiento controlado |
| 5 | **Correlación BTC/SPY** | Binance / Yahoo Finance | **Medio** | Para cripto: correlación con BTC. Para acciones: con S&P500. | BTC subiendo = arrastre positivo en altcoins; BTC bajando = presión bajista correlacionada |
| 6 | **Oro / Petróleo** | Yahoo Finance (GC=F, CL=F) | **Medio** | Precio del oro como indicador de aversión al riesgo; petróleo como señal de actividad económica | Oro >$3,000 = aversión al riesgo activa; Petróleo >$90 = presión inflacionaria |
| 7 | **Macro FED** | Calendario de eventos | **Medio** | Eventos macroeconómicos de alto impacto programados (FOMC, CPI, PBI, PPI) | Evento activo = incremento de incertidumbre y volatilidad esperada |
| 8 | **Earnings** | Calendario de resultados | **Medio** | Reporte de resultados corporativos próximos | Earnings inminentes = volatilidad históricamente elevada en el activo en ±30% |
| 9 | **MACD (12/26 EMA)** | Binance klines 30d | **Alto** | Divergencia entre EMA de 12 y 26 períodos calculada sobre los últimos 30 días de cierres | MACD positivo = cruce alcista de medias; Negativo = cruce bajista; Neutral = sin divergencia clara |
| 10 | **Soporte / Resistencia 30d** | Binance klines 30d | **Alto** | Posición del precio dentro del rango máximo–mínimo de los últimos 30 días | >85% del rango = cerca de resistencia (posible rechazo); <15% = cerca de soporte (posible rebote) |

**Fuentes de datos:** Binance API (cripto), Yahoo Finance via proxy (acciones, ETFs, metales, futuros), cálculo interno (volatilidad, MACD, soporte/resistencia)

---

## 5. ESTRUCTURA DE LA TAB SEÑALES IA

### 5.1 Banner de Eventos (parte superior)
Ticker horizontal animado con eventos financieros de alto impacto:
- **EVENTO CRÍTICO — FED**: decisiones de tasas de interés (FOMC)
- **DATO MACRO — IPC EEUU**: publicaciones de inflación (CPI), PBI, empleo
- **EARNINGS — NVDA/AAPL/etc**: reportes trimestrales de resultados
- Muestra nombre del evento, descripción y tiempo restante hasta el evento
- Código de color: rojo = crítico, naranja = macro, verde = earnings
- Botón **X** para cerrar el banner temporalmente

### 5.2 Header — Contadores de señales
Tres bloques grandes en la parte superior, **todos clickeables** (actúan como filtro directo):

| Bloque | Color | Función |
|---|---|---|
| **ALCISTAS** | Verde | Número de activos con señal alcista activa. Click = ver solo alcistas |
| **BAJISTAS** | Rojo | Número de activos con señal bajista activa. Click = ver solo bajistas |
| **ALTA CONV-IA** | Dorado | Activos con máxima convicción (raramente más de 1–3 por día). Click = ver solo estos |

### 5.3 Botón "ℹ Ver Variables del Modelo"
Debajo de los contadores. Abre un popup completo con:
- Descripción de las 10 variables del motor IA
- Fuente de cada variable
- Peso relativo (Alto / Medio)
- Explicación de cómo se interpreta cada una
- Nota sobre el rango realista de probabilidades (55%–88%)

### 5.4 Filtros (pills)
Fila de botones de filtro rápido:
**Todo / Alcista / Bajista / Conf. IA / Cripto / Acciones / ETF / Metal / Mat. Prima / Bono**

El filtro activo se destaca en dorado. Permite ver solo las señales del tipo de activo o dirección de interés.

### 5.5 Lista de señales — "74 SEÑALES IA — ORDENADAS POR PROBABILIDAD"
Cada tarjeta muestra:
- **Logo + símbolo + nombre + categoría** del activo
- **Badge de dirección**: ALCISTA (verde) / BAJISTA (rojo) / ALTA CONV-IA (dorado)
- Para ALTA CONV-IA: sub-badge adicional con ↑ ALCISTA o ↓ BAJISTA
- **Estrellas de convicción**: 1–5 ⭐ según la magnitud del score (5 estrellas = señal más fuerte)
- **Precio actual** y **variación % 24h** (verde si sube, rojo si baja)
- **PROB. IA XX%**: probabilidad principal de la señal en el color de la dirección
- **Mini barra de probabilidad**: barra horizontal que refleja visualmente la probabilidad
- **Mini dots bar (10 puntos)**: fila de 10 círculos de 5px — uno por cada variable del modelo. Verde = variable positiva para la señal, Rojo = negativa, Gris = neutral. Permite ver de un vistazo cuántas variables alinean.

### 5.6 Indicador de actualización
- **"LIVE"** pulsante en el header
- **"Act. HH:MM"** — timestamp de la última actualización
- Las señales se cargan en **2 fases progresivas**: los 20 activos principales en ~2–3 segundos, el resto completa en background sin bloquear la interfaz

---

## 6. DETALLE EXPANDIDO — AL HACER CLICK EN UNA SEÑAL

Al tocar cualquier señal, se expande un panel detallado con toda la información del análisis:

### 6.1 Señal principal
- Badge grande con dirección y etiqueta: **⚡ ALTA CONV-IA**, **📈 ALCISTA** o **📉 BAJISTA**
- Badge de probabilidad: **"PRINCIPAL XX%"** en color de la dirección

### 6.2 Justificación del análisis (5 motivos)
El motor genera 5 razones textuales específicas para cada señal, mencionando valores reales:
- *"RSI14 en 17 — sobreventa técnica extrema, rebote probable a corto plazo"*
- *"Precio subió +6.13% en 24hs — momentum alcista activo con presión compradora sostenida"*
- *"Volumen 2.3x promedio con precio al alza — fuerte convicción compradora confirmada"*
- *"MACD positivo +0.82% — cruce alcista de medias, momentum confirmado"*
- *"Precio cerca de soporte 30d ($0.1040) — zona de demanda técnica, posible rebote"*

### 6.3 Métricas de precio
| Indicador | Descripción |
|---|---|
| **Objetivo** | Precio target proyectado si la señal se cumple (upside/downside según dirección) |
| **Stop** | Nivel de stop loss sugerido (40% del recorrido proyectado como stop) |
| **Upside / Downside** | Porcentaje de recorrido potencial desde el precio actual |

### 6.4 Contexto de Tendencia (timeframes)
Tres botones de timeframe para ver el contexto:
- **24h** ← marcado en dorado, es el **default y la base del análisis**
- **7d** ← variación de los últimos 7 días (tendencia media)
- **30d** ← variación del último mes (tendencia de fondo)

> Los timeframes 7d y 30d son **informativos**: muestran el contexto pero no cambian la señal. La señal siempre opera sobre 24h para máxima actualización.

### 6.5 Otros Escenarios
Tres bloques con las probabilidades de cada escenario posible. Siempre suman exactamente **100%**:
- Probabilidad ALCISTA
- Probabilidad BAJISTA  
- Probabilidad ALTA CONV-IA

### 6.6 Botón "Compartir señal" 📤
Al tocar el botón:
- **En iPhone / Android**: abre el menú nativo de compartir del sistema operativo (WhatsApp, Telegram, Mail, y todas las apps instaladas)
- **En desktop**: muestra overlay con 3 opciones directas: 💬 WhatsApp, ✈️ Telegram, 📧 Mail

**Contenido del mensaje compartido:**
```
🤖 AUREX IA — SEÑAL 📈
OP (Optimism)
━━━━━━━━━━━━━━━━
📈 ALTA CONV-IA ↑ ALCISTA — PROB. 88%
💰 Precio: $0.1074 (+6.13%)
🎯 Objetivo: $0.1160 | Stop: $0.1040
━━━━━━━━━━━━━━━━
📊 ANÁLISIS (10 variables):
1. Precio subió +6.13% en 24hs — momentum alcista activo
2. RSI14 en 17 — sobreventa técnica extrema, rebote probable
3. MACD positivo — cruce alcista de medias confirmado
━━━━━━━━━━━━━━━━
Señal generada por AUREX IA™
```

---

## 7. TERMÓMETRO DE RIESGO (tab Portfolio)

Barra horizontal segmentada visible en la tab **Portfolio** de cada usuario. Muestra la distribución de señales IA sobre los activos de la **cartera personal**:

| Segmento | Color | Significado |
|---|---|---|
| Verde | ALCISTA | % del valor total del portfolio con señal alcista |
| Rojo | BAJISTA | % del valor total del portfolio con señal bajista |
| Dorado | ALTA CONV-IA | % con señal de máxima convicción |
| Gris | Sin señal | % sin señal activa hoy |

**Mensajes automáticos según la distribución:**
- *"✅ La mayoría de tu cartera tiene momentum positivo según la IA"*
- *"⚠️ Más de la mitad de tu cartera tiene señal BAJISTA — considerá revisar tu exposición"*
- *"🔥 Tenés capital en zona de MÁXIMA ATENCIÓN — la IA detecta movimiento fuerte inminente"*
- *"💤 Sin señales activas hoy para tus activos"*

Botón **"?"** abre explicación del indicador para usuarios nuevos.

---

## 8. ACTIVOS CUBIERTOS (74 total)

### Cripto (20)
BTC (Bitcoin), ETH (Ethereum), SOL (Solana), BNB (BNB), XRP, ADA (Cardano), AVAX (Avalanche), DOT (Polkadot), LINK (Chainlink), MATIC (Polygon), DOGE (Dogecoin), SHIB (Shiba Inu), LTC (Litecoin), ATOM (Cosmos), UNI (Uniswap), FIL (Filecoin), NEAR (NEAR Protocol), APT (Aptos), ARB (Arbitrum), OP (Optimism)

### Acciones USA (20)
AAPL (Apple), NVDA (NVIDIA), TSLA (Tesla), MSFT (Microsoft), META (Meta), GOOGL (Alphabet), AMZN (Amazon), JPM (JPMorgan), BAC (Bank of America), WMT (Walmart), DIS (Disney), NFLX (Netflix), PYPL (PayPal), COIN (Coinbase), AMD, INTC (Intel), CRM (Salesforce), UBER, BABA (Alibaba), TSM (TSMC)

### ETFs (8)
SPY (S&P500), QQQ (Nasdaq), GLD (Oro), SLV (Plata), USO (Petróleo WTI), BNO (Brent), TLT (Bonos largo plazo), AGG (Bonos agregado)

### Materias Primas y Metales (14)
Oro (GLD), Plata (SLV), Petróleo WTI (USO), Brent (BNO), Gas Natural (UNG), Cobre (COPX), Azúcar (SGG), Trigo (WEAT), Soja (SOYB), Maíz, entre otros

### Bonos (4+)
TLT, IEF, SHY, HYG

---

## 9. DIFERENCIAS CON OTROS SISTEMAS

| | **AUREX IA™** | Señales manuales | Alertas de precio |
|---|---|---|---|
| Variables | 10 cuantitativas | Subjetivas | 1 (precio) |
| Actualización | Tiempo real | Manual | Tiempo real |
| Probabilidad | Sí (55–88%) | No | No |
| Justificación | Sí (5 motivos) | Depende | No |
| Compartir | Sí (WhatsApp/Telegram/Mail) | Manual | No |
| Activos cubiertos | 74 | Limitado | Variable |
| MACD + S/R integrado | Sí | Depende | No |
| Correlación BTC/SPY | Sí | Depende | No |

---

## 10. NOTAS LEGALES Y METODOLÓGICAS

> *AUREX IA™ es una herramienta de análisis cuantitativo. Las señales son el resultado de un modelo matemático basado en datos históricos y condiciones actuales de mercado. No constituyen asesoramiento financiero, recomendación de inversión ni garantía de rendimiento futuro. Todo inversor debe considerar su perfil de riesgo y consultar con un profesional antes de tomar decisiones de inversión.*

*Las probabilidades emitidas por el modelo reflejan la frecuencia estadística de patrones históricos similares. El mercado puede actuar de forma diferente en cualquier momento dado.*

*Rango de probabilidades: 55%–88%. Por diseño, el modelo nunca emite señales por debajo del 52% (equivalente a una moneda al aire, sin valor informativo) ni por encima del 90% (certeza imposible en mercados financieros eficientes).*

---

*Documento generado automáticamente por AUREX IA™ v7 | 30/03/2026*
