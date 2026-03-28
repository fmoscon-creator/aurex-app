# AUREX — PLAN OPERATIVO COMPLETO 12 SEMANAS
Version: 1.0 | Fecha: 27/03/2026 | Fundador: Fernando G. Moscon
Stack: HTML+CSS+JS Vanilla - GitHub Pages - Supabase - Railway - Stripe

---

## ESTADO ACTUAL — QUE ESTA HECHO HOY 27/03/2026

### FRONTEND — funcionando en produccion

| Feature | Estado | Donde | Semana del plan |
|---|---|---|---|
| App en produccion | REAL | fmoscon-creator.github.io/aurex-app | Base completada |
| PWA instalable iPhone | REAL | manifest.json + service-worker.js | Base completada |
| 6 tabs navegables | REAL | index.html: Portfolio, Mercados, Watchlist, IA, Alertas, Perfil | Base completada |
| Precios crypto tiempo real | REAL | Binance REST API cada 5seg - Tab Mercados | Base completada |
| Conversor crypto | REAL | Binance cada 30seg - boton superior | Base completada |
| Modo oscuro + diseno completo | REAL | CSS en index.html - paleta #D4A017 + #0D1117 | Base completada |
| OBS1 nuevo diseno aprobado | REAL | index.html - 4 tarjetas + boton Entrar a Aurex | Semana 1 - HOY 27/03 |
| Encoding UTF-8 corregido | REAL | index.html - todos los caracteres sin errores | Semana 1 - HOY 27/03 |
| Planes Free/PRO/ELITE en UI | SOLO VISUAL | Tab Perfil - sin logica real aun | Semana 3 |
| 45+ acciones USA | ESTATICO | Tab Mercados - precios hardcodeados | Semana 4 |
| Service Worker v2.0 | REAL | service-worker.js - network-first, no cachea HTML | Base completada |

### BACKEND — estructura existe, sin logica

| Feature | Estado | Donde | Semana del plan |
|---|---|---|---|
| Estructura backend | EXISTE | backend/server.js + Procfile + railway.json | Base |
| server.js | VACIO | Solo 8 lineas de require() sin logica real | Semana 2 - Vie 03/04 |
| Deploy Railway | EXISTE | aurex-app-production.up.railway.app | Base - sin rutas |

### REPOSITORIO GITHUB

| Archivo | Que es | Estado |
|---|---|---|
| index.html | App completa frontend ~2800 lineas | Actualizado hoy |
| service-worker.js | PWA + cache + push | OK |
| manifest.json | Config PWA | OK |
| aurex-features.js | Features JS adicionales | OK |
| CONTEXTO.md | Estado proyecto para Claude | Actualizado |
| PLAN.md | Plan original resumido | En repo |
| docs/PLAN-OPERATIVO.md | Este archivo - plan detallado | NUEVO HOY |
| designs/ | OBS1 y OBS2 disenos aprobados en PNG | Subidos |
| backend/ | Servidor Node.js esqueleto | Sin logica |

### LO QUE ES MOCK — A resolver segun cronograma

| Feature | Estado real | Semana que se resuelve |
|---|---|---|
| Autenticacion | NO EXISTE | Semana 1 - Dom 29/03 |
| Portfolio storage | In-memory, se borra al cerrar | Semana 1 - Lun 30/03 |
| Watchlist storage | In-memory, se borra al cerrar | Semana 1 - Mar 31/03 |
| Alertas WhatsApp | Simuladas, no llegan | Semana 2 - Sab 04/04 |
| Senales IA | 93 hardcodeadas en el codigo | Semana 2 - Mar 07/04 |
| Pagos Stripe | Botones sin funcion | Semana 3 - Vie 10/04 |
| Restricciones por plan | Sin validacion real | Semana 3 - Dom 12/04 |
| Acciones USA precios | Estaticos hardcodeados | Semana 4 - Vie 17/04 |
| Push notifications | Boton existe, no funciona | Semana 2 - Lun 06/04 |
| Conversor tasas fiat ARS/EUR/BRL | Estaticos | Semana 1 - Sab 28/03 |
| OBS2 onboarding | No implementada | Semana 1 - Sab 28/03 |
| Perfil de usuario | Hardcodeado | Semana 1 - Dom 29/03 |
| 2FA SMS | Boton existe, sin funcion | Semana 3 - Mie 15/04 |
| Exportar PDF y Excel | Sin funcion | Semana 3 - Lun 13/04 |
| Email de reporte | Sin funcion | Semana 3 - Mar 14/04 |
| Sistema de referidos | No existe | Semana 4 - Lun 20/04 |
| Analytics de usuarios | No existe | Semana 2 - Mie 08/04 |
| Telegram Bot | No existe | Semana 7 |
| App Store iOS | No existe | Semana 9 |
| Google Play Android | No existe | Semana 10 |

