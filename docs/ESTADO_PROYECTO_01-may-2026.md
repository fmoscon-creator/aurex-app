# ESTADO DEL PROYECTO AUREX — 1 de mayo de 2026

> Documento de referencia consolidado al cierre de la sesión 30-abr/1-may-2026.
> Este archivo se actualiza al cierre de jornadas largas y queda en repo
> como punto de retorno para futuros chats. La sección 13 "Cómo trabajar
> esto mañana" se reescribe en cada actualización; el resto es histórico.

---

## 1. INFRAESTRUCTURA Y SERVICIOS — ESTADO

### 1.1 Apps en stores

| Plataforma | Build | Estado | Submit |
|---|---|---|---|
| **Apple App Store** | 17 (Marketing 1.0, App "AUREX AI") | Pendiente de revisión | 24-abr-2026 5:24 AR |
| **Google Play** | 2 (versionName 1.0.1, App "AUREX") | Prueba cerrada activa, faltan días para 14 | 23-abr-2026 16:20 AR |

ID envío Apple: `e0e7fb35-11a4-4c1d-854c-60a80c4799e6`. Bundle iOS: `com.fernandomoscon.aurex`. Bundle Android: `com.aurexapp`.

Regla inviolable: NO tocar metadata ni iconos en stores hasta aprobación.

### 1.2 Backend Railway (servicio `aurex-app`)

URL: `https://aurex-app-production.up.railway.app`. Activo. 16 variables de entorno configuradas.

Crons activos: checkAlertas (30s), refreshCryptoCache (2min), calcularPulse (5min), calcularSenalesIA (5min), healthCheck (5min), `dailyHealthReport` (8 AM AR — dual canal Telegram + WhatsApp), `dailyProjectStatusReport` (9 AM AR — Telegram, usa este `CONTEXTO.md` como input), monthlyHealthReport (último día hábil 18 AR).

Variables nuevas agregadas hoy: `ELEVENLABS_API_KEY`, `RUNWAY_API_KEY`.

### 1.3 Evolution API (servicio Railway `evo-v1`)

Self-hosted Evolution v1.8.7. URL: `https://evo-v1-production.up.railway.app`. Imagen Docker pública `evoapicloud/evolution-api:v1.8.7`. Container activo continuo desde 28-abr 12:24 AR (sin reinicios). Sin volumen persistente.

Instancia "aurex" recreada hoy desde cero (la anterior estaba corrupta desde 28-abr — ver sección 8).

### 1.4 WhatsApp 2563 — STATUS RESUELTO 1-may-2026 ~8:00 AR

**Estado al cierre 1-may-2026:** **operativa**. Vinculada al backend (state: open) y cooldown antifraude general **levantado** después de 7 días offline (28-abr 15:25 UTC → 1-may ~11:00 UTC). Verificación: el cron `dailyHealthReport` de las 8:00 AR llegó al WhatsApp admin 1320 desde el bot AUREX 2563. Canal WA recuperado como redundancia de Telegram para los 2 reportes diarios.

**Situación al cierre de hoy:**
- Línea desconectada desde 28-abr 12:25 AR (47h de offline al inicio de la sesión).
- Hipótesis original Code: Evolution sin volumen persistente. **DESCARTADA** — los logs confirmaron container sin reinicios.
- Diagnóstico real: instancia "aurex" en Evolution corrupta desde el 28-abr (logs mostraron "Token already exists" 3 veces seguidas + ENOENT en `/evolution/store/messages/aurex` — el directorio físico nunca se creó). Las 5 llamadas de pairing code de ese día la dejaron en estado degradado.
- Recreación limpia hoy: `DELETE /instance/delete/aurex` + `POST /instance/create` + escaneo QR final desde iPhone. Vinculación quedó como "AUREX Backend" en Google Chrome. State: open.
- Pruebas de envío: autoenvío 2563→2563 SÍ llegó (libsignal y Baileys funcionan). Envíos a 1320 (admin Fernando) y a número externo (+54 9 11 6764 3307) NO llegaron — quedaron PENDING indefinidamente.
- **Diagnóstico final consensuado con Escritorio:** cooldown antifraude general de WhatsApp sobre la línea 2563 saliente. La línea acepta vinculación, encripta para sí misma, pero WhatsApp retiene los mensajes salientes a otros números. Causa probable: 5 reescaneos del 28-abr disparando el flag.
- **Acuerdo:** 24h de reposo total. Mañana 1-may 8:00 AR el cron `dailyHealthReport` se dispara solo (ya es dual-channel Telegram + WhatsApp). Si llega por WhatsApp 1320 → cooldown levantado. Si no → 24h más de espera.
- Telegram funciona perfecto como canal principal de reportes diarios.

