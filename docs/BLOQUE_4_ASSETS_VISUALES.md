# BLOQUE 4 — Assets visuales por plataforma

**Generado por Code el 3-may-2026.** Inventario de assets en Drive `AUREX_MEDIA_LIBRARY` + dimensiones requeridas por cada una de las 7 plataformas + plan de generación de los faltantes.

---

## INVENTARIO REAL — qué tenemos en Drive `AUREX_MEDIA_LIBRARY`

Folder ID raíz: `1FZ_LRmNEwoeZdcayDBNi2Ve52vtvpCxI`. Verificado vía Drive API el 3-may-2026.

### Assets utilizables para perfiles de redes

| Archivo | Carpeta | Tamaño | Uso |
|---|---|---|---|
| `buho_v2_dark_small_1080.png` | `03_assets_brutos/` | 201 KB | Búho v2 dorado facetado sobre fondo navy, formato 1080 cuadrado, búho ocupa ~45% del frame |
| `buho_v2_dark_tight_1080.png` | `03_assets_brutos/` | 589 KB | Búho v2 dorado facetado sobre fondo navy, formato 1080 cuadrado, búho ocupa ~80% del frame (closeup) |
| `buho_v2_dark_9x16_1080x1920.png` | `03_assets_brutos/` | 924 KB | Búho v2 dorado facetado sobre fondo navy, formato vertical 1080×1920 — para Stories/Reels/TikTok |

**Búho v2 = mascot oficial AUREX.** Validado por Fernando en video v27 (`01_videos/finales/AUREX_v27.mp4`).

### Lo que NO está en Drive todavía

- ❌ Logo AUREX combinando búho + tipografía "AUREX" en horizontal y/o vertical.
- ❌ Foto de perfil pre-recortada para cada plataforma (7 dimensiones distintas).
- ❌ Banners/covers para Twitter, YouTube, LinkedIn, Facebook (tienen dimensiones muy distintas entre sí).
- ❌ Versión transparente del búho (todas las que hay tienen fondo navy).

---

## DIMENSIONES REQUERIDAS POR PLATAFORMA

Especificaciones oficiales actualizadas al 2026.

### Twitter / X

| Asset | Dimensión | Formato | Notas |
|---|---|---|---|
| Foto de perfil | 400×400 px | PNG o JPG | Renderiza como círculo. Mantener búho centrado en safe area circular. Max 2MB |
| Banner (header) | 1500×500 px | PNG o JPG | Ratio 3:1. Max 5MB. La parte inferior central es tapada por la foto de perfil + el nombre — mantener safe area en zona superior y laterales |

### Instagram

| Asset | Dimensión | Formato | Notas |
|---|---|---|---|
| Foto de perfil | 320×320 px | PNG o JPG | Renderiza como círculo a 110×110 en feed. Max 2MB |
| Banner | NO TIENE | — | Instagram no tiene banner en perfil |
| Posts feed (referencia para Bloque MKT) | 1080×1080 (cuadrado) / 1080×1350 (vertical) / 1080×566 (horizontal) | JPG | — |
| Stories | 1080×1920 (9:16) | JPG/MP4 | Asset `buho_v2_dark_9x16_1080x1920.png` ya sirve |

### TikTok

| Asset | Dimensión | Formato | Notas |
|---|---|---|---|
| Foto de perfil | 200×200 px (mínimo) — preferible 400×400 para retina | JPG | TikTok prefiere JPG sin transparencia. Renderiza como círculo |
| Banner | NO TIENE | — | — |

### YouTube

| Asset | Dimensión | Formato | Notas |
|---|---|---|---|
| Foto de canal | 800×800 px | PNG o JPG | Max 4MB. Renderiza como círculo |
| Banner de canal | **2560×1440 px** | PNG o JPG | Max 6MB. **Safe area centrada 1235×338** (lo que se ve en mobile). El resto se ve solo en TV 4K. Diseñar todo el contenido importante dentro de esa safe area |

### LinkedIn Company Page

