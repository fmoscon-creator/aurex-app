
// Aurex Features v2.0 — Backend + Yahoo RT + Push + Onboarding

// ── BACKEND ──────────────────────────────────────────────────
var BACKEND_URL = 'https://aurex-app-production.up.railway.app';
var USER_WA = localStorage.getItem('aurex_wa_numero') || '';

function saveWANumero(n) {
  USER_WA = n;
  localStorage.setItem('aurex_wa_numero', n);
}

// ── WHATSAPP ALERTA ──────────────────────────────────────────
function notificarAlertaWA(a, precio) {
  if (!USER_WA) return;
  var s = a.s || a.simbolo;
  var obj = a.precio || a.valor_objetivo;
  var ts = new Date().toLocaleString('es-AR', {timeZone:'America/Argentina/Buenos_Aires'});
  fetch(BACKEND_URL + '/api/test-whatsapp', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      numero: USER_WA,
      mensaje: (precio >= obj ? 'VERDE' : 'ROJO') + ' ALERTA AUREX - ' + s +
        '\n$' + precio.toLocaleString('en') + '  objetivo: $' + obj.toLocaleString('en') +
        '\n\n' + ts + '\n- Aurex IA'
    })
  }).catch(function(){});
}

// ── CHECK ALERTAS LOCAL ──────────────────────────────────────
function checkAlertasLocal() {
  if (typeof ALERTAS === 'undefined') return;
  ALERTAS.forEach(function(a) {
    if (!a.activa) return;
    var actual = typeof getAlertActual === 'function' ? getAlertActual(a) : null;
    if (!actual) return;
    var ok = (a.cond === 'mayor' && actual >= a.precio) || (a.cond === 'menor' && actual <= a.precio);
    if (ok && !a._disparada) {
      a._disparada = true;
      var b = document.createElement('div');
      b.style.cssText = 'position:fixed;top:60px;left:0;right:0;z-index:9999;margin:0 12px;background:#16A34A;border-radius:12px;padding:12px 16px;color:white;font-size:13px;font-weight:600;box-shadow:0 4px 20px rgba(0,0,0,0.5)';
      b.textContent = 'ALERTA - ' + a.s + ' llego a $' + actual.toLocaleString('en');
      document.body.appendChild(b);
      setTimeout(function(){ b.remove(); }, 5000);
      showAlertNotification(a.s, actual, a.precio);
      if (a.canales && a.canales.includes('whatsapp')) notificarAlertaWA(a, actual);
    }
  });
}
setInterval(checkAlertasLocal, 30000);

// ── YAHOO FINANCE RT ─────────────────────────────────────────
var YF_MAP = {
  'AAPL':{tab:'acciones',pais:'usa',s:'AAPL'},
  'NVDA':{tab:'acciones',pais:'usa',s:'NVDA'},
  'MSFT':{tab:'acciones',pais:'usa',s:'MSFT'},
  'TSLA':{tab:'acciones',pais:'usa',s:'TSLA'},
  'META':{tab:'acciones',pais:'usa',s:'META'},
  'GOOGL':{tab:'acciones',pais:'usa',s:'GOOGL'},
  'AMZN':{tab:'acciones',pais:'usa',s:'AMZN'},
  'GGAL':{tab:'acciones',pais:'arg',s:'GGAL'},
  'YPF':{tab:'acciones',pais:'arg',s:'YPF'},
  'VALE':{tab:'acciones',pais:'br',s:'VALE3'},
  'PBR':{tab:'acciones',pais:'br',s:'PETR4'},
  'SPY':{tab:'etf',s:'SPY'},
  'QQQ':{tab:'etf',s:'QQQ'},
  'GLD':{tab:'etf',s:'GLD'},
  'GC=F':{tab:'comm',s:'XAU'},
  'SI=F':{tab:'comm',s:'XAG'},
  'CL=F':{tab:'comm',s:'WTI'},
  'ES=F':{tab:'futuros',s:'ES1!'},
  'NQ=F':{tab:'futuros',s:'NQ1!'},
  'EURUSD=X':{tab:'divisas',s:'EUR/USD'},
  '^GSPC':{tab:'acciones',pais:'usa',s:'SPX'},
  '^IXIC':{tab:'acciones',pais:'usa',s:'NDX'}
};

function updateItemRT(tab, pais, sk, price, pct) {
  var arr = tab === 'acciones' ? (DATA.acciones[pais] || []) : (DATA[tab] || []);
  var it = arr.find(function(x){ return x.s === sk; });
  if (!it || !price) return;
  if (price >= 1000) it.p = '$' + Math.round(price).toLocaleString('en');
  else if (price >= 1) it.p = '$' + price.toFixed(2);
  else it.p = '$' + price.toFixed(4);
  it.c = (pct >= 0 ? '+' : '') + pct.toFixed(2) + '%';
  it.up = pct >= 0 ? 1 : 0;
  it._rt = true;
}

