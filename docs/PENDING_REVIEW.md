# PENDING REVIEW — Alertas i18n COMPLETO (2 faltantes corregidos)

**Archivos** (LOCAL): aurex-i18n.js, index.html

---

## Faltante 1 CORREGIDO: 15 toggles con data-i18n

Cada toggle tiene data-i18n en label + description:

**IA (4):** al_ia_cambio/desc, al_ia_alta/desc, al_ia_umbral/desc, al_ia_portfolio/desc
**Pulse (3):** al_pulse_zona/desc, al_pulse_cat/desc, al_pulse_thermo/desc
**Precio (3):** al_precio_obj/desc, al_precio_var/desc, al_precio_maxmin/desc
**Eventos (5):** FED FOMC (no traduce label, sí desc), CPI/PBI (no traduce label, sí desc), al_ev_apertura/desc, al_ev_earnings/desc, al_ev_gdelt/desc

4 section headers también: al_sec_ia/desc, al_sec_pulse/desc, al_sec_precio/desc, al_sec_eventos/desc

## Faltante 2 CORREGIDO: showAlertVars modal variables traducidas

**10 variables IA:** usan t('mkt_var1_label') a t('mkt_var10_label') + t('mkt_var1_desc') a t('mkt_var10_desc')
Pesos: t('al_peso_alto') / t('al_peso_medio')

**14 variables Pulse:** nombres traducibles usan t('mkt_pulse_var_vix'), t('mkt_pulse_var_oro'), t('mkt_pulse_var_plata'), t('mkt_pulse_var_petroleo'), t('mkt_pulse_var_cobre'), t('mkt_pulse_var_geopolitica')
Los demás (BTC/ETH momentum, SP500, ES=F, NQ=F, YM=F, RTY=F, Macro FED) son nombres técnicos/propios — no se traducen (igual que nativa).

Title y subtitle del modal: t('al_motor_ia'), t('al_vars_ia_subtitle'), t('al_vars_pulse_subtitle')
Legend: t('al_peso_alto'), t('al_peso_medio')

---

## Verificación
- `node -c aurex-i18n.js` → OK
- 15 toggles: todos con data-i18n
- showAlertVars: 10 IA vars + 6 Pulse vars traducidas + legends + titles
