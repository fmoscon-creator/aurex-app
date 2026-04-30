# PLAN MKT v2.1 — AUREX

**Documento maestro de marketing post-research de 19 competidores.**
**Versión:** v2.1 (Code, post-cruce con Escritorio + Fernando del 29-abr-2026 noche).
**Fecha:** 29-abr-2026
**Autor v2.1:** Code (Claude Code CLI), incorporando devolución conjunta de Escritorio + Fernando sobre el draft v2.0 + capa propia de revisión cruzada.
**Próximo paso:** Escritorio escribe primeros contenidos modelo por tipo de canal (Punto 3 de la devolución conjunta) → Code integra → v2.2 final para aprobación de Fernando.

---

## CHANGELOG v2.0 → v2.1

Cuatro cambios estructurales más capa propia de Code:

1. **CRÍTICO — Premisa global, no LATAM.** AUREX es app **global** con cobertura de 6 mercados (USA, Argentina, Brasil/LATAM, Europa, Japón, China/HK) y los **8 idiomas activos** verificados en código (`aurex-i18n.js`): español, inglés, portugués, chino, hindi, árabe, francés, italiano. LATAM es uno de sus mercados, no su definición. Posicionamiento, tagline, audiencia y tono de canales reescritos.
2. **Avatar HeyGen — specs definitivas** (sección 2.8 nueva). Avatar prefabricado de HeyGen sin rostro humano real + voz sintética de la librería oficial. Fernando confirma que va a hacerlo una sola vez con esas tres condiciones (no se ve su rostro, voz no es la suya, specs documentadas).
3. **Programa de referidos — incentivo definido** (sección 2.9 nueva). Simétrico: 1 mes de PRO gratis para quien refiere + 1 mes de PRO gratis para quien es referido. Sin costo variable. Confirmado por Fernando.
4. **Prioridad de mercados para el lanzamiento confirmada por Fernando:** español primero, inglés segundo, portugués tercero (entrada a Brasil). Los otros 5 idiomas (chino, hindi, árabe, francés, italiano) ya están traducidos en código y se activan progresivamente desde Mes 2-3 con press releases regionales y posts traducidos automáticamente.

**Capa propia de Code (cruce con la devolución conjunta):**

- **Workflow de localización ejecutable** sin multiplicar trabajo de Escritorio: Escritorio escribe en español como idioma maestro → Code traduce con Claude API a los 7 restantes → revisión cultural de calidad post-hoc por idioma (sección 2.3 nueva subsección).
- **Riesgos regulatorios por mercado** (sección 1.6 ampliada): USA SEC, UE MiCA, AR CNV (Asesor Global de Inversiones), BR CVM, China cripto-restringida, India RBI, regulación financiera por jurisdicción que afecta cómo y dónde se pueden emitir señales.
- **Estrategia de cuentas multi-idioma:** en Mes 1 lanzamos 3 cuentas X/Twitter (inglés global, español, portugués), no 8. Los demás idiomas se suman progresivamente según tracción.
- **Riesgos por baneo IP en China**: si AUREX bloqueado en China continental (probable), foco diáspora china global vía Hong Kong + Singapur + chinos en USA/EU.

---

## INTRODUCCIÓN — POR QUÉ ESTE DOCUMENTO

Este documento es el **plan maestro de marketing AUREX** post-research de 19 competidores. La devolución conjunta de Escritorio + Fernando del 29-abr noche identificó que el draft v2.0 había construido todo sobre la premisa equivocada de que AUREX es app latinoamericana. Esto es v2.1 con la premisa global corregida, las specs del avatar HeyGen documentadas, el incentivo de referidos definido, y la capa propia de Code aportando workflow de localización + riesgos regulatorios por mercado + estrategia multi-idioma escalonada.

Aplicación literal de las reglas operativas del proyecto:

- **Cero acción manual de Fernando.** Su única intervención es aprobar (regla `feedback_fernando_no_ejecuta.md`). Excepción acordada: una sola sesión de ~15 min para validar avatar HeyGen + voz, una sola vez en la vida del proyecto.
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

## 1.3 Audiencia objetivo (global, no regional)

El usuario de AUREX es una persona que:

- Tiene entre 22 y 45 años, ya invierte (aunque sea $50 en crypto o $100 en acciones).
- Usa el celular para todo lo financiero (mobile-first puro).
- **Habla cualquiera de los 8 idiomas activos en la app:** español, inglés, portugués, chino, hindi, árabe, francés o italiano.
- No quiere convertirse en analista pero quiere entender el mercado antes de decidir.
- Está frustrado con el ruido de Twitter/X, los tips de influencers crypto, y los análisis de brokers que son genéricos o llegan tarde.

**Mercado addressable por idioma (TAM combinado 4-5B personas):**

