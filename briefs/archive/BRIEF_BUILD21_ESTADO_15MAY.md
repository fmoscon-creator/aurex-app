# BRIEF BUILD 21 — ESTADO TOTAL 15-may-2026 ~01:20 AR

Fuente de verdad operativa. Leer ANTES de proponer cualquier accion sobre Build 21, License Testers, RevenueCat o compras IAP.

---

## 1. ESTADO INFRAESTRUCTURA (verificado en este chat)

### Play Console
- **Build 17 (v1.0.17)** = PRODUCCION oficial Play Store (descarga publica)
- **Build 21 (v1.0.21)** = PRUEBA INTERNA, publicado 14-may 22:35 AR. Disponible para verificadores internos. 1 codigo de version.
- Builds 18 / 19 / 20: NO se subieron (estan solo en backup local)

### Samsung fisico R5CR92ADDNW
- Instalado: APK v1.0.21 sideload via `adb install -r` por USB (NO desde Play Store)
- Razon del sideload: Play Store sirve v1.0.17 al tester aurextester12@gmail.com aunque la cuenta esta en el opt-in de Prueba Interna y ve la app como BETA. La propagacion Internal Testing → Play Store falla para esta cuenta.

### Tester
- Email: `aurextester12@gmail.com`
- Login activo en Play Store del Samsung: SI
- Lista "AUREX Testers" en Play Console → Settings → License Testing: ACTIVADA (Escritorio confirmo X1 a las 03:54 AR)
- Esta cuenta + 2 mas (aurextest2 + aurextester1) figuran en la lista

### RevenueCat
- Offering activo: `aurex_default`
- 4 productos Android linkeados al offering (X2 resuelto por Escritorio 14-may 22:48 toast "Offering AUREX PLANS was updated"):
  - pro_monthly: `com.fernandomoscon.aurex.pro.monthly:monthly-pro`
  - pro_annual: `com.fernandomoscon.aurex.pro.annual:annual-pro`
  - elite_monthly: `com.fernandomoscon.aurex.elite.monthly2:monthly-elite`
  - elite_annual: `com.fernandomoscon.aurex.elite.annual:annual-elite`
- Logcat 01:02:58 confirma: `Requesting products` + `Retrieved productDetailsList` con `formattedPrice='US$ 19,99'` para elite.monthly2, base plan `monthly-elite`, offer token valido.

---

## 2. BUGS VERIFICADOS EN BUILD 21 SAMSUNG (sideload USB)

### Bug 1 — Compra IAP "not available for purchase" (P0 BLOQUEANTE REVENUE)
- Reproducible: 100% en PRO Mensual, PRO Anual, ELITE Mensual, ELITE Anual
- Texto literal Alert: "Error / The Product is not available for Purchase"
- Logcat: RevenueCat hace `Requesting products` y RECIBE `ProductDetails` OK con precio + offer token + subscription details completos. NO se ve log subsiguiente de BillingClient.launchBillingFlow ni de transaccion fallida — el error sale antes del flow real de billing.
- Causa NO confirmada todavia. Sospecha alta: estado de los productos en Play Console (ver Seccion 4).

### Bug 2 — Modal Agregar Activo: boton Guardar tapado por teclado
- Reproducible: 100%
- Fix aplicado en Build 21 (ScrollView keyboardShouldPersistTaps + returnKeyType + Keyboard.dismiss antes de saveAsset)
- Resultado smoke test Fernando: insuficiente. Boton sigue oculto bajo el teclado.
- Pendiente Build 22: boton Guardar STICKY fijo abajo del modal, fuera del ScrollView.

### Bug 3 — Contador secciones Alertas muestra denominador descontando bloqueados
- Build 21 actual: muestra "4/4" cuando hay 1 alerta bloqueada por plan
- Fernando quiere: denominador ABSOLUTO "4/5"
- Pendiente Build 22.

### Bug 4 — AlertCreateModal rebote "Pasate a ELITE" injustificado
- Reproducible: configurar alerta en campana de activo, tocar "Crear alerta de precio" → POP "Limite plan PRO Pasate a ELITE"
- Causa: frontend envia `tipo: 'precio'` pero PLAN_LIMITS.FREE espera `'precio_objetivo'` o `'umbral'`. Backend lee como tipo fuera del plan → 403.
- Fix pendiente Build 22: mapear `'precio'` → `'precio_objetivo'`, `'porcentaje'` → `'variacion_brusca'`.

### Bug 5 — AI tap candado RSI/MACD: POP error + pantalla detras mal renderizada
- Reproducible: en AI, tap activo, tocar candado de Analisis Tecnico RSI/MACD → POP error + atras se ve pantalla "Elige tu plan FREE $" igual de mal que en emulador
- Causa probable: same ConfigurationError ya resuelto vs renderizado de fallback. Necesita re-test con logcat fresco post X2.
- Diagnostico pendiente Build 22.

