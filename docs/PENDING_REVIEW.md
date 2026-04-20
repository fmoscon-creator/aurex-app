# PENDING REVIEW — Fix botón Guardar teléfono B3

**Cambio**: 1 línea en index.html L2421
**ANTES**: `...white-space:nowrap">Guardar</button>...`
**DESPUÉS**: `...white-space:nowrap"><span data-i18n="guardar">Guardar</span></button>...`

La key `guardar` ya existe en aurex-i18n.js con los 8 idiomas.

Verificación: no hay más "Guardar" sin data-i18n en la zona Perfil (L2250-L3200).
