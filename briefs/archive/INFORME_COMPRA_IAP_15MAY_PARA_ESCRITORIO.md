# INFORME COMPRA IAP — ANALISIS COMPLETO 15-may-2026 02:00 AR

Para revision independiente por Escritorio (Claude Desktop + Chrome).

---

## 1. RESUMEN DEL PROBLEMA

Al tocar comprar PRO Mensual / PRO Anual / ELITE Mensual / ELITE Anual en AUREX Android Build 21 (v1.0.21), aparece un Alert con texto literal: **"Error / The Product is not available for Purchase"**. Reproducible 100% en los 4 planes con multiples cuentas y configuraciones probadas.

El usuario ve un mensaje generico de Alert, pero NO se abre el bottom sheet de compra de Google Play.

---

## 2. ESTADO INFRA AL MOMENTO DEL TEST FINAL

### App
- **AUREX Android Build 21 (v1.0.21, versionCode 21)**, instalada desde Play Store en Samsung R5CR92ADDNW.
- App firmada por Google Play con **App Signing Key** SHA-1 `54:DF:D1:42:BD:1F:49:1C:A0:ED:D5:30:A4:AD:FE:60:A5:98:60:B7` (NO la upload key local).
- Track activo: Prueba Interna en Play Console, publicado 14-may 22:35 AR.
- Build 17 (v1.0.17) en Produccion publica (separado del track).

### Cuenta Play Store en el Samsung
- Email: `fmoscon@gmail.com` (Fernando, owner de la cuenta developer de Google Play donde esta AUREX)
- Esta cuenta fue agregada hoy a la lista "AUREX Testers" en el track Prueba Interna (4 emails en total: fmoscon + aurextester12 + aurextester1 + aurextest2).
- Esta cuenta fue agregada hoy a la lista License Testing en Configuracion del Play Console.
- Cache de Google Play Store + Servicios de Google Play LIMPIADA + telefono REINICIADO antes del ultimo test.

### Productos Play Console — Monetizar → Suscripciones
**Verificado por Escritorio via Chrome (27 pasos completados):**

| Producto | Base Plan | Estado | Paises | Ofertas |
|----------|-----------|--------|--------|---------|
| `com.fernandomoscon.aurex.pro.monthly` | `monthly-pro` | Activo | 174 | Solo base plan |
| `com.fernandomoscon.aurex.pro.annual` | `annual-pro` | Activo | 174 | Solo base plan |
| `com.fernandomoscon.aurex.elite.monthly2` | `monthly-elite` | Activo | 174 | Solo base plan |
| `com.fernandomoscon.aurex.elite.annual` | `annual-elite` | Activo | 174 | Solo base plan |

Play Console NO muestra un campo "Estado del producto" separado del base plan — solo el del base plan, todos con tilde verde "Activo".

### Play App Signing
**Verificado por Escritorio:**
- Play App Signing ACTIVO.
- App Signing Key SHA-1: `54:DF:D1:42:BD:1F:49:1C:A0:ED:D5:30:A4:AD:FE:60:A5:98:60:B7`
- Upload Key SHA-1: `05:E5:00:49:51:A0:4E:0E:11:54:0B:52:02:E6:7C:14:D8:E5:F0:E9`
- Las dos son distintas (confirmado por Escritorio).

### RevenueCat
- Offering activo: `aurex_default`
- 4 productos Android linkeados al offering (Escritorio confirmo el toast "Offering AUREX PLANS was updated" el 14-may 22:48).
- API Key Android configurada en App.js correctamente (la conexion responde 304 → cache hit OK)
- En el cliente, el usuario aparece como **Anonymous** en RevenueCat: `$RCAnonymousID:583810b271f44bc1a2ff8336cbccce66`. Esto significa que `Purchases.logIn(userId)` no se esta llamando despues del login Supabase. RevenueCat permite compras anonimas, no es bloqueante, pero podria ser relevante para tracking.

### Region detectada en runtime
- Storefront cache: `AR`
- Billing connected with country code: `AR`
- Precios en logs: `formattedPrice='US$ 19,99'` (priceCurrencyCode `USD`)

---

## 3. TIMELINE DEL ULTIMO TEST (15-may 01:52 AR)

App abierta fresh (PID 11850). Cuenta Play Store: fmoscon@gmail.com. Cache limpiada, telefono reiniciado.

