# 🌟 BRIEF MAESTRO AUREX — Estado vivo del proyecto

> **Archivo único de seguimiento.** Reemplaza los múltiples briefs sueltos. Se actualiza con cada hito.
> **NO bump de nombre** (sin `_v1`, `_17MAY`). La historia vive en `git log`.
> **Última actualización:** 19-may-2026 ~06:30 AR (cierre nocturno sesión maratónica)
> **Última actualización significativa:** Sesión 19-may madrugada — **7 frentes Landing v3 cerrados** (A reorder + B banner 0.b1 Mercados/Futuros LIVE + C modales centrados/negro -35% + D Motor 24 tooltips 24 chips × 8 idiomas + E cards Alertas modal-capturas + F More cards recortadas 4:5 + G footer logos color reales + mail real). **18 commits push** a aurex-app. **800+ traducciones i18n nuevas** (keys EN 270 → 349). Plus **🚨 NUEVO bug detectado**: fmoscon@gmail.com bajó solo a PLAN FREE en mobile (iPhone TestFlight v1.0.24 + Android v1.0.36) — fix inmediato override Supabase a ELITE aplicado, causa raíz pendiente investigar mañana. **Status Build 36 Google review**: aún en revisión (esperado próximas horas), Build 33 sigue activo en Producción.
> **URL canónica para Escritorio:** `https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/BRIEF_MAESTRO_AUREX.md`

---

## 0. CÓMO USAR ESTE BRIEF

- **Fernando + Escritorio** abren este archivo y saben el estado actual de TODOS los frentes.
- **Code** lo actualiza cada vez que cambia algo material — no cada hora, no cada commit menor.
- Para profundidad técnica de cada frente → ver §10 "Archivos de referencia" (briefs específicos detallados).
- Para historia de cambios al brief → `git log briefs/BRIEF_MAESTRO_AUREX.md`.

---

## 1. RESUMEN EJECUTIVO — todos los frentes en 1 tabla

| Frente | Estado | Próxima acción | Bloqueante externo |
|---|---|---|---|
| 🍎 **Apple Build 17 iOS** | 🟡 Re-submission EN COLA Apple Review (solo marca AUREX LIVE) | Esperar respuesta Apple — NO distribuir aunque apruebe (Manual Release OFF) | Respuesta Apple Review |
| 🚨🍎 **iOS Build 25 → TestFlight** | 🟢 **TODOS PRE-REQUISITOS CUMPLIDOS** (IAP Android Build 36 ✅) — **TOP PRIORIDAD ABSOLUTA MAÑANA 20-may** según Fernando | Compilar + validar 15 items (7 fixes nuevos + 8 históricos) — ver `PENDIENTES_PROXIMA_SESION_20MAY.md` sección 0 | NO requiere aprobación Build 17 ni Build 36 prod — TestFlight es flujo independiente |
| 🤖 **Android Build 33 producción** | 🟢 ACTIVO Play Store hasta aprobación Build 36 (20 instalaciones, 177 países) | Sin acción — será reemplazado automáticamente por Build 36 al aprobar Google | Aprobación Google Build 36 |
| 🤖 **Android Build 35 Internal Testing** | ⏹ Superado por Build 36 (Internal Testing también ya en Build 36 desde 18-may 17:17 AR) | Sin acción — quedó como histórico | — |
| 🤖 **Android Build 36 v1.0.36** | 🟡 **EN REVISIÓN GOOGLE PLAY → PRODUCCIÓN** (enviado 18-may noche AR) | Esperar aprobación (2-24h estimado). Build 33 sigue activo hasta entonces | Aprobación Google |
| 🤖 **Track Alpha (Prueba cerrada)** | 🟡 31,58% testers en v1.0.17 vieja (sin Bug G fix logout, sin IAP, sin Tier 1) | **PASO 2 cuando Google apruebe Build 36 Producción:** subir el mismo AAB al track Alpha | Aprobación Google Build 36 Producción |
| 🎉 **IAP / RevenueCat ticket #76809** | ✅ **RESUELTO 18-may 17:30 AR con Build 36 (rebuild limpio + 4 fixes)** | Cancelar suscripción ELITE test + cerrar ticket RC | — |
| 🛡️ **Play Console Política Privacidad + Data Safety** | ✅ CORREGIDO 18-may (Privacy URL → `/docs/privacy.html` + cuestionario Data Safety completado, ambos por Escritorio) | Sin acción — en revisión junto a Build 36 | Aprobación Google |
| 🚨 **Bug PLAN FREE forzado mobile (19-may 06:00 AR)** | 🟡 **Override aplicado** (Supabase fmoscon → ELITE) — causa raíz NO investigada | Mañana: investigar webhook RC EXPIRATION + bug "FREE no permite 5 alertas básicas" | Backend logs + RC dashboard |
| 🎨 **Landing v3** | 🟢 7 frentes cerrados sesión 19-may madrugada (A reorder + B banner 0.b1 + C modal/negro + D Motor 24 tooltips + E Alertas modal + F More recortadas + G footer color) | Mañana: fondos/imágenes reales + skill high-end-visual-design | OK Fernando |
| 🎨 **Landing v3 aurex.live** | 🟡 PENDIENTE OK visual Fernando + Escritorio | Fernando abre 2 PNG + decide | Doble OK |
| 📋 **Plan MKT v3** | ⏸ NO arrancado | Bloqueado hasta landing v3 live | Landing v3 deploy |
| 🌐 **PWA aurex.live** | 🟢 Live, fase 0 reorg ejecutada | Será reemplazada por landing v3 al deploy | — |
| ⚙️ **Backend Railway** | 🟢 OK | Sin acción inmediata | — |

---

## 2. APPLE iOS — Build 17

### 2.1 Datos clave

| Campo | Valor |
|---|---|
| Versión | 1.0 (17) |
| Bundle ID | `com.fernandomoscon.aurex` |
| Apple Team ID | `TX7C2F79U9` |
| Submission ID activo | `e0e7fb35-11a4-4c1d-854c-60a80c4799e6` |
| Manual Release | **OFF** (no se distribuye si Apple aprueba) |
| Cuenta demo reviewer | `app.aurex@gmail.com` / `AurexTest2026!` |

### 2.2 Cronología

| Fecha (AR) | Evento |
|---|---|
| 24-abr-2026 05:24 | Submit original Build 17 |
| 15-may 18:31 | **Apple RECHAZÓ** — Guideline 4.1(c) Copycats — nombre "AUREX AI" confundible con `aurex.ai` |
| 16-may 02:00 | Fernando aprobó Opción D-modificada (cambio "AUREX AI" → "AUREX LIVE" + Manual Release OFF) |
| 16-may PM | Escritorio aplicó cambios 12 superficies App Store Connect, subió PDF Namecheap, pegó reply argumentada |
| 16-may 03:30 AR | Re-submission enviada, EN COLA Apple Review |
| **17-may 13:12 AR** | Sin novedades, sigue en cola |

### 2.3 Inventario 12 superficies App Store Connect (status post-cambios)

