# CONTEXTO DEL PROYECTO AUREX
Ultima actualizacion: 27 de Marzo de 2026 — fin de sesion Sabado

## INICIO RAPIDO
Pega esto al abrir nueva conversacion con Claude:

Hola, continuamos con Aurex.
Repo: https://github.com/fmoscon-creator/aurex-app
App: https://fmoscon-creator.github.io/aurex-app
Lee CONTEXTO.md y docs/PLAN-OPERATIVO.md del repo.
Token GitHub: [TOKEN]
Tarea de hoy segun cronograma: [FECHA] - [TAREA]
Credenciales necesarias hoy: [solo las del dia]

## ESTADO HOY 27/03/2026 — FIN DE SESION

### COMPLETADO HOY:
- fix encoding UTF-8 definitivo: doble-encoding corregido en todo el HTML
- OBS1 nuevo diseno aprobado: 4 tarjetas (verde/azul/dorado/violeta) + boton Entrar a Aurex
- OBS2 implementada: Senales IA en tiempo real — 3 features + boton Continuar
- Conversor fiat con ExchangeRate API real: ARS/EUR/BRL se actualizan cada 30 min
- PLAN-OPERATIVO.md creado en docs/ con cronograma completo 12 semanas
- Flujo onboarding: OBS1 -> OBS2 -> App (sin formulario WhatsApp al inicio)
- 4 commits exitosos en produccion

### ESTADO DE CADA FEATURE:

REAL (funcionando):
- App en produccion GitHub Pages
- PWA instalable iPhone
- 6 tabs navegables
- Precios crypto tiempo real (Binance REST cada 5seg)
- Conversor crypto (Binance)
- Conversor fiat ARS/EUR/BRL (ExchangeRate API — NUEVO HOY)
- Diseno visual completo sin caracteres rotos (NUEVO HOY)
- OBS1 nuevo diseno aprobado (NUEVO HOY)
- OBS2 Senales IA info screen (NUEVO HOY)
- Service Worker v2.0 network-first

MOCK (pendiente):
- Auth: NO EXISTE -> Semana 1 Dom 29/03 (PROXIMO)
- Portfolio: in-memory -> Semana 1 Lun 30/03
- Watchlist: in-memory -> Semana 1 Mar 31/03
- Alertas WhatsApp: simuladas -> Semana 2 Sab 04/04
- Senales IA: hardcodeadas -> Semana 2 Mar 07/04
- Pagos Stripe: botones vacios -> Semana 3
- Acciones USA: estaticas -> Semana 4
- Push notifications: boton sin funcion -> Semana 2 Lun 06/04

## PROXIMA TAREA INMEDIATA
Dom 29/03: Supabase + Google OAuth
- El codigo de integracion ya esta preparado en index.html (PENDIENTE DE KEYS)
- Fernando necesita:
  1. Crear proyecto en supabase.com (gratis)
  2. Ir a Settings > API y copiar: Project URL + anon key
  3. Ir a Authentication > Providers > Google y habilitar
  4. En Google Cloud Console: crear OAuth client ID para web
  5. Pasarle a Claude: URL Supabase + anon key + Google client ID
- Con esas 3 credenciales Claude completa la integracion en 30 minutos

## AUDITORIA REAL vs MOCK COMPLETA
TAB MERCADOS:
- Precios crypto: REAL (Binance REST cada 5seg)
- Precios acciones: MOCK (hardcodeados)
- Seniales IA: MOCK (93 hardcodeadas en DATA)
- Graficas: MOCK (arrays estaticos)

TAB PORTFOLIO:
- Storage: MOCK (in-memory, se pierde al cerrar)
- Auth: NO EXISTE

TAB WATCHLIST:
- Storage: MOCK (in-memory)
- Precios: REAL (mismos de Binance)

TAB SENALES IA:
- Fuente: MOCK (objeto DATA hardcodeado)
- Claude API: NO conectado

TAB ALERTAS:
- WhatsApp/Twilio: NO conectado
- Todo simulado

TAB PERFIL:
- Usuario: MOCK hardcodeado
- Auth: NO EXISTE
- Planes: VISUAL solo

CONVERSOR:
- Crypto rates: REAL (Binance cada 30seg)
- Fiat rates ARS/EUR/BRL: REAL (ExchangeRate API cada 30min) — NUEVO HOY

## DATOS TECNICOS
- Frontend: HTML+CSS+JS Vanilla monolito ~2800 lineas
- Hosting: GitHub Pages auto-deploy
- Crypto: Binance REST API
- Fiat: open.er-api.com (gratis, sin key)
- Acciones: Estaticas (Fase 2: Polygon.io Semana 4)
- IA: Hardcodeada (Fase 2: Claude API Semana 2)
- Backend: Railway en construccion (server.js vacio)
- DB: Supabase planificado (Semana 1)
- Auth: Google OAuth via Supabase (Semana 1)
- Pagos: Stripe planificado (Semana 3)
- Alertas: Twilio planificado (Semana 2)

## LINKS
- App: https://fmoscon-creator.github.io/aurex-app
- Repo: https://github.com/fmoscon-creator/aurex-app
- Plan operativo: https://github.com/fmoscon-creator/aurex-app/blob/main/docs/PLAN-OPERATIVO.md
- Fundador: Fernando G. Moscon fmoscon@gmail.com

## PLANES
- FREE: 5 activos, 3 senales/dia, sin alertas, con ads
- PRO: $9.99/mes, 50 activos, 10 senales, alertas push
- ELITE: $19.99/mes, ilimitado, 8 idiomas, soporte VIP

## CRONOGRAMA SEMANA 1 (28 Mar - 2 Abr)
- Sab 28/03: Fix encoding + OBS1 + OBS2 + Conversor fiat COMPLETADO
- Dom 29/03: Supabase + Google OAuth (PROXIMO)
- Lun 30/03: Portfolio persistente en Supabase
- Mar 31/03: Watchlist + Alertas en Supabase
- Mie 01/04: Testing iOS Safari
- Jue 02/04: Buffer bugs + update docs

## NOTA PARA CLAUDE
- El token GitHub se pasa en el chat al inicio de cada sesion
- El codigo de Supabase ya tiene los placeholders SUPABASE_URL y SUPABASE_ANON_KEY
- Para commitear usar GitHub API (fetch PUT a api.github.com) desde la live app page
- CORS: los fetch a api.github.com funcionan desde fmoscon-creator.github.io

Generado: Claude Sonnet 4.6 - 27/03/2026