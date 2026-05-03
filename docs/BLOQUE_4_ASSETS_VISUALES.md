# BLOQUE 4 — Assets visuales por plataforma

**Generado por Code el 3-may-2026 (v1 con error de uso del búho como perfil). Corregido v2 el 3-may-2026.**

**Corrección crítica v1 → v2:** la versión inicial proponía el búho v2 como foto de perfil de TODAS las redes — error grave porque rompe coherencia con el app icon de Build 17 / Build 2 (lo que el usuario ya ve en su iPhone/Android cuando instala la app). Detectado por Fernando. Además se descubrió que el splash interno `AurexHero/logo@3x.png` tiene tagline "INVEST AI" — NO USAR (contradice Build 17 metadata segura).

---

## JERARQUÍA OFICIAL DE ASSETS VISUALES AUREX (v2)

Hay **3 elementos visuales distintos** que componen la identidad AUREX y cada uno tiene un uso específico:

### 1. APP ICON — para foto de perfil de redes sociales

| Campo | Valor |
|---|---|
| Qué es | A dorada estilizada con doble anillo sobre fondo NEGRO. Sin texto |
| Por qué | Coherencia 100% con el ícono de la app que el usuario ya ve en su iPhone (Build 17) y Android (Build 2). Si ve la app "AUREX" en su iPhone con un ícono X y entra a Twitter y ve un ícono Y, no asocia |
| Archivo fuente | `~/AurexApp/ios/AurexApp/Images.xcassets/AppIcon.appiconset/icon-1024.png` |
| Dimensiones disponibles en repo | 20×20, 29×29, 40×40, 58×58, 60×60, 76×76, 80×80, 87×87, 120×120, 152×152, 167×167, 180×180, 1024×1024 (la última se usa como master para resize) |
| Fondo | Negro absoluto `#000000` |
| Uso en Paso CERO | **Foto de perfil de TODAS las plataformas sociales (Twitter, IG, TikTok, YouTube, LinkedIn, Facebook, Telegram)** |

### 2. LOGO CON MARCA — para banners y comunicación externa

| Campo | Valor |
|---|---|
| Qué es | Símbolo (A dorada con anillos) + texto "AUREX" debajo en letras grandes doradas. SIN tagline "INVEST AI" (versión limpia confirmada el 3-may) |
| Archivo fuente | `~/Desktop/aurex-app/logo-aurex.png` (raíz del repo PWA) |
| Dimensiones | 1024×1024 con fondo TRANSPARENTE (PNG con alpha) |
| Uso en Paso CERO | **Banners y covers de redes** (Twitter banner, YouTube banner, LinkedIn banner, Facebook cover) — el símbolo+texto se compone sobre fondo navy junto con tagline corto |

### 3. BÚHO V2 — mascot solo para CONTENIDO (videos, ilustraciones)

| Campo | Valor |
|---|---|
| Qué es | Búho dorado facetado, mascot oficial AUREX |
| Archivos fuente | Drive `AUREX_MEDIA_LIBRARY/03_assets_brutos/`: `buho_v2_dark_small_1080.png`, `buho_v2_dark_tight_1080.png`, `buho_v2_dark_9x16_1080x1920.png`. Video validado: `01_videos/finales/AUREX_v27.mp4` |
| Uso permitido | Videos (TikTok, Reels, YT Shorts), Stories animadas, ilustraciones de pieza, contenido tipo "personaje" |
| Uso PROHIBIDO | Foto de perfil de redes sociales, logo institucional, headers de email, favicon. **Esos lugares van app icon o logo con marca, no búho** |

### ⚠️ AurexHero/logo@3x.png — NO USAR EXTERNAMENTE

| Campo | Valor |
|---|---|
| Qué es | Splash screen interno de la app nativa: símbolo + "AUREX" + tagline **"INVEST AI"** |
| Por qué NO usar | El tagline "INVEST AI" contradice Build 17 metadata segura ("Real-time market data tracker", sin "investing", sin "AI signals"). Solo aparece DENTRO de la app al abrirla, los reviewers de Apple/Google lo aceptaron en Build 17, pero usarlo en redes sociales como avatar o cover violaría el lenguaje seguro acordado |
| Pendiente futuro | Generar un nuevo splash screen sin "INVEST AI" cuando se actualice la app post-aprobación stores. Por ahora, solo en uso interno (no externo) |

---

## INVENTARIO COMPLETO — assets disponibles

### Drive `AUREX_MEDIA_LIBRARY` (folder ID `1FZ_LRmNEwoeZdcayDBNi2Ve52vtvpCxI`, verificado 3-may-2026)

