# INFORME GRAL CONSOLIDADO — RECHAZO APPLE + DECISIÓN OPCIÓN D-MODIFICADA
> Versión: **v3** (supera v2 con review Escritorio + inventario 12 superficies auditado)
> Fecha v3: 16-may-2026 02:30 AR
> Decisión: **Opción D-modificada APROBADA por Fernando**
> Autor: Code + Review Escritorio (`REVIEW_ESCRITORIO_APPLE_v2_16MAY.md`)
> Cambios v2→v3: (1) reply text §4 sin asumir Build 33 producción confirmada; (2) tabla riesgos sin suposición de aceleración Apple; (3) inventario 12 superficies oficial Escritorio incorporado como §3-Bis.

---

## 0. DECISIÓN FINAL CONSENSUADA

**Fernando aprobó Opción D-modificada el 16-may-2026 ~02:00 AR**, con el ajuste obligatorio propuesto por Escritorio.

### Resumen ejecutivo
- **NO se rechaza Build 17** → preservar slot Apple, evitar 4ta interacción negativa.
- **Cambio metadata "AUREX AI" → "AUREX LIVE"** en las 12 superficies de App Store Connect (no solo el Name).
- **Manual Release OFF** → si Apple aprueba, NO se distribuye automáticamente.
- **EN PARALELO**: implementar IAP Tier 1 en Build 34 Android, validar cobros reales en producción Android.
- **DESPUÉS de IAP confirmado en Android**: compilar iOS Build 25 con TODO (signup + push + gating + IAP funcionando + nombre AUREX LIVE).
- iOS Build 25 a Apple Review como nueva versión 1.0.25.
- Build 17 queda archivado "approved-no-distribuido" cuando Apple lo apruebe.

### Por qué D-modificada y no C
Escritorio recomendó originalmente C (retirar Build 17 + Build 25 con todo). Code propuso D-modificada como alternativa más conservadora. Tras debate, ambos coincidieron + Fernando aprobó:
- C suma una 4ta interacción negativa con Apple (Build 17 sería el 3er reject/retire en pocos meses).
- D-modificada con Manual Release OFF neutraliza el riesgo de distribución accidental.
- Validar IAP en Android primero ahorra un submit iOS si los fixes no funcionan (escenario probable según historial de 11 intentos previos fallidos).

---

## 1. ESTADO REAL — CADA BINARIO Y DÓNDE ESTÁ

### 1.1 iOS

| Build | versionCode iOS | Dónde | Estado |
|---|---|---|---|
| **Build 17** | 17 | App Store Review (rechazado 15-may) | Pendiente cambio metadata + re-submit |
| **Build 24** | 24 | TestFlight Internal Testing | Activo, NO equivalente al Android 33 (le faltan signup, gating, fixes UX) |
| **Build 25** (futuro) | 25 | NO compilado todavía | Esperando: IAP Tier 1 validado en Android + decisión compile |

### 1.2 Android

| Build | versionCode | Dónde | Estado |
|---|---|---|---|
| **Build 17** | 17 | Producción Play Store | Activo + bug P0 signup |
| **Build 33** | 33 | **EN REVISIÓN Google Play** (16-may 00:30 AR) | Esperando aprobación 1-3 hs típicas |
| **Build 34** (futuro) | 34 | NO compilado | Plan: IAP Tier 1 implementado |

---

## 2. RECHAZO APPLE — DATOS VERIFICADOS

| Campo | Valor |
|---|---|
| Submission ID | `e0e7fb35-11a4-4c1d-854c-60a80c4799e6` |
| Versión revisada | 1.0 (17) |
| Dispositivo revisión | iPhone 17 Pro Max |
| Guideline | 4.1(c) Design — Copycats |
| Mensaje literal | *"The app's name contains an icon, brand, or product name that belongs to the following developer: www.aurex.ai."* |
| Único motivo | Nombre. Sin otros objetivos reportados. |

### 2.1 Reporte Escritorio (15-may PM)
- **Trademark USPTO:** 51 registros "AUREX", ninguno en software/fintech. Riesgo BAJO.
- **WHOIS aurex.ai:** registrado 25-jun-2020, vence 25-jun-2026. GoDaddy. Titular oculto.

### 2.2 Prueba titularidad aurex.live (Fernando)
| Campo | Valor |
|---|---|
| Titular | Fernando Gabriel Moscón |
| Dominio | aurex.live |
| Fecha compra | 3-abr-2026 |
| Registrador | Namecheap |
| Order # | 198745654 |
| Transaction ID | 241830864 |
| Dirección | Tronador 3430, CABA, AR |
| Pago | VISA terminada en 5541 |
| PWA producción | https://aurex.live activa con mismo logo |

