# PLAN MKT v2 — AUREX

**Documento maestro de marketing post-research de 19 competidores.**
**Versión:** v2.0-draft (Code) — pendiente cruce con Escritorio.
**Fecha:** 29-abr-2026
**Autor draft:** Code (Claude Code CLI), basado en `RESEARCH_MKT.md` (19 competidores en 5 pasadas) + síntesis estratégica de Escritorio del 29-abr-2026.
**Próximo paso:** Fernando lo cruza con Escritorio para opinión cruzada antes de commit final.

---

## INTRODUCCIÓN — POR QUÉ ESTE DOCUMENTO

La síntesis de Escritorio del 29-abr-2026 es sólida en lo estratégico pero queda corta en dos cosas: tiene **5 errores de evidencia** (datos que no están sostenidos por el research que Code documentó) y **no aterriza en plan táctico ejecutable**. Code corrige los errores y completa el plan táctico aplicando las reglas operativas del proyecto:

- **Cero acción manual de Fernando.** Su única intervención es aprobar (regla `feedback_fernando_no_ejecuta.md`).
- **Reparto explícito Code vs Escritorio** para cada tipo de contenido (regla `roles_code_escritorio.md`).
- **Verificación contra evidencia del research.** Cada afirmación tiene que estar sostenida por uno o más de los 19 competidores documentados (regla `feedback_plan_mkt_revision_cruzada.md`).
- **Plataformas con automatización real al 29-abr-2026.** Nada de "publicar contenido en redes" sin especificar herramienta concreta.

---

# PARTE 1 — SÍNTESIS ESTRATÉGICA (corregida y consolidada)

## 1.1 La pregunta central respondida: ¿AUREX compite con quién y por qué?

El research de 19 competidores permite responder con precisión. AUREX **no compite directamente con brokers** (Robinhood, Cocos, Lemon, Bitso, Avenue, Warren Brasil, RockFlow) porque no ejecuta trades ni custodia dinero. Tampoco compite con plataformas de charting profesional (TradingView) ni con redes sociales de inversores (Stocktwits). AUREX compite con las **herramientas de análisis IA puras para inversores individuales**.

**Competidores directos de análisis IA puro (no broker):** Magnifi, Sagehood AI, Danelfin, WarrenAI, Guavy.

**Competidor parcial (broker + IA):** RockFlow combina análisis IA con broker, lo que le da fricción de onboarding distinta (KYC + depósito) — no es competidor directo en el sentido estricto pero compite por atención del mismo usuario.

**Posicionamiento que surge del research:** AUREX es **la capa de análisis IA que va entre el inversor y el broker**. El usuario analiza con AUREX, decide, y ejecuta donde ya opera. Esa **independencia de broker** no la tiene ningún competidor que también es broker. Es diferencial real y hay que comunicarlo explícitamente.

## 1.2 Los 7 aprendizajes estructurales del research (corregidos)

### Aprendizaje 1 — Atom Finance es la advertencia más crítica

100.000 usuarios y $10.6M de funding no fueron suficientes para sostener investment research B2C puro. Atom cerró operaciones a fines de 2025 después de 6 años. La lección no es que AUREX no puede funcionar, sino que **las suscripciones freemium solas no son motor de sostenibilidad**. AUREX necesita una segunda palanca de monetización en el roadmap desde el día uno, no como plan eventual.

### Aprendizaje 2 — La segunda palanca confirmada por tres fuentes independientes

- **Stocktwits:** 35-50% del revenue viene de Data Licensing (Social Sentiment API a Bloomberg, hedge funds, quant funds).
- **Atom Finance:** murió sin ella.
- **Danelfin:** API institucional con tres tiers ($70 / $199 / $599/mes) operativa y monetizando.

AUREX acumula señales de 350 activos en tiempo real (74 con motor IA propio). Esos datos tienen valor para terceros. La arquitectura del backend debe pensarse para habilitar una API institucional a mediano plazo. **No requiere acción comercial ahora, pero sí decisión de diseño ahora.**

### Aprendizaje 3 — El precio está validado (corregido)

| Competidor | Pricing PRO | Fuente verificada |
|---|---|---|
| Magnifi | $8.25/mes anual / $14/mes mensual | research, sección 1 |
| Atom Finance | $9.99/mes ($99/año) | research, sección 5 |
| **Sagehood AI** | **$9.99/mes** (no $19.99 como decía la síntesis previa) | research, sección 8 |
| Public Premium | ~$10/mes | research, sección 3 |
| WarrenAI (vía InvestingPro Pro) | ~$14.99-$24.99/mes según región | research, sección 9 |
| Danelfin Plus | $22/mes ($199/año) | research, sección 10 |
| Composer | $32/mes (con $30 clearing fee oculto = $30-40 real) | research, sección 2 |

**Conclusión:** el rango FREE / PRO $9.99 / ELITE $19.99 de AUREX está correctamente posicionado. **No cambiar los precios.** Sí comunicar transparencia total (sin fees escondidos, cancelación inmediata, sin sorpresas) — eso es diferencia explícita contra Composer (clearing fee oculto) y reseñas de Investing.com (billing agresivo, difícil cancelación).

### Aprendizaje 4 — La tasa de acierto IA es el único argumento que no se copia

