---
name: Datos operativos AUREX
description: Zona horaria, números WhatsApp, identificadores Apple, env vars de Railway — datos NO sensibles que se usan a diario
type: reference
originSessionId: f9879308-2ffe-4c3d-ad7b-0a66d22643ac
---
**Zona horaria operativa:** Argentina (UTC-3). Fernando trabaja y vive en AR. Toda hora mencionada sin TZ explícita es AR. Si hay un cron en UTC, calcularlo: `08:00 AR = 11:00 UTC`, `20:00 AR = 23:00 UTC`.

**WhatsApp:**
- Línea emisora AUREX: +54 9 11 3360 2563 (eSIM Claro, iPhone Fernando, conectada vía Evolution API)
- Línea admin Fernando: +54 9 11 6789 1320 (su WhatsApp personal)
- Env var Railway: `ADMIN_WHATSAPP=5491167891320`
- Sistema: Evolution API v1.8.7 self-hosted en Railway, servicio `evo-v1`, instancia `aurex`
- URLs: backend `aurex-app-production.up.railway.app`, evolution `evo-v1-production.up.railway.app`

**Telegram (canal principal y permanente de alertas — decisión 28-abr-2026, consolidada 29-abr-2026):**
- Bot: @Aurexalertas_bot ("Aurex Alertas", id 8740136430)
- Token: env var `TELEGRAM_BOT_TOKEN` en Railway aurex-app
- Chat ID admin Fernando: `[VALOR-EN-RAILWAY]` (no se publica el valor real en repo publico por privacidad)
- Env var Railway: `ADMIN_TELEGRAM_CHAT_ID=[VALOR-EN-RAILWAY]` (en servicio aurex-app)
- Cero riesgo de baneo (Telegram permisivo con bots)
- WhatsApp Evolution queda como canal **secundario** una vez se reconecte; Telegram NO se remueve cuando WhatsApp vuelva a estar operativo.
- Reportes automáticos por Telegram (todos vivos desde commit 09c4c32 del 29-abr-2026):
  - `dailyHealthReport` 8:00 AR (cron `0 11 * * *`): manda por Telegram **y** por WhatsApp Evolution (redundancia). Si WhatsApp falla, Telegram cubre.
  - `dailyProjectStatusReport` 9:00 AR (cron `0 12 * * *`): solo Telegram. 4 mensajes consecutivos: cuerpo principal (stores + SHAs + incidentes + crypto) + link a CONTEXTO.md + link a INICIO_AUREX.md + RESEARCH_API_KEY si está seteada. Antes corría a las 20:00 AR; cambió a 9:00 para que Fernando arranque el día con info fresca.

**Apple:**
- Nombre publicado de la app: **AUREX AI** (no solo "AUREX")
- Team ID: TX7C2F79U9
- Apple Account: fmoscon@gmail.com
- Apple App ID: 6761672161
- Bundle ID (ID de pack): com.fernandomoscon.aurex
- Contacto registrado en App Store Connect: +54 11 6789-1320 / fmoscon@gmail.com
- Build actual en revisión: 17 (Marketing Version 1.0)
- Submit Build 17: 24-abr-2026 5:24 AM (ID envío e0e7fb35-11a4-4c1d-854c-60a80c4799e6)
- Categoría primaria: Utilidades (cambiada desde Finanzas tras rechazos previos)
- Categoría secundaria: Productividad
- Idiomas localización (8): EN, ES, FR, IT, HI, AR, PT, ZH
- Idioma principal del listing: Inglés (EE. UU.)
- Subtítulo App Store: "Real-time market data tracker" (intencional: alinea con categoría Utilidades, sin lenguaje financiero)
- Metadata: segura, sin lenguaje financiero
- Disclaimers: corregidos en código de Build 17
- Razón nombre "AUREX AI" vs "AUREX": "AUREX" estaba ocupado por otra app en App Store. "AUREX AI" no conflictúa con marcas y respeta Guideline 2.3.7. El binario sigue mostrando "AUREX" bajo el ícono (CFBundleDisplayName).

