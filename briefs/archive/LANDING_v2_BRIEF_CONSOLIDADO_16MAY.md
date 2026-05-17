# LANDING v2 — BRIEF CONSOLIDADO COMPLETO

> **Fecha:** 16-may-2026, cierre noche AR (≈22:30).
> **Versión:** v2 del brief landing. Incluye los 10 puntos de Fernando + 6 aportes de Escritorio + análisis Code con verificaciones técnicas y items que faltaban.
> **Estado landing:** v1 LIVE en `https://aurex.live/` (commit `0243a53`). v2 a construir según este brief.
> **Decisión global vigente:** dark mode fijo, stack vanilla, logos oficiales únicamente, sin librerías externas.
> **Próximo paso:** OK final de Fernando + arranque ejecución v2 según sección "Plan ejecución" al final.

---

## 0. Reconocimiento de error en v1 (Code)

**Code inventó el logo SVG en v1** (`assets/landing/logo-aurex-clean.svg`) cuando el oficial YA EXISTÍA en `assets/logo/`. Violó memorias `project_assets_visuales.md` y `feedback_nunca_inventar.md`. Sin excusa. Corrección en v2 es Punto 1.

---

# PARTE A — Los 10 puntos de Fernando + 6 aportes de Escritorio (consolidados)

## PUNTO 1 — LOGO REAL (corrección crítica)

**Eliminar** `assets/landing/logo-aurex-clean.svg` (inventado por Code).

**Usar exclusivamente:**

| Ubicación | Archivo oficial | Razón |
|---|---|---|
| Header sticky | `assets/logo/aurex_logo_transparent.svg` | 1.547 B, sobre fondo oscuro, aprobado 27/03/2026 |
| Hero si necesita versión grande | `logo-aurex.png` (root, 146 KB) | Logo símbolo + texto AUREX |
| Header sticky alternativo | `assets/logo/aurex_logo_dark.svg` | 1.571 B, con fondo radial marrón embebido |

**No crear ningún SVG nuevo de logo.** Si necesita variante, derivar de los oficiales existentes.

---

## PUNTO 2 — DISEÑO: ELIMINAR LOOK DE PLANTILLA AI

Aplicación detallada en cada bloque:

| Aspecto | Implementación técnica |
|---|---|
| **Tipografía headings** | `letter-spacing: -0.02em` a `-0.04em` para títulos grandes (premium, compacto). `line-height: 1.1` para headings hero. |
| **Separación entre secciones** | NO solo espacio negro. Divisores: línea 1px con gradiente oro que se disuelve en bordes. O alternancia mínima de fondo `#080400` / `#0D0800`. |
| **Sombras + profundidad** | Cards con `box-shadow: 0 0 20px rgba(212,160,23,0.08)` — tinte dorado sutil, sensación de flotar. |
| **Bordes cards** | `border: 1px solid rgba(212,160,23,0.15)` — dorado tenue, no sólido. |
| **Hover states cards** | `transform: scale(1.02)` + borde dorado más visible al hover. |
| **Scroll reveal** | Intersection Observer + clase `.visible` CSS. Fade + slide-up. 20 líneas JS, cero librerías. |

---

## PUNTO 3 — FONDO DIVIDIDO EN DOS ZONAS

### Zona A — Header hasta final de los 3 CTAs del Hero
Fondo sólido oscuro con gradiente para evitar plano puro:
```css
background: radial-gradient(ellipse at 60% 40%, #1A0D00 0%, #080400 70%);
```

### Zona B — Desde el primer bloque después de los CTAs hasta el footer
**Constelación dorada animada con canvas vanilla JS:**

| Spec | Valor |
|---|---|
| Cantidad de estrellas | 60-80 distribuidas aleatoriamente |
| Tamaño estrella | 1-2px círculo |
| Color | `#D4A017` o `#F5C842` (random) |
| Titilación | `opacity` oscilante 0.2 → 0.8 con velocidad aleatoria por estrella |
| Líneas entre estrellas cercanas | `distance < 120px`, stroke `#D4A017`, opacity proporcional a distancia, `stroke-width: 0.3px`, aparecen y desaparecen |
| Loop | `requestAnimationFrame` |
| Performance | `document.visibilitychange` pausa cuando tab oculto |
| Posicionamiento | `position: fixed; z-index: -1` solo en Zona B |

