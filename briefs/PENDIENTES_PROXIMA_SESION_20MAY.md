# 📋 PENDIENTES PRÓXIMA SESIÓN — 20-may-2026

> **Cierre nocturno 19-may ~06:30 AR** tras sesión maratónica.
> **Próximo arranque**: chequear este archivo + brief maestro + estado Play Console review.

---

## ⭐ AGREGADO 19-may post-Build 25 — Pendientes ANDROID futuro

### Build Android futuro (37 o el que sea, post-aprobación Build 36 Producción)

Cuando se haga el próximo Build Android, **incluir el Bug 2 UX Alertas que se aplica en Build 26 iOS** (es código compartido React Native + backend único — los cambios automáticamente quedarán en branch dev, pero requieren re-compile + re-upload Play Store para llegar a usuarios Android).

Componentes a llevar:
- **Backend** `server.js` cambios para `precio_al_crear` + nueva lógica delta — YA están aplicados al compilar Build 26 (server.js es único)
- **Frontend form** `AlertCreateModal.js` con preview vivo + leyenda ⓘ — código compartido iOS/Android
- **UX visual verde/rojo** en centro alertas + popup + push notification — código compartido iOS/Android
- **Telegram** mejora formato — server.js (ya aplicado backend)

**Ver detalle completo en**: `briefs/PLAN_BUILD26_iOS_BUG1_BUG2.md` §3.

---

## 🚨 P0 — INMEDIATO al arrancar

### 0. 🚨⭐ TOP PRIORIDAD ABSOLUTA — Compilar Build 25 iOS TestFlight (validación masiva)

> **Decisión explícita Fernando 19-may 07:00 AR**:
> *"REGISTRA ESO PARA MAÑANA. TIENE QUE SER PRIORIDAD BUILD 25 IOS A TESTFLIGHT CON TODO ESTO MÁS TODO LO ANOTADO HISTÓRICO. Cambiamos el deslogueo automático, las pantallas de acceso a login, el tema cobro de planes y alertas push y Telegram y tema de restricción real de candados y features de cada plan. SALVO VENGA UNA MALA NOTICIA DE ANDROID, ESO ES LO URGENTÍSIMO."*

**ACLARACIÓN técnica importante**: TestFlight (testing interno) NO requiere aprobación Build 36 Android Producción ni aprobación Build 17 Apple Review. Son flujos independientes — TestFlight tiene su propio review más rápido o auto-aprobado para builds internos. La única blocking piece histórica era IAP Android funcionando — eso ✅ se cumplió 18-may con Build 36 (compra real validada Samsung 17:30 AR).

#### Pre-requisitos VERIFICADOS ✅

| Pre-req | Estado |
|---|---|
| IAP Android Build 36 funcionando | ✅ Validado 18-may 17:30 AR con compra real Samsung |
| TestFlight independiente de Apple Review producción | ✅ Confirmado |
| Código `usePlan.js` actualizado en branch `dev` | ✅ (lo que va al Build 25 levantará plan ELITE del backend correctamente, resolviendo bug iPhone v1.0.24) |
| Build 17 sigue en queue Apple Review | ✅ NO TOCAR (cualquier cambio metadata = reset queue) |

#### Lista CONSOLIDADA de lo que va al Build 25 iOS

**Fixes nuevos detectados 19-may** (los que Fernando mencionó explícitamente):
1. ❌→✅ **Deslogueo automático** (Bug G fix) — sesión persistente cold reboot / force-stop 90s / background 90s. Paridad Android v1.0.33+
2. ❌→✅ **Pantallas de acceso / login UX** — flujo Signup/Login refactor (paridad con Build 21+ Android donde se arregló bug P0 signup)
3. ❌→✅ **Cobro de planes IAP iOS** — Apple StoreKit + RC. Port del fix Build 36 Android (`Purchases.purchaseProduct` deprecada → `navigation.navigate('Subscription')` con `purchasePackage(pkg)` + offerToken). Crítico
4. ❌→✅ **Alertas Push iOS** — APNS wired y funcionando (Build 18 falló por RNSVG vtable — resolver Podfile + pod install)
5. ❌→✅ **Alertas Telegram** — wiring real de alertas operativas vía Telegram (paridad Android backend)
6. ❌→✅ **Restricción REAL candados y features por plan** — FREE / PRO / ELITE limits aplicados en Portfolio (5 activos), Mercados, Watchlist (1 lista FREE), IA (3/día FREE), Alertas (6 tipos básicos FREE). Lock icons + mensajes "Disponible en PRO/ELITE". PlanLimitModal con copy específico.
7. ❌→✅ **Bug PLAN FREE iPhone** (descubierto 19-may noche) — `usePlan.js` actualizado en branch dev ya tiene el fix; v1.0.24 instalado en iPhone Fernando tiene versión vieja con bug que queda pegado en FREE aunque backend retorne ELITE

**Items históricos del brief §2.7 que también van**:
8. **Marca / metadata AUREX LIVE** — limpiar `src/lib/i18n.js` L145+L257 ("AUREX AI" / "AUREX IA"). `ios/AurexApp/Info.plist` `CFBundleDisplayName = AUREX → AUREX LIVE`.
9. **Tab Perfil "Cómo usar AUREX"** — tutorial in-app dentro del tab Perfil (paridad Android)
10. **Onboarding 2 botones slide 4** — "Crear cuenta gratis" → SignupScreen + "Ya tengo cuenta" → LoginScreen (antes 3 botones todos a Login)
11. **Bug H** Modal Agregar Activo (teclado tapaba botón Guardar)
12. **Bug I** doble tap
13. **Cualquier bug acumulado Android Build 33+** que aplique también a iOS
14. **Bump versiones**: `ios/AurexApp.xcodeproj/project.pbxproj`: `CURRENT_PROJECT_VERSION 24 → 25` y `MARKETING_VERSION 1.0 → 1.0.25`
15. **Podfile + pod install**: `cd ~/AurexApp/ios && pod install` validar que compile sin RNSVG vtable error (Build 18 intentó 12 podfiles distintos — usar el intento 12 issue #8883 arlovip que se escribió en disco)

#### Flujo de trabajo mañana

1. **Code**: pre-compile checklist — verificar que cada uno de los 15 items arriba está en código branch `dev` (`~/AurexApp` commit `c990612` + commits posteriores hasta `66662cd` Build 36 Android)
2. **Code + Escritorio**: cross-check item por item contra Android v1.0.33+ producción (paridad real, no asumida)
3. **Fernando**: cuando OK del checklist → compila en Xcode + sube a TestFlight (NO tocar Build 17 metadata)
4. **Fernando**: instala v1.0.25 en iPhone via TestFlight + login fmoscon + valida cada uno de los 7 fixes nuevos
5. **Reporte**: documentar resultado de cada item en brief maestro §2.7

#### Salvo qué se posterga

Esta prioridad cae **SOLO** si llega una **mala noticia urgente de Google sobre Build 36** (otro rechazo, problema en review, etc) — en cuyo caso primero se atiende esa emergencia y después se vuelve a Build 25 iOS.

---

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
