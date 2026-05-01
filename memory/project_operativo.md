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
- Chat ID admin Fernando: `1749518554`
- Env var Railway: `ADMIN_TELEGRAM_CHAT_ID=1749518554` (en servicio aurex-app)
- Cero riesgo de baneo (Telegram permisivo con bots)
- WhatsApp Evolution queda como canal **secundario** una vez se reconecte; Telegram NO se remueve cuando WhatsApp vuelva a estar operativo.
- Reportes automáticos por Telegram (todos vivos desde commit 09c4c32 del 29-abr-2026):
  - `dailyHealthReport` 8:00 AR (cron `0 11 * * *`): manda por Telegram **y** por WhatsApp Evolution (redundancia). Si WhatsApp falla, Telegram cubre.
  - `dailyProjectStatusReport` 9:00 AR (cron `0 12 * * *`): **Telegram + WhatsApp Evolution en paralelo (espejo, 4 mensajes en cada canal — verificado 1-may-2026 en server.js:1750-1756)**. Mensajes: cuerpo principal (stores + SHAs + incidentes + crypto) + link a CONTEXTO.md + link a INICIO_AUREX.md + RESEARCH_API_KEY si está seteada. Antes corría a las 20:00 AR; cambió a 9:00 para que Fernando arranque el día con info fresca. Corrección 1-may-2026: la nota anterior decía "solo Telegram" — error de memoria, el código siempre tuvo el espejo WA.

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

**Cobertura de la app (verificado el 29-abr-2026 contando `aurex-features.js` y `aurex-backend/activos.json`):**
- **350 activos** en `activos.json` y visualizables en el tab Mercados con precios en tiempo real.
- Tipos: cripto (50) + stablecoins (3) + acciones de 6 mercados (USA 94 + Argentina 26 + Brasil/LATAM 24 + Europa 25 + Japón 20 + China/HK 20) + ETFs (40) + materias primas (20) + metales (10) + futuros (20) + bonos (15, incluye AL30/GD30/AL35 ARG) + divisas (5, incluye USDARS).
- **74 activos** con señales IA propias del motor AUREX IA (según `AUREX-IA-DOC.md` sección 8 y `METADATA-APPSTORE.md`). Es el subconjunto seleccionado de los 350 sobre el que opera el motor IA propio.
- Discrepancia detectada: CLAUDE.md, INICIO_AUREX.md, RESEARCH_MKT.md y otros docs decían "313 activos" — dato obsoleto/incorrecto, corregido en commit del 29-abr-2026 a 350 (Mercados) / 74 (señales IA).
- METADATA-APPSTORE.md y la metadata cargada en App Store Connect / Google Play Console usan "74 activos" en la descripción pública. Eso NO se toca mientras Build 17 (Apple) y Build 2 (Google) están en revisión — riesgo de "Metadata Rejected". Se reformula en v1.1 post-aprobación.

**Drive `AUREX_MEDIA_LIBRARY` — hub compartido Code + Escritorio (reordenado 1-may-2026 mediodía):**

Token OAuth persistente: `~/.aurex/drive_token.json` (antes vivía en `/tmp/` y se perdía con reboots de macOS; corregido en commit con bug fix de `drive_automation.py`). OAuth Client ID JSON: `~/Desktop/aurex-oauth.json`.

Folder IDs:
- Raíz `AUREX_MEDIA_LIBRARY`: `1FZ_LRmNEwoeZdcayDBNi2Ve52vtvpCxI`
- `01_videos/`: `1bvlLRLYbrBBACFGrFny1ssTFCTlSTD1m`
- `01_videos/finales/`: `1Ej68LA0kSoJurvXlRY7FLZ3bUZsttCgw`
- `01_videos/buho_animaciones/`: `1F2GSSSn7BfX-46kSKIZGzf3bVR08Rs_Q` (5 videos al 1-may)
- `02_audios/`: `1eFcdxpoQ0IAnDMzgtE46jNHx5ztSnGay`
- `02_audios/elevenlabs/`: `1CVn9RthfrOI83PlPLlseamA25hYlmb77`
- `03_assets_brutos/`: `1gJxrY3sJHW8fMGsOsYRGcp-nM8GxTi8R` (incluye PNG limpios búho v2)
- `04_briefs/`: `1thKiCU2nXoUBj1isWY1e6h6uJPAuue2s` (Google Docs, NO binarios — descargar con `export` mimeType `text/plain`)
- `05_feedback/`: `10OJ3DxrtO_FVtqotwFTmuv0JnwnXbm1F`

Reglas:
- Code escribe briefs para Escritorio en `04_briefs/`.
- Escritorio sube animaciones generadas en Kling/Runway/Luma a `01_videos/buho_animaciones/`.
- Code consume animaciones desde ahí y compone videos finales en `01_videos/finales/`.
- Convención antifraude: NO duplicar archivos. Si una versión nueva reemplaza a una vieja, mover la vieja a una subcarpeta `descartados/` (todavía no creada al 1-may; crear bajo demanda).

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

**Incidentes activos (al 1-may-2026):**
- **BN-002 ACTIVE** desde 18-abr-2026. Binance bloqueado en Railway región us-east4. MITIGATED via CryptoCompare. Pendiente decidir alternativa post-aprobación Apple.
- **WA-001 RESUELTO 1-may-2026 ~8:00 AR.** El cooldown antifraude general sobre saliente del 2563 se levantó tras 7 días offline (28-abr 15:25 UTC → 1-may ~11:00 UTC). Verificación: el cron `dailyHealthReport` 8:00 AR llegó al WhatsApp admin 1320 desde el bot AUREX 2563 (envío externo confirmado, no solo autoenvío). Canal WA recuperado como redundancia de Telegram. Reportes 8:00 + 9:00 AR ambos funcionando dual-canal.