**Dato verificable más fuerte del research:** Danelfin publica que sus stocks rated 10/10 outperform S&P en **+21.05% annualized alpha en 3 meses**. Esa cifra pública (no marketing, sostenida por datos) es su motor de adquisición orgánica más eficiente.

**Para AUREX:** cuando se conecte la API real de Claude, **medir y publicar la tasa de acierto histórica de las señales IA en tiempo real tiene que ser prioridad antes que cualquier campaña de marketing**. Un dashboard público de acierto verificable convierte usuarios sin ads.

(Aclaración honesta: la síntesis previa citaba "Public.com publica que Alpha promovió el 67% de sus posiciones antes de movimientos del +20%" — ese dato específico no está sostenido por el research. El dato real verificado es: "el AI research assistant de Public.com convirtió casi la mitad de las conversaciones en una transacción dentro de las 24 horas". Lo corrigió Code en la revisión cruzada del 29-abr.)

### Aprendizaje 5 — El feature más simple y visual es el que crece

- **Lemon Card** (cashback BTC, producto físico tangible) llevó a Lemon Cash de menos de 10k a 2M+ usuarios.
- **Robinhood waitlist** (acción gratis por referido) generó 1M+ usuarios antes del lanzamiento público.

**Para AUREX:** el equivalente NO es la señal IA compleja, es el momento más simple y visual del producto: **"AUREX marcó ALTA CONVICCIÓN en $BTC el lunes. El martes subió 8%."** Ese screenshot generado automáticamente cuando una señal se confirma es el equivalente del Lemon Card. **El producto tiene ese momento desde el día uno** — hay que construir el sistema para capturarlo y distribuirlo automáticamente cuando ocurra.

### Aprendizaje 6 — La cobertura multi-asset multi-mercado es diferencial real no explotado (corregido)

| Competidor | Cobertura |
|---|---|
| Sagehood | Solo S&P 500 (planea agregar Nasdaq) |
| **Danelfin** | **Stocks US principalmente** (no Europa como podría asumirse por su HQ Barcelona) |
| Guavy | Solo crypto (350+ coins) |
| RockFlow | Multi-asset pero broker (con fricción de onboarding) |
| WarrenAI | 72k+ activos US-centric, en 30 idiomas |
| Bitso | Crypto + stocks USA vía Alpaca (en México) |

**AUREX (verificado en `aurex-features.js` y `aurex-backend/activos.json`):** **350 activos cross-asset** desde el día uno: cripto (50) + stablecoins (3) + acciones de **6 mercados** (USA 94 + Argentina 26 + Brasil/LATAM 24 + Europa 25 + Japón 20 + China 20) + ETFs (40) + materias primas (20) + metales (10) + futuros (20) + bonos (15, incluye AL30/GD30/AL35 ARG) + divisas (5, incluye USDARS). **74 con señales IA propias.**

Ese scope no lo menciona ningún competidor en su tagline. Hay que comunicarlo.

### Aprendizaje 7 — La ventana de tiempo en LATAM es real pero tiene fecha de vencimiento

- **Brasil:** Nubank tiene 107M de usuarios (60% de los adultos brasileños) y está construyendo IA de inversión (Olivia 2021 + Hyperplane 2024). Cuando esas recomendaciones lleguen al usuario de Nubank en el mismo app donde ya tiene todo, la ventana de captura en Brasil se cierra.
- **Argentina:** Cocos tiene la relación de confianza con jóvenes inversores AR pero un CEO bajo escrutinio público (controversia $LIBRA del 28-abr-2026). Lemon tiene 5M usuarios pero no tiene capa de análisis IA. **Ventana abierta.**
- **México:** Bitso tiene 9M de usuarios pero sin señales IA propias aún. Stocks USA via Alpaca recién entrando.

**Conclusión:** la ventana existe hoy pero no indefinidamente. **El plan de lanzamiento debe priorizarse, no posponerse por perfeccionismo de producto.**

## 1.3 Audiencia objetivo (sostenida por el research)

El usuario de AUREX es una persona que:

- Tiene entre 22 y 40 años, ya invierte (aunque sea $50 en crypto o $100 en acciones).
- Usa el celular para todo lo financiero (mobile-first puro).
- **Habla español o portugués como idioma primario** — los competidores US (Magnifi, Sagehood, WarrenAI, Public, Danelfin) tienen ese usuario en inglés y los competidores LATAM tienen el wallet (Lemon, Bitso) o el broker (Cocos, Avenue) pero **ninguno tiene la capa de análisis IA**.
- No quiere convertirse en analista pero quiere entender el mercado antes de decidir.
- Está frustrado con el ruido de Twitter/X, los tips de influencers crypto, y los análisis de brokers que son genéricos o llegan tarde.

**Mercado addressable LATAM hispanohablante: ~500M+ personas** + lusohablante Brasil 215M (etapa 2 con producto maduro y compliance específico).

## 1.4 Posicionamiento diferencial concreto (corregido con cobertura real)

> AUREX es el primer asistente de análisis IA de mercados en tiempo real diseñado para el inversor latinoamericano. No es un broker. No es un asesor humano. No es una red social de tips. Es la herramienta que va entre el inversor y el broker: **analiza 350 activos globales** — cripto + stablecoins + acciones de 6 mercados (Argentina, Brasil/LATAM, USA, Europa, Japón, China) + ETFs + materias primas + metales + futuros + bonos + divisas — **y entrega señales IA** sobre los **74 más representativos**, sin jerga, sin publicidad, sin agenda, sin conflicto de intereses.

