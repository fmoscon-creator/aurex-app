# AUREX â PLAN OPERATIVO COMPLETO 12 SEMANAS
Version: 2.1 | Actualizado: 28/03/2026 | Fundador: Fernando G. Moscon
Stack: HTML+CSS+JS Vanilla - GitHub Pages - Supabase - Railway - Stripe

---

## DECISION ESTRATEGICA APP STORE (actualizada 28/03/2026)

**Camino elegido: React Native** (NO Capacitor wrapper, NO Swift puro)
- React Native genera app nativa real â Apple lo aprueba como app nativa
- Se escribe en JavaScript (reutiliza logica actual)
- Xcode se usa SOLO al final para empaquetar y subir â no para programar

**Primer envio al App Store contiene 4 tabs:**
1. Mercados â cotizaciones en tiempo real Binance + Yahoo
2. Portfolio â activos del usuario guardados en Supabase
3. Senales IA â diferenciador clave frente a apps genericas
4. Perfil â login/logout con Supabase

**Por que estas 4 y no menos:**
Apple puede rechazar apps por funcionalidad insuficiente. Las cotizaciones solas no alcanzan.
Login real + Portfolio personal + Senales IA = funcionalidad unica que justifica la existencia de AUREX.
Watchlist y Alertas se agregan en version 2 post-aprobacion.

**Cuenta Apple Developer:** USD 99/anio â comprar al inicio Semana 5
**Privacy Policy:** generarla en 30 min con generador automatico â subir a GitHub Pages

---

## ESTADO REAL AL 28/03/2026 â QUE ESTA HECHO

| Feature | Estado | Notas |
|---|---|---|
| App en produccion GitHub Pages | DONE | fmoscon-creator.github.io/aurex-app |
| PWA instalable iPhone | DONE | manifest.json + service-worker.js |
| 6 tabs navegables | DONE | Portfolio, Mercados, Watchlist, Senales IA, Alertas, Perfil |
| Precios crypto tiempo real | DONE | Binance REST API cada 5seg |
| Conversor crypto Binance | DONE | BTC/ETH/BNB/SOL en tiempo real |
| Conversor fiat real | DONE | ExchangeRate API â ARS/USD/EUR/BRL cada 30min |
| Modo oscuro + diseno completo | DONE | CSS paleta #D4A017 + #0D1117 |
| OBS1 nuevo diseno aprobado | DONE | 4 tarjetas + boton Entrar a Aurex |
| OBS2 Senales IA pantalla | DONE | 3 features + boton Continuar |
| Supabase auth email/password | DONE | Sin confirmacion de email, login inmediato |
| Perfil logueado rediseniado | DONE | Avatar + celular editable + Guardar + Cerrar sesion |
| Boton Guardar celular funciona | DONE | getSB() corregido, upsert a tabla users |
| Service Worker auto-update | DONE | skipWaiting automatico, sin intervencion manual |
| Portfolio Supabase (basico) | DONE | feat v800000 â activos guardados en nube |
| Build badge dev | DONE | Muestra BUILD + pantalla activa |

| Feature | Estado | Notas |
|---|---|---|
| Conversor modal (fix "Cargando...") | PENDIENTE HOY | El modal del conversor puede tener bug |
| Portfolio completo (agregar/editar/eliminar) | PENDIENTE | Semana 1 |
| Senales IA funcionales | PENDIENTE | Semana 1 |
| Watchlist persistente Supabase | PENDIENTE | Semana 1 |
| Backend alertas Railway | PENDIENTE | Semana 2 |
| Stripe pagos | PENDIENTE | Semana 3 |

### BUILD ACTUAL: v890000

---

## FASES DEL PROYECTO

### FASE 1 â PWA IMPECABLE (Semanas 1-4: 27 Mar - 24 Abr)
Objetivo: App sin bugs, todas las funcionalidades reales, base solida para React Native

### FASE 2 â REACT NATIVE PRIMERAS 4 TABS (Semanas 5-8: 25 Abr - 21 May)
Objetivo: App nativa iOS con Mercados + Portfolio + Senales IA + Perfil. Subir al App Store.

