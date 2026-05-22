# 🐛 PROBLEMA — Fondo blanco en Safari en las páginas legales (docs) — para Escritorio

> **22-may-2026.** Documento técnico con SOLO datos verificados (rutas, código, comportamiento) + 1 hipótesis marcada. Para que Escritorio opine el fix.
> Repo público: `github.com/fmoscon-creator/aurex-app`.

## 1. EL PROBLEMA
La página legal de iOS **`docs/privacy-ios.html`** (y `terms-ios.html`) en Safari (Mac, incluso en **ventana privada / sin caché**) **carga negra y al instante se pone el fondo BLANCO**, perdiendo el formato. En **Chrome se ve NEGRA y estable**. La **landing `index.html` (aurex.live) se ve NEGRA en el MISMO Safari**.

## 2. DÓNDE ESTÁN LOS ARCHIVOS (repo aurex-app)
| Archivo | Qué es | Raw URL para leer el código |
|---|---|---|
| `docs/privacy.html` | Legal que **abre la app Android/iOS** (`aurex.live/docs/privacy.html`, desde `PerfilScreen.js`) | `raw.githubusercontent.com/fmoscon-creator/aurex-app/main/docs/privacy.html` |
| `docs/terms.html` | Términos (Android) | `…/main/docs/terms.html` |
| `docs/privacy-ios.html` | **NUEVA** legal iOS (marca "AurexLive") — la que falla | `…/main/docs/privacy-ios.html` |
| `docs/terms-ios.html` | NUEVA términos iOS | `…/main/docs/terms-ios.html` |
| `index.html` (raíz) | **Landing aurex.live** — se ve NEGRA en Safari (la referencia que SÍ funciona) | `…/main/index.html` |

> **Nota:** `docs/privacy.html` (Android) y `docs/privacy-ios.html` (iOS) son **CÓDIGO IDÉNTICO** salvo el texto "AUREX"→"AurexLive". El bug aparece en AMBAS en Safari (Android se ve negra solo porque usa Chrome WebView; el footer de la landing las abre en un `<iframe>` con fondo negro que tapa el problema).

## 3. CÓMO SE VE EL CÓDIGO (CSS de fondo, `docs/privacy-ios.html`)
```css
:root { --black: #080808; ... }
html { background: var(--black); }            /* agregado */
body { background: var(--black); color: var(--text); ... min-height: 100vh; }
body::before { content:''; position: fixed; inset: 0;
   background-image: radial-gradient(... transparent ...); pointer-events:none; z-index:0; }
```
Metas (head): `<meta name="theme-color" content="#080808">` + `<meta name="color-scheme" content="dark">` + `<link>` Google Fonts (render-blocking).

## 4. LO QUE SE PROBÓ (sin resolver en Safari de Fernando)
- `html { background: #080808 }` (raíz negra) — el render computa `html bg = rgb(8,8,8)` ✓ pero Safari igual blanco.
- `<meta theme-color #080808>` + `<meta color-scheme dark>` (igual que la landing) — no resolvió.
- Verificado: **NO hay `<script>` ni regla CSS que ponga blanco**; `var(--white)` se usa SOLO en color de texto.
- **Render headless WebKit (mismo motor que Safari), en modo CLARO y OSCURO → se ve NEGRO** (`html`/`body` = rgb 8,8,8). O sea: NO se reproduce el blanco desde el motor; es comportamiento del Safari real.

## 5. 🎯 DIFERENCIA REAL verificada entre landing (funciona) y docs (falla)
- **Landing `index.html` (negra en Safari):** `html,body{background:var(--bg)}` en una sola regla, **NO tiene `body::before{position:fixed}`** que cubra el viewport (sus `::before` son de componentes puntuales).
- **Docs (blancas en Safari):** SÍ tienen **`body::before { position: fixed; inset: 0; z-index: 0 }`** con `background-image` transparente.

## 6. HIPÓTESIS (a confirmar por Escritorio)
El **`body::before { position: fixed; inset: 0 }`** de las docs es el sospechoso #1 — `position:fixed` cubriendo el viewport es un patrón con bugs de pintado conocidos en Safari. **Posible fix:** quitar ese `body::before` (es solo decorativo, unos puntos dorados) o cambiarlo a `position: absolute`. La landing no lo tiene y se ve negra.

## 7. PREGUNTA PARA ESCRITORIO
¿Coincidís en que el `body::before{position:fixed}` es la causa? ¿O ves otra (Google Fonts render-blocking, `min-height:100vh` en Safari, etc.)? ¿Cuál es el fix mínimo para que estas páginas se vean negras en Safari como la landing?

> **IMPORTANTE:** esto NO bloquea la review de Apple (el reviewer ve la página legible). Es un tema de prolijidad visual. Pero hay que resolverlo.
