import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  ActivityIndicator, RefreshControl, Share, Platform, Image, Animated, Linking, Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AurexLogo from '../components/AurexLogo';
import LiveIndicator from '../components/LiveIndicator';
import AssetLogo from '../components/AssetLogo';
import BellButton from '../components/BellButton';
import { useNavigation } from '@react-navigation/native';
import { ALL_ASSETS, TOTAL_ASSETS } from '../lib/assets';
import { generateAllSignals } from '../lib/iaEngine';
import { fmt, fmtPrice, fmtPct } from '../lib/locale';
import { useT } from '../lib/i18n';
import { usePlan } from '../lib/usePlan';

import { useTheme } from '../lib/ThemeContext';

// Usar todos los activos de assets.js
const IA_ACTIVOS = ALL_ASSETS;

// Logo URLs — CoinCap para crypto (rapido), FMP para stocks
function getLogoUrl(sym, tipo) {
  const t = (tipo || '').toLowerCase();
  // Crypto: siempre CoinCap (rapido y confiable, CoinGecko da 403)
  if (t === 'cripto' || t === 'stable') return `https://assets.coincap.io/assets/icons/${sym.toLowerCase()}@2x.png`;
  // Non-crypto: assets.js logo (FMP) si no es data:SVG
  const activo = ALL_ASSETS.find(a => a.s === sym);
  if (activo && activo.logo && !activo.logo.startsWith('data:')) return activo.logo;
  return `https://financialmodelingprep.com/image-stock/${sym.replace('=F','').replace('=X','')}.png`;
}

const getFilters = (t) => [
  { key: 'todo', label: t('filter_todo'), color: '#556070', border: '#556070' },
  { key: 'alcista', label: t('alcista').charAt(0) + t('alcista').slice(1).toLowerCase(), color: '#3FB950', border: '#3FB950' },
  { key: 'bajista', label: t('bajista').charAt(0) + t('bajista').slice(1).toLowerCase(), color: '#F85149', border: '#F85149' },
  { key: 'alta', label: t('filter_conf_ia'), color: '#D4A017', border: '#D4A017' },
  { key: 'cripto', label: t('cripto'), color: '#A78BFA', border: '#A78BFA' },
  { key: 'accion', label: t('acciones'), color: '#58A6FF', border: '#58A6FF' },
  { key: 'etf', label: t('filter_etf'), color: '#F0883E', border: '#F0883E' },
  { key: 'metal', label: t('filter_metal'), color: '#FFD700', border: '#FFD700' },
  { key: 'commodity', label: t('filter_mat_prima'), color: '#C8A96E', border: '#C8A96E' },
  { key: 'bono', label: t('filter_bono'), color: '#79C0FF', border: '#79C0FF' },
];