function yahooFinanceRT() {
  var syms = Object.keys(YF_MAP).join(',');
  var url = 'https://query1.finance.yahoo.com/v7/finance/quote?symbols=' + encodeURIComponent(syms) + '&fields=regularMarketPrice,regularMarketChangePercent';
  fetch(url).then(function(r){ return r.json(); }).then(function(d){
    var q = (d.quoteResponse && d.quoteResponse.result) || [];
    q.forEach(function(x){
      var m = YF_MAP[x.symbol];
      if (m) updateItemRT(m.tab, m.pais, m.s, x.regularMarketPrice, x.regularMarketChangePercent);
    });
    if (q.length) {
      if (typeof render === 'function') render();
      if (typeof renderSumrow === 'function') renderSumrow();
      console.log('RT Yahoo: ' + q.length + ' activos actualizados');
    }
  }).catch(function(){
    fetch('https://corsproxy.io/?' + encodeURIComponent(url)).then(function(r){ return r.json(); }).then(function(d){
      var q = (d.quoteResponse && d.quoteResponse.result) || [];
      q.forEach(function(x){
        var m = YF_MAP[x.symbol];
        if (m) updateItemRT(m.tab, m.pais, m.s, x.regularMarketPrice, x.regularMarketChangePercent);
      });
      if (q.length) { if (typeof render === 'function') render(); if (typeof renderSumrow === 'function') renderSumrow(); }
    }).catch(function(){});
  });
}
yahooFinanceRT();
setInterval(yahooFinanceRT, 20000);

// ── PUSH NOTIFICATIONS ───────────────────────────────────────
var swReg = null;

function initPushNotifications() {
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.register('/aurex-app/service-worker.js').then(function(reg){
    swReg = reg;
    console.log('SW registrado OK');
    if (Notification.permission === 'granted') updateNotifButton(true);
  }).catch(function(){});
}

function requestPushPermission() {
  if (!('Notification' in window)) {
    alert('Agrega Aurex a tu pantalla de inicio desde Safari para activar notificaciones push.');
    return;
  }
  if (Notification.permission === 'granted') { showTestNotification(); return; }
  Notification.requestPermission().then(function(p){
    if (p === 'granted') { updateNotifButton(true); showTestNotification(); }
    else alert('Para activar: Ajustes > Safari > Notificaciones > Aurex');
  }).catch(function(){
    alert('Para push en iPhone:\n1. Safari > Compartir > Agregar a pantalla de inicio\n2. Abri desde el icono\n3. Activa notificaciones');
  });
}

function showTestNotification() {
  if (swReg && Notification.permission === 'granted') {
    swReg.showNotification('Aurex - Notificaciones Activas', {
      body: 'Recibiras alertas cuando tus objetivos se cumplan.',
      icon: 'https://fmoscon-creator.github.io/aurex-app/icon-192.png',
      tag: 'aurex-test'
    });
  }
}

function showAlertNotification(s, precio, obj) {
  if (swReg && Notification.permission === 'granted') {
    swReg.showNotification('ALERTA - ' + s, {
      body: '$' + precio.toLocaleString('en') + '  objetivo: $' + obj.toLocaleString('en'),
      icon: 'https://fmoscon-creator.github.io/aurex-app/icon-192.png',
      tag: 'aurex-' + s,
      renotify: true
    });
  }
}

function updateNotifButton(on) {
  var b = document.getElementById('notif-btn');
  if (!b) return;
  b.style.background = on ? '#16A34A' : '#D4A017';
  b.textContent = on ? 'Activas' : 'Activar';
}

initPushNotifications();

// Backend health
fetch(BACKEND_URL + '/').then(function(r){ return r.json(); }).then(function(d){
  if (d.status === 'ok') console.log('Backend v' + d.version + ' OK');
}).catch(function(){});

// ── ONBOARDING ───────────────────────────────────────────────
var obPlan = 'FREE';

function obSelectPlan(p) {
  obPlan = p;
  ['free','pro','elite'].forEach(function(x){
    var el = document.getElementById('ob-plan-' + x);
    if (!el) return;
    el.style.border = x === p.toLowerCase()
      ? '2px solid ' + (x === 'pro' ? '#A78BFA' : '#D4A017')
      : '1px solid #2E2E45';
  });
}

function obNext(s) {
  document.querySelectorAll('.ob-step').forEach(function(el){ el.style.display = 'none'; });
  var el = document.getElementById('ob-step-' + s);
  if (el) el.style.display = 'flex';
}

function obFinish() {
  var nombre = (document.getElementById('ob-nombre') || {}).value || '';
  var wa = (document.getElementById('ob-wa') || {}).value || '';
  if (nombre) localStorage.setItem('aurex_nombre', nombre);
  if (wa) { localStorage.setItem('aurex_wa_numero', wa); saveWANumero(wa); }
  localStorage.setItem('aurex_plan', obPlan);
  localStorage.setItem('aurex_onboarding_done', '1');
  var ob = document.getElementById('onboarding');
  ob.style.transition = 'opacity 0.4s';
  ob.style.opacity = '0';
  setTimeout(function(){ ob.style.display = 'none'; }, 400);
  setTimeout(function(){
    var b = document.createElement('div');
    b.style.cssText = 'position:fixed;top:60px;left:0;right:0;z-index:9999;margin:0 12px;background:linear-gradient(135deg,#16A34A,#22C55E);border-radius:12px;padding:14px 16px;color:white;font-size:14px;font-weight:600;box-shadow:0 4px 20px rgba(0,0,0,0.5);text-align:center';
    b.textContent = 'Bienvenido' + (nombre ? ', ' + nombre : '') + '! Aurex esta listo.';
    document.body.appendChild(b);
    setTimeout(function(){ b.remove(); }, 4000);
  }, 500);
}

function initOnboarding() {
  if (localStorage.getItem('aurex_onboarding_done')) return;
  var ob = document.getElementById('onboarding');
  if (!ob) return;
  ob.style.display = 'block';
  var w = document.getElementById('ob-wa');
  if (w && localStorage.getItem('aurex_wa_numero')) w.value = localStorage.getItem('aurex_wa_numero');
  var n = document.getElementById('ob-nombre');
  if (n && localStorage.getItem('aurex_nombre')) n.value = localStorage.getItem('aurex_nombre');
}

setTimeout(initOnboarding, 600);