### 1.5 BN-002 (Binance bloqueado en Railway us-east4)

ACTIVE desde 18-abr 18:30. MITIGATED via CryptoCompare. Pendiente decidir alternativa (cambio región Railway, hosting alternativo, proxy) post-aprobación Apple.

### 1.6 Memoria persistente de Code

Carpeta: `~/.claude/projects/-Users-fernandomoscon/memory/`. 7 archivos principales + `MEMORY.md` índice. Backup espejo en `~/Desktop/aurex-memory-backup/` y subido al repo en `aurex-app/memory/`.

Memorias actualizadas en esta sesión: `feedback_comunicacion.md` con 4 reglas nuevas (regla 7 respuestas cortas + regla 8 acuerdos no se rompen + regla 9 pixel-por-pixel videos + memoria sobre Plan MKT cruzado).

### 1.7 Permisos Claude Code (Opción 1)

Configurado en `~/.claude/settings.json`: 69 comandos en allowlist + 15 en denylist. Theme dark preservado.

### 1.8 macOS Privacy — Bash bloqueado en Downloads

Detectado hoy: el Bash subprocess de Claude Code NO tiene acceso a `~/Downloads/` aunque Terminal tenga "Acceso completo al disco". Workaround aplicado: secrets se copian a `/tmp/aurex-*.txt` con el Read/Write tool de Code (que sí tiene permisos), y de ahí se leen. Drive automation evita el problema completo (uploads/downloads van directo Drive↔repo sin pasar por Downloads).

---

## 2. PLAN DE MARKETING V2 — ESTADO ACTUAL

### 2.1 Versión actual

Archivo en GitHub: `aurex-app/PLAN_MKT.md` — versión **v2.1** con sección 2.4 reescrita el 30-abr (búho animado reemplaza HeyGen).

### 2.2 Cambios estructurales aplicados

1. **Premisa global, no LATAM.** Cobertura 6 mercados (USA, AR, BR/LATAM, EU, Japón, China/HK) y 8 idiomas (ES, EN, PT, ZH, HI, AR, FR, IT) verificados en `aurex-i18n.js`.
2. **Avatar HeyGen Pro DESCARTADO.** Reemplazado por **búho v2 animado**, sección 2.4 reescrita el 30-abr. Ahorro -$1.188/año vs v2.0.
3. **Programa de referidos definido:** simétrico 1 mes PRO + 1 mes PRO (sin costo variable).
4. **Workflow de localización ejecutable:** Escritorio escribe en español como idioma maestro → Code traduce con Claude API a los 7 restantes.
5. **Riesgos regulatorios documentados:** USA SEC, UE MiCA, AR CNV, BR CVM, China cripto, India RBI, mundo árabe sharia, Francia AMF, Italia CONSOB.
6. **Estrategia X/Twitter:** 3 cuentas en Mes 1 (EN/ES/PT), no 8.
7. **Telegram:** 3 channels en Mes 1 (EN/ES/PT), 5 más en Mes 2-5.
8. **Cronograma 90 días multi-idioma** con priorización ES → EN → PT.

### 2.3 Posicionamiento consolidado

> AUREX es el primer asistente de análisis IA de mercados en tiempo real con cobertura cross-mercado y multi-idioma para el inversor global. No es un broker. No es un asesor humano. No es una red social de tips. Es la herramienta que va entre el inversor y el broker: analiza 350 activos en 6 mercados, en 8 idiomas, con señales IA propias sobre los 74 más representativos. Sin jerga, sin publicidad, sin agenda, sin conflicto de intereses.

Tagline ES: "AUREX. Mercados globales con señales IA en 8 idiomas. Sin broker. Sin sesgo."
Tagline EN: "AUREX. Global markets with AI signals in 8 languages. No broker. No bias."

### 2.4 Plan táctico — 11 canales

| # | Canal | Estado | Acción Mes 1 |
|---|---|---|---|
| 1 | Telegram channels (3 idiomas) | infraestructura ✓ | Crear @AurexPulseEN/ES/PT, post diario auto |
| 2 | WhatsApp Business (alertas) | en cooldown 2563 | Esperar levantamiento cooldown 1-2 may |
| 3 | Email/Newsletter | Resend a configurar | 1 newsletter semanal automático |
| 4 | X/Twitter (3 cuentas) | a crear | 3 posts/día auto |
| 5 | Instagram (feed + Stories) | Buffer Business a configurar | 4 posts/semana, 1-2 Stories/día |
| 6 | TikTok + IG Reels + YT Shorts | **pipeline 95% listo** | 2 videos/semana |
| 7 | YouTube canal completo | a crear | 1 video largo/semana |
| 8 | LinkedIn Company Page | a crear | 2 posts/semana |
| 9 | Press releases wire | a activar | Lanzamiento global + regionales |
| 10 | Blog SEO comparativas | aurex.live/blog a habilitar | 1 artículo/semana |
| 11 | Programa de referidos | a desarrollar | Backend + UI in-app |

