# PENDIENTES — RETOMAR PRÓXIMA SESIÓN
> Cierre: 16-may-2026 ~03:30 AR
> Próxima sesión: leer este archivo al arrancar para tomar contexto rápido.

---

## 🎯 ESTADO ACTUAL AL CIERRE

| Frente | Estado | Detalle |
|---|---|---|
| **Android Build 33** | ✅ PRODUCCIÓN Play Store | 23 instalaciones, reemplazó Build 17 con bug signup |
| **Apple Build 17 re-submission** | 🟡 EN REVISIÓN | Submission `e0e7fb35-11a4-4c1d-854c-60a80c4799e6`, AUREX LIVE + Manual Release ON, esperando respuesta Apple (24-72h típico, hasta 7 días por historial) |
| **Apple PDF Namecheap + reply** | ✅ SUBMITTED | Order 198745654, reply text 2589 chars |
| **IAP Tier 1 Build 34** | ⏳ LISTO PARA ARRANCAR | Plan completo documentado, NO implementado |
| **Track Alpha Build 17** | ⚠️ PENDIENTE DETENER | Cuando Build 33 esté consolidado en producción |

---

## ⏭️ PRÓXIMOS PASOS — ORDEN SUGERIDO

### 1. CHECK INICIAL — primeros 5 minutos sesión nueva
- ¿Apple respondió la re-submission? Verificar status en App Store Connect.
- ¿Build 33 sigue OK en producción? Revisar Google Play Console (sin nuevos crashes).
- ¿Vino respuesta de RevenueCat al ticket del 15-may 03:00 AR?

### 2. ARRANCAR IAP TIER 1 BUILD 34 — frente principal
Plan completo en repo: `https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/PLAN_IAP_TIER1_BUILD34_v2_16MAY.md` (usar `?nocache=<timestamp>` para bypassear CDN si recién pusheado).

**Orden de implementación obligatorio (review Escritorio):**
1. **IAP-5 BACKEND PRIMERO**: editar `aurex-backend/server.js` L1631-1643 → commit + push aurex-backend → Railway auto-deploy.
2. **🛑 VALIDAR WEBHOOK ANTES DE TOCAR FRONTEND**: Fernando dispara evento de test desde RC dashboard → Code verifica Railway logs + alerta Telegram al admin chat.
3. **Si webhook OK** → Frontend RN en `~/AurexApp/`: IAP-1 (App.js) + IAP-2 (LoginScreen) + IAP-3 (SignupScreen) + IAP-4 (PerfilScreen logout) + IAP-6 (PerfilScreen deleteAccount) → bump 34 → commit.
4. Compilar AAB Build 34.
5. Escritorio sube a Play Console Internal Testing (NO Producción).
6. Fernando valida compra real PRO en Samsung (cuenta nueva, tarjeta real, NO License Tester).
7. Verificar:
   - Dashboard RevenueCat → Customer Lists → UID Supabase visible.
   - Supabase tabla `usuarios.plan` → debe decir PRO.
   - PerfilScreen en app → debe mostrar PRO.
8. Si OK end-to-end → promover Build 34 a Producción Play Store.
9. Si NO OK → Plan B (B-1 webhook directo Google / B-2 reemplazo Stripe / B-3 manual).

### 3. ESPERAR RESPUESTA APPLE (en paralelo, sin acción de Code)
- Tipo: 24-72h típico, hasta 7 días por historial AUREX (Build 1 sin respuesta + 21 días Build 17 anterior).
- Si pasan 72h sin respuesta: Expedited Review Request.
- Si Apple aprueba: NO distribuir (Manual Release ON). Esperar a tener Build 25 iOS listo.
- Si Apple rechaza nuevamente: re-analizar (probablemente algún tema metadata más).

### 4. PENDIENTE MENOR — Detener Alpha track Android
Cuando Build 33 esté consolidado en producción (varios días sin issues), Escritorio (o Fernando) detiene el lanzamiento de Prueba cerrada Alpha (Build 17 todavía activo ahí).

