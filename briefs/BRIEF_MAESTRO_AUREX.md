# 🌟 BRIEF MAESTRO COBREX — Estado vivo del proyecto

> **Archivo único de seguimiento** (reemplaza briefs sueltos). Se actualiza con cada hito material, NO cada commit.
> **Historia completa anterior al 12-jun:** `briefs/ARCHIVO_BRIEF_HISTORICO_hasta_12jun.md` + `git log`. Acá queda solo lo **ACTUAL + permanente**.
> **Última depuración:** 12-jun-2026 (de 1607 → brief de referencia limpio).

---

## ⚡ ESTADO ACTUAL (12-jun-2026)

- 🍎 **iOS 1.3 (Build 45) PUBLICADO** en App Store · 🤖 **Android 1.0.39 PUBLICADO** en Google Play (177 países). **Las 2 plataformas al día.**
- 📡 **6 redes/canales CONECTADOS y automatizados** (IG, X, Telegram, YouTube, LinkedIn, TikTok — ver §CANALES).
- 🎨 **MKT en ejecución:** banco de imágenes armado (§BANCO), pieza `001-lanzamiento` en progreso (imagen aprobada; falta video + captions).
- ⚙️ Backend `aurex-backend` en Railway OK. Web `cobrex.io` (repo `fmoscon-creator/cobrex`, GitHub Pages). PWA en `cobrex.io/app`.

---

## 🔑 ACCESOS DE CODE — tokens, secrets, CLIs (LEER PRIMERO — así no se discute en cada chat)

> Define EXACTAMENTE qué puede tocar Code y cómo. **Si algo parece inaccesible, BUSCAR acá y agotar estos accesos ANTES de decir "no puedo" / "no tengo el repo"** (pasó 11-jun: Code dijo falsamente que no accedía al repo de la web — sí accedía).

- **🖥️ Filesystem (Mac):** Code arranca desde `~/Dropbox/AUREX` con `--add-dir ~/Downloads ~/Desktop`. Accede directo a `~/Dropbox/AUREX/**`, `~/Downloads`, `~/Desktop`, `/tmp` y cualquier repo que clone. ⚠️ macOS (TCC) a veces bloquea leer `~/Downloads`/`~/Desktop` ("operation not permitted") → workaround: Fernando arrastra el archivo a `/tmp`, o lo abre y pega el texto.
- **🐙 GitHub:** PAT en `Dropbox/AUREX/CODE/SECRET/GITHUB PAT CODE.txt`. Sirve para **git** (clone/push/pull a cualquier repo) y para la **API** (`curl -H "Authorization: token $PAT" https://api.github.com/...`). (Le falta scope `read:org` para `gh auth login`, pero anda con git + curl.) **6 repos:** `AurexApp` (app RN nativa, PRIVADO) · `aurex-backend` (backend Railway) · `aurex-app` (briefs/mkt + web aurex.live) · **`cobrex` = la WEB cobrex.io** (GitHub Pages, main, raíz; clonar `git clone https://$PAT@github.com/fmoscon-creator/cobrex.git`) · `cobrex-reports` · `jordan-plas`.
- **🚂 Railway:** Project Token en `Dropbox/AUREX/railway/PROJECT TOKEN SECRET RAILWAY.txt`. CLI `railway` instalada. Leer vars: `RAILWAY_TOKEN=$(cat <token>) railway variables --service aurex-app`. Escribir: `... railway variables --set "KEY=VALUE" --service aurex-app` (dispara redeploy). **SIEMPRE `--service aurex-app`.** Deploy del backend = push al repo `aurex-backend` (auto-deploy ~2 min).
- **🗄️ Supabase:** service key en `Dropbox/AUREX/CODE/SECRET/SECRET KEY SUPABASE.txt`. Acceso REST. Ej (plan a tester): `PATCH usuarios?email=eq.<mail> {"plan":"ELITE"}`. El backend lee el plan de Supabase, NO de RC.
- **🔥 Firebase / FCM:** push iOS/Android vía el backend (server-to-server, credenciales en env de Railway). Para tocar Firebase directo → verificar credencial en Railway/SECRET.
- **🔐 Otras keys (en Railway env y/o `CODE/SECRET/`):** ASC ventas `ASC_KEY_ID=ZXVAN65PXA` + suscripciones `S444Z23FMB` · Google Play SA `GOOGLE_PLAY_SA_B64` · `REVENUECAT_API_KEY_V2` · `FMP_KEY` · tokens de redes (FB/IG/X/YT/LI/TikTok — ver §CANALES) · Telegram bot.
- **🛠️ CLIs / tools:** `git` · `gh` (con el PAT) · `railway` · `node` · `curl` · `pandoc` (md→docx) · **`ffmpeg`** (video) · **Chrome headless** (HTML→PNG con Google Fonts: `--headless=new --no-sandbox --screenshot --window-size`) · `sips` · `textutil`. **NO disponibles:** `sharp` (npm), Playwright/chromium, **simulador iOS (NO usar — traba la Mac).**