| # | Superficie | Cambio aplicado |
|---|---|---|
| 1 | App Name | ✅ AUREX AI → **AUREX LIVE** |
| 3 | Description | ✅ "AUREX AI engine" → "AUREX engine" |
| 8 | IAP Grupo "Nombre app" | ✅ AUREX AI → **AUREX LIVE** |
| 11 | App Review Notes | ✅ Reply argumentada + adjunto Namecheap (Order #198745654) |
| 2, 4, 5, 6, 7, 9, 10, 12 | Otras superficies | OK sin cambio o verificación visual hecha |

### 2.4 Pendientes Apple

1. **Esperar respuesta Apple** (24-72h típico, hasta 7 días por historial AUREX).
2. Si **aprueba** → NO distribuir (Manual Release OFF). Build 17 queda "approved-no-distribuido". Después se reemplaza por Build 25 iOS cuando IAP funcione en Android.
3. Si **rechaza otra vez** → análisis cruzado Code + Escritorio, iterar.
4. Si **>72h sin respuesta** → preparar Expedited Review Request.

### 2.5 Riesgos abiertos

| Riesgo | Probabilidad | Mitigación |
|---|---|---|
| Apple rechaza por mismo motivo | Baja | 12 superficies cambiadas + reply + comprobante Namecheap |
| Apple objeta OTRA cosa | Media | Sin garantía, monitorear |
| Apple tarda >72h | Media | Expedited Review Request preparado |
| iOS Build 25 cuando llegue su turno: 19+ días queue | Alta | Monitorear, pedir Expedited si >72h |

---

## 2.6 ESTRATEGIA SECUENCIAL iOS — Build 17 → Build 25 → Producción

### Estado actual de la estrategia

Build 17 NO fue compilado para ir a producción tal como está. Fue submitted, rechazado por la marca "AUREX AI", y re-submitted con la marca cambiada a "AUREX LIVE". **El único motivo del re-submit fue validar la marca con Apple.** Build 17 NO tiene features modernas (push, telegram, persistencia sesión, candados completos, "Cómo usar AUREX", etc.).

**Decisión estratégica vigente (Fernando + Escritorio + Code):**
- Marcamos **Manual Release OFF** en el re-submit. Si Apple aprueba, **NO publicamos automáticamente**.
- Build 17 queda como **referencia "approved-no-distribuido"** — sirve solo para confirmar que la marca está aprobada y sin observaciones pendientes.
- Recién con esa confirmación, compilamos **Build 25 iOS** con TODOS los fixes (lista §2.7).
- Build 25 va primero a **TestFlight Internal Testing** para validación nuestra (Fernando en iPhone real).
- Si TestFlight OK → Submit a Apple Review como versión nueva 1.0.25.
- Si Apple aprueba Build 25 → **ESE es el que va a producción** (no Build 17).
- Build 17 queda archivado "approved-no-distribuido".

### Flujo completo paso por paso

| Paso | Quién | Acción | Pre-requisito |
|---|---|---|---|
| 1 | Apple | Responder re-submission Build 17 (marca AUREX LIVE) | — |
| 2 | Fernando + Escritorio | Si Apple APRUEBA → confirmar que NO hay otras observaciones | Apple respondió |
| 3 | Fernando + Escritorio | Si Apple RECHAZA otra vez → analizar nuevo motivo + iterar metadata | Apple respondió |
| 4 | Code + Fernando | Solo si marca aprobada Y sin observaciones extra → compilar Build 25 iOS con todo §2.7 | Paso 2 OK + IAP funcionando en Android producción (§3 + §4) |
| 5 | Fernando | Subir Build 25 a TestFlight Internal Testing | Build 25 compilado |
| 6 | Fernando | Validar Build 25 en iPhone real (Fernando) — todos los items §2.7 | TestFlight subido |
| 7 | Fernando | Si TestFlight OK → Submit Build 25 a Apple Review como versión 1.0.25 | Paso 6 OK |
| 8 | Apple | Revisar Build 25 (típico 19+ días por historial) | — |
| 9 | Fernando | Si Apple aprueba Build 25 → **Manual Release → publicar a producción** | Apple respondió OK |

### Por qué esta secuencia y no compilar Build 25 ahora directamente

- Mandar Build 25 con tantos cambios sin tener la marca pre-aprobada → riesgo de rechazo doble (marca + alguna feature nueva).
- Mandar Build 25 sin IAP funcionando → desperdiciar slot de review (19+ días) por algo que después no se puede vender.
- Esta secuencia **separa el riesgo "marca" del riesgo "features"** — primero validamos marca con un build mínimo (17), después subimos el build con todo (25).

---

## 2.7 CONTENIDO PENDIENTE Build 25 iOS (paridad Android 1.0.33 + IAP)

> Lo que sigue es la **lista de qué tiene que tener Build 25 iOS antes de subir a TestFlight.**
> Hoy NO profundizamos en cada item — cuando llegue el momento, Code + Escritorio cruzan cada uno con el código real de Android v1.0.33 producción para garantizar paridad exacta.

### Pre-requisito ABSOLUTO antes de compilar Build 25 iOS — ✅ CUMPLIDO

🟢 **IAP Android Build 36 funcionando** (validado 18-may 17:30 AR con compra real ELITE Samsung fmoscon) ✅
🟢 **TestFlight = flujo INDEPENDIENTE**: NO requiere aprobación Build 17 Apple Review producción ni Build 36 Google Producción. Aclaración explícita Fernando 19-may 07:00 AR.

**→ Build 25 iOS TestFlight HABILITADO para compilar 20-may como TOP PRIORIDAD ABSOLUTA.**

### Items pendientes Build 25 iOS

| Categoría | Detalle |
|---|---|
| **Marca / metadata** | AUREX LIVE consistente en todas las superficies App Store Connect (debe estar ya hecho cuando Apple apruebe Build 17). Limpiar `src/lib/i18n.js` L145 + L257 ("AUREX AI" / "AUREX IA"). Cambiar `ios/AurexApp/Info.plist` `CFBundleDisplayName = AUREX → AUREX LIVE`. |
| **Persistencia sesión** | Evitar deslogueo del dispositivo. Paridad Android: cold reboot, force-stop 90s, background 90s, vuelve sin pedir login. |
| **Push notifications iOS** | APNS wired y funcionando. Build 18 iOS intentó esto y falló por RNSVG vtable — pendiente resolver Podfile + pod install. |
| **Telegram alerts** | Wiring real de alertas operativas vía Telegram (paridad Android backend). |
| **Restricciones features por plan** | FREE / PRO / ELITE — tier limits aplicados en Portfolio, Mercados, Watchlist, IA, Alertas. Funcionamiento real, no decorativo. |
| **Candados visibles** | Lock icons + mensajes "Disponible en PRO/ELITE" en features bloqueadas. PlanLimitModal con copy específico (PRO vs ELITE) según el feature tocado. |
| **Tab Perfil "Cómo usar AUREX"** | Tutorial in-app dentro del tab Perfil. Paridad Android. |
| **Signup nativo** | Flujo SignupScreen funcionando + auth.signUp + POST /api/usuario Capa 1 (try/catch optimistic) + Capa 2 self-heal en usePlan. Bug P0 signup ya resuelto en Android Build 21. |
| **Onboarding 2 botones** | Slide 4 con "Crear cuenta gratis" → SignupScreen + "Ya tengo cuenta" → LoginScreen. Antes eran 3 botones cableados todos a Login. |
| **Bugs UI corregidos** | Bug H Modal Agregar Activo (teclado tapaba botón Guardar) + Bug I doble tap + cualquier bug acumulado en Android Build 33 que aplique también a iOS. |
| 🚨 **IAP funcionando** (PRO/ELITE Apple in-App Purchase) | **CRÍTICO** — cobro de planes vía Apple IAP + RevenueCat. Sin esto Build 25 no sale a producción. Depende de que Tier 1 IAP esté validado en Android + Plan B si RC nunca responde. Ver §4. |
| **Bump versiones** | `ios/AurexApp.xcodeproj/project.pbxproj`: `CURRENT_PROJECT_VERSION 24 → 25` y `MARKETING_VERSION 1.0 → 1.0.25`. |
| **Podfile + pod install** | `cd ios && pod install` validar que compile (Build 18 había problemas con RNSVG vtable — pendiente resolver). |

### Profundización pendiente

Cuando llegue el momento de compilar Build 25 iOS (después de Apple aprobar Build 17 + IAP funcionando en Android), **Code + Escritorio cruzan cada item de la tabla anterior contra el código real Android v1.0.33 producción** (`~/AurexApp/` branch `dev`, commit `c990612`) para garantizar paridad exacta — no asumir que algo funciona "como en Android" sin validarlo en el código.

---

## 3. ANDROID — Builds 33 / 34 / 35 / 36

### 3.1 Estado real reconciliado (actualizado 18-may 23:00 AR con envío Play Console Producción)

| Build | Estado real | Contenido | Evidencia |
|---|---|---|---|
| **33 / v1.0.33** | 🟢 **ACTIVO PRODUCCIÓN Play Store** hasta aprobación Build 36 | Bug H fix (selectedRow + ScrollView). 20 instalaciones, 177 países. **SIN** fix IAP, **SIN** fix toolbar S24, **SIN** fix crash ScreenFragment. | Confirmado Escritorio + commit `c990612` (16-may) |
| **34 / v1.0.34** | 🟡 Solo commit, NUNCA subido a Play | IAP Tier 1 wiring frontend (Purchases.logIn/logOut) | commit `cd2f1dc` (16-may) — Escritorio no lo ve en Play Console |
| **35 / v1.0.35** | ⏹ Superado por Build 36 | Intento de fix IAP que **NO funcionó** (mismo bug "producto no disponible"). Disparó el ticket RC #76809 que terminó resolviéndose con Build 36. | Histórico |
| **36 / v1.0.36** | 🟡 **EN REVISIÓN GOOGLE PLAY → PRODUCCIÓN** (enviado 18-may noche AR). También activo en Internal Testing desde 18-may 17:17 AR (donde se validó el fix IAP con compra real). | Bug IAP RESUELTO (purchaseProduct → navigate Subscription) + IAP-6 orden + Alert debug revertido + `./gradlew clean` + version bump 35→36. **PENDIENTE en Build 36:** crash ScreenFragment + toolbar S24 (no se incluyeron por urgencia de cerrar IAP). | commits `66662cd` (privado) + `647ff7a` (snapshot público) — 18-may |

### 3.1.b 🚀 Estado Play Console — 4 cambios EN REVISIÓN GOOGLE (enviado 18-may noche AR)

Fernando envió los **4 cambios al review de Google** desde Play Console el 18-may por la noche AR. Mensaje literal de Play Console: *"Cambios en la etapa de revisión — Tus cambios están en proceso de revisión. Es posible que encontremos problemas adicionales cuando revisemos tu app."* ETA aprobación: **2-24 horas** (estimado Escritorio + experiencia previa Build 33).

| # | Cambio | Estado pre-envío | Origen del bloqueo |
|---|---|---|---|
| 1 | **Build 36 v1.0.36 → Producción** | Internal Testing OK → Promovido a Producción | Resolución bug IAP §4.0 |
| 2 | **Prueba cerrada Alpha → Pausar segmento** | Activo → Solicitud pausa (formalización para que Google no lo cuente como track separado durante esta review) | Limpieza tracks |
| 3 | **Política de Privacidad URL** | `https://aurex.live/privacy.html` (HTTP 404 → Google rechazó) → corregido a `https://aurex.live/docs/privacy.html` | Rechazo Google 18-may. Doble fix aplicado: (a) Escritorio cambió URL en Play Console; (b) Code creó `aurex-app/privacy.html` redirect HTML (`<meta http-equiv="refresh">` + `window.location.replace('/docs/privacy.html')`) para que el path viejo no devuelva 404 a usuarios o crawlers que tengan el link cacheado. |
| 4 | **Seguridad de los datos (Data Safety)** | Cuestionario incompleto → Completado por Escritorio | Rechazo Google 18-may |

**Mientras Google revisa:** Build 33 sigue activo en Producción para los usuarios. Cero impacto.

**Cuando Google apruebe (esperado próximas 24h):** Build 36 reemplaza a Build 33 en Producción automáticamente. **Acción de Code post-aprobación:** ejecutar Paso 2 (§3.1.c).

### 3.1.c 📋 PASO 2 PENDIENTE — Subir Build 36 al track Alpha (Prueba cerrada)

**Por qué importa:** el track **Alpha** (Prueba cerrada) tiene actualmente **31,58% de las instalaciones de testers en v1.0.17** (versión vieja de abril). Esa versión **no tiene**:
- Bug G fix logout (los usuarios se deslogueaban solos a los pocos minutos)
- Push notifications nativas funcionando
- IAP funcionando (mismo bug §4.0)
- Tier 1 IAP (Purchases.logIn/logOut sincronizados con Supabase)
- 35 features posteriores acumuladas entre Build 17 y Build 36

Fernando textual: *"es CLAVE que esos TESTERS tengan la APP sin que se les desloguee con Alertas PUSH y con posibilidad de comprar planes si quieren"*.

**Cómo se ejecuta:**
1. **Pre-requisito**: Google aprobó Build 36 en Producción (Build 33 dejó de ser activo y v1.0.36 ya se distribuye).
2. **Acción en Play Console**: Reusar el mismo AAB de Build 36 (no compilar Build 37) y subirlo al track **Prueba cerrada — Alpha**.
3. **Resultado esperado**: los testers Alpha que tengan v1.0.17 reciben actualización automática a v1.0.36 vía Play Store.
4. **Owner**: Code guía a Fernando paso a paso en Play Console cuando llegue el momento. Tracked en task #62.

### 3.1.d Snapshots públicos para audit Escritorio
- **Build 35 (pre-fix):** `https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/iap_audit_18may/code_snapshot_build35/`
- **Build 36 (post-fix):** `https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/iap_audit_18may/code_snapshot_build36/`

### 3.2 Pendientes consolidados Build 36

#### 3.2.1 🚨 P0 — Crash `ScreenFragment` al restaurar app

- **Fuente:** Google Play Console → Crashes & ANRs (reportado 17-may).
- **Métrica:** 6 eventos en 28 días, 5 usuarios afectados, último ~3h antes del cierre 16-may.
- **Versiones afectadas:** v1.0.1, 1.0.7, 1.0.33 (todas las publicadas con react-native-screens).
- **Dispositivos:** Samsung, Redmi, Motorola. Android 14, 15, 16 Beta.
- **Causa raíz:** `MainActivity.kt` no tiene override de `onCreate` — Android intenta restaurar Fragments con `react-native-screens` cuando vuelve de background → `IllegalStateException: Screen fragments should never be restored`.
- **Fix oficial (3 líneas):** override `onCreate(savedInstanceState: Bundle?)` pasando `null` a `super.onCreate`.
- **Archivo:** `~/AurexApp/android/app/src/main/java/com/aurexapp/MainActivity.kt`
- **Diff propuesto:** ver §10 "Archivos de referencia" → `PENDIENTES_AJUSTES_BUILD34_ANDROID_v1_17MAY.md` (en archive, contiene el diff completo).

#### 3.2.2 🟡 P2 — Labels toolbar inferior truncadas en Samsung S24

- **Fuente:** reporte de usuario real (amigo de Fernando con Samsung S24).
- **Captura:** `~/Downloads/S6.jpg` (16-may 22:29 AR).
- **Síntoma:** las labels del bottom tab bar aparecen cortadas con "...":
  - `Portfolio` OK · `Mercad...` (debería decir "Mercados") · `Watchli...` (debería "Watchlist") · `IA` OK · `Alertas` OK · `Perfil` OK.
- **Causa raíz:** ancho_pantalla / 6 tabs no alcanza para labels >7 chars con `fontSize: 9`.
- **Archivo:** `~/AurexApp/src/navigation/TabNavigator.js` línea 24.
- **Historia:** archivo sin cambios desde 12-abr-2026 (commit `94d0b47`). El bug está en producción Build 33.
- **Opciones de fix (Code recomienda A, decisión Fernando + Escritorio):**
  - **A** (recomendada): `fontSize 9→8` + `tabBarAllowFontScaling: false`. Cambio mínimo, 1 línea. Riesgo bajo.
  - **B**: abreviar labels en i18n ("Watchlist" → "Lista", etc.). Más invasivo, todos los idiomas.
  - **C**: solo iconos sin labels. Cambio UX grande.
  - **D**: custom `tabBar` component. Complejidad alta.
  - **E**: híbrido condicional con Dimensions API.

#### 3.2.3 ✅ Tier 1 IAP — RESUELTO Build 36

Tier 1 IAP aplicado desde Build 34 (commit `cd2f1dc`) y el bug raíz de `purchaseProduct` deprecada se resolvió en Build 36 (commit `66662cd`). Ver §4 IAP completo. **Sin acción pendiente.**

### 3.3 Bump versiones Build 36 (✅ APLICADO 18-may)

- `~/AurexApp/android/app/build.gradle`: `versionCode 35 → 36` ✅ y `versionName "1.0.35" → "1.0.36"` ✅.
- Backup AAB en `~/AurexApp/backups/aab/` post-compilación ✅.
- **Para Build 37 (futuro):** crash ScreenFragment (§3.2.1) + toolbar S24 (§3.2.2) — ambos quedaron pendientes en Build 36 por priorizar IAP. Plus cualquier tema nuevo de Google Play Console que aparezca tras review Build 36.

### 3.4 Bug signup P0 (histórico, resuelto en Build 33)

Bug que bloqueaba registro de usuarios nuevos Android (onboarding slide 4 cableado a LoginScreen sin SignupScreen). **RESUELTO en Build 21** y consolidado en Build 33 producción. Histórico.

---

## 4. IAP / REVENUECAT — ✅ BUG RESUELTO 18-may con Build 36

### 4.0 🎉 RESOLUCIÓN CONFIRMADA — 18-may-2026 17:30 AR

**Resultado de prueba real en Samsung con fmoscon@gmail.com:**
- App AUREX v1.0.36 (Internal Testing) → SubscriptionScreen → tap "QUIERO ELITE" mensual
- Google Play abrió sheet de compra con "TARJETA DE PRUEBA" → SUSCRIBIRSE
- **Google Play: "SE REALIZÓ CON ÉXITO EL PAGO"** + tilde azul
- App: pop interno **"LISTO — TU PLAN fue activado"**
- Entitlement `elite` activo confirmado, navigation goBack OK

**Causa raíz confirmada (lo que SÍ era):**
El bug NO era de RC SDK 9.15.1 ni de Billing v7 ni de configuración Play Console (todas las hipótesis del §4.3 + §4.3.b descartadas correctamente). Era **build "sucio" / bundle JS cacheado** del Build 35. La solución fue el **rebuild limpio (`./gradlew clean` antes de bundleRelease)** combinado con:
1. Eliminar Alert debug temporal Build 35
2. Fix orden IAP-6 en deleteAccount
3. Eliminar `Purchases.purchaseProduct` deprecada en PerfilScreen.js (redirect a SubscriptionScreen)

Coincide al 100% con la evidencia del Issue `RevenueCat/purchases-android#3039` cerrado "Not a Bug" (resuelto con rebuild limpio sin cambios SDK).

**Pendientes inmediatos post-resolución:**
1. Cancelar suscripción ELITE de prueba en Google Play Store > Suscripciones (Fernando manual)
2. ✅ **Promover Build 36 a Producción + 3 cambios anexos en review Google desde 18-may noche AR** (ver §3.1.b para el detalle de los 4 cambios). Esperando aprobación 2-24h.
3. **Paso 2 (post-aprobación Producción):** subir Build 36 al track Alpha (§3.1.c).
4. Cerrar ticket RC #76809 con mail a Alejandra explicando resolución (esperar 24-48h por las dudas).
5. Build 36 producción aprobado → desbloquea compilación Build 25 iOS (§2.7).

---

### 📄 DOCUMENTO TÉCNICO COMPLETO

Versión definitiva validada por **Code + Escritorio + Fernando** (con código real, capturas en `~/Downloads/[1-5].HEIC` y reproducción en dispositivo):

- **GitHub (raw URL HTTP 200 verificada):** `https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/DOC_IAP_BUG_RESUELTO_18may2026.md`
- **Dropbox `.docx`:** `~/Dropbox/AUREX/SUSCRIPCIONES ANDROID y IOS/DOC_IAP_BUG_RESUELTO_18may2026.docx`
- **Dropbox `.md` espejo:** `~/Dropbox/AUREX/SUSCRIPCIONES ANDROID y IOS/DOC_IAP_BUG_RESUELTO_18may2026.md`

Contiene: descripción completa del bug + camino real del usuario + causa raíz técnica (`purchaseProduct` deprecada sin `offerToken`) + 5 fixes Build 36 (líneas pre/post-fix exactas) + por qué SubscriptionScreen no tenía el bug + resultado de prueba real + estado Android/iOS + tabla de archivos modificados + snapshots públicos del código.

**Hallazgo clave:** el botón de compra Perfil → b2 **nunca funcionó desde la integración inicial de RevenueCat** (no fue un bug de 3 días ni 35 días). Build 33 sólo lo expuso al ponerlo en producción.

---

## 4.HISTORIA (archivo) — Bug P0 ticket #76809

### 4.1 Síntoma reproducible

App AUREX v1.0.35 (Internal Testing) → Login `fmoscon@gmail.com` → SubscriptionScreen → tap "Quiero PRO mensual" → ~12 ms → popup "Error / The product is not available for purchase". Nunca llega a `launchBillingFlow`, nunca contacta Google Billing real, nunca dispara webhook.

### 4.2 Estado del ticket

- **Ticket RC #76809** enviado 16-may PM.
- **Contenido inicial:** stack técnico completo + flujo reproducible + 5 causas conocidas RC descartadas + referencia Issue #3039 RC (acknowledged sin fix público).
- **6 screenshots adjuntos** (ZIP 9 MB compressed): productos Play Console, customer not found en RC dashboard, popup error Samsung Z Flip 3, Build 35 activo Internal Testing.
- **SLA típico:** 24-72h hábiles.
- **Confirmado por Fernando 17-may 13:30 AR:** sin novedades, RC no respondió aún.

#### 4.2.b Historial de comunicación con Alejandra (RC support)

| Mail | Fecha | Quién | Contenido enviado | Respuesta |
|---|---|---|---|---|
| **Inicial** | 16-may PM | Fernando | Stack técnico + 5 causas descartadas + 6 screenshots + ref Issue #3039 | Alejandra 18-may: confirma license testers + pide 3 cosas (debug logs, snippets código, código paywall custom) |
| **Mail 1 follow-up** | 18-may | Fernando (con Code) | Logs RC verbose tag RevenueCat capturados con adb logcat 18-may 15:13-15:17 en Samsung R5CR92ADDNW + 3 snippets código texto plano (App.js Purchases.setLogLevel/configure + SubscriptionScreen.js loadOfferings + handlePurchase con Alert "Error IAP debug"). Confirmado: setLogLevel YA estaba activo, no se compiló build nuevo. | Esperando |
| **Mail 2 follow-up** | 18-may | Fernando (con Escritorio) | Confirmación visual desde Play Console: los 4 productos (PRO/ELITE mensual/anual) con base plans ACTIVOS (no draft, no inactive), 174 países, actualizados 5-14 may. Pide confirmar si Issue #3039 ya tiene workaround interno RC. | Esperando |
| **Mail 3 (pendiente)** | Si RC no aporta fix concreto | Fernando (con Code) | Pedir: (a) workaround interno NO publicado para Issue #3039, (b) simulación en lab interno RC con cuenta app8be7db09a7 + nuestros productos. | — |

### 4.3 Las 5 causas conocidas RC — TODAS DESCARTADAS

| # | Causa | Estado |
|---|---|---|
| 1 | País producto no incluye AR | ✅ DESCARTADO (174 países incluido AR) |
| 2 | País cuenta tester ≠ países producto | ✅ DESCARTADO (AR confirmado) |
| 3 | PIN no configurado en Samsung | ✅ DESCARTADO |
| 4 | Tester sin opt-in URL | ✅ DESCARTADO |
| 5 | Application ID mismatch | ✅ DESCARTADO (`com.aurexapp` ambos lados) |

### 4.3.b Validaciones adicionales DESCARTADAS (18-may, confirmación visual Escritorio en Play Console)

| Hipótesis | Estado | Validación |
|---|---|---|
| Producto INACTIVE en Play Console | ✅ DESCARTADO | Los 4 productos (PRO mensual/anual, ELITE mensual/anual) ACTIVOS — base plans con ícono verde. Última actualización 14-may-2026. |
| Base plan en borrador / no activo | ✅ DESCARTADO | base plan `monthly-pro` ACTIVO confirmado en pantalla. "Planes básicos activos: 1" en los 4 productos. |
| Tester no es license tester | ✅ DESCARTADO | fmoscon@gmail.com + aurextester12@gmail.com en lista "AUREX Testers" license testers (no solo internal). Confirmado por Escritorio 18-may. |
| Producto no cargable por SDK | ✅ DESCARTADO | Logs verbose RC capturados 18-may 15:16:51 muestran `Retrieved productDetailsList` con productId, price USD 9.99, basePlanId `monthly-pro`, billingPeriod P1M — todo OK desde SDK. |
| Cuenta Play Store con permisos faltantes | ✅ DESCARTADO | fmoscon@gmail.com logueada Play Store + license tester + ve "Aurex (versión Beta interna)" + puede ver opción de compra en Play Store listing (sheet azul de tarjeta de prueba). |

**🚨 IMPORTANTE PARA Code futuro: NO volver a sugerir estas hipótesis como "causas probables". Están todas descartadas con evidencia visual + logs.**

### 4.4 Hipótesis causa raíz

**CORREGIDO 18-may post-cruzado Code+Escritorio:**

Stack técnico real (no la versión incorrecta del brief anterior):
- `react-native-purchases ^9.15.1` (confirmado en `~/AurexApp/package.json`)
- `purchases-android 9.28.x` (transitivo del wrapper RN)
- **Google Play Billing v7** (NO v8 — Billing v8 llega recién en `react-native-purchases 10.0.0` del 15-abr-2026)
- `targetSdk 36` + `compileSdk 36` (confirmado en `~/AurexApp/android/build.gradle`)

**Referencia issue real:** `https://github.com/RevenueCat/purchases-android/issues/3039` (NO `react-native-purchases/issues/3039` que da 404).

**Estado del Issue #3039 (validado por Escritorio):**
- 🟢 **CERRADO como "Not a Bug"**
- ✅ Reporter confirmó que se **resolvió sin cambios de SDK ni de código**
- ✅ La solución fue **rebuild limpio del AAB** (`./gradlew clean` antes del bundleRelease)
- ❌ Esto **invalida** las hipótesis "bug estructural RC sin fix público" y "upgrade a 10.x como solución"

**Implicancia para AUREX:** la cirugía probablemente sea **rebuild limpio del Build 36 con `./gradlew clean` obligatorio** + Tier 1 IAP (que son bugs propios de AUREX independientes de RC), no cambio de SDK.

### 4.5 Tier 1 IAP — ✅ APLICADO 100% desde Build 34 (16-may, commit `cd2f1dc`)

**🚨 VALIDADO por Code 18-may leyendo código real del Build 35. Snapshot público en `briefs/iap_audit_18may/code_snapshot_build35/` para que Escritorio pueda leer raw URL.**

| ID | Archivo | Línea | Estado real |
|---|---|---|---|
| IAP-1 | `App.js` | L42-63 | ✅ APLICADO — useEffect + IIFE async `Purchases.logIn(session.user.id)` |
| IAP-2.1 | `LoginScreen.js` | L33 | ✅ APLICADO — Path 1 SDK `Purchases.logIn(data.user.id)` |
| IAP-2.2 | `LoginScreen.js` | L64 | ✅ APLICADO — Path 2 fetch `Purchases.logIn(user.id)` |
| IAP-3 | `SignupScreen.js` | L92 | ✅ APLICADO — post-POST `/api/usuario` `Purchases.logIn(data.user.id)` |
| IAP-4 | `PerfilScreen.js` | L242 (logout) | ✅ APLICADO — `Purchases.logOut()` antes `signOut()` |
| IAP-5 | backend `server.js` L1631-1643 | otro repo | ✅ APLICADO commits `1184de5` + `a722e92` (Escritorio) |
| IAP-6 | `PerfilScreen.js` | L268 (deleteAccount) | ✅ APLICADO — `Purchases.logOut()` antes `signOut()` |

**Diff Build 33 producción → Build 35:** 43 líneas en 6 archivos. **Tier 1 + Alert debug temporal Build 35** (revertir en Build 36).

**Resultado real:** Build 35 instalado en Samsung Fernando incluye Tier 1 + Alert debug. **Bug "product not available for purchase" ocurre CON Tier 1 APLICADO.** Tier 1 NO es la solución al bug bloqueante.

**Acción real pendiente (no más Tier 1):** Build 36 con `./gradlew clean` obligatorio + revertir Alert debug (basado en Issue #3039 cerrado "Not a Bug" resuelto con rebuild limpio).

**❌ NO volver a planificar "Tier 1" como acción pendiente. Está APLICADO desde 16-may.**

---

### 4.5.b Plan original (HISTÓRICO — mantener solo como referencia de qué era cada cambio)

| ID | Archivo | Cambio |
|---|---|---|
| IAP-1 | `~/AurexApp/App.js` | useEffect boot → `Purchases.logIn(uid)` |
| IAP-2 | `~/AurexApp/src/screens/LoginScreen.js` | Post-signIn → `Purchases.logIn(uid)` |
| IAP-3 | `~/AurexApp/src/screens/SignupScreen.js` | Post-signUp → `Purchases.logIn(uid)` |
| IAP-4 | `~/AurexApp/src/screens/PerfilScreen.js` (logout) | `Purchases.logOut()` antes de `supabase.auth.signOut()` |
| IAP-5 | `~/Desktop/aurex-backend/server.js` L1631-1643 | Alerta Telegram si `app_user_id` empieza con `$anonymous:` |
| IAP-6 | `~/AurexApp/src/screens/PerfilScreen.js` (deleteAccount) | `Purchases.logOut()` antes de borrar cuenta |

**Orden obligatorio (Escritorio):** IAP-5 backend PRIMERO → validar webhook con evento test → si OK frontend.

### 4.5.b Impacto del IAP sobre iOS Build 25

🚨 **Cruz crítica con §2.7:** el bug IAP afecta tanto Android como iOS. Aunque el ticket RC #76809 es por Android, **la causa raíz probable (combo RC SDK + Billing v8 + targetSdk 36 + Issue #3039)** puede repetirse en iOS o tener un equivalente Apple IAP no detectado. Por eso la decisión estratégica vigente es: **NO compilar Build 25 iOS hasta tener IAP funcionando confirmado en Android producción.** Una vez confirmado en Android (Build 36 con fix RC o Plan B), se valida en paralelo el flow iOS en TestFlight antes de mandar a Apple Review.

### 4.6 Plan B si RC no responde o no resuelve

| Plan | Tiempo | Descripción | Estado |
|---|---|---|---|
| **B-1** | 2-3 días | Webhook directo Google Play (bypass RC parcial). Backend primero: endpoint `/api/google-play/verify-purchase` + Pub/Sub listener + RTDN Play Console. Frontend después: `useGoogleBilling.js` reemplaza `Purchases.purchasePackage()` con BillingClient nativo. RC queda solo para iOS futuro. | ✅ Disponible |
| **B-2** | ~~5-7 días~~ | ~~Reemplazo total RC con Stripe + native IAP.~~ | 🚨 **MUERTO definitivamente** — ver §4.6.b |
| **B-3** | 1 día | Validación manual via Google Play API (temporal). Solo activar si aparece un usuario real urgente que pagó. | ✅ Disponible (no construir proactivamente) |
| **B-5 (NUEVO)** | 1h investigación + 30min ejecutar | Downgrade selectivo `react-native-purchases` 9.15.1 → 9.14.x o 9.13.x (antes del Issue #3039). Solo bump package.json + pod install. Si funciona = fix más rápido. | 🟡 A investigar (changelog GitHub purchases-android) |

**Decision matrix actualizada (18-may 16:30 AR, Escritorio):**
- **HOY**: arrancar Tier 1 (§4.5) en paralelo con investigación B-5 (downgrade SDK)
- **0-72h sin respuesta RC**: esperar (Tier 1 + B-5 corriendo)
- **72h+ sin respuesta RC**: arrancar **B-1** (backend primero, frontend después)
- **B-3 solo** si aparece usuario real urgente que pagó y necesita activación manual

### 4.6.b 🚨 Stripe + Lemon Squeezy DESCARTADOS DEFINITIVAMENTE — no hay procesador web viable

**Stripe**: NO acepta registro desde Argentina sin LLC. Fernando opera con cuenta personal Santander Argentina, **NO va a crear LLC** (confirmado 18-may). Stripe queda **fuera de toda evaluación futura** como procesador web.

**Lemon Squeezy**: ya fue probado en abril 2026 (commit `e47b5f8` 8-abr-2026). **Rechazó la cuenta AUREX por actividad cripto prohibida** ("crypto prohibited" según mensaje del commit). LS queda **fuera de toda evaluación futura**.

**Consecuencia**: AUREX tiene UNA SOLA arquitectura de pagos viable hoy:
**Google Play IAP (Android) + Apple IAP (iOS) + RevenueCat como capa de gestión**.

No hay alternativa web viable. Plan B-2 (Stripe + native IAP) está muerto antes de arrancar. **Código NO debe volver a mencionarlo como contingencia.**

### 4.6.c Dato adicional para Mail 3 RC: "customer not found" en RC Dashboard

Según `CONSOLIDADO_IAP_v2_16MAY.md` §8: el customer (UUID Supabase) aparece como **"customer not found"** en RC Dashboard a pesar de que SDK devuelve 200 OK en `GET /v1/subscribers/UUID`. Sugiere que **RC tiene al usuario marcado como not found internamente**, lo que puede causar que `purchasePackage()` falle aunque `getOfferings()` funcione (ofertas vienen de config del proyecto, no del customer específico). **Incluir esto en Mail 3 a Alejandra** como dato adicional vinculable a Issue #3039.

### 4.7 Datos operativos RC

- Project ID RC: AUREX `228caf37`
- Android App ID RC: `app8be7db09a7`
- Webhook URL: `https://api.revenuecat.com/v1/incoming-webhooks/apple-server-to-server-notification/WICtYZubpcHyBpPfLnZMoagjatQAyjPD`

---

## 5. LANDING v3 aurex.live

### 5.1 Estado actual

- HTML codeado completo: 1.163 líneas, 72.979 bytes, vanilla HTML/CSS/JS, 18 bloques + 33 capturas EN+ES.
- **2 agregados nuevos** sobre v3 base (codeados esta sesión 17-may madrugada):
  - **Header newsletter form** con CTA dorado "Get early access" + micro-modal AJAX → Formspree `xpqnajgp` (cuenta abierta con `fmoscon@gmail.com`, notificaciones a `app.aurex@gmail.com`, free tier 50 signups/mes).
  - **Tablero "Live Market Pulse" táctico** estilo Bloomberg/Tokyo reemplazando Bloque 11.5 "By the numbers": Magnificent 7 + Crypto Top 5 (CoinGecko free API real, refresh 60s) + Commodities/Macro + reloj UTC.
- **2 PNG Playwright** generados (desktop 1440×900 + mobile 390×844).
- **Snapshot PENDIENTE REVIEW** commiteado (`a74e981`) en `briefs/landing_v3_PENDIENTE_REVIEW_17MAY/`.

### 5.2 Flujo de revisión — preview en navegador real (vigente desde 17-may 15:30 AR)

URL preview live: `https://aurex.live/landing-v3-preview/` (con `?v=N` para bust cache cuando hace falta refrescar OG en WhatsApp/Telegram).

### 5.3 Trabajo HEADER cerrado 17-may sesión nocturna (23 sub-puntos)

Todo el header rediseñado iterativamente con Fernando. Items cerrados:

| Item | Cerrado |
|---|---|
| 7-A "Features" destino correcto (bloque "Características" nuevo con 13 cards + capturas reales) | ✅ |
| 7-E Canales dropdown bug + logos OFICIALES de cada red | ✅ |
| 7-H BUG i18n 8 idiomas funcionando (con `cache: 'no-store'` fix Chrome) | ✅ |
| 7-J Borde dorado items nav | ✅ |
| 7-K Mobile: lang selector visible en header (no solo drawer) | ✅ |
| 7-L Desktop achicado: lang + Descargar app visibles | ✅ |
| 7-M Hamburguesa rectangular 62x48 + borde dorado + separación | ✅ |
| 7-N Mobile: eliminado espacio negro grande entre header y hero | ✅ |
| 7-O Renombrado "Acceso anticipado" → "Suscripción Newsletter" 8 idiomas | ✅ |
| 7-P Logo separado del borde izquierdo (safe-area-inset) | ✅ |
| 7-R Línea horizontal dorada al final del header | ✅ |
| 7-S Tabla benchmark: logos REALES con colores oficiales (AUREX/TradingView/Investing/Seeking Alpha/Bloomberg) + tildes ✓ verdes + X rojas + sin scroll desktop | ✅ |
| 7-T Drawer contraste igualado a web | ✅ |
| 7-U Planes: cards con colores REALES app Perfil (FREE gris / PRO violeta / ELITE dorado) + features list vertical + modal compra con logos Apple/Google/AUREX reales + **carousel horizontal swipeable en mobile** con 3 puntitos | ✅ |
| 7-V Balanza disclaimer ⚖️ en header (arriba visible, no FAB abajo) | ✅ |
| 7-W OG image preview link: logo 160px + disco oscuro radial detrás + meta tags acortados + cache bust con `?v=N` | ✅ |
| 7-X Card destacado "POR QUÉ SOMOS MEJORES" en hero + item Benchmark en hamburguesa | ✅ |
| 7-Y Hero label "TERMINAL GLOBAL EN VIVO" (8 idiomas) | ✅ |
| 7-Z 3 cards descarga: logos Apple+Google Play oficiales + texto i18n 8 idiomas | ✅ |
| 7-AA Hero sub: 350+, acciones primero, FED+geopolítica, push+Telegram, "a tu alcance" (8 idiomas) | ✅ |
| 7-BB Nav items altura 36px fijo desktop / 44px mobile | ✅ |
| 7-CC Canales logos en COLORES OFICIALES de cada marca | ✅ |
| 7-D Cómo Funciona: **accordion 6 tabs** con contenido REAL extraído de `~/AurexApp/src/components/ComoUsarAurexBlock.js` + 24 claves cu_* en 8 idiomas | ✅ |

### 5.4 Sesión 18-may madrugada — sub-puntos cerrados

| Item | Cerrado | Commit |
|---|---|---|
| 7-B Markets/Coverage: bordes gradient dorados + iconos por instrumento + 2 pills "Señales IA con %" + "Alertas push y Telegram" + 350→350+ + i18n 8 idiomas | ✅ | `55c8854` + fix contraste `81b4f3e` |
| 7-G Tipografía: comparativa 7 opciones generada → elegido Boldonse + IBM Plex Mono. Carpeta `~/Dropbox/AUREX/TIPOGRAFIA/` creada con .ttf + specimen.png + decision.md | ✅ | (no commit en repo, archivos en Dropbox) |
| **AUDITORÍA i18n estructural completa** — auditor v3 con BeautifulSoup detectó 91 textos hardcoded EN sin `data-i18n`. **608 traducciones nuevas** en 8 idiomas (Ticker, Bloque 3, Carrusel 4.5, Motor 5, 3 Banners 6, Portfolio 7, 15 Alertas 8, 8 Idiomas 9, Benchmark 10.5, "We don't trade" 11, Live Quotes 11.5, Footer, Modal compra) + 22 keys aria/alt + handler `data-i18n-alt` y `data-i18n-tooltip` agregado al JS | ✅ | `75eb60c` |
| **Fix 65 keys preexistentes faltantes** en PT/ZH/FR/IT/HI/AR (Características b27_* + interior planes plan_*) — Fernando detectó que IT no traducía esas zonas. 390 traducciones nuevas, 8 idiomas ahora con 270 keys idénticas | ✅ | `f38297a` |
| 7-F Newsletter popup rediseñado — icono ✉️ card dorada arriba + divider + input email contraste alto + botón flecha animada + check verde footer + logo AUREX + título "NEWSLETTER AUREX" en 8 idiomas + brand dorado al pie | ✅ | `41a1c4c` → `3e991d1` → `fb5f156` |
| **Tipografía Boldonse aplicada a títulos** (h1 hero, h2 sección, h3 cards/banners/alerts, plan-price, modales). Manrope se mantiene en body/CTAs. IBM Plex Mono en nav/labels. **Fernando re-evalúa mañana** — le parece informal en títulos grandes (le gusta en chicos) | 🟡 | `870674d` |

### 5.5 Pendientes Landing v3 — siguen abiertos

| # | Punto |
|---|---|
| **7-I + REFACTOR ESTRUCTURAL** | **BLOQUEANTE.** Aplicar OG v2.2 fondo zonas DEPENDE de definir primero: landing NO es scroll infinito — debe verse en una única imagen y cada cosa se accede al clickear desde donde corresponda. Tema estructural conceptual madre. Memoria: `feedback_landing_compact_click_to_expand` |
| Boldonse en títulos grandes | Re-evaluar 18-may con mente fría. Opciones: a) revertir h1/h2 a Manrope y dejar Boldonse solo h3, b) otra display, c) volver todo Manrope |
| "9 tipos de instrumentos" b4_h2 | Fernando no entiende qué son — definir copy más claro o enumerar visualmente |
| Auditar secciones NO-header | Header revisado 17-18 may. Falta validar visualmente: Hero, Características (13 cards), Carrusel, Motor 24 variables, Cómo Funciona, 3 Banners, Portfolio, 15 Alertas, 8 Idiomas, Benchmark, Planes, Live Quotes, Footer |
| Footer h4 (Product/Company/Channels) | Quedan sin traducir como nombres propios — verificar con Fernando si quiere traducir |
| Deploy producción aurex.live | Mover `landing-v3-preview/` al root del repo cuando Fernando + Escritorio dan doble OK |