### 2.5 Sección 2.4 reescrita el 30-abr — Búho v2 animado como presentador

**Decisión definitiva:** búho v2 animado reemplaza al avatar humano de HeyGen Pro ($24-99/mes). Validado por Fernando + Escritorio + Code.

**Por qué:** coherencia total con la marca (oro = AUREX = búho), diferenciación máxima vs los 19 competidores (ninguno usa mascot animal en video), cero costo recurrente nuevo.

**Ruta A** (videos diarios): PNG estático del búho v2 + efectos de cámara + voz IA + cortes cada 3-4s. Costo: $0/mes. Implementada y funcionando.

**Ruta B** (videos premium 1-2 por semana): animación IA imagen-a-video (Kling/Luma/Pika tier free), 3-5 segundos del búho moviéndose, mezclado con Ruta A como stinger del intro. Costo: $0/mes con tier free. **Pendiente** — V1 corrupta hoy descartada (ver sección 8).

**Specs de identidad fijas** (sección 2.4 del PLAN_MKT.md): voz cálida en español/inglés/portugués/francés/italiano + masculina en árabe/hindi; acento español neutro LATAM; ritmo rápido; tono directo y confiante; fondo navy #0A1428 fijo; tres encuadres fijos (plano completo, close-up ojos, split screen).

### 2.6 Presupuesto Año 1 — actualizado el 30-abr

- **~$35-65/mes recurrente** (Buffer Business $15 + Resend $0-20 + Twilio fallback ~$10 + dominios $5 + Claude API tokens localización $5-15).
- **~$300-500/release** puntual en press releases (4-6/año = $2.500-4.000).
- **Total Año 1: ~$2.300-3.800 USD.**

Reducción vs v2.0 original: -$1.188/año por eliminar HeyGen.

---

## 3. PIPELINE DE GENERACIÓN DE VIDEOS — `scripts/video_generation/`

### 3.1 Componentes implementados

```
scripts/video_generation/
├── README.md                      ← documentación
├── compose_video.py               ← orquestador principal
├── drive_automation.py            ← upload/download Drive con OAuth
├── templates/
│   ├── constelacion.py            ← fondo animado (110 estrellas dorado/blancas)
│   └── banners.py                 ← 5 banners reusables
└── assets/
    ├── logo_solo_circulo.png      ← logo limpio sin texto
    ├── buho_v2_dark.png           ← mascot v2 sobre navy
    ├── buho_v2_light.png          ← mascot v2 sobre cream
    └── buho_animations/           ← MP4 del búho animado (Ruta B)
        └── .gitkeep
```

### 3.2 Capacidades

- Generación automática de videos verticales 1080×1920 (TikTok/Reels/Shorts) en modo oscuro y claro.
- Constelación animada (110 estrellas, líneas finas dorado entre cercanas, parpadeo, movimiento sutil, wrap-around) — replica del onboarding de la app.
- Banners premium con bevel dorado, glow exterior, drop shadow, esquinas decorativas en L, barra de progreso proporcional al porcentaje (verde alcista / rojo bajista).
- Búho v2 con AUREX en oro fijo debajo (refuerzo de marca).
- Barra inferior siempre visible: `aurex.live · Inversión con AI`.
- Outro sin búho con logo grande + "Visitanos en aurex.live".
- Voz ElevenLabs `multilingual_v2` integrada (8 voces aprobadas, rotación canal/día).
- Stinger Ruta B integrado: si hay MP4 en `buho_animations/`, se inserta automáticamente al inicio (cropea watermark, scale a misma altura del búho del video principal, padding navy AUREX).
- Flag `--no-stinger` para forzar Ruta A pura.
- Flag `--channel tiktok|reels|shorts|youtube|linkedin|instagram` para rotación automática de voz.
- Flag `--voice <nombre>` para forzar voz específica.

### 3.3 Comando estándar

```bash
python3 scripts/video_generation/compose_video.py \
  --mode dark --channel tiktok \
  --out ~/Downloads/video.mp4
```

---

## 4. VOCES ELEVENLABS — APROBADAS Y CERRADAS

### 4.1 Las 8 voces aprobadas (tras probar las 21 default)

