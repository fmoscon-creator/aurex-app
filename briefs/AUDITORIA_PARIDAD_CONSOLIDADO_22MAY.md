# ✅ CONSOLIDADO FINAL — Auditoría Paridad PWA vs App Nativa (Code + Escritorio)

> **22-may-2026.** Cruce de la auditoría de Code (código + 18 capturas + simulador) con la de Escritorio (lectura 100% del código PWA dividido). **Consenso alcanzado, ambos con código real a la vista.**
> Raw URL: `https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/AUDITORIA_PARIDAD_CONSOLIDADO_22MAY.md`

## ESTADO DEL CRUCE
- **Coincidencia plena** en los gaps de gating. Escritorio leyó los 9 archivos PWA completos y confirmó cada punto en el código.
- **Code aportó:** las features faltantes (Cómo usar AUREX, Mis Alertas, Telegram-alertas, etc.) + verificación visual en simulador.
- **Escritorio aportó NUEVO:** límite de señales/día (IA), detalle de Pulse para FREE, riesgo de imágenes de onboarding, y el detalle de la doble definición de `openAddActivo`.
- **Diferencias reconciliadas (verificadas en código):** donde Escritorio dijo "Perfil/paridad idéntica", Code verificó que faltan "Cómo usar AUREX" (0 en PWA), "Mis Alertas" historial (0 lógica) y el flujo Telegram-alertas (solo existe compartir). **Code tenía razón en las tres.**

---

## A. GATING POR PLAN — 🔴 lo crítico/comercial (consenso Code+Escritorio)
> La infra existe (`PLAN_LIMITS_CLIENT`, `checkPlanLimit`, `showPaywall`, `loadUserPlan`, `applyPlanGating`) pero **se llama 0 veces**. `applyPlanGating` (badge de plan en Perfil) SÍ funciona; el resto NO está cableado.

1. **Portfolio (portfolioMax: FREE=5):** `openAddActivo` (doble definición, ambas) y `addPortfolioItem` no llaman `checkPlanLimit` → POST directo a Supabase. FREE puede cargar activos ilimitados. **Arreglo: ~2 líneas por función.**
2. **Watchlist (watchlistMax: FREE=10):** `wlCreateList` inserta sin chequear. FREE crea listas ilimitadas. **Arreglo: ~3 líneas.**
3. **Alertas (alertTypes):** toggles de alertas PRO/ELITE (alta convicción IA, cambio señal, GDELT, etc.) visibles y activos para FREE, sin lock ni bloqueo en `calculateAlerts`. **Arreglo: lock visual + chequeo de `alertTypes`.**
4. **IA — límite 3 señales/día (FREE):** el modal de planes promete "3 señales IA/día" pero `_renderIALista` muestra todas sin límite ni contador. **Arreglo: contador en localStorage + corte en el render.** (Hallazgo de Escritorio.)
5. **AUREX Pulse — detalle premium:** FREE debería ver el indicador "sin detalles", pero la PWA muestra el gauge + "Ver variables" completo. **Arreglo: condicionar por plan.** (Hallazgo de Escritorio.)

## B. FEATURES FALTANTES (Code, verificadas en código)
6. **"Cómo usar AUREX" (Perfil):** NO existe en la PWA (0 ocurrencias). Falta toda la guía de las 6 tabs + Planes. Las claves i18n `cu_*` ya están traducidas. **Gap de contenido más grande.**
7. **"Mis Alertas" (historial):** no hay pantalla funcional (0 lógica de `alertas_historial` en features.js): falta leer historial, marcar leídas/borrar, badge de no-leídas.
8. **Telegram para recibir alertas + Push real:** la PWA solo tiene **compartir** por Telegram (`t.me/share/url`); falta el flujo de **conectar** la cuenta (deep-link `/start`, `telegram_chat_id`, polling) y el registro de Push web.
9. **Umbrales de alerta editables:** hardcodeados (prob 75 / variación 5%); la nativa permite editarlos.
10. **Menores:** menú "Ordenar" en Watchlist, filtro "Solo favoritos" en Mercados, botones 🔔/⚖️ en header IA, sub-dirección ALCISTA/BAJISTA en señales ALTA CONV, bug ternario volatilidad.

## C. RIESGOS / OTROS
11. **Imágenes de onboarding (obs2):** usan rutas locales `img/onboarding/*.jpg` que pueden no existir en producción → verificar/arreglar. (Hallazgo de Escritorio.)

## D. PARIDAD CONFIRMADA (sin gap — ambos coinciden)
Motor IA (mismo backend `/api/ia-signals`, 10 variables) · Termómetro de Riesgo · Mercados (7 tabs, datos, fuentes) · Detalle de activo (precio/PnL/52w/simulador) · Auth Supabase · Perfil acordeón + plan badge (`applyPlanGating` funciona) · i18n 8 idiomas · Retorno PayPal y actualización de plan.

---

## PRIORIDADES PARA AJUSTAR (orden acordado)
1. **🔴 Gating Portfolio + Watchlist (#1, #2)** — cablear `checkPlanLimit`/`showPaywall`. Lo más rápido y comercial.
2. **Gating Alertas por tipo (#3)** — lock + bloqueo en `calculateAlerts`.
3. **Límite 3 señales/día IA (#4)** + **Pulse detalle FREE (#5)** — alinear con lo que promete la web.
4. **"Cómo usar AUREX" (#6)** — reusar i18n `cu_*`.
5. **Alertas: Telegram conectar + Mis Alertas historial + umbrales (#7, #8, #9).**
6. **Menores (#10) + imágenes onboarding (#11).**

**CONSENSO: ✅ Code y Escritorio coinciden. Listo para arrancar por el #1 (gating Portfolio/Watchlist).**