### 5.6 REFACTOR MAYOR — DECISIÓN BLOQUEANTE para próxima sesión

**Landing compacta + click-to-expand, no scroll infinito.** Concepto vigente desde 17-may 19:00, REFORZADO por Fernando 18-may 02:30 AR: "ya nos lo dijo 3 veces y Code no respondió concretamente". TODA otra decisión visual (incluido 7-I OG fondo zonas + tipografía Boldonse en grandes) DEPENDE de cómo quede esta arquitectura. **MAÑANA arranca por este tema.** Memoria: `feedback_landing_compact_click_to_expand`.

### 5.7 Reglas de trabajo aprendidas (guardadas en memoria — siguen vigentes)

**17-may** (8 reglas): `validar_pixel_x_pixel_antes_de_pasar`, `i18n_cambios_aplican_8_idiomas`, `cambios_siempre_web_y_iphone`, `landing_compact_click_to_expand`, `siempre_espanol_referencia_ES`, `no_abrir_pantallas_a_fernando`, `validar_yo_antes_de_pasar_a_fernando`, `nunca_inventar_iterar_version_a_version`.

**18-may madrugada** (6 reglas nuevas):
1. `feedback_avisar_previo_mejoras_visuales` — mejoras laterales no pedidas → preguntar 1 línea + OK antes de aplicar.
2. `feedback_si_esta_mal_se_arregla` — bugs/inconsistencias detectadas → arreglar sin preguntar.
3. `feedback_nombres_no_traducen` — FREE/PRO/ELITE/AUREX + plataformas oficiales JAMÁS traducen.
4. `feedback_cache_busting_landing` — cuando Fernando no ve cambios → URL con `?v=XXX` nuevo. Test del rojo h2 como diagnóstico definitivo.
5. `feedback_validar_integramente_cada_paso` — **CRÍTICA**. Fernando NUNCA debe ser quien detecte un bug. Code cruza HTML+JSON+JS+8 idiomas+breakpoints ANTES de decir OK. Diff EN vs cada idioma = 0.
6. (refuerzo) `feedback_no_abrir_pantallas_a_fernando` actualizada: PROHIBIDO usar `browser_*` MCP de Playwright — abre ventana visible aunque parezca headless.