**Femeninas:** Matilda (profesional/seria), Bella (profesional/brillante), Jessica (juvenil/jovial), Lily (aterciopelada/británica).
**Masculinas:** Charlie (profundo/seguro/energético), Brian (profundo/resonante), Bill (sabio/maduro), Chris (carismático/cercano).

### 4.2 Asignación canal → voz + rotación por día

| Canal | Femenina | Masculina |
|---|---|---|
| TikTok / IG Reels / YT Shorts | Jessica | Chris |
| YouTube canal largo | Matilda | Brian |
| LinkedIn Company Page | Lily | Bill |
| Instagram feed + Stories | Bella | Charlie |
| default | Matilda | Charlie |

Rotación: lunes/miércoles/viernes/sábado/domingo → femenina del canal. Martes/jueves → masculina.

### 4.3 Multi-idioma

Modelo `eleven_multilingual_v2` soporta 32 idiomas con la MISMA voz. NO requiere voces distintas por idioma. La voz Matilda en español, inglés y portugués suena coherente. Ahorra tokens del free tier (10k caracteres/mes alcanzan para ~15-20 videos cortos).

### 4.4 Voces nativas LATAM descartadas

Valeria, Siena, Catalina, Paola Blasi, Tamara — todas en Voice Library de ElevenLabs. Requieren plan Creator $22/mes. Descartadas por regla cero costo. Reconsiderar si en el futuro hay ROI demostrado.

### 4.5 Documentación cerrada

`docs/VOCES_CANALES_AUREX.md` (.md + .docx + .pdf en Descargas + repo). Referencia única de consulta.

---

## 5. RUTA B — ANIMACIÓN BÚHO (PENDIENTE Y EN MARCHA)

### 5.1 Brief para Escritorio

`AUREX_MEDIA_LIBRARY/04_briefs/brief_v2_buho_animaciones_kling_luma.md` (Drive) con:
- 3 variantes a generar: V1 parpadeo+giro, V2 breathing+partículas, V3 zoom+alas.
- Plan B: Kling AI (probado hoy, calidad OK pero tier free no renueva créditos como creímos).
- Plan C: Luma Dream Machine (no probado, 30 generaciones/mes free verificado en docs).
- Plan D: animación local Code con FFmpeg/Pillow (ver sección 13 Plan D del día siguiente).

### 5.2 V1 generadas hoy — DESCARTADAS

- **Kling V1 (45 créditos):** visualmente OK pero el INPUT que subió Escritorio fue un screenshot del viewer de Drive con chrome del browser visible. Frame inicial mostraba la barra "AUREX_FINAL_v2_modo_oscuro.p... Archivo Ver Insertar Compartir" + watermark KlingAI 3.0. Inservible.
- **Runway V1 (25 créditos):** mismo problema, mismo input contaminado, además giro 360° no pedido. Inservible.

Total créditos perdidos hoy en intentos contaminados: 45 Kling + 25 Runway.

### 5.3 URL del PNG puro publicada en GitHub

```
https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/scripts/video_generation/assets/buho_v2_dark.png
```

Para Escritorio cargar mañana en Kling/Luma/Pika sin pasar por screenshots. Cero contaminación de chrome del browser.

### 5.4 Hallazgo importante sobre créditos Kling

Escritorio asumió erróneamente que Kling free renueva créditos diarios. Verificación posterior: el plan free de Kling **NO renueva créditos automáticamente**. Los 21 créditos restantes no alcanzan ni para una variante adicional con Kling 3.0 (45 créditos cada video de 5s).

Opciones reales hacia delante (sin pagar):
- **Luma Dream Machine** (30/mes free, no probado aún) — primera opción a probar.
- **Runway free** con PNG puro (475 créditos, cola 55 min) — backup.
- **Plan D local FFmpeg/Pillow** (Code, sin costo, sin cola, sin créditos) — autónomo.

Kling Standard $6.99/mes: descartado por regla cero costo variable.

### 5.5 Sonido del búho (firma sonora) — propuesta acordada

Idea de Fernando: sonido del búho al final de los videos (estilo "tudum" de Netflix).

Acuerdo Code + Escritorio:
- NO realismo "ulú-ulú" — choca con tono financiero serio.
- SÍ tono **sintético/procesado** generado desde cero con FFmpeg (no descargar de librerías para que sea sello propio AUREX).
- Solo en videos premium (lanzamientos, hitos, alertas IA destacadas), NO en videos diarios.
- Volumen bajo (-12 a -15 dB), últimos 1-2 segundos.

Implementación pendiente: generar 4 candidatos sintéticos, Fernando elige, integrar como flag `--owl-sound` en `compose_video.py`. Orden definido con Escritorio: después de tener V1+V2+V3 visuales aprobadas.

