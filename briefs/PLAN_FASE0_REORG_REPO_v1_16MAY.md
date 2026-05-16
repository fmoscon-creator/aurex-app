# PLAN FASE 0 — Reorganización del repo `aurex-app` (archivo-por-archivo)

> **Fecha:** 16-may-2026, cierre noche AR.
> **Autor:** Code (Claude Code CLI).
> **Para:** Escritorio (revisión cruzada) + Fernando (OK final).
> **Base:** `CONSOLIDADO_MKT_LANDING_v2_16MAY.md` (decisión URL Opción A, stack vanilla, 8 idiomas día 1).
> **Regla aplicada:** `feedback_plan_antes_de_tocar.md` — plan textual con archivos+cambios+qué NO se toca, esperar OK antes de Edit.
> **Propósito:** dejar mapeado en detalle qué archivo se mueve, qué se queda, qué se crea — antes de tocar nada. Si Escritorio o Fernando ven algo que no cierra, lo arreglamos en el plan, no en el código.

---

## 0. Resumen ejecutivo (3 líneas)

1. La PWA actual (14 archivos + 2 carpetas) se mueve a `/app/`. La nueva landing va al root.
2. Documentación del proyecto (`CLAUDE.md`, `CONTEXTO.md`, etc., ~20 archivos .md) se queda donde está — no afecta a la web.
3. **Cero impacto en infraestructura externa**: dominio aurex.live, GitHub Pages, Apple/Google reviewers, demo accounts.

---

## 1. Mapa actual del repo (verificado en disco)

### 1.1 Archivos PWA en root (lo que SÍ sirve la web)

| Archivo | Tamaño | Tipo | Acción |
|---|---|---|---|
| `index.html` | 299 KB / 4.332 líneas | Entry point PWA | **MOVER a `/app/index.html`** |
| `aurex-v3.js` | 264 KB / 3.927 líneas | Lógica principal app | **MOVER a `/app/aurex-v3.js`** |
| `aurex-features.js` | 437 KB / 6.456 líneas | Features extendidas | **MOVER a `/app/aurex-features.js`** |
| `aurex-i18n.js` | 197 KB / 862 líneas | Sistema 8 idiomas | **MOVER a `/app/aurex-i18n.js`** + COPIAR a `/assets/shared/aurex-i18n.js` |
| `manifest.json` | 654 B | PWA manifest | **MOVER + REESCRIBIR** (cambiar `start_url` `/aurex-app/` → `/app/`) |
| `service-worker.js` | 1 línea (desactivado) | SW desactivado | **MOVER a `/app/service-worker.js`** |
| `privacy.html` | 3 KB | Página privacy policy | **MOVER a `/app/privacy.html`** |
| `logo-aurex.png` | 146 KB | Logo usado por PWA y otros | **DEJAR en root** (también lo usa la landing nueva) |
| `assets/icons/` | 15 PNGs (1024 a 20px) | Íconos PWA + favicon | **DEJAR en root** (compartido landing + PWA) |
| `assets/logo/` | 3 archivos (2 SVG + README) | Logo SVG dark + transparent | **DEJAR en root** (compartido) |
| `img/onboarding/` | 6 JPGs | Capturas onboarding PWA | **MOVER a `/app/img/onboarding/`** |

### 1.2 Archivos a CREAR para la landing nueva

| Archivo | Propósito |
|---|---|
| `index.html` (NUEVO en root) | Landing nueva con 12 bloques + selector 8 idiomas + dark mode fijo |
| `assets/landing/styles.css` | CSS de la landing (si no va inline) |
| `assets/landing/landing.js` | JS de la landing (selector idioma + animaciones + tracking) |
| `assets/landing/logo-aurex-clean.svg` | Logo SVG sin subtítulo "INVEST · AI" extraído del sistema visual v1.0 |
| `assets/shared/aurex-i18n.js` | Copia/symlink del i18n para reutilizarlo desde landing |
| `_redirects` o `redirect.html` (a evaluar) | Redirect del index viejo path a `/app/` por si hay links externos compartidos |

### 1.3 Archivos que se QUEDAN sin tocar (root)

Documentación del proyecto. GitHub Pages los expone pero ninguno tiene rutas críticas:

