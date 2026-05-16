# REVIEW ESCRITORIO — INFORME APPLE v2
> Fecha: 16-may-2026
> Autor: Escritorio (Claude Desktop)
> Documento revisado: INFORME_GRAL_APPLE_v2_16MAY.md

## VEREDICTO GENERAL

El documento v2 es solido y refleja correctamente la decision D-modificada aprobada por Fernando. Apruebo el plan con 2 correcciones obligatorias antes de ejecutar.

---

## CORRECCIONES OBLIGATORIAS

### Correccion 1 — Reply text §4: referencia a Android v1.0.33

El texto actual dice:
"Android Google Play production (current rollout v1.0.33)"

Esto es incorrecto al momento de redactar — el Build 33 fue enviado a revision Google el 16-may a las 00:30 AR y puede no estar aprobado todavia cuando se submita a Apple.

Propuesta: verificar estado de Build 33 en Google Play ANTES de pegar el reply text. Si ya esta aprobado y publicado, usar "v1.0.33". Si todavia esta en revision, usar "v1.0.17" (la version actualmente en produccion Android).

### Correccion 2 — Tabla de riesgos: "Apple suele acelerar re-submits"

El documento dice en mitigacion: "Apple suele acelerar re-submits si nombre validado previamente".

Esto es una suposicion optimista sin sustento verificable. No debe aparecer como mitigacion en la tabla de riesgos. Reemplazar por: "Sin garantia de aceleracion — monitorear queue y preparar Expedited Review Request si pasan 72hs sin respuesta".

---

## CONFIRMACIONES

- Auditoria 12 superficies: realizada por Escritorio en App Store Connect. Resultado en seccion siguiente.
- Manual Release OFF: confirmado como paso critico antes de Submit.
- Reply text: solido y completo con datos Namecheap verificados.
- Plan Fase 2 IAP paralelo: correcto — no bloquea Fase 1.
- Plan Fase 3 iOS Build 25: correcto — no compilar hasta IAP confirmado en Android.

---

## INVENTARIO 12 SUPERFICIES — RESULTADO AUDITORIA ESCRITORIO

Auditoria realizada directamente en App Store Connect Build 17 (1.0 17):

| # | Superficie | Texto actual | Cambio requerido |
|---|---|---|---|
| 1 | App Name | AUREX AI | CAMBIAR → AUREX LIVE |
| 2 | Subtitle | 1 caracter (contenido no visible sin click) | VERIFICAR |
| 3 | Description | 2 ocurrencias "AUREX AI engine" | CAMBIAR → "AUREX engine" |
| 4 | Keywords | 24 caracteres (contenido no visible sin click) | VERIFICAR |
| 5 | Promotional Text | "Analyze 350+ assets with real-time AI data analytics..." | OK — sin AUREX AI |
| 6 | What's New | No visible en pagina | VERIFICAR |
| 7 | IAP Display Names x4 | PRO Mensual/Anual + ELITE Mensual/Anual — nombres sin AUREX AI | OK |
| 8 | IAP Grupo "Nombre de la app" en ingles | AUREX AI | CAMBIAR → AUREX LIVE |
| 9 | Screenshots (10) | Revisadas visualmente — sin AUREX AI incrustado | OK |
| 10 | Preview videos | 0 videos | OK |
| 11 | App Review Notes | Sin AUREX AI — agregar reply text Namecheap | AGREGAR reply |
| 12 | Support/Marketing URL | No visibles — probablemente aurex.live | OK |

SUPERFICIES CON CAMBIO CONFIRMADO: 1 (App Name), 3 (Description x2), 8 (IAP grupo nombre).
SUPERFICIES PENDIENTES VERIFICACION VISUAL: 2 (Subtitle), 4 (Keywords), 6 (What's New).
SUPERFICIES SIN CAMBIO: 5, 7, 9, 10, 12.
SUPERFICIE A AGREGAR CONTENIDO: 11 (reply text).

---

## PROXIMOS PASOS PARA CODE

1. Aplicar Correccion 1 en reply text §4 (verificar estado Build 33 antes de usar "v1.0.33").
2. Aplicar Correccion 2 en tabla de riesgos.
3. Commitear v3 del INFORME al repo.
4. Escritorio aplica los cambios en App Store Connect despues de OK Fernando.
