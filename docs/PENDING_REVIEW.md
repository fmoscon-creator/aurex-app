# PENDING REVIEW — 16 fallbacks PWA (aurex-features.js)

Código local. Solo aurex-features.js. `node -c` → OK.

---

## GRUPO 1 — 5 catches crypto → `/api/crypto-prices`

| # | Línea | Contexto | Fix |
|---|-------|----------|-----|
| 1 | L380 | Precios crypto individuales Mercados | catch → fetch `/api/crypto-prices` → update DOM + `_pcPrices` |
| 2 | L2274 | Watchlist crypto | catch → fetch `/api/crypto-prices` → `prcs[sym]` + renderWatchCnt |
| 3 | L2435 | Watchlist histórico crypto | catch → fetch `/api/crypto-prices` → `_wlHistPrices[period]` |
| 4 | L2571 | Watchlist comparador crypto | catch → fetch `/api/crypto-prices` → `_wlCompareHist` |
| 5 | L870 | Portfolio crypto batch | catch → fetch `/api/crypto-prices` → `_pcPrices` + `.finally(done)` |

## GRUPO 2 — 6 catches stocks → Yahoo directo

| # | Línea | Contexto | Fix |
|---|-------|----------|-----|
| 6 | L465 | **Mercados stocks principal** | catch → Yahoo directo con mismo ySym/interval/range → update DOM |
| 7 | L2280 | Watchlist stocks | catch → fetch `query1.finance.yahoo.com` directo → `prcs[sym]` |
| 8 | L2442 | Watchlist histórico stocks | catch → Yahoo directo → `_wlHistPrices` con `valid[valid.length-1]` |
| 9 | L2585 | Watchlist comparador stocks | catch → Yahoo directo → `_wlCompareHist` |
| 10 | L897 | Portfolio stocks batch | catch → Yahoo directo → `_pcPrices` + `.finally(done)` |

(L1576 resultó ser `_fetchSearchPrices` — no aplica)

## GRUPO 3 — Señales IA → localStorage

| # | Línea | Fix |
|---|-------|-----|
| 10 | L3821 | Éxito backend → `localStorage.setItem('aurex_ia_pwa_cache', {signals, ts})` |
| 11 | L3833 | Tras 3 reintentos fallidos → `_iaLoadFromCache()` lee localStorage |

Función nueva `_iaLoadFromCache()`: lee cache, valida, hace `_actualizarContadores` + `_renderIALista`. Muestra "Cache · X min" en timestamp.

## GRUPO 4 — Portfolio + Watchlist datos → localStorage

| # | Línea | Fix |
|---|-------|-----|
| 12 | L835 | Portfolio catch Supabase → lee `aurex_port_items_cache` antes de renderPortfolioEmpty (corrección Escritorio) |
| 13 | L1874 | Watchlist sync éxito → `localStorage.setItem('aurex_wl_pwa_cache', {lists, items})` |
| 14 | L1877+ | Watchlist sync fallo → `.catch` lee `aurex_wl_pwa_cache` → restaura `_wlListsCache` + `_wlItemsCache` |

## Keys localStorage PWA (3 nuevas)

| Key | Dato |
|-----|------|
| aurex_ia_pwa_cache | { signals, ts } |
| aurex_wl_pwa_cache | { lists, items } |
| aurex_port_items_cache | (ya existía — ahora se usa en catch) |

## Total: 15 catches modificados + 1 función nueva + 1 catch corregido = 17 fixes