**Lo que ningún competidor puede decir a la vez** (verificado contra los 19):

1. **Multi-asset cross-mercado:** cripto + acciones de 6 mercados + ETFs + materias primas + metales + futuros + bonos + divisas — todo en una sola app. Ningún competidor cubre simultáneamente.
2. **Mercados hispanohablantes nativos:** acciones de Argentina (26) + Brasil/LATAM (24) cubiertas por defecto. WarrenAI tiene 30 idiomas pero datos US-centric.
3. **Señales IA propias:** motor cuantitativo propio sobre 74 activos seleccionados, no agregador de research ajeno como Smallcase o WarrenAI.
4. **Sin ejecución de trades:** sin KYC, sin depósito, sin verificación de identidad — onboarding en minutos.
5. **Precio transparente sin sorpresas:** FREE / PRO $9.99 / ELITE $19.99, sin fees escondidos, cancelación inmediata.

## 1.5 Modelo de monetización validado y roadmap de dos palancas

### Fase 1 — Año 1: suscripciones (sin cambios)

- **FREE:** acceso básico, señales IA limitadas (3/día), AUREX Pulse básico, portfolio limitado a 5 activos.
- **PRO $9.99/mes** ($79/año): activos ilimitados en portfolio, señales IA ilimitadas con historial 30 días, alertas push, exportación a Excel/PDF.
- **ELITE $19.99/mes** ($149/año): AUREX Pulse profundo, alertas SMS/WhatsApp, soporte VIP.

Validado por: Magnifi, Atom Finance, Public Premium, Sagehood ($9.99 idéntico), Danelfin ($22 = techo posible), WarrenAI ($14.99-$24.99 según región).

### Fase 2 — Año 2-3: API institucional

Tres tiers replicando el modelo Danelfin:

- **API Sandbox:** gratis (subset reducido, requests/mes limitados) — funnel para developers.
- **API Standard:** ~$70-100/mes — full access para apps fintech medianas.
- **API Enterprise:** ~$500-700/mes — para fondos, quants, medios financieros, otras apps.

**Decisión de diseño que afecta hoy:** la arquitectura del backend debe habilitarlo desde ahora aunque la comercialización sea posterior. Específicamente: persistencia de señales históricas con timestamp + acierto/error medible (relevante también para Aprendizaje 4).

### Lo que NO hacemos

- Modelo de comisiones por trade (requiere licencia de broker → KYC, custodia, regulación pesada).
- Modelo de publicidad in-app (destruye confianza como pasó con Robinhood pre-2021).
- Tips pagos de terceros (destruye credibilidad instantáneamente).

## 1.6 Riesgos identificados (sostenidos por el research)

1. **Riesgo Atom Finance:** si AUREX no llega a punto de inflexión en retención antes de que se agoten recursos, la segunda palanca (API institucional) no llega a tiempo. **Mitigación:** métricas de retención desde el mes 1, no solo de adquisición. Ver KPIs sección 2.5.
2. **Riesgo Nubank:** la ventana de tiempo en LATAM no es indefinida. **Mitigación:** lanzamiento priorizado, no postergado por perfeccionismo de producto.
3. **Riesgo de credibilidad IA:** 5 competidores (Magnifi, Sagehood, WarrenAI, RockFlow, Guavy) tienen reseñas que dicen "la IA no acierta" o "parece respuesta predefinida". **Mitigación:** publicar tasa de acierto histórica desde el primer día post-conexión Claude API real.
4. **Riesgo regulatorio:** emitir señales financieras puede requerir licencia de "Asesor Global de Inversiones" (AGI) en CNV-AR, equivalentes en otros países. **Mitigación:** disclaimers explícitos "no constituye asesoramiento financiero personalizado", lenguaje cuantitativo objetivo, due diligence regulatorio post-aprobación Apple/Google.
5. **Riesgo dependencia plataformas externas:** TikTok no soporta full automation, IG Stories requiere Buffer pago, LinkedIn perfil personal no automatiza. **Mitigación:** plan táctico solo incluye plataformas con automatización real verificada (sección 2.3).

---

# PARTE 2 — PLAN TÁCTICO EJECUTABLE

## 2.1 Principio inviolable: cero acción manual de Fernando

Aplicación literal de la memoria `feedback_fernando_no_ejecuta.md`. Fernando NO graba videos, NO escribe posts, NO diseña imágenes, NO publica manualmente. **Su única acción es aprobar** la primera versión de cada flujo (template + tono + cadencia), después corre solo.

Cualquier acción del plan que requiera intervención manual de Fernando más allá de aprobar inicialmente queda **excluida** o **replanteada con automatización**.

## 2.2 Reparto Code vs Escritorio (decisión explícita por capacidad real)

