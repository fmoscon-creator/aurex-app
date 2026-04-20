# INVENTARIO COMPLETO — Mercados i18n (~137 strings × 8 idiomas)

## CONVENCIONES
- **Archivo**: donde está el string hardcodeado
- **Línea**: número exacto
- **String actual**: texto en español
- **Key propuesta**: clave para aurex-i18n.js
- **Método**: `data-i18n` (HTML estático) o `t('key')` (JS dinámico)

---

## A. HTML ESTÁTICO — index.html

### A1. Búsqueda universal (L1814)

| # | Línea | String actual | Key propuesta | Método |
|---|-------|---------------|---------------|--------|
| 1 | 1814 | Buscar cualquier activo... (IBIT, HOOD, MSTR, BTC...) | mkt_search_placeholder | data-i18n-attr="placeholder" |

### A2. Modal Editar Destacados (L1825-1833)

| # | Línea | String actual | Key propuesta | Método |
|---|-------|---------------|---------------|--------|
| 2 | 1829 | Editar activos destacados | mkt_pin_title | data-i18n |
| 3 | 1830 | Listo | mkt_listo | data-i18n |
| 4 | 1832 | Toc cualquier activo para fijarlo o quitarlo de los 4 destacados | mkt_pin_desc | data-i18n |

### A3. Tabs categorías (L1838-1845)

| # | Línea | String actual | Key propuesta | Método |
|---|-------|---------------|---------------|--------|
| 5 | 1839 | Cripto | mkt_tab_cripto | data-i18n |
| 6 | 1840 | Acciones | mkt_tab_acciones | data-i18n |
| 7 | 1841 | Stable & DeFi | mkt_tab_stable | data-i18n |
| 8 | 1842 | Futuros | mkt_tab_futuros | data-i18n |
| 9 | 1843 | Commodities | mkt_tab_commodities | data-i18n |
| 10 | 1844 | Divisas | mkt_tab_divisas | data-i18n |
| 11 | 1845 | ETF & Bonos | mkt_tab_etf | data-i18n |

### A4. Sub-filtros países (L1849-1856)

| # | Línea | String actual | Key propuesta | Método |
|---|-------|---------------|---------------|--------|
| 12 | 1850 | EE.UU. | mkt_pais_usa | data-i18n |
| 13 | 1851 | Argentina | mkt_pais_arg | data-i18n |
| 14 | 1852 | Brasil | mkt_pais_br | data-i18n |
| 15 | 1853 | Europa | mkt_pais_eu | data-i18n |
| 16 | 1854 | España | mkt_pais_es | data-i18n |
| 17 | 1855 | Japón | mkt_pais_jp | data-i18n |
| 18 | 1856 | China | mkt_pais_cn | data-i18n |

### A5. Timeframe + Edit (L1860-1869)

| # | Línea | String actual | Key propuesta | Método |
|---|-------|---------------|---------------|--------|
| 19 | 1868 | Act. ahora | mkt_tf_ahora | data-i18n |
| 20 | 1869 | Editar orden | mkt_editar_orden | data-i18n |

### A6. Banner modo edición (L1873-1875)

| # | Línea | String actual | Key propuesta | Método |
|---|-------|---------------|---------------|--------|
| 21 | 1874 | Arrastr para reordenar  Toc  para ocultar | mkt_edit_instrucciones | data-i18n |
| 22 | 1875 | Listo | mkt_listo | data-i18n |

### A7. Filtros IA pills (L1986-1995)

| # | Línea | String actual | Key propuesta | Método |
|---|-------|---------------|---------------|--------|
| 23 | 1986 | Todo | mkt_ia_todo | data-i18n |
| 24 | 1987 | Alcista | mkt_ia_alcista | data-i18n |
| 25 | 1988 | Bajista | mkt_ia_bajista | data-i18n |
| 26 | 1989 | Conf. IA | mkt_ia_conf | data-i18n |
| 27 | 1990 | Cripto | mkt_ia_cripto | data-i18n |
| 28 | 1991 | Acciones | mkt_ia_acciones | data-i18n |
| 29 | 1992 | ETF | mkt_ia_etf | data-i18n |
| 30 | 1993 | Metales | mkt_ia_metales | data-i18n |
| 31 | 1994 | Mat. Primas | mkt_ia_materias | data-i18n |
| 32 | 1995 | Bonos | mkt_ia_bonos | data-i18n |

---

## B. JS DINÁMICO — index.html (inline script)

