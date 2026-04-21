# INVENTARIO COMPLETO — Tab IA (Señales IA) i18n

Código nativa leído completo: IAScreen.js (729 líneas).
Código PWA leído: index.html L1960-2032 + aurex-features.js (múltiples funciones).

---

## A. HTML ESTÁTICO — index.html

| # | Línea | String actual | Key propuesta | Método |
|---|-------|---------------|---------------|--------|
| 1 | 1968 | EVENTOS DEL DIA | ia_eventos_del_dia | data-i18n |
| 2 | 1979 | Señales IA | ia_senales_ia | data-i18n |
| 3 | 1984 | · ahora | ia_ahora | data-i18n |
| 4 | 1990 | ALCISTAS | ia_alcistas | data-i18n |
| 5 | 1994 | BAJISTAS | ia_bajistas | data-i18n |
| 6 | 1998 | ALTA CONV-IA | (NO traducir — nombre del modelo) |
| 7 | 2003 | 💼 Mi Portfolio | ia_mi_portfolio | data-i18n |
| 8 | 2004 | Ordenar: | (reutiliza port_sort_btn_prefix) |
| 9 | 2005 | 🔍 Variables | ia_variables_btn | data-i18n |

---

## B. JS DINÁMICO — aurex-features.js

### B1. Panel expandido señal (_buildIADetail ~L2280-2300)

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 10 | 2292 | JUSTIFICACION DEL ANALISIS | ia_justificacion |
| 11 | 2295 | VARIABLES DEL MODELO | ia_variables_modelo |
| 12 | 2295 | → X alc | ia_vars_alc (sufijo) |
| 13 | 2295 | ↓ X baj | ia_vars_baj (sufijo) |
| 14 | 2295 | Variable labels (Tendencia 24h, RSI14, etc.) | (reutiliza mkt_var1-10_label) |
| 15 | 2296 | OTROS ESCENARIOS | ia_otros_escenarios |
| 16 | 2296 | ALCISTA / BAJISTA / ALTA CONV-IA (labels escenarios) | (reutiliza port_signal_*) |
| 17 | 2298 | 📤 Compartir senal | ia_compartir_senal |

### B2. Panel expandido segunda instancia (~L4150-4260)

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 18 | 4162 | JUSTIFICACION DEL ANALISIS | ia_justificacion |
| 19 | 4198 | VARIABLES DEL MODELO | ia_variables_modelo |
| 20 | 4248-4250 | ALCISTA/BAJISTA/ALTA CONV-IA (otros escenarios) | reutiliza |

### B3. Subtítulo lista (L3971)

| # | Línea | String actual | Key propuesta |
|---|-------|---------------|---------------|
| 21 | 3971 | X SENALES IA - ORDENADAS POR PROBABILIDAD | ia_subtitulo_lista |

### B4. Direction labels (múltiples funciones)

| # | Líneas | String actual | Key propuesta |
|---|--------|---------------|---------------|
| 22 | 2010,2142,2281,2312,4100,4154,4271 | ALCISTA/BAJISTA/ALTA CONV-IA | reutiliza port_signal_alcista, port_signal_bajista, port_signal_alta_conv |

---

## C. KEYS NUEVAS NECESARIAS (~15)

| Key | ES | EN |
|-----|----|----|
| ia_senales_ia | Señales IA | AI Signals |
| ia_ahora | · ahora | · now |
| ia_alcistas | ALCISTAS | BULLISH |
| ia_bajistas | BAJISTAS | BEARISH |
| ia_mi_portfolio | 💼 Mi Portfolio | 💼 My Portfolio |
| ia_variables_btn | 🔍 Variables | 🔍 Variables |
| ia_eventos_del_dia | EVENTOS DEL DIA | TODAY'S EVENTS |
| ia_justificacion | JUSTIFICACION DEL ANALISIS | ANALYSIS JUSTIFICATION |
| ia_variables_modelo | VARIABLES DEL MODELO | MODEL VARIABLES |
| ia_vars_alc | alc | bull |
| ia_vars_baj | baj | bear |
| ia_otros_escenarios | OTROS ESCENARIOS | OTHER SCENARIOS |
| ia_compartir_senal | 📤 Compartir senal | 📤 Share signal |
| ia_subtitulo_lista | SENALES IA - ORDENADAS POR PROBABILIDAD | AI SIGNALS - ORDERED BY PROBABILITY |

---

## D. KEYS REUTILIZADAS (ya existen)

- port_signal_alcista, port_signal_bajista, port_signal_alta_conv
- port_sort_btn_prefix ("Ordenar:")
- mkt_var1-10_label (nombres variables)
- cancelar, port_lp_analisis, port_compartir

---

## E. STRINGS QUE NO SE TRADUCEN

- "ALTA CONV-IA" como nombre del modelo/dirección (la nativa tampoco lo traduce en los counters)
- Motivos/justificaciones del análisis (contenido generado por IA, español en ambas versiones)
- Períodos: 24h, 7d, 1m, 3m, 1y
- "AUREX", "LIVE", "PROB."

---

## F. PLAN

1. Agregar ~15 keys nuevas a aurex-i18n.js sección `// === IA / SEÑALES ===`
2. Aplicar data-i18n a ~8 elementos HTML estáticos
3. Modificar _buildIADetail y funciones relacionadas con t()
4. Auto-auditoría
5. PENDING_REVIEW → Escritorio → Fernando OK → push
