#!/usr/bin/env python3
"""
Componedor de videos AUREX para canales sociales (TikTok / IG Reels / YouTube Shorts).

Pipeline:
1. Genera frames de constelación animada (templates/constelacion.py)
2. Genera banners PNG (templates/banners.py): intro, signal, outro, URL inferior, AUREX-búho
3. Genera audio TTS (macOS `say` como prototipo, ElevenLabs cuando haya cuenta)
4. Compose con FFmpeg: constelación base → búho (Ken Burns) → banners overlayed con timing

Uso:
    python3 compose_video.py --mode dark --out ~/Downloads/AUREX_VIDEO_dark.mp4
    python3 compose_video.py --mode light --out ~/Downloads/AUREX_VIDEO_light.mp4

Requisitos:
    - Python 3 con Pillow
    - FFmpeg instalado
    - macOS para `say` (prototipo). Para producción, ElevenLabs API key.
"""
import argparse
import json
import os
import subprocess
import sys
from pathlib import Path
from typing import Optional, Tuple

SCRIPT_DIR = Path(__file__).parent
TEMPLATES = SCRIPT_DIR / "templates"
ASSETS = SCRIPT_DIR / "assets"
sys.path.insert(0, str(TEMPLATES))

import constelacion  # type: ignore
import banners  # type: ignore
import buho_anim_local  # type: ignore

FPS = 25
DEFAULT_DURATION = 14.5
INTRO_SEC = 3.0
OUTRO_SEC = 2.5

# Voces ElevenLabs aprobadas para AUREX (modelo multilingual_v2).
# Selección final hecha por Fernando el 30-abr-2026 después de probar las 21 voces default.
# 8 voces aprobadas: 4 femeninas + 4 masculinas. Asignación canal → voz + rotación por día.
# Specs sección 2.4 del PLAN_MKT: tono directo y confiante, sin condescender.
ELEVENLABS_VOICES = {
    # FEMENINAS
    "matilda": "XrExE9yKIg1WjnnlVkGX",   # Profesional, seria, madura
    "bella":   "hpp4J3VqNfWAUOO0d1Us",   # Profesional, brillante, cálida
    "jessica": "cgSgspJ2msm6clMCkdW9",   # Juvenil, jovial, cálida
    "lily":    "pFZP5JQG7iQjIQuC4Bku",   # Aterciopelada, británica
    # MASCULINAS
    "charlie": "IKne3meq5aSn9XLyUdCD",   # Profundo, seguro, energético
    "brian":   "nPczCjzI2devNBz1zQrb",   # Profundo, resonante, comforting
    "bill":    "pqHfZKP75CvOlQylNhV4",   # Sabio, maduro, balanceado
    "chris":   "iP95p4xoKVk53GoZ742B",   # Carismático, down-to-earth
}

# Asignación de voces por canal. Cada canal tiene 1 femenina + 1 masculina que rotan
# por día: lunes/miércoles/viernes la femenina, martes/jueves la masculina.
# Domingo + sábado se repite la femenina (más videos diarios en weekday).
ELEVENLABS_CHANNEL_VOICES = {
    "tiktok":    ("jessica", "chris"),    # videos cortos jóvenes
    "reels":     ("jessica", "chris"),    # IG Reels
    "shorts":    ("jessica", "chris"),    # YouTube Shorts
    "youtube":   ("matilda", "brian"),    # YouTube canal largo (análisis 5-10 min)
    "linkedin":  ("lily",    "bill"),     # LinkedIn Company Page (B2B)
    "instagram": ("bella",   "charlie"),  # IG feed + Stories
    "default":   ("matilda", "charlie"),  # cualquier canal no listado
}

ELEVENLABS_DEFAULT_VOICE = "matilda"
ELEVENLABS_MODEL = "eleven_multilingual_v2"
ELEVENLABS_VOICE_SETTINGS = {
    "stability": 0.5,
    "similarity_boost": 0.75,
    "style": 0.3,
    "use_speaker_boost": True,
}