### 5.7 Pre-requisitos para deploy a producción aurex.live

Cuando todo Landing v3 esté OK doble (Fernando + Escritorio):
- Generar OG image final (ya hecha v4 con logo 160px + disco contraste).
- Verificar links internos.
- Mover archivos de `landing-v3-preview/` al root del repo aurex-app (reemplaza index.html actual fase 0).
- Commit + push → GitHub Pages auto-deploy a aurex.live oficial.
- Test funcional: submit form newsletter `xpqnajgp` → confirmar notificación a `app.aurex@gmail.com`.
- `landing-v3-preview/` queda como referencia histórica.

### 5.3 Decisiones de diseño cerradas

- Mix v2 Stellar ajustada + v3 Tactical para OG image (decidido por Fernando).
- 18 bloques (vs 17 anteriores) incluyendo "More you can do" + carrusel 10 slides + Markets+Pulse en hero.
- Profile menu + How-to-use NO van en landing (son internos).
- 35 capturas renombradas a sistema `pantalla_idioma.jpg`.
- 4 capturas excluidas quedan como reserva.

### 5.4 Formspree (newsletter)

| Dato | Valor |
|---|---|
| Servicio | Formspree Free (50 submissions/mes) |
| Owner email login | `fmoscon@gmail.com` |
| Notification email | `app.aurex@gmail.com` |
| Form name | Aurex Newsletter |
| Form ID | `xpqnajgp` |
| Endpoint | `https://formspree.io/f/xpqnajgp` |
| Dashboard submissions | `https://formspree.io/forms/xpqnajgp/submissions` |
| Upgrade futuro | Basic $10/mes → 1.000 submissions/mes |

