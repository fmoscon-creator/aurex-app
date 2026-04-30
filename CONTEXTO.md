# CONTEXTO DEL PROYECTO AUREX
Última actualización: 29 de Abril de 2026 (~03:15 AR)

## INICIO RAPIDO
Pega esto al abrir nueva conversacion con Claude:

Hola, continuamos con Aurex.
Repo: https://github.com/fmoscon-creator/aurex-app
App: https://fmoscon-creator.github.io/aurex-app  (alias: aurex.live)
Lee CONTEXTO.md y PLAN-ACCION.md del repo.
Token GitHub: [TOKEN]
Tarea de hoy: [FECHA] - [TAREA]

---

## ESTADO ACTUAL — 29 ABRIL 2026

### HEAD ACTUAL (PWA aurex-app, branch main)
Commit: eb0f089
Fecha: 2026-04-29
Descripcion: docs: agregar arranque de Code desde home y ubicación de memoria persistente

### REPOS RELACIONADOS (3 repos del proyecto)
- aurex-app (PWA)         main: eb0f089  (este repo, hosting GitHub Pages)
- AurexApp (Nativa)       dev:  2a12b69  (React Native — Build 17 enviado a Apple, NO TOCAR main hasta aprobación)
- aurex-backend           main: bfd0ecb  (Railway — incluye endpoint /api/whatsapp/connect-qr con secret y soporte de pairing code)

### COMMITS DEL 29 DE ABRIL 2026
- aurex-app eb0f089 — sección 0.A en CLAUDE.md y subsección en INICIO_AUREX.md: procedimiento de arranque de Code desde home (`cd ~ && claude`) y ubicación de la memoria persistente (`~/.claude/projects/-Users-fernandomoscon/memory/`, 7 archivos: índice + 6 con reglas y datos operativos).
- aurex-backend ec578af — endpoint nuevo `GET /api/whatsapp/connect-qr` para generar QR de vinculación de Evolution sin que la apikey salga de Railway. Acceso protegido por la env var `WHATSAPP_CONNECT_SECRET` (header `X-Secret` o query `?secret=...`).
- aurex-backend bfd0ecb — soporte de pairing code en el mismo endpoint: si llega `?number=<numero>` se propaga a Evolution para devolver `pairingCode` en vez de QR. Quedó instalado pero NO funcional con Evolution v1.8.7 (esa versión ignora el parámetro y devuelve QR igual; pairing code requiere Evolution v2).
- aurex-backend 09c4c32 — `dailyHealthReport` ahora manda también por Telegram (en paralelo a WhatsApp Evolution). `dailyProjectStatusReport` cambió de 20:00 AR (`0 23 * * *`) a 9:00 AR (`0 12 * * *`); también se actualizaron el título del reporte ("Reporte 9:00 hs AR") y el mensaje de error del catch para coherencia.

### APPLE — Build 17 iOS
- **Nombre publicado en App Store: AUREX AI** (no "AUREX" — estaba ocupado, "AUREX AI" cumple Guideline 2.3.7)
- **Nombre del ícono en iPhone (CFBundleDisplayName): AUREX** (diferencia legítima permitida por Apple)
- Estado: Pendiente de revisión
- Build: 17 (Marketing Version 1.0, CURRENT_PROJECT_VERSION 17)
- Submit: 24 Abril 2026, 5:24 AM AR
- ID envío: e0e7fb35-11a4-4c1d-854c-60a80c4799e6
- Apple Account: fmoscon@gmail.com
- Team ID: TX7C2F79U9
- Apple App ID (interno ASC): 6761672161
- Bundle ID: com.fernandomoscon.aurex
- Contacto registrado en App Store Connect: +54 11 6789-1320 / fmoscon@gmail.com
- Idioma principal listing: Inglés (EE.UU.)
- Subtítulo: "Real-time market data tracker" (intencional — alinea con Utilidades, sin lenguaje financiero)
- Categoría primaria: Utilidades (cambiada desde Finanzas tras rechazos previos)
- Categoría secundaria: Productividad
- Idiomas localización (8): EN, ES, FR, IT, HI, AR, PT, ZH
- Metadata: segura, sin lenguaje financiero
- Disclaimers: corregidos en código de Build 17
- Webhook ASC → RevenueCat (Apple Server Notifications V2, idéntico para producción y sandbox):
  https://api.revenuecat.com/v1/incoming-webhooks/apple-server-to-server-notification/WICtYZubpcHyBpPfLnZMoagjatQAyjPD
- Builds en TestFlight legacy: 9, 10, 11, 12, 13 (Build 9 retirado por el desarrollador)
- Provisioning Distribution: ~/Downloads/AUREX_App_Store_Distribution.mobileprovision (5-abr)
- Casos Apple previos: cerrados automáticamente al enviar Build 17 (los anteriores eran sobre builds reemplazados)

### GOOGLE PLAY — Android Build 2
- **Nombre publicado en Play Store: AUREX**
- Estado: Prueba cerrada activa
- Build: 2 (versionName "1.0.1", versionCode 2)
- Bundle: com.aurexapp
- Categoría: Herramientas (cambiada desde Finanzas)
- Prueba cerrada: 14 días requeridos, llevamos 5 corridos (submit 23-abr 16:20 AR), con 12+ testers activos
- Link prueba: https://play.google.com/apps/testing/com.aurexapp

