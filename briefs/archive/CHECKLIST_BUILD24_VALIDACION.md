# CHECKLIST VALIDACION BUILD 24 — Samsung + cuenta tester

Fecha: 15-may-2026 ~15:30 AR
Build a validar: v1.0.24 (versionCode 24)
Dispositivo: Samsung R5CR92ADDNW
Cuenta Play Store activa: aurextester12@gmail.com (License Tester, plan FREE)
SHA commit frontend: `7105fbb52394557b994e0763938c384772d681a0` (branch dev de AurexApp)
Backend sin cambios desde Build 23 (commit `40a35d3` ya en Railway producción).

---

## RESUMEN — 2 ítems Build 24

| Bug | Severidad | Pantalla | Estado Build 23 | Estado esperado Build 24 |
|-----|-----------|----------|-----------------|--------------------------|
| **E** | P3 | Modal Agregar Activo | Campo "Buscar..." pegado al borde dorado superior del card. marginTop:8 no alcanzó. | Espacio visible entre el título "Agregar Activo" y el campo "Buscar..." Y espacio entre el campo y el resto del modal. |
| **G** | P2 | Pop PlanLimitModal al tocar candado de Geopolítica (ELITE-only) | Mensaje decía "requiere ELITE" pero botón CTA decía "Pasate a PRO" y era violeta. | Mensaje "requiere ELITE" + botón "Pasate a **ELITE**" + botón **dorado** (no violeta). |

---

## CHECKLIST DETALLADO

### Bug E — Search input con margen visible

**ANTES (Build 23):** Modal Agregar Activo se abría con el campo "Buscar..." pegado directamente al borde dorado del card, sin espacio entre el header del modal y el campo. Visualmente apretado.

**DESPUÉS (Build 24):** Espacio visible entre header y campo. Y también espacio entre el campo y la lista de resultados o el bloque siguiente.

**Pasos:**
1. AUREX → tab Portfolio → tap "Agregar activos" (botón dorado).
2. Mirar el modal que se abre.
3. **EXPECTATIVA**: hay un margen claramente visible entre la fila del header (título "Agregar Activo" + ✕) y el campo "Buscar...".

✅ PASA si: margen visible entre header y campo de búsqueda.
❌ FALLA si: el campo sigue pegado al header o al borde dorado superior.

---

### Bug G — PlanLimitModal botón CTA dinámico ELITE vs PRO

**ANTES (Build 23):** Cuando tocabas el candado de Geopolítica (sección Eventos en Alertas) siendo FREE, el pop decía correctamente "Esta alerta requiere ELITE" pero el botón CTA debajo decía "Pasate a PRO" en violeta. Inconsistente.

**DESPUÉS (Build 24):** El botón CTA matchea el plan requerido. Para Geopolítica → "Pasate a ELITE" en dorado. Para los demás bloqueados → "Pasate a PRO" en violeta.

**Pasos parte 1 — Geopolítica (ELITE-only):**
1. AUREX → tab Alertas con plan FREE.
2. Expandir sección "📅 Alertas de Eventos".
3. Buscar el ítem "Geopolítica" (o "GDELT") que tiene 🔒 candado + badge "ELITE" (heredado de Build 23 Bug D).
4. Tap el candado.
5. Se abre PlanLimitModal.
6. **EXPECTATIVA**: mensaje dice "Esta alerta requiere ELITE..." + botón CTA dice "**Pasate a ELITE**" + color del botón es **dorado**.

**Pasos parte 2 — Otra alerta PRO-only (comparación):**
1. En la misma pantalla Alertas, expandir sección "🤖 Alertas IA".
2. Buscar un ítem con 🔒 candado + badge "PRO" (ej. "Cambio de Señal" o "Alta Convicción").
3. Tap el candado.
4. **EXPECTATIVA**: mensaje dice "Esta alerta requiere PRO o ELITE..." + botón CTA dice "**Pasate a PRO**" + color del botón es **violeta**.

✅ PASA si:
- Geopolítica → "Pasate a ELITE" dorado.
- IA Cambio/Alta → "Pasate a PRO" violeta.

❌ FALLA si:
- Geopolítica sigue diciendo "Pasate a PRO" o el color es violeta.
- O viceversa, IA dice "Pasate a ELITE" o color dorado.

---

## SMOKE TEST EXPRESS (1 minuto)

Si tenés muy poco tiempo, validá solo este combo:
- Tap candado Geopolítica → botón dice "Pasate a ELITE" dorado.
- Tap candado IA Cambio → botón dice "Pasate a PRO" violeta.

Si ambos PASAN → Build 24 OK + Build 23 fixes anteriores siguen intactos.

---

## CONTEXTO DEL PROYECTO

- Bug #1 IAP (compra "not available") sigue afuera de Build 24. Sin cambios desde Build 22. Esperando respuesta RC support.
- 5 bugs del Build 23 (A, B, C, D, E parcial) ya validados ✅. El único que faltaba ajustar es E.
- Backend `rsi_extremo` ya está en Railway producción desde Build 23 (deploy 15-may).

---

## CONTACTO DE RESULTADO

Reportá ✅ PASA / ❌ FALLA para cada uno de los 2 ítems (E y G). Si falla algo, screenshot + breve descripción.

URL pública del checklist (para Escritorio):
`https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/CHECKLIST_BUILD24_VALIDACION.md`
