# PENDING REVIEW — Fallback Yahoo directo en Nativa (4 archivos, 6 catches)

---

## Problema
Los 297 activos no-crypto dependen de Yahoo via Railway proxy. Si Railway cae → sin precios. Catches vacíos.

## Fix
En cada catch donde falla `${BACKEND}/api/yahoo`, intentar Yahoo directo: `https://query1.finance.yahoo.com/v8/finance/chart/...` desde el celular. Si también falla → null (igual que antes).

---

## Archivos modificados (NATIVA — branch dev)

### MercadosScreen.js — 2 fixes

**fetchOne (L398):** catch `{ return null }` → try Yahoo directo con mismo ySym/interval/range → return `{ sym, price, change, closes }` o null.

**loadFuturesPrices (L426):** catch `{ return null }` → try Yahoo directo `range=2d` → return `{ sym, price, change }` o null.

### WatchlistScreen.js — 2 fixes

**Precios no-crypto (L389):** catch `(e) {}` → try Yahoo directo `range=1d` → `p[sym] = { price, change }` o silencio.

**Histórico períodos (L429):** catch `(e) {}` → try Yahoo directo con el range del período → `all[per][ticker] = valid[0]` o silencio.

### PortfolioScreen.js — 2 fixes

**loadPrices no-crypto (L155):** catch con log → try Yahoo directo `range=1d` → `allPrices[i.simbolo] = { price, change24h }` o log error.

**ensurePrice (L401):** catch `(e) {}` → try Yahoo directo → `setPrices` o silencio.

---

## Patrón del fallback (idéntico en los 6 lugares)

```js
} catch {
  try {
    const res2 = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(sym)}?interval=1d&range=1d&_=${Date.now()}`);
    const d2 = await res2.json();
    // extraer price, change del meta
  } catch { /* silencio — ya se intentaron 2 vías */ }
}
```

## Impacto
- 297 activos (acciones, ETFs, bonos, commodities, metales, divisas, mat.primas) + futuros
- Cobertura: todas las pantallas que usan Yahoo via proxy
- No toca backend ni PWA
- No requiere API key (Yahoo es público)
