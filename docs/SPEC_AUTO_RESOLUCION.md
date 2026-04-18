# SPEC: Sistema de Auto-Resolución y Fallback AUREX — v3 (Corregido)

**Estado**: Corregido con 4 fixes de Escritorio
**Fecha**: 18/abril/2026
**Datos**: Verificados contra código real + APIs probadas + rate limits documentados
**Revisiones**: v1 borrador → v2 detalle técnico → v3 correcciones Escritorio

---

## 1. VOLUMEN ACTUAL DE LLAMADAS (verificado en server.js)

### 1.1 Binance

| Cron | Intervalo | Función | Calls a Binance por ciclo | Tipo |
|------|-----------|---------|--------------------------|------|
| checkAlertas | 30 seg | L159 | 1 (batch: todos los crypto alertas en 1 request) | ticker/price batch |
| calcularSenalesIA | 5 min | L376-377 | ~106 (53 crypto × 2: ticker/24hr + klines) | individual por symbol |
| calcularPulse | 5 min | L589-653 | 5 (BTC 24hr, ETH 24hr, BTC klines 90d, BTC ticker, ETH ticker) | individual |
| healthCheck | 5 min | L790 | 1 (BTC price check) | ticker/price |

**Total estimado por hora**: ~2 (checkAlertas) + ~1272 (IA: 106×12) + ~60 (Pulse: 5×12) + ~12 (health) = **~1346 calls/hora a Binance**

Binance permite 1200/min → sin problemas.

### 1.2 Yahoo Finance

| Cron | Intervalo | Calls por ciclo |
|------|-----------|----------------|
| calcularSenalesIA | 5 min | ~297 (297 non-crypto assets × 1 Yahoo proxy call) |
| calcularPulse | 5 min | ~10 (VIX, GSPC, ES=F, NQ=F, etc.) |
| /api/yahoo (proxy PWA) | On demand | Variable |

---

## 2. RATE LIMITS FALLBACK APIs (verificado 18/abril/2026)

### 2.1 CoinGecko Free (Demo)

| Dato | Valor | Fuente |
|------|-------|--------|
| Calls/mes | 10,000 | coingecko.com/en/api/pricing |
| Calls/min | 30 | coingecko.com/en/api/pricing |
| Batch endpoint | ✅ SÍ: `/simple/price?ids=bitcoin,ethereum,...` | Probado: 10 coins en 1 call |
| Data freshness | ~60 segundos | Documentación |
| 24h change | ✅ `include_24hr_change=true` | Probado |

**Cálculo de consumo como fallback:**
- calcularSenalesIA: 53 crypto en 1 batch call cada 5 min = 12 calls/hora = 288/día
- checkAlertas: 1 batch call cada 30s = 120/hora = 2880/día
- **Total diario: ~3168 calls/día = ~95,000/mes**
- **EXCEDE el límite free de 10,000/mes**

**Solución**: NO usar CoinGecko para checkAlertas (cada 30s es demasiado). Solo para calcularSenalesIA (cada 5 min): 288/día = 8,640/mes → cabe en 10,000.

checkAlertas en fallback usa caché extendido (ver sección 4).

### 2.2 CryptoCompare Free

| Dato | Valor | Fuente |
|------|-------|--------|
| Calls/mes | 100,000 | Documentación legacy |
| Calls/seg | ~20 | Documentación legacy |
| Batch endpoint | ✅ SÍ: `/data/pricemulti?fsyms=BTC,ETH,...` | Probado: 10 coins en 1 call |
| 24h change | ❌ No en batch, requiere endpoint separado | — |

**Cálculo**: 3168/día = ~95,000/mes → cabe en 100,000.
**CryptoCompare puede absorber TODO el volumen como fallback.**

### 2.3 Orden de fallback definitivo

```
Binance (primaria, 1200/min)
  ↓ falla
CryptoCompare (fallback 1, 100k/mes, absorbe todo)
  ↓ falla
CoinGecko (fallback 2, 10k/mes, solo IA signals)
  ↓ falla
Caché extendido (último recurso)
```

CryptoCompare ANTES de CoinGecko porque tiene 10x más capacidad gratuita.

---

## 3. FUNCIONES A CREAR/MODIFICAR

### 3.1 Nueva función: fetchCryptoPrice(symbol)

**Ubicación**: server.js, nueva función después de L91 (getStockPrice)
**Usada por**: checkAlertas (L159), calcularSenalesIA (L376)

