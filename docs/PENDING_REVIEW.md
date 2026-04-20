# PENDING REVIEW — Fix bugs i18n Fase 1

---

## Fix 1 — navTo() llama applyTranslations()

**Archivo**: index.html, línea 3992
**Problema**: navTo() no llama applyTranslations(). Al cambiar idioma y navegar entre tabs, los textos no se re-aplican.

**ANTES** (líneas 3992-4004):
```javascript
window.navTo = function(screen) {
  var screens = document.querySelectorAll('.screen');
  screens.forEach(function(s){ s.style.display = 'none'; });
  var target = document.getElementById('screen-' + screen);
  if(target) target.style.display = 'flex';
  var btns = document.querySelectorAll('.tab-btn');
  btns.forEach(function(b){ b.classList.remove('active'); });
  var activeBtn = document.getElementById('btn-' + screen);
  if(activeBtn) activeBtn.classList.add('active');
  if(screen==='mercados'){ setTimeout(function(){ renderTab(window._activeTab||'cripto'); },50); }
  if(screen==='watchlist'){ setTimeout(function(){ if(window._wlSyncFromSupabase) _wlSyncFromSupabase(function(){ if(window.renderWatchCnt) window.renderWatchCnt(); }); else if(window.renderWatchCnt) window.renderWatchCnt(); },50); }
  if(screen==='perfil'){var pc=document.getElementById('perfil-canvas');if(pc&&pc.parentElement)pc.parentElement.scrollTop=0;}
};
```

**DESPUÉS**:
```javascript
window.navTo = function(screen) {
  var screens = document.querySelectorAll('.screen');
  screens.forEach(function(s){ s.style.display = 'none'; });
  var target = document.getElementById('screen-' + screen);
  if(target) target.style.display = 'flex';
  var btns = document.querySelectorAll('.tab-btn');
  btns.forEach(function(b){ b.classList.remove('active'); });
  var activeBtn = document.getElementById('btn-' + screen);
  if(activeBtn) activeBtn.classList.add('active');
  if(screen==='mercados'){ setTimeout(function(){ renderTab(window._activeTab||'cripto'); },50); }
  if(screen==='watchlist'){ setTimeout(function(){ if(window._wlSyncFromSupabase) _wlSyncFromSupabase(function(){ if(window.renderWatchCnt) window.renderWatchCnt(); }); else if(window.renderWatchCnt) window.renderWatchCnt(); },50); }
  if(screen==='perfil'){var pc=document.getElementById('perfil-canvas');if(pc&&pc.parentElement)pc.parentElement.scrollTop=0;}
  if(window._i18n) window._i18n.applyTranslations();
};
```

**Cambio**: una sola línea agregada antes del cierre: `if(window._i18n) window._i18n.applyTranslations();`

---

## Fix 2 — pacInitSeg() usa t() en vez de hardcoded

**Archivo**: index.html, línea 3355
**Problema**: pacInitSeg() sobrescribe textContent/innerHTML con strings hardcodeados, destruyendo los spans con data-i18n.

**ANTES** (líneas 3355-3386):
```javascript
function pacInitSeg(){
  var ua=navigator.userAgent;
  var dev='';
  if(/iPhone/.test(ua)) dev='iPhone';
  else if(/Android/.test(ua)) dev='Android';
  else if(/iPad/.test(ua)) dev='iPad';
  else dev='Navegador web';
  var el=document.getElementById('seg-dispositivo');
  var el2=document.getElementById('seg-session-info');
  if(el) el.textContent=dev;
  if(el2){
    var now=new Date();
    el2.textContent='Hoy '+now.getHours()+':'+('0'+now.getMinutes()).slice(-2);
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

**DESPUÉS**:
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
  if(el) el.innerHTML='<span data-i18n="este_dispositivo">'+dev+'</span>';
  if(el2){
    var now=new Date();
    var hoy=window.t ? t('hoy') : 'Hoy';
    el2.innerHTML='<span data-i18n="hoy">'+hoy+'</span> '+now.getHours()+':'+('0'+now.getMinutes()).slice(-2);
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

**Cambios**:
1. `dev` para 'Navegador web' usa `t('navegador_web')` con fallback
2. `seg-dispositivo` usa innerHTML con `<span data-i18n="este_dispositivo">` para que applyTranslations() lo mantenga
3. `seg-session-info` usa `t('hoy')` para la palabra "Hoy"
4. Los timestamps (`acc.innerHTML`) quedan igual — son datos dinámicos, no strings traducibles. Solo `dev` dentro necesita ser el device name que ya fue traducido arriba.

**Key nueva en aurex-i18n.js**:
```javascript
    navegador_web: { es: 'Navegador web', en: 'Web browser' },
```
Se agrega dentro de la sección B5: SEGURIDAD, después de `hoy`.
