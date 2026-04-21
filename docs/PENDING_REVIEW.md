# PENDING REVIEW — Watchlist i18n completo (~45 keys × 8 idiomas)

**Archivos** (LOCAL): aurex-i18n.js, index.html, aurex-features.js

---

## Cambios

### aurex-i18n.js — sección `// === WATCHLIST ===`
45 keys nuevas: wl_header_title, wl_nueva_lista, wl_vacia_title, wl_vacia_desc, wl_crear_primera, wl_nueva_lista_title, wl_nombre_label, wl_nombre_placeholder, wl_color_label, wl_marcar_principal, wl_crear_lista, wl_agregar_activo, wl_buscar_placeholder, wl_activos_count, wl_comparar, wl_agregar, wl_seleccionados, wl_selecciona_2_5, wl_lista_vacia, wl_agregar_primer, wl_delete_desc, wl_eliminar, wl_compartir_senal, wl_quitar_de_lista, wl_principal, wl_comparador_title, wl_cambio, wl_cmp_senal_ia, wl_cmp_probabilidad, wl_cmp_precio, wl_cmp_objetivo, wl_cmp_stop, wl_cmp_resumen, wl_mejor_performance, wl_variables_ia_10, wl_compartir_comparacion, wl_compartir_senal_de, wl_compartir_lista, wl_activos_con_senales, wl_maximo_5, wl_justificacion, wl_objetivo, wl_stop, wl_variables_modelo, wl_ult_cierre, wl_cancelar_modo

### index.html — 13 data-i18n aplicados
- L2041: wl_header_title
- L2043: wl_nueva_lista
- L2049-2051: wl_vacia_title, wl_vacia_desc, wl_crear_primera
- L2057: wl_nueva_lista_title
- L2058: wl_nombre_label
- L2059: wl_nombre_placeholder (attr)
- L2060: wl_color_label
- L2062: wl_marcar_principal
- L2063: wl_crear_lista
- L2069: wl_agregar_activo
- L2070: wl_buscar_placeholder (attr)

### aurex-features.js — funciones modificadas
- `renderWatchCnt()`: empty state, activos count, PRINCIPAL badge, marcar principal, comparar, agregar, seleccionados, lista vacia, agregar primer
- `wlDeleteList()`: delete desc, eliminar
- `wlShowActionMenu()` (long press): port_lp_analisis, wl_compartir_senal, wl_quitar_de_lista
- `wlToggleCompare()`: wl_maximo_5
- `wlShowCompare()`: wl_comparador_title
- `wlCompareSetPeriod()`: wl_cambio

Keys reutilizadas: port_lp_analisis, cancelar, port_sort_btn_prefix

---

## Verificación
- `node -c aurex-features.js` → OK
- `node -c aurex-i18n.js` → OK
- Nativa leída completa (WatchlistScreen.js 1285 líneas)
- Long press 3 opciones idénticas a nativa (Análisis IA + Compartir señal + Quitar de lista + Cancelar)