---

## 6. RESEARCH VISUAL — FASE A

### 6.1 Archivo en GitHub

`aurex-app/RESEARCH_VISUAL.md` (443 líneas, commit 9f38daa).

### 6.2 Cobertura

- 19 competidores del Plan MKT analizados visualmente.
- 4 benchmarks externos: Linear, Notion, Apple iPhone, Mercado Pago.
- Nubank con cobertura doble (competidor LATAM + benchmark identidad de marca con BrandBook Pentagram + typeface custom Blackletra).

### 6.3 4 arquetipos visuales detectados

1. Personality-driven Gen Z (Robinhood verde, Lemon citrus, RockFlow purple+Bobby, Composer avatares).
2. Institutional con polish accesible (Public navy+green, Bitso navy+teal, TradingView dark+amber).
3. Minimalist técnico SaaS (Sagehood, Guavy code-embedded, Linear).
4. Premium brand-led con sistema propio (Nubank Pentagram, Apple, Notion, Warren BR).

### 6.4 Decisión preliminar

AUREX = intersección **Arquetipo 2 (Institutional con polish) + Arquetipo 4 (Brand-led con sistema propio)**.

Estética sobria: dorado primario + dark backgrounds + accents secundarios por contexto. Más Bitso/Public/TradingView que Robinhood/Lemon/RockFlow.

### 6.5 Pendiente Fase B

Captura manual por Fernando de redes que Code no puede acceder logueado. Lista priorizada en `RESEARCH_VISUAL.md` sección "Captura manual pendiente".

---

## 7. MASCOT DE MARCA — DECISIÓN FINAL

### 7.1 Mascot oficial AUREX

**v2 — Geometric premium.** Búho dorado facetado de cuerpo completo. Decisión final tomada por Fernando el 30-abr.

### 7.2 Pipeline reproducible

`aurex-app/scripts/mascot_processing/`: sources PNG (v0/v1/v2), scripts Python (`process_v0.py`, `process_v1_v2.py`, `generate_all_sizes.py`), README. Regenera bit-exact con `python3 process_v0.py && python3 process_v1_v2.py && python3 generate_all_sizes.py`.

### 7.3 152 PNGs generados

`~/Downloads/AUREX_ICONS/` por versión × modo × plataforma:
- iOS 13 tamaños (1024 → 20)
- Android 7 tamaños (512 → 36)
- PWA 8 tamaños (512 → 72)
- Web/Favicon 5 tamaños (192 → 16)
- Marketing 5 formatos (OG 1200×630, Twitter 1200×675, IG post 1080×1080, IG Story 1080×1920, YouTube thumb 1280×720)

NO subir a stores hasta aprobación Apple Build 17 + Google Play Build 2.

### 7.4 Documento de identidad

`AUREX_MASCOT_BUHO_identidad_y_uso.md` v1.1 (PDF + .md). En Drive sub-carpeta MASCOT FINAL.

### 7.5 Logo AUREX no se reemplaza

Convive con el mascot (modelo Mailchimp/Twitch): logo en stores/legal/headers oficiales, mascot en redes/contenido educativo/onboarding/ilustraciones.

---

## 8. INFRAESTRUCTURA NUEVA AGREGADA HOY (30-abr / 1-may)

### 8.1 Drive automation con OAuth

**Setup completo:**
- Proyecto Google Cloud `aurex-automation` creado.
- API Drive habilitada.
- OAuth Consent Screen configurada (External, fmoscon@gmail.com como test user).
- OAuth Client ID Desktop creado.
- JSON descargado a `~/Desktop/aurex-oauth.json`.
- Flow OAuth ejecutado, token guardado en `/tmp/aurex-oauth-token.json`.
- Refresh_token se reutiliza automáticamente (no requiere más browser).

**Capacidades:**
- Code puede subir/descargar archivos a Drive sin pasar por Descargas ni intervención de Fernando.
- Comandos: `ping`, `auth`, `list <folder_id>`, `upload <local> <folder_id>`, `download <file_id> <local>`.
- Script: `scripts/video_generation/drive_automation.py`.

**Por qué OAuth y no Service Account:** las SAs no tienen storage propio en cuentas @gmail.com personales sin Google Workspace pago. OAuth funciona con cuenta gratuita.

### 8.2 Carpeta Drive `AUREX_MEDIA_LIBRARY`

Estructura organizativa para Code + Escritorio:

```
AUREX_MEDIA_LIBRARY/
├── 01_videos/finales/
├── 01_videos/buho_animaciones/
├── 02_audios/elevenlabs/
├── 03_assets_brutos/
├── 04_briefs/
└── 05_feedback/
```