---

## 6. PLAN MKT v3 — pendiente, bloqueado hasta landing live

### 6.1 Estado

- **NO arrancado.** Bloqueado hasta que landing v3 esté live en aurex.live.
- Brief base: `~/Dropbox/AUREX/MARKETING/MARKETING_CONTEXT_AUREX_v1.md` (14 secciones canónicas, fuente de verdad para las 42 marketing-skills).
- Plan MKT v2 cerrado pero outdated: incorporar landing v3 + sistema captura leads Formspree.

### 6.2 Decisiones ya cerradas

- WhatsApp Business OUT de FASE 1 (decisión 14-may post incidente WA-001/WA-002).
- Buffer (free) como herramienta principal de scheduling X / LinkedIn / Instagram / Facebook.

### 6.3 Sub-pendientes cuando arranque MKT v3

- 30 posts/mes Buffer.
- Instagram Stories 2×/semana behind the scenes.
- Video análisis 60s TikTok+Reels 2×/semana.
- Thread "cómo leer AUREX PULSE" en X 1×/semana.
- Resumen mercado diario Telegram.
- Artículo corto LinkedIn 1×/semana.

---

## 7. PWA aurex.live (estado fase 0)

- Live actualmente en aurex.live, fase 0 reorg ejecutada (commit `0243a53` del 16-may): PWA movida a `/app/` + landing nueva en root.
- Cuando landing v3 reemplace la actual, la PWA queda en `/app/`.
- Brief reorg: `~/Desktop/aurex-app/briefs/PLAN_FASE0_REORG_REPO_v1_16MAY.md` (en archive — ya ejecutado).

