#!/usr/bin/env python3
"""
process_v1_v2.py — AUREX mascots v1 (cuerpo completo con rama) y v2 (geometric premium)

Procesa los sources v1 y v2 con:
1. Remover fondo blanco con rembg (modelo U-2-Net).
2. Composición sobre fondo cream (modo claro) y navy (modo oscuro).

Sin gradient map: estos mascots ya nacieron dorados desde la generación, solo
hay que aislar el sujeto y componerlo sobre el fondo correspondiente.

Versión final aprobada por Fernando el 30-abr-2026.

Salida:
  - AUREX_FINAL_v1_modo_claro.png  / AUREX_FINAL_v1_modo_oscuro.png
  - AUREX_FINAL_v2_modo_claro.png  / AUREX_FINAL_v2_modo_oscuro.png

Uso:
  pip3 install Pillow rembg onnxruntime
  python3 process_v1_v2.py
"""
import io
import os
import sys
from pathlib import Path

from PIL import Image
from rembg import remove

SCRIPT_DIR = Path(__file__).parent
SOURCES = {
    "v1": SCRIPT_DIR / "sources" / "v1_source.png",
    "v2": SCRIPT_DIR / "sources" / "v2_source.png",
}
OUT_DIR = Path(os.environ.get("AUREX_OUT", str(Path.home() / "Downloads")))

CREAM = (244, 244, 246, 255)
NAVY = (10, 20, 40, 255)

def remove_background(img_path: Path) -> Image.Image:
    with open(img_path, "rb") as f:
        output_bytes = remove(f.read())
    return Image.open(io.BytesIO(output_bytes)).convert("RGBA")

def composite_on_bg(transparent_img: Image.Image, bg_color: tuple) -> Image.Image:
    w, h = transparent_img.size
    bg = Image.new("RGBA", (w, h), bg_color)
    bg.paste(transparent_img, (0, 0), transparent_img)
    return bg.convert("RGB")

def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    for version, src_path in SOURCES.items():
        if not src_path.exists():
            print(f"ERROR: source {version} no encontrado: {src_path}", file=sys.stderr)
            sys.exit(1)

        print(f"\n[{version}] source: {src_path}")
        transparent = remove_background(src_path)
        print(f"  fondo removido: {transparent.size}")

        light_path = OUT_DIR / f"AUREX_FINAL_{version}_modo_claro.png"
        dark_path = OUT_DIR / f"AUREX_FINAL_{version}_modo_oscuro.png"

        composite_on_bg(transparent, CREAM).save(light_path, "PNG")
        composite_on_bg(transparent, NAVY).save(dark_path, "PNG")
        print(f"  -> {light_path.name}")
        print(f"  -> {dark_path.name}")

if __name__ == "__main__":
    main()
