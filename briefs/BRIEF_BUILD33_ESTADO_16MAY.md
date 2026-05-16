# BRIEF BUILD 33 ANDROID — Estado al 16-may-2026 00:15 AR

> Cierre del trabajo en el modal Agregar Activo después de 9 builds iterando (25→33).
> Listo para promover a Producción Play Store reemplazando Build 17 actual (con bug signup).

---

## 1. AAB Build 33 — listo para subir

| Campo | Valor |
|---|---|
| Commit | (último push branch dev) |
| versionCode | **33** |
| versionName | **1.0.33** |
| AAB live | `/Users/fernandomoscon/AurexApp/android/app/build/outputs/bundle/release/app-release.aab` |
| Backup | `~/AurexApp/backups/aab/aurex-build33-FINAL-20260516_0009.aab` |
| Tamaño | 77 MB |
| SHA256 | `f7261f44999c86d9fbc8ac97e5b85f117f3575aa102d4a299de715ff3235a6cd` |
| Build time | 1m 7s — BUILD SUCCESSFUL |
| Timestamp AAB | 16-may 00:09 AR |

### Cambios contenidos (Build 25 → 33)

| Build | Cambio | Estado |
|---|---|---|
| 25 | Bug G PASA, Bug I PASA, Bug H FALLA | superado |
| 26 | maxHeight dinámico 60% (modal achicado) | mal UX |
| 27 | bottom sheet + paddingBottom (rompió layout) | desastre |
| 27→28→29 | bumps versionCode por quemar números Play Console | iteraciones |
| 30 | revertido a estado base (confiar en `adjustResize` del manifest) | casi OK, faltaba algo |
| 31 | + paddingBottom 90 en ScrollView | sin cambio |
| 32 | ScrollView eliminado → desbordamiento del card | peor |
| **33** | **selectedRow duplicado eliminado** (heredado de build viejo, mostraba misma info que el buscador) + ScrollView restaurado + paddingBottom 90 | **listo** |

### Diagnóstico raíz
El modal tenía 2 cards con la misma info: TextInput buscador L1222 (`value=searchQuery` seteado por `selectAsset` L467) + `<View style={st.selectedRow}>` L1229 (mostraba `addForm.simbolo + nombre`). Heredado de un build viejo. Eliminarlo ganó ~80pt verticales — más que cualquier ajuste de padding. Sumado al `adjustResize` del manifest (línea 28 AndroidManifest.xml) que ya maneja el teclado, el modal entra entero sin scroll forzado.

---

## 2. Bugs validados en Build 33

| Bug | Estado | Notas |
|---|---|---|
| G — Pasate a ELITE | ✅ PASA desde Build 25 | candado GDELT muestra "Pasate a ELITE" |
| H — Modal Agregar cortado | ✅ resuelto en Build 33 | eliminar duplicación selectedRow |
| I — Doble tap GUARDAR | ✅ PASA desde Build 25 | guard sincrónico + spinner |
| Signup nuevos usuarios | ✅ PASA desde Build 21 | SignupScreen separada |

---

## 3. Promoción a Producción — ✅ ENVIADO A REVISIÓN GOOGLE 16-may 00:30 AR

**Decisión Fernando 00:25 AR:** "definicion quedo mejor subimos a PRODUCCION ANDROID en reemplazo de la actual el BUILD 33 v1.0.33"

**Acción Escritorio 00:30 AR:** AAB Build 33 subido a Production track Play Console. Status confirmado: "Cambios en la etapa de revisión" con Build 33 (1.0.33) Producción.

**Estado actual:** ⏳ EN REVISIÓN GOOGLE. Aprobación típica 1-3 hs. Cuando apruebe → email + status "Publicado" → reemplaza Build 17 v1.0.17 automáticamente.

---

### Procedimiento ejecutado (referencia histórica)

1. **Abrir Play Console** → app **AUREX** (`com.aurexapp`).
2. **Test and release** → **Production** → **Create new release**.
3. **Upload AAB**: `/Users/fernandomoscon/AurexApp/android/app/build/outputs/bundle/release/app-release.aab` (77 MB, SHA256 `f7261f44999c86d9fbc8ac97e5b85f117f3575aa102d4a299de715ff3235a6cd`). Validar que muestre `versionCode 33 / versionName 1.0.33`.
4. **Release notes** (mínimo ES + EN, idealmente 8 idiomas):

   **es-AR / es-ES:**
   ```
   • Solucionado: nuevos usuarios ahora pueden registrarse en la app.
   • Solucionado: modal de agregar activo al portafolio muestra todos los campos sin scroll.
   • Solucionado: doble tap en Guardar evitado con indicador de carga.
   • Mejora: candado de funciones premium indica plan correcto (PRO / ELITE).
   ```

   **en-US:**
   ```
   • Fixed: new users can now sign up to the app.
   • Fixed: add-asset modal shows all fields without scroll.
   • Fixed: double-tap on Save now prevented with loading spinner.
   • Improvement: premium feature lock indicates correct plan (PRO / ELITE).
   ```

5. **Countries/regions**: dejar como estaba (no cambiar).
6. **Rollout**: **100% directo** (reemplaza Build 17 roto, no tiene sentido escalonado).
7. **Start rollout to Production**.
8. Google review esperado: 1-3 hs (puede llegar a 24h).
9. Status: `In review` → `Approved` → `Published`.

