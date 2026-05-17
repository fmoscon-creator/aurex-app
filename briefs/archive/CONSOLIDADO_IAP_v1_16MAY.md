# CONSOLIDADO IAP — ANÁLISIS CRUZADO CODE + ESCRITORIO v1
> Fecha: 16-may-2026 ~15:30 AR
> Bug raíz: usuario toca "Quiero PRO/ELITE mensual" en Build 35 → popup "Error / The product is not available for purchase"
> Sin solución después de 6 builds Android (33→35) + horas de debugging.

---

## 0. SÍNTOMA REPRODUCIBLE (verificado en logcat múltiples veces)

1. App AUREX v1.0.35 (versionCode 35) instalada **oficialmente desde Play Store Internal Testing** (verificado via adb: `installer = com.android.vending`).
2. Login con `fmoscon@gmail.com` OK. RC identifica al usuario con UUID Supabase `174187a7-d640-459b-9426-9c28146f4e23` (verificado en log: `GET /v1/subscribers/174187a7... 200 OK`).
3. SubscriptionScreen carga: `Purchases.getOfferings()` devuelve 4 offerings OK con precios + offerIdToken + basePlanId.
4. Usuario toca botón "Quiero PRO/ELITE mensual" → `handlePurchase(pkg)` → `Purchases.purchasePackage(pkg)`.
5. RC consulta a Google Play `getProducts(productId)` → Google devuelve **productDetails COMPLETO** con precio, offerIdToken, basePlanId (verificado en log).
6. **~12ms después → popup "Error / The product is not available for purchase".**
7. **NUNCA se llama `launchBillingFlow`. NUNCA se contacta Google Play Billing real. NUNCA se genera evento que llegue al webhook backend** (verificado: alerta Telegram IAP-5 nunca disparó).

---

## 1. ANÁLISIS CODE (independiente, basado en investigación profunda del repo + búsqueda web)

### Hallazgo Code-1: Stack técnico verificado
- `react-native-purchases` 9.15.1 + `purchases-hybrid-common` 17.54.0
- **Google Play Billing Library v8.0.0** (nueva, lanzada feb 2026)
- `targetSdkVersion 36` (Android 16, muy reciente)
- React Native 0.84.1
- ProGuard activo con reglas oficiales RC.

### Hallazgo Code-2: 2 flujos de compra duplicados en el código
- ✅ `SubscriptionScreen.js` L74 usa `purchasePackage(pkg)` (flujo oficial v5+/v8).
- ❌ `PerfilScreen.js` L459 + L501 usan `purchaseProduct(productId)` con strings hardcodeados (`'com.fernandomoscon.aurex.pro.monthly'`, etc.) — **API deprecada en Billing v5+** (no transmite offerToken).
- **No causa del bug actual** (Fernando va por SubscriptionScreen), pero es código zombie que hay que limpiar.

### Hallazgo Code-3: Issue conocida RC matchea
- **GitHub Issue #3039 `RevenueCat/purchases-android`** (enero 2026), label "acknowledged bug", cerrado SIN fix público.
- URL: `https://github.com/RevenueCat/purchases-android/issues/3039`
- Síntoma casi idéntico: "subscription plan not available" tras getOfferings OK.
- RC reconoció el problema pero no publicó solución.

### Hallazgo Code-4: 5 causas conocidas documentadas por RC support
Según `revenuecat.com/docs/test-and-launch/sandbox/google-play-store` y community threads:

| # | Causa | Estado actual |
|---|---|---|
| 1 | País del producto no incluye AR | ⏳ Por verificar (Escritorio) |
| 2 | País de cuenta tester ≠ países del producto | ⏳ Por verificar (Fernando) |
| 3 | PIN no configurado en Samsung | ✅ **DESCARTADO** — Fernando confirmó PIN + biométrico activos |
| 4 | Tester nunca abrió URL opt-in "Become a tester" | ⏳ Por verificar (Fernando) |
| 5 | Application ID mismatch | ✅ **DESCARTADO** — `com.aurexapp` en ambos lados |

