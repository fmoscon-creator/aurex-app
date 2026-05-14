# PLAN DE LANZAMIENTO AUREX — FASE 1 (versión 2.0)

*Fecha: 13 de mayo de 2026, 20:30 AR*
*Generado por: Code (Claude Code) aplicando las skills marketing-skills + frontend-design + ui-ux-pro-max + design-taste-frontend + shadcnblocks (referencia) + full-output-enforcement*
*Base de contexto: MARKETING_CONTEXT_AUREX_v2.md (misma carpeta)*
*Período: 14-may-2026 → 13-jun-2026 (30 días primera fase)*

---

## Cambios sobre la versión 1.0

La v1 tenía 4 errores que Fernando marcó. Esta v2 los corrige:

1. **Antes**: asumía que sin Apple aprobando no había producto vendible.
   **Ahora**: Android está publicado en producción desde el 6 de mayo. Es el botón principal de toda la comunicación. iOS queda como "próximamente".

2. **Antes**: ponía X solo en inglés porque el mundo FinTwit es en inglés.
   **Ahora**: TODAS las redes publican en inglés y en español neutro en paralelo. El inglés capta el mercado global, el español captura LATAM que es nuestra ventaja inicial.

3. **Antes**: mencionaba la web al pasar como un canal secundario.
   **Ahora**: la web es una pieza central que hay que CONSTRUIR (la landing de bienvenida no existe todavía) y aparece junto al botón Android en toda la comunicación una vez actualizada la PWA.

4. **Antes**: ignoraba el estado real de la PWA aurex.live (faltan 3 funciones vs Android).
   **Ahora**: la PWA se actualiza con notificaciones, integración Telegram real y pantalla "Cómo usar AUREX" en paralelo a la construcción de la landing. Durante esos primeros días, el botón Android es el dominante y la PWA aparece sutilmente como "también disponible en web, mejorando esta semana".

---

## 1. Estado real al 13 de mayo (sin inventos)

| Canal | Estado | Listo para promocionar |
|---|---|---|
| **Android** (Google Play, versión 1.0.17) | ✅ Publicado en producción desde 6-may. 10 instalaciones primeras 34 hs, 47,6% retención día 1. | SÍ, ya |
| **iOS** (App Store, build 17) | ⏳ Día 19 en cola de Apple. Sin novedades reales. | NO, esperar aprobación |
| **PWA aurex.live** | ⚠️ Operativa pero le faltan 3 funciones críticas vs Android: notificaciones push, integración Telegram real, pantalla "Cómo usar AUREX". Tiempo para llevarla a paridad: 3 a 4 horas Code. | NO ahora, sí en 1 a 2 días |
| **Landing de bienvenida** (página de marketing) | ❌ NO existe. Hay que construirla de cero. | NO ahora, sí en 2 a 3 días |
| **Email transaccional** | ❌ Sin configurar. Solo email de soporte. | NO, configurar después de landing |
| **Telegram canal @aurex_ai** | ✅ Abierto 12-may. 0 publicaciones. | SÍ |
| **Instagram @aurex_live** | ✅ Cuenta Business, foto + bio. 0 publicaciones. | SÍ |
| **LinkedIn Company Page aurex-fintech** | ✅ Completa. 0 publicaciones. | SÍ |
| **YouTube @aurex-fintech** | ✅ Configurada. 0 videos. | SÍ |
| **TikTok @aurex_live** | ⚠️ Cuenta abierta + verificación Business enviada el 13-may, espera 3 a 5 días. | SÍ con cuenta personal, escalado limitado hasta verificación |
| **X / Twitter @aurex_live** | ✅ Desbloqueada 13-may PM, Cuenta Profesional Empresa. 0 publicaciones. **Warm-up obligatorio**: máximo 2 a 3 posts por día primeros 7 días, sin links externos. | SÍ con warm-up |

**Resumen**: ya tenemos producto (Android live + PWA con gap menor), tenemos canales abiertos, **cero contenido publicado**, cero usuarios desde marketing. Hay que arrancar a generar tráfico mientras se completan PWA y landing en paralelo.

---

## 2. Objetivo de los primeros 30 días

Tres metas concretas, todas medibles.