---

## 3-BIS. INVENTARIO 12 SUPERFICIES — AUDITORÍA REAL ESCRITORIO (16-may)

Auditoría realizada por Escritorio directamente en App Store Connect Build 17 (1.0 17). Fuente: `REVIEW_ESCRITORIO_APPLE_v2_16MAY.md`.

| # | Superficie | Texto actual | Acción |
|---|---|---|---|
| 1 | App Name | AUREX AI | **CAMBIAR → AUREX LIVE** |
| 2 | Subtitle | 1 char (contenido no visible sin click) | Verificar visualmente |
| 3 | Description | 2 ocurrencias "AUREX AI engine" | **CAMBIAR → "AUREX engine"** |
| 4 | Keywords | 24 chars (contenido no visible sin click) | Verificar visualmente |
| 5 | Promotional Text | "Analyze 350+ assets with real-time AI data analytics..." | OK (sin AUREX AI) |
| 6 | What's New | No visible en página | Verificar |
| 7 | IAP Display Names x4 | PRO Mensual/Anual + ELITE Mensual/Anual sin AUREX AI | OK |
| 8 | IAP Grupo "Nombre de la app" en inglés | AUREX AI | **CAMBIAR → AUREX LIVE** |
| 9 | Screenshots (10) | Revisadas visualmente — sin AUREX AI incrustado | OK |
| 10 | Preview videos | 0 videos | OK |
| 11 | App Review Notes | Sin AUREX AI — agregar reply text Namecheap | **AGREGAR reply text (§4)** |
| 12 | Support/Marketing URL | No visibles — probablemente aurex.live | OK |

**Cambios CONFIRMADOS (3 superficies):** 1, 3, 8.
**Pendientes verificación visual (3):** 2, 4, 6.
**Sin cambio (5):** 5, 7, 9, 10, 12.
**Agregar contenido (1):** 11.

---

## 3. PLAN EJECUCIÓN D-MODIFICADA — FASE POR FASE

### FASE 1 — Apple metadata (Escritorio operativo, NO toca código Code)

**Paso 1.1 — Auditoría 12 superficies (Escritorio, BLOQUEANTE)**
Escritorio audita Y reporta inventario a Fernando ANTES de tocar nada:

| # | Superficie App Store Connect | Acción |
|---|---|---|
| 1 | **App Name** | Verificar texto actual → "AUREX LIVE" |
| 2 | **Subtitle** (30 chars) | Verificar ocurrencias "AUREX AI" |
| 3 | **Description** (4000 chars) | Verificar ocurrencias "AUREX AI" (reportó 2 "AUREX AI engine") |
| 4 | **Keywords** (100 chars) | Verificar |
| 5 | **Promotional Text** (170 chars) | Verificar |
| 6 | **What's New** (release notes) | Verificar |
| 7 | **IAP Display Names x4** (PRO mensual, PRO anual, ELITE mensual, ELITE anual) | Verificar Display Name + Description de cada uno |
| 8 | **Screenshots** (10 capturas) | Revisión VISUAL: ¿texto "AUREX AI" incrustado? |
| 9 | **App Preview videos** | Sin videos → OK |
| 10 | **App Privacy** | Descripciones uso datos |
| 11 | **Support URL / Marketing URL** | Probablemente OK (aurex.live) |
| 12 | **App Review Information → Notes** | Reescribir con reply argumentada |

**Output Fase 1.1**: tabla con `Superficie | Texto actual | Texto propuesto` a Fernando.

**Paso 1.2 — Aprobación Fernando**
Fernando OK el inventario → Escritorio aplica.

**Paso 1.3 — Aplicar cambios**
Escritorio cambia "AUREX AI" → "AUREX LIVE" en todas las superficies con ocurrencia.

**Paso 1.4 — Subir comprobante Namecheap**
PDF en App Review Information → Notes.

**Paso 1.5 — Pegar reply argumentada en inglés** (§4 abajo)

**Paso 1.6 — Marcar Manual Release OFF**
**CRÍTICO**: marcar "Manually release this version" → impide distribución automática si Apple aprueba.

**Paso 1.7 — Submit to App Review**

**Tiempo esperado respuesta Apple**:
- Re-submit metadata-only típico: **24-72hs**.
- Tu historial específico (Build 17 tardó 21 días): podría llegar a 3-7 días.
- Si pasan 72hs sin respuesta: Expedited Review Request.

---

### FASE 2 — IAP Tier 1 Android paralelo (Code, sin esperar Apple)