### B1. Búsqueda Mercados (L1890-1898)

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 33 | 1890 | Buscando... | mkt_buscando |
| 34 | 1893 | Sin resultados para " | mkt_sin_resultados |
| 35 | 1898 | Cripto / Accion / ETF / Activo (tipo labels) | mkt_tipo_cripto, mkt_tipo_accion, mkt_tipo_etf, mkt_tipo_activo |

---

## C. JS DINÁMICO — aurex-features.js

### C1. Timeframe labels (L538)

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 36 | 538 | Act. ahora | mkt_tf_ahora |
| 37 | 538 | Últimos 7d | mkt_tf_7d |
| 38 | 538 | Último mes | mkt_tf_1m |
| 39 | 538 | Últimos 3m | mkt_tf_3m |
| 40 | 538 | Último año | mkt_tf_1y |

### C2. Banner Mercados (L1316-1390)

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 41 | 1351 | ABIERTO | mkt_status_abierto |
| 42 | 1351 | CERRADO | mkt_status_cerrado |
| 43 | 1383 | Mercados en banner | mkt_edit_banner_title |
| 44 | 1387 | Listo | mkt_listo |

### C3. AUREX Pulse widget (L4525-4639)

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 45 | 4529 | Calculando AUREX PULSE™... | mkt_pulse_loading |
| 46 | 4606 | 📊 Ver variables | mkt_pulse_ver_variables |

### C4. Pulse Info modal — showFearGreedInfo (L4641-4691)

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 47 | 4674 | ⚡ AUREX FEAR & GREED 14X™ | mkt_pulse_info_title |
| 48 | 4675 | El índice de sentimiento más completo del mercado | mkt_pulse_info_subtitle |
| 49 | 4677 | Las 5 zonas: | mkt_pulse_zonas_title |
| 50 | 4678 | 🔴 0-20 Miedo Extremo | mkt_pulse_zona_miedo_ext |
| 51 | 4678 | 🟠 21-40 Miedo | mkt_pulse_zona_miedo |
| 52 | 4678 | 🟡 41-60 Neutral | mkt_pulse_zona_neutral |
| 53 | 4679 | 🟢 61-80 Codicia | mkt_pulse_zona_codicia |
| 54 | 4679 | 💜 81-100 Codicia Extrema | mkt_pulse_zona_codicia_ext |
| 55 | 4681 | Variables activas (12 de 14): | mkt_pulse_vars_title |
| 56 | 4683 | VARIABLE / FUENTE / PESO / VALOR (headers tabla) | mkt_pulse_th_variable, mkt_pulse_th_fuente, mkt_pulse_th_peso, mkt_pulse_th_valor |
| 57 | 4648 | BTC momentum | (NO traducir — nombre técnico) |
| 58 | 4650 | VIX volatilidad | mkt_pulse_var_vix |
| 59 | 4651 | S&P500 momentum | (NO traducir — nombre técnico) |
| 60 | 4656 | Oro GC=F | mkt_pulse_var_oro |
| 61 | 4657 | Plata SI=F | mkt_pulse_var_plata |
| 62 | 4658 | Petróleo CL=F | mkt_pulse_var_petroleo |
| 63 | 4659 | Cobre HG=F | mkt_pulse_var_cobre |
| 64 | 4660 | Macro FED | (NO traducir — nombre propio) |
| 65 | 4661 | Geopolítica | mkt_pulse_var_geopolitica |
| 66 | 4686 | * Macro FED (FRED API) y Geopolítica... (disclaimer) | mkt_pulse_disclaimer |
| 67 | 4687 | Entendido | port_entendido (reutiliza) |