| Meta | Número objetivo | Cómo se mide |
|---|---|---|
| Descargas de la app Android | **500 instalaciones nuevas en 30 días** | Google Play Console > Estadísticas > Instalaciones |
| Personas siguiendo a AUREX en redes | **1.000 followers sumando las 6 redes** | Total de los 6 contadores |
| Probadores de la PWA aurex.live | **200 sesiones únicas/semana en la web** | Tracking GA4 cuando esté instalado (semana 2) |

El objetivo de iOS depende de Apple, no lo prometemos.

---

## 3. Estrategia de mensaje principal

### Mensaje cabecera

**En inglés**:
"AUREX is live on Google Play. Try it free on Android — or run it from the web. iOS coming soon."

**En español neutro**:
"AUREX ya está disponible en Google Play. Probalo gratis en Android o desde la web. iOS próximamente."

Este es el mensaje que se repite en bios de todas las redes, en pinned posts, en email signature, en todo. La consistencia genera reconocimiento.

### Botones de descarga (Llamadas a la acción)

Cada publicación, cuando aplique, tiene:

- **Botón principal**: "Get it on Google Play" / "Descargá en Google Play" → link a la ficha
- **Botón secundario**: "Try on web" / "Probá en la web" → link a aurex.live (solo después que se actualice la PWA, durante la semana 1 todavía no)
- **Texto chico**: "iOS coming soon" / "iOS próximamente" → sin link

### Disclaimer regulatorio

Cada publicación donde se hable de mercados, activos, señales, datos o decisiones debe incluir alguna versión de:

- "Not a broker. Not advice." (en inglés)
- "No es asesoramiento. No somos broker." (en español)

Esto NO es opcional — es regla absoluta del posicionamiento AUREX.

---

## 4. Prioridad de canales (cuál vale más esta primera fase)

| Tier | Canales | Justificación |
|---|---|---|
| 🥇 P0 (foco principal) | Telegram + X / Twitter + LinkedIn + Landing de bienvenida | Telegram porque la audiencia cripto/fintech retail vive ahí. X porque FinTwit construye reputación. LinkedIn por credibilidad ante asesores y futuros inversores. La landing porque es el destino de todos los demás canales — sin ella, no hay donde aterrizar al lector. |
| 🥈 P1 (presencia activa moderada) | Instagram + YouTube | Instagram para visual + Stories diarias con el AUREX Pulse del día. YouTube para SEO de largo plazo (un video puede generar tráfico durante 12+ meses). |
| 🥉 P2 (mantener vivo, prep Fase 2) | TikTok + Email | TikTok espera aprobación de verificación Business + se mueve a P1 cuando llegue. Email arranca recién en semana 2 cuando esté la landing con formulario de captura. |

---

## 5. La landing de bienvenida — qué es y cómo se construye

### Qué es

Una página web nueva, separada de la PWA (que es producto), pensada solo para que alguien que NO conoce AUREX entre, lea 1 a 2 minutos, y decida descargar la app o probarla en web. Es la herramienta de captación, no el producto.

**Idea de fondo**: si alguien hace clic en un anuncio, en un post de X, o ve el link en una bio de Instagram, NO queremos mandarlo directo a la PWA (donde hay 350 activos y no entiende nada). Lo mandamos a una página que primero explique qué es AUREX, le muestre 3 capturas, le muestre el precio, y le dé los 2 botones de descarga. ESA es la landing.

### Decisión técnica (cerrada Code + Escritorio el 13-may)

- **Lenguaje**: HTML + CSS + JavaScript planos (mismo stack que la PWA actual). No React, no Vue, no frameworks pesados.
- **Idiomas**: 8 idiomas (EN, ES, PT, ZH, FR, IT, HI, AR) reutilizando el sistema `aurex-i18n.js` que ya está armado en la PWA.
- **Ubicación**: dentro del mismo repo de la PWA (`aurex-app`), en una subcarpeta `marketing/` o ruta nueva `inicio/`. Se publica en `https://aurex.live/inicio` o similar.
- **Deploy**: GitHub Pages automático, igual que la PWA. Cada commit a `main` actualiza el sitio en menos de 2 minutos.
- **Costo**: cero.

### Estructura de la landing (10 bloques, de arriba a abajo)