def get_voice_for_channel(channel: str, weekday: Optional[int] = None) -> str:
    """Devuelve la voz a usar según canal + día de la semana (rotación).
    Lunes/miércoles/viernes/sábado/domingo → femenina (4 días/semana).
    Martes/jueves → masculina (2 días/semana).

    Args:
        channel: nombre del canal (tiktok, reels, shorts, youtube, linkedin, instagram).
        weekday: 0=lunes, 6=domingo. Si None, usa hoy.
    """
    import datetime
    if weekday is None:
        weekday = datetime.datetime.now().weekday()
    voices = ELEVENLABS_CHANNEL_VOICES.get(channel, ELEVENLABS_CHANNEL_VOICES["default"])
    fem, masc = voices
    # Martes (1) y jueves (3) → masculina. Resto → femenina.
    return masc if weekday in (1, 3) else fem


# Catálogo emocional del búho v2 — decisión cerrada 1-may-2026 (ver docs/BUHO_ESTADOS_EMOCIONALES.md).
# Cada estado se aplica como stinger al inicio del video según el tipo de contenido.
EMOTION_TO_FILE = {
    "confianza": "buho_confianza.mp4",  # CONFIANZA ALTA / CELEBRACIÓN — Alta Convicción IA, milestones, lanzamientos
    "serio":     "buho_serio.mp4",       # NEUTRAL / OBSERVADOR — posts diarios, market wrap, señales IA estándar
    "alerta":    "buho_alerta.mp4",      # ADVERTENCIA / RIESGO — advertencias regulatorias, caídas relevantes
}
GUION_DEMO = (
    "Hoy AUREX detectó tres señales de alta convicción. "
    "Bitcoin: con probabilidad alcista del ochenta y cinco por ciento. "
    "Apple: con probabilidad alcista del setenta y dos por ciento. "
    "Tesla: con probabilidad bajista del sesenta y ocho por ciento. "
    "Para acceder a más señales visitanos en aurex punto live."
)

# Señales del demo (cambian por tipo de video)
SIGNALS_DEMO = [
    ("BTC", 85, "ALCISTA"),
    ("AAPL", 72, "ALCISTA"),
    ("TSLA", 68, "BAJISTA"),
]


def _audio_duration(m4a: Path) -> float:
    out = subprocess.run([
        "ffprobe", "-v", "error", "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1", str(m4a)
    ], check=True, capture_output=True, text=True)
    return float(out.stdout.strip())


def gen_audio_say(text: str, work_dir: Path) -> Tuple[Path, float]:
    """Fallback: macOS `say` con voz Paulina (es_MX). Sólo si ElevenLabs no está disponible."""
    aiff = work_dir / "audio_raw.aiff"
    m4a = work_dir / "audio.m4a"
    subprocess.run(["say", "-v", "Paulina", "-o", str(aiff), "-r", "195", text], check=True)
    subprocess.run([
        "ffmpeg", "-y", "-i", str(aiff), "-c:a", "aac", "-b:a", "192k", str(m4a)
    ], check=True, capture_output=True)
    return m4a, _audio_duration(m4a)


def gen_audio_elevenlabs(text: str, work_dir: Path, api_key: str, voice: str = ELEVENLABS_DEFAULT_VOICE) -> Tuple[Path, float]:
    """Voz IA real con ElevenLabs (modelo multilingual_v2).
    Specs sección 2.4 del PLAN_MKT: tono directo y confiante en español neutro LATAM.
    Voces aprobadas: matilda (default femenina), charlie (masculina alternativa).
    Free tier: 10k caracteres/mes.
    """
    voice_id = ELEVENLABS_VOICES.get(voice, ELEVENLABS_VOICES[ELEVENLABS_DEFAULT_VOICE])
    mp3 = work_dir / "audio_eleven.mp3"
    m4a = work_dir / "audio.m4a"
    payload = json.dumps({
        "text": text,
        "model_id": ELEVENLABS_MODEL,
        "voice_settings": ELEVENLABS_VOICE_SETTINGS,
    })
    r = subprocess.run([
        "curl", "-s", "--max-time", "120",
        "-w", "%{http_code}",
        "-X", "POST",
        f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}",
        "-H", f"xi-api-key: {api_key}",
        "-H", "Content-Type: application/json",
        "-d", payload,
        "-o", str(mp3),
    ], check=True, capture_output=True, text=True)
    http_code = r.stdout.strip().split()[-1] if r.stdout else ""
    if not mp3.exists() or mp3.stat().st_size < 1000:
        # Fallar si la respuesta es muy chica (probablemente JSON de error)
        body = mp3.read_text(errors="ignore") if mp3.exists() else "(sin response)"
        raise RuntimeError(f"ElevenLabs HTTP {http_code}: {body[:200]}")
    subprocess.run([
        "ffmpeg", "-y", "-i", str(mp3), "-c:a", "aac", "-b:a", "192k", str(m4a)
    ], check=True, capture_output=True)
    return m4a, _audio_duration(m4a)


