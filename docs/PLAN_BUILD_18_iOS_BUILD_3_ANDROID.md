# PLAN DETALLADO — Build 18 iOS + Build 3 Android

**Generado por Code el 3-may-2026 a pedido de Fernando.** Plan completo archivo por archivo, con cambios concretos, vocabulario aclarado, riesgos y rol de cada parte. **NO se ejecuta nada hasta OK explícito de Fernando.**

---

## 1. VOCABULARIO CLAVE (para evitar confusión)

| Término | Significado | Cómo se materializa |
|---|---|---|
| **Build (iOS)** | Número incremental del binario iOS | Campo `CURRENT_PROJECT_VERSION` en `ios/AurexApp.xcodeproj/project.pbxproj`. Hoy = 17, próximo = 18 |
| **Marketing Version (iOS)** | Versión "comercial" visible al usuario en App Store | Campo `MARKETING_VERSION`. Hoy = 1.0. Lo dejamos en 1.0 (no es feature release, es bugfix) |
| **versionCode (Android)** | Número incremental del binario Android | Campo en `android/app/build.gradle`. Hoy = 2, próximo = 3 |
| **versionName (Android)** | Versión "comercial" visible | Hoy = "1.0.1". Cambiamos a "1.0.2" (bugfix release) |
| **TestFlight Internal Testing (Apple)** | Canal interno Apple para distribuir builds a max 100 testers SIN review Apple | Subimos Build 18 ahí, Fernando instala en iPhone y valida sin que Apple se entere |
| **TestFlight External Testing (Apple)** | Canal de testing público hasta 10k testers — requiere Beta App Review | NO usamos esto (limitamos a Internal) |
| **Track Internal Testing (Google Play)** | Canal interno Google Play para max 100 testers SIN review Google | Subimos Build 3 ahí, separado del Closed Testing donde está Build 2 |
| **Track Closed Testing (Google Play)** | Canal cerrado donde está Build 2 actualmente con 12 testers | NO LO TOCAMOS — sigue funcionando con Build 2 mientras Internal Testing tiene Build 3 |
| **Track Production (Google Play)** | Canal de producción al público general | Subimos ahí cuando Build 2 apruebe Closed Testing y Build 3 esté validado |

---

## 2. ESTADO ACTUAL VERIFICABLE

```
$ grep "CURRENT_PROJECT_VERSION\|MARKETING_VERSION" ios/AurexApp.xcodeproj/project.pbxproj
CURRENT_PROJECT_VERSION = 17;
MARKETING_VERSION = 1.0;

$ grep "versionCode\|versionName" android/app/build.gradle
versionCode 2
versionName "1.0.1"
```

**Apple Build 17**: en revisión App Store Connect, día 10. Branch `main`, commit `1b319b5`.

**Google Play Build 2**: Closed Testing track activo, día 10 de 14. Mismo binario que Apple Build 17.

---

## 3. INVENTARIO DETALLADO — qué se cambia archivo por archivo

### Item 2 — Bug logout al minimizar la app (iOS + Android)

**Archivo a modificar**: `App.js` (raíz `/Users/fernandomoscon/AurexApp/App.js`)

**Cambio exacto**: agregar imports + listener `AppState` + dispatch `refreshSession`.

**Código nuevo (aprox)**:
```javascript
import { AppState } from 'react-native';
import { useEffect } from 'react';
import { supabase } from './src/lib/supabase';

// Dentro del componente App:
useEffect(() => {
  const subscription = AppState.addEventListener('change', (nextAppState) => {
    if (nextAppState === 'active') {
      supabase.auth.refreshSession().catch(() => { /* silent */ });
    }
  });
  return () => subscription.remove();
}, []);
```

**Por qué soluciona el bug**: cuando la app vuelve a foreground, fuerza renovación de token. Si el token expiró durante el background, refresh recupera sesión sin signOut.

**Tiempo estimado**: 1 hora Code + testing en simulator iOS + emulator Android.

---

### Item 3 — Eliminar `Platform.OS` hardcoded v1.0.0

**Archivo a modificar**: `src/screens/PerfilScreen.js`

**Líneas exactas**: 789 y 851 (verificadas con `grep`).

**Línea 789 actual**: `<Text style={{ fontSize: 13, fontWeight: '700', color: C.text }}>AUREX v1.0.0 ⭐</Text>`

**Cambio**: leer la versión real desde `package.json` o `react-native-device-info` en lugar de hardcodear "v1.0.0".

**Código nuevo (aprox)**:
```javascript
import DeviceInfo from 'react-native-device-info';
// ...
<Text style={{ fontSize: 13, fontWeight: '700', color: C.text }}>
  AUREX v{DeviceInfo.getVersion()} ⭐
</Text>
```