**Búho v2 (para CONTENIDO):**
| Archivo | Tamaño | Uso |
|---|---|---|
| `buho_v2_dark_small_1080.png` | 201 KB | Búho 45% del frame, 1080×1080 navy |
| `buho_v2_dark_tight_1080.png` | 589 KB | Búho 80% del frame closeup |
| `buho_v2_dark_9x16_1080x1920.png` | 924 KB | Vertical 9:16 para Stories/Reels |
| `01_videos/finales/AUREX_v27.mp4` | 2.7 MB | Video validado por Fernando |
| `01_videos/buho_animaciones/*` | varios | Animaciones del búho generadas con IA |

### Repo `aurex-app` (PWA)

**Logo con marca (para BANNERS y comunicación externa):**
| Archivo | Tamaño | Uso |
|---|---|---|
| `logo-aurex.png` (raíz repo) | 1024×1024 PNG transparente | **Logo limpio sin "INVEST AI". Para banners y covers** |
| `assets/icons/aurex-icon-*.png` | múltiples (20-256) | Versiones del símbolo A dorada en distintos tamaños PWA |

### Repo `AurexApp` (Nativa)

**App icon (para FOTOS DE PERFIL en redes):**
| Archivo | Dimensiones | Uso |
|---|---|---|
| `ios/AurexApp/Images.xcassets/AppIcon.appiconset/icon-1024.png` | 1024×1024 | **Master oficial. Foto de perfil de redes** |
| `ios/.../icon-180@3x.png`, `icon-120@2x.png`, etc. | 20-180 | Versiones iOS oficiales |
| `android/app/src/main/res/mipmap-*/ic_launcher.png` | 48, 72, 96, 144, 192 | Versiones Android oficiales |

### Lo que NO está pre-cortado todavía y hay que generar

- ❌ Foto de perfil pre-recortada en las dimensiones específicas de cada plataforma (7 distintas).
- ❌ Banners/covers para Twitter, YouTube, LinkedIn, Facebook (composición de logo + tagline + fondo navy).

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

## TABLA RESUMEN CORREGIDA — qué asset base se usa para cada cosa

| # | Plataforma | Asset | Dimensión | Asset BASE a usar | Estado |
|---|---|---|---|---|---|
| 1 | Twitter/X | Foto perfil | 400×400 | `icon-1024.png` (App Icon) | ❌ generar (resize) |
| 2 | Twitter/X | Banner | 1500×500 | `logo-aurex.png` + composición navy | ❌ generar (composición) |
| 3 | Instagram | Foto perfil | 320×320 | `icon-1024.png` (App Icon) | ❌ generar (resize) |
| 4 | Instagram | (Stories template) | 1080×1920 | `buho_v2_dark_9x16_1080x1920.png` | ✅ ya existe (uso de búho permitido en CONTENIDO Stories) |
| 5 | TikTok | Foto perfil | 400×400 (JPG sin alpha) | `icon-1024.png` (App Icon) | ❌ generar (resize + convert a JPG) |
| 6 | YouTube | Foto canal | 800×800 | `icon-1024.png` (App Icon) | ❌ generar (resize) |
| 7 | YouTube | Banner canal | 2560×1440 con safe area 1235×338 | `logo-aurex.png` + composición navy | ❌ generar (composición) |
| 8 | LinkedIn Company | Logo | 300×300 | `icon-1024.png` (App Icon) | ❌ generar (resize) |
| 9 | LinkedIn Company | Banner | 1128×191 | `logo-aurex.png` + composición minimalista | ❌ generar (composición) |
| 10 | Facebook Page | Logo | 170×170 | `icon-1024.png` (App Icon) | ❌ generar (resize) |
| 11 | Facebook Page | Cover | 820×312 | `logo-aurex.png` + composición navy | ❌ generar (composición) |
| 12 | Telegram Channel | Foto del canal | 512×512 | `icon-1024.png` (App Icon) | ❌ generar (resize) |
| 13 | **WhatsApp Business** (línea 2563 ya operativa) | **Foto perfil 500×500** | `icon-1024.png` (App Icon) | ❌ generar (resize) — aporte Escritorio 3-may-2026 |

**Total: 13 assets a generar.**

**Distribución por asset base:**
- **8 fotos de perfil** generadas desde `icon-1024.png` (resize a 8 dimensiones distintas, una de ellas convertida a JPG sin alpha para TikTok, una WhatsApp Business 500×500). **Mismo símbolo que el ícono de la app en stores → coherencia 100%.**
- **4 banners** compuestos desde `logo-aurex.png` + tagline + fondo navy en distintas proporciones (Twitter 1500×500, YouTube 2560×1440, LinkedIn 1128×191, Facebook 820×312).
- **1 asset Stories ya existe** (búho vertical 9:16) — único caso donde el búho aparece como imagen primaria, porque Stories es CONTENIDO, no foto de perfil.

---

