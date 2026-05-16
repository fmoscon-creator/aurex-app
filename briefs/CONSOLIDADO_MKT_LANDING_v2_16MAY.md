# CONSOLIDADO MKT + LANDING v2 — AUREX

> **Fecha:** 16-may-2026, cierre de noche AR.
> **Autores:** Code (Claude Code CLI) + Escritorio (Claude Desktop) — opinión cruzada.
> **Base estratégica:** `PLAN_MKT.md` v3.0 (Code, 2-may-2026) + `RESEARCH_MKT.md` (cierre 29-abr-2026) + `Aurex — Sistema de Identidad Visual v1.0.html` (marzo 2026). Los 3 archivos viven en la raíz del repo `aurex-app`.
> **Propósito:** dejar cerrado en un solo documento qué se hace, en qué orden, quién lo hace y con qué insumos. Plan ejecutable, no marco teórico nuevo.
> **CHANGELOG v1 → v2 (16-may noche):** corrección de Escritorio sobre idiomas de la landing (8 desde día 1, no 3) en secciones 2.1 y 2.4 + confirmación de OK 1 y OK 2 de Fernando en sección 6. Resto del documento sin cambios.

---

## 0. Resumen ejecutivo (5 líneas)

1. **El PLAN_MKT v3.0 se aprueba como base.** Posicionamiento, idiomas, calendario, pilares, KPIs, presupuesto y reparto Code/Escritorio quedan vigentes sin cambios.
2. **3 ajustes de Escritorio incorporados como decisiones cerradas** (sección 1).
3. **FASE 0 = construir la landing aurex.live** esta semana. La PWA actual se mueve a `aurex.live/app`.
4. **FASE 1 (activar 11 canales)** arranca solo después de FASE 0 lista — sin landing publicada, los canales no tienen destino.
5. **Cero nuevos costos.** Identidad visual ya definida en `Aurex — Sistema de Identidad Visual v1.0.html` (paleta, logo, tipografía, íconos) → la landing se construye con lo que ya existe.

---

## 1. Las 3 decisiones cerradas (input de Escritorio)

### Decisión 1 — URL Opción A confirmada

| Elemento | Destino final |
|---|---|
| **Landing institucional** | `https://aurex.live/` (home) |
| **PWA / app web operativa** | `https://aurex.live/app` |
| **Blog SEO** | `https://aurex.live/blog` (Fase 4 según v3.0) |
| **App nativa iOS** | Link directo App Store desde landing |
| **App nativa Android** | Link directo Play Store desde landing |

**Implicancia técnica:** la PWA actual sirve hoy desde el root del GitHub Pages del repo `aurex-app`. Hay que mover `index.html` + `assets/` actuales a una subcarpeta `/app/` y poner la nueva landing en el root. GitHub Pages soporta este patrón sin tocar configuración DNS — solo requiere reorganizar la estructura del repo.

**Esta decisión NO requiere más validación.** Fernando ya la confirmó vía Escritorio. El consolidado la deja cerrada.

### Decisión 2 — Orden de fases: landing primero, canales después

**Razón:** los 11 canales del v3.0 (Telegram, WhatsApp, X, IG, TikTok, YouTube, LinkedIn, blog, press, email, referidos) todos terminan empujando tráfico a un destino. Sin landing pública, ese destino es la PWA actual sin contexto comercial (no comunica planes, no convierte). Publicar en redes antes de tener landing es desperdiciar el tráfico inicial.

**Por eso este consolidado introduce una FASE 0** que el v3.0 no tenía explícita:

| Fase | Trabajo | Plazo objetivo |
|---|---|---|
| **FASE 0** | Construir landing en `aurex.live` + mover PWA a `/app/` | Esta semana (16-22 may) |
| **FASE 1** | Activar 5 canales 1080×1080 (Telegram, WhatsApp, X, IG Stories, Email) | Después de FASE 0 (semana 23-29 may) |
| **FASE 2** | TikTok / Reels / Shorts + IG feed | Junio 2026 |
| **FASE 3** | YouTube canal + LinkedIn Company | Junio-julio 2026 |
| **FASE 4** | Press releases + blog SEO + programa de referidos | Julio-agosto 2026 |

Las fases 1-4 son las del v3.0 sin cambios. La novedad es la FASE 0 como prerequisito de todas.

### Decisión 3 — La landing se construye con insumos existentes (cero invento)

Todo lo que la landing necesita ya está documentado:

