# ESTADO ACTUAL — Watchlist fixes

## Bug 4 (compare toggle) — YA EN PRODUCCIÓN

Commit `91e987d` contiene el fix. Verificado en código local:

```
wlToggleCompare NO llama renderWatchCnt()
```

El diff del commit confirma: +14 líneas que hacen update visual directo del DOM (circle + counter + button label).

Si Escritorio ve `renderWatchCnt()` todavía, es cache. Verificar con hard refresh o `?v=` en la URL.

## Resumen commits Watchlist hoy:

| Commit | Contenido |
|--------|-----------|
| fb9f3e3 | Watchlist i18n completo — 45 keys × 8 idiomas |
| 91e987d | Delete modal i18n + compare no-rerender + LP user-select |
| 1516114 | Fix "Delete lista" → key completa wl_eliminar_lista |