### Validación post-publicación
- Cuando aparezca `Published`, Fernando descarga la app desde Play Store (no sideload) en un dispositivo nuevo o desinstalar+reinstalar en el Samsung.
- Probar flujo: instalar → onboarding → "Crear cuenta gratis" con email nuevo → entrar a app → Portfolio → "+ Agregar" → ver modal completo.

### Si hay errores en el upload
- "Active release exists" → primero "Halt rollout" del release actual (Build 17), después Create new release.
- "Bundle is signed with wrong key" → no debería pasar, el keystore en `~/Downloads/SECRET/` está intacto.
- Review rechazado → consultar motivo en email; las release notes y el AAB son estándar.

---

## 4. Bug compra IAP — **CRÍTICO PARA NEGOCIO**

⚠️ **Sin esto resuelto, AUREX Android NO tiene valor comercial.** Aunque Build 33 corrige UX, el flujo de compra de PRO/ELITE sigue roto.

### Análisis completado (15-may, sesión previa)
- 2 bugs estructurales encontrados (NO identificados en hipótesis previas).
- Documentos en `~/Desktop/aurex-app/briefs/`:
  - `ANALISIS_PROFUNDO_COMPRA_IAP_15MAY.md` (329 líneas, técnico)
  - `INFORME_COMPRA_IAP_15MAY_PARA_ESCRITORIO.md` (283 líneas, contexto)
  - `TICKET_REVENUECAT_FINAL_15MAY.md` (ticket enviado 15-may 03:00 AR)

### Plan Tier 1 (5 fixes Build 34+)
- IAP-1: `App.js` boot → `Purchases.logIn(uid)` si hay sesión Supabase
- IAP-2: `LoginScreen.js` post-login (2 paths) → `Purchases.logIn(uid)`
- IAP-3: `SignupScreen.js` post-signup → `Purchases.logIn(uid)`
- IAP-4: `PerfilScreen.js` logout → `Purchases.logOut()`
- IAP-5: Backend webhook RC → si `app_user_id` empieza con `$anonymous:` → `console.error` + alerta Telegram

### Plan B (si RevenueCat no responde el ticket)
Ver: `PLAN_B_IAP_SI_RC_NO_RESPONDE.md` (Code + Dropbox + .docx). Resumen:
1. Implementar Tier 1 sin esperar respuesta.
2. Plan B-1: webhook directo Google Play Console → Supabase (bypass RC).
3. Plan B-2: cambiar de RC a Stripe + Apple/Google.
4. Plan B-3: validación manual via Google Play API.

---

## 5. iOS Build 17 — RECHAZADO POR APPLE (paralelo)

### Estado actual
- Build 17 rechazado 15-may-2026 18:32 AR.
- Motivo único: Guideline 4.1(c) Copycats — nombre "AUREX AI" colisiona con www.aurex.ai.
- Documento completo: **`INFORME_GRAL_APPLE_v1_15MAY.md`** en:
  - `~/Desktop/aurex-app/briefs/`
  - `~/Dropbox/AUREX/Apple STORE IOS/` (.md + .docx)

### Decisión recomendada
Renombrar a **AUREX LIVE** (dominio propio Fernando, prueba Namecheap Order #198745654).
- Trademark search USPTO: riesgo BAJO (Escritorio confirmó).
- WHOIS aurex.ai: titular oculto.

### Decisión pendiente
Opción C (retirar Build 17 + ir directo con Build iOS nuevo con código equivalente a Build 33 Android + nombre AUREX LIVE) vs Opción D (aprobar Build 17 cambio nombre como "respaldo" + Build iOS nuevo paralelo).

### TestFlight actual
Build 24 iOS (CURRENT_PROJECT_VERSION=24) en TestFlight Internal Testing.
- Incluye SignupScreen, Push iOS, gating, "Cómo usar AUREX", PlanLimitModal correcto.
- NO incluye los 3 fixes finales de Build 25/26/33 Android (Bug G re-fix, Bug H modal, Bug I doble tap).
- Para iOS nuevo: bump `CURRENT_PROJECT_VERSION 24→25` + `pod install` + Archive + upload.

---

## 6. Archivos referenciados

| Archivo | Ubicación |
|---|---|
| BRIEF Build 33 (este) | `~/Desktop/aurex-app/briefs/BRIEF_BUILD33_ESTADO_16MAY.md` |
| BRIEF Build 33 Escritorio | `~/Dropbox/AUREX/MAPA DE TRABAJO/BRIEF_BUILD33_PARA_ESCRITORIO_16MAY.md` (.md + .docx) |
| INFORME Apple v1 consolidado | `~/Dropbox/AUREX/Apple STORE IOS/INFORME_GRAL_APPLE_v1_15MAY.md` (.md + .docx) |
| Análisis IAP profundo | `~/Desktop/aurex-app/briefs/ANALISIS_PROFUNDO_COMPRA_IAP_15MAY.md` |
| Informe IAP Escritorio | `~/Desktop/aurex-app/briefs/INFORME_COMPRA_IAP_15MAY_PARA_ESCRITORIO.md` |
| Ticket RevenueCat | `~/Desktop/aurex-app/briefs/TICKET_REVENUECAT_FINAL_15MAY.md` |
| Plan B IAP (nuevo) | `~/Desktop/aurex-app/briefs/PLAN_B_IAP_SI_RC_NO_RESPONDE.md` + `~/Dropbox/AUREX/MAPA DE TRABAJO/` (.md + .docx) |

---

**Fin BRIEF Build 33. Próximo paso: subir AAB Build 33 a Play Console Internal Testing.**
