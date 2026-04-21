# INVENTARIO COMPLETO — Tab Alertas i18n (ACTUALIZADO)

Nativa leída: AlertasScreen.js (720 líneas).
PWA leída: index.html L640-1050 (funciones JS) + L2082-2237 (HTML).
Cada punto pedido por Fernando verificado uno por uno.

---

## CHECKLIST DE FERNANDO — verificación punto por punto

| Pedido | Incluido | Dónde |
|--------|----------|-------|
| Toggle WhatsApp formato/diseño | ✅ | A1 + B1 |
| POP del toggle WhatsApp | ✅ | B1 (popup "Proximamente...") |
| POP de ALERTAS ON | ✅ | B2 (showAlertInfoModal 'alertas') |
| POP de ACTIVOS | ✅ | B2 (showAlertInfoModal 'activos') |
| POP de WHATSAPP | ✅ | misma función toggle |
| POP de MOTOR IA | ✅ | B3 (showAlertVars 'ia') |
| POP de AUREX PULSE | ✅ | B3 (showAlertVars 'pulse') |
| 15 TOGGLES y traducciones | ✅ | A5-A8 (4+3+3+5=15) |
| ZONA AUREX PULSE y filtros | ✅ | A9 + A11 |
| ZONA ALERTAS ACTIVAS con CARD | ✅ | C (visual) |
| FILTROS de alertas activas | ✅ | B4 |
| SUB-FILTROS | ✅ | B5 |

---

## A. HTML ESTÁTICO — index.html L2082-2237

### A1. Banner WhatsApp (L2089)
| # | String | Key |
|---|--------|-----|
| 1 | Alertas por WhatsApp | al_wa_title |
| 2 | WhatsApp conectado (toggle ON state) | al_wa_conectado |

### A2. Resumen (L2097-2101)
| # | String | Key |
|---|--------|-----|
| 3 | ALERTAS ON | al_alertas_on |
| 4 | ACTIVOS | al_activos_upper |

### A3. Filtro ALERTAS SOBRE (L2107-2111)
| # | String | Key |
|---|--------|-----|
| 5 | ALERTAS SOBRE | al_alertas_sobre |
| 6 | Mi Portfolio | al_mi_portfolio |
| 7 | Mi Watchlist | al_mi_watchlist |
| 8 | Todos (350) | al_todos |

### A4. Motor IA + Pulse (L2118-2121)
| # | String | Key |
|---|--------|-----|
| 9 | Motor IA | al_motor_ia |
| 10 | 10 variables | al_10_variables |
| 11 | 14 variables | al_14_variables |

### A5. Sección Alertas IA — 4 toggles (L2127-2138)
| # | String | Key |
|---|--------|-----|
| 12 | Alertas IA | al_sec_ia |
| 13 | Motor IA — 10 variables | al_sec_ia_desc |
| 14 | Cambio de senal | al_ia_cambio |
| 15 | Cuando un activo cambia de ALCISTA a BAJISTA o viceversa | al_ia_cambio_desc |
| 16 | Alta Conviccion | al_ia_alta |
| 17 | Cuando la IA detecta senal de maxima conviccion (85-88%) | al_ia_alta_desc |
| 18 | Umbral probabilidad | al_ia_umbral |
| 19 | Alerta cuando la probabilidad supera el umbral configurado | al_ia_umbral_desc |
| 20 | Senal en Portfolio | al_ia_portfolio |
| 21 | Nueva senal IA en activos de tu cartera personal | al_ia_portfolio_desc |

### A6. Sección Alertas PULSE — 3 toggles (L2142-2152)
| # | String | Key |
|---|--------|-----|
| 22 | Alertas PULSE | al_sec_pulse |
| 23 | AUREX Pulse — 14 variables macro | al_sec_pulse_desc |
| 24 | Cambio de zona | al_pulse_zona |
| 25 | Cuando Pulse cambia de zona (Miedo Extremo / Neutral / Codicia) | al_pulse_zona_desc |
| 26 | Por categoria | al_pulse_cat |
| 27 | Alerta por categoria: Cripto, Acciones, Futuros, Commodities | al_pulse_cat_desc |
| 28 | Termometro de Riesgo | al_pulse_thermo |
| 29 | Cuando tu portfolio entra en zona de riesgo segun IA | al_pulse_thermo_desc |

