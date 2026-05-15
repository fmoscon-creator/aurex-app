# CHECKLIST VALIDACION BUILD 23 — Samsung + cuenta tester

Fecha: 15-may-2026 ~11:40 AR
Build a validar: v1.0.23 (versionCode 23)
Dispositivo: Samsung R5CR92ADDNW
Cuenta Play Store activa: aurextester12@gmail.com (License Tester, plan FREE)
SHA commit frontend: `cbe0de96f3d22dc04c1cdeaca92b833a149bca40` (branch dev de AurexApp)
SHA commit backend: `40a35d3852775e748222a5cc2b132e0bb274d15e` (branch main de aurex-backend, deployado a Railway)

---

## RESUMEN — TODOS LOS TEMAS BUILD 23

| # | Bug | Severidad | Pantalla | Estado Build 22 | Estado esperado Build 23 |
|---|-----|-----------|----------|-----------------|--------------------------|
| A | Modal Agregar Activo sin campos | P0 | Portfolio → Agregar | Al tocar resultado, campos NO aparecen. Botón Guardar da error "completá todos los campos". | Modal abre → buscás → tocás resultado → campos Cantidad + Precio + Preview visibles. Botón Guardar siempre accesible arriba del teclado. |
| B | RSI Extremo FREE | P1 | Alertas → sección Precio | "RSI Extremo" muestra 🔒 candado para FREE. | Switch verde activable para FREE. Al activar y si RSI14 de algún activo supera 70 o cae bajo 30, se dispara la alerta. |
| C | Alertas Activas sin filtro plan | P0 | Alertas (lista debajo) | Cuenta FREE veía 545 alertas, incluyendo tipos PRO/ELITE. Sub-filtros mostraban alertas tipo `alta_conv`, `cambio`, etc. | Lista solo muestra alertas de toggles ENCENDIDOS y PERMITIDOS por el plan. Total real baja drásticamente de 545 (a ~50-150). Sub-filtros solo muestran tipos permitidos. |
| D | Badge candado dinámico | P2 | Alertas (todos los candados) | Todos los candados decían "PRO" hardcoded, incluyendo Geopolítica que es ELITE-only. | Geopolítica (GDELT) muestra badge "ELITE". Resto sigue mostrando "PRO". |
| E | Search input padding | P3 | Modal Agregar Activo | Campo de búsqueda pegado al borde superior del card dorado. | Margen visible entre header del modal y campo de búsqueda. |
| 1 | Compra IAP "not available" | EXTERNO | SubscriptionScreen | Pop "The Product is not available for purchase" en sandbox | **No tocado en Build 23.** Sigue esperando respuesta RC support. Comportamiento esperado sandbox License Tester. |

---

## CHECKLIST DETALLADO — CÓMO VALIDAR CADA UNO

### Bug A — Modal Agregar Activo: campos visibles y botón sticky

**ANTES (Build 22):** Buscabas activo (ej. BTC) en el modal de Agregar. Al tocar el resultado, el modal seguía abierto pero los campos Cantidad y Precio NO aparecían. Solo se veía el botón Guardar al fondo. Al tocarlo decía "completá todos los campos".

**DESPUÉS (Build 23):** Modal funcional completo. Al elegir activo aparecen los campos para ingresar cantidad y precio, más el preview en vivo del valor.

**Pasos:**
1. AUREX → tab Portfolio → tap "Agregar activos" (botón dorado).
2. Escribir "BTC" en el buscador → aparece el resultado.
3. Tocar el resultado BTC.
4. **EXPECTATIVA**: aparecen los campos:
   - `BTC Bitcoin` (header con simbolo seleccionado)
   - Campo "Cantidad" con placeholder "Ej: 0.5"
   - Campo "Precio de compra (USD)" con placeholder "Ej: 65000"
   - Preview en vivo con precio actual + valor estimado
5. Tap Cantidad → escribir `0.5` (teclado abierto).
6. Tap Precio → escribir `65000` (teclado sigue abierto).
7. **EXPECTATIVA**: botón "Guardar" siempre VISIBLE y TOCABLE arriba del teclado durante pasos 5-6.
8. Tap Guardar → guarda activo y cierra modal.

✅ PASA si: campos visibles + Guardar siempre accesible.
❌ FALLA si: campos no aparecen O botón Guardar tapado por teclado.

---

### Bug B — RSI Extremo libre para FREE

**ANTES (Build 22):** Toggle "RSI Extremo" en sección Precio mostraba 🔒 candado para FREE. Tap mostraba PlanLimitModal "Esta alerta requiere PRO o ELITE".

**DESPUÉS (Build 23):** Toggle "RSI Extremo" con Switch verde activable. Sin candado. Al encender, comienza a monitorear RSI14 de los activos en scope y dispara alerta cuando supera 70 (sobrecompra) o cae bajo 30 (sobreventa).

**Pasos:**
1. AUREX → tab Alertas.
2. Expandir sección "💰 Alertas de Precio".
3. Buscar item "RSI Extremo".
4. **EXPECTATIVA**: ver Switch verde/gris (NO candado). Si el toggle está OFF, el switch es gris; si está ON, es verde.
5. Tap el switch para activarlo. Debe quedar verde activo.