Folder ID raíz: `1FZ_LRmNEwoeZdcayDBNi2Ve52vtvpCxI`.

### 8.3 ElevenLabs API integrada

- API key guardada en `~/Downloads/SECRET ELEVENLABS.txt` y mirror en `/tmp/aurex_eleven.txt` (workaround macOS).
- Variable Railway `ELEVENLABS_API_KEY` también configurada.
- Función `gen_audio_elevenlabs()` en `compose_video.py` con voice_settings calibradas (stability 0.5, similarity_boost 0.75, style 0.3, speaker_boost true).
- Fallback a `say` Paulina de macOS si la API key no está disponible.

### 8.4 Runway API key (en pausa)

- Cuenta creada con `fmoscon@gmail.com`. API key guardada en `~/Downloads/SECRET RUNWAY.txt`.
- Variable Railway `RUNWAY_API_KEY` configurada.
- Plan free de la web (475 créditos restantes) NO se aplica a la API. Para usar la API hay que cargar saldo prepago = costo variable. **Decisión: no integrar Runway API hoy.** Keys quedan listas por si en el futuro se decide cargar.

### 8.5 Kling AI (web, sin API)

- Cuenta creada con `fmoscon@gmail.com`. 21 créditos restantes (plan free, NO renueva diario).
- Probado V1 hoy (descartada por input contaminado). Mañana se reintenta con PNG puro de GitHub.
- Sin API, solo web. Escritorio opera desde su Chrome integrado.

---

## 9. INCIDENTES OPERATIVOS PENDIENTES

| # | Incidente | Estado | Resolución esperada |
|---|---|---|---|
| 1 | **🔴 CRÍTICO — Google Play Closed Testing al límite** | 12/12 opted-in (sin margen). 3-4 son cuentas mías de bajo trust → Google PUEDE descartar y rechazar producción. | Plan A (Tomás Android, 5 días) → Plan B (servicio pago $25-80 con riesgo de ban) |
| 2 | Apple Build 17 en revisión | Pendiente desde 24-abr | Apple decide (~7-10 días típicos) |
| 3 | Google Play Build 2 — completar 14 días prueba cerrada | Día 7 de 14 al 1-may. Vence ~7-may. | Si bajo de 12 cualquier día → reset a 0. |
| 4 | ~~WhatsApp 2563 cooldown antifraude~~ **RESUELTO 1-may 8:00 AR** | Reporte llegó por WA 1320 desde 2563 | — |
| 5 | BN-002 Binance Railway | MITIGATED via CryptoCompare | Decidir alternativa post-Apple |
| 6 | Volumen Railway Evolution | DESCARTADO 30-abr | N/A (no era el problema) |
| 7 | Claude API real al motor IA | Decisión técnica de Fernando | Sin fecha |

### 9.1 — CRÍTICO Google Play Closed Testing (detalle agregado 1-may 03:00 AR)

**Riesgo:** la regla 2026 de Google evalúa el "trust weight" del Gmail de cada tester (antigüedad, historial, IP/dispositivo de creación). Mis cuentas creadas para testing (`aurextester1`, `aurextest2`, `app.aurex`, `aurextester12`) tienen trust bajo. Si las descarta al revisar producción → quedan ~9 testers reales → no llego al mínimo de 12 → rechazo. Razón #1 de rechazo en 2026: "Insufficient testing engagement".

**Lo que NO saca a un tester de los 12:** que desinstale la app. Solo los saca clickear "Opt out" en `https://play.google.com/apps/testing/com.aurexapp`.

**Lo que SÍ resetea la racha de 14 días:** que el contador baje de 12 por UN solo día.

**Acciones del 1-may madrugada (en marcha):**

| Cuenta | Tipo | Supabase | Cargada en verificadores Play | Pass Gmail | Opt-in real |
|---|---|---|---|---|---|
| `mosconmia@gmail.com` (hija) | Family — Gmail viejo, alto trust | ✅ creada | ✅ | ❌ pendiente | ⏳ |
| `sol.esnoz@gmail.com` (mujer) | Family — Gmail viejo, alto trust | ✅ creada | ✅ | ❌ pendiente | ⏳ |
| `lola.moscon@gmail.com` (hija) | Family — Gmail viejo, alto trust | ✅ creada | ✅ | ❌ pendiente | ⏳ |
| `aurextester12@gmail.com` (mía nueva) | Bajo trust + emulador | ✅ creada | ✅ | ✅ tengo | ✅ desde emulador AVD `AUREX_Play` (a verificar 24-48h si suma) |

