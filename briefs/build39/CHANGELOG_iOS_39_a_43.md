# 🍎 CHANGELOG iOS — Build 39 → 43 (versión 1.2)

> **Punto de partida:** v1.1 (38) publicado en App Store.
> **Versión final:** **1.2 (43)** — candidato a enviar a revisión Apple (08-jun-2026).
> **⚠️ MISMO conjunto de cambios a portar luego al Android Build 38** (ver sección final).
> Todos los builds verificados en TestFlight por Fernando antes de avanzar.

---

## Build 39 — 1.2 (39) — features base + cosméticos
- **1.h.3** — El plan actual se lee de **RevenueCat** (no de cache viejo de AsyncStorage).
- **1.h.4** — Splash de arranque **sin spinner ni texto "Loading"** (solo el logo).
- **1.h.6** — Motivos del análisis IA del **Portfolio** traducidos (8 idiomas, templates `ai_motivo1-5`).
- **1.h.7** — FAQ (Centro de ayuda) en **8 idiomas** + respuesta de planes **SIN precios** + "alertas WhatsApp (próximamente)".
- **1.h.8** — Links de **Términos y Privacidad en el paywall** (arriba, sin scroll).
- **1.h.9** — Pantalla **Crear cuenta (Signup) en 8 idiomas** (placeholders, botón, mensajes de error).
- **E** — Precios de los planes leídos de **RevenueCat** (no hardcodeados) + cálculo del % de ahorro anual.
- **D** — **Analytics (Firebase)** para el funnel: login, signup, paywall visto, activo agregado.
- **A** — **Popup de reseña in-app** = modal con marca Cobrex (logo ⭐ + 5★ + botón dorado "Calificar"), SIN dependencia nativa (usa Alert/Linking → abre la página de reseña del App Store). Gate: **2 días distintos de uso**.
- Versión subida **1.1 → 1.2**.

## Build 40 — 1.2 (40) — correcciones de revisión (H1–H4)
- **H1** — "SOON" hardcodeado en inglés → key i18n (**PRONTO**/SOON/etc.) en 4 lugares (Alertas, Perfil ×2, selector de idioma).
- **H3** — Paywall marcaba **"PLAN ACTUAL" en mensual Y anual** a la vez (cuando el plan viene de override sin compra RC real) → marca solo uno.
- **H4** — Descripciones de los planes en el paywall salían **en inglés** (texto del producto en ASC) → ahora usan los textos traducidos de la app.
- **H2** — El **onboarding salía en inglés con el iPhone en español**: la detección de idioma usaba `NativeModules` (no anda en la New Architecture de RN 0.84) → cambiada a **`Intl`** (Hermes) con fallback.

## Build 41 — 1.2 (41) — i18n COMPLETO de TODA la app
- Traducidos **todos** los textos hardcodeados a los 8 idiomas: análisis IA (direcciones, variables), paywall, Perfil (rating, foto, botones, ayuda), Suscripción (diálogos de error), Portfolio (placeholders, labels, diálogos), Watchlist (+Lista, cerrar sesión, principal, diálogos), Alertas (Umbral/Variación, filtros, "cómo funciona", descripciones de indicadores), Mercados, MisAlertas, modales, Login.
- **~50 keys i18n nuevas** (× 8 idiomas).
- Popup con **gate real** (2 días).

## Build 42 — 1.2 (42) — fix crash + justificaciones traducen
- 🚨 **FIX CRASH:** tocar un activo en **Watchlist crasheaba la app** — la variable `varDefsT` quedaba **fuera de scope** (pertenecía a otro componente del mismo archivo) → `.map()` sobre `undefined`. Corregido (cada componente tiene su `varDefsT`).
- **H5** — Las **5 justificaciones del análisis IA** (IA + Watchlist) ahora las **GENERA LA APP** con los datos reales de la señal (RSI/volumen/dirección) y traducen en los 8 idiomas — antes venían del **backend en español**. Helper compartido `src/lib/aiMotivos.js` (mismo enfoque que Portfolio). **App-only, sin tocar el backend.**

## Build 43 — 1.2 (43) — fix traducción variables + orden paywall  ✅ FINAL
- **Variables del modelo** (Tendencia/Volatilidad/Correlación…) **no traducían**: el `useMemo` no se recalculaba al cambiar idioma porque `useT()` devuelve siempre la **misma referencia `t`** → agregado **`getLang()` a las deps** de los 3 arrays memoizados (detalle Watchlist + comparador Watchlist + modal de indicadores de Alertas). Verificado que `setLang` actualiza `_lang` antes de notificar.
- **Orden del paywall consistente:** **mensual SIEMPRE arriba del anual**, en PRO y en ELITE (antes salían en el orden inconsistente que devuelve RevenueCat).

---

## ✅ Resultado final (1.2 (43))
- **Toda la app traduce** según el idioma del usuario (8 idiomas), incluido el **análisis IA completo** (direcciones + 10 variables + justificaciones) en las **3 pantallas** (Portfolio + IA + Watchlist).
- Popup de reseña con marca Cobrex.
- Paywall: orden consistente + descripciones traducidas + links legales.
- Analytics del funnel.
- **Sin crashes.**

## ⚠️ Para portar al Android Build 38
- **El código RN es COMPARTIDO** (mismo `src/`) → la **mayoría** de estos cambios (todo el i18n, la lógica del popup, paywall, fixes de crash/variables/orden, justificaciones por app) **ya están en el código y aplican a Android automáticamente** al compilar el AAB.
- **Específicos de Android a revisar/ajustar:**
  - **Popup de reseña:** el URL es de **App Store** (`itms-apps://…id6761672161`). Para Android usar el **in-app review de Google Play** (o URL de Play Store).
  - **Splash (1.h.4):** el cambio fue en el storyboard **iOS**; Android tiene su propio splash → verificar.
  - **Firebase Analytics (D):** verificar `google-services.json` de Android.
  - **Detección de idioma (H2):** el fix con `Intl` aplica a ambos → verificar en Android.
  - **Versión Android:** bumpear `versionName`/`versionCode` (Build 38 Android).

_Code — 08-jun-2026._
