# MANUAL ESTRUCTURAL AUREX

**Estado**: En construcción — verificado sección por sección
**Metodología**: Cada dato verificado contra fuente real (CLI, código, dashboards). Nada de memoria.
**Autores**: CODE + Escritorio. Fernando valida producto, no datos técnicos.

---

## Sección 1: REPOSITORIOS

*Verificado: 18/abril/2026 por CODE (CLI + disco) + Escritorio (GitHub web)*

### 1.1 Tres repos independientes

| Repo | URL | Branch producción | Deploy |
|------|-----|-------------------|--------|
| `aurex-app` | github.com/fmoscon-creator/aurex-app | `main` | GitHub Pages → aurex.live |
| `AurexApp` | github.com/fmoscon-creator/AurexApp | `main` (build 9) | Xcode → App Store |
| `aurex-backend` | github.com/fmoscon-creator/aurex-backend | `main` | Push → Railway auto-deploy |

### 1.2 aurex-app (PWA web)

**Branch**: `main` (única)

**Archivos de producción** (los que sirven aurex.live):
| Archivo | Función | Tamaño |
|---------|---------|--------|
| `index.html` | App completa (HTML + CSS + JS inline) | 278 KB |
| `aurex-v3.js` | Datos de activos + motor IA | 264 KB |
| `aurex-features.js` | Features: Watchlist, IA, sort, headers, legal | 427 KB |
| `logo-aurex.png` | Logo pantalla login | 146 KB |
| `manifest.json` | Config PWA | 654 B |
| `service-worker.js` | Service worker (mínimo) | 30 B |

**Documentación** (`docs/`):
- `terms.html`, `privacy.html`, `support.html` — páginas legales
- `TAB_ALERTAS_SPEC.md`, `TAB_WATCHLIST_SPEC.md` — specs de tabs
- `PERFIL_TAB_DOCUMENTACION.md` — doc tab Perfil
- `MANUAL_ESTRUCTURAL.md` — este documento

**Archivos OBSOLETOS** (legacy, no se usan en producción):
- `aurex-v2.js`, `aurex-v4.js`, `aurex-v5.js`, `aurex-clean.js` — versiones JS viejas
- `index_bueno.html`, `index.html.backup`, `start.html` — HTML viejos
- `aurex_perfil.html`, `aurex_simbolos_v2.html` — prototipos
- `native/` — carpeta con código nativo viejo (NO es el repo AurexApp)
- `backend/node_modules/` — residuo de carpeta backend eliminada

**Carpetas de recursos** (no son legacy):
- `designs/` — diseños visuales
- `screenshots-ia/` — capturas
- `assets/` — recursos PWA
- `img/` — imágenes

**ACCIÓN PENDIENTE**: Limpiar archivos obsoletos para reducir confusión.

### 1.3 AurexApp (Nativa iOS)

**Branches**:
| Branch | Qué contiene | Estado |
|--------|-------------|--------|
| `main` | Build 9 (enviado a Apple 9/abril) | NO TOCAR hasta respuesta Apple |
| `dev` | 8 idiomas + mejoras (88 commits adelante de main) | Branch de trabajo activo |
| `main-builds-10-12` | Legacy builds intermedios | Legacy, no se usa |

**Estructura `src/`**:

Screens (9):
| Archivo | Pantalla |
|---------|----------|
| `PortfolioScreen.js` | Portfolio con activos, P&L, termómetro |
| `MercadosScreen.js` | 350+ activos, precios, AUREX Pulse |
| `IAScreen.js` | Señales IA, filtros, variables modelo |
| `WatchlistScreen.js` | Listas, comparador, compartir |
| `AlertasScreen.js` | Motor alertas, toggles, Pulse zonas |
| `PerfilScreen.js` | 9 secciones acordeón, planes, seguridad |
| `LoginScreen.js` | Login con Supabase |
| `OnboardingScreen.js` | Onboarding nuevos usuarios |
| `SubscriptionScreen.js` | Pantalla suscripciones |

Libs (10):
| Archivo | Función |
|---------|---------|
| `i18n.js` | 8 idiomas, ~700 keys |
| `iaEngine.js` | Motor IA v7 |
| `assets.js` | 350+ activos (tickers, logos, colores) |
| `supabase.js` | Conexión Supabase |
| `ThemeContext.js` | Modo claro/oscuro |
| `theme.js` | Colores por tema |
| `prices.js` | Cache de precios |
| `locale.js` | Formato números |
| `demoData.js` | Datos demo |

Components (5):
| Archivo | Función |
|---------|---------|
| `AurexLogo.js` | Logo SVG AUREX |
| `AssetLogo.js` | Logo de activo (CoinCap/FMP/fallback) |
| `LanguageButton.js` | Selector idioma en header (8 idiomas) |
| `LiveIndicator.js` | Indicador LIVE pulsante |
| `SplashView.js` | Splash screen |

**ACCIÓN PENDIENTE**: Branch `main-builds-10-12` — verificar si se puede eliminar.

### 1.4 aurex-backend (Backend API)

**Branch**: `main` (única)

