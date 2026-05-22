# Evidencia de código PWA — Gating de plan (para validar Hallazgo #1)

**Verificación:** `checkPlanLimit` + `showPaywall` se llaman **0 veces** en app/aurex-features.js.

**Conclusión:** la infraestructura de gating EXISTE en index.html pero NO se invoca en los puntos críticos (agregar activo, crear lista). Falta cablear, no construir.

---
## 1) Infraestructura de gating — SÍ existe (app/index.html, líneas 4133-4325)
```javascript
  var PLAN_LIMITS_CLIENT = {
    FREE: { portfolioMax: 5, watchlistMax: 10, alertTypes: ['umbral','precio_objetivo','variacion_brusca','max_min','apertura'] },
    PRO:  { portfolioMax: Infinity, watchlistMax: Infinity, alertTypes: ['umbral','precio_objetivo','variacion_brusca','max_min','apertura','alta_conviccion_ia','cambio_senal','senal_portfolio','cambio_zona_pulse','por_categoria','termometro_riesgo','fed_fomc','cpi_pbi','earnings'] },
    ELITE:{ portfolioMax: Infinity, watchlistMax: Infinity, alertTypes: ['umbral','precio_objetivo','variacion_brusca','max_min','apertura','alta_conviccion_ia','cambio_senal','senal_portfolio','cambio_zona_pulse','por_categoria','termometro_riesgo','fed_fomc','cpi_pbi','earnings','geopolitica_gdelt'] },
  };

  window.aurexPlan = { plan:'FREE', limits: PLAN_LIMITS_CLIENT.FREE, loadedAt: null };

  // Lee plan del usuario logueado desde backend Supabase. Si no esta logueado o falla, queda FREE.
  window.loadUserPlan = async function(){
    try {
      var u = window._currentUser;
      if (!u || !u.id) { window.aurexPlan = { plan:'FREE', limits: PLAN_LIMITS_CLIENT.FREE, loadedAt: Date.now() }; return 'FREE'; }
      var r = await fetch(BACKEND_URL + '/api/usuario/' + u.id);
      if (!r.ok) throw new Error('HTTP ' + r.status);
      var d = await r.json();
      var p = (d.plan || 'FREE').toUpperCase();
      if (!PLAN_LIMITS_CLIENT[p]) p = 'FREE';
      window.aurexPlan = { plan: p, limits: PLAN_LIMITS_CLIENT[p], loadedAt: Date.now() };
      try { localStorage.setItem('aurex_plan', p); } catch(e){}
      console.log('[AurexGating] Plan cargado:', p);
      window.applyPlanGating();
      return p;
    } catch(e) {
      console.error('[AurexGating] error loadUserPlan:', e.message);
      window.aurexPlan = { plan:'FREE', limits: PLAN_LIMITS_CLIENT.FREE, loadedAt: Date.now() };
      return 'FREE';
    }

/* ... loadUserPlan ... */

  window.checkPlanLimit = function(action, currentCount){
    var L = window.aurexPlan.limits || PLAN_LIMITS_CLIENT.FREE;
    var P = window.aurexPlan.plan || 'FREE';
    if (action === 'add_portfolio') {
      if (L.portfolioMax === Infinity) return { ok: true };
      if (currentCount >= L.portfolioMax) return { ok: false, plan: P, limit: L.portfolioMax, message: 'Tu plan ' + P + ' permite hasta ' + L.portfolioMax + ' activos en Portfolio. Pasate a PRO o ELITE para sumar mas.' };
      return { ok: true };
    }
    if (action === 'add_alert') {
      var tipo = (currentCount || '').toLowerCase();
      if (L.alertTypes.indexOf(tipo) === -1) return { ok: false, plan: P, tipo_alerta: tipo, message: 'Tu plan ' + P + ' no incluye alertas tipo "' + tipo + '". Pasate a PRO o ELITE para activarlas.' };
      return { ok: true };
    }
    return { ok: true };
  };

  // Muestra un paywall simple cuando se intenta una accion bloqueada
  window.showPaywall = function(reason){
    var msg = reason && reason.message ? reason.message : 'Esta funcion requiere PRO o ELITE.';
    if (typeof abrirModalPlanes === 'function') {
      alert(msg + '\n\nVamos a abrir los planes para que veas las opciones.');
      try { abrirModalPlanes(); } catch(e){}
    } else {
      alert(msg + '\n\nAbri el modal de Planes para suscribirte.');
    }
  };

  // Detecta retorno desde PayPal (cuando vuelve con ?paypal=success o referrer paypal.com)
  function detectarRetornoPayPal(){
    var q = new URLSearchParams(window.location.search);
    var paypalFlag = q.get('paypal') === 'success' || q.get('subscription_id') || q.get('ba_token');
    var referrerIsPayPal = document.referrer && /paypal\.com/.test(document.referrer);
    if (paypalFlag || referrerIsPayPal) {
      console.log('[AurexGating] Retorno desde PayPal detectado. Re-leyendo plan en 8 seg para dar tiempo al webhook...');
      var notif = document.createElement('div');
      notif.style.cssText = 'position:fixed;top:20px;right:20px;background:#10b981;color:#fff;padding:14px 18px;border-radius:10px;font-size:14px;font-weight:600;z-index:99999;box-shadow:0 4px 12px rgba(0,0,0,.2)';
      notif.textContent = '✓ Procesando tu suscripcion en PayPal... esto tarda unos segundos';
      document.body.appendChild(notif);
      setTimeout(function(){
        window.loadUserPlan().then(function(p){
          notif.textContent = '✓ Tu plan ahora es: ' + p + ' — ¡bienvenido!';
          setTimeout(function(){ notif.remove(); }, 5000);
        });
      }, 8000);
      // Limpiar URL para evitar re-trigger en refresh
      if (window.history && window.history.replaceState) {
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }

  // Carga inicial al login del usuario
  document.addEventListener('DOMContentLoaded', function(){
    detectarRetornoPayPal();
    var intentos = 0;
    var interval = setInterval(function(){
      if (window._currentUser && window._currentUser.id) {
        clearInterval(interval);
        window.loadUserPlan();
      } else if (++intentos > 30) {
        clearInterval(interval);
        // Sin usuario logueado: plan = FREE
        window.aurexPlan = { plan:'FREE', limits: PLAN_LIMITS_CLIENT.FREE, loadedAt: Date.now() };
        window.applyPlanGating();
      }
```

