# BRIEF AUREX — Estado del Proyecto (versión más reciente)

> **Para Escritorio (Claude Desktop con Chrome integration):**
> Este archivo está siempre disponible en URL fija pública. Code lo actualiza con cada hito mayor.
> **Última actualización: 14 de mayo de 2026, 04:00 AR**
>
> Versión histórica anterior: `briefs/archive/BRIEF_AUREX_2026-05-09.md`

## ⚠️ INCIDENTE 14-may PayPal Webhook — leer ANTES de configurar cualquier ID externo

El 13-may PM Escritorio dijo "PAYPAL_WEBHOOK_ID = 5F3394217M487802M ✅ configurado" pero ese webhook NO existía en la cuenta PayPal Live de las credenciales (API devolvió `INVALID_RESOURCE_ID`, listado de webhooks vacío). Causa probable: Escritorio configuró en otra app PayPal o en Sandbox. Fernando hizo pago test USD 9,99, webhook nunca se disparó, Supabase quedó en FREE. Code creó el webhook correcto via `POST /v1/notifications/webhooks` con credenciales ya cargadas en Railway. **Webhook ID válido al 14-may**: `6ED54169YF496764B`.

**Regla nueva (memoria `feedback_validar_ids_externos.md`)**: Code DEBE validar IDs externos (webhook, app, subscription, plan) contra la API del servicio ANTES de declararlos OK. Si Escritorio entrega un ID, Code hace GET a la API antes de cargar en infra. Si la API devuelve error, NO cargar y crear el recurso via API directo.

---

## 0. CONTEXTO INMEDIATO — al 13-may-2026 PM AR

### Hitos críticos posteriores al brief del 9-may

**10 al 12-may** — Android Build 17 publicado en producción Google Play:
- Aprobación llegó después de revisión; track Producción 1.0.17 activo
- Primeras 10 instalaciones en las primeras 34 hs, 47,6% retención día 1

**11-may** — Apple staff respondió en Developer Forum:
- Thread: https://developer.apple.com/forums/thread/826030?answerId=887477022
- Mensaje: "Thank you for your post. We're investigating and will contact you in App Store Connect to provide further assistance."
- Primera respuesta REAL de staff Apple en 18 días vs solo boilerplate previos
- ASC Resolution Center al 13-may PM AR: VACÍO (validado por Escritorio mañana hoy)

**11-12 may** — Sprint backend cripto/stocks cerrado (9 commits a main):
- HEAD `e69392d`
- Migración Binance.US (Binance.com bloqueado región Railway us-east4 - incidente BN-002)
- Cascada fallback en cadena: Binance.US 49 + OKX 2 + Kraken 1 + CG 1 = 53/53 cripto (100% cobertura)
- Stocks: Yahoo Finance singular 297/297 cobertura
- TwelveData cron revertido (commit b9dabca) por rate limit 8 credits/min plan free → reemplazado por priceCache stocks TTL 60s → 5 min (commit e69392d)
- CryptoCompare bloqueada hasta 1-jun por rate limit mensual 17.669/11k

**12-13 may** — Apertura de redes sociales AUREX:
- 5 redes abiertas + X desbloqueada 13-may PM AR
- Caso Twitter Support XAGEA-751927 RESUELTO en 1 día (más rápido que estimado 3-7)
- Carpeta de marketing creada: `~/Dropbox/AUREX/MARKETING/`

**13-may PM AR** — Trabajo de skills + plan MKT iniciado:
- 7 plugins Code instalados (frontend-design, telegram, firebase, playwright, skill-creator) + bundle marketing-skills (42 skills)
- MARKETING_CONTEXT_AUREX_v2.md generado (base obligatoria para todas las marketing-skills)
- Auditoría ASO v2 (Auditoria_ASO_AUREX_13may2026_v2.docx)
- Plan Social Media Fase 1 generado pero CON observaciones de Fernando (rehacer)
- Auditoría PWA realizada (ver sección 11)

---

## 1. IDENTIDAD DEL PROYECTO

