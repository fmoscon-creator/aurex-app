# BRIEF AUREX — Estado del Proyecto (versión más reciente)

> **Para Escritorio (Claude Desktop con Chrome integration):**
> Este archivo está siempre disponible en URL fija pública. Code lo actualiza con cada hito mayor.
> Última actualización: 9 de mayo de 2026, 00:30 AR (cierre del día 8-may)

---

## 0. CONTEXTO INMEDIATO

**Hito del 8-may-2026:**

1. **iOS Build 23 subido a TestFlight** (CURRENT_PROJECT_VERSION 23, Marketing 1.0). Status "Lista para pruebas internas". Validado en simulator iOS antes de subir.
2. **Android Build 17 (versionCode 17 / 1.0.17) enviado a revisión Google Play**:
   - Solicitud Acceso a Producción enviada 23:04 AR (max 7 días respuesta)
   - Build 17 en Closed Testing rollout 100% pendiente de aprobación
   - 4 categorías de capturas completas (Phone + Tablet 10" + Chromebook + Android XR)
   - Ficha en-US actualizada
   - Todo enviado a revisión 23:10 AR

**Próximo paso:** Build 24 iOS (mismos fixes que Build 17 Android: i18n "Cómo usar AUREX" 8 idiomas + items 5/7 corregidos en Build 22-23).

---

## 1. IDENTIDAD DEL PROYECTO

| Dato | Valor |
|------|-------|
| Producto | AUREX — plataforma de visualización de datos financieros con IA |
| Founder | Fernando G. Moscon (Argentina UTC-3) |
| Idioma de trabajo | Español (Argentina) |
| Web pública | https://aurex.live |
| Planes | FREE / PRO ($9.99/mes) / ELITE ($19.99/mes) |
| Pagos PWA | Lemon Squeezy |
| Pagos iOS | Apple In-App Purchase via RevenueCat |
| Pagos Android | Google Play Billing via RevenueCat |

---

## 2. ROLES CODE vs ESCRITORIO

- **Code** = Claude Code en terminal de la Mac de Fernando. Tiene acceso filesystem completo, los 3 repos clonados, simulator iOS, Xcode, Android SDK.
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
- **AurexApp (Nativa, PRIVADO)**: https://github.com/fmoscon-creator/AurexApp ← Fernando comparte contenido si lo necesitás
- **aurex-backend (público)**: https://github.com/fmoscon-creator/aurex-backend

### Otros
- **RevenueCat dashboard**: https://app.revenuecat.com
- **Lemon Squeezy store**: https://aurexapp.lemonsqueezy.com
- **Firebase Console**: https://console.firebase.google.com/project/aurex-app-8d985

---

## 4. STATUS APPS — AL 9-MAY-2026

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
| **Build actual TestFlight** | **24** (subido 8-may-2026 23:30, validado en device — i18n inglés OK) |
| Build en App Store Review | 17 (submit 24-abr-2026, en queue Apple — Case 20000111960192 Expedited Review abierto 7-may) |
| Próximo step | Build 25 iOS con bug fix tilde verde teléfono (PerfilScreen) cuando aprueben actuales |

### Android (Google Play)
| Campo | Valor |
|-------|-------|
| Nombre publicado | AUREX |
| Bundle ID | `com.aurexapp` |
| Categoría primaria | Herramientas |
| Idioma listing | Inglés (en-US) |
| **Build actual** | **17** (versionCode 17 / 1.0.17, ENVIADO A REVISIÓN 8-may-2026 23:10 AR) |
| Solicitud Producción | ENVIADA 8-may-2026 23:04 AR (max 7 días respuesta) |
| Track activo | Closed Testing - Alpha (rollout 100% pendiente) |
| Capturas | 4 categorías completas |
| RevenueCat status | Valid (resuelto 6-may-2026) |

---

## 5. LOS 3 REPOS

| Repo | URL | Visibilidad | Branch |
|------|-----|-------------|--------|
| aurex-app (PWA) | https://github.com/fmoscon-creator/aurex-app | 🌐 PÚBLICO | `main` |
| AurexApp (Nativa) | https://github.com/fmoscon-creator/AurexApp | 🔒 PRIVADO | `dev` |
| aurex-backend | https://github.com/fmoscon-creator/aurex-backend | 🌐 PÚBLICO | `main` |

**Para Escritorio:**
- Los 2 repos PÚBLICOS podés acceder vía `https://raw.githubusercontent.com/fmoscon-creator/[repo]/main/[path]`.
- El repo PRIVADO (AurexApp) NO podés acceder. Pedí a Fernando o a Code que copien código.

### Commits del 8-may-2026 (branch `dev` del repo privado AurexApp)
- `d657a32` fix(build20): 8 ítems UX/iOS
- `1797293` revert(build21): bump Android innecesario
- `76f0dcb` fix(build21): items 5/7/8
- `ad440c4` fix(build22): items 5+7 root cause real
- `4b397fb` fix(build23): validados en simulator iOS
- `a4c8a05` feat(build24): i18n completo "Cómo usar AUREX" 8 idiomas + bump Android 1.0.17
- `e0d00a4` chore(build24): bump iOS CURRENT_PROJECT_VERSION 23 → 24

---

## 6. SUPABASE — DATOS OPERATIVOS

- **URL**: https://dklljnfhlzmfsfmxrpie.supabase.co
- **Anon key**: pública por diseño (hardcoded en repos)
- **Service key**: en disco local de Fernando, NO commiteable
- **Tabla principal**: `usuarios` (NO `users`)
- **Schema clave**: `id` (UUID), `email`, `nombre`, `plan`, `telegram_chat_id`, `whatsapp_numero`, `fcm_token`, `beta_access`

---

## 7. RAILWAY — BACKEND AUREX

- **Backend URL**: https://aurex-app-production.up.railway.app
- **Evolution API URL**: https://evo-v1-production.up.railway.app
- **Watch Paths**: cambios en `docs/` NO disparan redeploy
- **Reglas inviolables**: NUNCA `railway up`, NUNCA eliminar `nixpacks.toml`

### Crons activos (`server.js`)
- checkAlertas: cada 30 seg
- refreshCryptoCache: cada 2 min
- calcularPulse + calcularSenalesIA: cada 5 min
- dailyHealthReport: 8:00 AR (Telegram + WhatsApp)
- dailyProjectStatusReport: 9:00 AR (Telegram + WhatsApp)
- monthlyHealthReport: 18:00 AR último día hábil

### Endpoints útiles
- `GET /api/health/status` — estado completo
- `POST /api/test-admin-alert` — alerta admin de prueba
- `GET /api/whatsapp/status` — estado conexión Evolution
- `GET /api/whatsapp/connect-qr` — QR vinculación

---

## 8. WHATSAPP / TELEGRAM

### WhatsApp
- Línea emisora AUREX: línea 1 (eSIM Claro, iPhone, Evolution API)
- Línea admin Fernando: línea 2 (ENV `ADMIN_WHATSAPP`)
- Línea NUEVA Android disponible: línea 3
- Sistema: Evolution API v1.8.7 self-hosted en Railway

### Telegram
- Bot: @Aurexalertas_bot (id `8740136430`)
- Token: env var `TELEGRAM_BOT_TOKEN` en Railway
- Chat ID admin Fernando: `1749518554`
- **Decisión 28-abr-2026**: Telegram canal principal y permanente

---

## 9. FIREBASE — PUSH FCM

- Project ID: `aurex-app-8d985`
- Project number: `137898209095`
- Storage bucket: `aurex-app-8d985.firebasestorage.app`
- Console: https://console.firebase.google.com/project/aurex-app-8d985

### Pipeline FCM
- Backend tiene `firebase-admin` integrado
- Test E2E push validado 5-may-2026

---

## 10. INCIDENTES ACTIVOS

### BN-002 ACTIVE desde 18-abr-2026
- Binance bloqueado en Railway región us-east4
- MITIGATED via CryptoCompare
- Pendiente decidir alternativa post-aprobación Apple

### TG-001 NUEVO 2-may-2026
- Problemas entrega Telegram en reportes diarios
- WhatsApp 1320 cumple como redundancia
- NO tocar código backend hasta aprobación Apple Build 17 + Google Play Build 17

### WA-001 RESUELTO 1-may-2026
- Cooldown antifraude levantado tras 7 días offline. Canal WA operativo.

---

## 11. PENDIENTES POST-PRODUCCIÓN

### Inmediatos (esperando respuestas externas)
- Esperar emails Google Play (24-48 hs ficha + 7 días Producción) sobre Build 17 Android
- Esperar emails Apple sobre Build 17 App Store Review (15 días en queue) + Case 20000111960192 Expedited
- Build 24 iOS YA en TestFlight, validado en device

### Bug pendiente (no bloquea Producción)
- **PerfilScreen — tilde verde teléfono no aparece** (descubierto 8-may 23:50 AR):
  - Síntoma 1: tilde verde NO aparece en campo teléfono Mi Cuenta (sí Nombre/Email)
  - Síntoma 2: card "Usuario" del Perfil NO muestra el teléfono entre email y Plan FREE
  - Funcionalidad NO afectada (alertas Telegram + push iOS funcionan OK)
  - Aplicar en: Build 25 iOS + Build 18 Android (cuando aprueben actuales)

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

## 12. REGLAS DE ORO

### Mientras hay builds en revisión:
- NO tocar código nativo (`AurexApp`) sin autorización expresa
- NO tocar metadata en stores

### Comunicación:
- Siempre en ESPAÑOL
- Sin jerga técnica innecesaria
- Análisis integral propio antes de pedir datos a Fernando
- Cruzar opiniones técnicas Code ↔ Escritorio antes de presentar a Fernando
- Validar visualmente con simulator/screenshot antes de TestFlight

### Seguridad:
- NUNCA escribir tokens, service keys ni passwords en archivos del repo
- Credenciales nunca por chat (excepto urgencia, después rotar)

---

## 13. PRIMER OBJETIVO ESCRITORIO HOY

1. Confirmar que entendiste todo este brief
2. Abrir Play Console en Chrome y verificar status real de cada cambio enviado a revisión
3. Cuando Code termine Build 24 iOS, validar diff antes de archive
4. Estar listo para validar capturas iOS Build 24 si Fernando las pide

---

*Brief mantenido por CODE en repo público `aurex-app/briefs/`. URL fija: https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/BRIEF_AUREX_LATEST.md*