---

## COMO INICIAR CADA SESION CON CLAUDE SIN PERDER TIEMPO

Copia y pega esto exactamente al abrir un chat nuevo:

---
Hola, continuamos con Aurex.
Repo: https://github.com/fmoscon-creator/aurex-app
App: https://fmoscon-creator.github.io/aurex-app
Lee CONTEXTO.md y docs/PLAN-OPERATIVO.md del repo.
Token GitHub: [PEGA EL TOKEN ACA]
Tarea de hoy segun cronograma: [FECHA] - [NOMBRE EXACTO DE LA TAREA DEL DIA]
Credenciales necesarias hoy: [solo las del dia segun lista abajo]
---

Credenciales por semana (tenerlas listas ANTES de la sesion):
- Semana 1: GitHub Token + URL Supabase + anon key Supabase + Google OAuth client ID
- Semana 2: Twilio Account SID + Auth Token + Anthropic API key
- Semana 3: Stripe publishable key + secret key + webhook secret + Resend API key
- Semana 4: Polygon.io API key
- Semana 6: Plausible script ID + Hotjar site ID
- Semana 7: Token de Telegram BotFather
- Semana 9: Apple Developer Team ID + Firebase config JSON

IMPORTANTE: Nunca guardar tokens o passwords en el repo. Solo pasarlos en el chat al inicio de la sesion.

---

## CRONOGRAMA DIA X DIA — 12 SEMANAS (28 Mar al 19 Jun 2026)

---

### SEMANA 1 (28 Mar - 2 Abr) — APP IMPECABLE + BASE DE DATOS
Objetivo: Sin bugs visuales. Auth real. Portfolio y Watchlist persistentes en DB.

SAB 28/03 — 5 hs
Tarea: Fix conversor fiat + implementar OBS2
Herramienta: Claude escribe codigo, commitea via GitHub API
Proceso: Claude integra open.er-api.com (gratuita, sin key) para tasas ARS/USD/EUR/BRL reales en el conversor. Implementa pantalla OBS2 segun designs/OBS2-senales-IA.png. Flujo: OBS1 -> OBS2 -> App.
Resultado esperado: Conversor con tasas reales. OBS2 existe y funciona.

DOM 29/03 — 5 hs
Tarea: Supabase + Google OAuth
Herramienta: Claude + Supabase Dashboard (vos) + GitHub API
Proceso: Vos creas proyecto en supabase.com gratis. Me pasas URL publica y anon key. Claude integra SDK Supabase via CDN, configura Google OAuth, crea tabla users (id, email, nombre, foto_url, plan, created_at).
Credenciales necesarias: URL Supabase + anon key + Google OAuth client ID
Resultado esperado: Login real con Google. Usuario guardado en Supabase. Perfil muestra datos reales.

LUN 30/03 — 5 hs
Tarea: Portfolio persistente en Supabase
Herramienta: Claude + GitHub API
Proceso: Tabla portfolios (id, user_id, symbol, nombre, cantidad, precio_compra, fecha). CRUD completo contra Supabase. Solo funciona autenticado.
Resultado esperado: El portfolio no se borra al cerrar la app. Cada usuario ve solo el suyo.

MAR 31/03 — 5 hs
Tarea: Watchlist + Alertas persistentes en Supabase
Herramienta: Claude + GitHub API
Proceso: Tablas watchlists (id, user_id, symbol, precio_referencia) y alerts (id, user_id, symbol, precio_objetivo, condicion, canal, activa). Reemplaza arrays en memoria.
Resultado esperado: Watchlist y alertas persisten entre sesiones.

