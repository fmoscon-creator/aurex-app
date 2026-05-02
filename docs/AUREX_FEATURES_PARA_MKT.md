# AUREX — Inventario integral de features para marketing

> Documento fuente de verdad sobre TODO lo que la app tiene como dato, indicador o
> herramienta publicable en los canales de marketing. Reconstruido el 2-may-2026
> tras detectar que el Plan MKT v2.1 solo usaba "señales IA" como contenido y dejaba
> afuera el resto de las herramientas de la app.
>
> **Fuente:** lectura completa de `AUREX-IA-DOC.md`, `AUREX-MERCADOS-DOC.md`,
> `AUREX-PORTFOLIO-DOC.md`, `AI_SIGNALS_DESIGN.md`, `METADATA-APPSTORE.md`,
> `aurex-features.js`, `aurex-i18n.js` y `activos.json` del backend.
>
> **Objetivo:** que Fernando + Code + Escritorio trabajen con la misma referencia
> sobre qué se puede mostrar y vender de la app.

---

## 1. POR QUÉ ESTE DOCUMENTO

El Plan MKT v2.1 (29-abr-2026) construyó toda la estrategia alrededor de
"señales IA" como contenido principal. Eso dejó **afuera el resto de la app**:

- AUREX Pulse (índice de sentimiento de mercado con 5 categorías)
- Banner de Eventos críticos (FOMC, CPI, earnings con countdown)
- Banner de Mercados globales (status ABIERTO/CERRADO de 11 plazas)
- Banner de Futuros
- Watchlist con alertas personalizadas y comparación de rendimiento por temporalidades
- Portfolio personal con simulador de escenarios
- Termómetro de Riesgo IA por cartera
- Conversor de monedas multi-fiat + cripto
- 350 activos en Mercados (vs 74 con señales)
- 6 mercados de acciones + 7 tipos de activos
- 8 idiomas (ES, EN, PT, ZH, FR, IT, HI, AR)
- 15+ tipos de alertas configurables
- Detalles expandidos por activo con métricas pro

Este documento lo arregla: lista TODO + cómo se convierte en contenido por canal.

---

## 2. INVENTARIO COMPLETO DE FEATURES POR TAB

### 2.1 TAB MERCADOS — exploración global

| Feature | Descripción | Dato publicable |
|---|---|---|
| **350 activos** | Cripto + Stable + Acciones (USA/AR/BR/EU/JP/CN) + ETFs + Metales + Bonos + Futuros + Divisas | "AUREX te da acceso a 350 activos en 6 mercados del mundo" |
| **AUREX Pulse** | Gauge Fear & Greed semicircular 0-100. Categorías: CRIPTO, ACCIONES, FUTUROS, COMOD, GLOBAL | "Pulso del mercado HOY: 42 — MIEDO. Sube riesgo en cripto" |
| **Banner Eventos críticos** | Próximo FOMC / CPI / earnings con countdown en tiempo real | "FED decide tasas en 3 días — alta volatilidad esperada" |
| **Banner Mercados globales** | Status ABIERTO/CERRADO de 11 plazas: EEUU, ARG, BRASIL, LONDRES, ESPAÑA, ALEMANIA, FRANCIA, JAPÓN, CHINA, HONGKONG, ASIA | "Tokyo abre en 2 horas — preparate para Asia" |
| **Banner Futuros** | S&P Fut, Nasdaq Fut, Dow Fut, Petróleo, Oro pre-mercado | "Wall Street pre-market: S&P Fut +0.4%, Nasdaq +0.6%" |
| **Sub-tabs por país** (acciones) | USA / BR / EU / ES / JP / CN | "Las acciones que se mueven hoy en Asia" |
| **Sparklines** por activo | Mini gráfico SVG 64×28 px de tendencia | Imagen visual lista para post |
| **Periodos temporales** | 24h / 7d / 1m / 3m / 1a por activo | Top movers por temporalidad |
| **Buscador instantáneo** | Filtra 350 activos en tiempo real | "Encontrá cualquiera de 350 activos en 1 segundo" |

### 2.2 TAB IA SEÑALES — diferencial central