| Idioma | Hablantes (~M) | Mercados objetivo principales | Prioridad lanzamiento |
|---|---|---|---|
| Español | 500 | España, Argentina, México, Colombia, Chile, Perú, hispanos USA | **#1** |
| Inglés | 1.500 | USA, UK, Canadá, Australia, India urbana, Asia financiera | **#2** |
| Portugués | 280 | Brasil, Portugal, Mozambique, Angola | **#3** |
| Chino | 1.300 | Hong Kong, Taiwán, Singapur, diáspora China en USA/EU/Canadá *(China continental probablemente bloqueada)* | **Mes 2-3** |
| Hindi | 600 | India urbana | **Mes 2-3** |
| Árabe | 470 | EAU, Arabia Saudita, Kuwait, Qatar, Egipto, Marruecos | **Mes 3-4** |
| Francés | 300 | Francia, Bélgica, Quebec, África francófona, Suiza | **Mes 3-4** |
| Italiano | 85 | Italia, Suiza italoparlante | **Mes 4-5** |

**El research de los 19 competidores confirma que ningún competidor cubre simultáneamente análisis IA + multi-asset + multi-mercado + 8 idiomas.** WarrenAI tiene 30 idiomas pero datos US-centric, sin acciones LATAM/Asia profundas. RockFlow tiene 9 idiomas pero es broker. Magnifi/Sagehood/Danelfin/Atom/Guavy son monolinguales o casi (en/es). Los players LATAM (Cocos, Lemon, Bitso, Avenue, Warren BR, Nubank) operan en idioma local de cada país sin cobertura global.

## 1.4 Posicionamiento diferencial concreto (global, multi-mercado, multi-idioma)

> AUREX es el primer asistente de análisis IA de mercados en tiempo real con **cobertura cross-mercado y multi-idioma para el inversor global**. No es un broker. No es un asesor humano. No es una red social de tips. Es la herramienta que va entre el inversor y el broker: **analiza 350 activos** — cripto + stablecoins + acciones de **6 mercados** (USA, Argentina, Brasil/LATAM, Europa, Japón, China) + ETFs + materias primas + metales + futuros + bonos + divisas — **y entrega señales IA** sobre los **74 más representativos**, **en 8 idiomas** (español, inglés, portugués, chino, hindi, árabe, francés, italiano), sin jerga, sin publicidad, sin agenda, sin conflicto de intereses.

**Tagline corto en español (para taglines de stores y home):**
> "AUREX. Mercados globales con señales IA en 8 idiomas. Sin broker. Sin sesgo."

**Tagline corto en inglés:**
> "AUREX. Global markets with AI signals in 8 languages. No broker. No bias."

**Lo que ningún competidor puede decir a la vez** (verificado contra los 19):

1. **Multi-asset cross-mercado:** cripto + acciones de 6 mercados + ETFs + materias primas + metales + futuros + bonos + divisas — todo en una sola app. Ningún competidor cubre simultáneamente.
2. **Multi-idioma activo (8 idiomas, no solo declarados):** texto verificado en `aurex-i18n.js` con disclaimers, UI y mensajes traducidos en los 8. WarrenAI tiene 30 idiomas pero embebido en plataforma cara con billing cuestionado.
3. **Señales IA propias:** motor cuantitativo propio sobre 74 activos seleccionados, no agregador de research ajeno como Smallcase o WarrenAI. Acierto histórico publicable como diferencial post-conexión Claude API real.
4. **Sin ejecución de trades:** sin KYC, sin depósito, sin verificación de identidad — onboarding en minutos. Diferencia estructural con Robinhood, Cocos, Lemon, Bitso, Avenue, Warren Brasil, RockFlow.
5. **Precio transparente sin sorpresas:** FREE / PRO $9.99 / ELITE $19.99, sin fees escondidos, cancelación inmediata. Diferencia explícita contra Composer (clearing fee oculto) y Investing.com (billing agresivo).
6. **Cobertura geográfica nativa:** 26 acciones argentinas + 24 LATAM/Brasil + 94 USA + 25 Europa + 20 Japón + 20 China = 209 acciones de 6 mercados. Ningún competidor analizado ofrece esa amplitud cross-jurisdiccional.

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

## 1.6 Riesgos identificados (sostenidos por el research + jurisdiccionales)

### Riesgos del research