MIE 01/04 — 5 hs
Tarea: Testing completo iOS Safari + desktop
Proceso: Vos abris la app en tu iPhone, recorres cada tab y reportas bugs en el chat. Claude los corrige y commitea. Repetimos hasta que todo este limpio.
Resultado esperado: App perfecta en iPhone.

JUE 02/04 — 5 hs
Tarea: Actualizar CONTEXTO.md + buffer de bugs
Proceso: Claude documenta estado real post-Semana 1. Resuelve bugs menores pendientes.
Resultado esperado: Documentacion al dia. Proximo chat empieza sin re-diagnosticar nada.

---

### SEMANA 2 (3 - 9 Abr) — BACKEND REAL + ALERTAS + SENALES IA
Objetivo: Backend en Railway con logica real. Alertas WhatsApp reales. Senales IA via Claude API.

VIE 03/04 — 5 hs
Tarea: server.js completo + deploy Railway
Herramienta: Claude escribe Node.js + vos conectas repo en railway.app
Proceso: Claude escribe servidor Express completo: GET /health, POST /api/alerts/check, GET /api/signals/:symbol, POST /api/users/sync. Railway auto-deploya al commitear.
Resultado esperado: Backend vivo en Railway respondiendo rutas correctamente.

SAB 04/04 — 5 hs
Tarea: Twilio WhatsApp alertas reales
Herramienta: Claude + Twilio sandbox gratuito + Railway
Proceso: Vos creas cuenta twilio.com. Me pasas Account SID y Auth Token. Claude agrega /api/send-alert que llama a Twilio. Cron job node-cron cada minuto: lee alertas de Supabase, compara precio Binance, si se cumple manda WhatsApp real.
Credenciales: Twilio Account SID + Auth Token + numero sandbox
Resultado esperado: Creas alerta BTC mayor 90000 y recibes WhatsApp real cuando se cumple.

DOM 05/04 — 5 hs
Tarea: Frontend conectado a backend via JWT
Proceso: Llamadas a Supabase pasan por backend con token JWT. Frontend y backend autenticados.
Resultado esperado: Comunicacion segura frontend-backend.

LUN 06/04 — 5 hs
Tarea: Push notifications reales Firebase
Herramienta: Claude + Firebase Console (vos) + GitHub API
Proceso: Vos creas proyecto Firebase gratis. Me pasas config JSON. Claude integra FCM en service-worker.js e index.html. Boton Activar pide permiso real, guarda FCM token en Supabase.
Credenciales: Firebase config JSON
Resultado esperado: Recibes notificacion push real en tu iPhone.

MAR 07/04 — 5 hs
Tarea: Senales IA conectadas a Claude API real
Herramienta: Claude + Anthropic API + Railway
Proceso: Vos generas API key en console.anthropic.com. Claude agrega /api/signals/:symbol: llama a Claude API con prompt de precio, volumen, variacion. Respuesta cacheada 1 hora en Supabase.
Credenciales: Anthropic API key
Resultado esperado: Senales IA son analisis reales de Claude, no datos hardcodeados.

MIE 08/04 — 5 hs
Tarea: Plausible Analytics
Herramienta: Claude + plausible.io $9/mes + GitHub API
Proceso: Claude integra script y eventos: page_view, alert_created, plan_viewed, signal_viewed, upgrade_clicked.
Resultado esperado: Dashboard de usuarios en tiempo real.

JUE 09/04 — 5 hs
Tarea: Testing end-to-end + docs
Proceso: Flujo completo: login Google -> portfolio -> alerta -> WhatsApp recibido -> senal IA -> salir y volver con portfolio intacto. Claude corrige lo que falle.
Resultado esperado: Flujo completo funcional en iPhone.

---

### SEMANA 3 (10 - 16 Abr) — STRIPE + RESTRICCIONES + EXPORTACIONES
Objetivo: Pagos reales. Features diferenciadas por plan. Primer usuario PRO posible.

VIE 10/04 — 5 hs
Tarea: Stripe setup + productos + webhooks
Herramienta: Claude + Stripe Dashboard (vos) + Railway
Proceso: POST /api/create-checkout-session genera link pago Stripe. POST /api/webhook recibe confirmacion y actualiza plan en Supabase. Productos: PRO $9.99/mes, ELITE $19.99/mes.
Credenciales: Stripe publishable key + secret key + webhook signing secret
Resultado: Backend crea sesiones de pago y recibe confirmaciones.