### TELEGRAM (canal principal y permanente de alertas)
- Decisión tomada el 28-abr-2026 tras incidente WhatsApp: Telegram queda como canal **principal y permanente**, sin remover. WhatsApp pasa a canal **secundario** una vez se reconecte.
- Bot: @Aurexalertas_bot (id 8740136430, "Aurex Alertas")
- Token: env var `TELEGRAM_BOT_TOKEN` en Railway aurex-app (existente desde antes)
- Chat ID admin Fernando: env var `ADMIN_TELEGRAM_CHAT_ID` en Railway aurex-app (no se publica el valor en repo público por privacidad)
- Reportes automáticos por Telegram al admin:
  - Reporte diario salud (`dailyHealthReport`): 8:00 AR (cron `0 11 * * *`). Desde commit 09c4c32 se manda también por Telegram en paralelo al envío por WhatsApp Evolution (redundancia).
  - Reporte diario de proyecto (`dailyProjectStatusReport`): 9:00 AR (cron `0 12 * * *`). Cambio de horario aplicado en commit 09c4c32 (antes corría a las 20:00). Manda 4 mensajes consecutivos: (1) cuerpo principal con stores Apple/Google + SHAs de los 3 repos + incidentes activos + crypto source; (2) link a `CONTEXTO.md`; (3) link a `INICIO_AUREX.md`; (4) `RESEARCH_API_KEY` si está seteada.
  - Reporte mensual: 18:00 AR del último día hábil (cron `0 21 28-31 * *`).
- Riesgo de baneo: cero (Telegram permisivo con bots).

### INCIDENTES ACTIVOS (al 29-abr-2026)
- **BN-002 ACTIVE** — Binance bloqueado en Railway región us-east4 desde 18-abr-2026 18:30 UTC. MITIGATED via CryptoCompare (fallback funcionando). Datos críticos llegando OK. 11 días sin resolución; investigar alternativas post-Apple.
- **WA-001 ACTIVE** — Evolution API (servicio evo-v1) sin sesión WhatsApp desde 28-abr 15:25 UTC. Estado al 29-abr-2026 ~03:15 AR: el número 2563 ya está VERIFICADO (código por llamada el 28-abr, email + passkey activados como respaldo), pero la sesión sigue sin vincularse. Intentos del 29-abr (5 llamadas a `/instance/connect/aurex` acumuladas):
  1. QR vía endpoint nuevo `/api/whatsapp/connect-qr` → primer intento devolvió `count: 0` sin QR.
  2. Segundo intento → QR válido, Fernando lo escaneó. WhatsApp mostró "Iniciando sesión... Mantén WhatsApp Business abierto en ambos dispositivos" pero no completó vinculación; el estado en Evolution pasó a `connecting` y volvió a `close`.
  3. Pairing code (`?number=5491133602563`) → Evolution v1.8.7 ignora el parámetro y devuelve QR otra vez (la feature requiere Evolution v2). 5 llamadas acumuladas → freno para evitar antifraude WhatsApp.
  - Decisión: dejar la reconexión para mañana (cooldown post-suspensión se levanta en 4-24 hs) usando QR limpio. Telegram cubre alertas mientras tanto.

---

## PENDIENTES INMEDIATOS

1. Esperar respuesta Apple Build 17 (submit 24-abr 5:24 AM AR)
2. Esperar Google Play: completar 14 días de prueba cerrada (4 días corridos al 28-abr)
3. Onboarding: corregir faltas de ortografía detectadas en emulador
4. Corregir 2 líneas v1.0.0 hardcodeado en nativa (PerfilScreen.js L789 y L851)
   con Platform.OS — sólo cuando Apple/Google aprueben
5. **Reconectar sesión WhatsApp del 2563 a Evolution — POSTERGADA al 30-abr-2026 9:00 AM AR (no reintentar antes)**
   Decisión de Fernando del 29-abr-2026 ~09:05 AR. Razón: el cooldown de antifraude WhatsApp post-suspensión + verificación dura 24-48 hs en casos donde hubo creación/borrado previo de instancias (que es lo que pasó el 28-abr). Reintentar antes del 30-abr 9:00 AR tiene alta probabilidad de volver a fallar y de seguir acumulando llamadas a `/instance/connect/aurex` (lleva 5 acumuladas en la sesión del 29-abr ~03:00 AR), lo que aumenta el riesgo de antifraude. Diagnóstico del 29-abr (en RESEARCH/transcript de la sesión, sin pendiente de código): la instancia "aurex" SÍ existe en Evolution (verificado por todas las respuestas de `/api/whatsapp/status` con `instanceName: "aurex"` y `state` válido). El problema NO es la instancia ni nuestro código; es el cooldown WhatsApp del lado server.
   
   El 2563 ya está verificado (código por llamada el 28-abr-2026 noche, email + passkey activados como respaldo).
   
   **Procedimiento para retomar el 30-abr 9:00 AM AR:** Code llama a `GET /api/whatsapp/connect-qr` con el secret guardado en `~/secret.txt` (la env var `WHATSAPP_CONNECT_SECRET` ya está cargada en Railway aurex-app), genera el PNG en `~/Downloads`, abre con Preview, Fernando escanea desde WhatsApp Business → Ajustes → Dispositivos vinculados. UNA llamada, UN intento. Si el QR vuelve a fallar, parar ahí y replantear (no reintentar más). Una vez conectada, activar las alertas Railway por WhatsApp para que corran en paralelo con Telegram (que queda como canal principal/permanente).
   
   El ticket WhatsApp soporte #1807446727774286 abierto el 28-abr probablemente ya no haga falta (la verificación se resolvió sola); conviene que Escritorio chequee Gmail por si llegó respuesta.

6. ~~Cambiar horario del reporte diario de proyecto en Telegram de 20:00 a 9:00 AR.~~ **HECHO — 29-abr-2026 ~08:42 AR (commit 09c4c32 en aurex-backend).** El cron `dailyProjectStatusReport` ahora corre a las 9:00 AR (`0 12 * * *`). Mismo commit agregó envío por Telegram al `dailyHealthReport` (8:00 AR) para que llegue por Telegram aunque Evolution esté caído.