### A7. Sección Alertas Precio — 3 toggles (L2156-2166)
| # | String | Key |
|---|--------|-----|
| 30 | Alertas de Precio | al_sec_precio |
| 31 | Monitoreo de precios en tiempo real | al_sec_precio_desc |
| 32 | Precio objetivo | al_precio_obj |
| 33 | Cuando un activo alcanza el precio target que definiste | al_precio_obj_desc |
| 34 | Variacion brusca | al_precio_var |
| 35 | Sube o baja mas del % configurado en 24hs | al_precio_var_desc |
| 36 | Nuevo maximo/minimo | al_precio_maxmin |
| 37 | Nuevo maximo o minimo de 52 semanas | al_precio_maxmin_desc |

### A8. Sección Alertas Eventos — 5 toggles (L2170-2182)
| # | String | Key |
|---|--------|-----|
| 38 | Alertas de Eventos | al_sec_eventos |
| 39 | Calendario economico y corporativo | al_sec_eventos_desc |
| 40 | Decisiones de tasas de interes de la Reserva Federal | al_ev_fomc_desc |
| 41 | Publicacion de datos de inflacion y crecimiento | al_ev_cpi_desc |
| 42 | Apertura mercados | al_ev_apertura |
| 43 | Notificacion cuando abren los mercados globales | al_ev_apertura_desc |
| 44 | Earnings portfolio | al_ev_earnings |
| 45 | Reportes de resultados trimestrales de activos en tu cartera | al_ev_earnings_desc |
| 46 | Geopolitica GDELT | al_ev_gdelt |
| 47 | Eventos geopoliticos de alto impacto detectados por GDELT | al_ev_gdelt_desc |

### A9. Zonas AUREX Pulse (L2187-2211)
| # | String | Key |
|---|--------|-----|
| 48 | Zonas AUREX Pulse | al_zonas_pulse |
| 49-53 | Miedo Extremo / Miedo / Neutral / Codicia / Codicia Extrema | reutiliza mkt_gauge_* |

### A10. Alertas activas + filtros principales (L2217-2231)
| # | String | Key |
|---|--------|-----|
| 54 | ALERTAS ACTIVAS AHORA | al_activas_ahora |
| 55 | Todas | al_filter_todas |
| 56 | 🤖 IA | al_filter_ia |
| 57 | 💰 Precio | al_filter_precio |
| 58 | 💓 Pulse | al_filter_pulse |
| 59 | Sin alertas activas | al_sin_alertas |
| 60 | Las alertas aparecen aca cuando se activan | al_sin_alertas_desc |

### A11. Filtros Pulse zona (L2189-2193)
Reutiliza: mkt_pulse_cat_global/cripto/acciones/comod/futuros

---

## B. JS DINÁMICO — index.html funciones (L640-1009)

### B1. toggleWABanner (L640-656)
| # | String | Key |
|---|--------|-----|
| 61 | WhatsApp conectado | al_wa_conectado |
| 62 | Alertas por WhatsApp | al_wa_title |
| 63 | WhatsApp Alertas (popup title) | al_wa_popup_title |
| 64 | Proximamente podras recibir alertas automaticas por WhatsApp. Te avisaremos cuando este disponible. | al_wa_popup_desc |
| 65 | OK (popup button) | (no traducir — universal) |