SAB 11/04 — 5 hs
Tarea: UI de upgrade funcional
Proceso: Botones Activar PRO y Activar ELITE llaman backend -> link Stripe Checkout. Usuario paga y vuelve con plan actualizado.
Resultado: Flujo de upgrade completo en modo test Stripe.

DOM 12/04 — 5 hs
Tarea: Restricciones reales por plan
Proceso: FREE: max 5 activos, 3 senales/dia, sin alertas. PRO: 50 activos, 10 senales, alertas. ELITE: ilimitado. Validacion en frontend Y backend.
Resultado: Restricciones no bypasseables.

LUN 13/04 — 5 hs
Tarea: Exportar PDF y Excel reales
Herramienta: jsPDF + SheetJS via CDN, sin backend
Proceso: PDF del portfolio generado en el browser. Excel .xlsx descargable.
Resultado: Botones de exportacion funcionan con archivos reales.

MAR 14/04 — 5 hs
Tarea: Email de reporte del portfolio
Herramienta: Claude + Resend gratis 3000 emails/mes + Railway
Proceso: /api/send-report genera HTML del portfolio y lo manda via Resend al email del usuario.
Credenciales: Resend API key
Resultado: Boton Enviar por email funciona.

MIE 15/04 — 5 hs
Tarea: 2FA real via SMS Twilio
Proceso: Activa 2FA -> ingresa telefono -> SMS codigo 6 digitos -> lo ingresa -> confirmado. En proximos logins: Google OAuth + codigo SMS.
Resultado: 2FA del Perfil funciona con SMS real.

JUE 16/04 — 5 hs
Tarea: Test end-to-end de pago + fixes
Proceso: Tarjeta test Stripe 4242424242424242. De FREE a PRO. Limites cambian. Claude corrige lo que falle.
Resultado: Primer pago real posible desde manana.

---

### SEMANA 4 (17 - 23 Abr) — ACCIONES REALES + PRIMEROS 50 USUARIOS
Objetivo: Acciones USA en tiempo real. Lanzamiento a primeros usuarios.

VIE 17/04: Polygon.io acciones USA ($29/mes). Reemplaza 45+ acciones estaticas por precios reales cacheados cada 15seg en el backend.
SAB 18/04: Acciones LatAm datos reales de cierre dia anterior (BYMA, B3, BMV via APIs publicas).
DOM 19/04: Optimizacion performance iOS Safari. Lazy loading. Reducir tiempo de carga inicial.
LUN 20/04: Sistema de referidos. Tabla referrals Supabase. Codigo unico por usuario. Link de invitacion.
MAR 21/04: Compartir en redes. Twitter/X, WhatsApp, imagen de senal IA via Canvas API para Instagram Stories.
MIE 22/04: Preparar materiales de lanzamiento: mensaje WhatsApp, post LinkedIn, texto grupos LATAM.
JUE 23/04: LANZAMIENTO primeros 50 usuarios. Monitoreo Plausible en tiempo real.

---

### SEMANA 5 (24 - 30 Abr) — FEEDBACK REAL + MEJORAS UX
VIE 24/04: Widget feedback in-app Tally.so gratis. Pregunta: Que te falta para pagar $9.99/mes?
SAB 25/04: Hotjar grabaciones de sesion (1000/mes gratis). Ver donde se traban los usuarios.
DOM 26/04: Analisis Plausible + Hotjar. Definir top 5 mejoras por comportamiento real.
LUN 27/04 al JUE 30/04: Implementar mejoras UX 1 a 5, una por dia con Claude.

---

### SEMANA 6 (1 - 7 May) — CONTENIDO + REDES SOCIALES
Cada dia: 2.5 hs codigo con Claude + 2.5 hs grabando videos en iPhone.
Videos 30-60 seg: senales IA en accion, portfolio tiempo real, alertas llegando por WhatsApp.
Plataformas: Instagram Stories + Reels + TikTok.
Objetivo semanal: 3 videos publicados. 100+ seguidores nuevos.

---

