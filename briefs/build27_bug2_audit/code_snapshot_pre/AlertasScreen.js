import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Switch, Linking, RefreshControl, Alert, TextInput, Modal, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../lib/supabase';
import { usePlan, planAllowsAlertType } from '../lib/usePlan';
import PlanLimitModal from '../components/PlanLimitModal';

// Build 18 fix #12: mapping id local del toggle → tipo de alerta backend (para gating por plan)
const ALERT_ID_TO_BACKEND_TYPE = {
  ia_cambio: 'cambio_senal',
  ia_alta: 'alta_conviccion_ia',
  ia_umbral: 'umbral',
  ia_portfolio: 'senal_portfolio',
  pulse_zona: 'cambio_zona_pulse',
  pulse_cat: 'por_categoria',
  pulse_thermo: 'termometro_riesgo',
  precio_variacion: 'variacion_brusca',
  precio_maxmin: 'max_min',
  precio_rsi: 'rsi_extremo', // Build 23 Bug B: tipo separado FREE-accesible. RSI sigue calculandose en el motor IA pero el evaluador en backend es nuevo (server.js bloque rsi_extremo).
  ev_fomc: 'fed_fomc',
  ev_cpi: 'cpi_pbi',
  ev_apertura: 'apertura',
  ev_earnings: 'earnings',
  ev_gdelt: 'geopolitica_gdelt',
};
import AsyncStorage from '@react-native-async-storage/async-storage';
import AurexLogo from '../components/AurexLogo';
import LiveIndicator from '../components/LiveIndicator';
import BellButton from '../components/BellButton';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { TOTAL_ASSETS } from '../lib/assets';
import { useT } from '../lib/i18n';
import * as alertasStorage from '../lib/alertasStorage';
import CustomSwitch from '../components/CustomSwitch';

import { useTheme } from '../lib/ThemeContext';

// C global solo para arrays de top-level (los componentes usan useTheme())
const C = {
  bg: '#0D1117', card: '#161B22', border: '#21262D', border2: '#30363D',
  gold: '#D4A017', text: '#E6EDF3', textSec: '#8B949E', textDim: '#555',
  green: '#3FB950', red: '#F85149', greenBg: '#1A3A2A', redBg: '#3A1A1A',
  orange: '#FF6B35', orangeBg: '#2A1A0A',
};

const getAlertSections = (t) => [
  {
    key: 'ia', icon: '🤖', title: t('alertas_ia'),
    desc: t('desc_motor_ia'),
    color: '#A78BFA',
    items: [
      { id: 'ia_cambio', label: t('alert_ia_cambio'), desc: t('alert_ia_cambio_desc') },
      { id: 'ia_alta', label: t('alert_ia_alta'), desc: t('alert_ia_alta_desc') },
      { id: 'ia_umbral', label: t('alert_ia_umbral'), desc: t('alert_ia_umbral_desc'), config: 'threshold' },
      { id: 'ia_portfolio', label: t('alert_ia_port'), desc: t('alert_ia_port_desc') },
    ],
  },
  {
    key: 'pulse', icon: '💓', title: t('alertas_pulse'),
    desc: t('desc_motor_pulse'),
    color: '#EC4899',
    items: [
      { id: 'pulse_zona', label: t('alert_pulse_zona'), desc: t('alert_pulse_zona_desc') },
      { id: 'pulse_cat', label: t('alert_pulse_cat'), desc: t('alert_pulse_cat_desc') },
      { id: 'pulse_thermo', label: t('alert_pulse_thermo'), desc: t('alert_pulse_thermo_desc') },
    ],
  },
  {
    key: 'precio', icon: '💰', title: t('alertas_precio_section'),
    desc: t('desc_precio_rt'),
    color: C.gold,
    items: [
      { id: 'precio_variacion', label: t('alert_precio_var'), desc: t('alert_precio_var_desc'), config: 'pct' },
      { id: 'precio_maxmin', label: t('alert_precio_maxmin'), desc: t('alert_precio_maxmin_desc') },
      { id: 'precio_rsi', label: t('alert_precio_rsi'), desc: t('alert_precio_rsi_desc') },
    ],
  },
  {
    key: 'eventos', icon: '📅', title: t('alertas_eventos_section'),
    desc: t('desc_calendario'),
    color: '#3B82F6',
    items: [
      { id: 'ev_fomc', label: 'FED FOMC', desc: t('alert_fomc_desc') },
      { id: 'ev_cpi', label: 'CPI / PBI', desc: t('alert_cpi_desc') },
      { id: 'ev_apertura', label: t('alert_apertura'), desc: t('alert_apertura_desc') },
      { id: 'ev_earnings', label: t('alert_earnings_portfolio'), desc: t('alert_earnings_portfolio_desc') },
      { id: 'ev_gdelt', label: t('alert_gdelt'), desc: t('alert_gdelt_desc') },
    ],
  },
];

const IA_VARS = [
  { name: 'Tendencia 24h', peso: 'Alto', desc: 'Variacion % del precio en las ultimas 24hs' },
  { name: 'RSI14 Real', peso: 'Alto', desc: 'Indice de Fuerza Relativa — sobrecompra/sobreventa' },
  { name: 'Volumen Real', peso: 'Alto', desc: 'Ratio volumen actual vs promedio 20 dias' },
  { name: 'Volatilidad', peso: 'Medio', desc: 'Amplitud del rango diario del activo' },
  { name: 'Correlacion BTC/SPY', peso: 'Medio', desc: 'Relacion entre cripto y mercado tradicional' },
  { name: 'Oro/Petroleo', peso: 'Medio', desc: 'Precios de activos refugio y energia' },
  { name: 'Macro FED', peso: 'Medio', desc: 'Eventos macro de alto impacto (tasas, empleo)' },
  { name: 'Earnings', peso: 'Medio', desc: 'Reportes de resultados proximos' },
  { name: 'MACD 12/26', peso: 'Alto', desc: 'Convergencia/divergencia de medias moviles' },
  { name: 'Soporte/Resist. 30d', peso: 'Alto', desc: 'Distancia a soporte y resistencia clave' },
];

const PULSE_VARS = [
  { name: 'BTC momentum', fuente: 'Binance', peso: '12%', color: '#F7931A' },
  { name: 'ETH momentum', fuente: 'Binance', peso: '8%', color: '#627EEA' },
  { name: 'VIX', fuente: 'Yahoo', peso: '14%', color: C.red },
  { name: 'SP500 momentum', fuente: 'Yahoo', peso: '8%', color: '#4A9EFF' },
  { name: 'ES=F SP Futuro', fuente: 'Yahoo', peso: '8%', color: '#4A9EFF' },
  { name: 'NQ=F Nasdaq', fuente: 'Yahoo', peso: '6%', color: '#4A9EFF' },
  { name: 'YM=F Dow', fuente: 'Yahoo', peso: '4%', color: '#4A9EFF' },
  { name: 'RTY=F Russell', fuente: 'Yahoo', peso: '3%', color: '#4A9EFF' },
  { name: 'Oro GC=F', fuente: 'Yahoo', peso: '8%', color: C.gold },
  { name: 'Plata SI=F', fuente: 'Yahoo', peso: '4%', color: '#C0C0C0' },
  { name: 'Petroleo CL=F', fuente: 'Yahoo', peso: '5%', color: '#8B5CF6' },
  { name: 'Cobre HG=F', fuente: 'Yahoo', peso: '4%', color: '#F7931A' },
  { name: 'Macro FED', fuente: 'FRED', peso: '12%', color: C.green },
  { name: 'Geopolitica', fuente: 'GDELT', peso: '4%', color: C.red },
];

const getPulseZones = (t) => [
  { range: '0-20', label: t('zone_miedo_extremo'), color: C.red },
  { range: '21-40', label: t('zone_miedo'), color: '#FF6B35' },
  { range: '41-60', label: t('zone_neutral'), color: C.gold },
  { range: '61-80', label: t('zone_codicia'), color: '#22C55E' },
  { range: '81-100', label: t('zone_codicia_extrema'), color: C.green },
];

