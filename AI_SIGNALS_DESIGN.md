# AUREX — Diseño del Sistema de Señales IA
> Documento de referencia estratégica y técnica. Última actualización: Marzo 2026.
> Este archivo debe consultarse antes de modificar cualquier lógica del motor IA.

---

## 1. FILOSOFÍA DEL SISTEMA

El motor de señales IA de AUREX no es un chatbot ni una opinión. Es un sistema determinístico de puntuación basado en 8 variables de mercado reales, que calcula probabilidades de movimiento en un horizonte de **24 a 48 horas**.

Las señales NO predicen el futuro. Calculan la probabilidad estadística de continuación de un momentum dado el estado actual del mercado. El usuario siempre decide.

---

## 2. LOS 3 TIPOS DE SEÑAL

### BAJISTA
- **Definición**: El activo tiene momentum negativo claro. Precio cayendo, volumen vendedor, correlación negativa con el mercado.
- **Lo que dice la IA**: "Alta probabilidad de que el precio siga bajando en las próximas 24-48hs según el modelo de 8 variables."
- **Color UI**: Rojo
- **Ejemplo de lectura**: BAJISTA 75% = hay 75% de probabilidad de caída continuada en 24-48hs

### ALCISTA
- **Definición**: El activo tiene momentum positivo claro. Precio subiendo, volumen comprador, correlación positiva.
- **Lo que dice la IA**: "Alta probabilidad de que el precio siga subiendo en las próximas 24-48hs según el modelo de 8 variables."
- **Color UI**: Verde
- **Ejemplo de lectura**: ALCISTA 68% = 68% de probabilidad de suba en 24-48hs

### ALTA CONV-IA ⚡ (Alta Convicción IA)
- **Definición**: La señal más valiosa y más rara del sistema. Aparece SOLO cuando se cumplen DOS condiciones simultáneamente:
  1. **Convergencia total**: las 8 variables apuntan en la misma dirección con score >= 78% de convicción
  2. **Catalizador activo**: existe una razón concreta por la que el movimiento se espera en el corto plazo (ver catalizadores abajo)
- **SIEMPRE tiene dirección**: ALTA CONV-IA ALCISTA o ALTA CONV-IA BAJISTA. Nunca es ambigua.
- **Lo que dice la IA**: "Señal de máxima convicción — todas las variables alineadas en una dirección con catalizador activo confirmado."
- **Color UI**: Dorado/amarillo con flecha verde (ALCISTA) o roja (BAJISTA)
- **Ejemplo de lectura**: ALTA CONV-IA 85% ALCISTA = la señal más fuerte del sistema, 85% de convicción en que el activo va a subir en 24-48hs, con catalizador concreto activo

---

## 3. CATALIZADORES PARA ALTA CONV-IA

Para que una señal sea clasificada como ALTA CONV-IA (en vez de simplemente ALCISTA o BAJISTA), además de la probabilidad >= 78%, debe cumplirse AL MENOS UNO de estos catalizadores:

| Catalizador | Condición técnica | Descripción |
|---|---|---|
| RSI Extremo | RSI < 30 o RSI > 70 | Zona de sobrecompra/sobreventa — reversión o continuación inminente |
| Earnings Próximos | Earnings en los próximos 7 días | Catalizador corporativo concreto que mueve el precio |
| Dato Macro del Día | Evento macro activo (Fed, IPC, NFP, PBI) | Evento de alto impacto que mueve mercados en horas |
| Volumen Inusual | Volumen relativo > 1.5x promedio | El mercado ya empezó a moverse — institucionales activos |

---

## 4. LAS PROBABILIDADES — cómo deben leerse

- **BAJISTA 75%** = hay 75% de probabilidad de que el precio siga bajando en las próximas 24-48hs según el modelo de 8 variables
- **ALCISTA 68%** = 68% de probabilidad de suba en las próximas 24-48hs según el modelo de 8 variables  
- **ALTA CONV-IA 85% ALCISTA** = la señal más fuerte del sistema — 85% de convicción en que el activo va a subir en las próximas 24-48hs, con todas las variables alineadas y un catalizador activo confirmado

**Rango realista de probabilidades: 55% a 88%.**
- Nunca por debajo de 52% → no hay señal suficiente
- Nunca por encima de 90% → certeza imposible en mercados financieros
- Las 3 probabilidades de cada activo (ALCISTA + BAJISTA + ALTA CONV-IA) suman exactamente **100%**

---

## 5. LAS 8 VARIABLES DEL MOTOR

| # | Variable | Fuente | Descripción |
|---|---|---|---|
| 1 | RSI Simulado | Binance / Yahoo | Precio actual vs precio hace 24hs. Si subió más de un umbral → momentum positivo. Determina sobrecompra/sobreventa. |
| 2 | Tendencia 24hs | Binance (cripto) / Yahoo Finance (acciones) | Variación porcentual real. Mide dirección y fuerza del movimiento reciente. |
| 3 | Volumen Relativo | Binance / Yahoo | Volumen actual vs promedio histórico. Volumen alto + precio subiendo = señal fuerte. Volumen bajo = señal débil. |
| 4 | Volatilidad | Binance / Yahoo | Amplitud del rango high-low en las últimas horas. Alta volatilidad puede indicar ruptura inminente. |
| 5 | Correlación de Mercado | Binance (BTC ref) / Yahoo (SPY ref) | Si BTC sube fuerte, las altcoins tienden a seguirlo. Si S&P500 cae, las acciones correlacionan. |
| 6 | Precio Oro y Petróleo | Yahoo Finance GC=F, CL=F | Oro al alza = aversión al riesgo = presión bajista en crypto y acciones growth. Petróleo al alza = presión inflacionaria. |
| 7 | Dato Macro del Día | Calendario fijo (FRED + eventos semanales) | Fed, IPC, PBI, empleo. Aumenta el factor de incertidumbre y ajusta probabilidades. |
| 8 | Earnings Proximity | Calendario fijo Yahoo Finance | Si una empresa reporta en los próximos 7 días, aumenta la volatilidad esperada. |