| Feature | Descripción | Dato publicable |
|---|---|---|
| **74 señales IA** | Activos con señal propia (subconjunto de los 350) | "74 activos con análisis IA propio" |
| **3 tipos de señal** | ALCISTA / BAJISTA / ALTA CONV-IA (rara, máx 1-3/día) | "Hoy: 1 señal de Alta Convicción IA — solo 3 al mes promedio" |
| **Probabilidad 55-88%** | Honesta — nunca <52% (sin señal) ni >90% (imposible) | "AUREX te dice 78% — no 100%. Honestidad estadística" |
| **10 variables** | Tendencia 24h, RSI14, Volumen, Volatilidad, Correlación BTC/SPY, Oro/Petróleo, Macro FED, Earnings, MACD, Soporte/Resistencia 30d | "10 variables independientes, no opiniones" |
| **5 motivos por señal** | Justificación textual con valores reales | Card con texto largo explicativo |
| **Métricas de precio** | Objetivo, Stop, Upside/Downside | "BTC: target $98k, stop $89k, upside +12%" |
| **Compartir señal** | WhatsApp/Telegram/Mail con texto pre-formateado | Mecanismo de viralización orgánica |
| **3 contadores** clickeables | ALCISTAS / BAJISTAS / ALTA CONV-IA | "Hoy: 28 alcistas, 14 bajistas, 1 alta convicción" |
| **10 dots por activo** | Uno por variable, verde/rojo/gris | Visual rápido de cuántas variables alinean |
| **Estrellas convicción** | 1-5 ⭐ según magnitud del score | "Las 5 señales más convincentes del día" |

### 2.3 TAB PORTFOLIO — gestión personal

| Feature | Descripción | Dato publicable |
|---|---|---|
| **Cartera personal** | Activos del usuario en Supabase | "Mirá cómo va tu cartera en tiempo real" |
| **Valor total** en USD/USDT/BTC | Ciclar entre 3 monedas | Versatilidad para cripto-natives |
| **Periodos** | 24h / 1m / 3m / 1y / Desde compra | "Cómo le fue a tu cartera en 3 meses" |
| **Termómetro de Riesgo IA** | Barra 4 colores: ALCISTA / BAJISTA / ALTA CONV-IA / SIN SEÑAL + frase contextual | "🔥 Tu cartera tiene capital en zona de máxima atención IA" |
| **Mejor activo** del portfolio | Badge con activo de mayor PnL% | "BTC +12% — el mejor de tu cartera hoy" |
| **Conversor de monedas** | BTC/ETH/SOL/USDT + USD/ARS/ARS_OF/EUR/BRL | "Conversor multi-cripto + multi-fiat — incluye dólar blue AR" |
| **Detalle por activo** | Precio actual, compra, PnL, max/min 52w, sparkline, simulador | Contenido educativo: "cómo leer una posición" |
| **Simulador de escenarios** | "¿Si BTC sube 10%, cuánto vale tu cartera?" | "Simulá movimientos sin abrir Excel" |

### 2.4 TAB WATCHLIST — seguimiento personalizado

| Feature | Descripción | Dato publicable |
|---|---|---|
| **Múltiples watchlists** | 1+ listas por usuario, persistencia Supabase | "Armá listas separadas: cripto / acciones / cosas por mirar" |
| **Alertas por activo** | Activable individualmente | "Alerta cuando BTC pase $100k — vos elegís" |
| **Comparación por temporalidades** | Ver rendimiento de los activos de la lista en 24h/7d/1m/3m/1y simultáneamente | "Compará tus 5 cripto favoritas en 1 año" |
| **Sort dinámico** | Default / por mejor performance / peor / etc. | Organización flexible |

### 2.5 TAB ALERTAS — notificaciones configurables

| Feature | Descripción | Dato publicable |
|---|---|---|
| **15+ tipos de alertas** | Precio mayor/menor, % cambio, volumen anómalo, RSI extremo, eventos macro, etc. | "Configurá hasta 15 tipos de alertas distintas" |
| **Push notifications** | Service worker + Notification API | "Te avisa antes de que el precio se mueva" |
| **Alertas SMS/WhatsApp** (ELITE) | Para el plan $19.99/mes | Diferencial premium claro |
| **Header LIVE** pulsante | Indicador visual de monitoreo activo | Sensación de "siempre encendido" |

### 2.6 TAB PERFIL — preferencias y plan

