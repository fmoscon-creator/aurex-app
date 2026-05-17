# SESSION ACTIVE — Escritorio (Claude Desktop + Chrome)

URL fija: https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/SESSION_ACTIVE_ESCRITORIO_CHROME.md

Ultima actualizacion: 15-may-2026 ~01:20 AR — Build 21 publicado en Prueba Interna desde 14-may 22:35. Sesion abierta. Bug compra IAP P0 sin resolver.

---

## ESTADO REAL (sin invento)

### Versiones canonicas
- **Build 17 (v1.0.17)** = PRODUCCION publica Play Store. Es lo que descarga cualquier usuario. Tambien lo que recibe el tester aurextester12 al instalar/actualizar via Play Store.
- **Build 21 (v1.0.21)** = PRUEBA INTERNA Play Console, publicado 14-may 22:35 AR. Disponible para verificadores internos. 1 codigo de version.
- Builds 18 / 19 / 20: solo backup local, no subidos a Play Console.

### Samsung fisico
- ID: R5CR92ADDNW
- Instalado: v1.0.21 via `adb install -r` por USB (sideload, NO desde Play Store)
- Cuenta Play Store: aurextester12@gmail.com (license tester confirmado)

### Por que sideload
Play Store sirve v1.0.17 al tester aurextester12 aunque la cuenta ve la app como BETA. La propagacion Internal Testing → Play Store no entrega v1.0.21 a esa cuenta. Por eso Fernando instala por cable.

---

## QUE YA ESTA HECHO

- AAB Build 21 compilado y subido a Prueba Interna Play Console (14-may 22:35).
- License Testing lista "AUREX Testers" ACTIVADA por Escritorio (X1, 14-may 03:54). Lista incluye aurextester12@gmail.com + aurextest2 + aurextester1.
- RevenueCat offering aurex_default: 4 productos Android linkeados (X2, 14-may 22:48). Toast confirmado.
- Logcat Samsung 15-may 01:02:58 confirma que RevenueCat retrieva ProductDetails OK para los 4 productos (incluyendo elite.monthly2 con precio USD 19,99, base plan monthly-elite, offer token valido).

---

## BUG P0 ABIERTO — COMPRA IAP

Sintoma: en Samsung Build 21 sideload USB, tocar PRO Mensual o ELITE Mensual (o anuales) → POP "Error / The Product is not available for Purchase". Reproducible 100% en los 4 planes.

Logcat: RevenueCat hace `Requesting products` y RECIBE `ProductDetails` correcto. NO se ve BillingClient.launchBillingFlow ni response code de Google Play. El error sale antes de iniciar el flow de billing real.

Hipotesis a validar (en orden de probabilidad):

### Hipotesis 1 — Productos en Play Console Inactivos o sin base plan/oferta activa
Accion Escritorio via Chrome:
Path: Play Console → AUREX → Monetizar → Productos → **Suscripciones**

Para cada uno de los 4 productos, reportar:
- Estado del producto: Activo / Inactivo
- Base plan: existe, esta Activo
- Ofertas: existe al menos una, esta Activa
- Region/pais: incluye Argentina o esta restringido

IDs a verificar:
- `com.fernandomoscon.aurex.pro.monthly`
- `com.fernandomoscon.aurex.pro.annual`
- `com.fernandomoscon.aurex.elite.monthly2`
- `com.fernandomoscon.aurex.elite.annual`

### Hipotesis 2 — Cuenta tester no esta en la track Internal Testing
Path: Play Console → Prueba → Prueba Interna → Verificadores
Confirmar que `aurextester12@gmail.com` figura en la lista de testers del TRACK (la lista que autoriza recibir la beta es DISTINTA de la lista de License Testing que autoriza compras a $0).

---

## QUE NO SE PUEDE TESTEAR EN ESTA SESION

Razon: la cuenta aurextester12 recibe v1.0.17 via Play Store aunque ve la app como BETA → propagacion Internal Testing → Play Store fallando para esa cuenta. Sin esa propagacion solo se testea sideload USB, y la sideload tiene su propio set de incertidumbres en compras IAP.

Lo NO validado desde Play Store:
- SignupScreen + flow auth nuevo (Capa 1+2 self-heal)
- Onboarding 2 botones
- Gating UI plan actualizado (Pulse Ver variables tiering, banners IA, contador alertas, PlanLimitModal)
- Modal Agregar Activo con ScrollView
- Fix RevenueCat post X2 en flujo real Play Store

Para destrabar la propagacion: ver Hipotesis 2 mas arriba + considerar limpiar cache Play Store del telefono + reinstalar desde link de tester.

---

## REGLAS QUE NO ROMPER (lecciones de este chat)

1. NO proponer subir el AAB Build 21 a Play Console — YA esta en Prueba Interna desde 14-may 22:35.
2. Build 17 es PRODUCCION, no Internal Testing. Internal Testing es Build 21.
3. License Testing y la lista de testers de la track Internal Testing son LISTAS DISTINTAS en Play Console.
4. NO afirmar diagnostico unico (ej. "es el sideload") sin antes verificar estado productos + lista testers track.

---

## QUE NECESITAMOS DE ESCRITORIO

1. Reporte de Hipotesis 1 (estado 4 productos Suscripciones en Play Console)
2. Reporte de Hipotesis 2 (aurextester12 en track Internal Testing)
3. Si Hipotesis 1 muestra producto Inactivo / sin base plan / sin oferta → activar y avisar.

Con eso decidimos si:
- Causa A producto Inactivo → activar y retry
- Causa B cuenta no en track → fix lista tester
- Causa C otra cosa → debug nuevo con datos concretos

---

## QUE NO HACER

Fernando NO autoriza compilar Build 22 hasta cerrar el bug P0 de compra IAP. Los 5 fixes de codigo identificados (Modal Agregar Activo sticky, contador alertas absoluto, AlertCreateModal mapeo tipos, SubscriptionScreen e.message real, UpsellBanner Portfolio) quedan en cola hasta resolver IAP.

---

## CARPETA BRIEFS

Path local: /Users/fernandomoscon/Desktop/aurex-app/briefs/

- BRIEF_BUILD21_ESTADO_15MAY.md (NUEVO — fuente de verdad operativa Build 21)
- BRIEF_AUREX_LATEST.md (general)
- SESSION_ACTIVE_ESCRITORIO_CHROME.md (este archivo)

SESION ABIERTA.
