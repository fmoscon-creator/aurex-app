# AUREX — CRONOGRAMA DE TRABAJO
**Actualizado: 7 de Abril 2025**
**Objetivo: Publicacion en App Store antes del 5 de Mayo 2025**

---

## SEMANA 1 — 4 al 9 de Abril — ✅ COMPLETA
**Foco: 4 tabs pulidas, bugs resueltos, iconos generados. Confirmado en iPhone.**

| Dia | Tarea | Estado |
|-----|-------|--------|
| Lunes 4 | Fix barra busqueda Mercados con precio/24h/7d/objetivo IA/senal IA. Fix doble $ Stable & DeFi. Fix foto de perfil con camara y localStorage. Iconos app 15 tamaños iOS generados y subidos a GitHub. Fix compartir Portfolio Mail/WhatsApp/Telegram. Fix 52 semanas DOGE y cripto. Fix velocidad ticker, boton X IA 44px, logo Telegram SVG. | ✅ COMPLETO |
| Martes 5 | Revision y confirmacion en iPhone de las 4 tabs — Portfolio, Mercados, IA Senales, Perfil. | ✅ COMPLETO CONFIRMADO EN IPHONE |
| Miercoles 6 | Revision visual completa de cada tab en iPhone. Fernando confirma: todo bien en las 5 tabs. | ✅ COMPLETO CONFIRMADO EN IPHONE |
| Jueves 7 | Sin bugs del dia 6. Test de performance en consola — sin errores de la app. Precios live OK. Supabase OK. Consola limpia. | ✅ COMPLETO |
| Viernes 8 | Test de performance — precios cargan bien, sparklines visibles, AUREX Pulse actualiza, sin pantallas negras ni errores en consola. | ✅ COMPLETO |
| Sabado 9 | Cierre formal Semana 1 — 4 tabs confirmadas impecables en iPhone. Semana 1 CERRADA. | ✅ COMPLETO |

---

## SEMANA 2 — 10 al 16 de Abril — EN CURSO
**Foco: Lemon Squeezy + Screenshots + Metadata + App Store Connect cargado.**
**NOTA: Se reemplazo Stripe por Lemon Squeezy — acepta registro desde Argentina sin LLC.**

| Dia | Tarea | Estado |
|-----|-------|--------|
| Jueves 10 | Crear cuenta en Lemon Squeezy. Crear productos AUREX Pro ($9.99/mes) y AUREX Elite ($19.99/mes). Conectar cuenta bancaria Santander Argentina. | ✅ COMPLETO |
| Viernes 11 | Conectar botones PRO y ELITE en la PWA con URLs de checkout de Lemon Squeezy. Webhook backend Railway configurado. Variable LEMONSQUEEZY_WEBHOOK_SECRET agregada en Railway. | ✅ COMPLETO |
| Sabado 12 | ⚠️ PENDIENTE BLOQUEANTE — TEST DE PAGO REAL EN IPHONE ⚠️ El store de Lemon Squeezy esta EN REVISION por su equipo. Hasta que aprueben la cuenta NO se pueden procesar pagos reales con tarjeta. Cuando llegue el email de aprobacion: (1) copiar productos a Live Mode en LS, (2) obtener URLs nuevas, (3) actualizar URLs en la app, (4) probar pago real en iPhone, (5) verificar que el plan cambia a PRO en Perfil. | 🔴 PENDIENTE — ESPERANDO APROBACION LEMON SQUEEZY |
| Domingo 13 | Probar flujo completo de pago en iPhone — verificar que el plan cambia a PRO/ELITE automaticamente via webhook. | 🔴 PENDIENTE — depende del Sabado 12 |
| Lunes 14 | Tomar screenshots para App Store en resolucion iPhone 6.7" (1290x2796px). 5 capturas: (1) login/bienvenida, (2) Portfolio con activos reales, (3) Mercados con precios live y AUREX Pulse, (4) IA Senales con lista y detalle, (5) Perfil con tabla FREE vs PRO vs ELITE. | 🔴 PENDIENTE |
| Martes 15 | Redactar metadata completa App Store. Nombre: AUREX. Subtitulo: Senales IA para inversores. Descripcion espanol e ingles. Keywords. Categoria Finanzas/Productividad. Valoracion 4+. URL privacidad y soporte. | 🔴 PENDIENTE |
| Miercoles 16 | Cargar todo en App Store Connect — icono 1024x1024, screenshots, metadata, keywords, precio FREE con in-app PRO/ELITE, URL privacidad y soporte, usuario demo para revisores Apple. Cierre formal Semana 2. | 🔴 PENDIENTE |

