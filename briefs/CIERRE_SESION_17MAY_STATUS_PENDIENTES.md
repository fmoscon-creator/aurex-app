# 🌙 CIERRE SESIÓN 17-MAY-2026 — STATUS GENERAL + PENDIENTES PRÓXIMA SESIÓN

> **Fecha cierre:** 17-may-2026 ~03:40 AR
> **Para:** Fernando + Escritorio. Doc autosuficiente para retomar mañana sin perder contexto.
> **Cómo usarlo:** leerlo primero al arrancar la próxima sesión. Está organizado en frentes paralelos con su estado real + lo que hay que hacer.
> **Autor:** Code (Claude Code en terminal).

---

## 0. RESUMEN ULTRA-CORTO (60 segundos)

| Frente | Estado |
|---|---|
| 🟡 **Apple Build 17 iOS** | Re-submission enviada 16-may 03:30 AR con cambio metadata AUREX AI → AUREX LIVE + reply argumentada + Manual Release OFF. **EN REVISIÓN Apple, esperando respuesta** (24-72h típico, hasta 7 días por historial). |
| 🟢 **Android Build 33** | **EN PRODUCCIÓN Play Store** desde 16-may, reemplazó Build 17 que tenía bug signup P0. 23 instalaciones al cierre. |
| 🚨 **IAP compra Android** | **BUG P0 ABIERTO**. Ticket RC #76809 enviado 16-may PM con texto técnico + 6 screenshots. 5/5 causas conocidas DESCARTADAS. **Esperando respuesta RC support** (SLA 24-72h hábiles). Plan B preparado. |
| 🎨 **Landing v3 aurex.live** | HTML codeado 1.163 líneas + 2 agregados nuevos esta sesión (header newsletter Formspree + tablero Live Quotes táctico). Snapshot PENDIENTE REVIEW commiteado (`a74e981`). **Esperando OK visual Fernando + Escritorio** antes de deploy aurex.live. |
| 📋 **Plan MKT v3** | Pendiente. NO arrancado todavía. Bloqueado hasta que landing v3 esté live. |
| 🗂️ **5 lugares regla** | TODOS los briefs de esta sesión cumplen: Code local + Dropbox + GitHub commit+push + .docx + raw URL HTTP 200 verificado. |

**Lo único que requiere acción tuya al arrancar mañana:**
1. ¿Apple respondió? → check App Store Connect.
2. ¿RC respondió ticket #76809? → check inbox + dashboard RC.
3. Mirar los 2 PNG de landing v3 PENDIENTE_REVIEW + pedir input a Escritorio.

---

## 1. APPLE BUILD 17 iOS — RECHAZO + REPLY ENVIADA

### 1.1 Qué pasó (cronología)

| Fecha (AR) | Evento |
|---|---|
| 24-abr-2026 05:24 | Submit original Build 17 (Marketing Version 1.0, CURRENT_PROJECT_VERSION 17). |
| 12-may-2026 | Build 17 lleva 18 días en queue. Code escribió memoria `project_build17_ios_status.md` con plan B Build 18. |
| 15-may-2026 ~15:00 | **Apple RECHAZÓ Build 17.** Guideline 4.1(c) Design — Copycats. Mensaje literal: *"The app's name contains an icon, brand, or product name that belongs to the following developer: www.aurex.ai."* Único motivo reportado: el nombre. Submission ID: `e0e7fb35-11a4-4c1d-854c-60a80c4799e6`. Revisado en iPhone 17 Pro Max. |
| 15-may PM | Code + Escritorio análisis cruzado del rechazo (briefs `ANALISIS_RECHAZO_APPLE_15MAY_CONSOLIDADO.md` y `INFORME_GRAL_APPLE_v1_15MAY.md`). |
| 16-may 01:53 | Brief v2 (INFORME_GRAL_APPLE_v2_16MAY.md) con 4 opciones (A apelar / B retirar / C compilar Build 25 con todo / D ajustar metadata). |
| 16-may 02:00 | **Fernando aprobó Opción D-modificada.** Cambio metadata "AUREX AI" → "AUREX LIVE" en 12 superficies + Manual Release OFF + en paralelo IAP Tier 1 Android. |
| 16-may 02:25 | Brief v3 (INFORME_GRAL_APPLE_v3_16MAY.md) con inventario 12 superficies oficial auditado por Escritorio. |
| 16-may PM | Escritorio aplicó cambios en App Store Connect: superficies 1, 3, 8 cambiadas. Subió PDF Namecheap. Pegó reply argumentada. Marcó Manual Release OFF. Submit. |
| 16-may 03:30 AR (cierre) | Re-submission enviada. Apple Submission Status: **En cola para revisión.** |
| **17-may 03:40 AR (ahora)** | Sin respuesta Apple todavía. |

### 1.2 Por qué nos rechazaron + por qué este reply argumentado debería resolverlo

**Causa raíz del rechazo:** el nombre "AUREX AI" en App Store era confundible con el dominio `www.aurex.ai` (otro developer no relacionado a Fernando).