| Tipo de contenido | Quién lo produce | Quién lo publica |
|---|---|---|
| **Posts cortos X/Twitter** (señales del día, milestones) | Code (Claude API + plantilla) | Code (Twitter API directa) |
| **Posts largos LinkedIn Company Page** (análisis quincenal de mercado) | Escritorio escribe, Code formatea | Code (Buffer pago + Meta Graph API) |
| **Captura visual de señal confirmada** (imagen "AUREX dijo X, pasó Y") | Code (cron del backend + canvas/Playwright) | Code (multi-canal: X, IG, Telegram, WhatsApp) |
| **Newsletter semanal** (señales destacadas, market wrap) | Escritorio escribe estructura, Code rellena con datos en vivo | Code (SendGrid o Resend API) |
| **Posts Instagram feed** (carrousel educativo, screenshots del producto) | Code genera plantillas, Escritorio valida copy | Code (Buffer pago / Meta Graph API) |
| **Stories Instagram** (señales del día, polls) | Code (template auto + datos en vivo) | Code (Buffer pago Business plan) |
| **Videos TikTok / Reels / YouTube Shorts** (60 seg, demos del producto) | Escritorio escribe guion, Code genera con HeyGen/Pika + avatar IA | Code (TikTok Content Posting API + IG Reels API + YouTube Data API) |
| **Video YouTube largo** (análisis semanal de mercado, 5-10 min) | Escritorio escribe guion, Code arma con HeyGen avatar + Code edita visual | Code (YouTube Data API) |
| **Telegram channel** (canal público @AurexPulse o similar — distinto del bot admin) | Code (cron del backend con resúmenes auto) | Code (Bot API directa) |
| **WhatsApp difusión** (alertas a usuarios PRO/ELITE opt-in) | Code (cron + plantillas oficiales WhatsApp Business) | Code (Evolution API + Twilio fallback) |
| **Press releases** (lanzamiento, milestones, funding si llega) | Escritorio escribe, Fernando aprueba versión final | Code distribuye (Chainwire / EIN Presswire / Notiprensa LATAM) |
| **Comparativas SEO blog** ("AUREX vs Cocos", "mejores apps IA Argentina") | Escritorio escribe, Code publica + optimiza meta | Code (publica en aurex.live/blog vía commit a aurex-app) |
| **Programa de referidos** (sistema completo) | Code construye backend + tracking + recompensas | Code automatiza activación al usuario |

**Decisión compartida (Code + Escritorio sin Fernando):** estética visual concreta de cada plantilla, prioridades de plataforma según métricas, narrativa de marca, ajustes de tono.

**Aprobaciones de Fernando (única intervención manual):**
- Aprobar templates iniciales de cada canal (una vez, después corre solo).
- Aprobar version final de cada press release antes de distribuir.
- Aprobar nombre del canal Telegram público y handle X.
- Aprobar copy del onboarding y mensajes de stores.
- Aprobar presupuesto mensual para herramientas pagas.

## 2.3 Canales de marketing con plan táctico ejecutable

Cada canal especifica plataforma, herramienta de generación, herramienta de publicación, cadencia, quién genera, quién publica, KPI primario, costo mensual estimado y status de automatización al 29-abr-2026.

### Canal 1 — Telegram Channel público

| Campo | Valor |
|---|---|
| Plataforma | Telegram (canal público nuevo, ej. `@AurexPulse` — distinto del bot admin `@Aurexalertas_bot` ya existente) |
| Cadencia | 1 post diario 9:30 AR (resumen del día) + posts ad hoc cuando hay señal de Alta Convicción |
| Generación | Code (cron del backend Railway con plantilla HTML + datos en vivo del motor IA) |
| Publicación | Code (Bot API de Telegram, ya está la infra con `TELEGRAM_BOT_TOKEN`) |
| Quién genera | Code (cero intervención humana) |
| Quién publica | Code automático |
| KPI primario | Suscriptores al canal, share rate, click-through al producto |
| Costo mensual | $0 (Telegram Bot API gratuita, infra Railway ya existe) |
| Status auto | ✓ 100% automatizable. Listo para activar en cuanto se cree el canal y se agregue al backend. |
| Riesgo | Cero — Telegram permisivo con bots. |

### Canal 2 — WhatsApp Business (alertas opt-in para usuarios PRO/ELITE)

| Campo | Valor |
|---|---|
| Plataforma | WhatsApp Business via Evolution API (línea +54 9 11 3360 2563) + Twilio como fallback transaccional |
| Cadencia | 1 alerta diaria por usuario que opta-in (max 1 mensaje/día por usuario para evitar antifraude) + alertas de Alta Convicción IA |
| Generación | Code (cron del backend con plantillas de WhatsApp Business aprobadas) |
| Publicación | Code (`sendWhatsAppEvolution()` ya existe en `server.js`, función operativa) |
| Quién genera | Code |
| Quién publica | Code automático |
| KPI primario | Open rate (proxy: respuestas), opt-out rate, conversión FREE→PRO via WhatsApp |
| Costo mensual | $0 con Evolution self-hosted (Railway ya cubre) + Twilio fallback ~$0.005/mensaje |
| Status auto | ⚠️ Depende de reconexión Evolution API mañana 30-abr 9:00 AM AR. Una vez conectado: 100% automatizable. **Volumen persistente Railway pendiente** (regla anti-baneo WhatsApp). |
| Riesgo | Alto si no respeta límites: máx 1 mensaje/día por usuario, plantillas oficiales WhatsApp Business pre-aprobadas, opt-in explícito documentado. |

### Canal 3 — Email / Newsletter

