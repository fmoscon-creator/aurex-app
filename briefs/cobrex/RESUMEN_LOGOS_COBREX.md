# 🎨 RESUMEN — Sets de logos COBREX (para Code + Escritorio)

> **Para que Escritorio entienda TODOS los sets de logo que se generaron.**
> **Fecha:** 26-may-2026 · Generados por Code, calcados del logo AUREX (mismo símbolo, mismo dorado, misma tipografía; solo cambia la palabra AUREX→COBREX).
> **Ubicación de los archivos:** `~/Dropbox/AUREX/LOGO COBREX/`

---

## 1. Los 4 sets

| Set | Carpeta en Dropbox | Símbolo | Palabra | Fondo | Archivos |
|---|---|---|---|---|---|
| **CON MARCA OSCURO** | `LOGO COBREX CON MARCA OSCURO` | ✅ | COBREX | Negro `(0,0,0)`; íconos sueltos gris `(13,17,22)` | 51 PNG + 1 `.ico` |
| **SIN MARCA OSCURO** | `LOGO COBREX SIN MARCA OSCURO` | ✅ | — | Negro `(0,0,0)` | 36 PNG + 1 `.ico` |
| **CON MARCA CLARO** | `LOGO COBREX CON MARCA CLARO` | ✅ | COBREX | Blanco frío `#EEF1F7` | 51 PNG + 1 `.ico` |
| **SIN MARCA CLARO** | `LOGO COBREX SIN MARCA CLARO` | ✅ | — | Blanco frío `#EEF1F7` | 36 PNG + 1 `.ico` |
| **Transparentes** | raíz de `LOGO COBREX/` | ✅ | con y sin | Transparente (sin fondo) | 3 PNG |

---

## 2. Formatos y tamaños internos (idénticos en los 4 sets)

| Carpeta interna | Tamaños (px) | Cant. | Para qué |
|---|---|---|---|
| **Íconos sueltos** `cobrex-icon-NxN.png` *(solo CON MARCA)* | 20, 29, 40, 58, 60, 76, 80, 87, 120, 152, 167, 180, 256, 512, 1024 | 15 | App icon principal (todas las resoluciones) |
| **Android/** | 48 (mdpi), 72 (hdpi), 96 (xhdpi), 144 (xxhdpi), 192 (xxxhdpi), 512 (PlayStore) | 6 | Ícono Android por densidad + Play Store |
| **iOS/** | 20, 29, 40, 58, 60, 76, 80, 87, 120, 152, 167, 180 | 12 | Ícono iOS (todos los slots del Asset Catalog) |
| **Marketing/** | AppStore_1024, Marketing_1024, Marketing_2048_HD (2048) | 3 | Ficha App Store + piezas de marketing HD |
| **PWA/** | 72, 96, 128, 144, 152, 192, 256, 384, 512 | 9 | Web App / manifest |
| **Web_Favicon/** | 16, 32, 48, 64, 96, 128 + `favicon.ico` (multi-res) | 7 | Favicon del sitio |

> SIN MARCA = mismas carpetas **menos** los íconos sueltos `cobrex-icon-*` (esos solo existen en CON MARCA). Por eso SIN MARCA = 36 PNG y CON MARCA = 51 PNG.

---

## 3. Transparentes (raíz de `LOGO COBREX/`)

| Archivo | Tamaño | Contenido |
|---|---|---|
| `logo_COBREX_transparente_CON_MARCA.png` | 1024×1024 | Símbolo + palabra COBREX, **sin fondo** |
| `logo_COBREX_TRANSPARENTE_SIN_MARCA.png` | 1436×1436 | Solo símbolo, **sin fondo** |
| `logo_COBREX_TRANSPARENTE_SIN_MARCA_1024.png` | 1024×1024 | Solo símbolo, **sin fondo** |

---

## 4. Cuándo usar cada versión (CRÍTICO)

| Uso | Versión | Por qué |
|---|---|---|
| **Firma de mail, Word, PDF, documentos** | **TRANSPARENTE** | sin fondo → **nunca recuadro** |
| **Web sobre cualquier fondo** | **TRANSPARENTE** | se adapta a la página |
| App icon iOS/Android | CON MARCA **OSCURO** (o CLARO) | el ícono NO admite transparencia |
| Avatar de red que exige fondo | CON MARCA OSCURO o CLARO | la red rellena el fondo |
| Favicon | el del kit (chico) | tamaño fijo |

⚠️ **Nunca** usar las versiones con fondo sólido (CLARO/OSCURO) sobre un documento → dejan recuadro. Para documentos = transparente, siempre.

---

## 5. Specs técnicas (resumen)

- **Tipografía de la palabra:** `Arial Bold` (`/System/Library/Fonts/Supplemental/Arial Bold.ttf`), tracking 0, mayúsculas. Verificado: ganó 92% sobre 371 fuentes.
- **Color dorado:** `#CB9916` (RGB 203,153,22), plano. El símbolo tiene degradé dorado.
- **Símbolo:** idéntico al de AUREX (no cambió). Verificado 98.7–100% IoU.
- **Blanco frío modo claro:** `#EEF1F7` (238,241,247).
- ❌ Nunca "INVEST AI" ni texto bajo COBREX. La palabra es **COBREX** sola.

**Detalle técnico completo:** `~/Dropbox/AUREX/LOGO COBREX/ESPECIFICACIONES_LOGO_COBREX_AUREX_26MAY_v3.docx` (+ `.md`).