| Asset | Dimensión | Formato | Notas |
|---|---|---|---|
| Logo | 300×300 px | PNG o JPG | Mínimo 200×200. Max 4MB. Renderiza como cuadrado redondeado (no círculo perfecto) |
| Banner cover | 1128×191 px | PNG o JPG | Ratio aprox 6:1. Banner muy fino — minimalista |

### Facebook Page (vinculada a Instagram Business)

| Asset | Dimensión | Formato | Notas |
|---|---|---|---|
| Logo perfil | 170×170 px (desktop) | PNG o JPG | Renderiza como círculo. 36×36 en smartphones |
| Cover | 820×312 px (desktop) / 640×360 px (mobile) | JPG | Diseño debe verse bien en ambos crops. Centro safe |

### Telegram Channel

| Asset | Dimensión | Formato | Notas |
|---|---|---|---|
| Foto del canal | 512×512 px | JPG/PNG | Cuadrada. Renderiza como círculo en clientes |
| Banner | NO TIENE | — | — |

---

## TABLA RESUMEN — TODO lo que hay que tener listo

| # | Plataforma | Asset | Dimensión | Estado |
|---|---|---|---|---|
| 1 | Twitter/X | Foto perfil | 400×400 | ❌ generar |
| 2 | Twitter/X | Banner | 1500×500 | ❌ generar |
| 3 | Instagram | Foto perfil | 320×320 | ❌ generar |
| 4 | Instagram | (Stories template) | 1080×1920 | ✅ `buho_v2_dark_9x16_1080x1920.png` |
| 5 | TikTok | Foto perfil | 400×400 (escala desde 200) | ❌ generar (formato JPG sin alpha) |
| 6 | YouTube | Foto canal | 800×800 | ❌ generar |
| 7 | YouTube | Banner canal | 2560×1440 con safe area 1235×338 | ❌ generar |
| 8 | LinkedIn Company | Logo | 300×300 | ❌ generar |
| 9 | LinkedIn Company | Banner | 1128×191 | ❌ generar |
| 10 | Facebook Page | Logo | 170×170 | ❌ generar (mismo asset que LinkedIn 300×300 escalado) |
| 11 | Facebook Page | Cover | 820×312 | ❌ generar |
| 12 | Telegram Channel | Foto del canal | 512×512 | ❌ generar |

**Total: 12 assets a generar.** De los 12, la mayoría son recortes/resizes del búho v2 dark + un par de banners horizontales que requieren diseño nuevo.

---

## PLAN DE GENERACIÓN DE LOS 12 ASSETS

### Estrategia técnica

**Foto de perfil (7 plataformas, 7 tamaños distintos)**
- Asset base: `buho_v2_dark_tight_1080.png` (closeup, búho ocupa 80% del frame). Es el más legible en formatos pequeños cuando se renderiza como círculo.
- Code script en Python con Pillow:
  - Carga el PNG base.
  - Crop centrado a cuadrado si hace falta.
  - Resize a la dimensión específica de cada plataforma (con anti-aliasing LANCZOS).
  - Para TikTok: convertir PNG → JPG (sin transparencia), fondo navy `#0A1628` plano.
  - Output: 7 archivos PNG/JPG en `~/Downloads/AUREX_PERFILES_REDES/[plataforma]/avatar.png`.

**Banners (5 plataformas, 5 dimensiones distintas)**
- Banners NO se pueden generar solo recortando el búho — requieren composición.
- Mejor estrategia: HTML+CSS template con Playwright headless → PNG.
- Plantilla maestra HTML que renderiza:
  - Fondo navy `#0A1628`.
  - Búho a la izquierda (asset `buho_v2_dark_tight_1080.png`).
  - Tipografía AUREX a la derecha (font sans-serif bold, color dorado `#D4A437`).
  - Tagline corto debajo: "Real-time global markets tracker" (color blanco).
  - Versión por plataforma cambia: dimensiones, posición de elementos, tamaño tipografía, safe area considerada.
- Output: 5 archivos PNG en `~/Downloads/AUREX_PERFILES_REDES/[plataforma]/banner.png`.