---

## SEMANA 3 — 17 al 24 de Abril
**Foco: Xcode + React Native + Build completo en dispositivo fisico.**

| Dia | Tarea | Estado |
|-----|-------|--------|
| Jueves 17 | Cuenta Apple Developer ✅ COMPLETO ya adquirida. Generar Distribution Certificate desde Keychain Access. Crear App ID com.aurex.app con Push Notifications e In-App Purchase. Crear Provisioning Profile de distribucion App Store. Descargar e instalar en la Mac. | 🔴 PENDIENTE |
| Viernes 18 | Instalar Xcode 15+ (~8GB, 1-2hs). Instalar Node.js LTS, React Native CLI, CocoaPods. Crear proyecto: npx react-native init AurexApp. Correr pod install y run-ios. Verificar que compila en simulador sin errores. | 🔴 PENDIENTE |
| Sabado 19 | Configurar React Navigation con 5 tabs (Portfolio, Mercados, IA, Alertas, Perfil). Configurar Supabase con AsyncStorage para sesion persistente. Implementar login email/password, registro, sesion persistente. | 🔴 PENDIENTE |
| Domingo 20 | Migrar tab Portfolio — lista activos con precios tiempo real, termometro riesgo, header valor total+24h, Agregar Activos, conversor, popup detalle con simulador escenarios y compartir. | 🔴 PENDIENTE |
| Lunes 21 | Migrar tab Mercados — categorias con precios live, barra busqueda con popup detalle, AUREX Pulse, banner eventos criticos, mercados globales abierto/cerrado. | 🔴 PENDIENTE |
| Martes 22 | Migrar tab IA Senales — 300 senales, filtros, panel detalle completo, compartir. Migrar tab Perfil — auth Supabase, foto perfil, plan FREE/PRO/ELITE, Lemon Squeezy, Mi Cuenta/Preferencias/Seguridad. | 🔴 PENDIENTE |
| Miercoles 23 | Build completo en simulador iPhone 6.7". Verificar todas las tabs, login, precios real time, AUREX Pulse, senales IA, conversor, foto perfil. Corregir bugs hasta que se vea identico a la PWA. | 🔴 PENDIENTE |
| Jueves 24 | Configurar TestFlight. Archive en Xcode → subir a App Store Connect. Distribuir por TestFlight al iPhone de Fernando. Prueba final completa en dispositivo real. Corregir lo que haga falta. Cierre Semana 3. | 🔴 PENDIENTE |

---

## DESDE EL 25 DE ABRIL EN ADELANTE
**Foco: Submit App Store + Alertas + Watchlist + Publicacion.**
**NOTA: Alertas y Watchlist se construyen MIENTRAS Apple revisa (26-30 Abril).**

