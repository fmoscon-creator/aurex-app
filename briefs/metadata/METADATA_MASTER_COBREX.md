# 🗂️ METADATA MASTER — Cobrex (ficha App Store + Play Store)

> **Source of truth de TODOS los campos de ficha**, para CONSISTENCIA entre plataformas:
> iOS Build 43 (1.2) → **Android Build 38** debe mostrar LO MISMO en cada campo/idioma.
> Datos de planes/alertas **verificados contra el código real** (backend `PLAN_LIMITS` + `usePlan.js` + `getAlertSections`) — NO inventados.
> Actualizado: 08-jun-2026.

## Estado de cada campo
| Campo | ES master | 8 idiomas |
|---|---|---|
| Nombre | ✅ Cobrex (no cambia) | — |
| Subtítulo | ✅ aprobado Fernando | ⏳ pendiente traducir |
| Descripción | 🟡 v3 (planes precisos + términos) — **pendiente OK final Fernando** | ⏳ pendiente |
| Keywords | 🟡 ver `briefs/aso/ASO_COBREX_borradores.md` (estrategia 100 chars) | ⏳ cerrar |
| Novedades | ✅ | ✅ `briefs/aso/NOVEDADES_1.2_COBREX_8idiomas.md` |

---

## 0. TÉRMINOS DE ALERTAS (oficiales — no confundir)
- **ALERTAS MANUALES:** ponés un **precio $** o **%** sobre un activo (campana del activo en Portfolio/Watchlist → central/MisAlertas). **Ilimitadas en los 3 planes.**
- **ALERTAS AUTOMÁTICAS:** **15 toggles** en la pestaña Alertas (4 sectores: IA, Pulse, Precio, Eventos) que el motor dispara solo. **Gateadas por plan (FREE 5 / PRO 14 / ELITE 15).**

## 1. NOMBRE
**Cobrex** (no cambia, ambas plataformas)

## 2. SUBTÍTULO (iOS 30 chars) — ES master ✅
**Acciones, Cripto y Alertas IA**  *(29/30)*

## 3. DESCRIPCIÓN (4000) — ES master v3 (pendiente OK final Fernando)
```
Seguí tus inversiones y recibí alertas con inteligencia artificial.

Cobrex monitorea 350+ activos globales en tiempo real: acciones, criptomonedas, ETFs, commodities, futuros y divisas. El motor de IA analiza cada activo y genera señales accionables.

QUÉ INCLUYE
• Cobrex Pulse: índice de sentimiento de mercado (0-100) con 14 variables ponderadas. Filtros Global, Cripto, Acciones, Commodities y Futuros.
• Portfolio y Watchlist con cotizaciones en vivo.
• Análisis IA completo: señales probabilísticas con RSI, MACD, volumen y contexto geopolítico.
• 8 idiomas. Modo claro y oscuro.

ALERTAS
• Manuales: poné un precio o un % sobre cualquier activo y te avisamos cuando se cumple. Ilimitadas en todos los planes.
• Automáticas: activá con un toque las que te interesan (señales IA, Cobrex Pulse, precio, eventos macro). El motor las dispara solo. Por push o Telegram.

PLANES

FREE
• 350+ activos globales, precios en tiempo real
• 5 activos en portfolio · 1 watchlist
• 3 señales IA por día
• Cobrex Pulse básico (score global)
• Termómetro de riesgo y conversor de monedas
• Alertas manuales (precio / %): ilimitadas
• Alertas automáticas: 5 (Umbral de probabilidad, Variación brusca, Nuevo máximo/mínimo, RSI extremo, Apertura de mercados)

PRO — todo lo de FREE, más:
• Activos y señales IA ilimitados
• Alertas automáticas: 14 — suma señales IA (Cambio de señal, Alta convicción, Señal en portfolio), Cobrex Pulse (Cambio de zona, Por categoría, Termómetro de riesgo) y eventos macro (FED/FOMC, CPI/PBI, Earnings)
• Alertas por Telegram en tiempo real
• Cobrex Pulse con variables y explicación
• Sin publicidad · soporte prioritario

ELITE — todo lo de PRO, más:
• Alertas automáticas: 15 — suma alertas geopolíticas GDELT (exclusivas)
• Cobrex Pulse completo: explicación profunda e historial
• Señales IA con nivel de confianza y razón detallada
• Análisis técnico avanzado (RSI, MACD)
• Acceso anticipado a funciones beta

IMPORTANTE: Cobrex es una herramienta informativa, no asesoramiento financiero.
Términos: https://cobrex.io/terms.html | Privacidad: https://cobrex.io/privacy.html
```

