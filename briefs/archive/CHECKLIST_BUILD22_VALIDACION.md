# CHECKLIST VALIDACION BUILD 22 — Samsung + cuenta tester

Fecha: 15-may-2026
Build a validar: v1.0.22 (versionCode 22)
Dispositivo: Samsung R5CR92ADDNW
Cuenta Play Store activa: aurextester12@gmail.com (License Tester)
Commit SHA: `3261ca7f01a7e32acfc599dfc7dabc7f7f7bf8f4` (branch `dev`)

---

## RESUMEN — TODOS LOS TEMAS BUILD 22

| # | Bug | Pantalla | Severidad | Estado Build 21 | Estado esperado Build 22 |
|---|-----|----------|-----------|-----------------|--------------------------|
| 1 | Compra IAP "not available" | SubscriptionScreen | EXTERNO | Falla con "product not available" en sandbox | No tocado código. Sigue esperando respuesta RC support. Comportamiento sandbox esperado. |
| 2 | Botón Guardar tapado por teclado | Portfolio → Agregar Activo | P0 UX | Botón oculto bajo teclado | Botón "Guardar" STICKY siempre visible arriba del teclado |
| 3 | Contador alertas denominador | Alertas (header + secciones) | P1 | Mostraba "4/4" (descontaba bloqueadas) | Muestra "4/5" (denominador absoluto, incluye bloqueadas) |
| 4 | Alerta de precio rebota a ELITE | Campana activo → Crear alerta | P1 | Tocar "Crear alerta de precio" como PRO → POP "Pasate a ELITE" falso | Alerta se crea OK, sin POP, aparece en MisAlertas |
| 5 | IA tap candado RSI/MACD | IA → tap activo → candado | P1 | POP error + pantalla deformada atrás | AUTO-RESUELTO en Build 21. Debería seguir OK. |
| 6 | Alert "Error/Error" sin info | SubscriptionScreen + PerfilScreen | P2 | Cuando falla algo: cartel "Error" sin mensaje | Cartel con mensaje informativo o fallback amigable |
| 7 | Banner upsell en Portfolio | PortfolioScreen | P2 | No existía | Banner contextual debajo de "Valor Total" según plan |
| 8 | Plan no se actualiza tras compra | Perfil después de comprar | P2 | Comprabas PRO y Perfil seguía mostrando FREE | Tras compra, Perfil refresca al plan nuevo automáticamente |

---

## CHECKLIST DETALLADO — CÓMO VALIDAR CADA UNO

### Bug #2 — Modal Agregar Activo: botón Guardar STICKY

**ANTES (Build 21):** Al tap input "Cantidad" o "Precio", el teclado aparecía y tapaba el botón "Guardar". Usuario no podía completar la carga.

**DESPUÉS (Build 22):** El botón "Guardar" queda fijo al fondo del modal, siempre visible arriba del teclado, separado por una línea borderTop.

**Pasos:**
1. Abrí AUREX → tab Portfolio.
2. Tap "Agregar activos" (botón dorado).
3. Buscá un símbolo (ej. BTC) y tocá para seleccionarlo.
4. Tap en el TextInput "Cantidad" → aparece el teclado.
5. Escribí un número (ej. `0.5`). El teclado sigue abierto.
6. Tap en TextInput "Precio" → seguís con teclado.
7. Escribí un número (ej. `65000`).
8. **EXPECTATIVA**: el botón "Guardar" debe estar VISIBLE Y TOCABLE arriba del teclado durante TODOS los pasos 4-7.
9. Tap "Guardar" → guarda el activo y cierra el modal.

✅ PASA si: el botón nunca se oculta bajo el teclado.
❌ FALLA si: el botón desaparece o queda atrás del teclado.

---

### Bug #3 — Contador alertas: denominador absoluto

**ANTES (Build 21):** En Alertas, los contadores por sección y global mostraban "X/Y" donde Y descontaba las alertas bloqueadas por plan. Si la sección tenía 5 alertas y 1 era ELITE-only y vos sos PRO, mostraba "X/4" (escondía la 5ta).

**DESPUÉS (Build 22):** Y es el total ABSOLUTO del catálogo. Mostrará "X/5" siempre. El usuario ve que tiene 1 alerta bloqueada por su plan (es información de upsell útil).

