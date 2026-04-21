# PENDING REVIEW — Tab IA i18n implementado (~33 keys × 8 idiomas)

**Archivos** (LOCAL, no pusheados): aurex-i18n.js, index.html, aurex-features.js

---

## aurex-i18n.js — sección `// === IA / SEÑALES ===`
33 keys nuevas:
- 16 keys UI: ia_senales_ia, ia_ahora, ia_alcistas, ia_bajistas, ia_mi_portfolio, ia_variables_btn, ia_eventos_del_dia, ia_justificacion, ia_variables_modelo, ia_vars_alcistas, ia_vars_bajistas, ia_otros_escenarios, ia_compartir_senal, ia_compartir_senal_de, ia_subtitulo, ia_contexto_tendencia
- 17 keys fmt: fmt_baja, fmt_alta, fmt_normal, fmt_positiva, fmt_negativa, fmt_neutral, fmt_favorable, fmt_adverso, fmt_evento_activo, fmt_sin_eventos, fmt_proximos, fmt_sin_reporte, fmt_alcista, fmt_bajista, fmt_prom, cerca_soporte, cerca_resistencia, zona_media_ia

## index.html — 8 data-i18n aplicados
- L1968: ia_eventos_del_dia
- L1979: ia_senales_ia
- L1984: ia_ahora
- L1990: ia_alcistas
- L1994: ia_bajistas
- L2003: ia_mi_portfolio
- L2004: port_sort_btn_prefix
- L2005: ia_variables_btn

## aurex-features.js — funciones modificadas
- L3971: subtítulo lista → t('ia_subtitulo')
- L2292: JUSTIFICACION DEL ANALISIS → t('ia_justificacion') (1ra instancia)
- L2295: VARIABLES DEL MODELO + alc/baj → t() con mkt_var labels (1ra instancia)
- L2296: OTROS ESCENARIOS + ALCISTA/BAJISTA/ALTA CONV → t() (1ra instancia)
- L2298: Compartir senal → t('ia_compartir_senal') (1ra instancia)
- L2333: Compartir señal TICKER → t('ia_compartir_senal_de')
- L2343: Cancelar → t('cancelar')
- L4163: JUSTIFICACION DEL ANALISIS → t() (2da instancia)
- L4199-4200: VARIABLES DEL MODELO + alcistas/bajistas → t() (2da instancia)
- L4247-4251: OTROS ESCENARIOS + labels → t() (2da instancia)
- L4257: Compartir señal → t() (2da instancia)

Nota de Escritorio aplicada: ia_vars_alcistas/ia_vars_bajistas con "bullish"/"bearish" completo (no "bull"/"bear").

---

## Verificación
- `node -c aurex-features.js` → OK
- `node -c aurex-i18n.js` → OK
- Keys fmt_* con traducciones exactas de nativa i18n.js (L882-896)
