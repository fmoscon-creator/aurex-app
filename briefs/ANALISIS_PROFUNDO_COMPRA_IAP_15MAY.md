# ANALISIS PROFUNDO BUG #1 COMPRA IAP — trabajo trascendental autonomo

Fecha: 15-may-2026 ~15:45 AR
Autor: Code (analisis autonomo a pedido de Fernando, en paralelo al ticket RC support pendiente).
Estado: documento de trabajo para discusion con Escritorio + Fernando.

---

## 1. RESUMEN EJECUTIVO

Despues de descartar 11 hipotesis con Escritorio y enviar ticket a RevenueCat support, encontre **2 bugs criticos no identificados antes** que explican parte sustancial del problema y que requieren fix de codigo (no son externos):

1. **CRITICO 1 — Cliente nunca identifica al usuario en RevenueCat**: la app NO llama `Purchases.logIn(uid)` despues del login Supabase. El usuario queda como `$RCAnonymousID` permanente. Confirmado en logs (`$RCAnonymousID:583810b271f44bc1a2ff8336cbccce66`).

2. **CRITICO 2 — Backend webhook RevenueCat descarta usuarios anonimos**: el handler `/webhook/revenuecat` (server.js L1637-1643) valida que `app_user_id` sea un UUID de Supabase. Si recibe un anonymous_id de RC, **devuelve 200 OK silenciosamente sin actualizar `usuarios.plan`**.

**Consecuencia combinada**: incluso si la compra IAP funcionara perfecto (cargo real procesado, entitlement otorgado), el plan del usuario en AUREX NO se actualizaria automaticamente porque:
- Frontend envia anonymousID al SDK
- RC envia webhook con app_user_id = anonymousID
- Backend ve "no es UUID" → skip → plan sigue en FREE

Esto explica por que despues de la compra Sandbox aprobada (S3 imagen confirma Alert "Tu plan fue activado"), el plan en Perfil seguia FREE — no es solo "comportamiento sandbox", es **bug estructural del flujo de identificacion del usuario**.

---

## 2. ARQUITECTURA DEL FLUJO IAP — ESTADO ACTUAL

```
[Usuario abre app]
       ↓
[Login Supabase con email/password] → recibe session.user.id (UUID Supabase)
       ↓
[App.js L43-47] Purchases.configure({ apiKey: goog_HfiemofhuhAKeWYfNZfLGrlyIDp })
   ⚠️ NO llama Purchases.logIn(uid) → usuario queda anonimo en RC
       ↓
[Usuario navega a SubscriptionScreen]
       ↓
[Purchases.getOfferings()] → 4 productos retornados (PRO/ELITE Mensual/Anual)
       ↓
[Usuario tap "Quiero el PRO"]
       ↓
[Purchases.purchasePackage(pkg)]
       ↓
[Google Play bottom sheet aparece] → "AUREX PRO Mensual / US$ 9.99 / Tarjeta prueba"
       ↓
[Usuario toca Suscribirse + biometrica]
       ↓
[Google procesa compra Sandbox] → NO emite RTDN real para License Tester sin cargo
       ↓
[RC SDK local devuelve customerInfo con entitlement temporal]
       ↓
[Frontend dispara Alert "Tu plan fue activado"] + emit plan_changed (Build 22+)
       ↓
[PerfilScreen recibe evento, refresca plan local en cache]
       ↓
[Usuario va a Perfil] → muestra plan basado en backend `usuarios.plan` (NO cache local)
   ⚠️ Backend nunca recibio webhook valido → plan sigue 'FREE'
   ⚠️ Plan correcto se "pierde" al siguiente refresh useFocusEffect
```

---

## 3. HALLAZGOS NUEVOS DEL ANALISIS AUTONOMO

### 3.1 Frontend — `Purchases.logIn(uid)` AUSENTE

**Codigo actual `App.js` L40-49:**
```javascript
useEffect(() => {
  Purchases.setLogLevel(LOG_LEVEL.VERBOSE);
  if (Platform.OS === 'ios') {
    Purchases.configure({ apiKey: REVENUECAT_IOS_KEY });
  } else if (Platform.OS === 'android') {
    Purchases.configure({ apiKey: REVENUECAT_ANDROID_KEY });
  }
}, []);
```

**Falta**:
1. Despues del login Supabase exitoso, llamar `await Purchases.logIn(uid)` donde `uid = session.user.id`.
2. Despues del logout Supabase, llamar `await Purchases.logOut()` para limpiar identidad.
3. Considerar opcion alternativa: configurar appUserID directo en `Purchases.configure({ apiKey, appUserID: uid })` despues de obtener la session.

