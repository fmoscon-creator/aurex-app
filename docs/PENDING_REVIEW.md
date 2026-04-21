# PENDING REVIEW — Alertas i18n implementado (~70 keys × 8 idiomas)

**Archivos** (LOCAL, no pusheados): aurex-i18n.js, index.html

---

## aurex-i18n.js — sección `// === ALERTAS ===`
~70 keys nuevas cubriendo:
- Banner WhatsApp (title, conectado, popup title+desc)
- Resumen (ALERTAS ON, ACTIVOS)
- Filtro ALERTAS SOBRE (Mi Portfolio, Mi Watchlist, Todos)
- Motor IA + Pulse buttons (10/14 variables)
- 4 secciones × toggles (IA:4, Pulse:3, Precio:3, Eventos:5 = 15 total)
- Cada toggle: label + description
- Zonas AUREX Pulse (title)
- Alertas activas (title, empty state ×2)
- Filtros principales (Todas, IA, Precio, Pulse)
- Sub-filtros (11 labels)
- Info modal (alertas activas, monitoreando, activos monitoreados)
- Vars modal (subtitles, peso alto/medio)
- Scope counts suffix

## index.html — data-i18n + t() aplicados
- L2089: al_wa_title
- L2097: al_alertas_on
- L2099: al_activos_upper
- L2107: al_alertas_sobre
- L2109-2111: al_mi_portfolio, al_mi_watchlist, al_todos
- L2118: al_motor_ia, al_10_variables
- L2121: al_14_variables
- L2187: al_zonas_pulse
- L2217: al_activas_ahora
- L2229-2231: al_sin_alertas, al_sin_alertas_desc
- toggleWABanner: t('al_wa_conectado'), t('al_wa_title'), t('al_wa_popup_title'), t('al_wa_popup_desc')
- renderTriggeredAlerts: mainFilters con t(), subDefs con t(), empty state con t()
- _updateScopeCounts: t('al_alertas_suffix')
- showAlertInfoModal: t('al_info_alertas_activas'), t('al_info_monitoreando'), t('al_info_activos_monitoreados'), t('al_info_todos_activos')

## Visual — Card wrapper Alertas Activas
`background:var(--card);border:1px solid var(--border2);border-radius:12px;margin:10px 11px;`

---

## Verificación
- `node -c aurex-i18n.js` → OK

## Pendiente (no incluido en este commit)
- Los 15 toggles HTML tienen labels hardcodeados (requiere restructurar el HTML de cada .alert-item). Se hará en commit separado si Fernando lo pide, o se puede usar applyTranslations() que ya corre.
- showAlertVars modal: variable names hardcodeados (pueden reutilizar mkt_var labels existentes)