### Bug 6 — Banner UpsellBanner Portfolio
- Pendiente agregar el banner debajo de Valor Total en Portfolio
- Es feature, no bug.
- Pendiente Build 22.

### Bug 7 — SubscriptionScreen Alert.alert genérico
- Cuando falla compra, muestra "Error / [texto generico]" sin el mensaje real del SDK.
- Fix pendiente Build 22: `Alert.alert('Error', e.message || 'Error desconocido')` para superficiar BillingResponse real.

---

## 3. LO QUE NO SE PUEDE TESTEAR VIA PLAY STORE EN ESTA SESION

Razon: la cuenta `aurextester12@gmail.com` esta logueada en Google Play del Samsung, ve la app como BETA, pero al instalar/actualizar Play Store le sirve **v1.0.17** (Produccion) en vez de **v1.0.21** (Prueba Interna). Es problema de propagacion Internal Testing → Play Store para esa cuenta, no de la subida del AAB (la subida esta hecha desde 14-may 22:35).

Como consecuencia NO se puede testear desde Play Store, sin sideload USB:
- Todo el flow nuevo de SignupScreen + auth.signUp + POST `/api/usuario` Capa 1+2 self-heal
- Onboarding 2 botones (Build 21) vs 3 botones (Build 17)
- Gating UI por plan actualizado (Pulse Ver variables tiering, banners IA, contador alertas, PlanLimitModal X + Ahora no contraste)
- Modal Agregar Activo con ScrollView + keyboardShouldPersistTaps
- Bug compra IAP de Seccion 2 NO se puede validar como usuario real Play Store en esta sesion.

Como consecuencia, el bug de compra REQUIERE que algun otro tester o flujo distinto al sideload pueda comprar para confirmar si es solo del sideload o si tambien afectaria al usuario real. **Hipotesis pendiente de validar**: la compra falla incluso desde Play Store si el problema esta en estado de productos en Play Console (Seccion 4). Si el problema esta solo en el sideload, comprar desde Play Store funcionaria.

---

## 4. AJUSTE SUGERIDO INMEDIATO — PRODUCTOS EN PLAY CONSOLE

Accion para Escritorio (puede hacerlo via Chrome ya):

Path: Play Console → AUREX → Monetizar → Productos → **Suscripciones**

Para cada uno de los 4 productos:
1. `com.fernandomoscon.aurex.pro.monthly`
2. `com.fernandomoscon.aurex.pro.annual`
3. `com.fernandomoscon.aurex.elite.monthly2`
4. `com.fernandomoscon.aurex.elite.annual`

Verificar y reportar:
- **Estado del producto**: ¿Activo o Inactivo?
- **Base Plan**: ¿existe? ¿esta Activo?
- **Ofertas**: ¿tiene al menos una oferta? ¿esta Activa?
- **Region/Pais**: ¿incluye Argentina o esta restringido?

Si alguno aparece como Inactivo, Draft, Sin base plan o Sin oferta → ese es el bug del IAP. Activar y reportar.

Si los 4 estan Activos con base plan + oferta activos → el bug es de otra capa (License Tester pero para Subscriptions, region, o algo mas profundo) y requiere debug nuevo.

---

## 5. AJUSTE SUGERIDO PARA PROPAGACION INTERNAL TESTING → PLAY STORE

Problema: aurextester12 ve BETA pero descarga v1.0.17.

Causas posibles a chequear:
a. Cache de Play Store del telefono — desinstalar AUREX completa + limpiar cache Play Store + reinstalar desde el link de tester.
b. La cuenta no completo el opt-in del link Internal Testing (paso "Become a tester" + acceder al link de Play Store dentro del programa).
c. Listas separadas: la cuenta esta en License Testing pero no en la lista de testers de la track Internal Testing (son listas DISTINTAS — License Testing autoriza compras a $0, la track de Internal Testing autoriza recibir builds beta).

Accion para Escritorio: Play Console → Prueba → Prueba Interna → Verificadores → confirmar que `aurextester12@gmail.com` figura en la lista de testers del track, no solo en License Testing.

---

## 6. AJUSTES PENDIENTES BUILD 22 (codigo)

1. Modal Agregar Activo: boton Guardar STICKY fijo abajo, fuera del ScrollView (PortfolioScreen.js)
2. Contador secciones Alertas: denominador absoluto sin descontar bloqueados (AlertasScreen.js L582)
3. AlertCreateModal: mapeo `'precio'` → `'precio_objetivo'`, `'porcentaje'` → `'variacion_brusca'` (verificar callsite en componente que abre el modal desde campana)
4. SubscriptionScreen: `Alert.alert('Error', e.message || ...)` para superficiar mensaje real (SubscriptionScreen.js handler de compra)
5. Banner UpsellBanner Portfolio debajo de Valor Total (PortfolioScreen.js)

