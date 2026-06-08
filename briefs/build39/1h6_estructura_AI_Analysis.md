# 1.h.6 — Estructura AI Analysis (Code → Escritorio para traducir)
*08-jun · `PortfolioScreen.js:1453` (los 5 "motivos" del Full AI Analysis)*

> **Cómo se arma (acordado v3):** Code NO concatena fragmentos. Cada condición (alcista/bajista) es una **frase COMPLETA** = una clave i18n. Code elige `dir === 'BAJISTA' ? t('..._baj') : t('..._alc')` y reemplaza los placeholders `{pct}` `{rsi}` `{vol}` con los números al renderizar.
>
> **Escritorio:** traducir las 8 frases (ES maestro abajo) a los 8 idiomas, **dejando los placeholders `{pct}`/`{rsi}`/`{vol}` LITERALES** (no traducir ni mover el contenido de las llaves). Mantener el guion largo " — ".

## Las 8 claves (ES maestro)
| Clave | Texto ES (frase completa) | Placeholder |
|---|---|---|
| `ai_motivo1_alc` | Precio subió {pct} en 24hs — momentum alcista activo con presión compradora dominante | {pct} (ej. +3,2%) |
| `ai_motivo1_baj` | Precio bajó {pct} en 24hs — momentum bajista activo con presión vendedora dominante | {pct} |
| `ai_motivo2_alc` | RSI14 en {rsi} — momentum alcista, presión compradora sostenida | {rsi} (ej. 52) |
| `ai_motivo2_baj` | RSI14 en {rsi} — momentum bajista moderado, presión vendedora activa | {rsi} |
| `ai_motivo3` | Volumen en línea con el promedio — actividad normal sin anomalías detectadas | — |
| `ai_motivo4_alc` | Volatilidad moderada ({vol}%) — rango amplio con sesgo alcista | {vol} (ej. 3.4) |
| `ai_motivo4_baj` | Volatilidad moderada ({vol}%) — rango amplio con sesgo bajista | {vol} |
| `ai_motivo5` | Correlación con BTC neutral — activo operando con dinámica propia | — |

**Notas:** son 8 claves × 8 idiomas = 64 traducciones. Los placeholders van tal cual (`{pct}`, `{rsi}`, `{vol}`). Code cablea: selecciona la clave según `dir` y hace el reemplazo de los números. Cuando Escritorio entregue el EN maestro + las 8, Code las pone en `i18n.js` y reemplaza el bloque hardcodeado de `PortfolioScreen.js:1453`.