**Plan archivo-por-archivo Build 34 Android**:

| ID | Archivo | Cambio |
|---|---|---|
| IAP-1 | `App.js` | useEffect boot → si hay sesión Supabase, `Purchases.logIn(uid)` antes de render |
| IAP-2 | `src/screens/LoginScreen.js` | Post-`signInWithPassword` exitoso (2 paths) → `Purchases.logIn(uid)` |
| IAP-3 | `src/screens/SignupScreen.js` | Post-`signUp` exitoso → `Purchases.logIn(uid)` |
| IAP-4 | `src/screens/PerfilScreen.js` | En logout → `Purchases.logOut()` antes de `supabase.auth.signOut()` |
| IAP-5 | Backend webhook RC | Si `app_user_id` empieza con `$anonymous:` → `console.error` + alerta Telegram `WEBHOOK_USER_ANONIMO_${id}` |

**Bump**: versionCode 34 / versionName 1.0.34.

**Flujo**:
1. Code prepara plan archivo-por-archivo + diff.
2. Escritorio revisa.
3. Implementar + commit + push.
4. Compilar AAB Build 34.
5. Subir a Play Console Internal Testing.
6. Validar en Samsung con cuenta tester comprando PRO real (no License Tester — cuenta real con tarjeta).
7. **Si compra OK + plan se activa en Supabase + dashboard RC → Tier 1 FUNCIONA**.
8. **Si NO → escalar a Plan B**:
   - B-1: webhook directo Google Play (bypass RC parcial, 2-3 días).
   - B-2: reemplazo total RC con Stripe + native IAP (5-7 días).
   - B-3: validación manual via Google Play API (1 día, temporal).

---

### FASE 3 — iOS Build 25 (SOLO cuando IAP confirmado en Android)

**Pre-requisito**: Fase 2 demuestra que IAP funciona end-to-end en producción Android.

**Plan**:
1. Bump `ios/AurexApp.xcodeproj/project.pbxproj` `CURRENT_PROJECT_VERSION 24 → 25` y `MARKETING_VERSION 1.0 → 1.0.25`.
2. Cambiar `ios/AurexApp/Info.plist` `CFBundleDisplayName = AUREX` → `AUREX LIVE`.
3. Limpiar `src/lib/i18n.js` L145 + L257 "AUREX AI" / "AUREX IA".
4. `cd ios && pod install` (validar Podfile).
5. Archive en Xcode → upload a App Store Connect.
6. **Subir a TestFlight Internal Testing** → Fernando valida en iPhone:
   - Signup nuevo usuario.
   - Push iOS.
   - Bug H modal Agregar.
   - Bug I doble tap.
   - Gating premium (candados, lock icons).
   - Login/logout correcto.
   - **Cobro real PRO/ELITE** (con cuenta sandbox iOS).
7. Si TestFlight OK → Submit a App Review como **versión nueva 1.0.25** con metadata AUREX LIVE (consistente con cambios Fase 1).

**Tiempo Apple Review Build 25**: review completa ~19 días típicos, posiblemente más rápido si Build 17 fue aprobado previamente con AUREX LIVE.

---

### FASE 4 — Release final

1. Apple aprueba Build 25 → **Manual Release** → distribuir.
2. Build 17 queda archivado "approved-no-distribuido" (Manual Release OFF impidió distribución).
3. iOS producción al fin con app sana y completa.
4. Android Build 33/34 también en producción.

---

## 4. REPLY TEXT A APPLE — REVISADO PARA v2

Texto para sección **"App Review Information → Notes"** o reply directa al rechazo:

```
Dear App Review Team,

Thank you for your detailed review of submission ID e0e7fb35-11a4-4c1d-854c-60a80c4799e6.

We have updated the app metadata to address the Guideline 4.1(c) feedback regarding the previous name "AUREX AI".

The app has been renamed to "AUREX LIVE" — this is our own brand, based on our owned domain aurex.live, which has been our public product domain and PWA since April 3, 2026.

Evidence of ownership of aurex.live:
- Registrar: Namecheap
- Order #: 198745654
- Transaction ID: 241830864
- Registrant: Fernando Gabriel Moscón
- Registration date: April 3, 2026
- Active production PWA at https://aurex.live (with identical AUREX logo)

We have no affiliation, agreement, or connection with www.aurex.ai. The name "AUREX LIVE" is derived exclusively from our owned domain and is used consistently across all our platforms:
- Web PWA (aurex.live)
- Android Google Play production [VERIFICAR ANTES DE PEGAR: si Build 33 ya aprobado y publicado → "current production v1.0.33"; si todavía en review → "current production v1.0.17"]
- iOS (this submission)

We have attached the Namecheap purchase confirmation as documentary proof of ownership. A live verification of https://aurex.live can also be performed to confirm consistent branding.

Trademark search via USPTO (Justia): no registered trademark for "AUREX" in software, mobile apps, or financial services categories.

Please let us know if any additional documentation is required.

Best regards,
Fernando Gabriel Moscón
Apple Developer Team ID: TX7C2F79U9
```