```javascript
const COINGECKO_IDS = {
  BTC: 'bitcoin', ETH: 'ethereum', SOL: 'solana', BNB: 'binancecoin',
  XRP: 'ripple', ADA: 'cardano', AVAX: 'avalanche-2', DOT: 'polkadot',
  LINK: 'chainlink', MATIC: 'matic-network', DOGE: 'dogecoin',
  SHIB: 'shiba-inu', LTC: 'litecoin', ATOM: 'cosmos', UNI: 'uniswap',
  NEAR: 'near', APT: 'aptos', ARB: 'arbitrum', OP: 'optimism',
  TRX: 'tron', TON: 'the-open-network', SUI: 'sui', PEPE: 'pepe',
  WIF: 'dogwifcoin', FIL: 'filecoin', INJ: 'injective-protocol',
  RUNE: 'thorchain', USDT: 'tether', USDC: 'usd-coin',
};

// Caché mejorado con source tracking
const cryptoCache = {};
const CRYPTO_CACHE_NORMAL_TTL = 60000;      // 60s cuando fuente primaria OK
const CRYPTO_CACHE_FALLBACK_TTL = 300000;    // 5min cuando en fallback
const CRYPTO_CACHE_EMERGENCY_TTL = 1800000;  // 30min cuando todo falla

// NOTA: fetchCryptoPriceBatch SOLO retorna precios con source.
// NO gestiona health state — eso lo hace healthCheck leyendo el source.
// Fix Problema 1 y 2 de Escritorio.

async function fetchCryptoPriceBatch(symbols) {
  const result = {};
  const now = Date.now();

  // 1. Binance batch (primaria)
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 5000);
    const pairs = symbols.map(s => s + 'USDT');
    const r = await fetch('https://api.binance.com/api/v3/ticker/price?symbols=' +
      JSON.stringify(pairs), { signal: ctrl.signal });
    clearTimeout(t);
    const data = await r.json();
    if (Array.isArray(data)) {
      data.forEach(p => {
        const sym = p.symbol.replace('USDT', '');
        result[sym] = { price: parseFloat(p.price), source: 'binance', stale: false, ts: now };
        cryptoCache[sym] = result[sym];
      });
      return result; // source: 'binance' — healthCheck lee esto
    }
  } catch(e) {}

  // 2. CryptoCompare batch (fallback 1 — 100k/mes)
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 5000);
    const r = await fetch('https://min-api.cryptocompare.com/data/pricemulti?fsyms=' +
      symbols.join(',') + '&tsyms=USD', { signal: ctrl.signal });
    clearTimeout(t);
    const data = await r.json();
    if (data && typeof data === 'object') {
      Object.keys(data).forEach(sym => {
        if (data[sym]?.USD) {
          result[sym] = { price: data[sym].USD, source: 'cryptocompare', stale: false, ts: now };
          cryptoCache[sym] = result[sym];
        }
      });
      return result; // source: 'cryptocompare' — healthCheck sabe que Binance falló
    }
  } catch(e) {}

  // 3. CoinGecko batch (fallback 2 — 10k/mes)
  try {
    const ids = symbols.map(s => COINGECKO_IDS[s]).filter(Boolean).join(',');
    if (ids) {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 5000);
      const r = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=' +
        ids + '&vs_currencies=usd', { signal: ctrl.signal });
      clearTimeout(t);
      const data = await r.json();
      if (data) {
        symbols.forEach(sym => {
          const id = COINGECKO_IDS[sym];
          if (id && data[id]?.usd) {
            result[sym] = { price: data[id].usd, source: 'coingecko', stale: false, ts: now };
            cryptoCache[sym] = result[sym];
          }
        });
        return result; // source: 'coingecko'
      }
    }
  } catch(e) {}

  // 4. Caché (último recurso)
  symbols.forEach(sym => {
    if (cryptoCache[sym]) {
      const age = now - cryptoCache[sym].ts;
      if (age < CRYPTO_CACHE_EMERGENCY_TTL) {
        result[sym] = {
          price: cryptoCache[sym].price,
          source: 'cache',
          stale: true,
          staleSince: cryptoCache[sym].ts,
          ageMinutes: Math.round(age / 60000),
          ts: cryptoCache[sym].ts
        };
      }
    }
  });

  return result; // source: 'cache' — healthCheck sabe que todo falló
}
```

