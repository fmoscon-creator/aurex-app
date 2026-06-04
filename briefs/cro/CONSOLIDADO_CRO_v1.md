# 🔬 CONSOLIDADO CRO Cobrex — v1 (04-jun-2026)

> **Primera versión consolidada.** Cruza el análisis de **Code** (`CODE_analisis.md`, datos+código) con el de **Escritorio** (`ESCRITORIO_analisis.md`, mercado+UX), hechos de forma independiente.
> **🛑 REGLA MADRE:** nada se cambia en producto. Es diagnóstico. Cualquier cambio se decide aparte, con OK explícito de Fernando.
> **Próxima sesión:** mañana (Fernando lo dejó para no apurar un tema clave).

---

## 0. ESTADO DE UN VISTAZO
- ✅ **Bug "usuarios fantasma" — RESUELTO** (04-jun): 44 cuentas auth sin fila backend → trigger permanente + heal de los 32 confirmados. usuarios 48→80, 0 confirmados restantes. Verificado por las dos partes. **Cerrado.**
- ✅ **Embudo medido** (Code) + **auditoría de código** (Code) + **análisis de mercado/UX** (Escritorio).
- ⏳ **Decidido (Fernando 04-jun): las analytics (Firebase Analytics, eventos del funnel) entran SÍ O SÍ en el Build 39 iOS y en el próximo build de Android.**
- ⏳ Pendiente: precios por mercado, consolidar decisiones de producto (sin tocar nada aún).

---

## 1. EL EMBUDO (lo que sabemos con datos)
| Etapa | Dato | Fuente |
|---|---|---|
| Instalaciones (ventana reciente: iOS desde 27-may + Android acum.) | ~77 | ASC + Google Play |
| Registros (auth.users, todo el histórico Mar–Jun) | **92** | Supabase auth |
| Con perfil backend (post-heal) | 80 | Supabase `usuarios` |
| **Crearon ≥1 alerta** (la función central) | **~1 real** | Supabase `alertas` |
| Agregaron al portfolio | ~6–7 reales | Supabase `portfolio` |
| **Pagaron un plan** | **0 reales** | RevenueCat |

> ⚠️ "Installs (77)" es ventana reciente (iOS solo desde 27-may), NO histórico → por eso 92 signups > 77. El número clave NO es el conteo exacto sino la **forma**: muchos se registran, **casi nadie activa la función central**, nadie paga.

---

## 2. ✅ COINCIDENCIAS (los dos llegamos por separado → señal fuerte)
1. **Paywall ANTES del valor.** Code: el paywall se abre **automático apenas se registra** un FREE (`App.js:244`), antes de usar nada. Escritorio: "al llegar al paywall, aún no usó ninguna funcionalidad real". → **Pedir pagar antes de mostrar valor.**
2. **Fricción de registro.** Code: registro **obligatorio**, sin modo invitado (verificado en código). Escritorio: **no hay SSO** (Apple/Google) → signup solo mail+contraseña = drop 40–60% (vs 15–25% con SSO). Los dos verificamos que **el SSO no existe** en el código.
3. **Activación rota (el cuello más grande).** Code: **1 de los reales creó una alerta**; crearla exige 2–3 pasos sin guía (agregar activo → campana 🔔 → completar) y el onboarding no empuja a hacerlo. Escritorio: "falta que el usuario experimente al menos 1 acción de valor antes del paywall". → **La fuga empieza mucho antes del precio.**
4. **Geo-pricing viable y necesario.** Code: técnicamente posible en ambas tiendas. Escritorio: AR compite contra apps **gratis** (Cocos, IOL), no contra TradingView; India/Nigeria necesitan precio más bajo. → **Conviene precio por mercado.**
5. **Sin analytics = ciegos en el medio del funnel.** Los dos verificamos: no hay Firebase Analytics / Mixpanel / nada. El drop *dentro* del onboarding/signup es hoy invisible.

---

## 3. ⚖️ DIFERENCIAS Y CÓMO SE RECONCILIARON
1. **Severidad del bug fantasmas.** Escritorio lo pintó como "app rota / 48% experiencia rota". Code verificó en código que **la app NO se rompe** (cae a plan FREE + self-heal agresivo) → es un **backlog histórico acotado**, no media base con la app rota. **Reconciliado** y además **resuelto**.
2. **Trigger A vs B.** Escritorio prefería B (solo confirmados); Code, A (siempre). **Consensuado en una síntesis**: dispara on insert OR update of email_confirmed_at → solo confirmados (limpio, criterio de Escritorio) **+** cubre SSO/confirm-off (robustez que faltaba en B). **Cerrado.**
3. **Denominador del embudo.** Code aclaró que "installs 77" es ventana reciente, no histórico → no es comparable 1:1 con los 92 signups. Acordado usar la **forma** del embudo, no el ratio exacto.
4. **Referencia competitiva en AR.** Aporte único de Escritorio: el usuario AR compara con **gratis** (Cocos/IOL), no con TradingView. Code no tenía este dato.

---

## 4. 🤝 DECISIONES PENDIENTES DE CONSENSUAR (para mañana, NADA se ejecuta)
1. **Precios por mercado.** ¿Se mantienen los tentativos (PRO 5.99/57.50 · ELITE 9.99/95.90) o se ajustan? ¿Geo-pricing (AR más bajo, India/Nigeria más bajo)? → Falta: Code extrae **precios reales actuales** en las tiendas + Escritorio completa benchmarks de los mercados que faltan.
2. **SSO Apple/Google.** Los dos coinciden que es la mejora #1 de signup. ¿Se hace? ¿en qué build? (decisión de producto + build).
3. **Mover el paywall** para que no aparezca antes de que el usuario viva valor. Diagnóstico coincide; el cambio se decide aparte.
4. **Onboarding que guíe a crear la primera alerta.** Coincide el diagnóstico; decisión pendiente.

---

## 5. 📋 PENDIENTES DE ANALIZAR / HACER
- **Code:** extraer precios reales por país en las tiendas + capacidades de geo-pricing · analizar el grupo de ~25 confirmados que entraron y no dejaron actividad (¿activación, o algo más?).
- **Escritorio:** benchmarks de precios en los mercados de idioma que falten · seguir UX.
- **Ambos (bloqueado por analytics):** el drop DENTRO del onboarding/signup recién se ve con analytics.
- **✅ DECIDIDO (Fernando):** analytics entran en **Build 39 iOS** + **próximo build Android** (sí o sí). Es dependencia nativa (Firebase ya está integrado para push → es agregar el módulo `/analytics` + ~8 eventos del funnel: onboarding_slide_viewed, onboarding_completed, signup_started, signup_completed, login_completed, primer_activo_agregado, primera_alerta_creada, paywall_visto).

---

## 6. 📍 UBICACIONES
- Workspace: `briefs/cro/` (repo `aurex-app`).
- `CODE_analisis.md` (Code) · `ESCRITORIO_analisis.md` (Escritorio) · `CONSOLIDADO_CRO_v1.md` (este) · `fix_fantasmas.sql` (ejecutado, bug cerrado).
- Brief maestro: §13.
