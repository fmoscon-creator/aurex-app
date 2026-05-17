# 🌟 BRIEF MAESTRO AUREX — Estado vivo del proyecto

> **Archivo único de seguimiento.** Reemplaza los múltiples briefs sueltos. Se actualiza con cada hito.
> **NO bump de nombre** (sin `_v1`, `_17MAY`). La historia vive en `git log`.
> **Última actualización:** 17-may-2026 ~14:30 AR
> **Última actualización significativa:** primer commit del brief maestro consolidado, reemplaza el `BRIEF_AUREX_LATEST.md` que quedó desactualizado al 15-may.
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
| 🍎 **Apple Build 17 iOS** | 🟡 Re-submission EN COLA Apple Review | Esperar respuesta Apple | Respuesta Apple Review |
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

### 5.2 Pendientes Landing v3

1. **Fernando** abre los 2 PNG en `~/Dropbox/AUREX/LANDING/v3/preview/landing_v3_*_v2.png` → OK o lista de ajustes.
2. Si OK Fernando → raw URLs a Escritorio para revisión cruzada.
3. Si doble OK → Code deploy:
   - Generar OG image 1200×630 con Canvas skill (mix v2 Stellar + v3 Tactical, ya elegido).
   - Bajar 3 logos restantes Google Drive (1/4 bajado).
   - Mover HTML + assets de `~/Desktop/CODE/landing_v3/` a root del repo aurex-app.
   - Verificar links internos.
   - Commit + push → GitHub Pages auto-deploy a aurex.live.
   - Test funcional: submit form newsletter con email de prueba → confirmar notificación a `app.aurex@gmail.com`.
4. Si Fernando pide ajustes → iteración local + nuevo Playwright + loop hasta OK.

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
- ❌ Commit menor de código que no cambia estado de un frente → NO actualizar.
- ❌ Cada hora "por las dudas" → NO actualizar.

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
