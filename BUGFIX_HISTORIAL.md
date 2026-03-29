# AUREX — HISTORIAL DE BUG CRÍTICO: PANTALLA NEGRA EN IPHONE NUEVO

## Resumen
Durante 4 sesiones consecutivas (aprox. 4 días) la app mostraba **pantalla completamente negra** en iPhones que abrían la app por primera vez. El problema fue diagnosticado y resuelto el 29/03/2026.

---

## Síntoma
- iPhone nuevo (o iPhone que nunca había abierto la app) → pantalla 100% negra
- iPhone que ya había completado el onboarding → app funcionaba perfectamente
- En navegador de escritorio → funcionaba perfectamente (tenía `aurex_onboarding_done` en localStorage)

---

## Causa Raíz

**Archivo:** `index.html`
**Bloque:** Script inline de inicialización del onboarding (alrededor de la línea 1450)
**Función:** Bloque `else` dentro del script que maneja `aurex_onboarding_done`

### ¿Qué pasaba exactamente?

Cuando un usuario nuevo abre la app, el código verifica si existe `localStorage.getItem('aurex_onboarding_done')`.

- Si **existe** → mueve el `.phone` y carga la app normalmente ✅
- Si **NO existe** → debería mostrar el onboarding (pantalla de bienvenida OBS1) ❌

El bloque del `else` hacía esto:

```javascript
// CÓDIGO ROTO (antes del fix):
document.addEventListener('DOMContentLoaded', function() {
  var ph = document.querySelector('.phone');
  if(ph) ph.style.display = 'none';           // ✅ ocultaba .phone
  var onb = document.getElementById('onboarding');
  if(onb) onb.style.display = 'flex';          // ✅ mostraba #onboarding (contenedor)
  var o2 = document.getElementById('obs2');
  initObs1Canvas();                             // ✅ inicializaba el canvas de estrellas
  if(o2) o2.style.display = 'none';            // ✅ ocultaba obs2
  // ❌ NUNCA mostraba #obs1 ← ESTE ERA EL BUG
});
```

### ¿Por qué pantalla negra?

El HTML tiene `#obs1` con `display:none` hardcodeado:
```html
<div id="obs1" style="...display:none;...">
```

El contenedor `#onboarding` se mostraba (`display:flex`) pero sus dos hijos (`#obs1` y `#obs2`) tenían ambos `display:none`. El resultado era un contenedor vacío invisible sobre un fondo negro → **pantalla negra total**.

---

## Por qué tardó 4 sesiones en encontrarse

Las sesiones anteriores buscaban el problema en:
- `aurex-features.js` → buscando `async/await`, `?.`, `??`, `for...of` (incompatibilidades iOS)
- Versión cacheada del service worker
- Problemas de Supabase / autenticación

**Nada de eso era el problema.** El archivo `aurex-features.js` no tiene ninguna incompatibilidad de sintaxis con Safari iOS. El bug era puramente de lógica de inicialización en el HTML.

La clave fue simular un iPhone nuevo (borrar `aurex_onboarding_done` del localStorage y recargar), lo que reprodujo la pantalla negra al instante y permitió localizar el bug en segundos.

---

## Solución Aplicada

**Commit:** `df69aa21a78f63008402dacd24c550d1e19edf52`
**Fecha:** 29/03/2026

Se agregaron 2 líneas en el bloque `else` del script de onboarding en `index.html`:

```javascript
// CÓDIGO CORREGIDO:
document.addEventListener('DOMContentLoaded', function() {
  var ph = document.querySelector('.phone');
  if(ph) ph.style.display = 'none';
  var onb = document.getElementById('onboarding');
  if(onb) onb.style.display = 'flex';
  var o1 = document.getElementById('obs1');    // ← LÍNEA AGREGADA
  if(o1) o1.style.display = 'flex';            // ← LÍNEA AGREGADA (FIX)
  var o2 = document.getElementById('obs2');
  if(o2) o2.style.display = 'none';
  initObs1Canvas();
});
```

---

## Estructura del Onboarding (para referencia futura)

```
#onboarding (contenedor principal, position:fixed, z-index:99999)
  ├── #obs1 (pantalla 1: logo AUREX + estrellas doradas + botón "Comenzar")
  │     └── #obs1Stars (canvas con animación de constelaciones doradas)
  └── #obs2 (pantalla 2: formulario de registro)
        └── #obs2Stars (canvas con animación de constelaciones doradas)
```

### Flujo correcto del onboarding:
1. Usuario nuevo abre app → se muestra `#obs1` (logo + "Comenzar")
2. Usuario toca "Comenzar" → se llama `showObs2()` → se muestra `#obs2`
3. Usuario completa registro → se llama `startApp()` → se guarda `aurex_onboarding_done=1` y se muestra `.phone`

---

## Regla para el futuro

> **Siempre testear con localStorage limpio antes de hacer deploy.**
> Abrir DevTools → Application → Local Storage → borrar `aurex_onboarding_done` → recargar.
> Si se ve pantalla negra, el onboarding está roto.

