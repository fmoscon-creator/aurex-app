import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  ActivityIndicator, RefreshControl, TextInput, Image, Animated, Modal, Switch,
  Keyboard, Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle as SvgCircle, Line as SvgLine, G, Polyline } from 'react-native-svg';
import AurexLogo from '../components/AurexLogo';
import AssetLogo from '../components/AssetLogo';
import LiveIndicator from '../components/LiveIndicator';
import BellButton from '../components/BellButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DATA, ALL_ASSETS } from '../lib/assets';
import { fmt, fmtPrice, fmtPct } from '../lib/locale';
import { preloadHistPrices, getChangeSync } from '../lib/prices';
import { useT } from '../lib/i18n';
import { usePlan } from '../lib/usePlan';
import UpsellBanner from '../components/UpsellBanner';


/* ─── COLORES EXACTOS ─── */
import { useTheme } from '../lib/ThemeContext';

// C global solo para helpers/SVG de top-level (los componentes usan useTheme())
const C = {
  bg: '#0D1117', card: '#161B22', border: '#21262D', border2: '#30363D',
  gold: '#D4A017', text: '#E6EDF3', textSec: '#8B949E', textDim: '#555',
  green: '#3FB950', red: '#F85149', greenBg: '#1A3A2A', redBg: '#3A1A1A',
};

const BACKEND = 'https://aurex-app-production.up.railway.app';

/* ─── PULSE HELPERS ─── */
const pulseLabel = (s, i18n) =>
  s <= 20 ? i18n('pulse_miedo_extremo') : s <= 40 ? i18n('pulse_miedo') : s <= 60 ? i18n('pulse_neutral') : s <= 80 ? i18n('pulse_codicia') : i18n('pulse_codicia_extrema');
const pulseEmoji = (s) =>
  s <= 20 ? '\uD83D\uDE28' : s <= 40 ? '\uD83D\uDE1F' : s <= 60 ? '\uD83D\uDE10' : s <= 80 ? '\uD83D\uDE0F' : '\uD83E\uDD11';
const pulseColor = (s) =>
  s <= 20 ? '#C62828' : s <= 40 ? '#FF6B6B' : s <= 60 ? C.gold : s <= 80 ? C.green : '#00E676';

/* ─── LOGO URL — CoinCap para crypto (rapido), FMP para stocks ─── */
function getLogoUrl(sym, tipo, assetLogo) {
  if (assetLogo && assetLogo.startsWith('http')) return assetLogo;
  const t = (tipo || '').toLowerCase();
  if (t === 'cripto' || t === 'stable') return `https://assets.coincap.io/assets/icons/${sym.toLowerCase()}@2x.png`;
  if (t === 'futuro' || t === 'divisa') return null;
  return `https://financialmodelingprep.com/image-stock/${sym}.png`;
}

function LogoOrInitial({ sym, tipo, logo, size = 28, color }) {
  const t = (tipo || '').toLowerCase();
  const urls = [];
  // Primary: asset logo from data
  if (logo && logo.startsWith('http')) urls.push(logo);
  // Fallback: CoinCap for crypto, FMP for stocks
  if (t === 'cripto' || t === 'stable') {
    urls.push(`https://assets.coincap.io/assets/icons/${sym.toLowerCase()}@2x.png`);
  } else if (t !== 'futuro' && t !== 'divisa') {
    urls.push(`https://financialmodelingprep.com/image-stock/${sym}.png`);
  }
  const bgColor = color || '#333';
  const initials = sym.replace(/[=\-].*/, '').slice(0, 3);
  const [urlIdx, setUrlIdx] = React.useState(0);
  const currentUrl = urls[urlIdx];
  if (currentUrl) {
    return <Image source={{ uri: currentUrl }} style={{ width: size, height: size, borderRadius: size/2, backgroundColor: bgColor }} onError={() => setUrlIdx(prev => prev + 1)} />;
  }
  return (
    <View style={{ width: size, height: size, borderRadius: size/2, backgroundColor: bgColor, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: '#fff', fontSize: size * 0.35, fontWeight: '700' }}>{initials}</Text>
    </View>
  );
}

