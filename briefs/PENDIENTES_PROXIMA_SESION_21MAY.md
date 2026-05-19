# 📋 PENDIENTES PRÓXIMA SESIÓN — 21-may-2026 (post cierre 19-may tarde)

> **Cierre día 19-may ~15:15 AR** tras 4 Builds iOS consecutivos a TestFlight (25→26→27→28).
> Próximo arranque: chequear este archivo + brief maestro + Google Play Build 36 + status Build 28 TestFlight.

---

## 🚨 P0 — INMEDIATO al arrancar

### 1. Validar Build 28 iOS en iPhone (post upload Transporter 19-may tarde)
- Estado al cierre: en cola Transporter / esperando procesamiento App Store Connect / asignar grupo
- Checklist validación cuando esté instalado (7 fixes):
  1. Cards MisAlertas ahora muestran ALCISTA verde 📈 (no todas BAJISTA)
  2. Cards muestran "SUBA $5 desde $76,925" (no "Objetivo: ---")
  3. Timestamp absoluto "19-may 14:06" (no "ahora")
  4. Modal Crear Alerta: X siempre accesible, scroll interno funciona
  5. Modal con leyenda ⓘ: cabe completo, botones Cancelar/Crear fijos
  6. Botón "ⓘ ¿Cómo funciona?" en color dorado (no verde)
  7. Alertas ALCISTAS aparecen en MisAlertas con UI correcta (Bug 6 resuelto colateralmente)

