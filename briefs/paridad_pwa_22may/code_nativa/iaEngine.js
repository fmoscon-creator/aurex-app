// AUREX — Motor IA v6 (portado de PWA aurex-features.js)
// 10 variables reales: tendencia, RSI, volumen, volatilidad, correlación,
// oro/petróleo, macro, earnings, MACD, soporte/resistencia

const RAILWAY_API = 'https://aurex-app-production.up.railway.app/api/yahoo';

// RSI-14 desde array de closes
function calcRSI14(closes) {
  if (closes.length < 15) return 50;
  let gains = 0, losses = 0;
  for (let i = 1; i <= 14; i++) {
    const diff = closes[i] - closes[i - 1];
    if (diff > 0) gains += diff;
    else losses -= diff;
  }
  gains /= 14;
  losses /= 14;
  for (let i = 15; i < closes.length; i++) {
    const diff = closes[i] - closes[i - 1];
    gains = (gains * 13 + (diff > 0 ? diff : 0)) / 14;
    losses = (losses * 13 + (diff < 0 ? -diff : 0)) / 14;
  }
  if (losses === 0) return 100;
  const rs = gains / losses;
  return 100 - 100 / (1 + rs);
}

// EMA helper
function ema(arr, period) {
  const k = 2 / (period + 1);
  let e = arr[0];
  for (let i = 1; i < arr.length; i++) e = arr[i] * k + e * (1 - k);
  return e;
}

// Fetch Binance klines (crypto) — 16 daily candles for RSI + 30 for MACD
async function fetchBinanceData(sym) {
  try {
    const [tickerRes, klinesRes] = await Promise.all([
      fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${sym}USDT`),
      fetch(`https://api.binance.com/api/v3/klines?symbol=${sym}USDT&interval=1d&limit=16`),
    ]);
    const ticker = await tickerRes.json();
    const klines = await klinesRes.json();
    if (!ticker.lastPrice || !Array.isArray(klines)) return null;

    const closes = klines.map(k => parseFloat(k[4])).filter(x => x > 0);
    const volumes = klines.map(k => parseFloat(k[5])).filter(x => x > 0);
    const highs = klines.map(k => parseFloat(k[2])).filter(x => x > 0);
    const lows = klines.map(k => parseFloat(k[3])).filter(x => x > 0);

    const avgVol = volumes.length > 1
      ? volumes.slice(0, -1).reduce((a, b) => a + b, 0) / (volumes.length - 1)
      : volumes[0] || 1;

    return {
      precio: parseFloat(ticker.lastPrice),
      precio24h: parseFloat(ticker.prevClosePrice) || parseFloat(ticker.lastPrice),
      volumen24h: parseFloat(ticker.volume) || 0,
      volumenProm: avgVol,
      high24h: parseFloat(ticker.highPrice),
      low24h: parseFloat(ticker.lowPrice),
      closes30d: closes,
      high30d: highs.length ? Math.max(...highs) : null,
      low30d: lows.length ? Math.min(...lows) : null,
      precio7d: closes.length >= 7 ? closes[closes.length - 7] : 0,
      precio30d: closes.length >= 30 ? closes[0] : 0,
    };
  } catch (e) { return null; }
}

// Fetch Yahoo data (stocks, ETFs, commodities) via Railway backend
// Fetch Yahoo: 2 llamadas separadas como la PWA (5d para precio, 30d para RSI/MACD)
async function fetchYahooData(ySymbol) {
  try {
    const [res5d, res30d] = await Promise.all([
      fetch(`${RAILWAY_API}?symbol=${ySymbol}&interval=1d&range=5d`),
      fetch(`${RAILWAY_API}?symbol=${ySymbol}&interval=1d&range=30d`),
    ]);
    const d5 = await res5d.json();
    const d30 = await res30d.json();

    // Datos de precio de 5d
    const q5 = d5.chart.result[0];
    const meta = q5.meta;
    const closes5 = (q5.indicators.quote[0].close || []).filter(x => x != null);
    const volumes5 = (q5.indicators.quote[0].volume || []).filter(x => x != null);
    const lc = closes5[closes5.length - 1] || meta.regularMarketPrice;
    const pc = closes5[closes5.length - 2] || lc;
    const av = volumes5.length > 1
      ? volumes5.slice(0, -1).reduce((a, b) => a + b, 0) / (volumes5.length - 1)
      : volumes5[0] || 1;
    const lv = volumes5[volumes5.length - 1] || av;
    const hi = meta.regularMarketDayHigh || lc * 1.02;
    const lo = meta.regularMarketDayLow || lc * 0.98;

    // Datos de RSI/MACD de 30d
    const q30 = d30.chart.result[0];
    const closes30 = (q30.indicators.quote[0].close || []).filter(x => x != null);
    const highs30 = (q30.indicators.quote[0].high || []).filter(x => x != null);
    const lows30 = (q30.indicators.quote[0].low || []).filter(x => x != null);

    return {
      precio: lc,
      precio24h: pc,
      volumen24h: lv,
      volumenProm: av,
      high24h: hi,
      low24h: lo,
      closes30d: closes30,
      high30d: highs30.length ? Math.max(...highs30) : null,
      low30d: lows30.length ? Math.min(...lows30) : null,
      precio7d: closes30.length >= 7 ? closes30[closes30.length - 7] : 0,
      precio30d: closes30.length >= 30 ? closes30[0] : 0,
    };
  } catch (e) { return null; }
}