**Por qué importa**: cuando subimos a Build 18 con marketing version 1.0.2, debe decir "v1.0.2" no "v1.0.0".

**Tiempo estimado**: 15 minutos Code (incluye verificar si `react-native-device-info` está instalado o hay que agregarlo).

---

### Item 4 — Faltas de ortografía en onboarding

**Archivo a modificar**: `src/screens/OnboardingScreen.js`

**Acción Code**: leer todo el archivo, identificar errores ortográficos en strings (español + inglés + 6 idiomas si aplican). Corregir.

**Pendiente**: Fernando (o testers) reportaron faltas pero no me las pasaste exactas. Si las tenés identificadas, mandámelas. Sino las busco yo en la lectura.

**Tiempo estimado**: 30 minutos Code (lectura + correcciones, si son <10 errores).

---

### Item 5 — Splash screen interno regenerar sin "INVEST AI"

**Archivos a modificar**:
- `ios/AurexApp/Images.xcassets/AurexHero.imageset/logo.png`
- `ios/AurexApp/Images.xcassets/AurexHero.imageset/logo@2x.png`
- `ios/AurexApp/Images.xcassets/AurexHero.imageset/logo@3x.png`
- (verificar si hay equivalente Android en `android/app/src/main/res/drawable*/`)

**Cambio**: regenerar 3 PNG con el símbolo AUREX + texto "AUREX" PERO **SIN tagline "INVEST AI"** que viola Build 17 metadata segura.

**Acción Code**: usar los logos del Drive externo "AUREX LOGO CON MARCA" (folder ID `1c2l24H49jElD4ZPSsPYzxGMxiu84qLXT` que ya tenemos identificado, set completo profesional sin "INVEST AI") en las 3 dimensiones requeridas (1x, 2x, 3x del original).

**Tiempo estimado**: 1-2 horas Code (descargar + redimensionar + reemplazar + verificar visualmente en simulator).

---

### Item 10 — Sacar `plan_elite_f7` y `plan_elite_f8` del array UI

**Archivo a modificar**: `src/screens/PerfilScreen.js` línea 412

**Código actual**:
```javascript
{[t('plan_elite_f1'), t('plan_elite_f2'), t('plan_elite_f3'), t('plan_elite_f4'), t('plan_elite_f5'), t('plan_elite_f6'), t('plan_elite_f7'), t('plan_elite_f8')].map((f, i) => (
```

**Código nuevo**:
```javascript
{[t('plan_elite_f1'), t('plan_elite_f2'), t('plan_elite_f3'), t('plan_elite_f4'), t('plan_elite_f5'), t('plan_elite_f6')].map((f, i) => (
```

**Cambio adicional opcional** (no bloqueante): dejar las traducciones `plan_elite_f7` y `plan_elite_f8` en `src/lib/i18n.js` para reusarlas en v1.2 cuando implementemos chat + UI keys nativo. **NO borrar las keys** — solo no usarlas en el array.

**Por qué es crítico**: Apple Guideline 3.1.1 requiere que features pagas estén implementadas. Sin chat + API en nativa, mostrarlas como features ELITE de $19.99/mes activa riesgo de rechazo.

**Tiempo estimado**: 5 minutos Code.

---

### Item 1 — Bug Android safe area (header + footer cortados)

**Archivos a modificar** (mucho más extenso que los anteriores):

#### A. `package.json` (raíz)
- Agregar dependencia: `"react-native-safe-area-context": "^4.x"` (versión compatible con tu React Native).
- Ejecutar `npm install` (o `yarn install` si usás yarn).

#### B. `App.js` (raíz)
- Agregar import: `import { SafeAreaProvider } from 'react-native-safe-area-context';`
- Agregar import: `import { StatusBar } from 'react-native';`
- Envolver el JSX root con `<SafeAreaProvider>` afuera de todo.
- Configurar `<StatusBar translucent backgroundColor="transparent" barStyle="light-content" />` (o color navy según tema).

#### C. Todas las screens que usan SafeAreaView (7 archivos confirmados)
Cambiar import en cada uno:

| Archivo | Cambio |
|---|---|
| `src/screens/PerfilScreen.js` | De `import { SafeAreaView } from 'react-native'` a `import { SafeAreaView } from 'react-native-safe-area-context'` |
| `src/screens/PortfolioScreen.js` | Idem |
| `src/screens/WatchlistScreen.js` | Idem |
| `src/screens/SubscriptionScreen.js` | Idem |
| `src/screens/MercadosScreen.js` | Idem |
| `src/screens/AlertasScreen.js` | Idem |
| `src/screens/IAScreen.js` | Idem |

#### D. `android/app/src/main/AndroidManifest.xml`
- Verificar que NO tenga `android:windowFullscreen="true"` (ya verificado, no lo tiene).
- No requiere cambios adicionales.

