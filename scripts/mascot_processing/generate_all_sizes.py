#!/usr/bin/env python3
"""
Genera todos los tamaños PNG necesarios para iOS, Android, PWA, Web y Marketing.
Para v0 y v2 en modo claro y modo oscuro.
Output: ~/Downloads/AUREX_ICONS/v0|v2/modo_claro|modo_oscuro/{ios,android,pwa,web,marketing}/
"""
import os
from PIL import Image

OUT_BASE = "/Users/fernandomoscon/Downloads/AUREX_ICONS"
CREAM = (244, 244, 246, 255)
NAVY = (10, 20, 40, 255)

# Sources: archivos modo claro y oscuro de v0 y v2
versions = {
    "v0": {
        "modo_claro": "/Users/fernandomoscon/Downloads/AUREX_FINAL_v0_modo_claro.png",
        "modo_oscuro": "/Users/fernandomoscon/Downloads/AUREX_FINAL_v0_modo_oscuro.png",
        "bg_color_claro": CREAM,
        "bg_color_oscuro": NAVY,
    },
    "v2": {
        "modo_claro": "/Users/fernandomoscon/Downloads/AUREX_FINAL_v2_modo_claro.png",
        "modo_oscuro": "/Users/fernandomoscon/Downloads/AUREX_FINAL_v2_modo_oscuro.png",
        "bg_color_claro": CREAM,
        "bg_color_oscuro": NAVY,
    },
}

# Tamaños por plataforma (cuadrados)
ios_sizes = [
    ("ios_appstore_1024.png", 1024),
    ("ios_iphone_180.png", 180),
    ("ios_ipad_pro_167.png", 167),
    ("ios_ipad_152.png", 152),
    ("ios_iphone_120.png", 120),
    ("ios_settings_87.png", 87),
    ("ios_spotlight_80.png", 80),
    ("ios_ipad_76.png", 76),
    ("ios_iphone_60.png", 60),
    ("ios_settings_58.png", 58),
    ("ios_spotlight_40.png", 40),
    ("ios_settings_29.png", 29),
    ("ios_notification_20.png", 20),
]

android_sizes = [
    ("android_play_store_512.png", 512),
    ("android_xxxhdpi_192.png", 192),
    ("android_xxhdpi_144.png", 144),
    ("android_xhdpi_96.png", 96),
    ("android_hdpi_72.png", 72),
    ("android_mdpi_48.png", 48),
    ("android_ldpi_36.png", 36),
]

pwa_sizes = [
    ("pwa_512.png", 512),
    ("pwa_384.png", 384),
    ("pwa_192.png", 192),
    ("pwa_152.png", 152),
    ("pwa_144.png", 144),
    ("pwa_128.png", 128),
    ("pwa_96.png", 96),
    ("pwa_72.png", 72),
]

web_sizes = [
    ("apple_touch_icon_192.png", 192),
    ("favicon_96.png", 96),
    ("favicon_48.png", 48),
    ("favicon_32.png", 32),
    ("favicon_16.png", 16),
]

# Marketing: tamaños no-cuadrados (compuestos sobre fondo)
marketing_sizes = [
    ("og_facebook_1200x630.png", 1200, 630),
    ("twitter_card_1200x675.png", 1200, 675),
    ("instagram_post_1080x1080.png", 1080, 1080),
    ("instagram_story_1080x1920.png", 1080, 1920),
    ("youtube_thumb_1280x720.png", 1280, 720),
]

def make_square(src_img: Image.Image, size: int) -> Image.Image:
    """Resize cuadrado de la imagen source al tamaño deseado."""
    return src_img.resize((size, size), Image.Resampling.LANCZOS)

def make_marketing(src_img: Image.Image, w: int, h: int, bg_color: tuple) -> Image.Image:
    """Centrar imagen sobre canvas con margen, fondo según modo."""
    # Tamaño del logo en el canvas: 60% del lado más corto
    side = min(w, h)
    icon_size = int(side * 0.55)
    icon = src_img.resize((icon_size, icon_size), Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", (w, h), bg_color[:3])
    pos_x = (w - icon_size) // 2
    pos_y = (h - icon_size) // 2
    canvas.paste(icon, (pos_x, pos_y))
    return canvas

total_files = 0
for v_name, info in versions.items():
    for mode in ["modo_claro", "modo_oscuro"]:
        src_path = info[mode]
        bg_color = info[f"bg_color_{mode.split('_')[1]}"]
        src = Image.open(src_path).convert("RGB")
        print(f"\n[{v_name}/{mode}] source: {src.size}")

        base_dir = f"{OUT_BASE}/{v_name}/{mode}"

        # iOS
        d = f"{base_dir}/ios"; os.makedirs(d, exist_ok=True)
        for name, size in ios_sizes:
            make_square(src, size).save(f"{d}/{name}", "PNG")
            total_files += 1
        print(f"  iOS: {len(ios_sizes)} archivos")

        # Android
        d = f"{base_dir}/android"; os.makedirs(d, exist_ok=True)
        for name, size in android_sizes:
            make_square(src, size).save(f"{d}/{name}", "PNG")
            total_files += 1
        print(f"  Android: {len(android_sizes)} archivos")

        # PWA
        d = f"{base_dir}/pwa"; os.makedirs(d, exist_ok=True)
        for name, size in pwa_sizes:
            make_square(src, size).save(f"{d}/{name}", "PNG")
            total_files += 1
        print(f"  PWA: {len(pwa_sizes)} archivos")

        # Web/Favicon
        d = f"{base_dir}/web"; os.makedirs(d, exist_ok=True)
        for name, size in web_sizes:
            make_square(src, size).save(f"{d}/{name}", "PNG")
            total_files += 1
        print(f"  Web: {len(web_sizes)} archivos")

        # Marketing (composiciones rectangulares)
        d = f"{base_dir}/marketing"; os.makedirs(d, exist_ok=True)
        for name, w, h in marketing_sizes:
            make_marketing(src, w, h, bg_color).save(f"{d}/{name}", "PNG")
            total_files += 1
        print(f"  Marketing: {len(marketing_sizes)} archivos")

print(f"\nTOTAL: {total_files} archivos PNG generados")
print(f"Ubicación: {OUT_BASE}/")
