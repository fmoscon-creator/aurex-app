# 🍎 BUILD 39 iOS (Cobrex) — DETALLE COMPLETO (v3)
*08-jun-2026 · verificado en código real (archivo:línea) · sigue v1.1, `CFBundleVersion` 38→39*

> **CHANGELOG v2→v3 (08-jun — decisiones ASO + producto):**
> - 🔎 **ASO incorporado.** Subtítulo nuevo (ES): **`Acciones, Cripto y Alertas IA`** (29/30). Keywords ES **BLOQUEADOS** (98/100): `cobrex,ia,ai,divisas,bolsa,mercados,inversion,trading,dolar,finanzas,ETF,oro,pulse,futuros,señales`. **Reglas fijas 8 idiomas:** `acciones` antes que `cripto` (marca, no parecer solo-cripto) · `cobrex`+`ia`+`ai`+`pulse` siempre · comas cuentan, sin espacios · NO repetir en keywords lo que está en subtítulo/nombre · cada idioma a SUS 100 chars. Detalle: `briefs/aso/ASO_COBREX_borradores.md`. **EN/PT/FR/IT/ZH/HI/AR = pendiente Code.**
> - 🟡 **WhatsApp + API → "Próximamente"** en la descripción (no se sacan, se anuncian como próximas — honesto, están planeadas).
> - 🗓️ **Diferido a Build 40:** 1.h.2 (onboarding animado) + **API key ELITE** (falta pantalla para generar la key + migración Supabase).
> - 💲 **Precios NUNCA en la descripción** (se desactualizan) — los planes se describen por features.
>
> **CHANGELOG v1→v2 (revisión de Escritorio incorporada, 07-jun):**
> - ❌ **1.h.2 (onboarding animado) SACADO del Build 39 → Build 40** (cosmético, no aporta a conversión, riesgo gratuito).
> - 🔁 **A (reseña) movido a posición 4** del orden de ejecución (alto impacto ASO, probar temprano; ya es 🟡 con módulo nativo).
> - ➕ **1.h.6:** Code define la estructura de strings (frases COMPLETAS por condición, no concatenación) y se la pasa a Escritorio ANTES de traducir (evita romper gramática AR/ZH/HI).
> - ➕ **E:** agregado estado de **fallback** cuando `getOfferings()` falla/tarda (nunca vacío/null/crash).
> - ➕ **D:** validación = Code confirma eventos en **Firebase DebugView** antes de TestFlight.
> - ➕ **B/C:** keywords ES ya listas (abajo); resto de idiomas + textos macOS = **Escritorio genera draft** y lo presenta antes de cargar.
> - 📌 Pendiente registrado (NO build): `aurex.live` auto-renew OFF en Namecheap (Brief §14) — Escritorio lo detectó.

> Esta es la **v1 del contenido completo** del Build 39, item por item: **qué es · dónde se hace (archivo:línea) · cómo · ¿requiere build? · riesgo · quién valida.** Complementa el plan de proceso `BUILD39_PLAN_COBREX.md` (que cubre cómo se compila/envía). **NADA se compila/envía sin OK de Fernando.**

## Proceso (recordatorio, no se cambia)
- Archive por **CLI `xcodebuild`** (NO Xcode GUI). Lo compila **Code** con **OK de Fernando + Mac libre**. Clean previo: `rm -rf ~/Library/Developer/Xcode/DerivedData/AurexApp-*` + `cd ios && pod install`.
- Code valida por **revisión de código** (no abre simulador en la Mac de Fernando) + preview PNG. El visual final se ve en **TestFlight**.
- **Fernando** sube el IPA con **Transporter** + aprieta "enviar a revisión". Signing `com.fernandomoscon.aurex` / `TX7C2F79U9`. IDs no se tocan.

---

