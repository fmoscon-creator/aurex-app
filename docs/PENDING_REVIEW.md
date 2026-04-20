# PENDING REVIEW — Fix timing: empty state re-render on lang change

**Archivo**: aurex-features.js L894 (1 línea nueva)
**Cambio**: Registra `onLangChange` listener que re-llama `_renderPortfolioEmpty()` si el portfolio está vacío cuando el usuario cambia idioma.

**ANTES**: El empty state se renderizaba con t() al cargar, pero si el usuario cambiaba idioma después, el texto quedaba en el idioma anterior (innerHTML estático, no data-i18n).

**DESPUÉS**: 
```js
if(window._i18n) window._i18n.onLangChange(function(){ if(!window._portItems || window._portItems.length===0) _renderPortfolioEmpty(); });
```

Sin keys nuevas. Sin otros archivos modificados.
