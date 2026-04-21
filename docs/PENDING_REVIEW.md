# INVENTARIO COMPLETO — Tab Alertas i18n

Nativa leída: AlertasScreen.js (720 líneas completas).
PWA leída: index.html L2082-2237.

---

## A. HTML ESTÁTICO — index.html (~55 strings)

### A1. Banner WhatsApp (L2089)
| # | String | Key |
|---|--------|-----|
| 1 | Alertas por WhatsApp | al_wa_title |

### A2. Resumen (L2097-2101)
| # | String | Key |
|---|--------|-----|
| 2 | ALERTAS ON | al_alertas_on |
| 3 | ACTIVOS | al_activos |
| 4 | WHATSAPP | (no traducir — marca) |

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
| 11 | AUREX Pulse | (no traducir — marca) |
| 12 | 14 variables | al_14_variables |

### A5. Sección Alertas IA (L2127-2138)
| # | String | Key |
|---|--------|-----|
| 13 | Alertas IA | al_sec_ia |
| 14 | Motor IA — 10 variables | al_sec_ia_desc |
| 15 | Cambio de senal | al_ia_cambio |
| 16 | Cuando un activo cambia de ALCISTA a BAJISTA o viceversa | al_ia_cambio_desc |
| 17 | Alta Conviccion | al_ia_alta |
| 18 | Cuando la IA detecta senal de maxima conviccion (85-88%) | al_ia_alta_desc |
| 19 | Umbral probabilidad | al_ia_umbral |
| 20 | Alerta cuando la probabilidad supera el umbral configurado | al_ia_umbral_desc |
| 21 | Senal en Portfolio | al_ia_portfolio |
| 22 | Nueva senal IA en activos de tu cartera personal | al_ia_portfolio_desc |

### A6. Sección Alertas PULSE (L2142-2152)
| # | String | Key |
|---|--------|-----|
| 23 | Alertas PULSE | al_sec_pulse |
| 24 | AUREX Pulse — 14 variables macro | al_sec_pulse_desc |
| 25 | Cambio de zona | al_pulse_zona |
| 26 | Cuando Pulse cambia de zona (Miedo Extremo / Neutral / Codicia) | al_pulse_zona_desc |
| 27 | Por categoria | al_pulse_cat |
| 28 | Alerta por categoria: Cripto, Acciones, Futuros, Commodities | al_pulse_cat_desc |
| 29 | Termometro de Riesgo | al_pulse_thermo |
| 30 | Cuando tu portfolio entra en zona de riesgo segun IA | al_pulse_thermo_desc |

### A7. Sección Alertas Precio (L2156-2166)
| # | String | Key |
|---|--------|-----|
| 31 | Alertas de Precio | al_sec_precio |
| 32 | Monitoreo de precios en tiempo real | al_sec_precio_desc |
| 33 | Precio objetivo | al_precio_obj |
| 34 | Cuando un activo alcanza el precio target que definiste | al_precio_obj_desc |
| 35 | Variacion brusca | al_precio_var |
| 36 | Sube o baja mas del % configurado en 24hs | al_precio_var_desc |
| 37 | Nuevo maximo/minimo | al_precio_maxmin |
| 38 | Nuevo maximo o minimo de 52 semanas | al_precio_maxmin_desc |

### A8. Sección Alertas Eventos (L2170-2182)
| # | String | Key |
|---|--------|-----|
| 39 | Alertas de Eventos | al_sec_eventos |
| 40 | Calendario economico y corporativo | al_sec_eventos_desc |
| 41 | FED FOMC | (no traducir — nombre propio) |
| 42 | Decisiones de tasas de interes de la Reserva Federal | al_ev_fomc_desc |
| 43 | CPI / PBI | (no traducir — siglas) |
| 44 | Publicacion de datos de inflacion y crecimiento | al_ev_cpi_desc |
| 45 | Apertura mercados | al_ev_apertura |
| 46 | Notificacion cuando abren los mercados globales | al_ev_apertura_desc |
| 47 | Earnings portfolio | al_ev_earnings |
| 48 | Reportes de resultados trimestrales de activos en tu cartera | al_ev_earnings_desc |
| 49 | Geopolitica GDELT | al_ev_gdelt |
| 50 | Eventos geopoliticos de alto impacto detectados por GDELT | al_ev_gdelt_desc |

### A9. Zonas AUREX Pulse (L2187-2211)
| # | String | Key |
|---|--------|-----|
| 51 | Zonas AUREX Pulse | al_zonas_pulse |
| 52 | Miedo Extremo | (reutiliza mkt_gauge_miedo_ext) |
| 53 | Miedo | (reutiliza mkt_gauge_miedo) |
| 54 | Neutral | (reutiliza mkt_gauge_neutral) |
| 55 | Codicia | (reutiliza mkt_gauge_codicia) |
| 56 | Codicia Extrema | (reutiliza mkt_gauge_codicia_ext) |

### A10. Alertas activas + filtros (L2217-2231)
| # | String | Key |
|---|--------|-----|
| 57 | ALERTAS ACTIVAS AHORA | al_activas_ahora |
| 58 | Todas | al_filter_todas |
| 59 | 🤖 IA | al_filter_ia |
| 60 | 💰 Precio | al_filter_precio |
| 61 | 💓 Pulse | al_filter_pulse |
| 62 | Sin alertas activas | al_sin_alertas |
| 63 | Las alertas aparecen aca cuando se activan | al_sin_alertas_desc |

### A11. Filtros Pulse zona (L2189-2193)
Reutilizan: mkt_pulse_cat_global, mkt_pulse_cat_cripto, mkt_pulse_cat_acciones, mkt_pulse_cat_comod, mkt_pulse_cat_futuros

---

## B. VISUAL — Card con bordes para Alertas Activas

**Pedido de Fernando**: darle formato card con bordes a la zona de ALERTAS ACTIVAS para que no se confunda con el fondo.

Fix: Envolver L2215-2233 en un card con `background:var(--card);border:1px solid var(--border2);border-radius:12px;margin:10px 11px;`

---

## C. RESUMEN

- **Keys nuevas**: ~50 únicas
- **Keys reutilizadas**: mkt_gauge_* (5 zonas), mkt_pulse_cat_* (5 filtros)
- **Archivos**: aurex-i18n.js, index.html
- **Visual**: card wrapper para Alertas Activas

## D. PLAN

1. Agregar ~50 keys a aurex-i18n.js sección `// === ALERTAS ===`
2. Aplicar data-i18n a ~63 elementos HTML estáticos
3. Card wrapper para sección Alertas Activas
4. Auto-auditoría
5. Push SOLO PENDING_REVIEW → Escritorio → Fernando OK → push código
