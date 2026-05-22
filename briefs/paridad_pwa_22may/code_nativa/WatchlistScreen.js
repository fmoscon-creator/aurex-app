import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,
  ActivityIndicator, RefreshControl, Modal, TextInput, Alert,
  Linking, Share,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { supabase } from '../lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AurexLogo from '../components/AurexLogo';
import AssetLogo from '../components/AssetLogo';
import BellButton from '../components/BellButton';
import AlertCreateModal from '../components/AlertCreateModal';
import PlanLimitModal from '../components/PlanLimitModal';
import { usePlan } from '../lib/usePlan';
import { useNavigation } from '@react-navigation/native';
import { ALL_ASSETS } from '../lib/assets';
import { preloadHistPrices, getChangeSync } from '../lib/prices';
import { useT, translateTipo } from '../lib/i18n';

// ── Colores (idénticos a Portfolio/Mercados/IA) ──
import { useTheme } from '../lib/ThemeContext';

// C global solo para arrays/helpers de top-level que se ejecutan al cargar el módulo
// (los componentes usan useTheme() que es reactivo al modo claro/oscuro)
const C = {
  bg: '#0D1117', card: '#161B22', border: '#21262D', border2: '#30363D',
  gold: '#D4A017', text: '#E6EDF3', textSec: '#8B949E', textDim: '#555',
  green: '#3FB950', red: '#F85149', greenBg: '#1A3A2A', redBg: '#3A1A1A',
};

const LIST_COLORS = ['#D4A017','#3B82F6','#EC4899','#8B5CF6','#EF4444','#10B981','#F59E0B','#6366F1'];

const VAR_KEYS = ['tendencia','rsi','volumen','volatilidad','correlacion','oro_petroleo','macro','earnings','macd','soporte_resist'];
const VAR_DEFS = [
  { k: 'tendencia', label: 'Tendencia 24h', peso: 'Alta', color: C.green },
  { k: 'rsi', label: 'RSI14 Real', peso: 'Alta', color: C.green },
  { k: 'volumen', label: 'Volumen Real', peso: 'Alta', color: C.green },
  { k: 'volatilidad', label: 'Volatilidad', peso: 'Media', color: C.gold },
  { k: 'correlacion', label: 'Correlacion BTC/SPY', peso: 'Media', color: C.gold },
  { k: 'oro_petroleo', label: 'Oro / Petroleo', peso: 'Media', color: C.gold },
  { k: 'macro', label: 'Macro FED', peso: 'Media', color: C.gold },
  { k: 'earnings', label: 'Earnings', peso: 'Media', color: C.gold },
  { k: 'macd', label: 'MACD (12/26)', peso: 'Alta', color: C.green },
  { k: 'soporte_resist', label: 'Soporte / Resist. 30d', peso: 'Alta', color: C.green },
];

function fmt(v, dec = 2) {
  if (v == null || isNaN(v)) return '---';
  return v.toLocaleString('es-AR', { minimumFractionDigits: dec, maximumFractionDigits: dec });
}
function fmtPct(v) {
  if (v == null || isNaN(v)) return '---';
  return `${v >= 0 ? '+' : ''}${fmt(v, 2)}%`;
}

const dirColor = (d) => d === 'ALCISTA' ? C.green : d === 'BAJISTA' ? C.red : C.gold;
const dirBg = (d) => d === 'ALCISTA' ? C.greenBg : d === 'BAJISTA' ? C.redBg : `${C.gold}20`;
const dirIcon = (d) => d === 'ALTA CONV-IA' ? '⚡' : d === 'ALCISTA' ? '📈' : '📉';

const getLogoUrl = (sym, tipo) => {
  const t = (tipo || '').toLowerCase();
  if (t === 'cripto' || t === 'stable') return `https://assets.coincap.io/assets/icons/${sym.toLowerCase()}@2x.png`;
  return `https://financialmodelingprep.com/image-stock/${sym}.png`;
};

