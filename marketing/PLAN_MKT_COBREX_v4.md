# PLAN DE MARKETING COBREX — v4.5

*Fecha: 02-jun-2026 AR · Autor: Code, consolidado con Escritorio · Pendiente OK formal de Fernando*
*Reemplaza v4.4…v4.0. Reemplaza toda la era AUREX (v1–v3).*
*FUENTE ÚNICA del sistema de diseño y de cómo se produce y publica cada contenido. Si no está acá, no está definido.*

## CHANGELOG v4.4 → v4.5
- **Nuevo §15: CHECKLIST DE AVANCE (tablero vivo)** — estructural / contenido / grilla-cronograma / **OK de cada parte (Escritorio · Code · Fernando)**. Se actualiza cada día/sesión con el avance real. Es el control de progreso del plan.

## CHANGELOG v4.3 → v4.4
- §14: **D0 deja de ser fecha fija (era "9-jun", irreal).** Ahora D0 = cuando los prerequisitos 1–6 estén ✅ + OK de Fernando. Timeline RELATIVO a D0 (no calendario). Realismo: hoy falta completar el banco y configurar las redes para automático → **D0 será más adelante, no esta semana.** LinkedIn/TikTok no bloquean (Fase 2).

## CHANGELOG v4.2 → v4.3
- §6.b: **replicación a Dropbox como regla operativa permanente** (no dos lugares, el mismo banco en dos ubicaciones sincronizadas).
- §14: **eliminado** el item "confirmar handles" (ya confirmados en §10, era contradicción interna).
- §11: **pasos exactos del setup de Instagram** (quién crea la FB Page, quién genera el token, dónde se guarda).
- §9: **YouTube desarrollado** con su tabla de tácticas (como IG/Telegram).
- §12: **métricas con proceso** (quién mide, cuándo, dónde se reporta).
- §14: **línea de tiempo con fechas reales** (D0 + dependencias), no "semanas" abstractas.

## CHANGELOG v4.1 → v4.2
- **Nuevo §6.b: BANCO DE ASSETS (paso 0)** — estructura `mkt/assets/` con `fuentes/` (material base que crece) + `por-canal/` (exportado al formato/peso de cada red) + specs por canal. **Poblado** con búho v2, capturas web, banners; videos de la web y capturas de la app **indexados** (viven en sus repos, no se duplican en Git).
- **Handles CONFIRMADOS** (§10) del doc oficial `REDES_SOCIALES_COBREX.md`: el punto en IG/TikTok ES válido (no era error). Se quita "[POR CONFIRMAR]".
- Aprovechar imágenes/videos de la web cobrex.io para alternar y dar a conocer la web.

## CHANGELOG v4.0 → v4.1
- **Nuevo §2: análisis y prioridad de los 6 canales con criterio ESTRATÉGICO (audiencia AR), no técnico → Instagram es #1.**
- **Regla "nada manual" reforzada:** ningún canal se activa sin automatización 100%. Se elimina toda "publicación manual". LinkedIn/TikTok = en espera de API.
- Plan de APIs (§11): qué se saca hoy (IG, YouTube) vs qué queda en cola de aprobación (LinkedIn, TikTok).
- §3 diseño: token `border-gold` (oscuro), renombrado `textNavy` (claro), criterio de debut del búho, fallback de Boldonse.
- §4: nuevo tipo 4.11 "Alerta de mercado"; banco de preguntas en 4.7; comparativas bloqueadas hasta semana 6; guion de video se produce desde ya.
- §9 adquisición: tácticas **diferenciadas por canal** (no lista genérica).
- Nuevos §12 (métricas de éxito) y §13 (frecuencia por canal).
- Handles Instagram y TikTok marcados **[POR CONFIRMAR]**.

---

## 🛑 REGLA MADRE (no negociable)
**NADA se publica sin OK FORMAL y FINAL de Fernando.** La automatización le saca el trabajo manual, no el control. Toda pieza queda en `pendiente_ok` → Fernando aprueba → recién ahí el cron publica.

## 🤖 REGLA "CERO MANUAL" (no negociable)
**Ningún canal se activa sin automatización 100% lista.** No existe "publicar a mano". Si un canal no tiene API hoy, queda **en espera** y **no se le produce contenido** hasta tener el motor. Las APIs que dependen de nosotros se sacan **ahora**; las que requieren aprobación de la plataforma se **solicitan ahora** y se espera.