Orden definido cruzando la skill `page-cro` (optimización de conversión) + `frontend-design` + `ui-ux-pro-max` + referencia visual de `shadcnblocks` (adaptados a HTML vanilla).

| # | Bloque | Qué muestra | Por qué |
|---|---|---|---|
| 1 | Encabezado fijo (header) | Logo AUREX dorado + menú: Inicio · Funciones · Planes · FAQ · Bajar app · Selector idioma | Navegación clara, identidad visible siempre |
| 2 | Hero principal | Título 6-8 palabras + subtítulo 12-15 palabras + 2 botones (Google Play grande + Probar en web secundario) + captura de la app en mockup de teléfono | Primer impacto, mensaje cabecera, conversión inmediata |
| 3 | Video demo o galería visual de la app | Reutiliza los videos del mosaico de lanzamiento que ya tenemos (`mosaico_lanzamiento_1080x1080.mp4`) o una galería con 4 a 6 capturas reales | Mostrar el producto en acción, no solo describirlo |
| 4 | Bloque de propuesta de valor (3 a 6 bullets) | "350+ activos seguidos en tiempo real" + "24 variables cruzadas por activo" + "8 idiomas" + "iOS, Android, Web" + "Disclaimer regulatorio claro" | Aterrizar diferenciadores duros, no genericidades |
| 5 | "Cómo funciona AUREX en 3 pasos" | Paso 1 Descargá la app / Paso 2 Configurá tu portafolio / Paso 3 Recibí alertas y datos cruzados | Bajar la fricción percibida del producto |
| 6 | Features destacadas (con icono + descripción) | AUREX Pulse / AI Engine / Portfolio / Watchlist / Alertas configurables / Eventos críticos | Profundidad de qué hace la app |
| 7 | Planes y precios | Tabla 3 columnas: FREE / PRO USD 9,99 mes / ELITE USD 19,99 mes con comparativa de features | Honestidad de pricing desde el primer momento |
| 8 | Preguntas frecuentes (FAQ) | 8 a 10 preguntas: "¿AUREX es un broker?" "¿Reemplaza a mi app de banco?" "¿Cómo se diferencia de Tradingview?" "¿Funciona offline?" "¿Cómo doy de baja?" etc. | Anticipar objeciones, dar respuestas sin que el usuario tenga que escribir |
| 9 | Disclaimer regulatorio extendido | "AUREX is not a broker, does not execute trades, does not provide investment advice. Not a financial institution." en cada idioma | Protección legal + credibilidad |
| 10 | Pie de página (footer) | Links a redes, link a términos, link a privacidad, copyright, "Made with care in Argentina" | Cierre profesional |

### Quién construye qué

| Tarea | Quién | Tiempo |
|---|---|---|
| Investigación visual (qué bloques de Shadcnblocks tomar como referencia) | Code con skill `shadcnblocks` | 30 min |
| Sistema de diseño (paleta + fuentes + componentes base) | Code con `ui-ux-pro-max` + `frontend-design` + `minimalist-ui` | 30 min |
| Copy de los 10 bloques en inglés (idioma maestro) | Code con `copywriting` + `marketing-context` ya leído | 1 hora |
| Traducción a 7 idiomas restantes | Code reutilizando `aurex-i18n.js` + skill `content-humanizer` para no sonar a Google Translate | 30 min |
| HTML + CSS + JavaScript de la landing | Code con `frontend-design` + `design-taste-frontend` + `high-end-visual-design` + `full-output-enforcement` | 2 a 3 horas |
| Imágenes y referencias visuales | Code con `imagegen-frontend-web` + `brandkit` | 30 min |
| Validación visual antes de publicar | Code con `playwright` (browser headless) + Escritorio con Chrome | 30 min |
| Aprobación final | Fernando ve captura | 15 min |
| Publicación online | Code hace push a GitHub, GitHub Pages deploya automático | 5 min |

**Tiempo total construcción landing**: 6 a 8 horas Code, repartibles en 1 a 2 jornadas.

---

## 6. Actualización de la PWA aurex.live — qué hace falta

Estado actual de la PWA: 70% paridad con Android Build 17. Le faltan 3 funciones críticas.