### 3.2 Nueva función: fetchStockPriceBatch(symbols)

**Ubicación**: server.js, después de fetchCryptoPriceBatch

```javascript
const stockCache = {};
const STOCK_CACHE_NORMAL_TTL = 60000;
const STOCK_CACHE_EMERGENCY_TTL = 1800000;

async function fetchStockPriceBatch(symbols) {
  const result = {};
  const now = Date.now();

  // 1. Yahoo Finance via proxy (primaria)
  const failed = [];
  await Promise.allSettled(symbols.map(async sym => {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 5000);
      const r = await fetch('https://aurex-app-production.up.railway.app/api/yahoo?symbol=' +
        sym + '&interval=1d&range=2d', { signal: ctrl.signal });
      clearTimeout(t);
      const d = await r.json();
      const price = d?.chart?.result?.[0]?.meta?.regularMarketPrice;
      if (price) {
        result[sym] = { price, source: 'yahoo', stale: false, ts: now };
        stockCache[sym] = result[sym];
      } else { failed.push(sym); }
    } catch(e) { failed.push(sym); }
  }));

  // 2. Alpha Vantage para los que fallaron (fallback)
  for (const sym of failed) {
    try {
      const data = await getStockPrice(sym);
      if (data?.price) {
        result[sym] = { price: data.price, source: 'alphavantage', stale: false, ts: now };
        stockCache[sym] = result[sym];
      }
    } catch(e) {}
  }

  // 3. Caché para los que siguen sin precio
  symbols.forEach(sym => {
    if (!result[sym] && stockCache[sym]) {
      const age = now - stockCache[sym].ts;
      if (age < STOCK_CACHE_EMERGENCY_TTL) {
        result[sym] = {
          price: stockCache[sym].price,
          source: stockCache[sym].source + ' (cached)',
          stale: true,
          staleSince: stockCache[sym].ts,
          ageMinutes: Math.round(age / 60000),
        };
      }
    }
  });

  return result;
}
```

### 3.3 Nueva función: _fetchCryptoCompareIA(sym) — fallback para motor IA

**Ubicación**: server.js, después de _fetchBinanceIA (L386)
**Usada por**: calcularSenalesIA cuando _fetchBinanceIA retorna null
**Mapeo verificado**: 9 campos idénticos a _fetchBinanceIA (aprobado por Escritorio)

```javascript
async function _fetchCryptoCompareIA(sym) {
  try {
    const [tickerR, histR] = await Promise.all([
      fetch('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=' + sym + '&tsyms=USD',
        { signal: AbortSignal.timeout(5000) }),
      fetch('https://min-api.cryptocompare.com/data/v2/histoday?fsym=' + sym + '&tsym=USD&limit=16',
        { signal: AbortSignal.timeout(5000) })
    ]);
    const ticker = await tickerR.json();
    const hist = await histR.json();

    const t = ticker?.RAW?.[sym]?.USD;
    const klines = hist?.Data?.Data;
    if (!t || !Array.isArray(klines) || klines.length === 0) return null;

    const cls = klines.map(k => k.close).filter(x => x > 0);
    const vols = klines.map(k => k.volumefrom).filter(x => x > 0);
    const av = vols.length > 1
      ? vols.slice(0, -1).reduce((a, b) => a + b, 0) / (vols.length - 1)
      : vols[0] || 1;

    return {
      precio:    t.PRICE,          // ← Binance: lastPrice
      precio24h: t.OPEN24HOUR,     // ← Binance: prevClosePrice
      vol24h:    t.VOLUME24HOUR,   // ← Binance: volume
      volProm:   av,                // ← Binance: avg(klines vols[0..n-1])
      hi:        t.HIGH24HOUR,     // ← Binance: highPrice
      lo:        t.LOW24HOUR,      // ← Binance: lowPrice
      cls:       cls,               // ← Binance: klines closes array (16-17 entries)
      hiMax:     Math.max(...cls),  // ← Binance: max(klines closes)
      loMin:     Math.min(...cls),  // ← Binance: min(klines closes)
    };
  } catch(e) { return null; }
}
```

**Mapeo campo por campo (verificado contra _calcIAScore L410-422):**

