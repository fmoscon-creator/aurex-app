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
  - Reporte diario salud: 8:00 AR (cron `0 11 * * *`).
  - Reporte diario de proyecto (`dailyProjectStatusReport`): 20:00 AR (cron `0 23 * * *`). Manda 4 mensajes consecutivos: (1) cuerpo principal con stores Apple/Google + SHAs de los 3 repos + incidentes activos + crypto source; (2) link a `CONTEXTO.md`; (3) link a `INICIO_AUREX.md`; (4) `RESEARCH_API_KEY` si está seteada.
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
5. **Reconectar sesión WhatsApp del 2563 a Evolution (QR mañana)**
   El 2563 ya está verificado (código por llamada el 28-abr-2026 noche, email + passkey activados como respaldo). El intento de vinculación del 29-abr ~03:00 AR no completó (ver WA-001 en incidentes). Procedimiento para retomar mañana cuando el cooldown se haya levantado: Code llama a `GET /api/whatsapp/connect-qr` con el secret guardado en `~/secret.txt` (la env var `WHATSAPP_CONNECT_SECRET` ya está cargada en Railway aurex-app), genera el PNG en `~/Downloads`, abre con Preview, Fernando escanea desde WhatsApp Business → Ajustes → Dispositivos vinculados. Si el QR vuelve a fallar, antes de seguir verificar que la instancia "aurex" exista en Evolution. Una vez conectada, activar las alertas Railway por WhatsApp para que corran en paralelo con Telegram (que queda como canal principal). El ticket WhatsApp soporte #1807446727774286 abierto el 28-abr probablemente ya no haga falta (la verificación se resolvió sola); conviene que Escritorio chequee Gmail por si llegó respuesta.

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

### Hecho — Pasadas 1 y 2 (7 competidores cerrados)
Cada competidor tiene los 10 puntos estándar (posicionamiento, audiencia, monetización, canales, contenido, tono, lanzamiento, crecimiento, reseñas, fuentes) más análisis estratégico de Escritorio cruzado con AUREX. Todo en `RESEARCH_MKT.md`.

1. **Magnifi** — AI investing assistant (TIFIN, respaldado por J.P. Morgan). Freemium $8.25-14/mes. Creció por backing institucional y podcast con Nicole Lapin. Sin presencia orgánica en redes. Lección: AUREX puede hacer lo que Magnifi no hace — mostrar el producto en acción en redes.
2. **Composer** — Trading algorítmico sin código. $32/mes. Creció por flywheel comunitario (80% del valor lo genera la comunidad con estrategias compartidas). Lección: las señales de AUREX son contenido compartible si se presentan bien visualmente.
3. **Public.com** — Broker con IA encima. Premium ~$10/mes. El AI research assistant convirtió casi la mitad de las conversaciones en transacción dentro de las 24 hs. Lección: señal IA clara en el momento correcto genera acción inmediata; medirlo desde el día uno.
4. **Stocktwits** — Red social de traders. 35-50% del revenue viene de Data Licensing (Social Sentiment API a Bloomberg, hedge funds). Lección crítica: AUREX necesita segunda palanca de monetización (datos/señales agregados para terceros) diseñada desde el inicio. YouTube es su primera fuente de tráfico social.
5. **Atom Finance** — Caso más importante del research: murió haciendo exactamente lo que AUREX planea (research B2C con freemium $9.99/mes). Llegó a 100k usuarios y $10.6M de funding y cerró igual. Lección existencial: con solo suscripciones freemium el unit economics no cierra; la conversión FREE → Premium en research financiero es históricamente baja.
6. **TradingView** — Benchmark de producto. $3B de valuación, $172M de revenue. Creció por superioridad técnica (HTML5 cuando todos eran Flash) y network effect de comunidad. Lección: el producto tiene que generar word-of-mouth orgánico; las señales IA tienen que acertar en los primeros 7 días para retener.
7. **Robinhood** — Caso de lanzamiento más relevante. Pre-launch waitlist con "free stock" referrals generó 1M+ usuarios antes del lanzamiento. Lección: programa de referidos con incentivo real (acceso PRO gratis, no solo descuento) es el mecanismo de adquisición más efectivo en fintech retail. El mercado hispanohablante es el equivalente al mercado retail pre-Robinhood: subatendido, con disposición a pagar.

### Falta
- **Pasada 3 — Apps recientes 2024-2025 con IA / análisis automatizado.** Pendiente OK explícito de Fernando. Objetivo: detectar competidores en early stage que ganan tracción rápido y no están en los 7 históricos.
- **Pasada 4 — A definir con Fernando.** Posible foco: apps no-USA (Europa, LATAM, Asia) para entender enfoques regionales. Decisión depende de qué arroje la Pasada 3.
- **Análisis estratégico global.** Sección reservada en `RESEARCH_MKT.md` pero vacía. Escritorio la escribe cuando estén todas las pasadas. Cruza hallazgos y propone posicionamiento concreto: qué nicho atacar, qué precio, qué features priorizar, qué evitar.
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