| Función a agregar | Tiempo Code | Resultado |
|---|---|---|
| **Notificaciones push** (Firebase Web SDK + Service Worker + claves VAPID) | 1,5 horas | La PWA puede mandar alertas en tiempo real igual que el Android |
| **Integración Telegram real** (botón "Conectar Telegram" + flujo con `telegram_chat_id` + polling al bot `@Aurexalertas_bot`) | 1 hora | Usuario web puede configurar alertas Telegram sin tener que bajar la app móvil |
| **Pantalla "Cómo usar AUREX"** (las 6 pestañas del onboarding del Android, con las 41 keys de i18n ya existentes) | 1 hora | Usuario web tiene la misma guía de uso que Android |

**Tiempo total**: 3,5 horas Code, en 1 jornada.

### Cómo se valida

1. Code modifica el código local en `/Users/fernandomoscon/Desktop/aurex-app/`.
2. Code hace push a GitHub. GitHub Pages publica automático en 2 minutos.
3. Code con skill `playwright` abre `aurex.live` en navegador automatizado, hace click en cada función nueva, saca capturas, verifica que responde bien.
4. Escritorio con Chrome real valida visualmente en el navegador de Fernando.
5. Fernando aprueba con captura final.

### Comunicación de la actualización

Cuando la PWA quede al día (estimado: día 3 a 4 del plan), publicamos en redes:

**En inglés**: "AUREX on web just got better. Real-time alerts, Telegram integration, and onboarding — all working now from your browser at aurex.live. iOS coming soon."

**En español**: "AUREX en la web subió un escalón. Notificaciones en tiempo real, integración con Telegram y guía de uso completa — todo funcionando ahora desde tu navegador en aurex.live. iOS próximamente."

Es un hito comunicacional que da empuje a la semana 2.

---

## 7. Plan de redes — qué publica cada canal

Resumen rápido por red. Cada red tiene rol distinto. NO publicamos lo mismo en todas.

### Telegram @aurex_ai

- **Rol**: feed de alertas + briefings macro diarios. Es el canal cripto/fintech retail real.
- **Frecuencia**: 2 a 3 mensajes por día (mañana abierto Asia/Europa + mediodía abierto Nueva York + cierre Nueva York).
- **Formato dominante**: mensaje de texto corto + 1 imagen ocasional (chart, gauge del AUREX Pulse) + 1 link máximo (a aurex.live, Google Play, o post de X relacionado).
- **Idiomas**: arranca solo inglés (audiencia internacional). Si crece, separa en 2 canales (uno EN, uno ES).
- **Horarios AR (UTC-3)**: 09:00 · 13:00 · 20:00.
- **Cómo se publica**: bot oficial de Telegram (`@Aurexalertas_bot`), gratis, sin límite de mensajes. Cron en Railway dispara según horario.

### X / Twitter @aurex_live

- **Rol**: construir audiencia FinTwit (traders pro-am, periodistas, analistas, futuros usuarios PRO).
- **Frecuencia warm-up (días 1 al 7)**: 2 a 3 publicaciones por día sin links externos.
- **Frecuencia normal (días 8 al 30)**: 4 a 6 publicaciones por día con links progresivos.
- **Formato dominante**: tweets sueltos + hilos de 4 a 6 tweets para análisis cruzado FED + GDELT + datos técnicos.
- **Idiomas**: inglés primario (FinTwit es 90% inglés) + español neutro paralelo en posts grandes. Cada tema importante se publica en EN y se reposté con la versión ES.
- **Horarios AR**: 11:30 (mañana NY) · 14:00 (mediodía NY) · 18:00 (cierre NY + tarde Europa).
- **Cómo se publica**: X API v2, tier gratis suficiente para el volumen AUREX. Cron Railway.

### LinkedIn aurex-fintech (Company Page)

- **Rol**: credibilidad institucional + alcance B2B (asesores, family officers, futuros inversores).
- **Frecuencia**: 3 publicaciones por semana (Lunes + Miércoles + Viernes).
- **Formato dominante**: posts largos 1.300 a 1.500 caracteres + carruseles de 5 a 10 slides + ocasionalmente un video corto.
- **Idiomas**: inglés primario + español en posts espejo (mismo contenido, post separado).
- **Horarios AR**: 09:00 a 10:00 martes a jueves (pico de engagement LinkedIn).
- **Cómo se publica**: LinkedIn Marketing API + cron Railway. Si la API tiene restricciones, fallback: Escritorio publica vía Chrome integration en lote semanal.