### FASE 3 â APRENDIZAJE APPLE (Semanas 8-10: 18 May - 4 Jun)
Objetivo: Review Apple, ajustes si rechazan, re-submit.

### FASE 4 â APP COMPLETA (Semanas 10-12+: 29 May - 19 Jun)
Objetivo: Watchlist + Alertas en app nativa. Version 1.1 completa con 6 tabs.

---

## SEMANA 1 (27 Mar - 2 Abr) â BUGS CRITICOS Y BASE TECNICA

### VIE 27/03 â COMPLETADO
- fix encoding UTF-8 definitivo
- OBS1 nuevo diseno (4 tarjetas + boton Entrar a Aurex)
- OBS2 implementada (3 features + boton Continuar)
- Conversor fiat con ExchangeRate API real

### SAB 28/03 â COMPLETADO (sesion maniana)
- Supabase auth funcionando: registro, login, celular, cerrar sesion
- Perfil logueado rediseniado
- Boton Guardar celular corregido (getSB fix)
- Service Worker auto-update sin intervencion manual
- Portfolio basico guardado en Supabase (v800000)
- Build badge funcionando

### SAB 28/03 â TAREA ACTUAL (sesion tarde/noche)
Verificar conversor modal: abrir conversor desde header, comprobar que muestra precios reales Binance y no "Cargando..." congelado. Si hay bug, corregir.

### DOM 29/03 -- COMPLETADO
BUGS CRITICOS:
- [x] Bug pantalla negra iPhone nuevo (obs1 display:none) -- corregido commit df69aa21
- [x] window._supabaseClient -> window._supabase -- corregido commit 608704af
- [x] from("users") -> from("usuarios") -- corregido commit 3101a021
- [x] FK constraint portfolio + RLS policies -- corregido via SQL Supabase

PORTFOLIO:
- [x] Modal agregar activo (nombre + cantidad + precio compra)
- [x] Lista activos con precio vivo Binance/Yahoo
- [x] P&L total en tiempo real
- [x] Eliminar activo
- [x] Guardado en Supabase tabla portfolio

SENALES IA (Tab completo):
- [x] UI: 3 botones ALCISTAS / BAJISTAS / ALTA CONF
- [x] Motor: 8 variables Grupo A (RSI, Tendencia, Volumen, Volatilidad, Correlacion, Oro/Petroleo, Macro, Earnings)
- [x] Threshold fix: 0.15 -> 0.05 para distribucion correcta de categorias
- [x] Modal detalle: 3 escenarios probabilidad + Principal resaltado + 5 justificaciones
- [x] Distribucion hoy: 8 ALCISTAS, 0 BAJISTAS, 3 ALTA CONF (11 activos)
- [x] Encoding fix: botones + Senales IA header + X cerrar modal
- [x] Fix HTML: div screen-watchlist faltante

DOCUMENTACION:
- [x] BUGFIX_HISTORIAL.md creado con historico completo
- [x] PLAN-OPERATIVO.md actualizado con metodologia Grupo A/B

### LUN 30/03 -- PENDIENTE (manana)
Tarea: Senales IA - Guardar en Supabase + Watchlist
- [ ] Guardar senales del dia en Supabase tabla signals
- [ ] Verificar tabla signals existe (SQL: CREATE TABLE IF NOT EXISTS signals...)
- [ ] Implementar Watchlist: boton estrella en Mercados agrega a watchlist
- [ ] Tab Watchlist lee activos favoritos de Supabase con precio en vivo
- [ ] Verificar flujo completo en iPhone 390x844

GRUPO B (Semana 2 via Railway):
- [ ] Noticias periodisticas + NLP
- [ ] Sentiment redes sociales
- [ ] Variables geopoliticas
- [ ] Materias primas extendidas

### MAR 31/03 â 5 hs
Tarea: Watchlist persistente
- Tabla watchlist en Supabase: user_id, activo, agregado_el
- Boton corazon/estrella en tab Mercados agrega activo a watchlist
- Tab Watchlist lee de Supabase y muestra activos con precio en vivo
- Verificar en iPhone