### Transición Zona A → Zona B
Gradiente de fusión de 100px de altura entre los CTAs y el primer bloque. NO corte abrupto.

---

## PUNTO 4 — CTA "TRY ON BROWSER" — cambiar texto

Reemplazar en `landing-i18n.json`:

| Idioma | Antes | Después |
|---|---|---|
| EN | Try on browser | **Open Web App** |
| ES | (vacío) | **Abrir App Web** |
| PT | (vacío) | **Abrir App Web** |
| ZH | (vacío) | **打开网页应用** (traducción Claude API) |
| FR | (vacío) | **Ouvrir l'app web** |
| IT | (vacío) | **Apri Web App** |
| HI | (vacío) | **वेब ऐप खोलें** |
| AR | (vacío) | **افتح تطبيق الويب** |

Estilo del botón: outline (borde dorado, fondo transparente). Diferencia clara vs botones sólidos de stores.

---

## PUNTO 5 — NAV HEADER: CHANNELS CON LINKS REALES

**HANDLES VERIFICADOS por Code en repo (no inventados):**

| Red | Handle / URL | Fuente verificada | Estado |
|---|---|---|---|
| Telegram canal | `@aurex_ai` → `https://t.me/aurex_ai` | `marketing/PLAN_SOCIAL_MEDIA_FASE_1_AUREX_v3.md` | ✅ creado, 0 posts |
| X / Twitter | `@aurex_live` → `https://x.com/aurex_live` | idem (Escritorio validó 100% el 13-may PM) | ✅ creado, perfil completo, 0 posts |
| Instagram | `@aurex_live` → `https://instagram.com/aurex_live` | idem | ✅ creado, 0 posts |
| TikTok | `@aurex_live` → `https://tiktok.com/@aurex_live` | idem | ✅ creado, Business Verification pendiente |
| YouTube | `@aurex-fintech` → `https://youtube.com/@aurex-fintech` | idem | ✅ creado, 0 videos |
| LinkedIn | `aurex-fintech` → `https://linkedin.com/company/aurex-fintech` | idem | ✅ creado, 0 posts |
| WhatsApp Business | `+54 9 11 3360 2563` → `https://wa.me/5491133602563` | memoria `project_operativo.md` | ✅ línea activa |
| Email | `app.aurex@gmail.com` | idem | ✅ activo |

**Dropdown "Channels" del nav** incluye los 7 anteriores. Cada uno con su ícono SVG (Telegram/X/IG/TikTok/YT/LinkedIn/WhatsApp).

**Nav del header — versión final v2:**
- Izquierda: logo
- Centro: `Channels ▾` (único item del nav)
- Derecha: selector idioma + botón `Get the app`

**Eliminar:** Product, Plans, Try Free (no van más, según pedido Fernando).

---

## PUNTO 6 — SECCIÓN SCREENSHOTS REALES DE LA APP (bloque nuevo 4.5)

**Ubicación:** entre Motor 24 variables y 3 Banners en tiempo real.

**Heading:** `"See it in action."`

**Implementación:** carrusel horizontal con scroll snap nativo CSS — sin librería:
```css
overflow-x: scroll;
scroll-snap-type: x mandatory;
/* cada slide: */ scroll-snap-align: center;
```
Flechas izquierda/derecha en desktop con JS básico.

**6 capturas** — Code obtiene de `app/img/onboarding/` (existen 6 JPGs: alertas, comparador, ia, portfolio, pulse, watchlist) o captura nuevas de Build 33 via adb si calidad insuficiente.

| Slide | Captura | Label EN |
|---|---|---|
| 1 | Tab Mercados | "Global markets. 11 exchanges. Real-time." |
| 2 | Tab IA Señales | "AI signals. 24 variables. 5 reasons explained." |
| 3 | Tab Portfolio | "Your portfolio. AI risk score in real time." |
| 4 | Tab Alertas | "15 alert types. You set the rules." |
| 5 | AUREX Pulse | "Global sentiment. 14 data sources." |
| 6 | Selector idiomas | "8 languages. From day one." |

Frame de iPhone en CSS puro: `border-radius: 40px`, `border: 2px solid rgba(212,160,23,0.3)`, box-shadow dorada. Label debajo en texto pequeño dorado. Mobile: 80vw por slide. Desktop: 3 slides visibles.

---