**Archivos**:
| Archivo | Función |
|---------|---------|
| `server.js` | Servidor Express: API, cron alertas, motor IA, Telegram, WhatsApp |
| `alertImage.js` | Generador imágenes WhatsApp (4 templates, dark/light, pureimage) |
| `activos.json` | Lista 350+ activos |
| `package.json` | Dependencias (express, supabase, sharp, pureimage, twilio, etc.) |
| `nixpacks.toml` | Fuerza Node.js 20 en Railway — NO ELIMINAR |
| `railway.json` | Config deploy: `node server.js` |
| `Procfile` | Alternativa: `web: node server.js` |
| `DEPLOY.md` | Instrucciones deploy |
| `assets/logo.png` | Logo transparente (dark mode) |
| `assets/logo-dark.png` | Logo fondo negro (light mode) |
| `assets/fonts/Inter-*.ttf` | Fuentes para imágenes (Bold, Medium, Regular) |

---

## Sección 2: INFRAESTRUCTURA

*Verificado: 18/abril/2026 por Escritorio (Railway dashboard) + CODE (CLI)*

### 2.1 Railway — Backend API

| Dato | Valor | Verificado por |
|------|-------|---------------|
| Proyecto | lavish-ambition | Escritorio (dashboard) |
| Servicio | aurex-app | Escritorio (dashboard) |
| Región | us-east4 (Virginia, USA) | Escritorio (dashboard) |
| Replicas | 1 | Escritorio (dashboard) |
| CPU | 8 vCPU (límite plan) | Escritorio (dashboard) |
| RAM | 8 GB (límite plan) | Escritorio (dashboard) |
| URL pública | aurex-app-production.up.railway.app | CODE (curl OK) |
| Puerto | 3000 | Escritorio (dashboard) |
| URL privada | aurex-app.railway.internal | Escritorio (dashboard) |
| Builder | Nixpacks (railway.json) | CODE (archivo verificado) |
| Provider | Node (nixpacks.toml) | CODE (archivo verificado) |
| Restart policy | On Failure (railway.json) | CODE (archivo verificado) |
| Source repo | fmoscon-creator/aurex-backend → main | Escritorio (dashboard) |
| Auto-deploy | Sí — push a main dispara deploy vía webhook GitHub | Escritorio (dashboard) |

### 2.2 Railway — Evolution API (WhatsApp)

| Dato | Valor | Verificado por |
|------|-------|---------------|
| Servicio | evo-v1 | Escritorio (dashboard) |
| Estado | Online | CODE (API: state=open) |
| URL | evo-v1-production.up.railway.app | CODE (curl OK) |
| Instancia | aurex | CODE (API verificada) |
| Versión | Evolution v1.8.7 | Escritorio (dashboard) |

### 2.3 Supabase

| Dato | Valor | Verificado por |
|------|-------|---------------|
| URL | dklljnfhlzmfsfmxrpie.supabase.co | CODE (variable Railway) |
| Tablas | 9 verificadas | CODE (query directo) |

**Tablas reales** (verificadas por CODE via service key):
| Tabla | Función |
|-------|---------|
| `alertas` | Alertas de precio activas del usuario |
| `alertas_historial` | Historial de alertas disparadas |
| `alerts` | PENDIENTE VERIFICAR — posible duplicado o legacy |
| `portfolio` | Activos del portfolio del usuario |
| `profiles` | Perfil usuario (plan, celular, preferencias) |
| `usuarios` | Datos de usuario (email, plan, fecha creación) |
| `watchlist` | Watchlist v1 (posible legacy) |
| `watchlist_items` | Items de watchlists v2 |
| `watchlists` | Listas de watchlist v2 |

**PENDIENTE VERIFICAR**: tabla `alerts` vs `alertas` — ¿cuál se usa? ¿`watchlist` es legacy de v1?

### 2.4 Otros servicios

| Servicio | Función | Estado |
|----------|---------|--------|
| GitHub Pages | Hosting PWA aurex.live | Activo |
| Apple Developer | App Store iOS | Build 9 pendiente revisión |
| Meta/WhatsApp | Cloud API (dormido, no se usa) | Dormido |
| PayPal Business | Pagos PWA | Activo |
| RevenueCat | IAP iOS (StoreKit) | PENDIENTE VERIFICAR estado |

---

## Sección 4: VARIABLES DE ENTORNO

*Verificado: 18/abril/2026 por CODE (CLI) + Escritorio (dashboard) — coinciden*

**16 variables de usuario** (configuradas manualmente):

| Variable | Función |
|----------|---------|
| `SUPABASE_URL` | URL de Supabase |
| `SUPABASE_SERVICE_KEY` | Key admin Supabase (bypasa RLS) |
| `EVOLUTION_API_URL` | URL Evolution API (WhatsApp) |
| `EVOLUTION_API_KEY` | API key Evolution |
| `EVOLUTION_INSTANCE` | Nombre instancia (aurex) |
| `ADMIN_WHATSAPP` | Número admin Fernando (5491167891320) |
| `ANTHROPIC_API_KEY` | Key Claude API (análisis IA en alertas) |
| `ALPHA_VANTAGE_KEY` | Key precios acciones |
| `TELEGRAM_BOT_TOKEN` | Token bot Telegram alertas |
| `TWILIO_ACCOUNT_SID` | Twilio SID (fallback WhatsApp) |
| `TWILIO_AUTH_TOKEN` | Twilio auth token |
| `TWILIO_WHATSAPP_FROM` | Número Twilio WhatsApp |
| `LEMONSQUEEZY_WEBHOOK_SECRET` | Secret webhooks pagos |
| `FRONTEND_URL` | CORS origin (*) |
| `PORT` | Puerto servidor (3000) |
| `NIXPACKS_NO_CACHE` | Forzar rebuild limpio (dejar en 1) |