✅ PASA si: Switch verde, NO candado.
❌ FALLA si: 🔒 candado aparece.

---

### Bug C — Alertas Activas filtradas por plan

**ANTES (Build 22):** Lista "Alertas Activas" abajo de la pantalla mostraba ~545 alertas con cuenta FREE. Al filtrar por sub-categoría (IA / Precio / Pulse) se veían alertas tipo `alta_conv`, `cambio`, etc. — que el plan FREE no debería ver porque esos toggles tenían candado.

**DESPUÉS (Build 23):** Lista solo muestra alertas de tipos PERMITIDOS por el plan FREE. Total baja a un número razonable (probablemente entre 50 y 150 dependiendo de cuántos activos cumplen condiciones de RSI extremo + variación brusca + max/min).

**Pasos:**
1. AUREX → tab Alertas.
2. Activar todos los toggles disponibles para FREE: IA Umbral, Precio Variación, Precio Max/Min, RSI Extremo, Apertura.
3. Esperar 5-10 segundos a que las alertas se generen.
4. Scroll hacia abajo hasta "Alertas Activas".
5. **EXPECTATIVA 1**: contador total mucho menor que 545. Probablemente entre 50 y 200.
6. Tocar el sub-filtro "IA" → solo deberían aparecer alertas de IA Umbral (ningún `alta_conv`, `cambio`, `portfolio`).
7. Tocar sub-filtro "Precio" → solo Variación, Max/Min y RSI.
8. Tocar sub-filtro "Pulse" → idealmente 0 alertas (Pulse es PRO+, ningún toggle Pulse activable para FREE).

✅ PASA si: total razonable + sub-filtros muestran solo tipos permitidos por plan.
❌ FALLA si: sigue mostrando 545 o sub-filtros muestran tipos PRO/ELITE.

---

### Bug D — Badge candado dinámico PRO vs ELITE

**ANTES (Build 22):** Todos los toggles bloqueados mostraban badge "PRO" hardcoded debajo del 🔒. Incluso "Geopolítica GDELT" que es ELITE-only decía "PRO".

**DESPUÉS (Build 23):** El badge se ajusta al plan mínimo requerido. Geopolítica GDELT muestra "ELITE", resto sigue mostrando "PRO".

**Pasos:**
1. AUREX → tab Alertas → cuenta FREE.
2. Expandir sección "📅 Alertas de Eventos".
3. Buscar item "Geopolítica" (o "GDELT").
4. **EXPECTATIVA**: 🔒 candado + badge "ELITE" (no "PRO").
5. Comparar con otros candados (ej. "Cambio de Señal IA" en sección IA).
6. **EXPECTATIVA**: 🔒 candado + badge "PRO" en los demás.

✅ PASA si: GDELT="ELITE" y otros="PRO".
❌ FALLA si: GDELT="PRO" igual que el resto.

---

### Bug E — Search input con margen superior

**ANTES (Build 22):** El campo de búsqueda en el modal Agregar Activo quedaba casi pegado al borde superior del card dorado.

**DESPUÉS (Build 23):** Espacio respiro entre el header del modal y el input de búsqueda.

**Pasos:**
1. AUREX → tab Portfolio → tap "Agregar activos".
2. Mirar el modal que se abre.
3. **EXPECTATIVA**: hay margen visible entre la fila del header (título "Agregar Activo" + ✕) y el campo "Buscar...".

✅ PASA si: hay margen visible.
❌ FALLA si: input pegado al header sin separación.

---

## SMOKE TEST EXPRESS (3 minutos, los críticos)

Si tenés poco tiempo, validá solo estos 3:

1. **Bug A** — Modal Agregar Activo: campos visibles + botón Guardar siempre accesible.
2. **Bug B** — RSI Extremo: Switch verde activable (sin candado) para FREE.
3. **Bug C** — Alertas Activas total: NO debe seguir mostrando 545 alertas con cuenta FREE.

Si esos 3 PASAN → Build 23 está bien para promoción a Producción.

---

## NOTAS IMPORTANTES

- El **Bug #1 IAP** (compra "not available for purchase") sigue afuera de Build 23. Esperar respuesta RC support y/o test con cuenta NO-License-Tester con cargo real pre-lanzamiento.
- El **backend con el evaluador `rsi_extremo`** ya está deployado a Railway producción (commit 40a35d3). Las alertas RSI van a empezar a dispararse en background para usuarios que activen el toggle.
- Bug D ya estaba parcialmente bien en el message del PlanLimitModal — Build 23 lo extiende al badge visual del candado.

---

## CONTACTO DE RESULTADO

Reportá ✅ PASA / ❌ FALLA por bug. Si FALLA: screenshot + descripción breve.

Para diagnosticar fallos, capturar logcat después del test:
```
adb logcat -d > /tmp/build23_test.txt
```

URL pública del checklist (para Escritorio):
`https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/CHECKLIST_BUILD23_VALIDACION.md`
