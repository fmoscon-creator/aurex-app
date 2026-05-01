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
GOLD_LIGHT = (255, 215, 130, 255)
GOLD_DARK = (110, 75, 18, 255)
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
    """Banner de señal premium: fondo opaco diferenciado + bevel + glow + drop shadow.

    Composición por capas (alpha_composite para mantener opacidad correcta):
    1. Drop shadow oscuro abajo-derecha (gaussiana radius 10).
    2. Glow exterior dorado (gaussiana radius 14).
    3. Card OPACO con gradiente vertical de tono cálido oscuro (dark) o cream (light)
       — distinto al navy de la constelación para no confundirse con el fondo.
    4. Borde principal dorado 3 px.
    5. Bevel: línea clara (#FFD782) arriba+izquierda interior, oscura (#6E4B12)
       abajo+derecha — efecto de luz desde arriba-izquierda.
    6. Esquinas decorativas en L (cuatro esquinas, dorado claro).
    7. Contenido: ticker + PROBABILIDAD ALCISTA/BAJISTA + % grande + flecha + barra.

    Canvas 1000x360. Se overlayea en ((W-1000)/2, 240) sobre el video.
    """
    W, H = 1000, 360
    PAD = 20
    inner_w, inner_h = W - 2 * PAD, H - 2 * PAD
    final = Image.new("RGBA", (W, H), (0, 0, 0, 0))

    # 1. Drop shadow
    shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rounded_rectangle(
        [PAD + 8, PAD + 8, W - PAD + 8, H - PAD + 8], radius=22, fill=(0, 0, 0, 160))
    shadow = shadow.filter(ImageFilter.GaussianBlur(radius=10))
    final = Image.alpha_composite(final, shadow)

    # 2. Glow dorado exterior
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(glow).rounded_rectangle(
        [PAD - 8, PAD - 8, W - PAD + 8, H - PAD + 8], radius=26, fill=(212, 164, 55, 80))
    glow = glow.filter(ImageFilter.GaussianBlur(radius=14))
    final = Image.alpha_composite(final, glow)

    # 3. Card opaco con gradiente
    if mode == "dark":
        c_top = (10, 8, 6)
        c_bot = (32, 26, 16)
    else:
        c_top = (255, 252, 245)
        c_bot = (235, 228, 210)
    card = Image.new("RGBA", (inner_w, inner_h), (0, 0, 0, 0))
    cdraw = ImageDraw.Draw(card)
    for y in range(inner_h):
        ratio = y / inner_h
        r = int(c_top[0] + (c_bot[0] - c_top[0]) * ratio)
        g = int(c_top[1] + (c_bot[1] - c_top[1]) * ratio)
        b = int(c_top[2] + (c_bot[2] - c_top[2]) * ratio)
        cdraw.line([(0, y), (inner_w, y)], fill=(r, g, b, 255))
    cmask = Image.new("L", (inner_w, inner_h), 0)
    ImageDraw.Draw(cmask).rounded_rectangle([0, 0, inner_w, inner_h], radius=22, fill=255)
    card.putalpha(cmask)
    card_full = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    card_full.paste(card, (PAD, PAD))
    final = Image.alpha_composite(final, card_full)

    # 4. Borde principal dorado
    border = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(border).rounded_rectangle(
        [PAD, PAD, W - PAD, H - PAD], radius=22, outline=GOLD, width=3)
    final = Image.alpha_composite(final, border)

    # 5. Bevel: luz arriba-izquierda + sombra abajo-derecha
    bevel = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    bvd = ImageDraw.Draw(bevel)
    bvd.line([(PAD + 6, PAD + 4), (W - PAD - 6, PAD + 4)], fill=GOLD_LIGHT, width=2)
    bvd.line([(PAD + 4, PAD + 6), (PAD + 4, H - PAD - 6)], fill=GOLD_LIGHT, width=2)
    bvd.line([(PAD + 6, H - PAD - 4), (W - PAD - 6, H - PAD - 4)], fill=GOLD_DARK, width=2)
    bvd.line([(W - PAD - 4, PAD + 6), (W - PAD - 4, H - PAD - 6)], fill=GOLD_DARK, width=2)
    bevel = bevel.filter(ImageFilter.GaussianBlur(radius=0.5))
    final = Image.alpha_composite(final, bevel)

    # 6. Esquinas decorativas en L
    corners = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    cd = ImageDraw.Draw(corners)
    cl = 30
    cw = 3
    cd.line([(40, 50), (40, 50 + cl)], fill=GOLD_LIGHT, width=cw)
    cd.line([(40, 50), (40 + cl, 50)], fill=GOLD_LIGHT, width=cw)
    cd.line([(W - 40, 50), (W - 40, 50 + cl)], fill=GOLD_LIGHT, width=cw)
    cd.line([(W - 40, 50), (W - 40 - cl, 50)], fill=GOLD_LIGHT, width=cw)
    cd.line([(40, H - 80), (40, H - 80 - cl)], fill=GOLD_LIGHT, width=cw)
    cd.line([(40, H - 80), (40 + cl, H - 80)], fill=GOLD_LIGHT, width=cw)
    cd.line([(W - 40, H - 80), (W - 40, H - 80 - cl)], fill=GOLD_LIGHT, width=cw)
    cd.line([(W - 40, H - 80), (W - 40 - cl, H - 80)], fill=GOLD_LIGHT, width=cw)
    final = Image.alpha_composite(final, corners)

    # 7. Contenido
    direction_color = GREEN if direction_label == "ALCISTA" else RED
    text_main = WHITE if mode == "dark" else (20, 20, 25, 255)
    content = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    td = ImageDraw.Draw(content)
    f_ticker = ImageFont.truetype(FONT_BOLD, 92)
    f_label = ImageFont.truetype(FONT_BOLD, 38)
    f_pct = ImageFont.truetype(FONT_BOLD, 100)
    td.text((75, 65), ticker, font=f_ticker, fill=text_main)
    label = f"PROBABILIDAD {direction_label}"
    td.text((75, 175), label, font=f_label, fill=direction_color)
    pct_text = f"{pct}%"
    bbox = f_pct.getbbox(pct_text)
    pct_x = W - 75 - (bbox[2] - bbox[0])
    td.text((pct_x, 75), pct_text, font=f_pct, fill=direction_color)
    arrow_y = 195
    arrow_x = pct_x + (bbox[2] - bbox[0]) // 2 - 30
    if direction_label == "ALCISTA":
        td.polygon([(arrow_x, arrow_y + 25), (arrow_x + 30, arrow_y - 25), (arrow_x + 60, arrow_y + 25)],
                   fill=direction_color)
    else:
        td.polygon([(arrow_x, arrow_y - 25), (arrow_x + 30, arrow_y + 25), (arrow_x + 60, arrow_y - 25)],
                   fill=direction_color)
    bar_y = H - 65
    bar_x_start, bar_x_end = 75, W - 75
    bar_w = bar_x_end - bar_x_start
    bar_h = 10
    track_color = (40, 35, 25, 255) if mode == "dark" else (210, 205, 195, 255)
    td.rounded_rectangle([bar_x_start, bar_y, bar_x_end, bar_y + bar_h], radius=5, fill=track_color)
    fill_w = int(bar_w * (pct / 100))
    td.rounded_rectangle([bar_x_start, bar_y, bar_x_start + fill_w, bar_y + bar_h], radius=5, fill=direction_color)
    final = Image.alpha_composite(final, content)

    final.save(out)


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