---

## PEDIDOS A ESCRITORIO (revisión externa, sin acceso al código)

1. **Verificar webhook RevenueCat en su dashboard** — entrar a RevenueCat → sección "Webhooks" → revisar el log de eventos recibidos en vivo. Especialmente útil mientras Apple está revisando Build 17: si el reviewer hace una compra de prueba con cuenta sandbox, ese evento debería aparecer en el log. Si NO aparece, sería señal de que el webhook está mal conectado y la app no activaría plan PRO/ELITE post-compra (riesgo de rechazo Apple por "Bug: in-app purchase not unlocking content"). URL configurada en App Store Connect (idéntica para producción y sandbox): `https://api.revenuecat.com/v1/incoming-webhooks/apple-server-to-server-notification/WICtYZubpcHyBpPfLnZMoagjatQAyjPD`

---

## PENDIENTES ESTRUCTURALES (post-Apple)

1. Railway + Binance — CRÍTICO (Binance bloqueado)
2. WhatsApp Alertas — verificar Evolution + env vars
3. Evolution API — verificar hosting actual
4. **Configurar volumen persistente en Railway para evo-v1 (Evolution API)** — CRÍTICO. Las sesiones de WhatsApp se borran con cada redeploy del container porque no hay volumen persistente. Esto causó la suspensión del número AUREX el 28-abr-2026 cuando la repetida creación/borrado de instancias disparó el sistema antifraude de WhatsApp Business. Solución: configurar Railway Volume montado en `/evolution_api/instances/` o equivalente, o migrar a PostgreSQL como storage de Evolution API.
5. **Migrar Evolution API a v2** — pendiente para destrabar pairing code. Evolution v1.8.7 (versión actual en evo-v1) ignora el parámetro `?number=` en `/instance/connect/`. Pairing code (vinculación con código de 8 caracteres en lugar de QR) es feature útil cuando WhatsApp aplica cooldown sobre QR post-suspensión. La v2 tiene API ligeramente distinta; antes de migrar conviene revisar compatibilidad con `sendWhatsAppEvolution`, `sendWhatsAppImage` y los endpoints de `/instance/*` que usa el backend.

---

## v1.1 (post-aprobación Apple/Google)

1. Store centralizado de precios — PRIORITARIO
2. Editar activo Portfolio
3. Selector monedas Valor Total
4. PT/ZH activar (ya funcionan)
5. Banner eventos dinámico
6. Onboarding modo claro
7. Foto perfil persistente

---

## v2.0 (futuro)

1. API eventos real
2. Alertas WhatsApp automáticas
3. Notificaciones push
4. Análisis técnico avanzado
5. Social / comunidad
6. API personal ELITE

---

## PLAN MARKETING (Plan MKT v2 — paralelo a aprobación Apple/Google)

### Objetivo
Definir el posicionamiento de AUREX frente a la competencia antes del lanzamiento global. La investigación informa: audiencia objetivo, tono, canales, modelo de monetización óptimo, y qué les funcionó para crecer a los competidores.
Pregunta central: ¿AUREX se compara con quién y por qué? ¿A quién le quiere sacar clientes?

### Metodología
- Code documenta hallazgos crudos por competidor (datos verificados con fuente + fecha).
- Escritorio agrega análisis estratégico sobre los hallazgos.
- Cuando estén todas las pasadas, ambos integran todo en `PLAN_MKT.md` v2.
- Regla de honestidad: si no hay fuente sólida, marcar "no verificado" en lugar de inventar.

### Hecho — Pasadas 1, 2, 3, 4 y 5 (19 competidores cerrados, todos con análisis estratégico de Escritorio)
Cada competidor tiene los 10 puntos estándar (posicionamiento, audiencia, monetización, canales, contenido, tono, lanzamiento, crecimiento, reseñas, fuentes) más análisis estratégico de Escritorio cruzado con AUREX. Pasada 5 cerrada con análisis estratégico el 29-abr-2026 (Smallcase + Nubank Investimentos). Todo en `RESEARCH_MKT.md`.

**Pasadas 1 y 2 (históricos):**
1. **Magnifi** — AI investing assistant (TIFIN, respaldado por J.P. Morgan). Freemium $8.25-14/mes. Creció por backing institucional y podcast con Nicole Lapin. Sin presencia orgánica en redes. Lección: AUREX puede hacer lo que Magnifi no hace — mostrar el producto en acción en redes.
2. **Composer** — Trading algorítmico sin código. $32/mes. Creció por flywheel comunitario (80% del valor lo genera la comunidad con estrategias compartidas). Lección: las señales de AUREX son contenido compartible si se presentan bien visualmente.
3. **Public.com** — Broker con IA encima. Premium ~$10/mes. El AI research assistant convirtió casi la mitad de las conversaciones en transacción dentro de las 24 hs. Lección: señal IA clara en el momento correcto genera acción inmediata; medirlo desde el día uno.
4. **Stocktwits** — Red social de traders. 35-50% del revenue viene de Data Licensing (Social Sentiment API a Bloomberg, hedge funds). Lección crítica: AUREX necesita segunda palanca de monetización (datos/señales agregados para terceros) diseñada desde el inicio. YouTube es su primera fuente de tráfico social.
5. **Atom Finance** — Caso más importante del research: murió haciendo exactamente lo que AUREX planea (research B2C con freemium $9.99/mes). Llegó a 100k usuarios y $10.6M de funding y cerró igual. Lección existencial: con solo suscripciones freemium el unit economics no cierra; la conversión FREE → Premium en research financiero es históricamente baja.
6. **TradingView** — Benchmark de producto. $3B de valuación, $172M de revenue. Creció por superioridad técnica (HTML5 cuando todos eran Flash) y network effect de comunidad. Lección: el producto tiene que generar word-of-mouth orgánico; las señales IA tienen que acertar en los primeros 7 días para retener.
7. **Robinhood** — Caso de lanzamiento más relevante. Pre-launch waitlist con "free stock" referrals generó 1M+ usuarios antes del lanzamiento. Lección: programa de referidos con incentivo real (acceso PRO gratis, no solo descuento) es el mecanismo de adquisición más efectivo en fintech retail. El mercado hispanohablante es el equivalente al mercado retail pre-Robinhood: subatendido, con disposición a pagar.

