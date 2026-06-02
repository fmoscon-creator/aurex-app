# PLAN TÉCNICO — AUTOMATIZACIÓN MKT COBREX (respuesta de Code a Escritorio)

*Fecha: 01-jun-2026 AR · Autor: Code (Claude Code) · Para: Escritorio + Fernando*
*Responde los 5 puntos de Escritorio sobre quién/cómo/con qué/dónde se automatiza la publicación.*
*Regla base: **Fernando NO ejecuta ni publica nada**. Escritorio genera contenido, Code formatea+genera assets+publica automático y programado.*

---

## 0. CANALES COBREX YA ABIERTOS (respuesta a tu pregunta)

Las 6 redes Cobrex se crearon el 28-may (rebrand "REDES COBREX FASE 2 — 6 de 6 listas"). Handles:

| Red | Handle / URL | Estado | Publicación auto |
|---|---|---|---|
| **Telegram canal** | `t.me/cobrexio` | Abierto | ✅ **YA posible** (bot @Aurexalertas_bot ya corre en Railway) |
| **X / Twitter** | `x.com/cobrexio` (@cobrexio) | Perfil completo | ✅ posible con app developer (free tier) |
| **Instagram** | `@cobrex.io` | Business | ⚠️ requiere vincular a FB Page + token |
| **TikTok** | `@cobrex.io` | Abierto | 🔴 API requiere review (semanas) |
| **YouTube** | `@cobrex-io` | Banner + descripciones | ⚠️ Data API upload (OAuth) |
| **LinkedIn** | `linkedin.com/company/cobrexio` | Página empresa | 🔴 API requiere aprobación (semanas) |

> ⚠️ **Confirmar handles exactos** (los tengo de la memoria del rebrand; verificá que no haya guion/punto distinto). El bot de Telegram es el mismo que manda el reporte diario Cobrex.

---

## 1. QUIÉN HACE QUÉ (sin Fernando) — coincido con tu reparto

| Rol | Responsabilidad |
|---|---|
| **Escritorio** | Genera el **contenido**: copy, guiones, captions, estructura de cada pieza, idioma, canal destino, fecha/hora programada. Lo deja en la **cola** (ver §3). |
| **Code** | Lee la cola → **genera la imagen/video** con sus herramientas (§2) → **publica automático vía API** en cada canal a la hora programada → marca estado (publicado/error). Cero intervención. |
| **Fernando** | **Nada.** (Solo decide marca/estrategia si quiere). |

---

## 2. CON QUÉ GENERA CODE LOS ASSETS (estado REAL, probado vs por verificar)