**Variable ELIMINADA**: `NIXPACKS_ROOT_DIR=backend` — fue causa del incidente de backend caído el 17/abril. Eliminada correctamente.

**12 variables automáticas Railway** (inyectadas por Railway, no tocar):
`RAILWAY_ENVIRONMENT`, `RAILWAY_ENVIRONMENT_ID`, `RAILWAY_ENVIRONMENT_NAME`, `RAILWAY_PRIVATE_DOMAIN`, `RAILWAY_PROJECT_ID`, `RAILWAY_PROJECT_NAME`, `RAILWAY_PUBLIC_DOMAIN`, `RAILWAY_SERVICE_AUREX_APP_URL`, `RAILWAY_SERVICE_EVO_V1_URL`, `RAILWAY_SERVICE_ID`, `RAILWAY_SERVICE_NAME`, `RAILWAY_STATIC_URL`

---

## Sección 3: DEPLOY

*Verificado: 18/abril/2026 por CODE (archivos config + CLI + historial)*

### 3.1 Backend (aurex-backend → Railway)

**Proceso:**
```
1. Editar código en aurex-backend (local: /tmp/aurex-backend)
2. git add + git commit + git push origin main
3. Railway detecta push vía webhook GitHub
4. Nixpacks lee nixpacks.toml → instala Node.js 20
5. npm install (dependencias de package.json)
6. Ejecuta: node server.js (definido en railway.json)
7. Servidor arranca en PORT 3000
```

**Archivos que controlan el deploy** (verificados):
| Archivo | Contenido verificado | Función |
|---------|---------------------|---------|
| `railway.json` | `builder: NIXPACKS`, `startCommand: node server.js`, `restartPolicyType: ON_FAILURE` | Config Railway |
| `nixpacks.toml` | `nixPkgs = ["nodejs_20"]`, `cmd = "node server.js"` | Fuerza Node.js 20 |
| `Procfile` | `web: node server.js` | Alternativa (Railway prioriza railway.json) |
| `package.json` | `scripts.start: "node server.js"` | npm start |

**Tiempo de deploy**: ~4-5 minutos (build + deploy)

**Verificar deploy exitoso**:
```bash
railway deployment list --json | python3 -c "import json,sys; d=json.load(sys.stdin)[0]; print(d['status'])"
# Debe decir: SUCCESS
```

**REGLAS:**
- ❌ **NUNCA** usar `railway up` — sube archivos sin Nixpacks, rompe todo
- ❌ **NUNCA** eliminar `nixpacks.toml` — Railway vuelve a usar Caddy
- ✅ **SIEMPRE** deployar vía push a GitHub main
- ✅ **SIEMPRE** verificar STATUS: SUCCESS antes de probar

**Incidente documentado (17/abril/2026):**
`railway up` desde `/backend` subió archivos sin Node.js → backend caído ~1 hora. Fix: `nixpacks.toml` + `NIXPACKS_NO_CACHE=1` + `railway redeploy --yes`.

### 3.2 PWA (aurex-app → GitHub Pages)

**Proceso:**
```
1. Editar código en aurex-app (local: ~/Desktop/aurex-app)
2. Incrementar cache bust: aurex-v3.js?v=XXX en index.html
3. git add + git commit + git push origin main
4. GitHub Pages auto-deploya (~1 minuto)
5. Verificar: aurex.live (F5 forzar recarga)
```

**Cache bust actual**: `v=149` (verificado en index.html)

**Nota**: No hay archivo CNAME. El dominio aurex.live está configurado en GitHub Settings del repo, no en el código.

### 3.3 Nativa iOS (AurexApp → App Store)

**Proceso:**
```
1. Trabajar en branch dev
2. Cuando Apple apruebe build actual:
   git checkout main && git merge dev
3. Abrir AurexApp.xcworkspace en Xcode
4. Incrementar build number (CURRENT_PROJECT_VERSION)
5. Product → Archive → Distribute to App Store
6. App Store Connect: seleccionar build → Submit for Review
```

**Config verificada en Xcode project:**
| Dato | Valor verificado |
|------|-----------------|
| Bundle ID | com.fernandomoscon.aurex |
| Marketing Version | 1.0 |
| Build en proyecto Xcode | 11 |
| Build real (TestFlight) | 13 (10/abril 17:06 PM) |
| Próximo build | 14 |

**NOTA**: El build number en Xcode project (11) NO coincide con el de TestFlight (13). Fernando incrementa manualmente en Xcode antes de cada Archive. El dato real es el de TestFlight.

**Branches:**
| Branch | Cuándo usar |
|--------|------------|
| `dev` | Desarrollo diario |
| `main` | Solo para builds que van a App Store |
| NO mergear dev→main hasta que Apple apruebe el build actual |