### 7.1 Paridad pendiente PWA vs nativa (gap acumulado 26-abr → 14-may)

- Push notifications.
- Telegram real.
- Cómo usar AUREX (tutorial).
- Sistema alertas completo.
- AppState refresh.

**Política:** cada vez que se modifica Android nativo, Code DEBE evaluar si aplica a PWA y reportarlo en este brief (regla `feedback_pwa_paridad_android_continua`).

---

## 8. BACKEND aurex-backend (Railway)

### 8.1 Estado

- Deploy automático push a main → Railway.
- Sin incidentes activos al 17-may.

### 8.2 Cascadas verificadas (sprint backend 11-may cerrado)

| Asset class | Cascada |
|---|---|
| Crypto | Binance → CryptoCompare → OKX → Kraken → CoinGecko |
| Stocks | Yahoo → Finnhub → Alpha Vantage |

### 8.3 Endpoints clave

- `/api/debug/sources` — estado de cada fuente
- `/api/crypto-prices` — precios cripto agregados
- `/api/usuario` — POST signup (Capa 1 try/catch optimistic + Capa 2 self-heal usePlan)
- `/webhook/revenuecat` (server.js L1601) — webhook RC

### 8.4 Datos operativos Railway

- URL: `https://aurex-app-production.up.railway.app`
- 16 variables de entorno (lista completa en `MANUAL_ESTRUCTURAL.md` §4).
- Telegram bot principal: alertas operativas + admin chat (`ADMIN_WHATSAPP=5491167891320`).