// ── Componente Comparador ──
function ComparadorModal({ compareItems, prices, findAsset, getDir, getProb, getSig, renderLogo, onClose, st }) {
  const t = useT();
  const { theme: C } = useTheme();
  const insets = useSafeAreaInsets();
  const varDefsT = useMemo(() => [
    { k: 'tendencia', label: t('v_tendencia_name'), peso: t('peso_alta'), color: C.green },
    { k: 'rsi', label: t('v_rsi_name'), peso: t('peso_alta'), color: C.green },
    { k: 'volumen', label: t('v_volumen_name'), peso: t('peso_alta'), color: C.green },
    { k: 'volatilidad', label: t('v_volat_name'), peso: t('peso_media'), color: C.gold },
    { k: 'correlacion', label: t('v_corr_name'), peso: t('peso_media'), color: C.gold },
    { k: 'oro_petroleo', label: t('v_oro_name'), peso: t('peso_media'), color: C.gold },
    { k: 'macro', label: t('v_macro_name'), peso: t('peso_media'), color: C.gold },
    { k: 'earnings', label: t('v_earnings_name'), peso: t('peso_media'), color: C.gold },
    { k: 'macd', label: t('v_macd_name'), peso: t('peso_alta'), color: C.green },
    { k: 'soporte_resist', label: t('v_sr_name'), peso: t('peso_alta'), color: C.green },
  ], [t, C]);
  const [period, setPeriod] = useState('24h');
  const [histPrices, setHistPrices] = useState({}); // { ticker: { '24h': change, '7d': change, ... } }
  const BACKEND = 'https://aurex-app-production.up.railway.app';

  // Cargar datos históricos — módulo centralizado con cache + retry
  useEffect(() => {
    if (compareItems.length === 0) return;
    const assets = compareItems.map(ticker => ({
      sym: ticker,
      tipo: findAsset(ticker)?.t || '',
    }));
    preloadHistPrices(assets).then(all => setHistPrices(all));
  }, [compareItems]);

  const getChange = (ticker) => {
    const p = prices[ticker];
    const chg = getChangeSync(histPrices, ticker, period, p?.price || 0, p?.change || 0);
    return chg.value;
  };

  // Determinar mejor performer por período seleccionado
  const changes = compareItems.map(t => ({ ticker: t, change: getChange(t), prob: getProb(t) }));
  const best = changes.reduce((a, b) => a.change > b.change ? a : b, changes[0]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14, paddingTop: 14 + insets.top, borderBottomWidth: 1, borderBottomColor: C.border }}>
          <Text style={{ fontSize: 15, fontWeight: '700', color: C.gold }}>⚖️ {t('comparador_aurex')}</Text>
          <TouchableOpacity onPress={onClose}>
            <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: C.border, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 16, color: C.text }}>✕</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Period buttons */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 6, paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: C.border }}>
          {['24h','7d','1m','3m','1y'].map(p => (
            <TouchableOpacity key={p} onPress={() => setPeriod(p)} style={{ paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, backgroundColor: period === p ? C.gold : C.border }}>
              <Text style={{ fontSize: 11, fontWeight: '700', color: period === p ? '#000' : C.textSec }}>{p}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 12 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>
              {/* Header columnas con logos */}
              <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: C.border, paddingBottom: 10, marginBottom: 8 }}>
                <View style={{ width: 100 }} />
                {compareItems.map(ticker => {
                  const asset = findAsset(ticker);
                  const isBest = best && best.ticker === ticker;
                  const tipoNorm = (asset?.t || '').toLowerCase();
                  const isCrypto = tipoNorm === 'cripto' || tipoNorm === 'stable';
                  const logoUrl = isCrypto
                    ? `https://assets.coincap.io/assets/icons/${ticker.toLowerCase()}@2x.png`
                    : (asset?.logo || `https://financialmodelingprep.com/image-stock/${ticker}.png`);
                  return (
                    <View key={ticker} style={{ width: 120, alignItems: 'center' }}>
                      {/* Marco dorado si es el mejor */}
                      <View style={isBest ? { borderWidth: 2, borderColor: C.gold, borderRadius: 22, padding: 2 } : {}}>
                        <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: getDir(ticker) === 'ALCISTA' ? C.greenBg : getDir(ticker) === 'BAJISTA' ? C.redBg : '#333', alignItems: 'center', justifyContent: 'center' }}>
                          {logoUrl ? (
                            <Image source={{ uri: logoUrl }} style={{ width: 28, height: 28, borderRadius: 14 }} />
                          ) : (
                            <Text style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}>{ticker.slice(0, 2)}</Text>
                          )}
                        </View>
                      </View>
                      <Text style={{ fontSize: 14, fontWeight: '800', color: C.text, marginTop: 4 }}>{ticker}</Text>
                      <Text style={{ fontSize: 9, color: C.textSec }}>{asset?.n}</Text>
                      {isBest && (
                        <View style={{ backgroundColor: `${C.gold}30`, borderWidth: 1, borderColor: C.gold, borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2, marginTop: 4 }}>
                          <Text style={{ fontSize: 7, fontWeight: '800', color: C.gold }}>⭐ {t('mejor_performance')}</Text>
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>

              {/* Filas de datos */}
              {[
                { label: t('senal_ia_row'), render: (tk) => { const d = getDir(tk); return { text: d, color: dirColor(d) }; }},
                { label: t('probabilidad_row'), render: (tk) => { const p = getProb(tk); const d = getDir(tk); return { text: p + '%', color: dirColor(d) }; }},
                { label: t('precio_row'), render: (tk) => { const p = prices[tk]; return { text: p ? '$' + fmt(p.price) : '---', color: C.text }; }},
                { label: `${t('cambio_row')} ${period}`, render: (tk) => { const ch = getChange(tk); return { text: fmtPct(ch), color: ch >= 0 ? C.green : C.red }; }},
                { label: t('objetivo_row'), render: (tk) => { const p = prices[tk]; const d = getDir(tk); return { text: p ? '$' + fmt(p.price * (d === 'BAJISTA' ? 0.95 : 1.08)) : '---', color: C.green }; }},
                { label: t('stop_row'), render: (tk) => { const p = prices[tk]; const d = getDir(tk); return { text: p ? '$' + fmt(p.price * (d === 'BAJISTA' ? 1.03 : 0.96)) : '---', color: C.red }; }},
              ].map((row, ri) => (
                <View key={ri} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 0.5, borderBottomColor: C.border }}>
                  <Text style={{ width: 100, fontSize: 10, fontWeight: '600', color: C.textSec }}>{row.label}</Text>
                  {compareItems.map(ticker => {
                    const r = row.render(ticker);
                    const isBest = best && best.ticker === ticker;
                    return (
                      <View key={ticker} style={{ width: 120, alignItems: 'center' }}>
                        <Text style={{ fontSize: 13, fontWeight: isBest ? '800' : '700', color: r.color }}>{r.text}</Text>
                      </View>
                    );
                  })}
                </View>
              ))}

              {/* Variables IA */}
              <Text style={{ fontSize: 11, fontWeight: '700', color: C.textSec, marginTop: 14, marginBottom: 8 }}>{t('variables_ia_10')}</Text>
              {varDefsT.map((v, vi) => (
                <View key={vi} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 4, borderBottomWidth: 0.5, borderBottomColor: `${C.border}80` }}>
                  <Text style={{ width: 100, fontSize: 9, color: C.textSec }}>{v.label}</Text>
                  {compareItems.map(ticker => {
                    const sig = getSig(ticker);
                    const score = sig?.scores?.[v.k] || 0;
                    const vColor = score > 0.01 ? C.green : score < -0.01 ? C.red : C.textDim;
                    const vIcon = score > 0.01 ? '→' : score < -0.01 ? '↓' : '—';
                    return (
                      <View key={ticker} style={{ width: 120, alignItems: 'center' }}>
                        <Text style={{ fontSize: 12, fontWeight: '700', color: vColor }}>{vIcon}</Text>
                      </View>
                    );
                  })}
                </View>
              ))}

              {/* Resumen */}
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, marginTop: 4 }}>
                <Text style={{ width: 100, fontSize: 10, fontWeight: '700', color: C.textSec }}>{t('resumen')}</Text>
                {compareItems.map(ticker => {
                  const sig = getSig(ticker);
                  const alc = sig?.scores ? VAR_KEYS.filter(k => (sig.scores[k] || 0) > 0.01).length : 0;
                  const baj = sig?.scores ? VAR_KEYS.filter(k => (sig.scores[k] || 0) < -0.01).length : 0;
                  return (
                    <View key={ticker} style={{ width: 120, alignItems: 'center' }}>
                      <Text style={{ fontSize: 11 }}>
                        <Text style={{ color: C.green, fontWeight: '700' }}>→{alc}</Text>
                        <Text style={{ color: C.textDim }}> · </Text>
                        <Text style={{ color: C.red, fontWeight: '700' }}>↓{baj}</Text>
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </ScrollView>

          {/* Compartir */}
          <TouchableOpacity
            style={{ backgroundColor: C.border, borderRadius: 10, padding: 12, alignItems: 'center', marginTop: 16 }}
            onPress={() => {
              let msg = `⚖️ AUREX — Comparador (${period})\n━━━━━━━━━━━━━━━━\n`;
              compareItems.forEach(t => {
                const d = getDir(t); const p = getProb(t); const pr = prices[t];
                const isBest = best && best.ticker === t;
                msg += `${isBest ? '⭐ ' : ''}${dirIcon(d)} ${t} — ${d} ${p}%${pr ? ` — $${fmt(pr.price)} (${fmtPct(pr.change)})` : ''}\n`;
              });
              msg += `━━━━━━━━━━━━━━━━\n⭐ Mejor: ${best?.ticker}\nAUREX IA | aurex.live`;
              Share.share({ message: msg });
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: '600', color: C.text }}>📤 {t('compartir_comparacion')}</Text>
          </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
  );
}

export default function WatchlistScreen() {
  const t = useT();
  const { theme: C } = useTheme();
  const navigation = useNavigation();
  const st = useMemo(() => makeStyles(C), [C]);
  const [lists, setLists] = useState([]);
  const [items, setItems] = useState({});
  const [prices, setPrices] = useState({});
  const [iaSignals, setIaSignals] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [logoErrors, setLogoErrors] = useState({});
  const [wlPeriod, setWlPeriod] = useState({});
  const getWlPeriod = (sym) => wlPeriod[sym] || '24h';
  const [wlHistPrices, setWlHistPrices] = useState({}); // { '7d': { BTC: precio, ... }, ... }

  // Modals
  const [showCreate, setShowCreate] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showLegal, setShowLegal] = useState(false);
  const [expanded, setExpanded] = useState(null); // ticker expandido (panel IA)
  // Build 8: state para mini-form crear alerta puntual
  const [alertCreateAsset, setAlertCreateAsset] = useState(null);
  const [shareModal, setShareModal] = useState(null);
  const [shareListModal, setShareListModal] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [compareItems, setCompareItems] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const [sortBy, setSortBy] = useState('default');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [actionMenu, setActionMenu] = useState(null); // item del long-press

  // Create list form
  const [newName, setNewName] = useState('');
  const [newColor, setNewColor] = useState(LIST_COLORS[0]);
  const [newPrimary, setNewPrimary] = useState(false);

  // Search
  const [searchQ, setSearchQ] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // ── Helpers ──
  const findAsset = (ticker) => ALL_ASSETS.find(a => a.s === ticker);
  const getSig = (sym) => iaSignals[sym] || null;
  const getDir = (sym) => {
    const s = getSig(sym);
    return s ? (s.direccion || 'NEUTRAL') : 'NEUTRAL';
  };
  const getProb = (sym) => {
    const s = getSig(sym);
    return s ? (s.confianza || s.probPrincipal || s.prob_principal || 50) : 50;
  };

  // Market open check
  const isMktOpen = () => {
    const now = new Date();
    const h = now.getUTCHours();
    const d = now.getUTCDay();
    return d > 0 && d < 6 && h >= 14 && h < 21;
  };

  // ── Load IA Signals ──
  const loadSignals = useCallback(async () => {
    try {
      const res = await fetch('https://aurex-app-production.up.railway.app/api/ia-signals');
      const json = await res.json();
      if (json.signals) {
        const map = {};
        json.signals.forEach(s => { map[s.simbolo] = s; });
        setIaSignals(map);
        try { await AsyncStorage.setItem('aurex_wl_ia_cache', JSON.stringify(map)); } catch {}
      }
    } catch (e) {
      try {
        const cached = JSON.parse(await AsyncStorage.getItem('aurex_wl_ia_cache'));
        if (cached && Object.keys(cached).length > 0) setIaSignals(cached);
      } catch {}
    }
  }, []);

  const [userEmail, setUserEmail] = useState('');
  const BACKEND = 'https://aurex-app-production.up.railway.app';
  // Build 18 Bloque 2: USER_ID dinamico desde supabase.auth (cierra agujero seguridad multiusuario)
  const [USER_ID, setUserId] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user?.id) {
          setUserId(session.user.id);
          setAuthToken(session.access_token || null);
        }
      } catch (e) { console.warn('[WatchlistScreen] error leyendo sesion:', e.message); }
    })();
  }, []);
  // Build 18 Bloque 2: plan + paywall modal para gating watchlistMax
  const { plan: userPlan } = usePlan();
  const [planLimitInfo, setPlanLimitInfo] = useState({ visible: false });

  // ── Load Lists via Railway backend (mismo método que Portfolio) ──
  const loadData = useCallback(async () => {
    // Build 18 Bloque 2: esperar a que USER_ID este disponible (evitar fetch a /null)
    if (!USER_ID) { setLoading(false); return; }
    try {
      // Get email for display
      try {
        const { data: sd } = await supabase.auth.getSession();
        if (sd?.session?.user?.email) setUserEmail(sd.session.user.email);
      } catch(e) {}

      // Fetch listas via Railway (no depende del SDK de Supabase)
      const listsRes = await fetch(`${BACKEND}/api/watchlists/${USER_ID}`);
      const wlists = await listsRes.json();
      if (!Array.isArray(wlists)) { setLoading(false); return; }
      setLists(wlists);

      if (wlists.length > 0) {
        const itemsRes = await fetch(`${BACKEND}/api/watchlists/${USER_ID}/items`);
        const allItems = await itemsRes.json();
        setItems(allItems || {});

        const primary = wlists.find(l => l.is_primary);
        setSelectedList(primary ? primary.id : wlists[0].id);
        // Cache en AsyncStorage
        try { await AsyncStorage.setItem('aurex_wl_data', JSON.stringify({ lists: wlists, items: allItems || {} })); } catch {}
      }
    } catch (e) {
      console.log('[WL] loadData error:', e.message);
      // Fallback: cache local
      try {
        const cached = JSON.parse(await AsyncStorage.getItem('aurex_wl_data'));
        if (cached && Array.isArray(cached.lists) && cached.lists.length > 0) {
          setLists(cached.lists);
          setItems(cached.items || {});
          const primary = cached.lists.find(l => l.is_primary);
          setSelectedList(primary ? primary.id : cached.lists[0].id);
        }
      } catch {}
    }
    setLoading(false);
  }, [USER_ID]);

  // ── Load Prices ──
  const loadPrices = useCallback(async () => {
    const tickers = new Set();
    Object.values(items).forEach(arr => arr.forEach(i => tickers.add(i.ticker)));
    if (tickers.size === 0) return;

    const cryptoSyms = [];
    const otherSyms = [];
    tickers.forEach(t => {
      const a = findAsset(t);
      if (a && (a.t === 'Cripto' || a.t === 'Stable')) cryptoSyms.push(t);
      else otherSyms.push(t);
    });

    if (cryptoSyms.length > 0) {
      try {
        const pairs = cryptoSyms.map(s => `"${s}USDT"`).join(',');
        const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbols=[${pairs}]`);
        const data = await res.json();
        const p = {};
        (Array.isArray(data) ? data : []).forEach(t => {
          const sym = t.symbol.replace('USDT', '');
          p[sym] = { price: parseFloat(t.lastPrice), change: parseFloat(t.priceChangePercent) };
        });
        setPrices(prev => ({ ...prev, ...p }));
      } catch (e) {}
    }

    if (otherSyms.length > 0) {
      const p = {};
      await Promise.all(otherSyms.map(async (sym) => {
        try {
          const res = await fetch(`https://aurex-app-production.up.railway.app/api/yahoo?symbol=${sym}&interval=1d&range=1d`);
          const data = await res.json();
          if (data?.chart?.result?.[0]?.meta) {
            const m = data.chart.result[0].meta;
            const prev = m.chartPreviousClose || m.previousClose;
            p[sym] = { price: m.regularMarketPrice, change: prev ? ((m.regularMarketPrice - prev) / prev * 100) : 0 };
          }
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
      }));
      if (Object.keys(p).length > 0) setPrices(prev => ({ ...prev, ...p }));
    }
  }, [items]);

  // ── Effects ──
  // Build 18 Bloque 2: re-ejecutar cuando USER_ID se hidrata desde supabase.auth
  useEffect(() => {
    if (!USER_ID) return;
    loadData(); loadSignals();
    const t = setTimeout(() => { setLoading(false); }, 5000);
    return () => clearTimeout(t);
  }, [USER_ID, loadData]);
  useEffect(() => { loadPrices(); }, [items]);

  // Cargar precios historicos para botones de periodo por activo
  useEffect(() => {
    const tickers = new Set();
    Object.values(items).forEach(arr => arr.forEach(i => tickers.add(i.ticker)));
    if (tickers.size === 0) return;
    const all = { '7d': {}, '1m': {}, '3m': {}, '1y': {} };
    const ranges = { '7d': '5d', '1m': '1mo', '3m': '3mo', '1y': '1y' };
    const limits = { '7d': 7, '1m': 30, '3m': 90, '1y': 365 };
    const tasks = [];
    tickers.forEach(ticker => {
      const a = findAsset(ticker);
      const isCrypto = a && (a.t === 'Cripto' || a.t === 'Stable');
      for (const [per, range] of Object.entries(ranges)) {
        tasks.push((async () => {
          try {
            if (isCrypto) {
              const res = await fetch(`https://api.binance.com/api/v3/klines?symbol=${ticker}USDT&interval=1d&limit=${limits[per]}`);
              const data = await res.json();
              if (Array.isArray(data) && data.length > 1) all[per][ticker] = parseFloat(data[0][1]);
            } else {
              const res = await fetch(`https://aurex-app-production.up.railway.app/api/yahoo?symbol=${ticker}&interval=1d&range=${range}`);
              const data = await res.json();
              const closes = data?.chart?.result?.[0]?.indicators?.quote?.[0]?.close;
              if (closes) { const valid = closes.filter(c => c != null); if (valid.length > 0) all[per][ticker] = valid[0]; }
            }
          } catch (e) {
            // Fallback: Yahoo directo
            try {
              const url2 = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?interval=1d&range=${range}&_=${Date.now()}`;
              const res2 = await fetch(url2);
              const data2 = await res2.json();
              const closes2 = data2?.chart?.result?.[0]?.indicators?.quote?.[0]?.close;
              if (closes2) { const valid2 = closes2.filter(c => c != null); if (valid2.length > 0) all[per][ticker] = valid2[valid2.length - 1]; }
            } catch {}
          }
        })());
      }
    });
    Promise.all(tasks).then(() => setWlHistPrices(all));
  }, [items]);

  const onRefresh = async () => {
    setRefreshing(true);
    setLogoErrors({});
    await Promise.all([loadData(), loadSignals()]);
    setRefreshing(false);
  };

  // ── CRUD Actions ──
  const createList = async () => {
    const name = newName.trim();
    if (!name) { Alert.alert('Error', 'Ingresa un nombre'); return; }
    if (!USER_ID) { Alert.alert('Error', 'Sesion no inicializada'); return; }
    try {
      const res = await fetch(`${BACKEND}/api/watchlists`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: USER_ID, name, color: newColor, is_primary: newPrimary || lists.length === 0, position: lists.length }),
      });
      // Build 18 Bloque 2: handle 403 plan_limit_reached -> PlanLimitModal
      if (res.status === 403) {
        const errData = await res.json().catch(() => ({}));
        if (errData?.error === 'plan_limit_reached') {
          setShowCreate(false);
          setPlanLimitInfo({
            visible: true,
            plan: errData.plan || userPlan,
            limit: errData.limit,
            message: errData.message || 'Tu plan permite solo 1 watchlist. Pasate a PRO o ELITE para sumar mas.',
          });
          return;
        }
      }
      const data = await res.json();
      if (data.error) { Alert.alert('Error', JSON.stringify(data.error)); return; }
      setShowCreate(false); setNewName(''); setNewPrimary(false); setNewColor(LIST_COLORS[0]);
      if (data?.id) {
        setLists(prev => [...prev, data]);
        setItems(prev => ({ ...prev, [data.id]: [] }));
        setSelectedList(data.id);
      }
    } catch (e) { Alert.alert('Error de red', e.message); }
  };

  const addAsset = async (asset) => {
    if (!selectedList) { Alert.alert('Error', 'Selecciona una lista primero'); return; }
    const curr = items[selectedList] || [];
    if (curr.find(i => i.ticker === asset.s)) { Alert.alert('Ya existe', `${asset.s} ya esta en esta lista`); return; }
    try {
      const res = await fetch(`${BACKEND}/api/watchlist-items`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ watchlist_id: selectedList, ticker: asset.s, asset_type: asset.t, position: curr.length }),
      });
      const data = await res.json();
      setShowAdd(false); setSearchQ(''); setSearchResults([]);
      if (data?.id) {
        setItems(prev => ({ ...prev, [selectedList]: [...(prev[selectedList] || []), data] }));
      }
    } catch (e) { Alert.alert('Error de red', e.message); }
  };

  const removeAsset = (itemId) => {
    Alert.alert('Eliminar', 'Quitar de la lista?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: async () => {
        await fetch(`${BACKEND}/api/watchlist-items/${itemId}`, { method: 'DELETE' });
        setItems(prev => {
          const c = { ...prev };
          Object.keys(c).forEach(k => { c[k] = c[k].filter(i => i.id !== itemId); });
          return c;
        });
      }},
    ]);
  };

  const deleteList = (listId) => {
    Alert.alert('Eliminar lista', 'Se eliminaran todos los activos', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: async () => {
        await fetch(`${BACKEND}/api/watchlists/${listId}`, { method: 'DELETE' });
        const nl = lists.filter(l => l.id !== listId);
        setLists(nl);
        const ni = { ...items }; delete ni[listId]; setItems(ni);
        if (selectedList === listId) setSelectedList(nl.length > 0 ? nl[0].id : null);
      }},
    ]);
  };

  const moveItem = async (idx, direction) => {
    if (!selectedList) return;
    const arr = [...(items[selectedList] || [])];
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= arr.length) return;
    const temp = arr[idx];
    arr[idx] = arr[newIdx];
    arr[newIdx] = temp;
    // Update positions via Railway
    arr.forEach((item, i) => {
      fetch(`${BACKEND}/api/watchlist-items/${item.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ position: i }) });
    });
    setItems(prev => ({ ...prev, [selectedList]: arr }));
  };

  const markPrimary = async (listId) => {
    for (const l of lists) {
      if (l.is_primary && l.id !== listId) await fetch(`${BACKEND}/api/watchlists/${l.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ is_primary: false }) });
    }
    await fetch(`${BACKEND}/api/watchlists/${listId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ is_primary: true }) });
    setLists(lists.map(l => ({ ...l, is_primary: l.id === listId })));
  };

  const toggleAlert = async (itemId, current) => {
    await fetch(`${BACKEND}/api/watchlist-items/${itemId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ alert_active: !current }) });
    setItems(prev => {
      const c = { ...prev };
      Object.keys(c).forEach(k => { c[k] = c[k].map(i => i.id === itemId ? { ...i, alert_active: !current } : i); });
      return c;
    });
  };

  const toggleCompareItem = (ticker) => {
    setCompareItems(prev => {
      if (prev.includes(ticker)) return prev.filter(t => t !== ticker);
      if (prev.length >= 5) { Alert.alert(t('maximo_5'), t('solo_comparar_5')); return prev; }
      return [...prev, ticker];
    });
  };

  const searchAssets = (q) => {
    setSearchQ(q);
    if (q.length < 1) { setSearchResults([]); return; }
    const u = q.toUpperCase();
    setSearchResults(ALL_ASSETS.filter(a => a.s.includes(u) || a.n.toUpperCase().includes(u)).slice(0, 15));
  };

  // ── Share ──
  const doShare = (platform, sig) => {
    const s = sig || shareModal;
    if (!s) return;
    const p = prices[s.simbolo];
    const msg = `AUREX IA — SENAL ${dirIcon(s.direccion)}\n${s.simbolo} (${s.nombre || findAsset(s.simbolo)?.n || s.simbolo})\n━━━━━━━━━━━━━━━━\n${s.direccion} — PROB. ${s.confianza || s.probPrincipal || 50}%${p ? `\nPrecio: $${fmt(p.price)} (${fmtPct(p.change)})` : ''}\n━━━━━━━━━━━━━━━━\nSenal generada por AUREX IA\nhttps://aurex.live`;
    const enc = encodeURIComponent(msg);
    setShareModal(null);
    if (platform === 'whatsapp') Linking.openURL(`https://wa.me/?text=${enc}`);
    else if (platform === 'telegram') Linking.openURL(`https://t.me/share/url?url=https://aurex.live&text=${enc}`);
    else if (platform === 'mail') Linking.openURL(`mailto:?subject=AUREX IA - ${s.simbolo}&body=${enc}`);
  };

  const doShareList = async (platform) => {
    const cl = lists.find(l => l.id === selectedList);
    if (!cl) return;
    const ci = items[selectedList] || [];
    let msg = `AUREX — Lista "${cl.name}"\n━━━━━━━━━━━━━━━━\n`;
    ci.forEach(item => {
      const p = prices[item.ticker];
      const dir = getDir(item.ticker);
      const prob = getProb(item.ticker);
      msg += `${dirIcon(dir)} ${item.ticker} — ${dir} ${prob}%`;
      if (p) msg += ` — $${fmt(p.price)} (${fmtPct(p.change)})`;
      msg += '\n';
    });
    msg += `━━━━━━━━━━━━━━━━\n${ci.length} activos | AUREX IA\nhttps://aurex.live`;
    const enc = encodeURIComponent(msg);
    setShareListModal(false);
    if (platform === 'whatsapp') Linking.openURL(`https://wa.me/?text=${enc}`);
    else if (platform === 'telegram') Linking.openURL(`https://t.me/share/url?url=https://aurex.live&text=${enc}`);
    else if (platform === 'mail') Linking.openURL(`mailto:?subject=AUREX - Lista ${cl.name}&body=${enc}`);
  };

  // ── Derived ──
  const currentList = lists.find(l => l.id === selectedList);
  const rawItems = items[selectedList] || [];

  // Ordenar activos de la lista según sortBy
  const sortedCurrentItems = (() => {
    if (sortBy === 'default') return rawItems;
    const getStats = (item) => {
      const p = prices[item.ticker];
      const sig = iaSignals[item.ticker];
      return {
        chg24: p?.change24h || p?.change || 0,
        chg7d: 0, // se calcula desde histórico si está disponible
        chg30d: 0,
        prob: sig?.confianza || sig?.probPrincipal || 0,
        dir: sig?.direccion || '',
        ticker: item.ticker || '',
      };
    };
    const dirScore = (dir) => dir === 'ALCISTA' ? 3 : dir === 'ALTA CONV-IA' ? 2 : dir === 'BAJISTA' ? 1 : 0;
    return [...rawItems].sort((a, b) => {
      const A = getStats(a); const B = getStats(b);
      if (sortBy === 'today')  return B.chg24 - A.chg24;
      if (sortBy === '7d')     return B.chg7d - A.chg7d;
      if (sortBy === '30d')    return B.chg30d - A.chg30d;
      if (sortBy === 'prob')   return B.prob - A.prob;
      if (sortBy === 'signal') return dirScore(B.dir) - dirScore(A.dir);
      if (sortBy === 'ticker') return A.ticker.localeCompare(B.ticker);
      return 0;
    });
  })();

  const currentItems = sortedCurrentItems;

  const sortOptionsWL = [
    { key: 'default', icon: '🕐', label: t('sort_default'),  hint: t('sort_hint_default') },
    { key: 'today',   icon: '📈', label: t('sort_today'),    hint: t('sort_hint_today') },
    { key: '7d',      icon: '📈', label: t('sort_7d'),       hint: t('sort_hint_7d') },
    { key: '30d',     icon: '📈', label: t('sort_30d'),      hint: t('sort_hint_30d') },
    { key: 'prob',    icon: '🎯', label: t('sort_prob'),     hint: t('sort_hint_prob') },
    { key: 'signal',  icon: '🔼', label: t('sort_signal'),   hint: t('sort_hint_signal') },
    { key: 'ticker',  icon: '🔤', label: t('sort_ticker'),   hint: t('sort_hint_ticker') },
  ];
  const currentSortLabelWL = (sortOptionsWL.find(o => o.key === sortBy) || sortOptionsWL[0]).label;

  // ── Render Logo ──
  const renderLogo = (ticker, tipo, size = 28) => {
    const asset = findAsset(ticker);
    const dir = getDir(ticker);
    const bg = dir === 'ALCISTA' ? C.greenBg : dir === 'BAJISTA' ? C.redBg : '#333';
    return (
      <View style={[st.assetLogo, { backgroundColor: bg, width: size + 8, height: size + 8 }]}>
        <AssetLogo sym={ticker} tipo={tipo || asset?.t} logo={asset?.logo} size={size} color={asset?.color} />
      </View>
    );
  };

  // ── Render Dots IA (como Portfolio) ──
  const renderDots = (ticker) => {
    const sig = getSig(ticker);
    if (!sig?.scores) return null;
    return (
      <View style={st.dotsWrap}>
        {VAR_KEYS.map((k, i) => {
          const v = sig.scores[k] || 0;
          if (v > 0.01) return <View key={i} style={[st.dot, { backgroundColor: C.green }]} />;
          if (v < -0.01) return <View key={i} style={[st.dot, { backgroundColor: C.red }]} />;
          return null;
        })}
      </View>
    );
  };

  // ── LOADING ──
  if (loading) {
    return <View style={[st.container, { justifyContent: 'center', alignItems: 'center' }]}><ActivityIndicator size="large" color={C.gold} /></View>;
  }

  return (
    <SafeAreaView style={st.container}>
      {/* Header */}
      <View style={st.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <AurexLogo size={32} />
          <Text style={st.headerTitle}>AUREX</Text>
          <Text style={{ fontSize: 13, color: C.textSec }}>{t('watchlist')}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <TouchableOpacity onPress={() => setShowLegal(true)} style={{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: C.card, borderWidth: 1, borderColor: C.gold, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 }}>
            <Text style={{ fontSize: 14 }}>⚖️</Text>
            <Text style={{ fontSize: 9, color: C.gold, fontWeight: '800' }}>▼</Text>
          </TouchableOpacity>
          <TouchableOpacity style={st.addListBtn} onPress={() => setShowCreate(true)}>
            <Text style={st.addListBtnText}>+ Lista</Text>
          </TouchableOpacity>
          <BellButton onPress={() => navigation.navigate('MisAlertas')} />
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={C.gold} />}>

        {/* Empty */}
        {lists.length === 0 ? (
          <View style={st.emptyWrap}>
            <Text style={{ fontSize: 48, marginBottom: 12 }}>👀</Text>
            <Text style={{ fontSize: 18, fontWeight: '600', color: C.text, marginBottom: 8 }}>{t('watchlist_vacia')}</Text>
            <Text style={{ fontSize: 13, color: C.textSec, textAlign: 'center', marginBottom: 12 }}>Crea tu primera lista para seguir activos con senales IA</Text>
            {userEmail ? <Text style={{ fontSize: 10, color: C.textDim, marginBottom: 8 }}>Cuenta: {userEmail}</Text> : null}
            <TouchableOpacity
              onPress={async () => {
                // Build 18 fix #4 (también acá, marcado por Escritorio): logout correcto.
                try {
                  try { await supabase.auth.refreshSession(); } catch {}
                  await supabase.auth.signOut();
                  await AsyncStorage.clear();
                } catch (e) {
                  try { await AsyncStorage.clear(); } catch {}
                }
              }}
              style={{ marginBottom: 8 }}
            >
              <Text style={{ fontSize: 11, color: '#F85149' }}>Cerrar sesion y re-loguearse</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setLoading(true); loadData(); loadSignals(); }} style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 11, color: C.gold }}>{t('reintentar_cargar')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={st.goldBtn} onPress={() => setShowCreate(true)}>
              <Text style={st.goldBtnText}>{t('crear_primera_lista')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* ── List cards horizontal con fade ── */}
            <View style={{ position: 'relative' }}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingVertical: 10 }} contentContainerStyle={{ paddingHorizontal: 11, gap: 8, paddingRight: 40 }}>
                {lists.map(l => (
                  <TouchableOpacity
                    key={l.id}
                    style={[st.listCard, selectedList === l.id && { borderColor: l.color || C.gold }]}
                    onPress={() => setSelectedList(l.id)}
                    onLongPress={() => deleteList(l.id)}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      {l.is_primary && <Text style={{ fontSize: 11 }}>⭐</Text>}
                      <Text style={[st.listName, { color: l.color || C.gold }]}>{l.name}</Text>
                    </View>
                    <Text style={st.listCount}>{(items[l.id] || []).length} activos</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              {/* Flecha derecha — indica que hay más listas */}
              {lists.length > 2 && (
                <View pointerEvents="none" style={{ position: 'absolute', right: 14, top: 0, bottom: 0, justifyContent: 'center' }}>
                  <View style={{ backgroundColor: `${C.gold}30`, borderRadius: 12, width: 24, height: 24, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16, color: C.gold, fontWeight: '800' }}>›</Text>
                  </View>
                </View>
              )}
            </View>

            {/* ── Selected list header ── */}
            {currentList && (
              <View style={{ marginHorizontal: 11, marginBottom: 8, paddingHorizontal: 13, paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: C.border2, backgroundColor: C.card }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <View style={[st.listDot, { backgroundColor: currentList.color || C.gold }]} />
                  <Text style={{ fontSize: 13, fontWeight: '700', color: C.text, flexShrink: 1 }} numberOfLines={1}>{currentList.name}</Text>
                  {currentList.is_primary ? (
                    <View style={st.principalTag}><Text style={{ fontSize: 8, fontWeight: '800', color: C.gold }}>⭐ PRINCIPAL</Text></View>
                  ) : (
                    <TouchableOpacity onPress={() => markPrimary(currentList.id)} style={{ backgroundColor: C.chipBg, borderWidth: 1, borderColor: C.border2, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4 }}>
                      <Text style={{ fontSize: 10, fontWeight: '600', color: C.text }}>☆ Marcar principal</Text>
                    </TouchableOpacity>
                  )}
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <TouchableOpacity style={st.addAssetBtn} onPress={() => { setCompareMode(!compareMode); setCompareItems([]); }}>
                    <Text style={{ fontSize: 12, fontWeight: '700', color: '#000' }}>⚖️ {t('comparar')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setShareListModal(true)}>
                    <Text style={{ fontSize: 16 }}>📤</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={st.addAssetBtn} onPress={() => setShowAdd(true)}>
                    <Text style={{ fontSize: 12, fontWeight: '700', color: '#000' }}>+ {t('agregar')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteList(currentList.id)}>
                    <Text style={{ fontSize: 14 }}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Chip Ordenar — alineado a la derecha, fila propia */}
            {currentList && rawItems.length > 0 && (
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 14, paddingTop: 6, paddingBottom: 2 }}>
                <TouchableOpacity
                  onPress={() => setShowSortMenu(true)}
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: C.card, borderWidth: 1, borderColor: C.border2, borderRadius: 7, paddingHorizontal: 10, paddingVertical: 5 }}
                >
                  <Text style={{ fontSize: 10, color: C.textSec, fontWeight: '600' }}>{t('ordenar_short')}</Text>
                  <Text style={{ fontSize: 11, color: C.text, fontWeight: '700' }}>{currentSortLabelWL}</Text>
                  <Text style={{ fontSize: 10, color: C.gold, fontWeight: '800' }}>↓</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* ── Assets list (formato Portfolio) ── */}
            {currentItems.length === 0 ? (
              <View style={{ alignItems: 'center', paddingVertical: 40 }}>
                <Text style={{ fontSize: 32, marginBottom: 8 }}>📋</Text>
                <Text style={{ fontSize: 14, color: C.textSec, marginBottom: 12 }}>{t('lista_vacia')}</Text>
                <TouchableOpacity style={st.goldBtn} onPress={() => setShowAdd(true)}>
                  <Text style={st.goldBtnText}>{t('agregar_primer_activo')}</Text>
                </TouchableOpacity>
              </View>
            ) : (
              currentItems.map((item, idx) => {
                const asset = findAsset(item.ticker);
                const p = prices[item.ticker];
                const sig = getSig(item.ticker);
                const dir = getDir(item.ticker);
                const prob = getProb(item.ticker);
                const ch = p?.change || 0;
                const isUp = ch >= 0;
                const tipo = asset?.t || item.asset_type || '';
                const isCrypto = tipo.toLowerCase() === 'cripto' || tipo.toLowerCase() === 'stable';
                const mktClosed = !isCrypto && !isMktOpen();
                const isExpanded = expanded === item.ticker;

                return (
                  <View key={item.id}>
                    {/* ── Asset Row (como Portfolio) ── */}
                    <TouchableOpacity style={st.assetRow} onPress={() => compareMode ? toggleCompareItem(item.ticker) : setExpanded(isExpanded ? null : item.ticker)} onLongPress={() => !compareMode && setActionMenu(item)} delayLongPress={400} activeOpacity={0.7}>
                      {/* Checkbox comparar o flechas reordenar */}
                      {compareMode ? (
                        <View style={{ width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: compareItems.includes(item.ticker) ? C.gold : C.border, backgroundColor: compareItems.includes(item.ticker) ? C.gold : 'transparent', alignItems: 'center', justifyContent: 'center', marginRight: 4 }}>
                          {compareItems.includes(item.ticker) && <Text style={{ color: '#000', fontSize: 12, fontWeight: '800' }}>✓</Text>}
                        </View>
                      ) : null}
                      {/* Flechas reordenar */}
                      <View style={{ gap: 1, marginRight: 2 }}>
                        <TouchableOpacity onPress={() => moveItem(idx, -1)}>
                          <Text style={{ fontSize: 11, color: idx === 0 ? '#333' : C.textSec, width: 18, textAlign: 'center' }}>▲</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => moveItem(idx, 1)}>
                          <Text style={{ fontSize: 11, color: idx === currentItems.length - 1 ? '#333' : C.textSec, width: 18, textAlign: 'center' }}>▼</Text>
                        </TouchableOpacity>
                      </View>
                      {/* Logo */}
                      {renderLogo(item.ticker, tipo)}

                      {/* Centro: Ticker, Nombre, Señal */}
                      <View style={{ flex: 1, minWidth: 0 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                          <Text style={st.assetSym}>{item.ticker}</Text>
                          <View style={st.typeBadge}><Text style={st.typeText}>{translateTipo(tipo)}</Text></View>
                        </View>
                        <Text style={{ fontSize: 11, color: C.textSec, marginTop: 1 }}>{asset?.n || item.ticker}</Text>
                        {/* Probabilidad y dirección debajo */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 3 }}>
                          <Text style={{ fontSize: 8, fontWeight: '700', color: dirColor(dir) }}>
                            {dirIcon(dir)} {dir} {prob}%
                          </Text>
                        </View>
                      </View>

                      {/* Precio + Dots + Ult.cierre + % (columna derecha) */}
                      <View style={{ alignItems: 'flex-end', marginLeft: 4 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                          {renderDots(item.ticker)}
                          <Text style={st.assetPrice}>${p ? fmt(p.price) : '---'}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 0 }}>
                          {isCrypto && <Text style={st.badge24}>24/7</Text>}
                          {mktClosed && !isCrypto && <Text style={{ fontSize: 9, color: C.gold, fontWeight: '700' }}>{t('ult_cierre')}</Text>}
                          <Text style={[st.changePct, { color: (() => {
                            const per = getWlPeriod(item.ticker);
                            if (per === '24h') return isUp ? C.green : C.red;
                            const hp = wlHistPrices[per]?.[item.ticker];
                            const currentPrice = p?.price || 0;
                            if (hp && hp > 0 && currentPrice > 0) return currentPrice >= hp ? C.green : C.red;
                            return isUp ? C.green : C.red;
                          })() }]}>{(() => {
                            const per = getWlPeriod(item.ticker);
                            if (per === '24h') return fmtPct(ch);
                            const hp = wlHistPrices[per]?.[item.ticker];
                            const currentPrice = p?.price || 0;
                            if (hp && hp > 0 && currentPrice > 0) return fmtPct(((currentPrice - hp) / hp) * 100);
                            return '...';
                          })()}</Text>
                        </View>
                      </View>

                      {/* Eliminar activo de la lista */}
                      <View style={{ alignItems: 'center', gap: 4, marginLeft: 4 }}>
                        <TouchableOpacity onPress={() => removeAsset(item.id)}>
                          <Text style={{ fontSize: 12, color: C.textDim }}>🗑️</Text>
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>

                    {/* ── Bottom row: 🔔 (Build 8) + period buttons ── */}
                    <View style={st.bottomRow}>
                      {/* Build 8: Botón crear alerta puntual de precio */}
                      <TouchableOpacity
                        onPress={() => {
                          setAlertCreateAsset({ simbolo: item.ticker, tipo_activo: tipo, precio_actual: p?.price || 0 });
                        }}
                        hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                        style={{ paddingHorizontal: 6, paddingVertical: 2 }}
                      >
                        <Text style={{ fontSize: 16, color: C.gold }}>{`\u{1F514}`}</Text>
                      </TouchableOpacity>
                      <View style={st.periodBtns}>
                        {['24h','7d','1m','3m','1y'].map((per) => (
                          <TouchableOpacity key={per} onPress={() => setWlPeriod(prev => ({ ...prev, [item.ticker]: per }))} style={[st.perBtn, getWlPeriod(item.ticker) === per && st.perBtnActive]}>
                            <Text style={[st.perBtnText, getWlPeriod(item.ticker) === per && st.perBtnTextActive]}>{per}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>

                    {/* ── Panel IA expandido (como IAScreen) ── */}
                    {isExpanded && (
                      <View style={st.detailPanel}>
                        {/* Botón cerrar */}
                        <TouchableOpacity onPress={() => setExpanded(null)} style={{ position: 'absolute', top: 10, right: 14, zIndex: 10, width: 32, height: 32, borderRadius: 16, backgroundColor: '#21262D', alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={{ fontSize: 16, color: '#E6EDF3' }}>✕</Text>
                        </TouchableOpacity>
                        {/* Card principal */}
                        <View style={[st.detailCard, { borderColor: `${dirColor(dir)}40` }]}>
                          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                            <Text style={{ fontSize: 18 }}>{dirIcon(dir)}</Text>
                            <Text style={{ fontSize: 16, fontWeight: '800', color: dirColor(dir) }}>{dir}</Text>
                            <View style={[st.probBadge, { backgroundColor: dirBg(dir) }]}>
                              <Text style={{ fontSize: 12, fontWeight: '700', color: dirColor(dir) }}>PROB. {prob}%</Text>
                            </View>
                          </View>
                          {/* Barra probabilidad */}
                          <View style={{ height: 6, backgroundColor: C.border, borderRadius: 3, overflow: 'hidden' }}>
                            <View style={{ height: '100%', width: `${prob}%`, backgroundColor: dirColor(dir), borderRadius: 3 }} />
                          </View>
                          {/* Justificación */}
                          {sig.motivos && sig.motivos.length > 0 && (
                            <View style={{ marginTop: 10 }}>
                              <Text style={{ fontSize: 8, fontWeight: '700', color: C.textDim, letterSpacing: 0.5, marginBottom: 4 }}>JUSTIFICACION DEL ANALISIS</Text>
                              {sig.motivos.slice(0, 5).map((m, i) => (
                                <View key={i} style={{ flexDirection: 'row', gap: 6, marginBottom: 3 }}>
                                  <Text style={{ color: dirColor(dir), fontWeight: '700' }}>→</Text>
                                  <Text style={{ fontSize: 11, color: C.text, flex: 1 }}>{m}</Text>
                                </View>
                              ))}
                            </View>
                          )}
                        </View>

                        {/* Métricas: Objetivo / Stop / Upside */}
                        <View style={{ flexDirection: 'row', gap: 6, marginTop: 8 }}>
                          {[
                            { label: 'OBJETIVO', val: p ? `$${fmt(p.price * (dir === 'BAJISTA' ? 0.95 : 1.08))}` : '---', color: C.green },
                            { label: 'STOP', val: p ? `$${fmt(p.price * (dir === 'BAJISTA' ? 1.03 : 0.96))}` : '---', color: C.red },
                            { label: dir === 'BAJISTA' ? 'DOWNSIDE' : 'UPSIDE', val: dir === 'BAJISTA' ? '-5.0%' : '+8.0%', color: dirColor(dir) },
                          ].map((m, i) => (
                            <View key={i} style={st.metricCard}>
                              <Text style={{ fontSize: 7, color: C.textDim, fontWeight: '600' }}>{m.label}</Text>
                              <Text style={{ fontSize: 13, fontWeight: '700', color: m.color, marginTop: 2 }}>{m.val}</Text>
                            </View>
                          ))}
                        </View>

                        {/* Variables del modelo */}
                        {sig.scores && (
                          <View style={{ marginTop: 10 }}>
                            <Text style={{ fontSize: 9, fontWeight: '700', color: C.textDim, marginBottom: 6 }}>VARIABLES DEL MODELO</Text>
                            {VAR_DEFS.map((v, i) => {
                              const score = sig.scores[v.k] || 0;
                              const vColor = score > 0.01 ? C.green : score < -0.01 ? C.red : C.textDim;
                              const vLabel = score > 0.01 ? '●' : score < -0.01 ? '●' : '○';
                              return (
                                <View key={i} style={[st.varRow, { borderLeftColor: vColor }]}>
                                  <Text style={{ fontSize: 11, color: C.text }}>{v.label}</Text>
                                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                    <Text style={{ fontSize: 9, color: vColor, fontWeight: '700' }}>{v.peso}</Text>
                                    <Text style={{ fontSize: 10, color: vColor }}>{vLabel}</Text>
                                  </View>
                                </View>
                              );
                            })}
                          </View>
                        )}

                        {/* Botón compartir */}
                        <TouchableOpacity style={st.shareBtn} onPress={() => setShareModal(sig)}>
                          <Text style={{ fontSize: 14 }}>📤</Text>
                          <Text style={{ fontSize: 12, fontWeight: '600', color: C.text }}>{t('compartir_senal')}</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                );
              })
            )}
          </>
        )}
        <View style={{ height: 30 }} />
      </ScrollView>

      {/* ── Botón flotante Comparar ── */}
      {compareMode && compareItems.length >= 2 && (
        <TouchableOpacity
          style={{ position: 'absolute', bottom: 20, left: 20, right: 20, backgroundColor: C.gold, borderRadius: 12, padding: 14, alignItems: 'center', zIndex: 50, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 }}
          onPress={() => setShowCompare(true)}
        >
          <Text style={{ color: '#000', fontSize: 14, fontWeight: '700' }}>⚖️ {t('comparar')} {compareItems.length}</Text>
        </TouchableOpacity>
      )}

      {/* ── Modal: Comparador ── */}
      <Modal
        visible={showCompare}
        transparent
        animationType="slide"
        statusBarTranslucent={true}
      >
        <ComparadorModal
          compareItems={compareItems}
          prices={prices}
          findAsset={findAsset}
          getDir={getDir}
          getProb={getProb}
          getSig={getSig}
          renderLogo={renderLogo}
          onClose={() => { setShowCompare(false); setCompareMode(false); setCompareItems([]); }}
          st={st}
        />
      </Modal>

      {/* ── Modal: Create List ── */}
      <Modal visible={showCreate} transparent animationType="fade">
        <View style={st.modalOverlay}>
          <View style={st.modalCard}>
            <View style={st.modalHeader}>
              <Text style={st.modalTitle}>{t('nueva_lista')}</Text>
              <TouchableOpacity onPress={() => setShowCreate(false)}><Text style={st.modalClose}>✕</Text></TouchableOpacity>
            </View>
            <Text style={st.fieldLabel}>{t('nombre_label')}</Text>
            <TextInput style={st.input} value={newName} onChangeText={setNewName} placeholder="Ej: Criptos favoritas" placeholderTextColor={C.textDim} />
            <Text style={st.fieldLabel}>{t('color_label')}</Text>
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 4 }}>
              {LIST_COLORS.map(c => (
                <TouchableOpacity key={c} style={[st.colorBtn, { backgroundColor: c }, newColor === c && { borderColor: C.text }]} onPress={() => setNewColor(c)} />
              ))}
            </View>
            <TouchableOpacity style={{ paddingVertical: 10, marginTop: 8 }} onPress={() => setNewPrimary(!newPrimary)}>
              <Text style={{ fontSize: 13, color: C.text }}>{newPrimary ? t('lista_principal') : t('marcar_principal')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={st.goldBtn} onPress={createList}>
              <Text style={st.goldBtnText}>{t('crear_lista')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ── Modal: Add Asset ── */}
      <Modal visible={showAdd} transparent animationType="fade">
        <View style={st.modalOverlay}>
          <View style={st.modalCard}>
            <View style={st.modalHeader}>
              <Text style={st.modalTitle}>{t('agregar_activo')}</Text>
              <TouchableOpacity onPress={() => { setShowAdd(false); setSearchQ(''); setSearchResults([]); }}>
                <Text style={st.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>
            <TextInput style={st.input} value={searchQ} onChangeText={searchAssets} placeholder={t('buscar')} placeholderTextColor={C.textDim} autoFocus />
            <ScrollView style={{ maxHeight: 350, marginTop: 8 }}>
              {searchResults.map(a => (
                <TouchableOpacity key={a.s} style={st.searchRow} onPress={() => addAsset(a)}>
                  {renderLogo(a.s, a.t, 24)}
                  <View style={{ flex: 1, marginLeft: 8 }}>
                    <Text style={{ fontSize: 13, fontWeight: '700', color: C.text }}>{a.s}</Text>
                    <Text style={{ fontSize: 10, color: C.textDim }}>{a.n}</Text>
                  </View>
                  <View style={st.typeBadge}><Text style={st.typeText}>{translateTipo(a.t)}</Text></View>
                </TouchableOpacity>
              ))}
              {searchQ.length > 0 && searchResults.length === 0 && (
                <Text style={{ textAlign: 'center', color: C.textDim, fontSize: 12, paddingVertical: 20 }}>{t('sin_resultados')}</Text>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* ── Modal: Share Signal ── */}
      {shareModal && (
        <View style={st.shareOverlay}>
          <View style={st.shareCard}>
            <Text style={{ fontSize: 15, fontWeight: '700', color: C.text, textAlign: 'center', marginBottom: 16 }}>
              {t('compartir_senal_de')} {shareModal.simbolo}
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 16, marginBottom: 16 }}>
              <TouchableOpacity onPress={() => doShare('whatsapp')} style={[st.shareBtn2, { backgroundColor: '#25D36618', borderColor: '#25D36680' }]}>
                <Text style={{ fontSize: 24, marginBottom: 4 }}>💬</Text>
                <Text style={{ fontSize: 11, color: '#1BA851', fontWeight: '700' }}>WhatsApp</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => doShare('telegram')} style={[st.shareBtn2, { backgroundColor: '#0088CC18', borderColor: '#0088CC80' }]}>
                <Text style={{ fontSize: 24, marginBottom: 4 }}>✈️</Text>
                <Text style={{ fontSize: 11, color: '#0070AA', fontWeight: '700' }}>Telegram</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => doShare('mail')} style={[st.shareBtn2, { backgroundColor: `${C.gold}20`, borderColor: C.gold }]}>
                <Text style={{ fontSize: 24, marginBottom: 4 }}>📧</Text>
                <Text style={{ fontSize: 11, color: C.gold, fontWeight: '700' }}>Mail</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setShareModal(null)} style={{ backgroundColor: C.border, borderRadius: 10, padding: 14, alignItems: 'center' }}>
              <Text style={{ fontSize: 14, color: C.text, fontWeight: '600' }}>{t('cancelar')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* ── Modal: Share List ── */}
      {shareListModal && (
        <View style={st.shareOverlay}>
          <View style={st.shareCard}>
            <Text style={{ fontSize: 15, fontWeight: '700', color: C.text, textAlign: 'center', marginBottom: 16 }}>
              Compartir lista "{currentList?.name}"
            </Text>
            <Text style={{ fontSize: 11, color: C.textSec, textAlign: 'center', marginBottom: 16 }}>
              {currentItems.length} activos con senales IA
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 16, marginBottom: 16 }}>
              <TouchableOpacity onPress={() => doShareList('whatsapp')} style={[st.shareBtn2, { backgroundColor: '#25D36618', borderColor: '#25D36680' }]}>
                <Text style={{ fontSize: 24, marginBottom: 4 }}>💬</Text>
                <Text style={{ fontSize: 11, color: '#1BA851', fontWeight: '700' }}>WhatsApp</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => doShareList('telegram')} style={[st.shareBtn2, { backgroundColor: '#0088CC18', borderColor: '#0088CC80' }]}>
                <Text style={{ fontSize: 24, marginBottom: 4 }}>✈️</Text>
                <Text style={{ fontSize: 11, color: '#0070AA', fontWeight: '700' }}>Telegram</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => doShareList('mail')} style={[st.shareBtn2, { backgroundColor: `${C.gold}20`, borderColor: C.gold }]}>
                <Text style={{ fontSize: 24, marginBottom: 4 }}>📧</Text>
                <Text style={{ fontSize: 11, color: C.gold, fontWeight: '700' }}>Mail</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setShareListModal(false)} style={{ backgroundColor: C.border, borderRadius: 10, padding: 14, alignItems: 'center' }}>
              <Text style={{ fontSize: 14, color: C.text, fontWeight: '600' }}>{t('cancelar')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

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
              <Text style={{ fontSize: 15, fontWeight: '800', color: C.text, letterSpacing: 0.3 }}>{t('ordenar_titulo')}</Text>
            </View>
            {sortOptionsWL.map((opt) => {
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

      {/* Modal Acciones por activo (long press) — flotante centrado */}
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
                  <Text style={{ fontSize: 14, fontWeight: '800', color: C.text }}>{actionMenu.ticker}</Text>
                  {findAsset(actionMenu.ticker)?.n ? <Text style={{ fontSize: 10, color: C.textSec, marginTop: 1 }}>{findAsset(actionMenu.ticker).n}</Text> : null}
                </View>
                {/* Análisis IA completo (destacado) */}
                <TouchableOpacity
                  onPress={() => { setExpanded(actionMenu.ticker); setActionMenu(null); }}
                  style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10, backgroundColor: `${C.gold}15`, borderWidth: 1, borderColor: C.gold, marginBottom: 6 }}
                >
                  <Text style={{ fontSize: 16, marginRight: 8 }}>📊</Text>
                  <Text style={{ flex: 1, fontSize: 13, fontWeight: '700', color: C.gold }}>{t('action_analisis_ia').replace('📊 ', '')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => { const s = getSig(actionMenu.ticker); if (s) setShareModal(s); setActionMenu(null); }}
                  style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10, backgroundColor: C.bg, marginBottom: 6 }}
                >
                  <Text style={{ fontSize: 15, marginRight: 8 }}>📤</Text>
                  <Text style={{ flex: 1, fontSize: 13, fontWeight: '600', color: C.text }}>{t('compartir_senal')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => { removeAsset(actionMenu.id); setActionMenu(null); }}
                  style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10, backgroundColor: `${C.red}12`, borderWidth: 1, borderColor: `${C.red}60`, marginBottom: 8 }}
                >
                  <Text style={{ fontSize: 15, marginRight: 8 }}>🗑️</Text>
                  <Text style={{ flex: 1, fontSize: 13, fontWeight: '700', color: C.red }}>{t('quitar_de_lista')}</Text>
                </TouchableOpacity>
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
        userId={USER_ID}
      />
      {/* Build 18 Bloque 2: paywall modal cuando FREE intenta crear 2da watchlist */}
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
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: C.border },
  headerTitle: { fontSize: 16, fontWeight: '600', color: C.gold, letterSpacing: 1 },
  addListBtn: { backgroundColor: C.gold, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 },
  addListBtnText: { fontSize: 11, fontWeight: '700', color: '#000' },
  emptyWrap: { alignItems: 'center', paddingTop: 60, paddingHorizontal: 30 },
  goldBtn: { backgroundColor: C.gold, borderRadius: 10, padding: 13, alignItems: 'center', marginTop: 12 },
  goldBtnText: { color: '#000', fontSize: 13, fontWeight: '700' },

  // List cards
  listCard: { backgroundColor: C.card, borderRadius: 10, padding: 10, borderWidth: 1.5, borderColor: C.border, minWidth: 130 },
  listName: { fontSize: 13, fontWeight: '700' },
  listCount: { fontSize: 10, color: C.textDim, marginTop: 3 },

  // List header
  listHeader: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 6, paddingHorizontal: 13, paddingVertical: 8, borderBottomWidth: 0.5, borderBottomColor: C.border, backgroundColor: '#080C10' },
  listDot: { width: 10, height: 10, borderRadius: 5 },
  principalTag: { backgroundColor: C.navBg, borderWidth: 1, borderColor: C.gold, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  addAssetBtn: { backgroundColor: C.gold, borderRadius: 8, paddingHorizontal: 14, paddingVertical: 8 },

  // Asset row (como Portfolio)
  assetRow: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 4, paddingHorizontal: 12 },
  assetLogo: { borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  assetSym: { fontSize: 14, fontWeight: '700', color: C.text },
  typeBadge: { backgroundColor: C.border, paddingHorizontal: 6, paddingVertical: 1, borderRadius: 5 },
  typeText: { fontSize: 10, color: C.textSec },
  assetPrice: { fontSize: 14, fontWeight: '700', color: C.text },

  // Dots IA
  dotsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 2, minWidth: 40, maxWidth: 56, justifyContent: 'flex-end' },
  dot: { width: 6, height: 6, borderRadius: 3 },

  // Bottom row (como Portfolio)
  bottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 52, paddingRight: 12, paddingBottom: 3, paddingTop: 0, gap: 4, borderBottomWidth: 0.5, borderBottomColor: C.border2 },
  badge24: { fontSize: 8, color: C.green, fontWeight: '700', borderWidth: 0.5, borderColor: C.green, borderRadius: 3, paddingHorizontal: 3, paddingVertical: 0.5, marginRight: 2 },
  changePct: { fontSize: 11, fontWeight: '600' },
  periodBtns: { flexDirection: 'row', gap: 2 },
  perBtn: { paddingHorizontal: 3, paddingVertical: 1, borderRadius: 3, backgroundColor: C.border },
  perBtnActive: { backgroundColor: C.gold },
  perBtnText: { fontSize: 9, color: C.textSec },
  perBtnTextActive: { color: C.bg },

  // Detail panel (como IAScreen)
  detailPanel: { backgroundColor: C.card, padding: 14, borderBottomWidth: 1, borderBottomColor: C.border },
  detailCard: { borderWidth: 1, borderRadius: 10, padding: 12, backgroundColor: C.bg },
  probBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, marginLeft: 'auto' },
  metricCard: { flex: 1, backgroundColor: C.border, borderRadius: 8, padding: 8, alignItems: 'center' },
  varRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 4, paddingHorizontal: 8, borderLeftWidth: 2, borderTopRightRadius: 6, borderBottomRightRadius: 6, marginBottom: 3, backgroundColor: `${C.border}80` },
  shareBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 12, backgroundColor: C.border, borderRadius: 10, padding: 12 },

  // Modals
  modalOverlay: { flex: 1, backgroundColor: '#000000CC', justifyContent: 'center', alignItems: 'center', padding: 12 },
  modalCard: { backgroundColor: C.card, borderRadius: 16, width: '100%', maxWidth: 440, padding: 20, borderWidth: 1, borderColor: C.border2 },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  modalTitle: { fontSize: 15, fontWeight: '600', color: C.text },
  modalClose: { fontSize: 20, color: C.textSec },
  fieldLabel: { fontSize: 10, color: C.textSec, fontWeight: '500', marginBottom: 4, marginTop: 10 },
  input: { backgroundColor: C.bg, color: C.text, borderWidth: 1, borderColor: C.border2, borderRadius: 10, padding: 12, fontSize: 14 },
  colorBtn: { width: 28, height: 28, borderRadius: 14, borderWidth: 2, borderColor: 'transparent' },
  searchRow: { flexDirection: "row", alignItems: "center", paddingVertical: 12, paddingHorizontal: 8, borderBottomWidth: 0.5, borderBottomColor: C.border },

  // Share overlay
  shareOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end', zIndex: 200 },
  shareCard: { backgroundColor: C.card, borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 20, paddingBottom: 30, borderWidth: 1, borderColor: C.border2 },
  shareBtn2: { width: 90, height: 80, borderWidth: 1, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
});
