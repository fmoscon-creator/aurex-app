# PLAN BUILD 28 iOS — 7 bugs detectados en Build 27 + 1 sugerencia UX

> **Doc para revisión Escritorio antes de aplicar.** Generado 19-may-2026 post-validación Build 27 TestFlight.
> **Aplica solo a iOS Build 28.** Backend cambios automáticamente disponibles para Android cuando se compile próximo build.

---

## §0. Restricción de scope (heredada de Build 27)

**Build 28 toca SOLO las ALERTAS MANUALES** (las que el usuario PRO/ELITE crea desde Portfolio/Watchlist via `AlertCreateModal.js`, mostradas en `MisAlertasScreen.js`). NO toca los 15 toggles del tab Alertas (`AlertasScreen.js`).

---

## §1. BUG 4+5 — "Objetivo ---" + todas BAJISTA (causa raíz confirmada Escritorio)

### Síntoma reportado
1. En MisAlertasScreen TODAS las cards aparecen como **BAJISTA rojo** con ícono 📉, aunque la alerta sea ALCISTA en Supabase
2. Cards muestran **"Objetivo: ---"** vacío en lugar del valor configurado

### Causa raíz (verificada Escritorio leyendo código real)
`alertasService.listAlertas()` línea 24 hace SELECT incompleto:
```javascript
.select('id, alerta_id, simbolo, precio_disparado, created_at, leida, borrada, telegram_enviado, fcm_enviado, analisis_ia, alertas!inner(user_id)')
```

El JOIN `alertas!inner(user_id)` solo trae `user_id` de la tabla alertas. NO trae `direccion`, `valor_objetivo`, `precio_base`, `tipo`, `disparada_at`.

En MisAlertasScreen el código del card lee `a.direccion`, `a.valor_objetivo`, `a.precio_base`, `a.tipo` directamente → todos `undefined` → cae al fallback BAJISTA + "Objetivo: ---".

**El bug es por incompatibilidad entre lo que el servicio trae y lo que el card asume.** Mi error fue armar el card sin verificar `alertasService.js` primero.

### Fix Build 28 — 2 cambios coordinados

**A) `~/AurexApp/src/lib/alertasService.js` línea 24**:
```diff
- .select('id, alerta_id, simbolo, precio_disparado, created_at, leida, borrada, telegram_enviado, fcm_enviado, analisis_ia, alertas!inner(user_id)')
+ .select('id, alerta_id, simbolo, precio_disparado, created_at, leida, borrada, telegram_enviado, fcm_enviado, analisis_ia, alertas!inner(user_id, direccion, valor_objetivo, precio_base, tipo, disparada_at)')
```

**B) `~/AurexApp/src/screens/MisAlertasScreen.js` líneas 214-224** (sección del card que lee campos):
Cambiar todas las referencias `a.X` por `a.alertas?.X` para los campos que vienen del JOIN:

```diff
- const isUp = a.direccion === 'arriba';
+ const isUp = a.alertas?.direccion === 'arriba';
- const configLine = (a.tipo === 'precio_objetivo' && a.precio_base != null)
-   ? `... $${Math.abs(a.valor_objetivo)} desde ${fmtP(a.precio_base)}`
-   : `🎯 Objetivo: ${fmtP(a.valor_objetivo)}`;
+ const aSrc = a.alertas || {};
+ const configLine = (aSrc.tipo === 'precio_objetivo' && aSrc.precio_base != null)
+   ? `... $${Math.abs(aSrc.valor_objetivo)} desde ${fmtP(aSrc.precio_base)}`
+   : `🎯 Objetivo: ${fmtP(aSrc.valor_objetivo)}`;
- {fmtRelative(a.disparada_at || a.created_at)}
+ {fmtRelative(aSrc.disparada_at || a.created_at)}
```

### Verificación post-fix
- Crear alerta BTC +5 en Portfolio
- Esperar disparo
- Verificar card en MisAlertasScreen muestra:
  - Border-left **verde** ✅
  - Ícono **📈** ✅
  - "BTC — **ALCISTA**" (verde) ✅
  - "💰 Disparado: $X" ✅
  - "⬆️ SUBA $5 desde $X" ✅ (NO "🎯 Objetivo: ---")

### Riesgo
🟢 Bajo. Solo cambia el SELECT del servicio + acceso a propiedades en el card. Backward compat: alertas legacy (precio_base NULL) usan el fallback "🎯 Objetivo: $X" que también queda fix con `aSrc.valor_objetivo` real.

---

## §2. BUG 1+2 — Modal Crear Alerta sale fuera de pantalla (CRÍTICO)

### Síntoma
1. Modal aparece pegado al status bar arriba (el título 🔔 y la X de cerrar quedan encima del notch del iPhone)
2. Al abrirse el teclado o expandirse la leyenda ⓘ, el modal se empuja y se sale por abajo
3. **La X de cerrar queda inaccesible → hay que cerrar la app**