### 3.4 Rollback

**Backend**: revertir último commit y pushear
```bash
cd /tmp/aurex-backend
git revert HEAD && git push origin main
# Railway redeploya automáticamente
```

**PWA**: revertir último commit y pushear
```bash
cd ~/Desktop/aurex-app
git revert HEAD && git push origin main
# GitHub Pages redeploya
```

**Nativa**: usar safety points
```bash
cd ~/AurexApp
git checkout safety-point-YYYY-MM-DD-nombre
```

---

## Sección 5: BASE DE DATOS (Supabase)

*Verificado: 18/abril/2026 por CODE (queries directos + grep de código)*

### 5.1 Conexión

| Dato | Valor | Verificado |
|------|-------|-----------|
| URL | dklljnfhlzmfsfmxrpie.supabase.co | CODE (variable Railway) |
| Auth | Supabase Auth (email + password) | CODE (código nativa + PWA) |
| Anon Key | Hardcodeada en nativa `supabase.js` y PWA `index.html` | CODE (grep) |
| Service Key | En Railway variables (bypasa RLS) | CODE (variable Railway) |

### 5.2 Tablas — Estado real

**9 tablas** existen en Supabase. Verificadas por uso en código + conteo de filas:

| Tabla | Filas | Usada en server.js | Usada en PWA | Usada en nativa | Estado |
|-------|-------|-------------------|-------------|-----------------|--------|
| `alertas` | 0 | ✅ 7 queries | ❌ | ❌ | **ACTIVA** — alertas de precio |
| `alertas_historial` | 0 | ✅ 1 insert | ❌ | ❌ | **ACTIVA** — historial disparadas |
| `alerts` | 0 | ❌ no se usa | ❌ | ❌ | **LEGACY** — no la usa ningún código |
| `portfolio` | 0 | ✅ 4 queries | ❌ | ❌ | **ACTIVA** — activos del usuario |
| `profiles` | 0 | ❌ no se usa | ❌ | ❌ | **SIN USO** — existe pero ningún código la consulta |
| `usuarios` | 0 | ✅ 4 queries | ✅ 2 queries | ❌ | **ACTIVA** — datos usuario |
| `watchlist` | 0 | ✅ 3 queries | ❌ | ❌ | **LEGACY v1** — server.js la usa pero hay v2 |
| `watchlist_items` | 0 | ✅ 4 queries | ❌ | ❌ | **ACTIVA v2** — items de listas |
| `watchlists` | 0 | ✅ 5 queries | ❌ | ❌ | **ACTIVA v2** — listas de watchlist |

**Storage**: bucket `avatars` — fotos de perfil (server.js endpoint `/api/avatar`)

### 5.3 Resolución de pendientes

**`alerts` vs `alertas`**: La tabla `alerts` (con s en inglés) tiene 0 filas y NO es referenciada por ningún código. Es legacy — probablemente fue la primera versión antes de renombrar a `alertas`. **Se puede eliminar.**

**`watchlist` vs `watchlists`**: Server.js usa AMBAS. `watchlist` es la v1 (endpoints `/api/watchlist/`), `watchlists` + `watchlist_items` es la v2 (endpoints `/api/watchlists/`). La nativa usa v2. **`watchlist` v1 es legacy pero server.js aún la sirve** — no eliminar sin migrar.

**`profiles` vs `usuarios`**: `profiles` existe pero ningún código la consulta activamente. `usuarios` es la tabla activa. `profiles` podría ser de un intento previo de Lemon Squeezy webhook (que hace upsert a `profiles`). **Mantener ambas por ahora.**

### 5.4 Acciones recomendadas

- [ ] Eliminar tabla `alerts` (legacy, 0 filas, sin código)
- [ ] Migrar de `watchlist` v1 a v2 y eliminar endpoints v1
- [ ] Clarificar relación `profiles` vs `usuarios` — unificar si es posible
- [ ] Todas las tablas tienen 0 filas — normal porque no hay usuarios reales aún

---

## Sección 6: APIs / ENDPOINTS

*Verificado: 18/abril/2026 por CODE (grep server.js + curl en producción)*

**Base URL**: `https://aurex-app-production.up.railway.app`

### 6.1 Health / General

| Método | Ruta | Función | Probado |
|--------|------|---------|---------|
| GET | `/` | Health check — devuelve status, app, version, time | ✅ OK |

### 6.2 Motor IA + Datos

| Método | Ruta | Función | Probado |
|--------|------|---------|---------|
| GET | `/api/activos` | Lista 350+ activos (de activos.json) | ✅ OK |
| GET | `/api/ia-signals` | Señales IA calculadas (350 activos) | ✅ OK — 350 señales |
| POST | `/api/ia-signals` | Forzar recálculo de señales | No probado |
| GET | `/api/pulse` | AUREX Pulse scores (Global, Cripto, Acciones, Futuros, Commodities) | ✅ OK |

### 6.3 Precios

| Método | Ruta | Función | Probado |
|--------|------|---------|---------|
| GET | `/api/stock/:symbol` | Precio vía Alpha Vantage (cache 60s) | ✅ OK — AAPL $270.23 |
| GET | `/api/yahoo` | Proxy Yahoo Finance (chart data) | ✅ OK |
| GET | `/api/yahoo/search` | Búsqueda Yahoo Finance | ✅ OK |

