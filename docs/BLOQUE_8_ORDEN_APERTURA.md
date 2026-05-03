# BLOQUE 8 — Orden de apertura por dependencias técnicas

**Generado por Code el 3-may-2026.** Plan ejecutivo distribuido en 4 días + warm-up de 14 días, con dependencias técnicas resueltas y reglas anti-bloqueo aplicadas.

**Integra todos los bloques anteriores:**
- Bloque 1 — bios listas en 8 idiomas.
- Bloque 2 — handle único `aurex` con fallback `aurex_ai`.
- Bloque 3 — email único `app.aurex@gmail.com` + recovery `aurextester12@gmail.com` + Authenticator + passkey.
- Bloque 4 — assets visuales identificados (App Icon para fotos perfil + logo-aurex.png para banners + búho v2 solo contenido).
- Bloque 5 — riesgos identificados con mitigación (warm-up 14 días, distribución 4 días, NO usar 2563 para SMS, regla cross-platform de NO Web automation no oficial).
- Bloque 6 — disclaimer regulatorio integrado.
- Bloque 7 — costos $6.25/mes fijo, sin variables.

**TIMING DE EJECUCIÓN — Fase C arranca DESPUÉS de aprobación Apple Build 17 + Google Play Build 2 (estimado: 12-15 may 2026, no antes).**

---

## DÍA 0 — pre-requisitos (Fernando, 1 vez, 30 min)

| Tarea | Cómo | Estado |
|---|---|---|
| Confirmar `app.aurex@gmail.com` accesible con su password | Login en Gmail | ✅ ya hecho |
| Google Authenticator instalado en iPhone | App Store ya descargado | ✅ ya hecho |
| Llave de Acceso (Passkey) configurada en Gmail | Reconocimiento facial Face ID | ✅ ya hecho |
| Códigos de respaldo Authenticator guardados en `~/Downloads/SECRET_RECOVERY_CODES.txt` | Fernando los exporta de Gmail Security | ⏳ pendiente |

---

## DÍA 1 — Telegram + bases (30-45 min Fernando)

**Objetivo:** crear las cuentas más simples primero. Telegram tiene CERO anti-fraud, sirve de "warm-up del flujo" antes de tocar plataformas más estrictas.

### 1.1 Telegram Channel `@AurexPulse`

| Paso | Acción |
|---|---|
| 1 | Telegram en iPhone Fernando → tocar lápiz arriba derecha → "New Channel" |
| 2 | Nombre: `AUREX Pulse` |
| 3 | Descripción: bio corta EN del Bloque 1 — `Real-time global markets tracker. 350 assets, 24 variables, 8 languages. Not a broker. aurex.live` |
| 4 | Foto: `~/Downloads/AUREX_PERFILES_REDES/telegram/icon-512.png` (App Icon resizeado a 512×512 — Code lo genera el día anterior) |
| 5 | Tipo: `Public Channel` |
| 6 | Link: probar `@AurexPulse` → fallback `@AurexPulseApp` si está ocupado |
| 7 | Saltar "Add Members" |
| 8 | Configuración → Administradores → Add Administrator → buscar `@Aurexalertas_bot` → activar permisos `Post Messages`, `Edit Messages`, `Delete Messages`, `Manage Live Streams` |

**Output esperado:** canal público activo, bot ya admin. Code puede empezar a publicar inmediatamente.

**Lo que Fernando me pasa al final:** "Telegram OK. Channel handle: `@AurexPulse` (o el que quedó)."

### 1.2 (NO se hace) — Reactivación WhatsApp 2563

🚫 **NO TOCAR la línea 2563 hoy.** Está en watch period por WA-002. Telegram cubre 100% de las alertas.

---

## DÍA 2 — Google + LinkedIn (45-60 min Fernando)

**Objetivo:** plataformas con anti-fraud bajo para Business legítimos.

### 2.1 YouTube canal

| Paso | Acción |
|---|---|
| 1 | Chrome con `app.aurex@gmail.com` activo (verificar en avatar superior derecho) → https://www.youtube.com |
| 2 | Click avatar → "Create a channel" → tipo Brand account → nombre `AUREX` |
| 3 | Handle: probar `@aurex` → fallback `@aurex_ai` (recordar: `aurex` está TAKEN en YouTube según Bloque 2) → directo a `@aurex_ai` |
| 4 | Foto canal: `~/Downloads/AUREX_PERFILES_REDES/youtube/icon-800.png` (App Icon 800×800) |
| 5 | Banner: `~/Downloads/AUREX_PERFILES_REDES/youtube/banner-2560x1440.png` (logo-aurex.png + tagline en composición) |
| 6 | "About" — Description: bio larga EN del Bloque 1 — Country: Argentina — Email business: `app.aurex@gmail.com` — Link: `https://aurex.live` |