### B2. showAlertInfoModal (L940-969)
| # | String | Key |
|---|--------|-----|
| 66 | X Alertas activas | al_info_alertas_activas |
| 67 | Monitoreando | al_info_monitoreando |
| 68 | Mi Portfolio / Mi Watchlist / Todos (350) | reutiliza al_mi_portfolio/al_mi_watchlist/al_todos |
| 69 | X Activos monitoreados | al_info_activos_monitoreados |
| 70 | Todos los activos | al_info_todos_activos |
| 71 | : X tipos (sufijo en items) | al_info_tipos_suffix |

### B3. showAlertVars (L674-719)
| # | String | Key |
|---|--------|-----|
| 72 | 🤖 Motor IA (modal title) | al_motor_ia |
| 73 | 10 variables de analisis por activo | al_vars_ia_subtitle |
| 74 | 14 variables macro del mercado global | al_vars_pulse_subtitle |
| 75 | Peso Alto (legend) | al_peso_alto |
| 76 | Peso Medio (legend) | al_peso_medio |
| 77-86 | 10 variables IA: names + descriptions | reutiliza mkt_var1-10_label + nuevas al_var1-10_desc_short |
| 87-100 | 14 variables Pulse: names | reutiliza mkt_pulse_var_* + los que ya existen |

### B4. renderTriggeredAlerts — filtros principales (L866-871)
| # | String | Key |
|---|--------|-----|
| 101 | Todas | al_filter_todas |
| 102 | 🤖 IA | al_filter_ia |
| 103 | 💰 Precio | al_filter_precio |
| 104 | 💓 Pulse | al_filter_pulse |

### B5. renderTriggeredAlerts — SUB-FILTROS (L885-891)
| # | String | Key |
|---|--------|-----|
| 105 | Todas IA | al_sub_todas_ia |
| 106 | ⚡ Alta Conv | al_sub_alta_conv |
| 107 | 📉 Cambio | al_sub_cambio |
| 108 | 🎯 Umbral | al_sub_umbral |
| 109 | 💼 Portfolio | al_sub_portfolio |
| 110 | Todos Precio | al_sub_todos_precio |
| 111 | 📈 Variacion | al_sub_variacion |
| 112 | 🔺 RSI | al_sub_rsi |
| 113 | Todos Pulse | al_sub_todos_pulse |
| 114 | 🔴 Zona | al_sub_zona |
| 115 | 📊 Categoria | al_sub_categoria |

### B6. renderTriggeredAlerts — empty state (L910)
| # | String | Key |
|---|--------|-----|
| 116 | Sin alertas en este filtro | al_sin_alertas_filtro |
| 117 | Proba cambiando filtros o umbrales | al_proba_filtros |

### B7. _updateScopeCounts (L1006-1008)
| # | String | Key |
|---|--------|-----|
| 118 | alertas (sufijo en scope counts) | al_alertas_suffix |

---

## C. VISUAL — Card bordes para Alertas Activas

Envolver la sección L2215-2233 en:
```
background:var(--card);border:1px solid var(--border2);border-radius:12px;margin:10px 11px;padding:13px;
```

---

## D. RESUMEN FINAL

- **Keys nuevas**: ~70 únicas
- **Keys reutilizadas**: mkt_gauge_* (5), mkt_pulse_cat_* (5), al_mi_portfolio/watchlist/todos, mkt_var labels
- **Archivos**: aurex-i18n.js, index.html
- **Visual**: card wrapper para Alertas Activas
- **15 toggles**: todos cubiertos con label + description
- **Sub-filtros**: 11 labels cubiertos
- **3 popups**: WhatsApp, Alertas ON, Activos
- **2 modals variables**: Motor IA (10 vars), Pulse (14 vars)

## E. PLAN

1. Agregar ~70 keys a aurex-i18n.js sección `// === ALERTAS ===`
2. Aplicar data-i18n a HTML estático (~60 elementos)
3. Modificar funciones JS: toggleWABanner, showAlertInfoModal, showAlertVars, renderTriggeredAlerts, _updateScopeCounts
4. Card wrapper visual
5. Auto-auditoría COMPLETA
6. Push SOLO PENDING_REVIEW → Escritorio → Fernando OK → push código
