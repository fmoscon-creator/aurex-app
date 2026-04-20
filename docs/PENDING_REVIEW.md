# PENDING REVIEW — Fix bordes dorados + Pulse gauge + filtros Pulse

**Archivos** (LOCAL): aurex-i18n.js, aurex-features.js, index.html

---

## Fix 1: Bordes dorados en TODOS los popups (6 popups)

| Popup | Línea | Antes | Después |
|-------|-------|-------|---------|
| Market edit | L1381 | background:#fff;border-radius:16px | + border:3px solid var(--gold) |
| Futures edit | L4818 | background:#fff;border-radius:16px | + border:3px solid var(--gold) |
| Pulse info | L4673 | background:#fff;border-radius:18px | + border:3px solid var(--gold) |
| Sort modal | L5512 CSS | background:#fff;border-radius:20px | + border:3px solid var(--gold) |
| Long press | L5848 CSS | background:#fff;border-radius:18px | + border:3px solid var(--gold) |
| Search results | index.html L1817 | background:#fff;border-radius:12px | + border:3px solid var(--gold) |

## Fix 2: Pulse gauge — "Codicia" / "Neutral" fallbacks

- L4385: fallback `'Neutral'` → `t('mkt_gauge_neutral')`
- L4442: fallback `'Neutral'` → `t('mkt_gauge_neutral')`
(L4445-4449 ya estaban con t() del commit anterior)

## Fix 3: Filtros Pulse tabs (GLOBAL, CRIPTO, ACCIONES, COMOD, FUTUROS)

- L4591: `catLabels` hardcodeado → usa `t('mkt_pulse_cat_*')`
- 5 keys nuevas: mkt_pulse_cat_global, mkt_pulse_cat_cripto, mkt_pulse_cat_acciones, mkt_pulse_cat_comod, mkt_pulse_cat_futuros

## Nota: Precio "--" en FIL

El `--` en el long press de FIL no es bug de i18n — es que FIL no está en el cache de precios (no viene de Binance ni está en _pcPrices). Es tema de data/cobertura, no de traducción.

---

## Verificación
- `node -c aurex-features.js` → OK
- `node -c aurex-i18n.js` → OK
