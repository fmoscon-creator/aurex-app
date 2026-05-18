# 🌟 BRIEF MAESTRO AUREX — Estado vivo del proyecto

> **Archivo único de seguimiento.** Reemplaza los múltiples briefs sueltos. Se actualiza con cada hito.
> **NO bump de nombre** (sin `_v1`, `_17MAY`). La historia vive en `git log`.
> **Última actualización:** 18-may-2026 ~03:00 AR
> **Última actualización significativa:** §5 Landing v3 — sesión 18-may madrugada cerró 7-B (Cobertura cards + iconos + pills IA/alertas + 350+), i18n masivo 91 textos hardcoded EN cableados + 65 keys preexistentes faltantes en PT/ZH/FR/IT/HI/AR (998 traducciones totales agregadas, 8 idiomas ahora con 270 keys cada uno), 7-F popup Newsletter rediseñado (logo + título "NEWSLETTER AUREX" + brand dorado), tipografía Boldonse aplicada a títulos (Fernando re-evalúa mañana 18-may, le parece informal en grandes). 6 reglas nuevas en memoria.
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
| 🍎 **iOS Build 25 (futuro)** | ⏸ NO compilado — pre-requisitos sin cumplir | Paridad Android 1.0.33 + IAP funcionando + marca aprobada en Build 17 | IAP funcionando en Android + marca aprobada |
| 🤖 **Android Build 33 producción** | 🟢 PUBLICADO Play Store (20 instalaciones, 177 países) | Mantener mientras se prepara Build 36 | — |
| 🤖 **Android Build 35 Internal Testing** | 🟡 Subido hace ~23h, FALLÓ test IAP | No promover. Build 36 va a superponer | Respuesta RC #76809 |
| 🚨 **IAP / RevenueCat ticket #76809** | 🚨 P0 abierto, ESPERANDO respuesta RC | Esperar RC o arrancar Plan B-1 si >72h | Respuesta RC support |
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

### Pre-requisito ABSOLUTO antes de compilar Build 25 iOS

🚨 **IAP funcionando en Android producción (Build 36 con fix RC o Plan B aplicado).** Sin esto, Build 25 iOS no se compila — desperdiciaríamos el slot Apple Review por un build con cobro roto.

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

## 3. ANDROID — Builds 33 / 34 / 35 / próximo 36

### 3.1 Estado real reconciliado (verificado 17-may 14:00 AR con Escritorio + git log)

| Build | Estado real | Contenido | Evidencia |
|---|---|---|---|
| **33 / v1.0.33** | 🟢 **PRODUCCIÓN Play Store** | Bug H fix (selectedRow + ScrollView). 20 instalaciones, 177 países. **SIN** fix IAP, **SIN** fix toolbar S24, **SIN** fix crash ScreenFragment. | Confirmado Escritorio + commit `c990612` (16-may) |
| **34 / v1.0.34** | 🟡 Solo commit, probablemente NUNCA subido a Play | IAP Tier 1 wiring frontend (Purchases.logIn/logOut) | commit `cd2f1dc` (16-may) — Escritorio no lo ve en Play Console |
| **35 / v1.0.35** | 🟡 PRUEBA INTERNA subido hace ~23h | Intento de fix IAP que **NO funcionó** (mismo bug "producto no disponible"). Por eso se escaló ticket RC #76809 con texto + 6 capturas | Confirmado Escritorio + Fernando + Play Console |
| **36 / v1.0.36** (próximo) | ⏸ NO compilado todavía | Debe incluir: fix RC IAP (cuando responda) + fix crash ScreenFragment + fix toolbar S24 + cualquier tema nuevo que aparezca | Pendiente acumular pendientes |

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

#### 3.2.3 🚨 P0 — Tier 1 IAP (pausado esperando RC)

- 6 cambios documentados en plan archivo-por-archivo (ver §4 IAP).
- Bloqueado por respuesta RC ticket #76809.

### 3.3 Bump versiones cuando se compile Build 36

- `~/AurexApp/android/app/build.gradle`: `versionCode 35 → 36` y `versionName "1.0.35" → "1.0.36"`.
- Backup AAB obligatorio en `~/AurexApp/backups/aab/` post-compilación.
- NO compilar Build 36 hasta tener al menos el bloqueante externo IAP resuelto (RC respondió o pasaron 72h y arrancamos Plan B).

### 3.4 Bug signup P0 (histórico, resuelto en Build 33)

Bug que bloqueaba registro de usuarios nuevos Android (onboarding slide 4 cableado a LoginScreen sin SignupScreen). **RESUELTO en Build 21** y consolidado en Build 33 producción. Histórico.

---

## 4. IAP / REVENUECAT — Bug P0 ticket #76809

### 4.1 Síntoma reproducible

App AUREX v1.0.35 (Internal Testing) → Login `fmoscon@gmail.com` → SubscriptionScreen → tap "Quiero PRO mensual" → ~12 ms → popup "Error / The product is not available for purchase". Nunca llega a `launchBillingFlow`, nunca contacta Google Billing real, nunca dispara webhook.

### 4.2 Estado del ticket

- **Ticket RC #76809** enviado 16-may PM.
- **Contenido:** stack técnico completo + flujo reproducible + 5 causas conocidas RC descartadas + referencia Issue #3039 RC (acknowledged sin fix público).
- **6 screenshots adjuntos** (ZIP 9 MB compressed): productos Play Console, customer not found en RC dashboard, popup error Samsung Z Flip 3, Build 35 activo Internal Testing.
- **Estado:** ESPERANDO respuesta RC support. SLA típico 24-72h hábiles.
- **Confirmado por Fernando 17-may 13:30 AR:** sin novedades, RC no respondió aún.

### 4.3 Las 5 causas conocidas RC — TODAS DESCARTADAS

| # | Causa | Estado |
|---|---|---|
| 1 | País producto no incluye AR | ✅ DESCARTADO (174 países incluido AR) |
| 2 | País cuenta tester ≠ países producto | ✅ DESCARTADO (AR confirmado) |
| 3 | PIN no configurado en Samsung | ✅ DESCARTADO |
| 4 | Tester sin opt-in URL | ✅ DESCARTADO |
| 5 | Application ID mismatch | ✅ DESCARTADO (`com.aurexapp` ambos lados) |

### 4.4 Hipótesis causa raíz

Bug estructural RC SDK 9.15.1 + Google Play Billing v8 + targetSdk 36 (combo nuevo, feb 2026). Matchea Issue #3039 RC (acknowledged enero 2026 sin fix público).

### 4.5 Tier 1 IAP (6 cambios listos para implementar cuando RC responda)

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

| Plan | Tiempo | Descripción |
|---|---|---|
| **B-1** | 2-3 días | Webhook directo Google Play (bypass RC parcial) |
| **B-2** | 5-7 días | Reemplazo total RC con Stripe + native IAP |
| **B-3** | 1 día | Validación manual via Google Play API (temporal) |

**Decision matrix:** 0-3 días sin respuesta RC = esperar · 3-7 días = empezar B-1 · 7-14 días = ejecutar B-2 · B-3 solo puente.

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
