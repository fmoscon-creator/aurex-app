# Voces y Canales AUREX — Asignación final

**Fecha de definición:** 30-abr-2026
**Estado:** APROBADO por Fernando — referencia cerrada
**Aplica a:** todos los videos generados con `scripts/video_generation/compose_video.py` (Plan MKT v2.1, sección 2.4 — Ruta A)
**Ámbito:** voces sintéticas de ElevenLabs para los videos automáticos diarios y semanales de AUREX en TikTok, Instagram Reels, YouTube Shorts, YouTube canal largo, LinkedIn Company Page y otros canales con audio.

---

## Resumen ejecutivo

AUREX produce videos automáticamente con el mascot búho v2 como protagonista visual (sección 2.4 del Plan MKT). El audio se genera con la API de ElevenLabs (modelo `eleven_multilingual_v2` — soporta 32 idiomas con la misma voz). Se usa la cuenta free tier (10.000 caracteres/mes, sin tarjeta).

Después de probar las 21 voces default disponibles en el plan free, Fernando seleccionó **8 voces aprobadas** (4 femeninas + 4 masculinas) y se definió una matriz de asignación canal → voz con rotación por día de la semana.

---

## Las 8 voces aprobadas

### Femeninas

| Clave en código | Voice ID ElevenLabs | Descripción |
|---|---|---|
| `matilda` | `XrExE9yKIg1WjnnlVkGX` | Profesional, seria, conocedora, madura |
| `bella` | `hpp4J3VqNfWAUOO0d1Us` | Profesional, brillante, cálida |
| `jessica` | `cgSgspJ2msm6clMCkdW9` | Juvenil, jovial, cálida |
| `lily` | `pFZP5JQG7iQjIQuC4Bku` | Aterciopelada, británica, sofisticada |

### Masculinas

| Clave en código | Voice ID ElevenLabs | Descripción |
|---|---|---|
| `charlie` | `IKne3meq5aSn9XLyUdCD` | Profundo, seguro, energético (australiano) |
| `brian` | `nPczCjzI2devNBz1zQrb` | Profundo, resonante, comforting |
| `bill` | `pqHfZKP75CvOlQylNhV4` | Sabio, maduro, balanceado |
| `chris` | `iP95p4xoKVk53GoZ742B` | Carismático, down-to-earth |

---

## Asignación canal → voz

Cada canal tiene **una voz femenina + una voz masculina** que rotan por día de la semana. El criterio de asignación es matchear el **tono del canal** con el **tono de la voz**.

| Canal | Femenina | Masculina | Razonamiento |
|---|---|---|---|
| TikTok / IG Reels / YouTube Shorts (videos cortos jóvenes) | **Jessica** | **Chris** | Audiencia 22-35 años. Jessica jovial + Chris carismático = tono cercano y amigable, ideal para formato vertical 60s. |
| YouTube canal largo (análisis semanal 5-10 min) | **Matilda** | **Brian** | Análisis serios. Matilda madura + Brian profundo = autoridad financiera para contenido profundo. |
| LinkedIn Company Page (B2B institucional) | **Lily** | **Bill** | Audiencia institucional. Lily británica + Bill sabio = tono refinado profesional. |
| Instagram feed + Stories (mixto cotidiano) | **Bella** | **Charlie** | Posts diarios mixtos. Bella brillante + Charlie energético = versátil para distintos formatos. |
| `default` (cualquier canal no listado) | **Matilda** | **Charlie** | Voces principales del proyecto cuando no hay configuración específica. |

---

## Rotación por día de la semana

Dentro de cada canal, las voces alternan automáticamente según el día:

| Día | Voz que se usa |
|---|---|
| Lunes | Femenina del canal |
| Martes | **Masculina del canal** |
| Miércoles | Femenina del canal |
| Jueves | **Masculina del canal** |
| Viernes | Femenina del canal |
| Sábado | Femenina del canal |
| Domingo | Femenina del canal |

**Lógica:** 5 días femenina + 2 días masculina por semana. La rotación queda lo suficientemente variada para que la audiencia no perciba repetición, sin que se pierda la identidad de marca.

Implementado en `compose_video.py` función `get_voice_for_channel(channel, weekday)`.

---

