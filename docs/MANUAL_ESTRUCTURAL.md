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

*Sección 6 (APIs/Endpoints) — Pendiente*