1. **Riesgo Atom Finance:** si AUREX no llega a punto de inflexión en retención antes de que se agoten recursos, la segunda palanca (API institucional) no llega a tiempo. **Mitigación:** métricas de retención desde el mes 1, no solo de adquisición. Ver KPIs sección 2.5.
2. **Riesgo Nubank:** la ventana de tiempo en Brasil no es indefinida. Nubank está construyendo IA con Olivia (2021) + Hyperplane (2024). **Mitigación:** lanzamiento priorizado, no postergado por perfeccionismo de producto. Brasil es prioridad #3 (no #1) precisamente para tener producto sólido al momento de entrar.
3. **Riesgo de credibilidad IA:** 5 competidores (Magnifi, Sagehood, WarrenAI, RockFlow, Guavy) tienen reseñas que dicen "la IA no acierta" o "parece respuesta predefinida". **Mitigación:** publicar tasa de acierto histórica desde el primer día post-conexión Claude API real.
4. **Riesgo dependencia plataformas externas:** TikTok no soporta full automation, IG Stories requiere Buffer pago, LinkedIn perfil personal no automatiza. **Mitigación:** plan táctico solo incluye plataformas con automatización real verificada (sección 2.3).

### Riesgos regulatorios por jurisdicción (capa propia agregada por Code en v2.1)

Dado que AUREX es app global con presencia en 8 idiomas y 6 mercados, la regulación varía por país. Cada jurisdicción tiene reglas distintas sobre **emisión de señales financieras**, **datos cripto**, y **disclaimers obligatorios**:

| Mercado | Riesgo regulatorio principal | Mitigación |
|---|---|---|
| **USA SEC** | Emitir "señales financieras" puede ser interpretado como Investment Advice → registro como Investment Adviser RIA. | Disclaimers fuertes (ya implementados en `aurex-i18n.js`), lenguaje "informativo y educativo, no asesoramiento personalizado", evitar lenguaje imperativo ("comprá X"). |
| **UE — MiCA (Markets in Crypto-Assets, vigente 2024-2025)** | Provisión de datos cripto en UE puede requerir registro CASP. | AUREX no custodia, no ejecuta trades — análisis informativo queda fuera del scope CASP estricto. Validar con asesor legal post-aprobación Apple/Google. |
| **AR — CNV** | "Asesor Global de Inversiones" (AGI) puede aplicar para emisión de señales con probabilidad. | Disclaimers ya en código. Evaluar registro AGI en Mes 6 si tracción justifica costo. |
| **BR — CVM + Anbima** | Recomendaciones de inversión requieren analista CVM o disclaimer estructurado. | Disclaimers en `aurex-i18n.js` PT validados. Opción: partnership con analista CVM-registered como Warren Brasil hizo. |
| **China continental** | Prohibición efectiva de servicios cripto retail desde 2021 + restricciones a apps financieras extranjeras. | App probablemente bloqueada en App Store China. **Foco diáspora china global vía Hong Kong + Singapur + chinos en USA/EU/Canadá.** Idioma chino sigue siendo activo para esa audiencia. |
| **India — RBI + SEBI** | Restricciones a apps cripto (no banned pero impuestos altos). SEBI regula advice. | Foco análisis acciones (no cripto) en marketing dirigido a India. Hindi activo principalmente para diáspora India global + India urbana stocks. |
| **Mundo árabe** | Cumplimiento sharia para algunos usuarios + censura de contenido financiero en algunos países. | Posicionamiento neutral, evitar lenguaje "trading" agresivo, foco análisis sin recomendación de "haram" (interés/cripto especulativo) en mensajes orientados a esa audiencia. |
| **Francia + Italia + UE general** | GDPR para datos personales + AMF (Francia) + CONSOB (Italia) para advice financiero. | Disclaimers GDPR ya estándar. App informativa cae fuera de scope advice estricto si se respeta el lenguaje. |

**Acción concreta:** post-aprobación Apple/Google, due diligence regulatorio por mercado prioritario en Mes 1-3 con asesor legal. **No bloquea el lanzamiento de marketing en español/inglés/portugués que es donde la regulación es mejor entendida.**

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

### 2.3.0 Workflow de localización multi-idioma (capa propia Code v2.1)

Para producir contenido en 8 idiomas sin multiplicar el trabajo de Escritorio:

1. **Escritorio escribe en español** (idioma maestro) cada pieza de contenido (copy, guion, newsletter, blog post).
2. **Code traduce** el contenido a los otros 7 idiomas usando Claude API con prompt de calidad cultural por idioma:
   - Inglés: tono "international neutral" (no UK ni US específico).
   - Portugués: brasilero (no Portugal).
   - Chino: simplificado (zh-CN), tono profesional financiero.
   - Hindi: tono accesible, mezcla con anglicismos comunes en finanzas indias.
   - Árabe: árabe estándar moderno (MSA), tono respetuoso y neutro.
   - Francés: francés internacional (no quebequense).
   - Italiano: italiano estándar.
3. **Validación cultural post-hoc por idioma:**
   - Inglés y portugués: revisión de Escritorio en línea (puede ajustar si suena robótico).
   - Otros 5 idiomas: revisión de calidad mediante muestreo (Claude valida contra ejemplos de native speakers + Code monitorea métricas de engagement por idioma; si un idioma tiene engagement anormalmente bajo, contratar nativo para revisión específica).
