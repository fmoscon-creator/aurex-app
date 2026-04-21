# PENDING REVIEW — Fix Long Press Mercados (2 bugs + estilos nativa)

**Archivo**: aurex-features.js

---

## Bug 1 fix: Header "[object Object]"

**Causa**: Si `ticker` llega como objeto (desde búsqueda L1940 pasa `a.s` correctamente, pero protección agregada).
**Fix L6074**: Si `typeof ticker === 'object'`, extrae `.s` y asigna a meta.
**Fix L6075**: `name = meta ? (meta.n || meta.nombre || '') : ''` — protege contra undefined.

## Bug 2 fix: Key "mkt_lp_analisis" no resuelve

**Causa**: La key `mkt_lp_analisis` no existe en aurex-i18n.js (se perdió en un revert).
**Fix**: Usa `t('port_lp_analisis')` que SÍ existe (L393 en i18n) con traducción correcta en 8 idiomas.

## Fix 3: Estilos idénticos a nativa

Leído directamente de MercadosScreen.js L1306:
- **Modal card**: `background:var(--card)` + `border:1px solid var(--border2)` + `borderRadius:20`
  - ANTES: `background:#fff; border:3px solid var(--gold); border-radius:18px` (incorrecto)
  - DESPUÉS: réplica nativa exacta
- **Botón Análisis IA**: `background:rgba(212,160,23,0.08)` + `border:1px solid var(--gold)` ✓
- **Botones Fav/Portfolio/Compartir**: `background:var(--bg)` (nativa usa C.bg, más oscuro que C.card) ✓
- **Cancelar**: `border:1px solid var(--border2)` sin background, texto centered ✓

## Fix 4: Favoritos — emoji duplicado

**Causa**: Keys `mkt_lp_quitar_fav`/`mkt_lp_agregar_fav` incluyen "★" pero el código ya pone ⭐/☆ como span separado.
**Fix**: `.replace('★ ','')` al llamar t() para el texto del label.

---

## Verificación
- `node -c aurex-features.js` → OK
- Estilos replicados línea a línea de nativa L1306-1358
- Card oscura (var(--card)) con borde sutil, NO blanca con borde dorado grueso
