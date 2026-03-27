# CONTEXTO DEL PROYECTO AUREX
> Documento maestro para retomar trabajo con Claude inmediatamente.
> > Última actualización: 27 de Marzo de 2026
> >
> > ---
> >
> > ## 🚀 INICIO RÁPIDO — CÓMO RETOMAR CON CLAUDE
> >
> > **Copiá y pegá esto exacto al abrir una nueva conversación:**
> >
> > ```
> > Hola! Continuamos trabajando en Aurex.
> > Repo: https://github.com/fmoscon-creator/aurex-app
> > App en vivo: https://fmoscon-creator.github.io/aurex-app
> > Lee el archivo CONTEXTO.md del repo para ponerte al día.
> > Hoy es [FECHA]. La tarea de hoy es: [UNA SOLA TAREA ESPECÍFICA].
> > ```
> >
> > ---
> >
> > ## 📊 ESTADO ACTUAL DEL PROYECTO (27/03/2026)
> >
> > ### ✅ FASE 1 — COMPLETADA
> > - App PWA en producción en GitHub Pages
> > - - 6 tabs funcionales: Mercados, Portfolio, Watchlist, Señales IA, Alertas, Perfil
> >   - - Datos cripto en tiempo real via Binance WebSocket
> >     - - Señales IA con ALCISTA/BAJISTA/NEUTRAL, precio objetivo, stop loss
> >       - - 45+ acciones USA estáticas
> >         - - Planes Free/PRO/ELITE en UI
> >           - - Modo oscuro, iOS/Safari optimizado
> >             - - PWA (manifest.json + service-worker.js)
> >              
> >               - ### 🔄 FASE 2 — EN CURSO (Abril 2026)
> >               - - Backend Node.js en Railway (estructura creada, lógica pendiente)
> >                 - - Supabase para autenticación y base de datos
> >                   - - Stripe para pagos reales
> >                     - - WhatsApp alertas via Twilio
> >                       - - Plausible Analytics
> >                        
> >                         - ### ⚠️ BUGS CRÍTICOS PENDIENTES
> >                         - - Encoding UTF-8 roto (emojis aparecen como caracteres extraños)
> >                           - - Conversor de monedas muestra "Cargando..." sin resolver
> >                             - - Backend server.js tiene solo los requires, sin lógica real
> >                               - - Todo el auth/portfolio/alertas es frontend simulado (sin DB real)
> >                                
> >                                 - ---
> >
> > ## 🗂️ DATOS TÉCNICOS
> >
> > | Componente | Tecnología |
> > |---|---|
> > | Frontend | HTML + CSS + JS Vanilla (monolito en index.html ~1800 líneas) |
> > | Hosting | GitHub Pages (deploy automático via GitHub Actions) |
> > | Datos cripto | Binance WebSocket (tiempo real, gratis) |
> > | Datos acciones | Estáticos — Fase 2: Polygon.io |
> > | IA señales | Claude API (Anthropic) |
> > | Backend | Node.js en Railway (en construcción) |
> > | DB | Supabase (planificado) |
> > | Auth | Google OAuth + Firebase (planificado) |
> > | Pagos | Stripe (planificado) |
> > | Alertas WA | Twilio (planificado) |
> >
> > **Archivos clave:**
> > - `index.html` — toda la app (6 tabs, estilos, lógica)
> > - - `backend/server.js` — servidor Node.js (solo requires por ahora)
> >   - - `manifest.json` — PWA config
> >     - - `service-worker.js` — push notifications (base)
> >      
> >       - **Commit estable de referencia:** `358f83b` — si algo se rompe, volver a este commit.
> >      
> >       - ---
> >
> > ## 📅 PLAN SEMANA X SEMANA — 12 SEMANAS (27/03 al 19/06/2026)
> >
> > ### SEMANA 1 (27 Mar – 2 Abr) — BUGS + BASE DE DATOS
> > | Día | Tarea |
> > |---|---|
> > | Vie 27/03 | Fix encoding UTF-8 en toda la app |
> > | Sáb 28/03 | Fix Conversor de monedas (conectar a Binance WS) |
> > | Dom 29/03 | Auditoría: mapear qué es real vs mock en las 6 tabs |
> > | Lun 30/03 | Setup Supabase + Google OAuth (login real) |
> > | Mar 31/03 | Portfolio persistente en Supabase |
> > | Mié 01/04 | Watchlist + Alertas persistentes en Supabase |
> > | Jue 02/04 | Testing completo S1 + fix bugs + update CONTEXTO.md |
> >
> > ### SEMANA 2 (3 – 9 Abr) — BACKEND REAL EN RAILWAY
> > | Día | Tarea |
> > |---|---|
> > | Vie 03/04 | server.js completo: Express + Supabase, rutas API, deploy Railway |
> > | Sáb 04/04 | Twilio WhatsApp: alertas reales cuando precio toca objetivo |
> > | Dom 05/04 | Conectar frontend con backend (JWT auth) |
> > | Lun 06/04 | Push notifications reales (Firebase + service worker) |
> > | Mar 07/04 | Señales IA: conectar Claude API real (reemplazar datos hardcoded) |
> > | Mié 08/04 | Plausible Analytics instalado |
> > | Jue 09/04 | Test end-to-end: login → portfolio → alerta → WhatsApp recibido |
> >
> > ### SEMANA 3 (10 – 16 Abr) — STRIPE + PRIMEROS PAGOS
> > | Día | Tarea |
> > |---|---|
> > | Vie 10/04 | Stripe setup: productos PRO y ELITE, checkout session |
> > | Sáb 11/04 | UI upgrade: botones "Activar PRO/ELITE" con Stripe real |
> > | Dom 12/04 | Restricciones por plan en frontend y backend |
> > | Lun 13/04 | Exportación real: PDF (jsPDF) y Excel (SheetJS) |
> > | Mar 14/04 | Envío por email del portfolio (SendGrid/Resend) |
> > | Mié 15/04 | 2FA real via SMS (Twilio) |
> > | Jue 16/04 | Test completo: registrate → portfolio → upgrade → pagá → PRO activo |
> >
> > ### SEMANA 4 (17 – 23 Abr) — ACCIONES RT + 50 USUARIOS
> > | Día | Tarea |
> > |---|---|
> > | Vie 17/04 | Polygon.io: acciones USA en tiempo real |
> > | Sáb 18/04 | Acciones LatAm (BYMA, B3, BMV) con datos de cierre |
> > | Dom 19/04 | Optimización performance iOS Safari |
> > | Lun 20/04 | Sistema de referidos funcional (links únicos + tracking) |
> > | Mar 21/04 | Onboarding mejorado (copy, imágenes, conversión) |
> > | Mié 22/04 | Compartir señales en redes (Twitter, WhatsApp, Instagram) |
> > | Jue 23/04 | LANZAMIENTO: primeros 50 usuarios via WhatsApp/LinkedIn |
> >
> > ### SEMANA 5 (24 – 30 Abr) — FEEDBACK Y MEJORAS UX
> > | Día | Tarea |
> > |---|---|
> > | Vie 24/04 | Widget de feedback in-app (Tally.so) |
> > | Sáb 25/04 | Hotjar instalado (grabaciones de sesión) |
> > | Dom 26/04 | Análisis Plausible + Hotjar → definir top 5 mejoras |
> > | Lun 27/04 | Mejora UX #1 y #2 (según feedback real) |
> > | Mar 28/04 | Mejora UX #3 y #4 |
> > | Mié 29/04 | Mejora UX #5 + fixes menores |
> > | Jue 30/04 | Deploy + testing en iPhone, Android, desktop |
> >
> > ### SEMANA 6 (1 – 7 May) — REDES SOCIALES Y CONTENIDO
> > - 2.5 hs/día de código (mantenimiento y mejoras)
> > - - 2.5 hs/día de contenido (videos TikTok + Instagram Stories mostrando la app)
> >   - - Meta: 3 videos/semana de señales IA, alertas, portfolio en acción
> >    
> >     - ### SEMANA 7 (8 – 14 May) — TELEGRAM BOT
> >     - | Día | Tarea |
> >     - |---|---|
> >     - | Lun 08/05 | Crear @AurexBot (BotFather + webhook en backend) |
> >     - | Mar 09/05 | Comandos: /precio BTC, /señales, /alerta BTC 90000 |
> >     - | Mié 10/05 | Vincular cuenta Aurex con Telegram |
> >     - | Jue 11/05 | /portfolio muestra holdings del usuario |
> >     - | Vie 12/05 | Alertas via Telegram además de WhatsApp |
> >     - | Sáb-Dom | Testing y ajustes |
> >    
> >     - ### SEMANA 8 (15 – 21 May) — STRIPE PRODUCCIÓN + 10 USUARIOS PRO
> >     - - Pasar Stripe de test a producción real
> >       - - Facturación automática + cancelaciones
> > - Campaña directa a contactos calificados
> > - - Meta: 10 usuarios PRO = $99.90/mes MRR
> >  
> >   - ### SEMANA 9 (22 – 28 May) — APP STORE PREP
> >   - - Registrar Apple Developer Account ($99/año)
> >     - - Capacitor.js: convertir PWA en app nativa iOS
> >       - - Screenshots para App Store (iPhone 6.5")
> >         - - Descripción, keywords, categoría
> >           - - TestFlight con primeros 10 testers
> >            
> >             - ### SEMANA 10 (29 May – 4 Jun) — SUBMISSION
> >             - - Submit a Apple App Store Review (1-7 días revisión)
> >               - - Preparar Google Play Store (TWA o PWA directa)
> >                 - - Materiales de prensa para lanzamiento público
> >                  
> >                   - ### SEMANA 11 (5 – 11 Jun) — LANZAMIENTO OFICIAL + B2B
> >                   - - App en App Store (si tiempos se cumplen)
> >                     - - Post en LinkedIn, Twitter, ProductHunt
> >                       - - Primeras reuniones B2B con asesores financieros ($199/mes)
> >                         - - Meta: 50+ usuarios registrados, 20+ PRO
> >                          
> >                           - ### SEMANA 12 (12 – 19 Jun) — CIERRE Y FASE 4
> >                           - - Revisión final: las 6 tabs 100% funcionales y reales
> >                             - - Métricas: usuarios, MRR, conversión Free→PRO
> >                               - - Documentación completa
> >                                 - - Handoff a AppStack (Lucas Moscón) para Meta/TikTok Ads
> >                                   - - Retrospectiva y planning Fase 4
> >                                    
> >                                     - ---
> >
> > ## ⏱️ CÓMO ORGANIZAR CADA SESIÓN DE 5 HORAS
> >
> > **Estructura diaria obligatoria:**
> >
> > | Tiempo | Actividad |
> > |---|---|
> > | Minuto 0-10 | Abrir Claude nuevo chat. Pegar el mensaje de inicio con la tarea del día. |
> > | Hora 1-2 | Claude genera código completo del módulo. Pedir archivos completos, no parches. |
> > | Hora 3 | Implementar en GitHub (editor web o terminal). |
> > | Hora 4 | Testear en producción desde el iPhone. Anotar exactamente qué falla. |
> > | Hora 5 | Claude corrige. Commitear. Verificar. Actualizar este CONTEXTO.md. |
> >
> > **Reglas de sesión:**
> > - UNA sola tarea por sesión. Sin mezclar módulos.
> > - - Pedir siempre el archivo COMPLETO, no fragmentos.
> >   - - Errores de sintaxis y lint: resolverlos con el IDE, no gastar cuota en eso.
> >     - - Último paso del día: actualizar la fecha y estado en este archivo.
> >      
> >       - ---
> >
> > ## 💼 NEGOCIO Y HITOS
> >
> > | Hito | Estado | Fecha est. |
> > |---|---|---|
> > | App en producción | ✅ HECHO | 25 Mar 2026 |
> > | Fix bugs críticos | 🔄 EN CURSO | 28 Mar 2026 |
> > | Backend + Auth real | 📋 PRÓXIMO | 3-9 Abr 2026 |
> > | Primer usuario pago | 📋 PLANIFICADO | Abr-May 2026 |
> > | 10 usuarios PRO ($100 MRR) | 📋 PLANIFICADO | May 2026 |
> > | App en App Store | 📋 PLANIFICADO | Jun-Jul 2026 |
> > | 100 usuarios PRO ($1k MRR) | 📋 PLANIFICADO | Ago-Sep 2026 |
> > | Break even (~600 PRO, $6k/mes) | 📋 PLANIFICADO | Dic 2026 |
> > | Primer contrato B2B | 📋 PLANIFICADO | Q1 2027 |
> >
> > **Planes:**
> > - FREE: 5 activos, 3 señales IA/día, sin alertas push, con publicidad
> > - - PRO: $9.99/mes ($7.79 anual) — 50 activos, 10 señales, alertas push
> >   - - ELITE: $19.99/mes ($15.59 anual) — todo ilimitado, 8 idiomas, soporte VIP
> >    
> >     - **Competidores:** Bloomberg ($35/mes), TradingView ($15/mes), Yahoo Finance
> >     - **Diferencial:** IA en español + LATAM + alertas activas + precio 2-5x menor
> >    
> >     - ---
> >
> > ## 🔗 LINKS IMPORTANTES
> >
> > - **App en vivo:** https://fmoscon-creator.github.io/aurex-app
> > - - **Repo GitHub:** https://github.com/fmoscon-creator/aurex-app
> >   - - **Fundador:** Fernando G. Moscón — fmoscon@gmail.com
> >     - - **Commit estable:** 358f83b
> >       - - **Integración Fase 4:** AppStack (Lucas Moscón) — appstack.tech
> >        
> >         - ---
> >
> > ## 📁 CÓMO PASAR ARCHIVOS A CLAUDE
> >
> > **Opción 1 (recomendada):** Subir PDFs o imágenes a la carpeta `/designs` del repo. Claude los lee directamente desde GitHub.
> >
> > **Opción 2:** Google Drive con link público → pasarle el link a Claude en el chat.
> >
> > **Opción 3:** Este CONTEXTO.md siempre actualizado es mejor que cualquier PDF porque Claude lo lee en cada sesión.
> >
> > ---
> >
> > *Última actualización: 27 de Marzo de 2026 — Generado con Claude Sonnet 4.6*