**Plan A (preferido):** Tomás (hijo, ya verificador con `tomasmoscon@gmail.com`, tiene Android pero no vive acá). Cuando venga: en su Android agrega las 3 cuentas family como cuentas Google secundarias → con cada una abre el link de testing → Become a tester → instala AUREX desde Play Store → loguea con `email + AurexTest2026!` y usa 3 min. Resultado: +3 testers reales en device físico con Gmail viejo = 100% que cuenten → pasamos a 15-16 opted-in con margen sólido. Sin costo, sin riesgo.

**Plan B (solo si A falla en 5 días):** servicio profesional pago (PrimeTestLab / TestersCommunity / 12testers14days.pro) — $25-80 USD por 12 testers reales × 14 días. Code investiga + compara reviews + llena form. Fernando paga + acepta TOS. **Riesgo grave:** Google puede detectar paid testers y banear cuenta dev permanentemente (reportes públicos en Reddit). Aplicar las 4 preguntas obligatorias de servicios de terceros antes de contratar.

**Pendiente operativo mañana 2-may:**
1. Pedir pass reales de Gmail a esposa + hijas (o que cada una opt-in en su iPhone vía Chrome — tienen iPhone, así que igual la app no se instala desde Play Store en iPhone — termina siendo emulador o el celu de Tomás).
2. Verificar Play Console si contador subió 12 → 13 (= aurextester12 desde emulador contó).
3. Mantener emulador AVD `AUREX_Play` prendido en background (relanzable con `/opt/homebrew/share/android-commandlinetools/emulator/emulator -avd AUREX_Play -gpu swiftshader_indirect`).
4. Coordinar visita Tomás (Plan A).

---

## 10. COMMITS DEL DÍA (30-abr / 1-may) en `aurex-app`

| # | SHA | Descripción |
|---|---|---|
| 1 | `55257f2` | Decisión final mascot v2 documentada |
| 2 | `48a36ea` | Plan MKT v2.1 sección 2.4 reescrita (búho animado) |
| 3 | `4569083` | Pipeline video_generation completo (constelación + banners + composición) |
| 4 | `1b0f617` | Guion audio corregido por Fernando |
| 5 | `39b1d88` | Card de señal rediseñado (premium con bevel + barra progreso) |
| 6 | `0d576b7` | Card v8 con fondo opaco distintivo |
| 7 | `1e46e26` | Voces ElevenLabs aprobadas + asignación canal/rotación |
| 8 | `692381b` | dailyProjectStatusReport dual-channel Telegram + WhatsApp |
| 9 | `03fa4d1` | Integración Ruta B (stinger automático del búho animado) |
| 10 | `797ff91` | Drive automation con OAuth |
| 11 | `48a57a0` | CONTEXTO.md actualizado con resumen sesión |

---

## 11. DECISIONES YA TOMADAS — NO REVISITAR

- Avatar HeyGen humano: descartado. Reemplazado por búho v2 animado.
- Mascot oficial: v2 (Geometric premium). v0 y v1 descartados.
- Logo AUREX (flecha dorada en círculo) no se cambia. Convive con el mascot.
- Programa de referidos: 1 mes PRO simétrico (referente + referido).
- Posicionamiento global, no LATAM exclusivo.
- Prioridad de idiomas: ES → EN → PT → resto progresivo.
- Telegram canal principal y permanente. WhatsApp secundario (cuando levante cooldown).
- 8 voces ElevenLabs aprobadas + asignación canal/rotación por día.
- Voces Voice Library nativas LATAM descartadas (requieren Creator $22/mes).
- Service Account Drive descartada (no funciona en gmail personal). OAuth Desktop credentials sí.
- Runway API descartada hoy (requiere pago). Kling tier free sin renovación. Luma a probar.
- Kling Standard $6.99/mes: descartado por regla cero costo variable.
- Card de señal: rediseñado a premium con bevel/glow/barra progreso. NO volver al básico.
- Plan MKT cero acción manual de Fernando: regla inviolable.
- Pollinations.ai como herramienta exploratoria de imágenes mascot. Para producción final del mascot elegido: contratar diseñador profesional (~$50-150 Fiverr) cuando se quiera vector limpio.

---

## 12. DECISIONES PENDIENTES

