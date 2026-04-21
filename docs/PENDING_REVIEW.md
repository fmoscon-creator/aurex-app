# PENDING REVIEW — Fix Watchlist: eliminar lista i18n + comparar UX + LP user-select

**Archivo**: aurex-features.js

---

## Fix 1: Pop eliminar lista en español

**L1958**: "Eliminar lista" → `t('wl_eliminar') + ' lista'`
**L1961**: "Cancelar" → `t('cancelar')`

## Fix 2: Comparar — checkbox difícil de tocar (titila, no toma)

**Causa**: `wlToggleCompare()` llamaba `renderWatchCnt()` que destruye y recrea TODO el DOM.

**Fix**: `wlToggleCompare()` ya NO llama `renderWatchCnt()`. En su lugar actualiza solo:
- El checkbox visual (border color + background + ✓)
- El counter text ("✓ 2 seleccionados...")
- El label del botón Comparar ("⚖️ Comparar 2")

Sin re-render. El DOM se mantiene estable. Tap instantáneo.

## Fix 3: Long press — "Cancelar" en español + texto se selecciona

**Causa**: L2384 "Cancelar" hardcodeado sin t(). Card del long press sin user-select:none.

**Fix**:
- L2384: "Cancelar" → `t('cancelar')`
- L2359: card agrega `-webkit-user-select:none;user-select:none`
- L2383: div cancelar también con `user-select:none`

---

## Verificación
- `node -c aurex-features.js` → OK