// Motor principal: 10 variables → señal IA
// rsiCache: objeto {SYM: valorRSI} precalculado — IDENTICO a PWA window._rsiCache
function calcIAScore(tipo, sym, datos, rsiCache) {
  const precio = datos.precio || 0;
  const precio24h = datos.precio24h || precio;
  const volumen24h = datos.volumen24h || 0;
  const volumenProm = datos.volumenProm || volumen24h;
  const high24h = datos.high24h || precio * 1.02;
  const low24h = datos.low24h || precio * 0.98;
  const btcCambio = datos.btcCambio || 0;
  const spyCambio = datos.spyCambio || 0;
  const precioOro = datos.precioOro || 2050;
  const precioPetroleo = datos.precioPetroleo || 80;
  const hayMacro = datos.hayMacro || false;
  const hayEarnings = datos.hayEarnings || false;

  const scores = {};

  // 1. Tendencia
  const tendencia = precio24h > 0 ? (precio - precio24h) / precio24h : 0;
  scores.tendencia = tendencia * 8;

  // 2. RSI — IDENTICO a PWA: usa rsiCache precalculado, fallback a estimacion
  let rsi = 50;
  if (rsiCache && rsiCache[sym] !== undefined) {
    rsi = rsiCache[sym]; // RSI real precalculado — mismo que PWA _rsiCache
  } else if (datos.closes30d && datos.closes30d.length >= 15) {
    rsi = calcRSI14(datos.closes30d);
  } else {
    rsi = Math.min(90, Math.max(10, 50 + tendencia * 500));
  }
  // DEBUG: comparar inputs con PWA
  if (sym === 'BTC') console.log('INPUTS BTC NATIVA:', JSON.stringify({ tendencia, btcCambio, spyCambio, precioOro, precioPetroleo, rsi }));
  let rsiScore = 0;
  if (rsi > 70) rsiScore = -0.06;
  else if (rsi > 60) rsiScore = 0.04;
  else if (rsi < 30) rsiScore = 0.06;
  else if (rsi < 40) rsiScore = -0.03;
  else rsiScore = 0.01;
  scores.rsi = rsiScore;

  // 3. Volumen
  const volRel = volumenProm > 0 ? volumen24h / volumenProm : 1;
  let volScore = 0;
  if (volRel > 1.8 && tendencia > 0) volScore = 0.06;
  else if (volRel > 1.8 && tendencia < 0) volScore = -0.06;
  else if (volRel > 1.3) volScore = tendencia > 0 ? 0.03 : -0.03;
  else if (volRel < 0.6) volScore = -0.02;
  else volScore = 0.01;
  scores.volumen = volScore;

  // 4. Volatilidad
  const volatilidad = precio > 0 ? (high24h - low24h) / precio : 0.02;
  let volaScore = 0;
  if (volatilidad > 0.06) volaScore = -0.03;
  else if (volatilidad > 0.03) volaScore = tendencia > 0 ? 0.02 : -0.02;
  else volaScore = 0.01;
  scores.volatilidad = volaScore;

  // 5. Correlación
  let corrScore = 0;
  if (tipo === 'cripto') {
    if (sym === 'BTC') {
      corrScore = btcCambio > 0.01 ? 0.03 : btcCambio < -0.01 ? -0.03 : 0;
    } else {
      corrScore = btcCambio > 0.02 ? 0.04 : btcCambio > 0 ? 0.02 : btcCambio < -0.02 ? -0.04 : -0.02;
    }
  } else {
    corrScore = spyCambio > 0.01 ? 0.03 : spyCambio < -0.01 ? -0.03 : 0;
  }
  scores.correlacion = corrScore;

  // 6. Oro/Petróleo
  let oroScore = 0;
  if (precioOro > 3000) {
    oroScore = tipo === 'metal' ? 0.04 : tipo === 'cripto' ? -0.02 : tipo === 'bono' ? 0.02 : -0.02;
  } else if (precioOro > 2200) {
    oroScore = tipo === 'metal' ? 0.03 : -0.01;
  }
  if (precioPetroleo > 90) {
    oroScore += tipo === 'materia_prima' ? 0.03 : -0.02;
  }
  scores.oro_petroleo = oroScore;

  // 7. Macro
  scores.macro = hayMacro ? -0.03 : 0;

  // 8. Earnings
  scores.earnings = hayEarnings ? 0.02 : 0;

  // 9. MACD
  let macdScore = 0;
  if (datos.closes30d && datos.closes30d.length >= 26) {
    const ema12 = ema(datos.closes30d.slice(-12), 12);
    const ema26 = ema(datos.closes30d.slice(-26), 26);
    const macdPct = ema26 > 0 ? (ema12 - ema26) / ema26 : 0;
    if (macdPct > 0.005) macdScore = 0.05;
    else if (macdPct < -0.005) macdScore = -0.05;
    else macdScore = 0.01;
  }
  scores.macd = macdScore;

  // 10. Soporte/Resistencia
  let srScore = 0;
  if (datos.high30d && datos.low30d && precio > 0) {
    const rangePos = (datos.high30d > datos.low30d)
      ? (precio - datos.low30d) / (datos.high30d - datos.low30d)
      : 0.5;
    if (rangePos > 0.85) srScore = -0.04;
    else if (rangePos < 0.15) srScore = 0.04;
    else if (rangePos > 0.60) srScore = 0.02;
    else srScore = -0.01;
  }
  scores.soporte_resist = srScore;

  // Total
  const total = Object.values(scores).reduce((a, b) => a + b, 0);

  // Dirección y probabilidad
  const tieneCatalizador = (rsi > 70 || rsi < 30) || hayMacro || hayEarnings || scores.volumen > 0.12;
  const umbralConfIA = tieneCatalizador ? 0.45 : 0.65;
  const umbralNormal = hayMacro ? 0.015 : 0.02;
  const scoreAbs = Math.abs(total);

  let direccion, probPrincipal;
  if (scoreAbs > umbralConfIA) {
    direccion = 'ALTA CONV-IA';
    probPrincipal = Math.min(88, Math.round(55 + scoreAbs * 110));
  } else if (total > umbralNormal) {
    direccion = 'ALCISTA';
    probPrincipal = Math.min(82, Math.round(52 + total * 220));
  } else if (total < -umbralNormal) {
    direccion = 'BAJISTA';
    probPrincipal = Math.min(82, Math.round(52 + scoreAbs * 220));
  } else {
    direccion = total >= 0 ? 'ALCISTA' : 'BAJISTA';
    probPrincipal = Math.min(58, Math.round(50 + scoreAbs * 150));
  }

  const estrellas = scoreAbs > umbralConfIA ? 5 : scoreAbs > 0.10 ? 4 : scoreAbs > 0.06 ? 3 : scoreAbs > 0.03 ? 2 : 1;

  // Objetivo y stop
  const movLimits = tipo === 'cripto' ? { min: 0.02, max: 0.08 }
    : tipo === 'accion' ? { min: 0.01, max: 0.04 }
    : tipo === 'bono' ? { min: 0.002, max: 0.015 }
    : { min: 0.005, max: 0.03 };
  const normScore = Math.min(scoreAbs, 0.45) / 0.45;
  const movPct = movLimits.min + normScore * (movLimits.max - movLimits.min);
  const esAlcista = total > 0;

  return {
    simbolo: sym,
    direccion,
    probPrincipal,
    estrellas,
    score: total,
    scores,
    rsi: parseFloat(rsi.toFixed(0)),
    volRel: parseFloat(volRel.toFixed(1)),
    objetivo: precio > 0 ? precio * (1 + (esAlcista ? movPct : -movPct)) : 0,
    stop: precio > 0 ? precio * (1 + (esAlcista ? -movPct * 0.4 : movPct * 0.4)) : 0,
    upside: (esAlcista ? 1 : -1) * movPct * 100,
  };
}