### Causa raíz (mi error)
El Modal usa `KeyboardAvoidingView` con `behavior='padding'` pero el contenido interior NO está dentro de un `ScrollView`. El modal tiene altura fija basada en el contenido (que crece con el teclado + leyenda) sin posibilidad de scroll.

Además el `<View>` exterior usa `justifyContent: 'center'` que con teclado abierto puede empujar el contenido fuera del área visible.

### Fix Build 28 — `~/AurexApp/src/components/AlertCreateModal.js`

3 cambios coordinados:

1. **Reemplazar el `<View>` exterior** que usa `justifyContent: 'center'` por un `<SafeAreaView>` con `padding-top + padding-bottom` seguros del notch
2. **Envolver el contenido interno del modal en `<ScrollView>`** con `keyboardShouldPersistTaps='handled'` y `contentContainerStyle={{ paddingBottom: 20 }}`
3. **Configurar `KeyboardAvoidingView`** con `keyboardVerticalOffset` ajustado a iPhone (usar `useSafeAreaInsets()` para calcular)

Código aproximado:
```javascript
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// ...
const insets = useSafeAreaInsets();
return (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.78)' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            paddingTop: insets.top + 16,
            paddingBottom: insets.bottom + 20,
            paddingHorizontal: 16,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ backgroundColor: C.card, borderWidth: 2.5, borderColor: accentColor, borderRadius: 16, padding: 18, width: '100%', maxWidth: 320, alignSelf: 'center' }}>
            {/* ... contenido del modal igual ... */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  </Modal>
);
```

### Verificación post-fix
- Abrir modal Crear Alerta en BTC
- X visible arriba derecha, sin tocar el notch del iPhone
- Tap input VALOR → teclado se abre, modal se mueve hacia arriba pero la X sigue accesible
- Tap leyenda ⓘ → panel se expande, todo sigue dentro de pantalla, scroll permite ver todo
- X cierra el modal en cualquier estado

### Riesgo
🟡 Medio. Toca layout del modal. Si está mal puede romper la animación o quedar feo en pantallas chicas. Validar en iPhone real (iPhone con notch).

---

## §3. BUG 3 — Botón "ⓘ ¿Cómo funciona?" en color verde se confunde

### Síntoma
El texto "ⓘ ¿Cómo funciona?" usa `accentColor` (verde si dirección='arriba', rojo si 'abajo'). Se confunde con la info de alerta alcista.

### Causa raíz
Mi código línea 224 del AlertCreateModal usa:
```javascript
<Text style={{ fontSize: 14, color: accentColor, fontWeight: '700' }}>{showInfo ? '✕ Cerrar' : 'ⓘ ¿Cómo funciona?'}</Text>
```

`accentColor` es dinámico según dirección. Debería ser color **neutral dorado** (`C.gold`) que es independiente de la dirección y se distingue claramente.

### Fix Build 28 — 1 línea
```diff
- <Text style={{ fontSize: 14, color: accentColor, fontWeight: '700' }}>
+ <Text style={{ fontSize: 14, color: C.gold, fontWeight: '700' }}>
```

### Riesgo
🟢 Muy bajo. Cambio cosmético 1 línea.

---

## §4. BUG 6 — Alerta ALCISTA no aparece en MisAlertasScreen (pendiente investigar)

### Síntoma reportado
> *"Me ingresó una alerta POP alcista en emergente en la APP en TELEGRAM y CENTRO DE NOTIFICACIONES pero la misma NO fue a la parte INTERNA DE RESUMEN o HISTORIAL DE ALERTAS dentro de la CAMPANA."*

### Causa probable
**Mismo bug raíz que §1.** Con el fix §1 aplicado (`a.alertas?.direccion`), las alertas alcistas SÍ van a aparecer porque el SELECT ahora trae todos los campos. La razón de que Fernando vio "ninguna alcista" en la campana es porque el bug del SELECT hacía que TODAS aparecieran como BAJISTA — la alerta alcista SÍ estaba en la lista, pero mostrada con UI de bajista.

Validar post-fix §1: ver si efectivamente la alcista aparece con UI correcta verde/📈.

### Si después del fix §1 sigue faltando
Investigar:
- ¿La inserción a `alertas_historial` falló para esa alerta? (verificar logs Railway de `dispararAlerta()` L735)
- ¿RLS de Supabase está filtrando esa fila? (poco probable, lee con `auth.uid()` del propio user)

### Fix
Probablemente CERO cambios adicionales (queda resuelto con §1). Confirmar post-validación Build 28.

---

## §5. BUG 7 — Doble disparo BAJISTA BTC (pendiente investigar)

