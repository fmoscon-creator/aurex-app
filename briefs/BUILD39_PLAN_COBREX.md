# 🍎 BUILD 39 iOS (Cobrex) — Análisis de proceso + ajustes (v3 — CONSOLIDADO)

*Fecha: 03-jun-2026 · Autor: Code · Validado con Escritorio (v1→v2→v3) · **EJECUCIÓN: mañana, no hoy** · NADA se compila/envía sin OK de Fernando.*
*Base: `FLUJO_BUILD_IOS_ANDROID.md` + brief §1.h + memorias de proceso. No inventa nada — verificado contra los docs.*
*📌 **Documento canónico = esta raw URL del repo público** (`briefs/BUILD39_PLAN_COBREX.md`). Cualquier mensaje/resumen es secundario; ante duda, vale este doc.*

## CHANGELOG v2 → v3 (4 observaciones de Escritorio resueltas)
1. **Doc canónico aclarado:** la referencia es esta raw URL, no los mensajes-resumen (que comprimen info).
2. **Canal de devolución de traducciones definido** (ver §0): Escritorio deja las traducciones en `briefs/build39/translations/` (repo público) o vía Fernando; Code las cablea al i18n.
3. **Ítem A (reseña) — gap técnico cerrado:** verificado que **NO hay librería de reseñas in-app instalada** en `~/AurexApp` → hay que **agregar `react-native-in-app-review`** (toca Podfile + `pod install` adicional, que ya entra en el clean del §1.4). Riesgo del ítem A sube a 🔴 por la dependencia nativa nueva. **Confirmar versión compatible con la RN del proyecto antes de codear A.**
4. **Keywords ASO con margen:** el string de 98 chars estaba al límite → se propone quitar `analisis` (ya está en nombre/descripción) → **89 chars**, deja margen por si Apple objeta una keyword.

## CHANGELOG v1 → v2 (6 correcciones de Escritorio aplicadas)
1. **Archive por CLI (`xcodebuild`), NO Xcode GUI** — corregido §1.4 con los comandos reales del flujo oficial. Lo ejecuta **Code via CLI** (Fernando solo sube con Transporter), con OK + Mac libre.
2. **Reseña (A): usa `SKStoreReviewRequest` nativo de iOS** (maneja sus propios límites), NO un popup casero con contador propio.
3. **1.h.3: validación explícita** — install fresca (no abre PRO/ELITE) + cuenta PRO/ELITE activa (sí reconoce).
4. **1.h.4: Code edita el XML del storyboard directo** (es texto, sin abrir Xcode); Fernando confirma en TestFlight.
5. **1.h.6 movido al paso 4** (riesgo alto), NO al paso 2 de i18n simple.
6. **Ficha macOS (C): textos se cargan ya sin build** (Escritorio); solo las capturas se difieren.
+ 1.h.2 reusa el patrón de `SplashView.js` (no inventar).

---

## §0 — CÓMO SE MANEJAN CODE ↔ ESCRITORIO (canal concreto, todo en GitHub)
- **Plan + snapshots de código → repo público `aurex-app`.** Escritorio audita por raw URL: el plan (`briefs/BUILD39_PLAN_COBREX.md`) + cada archivo a tocar (`briefs/build39/code_snapshot/<archivo>`). Code snapshotea cada archivo del repo privado **antes** de modificarlo, así Escritorio compara antes/después sin entrar al repo privado.
- **Devolución de traducciones (1.h.9 / 1.h.7 / 1.h.6):** Escritorio entrega el **EN maestro + las traducciones** en un archivo (`.md`/`.json`) → lo deja en `briefs/build39/translations/` del repo público (si tiene push) **o** se lo pasa a Fernando → Code. **Code las cablea al i18n** y snapshotea el resultado para que Escritorio lo verifique.
- **Dropbox NO es canal con Escritorio** (solo respaldo de Fernando).

---

## PARTE 1 — REGLAS Y PROCESO DE BUILD / COMPILACIÓN / TESTFLIGHT (acordado, no se cambia)