## PUNTO 7 — SELECTOR DE IDIOMA EN HEADER

Ya está en v1 ✅. Verificar:
- Posicionamiento correcto entre nav y CTA "Get the app".
- CSS no se rompe con los nuevos nav items (Channels dropdown).
- Cuando lleguen 7 traducciones por Claude API, el selector las activa correctamente.

---

## PUNTO 8 — BLOQUE "HOW WE COMPARE" / BENCHMARK (bloque nuevo 10.5)

**Ubicación:** entre Planes y Disclaimer.

**Heading:** `"How we compare."` (NO usar "Benchmark" — jerga).

**Tabla** — datos verificados en `RESEARCH_MKT.md` (cero invento):

| Feature | AUREX | Magnifi | Sagehood | Danelfin | Robinhood | Bloomberg Terminal |
|---|---|---|---|---|---|---|
| 9 instrument types | ✅ | ❌ | ❌ | ❌ | Partial | ✅ |
| 24 AI variables per signal | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| FED Macro + GDELT Geopolitics | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| 8 languages | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| 7 global stock markets | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Mobile + Web | ✅ | App only | App only | Web only | App+Web | Desktop only |
| Monthly price | **$9.99** | $14 | $9.99 | $19+ | $5 (Gold) | $2,000+ |

**Diseño tabla:** columna AUREX con header dorado, fondo `rgba(212,160,23,0.08)`, borde dorado lateral. ✅ en dorado, ❌ en gris tenue. Fila de precio con `$9.99 vs $2,000+` visualmente prominente (número grande / bold).

---

## PUNTO 9 — DISCLAIMER + "WHAT WE ARE NOT" PROMINENTE

**Hacer bloque visual de primer nivel, NO nota al pie.**

**Diseño:** `border: 1px solid rgba(212,160,23,0.4)`, fondo `#0D0800`, padding generoso.

**Headline:** `"We analyze. We don't trade."`

**Lista con iconos ❌:**
- We are not a broker
- We don't execute trades or transactions
- We don't manage your money
- We don't give financial advice
- We don't recommend buy or sell actions
- We are not a crypto-only app
- We don't replace your broker — we complement it

Fuente: `PLAN_MKT.md` v3.0 sec 1.1 "Lo que AUREX no es" — texto ya escrito.

**Debajo de la lista:** disclaimer regulatorio completo (texto actual del bloque 11) en texto más pequeño, gris claro, SIN italic.

---

## PUNTO 10 — TICKER ROLLING CON INFO CONSTANTE (bloque nuevo 2.5)

**Ubicación:** justo después del Hero, antes del primer bloque de contenido. Full width, altura 44px.

**Diseño:** fondo `#0D0800`, `border-bottom: 1px solid rgba(212,160,23,0.2)`.

**Implementación:** CSS animation con marquee suave (`transform: translateX`, NO etiqueta `<marquee>` deprecated). Loop infinito, velocidad media (45s recorrido completo), pausa en hover.

**Contenido v2 (estático verificado — datos del backend en v3):**

```
350 assets monitored · 8 languages · 7 global stock markets · 24 AI variables per signal · iOS + Android + Web · Real-time data, 24/7 · Crypto · Stocks · ETFs · Futures · Commodities · Bonds · Forex · Next FOMC: Jun 11, 2026 · Free plan available — no credit card required
```