---

## 6. LÓGICA DE CLASIFICACIÓN (umbral técnico)

```
score neto = suma ponderada de las 8 variables (-1 a +1)

SI score >= 0.65 Y tiene_catalizador_activo → ALTA CONV-IA (ALCISTA si score > 0, BAJISTA si score < 0)
SI score >= 0.15 → ALCISTA
SI score <= -0.15 → BAJISTA
SINO → señal débil, se clasifica por tendencia predominante

prob_principal = 55% + (|score| * 33%)  → rango 55%-88%
Las 3 probabilidades se normalizan para sumar exactamente 100%
```

---

## 7. CANTIDAD ESPERADA DE SEÑALES POR DÍA

No hay límite artificial. La cantidad de ALTA CONV-IA depende del mercado:

| Condición de mercado | ALTA CONV-IA esperadas |
|---|---|
| Día con dato macro importante (Fed, IPC, NFP) | 5-12 (muchos activos se mueven juntos) |
| Día con earnings de empresas del portafolio | 2-6 |
| Día de mercado lateral sin eventos | 0-3 |
| Día de alta volatilidad general (VIX elevado) | 4-10 |

El umbral alto (>= 78% + catalizador) hace el trabajo natural de filtrado. No se limita artificialmente.

---

## 8. ACTIVOS CUBIERTOS (74 total)

| Categoría | Cantidad | Ejemplos |
|---|---|---|
| Cripto | 20 | BTC, ETH, SOL, BNB, XRP, ADA, AVAX, DOT, LINK, MATIC, DOGE, SHIB, LTC, ATOM, UNI, FIL, NEAR, APT, ARB, OP |
| Acciones USA | 20 | AAPL, NVDA, TSLA, MSFT, META, GOOGL, AMZN, NFLX, AMD, INTC, JPM, BAC, V, MA, DIS, PYPL, UBER, COIN, SPOT, BABA |
| ETF | 10 | SPY, QQQ, DIA, IWM, VTI, ARKK, XLF, XLE, XLK, GDX |
| Metales | 8 | GLD (Oro), SLV (Plata), CPER (Cobre), PPLT (Platino), PALL (Paladio), ZINC, ALUM, IRON |
| Materias Primas | 8 | USO (WTI), BNO (Brent), UNG (Gas Natural), WEAT (Trigo), CORN (Maíz), SOYB (Soja), JO (Café), SGG (Azúcar) |
| Bonos | 8 | TLT, AGG, IEF, SHY, HYG, LQD, EMB, BND |

---

## 9. FUENTES DE DATOS

- **Cripto**: Binance API (api.binance.com) — datos reales en tiempo real
- **Acciones / ETF / Metales / Materias Primas / Bonos**: Yahoo Finance via corsproxy.io (CORS bypass)
- **Datos de referencia (Oro, Petróleo)**: Yahoo Finance GC=F y CL=F
- **Logos acciones**: Clearbit Logo API (logo.clearbit.com)
- **Logos cripto**: CoinGecko API

---

## 10. FUENTES DE LOGOS

| Categoría | Fuente |
|---|---|
| Cripto | CoinGecko: https://assets.coingecko.com/coins/images/{id}/small/{slug}.png |
| Acciones USA | Clearbit: https://logo.clearbit.com/{dominio} |
| ETF | Clearbit con dominio del emisor |
| Metales | Íconos SVG inline integrados en el código (Au, Ag, Cu, Pt, Pd, Zn, Al, Fe) |
| Materias Primas | Íconos SVG inline / emoji integrados (petróleo, gas, trigo, maíz, soja, café, azúcar) |
| Bonos | Íconos SVG inline integrados |

---

## 11. HISTORIAL DE CAMBIOS CLAVE

| Versión | Cambio |
|---|---|
| v1 | Motor básico con 16 activos, datos simulados |
| v2 | Fix CORS Yahoo Finance con corsproxy.io |
| v3 | Fix race condition Promise.all en fetches Yahoo |
| v4 | Probabilidades suman exactamente 100% (bug: sumaban 103%) |
| v5 | CONF.IA renombrado a ALTA CONV-IA |
| v6 | Carga progresiva 2 fases (Fase 1: 20 activos, Fase 2: 54 restantes) |
| v7 | 74 activos en 6 categorías, orden por probabilidad descendente |
| v8 | Fix SyntaxError línea 1150 (comillas simples en onerror handler) |
| v9 | ALTA CONV-IA requiere catalizador activo + dirección visible en UI + logos Clearbit/SVG inline |

---

*Documento mantenido por el equipo AUREX. Actualizar con cada cambio significativo al motor.*