4. **Publicación por canal** según prioridad de idiomas (sección 2.6 cronograma).

**Costo marginal de localización vs solo español:** ~$5-15/mes adicional en Claude API tokens para traducción de los volúmenes esperados (≈100 piezas/mes x 7 idiomas).

### 2.3.1 Canales (cada uno con plan táctico exacto)

Cada canal especifica plataforma, herramienta de generación, herramienta de publicación, cadencia, quién genera, quién publica, KPI primario, costo mensual estimado y status de automatización al 29-abr-2026.

### Canal 1 — Telegram Channel público (multi-idioma)

| Campo | Valor |
|---|---|
| Plataforma | Telegram — **3 canales públicos en Mes 1**: `@AurexPulseEN` (inglés), `@AurexPulseES` (español), `@AurexPulsePT` (portugués). Los otros 5 idiomas escalan en Mes 2-5 con `@AurexPulseZH`, `@AurexPulseHI`, `@AurexPulseAR`, `@AurexPulseFR`, `@AurexPulseIT`. Distinto del bot admin `@Aurexalertas_bot` ya existente. |
| Cadencia | 1 post diario por canal (resumen del día financiero, horario por huso) + posts ad hoc cuando hay señal de Alta Convicción IA cross-idioma. |
| Generación | Code (cron del backend Railway con plantilla HTML + datos en vivo del motor IA, traducción automática vía Claude API workflow 2.3.0). |
| Publicación | Code (Bot API de Telegram con un único bot que opera múltiples canales). Infraestructura backend ya existe con `TELEGRAM_BOT_TOKEN`. |
| Quién genera | Code (cero intervención humana). |
| Quién publica | Code automático. |
| KPI primario | Suscriptores por canal/idioma, share rate, click-through al producto. |
| Costo mensual | $0 (Telegram Bot API gratuita, infra Railway ya existe). |
| Status auto | ✓ 100% automatizable. Listo para activar en cuanto se creen los canales y se agreguen al backend. |
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

### Canal 4 — X / Twitter (3 cuentas en Mes 1, escalando a 8 en Mes 4-5)

| Campo | Valor |
|---|---|
| Plataforma | X — **3 cuentas** en Mes 1: `@aurex_global` (inglés, principal), `@aurex_es` (español), `@aurex_br` (portugués). Otros 5 idiomas se suman entre Mes 2 y Mes 5 según tracción. |
| Cadencia | 3 posts/día/cuenta — horario adaptado al huso del idioma (EN: 9 ET / 13 GMT / 19 GMT; ES: 9 AR / 14 AR / 19 AR; PT: 9 BRT / 13 BRT / 18 BRT). Todos con señales del día y datos visuales. |
| Generación | Code (Claude API + plantilla por tipo: señal del día, milestone, comparativa, screenshot). El mismo contenido se traduce automáticamente a los 8 idiomas con el workflow 2.3.0. |
| Publicación | Code (Twitter API v2 directa por cada cuenta). |
| Quién genera | Code (autónomo). |
| Quién publica | Code automático con rotación horaria por cuenta. |
| KPI primario | Followers por cuenta, engagement rate, click-through al producto. Métrica comparativa entre idiomas para detectar dónde el mensaje resuena más. |
| Costo mensual | $0 en Mes 1 (Free tier permite 1.500 posts/mes/app, suficiente para 3 cuentas x 90 posts/mes = 270). En Mes 4+ con 8 cuentas y ~720 posts/mes seguimos en Free tier. |
| Status auto | ✓ 100% automatizable. Listo para activar. |
| Setup pendiente | Crear 3 cuentas X verificadas, obtener API keys, vincular a un único proyecto Twitter Dev portal con 3 apps. |

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

## 2.4 Specs exactas del avatar HeyGen (resolución del Punto 2 de la devolución conjunta)

Fernando aceptó crear el avatar una sola vez con tres condiciones:

1. No se ve su rostro o imagen humana real.
2. La voz NO es la suya — voz sintética de HeyGen.
3. Code documenta exactamente qué necesita Fernando para generarlo.

### Decisión técnica de Code

**No se usa "Photo Avatar" ni "Custom Avatar" personalizado** (estos requieren video + foto reales de un humano). Se usa uno de los **avatares prefabricados de HeyGen** que vienen incluidos en cualquier plan pago. HeyGen tiene **150+ avatares estándar** ya creados con derechos comerciales, sin rostro ni voz de personas reales identificables — son personajes diseñados por HeyGen específicamente para uso en producción.

### Plan HeyGen y costos