| Dato | Valor |
|------|-------|
| Producto | AUREX — terminal de mercados globales (no broker, no asesoramiento) |
| Posicionamiento | Terminal de seguimiento que cruza datos técnicos + macro + geopolítica + sentimiento en tiempo real sobre 350+ activos seleccionados en 8 idiomas |
| Founder | Fernando G. Moscon (Argentina UTC-3) |
| Idioma de trabajo | Español (Argentina), comunicación con Fernando siempre en español |
| Web pública (PWA, producto) | https://aurex.live |
| Planes | FREE / PRO ($9.99/mes) / ELITE ($19.99/mes) |
| Pagos PWA | Lemon Squeezy |
| Pagos iOS | Apple In-App Purchase via RevenueCat |
| Pagos Android | Google Play Billing via RevenueCat |

---

## 2. ROLES CODE vs ESCRITORIO

- **Code** = Claude Code en terminal de la Mac de Fernando. Tiene acceso filesystem completo, los 3 repos clonados, simulator iOS, Xcode, Android SDK. **Skills cargadas al 13-may**: frontend-design, telegram, firebase, playwright, skill-creator + bundle marketing-skills (42 skills).
- **Escritorio (vos)** = Claude Desktop con Chrome integration. Validás cambios visualmente, abrís dashboards web, das opiniones cruzadas a Code.
- **Fernando** valida producto y UX. NO valida lo técnico. Code y Escritorio coordinan antes de presentar a Fernando.

---

## 3. URLS QUE NECESITÁS ABRIR EN CHROME

### App stores
- **Google Play Console**: https://play.google.com/console
- **App Store Connect**: https://appstoreconnect.apple.com

### Backend / Cloud
- **Railway dashboard**: https://railway.app
- **Supabase Dashboard**: https://supabase.com/dashboard/project/dklljnfhlzmfsfmxrpie

### GitHub repos
- **aurex-app (PWA, público)**: https://github.com/fmoscon-creator/aurex-app
- **AurexApp (Nativa, PRIVADO)**: https://github.com/fmoscon-creator/AurexApp ← Fernando comparte contenido si necesitás
- **aurex-backend (público)**: https://github.com/fmoscon-creator/aurex-backend

### Forum + casos Apple
- **Thread Apple Developer Forum (Build 17)**: https://developer.apple.com/forums/thread/826030
- **Case ID Expedited Review**: 20000111960192

### Redes sociales AUREX (6 operativas al 13-may PM AR)
- **Telegram canal**: https://t.me/aurex_ai
- **Instagram**: https://instagram.com/aurex_live
- **LinkedIn Company Page**: https://linkedin.com/company/aurex-fintech
- **YouTube**: https://youtube.com/@aurex-fintech
- **TikTok**: https://tiktok.com/@aurex_live (Business Verification enviada 13-may, espera 3-5 días)
- **X / Twitter**: https://x.com/aurex_live (DESBLOQUEADA 13-may PM, Cuenta Profesional Empresa)

### Otros
- **RevenueCat dashboard**: https://app.revenuecat.com
- **Lemon Squeezy store**: https://aurexapp.lemonsqueezy.com
- **Firebase Console**: https://console.firebase.google.com/project/aurex-app-8d985

---

## 4. STATUS APPS — AL 13-MAY-2026

### iOS (App Store)
| Campo | Valor |
|-------|-------|
| Nombre publicado | AUREX AI |
| Bundle ID | `com.fernandomoscon.aurex` |
| Apple Team ID | `TX7C2F79U9` |
| App ID interno ASC | `6761672161` |
| Categoría primaria | Utilidades |
| Idiomas localizados | EN, ES, FR, IT, HI, AR, PT, ZH (8) |
| Subtítulo | "Real-time market data tracker" |
| **Build actual TestFlight** | **24** (subido 8-may, validado en device) |
| **Build en App Store Review** | **17** (submit 24-abr-2026, día 19 en queue al 13-may, sin novedades, Forum staff respondió 11-may) |
| Próximo step | Esperar respuesta Apple. Build 25 iOS bug tilde verde teléfono listo cuando aprueben |