### 2. Verificar Google Play Console — aprobación Build 36 Android
- Estado al cierre 19-may: SIGUE EN REVISIÓN. Play Console con errores temporales 7F98EO57/5DBCE83D (problema lado Google, no nuestro)
- Cuando apruebe: ejecutar PASO 2 (subir mismo AAB a track Alpha — task #62)

### 3. Bug PLAN FREE forzado mobile — investigar causa raíz (task #69)
- Override Supabase aplicado 19-may 06:00 AR (fmoscon → ELITE)
- Override segundo aplicado 19-may post-sandbox PRO (fmoscon quedó en PRO intencional para testing)
- Causa raíz aún sin investigar: webhook RC EXPIRATION post-cancelación suscripción ELITE test 18-may
- Investigar logs Railway + RC dashboard

---

## ⭐ Pendientes Build Android futuro (post-aprobación Build 36)

Cuando se compile próximo Build Android (37 o el que sea), incluir automáticamente:
- ✅ **Backend Build 27 fixes** (server.js ya pusheado main → Railway auto-deployado)
  - Lógica delta condicional precio_base
  - POST captura precio_base solo precio_objetivo
  - PATCH defensivo
  - Emoji/direction basado en alerta.direccion
  - Push payload con emoji + directionWord
  - Telegram/WA formato mejorado
- ✅ **Backend Build 28**: ninguno (Build 28 son solo cambios frontend iOS)
- ⚠️ **Frontend Build 27+28** (código React Native compartido iOS/Android):
  - AlertCreateModal.js: lógica delta + preview vivo + leyenda ⓘ + color gold + modal maxHeight + ScrollView interno
  - MisAlertasScreen.js: card verde/rojo + config + ícono dinámico + timestamp absoluto + SELECT completo con campos anidados a.alertas.X
  - SubscriptionScreen.js: distinguir mensual vs anual activo

---

## 🎨 P1 — LANDING (continuación tras frentes A-G cerrados madrugada 19-may)

### Sub-frente FONDOS / DISEÑOS / IMÁGENES REALES (Fernando 19-may madrugada)
- Pendiente desde madrugada 19-may. Mencionado por Fernando: *"mañana vamos a TODOS los fondos y diseños que para eso quiero IMÁGENES REALES y UTILIZACIÓN de NUEVAS SKILLS de tu parte"*
- Usar skill `high-end-visual-design` (Ethereal Glass / Editorial / Cinematic archetypes)
- Solicitar a Fernando 4 imágenes referencia
- Regenerar mockup footer opción D (cinematic + Boldonse, SIN newsletter card que descartó Fernando)
- Path mockups previos descartados: `~/Desktop/CODE/AurexApp/mockups/footer_v1/`

### Frentes landing pendientes (no críticos)
- **#20** 7-I — Aplicar OG v2.2 como fondo en zonas (decisión Fernando)
- **#33** REFACTOR MAYOR — landing compacta + click-to-expand
- **#41** Aclarar "9 tipos de instrumentos" — definir qué son
- **#44** Re-evaluar Boldonse en títulos grandes
- **#49** Validar copy beneficio 13 cards mini con Fernando
- **#50** Aplicar OG como backgrounds en #features y #live-quotes
- **#52** Cirugía 3 — Above-the-fold cotizaciones grandes 1ra pantalla
- **#54** Auditar visualmente TODAS las secciones no-header
- **#60** Indicador "deslizar →" mobile scroll horizontal

---

## 📱 P2 — iOS / Android estado actualizado

### iOS (estado 19-may 15:15 AR)
- **Build 17 Apple Review**: sigue en queue (25+ días). Sin novedad.
- **Build 28 TestFlight**: en cola Transporter / esperando procesamiento
- **Build 25 iOS Producción futuro**: bloqueado por Build 17 aprobación + Build 28 validación E2E completa
- Cancelar suscripción ELITE de test en Google Play (refund 48h disponible)
- Cerrar ticket RC #76809 con mail Alejandra explicando resolución (recordatorio)

### Android (estado 19-may)
- **Build 33 producción**: ACTIVO Play Store (20 instalaciones)
- **Build 36 → Producción**: EN REVISIÓN Google (envío 18-may noche, Google Play Console con errores temporales que no afectan review)
- **Track Alpha**: 31,58% testers en v1.0.17 (esperar aprobación Build 36 Producción para subir Alpha mismo AAB)
- **Build 37 futuro**: incluir backend Build 27 (auto) + frontend Build 27+28 (re-compile) + crash ScreenFragment + toolbar S24

---

## 🏗️ P3 — ESTRUCTURAL / TÉCNICO

- **Documentación final**: confirmar que `FLUJO_BUILD_IOS_ANDROID.md` está commiteado y actualizado con lecciones Build 26+27+28
- **Investigación webhook RC**: logs Railway últimas 48h
- **Brief maestro update**: max cada 3h durante sesiones largas (regla)

---

## 📊 STATUS RESUMIDO AL CIERRE 19-may 15:15 AR

| Sistema | Estado |
|---|---|
| Apple Build 17 | 🟡 Queue Apple Review (~25 días) |
| Android Build 33 Producción | 🟢 ACTIVO (20 instalaciones · 177 países) |
| Android Build 36 → Producción | 🟡 EN REVISIÓN Google (~36h, errores temporales Play Console no nuestros) |
| Android Track Alpha | 🟡 31,58% en v1.0.17 (esperar aprobación Producción) |
| Backend Railway | 🟢 OK (Build 27 fixes deployados) |
| Landing v3 preview | 🟢 7 frentes A-G cerrados, listo para fondos |
| PWA aurex.live | 🟢 Live |
| **iOS Build 25 TestFlight** | ✅ Validado 5 de 7 fixes |
| **iOS Build 26 TestFlight** | ✅ Bug 1 IAP RESUELTO E2E confirmado |
| **iOS Build 27 TestFlight** | ✅ Compilado + reveló 7 bugs nuevos |
| **iOS Build 28 TestFlight** | 🟡 En cola Transporter, 7 fixes |
| **Plan fmoscon (mobile)** | PRO en iPhone post-sandbox + PRO en Android Internal (decisión testing matriz) |
| **Bug PLAN FREE causa raíz** | ⚠️ Override Supabase aplicado, sin investigar todavía |
| **FLUJO_BUILD_IOS_ANDROID.md** | 🟢 Manual oficial 11 pasos commiteado |
| Plan MKT v3 | ⏸ Bloqueado hasta landing v3 live |

---

## 📁 ARCHIVOS NUEVOS DEL DÍA 19-may

### Repo público aurex-app (~25 commits)
- `briefs/FLUJO_BUILD_IOS_ANDROID.md` (manual oficial)
- `briefs/PLAN_BUILD26_iOS_BUG1_BUG2.md`
- `briefs/PLAN_BUILD28_iOS_FIXES.md`
- `briefs/build27_bug2_audit/code_snapshot_pre/` (AlertCreateModal + AlertasScreen + MisAlertasScreen + BellButton + alertasService)
- `briefs/build27_bug2_audit/code_snapshot_post/` (alertasService + MisAlertasScreen post Build 27)
- `briefs/build27_bug2_audit/screenshots_post_install/` (3 PNG bugs Fernando reportó)
- `landing-v3-preview/assets/captures/alerts/` (8 capturas alertas ES+EN)
- Landing v3 todos los cambios A-G

### Repo privado AurexApp (4 commits Builds 25-28)
- App.js key iOS corregida
- alertasService.js SELECT completo con JOIN
- MisAlertasScreen.js card verde/rojo + a.alertas?.X
- AlertCreateModal.js modal maxHeight + ScrollView + leyenda gold
- SubscriptionScreen.js mensual vs anual
- pbxproj versiones 25→26→27→28

### Repo aurex-backend (1 commit)
- server.js: dispararAlerta() emoji direccion + checkAlertas() delta condicional + POST captura precio_base + PATCH defensivo + Telegram/WA/push formato

---

## 🎯 ARRANQUE PRÓXIMA SESIÓN

1. `date` + último commit brief (regla CLAUDE.md)
2. Leer este archivo + brief maestro
3. Verificar Play Console Build 36 review status
4. Verificar Build 28 iOS si procesó en App Store Connect + asignado al grupo
5. Si Fernando entra: validación 7 fixes Build 28 + decidir si seguimos con fondos landing o nuevo bug si aparece

---

*Generado en cierre tarde 19-may 15:15 AR tras sesión de 16+ horas con 4 builds iOS + 25+ commits.*
