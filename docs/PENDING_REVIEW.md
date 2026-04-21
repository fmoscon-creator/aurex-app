# PENDING REVIEW — Reescritura Long Press Mercados (réplica EXACTA nativa)

**Archivo**: aurex-features.js — función `_showMercadosLPSheet`

---

## Problema

El long press de Mercados en PWA tenía un diseño DIFERENTE a la nativa:
- Chips de Precio/24h/Objetivo IA (NO existe en nativa)
- Badge Señal IA (NO existe en nativa)
- Faltaba 📊 Análisis IA completo
- Faltaba 📤 Compartir
- Header con logo + ✕ (nativa solo tiene ticker+nombre centrado)
- Estilos diferentes

## Fix: Reescritura completa replicando nativa MercadosScreen.js L1300-1363

### Estructura nueva (idéntica a nativa):

```
┌─────────────────────────────────────┐
│         TICKER (bold 800)           │
│       nombre (10px, gris)           │
├─────────────────────────────────────┤
│ 📊 Análisis IA completo  [GOLD]    │  ← gold bg + border
│ ⭐ Agregar a Favoritos              │  ← bg oscuro
│ 💼 Agregar a Portfolio              │  ← bg oscuro
│ 📤 Compartir                        │  ← bg oscuro
│          Cancelar                   │  ← border + texto sec
└─────────────────────────────────────┘
```

### Funciones implementadas:

1. **📊 Análisis IA completo** → Abre `_mktOpenDetail(0)` con el activo (mismo que nativa `setShowSearchDetail`)
2. **⭐ Favoritos** → Toggle via `_lpAgregarFavorito`/`_lpQuitarFavorito` (ya existía)
3. **💼 Agregar a Portfolio** → `openPortModal(ticker)` (ya existía)
4. **📤 Compartir** → Web Share API (`navigator.share`) con fallback a clipboard. Mensaje: `"TICKER — nombre\nvía AUREX — aurex.live"` (idéntico a nativa L1343)
5. **Cancelar** → Cierra modal

### Lo que se ELIMINÓ (no existe en nativa):
- 3 chips de Precio/24h/Objetivo
- Badge de Señal IA con porcentaje
- Header con logo + ✕
- Fetch de precio en apertura del modal
- Estilos lp-header-rich, lp-chips, lp-signal, lp-fav-btn, lp-option

### Keys i18n usadas (ya existen):
- mkt_lp_analisis, mkt_lp_quitar_fav, mkt_lp_agregar_fav
- mkt_lp_agregar_portfolio, port_compartir, cancelar, mkt_copiado

### Estilos:
- Modal: usa CSS existente `#longpress-modal` (border:3px solid gold ya agregado)
- Botones: inline styles replicando nativa (padding:10px 12px, border-radius:10, gap con emoji)
- Header: centrado con border-bottom separador

---

## Verificación
- `node -c aurex-features.js` → OK
- Réplica línea a línea de nativa L1300-1363
- 5 opciones en orden exacto de nativa
- Compartir usa Web Share API (equivalente a RN Share.share)