**Pasada 3 (apps recientes 2024-2025, agregada 29-abr-2026):**
8. **Sagehood AI** — Agentes IA para US stocks (varios agentes especializados: fundamentales, news, sentiment, risk). $9.99/mes (idéntico al PRO de AUREX), 14 días free trial. Lanzado vía Product Hunt 2025, top 15 anual. Solo S&P 500 al 29-abr (Nasdaq pendiente). Lección: el precio $9.99/mes para PRO de AUREX queda triple-validado (Sagehood + Magnifi + Atom). Limitación a US stocks deja gap directo para AUREX (350 activos: cripto + acciones de 6 mercados incluyendo Argentina y Brasil/LATAM + ETFs + materias primas + metales + futuros + bonos + divisas; 74 con señales IA propias).
9. **WarrenAI (Investing.com)** — Research assistant lanzado 21-abr-2025. Acceso a 72k+ activos, 1200+ métricas, 10 años histórico, **30 idiomas** (vs AUREX 8). Embebido en InvestingPro (no standalone), distribuido a 60M+ usuarios mensuales de la matriz. Lección: no se le compite de frente, se le flanquea con foco específico (señales propias en lugar de prompts, presencia visual fuerte, mercado hispanohablante donde la marca Investing.com es percibida lejana).
10. **Danelfin** — Barcelona, founded 2016 / lanzado IA 2021 por Tomás Diago (ex-Softonic). €2M raised. AI Score 1-10 con Explainable AI. Track record público: stocks 10/10 outperform S&P en +21.05% annualized alpha 3 meses. Pricing dual: Plus retail $22/mes + API tiers $70/$199/$599 — palanca dual retail+B2B activa y monetizando. Award Benzinga 2023. Lección: validación más fuerte del modelo dual ya rentable. Pregunta crítica para AUREX: ¿se puede empezar a publicar acierto/error de las señales IA desde el día 1 del lanzamiento como Danelfin lo hace? Diseñar el logging de tracking ahora.
11. **RockFlow** — Singapur, founder Vakee Lai. $20M total raised (Series A nov-2025, $10M Angel Round BlueRun Ventures). Bobby (AI assistant) + TradeGPT. Mobile-first, **9 idiomas** (vs AUREX 8), 30+ países. Fractional desde $1. Es broker (no solo análisis). Tono "fun" para Gen Z. TikTok @rockflow.ai + IG @rockflowapp + X @RockFlowApp. Lección: el caso más cercano a AUREX en multi-idioma+multi-país+mobile, pero distinto por ser broker y por tono Gen Z. Pregunta crítica: AUREX define explícito si compite por Gen Z (RockFlow) o por inversor maduro (Public.com, estética actual de AUREX).
12. **Guavy** — Calgary, CEO Donna Tilden. Empresa founded 2015 (data financiera) que pivotó a producto retail crypto en mobile. App iOS lanzada oct-2025 (anuncio dic-2025), Android 2026. Crypto-only, 350+ coins. Pricing dual: app retail Plus $6.99/mes + API tiers Sandbox gratis / $39 / $399. Distribución vía press release masivo en crypto media (Daily Hodl, Chainwire, Crypto Briefing, etc.) — sin redes sociales propias verificadas. Lección: ventana de oportunidad porque Guavy todavía no cubre stocks ni habla más de un idioma confirmado. AUREX puede salir antes con multi-asset (350 activos: cripto + acciones de 6 mercados + ETFs + materias primas + metales + futuros + bonos + divisas) + multi-idioma (8). Precio $6.99/mes señala margen para AUREX FREE más generoso o sub-tier por debajo de PRO si se quiere atacar ese segmento.

**Insights inmediatos transversales de Pasada 3 (sin esperar análisis estratégico de Escritorio):**
- Precio $9.99/mes triple-validado (Sagehood + Magnifi + Atom). Techo para tier ELITE: $22/mes (Danelfin).
- Palanca dual retail + API B2B es patrón estándar emergente: Stocktwits histórico, Danelfin con 3 tiers, Guavy desde lanzamiento.
- Multi-idioma es competencia real: WarrenAI 30, RockFlow 9, AUREX 8. Diferencial vendrá de calidad de producto en ES, PT, HI.
- Ningún competidor cubre simultáneamente: análisis IA + multi-asset (stocks+crypto) + mobile + multi-idioma + freemium con API B2B. AUREX tiene posicionamiento ortogonal disponible.

