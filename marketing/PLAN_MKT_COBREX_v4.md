# PLAN DE MARKETING COBREX — v4.0 (primera versión COBREX)

*Fecha: 02-jun-2026 AR · Autor: Code (Claude Code) · Para consolidar con Escritorio + OK de Fernando*
*Reemplaza el `PLAN_SOCIAL_MEDIA_FASE_1_AUREX_v3.md` (13-may, era AUREX — OBSOLETO).*
*Este documento es la FUENTE ÚNICA del sistema de diseño y de cómo se produce cada contenido. Si algo no está acá, no está definido.*

---

## VERSIONADO — ¿qué versión es esta y por qué?

- **v1.0 / v2.0 / v3.0 → eran AUREX.** Premisas hoy muertas (iOS Build 17 "en review", planes FREE/PRO/ELITE "rotos", PayPal/Lemon Squeezy, PWA en aurex.live). Se archivan.
- **v4.0 (esta) = primera versión COBREX.** Marca, canales, URLs, estado del producto y sistema de diseño actualizados a la realidad de hoy (02-jun-2026). **De acá en adelante el versionado sigue: v4.1, v4.2…**
- **Estado:** BORRADOR de Code para consolidar con la opinión de Escritorio. **Nada se ejecuta hasta OK formal de Fernando.**

---

## 🛑 REGLA MADRE (no negociable)

**NADA se publica al aire sin OK FORMAL y FINAL de Fernando.** La automatización le saca el TRABAJO MANUAL (no postea, no diseña, no programa a mano) — **no el control**. Toda pieza queda en `pendiente_ok` → Fernando aprueba → recién ahí el cron publica. Ver el flujo en §8.

---

## 1. ESTADO REAL (02-jun-2026) — sin inventos

| Frente | Estado |
|---|---|
| **iOS** | ✅ Cobrex v1.1 (Build 38) PUBLICADO en App Store. **#1 en búsqueda "cobrex" en AR**, presente en US. Rating AR 4.7★ (7), 6 reseñas reales positivas. |
| **Android** | ✅ Cobrex v1.0.37 PUBLICADO, 177 países. Instalaciones reales por país (reporte diario). |
| **Web** | ✅ cobrex.io activa (landing) + PWA en cobrex.io/app. |
| **Redes** | 6 canales Cobrex abiertos (ver §10), **0 seguidores** todavía. |
| **Datos** | Reporte diario automático a Telegram (descargas/país, ranking, reseñas, MRR) → **material real para contenido**. |
| **Pagos** | IAP Apple + Google + RevenueCat funcionando (gating OK). El "sistema roto" del v3 ya está resuelto. |

**Insumo clave:** los datos del reporte diario y las reseñas reales SON contenido verificable. No hay que inventar nada.

---

## 2. IDIOMA — español primero, por qué

- **~83% de los usuarios son de Argentina** y **las reseñas reales están en español.** El contenido se publica donde está la audiencia **hoy** → **español primario**.
- **Inglés** para piezas "evergreen" y canales globales (X, LinkedIn) en una 2ª capa.
- **Portugués** cuando se active Brasil.
- Regla: idioma = dónde está tu gente hoy, no dónde querés llegar. El idioma de cada pieza lo fija el calendario editorial (Escritorio).

---

## 3. SISTEMA DE DISEÑO COBREX (design system — fuente única)

> Cobrex tiene **modo oscuro** y **modo claro**. El contenido **alterna entre ambos** (no es siempre oscuro). Regla de alternancia en §3.3.

### 3.1. Paleta MODO OSCURO (de cobrex.io, real)
| Token | Hex | Uso |
|---|---|---|
| bg | `#080400` | fondo base |
| bg-soft | `#0D0800` | fondo secundario |
| bg-card | `#100A02` | cards |
| gold | `#D4A017` | dorado principal |
| gold-bright | `#F5C842` | dorado brillante / acentos |
| gold-intense | `#FFE082` | highlights |
| text | `#F5F0E8` | texto principal (crema) |
| text-sec | `#A0958A` | texto secundario |
| alcista | `#22C55E` | positivo · bajista `#FE3944` negativo |
| Motor IA | `#6366F1` (indigo) · Pulse `#EC4899` (rosa) | acentos de feature (no cambian por tema) |

