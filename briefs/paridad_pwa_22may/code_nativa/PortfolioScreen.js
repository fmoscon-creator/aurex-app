import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  ActivityIndicator, Alert, RefreshControl, Modal, TextInput,
  Image, Share, Linking, Dimensions, KeyboardAvoidingView, Platform,
  Animated, Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../lib/supabase';
import { ALL_ASSETS } from '../lib/assets';
import AurexLogo from '../components/AurexLogo';
import AssetLogo from '../components/AssetLogo';
import LanguageButton from '../components/LanguageButton';
import BellButton from '../components/BellButton';
import AlertCreateModal from '../components/AlertCreateModal';
import PlanLimitModal from '../components/PlanLimitModal';
import UpsellBanner from '../components/UpsellBanner';
import { usePlan } from '../lib/usePlan';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Sin datos demo — todo viene de Supabase y APIs reales
import { fmt, fmtPrice, fmtPct } from '../lib/locale';
import { generateRealSignals, fetchYahooData } from '../lib/iaEngine';
import { preloadHistPrices, getChangeSync } from '../lib/prices';
import { useT, translateTipo } from '../lib/i18n';
import { useTheme } from '../lib/ThemeContext';

// Fetch precios Binance
async function fetchBinancePrices(symbols) {
  const pairs = symbols.map(s => `"${s.toUpperCase()}USDT"`).join(',');
  try {
    const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbols=[${pairs}]`);
    const data = await res.json();
    const prices = {};
    (Array.isArray(data) ? data : []).forEach(t => {
      const sym = t.symbol.replace('USDT', '');
      prices[sym] = { price: parseFloat(t.lastPrice), change24h: parseFloat(t.priceChangePercent) };
    });
    return prices;
  } catch (e) { return {}; }
}

// Logo: CoinCap para crypto, backend URL para stocks, FMP fallback
function getLogoUrl(sym, tipo, logoFromBackend) {
  const t = (tipo || '').toLowerCase();
  if (t === 'cripto' || t === 'stable') return `https://assets.coincap.io/assets/icons/${sym.toLowerCase()}@2x.png`;
  if (logoFromBackend && !logoFromBackend.startsWith('data:')) return logoFromBackend;
  return `https://financialmodelingprep.com/image-stock/${sym}.png`;
}

// Logos SVG embebidos del backend: replicar con View nativo
// ORO = circulo dorado con "Au", etc.
const SVG_LOGOS = {
  ORO: { bg: '#D4AF37', text: 'Au' },
};

function isSvgLogo(sym, logoFromBackend) {
  return SVG_LOGOS[sym] || (logoFromBackend && logoFromBackend.startsWith('data:'));
}

export default function PortfolioScreen() {
  const t = useT();
  const { theme: C } = useTheme();
  const navigation = useNavigation();
  const st = useMemo(() => makeStyles(C), [C]);
  const [showLegal, setShowLegal] = useState(false);
  const [items, setItems] = useState([]);
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [period, setPeriod] = useState({}); // { BTC: '7d', ETH: '1m', ... } — por activo
  const getPeriod = (sym) => period[sym] || '24h';
  const [headerPeriod, setHeaderPeriod] = useState('24h'); // período del header (independiente)
  const [histPrices, setHistPrices] = useState({});
  const [showPeriodDD, setShowPeriodDD] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [addForm, setAddForm] = useState({ simbolo: '', nombre: '', cantidad: '', precio_compra: '', tipo: 'Cripto' });
  const [editingId, setEditingId] = useState(null);
  const [dupeModal, setDupeModal] = useState(null); // { simbolo, existing, newQty, newPrice, avgPrice, sumQty }
  const [actionMenu, setActionMenu] = useState(null); // item actual para action menu custom
  const [saving, setSaving] = useState(false);
  const [sortBy, setSortBy] = useState('value'); // 'value' | 'pnl' | 'pnlPct' | 'ticker' | 'date'
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [detailItem, setDetailItem] = useState(null);
  // Build 8: state para mini-form crear alerta puntual
  const [alertCreateAsset, setAlertCreateAsset] = useState(null);
  const [simPct, setSimPct] = useState(0);
  const [logoErrors, setLogoErrors] = useState({});
  const [showConv, setShowConv] = useState(false);
  const [showThermoHelp, setShowThermoHelp] = useState(false);
  const [convAmount, setConvAmount] = useState('1');
  const [convFrom, setConvFrom] = useState('BTC');
  const [convTo, setConvTo] = useState('USD');
  const [iaSignals, setIaSignals] = useState({});
  const [planLimitInfo, setPlanLimitInfo] = useState({ visible: false });
  // Build 18 fix #10+#11: plan se refresca en focus + cuando app vuelve de background
  const { plan: userPlan } = usePlan();

  // Cargar portfolio via backend Railway (misma fuente que la PWA)
  // Build 18 fix #2: USER_ID dinámico via supabase.auth.getUser() + JWT en headers.
  // Antes era hardcoded '174187a7-...' (UUID Fernando) → TODOS los usuarios veían su portfolio.
  const BACKEND = 'https://aurex-app-production.up.railway.app';
  const [userId, setUserId] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user?.id) {
          setUserId(session.user.id);
          setAuthToken(session.access_token || null);
        }
      } catch (e) { console.warn('[PortfolioScreen] error leyendo sesión:', e.message); }
    })();
  }, []);
  const authHeaders = () => authToken ? { 'Authorization': `Bearer ${authToken}` } : {};
  const loadPortfolio = useCallback(async () => {
    if (!userId) return; // sin sesión todavía
    try {
      const res = await fetch(`${BACKEND}/api/portfolio/${userId}`, { headers: authHeaders() });
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setItems(data);
        setLoading(false);
        try { await AsyncStorage.setItem('aurex_port_data', JSON.stringify(data)); } catch {}
        return;
      }
    } catch (e) {
      // Fallback: cache local
      try {
        const cached = JSON.parse(await AsyncStorage.getItem('aurex_port_data'));
        if (Array.isArray(cached) && cached.length > 0) {
          setItems(cached);
          setLoading(false);
          return;
        }
      } catch {}
    }
    setItems([]);
    setLoading(false);
    // Build 18 fix bug emulador: si userId/authToken cambian (al obtenerse de supabase.auth),
    // el useCallback debe regenerarse para que el useEffect lo re-ejecute con el userId real.
  }, [userId, authToken]);

  // Cargar precios
  const loadPrices = useCallback(async (portItems) => {
    if (!portItems.length) return;
    console.log('[AUREX PORT] loadPrices called with', portItems.length, 'items');
    const cryptoSyms = portItems.filter(i => {
      const t = (i.tipo || (ALL_ASSETS.find(a => a.s === i.simbolo) || {}).t || '').toLowerCase();
      return t === 'cripto';
    }).map(i => i.simbolo);
    console.log('[AUREX PORT] crypto symbols:', cryptoSyms);
    const allPrices = {};
    if (cryptoSyms.length) {
      try {
        const bp = await fetchBinancePrices(cryptoSyms);
        console.log('[AUREX PORT] Binance prices:', Object.keys(bp).length, 'loaded');
        Object.assign(allPrices, bp);
      } catch (e) {
        console.error('[AUREX PORT] Binance FAILED:', e.message);
      }
      // Fallback: si Binance no trajo precios, pedir al backend
      const missing = cryptoSyms.filter(s => !allPrices[s]);
      if (missing.length > 0) {
        try {
          const r = await fetch('https://aurex-app-production.up.railway.app/api/crypto-prices');
          const d = await r.json();
          if (d?.prices) missing.forEach(s => { if (d.prices[s]?.price) allPrices[s] = { price: d.prices[s].price, change24h: 0 }; });
        } catch(e2) { console.error('[AUREX PORT] Backend fallback FAILED:', e2.message); }
      }
    }
    // Para no-cripto: Yahoo via Railway proxy — IDENTICO a PWA (symbol = item.simbolo directo)
    // PWA linea 772: fetch('...api/yahoo?symbol='+sym+'...') donde sym = item.simbolo
    const nonCrypto = portItems.filter(i => !allPrices[i.simbolo]);
    console.log('[AUREX PORT] Yahoo symbols:', nonCrypto.map(i => i.simbolo));
    if (nonCrypto.length) {
      await Promise.all(nonCrypto.map(async (i) => {
        try {
          const ySymbol = i.simbolo; // IDENTICO a PWA: usa simbolo directo
          console.log('[AUREX PORT] Fetching Yahoo:', ySymbol);
          const res = await fetch(`https://aurex-app-production.up.railway.app/api/yahoo?symbol=${ySymbol}&interval=1d&range=1d`);
          console.log('[AUREX PORT] Yahoo response for', ySymbol, ':', res.status);
          const d = await res.json();
          if (d.chart && d.chart.result && d.chart.result[0]) {
            const meta = d.chart.result[0].meta;
            const price = meta.regularMarketPrice || 0;
            const prevClose = meta.previousClose || meta.chartPreviousClose || price;
            const chg = prevClose > 0 ? ((price - prevClose) / prevClose * 100) : 0;
            allPrices[i.simbolo] = { price, change24h: chg };
            console.log('[AUREX PORT]', ySymbol, 'price:', price, 'chg:', chg.toFixed(2));
          }
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
      }));
    }
    console.log('[AUREX PORT] Total prices loaded:', Object.keys(allPrices).length);
    setPrices(allPrices);
  }, []);

  useEffect(() => { loadPortfolio(); }, [loadPortfolio]);

  // Cross-tab: detectar si vino un asset desde Mercados (via AsyncStorage "pending_portfolio_add")
  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem('pending_portfolio_add').then(val => {
        if (!val) return;
        try {
          const asset = JSON.parse(val);
          // Precargar el asset en el modal Agregar
          ensurePrice(asset.simbolo, asset.tipo);
          setAddForm({
            simbolo: asset.simbolo,
            nombre: asset.nombre || '',
            cantidad: '',
            precio_compra: '',
            tipo: asset.tipo || 'Cripto',
          });
          setSearchQuery(asset.simbolo + ' - ' + (asset.nombre || ''));
          setSearchResults([]);
          setShowAddModal(true);
          AsyncStorage.removeItem('pending_portfolio_add');
        } catch (e) {}
      });
    }, [])
  );
  useEffect(() => { if (items.length) loadPrices(items); }, [items, loadPrices]);

  // Senales IA: leer del backend (fuente unica — backend calcula con cron cada 5min)
  useEffect(() => {
    if (!items.length) return;
    fetch('https://aurex-app-production.up.railway.app/api/ia-signals')
      .then(r => r.json())
      .then(async data => {
        if (data.signals && data.signals.length > 0) {
          const sigs = {};
          data.signals.forEach(s => { sigs[s.simbolo] = s; });
          setIaSignals(sigs);
          try { await AsyncStorage.setItem('aurex_port_ia_cache', JSON.stringify(sigs)); } catch {}
        }
      })
      .catch(async () => {
        try {
          const cached = JSON.parse(await AsyncStorage.getItem('aurex_port_ia_cache'));
          if (cached && Object.keys(cached).length > 0) setIaSignals(cached);
        } catch {}
      });
  }, [items]);

  // Calcular totales segun periodo seleccionado
  const calcTotals = () => {
    let total = 0, totalBefore = 0;
    items.forEach(item => {
      const pr = prices[item.simbolo];
      const pNow = pr?.price || 0;
      total += pNow * item.cantidad;
      if (headerPeriod === 'buy') {
        totalBefore += (item.precio_compra || pNow) * item.cantidad;
      } else if (headerPeriod === '24h') {
        const ch24 = pr?.change24h || pr?.change || 0;
        const pBefore = ch24 !== 0 && pNow > 0 ? pNow / (1 + ch24 / 100) : pNow;
        totalBefore += pBefore * item.cantidad;
      } else {
        const perData = histPrices[headerPeriod] || {};
        const pHist = perData[item.simbolo];
        totalBefore += (pHist && pHist > 0 ? pHist : pNow) * item.cantidad;
      }
    });
    const pnl = total - totalBefore;
    const pnlPct = totalBefore > 0 ? (pnl / totalBefore) * 100 : 0;
    return { total, pnl, pnlPct };
  };

  // Cargar precios historicos — módulo centralizado con cache + retry + batches
  useEffect(() => {
    if (items.length === 0) return;
    const assets = items.map(i => ({
      sym: i.simbolo,
      tipo: i.tipo || (ALL_ASSETS.find(a => a.s === i.simbolo) || {}).t || '',
    }));
    preloadHistPrices(assets).then(all => setHistPrices(all));
  }, [items]);

  const { total, pnl, pnlPct } = calcTotals();

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPortfolio();
    setRefreshing(false);
  };

  const cycleCurrency = () => {
    const order = ['USD', 'USDT', 'BTC'];
    setCurrency(order[(order.indexOf(currency) + 1) % order.length]);
  };

  const formatTotal = () => {
    if (currency === 'USD') return 'USD ' + fmt(total);
    if (currency === 'USDT') return 'T ' + fmt(total);
    const btcP = prices['BTC']?.price;
    if (!btcP) return 'BTC ---';
    return 'BTC ' + fmt(total / btcP, 5);
  };

  // Cambio 24h del portfolio (independiente del headerPeriod)
  const calc24h = () => {
    let total = 0, totalBefore = 0;
    items.forEach(item => {
      const pr = prices[item.simbolo];
      const pNow = pr?.price || 0;
      total += pNow * item.cantidad;
      const ch24 = pr?.change24h || pr?.change || 0;
      const pBefore = ch24 !== 0 && pNow > 0 ? pNow / (1 + ch24 / 100) : pNow;
      totalBefore += pBefore * item.cantidad;
    });
    return totalBefore > 0 ? ((total - totalBefore) / totalBefore) * 100 : 0;
  };

  // Refs para animaciones del indicador "Hoy" (positivo pulsa, negativo shake)
  const indicadorScale = React.useRef(new Animated.Value(1)).current;
  const indicadorShake = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    if (items.length === 0) return;
    const pct = calc24h();
    if (pct >= 0) {
      // Pulse para positivo (más sutil)
      indicadorScale.setValue(1);
      Animated.sequence([
        Animated.timing(indicadorScale, { toValue: 1.15, duration: 300, useNativeDriver: true }),
        Animated.timing(indicadorScale, { toValue: 1.0, duration: 300, useNativeDriver: true }),
      ]).start();
    } else {
      // Shake para negativo (más sutil)
      indicadorShake.setValue(0);
      Animated.sequence([
        Animated.timing(indicadorShake, { toValue: 3, duration: 80, useNativeDriver: true }),
        Animated.timing(indicadorShake, { toValue: -3, duration: 80, useNativeDriver: true }),
        Animated.timing(indicadorShake, { toValue: 3, duration: 80, useNativeDriver: true }),
        Animated.timing(indicadorShake, { toValue: 0, duration: 80, useNativeDriver: true }),
      ]).start();
    }
  }, [items, prices]);

  // Termometro de riesgo — IDENTICO a PWA _renderThermoRisk
  const calcThermo = () => {
    const buckets = {
      ALCISTA: { val: 0, syms: [] },
      BAJISTA: { val: 0, syms: [] },
      HC:      { val: 0, syms: [] },
      SIN:     { val: 0, syms: [] },
    };
    let totVal = 0;
    items.forEach(item => {
      const p = prices[item.simbolo]?.price || item.precio_compra || 0;
      const val = parseFloat(item.cantidad) * parseFloat(p);
      totVal += val;
      const sig = iaSignals[item.simbolo];
      // Normalizar a minúscula como la PWA (backend devuelve MAYUSCULA)
      const dir = sig ? (sig.direccion || '').toLowerCase() : '';
      // PWA: alcista → ALCISTA, bajista → BAJISTA, todo lo demás → HC
      if (dir === 'alcista') { buckets.ALCISTA.val += val; buckets.ALCISTA.syms.push(item.simbolo); }
      else if (dir === 'bajista') { buckets.BAJISTA.val += val; buckets.BAJISTA.syms.push(item.simbolo); }
      else { buckets.HC.val += val; buckets.HC.syms.push(item.simbolo); }
    });
    if (totVal <= 0) return null;
    const pAlc = (buckets.ALCISTA.val / totVal) * 100;
    const pBaj = (buckets.BAJISTA.val / totVal) * 100;
    const pHC = (buckets.HC.val / totVal) * 100;
    const pSin = (buckets.SIN.val / totVal) * 100;

    // Mensajes idénticos a PWA
    let msg = '';
    if (pBaj >= 50) msg = `${t('revisa_urgente')} ${buckets.BAJISTA.syms.join(', ')} ${t('en_baja_confirmada')}`;
    else if (pBaj >= 20) msg = `${t('watch_prefix')} ${buckets.BAJISTA.syms.join(', ')} ${t('con_senal_bajista')}`;
    else if (pAlc >= 50) msg = `${t('buen_momento')} ${buckets.ALCISTA.syms.join(', ')} ${t('con_momentum_positivo')}`;
    else if (pHC >= 40) msg = `${t('espera_senal')} ${buckets.HC.syms.join(', ')}.`;
    else if (pSin >= 70) msg = t('sin_datos_hoy');
    else msg = t('cartera_mixta');

    return { pAlc, pBaj, pHC, pSin, buckets, msg };
  };

  // Mover activo arriba/abajo
  const moveItem = (idx, dir) => {
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= items.length) return;
    const newItems = [...items];
    [newItems[idx], newItems[newIdx]] = [newItems[newIdx], newItems[idx]];
    setItems(newItems);
  };

  // Eliminar activo (via Railway API que tiene permisos de escritura)
  const deleteItem = (id) => {
    Alert.alert(t('eliminar'), t('eliminar') + '?', [
      { text: t('cancelar'), style: 'cancel' },
      { text: t('eliminar'), style: 'destructive', onPress: async () => {
        if (!id.startsWith('d')) {
          try {
            await fetch(`${BACKEND}/api/portfolio/${id}`, { method: 'DELETE' });
          } catch (e) {}
        }
        setItems(prev => prev.filter(i => i.id !== id));
      }},
    ]);
  };

  // Buscar activos
  const searchAssets = (q) => {
    setSearchQuery(q);
    if (q.length < 1) { setSearchResults([]); return; }
    const upper = q.toUpperCase();
    setSearchResults(ALL_ASSETS.filter(a => a.s.toUpperCase().includes(upper) || a.n.toUpperCase().includes(upper)).slice(0, 12));
  };

  // Fetch precio para un símbolo específico (para preview al seleccionar/editar)
  const ensurePrice = async (sym, tipoRaw) => {
    if (prices[sym]) return; // ya cargado
    try {
      const tipo = (tipoRaw || '').toLowerCase();
      if (tipo === 'cripto') {
        const bp = await fetchBinancePrices([sym]);
        if (bp[sym]) setPrices(prev => ({ ...prev, [sym]: bp[sym] }));
      } else {
        const res = await fetch(`https://aurex-app-production.up.railway.app/api/yahoo?symbol=${sym}&interval=1d&range=1d`);
        const d = await res.json();
        if (d.chart?.result?.[0]?.meta) {
          const meta = d.chart.result[0].meta;
          const price = meta.regularMarketPrice || 0;
          const prevClose = meta.previousClose || meta.chartPreviousClose || price;
          const chg = prevClose > 0 ? ((price - prevClose) / prevClose * 100) : 0;
          setPrices(prev => ({ ...prev, [sym]: { price, change24h: chg } }));
        }
      }
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
  };

  const selectAsset = (a) => {
    setAddForm({ ...addForm, simbolo: a.s, nombre: a.n, tipo: a.t });
    setSearchResults([]);
    setSearchQuery(a.s + ' - ' + a.n);
    ensurePrice(a.s, a.t);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setAddForm({ simbolo: '', nombre: '', cantidad: '', precio_compra: '', tipo: 'Cripto' });
    setSearchQuery('');
    setSearchResults([]);
    setEditingId(null);
  };

  // PATCH existing item (edit mode o dedupe replace/sum)
  const patchItem = async (id, patchData) => {
    try {
      const res = await fetch(`${BACKEND}/api/portfolio/${id}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patchData),
      });
      const updated = await res.json();
      if (updated && updated.id) {
        setItems(prev => prev.map(i => i.id === id ? { ...i, ...updated } : i));
      } else {
        // fallback local si backend no responde
        setItems(prev => prev.map(i => i.id === id ? { ...i, ...patchData } : i));
      }
    } catch(e) {
      setItems(prev => prev.map(i => i.id === id ? { ...i, ...patchData } : i));
    }
  };

  const insertItem = async (data) => {
    if (!userId) { Alert.alert('Error', 'Sesión no iniciada'); return; }
    try {
      const res = await fetch(`${BACKEND}/api/portfolio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify({ user_id: userId, ...data }),
      });
      // Build 18 fix #6: manejar respuesta 403 plan_limit_reached → mostrar PlanLimitModal
      if (res.status === 403) {
        const errData = await res.json().catch(() => ({}));
        if (errData?.error === 'plan_limit_reached') {
          setPlanLimitInfo({
            visible: true,
            plan: errData.plan || 'FREE',
            limit: errData.limit,
            message: errData.message || 'Tu plan no permite agregar más activos.',
          });
          return; // NO agregar local — respeta el límite del backend
        }
      }
      const saved = await res.json();
      if (saved && saved.id) setItems(prev => [...prev, saved]);
      else setItems(prev => [...prev, { id: 'd' + Date.now(), ...data }]);
    } catch(e) {
      setItems(prev => [...prev, { id: 'd' + Date.now(), ...data }]);
    }
  };

  const saveAsset = async () => {
    // Build 25 Bug I: guard sincronico contra doble tap. Sin esto, el segundo tap entraba antes
    // que `saving` se actualizara desde el primer tap, generaba duplicado en Portfolio.
    if (saving) return;
    if (!addForm.simbolo || !addForm.cantidad || !addForm.precio_compra) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }
    setSaving(true);
    try {
      const newQty = parseFloat(addForm.cantidad);
      const newPrice = parseFloat(addForm.precio_compra);
      const data = { simbolo: addForm.simbolo, nombre: addForm.nombre, cantidad: newQty, precio_compra: newPrice, tipo: addForm.tipo };

      // Modo EDICION: PATCH directo
      if (editingId) {
        await patchItem(editingId, data);
        closeAddModal();
        return;
      }

      // Modo AGREGAR: dedupe check
      const existing = items.find(i => i.simbolo === addForm.simbolo);
      if (existing) {
        const sumQty = existing.cantidad + newQty;
        const avgPrice = ((existing.cantidad * existing.precio_compra) + (newQty * newPrice)) / sumQty;
        // Cerrar modal AGREGAR para que el modal DUPLICADO sea visible
        setShowAddModal(false);
        setDupeModal({
          simbolo: addForm.simbolo,
          existing,
          newQty,
          newPrice,
          sumQty,
          avgPrice: parseFloat(avgPrice.toFixed(4)),
        });
        return;
      }

      // Agregar nuevo
      await insertItem(data);
      closeAddModal();
    } finally {
      setSaving(false);
    }
  };

  // Action menu custom AUREX — respeta el tema claro/oscuro de la app
  const showAssetActions = (item) => {
    setActionMenu(item);
  };

  // Handlers de las opciones del action menu
  const actionAnalizarIA = (item) => {
    setActionMenu(null);
    setDetailItem(item);
    setSimPct(0);
  };
  const actionEditar = (item) => {
    setActionMenu(null);
    openEdit(item);
  };
  const actionCompartir = (item) => {
    setActionMenu(null);
    const p = prices[item.simbolo];
    const precio = p?.price || item.precio_compra || 0;
    const pnlP = item.precio_compra > 0 ? ((precio - item.precio_compra) / item.precio_compra * 100) : 0;
    const msg = `${item.simbolo} — $${fmt(precio)} · P&L: ${pnlP >= 0 ? '+' : ''}${fmt(pnlP, 2)}%\nvía AUREX — aurex.live`;
    Share.share({ message: msg });
  };
  const actionEliminar = (item) => {
    setActionMenu(null);
    deleteItem(item.id);
  };

  // Abrir modal en modo edición desde el detailItem
  const openEdit = (item) => {
    setEditingId(item.id);
    setAddForm({
      simbolo: item.simbolo,
      nombre: item.nombre || '',
      cantidad: String(item.cantidad),
      precio_compra: String(item.precio_compra),
      tipo: item.tipo || 'Cripto',
    });
    setSearchQuery(item.simbolo + ' - ' + (item.nombre || ''));
    setSearchResults([]);
    setDetailItem(null);
    setShowAddModal(true);
  };

  // LIVE pulse animation
  const pulseAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 0.3, duration: 750, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 750, useNativeDriver: true }),
      ])
    ).start();
  }, []);
  const usePulseAnim = () => pulseAnim;

  const thermo = items.length > 0 ? calcThermo() : null;
  const periods = [
    { key: '24h', label: '24 horas' }, { key: '7d', label: '7 dias' },
    { key: '1m', label: '1 mes' }, { key: '3m', label: '3 meses' },
    { key: '1y', label: '1 ano' }, { key: 'buy', label: 'Desde compra' },
  ];

  // Lista ordenada según sortBy (no muta items, solo la vista)
  const sortedItems = React.useMemo(() => {
    const copy = [...items];
    const getStats = (item) => {
      const p = prices[item.simbolo];
      const sig = iaSignals[item.simbolo];
      const cur = p?.price || item.precio_compra || 0;
      const valor = cur * item.cantidad;
      const pnlUsd = item.cantidad * (cur - (item.precio_compra || 0));
      const pnlPct = item.precio_compra > 0 ? ((cur - item.precio_compra) / item.precio_compra * 100) : 0;
      const chg24 = p?.change24h || 0;
      const dir = sig?.direccion || '';
      const prob = sig?.confianza || sig?.probPrincipal || 0;
      return { valor, pnlUsd, pnlPct, chg24, dir, prob };
    };
    const dirScore = (dir) => dir === 'ALCISTA' ? 3 : dir === 'ALTA CONV-IA' ? 2 : dir === 'BAJISTA' ? 1 : 0;
    if (sortBy === 'value') copy.sort((a, b) => getStats(b).valor - getStats(a).valor);
    else if (sortBy === 'pnl') copy.sort((a, b) => getStats(b).pnlUsd - getStats(a).pnlUsd);
    else if (sortBy === 'pnlPct') copy.sort((a, b) => getStats(b).pnlPct - getStats(a).pnlPct);
    else if (sortBy === 'today') copy.sort((a, b) => getStats(b).chg24 - getStats(a).chg24);
    else if (sortBy === 'ticker') copy.sort((a, b) => (a.simbolo || '').localeCompare(b.simbolo || ''));
    else if (sortBy === 'signal') copy.sort((a, b) => dirScore(getStats(b).dir) - dirScore(getStats(a).dir));
    else if (sortBy === 'prob') copy.sort((a, b) => getStats(b).prob - getStats(a).prob);
    // 'date' = default, mantiene orden de carga
    return copy;
  }, [items, prices, iaSignals, sortBy]);

  const sortOptions = [
    { key: 'value',  icon: '📊', label: t('sort_value'),    hint: t('sort_hint_value') },
    { key: 'today',  icon: '📈', label: t('sort_today'),    hint: t('sort_hint_today') },
    { key: 'pnl',    icon: '💰', label: t('sort_pnl'),      hint: t('sort_hint_pnl') },
    { key: 'pnlPct', icon: '💰', label: t('sort_pnl_pct'),  hint: t('sort_hint_pnl_pct') },
    { key: 'signal', icon: '🔼', label: t('sort_signal'),   hint: t('sort_hint_signal') },
    { key: 'prob',   icon: '🎯', label: t('sort_prob'),     hint: t('sort_hint_prob') },
    { key: 'ticker', icon: '🔤', label: t('sort_ticker'),   hint: t('sort_hint_ticker') },
    { key: 'date',   icon: '🕐', label: t('sort_date'),     hint: t('sort_hint_date') },
  ];
  const currentSortLabel = (sortOptions.find(o => o.key === sortBy) || sortOptions[0]).label;

  if (loading) {
    return <SafeAreaView style={[st.container, { justifyContent: 'center', alignItems: 'center' }]}><ActivityIndicator size="large" color={C.gold} /></SafeAreaView>;
  }

  return (
    <SafeAreaView style={st.container}>
      <ScrollView style={{ flex: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={C.gold} />}>

        {/* HEADER con gradiente */}
        <View style={st.header}>
          {/* Titulo */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={st.titleRow}>
              <AurexLogo size={32} />
              <Text style={st.logoText}>AUREX</Text>
              <Text style={st.titleSub}> Portfolio</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <LanguageButton />
              <TouchableOpacity onPress={() => setShowLegal(true)} style={{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: C.card, borderWidth: 1, borderColor: C.gold, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 }}>
                <Text style={{ fontSize: 14 }}>⚖️</Text>
                <Text style={{ fontSize: 9, color: C.gold, fontWeight: '800' }}>▼</Text>
              </TouchableOpacity>
              <BellButton onPress={() => navigation.navigate('MisAlertas')} />
            </View>
          </View>

          {/* Card valor total */}
          <View style={st.valueCard}>
            {/* Fila 1 */}
            <View style={st.row1}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, flexShrink: 1 }}>
                <Text style={st.labelSmall} numberOfLines={1}>{t('valor_total')}</Text>
                <TouchableOpacity onPress={cycleCurrency} style={st.goldBadge}>
                  <Text style={st.goldBadgeText}>{currency === 'USD' ? '$' : currency === 'USDT' ? 'USDT' : 'BTC'} ▼</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Text style={[st.pnlVal, { color: pnl >= 0 ? C.green : C.red }]}>{pnl >= 0 ? '+' : ''}{fmt(pnl)}</Text>
                <Text style={[st.pnlPct, { color: pnlPct >= 0 ? C.green : C.red }]}>{fmtPct(pnlPct)}</Text>
                <TouchableOpacity onPress={() => setShowPeriodDD(!showPeriodDD)} style={st.goldBadge}>
                  <Text style={st.goldBadgeText}>{headerPeriod} ▼</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Dropdown periodo — flotante absoluto */}
            {showPeriodDD && (
              <View style={st.dropdown}>
                {periods.map(p => (
                  <TouchableOpacity key={p.key} style={[st.ddItem, headerPeriod === p.key && st.ddItemActive]}
                    onPress={() => { setHeaderPeriod(p.key); setShowPeriodDD(false); }}>
                    <Text style={[st.ddText, headerPeriod === p.key && st.ddTextActive]}>
                      {p.label}{headerPeriod === p.key ? ' ✓' : ''}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Fila 2: importe grande */}
            <TouchableOpacity onPress={cycleCurrency}>
              <Text style={st.totalBig}>{formatTotal()}</Text>
            </TouchableOpacity>

            {/* Fila 3 */}
            <View style={st.row3}>
              <View style={st.activosBadge}>
                <Text style={st.activosLabel}>{t('activos_label')}</Text>
                <Text style={st.activosCount}>{items.length}</Text>
              </View>
              {/* Indicador "Hoy" — emoji + % cambio 24h del portfolio (animado) */}
              {(() => {
                const pct = calc24h();
                const isPositive = pct >= 0;
                const color = isPositive ? C.green : C.red;
                const emoji = isPositive ? '🎉' : '😟';
                const animStyle = isPositive
                  ? { transform: [{ scale: indicadorScale }] }
                  : { transform: [{ translateX: indicadorShake }] };
                return (
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Animated.View style={[{ flexDirection: 'row', alignItems: 'center', gap: 2 }, animStyle]}>
                      <Text style={{ fontSize: 11 }}>{emoji}</Text>
                      <Text style={{ fontSize: 10, fontWeight: '800', color }} numberOfLines={1}>
                        {isPositive ? '+' : ''}{pct.toFixed(1)}% {t('hoy')}
                      </Text>
                    </Animated.View>
                  </View>
                );
              })()}
              <TouchableOpacity style={st.addBtn} onPress={() => setShowAddModal(true)}>
                <Text style={st.addBtnText}>{t('agregar_activos_btn')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={st.convBtn} onPress={() => setShowConv(true)}>
                <Text style={st.convBtnText}>⇄ Conv.</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Build 22 Bug #7: UpsellBanner contextual debajo de Valor Total.
            Copy específico para Portfolio. ELITE no ve banner (UpsellBanner retorna null internamente). */}
        <UpsellBanner
          compact
          customTitle={userPlan === 'FREE'
            ? 'Activa señales IA para estos activos'
            : 'Activa análisis técnico avanzado en tu portfolio'
          }
          customSubtitle={userPlan === 'FREE' ? 'Disponible en PRO' : 'Disponible en ELITE'}
        />

        {/* TERMOMETRO DE RIESGO */}
        {thermo && (
          <View style={st.thermoWrap}>
            <View style={st.thermoHeaderRow}>
              <Text style={st.thermoTitle}>{t('termometro')}</Text>
              <TouchableOpacity style={st.thermoHelp}><Text style={st.thermoHelpText}>?</Text></TouchableOpacity>
              <Text style={st.thermoCapital}>{t('capital_senal_ia')}</Text>
              <TouchableOpacity onPress={() => setShowThermoHelp(true)} style={st.varBtn}>
                <Text style={st.varBtnText}>VAR</Text>
              </TouchableOpacity>
            </View>
            {/* Barra — flexDirection row con flex: pX para distribución automática sin overflow */}
            {(() => {
              const segs = [
                { val: thermo.pAlc, color: C.green },
                { val: thermo.pBaj, color: C.red },
                { val: thermo.pHC, color: C.gold },
                { val: thermo.pSin, color: C.textSec },
              ].filter(s => s.val > 0);
              return (
                <View style={{ height: 8, borderRadius: 6, backgroundColor: C.border, marginBottom: 6, flexDirection: 'row', overflow: 'hidden' }}>
                  {segs.map((s, i) => (
                    <React.Fragment key={i}>
                      <View style={{ flex: s.val, backgroundColor: s.color }} />
                      {i < segs.length - 1 && <View style={{ width: 1, backgroundColor: C.border }} />}
                    </React.Fragment>
                  ))}
                </View>
              );
            })()}
            {/* Leyenda con simbolos */}
            {thermo.pAlc > 0.5 && (
              <View style={st.thermoLegRow}>
                <View style={[st.thermoLegDot, { backgroundColor: C.green }]} />
                <Text style={[st.thermoLegLabel, { color: C.green }]}>{t('thermo_alcista')} {fmt(thermo.pAlc, 0)}%</Text>
                <Text style={st.thermoLegSyms}>({thermo.buckets.ALCISTA.syms.join(', ')})</Text>
              </View>
            )}
            {thermo.pBaj > 0.5 && (
              <View style={st.thermoLegRow}>
                <View style={[st.thermoLegDot, { backgroundColor: C.red }]} />
                <Text style={[st.thermoLegLabel, { color: C.red }]}>{t('thermo_bajista')} {fmt(thermo.pBaj, 0)}%</Text>
                <Text style={st.thermoLegSyms}>({thermo.buckets.BAJISTA.syms.join(', ')})</Text>
              </View>
            )}
            {thermo.pHC > 0.5 && (
              <View style={st.thermoLegRow}>
                <View style={[st.thermoLegDot, { backgroundColor: C.gold }]} />
                <Text style={[st.thermoLegLabel, { color: C.gold }]}>{t('thermo_sin_dir')} {fmt(thermo.pHC, 0)}%</Text>
                <Text style={st.thermoLegSyms}>({thermo.buckets.HC.syms.join(', ')})</Text>
              </View>
            )}
            {thermo.pSin > 0.5 && (
              <View style={st.thermoLegRow}>
                <View style={[st.thermoLegDot, { backgroundColor: C.textSec }]} />
                <Text style={[st.thermoLegLabel, { color: C.textSec }]}>{t('thermo_sin_senal')} {fmt(thermo.pSin, 0)}%</Text>
                <Text style={st.thermoLegSyms}>({thermo.buckets.SIN.syms.join(', ')})</Text>
              </View>
            )}
            <Text style={st.thermoMsg}>{thermo.msg}</Text>
          </View>
        )}

        {/* LISTA DE ACTIVOS */}
        {items.length === 0 ? (
          <View style={st.emptyWrap}>
            <Text style={st.emptyIcon}>📊</Text>
            <Text style={st.emptyTitle}>{t('portfolio_vacio')}</Text>
            <Text style={st.emptySub}>{t('portfolio_vacio_sub')}</Text>
            <TouchableOpacity style={st.addBtn} onPress={() => setShowAddModal(true)}>
              <Text style={st.addBtnText}>{t('agregar_primer_activo')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* CHIP ORDENAR — abre modal flotante centrado. Build 16 BUG A: LIVE movido aquí (estaba solapando "Portfolio" en el header). */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 14, paddingTop: 6, paddingBottom: 4 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Animated.View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: C.green, opacity: usePulseAnim() }} />
                <Text style={{ fontSize: 9, color: C.green, fontWeight: '700' }}>LIVE</Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowSortMenu(true)}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: C.card, borderWidth: 1, borderColor: C.border2, borderRadius: 7, paddingHorizontal: 10, paddingVertical: 5 }}
              >
                <Text style={{ fontSize: 10, color: C.textSec, fontWeight: '600' }}>{t('ordenar_short')}</Text>
                <Text style={{ fontSize: 11, color: C.text, fontWeight: '700' }}>{currentSortLabel}</Text>
                <Text style={{ fontSize: 10, color: C.gold, fontWeight: '800' }}>↓</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        {items.length > 0 && (
          sortedItems.map((item, idx) => {
            const p = prices[item.simbolo];
            const currentPrice = p?.price || item.precio_compra || 0;
            const ch24 = p?.change24h || 0;
            const valor = currentPrice * item.cantidad;
            const isUp = ch24 >= 0;
            const tipoRaw = item.tipo || (ALL_ASSETS.find(a => a.s === item.simbolo) || {}).t || '';
            const tipoLower = tipoRaw.toLowerCase();
            const isCrypto = tipoLower === 'cripto' || tipoLower === 'stable';
            // Cripto cotiza 24/7, nunca muestra "Ult. cierre"
            // Acciones/ETFs/etc muestran "Ult. cierre" fuera de horario
            const now = new Date();
            const utcH = now.getUTCHours();
            const utcDay = now.getUTCDay();
            const isWeekend = utcDay === 0 || utcDay === 6;
            const nyseOpen = utcH >= 14 && utcH < 21; // NYSE 9:30-16:00 ET = 14:30-21:00 UTC aprox
            const mktClosed = !isCrypto && (isWeekend || !nyseOpen);
            const sig = iaSignals[item.simbolo];
            const dir = sig ? sig.direccion : '';

            return (
              <View key={item.id} style={st.assetRow}>
                {/* Flechas reordenar */}
                <View style={st.arrowsCol}>
                  <TouchableOpacity onPress={() => moveItem(idx, -1)}>
                    <Text style={[st.arrow, idx === 0 && { color: '#333' }]}>▲</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => moveItem(idx, 1)}>
                    <Text style={[st.arrow, idx === items.length - 1 && { color: '#333' }]}>▼</Text>
                  </TouchableOpacity>
                </View>

                {/* Zona clickeable completa: logo + centro + dots + valor + chevron */}
                <TouchableOpacity
                  style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
                  activeOpacity={0.7}
                  onPress={() => { setDetailItem(item); setSimPct(0); }}
                  onLongPress={() => showAssetActions(item)}
                  delayLongPress={400}
                >
                  {/* Logo */}
                  <View style={[st.assetLogo, { backgroundColor: dir === 'ALCISTA' ? '#1A3A2A' : dir === 'BAJISTA' ? '#3A1A1A' : '#333' }]}>
                    <AssetLogo sym={item.simbolo} tipo={item.tipo || tipoRaw} logo={item.logo} size={28} color={item.color} />
                  </View>

                  {/* Centro (ticker + nombre + tipo) */}
                  <View style={st.assetCenter}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      <Text style={st.assetSym}>{item.simbolo}</Text>
                      <View style={st.typeBadge}><Text style={st.typeText}>{translateTipo(item.tipo || 'cripto')}</Text></View>
                    </View>
                    <Text style={st.assetDetail}>{item.cantidad} u. @ {fmtPrice(item.precio_compra)}</Text>
                  </View>

                  {/* Dots IA (10 variables) */}
                  {sig && sig.scores && (
                    <View style={st.dotsWrap}>
                      {['tendencia','rsi','volumen','volatilidad','correlacion','oro_petroleo','macro','earnings','macd','soporte_resist'].map((k, i) => {
                        const v = sig.scores[k] || 0;
                        if (v > 0.01) return <View key={i} style={[st.dot, { backgroundColor: C.green }]} />;
                        if (v < -0.01) return <View key={i} style={[st.dot, { backgroundColor: C.red }]} />;
                        return null;
                      })}
                    </View>
                  )}

                  {/* Valor derecha */}
                  <View style={st.assetRight}>
                    <Text style={st.assetValor}>${fmt(valor)}</Text>
                  </View>

                  {/* Chevron — indica que la fila es tocable */}
                  <Text style={{ fontSize: 18, color: C.gold, fontWeight: '700', marginLeft: 2, marginRight: -4 }}>›</Text>
                </TouchableOpacity>

                {/* Eliminar */}
                <TouchableOpacity onPress={() => deleteItem(item.id)} style={st.deleteBtn}>
                  <Text style={st.deleteBtnText}>🗑️</Text>
                </TouchableOpacity>

                {/* Fila inferior: variacion + periodo */}
                <View style={st.assetBottomRow}>
                  {/* Build 9 bug 7: botón 🔔 crear alerta puntual (uniforme con Watchlist) */}
                  <TouchableOpacity
                    onPress={() => setAlertCreateAsset({
                      simbolo: item.simbolo,
                      tipo_activo: item.tipo,
                      precio_actual: prices[item.simbolo]?.price || 0,
                    })}
                    hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                    style={{ paddingHorizontal: 6, paddingVertical: 2, marginRight: 'auto' }}
                  >
                    <Text style={{ fontSize: 16, color: C.gold }}>{`\u{1F514}`}</Text>
                  </TouchableOpacity>
                  {isCrypto && <Text style={st.cryptoBadge24}>24/7</Text>}
                  {mktClosed && !isCrypto && <Text style={st.ultCierre}>{t('ult_cierre')}</Text>}
                  {(() => {
                    const per = getPeriod(item.simbolo);
                    if (per === 'buy') {
                      const buyChg = item.precio_compra > 0 ? ((currentPrice - item.precio_compra) / item.precio_compra) * 100 : 0;
                      const buyColor = buyChg >= 0 ? C.green : C.red;
                      return <Text style={[st.assetChg, { color: buyColor }]}>{item.precio_compra > 0 ? fmtPct(buyChg) : '---'}</Text>;
                    }
                    const chg = getChangeSync(histPrices, item.simbolo, per, currentPrice, ch24);
                    const color = chg.approx ? C.textSec : (chg.value >= 0 ? C.green : C.red);
                    return <Text style={[st.assetChg, { color }]}>{fmtPct(chg.value)}</Text>;
                  })()}
                  <View style={st.periodBtns}>
                    {['24h', '7d', '1m', '3m', '1y'].map(per => (
                      <TouchableOpacity key={per} onPress={() => setPeriod(prev => ({ ...prev, [item.simbolo]: per }))} style={[st.perBtn, getPeriod(item.simbolo) === per && st.perBtnActive]}>
                        <Text style={[st.perBtnText, getPeriod(item.simbolo) === per && st.perBtnTextActive]}>{per}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            );
          })
        )}
        <View style={{ height: 20 }} />
      </ScrollView>

      {/* MODAL ACTION MENU — centrado, compacto, tema AUREX */}
      <Modal visible={actionMenu !== null} transparent animationType="fade" onRequestClose={() => setActionMenu(null)}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setActionMenu(null)}
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.55)', justifyContent: 'center', alignItems: 'center', padding: 24 }}
        >
          <TouchableOpacity activeOpacity={1} style={{ width: '100%', maxWidth: 320, backgroundColor: C.card, borderRadius: 20, padding: 16, borderWidth: 1, borderColor: C.border2, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.35, shadowRadius: 20, elevation: 15 }}>
            {actionMenu && (
              <>
                {/* Header: ticker + nombre */}
                <View style={{ alignItems: 'center', paddingVertical: 6, paddingBottom: 10, borderBottomWidth: 0.5, borderBottomColor: C.border, marginBottom: 8 }}>
                  <Text style={{ fontSize: 14, fontWeight: '800', color: C.text }}>{actionMenu.simbolo}</Text>
                  {actionMenu.nombre ? <Text style={{ fontSize: 10, color: C.textSec, marginTop: 1 }}>{actionMenu.nombre}</Text> : null}
                </View>

                {/* Botón: Análisis IA completo (destacado) */}
                <TouchableOpacity
                  onPress={() => actionAnalizarIA(actionMenu)}
                  style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10, backgroundColor: `${C.gold}15`, borderWidth: 1, borderColor: C.gold, marginBottom: 6 }}
                >
                  <Text style={{ fontSize: 16, marginRight: 8 }}>📊</Text>
                  <Text style={{ flex: 1, fontSize: 13, fontWeight: '700', color: C.gold }}>{t('action_analisis_ia').replace('📊 ', '')}</Text>
                </TouchableOpacity>

                {/* Botón: Editar */}
                <TouchableOpacity
                  onPress={() => actionEditar(actionMenu)}
                  style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10, backgroundColor: C.bg, marginBottom: 6 }}
                >
                  <Text style={{ fontSize: 15, marginRight: 8 }}>✎</Text>
                  <Text style={{ flex: 1, fontSize: 13, fontWeight: '600', color: C.text }}>{t('editar_short')}</Text>
                </TouchableOpacity>

                {/* Botón: Compartir */}
                <TouchableOpacity
                  onPress={() => actionCompartir(actionMenu)}
                  style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10, backgroundColor: C.bg, marginBottom: 6 }}
                >
                  <Text style={{ fontSize: 15, marginRight: 8 }}>📤</Text>
                  <Text style={{ flex: 1, fontSize: 13, fontWeight: '600', color: C.text }}>{t('compartir')}</Text>
                </TouchableOpacity>

                {/* Botón: Eliminar (rojo, destructivo) */}
                <TouchableOpacity
                  onPress={() => actionEliminar(actionMenu)}
                  style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10, backgroundColor: `${C.red}12`, borderWidth: 1, borderColor: `${C.red}60`, marginBottom: 8 }}
                >
                  <Text style={{ fontSize: 15, marginRight: 8 }}>🗑️</Text>
                  <Text style={{ flex: 1, fontSize: 13, fontWeight: '700', color: C.red }}>{t('eliminar')}</Text>
                </TouchableOpacity>

                {/* Cancelar (outline, compacto) */}
                <TouchableOpacity
                  onPress={() => setActionMenu(null)}
                  style={{ paddingVertical: 9, borderRadius: 10, borderWidth: 1, borderColor: C.border2, alignItems: 'center' }}
                >
                  <Text style={{ fontSize: 12, fontWeight: '600', color: C.textSec }}>{t('cancelar')}</Text>
                </TouchableOpacity>
              </>
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* MODAL ORDENAR — flotante centrado (tema AUREX) */}
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
              <Text style={{ fontSize: 15, fontWeight: '800', color: C.text, letterSpacing: 0.3 }}>{t('ordenar_titulo')}</Text>
            </View>
            {sortOptions.map((opt) => {
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
              <Text style={{ fontSize: 13, fontWeight: '700', color: C.text }}>{t('cancelar')}</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* MODAL DUPLICADO — activo ya en portfolio */}
      <Modal visible={dupeModal !== null} transparent animationType="fade">
        <View style={st.modalOverlay}>
          <View style={[st.modalCard, { maxWidth: 380, borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.35, shadowRadius: 20, elevation: 15 }]}>
            {dupeModal && (
              <>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <Text style={{ fontSize: 28 }}>⚠️</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 15, fontWeight: '800', color: C.text }}>{dupeModal.simbolo} {t('dupe_titulo_suffix')}</Text>
                    <Text style={{ fontSize: 11, color: C.textSec, marginTop: 2 }}>{t('dupe_que_hacer')}</Text>
                  </View>
                  <TouchableOpacity onPress={() => { setDupeModal(null); closeAddModal(); }}><Text style={st.modalClose}>✕</Text></TouchableOpacity>
                </View>

                {/* Tarjeta comparativa: Actual vs Nuevo */}
                <View style={{ flexDirection: 'row', gap: 8, marginTop: 14, marginBottom: 14 }}>
                  <View style={{ flex: 1, padding: 10, borderRadius: 10, backgroundColor: C.bg, borderWidth: 1, borderColor: C.border2 }}>
                    <Text style={{ fontSize: 9, fontWeight: '700', color: C.textSec, letterSpacing: 0.5, marginBottom: 6 }}>{t('dupe_actual')}</Text>
                    <Text style={{ fontSize: 11, color: C.textSec }}>{t('cantidad')}</Text>
                    <Text style={{ fontSize: 15, fontWeight: '700', color: C.text, marginBottom: 4 }}>{dupeModal.existing.cantidad}</Text>
                    <Text style={{ fontSize: 11, color: C.textSec }}>{t('precio_compra_label')}</Text>
                    <Text style={{ fontSize: 13, fontWeight: '700', color: C.text }}>${fmt(dupeModal.existing.precio_compra)}</Text>
                  </View>
                  <View style={{ flex: 1, padding: 10, borderRadius: 10, backgroundColor: C.bg, borderWidth: 1, borderColor: C.gold }}>
                    <Text style={{ fontSize: 9, fontWeight: '700', color: C.gold, letterSpacing: 0.5, marginBottom: 6 }}>{t('dupe_nuevo')}</Text>
                    <Text style={{ fontSize: 11, color: C.textSec }}>{t('cantidad')}</Text>
                    <Text style={{ fontSize: 15, fontWeight: '700', color: C.text, marginBottom: 4 }}>{dupeModal.newQty}</Text>
                    <Text style={{ fontSize: 11, color: C.textSec }}>{t('precio_compra_label')}</Text>
                    <Text style={{ fontSize: 13, fontWeight: '700', color: C.text }}>${fmt(dupeModal.newPrice)}</Text>
                  </View>
                </View>

                {/* Botón SUMAR — verde */}
                <TouchableOpacity
                  style={{ backgroundColor: C.green, borderRadius: 10, padding: 13, marginBottom: 10 }}
                  onPress={() => {
                    const d = dupeModal;
                    setDupeModal(null);
                    closeAddModal();
                    patchItem(d.existing.id, { cantidad: d.sumQty, precio_compra: d.avgPrice });
                  }}
                >
                  <Text style={{ fontSize: 14, fontWeight: '800', color: '#fff', textAlign: 'center' }}>{t('dupe_sumar')}</Text>
                  <Text style={{ fontSize: 10, color: '#fff', textAlign: 'center', marginTop: 3, opacity: 0.9 }}>
                    {t('dupe_sumar_label_total')}: {dupeModal.sumQty} {dupeModal.simbolo} · {t('dupe_sumar_label_prom')}: ${fmt(dupeModal.avgPrice)}
                  </Text>
                </TouchableOpacity>

                {/* Botón REEMPLAZAR — rojo */}
                <TouchableOpacity
                  style={{ backgroundColor: C.red, borderRadius: 10, padding: 13, marginBottom: 10 }}
                  onPress={() => {
                    const d = dupeModal;
                    setDupeModal(null);
                    closeAddModal();
                    patchItem(d.existing.id, { cantidad: d.newQty, precio_compra: d.newPrice });
                  }}
                >
                  <Text style={{ fontSize: 14, fontWeight: '800', color: '#fff', textAlign: 'center' }}>{t('dupe_reemplazar')}</Text>
                  <Text style={{ fontSize: 10, color: '#fff', textAlign: 'center', marginTop: 3, opacity: 0.9 }}>
                    {t('dupe_reemplazar_descarta')}: {dupeModal.newQty} {dupeModal.simbolo} @ ${fmt(dupeModal.newPrice)}
                  </Text>
                </TouchableOpacity>

                {/* Botón CANCELAR — outline */}
                <TouchableOpacity
                  style={{ backgroundColor: 'transparent', borderWidth: 1, borderColor: C.border2, borderRadius: 10, padding: 13 }}
                  onPress={() => { setDupeModal(null); closeAddModal(); }}
                >
                  <Text style={{ fontSize: 13, fontWeight: '600', color: C.textSec, textAlign: 'center' }}>{t('cancelar')}</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* MODAL AGREGAR — Build 22 Bug #2: refactor flex 3-zonas (header + ScrollView inputs + boton STICKY abajo).
          El boton "Guardar" vive FUERA del ScrollView para que el teclado nunca lo tape. */}
      <Modal visible={showAddModal} transparent animationType="fade">
        {/* Build 30 Bug H: revertido a estado base. AndroidManifest tiene windowSoftInputMode="adjustResize"
            que redimensiona la window al abrir teclado. Cualquier override (kbHeight + paddingBottom +
            maxHeight dinamico) duplicaba el ajuste y rompia el modal. Estilo puro del stylesheet. */}
        <View style={st.modalOverlay}>
          <View style={st.modalCard}>
            {/* ZONA 1 — Header (titulo + cerrar) */}
            <View style={st.modalHeader}>
              <Text style={st.modalTitle}>{editingId ? t('editar_activo_titulo') : t('agregar_activo')}</Text>
              <TouchableOpacity onPress={closeAddModal}>
                <Text style={st.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Buscador (solo al agregar, no al editar) — FUERA del ScrollView principal.
                Build 22.1: keyboardShouldPersistTaps="handled" para que el tap en un resultado
                no se pierda si el teclado esta abierto. */}
            {!editingId && (
              <>
                <TextInput style={st.searchInput} placeholder={t('buscar')} placeholderTextColor={C.textDim} value={searchQuery} onChangeText={searchAssets} autoCapitalize="characters" />
                {searchResults.length > 0 && (
                  <ScrollView style={st.searchResults} keyboardShouldPersistTaps="handled">
                    {searchResults.map((a, i) => (
                      <TouchableOpacity key={i} style={st.searchItem} onPress={() => selectAsset(a)}>
                        <AssetLogo sym={a.s} tipo={a.t} logo={a.logo} size={24} color={a.color} />
                        <Text style={st.searchSym}>{a.s}</Text>
                        <Text style={st.searchName} numberOfLines={1}>{a.n}</Text>
                        <View style={[st.typeBadge, { marginLeft: 'auto' }]}><Text style={st.typeText}>{a.t}</Text></View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                )}
              </>
            )}

            {addForm.simbolo ? (
              <>
                {/* ZONA 2 — Build 33 Bug H: ScrollView restaurado (contenedor real). selectedRow
                    eliminado (duplicaba la info del buscador "PBR - Petrobras"). 80pt verticales
                    ganados, contenido entra sobrado sin scroll. paddingBottom 90 = colchon al final. */}
                <ScrollView
                  style={{ marginTop: 12 }}
                  keyboardShouldPersistTaps="handled"
                  contentContainerStyle={{ paddingBottom: 90 }}
                  showsVerticalScrollIndicator={false}
                >
                  <Text style={st.fieldLabel}>{t('cantidad')}</Text>
                  <TextInput style={st.formInput} placeholder="Ej: 0.5" placeholderTextColor={C.textDim} keyboardType="decimal-pad" returnKeyType="next" value={addForm.cantidad} onChangeText={v => setAddForm({ ...addForm, cantidad: v })} />
                  <Text style={st.fieldLabel}>{t('precio_compra')} (USD)</Text>
                  <TextInput style={st.formInput} placeholder="Ej: 65000" placeholderTextColor={C.textDim} keyboardType="decimal-pad" returnKeyType="done" onSubmitEditing={Keyboard.dismiss} value={addForm.precio_compra} onChangeText={v => setAddForm({ ...addForm, precio_compra: v })} />

                  {/* Preview en vivo: precio mercado, valor al cargar, P&L inicial */}
                  {(() => {
                    const mktPrice = prices[addForm.simbolo]?.price;
                    const qty = parseFloat(addForm.cantidad) || 0;
                    const buyPrice = parseFloat(addForm.precio_compra) || 0;
                    if (!mktPrice) {
                      return (
                        <View style={{ marginTop: 12, padding: 10, backgroundColor: C.bg, borderRadius: 8, borderWidth: 1, borderColor: C.border2 }}>
                          <Text style={{ fontSize: 11, color: C.textDim, textAlign: 'center' }}>ℹ️ {t('preview_cargando')}</Text>
                        </View>
                      );
                    }
                    const currentValue = qty * mktPrice;
                    const pnl = qty > 0 && buyPrice > 0 ? qty * (mktPrice - buyPrice) : 0;
                    const pnlColor = pnl >= 0 ? C.green : C.red;
                    return (
                      <View style={{ marginTop: 12, padding: 12, backgroundColor: C.bg, borderRadius: 10, borderWidth: 1, borderColor: C.gold }}>
                        <Text style={{ fontSize: 10, fontWeight: '700', color: C.gold, letterSpacing: 0.5, marginBottom: 8 }}>ℹ️ {t('vista_previa')}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                          <Text style={{ fontSize: 11, color: C.textSec }}>{t('preview_precio_actual')}</Text>
                          <Text style={{ fontSize: 12, fontWeight: '700', color: C.text }}>${fmt(mktPrice)}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                          <Text style={{ fontSize: 11, color: C.textSec }}>{t('preview_valor_sumar')}</Text>
                          <Text style={{ fontSize: 12, fontWeight: '700', color: C.text }}>${fmt(currentValue)}</Text>
                        </View>
                        {qty > 0 && buyPrice > 0 && (
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4, paddingTop: 6, borderTopWidth: 0.5, borderTopColor: C.border }}>
                            <Text style={{ fontSize: 11, color: C.textSec }}>{t('preview_pnl_inicial')}</Text>
                            <Text style={{ fontSize: 12, fontWeight: '700', color: pnlColor }}>{pnl >= 0 ? '+' : ''}${fmt(Math.abs(pnl))}</Text>
                          </View>
                        )}
                      </View>
                    );
                  })()}
                </ScrollView>

                {/* ZONA 3 — Boton Guardar STICKY abajo, FUERA del ScrollView (siempre visible arriba del teclado) */}
                <View style={{
                  paddingTop: 12,
                  paddingBottom: Platform.OS === 'ios' ? 16 : 8,
                  borderTopWidth: 1,
                  borderTopColor: C.border,
                  backgroundColor: C.card,
                }}>
                  <TouchableOpacity
                    style={[st.saveBtn, { marginTop: 0 }]}
                    onPress={() => { Keyboard.dismiss(); saveAsset(); }}
                    disabled={saving}
                  >
                    {saving ? <ActivityIndicator color="#000" /> : <Text style={st.saveBtnText}>{editingId ? t('guardar_cambios') : t('guardar')}</Text>}
                  </TouchableOpacity>
                </View>
              </>
            ) : null}
          </View>
        </View>
      </Modal>

      {/* MODAL TERMOMETRO HELP */}
      <Modal visible={showThermoHelp} transparent animationType="fade">
        <View style={st.modalOverlay}>
          <View style={st.modalCard}>
            <View style={st.modalHeader}>
              <Text style={st.modalTitle}>{t('thermo_modal_title')}</Text>
              <TouchableOpacity onPress={() => setShowThermoHelp(false)}><Text style={st.modalClose}>✕</Text></TouchableOpacity>
            </View>
            <ScrollView>
              <Text style={{ color: C.textSec, fontSize: 12, lineHeight: 18, marginBottom: 14 }}>
                {t('thermo_modal_intro')}
              </Text>
              <View style={{ gap: 12 }}>
                <View style={st.thermoHelpItem}>
                  <View style={[st.thermoHelpBar, { backgroundColor: C.green }]} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: C.green, fontSize: 13, fontWeight: '700' }}>{t('alcista')}</Text>
                    <Text style={{ color: C.textSec, fontSize: 11, lineHeight: 16, marginTop: 2 }}>{t('thermo_alcista_desc')}</Text>
                  </View>
                </View>
                <View style={st.thermoHelpItem}>
                  <View style={[st.thermoHelpBar, { backgroundColor: C.gold }]} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: C.gold, fontSize: 13, fontWeight: '700' }}>{t('alta_conv')}</Text>
                    <Text style={{ color: C.textSec, fontSize: 11, lineHeight: 16, marginTop: 2 }}>{t('thermo_alta_conv_desc')}</Text>
                  </View>
                </View>
                <View style={st.thermoHelpItem}>
                  <View style={[st.thermoHelpBar, { backgroundColor: C.red }]} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: C.red, fontSize: 13, fontWeight: '700' }}>{t('bajista')}</Text>
                    <Text style={{ color: C.textSec, fontSize: 11, lineHeight: 16, marginTop: 2 }}>{t('thermo_bajista_desc')}</Text>
                  </View>
                </View>
                <View style={st.thermoHelpItem}>
                  <View style={[st.thermoHelpBar, { backgroundColor: C.textDim }]} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: C.textSec, fontSize: 13, fontWeight: '700' }}>{t('sin_senal')}</Text>
                    <Text style={{ color: C.textSec, fontSize: 11, lineHeight: 16, marginTop: 2 }}>{t('thermo_sin_senal_desc')}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={[st.addBtn, { marginTop: 20, alignSelf: 'stretch', alignItems: 'center' }]} onPress={() => setShowThermoHelp(false)}>
                <Text style={st.addBtnText}>{t('entendido')}</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* MODAL CONVERSOR */}
      <Modal visible={showConv} transparent animationType="fade">
        <View style={st.modalOverlay}>
          <View style={[st.modalCard, { backgroundColor: C.card, borderRadius: 20, padding: 20, borderWidth: 2, borderColor: C.gold, shadowColor: '#000', shadowOffset: { width: 0, height: 15 }, shadowOpacity: 0.55, shadowRadius: 28, elevation: 22 }]}>
            {/* Header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <Text style={{ color: C.text, fontSize: 18, fontWeight: '700' }}>{t('conversor')}</Text>
              <TouchableOpacity onPress={() => setShowConv(false)} style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: C.border, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, color: C.text }}>✕</Text>
              </TouchableOpacity>
            </View>
            {/* Monto */}
            <Text style={st.convLabel}>{t('monto')}</Text>
            <TextInput style={st.convInput} value={convAmount} onChangeText={setConvAmount} keyboardType="decimal-pad" placeholderTextColor={C.textDim} />
            {/* De / Swap / A */}
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'flex-end', marginBottom: 20 }}>
              <View style={{ flex: 1 }}>
                <Text style={st.convLabel}>{t('de_label')}</Text>
                <View style={st.convSelector}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: '#F7931A', alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ color: '#fff', fontSize: 14, fontWeight: '700' }}>₿</Text>
                    </View>
                    <View>
                      <Text style={{ color: C.text, fontSize: 14, fontWeight: '700' }}>{convFrom}</Text>
                      <Text style={{ color: C.textSec, fontSize: 10 }}>{convFrom === 'BTC' ? 'Bitcoin' : convFrom === 'ETH' ? 'Ethereum' : convFrom === 'USD' ? t('dolar_usa') : convFrom}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <TouchableOpacity onPress={() => { const tmp = convFrom; setConvFrom(convTo); setConvTo(tmp); }}
                style={{ height: 56, width: 44, backgroundColor: C.gold, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 18, color: '#000', fontWeight: '700' }}>⇄</Text>
              </TouchableOpacity>
              <View style={{ flex: 1 }}>
                <Text style={st.convLabel}>{t('a_label')}</Text>
                <View style={st.convSelector}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Text style={{ fontSize: 22 }}>🇺🇸</Text>
                    <View>
                      <Text style={{ color: C.text, fontSize: 14, fontWeight: '700' }}>{convTo}</Text>
                      <Text style={{ color: C.textSec, fontSize: 10 }}>{convTo === 'USD' ? t('dolar_usa') : convTo === 'BTC' ? 'Bitcoin' : convTo === 'ETH' ? 'Ethereum' : convTo}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            {/* Resultado */}
            <View style={st.convResultCard}>
              <Text style={st.convLabel}>{t('resultado')}</Text>
              <Text style={st.convResultVal}>
                {(() => {
                  const amt = parseFloat(convAmount) || 0;
                  const fromPrice = convFrom === 'USD' ? 1 : (prices[convFrom]?.price || 0);
                  const toPrice = convTo === 'USD' ? 1 : (prices[convTo]?.price || 0);
                  if (!fromPrice || !toPrice) return '---';
                  const usd = amt * fromPrice;
                  const result = usd / toPrice;
                  return fmt(result, convTo === 'BTC' ? 5 : 2) + ' ' + convTo;
                })()}
              </Text>
              <Text style={st.convRate}>
                {(() => {
                  const fromPrice = convFrom === 'USD' ? 1 : (prices[convFrom]?.price || 0);
                  const toPrice = convTo === 'USD' ? 1 : (prices[convTo]?.price || 0);
                  if (!fromPrice || !toPrice) return t('cargando_precios');
                  return `1 ${convFrom} = ${fmt(fromPrice / toPrice, convTo === 'BTC' ? 5 : 2)} ${convTo}`;
                })()}
              </Text>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL DETALLE ACTIVO */}
      <Modal visible={detailItem !== null} transparent animationType="fade">
        <View style={st.modalOverlay}>
          <View style={st.modalCard}>
            {detailItem && (() => {
              const p = prices[detailItem.simbolo];
              const precio = p?.price || detailItem.precio_compra || 0;
              const pnlP = detailItem.precio_compra > 0 ? ((precio - detailItem.precio_compra) / detailItem.precio_compra * 100) : 0;
              const pnlU = detailItem.cantidad * (precio - (detailItem.precio_compra || 0));
              const pColor = pnlP >= 0 ? C.green : C.red;
              const detSig = iaSignals[detailItem.simbolo];
              const dir = detSig ? detSig.direccion : '';
              const dirCol = dir === 'ALCISTA' ? C.green : dir === 'BAJISTA' ? C.red : C.gold;
              const simPrice = precio * (1 + simPct / 100);
              const simPnl = detailItem.cantidad * (simPrice - (detailItem.precio_compra || 0));
              const detSigProb = iaSignals[detailItem.simbolo];
              const prob = detSigProb ? (detSigProb.confianza || detSigProb.probPrincipal || 50) : 50;
              // 52 semanas simuladas
              const low52 = precio * 0.65;
              const high52 = precio * 1.45;
              const pct52 = Math.max(0, Math.min(100, ((precio - low52) / (high52 - low52)) * 100));
              const zone52 = pct52 <= 30 ? { text: t('zone52_bajo'), color: C.green, icon: '🟢' }
                : pct52 <= 70 ? { text: t('zone52_medio'), color: C.gold, icon: '🟡' }
                : { text: t('zone52_alto'), color: C.red, icon: '🔴' };
              // Objetivo y stop
              const objetivo = dir === 'BAJISTA' ? precio * 0.956 : precio * 1.08;
              const stop = dir === 'BAJISTA' ? precio * 1.03 : precio * 0.96;
              const updown = dir === 'BAJISTA' ? -((precio - objetivo) / precio * 100) : ((objetivo - precio) / precio * 100);
              // 5 motivos
              const motivos = [
                `Precio ${dir === 'BAJISTA' ? 'bajo' : 'subio'} ${fmtPct(p?.change24h || 0)} en 24hs - momentum ${dir === 'BAJISTA' ? 'bajista' : 'alcista'} activo con presion ${dir === 'BAJISTA' ? 'vendedora' : 'compradora'} dominante`,
                `RSI14 en ${Math.floor(30 + Math.random() * 40)} - ${dir === 'BAJISTA' ? 'momentum bajista moderado, presion vendedora activa' : 'momentum alcista, presion compradora sostenida'}`,
                'Volumen en linea con el promedio - actividad normal sin anomalias detectadas',
                `Volatilidad moderada (${(2 + Math.random() * 4).toFixed(1)}%) - rango amplio con sesgo ${dir === 'BAJISTA' ? 'bajista' : 'alcista'}`,
                `Correlacion con BTC neutral - activo operando con dinamica propia`,
              ];
              return (
                <ScrollView>
                  <View style={st.modalHeader}>
                    <Text style={st.detailLabel}>{t('detalle')}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                      <TouchableOpacity onPress={() => openEdit(detailItem)} style={{ backgroundColor: C.gold, borderRadius: 6, paddingHorizontal: 10, paddingVertical: 4 }}>
                        <Text style={{ fontSize: 11, fontWeight: '700', color: '#000' }}>✎ {t('editar_short')}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setDetailItem(null)}><Text style={st.modalClose}>✕</Text></TouchableOpacity>
                    </View>
                  </View>
                  {/* Activo + precio */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                    <View style={{ marginRight: 10 }}>
                      <AssetLogo sym={detailItem.simbolo} tipo={detailItem.tipo} logo={detailItem.logo} size={32} color={detailItem.color} />
                    </View>
                    <View>
                      <Text style={{ fontSize: 16, fontWeight: '700', color: C.text }}>{detailItem.simbolo}</Text>
                      <Text style={{ fontSize: 11, color: C.textSec }}>{detailItem.nombre}</Text>
                    </View>
                    <View style={{ marginLeft: 'auto', alignItems: 'flex-end' }}>
                      <Text style={{ fontSize: 18, fontWeight: '700', color: C.text }}>{fmtPrice(precio)}</Text>
                      <Text style={{ fontSize: 11, color: pColor }}>{pnlP >= 0 ? '+' : ''}{fmt(pnlP, 2)}% P&L</Text>
                    </View>
                  </View>
                  {/* Grid 2x3 */}
                  <View style={st.detailGrid}>
                    <View style={st.detailCell}><Text style={st.detailCellLabel}>{t('precio_compra_label')}</Text><Text style={st.detailCellVal}>{fmtPrice(detailItem.precio_compra)}</Text></View>
                    <View style={st.detailCell}><Text style={st.detailCellLabel}>{t('cantidad_label')}</Text><Text style={st.detailCellVal}>{detailItem.cantidad}</Text></View>
                    <View style={st.detailCell}><Text style={st.detailCellLabel}>P&L USD</Text><Text style={[st.detailCellVal, { color: pColor }]}>{pnlU >= 0 ? '+' : ''}${fmt(Math.abs(pnlU))}</Text></View>
                    <View style={st.detailCell}><Text style={st.detailCellLabel}>{t('entrada')}</Text><Text style={{ fontSize: 11, color: C.textSec }}>02/04/26</Text></View>
                    <View style={st.detailCell}><Text style={st.detailCellLabel}>↓ Min 52 sem.</Text><Text style={[st.detailCellVal, { color: C.red }]}>${fmt(low52)}</Text></View>
                    <View style={st.detailCell}><Text style={st.detailCellLabel}>→ Max 52 sem.</Text><Text style={[st.detailCellVal, { color: C.green }]}>${fmt(high52)}</Text></View>
                  </View>
                  {/* Botón Editar — visible y obvio justo después de cantidad/precio */}
                  {/* Build 9 bug 7: el botón "Crear alerta de precio" se sacó del TAP modal.
                      Ahora vive en cada row del listado (assetBottomRow), uniforme con Watchlist. */}
                  <TouchableOpacity onPress={() => openEdit(detailItem)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: C.gold, borderRadius: 10, paddingVertical: 12, marginBottom: 10 }}>
                    <Text style={{ fontSize: 16 }}>✎</Text>
                    <Text style={{ fontSize: 14, fontWeight: '700', color: '#000' }}>{t('editar_cantidad_precio')}</Text>
                  </TouchableOpacity>
                  {/* Barra 52 semanas */}
                  <View style={{ marginVertical: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                      <Text style={{ fontSize: 9, color: C.textDim }}>↓ Min: ${fmt(low52)}</Text>
                      <Text style={{ fontSize: 9, color: C.textSec }}>52 semanas</Text>
                      <Text style={{ fontSize: 9, color: C.textDim }}>→ Max: ${fmt(high52)}</Text>
                    </View>
                    <View style={{ height: 6, backgroundColor: C.border, borderRadius: 4 }}>
                      <View style={{ height: 6, borderRadius: 4, width: `${pct52}%`, backgroundColor: pct52 <= 30 ? C.green : pct52 <= 70 ? C.gold : C.red }} />
                    </View>
                    <View style={[st.rangeInfo, { borderLeftColor: zone52.color }]}>
                      <Text style={{ fontSize: 12 }}>{zone52.icon}</Text>
                      <View>
                        <Text style={{ fontSize: 10, fontWeight: '600', color: zone52.color }}>{fmt(pct52, 0)}% del rango anual</Text>
                        <Text style={{ fontSize: 9, color: C.textSec, marginTop: 1 }}>{zone52.text}</Text>
                      </View>
                    </View>
                  </View>
                  {/* Variacion + periodos */}
                  <Text style={{ fontSize: 13, fontWeight: '600', color: (p?.change24h || 0) >= 0 ? C.green : C.red, marginBottom: 4 }}>
                    {fmtPct(p?.change24h || 0)} (24h)
                  </Text>
                  <View style={{ flexDirection: 'row', gap: 4, marginBottom: 12 }}>
                    {['24h', '7d', '1m', '3m', '1y'].map(per => (
                      <View key={per} style={[st.perBtn, per === '24h' && st.perBtnActive]}>
                        <Text style={[st.perBtnText, per === '24h' && st.perBtnTextActive]}>{per}</Text>
                      </View>
                    ))}
                  </View>
                  {/* Senal IA con probabilidad, objetivo, stop, motivos */}
                  <View style={[st.detailSignal, { borderLeftColor: dirCol }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <Text style={{ fontSize: 10, fontWeight: '700', color: dirCol, letterSpacing: 0.5 }}>{dir.toLowerCase()}</Text>
                      <Text style={{ fontSize: 20, fontWeight: '700', color: dirCol }}>{prob}<Text style={{ fontSize: 11 }}>%</Text></Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 8, marginBottom: 10 }}>
                      <View style={st.simCell}><Text style={st.simCellLabel}>{t('objetivo')}</Text><Text style={[st.simCellVal, { color: C.green }]}>${fmt(objetivo, 4)}</Text></View>
                      <View style={st.simCell}><Text style={st.simCellLabel}>{t('stop_loss')}</Text><Text style={[st.simCellVal, { color: C.red }]}>${fmt(stop, 4)}</Text></View>
                      <View style={st.simCell}><Text style={st.simCellLabel}>{dir === 'BAJISTA' ? 'Downside' : 'Upside'}</Text><Text style={[st.simCellVal, { color: dirCol }]}>{dir === 'BAJISTA' ? '-' : '+'}{fmt(Math.abs(updown), 1)}%</Text></View>
                    </View>
                    {motivos.map((m, i) => (
                      <View key={i} style={{ flexDirection: 'row', gap: 6, marginBottom: 4 }}>
                        <Text style={{ color: dirCol, fontWeight: '700', fontSize: 11 }}>{i + 1}.</Text>
                        <Text style={{ color: C.textSec, fontSize: 11, flex: 1, lineHeight: 15 }}>{m}</Text>
                      </View>
                    ))}
                  </View>
                  {/* Simulador de escenarios */}
                  {(() => {
                    // Cálculo de impacto en portfolio total
                    const currentAssetValue = detailItem.cantidad * precio;
                    const newAssetValue = detailItem.cantidad * simPrice;
                    const newTotal = total - currentAssetValue + newAssetValue;
                    const impactoUsd = newTotal - total;
                    const impactoPct = total > 0 ? (impactoUsd / total) * 100 : 0;
                    const impactoColor = impactoUsd >= 0 ? C.green : C.red;
                    // Posición del indicador en la barra (simPct va de -50 a +50)
                    const barPct = Math.max(0, Math.min(100, (simPct + 50)));
                    return (
                      <View style={st.simCard}>
                        <Text style={st.simTitle}>{t('simulador_escenarios')}</Text>

                        {/* Controles − / valor / + */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6, marginBottom: 10 }}>
                          <TouchableOpacity onPress={() => setSimPct(Math.max(-50, simPct - 5))} style={{ width: 40, height: 40, borderRadius: 10, borderWidth: 1, borderColor: C.red, alignItems: 'center', justifyContent: 'center', backgroundColor: `${C.red}12` }}>
                            <Text style={{ color: C.red, fontSize: 22, fontWeight: '800' }}>−</Text>
                          </TouchableOpacity>
                          <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 10, color: C.textSec, fontWeight: '600' }}>{t('sim_si_precio_cambia')}</Text>
                            <Text style={{ fontSize: 22, fontWeight: '800', color: simPct > 0 ? C.green : simPct < 0 ? C.red : C.gold, minWidth: 80, textAlign: 'center' }}>
                              {simPct > 0 ? '+' : ''}{simPct}%
                            </Text>
                          </View>
                          <TouchableOpacity onPress={() => setSimPct(Math.min(50, simPct + 5))} style={{ width: 40, height: 40, borderRadius: 10, borderWidth: 1, borderColor: C.green, alignItems: 'center', justifyContent: 'center', backgroundColor: `${C.green}12` }}>
                            <Text style={{ color: C.green, fontSize: 22, fontWeight: '800' }}>+</Text>
                          </TouchableOpacity>
                        </View>

                        {/* Barra visual rojo-amarillo-verde con indicador */}
                        <View style={{ height: 10, borderRadius: 5, overflow: 'hidden', marginBottom: 2, position: 'relative' }}>
                          <View style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '33.3%', backgroundColor: C.red, opacity: 0.85 }} />
                          <View style={{ position: 'absolute', left: '33.3%', top: 0, bottom: 0, width: '33.3%', backgroundColor: C.gold, opacity: 0.85 }} />
                          <View style={{ position: 'absolute', left: '66.6%', top: 0, bottom: 0, width: '33.4%', backgroundColor: C.green, opacity: 0.85 }} />
                          {/* Indicador (circulito que se mueve) */}
                          <View style={{ position: 'absolute', left: `${barPct}%`, top: -3, marginLeft: -8, width: 16, height: 16, borderRadius: 8, backgroundColor: C.text, borderWidth: 2, borderColor: C.card }} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                          <Text style={{ fontSize: 9, color: C.textDim }}>-50%</Text>
                          <Text style={{ fontSize: 9, color: C.textDim }}>0%</Text>
                          <Text style={{ fontSize: 9, color: C.textDim }}>+50%</Text>
                        </View>

                        {/* Resultados: Nuevo precio, P&L activo */}
                        <View style={{ flexDirection: 'row', gap: 6, marginBottom: 6 }}>
                          <View style={st.simCell}><Text style={st.simCellLabel}>{t('nuevo_precio')}</Text><Text style={st.simCellVal}>${fmt(simPrice)}</Text></View>
                          <View style={st.simCell}><Text style={st.simCellLabel}>{t('sim_pnl_activo')}</Text><Text style={[st.simCellVal, { color: simPnl >= 0 ? C.green : C.red }]}>{simPnl >= 0 ? '+' : ''}${fmt(Math.abs(simPnl))}</Text></View>
                        </View>

                        {/* Impacto en portfolio total — ahora calculado real */}
                        <View style={st.simCell}>
                          <Text style={st.simCellLabel}>{t('impacto_portfolio')}</Text>
                          <Text style={[st.simCellVal, { color: impactoColor }]}>
                            {impactoUsd >= 0 ? '+' : '-'}${fmt(Math.abs(impactoUsd))} ({impactoPct >= 0 ? '+' : ''}{fmt(impactoPct, 2)}%)
                          </Text>
                        </View>
                      </View>
                    );
                  })()}
                  {/* Compartir */}
                  <View style={st.shareRow}>
                    <Text style={{ fontSize: 10, color: C.textSec, marginBottom: 8, textAlign: 'center' }}>{t('compartir')}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                      <TouchableOpacity style={st.shareBtn} onPress={() => Linking.openURL(`mailto:?subject=AUREX - ${detailItem.simbolo}&body=${encodeURIComponent(`${detailItem.simbolo} - $${fmt(precio)} - P&L: ${pnlP >= 0 ? '+' : ''}${fmt(pnlP,2)}% - aurex.live`)}`)}>
                        <Text style={{ fontSize: 26 }}>📧</Text><Text style={st.shareBtnText}>Mail</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={st.shareBtn} onPress={() => Linking.openURL(`https://wa.me/?text=${encodeURIComponent(`${detailItem.simbolo} - $${fmt(precio)} P&L: ${pnlP >= 0 ? '+' : ''}${fmt(pnlP,2)}% - aurex.live`)}`)}>
                        <Text style={{ fontSize: 26 }}>💬</Text><Text style={[st.shareBtnText, { color: '#25D366' }]}>WhatsApp</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={st.shareBtn} onPress={() => Linking.openURL(`https://t.me/share/url?url=https://aurex.live&text=${encodeURIComponent(`${detailItem.simbolo} - $${fmt(precio)}`)}`)} >
                        <Text style={{ fontSize: 26 }}>✈️</Text><Text style={[st.shareBtnText, { color: '#229ED9' }]}>Telegram</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ScrollView>
              );
            })()}
          </View>
        </View>
      </Modal>

      {/* Modal Aviso Legal */}
      <Modal animationType="slide" transparent={true} visible={showLegal} onRequestClose={() => setShowLegal(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center', padding: 16 }}>
          <View style={{ backgroundColor: C.card, borderRadius: 20, padding: 24, width: '92%', maxWidth: 380, borderWidth: 2, borderColor: C.gold, shadowColor: '#000', shadowOffset: { width: 0, height: 15 }, shadowOpacity: 0.55, shadowRadius: 28, elevation: 22 }}>
            <Text style={{ fontSize: 16, fontWeight: '700', color: C.text, textAlign: 'center', marginBottom: 16 }}>{t('legal_titulo')}</Text>
            <Text style={{ fontSize: 12, color: C.textSec, lineHeight: 18, marginBottom: 12 }}>{t('legal_p1')}</Text>
            <Text style={{ fontSize: 12, color: C.textSec, lineHeight: 18, marginBottom: 12 }}>{t('legal_p2')}</Text>
            <Text style={{ fontSize: 12, color: C.textSec, lineHeight: 18, marginBottom: 12 }}>{t('legal_p3')}</Text>
            <Text style={{ fontSize: 11, color: C.textDim, textAlign: 'center', marginBottom: 16 }}>{t('legal_copyright')}</Text>
            <TouchableOpacity onPress={() => setShowLegal(false)} style={{ alignItems: 'center', paddingVertical: 10 }}>
              <Text style={{ fontSize: 14, color: C.gold, fontWeight: '600' }}>{t('cerrar_btn')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Build 8: Mini-form crear alerta puntual de precio */}
      <AlertCreateModal
        visible={alertCreateAsset !== null}
        onClose={() => setAlertCreateAsset(null)}
        asset={alertCreateAsset}
        userId={userId}
      />
      {/* Build 18 fix #5+#6: paywall modal cuando backend rechaza por plan_limit_reached */}
      <PlanLimitModal
        visible={planLimitInfo.visible}
        plan={planLimitInfo.plan}
        limit={planLimitInfo.limit}
        message={planLimitInfo.message}
        onClose={() => setPlanLimitInfo({ visible: false })}
        onUpgrade={() => { setPlanLimitInfo({ visible: false }); navigation.navigate('Subscription'); }}
      />
    </SafeAreaView>
  );
}