NO compilar Build 22 hasta que (a) bug compra IAP este diagnosticado y resuelto en Play Console + (b) Escritorio de OK explicito al sprint.

---

## 7. REGLAS QUE NO SE PUEDEN VIOLAR (lecciones de este chat)

- **NO proponer subir Build 19, 20 o 21 a Play Console**. Build 21 YA esta en Prueba Interna desde 14-may 22:35. Si Code propone subirlo otra vez, esta inventando.
- **NO confundir Build 17 con "Internal Testing"**. Build 17 es PRODUCCION publica. La Prueba Interna es Build 21.
- **NO proponer que el sideload "bloquea compras IAP"** sin antes verificar estado productos Play Console + propagacion Internal Testing. La causa real puede ser otra y proponer sideload como villano principal es deduccion incompleta.
- **License Testing != Tester Track Internal Testing**. Son listas distintas en Play Console.

---

## 8. DIAGNOSTICO CERRADO 15-may 01:35 AR — CAUSA RAIZ CONFIRMADA

Bug compra IAP causado por **mismatch de firmas** entre APK sideloaded y App Signing Key de Google Play. Verificado por Escritorio via Play Console → Integridad de la aplicacion:

- **Upload Key SHA-1** (con la que Code firma local + APK sideloaded en Samsung): `05:E5:00:49:51:A0:4E:0E:11:54:0B:52:02:E6:7C:14:D8:E5:F0:E9`
- **App Signing Key SHA-1** (con la que Google re-firma el AAB antes de servirlo via Play Store): `54:DF:D1:42:BD:1F:49:1C:A0:ED:D5:30:A4:AD:FE:60:A5:98:60:B7`

Play App Signing esta ACTIVO. Las dos firmas son distintas (confirmado). Google Play Billing valida la firma del paquete instalado contra la App Signing Key. El APK sideloaded por `adb install -r` esta firmado con la Upload Key → Billing rechaza con "product not available for purchase".

NO es bug del codigo. NO es bug de Play Console productos (los 4 base plans estan Activos en 174 paises). NO es bug de License Testing (lista activada). Es la limitacion estructural de Play App Signing + sideload.

**Productos confirmados Activos por Escritorio (Play Console → Monetizar → Suscripciones)**:
- PRO Mensual — base plan "monthly-pro": Activo, 174 paises, sin ofertas separadas
- PRO Anual — base plan "annual-pro": Activo, 174 paises, sin ofertas separadas
- ELITE Mensual — base plan "monthly-elite": Activo, 174 paises, sin ofertas separadas
- ELITE Anual — base plan "annual-elite": Activo, 174 paises, sin ofertas separadas

## 8.A — ESTADO TICKET REVENUECAT (15-may 02:50 AR)

**ENVIADO 15-may ~03:00 AR** via formulario "Get help" del RC dashboard. Confirmacion en pantalla: "Your message has been sent. We'll get back to you as soon as possible."

Texto final en `briefs/TICKET_REVENUECAT_FINAL_15MAY.md`. Datos clave:
- RC App ID: `app8be7db09a7`
- Project ID: `proj228caf37`
- 11 hipotesis descartadas listadas
- 5 screenshots adjuntos: Offerings + App config + Play Console Suscripciones + License Testing + 1 extra agregada por Escritorio

Respuesta esperada: hasta 2 dias habiles en `fmoscon@gmail.com`.

## 9. UNICO CAMINO PARA RESOLVER — DESTRABAR PROPAGACION INTERNAL TESTING → PLAY STORE

La solucion estructural es que aurextester12 reciba v1.0.21 desde Play Store (firma App Signing Key correcta). Hoy Play Store le sirve v1.0.17 (Produccion) aunque la cuenta es Beta tester.

Hipotesis pendiente de validar con Escritorio: la cuenta NO esta en la lista de testers del track Prueba Interna (que es DISTINTA de la lista License Testing que ya esta activada).

Path Play Console: AUREX → Prueba → Prueba Interna → pestania "Verificadores".

Validar y reportar:
1. ¿Existe una lista de testers asociada al track Prueba Interna?
2. ¿aurextester12@gmail.com figura ahi?
3. ¿Cual es el link de opt-in del track (tipo `https://play.google.com/apps/internaltest/...`)?

Si la cuenta NO esta → agregarla + Fernando acepta opt-in en el link + Play Store deberia empezar a servir v1.0.21 → instala desde Play Store → compra funciona.

Si la cuenta YA esta → el problema es cache de Play Store del telefono o algun delay de propagacion. Limpiar cache Play Store + Force Stop + reintentar.