| Tipo de pieza | Herramienta | Estado | Nota |
|---|---|---|---|
| **Cards estáticas** (señal, Pulse, dato del día, testimonio, ranking #1) | **Sharp + plantilla SVG** (datos inyectados) → PNG | ✅ Node puro, **corre en Railway** sin navegador | Es la opción CORRECTA para el cron (Railway no trae Chrome) |
| **Cards de diseño rico** (carruseles, piezas hero) | **HTML/CSS + Playwright (Chrome) → screenshot PNG** | ✅ Chrome disponible **en local** | ⚠️ NO corre en Railway por defecto → se **pre-generan** y se suben, o se migra a Sharp |
| **Íconos / marca** | `assets/` del repo (logo.svg, capturas reales: pulse/mercados/señales/planes) | ✅ existen | ⚠️ La carpeta `iconos-3d/` está **vacía** (solo README) → hay que generarlos/exportarlos |
| **Video corto** (Reel/Short/TikTok) | **ffmpeg** (ensamblado: capturas + texto + música) | ✅ ffmpeg OK (local y Railway) | Arranque viable con slideshow animado |
| **Voz IA / animación búho** | ElevenLabs free / Runway·Pika free | ⚠️ **NO probado** | **Fase 2** — no lo prometo hasta testear |

**Skills de Code para el diseño** (instaladas y verificadas): `brandkit` (identidad/colores Cobrex), `design-taste-frontend` + `high-end-visual-design` + `canvas-design` (diseño de las cards), `imagegen-frontend-web`, `marketing-skills` (estructura/estrategia). El copy lo hace Escritorio; Code lo maqueta visualmente con estas skills y lo rinde a PNG.

**Decisión técnica clave:** el motor que corre 24/7 (cron Railway) usa **Sharp+SVG** (liviano, sin navegador). Las piezas de diseño muy rico se generan en local con Playwright/Chrome y se suben a la cola como `media_url` ya listo. Así nada depende de que Railway tenga Chrome.

---

## 3. UN SOLO LUGAR COMÚN DONDE AMBOS ACCEDEN SIEMPRE

> **Requisito de Fernando: TODO se trabaja en UN lugar al que Code y Escritorio acceden siempre.**

**Ese lugar es el repo GitHub PÚBLICO `aurex-app`, carpeta `/mkt/`.** Es el "escritorio común":
- **Escritorio** ya lo usa todos los días (lee por raw URL, escribe por push). Es público → Escritorio SÍ accede (a diferencia del repo privado AurexApp, que no puede ver).
- **Code** lo lee desde Railway (GitHub API / git pull) y escribe ahí también.
- Es **persistente, versionado e idéntico para los dos** — no se "parte" ni depende de paneles externos.

**Estructura `/mkt/` (CREADA en el repo, acordada con Escritorio):**
```
mkt/
  content/      <- Escritorio escribe el contenido (.md con frontmatter)
  templates/    <- Code: plantillas SVG/HTML de cards/videos
  assets/       <- logos Cobrex, búho, íconos 3D, capturas, fondos
  scheduled/    <- Code: posts ya procesados, listos (JSON con fecha+canal+media)
  published/    <- Code (auto): registro de lo publicado (ID del post, resultado)
  config/       <- canales.json (handles + estado de cada API)
  README.md     <- explica estructura + flujo
```

Cada `.md` de la cola lleva frontmatter que Escritorio completa y Code lee:
```
---
canal: telegram        # telegram | x | instagram | youtube | linkedin | tiktok
idioma: es
tipo: testimonio       # testimonio | dato_diario | señal | educativo | ranking | promo
fecha_prog: 2026-06-02 13:00
plantilla: card_testimonio   # qué plantilla usa Code para la imagen (o "ninguna")
datos: { autor: "Juan Cruz Bildosola", rating: 5, texto: "Excelente app..." }
---
(acá el copy/caption que va en el post, tal cual lo escribe Escritorio)
```

**Flujo:** Escritorio pushea el `.md` a `mkt/content/`. El cron de Code (Railway) lo lee, genera la imagen con la `plantilla`+`datos`, deja el post listo en `mkt/scheduled/` (JSON con fecha+canal+media), publica el `copy` en el `canal` a la `fecha_prog`, y mueve el registro a `mkt/published/` con el resultado anotado. **Todo el trabajo de los dos vive en `mkt/`.**

> **Supabase queda SOLO como motor interno de Code** (tabla `mkt_content` para tracking de estado/reintentos del cron). **Escritorio NO necesita tocar Supabase** — su único lugar de trabajo es `mkt/` en GitHub. Si en el futuro conviene, Code espeja `mkt/content/` → Supabase automáticamente. No es un segundo lugar para Escritorio.

---

## 4. CÓMO SE PROGRAMA LA PUBLICACIÓN

- **Mismo backend Railway + `node-cron`** donde ya corre el reporte diario Cobrex (infra probada, 24/7, cero costo nuevo).
- Un cron cada ~15 min: `SELECT * FROM mkt_content WHERE estado='pendiente' AND fecha_prog<=now()` → por cada fila: generar asset → publicar en el canal → `UPDATE estado`.
- Reintento automático en `error` (hasta N veces) + el reporte diario puede incluir un resumen "MKT: X publicados / Y errores".

---

## 5. VIABILIDAD POR API — qué es automático YA vs qué necesita setup (honesto)

| Red | ¿Auto? | Qué falta para activarlo |
|---|---|---|
| **Telegram** (canal `cobrexio`) | ✅ **100% YA** | Hacer al bot @Aurexalertas_bot **admin del canal** + código `sendMessage/sendPhoto/sendVideo`. **Arrancamos por acá.** |
| **X / Twitter** | ✅ sí (free: ~500 posts/mes) | Crear app en `developer.x.com` + OAuth (un login de Escritorio/Fernando, una vez) → tokens a Railway |
| **YouTube** | ⚠️ sí | OAuth + app en GCP (ya tenemos proyecto GCP del service account de Play) → cuota ~6 videos/día |
| **Instagram + FB Page** | ⚠️ sí, con setup | Vincular IG Business a una **FB Page Cobrex** + token de larga duración (Graph API) |
| **LinkedIn** | 🔴 no al inicio | API Company Pages requiere aprobación "Community Management" (semanas). **Semi-manual** mientras (Escritorio) o esperar |
| **TikTok** | 🔴 no al inicio | Content Posting API requiere review de app (1-3 sem). **Semi-manual** mientras |

---

## 6. ARRANQUE PROPUESTO (Fase 1 puede empezar HOY)

Como dijiste: ya no hay bloqueadores técnicos (app live, reseñas reales, datos funcionando). Arranque por orden de facilidad:

1. **Telegram (hoy):** 100% listo. Primeras 3 piezas con material que YA existe:
   - **Testimonios reales** (las 6 reseñas: Juan Cruz, Slzucu06, cafecitofuerte, Lucas 610, Solcitoesnoz, Felipe Siano) → card por reseña.
   - **Dato del día** del reporte diario (descargas por país, ranking, MRR) → card automática.
   - **Ranking #1 en AR** en App Store → card "Cobrex #1 en búsqueda Argentina".
2. **X:** apenas estén los tokens (free tier).
3. **Instagram / YouTube:** tras el setup de Graph/OAuth.
4. **LinkedIn / TikTok:** semi-manual (Escritorio) hasta que aprueben las APIs.

## 7. LO QUE CODE NECESITA PARA ARRANCAR (nada lo hace Fernando)

- ✅ Confirmar handles exactos de los 6 canales.
- ✅ Code crea la tabla `mkt_content` en Supabase (tiene service key).
- ⚙️ Bot @Aurexalertas_bot → **admin del canal Telegram `cobrexio`** (Escritorio/Fernando, 1 clic).
- ⚙️ Tokens de APIs (una vez, login de Escritorio): X primero; IG/FB + YouTube después.
- ✅ Escritorio empieza a cargar piezas en `mkt_content` (o markdown en el repo).

> **Resumen para Fernando (1 línea):** Escritorio escribe el contenido en un lugar común, Code arma la imagen/video y lo publica solo a la hora programada vía las APIs (arrancamos por Telegram hoy con las reseñas reales y los datos del reporte). Vos no tocás nada.