**Pasada 4 (LATAM acotada, agregada 29-abr-2026 — análisis estratégico de Escritorio reservado en blanco):**
13. **Cocos Capital** (Argentina, broker fintech AR más grande, founded feb-2021 por Ariel Sbdar + Nicolás Mindlin) — sin IA como diferencial, regulado CNV. Plans: 1% comm general / 0% comm Cocos Gold y Pro. Score Bolsa24 87/100. Controversia 28-abr-2026: CEO abucheado en Movistar Arena por 12k+ secundarios por su exposición pública con $LIBRA. Lección: deja espacio claro a AUREX como "no broker, análisis IA"; controversia política de Sbdar abre espacio para marca AR neutral.
14. **Lemon Cash** (Argentina, founded 2019 por Marcelo Cavazzoli) — wallet crypto con 5M usuarios AR+PE. $66M raised total ($20M Series B F-Prime+ParaFi). Lemon Card (VISA prepaid + BTC cashback) disparó crecimiento <10k → 2M usuarios. Social: IG 218K, TikTok 64.6K, X activo. Expansión planificada CO/MX/BR/CL. Lección: demuestra que "useful + español-AR + tono retail" funciona a 5M; benchmark concreto IG 218K + TikTok 64.6K para AUREX 12-24 meses.
15. **Warren Brasil** (founded 2017 por Tito Gusmão+3 cofounders) — wealthtech con 300k clientes. Fee fijo 0.7-0.9%/año AUM. R$ 300M raised + Citi Ventures. Adquirió Renascença (corretora 50 años). Q1-2024: breakeven + Warren Flow (IA para advisors humanos, no para usuarios). Lección crítica: la IA de Warren es para PRODUCTIVIDAD INTERNA, no señales para usuarios. Gap claro para AUREX: IA que genera señales directas, sin advisor intermedio. Coincidencia de nombre con WarrenAI (Pasada 3) — aclarar en síntesis.
16. **Avenue (Brasil)** (founded 2018 en Miami por brasileños) — broker para invertir en USD desde Brasil. **Adquirido por Itaú: 35% en 2022 por R$ 493M, control 50.1% en 2 años; operación total ~R$ 1.4 bilhão**. 900k cuentas + R$ 20bi AUM. Lección: éxito del "puente al mercado USA" para retail LATAM; Itaú compró en lugar de construir IA in-house; AUREX puede ser capa de análisis IA sobre los activos USA que esos 900k usuarios ya tienen.
17. **Bitso (México)** (founded 2014 por Daniel Vogel + Pablo Gonzalez + Ben Peters) — 9M usuarios + 2.000 B2B en 4-6 países LATAM. **$2.2B valuation (2021, primer crypto unicornio LATAM), $80M+ funding total**. Bitso Business como segunda palanca confirmada. MXNB stablecoin propio (peso mexicano). Stocks USA commission-free vía Alpaca. Audit CCSS Level II late 2025. Lección: moat regulatorio enorme (4 jurisdicciones LATAM + Gibraltar) imposible replicar; competir como capa de análisis sobre Bitso vs construir audiencia propia es decisión clave para AUREX.

**Insights LATAM transversales (Pasada 4, sin esperar análisis estratégico de Escritorio):**
- **Ningún competidor LATAM analizado usa IA de generación de señales como diferencial primario.** Warren Brasil tiene IA pero para productividad de advisors. Cocos, Lemon, Avenue, Bitso no tienen IA propia significativa. **El gap LATAM en IA-señales-multi-asset existe y es ocupable.**
- **El "vacío del mercado hispanohablante" identificado en Pasadas 1-3 se relativiza:** sí hay players grandes en LATAM (Bitso 9M, Lemon 5M, Avenue 900k cuentas, Warren 300k clientes). Pero ninguno cubre IA + señales + multi-asset. **Posicionamiento ortogonal disponible, no terra incognita.**
- Distribución institucional importa: Warren+Citi, Avenue+Itaú, Bitso+Stellar — partnerships institucionales son recurrentes en escala LATAM.
- Cocos + Lemon cubren los dos arquetipos AR (broker tradicional regulado vs wallet crypto retail). AUREX puede ser tercer arquetipo: análisis IA sin custodia, complementario.
- Brasil tiene el mercado más grande con jugadores sólidos (Warren, Avenue + XP, Rico, Inter, Nubank Investimentos). México con Bitso es el caso más maduro. Argentina tiene mercado más fragmentado y volátil — entrada más fácil pero más chico.

**Pasada 5 (mini bonus blind spots, agregada 29-abr-2026 — análisis estratégico de Escritorio reservado en blanco):**

Decisión de hacer Pasada 5 mini: tras cerrar Pasada 4 detectamos 6 blind spots temáticos. De esos, 2 críticos para definir posicionamiento de AUREX y se cubren acá: India (mayor mercado retail en growth) + neo-bancos LATAM con inversión integrada (categoría que captura retail principiante por defecto). Otros 4 blind spots quedan documentados sin investigar (white-label/B2B2C, regulación regional transversal, research B2C content-first como Seeking Alpha/Motley Fool, gaps demográficos) por corresponder a fases distintas del proyecto AUREX.

18. **Smallcase** (India, founded 2015 por Vasanth Kamath + Anugrah Shrivastava + Rohan Gupta) — 3M+ usuarios activos, ~10M registrados. **Marketplace de model portfolios curados por SEBI-registered managers**. $100M+ raised en 7 rondas (Sequoia, Amazon, Premji, HDFC Bank, Blume, Beenext). Annual revenue ₹114 Cr (~$13M USD), $2.5B en transacciones anuales. Tickets desde ₹21 (~$0.25). Integrado con 14+ brokers indios sin competir con ellos (Zerodha, Groww, Upstox, ICICI, HDFC, Angel One, etc.). **Modelo dual:** free smallcases + fee-based smallcases (subscripción mensual/trimestral/anual fijada por cada manager). HBS case study publicado. Lección: marketplace + integración con brokers existentes elimina fricción competitiva. Tickets micro habilitan adquisición masiva. Quejas: subscription fees percibidas como caras en mercados bajistas. India NO es prioridad para AUREX (idioma + SEBI + Smallcase/Groww/Zerodha incumbents); LATAM hispanohablante primero.