| Campo | Valor |
|---|---|
| Plataforma | Resend (preferido por simplicidad) o SendGrid |
| Cadencia | 1 newsletter semanal (martes 8:00 AR) + onboarding automático trigger en signup |
| Generación | Escritorio escribe estructura/tono inicial; Code rellena con datos en vivo (señales destacadas de la semana, market wrap, próximos eventos) |
| Publicación | Code (API de Resend/SendGrid disparada por cron del backend) |
| Quién genera | Escritorio (estructura) + Code (datos vivos) |
| Quién publica | Code automático |
| KPI primario | Open rate (target >25%), CTR (target >3%), conversión a PRO |
| Costo mensual | $0-20/mes hasta 3.000 emails/mes (Resend gratis hasta 3k); ~$20/mes hasta 50k |
| Status auto | ✓ 100% automatizable. Listo para activar. |
| Setup pendiente | Crear template HTML, configurar dominio para envío (mailgun.live o similar), registrar SPF/DKIM. |

### Canal 4 — X / Twitter

| Campo | Valor |
|---|---|
| Plataforma | X (cuenta corporativa nueva `@aurex_app` o similar) |
| Cadencia | 3 posts/día: 9 AR (apertura), 14 AR (mid-day), 19 AR (cierre USA) — siempre con señales del día y datos visuales |
| Generación | Code (Claude API + plantilla por tipo de post: señal del día, milestone, comparativa, screenshot) |
| Publicación | Code (Twitter API v2 directa, sin intermediarios) |
| Quién genera | Code |
| Quién publica | Code automático |
| KPI primario | Followers, engagement rate, click-through al producto |
| Costo mensual | $0 (Free tier Twitter API permite 1.500 posts/mes, suficiente para 3/día) |
| Status auto | ✓ 100% automatizable. Listo para activar. |
| Setup pendiente | Crear cuenta X, obtener API keys (Free tier), template visual auto-generado. |

### Canal 5 — Instagram (posts feed + Stories)

| Campo | Valor |
|---|---|
| Plataforma | Instagram cuenta Business (`@aurex.app` o similar) |
| Cadencia | Posts feed: 4/semana (lun-mar-jue-sáb). Stories: 1-2/día (señales en vivo, polls). Reels: 2/semana. |
| Generación | Code (plantillas visuales + datos en vivo via canvas/Playwright headless) + Escritorio (copy del caption) |
| Publicación | Buffer pago plan Business (~$15/mes) o Meta Graph API directa para Business accounts |
| Quién genera | Code (visual) + Escritorio (caption) |
| Quién publica | Code automático vía Buffer / Meta Graph API |
| KPI primario | Followers (benchmark Lemon: 218K en LATAM AR), saves, shares |
| Costo mensual | $15/mes Buffer Business plan |
| Status auto | ✓ 100% automatizable para feed; Stories requiere Buffer Business plan o Meta Graph API directa con cuenta Business verificada. |
| Setup pendiente | Migrar/crear cuenta Business verificada, plantillas visuales (Canva templates exportables programáticamente o Playwright + HTML/CSS). |

### Canal 6 — TikTok / Instagram Reels / YouTube Shorts (videos cortos 60s)

| Campo | Valor |
|---|---|
| Plataforma | TikTok + IG Reels + YouTube Shorts (mismo video distribuido en las 3) |
| Cadencia | 2 videos/semana (martes y viernes) — formato: explicación de una señal IA + resultado verificable |
| Generación | Escritorio escribe guion 60 seg + Code genera video con HeyGen (avatar IA con voz en español neutro/AR) o Pika (animación generativa) |
| Publicación | Code: TikTok Content Posting API + IG Reels API (vía Meta Graph) + YouTube Data API |
| Quién genera | Escritorio (guion) + Code (video IA + upload) |
| Quién publica | Code automático |
| KPI primario | Views, completion rate (target >50%), click-through al perfil |
| Costo mensual | HeyGen Plus $30/mes (60 min/mes de video) o HeyGen Pro $99/mes (90 min). Pika individual $35/mes. |
| Status auto | ⚠️ TikTok Content Posting API tiene aprobación manual por TikTok (cuenta business + verificación). Si no se aprueba en tiempo, fallback: upload manual mensual de los 8 videos del mes (Fernando NO interviene, lo hace Code en VM remota o con scheduling tools como Loomly). |
| Setup pendiente | Crear cuentas, solicitar API keys TikTok, configurar HeyGen con avatar de marca. |

### Canal 7 — YouTube canal completo (videos largos análisis semanal)

| Campo | Valor |
|---|---|
| Plataforma | YouTube canal `@AurexAnalisis` o similar |
| Cadencia | 1 video largo/semana (5-10 min) — análisis semanal de mercado, edición avatar IA + screenshots producto |
| Generación | Escritorio escribe guion + Code genera con HeyGen avatar IA + Code edita con FFmpeg (intro/outro, screenshots, transiciones) |
| Publicación | Code (YouTube Data API v3) |
| Quién genera | Escritorio (guion) + Code (producción + upload) |
| Quién publica | Code automático |
| KPI primario | Suscriptores, watch time, click-through |
| Costo mensual | Compartido con Canal 6 (HeyGen $30-99/mes) |
| Status auto | ✓ 100% automatizable. YouTube Data API estable para uploads programáticos. |
| Setup pendiente | Crear canal, configurar API key, plantilla intro/outro. |

