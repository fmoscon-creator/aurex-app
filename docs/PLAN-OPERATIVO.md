# AUREX — PLAN OPERATIVO COMPLETO 12 SEMANAS
Version: 2.0 | Actualizado: 28/03/2026 | Fundador: Fernando G. Moscon
Stack: HTML+CSS+JS Vanilla - GitHub Pages - Supabase - Railway - Stripe

---

## DECISION ESTRATEGICA APP STORE (actualizada 28/03/2026)

**Camino elegido: React Native** (NO Capacitor wrapper, NO Swift puro)
- React Native genera app nativa real — Apple lo aprueba como app nativa
- Se escribe en JavaScript (reutiliza logica actual)
- Xcode se usa SOLO al final para empaquetar y subir — no para programar

**Primer envio al App Store contiene 4 tabs:**
1. Mercados — cotizaciones en tiempo real Binance + Yahoo
2. Portfolio — activos del usuario guardados en Supabase
3. Senales IA — diferenciador clave frente a apps genericas
4. Perfil — login/logout con Supabase

**Por que estas 4 y no menos:**
Apple puede rechazar apps por funcionalidad insuficiente. Las cotizaciones solas no alcanzan.
Login real + Portfolio personal + Senales IA = funcionalidad unica que justifica la existencia de AUREX.
Watchlist y Alertas se agregan en version 2 post-aprobacion.

**Cuenta Apple Developer:** USD 99/anio — comprar al inicio Semana 5
**Privacy Policy:** generarla en 30 min con generador automatico — subir a GitHub Pages

---

## ESTADO ACTUAL — QUE ESTA HECHO HOY 28/03/2026

### FRONTEND — funcionando en produccion

| Feature | Estado | Donde | Semana del plan |
|---|---|---|---|
| App en produccion | REAL | fmoscon-creator.github.io/aurex-app | Base completada |
| PWA instalable iPhone | REAL | manifest.json + service-worker.js | Base completada |
| 6 tabs navegables | REAL | index.html: Portfolio, Mercados, Watchlist, IA, Alertas, Perfil | Base completada |
| Precios crypto tiempo real | REAL | Binance REST API cada 5seg - Tab Mercados | Base completada |
| Conversor crypto | REAL | Binance cada 30seg - boton superior | Base completada |
| Modo oscuro + diseno completo | REAL | CSS en index.html - paleta #D4A017 + #0D1117 | Base completada |
| OBS1 nuevo diseno aprobado | REAL | index.html - 4 tarjetas + boton Entrar a Aurex | Base completada |
| OBS2 Senales IA pantalla | REAL | index.html - 3 features + boton Continuar | Base completada |
| Conversor fiat real | REAL | ExchangeRate API - ARS/USD/EUR/BRL reales | Base completada |
| Supabase auth funcionando | REAL | email/password, sin confirmacion, celular guardado | Semana 1 completada |
| Perfil logueado rediseniado | REAL | avatar + celular editable + guardar + cerrar sesion | Semana 1 completada |
| Service Worker auto-update | REAL | skipWaiting automatico — sin actualizacion manual | Base completada |

### BUILD ACTUAL: v890000

---

## FASES DEL PROYECTO

### FASE 1 — PWA IMPECABLE (Semanas 1-4: 27 Mar - 24 Abr)
Objetivo: App sin bugs, todas las funcionalidades reales, base solida para React Native

### FASE 2 — REACT NATIVE PRIMERAS 4 TABS (Semanas 5-8: 25 Abr - 21 May)
Objetivo: App nativa iOS con Mercados + Portfolio + Senales IA + Perfil. Subir al App Store.

### FASE 3 — APRENDIZAJE APPLE (Semanas 8-10: 18 May - 4 Jun)
Objetivo: Review Apple, ajustes si rechazan, re-submit. Entender el proceso completo.
Mientras se espera review: seguir agregando features a PWA y preparar tabs 5-6 para version 2.

### FASE 4 — APP COMPLETA (Semanas 10-12+: 29 May - 19 Jun)
Objetivo: Si aprobaron, agregar Watchlist + Alertas. Version 1.1 completa con 6 tabs.

---

## SEMANA 1 (27 Mar - 2 Abr) — BUGS CRITICOS Y BASE TECNICA

### VIE 27/03 — COMPLETADO
- fix encoding UTF-8 definitivo
- OBS1 nuevo diseno (4 tarjetas + boton Entrar a Aurex)
- OBS2 implementada (3 features + boton Continuar)
- Conversor fiat con ExchangeRate API real

### SAB 28/03 — EN CURSO
- Fix Conversor de monedas — de Cargando... a funcional con Binance
- Verificar en emulador iPhone antes de confirmar

### DOM 29/03 — 5 hs
- Portfolio persistente: tabla portfolios en Supabase
- Activos del usuario guardados en la nube

### LUN 30/03 — 5 hs
- Portfolio completo: agregar/eliminar activos, ver valor total, P&L

### MAR 31/03 — 5 hs
- Senales IA funcionales: RSI simulado + tendencia + volumen
- 5 senales diarias: activo, LONG/SHORT, confianza %
- Tabla signals en Supabase

### MIE 01/04 — 5 hs
- Watchlist persistente en Supabase
- Boton + en Mercados agrega a watchlist

### JUE 02/04 — 5 hs
- Buffer: corregir bugs, verificar todas las tabs en iPhone

---

## SEMANA 2 (3 - 9 Abr) — ALERTAS + BACKEND