19. **Nubank Investimentos** (Brasil + LATAM, founded 2013 por David Vélez + Cristina Junqueira + Edward Wible) — **107M brasileños base (60% de adultos BR), 114M globales**. NYSE: NU desde IPO 2021. Revenue 2024: $11.5B (+58% YoY). Investimentos consolidado en el app desde abril 2024 — brokerage-free + recomendaciones por perfil + Investment Street Mode (privacidad de balances) + Smart Defenses (AI detección de fraude). **IA in-house vía adquisiciones:** Olivia (2021, control financiero personalizado) + Hyperplane (2024, AI Silicon Valley con founders brasileños para datos no estructurados). Vélez declara IA como "próximo paso de inclusión financiera". **Audiencia:** principiantes y small contributions (XP/Inter cubren retail más sofisticado). 66% brasileños esperan que su financial institution les dé recomendaciones de inversión (IPSOS) — Nubank lee el gap y lo cubre con IA. Lección crítica: **distribución incumbente domina LATAM** (107M = CAC efectivo cero); IA financiera retail tiende a M&A (Olivia + Hyperplane); espacio claro para AUREX en señales accionables específicas multi-asset que Nubank no cubre. **Riesgo competitivo real:** Nubank tiene capacidad financiera/técnica para incorporar señales IA específicas como feature interno cuando lo decida — la ventaja temporal de AUREX es real pero acotada.

**Insights blind spots transversales (Pasada 5):**
- **El gap "IA + señales accionables específicas multi-asset" sigue libre incluso después de cubrir India y Nubank.** Smallcase es marketplace, no genera señales propias. Nubank Investimentos tiene IA pero para recomendaciones generales y seguridad, no señales granulares. **Confirma por quinta vez (Pasadas 1-5) que el espacio existe.**
- **Modelos marketplace + integración con brokers (Smallcase con 14+ brokers indios) son replicables en LATAM** — AUREX podría integrar con Cocos, Lemon, Avenue, Bitso como capa de análisis sin ser broker.
- **IA financiera retail tiende a M&A:** Nubank compró Olivia + Hyperplane; Itaú compró Avenue. AUREX bien ejecutado puede ser target de adquisición a 3-5 años — relevante como exit potencial.
- **India queda fuera del Plan MKT inicial** por idioma + regulación + competidores incumbents. LATAM hispanohablante primero, India eventual fase 2-3.
- **6 blind spots originales: 2 cubiertos (India + neo-bancos LATAM), 4 documentados sin investigar.** Los 4 restantes (white-label/B2B2C, regulación regional transversal, research B2C content-first, gaps demográficos) son post-síntesis Plan MKT v2.

### Hecho — Plan MKT v2.0-draft (29-abr-2026)
- **Síntesis estratégica global** entregada por Escritorio el 29-abr-2026.
- **Revisión cruzada por Code** según `feedback_plan_mkt_revision_cruzada.md`: detectó 5 errores de evidencia + falta de plan táctico ejecutable + ausencia de reparto Code vs Escritorio + canales obvios omitidos (Telegram, WhatsApp, Email, YouTube IA, programa de referidos).
- **Plan MKT v2.0-draft** consolidado en archivo nuevo `PLAN_MKT.md` (raíz del repo). Contiene síntesis estratégica corregida + plan táctico ejecutable de 11 canales + cronograma 30 días + KPIs + presupuesto Año 1 (~$130-150/mes recurrente). Cero acción manual de Fernando.
- Pendiente: cruce con Escritorio para versión v2.1, aprobaciones específicas de Fernando (handles de redes, presupuesto mensual, templates iniciales, disclaimers regulatorios), conexión Claude API real al motor IA, reconexión WhatsApp 30-abr 9:00 AR.

### Hecho — Plan MKT v2.1 + reset visual a Fase A (29-abr-2026 noche)
- **`PLAN_MKT.md` v2.1** commiteado con devolución conjunta Escritorio + Fernando: premisa global corregida (NO LATAM, app multi-idioma 8 idiomas + 6 mercados), avatar HeyGen specs, programa de referidos definido (1 mes PRO + 1 mes PRO simétrico), workflow de localización ES→7 idiomas vía Claude API, riesgos regulatorios por jurisdicción, cronograma multi-idioma escalonado.
- **Reformulación profunda del approach de contenido:** Fernando + Code identificaron que tratamos contenido visual con liviandad. Decisión: parar producción de contenidos hasta tener research visual serio + decisión de arquetipo + mini design system + replanteos de avatar y referidos.
- **`RESEARCH_VISUAL.md` v1 commiteado** — Fase A primera vuelta. Análisis de identidad visual de los 19 competidores + 4 benchmarks externos (Linear, Notion, Apple, Mercado Pago, Nubank Pentagram brandbook). 4 arquetipos visuales detectados, mercados saturados identificados, espacios libres documentados. Decisión preliminar: AUREX en intersección Arquetipos 2+4 (Institutional con polish + Brand-led con sistema propio).

### Hecho — Mascot AUREX definido: v2 Geometric premium (30-abr-2026)
- **Decisión final de Fernando: el mascot oficial de AUREX es v2 (Geometric premium)** — búho dorado facetado de cuerpo completo sobre fondo gris claro / navy. Razones: alineación literal con el nombre AUREX (oro en latín), estética geométrica premium consistente con identidad institucional + brand-led, diferenciación frente a competidores (ninguno usa mascot animal con tratamiento facetado dorado).
- **Logo AUREX no se reemplaza** — convive con el mascot (modelo Mailchimp/Twitch): logo en stores/legal/headers oficiales, mascot en redes sociales, contenido educativo, onboarding, ilustraciones de producto.
- **Pipeline reproducible commiteado en `aurex-app/scripts/mascot_processing/`** — sources PNG (v0/v1/v2), scripts Python (`process_v0.py`, `process_v1_v2.py`, `generate_all_sizes.py`), README. Regenera bit-exact con `python3 process_v0.py && python3 process_v1_v2.py && python3 generate_all_sizes.py`.
- **152 PNGs por versión generados en `~/Downloads/AUREX_ICONS/`** — iOS (13 tamaños), Android (7), PWA (8), Web/Favicon (5), Marketing (5 canvas con padding). Listos para subir a App Store Connect / Google Play Console / manifest PWA / sitio aurex.live cuando Apple Build 17 + Google Play Build 2 estén aprobados (NO tocar antes — regla inviolable 2).
- **Documento de identidad del mascot v1.1** generado: `AUREX_MASCOT_BUHO_identidad_y_uso.md` + PDF, con razonamiento del búho, comparación con águila/halcón, separación logo/mascot, 20 aplicaciones específicas, casos de referencia (Mailchimp, Duolingo, Twitch, RockFlow). Subido a Drive en sub-carpeta MASCOT FINAL.