### Instagram @aurex_live

- **Rol**: visual + stories diarias con AUREX Pulse del día.
- **Frecuencia**: 3 a 4 publicaciones en el feed por semana + Stories diarias (4 a 7 por día).
- **Formato dominante**: 60% carruseles educativos 5 a 7 slides + 30% Reels 15 a 30 segundos + 10% fotos.
- **Idiomas**: español primario (LATAM consume IG fuerte) + inglés en posts grandes.
- **Horarios AR**: 20:00 a 22:00 (pico LATAM nocturno).
- **Cómo se publica**: Meta Graph API + cron Railway.

### YouTube @aurex-fintech

- **Rol**: educación largo + SEO orgánico de largo plazo.
- **Frecuencia**: 2 Shorts por semana + 1 video largo 5 a 10 min cada 2 semanas.
- **Formato dominante**: 70% Shorts 30 a 60 segundos + 30% videos largos.
- **Idiomas**: inglés con subtítulos automáticos en ES, PT, FR, IT, ZH, HI, AR.
- **Horarios AR**: Shorts 19:00 a 21:00. Largos: viernes 18:00.
- **Cómo se publica**: YouTube Data API + cron Railway.

### TikTok @aurex_live

- **Rol**: discovery viral si surge + audiencia más joven.
- **Frecuencia**: 2 a 3 videos por semana mientras espera verificación Business. Escala a diario si engagement supera 5%.
- **Formato**: videos verticales 15 a 30 segundos. Búho v2 (ya generado) + texto superpuesto.
- **Idiomas**: español primario (LATAM TikTok dominante) + inglés en piezas con potencial viral.
- **Horarios AR**: 21:00 a 23:00.
- **Cómo se publica**: TikTok Content Posting API (requiere review de TikTok, 1 a 3 semanas — Code sigue) + manual asistido por Escritorio mientras tanto.

---

## 8. Contenido — qué tipo de cosas se publican

Mix de pilares según framework probado de marketing-skills (40 / 20 / 15 / 15 / 10).

| Pilar | Qué es | Mix | Ejemplos para AUREX |
|---|---|---|---|
| **Educativo** | Enseñar algo útil sobre mercados | 40% | "Cómo leer el AUREX Pulse" / "Qué significa una señal cruzada FED + GDELT" / "5 indicadores que el retail ignora" |
| **Detrás de escena** | Mostrar el proyecto, no solo el producto | 20% | "Por qué AUREX nació en Argentina" / "Cómo decidimos las 24 variables" / "Errores que cometimos en los primeros builds" |
| **Prueba social** | Demostrar resultados y credibilidad | 15% | "10 instalaciones en 34 horas, 47,6% retención" / "AUREX en X idiomas" / Cuando lleguen testimonios reales |
| **Conversación** | Hacer preguntas que generen respuestas | 15% | "¿Qué activo seguís más?" / "¿Cómo cruzan macro con técnico?" / "¿Bloomberg vale 24k para retail?" |
| **Promocional** | Anuncios directos del producto | 10% (techo) | Lanzamiento Android / Lanzamiento web actualizada / Pieza "AUREX vs Cocos Capital" |

**Regla absoluta**: el 10% promocional es techo, no piso. Si la mayoría del feed son promos, la audiencia se va.

---

## 9. Calendario semana modelo (replicable las 4 semanas)

Cadencia tipo. La semana 1 tiene la peculiaridad del warm-up de X.

### Semana 1 (14 al 20 de mayo) — soft launch con warm-up de X