export default function AlertasScreen() {
  const { theme: C } = useTheme();
  const st = useMemo(() => makeStyles(C), [C]);
  const t = useT();
  const navigation = useNavigation();
  const iaVarsT = useMemo(() => [
    { name: t('v_tendencia_name'), peso: t('peso_alto_short'), desc: t('v_tendencia_desc'), pesoKey: 'Alto' },
    { name: t('v_rsi_name'), peso: t('peso_alto_short'), desc: t('v_rsi_desc'), pesoKey: 'Alto' },
    { name: t('v_volumen_name'), peso: t('peso_alto_short'), desc: t('v_volumen_desc'), pesoKey: 'Alto' },
    { name: t('v_volat_name'), peso: t('peso_medio_short'), desc: t('v_volat_desc'), pesoKey: 'Medio' },
    { name: t('v_corr_name'), peso: t('peso_medio_short'), desc: t('v_corr_desc'), pesoKey: 'Medio' },
    { name: t('v_oro_name'), peso: t('peso_medio_short'), desc: t('v_oro_desc'), pesoKey: 'Medio' },
    { name: t('v_macro_name'), peso: t('peso_medio_short'), desc: t('v_macro_desc'), pesoKey: 'Medio' },
    { name: t('v_earnings_name'), peso: t('peso_medio_short'), desc: t('v_earnings_desc'), pesoKey: 'Medio' },
    { name: t('v_macd_name'), peso: t('peso_alto_short'), desc: t('v_macd_desc'), pesoKey: 'Alto' },
    { name: t('v_sr_name'), peso: t('peso_alto_short'), desc: t('v_sr_desc'), pesoKey: 'Alto' },
  ], [t]);
  // Build 18 fix #10+#11+#12: plan se refresca en focus + AppState; usado para lock icons en toggles premium
  const { plan: userPlan } = usePlan();
  const [toggles, setToggles] = useState({});
  // Build 18 fix #12: paywall modal cuando user toca un toggle bloqueado por plan
  const [planLimitInfo, setPlanLimitInfo] = useState({ visible: false });
  // Helper: dado el id local del toggle, ¿el plan actual lo permite?
  const isAlertAllowed = (toggleId) => {
    const backendType = ALERT_ID_TO_BACKEND_TYPE[toggleId];
    if (!backendType) return true; // toggle sin mapping → asumir permitido
    return planAllowsAlertType(userPlan, backendType);
  };
  const [expanded, setExpanded] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [showVarsModal, setShowVarsModal] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [thresholdIA, setThresholdIA] = useState('75');
  const [thresholdPct, setThresholdPct] = useState('5.00');
  const [pulseFilter, setPulseFilter] = useState('GLOBAL');
  const [alertScope, setAlertScope] = useState('todos');
  const [portfolioSymbols, setPortfolioSymbols] = useState([]);
  const [pulseScores, setPulseScores] = useState({});

  // Build 8: estados nuevos para 3 cards canales + selector múltiple Watchlists
  const [pushEnabled, setPushEnabled] = useState(false);
  const [telegramConnected, setTelegramConnected] = useState(false);
  const [showTelegramPopup, setShowTelegramPopup] = useState(false);
  const [showFaltaTelefono, setShowFaltaTelefono] = useState(false); // Build 16 BUG I: Modal custom AUREX
  const telegramPollRef = useRef(null); // Build 16 BUG Telegram: cleanup polling
  const [userId, setUserId] = useState(null);
  const [watchlistsList, setWatchlistsList] = useState([]);
  const [watchlistsItems, setWatchlistsItems] = useState({});
  const [selectedWatchlistIds, setSelectedWatchlistIds] = useState(null);
  const [showWatchlistsSelector, setShowWatchlistsSelector] = useState(false);
  // Build 9 bug 3: validación de teléfono cargado en perfil antes de activar Telegram
  const [userPhone, setUserPhone] = useState(null);

  // Build 8: watchlistSymbols ahora derivado de selección múltiple
  const watchlistSymbols = useMemo(() => {
    const syms = new Set();
    Object.entries(watchlistsItems).forEach(([wlId, items]) => {
      if (selectedWatchlistIds === null || selectedWatchlistIds.includes(wlId)) {
        (items || []).forEach(it => syms.add(it.ticker));
      }
    });
    return [...syms];
  }, [watchlistsItems, selectedWatchlistIds]);
  const [iaSignals, setIaSignals] = useState([]);
  const [triggered, setTriggered] = useState([]);
  const [alertTypeFilter, setAlertTypeFilter] = useState('todas');
  const [alertSubFilter, setAlertSubFilter] = useState(null);
  const [infoModal, setInfoModal] = useState(null); // { title, items }
  const [showLegal, setShowLegal] = useState(false);

  useEffect(() => {
    const init = {};
    getAlertSections(t).forEach(sec => {
      sec.items.forEach(item => { init[item.id] = true; });
    });
    setToggles(init);
    const BACKEND = 'https://aurex-app-production.up.railway.app';
    // Build 18 fix #2: USER_ID dinámico via supabase.auth + JWT en headers.
    // Antes hardcodeado UUID Fernando → todos los usuarios cargaban su portfolio/watchlists.
    (async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const uid = session?.user?.id;
        const token = session?.access_token;
        if (!uid) return;
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
        // Cargar símbolos Portfolio
        fetch(`${BACKEND}/api/portfolio/${uid}`, { headers })
          .then(r => r.json())
          .then(data => { if (Array.isArray(data)) setPortfolioSymbols(data.map(d => d.simbolo)); })
          .catch(() => {});
        // Cargar items Watchlist agrupados por wlId
        fetch(`${BACKEND}/api/watchlists/${uid}/items`, { headers })
          .then(r => r.json())
          .then(data => { if (data && typeof data === 'object') setWatchlistsItems(data); })
          .catch(() => {});
        // Metadata de watchlists del user
        fetch(`${BACKEND}/api/watchlists/${uid}`, { headers })
          .then(r => r.json())
          .then(data => { if (Array.isArray(data)) setWatchlistsList(data); })
          .catch(() => {});
      } catch (e) { console.warn('[AlertasScreen] error leyendo sesión:', e.message); }
    })();
    // Build 8: cargar selección persistida + scope desde AsyncStorage
    alertasStorage.getWatchlistsSelection().then(sel => setSelectedWatchlistIds(sel));
    // Build 9 bug 8: cargar estado persistido del switch Push
    alertasStorage.getPushEnabled().then(setPushEnabled);
    // Build 9 bug 3: cargar teléfono del perfil para validación de Telegram
    AsyncStorage.getItem('perfil_telefono').then(async (p) => {
      if (p && p.length >= 8) {
        setUserPhone(p);
        return;
      }
      // Build 20: fallback a session.user.user_metadata.telefono cuando AsyncStorage está vacío
      // (típico instalación nueva iOS post-Android donde el teléfono se guardó allá vía updateUser).
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const meta = session?.user?.user_metadata?.telefono;
        if (meta && meta.length >= 8) {
          setUserPhone(meta);
          await AsyncStorage.setItem('perfil_telefono', meta);
          return;
        }
      } catch (e) { /* ignorar — toggle se bloquea con modal si no hay teléfono */ }
      setUserPhone(p);
    });
    alertasStorage.getScope().then(s => setAlertScope(s));
    // Build 8: cargar userId real para deep-link Telegram
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user?.id) setUserId(data.user.id);
    });
    // Cargar señales IA
    fetch(`${BACKEND}/api/ia-signals`)
      .then(r => r.json())
      .then(data => { if (data.signals) setIaSignals(data.signals); })
      .catch(() => {});
    // Cargar Pulse scores
    fetch(`${BACKEND}/api/pulse`)
      .then(r => r.json())
      .then(data => {
        if (data && data.scores) setPulseScores(data.scores);
        else if (data && data.GLOBAL !== undefined) setPulseScores(data);
      })
      .catch(() => {});
  }, []);

  // Build 16 BUG Telegram: refrescar estado real de telegram_chat_id cuando user vuelve
  // a la pantalla (vino del bot Telegram tras tocar /start). Backend ya hizo UPDATE.
  useFocusEffect(useCallback(() => {
    if (!userId) return;
    supabase.from('usuarios').select('telegram_chat_id').eq('id', userId).single().then(({ data }) => {
      if (data?.telegram_chat_id && !data.telegram_chat_id.startsWith('pending_')) {
        setTelegramConnected(true);
      }
    });
    // Cleanup polling si screen pierde focus
    return () => {
      if (telegramPollRef.current) {
        clearInterval(telegramPollRef.current);
        telegramPollRef.current = null;
      }
    };
  }, [userId]));

  const toggleAlert = (id) => {
    setToggles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  // Formato precio inteligente
  const fmtP = (p) => {
    if (!p || p === 0) return '---';
    if (p >= 1000) return '$' + Math.round(p).toLocaleString('es-AR');
    if (p >= 1) return '$' + p.toFixed(2);
    if (p >= 0.01) return '$' + p.toFixed(4);
    return '$' + p.toFixed(6);
  };

  // Calcular alertas disparadas con datos REALES
  useEffect(() => {
    if (iaSignals.length === 0) return;
    const scopeSyms = alertScope === 'portfolio' ? portfolioSymbols
      : alertScope === 'watchlist' ? watchlistSymbols
      : iaSignals.map(s => s.simbolo);
    const filtered = iaSignals.filter(s => scopeSyms.includes(s.simbolo));
    const pctThreshold = parseFloat(thresholdPct) || 5;
    const probThreshold = parseFloat(thresholdIA) || 75;

    // Generar TODAS las alertas — un activo puede aparecer en distintos tipos
    const alerts = [];

    filtered.forEach(sig => {
      const prob = sig.confianza || sig.probPrincipal || 0;
      const precio = sig.precio || 0;
      const precio24h = sig.precio24h || 0;
      const change = (precio > 0.001 && precio24h > 0.001) ? ((precio - precio24h) / precio24h * 100) : 0;
      if (Math.abs(change) > 50) return;
      const dir = (sig.direccion || '').toUpperCase();
      const sym = sig.simbolo;

      // IA: Alta Convicción (>= 85%) — Build 23 Bug C: guard isAlertAllowed para no generar alertas de tipos bloqueados por plan
      if (toggles.ia_alta && isAlertAllowed('ia_alta') && dir.includes('ALTA CONV') && prob >= 85) {
        alerts.push({ tipo: 'ia', sub: 'alta_conv', sym, icon: '⚡', titulo: `${sym} — ALTA CONV ${prob}%`, desc: `${fmtP(precio)} · ${change >= 0 ? '+' : ''}${change.toFixed(1)}%`, color: C.gold });
      }

      // IA: Cambio de señal (alcista o bajista fuerte) — Build 23 Bug C: guards isAlertAllowed
      if (toggles.ia_cambio && isAlertAllowed('ia_cambio') && dir === 'BAJISTA' && prob >= 80) {
        alerts.push({ tipo: 'ia', sub: 'cambio', sym, icon: '📉', titulo: `${sym} — BAJISTA ${prob}%`, desc: `${fmtP(precio)} · Señal bajista fuerte`, color: C.red });
      }
      if (toggles.ia_cambio && isAlertAllowed('ia_cambio') && dir === 'ALCISTA' && prob >= 80) {
        alerts.push({ tipo: 'ia', sub: 'cambio', sym, icon: '📈', titulo: `${sym} — ALCISTA ${prob}%`, desc: `${fmtP(precio)} · Señal alcista fuerte`, color: C.green });
      }

      // IA: Umbral probabilidad — Build 23 Bug C
      if (toggles.ia_umbral && isAlertAllowed('ia_umbral') && prob >= probThreshold && !(dir.includes('ALTA CONV') && prob >= 85)) {
        alerts.push({ tipo: 'ia', sub: 'umbral', sym, icon: '🎯', titulo: `${sym} — ${dir} ${prob}%`, desc: `${fmtP(precio)} · Supera umbral ${probThreshold}%`, color: '#A78BFA' });
      }

      // PRECIO: Variación brusca — Build 23 Bug C: guard isAlertAllowed
      if (toggles.precio_variacion && isAlertAllowed('precio_variacion') && Math.abs(change) >= pctThreshold) {
        alerts.push({ tipo: 'precio', sub: 'variacion', sym, icon: change >= 0 ? '📈' : '📉', titulo: `${sym} ${change >= 0 ? '+' : ''}${change.toFixed(1)}%`, desc: `${fmtP(precio)} en 24hs`, color: change >= 0 ? C.green : C.red });
      }

      // PRECIO: Nuevo máximo/mínimo 30d — Build 23 Bug C
      if (toggles.precio_maxmin && isAlertAllowed('precio_maxmin') && sig.scores) {
        const sr = sig.scores.soporte_resist || 0;
        if (sr < -0.03) alerts.push({ tipo: 'precio', sub: 'maxmin', sym, icon: '🔺', titulo: `${sym} — Cerca de máximo 30d`, desc: `${fmtP(precio)} · Zona de resistencia`, color: C.red });
        else if (sr > 0.03) alerts.push({ tipo: 'precio', sub: 'maxmin', sym, icon: '🔻', titulo: `${sym} — Cerca de mínimo 30d`, desc: `${fmtP(precio)} · Zona de soporte`, color: C.green });
      }

      // PRECIO: RSI Extremo — Build 23 Bug C (precio_rsi ahora mapea a rsi_extremo, FREE-accesible post-B)
      if (toggles.precio_rsi && isAlertAllowed('precio_rsi') && sig.rsi) {
        if (sig.rsi >= 70) alerts.push({ tipo: 'precio', sub: 'rsi', sym, icon: '⚠️', titulo: `${sym} — RSI ${sig.rsi}`, desc: `Sobrecompra · ${fmtP(precio)}`, color: C.red });
        else if (sig.rsi <= 30) alerts.push({ tipo: 'precio', sub: 'rsi', sym, icon: '⚠️', titulo: `${sym} — RSI ${sig.rsi}`, desc: `Sobreventa · ${fmtP(precio)}`, color: C.green });
      }

      // IA: Señal en Portfolio — Build 23 Bug C
      if (toggles.ia_portfolio && isAlertAllowed('ia_portfolio') && alertScope === 'portfolio' && prob >= 70) {
        alerts.push({ tipo: 'ia', sub: 'portfolio', sym, icon: '💼', titulo: `${sym} — ${dir} ${prob}%`, desc: `${fmtP(precio)} · En tu portfolio`, color: '#A78BFA' });
      }
    });

    // PULSE: zona extrema — Build 23 Bug C
    if (toggles.pulse_zona && isAlertAllowed('pulse_zona')) {
      const globalScore = pulseScores.GLOBAL?.value || 0;
      if (globalScore > 0 && globalScore <= 20) alerts.push({ tipo: 'pulse', sub: 'zona', sym: 'PULSE', icon: '🔴', titulo: 'MIEDO EXTREMO', desc: `Score: ${globalScore} · Oportunidad de compra`, color: '#EC4899' });
      else if (globalScore >= 80) alerts.push({ tipo: 'pulse', sub: 'zona', sym: 'PULSE', icon: '🟢', titulo: 'CODICIA EXTREMA', desc: `Score: ${globalScore} · Considerar toma de ganancias`, color: '#EC4899' });
    }

    // PULSE: cambio por categoría — Build 23 Bug C
    if (toggles.pulse_cat && isAlertAllowed('pulse_cat')) {
      ['CRIPTO','ACCIONES','COMOD','FUTUROS'].forEach(cat => {
        const raw = pulseScores[cat];
        const score = raw ? (typeof raw === 'number' ? raw : (raw.value || 0)) : 0;
        if (score > 0 && (score <= 25 || score >= 75)) {
          const label = score <= 25 ? 'MIEDO' : 'CODICIA';
          alerts.push({ tipo: 'pulse', sub: 'cat', sym: cat, icon: score <= 25 ? '🔴' : '🟢', titulo: `${cat} — ${label}`, desc: `Score: ${Math.round(score)}`, color: '#EC4899' });
        }
      });
    }

    // Deduplicar: mismo sym+tipo solo 1 vez
    const unique = [];
    const seenKey = new Set();
    alerts.forEach(a => {
      const key = a.sym + '_' + a.tipo + '_' + a.icon;
      if (!seenKey.has(key)) { seenKey.add(key); unique.push(a); }
    });

    setTriggered(unique);
  }, [iaSignals, toggles, alertScope, portfolioSymbols, watchlistSymbols, thresholdPct, thresholdIA, pulseScores]);

  // Build 22 — Bug #3: denominador ABSOLUTO (sin filtrar por plan) para que el usuario
  // vea el total real del catálogo y descubra alertas bloqueadas (upsell). Numerador
  // sigue descontando bloqueadas (GDELT con candado para PRO no cuenta como activa).
  const activeCount = Object.entries(toggles).filter(([id, v]) => v && isAlertAllowed(id)).length;
  const totalCount = getAlertSections(t).reduce((a, s) => a + s.items.length, 0);
  const scopeCount = alertScope === 'portfolio' ? portfolioSymbols.length : alertScope === 'watchlist' ? watchlistSymbols.length : TOTAL_ASSETS;
  const scopeLabel = alertScope === 'portfolio' ? `${portfolioSymbols.length} ${t('activos_lower')}` : alertScope === 'watchlist' ? `${watchlistSymbols.length} ${t('activos_lower')}` : `${TOTAL_ASSETS} ${t('activos_lower')}`;

  return (
    <SafeAreaView style={st.container}>
      {/* Header */}
      <View style={st.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <AurexLogo size={32} />
          <Text style={st.headerTitle}>AUREX</Text>
          <Text style={{ fontSize: 13, color: C.textSec }}>{t('alertas')}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingRight: 14 }}>
          <TouchableOpacity onPress={() => setShowLegal(true)} style={{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: C.card, borderWidth: 1, borderColor: C.gold, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 }}>
            <Text style={{ fontSize: 14 }}>⚖️</Text>
            <Text style={{ fontSize: 9, color: C.gold, fontWeight: '800' }}>▼</Text>
          </TouchableOpacity>
          <LiveIndicator lastUpdate={Date.now()} />
          <BellButton onPress={() => navigation.navigate('MisAlertas')} />
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={C.gold} />}>

        {/* Build 8: 3 cards canales en una fila (WhatsApp SOON · Telegram · Push) */}
        <View style={{ flexDirection: 'row', gap: 6, marginHorizontal: 11, marginTop: 10 }}>
          {/* WhatsApp - SOON */}
          <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: C.card, borderRadius: 10, padding: 8, borderWidth: 1, borderColor: C.border, opacity: 0.55, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: 46 }}>
              <Text style={{ fontSize: 22 }}>💬</Text>
              <View style={{ backgroundColor: C.border, borderRadius: 4, paddingHorizontal: 5, paddingVertical: 3 }}>
                <Text style={{ fontSize: 8, fontWeight: '800', color: C.textSec, letterSpacing: 0.4 }}>SOON</Text>
              </View>
            </View>
            <Text style={{ fontSize: 11, fontWeight: '700', color: '#25D366', textAlign: 'center', marginTop: 4, letterSpacing: 0.3 }}>{t('whatsapp_label')}</Text>
          </View>
          {/* Telegram - switch */}
          <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: telegramConnected ? '#229ED920' : C.card, borderRadius: 10, padding: 8, borderWidth: 1, borderColor: telegramConnected ? '#229ED9' : C.border, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: 46 }}>
              <Text style={{ fontSize: 22 }}>✈️</Text>
              <CustomSwitch
                value={telegramConnected}
                onValueChange={(val) => {
                  if (val && !telegramConnected) {
                    // Build 16 BUG I: Modal custom AUREX en vez de Alert.alert nativo
                    const phoneOk = userPhone && userPhone.length >= 8;
                    if (!phoneOk) {
                      setShowFaltaTelefono(true);
                      return;
                    }
                    setShowTelegramPopup(true);
                  } else if (!val && telegramConnected) {
                    setTelegramConnected(false);
                    if (userId) {
                      supabase.from('usuarios').update({ telegram_chat_id: null }).eq('id', userId);
                    }
                  }
                }}
                activeColor="#229ED9"
                inactiveColor={C.border}
              />
            </View>
            <Text style={{ fontSize: 11, fontWeight: '700', color: '#229ED9', textAlign: 'center', marginTop: 4, letterSpacing: 0.3 }}>{t('telegram_label')}</Text>
          </View>
          {/* Push - switch */}
          <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: pushEnabled ? `${C.gold}20` : C.card, borderRadius: 10, padding: 8, borderWidth: 1, borderColor: pushEnabled ? C.gold : C.border, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: 46 }}>
              <Text style={{ fontSize: 22, color: C.gold }}>{`\u{1F514}`}</Text>
              <CustomSwitch
                value={pushEnabled}
                onValueChange={(val) => {
                  // Build 9 bug 8: persistir estado entre TABs
                  // Build 10 bug 8a: CustomSwitch garantiza tap en ambas direcciones
                  setPushEnabled(val);
                  alertasStorage.setPushEnabledStorage(val);
                }}
                activeColor={C.gold}
                inactiveColor={C.border}
              />
            </View>
            <Text style={{ fontSize: 11, fontWeight: '700', color: C.gold, textAlign: 'center', marginTop: 4, letterSpacing: 0.3 }}>{t('push')}</Text>
          </View>
        </View>

        {/* Resumen — clickeable */}
        <View style={st.summaryCard}>
          <View style={st.summaryRow}>
            <TouchableOpacity style={st.summaryItem} onPress={() => {
              const activas = [];
              getAlertSections(t).forEach(sec => sec.items.forEach(item => { if (toggles[item.id]) activas.push({ icon: sec.icon, label: item.label }); }));
              setInfoModal({ title: `${activeCount} ${t('alertas_activas_short')}`, subtitle: `${t('monitoreando')} ${scopeLabel}`, items: activas });
            }}>
              <Text style={{ fontSize: 28, fontWeight: '900', color: C.green }}>{activeCount}</Text>
              <Text style={{ fontSize: 9, fontWeight: '700', color: C.textSec, marginTop: 2 }}>{t('alertas_on')}</Text>
            </TouchableOpacity>
            <View style={st.summaryDivider} />
            <TouchableOpacity style={st.summaryItem} onPress={() => {
              const tipos = getAlertSections(t).map(sec => ({ icon: sec.icon, label: `${sec.title}: ${sec.items.length} tipos` }));
              setInfoModal({ title: `${scopeCount} ${t('activos_monitoreados')}`, subtitle: scopeLabel, items: tipos });
            }}>
              <Text style={{ fontSize: 28, fontWeight: '900', color: C.gold }}>{scopeCount}</Text>
              <Text style={{ fontSize: 9, fontWeight: '700', color: C.textSec, marginTop: 2 }}>{t('activos_upper')}</Text>
            </TouchableOpacity>
            <View style={st.summaryDivider} />
            <TouchableOpacity style={st.summaryItem} onPress={() => setPushEnabled(v => !v)}>
              <Text style={{ fontSize: 28, fontWeight: '900', color: pushEnabled ? C.green : C.textDim }}>
                {pushEnabled ? '✓' : '—'}
              </Text>
              <Text style={{ fontSize: 9, fontWeight: '700', color: C.textSec, marginTop: 2 }}>PUSH</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Filtro general: sobre qué universo aplican las alertas */}
        <View style={{ marginHorizontal: 11, marginTop: 10, backgroundColor: C.card, borderRadius: 12, padding: 12, borderWidth: 1.5, borderColor: C.gold }}>
          <Text style={{ fontSize: 10, color: C.gold, fontWeight: '800', marginBottom: 10, textAlign: 'center', letterSpacing: 1 }}>{t('alertas_sobre')}</Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {(() => {
              const wlTotal = watchlistsList.length;
              const wlSelCount = selectedWatchlistIds === null ? wlTotal : selectedWatchlistIds.length;
              const wlLabel = (wlTotal > 0 && wlSelCount < wlTotal)
                ? `${t('mi_watchlist')} (${wlSelCount}/${wlTotal})`
                : t('mi_watchlist');
              return [
                { key: 'portfolio', label: t('mi_portfolio'), icon: '💼' },
                { key: 'watchlist', label: wlLabel, icon: '👀' },
                { key: 'todos', label: `${t('todos_label')} (${TOTAL_ASSETS})`, icon: '🌍' },
              ].map(s => (
                <TouchableOpacity
                  key={s.key}
                  onPress={() => {
                    if (s.key === 'watchlist' && alertScope === 'watchlist' && wlTotal > 0) {
                      setShowWatchlistsSelector(true);
                    } else {
                      setAlertScope(s.key);
                      alertasStorage.setScope(s.key);
                    }
                  }}
                  style={{ flex: 1, backgroundColor: alertScope === s.key ? C.gold : C.bg, borderWidth: 1.5, borderColor: alertScope === s.key ? C.gold : C.border2, borderRadius: 10, padding: 10, alignItems: 'center' }}
                >
                  <Text style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</Text>
                  <Text style={{ fontSize: 11, fontWeight: '800', color: alertScope === s.key ? '#000' : C.text }}>{s.label}</Text>
                </TouchableOpacity>
              ));
            })()}
          </View>
        </View>

        {/* Motor IA + AUREX Pulse */}
        <View style={{ flexDirection: 'row', gap: 8, marginHorizontal: 11, marginTop: 8 }}>
          <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#A78BFA10', borderRadius: 10, padding: 10, borderWidth: 1, borderColor: '#A78BFA40' }} onPress={() => setShowVarsModal('ia')}>
            <Text style={{ fontSize: 20 }}>🤖</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 13, fontWeight: '800', color: '#A78BFA' }}>{t('motor_ia')}</Text>
              <Text style={{ fontSize: 10, color: C.textSec }}>10 variables</Text>
            </View>
            <Text style={{ fontSize: 12, color: '#A78BFA', fontWeight: '700' }}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#EC489910', borderRadius: 10, padding: 10, borderWidth: 1, borderColor: '#EC489940' }} onPress={() => setShowVarsModal('pulse')}>
            <Text style={{ fontSize: 20 }}>💓</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 13, fontWeight: '800', color: '#EC4899' }}>AUREX Pulse</Text>
              <Text style={{ fontSize: 10, color: C.textSec }}>14 variables</Text>
            </View>
            <Text style={{ fontSize: 12, color: '#EC4899', fontWeight: '700' }}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Secciones de alertas — sin MVP/V2/V3 */}
        {getAlertSections(t).map(sec => {
          const isExpanded = expanded === sec.key;
          // Build 22 — Bug #3: denominador ABSOLUTO consistente con header global.
          // Numerador sigue filtrando para no contar como activa una alerta bloqueada por plan.
          const totalInSec = sec.items.length;
          const activeInSec = sec.items.filter(i => toggles[i.id] && isAlertAllowed(i.id)).length;
          return (
            <View key={sec.key} style={st.typeCard}>
              <TouchableOpacity style={st.typeHeader} onPress={() => setExpanded(isExpanded ? null : sec.key)}>
                <Text style={{ fontSize: 22 }}>{sec.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 13, fontWeight: '700', color: C.text }}>{sec.title}</Text>
                  <Text style={{ fontSize: 9, color: C.textSec, marginTop: 2 }}>{sec.desc}</Text>
                </View>
                <View style={[st.countBadge, { borderColor: activeInSec === totalInSec ? C.green : C.border }]}>
                  <Text style={{ fontSize: 10, fontWeight: '700', color: activeInSec === totalInSec ? C.green : C.gold }}>
                    {activeInSec}/{totalInSec}
                  </Text>
                </View>
                <Text style={{ fontSize: 10, color: C.textSec, marginLeft: 4 }}>{isExpanded ? '▲' : '▼'}</Text>
              </TouchableOpacity>

              {isExpanded && (
                <View style={{ borderTopWidth: 0.5, borderTopColor: C.border }}>
                  {sec.items.map(item => (
                    <View key={item.id} style={st.alertItem}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 13, fontWeight: '500', color: C.text }}>{item.label}</Text>
                        <Text style={{ fontSize: 10, color: C.textSec, marginTop: 2, lineHeight: 14 }}>{item.desc}</Text>
                        {item.config === 'threshold' && toggles[item.id] && (
                          <View style={st.configRow}>
                            <Text style={{ fontSize: 11, color: C.textSec }}>Umbral:</Text>
                            <TextInput style={st.configInput} value={thresholdIA} onChangeText={setThresholdIA} keyboardType="number-pad" maxLength={2} />
                            <Text style={{ fontSize: 11, color: C.textSec }}>%</Text>
                          </View>
                        )}
                        {item.config === 'pct' && toggles[item.id] && (
                          <View style={st.configRow}>
                            <Text style={{ fontSize: 11, color: C.textSec }}>Variacion:</Text>
                            <TextInput style={[st.configInput, { width: 58 }]} value={thresholdPct} onChangeText={setThresholdPct} keyboardType="decimal-pad" maxLength={5} placeholder="5.00" placeholderTextColor={C.textDim} />
                            <Text style={{ fontSize: 11, color: C.textSec }}>%</Text>
                          </View>
                        )}
                      </View>
                      {/* Build 18 fix #12: si el plan no permite este tipo, mostrar lock icon en lugar del switch */}
                      {isAlertAllowed(item.id) ? (
                        <Switch value={toggles[item.id] || false} onValueChange={() => toggleAlert(item.id)} trackColor={{ true: C.green, false: C.border }} />
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            // Build 19 FINAL v2: texto dinámico según plan mínimo del tipo de alerta.
                            // GDELT es ELITE-only; el resto es PRO+ELITE.
                            const backendType = ALERT_ID_TO_BACKEND_TYPE[item.id];
                            const isEliteOnly = backendType === 'geopolitica_gdelt';
                            const message = isEliteOnly
                              ? `Esta alerta requiere ELITE. Tu plan actual es ${userPlan}.`
                              : `Esta alerta requiere PRO o ELITE. Tu plan actual es ${userPlan}.`;
                            // Build 24 Bug G.1: pasar requiredPlan explicito para que el modal muestre boton "Pasate a ELITE" cuando corresponda
                            setPlanLimitInfo({ visible: true, plan: userPlan, message, requiredPlan: isEliteOnly ? 'ELITE' : 'PRO' });
                          }}
                          style={{ paddingHorizontal: 10, paddingVertical: 6, borderRadius: 14, backgroundColor: C.border, flexDirection: 'row', alignItems: 'center', gap: 4 }}
                          activeOpacity={0.7}
                        >
                          <Text style={{ fontSize: 12 }}>🔒</Text>
                          {/* Build 23 Bug D: badge dinamico — geopolitica_gdelt es ELITE-only, resto PRO */}
                          <Text style={{ fontSize: 10, fontWeight: '700', color: C.textSec }}>
                            {ALERT_ID_TO_BACKEND_TYPE[item.id] === 'geopolitica_gdelt' ? 'ELITE' : 'PRO'}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  ))}
                </View>
              )}
            </View>
          );
        })}

        {/* Zonas AUREX Pulse — con filtro por mercado */}
        <View style={st.zonesCard}>
          <Text style={{ fontSize: 12, fontWeight: '700', color: C.text, marginBottom: 8 }}>{t('zonas_pulse')}</Text>
          {/* Filtros */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }} contentContainerStyle={{ gap: 6 }}>
            {['GLOBAL','CRIPTO','ACCIONES','COMOD','FUTUROS'].map(f => (
              <TouchableOpacity key={f} onPress={() => setPulseFilter(f)} style={{ paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6, backgroundColor: pulseFilter === f ? C.gold : C.border }}>
                <Text style={{ fontSize: 9, fontWeight: '700', color: pulseFilter === f ? '#000' : C.textSec }}>{f}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          {/* Barra con aguja */}
          <View style={{ position: 'relative', marginBottom: 4 }}>
            <View style={{ flexDirection: 'row', height: 12, borderRadius: 6, overflow: 'hidden', gap: 2 }}>
              {getPulseZones(t).map(z => (
                <View key={z.range} style={{ flex: 1, backgroundColor: z.color, borderRadius: 3 }} />
              ))}
            </View>
            {/* Aguja indicadora */}
            {(() => {
              const raw = pulseScores[pulseFilter] || pulseScores.GLOBAL || {};
              const score = typeof raw === 'number' ? raw : (raw.value || 0);
              const pct = Math.min(100, Math.max(0, score));
              const zoneColor = pct <= 20 ? C.red : pct <= 40 ? '#FF6B35' : pct <= 60 ? C.gold : pct <= 80 ? '#22C55E' : C.green;
              return score > 0 ? (
                <View style={{ position: 'absolute', top: -6, left: `${pct}%`, marginLeft: -8, alignItems: 'center' }}>
                  <Text style={{ fontSize: 8, color: zoneColor, fontWeight: '900' }}>▼</Text>
                  <View style={{ width: 2, height: 18, backgroundColor: zoneColor, borderRadius: 1 }} />
                  <View style={{ backgroundColor: zoneColor, borderRadius: 8, paddingHorizontal: 6, paddingVertical: 2, marginTop: 2 }}>
                    <Text style={{ fontSize: 10, fontWeight: '800', color: '#000' }}>{Math.round(score)}</Text>
                  </View>
                </View>
              ) : null;
            })()}
          </View>
          {/* Labels */}
          <View style={{ flexDirection: 'row', marginTop: 8 }}>
            {getPulseZones(t).map(z => (
              <View key={z.range} style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ fontSize: 10, fontWeight: '800', color: z.color }}>{z.range}</Text>
                <Text style={{ fontSize: 7, color: C.textSec, marginTop: 2, textAlign: 'center' }}>{z.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Alertas disparadas con filtros + sub-filtros */}
        <View style={{ paddingHorizontal: 13, paddingVertical: 10, marginTop: 10, borderBottomWidth: 0.5, borderBottomColor: C.border }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <Text style={{ fontSize: 11, fontWeight: '700', color: C.textSec, letterSpacing: 0.5 }}>{t('alertas_activas')}</Text>
            {triggered.length > 0 && <View style={{ backgroundColor: C.red, borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2 }}><Text style={{ fontSize: 10, fontWeight: '800', color: '#fff' }}>{triggered.length}</Text></View>}
          </View>
          {/* Filtro principal con conteo */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6 }}>
            {[
              { key: 'todas', label: t('filter_todas') },
              { key: 'ia', label: '🤖 ' + t('ia') },
              { key: 'precio', label: '💰 ' + t('filter_precio') },
              { key: 'pulse', label: '💓 Pulse' },
            ].map(f => {
              const count = f.key === 'todas' ? triggered.length : triggered.filter(a => a.tipo === f.key).length;
              const isSel = alertTypeFilter === f.key;
              return (
                <TouchableOpacity key={f.key} onPress={() => { setAlertTypeFilter(f.key); setAlertSubFilter(null); }} style={{ flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6, backgroundColor: isSel ? C.gold : C.border }}>
                  <Text style={{ fontSize: 9, fontWeight: '700', color: isSel ? '#000' : C.textSec }}>{f.label}</Text>
                  <View style={{ backgroundColor: isSel ? '#00000030' : `${C.textSec}30`, borderRadius: 8, paddingHorizontal: 4, paddingVertical: 1 }}>
                    <Text style={{ fontSize: 7, fontWeight: '800', color: isSel ? '#000' : C.textSec }}>{count}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          {/* Sub-filtros con conteo */}
          {alertTypeFilter !== 'todas' && (() => {
            const typeAlerts = triggered.filter(a => a.tipo === alertTypeFilter);
            const countSub = (sub) => sub ? typeAlerts.filter(a => a.sub === sub).length : typeAlerts.length;
            const subDefs = alertTypeFilter === 'ia' ? [
              { key: null, label: t('filter_todas_ia'), activeColor: '#A78BFA' },
              { key: 'alta_conv', label: t('sub_alta_conv'), activeColor: '#A78BFA' },
              { key: 'cambio', label: t('sub_cambio'), activeColor: '#A78BFA' },
              { key: 'umbral', label: t('sub_umbral'), activeColor: '#A78BFA' },
              { key: 'portfolio', label: t('sub_portfolio'), activeColor: '#A78BFA' },
            ] : alertTypeFilter === 'precio' ? [
              { key: null, label: t('filter_todos_precio'), activeColor: C.gold },
              { key: 'variacion', label: t('sub_variacion'), activeColor: C.gold },
              { key: 'maxmin', label: t('sub_maxmin'), activeColor: C.gold },
              { key: 'rsi', label: t('sub_rsi'), activeColor: C.gold },
            ] : [
              { key: null, label: t('filter_todos_pulse'), activeColor: '#EC4899' },
              { key: 'zona', label: t('sub_zona'), activeColor: '#EC4899' },
              { key: 'cat', label: t('sub_categoria'), activeColor: '#EC4899' },
            ];
            return (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 5, marginTop: 6 }}>
                {subDefs.map(f => {
                  const count = countSub(f.key);
                  const isSel = alertSubFilter === f.key;
                  return (
                    <TouchableOpacity key={f.key || 'all'} onPress={() => setAlertSubFilter(f.key)} style={{ flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 5, backgroundColor: isSel ? f.activeColor : C.border }}>
                      <Text style={{ fontSize: 8, fontWeight: '700', color: isSel ? '#000' : C.textSec }}>{f.label}</Text>
                      <View style={{ backgroundColor: isSel ? '#00000030' : `${C.textSec}30`, borderRadius: 8, paddingHorizontal: 4, paddingVertical: 1 }}>
                        <Text style={{ fontSize: 7, fontWeight: '800', color: isSel ? '#000' : C.textSec }}>{count}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            );
          })()}
        </View>
        {(() => {
          let shown = alertTypeFilter === 'todas' ? triggered : triggered.filter(a => a.tipo === alertTypeFilter);
          // Aplicar sub-filtro por campo sub
          if (alertSubFilter) {
            shown = shown.filter(a => a.sub === alertSubFilter);
          }
          return shown.length === 0 ? (
          <View style={{ alignItems: 'center', paddingVertical: 24 }}>
            <Text style={{ fontSize: 28, marginBottom: 6 }}>✅</Text>
            <Text style={{ fontSize: 13, fontWeight: '500', color: C.textSec }}>{t('sin_alertas')}</Text>
            <Text style={{ fontSize: 10, color: C.textSec, marginTop: 4, textAlign: 'center', paddingHorizontal: 40 }}>{t('proba_filtros')}</Text>
          </View>
        ) : (
          shown.map((a, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10, paddingHorizontal: 14, borderBottomWidth: 0.5, borderBottomColor: '#13171D' }}>
              <Text style={{ fontSize: 16 }}>{a.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, fontWeight: '600', color: C.text }}>{a.titulo}</Text>
                <Text style={{ fontSize: 10, color: C.textSec, marginTop: 1 }}>{a.desc}</Text>
              </View>
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: a.color }} />
            </View>
          ))
        );})()}

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Modal Variables — diseño profesional */}
      <Modal visible={showVarsModal !== null} transparent animationType="fade">
        <View style={st.modalOverlay}>
          <View style={st.modalCard}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={{ fontSize: 22 }}>{showVarsModal === 'ia' ? '🤖' : '💓'}</Text>
                <View>
                  <Text style={{ fontSize: 15, fontWeight: '700', color: showVarsModal === 'ia' ? '#A78BFA' : '#EC4899' }}>
                    {showVarsModal === 'ia' ? t('motor_ia') : 'AUREX Pulse'}
                  </Text>
                  <Text style={{ fontSize: 10, color: C.textSec }}>{showVarsModal === 'ia' ? t('modal_ia_subtitle') : t('modal_pulse_subtitle')}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => setShowVarsModal(null)} style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: C.border, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, color: C.text }}>✕</Text>
              </TouchableOpacity>
            </View>
            {/* Leyenda de colores */}
            {showVarsModal === 'ia' ? (
              <View style={{ flexDirection: 'row', gap: 12, marginBottom: 12, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <View style={{ width: 10, height: 3, backgroundColor: C.green, borderRadius: 2 }} />
                  <Text style={{ fontSize: 9, color: C.green, fontWeight: '600' }}>{t('peso_alto')}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <View style={{ width: 10, height: 3, backgroundColor: C.gold, borderRadius: 2 }} />
                  <Text style={{ fontSize: 9, color: C.gold, fontWeight: '600' }}>{t('peso_medio')}</Text>
                </View>
              </View>
            ) : (
              <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                  <View style={{ width: 8, height: 3, backgroundColor: '#F7931A', borderRadius: 2 }} />
                  <Text style={{ fontSize: 8, color: C.textSec }}>Crypto</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                  <View style={{ width: 8, height: 3, backgroundColor: '#4A9EFF', borderRadius: 2 }} />
                  <Text style={{ fontSize: 8, color: C.textSec }}>Indices</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                  <View style={{ width: 8, height: 3, backgroundColor: C.gold, borderRadius: 2 }} />
                  <Text style={{ fontSize: 8, color: C.textSec }}>Commodities</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                  <View style={{ width: 8, height: 3, backgroundColor: C.green, borderRadius: 2 }} />
                  <Text style={{ fontSize: 8, color: C.textSec }}>Macro</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                  <View style={{ width: 8, height: 3, backgroundColor: C.red, borderRadius: 2 }} />
                  <Text style={{ fontSize: 8, color: C.textSec }}>{t('riesgo_label')}</Text>
                </View>
              </View>
            )}
            <ScrollView style={{ maxHeight: 380 }}>
              {showVarsModal === 'ia' ? (
                iaVarsT.map((v, i) => (
                  <View key={i} style={[st.varRow, { borderLeftWidth: 2, borderLeftColor: v.pesoKey === 'Alto' ? C.green : C.gold }]}>
                    <Text style={{ fontSize: 10, fontWeight: '800', color: C.gold, width: 20, textAlign: 'center' }}>{i + 1}</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 12, fontWeight: '600', color: C.text }}>{v.name}</Text>
                      <Text style={{ fontSize: 9, color: C.textSec, marginTop: 1 }}>{v.desc}</Text>
                    </View>
                    <View style={{ backgroundColor: v.pesoKey === 'Alto' ? C.greenBg : `${C.gold}20`, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 }}>
                      <Text style={{ fontSize: 9, fontWeight: '700', color: v.pesoKey === 'Alto' ? C.green : C.gold }}>{v.peso}</Text>
                    </View>
                  </View>
                ))
              ) : (
                PULSE_VARS.map((v, i) => (
                  <View key={i} style={[st.varRow, { borderLeftWidth: 2, borderLeftColor: v.color }]}>
                    <Text style={{ fontSize: 10, fontWeight: '800', color: C.gold, width: 20, textAlign: 'center' }}>{i + 1}</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 12, fontWeight: '600', color: C.text }}>{v.name}</Text>
                      <Text style={{ fontSize: 9, color: C.textSec, marginTop: 1 }}>{v.fuente}</Text>
                    </View>
                    <View style={{ backgroundColor: `${v.color}20`, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 }}>
                      <Text style={{ fontSize: 10, fontWeight: '700', color: v.color }}>{v.peso}</Text>
                    </View>
                  </View>
                ))
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Modal Info — custom oscuro */}
      <Modal visible={infoModal !== null} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: '#000000CC', justifyContent: 'center', alignItems: 'center', padding: 16 }}>
          <View style={{ backgroundColor: C.card, borderRadius: 16, width: '100%', maxWidth: 380, padding: 20, borderWidth: 1, borderColor: C.border2 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <View>
                <Text style={{ fontSize: 16, fontWeight: '700', color: C.gold }}>{infoModal?.title}</Text>
                {infoModal?.subtitle && <Text style={{ fontSize: 10, color: C.textSec, marginTop: 2 }}>{infoModal.subtitle}</Text>}
              </View>
              <TouchableOpacity onPress={() => setInfoModal(null)} style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: C.border, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, color: C.text }}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={{ maxHeight: 300 }}>
              {(infoModal?.items || []).map((item, i) => (
                <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 8, borderBottomWidth: 0.5, borderBottomColor: C.border }}>
                  <Text style={{ fontSize: 16 }}>{item.icon}</Text>
                  <Text style={{ fontSize: 13, color: C.text, flex: 1 }}>{item.label}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Build 8: Modal popup activación Telegram (primera vez switch ON) */}
      <Modal visible={showTelegramPopup} transparent animationType="fade" onRequestClose={() => setShowTelegramPopup(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.78)', justifyContent: 'center', alignItems: 'center', padding: 16 }}>
          <View style={{ backgroundColor: C.card, borderWidth: 2.5, borderColor: '#229ED9', borderRadius: 16, padding: 18, width: '100%', maxWidth: 320, shadowColor: '#229ED9', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 20, elevation: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={{ fontSize: 20 }}>✈️</Text>
                <Text style={{ fontSize: 14, fontWeight: '800', color: '#229ED9', letterSpacing: 0.3 }}>{t('popup_telegram_titulo')}</Text>
              </View>
              <TouchableOpacity onPress={() => setShowTelegramPopup(false)}>
                <Text style={{ fontSize: 20, color: C.textSec }}>✕</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 13, color: C.text, lineHeight: 19, marginBottom: 12 }}>{t('popup_telegram_intro')}</Text>
            {[t('popup_telegram_paso1'), t('popup_telegram_paso2'), t('popup_telegram_paso3')].map((paso, i) => (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10, backgroundColor: '#229ED914', borderWidth: 1, borderColor: '#229ED94D', padding: 12, borderRadius: 10, marginBottom: 8 }}>
                <View style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: '#229ED9', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 13, fontWeight: '800', color: '#fff' }}>{i + 1}</Text>
                </View>
                <Text style={{ fontSize: 12, color: C.text, flex: 1, lineHeight: 18 }}>{paso}</Text>
              </View>
            ))}
            <TouchableOpacity
              onPress={() => {
                const url = `https://t.me/Aurexalertas_bot?start=${userId || 'aurex'}`;
                Linking.openURL(url).catch(() => {});
                setShowTelegramPopup(false);
                // Build 16 BUG Telegram: NO marcar conectado todavía. Backend hace UPDATE
                // del telegram_chat_id real cuando recibe /start <userId>. Polling 60s lo detecta.
                if (telegramPollRef.current) clearInterval(telegramPollRef.current);
                let pollCount = 0;
                telegramPollRef.current = setInterval(async () => {
                  pollCount++;
                  if (!userId) return;
                  const { data } = await supabase.from('usuarios').select('telegram_chat_id').eq('id', userId).single();
                  if (data?.telegram_chat_id && !data.telegram_chat_id.startsWith('pending_')) {
                    setTelegramConnected(true);
                    clearInterval(telegramPollRef.current);
                    telegramPollRef.current = null;
                  } else if (pollCount >= 20) {
                    clearInterval(telegramPollRef.current);
                    telegramPollRef.current = null;
                  }
                }, 3000);
              }}
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#229ED9', borderRadius: 10, padding: 13, marginTop: 4 }}
            >
              <Text style={{ fontSize: 14, fontWeight: '700', color: '#fff' }}>✈️ {t('popup_telegram_cta')}</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 10, color: C.textSec, fontStyle: 'italic', textAlign: 'center', marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: C.border }}>{t('popup_telegram_foot')}</Text>
          </View>
        </View>
      </Modal>

      {/* Build 8: Modal selector múltiple Watchlists (Opción A: cards normales con scroll) */}
      <Modal visible={showWatchlistsSelector} transparent animationType="fade" onRequestClose={() => setShowWatchlistsSelector(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.78)', justifyContent: 'flex-start', alignItems: 'center', paddingTop: 80, paddingHorizontal: 16 }}>
          <View style={{ backgroundColor: C.card, borderWidth: 3, borderColor: C.gold, borderRadius: 18, padding: 16, width: '100%', maxWidth: 340, shadowColor: C.gold, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 20, elevation: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text style={{ fontSize: 13, fontWeight: '800', color: C.gold, letterSpacing: 0.3 }}>👀 {t('elegir_watchlists_titulo')}</Text>
              <TouchableOpacity onPress={() => setShowWatchlistsSelector(false)}>
                <Text style={{ fontSize: 20, color: C.textSec }}>✕</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 11, color: C.textSec, lineHeight: 16, marginBottom: 12 }}>{t('elegir_watchlists_intro')}</Text>
            <ScrollView style={{ maxHeight: 320 }}>
              {watchlistsList.map(wl => {
                const isSel = selectedWatchlistIds === null || selectedWatchlistIds.includes(wl.id);
                const itemCount = (watchlistsItems[wl.id] || []).length;
                return (
                  <TouchableOpacity
                    key={wl.id}
                    onPress={() => {
                      const current = selectedWatchlistIds === null ? watchlistsList.map(w => w.id) : [...selectedWatchlistIds];
                      const idx = current.indexOf(wl.id);
                      if (idx >= 0) current.splice(idx, 1);
                      else current.push(wl.id);
                      setSelectedWatchlistIds(current);
                    }}
                    style={{ backgroundColor: isSel ? `${C.gold}1A` : C.bg, borderColor: isSel ? C.gold : C.border, borderWidth: 1.5, borderRadius: 10, padding: 10, marginBottom: 6, flexDirection: 'row', alignItems: 'center', gap: 10 }}
                  >
                    <View style={{ width: 22, height: 22, borderRadius: 5, borderWidth: 2, borderColor: isSel ? C.gold : C.border2, backgroundColor: isSel ? C.gold : 'transparent', alignItems: 'center', justifyContent: 'center' }}>
                      {isSel ? <Text style={{ fontSize: 14, fontWeight: '800', color: '#fff' }}>✓</Text> : null}
                    </View>
                    <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: wl.color || C.gold }} />
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 12, fontWeight: '700', color: C.text }}>
                        {wl.nombre || wl.name || '—'}{wl.is_primary ? ` ⭐ ${t('principal')}` : ''}
                      </Text>
                      <Text style={{ fontSize: 10, color: C.textSec, marginTop: 1 }}>{itemCount} {t('activos_count')}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            {watchlistsList.length > 4 ? (
              <Text style={{ fontSize: 10, color: C.textSec, textAlign: 'center', marginTop: 4, fontStyle: 'italic' }}>↕ {t('scroll_para_ver')}</Text>
            ) : null}
            <View style={{ backgroundColor: `${C.gold}14`, borderLeftWidth: 3, borderLeftColor: C.gold, padding: 8, borderRadius: 6, marginTop: 10 }}>
              <Text style={{ fontSize: 11, color: C.text }}>
                <Text style={{ color: C.gold, fontWeight: '800' }}>
                  {selectedWatchlistIds === null ? watchlistsList.length : selectedWatchlistIds.length} / {watchlistsList.length} {t('watchlists_seleccionadas')}
                </Text>
                {' · '}{watchlistSymbols.length} {t('activos_total')}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 10 }}>
              <TouchableOpacity
                onPress={() => setShowWatchlistsSelector(false)}
                style={{ borderWidth: 1.5, borderColor: C.border, borderRadius: 10, padding: 11, paddingHorizontal: 14 }}
              >
                <Text style={{ fontSize: 12, fontWeight: '700', color: C.textSec }}>{t('cancelar')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (selectedWatchlistIds === null) alertasStorage.clearWatchlistsSelection();
                  else alertasStorage.setWatchlistsSelection(selectedWatchlistIds);
                  setShowWatchlistsSelector(false);
                }}
                style={{ flex: 1, backgroundColor: C.gold, borderRadius: 10, padding: 11, alignItems: 'center' }}
              >
                <Text style={{ fontSize: 12, fontWeight: '800', color: '#000' }}>{t('aplicar')} ({watchlistSymbols.length} {t('activos_count')})</Text>
              </TouchableOpacity>
            </View>
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

      {/* Build 16 BUG I: Modal custom "Falta teléfono" (reemplaza Alert.alert nativo) */}
      <Modal visible={showFaltaTelefono} transparent animationType="fade" onRequestClose={() => setShowFaltaTelefono(false)} statusBarTranslucent={true}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.78)', justifyContent: 'center', alignItems: 'center', padding: 16 }}>
          <View style={{ backgroundColor: C.card, borderWidth: 2, borderColor: C.gold, borderRadius: 16, padding: 18, width: '100%', maxWidth: 320 }}>
            <Text style={{ fontSize: 16, fontWeight: '800', color: C.gold, marginBottom: 12 }}>Falta tu número</Text>
            <Text style={{ fontSize: 13, color: C.text, lineHeight: 19, marginBottom: 18 }}>
              Primero guardá tu número de celular en Perfil dentro de Mi Cuenta para activar Telegram.
            </Text>
            <TouchableOpacity onPress={() => setShowFaltaTelefono(false)} style={{ backgroundColor: C.gold, borderRadius: 10, padding: 12, alignItems: 'center' }}>
              <Text style={{ fontSize: 13, fontWeight: '800', color: '#000' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Build 18 fix #12: paywall cuando user toca un toggle bloqueado por plan */}
      {/* Build 25 Bug G: pasar requiredPlan del state al modal — sin esta prop el modal cae al fallback PRO siempre */}
      <PlanLimitModal
        visible={planLimitInfo.visible}
        plan={planLimitInfo.plan}
        message={planLimitInfo.message}
        requiredPlan={planLimitInfo.requiredPlan}
        onClose={() => setPlanLimitInfo({ visible: false })}
        onUpgrade={() => {
          setPlanLimitInfo({ visible: false });
          try { navigation.navigate('Subscription'); } catch {}
        }}
      />
    </SafeAreaView>
  );
}