| Archivo | Razón |
|---|---|
| `CLAUDE.md` | Manifiesto Code, lectura obligatoria sesión |
| `CONTEXTO.md` | Estado vivo del proyecto |
| `DAILY_STATUS.md` | Cron del backend |
| `INICIO_AUREX.md` | Onboarding sesión |
| `PLAN_MKT.md`, `RESEARCH_MKT.md`, `RESEARCH_VISUAL.md` | Documentos estratégicos MKT |
| `README.md` | README repo público |
| `PLAN-ACCION.md`, `BUGFIX_HISTORIAL.md`, `REGLAS-DE-ORO-AUREX.md` | Histórico operativo |
| `METADATA-APPSTORE.md` | Metadata App Store |
| `AI_SIGNALS_DESIGN.md`, `AUREX-IA-DOC.md`, `AUREX-MERCADOS-DOC.md`, `AUREX-PORTFOLIO-DOC.md` | Docs producto |
| `Aurex — Sistema de Identidad Visual v1.0.html` | Sistema visual (queda como referencia interna) |
| Carpetas: `briefs/`, `docs/`, `designs/`, `marketing/`, `memory/`, `screenshots-ia/`, `scripts/`, `visual-qa/`, `.github/`, `.claude/` | Sin cambios |

---

## 2. Cambios de paths internos requeridos

### 2.1 En `/app/index.html` (ex-root)

| Línea / referencia | Antes (root) | Después (en `/app/`) | Estado |
|---|---|---|---|
| L432 `<link rel="manifest">` | `manifest.json` | `manifest.json` | ✅ Relativo, sirve igual |
| L591 script i18n | `aurex-i18n.js?v=1` | `aurex-i18n.js?v=1` | ✅ Relativo |
| L592 script v3 | `aurex-v3.js?v=149` | `aurex-v3.js?v=149` | ✅ Relativo |
| L593 script features | `aurex-features.js?t=...` | `aurex-features.js?t=...` | ✅ Relativo |
| L1234-1261 `<img src="img/onboarding/*.jpg">` | `img/onboarding/...` | `img/onboarding/...` | ✅ Relativo (la carpeta también se mueve) |
| L1572 + L1584 + L1694 + L1896 imágenes externas (CDN) | URLs absolutas https | (sin cambios) | ✅ No afecta |
| L2282 `<img src="logo-aurex.png">` | `logo-aurex.png` | `../logo-aurex.png` | ⚠️ **CAMBIO** porque logo queda en root |
| Iconos en `assets/icons/` referenciados desde manifest | path absoluto github.io | path absoluto `https://aurex.live/assets/icons/...` | ⚠️ **CAMBIO** (ver 2.2) |

### 2.2 En `/app/manifest.json` (reescritura completa)

```json
{
  "name": "Aurex — Inversión con IA",
  "short_name": "Aurex",
  "description": "Plataforma Global de Inversión con Inteligencia Artificial",
  "start_url": "/app/",
  "scope": "/app/",
  "display": "standalone",
  "background_color": "#0D0D1A",
  "theme_color": "#D4A017",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/assets/icons/aurex-icon-180x180.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/assets/icons/aurex-icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

Cambios respecto al actual:
- `start_url`: `/aurex-app/` → `/app/`
- `scope` (nuevo): `/app/` para limitar el alcance PWA a la subcarpeta
- `icons.src`: URLs absolutas github.io → paths absolutos `/assets/icons/...` (que sirven desde aurex.live root)
- Usa `aurex-icon-180x180.png` y `aurex-icon-512x512.png` que SÍ existen (verificado), reemplazando `icon-192.png` y `icon-512.png` que NO existen en el repo

### 2.3 En `/app/aurex-v3.js` (L563) y `/app/aurex-features.js` (L628)

```js
// Antes
navigator.serviceWorker.register('/aurex-app/service-worker.js')

// Después
navigator.serviceWorker.register('/app/service-worker.js')
```

⚠️ El SW está desactivado igual (`// Service Worker desactivado`), así que **funcionalmente no cambia nada**, pero el path debe actualizarse para que la PWA sea consistente cuando algún día se reactive.

---

## 3. Estructura final del repo después de FASE 0