---

## 🔴 PENDIENTES ACTIVOS

- **📣 MKT (PRIORIDAD):** producir el contenido por canal al banco de imágenes (Fase 2). Plan: `marketing/PLAN_MKT_COBREX_v4.md` (v4.6). Pendiente crítico del plan: adquisición de audiencia (0 seguidores; LinkedIn = 4.952). **NADA se publica sin OK formal de Fernando.**
- **🎬 TIKTOK — video demo + auditoría (para Direct Post 100% automático):** hoy TikTok quedó CONECTADO en sandbox y funciona el modo **borrador** (`video.upload`: Code sube → Fernando publica con 1 toque). El público automático necesita la auditoría de TikTok, que exige un **video demo del flujo con UI** → hay que **construir una pantalla de demo real** (Login TikTok + postear) y grabarla (tools listos: Chrome headless + ffmpeg). App `Client Key awiuia5llnl7gp7o`, sandbox `sbaw56uywxjjxzg415`, vars `TIKTOK_*` en Railway.
- **🔗 LINKEDIN — reconectar cada ~60 días:** el token de perfil personal NO trae refresh → caduca a los 60 días. Reconectar abriendo `/api/li/start` (30 seg). La **página de empresa** quedó parada (exige entidad legal constituida; se retoma si hay empresa).
- **🔴🔬 AUDITAR ARQUITECTURA DE PRECIOS (Mercados):** los precios visibles en Mercados van por `/api/yahoo` = **SOLO Yahoo + caché 60s, SIN cascada** (la cascada de fallbacks alimenta solo las señales IA, NO el número visible). Riesgo: si Yahoo cae/bloquea la IP de Railway → precios en blanco. TODO: (a) auditar integral leyendo código + citando línea; (b) decidir si darle a `/api/yahoo` la misma cascada; (c) recién después, auto-refresh de Mercados. Ver §CONEXIONES.
- **⏳ SELLER NAME APPLE:** Case `102905496721` para cambiar "Fernando gabriel moscon" → "Fernando Gabriel Moscón". Seguir mail fmoscon@gmail.com; si no responde en 3 días háb., reabrir.
- **⏳ Build 46 iOS (menor):** disclaimer paywall más compacto + reordenar SHOP/ZM/TTWO alfabético en el filtro + traducir las 5 justificaciones del análisis IA (vienen del backend en español).

---

## 0. CÓMO USAR ESTE BRIEF + CÓMO INICIA UNA SESIÓN

- **Fernando + Escritorio** ven acá el estado de todos los frentes. **Code** lo actualiza con cada hito material.
- **🚨 REGLA MADRE — Escritorio NUNCA toca/lee/extrae del código** (no tiene acceso al código vivo, solo snapshots viejos). Para cualquier cosa basada en código (traducciones, textos UI, auditorías), **Code extrae el contenido EXACTO del código vivo y se lo pasa; Escritorio solo traduce/opina sobre esa lista.** Nunca al revés.

**Cómo arranca una sesión nueva de Code:**
1. Fernando abre Code en Terminal: `cd ~/Dropbox/AUREX` + `claude --add-dir ~/Downloads ~/Desktop`. **SIEMPRE desde `~/Dropbox/AUREX`** (define qué carpeta de memoria se autocarga; si cambia, la memoria "se parte").
2. Code lee, en orden: (a) **memoria consolidada** `~/.claude/projects/-Users-fernandomoscon-Dropbox-AUREX/memory/` (empezar por `MEMORY.md`, índice de 1 línea por memoria); (b) **este brief**; (c) archivos de referencia (§REFERENCIA) para profundidad.