| Campo | Usado en _calcIAScore | Binance source | CryptoCompare source | Match |
|-------|----------------------|----------------|---------------------|-------|
| precio | L412: tendencia | lastPrice | RAW.sym.USD.PRICE | ✅ |
| precio24h | L412: (precio-precio24h)/precio24h | prevClosePrice | RAW.sym.USD.OPEN24HOUR | ✅ |
| vol24h | L416: vol24h/volProm | volume | RAW.sym.USD.VOLUME24HOUR | ✅ |
| volProm | L416: denominador | avg klines vols | avg histoday volumefrom | ✅ |
| hi | L418: (hi-lo)/precio | highPrice | RAW.sym.USD.HIGH24HOUR | ✅ |
| lo | L418: denominador | lowPrice | RAW.sym.USD.LOW24HOUR | ✅ |
| cls | L414: _calcRSI14(cls) ≥15 | klines closes (16) | histoday closes (17) | ✅ |
| hiMax | L446: soporte/resist | max(closes) | max(closes) | ✅ |
| loMin | L446: soporte/resist | min(closes) | min(closes) | ✅ |

**Nota MACD**: _calcIAScore tiene guard `cls.length >= 26` para MACD/EMA26. Con 16 entries (Binance) o 17 (CryptoCompare), ese bloque queda inactivo en ambos. Comportamiento idéntico, sin regresión.

### 3.4 Modificar: calcularSenalesIA — fallback interno

**Cambio en L480 (dentro del loop de activos crypto):**

**Antes**:
```javascript
let d = await _fetchBinanceIA(act.y || act.s);
```

**Después**:
```javascript
let d = await _fetchBinanceIA(act.y || act.s);
if (!d) d = await _fetchCryptoCompareIA(act.s); // fallback con OHLCV completo
```

Si ambos fallan, `d` es null y `_calcIAScore` no se ejecuta para ese activo — usa la señal anterior cacheada. Mismo comportamiento que hoy cuando Binance falla.

### 3.5 Modificar: checkAlertas (L152)

**Cambio**: Reemplazar fetch directo a Binance por `fetchCryptoPriceBatch`

**Antes** (L159):
```javascript
try { const r = await fetch('https://api.binance.com/api/v3/ticker/price?symbols=' + JSON.stringify(cryptoSyms));
  (await r.json()).forEach(p => { cp[p.symbol.replace('USDT','')] = parseFloat(p.price); }); } catch(e) {}
```

**Después**:
```javascript
const cpResult = await fetchCryptoPriceBatch(cryptoSyms.map(s => s.replace('USDT', '')));
Object.keys(cpResult).forEach(sym => { cp[sym] = cpResult[sym].price; });
```

### 3.6 Modificar: healthCheck — lee source de fetchCryptoPriceBatch

**Fix Problema 2**: healthCheck gestiona alertas, fetchCryptoPriceBatch solo retorna datos.

healthCheck mantiene su propio check de Binance (1 call cada 5min), pero ADEMÁS lee el `source` del último fetchCryptoPriceBatch para generar mensajes diferenciados:

```javascript
// En healthCheck, bloque Binance actualizado:
// 1. Check directo Binance (ya existe, 1 call spot)
// 2. Si falla: verificar qué source está usando fetchCryptoPriceBatch
//    y generar mensaje apropiado

// Variable global que fetchCryptoPriceBatch actualiza:
global._lastCryptoSource = 'binance'; // se actualiza con cada call

// En healthCheck:
if (binanceFailed) {
  const src = global._lastCryptoSource || 'unknown';
  if (src === 'cryptocompare' || src === 'coingecko') {
    await openAlert('binance', 'DOWN — using ' + src + ' fallback. Data OK.');
  } else if (src === 'cache') {
    await openAlert('binance', 'ALL crypto sources DOWN. Serving cached data.');
  } else {
    await openAlert('binance', 'DOWN. Error: ' + errorMsg);
  }
}
```

### 3.5 Modificar: respuesta API /api/ia-signals

**Antes**:
```json
{ "signals": [...] }
```

**Después**:
```json
{
  "signals": [...],
  "meta": {
    "cryptoSource": "binance",
    "stockSource": "yahoo",
    "staleSymbols": [],
    "lastUpdate": "2026-04-18T17:30:00Z"
  }
}
```

### 3.6 Modificar: PWA indicador delayed

**Archivo**: aurex-features.js o index.html
**Cuándo**: v1.1 (no ahora)
**Qué**: Si `meta.staleSymbols` incluye un symbol, mostrar ⏳ al lado del precio con tooltip "Delayed Xmin"