| Concepto | Detalle |
|---|---|
| Plan recomendado | **HeyGen Pro: $99/mes** o **$24/mes anual ($288/año)**. |
| Minutos de video al mes | Pro = 30 min/mes con avatares estándar (suficiente para ~30 videos cortos de 1 min o ~6 videos largos de 5 min). |
| Si necesita más | HeyGen Scale: $39/mes anual = 90 min/mes. |
| Idiomas soportados | 175+ idiomas. **Voces sintéticas multi-idioma** disponibles para los 8 idiomas activos de AUREX. |
| Avatar estándar elegido | Recomendación Code: avatar masculino o femenino joven, look profesional pero no corporativo, estilo "fintech moderno". HeyGen tiene 5-10 avatares que matchean ese perfil. |
| Voz por idioma | Voz sintética HeyGen, neutral por idioma (ej: español neutro de LATAM Daniel/María; inglés US Joey/Aria; portugués brasilero Camila/Ricardo). |

### Lo que necesita Fernando hacer (única acción manual, una vez en la vida)

**Tiempo total estimado: 15-30 min, una sola vez.**

1. **Code crea la cuenta HeyGen** con email `fmoscon@gmail.com` (Fernando solo confirma el email recibido para verificación).
2. **Code prepara una galería de 5 candidatos** — combinaciones de avatar + voz por idioma con los top 5 que matchean tono AUREX. Cada candidato es un video de 30 seg con script genérico ("Hola, soy AUREX. Esta es la señal del día...") en español. Code los muestra a Fernando vía link directo o capturas.
3. **Fernando elige uno** (15 min de revisión, sin grabar nada).
4. **Code configura el avatar elegido + voces correspondientes en los 8 idiomas** y lo guarda como template default en el sistema de generación de videos.
5. **Code genera el primer video real de prueba** y lo muestra a Fernando para validación final.
6. **De ahí en adelante:** Code genera todos los videos de marketing automáticamente vía API HeyGen, **sin más intervención de Fernando**.

### Lo que Code NO necesita de Fernando

- ❌ NO necesita foto suya.
- ❌ NO necesita video suyo grabando.
- ❌ NO necesita audio de su voz.
- ❌ NO necesita que escriba scripts.
- ❌ NO necesita que apruebe video por video después del primero.

### Riesgo y mitigación

**Riesgo:** HeyGen avatares estándar son reconocibles por otros usuarios de HeyGen — un competidor podría usar el mismo avatar.
**Mitigación:** AUREX combina el avatar con **branding visual propio** (intro/outro con logo dorado, lower-third con marca, cierre con tagline) que diferencia visualmente. La identidad de marca es la combinación, no solo el avatar. Si en Año 2 hay presupuesto, considerar avatar custom basado en personaje original ilustrado por diseñador (no humano real, no Fernando).

---

## 2.5 Programa de referidos — incentivo definido (resolución del Punto 4 de la devolución conjunta)

### Mecanismo

**Incentivo simétrico, simple, sin costo variable.** Confirmado por Fernando.

| Quién | Recibe |
|---|---|
| **Quien refiere** | **1 mes de PRO gratis** por cada amigo que se registre con su código + complete onboarding (cuenta activa 7 días) |
| **Quien es referido** | **1 mes de PRO gratis** al registrarse usando un código de referido válido |

### Reglas operativas

- **Acumulable** sin límite anual: si refiere 12 personas en un año = 12 meses de PRO gratis (efectivamente 1 año de PRO).
- **No transferible**: solo se aplica al usuario que refiere, no se puede regalar a un tercero.
- **No retroactivo**: solo aplica desde el activación del programa, no para usuarios existentes pre-lanzamiento (excepto si se invierte como mecanismo waitlist tipo Robinhood — ver sección 2.6 cronograma).
- **Trigger de activación de la recompensa**: cuando el referido completa su 7° día activo (no solo registro — para evitar abuso con cuentas falsas).
- **Anti-fraude**: max 50 referidos exitosos por usuario por año (si supera, revisión manual). Detección de patrones (mismo IP, mismo dispositivo, emails secuenciales).

### Implementación técnica (Code construye)

| Componente | Detalle |
|---|---|
| Tabla Supabase `referrals` | `referrer_id`, `referred_id`, `code`, `status` (pending/active/expired/fraud), `created_at`, `activated_at`, `reward_granted_at` |
| Tabla Supabase `referral_codes` | `user_id`, `code` (6-8 chars memorables ej. AURX-3F2K), `created_at`, `uses_count` |
| Endpoint backend `POST /api/referrals/redeem` | Body: `{ code }`. Valida + asocia + retorna |
| Endpoint backend `GET /api/referrals/status/{user_id}` | Devuelve referidos activos, pendientes, recompensas obtenidas |
| Cron del backend (cada 24h) | Verifica usuarios referidos que cumplieron 7 días activos → activa recompensa → otorga 1 mes PRO al referente automáticamente |
| UI in-app | Banner permanente en tab Perfil: "Invitá amigos y ganá meses de PRO gratis. Tu código: AURX-3F2K. Compartí." con botones de share (X, IG, WhatsApp, Telegram, Copy link) |
| Email de bienvenida | Si llegó vía referido, mensaje "Tu mes de PRO gratis ya está activo. Usá tu código para invitar más amigos." |