---

## 1. ESTADO REAL (02-jun-2026)

| Frente | Estado |
|---|---|
| **iOS** | ✅ Cobrex v1.1 (38) publicado. #1 búsqueda "cobrex" AR. Rating AR 4.7★ (7). 6 reseñas reales. |
| **Android** | ✅ Cobrex v1.0.37, 177 países. Instalaciones por país (reporte diario). |
| **Web/PWA** | ✅ cobrex.io + PWA en cobrex.io/app. |
| **Redes** | 6 canales abiertos, **0 seguidores**. |
| **Datos** | Reporte diario automático (descargas/país, ranking, reseñas, MRR) = material real. |

---

## 2. ANÁLISIS Y PRIORIDAD DE CANALES (criterio ESTRATÉGICO, no técnico)

> **Por qué este §existe:** el orden previo (Telegram/X primero) salió de un criterio TÉCNICO (qué API estaba lista), no de dónde está la audiencia. Se corrige. **La prioridad se decide por audiencia real en AR**, no por facilidad de conexión.

**Dos ejes distintos (no confundir):**
- **Prioridad de inversión de contenido** = dónde está la audiencia → manda Instagram.
- **Orden de encendido técnico** = qué se puede activar antes → no define el foco.

| Canal | Audiencia AR | Contenido que funciona | API lista | **Prioridad de contenido** |
|---|---|---|---|---|
| **Instagram** | ✅ Alta (contactos de Fernando + finanzas visuales) | cards, reels, carruseles | ⚠️ FB Page + token (**horas**) | **#1** |
| **Telegram** | ✅ Inversores AR (grupos activos) | texto+imagen, alertas, datos | ✅ lista | **#2** |
| **YouTube** | ✅ Educativo AR | shorts, tutoriales | ⚠️ OAuth (**horas**) | **#3** |
| **X** | ⚠️ Menor en AR, más global | texto + datos | ✅ lista | **#4** |
| **LinkedIn** | ⚠️ B2B, baja penetración retail AR | artículos, logros | 🔴 aprobación (**semanas**) | **#5** (en espera de API) |
| **TikTok** | ✅ Jóvenes AR, alto alcance orgánico | video corto | 🔴 aprobación (**semanas**) | **#6 / Fase 2** (en espera de API) |

**Decisiones que salen de este análisis:**
1. **Instagram es el canal de mayor inversión de contenido.** El setup de IG (FB Page + vincular IG Business + token de larga duración) se hace **ya** — son horas, no semanas (≠ LinkedIn).
2. **Telegram se enciende en paralelo** (ya está listo) pero **no es el foco** de contenido; sirve para los inversores AR y para el reporte público.
3. **YouTube** se prepara (OAuth) para educativo.
4. **X** es secundario (mejor para escalar global, no para tracción AR inicial).
5. **LinkedIn y TikTok** quedan **en espera de API** — **no se produce contenido** para ellos hasta tener el motor (cero manual).

---

## 3. SISTEMA DE DISEÑO COBREX

> Dos modos: **oscuro** y **claro**. El contenido alterna entre ambos (§3.3).

### 3.1. Paleta MODO OSCURO (cobrex.io, real)
| Token | Hex | Uso |
|---|---|---|
| bg | `#080400` | fondo base |
| bg-soft | `#0D0800` | fondo secundario |
| bg-card | `#100A02` | cards |
| **border-gold** | `rgba(212,160,23,0.25)` línea / `#D4A017` sólido | **separadores y borde de cards en oscuro** (NUEVO v4.1) |
| gold | `#D4A017` | dorado principal |
| gold-bright | `#F5C842` | acentos |
| gold-intense | `#FFE082` | highlights |
| text | `#F5F0E8` | texto (crema) |
| text-sec | `#A0958A` | secundario |
| alcista `#22C55E` · bajista `#FE3944` · Motor IA `#6366F1` · Pulse `#EC4899` | | señales / features |