| Día / Horario AR | Telegram | X (warm-up) | LinkedIn | Instagram | YouTube | TikTok |
|---|---|---|---|---|---|---|
| **Lunes 14** 9:00 / 13:00 / 20:00 | Brief AM EN + Pulse ES mediodía + cierre NY EN | Tweet 1: "Introducing AUREX" (sin link) + Tweet 2: 1 datapoint cruzado | Post largo: "Why AUREX exists" (EN + ES) | — | — | — |
| **Martes 15** | TG diario | 2 tweets: 1 datapoint + 1 pregunta a FinTwit | — | Carrusel ES "Qué es AUREX en 6 slides" | — | Short ES "AUREX en 30 segundos" |
| **Miércoles 16** | TG diario | 2 a 3 tweets: cruce FED + GDELT (captura, sin link) | Post largo: "The 24-variable engine, explained" (EN + ES) | Stories: AUREX Pulse del día | — | — |
| **Jueves 17** | TG diario | 2 tweets + 1 reply a `@FedResearch` o `@Bloomberg` | — | — | Short EN "How AUREX Pulse works" 45 seg | — |
| **Viernes 18** | TG diario + wrap-up semanal | Hilo 5 tweets: "5 cruces macro+geo de la semana" (warm-up cumplido) | Carrusel: "Friday market roundup" (EN + ES) | Reel ES "Lo que pasó esta semana" | — | Short ES "Friday recap" |
| **Sábado 19** | TG light: weekend outlook | 1 a 2 tweets + replies engagement | — | Stories: AUREX Pulse weekend | — | — |
| **Domingo 20** | TG: "eventos próxima semana" | 2 tweets: "Week ahead — FED + earnings + geo" | — | Carrusel ES "Eventos críticos próxima semana" | — | — |

### Semanas 2 a 4 — escalada normal

A partir del lunes 21-may:

- X sale del warm-up: escala a 4 a 6 tweets/día con links progresivos a aurex.live (PWA actualizada para entonces).
- Landing publicada → todos los CTAs apuntan ahí.
- Semana 2 incluye anuncio "AUREX en la web subió un escalón" (PWA actualizada).
- Email arranca: secuencia de bienvenida automática para quienes descarguen vía landing.
- Empiezan piezas comparativas ("AUREX vs Cocos Capital", "AUREX vs Tradingview").

---

## 10. Email — qué arranca y cuándo

Email arranca en la semana 2, cuando la landing ya esté online y tenga formulario de captura.

### Configuración técnica

- **Proveedor**: Resend, plan gratuito (3.000 emails/mes) o $20/mes (50.000 emails). Decisión final cuando se configure, NO ahora.
- **Dominio remitente**: `mail.aurex.live` (subdominio, sin tocar el dominio principal).
- **Templates**: HTML simples con MJML, mismo branding que la landing.
- **Idiomas**: español + inglés, según el idioma de signup.

### Secuencias

1. **Email de bienvenida (1 sola vez, inmediato al signup)**: agradece, recuerda el botón Android + PWA, da 3 tips para empezar.
2. **Newsletter semanal**: lunes 9:00 AR (envío automatizado). Wrap-up de la semana de mercados + 3 piezas educativas + 1 evento crítico próxima semana.
3. **Email de re-activación (a los 14 días sin abrir la app)**: simple, "¿estás bien? Acá está lo último de AUREX".

### Quién lo arma

Code con skills `email-sequence` + `copywriting` + `content-humanizer` (anti-slop). Fernando aprueba los 3 templates en bloque, después corre automático.

---

## 11. Cómo se publica todo — la automatización

### Sistema de orquestación

- **n8n self-hosted en Railway**: instancia nueva, cero costo recurrente, ya tenemos Railway pago.
- **APIs nativas de cada plataforma** (gratis, sin Buffer ni Hootsuite):
  - Telegram Bot API
  - X API v2 (tier gratis)
  - LinkedIn Marketing API
  - Meta Graph API (Instagram)
  - YouTube Data API
  - TikTok Content Posting API (con review pendiente)
- **Cron del backend Railway**: dispara los workflows de n8n según horario por canal.

### Workflow Code / Escritorio / Fernando

| Paso | Quién | Cuándo |
|---|---|---|
| Planificación temas semanal | Code (orquesta) + Escritorio (revisa) | Lunes 9:00 AR cada semana |
| Generación copy en inglés (idioma maestro) | Code con `marketing-skills:copywriting` + `content-production` | Lunes 9 a 11 AR |
| Generación visuales (carruseles, banners, animaciones búho v2) | Code con `frontend-design` + `taste-skill` + `brandkit` | Lunes 11 a 13 AR |
| Traducción a 7 idiomas restantes | Code con sistema i18n + `content-humanizer` | Lunes 13 a 14 AR |
| Lote semanal completo a Fernando | Code arma un solo documento Markdown con todos los copys + thumbnails de visuales | Viernes 11 AR |
| Aprobación en bloque | Fernando | Viernes a domingo, 15 a 20 min total |
| Cargado en n8n + scheduling | Code | Domingo PM |
| Publicación automática | n8n + Railway autónomo | Según horario por canal |
| Monitoreo respuestas / replies / DMs | Escritorio vía Chrome integration | 15 min/día |
| Borrador respuesta a DMs importantes | Escritorio drafta → Code aprueba → Fernando OK si es comercial | Diario |
| Métricas semanales | Code con `social-media-analyzer` | Lunes 8 AR |