Separador entre ítems: punto dorado centrado `·` (#D4A017).

**v3:** conectar al backend para datos reales (señales generadas hoy, próximo evento real). Hoy estático.

---

## APORTE A (Escritorio) — Hero con mockup iPhone

Layout 2 columnas en desktop, 1 columna en mobile:
- Izquierda (desktop) / arriba (mobile): tagline + sub-tagline + 3 CTAs.
- Derecha (desktop) / abajo (mobile): mockup de iPhone con captura real del Tab Mercados o IA Señales de Build 33.
- Frame iPhone en CSS puro (no imagen stock).
- Sobre mockup: badge `Live data` con dot verde pulsante.
- Detrás del mockup: primer asomo del fondo constelación (anticipo Zona B).

---

## APORTE B (Escritorio) — Badges oficiales App Store / Google Play

Reemplazar los botones de texto por badges oficiales:
- **App Store**: descargar SVG/PNG oficial de `developer.apple.com/app-store/marketing/guidelines/`
- **Google Play**: descargar de `play.google.com/intl/en_us/badges/`
- Guardar en `assets/landing/badges/` para no depender de CDN externo.

---

## APORTE C (Escritorio) — Counter animado en sección Cobertura

Los 9 números del grid (198, 50, 40, 20, 14, 12, 8, 5, 3) se animan desde 0 hasta el valor real cuando el bloque entra al viewport.

**Implementación:** Intersection Observer + `setInterval` con incremento. Duración 1.5s. ~30 líneas JS.

---

## APORTE D (Escritorio) — Header glassmorphism al scrollear

| Estado | CSS |
|---|---|
| En el Hero (top) | Header fondo transparente, logo flota |
| Al hacer scroll | `background: rgba(8,4,0,0.85)` + `backdrop-filter: blur(12px)` + `border-bottom: 1px solid rgba(212,160,23,0.2)` |

Implementación: scroll listener JS toggle clase `.scrolled`. ~10 líneas.

---

## APORTE E (Escritorio) — Visualización SVG del motor de 24 variables

Reemplazar las 2 columnas de texto actuales por SVG interactivo:
- **Desktop:** nodo central `"AUREX Signal"` + nodos externos (24 variables) conectados con líneas que pulsan. Hover en cada nodo = tooltip con descripción.
- **Mobile:** fallback a lista de texto (no usable en touch pequeño).

**Riesgo Code:** este aporte es el más caro técnicamente (estimado 2-3 hs de trabajo limpio). Sugerencia alternativa Code más simple abajo en sección B.

---

## APORTE F (Escritorio) — Scroll reveal en todas las secciones

Cada sección: fade-in + `translateY(20px → 0)` al entrar al viewport.

**Cascade dentro de cada sección:**
- Primer elemento: delay 0ms
- Segundo elemento: delay 100ms
- Tercer elemento: delay 200ms

Intersection Observer + clase `.visible`. ~25 líneas JS totales. **Mismo sistema que Punto 2 scroll reveal** — implementación única.

---

# PARTE B — Análisis Code v2 (lo que Escritorio dejó abierto o no contempló)

## B-1 — Items que faltaron en el brief de Escritorio

| Item | Estado | Acción Code v2 |
|---|---|---|
| ¿Qué hacer con `logo-aurex-clean.svg` inventado? | No mencionado | **Borrar del repo** en commit v2. |
| ¿Reescribir `landing-i18n.json` desde cero? | No mencionado | Sí — todos los strings cambian (nav, CTA, bloques nuevos). Code regenera EN + 7 traducciones. |
| Copy EN para "How it works 3 steps" | No entregado | Code propone: 1) "Download AUREX" 2) "Pick your assets" 3) "Get signals in real time". Confirmar con Escritorio. |
| Copy EN para labels del Hero mockup (badge "Live data") | No entregado | Code propone: "Live data" + dot verde pulsante. |
| Captura real para Hero mockup | Requiere coordinación con Fernando (Samsung Build 33 enchufado) | Code la captura via adb cuando Fernando confirme dispositivo conectado. Alternativa: usar `app/img/onboarding/ia.jpg` que ya está en repo. |
| Decisión sobre Bloomberg Terminal en tabla benchmark | No discutido | **Riesgo:** comparar $9.99 retail vs $24k institucional puede leerse como "comparación injusta". Mi sugerencia: agregar microcopy debajo de la tabla: *"Bloomberg Terminal targets institutional users. AUREX is designed for individual investors."* — quita el sesgo manteniendo el contraste visual. |

## B-2 — Ajustes técnicos a aportes de Escritorio

### Sobre APORTE A (mockup iPhone)
Frame iPhone CSS puro funciona pero **queda plano** sin notch ni botón. Sugiero usar SVG simple del frame iPhone (~2 KB) que incluya notch + barra inferior. Crear `assets/landing/iphone-frame.svg`. Más realista, mismo peso, sin librería.

### Sobre APORTE E (SVG interactivo 24 variables)
Versión completa = 2-3 hs trabajo limpio + riesgo de bug visual en mobile. **Alternativa Code más simple:**
- Mantener 2 columnas de texto pero agregar a cada una un **chip animado por cada variable**:
  - 10 chips IA en columna izquierda (cada uno: nombre variable + dot pulsante)
  - 14 chips Pulse en columna derecha