def get_elevenlabs_api_key() -> Optional[str]:
    """Busca la API key de ElevenLabs en (orden): env var, /tmp, txt en Descargas."""
    key = os.environ.get("ELEVENLABS_API_KEY")
    if key:
        return key.strip()
    # Probar paths alternativos (necesario en macOS donde Downloads puede estar bloqueado para subprocess)
    candidates = [
        Path("/tmp/aurex_eleven.txt"),
        Path.home() / "Downloads" / "SECRET ELEVENLABS.txt",
    ]
    for txt in candidates:
        try:
            if txt.exists():
                content = txt.read_text().strip()
                if "=" in content:
                    return content.split("=", 1)[1].strip()
                return content
        except (PermissionError, OSError):
            continue
    return None


def gen_audio(text: str, work_dir: Path, voice: str = ELEVENLABS_DEFAULT_VOICE) -> Tuple[Path, float]:
    """Genera el audio del video. Prefiere ElevenLabs (voz real); fallback a `say` macOS."""
    api_key = get_elevenlabs_api_key()
    if api_key:
        try:
            print(f"[audio] usando ElevenLabs (voz {voice})")
            return gen_audio_elevenlabs(text, work_dir, api_key, voice)
        except Exception as e:
            print(f"[audio] ElevenLabs falló: {e}. Fallback a macOS say.")
    print("[audio] usando macOS say Paulina (prototipo)")
    return gen_audio_say(text, work_dir)


def find_buho_stinger(role: str = "intro", emotion: Optional[str] = None) -> Optional[Path]:
    """Busca un MP4 del búho animado para usar como stinger del video.

    Si `emotion` está dado y coincide con el catálogo cerrado del 1-may-2026
    (confianza / serio / alerta), prioriza ese archivo. Si no, fallback al
    comportamiento legacy por `role` (intro/outro con keywords parpadeo/zoom/etc).

    role='intro' → prefiere parpadeo o breathing (legacy, sutil para abrir).
    role='outro' → prefiere zoom (legacy, dramático para cerrar).

    Retorna None si no hay videos del búho animado disponibles (pipeline corre Ruta A pura).

    Los MP4 deben estar en assets/buho_animations/.
    """
    anim_dir = ASSETS / "buho_animations"
    if not anim_dir.exists():
        return None
    # Catálogo emocional cerrado tiene prioridad absoluta.
    if emotion and emotion in EMOTION_TO_FILE:
        candidate = anim_dir / EMOTION_TO_FILE[emotion]
        if candidate.exists():
            return candidate
    # Fallback legacy por role.
    if role == "intro":
        priorities = ["parpadeo", "breathing", "anim_01", "anim_02"]
    else:
        priorities = ["zoom", "anim_03"]
    for keyword in priorities:
        matches = sorted(anim_dir.glob(f"*{keyword}*.mp4"))
        if matches:
            return matches[0]
    matches = sorted(anim_dir.glob("*.mp4"))
    return matches[0] if matches else None