### Hallazgo Code-5: NO está documentado como causa
- Bug del SDK RC 9.15.1 (excepto Issue #3039 sin fix).
- Incompatibilidad targetSdk 36 + Billing v8 (no encontrado en docs ni blog).
- ProGuard mal configurado (reglas RC oficiales activas).
- Mismatch UUID Supabase vs anonymous (confirmado correctamente identificado).

---

## 2. ANÁLISIS ESCRITORIO (independiente, textual del usuario)

### Hallazgo Escritorio: bundle JS cacheado en Build 35
> "El codigo fuente en GitHub branch dev tiene el Alert 'Error IAP debug' en el catch de handlePurchase — eso es un hecho verificado. Pero el popup viejo NO puede venir del catch de handlePurchase de Build 35 (que debería decir 'Error IAP debug' con 5 líneas).
>
> Conclusion real: Si versionCode=35 está instalado confirmado por adb, y el catch de handlePurchase en el código fuente tiene 'Error IAP debug', pero en pantalla aparece 'Error' + 1 línea, hay una sola explicación técnica real: **el bundle JS dentro del AAB no incluyó el cambio de CODE**. El JS bundle es un archivo separado empaquetado dentro del AAB — si Hermes/Metro usó el bundle cacheado de Build 34, el versionCode del nativo cambia a 35 pero el JS dentro sigue siendo el de Build 34 con el Alert viejo.
>
> El plan de Build 36 con `gradlew clean` es correcto y es el paso que corresponde."

---

## 3. COINCIDENCIAS Code + Escritorio

| Punto coincidente | Razón |
|---|---|
| ✅ Build 36 con `./gradlew clean` es necesario | Sin él, el Alert de debug nunca va a mostrar el código real de error en pantalla |
| ✅ El versionCode 35 sí está instalado en el Samsung | Verificado vía adb |
| ✅ El código fuente Build 35 tiene el cambio del Alert "Error IAP debug" | Verificado con grep en repo |
| ✅ El popup que vio Fernando NO viene del catch handlePurchase del Build 35 | Si fuera del nuevo, mostraría "Error IAP debug" con 5 líneas |
| ✅ Necesitamos ver el código de error real para diagnosticar la causa raíz | Sin ese dato, todo es hipótesis |

---

## 4. DIFERENCIAS Code + Escritorio

| Punto | Code dice | Escritorio dice | Reconciliación |
|---|---|---|---|
| **Foco del problema** | El bug está en CONFIG (5 causas conocidas), no en código | El bug es bundle JS cacheado de Build 35 | **Son 2 problemas distintos**: Escritorio resuelve el meta-problema (no vemos el error real). Code apunta al problema raíz (cuál es la causa del error). Ambos son válidos y secuenciales. |
| **Causa del error IAP en sí** | 5 causas conocidas documentadas RC (#1, #2, #4 pendientes verificar) | No analiza la causa raíz del error IAP, solo la causa del por qué no vemos el código de error | Code va más profundo en causa raíz. Escritorio se enfoca en habilitar el diagnóstico. |
| **Issue #3039 RC** | Mencionada como precedente | No mencionada | Code aporta evidencia externa adicional. |
| **2 flujos de compra duplicados** | Detectado: `purchasePackage` (oficial) + `purchaseProduct` deprecada en PerfilScreen | No mencionado | Code aporta hallazgo estructural adicional. |

**Conclusión combinada:** Build 36 con clean es el camino para **VER el código de error**. Una vez visto, comparamos con las 5 causas conocidas (#1, #2, #4 pendientes verificar) o con Issue #3039 si matchea exactamente.

---

## 5. PRÓXIMOS PASOS CONSENSUADOS

### FASE 1 — Habilitar diagnóstico (Build 36 con clean)
**Quién:** Code.
**Tiempo:** ~30 min.
**Cambios técnicos:**
1. `cd android && ./gradlew clean` ← clave para forzar regenerar bundle JS sin cache.
2. Bump `versionCode 35 → 36` / `versionName 1.0.35 → 1.0.36` en `build.gradle`.
3. Recompilar AAB (`./gradlew bundleRelease`).
4. Backup AAB.
5. Pasar a Escritorio para subir a Internal Testing.

**Resultado esperado:** AAB Build 36 con bundle JS fresh que SÍ incluye el cambio del Alert detallado.

### FASE 2 — Capturar código de error real (Fernando)
**Quién:** Fernando + Code.
1. Vos: desinstalar AUREX completamente (no actualizar — **desinstalar**).
2. Reinstalar Build 36 desde Play Store Internal Testing.
3. Login con fmoscon.
4. Tocar "Quiero ELITE mensual".
5. El popup ahora va a mostrar **5 líneas** con: `code`, `readableErrorCode`, `userCancelled`, `underlyingErrorMessage`, `message`.
6. Screenshot → me lo pasás.

### FASE 3 — Verificar las 4 causas pendientes en paralelo
Mientras Code recompila Build 36, **Fernando + Escritorio verifican en paralelo:**

#### Para Escritorio (Play Console):
- ✅ **Causa #1** — En Play Console → AUREX → Productos in-app/Suscripciones → cada uno de los 4 → **Países/Regiones disponibles**. Confirmar que **Argentina esté tildada** para los 4 productos.

#### Para Fernando (1 min cada uno):
- ✅ **Causa #2** — Abrir `https://pay.google.com/payments/home` logueado como fmoscon@gmail.com → ver "País de la cuenta" → confirmar que sea **Argentina**.
- ✅ **Causa #4** — ¿Alguna vez abriste en Chrome el LINK del email de invitación a Internal Testing (suele ser `https://play.google.com/apps/internaltest/...`) **estando logueado como fmoscon@gmail.com**, y clickeaste **"Become a tester"**? Si solo recibiste el email y NO clickeaste el botón en el navegador, **fmoscon NO es tester oficial** aunque esté en la lista.

### FASE 4 — Reconciliar y solucionar
Con el código de error de FASE 2 + resultado de FASE 3 chequeos:
- Si código de error es `ITEM_UNAVAILABLE` Y país NO incluye AR → causa #1.
- Si código de error es `BILLING_UNAVAILABLE` → causa #2 o problema de Play Services.
- Si código de error es `FEATURE_NOT_SUPPORTED` → causa #4 (no opt-in).
- Si código es OTRO → escalamos a RC support con Issue #3039 referenciada.

---

## 6. DECISIÓN INMEDIATA para Fernando

**Opción A — Ir en orden estricto:** primero Fernando hace las 3 verificaciones de FASE 3 (10 min). Si encuentra una causa → fix directo sin recompilar.
**Opción B — Paralelo:** Code arranca Build 36 con clean (30 min), mientras Fernando + Escritorio verifican FASE 3.

**Mi voto:** **A primero.** Las 3 verificaciones son rápidas y pueden cerrar el caso sin necesidad de Build 36 si la causa es config. Si todas dan OK → ahí sí, B.

---

## 7. ARCHIVOS / REFERENCIAS

- Issue #3039 RC: `https://github.com/RevenueCat/purchases-android/issues/3039`
- Docs RC sandbox: `https://www.revenuecat.com/docs/test-and-launch/sandbox/google-play-store`
- Repo aurex-app: `https://github.com/fmoscon-creator/aurex-app`
- Brief este: `~/Desktop/aurex-app/briefs/CONSOLIDADO_IAP_v1_16MAY.md`

---

**Fin v1. Esperando OK Fernando sobre Opción A vs B.**