// Precalcular RSI14 real para cada activo — IDENTICO a PWA _fetchRSIBatch (linea 2259)
// Crypto: Binance klines 16d | Stocks: Yahoo 30d
async function fetchRSIBatch(items, allAssets) {
  const rsiCache = {};
  const promises = items.map(async (item) => {
    const tipo = (item.tipo || (allAssets.find(a => a.s === item.simbolo) || {}).t || '').toLowerCase();
    try {
      if (tipo === 'cripto' || tipo === 'stable') {
        // Binance daily klines, limit=16 — IDENTICO a PWA linea 2264
        const r = await fetch(`https://api.binance.com/api/v3/klines?symbol=${item.simbolo}USDT&interval=1d&limit=16`);
        const data = await r.json();
        if (Array.isArray(data) && data.length >= 15) {
          const closes = data.map(k => parseFloat(k[4]));
          rsiCache[item.simbolo] = calcRSI14(closes);
        }
      } else {
        // Yahoo 30d — IDENTICO a PWA linea 2275
        const yAsset = allAssets.find(a => a.s === item.simbolo);
        const sym = (yAsset && yAsset.ySymbol) || item.simbolo;
        const r = await fetch(`${RAILWAY_API}?symbol=${sym}&interval=1d&range=30d`);
        const data = await r.json();
        if (data.chart && data.chart.result && data.chart.result[0]) {
          const closes = (data.chart.result[0].indicators.quote[0].close || []).filter(x => x != null);
          if (closes.length >= 15) {
            rsiCache[item.simbolo] = calcRSI14(closes);
          }
        }
      }
    } catch (e) {}
  });
  await Promise.all(promises);
  return rsiCache;
}