## 2) openAddActivo NO chequea plan (app/aurex-features.js 1506-1528)
```javascript
window.openAddActivo = function(){
  // Si no hay sesión, mostrar aviso de login
  if(!window._supabase){ navTo('perfil'); return; }
  window._supabase.auth.getSession().then(function(res){
    if(!res.data || !res.data.session){
      // Mostrar mini-aviso en el portfolio y redirigir a Perfil/Login
      var cnt = document.getElementById('port-cnt');
      if(cnt){
        var old = cnt.innerHTML;
        cnt.innerHTML = '<div style="background:#1A0D00;border:1px solid var(--gold40);border-radius:12px;margin:20px 14px;padding:20px;text-align:center;">' +
          '<div style="font-size:28px;margin-bottom:8px;">🔐</div>' +
          '<div style="font-size:14px;font-weight:700;color:var(--gold);margin-bottom:6px;">'+t('port_need_account_title')+'</div>' +
          '<div style="font-size:12px;color:var(--textSec);margin-bottom:16px;">'+t('port_need_account_desc')+'</div>' +
          '<div onclick="navTo(\x27perfil\x27);authSwitchTab(\x27register\x27)" style="background:linear-gradient(135deg,var(--gold),#B8860B);color:var(--chipTextActive);font-weight:800;font-size:14px;padding:12px 24px;border-radius:10px;cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0);">'+t('port_need_account_btn')+'</div>' +
          '<div onclick="navTo(\x27perfil\x27)" style="margin-top:10px;font-size:12px;color:#58A6FF;cursor:pointer;">'+t('port_need_account_login')+'</div>' +
        '</div>' + old;
        setTimeout(function(){ cnt.innerHTML = old; }, 5000);
      }
      return;
    }
    _openAddActivoModal();
  });
};
```

## 3) addPortfolioItem postea directo a Supabase, sin gating (3021-3065)
```javascript
window.addPortfolioItem = function(simbolo, nombre, cantidad, precioCompra, tipo){
  if(!window._supabase){ console.warn('Supabase no disponible'); return; }
  window._supabase.auth.getSession().then(function(res){
    if(!res.data || !res.data.session){ console.warn('Sin sesion activa'); return; }
    var token = res.data.session.access_token;
    var userId = res.data.session.user.id;
    fetch(SUPA_URL + '/rest/v1/portfolio', {
      method: 'POST',
      headers: Object.assign({}, supaHeaders(token), {'Prefer': 'return=minimal'}),
      body: JSON.stringify({
        user_id: userId,
        simbolo: simbolo.toUpperCase(),
        nombre: nombre || simbolo,
        cantidad: parseFloat(cantidad),
        precio_compra: parseFloat(precioCompra),
        tipo: tipo || 'cripto'
      })
    })
    .then(function(r){
      if(r.ok){ loadPortfolioSupa(); }
      else { return r.text().then(function(t){ console.error('Error POST portfolio:', t); }); }
    })
    .catch(function(e){ console.error('Error agregando activo:', e); });
  });
};

// ââ ELIMINAR activo del portfolio ââ
window.deletePortfolioItem = function(id){
  if(!window._supabase) return;
  if(!confirm(t('port_confirm_eliminar'))) return;
  window._supabase.auth.getSession().then(function(res){
    if(!res.data || !res.data.session) return;
    var token = res.data.session.access_token;
    fetch(SUPA_URL + '/rest/v1/portfolio?id=eq.' + id, {
      method: 'DELETE',
      headers: supaHeaders(token)
    })
    .then(function(r){ if(r.ok) loadPortfolioSupa(); })
    .catch(function(e){ console.error('Error eliminando:', e); });
  });
};

// Inicializar portfolio cuando hay sesión
document.addEventListener('DOMContentLoaded', function(){
  setTimeout(function(){
```

## 4) wlCreateList inserta sin chequear watchlistMax (1960-1978)
```javascript
window.wlCreateList = function(){
  var nameEl = document.getElementById('wl-new-name');
  var name = nameEl ? nameEl.value.trim() : '';
  if(!name){ alert('Ingresa un nombre'); return; }
  var lists = _wlGetLists();
  var newList = { name: name, color: _wlNewColor, is_primary: _wlNewPrimary || lists.length === 0, position: lists.length };
  wlCloseCreateModal();
  _wlInsertList(newList, function(){
    if(newList.id) _wlSelectedList = newList.id;
    renderWatchCnt();
  });
};

// ─── ELIMINAR LISTA — Modal visual (idéntico a nativa) ───
window.wlDeleteList = function(listId){
  var old = document.getElementById('wl-delete-overlay'); if(old) old.remove();
  var overlay = document.createElement('div');
  overlay.id = 'wl-delete-overlay';
  overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.55);z-index:9999;display:flex;align-items:center;justify-content:center;padding:24px';
```
