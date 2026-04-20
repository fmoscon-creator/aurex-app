# PENDING REVIEW — Fix bugs i18n Fase 1 (v2 corregido)

---

## Fix 1 — navTo() llama applyTranslations()

**Archivo**: index.html, línea 3992
**Cambio**: una línea agregada antes del cierre de navTo():

```javascript
  if(window._i18n) window._i18n.applyTranslations();
```

---

## Fix 2 — pacInitSeg() usa t() (CORREGIDO por Escritorio)

**Archivo**: index.html, línea 3355

**DESPUÉS corregido**:
```javascript
function pacInitSeg(){
  var ua=navigator.userAgent;
  var dev='';
  if(/iPhone/.test(ua)) dev='iPhone';
  else if(/Android/.test(ua)) dev='Android';
  else if(/iPad/.test(ua)) dev='iPad';
  else dev=window.t ? t('navegador_web') : 'Navegador web';
  var el=document.getElementById('seg-dispositivo');
  var el2=document.getElementById('seg-session-info');
  if(el) el.textContent=dev;
  if(el2){
    var now=new Date();
    var hoy=window.t ? t('hoy') : 'Hoy';
    el2.textContent=hoy+' '+now.getHours()+':'+('0'+now.getMinutes()).slice(-2);
  }
  var acc=document.getElementById('seg-accesos');
  if(acc){
    var d=new Date();
    var fmt=function(dt){
      return dt.getDate()+'/'+(dt.getMonth()+1)+'/'+dt.getFullYear()+
        ' '+dt.getHours()+':'+('0'+dt.getMinutes()).slice(-2);
    };
    var d2=new Date(d-86400000);
    var d3=new Date(d-172800000);
    acc.innerHTML=
      '<div style="display:flex;justify-content:space-between;font-size:12px;color:var(--textSec)">'+
      '<span>'+fmt(d)+'</span><span style="color:var(--textDim)">'+dev+'</span></div>'+
      '<div style="display:flex;justify-content:space-between;font-size:12px;color:var(--textDim)">'+
      '<span>'+fmt(d2)+'</span><span style="color:var(--border2)">'+dev+'</span></div>'+
      '<div style="display:flex;justify-content:space-between;font-size:12px;color:var(--border2)">'+
      '<span>'+fmt(d3)+'</span><span style="color:var(--border)">'+dev+'</span></div>';
  }
}
```

**Cambios vs original**:
1. Línea `else dev=...`: usa `t('navegador_web')` con fallback (antes: hardcoded 'Navegador web')
2. `el.textContent=dev`: sin data-i18n, dev ya está traducido (antes: igual, sin bug)
3. `el2.textContent=hoy+...`: usa `t('hoy')` con fallback (antes: hardcoded 'Hoy')
4. Sin data-i18n en ningún elemento regenerado — evita que applyTranslations() destruya valores dinámicos

**No cambia**: el bloque de `acc.innerHTML` con timestamps — son datos dinámicos, no strings traducibles. Solo `dev` dentro ya viene traducido.

---

## Key nueva en aurex-i18n.js

Agregar después de `hoy` (línea 93):
```javascript
    navegador_web: { es: 'Navegador web', en: 'Web browser' },
```

---

## Resumen: 3 archivos tocados

1. **index.html L3992**: agregar `if(window._i18n) window._i18n.applyTranslations();` en navTo()
2. **index.html L3355**: reemplazar pacInitSeg() completa con versión corregida
3. **aurex-i18n.js L93**: agregar key `navegador_web`