```
aurex-app/
├── index.html                          ← LANDING NUEVA (root)
├── assets/
│   ├── icons/                          ← compartido landing + PWA (sin cambios)
│   ├── logo/                           ← compartido (sin cambios)
│   ├── landing/                        ← NUEVO
│   │   ├── styles.css
│   │   ├── landing.js
│   │   └── logo-aurex-clean.svg
│   └── shared/                         ← NUEVO
│       └── aurex-i18n.js (copia para landing)
├── app/                                ← TODA la PWA actual
│   ├── index.html                      (ex-root index.html con path logo ajustado)
│   ├── aurex-v3.js                     (path SW actualizado)
│   ├── aurex-features.js               (path SW actualizado)
│   ├── aurex-i18n.js
│   ├── manifest.json                   (reescrito)
│   ├── service-worker.js
│   ├── privacy.html
│   └── img/
│       └── onboarding/                 (6 JPGs)
├── logo-aurex.png                      ← se queda en root (compartido)
├── briefs/                             ← sin cambios
├── docs/                               ← sin cambios
├── designs/                            ← sin cambios
├── marketing/                          ← sin cambios
├── memory/                             ← sin cambios
├── screenshots-ia/                     ← sin cambios
├── scripts/                            ← sin cambios
├── visual-qa/                          ← sin cambios
├── .github/                            ← sin cambios
├── .claude/                            ← sin cambios
└── [archivos .md documentación]        ← sin cambios
```

---

## 4. Riesgos identificados y mitigación

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| Usuarios con PWA instalada (start_url=/aurex-app/) la rompen al actualizar | Baja | Bajo | El `start_url` actual `/aurex-app/` no funciona ya (la web sirve aurex.live root). Probablemente nadie tiene PWA instalada activamente. Si los hay, abrir la app desde el icono fallará y tendrán que reinstalar. Aceptable. |
| Links externos compartidos (WhatsApp/Telegram/email) apuntan a aurex.live/ con paths de la PWA (ej. `aurex.live/#tab-portfolio`) | Media | Medio | Agregar JS en la landing nueva: si la URL llega con un hash `#tab-*` específico, redirigir a `/app/` con el mismo hash. Documenta los 4-5 hashes más usados. |
| Apple Build 17 metadata referencia aurex.live | Baja | **Alto** si se rompe demo account | Verificar antes de tocar: el campo "App Review URL" o "Support URL" en App Store Connect. Si apunta a aurex.live, el reviewer verá la landing nueva (mejor que la PWA, más comprensible). Si apunta a aurex.live/algo-específico, ajustar. |
| Google Play Build 33 metadata referencia aurex.live | Baja | Bajo | Mismo análisis. La landing nueva es más comprensible para reviewers que la PWA cruda. |
| Service worker registra path viejo `/aurex-app/service-worker.js` desde versión cacheada en navegador del usuario | Baja | Bajo | SW desactivado, no afecta. Cuando se reactive, los usuarios bajan la versión nueva. |
| Iconos PWA del manifest viejo (icon-192.png, icon-512.png) referenciados con URLs absolutas github.io | Cierta | **Ya está roto hoy** | Verificado: esos archivos no existen en el repo, manifest actual está roto en ese punto. Mi reescritura usa los íconos que SÍ existen. |
| GitHub Pages tarda 1-2 min en hacer deploy tras push | Cierta | Bajo | Esperar el deploy + curl verificación antes de cerrar la tarea. |

### 4.1 Verificación previa CRÍTICA antes de tocar

**Antes de hacer cualquier `git mv`, verificar:**

1. **¿La metadata de App Store Build 17 referencia algún path específico de aurex.live?**
   - Ir a App Store Connect → AUREX → App Review Information.
   - Anotar todos los URLs que aparezcan.
   - Si alguno apunta a `aurex.live/X` donde X es un path de la PWA actual, evaluar.
   - **Quién verifica:** Escritorio (tiene Chrome con sesión Apple). Code no tiene acceso a App Store Connect.

2. **¿La metadata de Google Play Console Build 33 referencia algún path específico?**
   - Misma verificación.
   - **Quién verifica:** Escritorio o Fernando.

3. **¿El backend (Railway) tiene algún endpoint que devuelve URLs de aurex.live con path específico?**
   - Verificable por grep en repo `aurex-backend`.
   - **Quién verifica:** Code (paralelo).

---

## 5. Secuencia de ejecución (post-OK)