| Pieza | Dónde vive | Estado |
|---|---|---|
| Posicionamiento (qué es AUREX, qué no es) | `PLAN_MKT.md` sec 1.1 + Punto 1 documento estratégico | ✅ listo |
| Taglines en 3 idiomas (EN, ES, PT) | `PLAN_MKT.md` sec 1.10 | ✅ listo |
| Descripción de motor (24 variables) | `PLAN_MKT.md` sec 1.3 | ✅ listo |
| 350 activos por tipo de instrumento | `PLAN_MKT.md` sec 1.2 | ✅ listo |
| 8 idiomas activos | `PLAN_MKT.md` sec 1.4 + `aurex-i18n.js` | ✅ listo (sistema operativo en PWA) |
| Planes y precios (FREE / PRO / ELITE) | `PLAN_MKT.md` sec 1.7 | ✅ listo |
| Disclaimers regulatorios 8 idiomas | `aurex-i18n.js` (PWA) | ✅ listo |
| Paleta de colores oficial | `Aurex — Sistema de Identidad Visual v1.0.html` | ✅ listo |
| Logo principal (SVG, doble borde dorado #D4A017 sobre fondo #1A0D00) | mismo doc | ✅ listo |
| App icons todos los tamaños iOS + Android + PWA | mismo doc | ✅ listo |
| Tipografía + jerarquía | mismo doc | ✅ listo |

**La landing es un trabajo de armado, no de creación de contenido nuevo.**

⚠️ **Salvedad sobre identidad visual:** el archivo `Aurex — Sistema de Identidad Visual v1.0.html` incluye en el logo principal el subtítulo **"INVEST · AI"**. La memoria `project_assets_visuales.md` documenta esa frase como **prohibida para uso externo** porque contradice el lenguaje seguro de Build 17 aprobado por Apple ("Real-time market data tracker"). **La landing debe usar la versión del logo SIN subtítulo "INVEST · AI"** + el tagline público "Real-time global markets terminal" (EN) / "Terminal de mercados globales" (ES) / "Terminal de mercados globais" (PT) — según sec 1.10 del PLAN_MKT v3.0.

---

## 2. FASE 0 — Plan de construcción de la landing

### 2.1 Stack técnico

| Elemento | Decisión | Razón |
|---|---|---|
| **Framework** | HTML + CSS + JS vanilla | Memoria `project_landing_stack_decision.md`. Decisión consensuada Code+Escritorio 13-may. Sin React/Next/Astro. |
| **Idiomas** | **8 idiomas completos desde día 1** (EN maestro + ES/PT/ZH/HI/AR/FR/IT via `aurex-i18n.js` existente) | Sistema i18n ya implementado y operativo en la PWA hoy. Agregar el selector a la landing nueva es conectar lo que ya existe — no construir algo nuevo. Costo técnico: horas, no días. La distinción 3 vs 8 idiomas aplica solo para canales de redes (donde escalar = 8 cuentas + 8 calendarios), no para una web estática. |
| **Hosting** | GitHub Pages del repo `aurex-app` | Ya en uso para aurex.live. Cero infraestructura nueva. |
| **DNS** | Sin cambios | Dominio aurex.live ya apunta a GitHub Pages. |
| **PWA actual** | Mover a `/app/` | Reorganización del repo sin tocar DNS. |

### 2.2 Estructura del repo después de FASE 0

```
aurex-app/
├── index.html                  ← LANDING NUEVA (sec 2.3)
├── assets/
│   ├── landing/                ← assets exclusivos landing
│   │   ├── hero-bg.svg
│   │   ├── logo-aurex.svg      ← versión SIN "INVEST · AI"
│   │   └── ...
│   └── shared/                 ← compartidos landing + PWA (aurex-i18n.js, etc.)
├── app/
│   ├── index.html              ← PWA actual (movida acá)
│   ├── assets/                 ← assets PWA actuales
│   └── ...
├── blog/                       ← Fase 4 (vacío por ahora)
└── briefs/                     ← (existente, sin cambios)
```

### 2.3 Bloques de contenido de la landing (orden vertical)

1. **Header sticky** — logo + nav (Producto / Planes / Idiomas / Blog ‑Fase 4‑ / "Probar gratis" → `/app/`) + selector idioma EN/ES/PT.
2. **Hero** — tagline en idioma seleccionado + sub-tagline + 2 CTAs (descargar iOS / descargar Android / "Probar PWA" → `/app/`).
3. **¿Qué es AUREX?** — 3 frases del Punto 1 documento estratégico (terminal global / 350 activos / 8 idiomas).
4. **Cobertura** — grid 9 tipos de instrumentos × cantidad (acciones 198 / cripto 50 / ETFs 40 / etc).
5. **Motor de 24 variables** — 10 IA + 14 Pulse, con destacado a Macro FED + Geopolítica GDELT como diferenciales únicos.
6. **3 banners en tiempo real** — Mercados (11 plazas) / Futuros (16) / Eventos Críticos.
7. **Portfolio inteligente** — Termómetro Riesgo IA + Dots IA + PnL 5 períodos.
8. **Sistema de alertas** — 15 tipos × 4 bloques.
9. **8 idiomas** — banderas + carrusel con captura por idioma.
10. **Planes y precios** — FREE / PRO $9.99 / ELITE $19.99 (marcar ELITE como "Próxima versión").
11. **Disclaimers regulatorios** — texto i18n del idioma seleccionado.
12. **Footer** — links legales + redes sociales (cuando estén activas en Fase 1) + repo público.

**Diseño:** dark mode default (fondo #080400 / #0D0800 según sistema de identidad), oro #D4A017 como accent, tipografía -apple-system. Coherente con el dark mode actual de la PWA.

### 2.4 Reparto Code vs Escritorio FASE 0

| Pieza | Quién |
|---|---|
| Setup técnico (mover PWA a `/app/`, crear `index.html` nuevo en root, ajustar paths de assets compartidos) | **Code** |
| Implementar 12 bloques HTML+CSS+JS según sec 2.3 | **Code** |
| Cargar copy EN (idioma maestro) en cada bloque | **Escritorio escribe** + **Code maqueta** |
| Traducir copy a los 7 idiomas restantes (ES/PT/ZH/HI/AR/FR/IT) con Claude API | **Code** (workflow sec 2.3 del PLAN_MKT v3.0) |
| Capturas reales del producto para sección 6, 7, 8 (banners, portfolio, idiomas) | **Code** (adb screen capture + edición) |
| Testing cross-browser (Chrome, Safari, Firefox, iOS Safari, Android Chrome) | **Code** |
| Aprobación final visual | **Fernando** (1 sola decisión: ok visual + ok copy) |

### 2.5 Riesgos identificados FASE 0

| Riesgo | Mitigación |
|---|---|
| Mover PWA a `/app/` rompe links viejos compartidos | Agregar redirect HTML en `/index.html` viejo path → log Supabase para detectar referencias rotas. Hacer rebote 301 vía `meta refresh` (GitHub Pages no soporta redirects server-side). |
| App Store metadata referencia `aurex.live` específicamente | Verificar antes de mover: `aurex.live` SIGUE existiendo y sirviendo la landing; la PWA simplemente queda en `/app/`. No hay break para Apple/Google reviewers. |
| Diferencia visual entre landing dark y PWA (que tiene modo claro/oscuro) | Landing fija dark mode por coherencia con identidad visual oficial. PWA mantiene toggle claro/oscuro del usuario. |
| Sistema de identidad v1.0 tiene "INVEST · AI" en el logo principal | Generar variante del SVG sin subtítulo. El SVG vive en el HTML del sistema de identidad — extraerlo, limpiarlo, guardarlo como `logo-aurex-clean.svg`. |

---

## 3. FASE 1 — Activación de canales (resumen, sin cambios vs v3.0)

Para evitar duplicar, el detalle táctico de FASE 1 a 4 ya está en `PLAN_MKT.md` v3.0 secciones 2.5 y 2.9. Este consolidado solo confirma el orden:

| Fase | Canales | Pre-requisito |
|---|---|---|
| **FASE 1** | Telegram (3 channels EN/ES/PT) + WhatsApp Business + X (3 cuentas) + IG Stories + Email newsletter (Resend) | **Landing publicada en aurex.live** |
| **FASE 2** | TikTok + IG Reels + YT Shorts + IG feed | FASE 1 con ≥1 semana de datos |
| **FASE 3** | YouTube canal largo + LinkedIn Company | FASE 2 con plantillas validadas |
| **FASE 4** | Press releases + blog SEO + programa de referidos | FASE 3 + ≥500 followers totales |

**Métricas para decidir avanzar de fase:**
- FASE 0 → FASE 1: landing live + 0 errores 404 + ≥3 idiomas funcionando.
- FASE 1 → FASE 2: ≥1 semana publicando + ≥50 seguidores totales sumando 5 canales (umbral mínimo para medir engagement real).
- FASE 2 → FASE 3: ≥4 piezas video publicadas con engagement medible.
- FASE 3 → FASE 4: ≥500 followers totales + plantillas LinkedIn validadas con ≥3 posts.

---

## 4. Lo que este consolidado NO cambia del v3.0

Confirmado explícitamente por Escritorio sin observaciones — sigue vigente sin tocar:

- Posicionamiento como terminal global (Punto 1 documento estratégico).
- EN como idioma prioritario, ES segundo, PT tercero.
- 30 piezas re-usables del catálogo (sec 2.5.3 v3.0).
- Calendario diario sin sesgo cripto (sec 2.5.2 v3.0).
- Workflow de localización EN→7 idiomas con Claude API (sec 2.3 v3.0).
- Búho v2 como presentador de videos, Ruta A + Ruta B (sec 2.4 v3.0).
- Reparto Code/Escritorio (sec 2.2 v3.0).
- KPIs por canal (sec 2.8 v3.0).
- Presupuesto ~$35-65/mes recurrente + ~$2.500-4.000/año en press releases (sec 2.10 v3.0).
- Programa de referidos simétrico 1+1 (sec 2.6 v3.0).
- Canales descartados explícitamente (sec 2.7 v3.0).

---

## 5. Próximos pasos concretos (orden cronológico)

| # | Acción | Quién | Cuándo |
|---|---|---|---|
| 1 | Code commitea este consolidado v2 a `aurex-app/briefs/` + push a GitHub | Code | Cierre de noche 16-may |
| 2 | Code extrae logo SVG del sistema de identidad v1.0 y genera `logo-aurex-clean.svg` (sin "INVEST · AI") | Code | Inicio FASE 0 |
| 3 | Code prepara plan archivo-por-archivo de la reorganización del repo (`/index.html` nuevo, mover PWA a `/app/`, ajustar paths) → pasa a Escritorio para validación antes de Edit | Code → Escritorio | Inicio FASE 0 |
| 4 | Escritorio escribe copy de la landing en EN (idioma maestro) bloque por bloque | Escritorio | Después de OK del plan archivo-por-archivo |
| 5 | Code maqueta los 12 bloques HTML+CSS+JS con copy EN + traducciones a los 7 idiomas restantes con Claude API | Code | Tras recibir copy de Escritorio |
| 6 | Fernando aprueba visual final (1 decisión) | Fernando | Antes de publicar |
| 7 | Code publica vía commit a `aurex-app` → GitHub Pages deploy automático | Code | Tras OK Fernando |
| 8 | Verificar live en `aurex.live` + `aurex.live/app` + 8 idiomas funcionando + sin 404s | Code | Inmediatamente post-deploy |
| 9 | Anuncio interno: landing live → habilita FASE 1 (activar canales) | Code | Cierre FASE 0 |

---

## 6. Decisiones de Fernando — APROBADAS (16-may noche)

Las 2 decisiones que el v1 dejó pendientes quedaron aprobadas por Fernando vía Escritorio en la misma vuelta de revisión:

1. ✅ **OK 1 — Plan general aprobado:** FASE 0 landing antes que FASE 1 canales, stack vanilla, dark mode fijo, mover PWA a `/app/`. (El idioma cambia: 8 desde día 1, no 3 — corrección de Escritorio aplicada en sec 2.1 y 2.4 de este v2.)
2. ✅ **OK 2 — Autonomía aprobada para FASE 0:** Code reorganiza repo + Escritorio escribe copy EN + Code maqueta y traduce a los 7 idiomas. Única intervención manual de Fernando: **OK visual final antes de publicar**.

**Implicancia:** FASE 0 queda habilitada para arranque inmediato según sec 5.

---

## 7. Referencias y trazabilidad

- **Plan maestro estratégico:** `~/Desktop/aurex-app/PLAN_MKT.md` (v3.0, 2-may-2026, 850 líneas).
- **Research competitivo:** `~/Desktop/aurex-app/RESEARCH_MKT.md` (cierre 29-abr-2026, 19 competidores analizados).
- **Sistema visual:** `~/Desktop/aurex-app/Aurex — Sistema de Identidad Visual v1.0.html` (marzo 2026).
- **Decisión URL Opción A:** confirmada por Fernando vía Escritorio (input recibido 16-may-2026 noche).
- **Decisión stack vanilla:** memoria `project_landing_stack_decision.md` (13-may-2026, Code+Escritorio consenso).
- **Regla "INVEST · AI" prohibida externamente:** memoria `project_assets_visuales.md` (3-may-2026).

**Acceso para Escritorio:**
- Raw GitHub (v2 — vigente): `https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/CONSOLIDADO_MKT_LANDING_v2_16MAY.md`
- Con bypass cache CDN: agregar `?nocache=<timestamp>` al final del raw URL.
- v1 queda como historial: `briefs/CONSOLIDADO_MKT_LANDING_v1_16MAY.md`.

---

**Fin v2.** Documento cerrado con corrección de Escritorio sobre idiomas + OK 1 y OK 2 de Fernando. **Este v2 es la fuente de verdad operativa para FASE 0.** Próxima versión v3 solo si surge algo nuevo durante la implementación.