### 3.2. Paleta MODO CLARO — combinación C2 "Navy and Gold" (spec oficial, Dropbox)
| Token | Hex | Uso |
|---|---|---|
| backgroundPrimary | `#EEF1F7` | fondo de screens |
| backgroundCard | `#FFFFFF` | cards, modales |
| navBackground | `#0D1017` | navbar / barras (navy) |
| accentGold | `#F5C518` | dorado principal |
| accentGoldMuted | `#C8910A` | dorado para texto sobre fondo claro |
| textPrimary | `#0D1017` | títulos, precios |
| textSecondary | `#556070` | subtítulos, labels |
| borderColor | `#DDE2EE` | bordes / separadores |
| alcista | `#22C55E` · bajista `#EF4444` · neutral `#F59E0B` | señales |
| Motor IA `#6366F1` · Pulse `#EC4899` | | iguales en ambos modos |

### 3.3. Regla de alternancia claro/oscuro
- **Oscuro** (dorado sobre negro): piezas premium, de marca, nocturnas, "cierre de mercado", testimonios elegantes.
- **Claro** (navy+gold sobre crema/blanco): piezas de datos, educativas, "apertura/jornada", capturas de la app en modo claro.
- **Alternar** a lo largo de la semana para dar ritmo visual y mostrar que la app tiene ambos modos. El calendario editorial marca el modo de cada pieza (campo `modo` en el frontmatter).

### 3.4. Tipografías (las reales de Cobrex)
- **Display / títulos:** `Boldonse` (impacto) + `Manrope` 800.
- **Cuerpo / UI:** `Manrope` (400–700).
- **Datos / números / tickers:** `JetBrains Mono`.
- **Citas / quotes elegantes:** `Cormorant Garamond` (serif).
- Se cargan vía Google Fonts en las plantillas HTML (para que el render con Chrome las use).

### 3.5. Logo, wordmark y mascota
- **Logo principal:** símbolo Cobrex (SVG dorado) + wordmark **"Cobrex"** (Manrope 800, color gold). **Es el identificador que va en TODAS las piezas** (consistencia con App Store/web).
- **Mascota búho:** existe oficial (`Dropbox/AUREX/ICONS - MASCOT - USO/` — búho v2, en modo claro y oscuro). **Se usa GRADUAL**, en piezas narrativas/video, **sin competir con el logo**. Al inicio prioriza el logo (reconocimiento), el búho suma personalidad después. (No usar el emoji 🦉 en piezas finales — era placeholder.)
- **Regla:** logo siempre; búho como firma secundaria o protagonista solo en piezas de marca/video.

### 3.6. Elementos fijos de toda pieza
- **Badges oficiales "Disponible en App Store" + "Google Play"** en toda pieza de descarga/adquisición (credibilidad + CTA). → falta bajar los badges oficiales a `mkt/assets/badges/`.
- **CTA de seguir/descargar:** "Seguinos @cobrexio" o "Descargala 👉 cobrex.io" según objetivo.
- **URL cobrex.io** + logo presentes siempre.
- **Fondo con identidad** (no plano): textura/gráfico financiero sutil (líneas/velas doradas tenues) coherente con "Terminal de Mercados". Nunca un degradé vacío.

---

## 4. CATÁLOGO DE TIPOS DE CONTENIDO (ficha por tipo)

> Cada ficha define: **qué es · modo · diseño · assets · skills/programas · quién · dónde se guarda.** El render final lo hace Code; el copy y el spec creativo, Escritorio.

