# PLAN — Build 3 Android (PRIORIDAD URGENTE) + Build 18 iOS (después)

**Generado por Code el 4-may-2026.** Reemplaza el plan anterior que tenía prioridad invertida.

**Reconocimiento de error**: Code y Escritorio priorizamos Apple Build 17/18 cuando la urgencia real es Android Build 3. Apple no tiene deadline predecible (lleva 11 días sin responder, puede tardar otra semana o rechazar). **Android tiene deadline real del 9-may** (vencimiento Closed Testing día 14 de 14). Si Google rechaza por features prometidas no funcionando (push), perdemos tiempo + tenemos que corregir + esperar.

**PRIORIDAD #1: Build 3 Android con push REAL funcionando antes del 9-may.**
**PRIORIDAD #2: Build 18 iOS (puede esperar — Apple sin deadline).**

---

## CALENDARIO HASTA 9-MAY

Fecha actual: 4-may-2026. Quedan 5 días para vencimiento Closed Testing.

| Día | Trabajo | Quién | Hs estimadas |
|---|---|---|---|
| **Domingo 4-may** (hoy) | Items 2, 3, 4, 5, 10, 11 (compartidos rápidos) en branch `dev` | Code | 4-5 hs |
| Domingo 4-may | Item 1 (Android safe area) en branch `dev` | Code | 4-6 hs |
| **Lunes 5-may** | Item 6 push Android FCM — instalación + setup + permission UI + token capture + tabla Supabase | Code + Fernando 30 min para FCM Firebase setup | 5-6 hs Code |
| Lunes 5-may | Endpoint backend send push + integración con crons existentes | Code | 3-4 hs |
| **Martes 6-may** | Testing local Android emulator AVD: validar todos los items + push funcionando | Code | 2-3 hs |
| Martes 6-may | Cambiar versionCode 2→3 + versionName "1.0.1"→"1.0.2" en build.gradle | Code | 5 min |
| Martes 6-may | Compilar AAB Build 3: `./gradlew bundleRelease` | Code | 15 min |
| Martes 6-may | Upload AAB a Internal Testing track Google Play Console | Fernando con ayuda Code | 10 min |
| **Miércoles 7-may** | 1-2 testers Android instalan Build 3 vía Internal Testing link | Testers | 30 min |
| Miércoles 7-may | Testers validan en device real: bugs corregidos + push funcionando con app cerrada | Testers | 1-2 hs |
| **Jueves 8-may** | Buffer para ajustes si testers reportan algún bug residual | Code | 2-4 hs |
| **Viernes 9-may** | Closed Testing día 14 cumplido. Botón "Solicitar acceso a producción" se habilita | Google Play | — |
| Viernes 9-may | Fernando completa formulario producción + envía a Google review | Fernando | 30 min |

**Total trabajo Code hasta 9-may: ~20 hs distribuidas en 4-5 días reales.**

---

## CUADRO MAESTRO — TODOS los cambios DETALLADOS para Build 3 Android

### Tabla A — Items 1 al 11 con archivo + cambio exacto

