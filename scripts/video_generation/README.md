# Generador de videos AUREX para canales sociales

Plantillas reutilizables para producir videos cortos (TikTok, Instagram Reels,
YouTube Shorts) y largos (YouTube canal completo) usando el mascot búho v2 como
presentador y el efecto de constelación dorada del onboarding como fondo de marca.

Decisión de diseño en `PLAN_MKT.md` sección 2.4 (Ruta A + Ruta B):
- **Ruta A** (siempre activa): producción 100% local con Pillow + FFmpeg + voz ElevenLabs (free tier 10k chars/mes). Búho v2 estático con efectos de cámara. Para los videos diarios.
- **Ruta B** (opcional, si hay assets): si la carpeta `assets/buho_animations/` tiene MP4 del búho animado (generados con Kling AI / Luma Dream Machine / Pika por Escritorio), uno se inserta automáticamente como **stinger del intro** del video. Para videos premium 1-2 por semana.

Voces aprobadas y rotación canal→voz: ver `docs/VOCES_CANALES_AUREX.md`.

## Estructura

```
scripts/video_generation/
├── README.md                ← este archivo
├── compose_video.py         ← orquestador principal
├── templates/
│   ├── constelacion.py      ← genera frames de fondo animado (modo oscuro o claro)
│   └── banners.py           ← genera PNGs de banners (intro, señales, outro, URL, AUREX)
└── assets/
    ├── logo_solo_circulo.png   ← logo AUREX sin texto "AUREX" debajo
    ├── buho_v2_dark.png        ← mascot v2 sobre fondo navy (#0A1428)
    ├── buho_v2_light.png       ← mascot v2 sobre fondo cream (#F4F4F6)
    └── buho_animations/        ← MP4 del búho animado (Ruta B)
        └── .gitkeep            (los MP4 se descargan localmente, no se commitean)
```

## Uso rápido

```bash
# Instalar dependencias (una vez)
brew install ffmpeg
pip3 install Pillow

# Modo automático (rotación voz por canal según el día de la semana):
python3 compose_video.py --mode dark --channel tiktok --out ~/Downloads/video.mp4
python3 compose_video.py --mode dark --channel youtube --out ~/Downloads/video.mp4

# Forzar voz específica (ignora rotación):
python3 compose_video.py --mode dark --voice matilda --out ~/Downloads/video.mp4

# Desactivar stinger del búho animado (Ruta A pura, ignora MP4 en buho_animations/):
python3 compose_video.py --mode dark --no-stinger --out ~/Downloads/video.mp4
```

## Lo que produce cada video

Resolución: **1080×1920** (vertical, ratio 9:16) — formato nativo de
TikTok / IG Reels / YouTube Shorts.

Duración: **14.5 segundos** (ajustable con `--duration`).

Estructura:

| Tiempo | Capa visible |
|--------|--------------|
| 0-3s | Intro: logo arriba + "Señales AI del día" + búho centrado |
| 3-6s | Banner BTC con "PROBABILIDAD ALCISTA del 85%" + flecha verde |
| 6-9s | Banner AAPL con "PROBABILIDAD ALCISTA del 72%" |
| 9-12s | Banner TSLA con "PROBABILIDAD BAJISTA del 68%" + flecha roja |
| 12-14.5s | Outro: logo grande + "Visitanos en aurex.live" (sin búho) |
| 0-12s constante | "AUREX" en oro debajo del búho (refuerzo de marca) + barra inferior `aurex.live · Inversión con AI` |

Audio: voz `Paulina` de macOS (es_MX, prototipo). Para producción, reemplazar
con ElevenLabs API en `compose_video.py:gen_audio()`.

## La constelación

Replica el efecto del onboarding de la app (`index.html` L553-587):
- 110 estrellas dorado/blancas con tamaños 1.2-3.6 px
- Movimiento sutil ±0.5 px/frame
- Parpadeo: alpha varía 0.15-1.0 con velocidad ±0.008-0.020 por frame
- Líneas finas dorado entre estrellas a < 130 px de distancia
- 1/3 estrellas oro, 2/3 blancas
- Wrap-around: salen por un lado y vuelven por el otro
- Fondo coherente con el PNG del búho (navy `(10, 20, 40)` en oscuro,
  cream `(244, 244, 246)` en claro) para que el búho se integre sin
  cuadrado visible

## Por qué algunos detalles son así

- **Logo sin texto "AUREX"** debajo del círculo: el logo original tiene
  el texto embedded; cropeado para que no duplique el texto que va
  encima en intros, banners y refuerzo "AUREX-debajo-del-búho".
- **Navy del búho idéntico al de la constelación**: si difieren en 2
  puntos RGB ya se ve un cuadrado alrededor del búho en el video.
- **Banner outro sin búho**: en el cierre el logo grande es el
  protagonista, sin que el búho se solape con el CTA.
- **"AUREX" fijo debajo del búho** durante 0-12s: refuerza la
  asociación visual mascot ↔ marca, igual que Duolingo con su búho.

## Mejoras pendientes (Fase F del Plan MKT)

- **Voz**: reemplazar `say` Paulina por **ElevenLabs** (free tier 10k
  caracteres/mes; voz femenina cálida en es-LATAM neutro). Editar
  `gen_audio()` en `compose_video.py`.
- **Animación búho (Ruta B)**: integrar Runway Gen-3 o Pika tier free
  para 1-2 videos premium semanales con el búho realmente moviéndose.
- **Variantes de guion**: hoy el demo es de "Señales AI del día". Hacer
  variantes: Alertas configurables, Termómetro de Riesgo, AUREX Pulse
  con filtros de activos.