const makeStyles = (C) => StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: C.border },
  headerTitle: { fontSize: 16, fontWeight: '600', color: C.gold, letterSpacing: 1 },
  liveWrap: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  liveDot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: C.green },
  liveText: { fontSize: 9, color: C.green, fontWeight: '700' },

  whatsappBanner: { flexDirection: 'row', alignItems: 'center', gap: 10, marginHorizontal: 11, marginTop: 10, backgroundColor: '#0D2818', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: '#25D36640' },
  statusBadge: { borderWidth: 1, borderColor: C.border, borderRadius: 12, paddingHorizontal: 8, paddingVertical: 3, backgroundColor: `${C.textDim}10` },

  summaryCard: { marginHorizontal: 11, marginTop: 10, backgroundColor: C.card, borderRadius: 12, padding: 14, borderWidth: 1.5, borderColor: C.gold },
  summaryRow: { flexDirection: 'row', alignItems: 'center' },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryDivider: { width: 1, height: 28, backgroundColor: C.border2 },
  summaryNum: { fontSize: 22, fontWeight: '800' },
  summaryLabel: { fontSize: 8, fontWeight: '700', color: C.textSec, letterSpacing: 0.5, marginTop: 2 },

  motorCard: { flex: 1, backgroundColor: C.card, borderRadius: 12, padding: 14, alignItems: 'center', borderWidth: 1 },

  typeCard: { marginHorizontal: 11, marginTop: 8, backgroundColor: C.card, borderRadius: 12, borderWidth: 0.5, borderColor: C.border, overflow: 'hidden' },
  typeHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12 },
  countBadge: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 },

  alertItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingVertical: 12, paddingHorizontal: 14, borderBottomWidth: 0.5, borderBottomColor: C.border },

  configRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },
  configInput: { backgroundColor: C.bg, borderWidth: 1, borderColor: C.gold, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4, color: C.gold, fontSize: 14, fontWeight: '700', width: 44, textAlign: 'center' },

  zonesCard: { marginHorizontal: 11, marginTop: 10, backgroundColor: C.card, borderRadius: 12, padding: 14, borderWidth: 0.5, borderColor: C.border },

  modalOverlay: { flex: 1, backgroundColor: '#000000CC', justifyContent: 'center', alignItems: 'center', padding: 16 },
  modalCard: { backgroundColor: C.card, borderRadius: 16, width: '100%', maxWidth: 440, padding: 20, borderWidth: 1, borderColor: C.border2 },
  varRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 8, paddingHorizontal: 6, borderBottomWidth: 0.5, borderBottomColor: C.border, borderRadius: 4, marginBottom: 2 },
});