### 01:52:24.461 — Arranque app
Warning sin consecuencia: `java.lang.NoSuchMethodException: i3.a.newBuilder [class android.content.Context]` (parece warning de algun decompiler interno, no afecta runtime).

### 01:52:24.514 - 01:52:24.517 — Warnings de UI managers
`Could not find generated setter for class com.revenuecat.purchases.react.ui.CustomerCenterViewManager` (y PaywallViewManager, PaywallFooterViewManager). Estas son advertencias de la libreria RevenueCat React Native que esperaria que el host registre algunos view managers — son advertencias, NO errores, y NO bloquean el flow.

### 01:52:24.597 — RevenueCat config OK
```
[RevenueCat] ℹ️ Purchases configured with response verification: DISABLED
```
Nota: "response verification DISABLED" significa que el cliente NO valida criptograficamente la respuesta de Billing. Es un setting cliente-side, no relevante para el bug.

### 01:52:24.635 — Finsky asocia account al package
```
Finsky: [293] com.aurexapp: Account determined from installer data - [_BZ0SJmCKGZv-8u_x6LCFaCHQNUlnRglqp2yEdDAfHA]
Finsky: [293] Billing preferred account via installer for com.aurexapp: [_BZ0SJmCKGZv-8u_x6LCFaCHQNUlnRglqp2yEdDAfHA]
```
**Interpretacion**: Google Play (Finsky) detecta que el package `com.aurexapp` tiene un "Billing preferred account" asignado via installer. Ese hash `_BZ0SJmCKGZv-8u_x6LCFaCHQNUlnRglqp2yEdDAfHA` representa la cuenta de Google que se uso al **descargar/instalar** la app desde Play Store. Si esa cuenta NO coincide con la cuenta logueada al momento de la compra, Billing puede rechazar.

### 01:52:24.665 — Info no relevante
```
Finsky: [274] User is not an active Play Pass subscriber
```

### 01:52:24.692-25.589 — RevenueCat conecta y carga offerings
```
[RevenueCat] ℹ️ Billing Service Setup finished
[RevenueCat] ℹ️ Querying purchases  (x2)
[RevenueCat] ℹ️ No pending purchases to sync
[RevenueCat] API request GET /v1/subscribers/$RCAnonymousID:583.../offerings → 304 (cache hit)
[RevenueCat] ℹ️ Requesting products from the store with identifiers: com.fernandomoscon.aurex.pro.monthly, com.fernandomoscon.aurex.pro.annual, com.fernandomoscon.aurex.elite.annual, com.fernandomoscon.aurex.elite.monthly2
[RevenueCat] ℹ️ Products request finished
[RevenueCat] 💰 Retrieved productDetailsList — 4 productos completos con price/baseplan/offerToken
[RevenueCat] ℹ️ Building offerings response with 4 products
[RevenueCat] Offerings object created with 1 offerings
[RevenueCat] Setting storefront cache to AR
[RevenueCat] Billing connected with country code: AR
```
Los 4 productos llegan al cliente con datos completos. Subscription offer tokens valid (largos, generados por Google). NO HAY error de configuracion del SDK.

### 01:52:26.086 — Finsky decide skipear bulkAcquire
```
Finsky: [374] Skipping a request to /bulkAcquire since cache has all the records.
```
**Critico**: `/bulkAcquire` es el endpoint interno de Google Play que valida la **elegibilidad** del usuario para comprar uno o varios productos. "Skipping since cache has all the records" significa: Play Store tiene en cache local los registros sobre estos productos para esta cuenta, y decide no consultar al servidor para refrescar. Si el cache tiene info STALE indicando "no elegible" → Billing va a rechazar.

### 01:52:46.975 — Tap del usuario en Comprar ELITE Mensual
```
[RevenueCat] ℹ️ Requesting products from the store with identifiers: com.fernandomoscon.aurex.elite.monthly2
[RevenueCat] ℹ️ Products request finished for com.fernandomoscon.aurex.elite.monthly2
[RevenueCat] 💰 Retrieved productDetailsList — UN producto: elite.monthly2 OK
```
Este es el comportamiento esperado: el SDK hace un single product fetch antes de iniciar el billing flow.

### 01:52:47.537 — Segunda llamada a Finsky bulkAcquire
```
Finsky: [374] Skipping a request to /bulkAcquire since cache has all the records.
```
Igual al anterior.