| Dia | Tarea | Estado |
|-----|-------|--------|
| Viernes 25 | Submit version 1.0 al App Store. Verificar todos los campos completos. Click "Submit for Review". Estado cambia a "Waiting for Review". | 🔴 PENDIENTE |
| Sabado 26 | Arrancar tab Alertas UI. Pantalla principal lista alertas activas. Pantalla vacia con boton "Crear primera alerta". | 🔴 PENDIENTE |
| Domingo 27 | Continuar Alertas — modal crear alerta, guardar en Supabase, Railway cron job monitorea cada 5min, notificacion push. Probar en iPhone. | 🔴 PENDIENTE |
| Lunes 28 | Arrancar tab Watchlist UI. Lista favoritos con precios tiempo real. Buscador. Eliminar con papelera. | 🔴 PENDIENTE |
| Martes 29 | Continuar Watchlist — ordenar por 24h, popup detalle. Probar ambas tabs en iPhone. Preparar version 1.1. | 🔴 PENDIENTE |
| Miercoles 30 | Submit version 1.1 con Alertas y Watchlist al App Store. | 🔴 PENDIENTE |

**Escenario A** — Apple aprueba v1.0 antes del 30 Abril: Publicar inmediatamente. v1.1 entra en revision.
**Escenario B** — Apple pide correcciones menores: Corregir el mismo dia. Re-submit en 24-48hs.
**Escenario C** — Apple rechaza por problema tecnico grave: Analizar feedback, corregir, re-submit.

---

## ESTADO ACTUAL

| Item | Estado |
|------|--------|
| Cuenta Apple Developer | ✅ COMPLETO |
| 4 tabs PWA pulidas y confirmadas iPhone | ✅ COMPLETO |
| Iconos app 15 tamaños iOS | ✅ COMPLETO |
| Bugs resueltos Semana 1 | ✅ COMPLETO |
| Test de performance consola/browser | ✅ COMPLETO |
| Cuenta Lemon Squeezy creada | ✅ COMPLETO |
| Productos PRO y ELITE creados | ✅ COMPLETO |
| Webhook Railway configurado | ✅ COMPLETO |
| ⚠️ STORE LEMON SQUEEZY EN REVISION — NO ACEPTA PAGOS REALES AUN ⚠️ | 🔴 PENDIENTE — esperando aprobacion |
| Test pago real iPhone + verificacion plan PRO/ELITE | 🔴 PENDIENTE — depende de aprobacion LS |
| URLs live mode Lemon Squeezy en la app | 🔴 PENDIENTE — depende de aprobacion LS |
| Screenshots App Store | 🔴 PENDIENTE — Lunes 14 |
| Metadata App Store | 🔴 PENDIENTE — Martes 15 |
| App Store Connect cargado | 🔴 PENDIENTE — Miercoles 16 |
| React Native build | 🔴 PENDIENTE — Semana 3 |
| Alertas UI | 🔴 PENDIENTE — 26-27 Abril |
| Watchlist UI | 🔴 PENDIENTE — 28-29 Abril |
| Submit App Store v1.0 | 🔴 PENDIENTE — 25 Abril |
| Publicacion | 🔴 PENDIENTE — Mayo 1-5 |

---

## STACK TECNICO
- PWA: HTML + JS vanilla + Supabase Auth
- Pagos PWA: Lemon Squeezy (PRO $9.99/mes, ELITE $19.99/mes)
- Pagos App nativa iOS: Apple In-App Purchase (StoreKit) — obligatorio por Apple
- Backend alertas + webhook: Railway
- DB: Supabase (PostgreSQL)
- Supabase URL: https://dklljnfhlzmfsfmxrpie.supabase.co
- Repo: https://github.com/fmoscon-creator/aurex-app
- App live: https://aurex.live
- Lemon Squeezy store: aurexapp.lemonsqueezy.com

---

## REGLAS DE TRABAJO — INAMOVIBLES
1. NUNCA tocar logica, colores ni estilos generales sin analizar primero
2. Screenshot obligatorio en el chat antes de reportar cualquier cosa como OK
3. Un paso a la vez — verificar en browser, luego confirmar en iPhone
4. Informar SHA completo de cada commit
5. NUNCA poner tick verde si se ve mal en el browser
6. Responder SIEMPRE en espanol, detallado y ordenado
7. Analizar TODO el problema antes de escribir una sola linea de codigo
8. Un solo commit que resuelve todo — no commits intermedios rotos
