# STACK COMPLETO DE HERRAMIENTAS — CODE AUREX

> **Fecha:** 17-may-2026, madrugada AR.
> **Autor:** Code (Claude Code CLI).
> **Para:** Escritorio (Claude Desktop) — para que sepa exactamente qué capacidades tengo disponibles desde el terminal de Fernando.
> **Propósito:** quitar la asimetría de info entre Code y Escritorio. Todo lo que sigue está cargado y funcionando AHORA en la sesión de Fernando. Si Escritorio necesita algo y no está acá, hay que instalarlo primero.
> **Mantenimiento:** este brief se actualiza cada vez que se instala/desinstala algo. Última actualización: 17-may-2026 ~01:30 AR.

---

## 0. RESUMEN EJECUTIVO

| Categoría | Cantidad | Estado |
|---|---|---|
| Plugins de marketplace | 4 plugins (con 56 sub-skills) | ✅ Activos |
| Skills sueltos en `~/.claude/skills/` | 11 skills | ✅ Activos |
| MCP servers conectados | 5 conectados / 7 totales | 5✅ / 2❌ |
| Tools deferred disponibles | ~30 tools | ✅ Cargadas on-demand |
| **Total capacidades invocables** | **~67 + tools** | — |

**Para Escritorio:** todo lo que ves abajo es "qué puede pedirme Code que haga directo desde su terminal sin pasos manuales".

---

## 1. PLUGINS DE MARKETPLACE (4 plugins, 56 sub-skills)

Path en disco: `~/.claude/plugins/cache/`. Se invocan con `/<nombre>` o se cargan automáticamente cuando hace falta.

### 1.1 `marketing-skills` v2.2.3 — 42 sub-skills

**Marketplace:** `claude-code-skills`. **Path:** `~/.claude/plugins/cache/claude-code-skills/marketing-skills/2.2.3/skills/`.

#### Categorías y uso AUREX

