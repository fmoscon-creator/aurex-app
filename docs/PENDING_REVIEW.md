# PENDING REVIEW — Fix Watchlist: eliminar lista i18n + comparar UX

**Archivo**: aurex-features.js

---

## Fix 1: Pop eliminar lista en español

**L1958**: "Eliminar lista" → `t('wl_eliminar') + ' lista'`
**L1961**: "Cancelar" → `t('cancelar')`

## Fix 2: Comparar — checkbox difícil de tocar (titila, no toma)

**Causa**: `wlToggleCompare()` llamaba `renderWatchCnt()` que destruye y recrea TODO el DOM. El re-render completo durante el tap causa:
- Logo titila (se destruye y recrea el img)
- Tap no se registra consistentemente (DOM desaparece mid-tap)

**Fix**: `wlToggleCompare()` ya NO llama `renderWatchCnt()`. En su lugar actualiza solo:
- El checkbox visual (border color + background + ✓)
- El counter text ("✓ 2 seleccionados...")
- El label del botón Comparar ("⚖️ Comparar 2")

Sin re-render. El DOM se mantiene estable. Tap instantáneo.

---

## Verificación
- `node -c aurex-features.js` → OK
