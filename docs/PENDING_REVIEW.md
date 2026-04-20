# PENDING REVIEW — Fix Portfolio i18n: Termómetro visual + Sort + Modal Idioma 8 idiomas

**Archivos modificados** (NO pusheados, solo local):
- aurex-i18n.js — +45 keys nuevas (termómetro visual + sort)
- aurex-features.js — 3 fixes:

---

## Fix 1: Modal Idioma — solo tenía 4 idiomas, ahora 8

**L5039**: `flags` objeto expandido de 4 a 8 (agrega fr, it, hi, ar)
**L6276-6284**: Array `langs` expandido de 4 a 8 idiomas, todos con `soon: false`
**L6298-6300**: Título usa `t('idioma_label')`, Cancelar usa `t('cancelar')`

## Fix 2: Termómetro visual (_renderThermoBuckets) — todo en español

**L1267-1270**: Labels de leyenda → `t('port_thermo_leg_alcista')`, etc.
**L1286-1298**: 6 mensajes de recomendación → `t('port_thermo_msg_*')`
**L1303**: "TERMÓMETRO DE RIESGO" → `t('port_thermo_bar_title')`
**L1306**: "CAPITAL POR SEÑAL IA" → `t('port_thermo_bar_subtitle')`

Keys nuevas (22):
- port_thermo_bar_title, port_thermo_bar_subtitle
- port_thermo_leg_alcista, port_thermo_leg_bajista, port_thermo_leg_sindir, port_thermo_leg_sinsenal
- port_thermo_msg_baj50, port_thermo_msg_baj50_suf, port_thermo_msg_baj50_tip
- port_thermo_msg_baj20, port_thermo_msg_baj20_suf, port_thermo_msg_baj20_tip
- port_thermo_msg_alc50, port_thermo_msg_alc50_suf, port_thermo_msg_alc50_tip
- port_thermo_msg_hc40, port_thermo_msg_hc40_tip
- port_thermo_msg_sin70, port_thermo_msg_sin70_tip
- port_thermo_msg_mix, port_thermo_msg_mix_tip

## Fix 3: Sort modal + botón — todo en español

**L5538-5573**: `_sortCfgs` cambia `l:` y `d:` por `lk:` y `dk:` (keys de traducción)
**L5604**: "Ordenar por" → `t('port_sort_title')`
**L5613-5614**: Labels/desc → `t(o.lk)` / `t(o.dk)`
**L5622**: Botón tras selección → `t('port_sort_btn_prefix')`
**L5630**: "Cancelar" → `t('cancelar')`
**L5648**: Botón inicial → `t('port_sort_btn_prefix')` + `t(curOpt.lk)`

Keys nuevas (23):
- port_sort_title, port_sort_btn_prefix
- sort_valor, sort_valor_d, sort_pct_hoy, sort_pct_hoy_d
- sort_pnl_usd, sort_pnl_usd_d, sort_pnl_pct, sort_pnl_pct_d
- sort_senal_ia, sort_senal_ia_d, sort_prob, sort_prob_d
- sort_ticker, sort_ticker_d, sort_fecha, sort_fecha_d
- sort_default, sort_default_d, sort_precio, sort_precio_d
- sort_pct_7d, sort_pct_7d_d, sort_pct_30d, sort_pct_30d_d
- sort_upside, sort_upside_d, sort_default_ia_d

---

## Verificación
- Todas las keys con 8 idiomas: ES, EN, PT, ZH, FR, IT, HI, AR
- Modal Idioma ahora muestra 8 banderas seleccionables (ninguna SOON)
- Termómetro visual traduce: título, subtítulo, 4 labels leyenda, 6 mensajes
- Sort traduce: título modal, botón, 8 opciones portfolio, 6 mercados, 7 watchlist, 7 IA