## A) ITEMS SIN BUILD (metadata — se pueden cargar en paralelo, los hace Escritorio)
| # | Qué | Dónde | Cómo | Valida |
|---|---|---|---|---|
| **B** | **Keywords ASO** (8 idiomas) — máxima visibilidad "cobrex" + funciones | ASC → versión del Build 39 → campo Keywords por idioma (100 chars c/u) | **ES BLOQUEADO (98/100):** `cobrex,ia,ai,divisas,bolsa,mercados,inversion,trading,dolar,finanzas,ETF,oro,pulse,futuros,señales`. **EN/PT/FR/IT/ZH/HI/AR = pendiente Code** (reglas en changelog v3). Re-indexa 24-48h. | Code arma · Escritorio cruza · Fernando OK |
| **Subtítulo** | Reemplaza el genérico viejo por uno con keywords (VISIBLE + indexado) | ASC → versión → Subtítulo (30 chars por idioma) | **ES:** `Acciones, Cripto y Alertas IA` (29/30). Otros idiomas = pendiente Code. Va CON el Build 39. | Code arma · Fernando OK |
| **Descripción** | Mejorada, por features (NO precios) | ASC → versión → Descripción por idioma | WhatsApp + API access = **"Próximamente"**. **Sin precios escritos** (se desactualizan). Borrador ES en `ASO_COBREX_borradores.md`. | Escritorio redacta · Code revisa |
| **C** | **Ficha macOS** (borrador vacío) | ASC app macOS (id `6761672161`) | Escritorio carga **descripción + textos** ahora (no requiere build → no bloquea iOS). Capturas (1280×800/1440×900) diferidas hasta build macOS. | Escritorio (textos) |

> **🗓️ DIFERIDO a Build 40 (no entran en este build):** 1.h.2 (onboarding animado) · **API key ELITE** (falta pantalla para generar la key + migración Supabase) · WhatsApp (reactivar cuando se destrabe el número). En la ficha del Build 39, WhatsApp + API van como "Próximamente".

---

## B) ITEMS CON BUILD (código — los hace Code, valida en TestFlight)

### 1.h.2 — Onboarding animado · ❌ DIFERIDO al Build 40
- **Sacado del Build 39** (decisión Escritorio + Code, 07-jun): es cosmético puro (constelación titila + logo más grande), **no aporta a la conversión** (objetivo del build) y sumaba riesgo 🔴 gratuito. Cuando se haga (Build 40): `OnboardingScreen.js`, reusar el patrón `Animated.loop` de `SplashView.js:31-38`.

### 1.h.3 — Fix paywall fresh-install · 🔴
- **Qué:** en instalación fresca el paywall se abre como si fuera PRO/ELITE. **Bug real pero invisible en producción** (no hay pagos reales salvo la prueba propia).
- **Dónde:** `SubscriptionScreen.js` (lógica de plan).
- **Cómo:** la fuente del plan debe ser **RevenueCat `getCustomerInfo()`**, NO el `AsyncStorage 'aurex_plan'`.
- **Validación OBLIGATORIA (doble):** (1) install fresca sin AsyncStorage → el paywall **NO** debe abrir como PRO/ELITE; (2) cuenta PRO/ELITE activa → **SÍ** reconoce el plan. Ambos en TestFlight.
- **Riesgo:** 🔴 lógica de compra. **Valida:** Code + Fernando (install fresca).

### 1.h.4 — Loading nativo (limpiar storyboard) · 🔴
- **Qué:** quitar el `label "Loading…"` + el spinner/sol (`activityIndicatorView`) del splash nativo (restos del diseño viejo).
- **Dónde:** `ios/AurexApp/BootSplash.storyboard` (XML).
- **Cómo:** **Code edita el XML directamente** (es texto plano — no requiere abrir Xcode ni trabar la Mac).
- **Riesgo:** 🔴 nativo. **Valida:** Code + Fernando (arranque real en TestFlight).

### 1.h.8 — Links Términos/Privacidad sin scroll · 🟡
- **Qué:** en la pantalla de planes los links Términos/Privacidad requieren scrollear ("nadie adivina el scroll").
- **Dónde:** `SubscriptionScreen.js:264-273` (hoy los links `Linking.openURL(TERMS_URL/PRIVACY_URL)` están abajo).
- **Cómo:** poner una línea compacta "Términos · Privacidad" **arriba, visible sin scroll** (reubicar/duplicar bajo el subtítulo).
- **Riesgo:** 🟡 UI. **Valida:** Code (revisión) + Fernando.