/* ─── SPARKLINE SVG ─── */
function SparklineSVG({ data, isUp }) {
  if (!data || data.length === 0) return null;
  // Filtrar valores inválidos (NaN, null, undefined, Infinity)
  const valid = data.filter(v => v != null && isFinite(+v)).map(v => +v);
  if (valid.length === 0) return null;
  const w = 64, h = 28, pad = 2;
  // Si solo hay 1 valor, expandir a 7 puntos iguales para línea plana
  const points = valid.length === 1 ? Array(7).fill(valid[0]) : valid;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min;
  // Si todos iguales (range=0), dibujar línea plana en el CENTRO (no pegada al borde)
  const pts = points.map((v, i) => {
    const x = pad + (i / (points.length - 1)) * (w - pad * 2);
    const y = range === 0
      ? h / 2
      : h - pad - ((v - min) / range) * (h - pad * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  const color = isUp ? C.green : C.red;
  return (
    <Svg width={64} height={28} viewBox={`0 0 ${w} ${h}`}>
      <Polyline points={pts} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

/* ─── GAUGE SEMICIRCULAR AUREX PULSE (idéntico a PWA _renderFearGreedGauge) ─── */
function PulseGauge({ score, value2, value3 }) {
  const R = 52, cx = 65, cy = 68, sw = 12;
  const colors = ['#C62828', '#FF6B6B', '#D4A017', '#3FB950', '#00E676'];
  const segments = [
    [0, 0.20], [0.22, 0.40], [0.42, 0.60], [0.62, 0.80], [0.82, 1.00],
  ];
  const arcs = segments.map((seg, i) => {
    const startAngle = Math.PI - seg[0] * Math.PI;
    const endAngle = Math.PI - seg[1] * Math.PI;
    const x1 = cx + R * Math.cos(startAngle);
    const y1 = cy - R * Math.sin(startAngle);
    const x2 = cx + R * Math.cos(endAngle);
    const y2 = cy - R * Math.sin(endAngle);
    return (
      <Path key={i}
        d={`M${x1.toFixed(2)},${y1.toFixed(2)} A${R},${R} 0 0,1 ${x2.toFixed(2)},${y2.toFixed(2)}`}
        fill="none" stroke={colors[i]} strokeWidth={sw} strokeLinecap="round" />
    );
  });
  // Aguja principal (dorada)
  const needleAngle = Math.PI - (score / 100) * Math.PI;
  const nx = cx + (R - 8) * Math.cos(needleAngle);
  const ny = cy - (R - 8) * Math.sin(needleAngle);
  // Aguja 2: BTC Sentiment (azul punteada) — idéntico a PWA
  let needle2 = null;
  if (value2 != null) {
    const ang2 = Math.PI - (value2 / 100) * Math.PI;
    const nx2 = cx + (R - 8) * Math.cos(ang2);
    const ny2 = cy - (R - 8) * Math.sin(ang2);
    needle2 = (
      <G>
        <SvgLine x1={cx} y1={cy} x2={nx2.toFixed(2)} y2={ny2.toFixed(2)}
          stroke="#00BFFF" strokeWidth={1.8} strokeLinecap="round" strokeDasharray="3 2" opacity={0.9} />
        <SvgCircle cx={parseFloat(nx2.toFixed(2))} cy={parseFloat(ny2.toFixed(2))} r={3.5} fill="#00BFFF" opacity={0.95} />
      </G>
    );
  }
  // Aguja 3: Crypto F&G (roja punteada) — idéntico a PWA
  let needle3 = null;
  if (value3 != null) {
    const ang3 = Math.PI - (value3 / 100) * Math.PI;
    const nx3 = cx + (R - 8) * Math.cos(ang3);
    const ny3 = cy - (R - 8) * Math.sin(ang3);
    needle3 = (
      <G>
        <SvgLine x1={cx} y1={cy} x2={nx3.toFixed(2)} y2={ny3.toFixed(2)}
          stroke="#FF6B6B" strokeWidth={1.8} strokeLinecap="round" strokeDasharray="3 2" opacity={0.9} />
        <SvgCircle cx={parseFloat(nx3.toFixed(2))} cy={parseFloat(ny3.toFixed(2))} r={3.5} fill="#FF6B6B" opacity={0.95} />
      </G>
    );
  }
  return (
    <Svg width={120} height={75} viewBox="0 0 130 75">
      <G>{arcs}</G>
      {needle3}
      {needle2}
      <SvgLine x1={cx} y1={cy} x2={nx.toFixed(2)} y2={ny.toFixed(2)} stroke={C.gold} strokeWidth={2.5} strokeLinecap="round" />
      <SvgCircle cx={cx} cy={cy} r={4} fill={C.gold} />
    </Svg>
  );
}

/* ─── TABS ─── */
const getTABS = (i18n) => [
  { key: 'cripto', label: i18n('cripto') },
  { key: 'acciones', label: i18n('acciones') },
  { key: 'stable', label: 'Stable & DeFi' },
  { key: 'futuros', label: i18n('futuros') },
  { key: 'commodities', label: i18n('commodities') },
  { key: 'divisas', label: i18n('divisas') },
  { key: 'etfs', label: i18n('etf_bonos') },
];

const getPaises = (i18n) => [
  { key: 'usa', label: i18n('pais_usa') },
  { key: 'argentina', label: i18n('pais_argentina') },
  { key: 'brasil', label: i18n('pais_brasil') },
  { key: 'europa', label: i18n('pais_europa') },
  { key: 'espana', label: i18n('pais_espana') },
  { key: 'japon', label: i18n('pais_japon') },
  { key: 'china', label: i18n('pais_china') },
];

const TF_BUTTONS = ['24h', '7d', '1m', '3m', '1a'];

const getPulseFilters = (i18n) => [
  { key: 'global', emoji: '\uD83C\uDF10', label: i18n('pulse_global') },
  { key: 'cripto', emoji: '\uD83E\uDE99', label: i18n('pulse_cripto') },
  { key: 'acciones', emoji: '\uD83D\uDCC8', label: i18n('pulse_acciones') },
  { key: 'commodities', emoji: '\uD83D\uDEE2\uFE0F', label: i18n('pulse_comod') },
  { key: 'futuros', emoji: '\u26A1', label: i18n('pulse_futi') },
];

/* ─── BANNER EVENTOS CRITICOS ─── */
function EventBanner({ st }) {
  const scrollAnim = useRef(new Animated.Value(0)).current;
  const [event] = useState({
    text: 'FED FOMC 7 mayo \u2014 CPI 13 mayo \u2014 Earnings NVDA, AAPL, MSFT proximas semanas',
    impact: 'MEDIO',
  });

  useEffect(() => {
    const anim = Animated.loop(
      Animated.timing(scrollAnim, { toValue: -700, duration: 15000, useNativeDriver: true })
    );
    anim.start();
    return () => anim.stop();
  }, [scrollAnim]);

  // Badge de impacto (MEDIO/ALTO) removido en v1 porque es estático.
  // Se reactivará en v1.1 cuando haya API real de eventos con su grado de impacto propio.

  return (
    <View style={st.eventBanner}>
      <View style={{ flex: 1, overflow: 'hidden' }}>
        <Animated.Text style={[st.eventText, { transform: [{ translateX: scrollAnim }] }]}>
          {event.text}
        </Animated.Text>
      </View>
    </View>
  );
}

/* ─── MAIN SCREEN ─── */
export default function MercadosScreen() {
  const { theme: C } = useTheme();
  const st = useMemo(() => makeStyles(C), [C]);
  const i18n = useT();
  const navigation = useNavigation();
  // Build 18 Bloque 2: gating UI premium por plan
  const { plan: userPlan } = usePlan();
  const isPro = userPlan === 'PRO' || userPlan === 'ELITE';
  const isElite = userPlan === 'ELITE';
  const [showLegal, setShowLegal] = useState(false);
  const [tab, setTab] = useState('cripto');
  const [pais, setPais] = useState('usa');
  const [tf, setTf] = useState({}); // { AAPL: '7d', BTC: '1m', ... } — por activo
  const getTf = (sym) => tf[sym] || '24h';
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [favorites, setFavorites] = useState([]); // array de tickers favoritos
  const [onlyFavs, setOnlyFavs] = useState(false); // filtro "solo favoritos"
  const [sortBy, setSortBy] = useState('default');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [actionMenu, setActionMenu] = useState(null); // item del long press
  const [pulseData, setPulseData] = useState(null);
  const [pulseFilter, setPulseFilter] = useState('global');
  const [iaSignals, setIaSignals] = useState({});
  const [sparklines, setSparklines] = useState({});
  const [histPrices, setHistPrices] = useState({}); // { '7d': { BTC: precio, ... }, ... }
  const [showPulseVars, setShowPulseVars] = useState(false);
  const [comboSlide, setComboSlide] = useState(0);
  const [showMktEdit, setShowMktEdit] = useState(false);
  const [mktPrefs, setMktPrefs] = useState(['EEUU', 'ASIA', 'ARG']);
  const [showFutEdit, setShowFutEdit] = useState(false);
  const [selectedFuturos, setSelectedFuturos] = useState((DATA.futuros || []).map(f => f.s));

  // Persistir selectedFuturos y mktPrefs en AsyncStorage
  // Guardar cada vez que cambian (useEffect sobre el valor, no solo al montar)
  const [prefsLoaded, setPrefsLoaded] = useState(false);
  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem('aurex_selectedFuturos'),
      AsyncStorage.getItem('aurex_mktPrefs'),
    ]).then(([futV, mktV]) => {
      if (futV) setSelectedFuturos(JSON.parse(futV));
      if (mktV) setMktPrefs(JSON.parse(mktV));
      setPrefsLoaded(true);
    });
  }, []);
  // Guardar automáticamente cada vez que cambian (después de la carga inicial)
  useEffect(() => {
    if (!prefsLoaded) return;
    AsyncStorage.setItem('aurex_selectedFuturos', JSON.stringify(selectedFuturos));
  }, [selectedFuturos, prefsLoaded]);
  useEffect(() => {
    if (!prefsLoaded) return;
    AsyncStorage.setItem('aurex_mktPrefs', JSON.stringify(mktPrefs));
  }, [mktPrefs, prefsLoaded]);
  const ALL_MKT_OPTIONS = ['EEUU','ARG','BRASIL','LONDRES','ESPANA','ALEMANIA','FRANCIA','JAPON','CHINA','HONGKONG','ASIA'];
  const toggleMktPref = (m) => {
    setMktPrefs(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]);
  };
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchDetail, setShowSearchDetail] = useState(null);
  const [btcSentiment, setBtcSentiment] = useState(null);
  const [altFnG, setAltFnG] = useState(null);

  // Datos del banner de mercados (horarios apertura/cierre)
  const marketBannerData = React.useMemo(() => {
    const now = new Date();
    const utcH = now.getUTCHours(), utcM = now.getUTCMinutes(), utcDay = now.getUTCDay();
    const utcMin = utcH * 60 + utcM;
    const isWknd = utcDay === 0 || utcDay === 6;
    const mkts = [
      { id: 'EEUU', flag: '🇺🇸', open: 810, close: 1200 },
      { id: 'ARG', flag: '🇦🇷', open: 840, close: 1260 },
      { id: 'BRASIL', flag: '🇧🇷', open: 780, close: 1175 },
      { id: 'LONDRES', flag: '🇬🇧', open: 480, close: 990 },
      { id: 'ESPANA', flag: '🇪🇸', open: 480, close: 990 },
      { id: 'ALEMANIA', flag: '🇩🇪', open: 480, close: 1020 },
      { id: 'FRANCIA', flag: '🇫🇷', open: 480, close: 1020 },
      { id: 'JAPON', flag: '🇯🇵', open: 0, close: 390 },
      { id: 'CHINA', flag: '🇨🇳', open: 90, close: 420 },
      { id: 'HONGKONG', flag: '🇭🇰', open: 90, close: 480 },
      { id: 'ASIA', flag: '🌏', open: 0, close: 360 },
    ];
    return mkts.map(m => {
      const isOpen = !isWknd && utcMin >= m.open && utcMin < m.close;
      let mins;
      if (isOpen) mins = m.close - utcMin;
      else if (utcMin < m.open) mins = m.open - utcMin;
      else mins = (24 * 60 - utcMin) + m.open;
      return { ...m, isOpen, timeLabel: `${Math.floor(mins / 60)}h${mins % 60}m` };
    });
  }, []);

  /* ─── Obtener lista activa ─── */
  const getActiveList = useCallback(() => {
    if (tab === 'acciones') {
      const paisMap = { usa: 'usa', argentina: 'argentina', brasil: 'brasil', europa: 'europa', espana: 'europa', japon: 'japon', china: 'china' };
      return DATA.acciones[paisMap[pais] || 'usa'] || DATA.acciones.usa;
    }
    if (tab === 'etfs') return [...(DATA.etfs || []), ...(DATA.bonos || [])];
    return DATA[tab] || DATA.cripto;
  }, [tab, pais]);

  /* ─── Fetch Binance ─── */
  const fetchBinance = useCallback(async (assets) => {
    const syms = assets.filter(a => !a.fixed).map(a => `"${a.s}USDT"`).join(',');
    if (!syms) {
      const p = {};
      assets.forEach(a => { if (a.fixed) p[a.s] = { price: a.fixed, change: 0 }; });
      setPrices(prev => ({ ...prev, ...p }));
      return;
    }
    try {
      const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbols=[${syms}]`);
      const data = await res.json();
      const p = {};
      assets.forEach(a => { if (a.fixed) p[a.s] = { price: a.fixed, change: 0 }; });
      (Array.isArray(data) ? data : []).forEach(t => {
        const sym = t.symbol.replace('USDT', '');
        p[sym] = { price: parseFloat(t.lastPrice), change: parseFloat(t.priceChangePercent) };
      });
      setPrices(prev => ({ ...prev, ...p }));
      // Sparklines 7d — TODOS los activos crypto (no solo primeros 15)
      const sparkPromises = assets.filter(a => !a.fixed).map(async a => {
        try {
          const kr = await fetch(`https://api.binance.com/api/v3/klines?symbol=${a.s}USDT&interval=1d&limit=7`);
          const kd = await kr.json();
          return { sym: a.s, data: kd.map(k => parseFloat(k[4])) };
        } catch { return null; }
      });
      const sparkResults = await Promise.allSettled(sparkPromises);
      const sp = {};
      sparkResults.forEach(r => { if (r.status === 'fulfilled' && r.value) sp[r.value.sym] = r.value.data; });
      setSparklines(prev => ({ ...prev, ...sp }));
    } catch {
      // Fallback: backend Railway crypto-prices
      try {
        const r = await fetch('https://aurex-app-production.up.railway.app/api/crypto-prices');
        const d = await r.json();
        if (d?.prices) {
          const p = {};
          Object.keys(d.prices).forEach(sym => { if (d.prices[sym]?.price) p[sym] = { price: d.prices[sym].price, change: 0 }; });
          setPrices(prev => ({ ...prev, ...p }));
        }
      } catch {}
    }
  }, []);

  /* ─── Fetch Yahoo ─── */
  const fetchYahoo = useCallback(async (assets) => {
    const fetchOne = async (a, isRetry = false) => {
      try {
        const ySym = a.ySymbol || a.s;
        const tfMap = { '24h': '1mo', '7d': '1mo', '1m': '1mo', '3m': '3mo', '1a': '1y' };
        const intMap = { '3m': '1wk', '1a': '1wk' };
        const aTf = getTf(a.s);
        const range = tfMap[aTf] || '1mo';
        const interval = intMap[aTf] || '1d';
        const res = await fetch(`${BACKEND}/api/yahoo?symbol=${encodeURIComponent(ySym)}&interval=${interval}&range=${range}&_=${Date.now()}`, { cache: 'no-store' });
        const data = await res.json();
        const q = data?.chart?.result?.[0];
        if (!q) return null;
        const closes = (q.indicators.quote[0].close || []).filter(x => x != null);
        const price = closes[closes.length - 1] || q.meta.regularMarketPrice;
        const prev = closes.length > 1 ? closes[closes.length - 2] : q.meta.chartPreviousClose || price;
        const change = prev ? ((price - prev) / prev) * 100 : 0;
        // RETRY: si closes viene vacío pero hay price, reintentar UNA vez tras 800ms
        if (closes.length < 2 && price && !isRetry) {
          await new Promise(r => setTimeout(r, 800));
          return fetchOne(a, true);
        }
        const sparkCloses = closes.length >= 2 ? closes : (price ? Array(7).fill(price) : []);
        return { sym: a.s, price, change, closes: sparkCloses };
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
    };
    const results = await Promise.allSettled(assets.map(a => fetchOne(a)));
    const p = {}, sp = {};
    results.forEach(r => {
      if (r.status === 'fulfilled' && r.value) {
        p[r.value.sym] = { price: r.value.price, change: r.value.change };
        if (r.value.closes) sp[r.value.sym] = r.value.closes;
      }
    });
    setPrices(prev => ({ ...prev, ...p }));
    setSparklines(prev => ({ ...prev, ...sp }));
  }, [tf]);

  /* ─── Load prices ─── */
  // Cargar precios de futuros para el banner
  const loadFuturesPrices = useCallback(async () => {
    const futSyms = (DATA.futuros || []).map(f => f.s);
    const results = await Promise.allSettled(futSyms.map(async (sym) => {
      try {
        const res = await fetch(`${BACKEND}/api/yahoo?symbol=${encodeURIComponent(sym)}&interval=1d&range=2d`);
        const data = await res.json();
        const q = data?.chart?.result?.[0];
        if (!q) return null;
        const closes = (q.indicators.quote[0].close || []).filter(x => x != null);
        const price = closes[closes.length - 1] || q.meta.regularMarketPrice;
        const prev = closes.length > 1 ? closes[closes.length - 2] : q.meta.chartPreviousClose || price;
        return { sym, price, change: prev ? ((price - prev) / prev) * 100 : 0 };
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
    }));
    const p = {};
    results.forEach(r => { if (r.status === 'fulfilled' && r.value) p[r.value.sym] = { price: r.value.price, change: r.value.change }; });
    setPrices(prev => ({ ...prev, ...p }));
  }, []);

  const loadPrices = useCallback(async () => {
    setLoading(true);
    const assets = getActiveList();
    if (tab === 'cripto' || tab === 'stable') await fetchBinance(assets);
    else await fetchYahoo(assets);
    setLastUpdate(Date.now());
    setLoading(false);
  }, [getActiveList, tab, fetchBinance, fetchYahoo]);

  /* ─── PULSE: funciones IDENTICAS a PWA (aurex-features.js) ─── */
  const _pctToScore = (pct, scale) => Math.min(100, Math.max(0, 50 + (pct / scale) * 50));
  const _vixToScore = (vix) => Math.min(100, Math.max(0, 100 - (vix - 10) * 3.0));
  const _goldToScore = (pct) => Math.min(100, Math.max(0, 50 - pct * 25));
  const _oilToScore = (pct) => Math.min(100, Math.max(0, 50 - Math.abs(pct) * 15));

  const _fetchPulseRaw = async () => {
    const raw = {};
    // 1. Binance: BTC, ETH (idéntico a PWA)
    try {
      const bArr = await Promise.all([
        fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT').then(r => r.json()),
        fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=ETHUSDT').then(r => r.json()),
      ]);
      raw.btcPct = parseFloat(bArr[0].priceChangePercent) || 0;
      raw.ethPct = parseFloat(bArr[1].priceChangePercent) || 0;
      // BTC 90-day range position (for CRIPTO PULSE calibration)
      try {
        const klines = await fetch('https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=90').then(r => r.json());
        const cls = klines.map(k => parseFloat(k[4]));
        const hi90 = Math.max(...cls), lo90 = Math.min(...cls), cur = cls[cls.length - 1];
        raw.btc90dPos = hi90 > lo90 ? ((cur - lo90) / (hi90 - lo90)) * 100 : 50;
        raw.btcMom30 = cls.length >= 30 ? ((cur - cls[cls.length - 30]) / cls[cls.length - 30]) * 100 : raw.btcPct;
      } catch { raw.btc90dPos = null; raw.btcMom30 = null; }
    } catch { raw.btcPct = 0; raw.ethPct = 0; }

    // 2. Yahoo via Railway proxy (idéntico a PWA)
    const yahooSyms = ['^VIX', '^GSPC', 'ES=F', 'NQ=F', 'YM=F', 'RTY=F', 'GC=F', 'SI=F', 'CL=F', 'HG=F'];
    const yahooKeys = ['vix', 'sp500', 'esf', 'nqf', 'ymf', 'rtyf', 'gcf', 'sif', 'clf', 'hgf'];
    const yPromises = yahooSyms.map(async (sym, idx) => {
      try {
        const url = BACKEND + '/api/yahoo?symbol=' + sym + '&interval=1d&range=2d';
        const res = await fetch(url);
        const data = await res.json();
        if (data.chart && data.chart.result && data.chart.result[0]) {
          const meta = data.chart.result[0].meta;
          const price = meta.regularMarketPrice || 0;
          const prev = meta.previousClose || meta.chartPreviousClose || price;
          raw[yahooKeys[idx]] = { price: price, pct: prev > 0 ? ((price - prev) / prev * 100) : 0 };
        }
      } catch { raw[yahooKeys[idx]] = { price: 0, pct: 0 }; }
    });
    await Promise.all(yPromises);

    // 3. Macro FED (FRED API) + Geopolitica (GDELT) — idéntico a PWA _fetchMacroGeo
    let macroScore = 50, geoScore = 70;
    try {
      const fredUrl = 'https://corsproxy.io/?' + encodeURIComponent('https://fred.stlouisfed.org/graph/fredgraph.csv?id=FEDFUNDS&limit=3&sort_order=desc');
      const fredText = await fetch(fredUrl).then(r => r.text());
      const lines = fredText.trim().split('\n').filter(l => l && l.indexOf('DATE') < 0);
      if (lines.length >= 2) {
        const r1 = parseFloat(lines[0].split(',')[1]) || 0;
        const r2 = parseFloat(lines[1].split(',')[1]) || 0;
        const delta = r1 - r2;
        macroScore = Math.min(100, Math.max(0, 50 - delta * 20));
      } else if (lines.length === 1) {
        const rate = parseFloat(lines[0].split(',')[1]) || 5;
        macroScore = Math.min(100, Math.max(0, 100 - (rate - 1) * 12));
      }
    } catch {
      if (raw.vix && raw.vix.price) {
        macroScore = Math.min(100, Math.max(0, 100 - (raw.vix.price - 10) * 2.5));
      }
    }
    try {
      const gdeltUrl = 'https://corsproxy.io/?' + encodeURIComponent('https://api.gdeltproject.org/api/v2/summary/summary?d=aylook&t=summary&TIMESPAN=60&SRCLANG=english&OUTPUTTYPE=3');
      const gdeltData = await fetch(gdeltUrl).then(r => r.json());
      const tone = gdeltData && gdeltData.articles && gdeltData.articles[0] ? (parseFloat(gdeltData.articles[0].avgtone) || 0) : 0;
      geoScore = Math.min(100, Math.max(0, 50 + tone * 5));
    } catch {
      if (raw.vix && raw.vix.price) {
        geoScore = raw.vix.price > 30 ? Math.max(10, 70 - (raw.vix.price - 30) * 3) : 70;
      }
    }
    raw.macro = { score: Math.round(macroScore) };
    raw.geo = { score: Math.round(geoScore) };
    return raw;
  };

  // _calcPulseScore: IDENTICO a PWA
  const _calcPulseScore = (raw, cat) => {
    if (!raw) return { value: 50, label: 'Neutral', color: '#D4A017', emoji: '\uD83D\uDE10', vars: {} };
    const scores = {};
    let weighted = 0, totalW = 0;
    const add = (key, score, weight) => {
      scores[key] = Math.round(score);
      weighted += score * weight;
      totalW += weight;
    };
    if (cat === 'CRIPTO' || cat === 'GLOBAL') {
      if (cat === 'CRIPTO') {
        if (raw.btc90dPos !== null && raw.btc90dPos !== undefined) {
          add('BTC_Pos90d', raw.btc90dPos, 35);
        }
        // RSI14 not available in native (no window._rsiCache), use momentum fallback
        if (raw.btcMom30 !== null && raw.btcMom30 !== undefined) {
          add('BTC_Mom30d', Math.min(100, Math.max(0, 50 + (raw.btcMom30 / 30) * 50)), 15);
        } else {
          add('BTC_Mom1d', _pctToScore(raw.btcPct, 6), 15);
        }
        if (raw.vix) add('VIX', _vixToScore(raw.vix.price), 20);
        if (raw.esf) add('SP500_Fut', _pctToScore(raw.esf.pct, 1.5), 5);
      } else {
        add('BTC', _pctToScore(raw.btcPct, 8), 12);
        add('ETH', _pctToScore(raw.ethPct, 8), 8);
        if (raw.vix) add('VIX', _vixToScore(raw.vix.price), 14);
        if (raw.esf) add('SP500_Fut', _pctToScore(raw.esf.pct, 1.5), 8);
      }
    }
    if (cat === 'ACCIONES' || cat === 'GLOBAL') {
      if (raw.vix) add('VIX', _vixToScore(raw.vix.price), cat === 'ACCIONES' ? 35 : 14);
      if (raw.sp500) add('SP500', _pctToScore(raw.sp500.pct, 1.5), cat === 'ACCIONES' ? 25 : 8);
      if (raw.esf) add('ES_Fut', _pctToScore(raw.esf.pct, 1.5), cat === 'ACCIONES' ? 20 : 8);
      if (raw.nqf) add('NQ_Fut', _pctToScore(raw.nqf.pct, 2), cat === 'ACCIONES' ? 12 : 6);
      if (raw.ymf) add('YM_Fut', _pctToScore(raw.ymf.pct, 1.5), cat === 'ACCIONES' ? 8 : 4);
    }
    if (cat === 'FUTUROS' || cat === 'GLOBAL') {
      if (raw.esf) add('ES_Fut', _pctToScore(raw.esf.pct, 1.5), cat === 'FUTUROS' ? 30 : 8);
      if (raw.nqf) add('NQ_Fut', _pctToScore(raw.nqf.pct, 2), cat === 'FUTUROS' ? 25 : 6);
      if (raw.ymf) add('YM_Fut', _pctToScore(raw.ymf.pct, 1.5), cat === 'FUTUROS' ? 20 : 4);
      if (raw.rtyf) add('RTY_Fut', _pctToScore(raw.rtyf.pct, 2), cat === 'FUTUROS' ? 25 : 3);
    }
    if (cat === 'COMOD' || cat === 'GLOBAL') {
      if (raw.gcf) add('Oro', _goldToScore(raw.gcf.pct), cat === 'COMOD' ? 35 : 8);
      if (raw.sif) add('Plata', _goldToScore(raw.sif.pct), cat === 'COMOD' ? 20 : 4);
      if (raw.clf) add('Petroleo', _oilToScore(raw.clf.pct), cat === 'COMOD' ? 25 : 5);
      if (raw.hgf) add('Cobre', _pctToScore(raw.hgf.pct, 2), cat === 'COMOD' ? 20 : 4);
    }
    // Macro FED + Geopolitics: aplican en TODAS las categorias incluyendo CRIPTO
    // (alineado con Definicion Estrategica AUREX 2-may-2026). BTC tiene correlacion
    // >0.6 con NASDAQ desde 2022 y reacciona fuerte a decisiones FED y geopolitica.
    if (raw.macro) add('Macro_FED', raw.macro.score, 12);
    if (raw.geo) add('Geopolitica', raw.geo.score, 4);
    if (totalW === 0) return { value: 50, label: 'Neutral', color: '#D4A017', emoji: '\uD83D\uDE10', vars: scores };
    const v = Math.min(100, Math.max(0, Math.round(weighted / totalW)));
    let label, color, emoji;
    if (v <= 20) { label = 'Miedo Extremo'; color = '#C62828'; emoji = '\uD83D\uDE31'; }
    else if (v <= 40) { label = 'Miedo'; color = '#FF6B6B'; emoji = '\uD83D\uDE30'; }
    else if (v <= 60) { label = 'Neutral'; color = '#D4A017'; emoji = '\uD83D\uDE10'; }
    else if (v <= 80) { label = 'Codicia'; color = '#3FB950'; emoji = '\uD83D\uDE0F'; }
    else { label = 'Codicia Extrema'; color = '#00E676'; emoji = '\uD83E\uDD11'; }
    return { value: v, label, color, emoji, vars: scores };
  };

  /* ─── Load AUREX Pulse (fuente única: backend) ─── */
  const loadPulse = useCallback(async () => {
    try {
      // PRIMERO: leer del backend (fuente única para PWA y nativa)
      const res = await fetch(`${BACKEND}/api/pulse`);
      const data = await res.json();
      if (data.scores && data.raw) {
        setPulseData(data);
        // Cache Pulse en AsyncStorage
        try { await AsyncStorage.setItem('aurex_pulse_cache', JSON.stringify({ data, ts: Date.now() })); } catch {}
        // BTC Sentiment: calcular desde datos que el backend YA tiene (sin request extra)
        if (data.raw.btcSentiment != null) {
          setBtcSentiment(data.raw.btcSentiment);
        } else {
          // Calcular desde BTC_Mom1d + VIX (mismos datos del Pulse, sin Binance extra)
          const btcMom = data.scores?.CRIPTO?.vars?.BTC_Mom1d ?? 50;
          const vix = data.raw?.vix?.price ?? 20;
          const vixAdj = vix < 20 ? 5 : vix > 30 ? -8 : vix > 25 ? -3 : 0;
          setBtcSentiment(Math.max(0, Math.min(100, Math.round(btcMom + vixAdj))));
        }
        if (data.raw.altFnG != null) setAltFnG(data.raw.altFnG);
        return;
      }
    } catch {}
    // FALLBACK 1: cache local AsyncStorage
    try {
      const cached = JSON.parse(await AsyncStorage.getItem('aurex_pulse_cache'));
      if (cached && cached.data) {
        setPulseData(cached.data);
        console.log('[AUREX PULSE] Usando cache local de hace', Math.round((Date.now() - (cached.ts || 0)) / 60000), 'min');
        return;
      }
    } catch {}
    // FALLBACK 2: calcular localmente (misma lógica que PWA)
    try {
      const raw = await _fetchPulseRaw();
      const CATS = ['GLOBAL', 'CRIPTO', 'ACCIONES', 'COMOD', 'FUTUROS'];
      const results = {};
      CATS.forEach(cat => { results[cat] = _calcPulseScore(raw, cat); });
      setPulseData({ raw, results });
    } catch {
      setPulseData(null);
    }
  }, []);

  /* ─── Load IA Signals ─── */
  const loadIASignals = useCallback(async () => {
    try {
      const res = await fetch(`${BACKEND}/api/ia-signals`);
      const data = await res.json();
      if (data.signals && data.signals.length > 0) {
        const map = {};
        data.signals.forEach(s => { map[s.simbolo] = s; });
        setIaSignals(map);
        try { await AsyncStorage.setItem('aurex_ia_signals_map', JSON.stringify(map)); } catch {}
      }
    } catch {
      // Cache local
      try {
        const cached = JSON.parse(await AsyncStorage.getItem('aurex_ia_signals_map'));
        if (cached && Object.keys(cached).length > 0) setIaSignals(cached);
      } catch {}
    }
  }, []);

  // BTC Sentiment — idéntico a PWA (Binance + CoinGecko)
  const loadBtcSentiment = useCallback(async () => {
    try {
      const btcR = await fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT').then(r => r.json());
      const priceChg = parseFloat(btcR.priceChangePercent);
      const volB = parseFloat(btcR.quoteVolume) / 1e9;
      const avgRatio = parseFloat(btcR.weightedAvgPrice) / parseFloat(btcR.lastPrice);
      let dom = 50;
      try {
        const globR = await fetch('https://api.coingecko.com/api/v3/global').then(r => r.json());
        dom = globR?.data?.market_cap_percentage?.btc ?? 50;
      } catch {}
      let sc = 50;
      sc += priceChg * 2.5;
      sc += (volB > 2 ? 5 : volB > 1 ? 2 : -3);
      sc += (dom > 60 ? -5 : dom > 50 ? 0 : 5);
      sc += (avgRatio < 0.99 ? 8 : avgRatio > 1.01 ? -5 : 0);
      const finalSc = Math.max(0, Math.min(100, Math.round(sc)));
      console.log('[AUREX] BTC Sentiment calculado:', finalSc);
      setBtcSentiment(finalSc);
    } catch (e) {
      console.log('[AUREX] BTC Sentiment error:', e.message);
      // Fallback: calcular solo con precio si todo falla
      try {
        const r = await fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT');
        const d = await r.json();
        const chg = parseFloat(d.priceChangePercent) || 0;
        setBtcSentiment(Math.max(0, Math.min(100, Math.round(50 + chg * 2.5))));
      } catch { setBtcSentiment(50); }
    }
  }, []);

  // Crypto Fear & Greed — idéntico a PWA (Alternative.me)
  const loadAltFnG = useCallback(async () => {
    try {
      const data = await fetch('https://api.alternative.me/fng/?limit=1').then(r => r.json());
      const val = data?.data?.[0]?.value != null ? parseInt(data.data[0].value) : null;
      if (val !== null) setAltFnG(val);
    } catch {}
  }, []);

  useEffect(() => { loadPrices(); loadPulse(); loadIASignals(); loadBtcSentiment(); loadAltFnG(); }, [loadPrices, loadPulse, loadIASignals, loadBtcSentiment, loadAltFnG]);

  // Cargar favoritos persistidos
  useEffect(() => {
    AsyncStorage.getItem('mercados_favorites').then(v => {
      if (v) { try { setFavorites(JSON.parse(v)); } catch (e) {} }
    });
  }, []);

  // Toggle favorito (agregar o quitar) + persistir
  const toggleFavorite = (ticker) => {
    setFavorites(prev => {
      const next = prev.includes(ticker) ? prev.filter(x => x !== ticker) : [...prev, ticker];
      AsyncStorage.setItem('mercados_favorites', JSON.stringify(next));
      return next;
    });
  };
  const isFavorite = (ticker) => favorites.includes(ticker);

  // Cross-tab: agregar asset a Portfolio (guarda en AsyncStorage y navega)
  const addToPortfolioFromMercados = async (asset) => {
    try {
      await AsyncStorage.setItem('pending_portfolio_add', JSON.stringify({
        simbolo: asset.s, nombre: asset.n, tipo: asset.t, logo: asset.logo, color: asset.color,
      }));
      setShowSearchDetail(null);
      Keyboard.dismiss();
      navigation.navigate('Portfolio');
    } catch (e) {}
  };

  // Cargar precios históricos — módulo centralizado, sin límite de activos
  useEffect(() => {
    const assets = getActiveList().filter(a => !a.fixed);
    if (assets.length === 0) return;
    const mapped = assets.map(a => ({ sym: a.s, tipo: a.t || '' }));
    preloadHistPrices(mapped).then(all => {
      // Mercados usa '1a' en vez de '1y' para los botones
      if (all['1y']) { all['1a'] = all['1y']; delete all['1y']; }
      setHistPrices(all);
    });
  }, [tab, pais, getActiveList]);

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([loadPrices(), loadPulse(), loadIASignals()]);
    setRefreshing(false);
  };

  const filteredList = () => {
    let list = getActiveList();
    if (onlyFavs) list = list.filter(item => favorites.includes(item.s));
    // Regla de pin (Opción A, decisión Fernando 14/abril):
    // - Default → favoritos arriba (pin activo)
    // - Cualquier otro sort → favoritos se mezclan con todos en su posición real
    if (sortBy === 'default') {
      const favs = list.filter(item => favorites.includes(item.s));
      const rest = list.filter(item => !favorites.includes(item.s));
      return [...favs, ...rest];
    }
    // Sort real: todos los activos (incluyendo favoritos) compiten en el orden elegido
    const getStats = (item) => {
      const p = prices[item.s];
      const sig = iaSignals[item.s];
      return {
        price: p?.price || 0,
        chg24: p?.change24h || p?.change || 0,
        ticker: item.s || '',
        dir: sig?.direccion || '',
        prob: sig?.confianza || sig?.probPrincipal || 0,
      };
    };
    const dirScore = (dir) => dir === 'ALCISTA' ? 3 : dir === 'ALTA CONV-IA' ? 2 : dir === 'BAJISTA' ? 1 : 0;
    return [...list].sort((a, b) => {
      const A = getStats(a); const B = getStats(b);
      if (sortBy === 'today') return B.chg24 - A.chg24;
      if (sortBy === 'price') return B.price - A.price;
      if (sortBy === 'ticker') return A.ticker.localeCompare(B.ticker);
      if (sortBy === 'signal') return dirScore(B.dir) - dirScore(A.dir);
      if (sortBy === 'prob') return B.prob - A.prob;
      return 0;
    });
  };

  const sortOptionsMkt = [
    { key: 'default', icon: '🕐', label: i18n('sort_default'), hint: i18n('sort_hint_default') },
    { key: 'today',   icon: '📈', label: i18n('sort_today'),   hint: i18n('sort_hint_today') },
    { key: 'price',   icon: '💲', label: i18n('sort_price'),   hint: i18n('sort_hint_price') },
    { key: 'ticker',  icon: '🔤', label: i18n('sort_ticker'),  hint: i18n('sort_hint_ticker') },
    { key: 'signal',  icon: '🔼', label: i18n('sort_signal'),  hint: i18n('sort_hint_signal') },
    { key: 'prob',    icon: '🎯', label: i18n('sort_prob'),    hint: i18n('sort_hint_prob') },
  ];
  const currentMktSortLabel = (sortOptionsMkt.find(o => o.key === sortBy) || sortOptionsMkt[0]).label;

  const getAssetType = (sym) => {
    const a = ALL_ASSETS.find(x => x.s === sym);
    return a ? (a.t || '') : '';
  };

  const FILTER_TO_CAT = { global: 'GLOBAL', cripto: 'CRIPTO', acciones: 'ACCIONES', commodities: 'COMOD', futuros: 'FUTUROS' };
  const currentCat = FILTER_TO_CAT[pulseFilter] || 'GLOBAL';
  const pulseResult = pulseData?.scores?.[currentCat] || pulseData?.results?.[currentCat] || { value: 50, label: 'Neutral', color: '#D4A017', emoji: '\uD83D\uDE10', vars: {} };
  const score = pulseResult.value ?? pulseResult.score ?? 50;
  const pColor = pulseColor(score);

  /* ─── Data line values ─── */
  const raw = pulseData?.raw || {};
  const vixVal = raw.vix?.price != null ? fmt(raw.vix.price, 1) : '--';
  const btcChg = raw.btcPct ?? null;
  const ethChg = raw.ethPct ?? null;
  const spChg = raw.sp500?.pct ?? null;
  const goldChg = raw.gcf?.pct ?? null;
  const esChg = raw.esf?.pct ?? null;
  const nqChg = raw.nqf?.pct ?? null;
  const ymChg = raw.ymf?.pct ?? null;
  const rtyChg = raw.rtyf?.pct ?? null;
  const silverChg = raw.sif?.pct ?? null;
  const oilChg = raw.clf?.pct ?? null;
  const copperChg = raw.hgf?.pct ?? null;
  const macroScoreVal = raw.macro?.score ?? null;
  const geoScoreVal = raw.geo?.score ?? null;

  const chgStr = (v) => {
    if (v == null) return '--';
    const sign = v >= 0 ? '+' : '';
    return `${sign}${fmt(v, 1)}%`;
  };
  const chgColor = (v) => (v == null ? C.textDim : v >= 0 ? C.green : C.red);

  return (
    <SafeAreaView style={st.container}>

      {/* ─── 1. HEADER ─── */}
      <View style={st.headerRow}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <AurexLogo size={32} />
          <Text style={st.headerTitle}>AUREX</Text>
          <Text style={st.headerSub}> {i18n('mercados')}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingRight: 14 }}>
          <TouchableOpacity onPress={() => setShowLegal(true)} style={{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: C.card, borderWidth: 1, borderColor: C.gold, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 }}>
            <Text style={{ fontSize: 14 }}>⚖️</Text>
            <Text style={{ fontSize: 9, color: C.gold, fontWeight: '800' }}>▼</Text>
          </TouchableOpacity>
          <LiveIndicator lastUpdate={lastUpdate} />
          <BellButton onPress={() => navigation.navigate('MisAlertas')} />
        </View>
      </View>

      {/* Build final V3: UpsellBanner sacado de Mercados (saturaba la vista
          y empujaba precios fuera de pantalla). Queda solo en Perfil (V4). */}

      {/* ─── 2. BUSCADOR CON DROPDOWN ─── */}
      <View style={st.searchWrap}>
        <TextInput
          style={st.searchInput}
          placeholder={i18n('buscar')}
          placeholderTextColor={C.textDim}
          value={search}
          returnKeyType="search"
          onSubmitEditing={() => Keyboard.dismiss()}
          onChangeText={(text) => {
            setSearch(text);
            if (text.length >= 2) {
              const q = text.toUpperCase();
              const results = ALL_ASSETS.filter(a => a.s.toUpperCase().includes(q) || a.n.toUpperCase().includes(q)).slice(0, 8);
              setSearchResults(results);
            } else {
              setSearchResults([]);
              // Si el usuario borró todo → cerrar el teclado automáticamente
              if (text.length === 0) Keyboard.dismiss();
            }
          }}
        />
        {search.length > 0 && (
          <TouchableOpacity
            onPress={() => { setSearch(''); setSearchResults([]); Keyboard.dismiss(); }}
            style={{ position: 'absolute', right: 10, top: 0, bottom: 0, justifyContent: 'center', paddingHorizontal: 8 }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={{ fontSize: 18, color: C.textSec }}>✕</Text>
          </TouchableOpacity>
        )}
        {/* Dropdown de resultados */}
        {searchResults.length > 0 && (
          <View style={st.searchDropdown}>
            {searchResults.map((a, i) => {
              const tipoColor = (a.t || '').toLowerCase() === 'cripto' ? '#A78BFA' : (a.t || '').toLowerCase() === 'accion' ? '#58A6FF' : (a.t || '').toLowerCase() === 'etf' ? '#F0883E' : C.textSec;
              return (
                <TouchableOpacity key={a.s} style={st.searchResultRow} onPress={() => {
                  Keyboard.dismiss();
                  setShowSearchDetail(a);
                  setSearch('');
                  setSearchResults([]);
                }}>
                  <AssetLogo sym={a.s} tipo={a.t} logo={a.logo} size={24} color={a.color} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, fontWeight: '700', color: C.text }}>{a.s}</Text>
                    <Text style={{ fontSize: 10, color: C.textSec }} numberOfLines={1}>{a.n} <Text style={{ color: tipoColor }}>◆ {a.t || i18n('activo_default')}</Text></Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>

      {/* Modal detalle de activo buscado (como la PWA) */}
      <Modal visible={!!showSearchDetail} transparent animationType="fade">
        <View style={st.modalOverlay}>
          {showSearchDetail && (() => {
            const a = showSearchDetail;
            const sig = iaSignals[a.s];
            const precio = sig?.precio || prices[a.s]?.price;
            const pct24 = sig?.precio24h > 0 && precio ? ((precio - sig.precio24h) / sig.precio24h * 100) : prices[a.s]?.change;
            const dir = sig?.direccion || '--';
            const dirColor = dir === 'ALCISTA' ? C.green : dir === 'BAJISTA' ? C.red : C.gold;
            const objetivo = sig?.objetivo;
            const prob = sig?.confianza || sig?.probPrincipal;
            return (
              <View style={st.searchDetailCard}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <AssetLogo sym={a.s} tipo={a.t} logo={a.logo} size={40} color={a.color} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 18, fontWeight: '700', color: C.text }}>{a.s}</Text>
                    <Text style={{ fontSize: 12, color: C.textSec }}>{a.n} · {a.t}</Text>
                  </View>
                  <TouchableOpacity onPress={() => setShowSearchDetail(null)}>
                    <Text style={{ fontSize: 22, color: C.textSec }}>✕</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', gap: 10, marginBottom: 14 }}>
                  <View style={st.searchDetailBox}>
                    <Text style={st.searchDetailLabel}>{i18n('precio_row')}</Text>
                    <Text style={st.searchDetailVal}>{precio ? fmtPrice(precio) : '--'}</Text>
                  </View>
                  <View style={st.searchDetailBox}>
                    <Text style={st.searchDetailLabel}>24h</Text>
                    <Text style={[st.searchDetailVal, { color: pct24 >= 0 ? C.green : C.red }]}>{pct24 != null ? fmtPct(pct24, 2) : '--'}</Text>
                  </View>
                  <View style={st.searchDetailBox}>
                    <Text style={st.searchDetailLabel}>{i18n('objetivo_ia')}</Text>
                    <Text style={[st.searchDetailVal, { color: C.gold }]}>{objetivo ? fmtPrice(objetivo) : '--'}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', gap: 10, marginBottom: 16 }}>
                  <View style={st.searchDetailBox}>
                    <Text style={st.searchDetailLabel}>{i18n('senal_ia_row')}</Text>
                    <Text style={[st.searchDetailVal, { color: dirColor }]}>{dir} {prob ? `${prob}%` : ''}</Text>
                  </View>
                </View>
                {/* Acciones: Favorito + Portfolio */}
                <View style={{ gap: 8, marginTop: 8 }}>
                  <TouchableOpacity
                    onPress={() => { toggleFavorite(a.s); setShowSearchDetail(null); Keyboard.dismiss(); }}
                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 12, borderRadius: 10, backgroundColor: isFavorite(a.s) ? C.gold : `${C.gold}20`, borderWidth: 1, borderColor: C.gold }}
                  >
                    <Text style={{ fontSize: 16 }}>{isFavorite(a.s) ? '★' : '☆'}</Text>
                    <Text style={{ fontSize: 13, fontWeight: '700', color: isFavorite(a.s) ? '#000' : C.gold }}>
                      {isFavorite(a.s) ? i18n('fav_quitar') : i18n('fav_agregar')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => addToPortfolioFromMercados(a)}
                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 12, borderRadius: 10, backgroundColor: '#3B82F618', borderWidth: 1, borderColor: '#3B82F680' }}
                  >
                    <Text style={{ fontSize: 16 }}>💼</Text>
                    <Text style={{ fontSize: 13, fontWeight: '700', color: '#1E40AF' }}>
                      {i18n('agregar_a_portfolio')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => { setShowSearchDetail(null); Keyboard.dismiss(); }}
                    style={{ paddingVertical: 11, borderRadius: 10, borderWidth: 1, borderColor: C.border2, alignItems: 'center' }}
                  >
                    <Text style={{ fontSize: 12, fontWeight: '600', color: C.textSec }}>{i18n('cerrar')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })()}
        </View>
      </Modal>

      {/* ─── 3. BANNER MERCADOS / FUTUROS (combo slider como PWA) ─── */}
      <View>
        <View style={st.mktFutBanner}>
          <TouchableOpacity style={[st.mktFutBtn, comboSlide === 0 && st.mktFutBtnActive]} onPress={() => setComboSlide(0)}>
            <Text style={[st.mktFutText, comboSlide === 0 && st.mktFutTextActive]}>{i18n('mercados')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[st.mktFutBtn, comboSlide === 1 && st.mktFutBtnActive]} onPress={() => { setComboSlide(1); loadFuturesPrices(); }}>
            <Text style={[st.mktFutText, comboSlide === 1 && st.mktFutTextActive]}>{i18n('futuros')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => comboSlide === 0 ? setShowMktEdit(true) : setShowFutEdit(true)} style={{ borderWidth: 1, borderColor: '#3B9EF5', borderRadius: 4, paddingHorizontal: 8, paddingVertical: 4 }}>
            <Text style={{ fontSize: 12, color: '#3B9EF5' }}>✏️</Text>
          </TouchableOpacity>
        </View>
        {comboSlide === 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={st.mktSlide} contentContainerStyle={{ paddingHorizontal: 8 }}>
            {marketBannerData.filter(m => mktPrefs.includes(m.id)).map(m => (
              <View key={m.id} style={st.mktItem}>
                <Text style={st.mktFlag}>{m.flag} {m.id}</Text>
                <Text style={[st.mktStatus, { color: m.isOpen ? C.green : '#FF6B6B' }]}>{m.isOpen ? i18n('mkt_abierto') : i18n('mkt_cerrado')}</Text>
                <Text style={st.mktTime}>{m.timeLabel}</Text>
              </View>
            ))}
          </ScrollView>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={st.mktSlide} contentContainerStyle={{ paddingHorizontal: 4 }}>
            {(DATA.futuros || []).filter(f => selectedFuturos.includes(f.s)).map(f => {
              const p = prices[f.s];
              const isUp = (p?.change || 0) >= 0;
              return (
                <View key={f.s} style={st.futChip}>
                  <Text style={st.futName}>{f.n}</Text>
                  <Text style={st.futPrice}>{p ? `$${fmt(p.price, p.price > 100 ? 0 : 2)}` : '...'}</Text>
                  <Text style={[st.futPct, { color: isUp ? C.green : C.red }]}>
                    {p ? `${isUp ? '+' : ''}${fmt(p.change, 2)}%` : ''}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        )}
      </View>

      {/* ─── 4. BANNER EVENTOS CRITICOS ─── */}
      <EventBanner st={st} />

      {/* ─── 5. AUREX PULSE ─── */}
      {pulseData !== null && (
        <View style={st.pulseWrap}>
          {/* Titulo + boton info */}
          <View style={st.pulseHeaderRow}>
            <Text style={st.pulseTitle}>{'\u26A1'} AUREX PULSE™</Text>
            {/* Build final V1: tiering 3 niveles seg\u00FAn tabla Escritorio 14-may:
                  FREE \u2192 redirect SubscriptionScreen (paywall)
                  PRO \u2192 abre modal con 14 vars + pesos (mismo modal)
                  ELITE \u2192 abre modal + secci\u00F3n extra de historial/explicaci\u00F3n profunda al final */}
            <TouchableOpacity style={st.pulseInfoBtn} onPress={() => {
              if (isPro) {
                setShowPulseVars(!showPulseVars);
              } else {
                navigation.navigate('Subscription');
              }
            }}>
              <Text style={st.pulseInfoText}>
                {isPro ? '\u2139\uFE0F' : '\uD83D\uDD12'} {i18n('ver_variables')}
              </Text>
            </TouchableOpacity>
          </View>

          {/* 5 filtros */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 6, marginBottom: 8, flexGrow: 0 }}>
            {getPulseFilters(i18n).map(f => {
              const isActive = pulseFilter === f.key;
              return (
                <TouchableOpacity
                  key={f.key}
                  style={[st.pulseFilterPill, isActive && { backgroundColor: pColor }]}
                  onPress={() => setPulseFilter(f.key)}
                >
                  <Text style={[st.pulseFilterText, isActive && { color: '#111' }]}>
                    {f.emoji} {f.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Gauge + Score (layout como PWA: gauge izq, info der) */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <PulseGauge key={pulseFilter} score={score}
              value2={currentCat === 'CRIPTO' ? btcSentiment : null}
              value3={currentCat === 'CRIPTO' ? altFnG : null} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 13, fontWeight: '700', color: pColor }} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.7}>
                {pulseEmoji(score)} {score} — {pulseLabel(score, i18n)} <Text style={{ fontSize: 8, color: C.gold, fontWeight: '700' }}>· AUREX PULSE™</Text>
              </Text>
              {/* Indicadores extra (solo CRIPTO) */}
              {currentCat === 'CRIPTO' && (btcSentiment != null || altFnG != null) && (
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
                {btcSentiment != null && (
                  <Text style={{ fontSize: 9, color: '#00BFFF', fontWeight: '700' }}>► BTC Sent. <Text style={{ fontSize: 12 }}>{btcSentiment}</Text></Text>
                )}
                {altFnG != null && (
                  <Text style={{ fontSize: 9, color: '#FF6B6B', fontWeight: '700' }}>► Crypto F&G <Text style={{ fontSize: 12 }}>{altFnG}</Text></Text>
                )}
              </View>
              )}
              {/* Data line — 4 indicadores compactos */}
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
                <Text style={{ fontSize: 8, color: C.textSec }}>VIX:<Text style={{ color: C.text, fontWeight: '700' }}>{vixVal}</Text></Text>
                <Text style={{ fontSize: 8, color: C.textSec }}>BTC:<Text style={{ color: chgColor(btcChg), fontWeight: '700' }}>{chgStr(btcChg)}</Text></Text>
                <Text style={{ fontSize: 8, color: C.textSec }}>S&P:<Text style={{ color: chgColor(spChg), fontWeight: '700' }}>{chgStr(spChg)}</Text></Text>
                <Text style={{ fontSize: 8, color: C.textSec }}>{i18n('oro_label')}:<Text style={{ color: chgColor(goldChg), fontWeight: '700' }}>{chgStr(goldChg)}</Text></Text>
              </View>
              {/* Texto educativo */}
              <Text style={[st.pulseEduText, { marginTop: 4 }]}>
                {score <= 20
                  ? i18n('pulse_edu_0_20')
                  : score <= 40
                  ? i18n('pulse_edu_21_40')
                  : score <= 60
                  ? i18n('pulse_edu_41_60')
                  : score <= 80
                  ? i18n('pulse_edu_61_80')
                  : i18n('pulse_edu_81_100')}
          </Text>
            </View>
          </View>

          {/* Variables del modelo (Modal popup) */}
          {/* Modal Variables (idéntico a PWA: AUREX FEAR & GREED 14X) */}
          <Modal visible={showPulseVars} transparent animationType="fade">
            <View style={st.modalOverlay}>
              <View style={st.pulseVarsModal}>
                <ScrollView>
                  <Text style={{ fontSize: 14, fontWeight: '700', color: C.gold, marginBottom: 4 }}>⚡ AUREX FEAR & GREED 14X™</Text>
                  <Text style={{ fontSize: 10, color: C.textSec, marginBottom: 10 }}>{i18n('pulse_indice_completo')}</Text>

                  {/* 5 zonas */}
                  <Text style={{ fontSize: 10, fontWeight: '600', color: C.text, marginBottom: 4 }}>{i18n('las_5_zonas')}</Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                    <Text style={{ fontSize: 9, color: '#C62828' }}>{i18n('zone_0_20')}</Text>
                    <Text style={{ fontSize: 9, color: '#FF6B6B' }}>{i18n('zone_21_40')}</Text>
                    <Text style={{ fontSize: 9, color: C.gold }}>{i18n('zone_41_60')}</Text>
                    <Text style={{ fontSize: 9, color: C.green }}>{i18n('zone_61_80')}</Text>
                    <Text style={{ fontSize: 9, color: '#00E676' }}>{i18n('zone_81_100')}</Text>
                  </View>

                  <Text style={{ fontSize: 10, fontWeight: '600', color: C.text, marginBottom: 6 }}>{i18n('variables_activas')}</Text>

                  {/* Header tabla */}
                  <View style={[st.pulseVarRow, { borderBottomWidth: 1, borderBottomColor: C.border2, paddingBottom: 4 }]}>
                    <Text style={{ width: 20 }}></Text>
                    <Text style={[st.pulseVarName, { color: C.textSec, fontWeight: '400' }]}>{i18n('col_variable')}</Text>
                    <Text style={[st.pulseVarSrc, { color: C.textSec }]}>{i18n('col_fuente')}</Text>
                    <Text style={[st.pulseVarPeso, { color: C.textSec }]}>{i18n('col_peso')}</Text>
                    <Text style={[st.pulseVarVal, { color: C.textSec }]}>{i18n('col_valor')}</Text>
                  </View>

                  {[
                    { dot: '#58A6FF', icon: '🪙', name: 'BTC momentum', src: 'Binance', peso: '12%', val: btcChg },
                    { dot: '#58A6FF', icon: '🪙', name: 'ETH momentum', src: 'Binance', peso: '8%', val: ethChg },
                    { dot: '#FF6B6B', icon: '📉', name: 'VIX volatilidad', src: 'Yahoo', peso: '14%', val: raw.vix?.price ?? null, isPrice: true },
                    { dot: C.green, icon: '📈', name: 'S&P500 momentum', src: 'Yahoo', peso: '8%', val: spChg },
                    { dot: C.green, icon: '⚡', name: 'ES=F S&P Futuro', src: 'Yahoo', peso: '8%', val: esChg },
                    { dot: C.green, icon: '⚡', name: 'NQ=F Nasdaq Fut', src: 'Yahoo', peso: '6%', val: nqChg },
                    { dot: C.green, icon: '⚡', name: 'YM=F Dow Futuro', src: 'Yahoo', peso: '4%', val: ymChg },
                    { dot: C.green, icon: '⚡', name: 'RTY=F Russell Fut', src: 'Yahoo', peso: '3%', val: rtyChg },
                    { dot: C.gold, icon: '🥇', name: 'Oro GC=F', src: 'Yahoo', peso: '8%', val: goldChg },
                    { dot: C.gold, icon: '⚪', name: 'Plata SI=F', src: 'Yahoo', peso: '4%', val: silverChg },
                    { dot: '#FF9800', icon: '🛢️', name: 'Petroleo CL=F', src: 'Yahoo', peso: '5%', val: oilChg },
                    { dot: '#FF9800', icon: '🔶', name: 'Cobre HG=F', src: 'Yahoo', peso: '4%', val: copperChg },
                    { dot: '#A78BFA', icon: '🏛️', name: 'Macro FED', src: 'FRED API', peso: '12%', val: macroScoreVal, special: true, isPts: true },
                    { dot: '#A78BFA', icon: '🌍', name: 'Geopolitica', src: 'GDELT', peso: '4%', val: geoScoreVal, special: true, isPts: true },
                  ].map((v, i) => (
                    <View key={i} style={st.pulseVarRow}>
                      <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: v.dot, marginRight: 4 }} />
                      <Text style={[st.pulseVarName, { color: C.text }]}>{v.name}</Text>
                      <Text style={[st.pulseVarSrc, { color: v.special ? '#A78BFA' : C.textDim }]}>{v.src}</Text>
                      <Text style={st.pulseVarPeso}>{v.peso}</Text>
                      <Text style={[st.pulseVarVal, { color: v.val != null ? (v.isPts ? C.text : v.isPrice ? C.text : (v.val >= 0 ? C.green : C.red)) : C.textDim }]}>
                        {v.val != null ? (v.isPts ? `${v.val} pts` : v.isPrice ? fmt(v.val, 1) : chgStr(v.val)) : '--'}
                      </Text>
                    </View>
                  ))}

                  <Text style={{ fontSize: 8, color: C.textDim, marginTop: 8, lineHeight: 12 }}>
                    {i18n('fallback_note')}
                  </Text>

                  {/* Build final V1: sección extra ELITE — historial + explicación profunda */}
                  {isElite && (
                    <View style={{ marginTop: 14, padding: 12, backgroundColor: `${C.gold}10`, borderRadius: 10, borderWidth: 1, borderColor: `${C.gold}40` }}>
                      <Text style={{ fontSize: 11, fontWeight: '800', color: C.gold, marginBottom: 6, letterSpacing: 0.3 }}>
                        👑 ELITE — Análisis profundo
                      </Text>
                      <Text style={{ fontSize: 10, color: C.text, lineHeight: 15, marginBottom: 8 }}>
                        Cada variable se calibra contra promedios históricos de mercado. Los pesos no son arbitrarios: reflejan el impacto promedio observado de cada indicador sobre las decisiones institucionales en los últimos 5 años.
                      </Text>
                      <Text style={{ fontSize: 10, color: C.text, lineHeight: 15, marginBottom: 8 }}>
                        VIX 14% porque históricamente anticipa correcciones con 3-5 días de margen. Macro FED 12% porque las decisiones de tasa mueven todos los activos. BTC/ETH 12%+8% para reflejar la correlación cripto-equities post-2022.
                      </Text>
                      <View style={{ marginTop: 6, padding: 8, backgroundColor: C.bg, borderRadius: 6 }}>
                        <Text style={{ fontSize: 9, color: C.textSec, fontWeight: '600' }}>📊 Gráfico histórico Pulse últimos 7 días</Text>
                        <Text style={{ fontSize: 9, color: C.textDim, marginTop: 2 }}>Disponible próximamente en este mismo bloque</Text>
                      </View>
                    </View>
                  )}
                </ScrollView>
                <TouchableOpacity style={st.entendidoBtn} onPress={() => setShowPulseVars(false)}>
                  <Text style={st.entendidoBtnText}>{i18n('entendido')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      )}

      {/* ─── 5. TABS ─── */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={st.tabsRow} contentContainerStyle={{ paddingHorizontal: 0 }}>
        {getTABS(i18n).map(tab_it => (
          <TouchableOpacity key={tab_it.key} style={[st.subTab, tab === tab_it.key && st.subTabActive]} onPress={() => setTab(tab_it.key)}>
            <Text style={[st.subTabText, tab === tab_it.key && st.subTabTextActive]}>{tab_it.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ─── 6. PAISES ─── */}
      {tab === 'acciones' && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={st.paisRow} contentContainerStyle={{ paddingHorizontal: 6, alignItems: 'center' }}>
          {getPaises(i18n).map(p => (
            <TouchableOpacity key={p.key} style={[st.paisBtn, pais === p.key && st.paisBtnActive]} onPress={() => setPais(p.key)}>
              <Text style={[st.paisText, pais === p.key && st.paisTextActive]}>{p.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* ─── 7. LISTA DE ACTIVOS ─── */}
      <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled" refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={C.gold} />}>
        {loading && !refreshing && <ActivityIndicator color={C.gold} style={{ marginTop: 20 }} />}

        {/* CHIP ORDENAR — abre modal flotante centrado */}
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 14, paddingTop: 6, paddingBottom: 2 }}>
          <TouchableOpacity
            onPress={() => setShowSortMenu(true)}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: C.card, borderWidth: 1, borderColor: C.border2, borderRadius: 7, paddingHorizontal: 10, paddingVertical: 5 }}
          >
            <Text style={{ fontSize: 10, color: C.textSec, fontWeight: '600' }}>{i18n('ordenar_short')}</Text>
            <Text style={{ fontSize: 11, color: C.text, fontWeight: '700' }}>{currentMktSortLabel}</Text>
            <Text style={{ fontSize: 10, color: C.gold, fontWeight: '800' }}>↓</Text>
          </TouchableOpacity>
        </View>

        {filteredList().map(item => {
          const p = prices[item.s];
          const isUp = (p?.change || 0) >= 0;
          const tipoRaw = getAssetType(item.s) || (tab === 'cripto' || tab === 'stable' ? 'cripto' : 'accion');
          const tipo = tipoRaw.toLowerCase();
          const isCrypto = tipo === 'cripto' || tipo === 'stable';
          const now = new Date();
          const utcH = now.getUTCHours();
          const utcDay = now.getUTCDay();
          const isWeekend = utcDay === 0 || utcDay === 6;
          const nyseOpen = utcH >= 14 && utcH < 21;
          const mktClosed = !isCrypto && (isWeekend || !nyseOpen);
          const sparkData = sparklines[item.s];
          return (
            <TouchableOpacity
              key={item.s}
              style={st.row}
              activeOpacity={0.7}
              onPress={() => setShowSearchDetail(item)}
              onLongPress={() => setActionMenu(item)}
              delayLongPress={400}
            >
              {/* Logo */}
              <AssetLogo sym={item.s} tipo={tipo} logo={item.logo} size={28} color={item.color} />

              {/* Ticker + Nombre */}
              <View style={st.rowInfo}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                  {isFavorite(item.s) && <Text style={{ fontSize: 11, color: C.gold }}>★</Text>}
                  <Text style={st.rowSym}>{item.s}</Text>
                </View>
                <Text style={st.rowName} numberOfLines={1}>{item.n}</Text>
                {isCrypto && <Text style={{ fontSize: 8, color: C.green, fontWeight: '700' }}>24/7</Text>}
              </View>

              {/* Sparkline */}
              <View style={st.rowMid}>
                {sparkData && <SparklineSVG data={sparkData} isUp={isUp} />}
              </View>

              {/* Precio + %Cambio + Dots IA + Timeframes */}
              <View style={st.rowRight}>
                <Text style={st.rowPrice}>{p ? fmtPrice(p.price) : '...'}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
                  {mktClosed && <Text style={{ fontSize: 8, color: C.gold, fontWeight: '700' }}>{i18n('ult_cierre')}</Text>}
                  {(() => {
                    const tf = getTf(item.s);
                    const chg = getChangeSync(histPrices, item.s, tf, p?.price || 0, p?.change || 0);
                    const color = chg.approx ? C.textSec : (chg.value >= 0 ? C.green : C.red);
                    const bgColor = chg.approx ? '#21262D' : (chg.value >= 0 ? C.greenBg : C.redBg);
                    return (
                      <View style={[st.chgBadge, { backgroundColor: bgColor }]}>
                        <Text style={[st.chgText, { color }]}>{p ? fmtPct(chg.value, 2) : '...'}</Text>
                      </View>
                    );
                  })()}
                </View>
                {/* Dots IA */}
                {iaSignals[item.s]?.scores && (
                  <View style={st.dotsRow}>
                    {Object.values(iaSignals[item.s].scores).slice(0, 10).map((v, i) => {
                      if (v > 0.01) return <View key={i} style={[st.dot, { backgroundColor: C.green }]} />;
                      if (v < -0.01) return <View key={i} style={[st.dot, { backgroundColor: C.red }]} />;
                      return null;
                    })}
                  </View>
                )}
                {/* Timeframes per-row */}
                <View style={st.tfRow}>
                  {TF_BUTTONS.map(t => (
                    <TouchableOpacity key={t} style={[st.tfBtn, getTf(item.s) === t && st.tfBtnActive]} onPress={() => setTf(prev => ({ ...prev, [item.s]: t }))}>
                      <Text style={[st.tfText, getTf(item.s) === t && st.tfTextActive]}>{t}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Modal editar mercados en banner */}
      <Modal visible={showMktEdit} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center', padding: 16 }}>
          <View style={{ backgroundColor: C.card, borderRadius: 14, width: '100%', maxWidth: 340, padding: 20, borderWidth: 1, borderColor: C.border2 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <Text style={{ fontSize: 15, fontWeight: '700', color: C.text }}>{i18n('mercados_en_banner')}</Text>
              <TouchableOpacity onPress={() => setShowMktEdit(false)} style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: C.border, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, color: C.text }}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={{ maxHeight: 350 }}>
              {ALL_MKT_OPTIONS.map(m => (
                <View key={m} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 0.5, borderBottomColor: C.border }}>
                  <Text style={{ fontSize: 13, color: C.text }}>{m}</Text>
                  <Switch value={mktPrefs.includes(m)} onValueChange={() => toggleMktPref(m)} trackColor={{ true: C.green, false: C.border2 }} />
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setShowMktEdit(false)} style={{ backgroundColor: C.green, borderRadius: 8, padding: 10, alignItems: 'center', marginTop: 14 }}>
              <Text style={{ fontSize: 14, fontWeight: '700', color: '#0D1117' }}>{i18n('listo_btn')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal editar futuros en banner */}
      <Modal visible={showFutEdit} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center', padding: 16 }}>
          <View style={{ backgroundColor: C.card, borderRadius: 14, width: '100%', maxWidth: 340, padding: 20, borderWidth: 1, borderColor: C.border2 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <Text style={{ fontSize: 15, fontWeight: '700', color: C.text }}>{i18n('futuros_en_banner')}</Text>
              <TouchableOpacity onPress={() => setShowFutEdit(false)} style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: C.border, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, color: C.text }}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={{ maxHeight: 350 }}>
              {(DATA.futuros || []).map(f => (
                <View key={f.s} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 0.5, borderBottomColor: C.border }}>
                  <Text style={{ fontSize: 13, color: C.text }}>{f.s} — {f.n}</Text>
                  <Switch value={selectedFuturos.includes(f.s)} onValueChange={() => setSelectedFuturos(prev =>
                    prev.includes(f.s) ? prev.filter(x => x !== f.s) : [...prev, f.s]
                  )} trackColor={{ true: C.green, false: C.border2 }} />
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setShowFutEdit(false)} style={{ backgroundColor: C.green, borderRadius: 8, padding: 10, alignItems: 'center', marginTop: 14 }}>
              <Text style={{ fontSize: 14, fontWeight: '700', color: '#0D1117' }}>{i18n('listo_btn')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal Action Menu — long press en activo (idéntico a Portfolio/Watchlist) */}
      <Modal visible={actionMenu !== null} transparent animationType="fade" onRequestClose={() => setActionMenu(null)}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setActionMenu(null)}
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.55)', justifyContent: 'center', alignItems: 'center', padding: 24 }}
        >
          <TouchableOpacity activeOpacity={1} style={{ width: '100%', maxWidth: 320, backgroundColor: C.card, borderRadius: 20, padding: 16, borderWidth: 1, borderColor: C.border2, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.35, shadowRadius: 20, elevation: 15 }}>
            {actionMenu && (
              <>
                <View style={{ alignItems: 'center', paddingVertical: 6, paddingBottom: 10, borderBottomWidth: 0.5, borderBottomColor: C.border, marginBottom: 8 }}>
                  <Text style={{ fontSize: 14, fontWeight: '800', color: C.text }}>{actionMenu.s}</Text>
                  {actionMenu.n ? <Text style={{ fontSize: 10, color: C.textSec, marginTop: 1 }}>{actionMenu.n}</Text> : null}
                </View>
                {/* Análisis IA completo (abre modal de detalle) */}
                <TouchableOpacity
                  onPress={() => { setShowSearchDetail(actionMenu); setActionMenu(null); }}
                  style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10, backgroundColor: `${C.gold}15`, borderWidth: 1, borderColor: C.gold, marginBottom: 6 }}
                >
                  <Text style={{ fontSize: 16, marginRight: 8 }}>📊</Text>
                  <Text style={{ flex: 1, fontSize: 13, fontWeight: '700', color: C.gold }}>{i18n('action_analisis_ia').replace('📊 ', '')}</Text>
                </TouchableOpacity>
                {/* Favorito (toggle) */}
                <TouchableOpacity
                  onPress={() => { toggleFavorite(actionMenu.s); setActionMenu(null); }}
                  style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10, backgroundColor: C.bg, marginBottom: 6 }}
                >
                  <Text style={{ fontSize: 15, marginRight: 8 }}>{isFavorite(actionMenu.s) ? '⭐' : '☆'}</Text>
                  <Text style={{ flex: 1, fontSize: 13, fontWeight: '600', color: C.text }}>
                    {isFavorite(actionMenu.s) ? i18n('fav_quitar') : i18n('fav_agregar')}
                  </Text>
                </TouchableOpacity>
                {/* Agregar a Portfolio */}
                <TouchableOpacity
                  onPress={() => addToPortfolioFromMercados(actionMenu)}
                  style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10, backgroundColor: C.bg, marginBottom: 6 }}
                >
                  <Text style={{ fontSize: 15, marginRight: 8 }}>💼</Text>
                  <Text style={{ flex: 1, fontSize: 13, fontWeight: '600', color: C.text }}>{i18n('agregar_a_portfolio')}</Text>
                </TouchableOpacity>
                {/* Compartir */}
                <TouchableOpacity
                  onPress={() => {
                    const p = prices[actionMenu.s];
                    const msg = `${actionMenu.s} — ${actionMenu.n || ''}\nvía AUREX — aurex.live`;
                    Share.share({ message: msg });
                    setActionMenu(null);
                  }}
                  style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10, backgroundColor: C.bg, marginBottom: 8 }}
                >
                  <Text style={{ fontSize: 15, marginRight: 8 }}>📤</Text>
                  <Text style={{ flex: 1, fontSize: 13, fontWeight: '600', color: C.text }}>{i18n('compartir')}</Text>
                </TouchableOpacity>
                {/* Cancelar */}
                <TouchableOpacity
                  onPress={() => setActionMenu(null)}
                  style={{ paddingVertical: 9, borderRadius: 10, borderWidth: 1, borderColor: C.border2, alignItems: 'center' }}
                >
                  <Text style={{ fontSize: 12, fontWeight: '600', color: C.textSec }}>{i18n('cancelar')}</Text>
                </TouchableOpacity>
              </>
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Modal Ordenar — flotante centrado (tema AUREX) */}
      <Modal visible={showSortMenu} transparent animationType="fade" onRequestClose={() => setShowSortMenu(false)}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowSortMenu(false)}
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.55)', justifyContent: 'center', alignItems: 'center', padding: 24 }}
        >
          <TouchableOpacity activeOpacity={1} style={{ width: '100%', maxWidth: 340, backgroundColor: C.card, borderRadius: 20, padding: 16, borderWidth: 1, borderColor: C.gold, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.35, shadowRadius: 20, elevation: 15 }}>
            {/* Header con ícono dorado + título */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 8, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: `${C.gold}40`, marginBottom: 10 }}>
              <Text style={{ fontSize: 18, color: C.gold }}>↕</Text>
              <Text style={{ fontSize: 15, fontWeight: '800', color: C.text, letterSpacing: 0.3 }}>{i18n('ordenar_titulo')}</Text>
            </View>
            {sortOptionsMkt.map((opt) => {
              const isActive = sortBy === opt.key;
              return (
                <TouchableOpacity
                  key={opt.key}
                  onPress={() => { setSortBy(opt.key); setShowSortMenu(false); }}
                  style={{ paddingVertical: 11, paddingLeft: 12, paddingRight: 12, flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4, borderRadius: 10, backgroundColor: isActive ? `${C.gold}20` : 'transparent', borderLeftWidth: 3, borderLeftColor: isActive ? C.gold : 'transparent' }}
                >
                  <Text style={{ fontSize: 16 }}>{opt.icon}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 13, color: C.text, fontWeight: isActive ? '800' : '600' }}>{opt.label}</Text>
                    <Text style={{ fontSize: 10, color: C.textSec, marginTop: 1 }}>{opt.hint}</Text>
                  </View>
                  {isActive && <Text style={{ fontSize: 16, color: C.gold, fontWeight: '800' }}>✓</Text>}
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity
              onPress={() => setShowSortMenu(false)}
              style={{ marginTop: 10, paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: C.gold, backgroundColor: C.bg, alignItems: 'center' }}
            >
              <Text style={{ fontSize: 13, fontWeight: '700', color: C.text }}>{i18n('cancelar')}</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Modal Aviso Legal */}
      <Modal animationType="slide" transparent={true} visible={showLegal} onRequestClose={() => setShowLegal(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center', padding: 16 }}>
          <View style={{ backgroundColor: C.card, borderRadius: 20, padding: 24, width: '92%', maxWidth: 380, borderWidth: 2, borderColor: C.gold, shadowColor: '#000', shadowOffset: { width: 0, height: 15 }, shadowOpacity: 0.55, shadowRadius: 28, elevation: 22 }}>
            <Text style={{ fontSize: 16, fontWeight: '700', color: C.text, textAlign: 'center', marginBottom: 16 }}>{i18n('legal_titulo')}</Text>
            <Text style={{ fontSize: 12, color: C.textSec, lineHeight: 18, marginBottom: 12 }}>{i18n('legal_p1')}</Text>
            <Text style={{ fontSize: 12, color: C.textSec, lineHeight: 18, marginBottom: 12 }}>{i18n('legal_p2')}</Text>
            <Text style={{ fontSize: 12, color: C.textSec, lineHeight: 18, marginBottom: 12 }}>{i18n('legal_p3')}</Text>
            <Text style={{ fontSize: 11, color: C.textDim, textAlign: 'center', marginBottom: 16 }}>{i18n('legal_copyright')}</Text>
            <TouchableOpacity onPress={() => setShowLegal(false)} style={{ alignItems: 'center', paddingVertical: 10 }}>
              <Text style={{ fontSize: 14, color: C.gold, fontWeight: '600' }}>{i18n('cerrar_btn')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

/* ─── STYLES ─── */
const makeStyles = (C) => StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },

  /* Header */
  headerRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingTop: 10, paddingBottom: 8,
    borderBottomWidth: 1, borderBottomColor: C.border,
  },
  headerTitle: { fontSize: 16, fontWeight: '500', color: C.gold, letterSpacing: 1 },
  headerSub: { fontSize: 13, color: C.textSec },
  liveWrap: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#16A34A' },
  liveText: { fontSize: 10, color: C.text, fontWeight: '600' },

  /* Search */
  searchWrap: { paddingHorizontal: 14, paddingTop: 8 },
  searchInput: {
    backgroundColor: C.card, color: C.text, borderWidth: 1, borderColor: C.border2,
    borderRadius: 10, paddingVertical: 9, paddingHorizontal: 12, fontSize: 13,
  },
  searchDropdown: { backgroundColor: C.card, borderWidth: 1, borderColor: C.border2, borderRadius: 10, marginTop: 4, padding: 6, gap: 3, zIndex: 20 },
  searchResultRow: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 7, borderRadius: 7, backgroundColor: C.bg, borderWidth: 0.5, borderColor: C.border },
  searchDetailCard: { backgroundColor: C.card, borderWidth: 1, borderColor: C.border2, borderRadius: 16, padding: 20, width: '88%', maxWidth: 360 },
  searchDetailBox: { flex: 1, backgroundColor: C.bg, borderRadius: 10, padding: 10, alignItems: 'center' },
  searchDetailLabel: { fontSize: 10, color: C.textSec, marginBottom: 4 },
  searchDetailVal: { fontSize: 14, fontWeight: '700', color: C.text },

  /* Event banner — fondo navy siempre (acento visual, separa sectores) */
  eventBanner: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14,
    paddingVertical: 8, gap: 8, backgroundColor: '#0D1017',
  },
  eventBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  eventBadgeText: { fontSize: 8, fontWeight: '700', color: '#111' },
  eventText: { fontSize: 11, color: '#E6EDF3', fontWeight: '500', width: 700 },

  /* AUREX Pulse */
  pulseWrap: {
    marginHorizontal: 14, marginVertical: 6, backgroundColor: C.card,
    borderRadius: 12, padding: 12, borderWidth: 1, borderColor: C.border2,
  },
  pulseHeaderRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  pulseTitle: { fontSize: 10, fontWeight: '700', color: C.gold, letterSpacing: 0.5 },
  pulseInfoBtn: {
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6,
    borderWidth: 1, borderColor: '#58A6FF80',
    backgroundColor: '#58A6FF18',
  },
  pulseInfoText: { fontSize: 9, color: '#2B7ED9', fontWeight: '700' },
  pulseFilterPill: {
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10,
    backgroundColor: C.chipBg, marginRight: 6,
    borderWidth: 1, borderColor: C.border2,
  },
  pulseFilterText: { fontSize: 9, fontWeight: '700', color: C.text },
  pulseScoreText: { fontSize: 15, fontWeight: '700' },
  pulseDataLine: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    marginTop: 6, gap: 4, flexWrap: 'wrap',
  },
  pulseDataLabel: { fontSize: 9, color: C.textSec },
  pulseDataSep: { fontSize: 9, color: C.textDim },
  pulseEduText: { fontSize: 9, color: C.textSec, marginTop: 6, textAlign: 'center', lineHeight: 13 },
  /* Banner Mercados / Futuros */
  mktFutBanner: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 6, gap: 6, borderBottomWidth: 1, borderBottomColor: C.border },
  mktFutBtn: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 10, backgroundColor: C.chipBg, borderWidth: 1, borderColor: C.border2 },
  mktFutBtnActive: { backgroundColor: C.gold, borderColor: C.gold },
  mktFutText: { fontSize: 11, fontWeight: '700', color: C.text },
  mktFutTextActive: { color: '#111' },
  mktSlide: { borderBottomWidth: 1, borderBottomColor: C.border, maxHeight: 58 },
  mktItem: { alignItems: 'center', paddingVertical: 5, paddingHorizontal: 8, minWidth: 62 },
  mktFlag: { fontSize: 10, fontWeight: '700', color: C.text },
  mktStatus: { fontSize: 10, fontWeight: '700', lineHeight: 16 },
  mktTime: { fontSize: 9, color: C.textSec },
  futChip: { alignItems: 'center', minWidth: 58, paddingVertical: 4, paddingHorizontal: 5, borderRightWidth: 1, borderRightColor: C.border },
  futCat: { fontSize: 8, fontWeight: '700', letterSpacing: 0.3 },
  futName: { fontSize: 9, fontWeight: '700', color: C.text },
  futPrice: { fontSize: 9, color: C.text },
  futPct: { fontSize: 9, fontWeight: '700' },

  pulseVarsBox: {
    marginTop: 8, backgroundColor: C.bg, borderRadius: 6, padding: 8,
    borderWidth: 0.5, borderColor: C.border2,
  },
  pulseVarItem: { fontSize: 9, color: C.textSec, marginBottom: 2 },
  pulseVarsTitle: { fontSize: 10, fontWeight: '700', color: C.gold, marginBottom: 6 },
  pulseVarRow: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 3, borderBottomWidth: 0.5, borderBottomColor: C.border },
  pulseVarName: { flex: 1, fontSize: 10, fontWeight: '600' },
  pulseVarSrc: { fontSize: 8, color: C.textDim, width: 40 },
  pulseVarPeso: { fontSize: 9, fontWeight: '700', color: C.textSec, width: 28, textAlign: 'right' },
  pulseVarVal: { fontSize: 10, fontWeight: '600', width: 45, textAlign: 'right' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.88)', justifyContent: 'center', alignItems: 'center', padding: 16 },
  pulseVarsModal: { backgroundColor: C.card, borderRadius: 14, padding: 20, width: '92%', maxHeight: '85%', borderWidth: 1, borderColor: C.border2 },
  entendidoBtn: { backgroundColor: C.gold, borderRadius: 8, padding: 12, alignItems: 'center', marginTop: 12 },
  entendidoBtnText: { fontSize: 14, fontWeight: '700', color: '#111' },

  /* Tabs */
  tabsRow: { borderBottomWidth: 1, borderBottomColor: C.border, maxHeight: 38, flexGrow: 0 },
  subTab: { paddingHorizontal: 12, paddingVertical: 9, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  subTabActive: { borderBottomColor: C.gold },
  subTabText: { fontSize: 10, fontWeight: '500', color: C.textSec },
  subTabTextActive: { color: C.gold },

  /* Paises */
  paisRow: { borderBottomWidth: 1, borderBottomColor: C.border, maxHeight: 34, paddingVertical: 4 },
  paisBtn: {
    paddingHorizontal: 9, paddingVertical: 3, borderRadius: 12,
    backgroundColor: C.chipBg, marginRight: 5,
    borderWidth: 1, borderColor: C.border2,
  },
  paisBtnActive: { backgroundColor: C.gold, borderColor: C.gold },
  paisText: { fontSize: 10, fontWeight: '700', color: C.text },
  paisTextActive: { color: '#111' },

  /* Asset rows */
  row: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingVertical: 10, paddingHorizontal: 16,
    borderBottomWidth: 0.5, borderBottomColor: C.border2,
  },
  logo: { width: 28, height: 28, borderRadius: 14, backgroundColor: C.card },
  rowInfo: { minWidth: 60, flexShrink: 0 },
  rowSym: { fontSize: 14, fontWeight: '600', color: C.text },
  rowName: { fontSize: 11, color: C.textSec, maxWidth: 80 },
  rowMid: { flex: 1, alignItems: 'center', justifyContent: 'center', minWidth: 64 },
  rowRight: { alignItems: 'flex-end', flexShrink: 0 },
  rowPrice: { fontSize: 13, fontWeight: '600', color: C.text },
  chgBadge: { borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2, marginTop: 2 },
  chgText: { fontSize: 11, fontWeight: '600' },
  dotsRow: { flexDirection: 'row', gap: 1, marginTop: 2 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  tfRow: { flexDirection: 'row', gap: 2, marginTop: 2 },
  tfBtn: { paddingHorizontal: 3, paddingVertical: 1, borderRadius: 3, backgroundColor: C.chipBg, borderWidth: 0.5, borderColor: C.border2 },
  tfBtnActive: { backgroundColor: C.gold, borderColor: C.gold },
  tfText: { fontSize: 9, fontWeight: '600', color: C.text },
  tfTextActive: { color: '#111' },
});