### 3.2. Paleta MODO CLARO — C2 "Navy and Gold" (spec oficial, Dropbox)
| Token | Hex | Uso |
|---|---|---|
| backgroundPrimary | `#EEF1F7` | fondo screens |
| backgroundCard | `#FFFFFF` | cards/modales |
| navBackground | `#0D1017` | navbar/barras (navy) |
| **textNavy** | `#0D1017` | **títulos/precios** (renombrado v4.1 para no confundir con navBackground, mismo hex) |
| accentGold | `#F5C518` | dorado principal |
| accentGoldMuted | `#C8910A` | dorado sobre fondo claro |
| textSecondary | `#556070` | subtítulos/labels |
| borderColor | `#DDE2EE` | bordes/separadores |
| alcista `#22C55E` · bajista `#EF4444` · neutral `#F59E0B` · Motor IA `#6366F1` · Pulse `#EC4899` | | señales/features |

### 3.3. Regla de alternancia claro/oscuro
- **Oscuro** = premium / marca / "cierre de mercado" / testimonios elegantes.
- **Claro** = datos / educativo / "apertura de jornada" / capturas en modo claro.
- Alternar en la semana para dar ritmo y mostrar ambos modos de la app. Campo `modo` en el frontmatter.

### 3.4. Tipografías
- **Display/títulos:** `Boldonse` (impacto). ⚠️ **Existe en Google Fonts pero NO está instalada local** → en el render se carga vía Google Fonts (Playwright con internet); **fallback `Manrope` 800** si no carga (Sharp/SVG usa directamente Manrope 800). Confirmar en el primer render real.
- **Cuerpo/UI:** `Manrope`. **Datos/números:** `JetBrains Mono`. **Quotes:** `Cormorant Garamond`.

### 3.5. Logo, wordmark y mascota búho
- **Logo principal:** símbolo Cobrex + wordmark "Cobrex" (Manrope 800, gold). En TODAS las piezas. (No usar emoji 🦉.)
- **Mascota búho:** existe oficial (`Dropbox/AUREX/ICONS - MASCOT - USO/`, búho v2 ambos modos).
- **Criterio de debut del búho (NUEVO v4.1):** **aparece a partir de la publicación #10 o la semana 3, lo que llegue primero.** Hasta ahí, solo logo (construir reconocimiento). Después, el búho suma personalidad en piezas narrativas/video, sin competir con el logo.

### 3.6. Elementos fijos
- **Badges App Store + Google Play** en toda pieza de descarga (faltan bajar a `mkt/assets/badges/`).
- **CTA** según objetivo ("Seguinos @cobrexio", "Descargala 👉 cobrex.io").
- **URL + logo** siempre. **Fondo con identidad** (gráfico financiero sutil), nunca plano.

---

## 4. CATÁLOGO DE TIPOS DE CONTENIDO

> Ficha: qué · modo · diseño · assets · skills/programas · quién · dónde. Render: Code. Copy + spec creativo: Escritorio.

