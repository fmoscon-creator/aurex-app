# Screenshots IA - Referencia Visual

## Estructura
- `pwa/` — Estado actual de la PWA (referencia de diseño objetivo)
- `nativa/` — Estado actual de la nativa (antes/después de correcciones)

## Pantallas PWA a replicar en nativa
1. `01-ia-lista.png` — Lista principal con contadores Alcistas/Bajistas/Alta Conv-IA
2. `02-ia-detalle-variables.png` — Detalle expandido con Variables del Modelo
3. `03-ia-otros-escenarios.png` — Sección Otros Escenarios con porcentajes

## Bugs detectados en PWA (a NO replicar en nativa)
- ALTA CONV-IA muestra "undefined%" en Otros Escenarios → fix pendiente

## Proceso de trabajo
1. CODE toma screenshot de nativa en cada estado
2. Guarda en `nativa/` con mismo nombre que PWA
3. Commit con mensaje descriptivo
