# PENDING REVIEW — Onboarding i18n (6 keys × 8 idiomas)

**Archivos** (LOCAL): aurex-i18n.js, index.html

Nativa leída: OnboardingScreen.js (74 líneas). Usa t() con 8 keys i18n. Las slides son imágenes fijas — solo botones se traducen.

---

## aurex-i18n.js — sección `// === ONBOARDING ===`
6 keys: ob_comenzar, ob_siguiente, ob_ver_planes, ob_empezar_gratis, ob_crear_cuenta, ob_ya_tengo_cuenta
Traducciones copiadas exactas de nativa i18n.js L453-458.

## index.html — 6 data-i18n aplicados
- L1221: ob_comenzar (Slide 1 button)
- L1275: ob_siguiente (Slide 2 button)
- L1352: ob_ver_planes (Slide 3 button)
- L1419: ob_empezar_gratis (Slide 4 main button)
- L1421: ob_crear_cuenta (Slide 4 secondary)
- L1422: ob_ya_tengo_cuenta (Slide 4 tertiary)

## No incluido (igual que nativa)
- Contenido visual de las slides (imágenes/canvas fijas)
- Disclaimer legal (ya traducido en Perfil como `disclaimer_legal`)
- Botón "← Volver" (no existe en PWA, nativa sí lo tiene)

---

## Verificación
- `node -c aurex-i18n.js` → OK
- Réplica exacta de keys de nativa i18n.js