### Hecho — Plan MKT v2.1 sección 2.4 reescrita: búho v2 animado reemplaza avatar HeyGen (30-abr-2026)
- **Decisión final del presentador de los videos:** búho v2 animado en lugar del avatar humano de HeyGen Pro. Validado por Fernando + Escritorio + Code el 30-abr.
- **Por qué:** coherencia total con la marca (oro = AUREX = búho); diferenciación máxima vs los 19 competidores (ninguno usa mascot animal en video); cero costo recurrente nuevo (regla inviolable reiterada hoy: nada de costos variables mensuales adicionales).
- **Ruta A para videos diarios** (TikTok / IG Reels / YouTube Shorts 2x semana): PNG estático del búho sobre fondo navy + efectos de cámara + voz IA tier free de ElevenLabs + cortes cada 3-4s. Costo: $0/mes.
- **Ruta B para videos premium 1-2 por semana** (lanzamientos, hitos, intros YouTube canal completo): animación IA imagen-a-video con Runway/Pika tier free, 3-5 segundos del búho moviéndose, mezclados con el resto del video Ruta A. Costo: $0/mes en tier free.
- **Specs de identidad fijas** (sección 2.4 del PLAN_MKT.md): voz femenina cálida en español/inglés/portugués/francés/italiano + masculina en árabe/hindi; acento español neutro latinoamericano; ritmo rápido; tono directo y confiante; fondo base navy #0A1628 fijo; colores por tipo de señal (oro Alta Convicción, verde confirmación, rojo alerta); tres encuadres fijos (plano completo, close-up ojos, split screen búho+gráfico).
- **Benchmarks externos validados por Escritorio:** Duolingo en TikTok (mascot búho con animación mínima funciona por contexto + copy + edición), Mailchimp con Freddie (mascot como sello de identidad sin ser presentador), Headspace (figura visual simple consistente con presupuesto bajo).
- **Ahorro:** -$288/año vs v2.1 inicial con HeyGen anual; -$1.188/año vs v2.0 con HeyGen mensual.
- **Secciones del Plan MKT actualizadas en un solo commit:** 2.4 (reescrita completa), 2.2 (tabla reparto), 2.3.6 (Canal 6 TikTok/Reels), 2.3.7 (Canal 7 YouTube), 2.9 (presupuesto), 3.1 punto 4, 3.2 punto 3, 3.3 bloqueadores, changelog y footer.
- **Pendiente Fase F:** validación del primer video de prueba con Fernando (única acción manual restante para destrabar producción autónoma de videos).

### Falta
- **Captura manual por Fernando** para completar Fase A — feeds IG/TikTok de Lemon/RockFlow/Bitso/Robinhood/Nubank + emails onboarding de 3-4 competidores + capturas in-app de Cocos. Lista priorizada en `RESEARCH_VISUAL.md` sección "Captura manual pendiente".
- **Fase B: decisión final de arquetipo + mini design system AUREX** — debate Code+Escritorio sobre arquetipo definitivo (preliminar: Inst+Brand-led hybrid con mascot ilustrado). Tiempo estimado: 3-5 días.
- **Replanteo serio puntos 2 (avatar) y 4 (referidos)** del Plan MKT v2.1 con la profundidad que merecen.
- **Reformulación de los 11 contenidos modelo** una vez identidad de marca consolidada.
- **Producción técnica + primer ejemplo real de cada formato** (Fase F).
- **Ejecución Mes 1** post-aprobación Apple/Google.
- **Síntesis final → `PLAN_MKT.md` v2.** Documento que integra todo. Incluye posicionamiento, mensajes para stores, copy del onboarding, primeros canales de adquisición, contenido para los primeros 30 días.
- **Plan táctico de lanzamiento.** Una vez definido posicionamiento: acciones concretas que ejecutan Code y Escritorio. Fernando solo aprueba (regla dura: nada que él tenga que grabar, escribir ni publicar manualmente).

### Insights transversales ya confirmados (no esperan las pasadas faltantes)
- Precio PRO $9.99/mes validado por 3 competidores (Magnifi, Atom Finance, Public.com).
- Segunda palanca de monetización (datos agregados para terceros) es necesaria para sostenibilidad — Atom Finance lo demuestra a la inversa.
- El mercado hispanohablante está subatendido — ninguno de los 7 lo ataca seriamente.
- YouTube es el canal de mayor tráfico social para herramientas de inversión (Stocktwits lo confirma).
- Programa de referidos con incentivo real debe diseñarse antes del lanzamiento, no después.
- Las señales IA son el activo diferencial — cuando se conecte Claude API real, la tasa de acierto debe medirse desde el primer día.

### Endpoint POST /api/research/analysis
Existe en `aurex-backend/server.js`. Permite que Escritorio escriba análisis estratégico directo al repo aurex-app vía API (con PAT fine-grained con permisos solo a aurex-app). Fernando NO copia/pega manualmente: cuando Escritorio cierra un análisis, hace POST y aparece committeado en GitHub solo.