### 5. FASE 3 iOS Build 25 (después de IAP Tier 1 OK confirmado)
Solo cuando Tier 1 IAP esté validado funcionando en Android producción:
1. Bump `ios/AurexApp.xcodeproj/project.pbxproj` `CURRENT_PROJECT_VERSION 24 → 25` + `MARKETING_VERSION 1.0 → 1.0.25`.
2. Cambiar `ios/AurexApp/Info.plist` `CFBundleDisplayName = AUREX → AUREX LIVE`.
3. Limpiar `src/lib/i18n.js` L145 + L257 ("AUREX AI" / "AUREX IA").
4. `cd ios && pod install`.
5. Archive Xcode → upload App Store Connect.
6. Subir TestFlight Internal Testing → Fernando valida en iPhone.
7. Submit a App Review como versión 1.0.25.

---

## 📁 DOCUMENTOS DE REFERENCIA EN REPO `aurex-app/briefs/`

- **INFORME Apple v3** (D-modificada con inventario 12 superficies): `INFORME_GRAL_APPLE_v3_16MAY.md`
- **Plan IAP Tier 1 v2** (6 cambios, plan archivo-por-archivo): `PLAN_IAP_TIER1_BUILD34_v2_16MAY.md`
- **Plan B IAP contingencia**: `PLAN_B_IAP_SI_RC_NO_RESPONDE.md`
- **Reviews Escritorio**: `REVIEW_ESCRITORIO_APPLE_v2_16MAY.md` + `REVIEW_ESCRITORIO_IAP_TIER1_16MAY.md`
- **Análisis IAP profundo (raíz)**: `ANALISIS_PROFUNDO_COMPRA_IAP_15MAY.md`
- **Ticket RevenueCat enviado 15-may**: `TICKET_REVENUECAT_FINAL_15MAY.md`

---

## 🔑 DATOS OPERATIVOS CLAVE

| Dato | Valor |
|---|---|
| Apple Developer Team ID | TX7C2F79U9 |
| Apple Submission ID vigente | `e0e7fb35-11a4-4c1d-854c-60a80c4799e6` |
| iOS Bundle ID | `com.fernandomoscon.aurex` |
| Android Bundle ID | `com.aurexapp` |
| Cuenta demo Apple Review | `app.aurex@gmail.com` / `AurexTest2026!` |
| Tester Android producción | `aurextester12@gmail.com` |
| Fernando producción | `fmoscon@gmail.com` / pwd `fm31012000` |
| Webhook RC URL | `https://api.revenuecat.com/v1/incoming-webhooks/apple-server-to-server-notification/WICtYZubpcHyBpPfLnZMoagjatQAyjPD` |
| Backend Railway URL | `https://aurex-app-production.up.railway.app` |
| Webhook RC en backend | `/webhook/revenuecat` (server.js L1601) |

---

## 🧠 REGLAS APLICABLES AL ARRANQUE PRÓXIMO

1. **`feedback_briefs_accesibles_escritorio.md`**: cualquier brief para Escritorio = commit + push al repo aurex-app/briefs ANTES de mencionarlo. Raw URL con `?nocache=<timestamp>` si necesita lectura inmediata post-push.
2. **`feedback_compilacion_y_backup_aab.md`**: NO compilar AAB sin OK explícito. Backup en `~/AurexApp/backups/aab/`.
3. **`feedback_servicios_terceros.md`**: cambios a Railway/RC/Supabase prod requieren OK explícito antes.
4. **`feedback_plan_antes_de_tocar.md`**: plan archivo-por-archivo + diff antes de tocar código, OK Escritorio si aplica.
5. **`feedback_cero_invento.md`**: validar línea por línea con grep + lectura del archivo real antes de proponer.

---

## ⚠️ NO HACER MAÑANA AL ARRANCAR

- ❌ NO subir AAB Build 34 a Producción sin validar compra real en Internal Testing primero.
- ❌ NO compilar Build 25 iOS antes de confirmar IAP funciona en Android producción.
- ❌ NO retirar Build 17 iOS de Apple (preservar slot, Manual Release ON lo neutraliza).
- ❌ NO mencionar trabajo terminado sin verificar (incluyendo cache CDN raw URLs).

---

**Fin pendientes. Fernando descansa. Sesión retomar con check inicial + IAP-5 backend.**
