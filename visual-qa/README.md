# Visual QA — AUREX PWA

Sistema de control visual para coordinar trabajo entre **CODE** (Claude Code) y **Escritorio** (Claude Desktop). Permite que ambos vean exactamente el mismo estado visual antes/durante/después de cada cambio en la PWA.

## Estructura

```
visual-qa/
├── README.md                ← este archivo (tabla viva)
├── nativa/                  ← capturas de la app nativa iOS (referencia fija)
│   ├── portfolio.png
│   ├── mercados.png
│   ├── watchlist.png
│   ├── ia.png
│   ├── alertas.png
│   └── perfil.png
└── pwa/
    ├── actual/              ← estado actual en producción (aurex.live)
    │   ├── portfolio.png
    │   ├── mercados.png
    │   ├── watchlist.png
    │   ├── ia.png
    │   ├── alertas.png
    │   └── perfil.png
    └── faseN-fX-nombre/     ← una carpeta por feature/fase
        ├── ANTES.png
        └── DESPUES.png
```

## Reglas

1. **`nativa/`** = la verdad. La PWA debe parecerse lo máximo posible a esto.
2. **`pwa/actual/`** se actualiza después de cada deploy a producción.
3. **`pwa/faseN-fX-...`** se crea ANTES de empezar un feature, con la captura ANTES, y se completa con DESPUES al terminar.
4. Toda imagen subida tiene que estar referenciada en la tabla de abajo.

## Estado de Features

| Feature | Estado | Nativa-ref | PWA-antes | PWA-despues | Commit |
|---|---|---|---|---|---|
| Modo Claro Fase 2 (theme infra) | ✅ | `nativa/*.png` | — | `pwa/actual/*.png` | `a283db7` |
| Modo Claro Fase 2b (find&replace) | ✅ | `nativa/*.png` | — | `pwa/actual/*.png` | `be9c0d1` |
| Modo Claro Fase 2b-tris (22 bugs) | ✅ | `nativa/*.png` | — | `pwa/actual/*.png` | `6cbc35e` |
| Modo Claro Fase 2b-quarter (6 fixes) | ✅ | `nativa/*.png` | — | `pwa/actual/*.png` | `a497dbd` |
| Fase 4 F1 — Balanza Chip (currency selector) | ❌ revertido | `nativa/portfolio.png` | — | — | `10feebc` → revert `3642466` |
| Fase 4 F1-bis — Balanza Chip (modal Aviso Legal) | ✅ | `nativa/*.png` | — | `pwa/fase4-f1-bis-balanza/*.png` | `05a4fc0` |
| Fase 4 F2 — Indicador "Hoy" + emoji 🎉 | ✅ | `nativa/portfolio.png` | — | TBD | `fef42ca` |
| Fase 4 F3 — Sort menus (4 tabs) | ✅ | `nativa/*.png` | — | TBD | `646fbce` |
| Fase 4 F4 — Long press en activos | ⏳ pendiente | TBD | TBD | — | — |
| Fase 4 F5 — Favoritos | ⏳ pendiente | TBD | TBD | — | — |
| Fase 4 F6 — Cross-tab | ⏳ pendiente | TBD | TBD | — | — |
| Fase 4 F7 — Filtro IA "Mi Portfolio" | ⏳ pendiente | TBD | TBD | — | — |
| Fase 4 F8 — Upside % | ⏳ pendiente | TBD | TBD | — | — |
| Fase 4 F9 — Buscador Mercados | ⏳ pendiente | TBD | TBD | — | — |
| Fase 4 F10 — Premium UI modales | ⏳ pendiente | TBD | TBD | — | — |
| Fase 4 F11 — LanguageButton | ⏳ pendiente | TBD | TBD | — | — |
| Fase 3 — i18n | ⏳ pendiente (post-Fase 4) | — | — | — | — |

## Errores conocidos visibles en `pwa/actual/` (15/abril/2026)

(A completar tras análisis comparativo nativa vs PWA actual)

## Convenciones de nombres

- Tabs: `portfolio`, `mercados`, `watchlist`, `ia`, `alertas`, `perfil`
- Carpeta de feature: `faseN-fX-slug-corto` (ej: `fase4-f1-balanza`)
- ANTES/DESPUES en mayúsculas para que sean evidentes
