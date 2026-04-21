# PENDING REVIEW — Fix contraste filtros y sub-filtros Alertas

**Archivo**: index.html

---

## Problema
Los números en los badges de filtros/sub-filtros de "Active Alerts Now" no se ven cuando NO están seleccionados. Mismo problema en filtros de Pulse Zones.

## Causa
- Filtros principales (L870): badge tenía `background:var(--textSec)` con texto que heredaba `color:var(--textSec)` = gris sobre gris
- Sub-filtros (L895): mismo problema
- Pulse Zones (L2190-2193): `color:var(--textSec)` poco visible sobre `background:var(--border)`

## Fix
- Filtros principales: texto no seleccionado → `color:var(--text)`, badge → `background:var(--border2);color:var(--text)`
- Sub-filtros: ídem
- Pulse Zones: `color:var(--textSec)` → `color:var(--text)`

---

## Verificación
- Contraste visible en modo claro y oscuro
