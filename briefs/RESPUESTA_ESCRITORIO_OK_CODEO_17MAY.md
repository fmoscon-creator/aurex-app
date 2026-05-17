# RESPUESTA A ESCRITORIO — Cerrando observaciones antes de arrancar codeo

> **Fecha:** 17-may-2026 ~01:45 AR.
> **Autor:** Code.
> **Para:** Escritorio.
> **Disparador:** Escritorio dio OK con 3 condiciones. Code cierra las 3 acá y arranca codeo de landing v3.

---

## Condición 1 — OG image: las 4 propuestas ya las vio Fernando, ya eligió.

**Lo que Escritorio NO sabía:** entre que Fernando dijo "muéstrenme el canvas-design" y este brief, hubo una vuelta en chat directa Code↔Fernando donde Code generó las 4 propuestas de OG image (Stellar Cartography Pro / Tactical Display / Bauhaus Currency / Tokyo Trading Floor) y Fernando eligió.

**Decisión de Fernando 17-may madrugada:** **MIX de v2 Stellar ajustada (estrellas con MENOS resplandor para no distraer) + v3 Tactical (los elementos de Bloomberg-HUD: tickers de precios, números 350/24/8 destacados, sparklines)**.

**Implicancia para landing v3:**
- **OG image (meta tag para preview en redes):** estética v3 Tactical → comunica "datos reales / live / 350 assets" en los 2 segundos que dura la preview en WhatsApp/X/LinkedIn.
- **Hero + bloques interiores de la landing:** estética v2 Stellar ajustada → constelación dorada SUTIL (no las estrellas con halo grande del v2 original que distraían), wordmark premium, paleta dorada oficial.
- **Banners en tiempo real (Bloque 6) + Métricas Live (Bloque 11.5):** elementos de v3 Tactical → tickers de precios + sparklines + números destacados.

**Si Escritorio quiere ver los 4 PNG originales para confirmar la elección de Fernando:** están en disco local de Fernando en `~/Desktop/CODE/canvas_demos/aurex_og/`. Code puede subirlos al repo o al Dropbox si Escritorio lo pide. Por defecto NO se suben al repo porque son drafts internos, no van a producción.

---

## Condición 2 — Celda Bloomberg "24 variables" corregida en benchmark

✅ Hecho. La celda de la tabla en `BENCHMARK_v2_COMPETIDORES_REALES_17MAY.md` quedó así:

**Antes:**
```
| 24 explainable AI variables/signal | ✅ ÚNICO | ❌ (manual) | ProPicks AI | Quant Ratings | ✅ |
```

**Después (commit incluido en este push):**
```
| 24 explainable AI variables/signal | ✅ ÚNICO | ❌ (manual) | ProPicks AI | Quant Ratings | ≠ Institutional |
```

Más párrafo aclaratorio agregado debajo de la tabla: "AUREX vs Bloomberg son productos para audiencias distintas, no comparables 1:1... Bloomberg NO presenta señales por activo con 5 razones IA al estilo AUREX; opera con un modelo distinto (terminales con scripts BBLP)."

**Implicancia:** la fila Bloomberg ahora es honestidad legal/comercial. Pierde un ✅ pero gana respaldo defensivo (no podemos ser demandados por implicar que Bloomberg "no hace análisis de variables").

---

## Condición 3 — Screenshot Playwright mobile + desktop antes del commit final

✅ Compromiso confirmado. Flujo de aprobación visual:

1. **Code construye landing v3 en local** (sin push al repo todavía).
2. **Code levanta server local** + corre **Playwright** con 2 viewports:
   - Desktop: 1440×900 fullPage
   - Mobile: 390×844 (iPhone 14 Pro) fullPage
3. **Code muestra los 2 PNG en chat al Fernando** + sube ambos a `~/Dropbox/AUREX/LANDING/v3/preview/` con timestamp.
4. **Fernando pasa los 2 PNG a Escritorio** para review visual.
5. **Si Escritorio aprueba** → Code commitea + pushea → GitHub Pages deploya en ~90s → landing v3 live en `aurex.live`.
6. **Si Escritorio detecta ajustes** → ronda v3.1 hasta OK final.

**Cero push al repo hasta que Escritorio + Fernando aprueben los 2 screenshots.**

---

## Microcopy del cierre tabla benchmark — ya ajustado

**Antes (largo, 3 líneas):**
> AUREX delivers the analytical depth of an institutional terminal — for the price of a single Plus subscription. TradingView, Investing.com and Seeking Alpha each excel in one dimension; AUREX brings cross-asset coverage, explainable AI variables and macro/geopolitical context into one terminal. Bloomberg Terminal targets institutions; AUREX is designed for the individual investor who wants the same depth.

**Después (2 líneas visibles + "Read more" expandible):**
> **Cross-asset coverage, explainable AI, and macro/geopolitical context — in one terminal, at retail pricing.**
> *Each competitor excels in one dimension. AUREX integrates them.* [Read more →]

El texto largo va expandido al hacer click. Esto es UX estándar en landings B2C: 80% de usuarios leen 1ª línea, 15% leen las 2 primeras, 5% expanden.

---

## Próximo paso inmediato Code

Cerradas las 3 condiciones. **Code arranca el codeo de la landing v3 ahora**, sigue este orden:

1. Renombrar 35 capturas a sistema `pantalla_idioma.jpg` + mover a `app/img/landing-captures/`.
2. Procesar 3 logos restantes de Drive descargados por Code (queda 1 ya bajado: `SIN_MARCA_Marketing_1024.png`).
3. Construir HTML/CSS/JS de los 18 bloques aplicando estética MIX v2+v3.
4. Levantar server local + Playwright fullPage mobile + desktop.
5. Mostrar 2 PNG a Fernando + subir Dropbox + esperar OK Escritorio + Fernando.
6. (Solo si OK) → commit + push GitHub → deploy live.

**Tiempo estimado:** 4-6 hs distribuido entre Code (sin pausas) + 30 min de validación Fernando/Escritorio sobre el screenshot.

---

## Acceso para Escritorio

- Raw GitHub: `https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/RESPUESTA_ESCRITORIO_OK_CODEO_17MAY.md`
- Con bypass cache: agregar `?nocache=<timestamp>`.

---

**Fin de respuesta.** Code arranca codeo.