#### E. iOS build settings
- iOS no requiere cambios para safe area (ya funciona bien con SafeAreaView de react-native nativo).

**Tiempo estimado**: 1-2 días Code (incluye instalar dependencia + cambios en 9 archivos + testing visual real en emulador AVD Android local + verificar que iOS sigue funcionando OK).

---

### CAMBIOS DE VERSIÓN para Build 18 / Build 3

#### iOS — `ios/AurexApp.xcodeproj/project.pbxproj`
- `CURRENT_PROJECT_VERSION = 17` → `18`
- `MARKETING_VERSION = 1.0` → puede mantenerse en `1.0` o subir a `1.0.1` (decisión: bugfix release, mantenemos 1.0 con build 18 — la marketing version solo cambia con feature releases significativas)

#### Android — `android/app/build.gradle`
- `versionCode 2` → `3`
- `versionName "1.0.1"` → `"1.0.2"` (mantener el patrón semantic versioning para bugfix)

---

## 4. PLAN EJECUTIVO iOS — Build 18 → TestFlight Internal

| # | Acción | Quién | Tiempo |
|---|---|---|---|
| 1 | Confirmar branch `dev` de AurexApp activo (`git checkout dev`) | Code | 1 min |
| 2 | Implementar items 2, 3, 4, 5, 10 en sucesión + commit cada uno | Code | ~3-4 hs |
| 3 | Implementar item 1 (Android safe area — sirve también para iOS, no rompe nada) | Code | 1-2 días |
| 4 | Incrementar `CURRENT_PROJECT_VERSION` de 17 a 18 en project.pbxproj | Code | 2 min |
| 5 | Probar build local en simulator iOS (validar visualmente todos los fixes) | Code | 30 min |
| 6 | Abrir Xcode, seleccionar "Generic iOS Device" (o "Any iOS Device") | Code (con Xcode local Fernando) | 5 min |
| 7 | Product → Archive (compila Build 18 firmado) | Xcode | 5-10 min compilación |
| 8 | En Xcode Organizer → Distribute App → App Store Connect → Upload | Xcode | 5 min upload |
| 9 | App Store Connect → TestFlight → Internal Testing → activar Build 18 para grupo de testers internos | Code (vía Xcode helper o Fernando vía web) | 2 min |
| 10 | Fernando recibe notificación TestFlight en iPhone | Apple | inmediato |
| 11 | Fernando instala Build 18 vía TestFlight app | Fernando | 5 min |
| 12 | Fernando valida los 6 fixes en device real (Bug 1, Bug 2, version, ortografía, splash, ELITE features) | Fernando | 15-30 min |
| 13 | Si OK: Build 18 queda esperando en TestFlight, NO Submit for Review | — | — |
| 14 | Cuando Apple apruebe Build 17: App Store Connect → Submit for Review usando Build 18 | Fernando con OK Code | 10 min |

---

## 5. PLAN EJECUTIVO Android — Build 3 → Internal Testing track

| # | Acción | Quién | Tiempo |
|---|---|---|---|
| 1 | Confirmar branch `dev` activo + cambios items 2, 3, 4, 5, 10, 1 ya commiteados | Code | 1 min |
| 2 | Incrementar `versionCode` de 2 a 3 + `versionName` de "1.0.1" a "1.0.2" en `android/app/build.gradle` | Code | 2 min |
| 3 | Probar build local en emulador AVD Android (Code abre Android Studio + corre emulador del Mac Fernando) | Code | 30 min |
| 4 | Validar visualmente Bug 1 (header + footer NO cortados) | Code | 5 min |
| 5 | Compilar AAB release: `cd android && ./gradlew bundleRelease` | Code (Bash en Mac Fernando) | 10-15 min compilación |
| 6 | Output: `android/app/build/outputs/bundle/release/app-release.aab` | — | — |
| 7 | Google Play Console → AurexApp → Probar y distribuir → Internal Testing → Crear nueva versión → upload AAB | Code (con autorización Fernando para abrir Play Console) o Fernando | 5 min |
| 8 | Agregar email Fernando + 1-2 testers Android al Internal Testing list | Fernando | 2 min |
| 9 | Activar release en Internal Testing (queda activo inmediatamente, sin review Google) | Code | 1 min |
| 10 | Testers reciben link → tap → "Become a tester" → app actualiza vía Play Store | Testers Android | 5 min |
| 11 | Validan en device real | Testers | 15-30 min |
| 12 | Si OK: Build 3 queda en Internal Testing track, **separado del Closed Testing** donde sigue Build 2 | — | — |
| 13 | Cuando Build 2 apruebe Closed Testing y vaya a Producción: Promote Build 3 a Producción | Fernando con OK Code | 10 min |

