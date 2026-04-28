# CONTEXTO DEL PROYECTO AUREX
Última actualización: 28 de Abril de 2026

## INICIO RAPIDO
Pega esto al abrir nueva conversacion con Claude:

Hola, continuamos con Aurex.
Repo: https://github.com/fmoscon-creator/aurex-app
App: https://fmoscon-creator.github.io/aurex-app  (alias: aurex.live)
Lee CONTEXTO.md y PLAN-ACCION.md del repo.
Token GitHub: [TOKEN]
Tarea de hoy: [FECHA] - [TAREA]

---

## ESTADO ACTUAL — 28 ABRIL 2026

### HEAD ACTUAL (PWA aurex-app, branch main)
Commit: 57f1971
Fecha: 2026-04-28
Descripcion: docs: agregar CLAUDE.md raíz — manifest del proyecto para chats de Claude

### REPOS RELACIONADOS (3 repos del proyecto)
- aurex-app (PWA)         main: 57f1971  (este repo, hosting GitHub Pages)
- AurexApp (Nativa)       dev:  2a12b69  (React Native — Build 17 enviado a Apple, NO TOCAR main hasta aprobación)
- aurex-backend           main: 5f57dde  (Railway)

### APPLE — Build 17 iOS
- **Nombre publicado en App Store: AUREX AI** (no "AUREX" — estaba ocupado, "AUREX AI" cumple Guideline 2.3.7)
- **Nombre del ícono en iPhone (CFBundleDisplayName): AUREX** (diferencia legítima permitida por Apple)
- Estado: Pendiente de revisión
- Build: 17 (Marketing Version 1.0, CURRENT_PROJECT_VERSION 17)
- Submit: 24 Abril 2026, 5:24 AM AR
- ID envío: e0e7fb35-11a4-4c1d-854c-60a80c4799e6
- Apple Account: fmoscon@gmail.com
- Team ID: TX7C2F79U9
- Apple App ID (interno ASC): 6761672161
- Bundle ID: com.fernandomoscon.aurex
- Contacto registrado en App Store Connect: +54 11 6789-1320 / fmoscon@gmail.com
- Idioma principal listing: Inglés (EE.UU.)
- Subtítulo: "Real-time market data tracker" (intencional — alinea con Utilidades, sin lenguaje financiero)
- Categoría primaria: Utilidades (cambiada desde Finanzas tras rechazos previos)
- Categoría secundaria: Productividad
- Idiomas localización (8): EN, ES, FR, IT, HI, AR, PT, ZH
- Metadata: segura, sin lenguaje financiero
- Disclaimers: corregidos en código de Build 17
- Webhook ASC → RevenueCat (Apple Server Notifications V2, idéntico para producción y sandbox):
  https://api.revenuecat.com/v1/incoming-webhooks/apple-server-to-server-notification/WICtYZubpcHyBpPfLnZMoagjatQAyjPD
- Builds en TestFlight legacy: 9, 10, 11, 12, 13 (Build 9 retirado por el desarrollador)
- Provisioning Distribution: ~/Downloads/AUREX_App_Store_Distribution.mobileprovision (5-abr)
- Casos Apple previos: cerrados automáticamente al enviar Build 17 (los anteriores eran sobre builds reemplazados)

### GOOGLE PLAY — Android Build 2
- **Nombre publicado en Play Store: AUREX**
- Estado: Prueba cerrada activa
- Build: 2 (versionName "1.0.1", versionCode 2)
- Bundle: com.aurexapp
- Categoría: Herramientas (cambiada desde Finanzas)
- Prueba cerrada: 14 días requeridos, llevamos 4 (al 28-abr), con 12+ testers activos
- Link prueba: https://play.google.com/apps/testing/com.aurexapp

---

## PENDIENTES INMEDIATOS

1. Esperar respuesta Apple Build 17 (submit 24-abr 5:24 AM AR)
2. Esperar Google Play: completar 14 días de prueba cerrada (4 días corridos al 28-abr)
3. Onboarding: corregir faltas de ortografía detectadas en emulador
4. Corregir 2 líneas v1.0.0 hardcodeado en nativa (PerfilScreen.js L789 y L851)
   con Platform.OS — sólo cuando Apple/Google aprueben

---

