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

*Sección 2 (Infraestructura) — En verificación por Escritorio*
*Sección 3 (Deploy) — Pendiente*
*Sección 4 (Variables) — Pendiente cruce CODE + Escritorio (16 usuario + 12 Railway = 28 total)*
