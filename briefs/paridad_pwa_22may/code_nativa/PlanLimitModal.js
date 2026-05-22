// PlanLimitModal — Build 18 fix #5
// Modal paywall reutilizable que se muestra cuando el backend rechaza una acción con 403 plan_limit_reached.
// Props:
//   visible: boolean
//   plan: 'FREE' | 'PRO' (el plan actual del usuario)
//   limit: number opcional (ej. 5 activos máximo)
//   message: string del backend o fallback genérico
//   onClose: () => void (cierra modal sin upgrade)
//   onUpgrade: () => void (navega a SubscriptionScreen)
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const COLORS = {
  bgOverlay: 'rgba(0,0,0,0.75)',
  card: '#1a1a1a',
  border: '#2a2a2a',
  text: '#ffffff',
  textSec: '#a0a0a0',
  gold: '#c9a84c',
  proPurple: '#A78BFA',
  ghost: '#444',
};

export default function PlanLimitModal({ visible, plan = 'FREE', limit, message, onClose, onUpgrade, requiredPlan }) {
  // Build 24 Bug G.2: requiredPlan opcional override-ea el calculo basado en plan del user.
  // Si el callsite pasa requiredPlan='ELITE' (ej. candado gdelt), el boton dice "Pasate a ELITE".
  // Si no se pasa, fallback al comportamiento previo basado en plan actual del user.
  const upgradeTarget = requiredPlan || (plan === 'PRO' ? 'ELITE' : 'PRO');
  // Build 24 Bug G.3: color del boton basado en upgradeTarget (no en plan del user)
  // para que ELITE siempre sea dorado y PRO siempre violeta, independiente del plan actual.
  const upgradeColor = upgradeTarget === 'ELITE' ? COLORS.gold : COLORS.proPurple;
  const defaultMessage = limit
    ? `Tu plan ${plan} permite hasta ${limit}. Pasate a ${upgradeTarget} para sumar más.`
    : `Esta función requiere ${upgradeTarget}. Pasate a ${upgradeTarget} para activarla.`;

  return (
    <Modal visible={!!visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Build 19 FINAL v2: X de cerrar arriba a la derecha */}
          <TouchableOpacity style={styles.btnClose} onPress={onClose} activeOpacity={0.7} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Text style={styles.btnCloseText}>✕</Text>
          </TouchableOpacity>

          <Text style={styles.icon}>🔒</Text>
          <Text style={styles.title}>Límite del plan {plan}</Text>
          <Text style={styles.message}>{message || defaultMessage}</Text>

          <TouchableOpacity
            style={[styles.btnUpgrade, { backgroundColor: upgradeColor }]}
            onPress={onUpgrade}
            activeOpacity={0.8}
          >
            <Text style={styles.btnUpgradeText}>Pasate a {upgradeTarget}</Text>
          </TouchableOpacity>

          {/* Build 19 FINAL v2: texto "Ahora no" con mejor contraste (blanco + underline) */}
          <TouchableOpacity style={styles.btnGhost} onPress={onClose} activeOpacity={0.7}>
            <Text style={styles.btnGhostText}>Ahora no</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: COLORS.bgOverlay, justifyContent: 'center', alignItems: 'center', padding: 24 },
  card: { width: '100%', maxWidth: 360, backgroundColor: COLORS.card, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border, padding: 24, alignItems: 'center', position: 'relative' },
  // Build 19 FINAL v2: X arriba a la derecha — ergonomía estándar de popups
  btnClose: { position: 'absolute', top: 10, right: 10, width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', zIndex: 10 },
  btnCloseText: { color: COLORS.text, fontSize: 20, fontWeight: '700' },
  icon: { fontSize: 48, marginBottom: 12 },
  title: { fontSize: 18, fontWeight: '800', color: COLORS.text, marginBottom: 8, textAlign: 'center' },
  message: { fontSize: 14, color: COLORS.textSec, lineHeight: 20, marginBottom: 20, textAlign: 'center' },
  btnUpgrade: { width: '100%', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginBottom: 8 },
  btnUpgradeText: { color: '#000', fontSize: 15, fontWeight: '800' },
  btnGhost: { paddingVertical: 12, paddingHorizontal: 24, marginTop: 4 },
  // Build 19 FINAL v2: "Ahora no" en COLORS.text (blanco) + underline para visibilidad
  btnGhostText: { color: COLORS.text, fontSize: 14, fontWeight: '600', textDecorationLine: 'underline' },
});
