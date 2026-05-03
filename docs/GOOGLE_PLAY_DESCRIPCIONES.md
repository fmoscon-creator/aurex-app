# Descripciones Google Play — Build 2

**Generado por Code el 3-may-2026** tras hallazgo crítico de Escritorio: la ficha actual de Google Play Console contiene lenguaje prohibido por las reglas del Bloque 1 + Build 17 metadata segura.

**Pendiente:** Fernando aplica los cambios en Play Console **antes** de solicitar acceso a producción.

---

## PROBLEMA ACTUAL DETECTADO

### Lo que está hoy en Google Play Console (Build 2)

| Campo | Contenido actual | Problema |
|---|---|---|
| Feature graphic | "INTELIGENCIA FINANCIERA EN TIEMPO REAL" | Lenguaje financiero prohibido |
| Descripción breve | "AI investment portfolio: signals, alerts & real-time market data" | "investment portfolio" + "signals" como producto |
| Descripción completa | "personal financial platform to manage investment portfolios" / "buy/sell signals" / "AI Engine: buy/sell signals" / "AI Alerts: automatic notifications when the engine detects opportunities" / "Only invest what you are willing to lose" | Múltiple violación: posicionamiento como "personal financial platform" + "buy/sell signals" textuales (lo más grave) + lenguaje de oportunidades de inversión |

**Riesgo:** solicitar producción con este lenguaje activo = rechazo casi seguro de Google + posible activación de revisión adicional sobre la app misma. Hay que corregir **antes** de promover.

---

## VERSIÓN INGLÉS (idioma maestro v3.0)

### Descripción breve — máximo 80 caracteres

```
Real-time global markets tracker. 350 assets, 24 variables, 8 languages.
```

**Char count:** 73 / 80

### Descripción completa — máximo 4000 caracteres

```
AUREX is the global markets terminal for the individual market follower. Track 350 selected assets across 9 instrument types and 7 global markets in real time, in 8 languages.

WHAT AUREX TRACKS

— 198 stocks across 7 global markets: USA, Argentina, Brazil, Spain, Europe, Japan and China.
— 50 cryptocurrencies and 3 stablecoins.
— 40 ETFs.
— 20 futures contracts.
— 14 bonds.
— 12 commodities.
— 8 metals.
— 5 currencies.

THE 24-VARIABLE ENGINE

AUREX cross-references 24 variables in real time on every asset:

— 10 technical and macro variables in the AI Engine: 24h trend, RSI14, relative volume, volatility, BTC/SPY correlation, Gold/Oil correlation, FED macroeconomic data, earnings, MACD 12/26, 30-day support and resistance.
— 14 market context sources in the AUREX Pulse: BTC (price, dominance, variation), ETH, VIX, SP500, ES/NQ/YM/RTY futures, Gold, Silver, Oil, Copper, FED macroeconomic data and GDELT geopolitics.

The combination of FED macro data and GDELT geopolitical events on every asset signal is unique among retail tools.

REAL-TIME GLOBAL VIEW

— Markets banner: 11 customizable global exchanges showing open / closed / pre and post-market status in real time.
— Futures banner: 16 instruments across 6 categories — instant view of where the market is heading before the open.
— Critical events ticker: high and medium impact economic events active right now (FED, CPI, employment, geopolitics).

ALERT SYSTEM

15 configurable alert types: AI signal changes, high conviction signals (85-88%), custom probability thresholds, Portfolio asset signals, Pulse zone changes, risk thermometer changes, price targets, sharp moves, new 52-week highs and lows, FED/FOMC, CPI, market openings, Portfolio earnings, GDELT geopolitical events.

INTELLIGENT PORTFOLIO

A unified tracking portfolio — not a trading account. Bring assets you already hold elsewhere into a single view. PnL across 5 periods (daily, weekly, monthly, quarterly, annual). AI Risk Thermometer in real time. Per-asset AI dots. Multi-currency converter. Cloud sync across devices.

ACCESSIBILITY

— Available in 8 languages: English, Spanish, Portuguese, Chinese, French, Italian, Hindi, Arabic.
— Light and dark mode.
— Face ID and Touch ID.
— Integrated Help Center.
— Available on iOS, Android and as PWA installable from aurex.live.

PLANS

— FREE: 5 Portfolio assets, 3 daily AI signals, real-time markets, basic Pulse.
— PRO ($9.99/month, $89.99/year): unlimited AI signals, unlimited Portfolio, all alerts, 30-day history.
— ELITE plan coming soon.

WHAT AUREX IS NOT

Not a broker. Not advice. Not a buy/sell platform. AUREX does not execute trades, does not custody assets, does not transfer money. It is the global markets tracking terminal that complements your broker — not replaces it. Statistical analytics for the individual market follower.

aurex.live
```