### 1.1. Reglas DURAS (no negociables)
1. **🚫 Code NUNCA compila por iniciativa propia.** Prohibido lanzar `xcodebuild archive` / build de simulador / `pod install` de sorpresa (congeló la Mac 3 veces). El clean + archive (§1.4) lo ejecuta **Code por CLI** (flujo oficial) **PERO solo con OK explícito de Fernando y la Mac libre** — nunca de sorpresa, nunca build de simulador con `-derivedDataPath` propio.
2. **🚫 No se cambia ni "optimiza" un paso del proceso ya definido.** Se ejecuta literal. Cambios se proponen y se espera OK.
3. **👁️ Validación de Code = REVISIÓN DE CÓDIGO (sin tocar la Mac de Fernando).** Code NO abre el simulador en la pantalla de Fernando, NO compila, NO le saca capacidad. Valida analizando el código (lógica, estructura, i18n, que el cambio sea correcto) y, si hace falta ver algo visual, genera un **preview PNG liviano** (HTML→PNG, no usa la Mac). **El resultado visual final se valida en TestFlight (Fernando)**, no en el simulador.
4. **🔒 IDs que NO cambian** (rompen pagos/identidad): bundle `com.fernandomoscon.aurex`, Team `TX7C2F79U9`, product IDs `com.fernandomoscon.aurex.*`, RC `aurex_default`/`pro`/`elite`.

### 1.2. Reparto de roles (según `FLUJO_BUILD_IOS_ANDROID.md`)
- **Code:** edita el código en `~/AurexApp/src` (repo privado `AurexApp`, branch `dev`), valida por **revisión de código** (sin tocar la Mac de Fernando), y hace el **clean + archive + export IPA por CLI** (§1.4) **con OK de Fernando y la Mac libre**. Valida el IPA antes de entregarlo.
- **Fernando:** **NO toca Xcode, NO compila.** Solo: da OK para el archive, **sube el IPA con Transporter**, prueba en TestFlight, y **aprieta "enviar a revisión"** (único que envía a Apple).
- **Escritorio:** valida este plan + carga la metadata en ASC (keywords, ficha macOS, textos) que NO requiere build + genera las traducciones (EN maestro).

### 1.3. Flujo de compilación (brief §11 FLUJO — se ejecuta TAL CUAL)
1. Code prepara los cambios de código + sube cambios al repo (`~/AurexApp`, branch `dev`).
2. **Code valida por revisión de código** (sin Mac de Fernando) + preview PNG si aplica → deja todo listo.
3. **Limpieza + compilación + export IPA — Code por CLI** (con OK de Fernando + Mac libre): ver comandos exactos en **§1.4**. Code valida el IPA.
   - Única diff técnica esperada vs Build 38: `CFBundleVersion` **38 → 39** (CFBundleShortVersionString sigue **1.1**). Signing `com.fernandomoscon.aurex` / `TX7C2F79U9`.
4. **Subida:** IPA → **Transporter** → App Store Connect.
5. **TestFlight:** instalar en iPhone/iPad real y **probar cada ajuste** antes de enviar a revisión.
6. **Enviar a revisión** (Fernando) + **publicación MANUAL** (al aprobar no sale solo).
7. **Backup** del IPA en `~/AurexApp/backups/ipa/Build39/`.

> **Nota de versión:** el Build 39 sigue siendo **v1.1** (mismo MarketingVersion), solo sube el número de compilación a 39. No es una versión nueva de cara al usuario, es una actualización de la 1.1.

### 1.4. CÓMO se limpia y se compila — por CLI (`FLUJO_BUILD_IOS_ANDROID.md`)
> **Corrección v2 (validación Escritorio):** el flujo oficial compila por **CLI con `xcodebuild`**, **NO desde Xcode GUI**. En el flujo oficial **lo ejecuta Code** (Fernando NO toca Xcode, solo sube con Transporter). El incidente que congeló la Mac fue un build de *simulador* con `-derivedDataPath` propio — eso NO es este flujo. Igual, por tu sensibilidad con la máquina: el archive (~10-20 min de CPU) se corre **con tu OK y la Mac libre**.

