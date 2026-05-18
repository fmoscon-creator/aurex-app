# Snapshot Build 36 — código DESPUÉS del fix

Snapshot del repo privado AurexApp commit `66662cd` (18-may-2026 17:13 AR).
Equivale al código que se compiló en el AAB Build 36 v1.0.36 subido a Internal Testing.

**Diferencia vs `code_snapshot_build35/` (snapshot del código ANTES):**
- `code_snapshot_build35/` debería tener el código del Build 35 ORIGINAL pero está
  sincronizado al Build 36 (Code re-copió después del commit). Para ver el código
  Build 35 ORIGINAL usar git en el repo público o en el privado: `git checkout ac46f8e`.
- `code_snapshot_build36/` (esta carpeta) tiene el código Build 36 actual confirmado.

**Diff entre Build 35 → Build 36 (5 cambios):**
1. `android/app/build.gradle`: versionCode 35→36 + versionName "1.0.35"→"1.0.36"
2. `SubscriptionScreen.js` L101-115: revertido Alert IAP debug temporal Build 35
3. `PerfilScreen.js` L265-269 (deleteAccount): orden IAP-6 corregido logOut→signOut→Alert
4. `PerfilScreen.js` L455 (botón PRO en case 'b2'): `purchaseProduct(productId)` → `navigation.navigate('Subscription')`
5. `PerfilScreen.js` L492 (botón ELITE en case 'b2'): `purchaseProduct(productId)` → `navigation.navigate('Subscription')`

**Compilado con:** `./gradlew clean` + `./gradlew bundleRelease` (rebuild limpio obligatorio).

**Test resultado:** compra ELITE mensual EXITOSA en Samsung con cuenta fmoscon@gmail.com
(18-may 17:30 AR). Google Play "SE REALIZÓ CON ÉXITO EL PAGO" + tilde azul, app
"LISTO TU PLAN fue activado", entitlement `elite` activo confirmado.