**Pasos:**
1. Logueate (la cuenta tiene que tener un plan FREE o PRO para que la diferencia se vea — con ELITE no hay alertas bloqueadas).
2. Abrí AUREX → tab Alertas.
3. Mirá el header global de la pantalla: contador tipo `X/totalALL` (ej. `12/15` si total es 15).
4. Mirá los headers de cada sección: contador tipo `X/totalSec` por sección (ej. `2/3` o similar).
5. **EXPECTATIVA**: el denominador (segundo número) DEBE incluir TODAS las alertas de cada sección, incluso las que tengan candado de plan.

✅ PASA si: ves alertas bloqueadas (candado) contadas en el denominador.
❌ FALLA si: el denominador descuenta las bloqueadas.

**Pista visual rápida**: si la cuenta es PRO, GDELT está bloqueada (ELITE-only). Mirá la sección "Geopolítica" si existe — debería contar GDELT en el total aunque tenga candado.

---

### Bug #4 — Alerta de precio no rebota falso

**ANTES (Build 21):** Si tocabas la campana de un activo y elegías "Crear alerta de precio" (siendo PRO), el backend rechazaba con 403 plan_limit_reached porque el frontend mandaba `tipo: 'precio'` pero el backend esperaba `tipo: 'precio_objetivo'`. Aparecía POP "Pasate a ELITE" falso.

**DESPUÉS (Build 22):** El frontend mapea `'precio'` → `'precio_objetivo'` antes del POST. Backend acepta. Alerta se crea OK.

**Pasos:**
1. Logueate con plan FREE o PRO.
2. Abrí AUREX → tab Portfolio o Watchlist.
3. Tocá la 🔔 (campana) en cualquier fila de activo.
4. Se abre el modal AlertCreateModal.
5. Dirección: tap "Arriba" o "Abajo".
6. Tipo: dejá "Precio" (el default).
7. Valor: ingresá un precio objetivo (ej. `70000` para BTC).
8. Tap "Crear alerta de precio".
9. **EXPECTATIVA**: aparece toast "Alerta creada. La verás aquí 🔔 cuando se dispare." El modal se cierra.

✅ PASA si: toast verde de éxito.
❌ FALLA si: aparece POP "Límite del plan / Pasate a ELITE" o similar.

**Prueba alternativa**: tipo "Porcentaje" en lugar de "Precio". Mismo resultado esperado (también se mapea internamente).

---

### Bug #5 — IA tap candado RSI/MACD (ya validado en Build 21)

**Estado: AUTO-RESUELTO en Build 21.**

Si querés re-verificar:
1. Logueate FREE o PRO (con ELITE no se aplica, no hay candados).
2. Tab AI.
3. Tap en cualquier activo para expandir.
4. Tap en el 🔒 de "Análisis Técnico (RSI, MACD)".
5. **EXPECTATIVA**: navega a SubscriptionScreen con las 4 cards limpias (FREE $0, PRO Mensual $9.99, PRO Anual $89.99, ELITE Anual $179.99, ELITE Mensual $19.99). SIN Alert "Error". SIN pantalla deformada.

✅ Validado en Build 21 vía screenshot S2.

---

### Bug #6 — Alerts con mensaje informativo

**ANTES (Build 21):** Cuando algo fallaba en SubscriptionScreen o deleteAccount, aparecía Alert con título "Error" y mensaje vacío o "Error" (sin info útil).

**DESPUÉS (Build 22):** El Alert muestra `e.message` real del SDK, o fallback "No se pudo procesar la compra. Intentalo de nuevo o contactanos." En logcat aparece `[SUB] purchase failed: {objeto error completo}` para debug.

**Pasos:**
1. Activá modo avión en el Samsung (para forzar error de red).
2. Abrí AUREX → tab Perfil → tap "Pasate a PRO" o ELITE.
3. Tap en cualquier botón de compra.
4. **EXPECTATIVA**: Alert con mensaje informativo (algo como "Network request failed" o "No se pudo procesar la compra...") en vez de "Error / Error" sin info.
5. Desactivá modo avión.

✅ PASA si: el Alert tiene texto útil que indica el problema.
❌ FALLA si: cartel "Error" sin contenido.

---

### Bug #7 — Banner UpsellBanner en Portfolio