// Generar señales para items del portfolio
export async function generateRealSignals(items, allAssets) {
  const signals = {};
  let btcCambio = 0, spyCambio = 0, precioOro = 2050, precioPetroleo = 80;

  // Paso 1: obtener BTC/SPY/Oro/Petroleo + RSI batch — IDENTICO a PWA Promise.all linea 2618
  let rsiCache = {};
  try {
    const [btcData, spyData, goldData, oilData, rsiBatch] = await Promise.all([
      fetchBinanceData('BTC'),
      fetchYahooData('SPY'),
      fetchYahooData('GC=F'),
      fetchYahooData('CL=F'),
      fetchRSIBatch(items, allAssets),
    ]);
    if (btcData) btcCambio = btcData.precio24h > 0 ? (btcData.precio - btcData.precio24h) / btcData.precio24h : 0;
    if (spyData) spyCambio = spyData.precio24h > 0 ? (spyData.precio - spyData.precio24h) / spyData.precio24h : 0;
    if (goldData) precioOro = goldData.precio;
    if (oilData) precioPetroleo = oilData.precio;
    rsiCache = rsiBatch || {};
  } catch (e) {}

  // Log RSI para verificacion
  console.log('[AUREX RSI] Cache precalculado:', Object.entries(rsiCache).map(([k,v]) => k + '=' + v.toFixed(1)).join(', '));

  // Paso 2: obtener datos de cada item y calcular con rsiCache
  const promises = items.map(async (item) => {
    const tipo = (item.tipo || (allAssets.find(a => a.s === item.simbolo) || {}).t || '').toLowerCase();
    const yAsset = allAssets.find(a => a.s === item.simbolo);
    let data = null;

    try {
      if (tipo === 'cripto' || tipo === 'stable') {
        data = await fetchBinanceData(item.simbolo);
      } else {
        const ySymbol = (yAsset && yAsset.ySymbol) || item.simbolo;
        data = await fetchYahooData(ySymbol);
      }
    } catch (e) {}

    if (data && data.precio > 0) {
      data.btcCambio = btcCambio;
      data.spyCambio = spyCambio;
      data.precioOro = precioOro;
      data.precioPetroleo = precioPetroleo;
      data.hayMacro = true;
      data.hayEarnings = false;
      // Pasar rsiCache — IDENTICO a PWA que usa window._rsiCache
      signals[item.simbolo] = calcIAScore(tipo, item.simbolo, data, rsiCache);
    }
  });

  await Promise.all(promises);
  return signals;
}

