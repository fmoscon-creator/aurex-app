#!/usr/bin/env python3
"""
Plan D — Animación local del búho v2 sin IA.

Efectos:
1. Pulsación dorada (glow exterior que respira con sine wave).
2. Oscilación rotacional (rotación ±1.5° con sine wave de período 2.5s — el búho se balancea sutilmente).
3. Zoom suave no-lineal (zoom in/out con easing — más cinemático que Ken Burns).
4. Partículas doradas orbitando (8 partículas con trayectorias circulares de distintos radios y velocidades).
5. Brillos metálicos animados (highlight overlay que se desplaza por el búho).

Output: MP4 5s @ 25fps, 1080x1920, sobre fondo navy. Listo para usar como stinger Ruta B
(reemplaza la animación que iba a hacer Kling/Luma/Runway).
"""
import math
import os
import random
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

W, H = 1080, 1920
FPS = 25
DUR = 5.0
TOTAL = int(FPS * DUR)
NAVY = (10, 20, 40)
GOLD = (212, 164, 55)
GOLD_BRIGHT = (255, 215, 130)

OUT_DIR = Path("/tmp/buho_anim_frames")
OUT_DIR.mkdir(exist_ok=True)

BUHO_PATH = "/Users/fernandomoscon/Desktop/aurex-app/scripts/video_generation/assets/buho_v2_dark_transparent.png"
OUT_MP4 = "/Users/fernandomoscon/Desktop/aurex-app/scripts/video_generation/assets/buho_animations/buho_v2_anim_LOCAL.mp4"

random.seed(42)
buho_orig = Image.open(BUHO_PATH).convert("RGBA")

# 8 partículas doradas orbitando con parámetros distintos
PARTICLES = []
for i in range(14):
    PARTICLES.append({
        "radius_orbit": random.uniform(420, 580),
        "angle_offset": random.uniform(0, 2 * math.pi),
        "angular_speed": random.uniform(0.25, 0.7),
        "size": random.uniform(6.0, 14.0),
        "alpha_phase": random.uniform(0, math.pi * 2),
    })

print(f"Generando {TOTAL} frames...")

for f in range(TOTAL):
    t = f / FPS  # tiempo en segundos
    progress = t / DUR  # 0 a 1

    # Lienzo navy
    canvas = Image.new("RGB", (W, H), NAVY)

    # === 1. Glow pulsante exterior MÁS AMPLIO (cubre el cuadrado del PNG del búho + halo) ===
    glow_intensity = 0.5 + 0.5 * math.sin(2 * math.pi * t / 2.5)  # respira en 2.5s
    glow_size = int(1150 + glow_intensity * 120)
    glow_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_layer)
    glow_alpha = int(55 + glow_intensity * 80)
    glow_draw.ellipse(
        [(W - glow_size) // 2, (H - glow_size) // 2 + 120,
         (W + glow_size) // 2, (H + glow_size) // 2 + 120],
        fill=(*GOLD, glow_alpha),
    )
    glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(radius=80))
    canvas.paste(glow_layer, (0, 0), glow_layer)

    # === 2. Zoom suave + oscilación rotacional del búho ===
    # Zoom: entra de 1.0 a 1.08 y vuelve, con easing
    zoom = 1.0 + 0.04 * (1 - math.cos(2 * math.pi * progress)) / 2
    # Rotación: sine wave ±1.5°
    rot_deg = 1.5 * math.sin(2 * math.pi * t / 2.5)

    # Aplicar
    base_size = 720
    new_size = int(base_size * zoom)
    buho_resized = buho_orig.resize((new_size, new_size), Image.LANCZOS)
    buho_rotated = buho_resized.rotate(rot_deg, resample=Image.BICUBIC, expand=False)

    # Posición centrada
    pos_x = (W - new_size) // 2
    pos_y = (H - new_size) // 2 + 120
    canvas.paste(buho_rotated, (pos_x, pos_y), buho_rotated)

    # === 3. (Brillo metálico animado removido — causaba sombra inversa con paste alpha) ===

    # === 4. Partículas doradas orbitando ===
    cx, cy = W // 2, H // 2 + 480
    p_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    p_draw = ImageDraw.Draw(p_layer)
    for p in PARTICLES:
        angle = p["angle_offset"] + t * p["angular_speed"]
        px = cx + p["radius_orbit"] * math.cos(angle)
        py = cy + p["radius_orbit"] * math.sin(angle) * 0.6  # elipse, no círculo
        size = p["size"]
        alpha = int(120 + 100 * math.sin(p["alpha_phase"] + t * 1.2))
        alpha = max(50, min(220, alpha))
        p_draw.ellipse([px - size, py - size, px + size, py + size],
                       fill=(*GOLD_BRIGHT, alpha))
    p_layer = p_layer.filter(ImageFilter.GaussianBlur(radius=2))
    canvas.paste(p_layer, (0, 0), p_layer)

    canvas.save(OUT_DIR / f"{f:04d}.png")

print(f"Frames OK. Compilando MP4...")

# Compilar a MP4 con FFmpeg
subprocess.run([
    "ffmpeg", "-y",
    "-framerate", str(FPS),
    "-i", str(OUT_DIR / "%04d.png"),
    "-c:v", "libx264", "-preset", "fast", "-crf", "20", "-pix_fmt", "yuv420p",
    "-vf", "fps=25",
    OUT_MP4
], check=True, capture_output=True)
print(f"OK: {OUT_MP4}")