**Grep global**: 0 ocurrencias de `Purchases.logIn` o `Purchases.identify` en todo el codigo. El user esta como `$RCAnonymousID:583810b271f44bc1a2ff8336cbccce66` en TODOS los logs.

### 3.2 Backend — webhook descarta anonymous IDs silenciosamente

**Codigo `aurex-backend/server.js` L1637-1643:**
```javascript
// RevenueCat envia app_user_id que deberia ser el supabase users.id (UUID)
// Si no es UUID valido, posiblemente es anonymous_id de RevenueCat
const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(appUserId);
if (!isUUID) {
  console.warn(`[RevenueCat Webhook] app_user_id no es UUID: ${appUserId} — quizas usuario anonymous. No se actualiza Supabase.`);
  return res.json({ ok: true, skipped: 'non-UUID app_user_id' });
}
```

El backend YA detecto este escenario y deja un log warning. Pero NO hay alerta de monitoring que avise si esto ocurre en produccion. Si manana un usuario real compra con cargo real y queda anonimo, el backend skip-ea silenciosamente y el plan no se actualiza.

### 3.3 Logout — `Purchases.logOut()` ausente

**Codigo `PerfilScreen.js` L235-251:**
```javascript
const logout = async () => {
  try {
    // ... limpieza varia ...
    await supabase.auth.signOut();
    await AsyncStorage.clear();
    Alert.alert(t('sesion_cerrada'), t('reinicia_app'));
  } catch (e) { ... }
};
```

Si user A se desloguea y user B se loguea en el mismo device, ambos comparten anonymousID porque nadie llama `Purchases.logOut()`. Posible filtracion cross-user.

### 3.4 Producto IDs con sufijo `2`

`com.fernandomoscon.aurex.elite.monthly2` tiene un `2` al final. Razon historica: hubo un `monthly` original que despues se reemplazo. Worth verificar:
- ¿Existe un `com.fernandomoscon.aurex.elite.monthly` (sin 2) "fantasma" en Play Console que conflictue?
- Si si, eso podria explicar comportamientos raros en el bottom sheet.

### 3.5 Bundle ID iOS reutilizado en Android Play Console

Los Product IDs en Play Console son `com.fernandomoscon.aurex.X` (estilo bundle iOS) pero el package Android es `com.aurexapp`. Esto es VALIDO en Play Console (los Product IDs son independientes del package name), pero es inusual.

---

## 4. HIPOTESIS DESCARTADAS PREVIAMENTE (recap rapido)

1. Dashboard config — OK
2. Productos Play Console — Activos 174 paises
3. App signing mismatch — fix instalacion via Play Store
4. Tester no en License Testing — confirmado en lista
5. SDK / Billing version mismatch — versiones matchean
6. BillingClient disconnected — logs OK
7. pkg construction — intacto
8. Sandbox/test mode — no activo
9. Owner cannot buy own products — fallo con tester no-owner
10. Falta payment method — TC agregada
11. Cache Play Store stale — limpiado + reboot

---

## 5. HIPOTESIS ADICIONALES NO PROBADAS

### 5.1 Subscription Group + Replacement Mode

Los 4 productos AUREX viven en el mismo subscription group por default (Google Play los agrupa automaticamente cuando comparten base plan structure similar). Cuando un usuario tiene una subscription activa en el grupo, intentar comprar otra del mismo grupo requiere `setSubscriptionUpdateParams(oldSku, prorationMode)`. RC SDK lo maneja automaticamente PERO si el state interno esta corrupto (ej. de una compra previa abortada), puede fallar con "not available".

**Como validar**: en Play Console → Monetizar → Suscripciones → ver si los 4 productos estan en un Subscription Group (visible en cada producto, campo "Grupo de suscripcion").

### 5.2 Internal Testing vs Closed Testing track

Hay reportes en RevenueCat community que **Closed Testing track tiene mejor comportamiento de Billing que Internal Testing track** para algunos edge cases. Aunque ambos tracks deberian funcionar igual, vale considerar promover Build 24 a Closed Testing si Internal sigue dando problemas.

### 5.3 License Testing "License response" setting

Play Console → Configuracion → License Testing → "License response" tiene 6 valores posibles:
- RESPOND_NORMALLY (default)
- LICENSED
- NOT_LICENSED
- LICENSED_OLD_KEY
- ERROR_NOT_MARKET_MANAGED
- ERROR_SERVER_FAILURE