### Android (Google Play)
| Campo | Valor |
|-------|-------|
| Nombre publicado | AUREX |
| Bundle ID | `com.aurexapp` |
| Categoría primaria | Herramientas (NO TOCAR a Finanzas hasta plan ASO post-Apple) |
| Idioma listing | Inglés (en-US) |
| **Build actual EN PRODUCCIÓN** | **17** (versionCode 17 / 1.0.17, PUBLICADO ~6-may post aprobación Google Play) |
| Track activo | **Producción** (NO closed testing como antes) |
| Métricas baseline (al 12-may) | 10 instalaciones primeras 34 hs, 47.6% retención día 1 |
| Capturas | 4 categorías completas |
| RevenueCat status | Valid (resuelto 6-may-2026) |

### PWA / Web aurex.live
| Campo | Valor |
|-------|-------|
| URL | https://aurex.live |
| Arquitectura | HTML5 + JavaScript vanilla (NO React Native Web, NOT bundle compartido con Android) |
| Deploy | GitHub Pages automático desde branch `main` del repo aurex-app |
| Última actualización significativa | 26-abr-2026 |
| Parity feature con Android Build 17 | **~70%** |
| Features OK | AUREX Pulse, Portfolio, Watchlist 5 períodos, 15 alertas UI, ticker eventos, 8 idiomas |
| **Features FALTANTES vs Android Build 17** | Push Notifications FCM, integración Telegram real, pantalla "Cómo usar AUREX" (6 tabs) |
| Tiempo estimado para actualizarla a parity | 3 a 4 hs Code |
| Estado plan MKT | Pendiente actualizar PWA ANTES de promocionarla en redes |

---

## 5. LOS 3 REPOS

| Repo | URL | Visibilidad | Branch |
|------|-----|-------------|--------|
| aurex-app (PWA) | https://github.com/fmoscon-creator/aurex-app | 🌐 PÚBLICO | `main` |
| AurexApp (Nativa) | https://github.com/fmoscon-creator/AurexApp | 🔒 PRIVADO | `dev` |
| aurex-backend | https://github.com/fmoscon-creator/aurex-backend | 🌐 PÚBLICO | `main` |

### Commits clave del sprint backend 11-12 may (HEAD aurex-backend `e69392d`)
- `e69392d` fix(stocks): subir TTL cache 60s → 5 min
- `b9dabca` revert: cron refreshStockCache Twelve Data (rate limit 8 credits/min)
- `d888507` feat(stocks): cron refreshStockCache via Twelve Data batch cada 30 min (revertido)
- `d63ae4e` fix(cascada): COINGECKO_IDS 29→57 + endpoint debug/sources binance.us
- `796b17c` fix(cripto): KRAKEN_MAP legacy XMR/ZEC/ETC/XLM
- `eb15866` feat: cascada fallback en cadena (hasPrimarySource + missing)
- `4c85701` feat: Binance.US primaria + Twelve Data fallback + check 404 devices
- `a8700cd` fix: agregar XMR a BINANCE_US_SKIP (lista de prueba ≠ lista IA_ACTIVOS real)

### Repo aurex-app (PWA)
- `dae5eb7` (12-may) docs(contexto): cierre sprint 12-may
- `e886d76` (9-may) docs(brief): cierre 8-may
- Próximo deploy: PWA actualización (push + Telegram + Cómo usar) — pendiente arranque

---

## 6. SUPABASE — DATOS OPERATIVOS

- **URL**: https://dklljnfhlzmfsfmxrpie.supabase.co
- **Anon key**: pública por diseño (hardcoded en repos)
- **Service key**: en disco local de Fernando, NO commiteable
- **Tabla principal**: `usuarios` (NO `users`)
- **Schema clave**: `id` (UUID), `email`, `nombre`, `plan`, `telegram_chat_id`, `whatsapp_numero`, `fcm_token`, `beta_access`
- **Registros al 13-may**: 6 usuarios (confirmado por Escritorio mañana)

---

## 7. RAILWAY — BACKEND AUREX

- **Backend URL**: https://aurex-app-production.up.railway.app
- **Evolution API URL**: https://evo-v1-production.up.railway.app
- **Servicios activos**: aurex-app + evo-v1 (ambos Online al 13-may)
- **Watch Paths**: cambios en `docs/` NO disparan redeploy
- **Reglas inviolables**: NUNCA `railway up`, NUNCA eliminar `nixpacks.toml`

