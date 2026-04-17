require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Para el webhook de Lemon Squeezy necesitamos el raw body ANTES de parsear JSON
app.use('/webhook/lemonsqueezy', express.raw({ type: 'application/json' }));

// Para el resto de rutas usamos JSON normal
app.use(express.json());
app.use(cors());

// ─── HEALTH CHECK ────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ status: 'ok', app: 'AUREX Backend', time: new Date().toISOString() });
});

// ─── WEBHOOK LEMON SQUEEZY ───────────────────────────────────────────────────
// Lemon Squeezy llama a este endpoint cuando un pago se confirma
// Documentacion: https://docs.lemonsqueezy.com/help/webhooks
app.post('/webhook/lemonsqueezy', async (req, res) => {
  try {
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
    
    // Verificar firma de seguridad
    const signature = req.headers['x-signature'];
    if (!signature || !secret) {
      console.error('[Webhook LS] Sin firma o sin secret configurado');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(req.body);
    const digest = hmac.digest('hex');

    if (signature !== digest) {
      console.error('[Webhook LS] Firma invalida');
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // Parsear el evento
    const event = JSON.parse(req.body.toString());
    const eventName = event.meta?.event_name;
    console.log('[Webhook LS] Evento recibido:', eventName);

    // Procesar solo eventos de suscripcion creada o activada
    if (eventName === 'subscription_created' || eventName === 'subscription_updated') {
      const attrs = event.data?.attributes;
      const email = attrs?.user_email;
      const status = attrs?.status; // active, cancelled, expired, etc
      const variantName = attrs?.variant_name || '';

      if (!email) {
        console.error('[Webhook LS] No hay email en el evento');
        return res.status(400).json({ error: 'No email in event' });
      }

      // Determinar el plan segun el producto
      let nuevoPlan = 'free';
      if (status === 'active') {
        if (variantName.toLowerCase().includes('elite')) {
          nuevoPlan = 'elite';
        } else if (variantName.toLowerCase().includes('pro')) {
          nuevoPlan = 'pro';
        }
      }
      // Si la suscripcion se cancela o expira, volver a free
      if (status === 'cancelled' || status === 'expired' || status === 'past_due') {
        nuevoPlan = 'free';
      }

      console.log('[Webhook LS] Actualizando plan de', email, 'a', nuevoPlan);

      // Buscar el usuario en Supabase por email
      const { data: user, error: userError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single();

      if (userError || !user) {
        // Si no existe en profiles, buscar en auth.users
        console.log('[Webhook LS] Usuario no encontrado en profiles, buscando en auth');
        const { data: authUser, error: authError } = await supabase.auth.admin.getUserByEmail(email);
        if (authError || !authUser?.user) {
          console.error('[Webhook LS] Usuario no encontrado:', email);
          return res.status(200).json({ received: true, warning: 'User not found' });
        }
        // Crear perfil si no existe
        await supabase.from('profiles').upsert({
          id: authUser.user.id,
          email: email,
          plan: nuevoPlan,
          updated_at: new Date().toISOString()
        });
      } else {
        // Actualizar el plan en la tabla profiles
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ plan: nuevoPlan, updated_at: new Date().toISOString() })
          .eq('email', email);

        if (updateError) {
          console.error('[Webhook LS] Error al actualizar plan:', updateError.message);
          return res.status(500).json({ error: 'DB update failed' });
        }
      }

      console.log('[Webhook LS] Plan actualizado correctamente:', email, '->', nuevoPlan);
    }

    res.status(200).json({ received: true });

  } catch (err) {
    console.error('[Webhook LS] Error inesperado:', err.message);
    res.status(500).json({ error: 'Internal error' });
  }
});

// ─── CRON JOB — MONITOREO DE ALERTAS (cada 5 minutos) ───────────────────────
cron.schedule('*/5 * * * *', async () => {
  console.log('[Cron] Verificando alertas de precio...');
  try {
    const { data: alertas, error } = await supabase
      .from('alertas')
      .select('*')
      .eq('activa', true);

    if (error) {
      console.error('[Cron] Error leyendo alertas:', error.message);
      return;
    }

    if (!alertas || alertas.length === 0) {
      console.log('[Cron] Sin alertas activas');
      return;
    }

    console.log('[Cron]', alertas.length, 'alertas activas encontradas');
    // TODO: verificar precios y disparar notificaciones push
  } catch (err) {
    console.error('[Cron] Error inesperado:', err.message);
  }
});

// ─── MOTOR IA — CALCULO EN BACKEND (fuente unica para PWA y nativa) ─────────

// RSI-14
function calcRSI14(closes) {
  if (closes.length < 15) return null;
  let gains = 0, losses = 0;
  for (let i = 1; i <= 14; i++) { const d = closes[i] - closes[i-1]; if (d > 0) gains += d; else losses -= d; }
  gains /= 14; losses /= 14;
  for (let i = 15; i < closes.length; i++) { const d = closes[i] - closes[i-1]; gains = (gains*13+(d>0?d:0))/14; losses = (losses*13+(d<0?-d:0))/14; }
  if (losses === 0) return 100;
  return 100 - 100/(1+gains/losses);
}

// EMA
function ema(arr, period) { const k = 2/(period+1); let e = arr[0]; for (let i = 1; i < arr.length; i++) e = arr[i]*k + e*(1-k); return e; }

// Motor IA identico a PWA _calcIAScore (aurex-features.js linea 2290)
function calcIAScore(sym, tipo, datos, rsi) {
  const precio = datos.precio || 0;
  const precio24h = datos.precio24h || precio;
  const btcCambio = datos.btcCambio || 0;
  const spyCambio = datos.spyCambio || 0;
  const precioOro = datos.precioOro || 2050;
  const precioPetroleo = datos.precioPetroleo || 80;
  const volumen24h = datos.volumen24h || 0;
  const volumenProm = datos.volumenProm || volumen24h;
  const high24h = datos.high24h || precio * 1.02;
  const low24h = datos.low24h || precio * 0.98;
  const scores = {};
  const tendencia = precio24h > 0 ? (precio - precio24h) / precio24h : 0;
  scores.tendencia = tendencia * 8;
  if (rsi === null) rsi = Math.min(90, Math.max(10, 50 + tendencia * 500));
  scores.rsi = rsi > 70 ? -0.06 : rsi > 60 ? 0.04 : rsi < 30 ? 0.06 : rsi < 40 ? -0.03 : 0.01;
  const volRel = volumenProm > 0 ? volumen24h / volumenProm : 1;
  if (volRel > 1.8 && tendencia > 0) scores.volumen = 0.06;
  else if (volRel > 1.8 && tendencia < 0) scores.volumen = -0.06;
  else if (volRel > 1.3) scores.volumen = tendencia > 0 ? 0.03 : -0.03;
  else if (volRel < 0.6) scores.volumen = -0.02;
  else scores.volumen = 0.01;
  const volatilidad = precio > 0 ? (high24h - low24h) / precio : 0.02;
  scores.volatilidad = volatilidad > 0.06 ? -0.03 : volatilidad > 0.03 ? (tendencia > 0 ? 0.02 : -0.02) : 0.01;
  if (tipo === 'cripto') {
    scores.correlacion = sym === 'BTC' ? (btcCambio > 0.01 ? 0.03 : btcCambio < -0.01 ? -0.03 : 0) : (btcCambio > 0.02 ? 0.04 : btcCambio > 0 ? 0.02 : btcCambio < -0.02 ? -0.04 : -0.02);
  } else {
    scores.correlacion = spyCambio > 0.01 ? 0.03 : spyCambio < -0.01 ? -0.03 : 0;
  }
  let oroScore = 0;
  if (precioOro > 3000) oroScore = tipo === 'metal' ? 0.04 : tipo === 'cripto' ? -0.02 : tipo === 'bono' ? 0.02 : -0.02;
  else if (precioOro > 2200) oroScore = tipo === 'metal' ? 0.03 : -0.01;
  if (precioPetroleo > 90) oroScore += tipo === 'materia_prima' ? 0.03 : -0.02;
  scores.oro_petroleo = oroScore;
  scores.macro = -0.03; // hayMacro = true como en PWA
  scores.earnings = 0;
  scores.macd = 0; // Sin datos 30d en este contexto
  scores.soporte_resist = 0;
  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  const scoreAbs = Math.abs(total);
  const tieneCatalizador = (rsi > 70 || rsi < 30) || scoreAbs > 0.12;
  const umbralConfIA = tieneCatalizador ? 0.45 : 0.65;
  const umbralNormal = 0.02;
  let direccion, probPrincipal;
  if (scoreAbs > umbralConfIA) { direccion = 'alta_conf'; probPrincipal = Math.min(88, Math.round(55 + scoreAbs * 110)); }
  else if (total > umbralNormal) { direccion = 'alcista'; probPrincipal = Math.min(82, Math.round(52 + total * 220)); }
  else if (total < -umbralNormal) { direccion = 'bajista'; probPrincipal = Math.min(82, Math.round(52 + scoreAbs * 220)); }
  else { direccion = total >= 0 ? 'alcista' : 'bajista'; probPrincipal = Math.min(58, Math.round(50 + scoreAbs * 150)); }
  const estrellas = scoreAbs > umbralConfIA ? 5 : scoreAbs > 0.10 ? 4 : scoreAbs > 0.06 ? 3 : scoreAbs > 0.03 ? 2 : 1;
  const esAlcista = total > 0;
  const movLimits = tipo === 'cripto' ? {min:0.02,max:0.08} : tipo === 'accion' ? {min:0.01,max:0.04} : tipo === 'bono' ? {min:0.002,max:0.015} : {min:0.005,max:0.03};
  const normScore = Math.min(scoreAbs, 0.45) / 0.45;
  const movPct = movLimits.min + normScore * (movLimits.max - movLimits.min);
  const prob_alcista = direccion === 'alcista' ? probPrincipal : Math.max(1, 100 - probPrincipal - Math.round((100-probPrincipal)*0.2));
  const prob_bajista = direccion === 'bajista' ? probPrincipal : Math.max(1, 100 - probPrincipal - Math.round((100-probPrincipal)*0.2));
  return {
    simbolo: sym, tipo, direccion, confianza: probPrincipal, probPrincipal, score: total, scores,
    rsi: Math.round(rsi), volRel: parseFloat(volRel.toFixed(1)), estrellas,
    precio, precio24h, precio7d: datos.precio7d || 0, precio30d: datos.precio30d || 0,
    objetivo: precio > 0 ? parseFloat((esAlcista ? precio*(1+movPct) : precio*(1-movPct)).toFixed(precio>100?2:4)) : 0,
    stop: precio > 0 ? parseFloat((esAlcista ? precio*(1-movPct*0.4) : precio*(1+movPct*0.4)).toFixed(precio>100?2:4)) : 0,
    upside: parseFloat(((esAlcista ? 1 : -1) * movPct * 100).toFixed(1)),
    prob_alcista, prob_bajista,
    motivos: [],
  };
}

// Yahoo proxy (reuse for IA calc)
const YAHOO_BASE = 'https://query1.finance.yahoo.com/v8/finance/chart';
async function fetchYahoo(symbol, range = '2d', interval = '1d') {
  const url = `${YAHOO_BASE}/${encodeURIComponent(symbol)}?interval=${interval}&range=${range}`;
  const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  return r.json();
}

// Lista de activos para calculo IA
const CRIPTO_SYMS = ['BTC','ETH','SOL','BNB','XRP','ADA','AVAX','DOT','LINK','MATIC','DOGE','SHIB','LTC','ATOM','UNI','FIL','NEAR','APT','ARB','OP','TON','SUI','TRX','INJ','SEI','PEPE','WIF','JUP','FTM','AAVE','MKR','CRV','SNX','SAND','MANA','GRT','LDO','IMX','RUNE','HBAR','XLM','VET','ETC','ALGO','BCH','COMP','1INCH'];
const STOCK_SYMS = [
  {s:'AAPL',t:'accion'},{s:'NVDA',t:'accion'},{s:'MSFT',t:'accion'},{s:'GOOGL',t:'accion'},{s:'AMZN',t:'accion'},{s:'META',t:'accion'},{s:'TSLA',t:'accion'},{s:'AVGO',t:'accion'},{s:'ORCL',t:'accion'},{s:'JPM',t:'accion'},
  {s:'V',t:'accion'},{s:'MA',t:'accion'},{s:'BAC',t:'accion'},{s:'WFC',t:'accion'},{s:'GS',t:'accion'},{s:'MS',t:'accion'},{s:'AXP',t:'accion'},{s:'BLK',t:'accion'},{s:'SCHW',t:'accion'},
  {s:'LLY',t:'accion'},{s:'UNH',t:'accion'},{s:'JNJ',t:'accion'},{s:'MRK',t:'accion'},{s:'ABBV',t:'accion'},{s:'PFE',t:'accion'},{s:'TMO',t:'accion'},{s:'ABT',t:'accion'},{s:'DHR',t:'accion'},{s:'BMY',t:'accion'},
  {s:'COST',t:'accion'},{s:'WMT',t:'accion'},{s:'HD',t:'accion'},{s:'PG',t:'accion'},{s:'KO',t:'accion'},{s:'PEP',t:'accion'},{s:'MCD',t:'accion'},{s:'SBUX',t:'accion'},{s:'NKE',t:'accion'},{s:'TGT',t:'accion'},
  {s:'HOOD',t:'accion'},{s:'COIN',t:'accion'},{s:'MSTR',t:'accion'},{s:'YPF',t:'accion'},
  {s:'SPY',t:'etf'},{s:'QQQ',t:'etf'},{s:'IWM',t:'etf'},{s:'VTI',t:'etf'},{s:'VOO',t:'etf'},{s:'GLD',t:'etf'},{s:'SLV',t:'etf'},{s:'USO',t:'etf'},{s:'TLT',t:'etf'},{s:'ARKK',t:'etf'},{s:'IBIT',t:'etf'},{s:'BITO',t:'etf'},
  {s:'GC=F',t:'commodity'},{s:'SI=F',t:'commodity'},{s:'CL=F',t:'commodity'},{s:'NG=F',t:'commodity'},{s:'HG=F',t:'commodity'},
  {s:'JO',t:'materia_prima'},{s:'WEAT',t:'materia_prima'},{s:'CORN',t:'materia_prima'},{s:'DBA',t:'materia_prima'},
  {s:'ORO',t:'metal'},{s:'ALUM',t:'metal'},
];

let _iaSignalsCache = { signals: [], updatedAt: null };
let _isCalculating = false;

async function calculateAllSignals() {
  if (_isCalculating) return;
  _isCalculating = true;
  console.log('[IA Engine] Calculando senales...');
  try {
    const allSignals = [];
    let btcCambio = 0, spyCambio = 0, precioOro = 2050, precioPetroleo = 80;
    const rsiCache = {};

    // Paso 1: BTC + SPY + Oro + Petroleo
    try {
      const [btcR, spyR, goldR, oilR] = await Promise.all([
        fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT').then(r => r.json()),
        fetchYahoo('SPY').then(d => d.chart?.result?.[0]?.meta),
        fetchYahoo('GC=F').then(d => d.chart?.result?.[0]?.meta),
        fetchYahoo('CL=F').then(d => d.chart?.result?.[0]?.meta),
      ]);
      if (btcR.lastPrice) btcCambio = parseFloat(btcR.priceChangePercent) / 100;
      if (spyR?.regularMarketPrice && spyR?.previousClose) spyCambio = (spyR.regularMarketPrice - spyR.previousClose) / spyR.previousClose;
      if (goldR?.regularMarketPrice) precioOro = goldR.regularMarketPrice;
      if (oilR?.regularMarketPrice) precioPetroleo = oilR.regularMarketPrice;
    } catch (e) { console.error('[IA Engine] Error refs:', e.message); }

    // Paso 2: RSI batch crypto (Binance klines 16d)
    const cryptoPairs = CRIPTO_SYMS.map(s => `"${s}USDT"`).join(',');
    try {
      const tickerRes = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbols=[${cryptoPairs}]`);
      const tickers = await tickerRes.json();
      // RSI en paralelo
      await Promise.all(CRIPTO_SYMS.map(async (sym) => {
        try {
          const kr = await fetch(`https://api.binance.com/api/v3/klines?symbol=${sym}USDT&interval=1d&limit=16`);
          const kd = await kr.json();
          if (Array.isArray(kd) && kd.length >= 15) rsiCache[sym] = calcRSI14(kd.map(k => parseFloat(k[4])));
        } catch (e) {}
      }));
      // Generar senales crypto
      (Array.isArray(tickers) ? tickers : []).forEach(t => {
        const sym = t.symbol.replace('USDT', '');
        if (!CRIPTO_SYMS.includes(sym)) return;
        const sig = calcIAScore(sym, 'cripto', {
          precio: parseFloat(t.lastPrice), precio24h: parseFloat(t.openPrice),
          volumen24h: parseFloat(t.quoteVolume), volumenProm: parseFloat(t.quoteVolume) * 0.85,
          high24h: parseFloat(t.highPrice), low24h: parseFloat(t.lowPrice),
          btcCambio, spyCambio, precioOro, precioPetroleo,
        }, rsiCache[sym] ?? null);
        allSignals.push(sig);
      });
    } catch (e) { console.error('[IA Engine] Error crypto:', e.message); }

    // Paso 3: Stocks/ETFs/Commodities via Yahoo
    const batches = [];
    for (let i = 0; i < STOCK_SYMS.length; i += 10) batches.push(STOCK_SYMS.slice(i, i + 10));
    for (const batch of batches) {
      await Promise.all(batch.map(async (item) => {
        try {
          // Fetch price (2d) + RSI (30d) en paralelo
          const [priceData, rsiData] = await Promise.all([
            fetchYahoo(item.s, '2d'),
            fetchYahoo(item.s, '30d'),
          ]);
          const meta = priceData.chart?.result?.[0]?.meta;
          if (!meta?.regularMarketPrice) return;
          // RSI from 30d
          const closes30 = (rsiData.chart?.result?.[0]?.indicators?.quote?.[0]?.close || []).filter(x => x != null);
          if (closes30.length >= 15) rsiCache[item.s] = calcRSI14(closes30);
          const prev = meta.previousClose || meta.chartPreviousClose || meta.regularMarketPrice;
          const sig = calcIAScore(item.s, item.t, {
            precio: meta.regularMarketPrice, precio24h: prev,
            volumen24h: meta.regularMarketVolume || 0, volumenProm: (meta.regularMarketVolume || 0) * 0.85,
            high24h: meta.regularMarketDayHigh || meta.regularMarketPrice * 1.02,
            low24h: meta.regularMarketDayLow || meta.regularMarketPrice * 0.98,
            btcCambio, spyCambio, precioOro, precioPetroleo,
          }, rsiCache[item.s] ?? null);
          allSignals.push(sig);
        } catch (e) {}
      }));
    }

    _iaSignalsCache = { signals: allSignals, updatedAt: new Date().toISOString() };
    console.log('[IA Engine] OK —', allSignals.length, 'senales calculadas');
  } catch (e) {
    console.error('[IA Engine] Error fatal:', e.message);
  }
  _isCalculating = false;
}

// Calcular al iniciar + cada 5 minutos
calculateAllSignals();
cron.schedule('*/5 * * * *', calculateAllSignals);

// POST sigue disponible como fallback
app.post('/api/ia-signals', (req, res) => {
  try {
    if (!_iaSignalsCache.signals.length) {
      _iaSignalsCache = { signals: req.body || [], updatedAt: new Date().toISOString() };
    }
    res.json({ ok: true, count: _iaSignalsCache.signals.length });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/ia-signals', (req, res) => {
  res.json(_iaSignalsCache);
});

// ─── INICIAR SERVIDOR ────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('[AUREX Backend] Corriendo en puerto', PORT);
});