### Síntoma reportado
Aparecieron 2 alertas bajistas BTC: una con "Disparado 76.939" y luego otra con "Disparado 76.927". Sin entender por qué la segunda.

### Causa probable (análisis código backend)
NO es un bug. Es comportamiento correcto:
- Fernando creó **2 alertas separadas** (cada una con `id` propio)
- Una de ellas es la `-5` con `precio_base=76939.44` (disparó cuando bajó a `76927.26`)
- La otra debe ser una alerta legacy con otro `id` (verificar en Supabase si hay 2 BAJISTAS distintas)

### Investigación pendiente
Query Supabase de las alertas BAJISTA disparadas hoy 19-may → confirmar si son 2 distintas con `id` distintos (comportamiento correcto, cada alerta se evalúa independiente).

Si son la **misma alerta disparando 2 veces** → ESO sí sería bug grave (el flag `disparada=true` debería evitarlo). Investigar checkAlertas() L737-739.

### Fix
Probablemente **NO requiere cambio de código**. Si efectivamente son 2 alertas distintas, queda explicado y solo necesita aclarar UX (mostrar el ID o tipo distintivo).

---

## §6. SUGERENCIA UX #8 — Día/hora completa en cards MisAlertas

### Sugerencia Fernando
> *"Donde dice ahora dentro del CARD, ¿no sería mejor que quede guardado el dato de día y hora? Sería de valor para el usuario y también para nosotros ver como funciona y se avisa."*

### Fix Build 28 — `~/AurexApp/src/screens/MisAlertasScreen.js`

Cambiar el timestamp del card de "ahora" → "19-may-2026 14:06 hs":

```diff
- <Text style={{ fontSize: 10, color: C.textDim }}>{fmtRelative(aSrc.disparada_at || a.created_at)}</Text>
+ <Text style={{ fontSize: 10, color: C.textDim }}>
+   {fmtRelative(aSrc.disparada_at || a.created_at)} · {fmtFullDate(aSrc.disparada_at || a.created_at)}
+ </Text>
```

Donde `fmtFullDate` es una nueva helper que retorna formato `19-may-2026 14:06`.

Resultado: "ahora · 19-may-2026 14:06" — muestra ambos (relativo + absoluto).

### Riesgo
🟢 Muy bajo. Helper nuevo + 1 línea en card.

---

## §7. Scope total Build 28 + estimación

| # | Sub-fix | Tiempo | Riesgo |
|---|---|---|---|
| 1 | Bug 4+5 — SELECT alertasService + lectura anidada card | 30 min | 🟢 |
| 2 | Bug 1+2 — Modal con ScrollView + SafeArea + KeyboardAvoiding | 1h | 🟡 |
| 3 | Bug 3 — Color leyenda accent → gold | 5 min | 🟢 |
| 4 | Bug 6 — Validar post-fix §1 (probable cero código) | 10 min | 🟢 |
| 5 | Bug 7 — Investigar Supabase (probable cero código) | 15 min | 🟢 |
| 6 | UX #8 — Helper fmtFullDate + card | 15 min | 🟢 |
| Total | | **~2h 15min** | |

Plus: Clean iOS + Archive + Export + Validación POST-EXPORT + Transporter + asignar grupo + validar = ~45 min adicional siguiendo manual oficial.

**Total Build 28**: ~3h.

---

## §8. Restricción explícita scope (igual que Build 27)

- ✅ SÍ toca: `alertasService.js`, `MisAlertasScreen.js`, `AlertCreateModal.js`
- ❌ NO toca: `AlertasScreen.js` (15 toggles automáticos), backend `server.js` (ya está bien post-Build 27), `BellButton.js`
- ❌ NO migra DB ni cambia schemas
- ❌ NO toca Android (solo iOS Build 28; backend ya cubre Android automáticamente)

---

## §9. Preguntas específicas para Escritorio

1. **§1 fix**: ¿OK cambiar el SELECT del servicio + lectura anidada `a.alertas?.X` en card?
2. **§2 fix**: ¿OK refactor del modal con ScrollView + SafeArea + KeyboardAvoiding? Cualquier preferencia por otro approach (ej. Modal de RN nativo vs Modal custom)?
3. **§4 (Bug 6)**: ¿Confirmás que probable queda resuelto con §1 sin cambios extras?
4. **§5 (Bug 7)**: ¿OK arrancar Build 28 sin investigar Bug 7 todavía? Investigación en paralelo con código fix.
5. **§6 (UX #8)**: ¿Formato "ahora · 19-may-2026 14:06" OK o preferís solo "19-may 14:06"?

Con OK de las 5 preguntas → Code arranca Build 28.

---

*Doc generado por Code 19-may-2026 post-bugs detectados en Build 27 TestFlight. Sigue mismo formato y aprobación que Build 26 + 27.*
