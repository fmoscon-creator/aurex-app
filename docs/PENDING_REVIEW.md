# PENDING REVIEW — Nativa: card wrapper Termómetro + Pulse mejorado

**Archivos** (LOCAL, NATIVA): PortfolioScreen.js, MercadosScreen.js

---

## Fix 1: Termómetro Portfolio — card con bordes

**Archivo**: PortfolioScreen.js L1529
**ANTES**: `thermoWrap: { paddingHorizontal: 14, paddingTop: 8, paddingBottom: 4 }`
**DESPUÉS**: `thermoWrap: { marginHorizontal: 14, marginTop: 8, marginBottom: 4, backgroundColor: C.card, borderRadius: 12, padding: 10, borderWidth: 1, borderColor: C.border2 }`

Mismo tratamiento que en PWA (commit 5041b9c).

## Fix 2: AUREX Pulse Mercados — border más visible

**Archivo**: MercadosScreen.js L1463-1465
**ANTES**: `borderRadius: 10, padding: 10, borderWidth: 0.5, borderColor: ${C.gold}45`
**DESPUÉS**: `borderRadius: 12, padding: 12, borderWidth: 1, borderColor: C.border2`

Cambia de borde gold semitransparente (0.5px, casi invisible) a borde sutil pero visible (1px, border2).

---

## Verificación
- Ambos cambios son solo estilos CSS (no funcional)
- Coherentes con PWA donde ya se hizo este ajuste
