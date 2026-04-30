# AUREX Mascot Processing — scripts y sources

Scripts Python para regenerar las 2 versiones aprobadas de mascot AUREX (v0 y v2)
en modo claro y modo oscuro, y todos los tamaños PNG por plataforma (iOS,
Android, PWA, Web/Favicon, Marketing).

**Estado al 30-abr-2026:** v0 (busto metal oro pulido) y v2 (geometric premium)
aprobadas por Fernando como las dos versiones para evaluación final. v1 (con
rama) se conserva como source pero NO entró en el set final.

## Estructura

```
scripts/mascot_processing/
├── README.md                ← este archivo
├── sources/
│   ├── v0_source.png        ← search-friendly: AUREX_buho v0.png en Drive
│   ├── v1_source.png        ← cuerpo completo con rama (no usado en set final)
│   └── v2_source.png        ← geometric premium dorado
├── process_v0.py            ← genera v0 modo claro y oscuro
├── process_v1_v2.py         ← genera v1 y v2 modo claro y oscuro
└── generate_all_sizes.py    ← genera todos los tamaños PNG por plataforma
```

## Sources

Los 3 archivos PNG en `sources/` son el resultado de generación con
[Pollinations.ai](https://image.pollinations.ai/) (modelo FLUX), sin
post-procesado. Son el punto de partida bit-exact de cada versión.

| Source | Seed Pollinations | Origen |
|---|---|---|
| `v0_source.png` | seed primera tanda | Búho oscuro con detalles dorados, fondo navy. Estética geométrica simétrica (busto frontal con orejas puntudas y ojos amarillos). |
| `v1_source.png` | seed `11111` | Búho dorado metálico realista posado en rama horizontal, ambas patas, fondo blanco. |
| `v2_source.png` | seed `2222` | Búho geométrico facetado dorado de cuerpo completo, fondo gris claro. |

## Pipeline de procesamiento

### v0 — Busto metal oro pulido

`process_v0.py` aplica:

1. **rembg** (modelo U-2-Net) para remover fondo navy.
2. **Gamma correction** γ=0.75 sobre la luminosidad para distribuir las sombras hacia los medios.
3. **Gradient map metálico** con 5 stops calibrados a la paleta de v1 (que ya
   nació dorado): bronce profundo (40,22,3) → bronce dorado (110,70,18) → oro
   mate (200,150,45) → oro brillante (250,215,95) → highlight metal pulido
   (255,250,200).
4. **Composición** sobre cream (#F4F4F6) para modo claro y navy (#0A1428) para
   modo oscuro.

El v0 source es predominantemente NEGRO con acentos dorados — el gradient map
lo "tiñe" de oro real conservando contraste y brillos metálicos.

### v1 — Cuerpo completo con rama

`process_v1_v2.py` (módulo v1) aplica:

1. **rembg** para remover fondo blanco.
2. **Composición** sobre cream / navy.

Sin gradient map: el source ya nació con el dorado correcto.

### v2 — Geometric premium

`process_v1_v2.py` (módulo v2) aplica el mismo pipeline que v1.

## Tamaños generados (`generate_all_sizes.py`)

Por cada versión × modo × plataforma:

| Plataforma | Tamaños |
|---|---|
| **iOS** | 1024 (App Store), 180 (iPhone @3x), 167 (iPad Pro), 152 (iPad @2x), 120 (iPhone @2x), 87 (Settings @3x), 80 (Spotlight @2x), 76 (iPad), 60 (iPhone), 58, 40, 29, 20 |
| **Android** | 512 (Play Store), 192 (xxxhdpi), 144 (xxhdpi), 96 (xhdpi), 72 (hdpi), 48 (mdpi), 36 (ldpi) |
| **PWA** | 512, 384, 192, 152, 144, 128, 96, 72 |
| **Web/Favicon** | 192 (Apple touch icon), 96, 48, 32, 16 |
| **Marketing** (canvas con padding) | 1200×630 (OG/Facebook), 1200×675 (Twitter Card), 1080×1080 (IG post), 1080×1920 (IG Story), 1280×720 (YouTube thumb) |

Total: **152 archivos PNG** (38 por combinación versión×modo × 4 combinaciones).

## Cómo regenerar todo desde cero

```bash
# 1. Instalar dependencias (una sola vez)
pip3 install Pillow numpy scipy rembg onnxruntime

# 2. Ir al directorio
cd scripts/mascot_processing/

# 3. Generar v0 final (modo claro + oscuro) → ~/Downloads/
python3 process_v0.py

# 4. Generar v1 y v2 final (modo claro + oscuro) → ~/Downloads/
python3 process_v1_v2.py

# 5. Generar TODOS los tamaños PNG → ~/Downloads/AUREX_ICONS/
python3 generate_all_sizes.py
```

## Customización

- Cambiar carpeta de salida: `export AUREX_OUT="/ruta/personalizada/"` antes de ejecutar.
- Ajustar gradient map del v0: editar `STOPS_R`, `STOPS_G`, `STOPS_B`, `GAMMA` al inicio de `process_v0.py`.
- Modificar tamaños o agregar plataformas: editar las listas `ios_sizes`, `android_sizes`, etc. en `generate_all_sizes.py`.

## Decisión final pendiente

Fernando todavía no eligió entre v0 y v2 para set como mascot final de AUREX.
Cuando elija, los archivos en `~/Downloads/AUREX_ICONS/<versión_elegida>/` se
suben directamente a:

- App Store Connect (iOS): `ios/ios_appstore_1024.png` y los demás tamaños iOS.
- Google Play Console (Android): `android/android_play_store_512.png` y demás.
- PWA manifest: `pwa/pwa_*.png` referenciados desde `manifest.json`.
- Web (sitio aurex.live): `web/favicon_*.png` y `apple_touch_icon_192.png`.
- Marketing (redes sociales, press): `marketing/*` según plataforma.

**Importante regulatorio:** mientras Apple Build 17 y Google Play Build 2 estén
en revisión, NO tocar metadata ni iconos en stores. La regeneración de iconos
queda para v1.1 post-aprobación, según `CLAUDE.md` sección 6 regla inviolable 2.