### 4.1. Testimonio (reseña real)
- **Qué:** una reseña real de usuario (las 6 que ya hay). Prueba social.
- **Modo:** oscuro (elegante).
- **Diseño:** logo arriba · 5★ doradas · quote en `Cormorant Garamond` grande · autor + país · footer cobrex.io. Fondo oscuro con gráfico sutil.
- **Assets:** logo Cobrex, badges tiendas.
- **Skills/programas:** `brandkit` + `high-end-visual-design` + `design-taste-frontend` (diseño) → HTML/CSS → **Playwright+Chrome** (render local) o **Sharp+SVG** (Railway).
- **Quién:** Escritorio define copy/cuál reseña; Code diseña y renderiza.
- **Dónde:** `mkt/content/AAAA-MM-DD_canal_idioma_testimonio-*.md` → card en `mkt/assets/generadas/`.

### 4.2. Dato del día / métrica
- **Qué:** una métrica real del reporte (descargas por país, MRR, usuarios activos).
- **Modo:** claro (datos).
- **Diseño:** título dato + número grande en `JetBrains Mono` + mini-gráfico/bandera país + contexto. Navy+gold sobre crema.
- **Assets:** ícono de métrica, banderas.
- **Skills/programas:** `high-end-visual-design` + `social-content` → **Sharp+SVG** (datos dinámicos, ideal para automatizar).
- **Quién:** Code arma automático desde el reporte; Escritorio aprueba el ángulo/copy.
- **Dónde:** `mkt/content/..._dato-*.md` → `mkt/assets/generadas/`.

### 4.3. Ranking / logro
- **Qué:** hito tipo "#1 en búsqueda App Store Argentina".
- **Modo:** oscuro (premium) o claro alternado.
- **Diseño:** "#1" gigante dorado + contexto (categoría/país) + badge tiendas + CTA.
- **Skills/programas:** `marketing-psychology` (encuadre) + `high-end-visual-design` → Sharp/Playwright.
- **Quién:** Escritorio copy; Code diseña/render.
- **Dónde:** `mkt/content/..._ranking-*.md`.

### 4.4. Educativo (40% del mix)
- **Qué:** "Cómo leer Cobrex Pulse", "Cómo interpretar FED+GDELT", "Cómo armar tu Cartera Simulada".
- **Modo:** claro (legibilidad) — carrusel multi-slide.
- **Diseño:** portada + 4-6 slides con pasos, capturas reales de la app, números en mono.
- **Assets:** capturas app (`assets/`: pulse, mercados, señales), íconos.
- **Skills/programas:** `content-strategy` + `content-production` (estructura) + `high-end-visual-design` (slides) → Playwright (carruseles ricos).
- **Quién:** Escritorio guion + copy; Code diseña carrusel y renderiza cada slide.
- **Dónde:** `mkt/content/..._educativo-*.md` (+ slides en `mkt/assets/generadas/`).

### 4.5. Feature highlight
- **Qué:** mostrar una función (Pulse, Termómetro de Riesgo, Cartera Simulada, Señales IA, Alertas).
- **Modo:** alternado; usa el color del feature (Pulse rosa `#EC4899`, Motor IA indigo `#6366F1`).
- **Diseño:** captura/mockup de la función + claim corto + cómo ayuda.
- **Skills/programas:** `copywriting` (claim) + `high-end-visual-design` + `image-to-code` (si hay mockup) → Playwright.
- **Quién:** Escritorio elige feature + claim; Code diseña.
- **Dónde:** `mkt/content/..._feature-*.md`.

### 4.6. Comparativa vs competidores
- **Qué:** Cobrex vs Cocos/TradingView/Investing (diferenciación positiva).
- **Modo:** claro (tabla legible).
- **Skills/programas:** `competitor-alternatives` + `marketing-strategy-pmm` → tabla en HTML → Playwright.
- **Quién:** Code arma (skills) + Escritorio valida ángulo; **Fernando aprueba** (sensible).
- **Dónde:** `mkt/content/..._comparativa-*.md`.

### 4.7. Conversación / pregunta
- **Qué:** "¿Qué activo seguís más?", encuestas, engagement.
- **Modo:** alternado, simple.
- **Skills/programas:** `social-content` → card simple Sharp/SVG.
- **Quién:** Escritorio copy; Code diseña.