### 2.2 YouTube Data API v3

| Paso | Acción |
|---|---|
| 1 | https://console.cloud.google.com con `app.aurex@gmail.com` |
| 2 | Aceptar términos Cloud Console (primera vez) |
| 3 | New project: nombre `AUREX-Backend`, sin organización |
| 4 | Menú lateral → APIs & Services → Library → buscar `YouTube Data API v3` → Enable |
| 5 | Credentials → "+ Create Credentials" → API Key |
| 6 | **Copiar API Key** (formato `AIzaSy...`) |

**Lo que Fernando me pasa al final:** "YouTube OK. Handle: `@aurex_ai`. API Key: `AIzaSy...`"

**Acción Code:** guardar en Railway env `YOUTUBE_API_KEY=AIzaSy...`.

### 2.3 LinkedIn Company Page

| Paso | Acción |
|---|---|
| 1 | https://www.linkedin.com con perfil personal Fernando (NO crear cuenta nueva) |
| 2 | Menú superior → "For Business" (icono cuadrícula) → "Create a Company Page" → tipo Company |
| 3 | Name: `AUREX` |
| 4 | URL slug: probar `aurex` → fallback `aurex-ai` o `aurex-app` |
| 5 | Website: `https://aurex.live` |
| 6 | Industry: `Information Technology and Services` (NO `Financial Services`, regla del Bloque 1) |
| 7 | Subcategoría sugerida: `Computer Software` |
| 8 | Company size: `2-10 employees` |
| 9 | Tagline: bio compacta del Bloque 1 — `Real-time global markets tracker. 350 assets, 24 variables, 7 markets, 8 languages.` (84 char, dentro del límite 120) |
| 10 | Logo: `~/Downloads/AUREX_PERFILES_REDES/linkedin/logo-300.png` (App Icon 300×300) |
| 11 | Banner cover: `~/Downloads/AUREX_PERFILES_REDES/linkedin/banner-1128x191.png` |
| 12 | Aceptar "I am authorized" → "Create page" |

**Lo que Fernando me pasa al final:** "LinkedIn OK. URL: `linkedin.com/company/aurex` (o el slug que quedó)."

**NO instalar Buffer hoy.** Plan v3.0 dice Buffer Free tier alcanza (regla del Bloque 7 — sin costos variables).

---

## DÍA 3 — Twitter + Facebook Page (60 min Fernando)

**Objetivo:** plataformas con anti-fraud medio. La FB Page es pre-requisito para IG Business mañana.

### 3.1 Twitter / X cuenta + Developer API

| Paso | Acción |
|---|---|
| 1 | https://x.com → cerrar sesión otra cuenta si hay otra → "Sign up" con `app.aurex@gmail.com` |
| 2 | Nombre: `AUREX`. Fecha real Fernando (después editás "exhibida" si querés) |
| 3 | Verificar email (código va a `app.aurex@gmail.com`) |
| 4 | Username: probar `@aurex` → fallback `@aurex_ai` → fallback `@aurexai` |
| 5 | Si pide número: **OMITIR si te lo permite, sino usar +54 11 6789-1320 (NO la 2563 — regla del Bloque 5)** |
| 6 | Bio: bio corta EN del Bloque 1 — `Real-time global markets tracker. 350 assets, 24 variables, 7 markets, 8 languages. Not a broker. aurex.live` |
| 7 | Foto: `~/Downloads/AUREX_PERFILES_REDES/twitter/avatar-400.png` (App Icon 400×400) |
| 8 | Banner: `~/Downloads/AUREX_PERFILES_REDES/twitter/banner-1500x500.png` |
| 9 | Country: Argentina. Website: `https://aurex.live` |

### 3.2 Twitter Developer API