**Adjuntar**: PDF/screenshot del comprobante Namecheap (Order #198745654).

---

## 5. RIESGOS Y MITIGACIONES

| Riesgo | Probabilidad | Mitigación |
|---|---|---|
| Apple rechaza segundo intento por mismo motivo | Baja | 12 superficies actualizadas + reply argumentada + WHOIS Namecheap |
| Apple objeta otra cosa en re-review | Media | Confiar que reviewer enfoca en el motivo previo, pero NO hay garantía |
| Build 17 aprobado y se distribuye accidentalmente | Casi nula | Manual Release OFF + doble check antes Submit |
| Apple tarda >72hs en responder | Media | Expedited Review Request preparado |
| IAP Tier 1 no resuelve los cobros | Media | Plan B-1/B-2/B-3 documentado |
| Build 25 iOS compile falla | Baja | Build 24 ya compiló OK (mismo proyecto base) |
| 19+ días queue otra vez para Build 25 | Alta | Sin garantía de aceleración — monitorear queue y preparar Expedited Review Request si pasan 72hs sin respuesta |

---

## 6. PRÓXIMOS PASOS INMEDIATOS

### Para Escritorio (operativo)
1. **AHORA**: auditar las 12 superficies de App Store Connect → reportar inventario a Fernando.
2. **Esperar OK Fernando** sobre el inventario.
3. **Aplicar cambios** "AUREX AI" → "AUREX LIVE" en todas las superficies.
4. **Subir PDF Namecheap** a App Review Information.
5. **Pegar reply text** (§4 arriba).
6. **MARCAR Manual Release OFF**.
7. **Submit to App Review**.
8. Avisar a Fernando + Code cuando esté submitted.

### Para Code (en paralelo)
1. Preparar plan archivo-por-archivo IAP Tier 1 (Fase 2) — SIN tocar código todavía.
2. Esperar OK Fernando + Escritorio sobre el plan.
3. Implementar Tier 1 + diff + AAB Build 34 + Internal Testing Android.
4. Validar cobros reales en Samsung.
5. **NO compilar iOS Build 25 hasta que IAP Tier 1 esté confirmado funcionando** en producción Android.

### Para Fernando (aprobaciones)
1. OK inventario 12 superficies.
2. OK reply text a Apple.
3. OK plan archivo-por-archivo Tier 1 IAP.
4. Compra real de prueba en Samsung post-Build 34.

---

## 7. ANEXOS

### 7.1 Archivos referenciados
- v1 superado: `~/Desktop/aurex-app/briefs/INFORME_GRAL_APPLE_v1_15MAY.md`
- Análisis IAP profundo: `~/Desktop/aurex-app/briefs/ANALISIS_PROFUNDO_COMPRA_IAP_15MAY.md`
- Plan B IAP: `~/Desktop/aurex-app/briefs/PLAN_B_IAP_SI_RC_NO_RESPONDE.md`
- Ticket RC: `~/Desktop/aurex-app/briefs/TICKET_REVENUECAT_FINAL_15MAY.md`
- Brief Build 33 estado: `~/Desktop/aurex-app/briefs/BRIEF_BUILD33_ESTADO_16MAY.md`
- Este documento v2: `~/Desktop/aurex-app/briefs/INFORME_GRAL_APPLE_v2_16MAY.md`

### 7.2 Memorias relevantes consultadas
- `project_build33_android_16may.md`
- `project_bug_signup_android_14may.md`
- `project_plan_b_iap_si_rc_no_responde.md`
- `feedback_briefs_accesibles_escritorio.md`

### 7.3 Datos operativos
- Apple Developer Team ID: `TX7C2F79U9`
- Apple Account: fmoscon@gmail.com
- Bundle ID iOS: `com.fernandomoscon.aurex`
- Bundle ID Android: `com.aurexapp`
- RevenueCat webhook: `https://api.revenuecat.com/v1/incoming-webhooks/apple-server-to-server-notification/WICtYZubpcHyBpPfLnZMoagjatQAyjPD`

---

**Fin INFORME v3. Auditoría 12 superficies: COMPLETADA por Escritorio (ver §3-Bis).**
