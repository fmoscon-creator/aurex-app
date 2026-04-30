#!/usr/bin/env python3
"""
PLANTILLA: Constelación AUREX animada — fondo de marca para videos cortos.

Replica el efecto del onboarding de la app (index.html L553-587):
70-110 estrellas dorado/blancas titilantes + líneas finas dorado entre estrellas
cercanas. Las estrellas se mueven sutilmente. Las líneas aparecen y desaparecen
según las distancias entre estrellas en cada frame.

Uso (modo oscuro o claro):
    python3 constelacion.py --mode dark --duration 14.5 --out frames_dark/
    python3 constelacion.py --mode light --duration 30 --out frames_light/

Después FFmpeg compone los frames como video con búho + audio:
    ffmpeg -framerate 25 -i frames_dark/%04d.png ... AUREX_VIDEO.mp4

Parámetros calibrados:
- 110 estrellas (más densa que el onboarding original de 70 — para video da más impacto)
- Tamaño estrellas 1.2 a 3.6 px (mayor que onboarding por resolución de video 1080x1920)
- Líneas dorado #D4A017 con alpha decreciente con distancia (max 0.55 a 0 px → 0 a 130 px)
- 1/3 de las estrellas en oro, 2/3 en blanco — variedad visual
- Movimiento estrellas: ±0.5 px/frame (vx, vy)
- Parpadeo: alpha varía 0.15 a 1.0 con velocidad ±0.008 a ±0.020 por frame
- Wrap-around: estrellas que salen del frame vuelven por el otro lado

Resolución: 1080x1920 (vertical TikTok/Reels/Shorts).
Frame rate: 25 fps.
"""
import argparse
import math
import os
import random
from PIL import Image, ImageDraw

W, H = 1080, 1920
FPS = 25
NUM_STARS = 110
GOLD = (212, 160, 23)

# Modos: navy igualado al PNG del búho (compose_video.py mantiene coherencia)
MODES = {
    "dark": {
        "bg": (10, 20, 40),  # Navy AUREX
        "line_color": GOLD,
        "star_white": (255, 255, 255),
        "star_gold": (245, 200, 70),
        "line_max_alpha": 0.55,
    },
    "light": {
        "bg": (244, 244, 246),  # Cream AUREX
        "line_color": (180, 130, 10),  # Oro más oscuro para contraste sobre cream
        "star_white": (60, 60, 80),  # Estrellas oscuras sobre cream
        "star_gold": (180, 130, 10),
        "line_max_alpha": 0.40,
    },
}


def generate_frames(mode: str, duration: float, out_dir: str, seed: int = 7):
    cfg = MODES[mode]
    total_frames = int(FPS * duration)
    os.makedirs(out_dir, exist_ok=True)
    random.seed(seed)

    stars = []
    for _ in range(NUM_STARS):
        stars.append({
            "x": random.random() * W,
            "y": random.random() * H,
            "r": random.random() * 2.4 + 1.2,
            "alpha": random.random() * 0.6 + 0.4,
            "da": (random.random() * 0.012 + 0.008) * (1 if random.random() < 0.5 else -1),
            "vx": (random.random() - 0.5) * 0.5,
            "vy": (random.random() - 0.5) * 0.5,
        })

    for f in range(total_frames):
        img = Image.new("RGB", (W, H), cfg["bg"])
        draw = ImageDraw.Draw(img, "RGBA")
        for i in range(NUM_STARS):
            for j in range(i + 1, NUM_STARS):
                dx = stars[i]["x"] - stars[j]["x"]
                dy = stars[i]["y"] - stars[j]["y"]
                dist = math.sqrt(dx * dx + dy * dy)
                if dist < 130:
                    a = int(cfg["line_max_alpha"] * (1 - dist / 130) * 255)
                    draw.line(
                        [(stars[i]["x"], stars[i]["y"]),
                         (stars[j]["x"], stars[j]["y"])],
                        fill=(*cfg["line_color"], a), width=1)
        for idx, s in enumerate(stars):
            a = max(0.15, min(1.0, s["alpha"]))
            r = s["r"]
            x, y = s["x"], s["y"]
            col = (*cfg["star_white"], int(a * 255)) if idx % 3 != 0 else (*cfg["star_gold"], int(a * 255))
            draw.ellipse([x - r, y - r, x + r, y + r], fill=col)
            s["alpha"] += s["da"]
            if s["alpha"] > 1 or s["alpha"] < 0.15:
                s["da"] *= -1
            s["x"] += s["vx"]
            s["y"] += s["vy"]
            if s["x"] < 0: s["x"] = W
            if s["x"] > W: s["x"] = 0
            if s["y"] < 0: s["y"] = H
            if s["y"] > H: s["y"] = 0
        img.save(os.path.join(out_dir, f"{f:04d}.png"))

    return total_frames


def main():
    parser = argparse.ArgumentParser(description="Generador de constelación AUREX para videos.")
    parser.add_argument("--mode", choices=["dark", "light"], default="dark")
    parser.add_argument("--duration", type=float, default=14.5, help="Segundos")
    parser.add_argument("--out", type=str, required=True, help="Carpeta de salida")
    parser.add_argument("--seed", type=int, default=7)
    args = parser.parse_args()
    n = generate_frames(args.mode, args.duration, args.out, args.seed)
    print(f"OK {n} frames generados en {args.out} (modo {args.mode}, {args.duration}s)")


if __name__ == "__main__":
    main()
