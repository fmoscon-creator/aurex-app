#!/usr/bin/env python3
"""
process_v0.py — AUREX mascot v0 (búho metal oro pulido)

Procesa el source v0 (búho originalmente oscuro con dorado) aplicando:
1. Remover fondo navy con rembg (modelo U-2-Net).
2. Gamma correction (0.75) para distribuir luminosidad al rango medio.
3. Gradient map metálico calibrado a la paleta de v1 con sombras dorado-profundo
   y highlights metal oro pulido casi blanco-amarillento.
4. Composición sobre fondo cream (modo claro) y fondo navy (modo oscuro).

Versión final aprobada por Fernando el 30-abr-2026.

Salida:
  - AUREX_FINAL_v0_modo_claro.png
  - AUREX_FINAL_v0_modo_oscuro.png

Uso:
  pip3 install Pillow numpy rembg onnxruntime
  python3 process_v0.py
"""
import io
import os
import sys
from pathlib import Path

from PIL import Image
import numpy as np
from rembg import remove

# Paths
SCRIPT_DIR = Path(__file__).parent
SOURCE = SCRIPT_DIR / "sources" / "v0_source.png"
OUT_DIR = Path(os.environ.get("AUREX_OUT", str(Path.home() / "Downloads")))

# Colores AUREX
CREAM = (244, 244, 246, 255)  # #F4F4F6 fondo modo claro
NAVY = (10, 20, 40, 255)      # #0A1428 fondo modo oscuro

# Gradient map metal oro pulido (calibrado a paleta de v1)
# Stops (luminosidad → RGB):
#   0.00 → (40, 22, 3)     bronce profundo
#   0.25 → (110, 70, 18)   bronce dorado
#   0.50 → (200, 150, 45)  oro mate
#   0.75 → (250, 215, 95)  oro brillante
#   1.00 → (255, 250, 200) highlight metal pulido (casi blanco amarillento)
STOPS_R = [40, 110, 200, 250, 255]
STOPS_G = [22, 70, 150, 215, 250]
STOPS_B = [3, 18, 45, 95, 200]
GAMMA = 0.75

def remove_background(img_path: Path) -> Image.Image:
    """Remueve el fondo con rembg + modelo U-2-Net. Devuelve RGBA."""
    with open(img_path, "rb") as f:
        output_bytes = remove(f.read())
    return Image.open(io.BytesIO(output_bytes)).convert("RGBA")

def lerp(a, b, t):
    return a + (b - a) * t

def gradient_map(lum_array, stops):
    """Aplica gradient map de 5 stops sobre array de luminosidad [0..1]."""
    return np.where(lum_array < 0.25, lerp(stops[0], stops[1], lum_array / 0.25),
           np.where(lum_array < 0.50, lerp(stops[1], stops[2], (lum_array - 0.25) / 0.25),
           np.where(lum_array < 0.75, lerp(stops[2], stops[3], (lum_array - 0.50) / 0.25),
                                      lerp(stops[3], stops[4], (lum_array - 0.75) / 0.25))))

def apply_metal_gold(img_rgba: Image.Image) -> Image.Image:
    """Aplica gamma + gradient map metal oro al búho aislado."""
    arr = np.array(img_rgba).astype(float)
    mask_alpha = arr[:, :, 3] > 0

    lum = (arr[:, :, 0] + arr[:, :, 1] + arr[:, :, 2]) / (3 * 255.0)
    lum_boosted = np.power(lum, GAMMA)

    arr[mask_alpha, 0] = gradient_map(lum_boosted, STOPS_R)[mask_alpha].clip(0, 255)
    arr[mask_alpha, 1] = gradient_map(lum_boosted, STOPS_G)[mask_alpha].clip(0, 255)
    arr[mask_alpha, 2] = gradient_map(lum_boosted, STOPS_B)[mask_alpha].clip(0, 255)

    return Image.fromarray(arr.astype(np.uint8))

def composite_on_bg(transparent_img: Image.Image, bg_color: tuple) -> Image.Image:
    """Componer imagen RGBA sobre fondo de color sólido (devuelve RGB)."""
    w, h = transparent_img.size
    bg = Image.new("RGBA", (w, h), bg_color)
    bg.paste(transparent_img, (0, 0), transparent_img)
    return bg.convert("RGB")

def main():
    if not SOURCE.exists():
        print(f"ERROR: source no encontrado: {SOURCE}", file=sys.stderr)
        sys.exit(1)

    print(f"Source: {SOURCE}")
    transparent = remove_background(SOURCE)
    print(f"  fondo removido (rembg): {transparent.size}")

    metal_img = apply_metal_gold(transparent)
    print(f"  metal oro aplicado")

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    light_path = OUT_DIR / "AUREX_FINAL_v0_modo_claro.png"
    dark_path = OUT_DIR / "AUREX_FINAL_v0_modo_oscuro.png"

    composite_on_bg(metal_img, CREAM).save(light_path, "PNG")
    composite_on_bg(metal_img, NAVY).save(dark_path, "PNG")

    print(f"\nGenerados:")
    print(f"  {light_path}")
    print(f"  {dark_path}")

if __name__ == "__main__":
    main()