def prepend_stinger(main_video: Path, stinger: Path, out_path: Path, work_dir: Path):
    """Concatena un stinger al INICIO del video principal con FFmpeg.

    Adaptaciones del stinger antes de concatenar:
    1. Crop bottom 80px (tapa watermark de Kling/Pika tier free).
    2. Scale a altura 720 manteniendo aspect ratio (mismo tamaño que el búho del video principal).
    3. Pad a 1080x1920 con navy AUREX (#0A1428) para que se funda con el fondo.
       El búho del stinger queda en Y=600-1320 (mismas coordenadas que el video principal),
       garantizando continuidad visual sin "salto" cuando termina el stinger.
    4. Track de audio silencio si el stinger no tiene (la voz del guion arranca después).
    """
    norm = work_dir / "stinger_norm.mp4"
    subprocess.run([
        "ffmpeg", "-y",
        "-i", str(stinger),
        "-f", "lavfi", "-i", "anullsrc=channel_layout=stereo:sample_rate=44100",
        "-filter_complex",
        "[0:v]crop=iw:ih-80:0:0,"
        "scale=-2:720,"
        "pad=1080:1920:(ow-iw)/2:600:0x0A1428,"
        "setsar=1,fps=25[v]",
        "-map", "[v]", "-map", "1:a",
        "-c:v", "libx264", "-preset", "fast", "-crf", "20", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "192k",
        "-shortest",
        str(norm)
    ], check=True, capture_output=True)
    # Concat list
    concat_list = work_dir / "concat_list.txt"
    concat_list.write_text(f"file '{norm}'\nfile '{main_video}'\n")
    # Concatenar (re-encode necesario porque codecs/parámetros pueden diferir mínimamente)
    subprocess.run([
        "ffmpeg", "-y",
        "-f", "concat", "-safe", "0",
        "-i", str(concat_list),
        "-c:v", "libx264", "-preset", "fast", "-crf", "20", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "192k",
        str(out_path)
    ], check=True, capture_output=True)


