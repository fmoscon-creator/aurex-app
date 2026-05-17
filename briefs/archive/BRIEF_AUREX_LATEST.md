# BRIEF AUREX — Estado del Proyecto (version mas reciente)

> **Para Escritorio (Claude Desktop con Chrome integration):**
> Este archivo esta siempre disponible en URL fija publica. Code lo actualiza con cada hito mayor.
> **Ultima actualizacion: 15 de mayo de 2026, ~04:50 AR — Build 21 publicado, ticket RevenueCat enviado, Build 22 en implementacion. SESION SIGUE ABIERTA.**

URL publica:
`https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/BRIEF_AUREX_LATEST.md`

---

## ESTADO ACTUAL (resumen 30 segundos)

- **Build 21 v1.0.21** Android: PUBLICADO en Prueba Interna Play Console desde 14-may 22:35 AR. Validado en Samsung R5CR92ADDNW (cuenta tester aurextester12 + fmoscon).
- **Bug P0 SignUp** que bloqueaba registro de usuarios nuevos Android: **RESUELTO en Build 21** (SignupScreen + auth.signUp + Capa 1+2 self-heal + onboarding 2 botones + cross-links).
- **Bug P0 Compra IAP** "product not available for purchase": diagnosticado, ticket RevenueCat support enviado 15-may ~03:00 AR. Post-fix Play Console (propagacion 48h + License Testing + opt-in tester correcto), la compra LLEGA al bottom sheet de Play Store y dispara el flow OK. Pero el entitlement NO se persiste en RC en sandbox (comportamiento esperado para License Tester sin cargo real). Validacion con cargo real pendiente pre-lanzamiento.
- **Build 22**: en implementacion 15-may madrugada. 8 bugs identificados (#1 IAP externo, #2-#7 codigo). Tier A (bugs #3 #4 #6 #7 #8) ya implementado en disco — pendiente OK Escritorio post-revision + mockup Bug #2 + commit + bump versionCode 22.
- **Apple Build 17 iOS**: en queue Apple App Review. Sin novedades al cierre 15-may madrugada. Plan B Build 18 con push iOS preparado.

---

## BUILD 21 — fixes acumulados (PUBLICADO 14-may 22:35 AR)

### Fixes ronda final (post-tabla Escritorio 14-may PM)
1. **V1 Pulse Ver variables tiering 3 niveles** (FREE redirige, PRO 14 vars, ELITE + seccion extra "Analisis profundo + placeholder historico")
2. **V3 UpsellBanner sacado de Mercados** (saturaba precios)
3. **V2/V5 textos banners IA** ajustados al copy publicado: "Razonamiento detallado en señales IA — Disponible en ELITE" para FREE, "Analisis tecnico avanzado RSI MACD — Disponible en ELITE" para PRO
4. **Contador alertas header global** descuenta toggles bloqueados por plan (antes mostraba 15 ON aunque GDELT estuviera con candado para PRO)
5. **PlanLimitModal mensaje dinamico**: GDELT-only → "Esta alerta requiere ELITE"; resto → "PRO o ELITE"
6. **PlanLimitModal X arriba derecha** + "Ahora no" blanco subrayado para mejor contraste
7. **Modal Agregar Activo** Keyboard import + ScrollView wrapper + keyboardShouldPersistTaps + returnKeyType en inputs + Keyboard.dismiss antes de saveAsset (NOTA: este fix NO fue suficiente, el boton Guardar sigue tapado por teclado — pasa a Build 22 con refactor flex 3-zonas)

### Fixes acumulados de rondas previas (incluidos en Build 21)
- **SignupScreen nueva** + auth.signUp + POST /api/usuario Capa 1 (try/catch optimistic) + Capa 2 auto-heal en usePlan con guards session y email — RESUELVE el Bug P0 SignUp Android.
- **Onboarding 2 botones**: slide 4 con boton dorado "Crear cuenta gratis" → SignupScreen + secundario gris "Ya tengo cuenta" → LoginScreen. Antes eran 3 botones cableados todos a Login.
- **Cross-links Login ↔ Signup** validados.
- **11 evaluadores backend alertas no-precio**: apertura, alta_conviccion_ia, cambio_senal, senal_portfolio, cambio_zona_pulse, por_categoria, termometro_riesgo, fed_fomc, cpi_pbi, earnings, geopolitica_gdelt.
- **watchlistMax FREE = 1** alineado con copy publicada.
- **UpsellBanner Perfil** (queda, V4 confirmado por Escritorio).
- **WatchlistScreen** bug seguridad USER_ID hardcoded corregido a dinamico.
- **Bloque 4 sincerar copy**: 5 promesas falsas eliminadas de i18n.js (Export Excel, SMS, Chat live, API personal, historial 30 dias IA).
- **Bloque 3 PWA**: banner upsell aurex.live.

### Smoke test Samsung (validado por Fernando 14-15 may)
- Login tester PRO: OK
- Perfil badge PRO violeta + banner upsell ELITE dorado: OK
- Pulse Ver variables como PRO con 14 vars: OK
- Banner Mercados eliminado: OK
- Banner IA texto correcto: OK
- Tap candado GDELT abre PlanLimitModal con texto especifico ELITE-only: OK
- Watchlist crear 2da como PRO sin bloqueo: OK
- App a background 90s y vuelve sin pedir login: OK
- Force-stop y reabre sin pedir login: OK
- Cross-link Signup ↔ Login validado: OK
- Cold reboot persistencia: **pendiente test Samsung real**

---

## BUG P0 COMPRA IAP — diagnostico y estado actual

### Sintoma inicial (14-15 may madrugada)
Tocar comprar PRO/ELITE Mensual o Anual desde SubscriptionScreen → POP "Error / The Product is not available for Purchase". 100% reproducible.

### Investigacion masiva 11 hipotesis descartadas
1. Dashboard config — OK
2. Productos Play Console — 4 Activos en 174 paises con retrocompatibilidad ON
3. App signing mismatch — sideload no era la causa (despues con app desde Play Store seguia el mismo error)
4. Tester no en License Testing — confirmado en lista
5. SDK / Billing version mismatch — purchases 9.28.1 POM declara billing 8.0.0 (correcto, matchea)
6. BillingClient disconnected — logs muestran conexion estable
7. Construccion manual de pkg — pkg pasado intacto desde offerings.current.availablePackages
8. Sandbox/test mode — no activo
9. Owner can't buy own products — fallo tambien con tester no-owner
10. Falta payment method — TC agregada, sigue fallando
11. Cache Google Play stale — cleared cache + reboot, sigue fallando

### Ticket RevenueCat support ENVIADO 15-may ~03:00 AR
- Texto consolidado por Code + Escritorio, 5 screenshots adjuntos
- Datos: RC App ID `app8be7db09a7`, Project ID `proj228caf37`, anonymous user `$RCAnonymousID:583810b271f44bc1a2ff8336cbccce66`
- Confirmacion: "Your message has been sent. We'll get back to you as soon as possible."
- Respuesta esperada en `fmoscon@gmail.com` hasta 2 dias habiles

### Resolucion post-envio (15-may ~04:00 AR)
Despues de fix de opt-in tester correcto (link `https://play.google.com/apps/internaltest/4700950422602152057` — el link que Code paso antes era erroneo) + reinstalar desde Play Store + License Testing activa:

- **launchBillingFlow ahora funciona** OK. Tocar comprar PRO Mensual abre el bottom sheet nativo de Play Store con "AUREX PRO Mensual / US$ 9,99 / Tarjeta de prueba, siempre se aprueba / Suscribirse".
- **Pero el entitlement NO persiste en RC**: Customer "No current entitlements", Total Spent USD 0. La compra sandbox de License Tester es procesada localmente por el SDK pero RC no recibe RTDN real (Google no envia notification para compras a $0).
- **Diagnostico final Escritorio**: comportamiento esperado para sandbox + License Tester. NO es bug.

### Pendiente validacion con cargo real pre-lanzamiento
Para validar el flujo completo entitlement → app → backend, hay que usar una cuenta NO-License-Tester con tarjeta real (cargo $9.99 que se reembolsa despues). Esto se hace cuando se acerque el lanzamiento publico Android.

### Bug #8 codigo derivado (Build 22)
La investigacion revelo que el handler `handlePurchase` en SubscriptionScreen.js tenia gaps:
1. Sin `console.log` debug del customerInfo retornado
2. Sin rama else cuando entitlement no se otorga
3. Sin `setCurrentPlan` post-compra (UI no se actualiza)
4. Sin notificar a otros screens (PerfilScreen seguia mostrando FREE)

Fix Build 22 incluye DeviceEventEmitter `plan_changed` desde SubscriptionScreen + listener en PerfilScreen para refrescar.

---

## BUILD 22 — implementacion en curso (15-may 04:30+ AR)

### Cuadro completo bugs Build 22

`briefs/CUADRO_BUGS_BUILD21_PARA_BUILD22.md` — fuente de verdad con detalle tecnico bug-por-bug.

URL publica:
`https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/CUADRO_BUGS_BUILD21_PARA_BUILD22.md`

### Tiering scope Build 22
- **Tier A** (codigo, OK Fernando 15-may 04:40 AR): #2 modal Guardar sticky + #3 contador denominador absoluto + #4 mapping tipo alerta + #6 catch+console.error global + #7 UpsellBanner Portfolio con copy especifico + #8 handler purchase rewrite con DeviceEventEmitter
- **Tier B** (cerrado): #5 IA tap candado AUTO-RESUELTO en Build 21 (S2 confirma SubscriptionScreen sin deformacion) + #7 texto banner APROBADO
- **Tier C** (externo, NO bloquea Build 22): #1 compra IAP — esperar respuesta RC support

### Estado implementacion al 15-may ~04:50 AR
- ✅ Bug #3 — `src/screens/AlertasScreen.js` L411-412 + L582-586 (denominador absoluto)
- ✅ Bug #4 — `src/lib/alertas.js` NUEVO + `src/components/AlertCreateModal.js` import + L133 mapTipoAlerta
- ✅ Bug #6 ext — `src/screens/SubscriptionScreen.js` 3 catches con console.error + fallback
- ✅ Bug #6 ext — `src/screens/PerfilScreen.js` deleteAccount catch L268
- ✅ Bug #7 componente — `src/components/UpsellBanner.js` props `customTitle` + `customSubtitle`
- ✅ Bug #8 — `src/screens/SubscriptionScreen.js` handlePurchase + handleRestore rewrite con setCurrentPlan + AsyncStorage + DeviceEventEmitter
- ✅ Bug #8 — `src/screens/PerfilScreen.js` listener `plan_changed`
- ⏳ Bug #2 — pendiente mockup .md + implementacion refactor modal Agregar Activo
- ⏳ Bug #7 callsite — pendiente agregar `<UpsellBanner>` en `PortfolioScreen.js` debajo de Valor Total
- ⏳ Bump versionCode 22 — pendiente OK Escritorio + Fernando explicito
- ⏳ Compilacion AAB — pendiente OK Escritorio + Fernando explicito
- ⏳ NO commiteado todavia — esperando validacion Escritorio del codigo pegado en chat

### Reglas operativas Build 22
- NO bump versionCode ni compilacion AAB sin OK Fernando + Escritorio explicito
- NO tocar `App.js`, `index.js`, ni backend `aurex-backend/`
- Repo `AurexApp` es PRIVADO — Escritorio NO puede leerlo via raw URL. Code pega codigo verbatim en chat para validacion.

---

## PLANES DE SUSCRIPCION — verificado por Escritorio 14-may-2026

### Android — Google Play Console (4 Published activos)

| Plan | Product ID | Base Plan ID | RC ID | Precio | Descripcion Play (interna, user NO la ve) |
|------|-----------|--------------|-------|--------|-------------------------------------------|
| PRO Mensual | `com.fernandomoscon.aurex.pro.monthly` | `monthly-pro` | `prodb781a5d7c5` | $9.99/mes | "Full access to all AUREX PRO features." |
| PRO Anual | `com.fernandomoscon.aurex.pro.annual` | `annual-pro` | `prod2f5320ea41` | $89.99/año | vacia |
| ELITE Mensual | `com.fernandomoscon.aurex.elite.monthly2` | `monthly-elite` | `prod9367a39498` | $19.99/mes | "Premium AUREX AI signals. Monthly." |
| ELITE Anual | `com.fernandomoscon.aurex.elite.annual` | `annual-elite` | `prodd153861198` | $179.99/año | "Premium AUREX AI signals. Annual, save 25%." |

Creados 6-may-2026. Beneficios cargados por Escritorio 14-may PM.

### iOS — App Store Connect (4 Pending Review junto a Build 17)

Grupo: **AUREX PLANES** — Group ID `22018005`.

| Plan | Product ID | Apple ID | RC ID | Nivel | Precio |
|------|-----------|----------|-------|-------|--------|
| PRO Mensual | `com.fernandomoscon.aurex.pro.monthly` | `6761736879` | `prodcd14c3e521` | 1 | $9.99/mes |
| PRO Anual | `com.fernandomoscon.aurex.pro.annual` | `6761794509` | _Could not check_ | 2 | $89.99/año |
| ELITE Mensual | `com.fernandomoscon.aurex.elite.monthly2` | `6761796966` | _Could not check_ | 3 | $19.99/mes |
| ELITE Anual | `com.fernandomoscon.aurex.elite.annual` | `6761798180` | _Could not check_ | 4 | $179.99/año |

"Could not check" = RevenueCat no puede validar productos iOS hasta que Apple apruebe Build 17. Se autocompleta al aprobar.

### RevenueCat
- Proyecto AUREX — Project ID `proj228caf37`
- RC App ID Play Store `app8be7db09a7`, API key `goog_HfiemofhuhAKeWYfNZfLGrlyIDp`
- Offering `aurex_default` ("AUREX PLANS") — 4 packages activos
- Entitlements: `pro` (entld0fbc67abe) + `elite` (entl2c6d7517d0). Los 4 productos Android attached correctamente (verificado por Escritorio 15-may madrugada).

---

## ESTADO BUILDS

### Android (Play Console)
- **Produccion publica**: Build 17 v1.0.17 (sin SignUp fix — usuarios nuevos bloqueados hasta promocion de Build 21)
- **Prueba Interna**: Build 21 v1.0.21 (con todos los fixes desde Build 18 hasta sprint 14-may PM)
- **Backup local**: Builds 18, 19, 20 (compilados pero NO subidos)

### iOS (App Store)
- Build 17 v1.0 en queue Apple App Review. Sin novedades 15-may madrugada.
- Build 18 con push APNS preparado en disco (intentos 1-12 de Podfile, intento 12 escrito sin pod install ejecutado).

---

## ENLACES Y CARPETAS CLAVE

- **Briefs**: `/Users/fernandomoscon/Desktop/aurex-app/briefs/`
  - `BRIEF_AUREX_LATEST.md` (este archivo)
  - `CUADRO_BUGS_BUILD21_PARA_BUILD22.md` (cuadro detallado bugs)
  - `BRIEF_BUILD21_ESTADO_15MAY.md` (estado operativo Build 21)
  - `TICKET_REVENUECAT_FINAL_15MAY.md` (ticket consolidado RC support)
  - `INFORME_COMPRA_IAP_15MAY_PARA_ESCRITORIO.md` (informe tecnico completo)
  - `SESSION_ACTIVE_ESCRITORIO_CHROME.md` (session active para Escritorio)
- **Repo PWA (publico)**: `https://github.com/fmoscon-creator/aurex-app` — branch `main`
- **Repo nativa (PRIVADO)**: `https://github.com/fmoscon-creator/AurexApp` — branch `dev` (no commitear a main hasta aprobaciones)
- **Repo backend (publico)**: `https://github.com/fmoscon-creator/aurex-backend` — branch `main` (deploy Railway auto)
- **Backend Railway URL**: `https://aurex-app-production.up.railway.app`
- **Mockups Build 22**: `~/Desktop/CODE/AurexApp/mockups/`
  - `MOCKUP_Build22_Modal_Agregar_Activo_sticky.md`
  - `MOCKUP_Build22_UpsellBanner_Portfolio.md`

---

## PROXIMOS PASOS INMEDIATOS

1. Escritorio valida codigo pegado en chat (Bugs #4 y #8).
2. Code muestra mockup Bug #2 a Fernando.
3. Implementacion Bug #2 + Bug #7 callsite (`<UpsellBanner>` en PortfolioScreen).
4. Bump versionCode 22 + commit + push (con OK Fernando + Escritorio).
5. Compilacion AAB (con OK Escritorio).
6. Smoke test Samsung Build 22.
7. Sub a Play Console Prueba Interna.
8. Esperar respuesta RC support (Bug #1 IAP cargo real pre-lanzamiento).
9. Apple Build 17: monitorear queue. Si >7 dias sin movimiento, escalar.

---

> Version historica anterior: `briefs/archive/BRIEF_AUREX_2026-05-09.md`
> Cierre 14-may: cubierto en commits del repo y en este brief (no se archivo version intermedia porque fue el mismo sprint continuo).