Si el setting esta en algo distinto de RESPOND_NORMALLY o LICENSED, License Testers pueden recibir errors en compras. Escritorio confirmo "RESPOND_NORMALLY" en su revision pero vale doble-check.

### 5.4 Cuenta dev owner con restricciones

Fernando es el OWNER del Play Console developer account. Hay reportes de que Google Play **impone restricciones implicitas** en compras para cuentas owner/admin del developer (NO solo License Testers). Aunque parcialmente descartado al probar con `aurextester12`, vale considerar si esa cuenta tester tiene algun rol elevado en Play Console.

### 5.5 Region pricing config

Argentina (AR) tiene restricciones de divisa fuerte. Productos en USD pueden no permitir cargos en cuentas AR sin "Pagos extranjeros habilitados". Worth chequear el setting en la cuenta Google.

---

## 6. PLAN DE ACCION PROPUESTO (orden de prioridad)

### Tier 1 — Fixes de codigo CRITICOS (Build 25)

**Estos fixes deben aplicarse independientemente de la respuesta de RC support, porque resuelven bugs estructurales propios de AUREX no documentados antes.**

| # | Bug | Archivo | Fix |
|---|-----|---------|-----|
| 1 | Frontend no identifica user en RC | App.js + LoginScreen + SignupScreen | Despues de login/signup exitoso: `await Purchases.logIn(session.user.id)` |
| 2 | Frontend no limpia identidad al logout | PerfilScreen.js logout() | Antes de signOut: `await Purchases.logOut()` |
| 3 | Defensa: configurar appUserID al arranque si ya hay session | App.js useEffect inicial | Leer session de supabase ANTES de configure, pasar `appUserID: uid` si existe |
| 4 | Backend: log explicit cuando se descarta webhook anonimo (con alerta Telegram opcional) | server.js L1641 | console.error mas visible + opcionalmente sendTelegramAlert para que veamos en produccion si pasa |

### Tier 2 — Pruebas operativas (no requieren codigo)

| # | Accion | Quien | Resultado esperado |
|---|--------|-------|---------------------|
| 1 | Verificar Subscription Group en Play Console (los 4 productos) | Escritorio via Chrome | Confirmar que estan agrupados o separados |
| 2 | Verificar License Response setting | Escritorio | Confirmar RESPOND_NORMALLY |
| 3 | Promover Build 24 a Closed Testing track (paralelo a Internal) | Fernando + Escritorio | Test cross-track |
| 4 | Test con cuenta tester NUEVA que nunca uso la app | Fernando crea + tester nuevo | Confirma si error es por estado de cuenta vieja o estructural |
| 5 | Test con cuenta NO-License-Tester con cargo real | Fernando (post Build 25) | Validacion end-to-end real, unica forma definitiva |

### Tier 3 — Investigacion externa adicional

| # | Accion | Resultado esperado |
|---|--------|--------------------|
| 1 | Esperar respuesta RC support (ticket enviado 15-may 03:00 AR) | Diagnostico server-side de RC |
| 2 | Buscar issues GitHub RevenueCat/purchases-android con "productNotAvailableForPurchaseError" + sandbox | Confirmar si es bug conocido y workarounds |
| 3 | Post en community.revenuecat.com con sintomas exactos | Respuesta comunidad |

---

## 7. RIESGOS DE NO TOCAR NADA

Si esperamos solo la respuesta de RC support y NO aplicamos Tier 1:

- Cuando RC finalmente responda y/o cuando hagamos compra con cargo real, el plan AUN no se actualizara automaticamente porque el flujo de identificacion del usuario esta roto.
- En produccion publica, cada usuario nuevo que compre quedara como `$RCAnonymousID` en RC dashboard, y el backend skip-eara su webhook.
- Imposible hacer customer support efectivo: si un usuario reporta "compre pero el plan no se activa", no podemos buscarlo en RC dashboard por uid Supabase.
- Imposible hacer dashboards de revenue real por usuario.

---

## 8. PROPUESTA FINAL

### Acciones inmediatas (mientras llega respuesta RC):
1. **Code investiga issues GitHub RevenueCat + community.revenuecat** (proxima sesion, 30 min max)
2. **Escritorio verifica Tier 2 items 1 y 2** via Chrome (10 min)
3. **Code prepara mockup de fix Tier 1 #1 y #2** en MOCKUP `.md` para validacion previa antes de tocar codigo