## Cómo se usa desde el script

### Modo automático (recomendado para el cron del backend)

```bash
# La voz se elige automáticamente según el canal + día de hoy
python3 compose_video.py --mode dark --channel tiktok --out video_tiktok.mp4
python3 compose_video.py --mode dark --channel youtube --out video_youtube.mp4
python3 compose_video.py --mode dark --channel linkedin --out video_linkedin.mp4
```

### Modo manual (forzar una voz específica)

```bash
# Forzar Bella (ignora rotación)
python3 compose_video.py --mode dark --voice bella --out video.mp4

# Forzar Charlie con modo claro
python3 compose_video.py --mode light --voice charlie --out video.mp4
```

---

## Soporte multi-idioma

El modelo `eleven_multilingual_v2` que usamos soporta **32 idiomas con la MISMA voz**. Esto significa:

- Matilda en español, Matilda en inglés, Matilda en portugués, Matilda en francés, Matilda en italiano, etc. — todas suenan como la misma persona Matilda en su idioma destino.
- **NO necesitamos voces distintas por idioma.** Ahorra tokens del free tier (10k/mes) y mantiene la identidad de marca consistente entre los 8 idiomas activos de AUREX (español, inglés, portugués, chino, hindi, árabe, francés, italiano).
- El idioma sale del texto que se envía a la API (en español si el guion está en español, en inglés si está en inglés, etc.).

---

## Límites del plan free de ElevenLabs

| Concepto | Límite |
|---|---|
| Caracteres por mes | 10.000 |
| Voces accesibles | Las 21 default (no la Voice Library) |
| Modelos | `eleven_multilingual_v2` incluido |
| Concurrencia | Limitada (suficiente para nuestro volumen) |

**Estimación de consumo:**
- Un video corto de 14-20s consume ~500-700 caracteres.
- 10k caracteres alcanzan para ~15-20 videos cortos al mes con voz IA.
- Los videos diarios (martes y viernes según Plan MKT) son ~8 al mes → entran en el free tier con margen.

---

## Cuándo escalar a plan pago

El free tier alcanza para el ritmo de producción definido en el Plan MKT v2.1 (2 videos cortos/semana + 1 largo/semana). Si en algún momento el volumen sube significativamente (ej: 1 video diario por canal × 8 canales × 8 idiomas), habría que evaluar:

| Plan | Costo | Caracteres/mes | Voice Library |
|---|---|---|---|
| Free | $0 | 10.000 | NO |
| Starter | $5/mes | 30.000 | NO |
| Creator | $22/mes | 100.000 | SÍ (voces nativas LATAM como Valeria, Siena) |
| Pro | $99/mes | 500.000 | SÍ + voces clonadas |

**Decisión actual (30-abr-2026):** quedamos en plan FREE. La regla "cero costo variable mensual" del proyecto está priorizada. Si el ROI de los videos justifica los $22/mes (Creator), se evalúa pasar a ese tier para acceder a voces nativas LATAM (Valeria, Siena, Catalina, Tamara, etc.) que suenan más naturales que las default en español.

---

## Archivos relacionados

- `scripts/video_generation/compose_video.py` — orquestador con la matriz de voces y rotación.
- `scripts/video_generation/README.md` — uso general del pipeline.
- `~/Downloads/SECRET ELEVENLABS.txt` — API key local (NO commitear, ya excluida).
- Variable Railway `ELEVENLABS_API_KEY` en servicio `aurex-app`.

---

## Histórico de la decisión

- **30-abr-2026:** Fernando probó 21 voces default (audios MP3 generados en `~/Downloads/AUREX_VOZ_PRUEBAS/`). Aprobó las 8 voces de este documento. Definió la asignación canal → voz arriba descrita. Aprobó la rotación lunes-miércoles-viernes-sábado-domingo femenina + martes-jueves masculina.
- Las voces nativas LATAM de la Voice Library de ElevenLabs (Valeria, Siena, Catalina, Paola Blasi, Tamara, etc.) se descartaron por ahora porque requieren plan Creator pago de $22/mes. Se reconsideran cuando haya ROI demostrado.

---

*Documento de referencia cerrado. Cualquier cambio futuro requiere aprobación explícita de Fernando y actualización de esta página.*