| Paso | Acción |
|---|---|
| 1 | https://developer.x.com/en/portal/dashboard → "Sign up for Free Account" |
| 2 | Use case: `Making a Bot` |
| 3 | Description (250+ char): copiar el texto del Bloque 1 sección Twitter — "AUREX is a global markets terminal that publishes AI signals, market pulse, futures pre-market data, and event alerts on financial markets..." |
| 4 | Government entities: `No`. Aceptar Developer Agreement |
| 5 | Dashboard → "Projects & Apps" → click el proyecto default → "Keys and tokens" |
| 6 | **IMPORTANTE: ANTES de generar Access Token, configurar permisos a `Read and Write`** (sino genera Read-only y hay que regenerar todo) |
| 7 | Generate `API Key` + `API Secret` → copiar (solo se muestran una vez) |
| 8 | Generate `Access Token` + `Access Token Secret` → copiar |
| 9 | Bearer Token → copiar |

**Lo que Fernando me pasa al final:**
```
Twitter OK. Username: @aurex_ai
API Key: ...
API Secret: ...
Access Token: ...
Access Token Secret: ...
Bearer Token: ...
```

**Acción Code:** guardar en Railway env vars `TWITTER_API_KEY`, `TWITTER_API_SECRET`, `TWITTER_ACCESS_TOKEN`, `TWITTER_ACCESS_SECRET`, `TWITTER_BEARER_TOKEN`. Después: prueba enviando UN tweet de test (NO 5 seguidos — regla anti-bloqueo).

### 3.3 Facebook Page (pre-requisito para IG Business mañana)

| Paso | Acción |
|---|---|
| 1 | https://www.facebook.com con cuenta personal Fernando (la que ya tiene Jordan Pals) |
| 2 | Menú superior "Pages" → "Create New Page" |
| 3 | Page name: `AUREX` |
| 4 | Category: `Software` (NO `Financial Service`, regla del Bloque 1). Subcategoría: `App Page` |
| 5 | Bio: bio corta EN del Bloque 1 |
| 6 | Click "Create Page" |
| 7 | Subir foto perfil: `~/Downloads/AUREX_PERFILES_REDES/facebook/logo-170.png` (App Icon 170×170) |
| 8 | Subir cover: `~/Downloads/AUREX_PERFILES_REDES/facebook/cover-820x312.png` |

**NO se sale de Facebook hoy.** Mañana se conecta IG Business a esta Page.

**Lo que Fernando me pasa:** "Facebook Page AUREX creada. URL: `facebook.com/AurexApp` (o lo que quedó)."

---

## DÍA 4 — Instagram + TikTok + Meta Graph API (90 min Fernando)

**Objetivo:** las más estrictas en anti-fraud. Último porque ya hicimos warm-up con las anteriores.

### 4.1 Instagram Business

| Paso | Acción |
|---|---|
| 1 | iPhone → App Store → instalar Instagram (si no está) |
| 2 | Abrir → "Create new account" con `app.aurex@gmail.com` |
| 3 | Username: probar `aurex` → fallback `aurex_ai` → fallback `aurex.app` |
| 4 | Password: el que Fernando elija (NO me lo pasa por chat — regla `feedback_credenciales.md`) |
| 5 | Verificar email |
| 6 | Settings & privacy → Account type and tools → Switch to Professional Account → Business |
| 7 | Categoría: `Software` o `Tech & Electronics` (NO `Financial Service`) |
| 8 | Email contacto: `app.aurex@gmail.com` |
| 9 | **Vincular a Facebook Page "AUREX" creada ayer** (paso crítico) |
| 10 | Foto perfil: `~/Downloads/AUREX_PERFILES_REDES/instagram/avatar-320.png` (App Icon 320×320) |
| 11 | Bio: bio corta EN del Bloque 1 |

### 4.2 Meta Graph API (FB + IG)

| Paso | Acción |
|---|---|
| 1 | Chrome → https://developers.facebook.com → login con cuenta personal Fernando |
| 2 | "My Apps" → "Create App" → tipo Business → name `AUREX-Backend` → email `app.aurex@gmail.com` |
| 3 | Dashboard del app → "Add Products": agregar `Instagram Graph API`, `Facebook Login for Business`, `Pages API` |
| 4 | "Settings" → "Basic" → copiar `App ID` y `App Secret` |
| 5 | "Tools" → "Graph API Explorer": app `AUREX-Backend` → Generate Access Token → Page "AUREX" → permisos: `pages_show_list`, `pages_read_engagement`, `pages_manage_posts`, `instagram_basic`, `instagram_content_publish`, `instagram_manage_comments` |
| 6 | Copiar token corto |
| 7 | Long-Lived Token (60 días): pegar URL en otra pestaña reemplazando los `{}`: `https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id={APP_ID}&client_secret={APP_SECRET}&fb_exchange_token={SHORT_TOKEN}` |
| 8 | Copiar `access_token` largo del response |
| 9 | "App Review" → "Permissions and Features" → solicitar approval para los 6 permisos del paso 5 (puede tardar 3-5 días) |