- Al hover el chip se ilumina + tooltip con descripción.
- En mobile los chips se reorganizan en grid 2 col responsive.
- **Tiempo:** 45 min vs 2-3 hs del SVG complejo.

**Pregunta para Fernando + Escritorio:** ¿vamos con SVG complejo (Aporte E completo) o con chips animados (alternativa Code)?

### Sobre PUNTO 3 (canvas constelación)
Probar en mobile cuidadosamente. Canvas con 60-80 elementos animados puede degradar performance en Android low-end. **Mitigación:** detectar `navigator.hardwareConcurrency < 4` y reducir a 30 estrellas en dispositivos lentos. 5 líneas extra.

### Sobre PUNTO 10 (ticker)
Items propuestos (350 assets / 8 languages / etc.) son 9 entradas. **Riesgo:** si el ticker recorre todo en 45s da sensación de "lento". Sugiero **120s recorrido** (más natural) + items concatenados con separador. Velocidad ajustable via CSS variable.

## B-3 — Sugerencias adicionales Code v2 (5 nuevas)

### Code-G — CTA secundario post-tabla Benchmark
Después del bloque "How we compare" agregar CTA llamativo: `"See for yourself — Start free →"` linkeando a `/app/` o stores. Presión de conversión post-comparación es estándar en landings B2C.

### Code-H — OG image + meta tags sociales
Agregar al `<head>` de la landing:
```html
<meta property="og:title" content="AUREX — The Global Markets Terminal">
<meta property="og:description" content="AI signals across 350 assets in 8 languages.">
<meta property="og:image" content="https://aurex.live/assets/landing/og-image.png">
<meta property="og:url" content="https://aurex.live/">
<meta name="twitter:card" content="summary_large_image">
```
**Acción:** Code genera `og-image.png` (1200×630) con logo AUREX + tagline sobre fondo constelación. Para que cuando se comparta el link en WhatsApp/X/LinkedIn aparezca preview profesional.

### Code-I — sitemap.xml + robots.txt
SEO técnico básico que falta. ~10 líneas combinadas.

### Code-J — Smooth scroll en anchors del nav
Si el nav linkea a secciones (`#channels`, etc.) que el scroll sea smooth con `scroll-behavior: smooth` en CSS. 1 línea.

### Code-K — Easter egg en consola
`console.log()` con ASCII art del logo AUREX + mensaje para developers. Detalle de marca que los técnicos comparten en redes. Costo: 0.

## B-4 — Estimación de tiempo realista para v2

Re-estimo con todos los items consolidados:

| Bloque de trabajo | Tiempo |
|---|---|
| Limpieza (eliminar logo inventado, ajustar i18n) | 15 min |
| Implementar constelación canvas + transición Zona A/B | 1.5 h |
| Reescribir header (Channels dropdown + glassmorphism + logo real) | 1 h |
| Hero con mockup iPhone + badges App Store/Google Play oficiales | 1 h |
| Ticker rolling | 30 min |
| Bloque Screenshots (carrusel CSS scroll-snap + 6 capturas) | 45 min |
| Bloque "How it works" 3 pasos | 30 min |
| Motor 24 variables (chips animados o SVG según decisión) | 45 min - 3 h |
| Bloque Benchmark (tabla + microcopy Bloomberg) | 45 min |
| Bloque "We don't trade" prominente | 30 min |
| Métricas Live estáticas | 30 min |
| Footer con iconos Channels | 30 min |
| Counter animado cobertura + scroll reveal + smooth scroll | 45 min |
| OG image + meta tags + sitemap + robots | 30 min |
| Capturar screenshots adb Build 33 | 30 min (requiere Fernando) |
| Generar 7 traducciones via Claude API | 45 min |
| Smoke test local + screenshot Playwright + ajustes | 1 h |
| Commit + push + verify live | 15 min |
| **TOTAL v2** | **11-14 horas** |

**Realista:** v2 NO se entrega en una sola sesión. Dividir en 2-3 ventanas de trabajo. **Hito intermedio sugerido:** después de bloque benchmark + disclaimer (~6h) hacer commit visible para que Fernando vea avance parcial.

## B-5 — Dependencias bloqueantes

