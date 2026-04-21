# INVENTARIO COMPLETO — Tab IA (Señales IA) i18n — ACTUALIZADO

Código nativa leído completo: IAScreen.js (729 líneas) + i18n.js keys.

---

## A. HTML ESTÁTICO — index.html

| # | Línea | String actual | Key propuesta | Método |
|---|-------|---------------|---------------|--------|
| 1 | 1968 | EVENTOS DEL DIA | ia_eventos_del_dia | data-i18n |
| 2 | 1979 | Señales IA | ia_senales_ia | data-i18n |
| 3 | 1984 | · ahora | ia_ahora | data-i18n |
| 4 | 1990 | ALCISTAS | ia_alcistas | data-i18n |
| 5 | 1994 | BAJISTAS | ia_bajistas | data-i18n |
| 6 | 2003 | 💼 Mi Portfolio | ia_mi_portfolio | data-i18n |
| 7 | 2004 | Ordenar: | (reutiliza port_sort_btn_prefix) data-i18n |
| 8 | 2005 | 🔍 Variables | ia_variables_btn | data-i18n |

---

## B. JS DINÁMICO — aurex-features.js

### B1. Panel expandido — _buildIADetail

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 9 | 2292 | JUSTIFICACION DEL ANALISIS | ia_justificacion |
| 10 | 2295 | VARIABLES DEL MODELO | ia_variables_modelo |
| 11 | 2295 | → X alc | ia_vars_alc |
| 12 | 2295 | ↓ X baj | ia_vars_baj |
| 13 | 2296 | OTROS ESCENARIOS | ia_otros_escenarios |
| 14 | 2298 | 📤 Compartir senal | ia_compartir_senal |

### B2. CONTEXTO TENDENCIA (faltante detectado por Escritorio)

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 15 | ~2294 | CONTEXTO TENDENCIA (si existe en PWA) | ia_contexto_tendencia |

### B3. Formatos de variables (faltante detectado por Escritorio)

| # | Key propuesta | ES | EN |
|---|---------------|----|----|
| 16 | fmt_baja | baja | low |
| 17 | fmt_alta | alta | high |
| 18 | fmt_normal | normal | normal |
| 19 | fmt_positiva | positiva | positive |
| 20 | fmt_negativa | negativa | negative |
| 21 | fmt_neutral | neutral | neutral |
| 22 | fmt_favorable | favorable | favorable |
| 23 | fmt_adverso | adverso | adverse |
| 24 | fmt_evento_activo | evento activo | active event |
| 25 | fmt_sin_eventos | sin eventos | no events |
| 26 | fmt_proximos | próximos | upcoming |
| 27 | fmt_sin_reporte | sin reporte | no report |
| 28 | fmt_alcista | alcista | bullish |
| 29 | fmt_bajista | bajista | bearish |
| 30 | fmt_prom | prom. | avg. |
| 31 | cerca_soporte | cerca soporte | near support |
| 32 | cerca_resistencia | cerca resist. | near resist. |
| 33 | zona_media | zona media | mid zone |

### B4. Subtítulo lista + Share modal

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 34 | 3971 | X SENALES IA - ORDENADAS POR PROBABILIDAD | ia_subtitulo |
| 35 | 2333 | Compartir señal TICKER (modal title) | ia_compartir_senal_de |
| 36 | 2343 | Cancelar (share modal) | cancelar (reutiliza) |

### B5. Segunda instancia panel expandido (~L4150-4260)

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 37 | 4162 | JUSTIFICACION DEL ANALISIS | ia_justificacion |
| 38 | 4198 | VARIABLES DEL MODELO | ia_variables_modelo |
| 39 | 4248-4250 | OTROS ESCENARIOS + labels | ia_otros_escenarios + reutiliza |
| 40 | 4256 | 📤 Compartir señal | ia_compartir_senal |

---

## C. KEYS NUEVAS TOTALES (~33)

| Key | ES | EN | Fuente nativa |
|-----|----|----|---------------|
| ia_senales_ia | Señales IA | AI Signals | senales_ia |
| ia_ahora | · ahora | · now | — |
| ia_alcistas | ALCISTAS | BULLISH | alcistas_count |
| ia_bajistas | BAJISTAS | BEARISH | bajistas_count |
| ia_mi_portfolio | 💼 Mi Portfolio | 💼 My Portfolio | mi_portfolio_ia |
| ia_variables_btn | 🔍 Variables | 🔍 Variables | variables_short |
| ia_eventos_del_dia | EVENTOS DEL DIA | TODAY'S EVENTS | — |
| ia_justificacion | JUSTIFICACION DEL ANALISIS | ANALYSIS JUSTIFICATION | justificacion_analisis |
| ia_variables_modelo | VARIABLES DEL MODELO | MODEL VARIABLES | variables_modelo_upper |
| ia_vars_alc | alc | bull | — |
| ia_vars_baj | baj | bear | — |
| ia_otros_escenarios | OTROS ESCENARIOS | OTHER SCENARIOS | otros_escenarios |
| ia_compartir_senal | 📤 Compartir senal | 📤 Share signal | compartir_senal |
| ia_compartir_senal_de | Compartir señal | Share signal | — |
| ia_subtitulo | SENALES IA - ORDENADAS POR PROBABILIDAD | AI SIGNALS - ORDERED BY PROBABILITY | senales_de + activos_ordenadas |
| ia_contexto_tendencia | CONTEXTO TENDENCIA | TREND CONTEXT | contexto_tendencia |
| fmt_baja | baja | low | fmt_baja |
| fmt_alta | alta | high | fmt_alta |
| fmt_normal | normal | normal | fmt_normal |
| fmt_positiva | positiva | positive | fmt_positiva |
| fmt_negativa | negativa | negative | fmt_negativa |
| fmt_neutral | neutral | neutral | fmt_neutral |
| fmt_favorable | favorable | favorable | fmt_favorable |
| fmt_adverso | adverso | adverse | fmt_adverso |
| fmt_evento_activo | evento activo | active event | fmt_evento_activo |
| fmt_sin_eventos | sin eventos | no events | fmt_sin_eventos |
| fmt_proximos | próximos | upcoming | fmt_proximos |
| fmt_sin_reporte | sin reporte | no report | fmt_sin_reporte |
| fmt_alcista | alcista | bullish | fmt_alcista |
| fmt_bajista | bajista | bearish | fmt_bajista |
| fmt_prom | prom. | avg. | fmt_prom |
| cerca_soporte | cerca soporte | near support | cerca_soporte |
| cerca_resistencia | cerca resist. | near resist. | cerca_resistencia |
| zona_media | zona media | mid zone | zona_media |

---

## D. KEYS REUTILIZADAS

- port_signal_alcista, port_signal_bajista, port_signal_alta_conv
- port_sort_btn_prefix
- mkt_var1-10_label
- cancelar
- port_lp_analisis

---

## E. PLAN

1. Agregar ~33 keys a aurex-i18n.js sección `// === IA / SEÑALES ===`
2. Aplicar data-i18n a 8 elementos HTML estáticos
3. Modificar _buildIADetail (ambas instancias) + subtítulo + share modal con t()
4. Auto-auditoría completa
5. Push SOLO PENDING_REVIEW → Escritorio audita → Fernando OK → push código
