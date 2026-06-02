# 🎨 BANCO DE ASSETS COBREX

> **Base de inicio que SIEMPRE crece y mejora.** Material reutilizable + exportado al formato/peso exacto de cada canal. Tanto Code como Escritorio suben y usan de acá.

## Estructura

```
mkt/assets/
  fuentes/            ← MATERIAL BASE reutilizable (alta calidad, sin recortar a canal)
    logos/            logo Cobrex (SVG + PNG), variantes claro/oscuro, símbolo, wordmark
    iconos-3d/        íconos 3D de Cobrex
    mascota-buho/     búho v2 (modo claro + oscuro) — uso desde pub #10 / semana 3
    capturas-app/     capturas reales de la app (índice → ya viven en aurex-app/assets/)
    capturas-web/     imágenes de cobrex.io / capturas Cobrex (✅ 14 pobladas)
    videos-web/       índice a los videos de la web (hero, MOTOR, ALERTAS, PULSE, COBERTURA — viven en repo cobrex, no se duplican)
    fondos/           fondos con identidad (gráfico financiero sutil), claro y oscuro
    badges/           "Disponible en App Store" + "Google Play" oficiales
    templates/        plantillas HTML/SVG por tipo de pieza (testimonio, dato, ranking…)
  por-canal/          ← ASSETS EXPORTADOS al formato/diseño/peso de cada canal
    instagram/ tiktok/ youtube/ x/ telegram/ linkedin/
  generadas/          ← piezas finales que produce Code (listas para publicar)
```

## Lógica de uso
- **`fuentes/`** = la materia prima de máxima calidad. Crece con el tiempo (cada pieza nueva suma assets reutilizables).
- **`por-canal/`** = lo mismo, **exportado al formato/peso que exige cada canal** (Code genera estas versiones desde `fuentes/`).
- **Aprovechar lo que ya existe:** capturas reales de la app (en `capturas-app/`) + imágenes/videos de la web (`web/`) se **alternan cada X posteos** para variar y, de paso, dar a conocer la web.

## Specs de formato / peso POR CANAL

| Canal | Formatos (px) | Ratio | Peso máx (objetivo) | Notas |
|---|---|---|---|---|
| **Instagram** | Feed 1080×1080 · Retrato 1080×1350 · Reels/Stories 1080×1920 | 1:1 · 4:5 · 9:16 | imagen <1 MB · video <100 MB | carrusel = varias 1080×1350 |
| **TikTok** | 1080×1920 (video) | 9:16 | <100 MB / 15–60s | solo video |
| **YouTube** | Short 1080×1920 · Thumbnail 1280×720 · Video 1920×1080 | 9:16 · 16:9 | thumb <2 MB | Channel ID `UCXb6q8eZsHPP4nu6yYm0diA` |
| **X** | 1600×900 (o 1200×675) · video 1280×720 | 16:9 | imagen <2 MB · video <512 MB | — |
| **Telegram** | 1080×1080 o 1080×1350 · video MP4 | 1:1 / 4:5 | <10 MB (tolera más) | flexible |
| **LinkedIn** | Link 1200×627 · Cuadrado 1080×1080 · Vertical 1200×1500 | 1.91:1 · 1:1 · 4:5 | <5 MB | — |

> **Regla:** toda pieza generada se guarda en `generadas/` y su versión por-canal en `por-canal/<canal>/` con el tamaño/peso correcto. Code optimiza el peso (compresión) antes de publicar. **Nada se sube en un formato que el canal no permita.**

## Estado de población (inicial)
- [x] **Búho v2** (claro + oscuro) + doc de uso → `mascota-buho/` ✅
- [x] **Capturas web Cobrex** (14, EN) → `capturas-web/` ✅
- [x] **Banners de perfil** X / YouTube / LinkedIn → `por-canal/` ✅
- [x] **Capturas app** → indexadas (viven en `aurex-app/assets/`) ✅
- [x] **Videos web** → indexados (viven en repo `cobrex`) ✅
- [ ] Logo Cobrex oficial SVG/PNG (claro + oscuro) → `logos/`
- [ ] Íconos 3D → `iconos-3d/`
- [ ] Badges App Store + Google Play oficiales → `badges/`
- [ ] Fondos con gráfico financiero (claro/oscuro) → `fondos/`
