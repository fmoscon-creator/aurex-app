# SESSION ACTIVE — Escritorio (Claude Desktop + Chrome)

URL fija: https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/SESSION_ACTIVE_ESCRITORIO_CHROME.md

Ultima actualizacion: 14-may-2026 ~21:40 AR — Build 20 compilado (bump 19→20 porque Play Console no acepta versionCode repetido). SESION ABIERTA.

## ESTADO CRITICO ACTUAL

Build 20 COMPILADO Y EN BACKUP. NO subido a Play Console todavia. Fernando hace smoke test en Samsung real primero.

## PATHS DEL BUILD 19 FINAL v2

- AAB para Play Console: /Users/fernandomoscon/AurexApp/android/app/build/outputs/bundle/release/app-release.aab (77 MB)
- APK para Samsung real: /Users/fernandomoscon/AurexApp/android/app/build/outputs/apk/release/app-release.apk (95 MB)
- Backup AAB: ~/AurexApp/backups/aab/aurex-build20-FINAL-20260514_2139.aab
- versionCode 20 / versionName 1.0.20 / ProGuard activo
- Nota: bump 19→20 fue solo numerico porque Play Console rechaza versionCode 19 (ya estaba usado en un draft abierto previo). Contenido del AAB idéntico a Build 19 FINAL v2.

## QUE INCLUYE EL AAB FINAL v2

Sprint completo del dia 14-may. 7 fixes acumulados en esta ronda + todo lo de rondas anteriores Build 19:

Ronda final (post-tabla Escritorio):
1. V1 Pulse Ver variables tiering 3 niveles (FREE redirige, PRO ve 14 vars con pesos, ELITE ve mas analisis profundo y placeholder historico)
2. V3 UpsellBanner sacado de Mercados (saturaba precios)
3. V2/V5 textos banners IA ajustados al copy publicado: "Razonamiento detallado en senales IA Disponible en ELITE" para FREE, "Analisis tecnico avanzado RSI MACD Disponible en ELITE" para PRO
4. Contador alertas descuenta toggles bloqueados por plan (antes mostraba 15 ON aunque GDELT estuviera con candado para PRO)
5. Mensaje PlanLimitModal dinamico: GDELT es ELITE-only entonces texto especifico, resto es PRO o ELITE
6. PlanLimitModal: X de cerrar arriba a la derecha + texto "Ahora no" blanco subrayado para mejor contraste
7. Modal Agregar Activo: Keyboard import + ScrollView wrapper con keyboardShouldPersistTaps + returnKeyType en inputs + Keyboard.dismiss antes de saveAsset (era P0 oculto, usuario nuevo no podia agregar primer activo)

Acumulado de rondas anteriores Build 19 (ya estaba en disco):
- SignupScreen nueva + auth.signUp + POST /api/usuario Capa 1 try/catch + Capa 2 auto-heal en usePlan con guards session y email
- 11 evaluadores backend alertas no-precio (apertura, alta_conviccion_ia, cambio_senal, senal_portfolio, cambio_zona_pulse, por_categoria, termometro_riesgo, fed_fomc, cpi_pbi, earnings, geopolitica_gdelt)
- watchlistMax FREE = 1 alineado con copy publicada
- UpsellBanner Perfil (queda, V4 confirmado por Escritorio)
- WatchlistScreen: bug seguridad USER_ID hardcoded corregido a dinamico
- Bloque 4 sincerar copy: 5 promesas falsas eliminadas de i18n.js (Export Excel, SMS, Chat live, API personal, historial 30 dias IA)
- Bloque 3 PWA: banner upsell aurex.live

## SMOKE TEST EN EMULADOR HECHO

- Login tester PRO entra a app: OK
- Perfil badge PRO violeta + banner upsell ELITE dorado: OK
- Pulse Ver variables como PRO abre modal con 14 vars: OK
- Banner upsell Mercados eliminado: OK
- Banner IA tier PRO con texto "Analisis tecnico avanzado RSI MACD Disponible en ELITE": OK
- Tap candado GDELT abre PlanLimitModal con texto especifico ELITE-only: OK
- Watchlist crear 2da como PRO sin bloqueo: OK (tiene 3 watchlists)
- App a background 90 segundos y vuelve sin pedir login: OK
- Force-stop desde task manager y reabre sin pedir login: OK
- Cross-link Signup Login validado por codigo (App.js L205-211 con props onGoToSignup onGoToLogin): OK
- Cold reboot emulator: pendiente, validar en Samsung real

## PENDIENTE SMOKE TEST EN SAMSUNG REAL (Fernando hace)

Critico antes de subir a Play Console:
- Signup email nuevo de cero completo (sin testers preexistentes)
- Modal Agregar Activo: completar cantidad + precio + tap Guardar con teclado abierto. ANTES el teclado tapaba el boton, AHORA debe quedar accesible via ScrollView.
- Pulse Ver variables FREE PRO ELITE (3 planes)
- Panel IA expandido FREE PRO ELITE
- PlanLimitModal: ver X y "Ahora no" legible
- Persistencia sesion D3 cold reboot del telefono
- Banner Perfil visible, Mercados ausente

## PENDIENTE POST BUILD FINAL (cuando este aprobado)

- Trigger SQL Supabase como defensa 3 (POST /api/usuario es Capa 1+2 OK, Capa 3 seria redundancia adicional)
- Fix Logout iOS y Android App.js (no validado hoy, esta como pendiente desde sesion anterior)
- Fix PerfilScreen gating plan nativo
- Regenerar imagenes onboarding slide 4 (PNG actual tiene copy vieja con 5 promesas falsas)
- Reply thread Apple Forum manana 15-may 9 AM AR (Escritorio publica)

## CARPETA BRIEFS

Path local: /Users/fernandomoscon/Desktop/aurex-app/briefs/

Archivos:
- BRIEF_AUREX_LATEST.md (29 KB)
- SESSION_ACTIVE_ESCRITORIO_CHROME.md (este archivo)
- archive/ (versiones historicas)

## REGLA DE USO

Si el contexto de Escritorio se compacta: leer SESSION_ACTIVE + BRIEF_AUREX_LATEST = recuperacion completa en 2 minutos.

SESION SIGUE ABIERTA. Fernando aclaro que seguimos trabajando.
