# LANDING v3 — PENDIENTE REVISIÓN FERNANDO + ESCRITORIO

> **Estado:** PENDIENTE de OK visual de Fernando + revisión cruzada Escritorio
> **NO deployar a aurex.live producción hasta tener doble OK explícito**
> **Fecha snapshot:** 17-may-2026 ~03:30 AR

---

## Qué hay en esta carpeta

| Archivo | Tamaño | Descripción |
|---|---|---|
| `index.html` | 72.979 bytes / 1.163 líneas | HTML completo de landing v3, 18 bloques + 2 agregados nuevos (header newsletter + tablero Live Quotes táctico). Vanilla HTML/CSS/JS, sin frameworks. |
| `landing_v3_desktop_v2.png` | 558 KB | Screenshot Playwright **desktop 1440×900** fullpage, con los 2 agregados activos. |
| `landing_v3_mobile_v2.png` | 931 KB | Screenshot Playwright **mobile 390×844** fullpage, con los 2 agregados activos. |

---

## Cómo verlo

### Para Fernando
- Abrir los 2 PNG directamente con Vista Previa de macOS.
- O abrir el `index.html` en navegador local (necesita server porque carga capturas de `assets/captures/` que NO están en esta carpeta — viven en `~/Desktop/CODE/landing_v3/assets/captures/`).

### Para Escritorio
- Ver los PNG via raw URL:
  - Desktop: `https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/landing_v3_PENDIENTE_REVIEW_17MAY/landing_v3_desktop_v2.png`
  - Mobile: `https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/landing_v3_PENDIENTE_REVIEW_17MAY/landing_v3_mobile_v2.png`
- Ver HTML crudo via raw URL:
  - `https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/landing_v3_PENDIENTE_REVIEW_17MAY/index.html`

---

## Cambios incorporados respecto a v3 anterior (versión `landing_v3_desktop.png` + `landing_v3_mobile.png` SIN sufijo `_v2`)

### 1. Header newsletter (botón + micro-modal)
- Botón dorado **"Get early access →"** agregado en `hdr-cta` entre el lang-sel y el "Get the app".
- Click abre micro-modal con fade + slide (animaciones definidas en CSS).
- 1 solo input email (required) + botón "Notify me" + copy "Be first to know. No spam."
- Submit AJAX vía `fetch` a `https://formspree.io/f/xpqnajgp` (cuenta Formspree creada 17-may 03:08 AR con `fmoscon@gmail.com`, notificaciones a `app.aurex@gmail.com`).
- Free tier: 50 submissions/mes.
- Spinner durante submit + mensaje success / error inline.
- Cierre por X / click fuera / tecla Escape.

### 2. Reemplazo del Bloque 11.5 — Tablero "Live Market Pulse" táctico
- **Antes:** 4 cuadritos estáticos con counters animados (350 / 24 / 8 / 7).
- **Ahora:** Tablero estilo Bloomberg/Tokyo con 3 secciones:
  - **Magnificent 7 · Equities** (AAPL / NVDA / MSFT / GOOGL / META / AMZN / TSLA) — precios hardcoded, refresh manual periódico.
  - **Crypto Top 5 · Live** (BTC / ETH / SOL / BNB / XRP) — precios **REALES** desde CoinGecko free API, refresh cada 60s.
  - **Commodities + Macro Futures** (GOLD / BRENT / SP500 FUT / VIX) — hardcoded, indicativo.
- Paleta: fondo `#0d0d12`, verde neón `#00ff88` positivos, rojo `#ff4444` negativos, dorado `#D4A017` para labels y dot `● LIVE` con animación pulse.
- Reloj UTC en tiempo real (HH:MM:SS UTC) actualizado cada 1s.
- IntersectionObserver: el fetch de CoinGecko solo arranca cuando el bloque entra en viewport (optimización de performance).
- Disclosure honesto en footer del tablero: "Crypto: CoinGecko API (~60s refresh) · Equities, commodities & futures: indicative, refreshed periodically · For demonstration on aurex.live — full real-time tape in the AUREX app."

