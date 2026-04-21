# PENDING REVIEW — Fix precio en búsqueda (Mercados + Portfolio)

**Archivos** (LOCAL): aurex-features.js, index.html

---

## Problema
Buscar cualquier activo (FIL, DAO, COCA, etc.) muestra resultados SIN precio.
La nativa siempre muestra precio en cada resultado de búsqueda.

## Fix implementado

### 1. Función helper: `window._fetchSearchPrices(results, idPrefix)`
- Recibe array de resultados y prefijo de IDs
- Para cada activo sin precio en `_pcPrices`, hace fetch a `/api/yahoo?symbol=SYM`
- Al recibir precio, actualiza el DOM del resultado (el "..." se reemplaza por "$XX.XX")
- Guarda en `_pcPrices` para que long press también lo tenga disponible

### 2. Búsqueda Mercados (index.html L1895-1901)
- Cada fila de resultado ahora incluye `<span>` de precio al lado derecho
- Si hay precio en cache → muestra directo
- Si no → muestra "..." y lanza fetch individual
- Después de renderizar, llama fetch batch para los que faltan

### 3. Búsqueda Portfolio (aurex-features.js `_renderSearchResult`)
- Misma lógica: precio visible en cada fila
- `filterPortSearch()` llama `_fetchSearchPrices(results, 'port-sr-p-')` después de render

### 4. Long press (ya incluido en commit anterior)
- Si `_pcPrices[ticker]` === 0, hace fetch antes de mostrar modal

## Resultado esperado
- Buscar "DAO" → aparece precio $X.XX en la fila (puede tardar ~1s el fetch)
- Buscar "FIL" → ídem
- Long press sobre resultado → precio ya disponible del fetch previo

## Verificación
- `node -c aurex-features.js` → OK