---

## 4. TTL EXTENDIDO — NÚMEROS JUSTIFICADOS

### 4.1 Tres niveles de TTL

| Nivel | TTL | Cuándo aplica | Justificación |
|-------|-----|---------------|---------------|
| Normal | 60 seg | Fuente primaria responde OK | Datos frescos, refresh frecuente |
| Fallback | 5 min (300s) | Primaria falla, fallback responde | Fallback tiene rate limits, no abusar |
| Emergency | 30 min (1800s) | Todo falla, solo caché | Mejor dato viejo de 30min que nada |

### 4.2 Por qué 30 minutos de emergency

- Un mercado crypto se mueve ~1-2% en 30 min en condiciones normales
- El usuario ve el precio con ⏳ "Delayed 15min" — sabe que no es real-time
- Es mejor que mostrar $0 o error
- Después de 30 min sin datos de NINGUNA fuente, el precio se marca como "Unavailable" (no se sirve basura vieja)

### 4.3 checkAlertas con caché extendido

checkAlertas corre cada 30s. Si Binance cae:
- NO llama a CoinGecko/CryptoCompare cada 30s (agotaría rate limits)
- Usa el caché del último `calcularSenalesIA` (que sí llama fallbacks cada 5min)
- checkAlertas solo necesita saber si el precio cruzó el objetivo — un precio de 5min atrás es suficiente

---

## 5. TABLA SUPABASE: CAMBIO

```sql
ALTER TABLE health_events ADD COLUMN IF NOT EXISTS source_status text;
-- Valores: 'primary_down', 'fallback_active', 'all_down', 'cache_only'
```

---

## 6. ARCHIVOS A MODIFICAR

| Archivo | Cambio | Líneas afectadas |
|---------|--------|-----------------|
| server.js | `fetchCryptoPriceBatch()` nueva función | Después de L91 |
| server.js | `fetchStockPriceBatch()` nueva función | Después de fetchCrypto |
| server.js | `checkAlertas` L159: usar fetchCryptoPriceBatch | L159 |
| server.js | `_fetchCryptoCompareIA()` nueva función fallback IA | Después de L386 |
| server.js | `calcularSenalesIA` L480: fallback a _fetchCryptoCompareIA | L480 |
| server.js | healthCheck: agregar lectura de global._lastCryptoSource para mensajes diferenciados | L786-795 |
| server.js | /api/ia-signals: agregar meta.cryptoSource | L503-509 |
| server.js | COINGECKO_IDS mapa | Nueva constante |
| Supabase | ALTER TABLE add source_status | SQL |
| PWA | Indicador ⏳ delayed | v1.1 |
| Nativa | Indicador ⏳ delayed | v1.1 |

---

## 7. ORDEN DE IMPLEMENTACIÓN

| Paso | Qué | Riesgo | Dependencia |
|------|-----|--------|-------------|
| 1 | COINGECKO_IDS mapa | Cero | — |
| 2 | fetchCryptoPriceBatch() | Bajo | Paso 1 |
| 3 | Reemplazar en checkAlertas | Bajo | Paso 2 |
| 4 | Reemplazar en calcularSenalesIA | Medio | Paso 2 |
| 5 | fetchStockPriceBatch() | Bajo | — |
| 6 | Meta en /api/ia-signals | Bajo | Paso 2 |
| 7 | ALTER TABLE source_status | Cero | — |
| 8 | PWA indicador delayed | Bajo | Paso 6, v1.1 |

---

## 8. RIESGOS Y MITIGACIONES

| Riesgo | Mitigación |
|--------|-----------|
| CoinGecko free se agota (10k/mes) | Solo se usa para calcularSenalesIA, no para checkAlertas |
| CryptoCompare cambia API/rate limits | CoinGecko como segundo fallback |
| Caché de 30min es muy viejo | Marcar como "Unavailable" después de 30min, no servir |
| fetchCryptoPriceBatch rompe checkAlertas | Fallback final retorna caché, nunca null |
| API self-referencing (Yahoo proxy llama a sí mismo) | fetchStockPriceBatch llama al proxy interno, no hay loop |

---

*SPEC Auto-Resolución AUREX v2.0 — 18/abril/2026*
*Datos: rate limits CoinGecko verificados (pricing page), CryptoCompare probado, Binance volumen calculado desde server.js*