---

## Lo que NO se tocó del HTML v3 anterior

- Header logo + nav Channels dropdown.
- Hero con iPhone mockup + 4 banners.
- Ticker animado (Bloque 2.5).
- Constelación de Zona B (canvas con estrellas sutiles).
- Carrusel principal de 10 slides.
- Bloque 8.5 "More you can do" con 4 acciones (Share signal / Nueva lista / Crear alerta / Agregar activo).
- Tabla benchmark vs TradingView / Investing / Seeking Alpha / Bloomberg (con celda Bloomberg corregida a "≠ Institutional").
- Bloque "We don't trade" (lo que NO hacemos, contra mitigación legal).
- Bloque planes (FREE / PRO / ELITE).
- Footer con channels + privacy/terms.

---

## Decisiones pendientes de Fernando + Escritorio

### Bloqueantes para deployar a producción aurex.live
1. **OK visual desktop** — ¿se ve bien el tablero táctico al lado del resto del diseño dorado? ¿O el contraste de paletas (dark Bloomberg vs dorado AUREX) molesta visualmente?
2. **OK visual mobile** — el tablero colapsa a 1 columna en mobile (≤680px). ¿Se ve legible o es muy denso?
3. **OK visual newsletter modal** — al hacer click en "Get early access", el modal aparece centrado con fade. ¿El copy "Be first to know. No spam." es el correcto o queremos algo más AUREX-tone?
4. **Endpoint Formspree confirmado** — cuenta creada con `fmoscon@gmail.com`, 50 submissions/mes free tier. Si el flujo de leads supera ese límite, upgrade a Basic $10/mes (1.000 submissions). NO upgrade necesario hasta confirmar volumen.

### Bloqueantes operativos
5. **Logo oficial Drive** — Code descargó 1 de 4 archivos del Google Drive. Pendiente bajar los otros 3 (con marca + sin marca, formatos iOS / Android / PWA / Marketing). NO bloquea OK visual porque la landing usa el SVG existente.
6. **Las 4 propuestas de OG image** (1200×630 px, mix v2 Stellar ajustada + v3 Tactical) ya elegidas por Fernando, pero el archivo final OG todavía no está generado en `assets/landing/og_image.png` — Code tiene que crearlo con Canvas-design skill antes del deploy.

---

## Próximos pasos cuando haya doble OK

1. Mover `index.html` + `assets/` de `~/Desktop/CODE/landing_v3/` a `~/Desktop/aurex-app/` (root, reemplazando el `index.html` actual que sirve la landing v2 / fase 0).
2. Verificar links internos: el botón "Get the app" actualmente apunta a `#plans`, hay que revisar que el ancla `plans` exista en el HTML final.
3. Generar OG image final con Canvas (1200×630 PNG) y guardar en `assets/landing/og_image.png`.
4. Commit + push al repo aurex-app branch main.
5. GitHub Pages auto-deploy a aurex.live (1-3 min).
6. Verificar render real en aurex.live.
7. Test funcional: submit del form newsletter con un email de prueba — confirmar que llega notificación a `app.aurex@gmail.com`.
8. Si todo OK → anuncio en Telegram + X.

---

## Referencias cruzadas

- **Brief stack herramientas Code:** `STACK_HERRAMIENTAS_CODE_AUREX_17MAY.md`
- **Brief mapeo capturas v2:** `CAPTURAS_LANDING_v2_MAPEO_17MAY.md`
- **Benchmark competidores v2:** `BENCHMARK_v2_COMPETIDORES_REALES_17MAY.md`
- **Respuesta a Escritorio:** `RESPUESTA_ESCRITORIO_OK_CODEO_17MAY.md`
- **Doc consolidado cierre sesión:** `../CIERRE_SESION_17MAY_STATUS_PENDIENTES.md`
- **Decisión stack landing:** memoria Code `project_landing_stack_decision.md`

---

**Fin README. Esperando OK visual de Fernando y revisión cruzada de Escritorio.**
