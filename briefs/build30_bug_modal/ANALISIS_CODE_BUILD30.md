# 🔍 ANÁLISIS INDEPENDIENTE CODE — Build 30 modal bug — 19-may-2026 17:30 AR

> Fernando pidió análisis independiente (no copiar de Escritorio) tras 6º iteración fallida de modal.
> Este doc es la opinión técnica de Code basada en código real Build 30, NO en la propuesta de Escritorio.

---

## 📸 Capturas Fernando (Build 30 instalado)

- **MODAL 1** sin teclado: `briefs/build30_bug_modal/MODAL_1.png` — modal pegado al borde inferior, mitad superior negra/vacía
- **MODAL 2** con teclado: `briefs/build30_bug_modal/MODAL_2.png` — modal a mitad de pantalla, espacio negro enorme entre modal y teclado

---

## 🐛 Causa raíz REAL del bug (verificada en código L199-218 Build 30)

Código actual:
```jsx
<Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
  <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.78)' }}>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 20, paddingHorizontal: 16 }}>
        <View style={{ backgroundColor: C.card, ..., maxHeight: Dimensions.get('window').height * 0.82 }}>
```

**Problema #1 (MODAL 1 sin teclado):** `justifyContent: 'flex-end'` ancla el modal al borde inferior del View padre. Sin teclado el View padre ocupa toda la pantalla → modal queda pegado abajo. Visualmente queda mal porque la mitad superior está vacía.

**Problema #2 (MODAL 2 con teclado):** Comportamiento de KAV `behavior='padding'` en iOS:
1. KAV detecta keyboard frame ~291px alto
2. KAV agrega `paddingBottom: 291px` al View envuelto
3. View envuelto reduce su altura útil de 800px → 509px
4. `justifyContent: 'flex-end'` → modal se posiciona al fondo del nuevo espacio reducido (en pixel ~509-modalHeight)
5. PERO el teclado real está en el rango pixel 509-800 → modal queda ARRIBA del teclado con gap

**Por qué la propuesta original (Build 28) tampoco funcionaba:** ahí teníamos `justifyContent: 'center'` + KAV `padding`. KAV reducía la altura útil 800→509, el centrado se calculaba al medio del nuevo espacio (~254px), pero como el modal mantiene su tamaño, terminaba SOBRESALIENDO por arriba del viewport.

**Conclusión Code:** KAV `behavior='padding'` es incompatible con Modal centrado en iOS porque no respeta el comportamiento real del teclado nativo iOS.

---

## 💡 PROPUESTA CODE (independiente, no copiada de Escritorio)

### Opción A — KAV `behavior='position'` + center (mi recomendación principal)

**Cambio mínimo, conserva visual centrado:**

```jsx
<Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
  <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.78)' }}>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : undefined}
      keyboardVerticalOffset={0}
      contentContainerStyle={{ flex: 1 }}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
        <View style={{ backgroundColor: C.card, ..., maxHeight: Dimensions.get('window').height * 0.7 }}>
```

**Diferencia clave vs Build 30:**
- `behavior='position'` MUEVE el componente entero hacia arriba (no agrega padding interno)
- Modal centrado en pantalla cuando no hay teclado (MODAL 1 OK)
- Cuando teclado abre, el View entero se desplaza hacia arriba el alto del teclado → el modal centrado sube uniformemente y queda visible arriba del teclado
- `maxHeight: 70%` (en lugar de 82%) deja margen para que el desplazamiento no rebote al top

**Riesgo:** BAJO. Es la opción "estándar React Native" para este caso. behavior='position' es exactamente lo que necesitamos: mover el componente sin reflow del layout interno.

### Opción B — Eliminar Modal envolvente + overlay manual con animación

Más complejo, mejor control. Reemplazar `<Modal>` por un componente custom con `<Animated.View position:absolute>` que escucha `Keyboard.addListener('keyboardWillShow')` y `keyboardWillHide`, ajusta `transform: translateY` con la altura del teclado.

**Riesgo:** MEDIO. Más código (~30 líneas), animaciones manuales, requiere cleanup en useEffect. Más superficie de bugs.

### Opción C — Propuesta Escritorio: `position:'absolute' + bottom: keyboardHeight`

Similar a B pero usando `Keyboard.addListener('keyboardWillChangeFrame')` y bottom dinámico.

**Riesgo:** MEDIO. Mismo nivel que B. Funciona pero requiere cleanup + animación sincronizada con la nativa de iOS (sin perfecta sincronización el modal "salta").

---

## 🎯 RECOMENDACIÓN CODE

**Opción A** primero (cambio mínimo, riesgo bajo, comportamiento estándar React Native).

Razón para no ir directo a Opción C de Escritorio: ya tuvimos 2 iteraciones falladas (Build 29 sin KAV, Build 30 con KAV+flex-end). Cada vez complejizamos más. Opción A es el cambio MÁS SIMPLE no probado todavía: cambiar 1 palabra (`'padding'` → `'position'`) + ajustar 1 valor (`maxHeight 82% → 70%`) + cambiar `justifyContent` de vuelta a `'center'`.

Si Opción A falla, recién entonces ir a Opción B o C (más complejas).

---

## ⚖️ COMPARATIVA CON ESCRITORIO

| Criterio | Opción A (Code) | Opción C (Escritorio) |
|---|---|---|
| Líneas de código a cambiar | ~4 | ~30 (listener + state + cleanup) |
| Riesgo de regresión | BAJO | MEDIO |
| Sincronización con teclado iOS | Automática (KAV nativo) | Manual (puede haber lag/salto) |
| Modal centrado sin teclado | ✅ Sí | ✅ Sí |
| Modal sobre teclado abierto | ✅ Sí (movimiento uniforme) | ✅ Sí (anclado bottom) |
| Tiempo implementación | 5 min | 25 min |

**Code prefiere Opción A. Escritorio prefiere Opción C.**

Fernando decide.

---

## 📋 CONTEXTO

- Es la **6ta iteración** del modal Crear Alerta (Builds 28, 29, 30 + intentos previos del año)
- Tanto Code como Escritorio hemos errado en propuestas anteriores
- Fernando pide validación más rigurosa antes de tocar código

**NO modifico AlertCreateModal.js hasta decisión Fernando.**

---

## 📂 ARCHIVOS

- Código real Build 30: `briefs/build30_bug_modal/code_snapshot/AlertCreateModal.js` (384 líneas)
- Capturas bug: `briefs/build30_bug_modal/MODAL_1.png` + `MODAL_2.png`

---

*Análisis Code 19-may-2026 17:30 AR — independiente de la opinión de Escritorio. Para validación cruzada antes de Build 31.*
