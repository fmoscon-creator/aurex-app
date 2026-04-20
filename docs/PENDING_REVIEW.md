# INVENTARIO COMPLETO — Portfolio i18n (112 strings × 8 idiomas)

## CONVENCIONES
- **Archivo**: donde está el string hardcodeado
- **Línea**: número de línea exacto
- **String actual**: texto en español actual
- **Key propuesta**: clave para aurex-i18n.js
- **Método**: `data-i18n` (HTML estático) o `t('key')` (JS dinámico)

---

## A. HTML ESTÁTICO — index.html (24 strings)

### A1. Header Portfolio (L1445-1524)

| # | Línea | String actual | Key propuesta | Método |
|---|-------|---------------|---------------|--------|
| 1 | 1471 | Portfolio | port_header_title | data-i18n |
| 2 | 1484 | VALOR TOTAL | port_valor_total | data-i18n |
| 3 | 1495 | 24 horas ✓ | port_period_24h | data-i18n |
| 4 | 1496 | 7 días | port_period_7d | data-i18n |
| 5 | 1497 | 1 mes | port_period_1m | data-i18n |
| 6 | 1498 | 3 meses | port_period_3m | data-i18n |
| 7 | 1499 | 1 año | port_period_1y | data-i18n |
| 8 | 1500 | Desde compra | port_period_buy | data-i18n |
| 9 | 1512 | Activos | port_activos_label | data-i18n |
| 10 | 1516 | 🏆 Mejor 24h | port_mejor_24h | data-i18n |
| 11 | 1519 | Agregar Activos ＋ | port_agregar_activos | data-i18n |
| 12 | 1520 | ⇄ Conv. | port_conv_btn | data-i18n |

### A2. Modal Detalle (L1527-1536)

| # | Línea | String actual | Key propuesta | Método |
|---|-------|---------------|---------------|--------|
| 13 | 1531 | Detalle | port_detalle_title | data-i18n |

### A3. Modal Agregar/Editar (L1546-1555)

| # | Línea | String actual | Key propuesta | Método |
|---|-------|---------------|---------------|--------|
| 14 | 1550 | Agregar activo | port_agregar_activo | data-i18n |

### A4. Modal Conversor (L1557-1599)

| # | Línea | String actual | Key propuesta | Método |
|---|-------|---------------|---------------|--------|
| 15 | 1561 | Conversor | port_conversor_title | data-i18n |
| 16 | 1565 | Monto | port_conv_monto | data-i18n |
| 17 | 1570 | De | port_conv_de | data-i18n |
| 18 | 1582 | A | port_conv_a | data-i18n |
| 19 | 1594 | Resultado | port_conv_resultado | data-i18n |
| 20 | 1596 | Ingresá un monto para convertir | port_conv_placeholder | data-i18n |

### A5. Asset Picker Modal (L1600-1612)

| # | Línea | String actual | Key propuesta | Método |
|---|-------|---------------|---------------|--------|
| 21 | 1603 | Seleccionar activo | port_picker_title | data-i18n |
| 22 | 1608 | Buscar por nombre o ticker... | port_picker_search_placeholder | data-i18n-attr="placeholder" |

### A6. Asset Picker — Section headers (L1683, en <script> inline)

| # | Línea | String actual | Key propuesta | Método |
|---|-------|---------------|---------------|--------|
| 23 | 1683 | Monedas Fiat | port_picker_fiat | t('key') en renderAssetList |
| 24 | 1683 | Acciones USA | port_picker_stocks | t('key') en renderAssetList |

> **Nota**: "Crypto", "Stablecoins" y "Commodities" son iguales en todos los idiomas — no necesitan traducción.

---

## B. JS DINÁMICO — aurex-features.js (81 strings)

### B1. Estado vacío (L887-892) — `_renderPortfolioEmpty()`

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 25 | 889 | Tu portfolio esta vacio | port_empty_title |
| 26 | 890 | Agrega tu primer activo para empezar a seguir tu cartera en tiempo real | port_empty_desc |
| 27 | 891 | + Agregar primer activo | port_empty_btn |

### B2. Cuenta requerida (L1494-1501) — `openAddActivo()`

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 28 | 1497 | Necesitás una cuenta | port_need_account_title |
| 29 | 1498 | Para guardar activos reales, creá tu cuenta gratis. | port_need_account_desc |
| 30 | 1499 | Crear cuenta gratis → | port_need_account_btn |
| 31 | 1500 | Ya tengo cuenta | port_need_account_login |