## PEDIDOS A ESCRITORIO (revisión externa, sin acceso al código)

1. **Verificar webhook RevenueCat en su dashboard** — entrar a RevenueCat → sección "Webhooks" → revisar el log de eventos recibidos en vivo. Especialmente útil mientras Apple está revisando Build 17: si el reviewer hace una compra de prueba con cuenta sandbox, ese evento debería aparecer en el log. Si NO aparece, sería señal de que el webhook está mal conectado y la app no activaría plan PRO/ELITE post-compra (riesgo de rechazo Apple por "Bug: in-app purchase not unlocking content"). URL configurada en App Store Connect (idéntica para producción y sandbox): `https://api.revenuecat.com/v1/incoming-webhooks/apple-server-to-server-notification/WICtYZubpcHyBpPfLnZMoagjatQAyjPD`

---

## PENDIENTES ESTRUCTURALES (post-Apple)

1. Railway + Binance — CRÍTICO (Binance bloqueado)
2. WhatsApp Alertas — verificar Evolution + env vars
3. Evolution API — verificar hosting actual
4. **Configurar volumen persistente en Railway para evo-v1 (Evolution API)** — CRÍTICO. Las sesiones de WhatsApp se borran con cada redeploy del container porque no hay volumen persistente. Esto causó la suspensión del número AUREX el 28-abr-2026 cuando la repetida creación/borrado de instancias disparó el sistema antifraude de WhatsApp Business. Solución: configurar Railway Volume montado en `/evolution_api/instances/` o equivalente, o migrar a PostgreSQL como storage de Evolution API.

---

## v1.1 (post-aprobación Apple/Google)

1. Store centralizado de precios — PRIORITARIO
2. Editar activo Portfolio
3. Selector monedas Valor Total
4. PT/ZH activar (ya funcionan)
5. Banner eventos dinámico
6. Onboarding modo claro
7. Foto perfil persistente

---

## v2.0 (futuro)

1. API eventos real
2. Alertas WhatsApp automáticas
3. Notificaciones push
4. Análisis técnico avanzado
5. Social / comunidad
6. API personal ELITE

---

## PLAN MARKETING (paralelo a aprobación Apple/Google)

PDF completo: `~/Downloads/AUREX PLAN MKT.pdf` (extraer texto con `pdftotext` para detalle)

### Resumen tareas iniciales
- Abrir cuenta Buffer (gratis: 3 canales + 10 posts en cola)
- Conectar X / LinkedIn / Instagram / Facebook a Buffer
- Generar 30 posts/mes con Claude Chat (1 prompt → tabla con fecha, plataforma, copy ES+EN, hashtags)
- Crear calendario editorial mensual

### Calendario semanal de contenido
- Behind the scenes AUREX → Instagram Stories 2x/semana (manual)
- Video corto análisis 60 seg → TikTok + Reels 2x/semana (vos grabás, Chat hace script)
- Thread "cómo leer AUREX PULSE™" → X (Twitter) 1x/semana (Chat + Buffer auto)
- Resumen mercado diario → Telegram (manual o bot)
- Artículo corto mercado → LinkedIn 1x/semana (Chat, manual)

### Estado
- Plan armado en PDF
- Pendiente: leer páginas 2+ del PDF (poppler ya instalado, comando: `pdftotext "~/Downloads/AUREX PLAN MKT.pdf" -`)
- Pendiente: revisar/pulir/mejorar plan con Code y Escritorio antes de ejecutar

---

## ARCHIVOS DE DOCUMENTACION
- AUREX-PORTFOLIO-DOC.md: documentacion tecnica completa del tab Portfolio
- AUREX-MERCADOS-DOC.md: documentacion tecnica completa del tab Mercados
- AUREX-IA-DOC.md: documentacion tecnica del tab IA
- AI_SIGNALS_DESIGN.md: diseño de señales IA
- BUGFIX_HISTORIAL.md: historial de bugs y soluciones
- REGLAS-DE-ORO-AUREX.md: reglas tecnicas para Claude
- PLAN-ACCION.md: cronograma del proyecto
- METADATA-APPSTORE.md: metadata App Store
- docs/CONTEXTO_CHAT.md: contexto inicial chat
- docs/PENDING_REVIEW.md: review pendiente
- docs/PLAN-OPERATIVO.md: plan operativo extendido
- docs/PERFIL_TAB_DOCUMENTACION.md: documentación del tab Perfil

