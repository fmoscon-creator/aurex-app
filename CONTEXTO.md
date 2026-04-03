# CONTEXTO DEL PROYECTO AUREX
Ultima actualizacion: 3 de Abril de 2026 - fin de sesion Viernes

## INICIO RAPIDO
Pega esto al abrir nueva conversacion con Claude:

Hola, continuamos con Aurex.
Repo: https://github.com/fmoscon-creator/aurex-app
App: https://fmoscon-creator.github.io/aurex-app
Lee CONTEXTO.md y docs/PLAN-OPERATIVO.md del repo.
Token GitHub: [TOKEN]
Tarea de hoy segun cronograma: [FECHA] - [TAREA]

## ESTADO HOY 3/04/2026 - FIN DE SESION

### HEAD ACTUAL
Commit: 3fe0e7d34d9ad2b7b6aef903c69cb7f8b05c1998
Fecha: 2026-04-03T07:36:05Z
Descripcion: Fix: reemplaza ... UTF-8 por ASCII en _appendMktRow

### SHA DE REVERSION DISPONIBLE
151ae4945061ee9b1078b0ab211e26e3d7f269ba
(HEAD al inicio de sesion del 3/04/2026)

### COMPLETADO HOY 3/04/2026:
- Fix iOS: clicks dropdown Portfolio (24h/7d/1m/3m/1y/Origen) - anti-double-fire
- Fix iOS: boton Ver Variables del Modelo en IA - ontouchstart
- Tabs Mercados/Futuros: mas chicos (10px) alineados a la derecha
- Mercados: filtros tf (24h/7d/1m/3m/1a) dentro de cada activo (no en tfrow)
- Docs: AUREX-PORTFOLIO-DOC.md actualizado
- Docs: AUREX-MERCADOS-DOC.md creado

### CONFIRMACIONES DE FERNANDO:
- Fix iOS dropdown Portfolio: OK en iPhone
- Fix iOS Ver Variables: OK en iPhone
- Tabs mas chicos a la derecha: 'se ve bien en el iphone'
- Filtros tf dentro de activos Mercados: OK en desktop, pendiente confirmar iPhone

## ARCHIVOS DE DOCUMENTACION
- AUREX-PORTFOLIO-DOC.md: documentacion tecnica completa del tab Portfolio
- AUREX-MERCADOS-DOC.md: documentacion tecnica completa del tab Mercados
- AUREX-IA-DOC.md: documentacion tecnica del tab IA
- BUGFIX_HISTORIAL.md: historial de bugs y soluciones
- REGLAS-DE-ORO-AUREX.md: reglas tecnicas para Claude
- docs/PLAN-OPERATIVO.md: cronograma del proyecto

## COMMITS SESION 3/04/2026 (orden cronologico)

| SHA (completo) | Descripcion | Fecha UTC |
|---|---|---|
| 3fe0e7d34d9ad2b7b6aef903c69cb7f8b05c1998 | Fix: ... UTF-8 -> ASCII en _appendMktRow | 2026-04-03T07:36:05Z |
| e1103a4578513fe2450a52597e91d5188d25fff5 | Fix: botones tf Mercados - quita + duplicado | 2026-04-03T07:31:55Z |
| ecffeec9e8dbb663d952de9c331f669081ef4d05 | Mercados: filtros tf dentro de activos + oculta tfrow | 2026-04-03T07:29:01Z |
| 2856c82023eed7b866f005c7c125fb9c69f99140 | Mercados: tabs mas chicos a la derecha | 2026-04-03T07:22:39Z |
| 40e8d4b9664cbc1450e1de34bc04539579c7314c | Fix iOS: anti-double-fire dropdown portfolio + Ver Variables | 2026-04-03T07:10:23Z |
| 55de4f84a61ab0fcfb51f759b594a7c4aa5b160c | Fix iOS: ontouchstart dropdown + Ver Variables | 2026-04-03T07:06:35Z |
| d814fb1b6df6aac6de3bfcb49cf30f1c9f995521 | Fix iOS: touch-action dropdown portfolio | 2026-04-03T06:55:05Z |
| 151ae4945061ee9b1078b0ab211e26e3d7f269ba | Mercados: tabs + paises compacto + fix Espana/Japon | 2026-04-03T06:11:35Z |
| 7a739131f06f7b814aa05221f29d8ca054bd5bff | Mercados: elimina espacio banner eventos | 2026-04-03T05:51:41Z |
| da092ddcd714cef288fbe356354324d1b9f31a18 | Fix combo banner: display switch | 2026-04-03T05:44:10Z |
| 622cd381b142a0ee9a2751ca56c99faf2fbba125 | Fix combo banner: background slide + dot onclick | 2026-04-03T05:39:54Z |
| 786d4e48d87c5bec910fe5347246d96d5edd7b34 | Mercados: banner combo + buscador arriba + pulse | 2026-04-03T05:34:59Z |
| 39dd8013b1b113f714dbeb14715b924429d25d3a | Fix popup ?: _closeThermoHelp global + iPhone | 2026-04-03T05:01:05Z |
| 0119c928c471bb1af52d861b3f0fa59705249825 | Fix popup ?: overlay+boton Entendido iPhone | 2026-04-03T04:57:50Z |
| 2663239c270f2285102b854f6f025d830b5075ba | Termometro: frases contexto + boton ? popup | 2026-04-03T04:52:28Z |
| f66572984871feea72ad31013b1e01bd5f80adf5 | Termometro: mensaje con accion concreta | 2026-04-03T04:41:53Z |
| e89aaf07d1fb7c6cbee16d0f3ad196ab0e6f5e7f | Fix _calcPortPeriod: precios historicos | 2026-04-03T04:30:41Z |
| d9b55f30499a1d25f9f1797f9190b0bbe0376134 | Fix 24h dropdown + Agregar grande | 2026-04-03T04:24:58Z |
| cc13d06b70e16db2be4613b6c3d8f14c535d8d74 | Header portfolio: badge 24h dorado | 2026-04-03T04:18:44Z |
| 628aadbde85553874a45532023946e1640c840e3 | Rediseno header portfolio: periodos visibles | 2026-04-03T04:11:31Z |