### Canal 8 — LinkedIn Company Page

| Campo | Valor |
|---|---|
| Plataforma | LinkedIn Company Page de AUREX (NO perfil personal de Fernando — LinkedIn restringe automatización en perfiles personales) |
| Cadencia | 2 posts/semana (martes y jueves) — análisis quincenal de mercado, casos de uso, milestones de producto |
| Generación | Escritorio escribe (tono profesional para audiencia institucional + advisors) |
| Publicación | Buffer (incluido en plan Business) o LinkedIn Marketing Developer API |
| Quién genera | Escritorio |
| Quién publica | Code automático vía Buffer |
| KPI primario | Followers Company Page, engagement de profesionales financieros, aplicaciones a programa institucional (cuando lance) |
| Costo mensual | Incluido en Buffer Business |
| Status auto | ✓ 100% para Company Page (no para perfil personal). |
| Setup pendiente | Crear Company Page, vincular a Buffer. |

### Canal 9 — Press releases en wire services

| Campo | Valor |
|---|---|
| Plataforma | EIN Presswire (alcance global), Chainwire (alcance crypto/fintech), Notiprensa o América Económica (LATAM hispanohablante) |
| Cadencia | Lanzamientos puntuales: (a) lanzamiento global post-aprobación Apple/Google, (b) milestone 10k usuarios, (c) lanzamiento API institucional, (d) si llega funding |
| Generación | Escritorio escribe (tono institucional) — Fernando aprueba versión final |
| Publicación | Code distribuye via APIs de los wire services o submission online |
| Quién genera | Escritorio (Fernando aprueba) |
| Quién publica | Code |
| KPI primario | Coverage en medios objetivo (Bloomberg Línea, Iupana, LatamRepublic, Brazil Journal, Infobae Tech, FinteChile), backlinks SEO |
| Costo por lanzamiento | EIN Presswire ~$300-500/release (alcance global), Chainwire ~$200-300, Notiprensa ~$150-250 LATAM |
| Cantidad esperada año 1 | 4-6 releases, costo total $1.500-3.000 |
| Status auto | ✓ Submission automatizable, distribución y pickup orgánico. |

### Canal 10 — Blog SEO con comparativas indexables

| Campo | Valor |
|---|---|
| Plataforma | Blog en `aurex.live/blog` (subpágina del repo aurex-app, hosting GitHub Pages, gratis) |
| Cadencia | 1 artículo nuevo/semana, primer mes con foco comparativas |
| Generación | Escritorio escribe (tono educativo, no promocional) |
| Publicación | Code (commit al repo aurex-app → auto-deploy GitHub Pages) |
| Quién genera | Escritorio |
| Quién publica | Code |
| KPI primario | Tráfico orgánico mensual, ranking en búsquedas objetivo, tiempo en página |
| Costo mensual | $0 (GitHub Pages gratis) |
| Artículos prioritarios primer mes | "AUREX vs Cocos Capital: ¿cuál usar para invertir desde Argentina?", "Mejores apps de inversión con IA en español 2026", "Cómo leer señales IA de mercado sin ser experto", "AUREX vs Magnifi: el análisis IA en español", "Crypto + acciones en una sola app: comparativa LATAM 2026" |
| Status auto | ✓ 100% (publicación = git commit). |

### Canal 11 — Programa de referidos (mecanismo viral)

| Campo | Valor |
|---|---|
| Mecanismo | Cada usuario tiene un código de referido único. Por cada 3 amigos que se registren con el código, el referente obtiene **1 mes de PRO gratis**. Por cada 10 referidos exitosos, **1 mes de ELITE gratis**. |
| Plataforma | Backend AUREX (tabla en Supabase + endpoint `/api/referrals/{code}`) + share buttons in-app (X, IG, WhatsApp, Telegram, copy link) |
| Generación | Code construye sistema completo (tracking, validación, recompensa automática) |
| Publicación / promoción | Activación in-app (banner permanente FREE/PRO) + email de bienvenida con código + post pin en Telegram channel |
| Quién genera | Code (sistema completo backend + frontend) |
| Quién publica | Automático once live |
| KPI primario | Coeficiente viral K (target K>0.3, donde K = referidos exitosos / usuarios totales), share rate, retention extendida de usuarios que refieren |
| Costo mensual | $0 (solo desarrollo inicial) |
| Status auto | ⚠️ Pendiente desarrollo. Estimación: 2-3 días de Code para sistema completo (Supabase tabla referrals + endpoint backend + UI in-app + lógica de recompensa automática + email transaccional). |
| Inspiración | Robinhood pre-launch waitlist con free stock referrals (1M+ usuarios pre-launch). Aplica el principio (incentivo real, no descuento simbólico). |

## 2.4 Canales descartados explícitamente (con razón sostenida por research)