### Carga estimada de Fernando

- 15 a 20 min/semana revisando lote semanal (viernes).
- 0 a 5 min/día revisando DMs flageados.
- 0 minutos publicando manualmente.

---

## 12. Métricas — qué medimos y qué ignoramos

### Lo que SÍ miramos

| Métrica | Canal | Target 30 días | Target 90 días |
|---|---|---|---|
| Suscriptores del canal | Telegram | 200 | 1.000 |
| Followers + engagement rate | X / Twitter | 150 + 2% | 500 + 3% |
| Followers Company Page | LinkedIn | 150 | 500 |
| Followers + saves rate | Instagram | 200 + 5% | 800 + 7% |
| Suscriptores + horas vistas | YouTube | 50 + 100 hs | 250 + 800 hs |
| Followers + 1 video > 5k views | TikTok | 100 + 1 | 500 + 1 video > 50k |
| Sesiones únicas / semana | Landing aurex.live/inicio | 200 | 1.000 |
| Suscriptores email | Email | 50 | 300 |
| **Instalaciones app Android** | Cross | **500** | **2.500** |
| **Total followers 6 redes** | Cross | **1.000** | **4.000** |

### Lo que NO miramos en Fase 1

- Impresiones puras sin engagement
- Reach sin acción
- Likes solos (engagement real = save + share + comment + DM)
- Followers que no convierten en descarga

---

## 13. Riesgos identificados y cómo mitigarlos

| Riesgo | Probabilidad | Mitigación |
|---|---|---|
| Warm-up de X falla y X re-bloquea la cuenta | Media | Estricto 2 a 3 posts/día primeros 7 días, cero links externos, cero mass-follows. Si llega a flag, contactar X via XAGEA-751927 ya conocido. |
| TikTok rechaza Business Verification | Baja a Media | Plan B: cuenta queda Personal, sin link en bio, publicar igual con CTA "AUREX en Google Play". |
| Apple Build 17 sigue en review más de 30 días | Media | El plan ya asume que iOS es "próximamente". No bloquea nada. Si llega aprobación, se suma a los CTAs sin reescribir nada. |
| LinkedIn restringe la API y no se puede auto-publicar | Baja | Plan B: Escritorio publica los 3 posts/semana vía Chrome integration, 15 min máximo a la semana. |
| Algoritmo Instagram penaliza cuenta nueva con mucho contenido | Media | Cadencia conservadora 3 a 4 feed/sem + Stories diarias (Stories no impactan algoritmo igual). |
| Regulación financiera flag ("señales de inversión") | Media a Alta | Disclaimer "Not a broker. Not advice." en TODA pieza relevante. NUNCA decir "comprar" / "vender" / "señal de compra". Siempre "datos para que vos decidas". |
| Fernando no aprueba el lote del viernes | Baja | Default pre-aprobado: si no responde antes del domingo, cron arranca con el lote. Vos podés pausar o borrar cualquier post post-publicación. |
| Crisis de marca por post mal recibido | Baja a Media | Protocolo: Escritorio detecta + alerta + Code y Fernando deciden en menos de 1 hora pausa o respuesta coordinada. |
| PWA no se actualiza en tiempo (3 a 4 hs Code se extiende) | Baja | Si pasa de 1 día, el plan sigue con CTA Android principal. La PWA actualizada se anuncia cuando esté lista, no antes. |
| Landing no queda bien en algún idioma | Baja | Validación visual de Escritorio en los 8 idiomas antes de publicar. Iterar antes de anuncio. |

---

## 14. Línea de tiempo — qué pasa cada día de la semana 1