### 4.1. Testimonio — modo oscuro · `Cormorant` quote + 5★ + logo + autor/país. Skills: `brandkit`+`high-end-visual-design` → Playwright/Sharp. Escritorio copy, Code render.
### 4.2. Dato del día — modo claro · número grande `JetBrains Mono` + país. Skills: `high-end-visual-design`+`social-content` → **Sharp+SVG** (automatizable desde el reporte). Code automático, Escritorio aprueba ángulo.
### 4.3. Ranking / logro — oscuro/claro alternado · "#1" gigante + badges. Skills: `marketing-psychology`+`high-end-visual-design`. Escritorio copy, Code render.
### 4.4. Educativo (40% mix) — modo claro, carrusel · capturas reales de la app + pasos. Skills: `content-strategy`+`content-production`+`high-end-visual-design` → Playwright. Escritorio guion, Code carrusel.
### 4.5. Feature highlight — alternado, color del feature (Pulse rosa / IA indigo) · mockup + claim. Skills: `copywriting`+`image-to-code`+`high-end-visual-design`. Escritorio claim, Code diseña.
### 4.6. Comparativa vs competidores — **🔴 BLOQUEADO hasta semana 6** (NUEVO v4.1): no tiene impacto sin audiencia y **no se menciona competidores por nombre las primeras semanas**. Cuando se active: `competitor-alternatives`+`marketing-strategy-pmm`; **Fernando aprueba**.
### 4.7. Pregunta / conversación — alternado, simple. **Banco base de preguntas (NUEVO v4.1; Escritorio amplía a 10):** "¿Qué activo seguís más de cerca?" · "¿Bitcoin u oro como refugio hoy?" · "¿Mirás el dólar o el MERVAL primero a la mañana?" · "¿Cuántos activos tenés en tu watchlist?" · "¿Comprarías CEDEARs hoy o esperás?". Skills: `social-content` → Sharp/SVG.
### 4.8. Detrás de escena (20%) — oscuro narrativo, **acá puede aparecer el búho** (post semana 3). Skills: `content-humanizer`+`copywriting`.
### 4.9. Anuncio / promo (10% techo) — oscuro premium, **badges obligatorios** + CTA fuerte. Skills: `launch-strategy`+`copywriting`+`high-end-visual-design`. **Fernando aprueba**.
### 4.10. Video corto (Reel/Short/TikTok) — **Fase 2 para el render** (ffmpeg; voz IA/animación no prometidas). **Pero el GUION en texto se produce desde ya** en `mkt/content/` (NUEVO v4.1) para no perder ideas. Skills: `video-content-strategist`.
### 4.11. **Alerta de mercado / Dato externo + contexto Cobrex (NUEVO v4.1)** — modo claro o oscuro según hora · cuando hay evento relevante (suba de tasa FED, inflación AR, movimiento MERVAL) Cobrex publica "contexto rápido" usando **sus propias métricas** (GDELT, Pulse, 24 variables). **Alta relevancia en el momento + diferenciador** frente a otras apps. Skills: `social-content`+datos internos → Sharp+SVG (rápido). Escritorio dispara el ángulo, Code arma con datos. ⏱️ Sensible al tiempo → flujo de aprobación ágil.

---

## 5. SKILLS Y PROGRAMAS POR TAREA (resumen; detalle en PLAN_TECNICO §8)
- **Diseño (Code):** `brandkit`, `high-end-visual-design`, `design-taste-frontend`, `canvas-design`, `imagegen-frontend-web`, `minimalist-ui`, `image-to-code`.
- **Render (Code):** Sharp+SVG (cron Railway) · Playwright+Chrome (piezas ricas) · ffmpeg (video).
- **Copy (Escritorio genera, Code pule):** `copywriting`, `copy-editing`, `content-humanizer`, `content-production`.
- **Redes/estrategia (Code):** `social-media-manager`, `social-content`, `x-twitter-growth`, `social-media-analyzer`, `marketing-strategy-pmm`, `launch-strategy`, `competitor-alternatives`, `marketing-psychology`.
- **SEO/ASO (Code):** `app-store-optimization`, `seo-audit`, `schema-markup`, `site-architecture`, `programmatic-seo`, `ai-seo`.
- **Adquisición (Code):** `paid-ads`, `referral-program` (cuando aplique).