**Lo que Fernando me pasa:**
```
Instagram OK. Username: @aurex_ai
Meta Graph API:
App ID: ...
App Secret: ...
Page ID (FB): ...
IG Account ID: ...
Long-Lived Token: ...
```

### 4.3 TikTok Business + Content Posting API

| Paso | Acción |
|---|---|
| 1 | iPhone → App Store → instalar TikTok |
| 2 | "Sign up" con `app.aurex@gmail.com` |
| 3 | Username: probar `aurex` → fallback `aurex_ai` → `aurex.app` |
| 4 | Password Fernando elige |
| 5 | Foto perfil: `~/Downloads/AUREX_PERFILES_REDES/tiktok/avatar-400.jpg` (JPG sin alpha, App Icon flatten sobre negro) |
| 6 | Bio (80 char): `Real-time global markets tracker. 350 assets in 8 languages. aurex.live` |
| 7 | Settings & privacy → Account → Switch to Business Account → categoría `Education` o `Tech & Electronics` (NO `Finance`) |

**Developer API:**
| Paso | Acción |
|---|---|
| 1 | Chrome → https://developers.tiktok.com → login con cuenta TikTok recién creada |
| 2 | "Manage Apps" → "Connect an app" → name `AUREX-Backend` |
| 3 | Description (texto del Bloque 1 sección TikTok) |
| 4 | Categories: `Finance`, `Education` |
| 5 | Aceptar términos |
| 6 | Solicitar acceso a `Content Posting API` → estado `Pending review` (1-3 semanas externamente) |

**Lo que Fernando me pasa:** "TikTok OK. Username: `@aurex_ai`. Aplicación API enviada (Pending review)."

---

## DÍA 5-18 — WARM-UP MANUAL (Fernando, 5-10 min/día durante 14 días)

**Objetivo (Bloque 5 Riesgo 1):** evitar suspensión por publicación programática en cuentas nuevas. Solo posts manuales humanos durante 14 días, después se habilita automation.

### Calendario warm-up

| Día | Twitter | Instagram | TikTok | LinkedIn |
|---|---|---|---|---|
| Día 5 | 1 post manual general | 1 post feed manual | 1 video corto manual | 1 post manual |
| Día 6-7 | 1 post/día + 5-10 likes a Bloomberg/MarketWatch + follow 10 cuentas | 1 post + 10 likes | 1 video + likes | 1 post |
| Día 8-11 | 1-2 posts/día + replies a 2-3 conversaciones | 1 post + 1 Story manual | 1 video + comentar 2 videos relacionados | 1-2 posts |
| Día 12-14 | Ramp up: agregar 1 post programado API por día (de prueba) + manuales | + 1 Reel manual | + 1 video con copy diverso | 2 posts/semana |
| Día 15+ | **Habilitar full automation**: 4-7 posts/día programados según calendario v3.0 | full automation | 2 videos/semana automation | 2 posts/semana automation |

**Posts manuales — copy sugerido (Fernando puede editar):**

```
Day 1: AUREX is launching soon. Real-time global markets tracker. 350 assets across 7 markets in 8 languages. aurex.live
Day 2: How a global markets tracker can help individual investors stay ahead of macro shifts. (link a artículo o thread)
Day 3: Quick fact: 24 variables cross-referenced on every signal — including FED macro data and GDELT geopolitics.
Day 4: Bloomberg covers thousands. AUREX covers the 350 most relevant — with deeper variable analysis per asset.
Day 5: AI-powered. 8 languages. 7 markets. Not a broker. Not advice. Statistical analytics for the individual market follower.
Day 6: ¿Sabías que la geopolítica afecta tus señales sin que te des cuenta? AUREX integra GDELT en tiempo real.
Day 7: New post incoming with our weekly market pulse...
... (etc, Fernando rota tono y tema)
```

---

## RESUMEN OPERATIVO