| Pendiente | De quién depende | Bloqueante para |
|---|---|---|
| Captura iPhone mockup Hero | Fernando con Samsung Build 33 enchufado (o usar onboarding/ia.jpg existente) | Aporte A |
| Capturas 6 screenshots del carrusel | Idem o usar onboarding/*.jpg existentes | Punto 6 |
| Decisión SVG complejo vs chips simple para Motor 24 var | Fernando + Escritorio | Aporte E |
| Decisión microcopy Bloomberg en benchmark | Escritorio | Punto 8 |
| Copy EN "How it works" 3 pasos | Escritorio | Bloque 5.5 |
| OK visual final | Fernando | Commit final v2 |

---

# PARTE C — Estructura final v2 (17 bloques)

| # | Bloque | Cambio vs v1 |
|---|---|---|
| 1 | Header sticky | Logo oficial + nav Channels dropdown + selector idioma + CTA. **Glassmorphism al scroll.** |
| 2 | Hero | + mockup iPhone + badges oficiales stores + CTA texto corregido |
| 2.5 | **Ticker rolling** | NUEVO |
| — | **FIN ZONA A / INICIO ZONA B** (constelación dorada animada) | NUEVO |
| 3 | "Between you and your broker" | Mejorado visual + scroll reveal |
| 4 | Cobertura 350 activos | + counter animation |
| 4.5 | **Screenshots app** (carrusel) | NUEVO |
| 5 | Motor 24 variables | + chips animados o SVG interactivo (decisión pendiente) |
| 5.5 | **"How it works" 3 pasos** | NUEVO |
| 6 | 3 Banners tiempo real | Mejorado visual |
| 7 | Portfolio inteligente | + mockup visual del Portfolio |
| 8 | 15 alertas | + iconografía |
| 9 | 8 idiomas | banderas SVG reales (no emojis) + animación |
| 10 | Planes y precios | + animaciones hover |
| 10.5 | **"How we compare"** tabla | NUEVO |
| 11 | **"We analyze. We don't trade."** | Reescrito prominente + lista NO SOMOS |
| 11.5 | **Métricas Live** | NUEVO (estáticas v2, dinámicas v3) |
| 12 | Footer | + iconos Channels + links a redes con handles verificados |

**Bloques: 17 totales** (12 originales + 5 nuevos: 2.5 / 4.5 / 5.5 / 10.5 / 11.5).

---

# PARTE D — Decisiones cerradas (no se reabren)

1. ✅ Dark mode fijo. Sin toggle.
2. ✅ Stack vanilla (HTML/CSS/JS).
3. ✅ Logos oficiales del repo únicamente.
4. ✅ Channels nav: links reales (handles verificados Code arriba).
5. ✅ Ticker v2: contenido estático verificado. Backend en v3.
6. ✅ 8 idiomas desde día 1 (decisión heredada CONSOLIDADO v2).
7. ✅ 17 bloques (no más expansión sin decisión nueva).

---

# PARTE E — Decisiones pendientes (máximo 3 para Fernando + Escritorio)

1. **¿APORTE E completo o alternativa Code chips animados** para el bloque Motor 24 variables? (Diferencia: 3 hs vs 45 min de trabajo).
2. **¿Capturas iPhone del Hero + carrusel:** las saco de `app/img/onboarding/*.jpg` que ya existen, o coordinamos con Fernando para capturar nuevas de Samsung Build 33 (más actualizadas pero requiere coordinación)?
3. **¿OK general al brief v2 completo** para que Code arranque ejecución en 2-3 ventanas de trabajo según sección B-4?

---

# PARTE F — Acceso para Escritorio

- Raw GitHub: `https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/LANDING_v2_BRIEF_CONSOLIDADO_16MAY.md`
- Con bypass cache: agregar `?nocache=<timestamp>`.
- v1 del brief queda como historial: `briefs/LANDING_v2_FEEDBACK_FERNANDO_16MAY.md` (renombrar a `..._v1_...` en próximo commit si conviene).

---

**Fin v2 del brief.** Próxima versión solo si surge algo nuevo durante ejecución.

---

# ADDENDUM — Decisiones cerradas tras respuesta Escritorio + Fernando (16-may noche, post v2)

## D-1 — WhatsApp ELIMINADO de landing v2 y de plan MKT inmediato

**Decisión Fernando + Escritorio:** la línea 2563 está bloqueada (cooldown exponencial hasta 8-jul-2026 mínimo), la línea 7675 2222 es personal y no se publica, Telegram cubre el mismo rol gratis y estable. WhatsApp Cloud API oficial Meta solo se evalúa cuando MRR justifique el costo.

**Impacto en landing v2:**
- Dropdown "Channels" del nav: 6 canales (no 7). WhatsApp queda fuera.
- Footer: WhatsApp queda fuera.
- Resto del brief v2 sin cambios.

**Impacto en PLAN_MKT v3.0:**
- Sec 2.5.1 Canal 2 "WhatsApp Business" pasa de **FASE 1** a **FASE FUTURA — post-MRR**.
- Cron y código de `sendWhatsAppEvolution()` ya está pausado (memoria `project_whatsapp_business.md`).

## D-2 — APORTE E: alternativa Code chips animados (45 min) — APROBADA

Decisión Escritorio: SVG complejo es 3 hs para algo que el usuario ve 5 segundos. Chips animados comunican lo mismo con menos riesgo. En v3 con datos de engagement se reevalúa.

## D-3 — Capturas iPhone: usar `app/img/onboarding/*.jpg` existentes como punto de partida

Decisión Escritorio: Code revisa las 6 existentes y reporta cuáles necesitan recaptura específica. No recapturar todo de cero.

**Análisis Code de las 6 capturas existentes (post-revisión visual cada una):**

| # | Archivo | Calidad | Decisión v2 |
|---|---|---|---|
| 1 | `pulse.jpg` (Tab Mercados + Eventos + Pulse) | ✅ EXCELENTE | **Usar** — perfecta para slide "Pulse / Mercados" |
| 2 | `ia.jpg` (Tab Señales IA con 6 activos) | ✅ EXCELENTE | **Usar** — perfecta para slide "AI Signals" |
| 3 | `portfolio.jpg` (Portfolio con Termómetro Riesgo) | ✅ EXCELENTE | **Usar** — perfecta para slide "Portfolio" |
| 4 | `watchlist.jpg` (Watchlist con 4 listas + 6 activos) | ✅ MUY BUENA | **Usar** — perfecta para slide "Watchlist / Alerts" |
| 5 | `comparador.jpg` (Comparador BTC vs GOOGL vs AMZN) | ⚠️ overlay raro de Watchlist transparente atrás | **Recapturar** Build 33 — el overlay arruina la limpieza visual |
| 6 | `alertas.jpg` (Tab Alertas) | ❌ **NO USABLE** — mockup viejo con "Alertas WhatsApp instantáneas" (decisión D-1 acaba de eliminar WhatsApp) + badges internos "MVP" / "0/4" | **Recapturar OBLIGATORIO** Build 33 |
| 7 | (no existe captura del Selector de idiomas) | — | **Capturar nueva** Build 33 |

**Resumen acción:** 4 capturas existentes usables (pulse, ia, portfolio, watchlist) + **3 capturas a tomar de Samsung Build 33**: alertas (sin WhatsApp), comparador (sin overlay), selector idiomas.

**Coordinación con Fernando:** cuando estés con el Samsung enchutado al Mac, te paso los 3 comandos adb específicos (1 por captura) — toma 2 minutos total. Si querés, lo posponemos: Code arranca v2 con las 4 capturas existentes + placeholders en los 3 slots de captura nueva, y al final del codeo Code te avisa cuando estés listo para tomar las 3 capturas.

## D-4 — OK general al brief v2 — APROBADO con condición

Condición de Escritorio: **Code manda screenshot Playwright de landing v2 completa ANTES del commit final + push**. Sin ese screenshot revisado por Escritorio + Fernando, no se publica.

**Flujo de ejecución:**
1. Code arma toda la landing v2 en local.
2. Code corre Playwright + saca screenshot completo.
3. Code pasa screenshot a Fernando + Escritorio.
4. Si OK → commit + push → deploy live.
5. Si hay ajustes → ronda v2.1 hasta OK final.

## D-5 — Próximo paso inmediato Code

Arrancar bloque por bloque la landing v2 según estimación B-4 (11-14 hs distribuidas en 2-3 ventanas). Reportar avance al cierre de cada ventana sin esperar OK intermedio (autonomía aprobada por Fernando OK 2 del CONSOLIDADO v2).

**Hito de pausa antes de publicar:** screenshot Playwright a Escritorio + Fernando.

---

**Fin addendum.** Próximo update solo si surge ajuste mayor durante ejecución.