### 6.4 Portfolio (CRUD)

| Método | Ruta | Función | Probado |
|--------|------|---------|---------|
| GET | `/api/portfolio/:userId` | Listar activos del portfolio (enriquecido con logos) | No probado (requiere userId) |
| POST | `/api/portfolio` | Agregar activo al portfolio | No probado |
| PATCH | `/api/portfolio/:id` | Editar activo | No probado |
| DELETE | `/api/portfolio/:id` | Eliminar activo | No probado |

### 6.5 Alertas (CRUD)

| Método | Ruta | Función | Probado |
|--------|------|---------|---------|
| GET | `/api/alertas/:userId` | Listar alertas del usuario | No probado (requiere userId) |
| POST | `/api/alertas` | Crear alerta | No probado |
| PATCH | `/api/alertas/:id` | Editar alerta | No probado |
| DELETE | `/api/alertas/:id` | Eliminar alerta | No probado |

### 6.6 Watchlist v1 (legacy)

| Método | Ruta | Función | Probado |
|--------|------|---------|---------|
| GET | `/api/watchlist/:userId` | Listar watchlist v1 | No probado |
| POST | `/api/watchlist` | Agregar a watchlist v1 | No probado |
| DELETE | `/api/watchlist/:id` | Eliminar de watchlist v1 | No probado |

### 6.7 Watchlists v2 (activa)

| Método | Ruta | Función | Probado |
|--------|------|---------|---------|
| GET | `/api/watchlists/:userId` | Listar listas del usuario | No probado |
| GET | `/api/watchlists/:userId/items` | Items de todas las listas | No probado |
| POST | `/api/watchlists` | Crear lista | No probado |
| PATCH | `/api/watchlists/:id` | Editar lista | No probado |
| DELETE | `/api/watchlists/:id` | Eliminar lista (+ items) | No probado |
| POST | `/api/watchlist-items` | Agregar item a lista | No probado |
| PATCH | `/api/watchlist-items/:id` | Editar item | No probado |
| DELETE | `/api/watchlist-items/:id` | Eliminar item | No probado |

### 6.8 Usuarios

| Método | Ruta | Función | Probado |
|--------|------|---------|---------|
| GET | `/api/usuario/:userId` | Obtener datos usuario | No probado |
| POST | `/api/usuario` | Crear/obtener usuario (upsert por email) | No probado |
| PATCH | `/api/usuario/:userId` | Editar usuario | No probado |
| POST | `/api/login` | Proxy login Supabase Auth | No probado |
| POST | `/api/avatar` | Upload foto perfil (base64 → Supabase Storage) | No probado |

### 6.9 WhatsApp (Evolution API)

| Método | Ruta | Función | Probado |
|--------|------|---------|---------|
| POST | `/api/whatsapp/send` | Enviar mensaje texto (requiere numero + mensaje) | ✅ OK |
| POST | `/api/whatsapp/test-image` | Enviar imagen alerta (4 templates, dark/light) | ✅ OK |
| GET | `/api/whatsapp/status` | Estado conexión Evolution (open/close) | ✅ OK — state: open |
| POST | `/api/test-admin-alert` | Enviar alerta admin test | ✅ OK |

### 6.10 Telegram

| Método | Ruta | Función | Probado |
|--------|------|---------|---------|
| POST | `/api/test-telegram` | Enviar mensaje test al bot | No probado |

### 6.11 Twilio (fallback WhatsApp)

| Método | Ruta | Función | Probado |
|--------|------|---------|---------|
| POST | `/api/test-whatsapp` | Enviar WhatsApp vía Twilio (fallback) | No probado |

### 6.12 Webhooks

| Método | Ruta | Función | Probado |
|--------|------|---------|---------|
| POST | `/webhook/lemonsqueezy` | Webhook Lemon Squeezy pagos (verifica firma HMAC) | No probado |

### 6.13 Cron Jobs

| Job | Intervalo | Función |
|-----|-----------|---------|
| `checkAlertas` | Cada 30 segundos | Verifica alertas de precio → dispara WhatsApp/Telegram |
| Cálculo IA | Cada ~5 minutos | Recalcula señales para 350 activos |
| Cálculo Pulse | Cada ~5 minutos | Recalcula scores Pulse (5 filtros) |

**Total: 36 endpoints + 3 cron jobs**

---

## Sección 7: FLUJO DE DATOS

*Verificado: 18/abril/2026 por CODE (grep server.js + index.html)*

### 7.1 Fuentes de datos

| Fuente | Qué provee | Usado en |
|--------|-----------|----------|
| Binance API | Precios cripto en tiempo real | server.js (checkAlertas) + PWA (fetch directo) |
| Yahoo Finance | Precios acciones/futuros/indices, chart data | server.js (proxy /api/yahoo, cálculo Pulse) |
| Alpha Vantage | Precios acciones (fallback, cache 60s) | server.js (/api/stock) |
| CoinGecko | Precios cripto (fallback PWA) | PWA index.html (fetch directo) |
| CoinCap | Logos cripto | Nativa + PWA (URLs de imagen) |
| FMP | Logos acciones | Nativa + PWA (URLs de imagen) |
| ExchangeRate API | Tipos de cambio (conversor) | PWA index.html |

