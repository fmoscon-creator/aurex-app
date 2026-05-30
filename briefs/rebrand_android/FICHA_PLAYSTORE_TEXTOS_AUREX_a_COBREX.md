# FICHA de Play Store — textos AUREX → Cobrex (8 idiomas)

**Para:** Escritorio (operar Google Play Console)
**Fecha:** 29-may-2026
**Objetivo:** Reemplazar la marca "AUREX" por "Cobrex" en TODOS los textos visibles de la ficha de Play Store, en los 8 idiomas. SIN build (es metadata de la ficha).

---

## ✅ ESTADO 29-may (lo que falta es SOLO esto, confirmado por Fernando)
Los nombres + descripciones en los 8 idiomas YA están en Cobrex y guardados. **Falta solo:**

1. **Las 2 líneas con `aurex.live` en la Descripción completa → cambiar a `cobrex.io`** (en los 8 idiomas):
   - `— Available on iOS, Android and as PWA installable from aurex.live.`  →  `— Available on iOS, Android and as PWA installable from cobrex.io.`
   - línea suelta al final `aurex.live`  →  `cobrex.io`
   - Guardar cada idioma.
2. **Email de contacto** (1 sola vez, en "Detalles de contacto"): → `support@cobrex.io`
3. **Sitio web** (1 sola vez, en "Detalles de contacto"): → `cobrex.io`
4. **Nombre del desarrollador** (a nivel cuenta): `AUREX AI` → **`Cobrex AI`** (Fernando decidió mantener el "AI"). ⚠️ Cambio de cuenta — puede pedir verificación de identidad de Google y tardar. Lo hace Fernando salvo que se indique lo contrario.

---

---

## RUTA en Play Console
```
play.google.com/console → elegir app
→ Crecimiento → Presencia en Play Store → Ficha principal de Play Store
→ Selector de idioma (arriba): repetir para los 8 idiomas
```

## Idiomas a recorrer (8)
Español (es) · Inglés (en) · Portugués (pt) · Chino (zh) · Francés (fr) · Italiano (it) · Hindi (hi) · Árabe (ar).

## Campos a editar en CADA idioma
1. **Nombre de la app** (máx 30 caracteres)
2. **Descripción breve** (máx 80 caracteres)
3. **Descripción completa** (máx 4000 caracteres)

## REGLA (find/replace)
En esos 3 campos, reemplazar toda aparición de la marca, respetando mayúsculas:
- `AUREX` → `Cobrex`
- `Aurex` → `Cobrex`
- `aurex` → `cobrex`

Incluye combinaciones:
- `AUREX Pulse` → `Cobrex Pulse`
- `AUREX Pro` / `AUREX PRO` → `Cobrex Pro` / `Cobrex PRO`
- `AUREX Elite` / `AUREX ELITE` → `Cobrex Elite` / `Cobrex ELITE`

**Guardar** después de cada idioma.

---

## TAMBIÉN CAMBIAR — pero esto es 1 SOLA VEZ (NO por idioma)
Estos campos son globales de la app, no se repiten por idioma. Están en la misma página **Ficha principal de Play Store**, bajando hasta el bloque **"Detalles de contacto"**:
- **Email de contacto**: `support@cobrex.io` (el de aurex.live NO existe).
- **Sitio web**: `cobrex.io` (si dice aurex.live).
- **Nombre del desarrollador** (Developer name): si dice "AUREX" → "Cobrex".

> Aclaración: la URL aurex.live **dentro del texto** de la Descripción completa SÍ puede estar en cada idioma → esa se cambia junto con el texto de ese idioma, en la misma pasada. El campo "Sitio web" de contacto es el único global.

## ⚠️ NO TOCAR
- **Nada de IDs / package / nombres técnicos** (`com.aurexapp`, `com.fernandomoscon.aurex.*`, etc.) aunque digan "aurex".

---

## Orden acordado con Fernando
1. **PRIMERO** estos textos (este brief) → Escritorio los cambia y **guarda**.
2. **DESPUÉS**, con eso guardado → ícono 512 + banner 1024×500 + las 8 capturas (Code las prepara en los formatos que pide Play Store).