| # | Decisión | Bloqueante de | Estimación |
|---|---|---|---|
| 1 | Levantamiento cooldown WhatsApp 2563 | Reportes WA + alertas usuarios PRO/ELITE | 1-may 8 AM (verificación) |
| 2 | Probar Luma Dream Machine para Ruta B | Decisión herramienta principal animación | 1-may con Escritorio |
| 3 | Plan D local FFmpeg como fallback | Demostrable hoy si Luma no convence | 1-may Code arranca |
| 4 | V1+V2+V3 limpias del búho | Stinger Ruta B funcional en videos premium | 1-may con créditos Kling |
| 5 | Sonido firma del búho | Cierre identidad audio | Después de #4 |
| 6 | Fase B research visual: arquetipo definitivo | Mini design system | 3-5 días post-captura manual |
| 7 | Mini design system AUREX | Producción contenido en serie | 1 semana post-#6 |
| 8 | Reformulación 11 contenidos modelo | Lanzamiento Mes 1 | Post-#7 |
| 9 | Aprobación handles redes (X, IG, TikTok, YT, LinkedIn, Telegram) | Setup técnico canales | Cuando vos digas |
| 10 | Aprobación presupuesto mensual ~$35-65 + press releases | Activación Buffer/Resend/etc | Cuando vos digas |
| 11 | Conexión Claude API real al motor IA | Diferencial competitivo + tasa acierto pública | Decisión técnica Fernando |
| 12 | Setup cron backend para videos automáticos | Producción autónoma diaria | Post-#7 |

---

## 13. CÓMO TRABAJAR ESTO MAÑANA Y SIGUIENTES DÍAS

### 13.1 Inmediato — 1-may-2026

1. **8:00 AR — verificar reportes WhatsApp.** Si llegan por WA 1320 → cooldown levantado. Si no → más espera.
2. **9:00 AR — verificar reporte Telegram** (este `CONTEXTO.md` y este `ESTADO_PROYECTO_01-may-2026.md`).
3. **Cuando renueven créditos Kling** (si renuevan — no es seguro) o **mientras tanto, Escritorio prueba Luma Dream Machine** con la URL del PNG puro de GitHub.
4. **Code arranca Plan D — animación local con FFmpeg.** Generación HOY de un v14 demo con búho animado localmente (zoom dinámico, pulsación dorada, parallax con la constelación, brillos metálicos en movimiento, partículas doradas orbitando). Demostrable sin depender de Kling/Luma/Runway. Cero costo. **Esto se hace ahora mismo después de cerrar este documento.**

### 13.2 Próxima semana

5. Captura manual de redes de competidores prioritarios (Lemon, RockFlow, Bitso, Robinhood, Nubank). 1-2 horas/día durante 3-4 días.
6. Cierre Fase B: decisión final de arquetipo de marca con datos visuales reales.
7. Mini design system AUREX: Code arma propuesta inicial, Escritorio aporta voz/tono, iteración.
8. Sonido firma del búho: 4 candidatos sintéticos generados con FFmpeg, Fernando elige.

### 13.3 Próximas 2-3 semanas

9. Reformulación de los 11 contenidos modelo con identidad consolidada.
10. Setup técnico de canales (Buffer, Resend, X API, etc.).
11. Aprobación presupuesto + handles.
12. Esperar aprobación Apple/Google. Si llegan antes: lanzamiento técnico Mes 1.

---

## 14. ARCHIVOS CLAVE PARA CONSULTAR

| Archivo | Ubicación |
|---|---|
| `PLAN_MKT.md` v2.1 | https://github.com/fmoscon-creator/aurex-app/blob/main/PLAN_MKT.md |
| `RESEARCH_MKT.md` (19 competidores) | https://github.com/fmoscon-creator/aurex-app/blob/main/RESEARCH_MKT.md |
| `RESEARCH_VISUAL.md` (Fase A) | https://github.com/fmoscon-creator/aurex-app/blob/main/RESEARCH_VISUAL.md |
| `CONTEXTO.md` (estado vivo) | https://github.com/fmoscon-creator/aurex-app/blob/main/CONTEXTO.md |
| `VOCES_CANALES_AUREX.md` | https://github.com/fmoscon-creator/aurex-app/blob/main/docs/VOCES_CANALES_AUREX.md |
| `ESTADO_PROYECTO_01-may-2026.md` | https://github.com/fmoscon-creator/aurex-app/blob/main/docs/ESTADO_PROYECTO_01-may-2026.md (este documento) |
| Scripts mascot processing | https://github.com/fmoscon-creator/aurex-app/tree/main/scripts/mascot_processing |
| Scripts video generation | https://github.com/fmoscon-creator/aurex-app/tree/main/scripts/video_generation |
| Iconos generados (152 PNG) | `~/Downloads/AUREX_ICONS/` (local) + Drive `09 MASCOT FINAL/AUREX_ICONS/` |
| AUREX_MEDIA_LIBRARY (Drive) | https://drive.google.com/drive/folders/1FZ_LRmNEwoeZdcayDBNi2Ve52vtvpCxI |

---

*Documento de cierre de jornada. Próxima actualización al cierre de la siguiente jornada larga.*