### Despues de 01:52:47.537 — NADA
**No hay log de `launchBillingFlow`. No hay log de `BillingClient.launchPurchaseFlow`. No hay log de `Purchasing package`. No hay log de `onPurchasesUpdated`. No hay log de `PurchasesError`. No hay log de `BillingResult`. No hay log de `ResponseCode`.**

El SDK de RevenueCat NUNCA llama a `launchBillingFlow`. Tampoco loggea un `PurchasesError` con `[RevenueCat] 😿‼️` (que es el formato estandar). El rechazo es silencioso desde la perspectiva del logcat.

Pero el usuario ve el Alert "Error / The Product is not available for Purchase" — esto significa que `purchasePackage()` SI fue llamado, el catch SI se ejecuto con un error, y `Alert.alert('Error', e.message)` se disparo con `e.message = "The product is not available for purchase"`.

---

## 4. CODIGO HANDLER DE COMPRA (SubscriptionScreen.js L70-78)

```javascript
const handlePurchase = async (pkg) => {
  try {
    setPurchasing(true);
    const { customerInfo } = await Purchases.purchasePackage(pkg);
    if (customerInfo.entitlements.active['pro'] || customerInfo.entitlements.active['elite']) {
      Alert.alert(t('listo'), t('plan_activado'));
      navigation.goBack();
    }
  } catch (e) {
    if (!e.userCancelled) Alert.alert(t('error'), e.message);
  } finally {
    setPurchasing(false);
  }
};
```

El Alert que ve el usuario es `Alert.alert(t('error'), e.message)` con `e.message = "The product is not available for purchase"`. Ese texto es estandar del SDK RevenueCat cuando recibe un `PurchasesErrorCode.productNotAvailableForPurchaseError` (code 4 en Android).

---

## 5. HIPOTESIS DESCARTADAS CON EVIDENCIA

| # | Hipotesis | Evidencia descartando |
|---|-----------|------------------------|
| 1 | Producto Inactivo en Play Console | Escritorio verifico los 4: todos Activos en 174 paises (Seccion 2). |
| 2 | Cache de Google Play stale | Cache limpiada + reinicio fresco. Mismo error reproducible. |
| 3 | App sideloaded (firma mismatch) | App instalada DESDE Play Store con firma App Signing Key correcta. Mismo error. |
| 4 | Cuenta tester no en track Internal Testing | Fmoscon esta en la lista del track (verificado por Fernando). |
| 5 | License Testing list no activada | Escritorio activo la lista AUREX Testers el 14-may 03:54 AR. |
| 6 | RevenueCat offering vacio | Logcat confirma 4 productos retrievados con detalles completos. |
| 7 | Region/pais no soportado | Storefront AR detectado, productos visibles con precio US$ 19,99. |
| 8 | RevenueCat SDK mal configurado | API Key OK, configure() exitoso, offerings cargan 304 (cache hit). |
| 9 | Bug del codigo JS antes de purchasePackage | Codigo handler es minimo y standard, llama directo al SDK con pkg valido. |

---

## 6. HIPOTESIS ABIERTAS — A INVESTIGAR

### Hipotesis A — Owner de Developer Account no puede comprar sus propios productos
Fernando es el owner de la cuenta de Google Play Console donde esta publicada AUREX. Google Play tiene una restriccion documentada (en foros y stack overflow, no en docs oficiales) donde el owner del developer account NO puede completar compras de los productos publicados en esa misma cuenta, ni siquiera como License Tester.

**Razon**: prevencion de fraude/abuse — desincentivar que developers "compren" sus propios productos para inflar metricas o para hacerse pagar a si mismos.

**Sintoma esperado**: exactamente este — "product not available for purchase" sin logs explicitos en BillingClient, porque Google decide bloquear silenciosamente.

**Como validar**: probar la compra con una cuenta DIFERENTE que sea License Tester PERO NO sea owner del developer account. Por ejemplo `aurextester12@gmail.com` o cualquiera de las otras testers, configurando esa cuenta correctamente en el track Prueba Interna + License Testing + asegurando que la app llegue por Play Store (no sideload).

### Hipotesis B — License Testing no incluye fmoscon@gmail.com
Cuando Escritorio activo la lista "AUREX Testers" en Configuracion → License Testing el 14-may 03:54 AR, la lista contenia 3 emails: aurextester12 + aurextester1 + aurextest2. Fmoscon@gmail.com NO estaba en ESA lista en ese momento (solo se agrego a la lista del track Prueba Interna mas tarde).

