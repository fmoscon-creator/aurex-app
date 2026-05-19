# 📋 VALIDACIÓN BUILD 29 iOS — 19-may-2026 17:00 AR

> Fernando validó Build 29 (v1.0.29) punto por punto en iPhone TestFlight tras Build 29 compilado y subido a Transporter.
> 4 fixes OK, 1 parcial, 1 FALLADO. 2 bugs nuevos detectados (B29-1, B29-2) van a Build 30.

---

## ✅ FIXES OK (4 de 6 validados)

### Punto 2 — B28-1 Leyenda ⓘ → Modal secundario ✅
- Tocar ⓘ abre modal independiente encima del modal Crear Alerta
- Se cierra con X arriba derecha sin afectar el formulario
- Fernando: *"POP de ? encima y se cierra luego"*

### Punto 3 — B28-6 Timestamp en hora local AR ✅
- Card BAJISTA BTC disparada 19:32 UTC = 16:32 AR
- Build 29 muestra "16:32" (correcto)
- Build 28 mostraba "19:32" (incorrecto, era UTC)
- Fix `new Date(ts.endsWith('Z') ? ts : ts + 'Z')` funcionó OK
- Fernando: *"a las 16.32"*

### Punto 4 — B28-3 Formato números AR ✅
- Card muestra "$76.823" con PUNTO de miles (estilo AR)
- Build 28 mostraba "$76,823" con coma (estilo USA)
- Fix `toLocaleString('es-AR')` funcionó OK
- Fernando: *"con PUNTO . esta OK"*

### Punto 5 — B28-5 Sacar emojis 📈/📉 dirección ✅
- Botones "Arriba" / "Abajo" sin emojis arriba del texto
- Más bajos, color fondo verde/rojo sigue identificando dirección
- Fernando: *"salieron emojis de arriba y abajo"*

---

## ⚠️ FIX PARCIAL (1 de 6)

### Punto 6 — B28-4 Botón verde "Crear Alerta" ⚠️
**Acordado con Fernando:**
- Sacar palabras "DE PRECIO" del botón verde ✅ HECHO
- Mantener emoji 🔔 ← ❌ **NO MANTUVE — Code error**

**Lo que pidió Fernando textualmente (sesión Build 28 retrospectiva):**
> "DEJA SOLO CREAR ALERTA ya que en el título del POP YA dice CREAR ALERTA DE PRECIO"

Nunca pidió sacar el emoji 🔔. Code se extralimitó y lo sacó.

**Estado Build 29 actual:** botón dice solo "Crear Alerta" (sin emoji, sin "de Precio")
**Estado correcto:** debe decir "🔔 Crear Alerta" (con emoji, sin "de Precio")

→ Va a **Build 30 como B29-1**

---

## ❌ FIX FALLADO (1 de 6) — REQUIERE REDISEÑO

### Punto 1 — B28-2 Sacar KeyboardAvoidingView ❌
**Cambios aplicados en Build 29:**
- Eliminé `<KeyboardAvoidingView behavior='padding'>` que envolvía todo el modal
- Agregué `automaticallyAdjustKeyboardInsets={true}` al ScrollView interno

**Resultado observado por Fernando (textual):**
> 1ra observación: "Al crear alerta sobre 🔔 de BTC en Portfolio se abre el modal y el teclado de abajo queda tapando casi la mitad del botón BTC. Tapa totalmente hasta el botón de Crear Alerta."
>
> 2da observación tras emojis fix: "Modal bajó al medio de la pantalla pero ahora lo tapa el teclado de abajo hasta la altura de la mitad de card BTC AHORA DISPARA."

**Diagnóstico (no análisis cerrado — para evaluación Escritorio):**
- Modal bajó al medio (mejor que Build 28 donde se iba arriba) ← parcialmente mejor
- PERO `automaticallyAdjustKeyboardInsets` no scrollea lo suficiente para mostrar el contenido tapado
- La card de preview "BTC AHORA DISPARA $XX" queda tapada parcialmente por el teclado

→ Va a **Build 30 como B29-2 — REDISEÑO modal**

---

## 🐛 BUGS NUEVOS BUILD 29 — VAN A BUILD 30

### B29-1 — Botón verde sin emoji 🔔 (error Code)
**Causa:** Code se extralimitó en Build 29, sacó el emoji que nunca se pidió
**Fix:** restaurar emoji 🔔 antes del texto en AlertCreateModal.js L347
**Cambio exacto:**
```jsx
// Build 29 (incorrecto):
{t('crear_alerta_corto')}

// Build 30 (correcto):
{`\u{1F514} ${t('crear_alerta_corto')}`}
```
**Riesgo:** BAJO. 1 línea de cambio. El texto "🔔 Crear Alerta" (12 chars + emoji) NO wrappea en 8 idiomas (validado: el más largo es "Create alert" 12 chars).