---

## 🍎🤖 METODOLOGÍA DE COMPILACIÓN — iOS + Android (permanente)

> Doc completo: `briefs/FLUJO_BUILD_IOS_ANDROID.md`. Nació del desastre del Build 25 iOS para que NO se repita.

**Roles fijos:** **Code** hace todo lo técnico (clean, compile, export, **validar el IPA/AAB ANTES de entregar**). **Fernando** solo SUBE el archivo final (Transporter iOS / Play Console Android) + da el clic de "Enviar a revisión" (NO abre Xcode, NO compila). **Escritorio** verifica estado en ASC/Play + valida lista de cambios Android (NO compila, NO toca el botón de envío).

**🧹 PASO 0 — LIMPIEZA OBLIGATORIA (nunca saltear — causó el bug IAP de 3 días):**
- **Android:** `cd ~/AurexApp/android && ./gradlew clean`
- **iOS:** `rm -rf ~/AurexApp/ios/build/` + `rm -rf ~/Library/Developer/Xcode/DerivedData/AurexApp-*` + `cd ~/AurexApp/ios && pod install` (+ limpiar caché Metro). **NO confiar en Pods/Gradle/DerivedData cacheados.**

**🚫🖥️ NO USAR EL SIMULADOR para test (TRABA LA MAC):** un build de simulador con Metro **trabó la Mac 3 veces** (sobrecarga RAM + procesos zombi). Code valida por **bundle JS (Metro) + revisión de código** (NO simulador, NO `-derivedDataPath` propio). El paywall real de StoreKit se ve en **TestFlight** (iPhone de Fernando), no en simulador. **NUNCA compilar pesado en la Mac de Fernando sin OK.**