### 1.h.9 — Mensajes Login/Signup a i18n + quitar debug · 🟡
- **Qué:** los `setStatus(...)` ("Email inválido", "contraseña ≥6", "ya tiene cuenta", "Revisá tu email"…) están en **ES hardcodeado** → pasar a i18n (8 idiomas). **+ quitar debug leftovers** ("Fetch OK — seteando sesión…", "SDK falló…") que NO deben verse.
- **Dónde:** `LoginScreen.js` + `SignupScreen.js` + `i18n.js`.
- **Cómo:** reemplazar strings por claves i18n + traducir 8 idiomas + borrar logs visibles.
- **Riesgo:** 🟡 i18n. **Valida:** Code + Escritorio (traducciones).

### 1.h.7 — FAQ Perfil a i18n · 🟡
- **Qué:** el FAQ de Perfil (6 preguntas + 6 respuestas) está solo en ES+EN → faltan pt/zh/hi/fr/it/ar (~72 traducciones).
- **Dónde:** `PerfilScreen.js` (~957-962) + `i18n.js`.
- **Cómo:** pasar a i18n + traducir. Volumen alto + cuidar calidad de traducción.
- **Riesgo:** 🟡 i18n volumen. **Valida:** Code + Escritorio (traducciones).

### 1.h.6 — "Full AI Analysis" a i18n · 🔴
- **Qué:** las frases que justifican la señal ("Precio subió X…", "RSI14 en X…", "Volumen…") están en ES hardcodeado **con condicionales embebidos** (alcista/bajista) → reestructurar a i18n.
- **Dónde:** `PortfolioScreen.js` (~1454+) + `i18n.js`.
- **Cómo:** reestructurar a **frases COMPLETAS por condición** (una clave i18n por rama alcista/bajista), NO concatenar fragmentos. **➡️ FLUJO (acordado con Escritorio): Code define primero la estructura exacta de los strings con sus condicionales y se la pasa a Escritorio; recién ahí Escritorio traduce** (si traduce fragmentos sueltos, la concatenación rompe la gramática en AR/ZH/HI donde el adjetivo va antes del sustantivo).
- **Riesgo:** 🔴 estructura compleja. **Valida:** Code + Escritorio.

### A — Popup de reseña in-app · 🔴
- **Qué:** pedir reseña tras **3 días de uso activo**, sólo si no dejó reseña; máx 3 apariciones; si tocó "Dejar reseña" no mostrar más.
- **Dónde:** lógica nueva + dependencia nativa.
- **Cómo — ✅ VERIFICADO por Code (07-jun):** la librería `react-native-in-app-review` (v4.4.2) **NO soporta New Architecture** (sin `codegenConfig`, se buildea contra RN 0.63.4) y el proyecto usa **RN 0.84.1 (New Arch + bridgeless por defecto)** → **riesgo real confirmado** de romper el build/runtime. **DESCARTADA.**
- **➡️ Camino recomendado (más robusto):** llamar **`SKStoreReviewRequest.requestReview()` de Apple (StoreKit)** vía un **módulo nativo propio mínimo** (unas líneas Swift/ObjC) → CERO dependencia de terceros, compatible con cualquier RN/New Arch. (Android In-App Review API, cuando toque, igual.)
- **Riesgo:** 🟡 (con módulo nativo propio; era 🔴 con la lib). **Valida:** Code + Fernando (TestFlight).

