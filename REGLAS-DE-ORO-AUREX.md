# ⛔ REGLAS-DE-ORO-AUREX — LEER ANTES DE EJECUTAR CUALQUIER CAMBIO

> Este archivo existe porque se rompió la app en producción múltiples veces por no seguir un procedimiento. 
> **OBLIGATORIO leerlo y seguirlo en cada sesión, sin excepción.**

---

## 🔴 REGLA 1 — NUNCA TOCAR index.html PARA CAMBIOS DE ESTILO O LÓGICA

**El index.html es la estructura base de la app. Si se rompe un div, se rompe TODO en iOS Safari.**

- Los cambios de color, estilo, lógica → van en **aurex-features.js** únicamente
- Si hay que agregar un elemento nuevo al HTML → hacerlo via **document.createElement()** en JS, nunca editando el HTML estático
- Única excepción válida para index.html: cambiar el cache buster `?v=TIMESTAMP`

---

## 🔴 REGLA 2 — ANTES DE CADA COMMIT: VERIFICAR QUE EL REEMPLAZO SE ENCONTRÓ

```javascript
// SIEMPRE verificar antes de subir:
if(js.includes(oldString)) {
  js = js.replace(oldString, newString);
  console.log('OK');
} else {
  console.log('NO ENCONTRADO — NO SUBIR');
  // PARAR ACÁ y buscar el string exacto
}
```

**Si dice NO ENCONTRADO → buscar el string exacto en el archivo, no asumir.**

---

## 🔴 REGLA 3 — DESPUÉS DE CADA COMMIT: VERIFICAR EN BROWSER ANTES DE REPORTAR OK

1. Recargar la app con `?t=NUEVO_NUMERO` (incrementar siempre)
2. Tomar screenshot de la zona modificada
3. Verificar que el cambio se ve en el browser
4. Verificar en consola que no hay errores JS
5. SOLO después de esto reportar ✅ al usuario

**NUNCA reportar ✅ sin haber visto el screenshot.**

---

## 🔴 REGLA 4 — CUANDO SE ROMPE ALGO: UN SOLO REVERT LIMPIO

1. Identificar el SHA del último commit bueno verificado (ver tabla abajo)
2. Obtener el contenido de ESE SHA específico
3. Subir en UN solo commit con mensaje "REVERT a [SHA]"
4. NO hacer múltiples reverts encadenados — confunden el historial

---

## 🔴 REGLA 5 — ENCODING: SIEMPRE TextEncoder → Uint8Array → btoa

```javascript
// CORRECTO:
const encoder = new TextEncoder();
const bytes = encoder.encode(content);
let binary = '';
const chunk = 8192;
for(let i=0;i<bytes.length;i+=chunk)
  binary += String.fromCharCode.apply(null, bytes.subarray(i,i+chunk));
const b64 = btoa(binary);

// NUNCA usar:
btoa(unescape(encodeURIComponent(text)))  // rompe emojis
```

---

## 🔴 REGLA 6 — CAMBIOS DE COLOR/ESTILO: SOLO EN aurex-features.js VIA JS DOM

Para cambiar colores de elementos que se generan dinámicamente:
- Buscar el string exacto con `js.indexOf()` primero
- Mostrar el contexto antes de reemplazar
- Verificar que solo hay UNA ocurrencia del string (para no romper otros elementos)

Para cambiar colores de elementos estáticos del HTML:
- Hacerlo via JavaScript en la función `_initPortDropdowns` o equivalente
- NUNCA editar el HTML estático para colores

---

## 🔴 REGLA 7 — INFORMAR COMMIT SHA EN CADA CAMBIO

En cada cambio exitoso, reportar en el chat:
```
✅ Commit: [SHA corto 8 chars] — [descripción]
📁 Archivo: [nombre del archivo]
```

---

## 📋 TABLA DE COMMITS BUENOS VERIFICADOS

| Fecha | Archivo | Commit SHA | Descripción | Verificado en iPhone |
|-------|---------|------------|-------------|---------------------|
| 31/03/2026 | index.html | 57cbeb37 | Punto 10+11: badge USD + botones periodo | ✅ SÍ |
| 31/03/2026 | aurex-features.js | fc01542f | Punto 10+11: portTotalPeriod + cyclePortCurrency | ✅ SÍ |
| 31/03/2026 | aurex-features.js | fcea488e | Fix contraste textos (Termómetro, PULSE, etc) | ⚠️ NO verificado iPhone |
| 31/03/2026 | index.html | 1a6c55b5 | REVERT a 57cbeb37 (último bueno) | ⬜ Pendiente |

---

## ⚠️ PROBLEMA RECURRENTE: iOS Safari vs Chrome Desktop

**iOS Safari es MÁS ESTRICTO que Chrome con HTML mal formado.**

- Un `<div>` sin cerrar → en Chrome se ve bien, en iOS Safari se rompe todo
- Cambios en index.html que funcionan en browser pueden romper el iPhone
- **Por esto la REGLA 1 existe: no tocar index.html para nada que no sea el cache buster**

---

## 🔁 CHECKLIST OBLIGATORIO ANTES DE CADA COMMIT

- [ ] ¿El string a reemplazar se encontró exactamente? (console.log confirma)
- [ ] ¿El cambio es solo en aurex-features.js? (no en index.html)
- [ ] ¿Se verificó en browser con screenshot?
- [ ] ¿No hay errores en consola JS?
- [ ] ¿Se informó el commit SHA en el chat?