| Sub-skill | Para qué sirve en AUREX |
|---|---|
| `marketing-context` | Lee `MARKETING_CONTEXT_AUREX_v2.md` y carga brand voice/ICP antes de cualquier otra acción MKT |
| `copywriting` | Genera copy de landing, headlines, taglines (idioma maestro EN, después se traduce) |
| `copy-editing` | Edita texto en fase final de cada bloque |
| `content-strategy` | Calendario editorial multi-canal, pilares de contenido |
| `content-creator` / `content-production` / `content-humanizer` | Producción individual de piezas + anti AI-slop |
| `social-content` | Posts individuales para canales (Telegram, IG, X, etc.) |
| `social-media-manager` | Estrategia global multi-canal (la usamos para `PLAN_SOCIAL_MEDIA_FASE_1_AUREX_v3.md`) |
| `social-media-analyzer` | Métricas y engagement post-Fase 1 |
| `x-twitter-growth` | Tactics warm-up X (línea @aurex_live) |
| `app-store-optimization` | ASO Build 17 iOS + Build 33 Android cuando subamos a producción |
| `seo-audit` / `programmatic-seo` / `ai-seo` / `schema-markup` | SEO landing v2/v3 + blog SEO Fase 4 |
| `site-architecture` | Estructura URL/sitemap aurex.live |
| `analytics-tracking` | UTMs + GA + tracking conversiones landing |
| `ab-test-setup` | Tests A/B post-launch landing |
| `brand-guidelines` | Guías marca AUREX (paleta dorada #D4A017, fonts) |
| `marketing-strategy-pmm` | Estrategia product marketing |
| `marketing-demand-acquisition` | Adquisición canales pagos (post MRR justificado) |
| `marketing-ideas` | Brainstorm campañas |
| `marketing-ops` | Ops mensual MKT |
| `marketing-psychology` | Frameworks psicológicos para CTAs |
| `prompt-engineer-toolkit` | Optimizar prompts internos |
| `cold-email` / `email-sequence` | Newsletter onboarding + secuencias post-signup |
| `referral-program` | Programa referidos 1+1 (PLAN_MKT v3.0 sec 2.6) |
| `churn-prevention` | Reducir churn PRO/ELITE post-pago |
| `pricing-strategy` | Validar $9.99 PRO / $19.99 ELITE vs competidores |
| `paid-ads` / `ad-creative` | Anuncios pagos Meta/Google cuando justifique presupuesto |
| `campaign-analytics` | Análisis campañas pagas |
| `free-tool-strategy` | Tools gratuitas como lead magnets |
| `competitor-alternatives` | Lo usamos para benchmark vs TradingView/Investing/Seeking Alpha |
| `launch-strategy` | Estrategia lanzamiento post-aprobación Apple/Google |
| `page-cro` / `form-cro` / `signup-flow-cro` / `popup-cro` / `onboarding-cro` / `paywall-upgrade-cro` | **6 sub-skills CRO** — optimización conversión landing + signup + paywall |

**Cuándo usa Escritorio esto:** cuando le pide a Code "genera plan MKT", "optimiza este copy", "audita SEO", "diseña secuencia email". Code internamente carga el skill correspondiente.

### 1.2 `ui-ux-pro-max-skill` v2.5.0 — 7 sub-skills

**Path:** `~/.claude/plugins/cache/ui-ux-pro-max-skill/ui-ux-pro-max/2.5.0/.claude/skills/`.

| Sub-skill | Para qué sirve en AUREX |
|---|---|
| `ui-ux-pro-max` (master) | 50+ estilos visuales, 161 paletas, 57 font pairings, 99 UX guidelines. Lo usé para diseñar landing v1/v2 + propuestas estéticas (Stellar Cartography / Tactical Display / Bauhaus / Tokyo). |
| `design` | Diseño visual de bloques individuales |
| `banner-design` | Banners para redes sociales (Telegram cover, X header, IG profile) |
| `ui-styling` | Sistemas de tokens CSS (paleta dorada AUREX) |
| `brand` | Coherencia de marca cross-canal |
| `slides` | Decks/slides estilo presentaciones |
| `design-system` | Sistema de componentes reutilizables |

**Compatible con stack vanilla AUREX:** sí, soporta HTML/CSS puro (los 10 stacks que cubre incluyen HTML/CSS, además de React/Vue/Next/etc.).

### 1.3 `claude-plugins-official` — 6 plugins oficiales Anthropic

**Path:** `~/.claude/plugins/cache/claude-plugins-official/`.

| Plugin | Uso AUREX |
|---|---|
| `frontend-design` | **Base obligatoria** para landing. Forza dirección estética antes de codear. Lo usé para landing v1 + propuestas. |
| `playwright` | MCP server (ver sec 3). Screenshots fullpage de landing, testing cross-browser. |
| `firebase` | MCP server (ver sec 3). Backend AUREX (cuando aplique). |
| `telegram` | MCP server (ver sec 3). **Actualmente desconectado** — re-evaluar cuando arranque canal @aurex_ai en Fase 1. |
| `swift-lsp` | Language server Swift. Para AurexApp iOS (Build 17/25). |
| `skill-creator` | Crear skills custom propias si necesitamos. |

### 1.4 `shadcnblocks-marketplace` v0.1.0 — `shadcn-ui` (1 plugin)

**Path:** `~/.claude/plugins/cache/shadcnblocks-marketplace/shadcnblocks/0.1.0/skills/shadcn-ui/`.

- 1.338 blocks premium + 1.189 componentes free.
- **NO usable en AUREX porque requiere React/Next.js + Tailwind.** Decisión cerrada: stack vanilla.
- Queda instalado por si en el futuro decidimos cambiar stack (no es la decisión actual).

---

## 2. SKILLS SUELTOS EN `~/.claude/skills/` (11 skills)

Instalados directo (no via marketplace). Path: `~/.claude/skills/`.

| # | Skill | Para qué sirve en AUREX |
|---|---|---|
| 1 | `brandkit` | Sistema de marca (paleta + tipografía + reglas). Coherente con `Aurex — Sistema de Identidad Visual v1.0.html`. |
| 2 | `canvas-design` | **(Recién instalado 17-may)** Arte visual PNG/PDF basado en "design philosophy" 4-6 párrafos. Lo usé para generar 4 propuestas OG image AUREX (Stellar Cartography Pro / Tactical Display / Bauhaus Currency / Tokyo Trading Floor). |
| 3 | `design-taste-frontend` | Frontend con criterio estético (anti AI-slop). Complementa `frontend-design`. |
| 4 | `find-skills` | Meta-skill para buscar otras skills disponibles. |
| 5 | `full-output-enforcement` | Forzar respuestas completas sin truncar (útil cuando Code da resúmenes que pierden detalle). |
| 6 | `high-end-visual-design` | Diseño visual premium/lujo. Para piezas hero, OG image, banners aspiracionales. |
| 7 | `image-to-code` | Convertir imagen/screenshot → código HTML/CSS. Útil si Escritorio manda un mockup en Figma/Photoshop y queremos código exacto. |
| 8 | `imagegen-frontend-web` | Generar imágenes para web (placeholders, decorativas). |
| 9 | `minimalist-ui` | UI minimalista (estilo "Tokyo Trading Floor" del OG image v5). |
| 10 | `redesign-existing-projects` | Rediseñar proyectos existentes. Útil para iterar landing v1 → v2 → v3. |
| 11 | (libre) | Slot para próximas instalaciones según necesidad. |

**Costo:** $0 — todos los skills son open-source / gratis.

---

## 3. MCP SERVERS — 7 configurados, 5 conectados

Path config: `~/.claude.json`. Comando para listar: `claude mcp list`.

| MCP server | Estado al 17-may | Para qué sirve en AUREX |
|---|---|---|
| **playwright** | ✅ Conectado | **Game-changer:** Code abre navegador headless, levanta servers locales, toma screenshots fullpage de landing en mobile/desktop, autocorrige problemas responsive. Lo usé para landing v1 + screenshots demo. |
| **firecrawl** | ✅ Conectado (instalado 17-may) | Scraping web en vivo. Pricing pages, structure semántica competidores. Lo usé para benchmark v2 (TradingView $12.95/mo / Seeking Alpha $25/mo verificados literal). API key Fernando guardada en `~/Desktop/CODE/SECRET Firecrawl API.txt`. |
| **firebase** | ✅ Conectado | Backend tooling. Lo usaremos si Firebase Auth o Crashlytics se integran a AurexApp. |
| **google-drive** | ✅ Conectado | Acceso a Google Drive de Fernando para docs externos. |
| **canva** | ❌ Needs auth | No autenticado. Pendiente decisión: ¿usamos Canva o no? Si sí, Fernando se logea una vez y queda. |
| **telegram** | ❌ Failed | Plugin oficial Telegram. Falla al conectar. Re-evaluar cuando arranque canal @aurex_ai (Fase 1 MKT). |

**MCP que NO instalamos (evaluados y descartados):**
- **Figma to Code MCP**: Fernando no tiene cuenta Figma (descartado 17-may).
- **Vercel Agent Skills**: Stack es GitHub Pages, no Vercel.

**Modo alternativo Firecrawl:** además del MCP server, Code puede llamar a la **API REST de Firecrawl directo con `curl`** (`https://api.firecrawl.dev/v2/scrape` + Authorization Bearer). Lo usé para benchmark v2 sin necesitar reinicio de sesión Claude Code. Verificado funcional 17-may.

---

## 4. TOOLS DEFERRED (cargadas on-demand)

Son ~30 herramientas que aparecen como deferred y se cargan cuando hace falta. Las más usadas en AUREX:

| Tool | Para qué |
|---|---|
| `Bash` | Ejecutar comandos shell (git, curl, mkdir, python3, etc.) |
| `Read` / `Edit` / `Write` | Manipular archivos del filesystem |
| `WebFetch` | Fetch + procesamiento LLM de cualquier URL pública. Alternativa a Firecrawl para info más rápida y resumida. |
| `WebSearch` | Búsqueda web. Última info actualizada sobre cualquier tema. |
| `Agent` (sub-agentes) | Lanzar agentes especializados (Explore, Plan, claude-code-guide, general-purpose) sin gastar mi propia conversación |
| `TaskCreate` / `TaskUpdate` / `TaskList` | Sistema de gestión de tasks visible para Fernando |
| `ScheduleWakeup` | Auto-pacing para tareas largas |
| **Firebase tools** (mcp__plugin_firebase__*) | Crashlytics, deploy, get_sdk_config, etc. — para integración Firebase si aplica |
| **Playwright tools** (mcp__plugin_playwright_playwright__*) | browser_navigate, browser_take_screenshot, browser_click, etc. — para automatización web |
| **Google Drive tools** (mcp__claude_ai_Google_Drive__*) | search_files, read_file_content, create_file, etc. — acceso al Drive de Fernando |

---

## 5. CÓMO LO USA ESCRITORIO EN LA PRÁCTICA

Escritorio NO ejecuta nada directo. Escritorio le PIDE a Code (vía Fernando, copy-paste a chat) que use estas herramientas. Ejemplos reales:

### Ejemplo 1: Escritorio quiere validar precios de competidores
**Escritorio le dice a Fernando:** "pedile a Code que verifique los precios de TradingView, Investing.com y Seeking Alpha en vivo, no usemos los datos viejos del RESEARCH_MKT".

**Code ejecuta:** Firecrawl direct curl a las 3 pricing pages → extrae precios literales → escribe brief `BENCHMARK_v2_COMPETIDORES_REALES_17MAY.md` → commit + push GitHub.

**Escritorio lee:** `https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/BENCHMARK_v2_COMPETIDORES_REALES_17MAY.md?nocache=<ts>`.

### Ejemplo 2: Escritorio quiere ver una propuesta de landing renderizada
**Escritorio le dice a Fernando:** "pedile a Code que arme la landing v3 y me pase el screenshot Playwright".

**Code ejecuta:** construye HTML/CSS/JS → levanta server local con `python3 -m http.server` → Playwright `browser_navigate` + `browser_take_screenshot` fullPage → PNG.

**Resultado:** Code te muestra el PNG al chat + opcional commit a repo.

### Ejemplo 3: Escritorio quiere generar arte visual para social
**Escritorio le dice:** "Code, hacé 4 propuestas de OG image AUREX con estéticas distintas, mismo tagline".

**Code ejecuta:** invoca skill `canvas-design` → genera 4 design philosophies .md → renderiza 4 PNGs con Pillow + fonts del skill → guarda en disco.

---

## 6. COSTOS

**Total mensual recurrente:** **$0**.

| Item | Costo |
|---|---|
| Todos los skills/plugins (4 + 11) | $0 (open source) |
| MCP servers (Playwright/Firebase/Google Drive) | $0 |
| Firecrawl free tier | $0 (500 scrapes/mes) |
| Claude API tokens (workflow traducción) | $5-15/mes (estimado v3.0 sec 2.3) |
| Pillow / Python / git / curl | $0 (incluido OS) |

**Costo de instalación adicional:** $0 — todas las herramientas listadas son gratuitas y permanentes.

---

## 7. QUÉ NO TENEMOS Y CUÁNDO HABRÍA QUE EVALUARLO

| Item | Cuándo evaluarlo |
|---|---|
| Cuenta Figma + Figma MCP | Solo si Fernando + Escritorio quieren diseñar visualmente y pasarme designs (hoy descartado) |
| Buffer Business plan ($15/mo) | Cuando se active Instagram feed + LinkedIn posting (Fase 2 MKT) |
| Resend API (email) | Cuando se active newsletter semanal (Fase 1 MKT) |
| TikTok Content Posting API | Cuando aprueben Business Verification TikTok (en proceso) |
| ElevenLabs paid + Runway paid | Si los free tiers de búho v2 quedan cortos (Fase 2-3) |
| Wire services (EIN Presswire, Chainwire) | Lanzamiento público + milestones (Fase 4) |

---

## 8. CÓMO ESCRITORIO SE MANTIENE AL DÍA CON ESTE BRIEF

- **Acceso GitHub:** `https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/STACK_HERRAMIENTAS_CODE_AUREX_17MAY.md?nocache=<ts>`
- **Acceso Dropbox (Fernando local):** `~/Dropbox/AUREX/MAPA DE TRABAJO/STACK_HERRAMIENTAS_CODE_AUREX_17MAY.md`
- **Trigger de actualización:** cada vez que Code instale/desinstale algo (skill, plugin, MCP, API key), ACTUALIZA este brief con sufijo `_DD-MMM` y commitea + sincroniza Dropbox. Mantiene historial versionado.

---

## 9. CONTACTO DIRECTO ESCRITORIO ↔ CODE

Si Escritorio necesita una capacidad nueva:
1. Describe el caso de uso a Fernando.
2. Fernando se lo dice a Code en chat.
3. Code investiga si ya existe la skill/plugin/MCP que lo cubre.
4. Code instala si hace falta (sin reiniciar sesión — todo se hace en vivo).
5. Code actualiza este brief con la nueva capacidad.

---

**Fin v1 del brief stack.** Próxima versión cuando se agregue/quite algo del stack.