---

## ARCHIVOS DE DOCUMENTACION
- AUREX-PORTFOLIO-DOC.md: documentacion tecnica completa del tab Portfolio
- AUREX-MERCADOS-DOC.md: documentacion tecnica completa del tab Mercados
- AUREX-IA-DOC.md: documentacion tecnica del tab IA
- AI_SIGNALS_DESIGN.md: diseño de señales IA
- BUGFIX_HISTORIAL.md: historial de bugs y soluciones
- REGLAS-DE-ORO-AUREX.md: reglas tecnicas para Claude
- PLAN-ACCION.md: cronograma del proyecto
- METADATA-APPSTORE.md: metadata App Store
- docs/CONTEXTO_CHAT.md: contexto inicial chat
- docs/PENDING_REVIEW.md: review pendiente
- docs/PLAN-OPERATIVO.md: plan operativo extendido
- docs/PERFIL_TAB_DOCUMENTACION.md: documentación del tab Perfil

---

## ESTADO DE CADA FEATURE

REAL (funcionando):
- App en produccion GitHub Pages (aurex.live)
- PWA instalable iPhone
- 6 tabs navegables
- Precios crypto tiempo real (Binance REST cada 5seg)
- Conversor crypto (Binance)
- Conversor fiat ARS/EUR/BRL (ExchangeRate API cada 30min)
- Portfolio persistente en Supabase (autenticado)
- Aurex Pulse / Fear & Greed (VIX, S&P, BTC, Oro, Petroleo)
- Termometro de Riesgo con senales IA
- Filtros temporales por activo en Mercados
- Fix iOS touch en dropdown Portfolio y Ver Variables
- 17 fallbacks de resilencia PWA (crypto/stocks/IA/portfolio/watchlist)

MOCK (pendiente):
- Alertas WhatsApp: simuladas -> proxima prioridad (depende de Evolution API)
- Senales IA: hardcodeadas -> conectar a Claude API
- Acciones USA: precios via Yahoo proxy (funciona) / Polygon.io pendiente
- Push notifications: boton funcional, logica pendiente

---

## DATOS TECNICOS

PWA (aurex-app):
- Frontend: HTML+CSS+JS Vanilla monolito (~3000 líneas index.html + ~3900 líneas aurex-features.js)
- Hosting: GitHub Pages auto-deploy desde main → aurex.live
- Sin pipeline de build, sin package.json, sin service worker activo

Nativa (AurexApp):
- React Native 0.84 puro (NO usa WebView, NO carga la PWA)
- iOS: MARKETING_VERSION=1.0, CURRENT_PROJECT_VERSION=17
- Android: versionName="1.0.1", versionCode=2
- RevenueCat para in-app purchases (iOS + Android)

Backend (aurex-backend):
- Railway (https://aurex-app-production.up.railway.app)
- Lo consumen tanto la PWA como la Nativa

Datos:
- Crypto: Binance REST API (sin key, publica)
- Acciones/ETFs: Yahoo Finance via corsproxy.io
- Fiat: open.er-api.com (gratis, sin key)
- IA: modelo interno _calcIAScore + _iaSeed (datos hardcodeados)
- DB: Supabase (URL: dklljnfhlzmfsfmxrpie.supabase.co)
- Auth: Google OAuth via Supabase

Pagos:
- PWA: Lemon Squeezy (PRO $9.99/mes, ELITE $19.99/mes)
- iOS: Apple In-App Purchase (StoreKit) via RevenueCat
- Android: Google Play Billing via RevenueCat

---

## LINKS
- App: https://fmoscon-creator.github.io/aurex-app  (alias aurex.live)
- Repo PWA: https://github.com/fmoscon-creator/aurex-app
- Repo Nativa: https://github.com/fmoscon-creator/AurexApp
- Repo Backend: https://github.com/fmoscon-creator/aurex-backend
- Lemon Squeezy store: aurexapp.lemonsqueezy.com
- Portfolio Doc: https://github.com/fmoscon-creator/aurex-app/blob/main/AUREX-PORTFOLIO-DOC.md
- Mercados Doc: https://github.com/fmoscon-creator/aurex-app/blob/main/AUREX-MERCADOS-DOC.md
- IA Doc: https://github.com/fmoscon-creator/aurex-app/blob/main/AUREX-IA-DOC.md
- Plan accion: https://github.com/fmoscon-creator/aurex-app/blob/main/PLAN-ACCION.md
- Fundador: Fernando G. Moscon fmoscon@gmail.com

---

## PLANES
- FREE: 5 activos, 3 senales/dia, sin alertas, con ads
- PRO: $9.99/mes, 50 activos, 10 senales, alertas push
- ELITE: $19.99/mes, ilimitado, 8 idiomas, soporte VIP

---

## NOTA PARA CLAUDE
- El token GitHub se pasa en el chat al inicio de cada sesion
- SIEMPRE responder en espanol
- SIEMPRE leer blobs desde Git API, nunca desde Pages
- SIEMPRE verificar OLD aparece exactamente 1 vez antes de reemplazar
- SIEMPRE usar split().join() en lugar de replace()
- Todo HTML/JS nuevo 100% ASCII (tildes como entidades, emojis como entidades, ej: &#127775;)
- btoa(unescape(encodeURIComponent(content))) para base64
- Screenshot obligatorio antes de reportar OK
- Guardar SHA de reversion antes de cada cambio
- Mientras hay builds en revisión por Apple/Google: NO tocar la app nativa
  sin autorización expresa y análisis previo de impacto a las stores
- Sin jerga técnica innecesaria al comunicar con Fernando
- Análisis integral propio antes de pedir datos al usuario (3 repos en disco)
