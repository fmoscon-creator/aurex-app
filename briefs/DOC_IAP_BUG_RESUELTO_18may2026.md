# DOCUMENTO TÉCNICO — BUG IAP ANDROID RESUELTO — BUILD 36

**AUREX — 18 de mayo de 2026**

---

## EL BUG

**El botón de compra de suscripciones (path PerfilScreen → Plan Actual → QUIERO PRO / QUIERO ELITE) nunca funcionó en ninguna versión anterior de AUREX Android.** El bug estuvo presente desde la integración inicial de RevenueCat: ese path siempre llamaba a `Purchases.purchaseProduct()` — API deprecada sin `offerToken` obligatorio — y Google Play lo rechazaba con "product not available for purchase". El bug quedó visible recién con Build 33 (producción, 16-may-2026) porque hasta entonces ese path no había sido probado por usuarios o testers reales que tocaran ese botón específico. **Build 36 (18-may-2026) es el primer build donde la compra desde ese path funciona correctamente.**

## CAMINO REAL DEL USUARIO QUE DISPARABA EL BUG

Camino **confirmado por reproducción real** en Samsung con cuenta `fmoscon@gmail.com` (18-may 17:28 AR):

1. Usuario entra al **tab Perfil** (bottom navigation).
2. Despliega el sub-bloque **'b2' Plan Actual**.
3. Toca el botón **"QUIERO PRO"** o **"QUIERO ELITE"** (mensual o anual).
4. **En Build 33 y anteriores**: ese botón ejecutaba directamente `Purchases.purchaseProduct('com.fernandomoscon.aurex.elite.monthly2', ...)` (u otro `productId` hardcodeado) — API deprecada de RevenueCat (pre-v4) que **no entrega el `offerToken` obligatorio** que Google Play Billing Library v7+ requiere para suscripciones. Google Play rechazaba la llamada inmediatamente con "product not available for purchase".
5. **En Build 36 (fix aplicado)**: el botón ahora hace `navigation.navigate('Subscription')` → se abre `SubscriptionScreen`.
6. En `SubscriptionScreen` el usuario toca **"QUIERO ELITE MENSUAL"** → `Purchases.purchasePackage(pkg)` con `offerToken` completo del offering RC → Google Play acepta → muestra hoja de pago "TARJETA DE PRUEBA / SUSCRIBIRSE" → al confirmar: **"SE REALIZÓ CON ÉXITO EL PAGO"** → app: **"LISTO — TU PLAN fue activado"**.

## CAUSA RAÍZ TÉCNICA CONFIRMADA

`PerfilScreen.js`, case `'b2'`, en el código pre-fix (Build 35) — **líneas 459 (botón PRO) y 501 (botón ELITE)**:

- Botón PRO: `onPress` ejecutaba `Purchases.purchaseProduct('com.fernandomoscon.aurex.pro.monthly', ...)`
- Botón ELITE: `onPress` ejecutaba `Purchases.purchaseProduct('com.fernandomoscon.aurex.elite.monthly2', ...)`

La función `purchaseProduct()` es la API vieja de RevenueCat (pre-v4). A partir de Google Play Billing Library v7, las suscripciones requieren un `offerToken` que viene dentro del objeto `Package` de RevenueCat — `purchaseProduct()` no lo incluye. La llamada llegaba a Google Play mal formada y era rechazada antes de mostrar la hoja de pago.

## FIXES APLICADOS EN BUILD 36

Commit `66662cd` (repo privado `~/AurexApp`, 18-may-2026 17:13 AR).

### Fix 1 — PRINCIPAL
`PerfilScreen.js` líneas 459 y 501 (Build 35 pre-fix) → **líneas 455 y 492 (Build 36 post-fix)**: se eliminó `purchaseProduct()` en ambos botones (PRO y ELITE dentro de `case 'b2'`). Se reemplazó por `navigation.navigate('Subscription')`. Ahora cuando el usuario toca "QUIERO PRO" o "QUIERO ELITE" desde Perfil, la app lo redirige a `SubscriptionScreen` donde la compra se procesa con `Purchases.purchasePackage(pkg)` — API moderna que incluye el `offerToken` completo. **Este es el fix que resuelve el bug**, confirmado en reproducción real.

### Fix 2 — SECUNDARIO
`PerfilScreen.js`, función `deleteAccount()`: se corrigió el orden de operaciones IAP-6.

- **Antes**: `Alert.alert(...)` PRIMERO → `Purchases.logOut()` → `supabase.auth.signOut()`.
- **Después (Build 36)**: `Purchases.logOut()` PRIMERO → `supabase.auth.signOut()` → `Alert.alert(...)` al usuario.

No es causa del bug — es higiene de orden de operaciones.

### Fix 3 — HIGIENE
`SubscriptionScreen.js` L101-115: se revirtió un Alert que mostraba detalles técnicos del error (`code`, `readableErrorCode`, `userCancelled`, `underlyingErrorMessage`, `message`) cuando la compra fallaba. Se había agregado en Build 35 con propósito DIAGNÓSTICO (gracias a esos detalles se identificó `PURCHASE_NOT_ALLOWED_ERROR`).