// Generar señales IA reales para TODOS los activos (IAScreen, WatchlistScreen)
// Carga en 2 fases como la PWA: fase 1 = principales, fase 2 = resto
export async function generateAllSignals(allAssets, onProgress) {
  let btcCambio = 0, spyCambio = 0, precioOro = 2050, precioPetroleo = 80;
  const allSignals = [];
  const pricesMap = {};

  // Paso 1: obtener referencias (BTC, SPY, Oro, Petróleo)
  try {
    const [btcData, spyData, goldData, oilData] = await Promise.all([
      fetchBinanceData('BTC'),
      fetchYahooData('SPY'),
      fetchYahooData('GC=F'),
      fetchYahooData('CL=F'),
    ]);
    if (btcData) btcCambio = btcData.precio24h > 0 ? (btcData.precio - btcData.precio24h) / btcData.precio24h : 0;
    if (spyData) spyCambio = spyData.precio24h > 0 ? (spyData.precio - spyData.precio24h) / spyData.precio24h : 0;
    if (goldData) precioOro = goldData.precio;
    if (oilData) precioPetroleo = oilData.precio;
  } catch (e) {}

  const macroContext = { btcCambio, spyCambio, precioOro, precioPetroleo, hayMacro: true, hayEarnings: false };

  // Helper para procesar un batch de activos
  async function processBatch(assets) {
    const BATCH_SIZE = 5;
    for (let i = 0; i < assets.length; i += BATCH_SIZE) {
      const batch = assets.slice(i, i + BATCH_SIZE);
      await Promise.all(batch.map(async (asset) => {
        const tipo = (asset.t || '').toLowerCase();
        let data = null;
        try {
          if (tipo === 'cripto' || tipo === 'stable') {
            data = await fetchBinanceData(asset.s);
          } else {
            const ySymbol = asset.ySymbol || asset.s;
            data = await fetchYahooData(ySymbol);
          }
        } catch (e) {}

        if (data && data.precio > 0) {
          Object.assign(data, macroContext);
          const signal = calcIAScore(tipo, asset.s, data);
          signal.nombre = asset.n;
          signal.tipo = asset.t;
          signal.precio = data.precio;
          signal.precio24h = data.precio24h;
          signal.cambio24h = data.precio24h > 0
            ? ((data.precio - data.precio24h) / data.precio24h) * 100 : 0;
          allSignals.push(signal);
          pricesMap[asset.s] = { price: data.precio, change: signal.cambio24h };
        }
      }));
    }
  }

  // Fase 1: primeros 20 activos principales (cripto + acciones top)
  const fase1 = allAssets.slice(0, 20);
  await processBatch(fase1);
  if (onProgress) onProgress(allSignals.slice(), pricesMap);

  // Fase 2: resto de activos
  const fase2 = allAssets.slice(20);
  await processBatch(fase2);

  // Ordenar por probabilidad descendente
  allSignals.sort((a, b) => (b.probPrincipal || 0) - (a.probPrincipal || 0));
  return { signals: allSignals, prices: pricesMap };
}

// Generar señales para un subset de activos (Watchlist)
export async function generateSignalsForAssets(assetSymbols, allAssets) {
  const assets = assetSymbols.map(s => allAssets.find(a => a.s === s)).filter(Boolean);
  if (assets.length === 0) return {};

  let btcCambio = 0, spyCambio = 0, precioOro = 2050, precioPetroleo = 80;
  try {
    const [btcData, spyData, goldData, oilData] = await Promise.all([
      fetchBinanceData('BTC'),
      fetchYahooData('SPY'),
      fetchYahooData('GC=F'),
      fetchYahooData('CL=F'),
    ]);
    if (btcData) btcCambio = btcData.precio24h > 0 ? (btcData.precio - btcData.precio24h) / btcData.precio24h : 0;
    if (spyData) spyCambio = spyData.precio24h > 0 ? (spyData.precio - spyData.precio24h) / spyData.precio24h : 0;
    if (goldData) precioOro = goldData.precio;
    if (oilData) precioPetroleo = oilData.precio;
  } catch (e) {}

  const signals = {};
  await Promise.all(assets.map(async (asset) => {
    const tipo = (asset.t || '').toLowerCase();
    let data = null;
    try {
      if (tipo === 'cripto' || tipo === 'stable') {
        data = await fetchBinanceData(asset.s);
      } else {
        data = await fetchYahooData(asset.ySymbol || asset.s);
      }
    } catch (e) {}

    if (data && data.precio > 0) {
      data.btcCambio = btcCambio;
      data.spyCambio = spyCambio;
      data.precioOro = precioOro;
      data.precioPetroleo = precioPetroleo;
      data.hayMacro = true;
      data.hayEarnings = false;
      const sig = calcIAScore(tipo, asset.s, data);
      sig.precio = data.precio;
      sig.precio24h = data.precio24h;
      sig.cambio24h = data.precio24h > 0 ? ((data.precio - data.precio24h) / data.precio24h) * 100 : 0;
      signals[asset.s] = sig;
    }
  }));
  return signals;
}

export { calcIAScore, fetchBinanceData, fetchYahooData };
