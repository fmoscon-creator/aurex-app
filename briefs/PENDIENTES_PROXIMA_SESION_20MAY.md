# 📋 PENDIENTES PRÓXIMA SESIÓN — 20-may-2026

> **Cierre nocturno 19-may ~06:30 AR** tras sesión maratónica.
> **Próximo arranque**: chequear este archivo + brief maestro + estado Play Console review.

---

## 🚨 P0 — INMEDIATO al arrancar

### 1. Verificar Google Play Console — aprobación Build 36
- Estado al cierre: **en revisión** desde 18-may noche AR (~36h)
- Esperado: aprobación entre 2-24h normales, hasta 72h en casos lentos
- Acción: `gh` o Play Console manual → ver si Build 36 ya está PRODUCCIÓN o sigue revisión
- **Si aprobado → ejecutar PASO 2** (subir mismo AAB a track Alpha — task #62)

### 2. Bug PLAN FREE forzado mobile (NUEVO 19-may)
- Síntoma reportado: fmoscon@gmail.com bajó solo a FREE en iPhone TestFlight v1.0.24 + Android Internal v1.0.36. Antes era PRO.
- **Override aplicado 19-may 06:00 AR**: Supabase `usuarios.plan = 'ELITE'` para fmoscon (queda funcional mientras se investiga)
- **Bug secundario**: aún como FREE no permite crear 5 alertas básicas que el plan FREE incluye → algo más roto en gating
- **Investigar**:
  - Logs RC webhook → ¿hubo evento EXPIRATION/CANCELLATION 18-19 may?
  - Backend Railway logs → ¿hay PATCH a usuarios.plan que pisó el valor?
  - Código `usePlan` + `planAllowsAlertType` en `~/AurexApp/src/lib/usePlan.js` — espejo del backend `PLAN_LIMITS`
  - Si FREE no permite ni los 8 tipos básicos (umbral/precio/porcentaje/etc) → bug separado en gating UI
- **Fix permanente**: depende causa raíz

---

## 🎨 P1 — LANDING (continuación tras frentes A-G)

### Sub-frente FONDOS / DISEÑOS / IMÁGENES REALES (Fernando 19-may madrugada)
- Fernando: *"mañana vamos a TODOS los fondos y diseños que para eso quiero IMÁGENES REALES y UTILIZACIÓN DE NUEVAS SKILLS de tu parte"*
- Usar skill `high-end-visual-design` (loaded en sesión 19-may — Ethereal Glass / Editorial Luxury / Soft Structuralism archetypes)
- Solicitar a Fernando 4 imágenes referencia que mencionó (NO tengo path todavía)
- Asignar fondo por sección + opacity + decisión "compite vs contenido"
- **Frente C ya anticipó**: padding global section.blk reducido 90→58px, ahora hay menos negro entre estructuras = mejor base para fondos

### Mockups footer pendientes (Fernando descartó newsletter card)
- Path: `~/Desktop/CODE/AurexApp/mockups/footer_v1/`
- 3 opciones generadas (A Ethereal Glass / B Editorial / C Cinematic) — pero todas incluían newsletter card no pedida
- Fernando: *"el cinematic me gusta pero con letra Boldonse"* y quería trabajar SOLO el fondo del sector, no agregar contenido
- **Acción**: regenerar opción D — footer estructura ACTUAL + fondo cinematic (orbes + watermark + grain) + Boldonse headers

### Frentes landing pendientes (no críticos)
- **#20** 7-I — Aplicar OG v2.2 como fondo en zonas (decisión Fernando pendiente)
- **#33** REFACTOR MAYOR — landing compacta + click-to-expand (no scroll infinito) — alcance grande
- **#41** Aclarar "9 tipos de instrumentos" — definir qué son
- **#44** Re-evaluar Boldonse en títulos grandes (Fernando lo siente informal)
- **#49** Validar copy beneficio 13 cards mini con Fernando
- **#50** Aplicar OG como backgrounds en #features y #live-quotes (parcial del sub-frente fondos)
- **#52** Cirugía 3 — Above-the-fold con cotizaciones grandes visibles 1ra pantalla
- **#54** Auditar visualmente TODAS las secciones no-header
- **#60** Indicador "deslizar →" en lugares con scroll horizontal mobile

---

## 📱 P2 — ANDROID / iOS

### Android
- **Track Alpha update** (task #62): cuando Google apruebe Build 36 Producción → subir mismo AAB a Alpha (31,58% testers están en v1.0.17 sin Bug G fix logout / push / IAP / Tier 1)
- **Cancelar suscripción ELITE de test** en Google Play Store > Suscripciones de fmoscon (Fernando manual, refund 48h)
- **Build 37 futuro**:
  - Crash ScreenFragment (§3.2.1 brief — onCreate override 3 líneas)
  - Labels toolbar truncadas Samsung S24 (§3.2.2)
  - Cualquier feedback nuevo Google post-review Build 36

### iOS
- **Build 17 en queue Apple Review** desde 24-abr (24+ días). Plan: esperar
- **Build 25 iOS futuro**: bloqueado por (a) Build 36 Android aprobado en Producción + (b) verificación IAP iOS via TestFlight (mismo código aplicado pero StoreKit puede comportarse distinto)
- **RC ticket #76809**: cerrar con mail a Alejandra explicando resolución (esperar 24-48h del 18-may por las dudas)

---

## 🏗️ P3 — ESTRUCTURAL / TÉCNICO

- **Webhook RC investigación**: ver logs últimas 48h para detectar evento que pisó plan a FREE
- **Documentar caso "DEV TESTER PLAN OVERRIDE"** como procedimiento standard (Supabase UPDATE para users de prueba)
- **Snapshot código IAP v1.0.36** ya en `briefs/iap_audit_18may/code_snapshot_build36/`
- **Brief maestro update**: continuar mañana, no debe pasar más de 24h sin update

---

## 📊 STATUS RESUMIDO AL CIERRE 19-may 06:30 AR

| Sistema | Estado |
|---|---|
| Apple Build 17 | 🟡 Queue Apple Review (~25 días) |
| Android Build 33 Producción | 🟢 ACTIVO (20 instalaciones · 177 países) |
| Android Build 36 → Producción | 🟡 EN REVISIÓN Google (enviado 18-may noche) |
| Android Track Alpha | 🟡 31,58% en v1.0.17 (esperar aprob Producción) |
| Backend Railway | 🟢 OK |
| Landing v3 preview | 🟢 7 frentes cerrados · listo para fondos mañana |
| PWA aurex.live | 🟢 Live (será reemplazada por landing v3 al deploy) |
| IAP / RevenueCat | ✅ RESUELTO 18-may (Build 36) |
| **Bug PLAN FREE mobile** | 🟡 **Override aplicado, causa raíz pendiente** |
| Plan MKT v3 | ⏸ Bloqueado hasta landing v3 live |

---

## 📁 ARCHIVOS NUEVOS DEL DÍA

- `landing-v3-preview/assets/captures/alerts/alerts_{ai,pulse,price,event}_{es,en}.jpg` (8 capturas Alertas mockup app)
- `landing-v3-preview/assets/captures/{share_signal,new_list,price_alert,add_asset}_{en,es}.jpg` (8 capturas More recortadas a 4:5)
- `~/Desktop/CODE/AurexApp/mockups/footer_v1/option_{a,b,c}_*.html` + PNGs renderizados (mockups footer descartados)
- `/tmp/more_originals_19may/` (backups originales captures More antes del crop)

## 🎯 ARRANQUE PRÓXIMA SESIÓN

1. `date` + último commit brief (regla CLAUDE.md sección 0)
2. Leer este archivo + brief maestro
3. Verificar Play Console aprobación Build 36
4. Si Fernando entra: preguntar (a) ¿llegó respuesta Apple Build 17? (b) ¿pasamos las 4 imágenes referencia para fondos? (c) ¿retomamos landing fondos o atacamos bug PLAN FREE causa raíz primero?

---

*Generado en cierre nocturno 19-may 06:30 AR tras sesión maratónica de 18+ horas. Mañana arrancamos frescos.*
