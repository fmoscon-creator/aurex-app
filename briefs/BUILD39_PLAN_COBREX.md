# 🍎 BUILD 39 iOS (Cobrex) — Análisis de proceso + ajustes (v2)

*Fecha: 03-jun-2026 · Autor: Code · Para validación de Escritorio + OK de Fernando · NADA se compila/envía sin OK.*
*Base: `FLUJO_BUILD_IOS_ANDROID.md` + brief §1.h + memorias de proceso. No inventa nada — verificado contra los docs.*

## CHANGELOG v1 → v2 (6 correcciones de Escritorio aplicadas)
1. **Archive por CLI (`xcodebuild`), NO Xcode GUI** — corregido §1.4 con los comandos reales del flujo oficial. Lo ejecuta **Code via CLI** (Fernando solo sube con Transporter), con OK + Mac libre.
2. **Reseña (A): usa `SKStoreReviewRequest` nativo de iOS** (maneja sus propios límites), NO un popup casero con contador propio.
3. **1.h.3: validación explícita** — install fresca (no abre PRO/ELITE) + cuenta PRO/ELITE activa (sí reconoce).
4. **1.h.4: Code edita el XML del storyboard directo** (es texto, sin abrir Xcode); Fernando confirma en TestFlight.
5. **1.h.6 movido al paso 4** (riesgo alto), NO al paso 2 de i18n simple.
6. **Ficha macOS (C): textos se cargan ya sin build** (Escritorio); solo las capturas se difieren.
+ 1.h.2 reusa el patrón de `SplashView.js` (no inventar).

---

## PARTE 1 — REGLAS Y PROCESO DE BUILD / COMPILACIÓN / TESTFLIGHT (acordado, no se cambia)

### 1.1. Reglas DURAS (no negociables)
1. **🚫 Code NUNCA compila pesado en la Mac de Fernando sin OK explícito.** Prohibido `xcodebuild archive`, build de simulador desde cero, `pod install` completo por iniciativa propia (congeló la Mac 3 veces). La compilación/archive la **dispara Fernando** cuando NO está usando la Mac.
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
| **A** | **Reseña in-app (corregido v2)** | Pedir reseña tras **3 días de USO ACTIVO** (días que abrió la app). | **API NATIVA `SKStoreReviewRequest` de iOS** (la que Apple recomienda — **maneja sus propios límites**: máx 3 veces/año, nunca si el usuario ya dejó reseña). Code SOLO **cuenta los 3 días de uso activo** (AsyncStorage) y **dispara `SKStoreReviewRequest.requestReview()`** en ese momento; **iOS decide** si lo muestra. **NO** un popup casero, NO link manual, NO contador propio de "3 apariciones" (eso lo gestiona iOS). En RN: módulo `StoreReview`/bridge nativo. | 🟡 | Code (revisión código) + Fernando (TestFlight) |
| **1.h.2** | Onboarding animado | Constelación que titila + logo/COBREX más grandes (cosmético). | onboarding RN | **Reusar el patrón de animación de `SplashView.js`** que ya funciona (NO inventar desde cero). Animación RN (Animated). Validar por revisión de código + Fernando en TestFlight. | 🔴 (animación) | Code (revisión código) + Fernando |
| **1.h.3** | Paywall fresh-install | En instalación fresca el paywall se abre como PRO/ELITE. Fix: leer RC `getCustomerInfo()` en vez de AsyncStorage `aurex_plan`. **Bug real pero invisible en producción** (no hay pagos PRO/ELITE reales salvo la prueba). | `SubscriptionScreen`/lógica de plan | Cambiar la fuente del plan a RevenueCat. **Validación explícita (obligatoria):** probar (1) **install fresca** sin AsyncStorage → el paywall NO debe abrir como PRO/ELITE; (2) **cuenta PRO/ELITE activa** → SÍ debe reconocer el plan. Ambos casos en TestFlight. | 🔴 (lógica compra) | Code + Fernando (TestFlight, install fresca) |
| **1.h.4** | Loading nativo | Quitar "Loading…" + spinner sol del `.storyboard` (restos del diseño viejo). | `LaunchScreen.storyboard` / nativo iOS | Code edita el **XML del `.storyboard` directamente** (es texto plano — no requiere abrir Xcode ni la Mac). Fernando confirma el arranque real en TestFlight. | 🔴 (nativo) | Code + Fernando |
| **1.h.8** | Links Términos/Privacidad sin scroll | En la pantalla de planes los links requieren scrollear ("nadie adivina el scroll"). Poner línea compacta "Términos · Privacidad" **arriba**, visible sin scroll. | `SubscriptionScreen` | Reubicar/duplicar los links arriba (debajo del subtítulo). | 🟡 (UI) | Code (revisión código) + Fernando |
| **1.h.9** | Mensajes Login/Signup a i18n | Los `setStatus(...)` ("Email inválido", "contraseña ≥6", "ya tiene cuenta", "Revisá tu email", etc.) están en ES hardcodeado → pasar a i18n (8 idiomas). **+ quitar debug leftovers** ("Fetch OK — seteando sesión…", "SDK falló, probando fetch directo…") que NO deben verse. | `LoginScreen`/`SignupScreen` + i18n | Reemplazar strings por claves i18n + traducir 8 idiomas + borrar logs visibles. | 🟡 (i18n) | Code + Escritorio (traducciones) |
| **1.h.7** | FAQ Perfil a i18n (Grupo 2) | El FAQ de Perfil (6 preguntas + 6 respuestas) está solo en ES+EN → faltan pt/zh/hi/fr/it/ar (~72 traducciones). | `PerfilScreen` (~957-962) + i18n | Pasar a i18n + traducir. **Volumen alto + riesgo de calidad de traducción.** | 🟡 (i18n volumen) | Code + Escritorio (traducciones) |
| **1.h.6** | "Full AI Analysis" a i18n (Grupo 3) | Las frases que justifican la señal ("Precio subió X…", "RSI14 en X…", "Volumen…") están en ES hardcodeado **con condicionales embebidos** (alcista/bajista) → reestructurar a i18n. | `PortfolioScreen` (~1454+) + i18n | Reestructurar con cuidado (los condicionales hacen riesgoso el i18n). | 🔴 (estructura compleja) | Code + Escritorio |
| **B** | **Keywords ASO** (búsqueda) | Agregar `cobrex`+`cedears` en ES + `cobrex` en los otros idiomas → arregla que no aparezca al buscar "cobrex" en AR. **NO es código** (metadata de la versión). | App Store Connect (no es build) | Escritorio carga las keywords en ASC junto con este envío. Texto ES listo: `cobrex,cripto,acciones,bolsa,trading,alertas,mercados,inversiones,analisis,cedears,IA,ETF,finanzas`. | 🟢 (metadata) | Escritorio (carga) |
| **C** | **Ficha macOS (corregido v2)** | El borrador macOS está vacío. **Los textos/descripción NO requieren build** (se cargan ya); solo las **capturas** requieren build macOS. | ASC app macOS (id 6761672161) | **Escritorio carga descripción + textos en ASC ahora** (sin build → no bloquea el iOS). Las **capturas** (1280×800/1440×900) se difieren hasta tener un build macOS. | 🟢 textos / difer. capturas | Escritorio (carga textos) |

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