**ANTES (Build 21):** No había banner en Portfolio. Solo en Perfil.

**DESPUÉS (Build 22):** Banner contextual debajo de "Valor Total". Texto cambia según el plan del usuario:

| Plan | Color | Título | Subtítulo | Icono |
|------|-------|--------|-----------|-------|
| FREE | violeta | Activa señales IA para estos activos | Disponible en PRO | ⚡ |
| PRO | dorado | Activa análisis técnico avanzado en tu portfolio | Disponible en ELITE | 👑 |
| ELITE | sin banner | — | — | — |

**Pasos:**
1. Logueate con cuenta aurextester12 (el plan que tenga).
2. Tab Portfolio.
3. Mirá debajo del bloque "Valor Total / + $XXX / 1d ▼".
4. **EXPECTATIVA**: aparece un banner con bordes de color según el plan, texto contextual, icono al inicio y flecha "›" al final. Tocable.
5. Tap en el banner → navega a SubscriptionScreen.

✅ PASA si: el banner aparece con copy correcto al plan.
❌ FALLA si: no aparece banner, o aparece pero con texto genérico de Perfil.

**Validación 3 planes**: si tenés varias cuentas tester con planes distintos, verificá los 3 estados.

---

### Bug #8 — Plan refresca tras compra (sync DeviceEventEmitter)

**ANTES (Build 21):** Tras una compra exitosa en SubscriptionScreen, volvías a Perfil y seguía mostrando FREE hasta cerrar y reabrir la app.

**DESPUÉS (Build 22):** SubscriptionScreen emite `DeviceEventEmitter.emit('plan_changed', { plan: 'PRO' })` y el hook `usePlan()` lo escucha globalmente. TODOS los consumers del hook (PerfilScreen, UpsellBanner de Portfolio, etc.) se refrescan automáticamente.

**Pasos (Sandbox License Tester):**
1. Tab Perfil → ver plan actual (probablemente FREE).
2. Tap "Pasate a PRO" → SubscriptionScreen.
3. Tap "Quiero el PRO" en PRO Mensual.
4. Se abre bottom sheet Google Play → "AUREX PRO Mensual / Tarjeta de prueba, siempre se aprueba".
5. Tap "Suscribirse" → autenticación biométrica → confirmar.
6. **EXPECTATIVA 1**: aparece Alert "Listo / Tu plan fue activado".
7. Tap OK → vuelve automáticamente a Perfil.
8. **EXPECTATIVA 2**: Perfil muestra el plan nuevo INMEDIATAMENTE (sin tener que cerrar/reabrir la app). Badge PRO violeta visible.

**OJO**: en Sandbox + License Tester puede que el entitlement no se persista en RC (comportamiento esperado documentado en el ticket). En ese caso el Alert que va a aparecer es "Compra procesada / La compra se completó pero la activación del plan puede demorar unos minutos. Si no se activa, escribinos." y el plan seguirá en FREE. Eso TAMBIÉN es comportamiento correcto del Build 22 (el código superficia el caso en vez de quedar mudo).

✅ PASA si: caso A (Alert "Listo" + Perfil refresca a PRO) o caso B (Alert "Compra procesada" informativo + Perfil sigue FREE pero usuario sabe por qué).
❌ FALLA si: el Alert "Error" sin info aparece o si pasa nada (silencio total).

---

## SMOKE TEST EXPRESS (4 minutos, los más críticos)

Si tenés poco tiempo, valida solo estos 4:

1. **Bug #2** Modal Agregar Activo botón visible ✅/❌
2. **Bug #4** Crear alerta de precio sin POP falso ✅/❌
3. **Bug #7** Banner UpsellBanner en Portfolio ✅/❌
4. **Bug #8** Comprar PRO → Perfil refresca o Alert informativo ✅/❌

---

## CONTACTO DE RESULTADO

Reportá:
- Cada bug: ✅ PASA / ❌ FALLA / ⚠️ PARCIAL
- Si FALLA: capturar screenshot + breve descripción de lo que se vio
- Si PARCIAL: explicar qué funciona y qué no
- Capturar logcat post-test si algo falló: `adb logcat -d > /tmp/build22_test.txt`

URL pública del checklist (para Escritorio):
`https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/CHECKLIST_BUILD22_VALIDACION.md`