**Tiempo de desarrollo estimado:** 2-3 días de Code (backend + frontend + lógica de validación + email transaccional + cron de activación).
**Costo:** $0 marginal — es upgrade temporal de plan, no cash transfer.

### Inspiración del research

Robinhood pre-launch (1M+ usuarios con waitlist + acción gratis). El principio: incentivo real (no descuento simbólico), simétrico, simple, viral por diseño.

---

## 2.6 Canales descartados explícitamente (con razón sostenida por research)

| Canal | Razón de descarte |
|---|---|
| **Twitter/X red de pensamiento inversor** (estilo Stocktwits) | Stocktwits tardó 17 años en construir comunidad. AUREX no puede replicar eso desde cero sin presencia humana sostenida. |
| **Podcast con invitados** (estilo Magnifi + Nicole Lapin) | Requiere coordinación con invitados humanos. Fernando no participa. |
| **YouTube en cámara con presentador humano** | Requiere presencia de Fernando. Reemplazado por video IA con HeyGen (Canal 6 y 7). |
| **Eventos presenciales** (estilo Cocos en Movistar Arena) | Requiere Fernando + equipo + logística. Fuera del scope autónomo. |
| **LinkedIn perfil personal** | LinkedIn restringe APIs sobre perfiles personales — no se puede automatizar de forma robusta. Solo Company Page (Canal 8). |
| **Reddit foros** | Automatización detectada como bot rápidamente, riesgo de baneo. Posible uso manual cuidadoso post-tracción, no en plan inicial. |
| **Influencer marketing pago** | Requiere coordinación humana con cada influencer + revisión de contenido + dinero. Fuera del scope autónomo inicial. Considerar para Año 2 con presupuesto. |

## 2.7 KPIs y métricas de éxito

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

## 2.8 Cronograma multi-idioma escalonado (primeros 90 días post-aprobación Apple/Google)

**Prioridad de idiomas confirmada por Fernando:** español primero, inglés segundo, portugués tercero como entrada a Brasil. Los otros 5 idiomas (chino, hindi, árabe, francés, italiano) se activan progresivamente desde Mes 2-5.

### Pre-lanzamiento (Semana 0 — antes de aprobación Apple/Google final)

| Día | Acción | Responsable |
|---|---|---|
| -7 a -3 | Code crea cuentas en plataformas: 3 X (`@aurex_global` EN, `@aurex_es`, `@aurex_br`), 1 Instagram Business `@aurex.app`, 1 TikTok `@aurex.app`, 1 YouTube `@AurexApp`, 1 LinkedIn Company "AUREX", 3 Telegram channels (`@AurexPulseEN`, `@AurexPulseES`, `@AurexPulsePT`), 1 Discord server (placeholder, no activo Mes 1). | Code |
| -7 a -3 | Code crea cuenta HeyGen Pro, prepara galería de 5 candidatos avatar+voz. Fernando elige uno (15-30 min, una vez en la vida). | Code (galería) + Fernando (elegir) |
| -2 | Code configura: Buffer Business plan, Resend (email), Twitter API v2 keys, Meta Graph API, YouTube Data API, dominio `mail.aurex.live` con SPF/DKIM. | Code |
| -1 | Code escribe + activa landing programa de referidos in-app (no público hasta Día 7). Distribuye press release pre-lanzamiento ("AUREX prepares global launch") en EIN Presswire + Chainwire para SEO inicial. | Code (técnico) + Escritorio (release) |

### Mes 1 — Lanzamiento ES + EN + PT (idiomas prioritarios)

#### Semana 1 — Lanzamiento técnico + primer contenido

| Día | Acción | Responsable |
|---|---|---|
| Lun | Press release de lanzamiento global distribuido en EIN Presswire (global) + Chainwire (crypto/fintech) + Notiprensa (LATAM). En 3 idiomas: EN, ES, PT. | Escritorio (release) + Code (distribución) |
| Mar | Primer post en cada cuenta X (EN/ES/PT): señal del día. Primer post Instagram feed (carrousel educativo). Primer post LinkedIn Company. | Code (autónomo, traducción Claude API) |
| Mié | Activar 3 canales Telegram (EN/ES/PT) con primer post diario. Primer email de bienvenida automático para signups (multi-idioma según preferencia del user). | Code |
| Jue | Primer Reel/TikTok/YouTube Short con avatar HeyGen IA — script en español (idioma maestro), traducido a EN y PT. | Escritorio (guion ES) + Code (video IA + upload x3 plataformas x3 idiomas = 9 piezas) |
| Vie | Primer video YouTube largo (5-7 min, análisis semana de mercado). Avatar HeyGen, idioma ES + EN + PT. | Escritorio (guion ES) + Code (3 videos generados + upload) |
| Sáb-Dom | Cron auto continúa. Code monitorea métricas + ajustes finos. | Code |

