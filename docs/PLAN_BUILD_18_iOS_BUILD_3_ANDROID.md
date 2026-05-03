# PLAN DETALLADO — Build 18 iOS + Build 3 Android

**Generado por Code el 4-may-2026.** Plan completo con dos secciones SIMÉTRICAS (iOS y Android), cada una con mismo nivel de detalle. Documento de memoria persistente para que si se cierran chats no se pierda nada.

**NO se ejecuta nada hasta OK explícito de Fernando.**

---

## ÍNDICE

- [SECCIÓN 1 — Vocabulario y conceptos compartidos](#seccion-1)
- [SECCIÓN 2 — Estado actual verificable](#seccion-2)
- [SECCIÓN 3 — Cambios compartidos en branch `dev` (afectan ambos builds)](#seccion-3)
- [SECCIÓN 4 — BUILD 18 iOS (TestFlight Internal Testing) — detalle completo](#seccion-4)
- [SECCIÓN 5 — BUILD 3 ANDROID (Internal Testing track Google Play) — detalle completo](#seccion-5)
- [SECCIÓN 6 — Cronograma paralelo iOS + Android](#seccion-6)
- [SECCIÓN 7 — Memoria persistente y referencias cruzadas](#seccion-7)
- [SECCIÓN 8 — Pregunta de aprobación](#seccion-8)

---

<a id="seccion-1"></a>
## 1. VOCABULARIO Y CONCEPTOS COMPARTIDOS

### Definiciones clave

| Término | Significado iOS | Equivalente Android |
|---|---|---|
| **Build** | `CURRENT_PROJECT_VERSION` (número incremental binario) | `versionCode` (número incremental binario) |
| **Marketing Version** | `MARKETING_VERSION` (visible al usuario) | `versionName` (visible al usuario) |
| **Track interno de testing** | TestFlight Internal Testing (max 100 testers, sin review Apple) | Internal Testing track Google Play (max 100 testers, sin review Google) |
| **Track de testing público** | TestFlight External Testing (requiere Beta App Review) | Open Testing track Google Play (requiere review) |
| **Track de producción** | App Store production (requiere review Apple) | Production track Google Play (requiere review Google) |
| **Branch operativo** | `dev` (nunca `main` mientras hay revisión activa) | `dev` (mismo branch — el repo AurexApp es uno solo, comparte branches con Android) |

### Dos cosas IDÉNTICAS para ambas plataformas

1. **Mismo repo `AurexApp`** — el código nativa es React Native, el mismo `App.js`, `src/screens/*`, `src/lib/*` se compila para iOS y Android.
2. **Mismo branch `dev`** — los cambios de código se hacen UNA sola vez en `dev` y benefician a ambos binarios.

### Dos cosas DIFERENTES por plataforma

1. **Configuración nativa específica** (carpetas `ios/` y `android/`).
2. **Toolchain de build**: Xcode para iOS, Gradle para Android.

---

<a id="seccion-2"></a>
## 2. ESTADO ACTUAL VERIFICABLE

### iOS

```
$ grep "CURRENT_PROJECT_VERSION\|MARKETING_VERSION" ios/AurexApp.xcodeproj/project.pbxproj
CURRENT_PROJECT_VERSION = 17;
MARKETING_VERSION = 1.0;
```

- **Build actual**: 17 (Marketing 1.0).
- **Estado**: en revisión App Store Connect día 11 (al 4-may).
- **Branch del binario enviado**: `main`, commit `1b319b5`.

### Android

```
$ grep "versionCode\|versionName" android/app/build.gradle
versionCode 2
versionName "1.0.1"
```

- **Build actual en Closed Testing Alpha**: versionCode 2, versionName "1.0.1".
- **Build residual en Internal Testing (track auxiliar viejo)**: versionCode 1 (Build 15 según numeración interna Play Console, lanzado 23-abr 1:46 AM).
- **Estado**: Closed Testing día 9 de 14 al 4-may, vencimiento ~9-may.
- **Riesgo crítico**: si tester hace opt-out, contador 14 días se resetea.

---

<a id="cuadro-maestro"></a>
## CUADRO MAESTRO — TODOS LOS CAMBIOS DETALLADOS (vista de un golpe)

### Tabla A — Items 1 a 11 con archivo + línea exacta + cambio concreto

| # | Item | Archivo | Línea | Cambio exacto | iOS | Android | Tiempo |
|---|---|---|---|---|---|---|---|
| **1** | **Bug Android safe area (header + footer cortados)** | `package.json` | dependencies | Agregar `"react-native-safe-area-context": "^4.x"` + `npm install` | benefit | ✅ FIX | 1-2 días |
| 1 | Idem | `App.js` raíz | top + JSX root | `import { SafeAreaProvider } from 'react-native-safe-area-context';` + envolver root + `<StatusBar translucent backgroundColor="transparent" barStyle="light-content" />` | benefit | ✅ FIX | (incluido en 1-2 días) |
| 1 | Idem | `src/screens/PerfilScreen.js` | import top | Cambiar `import { SafeAreaView } from 'react-native'` → `from 'react-native-safe-area-context'` | benefit | ✅ FIX | — |
| 1 | Idem | `src/screens/PortfolioScreen.js` | import top | Idem | benefit | ✅ FIX | — |
| 1 | Idem | `src/screens/WatchlistScreen.js` | import top | Idem | benefit | ✅ FIX | — |
| 1 | Idem | `src/screens/SubscriptionScreen.js` | import top | Idem | benefit | ✅ FIX | — |
| 1 | Idem | `src/screens/MercadosScreen.js` | import top | Idem | benefit | ✅ FIX | — |
| 1 | Idem | `src/screens/AlertasScreen.js` | import top | Idem | benefit | ✅ FIX | — |
| 1 | Idem | `src/screens/IAScreen.js` | import top | Idem | benefit | ✅ FIX | — |
| **2** | **Bug logout al minimizar** | `App.js` raíz | top imports + dentro componente App | Agregar `import { AppState } from 'react-native';` + `import { useEffect } from 'react';` + `import { supabase } from './src/lib/supabase';` + `useEffect()` con listener `AppState.addEventListener('change', ...)` que dispare `supabase.auth.refreshSession()` cuando `nextAppState === 'active'` | ✅ FIX | ✅ FIX | 1 hora |
| **3** | **Eliminar v1.0.0 hardcoded** | `src/screens/PerfilScreen.js` | 789 | Cambiar `<Text>AUREX v1.0.0 ⭐</Text>` → `<Text>AUREX v{DeviceInfo.getVersion()} ⭐</Text>` | ✅ FIX | ✅ FIX | 15 min |
| 3 | Idem (verificar `react-native-device-info` en package.json) | `package.json` | dependencies | Agregar si no existe `"react-native-device-info"` + import en PerfilScreen.js | ✅ | ✅ | (incluido) |
| **4** | **Faltas ortografía onboarding** | `src/screens/OnboardingScreen.js` | TBD | Code lee y corrige errores ortográficos en strings ES/EN/PT/FR/IT/ZH/HI/AR. Si Fernando pasa lista exacta: directo. Sino Code identifica leyendo | ✅ | ✅ | 30 min |
| **5** | **Splash sin "INVEST AI"** | `ios/AurexApp/Images.xcassets/AurexHero.imageset/logo.png` | binario | Reemplazar PNG por logo limpio (sin tagline "INVEST AI"). Source: `~/Desktop/aurex-app/logo-aurex.png` redimensionado | ✅ FIX | n/a | 30 min |
| 5 | Idem | `ios/AurexApp/Images.xcassets/AurexHero.imageset/logo@2x.png` | binario | Idem (escalado 2x) | ✅ FIX | n/a | (incluido) |
| 5 | Idem | `ios/AurexApp/Images.xcassets/AurexHero.imageset/logo@3x.png` | binario | Idem (escalado 3x) | ✅ FIX | n/a | (incluido) |
| 5 | Idem (Android equivalente — verificar al arrancar) | `android/app/src/main/res/drawable*/` o `mipmap*/` | TBD | Si existe splash equivalente con "INVEST AI", reemplazar. Si no existe, no se hace nada | n/a | ✅ FIX (si aplica) | 30 min |
| **10** | **Sacar f7 + f8 del array ELITE UI** | `src/screens/PerfilScreen.js` | 412 | Cambiar array de 8 a 6 features: `[t('plan_elite_f1'), t('plan_elite_f2'), t('plan_elite_f3'), t('plan_elite_f4'), t('plan_elite_f5'), t('plan_elite_f6')]` (sacar f7 y f8). Las traducciones en i18n.js se dejan para reusar en v1.2 | ✅ FIX | ✅ FIX | 5 min |
| **11** | **Nota "Push notifications coming soon"** | `src/screens/AlertasScreen.js` | TBD (al pie de pantalla) | Agregar componente `<Text>` con copy: ES `Las alertas se reciben con la app abierta. Notificaciones push (alertas con app cerrada) próximamente.` + EN equivalente. Variable `t('alertas_push_coming_soon')` | ✅ FIX | ✅ FIX | 20 min |
| 11 | Idem (8 idiomas) | `src/lib/i18n.js` | nuevo bloque | Agregar key `alertas_push_coming_soon` con 8 idiomas (ES, EN, PT, ZH, FR, IT, HI, AR) | ✅ FIX | ✅ FIX | 10 min |

### Tabla B — Cambios de versión por plataforma

| Plataforma | Archivo | Cambio iOS | Cambio Android | Tiempo |
|---|---|---|---|---|
| **iOS** | `ios/AurexApp.xcodeproj/project.pbxproj` | `CURRENT_PROJECT_VERSION = 17` → **`18`** | n/a | 1 min |
| iOS | Idem | `MARKETING_VERSION = 1.0` → **`1.0`** (sin cambio, es bugfix) | n/a | — |
| **Android** | `android/app/build.gradle` | n/a | `versionCode 2` → **`3`** | 1 min |
| Android | Idem | n/a | `versionName "1.0.1"` → **`"1.0.2"`** | — |

### Tabla C — Comandos de compilación por plataforma

| Plataforma | Paso | Comando exacto |
|---|---|---|
| **iOS** | Limpiar cache | `cd ~/AurexApp && cd ios && pod install && cd ..` |
| iOS | Test simulator | `npx react-native run-ios` (Code abre simulator local) |
| iOS | Compilar Build 18 | Manual desde Xcode UI: abrir `AurexApp.xcworkspace` → seleccionar "Any iOS Device (arm64)" → Product → Archive |
| iOS | Subir a TestFlight | Xcode Organizer → Distribute App → App Store Connect → Upload |
| iOS | Activar TestFlight | App Store Connect → TestFlight → Internal Testing → activar Build 18 |
| **Android** | Limpiar cache | `cd ~/AurexApp/android && ./gradlew clean` |
| Android | Test emulator | `npx react-native run-android` (Code abre AVD local) |
| Android | Compilar Build 3 | `cd ~/AurexApp/android && ./gradlew bundleRelease` |
| Android | Output AAB | `~/AurexApp/android/app/build/outputs/bundle/release/app-release.aab` |
| Android | Subir a Internal Testing | Google Play Console → AurexApp → Probar y distribuir → Internal Testing → Crear nueva versión → upload AAB |
| Android | Activar Internal Testing | Google Play Console → activar release (queda activo inmediatamente, sin review Google) |

### Tabla D — Resumen de archivos tocados (cuántos por plataforma)

| Categoría | Cantidad archivos modificados | Plataforma |
|---|---|---|
| Compartidos React Native (`App.js`, 7 screens, i18n.js, package.json, AlertasScreen.js, PerfilScreen.js, OnboardingScreen.js) | ~12 archivos | iOS + Android (mismo cambio sirve a ambos) |
| Específicos iOS (`project.pbxproj`, 3 PNGs splash) | 4 archivos | Solo iOS |
| Específicos Android (`build.gradle`, splash drawable si aplica) | 1-2 archivos | Solo Android |
| **TOTAL** | **~17-18 archivos** | — |

---

<a id="seccion-3"></a>
## 3. CAMBIOS COMPARTIDOS EN BRANCH `dev` (afectan AMBOS builds)

Estos cambios se hacen UNA sola vez en `dev` y benefician a iOS Y Android simultáneamente.

### Item 2 — Bug logout al minimizar (iOS + Android)

**Archivo**: `App.js` (raíz del proyecto AurexApp).

**Cambio exacto**: agregar listener `AppState` que dispare `refreshSession` al volver a foreground.

**Código nuevo (aprox)**:
```javascript
import { AppState } from 'react-native';
import { useEffect } from 'react';
import { supabase } from './src/lib/supabase';

// dentro del componente App:
useEffect(() => {
  const subscription = AppState.addEventListener('change', (nextAppState) => {
    if (nextAppState === 'active') {
      supabase.auth.refreshSession().catch(() => {});
    }
  });
  return () => subscription.remove();
}, []);
```

**Por qué soluciona**: cuando la app vuelve a foreground, se fuerza renovación de token JWT. Si expiró durante background, refresh recupera la sesión sin signOut automático.

**Tiempo**: 1 hr Code + testing en simulator iOS y emulator Android.

---

### Item 3 — Eliminar `v1.0.0` hardcoded en PerfilScreen

**Archivo**: `src/screens/PerfilScreen.js` línea 789.

**Línea actual**: `<Text style={...}>AUREX v1.0.0 ⭐</Text>`

**Cambio**: leer versión real desde `react-native-device-info` o `package.json`.

**Código nuevo**:
```javascript
import DeviceInfo from 'react-native-device-info';
// ...
<Text style={...}>AUREX v{DeviceInfo.getVersion()} ⭐</Text>
```

**Por qué importa**: en iOS Build 18 va a mostrar "v1.0" (MARKETING_VERSION) y en Android Build 3 va a mostrar "v1.0.2" (versionName). Hardcoded "1.0.0" queda fuera de sync.

**Tiempo**: 15 min Code (verificar si DeviceInfo ya está instalado).

---

### Item 4 — Faltas ortografía en onboarding

**Archivo**: `src/screens/OnboardingScreen.js`.

**Cambio**: leer todo el archivo, identificar errores ortográficos en strings (8 idiomas).

**Pendiente**: si tenés las faltas exactas identificadas, mandalas. Sino las busca Code en lectura.

**Tiempo**: 30 min Code.

---

### Item 10 — Sacar f7 + f8 de plan ELITE

**Archivo**: `src/screens/PerfilScreen.js` línea 412.

**Código actual**:
```javascript
{[t('plan_elite_f1'), t('plan_elite_f2'), t('plan_elite_f3'), t('plan_elite_f4'), t('plan_elite_f5'), t('plan_elite_f6'), t('plan_elite_f7'), t('plan_elite_f8')].map((f, i) => (
```

**Código nuevo**:
```javascript
{[t('plan_elite_f1'), t('plan_elite_f2'), t('plan_elite_f3'), t('plan_elite_f4'), t('plan_elite_f5'), t('plan_elite_f6')].map((f, i) => (
```

**Por qué**: chat en vivo (f7) y API personal (f8) no están implementados en nativa. Apple/Google pueden rechazar por "cobrar features no funcionando" (Guideline 3.1.1).

**Decisión consciente**: NO borrar las traducciones de i18n.js — quedan ahí para reusar en v1.2 cuando se implemente nativo.

**Tiempo**: 5 min.

---

### Item 11 — Nota "Push notifications coming soon" en pantalla alertas

**Archivo**: `src/screens/AlertasScreen.js`.

**Cambio**: agregar nota visible al pie:
- ES: `Las alertas se reciben con la app abierta. Notificaciones push (alertas con app cerrada) próximamente.`
- EN: `Alerts are received with the app open. Push notifications (alerts with app closed) coming soon.`
- Traducir a 6 idiomas más en `src/lib/i18n.js`.

**Por qué**: las descripciones de Play Store / App Store ya prometen "15 tipos de alertas configurables". Sin push, los reviewers podrían observar discrepancia. Esta nota transparenta y elimina riesgo.

**Tiempo**: 30 min Code.

---

### Item 1 — Bug Android safe area (también beneficia iOS sin romper nada)

**Archivos a tocar (ambos builds)**:

#### A. `package.json` (raíz)
- Agregar dependencia `"react-native-safe-area-context": "^4.x"`.
- Ejecutar `npm install`.

#### B. `App.js` (raíz)
- Agregar imports:
```javascript
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
```
- Envolver root con `<SafeAreaProvider>`.
- Agregar `<StatusBar translucent backgroundColor="transparent" barStyle="light-content" />`.

#### C. 7 archivos `src/screens/*.js` con `SafeAreaView` actual
Cambiar imports en cada uno:

| Archivo | Cambio |
|---|---|
| `src/screens/PerfilScreen.js` | `import { SafeAreaView } from 'react-native'` → `from 'react-native-safe-area-context'` |
| `src/screens/PortfolioScreen.js` | Idem |
| `src/screens/WatchlistScreen.js` | Idem |
| `src/screens/SubscriptionScreen.js` | Idem |
| `src/screens/MercadosScreen.js` | Idem |
| `src/screens/AlertasScreen.js` | Idem |
| `src/screens/IAScreen.js` | Idem |

**Tiempo**: 1-2 días Code + testing emulator AVD Android (visual) + testing simulator iOS (no rompe).

---

<a id="seccion-4"></a>
## 4. BUILD 18 iOS — DETALLE COMPLETO

### Cambios específicos iOS

#### Item 5 (parte iOS) — Splash screen sin "INVEST AI"

**Archivos iOS específicos a modificar**:
- `ios/AurexApp/Images.xcassets/AurexHero.imageset/logo.png`
- `ios/AurexApp/Images.xcassets/AurexHero.imageset/logo@2x.png`
- `ios/AurexApp/Images.xcassets/AurexHero.imageset/logo@3x.png`

**Cambio**: reemplazar 3 PNG por versiones del logo limpio (símbolo + texto AUREX, **sin "INVEST AI"**).

**Fuente**: usar `logo-aurex.png` del repo aurex-app (raíz) o el set del Drive externo `AUREX LOGO CON MARCA` (folder `1c2l24H49jElD4ZPSsPYzxGMxiu84qLXT`) que ya tiene logos limpios.

**Tiempo**: 1-2 hs (descargar + redimensionar 1x, 2x, 3x + reemplazar + verificar visualmente en simulator).

#### Cambio de versión iOS

**Archivo**: `ios/AurexApp.xcodeproj/project.pbxproj`.

**Líneas a cambiar**:
- `CURRENT_PROJECT_VERSION = 17` → `CURRENT_PROJECT_VERSION = 18`.
- `MARKETING_VERSION = 1.0` → **se mantiene en 1.0** (bugfix release, no feature release).

**Tiempo**: 2 min.

### Plan ejecutivo iOS — Build 18 → TestFlight Internal Testing

| # | Acción | Quién | Tiempo |
|---|---|---|---|
| 1 | Confirmar branch `dev` activo: `git -C ~/AurexApp checkout dev` | Code | 30 seg |
| 2 | Implementar items 2, 3, 4, 5, 10, 11 (compartidos + iOS splash) en `dev` | Code | ~3-4 hs |
| 3 | Implementar item 1 (Android safe area, beneficia iOS sin romper nada) | Code | 1-2 días |
| 4 | Editar `ios/AurexApp.xcodeproj/project.pbxproj`: subir CURRENT_PROJECT_VERSION 17→18 | Code | 2 min |
| 5 | Probar build local en iOS Simulator (Xcode → Run) | Code | 30 min |
| 6 | Verificar visualmente todos los items en simulator | Code | 15 min |
| 7 | Abrir Xcode + seleccionar "Generic iOS Device" o "Any iOS Device (arm64)" | Code | 1 min |
| 8 | Product → Archive (compila Build 18 firmado con provisioning) | Xcode local | 5-10 min compilación |
| 9 | Xcode Organizer → Distribute App → App Store Connect → Upload | Xcode local | 5 min upload |
| 10 | App Store Connect → TestFlight → Internal Testing → activar Build 18 para grupo de testers internos | Web Apple | 2 min |
| 11 | Fernando recibe notificación TestFlight en iPhone | Apple | inmediato |
| 12 | Fernando instala Build 18 vía TestFlight app | Fernando | 5 min |
| 13 | Fernando valida los 7 items en device real | Fernando | 30 min |
| 14 | Build 18 queda esperando, NO Submit for Review | — | — |
| 15 | Cuando Apple apruebe Build 17: App Store Connect → Submit for Review usando Build 18 | Fernando con OK Code | 10 min |

### Comandos exactos iOS

```bash
# 1. Asegurar branch dev
cd ~/AurexApp
git checkout dev
git pull

# 2. Instalar dependencias si hay nuevas
npm install
cd ios && pod install && cd ..

# 3. Limpiar build cache antes de archive
cd ios
xcodebuild clean -workspace AurexApp.xcworkspace -scheme AurexApp -configuration Release

# 4. Build para simulator (testing local Code)
cd ~/AurexApp
npx react-native run-ios

# 5. Archive para TestFlight (manual desde Xcode)
# Abrir Xcode → AurexApp.xcworkspace → seleccionar "Any iOS Device (arm64)" → Product → Archive
# (Code NO puede hacer archive desde CLI sin certificados activos en Xcode UI)
```

### Riesgos específicos iOS

| Riesgo | Probabilidad | Mitigación |
|---|---|---|
| Provisioning profile expirado | Baja | Provisioning ya en `~/Downloads/AUREX_App_Store_Distribution.mobileprovision` (5-abr). Verificar expiración |
| Cocoapods desactualizados | Media | `cd ios && pod update` antes de archive |
| Apple rechaza Build 17 mientras hacemos Build 18 | Media | Build 18 ya tiene fixes adicionales — si rechazan, ajustamos lo que pidan + usamos Build 18 directo |

---

<a id="seccion-5"></a>
## 5. BUILD 3 ANDROID — DETALLE COMPLETO

### Cambios específicos Android

#### Item 5 (parte Android) — Splash screen sin "INVEST AI"

**Verificación pendiente**: el AurexHero está en `ios/AurexApp/Images.xcassets/`. **El equivalente en Android puede o no existir** según cómo se configuró React Native Bootsplash.

**Acción Code al arrancar**: chequear `android/app/src/main/res/drawable*/` y `android/app/src/main/res/mipmap*/` por archivos relacionados con Hero/Splash. Si existen, reemplazar por versiones limpias.

**Tiempo**: 1 hr Code (depende de qué encuentre).

#### Cambio de versión Android

**Archivo**: `android/app/build.gradle`.

**Líneas a cambiar**:
- `versionCode 2` → `versionCode 3`.
- `versionName "1.0.1"` → `versionName "1.0.2"` (semantic versioning bugfix release).

**Tiempo**: 2 min.

#### Verificación AndroidManifest.xml

**Archivo**: `android/app/src/main/AndroidManifest.xml`.

**Estado verificado**: NO tiene `android:windowFullscreen="true"`. NO requiere cambios. Solo `singleTask` + `adjustResize` que están bien.

### Plan ejecutivo Android — Build 3 → Internal Testing track Google Play

| # | Acción | Quién | Tiempo |
|---|---|---|---|
| 1 | Confirmar branch `dev` activo (mismo branch que iOS) | Code | 30 seg |
| 2 | Items compartidos (2, 3, 4, 10, 11) ya implementados en paralelo con iOS | — | (ya hecho en SECCIÓN 3) |
| 3 | Item 1 (Android safe area) ya implementado en paralelo con iOS | — | (ya hecho en SECCIÓN 3) |
| 4 | Verificar/reemplazar splash Android (Item 5 parte Android) | Code | 1 hr |
| 5 | Editar `android/app/build.gradle`: versionCode 2→3, versionName "1.0.1"→"1.0.2" | Code | 2 min |
| 6 | Probar build local en Android Emulator AVD (Code abre Android Studio + corre AVD del Mac Fernando) | Code | 30 min |
| 7 | **Verificar visualmente Bug 1 en emulator: header NO cortado, footer NO cortado** | Code | 5 min |
| 8 | Verificar visualmente todos los demás items en emulator | Code | 10 min |
| 9 | Compilar AAB release: `cd android && ./gradlew bundleRelease` | Code (Bash en Mac Fernando) | 10-15 min compilación |
| 10 | Output: `android/app/build/outputs/bundle/release/app-release.aab` | — | — |
| 11 | Google Play Console → AurexApp → Probar y distribuir → Internal Testing → Crear nueva versión → upload AAB | Code (con autorización Fernando) o Fernando | 5 min |
| 12 | Agregar email Fernando + 1-2 testers Android al Internal Testing list (sugerencia: kellerlucasignacio@gmail.com o gusroma355@gmail.com) | Fernando | 2 min |
| 13 | Activar release en Internal Testing — queda activo inmediatamente, sin review Google | Code | 1 min |
| 14 | Testers reciben link de Internal Testing → tap → "Become a tester" → app actualiza vía Play Store | Testers Android | 5 min |
| 15 | Validan en device real | Testers | 15-30 min |
| 16 | Build 3 queda en Internal Testing track, **separado del Closed Testing Alpha** donde sigue Build 2 | — | — |
| 17 | Cuando Build 2 apruebe Closed Testing y vaya a Producción: Promote Build 3 desde Internal Testing a Producción | Fernando con OK Code | 10 min |

### Comandos exactos Android

```bash
# 1. Asegurar branch dev (mismo que iOS)
cd ~/AurexApp
git checkout dev

# 2. Instalar dependencias si hay nuevas
npm install

# 3. Limpiar build cache antes de bundle
cd android
./gradlew clean

# 4. Build para emulator (testing local Code)
cd ~/AurexApp
npx react-native run-android  # arranca AVD si Android Studio está abierto

# 5. Generar AAB para Internal Testing
cd ~/AurexApp/android
./gradlew bundleRelease

# 6. Output esperado
ls -la app/build/outputs/bundle/release/app-release.aab
```

### Riesgos específicos Android

| Riesgo | Probabilidad | Mitigación |
|---|---|---|
| Keystore Android perdido o cambiado | Baja | Ya configurado, ya generamos Build 2 sin problema |
| `./gradlew bundleRelease` falla por dependencias | Media | `./gradlew clean` antes; si persiste, revisar logs |
| Signing config en `build.gradle` no encuentra keystore | Baja | Verificable con `cat android/app/build.gradle | grep storeFile` |
| Internal Testing track NO acepta el AAB (formato/firmado) | Baja | Si pasa, Code investiga error específico de Google Play Console |
| Tester en Closed Testing hace opt-out → resetea contador 14 días | Media | NO TOCAR el Closed Testing — solo subir a Internal Testing track separado |

---

<a id="seccion-6"></a>
## 6. CRONOGRAMA PARALELO iOS + ANDROID

Como ambos builds salen del MISMO branch `dev` y comparten 90% del código, se trabajan EN PARALELO, no secuencial.

### Día 1 (jornada Code)
- Implementar items compartidos 2, 3, 4, 10, 11 en `dev`.
- Commit + push cada item por separado (trazabilidad).
- ~3-4 hs total.

### Día 2-3 (jornada Code)
- Implementar item 1 (Android safe area — beneficia ambos).
- Testing local en simulator iOS + emulator Android AVD.
- ~1-2 días.

### Día 3-4 (jornada Code + Fernando)
- Implementar item 5 splash (iOS + Android).
- Cambiar versiones (`CURRENT_PROJECT_VERSION 18` + `versionCode 3` + `versionName 1.0.2`).
- Compilar Build 18 iOS (Xcode archive) Y Build 3 Android (Gradle bundle).
- Subir Build 18 a TestFlight Internal Testing.
- Subir Build 3 a Internal Testing track Google Play.

### Día 4-5 (validación Fernando + testers)
- Fernando instala Build 18 en iPhone via TestFlight, valida 7 items.
- 1-2 testers Android instalan Build 3 via Internal Testing track, validan 7 items.

### Cuando Apple apruebe Build 17 (variable, ~10-14 días post-submit)
- Submit Build 18 a App Store production.

### Cuando Google apruebe Closed Testing Build 2 (~9-may + completar formulario)
- Promote Build 3 desde Internal Testing a Production.

**Total Code: 3-5 días.**
**Total + validación + uploads: 4-6 días.**

---

<a id="seccion-7"></a>
## 7. MEMORIA PERSISTENTE Y REFERENCIAS CRUZADAS

### Para que NO se pierda nada si se cierran chats

Este documento + estos archivos quedan como referencia permanente:

| Archivo | Qué contiene |
|---|---|
| `docs/PLAN_BUILD_18_iOS_BUILD_3_ANDROID.md` (este archivo) | Plan completo simétrico iOS + Android |
| `CONTEXTO.md` sección "GOOGLE PLAY — Android Build 2" | Estado verificado al 4-may (programa 15%, billing, Closed Testing día 9 de 14, riesgo opt-out) |
| `DAILY_STATUS.md` | Bitácora viva con pendientes para los próximos días |
| `docs/BLOQUE_*.md` (1 a 9) | Paso CERO Fase A completa — bios, nombres, identidad, assets, riesgos, disclaimer, costos, orden, contenido warm-up |
| `~/Downloads/SECRET_BANKING_AUREX.txt` | Datos sensibles banking (NO commiteado) |

### Memoria persistente Code (`~/.claude/projects/-Users-fernandomoscon/memory/`)

| Memoria | Regla |
|---|---|
| `feedback_credenciales.md` | Passwords nunca por chat ni en repo |
| `feedback_mensajes_cortos.md` | Análisis arriba, preguntas TODAS al final numeradas |
| `project_assets_visuales.md` | Jerarquía 3 elementos (App Icon perfiles / Logo con marca banners / Búho v2 contenido) |
| `project_whatsapp_business.md` | NUNCA reactivar `sendWhatsAppEvolution()` — Telegram cubre 100% |
| `project_operativo.md` | Banking Apple + Google + programa 15% + datos operativos |

### Cuando arranque otra sesión Code (terminal nueva)

Code lee automáticamente:
1. `MEMORY.md` (índice).
2. Memorias relevantes según contexto.
3. `CONTEXTO.md` y `DAILY_STATUS.md` cuando lo pidas.

**Si te confundís en otra sesión:** simplemente decí "leé `docs/PLAN_BUILD_18_iOS_BUILD_3_ANDROID.md` para retomar Build 18 + 3" y este documento le da TODO lo necesario para continuar sin perder contexto.

---

<a id="seccion-8"></a>
## 8. PREGUNTA DE APROBACIÓN

### Lo que NO ejecuto sin tu OK

Yo (Code) NO arranco ningún paso hasta autorización explícita.

### Pasos no-destructivos (con tu OK arranco)

1. Items 2, 3, 4, 10, 11 en `dev` (cambios pequeños, fácil revertir).
2. Item 1 Android safe area en `dev`.
3. Item 5 splash iOS + verificar Android.
4. Cambios de versión.
5. Compilar Build 18 / Build 3 localmente (genera archivos pero no sube).

### Pasos destructivos (cada uno requiere OK adicional)

1. Subir Build 18 a TestFlight Internal Testing.
2. Subir Build 3 a Internal Testing track Google Play.
3. Submit Build 18 a App Store Production (NO hasta aprobación Build 17).
4. Promote Build 3 a Production (NO hasta aprobación Build 2 closed testing).

### Preguntas para vos antes que arranque

1. ¿**Aprobás arrancar items 2, 3, 4, 5, 10, 11 + item 1** en branch `dev` AurexApp en paralelo iOS + Android?
2. ¿**Tenés identificadas las faltas de ortografía exactas** del onboarding o las busca Code en lectura?
3. ¿Algún ítem que quieras **modificar, agregar o sacar** antes que arranque?
4. ¿Cuándo querés que **arranque a programar** — hoy mismo, mañana 5-may, o después de la decisión sobre WhatsApp 2563 (esta noche 22:00 AR)?

---

*PLAN_BUILD_18_iOS_BUILD_3_ANDROID.md v2 — generado por Code el 4-may-2026 con estructura simétrica iOS + Android. Pendiente aprobación Fernando antes de ejecutar cualquier item.*