### SEMANA 7 (8 - 14 May) — TELEGRAM BOT
LUN 08/05: Crear @AurexBot via @BotFather Telegram (gratis). Webhook en Railway. Comandos /start /precio BTC /ayuda.
MAR-SAB: /senales (top 5 del dia). /alerta BTC 90000 (notifica por Telegram). /portfolio (muestra portfolio vinculado). Suscripcion alertas via Telegram ademas de WhatsApp.
Credenciales: Token Telegram BotFather

---

### SEMANA 8 (15 - 21 May) — STRIPE PRODUCCION + OBJETIVO 10 USUARIOS PRO
LUN 15/05: Stripe modo live. Railway variables de entorno actualizadas. Facturacion automatica.
MAR-MIE 16-17/05: Dashboard metricas en Supabase: usuarios, MRR, conversion free a PRO.
JUE-SAB 18-21/05: Campana WhatsApp personal a inversores. Primer mes PRO con descuento.
Objetivo: 10 usuarios PRO = $99.90 MRR real.

---

### SEMANA 9 (22 - 28 May) — APP STORE PREPARATION
LUN 22/05: Registrar Apple Developer Account $99/ano. REGISTRAR HOY porque tarda 1-3 dias. Setup Capacitor.js.
MAR-MIE 23-24/05: Capacitor envuelve la PWA en contenedor nativo iOS. Genera proyecto Xcode. Vos compilas desde Mac con Xcode.
JUE-SAB 25-28/05: Screenshots iPhone 6.5 y 5.5 pulgadas. Descripcion App Store espanol e ingles. TestFlight 10 usuarios.

---

### SEMANA 10 (29 May - 4 Jun) — APP STORE SUBMISSION + GOOGLE PLAY
LUN 29/05: Submit a App Store Review (tarda 1-7 dias habiles).
MAR-JUE 30/05-02/06: Google Play via TWA con Bubblewrap Google gratuito. Google Play Developer $25 unico pago.
VIE-SAB 03-04/06: Press kit. Post ProductHunt. Post LinkedIn. Tweet de lanzamiento.

---

### SEMANA 11 (5 - 11 Jun) — LANZAMIENTO OFICIAL + B2B
LUN 05/06: LAUNCH DAY. LinkedIn, Twitter/X, grupos LATAM, WhatsApp personal. Monitor Plausible.
MAR-MIE 06-07/06: ProductHunt launch. Tagline, descripcion, respuestas a comentarios.
JUE-SAB 08-11/06: Reuniones B2B con asesores financieros. Plan B2B $199/mes. Claude prepara deck de ventas.
Objetivo: 50+ usuarios registrados. 20+ usuarios PRO.

---

### SEMANA 12 (12 - 19 Jun) — CIERRE + METRICAS + HANDOFF
LUN-MAR 12-13/06: Revision completa 6 tabs. Todo lo que era mock ahora es real.
MIE-JUE 14-15/06: TECHNICAL-DOCS.md: arquitectura, APIs usadas, variables de entorno, como hacer deploy.
VIE-SAB 16-17/06: Metricas finales: usuarios, MRR, conversion, CAC. Brief para Lucas AppStack Fase 4.
DOM 19/06: Retrospectiva. Proyecto completado en 12 semanas exactas.

---

## COSTOS OPERATIVOS MENSUALES

| Servicio | Costo mes | Desde semana |
|---|---|---|
| Claude Max x20 | $200 | Ya activo |
| Railway backend | $5 | Semana 2 |
| Supabase Free | $0 | Semana 1 |
| Plausible Analytics | $9 | Semana 2 |
| Polygon.io Starter | $29 | Semana 4 |
| Twilio WhatsApp | $10 variable | Semana 2 |
| Apple Developer | $8.25 mes | Semana 9 |
| Google Play | $25 unico | Semana 10 |
| Resend email | $0 gratis | Semana 3 |
| Firebase FCM | $0 gratis | Semana 2 |
| TOTAL mensual | ~$261 mes | Semana 4+ |

Break-even: 27 usuarios PRO a $9.99/mes cubren TODOS los costos incluido Claude Max x20.

---

Generado: Claude Sonnet 4.6 - 27/03/2026
Fundador: Fernando G. Moscon - fmoscon@gmail.com
Repo: https://github.com/fmoscon-creator/aurex-app