// AUREX MisAlertasScreen — pantalla del Sistema B (alertas puntuales del user)
// Se abre al tocar la 🔔 del header de cualquiera de las 6 TABs.
// Lee directo de Supabase (RLS filtra por user_id) — sin backend nuevo.
// Mockups: #4 (vista lista), #5 (popup explicativo), #8 (estado vacío).

import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../lib/ThemeContext';
import { useT } from '../lib/i18n';
import AurexLogo from '../components/AurexLogo';
import * as alertasService from '../lib/alertasService';
import { showToast } from '../components/Toast';
import { usePlan, planAllowsAlertType } from '../lib/usePlan';

const fmtRelative = (ts) => {
  if (!ts) return '';
  const diff = Math.floor((Date.now() - new Date(ts).getTime()) / 1000);
  if (diff < 10) return 'ahora';
  if (diff < 60) return `hace ${diff} seg`;
  const mins = Math.floor(diff / 60);
  if (mins < 60) return `hace ${mins} min`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `hace ${hrs} h`;
  const days = Math.floor(hrs / 24);
  return `hace ${days}d`;
};

const fmtP = (p) => {
  if (!p && p !== 0) return '---';
  if (p >= 1000) return '$' + Math.round(p).toLocaleString('en-US');
  if (p >= 1) return '$' + p.toFixed(2);
  if (p >= 0.01) return '$' + p.toFixed(4);
  return '$' + p.toFixed(6);
};