const makeStyles = (C) => StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },

  // Header
  header: { paddingLeft: 14, paddingRight: 24, paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: C.border },
  titleRow: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  logoCircle: { width: 32, height: 32, borderRadius: 16, borderWidth: 1.5, borderColor: C.gold, alignItems: 'center', justifyContent: 'center' },
  logoA: { fontSize: 16, fontWeight: '700', color: C.gold },
  logoText: { fontSize: 16, fontWeight: '500', letterSpacing: 1, color: C.gold },
  titleSub: { fontSize: 13, color: C.textSec },

  // Value card
  valueCard: { backgroundColor: C.card, borderWidth: 1, borderColor: C.border2, borderRadius: 12, padding: 10, paddingHorizontal: 14 },
  row1: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4, position: 'relative', zIndex: 999 },
  labelSmall: { fontSize: 9, color: C.textSec, fontWeight: '500', letterSpacing: 0.5 },
  goldBadge: { backgroundColor: C.gold, paddingHorizontal: 7, paddingVertical: 2, borderRadius: 4 },
  goldBadgeText: { color: '#000', fontSize: 9, fontWeight: '700' },
  pnlVal: { fontSize: 11, fontWeight: '700' },
  pnlPct: { fontSize: 12, fontWeight: '800' },
  totalBig: { fontSize: 26, fontWeight: '800', color: C.text, letterSpacing: -0.5, marginBottom: 8 },
  row3: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  activosBadge: { backgroundColor: C.bg, borderWidth: 1, borderColor: C.border2, borderRadius: 6, paddingHorizontal: 9, paddingVertical: 3, alignItems: 'center' },
  activosLabel: { fontSize: 7, color: C.textSec, fontWeight: '500' },
  activosCount: { fontSize: 13, fontWeight: '800', color: C.text },
  // bestLabel/bestValue removidos 14/abril — reemplazados por indicador "Hoy" animado
  addBtn: { backgroundColor: C.gold, borderRadius: 7, paddingVertical: 7, paddingHorizontal: 12 },
  addBtnText: { color: C.bg, fontSize: 11, fontWeight: '800' },
  convBtn: { backgroundColor: '#3B82F6', borderRadius: 7, paddingVertical: 7, paddingHorizontal: 9 },
  convBtnText: { color: '#fff', fontSize: 10, fontWeight: '700' },

  // Dropdown
  dropdown: { backgroundColor: '#fff', borderWidth: 3, borderColor: '#F7D060', borderRadius: 10, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 12, elevation: 8, position: 'absolute', right: 0, top: 28, width: 160, zIndex: 999 },
  ddItem: { paddingVertical: 9, paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: '#eee' },
  ddItemActive: {},
  ddText: { fontSize: 12, color: '#222' },
  ddTextActive: { color: '#D4A017', fontWeight: '700' },

  // Termometro
  thermoWrap: { marginHorizontal: 14, marginTop: 8, marginBottom: 4, backgroundColor: C.card, borderRadius: 12, padding: 10, borderWidth: 1, borderColor: C.border2 },
  thermoHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 5 },
  thermoTitle: { fontSize: 10, color: C.text, fontWeight: '700', letterSpacing: 0.3 },
  thermoHelp: { width: 15, height: 15, borderRadius: 8, borderWidth: 1, borderColor: '#444', alignItems: 'center', justifyContent: 'center' },
  thermoHelpText: { fontSize: 9, color: C.textSec, fontWeight: '700' },
  thermoCapital: { fontSize: 8, color: C.textSec, letterSpacing: 0.5, marginLeft: 'auto' },
  thermoBar: { flexDirection: 'row', height: 8, borderRadius: 6, overflow: 'hidden', backgroundColor: C.border, marginBottom: 6 },
  thermoSeg: { height: 8, marginRight: 1, flexBasis: 0, flexShrink: 0 },
  thermoLegRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 2 },
  thermoLegDot: { width: 8, height: 8, borderRadius: 2 },
  thermoLegLabel: { fontSize: 10, fontWeight: '700' },
  thermoLegSyms: { fontSize: 9, color: C.textSec },
  thermoMsg: { fontSize: 10, color: C.textSec, lineHeight: 14, marginTop: 4 },

  // Dots IA
  dotsWrap: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end', gap: 2, minWidth: 48, maxWidth: 64 },
  dot: { width: 6, height: 6, borderRadius: 3 },

  // Estado vacio
  emptyWrap: { alignItems: 'center', paddingTop: 60, paddingHorizontal: 30 },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyTitle: { fontSize: 18, fontWeight: '600', color: C.text, marginBottom: 8 },
  emptySub: { fontSize: 13, color: C.textSec, textAlign: 'center', marginBottom: 20 },

  // Asset row
  assetRow: { paddingVertical: 10, paddingHorizontal: 12, borderBottomWidth: 0.5, borderBottomColor: C.border2, flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  arrowsCol: { gap: 1, marginRight: 2 },
  arrow: { fontSize: 11, color: C.textSec, width: 18, height: 16, textAlign: 'center' },
  assetLogo: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  assetLogoText: { fontSize: 11, fontWeight: '700', color: '#fff' },
  assetCenter: { flex: 1, minWidth: 0 },
  assetSym: { fontSize: 14, fontWeight: '700', color: C.text },
  typeBadge: { backgroundColor: C.border, paddingHorizontal: 6, paddingVertical: 1, borderRadius: 5 },
  typeText: { fontSize: 10, color: C.textSec },
  assetDetail: { fontSize: 11, color: C.textSec, marginTop: 2 },
  assetRight: { marginLeft: 'auto', alignItems: 'flex-end' },
  assetValor: { fontSize: 14, fontWeight: '700', color: C.text },
  deleteBtn: { paddingLeft: 4 },
  deleteBtnText: { fontSize: 15, color: C.textDim },

  // Fila inferior activo
  assetBottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', width: '100%', paddingLeft: 50, marginTop: 4, gap: 4 },
  ultCierre: { fontSize: 9, color: C.gold, fontWeight: '700', marginRight: 2 },
  cryptoBadge24: { fontSize: 8, color: C.green, fontWeight: '700', marginRight: 2, borderWidth: 0.5, borderColor: C.green, borderRadius: 3, paddingHorizontal: 3, paddingVertical: 0.5 },
  assetChg: { fontSize: 11, fontWeight: '600' },
  periodBtns: { flexDirection: 'row', gap: 2 },
  perBtn: { paddingHorizontal: 3, paddingVertical: 1, borderRadius: 3, backgroundColor: C.border },
  perBtnActive: { backgroundColor: C.gold },
  perBtnText: { fontSize: 9, color: C.textSec },
  perBtnTextActive: { color: C.bg },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: '#000000CC', justifyContent: 'center', alignItems: 'center', padding: 16 },
  // Build 22 Bug #2: paddingBottom: 0 + flexDirection column para que el botón Guardar STICKY de Zona 3
  // tenga su propio padding sin doble margen. maxHeight subido de 76% a 85% para más espacio vertical.
  modalCard: { backgroundColor: C.card, borderRadius: 20, width: '100%', maxWidth: 440, paddingHorizontal: 20, paddingTop: 20, paddingBottom: 0, borderWidth: 2, borderColor: C.gold, maxHeight: '85%', flexDirection: 'column', shadowColor: '#000', shadowOffset: { width: 0, height: 15 }, shadowOpacity: 0.55, shadowRadius: 28, elevation: 22 },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  modalTitle: { fontSize: 15, fontWeight: '500', color: C.text },
  modalClose: { fontSize: 20, color: C.textSec },
  // Build 23 Bug E + Build 24: marginTop 8 + marginBottom 16 para separar el campo del titulo Y del bloque siguiente
  searchInput: { backgroundColor: C.bg, color: C.text, borderWidth: 1, borderColor: C.border2, borderRadius: 10, padding: 12, fontSize: 14, marginTop: 8, marginBottom: 16 },
  searchResults: { backgroundColor: C.bg, borderRadius: 8, borderWidth: 1, borderColor: C.border2, maxHeight: 200, marginTop: 4 },
  searchItem: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 10, borderBottomWidth: 0.5, borderBottomColor: C.border },
  searchSym: { fontSize: 13, fontWeight: '700', color: C.text, width: 50 },
  searchName: { fontSize: 12, color: C.textSec, flex: 1 },
  selectedRow: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 10, backgroundColor: C.bg, borderRadius: 8 },
  selectedSym: { fontSize: 14, fontWeight: '700', color: C.gold },
  selectedName: { fontSize: 12, color: C.textSec },
  fieldLabel: { fontSize: 10, color: C.textSec, fontWeight: '500', marginBottom: 4, marginTop: 8 },
  formInput: { backgroundColor: C.bg, color: C.text, borderWidth: 1, borderColor: C.border2, borderRadius: 10, padding: 12, fontSize: 16 },
  saveBtn: { backgroundColor: C.gold, borderRadius: 10, padding: 14, alignItems: 'center', marginTop: 16 },
  saveBtnText: { color: '#000', fontSize: 14, fontWeight: '700' },

  // Logo imagen
  assetLogoImg: { width: 28, height: 28, borderRadius: 14 },

  // Detalle modal
  detailLabel: { fontSize: 12, fontWeight: '700', color: C.textDim, letterSpacing: 0.5 },
  detailGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 6 },
  detailCell: { width: '47%', backgroundColor: C.card, borderRadius: 7, padding: 8 },
  detailCellLabel: { fontSize: 9, color: C.textDim, marginBottom: 2 },
  detailCellVal: { fontSize: 13, color: C.text, fontWeight: '600' },
  detailSignal: { backgroundColor: C.card, borderRadius: 9, padding: 12, borderLeftWidth: 3, marginTop: 10 },
  simCard: { backgroundColor: C.card, borderRadius: 9, padding: 12, borderWidth: 1, borderColor: C.border, marginTop: 10 },
  simTitle: { fontSize: 10, color: C.textDim, fontWeight: '600', letterSpacing: 0.3, marginBottom: 8 },
  simCell: { flex: 1, backgroundColor: C.bg, borderRadius: 7, padding: 7 },
  simCellLabel: { fontSize: 9, color: C.textDim, marginBottom: 2 },
  simCellVal: { fontSize: 12, color: C.text, fontWeight: '600' },
  shareRow: { borderTopWidth: 1, borderTopColor: C.border, marginTop: 12, paddingTop: 12 },
  shareBtn: { alignItems: 'center', gap: 4 },
  shareBtnText: { fontSize: 10, color: C.textSec, fontWeight: '600' },

  // Conversor
  convLabel: { color: C.textSec, fontSize: 11, letterSpacing: 1, marginBottom: 6 },
  convInput: { backgroundColor: C.bg, borderWidth: 1, borderColor: C.border2, borderRadius: 12, padding: 14, color: C.text, fontSize: 22, fontWeight: '700', marginBottom: 16 },
  convSelector: { backgroundColor: C.bg, borderWidth: 1, borderColor: C.border2, borderRadius: 12, padding: 12, minHeight: 56, justifyContent: 'center' },
  convResultCard: { backgroundColor: C.bg, borderRadius: 16, padding: 24, alignItems: 'center', borderWidth: 1, borderColor: C.border2 },
  convResultVal: { color: C.gold, fontSize: 30, fontWeight: '800', marginVertical: 8 },
  convRate: { color: C.textDim, fontSize: 12 },

  // Rango 52 semanas
  rangeInfo: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 6, padding: 6, paddingHorizontal: 8, backgroundColor: C.bg, borderRadius: 6, borderLeftWidth: 3 },

  // Thermo help items
  thermoHelpItem: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  thermoHelpBar: { width: 4, height: '100%', borderRadius: 2, minHeight: 40 },

  // VAR button
  varBtn: { borderWidth: 1, borderColor: '#E6B800', borderRadius: 4, paddingHorizontal: 5 },
  varBtnText: { fontSize: 9, color: '#E6B800', fontWeight: '700', letterSpacing: 0.5 },
});
