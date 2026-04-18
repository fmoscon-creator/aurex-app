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

*Sección 3 (Deploy) — Pendiente*
*Sección 5 (Base de datos) — Pendiente verificación tablas alerts vs alertas*
*Sección 6 (APIs/Endpoints) — Pendiente*