#### Semana 2 — Primer newsletter + primer artículo SEO

| Día | Acción | Responsable |
|---|---|---|
| Mar | Primer newsletter semanal en 3 idiomas (recap de la primera semana + señales destacadas). Distribuido vía Resend. | Escritorio (estructura ES) + Code (datos vivos + traducción + envío) |
| Mié | Primer artículo blog SEO publicado en aurex.live/blog: "AUREX vs Cocos Capital: cuál usar para invertir desde Argentina" (ES) + "AUREX vs Magnifi: AI investing comparison 2026" (EN). | Escritorio (escribe) + Code (publicación + meta tags) |
| Jue | Segundo Reel/TikTok/YouTube Short. | Escritorio + Code |
| Vie | Segundo video YouTube largo. | Escritorio + Code |

#### Semana 3 — Lanzamiento programa de referidos

| Día | Acción | Responsable |
|---|---|---|
| Lun-Mar | Activación pública del programa de referidos. Banner permanente in-app. Email push a base existente con código personal pre-generado. Pin permanente en Telegram channels. Posts dedicados X/IG/LinkedIn. | Code |
| Mié | Tercer artículo blog: "Mejores apps de inversión con IA 2026" (ES + EN + PT). Tabla comparativa con AUREX, Magnifi, Sagehood, Danelfin, RockFlow. | Escritorio + Code |
| Jue | Newsletter semanal #2 con foco programa de referidos. | Escritorio + Code |
| Vie | Tercer video YouTube + Reel/TikTok del programa de referidos. | Escritorio + Code |

#### Semana 4 — Review + iteración + setup multi-idioma escalado

| Día | Acción | Responsable |
|---|---|---|
| Lun | Code presenta dashboard de métricas Mes 1 vs targets (sección 2.7). Identifica canales over/under performing por idioma. | Code |
| Mar-Mié | Ajustes de cadencia y tono según data. Si MeS 1 va bien (>500 signups/semana), arrancar press release Mes 1 milestones. | Code (data) + Escritorio (release si aplica) |
| Jue | Setup cuentas Mes 2: `@aurex_zh` (chino), `@aurex_hi` (hindi), canales Telegram correspondientes. | Code |
| Vie | Cuarto video YouTube. Primer episodio formato fijo "Análisis de la señal IA de la semana". | Escritorio + Code |
| Sáb-Dom | Plan Mes 2 documentado. Empieza traducción automática multi-idioma para los 5 idiomas faltantes. | Code |

### Mes 2 — Activación chino + hindi

- Activación cuentas X/Telegram en chino y hindi.
- Posts traducidos automáticamente desde los maestros ES/EN.
- Press release específico India (vía PRNewswire India) y Asia (vía e27 / TechInAsia).
- Primer newsletter en chino y hindi.
- Reels/TikToks con avatar HeyGen + voces en chino y hindi (HeyGen soporta ambos idiomas nativamente).

### Mes 3 — Activación árabe + francés

- Activación cuentas X/Telegram en árabe y francés.
- Press release Oriente Medio (vía Zawya, AME Info) y Francia/Europa francófona (vía AFP / La Tribune).
- Primer artículo blog específico para finanzas islámicas (sharia compliance del análisis IA — sin recomendación cripto especulativo en mensajes árabes).

### Mes 4-5 — Activación italiano + consolidación

- Activación cuenta X/Telegram en italiano.
- Press release Italia (vía Il Sole 24 Ore press distribution).
- Review consolidado 8 idiomas: por qué algunos crecen más, qué ajustar.

### Mes 6 — Decisión de fase 2

Con métricas de 6 meses se decide:

- ¿Programa de referidos rinde el K viral esperado? Si sí, escalar incentivo.
- ¿API institucional ya tiene tracción de developers? Si sí, lanzar Sandbox público + plan de monetización.
- ¿Cuál idioma rinde mejor (mayor LTV)? Concentrar más recursos en ese idioma.
- ¿Discord server vale la pena para inglés/global? Decisión sí/no.

## 2.9 Presupuesto mensual estimado (Año 1, plan global multi-idioma)