| Día | Quién | Tiempo total | Output |
|---|---|---|---|
| Día 0 | Fernando | 30 min | Pre-requisitos verificados |
| Día 1 | Fernando | 30-45 min | Telegram channel activo |
| Día 2 | Fernando | 45-60 min | YouTube canal + API + LinkedIn Company |
| Día 3 | Fernando | 60 min | Twitter + Twitter API + Facebook Page |
| Día 4 | Fernando | 90 min | Instagram Business + Meta Graph API + TikTok + TikTok API |
| Día 5-18 | Fernando | 5-10 min/día × 14 días = ~2-3 hs total | Warm-up manual cuentas |
| Día 19+ | Code | Automation completa | Plan MKT v3.0 Fase 1 ejecutándose |

**Total intervención manual Fernando:** ~5-8 horas distribuidas en 18 días.

**Después: full automation, vos solo aprobás cambios excepcionales.**

---

## FALLBACKS POR PLATAFORMA si las APIs rechazan

(Reforzando Bloque 5 Riesgo 6)

| Plataforma | API rechaza | Plan B |
|---|---|---|
| TikTok Content Posting | NO aprueba en S0 | Manual via Loomly (Fernando NO interviene, Code lo hace en VM remota) |
| Meta Graph (IG Reels) | Rechaza permisos | Buffer Business plan ($15/mes, autorización Fernando explícita) o publicación manual desde iPhone Fernando 2 veces/semana |
| Twitter API Elevated | NO aprueba | Free tier alcanza para 1.500 posts/mes, suficiente |
| LinkedIn Marketing API | Rechaza | Buffer Free tier alcanza |
| YouTube Data API | Default approved | Sin fallback necesario |

---

## INTEGRACIÓN CON BLOQUE 5 (riesgos)

✅ **Riesgo 1 (warm-up insuficiente)**: 14 días de actividad manual antes de automation. Aplicado.
✅ **Riesgo 2 (geolocalización IP)**: Country = Argentina declarado en cada cuenta. Aceptado el riesgo de skew inicial.
✅ **Riesgo 3 (línea 2563 SMS)**: 1320 reemplaza a 2563 para verificación SMS de TODAS las plataformas. Aplicado.
✅ **Riesgo 4 (mismo día same IP)**: distribución en 4 días. Aplicado.
✅ **Riesgo 5 (recovery email)**: ya resuelto en Bloque 3.
✅ **Riesgo 6 (APIs aprobaciones pendientes)**: APIs aplicadas día de cada cuenta para parallel timing con warm-up.
✅ **Riesgo 7 (Apple/Google Build 17 review)**: Fase C arranca DESPUÉS de aprobación stores.
✅ **Riesgo 8 (Web automation no oficial)**: solo APIs oficiales. Manual como plan B, NO Web scraping.

---

## OUTPUT DEL BLOQUE 8

✅ **Plan completo en 4 días + 14 días warm-up + automation**.
✅ **Tiempo total Fernando: ~5-8 hs distribuidas en 18 días**.
✅ **Costos confirmados $6.25/mes fijo** (Bloque 7).
✅ **Riesgos mitigados con acciones específicas en cada día**.
✅ **Fallbacks documentados para cada plataforma si API rechaza**.
✅ **Disclaimer regulatorio integrado en bios + tagline + descripciones**.

---

## ESTADO DEL PASO CERO — 8 BLOQUES COMPLETADOS

| # | Bloque | Estado |
|---|---|---|
| 1 | Bios públicas + 8 idiomas | ✅ |
| 2 | Disponibilidad nombres | ✅ |
| 3 | Email + identidad operativa | ✅ |
| 4 | Assets visuales por plataforma | ✅ |
| 5 | Riesgos de apertura + mitigaciones | ✅ |
| 6 | Disclaimer regulatorio en bios | ✅ |
| 7 | Costos cero confirmados | ✅ |
| 8 | Orden de apertura por dependencias técnicas | ✅ |

**Fase A del Paso CERO 100% COMPLETA.**

**Próximas fases:**
- **Fase B**: pase consolidado a Escritorio para revisión cruzada estratégica (1-2 hs Escritorio + 15 min aprobación Fernando).
- **Fase C**: ejecución real de los 4 días + warm-up por Fernando, post-aprobación Apple Build 17 + Google Play Build 2.

---

*BLOQUE_8_ORDEN_APERTURA.md — Bloque 8 cerrado el 3-may-2026. Fase A del Paso CERO COMPLETA. Siguiente: Fase B revisión cruzada Escritorio.*
