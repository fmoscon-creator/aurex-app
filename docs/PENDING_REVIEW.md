# PENDING REVIEW — Mercados i18n completo (~90 keys × 8 idiomas)

**Archivos modificados** (LOCAL, no pusheados):
- aurex-i18n.js — +90 keys nuevas sección `// === MERCADOS ===`
- index.html — 32 data-i18n aplicados + 3 t() en script inline
- aurex-features.js — 10+ funciones modificadas con t()

---

## Cambios por archivo

### aurex-i18n.js
Sección `// === MERCADOS ===` con subcategorías:
- Búsqueda (4 keys)
- Pin Modal (3 keys)
- Tabs categorías (7 keys)
- Sub-filtros países (7 keys)
- Timeframe (6 keys)
- Edit mode (1 key)
- Filtros IA (10 keys)
- Banner Mercados status (3 keys)
- AUREX Pulse (2 keys + 5 educativas)
- Pulse Info modal (14 keys: título, subtítulo, zonas, headers tabla, variables, disclaimer)
- Ver Variables popup (pendiente — keys definidas, implementación en siguiente commit)
- Long Press Mercados (7 keys)
- Futuros banner (2 keys)
- Otros: mkt_copiado, mkt_live_hace_s, mkt_live_hace_min

### index.html
- L1814: mkt_search_placeholder (data-i18n-attr="placeholder")
- L1829-1832: mkt_pin_title, mkt_listo, mkt_pin_desc
- L1839-1845: 7 tabs (mkt_tab_*)
- L1850-1856: 7 países (mkt_pais_*)
- L1868-1869: mkt_tf_ahora, mkt_editar_orden
- L1874-1875: mkt_edit_instrucciones, mkt_listo
- L1986-1995: 10 filtros IA (mkt_ia_*)
- L1890,1893: mkt_buscando, mkt_sin_resultados (inline JS)
- L1898: tipo labels con t()

### aurex-features.js
- L538: timeframe labels → t('mkt_tf_*')
- L1351: ABIERTO/CERRADO → t('mkt_status_*')
- L1383,1387: editMarketBanner title/button
- L4529: Pulse loading → t('mkt_pulse_loading')
- L4578-4582: 5 edu strings → t('mkt_pulse_edu_*')
- L4606: Ver variables → t('mkt_pulse_ver_variables')
- L4650-4661: Variable names translated (VIX, Oro, Plata, Petróleo, Cobre, Geopolítica)
- L4674-4687: Pulse Info modal completo → t()
- L4820,4824: Futuros edit title/button
- L6085-6132: Long press sheet (Precio, Objetivo IA, Señal IA, Favoritos, Portfolio, Cerrar)
- L6092: ALCISTA/BAJISTA → t('port_signal_*')
- L6326: Live timer → t('mkt_live_hace_*')
- L5983,5996: alert Copiado → t('mkt_copiado')

---

## Keys reutilizadas
- port_entendido (botón Entendido en Pulse info)
- port_signal_alcista, port_signal_bajista (long press)
- cancelar (ya existente)
- mkt_listo (compartida entre 4 botones "Listo")

## Pendiente para siguiente commit
- showIAVariablesPopup() (10 variables × label + desc) — keys definidas en i18n, falta aplicar t() en la función

## Verificación sintaxis
- `node -c aurex-features.js` → OK
- `node -c aurex-i18n.js` → OK