| Canal | Razón de descarte |
|---|---|
| **Twitter/X red de pensamiento inversor** (estilo Stocktwits) | Stocktwits tardó 17 años en construir comunidad. AUREX no puede replicar eso desde cero sin presencia humana sostenida. |
| **Podcast con invitados** (estilo Magnifi + Nicole Lapin) | Requiere coordinación con invitados humanos. Fernando no participa. |
| **YouTube en cámara con presentador humano** | Requiere presencia de Fernando. Reemplazado por video IA con HeyGen (Canal 6 y 7). |
| **Eventos presenciales** (estilo Cocos en Movistar Arena) | Requiere Fernando + equipo + logística. Fuera del scope autónomo. |
| **LinkedIn perfil personal** | LinkedIn restringe APIs sobre perfiles personales — no se puede automatizar de forma robusta. Solo Company Page (Canal 8). |
| **Reddit foros** | Automatización detectada como bot rápidamente, riesgo de baneo. Posible uso manual cuidadoso post-tracción, no en plan inicial. |
| **Influencer marketing pago** | Requiere coordinación humana con cada influencer + revisión de contenido + dinero. Fuera del scope autónomo inicial. Considerar para Año 2 con presupuesto. |

## 2.5 KPIs y métricas de éxito

### Métricas de adquisición (semanales)

| Métrica | Target Mes 1 | Target Mes 3 | Target Mes 6 |
|---|---|---|---|
| Descargas/semana (Apple + Google) | 500 | 2.500 | 10.000 |
| Signups/semana | 350 | 2.000 | 8.000 |
| CAC (costo de adquisición usuario) | <$2 | <$1 | <$0.50 |
| Conversión Download → Signup | >70% | >75% | >80% |

### Métricas de engagement (semanales)

| Métrica | Target Mes 1 | Target Mes 3 | Target Mes 6 |
|---|---|---|---|
| DAU/MAU ratio | >25% | >35% | >40% |
| Retention 7-day | >40% | >50% | >55% |
| Retention 30-day | >20% | >30% | >35% |
| Sesiones/usuario/semana | >3 | >5 | >7 |

### Métricas de monetización (mensuales)

| Métrica | Target Mes 3 | Target Mes 6 | Target Mes 12 |
|---|---|---|---|
| Conversión FREE → PRO | >2% | >4% | >6% |
| MRR (Monthly Recurring Revenue) | $500 | $5.000 | $30.000 |
| Churn mensual PRO | <8% | <6% | <5% |
| LTV / CAC ratio | >3 | >5 | >8 |

### Métricas de contenido (por canal, mensuales)

| Canal | Métrica primaria | Target Mes 3 | Target Mes 6 |
|---|---|---|---|
| Telegram channel | Suscriptores | 1.000 | 5.000 |
| X/Twitter | Followers | 500 | 3.000 |
| Instagram | Followers | 1.000 | 8.000 |
| TikTok | Followers + view rate | 500 / >40% | 5.000 / >50% |
| YouTube | Suscriptores + watch time | 100 / 5 min avg | 1.000 / 7 min avg |
| Email newsletter | Suscriptores + open rate | 1.500 / >30% | 8.000 / >35% |
| LinkedIn Company Page | Followers | 200 | 1.500 |
| Blog SEO | Tráfico orgánico mensual | 2.000 visits | 15.000 visits |
| Programa referidos | Coeficiente viral K | 0.15 | 0.30 |

### Métricas de producto (post-conexión Claude API real)

- **Tasa de acierto histórica de señales IA** (publicada en dashboard público): target inicial >55%, evolución hacia >65% en 6 meses (medido en barridas de 7 días).
- **Cobertura de las 74 activos con señal IA emitida en los últimos 30 días:** target >90%.
- **Latencia desde generación de señal hasta usuario:** <60 segundos.

## 2.6 Cronograma de los primeros 30 días post-aprobación Apple/Google

### Semana 1 — Setup + lanzamiento técnico

| Día | Acción | Responsable |
|---|---|---|
| Lun | Crear cuentas: X, Instagram Business, TikTok, YouTube, LinkedIn Company, Telegram channel público. Aprobaciones de Fernando para handles. | Code (creación) + Fernando (aprobar handles) |
| Mar | Configurar API keys + Buffer Business + HeyGen + Resend + dominio mail. Distribuir press release de lanzamiento global (EIN Presswire + Chainwire + Notiprensa). | Code |
| Mié | Activar canal Telegram público con primer post + email de bienvenida automático para nuevos signups + landing del programa de referidos. | Code |
| Jue | Primer post X (señal del día). Primer post Instagram feed. Primer Story. | Code |
| Vie | Primer Reel/TikTok/YouTube Short con video IA. Primer post LinkedIn Company. | Code (video) + Escritorio (guion) |
| Sáb | Análisis primer ciclo: ajustes de tono y cadencia. | Code |
| Dom | Day off de publicación (resto cron auto sigue). | — |

### Semana 2 — Cadencia sostenida + primer newsletter

| Día | Acción | Responsable |
|---|---|---|
| Lun | Posts X (3), IG feed, Telegram daily, Stories. | Code |
| Mar | Primer newsletter semanal (recap de la primera semana + señales destacadas). Posts X, IG feed (carrousel educativo). | Escritorio (newsletter) + Code (resto) |
| Mié | Posts X, IG Stories, Telegram. Primer artículo blog SEO publicado: "AUREX vs Cocos Capital". | Escritorio (blog) + Code (resto) |
| Jue | Posts X, IG feed, LinkedIn Company. Segundo Reel/TikTok/YouTube Short. | Escritorio (guion) + Code (resto) |
| Vie | Primer video YouTube largo (5-10 min, análisis semana). | Escritorio (guion) + Code (producción + upload) |
| Sáb-Dom | Cron auto sigue. Code revisa métricas. | Code |