| Feature | Descripción | Dato publicable |
|---|---|---|
| **8 idiomas** | ES, EN, PT, ZH, FR, IT, HI, AR | "Una app para inversores globales — 8 idiomas" |
| **Tema** | Oscuro / Claro / Auto | Preferencia visual |
| **Plan FREE/PRO/ELITE** | $0 / $9.99 mes / $19.99 mes | Mostrar diferencias claramente |
| **Indicador AUREX Pulse** on/off | Visible/oculto en Mercados | Personalización |
| **Cambio contraseña** | Self-service | Estándar |

---

## 3. CUADRO GRANDE — Componente de la app → Contenido publicable → Canal

| # | Componente / dato | Tipo de contenido | Canales donde encaja | Quién lo genera | Quién publica |
|---|---|---|---|---|---|
| 1 | **Señal IA del día** (top 1-3 de Alta Convicción) | Card PNG + texto + 5 motivos | Telegram, WhatsApp, Twitter, Email, IG feed, IG Stories | Code (cron backend) | Code (auto) |
| 2 | **AUREX Pulse del día** (gauge + categoría + frase contextual) | Imagen del gauge + interpretación | Telegram, Twitter, IG feed, Stories, blog SEO | Code (cron) + Escritorio (copy) | Code (auto) |
| 3 | **Banner Eventos** (próximo FOMC/CPI/earnings) | Texto countdown + impacto esperado | Telegram, WhatsApp, Twitter, Email | Code (cron lee calendario) | Code (auto) |
| 4 | **Mercados globales abren/cierran** | Status visual + horario local | Telegram bot horario, IG Stories, Twitter | Code (cron) | Code (auto) |
| 5 | **Top movers del día** | Top 5 activos +%, top 5 −% | Telegram, IG carrousel, Twitter, blog | Code (consulta Mercados) + Escritorio (copy) | Code |
| 6 | **Análisis semanal de cartera** (Termómetro Riesgo del usuario) | Email personalizado por usuario PRO/ELITE | Email, WhatsApp ELITE | Code (datos) + Escritorio (estructura) | Code |
| 7 | **Comparación temporalidades** (1 activo en 1d/1m/1a) | Carrousel IG con sparklines | IG feed, LinkedIn, blog | Code (visual) + Escritorio (copy) | Code |
| 8 | **74 señales detalladas** | Lista completa con probabilidad | Blog SEO, link in bio, sitio web | Code (auto del backend) | Code |
| 9 | **Watchlist destacada** | "Las 10 cripto más vistas en AUREX hoy" | Telegram, Twitter, IG | Code (analytics) | Code |
| 10 | **Educativo: cómo leer una señal** | Video o carrousel explicativo | TikTok/Reels/Shorts (con búho v27), YouTube largo, IG carrousel, blog | Escritorio (guion) + Code (video) | Code |
| 11 | **Simulador de escenarios** | Demo "qué pasa si BTC sube 10%" | Reels/Shorts con búho, IG Stories, blog | Escritorio (guion) + Code (video) | Code |
| 12 | **8 idiomas** | Misma app en ES/EN/PT/ZH/FR/IT/HI/AR | Hook publicitario para mercados regionales | Código ya soporta — Escritorio escribe versión maestra → Code traduce con Claude API | Code |
| 13 | **Conversor multi-fiat + cripto incluyendo dólar blue AR** | Mini-tutorial o demo | Reels rápidos, IG Stories | Code (demo automático) | Code |
| 14 | **Análisis post-evento FED/CPI** | Reacción inmediata: cómo se movieron las señales tras el evento | Telegram URGENTE, Twitter, blog | Code (datos) + Escritorio (copy) | Code |
| 15 | **Comparación AUREX vs broker tradicional** | "AUREX te da 10 variables, tu broker te da 1 (precio)" | Blog SEO, LinkedIn post largo, press release | Escritorio (copy) + Code (datos comparativos) | Code |
| 16 | **Programa de referidos** | "Invitá un amigo, los dos ganan 1 mes PRO" | Email post-onboarding, in-app banner, Twitter | Code (backend referidos + auto) | Code |
| 17 | **Casos de uso por perfil** | "Para el cripto-trader argentino", "Para el inversor europeo en acciones", "Para el indio en Sensex/Nifty" | Blog SEO multi-idioma, LinkedIn | Escritorio | Code (publica) |
| 18 | **Historia de aciertos** (track record público al estilo Danelfin) | "AUREX dijo X, pasó Y" — captura del card original + resultado actual | Twitter, blog, LinkedIn, press releases | Code (logging desde día 1) | Code |