### MIE 01/04 â 5 hs
Tarea: Pulido y revision Semana 1
- Revisar los 3 features anteriores en conjunto
- Corregir bugs encontrados
- Verificar flujo completo: registro -> portfolio -> senales -> watchlist
- Commit: "Semana 1 completa â portfolio + senales + watchlist"

### JUE 02/04 â 5 hs
Tarea: Buffer
- Cualquier fix pendiente de la semana
- Verificar en iPhone real (no solo emulador)

---

## SEMANA 2 (3 - 9 Abr) â ALERTAS + BACKEND

### LUN 03/04
- Implementar Grupo B del Motor de Señales: NewsAPI + NLP + Geopolitica + Redes Sociales
- Crear proyecto Railway (railway.app gratuito)
- server.js: Express + Supabase + node-cron
- Deploy a Railway

### MAR 04/04
- Tabla alerts en Supabase: user_id, activo, precio_objetivo, direccion (above/below), activa
- Cron job en Railway: verifica precios cada minuto via Binance REST

### MIE 05/04
- Notificacion: cuando precio cruza objetivo, marcar alerta como disparada en Supabase
- (Twilio WhatsApp opcional si Fernando tiene cuenta Twilio)

### JUE-VIE 06-07/04
- UI tab Alertas: crear alerta (activo + precio + direccion)
- Listar alertas activas e historial de disparadas
- Verificar flujo completo en iPhone

---

## SEMANA 3 (10 - 16 Abr) â STRIPE + PLANES

### LUN 07/04
- Stripe setup: crear productos PRO USD 9.99/mes y ELITE USD 19.99/mes
- Credenciales necesarias: Stripe publishable key + secret key + webhook signing secret
- Backend: POST /api/checkout-session + POST /api/webhook

### MAR-MIE 08-09/04
- UI upgrade: modal planes con botones Activar PRO y Activar ELITE
- Link Stripe Checkout abre en browser externo

### JUE-SAB 10-12/04
- Restricciones reales por plan en frontend:
  - FREE: max 5 activos portfolio, 3 senales/dia, sin alertas
  - PRO: 50 activos, 10 senales, alertas activas
  - ELITE: ilimitado + prioridad en senales

---

## SEMANA 4 (17 - 24 Abr) â PULIDO FINAL PWA

### LUN-MAR 17-18/04
- Exportar PDF portfolio con jsPDF (via CDN, sin backend)
- Exportar Excel .xlsx con SheetJS (via CDN)

### MIE-JUE 19-20/04
- Mejoras UX: skeletons de carga, empty states, animaciones suaves
- Performance: reducir renders innecesarios

### VIE-SAB 21-22/04
- Revision completa todas las tabs en iPhone real
- Corregir cualquier bug visual o funcional

### DOM 24/04 â Cierre Fase 1
- Commit: "PWA v1.0 completa â base lista para React Native"
- Actualizar CONTEXTO.md con estado final Fase 1

---

## SEMANA 5 (25 Abr - 1 May) â SETUP REACT NATIVE

- Comprar Apple Developer Account: USD 99 (fmoscon@gmail.com)
- Instalar en Mac: Node.js LTS + React Native CLI + Xcode (desde App Store, gratis)
- Crear proyecto: npx react-native init AurexApp --template react-native-template-typescript
- Instalar dependencias: React Navigation, @supabase/supabase-js, react-native-async-storage
- Configurar bottom tab navigator con 4 tabs: Mercados, Portfolio, Senales, Perfil
- Splash screen con logo AUREX
- Meta: app corre en simulador iOS (sin datos aun)

---

## SEMANA 6 (2 - 8 May) â TAB MERCADOS EN REACT NATIVE