| # | Item | Archivo | Línea | Cambio | Tiempo |
|---|---|---|---|---|---|
| **1** | Android safe area | `package.json` | dependencies | Agregar `"react-native-safe-area-context": "^4.x"` + `npm install` | 5 min |
| 1 | Idem | `App.js` raíz | top + JSX root | Import `SafeAreaProvider` + envolver root + `<StatusBar translucent backgroundColor="transparent" barStyle="light-content" />` | 30 min |
| 1 | Idem | `src/screens/PerfilScreen.js` | import top | Cambiar `import { SafeAreaView } from 'react-native'` → `'react-native-safe-area-context'` | 5 min |
| 1 | Idem | `src/screens/PortfolioScreen.js` | Idem | Idem | 5 min |
| 1 | Idem | `src/screens/WatchlistScreen.js` | Idem | Idem | 5 min |
| 1 | Idem | `src/screens/SubscriptionScreen.js` | Idem | Idem | 5 min |
| 1 | Idem | `src/screens/MercadosScreen.js` | Idem | Idem | 5 min |
| 1 | Idem | `src/screens/AlertasScreen.js` | Idem | Idem | 5 min |
| 1 | Idem | `src/screens/IAScreen.js` | Idem | Idem | 5 min |
| 1 | Testing visual emulator AVD Android | — | — | Verificar header + footer NO cortados en emulador | 30 min |
| **Subtotal Item 1** | | | | | **~2 hs** (no 4-6 como dije antes — verificable subtarea por subtarea) |
| **2** | Bug logout al minimizar | `App.js` raíz | top imports + dentro App | Imports + `useEffect()` con `AppState.addEventListener` que llame `supabase.auth.refreshSession()` | 30 min |
| **3** | Eliminar v1.0.0 hardcoded | `src/screens/PerfilScreen.js` | 789 | `<Text>AUREX v1.0.0 ⭐</Text>` → `<Text>AUREX v{DeviceInfo.getVersion()} ⭐</Text>` | 15 min |
| **4** | Faltas ortografía onboarding | `src/screens/OnboardingScreen.js` | TBD | Code lee + corrige errores 8 idiomas | 30 min |
| **5** | Splash Android sin "INVEST AI" | `android/app/src/main/res/drawable*/` | TBD | Verificar al arrancar si existe equivalente Android del AurexHero. Si existe, reemplazar por logo limpio. Si no existe, no hacer nada | 30 min |
| **10** | Sacar f7+f8 array ELITE | `src/screens/PerfilScreen.js` | 412 | Array de 8 a 6 features: sacar `t('plan_elite_f7')` y `t('plan_elite_f8')` | 5 min |
| **11** | Nota "Push coming soon" → CAMBIAR a comportamiento real con push activo | `src/screens/AlertasScreen.js` | TBD | Si push está implementado en Build 3, este item ya no es necesario. Si push se demora: agregar nota provisional. Si push está OK: nada que hacer | 0-30 min |
| **6** | Push notifications Android FCM (REAL) | Ver Tabla F | Ver Tabla F | Ver Tabla F | **~5-6 hs Code + 30 min Fernando** |

### Tabla B — Cambios de versión Android

| Archivo | Línea | Cambio |
|---|---|---|
| `android/app/build.gradle` | versionCode | `versionCode 2` → **`versionCode 3`** |
| Idem | versionName | `versionName "1.0.1"` → **`versionName "1.0.2"`** |

### Tabla C — Comandos de compilación Android

| Paso | Comando |
|---|---|
| Limpiar cache | `cd ~/AurexApp/android && ./gradlew clean` |
| Test emulator local | `cd ~/AurexApp && npx react-native run-android` |
| Compilar AAB Release | `cd ~/AurexApp/android && ./gradlew bundleRelease` |
| Output | `~/AurexApp/android/app/build/outputs/bundle/release/app-release.aab` |
| Upload | Google Play Console → AurexApp → Probar y distribuir → Internal Testing → Crear nueva versión → upload AAB |
| Activar | Google Play Console → Activar release Internal Testing (inmediato, sin review) |

### Tabla D — Archivos tocados (resumen Android)

| Categoría | Archivos | Nota |
|---|---|---|
| Compartidos React Native | ~12 archivos `App.js` + 7 screens + i18n.js + package.json + 2 más | Mismos cambios sirven para iOS también cuando armemos Build 18 |
| Específico Android | `android/app/build.gradle` (versión) + `android/app/google-services.json` (FCM) + drawables splash si aplica | Solo Android |
| Backend (compartido) | `aurex-backend/server.js` + nueva tabla Supabase | Sirve a iOS también cuando se implemente APNS |

### Tabla E — Detalle del PUSH Android FCM (item 6) — desglose hora por hora

| Sub-paso | Acción | Quién | Tiempo |
|---|---|---|---|
| 6.1 | `npm install expo-notifications` | Code | 5 min |
| 6.2 | Fernando crea proyecto Firebase + configura Android app + descarga `google-services.json` | Fernando con guía Code | 30 min |
| 6.3 | Code pega `google-services.json` en `android/app/` + configura `android/app/build.gradle` y `android/build.gradle` (Firebase plugin) | Code | 15 min |
| 6.4 | Agregar permission UI en `App.js` o screen onboarding: `Notifications.requestPermissionsAsync()` | Code | 30 min |
| 6.5 | Capturar push token: `Notifications.getExpoPushTokenAsync()` o equivalente FCM directo | Code | 15 min |
| 6.6 | Crear tabla Supabase `push_tokens` (id uuid, user_id, token text, platform text, created_at timestamp) | Code | 10 min |
| 6.7 | Endpoint backend `POST /api/push-tokens/save` para guardar token al login/signup | Code | 30 min |
| 6.8 | Función backend `sendPushNotification(user_id, title, body, data)` usando Expo Push API | Code | 1 hr |
| 6.9 | Integrar `sendPushNotification()` con crons existentes (alertas IA Alta Convicción, Pulse cambios zona, eventos FOMC/CPI) | Code | 1.5 hr |
| 6.10 | Testing local en Android emulator + 1 device real: validar push llega con app cerrada | Code + Fernando | 1 hr |
| **TOTAL Item 6** | | | **~5-6 hs Code + 30 min Fernando** |