### Crons activos (`server.js`)
- checkAlertas: cada 30 seg
- refreshCryptoCache: cada 2 min (Binance.US + OKX + Kraken + CG cascade)
- priceCache stocks: TTL 5 min (build-up natural Yahoo Finance singular)
- calcularPulse + calcularSenalesIA: cada 5 min
- dailyHealthReport: 8:00 AR (Telegram + WhatsApp)
- dailyProjectStatusReport: 9:00 AR (Telegram + WhatsApp)
- monthlyHealthReport: 18:00 AR último día hábil

### Endpoints útiles
- `GET /api/health/status` — estado completo
- `POST /api/test-admin-alert` — alerta admin de prueba
- `GET /api/whatsapp/status` — estado conexión Evolution
- `GET /api/whatsapp/connect-qr` — QR vinculación
- `GET /api/debug/sources` — diagnóstico cascadas cripto + stocks (post-sprint 11-12 may)

---

## 8. WHATSAPP / TELEGRAM

### WhatsApp
- Línea emisora AUREX: línea 1 (eSIM Claro, iPhone, Evolution API) — +54 9 11 3360 2563
- Línea admin Fernando: línea 2 (ENV `ADMIN_WHATSAPP`) — +54 9 11 6789 1320
- Línea Android disponible: línea 3 — +54 9 11 7675 2222 (Telegram canal usa esta línea)
- Sistema: Evolution API v1.8.7 self-hosted en Railway

### Telegram
- Bot: @Aurexalertas_bot (id `8740136430`)
- Token: env var `TELEGRAM_BOT_TOKEN` en Railway
- Chat ID admin Fernando: `1749518554`
- Canal público AUREX: **@aurex_ai** (abierto 12-may, 0 posts publicados al 13-may)

---

## 9. FIREBASE — PUSH FCM

- Project ID: `aurex-app-8d985`
- Project number: `137898209095`
- Storage bucket: `aurex-app-8d985.firebasestorage.app`
- Console: https://console.firebase.google.com/project/aurex-app-8d985

### Pipeline FCM
- Backend tiene `firebase-admin` integrado
- Test E2E push validado 5-may-2026
- Android Build 17 con push FCM funcional en producción
- **PWA pendiente** de agregar Firebase Web SDK + Service Worker + VAPID (próxima actualización)

---

## 10. INCIDENTES Y CASOS ACTIVOS

### Apple Build 17 — DÍA 19 EN QUEUE
- Submission ID `e0e7fb35-11a4-4c1d-854c-60a80c4799e6` enviado 24-abr-2026
- Case Expedited 20000111960192 abierto 7-may
- Forum staff respondió 11-may 15:04 AR: "investigating, will contact you in ASC"
- ASC Resolution Center vacío al 13-may PM (validado por Escritorio mañana)
- **Acción si NO hay novedad al 14-15 may**: reabrir thread foro citando answerId 887477022

### BN-002 ACTIVE desde 18-abr
- Binance.com bloqueado en Railway us-east4 (HTTP 451)
- Resuelto en sprint 11-12 may via migración Binance.US primaria + cascada OKX/Kraken/CG fallback
- Cobertura cripto 53/53 (100%) sin Binance.com

### CryptoCompare bloqueada hasta 1-jun-2026
- Rate limit mensual 17.669/11k superado
- Reset 1-jun. Mientras tanto removido del fallback cascade

### TG-001 nuevo 2-may-2026
- Problemas entrega Telegram en reportes diarios
- WhatsApp 1320 cumple como redundancia
- NO tocar backend hasta aprobación Apple Build 17

### TwelveData rate limit 12-may
- Cron refreshStockCache batch revertido (commit b9dabca) por consumir 50 credits en 1 ejecución (límite 8/min plan free)
- Stocks ahora via Yahoo Finance singular + priceCache TTL 5 min

### X / Twitter — XAGEA-751927 RESUELTO 13-may + perfil VALIDADO por Escritorio
- Cuenta @AUREX872336 bloqueada por edad inválida 12-may (Escritorio cargó 1/1/2026 sin OK Fernando)
- Email X 13-may PM: "We've verified that you met the minimum age requirement"
- Handle cambiado a @aurex_live
- Cuenta Profesional Empresa activada con categoría "Aplicación móvil"
- **Validación visual Escritorio 13-may PM via Chrome**: 100% OK los 10 ítems revisados (handle, Display Name AUREX, foto, banner, bio con 🌐 + disclaimer, categoría visible, Global, link aurex.live, cuenta pública, fecha unión 12-may)
- Restricción operativa nueva: **Escritorio NO ejecuta acciones en plataformas externas sin OK explícito Fernando** (memoria `feedback_escritorio_no_actua_solo.md`)