### C5. Ver Variables popup — showIAVariablesPopup (L3932-4002)

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 68 | 3991 | AUREX IA ⚡ — 10 VARIABLES | mkt_vars_title |
| 69 | 3994 | Motor de señales v7 — tiempo real | mkt_vars_subtitle |
| 70 | 3996 | Cada señal es el resultado de puntuar 10 variables... | mkt_vars_desc |
| 71 | 3961 | Mercado ahora: | mkt_vars_mercado_ahora |
| 72 | 3962 | → X al alza | mkt_vars_al_alza |
| 73 | 3964 | ↓ X a la baja | mkt_vars_a_la_baja |
| 74 | 3946 | 1. Tendencia 24h | mkt_var1_label |
| 75 | 3946 | Variación % del precio en las últimas 24hs... | mkt_var1_desc |
| 76 | 3947 | 2. RSI14 Real | mkt_var2_label |
| 77 | 3947 | Índice de Fuerza Relativa de 14 períodos... | mkt_var2_desc |
| 78 | 3948 | 3. Volumen Real | mkt_var3_label |
| 79 | 3948 | Ratio de volumen actual vs promedio... | mkt_var3_desc |
| 80 | 3949 | 4. Volatilidad | mkt_var4_label |
| 81 | 3949 | Amplitud del rango diario... | mkt_var4_desc |
| 82 | 3950 | 5. Correlación BTC/SPY | mkt_var5_label |
| 83 | 3950 | Para cripto: correlación con BTC... | mkt_var5_desc |
| 84 | 3951 | 6. Oro / Petróleo | mkt_var6_label |
| 85 | 3951 | Precios de activos refugio... | mkt_var6_desc |
| 86 | 3952 | 7. Macro FED | mkt_var7_label |
| 87 | 3952 | Eventos macro de alto impacto... | mkt_var7_desc |
| 88 | 3953 | 8. Earnings | mkt_var8_label |
| 89 | 3953 | Reportes de resultados próximos... | mkt_var8_desc |
| 90 | 3954 | 9. MACD (12/26) | mkt_var9_label |
| 91 | 3954 | Divergencia entre EMA12 y EMA26... | mkt_var9_desc |
| 92 | 3955 | 10. Soporte / Resist. 30d | mkt_var10_label |
| 93 | 3955 | Distancia del precio actual al máximo... | mkt_var10_desc |

### C6. Long Press Mercados (L6080-6134)

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 94 | 6085 | Precio | mkt_lp_precio |
| 95 | 6086 | 24h | (NO traducir — notación universal) |
| 96 | 6087 | Objetivo IA | mkt_lp_objetivo_ia |
| 97 | 6092 | ALCISTA / BAJISTA | port_signal_alcista / port_signal_bajista (reutiliza) |
| 98 | 6096 | Señal IA | mkt_lp_senal_ia |
| 99 | 6104 | ★ Quitar de Favoritos | mkt_lp_quitar_fav |
| 100 | 6105 | ★ Agregar a Favoritos | mkt_lp_agregar_fav |
| 101 | 6122 | Agregar a Portfolio | mkt_lp_agregar_portfolio |
| 102 | 6132 | Cerrar | mkt_lp_cerrar |

### C7. Banner Futuros (L4698-4827)

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 103 | 4760 | Cargando... | port_cargando (reutiliza) |
| 104 | 4784 | Fut (sufijo) | mkt_fut_suffix |
| 105 | 4820 | Futuros en banner | mkt_fut_edit_title |
| 106 | 4824 | Listo | mkt_listo |
| 107 | 4656 | Oro (en FUTURES_ITEMS name) | (NO traducir — nombre de activo financiero estándar) |

### C8. Otros strings globales

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 108 | 5983 | Copiado al portapapeles | mkt_copiado |
| 109 | 5996 | Copiado al portapapeles | mkt_copiado |
| 110 | 6320 | · hace Xs / · hace X min | mkt_live_hace_s, mkt_live_hace_min |

---

## D. STRINGS QUE NO SE TRADUCEN

- Nombres de activos/futuros: S&P500, Nasdaq, Dow, Russell, VIX, Brent, WTI, DXY, EUR/USD, Merval, Bovespa, IBEX, Bitcoin, etc.
- Nombres técnicos de variables: BTC momentum, ETH momentum, S&P500 momentum, RSI14, MACD, Macro FED
- Tickers: ES=F, NQ=F, YM=F, etc.
- Nombres de fuentes: Binance, Yahoo, FRED API, GDELT
- Porcentajes de peso: 12%, 8%, etc.
- "AUREX PULSE™" — marca registrada
- Timeframes cortos: 24h, 7d, 1m, 3m, 1a — notación universal
- Nombres de mercados (EEUU, ARG, etc.) — se mantienen como IDs, el flag+nombre los identifica visualmente

---

## E. RESUMEN

- **Keys nuevas estimadas**: ~85 únicas
- **Keys reutilizadas**: port_entendido, port_cargando, port_signal_alcista, port_signal_bajista, cancelar, mkt_listo (compartida)
- **Archivos a modificar**: aurex-i18n.js, index.html, aurex-features.js

## F. PLAN (pendiente OK de Fernando)

1. Agregar ~85 keys nuevas a aurex-i18n.js sección `// === MERCADOS ===`
2. Aplicar data-i18n a ~32 elementos HTML estáticos
3. Modificar ~8 funciones JS para usar t()
4. Auto-auditoría completa
5. Push SOLO PENDING_REVIEW → Escritorio audita → Fernando OK → push código