def build_video(mode: str, out_path: Path, work_dir: Path, duration: float,
                voice: str = ELEVENLABS_DEFAULT_VOICE, use_anim: bool = True,
                emotion: Optional[str] = None):
    work_dir.mkdir(parents=True, exist_ok=True)

    # 1. Audio
    audio_path, audio_dur = gen_audio(GUION_DEMO, work_dir, voice)
    duration = max(duration, audio_dur)
    print(f"[audio] {audio_path}  duración: {audio_dur:.2f}s")

    # 2. Frames constelación
    frames_dir = work_dir / f"frames_{mode}"
    constelacion.generate_frames(mode, duration, str(frames_dir))
    print(f"[constelación] frames en {frames_dir}")

    # 2b. Frames del búho animado (Plan D — Ruta B integrada).
    # Si está disponible el PNG transparente del búho, se generan frames con
    # animación local (glow + partículas + rotación + zoom) durante toda la
    # duración del video. Los frames se overlayean sobre la constelación con alpha.
    # Si no, fallback a PNG estático (Ruta A pura).
    buho_anim_dir = None
    transparent_buho = ASSETS / f"buho_v2_{mode}_transparent.png"
    if transparent_buho.exists() and use_anim:
        buho_anim_dir = work_dir / f"buho_anim_{mode}"
        # buho_anim_local.py usa BUHO_PATH=buho_v2_dark_transparent.png hardcoded
        # para modo dark. Para light habría que parametrizar (TODO cuando haya
        # transparente para light).
        if mode == "dark":
            buho_anim_local.generate_frames(duration, str(buho_anim_dir))
            print(f"[búho animado] frames en {buho_anim_dir}")
        else:
            buho_anim_dir = None  # fallback estático para light por ahora

    # 3. Banners
    logo_path = ASSETS / "logo_solo_circulo.png"
    if not logo_path.exists():
        sys.exit(f"ERROR: falta {logo_path}. Ver scripts/video_generation/README.md")
    buho_path = ASSETS / f"buho_v2_{mode}.png"
    if not buho_path.exists():
        sys.exit(f"ERROR: falta {buho_path}. Copiar de scripts/mascot_processing/")

    b_intro = work_dir / "banner_intro.png"
    b_btc = work_dir / "banner_btc.png"
    b_aapl = work_dir / "banner_aapl.png"
    b_tsla = work_dir / "banner_tsla.png"
    b_outro = work_dir / "banner_outro.png"
    b_url = work_dir / "banner_url.png"
    b_aurex = work_dir / "banner_aurex_buho.png"

    banners.banner_intro(b_intro, str(logo_path), "Señales AI del día", mode)
    banners.banner_signal(b_btc, "BTC", 85, "ALCISTA", mode)
    banners.banner_signal(b_aapl, "AAPL", 72, "ALCISTA", mode)
    banners.banner_signal(b_tsla, "TSLA", 68, "BAJISTA", mode)
    banners.banner_outro(b_outro, str(logo_path), mode)
    banners.banner_url_inferior(b_url, mode)
    banners.banner_aurex_buho(b_aurex, mode)
    print("[banners] 7 PNG generados")

    # 4. Composición FFmpeg con timings dinámicos
    # Estructura del video según duración total T del audio:
    # - intro:    0 → INTRO_SEC                      (3.0s default)
    # - BTC:      INTRO_SEC → INTRO_SEC + body/3
    # - AAPL:     +body/3 → +2*body/3
    # - TSLA:     +2*body/3 → T - OUTRO_SEC
    # - outro:    T - OUTRO_SEC → T                  (2.5s default)
    # body = T - INTRO_SEC - OUTRO_SEC
    T = duration
    body_start = INTRO_SEC
    body_end = T - OUTRO_SEC
    body = body_end - body_start
    seg = body / 3.0
    t_btc_start, t_btc_end = body_start, body_start + seg
    t_aapl_start, t_aapl_end = t_btc_end, t_btc_end + seg
    t_tsla_start, t_tsla_end = t_aapl_end, body_end
    t_outro_start, t_outro_end = body_end, T
    print(f"[timings] intro 0-{INTRO_SEC} | BTC {t_btc_start:.2f}-{t_btc_end:.2f} | "
          f"AAPL {t_aapl_start:.2f}-{t_aapl_end:.2f} | TSLA {t_tsla_start:.2f}-{t_tsla_end:.2f} | "
          f"outro {t_outro_start:.2f}-{T:.2f}")

    # Si tenemos frames del búho animado (Plan D), el input 1 es la secuencia
    # de PNGs transparentes (1080x1920 cada uno con búho + glow + partículas).
    # Si no, fallback a PNG estático con scale a 720x720.
    if buho_anim_dir:
        buho_input_args = ["-framerate", str(FPS), "-i", str(buho_anim_dir / "%04d.png")]
        # Los frames del búho ya son 1080x1920 con búho posicionado, overlay en (0,0)
        buho_filter = "[1:v]format=yuva420p[buho]"
        buho_overlay = f"[base][buho]overlay=0:0:enable='between(t,0,{t_outro_start:.2f})':shortest=1[v0]"
    else:
        buho_input_args = ["-loop", "1", "-framerate", str(FPS), "-i", str(buho_path)]
        buho_filter = "[1:v]scale=720:720,setsar=1[buho]"
        buho_overlay = f"[base][buho]overlay=(W-w)/2:(H-h)/2+120:enable='between(t,0,{t_outro_start:.2f})':shortest=1[v0]"

    fc = (
        "[0:v]format=yuv420p[base];"
        f"{buho_filter};"
        f"{buho_overlay};"
        f"[v0][8:v]overlay=(W-w)/2:1380:enable='between(t,0,{t_outro_start:.2f})'[v0b];"
        f"[v0b][2:v]overlay=(W-w)/2:200:enable='between(t,0,{INTRO_SEC:.2f})'[v1];"
        f"[v1][3:v]overlay=(W-w)/2:240:enable='between(t,{t_btc_start:.2f},{t_btc_end:.2f})'[v2];"
        f"[v2][4:v]overlay=(W-w)/2:240:enable='between(t,{t_aapl_start:.2f},{t_aapl_end:.2f})'[v3];"
        f"[v3][5:v]overlay=(W-w)/2:240:enable='between(t,{t_tsla_start:.2f},{t_tsla_end:.2f})'[v4];"
        f"[v4][6:v]overlay=0:0:enable='between(t,{t_outro_start:.2f},{T:.2f})'[v5];"
        f"[v5][7:v]overlay=(W-w)/2:1720:enable='between(t,0,{t_outro_start:.2f})'[v]"
    )

    cmd = [
        "ffmpeg", "-y",
        "-framerate", str(FPS), "-i", str(frames_dir / "%04d.png"),
    ] + buho_input_args + [
        "-loop", "1", "-framerate", str(FPS), "-i", str(b_intro),
        "-loop", "1", "-framerate", str(FPS), "-i", str(b_btc),
        "-loop", "1", "-framerate", str(FPS), "-i", str(b_aapl),
        "-loop", "1", "-framerate", str(FPS), "-i", str(b_tsla),
        "-loop", "1", "-framerate", str(FPS), "-i", str(b_outro),
        "-loop", "1", "-framerate", str(FPS), "-i", str(b_url),
        "-loop", "1", "-framerate", str(FPS), "-i", str(b_aurex),
        "-i", str(audio_path),
        "-filter_complex", fc,
        "-map", "[v]", "-map", "9:a",
        "-c:v", "libx264", "-preset", "fast", "-crf", "20", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "192k",
        "-t", f"{T:.2f}",
        str(out_path),
    ]
    print(f"[FFmpeg] {'búho animado' if buho_anim_dir else 'búho estático'} -> {out_path.name}")
    subprocess.run(cmd, check=True)

    # Stinger del búho según estado emocional (Ruta B integrada al inicio del video).
    if emotion:
        stinger = find_buho_stinger(role="intro", emotion=emotion)
        if stinger:
            print(f"[stinger] aplicando estado '{emotion}' desde {stinger.name}")
            stingered = work_dir / f"{out_path.stem}_with_stinger.mp4"
            prepend_stinger(out_path, stinger, stingered, work_dir)
            stingered.replace(out_path)
        else:
            print(f"[stinger] AVISO: no encontré stinger para emotion '{emotion}', sigo sin stinger")

    print(f"[OK] {out_path}")


