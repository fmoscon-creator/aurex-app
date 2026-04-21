# INVENTARIO COMPLETO — Watchlist i18n (~65 strings × 8 idiomas)

Leído código nativa completo: WatchlistScreen.js (1285 líneas) + i18n.js keys.
Leído código PWA: index.html L2036-2079 + aurex-features.js L1904-2600.

---

## A. HTML ESTÁTICO — index.html (L2036-2079)

| # | Línea | String actual | Key propuesta | Método |
|---|-------|---------------|---------------|--------|
| 1 | 2041 | Watchlist | wl_header_title | data-i18n |
| 2 | 2043 | + Nueva lista | wl_nueva_lista | data-i18n |
| 3 | 2049 | Tu Watchlist esta vacia | wl_vacia_title | data-i18n |
| 4 | 2050 | Crea tu primera lista para seguir activos con senales IA en tiempo real | wl_vacia_desc | data-i18n |
| 5 | 2051 | Crear primera lista | wl_crear_primera | data-i18n |
| 6 | 2057 | Nueva lista (modal title) | wl_nueva_lista_title | data-i18n |
| 7 | 2058 | Nombre | wl_nombre_label | data-i18n |
| 8 | 2059 | Ej: Criptos favoritas (placeholder) | wl_nombre_placeholder | data-i18n-attr="placeholder" |
| 9 | 2060 | Color | wl_color_label | data-i18n |
| 10 | 2062 | Marcar como Lista Principal | wl_marcar_principal | data-i18n |
| 11 | 2063 | Crear lista | wl_crear_lista | data-i18n |
| 12 | 2069 | Agregar activo (modal title) | wl_agregar_activo | data-i18n |
| 13 | 2070 | Buscar: BTC, AAPL, SPY... (placeholder) | wl_buscar_placeholder | data-i18n-attr="placeholder" |

---

## B. JS DINÁMICO — aurex-features.js

### B1. Empty state (renderWatchCnt L2058)

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 14 | 2058 | Tu Watchlist esta vacia | wl_vacia_title |
| 15 | 2058 | Crea tu primera lista para seguir activos con senales IA en tiempo real | wl_vacia_desc |
| 16 | 2058 | Crear primera lista | wl_crear_primera |

### B2. List cards (renderWatchCnt L2082)

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 17 | 2082 | activos (sufijo count) | wl_activos_count |

### B3. Selected list header (L2104-2129)

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 18 | 2104 | ⚖️ Comparar | wl_comparar |
| 19 | 2115 | + Agregar | wl_agregar |
| 20 | 2124 | ✓ X seleccionados — toca ⚖️ Comparar arriba | wl_seleccionados |
| 21 | 2124 | Selecciona 2 a 5 activos | wl_selecciona_2_5 |
| 22 | 2129 | Lista vacia | wl_lista_vacia |
| 23 | 2129 | Agregar primer activo | wl_agregar_primer |

### B4. Delete list confirm (L1959-1962)

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 24 | 1959 | Se eliminaran todos los activos | wl_delete_desc |
| 25 | 1962 | Eliminar | wl_eliminar |

### B5. Long press — 3 opciones (L2367-2385)

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 26 | 2370 | Análisis IA completo | port_lp_analisis (reutiliza) |
| 27 | 2375 | Compartir señal | wl_compartir_senal |
| 28 | 2380 | Quitar de esta lista | wl_quitar_de_lista |
| 29 | 2384 | Cancelar | cancelar (reutiliza) |

### B6. Comparador (wlShowCompare L2549-2600+)

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 30 | 2575 | ⚖️ Comparador AUREX | wl_comparador_title |
| 31 | 2468 | Cambio (+ período) | wl_cambio |
| 32 | -- | Señal IA (row label) | wl_cmp_senal_ia |
| 33 | -- | Probabilidad (row label) | wl_cmp_probabilidad |
| 34 | -- | Precio (row label) | wl_cmp_precio |
| 35 | -- | Objetivo (row label) | wl_cmp_objetivo |
| 36 | -- | Stop (row label) | wl_cmp_stop |
| 37 | -- | Resumen (row label) | wl_cmp_resumen |
| 38 | -- | MEJOR PERFORMANCE (badge) | wl_mejor_performance |
| 39 | -- | VARIABLES IA (10) (section) | wl_variables_ia_10 |
| 40 | -- | Compartir comparación (button) | wl_compartir_comparacion |

### B7. Share Signal modal

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 41 | -- | Compartir señal de [TICKER] | wl_compartir_senal_de |
| 42 | -- | Cancelar | cancelar (reutiliza) |

### B8. Share List modal

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 43 | -- | Compartir lista "[nombre]" | wl_compartir_lista |
| 44 | -- | X activos con señales IA | wl_activos_con_senales |

### B9. Alert/Confirm

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 45 | 2450 | Maximo 5 activos | wl_maximo_5 |

### B10. Expanded detail panel (variables, metrics)

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 46 | -- | JUSTIFICACION DEL ANALISIS | wl_justificacion |
| 47 | -- | OBJETIVO | wl_objetivo |
| 48 | -- | STOP | wl_stop |
| 49 | -- | UPSIDE / DOWNSIDE | port_detail_upside / port_detail_downside (reutiliza) |
| 50 | -- | VARIABLES DEL MODELO | wl_variables_modelo |
| 51 | -- | Compartir señal (button in panel) | wl_compartir_senal |

### B11. Primary list indicator

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 52 | -- | ⭐ PRINCIPAL | wl_principal |
| 53 | -- | ☆ Marcar principal | wl_marcar_principal |

### B12. Ult. cierre (market closed)

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 54 | -- | Ult.cierre | wl_ult_cierre |

---

## C. STRINGS QUE NO SE TRADUCEN

- Periodos: 24h, 7d, 1m, 3m, 1y — notación universal
- Tickers, nombres de activos
- "AUREX", "PROB.", "WhatsApp", "Telegram", "Mail"
- Colores (datos internos)
- "24/7" badge para crypto

---

## D. KEYS REUTILIZADAS (ya existen)

- `cancelar` — botones cancelar
- `port_lp_analisis` — "Análisis IA completo" (Full AI Analysis)
- `port_detail_upside` / `port_detail_downside` — métricas
- `port_compartir` — "Compartir"
- `mkt_copiado` — "Copiado al portapapeles"

---

## E. RESUMEN

- **Keys nuevas**: ~45 únicas
- **Keys reutilizadas**: ~8
- **Archivos**: aurex-i18n.js, index.html, aurex-features.js
- **Funciones a modificar**: renderWatchCnt, wlShowActionMenu, wlShowCompare, wlShowShareSignal, detail panel render

## F. PLAN

1. Agregar ~45 keys a aurex-i18n.js sección `// === WATCHLIST ===`
2. Aplicar data-i18n a 13 elementos HTML estáticos
3. Modificar ~6 funciones JS con t()
4. Auto-auditoría
5. PENDING_REVIEW → Escritorio → Fernando OK → push