Si fmoscon NO esta en License Testing, las compras a $0 no funcionan para esa cuenta — el sistema exige metodo de pago real, y si la cuenta no tiene metodo de pago configurado en Google Pay, Billing falla silenciosamente con "not available for purchase".

**Como validar via Chrome**: Play Console → Configuracion → License Testing → ver lista de emails. Confirmar si fmoscon@gmail.com esta o no esta.

### Hipotesis C — Metodo de pago no configurado en la cuenta Google
Para compras de subscripciones, Google Play exige (incluso para testers en algunos casos) que la cuenta tenga AL MENOS UN metodo de pago activo en Google Pay. Aunque sea para test purchase a $0, Google requiere la "intencion" del usuario de poder pagar.

Si fmoscon@gmail.com nunca configuro un metodo de pago en Google Pay, Billing rechaza inmediatamente.

**Como validar**: Samsung → Play Store → Cuenta → Metodos de pago → ver si hay algo configurado.

### Hipotesis D — Versionado del Billing Library / SDK RevenueCat mismatch
La version del Play Billing Library con la que se compilo el AAB podria no ser compatible con la version del SDK de RevenueCat instalada. Si hay incompatibilidad, el SDK falla silenciosamente.

**Como validar**: Code revisa `package.json` y `android/build.gradle` para ver versiones de `react-native-purchases` y `billingclient`.

### Hipotesis E — La cuenta `_BZ0SJmCKGZv-8u_x6LCFaCHQNUlnRglqp2yEdDAfHA` (preferred billing account via installer) no coincide con la cuenta activa
Finsky log indica que el package tiene un "preferred billing account" asociado al installer (la cuenta con la que se descargo la app). Ese hash es opaco pero podria representar OTRA cuenta Google distinta de la que esta logueada como activa en Play Store actual.

Si Fernando instalo la app desde Play Store con la cuenta X y luego cambio a fmoscon@gmail.com como activa, el "preferred billing account" en el package se quedo con X.

**Como validar**: Samsung → Play Store → foto perfil → ver TODAS las cuentas logueadas y cual es la activa. Despues comparar contra cual era la activa cuando se instalo.

### Hipotesis F — Subscription Group config en Play Console
Los 4 productos de AUREX pueden estar todos en el mismo subscription group (default). Si la cuenta de Fernando tuvo cualquier interaccion previa con cualquier producto AUREX (incluso test purchase abortada o compra fallida), Google podria estar bloqueando reintentos.

**Como validar via Chrome**: Play Console → Monetizar → Suscripciones → cada producto → ver si tiene un Subscription Group asignado y si hay historial de transacciones de la cuenta fmoscon@gmail.com.

---

## 7. EVIDENCIA LITERAL — LOGS CLAVE PARA ESCRITORIO

```
05-15 01:52:24.635 Finsky: com.aurexapp: Account determined from installer data - [_BZ0SJmCKGZv-8u_x6LCFaCHQNUlnRglqp2yEdDAfHA]
05-15 01:52:24.641 Finsky: Billing preferred account via installer for com.aurexapp: [_BZ0SJmCKGZv-8u_x6LCFaCHQNUlnRglqp2yEdDAfHA]
05-15 01:52:25.000 ReactNativeJS: [RevenueCat] 😻 CustomerInfo updated from network.
05-15 01:52:25.589 ReactNativeJS: [RevenueCat] Setting storefront cache to AR
05-15 01:52:25.589 ReactNativeJS: [RevenueCat] Billing connected with country code: AR
05-15 01:52:26.086 Finsky: Skipping a request to /bulkAcquire since cache has all the records.
05-15 01:52:46.975 ReactNativeJS: [RevenueCat] ℹ️ Requesting products from the store with identifiers: com.fernandomoscon.aurex.elite.monthly2
05-15 01:52:46.989 ReactNativeJS: [RevenueCat] ℹ️ Products request finished for com.fernandomoscon.aurex.elite.monthly2
05-15 01:52:46.990 ReactNativeJS: [RevenueCat] 💰 Retrieved productDetailsList: ProductDetails{productId='com.fernandomoscon.aurex.elite.monthly2', formattedPrice='US$ 19,99', basePlanId='monthly-elite', offerIdToken='AUOc0sqT0C34ZmHVMtJlUUHtsXQeZjxNNiRXcTbc/kV0...', recurrenceMode=1}
05-15 01:52:47.537 Finsky: Skipping a request to /bulkAcquire since cache has all the records.

[DESPUES DE 01:52:47.537 — NADA RELACIONADO A BILLING/PURCHASE — solo logs de UI sin importancia]
```