### B3. Modal Agregar activo (L1509-1528) — `_openAddActivoModal()`

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 32 | 1514 | Agregar activo | port_agregar_activo |
| 33 | 1517 | Buscar ticker o nombre (ej: IBIT, HOOD, BTC...) | port_search_placeholder |
| 34 | 1521 | Cantidad | port_cantidad_label |
| 35 | 1521 | Ej: 0.5 | port_cantidad_placeholder |
| 36 | 1522 | Precio de compra (USD) | port_precio_compra_label |
| 37 | 1522 | Ej: 65000 | port_precio_placeholder |
| 38 | 1523 | 📊 VISTA PREVIA | port_preview_title |
| 39 | 1523 | Precio actual de mercado: | port_preview_precio_mercado |
| 40 | 1523 | Valor que sumará al portfolio: | port_preview_valor_sumara |
| 41 | 1523 | P&L inicial (vs precio compra): | port_preview_pnl_inicial |
| 42 | 1525 | Guardar | guardar |

### B4. Búsqueda activos (L1608-1645) — `filterPortSearch()` / `selectPortActivo()`

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 43 | 1608 | Buscando... | port_buscando |
| 44 | 1612 | Sin resultados para " | port_sin_resultados |
| 45 | 1645 | Cargando... | port_cargando |

### B5. Validaciones (L1690-1696) — `savePortActivo()`

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 46 | 1690 | Seleccioná un activo de la lista | port_err_select_activo |
| 47 | 1695 | Ingresá una cantidad mayor a 0 | port_err_cantidad |
| 48 | 1696 | Ingresá un precio de compra mayor a 0 | port_err_precio |

### B6. Modal Duplicados (L1714-1756) — `_showDupeModal()`

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 49 | 1726 | ya está en tu portfolio | port_dupe_title_suffix |
| 50 | 1726 | ¿Qué querés hacer? | port_dupe_question |
| 51 | 1731 | ACTUAL | port_dupe_actual |
| 52 | 1732 | Cantidad | port_cantidad_label |
| 53 | 1734 | Precio compra | port_precio_compra_short |
| 54 | 1738 | NUEVO | port_dupe_nuevo |
| 55 | 1739 | Cantidad | port_cantidad_label |
| 56 | 1741 | Precio compra | port_precio_compra_short |
| 57 | 1746 | ➕ Sumar al existente | port_dupe_sumar |
| 58 | 1747 | Total: | port_dupe_total |
| 59 | 1747 | Precio promedio ponderado: | port_dupe_promedio |
| 60 | 1750 | ↻ Reemplazar valores | port_dupe_reemplazar |
| 61 | 1751 | Descarta lo anterior · Nuevo: | port_dupe_descarta |
| 62 | 1754 | Cancelar | cancelar |

### B7. Termómetro de Riesgo Info (L1415-1446) — `showThermoInfo()`

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 63 | 1420 | 🌡️ Termómetro de Riesgo | port_thermo_title |
| 64 | 1421 | Muestra cómo está distribuido el capital de tu cartera según las señales activas de AUREX IA: | port_thermo_desc |
| 65 | 1426 | ALCISTA | port_signal_alcista |
| 66 | 1426 | La IA ve momentum positivo: precio subiendo, volumen comprador. Alta probabilidad de suba en 24-48hs. | port_thermo_alcista_desc |
| 67 | 1431 | ALTA CONV-IA | port_signal_alta_conv |
| 68 | 1431 | La señal más valiosa y rara. Máxima atención: movimiento fuerte inminente. Solo 1-2 activos por día reciben esta señal. | port_thermo_conv_desc |
| 69 | 1436 | BAJISTA | port_signal_bajista |
| 70 | 1436 | La IA ve momentum negativo: precio cayendo, volumen vendedor. Alta probabilidad de baja en 24-48hs. | port_thermo_bajista_desc |
| 71 | 1441 | SIN SEÑAL | port_signal_sin_senal |
| 72 | 1441 | No hay señal activa hoy para este activo. No es una alerta, simplemente el modelo no detectó nada destacable. | port_thermo_sin_senal_desc |
| 73 | 1444 | Entendido | port_entendido |

### B8. Termómetro Help (L1452-1476) — `showThermoHelp()`

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 74 | 1463 | 🌡️ Cómo leer el Termómetro | port_thermo_help_title |
| 75 | 1467 | 🟢 Verde — Alcista | port_thermo_help_verde |
| 76 | 1467 | Señal confirmada de suba. Buen momento para mantener o aumentar posición. | port_thermo_help_verde_desc |
| 77 | 1468 | 🔴 Rojo — Bajista | port_thermo_help_rojo |
| 78 | 1468 | Señal confirmada de caída. Evaluá reducir antes de que baje más. | port_thermo_help_rojo_desc |
| 79 | 1469 | ⚡ Dorado — Sin dirección | port_thermo_help_dorado |
| 80 | 1469 | Movimiento fuerte inminente sin confirmar. Esperá la señal — no operar todavía. | port_thermo_help_dorado_desc |
| 81 | 1470 | ⚫ Gris — Sin señal | port_thermo_help_gris |
| 82 | 1470 | La IA no tiene datos suficientes hoy. Sin acción recomendada. | port_thermo_help_gris_desc |
| 83 | 1472 | El % indica cuánto de tu capital está en cada zona. Se actualiza con precios actuales. | port_thermo_help_footer |
| 84 | 1473 | Entendido | port_entendido |