### Semana 3 — Programa de referidos + segunda comparativa

| Día | Acción | Responsable |
|---|---|---|
| Lun-Mar | Activación in-app de programa de referidos. Banner promo en email + Telegram + X. | Code |
| Mié | Segundo artículo blog: "Mejores apps de inversión con IA en español 2026" (incluye AUREX en lugar destacado). | Escritorio (blog) + Code (publicación) |
| Jue | Newsletter semanal #2 con foco en programa de referidos. | Escritorio + Code |
| Vie | Segundo video YouTube largo. Reel/TikTok/Short del programa de referidos. | Escritorio + Code |

### Semana 4 — Review + iteración

| Día | Acción | Responsable |
|---|---|---|
| Lun | Code presenta dashboard de métricas Mes 1 vs targets. Identifica canales over/under performing. | Code |
| Mar-Jue | Ajustes de cadencia y tono según data. Lanzamiento de press release Mes 1 milestones (si aplica: 1k users, primer testimonial verificable). | Code (data) + Escritorio (release) |
| Vie | Tercer video YouTube. Primer episodio formato "Análisis de la señal IA de la semana" (avatar IA). | Escritorio + Code |
| Sáb-Dom | Plan Mes 2 documentado en `PLAN_MKT.md` v2.1. | Code |

## 2.7 Presupuesto mensual estimado (Año 1)

| Categoría | Monto estimado | Notas |
|---|---|---|
| Buffer Business plan | $15/mes | Posts IG + LinkedIn + scheduling multi-cuenta |
| HeyGen Pro | $99/mes | 90 min de video IA/mes (cubre 8 videos cortos + 4 largos) |
| Resend | $0-20/mes | Hasta 50k emails |
| Twilio fallback WhatsApp | ~$10/mes | Solo cuando Evolution falla |
| Wire services press releases | $300-500/mes promedio | Solo en meses con lanzamiento (4-6 releases año 1) |
| Dominios secundarios + SSL | $5/mes | aurex.email, blog hosting backup |
| **Total mensual recurrente** | **~$130-150/mes** | Sin contar press releases puntuales |
| **Total año 1 incluyendo PR** | **~$3.500-4.500** | |

Esto excluye costos de desarrollo (que son tareas de Code, no costo dinero) y costos de Apple/Google ya pagados.

---

# PARTE 3 — PENDIENTES Y NEXT STEPS

## 3.1 Pendiente cruce con Escritorio

Según la regla de revisión cruzada (`feedback_plan_mkt_revision_cruzada.md`):

- Escritorio revisa este documento y propone ajustes en: **tono general** (Code tiende a técnico, Escritorio puede mejorar la voz de marca), **mensajes específicos** para stores (App Store + Google Play en v1.1 post-aprobación), **copy del onboarding** y **temas concretos para los primeros 30 días de blog/newsletter**.
- Code consolida feedback de Escritorio en `PLAN_MKT.md` v2.1.
- Fernando aprueba versión final v2.1.
- Recién entonces se ejecuta.

## 3.2 Aprobaciones pendientes de Fernando

1. **Handles definitivos** para X, Instagram, TikTok, YouTube, LinkedIn Company, Telegram channel.
2. **Presupuesto mensual** ~$130-150 fijo + ~$300-500 en meses con press release.
3. **Templates iniciales** de cada canal (una vez aprobados, corren automáticamente).
4. **Disclaimers regulatorios** del posicionamiento ("no constituye asesoramiento financiero personalizado") — coordinar con review legal post-aprobación Apple/Google.

## 3.3 Bloqueadores actuales (al 29-abr-2026)

| Bloqueador | Estado | Resolución esperada |
|---|---|---|
| Apple Build 17 en revisión | Pendiente desde 24-abr | Apple decide |
| Google Play Build 2 en prueba cerrada | 14 días requeridos | ~6 mayo 2026 |
| WhatsApp/Evolution sesión desconectada | Postergado al 30-abr 9:00 AR | Mañana |
| Claude API real conectada al motor IA | Pendiente | Decisión Fernando |
| Volumen persistente Railway para Evolution | Pendiente | Crítico antes de masificar WhatsApp |

## 3.4 Lo que NO se decide en este documento (corresponde a fases distintas)

Estos blind spots quedaron documentados en Pasada 5 pero NO entran al Plan MKT v2:

1. **White-label / B2B2C** (vender AUREX como capa de análisis a Cocos/Bitso/Avenue): estrategia post Año 1, una vez probada tracción retail.
2. **Análisis regulatorio transversal** por mercado: due diligence operativa, no marketing. Hacer post-aprobación Apple/Google.
3. **Research B2C content-first** (estilo Seeking Alpha): considerar para Año 2 si la palanca dual API rinde menos de lo esperado.
4. **Gaps demográficos** (mujeres, 55+, etc.): segmentación fina post Mes 6, una vez validada audiencia core.

---

*PLAN_MKT.md v2.0-draft (Code) — última actualización: 29-abr-2026.*
*Pendiente cruce con Escritorio antes de versión final v2.1.*