### 8.5 Bloqueo activo

**Railway + Binance bloqueado** (BN-002 ACTIVE desde 18-abr, MITIGATED via CryptoCompare). Evaluar región Railway / hosting alternativo / proxy post-aprobación Apple.

---

## 9. MAPA DE ARCHIVOS — dónde vive cada cosa

### 9.1 Repos GitHub (3)

| Repo | URL | Visibilidad | Path local | Branch operativo | Deploy |
|---|---|---|---|---|---|
| **aurex-app** (PWA + landing + briefs) | `https://github.com/fmoscon-creator/aurex-app` | 🌐 PÚBLICO | `~/Desktop/aurex-app` | `main` | GitHub Pages → aurex.live |
| **AurexApp** (Nativa RN iOS+Android) | `https://github.com/fmoscon-creator/AurexApp` | 🔒 PRIVADO | `~/AurexApp` | `dev` | Xcode → App Store / Android Studio → Play Store |
| **aurex-backend** (Node Railway) | `https://github.com/fmoscon-creator/aurex-backend` | 🌐 PÚBLICO | `~/Desktop/aurex-backend` | `main` | Push main → Railway auto-deploy |

**Acceso Escritorio:** repos PÚBLICOS sí. Repo PRIVADO `AurexApp` NO (Code le pega contenido relevante si necesita).

