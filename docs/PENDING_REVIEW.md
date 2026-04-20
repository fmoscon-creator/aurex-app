# PENDING REVIEW — Portfolio i18n completo (95 keys × 8 idiomas)

**Commit**: pendiente push
**Archivos modificados**: 3

---

## Resumen de cambios

### 1. aurex-i18n.js — +95 keys nuevas (sección `// === PORTFOLIO ===`)
- Header: port_header_title, port_valor_total, port_period_*, port_activos_label, port_mejor_24h, port_agregar_activos, port_conv_btn
- Modales: port_detalle_title, port_agregar_activo, port_conversor_title, port_conv_*
- Picker: port_picker_title, port_picker_search_placeholder, port_picker_fiat, port_picker_stocks
- Estado vacío: port_empty_title, port_empty_desc, port_empty_btn
- Cuenta requerida: port_need_account_*
- Formulario agregar: port_search_placeholder, port_cantidad_*, port_precio_*, port_preview_*
- Búsqueda: port_buscando, port_sin_resultados, port_cargando
- Validaciones: port_err_select_activo, port_err_cantidad, port_err_precio
- Duplicados: port_dupe_*
- Termómetro: port_thermo_*, port_signal_*, port_entendido
- Thermo Help: port_thermo_help_*
- 52 semanas: port_52w_*
- Detalle señal: port_detail_objetivo, port_detail_stop_loss, port_detail_upside, port_detail_downside, port_sin_senal_hoy
- Grid info: port_pnl_usd, port_entrada, port_min_52sem, port_max_52sem
- Simulador: port_sim_*
- Compartir: port_compartir
- Eliminar: port_confirm_eliminar
- Editar: port_editar_title, port_item_not_found, port_err_edit_values
- Long press: port_lp_analisis, port_lp_editar, port_lp_compartir, port_lp_confirmar_eliminar

Reutiliza keys existentes: `guardar`, `cancelar`

### 2. index.html — 22 data-i18n aplicados
- L1471: port_header_title
- L1484: port_valor_total
- L1495-1500: port_period_24h/7d/1m/3m/1y/buy (dropdown items)
- L1512: port_activos_label
- L1516: port_mejor_24h (data-i18n-html)
- L1519: port_agregar_activos (data-i18n-html)
- L1520: port_conv_btn (data-i18n-html)
- L1531: port_detalle_title
- L1550: port_agregar_activo
- L1561: port_conversor_title
- L1565: port_conv_monto
- L1570: port_conv_de
- L1582: port_conv_a
- L1594: port_conv_resultado
- L1596: port_conv_placeholder
- L1603: port_picker_title
- L1608: port_picker_search_placeholder (data-i18n-attr="placeholder")
- L1683: renderAssetList typeName usa t() para fiat y stocks

### 3. aurex-features.js — 12 funciones modificadas con t()
- `_renderPortfolioEmpty()` — 3 strings
- `pcLoadPrices()` — 3 strings
- `showThermoInfo()` — 11 strings
- `showThermoHelp()` — 11 strings
- `openAddActivo()` — 4 strings (cuenta requerida)
- `_openAddActivoModal()` — 11 strings (formulario completo)
- `filterPortSearch()` — 2 strings
- `selectPortActivo()` — 1 string (Cargando...)
- `savePortActivo()` — 3 strings (validaciones)
- `_showDupeModal()` — 14 strings (modal completo)
- `openPortItemDetail()` — 22 strings (52w, signal, grid, simulator, compartir)
- `deletePortfolioItem()` — 1 string (confirm)
- `_lpEditarPortItem()` — 6 strings (modal editar)
- `_attachAllPortfolioLP()` — 4 strings (long press labels)

---

## Verificación
- Todos los 8 idiomas presentes en cada key: ES, EN, PT, ZH, FR, IT, HI, AR
- Keys `guardar` y `cancelar` reutilizadas correctamente (ya existían)
- Strings que NO se traducen: nombres cryptos/stocks, tickers, "P&L", "Stop Loss", "LIVE", periodos cortos (24h/7d/1m/3m/1y)
- `port_detail_upside` y `port_detail_downside` implementados como 2 keys separadas (aclaración de Escritorio)