**El Alert estaba dentro del bloque `catch(e)` — solo se disparaba DESPUÉS de un fallo. No interrumpía un flujo de compra exitoso. No causaba el bug.** Se revierte al Alert simple porque mensajes técnicos no deben llegar a usuario final en producción.

### Fix 4 — COMPILACIÓN
Se compiló con `./gradlew clean` antes de `./gradlew bundleRelease` para garantizar un rebuild completamente limpio sin residuos de compilaciones anteriores. **Buena práctica obligatoria** en builds de producción de ahora en adelante.

### Fix 5 — VERSION BUMP
`android/app/build.gradle`: `versionCode 35→36`, `versionName "1.0.35"→"1.0.36"`. Obligatorio para que Play Store acepte el AAB.

## POR QUÉ SubscriptionScreen NO TENÍA EL BUG

`SubscriptionScreen` usa la función `Purchases.purchasePackage(pkg)` donde `pkg` es un objeto `Package` completo obtenido de `Purchases.getOfferings()`. Ese objeto incluye el `offerToken`. Por eso ese path siempre funcionó — **el bug solo existía en el path PerfilScreen → botones de compra directa con `purchaseProduct`**. El usuario que entrara directamente por `SubscriptionScreen` nunca veía el bug; el usuario que entrara por `PerfilScreen` nunca podía comprar.

## RESULTADO DE LA PRUEBA REAL

- **Dispositivo:** Samsung Galaxy Z Flip (cuenta `fmoscon@gmail.com`, license tester).
- **Build:** 1.0.36 — publicado en Internal Testing 18-may 17:17 AR — **test real ejecutado 18-may 17:28–17:33 AR**.
- **Flujo confirmado:** PerfilScreen → Plan actual → tap "QUIERO ELITE" (1er tap, redirige) → SubscriptionScreen "Elegir tu plan" → tap "QUIERO ELITE MENSUAL" (2do tap) → Google Play muestra hoja "AUREX ELITE Mensual US$ 19,99/m / TARJETA DE PRUEBA / Suscribirse" → tap SUSCRIBIRSE → Google Play: "SE REALIZÓ CON ÉXITO EL PAGO" → app muestra: "LISTO — TU PLAN fue activado".
- **Capturas (5):** imágenes 1-5 en `~/Downloads/[1-5].HEIC` documentando paso a paso la secuencia (timestamps 17:28 / 17:29 / 17:32 / 17:32 / 17:33).
- **Resultado:** BUG CERRADO. **Primer build de AUREX Android donde el path PerfilScreen → compra funciona desde el día 1 de la integración de RevenueCat.**

## ESTADO ACTUAL ANDROID

Build 36 (1.0.36) enviado a revisión de Google Play para **Producción** el 18-may-2026. Build 33 sigue activo en Producción hasta aprobación automática de Google (estimado 2-24 horas). Una vez aprobado, Build 36 reemplaza al 33 automáticamente sin intervención.

## ESTADO iOS

Build 17 en revisión de Apple desde el **24-abril-2026** (24+ días en queue). Manual Release activado — no se publica automáticamente aunque Apple apruebe. Los mismos fixes de `purchaseProduct` aplicados en Android **YA ESTÁN en el código iOS** (mismo codebase React Native, los archivos `PerfilScreen.js` y `SubscriptionScreen.js` se comparten entre Android y iOS).

**Matiz importante**: el comportamiento del bug en Apple StoreKit puede ser distinto al de Google Play Billing — el código está alineado, pero la validación funcional en iOS requiere reproducción real con TestFlight cuando Build 25 se compile. Build 25 iOS se compila una vez que Build 36 Android quede activo en Producción.

## ARCHIVOS MODIFICADOS (Build 35 → Build 36)

| Archivo | Cambio | Línea Build 35 | Línea Build 36 |
|---|---|---|---|
| `PerfilScreen.js` botón PRO case 'b2' | `purchaseProduct` → `navigate('Subscription')` | L459 | L455 |
| `PerfilScreen.js` botón ELITE case 'b2' | `purchaseProduct` → `navigate('Subscription')` | L501 | L492 |
| `PerfilScreen.js` función `deleteAccount()` | Orden IAP-6 corregido | L265-269 | L265-269 |
| `SubscriptionScreen.js` | Alert debug temporal revertido a Alert simple | L101-115 | L101-105 |
| `android/app/build.gradle` | versionCode 35→36 + versionName 1.0.35→1.0.36 | L87-88 | L87-88 |

## SNAPSHOTS PÚBLICOS DEL CÓDIGO

- **Build 35 (pre-fix):** `https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/iap_audit_18may/code_snapshot_build35/`
- **Build 36 (post-fix):** `https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/iap_audit_18may/code_snapshot_build36/`

## COMMITS DE REFERENCIA

- `66662cd` (repo privado `~/AurexApp`, 18-may 17:13 AR) — código del fix.
- `647ff7a` (repo público `aurex-app`, 18-may) — snapshot Build 36 para audit.

---

*Documento generado en colaboración Code (Claude Code) + Escritorio (Claude Desktop) — validado con código real, capturas de pantalla y reproducción en dispositivo físico antes de publicar.*