- MercadosScreen: FlatList con BTC, ETH, BNB, SOL, y acciones USA
- WebSocket Binance para precios en tiempo real
- Yahoo Finance para acciones (AAPL, TSLA, NVDA, etc.)
- Conversor de monedas (Binance + ExchangeRate)
- Diseno: modo oscuro, fuente SF Pro, colores identicos a PWA (#D4A017 + #0D1117)
- Verificar en iPhone real via Xcode (cable USB)

---

## SEMANA 7 (9 - 15 May) â PORTFOLIO + PERFIL + CONVERSOR DE ACTIVOS EN REACT NATIVE

**Objetivo:** Login real, Portfolio simulado y Conversor de Activos funcional.

### AuthScreen + PerfilScreen
- Login/registro Supabase (email/password)
- PerfilScreen: nombre, email, celular, plan, cerrar sesion

### PortfolioScreen â DEFINICION IMPORTANTE
**Portfolio AUREX = Seguimiento SIMULADO, no ejecucion real.**
- AUREX NO recibe dinero, NO ejecuta ordenes, NO conecta con exchanges
- Usuario carga manualmente: "tengo 0.5 BTC, 10 AAPL, 2 ETH"
- AUREX muestra valor en tiempo real (como Delta, CoinStats, Kubera)
- Usuario tiene su dinero donde quiera â AUREX solo lo visualiza
- No requiere licencias financieras â Apple aprueba sin restricciones

Funcionalidades:
- Agregar activo: ticker + cantidad + precio de compra
- Lista con precio actual en vivo y P&L por activo
- Valor total y P&L total en tiempo real
- Eliminar activo
- Misma DB Supabase que PWA

### CONVERSOR DE ACTIVOS â Feature diferenciadora para App Store
**â Definicion acordada con Fernando el 28/03/2026 â**

Permite simular conversiones entre activos dentro del portfolio simulado.
El portfolio se actualiza reflejando el resultado de la conversion.

Ejemplo:
- Usuario tiene: 1 BTC en portfolio
- Convierte: 0.5 BTC a XRP
- AUREX calcula al precio actual: 0.5 BTC = USD 33.000 = 47.826 XRP
- Portfolio queda: 0.5 BTC + 47.826 XRP (nuevo activo creado automaticamente)
- Valor total del portfolio no cambia â es conversion a precio de mercado

Flujo de desarrollo (UX):
1. Usuario toca activo en Portfolio (ej: BTC)
2. Boton "Convertir" en detalle del activo
3. Ingresa cantidad a convertir (ej: 0.5)
4. Buscador elige activo destino con logo real (ej: XRP)
5. AUREX muestra calculo previo: X BTC = Y USD = Z XRP
6. Usuario confirma
7. Supabase actualiza: BTC reducido + XRP creado o incrementado
8. Portfolio se refresca con nueva composicion

Aclaraciones tecnicas y legales:
- 100% simulado â no ejecuta trades reales en ningun exchange
- No requiere conexion con Binance/Coinbase para operar
- No requiere licencias financieras ni regulacion (paper trading)
- Apple lo aprueba: es gestion de portfolio simulado

Por que es clave para aprobacion App Store:
- Funcionalidad unica y diferenciadora
- Usuario tiene razon concreta para usar AUREX todos los dias
- Demuestra valor real mas alla de cotizaciones

## SEMANA 8 (16 - 21 May) â TAB SENALES IA + SUBMIT APP STORE

### LUN-MAR 16-17/05
- SeÃ±alesScreen: lista de 5 senales diarias LONG/SHORT con confianza %
- Misma logica de algoritmo que PWA, portada a React Native
- Diseno: tarjetas con color verde (LONG) / rojo (SHORT)

### MIE 18/05 â Preparacion App Store
- Privacy Policy: generarla en privacypolicygenerator.info
- Subir a: fmoscon-creator.github.io/aurex-app/privacy-policy.html
- App Icons: generar todos los tamanos desde 1024x1024 con appicon.co
- Screenshots: capturar en simulador iPhone 6.7" y 6.1"
- Descripcion App Store espanol: titulo, subtitulo, descripcion, keywords
- Keywords sugeridos: crypto, bitcoin, portfolio, inversion, senales, trading

### JUE-VIE 19-20/05 â Submit
- Xcode: Product -> Archive -> Distribute App -> App Store Connect
- App Store Connect: completar metadata, subir screenshots, Privacy Policy URL
- Categoria: Finance | Precio: Gratis | Clasificacion: 4+
- Submit a App Store Review

### SAB 21/05
- TestFlight: invitar a Fernando + 5-10 beta testers
- Monitorear estado en App Store Connect

---

## SEMANA 9 (22 - 28 May) â FASE 3: APRENDIZAJE APPLE

Apple tarda entre 1 y 7 dias habiles en revisar.

**Si aprueba:** publicar en LinkedIn/Twitter/X, preparar update con Watchlist + Alertas.
**Si rechaza:** leer el motivo exacto que manda Apple por email, corregir en 48hs, re-submit.

Causas comunes de rechazo:
- 4.0 Design: funcionalidad insuficiente â evitado con 4 tabs + login + senales
- 5.1.1 Privacy: datos sin Privacy Policy â evitado en Semana 8
- 2.1 Performance: crash en review device â testear exhaustivamente antes de subir
- 4.2 Minimum Functionality: app demasiado simple â evitado con diferenciadores

Mientras se espera review (hasta 7 dias):
- Agregar tab Watchlist a React Native para version 2.0
- Continuar mejoras en PWA

---

## SEMANA 10 (29 May - 4 Jun) â LANZAMIENTO + GOOGLE PLAY

**Si App Store aprueba (lo sabremos esta semana):**
- Anuncio en LinkedIn, Twitter/X, grupos crypto LATAM, WhatsApp personal
- Post ProductHunt: tagline + descripcion + screenshots
- Google Play via TWA con Bubblewrap (gratis) â Google Play Developer USD 25 unico pago

---

## SEMANA 11 (5 - 11 Jun) â LANZAMIENTO OFICIAL + B2B

- LAUNCH DAY oficial en todas las redes
- ProductHunt submit
- Primeras reuniones B2B con asesores financieros independientes
- Deck de ventas para Plan B2B USD 199/mes
- Objetivo de la semana: 50+ usuarios registrados, 20+ usuarios PRO

---

## SEMANA 12 (12 - 19 Jun) â CIERRE + METRICAS

- Revision completa: app nativa 4 tabs + PWA 6 tabs todo funcionando
- TECHNICAL-DOCS.md: arquitectura final, APIs usadas, decisiones tecnicas
- Metricas finales del MVP: usuarios totales, MRR, conversion rate FREE->PRO
- Plan Semana 13+: version 2.0 app nativa con Watchlist + Alertas + Stripe nativo

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

---

## MOTOR DE SEÑALES AUREX — METODOLOGÍA COMPLETA (actualizado 29/03/2026)

### GRUPO A — Implementado Semana 1 (29/03/2026)

**1. RSI Simulado (Momentum)**
Compara el precio actual contra el precio de hace 24hs. Si subió más de un umbral → momentum positivo. Si bajó → negativo. Determina si el activo está sobrecomprado o sobrevendido.

**2. Tendencia de Precio 24hs**
Variación porcentual real desde Binance (crypto) o Yahoo Finance (acciones). Mide la dirección y fuerza del movimiento reciente.

**3. Volumen Relativo**
Compara el volumen actual con el promedio histórico del activo. Volumen alto + precio subiendo = señal fuerte. Volumen bajo = señal débil.

**4. Volatilidad**
Amplitud del rango de precio en las últimas horas. Alta volatilidad puede indicar ruptura inminente en cualquier dirección.

**5. Correlación de Mercado**
Si BTC sube fuerte, las altcoins tienden a seguirlo. Si el S&P500 cae, las acciones correlacionan. El sistema pondera esto.

**6. Precio del Oro y Petróleo (riesgo global)**
Oro al alza = aversión al riesgo global = presión bajista en crypto y acciones growth. Petróleo al alza = presión inflacionaria = impacto en tasas y mercados. Se obtiene via Yahoo Finance (GC=F, CL=F) en tiempo real.

**7. Dato Macro del Día (factor de ajuste)**
Si hay reunión de Fed, publicación de IPC, IPP, PBI o datos de empleo en el día, el sistema aumenta el factor de incertidumbre y ajusta las probabilidades de los 3 escenarios. Fuente: FRED API (Federal Reserve) + calendario económico.

**8. Earnings Proximity (proximidad de balances)**
Si una empresa reporta resultados trimestrales en los próximos 7 días, el sistema aumenta la volatilidad esperada y lo refleja en los motivos de justificación. Fuente: Yahoo Finance earnings calendar.

---

### GRUPO B — A implementar Semana 2 (3-9 Abr) via backend Railway

**9. Noticias periodísticas y de medios**
Scraping de titulares relevantes por activo via NewsAPI o GDELT. Procesamiento de sentimiento (positivo/negativo/neutro) via NLP server-side en Railway.

**10. Sentiment de Redes Sociales**
Análisis de menciones y sentimiento en X (Twitter), Reddit (r/CryptoCurrency, r/investing) y Telegram. Requiere APIs de terceros y procesamiento NLP.

**11. Variables Geopolíticas**
Eventos de alto impacto: guerras, catástrofes naturales, elecciones, cambios de gobierno. Clasificados por región e impacto esperado en mercados. Procesados via NLP en Railway con fuentes como GDELT y Reuters API.

**12. Metales y Materias Primas extendidas**
Cobre (indicador de actividad industrial), gas natural, trigo, soja. Correlaciones con mercados emergentes y LATAM específicamente.

**13. Balances y Resultados Corporativos**
Lectura automática de earnings surprises (resultado real vs estimado). EPS beat/miss como señal directa para acciones individuales.

---

### Generación de los 3 Escenarios de Probabilidad

Cada variable puntúa entre -1 y +1. La suma ponderada define el score total:

- Score > +0.4 → **Escenario ALCISTA** (probabilidad alta)
- Score entre -0.4 y +0.4 → **Escenario NEUTRAL** (incertidumbre) — NO se muestra en UI
- Score < -0.4 → **Escenario BAJISTA** (probabilidad alta)

Los 3 escenarios siempre se calculan con sus probabilidades relativas (ej: Alcista 65% / Bajista 25% / Alta Conf 10%). El de mayor % es el **Principal**, resaltado y con justificación completa.

### UI del Tab Señales IA

- 3 botones visibles arriba: **ALCISTAS / BAJISTAS / ALTA CONF** (NEUTRAS eliminadas)
- Click en categoría → lista de señales de esa categoría
- Click en señal → detalle con 3 niveles de probabilidad + Principal resaltado + 4-5 motivos objetivos

### Los 4-5 Motivos de Justificación (ejemplo ALCISTA en BTC)
- "RSI en zona de sobreventa — presión compradora acumulada"
- "Precio subió +4.2% en las últimas 24hs con volumen superior al promedio"
- "Oro cayendo -1.2% — rotación hacia activos de riesgo"
- "Sin eventos macro programados esta semana — contexto favorable"
- "Volumen 2.3x mayor al promedio histórico del activo"

---

### Declaración para Inversores y Clientes

*"AUREX utiliza un motor de análisis multivariable propietario que integra: (1) análisis técnico — RSI, momentum, volumen relativo y volatilidad de precio; (2) análisis macroeconómico — tasas de la Fed, inflación (IPC/IPP), PBI y empleo vía datos oficiales en tiempo real; (3) análisis de mercados relacionados — metales preciosos, commodities energéticos y correlaciones entre activos; (4) análisis fundamental — calendario de balances y resultados corporativos; y (5) análisis de contexto global — eventos geopolíticos relevantes, cambios de gobierno y noticias de impacto procesadas mediante lenguaje natural. El sistema genera tres escenarios probabilísticos por activo — Alcista, Bajista y Alta Confianza — con el escenario principal justificado por 4 a 5 factores objetivos de análisis. Las señales son orientativas y no constituyen asesoramiento financiero."*