### 4.8. Detrás de escena (20%)
- **Qué:** "Por qué Cobrex nació en AR", "cómo funciona el motor de 24 variables".
- **Modo:** oscuro (narrativo) — acá **el búho puede aparecer**.
- **Skills/programas:** `content-humanizer` + `copywriting` → card/carrusel.
- **Quién:** Escritorio narrativa; Code diseña.

### 4.9. Anuncio / promo (10% techo)
- **Qué:** lanzamientos, "Cobrex ya está en iOS y Android", novedades.
- **Modo:** oscuro premium.
- **Diseño:** **badges App Store + Google Play obligatorios** + CTA fuerte.
- **Skills/programas:** `launch-strategy` + `copywriting` + `high-end-visual-design`.
- **Quién:** Escritorio copy; Code diseña; **Fernando aprueba**.

### 4.10. Video corto (Reel / Short / TikTok)
- **Qué:** 15-45s — recorrido de la app, dato animado, testimonio.
- **Modo:** según pieza; música + texto.
- **Assets:** capturas/clips de la app, `assets/video/`, mascota búho (animada, fase 2).
- **Skills/programas:** `video-content-strategist` (guion) + **ffmpeg** (ensamblado). Voz IA (ElevenLabs) y animación búho (Runway/Pika) = **Fase 2, no prometido aún**.
- **Quién:** Escritorio guion + spec; Code ensambla.
- **Dónde:** `mkt/content/..._video-*.md` (+ mp4 en `mkt/assets/generadas/`).

---

## 5. SKILLS Y PROGRAMAS POR TAREA (resumen; detalle en PLAN_TECNICO §8)

- **Diseño visual (Code):** `brandkit`, `high-end-visual-design`, `design-taste-frontend`, `canvas-design`, `imagegen-frontend-web`, `minimalist-ui`, `image-to-code`.
- **Render (Code):** **Sharp+SVG** (cron Railway, datos dinámicos) · **Playwright+Chrome** (piezas ricas, local) · **ffmpeg** (video).
- **Copy/contenido:** Escritorio genera; Code pule con `copywriting`/`copy-editing`/`content-humanizer`/`content-production`.
- **Redes/estrategia (Code):** `social-media-manager`, `social-content`, `x-twitter-growth`, `social-media-analyzer`, `marketing-strategy-pmm`, `launch-strategy`, `competitor-alternatives`, `marketing-psychology`.
- **SEO/ASO (Code):** `app-store-optimization`, `seo-audit`, `schema-markup`, `site-architecture`, `programmatic-seo`, `ai-seo`.
- **Publicación (Code):** backend Railway + node-cron + APIs (Telegram listo; X cargado).
- **Escritorio aporta además:** generación de imágenes IA (Stable Diffusion/DALL-E) para fondos/ilustraciones/búho, prompts de imagen, spec visual de cada card, copy maestro EN, calendario editorial, monitoreo de comunidad, publicación manual donde no hay API.

---

## 6. DÓNDE SE GUARDA EL CONTENIDO (lugar único: repo `aurex-app` → `/mkt/`)

```
mkt/
  content/      Escritorio escribe (.md con frontmatter)
  templates/    Code: plantillas SVG/HTML por tipo de contenido
  assets/       logo, capturas, badges tiendas, mascota búho, fondos
    generadas/  imágenes/videos finales que produce Code
    badges/     App Store + Google Play oficiales (falta bajar)
  scheduled/    Code: posts listos (JSON: fecha+canal+media+estado)
  published/    registro de lo publicado (ID del post + resultado)
  config/       canales.json (handles + estado APIs)
```

**Frontmatter de cada `.md` en `content/`:**
```
canal: telegram        # telegram|x|instagram|youtube|linkedin|tiktok
idioma: es
tipo: testimonio       # uno de los 10 del §4
modo: oscuro           # oscuro|claro
fecha_prog: 2026-06-03 13:00
plantilla: card_testimonio
datos: { ... }         # datos que van en la card
---
(copy/caption del post)
```

**Por red:** la misma carpeta sirve a todos los canales; el campo `canal` decide dónde publica. Lo publicado de cada red queda en `published/` con su `canal` para histórico/tracking. Supabase (`mkt_content`) = motor interno de Code (estado/reintentos), **Escritorio solo toca `mkt/`**.