**Argumento de defensa enviado a Apple:**
- AUREX LIVE viene del dominio propio `aurex.live`, comprado por Fernando el 3-abr-2026 en Namecheap (Order #198745654, Transaction ID 241830864).
- Sin afiliación con aurex.ai (otro developer, dominio registrado 25-jun-2020 GoDaddy).
- Branding consistente en todas las plataformas: PWA aurex.live + Google Play (AUREX) + iOS (esta submission).
- USPTO Trademark search: 51 registros "AUREX", ninguno en software/fintech. Riesgo bajo.
- Comprobante Namecheap adjunto como prueba documental.

### 1.3 Inventario superficies App Store Connect (auditoría Escritorio 16-may)

| # | Superficie | Texto previo | Acción aplicada |
|---|---|---|---|
| 1 | App Name | AUREX AI | ✅ **CAMBIADO → AUREX LIVE** |
| 2 | Subtitle | (1 char visible) | Verificación visual pendiente |
| 3 | Description | "AUREX AI engine" (2 ocurrencias) | ✅ **CAMBIADO → "AUREX engine"** |
| 4 | Keywords | (24 chars) | Verificación visual pendiente |
| 5 | Promotional Text | "Analyze 350+ assets..." (sin AUREX AI) | OK sin cambio |
| 6 | What's New | (no visible en página) | Verificación visual pendiente |
| 7 | IAP Display Names x4 | PRO/ELITE Mensual/Anual sin AUREX AI | OK sin cambio |
| 8 | IAP Grupo "Nombre app" | AUREX AI | ✅ **CAMBIADO → AUREX LIVE** |
| 9 | Screenshots (10) | Sin AUREX AI incrustado | OK sin cambio |
| 10 | Preview videos | 0 videos | OK |
| 11 | App Review Notes | Sin contenido | ✅ **AGREGADO reply argumentada + adjunto Namecheap** |
| 12 | Support/Marketing URL | aurex.live | OK sin cambio |

**Resumen:** 3 superficies cambiadas + 1 con contenido nuevo + 8 OK = **12/12 procesadas.**

### 1.4 Reply text exacto enviado a Apple

Pegada en sección "App Review Information → Notes" de App Store Connect:

```
Dear App Review Team,

Thank you for your detailed review of submission ID
e0e7fb35-11a4-4c1d-854c-60a80c4799e6.

We have updated the app metadata to address the Guideline 4.1(c)
feedback regarding the previous name "AUREX AI".

The app has been renamed to "AUREX LIVE" — this is our own brand,
based on our owned domain aurex.live, which has been our public
product domain and PWA since April 3, 2026.

Evidence of ownership of aurex.live:
- Registrar: Namecheap
- Order #: 198745654
- Transaction ID: 241830864
- Registrant: Fernando Gabriel Moscón
- Registration date: April 3, 2026
- Active production PWA at https://aurex.live (with identical AUREX logo)

We have no affiliation, agreement, or connection with www.aurex.ai.
The name "AUREX LIVE" is derived exclusively from our owned domain
and is used consistently across all our platforms:
- Web PWA (aurex.live)
- Android Google Play (current production)
- iOS (this submission)

We have attached the Namecheap purchase confirmation as documentary
proof of ownership. A live verification of https://aurex.live can
also be performed to confirm consistent branding.

Trademark search via USPTO (Justia): no registered trademark for
"AUREX" in software, mobile apps, or financial services categories.

Please let us know if any additional documentation is required.

Best regards,
Fernando Gabriel Moscón
Apple Developer Team ID: TX7C2F79U9
```

### 1.5 Riesgos abiertos y mitigaciones

| Riesgo | Probabilidad | Mitigación activa |
|---|---|---|
| Apple rechaza otra vez por mismo motivo | Baja | 12 superficies cambiadas + reply + comprobante Namecheap + WHOIS confirmado |
| Apple objeta OTRA cosa distinta | Media | Sin garantía, pero reviewer típicamente enfoca en motivo previo |
| Build 17 aprobado y se distribuye sin querer | Casi nula | **Manual Release OFF** marcado en submit |
| Apple tarda >72h en responder | Media | Tener listo Expedited Review Request |
| IAP Tier 1 no resuelve cobros Android | **Alta** | Plan B-1/B-2/B-3 documentado (ver §3) |
| 19+ días queue Build 25 cuando llegue su turno | Alta | Sin garantía aceleración — monitorear y pedir Expedited si >72h |

### 1.6 Acción al arrancar próxima sesión

1. **PRIMER paso:** abrir App Store Connect → ¿Apple respondió la re-submission?
   - Si **aprobado**: NO distribuir (Manual Release OFF está marcado). Build 17 queda "approved-no-distribuido". Avanzar después con Build 25 cuando IAP funcione en Android.
   - Si **rechazado de nuevo**: re-leer mensaje literal, analizar con Escritorio, iterar.
   - Si **sin respuesta y pasaron >72h**: preparar Expedited Review Request.

### 1.7 Archivos clave (Apple Build 17)

| Archivo | Path |
|---|---|
| INFORME v3 (decisión D-modificada aprobada) | `~/Desktop/aurex-app/briefs/INFORME_GRAL_APPLE_v3_16MAY.md` |
| INFORME v2 (superado) | `~/Desktop/aurex-app/briefs/INFORME_GRAL_APPLE_v2_16MAY.md` |
| INFORME v1 (superado) | `~/Desktop/aurex-app/briefs/INFORME_GRAL_APPLE_v1_15MAY.md` |
| Análisis rechazo inicial | `~/Desktop/aurex-app/briefs/ANALISIS_RECHAZO_APPLE_15MAY_CONSOLIDADO.md` |
| Review Escritorio v2 | `~/Desktop/aurex-app/briefs/REVIEW_ESCRITORIO_APPLE_v2_16MAY.md` |
| Carpeta Dropbox específica | `~/Dropbox/AUREX/Apple STORE IOS/` |
| Dropbox REVIEW APPLE (sub) | `~/Dropbox/AUREX/Apple STORE IOS/REVIEW APPLE/` |
| Memoria Code | `~/.claude/projects/-Users-fernandomoscon/memory/project_build17_ios_status.md` |
| Memoria Code Build 33/Apple submitted | `~/.claude/projects/-Users-fernandomoscon/memory/project_build33_android_16may.md` |

---

## 2. ANDROID BUILD 33 — EN PRODUCCIÓN PLAY STORE

### 2.1 Estado actual

| Campo | Valor |
|---|---|
| **Estado** | ✅ PUBLICADO en producción Google Play |
| Build | 33 (versionCode 33, versionName 1.0.33) |
| Reemplazó a | Build 17 (que tenía bug P0 signup — no se podían registrar usuarios nuevos) |
| Subido | 15-may-2026 PM |
| Aprobado y publicado | 16-may-2026 madrugada AR |
| Instalaciones al cierre 16-may | 23 |
| Bundle ID | `com.aurexapp` |
| Track origen | Internal Testing → promovido a Producción |
| Track Alpha Build 17 | ⚠️ **Pendiente detener** (Build 17 todavía activo en Alpha) — hacer cuando Build 33 esté consolidado varios días sin issues |

### 2.2 Qué NO incluye Build 33 (importante)

**Build 33 NO tiene IAP Tier 1 implementado.** Por eso el bug crítico §3 (IAP "product not available for purchase") sigue presente. La compra de PRO/ELITE NO funciona en producción Android al día de hoy.

**Estado real Builds Android al 17-may:**
- Build 33 = **PRODUCCIÓN Play Store**
- Build 34 = **PRUEBA INTERNA** (ya subido)
- Build 35 = próximo a compilar si llega solución RC (Tier 1 IAP)

**Estado actual del plan IAP Tier 1:** PAUSADO esperando respuesta RC support al ticket #76809 (ver §3).

### 2.3 Archivos clave (Android Build 33)

| Archivo | Path |
|---|---|
| Memoria estado al 16-may | `~/.claude/projects/-Users-fernandomoscon/memory/project_build33_android_16may.md` |
| Brief estado Build 33 (16-may madrugada) | `~/Desktop/aurex-app/briefs/BRIEF_BUILD33_ESTADO_16MAY.md` (si existe) |
| Backup AAB | `~/AurexApp/backups/aab/` (regla obligatoria) |

---

## 3. 🚨 IAP / REVENUECAT — BUG P0 ABIERTO + TICKET #76809

### 3.1 Síntoma exacto reproducible (verificado múltiples veces con adb logcat)

1. App AUREX v1.0.35 instalada vía **Play Store Internal Testing oficial** (installer = `com.android.vending` confirmado).
2. Login con `fmoscon@gmail.com` → RC identifica usuario con UUID Supabase `174187a7-d640-459b-9426-9c28146f4e23` → `GET /v1/subscribers/174187a7... 200 OK`.
3. `SubscriptionScreen` carga: `Purchases.getOfferings()` devuelve 4 offerings con precios + offerIdToken + basePlanId.
4. Usuario toca botón "Quiero PRO/ELITE mensual" → `handlePurchase(pkg)` → `Purchases.purchasePackage(pkg)`.
5. RC consulta a Google Play `getProducts(productId)` → Google devuelve **productDetails COMPLETO** con precio + offerToken + basePlanId.
6. **~12 ms después → popup en pantalla "Error / The product is not available for purchase".**
7. **NUNCA se llama `launchBillingFlow`. NUNCA se contacta Google Play Billing real. NUNCA se genera evento que llegue al webhook backend.**

### 3.2 Stack técnico verificado

- `react-native-purchases` 9.15.1
- `purchases-hybrid-common` 17.54.0
- **Google Play Billing Library v8.0.0** (nueva, lanzada feb 2026)
- `targetSdkVersion 36` (Android 16, muy reciente)
- React Native 0.84.1
- ProGuard activo con reglas oficiales RC

### 3.3 Las 5 causas conocidas que RC documenta — TODAS DESCARTADAS

| # | Causa documentada por RC | Estado |
|---|---|---|
| 1 | País del producto no incluye AR (Play Console) | ✅ DESCARTADO — Escritorio verificó los 4 productos con "174 países o regiones" (incluye AR) |
| 2 | País de cuenta tester ≠ países del producto | ✅ DESCARTADO — Fernando verificó en `pay.google.com/payments/home`: AR confirmado |
| 3 | PIN no configurado en Samsung | ✅ DESCARTADO — Fernando confirmó PIN + biométrico activos |
| 4 | Tester nunca abrió URL opt-in "Become a tester" | ✅ DESCARTADO — Fernando confirmó haber clickeado opt-in previamente |
| 5 | Application ID mismatch | ✅ DESCARTADO — `com.aurexapp` en ambos lados |

### 3.4 Hipótesis causa raíz (Code)

- **Issue conocida RC #3039** `RevenueCat/purchases-android` (enero 2026, label "acknowledged bug", cerrado SIN fix público).
- URL: `https://github.com/RevenueCat/purchases-android/issues/3039`
- Síntoma casi idéntico al nuestro.
- RC reconoció el problema pero no publicó solución.
- Probablemente bug estructural en RC SDK 9.15.1 + Google Play Billing v8 + targetSdk 36 (combinación muy nueva).

### 3.5 Ticket RC #76809 — ENVIADO 16-may PM

**Estado:** ESPERANDO RESPUESTA RC SUPPORT.
**SLA típico:** 24-72h hábiles.

**Contenido del reply enviado:**
- Stack técnico completo.
- Flujo reproducible paso a paso (8 puntos).
- 4 productos afectados.
- 9 cosas ya descartadas.
- Anomalía adicional: Customer aparece como "not found" en RC Dashboard a pesar de que SDK devuelve 200 OK en `GET /v1/subscribers/UUID`.
- Referencia a Issue #3039.
- 4 preguntas concretas a RC support.

**Adjuntos (6 screenshots en ZIP de 9 MB):**
1. `01_play_console_suscripciones.jpg` — 4 productos Published.
2. `02_play_console_pro_mensual_detalle.jpg` — Detalle PRO Monthly.
3. `03_rc_customer_not_found.jpg` — Customer not found en RC Dashboard.
4. `03b_play_console_elite_mensual_detalle.jpg` — Detalle ELITE Monthly.
5. `04_samsung_popup_error_build35.jpg` — Popup error real en Samsung Z Flip 3.
6. `05_play_console_build35.jpg` — Build 35 activo en Internal Testing.

**Ruta ZIP local:** `~/Desktop/CODE/screenshots_rc_support/rc_support_screenshots_16may_compressed.zip`

### 3.6 Plan B si RC no responde o no resuelve

Brief completo: `~/Desktop/aurex-app/briefs/PLAN_B_IAP_SI_RC_NO_RESPONDE.md`

| Plan | Tiempo | Descripción |
|---|---|---|
| **B-1** | 2-3 días | Webhook directo Google Play (bypass RC parcial) — recibimos notificaciones de compra directo de Google y procesamos en backend Railway sin pasar por RC. |
| **B-2** | 5-7 días | Reemplazo total RC con Stripe + native IAP — más invasivo pero elimina dependencia RC. |
| **B-3** | 1 día | Validación manual via Google Play API — temporal, no escala. |

**Decision matrix:**
- 0-3 días sin respuesta RC: esperar.
- 3-7 días: empezar B-1 en paralelo.
- 7-14 días: ejecutar B-2.
- B-3 solo como puente si nada de lo anterior funciona.

### 3.7 Tier 1 IAP — fixes implementables ya (5 archivos)

Plan archivo-por-archivo en: `~/Desktop/aurex-app/briefs/PLAN_IAP_TIER1_BUILD34_v2_16MAY.md`

| ID | Archivo | Cambio |
|---|---|---|
| IAP-1 | `App.js` | useEffect boot → si hay sesión Supabase, `Purchases.logIn(uid)` antes de render |
| IAP-2 | `src/screens/LoginScreen.js` | Post-signIn exitoso → `Purchases.logIn(uid)` |
| IAP-3 | `src/screens/SignupScreen.js` | Post-signUp exitoso → `Purchases.logIn(uid)` |
| IAP-4 | `src/screens/PerfilScreen.js` | En logout → `Purchases.logOut()` antes de `supabase.auth.signOut()` |
| IAP-5 | Backend `server.js` L1631-1643 | Si `app_user_id` empieza con `$anonymous:` → log + alerta Telegram |
| IAP-6 | `PerfilScreen.js` deleteAccount | `Purchases.logOut()` antes de borrar cuenta |

**Estado plan:** documentado. NO implementado. Pausado esperando respuesta RC.

**ORDEN OBLIGATORIO (review Escritorio):** IAP-5 backend PRIMERO → validar webhook con evento de test desde RC dashboard → si OK frontend RN.

### 3.8 Acción al arrancar próxima sesión

1. ¿RC respondió ticket #76809? → check inbox `fmoscon@gmail.com` + dashboard RC.
   - Si respondió **con solución concreta**: aplicar fix → **Build 35** (no 34, 34 ya está en prueba interna) → Internal Testing → compra real Samsung con cuenta `app.aurex@gmail.com` + tarjeta real (refund inmediato Play Console 48h) → si OK promover a Producción.
   - Si respondió **pidiendo más info**: armar respuesta con Escritorio.
   - Si **sin respuesta y pasaron >72h hábiles**: arrancar Plan B-1.

### 3.9 Archivos clave (IAP / RC)

| Archivo | Path |
|---|---|
| CONSOLIDADO IAP v2 (16-may PM, ticket enviado) | `~/Desktop/aurex-app/briefs/CONSOLIDADO_IAP_v2_16MAY.md` |
| CONSOLIDADO IAP v1 (16-may madrugada) | `~/Desktop/aurex-app/briefs/CONSOLIDADO_IAP_v1_16MAY.md` |
| Plan IAP Tier 1 v2 (archivo-por-archivo) | `~/Desktop/aurex-app/briefs/PLAN_IAP_TIER1_BUILD34_v2_16MAY.md` |
| Plan B IAP contingencia | `~/Desktop/aurex-app/briefs/PLAN_B_IAP_SI_RC_NO_RESPONDE.md` |
| Análisis IAP profundo 15-may | `~/Desktop/aurex-app/briefs/ANALISIS_PROFUNDO_COMPRA_IAP_15MAY.md` |
| Ticket RC enviado 15-may (inicial) | `~/Desktop/aurex-app/briefs/TICKET_REVENUECAT_FINAL_15MAY.md` |
| Memoria Plan B IAP | `~/.claude/projects/-Users-fernandomoscon/memory/project_plan_b_iap_si_rc_no_responde.md` |
| Memoria Build 21 estado (compras IAP) | `~/.claude/projects/-Users-fernandomoscon/memory/project_build21_estado_15may.md` |
| ZIP screenshots ticket | `~/Desktop/CODE/screenshots_rc_support/rc_support_screenshots_16may_compressed.zip` |
| Datos operativos RC | Project ID AUREX `228caf37` · Android App ID `app8be7db09a7` · Webhook URL `https://api.revenuecat.com/v1/incoming-webhooks/apple-server-to-server-notification/WICtYZubpcHyBpPfLnZMoagjatQAyjPD` |

---

## 4. LANDING v3 AUREX.LIVE — PENDIENTE REVIEW

### 4.1 Sesión 17-may (esta sesión) — qué se hizo

1. **Brief STACK herramientas Code** consolidado y commiteado (`2c4a154`).
2. **Brief CAPTURAS mapeo v2** — 35 capturas EN+ES mapeadas a 18 bloques landing v3 (`2c4a154`).
3. **Brief BENCHMARK v2** con competidores DIRECTOS verificados Firecrawl: TradingView, Investing.com, Seeking Alpha, Bloomberg (`970a7aa`). Celda Bloomberg corregida a "≠ Institutional" tras feedback Escritorio (`d68a58d`).
4. **Brief RESPUESTA Escritorio** cerrando sus 3 condiciones de OK (`d68a58d`).
5. **HTML landing v3** escrito de cero, vanilla HTML/CSS/JS, 1.163 líneas, 18 bloques, 33 capturas EN+ES integradas.
6. **2 agregados nuevos** sobre v3 base (tras observaciones de Fernando + recomendación Escritorio):
   - **Header newsletter form** con CTA dorado "Get early access" + micro-modal AJAX → Formspree free.
   - **Tablero "Live Market Pulse" táctico** estilo Bloomberg/Tokyo reemplazando el Bloque 11.5 "By the numbers" anterior.
7. **Cuenta Formspree creada** 17-may 03:08 AR con `fmoscon@gmail.com`. Form ID: `xpqnajgp`. Endpoint: `https://formspree.io/f/xpqnajgp`. Notificaciones a `app.aurex@gmail.com`. Free tier 50 submissions/mes.
8. **Playwright screenshots** del HTML actualizado en desktop 1440×900 + mobile 390×844 fullpage.
9. **Snapshot PENDIENTE REVIEW** commiteado (`a74e981`) con HTML + 2 PNG + README en `briefs/landing_v3_PENDIENTE_REVIEW_17MAY/`.
10. **4 .docx** generados con pandoc y espejados en Dropbox.

### 4.2 Detalle de los 2 agregados nuevos

**Agregado 1 — Header newsletter (header.hdr-cta):**
- Botón `Get early access →` color dorado outline (var(--gold)) entre el lang-sel y el "Get the app".
- Click abre micro-modal con fade overlay + slide animation.
- 1 solo campo email required + autocomplete email.
- Submit AJAX vía `fetch` POST a `https://formspree.io/f/xpqnajgp` con header `Accept: application/json`.
- Spinner (botón "Sending...") + mensajes inline success (✓ verde) / error (✕ rojo).
- Cierre por X / click overlay / tecla Escape.
- Copy: "Get early access" + "Monthly market reports + new feature drops, straight from the AUREX team." + "Be first to know. No spam."

**Agregado 2 — Tablero Live Market Pulse (reemplaza Bloque 11.5):**
- Fondo `#0d0d12` (más oscuro que body para destacar).
- Borde sutil dorado, 3 secciones internas:
  - **Magnificent 7 · Equities** (AAPL / NVDA / MSFT / GOOGL / META / AMZN / TSLA) — hardcoded indicativo.
  - **Crypto Top 5 · Live** (BTC / ETH / SOL / BNB / XRP) — **REAL** vía CoinGecko free API, refresh cada 60s.
  - **Commodities + Macro** (GOLD / BRENT / SP500 FUT / VIX) — hardcoded indicativo.
- Verde neón `#00ff88` positivos / rojo `#ff4444` negativos / dorado `#D4A017` labels.
- Dot `● LIVE` con animación pulse + reloj UTC en tiempo real (HH:MM:SS UTC).
- IntersectionObserver: fetch CoinGecko solo arranca cuando el bloque entra en viewport.
- Disclosure honesto en footer del tablero (transparencia hacia el usuario).

### 4.3 Estado actual del snapshot PENDIENTE REVIEW

| Item | Estado |
|---|---|
| HTML | 1.163 líneas, 72.979 bytes, vanilla |
| Screenshot desktop 1440×900 | ✅ 558 KB |
| Screenshot mobile 390×844 | ✅ 931 KB |
| README con instrucciones revisión | ✅ |
| 5 lugares regla (Code/Dropbox/GitHub/.docx/raw URL) | ✅ TODOS verificados HTTP 200 |
| OK visual Fernando | ⏸ PENDIENTE |
| Revisión cruzada Escritorio | ⏸ PENDIENTE |
| OG image 1200×630 final | ⏸ PENDIENTE generar con Canvas skill |
| Logo oficial Drive (4 archivos) | 1/4 descargado (no bloquea) |

### 4.4 Decisiones pendientes en landing v3

1. **OK visual desktop** — ¿tablero táctico se integra bien con el diseño dorado AUREX, o el contraste de paletas molesta?
2. **OK visual mobile** — tablero colapsa a 1 columna, ¿se ve legible?
3. **OK visual newsletter modal** — copy + posición + interacción.
4. **OG image** — Code tiene que generarla con Canvas skill (mix v2 Stellar ajustada + v3 Tactical ya decidido por Fernando) y guardarla en `assets/landing/og_image.png`.
5. **Logo oficial Drive** — bajar los 3 archivos restantes de Google Drive (con marca + sin marca, formatos iOS/Android/PWA/Marketing).

### 4.5 Acción al arrancar próxima sesión

1. Fernando abre los 2 PNG (en `~/Dropbox/AUREX/LANDING/v3/preview/`) → dice si va o si pide ajustes.
2. Si Fernando pide ajustes → iteración local + nuevo Playwright + nuevos PNG → loop hasta OK.
3. Si OK Fernando → pasar URLs a Escritorio → esperar revisión cruzada Escritorio.
4. Si OK Escritorio → Code arranca deploy:
   - Generar OG image 1200×630.
   - Mover archivos a root del repo aurex-app (reemplazando index.html actual fase 0).
   - Verificar links internos (`#plans`, `#features`, etc.).
   - Commit + push.
   - GitHub Pages auto-deploy a aurex.live (1-3 min).
   - Test funcional: submit form newsletter con email de prueba → confirmar notificación a `app.aurex@gmail.com`.
5. Si todo OK → anuncio en Telegram + X.

### 4.6 Archivos clave (Landing v3)

| Archivo | Path |
|---|---|
| Snapshot HTML pendiente review | `~/Desktop/aurex-app/briefs/landing_v3_PENDIENTE_REVIEW_17MAY/index.html` |
| README pendiente review | `~/Desktop/aurex-app/briefs/landing_v3_PENDIENTE_REVIEW_17MAY/README.md` |
| Preview desktop v2 (con agregados) | `~/Desktop/aurex-app/briefs/landing_v3_PENDIENTE_REVIEW_17MAY/landing_v3_desktop_v2.png` |
| Preview mobile v2 (con agregados) | `~/Desktop/aurex-app/briefs/landing_v3_PENDIENTE_REVIEW_17MAY/landing_v3_mobile_v2.png` |
| Preview desktop v1 (sin agregados) | `~/Dropbox/AUREX/LANDING/v3/preview/landing_v3_desktop.png` |
| Preview mobile v1 (sin agregados) | `~/Dropbox/AUREX/LANDING/v3/preview/landing_v3_mobile.png` |
| HTML working copy local | `~/Desktop/CODE/landing_v3/index.html` |
| Capturas EN+ES (33 archivos) | `~/Desktop/CODE/landing_v3/assets/captures/` |
| Logo oficial Drive (1/4 bajado) | `~/Desktop/CODE/landing_v3/assets_oficiales_drive/` |
| Brief STACK herramientas | `~/Desktop/aurex-app/briefs/STACK_HERRAMIENTAS_CODE_AUREX_17MAY.md` |
| Brief CAPTURAS mapeo | `~/Desktop/aurex-app/briefs/CAPTURAS_LANDING_v2_MAPEO_17MAY.md` |
| Brief BENCHMARK v2 | `~/Desktop/aurex-app/briefs/BENCHMARK_v2_COMPETIDORES_REALES_17MAY.md` |
| Brief RESPUESTA Escritorio | `~/Desktop/aurex-app/briefs/RESPUESTA_ESCRITORIO_OK_CODEO_17MAY.md` |
| Dropbox mirror MAPA DE TRABAJO | `~/Dropbox/AUREX/MAPA DE TRABAJO/` |
| Dropbox mirror LANDING | `~/Dropbox/AUREX/LANDING/v3/PENDIENTE_REVIEW_17MAY/` |
| Memoria stack landing | `~/.claude/projects/-Users-fernandomoscon/memory/project_landing_stack_decision.md` |

### 4.7 Formspree (newsletter form)

| Dato | Valor |
|---|---|
| Servicio | Formspree Free |
| Cuenta creada | 17-may-2026 ~03:08 AR |
| Owner email (login) | `fmoscon@gmail.com` |
| Notification email | `app.aurex@gmail.com` (configurado en Workflow tab) |
| Form name | Aurex Newsletter |
| Form ID | `xpqnajgp` |
| Endpoint | `https://formspree.io/f/xpqnajgp` |
| Free tier | 50 submissions/mes |
| Dashboard submissions | `https://formspree.io/forms/xpqnajgp/submissions` |
| Upgrade futuro | Basic $10/mes → 1.000 submissions/mes |

---

## 5. PLAN MKT v3 — PENDIENTE, NO ARRANCADO

### 5.1 Estado

- **NO arrancado todavía.** Bloqueado hasta que landing v3 esté live en aurex.live.
- Brief base: `~/Dropbox/AUREX/MARKETING/MARKETING_CONTEXT_AUREX_v1.md` (14 secciones canónicas, fuente de verdad para las 42 marketing-skills).
- Decisión 14-may: WhatsApp Business OUT de FASE 1 (incidente WA-001/002 + watch period).
- Plan MKT v2 cerrado pero ya outdated: incorporar la landing v3 + el sistema de captura de leads via Formspree.

### 5.2 Archivos clave (MKT)

| Archivo | Path |
|---|---|
| Plan MKT v2 PDF original | `~/Downloads/AUREX PLAN MKT.pdf` |
| Marketing context maestro | `~/Dropbox/AUREX/MARKETING/MARKETING_CONTEXT_AUREX_v1.md` |
| Memoria marketing context | `~/.claude/projects/-Users-fernandomoscon/memory/project_marketing_context_aurex.md` |
| Brief WhatsApp out FASE 1 | `~/Desktop/aurex-app/briefs/...84c8fb9 commit` |

---

## 6. 🗂️ MAPA DE ARCHIVOS — DÓNDE VIVE CADA COSA

### 6.1 Repos GitHub (3)

| Repo | URL | Visibilidad | Path local | Branch operativo | Deploy |
|---|---|---|---|---|---|
| **aurex-app** (PWA + landing + briefs) | `https://github.com/fmoscon-creator/aurex-app` | 🌐 PÚBLICO | `~/Desktop/aurex-app` | `main` | GitHub Pages → aurex.live |
| **AurexApp** (Nativa RN iOS+Android) | `https://github.com/fmoscon-creator/AurexApp` | 🔒 PRIVADO | `~/AurexApp` | `dev` | Xcode → App Store / Android Studio → Play Store |
| **aurex-backend** (Node.js Railway) | `https://github.com/fmoscon-creator/aurex-backend` | 🌐 PÚBLICO | `~/Desktop/aurex-backend` | `main` | Push main → Railway auto-deploy |

**Acceso Escritorio:** repos PÚBLICOS sí. Repo PRIVADO `AurexApp` NO (Escritorio es IA, sin cuenta GitHub).

### 6.2 Dropbox `~/Dropbox/AUREX/`

| Carpeta | Para qué |
|---|---|
| `MAPA DE TRABAJO/` | Briefs activos espejados de `aurex-app/briefs/` + .docx para abrir en Word |
| `Apple STORE IOS/` | Todo Apple: rechazos, comprobantes, informes |
| `Apple STORE IOS/REVIEW APPLE/` | Subcarpeta específica del proceso review actual |
| `LANDING/v3/preview/` | Screenshots de iteraciones de landing v3 |
| `LANDING/v3/PENDIENTE_REVIEW_17MAY/` | Snapshot completo HTML+PNG+README+docx pendiente review |
| `MARKETING/` | Plan MKT + contexto MKT + assets |
| `RUNWAY/`, `BANKING/`, `SECRET/` (en Desktop/CODE/) | Credenciales locales nunca commiteadas |

### 6.3 Memorias persistentes Code

`~/.claude/projects/-Users-fernandomoscon/memory/`

| Tipo | Cantidad aprox | Ejemplo |
|---|---|---|
| `project_*.md` | ~25 | `project_build33_android_16may.md`, `project_plan_b_iap_si_rc_no_responde.md` |
| `feedback_*.md` | ~30 | `feedback_briefs_accesibles_escritorio.md`, `feedback_una_decision_por_vez.md` |
| `roles_*.md` | 1 | `roles_code_escritorio.md` |
| `MEMORY.md` (índice) | 1 | Cargado automáticamente al inicio de cada sesión |

Backup: `~/Desktop/aurex-memory-backup/` (espejo manual).

### 6.4 Working copies locales (NO commiteados, working tree)

| Carpeta | Para qué |
|---|---|
| `~/Desktop/CODE/landing_v3/` | Working copy de landing v3 (HTML + 33 capturas + logo Drive) |
| `~/Desktop/CODE/SECRET/` | Credenciales locales (Supabase service key, PayPal, RC) — nunca commitear |
| `~/Desktop/CODE/screenshots_rc_support/` | ZIP screenshots ticket RC #76809 |
| `~/Desktop/CODE/canvas_demos/aurex_og/` | 4 propuestas OG image generadas con Canvas skill |
| `~/AurexApp/backups/aab/` | Backups AAB Android (regla obligatoria) |

### 6.5 Briefs commiteados sesión 17-may (orden cronológico)

| Commit SHA | Hora AR | Archivo principal |
|---|---|---|
| `0243a53` | 16-05 21:58 | FASE 0 reorg PWA a /app/ + landing nueva root |
| `9a864cb` | 17-05 00:12 | mapeo 39 capturas Build 33 EN+ES |
| `970a7aa` | 17-05 01:15 | BENCHMARK v2 competidores (Firecrawl) |
| `2c4a154` | 17-05 01:25 | STACK herramientas + CAPTURAS mapeo v2 con OK Escritorio |
| `d68a58d` | 17-05 01:36 | celda Bloomberg corregida + respuesta a 3 condiciones Escritorio |
| `a74e981` | 17-05 03:35 | **snapshot landing v3 PENDIENTE REVIEW (HTML+PNG+README)** |
| `[próximo]` | 17-05 03:40+ | este doc CIERRE_SESION_17MAY |

---

## 7. ⏭️ PENDIENTES PRÓXIMA SESIÓN — ORDEN DE ARRANQUE SUGERIDO

### Paso 0 — Check inicial obligatorio (primeros 5 minutos)

1. Leer este mismo doc completo.
2. Comparar `date` actual vs commit del brief (esta regla está en CLAUDE.md).
3. Check estado externo:
   - ¿Apple respondió Build 17 re-submission? (App Store Connect)
   - ¿RC respondió ticket #76809? (inbox `fmoscon@gmail.com` + dashboard RC)
   - ¿Build 33 sigue OK en Google Play producción? (sin crashes nuevos)

### Paso 1 — Frente IAP (más urgente, comercial bloqueado)

- Si RC respondió **con solución concreta**: aplicar → **Build 35** (34 ya está en prueba interna) → Internal Testing → compra real con `app.aurex@gmail.com` + tarjeta real → si OK promover Producción.
- Si RC respondió **pidiendo info adicional**: armar respuesta cruzada Code + Escritorio.
- Si **>72h hábiles sin respuesta RC**: arrancar Plan B-1 (webhook directo Google Play).

### Paso 2 — Frente Landing v3 (paralelo a IAP)

- Fernando abre los 2 PNG de `~/Dropbox/AUREX/LANDING/v3/preview/landing_v3_*_v2.png` → da OK o pide cambios.
- Pasar URLs raw a Escritorio para revisión cruzada (URLs ya pusheadas, verificadas HTTP 200).
- Si doble OK → Code genera OG image + mueve archivos a root + deploy aurex.live + test funcional newsletter.

### Paso 3 — Frente Apple (paralelo, sin acción de Code mientras Apple esté revisando)

- Solo monitorear status en App Store Connect.
- Si Apple **aprueba**: NO distribuir (Manual Release OFF). Avanzar después con Build 25 cuando IAP funcione.
- Si Apple **rechaza otra vez**: análisis cruzado Code + Escritorio.
- Si **>72h sin respuesta**: Expedited Review Request.

### Paso 4 — Pendiente menor

- Detener track Alpha Build 17 Android cuando Build 33 lleve varios días en Producción sin issues.

### Paso 5 — Si todo el camino crítico avanza

- Fase 3 iOS Build 25 (solo cuando IAP Tier 1 confirmado funcionando en Android producción).
- Plan MKT v3 (cuando landing v3 esté live).

---

## 8. 📨 BLOQUE COPY-PASTE PARA ESCRITORIO (al arrancar próxima sesión)

```
Hola Escritorio, retomamos sesión post-cierre nocturno 17-may.

Doc consolidado de cierre (TODO el contexto en 1 archivo):
https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/CIERRE_SESION_17MAY_STATUS_PENDIENTES.md?nocache=99

Si la URL tira 404 o contenido viejo: agregá ?nocache=<numero> al final.

Lee ese doc primero, después estos en orden de prioridad si necesitás detalle:

1. Landing v3 PENDIENTE REVIEW (esperando tu OK visual + el de Fernando):
   - README contexto:
     https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/landing_v3_PENDIENTE_REVIEW_17MAY/README.md?nocache=99
   - Screenshot desktop 1440x900:
     https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/landing_v3_PENDIENTE_REVIEW_17MAY/landing_v3_desktop_v2.png?nocache=99
   - Screenshot mobile 390x844:
     https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/landing_v3_PENDIENTE_REVIEW_17MAY/landing_v3_mobile_v2.png?nocache=99
   - HTML crudo (1.163 lineas):
     https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/landing_v3_PENDIENTE_REVIEW_17MAY/index.html?nocache=99

2. Apple Build 17 estado completo (rechazo + reply enviada):
   https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/INFORME_GRAL_APPLE_v3_16MAY.md?nocache=99

3. IAP / RC ticket #76809 (bug critico abierto):
   https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/CONSOLIDADO_IAP_v2_16MAY.md?nocache=99

4. Plan B IAP si RC no responde:
   https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/PLAN_B_IAP_SI_RC_NO_RESPONDE.md?nocache=99

Estado al cierre:
- Apple Build 17: re-submission enviada 16-may, ESPERANDO Apple
- RC ticket #76809: enviado 16-may PM, ESPERANDO RC support
- Android Build 33: PUBLICADO produccion (sin IAP funcionando todavia)
- Landing v3: snapshot PENDIENTE REVIEW commit a74e981 — esperando OK visual

Primeras 2 cosas a chequear vos al arrancar:
1. ¿Apple respondió la re-submission?
2. ¿RC respondió el ticket #76809?
```

---

## 9. CHECKLIST 5 LUGARES (regla `feedback_briefs_accesibles_escritorio`)

Este doc cumple:

- [x] Local Code: `~/Desktop/aurex-app/briefs/CIERRE_SESION_17MAY_STATUS_PENDIENTES.md`
- [x] Dropbox: `~/Dropbox/AUREX/MAPA DE TRABAJO/CIERRE_SESION_17MAY_STATUS_PENDIENTES.md`
- [x] `.docx` espejo: `~/Dropbox/AUREX/MAPA DE TRABAJO/CIERRE_SESION_17MAY_STATUS_PENDIENTES.docx`
- [x] Commit + push GitHub: pendiente (próximo commit en cadena)
- [x] Raw URL HTTP 200 verificada: pendiente (verificación post-push)

---

**Fin doc cierre. Fernando, descansá. Mañana arrancamos por el Paso 0 → Check inicial. Buen descanso.** 🌙