**Paso 0 — Clean obligatorio (Code · no se saltea nunca):**
```
rm -rf ~/Library/Developer/Xcode/DerivedData/AurexApp-*
cd ~/AurexApp/ios && pod install && cd ..
```
(Equivalente al `./gradlew clean` de Android. Sin clean → cachés viejos generan IPAs corruptos.)

**Paso 1 — Archive + export IPA por CLI (Code):**
```
cd ~/AurexApp/ios
mkdir -p ~/AurexApp/backups/ipa/Build39
cp ~/AurexApp/backups/ipa/Build38/ExportOptions.plist ~/AurexApp/backups/ipa/Build39/   # reusar de la build anterior
xcodebuild -workspace AurexApp.xcworkspace -scheme AurexApp \
  -archivePath ~/AurexApp/backups/ipa/Build39/AurexApp.xcarchive \
  -allowProvisioningUpdates archive
xcodebuild -exportArchive \
  -archivePath ~/AurexApp/backups/ipa/Build39/AurexApp.xcarchive \
  -exportOptionsPlist ~/AurexApp/backups/ipa/Build39/ExportOptions.plist \
  -exportPath ~/AurexApp/backups/ipa/Build39/
```
→ IPA en `~/AurexApp/backups/ipa/Build39/AurexApp.ipa`. Code lo **valida** (unzip + chequear `CFBundleVersion=39`, `CFBundleDisplayName=Cobrex`, signing) antes de entregar.
**❌ NO hacer:** Fernando abrir Xcode → Archive. Todo por CLI.

**Paso 2 — Subir (Fernando):** abrir **Transporter** → `+` → seleccionar el IPA → subir. Si el logo sale **gris** (no dorado) = metadata no coincide → STOP, Code re-valida.

⚠️ **NO tocar `MARKETING_VERSION`** (queda **1.1**, como Build 38); solo sube `CURRENT_PROJECT_VERSION` **38 → 39**. Signing `com.fernandomoscon.aurex` / `TX7C2F79U9`.

---

## PARTE 2 — AJUSTES DEL BUILD 39 (qué · dónde · cómo · riesgo · validación)

> Leyenda riesgo: 🟢 bajo (texto/metadata) · 🟡 medio (UI/i18n) · 🔴 alto (lógica nativa/compra/animación).