export default function MisAlertasScreen() {
  const { theme: C, mode } = useTheme();
  const t = useT();
  const navigation = useNavigation();
  const [alertasRaw, setAlertasRaw] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(new Set());
  const [showHelp, setShowHelp] = useState(false);
  const [deleteIds, setDeleteIds] = useState(null); // Build 15 BUG D: ids pendientes de borrado en Modal custom

  // Build 18 fix #13: filtrar alertas según plan actual.
  // Si usuario bajó de PRO/ELITE a FREE, las alertas premium quedan ocultas.
  // Plus contador de alertas ocultas para mostrar banner.
  const { plan: userPlan } = usePlan();
  const alertas = alertasRaw.filter(a => !a.tipo || planAllowsAlertType(userPlan, a.tipo));
  const ocultasPorPlan = alertasRaw.length - alertas.length;

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data } = await alertasService.listAlertas();
    setAlertasRaw(data);
    setLoading(false);
  }, []);

  useFocusEffect(useCallback(() => {
    refresh();
  }, [refresh]));

  const unreadCount = alertas.filter(a => !a.leida).length;
  const totalCount = alertas.length;
  const isEmpty = !loading && alertas.length === 0;

  const toggleSel = (id) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => setSelected(new Set(alertas.map(a => a.id)));

  const markRead = async () => {
    // Build 15 BUG E: forzar selección explícita.
    if (selected.size === 0) {
      showToast({ title: 'Seleccioná alertas primero', message: '' });
      return;
    }
    const ids = [...selected];
    if (ids.length === 0) return;
    await alertasService.markAsRead(ids);
    setSelected(new Set());
    refresh();
    // Build 15 BUG C: feedback visual confirmando la acción.
    showToast({ title: `✓ ${ids.length} ${ids.length === 1 ? 'alerta marcada' : 'alertas marcadas'}`, message: '' });
  };

  const deleteSelected = () => {
    // Build 15 BUG E: forzar selección explícita.
    if (selected.size === 0) {
      showToast({ title: 'Seleccioná alertas primero', message: '' });
      return;
    }
    const ids = [...selected];
    if (ids.length === 0) return;
    setDeleteIds(ids); // Build 15 BUG D: abre Modal custom en vez de RNAlert nativo
  };

  const confirmDelete = async () => {
    if (!deleteIds) return;
    await alertasService.softDelete(deleteIds);
    setSelected(new Set());
    const n = deleteIds.length;
    setDeleteIds(null);
    refresh();
    showToast({ title: `🗑️ ${n} ${n === 1 ? 'alerta borrada' : 'alertas borradas'}`, message: '' });
  };

  const cardBgUnread = mode === 'dark' ? '#25303F' : `${C.gold}0F`;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }} edges={['top']}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: C.border, backgroundColor: C.card }}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }} style={{ width: 32 }}>
          <Text style={{ fontSize: 26, color: C.text, fontWeight: '600' }}>‹</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <AurexLogo size={28} />
          <Text style={{ fontSize: 16, fontWeight: '600', color: C.gold, letterSpacing: 1 }}>AUREX</Text>
          <Text style={{ fontSize: 13, color: C.textSec }}>{t('mis_alertas')}</Text>
        </View>
        <Text style={{ fontSize: 22, color: C.gold, width: 32, textAlign: 'right' }}>{`\u{1F514}`}</Text>
      </View>

      {/* Title row */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 14, paddingBottom: 4 }}>
        <Text style={{ fontSize: 22, fontWeight: '800', color: C.text }}>{t('mis_alertas')}</Text>
        <TouchableOpacity
          onPress={() => setShowHelp(true)}
          activeOpacity={0.7}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          style={{ width: 32, height: 32, borderRadius: 16, borderWidth: 1.5, borderColor: C.gold, backgroundColor: `${C.gold}26`, alignItems: 'center', justifyContent: 'center', zIndex: 10 }}
        >
          <Text style={{ fontSize: 16, fontWeight: '800', color: C.gold }}>?</Text>
        </TouchableOpacity>
      </View>

      {/* Subtitle */}
      {!isEmpty && !loading ? (
        <Text style={{ fontSize: 12, color: C.textSec, paddingHorizontal: 16, marginBottom: 14 }}>
          {unreadCount} {t('alertas_sin_leer')} · {totalCount} {t('alertas_en_historial')}
        </Text>
      ) : null}

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={C.gold} />
        </View>
      ) : isEmpty ? (
        // Estado vacío (mockup #8)
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', paddingTop: 30, paddingHorizontal: 24 }}>
          <View style={{ width: 110, height: 110, borderRadius: 55, backgroundColor: `${C.gold}1A`, borderWidth: 2, borderColor: `${C.gold}66`, alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
            <Text style={{ fontSize: 60, color: C.gold }}>{`\u{1F514}`}</Text>
          </View>
          <Text style={{ fontSize: 20, fontWeight: '800', color: C.text, textAlign: 'center', marginBottom: 10 }}>{t('alertas_vacio_titulo')}</Text>
          <Text style={{ fontSize: 13, color: C.textSec, textAlign: 'center', lineHeight: 19, marginBottom: 24, maxWidth: 280 }}>{t('alertas_vacio_texto')}</Text>
          <View style={{ flexDirection: 'row', gap: 10, width: '100%' }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Main', { screen: 'Portfolio' })}
              style={{ flex: 1, backgroundColor: `${C.gold}1A`, borderWidth: 2, borderColor: C.gold, borderRadius: 12, padding: 14, alignItems: 'center', gap: 6 }}
            >
              <Text style={{ fontSize: 24 }}>💼</Text>
              <Text style={{ fontSize: 13, fontWeight: '800', color: C.gold }}>{t('ir_portfolio')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Main', { screen: 'Watchlist' })}
              style={{ flex: 1, backgroundColor: `${C.gold}1A`, borderWidth: 2, borderColor: C.gold, borderRadius: 12, padding: 14, alignItems: 'center', gap: 6 }}
            >
              <Text style={{ fontSize: 24 }}>👀</Text>
              <Text style={{ fontSize: 13, fontWeight: '800', color: C.gold }}>{t('ir_watchlist')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        // Lista (mockup #4)
        <>
          {/* Build 18 fix #13: banner si hay alertas ocultas porque el plan actual no las soporta */}
          {ocultasPorPlan > 0 ? (
            <View style={{ marginHorizontal: 14, marginBottom: 10, backgroundColor: `${C.gold}15`, borderWidth: 1, borderColor: `${C.gold}55`, borderRadius: 10, padding: 12 }}>
              <Text style={{ fontSize: 12, color: C.text, lineHeight: 17 }}>
                🔒 Tenés <Text style={{ fontWeight: '800' }}>{ocultasPorPlan}</Text> alerta{ocultasPorPlan === 1 ? '' : 's'} oculta{ocultasPorPlan === 1 ? '' : 's'} porque tu plan {userPlan} no las soporta.
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Subscription')} style={{ marginTop: 6 }}>
                <Text style={{ fontSize: 12, fontWeight: '700', color: C.gold }}>Ver planes →</Text>
              </TouchableOpacity>
            </View>
          ) : null}
          {/* Bulk actions */}
          <View style={{ flexDirection: 'row', gap: 8, paddingHorizontal: 14, marginBottom: 12 }}>
            <TouchableOpacity onPress={markRead} style={{ flex: 1, backgroundColor: C.card, borderWidth: 1, borderColor: C.border, borderRadius: 8, padding: 8, alignItems: 'center' }}>
              <Text style={{ fontSize: 11, fontWeight: '600', color: C.text }}>{`✓ ${t('marcar_leidas')}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={deleteSelected} style={{ flex: 1, backgroundColor: C.card, borderWidth: 1, borderColor: C.border, borderRadius: 8, padding: 8, alignItems: 'center' }}>
              <Text style={{ fontSize: 11, fontWeight: '600', color: C.text }}>{`\u{1F5D1}️ ${t('borrar')}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={selectAll} style={{ backgroundColor: C.card, borderWidth: 1, borderColor: C.border, borderRadius: 8, padding: 8, paddingHorizontal: 10, alignItems: 'center' }}>
              <Text style={{ fontSize: 11, fontWeight: '600', color: C.text }}>{`☑ ${t('sel_todas')}`}</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 14, paddingBottom: 30 }}>
            {alertas.map(a => {
              const isSel = selected.has(a.id);
              const unread = !a.leida;
              return (
                <View
                  key={a.id}
                  style={{
                    backgroundColor: unread ? cardBgUnread : C.card,
                    borderRadius: 10,
                    padding: 12,
                    borderWidth: 1,
                    borderColor: C.border,
                    borderLeftWidth: unread ? 3 : 1,
                    borderLeftColor: unread ? C.gold : C.border,
                    marginBottom: 8,
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    gap: 10,
                    opacity: unread ? 1 : 0.65,
                  }}
                >
                  <TouchableOpacity onPress={() => toggleSel(a.id)} style={{ marginTop: 2 }}>
                    <View style={{ width: 20, height: 20, borderRadius: 5, borderWidth: 1.5, borderColor: isSel ? C.gold : C.textSec, backgroundColor: isSel ? C.gold : 'transparent', alignItems: 'center', justifyContent: 'center' }}>
                      {isSel ? <Text style={{ fontSize: 14, fontWeight: '800', color: '#000' }}>✓</Text> : null}
                    </View>
                  </TouchableOpacity>
                  <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: `${C.green}26`, alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Text style={{ fontSize: 18 }}>📈</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 14, fontWeight: '700', color: C.text, marginBottom: 2 }}>
                      {a.simbolo} — {fmtP(a.precio_disparado)}
                    </Text>
                    <Text style={{ fontSize: 11, color: C.textSec, marginBottom: 4 }}>🎯 alcanzado</Text>
                    <Text style={{ fontSize: 10, color: C.textDim }}>{fmtRelative(a.created_at)}</Text>
                  </View>
                  <TouchableOpacity onPress={() => alertasService.softDelete([a.id]).then(refresh)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }} style={{ padding: 4 }}>
                    <Text style={{ fontSize: 14, color: C.textDim }}>{`\u{1F5D1}️`}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </>
      )}

      {/* Modal popup explicativo (mockup #5) */}
      <Modal visible={showHelp} transparent animationType="fade" onRequestClose={() => setShowHelp(false)} statusBarTranslucent={true}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.78)', justifyContent: 'center', alignItems: 'center', padding: 16 }}>
          <View style={{ backgroundColor: C.card, borderWidth: 2, borderColor: C.gold, borderRadius: 16, padding: 18, width: '100%', maxWidth: 320 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <Text style={{ fontSize: 14, fontWeight: '800', color: C.gold, letterSpacing: 0.3 }}>{t('popup_alertas_titulo')}</Text>
              <TouchableOpacity onPress={() => setShowHelp(false)}>
                <Text style={{ fontSize: 20, color: C.textSec }}>✕</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 13, color: C.text, lineHeight: 19, marginBottom: 14 }}>{t('popup_alertas_intro')}</Text>
            {[t('popup_alertas_paso1'), t('popup_alertas_paso2')].map((paso, i) => (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10, backgroundColor: `${C.gold}14`, borderWidth: 1, borderColor: `${C.gold}4D`, padding: 12, borderRadius: 10, marginBottom: 10 }}>
                <View style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: C.gold, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 13, fontWeight: '800', color: '#000' }}>{i + 1}</Text>
                </View>
                <Text style={{ fontSize: 12, color: C.text, flex: 1, lineHeight: 18 }}>{paso}</Text>
              </View>
            ))}
            <Text style={{ fontSize: 11, color: C.textSec, fontStyle: 'italic', textAlign: 'center', marginTop: 4, paddingTop: 10, borderTopWidth: 1, borderTopColor: C.border }}>{t('popup_alertas_foot')}</Text>
          </View>
        </View>
      </Modal>

      {/* Build 15 BUG D: Modal custom de confirmación borrado (reemplaza RNAlert nativo) */}
      <Modal visible={deleteIds !== null} transparent animationType="fade" onRequestClose={() => setDeleteIds(null)} statusBarTranslucent={true}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.78)', justifyContent: 'center', alignItems: 'center', padding: 16 }}>
          <View style={{ backgroundColor: C.card, borderWidth: 2, borderColor: C.gold, borderRadius: 16, padding: 18, width: '100%', maxWidth: 320 }}>
            <Text style={{ fontSize: 16, fontWeight: '800', color: C.gold, marginBottom: 12 }}>{t('borrar') || 'Borrar'}</Text>
            <Text style={{ fontSize: 13, color: C.text, lineHeight: 19, marginBottom: 18 }}>
              {`¿Borrar ${deleteIds?.length || 0} ${(deleteIds?.length || 0) === 1 ? 'alerta' : 'alertas'}?`}
            </Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity onPress={() => setDeleteIds(null)} style={{ flex: 1, backgroundColor: C.card, borderWidth: 1, borderColor: C.border, borderRadius: 10, padding: 12, alignItems: 'center' }}>
                <Text style={{ fontSize: 13, fontWeight: '700', color: C.text }}>{t('cancelar') || 'Cancelar'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmDelete} style={{ flex: 1, backgroundColor: C.red, borderRadius: 10, padding: 12, alignItems: 'center' }}>
                <Text style={{ fontSize: 13, fontWeight: '800', color: '#fff' }}>{t('borrar') || 'Borrar'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
