# TICKET REVENUECAT — Version FINAL consolidada por Escritorio

Fecha: 15-may-2026 ~02:50 AR
Estado: listo para enviar via formulario "Get help" de RC dashboard
Consolidacion: Escritorio integro el draft de Code + datos extras (RC App ID, Project ID) + 4 screenshots.

---

## DATOS CONSOLIDADOS UNICOS QUE APORTO ESCRITORIO

- **RC App ID**: `app8be7db09a7`
- **Project ID**: `proj228caf37`
- **License Testing badge confirmada**: "RESPOND_NORMALLY" (default — significa que la cuenta tester recibe responses como un usuario normal, sin override de licencia)
- **4 screenshots adjuntos al ticket**:
  1. RC Offerings — `aurex_default` activo con 4 packages + product IDs Android
  2. RC App config — `com.aurexapp` + "File saved Valid credentials" + RTDN "Connected to Google"
  3. Play Console Suscripciones — los 4 productos activos
  4. Play Console License Testing — "AUREX Testers" checkbox ON, 4 usuarios, RESPOND_NORMALLY

---

## TEXTO FINAL ENVIADO (campo "What's happening?")

**Subject**: Android subscriptions fail with "product not available for purchase" — launchBillingFlow never called despite valid product retrieval

```
Hi RevenueCat team,

PROJECT / APP
- RevenueCat app: AUREX (Play Store) | RC App ID: app8be7db09a7 | Project ID: proj228caf37
- Android API key: goog_HfiemofhuhAKeWYfNZfLGrlyIDp (created 22-Apr-2026)
- Anonymous user ID seen in logs: $RCAnonymousID:583810b271f44bc1a2ff8336cbccce66
- Package name (Play Console): com.aurexapp

PRODUCTS / OFFERING
- Offering: aurex_default (set as Current Offering)
- 4 Android packages, all visible in SDK at runtime:
  - pro_monthly  → com.fernandomoscon.aurex.pro.monthly:monthly-pro
  - pro_annual   → com.fernandomoscon.aurex.pro.annual:annual-pro
  - elite_monthly → com.fernandomoscon.aurex.elite.monthly2:monthly-elite
  - elite_annual → com.fernandomoscon.aurex.elite.annual:annual-elite

SYMPTOM
Every purchase attempt on any of the 4 subscription products fails with PurchasesErrorCode.productNotAvailableForPurchaseError (error code 4) — "The product is not available for purchase". The Google Play billing bottom sheet NEVER appears. Reproducible 100% across all 4 plans and with 2 different test accounts.

SDK VERSIONS (verified from Maven POM)
- react-native-purchases: 9.15.1
- purchases (Kotlin SDK): 9.28.1
- com.android.billingclient:billing: 8.0.0 (declared by purchases 9.28.1 POM)
- React Native: 0.84.1
- compileSdk / targetSdk: 36

PLAY CONSOLE CONFIG (all verified correct)
- All 4 products: Active, available in 174 countries
- All 4 base plans: Active, with backwards compatibility flag ON
- No separate offers — base plan only, no introductory price
- Service Account JSON: uploaded and valid ("File saved" + "Valid credentials" badge in RC dashboard)
- RTDN: enabled, Pub/Sub topic projects/singular-rope-494122-g4/topics/Play-Store-Notifications, "Connected to Google" in RC
- Play App Signing: ACTIVE — App Signing Key SHA-1: 54:DF:D1:42:BD:1F:49:1C:A0:ED:D5:30:A4:AD:FE:60:A5:98:60:B7
- License Testing: list "AUREX Testers" enabled (checkbox ON), 4 emails including developer owner, response set to RESPOND_NORMALLY
- Offerings compatibility mode: SDK v6+ and backwards compatible

TESTER ENVIRONMENT
- Device: Samsung Galaxy S22 (R5CR92ADDNW), Argentina storefront (AR)
- App installed from Play Store Internal Testing track (NOT sideloaded), version 21 (1.0.21, versionCode 21) published 14-may-2026 22:35 AR
- Reproduced with 2 accounts: developer owner (fmoscon@gmail.com) AND license tester (aurextester12@gmail.com) — same error in both
- Tester has credit card configured

LOGCAT EVIDENCE (timestamp 05-15 01:52 AR / 04:52 UTC)
[RevenueCat] Billing Service Setup finished
[RevenueCat] Billing connected with country code: AR
[RevenueCat] Requesting products from store: com.fernandomoscon.aurex.elite.monthly2
[RevenueCat] Retrieved productDetailsList: ProductDetails{
  productId=com.fernandomoscon.aurex.elite.monthly2,
  formattedPrice=US$ 19,99,
  basePlanId=monthly-elite,
  offerIdToken=AUOc0sqT0C34ZmHVMtJlUUHtsXQeZjxNNiRXcTbc/kV0...
}
Finsky: Skipping a request to /bulkAcquire since cache has all the records.
[AFTER THIS: NO launchBillingFlow log, NO onPurchasesUpdated callback, NO BillingResult log]
User sees Alert: "The product is not available for purchase"

KEY OBSERVATION
SDK successfully retrieves product details with valid offerIdToken, but purchasePackage() fails silently without ever calling launchBillingFlow. The Finsky /bulkAcquire is skipped (cache hit — observed TWICE in the same session), which may indicate stale eligibility cache on Google's side. No [RevenueCat] error log with the standard format appears — the error surfaces only in the JS catch block.

CODE PATH
const handlePurchase = async (pkg) => {
  try {
    const { customerInfo } = await Purchases.purchasePackage(pkg);
    // pkg comes directly from offerings.current.availablePackages — no manual construction
  } catch (e) {
    if (!e.userCancelled) Alert.alert('Error', e.message);
  }
};

HYPOTHESES ALREADY RULED OUT (11 total)
1. Dashboard config: all verified correct (package name, service account, API key, offering, retrocompatibility, RTDN, License Testing, sandbox access)
2. Play Console product state: all 4 active in 174 countries, base plan active
3. App signing mismatch: app installed from Play Store Internal Testing, signed by App Signing Key
4. Tester not in License Testing list: list contains 4 emails including both test accounts used
5. SDK/Billing Library version mismatch: purchases 9.28.1 POM declares billing 8.0.0 — correct
6. BillingClient disconnected between configure() and tap: logs show "Billing Service Setup finished", no disconnect log between setup and tap
7. Package object construction: pkg passed intact from offerings.current.availablePackages
8. Sandbox/test mode interfering: no test mode active in RC project (sandbox testing = Anybody)
9. Owner can't buy own products: failed with non-owner tester account too
10. Missing payment method: credit card added to tester account before retry — same error
11. Google Play cache: cleared Google Play Store + Play Services cache, rebooted — same error

WHAT WE NEED FROM YOU
Please check server-side logs for RC App ID app8be7db09a7, anonymous user $RCAnonymousID:583810b271f44bc1a2ff8336cbccce66, purchase attempts on 14-15 May 2026 between 22:35 and 02:35 AR (UTC-3 = 01:35-05:35 UTC).

Specifically:
1. Is there any server-side validation rejecting the purchase before BillingClient is invoked?
2. Are the subscriptionOfferDetails in the ProductDetails being parsed correctly by the SDK?
3. Is there a known issue with billing 8.0.0 + purchases 9.28.1 + base plans without separate offers?
4. Is there a propagation delay for products/offering configured on 14-May-2026 (same day as test)?

Full logcat dump and AAB available on request.

Thanks,
Fernando
```