### B29-2 — Teclado sigue tapando modal (fix B28-2 insuficiente)
**Causa:** `automaticallyAdjustKeyboardInsets={true}` no es suficiente para scrollear el contenido del modal cuando el teclado abre y tapa el área inferior

**Opciones propuestas (a discutir con Escritorio):**

**Opción A — Bottom sheet (rediseño UX):**
- Cambiar modal centrado a modal anclado en parte superior (top) con keyboardVerticalOffset
- El teclado abre desde abajo y NO tapa contenido porque el modal está arriba
- Pierde el centrado visual pero gana visibilidad total
- Riesgo: cambio UX visible

**Opción B — Achicar modal y centrar más arriba:**
- Forzar el modal a quedar al 40% superior de pantalla (no centrado 50%)
- Cuando teclado abre (~280px iOS), el modal queda visible arriba del teclado
- Riesgo: BAJO. Solo cambio CSS de posicionamiento

**Opción C — Hacer scroll manual al input enfocado:**
- Capturar `onFocus` del TextInput VALOR
- Usar `scrollRef.scrollTo({y: targetY})` manualmente para scrollear el ScrollView al input
- Más control pero más código
- Riesgo: MEDIO. Más lógica frontend

**Opción D — Sacar la card de preview "BTC AHORA DISPARA" del scroll y ponerla arriba del input VALOR:**
- Reordenar: asset preview → dirección → tipo → leyenda → **preview vivo** → valor input → botones
- Si el preview está ARRIBA del valor input, no es tapado por el teclado
- Cambio funcional menor (orden)
- Riesgo: BAJO. Solo reordenar JSX

**Recomendación Code para evaluación Escritorio:** Opción D + Opción B combinadas. D resuelve el problema visual de "no veo el preview" porque lo lleva arriba del input. B garantiza que aunque el teclado tape los botones de abajo, el modal queda anclado más arriba dejando margen.

---

## 📊 ESTADO TÉCNICO BUILD 29

- **IPA path:** `/Users/fernandomoscon/AurexApp/backups/ipa/Build29/AurexApp.ipa` (42 MB)
- **Commit:** `4869358` push a branch `dev`
- **Subido a TestFlight:** SÍ (Fernando ya lo tiene instalado v1.0.29)
- **MARKETING_VERSION:** 1.0 (intacto)
- **CURRENT_PROJECT_VERSION:** 29 (bump desde 28)
- **Diff Info.plist vs Build 28:** únicamente CFBundleVersion 28→29 ✅

---

## 🎯 PLAN BUILD 30 (para validar con Escritorio)

**Fixes consolidados:**
1. **B29-1**: restaurar emoji 🔔 en botón verde (1 línea)
2. **B29-2**: rediseñar layout modal para que teclado no tape preview (Opción a elegir por Escritorio entre A/B/C/D)

**Tiempo estimado:**
- Si Opción D + B → 15-20 min total
- Si Opción A → 30-40 min (rediseño UX)
- Si Opción C → 25-30 min (lógica nueva)

**NO TOCAR en Build 30:**
- Lógica delta condicional (funciona OK)
- SELECT JOIN alertasService (funciona OK)
- Cards verde/rojo MisAlertasScreen (funcionan OK)
- Timestamp fix TZ (funciona OK)
- Formato números AR (funciona OK)
- Sacar emojis dirección (funciona OK)
- Modal secundario leyenda ⓘ (funciona OK)
- Push FCM iOS (OPS-4 funcionando OK)
- Backend (sin cambios necesarios)

---

## ✅ LO QUE FUNCIONA EN BUILD 29 Y NO SE TOCA

- Cards MisAlertas verde/rojo según dirección ✅
- "SUBA/BAJA $X desde $X" en cards ✅
- Color ⓘ dorado ✅
- JOIN SELECT alertasService ✅
- Botón 🔔 Portfolio/Watchlist abre modal con símbolo precargado ✅
- Cron backend lógica delta condicional ✅
- Pop in-app + Telegram + push iOS centro notif (OPS-4) ✅
- Timestamp en hora AR ✅
- Formato números AR ✅
- Botones dirección sin emojis ✅
- Modal secundario leyenda ⓘ ✅

---

*Validación completada 19-may-2026 17:00 AR — Fernando + Code. Fernando pidió listado consolidado con detalles para Escritorio para definir Opción A/B/C/D para B29-2 antes de Build 30.*