## 4. KEYWORDS (iOS 100 chars) → ver `briefs/aso/ASO_COBREX_borradores.md`
Estrategia: usar los 100 chars al máximo por idioma. `cobrex` ya está en el nombre → NO en keywords; sí `ai`, `pulse`, `ia` sueltos (Apple combina).

## 5. NOVEDADES (What's New 1.2) — ✅ 8 idiomas → `briefs/aso/NOVEDADES_1.2_COBREX_8idiomas.md`

---

## 📌 GATING REAL POR PLAN (verificado en código — usar SIEMPRE esto, no inventar)

### Límites y features
| | FREE | PRO | ELITE |
|---|---|---|---|
| Activos portfolio | 5 | ∞ | ∞ |
| Watchlist (listas) | 1 | ∞ | ∞ |
| Señales IA | 3/día | ∞ | ∞ |
| **Alertas MANUALES** (precio $ / %) | ✅ ilimitadas | ✅ ilimitadas | ✅ ilimitadas |
| **Alertas AUTOMÁTICAS** (de 15) | **5** | **14** | **15** |
| Push | ✅ | ✅ | ✅ |
| Telegram | ✕ | ✅ | ✅ |
| WhatsApp | — | 3/día (PAUSADO → "próximamente") | 10/día (PAUSADO → "próximamente") |
| Cobrex Pulse | básico | con explicación | completo + historial |
| API access | ✕ | ✕ | backend sí, UI no construida → no anunciar |

### Las 15 ALERTAS AUTOMÁTICAS (pestaña Alertas)
| Sector | Alerta | FREE | PRO | ELITE |
|---|---|:--:|:--:|:--:|
| 🤖 IA | Cambio de señal | ✕ | ✅ | ✅ |
| 🤖 IA | Alta Convicción | ✕ | ✅ | ✅ |
| 🤖 IA | Umbral probabilidad | ✅ | ✅ | ✅ |
| 🤖 IA | Señal en Portfolio | ✕ | ✅ | ✅ |
| 💓 Pulse | Cambio de zona | ✕ | ✅ | ✅ |
| 💓 Pulse | Por categoría | ✕ | ✅ | ✅ |
| 💓 Pulse | Termómetro de Riesgo | ✕ | ✅ | ✅ |
| 💰 Precio | Variación brusca | ✅ | ✅ | ✅ |
| 💰 Precio | Nuevo máximo/mínimo | ✅ | ✅ | ✅ |
| 💰 Precio | RSI Extremo | ✅ | ✅ | ✅ |
| 📅 Eventos | FED FOMC | ✕ | ✅ | ✅ |
| 📅 Eventos | CPI / PBI | ✕ | ✅ | ✅ |
| 📅 Eventos | Apertura mercados | ✅ | ✅ | ✅ |
| 📅 Eventos | Earnings portfolio | ✕ | ✅ | ✅ |
| 📅 Eventos | Geopolítica GDELT | ✕ | ✕ | ✅ |

**OJO copy app (corregir en Build 44):** Perfil dice "PRO: Alertas push" pero el push lo tienen los 3 planes. El diferenciador son los tipos de alerta automática, no el push. Ver `project_pendiente_build44_ios`.

_Code — 08-jun-2026._