---

## 11. PENDIENTES ACTIVOS — PRIORIZADOS

### URGENTE — Antes de arrancar marketing en redes

**11.1. Actualizar PWA aurex.live a parity Build 17 Android** (3-4 hs Code)
- Agregar Push Notifications FCM (Firebase Web SDK + Service Worker + VAPID)
- Agregar integración Telegram real (deep-link + polling al bot @Aurexalertas_bot)
- Agregar pantalla "Cómo usar AUREX" (6 tabs onboarding, 41 keys i18n ya existen)
- Razón: sin esto, no podemos promocionar aurex.live en redes (mandaríamos gente a producto inferior al Android)
- Validación: Code con Playwright (plugin) + Escritorio Chrome visual + Fernando captura final

**11.2. Definir y construir landing de marketing** (post-PWA actualizada)
- Sitio separado del producto (probablemente aurex.live/inicio o similar)
- En los 8 idiomas (sistema i18n ya armado en PWA)
- Decisión Fernando pendiente: estilo visual, bloques, dominio
- Code propone 3 opciones visuales en mockups, Fernando elige, Code construye

**11.3. Plan Social Media Fase 1 — REHACER** (Code, ~2 hs)
- Versión 1 generada hoy tiene errores que Fernando marcó:
  - Asumió que sin Apple no había producto → cero énfasis en Android publicado + PWA disponible
  - Puso X solo en EN cuando debe ser EN+ES paralelo
  - Mencionó web al pasar, debe ser pieza central
  - Olvidó la PWA como punta de lanza global
- Documento generado: `~/Dropbox/AUREX/MARKETING/PLAN_SOCIAL_MEDIA_FASE_1_AUREX.md` (con observaciones, rehacer en v2)
- Documento base obligatorio: `~/Dropbox/AUREX/MARKETING/MARKETING_CONTEXT_AUREX_v2.md` (leído por todas las marketing-skills antes de generar contenido)

### Mediano plazo

**11.4. Apple Build 17** — monitor diario 9 AM AR. Si no hay novedades al 14-15 may, reabrir thread foro.

**11.5. TikTok Business Verification** — esperar respuesta 3-5 días desde 13-may (datos enviados: Logo + Fernando Gabriel Moscon + CUIT monotributista AFIP).

**11.6. Bug PerfilScreen tilde verde teléfono** — fix listo para Build 25 iOS + Build 18 Android cuando aprueben actuales.

**11.7. Backend pendientes** (cuando libere mí mismo):
- Multi-device wiring (migrar de `usuarios.fcm_token` single a tabla `usuarios_devices` 1:N que ya existe)
- JWT auth en `/api/users/:id/devices`
- Fix orden signup → POST /devices (hoy frontend llama /devices antes de existir fila en `usuarios`)

### v1.1 (post-aprobación Apple+Google)
- Store centralizado de precios (PRIORITARIO)
- Editar activo Portfolio
- Selector monedas Valor Total
- Banner eventos dinámico
- Onboarding modo claro
- Foto perfil persistente

### v2.0 (futuro)
- API eventos real
- Notificaciones push completas
- Análisis técnico avanzado
- Social / comunidad
- API personal ELITE

---

## 12. MARKETING — INFRAESTRUCTURA OPERATIVA AL 13-MAY

### Documentos maestros (en `~/Dropbox/AUREX/MARKETING/`)
- `MARKETING_CONTEXT_AUREX_v2.md` (14 secciones canónicas: producto, audiencia, personas, problemas, competencia, diferenciación, objeciones, switching, customer language, brand voice, style guide, proof points, SEO context, goals). **Leerlo PRIMERO antes de invocar cualquier marketing-skill.**
- `PLAN_SOCIAL_MEDIA_FASE_1_AUREX.md` (v1 con errores marcados, rehacer v2)