def main():
    parser = argparse.ArgumentParser(description="Compositor de videos AUREX para canales sociales.")
    parser.add_argument("--mode", choices=["dark", "light"], default="dark")
    parser.add_argument("--out", type=str, required=True)
    parser.add_argument("--duration", type=float, default=DEFAULT_DURATION)
    parser.add_argument("--work", type=str, default="/tmp/aurex_video_work")
    parser.add_argument("--voice", choices=list(ELEVENLABS_VOICES.keys()),
                        help="Voz ElevenLabs específica. Si no se especifica, se usa la del canal según el día.")
    parser.add_argument("--channel", choices=list(ELEVENLABS_CHANNEL_VOICES.keys()), default="default",
                        help="Canal de destino. Determina la voz si --voice no está dado (rotación por día).")
    parser.add_argument("--no-anim", action="store_true",
                        help="Desactiva la animación local del búho (Plan D). Usa PNG estático.")
    parser.add_argument("--emotion", choices=list(EMOTION_TO_FILE.keys()),
                        help="Estado emocional del búho como stinger inicial. Catálogo cerrado el 1-may-2026: "
                             "'confianza' (Alta Convicción IA, milestones), 'serio' (posts diarios neutros), "
                             "'alerta' (advertencias, riesgo). Sin este flag el video no lleva stinger.")
    args = parser.parse_args()
    voice = args.voice if args.voice else get_voice_for_channel(args.channel)
    print(f"[voz] canal={args.channel} -> voz={voice}")
    if args.emotion:
        print(f"[emotion] estado del búho={args.emotion}")
    build_video(args.mode, Path(args.out), Path(args.work), args.duration, voice, not args.no_anim, args.emotion)


if __name__ == "__main__":
    main()