## PLAN DE GENERACIÓN DE LOS 12 ASSETS (corregido v2)

### Estrategia técnica

**Foto de perfil (7 plataformas, 7 tamaños distintos)**
- Asset base: **`icon-1024.png`** del repo nativa (App Icon oficial Build 17/2). Mismo símbolo que el usuario ya ve en su iPhone/Android.
- Code script en Python con Pillow:
  - Carga `~/AurexApp/ios/AurexApp/Images.xcassets/AppIcon.appiconset/icon-1024.png`.
  - Resize a la dimensión específica de cada plataforma con anti-aliasing LANCZOS.
  - Para TikTok específicamente: aplanar transparencia sobre fondo negro `#000000` (mismo fondo del icono original) y exportar JPG.
  - Output: 7 archivos en `~/Downloads/AUREX_PERFILES_REDES/[plataforma]/avatar.png` (o `.jpg` para TikTok).

**Banners (4 plataformas, 4 dimensiones distintas)**
- Asset base: **`logo-aurex.png`** del repo PWA (símbolo + texto AUREX, sin "INVEST AI").
- Composición HTML+CSS rendrizada con Playwright headless → PNG.
- Plantilla maestra HTML que renderiza:
  - Fondo navy `#0A1628`.
  - `logo-aurex.png` a la izquierda con tamaño proporcional al banner.
  - Tagline corto a la derecha: **"Real-time global markets tracker"** (lenguaje seguro Build 17, color blanco).
  - Opcional: elemento gráfico secundario sutil (ej: líneas/constelación tenue como en AurexHero pero sin texto INVEST AI).
- Output: 4 archivos PNG en `~/Downloads/AUREX_PERFILES_REDES/[plataforma]/banner.png`.

### Detalle por banner

**Twitter banner 1500×500**: `logo-aurex.png` a la izquierda ocupando ~25% del ancho, tagline "Real-time global markets tracker" centrado a la derecha tamaño grande, fondo navy plano.

**YouTube banner 2560×1440 con safe area 1235×338**: TODO el contenido importante centrado en franja horizontal central 1235×338. `logo-aurex.png` a la izquierda + tagline a la derecha. Resto del frame queda fondo navy plano (solo se ve en TV 4K).

**LinkedIn banner 1128×191** (muy fino): minimalista. `logo-aurex.png` chico a la izquierda + tagline en una sola línea horizontal.

**Facebook cover 820×312**: similar a Twitter pero más chico. Logo izquierda + tagline derecha. Centro safe para mobile crop 640×360.

**Telegram channel foto 512×512**: NO es banner, es foto de canal. Va con `icon-1024.png` resizeado (igual que perfiles de redes).

### Tiempo estimado de generación

- Script Python para fotos de perfil: 30 minutos Code.
- Plantilla HTML + Playwright para banners: 1.5-2 horas Code.
- Validación visual de los 12 assets generados (uno por uno): 30 minutos Code + 15 minutos Fernando.

**Total: ~3 horas Code + 15 min Fernando para validación.**

### Cuándo se ejecuta

NO ahora. Se ejecuta al inicio de la **Fase C del método** (cuando vayamos a la guía de apertura real). El día previo a ejecutar el Paso CERO real, Code genera los 12 assets y los deja listos en `~/Downloads/AUREX_PERFILES_REDES/` para que Fernando los suba durante la apertura de cuentas.

---

## DECISIONES DE FORMATO (resumen v2 corregido)

| Decisión | Valor |
|---|---|
| Color fondo banners | Navy `#0A1628` (mismo del documento estratégico + videos búho) |
| Color tipografía AUREX | Dorado `#D4A437` (color institucional) — viene en `logo-aurex.png` |
| Color tagline / texto secundario en banners | Blanco `#FFFFFF` |
| Font tagline en banners | Sans-serif bold (Inter Bold o Montserrat Bold — definir en momento de generación) |
| **Asset base FOTOS DE PERFIL** | `~/AurexApp/ios/AurexApp/Images.xcassets/AppIcon.appiconset/icon-1024.png` (App Icon oficial Build 17) |
| **Asset base BANNERS** | `~/Desktop/aurex-app/logo-aurex.png` (logo limpio sin "INVEST AI") + composición HTML |
| Formato fotos perfil | PNG con fondo negro `#000000` (igual que App Icon) |
| Formato banners | PNG con fondo navy `#0A1628` |
| Excepción TikTok | JPG (sin transparencia, evita warning de TikTok sobre PNG) |
| Asset base Stories/Reels | `buho_v2_dark_9x16_1080x1920.png` (único caso donde búho aparece en perfil porque es CONTENIDO) |
| **Tagline a usar en banners** | "Real-time global markets tracker" (lenguaje seguro Build 17, NO "INVEST AI", NO "AI signals") |

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