**Flujo iOS:** Clean → bump SOLO `CURRENT_PROJECT_VERSION` (**`MARKETING_VERSION` queda fijo en su valor, ej 1.3** — cambiarlo "1.0.25" fue el desastre Build 25) → **Archive + Export IPA por CLI `xcodebuild`** (Code) → **VALIDAR IPA** (`unzip` + comparar `CFBundleDisplayName/Identifier/ShortVersion/Version` contra el último IPA OK → única diff debe ser `CFBundleVersion`; signing `com.fernandomoscon.aurex`/**Team `TX7C2F79U9`** · ExportOptions `app-store-connect/TX7C2F79U9`) → **Transporter (Fernando)** → Escritorio confirma procesado → asignar grupo Internal Testing manual → validar en iPhone. Backups en `~/AurexApp/backups/ipa/BuildXX/`.

**Flujo Android:** prefijar SIEMPRE el entorno Java (macOS no tiene JDK en PATH; el JDK 21 de Android Studio ROMPE con `IBM_SEMERU`) → **usar JDK 17 de Homebrew**:
```bash
export JAVA_HOME="/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home"
export ANDROID_HOME="/opt/homebrew/share/android-commandlinetools"
export PATH="$JAVA_HOME/bin:$ANDROID_HOME/platform-tools:$PATH"
```
Clean → bump `versionCode` **y** `versionName` (juntos) → `./gradlew bundleRelease` → AAB firmado (upload key AUREX-KE) → backup `backups/aab/BuildXX/` → Escritorio valida la lista de cambios → Fernando envía. **NADA se compila/envía sin OK de Fernando.**

---

## 🔌 CONEXIONES DE DATOS Y FALLBACKS (permanente)

> Backend `aurex-backend` (Railway, servicio `aurex-app`). Estado en vivo: `/api/debug/sources` + `/api/debug/quotas`. Docs: `Dropbox/AUREX/CONEXIONES y REPORTES DIARIOS APP/`.

**Cascadas (estado 09-jun, reforzado + deployado):**
- **CRIPTO (53 activos):** `Binance.US → OKX → Kraken → CryptoCompare → CoinGecko`. (`api.binance.us`, NO `api.binance.com` que Railway bloquea con HTTP 451.) Los que Binance.US no lista (INJ, TON, XMR, USDT…) caen a OKX/Kraken (gratis, ∞); CryptoCompare quedó como fallback real (~0/día).
- **MERCADOS (297: acciones/ETF/bonos/metales/commodities/forex/futuros):** `Yahoo → Twelve Data → Finnhub → FMP → Alpha Vantage`. FMP (`FMP_KEY`) cubre los futuros/commodities (=F) que eran solo-Yahoo.
- **REDUNDANCIA:** 347/350 activos con ≥2 fuentes; solo 3 (futuros divisa 6E/6J/6B) dependen solo de Yahoo.
- **Topes:** Binance.US/OKX/Kraken ∞ · CryptoCompare 11k/mes · CoinGecko 10k/mes (Demo) · Yahoo s/límite · TwelveData 800/día · Finnhub 60/min · FMP ~250/día · AlphaVantage 25/día.

**🔴 CAVEAT CRÍTICO (pendiente de auditar):** la cascada de arriba alimenta las **SEÑALES IA + Pulse** (backend), **NO los precios que el usuario VE en la pestaña Mercados.** Los precios visibles van por `app fetchYahoo → /api/yahoo` = **SOLO Yahoo (server.js:2139-2143) + caché 60s (`_yTTL=60000`, server.js:2128), SIN cascada.** Si Yahoo cae → el número visible queda en blanco (las señales IA sí tienen fallback). Ver pendiente activo arriba.

---

## 📡 CANALES / REDES Y CÓMO ESTÁN AUTOMATIZADAS (permanente)

> Cada canal = una **función de publicación** + un **endpoint `/api/<canal>/verify`** (chequea conexión SIN postear, gated por `?k=<FB_PAGE_ID>` = `1215827101606939`) en `aurex-backend`. **NADA se publica sin OK formal de Fernando.** Vars de secretos: SOLO en Railway. Doc detallado: `Dropbox/AUREX/REDES SOCIALES/REDES SOCIALES DE COBREX/AUTOMATIZACION_REDES_COBREX.md`. Config: `aurex-app/mkt/config/canales.json`.

| Canal | Handle | Estado | Mecanismo / vars Railway | Función |
|---|---|---|---|---|
| **Instagram** | @cobrex.io (Business, IG ID `17841435427260864`) | ✅ CONECTADO | Graph API v21, **Page Token PERMANENTE** derivado en backend · `FB_APP_ID/FB_APP_SECRET/IG_ACCESS_TOKEN/FB_PAGE_ID/IG_BUSINESS_ID` | `igPublish(imgUrl,caption)` |
| **X/Twitter** | @cobrexio (id `2060017829294776320`) | ✅ CONECTADO | API v2 + **OAuth 1.0a firmado a mano** (HMAC-SHA1) · `X_API_KEY/X_API_SECRET/X_ACCESS_TOKEN/X_ACCESS_TOKEN_SECRET` | `xPublish(text,imgUrl)` |
| **Telegram** | canal t.me/cobrexio | ✅ CONECTADO | bot `@Aurexalertas_bot` (ya admin del canal) · `TELEGRAM_BOT_TOKEN` · `MKT_TELEGRAM_CHANNEL` | `tgPublishChannel(text,imgUrl)` |
| **YouTube** | @cobrex-io (canal `UCXb6q8eZsHPP4nu6yYm0diA`, Brand Account de fmoscon@gmail.com) | ✅ CONECTADO | Data API v3 + **refresh token PERMANENTE** (scope `youtube.upload`, app en producción) · GCP "Cobrex" `tribal-mapper-499119-k5` · `YT_CLIENT_ID/YT_CLIENT_SECRET/YT_REFRESH_TOKEN` | `ytUpload(url,title,desc,tags)` |
| **LinkedIn** | **perfil PERSONAL Fernando** (4.952 seg) — no la página | ✅ CONECTADO | `Share on LinkedIn` (`w_member_social`) + OIDC · app Client `78qvkjylez4jf0` · `LI_CLIENT_ID/LI_CLIENT_SECRET/LI_ACCESS_TOKEN` · ⚠️ token 60d sin refresh → reconectar `/api/li/start` | `liPublish(text)` |
| **TikTok** | @cobrex.io | 🟡 CONECTADO sandbox (modo borrador) | Content Posting API `video.upload` (push_by_file a borradores) · `TIKTOK_*` + `TIKTOK_SANDBOX_*` + `TIKTOK_REFRESH_TOKEN/OPEN_ID` · falta auditoría para Direct Post | `tiktokUploadDraft(url)` |

**Cosmético pendiente:** renombrar el bot de Telegram `Aurex→Cobrex` en BotFather (se ve en la app, no en el canal) → próximo build.

---

## 📁 BANCO DE IMÁGENES — organización, búsqueda y guardado (permanente)

**Ubicación:** `Dropbox/AUREX/BANCO IMAGENES REDES SOCIALES COBREX/`. **Idioma del contenido = INGLÉS** (consistente con la bio/marca). **3 mundos separados (materia prima ≠ molde ≠ producto final):**
- `00_FUENTES/` — materia prima REUTILIZABLE (NO se postea sola): `logos/ iconos-redes/` (7 redes + web color) `badges-tienda/` (Apple+GooglePlay color) `fondos/ mascota-buho/ capturas-app/ capturas-web/ banners-perfil-canal/`.
- `01_TEMPLATES/` — moldes por FORMATO: `1x1_1080x1080 · 4x5_1080x1350 · 9x16_1080x1920 · 16x9_1920x1080 · thumb_1280x720 · _componentes/`.
- `02_CONTENIDO/` — piezas FINALES, **UNA carpeta por pieza** (`001-lanzamiento`…): `meta.json` (estado borrador|en-progreso|aprobado|publicado + caption + hashtags + `canales{}` + pendientes) · `_master/` (diseño editable + render aprobado) · **7 sub-carpetas por red** (`instagram/ tiktok/ x/ youtube/ linkedin/ telegram/ web/`); el nombre del archivo dice el tamaño. **png y video PLANOS por red (no se separan).**

**Formatos por red:** IG feed 1x1/4x5 + story 9x16 · TikTok 9x16 · X 16x9/1x1 · YouTube 16x9 + Short 9x16 + thumb 1280x720 · LinkedIn 1.91:1/1x1 · Telegram libre · Web banners + OG 1200x630.

**Automatización:** el cron recorre `02_CONTENIDO/`, lee `meta.json` (¿`estado=aprobado`? ¿qué redes? ¿caption?) y postea el archivo de cada red. **GUARDADO:** materia prima→`00_FUENTES/` · molde→`01_TEMPLATES/<formato>/` · pieza→`02_CONTENIDO/NNN-<campaña>/<red>/`.

## 🛠️ METODOLOGÍA DE TRABAJO (reglas vivas — detalle en memoria)

- **Code SIEMPRE le habla a Fernando.** Lo de Escritorio va en bloque rotulado aparte. Responder SIEMPRE, nunca quedar en silencio.
- **Verificar antes de afirmar:** leer el código/docs/endpoints + citar línea. NUNCA decir "imposible/no puedo/no tengo acceso" sin agotar TODO lo propio (token GitHub en `CODE/SECRET/GITHUB PAT CODE.txt`, reporte diario, código, endpoints). NUNCA pedir a Fernando lo que Code puede resolver solo.
- **Producto/diseño/visual = decisión de Fernando** (mostrar PNG y esperar OK). **Lo técnico = Code decide y entrega** (no validar formatos/tamaños con Fernando).
- **NUNCA proponer parar/abandonar** un canal/tarea por comodidad. Si es difícil, se hace.
- **Textos para copiar y pegar = planos, sin símbolos markdown adelante.**
- **Nada se publica/compila/envía sin OK formal de Fernando.**

---

## 📊 REPORTES DIARIOS — STATUS / HEALTH / COBREX PERFORMANCE (permanente)

**1) HEALTH / STATUS de conexiones** (`dailyHealthReport()` / `monthlyHealthReport()` en `aurex-backend`):
- **Diario 2×/día (08:00 y 20:00 AR)** → Telegram (`ADMIN_TELEGRAM_CHAT_ID`) + persiste en Supabase `daily_reports` (numerado #seq). Contenido: conexiones por categoría + % de uso por fuente + incidentes 24h.
- **Mensual** (último día hábil, 18:00 AR) → Supabase `monthly_reports` + "días activos por fuente".
- **Alertas de cupo por Telegram:** CryptoCompare 80/95% · CoinGecko 80/90% · + alerta genérica de agotamiento/reactivación por fuente. Endpoint lectura: `/api/health/reports`.

**2) COBREX PERFORMANCE (negocio)** — reporte diario **12:00 AR** al grupo Telegram **"Cobrex Performance"** (bot `@Aurexalertas_bot`, chat_id `-5115002517`, `PERF_TELEGRAM_CHAT_ID`). **Todo por APIs, sin carga manual:** descargas iOS+Android por país (ASC Sales Reports vendor `94182945` + Play bucket GCS), búsqueda+ratings AR/US (iTunes), 5 últimas reseñas (ASC), Revenue MRR/subs/trials/activos/nuevos (RevenueCat v2). Preview sin enviar al grupo: `/api/preview-cobrex-perf`. Análisis profundo (con interpretación) → repo `cobrex-reports` (.md). Semanal (viernes 16h) + mensual agendados. Ver [[project_sistema_reportes_cobrex]].

---

## 💵 PLANES / SUSCRIPCIONES — config actual (permanente)

**Planes:** FREE · PRO · ELITE. **Productos (mensual + anual c/u).** IDs conocidos: PRO mensual `pro.monthly` · ELITE mensual `elite.monthly2` (+ los anuales).

**Precios (Base / Argentina, ambos en USD — ARG factura en USD, no pesos):**
| Plan | Base (EEUU) | Argentina |
|---|---|---|
| PRO Mensual | $4.99 | $2.99 |
| PRO Anual | $47.99 | $28.99 |
| ELITE Mensual | $9.99 | $4.99 |
| ELITE Anual | $95.99 | $47.99 |

**🎁 Free trial 7 días** SOLO en los 2 **MENSUALES** (PRO + ELITE), con tarjeta, "adquisición de clientes nuevos". RevenueCat lo lee **en runtime** (Play Billing / StoreKit), NO en su dashboard.

**Config por plataforma:**
- **iOS / App Store Connect:** 4 productos **APPROVED**. Trial = "Introductory Offer" ("Gratis 1 semana, sin fecha final") en los 2 mensuales. Subscription key `S444Z23FMB` (`Dropbox/AUREX/Apple STORE IOS/P8/.../SubscriptionKey_S444Z23FMB.p8`, Issuer `6960762a-...`).
- **Google Play Console:** precios por país **revisados uno por uno** (Code corrigió desfasajes; Argelia≠Argentina). Oferta `free-trial-7days` en los 2 mensuales. Categoría **Finanzas**.
- **RevenueCat:** `REVENUECAT_API_KEY_V2`. ⚠️ **El plan REAL del usuario lo lee el backend/app de Supabase `usuarios.plan`, NO del entitlement de RC** (para dar PRO/ELITE a un tester: `UPDATE usuarios.plan` directo; service key en `CODE/SECRET/`). Ver [[feedback_plan_free_override_supabase]].

---

## 📂 ARCHIVOS DE REFERENCIA

- **Repos GitHub:** `fmoscon-creator/AurexApp` (app RN, PRIVADO) · `aurex-backend` (backend Railway, público) · `aurex-app` (briefs/mkt/web aurex.live) · `cobrex` (web cobrex.io, GitHub Pages) · `cobrex-reports` (reportes) · `jordan-plas`.
- **Backend Railway:** servicio `aurex-app`, proyecto `228caf37`, URL `aurex-app-production.up.railway.app`. Token: `Dropbox/AUREX/railway/PROJECT TOKEN SECRET RAILWAY.txt`.
- **Secrets:** `Dropbox/AUREX/CODE/SECRET/` (GitHub PAT, Supabase, FMP, etc.).
- **Marketing:** `marketing/PLAN_MKT_COBREX_v4.md` · Banco: `Dropbox/AUREX/BANCO IMAGENES REDES SOCIALES COBREX/` · Redes: `Dropbox/AUREX/REDES SOCIALES/REDES SOCIALES DE COBREX/`.
- **Compilación:** `briefs/FLUJO_BUILD_IOS_ANDROID.md`. **Conexiones:** `Dropbox/AUREX/CONEXIONES y REPORTES DIARIOS APP/`.
- **Historia completa anterior al 12-jun:** `briefs/ARCHIVO_BRIEF_HISTORICO_hasta_12jun.md`.