function EventBannerIA() {
  const scrollAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const anim = Animated.loop(
      Animated.timing(scrollAnim, { toValue: -800, duration: 18000, useNativeDriver: true })
    );
    anim.start();
    return () => anim.stop();
  }, [scrollAnim]);
  return (
    <View style={{ backgroundColor: '#1A1200', borderBottomWidth: 1, borderBottomColor: '#D4A01760', paddingHorizontal: 12, paddingVertical: 6, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <View style={{ backgroundColor: '#D4A01730', borderWidth: 1, borderColor: '#D4A017', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 }}>
        <Text style={{ fontSize: 7, fontWeight: '800', color: '#D4A017' }}>ALTO</Text>
      </View>
      <View style={{ flex: 1, overflow: 'hidden' }}>
        <Animated.Text style={{ fontSize: 11, color: '#fff', fontWeight: '500', width: 800, transform: [{ translateX: scrollAnim }] }}>
          EVENTO CRITICO — FED FOMC 7 mayo — CPI 13 mayo — Earnings NVDA, AAPL, MSFT proximas semanas
        </Animated.Text>
      </View>
      <View style={{ backgroundColor: '#D4A01730', borderWidth: 1, borderColor: '#D4A017', borderRadius: 4, paddingHorizontal: 5, paddingVertical: 1 }}>
        <Text style={{ fontSize: 8, fontWeight: '700', color: '#D4A017' }}>5h 54m</Text>
      </View>
    </View>
  );
}

export default function IAScreen() {
  const { theme: C } = useTheme();
  const st = useMemo(() => makeStyles(C), [C]);
  const t = useT();
  const navigation = useNavigation();
  // Build 18 Bloque 2: gating UI premium por plan
  const { plan: userPlan } = usePlan();
  const isPro = userPlan === 'PRO' || userPlan === 'ELITE';
  const isElite = userPlan === 'ELITE';
  const [signals, setSignals] = useState([]);
  const [filter, setFilter] = useState('todo');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [prices, setPrices] = useState({});
  const [logoErrors, setLogoErrors] = useState({});
  const [showVarsModal, setShowVarsModal] = useState(false);
  const [showLegal, setShowLegal] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [onlyPortfolio, setOnlyPortfolio] = useState(false);
  const [portfolioSymbols, setPortfolioSymbols] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const [showSortMenu, setShowSortMenu] = useState(false);

  const loadSignals = useCallback(async () => {
    // FUENTE UNICA: backend Railway — mismos datos que aurex.live
    console.log('[AUREX IA] Cargando senales del backend...');
    try {
      const res = await fetch('https://aurex-app-production.up.railway.app/api/ia-signals');
      const data = await res.json();
      console.log('[AUREX IA] Backend devolvio', (data.signals || []).length, 'senales');
      if (data.signals && data.signals.length > 0) {
        const sigs = data.signals.map(s => ({
          ...s,
          nombre: s.nombre || (IA_ACTIVOS.find(a => a.s === s.simbolo) || {}).n || s.simbolo,
          tipo: s.tipo || (IA_ACTIVOS.find(a => a.s === s.simbolo) || {}).t || '',
          probabilidad: s.confianza || s.probPrincipal || s.prob_principal || 50,
          subDireccion: s.direccion === 'ALTA CONV-IA' ? (s.score >= 0 ? 'ALCISTA' : 'BAJISTA') : null,
        }));
        sigs.sort((a, b) => (b.probabilidad || 0) - (a.probabilidad || 0));
        // Actualizar precios desde señales del backend
        const backendPrices = {};
        sigs.forEach(s => {
          if (s.precio) backendPrices[s.simbolo] = { price: s.precio, change: s.precio24h > 0 ? ((s.precio - s.precio24h) / s.precio24h) * 100 : 0 };
        });
        setPrices(backendPrices);
        setSignals(sigs);
        setLastUpdate(Date.now());
        setLoading(false);
        // Cache en AsyncStorage
        try { await AsyncStorage.setItem('aurex_ia_cache', JSON.stringify({ signals: sigs, prices: backendPrices, ts: Date.now() })); } catch {}
        console.log('[AUREX IA] OK mostrando', sigs.length, 'senales del backend');
        return;
      }
    } catch (e) {
      console.error('[AUREX IA] Error backend:', e.message);
    }
    // Intentar cache local antes de cálculo local
    try {
      const cached = JSON.parse(await AsyncStorage.getItem('aurex_ia_cache'));
      if (cached && cached.signals && cached.signals.length > 0) {
        setSignals(cached.signals);
        setPrices(cached.prices || {});
        setLastUpdate(cached.ts || Date.now());
        setLoading(false);
        console.log('[AUREX IA] Usando cache local:', cached.signals.length, 'senales de hace', Math.round((Date.now() - (cached.ts || 0)) / 60000), 'min');
        return;
      }
    } catch {}
    // Solo si el backend falla completamente, usar calculo local
    console.log('[AUREX IA] Backend fallo, usando calculo local como fallback');
    try {
      const { signals: realSigs, prices: realPrices } = await generateAllSignals(IA_ACTIVOS, null);
      const mapped = realSigs.map(s => ({
        ...s,
        probabilidad: s.probPrincipal,
        subDireccion: s.direccion === 'ALTA CONV-IA' ? (s.score >= 0 ? 'ALCISTA' : 'BAJISTA') : null,
      }));
      mapped.sort((a, b) => (b.probabilidad || 0) - (a.probabilidad || 0));
      setSignals(mapped);
      setPrices(realPrices);
    } catch (e) {}
    setLoading(false);
  }, []);

  const loadPrices = useCallback(async () => {
    try {
      const cryptoSyms = IA_ACTIVOS.filter(a => a.t === 'Cripto').map(a => `"${a.s}USDT"`).join(',');
      const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbols=[${cryptoSyms}]`);
      const data = await res.json();
      const p = {};
      (Array.isArray(data) ? data : []).forEach(tk => {
        const sym = tk.symbol.replace('USDT', '');
        p[sym] = { price: parseFloat(tk.lastPrice), change: parseFloat(tk.priceChangePercent) };
      });
      setPrices(prev => ({ ...prev, ...p }));
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

  useEffect(() => { loadSignals(); loadPrices(); }, [loadSignals, loadPrices]);

  // Cargar los símbolos del Portfolio del usuario para el filtro "Mi Portfolio"
  useEffect(() => {
    (async () => {
      try {
        const USER_ID = '174187a7-d640-459b-9426-9c28146f4e23';
        const res = await fetch(`https://aurex-app-production.up.railway.app/api/portfolio/${USER_ID}`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setPortfolioSymbols(data.map(item => item.simbolo));
        }
      } catch (e) {}
    })();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadSignals();
    await loadPrices();
    setRefreshing(false);
  };

  // Opciones de ordenamiento (bilingüe via t())
  const sortOptionsIA = [
    { key: 'default', icon: '🎯', label: t('sort_default'),  hint: t('sort_hint_default_ia') },
    { key: 'today',   icon: '📈', label: t('sort_today'),    hint: t('sort_hint_today') },
    { key: '7d',      icon: '📈', label: t('sort_7d'),       hint: t('sort_hint_7d') },
    { key: '30d',     icon: '📈', label: t('sort_30d'),      hint: t('sort_hint_30d') },
    { key: 'prob',    icon: '🎯', label: t('sort_prob'),     hint: t('sort_hint_prob') },
    { key: 'upside',  icon: '🚀', label: t('sort_upside'),   hint: t('sort_hint_upside') },
    { key: 'ticker',  icon: '🔤', label: t('sort_ticker'),   hint: t('sort_hint_ticker') },
  ];
  const currentSortLabelIA = (sortOptionsIA.find(o => o.key === sortBy) || sortOptionsIA[0]).label;

  const sortedSignals = (list) => {
    if (sortBy === 'default') return list;
    const getStats = (s) => ({
      prob: s.confianza || s.probabilidad || 0,
      chg24: s.precio24h > 0 && s.precio ? ((s.precio - s.precio24h) / s.precio24h * 100) : 0,
      chg7d: s.precio7d > 0 && s.precio ? ((s.precio - s.precio7d) / s.precio7d * 100) : 0,
      chg30d: s.precio30d > 0 && s.precio ? ((s.precio - s.precio30d) / s.precio30d * 100) : 0,
      upside: s.upside || 0,
      ticker: s.simbolo || '',
    });
    return [...list].sort((a, b) => {
      const A = getStats(a); const B = getStats(b);
      if (sortBy === 'today')  return B.chg24 - A.chg24;
      if (sortBy === '7d')     return B.chg7d - A.chg7d;
      if (sortBy === '30d')    return B.chg30d - A.chg30d;
      if (sortBy === 'prob')   return B.prob - A.prob;
      if (sortBy === 'upside') return B.upside - A.upside;
      if (sortBy === 'ticker') return A.ticker.localeCompare(B.ticker);
      return 0;
    });
  };

  const filteredSignals = () => {
    const base = signals.filter(s => {
      // Filtro "Mi Portfolio": si está activo, solo pasan los símbolos del portfolio
      if (onlyPortfolio && !portfolioSymbols.includes(s.simbolo)) return false;
      if (filter === 'todo') return true;
      if (filter === 'alcista') return s.direccion === 'ALCISTA';
      if (filter === 'bajista') return s.direccion === 'BAJISTA';
      if (filter === 'alta') return s.direccion === 'ALTA CONV-IA';
      const t = (s.tipo || '').toLowerCase();
      if (filter === 'cripto') return t === 'cripto' || t === 'stable';
      if (filter === 'accion') return t === 'accion';
      if (filter === 'etf') return t === 'etf';
      if (filter === 'metal') return t === 'metal';
      if (filter === 'commodity') return t === 'commodity' || t === 'materia_prima';
      if (filter === 'bono') return t === 'bono';
      return true;
    });
    return sortedSignals(base);
  };

  const counts = {
    alcista: signals.filter(s => s.direccion === 'ALCISTA').length,
    bajista: signals.filter(s => s.direccion === 'BAJISTA').length,
    alta: signals.filter(s => s.direccion === 'ALTA CONV-IA').length,
  };

  const [shareModal, setShareModal] = useState(null);

  const shareSignal = (sig) => {
    setShareModal(sig);
  };

  const doShare = async (platform) => {
    if (!shareModal) return;
    const sig = shareModal;
    const p = prices[sig.simbolo];
    const msg = `AUREX IA — SENAL ${sig.direccion === 'ALCISTA' ? '📈' : sig.direccion === 'BAJISTA' ? '📉' : '⚡'}\n${sig.simbolo} (${sig.nombre})\n━━━━━━━━━━━━━━━━\n${sig.direccion} — PROB. ${sig.probabilidad}%${p ? `\nPrecio: ${fmtPrice(p.price)} (${fmtPct(p.change, 2)})` : ''}\n━━━━━━━━━━━━━━━━\nSenal generada por AUREX IA\nhttps://aurex.live`;
    const encoded = encodeURIComponent(msg);
    setShareModal(null);
    if (platform === 'whatsapp') {
      Linking.openURL(`https://wa.me/?text=${encoded}`).catch(() => {});
    } else if (platform === 'telegram') {
      Linking.openURL(`https://t.me/share/url?url=https://aurex.live&text=${encoded}`).catch(() => {});
    } else if (platform === 'mail') {
      Linking.openURL(`mailto:?subject=AUREX IA - ${sig.simbolo}&body=${encoded}`).catch(() => {});
    }
  };

  const dirColor = (dir) => dir === 'ALCISTA' ? C.green : dir === 'BAJISTA' ? C.red : C.gold;
  const dirBg = (dir) => dir === 'ALCISTA' ? C.greenBg : dir === 'BAJISTA' ? C.redBg : C.goldBg;

  if (loading) {
    return <View style={[st.container, { justifyContent: 'center', alignItems: 'center' }]}><ActivityIndicator size="large" color={C.gold} /></View>;
  }

  return (
    <SafeAreaView style={st.container}>
      {/* Banner evento critico — scroll animado identico a PWA */}
      <EventBannerIA />

      {/* Header con contadores */}
      <View style={st.header}>
        <View style={st.headerTop}>
          <View style={{ flex: 1 }} />
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <AurexLogo size={32} />
            <Text style={st.headerTitle}>AUREX</Text>
            <Text style={{ fontSize: 13, color: '#E6EDF3' }}>- {t('senales_ia')}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'flex-end', gap: 10 }}>
            <TouchableOpacity onPress={() => setShowLegal(true)} style={{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: C.card, borderWidth: 1, borderColor: C.gold, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 }}>
              <Text style={{ fontSize: 14 }}>⚖️</Text>
              <Text style={{ fontSize: 9, color: C.gold, fontWeight: '800' }}>▼</Text>
            </TouchableOpacity>
            <LiveIndicator lastUpdate={lastUpdate} />
            <BellButton onPress={() => navigation.navigate('MisAlertas')} />
          </View>
        </View>

        <View style={st.countersRow}>
          <TouchableOpacity style={[st.counter, { borderColor: C.green }]} onPress={() => setFilter(filter === 'alcista' ? 'todo' : 'alcista')}>
            <Text style={[st.counterNum, { color: C.green }]}>{counts.alcista}</Text>
            <Text style={[st.counterLabel, { color: C.green }]}>{t('alcistas_count')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[st.counter, { borderColor: C.red }]} onPress={() => setFilter(filter === 'bajista' ? 'todo' : 'bajista')}>
            <Text style={[st.counterNum, { color: C.red }]}>{counts.bajista}</Text>
            <Text style={[st.counterLabel, { color: C.red }]}>{t('bajistas_count')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[st.counter, { borderColor: C.gold }]} onPress={() => setFilter(filter === 'alta' ? 'todo' : 'alta')}>
            <Text style={[st.counterNum, { color: C.gold }]}>{counts.alta}</Text>
            <Text style={[st.counterLabel, { color: C.gold }]}>{t('alta_conv')}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Fila: Mi Portfolio · Ordenar · Variables (compacto) */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 14, marginTop: 12, marginBottom: 8, gap: 6 }}>
        <TouchableOpacity
          onPress={() => setOnlyPortfolio(!onlyPortfolio)}
          style={{ paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8, borderWidth: 1, borderColor: C.gold, backgroundColor: onlyPortfolio ? C.gold : `${C.gold}18` }}
        >
          <Text style={{ fontSize: 10, color: onlyPortfolio ? '#000' : C.gold, fontWeight: '800' }}>💼 {t('mi_portfolio_ia')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowSortMenu(true)}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 4, paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8, borderWidth: 1, borderColor: C.border2, backgroundColor: C.card }}
        >
          <Text style={{ fontSize: 10, color: C.textSec, fontWeight: '600' }}>{t('ordenar_short')}</Text>
          <Text style={{ fontSize: 10, color: C.text, fontWeight: '700' }}>{currentSortLabelIA}</Text>
          <Text style={{ fontSize: 10, color: C.gold, fontWeight: '800' }}>↓</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowVarsModal(true)}
          style={{ paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8, borderWidth: 1, borderColor: '#58A6FF80', backgroundColor: '#58A6FF18' }}
        >
          <Text style={{ fontSize: 10, color: '#2B7ED9', fontWeight: '700' }}>🔍 {t('variables_short')}</Text>
        </TouchableOpacity>
      </View>

      {/* Filtros — pills con colores identicos a PWA */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ borderBottomWidth: 1, borderBottomColor: C.border, maxHeight: 44, paddingVertical: 6 }} contentContainerStyle={{ paddingHorizontal: 10, gap: 6 }}>
        {getFilters(t).map(f => {
          const isActive = filter === f.key;
          return (
            <TouchableOpacity key={f.key} onPress={() => {
              setFilter(f.key);
              // "Todo" es el reset total → también desactiva Mi Portfolio
              if (f.key === 'todo') setOnlyPortfolio(false);
            }}
              style={{ paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20, borderWidth: 1, borderColor: isActive ? f.color : `${f.border}60`, backgroundColor: isActive ? f.color : 'transparent' }}>
              <Text style={{ fontSize: 11, fontWeight: '700', color: isActive ? (f.key === 'todo' ? '#fff' : '#000') : f.color }}>{f.label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Titulo lista */}
      <View style={st.listHeader}>
        <Text style={st.listTitle}>{filteredSignals().length} {t('senales_de')} {TOTAL_ASSETS} {t('activos_ordenadas')}</Text>
      </View>

      {/* Lista */}
      <ScrollView style={{ flex: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={C.gold} />}>
        {filteredSignals().map((sig, idx) => {
          const p = prices[sig.simbolo];
          const isExpanded = expanded === sig.simbolo;
          const color = dirColor(sig.direccion);
          const bg = dirBg(sig.direccion);

          return (
            <View key={sig.simbolo}>
              <TouchableOpacity style={st.signalRow} onPress={() => setExpanded(isExpanded ? null : sig.simbolo)} activeOpacity={0.7}>
                {/* Logo — fondo con color del activo como en PWA */}
                {(() => {
                  const activo = ALL_ASSETS.find(a => a.s === sig.simbolo);
                  const actColor = activo?.color || color;
                  return (
                    <View style={[st.sigLogo, { backgroundColor: `${actColor}15`, borderWidth: 1.5, borderColor: `${actColor}40`, overflow: 'hidden' }]}>
                      <AssetLogo sym={sig.simbolo} tipo={sig.tipo || activo?.t} logo={activo?.logo} size={22} color={actColor} />
                    </View>
                  );
                })()}

                {/* Centro */}
                <View style={st.sigCenter}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <Text style={st.sigSym}>{sig.simbolo}</Text>
                    <View style={[st.dirBadge, { backgroundColor: bg, borderColor: color }]}>
                      <Text style={[st.dirText, { color }]}>
                        {sig.direccion === 'ALTA CONV-IA' ? t('alta_conv_badge') : sig.direccion === 'ALCISTA' ? t('alcista_badge') : t('bajista_badge')}
                      </Text>
                    </View>
                  </View>
                  <Text style={st.sigName}>{sig.nombre || IA_ACTIVOS.find(a => a.s === sig.simbolo)?.n}</Text>
                  {/* PROB IA + upside esperado + plazo (reemplaza estrellas) */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 3, flexWrap: 'wrap' }}>
                    <Text style={{ fontSize: 10, color: C.textSec }}>{t('prob_ia')} <Text style={{ color, fontWeight: '700' }}>{sig.probabilidad}%</Text></Text>
                    {sig.upside != null && (
                      <Text style={{ fontSize: 10, color: C.textDim }}>·</Text>
                    )}
                    {sig.upside != null && (
                      <Text style={{ fontSize: 10, color, fontWeight: '700' }}>
                        {sig.upside >= 0 ? '↑+' : '↓'}{Math.abs(sig.upside).toFixed(1)}% {t('al_objetivo')}
                      </Text>
                    )}
                  </View>
                </View>

                {/* Derecha — 1) Precio 2) Ult.Cierre + % 3) Dots */}
                <View style={st.sigRight}>
                  {p && (
                    <Text style={{ fontSize: 13, fontWeight: '700', color: C.text }}>{fmtPrice(p.price)}</Text>
                  )}
                  {p && (() => {
                    const tipoL = (sig.tipo || '').toLowerCase();
                    const isCrypto = tipoL === 'cripto' || tipoL === 'stable';
                    return (
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 }}>
                        {!isCrypto && <Text style={{ fontSize: 9, color: C.gold, fontWeight: '700' }}>{t('ult_cierre')}</Text>}
                        <Text style={{ fontSize: 11, fontWeight: '500', color: p.change >= 0 ? C.green : C.red }}>
                          {fmtPct(p.change, 2)}
                        </Text>
                      </View>
                    );
                  })()}
                  {/* Dots — solo verde y roja (tendencia definida) como PWA */}
                  <View style={[st.dotsRow, { justifyContent: 'flex-end', marginTop: 3 }]}>
                    {Object.values(sig.scores || {}).slice(0, 10).filter(v => Math.abs(v) > 0.01).map((v, i) => (
                      <View key={i} style={[st.dot, { backgroundColor: v > 0.01 ? C.green : C.red }]} />
                    ))}
                  </View>
                </View>
              </TouchableOpacity>
              {/* Barra de probabilidad — identica a PWA */}
              <View style={{ marginHorizontal: 13, marginTop: -4, marginBottom: 4 }}>
                <View style={{ height: 3, backgroundColor: '#21262D', borderRadius: 2 }}>
                  <View style={{ height: 3, width: `${Math.min(sig.probabilidad, 100)}%`, backgroundColor: color, borderRadius: 2 }} />
                </View>
              </View>

              {/* Panel expandido — identico a PWA _buildIADetail */}
              {isExpanded && (() => {
                const sc = sig.scores || {};
                const probPrincipal = sig.prob_principal || sig.probPrincipal || sig.probabilidad;
                const objColor = sig.direccion === 'BAJISTA' ? C.red : C.green;
                const stopColor = sig.direccion === 'BAJISTA' ? '#FF9500' : C.red;
                const upsideVal = sig.upside != null ? sig.upside : 0;
                const upsideLabel = upsideVal < 0 ? t('downside_label') : t('upside_label');
                const upsideColor = upsideVal < 0 ? C.red : C.green;

                const VAR_DEFS = [
                  { k: 'tendencia', label: t('v_tendencia_name'), fmt: v => `${v > 0 ? '+' : ''}${(v * 12.5).toFixed(1)}%` },
                  { k: 'rsi', label: 'RSI14', fmt: () => `RSI ${sig.rsi || 50}` },
                  { k: 'volumen', label: t('v_volumen_name'), fmt: () => `${(sig.volRel || 1).toFixed(1)}x ${t('fmt_prom')}` },
                  { k: 'volatilidad', label: t('v_volat_name'), fmt: v => v > 0.01 ? t('fmt_baja') : v < -0.01 ? t('fmt_alta') : t('fmt_normal') },
                  { k: 'correlacion', label: t('v_corr_name'), fmt: v => v > 0.01 ? t('fmt_positiva') : v < -0.01 ? t('fmt_negativa') : t('fmt_neutral') },
                  { k: 'oro_petroleo', label: t('v_oro_name'), fmt: v => v > 0.01 ? t('fmt_favorable') : v < -0.01 ? t('fmt_adverso') : t('fmt_neutral') },
                  { k: 'macro', label: t('v_macro_name'), fmt: v => v < -0.01 ? t('fmt_evento_activo') : t('fmt_sin_eventos') },
                  { k: 'earnings', label: t('v_earnings_name'), fmt: v => v > 0.01 ? t('fmt_proximos') : t('fmt_sin_reporte') },
                  { k: 'macd', label: t('v_macd_name'), fmt: v => v > 0.01 ? t('fmt_alcista') : v < -0.01 ? t('fmt_bajista') : t('fmt_neutral') },
                  { k: 'soporte_resist', label: t('v_sr_name'), fmt: v => v > 0.01 ? t('cerca_soporte') : v < -0.01 ? t('cerca_resistencia') : t('zona_media') },
                ];
                const posVars = VAR_DEFS.filter(d => (sc[d.k] || 0) > 0.01);
                const negVars = VAR_DEFS.filter(d => (sc[d.k] || 0) < -0.01);
                const neuVars = VAR_DEFS.filter(d => Math.abs(sc[d.k] || 0) <= 0.01);

                return (
                  <View style={st.detailPanel}>
                    {/* X de cierre */}
                    <TouchableOpacity onPress={() => setExpanded(null)} style={{ position: 'absolute', top: 6, right: 8, width: 32, height: 32, borderRadius: 16, backgroundColor: C.border, borderWidth: 1.5, borderColor: C.textDim, alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                      <Text style={{ fontSize: 16, fontWeight: '700', color: C.text }}>✕</Text>
                    </TouchableOpacity>
                    {/* Card principal con direccion + probabilidad */}
                    <View style={[st.detailMainCard, { backgroundColor: `${color}15`, borderColor: `${color}40` }]}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                        <Text style={{ fontSize: 13, fontWeight: '700', color }}>
                          {sig.direccion === 'ALCISTA' ? '+' : sig.direccion === 'BAJISTA' ? '-' : '⚡'} {sig.direccion === 'ALTA CONV-IA' ? 'ALTA CONV-IA' : sig.direccion}
                        </Text>
                        <View style={[st.principalBadge, { backgroundColor: color }]}>
                          <Text style={{ color: '#000', fontSize: 11, fontWeight: '800' }}>{t('principal_upper')} {probPrincipal}%</Text>
                        </View>
                      </View>

                      {/* Alta conv sub-direccion */}
                      {sig.direccion === 'ALTA CONV-IA' && sig.subDireccion && (
                        <View style={[st.subDirBadge, { backgroundColor: sig.subDireccion === 'ALCISTA' ? C.greenBg : C.redBg, marginBottom: 6 }]}>
                          <Text style={{ color: sig.subDireccion === 'ALCISTA' ? C.green : C.red, fontSize: 11, fontWeight: '700' }}>
                            {sig.subDireccion === 'ALCISTA' ? '↑' : '↓'} {sig.subDireccion}
                          </Text>
                        </View>
                      )}

                      {/* Build 18 Bloque 2: Justificacion (motivos) solo PRO/ELITE */}
                      {isPro && sig.motivos && sig.motivos.length > 0 && (
                        <View>
                          <Text style={{ fontSize: 11, fontWeight: '600', color: C.textSec, letterSpacing: 0.5, marginBottom: 6 }}>{t('justificacion_analisis')}</Text>
                          {sig.motivos.slice(0, 5).map((m, mi) => (
                            <View key={mi} style={{ flexDirection: 'row', gap: 6, marginBottom: 5 }}>
                              <Text style={{ color, fontWeight: '700', flexShrink: 0 }}>{'->'}</Text>
                              <Text style={{ fontSize: 11, color: '#C9D1D9', lineHeight: 16 }}>{m}</Text>
                            </View>
                          ))}
                        </View>
                      )}
                      {!isPro && (
                        <TouchableOpacity onPress={() => navigation.navigate('Subscription')} style={{ marginTop: 6, padding: 10, borderRadius: 8, backgroundColor: `${C.gold}15`, borderWidth: 1, borderColor: `${C.gold}40`, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                          <Text style={{ fontSize: 14 }}>🔒</Text>
                          <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 11, fontWeight: '700', color: C.gold }}>Razonamiento detallado en señales IA</Text>
                            <Text style={{ fontSize: 10, color: C.textSec, marginTop: 2 }}>Disponible en ELITE</Text>
                          </View>
                        </TouchableOpacity>
                      )}
                    </View>

                    {/* Objetivo / Stop / Upside cards */}
                    <View style={{ flexDirection: 'row', gap: 8, marginBottom: 10 }}>
                      <View style={st.metricCard}>
                        <Text style={st.metricLabel}>{t('objetivo')}</Text>
                        <Text style={[st.metricVal, { color: objColor }]}>{sig.objetivo ? fmtPrice(sig.objetivo) : '---'}</Text>
                      </View>
                      <View style={st.metricCard}>
                        <Text style={st.metricLabel}>{t('stop_short')}</Text>
                        <Text style={[st.metricVal, { color: stopColor }]}>{sig.stop ? fmtPrice(sig.stop) : '---'}</Text>
                      </View>
                      <View style={st.metricCard}>
                        <Text style={st.metricLabel}>{upsideLabel}</Text>
                        <Text style={[st.metricVal, { color: upsideColor }]}>{upsideVal >= 0 ? '+' : ''}{upsideVal.toFixed(1)}%</Text>
                      </View>
                    </View>

                    {/* Build final V5: texto banner ajustado al copy publicado (fila "RSI y MACD avanzado: solo ELITE") */}
                    {!isElite && (
                      <TouchableOpacity onPress={() => navigation.navigate('Subscription')} style={{ marginBottom: 10, padding: 10, borderRadius: 8, backgroundColor: `${C.gold}15`, borderWidth: 1, borderColor: `${C.gold}40`, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <Text style={{ fontSize: 14 }}>🔒</Text>
                        <View style={{ flex: 1 }}>
                          <Text style={{ fontSize: 11, fontWeight: '700', color: C.gold }}>Análisis técnico avanzado (RSI, MACD)</Text>
                          <Text style={{ fontSize: 10, color: C.textSec, marginTop: 2 }}>Disponible en ELITE</Text>
                        </View>
                      </TouchableOpacity>
                    )}
                    {isElite && (
                    <View style={{ marginBottom: 10 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }}>
                        <Text style={{ fontSize: 10, color: C.textSec, fontWeight: '600', letterSpacing: 0.3 }}>{t('variables_modelo_upper')}</Text>
                        <Text style={{ fontSize: 10 }}>
                          <Text style={{ color: C.green, fontWeight: '700' }}>{'→'} {posVars.length} {t('alcistas_count').toLowerCase()}</Text>
                          <Text style={{ color: C.textSec }}> · </Text>
                          <Text style={{ color: C.red, fontWeight: '700' }}>{'↓'} {negVars.length} {t('bajistas_count').toLowerCase()}</Text>
                        </Text>
                      </View>
                      {/* Positivas */}
                      {posVars.map(d => (
                        <View key={d.k} style={[st.varRow, { backgroundColor: '#3FB95010', borderLeftColor: C.green }]}>
                          <Text style={{ fontSize: 10, color: C.green, fontWeight: '600' }}>{'→'} {d.label}</Text>
                          <Text style={{ fontSize: 10, color: C.green }}>{d.fmt(sc[d.k])}</Text>
                        </View>
                      ))}
                      {/* Negativas */}
                      {negVars.map(d => (
                        <View key={d.k} style={[st.varRow, { backgroundColor: '#FF444410', borderLeftColor: C.red }]}>
                          <Text style={{ fontSize: 10, color: C.red, fontWeight: '600' }}>{'↓'} {d.label}</Text>
                          <Text style={{ fontSize: 10, color: C.red }}>{d.fmt(sc[d.k])}</Text>
                        </View>
                      ))}
                      {/* Neutrales */}
                      {neuVars.length > 0 && (
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 3, marginTop: 2 }}>
                          {neuVars.map(d => (
                            <View key={d.k} style={{ backgroundColor: C.border, borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 }}>
                              <Text style={{ fontSize: 9, color: C.textDim }}>{'—'} {d.label}</Text>
                            </View>
                          ))}
                        </View>
                      )}
                    </View>
                    )}

                    {/* Build 18 Bloque 2: Contexto tendencia solo PRO/ELITE */}
                    {isPro && (
                    <View style={{ marginBottom: 10 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                        <Text style={{ fontSize: 10, color: C.textSec, fontWeight: '600' }}>{t('contexto_tendencia')}</Text>
                        <View style={{ flexDirection: 'row', gap: 4 }}>
                          {[
                            { tf: '24h', chg: sig.precio24h > 0 && sig.precio ? ((sig.precio - sig.precio24h) / sig.precio24h * 100) : null, isDefault: true },
                            { tf: '7d', chg: sig.precio7d > 0 && sig.precio ? ((sig.precio - sig.precio7d) / sig.precio7d * 100) : null },
                            { tf: '30d', chg: sig.precio30d > 0 && sig.precio ? ((sig.precio - sig.precio30d) / sig.precio30d * 100) : null },
                          ].map(item => (
                            <View key={item.tf} style={[st.tfCard, item.isDefault && { borderColor: '#D4A01760' }]}>
                              <Text style={{ fontSize: 8, color: item.isDefault ? C.gold : C.textDim }}>{item.tf}</Text>
                              <Text style={{ fontSize: 10, fontWeight: '700', color: item.chg == null ? C.textDim : item.chg >= 0 ? C.green : C.red }}>
                                {item.chg == null ? '—' : `${item.chg >= 0 ? '+' : ''}${item.chg.toFixed(1)}%`}
                              </Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    </View>
                    )}

                    {/* Otros escenarios */}
                    <Text style={{ fontSize: 10, color: C.textSec, marginBottom: 6, fontWeight: '600' }}>{t('otros_escenarios')}</Text>
                    <View style={{ flexDirection: 'row', gap: 6, marginBottom: 12 }}>
                      {sig.direccion !== 'ALCISTA' && (
                        <View style={[st.escenarioCard, { backgroundColor: '#3FB95015', borderColor: '#3FB95040' }]}>
                          <Text style={{ fontSize: 9, color: C.green }}>{t('alcista')}</Text>
                          <Text style={{ fontSize: 13, fontWeight: '700', color: C.green }}>{sig.prob_alcista || sig.probAlcista || '---'}%</Text>
                        </View>
                      )}
                      {sig.direccion !== 'BAJISTA' && (
                        <View style={[st.escenarioCard, { backgroundColor: '#FF444415', borderColor: '#FF444440' }]}>
                          <Text style={{ fontSize: 9, color: C.red }}>{t('bajista')}</Text>
                          <Text style={{ fontSize: 13, fontWeight: '700', color: C.red }}>{sig.prob_bajista || sig.probBajista || '---'}%</Text>
                        </View>
                      )}
                      {sig.direccion !== 'ALTA CONV-IA' && (
                        <View style={[st.escenarioCard, { backgroundColor: '#D4A01715', borderColor: '#D4A01740' }]}>
                          <Text style={{ fontSize: 9, color: C.gold }}>{t('alta_conv')}</Text>
                          <Text style={{ fontSize: 13, fontWeight: '700', color: C.gold }}>{sig.prob_alta_conf || sig.probAltaConf || '---'}%</Text>
                        </View>
                      )}
                    </View>

                    {/* Compartir */}
                    <TouchableOpacity style={st.shareBtn} onPress={() => shareSignal(sig)}>
                      <Text style={st.shareBtnText}>📤 {t('compartir_senal')}</Text>
                    </TouchableOpacity>
                  </View>
                );
              })()}
            </View>
          );
        })}
        {/* Disclaimer removido — ya está disponible en la ⚖️ del header (evita duplicación) */}
      </ScrollView>

      {/* Modal Variables del Modelo — identico a PWA */}
      {showVarsModal && (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#000000CC', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
          <View style={{ backgroundColor: C.card, borderRadius: 16, width: '92%', maxWidth: 420, padding: 20, borderWidth: 1, borderColor: C.border2, maxHeight: '85%' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <Text style={{ fontSize: 16, fontWeight: '700', color: C.text }}>{t('aurex_ia_variables')}</Text>
              <TouchableOpacity onPress={() => setShowVarsModal(false)} style={{ width: 32, height: 32, borderRadius: 6, backgroundColor: C.border, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, color: C.textSec }}>✕</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 11, color: C.textSec, marginBottom: 10 }}>{t('motor_senales_v7')}</Text>

            {/* Resumen mercado */}
            <View style={{ backgroundColor: C.bg, borderRadius: 8, padding: 10, marginBottom: 10, borderWidth: 0.5, borderColor: C.border }}>
              <Text style={{ fontSize: 11, color: C.textSec }}>{t('mercado_ahora')}  <Text style={{ color: C.green, fontWeight: '700' }}>→ {counts.alcista} {t('al_alza')}</Text>  ·  <Text style={{ color: C.red, fontWeight: '700' }}>↓ {counts.bajista} {t('a_la_baja')}</Text></Text>
            </View>

            <Text style={{ fontSize: 10, color: C.textSec, marginBottom: 12, lineHeight: 15 }}>{t('cada_senal_intro')}</Text>

            <ScrollView>
              {[
                { n: t('v_tendencia_name'), desc: t('v_tendencia_desc'), peso: t('peso_alta'), color: C.green, arrow: '→' },
                { n: t('v_rsi_name'), desc: t('v_rsi_desc'), peso: t('peso_alta'), color: C.green, arrow: '—' },
                { n: t('v_volumen_name'), desc: t('v_volumen_desc'), peso: t('peso_alta'), color: C.green, arrow: '—' },
                { n: t('v_volat_name'), desc: t('v_volat_desc'), peso: t('peso_media'), color: C.gold, arrow: '—' },
                { n: t('v_corr_name'), desc: t('v_corr_desc'), peso: t('peso_media'), color: C.gold, arrow: '—' },
                { n: t('v_oro_name'), desc: t('v_oro_desc'), peso: t('peso_media'), color: C.gold, arrow: '↓' },
                { n: t('v_macro_name'), desc: t('v_macro_desc'), peso: t('peso_media'), color: C.gold, arrow: '↓' },
                { n: t('v_earnings_name'), desc: t('v_earnings_desc'), peso: t('peso_media'), color: C.gold, arrow: '—' },
                { n: t('v_macd_name'), desc: t('v_macd_desc'), peso: t('peso_alta'), color: C.green, arrow: '—' },
                { n: t('v_sr_name'), desc: t('v_sr_desc'), peso: t('peso_alta'), color: C.green, arrow: '—' },
              ].map((v, i) => (
                <View key={i} style={{ marginBottom: 8, backgroundColor: v.arrow === '→' ? '#3FB95010' : v.arrow === '↓' ? '#F8514910' : C.bg, borderLeftWidth: 3, borderLeftColor: v.arrow === '→' ? C.green : v.arrow === '↓' ? C.red : C.border, borderRadius: 8, padding: 10 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <Text style={{ fontSize: 13, fontWeight: '700', color: v.arrow === '→' ? C.green : v.arrow === '↓' ? C.red : C.text }}>{v.arrow} {i + 1}. {v.n}</Text>
                    <Text style={{ fontSize: 10, color: C.textSec }}>{t('peso_label')} {v.peso}</Text>
                  </View>
                  <Text style={{ fontSize: 10, color: C.textSec, lineHeight: 14 }}>{v.desc}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      )}

      {/* Modal Compartir — identico a PWA (WhatsApp, Telegram, Mail) */}
      {shareModal && (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#000000CC', justifyContent: 'flex-end', zIndex: 200 }}>
          <View style={{ backgroundColor: '#1C1C1E', borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 20, paddingBottom: 30 }}>
            <Text style={{ fontSize: 15, fontWeight: '700', color: C.text, textAlign: 'center', marginBottom: 16 }}>{t('compartir_senal')} {shareModal.simbolo}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 16, marginBottom: 16 }}>
              <TouchableOpacity onPress={() => doShare('whatsapp')} style={{ width: 90, height: 80, backgroundColor: '#0D2818', borderWidth: 1, borderColor: '#25D36640', borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 24, marginBottom: 4 }}>💬</Text>
                <Text style={{ fontSize: 11, color: '#25D366', fontWeight: '600' }}>WhatsApp</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => doShare('telegram')} style={{ width: 90, height: 80, backgroundColor: '#0D1A2E', borderWidth: 1, borderColor: '#0088CC40', borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 24, marginBottom: 4 }}>✈️</Text>
                <Text style={{ fontSize: 11, color: '#0088CC', fontWeight: '600' }}>Telegram</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => doShare('mail')} style={{ width: 90, height: 80, backgroundColor: '#1A1200', borderWidth: 1, borderColor: '#D4A01740', borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 24, marginBottom: 4 }}>📧</Text>
                <Text style={{ fontSize: 11, color: '#D4A017', fontWeight: '600' }}>Mail</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setShareModal(null)} style={{ backgroundColor: '#2C2C2E', borderRadius: 10, padding: 14, alignItems: 'center' }}>
              <Text style={{ fontSize: 14, color: C.textSec, fontWeight: '500' }}>{t('cancelar')}</Text>
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
            {sortOptionsIA.map((opt) => {
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

      {/* Modal Aviso Legal */}
      <Modal animationType="slide" transparent={true} visible={showLegal} onRequestClose={() => setShowLegal(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center', padding: 16 }}>
          <View style={{ backgroundColor: C.card, borderRadius: 20, padding: 24, width: '92%', maxWidth: 380, borderWidth: 2, borderColor: C.gold, shadowColor: '#000', shadowOffset: { width: 0, height: 15 }, shadowOpacity: 0.55, shadowRadius: 28, elevation: 22 }}>
            <Text style={{ fontSize: 16, fontWeight: '700', color: C.text, textAlign: 'center', marginBottom: 16 }}>⚖️ {t('aviso_legal_upper')}</Text>
            <Text style={{ fontSize: 12, color: C.textSec, lineHeight: 18, marginBottom: 12 }}>
              {t('disclaimer_ia')}
            </Text>
            <Text style={{ fontSize: 11, color: C.textDim, textAlign: 'center', marginBottom: 16 }}>© 2026 AUREX — Fernando Moscon</Text>
            <TouchableOpacity onPress={() => setShowLegal(false)} style={{ alignItems: 'center', paddingVertical: 10 }}>
              <Text style={{ fontSize: 14, color: C.gold, fontWeight: '600' }}>✕ {t('cerrar')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const makeStyles = (C) => StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },

  // Header
  header: { paddingHorizontal: 14, paddingTop: 10, paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: C.border },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  headerTitle: { fontSize: 16, fontWeight: '600', color: C.gold, letterSpacing: 1 },
  liveWrap: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  liveDot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: C.green },
  liveText: { fontSize: 9, color: C.green, fontWeight: '700' },

  // Counters
  countersRow: { flexDirection: 'row', gap: 6 },
  counter: { flex: 1, backgroundColor: C.card, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 8, alignItems: 'center', borderWidth: 1.5 },
  counterNum: { fontSize: 20, fontWeight: '800' },
  counterLabel: { fontSize: 7, fontWeight: '600', letterSpacing: 0.5, marginTop: 2 },

  // Filters
  filtersRow: { borderBottomWidth: 1, borderBottomColor: C.border, maxHeight: 38 },
  filterBtn: { paddingHorizontal: 10, paddingVertical: 8, marginRight: 2 },
  filterBtnActive: { borderBottomWidth: 2, borderBottomColor: C.gold },
  filterText: { fontSize: 10, fontWeight: '500', color: C.textSec },
  filterTextActive: { color: C.gold },

  // List header
  listHeader: { paddingHorizontal: 13, paddingVertical: 6, backgroundColor: '#080C10', borderBottomWidth: 0.5, borderBottomColor: C.border },
  listTitle: { fontSize: 9, fontWeight: '600', color: C.textDim, letterSpacing: 0.8 },

  // Signal row
  signalRow: { flexDirection: 'row', alignItems: 'center', gap: 9, paddingVertical: 12, paddingHorizontal: 13, borderBottomWidth: 0.5, borderBottomColor: '#13171D' },
  sigLogo: { width: 34, height: 34, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  sigLogoText: { fontSize: 13, fontWeight: '700' },
  sigCenter: { flex: 1, minWidth: 0 },
  sigSym: { fontSize: 13, fontWeight: '600', color: C.text },
  sigName: { fontSize: 10, color: C.textDim, marginTop: 1 },
  dirBadge: { paddingHorizontal: 6, paddingVertical: 1, borderRadius: 6, borderWidth: 0.5 },
  dirText: { fontSize: 8, fontWeight: '700' },
  dotsRow: { flexDirection: 'row', gap: 2, marginTop: 3 },
  dot: { width: 5, height: 5, borderRadius: 2.5 },
  sigRight: { alignItems: 'flex-end', minWidth: 80 },
  probText: { fontSize: 11, fontWeight: '800' },
  starsText: { fontSize: 8, marginTop: 1 },
  sigPrice: { fontSize: 9, fontWeight: '500', marginTop: 2 },

  // Detail panel — identico a PWA _buildIADetail
  detailPanel: { backgroundColor: C.card, borderBottomWidth: 1, borderBottomColor: C.border, padding: 14 },
  detailMainCard: { borderWidth: 1, borderRadius: 10, padding: 10, paddingHorizontal: 12, marginBottom: 10 },
  principalBadge: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2 },
  subDirBadge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  metricCard: { flex: 1, backgroundColor: C.border, borderRadius: 8, padding: 8, alignItems: 'center' },
  metricLabel: { fontSize: 9, color: C.textSec, marginBottom: 2 },
  metricVal: { fontSize: 12, fontWeight: '700' },
  varRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 4, paddingHorizontal: 8, borderLeftWidth: 2, borderTopRightRadius: 6, borderBottomRightRadius: 6, marginBottom: 3 },
  tfCard: { backgroundColor: C.border, borderWidth: 1, borderColor: C.border2, borderRadius: 6, paddingVertical: 3, paddingHorizontal: 7, alignItems: 'center' },
  escenarioCard: { flex: 1, borderWidth: 1, borderRadius: 8, padding: 6, alignItems: 'center' },
  shareBtn: { backgroundColor: C.card, borderWidth: 1, borderColor: C.border2, borderRadius: 8, padding: 10, alignItems: 'center' },
  shareBtnText: { fontSize: 12, color: C.text, fontWeight: '500' },
});