| # | Acción | Tool | Verificación |
|---|---|---|---|
| 0 | **Verificación previa de sec 4.1 (Escritorio + Code)** | Manual | Documentar URLs encontradas en este plan v2 |
| 1 | Crear carpeta `app/` y `app/img/` | `mkdir -p` | `ls app/` muestra vacío |
| 2 | Mover `index.html` → `app/index.html` | `git mv` | git status muestra rename |
| 3 | Mover `aurex-v3.js` → `app/aurex-v3.js` | `git mv` | idem |
| 4 | Mover `aurex-features.js` → `app/aurex-features.js` | `git mv` | idem |
| 5 | Mover `aurex-i18n.js` → `app/aurex-i18n.js` | `git mv` | idem |
| 6 | Mover `service-worker.js` → `app/service-worker.js` | `git mv` | idem |
| 7 | Mover `privacy.html` → `app/privacy.html` | `git mv` | idem |
| 8 | Mover carpeta `img/` → `app/img/` | `git mv` | idem |
| 9 | Reescribir `app/manifest.json` (mover + reescribir) | `git mv` + `Write` | manifest.json en /app/ con `start_url: "/app/"` y íconos correctos |
| 10 | Editar `app/index.html` L2282: `logo-aurex.png` → `../logo-aurex.png` | `Edit` | grep confirma |
| 11 | Editar `app/aurex-v3.js` L563: path SW | `Edit` | grep confirma `/app/service-worker.js` |
| 12 | Editar `app/aurex-features.js` L628: path SW | `Edit` | idem |
| 13 | Crear `assets/landing/` con `styles.css`, `landing.js`, `logo-aurex-clean.svg` | `Write` × 3 | archivos existen |
| 14 | Crear `assets/shared/aurex-i18n.js` (copia del `/app/aurex-i18n.js`) | `cp` | md5 igual |
| 15 | Crear `index.html` NUEVO en root con landing maqueteada (12 bloques) | `Write` | HTML válido |
| 16 | Commit + push | `git` | GitHub Pages workflow corre |
| 17 | Esperar deploy (~2 min) + verificar | `curl` | `aurex.live/` = landing, `aurex.live/app/` = PWA, sin 404s |
| 18 | Smoke test 8 idiomas + dark mode + CTAs + links a stores | `curl` + visual | OK |

---

## 6. Lo que este plan NO toca explícitamente

- Backend Railway (repo `aurex-backend`).
- App nativa (repo `AurexApp`).
- DNS de aurex.live (configurado en GitHub Settings, no en el repo).
- Workflow `.github/workflows/static.yml` (sigue funcionando igual con la nueva estructura).
- Memorias (`memory/`).
- Briefs (`briefs/`).
- Documentación operativa del proyecto (los ~20 .md de root).

---

## 7. Decisiones pendientes para Escritorio + Fernando

**Para Escritorio:**

1. **¿OK al plan archivo-por-archivo de las secciones 1-3?**
2. **¿Podés verificar la sec 4.1 punto 1 y 2** (App Store Connect Build 17 + Google Play Console Build 33 — ¿algún URL de aurex.live con path específico que se rompa al mover PWA a `/app/`)?

**Para Fernando:**

3. **OK general al plan** (una sola aprobación, después corre todo según sec 5 en autónomo hasta cerrar FASE 0).

---

## 8. Tiempo estimado

| Bloque | Tiempo |
|---|---|
| Verificación sec 4.1 (Escritorio + Code) | 15-30 min |
| Ejecución sec 5 (pasos 1-12: mover archivos + reescribir manifest + ajustar paths) | 30 min |
| Creación landing nueva (paso 15: 12 bloques con copy EN + i18n setup) | 4-6 hs (depende de Escritorio entregando copy EN bloque por bloque) |
| Traducción a 7 idiomas (Code via Claude API) | 30 min |
| Smoke test + ajustes finales | 1 hs |
| **Total FASE 0** | **6-8 hs** distribuidas entre Code + Escritorio |

---

## 9. Acceso para Escritorio

- Raw GitHub: `https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/PLAN_FASE0_REORG_REPO_v1_16MAY.md`
- Con bypass cache: agregar `?nocache=<timestamp>`.

---

**Fin v1.** Esperando OK de Escritorio (sec 7 puntos 1 y 2) + OK de Fernando (sec 7 punto 3) antes de tocar UN solo archivo.