### 7.2 Cron Jobs (verificados en server.js)

| Job | Intervalo | Línea | Función |
|-----|-----------|-------|---------|
| `checkAlertas` | Cada 30 segundos | L170 | Lee alertas activas → verifica precios Binance/Yahoo → dispara WhatsApp/Telegram |
| `calcularPulse` | Cada 5 minutos | L680 | Calcula scores Pulse (5 filtros) usando Yahoo Finance |
| `calcularSenalesIA` | Cada 5 minutos | L686 | Calcula señales IA para 350 activos |
| `healthCheck` | Cada 5 minutos | L749 | PENDIENTE VERIFICAR función |

### 7.3 Flujo PWA → Backend

PWA (`index.html`) consume del backend estas 4 APIs al cargar:
```
1. /api/ia-signals → señales IA (350 activos)
2. /api/portfolio/:userId → activos del usuario
3. /api/watchlists/:userId/items → items watchlists
4. /api/pulse → scores AUREX Pulse
```

### 7.4 Flujo Nativa → Backend

La nativa consume las mismas APIs via `fetch()` pero desde React Native. La URL del backend está en las pantallas directamente (`https://aurex-app-production.up.railway.app`).

---

## Sección 8: WHATSAPP

*Verificado: 18/abril/2026 por CODE (server.js + alertImage.js + curl)*

### 8.1 Infraestructura

| Componente | Detalle | Verificado |
|-----------|---------|-----------|
| Servicio | Evolution API v1.8.7 en Railway (evo-v1) | ✅ state: open |
| Instancia | aurex | ✅ API verificada |
| Línea emisora | +54 9 11 3360 2563 (eSIM Claro, iPhone Fernando) | Documentado |
| Línea admin | +54 9 11 6789 1320 (WhatsApp personal Fernando) | ✅ mensajes recibidos |

### 8.2 Funciones en server.js

| Función | Qué hace |
|---------|----------|
| `sendWhatsAppEvolution(phone, text)` | Envía mensaje de texto via Evolution API |
| `sendWhatsAppImage(phone, imageBuffer, caption)` | Envía imagen con caption via Evolution API |
| `notifyAdmin(subject, body)` | Envía alerta admin (intenta imagen, fallback texto) |
| `dispararAlerta(alerta, precio)` | Dispara alerta completa (imagen + fallback texto + fallback Twilio) |

### 8.3 Templates de imagen (alertImage.js)

| Template | Subtítulo | Contenido | Probado |
|----------|-----------|-----------|---------|
| `ia` | AI Alert | Ticker + BULLISH/BEARISH + % + Price/Target/Stop + barra | ✅ dark + light |
| `precio` | Price Alert | Ticker + TARGET REACHED + Current Price vs Target + Difference % | ✅ dark + light |
| `pulse` | AUREX Pulse | 5 cards (Global/Crypto/Stocks/Commod/Futures) con scores + zonas | ✅ dark + light |
| `admin` | System Alert | Mensaje de error + timestamp | ✅ dark + light |

**Tecnología**: pureimage (canvas JS puro) + sharp (logo composite + resize Retina 2x)
**Fuente**: Inter (Bold, Medium, Regular) en `assets/fonts/`
**Idioma**: Inglés, formato numérico americano
**Logo**: transparente con texto AUREX, 100px circular, mismo dark y light

### 8.4 Cadena de fallback

```
1. Genera imagen (pureimage) → envía via Evolution sendMedia
2. Si imagen falla → envía texto plano via Evolution sendText
3. Si Evolution falla → envía via Twilio WhatsApp
```

### 8.5 Límites por plan (código en server.js, NO activo aún)

| Plan | Alertas WhatsApp/día |
|------|---------------------|
| FREE | 0 (solo push) |
| PRO | 3 |
| ELITE | 10 |

**NOTA**: Los límites están codificados en el endpoint pero el cron `checkAlertas` aún no los aplica — envía a todos los que tienen `whatsapp_numero` en la alerta.

---

## Sección 9: i18n (INTERNACIONALIZACIÓN)

*Verificado: 18/abril/2026 por CODE (grep i18n.js + screens)*

### 9.1 Estado actual

| Dato | Valor | Verificado |
|------|-------|-----------|
| Archivo | `AurexApp/src/lib/i18n.js` | ✅ |
| Total keys | 712 por idioma | ✅ grep count |
| Idiomas | 8 | ✅ |
| Selectores | PerfilScreen (8 opciones) + LanguageButton (8 opciones) | ✅ |

### 9.2 Idiomas

| Código | Idioma | Bandera | Estado |
|--------|--------|---------|--------|
| es | Español | 🇪🇸 | ✅ Completo |
| en | English | 🇺🇸 | ✅ Completo |
| pt | Português | 🇧🇷 | ✅ Completo |
| zh | 中文 | 🇨🇳 | ✅ Completo |
| fr | Français | 🇫🇷 | ✅ Completo |
| it | Italiano | 🇮🇹 | ✅ Completo |
| hi | हिन्दी | 🇮🇳 | ✅ Completo |
| ar | العربية | 🇦🇪 | ✅ Completo |