**Char count:** 3.013 / 4.000

---

## VERSIÓN ESPAÑOL

### Descripción breve — máximo 80 caracteres

```
Tracker de mercados globales en tiempo real. 350 activos, 24 variables.
```

**Char count:** 71 / 80

### Descripción completa — máximo 4000 caracteres

```
AUREX es el terminal de seguimiento de mercados globales para el seguidor de mercados individual. Rastrea 350 activos seleccionados de 9 tipos de instrumentos en 7 mercados globales, en tiempo real y en 8 idiomas.

QUÉ RASTREA AUREX

— 198 acciones en 7 mercados globales: USA, Argentina, Brasil, España, Europa, Japón y China.
— 50 criptomonedas y 3 stablecoins.
— 40 ETFs.
— 20 contratos de futuros.
— 14 bonos.
— 12 commodities.
— 8 metales.
— 5 divisas.

EL MOTOR DE 24 VARIABLES

AUREX cruza 24 variables en tiempo real sobre cada activo:

— 10 variables técnicas y macroeconómicas en el Motor IA: tendencia 24h, RSI14, volumen relativo, volatilidad, correlación BTC/SPY, correlación Oro/Petróleo, datos macroeconómicos de la FED, earnings, MACD 12/26, soporte y resistencia de 30 días.
— 14 fuentes de contexto de mercado en el AUREX Pulse: BTC (precio, dominancia, variación), ETH, VIX, SP500, futuros ES/NQ/YM/RTY, Oro, Plata, Petróleo, Cobre, datos macroeconómicos FED y geopolítica GDELT.

La combinación de datos macroeconómicos FED y eventos geopolíticos GDELT sobre cada señal es un diferencial único entre las herramientas retail.

VISIÓN GLOBAL EN TIEMPO REAL

— Banner Mercados: 11 plazas globales customizables mostrando abierto / cerrado / pre y post-market en tiempo real.
— Banner Futuros: 16 instrumentos en 6 categorías — visión instantánea de hacia dónde apunta el mercado antes de la apertura.
— Ticker de eventos críticos: eventos económicos de impacto alto y medio activos en el momento (FED, CPI, empleo, geopolítica).

SISTEMA DE ALERTAS

15 tipos de alertas configurables: cambios de señal IA, alta convicción (85-88%), umbrales de probabilidad personalizados, señales sobre activos del Portfolio, cambios de zona Pulse, cambios del termómetro de riesgo, precios objetivo, movimientos bruscos, nuevos máximos y mínimos de 52 semanas, FED/FOMC, CPI, aperturas de mercado, earnings del Portfolio, eventos geopolíticos GDELT.

PORTFOLIO INTELIGENTE

Una cartera de seguimiento unificada — no es cuenta de trading. Reúne en una sola vista los activos que ya tenés en otras plataformas. PnL en 5 períodos (diario, semanal, mensual, trimestral, anual). Termómetro de Riesgo IA en tiempo real. Dots IA por activo. Conversor multi-divisas. Sincronización en la nube entre dispositivos.

ACCESIBILIDAD

— Disponible en 8 idiomas: español, inglés, portugués, chino, francés, italiano, hindi, árabe.
— Modo claro y oscuro.
— Face ID y Touch ID.
— Centro de Ayuda integrado.
— Disponible en iOS, Android y como PWA instalable desde aurex.live.

PLANES

— FREE: 5 activos en Portfolio, 3 señales IA diarias, mercados en tiempo real, Pulse básico.
— PRO ($9,99/mes, $89,99/año): señales IA ilimitadas, Portfolio ilimitado, todas las alertas, historial 30 días.
— Plan ELITE próximamente.

LO QUE AUREX NO ES

No es un broker. No es asesoramiento. No es plataforma de compra/venta. AUREX no ejecuta operaciones, no custodia activos, no transfiere dinero. Es el terminal de seguimiento de mercados globales que complementa a tu broker — no lo reemplaza. Análisis estadístico para el seguidor de mercados individual.

aurex.live
```