### D — Firebase Analytics (eventos del funnel) · 🟡 · 🆕 (del CRO)
- **Qué:** hoy NO hay analytics → el abandono dentro del onboarding/signup es **invisible**. Sin esto no se puede medir si el cambio de precio (u otra mejora) convierte.
- **Dónde:** `package.json` + pantallas del funnel + `pod install`. (Firebase ya está integrado para push: `@react-native-firebase/app` + `/messaging` → es **agregar el módulo `/analytics`**, no desde cero.)
- **Cómo / ~8 eventos `logEvent`:** `App.js` → `onboarding_slide_viewed`, `onboarding_completed`, `signup_started`, `signup_completed`, `login_completed`; `PortfolioScreen` → `primer_activo_agregado`; `AlertCreateModal` → `primera_alerta_creada`; `SubscriptionScreen` → `paywall_visto`.
- **Riesgo:** 🟡 dependencia nativa. **Valida:** Code — **confirma los eventos en Firebase DebugView ANTES de TestFlight** (catch de Escritorio: sin verificar que llegan a la consola, el ítem pierde valor) — + Fernando.

### E — Dinamización de precios (planes SIEMPRE automáticos) · 🟡 · 🆕 (del CRO)
- **Qué:** hay precios **hardcodeados** que NO se actualizan al cambiar el precio en las tiendas → muestran el viejo/erróneo y **rompen el geo-pricing** (al turco le mostrarían "$9,99" en vez de su precio local). El paywall principal (`SubscriptionScreen.js:231`) ya es dinámico — el modelo a copiar.
- **Dónde:** `PerfilScreen.js` (cards: 429,437,441,472,480,484 · FAQ: 960) + `i18n.js` (493 `upsell_pro_titulo`, 494 `upsell_elite_titulo`, 828 `pro_anual_btn`, 829 `elite_anual_btn` — 8 idiomas c/u).
- **Cómo:** `PerfilScreen` llama `Purchases.getOfferings()` (igual que `SubscriptionScreen.js:80`) y usa `product.priceString` en cada lugar; en i18n se saca el "$X" de la clave y se concatena el `priceString` al renderizar.
- **Resultado:** subir/bajar precios (global o por país) = **CERO código/build para siempre**; cada usuario ve su precio local correcto en TODAS las pantallas. (Prerequisito para aplicar el precio nuevo $4.99/$9.99 — ver Brief §14.5.)
- **⚠️ FALLBACK obligatorio (catch de Escritorio):** cuando `getOfferings()` **tarda o falla** (ej. sin internet), las cards NO pueden mostrar vacío/`null`/crash → definir estado explícito: spinner mientras carga + texto tipo "Ver planes" (sin precio) si falla. Sin esto es un bug de UX silencioso en red mala.
- **Riesgo:** 🟡 UI/i18n. **Valida:** Code + Fernando.

---

## C) ORDEN DE EJECUCIÓN PROPUESTO (de menor a mayor riesgo)
1. **Metadata sin build (Escritorio, en paralelo):** B keywords + C textos macOS.
2. **i18n simple (texto, sin tocar lógica):** 1.h.9 + 1.h.7 (Escritorio entrega EN maestro → Code cablea). *(1.h.6 NO acá — tiene condicionales = riesgo alto.)*
3. **UI / dinamización (Code, revisión + preview):** 1.h.8 (links arriba) + **E** (precios dinámicos, con fallback). *(1.h.2 SACADO → Build 40.)*
4. **Analytics + reseña:** **D** (Firebase Analytics — verificar DebugView) + **A** (reseña, módulo nativo `SKStoreReviewRequest`). *(A movido acá por Escritorio: alto impacto ASO, probar temprano para decidir con tiempo si se manda con o sin ella.)*
5. **Riesgo alto (probar a fondo en TestFlight):** 1.h.6 (AI Analysis, estructura-primero) + 1.h.3 (paywall fresh-install, validación doble) + 1.h.4 (storyboard).

## D) Para Escritorio — qué revisar / confirmar
1. ¿Falta algún ajuste, o alguno NO debería ir en este build?
2. ¿El orden de ejecución es correcto?
3. **Traducciones** (1.h.9 / 1.h.7 / 1.h.6 + cualquier clave i18n nueva de D/E): ¿las generás vos (EN maestro + revisión) y Code las cablea?
4. **B keywords** y **C textos macOS:** ¿los cargás vos en ASC?
5. ¿Algún riesgo que veas en D (analytics) o E (dinamización) antes de tocar?