### 9.3 Hardcodes pendientes (español sin traducir)

| Pantalla | Qué falta | Complejidad |
|----------|-----------|-------------|
| PortfolioScreen | Motivos análisis IA (5 frases con interpolación) | Alta — requiere templates |
| AlertasScreen | IA_VARS names/descriptions (10 variables) | Media — constante fuera del componente |
| PWA (index.html) | Todo — no tiene sistema i18n | Alta — todo hardcodeado en español |

### 9.4 Cómo agregar un idioma nuevo

```
1. Agregar traducciones a cada key en src/lib/i18n.js (712 keys)
2. Agregar opción en PerfilScreen.js (Alert picker de idiomas)
3. Agregar en LanguageButton.js (LANG_OPTIONS array)
4. Agregar al mapa IDIOMAS y lógica de banderas en PerfilScreen.js
5. Verificar: node -c src/lib/i18n.js (sintaxis)
6. Probar en app: cambiar idioma y recorrer todas las tabs
```

---

## Sección 11: SAFETY POINTS

*Verificado: 18/abril/2026 por CODE (git tag -l en los 3 repos)*

### 11.1 AurexApp (Nativa) — 5 tags

| Tag | Fecha | Estado |
|-----|-------|--------|
| `safety-point-2026-04-15-whatsapp-live` | 15/abril | Build 9, ES/EN, modo claro |
| `safety-point-2026-04-16-nativa-estable` | 16/abril | Post pop temporalidad |
| `safety-point-2026-04-16-i18n-perfil-completo` | 16/abril | Perfil 9 solapas traducidas |
| `safety-point-2026-04-16-8-idiomas-completo` | 16/abril | 8 idiomas + PT/ZH |
| `safety-point-2026-04-17-8idiomas-whatsapp-templates` | 17/abril | Estado actual dev |

### 11.2 aurex-backend — 1 tag

| Tag | Fecha | Estado |
|-----|-------|--------|
| `safety-point-2026-04-17-whatsapp-4templates` | 17/abril | 4 templates WhatsApp |

### 11.3 aurex-app (PWA) — 3 tags

| Tag | Fecha | Estado |
|-----|-------|--------|
| `safety-point-2026-04-15-pre-port-nativa` | 15/abril | PWA pre-port nativa |
| `safety-point-2026-04-16-perfil-login-ok` | 16/abril | Perfil + login replicados |
| `safety-point-2026-04-17-pwa-arquitectura` | 17/abril | /backend eliminado + README |

### 11.4 Cómo usar

```bash
# Ver estado sin perder trabajo
git checkout <tag>

# Volver al branch actual
git checkout <branch>

# Resetear branch a un safety point (DESTRUCTIVO)
git checkout <branch> && git reset --hard <tag>
```

### 11.5 Cuándo crear uno nuevo

- Después de completar un set grande de features
- Antes de refactorizaciones grandes
- Antes de tocar áreas compartidas (backend)
- Cuando Fernando valida que todo funciona

---

## Sección 10: APPLE

*Verificado: 18/abril/2026 por Escritorio (App Store Connect) + CODE (memoria documentada)*

### 10.1 Cuenta

| Dato | Valor | Verificado por |
|------|-------|---------------|
| Programa | Apple Developer Program | Escritorio |
| Team ID | TX7C2F79U9 | Fernando (directo) |
| Apple Account | fmoscon@gmail.com | CODE (documentado) |

### 10.2 App

| Dato | Valor | Verificado por |
|------|-------|---------------|
| App Name | AUREX | Escritorio (ASC) |
| Apple ID | 6761672161 | Escritorio (ASC) |
| Bundle ID | com.fernandomoscon.aurex | CODE (Xcode project) + Escritorio (ASC) |
| Idioma metadata | Español (España) | Escritorio (ASC) |
| Versión en revisión | 1.0 (build 9) | Escritorio (ASC) |
| Estado | Pendiente de revisión | Escritorio (ASC) |

### 10.3 Builds en TestFlight

*Verificado por Escritorio en App Store Connect*

| Build | Fecha | Hora | Estado |
|-------|-------|------|--------|
| 9 | 9/abril | 21:07 PM | Enviado a App Store Review |
| 10 | 10/abril | 12:47 PM | TestFlight |
| 11 | 10/abril | 15:12 PM | TestFlight |
| 12 | 10/abril | 15:21 PM | TestFlight |
| 13 | 10/abril | 17:06 PM | TestFlight (más reciente) |

**Próximo build**: 14

**NOTA**: Build number en Xcode project (11) no coincide con TestFlight (13). Fernando incrementa manualmente en Xcode antes de cada Archive.

### 10.4 Caso abierto con Apple

| Dato | Valor |
|------|-------|
| Case ID | 102872158784 |
| Canal | Email vía developer.apple.com/contact |
| Fecha | 17/abril/2026 |
| Motivo | 9 días en Waiting for Review + Expedited sin respuesta |
| Expedited Request | Enviado 16/abril (ASC) + 18/abril (formulario web) |
| Respuesta Apple | "We'll expedite review for AUREX" (18/abril) |
| Contacto soporte | developer.apple.com/contact/topic/select → App Review |
| Teléfono USA | +1 (408) 961-2010 (inglés) |