### 9.2 Dropbox `~/Dropbox/AUREX/`

| Carpeta | Para qué |
|---|---|
| `MAPA DE TRABAJO/` | Briefs activos espejados de `aurex-app/briefs/` + `.docx` para Word |
| `Apple STORE IOS/` | Apple: rechazos, comprobantes, informes |
| `Apple STORE IOS/REVIEW APPLE/` | Subcarpeta proceso review actual |
| `LANDING/v3/preview/` | Screenshots iteraciones landing v3 (`_v2` es con agregados, sin sufijo es sin agregados) |
| `LANDING/v3/PENDIENTE_REVIEW_17MAY/` | Snapshot completo HTML+PNG+README pendiente review |
| `MARKETING/` | Plan MKT + contexto MKT + assets |

### 9.3 Working copies locales (no commiteados)

| Carpeta | Para qué |
|---|---|
| `~/Desktop/CODE/landing_v3/` | Working copy landing v3 (HTML + 33 capturas + logo Drive) |
| `~/Desktop/CODE/SECRET/` | Credenciales locales (Supabase, PayPal, RC) — nunca commitear |
| `~/Desktop/CODE/screenshots_rc_support/` | ZIP screenshots ticket RC #76809 |
| `~/Desktop/CODE/canvas_demos/aurex_og/` | 4 propuestas OG image generadas con Canvas |
| `~/AurexApp/backups/aab/` | Backups AAB Android (regla obligatoria) |

### 9.4 Memorias persistentes Code

`~/.claude/projects/-Users-fernandomoscon/memory/`

- `MEMORY.md` (índice, auto-cargado al inicio).
- ~25 `project_*.md` (estado vivo del proyecto, snapshots).
- ~30 `feedback_*.md` (reglas de trabajo aprendidas).
- 1 `roles_code_escritorio.md`.

Backup espejo: `~/Desktop/aurex-memory-backup/`.

---

## 10. ARCHIVOS DE REFERENCIA DETALLADA

> Briefs específicos vigentes que este brief maestro APUNTA cuando se necesita profundidad técnica.

| Tema | Archivo de referencia |
|---|---|
| Apple Build 17 análisis completo | `INFORME_GRAL_APPLE_v3_16MAY.md` |
| IAP análisis cruzado + ticket #76809 | `CONSOLIDADO_IAP_v2_16MAY.md` |
| IAP análisis técnico profundo | `ANALISIS_PROFUNDO_COMPRA_IAP_15MAY.md` |
| IAP ticket inicial RC | `TICKET_REVENUECAT_FINAL_15MAY.md` |
| IAP Plan archivo-por-archivo Tier 1 | `PLAN_IAP_TIER1_BUILD34_v2_16MAY.md` |
| IAP Plan B contingencia | `PLAN_B_IAP_SI_RC_NO_RESPONDE.md` |
| Reviews Escritorio Apple | `REVIEW_ESCRITORIO_APPLE_v2_16MAY.md` |
| Reviews Escritorio IAP | `REVIEW_ESCRITORIO_IAP_TIER1_16MAY.md` |
| Landing v3 snapshot pendiente review | `landing_v3_PENDIENTE_REVIEW_17MAY/README.md` |
| Landing v3 stack herramientas | `STACK_HERRAMIENTAS_CODE_AUREX_17MAY.md` |
| Landing v3 mapeo 35 capturas | `CAPTURAS_LANDING_v2_MAPEO_17MAY.md` |
| Landing v3 benchmark competidores | `BENCHMARK_v2_COMPETIDORES_REALES_17MAY.md` |
| Respuesta a Escritorio sobre landing | `RESPUESTA_ESCRITORIO_OK_CODEO_17MAY.md` |
| MKT consolidado v2 | `CONSOLIDADO_MKT_LANDING_v2_16MAY.md` |

> Todos los briefs SUPERADOS (v1 cuando hay v2, briefs históricos absorbidos en este maestro) viven en `briefs/archive/`. NO se borran, quedan para auditoría.

---

## 11. CHECKLIST 5 LUGARES (regla `feedback_briefs_accesibles_escritorio`)

Este brief maestro cumple en cada actualización:

- [x] Local Code: `~/Desktop/aurex-app/briefs/BRIEF_MAESTRO_AUREX.md`
- [x] Dropbox: `~/Dropbox/AUREX/MAPA DE TRABAJO/BRIEF_MAESTRO_AUREX.md`
- [x] `.docx` espejo: `~/Dropbox/AUREX/MAPA DE TRABAJO/BRIEF_MAESTRO_AUREX.docx`
- [x] GitHub commit + push: cada actualización del brief
- [x] Raw URL HTTP 200 verificada post-push

---

## 12. POLÍTICA DE ACTUALIZACIÓN

### Cuándo actualizar este brief

- ✅ Aparece tema nuevo (bug, oportunidad, decisión) → agregar en sección correspondiente.
- ✅ Cambia estado de un frente (ej Apple responde, RC responde, Fernando da OK landing) → actualizar §1 + sección específica.
- ✅ Se ejecuta un hito (deploy, compilación, fix) → actualizar §1 + sección específica + mover briefs absorbidos a `archive/`.
- ✅ **Pasaron 3 horas desde el último commit del brief maestro** Y hubo cambios relevantes en la sesión → actualizar con hitos acumulados (regla `feedback_brief_maestro_actualizar_3h`).
- ❌ Commit menor de código que no cambia estado de un frente → NO actualizar.
- ❌ Cada hora "por las dudas" → NO actualizar.

### Política de frecuencia en sesiones largas (>3h)

Code mide tiempo desde el último commit del brief maestro. Si pasaron **>3h en una sesión activa con cambios relevantes**, actualiza el brief con los hitos acumulados, commit + push, reporta en 1 línea, y retoma el trabajo. Esto evita perder contexto si el chat se corta o si sesiones de 10-12h llegan al cierre sin haber consolidado.

### Mensaje de commit cuando se actualiza

```
docs(brief-maestro): <sección> — <qué cambió>

Ejemplos:
docs(brief-maestro): §4 IAP — RC respondió ticket #76809 con solución X
docs(brief-maestro): §3 Android — agregar item Z al Build 36
docs(brief-maestro): §5 Landing — Fernando dio OK visual, arranca deploy
```

### Versiones de briefs específicos

- Briefs específicos en `briefs/` (no este maestro) siguen usando `_vN` cuando hay iteraciones (ej `INFORME_GRAL_APPLE_v3`).
- Cuando se publica una nueva versión vN+1, la vN anterior se mueve a `briefs/archive/`.

---

**Fin brief maestro. Se actualiza con cada hito. Una sola URL canónica para Escritorio y Fernando.**
