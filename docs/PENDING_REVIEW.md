# PENDING REVIEW — Fix gauge i18n + Variables popup + Banners card visual

**Archivos** (LOCAL, no pusheados): aurex-i18n.js, aurex-features.js

---

## Fix 1: Bug Gauge — "Codicia" hardcodeado (Bug 1 de Escritorio)

**L4445-4449**: Labels cortas de zona del gauge → `t('mkt_gauge_*')`
5 keys nuevas: mkt_gauge_miedo_ext, mkt_gauge_miedo, mkt_gauge_neutral, mkt_gauge_codicia, mkt_gauge_codicia_ext

## Fix 2: showIAVariablesPopup() completo

**L3945-3955**: 10 variables varDefs → `t('mkt_var1_label')` ... `t('mkt_var10_label')` + `t('mkt_var1_desc')` ... `t('mkt_var10_desc')`
**L3961-3964**: "Mercado ahora:" + "al alza" + "a la baja" → t()
**L3988**: summaryMkt duplicado → t()
**L3991**: Título "AUREX IA ⚡ — 10 VARIABLES" → t('mkt_vars_title')
**L3994**: Subtítulo → t('mkt_vars_subtitle')
**L3996**: Descripción → t('mkt_vars_desc')
**L3978**: "Peso Alta/Media" → t('mkt_vars_peso') + t('mkt_vars_peso_alta')/t('mkt_vars_peso_media')

Keys nuevas: 3 (mkt_vars_peso, mkt_vars_peso_alta, mkt_vars_peso_media)
Keys ya existentes aplicadas: mkt_var1-10_label, mkt_var1-10_desc, mkt_vars_title, mkt_vars_subtitle, mkt_vars_desc, mkt_vars_mercado_ahora, mkt_vars_al_alza, mkt_vars_a_la_baja

## Fix 3: Banners Mercados/Futuros — demarcación visual

**Problema**: Background `var(--bg)` se pierde con el fondo general gris.
**Fix**: Cambio a `background:var(--card);border:1px solid var(--border2);border-radius:10px;margin:4px 10px;`

- L1360: _renderMarketBanner inner div
- L4792: _renderFuturesBanner inner div

Ambos banners ahora tienen card con borde y border-radius, visualmente separados del fondo.

## Fix 4: Futures suffix traducido

**L4784**: `item.n + ' Fut'` → `item.n + t('mkt_fut_suffix')`

---

## Verificación
- `node -c aurex-features.js` → OK
- `node -c aurex-i18n.js` → OK
- Total keys nuevas en este commit: 8 (5 gauge + 3 peso)