**Char count:** 3.215 / 4.000

---

## VERIFICACIÓN DE LENGUAJE — ninguna palabra prohibida

### Palabras NUNCA usadas en estas descripciones

- ❌ "investing" / "investment tools" / "investment platform"
- ❌ "trading" / "trading signals" / "trading platform"
- ❌ "buy/sell signals" / "buy now" / "sell now" / "comprá" / "vendé"
- ❌ "make money" / "profits" / "profits guaranteed" / "high returns"
- ❌ "investment advice" / "financial advice" / "asesoramiento" / "recomendación de inversión"
- ❌ "fintech" / "financial services"
- ❌ "AI signals" como producto principal (solo "AI Engine" como nombre del motor)
- ❌ "opportunities" / "oportunidades de inversión"
- ❌ "Only invest what you are willing to lose" (disclaimer pero revela posicionamiento financiero)

### Palabras PERMITIDAS usadas

- ✅ tracker / terminal / real-time / data / markets / follow / track
- ✅ statistical analytics
- ✅ technical indicators / macroeconomic data / geopolitics / market sentiment
- ✅ individual market follower / seguidor de mercados individual
- ✅ Not a broker / Not advice / Not a buy/sell platform
- ✅ AI Engine (como nombre técnico del motor, no como producto)

---

## PLAN DE APLICACIÓN

1. **Fernando aprueba** versiones EN + ES propuestas (o pide ajustes).
2. **Fernando entra a Google Play Console** → Build 2 → Listado de Store → Descripción y traducciones.
3. **Reemplaza descripción breve y completa** en EN y ES con las versiones aprobadas.
4. **Reemplaza el feature graphic** (1024×500) por una versión nueva sin "INTELIGENCIA FINANCIERA". Esto se resuelve cuando se generen los assets del Bloque 4 (Fase C del Paso CERO).
5. **NO solicitar acceso a producción** hasta que los 3 cambios estén aplicados (descripción breve + descripción completa + feature graphic).

**Riesgo de aplicar el cambio AHORA mientras Build 2 está en closed testing:** muy bajo. Google permite editar descripciones del listing sin afectar el closed testing. La revisión adicional, si la hay, sería sobre el listing nuevo, no sobre la app.

**Recomendación de timing:**
- **Descripción breve y completa: aplicar lo antes posible** (no bloquea closed testing y mejora alineación regulatoria).
- **Feature graphic: aplicar cuando se generen los assets del Bloque 4 Fase C** (mismo paquete con avatares y banners de redes sociales).
- **NO solicitar producción** antes de que los 3 cambios estén aplicados.

---

## NOTA SOBRE APP STORE (Build 17)

App Store Build 17 usa subtítulo "Real-time market data tracker" + categoría Utilidades + descripción ya alineada al lenguaje seguro. **NO requiere cambios.** Este documento aplica solo a Google Play Build 2.

---

*GOOGLE_PLAY_DESCRIPCIONES.md — Bloque suplementario al Paso CERO. Pendiente aprobación Fernando + aplicación manual en Play Console.*
