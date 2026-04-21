# PENDING REVIEW — Fallback Yahoo directo en Nativa (4 archivos, 6 catches)

---

## Problema
Los 297 activos no-crypto dependen de Yahoo via Railway proxy. Si Railway cae → sin precios. Catches vacíos.

## Fix
En cada catch donde falla `${BACKEND}/api/yahoo`, intentar Yahoo directo desde el celular. Si también falla → null.

---

## CÓDIGO REAL COMPLETO — Los 6 catches

### 1. MercadosScreen.js — fetchOne (L398)

```js
      } catch {
        // Fallback: Yahoo directo desde el celular (sin Railway proxy)
        try {
          const ySym = a.ySymbol || a.s;
          const aTf = getTf(a.s);
          const tfMap = { '24h': '1mo', '7d': '1mo', '1m': '1mo', '3m': '3mo', '1a': '1y' };
          const intMap = { '3m': '1wk', '1a': '1wk' };
          const range = tfMap[aTf] || '1mo';
          const interval = intMap[aTf] || '1d';
          const directUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ySym)}?interval=${interval}&range=${range}&_=${Date.now()}`;
          const res2 = await fetch(directUrl, { cache: 'no-store' });
          const data2 = await res2.json();
          const q2 = data2?.chart?.result?.[0];
          if (!q2) return null;
          const closes2 = (q2.indicators?.quote?.[0]?.close || []).filter(x => x != null);
          const price2 = closes2[closes2.length - 1] || q2.meta.regularMarketPrice;
          const prev2 = closes2.length > 1 ? closes2[closes2.length - 2] : q2.meta.chartPreviousClose || price2;
          const change2 = prev2 ? ((price2 - prev2) / prev2) * 100 : 0;
          return { sym: a.s, price: price2, change: change2, closes: closes2.slice(-20) };
        } catch { return null; }
      }
```

### 2. MercadosScreen.js — loadFuturesPrices (L426)

```js
      } catch {
        // Fallback: Yahoo directo
        try {
          const directUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(sym)}?interval=1d&range=2d&_=${Date.now()}`;
          const res2 = await fetch(directUrl, { cache: 'no-store' });
          const data2 = await res2.json();
          const q2 = data2?.chart?.result?.[0];
          if (!q2) return null;
          const closes2 = (q2.indicators?.quote?.[0]?.close || []).filter(x => x != null);
          const price2 = closes2[closes2.length - 1] || q2.meta.regularMarketPrice;
          const prev2 = closes2.length > 1 ? closes2[closes2.length - 2] : q2.meta.chartPreviousClose || price2;
          return { sym, price: price2, change: prev2 ? ((price2 - prev2) / prev2) * 100 : 0 };
        } catch { return null; }
      }
```

### 3. WatchlistScreen.js — precios no-crypto (L389)

```js
        } catch (e) {
          // Fallback: Yahoo directo
          try {
            const res2 = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(sym)}?interval=1d&range=1d&_=${Date.now()}`);
            const d2 = await res2.json();
            const m2 = d2?.chart?.result?.[0]?.meta;
            if (m2?.regularMarketPrice) {
              const prev2 = m2.chartPreviousClose || m2.previousClose;
              p[sym] = { price: m2.regularMarketPrice, change: prev2 ? ((m2.regularMarketPrice - prev2) / prev2 * 100) : 0 };
            }
          } catch {}
        }
```

### 4. WatchlistScreen.js — histórico períodos (L429)

```js
          } catch (e) {
            // Fallback: Yahoo directo
            try {
              const url2 = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?interval=1d&range=${range}&_=${Date.now()}`;
              const res2 = await fetch(url2);
              const data2 = await res2.json();
              const closes2 = data2?.chart?.result?.[0]?.indicators?.quote?.[0]?.close;
              if (closes2) { const valid2 = closes2.filter(c => c != null); if (valid2.length > 0) all[per][ticker] = valid2[0]; }
            } catch {}
          }
```

### 5. PortfolioScreen.js — loadPrices no-crypto (L155)

```js
        } catch (e) {
          console.error('[AUREX PORT] Yahoo proxy FAILED for', i.simbolo, ':', e.message);
          // Fallback: Yahoo directo
          try {
            const res2 = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(i.simbolo)}?interval=1d&range=1d&_=${Date.now()}`);
            const d2 = await res2.json();
            const m2 = d2?.chart?.result?.[0]?.meta;
            if (m2?.regularMarketPrice) {
              const prev2 = m2.previousClose || m2.chartPreviousClose || m2.regularMarketPrice;
              allPrices[i.simbolo] = { price: m2.regularMarketPrice, change24h: prev2 > 0 ? ((m2.regularMarketPrice - prev2) / prev2 * 100) : 0 };
            }
          } catch (e2) { console.error('[AUREX PORT] Yahoo direct FAILED for', i.simbolo); }
        }
```

### 6. PortfolioScreen.js — ensurePrice (L401)

```js
    } catch (e) {
      // Fallback: Yahoo directo
      try {
        const res2 = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(sym)}?interval=1d&range=1d&_=${Date.now()}`);
        const d2 = await res2.json();
        const m2 = d2?.chart?.result?.[0]?.meta;
        if (m2?.regularMarketPrice) {
          const prev2 = m2.previousClose || m2.chartPreviousClose || m2.regularMarketPrice;
          setPrices(prev => ({ ...prev, [sym]: { price: m2.regularMarketPrice, change24h: prev2 > 0 ? ((m2.regularMarketPrice - prev2) / prev2 * 100) : 0 } }));
        }
      } catch {}
    }
```

---

## Extracción de campos Yahoo v8 (idéntica en los 6)

| Campo | Ruta JSON | Uso |
|-------|-----------|-----|
| price | `chart.result[0].indicators.quote[0].close[-1]` o `chart.result[0].meta.regularMarketPrice` | Precio actual |
| prev | `chart.result[0].meta.chartPreviousClose` o `chart.result[0].meta.previousClose` | Cierre anterior |
| change | `((price - prev) / prev) * 100` | Cambio % 24h |
| closes | `chart.result[0].indicators.quote[0].close` filtrado nulls | Sparklines |

## Impacto
- 297 activos + futuros cubiertos
- Todas las pantallas: Mercados, Watchlist, Portfolio
- IAScreen NO necesita fix (no llama Yahoo — solo usa /api/ia-signals)
- No toca backend ni PWA