### Documentos asociados (en `~/Dropbox/AUREX/AUDITORIA ASO con SKILLS/`)
- `Auditoria_ASO_AUREX_13may2026_v2.docx` (auditoría completa Google Play + Apple + redes + web marketing, 17 tablas, actualizada al 13-may)

### Documentos asociados (en `~/Dropbox/AUREX/Plan MKT/`)
- `PLAN MKT v3.docx` (plan estratégico vigente, Paso CERO en ejecución)

### Skills cargadas en Claude Code (ejecutables ahora)
- frontend-design (Anthropic oficial, 277k installs)
- telegram (configurar bot, gestionar acceso)
- firebase (FCM, crashlytics, deploy)
- playwright (browser automation, testing visual de PWA)
- skill-creator (crear skills custom AUREX)
- Bundle marketing-skills (42 skills): social-media-manager, social-content, x-twitter-growth, copywriting, content-production, page-cro, email-sequence, launch-strategy, app-store-optimization, brand-guidelines, competitor-alternatives, referral-program, ai-seo, schema-markup, programmatic-seo, content-strategy, signup-flow-cro, paywall-upgrade-cro, churn-prevention, marketing-context (ejecutada hoy), marketing-ops (router), prompt-engineer-toolkit, analytics-tracking, ab-test-setup, content-humanizer, marketing-psychology, copy-editing, marketing-strategy-pmm, marketing-demand-acquisition, social-media-analyzer, paid-ads, ad-creative, seo-audit, free-tool-strategy, popup-cro, form-cro, cold-email, site-architecture, onboarding-cro, campaign-analytics, pricing-strategy, marketing-ideas, marketing-context

---

## 13. REGLAS INVIOLABLES

### Mientras hay builds en revisión por Apple o Google:
1. NO tocar el código nativo (`AurexApp`) sin autorización expresa de Fernando y análisis previo de impacto
2. NO tocar metadata en App Store Connect ni Google Play Console (Build 17 sigue en review iOS)
3. La PWA (`aurex-app`) y el backend (`aurex-backend`) son INDEPENDIENTES de las apps nativas

### Infraestructura Railway:
4. NUNCA usar `railway up` (sube archivos sin Nixpacks → rompe build). SIEMPRE push a GitHub main
5. NUNCA eliminar `nixpacks.toml`
6. Verificar STATUS con `railway deployment list --json` después de cada push

### Código:
7. HTML 100% ASCII — emojis y tildes como entidades HTML numéricas
8. Verificar que el string OLD a reemplazar aparece **exactamente 1 vez** antes de tocar
9. Screenshot o verificación visual antes de reportar OK
10. Informar SHA completo de cada commit

### Seguridad:
11. NUNCA escribir tokens, service keys ni passwords en archivos del repo (público o privado)
12. Credenciales nunca por chat (excepto urgencia, después rotar)

### Comunicación:
13. Siempre español, sin jerga técnica innecesaria
14. Análisis integral propio ANTES de pedir datos a Fernando
15. Cruzar opiniones técnicas Code ↔ Escritorio antes de presentar a Fernando
16. **Escritorio NO ejecuta acciones reales en plataformas externas sin OK explícito Fernando** (regla absoluta post incidente X 12-may)
17. **UNA decisión por vez** al pedir input a Fernando (no saturar con tablas múltiples)

### Brief al día:
18. **Code DEBE chequear fecha de este brief al iniciar cada sesión nueva.** Si tiene >24 hs sin actualizar, ALERTAR a Fernando antes de responder cualquier cosa. Si supera 48 hs, actualizar el brief automáticamente con los hitos faltantes basándose en memoria proyecto.

---

## 14. PRIMER OBJETIVO ESCRITORIO HOY (13-may PM)

1. Confirmar que entendiste este brief actualizado
2. ~~Validar visualmente el perfil X~~ ✅ COMPLETADO 13-may PM (10/10 ítems OK via Chrome)
3. Estar listo para opinar sobre el Plan Social Media v2 cuando Code lo rehaga
4. Estar listo para validar visualmente la PWA aurex.live cuando Code la actualice con push + Telegram + "Cómo usar"

---

*Brief mantenido por CODE en repo público `aurex-app/briefs/`. URL fija: https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/BRIEF_AUREX_LATEST.md*

*Versión anterior archivada en `briefs/archive/BRIEF_AUREX_2026-05-09.md`*