---

## ESTADO DE CADA FEATURE

REAL (funcionando):
- App en produccion GitHub Pages (aurex.live)
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
- 17 fallbacks de resilencia PWA (crypto/stocks/IA/portfolio/watchlist)

MOCK (pendiente):
- Alertas WhatsApp: simuladas -> proxima prioridad (depende de Evolution API)
- Senales IA: hardcodeadas -> conectar a Claude API
- Acciones USA: precios via Yahoo proxy (funciona) / Polygon.io pendiente
- Push notifications: boton funcional, logica pendiente

---

## DATOS TECNICOS

PWA (aurex-app):
- Frontend: HTML+CSS+JS Vanilla monolito (~3000 líneas index.html + ~3900 líneas aurex-features.js)
- Hosting: GitHub Pages auto-deploy desde main → aurex.live
- Sin pipeline de build, sin package.json, sin service worker activo

Nativa (AurexApp):
- React Native 0.84 puro (NO usa WebView, NO carga la PWA)
- iOS: MARKETING_VERSION=1.0, CURRENT_PROJECT_VERSION=17
- Android: versionName="1.0.1", versionCode=2
- RevenueCat para in-app purchases (iOS + Android)

Backend (aurex-backend):
- Railway (https://aurex-app-production.up.railway.app)
- Lo consumen tanto la PWA como la Nativa

Datos:
- Crypto: Binance REST API (sin key, publica)
- Acciones/ETFs: Yahoo Finance via corsproxy.io
- Fiat: open.er-api.com (gratis, sin key)
- IA: modelo interno _calcIAScore + _iaSeed (datos hardcodeados)
- DB: Supabase (URL: dklljnfhlzmfsfmxrpie.supabase.co)
- Auth: Google OAuth via Supabase

Pagos:
- PWA: Lemon Squeezy (PRO $9.99/mes, ELITE $19.99/mes)
- iOS: Apple In-App Purchase (StoreKit) via RevenueCat
- Android: Google Play Billing via RevenueCat

---

## LINKS
- App: https://fmoscon-creator.github.io/aurex-app  (alias aurex.live)
- Repo PWA: https://github.com/fmoscon-creator/aurex-app
- Repo Nativa: https://github.com/fmoscon-creator/AurexApp
- Repo Backend: https://github.com/fmoscon-creator/aurex-backend
- Lemon Squeezy store: aurexapp.lemonsqueezy.com
- Portfolio Doc: https://github.com/fmoscon-creator/aurex-app/blob/main/AUREX-PORTFOLIO-DOC.md
- Mercados Doc: https://github.com/fmoscon-creator/aurex-app/blob/main/AUREX-MERCADOS-DOC.md
- IA Doc: https://github.com/fmoscon-creator/aurex-app/blob/main/AUREX-IA-DOC.md
- Plan accion: https://github.com/fmoscon-creator/aurex-app/blob/main/PLAN-ACCION.md
- Fundador: Fernando G. Moscon fmoscon@gmail.com

---

## PLANES
- FREE: 5 activos, 3 senales/dia, sin alertas, con ads
- PRO: $9.99/mes, 50 activos, 10 senales, alertas push
- ELITE: $19.99/mes, ilimitado, 8 idiomas, soporte VIP

---

## NOTA PARA CLAUDE
- El token GitHub se pasa en el chat al inicio de cada sesion
- SIEMPRE responder en espanol
- SIEMPRE leer blobs desde Git API, nunca desde Pages
- SIEMPRE verificar OLD aparece exactamente 1 vez antes de reemplazar
- SIEMPRE usar split().join() en lugar de replace()
- Todo HTML/JS nuevo 100% ASCII (tildes como entidades, emojis como entidades, ej: &#127775;)
- btoa(unescape(encodeURIComponent(content))) para base64
- Screenshot obligatorio antes de reportar OK
- Guardar SHA de reversion antes de cada cambio
- Mientras hay builds en revisión por Apple/Google: NO tocar la app nativa
  sin autorización expresa y análisis previo de impacto a las stores
- Sin jerga técnica innecesaria al comunicar con Fernando
- Análisis integral propio antes de pedir datos al usuario (3 repos en disco)