| Categoría | Monto estimado | Notas |
|---|---|---|
| Buffer Business plan | $15/mes | Posts IG + LinkedIn + scheduling multi-cuenta x 8 idiomas |
| HeyGen Pro (anual) | $24/mes ($288/año) | 30 min de video IA/mes con avatar prefabricado + voces multi-idioma para los 8 idiomas |
| Resend | $0-20/mes | Hasta 50k emails (multi-idioma con segmentación) |
| Claude API tokens (workflow localización) | $5-15/mes | Traducción automática ES→7 idiomas para ~100 piezas/mes |
| Twilio fallback WhatsApp | ~$10/mes | Solo cuando Evolution falla |
| Twitter API Free tier | $0 | 1.500 posts/mes/app, suficiente para 8 cuentas |
| Telegram Bot API | $0 | Gratuito |
| YouTube Data API | $0 | Gratuito (cuotas suficientes para 1 video/semana/idioma) |
| Wire services press releases | $400-700/release puntual | EIN Presswire global ($300-500), Chainwire crypto ($200), Notiprensa LATAM ($150-250), PRNewswire India/Asia ($300-500), Zawya Oriente Medio ($200-400), regional según mercado activado |
| Dominios secundarios + SSL | $5/mes | mail.aurex.live, blog hosting backup |
| **Total mensual recurrente** | **~$60-90/mes** | Reducido vs v2.0 porque HeyGen anual + Claude API son más baratos que estimación inicial |
| **Press releases año 1 (~6 puntuales)** | ~$2.500-4.000 | Lanzamiento global + lanzamientos regionales por idioma |
| **Total año 1 todo incluido** | **~$3.500-5.000** | |

**Comparación vs v2.0:** la estimación anterior asumía HeyGen Pro mensual ($99/mes) — corregido a anual ($24/mes equivalente), y el costo del workflow de localización ($5-15/mes) sustituye al costo hipotético de "contratar traductor por idioma" que hubiera sido $200-500/mes/idioma. **Ahorro estimado vs alternativa con traducción humana: ~$1.500-3.500/mes.**

Esto excluye costos de desarrollo (tareas de Code, sin costo dinero) y costos de Apple/Google ya pagados.

---

# PARTE 3 — PENDIENTES Y NEXT STEPS

## 3.1 Pendiente entrega de Escritorio: primeros contenidos modelo por tipo (Punto 3 de la devolución conjunta)

Una vez aprobada esta v2.1 por Fernando, Escritorio escribe **un primer contenido modelo en español** (idioma maestro) por cada tipo de canal:

1. **Post X/Twitter** — texto exacto con señal de ejemplo + datos visuales.
2. **Post Instagram feed** — descripción visual del carrousel + copy del caption.
3. **Story Instagram** — formato, texto sobre imagen, CTA.
4. **Reel/TikTok/YouTube Short** — guion 30-60 seg + indicaciones de ritmo y avatar.
5. **Email de bienvenida** — asunto + cuerpo.
6. **Email newsletter semanal** — asunto + estructura + cuerpo de un ejemplo.
7. **Artículo de blog comparativo** — estructura completa + primer párrafo de "AUREX vs Cocos Capital".
8. **Post LinkedIn Company Page** — tono profesional + tema concreto.
9. **Mensaje Telegram daily** — formato del resumen diario con ejemplo real.
10. **Press release de lanzamiento** — versión EN.

Code traduce automáticamente cada contenido modelo a los otros 7 idiomas con el workflow 2.3.0. Los contenidos modelo aprobados quedan como **plantillas-base** del cron del backend para producción autónoma.

## 3.2 Aprobaciones pendientes de Fernando (única intervención manual)

1. **Aprobar v2.1** (este documento) → habilita a Escritorio a escribir los contenidos modelo.
2. **Handles definitivos** para X (3 cuentas Mes 1), Instagram, TikTok, YouTube, LinkedIn Company, Telegram (3 channels Mes 1). Code propone defaults + Fernando confirma o ajusta.
3. **Sesión única HeyGen** (~15-30 min, una vez en la vida): elegir avatar + voz entre 5 candidatos que Code pre-arma. Documentado en sección 2.4.
4. **Presupuesto mensual** ~$60-90 fijo + ~$2.500-4.000 año 1 en press releases puntuales.
5. **Templates iniciales** de cada canal (una vez aprobados los contenidos modelo de Escritorio, corren automáticamente).
6. **Disclaimers regulatorios** del posicionamiento — ya están en `aurex-i18n.js` validados en los 8 idiomas.
7. **Decisión de timing del lanzamiento global** post-aprobación Apple Build 17 + Google Play Build 2.

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

*PLAN_MKT.md v2.1 (Code, post-cruce con Escritorio + Fernando) — última actualización: 29-abr-2026 noche.*
*Próximo paso: Escritorio escribe primeros contenidos modelo por tipo de canal (Punto 3 de la devolución conjunta) → Code integra → v2.2 final para aprobación de Fernando.*
