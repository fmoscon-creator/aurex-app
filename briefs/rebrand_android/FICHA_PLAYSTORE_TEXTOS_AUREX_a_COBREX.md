# FICHA de Play Store — textos AUREX → Cobrex (8 idiomas)

**Para:** Escritorio (operar Google Play Console)
**Fecha:** 29-may-2026
**Objetivo:** Reemplazar la marca "AUREX" por "Cobrex" en TODOS los textos visibles de la ficha de Play Store, en los 8 idiomas. SIN build (es metadata de la ficha).

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

## TAMBIÉN CAMBIAR (parte de esta misma pasada — no dejar para después)
- **Email de contacto del desarrollador**: cambiar a `support@cobrex.io` (es el email real de Cobrex, el mismo que usa la app). El de aurex.live NO existe.
- **Sitio web del desarrollador / URLs en la descripción**: si aparece `aurex.live` → cambiar a `cobrex.io`.
- **Nombre del desarrollador** (Developer name) que se muestra en la ficha: si dice "AUREX" → "Cobrex".

## ⚠️ NO TOCAR
- **Nada de IDs / package / nombres técnicos** (`com.aurexapp`, `com.fernandomoscon.aurex.*`, etc.) aunque digan "aurex".

---

## Orden acordado con Fernando
1. **PRIMERO** estos textos (este brief) → Escritorio los cambia y **guarda**.
2. **DESPUÉS**, con eso guardado → ícono 512 + banner 1024×500 + las 8 capturas (Code las prepara en los formatos que pide Play Store).
