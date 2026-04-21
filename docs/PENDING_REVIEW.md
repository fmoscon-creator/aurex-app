# PENDING REVIEW — Fix botón ✕ no cierra panel IA

**Archivo**: aurex-features.js L4147

---

## Problema
El botón ✕ del panel expandido de cada activo en tab IA no cierra el panel.

## Causa
El ✕ tiene `onclick="toggleIARow(i)"` y está dentro del row que TAMBIÉN tiene `onclick="toggleIARow(i)"`. Al tocar ✕:
1. toggleIARow cierra el panel (isOpen=true → cierra todos)
2. El evento propaga al row padre
3. toggleIARow se ejecuta de nuevo (isOpen=false ahora → abre)
4. El panel se cierra y abre instantáneamente = parece que no funciona

## Fix
Agregar `event.stopPropagation();` antes de `toggleIARow(i)` en el onclick del ✕.

**ANTES**: `onclick="toggleIARow('+i+')"`
**DESPUÉS**: `onclick="event.stopPropagation();toggleIARow('+i+')"`

---

## Verificación
- `node -c aurex-features.js` → OK