**App Store Server Notifications (in-app purchases iOS):**
- Webhook delegado a RevenueCat (gestiona los IAP de iOS por nosotros)
- URL producción y sandbox: idénticas (`https://api.revenuecat.com/v1/incoming-webhooks/apple-server-to-server-notification/WICtYZubpcHyBpPfLnZMoagjatQAyjPD`)
- Esto es práctica OFICIAL de RevenueCat — distingue entornos por payload, no por URL
- Apple Server Notifications V2 (versión actual)
- Verificación de funcionamiento: dashboard de RevenueCat → sección Webhooks (log en vivo)

**Repos en disco:**
- PWA: `/Users/fernandomoscon/Desktop/aurex-app` (branch `main`)
- Nativa: `/Users/fernandomoscon/AurexApp` (branch operativo `dev`, NO main hasta aprobación Apple)
- Backend: `/Users/fernandomoscon/Desktop/aurex-backend` (branch `main`)

**Reglas Railway:**
- Deploy backend SOLO vía push a GitHub main. NUNCA `railway up` (incidente 17-abr 2026).
- NUNCA eliminar `nixpacks.toml` (vuelve a usar Caddy en vez de Node).
- Verificar STATUS: SUCCESS con `railway deployment list --json` después de push.

**Crons activos en server.js (aurex-backend):**
- checkAlertas: cada 30 seg
- refreshCryptoCache: cada 2 min
- calcularPulse + calcularSenalesIA: cada 5 min
- healthCheck: cada 5 min
- dailyHealthReport: `0 11 * * *` = 8:00 AR (manda por WhatsApp Evolution + Telegram desde commit 09c4c32, 29-abr-2026)
- dailyProjectStatusReport: `0 12 * * *` = 9:00 AR (cambio de horario aplicado el 29-abr-2026 commit 09c4c32; antes era `0 23 * * *` = 20:00 AR)
- monthlyHealthReport: `0 21 28-31 * *` = 18:00 AR último día hábil

**Funciones útiles en server.js:**
- `notifyAdmin(subject, body)` — manda al admin con fallback imagen→texto→Twilio
- `sendWhatsAppEvolution(phone, text)` — envío directo
- `sendWhatsAppImage(phone, buffer, caption)` — envío con imagen
- `getNextAlertId(type)` — IDs consecutivos por tipo (BN-001, WA-002, etc)
- `restoreHealthState()` — al arrancar Railway, restaura `_health` desde Supabase

**Endpoints útiles para testear:**
- `GET /api/health/status` — estado completo
- `POST /api/health/test-report` — fuerza reporte diario (8:00 AR)
- `POST /api/health/test-monthly` — fuerza reporte mensual
- `POST /api/test-admin-alert` — alerta admin de prueba
- `GET /api/whatsapp/status` — estado conexión Evolution (read-only, público)
- `GET /api/whatsapp/connect-qr` — generar QR de vinculación de Evolution. Endpoint nuevo desde commits ec578af + bfd0ecb (29-abr-2026). Protegido por env var `WHATSAPP_CONNECT_SECRET` (header `X-Secret` o query `?secret=...`); sin secret válido → 403, sin env var → 503. Soporta query `?number=<numero>` para pairing code, pero Evolution v1.8.7 ignora ese parámetro y devuelve QR igual; el pairing code requiere migrar a Evolution v2 (pendiente estructural).

**Incidentes activos (al 29-abr-2026):**
- **BN-002 ACTIVE** desde 18-abr-2026. Binance bloqueado en Railway región us-east4. MITIGATED via CryptoCompare. Pendiente decidir alternativa post-aprobación Apple.
- **WA-001 ACTIVE** desde 28-abr-2026 15:25 UTC. Sesión WhatsApp del 2563 sin vincular a Evolution. El intento del 29-abr ~03:00 AR falló por cooldown antifraude WhatsApp post-suspensión (la pantalla del iPhone mostró "Iniciando sesión..." pero los servers de WhatsApp no completaron la vinculación; estado en Evolution `connecting` → `close`). **Reconexión postergada al 30-abr-2026 9:00 AM AR como fecha mínima** (decisión Fernando 29-abr ~09:05 AR; no reintentar antes). La instancia "aurex" SÍ existe en Evolution (verificado en investigación del 29-abr; todas las respuestas de `/api/whatsapp/status` devuelven `instanceName: "aurex"` con `state` válido). El problema es del lado de servers WhatsApp, no del código del backend.
