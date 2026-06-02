# /mkt/ — Centro de marketing Cobrex (lugar común Code + Escritorio)

**Único lugar de trabajo compartido.** Code y Escritorio acceden siempre, todo versionado. **Fernando no toca nada.**

## Estructura

| Carpeta | Quién escribe | Qué va |
|---|---|---|
| `content/` | **Escritorio** | El contenido en Markdown: posts, guiones, captions (1 archivo por pieza, con frontmatter) |
| `templates/` | **Code** | Plantillas SVG/HTML de las cards e imágenes |
| `assets/` | **Code/Escritorio** | Logos Cobrex, búho, íconos 3D, capturas, fondos |
| `scheduled/` | **Code** | Posts ya procesados, listos para publicar (JSON con fecha/canal/media) |
| `published/` | **Code** (automático) | Registro de lo ya publicado (con resultado/ID del post) |
| `config/` | **Code** | Configuración de canales, handles y estado de las APIs (`canales.json`) |

## Flujo (automático, sin Fernando)

1. **Escritorio** escribe una pieza en `content/` (Markdown con frontmatter: canal, idioma, tipo, fecha_prog, plantilla, datos).
2. **Code** (cron Railway) la levanta, **genera la imagen/video** con sus herramientas, y deja el post listo en `scheduled/` (JSON con fecha + canal + media).
3. El **cron de Railway** publica automáticamente en el horario programado vía la API del canal.
4. Code mueve la pieza a `published/` con el resultado (ID del post, estado).

## Estado de canales (ver `config/canales.json`)

- ✅ **Telegram** (`t.me/cobrexio`) — publicación automática LISTA (bot ya en Railway). **Fase 1 arranca por acá.**
- ⚙️ **X, Instagram, YouTube** — viables, faltan tokens/setup (una vez, sin Fernando).
- 🔴 **LinkedIn, TikTok** — APIs requieren aprobación (semanas); semi-manual mientras.

## Formato de una pieza en `content/`

Ver `content/EJEMPLO_testimonio.md`. Frontmatter + copy. Code lo lee tal cual.