| Día | Trabajo Code (lo no visible) | Trabajo público (lo que la audiencia ve) |
|---|---|---|
| **Martes 14 (hoy ya pasó)** | — | — |
| **Miércoles 15** | Setup n8n en Railway + APIs nativas + cron base. Generación primeros visuales semana 1. | Si Fernando aprueba antes del miércoles: arranque telegram + IG + LinkedIn semana 1. Si no, jueves. |
| **Jueves 16** | Iniciar actualización PWA (push FCM, 1,5 hs). Generar copy semana 2 en lote. | Día 1 publicación oficial cross-redes según calendario semana 1. |
| **Viernes 17** | Cerrar PWA push + arrancar integración Telegram real + "Cómo usar". Empezar construcción landing (estructura + sistema diseño). | Día 2 publicación + viernes wrap-up X hilo. |
| **Sábado 18** | Cerrar las 3 funciones PWA + validación con Playwright + Escritorio Chrome + captura a Fernando. | Día 3 publicación. |
| **Domingo 19** | Avanzar landing (HTML + CSS + copy 8 idiomas). | Sin publicaciones grandes, weekend outlook. |
| **Lunes 20** | Lanzamiento landing en aurex.live/inicio + anuncio "PWA al día" en redes. | Anuncio público: PWA actualizada + landing nueva. Cross-redes. |

---

## 15. Lo que decide Fernando (2 cosas únicas)

Las únicas 2 decisiones que requieren tu input antes de arrancar:

### Decisión 1: ¿Aprobás el alcance integral?

Plan abarca: 6 redes + construcción de landing + actualización PWA + email + cron de publicación, todo en 30 días con cero costo recurrente y aproximadamente 1 hora tuya total a la semana en aprobaciones.

### Decisión 2: ¿Cron zero-touch los viernes si no respondés el lote?

Default propuesto: si no aprobás explícitamente el lote semanal antes del domingo 21:00, el cron arranca el lunes con el lote ya generado por Code. Vos siempre podés pausar o borrar cualquier post post-publicación.

Alternativa: bloqueo absoluto sin tu OK explícito. Riesgo: si tenés un día ocupado o vacaciones, semana en cero.

---

## 16. Lo que decide Code (sin tu input)

Para que sepas qué resuelvo yo y no te interrumpo:

- Planning temas semanal cruzado con eventos macro reales (calendario FED, CPI, earnings, GDELT)
- Generación copy en inglés + traducción a 7 idiomas
- Generación visuales (carruseles, banners, búho v2 ya existente)
- Setup técnico (n8n, APIs, cron Railway)
- Scheduling y publicación
- Análisis métricas semanal
- Ajustes al plan si una red no funciona o se satura
- Coordinación con Escritorio para validación visual
- Backup de contenido evergreen
- Anti-slop visual y de copy (skills `taste-skill`, `content-humanizer`)
- Brand voice consistency en cada pieza
- Disclaimers regulatorios en cada pieza relevante

---

## Próximos pasos inmediatos (post tu aprobación)

1. **Hoy / mañana**: Code arranca actualización PWA (3 a 4 hs) + setup n8n + APIs.
2. **Día 2 a 3**: Code construye landing (6 a 8 hs).
3. **Día 3 a 4**: Validación + aprobación visual + deploy landing online.
4. **Día 4 a 5**: Generación primeros 14 posts semana 1 + validación.
5. **Día 5 a 7**: Primer lote a Fernando + arranque publicaciones cross-redes.
6. **Día 7 en adelante**: ritmo normal semana modelo.

Tiempo total Code: 12 a 16 horas en 5 a 7 días naturales.
Tiempo total Fernando: 1 a 2 horas distribuidas en aprobaciones.

---

*Fin del Plan Social Media Fase 1 v2.0*
*Versionado: este es v2.0. Próximas iteraciones como _v3.*
*Base de contexto: MARKETING_CONTEXT_AUREX_v2.md (en misma carpeta)*
*Documento que aplica skills marketing-skills + frontend-design + ui-ux-pro-max + design-taste-frontend + shadcnblocks como referencia + full-output-enforcement*
*Stack landing decidido Code + Escritorio: vanilla HTML + i18n reutilizado de PWA (memoria project_landing_stack_decision.md)*