## ESTADO DE CADA FEATURE

REAL (funcionando):
- App en produccion GitHub Pages
- PWA instalable iPhone
- 6 tabs navegables
- Precios crypto tiempo real (Binance REST cada 5seg)
- Conversor crypto (Binance)
- Conversor fiat ARS/EUR/BRL (ExchangeRate API cada 30min)
- Portfolio persistente en Supabase (autenticado)
- Aurex Pulse / Fear & Greed (VIX, S&P, BTC, Oro, Petroleo)
- Termometro de Riesgo con senales IA
- Filtros temporales por activo en Mercados
- Fix iOS touch en dropdown Portfolio y Ver Variables

MOCK (pendiente):
- Alertas WhatsApp: simuladas -> proxima prioridad
- Senales IA: hardcodeadas -> conectar a Claude API
- Acciones USA: precios via Yahoo proxy (funciona) / Polygon.io pendiente
- Push notifications: boton funcional, logica pendiente

## DATOS TECNICOS
- Frontend: HTML+CSS+JS Vanilla monolito ~3000 lineas (index.html) + aurex-features.js (~3900 lineas)
- Hosting: GitHub Pages auto-deploy desde main
- Crypto: Binance REST API (sin key, publica)
- Acciones/ETFs: Yahoo Finance via corsproxy.io
- Fiat: open.er-api.com (gratis, sin key)
- IA: modelo interno _calcIAScore + _iaSeed (datos hardcodeados)
- Backend: Railway en construccion
- DB: Supabase (URL: dklljnfhlzmfsfmxrpie.supabase.co)
- Auth: Google OAuth via Supabase (funcionando)
- Pagos: Stripe planificado
- Alertas: Twilio planificado

## LINKS
- App: https://fmoscon-creator.github.io/aurex-app
- Repo: https://github.com/fmoscon-creator/aurex-app
- Portfolio Doc: https://github.com/fmoscon-creator/aurex-app/blob/main/AUREX-PORTFOLIO-DOC.md
- Mercados Doc: https://github.com/fmoscon-creator/aurex-app/blob/main/AUREX-MERCADOS-DOC.md
- IA Doc: https://github.com/fmoscon-creator/aurex-app/blob/main/AUREX-IA-DOC.md
- Plan operativo: https://github.com/fmoscon-creator/aurex-app/blob/main/docs/PLAN-OPERATIVO.md
- Fundador: Fernando G. Moscon fmoscon@gmail.com

## PLANES
- FREE: 5 activos, 3 senales/dia, sin alertas, con ads
- PRO: $9.99/mes, 50 activos, 10 senales, alertas push
- ELITE: $19.99/mes, ilimitado, 8 idiomas, soporte VIP

## NOTA PARA CLAUDE
- El token GitHub se pasa en el chat al inicio de cada sesion
- SIEMPRE responder en espanol
- SIEMPRE leer blobs desde Git API, nunca desde Pages
- SIEMPRE verificar OLD aparece exactamente 1 vez antes de reemplazar
- SIEMPRE usar split().join() en lugar de replace()
- Todo HTML/JS nuevo 100% ASCII (tildes como entidades)
- btoa(unescape(encodeURIComponent(content))) para base64
- Screenshot obligatorio antes de reportar OK
- Guardar SHA de reversion antes de cada cambio

Generado: Claude Sonnet 4.6 - 3/04/2026