Texto exacto del Alert que ve Fernando:
- Titulo: "Error"
- Mensaje: "The Product is not available for Purchase"

---

## 8. ACCIONES RECOMENDADAS PARA ESCRITORIO

Escritorio puede investigar via Chrome las hipotesis B, E y F (todo en Play Console). Reportar:

1. **Hipotesis B**: Play Console → Configuracion → **License Testing** → ¿esta `fmoscon@gmail.com` en la lista? Si NO esta, agregarlo. Si esta, confirmar status.

2. **Hipotesis F**: Play Console → Monetizar → Suscripciones → para cada uno de los 4 productos:
   - ¿Tienen Subscription Group asignado?
   - ¿Cual?
   - Reporte de transacciones de la cuenta `fmoscon@gmail.com` (Play Console → Ordenes y suscripciones → filtrar por email): ¿hay historial previo?

3. **Hipotesis E (parcial)**: Play Console → Setup → Internal Testing Track → confirmar que la version 21 esta efectivamente publicada y disponible para los testers.

Fernando puede ejecutar via Samsung lo siguiente para validar Hipotesis C y E:

4. **Hipotesis C**: Samsung → Play Store → tocar foto de perfil → "Pagos y suscripciones" → "Metodos de pago" → ¿hay algun metodo configurado?

5. **Hipotesis E (parcial)**: Samsung → Play Store → tocar foto perfil → ver todas las cuentas → confirmar cual es la activa AHORA + ver si hay otras cuentas logueadas.

Para Hipotesis A (owner cannot buy own products), la confirmacion es indirecta: si las hipotesis B/C/E/F estan limpias y aun asi falla, A es la causa por descarte. Para validar A directamente, habria que probar con una cuenta distinta a fmoscon (idealmente alguna de las testers `aurextester12/1/2`) **logueada en Play Store**, **instalando desde el link de opt-in del track Prueba Interna**, y probando compra. Esa es la prueba mas concluyente.

---

## 9. CONTEXTO ADICIONAL — RUTAS RELEVANTES

- Codigo de la app: `/Users/fernandomoscon/AurexApp/src/screens/SubscriptionScreen.js`
- AAB Build 21 backup: `/Users/fernandomoscon/AurexApp/backups/aab/aurex-build21-FINAL-20260514_2207.aab`
- Logs completos persistidos: `/Users/fernandomoscon/.claude/projects/-Users-fernandomoscon/ca803ad3-924c-42d1-a5b2-bb0af97e514a/tool-results/`
- Brief operativo Build 21: `/Users/fernandomoscon/Desktop/aurex-app/briefs/BRIEF_BUILD21_ESTADO_15MAY.md`
- Session active Escritorio: `/Users/fernandomoscon/Desktop/aurex-app/briefs/SESSION_ACTIVE_ESCRITORIO_CHROME.md`

URL publica para que Escritorio lea este informe en Chrome (una vez commiteado):
`https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/INFORME_COMPRA_IAP_15MAY_PARA_ESCRITORIO.md`

---

## 10. RECONOCIMIENTOS

Durante esta investigacion Code (yo) tuvo varios errores:
1. Diagnostico inicial "sideload bloquea compras" → recule cuando Fernando aclaro que Build 21 ya estaba en Prueba Interna. Reafirme cuando aparecio el dato del Play App Signing (las 2 firmas distintas). El sideload SI era parte del problema, pero no era la causa raiz, ya que ahora la app esta firmada por Google y el error persiste.
2. Pase a Fernando link de tester equivocado en sesion previa: `https://play.google.com/apps/testing/com.aurexapp` en vez del link de opt-in del track Prueba Interna `https://play.google.com/apps/internaltest/4700950422602152057`. Esto pudo haber bloqueado el flow de testers durante dias.
3. Propuse subir Build 21 a Play Console varias veces sin recordar que ya estaba subido desde el 14-may 22:35.

Estos errores estan documentados en memoria (`project_build21_estado_15may.md`) para no repetirlos.