---

## 7. REPARTO QUIÉN HACE QUÉ (sin Fernando en la ejecución)

| | Escritorio | Code |
|---|---|---|
| Copy / guiones / captions | ✅ genera | pule (skills) |
| Spec visual de cada card | ✅ define | renderiza |
| Imágenes IA (fondos/ilustración/búho) | ✅ genera | integra como asset |
| Calendario editorial | ✅ arma | ejecuta |
| Render PNG/video final | — | ✅ Sharp/Playwright/ffmpeg |
| Traducción a 7 idiomas | valida EN maestro | ✅ traduce |
| Publicación por API | — | ✅ (cron Railway) |
| Publicación manual (LinkedIn/TikTok al inicio) | ✅ | — |
| Comunidad / replies | ✅ monitorea | — |

---

## 8. FLUJO + GATE DE APROBACIÓN

1. Escritorio pushea `.md` a `mkt/content/`.
2. Code lo lee (cron Railway), genera la imagen/video con la plantilla+datos, deja el post en `mkt/scheduled/` con estado **`pendiente_ok`**.
3. **Fernando revisa y da OK formal** → estado pasa a `aprobado`.
4. El cron publica **solo lo `aprobado`** a la `fecha_prog` → mueve a `mkt/published/`.
5. Sin OK, nunca se publica. El reporte diario puede sumar "MKT: X publicados / Y pendientes de OK".

---

## 9. ⚠️ PENDIENTE CRÍTICO — PLAN DE ADQUISICIÓN DE AUDIENCIA (a definir con Escritorio)

**Hoy los canales tienen ~0 seguidores → publicar y esperar no llega a nadie.** El contenido es necesario pero **no suficiente**. Falta definir CÓMO se consigue audiencia:
- Convertir **usuarios actuales de la app** en seguidores (banner/pop-up in-app "seguinos en redes").
- Links de redes en cobrex.io (ya están) + en el onboarding.
- Compartir en grupos/comunidades + contactos.
- **CTA de seguir en cada pieza.**
- Pauta paga (`paid-ads`) cuando haya presupuesto/sentido.
- Colaboraciones / cross-posting.
**Sin este capítulo, el contenido no crece. Es prioridad de la consolidación con Escritorio.**

---

## 10. CANALES COBREX + ESTADO DE AUTOMATIZACIÓN

| Red | Handle | Auto-publicación | Estado |
|---|---|---|---|
| Telegram | `t.me/cobrexio` | ✅ LISTA | bot admin + verificado |
| X | `x.com/cobrexio` | ✅ credenciales cargadas | falta probar posteo real al montar motor |
| Instagram | `@cobrex.io` ⚠️ **handle a CONFIRMAR** (el punto puede no ser válido como username de IG — ¿es `@cobrex.io`, `@cobrex_io` o `@cobrexio`?) | ⚠️ falta vincular FB Page + token | — |
| YouTube | `@cobrex-io` | ⚠️ falta OAuth | — |
| LinkedIn | `company/cobrexio` | 🔴 API requiere aprobación → semi-manual | — |
| TikTok | `@cobrex.io` | 🔴 API requiere review → semi-manual | — |

(Confirmar handles exactos con Escritorio.)

---

## 11. PRÓXIMOS PASOS

1. **Escritorio** opina sobre este plan v4.0 (especialmente §3 diseño, §4 catálogo, §9 adquisición) y completa su columna de herramientas.
2. **Consolidar** ambas visiones → v4.1.
3. Bajar badges oficiales App Store + Google Play a `mkt/assets/badges/`.
4. Conseguir/confirmar el **logo Cobrex** oficial (SVG) y la **mascota búho** v2 a `mkt/assets/`.
5. Definir el **plan de adquisición de audiencia** (§9).
6. Recién entonces: 1er lote de piezas reales → `pendiente_ok` → **OK de Fernando** → publicar.

> **Nada se ejecuta hasta el OK formal de Fernando.** Este documento se mantiene actualizado en cada cambio material (versionar v4.1, v4.2…).