### Tabla F — Suma total Build 3 Android

| Concepto | Tiempo |
|---|---|
| Items compartidos (2+3+4+5+10+11) | ~2 hs |
| Item 1 Android safe area | ~2 hs |
| Item 6 Push FCM real | ~5-6 hs Code + 30 min Fernando |
| Compilación + upload Internal Testing | 30 min |
| Validación local Code + testers reales | 1-2 hs |
| **TOTAL Build 3 Android** | **~12-14 hs Code = 2-3 días reales** |

---

## DESPUÉS DE BUILD 3 — BUILD 18 iOS (no urgente)

Cuando Build 3 Android esté validado en Internal Testing, arrancamos Build 18 iOS. Lo que falta hacer (90% del trabajo ya está hecho en `dev` para Android):

### Tabla G — Cambios ESPECÍFICOS iOS (extra a Build 3)

| # | Item | Archivo | Cambio | Tiempo |
|---|---|---|---|---|
| 5-iOS | Splash sin "INVEST AI" | `ios/AurexApp/Images.xcassets/AurexHero.imageset/logo.png` + `logo@2x.png` + `logo@3x.png` | Reemplazar 3 PNG por logo limpio | 30 min |
| Cambio versión | iOS Build | `ios/AurexApp.xcodeproj/project.pbxproj` | `CURRENT_PROJECT_VERSION = 17` → **`18`** | 2 min |
| Idem | Marketing | Idem | `MARKETING_VERSION = 1.0` → **`1.0`** (sin cambio, bugfix) | — |
| 6-iOS | APNS certificate Apple | Apple Developer Console | Fernando crea APNS Auth Key + descarga `.p8` | 15 min Fernando |
| 6-iOS | Configurar APNS en backend | `aurex-backend/server.js` | Agregar lógica APNS en función `sendPushNotification()` (ya creada en Build 3 para FCM) | 30 min Code |
| 6-iOS | Testing local en iOS Simulator | — | Validar push llega en iPhone real con app cerrada | 30 min |
| Compilar Build 18 | Xcode | Manual | Archive + Upload a TestFlight Internal Testing | 30 min Code + Xcode |

**Total Build 18 iOS extra**: ~2-3 hs Code + ~45 min Fernando.

---

## PUNTO DE NO RETORNO

### Pasos no-destructivos (con tu OK arranco hoy 4-may)

1. Items 2, 3, 4, 5 (Android), 10, 11 en branch `dev`.
2. Item 1 Android safe area en `dev`.
3. Item 6 Push Android FCM en `dev` (requiere intervención Fernando para Firebase setup ~30 min).
4. Cambio versionCode 2→3 + versionName "1.0.1"→"1.0.2".
5. Compilar AAB localmente (genera archivo, no sube).

### Pasos destructivos (cada uno requiere OK adicional)

1. Subir AAB Build 3 a Internal Testing track Google Play.
2. Promote Build 3 a Producción (NO hasta que Google apruebe Closed Testing producción).

---

## PREGUNTAS DE APROBACIÓN

1. ¿Aprobás arrancar **HOY 4-may** los items compartidos (2, 3, 4, 10) + item 1 (safe area Android) + item 11 (sólo si push se demora más allá del 7-may)?

2. ¿Confirmás cronograma Build 3 listo en Internal Testing **antes del jueves 8-may**, dejando 1-2 días buffer para ajustes antes del 9-may?

3. ¿Cuándo podés hacer el **setup Firebase Cloud Messaging (~30 min tuyos)** para que Code arranque item 6 push? Idealmente lunes 5-may temprano.

4. ¿Tenés identificadas las **faltas de ortografía exactas** del onboarding o las identifico yo en lectura?

---

*PLAN_BUILD_3_ANDROID_PRIORIDAD.md — generado por Code el 4-may-2026 con prioridad CORREGIDA (Android urgente por deadline 9-may, iOS después). Pendiente aprobación Fernando.*