---

## Sección 12: REGLAS DE TRABAJO

*Documentadas a partir de incidentes y feedback de sesiones 16-18/abril/2026*

### 12.1 Infraestructura

| Regla | Por qué |
|-------|---------|
| ❌ NUNCA usar `railway up` desde CLI | Sube archivos sin Nixpacks → rompe build (incidente 17/abril) |
| ❌ NUNCA eliminar `nixpacks.toml` | Railway vuelve a usar Caddy en vez de Node |
| ❌ NUNCA tocar infra sin ciclo Reporte → Propuesta → OK → Ejecución | Incidente 17/abril: deploys impulsivos causaron 1 hora de caída |
| ✅ SIEMPRE deployar backend vía push a GitHub main | Railway auto-deploya vía webhook |
| ✅ SIEMPRE verificar STATUS: SUCCESS después de push | `railway deployment list --json` |
| ✅ SIEMPRE pushear al repo correcto (aurex-backend, NO aurex-app) | Causa raíz del incidente 17/abril |

### 12.2 Código

| Regla | Por qué |
|-------|---------|
| ❌ NUNCA pushear sin validar pixel por pixel antes | Múltiples versiones de WhatsApp template con errores |
| ❌ NUNCA ejecutar sin OK explícito de Fernando | Fernando es el titular del proyecto |
| ❌ NUNCA decidir cambios de producto sin OK de Fernando | CODE decide técnico, Fernando decide producto |
| ❌ NUNCA inventar datos sin verificar contra fuente real | Build number mal (11 vs 13), repo equivocado |
| ✅ SIEMPRE verificar sintaxis (`node -c`) antes de commit | Strings rotos en i18n (italiano, árabe) |
| ✅ SIEMPRE leer código existente antes de modificar | Duplicación innecesaria de WhatsApp code |
| ✅ PWA replica EXACTO la nativa (REGLA MAESTRA) | Consistency visual entre plataformas |

### 12.3 Nativa iOS

| Regla | Por qué |
|-------|---------|
| Trabajar en branch `dev` | `main` = producción/App Store |
| NO mergear dev→main hasta que Apple apruebe build actual | Aislar variables si hay rechazo |
| REGLA DE ORO: leer código completo → analizar → presentar → OK → codificar | Evita errores por trabajar sin contexto |
| Probar en iPhone real | Simulador tiene bugs de networking/biometrics |
| Sacar y LEER screenshot antes de pedir validación | Fernando NO valida técnico, CODE sí |

### 12.4 Comunicación

| Regla | Por qué |
|-------|---------|
| Responder siempre en español | Fernando es hispanohablante |
| Un tema a la vez | Evita confusión y errores |
| NUNCA preguntar a Fernando datos que CODE puede verificar | Filesystem, código, APIs — CODE lo lee solo |
| NUNCA pedir a Fernando clickear en portales/dashboards | Buscar alternativa o documentar como pendiente |
| Cuando pido algo a Fernando, ESPERO en silencio | No mandar propuestas paralelas |

---

## Sección 13: ESTADO FEATURES PWA

*Verificado: 18/abril/2026 por Escritorio (specs) + CODE (código)*

### 13.1 Features implementadas

| Feature | Nombre | Estado | Verificado |
|---------|--------|--------|-----------|
| F1-bis | Chip ⚖️ Aviso Legal en headers | ✅ Implementado | CODE (aurex-features.js) |
| F2 | Indicador "Hoy" animado en Portfolio | ✅ Implementado | CODE (index.html) |
| F3 | Sort menus flotantes premium (4 tabs) | ✅ Implementado | CODE (aurex-features.js) |
| F4 | Long press en filas de activos | ✅ Implementado | CODE + Escritorio (aurex-features.js L5941-6271) |
| F5 | Cross-tab Portfolio/Mercados/Watchlist | ✅ Implementado | CODE + Escritorio (aurex-features.js L6100-6129) |

*F4 y F5 estaban marcados como "pendientes" en error. Verificados 18/abril/2026: el sistema `_attachLongPress` + `_showLPSheet` implementa long press en Portfolio y Mercados con acciones (Análisis IA, Editar, Compartir, Eliminar, Favoritos, Agregar a Portfolio).*

### 13.3 PWA — Estado general

| Aspecto | Estado |
|---------|--------|
| Perfil tab | ✅ Replicado de nativa (22 puntos) |
| Login screen | ✅ Replicado de nativa (logo real) |
| i18n | ❌ No tiene sistema — todo hardcodeado en español |
| Modo claro | ✅ Implementado (toggle en Preferencias) |
| Alertas | ✅ Motor completo, scope counts, WhatsApp toggle |
| IA | ✅ Señales, sort, filter, Mi Portfolio, LIVE |
| Watchlist | ✅ CRUD, comparador, compartir |
| Mercados | ✅ AUREX Pulse, 350+ activos, filtros |

---

*Manual Estructural AUREX — Versión 1.0*
*Secciones 1-13 completadas*
*Última actualización: 18/abril/2026*