- Backend Node.js: Express + Supabase + Twilio en Railway
- Tabla alerts: user_id, activo, precio_objetivo, direccion, activa
- Cron job verifica precios cada minuto
- Notificacion WhatsApp via Twilio
- UI alertas: crear, listar, eliminar

---

## SEMANA 3 (10 - 16 Abr) — STRIPE + PLANES

- Stripe: PRO USD 9.99/mes, ELITE USD 19.99/mes
- UI upgrade: botones Activar PRO y Activar ELITE
- Restricciones por plan:
  - FREE: max 5 activos, 3 senales/dia, sin alertas
  - PRO: 50 activos, 10 senales, alertas WhatsApp
  - ELITE: ilimitado + Telegram Bot

---

## SEMANA 4 (17 - 24 Abr) — PULIDO FINAL PWA

- Exportar PDF y Excel (jsPDF + SheetJS)
- Mejoras UX: animaciones, skeletons, empty states
- Revision completa en iPhone — todas las tabs impecables
- Commit: "PWA v1.0 completa — base React Native"

---

## SEMANA 5 (25 Abr - 1 May) — SETUP REACT NATIVE

- Comprar Apple Developer Account: USD 99 (fmoscon@gmail.com)
- Instalar: Node.js + React Native CLI + Xcode en Mac
- Crear proyecto: npx react-native init AurexApp
- Configurar React Navigation (bottom tabs)
- Conectar Supabase SDK
- Splash screen con logo AUREX
- App corre en simulador iOS y en iPhone real

---

## SEMANA 6 (2 - 8 May) — TAB MERCADOS EN REACT NATIVE

- MercadosScreen: FlatList activos crypto + acciones USA
- WebSocket Binance — misma logica portada a React Native
- Conversor de monedas
- Diseno identico a PWA: modo oscuro, #D4A017 + #0D1117

---

## SEMANA 7 (9 - 15 May) — TABS PORTFOLIO + PERFIL EN REACT NATIVE

- AuthScreen: login/registro Supabase
- PerfilScreen: datos usuario, celular, plan, cerrar sesion
- PortfolioScreen: activos, valor total, P&L
- Misma DB Supabase que PWA — datos compartidos

---

## SEMANA 8 (16 - 21 May) — TAB SENALES IA + SUBMIT APP STORE

### LUN-MAR 16-17/05
- SeñalesScreen: 5 senales diarias LONG/SHORT con confianza %

### MIE 18/05
- Privacy Policy: fmoscon-creator.github.io/aurex-app/privacy-policy
- App Icons (1024x1024 + todos los tamanos) y Screenshots App Store
- Descripcion en espanol e ingles

### JUE-VIE 19-20/05
- Archive en Xcode: Product -> Archive
- Subir via Xcode Organizer a App Store Connect
- Submit a App Store Review

### SAB 21/05
- TestFlight: invitar 5-10 beta testers
- Monitorear estado del review

---

## SEMANA 9 (22 - 28 May) — FASE 3: APRENDIZAJE APPLE

Apple tarda entre 1 y 7 dias habiles en revisar.

**Si aprueba:** publicar en redes, preparar version 2 con Watchlist + Alertas.
**Si rechaza:** leer motivo exacto, corregir en 48hs, re-submit.

Causas comunes de rechazo y como evitarlas:
- Funcionalidad insuficiente: cubierto con 4 tabs + login + senales IA
- Privacy Policy faltante: cubierto en Semana 8
- Demo/placeholder content: todas las senales y datos deben ser reales al momento del submit
- Crash en review device: testear exhaustivamente antes de subir

Mientras se espera: agregar Watchlist a React Native para version 2.

---

## SEMANA 10 (29 May - 4 Jun) — LANZAMIENTO + GOOGLE PLAY

- Anuncio en LinkedIn, Twitter/X, grupos crypto LATAM
- Post ProductHunt
- Google Play via TWA con Bubblewrap (USD 25 unico pago)

---

## SEMANA 11 (5 - 11 Jun) — LANZAMIENTO OFICIAL + B2B

- LAUNCH DAY en todas las redes
- ProductHunt launch
- Reuniones B2B con asesores financieros
- Plan B2B USD 199/mes
- Objetivo: 50+ usuarios registrados, 20+ usuarios PRO

---

## SEMANA 12 (12 - 19 Jun) — CIERRE + METRICAS

- Revision completa: app nativa 4 tabs + PWA 6 tabs
- TECHNICAL-DOCS.md: arquitectura, APIs, decisiones
- Metricas finales: usuarios, MRR, conversion rate

---

## PROTOCOLO DE TRABAJO SESION A SESION

1. Claude lee CONTEXTO.md y PLAN-OPERATIVO.md al inicio de cada sesion
2. Ejecuta la tarea del dia segun cronograma
3. SIEMPRE verificar en emulador iPhone antes de confirmar terminado
4. SIEMPRE borrar fmoscon@gmail.com de Supabase antes de pedir que Fernando pruebe
5. NUNCA marcar como terminado sin screenshot en iPhone verificado
6. NUNCA proponer temas nuevos si los actuales no funcionan

---

## CREDENCIALES (no commitear en codigo)

- GitHub Token: ver CONTEXTO.md
- Supabase URL: https://dklljnfhlzmfsfmxrpie.supabase.co
- App en vivo: https://fmoscon-creator.github.io/aurex-app
- Repo: https://github.com/fmoscon-creator/aurex-app