---

## EVALUACION COMPARATIVA (notas de Escritorio)

Texto de Code (draft inicial) era mejor estructurado que el draft propio de Escritorio porque:
- Subject separado claro
- Secciones con labels en mayuscula
- 4 product IDs completos con base plan IDs (util para soporte)
- 11 hipotesis descartadas ordenadas
- Preguntas finales tecnicas y especificas

Lo que Escritorio agrego al draft de Code:
- RC App ID y Project ID
- Detalle de License Testing response = RESPOND_NORMALLY
- Resaltado del Finsky bulkAcquire skipped DOS VECES (no UNA — patron)
- Confirmacion version 21 publicada 22:35 AR

Texto final = consolidacion de ambos.

---

## QUE SIGUE

1. Fernando confirma a Escritorio que proceda con el envio en el formulario RC.
2. Escritorio pega texto + adjunta 4 screenshots + Submit Request.
3. RC support responde en 1-3 dias habiles (SLA estandar).
4. Mientras tanto: NO compilar Build 22 dependiente del fix IAP. Bugs #2-#7 del cuadro pueden avanzarse independientes (no requieren fix IAP).

---

## ARCHIVOS RELACIONADOS

- Cuadro detallado bugs Build 21 → Build 22: `briefs/CUADRO_BUGS_BUILD21_PARA_BUILD22.md`
- Informe tecnico completo bug compra IAP (background): `briefs/INFORME_COMPRA_IAP_15MAY_PARA_ESCRITORIO.md`
- Brief operativo Build 21: `briefs/BRIEF_BUILD21_ESTADO_15MAY.md`
- Session active Escritorio: `briefs/SESSION_ACTIVE_ESCRITORIO_CHROME.md`

URL publica:
`https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/TICKET_REVENUECAT_FINAL_15MAY.md`