**Herramientas de Escritorio (su columna):** ChatGPT/**DALL-E** (imágenes IA: fondos, ilustraciones, **búho**) + **Canva IA** (composiciones) + genera **prompts de imagen** para Code + **spec visual** de cada card + **calendario editorial**. **Capturas de la app:** ya hay material en `assets/` (ES+EN); si hace falta una nueva, Escritorio la genera/solicita.
**Reasignación (NUEVO v4.1):** la **traducción al inglés del copy maestro la hace Escritorio** (decisión creativa). **Code traduce los idiomas restantes** (PT, etc.) una vez validado el EN.

---

## 6. DÓNDE SE GUARDA (repo `aurex-app` → `/mkt/`)
```
mkt/ content/ (Escritorio .md) · templates/ (Code) · assets/ (logo, capturas, badges, búho, fondos; /generadas/ /badges/) · scheduled/ (Code, JSON) · published/ (registro) · config/ (canales.json)
```
Frontmatter `.md`: `canal · idioma · tipo · modo · fecha_prog · plantilla · datos` + copy. Supabase = motor interno de Code (estado/reintentos). **Escritorio solo toca `mkt/`.**

---

## 6.b BANCO DE ASSETS (PASO 0 — antes que el contenido)

> Detalle completo y specs en `mkt/assets/README.md`. **Base de inicio que siempre crece y mejora.**

```
mkt/assets/
  fuentes/      material base (logos, iconos-3d, mascota-buho, capturas-app[idx], capturas-web, videos-web[idx], fondos, badges, templates)
  por-canal/    exportado al FORMATO/PESO de cada red (instagram, tiktok, youtube, x, telegram, linkedin)
  generadas/    piezas finales listas
```

**Specs por canal** (resumen; tabla completa en el README): Instagram 1080×1080 / 1080×1350 / 1080×1920 · TikTok 1080×1920 · YouTube short 1080×1920 + thumb 1280×720 · X 1600×900 · Telegram 1080×1080 · LinkedIn 1200×627. Code optimiza el peso y **nunca sube un formato que el canal no permita**.

**Criterio (decisión Code):** las **imágenes y material de marca** van al banco en GitHub (livianos); los **videos pesados NO se duplican en Git** (lo inflaría) → se **indexan** apuntando al repo `cobrex` (`assets/video/`: hero, MOTOR, ALERTAS, PULSE, COBERTURA) donde ya están versionados; las **capturas de la app** se indexan a `aurex-app/assets/`.

**✅ Ya poblado:** búho v2 (claro+oscuro) + doc · 14 capturas web · banners X/YouTube/LinkedIn · índices de videos-web y capturas-app.
**Falta cargar:** logo Cobrex SVG, íconos 3D, badges App Store+Google Play, fondos con gráfico financiero.
**Aprovechar la web:** alternar imágenes/videos de cobrex.io cada X posteos → variedad + dar a conocer la web (no hay que generar nada nuevo para arrancar).
**🔁 REGLA DE SINCRONIZACIÓN (permanente, no negociable):** *"El banco se replica siempre en `Dropbox/AUREX/BANCO IMAGENES REDES SOCIALES COBREX/` — cualquier asset que entre al banco en GitHub entra también al Dropbox. No son dos lugares, son el mismo banco en dos ubicaciones sincronizadas."* Operativamente: cada commit que toque `mkt/assets/` lo sigue una copia a esa carpeta de Dropbox; ambos lados quedan idénticos. (Ya replicado, 02-jun.)

---

## 7. QUIÉN HACE QUÉ (sin Fernando en ejecución; sin pasos manuales)
| | Escritorio | Code |
|---|---|---|
| Copy/guiones (incl. **traducción EN**) | ✅ | pule |
| Spec visual / imágenes IA / búho | ✅ | integra/renderiza |
| Calendario editorial | ✅ | ejecuta |
| Render PNG/video, traducción PT+resto | — | ✅ |
| Publicación por API | — | ✅ (solo canales con API) |
| Comunidad/replies | ✅ | — |
> **Se elimina toda "publicación manual".** Canal sin API = en espera, sin contenido.

---

## 8. FLUJO + GATE
Escritorio `.md`→`content/` → Code genera asset → `scheduled/` estado `pendiente_ok` → **Fernando OK** → `aprobado` → cron publica (solo aprobado) → `published/`.

---

## 9. ADQUISICIÓN DE AUDIENCIA — táctica DIFERENCIADA por canal
> Hoy: 0 seguidores. El contenido no crece solo. Tácticas por canal (responsable · cuándo · KPI):

### Instagram (#1)
| Táctica | Responsable | Cuándo | KPI mínimo |
|---|---|---|---|
| Invitar a contactos de Fernando a seguir | Fernando/Escritorio | semana 1 | 30 seguidores iniciales |
| Reels con alcance orgánico (3/sem) | Code render + Escritorio guion | semana 1+ | alcance >500/reel |
| Hashtags finanzas AR + colaboraciones | Escritorio | semana 2+ | — |

### Telegram (#2)
| Táctica | Responsable | Cuándo | KPI |
|---|---|---|---|
| **Banner in-app "Unite al canal Cobrex"** (pantalla inicio, feature flag) | Code (app) | ASAP | 10% usuarios → seguidores |
| Paso en onboarding "Unite a la comunidad" | Code (app) | semana 2 | — |
| Reporte público (sin datos sensibles) como contenido de valor | Code | semana 1+ | — |
| Aporte orgánico en grupos de inversores AR | Escritorio | semana 2+ | — |

### YouTube (#3)
| Táctica | Responsable | Cuándo | KPI mínimo |
|---|---|---|---|
| Tutoriales educativos "Cómo usar Cobrex Pulse / Mercados / Alertas" (shorts + 1 video largo) — capturan búsqueda long-tail | Escritorio guion + Code edición (ffmpeg) | cuando esté OAuth | 1 short/sem |
| SEO de YouTube: títulos/descripción/tags con keywords de inversión AR | Code (`ai-seo` + `app-store-optimization` aplicados a YouTube) | con cada video | aparecer en búsqueda de la keyword |
| Thumbnails con identidad Cobrex (1280×720) | Code (`high-end-visual-design`) | con cada video | CTR >4% |
| Reutilizar shorts en Reels IG + TikTok (cuando estén) | Code | continuo | — |

### X (#4) / LinkedIn (#5) — bajo esfuerzo hasta tener tracción (datos/FinTwit en X; logros/credibilidad en LinkedIn cuando haya API).
### Pauta paga (`paid-ads`): **solo cuando haya piezas aprobadas y publicadas** — nunca para llevar tráfico a un canal vacío.

---

## 10. CANALES — HANDLES
| Red | Handle | API |
|---|---|---|
| Telegram | `t.me/cobrexio` ✅ | lista (bot admin verificado) |
| X | `x.com/cobrexio` ✅ | credenciales cargadas |
| YouTube | `@cobrex-io` ✅ | falta OAuth |
| LinkedIn | `company/cobrexio` ✅ | aprobación (semanas) |
| **Instagram** | `cobrex.io` ✅ (instagram.com/cobrex.io — el punto ES válido en IG) | FB Page + token |
| **TikTok** | `@cobrex.io` ✅ (tiktok.com/@cobrex.io) | aprobación (semanas) |

> **Handles confirmados del doc oficial** `Dropbox/AUREX/REDES SOCIALES/REDES SOCIALES DE COBREX/REDES_SOCIALES_COBREX.md` (registrados 27-28 may). Mail de registro `cobrex@cobrex.io`. YouTube Channel ID `UCXb6q8eZsHPP4nu6yYm0diA`. Bio común (4 líneas EN) y banners en ese mismo doc/carpeta.

---

## 11. PLAN DE APIs — qué se saca AHORA vs qué queda en cola
| API | Depende de | Acción | ETA |
|---|---|---|---|
| Telegram | — | ✅ lista | hecho |
| X | — | ✅ credenciales cargadas; falta probar posteo | hoy |
| **Instagram Graph** | nosotros | **PRIORITARIO — pasos exactos abajo ↓** | **horas** |
| **YouTube Data** | nosotros | OAuth + app en GCP (reusar proyecto del SA de Play) | horas |
| LinkedIn | aprobación Meta/LinkedIn | **solicitar Community Management API hoy** | semanas (no controlable) |
| TikTok | aprobación TikTok | **solicitar Content Posting API hoy** | semanas (no controlable) |
> Las que dependen de nosotros se sacan ya; las de aprobación externa se **piden ya** y se espera. **Cero manual mientras tanto.**

**Setup Instagram — pasos exactos (quién hace qué):**
| # | Paso | Quién | Dónde queda |
|---|---|---|---|
| 1 | Crear la **FB Page "Cobrex"** (si no existe) | **Escritorio** (navegador, sesión de Fernando) | facebook.com |
| 2 | Vincular la cuenta **IG Business `cobrex.io`** a esa FB Page | **Escritorio** (Meta Business Suite / app IG → Configuración) | Meta |
| 3 | Crear **app en developers.facebook.com** + producto Instagram Graph + permisos `instagram_content_publish`, `pages_show_list`, `instagram_basic` | **Escritorio** (navegador) | Meta for Developers |
| 4 | Generar **token de larga duración** (long-lived, ~60 días, renovable) + obtener **IG Business Account ID** + **Page ID** | **Escritorio** (Graph API Explorer) | — |
| 5 | **Guardar** token + IG Account ID + Page ID | **Escritorio → Railway** (vars `IG_ACCESS_TOKEN`, `IG_BUSINESS_ID`, `FB_PAGE_ID`) o archivo `SECRET/` — **NUNCA por chat** | Railway |
| 6 | Montar el **publicador** (Graph API: `POST /{ig-id}/media` → `POST /{ig-id}/media_publish`) + renovación automática del token | **Code** | backend Railway |
> Resultado: Instagram (canal #1) con publicación 100% automática. Pasos 1–5 (navegador) los hace Escritorio; el 6 (código) lo hace Code.

---

## 12. MÉTRICAS DE ÉXITO (¿cuándo sabemos que funciona?)
| Métrica | Objetivo | Quién mide | Frecuencia | Dónde se reporta |
|---|---|---|---|---|
| Seguidores Instagram | 50 a semana 4 | Code (Graph API) | semanal | grupo Telegram "Cobrex Performance" + Sheet |
| Seguidores Telegram | 50 a semana 4 | Code (Bot API getChatMemberCount) | semanal | ídem |
| Descargas atribuibles a redes (UTM `?utm_source=ig/tg…`) | 10% del total | Code (links UTM + reporte de descargas) | semanal | ídem |
| Engagement rate por tipo de contenido | >3% | Code (`social-media-analyzer` + APIs) | semanal | ídem |
| Alcance/impresiones por pieza | crece semana a semana | Code (APIs por red) | semanal | ídem |

**Proceso (no intención):** Code agrega un **bloque "MKT" al reporte de Telegram** (mismo sistema que el reporte de performance) que cada **lunes** trae estas métricas vía las APIs de cada red + las guarda en el Sheet (histórico). Si una métrica no llega al objetivo 2 semanas seguidas → se ajusta el tipo/frecuencia de contenido de ese canal. **Los links de las piezas llevan UTM** para atribuir descargas a cada red.

---

## 13. FRECUENCIA DE PUBLICACIÓN POR CANAL (Fase 1)
| Canal | Frecuencia |
|---|---|
| Instagram (#1) | 3 piezas/sem (cards/carruseles) + reels |
| Telegram (#2) | 1/día (reporte ya cuenta como 1) + 1 pieza de contenido |
| YouTube (#3) | 1 short/sem cuando esté la API |
| X (#4) | 2/sem |
| LinkedIn / TikTok | 0 hasta tener API |

---

## 14. PREREQUISITOS Y LÍNEA DE TIEMPO

> **D0 (inicio Fase 1) NO es una fecha de calendario fija.** Es el día en que **TODOS los prerequisitos del §14.1 estén ✅ y Fernando dé el OK.** Arranca **cuando esté listo, no antes.** **Hoy falta bastante** (el banco no está completo y **ninguna red está configurada para posteo automático todavía**) → **D0 será más adelante, NO esta semana.**

### 14.1. Prerequisitos para arrancar (en orden; sin fecha forzada)
| # | Prerequisito | Responsable | Depende de |
|---|---|---|---|
| 1 | **Completar el banco**: logo SVG, íconos 3D, badges tiendas, fondos | Code (genera) + Escritorio (logo/búho/IA) | nosotros |
| 2 | **Setup Instagram Graph** (FB Page + vincular IG + app + token → Railway) — §11 | Escritorio (1–5) + Code (6) | nosotros (trabajo) |
| 3 | Setup **YouTube OAuth** | Escritorio + Code | nosotros |
| 4 | **Banner in-app "Unite al canal"** (feature flag) — adquisición #1 | Code (app) | nosotros |
| 5 | Escritorio: **10 preguntas (4.7) + calendario editorial + spec de las 1ras piezas IG** | Escritorio | Escritorio |
| 6 | **1er lote de piezas** generado → `pendiente_ok` → **OK de Fernando** | Code genera, Fernando aprueba | Fernando |
| — | (En paralelo, NO bloquea D0) Solicitar **LinkedIn + TikTok API** | Escritorio | aprobación externa = **semanas** |

> **Realismo:** los prereq 1–6 dependen de nosotros (días de trabajo, sobre todo completar el banco + el setup de IG por Escritorio). LinkedIn/TikTok NO bloquean el arranque (entran en Fase 2 cuando aprueben). **D0 se confirma cuando 1–6 estén ✅** — no antes.

### 14.2. Línea de tiempo (RELATIVA a D0, no a fechas de calendario)
- **D0:** Instagram (#1) + Telegram (#2) arrancan con automatización 100% lista. Métricas desde el día 1.
- **D0 + 2 sem:** sumar YouTube (si OAuth listo). 1er reporte MKT semanal.
- **D0 + 3 sem (o publicación #10):** debut de la **mascota búho**.
- **D0 + 4 sem:** corte de métricas (objetivo: 50 seguidores IG + 50 Telegram). Ajustar mix.
- **D0 + 6 sem:** se habilitan las **comparativas** (§4.6).
- **Fase 2:** LinkedIn + TikTok cuando aprueben las APIs; video con voz IA / animación búho.

> Cuando los prereq 1–6 estén ✅, **Code propone la fecha concreta de D0 y Fernando la confirma.** **Nada se ejecuta sin OK formal de Fernando. Ningún canal sin automatización 100%. El banco siempre replicado en Dropbox.** Versionar v4.6… en cada cambio material.

---

## 15. ✅ CHECKLIST DE AVANCE (tablero vivo)

> **Se actualiza cada día/sesión con el avance real.** Leyenda: ✅ hecho · 🟡 en progreso/parcial · ⬜ pendiente. Última actualización: **02-jun-2026**.

### 15.A. Estructural
| Ítem | Estado | Responsable |
|---|---|---|
| Lugar común único `/mkt/` en repo `aurex-app` | ✅ | Code |
| Banco de assets estructurado por canal + specs | ✅ | Code |
| Banco replicado a Dropbox (regla de sync) | ✅ | Code |
| Sistema de diseño (2 modos + tipos + logo/búho) | ✅ | Code |
| Gate de aprobación (`pendiente_ok`→`aprobado`) | ✅ | Code |
| Telegram — API lista + verificada | ✅ | Code |
| X — credenciales cargadas | 🟡 falta probar posteo real | Code |
| Instagram Graph — FB Page + token | ⬜ | Escritorio (1–5) + Code (6) |
| YouTube — OAuth | ⬜ | Escritorio + Code |
| Banner in-app "Unite al canal" (feature flag) | ⬜ | Code |
| LinkedIn + TikTok — solicitar API (Fase 2) | ⬜ | Escritorio |

### 15.B. Contenido
| Ítem | Estado | Responsable |
|---|---|---|
| Catálogo de 11 tipos de contenido definido | ✅ | Code+Escritorio |
| Banco de assets poblado: búho, capturas web, banners | ✅ | Code |
| Cargar: logo SVG, íconos 3D, badges tiendas, fondos | ⬜ | Code+Escritorio |
| Banco de 10 preguntas (4.7) | 🟡 5 base, faltan 5 | Escritorio |
| Card de muestra (testimonio) | 🟡 v1 hecha, mejorar con logo/badges/fondo | Code |
| 1er lote de piezas reales | ⬜ | Code (genera) |

### 15.C. Grilla / Cronograma
| Ítem | Estado | Responsable |
|---|---|---|
| Prioridad de canales (audiencia AR) | ✅ | Code+Escritorio |
| Frecuencia por canal (§13) | ✅ | Code+Escritorio |
| Métricas + proceso de medición (§12) | ✅ | Code |
| Calendario editorial (qué/día/hora/canal/idioma) | ⬜ | Escritorio |
| D0 (fecha de inicio) | ⬜ atado a prereq 1–6 | Fernando confirma |

### 15.D. OK / Aprobaciones de cada parte
| Aprobación | Estado |
|---|---|
| Borrador del plan — **Code** | ✅ |
| Revisión del plan — **Escritorio** | 🟡 dio feedback (v4.1→v4.4); falta su OK final |
| **OK FORMAL del PLAN — Fernando** | ⬜ (aún iterando) |
| OK de cada lote de piezas — **Fernando** | ⬜ (cuando haya piezas) |
| OK de arranque D0 — **Fernando** | ⬜ (cuando prereq 1–6 ✅) |

> **Cómo se mantiene:** al cierre de cada sesión, Code actualiza los estados de este §15 según lo que avanzó (y bumpea la versión). Es el control de progreso: de un vistazo se ve qué falta y de quién depende.