---

## 6. ROL DE CADA PARTE

### Code (yo)
- Ejecuta todos los cambios de código en branch `dev`.
- Compila Build 18 (Xcode archive desde Mac Fernando) y Build 3 (Gradle bundle).
- Prueba localmente en simulator iOS + emulador AVD Android Mac.
- Sube binarios a TestFlight Internal y Internal Testing track Google Play.
- Documenta todo en `docs/` con commits trazables.

### Fernando
- Aprueba este plan (paso pendiente AHORA).
- Recibe notificación TestFlight en iPhone → instala Build 18 → valida 6 fixes.
- Decide si suma 1-2 testers Android al Internal Testing track (sugerencia: dale acceso a kellerlucasignacio@gmail.com o gusroma355@gmail.com que ya están confirmados activos).
- Cuando Apple apruebe Build 17: autoriza Submit for Review con Build 18.
- Cuando Google apruebe Build 2 a Producción: autoriza promote Build 3 a Producción.

### Escritorio
- Sin rol técnico (no tiene acceso filesystem ni emulador).
- Puede aportar revisión narrativa o estratégica si se le pide.

---

## 7. ESTIMACIÓN REALISTA DE TIEMPO

| Fase | Tiempo |
|---|---|
| Código de los items 2, 3, 4, 5, 10 | ~3-4 hs Code (1 jornada) |
| Código del item 1 (Android safe area) | 1-2 días Code |
| Compilar Build 18 + Build 3 + uploads | ~1-2 hs |
| Validación local Code (simulator iOS + emulador AVD) | ~1 hr |
| Validación Fernando en TestFlight + testers Android Internal Testing | depende disponibilidad Fernando + testers |
| **Total para tener Build 18 + Build 3 listos en sus tracks de testing** | **3-4 días desde OK** |

**Push notifications NO entran en este Build 18** — ese trabajo (1 semana real) va en Build 19 / Build 4 después de validar este primero.

---

## 8. RIESGOS

| Riesgo | Probabilidad | Mitigación |
|---|---|---|
| Tocar `main` por error → invalida Build 17 en revisión | Baja | Disciplina absoluta — `git branch` antes de cada commit. Code verifica visualmente antes de toda operación |
| Build 18 con bugs nuevos no detectados localmente | Media | Testing local Code + validación tuya en TestFlight + 1-2 testers Android antes de submit producción |
| `react-native-safe-area-context` rompe iOS al cambiar imports | Baja | Testing en simulator iOS DESPUÉS de cada cambio de import |
| Compilación Build 18 falla en Xcode (signing, certificates) | Media | Si pasa, Code te avisa y guiamos juntos. Provisioning ya está OK (~/Downloads/AUREX_App_Store_Distribution.mobileprovision) |
| Compilación Build 3 falla en Gradle (Android signing key) | Baja | El keystore Android ya está configurado en proyecto, ya generamos Build 2 sin problema |
| Apple rechaza Build 17 mientras estamos preparando Build 18 | Media | NO afecta el trabajo en `dev`. Cuando rechacen, se ajusta lo que pidan + se sube Build 18 que ya tiene los fixes adicionales |
| Push notifications no entran en este Build 18 | N/A | DECISIÓN consciente — push va en Build 19/4 separado |

---

## 9. PUNTO DE NO RETORNO

**Yo (Code) NO ejecuto ningún paso hasta tu OK explícito.**

Pasos no-destructivos (puedo hacer si autorizas):
- Items 2, 3, 4, 5, 10 en `dev` (pequeños fixes, fácil revertir).
- Item 1 en `dev`.
- Compilar Build 18 / Build 3 (genera archivos pero no sube nada).

**Pasos destructivos** (requieren OK explícito tuyo en cada uno):
- Subir Build 18 a TestFlight Internal (cambia visible para vos como tester).
- Subir Build 3 a Internal Testing track Google Play (cambia visible para vos + testers que sumes).
- Submit Build 18 a App Store Production (NO hasta aprobación Build 17).
- Promote Build 3 a Producción (NO hasta aprobación Build 2 closed testing).

---

## 10. PREGUNTA DE APROBACIÓN

Cuando hayas leído todo, decime:

1. ¿Aprobás arrancar items 2, 3, 4, 5, 10 + item 1 en branch `dev`? (No-destructivo, fácil revertir).
2. ¿Algún ítem que querés modificar, agregar o sacar?
3. ¿Tenés identificadas las faltas de ortografía exactas del onboarding o las identifico yo en la lectura?

---

*PLAN_BUILD_18_iOS_BUILD_3_ANDROID.md — generado por Code el 3-may-2026 a pedido de Fernando. Pendiente aprobación.*
