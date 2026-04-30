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
from PIL import Image, ImageDraw, ImageFont

W = 1080  # ancho canvas video AUREX

# Paletas
GOLD = (212, 164, 55, 255)
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
    """Banner de señal: ticker + 'PROBABILIDAD ALCISTA/BAJISTA del XX%' + flecha.
    direction_label: 'ALCISTA' o 'BAJISTA'.
    Canvas 980x320 (más alto y ancho que v1 para acomodar el texto largo).
    Se overlayea en ((W-980)/2, 280) sobre el video.
    """
    img = Image.new("RGBA", (980, 320), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    bg_box = NAVY_DARK if mode == "dark" else CREAM
    border = GOLD
    text_color_main = WHITE if mode == "dark" else BLACK_TEXT
    direction_color = GREEN if direction_label == "ALCISTA" else RED
    draw.rounded_rectangle([10, 10, 970, 310], radius=24,
                           fill=bg_box, outline=border, width=3)
    f_ticker = ImageFont.truetype(FONT_BOLD, 88)
    f_label = ImageFont.truetype(FONT_BOLD, 42)
    f_pct = ImageFont.truetype(FONT_BOLD, 96)
    # Ticker arriba a la izquierda
    draw.text((50, 35), ticker, font=f_ticker, fill=text_color_main)
    # "PROBABILIDAD ALCISTA" o "PROBABILIDAD BAJISTA" debajo del ticker
    label = f"PROBABILIDAD {direction_label}"
    draw.text((50, 160), label, font=f_label, fill=direction_color)
    # Porcentaje grande a la derecha
    pct_text = f"{pct}%"
    bbox = f_pct.getbbox(pct_text)
    draw.text((950 - (bbox[2] - bbox[0]), 100), pct_text, font=f_pct, fill=direction_color)
    # Flecha arriba/abajo a la derecha del label
    fy = 220
    label_w = f_label.getbbox(label)[2] - f_label.getbbox(label)[0]
    arrow_x = 50 + label_w + 30
    if direction_label == "ALCISTA":
        draw.polygon([(arrow_x, fy + 30), (arrow_x + 50, fy - 30), (arrow_x + 100, fy + 30)], fill=direction_color)
    else:
        draw.polygon([(arrow_x, fy - 30), (arrow_x + 50, fy + 30), (arrow_x + 100, fy - 30)], fill=direction_color)
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