| # | Ajuste | Qué es / por qué | Dónde (archivo) | Cómo se hace | Riesgo | Valida |
|---|---|---|---|---|---|---|
| **A** | **Reseña in-app (corregido v2)** | Pedir reseña tras **3 días de USO ACTIVO** (días que abrió la app). | **API NATIVA `SKStoreReviewRequest` de iOS** (la que Apple recomienda — **maneja sus propios límites**: máx 3 veces/año, nunca si el usuario ya dejó reseña). Code SOLO **cuenta los 3 días de uso activo** (AsyncStorage) y **dispara `SKStoreReviewRequest.requestReview()`** en ese momento; **iOS decide** si lo muestra. **NO** un popup casero, NO link manual, NO contador propio de "3 apariciones" (eso lo gestiona iOS). ⚠️ **(v3) NO hay librería de reseñas instalada** → agregar **`react-native-in-app-review`** (toca Podfile + `pod install`; confirmar versión compatible con la RN del proyecto ANTES de codear). | 🔴 (dependencia nativa nueva) | Code (revisión código) + Fernando (TestFlight) |
| **1.h.2** | Onboarding animado | Constelación que titila + logo/COBREX más grandes (cosmético). | onboarding RN | **Reusar el patrón de animación de `SplashView.js`** que ya funciona (NO inventar desde cero). Animación RN (Animated). Validar por revisión de código + Fernando en TestFlight. | 🔴 (animación) | Code (revisión código) + Fernando |
| **1.h.3** | Paywall fresh-install | En instalación fresca el paywall se abre como PRO/ELITE. Fix: leer RC `getCustomerInfo()` en vez de AsyncStorage `aurex_plan`. **Bug real pero invisible en producción** (no hay pagos PRO/ELITE reales salvo la prueba). | `SubscriptionScreen`/lógica de plan | Cambiar la fuente del plan a RevenueCat. **Validación explícita (obligatoria):** probar (1) **install fresca** sin AsyncStorage → el paywall NO debe abrir como PRO/ELITE; (2) **cuenta PRO/ELITE activa** → SÍ debe reconocer el plan. Ambos casos en TestFlight. | 🔴 (lógica compra) | Code + Fernando (TestFlight, install fresca) |
| **1.h.4** | Loading nativo | Quitar "Loading…" + spinner sol del `.storyboard` (restos del diseño viejo). | `LaunchScreen.storyboard` / nativo iOS | Code edita el **XML del `.storyboard` directamente** (es texto plano — no requiere abrir Xcode ni la Mac). Fernando confirma el arranque real en TestFlight. | 🔴 (nativo) | Code + Fernando |
| **1.h.8** | Links Términos/Privacidad sin scroll | En la pantalla de planes los links requieren scrollear ("nadie adivina el scroll"). Poner línea compacta "Términos · Privacidad" **arriba**, visible sin scroll. | `SubscriptionScreen` | Reubicar/duplicar los links arriba (debajo del subtítulo). | 🟡 (UI) | Code (revisión código) + Fernando |
| **1.h.9** | Mensajes Login/Signup a i18n | Los `setStatus(...)` ("Email inválido", "contraseña ≥6", "ya tiene cuenta", "Revisá tu email", etc.) están en ES hardcodeado → pasar a i18n (8 idiomas). **+ quitar debug leftovers** ("Fetch OK — seteando sesión…", "SDK falló, probando fetch directo…") que NO deben verse. | `LoginScreen`/`SignupScreen` + i18n | Reemplazar strings por claves i18n + traducir 8 idiomas + borrar logs visibles. | 🟡 (i18n) | Code + Escritorio (traducciones) |
| **1.h.7** | FAQ Perfil a i18n (Grupo 2) | El FAQ de Perfil (6 preguntas + 6 respuestas) está solo en ES+EN → faltan pt/zh/hi/fr/it/ar (~72 traducciones). | `PerfilScreen` (~957-962) + i18n | Pasar a i18n + traducir. **Volumen alto + riesgo de calidad de traducción.** | 🟡 (i18n volumen) | Code + Escritorio (traducciones) |
| **1.h.6** | "Full AI Analysis" a i18n (Grupo 3) | Las frases que justifican la señal ("Precio subió X…", "RSI14 en X…", "Volumen…") están en ES hardcodeado **con condicionales embebidos** (alcista/bajista) → reestructurar a i18n. | `PortfolioScreen` (~1454+) + i18n | Reestructurar con cuidado (los condicionales hacen riesgoso el i18n). | 🔴 (estructura compleja) | Code + Escritorio |
| **B** | **Keywords ASO** (búsqueda) | Agregar `cobrex`+`cedears` en ES + `cobrex` en los otros idiomas → arregla que no aparezca al buscar "cobrex" en AR. **NO es código** (metadata de la versión). | App Store Connect (no es build) | Escritorio carga las keywords en ASC. Texto ES (v3, **89 chars** con margen, se quitó `analisis` que ya está en nombre/descripción): `cobrex,cripto,acciones,bolsa,trading,alertas,mercados,inversiones,cedears,IA,ETF,finanzas`. | 🟢 (metadata) | Escritorio (carga) |
| **C** | **Ficha macOS (corregido v2)** | El borrador macOS está vacío. **Los textos/descripción NO requieren build** (se cargan ya); solo las **capturas** requieren build macOS. | ASC app macOS (id 6761672161) | **Escritorio carga descripción + textos en ASC ahora** (sin build → no bloquea el iOS). Las **capturas** (1280×800/1440×900) se difieren hasta tener un build macOS. | 🟢 textos / difer. capturas | Escritorio (carga textos) |
| **D** | **Firebase Analytics** (eventos del funnel) — ✅ DECIDIDO Fernando 04-jun | HOY NO hay analytics → el drop del onboarding/signup es **invisible**, no se puede hacer CRO serio. Agregar el módulo `@react-native-firebase/analytics` (Firebase ya está integrado para push) + ~8 eventos: `onboarding_slide_viewed`, `onboarding_completed`, `signup_started`, `signup_completed`, `login_completed`, `primer_activo_agregado`, `primera_alerta_creada`, `paywall_visto`. **Va sí o sí en Build 39 iOS + próximo build Android.** | `package.json` + pantallas del funnel + `pod install` | Instalar módulo + `logEvent` en cada paso. Dependencia nativa → requiere build. | 🟡 (dep nativa) | Code + Fernando (TestFlight) |
| **E** | **Dinamizar precios (planes SIEMPRE automáticos)** — del CRO | Hay precios **hardcodeados** (Perfil, FAQ, banners upsell, botones anuales i18n) que NO se actualizan al cambiar precio en las tiendas → muestran el viejo/erróneo y **rompen el geo-pricing** (al turco le mostrarían "$9,99" en vez de su precio local). Pasarlos a `priceString` de RevenueCat (como el paywall principal ya hace). **Resultado: subir/bajar precios (global o por país) = CERO código, para siempre.** | `PerfilScreen.js` (429,437,441,472,480,484,960) + `i18n.js` (493,494,828,829) | `getOfferings()` + `product.priceString` en cada lugar; sacar el "$X" de las claves i18n. Spec detallado: `briefs/cro/CODE_analisis.md` §7. | 🟡 (UI/i18n) | Code + Fernando (TestFlight) |

