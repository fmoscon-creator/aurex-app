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
import os
import subprocess
import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
TEMPLATES = SCRIPT_DIR / "templates"
ASSETS = SCRIPT_DIR / "assets"
sys.path.insert(0, str(TEMPLATES))

import constelacion  # type: ignore
import banners  # type: ignore

FPS = 25
DEFAULT_DURATION = 14.5
INTRO_SEC = 3.0
OUTRO_SEC = 2.5
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


def gen_audio(text: str, work_dir: Path) -> tuple[Path, float]:
    """Prototipo: macOS `say` con voz Paulina (es_MX). Reemplazar con ElevenLabs cuando haya cuenta."""
    aiff = work_dir / "audio_raw.aiff"
    m4a = work_dir / "audio.m4a"
    subprocess.run(["say", "-v", "Paulina", "-o", str(aiff), "-r", "195", text], check=True)
    subprocess.run([
        "ffmpeg", "-y", "-i", str(aiff), "-c:a", "aac", "-b:a", "192k", str(m4a)
    ], check=True, capture_output=True)
    # Obtener duración
    out = subprocess.run([
        "ffprobe", "-v", "error", "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1", str(m4a)
    ], check=True, capture_output=True, text=True)
    return m4a, float(out.stdout.strip())


def build_video(mode: str, out_path: Path, work_dir: Path, duration: float):
    work_dir.mkdir(parents=True, exist_ok=True)

    # 1. Audio
    audio_path, audio_dur = gen_audio(GUION_DEMO, work_dir)
    duration = max(duration, audio_dur)
    print(f"[audio] {audio_path}  duración: {audio_dur:.2f}s")

    # 2. Frames constelación
    frames_dir = work_dir / f"frames_{mode}"
    constelacion.generate_frames(mode, duration, str(frames_dir))
    print(f"[constelación] frames en {frames_dir}")

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

    fc = (
        "[0:v]format=yuv420p[base];"
        "[1:v]scale=720:720,setsar=1[buho];"
        f"[base][buho]overlay=(W-w)/2:(H-h)/2+120:enable='between(t,0,{t_outro_start:.2f})':shortest=1[v0];"
        f"[v0][8:v]overlay=(W-w)/2:1380:enable='between(t,0,{t_outro_start:.2f})'[v0b];"
        f"[v0b][2:v]overlay=(W-w)/2:200:enable='between(t,0,{INTRO_SEC:.2f})'[v1];"
        f"[v1][3:v]overlay=(W-w)/2:280:enable='between(t,{t_btc_start:.2f},{t_btc_end:.2f})'[v2];"
        f"[v2][4:v]overlay=(W-w)/2:280:enable='between(t,{t_aapl_start:.2f},{t_aapl_end:.2f})'[v3];"
        f"[v3][5:v]overlay=(W-w)/2:280:enable='between(t,{t_tsla_start:.2f},{t_tsla_end:.2f})'[v4];"
        f"[v4][6:v]overlay=0:0:enable='between(t,{t_outro_start:.2f},{T:.2f})'[v5];"
        f"[v5][7:v]overlay=(W-w)/2:1720:enable='between(t,0,{t_outro_start:.2f})'[v]"
    )

    cmd = [
        "ffmpeg", "-y",
        "-framerate", str(FPS), "-i", str(frames_dir / "%04d.png"),
        "-loop", "1", "-framerate", str(FPS), "-i", str(buho_path),
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
        str(out_path)
    ]
    print(f"[FFmpeg] {' '.join(cmd[:6])} ...")
    subprocess.run(cmd, check=True)
    print(f"[OK] {out_path}")


def main():
    parser = argparse.ArgumentParser(description="Compositor de videos AUREX para canales sociales.")
    parser.add_argument("--mode", choices=["dark", "light"], default="dark")
    parser.add_argument("--out", type=str, required=True)
    parser.add_argument("--duration", type=float, default=DEFAULT_DURATION)
    parser.add_argument("--work", type=str, default="/tmp/aurex_video_work")
    args = parser.parse_args()
    build_video(args.mode, Path(args.out), Path(args.work), args.duration)


if __name__ == "__main__":
    main()