### B9. Conversor (L642-668) — `pcLoadPrices()`

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 85 | 644 | Obteniendo precios... | port_conv_loading |
| 86 | 662 | Precios en vivo via Binance | port_conv_live |
| 87 | 668 | Precios sin conexion (aprox) | port_conv_offline |

### B10. Detalle activo (L2770-2876) — `openPortItemDetail()`

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 88 | 2781 | Precio cerca del mínimo anual — zona históricamente baja | port_52w_zone_low |
| 89 | 2782 | Precio en zona media del rango anual | port_52w_zone_mid |
| 90 | 2783 | Precio cerca del máximo anual — zona históricamente alta | port_52w_zone_high |
| 91 | 2786 | ↓ Mín: | port_52w_min |
| 92 | 2787 | 52 semanas | port_52w_label |
| 93 | 2788 | → Máx: | port_52w_max |
| 94 | 2797 | % del rango anual | port_52w_pct_range |
| 95 | 2818 | Objetivo | port_detail_objetivo |
| 96 | 2819 | Stop Loss | port_detail_stop_loss |
| 97 | 2820 | Upside / Downside | port_detail_upside / port_detail_downside |
| 98 | 2825 | Sin senal activa hoy | port_sin_senal_hoy |
| 99 | 2836 | Precio compra | port_precio_compra_short |
| 100 | 2837 | Cantidad | port_cantidad_label |
| 101 | 2838 | P&L USD | port_pnl_usd |
| 102 | 2839 | Entrada | port_entrada |
| 103 | 2840 | ↓ Mín 52 sem. | port_min_52sem |
| 104 | 2841 | → Máx 52 sem. | port_max_52sem |

### B11. Simulador de escenarios (L2848-2861)

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 105 | 2849 | SIMULADOR DE ESCENARIOS | port_sim_title |
| 106 | 2851 | Si el precio cambia: | port_sim_label |
| 107 | 2856 | Nuevo precio | port_sim_nuevo_precio |
| 108 | 2857 | P&L del activo | port_sim_pnl_activo |
| 109 | 2858 | Impacto en portfolio total | port_sim_impacto_total |
| 110 | 2861 | Compartir | port_compartir |

### B12. Eliminar activo (L2979)

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 111 | 2979 | ¿Eliminar este activo del portfolio? | port_confirm_eliminar |

### B13. Editar posición — Long Press (L6146-6192) — `_lpEditarPortItem()`

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 112 | 6150 | Item no encontrado | port_item_not_found |
| 113 | 6160 | Editar (+ símbolo) | port_editar_title |
| 114 | 6162 | Cantidad | port_cantidad_label |
| 115 | 6166 | Precio compra | port_precio_compra_short |
| 116 | 6173 | Cancelar | cancelar |
| 117 | 6175 | Guardar | guardar |
| 118 | 6184 | Cantidad y precio deben ser mayores a 0 | port_err_edit_values |

### B14. Long Press Sheet opciones (L6197-6221) — `_attachAllPortfolioLP()`

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 119 | 6209 | Análisis IA completo | port_lp_analisis |
| 120 | 6211 | Editar | port_lp_editar |
| 121 | 6213 | Compartir | port_lp_compartir |
| 122 | 6217 | Eliminar (+ ticker) + ? | port_lp_confirmar_eliminar |

---

## C. RESUMEN DE KEYS ÚNICAS (desduplicadas)

Keys reutilizadas que ya existen en aurex-i18n.js:
- `guardar` (ya existe — B3 L1525, B13 L6175)
- `cancelar` (ya existe — B6 L1754, B13 L6173)

Keys nuevas a agregar: **~95 keys únicas** × 8 idiomas

---

## D. STRINGS QUE NO SE TRADUCEN

- Nombres de cryptos/stocks (Bitcoin, Ethereum, Apple, etc.) — datos, no UI
- "Crypto", "Stablecoins", "Commodities" — iguales en todos los idiomas
- Tickers (BTC, ETH, USD, etc.)
- Nombres de monedas fiat en conversor (Dolar USA, Peso Argentino, etc.) — la nativa tampoco los traduce, son nombres propios locales
- "AUREX", "P&L", "Stop Loss", "LIVE" — terminología financiera universal
- Periodos cortos del detalle: "24h", "7d", "1m", "3m", "1y" — notación universal

---

## E. PLAN DE EJECUCIÓN (pendiente OK de Fernando)

1. Agregar ~95 keys nuevas a aurex-i18n.js sección `// === PORTFOLIO ===`
2. Aplicar data-i18n a 22 elementos HTML estáticos
3. Modificar ~12 funciones JS para usar t('key')
4. Auto-auditoría completa antes de proponer push
5. Subir a PENDING_REVIEW → Escritorio verifica → Fernando OK → push