### Detalle por banner

**Twitter banner 1500×500**: búho a la izquierda 30% del ancho, tipografía AUREX centrada-derecha tamaño grande, tagline abajo.

**YouTube banner 2560×1440 con safe area 1235×338**: TODO el contenido importante centrado en una franja horizontal central de 1235×338. El resto del frame queda como "decoración" (fondo navy + algún elemento visual sutil) que solo se ve en TV 4K.

**LinkedIn banner 1128×191** (muy fino): minimalista. Búho pequeño a la izquierda + tipografía AUREX + tagline en una sola línea horizontal.

**Facebook cover 820×312**: similar a Twitter pero más pequeño. Centro safe para mobile crop 640×360.

**Telegram channel foto 512×512**: igual que perfil de plataformas — recorte cuadrado del búho.

### Tiempo estimado de generación

- Script Python para fotos de perfil: 30 minutos Code.
- Plantilla HTML + Playwright para banners: 1.5-2 horas Code.
- Validación visual de los 12 assets generados (uno por uno): 30 minutos Code + 15 minutos Fernando.

**Total: ~3 horas Code + 15 min Fernando para validación.**

### Cuándo se ejecuta

NO ahora. Se ejecuta al inicio de la **Fase C del método** (cuando vayamos a la guía de apertura real). El día previo a ejecutar el Paso CERO real, Code genera los 12 assets y los deja listos en `~/Downloads/AUREX_PERFILES_REDES/` para que Fernando los suba durante la apertura de cuentas.

---

## DECISIONES DE FORMATO (resumen)

| Decisión | Valor |
|---|---|
| Color fondo base | Navy `#0A1628` (mismo del búho v2 + videos) |
| Color tipografía AUREX | Dorado `#D4A437` (color institucional) |
| Color tagline / texto secundario | Blanco `#FFFFFF` |
| Font tipografía AUREX | Sans-serif bold (Inter Bold o Montserrat Bold — definir en momento de generación) |
| Asset base perfiles | `buho_v2_dark_tight_1080.png` (closeup) |
| Asset base banners | `buho_v2_dark_tight_1080.png` + composición HTML |
| Formato perfil | PNG con fondo navy plano (no transparente) |
| Formato banner | PNG con fondo navy plano |
| Excepción TikTok | JPG (sin transparencia, evita warning de TikTok sobre PNG) |
| Asset base Stories/Reels | Reusar `buho_v2_dark_9x16_1080x1920.png` que ya existe |

---

## ASSETS QUE FERNANDO YA TIENE EN SU MAC (referencia)

Fernando comentó en sesiones anteriores tener algunos assets en `~/Downloads/`. Los reviso al iniciar Fase C para no duplicar trabajo si alguno ya está cropeado a la dimensión exacta requerida.

---

## OUTPUT DEL BLOQUE 4

✅ **Inventario Drive completado** — 3 assets base útiles del búho v2 dark + video v27 validado.

✅ **Dimensiones por plataforma documentadas** — 7 plataformas con foto perfil + 5 plataformas con banner = 12 assets requeridos.

✅ **Plan técnico de generación documentado** — Python+Pillow para perfiles, HTML+Playwright para banners. Reusar el búho v2 dark como elemento visual central. Decisiones de color, fondo y tipografía formalizadas.

✅ **Decisión de timing**: la generación física de los 12 assets ocurre al inicio de Fase C (no ahora), para tenerlos frescos al momento de subir cada uno a su plataforma.

📌 **Acción concreta pendiente para Fase C**:
- Code ejecuta script de generación de los 12 assets (~3 horas) y los deja en `~/Downloads/AUREX_PERFILES_REDES/[plataforma]/`.
- Fernando valida visualmente los 12 antes de subirlos.

---

*BLOQUE_4_ASSETS_VISUALES.md — Bloque 4 cerrado el 3-may-2026. Próximo: Bloque 5 (riesgos de apertura + mitigaciones) — warm-up de cuentas nuevas, geolocalización IP, riesgo de detección de actividad correlacionada.*
