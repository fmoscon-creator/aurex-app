#!/usr/bin/env python3
"""
PLANTILLA: banners reutilizables para videos AUREX.

Cada función genera un PNG con transparencia. Después se overlayan sobre
el video base (constelación + búho) en compose_video.py.

Banners disponibles:
- banner_intro: logo + subtítulo del día (ej: "Señales AI del día")
- banner_signal: ticker + probabilidad alcista/bajista con flecha verde/roja
- banner_outro: logo grande + Suscribite + URL
- banner_url_inferior: barra inferior siempre visible aurex.live + tagline
- banner_aurex_buho: texto "AUREX" debajo del búho fijo (refuerzo de marca)

Specs visuales (sección 2.4 del PLAN_MKT.md):
- Fondo base navy #0A1428 (modo oscuro) / cream #F4F4F6 (modo claro)
- Color marca oro D4A437
- Textos: Arial Bold para destacados, Arial regular para body
- Verde #00C896 para señales positivas confirmadas
- Rojo #FF4D4D para señales negativas/alertas
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W = 1080  # ancho canvas video AUREX

# Paletas
GOLD = (212, 164, 55, 255)
GOLD_DARK = (140, 100, 28, 255)
WHITE = (255, 255, 255, 255)
NAVY_DARK = (10, 20, 40, 230)
CREAM = (244, 244, 246, 230)
GREEN = (0, 200, 150, 255)
RED = (255, 77, 77, 255)
BLACK_TEXT = (20, 25, 40, 255)

# Fonts del sistema macOS (cambiar si se ejecuta en otro OS)
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_REG = "/System/Library/Fonts/Supplemental/Arial.ttf"


def banner_intro(out, logo_path, subtitle, mode="dark"):
    """Logo (sin marca) arriba + subtítulo en blanco/negro según modo.
    Canvas 1080x600. Se overlayea en (0, 200) sobre el video.
    """
    img = Image.new("RGBA", (W, 600), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    logo = Image.open(logo_path).convert("RGBA").resize((300, 252), Image.LANCZOS)
    img.paste(logo, ((W - 300) // 2, 0), logo)
    f_sub = ImageFont.truetype(FONT_BOLD, 60)
    color = WHITE if mode == "dark" else BLACK_TEXT
    bbox = f_sub.getbbox(subtitle)
    bw = bbox[2] - bbox[0]
    draw.text(((W - bw) // 2 - bbox[0], 320), subtitle, font=f_sub, fill=color)
    img.save(out)


def banner_signal(out, ticker, pct, direction_label, mode="dark"):
    """Banner de señal moderno: glassmorphism + doble borde + esquinas decorativas + barra de progreso.

    Composición:
    - Glow exterior dorado (sombra suave gaussiana).
    - Fondo con gradiente vertical sutil (navy oscuro arriba a navy claro abajo).
    - Doble borde dorado: exterior 2 px (oro claro) + interior 1 px (oro oscuro) con gap de 6 px.
    - Esquinas decorativas en L en las 4 esquinas (líneas dorado).
    - Ticker, label "PROBABILIDAD ALCISTA/BAJISTA" y % grande con flecha.
    - Barra de progreso al pie proporcional al %.

    Canvas 1000x360. Se overlayea en ((W-1000)/2, 240) sobre el video.
    """
    W, H = 1000, 360
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))

    # 1. Glow exterior dorado
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    glow_draw.rounded_rectangle([20, 20, W - 20, H - 20], radius=28, fill=(212, 164, 55, 60))
    glow = glow.filter(ImageFilter.GaussianBlur(radius=12))
    img.paste(glow, (0, 0), glow)

    # 2. Gradiente vertical en el fondo
    if mode == "dark":
        c_top = (8, 16, 36, 240)
        c_bot = (16, 30, 56, 240)
    else:
        c_top = (250, 250, 252, 240)
        c_bot = (235, 235, 240, 240)
    bg = Image.new("RGBA", (W - 40, H - 40), c_top)
    bg_draw = ImageDraw.Draw(bg)
    for y in range(H - 40):
        ratio = y / (H - 40)
        r = int(c_top[0] + (c_bot[0] - c_top[0]) * ratio)
        g = int(c_top[1] + (c_bot[1] - c_top[1]) * ratio)
        b = int(c_top[2] + (c_bot[2] - c_top[2]) * ratio)
        a = int(c_top[3] + (c_bot[3] - c_top[3]) * ratio)
        bg_draw.line([(0, y), (W - 40, y)], fill=(r, g, b, a))
    mask = Image.new("L", (W - 40, H - 40), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, W - 40, H - 40], radius=24, fill=255)
    img.paste(bg, (20, 20), mask)

    # 3. Doble borde dorado
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle([20, 20, W - 20, H - 20], radius=24, outline=GOLD, width=2)
    draw.rounded_rectangle([28, 28, W - 28, H - 28], radius=18, outline=GOLD_DARK, width=1)

    # 4. Esquinas decorativas en L
    corner_len = 30
    cw = 3
    # TL, TR, BL, BR
    draw.line([(40, 50), (40, 50 + corner_len)], fill=GOLD, width=cw)
    draw.line([(40, 50), (40 + corner_len, 50)], fill=GOLD, width=cw)
    draw.line([(W - 40, 50), (W - 40, 50 + corner_len)], fill=GOLD, width=cw)
    draw.line([(W - 40, 50), (W - 40 - corner_len, 50)], fill=GOLD, width=cw)
    draw.line([(40, H - 80), (40, H - 80 - corner_len)], fill=GOLD, width=cw)
    draw.line([(40, H - 80), (40 + corner_len, H - 80)], fill=GOLD, width=cw)
    draw.line([(W - 40, H - 80), (W - 40, H - 80 - corner_len)], fill=GOLD, width=cw)
    draw.line([(W - 40, H - 80), (W - 40 - corner_len, H - 80)], fill=GOLD, width=cw)

    # 5. Contenido textual
    direction_color = GREEN if direction_label == "ALCISTA" else RED
    text_main = WHITE if mode == "dark" else BLACK_TEXT
    f_ticker = ImageFont.truetype(FONT_BOLD, 92)
    f_label = ImageFont.truetype(FONT_BOLD, 38)
    f_pct = ImageFont.truetype(FONT_BOLD, 100)
    draw.text((75, 65), ticker, font=f_ticker, fill=text_main)
    label = f"PROBABILIDAD {direction_label}"
    draw.text((75, 175), label, font=f_label, fill=direction_color)
    pct_text = f"{pct}%"
    bbox = f_pct.getbbox(pct_text)
    pct_x = W - 75 - (bbox[2] - bbox[0])
    draw.text((pct_x, 75), pct_text, font=f_pct, fill=direction_color)

    # 6. Flecha
    arrow_y = 195
    arrow_x = pct_x + (bbox[2] - bbox[0]) // 2 - 30
    if direction_label == "ALCISTA":
        draw.polygon([(arrow_x, arrow_y + 25), (arrow_x + 30, arrow_y - 25), (arrow_x + 60, arrow_y + 25)],
                     fill=direction_color)
    else:
        draw.polygon([(arrow_x, arrow_y - 25), (arrow_x + 30, arrow_y + 25), (arrow_x + 60, arrow_y - 25)],
                     fill=direction_color)

    # 7. Barra de progreso al pie
    bar_y = H - 65
    bar_x_start = 75
    bar_x_end = W - 75
    bar_w = bar_x_end - bar_x_start
    bar_h = 8
    track_color = (60, 70, 90, 200) if mode == "dark" else (200, 200, 210, 200)
    draw.rounded_rectangle([bar_x_start, bar_y, bar_x_end, bar_y + bar_h], radius=4, fill=track_color)
    fill_w = int(bar_w * (pct / 100))
    draw.rounded_rectangle([bar_x_start, bar_y, bar_x_start + fill_w, bar_y + bar_h], radius=4, fill=direction_color)

    img.save(out)


def banner_outro(out, logo_path, mode="dark"):
    """Outro full-canvas 1080x1920: logo grande + 'Visitanos en' + 'aurex.live'.
    Sin búho (el video lo saca con enable filter en compose_video.py).
    """
    img = Image.new("RGBA", (W, 1920), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    logo = Image.open(logo_path).convert("RGBA").resize((520, 437), Image.LANCZOS)
    img.paste(logo, ((W - 520) // 2, 480), logo)
    f_visit = ImageFont.truetype(FONT_BOLD, 70)
    f_url = ImageFont.truetype(FONT_BOLD, 110)
    visit_color = WHITE if mode == "dark" else BLACK_TEXT
    visit = "Visitanos en"
    bbox = f_visit.getbbox(visit)
    bw = bbox[2] - bbox[0]
    draw.text(((W - bw) // 2 - bbox[0], 1100), visit, font=f_visit, fill=visit_color)
    url = "aurex.live"
    bbox2 = f_url.getbbox(url)
    bw2 = bbox2[2] - bbox2[0]
    draw.text(((W - bw2) // 2 - bbox2[0], 1230), url, font=f_url, fill=GOLD)
    img.save(out)


def banner_url_inferior(out, mode="dark"):
    """Barra inferior siempre visible: aurex.live + tagline.
    Canvas 1080x200. Se overlayea en (0, 1720).
    """
    img = Image.new("RGBA", (W, 200), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    f_url = ImageFont.truetype(FONT_BOLD, 56)
    f_tag = ImageFont.truetype(FONT_REG, 36)
    url_color = GOLD
    tag_color = (200, 200, 200, 200) if mode == "dark" else (80, 80, 100, 220)
    url = "aurex.live"
    bbox = f_url.getbbox(url)
    bw = bbox[2] - bbox[0]
    draw.text(((W - bw) // 2 - bbox[0], 30), url, font=f_url, fill=url_color)
    tag = "Inversión con AI"
    bbox2 = f_tag.getbbox(tag)
    bw2 = bbox2[2] - bbox2[0]
    draw.text(((W - bw2) // 2 - bbox2[0], 110), tag, font=f_tag, fill=tag_color)
    img.save(out)


def banner_aurex_buho(out, mode="dark"):
    """Texto AUREX debajo del búho — fijo todo el video (excepto outro).
    Refuerza la asociación visual búho = AUREX.
    Canvas 1080x100. Se overlayea en (0, ~1380) — debajo del búho centrado.
    """
    img = Image.new("RGBA", (W, 120), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    f = ImageFont.truetype(FONT_BOLD, 90)
    text = "AUREX"
    bbox = f.getbbox(text)
    bw = bbox[2] - bbox[0]
    draw.text(((W - bw) // 2 - bbox[0], 10), text, font=f, fill=GOLD)
    img.save(out)