---

## 4. PLANTILLAS / INSTRUMENTOS BÁSICOS NECESARIOS

| # | Plantilla | Uso | Estado |
|---|---|---|---|
| 1 | Card señal PNG 1080×360 | Banners en videos verticales | ✅ Listo (`banners.banner_signal()`) |
| 2 | Card señal PNG 1080×1080 (cuadrado IG/Twitter/Telegram) | Posts feed redes | ❌ A crear (variante de #1) |
| 3 | Card señal PNG 1200×627 (LinkedIn) | Posts LinkedIn | ❌ A crear |
| 4 | Card AUREX Pulse PNG 1080×1080 | Posts Pulse del día | ❌ A crear (gauge + frase contextual) |
| 5 | Card Top Movers PNG 1080×1350 (carrousel IG) | Top 5 ↑ + Top 5 ↓ | ❌ A crear |
| 6 | Card Mercado Abre/Cierra PNG 1080×1920 (Stories) | Stories horarios mercados | ❌ A crear |
| 7 | Card Evento Crítico PNG 1080×1080 | Próximo FOMC/CPI/earnings con countdown | ❌ A crear |
| 8 | Video vertical 1080×1920 con búho animado + voz IA | TikTok / IG Reels / YT Shorts | ✅ Listo (v27 validado) |
| 9 | Video horizontal 1920×1080 con búho + voz IA | YouTube canal largo | ❌ A crear (variante horizontal de v27) |
| 10 | Template MJML newsletter | Email semanal | ❌ A crear |
| 11 | Plantilla blog HTML (`aurex.live/blog`) | Blog SEO comparativas | ❌ Falta ruta + plantilla |
| 12 | Plantilla press release `.docx` | Distribución a wires | ❌ A crear |

**Plantillas que se comparten entre canales** (clave para no multiplicar trabajo):
- Card señal 1080×1080 sirve simultáneamente para Telegram + WhatsApp + Twitter + IG feed + IG Stories. **5 canales con 1 plantilla.**
- Video 1080×1920 (v27) sirve para TikTok + IG Reels + YT Shorts. **3 canales con 1 plantilla.**

---

## 5. DATOS VIVOS QUE EL BACKEND YA GENERA

El backend Railway (`aurex-backend/server.js`) ya tiene los siguientes datos
disponibles en tiempo real — se pueden consumir directamente desde los crons:

- **Señales IA**: cron `calcularSenalesIA` cada 5 min — `window._iaSignals`
- **AUREX Pulse**: `_calcPulseScore(raw, categoria)` — 5 categorías
- **Precios cripto**: Binance REST cada 2 min via `refreshCryptoCache`
- **Precios acciones/ETFs/futuros**: Yahoo Finance via proxy
- **Eventos macro**: calendario interno (FOMC, CPI, earnings)
- **Estado mercados**: 11 plazas globales con horarios UTC + DST
- **Health check**: cada 5 min, reporte 8:00 AR + 9:00 AR (ya operativo)

---

## 6. PRÓXIMOS PASOS — orden propuesto para no atascarse

1. **Fernando + Escritorio + Code revisan este documento.** Validan que cubre TODO. Si falta algo, se agrega acá antes de avanzar.
2. **Fernando aprueba la lista de plantillas a crear** (sección 4). Code arma las que faltan en orden de prioridad: 1080×1080 señal → 1080×1080 Pulse → 1080×1080 Top Movers → resto.
3. **Code arma el cron diario** que dispara los posts a Telegram canal público (canal #1 del Plan MKT, más simple): Pulse del día + 1 señal IA destacada + próximo evento.
4. **Escritorio escribe los primeros 5 guiones** para video búho v27 con datos reales del motor IA del día (1 guion por canal con voz: TikTok / YouTube largo / LinkedIn / Instagram).
5. **Programa de referidos** queda como tarea backend separada (post-aprobación Apple/Google).

---

## 7. HISTÓRICO

- **2-may-2026:** documento creado tras feedback de Fernando: "nadie analizó la app integralmente para entender las herramientas o datos o información de la misma que tenemos que utilizar en nuestros canales". Code armó este inventario completo desde la lectura de los 5 docs principales + features.js + i18n.js.

---

*Próxima edición: cuando Fernando + Escritorio aporten correcciones o agreguen ítems faltantes que conozcan de la app y no estén documentados.*