---

## PARTE 3 — ORDEN DE EJECUCIÓN PROPUESTO (de menor a mayor riesgo)
1. **Metadata sin build (en paralelo, Escritorio):** keywords ASO (B) + **textos ficha macOS (C)**. *No dependen del código ni del build iOS.*
2. **i18n simple (texto, sin tocar lógica):** **1.h.9** + **1.h.7** (Escritorio genera EN maestro → Code cablea). *(1.h.6 NO va acá — Escritorio detectó que tiene condicionales embebidos = riesgo alto.)*
3. **UI (Code, por revisión de código + preview PNG):** 1.h.8 (links arriba), 1.h.2 (onboarding, reusando patrón de SplashView).
4. **Riesgo alto (probar a fondo en TestFlight):** **1.h.6** (AI Analysis, condicionales) + 1.h.3 (paywall fresh-install, validación doble) + 1.h.4 (loading storyboard) + A (reseña con `SKStoreReviewRequest`).
5. **Code compila por CLI (§1.4, con OK + Mac libre) → valida IPA → Fernando sube con Transporter → TestFlight → probar TODO → Fernando envía a revisión.**
6. **macOS capturas (C):** diferidas hasta tener build macOS (los textos ya van en el paso 1).

> **Antes de compilar:** Code valida todo por **revisión de código** (sin tocar la Mac) + preview PNG si aplica; recién con todo listo, Fernando hace el **clean (§1.4) + archive** con la Mac libre. El resultado visual se confirma en **TestFlight**. **Nada se envía a Apple sin que Fernando lo apruebe y lo dispare.**

---

## Para Escritorio — qué validar
- ¿El proceso de la Parte 1 está completo y correcto según lo acordado?
- ¿Falta algún ajuste en la Parte 2 (o alguno no debería ir en este build)?
- ¿El orden de la Parte 3 te cierra?
- Traducciones (1.h.9 / 1.h.7 / 1.h.6): ¿las generás vos (EN maestro + revisión) y Code las cablea?
- macOS (C): ¿entra ahora o se difiere?
