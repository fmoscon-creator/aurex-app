# CONTEXTO DEL PROYECTO AUREX
Ultima actualizacion: 27 de Marzo de 2026

## INICIO RAPIDO
Pega esto al abrir nueva conversacion con Claude:
Hola! Continuamos en Aurex. Repo: https://github.com/fmoscon-creator/aurex-app App en vivo: https://fmoscon-creator.github.io/aurex-app Lee CONTEXTO.md. Tarea de hoy: [TAREA].
IMPORTANTE: Para que Claude tenga acceso a GitHub, pasale el token en el chat (no guardarlo en el repo).

## ESTADO HOY 27/03/2026
COMPLETADO:
- fix encoding Safari iOS: HTML entities (v2.3) + SW network-first (v2.0)
- fix conversor monedas: openModal llama updateConv() (v2.2)
- auditoria real vs mock completa

## AUDITORIA REAL vs MOCK

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

TAB SENIALES IA:
- Fuente: MOCK (objeto DATA hardcodeado)
- Claude API: NO conectado

TAB ALERTAS:
- WhatsApp/Twilio: NO conectado
- Todo simulado

TAB PERFIL:
- Usuario: MOCK hardcodeado
- Auth: NO EXISTE

CONVERSOR:
- Crypto rates: REAL (Binance cada 30seg)
- Fiat rates (ARS/EUR/BRL): MOCK estaticos

## BUGS PENDIENTES
- Encoding Safari: FIX APLICADO v2.3 - verificar con Fernando
- Backend server.js: solo requires, sin logica
- Auth: no existe
- Portfolio/Watchlist: sin persistencia

## PROXIMOS PASOS (SEMANA 1)
- Sab 28/03: Fix conversor fiat con API real (exchangerate.host)
- Dom 29/03: Setup Supabase + Google OAuth
- Lun 30/03: Portfolio persistente en Supabase
- Mar 31/03: Watchlist + Alertas en Supabase
- Mie 01/04: Conectar Claude API para seniales reales
- Jue 02/04: Testing completo

## DATOS TECNICOS
- Frontend: HTML+CSS+JS Vanilla monolito ~2800 lineas
- Hosting: GitHub Pages (auto-deploy)
- Crypto: Binance REST API
- Acciones: Estaticas (Fase 2: Polygon.io)
- IA: Hardcodeada (Fase 2: Claude API)
- Backend: Railway en construccion
- DB: Supabase planificado
- Auth: Firebase planificado
- Pagos: Stripe planificado
- Alertas: Twilio planificado

## LINKS
- App: https://fmoscon-creator.github.io/aurex-app
- Repo: https://github.com/fmoscon-creator/aurex-app
- Fundador: Fernando G. Moscon fmoscon@gmail.com
- Commit estable: 358f83b

## PLANES
- FREE: 5 activos, 3 seniales/dia, sin alertas, con ads
- PRO: $9.99/mes, 50 activos, 10 seniales, alertas push
- ELITE: $19.99/mes, ilimitado, 8 idiomas, soporte VIP

## NOTA PARA CLAUDE
Para commitear al repo, pedirle el GitHub Token a Fernando en el chat.
No guardarlo en este archivo.

Generado: Claude Sonnet 4.6 - 27/03/2026