### Acciones medianas (post-Build 24 validation):
4. **Build 25** implementa Tier 1 completo (4 cambios) — coordinacion backend + frontend
5. **Validacion Build 25 en Samsung**: verificar que `Purchases.logIn` cambia el `app_user_id` en RC dashboard (debe pasar de anonimo a UUID Supabase)

### Acciones criticas (pre-lanzamiento):
6. **Test compra REAL con cargo** en cuenta NO-License-Tester, con TC real, en Build 25:
   - Comprar PRO Mensual $9.99 → confirmar cargo
   - Confirmar webhook en backend (logs Railway)
   - Confirmar `usuarios.plan` actualizado en Supabase
   - Cancelar la suscripcion + pedir reembolso a Google
7. Solo si paso 6 PASA → promover Build 25 a Produccion publica

---

## 9. ANEXO — Codigo propuesto para Tier 1 (DRAFT, requiere OK Escritorio)

### A. App.js — identificacion temprana si ya hay session

```javascript
useEffect(() => {
  (async () => {
    Purchases.setLogLevel(LOG_LEVEL.VERBOSE);
    if (Platform.OS === 'ios') {
      Purchases.configure({ apiKey: REVENUECAT_IOS_KEY });
    } else if (Platform.OS === 'android') {
      Purchases.configure({ apiKey: REVENUECAT_ANDROID_KEY });
    }
    // Build 25: si ya hay session activa al arranque, identificar user en RC
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.id) {
        await Purchases.logIn(session.user.id);
        console.log('[Purchases] logIn at boot with uid:', session.user.id);
      }
    } catch (e) {
      console.warn('[Purchases] logIn at boot failed:', e?.message);
    }
  })();
}, []);
```

### B. LoginScreen + SignupScreen — logIn despues de auth exitoso

En `LoginScreen.js` despues de `supabase.auth.signInWithPassword` exitoso:
```javascript
if (!error && data?.session) {
  const uid = data.session.user.id;
  try {
    await Purchases.logIn(uid);
    console.log('[Purchases] logIn post-login uid:', uid);
  } catch (e) { console.warn('[Purchases] logIn fallo:', e?.message); }
  // ... resto del flujo ...
}
```

Mismo patron en `SignupScreen.js` despues del `supabase.auth.signUp` exitoso.

### C. PerfilScreen logout — logOut antes de signOut

```javascript
const logout = async () => {
  try {
    // Build 25: limpiar identidad de Purchases antes del signOut
    try {
      await Purchases.logOut();
      console.log('[Purchases] logOut OK');
    } catch (e) { console.warn('[Purchases] logOut fallo:', e?.message); }
    await supabase.auth.signOut();
    await AsyncStorage.clear();
    Alert.alert(t('sesion_cerrada'), t('reinicia_app'));
  } catch (e) { ... }
};
```

### D. Backend webhook — alerta visible cuando se descarta anonimo

```javascript
if (!isUUID) {
  // Build 25: log ERROR (no warn) + opcional Telegram alert
  console.error(`[RevenueCat Webhook] CRITICO: app_user_id no es UUID: ${appUserId}. ` +
    `Event: ${event.type}, product: ${event.product_id}. ` +
    `Implica usuario anonimo en RC — backend NO puede actualizar plan. ` +
    `Verificar que el frontend llame Purchases.logIn(uid) post-login.`);
  // TODO: sendTelegramAlert si el evento es activacion (INITIAL_PURCHASE)
  return res.json({ ok: true, skipped: 'non-UUID app_user_id' });
}
```

---

## 10. CONCLUSION

Hay 2 bugs criticos de codigo NO identificados en sesiones anteriores que afectan estructuralmente la funcionalidad de suscripciones, **mas alla del problema sandbox/License Tester de RC**. Estos bugs no se ven en sandbox (porque License Tester nunca llega al webhook real), pero apareceran en el momento que se haga una compra real con cargo. Es **mandatorio fixearlos antes del lanzamiento a Produccion**.

Si Escritorio confirma el analisis y aprueba el plan Tier 1, podemos arrancar implementacion del Build 25 en paralelo al smoke test del Build 24 que esta haciendo Fernando ahora.

**Decision a definir entre Fernando + Escritorio + Code**:
- ¿Build 25 sale antes o despues de validacion completa Build 24?
- ¿Tier 1 entero en un commit o particionado (3 commits frontend + 1 backend)?
- ¿Tier 2 items 1 y 2 los hace Escritorio YA via Chrome o esperan Build 25 deployado?
