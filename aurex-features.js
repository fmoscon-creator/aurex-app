(function(){var p=new URLSearchParams(window.location.search);if(p.get('resetOnboarding')==='1'){['aurex_onboarding_done','onboardingDone','aurex_onboarding','onboarding_done'].forEach(function(k){localStorage.removeItem(k);});var u=new URL(window.location.href);u.searchParams.delete('resetOnboarding');history.replaceState(null,'',u.toString());}})();
var BACKEND_URL='https://aurex-app-production.up.railway.app';
var USER_WA=localStorage.getItem('aurex_wa_numero')||'';
function saveWANumero(n){USER_WA=n;localStorage.setItem('aurex_wa_numero',n);}
var obPlan='FREE';
function obSelectPlan(p){obPlan=p;var ids={'FREE':'obpf','PRO':'obpp','ELITE':'obpe'};Object.keys(ids).forEach(function(k){var el=document.getElementById(ids[k]);if(!el)return;el.style.border=k===p?'2px solid '+(k==='PRO'?'#A78BFA':'#D4A017'):'1px solid #2E2E45';});}
function obNext(s){['obs1','obs2','obs3','obs4'].forEach(function(id){var el=document.getElementById(id);if(el)el.style.display='none';});var el=document.getElementById('obs'+s);if(el)el.style.display='flex';}
function obFinish(){var n=(document.getElementById('ob-nombre')||{}).value||'',w=(document.getElementById('ob-wa')||{}).value||'';if(n)localStorage.setItem('aurex_nombre',n);if(w){localStorage.setItem('aurex_wa_numero',w);saveWANumero(w);}localStorage.setItem('aurex_plan',obPlan);localStorage.setItem('aurex_onboarding_done','1');var ob=document.getElementById('onboarding');if(ob){ob.style.transition='opacity 0.4s';ob.style.opacity='0';setTimeout(function(){ob.style.display='none';var ph2=document.querySelector('.phone');if(ph2)ph2.style.display='flex';;},400);}setTimeout(function(){var b=document.createElement('div');b.style.cssText='position:fixed;top:60px;left:0;right:0;z-index:9999;margin:0 12px;background:linear-gradient(135deg,#16A34A,#22C55E);border-radius:12px;padding:14px 16px;color:white;font-size:14px;font-weight:600;text-align:center';b.textContent='Bienvenido'+(n?', '+n:'')+'! Aurex esta listo.';document.body.appendChild(b);setTimeout(function(){b.remove();},4000);},500);}
function initOnboarding(){if(localStorage.getItem('aurex_onboarding_done'))return;var ob=document.getElementById('onboarding');if(!ob)return;ob.style.display='block';var ph=document.querySelector('.phone');if(ph)ph.style.display='none';;var w=document.getElementById('ob-wa');if(w&&localStorage.getItem('aurex_wa_numero'))w.value=localStorage.getItem('aurex_wa_numero');var nEl=document.getElementById('ob-nombre');if(nEl&&localStorage.getItem('aurex_nombre'))nEl.value=localStorage.getItem('aurex_nombre');}
setTimeout(initOnboarding,800);
function initConstellacion(){var container=document.getElementById('ob-stars');var svg=document.getElementById('ob-clines');if(!container||!svg)return;var W=container.offsetWidth||window.innerWidth;var H=container.offsetHeight||window.innerHeight;svg.setAttribute('viewBox','0 0 '+W+' '+H);var stars=[];for(var i=0;i<28;i++){var x=Math.random()*W;var y=Math.random()*H;var size=Math.random()*2+1;var delay=Math.random()*3;var dur=Math.random()*2+1.5;stars.push({x:x,y:y});var s=document.createElement('div');s.style.cssText='position:absolute;border-radius:50%;background:#F5C842;width:'+size+'px;height:'+size+'px;left:'+x+'px;top:'+y+'px;animation:starPulse '+dur+'s '+delay+'s ease-in-out infinite;opacity:0.6;';container.appendChild(s);}for(var a=0;a<stars.length;a++){for(var b=a+1;b<stars.length;b++){var dx=stars[a].x-stars[b].x;var dy=stars[a].y-stars[b].y;var dist=Math.sqrt(dx*dx+dy*dy);if(dist<90){var op=(1-dist/90)*0.25;var l=document.createElementNS('http://www.w3.org/2000/svg','line');l.setAttribute('x1',stars[a].x);l.setAttribute('y1',stars[a].y);l.setAttribute('x2',stars[b].x);l.setAttribute('y2',stars[b].y);l.setAttribute('stroke','#D4A017');l.setAttribute('stroke-width','0.5');l.setAttribute('opacity',op);svg.appendChild(l);}}}};
setTimeout(initConstellacion,900);
var YF_MAP={'AAPL':{tab:'acciones',pais:'usa',s:'AAPL'},'NVDA':{tab:'acciones',pais:'usa',s:'NVDA'},'MSFT':{tab:'acciones',pais:'usa',s:'MSFT'},'TSLA':{tab:'acciones',pais:'usa',s:'TSLA'},'META':{tab:'acciones',pais:'usa',s:'META'},'GOOGL':{tab:'acciones',pais:'usa',s:'GOOGL'},'AMZN':{tab:'acciones',pais:'usa',s:'AMZN'},'GGAL':{tab:'acciones',pais:'arg',s:'GGAL'},'YPF':{tab:'acciones',pais:'arg',s:'YPF'},'VALE':{tab:'acciones',pais:'br',s:'VALE3'},'PBR':{tab:'acciones',pais:'br',s:'PETR4'},'SPY':{tab:'etf',s:'SPY'},'QQQ':{tab:'etf',s:'QQQ'},'GLD':{tab:'etf',s:'GLD'},'GC=F':{tab:'comm',s:'XAU'},'SI=F':{tab:'comm',s:'XAG'},'CL=F':{tab:'comm',s:'WTI'},'ES=F':{tab:'futuros',s:'ES1!'},'NQ=F':{tab:'futuros',s:'NQ1!'},'EURUSD=X':{tab:'divisas',s:'EUR/USD'}}
// === DATA: items de cada tab de Mercados ===
var DATA={
  cripto: [
    {s:'BTC',n:'Bitcoin',      tab:'cripto'},
    {s:'ETH',n:'Ethereum',     tab:'cripto'},
    {s:'SOL',n:'Solana',       tab:'cripto'},
    {s:'BNB',n:'BNB',          tab:'cripto'},
    {s:'XRP',n:'XRP',          tab:'cripto'},
    {s:'ADA',n:'Cardano',      tab:'cripto'},
    {s:'AVAX',n:'Avalanche',   tab:'cripto'},
    {s:'DOT',n:'Polkadot',     tab:'cripto'},
    {s:'LINK',n:'Chainlink',   tab:'cripto'},
    {s:'MATIC',n:'Polygon',    tab:'cripto'}
  ],
  stable: [
    {s:'USDT',n:'Tether',      tab:'stable'},
    {s:'USDC',n:'USD Coin',    tab:'stable'},
    {s:'BUSD',n:'BUSD',        tab:'stable'}
  ],
  acciones: {
    usa: [
      {s:'AAPL',n:'Apple'},
      {s:'NVDA',n:'NVIDIA'},
      {s:'MSFT',n:'Microsoft'},
      {s:'TSLA',n:'Tesla'},
      {s:'META',n:'Meta'},
      {s:'GOOGL',n:'Alphabet'},
      {s:'AMZN',n:'Amazon'}
    ],
    arg: [
      {s:'GGAL',n:'Galicia'},
      {s:'YPF',n:'YPF'},
      {s:'BMA',n:'Macro'}
    ]
  },
  etf:      [{s:'SPY',n:'S&P 500'},{s:'QQQ',n:'Nasdaq'},{s:'GLD',n:'Gold ETF'}],
  comm:     [{s:'GC=F',n:'Gold'},{s:'CL=F',n:'Oil WTI'},{s:'XAG',n:'Silver'}],
  futuros:  [{s:'ES=F',n:'S&P Fut'},{s:'NQ=F',n:'Nasdaq Fut'}],
  divisas:  [{s:'EURUSD=X',n:'EUR/USD'}]
};
var _activeTab='cripto', _activePais='usa';

// === RENDER: dibuja los items en #cnt ===
function renderTab(tab, pais){
  _activeTab=tab; _activePais=pais||'usa';
  var cnt=document.getElementById('cnt');
  if(!cnt) return;
  var arr = tab==='acciones' ? (DATA.acciones[pais]||DATA.acciones.usa) : (DATA[tab]||[]);
  cnt.innerHTML='';
  arr.forEach(function(item){
    var row=document.createElement('div');
    row.className='item-row'; row.id='row-'+item.s;
    row.style.cssText='display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #21262D;cursor:pointer;';
    row.innerHTML='<div style="display:flex;flex-direction:column;"><span style="color:#E6EDF3;font-weight:600;font-size:14px;">'+item.s+'</span><span style="color:#8B949E;font-size:11px;">'+item.n+'</span></div>'
      +'<div style="text-align:right;display:flex;flex-direction:column;align-items:flex-end;"><span id="p-'+item.s+'" style="color:#E6EDF3;font-size:14px;font-weight:600;">—</span><span id="c-'+item.s+'" style="font-size:11px;color:#8B949E;">—</span></div>';
    cnt.appendChild(row);
  });
  // Lanzar fetch de datos para este tab
  if(tab==='cripto'||tab==='stable') fetchBinance(tab);
  else fetchYahoo(tab, pais);
}

// === BINANCE: cripto y stable ===
function fetchBinance(tab){
  var arr=DATA[tab]||[];
  var syms=arr.map(function(x){return '"'+x.s+'USDT"';}).join(',');
  fetch('https://api.binance.com/api/v3/ticker/24hr?symbols=['+syms+']')
    .then(function(r){return r.json();})
    .then(function(list){
      list.forEach(function(t){
        var sym=t.symbol.replace('USDT','');
        var price=parseFloat(t.lastPrice);
        var pct=parseFloat(t.priceChangePercent);
        var pel=document.getElementById('p-'+sym);
        var cel=document.getElementById('c-'+sym);
        if(pel) pel.textContent=price>=1000?'$'+Math.round(price).toLocaleString('en'):(price>=1?'$'+price.toFixed(2):'$'+price.toFixed(4));
        if(cel){ cel.textContent=(pct>=0?'+':'')+pct.toFixed(2)+'%'; cel.style.color=pct>=0?'#3FB950':'#F85149'; }
      });
    }).catch(function(){});
}

// === YAHOO: acciones, etf, comm, futuros, divisas ===
function fetchYahoo(tab,pais){
  var arr=tab==='acciones'?(DATA.acciones[pais]||DATA.acciones.usa):(DATA[tab]||[]);
  Promise.all(arr.map(function(item){
    return fetch('https://corsproxy.io/?'+encodeURIComponent('https://query1.finance.yahoo.com/v8/finance/chart/'+item.s+'?interval=1d&range=1d'))
      .then(function(r){return r.json();})
      .then(function(d){
        var meta=d.chart&&d.chart.result&&d.chart.result[0]?d.chart.result[0].meta:null;
        if(!meta)return;
        var price=meta.regularMarketPrice,pct=meta.regularMarketChangePercent||0;
        var pel=document.getElementById('p-'+item.s);
        var cel=document.getElementById('c-'+item.s);
        if(pel)pel.textContent=price>=1000?'$'+Math.round(price).toLocaleString('en'):(price>=1?'$'+price.toFixed(2):'$'+price.toFixed(4));
        if(cel){cel.textContent=(pct>=0?'+':'')+pct.toFixed(2)+'%';cel.style.color=pct>=0?'#3FB950':'#F85149';}
      }).catch(function(){});
  }));
}

// === sw: cambio de tab en Mercados ===
window.sw=function(tab,el){
  document.querySelectorAll('#screen-mercados .tab').forEach(function(t){t.classList.remove('on');});
  if(el) el.classList.add('on');
  var pr=document.getElementById('pais-row');
  if(pr) pr.style.display=tab==='acciones'?'flex':'none';
  renderTab(tab, _activePais);
};

// === swPais: cambio de país en acciones ===
window.swPais=function(pais,el){
  document.querySelectorAll('#pais-row .tab').forEach(function(t){t.classList.remove('on');});
  if(el) el.classList.add('on');
  renderTab('acciones', pais);
};

;
function updateItemRT(tab,pais,sk,price,pct){var arr=tab==='acciones'?DATA.acciones[pais]||[]:DATA[tab]||[];var it=arr.find(function(x){return x.s===sk;});if(!it||!price)return;it.p=price>=1000?'$'+Math.round(price).toLocaleString('en'):price>=1?'$'+price.toFixed(2):'$'+price.toFixed(4);it.c=(pct>=0?'+':'')+pct.toFixed(2)+'%';it.up=pct>=0?1:0;}

function yahooFinanceRT(){}

renderTab(_activeTab||'cripto');setInterval(function(){ if(_activeTab==='cripto'||_activeTab==='stable') fetchBinance(_activeTab); else fetchYahoo(_activeTab,_activePais); },30000);
var swReg=null;
function initPushNotifications(){if(!('serviceWorker' in navigator))return;navigator.serviceWorker.register('/aurex-app/service-worker.js').then(function(r){swReg=r;if(Notification.permission==='granted')updateNotifButton(true);}).catch(function(){});}
function requestPushPermission(){if(!('Notification' in window)){alert('Agrega Aurex a pantalla de inicio desde Safari.');return;}if(Notification.permission==='granted'){showTestNotification();return;}Notification.requestPermission().then(function(p){if(p==='granted'){updateNotifButton(true);showTestNotification();}}).catch(function(){});}
function showTestNotification(){if(swReg&&Notification.permission==='granted')swReg.showNotification('Aurex - Alertas Activas',{body:'Recibirás alertas de precio.',icon:'https://fmoscon-creator.github.io/aurex-app/icon-192.png',tag:'aurex-test'});}
function showAlertNotification(s,p,o){if(swReg&&Notification.permission==='granted')swReg.showNotification('ALERTA - '+s,{body:'$'+p.toLocaleString('en')+' obj:$'+o.toLocaleString('en'),icon:'https://fmoscon-creator.github.io/aurex-app/icon-192.png',tag:'aurex-'+s,renotify:true});}
function updateNotifButton(on){var b=document.getElementById('notif-btn');if(!b)return;b.style.background=on?'#16A34A':'#D4A017';b.textContent=on?'Activas':'Activar';}
initPushNotifications();
function checkAlertasLocal(){if(typeof ALERTAS==='undefined')return;ALERTAS.forEach(function(a){if(!a.activa)return;var actual=typeof getAlertActual==='function'?getAlertActual(a):null;if(!actual)return;if((a.cond==='mayor'&&actual>=a.precio)||(a.cond==='menor'&&actual<=a.precio)){if(!a._disparada){a._disparada=true;var b=document.createElement('div');b.style.cssText='position:fixed;top:60px;left:0;right:0;z-index:9999;margin:0 12px;background:#16A34A;border-radius:12px;padding:12px 16px;color:white;font-size:13px;font-weight:600';b.textContent='ALERTA - '+a.s;document.body.appendChild(b);setTimeout(function(){b.remove();},5000);if(typeof showAlertNotification==='function')showAlertNotification(a.s,actual,a.precio);}}});}
setInterval(checkAlertasLocal,30000);
fetch(BACKEND_URL+'/').then(function(r){return r.json();}).then(function(d){if(d.status==='ok')console.log('Backend v'+d.version+' OK');}).catch(function(){});

// ============================================================
// === CONVERSOR DE MONEDAS — Binance + fallback fiat =========
// ============================================================

window._pcPrices = {};

// Abrir modal
window.openPortConversor = function(){
  var modal = document.getElementById('port-conv-modal');
  if(!modal) return;
  modal.style.display = 'flex';
  pcLoadPrices();
};

// Cerrar modal (nombre que usa el HTML)
window.closePortConvModal = function(){
  var modal = document.getElementById('port-conv-modal');
  if(modal) modal.style.display = 'none';
};

// Cargar precios reales desde Binance
function pcLoadPrices(){
  var rateEl = document.getElementById('pc-rate');
  if(rateEl) rateEl.textContent = 'Obteniendo precios...';

  // Binance: BTC, ETH, SOL, USDT en USDT (= USD)
  fetch('https://api.binance.com/api/v3/ticker/price?symbols=%5B%22BTCUSDT%22%2C%22ETHUSDT%22%2C%22SOLUSDT%22%5D')
    .then(function(r){ return r.json(); })
    .then(function(list){
      list.forEach(function(t){
        var sym = t.symbol.replace('USDT','');
        window._pcPrices[sym] = parseFloat(t.price);
      });
      window._pcPrices['USDT'] = 1;
      window._pcPrices['USD']  = 1;
      // Tipos de cambio fiat (actualizables)
      window._pcPrices['ARS']    = 1195;  // Blue aprox
      window._pcPrices['ARS_OF'] = 1060;  // Oficial aprox
      window._pcPrices['EUR']    = 0.92;
      window._pcPrices['BRL']    = 5.70;
      if(rateEl) rateEl.textContent = 'Precios en vivo via Binance';
      updatePortConv();
    })
    .catch(function(){
      // Fallback offline
      window._pcPrices = { BTC:66000, ETH:2000, SOL:83, USDT:1, USD:1, ARS:1195, ARS_OF:1060, EUR:0.92, BRL:5.70 };
      if(rateEl) rateEl.textContent = 'Precios sin conexion (aprox)';
      updatePortConv();
    });
}

// Calcular y mostrar resultado
window.updatePortConv = function(){
  var amtEl  = document.getElementById('pc-amount');
  var fromEl = document.getElementById('pc-from');
  var toEl   = document.getElementById('pc-to');
  var resEl  = document.getElementById('pc-result');
  var rateEl = document.getElementById('pc-rate');
  if(!amtEl || !fromEl || !toEl || !resEl) return;

  var amt  = parseFloat(amtEl.value);
  if(isNaN(amt) || amt < 0) { resEl.textContent = '—'; return; }
  var from = fromEl.value;
  var to   = toEl.value;
  var p    = window._pcPrices;
  if(!p[from] || !p[to]) { resEl.textContent = 'Cargando...'; return; }

  var FIAT  = ['USD','ARS','ARS_OF','EUR','BRL','USDT'];
  var isCrypto = function(s){ return FIAT.indexOf(s) === -1; };

  // Todo pasa por USD como pivote
  var amtUSD;
  if(from === 'USD' || from === 'USDT'){
    amtUSD = amt;
  } else if(isCrypto(from)){
    amtUSD = amt * p[from];          // Ej: 2 ETH * 2000 = 4000 USD
  } else {
    amtUSD = amt / p[from];          // Ej: 1000 ARS / 1195 = 0.837 USD
  }

  var result;
  if(to === 'USD' || to === 'USDT'){
    result = amtUSD;
  } else if(isCrypto(to)){
    result = amtUSD / p[to];         // Ej: 4000 / 66000 = 0.0606 BTC
  } else {
    result = amtUSD * p[to];         // Ej: 0.837 * 5.70 = 4.77 BRL
  }

  // Formatear
  var fmt;
  if(isCrypto(to)){
    fmt = result.toFixed(8).replace(/\.?0+$/, '') + ' ' + to;
  } else {
    fmt = result.toLocaleString('es-AR',{minimumFractionDigits:2,maximumFractionDigits:2}) + ' ' + to;
  }
  resEl.textContent = fmt;

  // Tasa de referencia: 1 FROM = ? TO
  var oneUSD;
  if(from === 'USD' || from === 'USDT'){ oneUSD = 1; }
  else if(isCrypto(from)){ oneUSD = p[from]; }
  else { oneUSD = 1 / p[from]; }

  var oneTo;
  if(to === 'USD' || to === 'USDT'){ oneTo = oneUSD; }
  else if(isCrypto(to)){ oneTo = oneUSD / p[to]; }
  else { oneTo = oneUSD * p[to]; }

  var fmtRate;
  if(isCrypto(to)){
    fmtRate = oneTo.toFixed(8).replace(/\.?0+$/,'');
  } else {
    fmtRate = oneTo.toLocaleString('es-AR',{minimumFractionDigits:2,maximumFractionDigits:2});
  }
  if(rateEl) rateEl.textContent = '1 ' + from + ' = ' + fmtRate + ' ' + to;
};

// Intercambiar monedas
window.swapPortConv = function(){
  var fromEl = document.getElementById('pc-from');
  var toEl   = document.getElementById('pc-to');
  if(!fromEl || !toEl) return;
  var tmp = fromEl.value;
  fromEl.value = toEl.value;
  toEl.value = tmp;
  updatePortConv();
};


// ============================================================
// === PORTFOLIO PERSISTENTE — Supabase ========================
// ============================================================

var SUPA_URL = 'https://dklljnfhlzmfsfmxrpie.supabase.co';
var SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrbGxqbmZobHptZnNmbXhycGllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1MzI3NDcsImV4cCI6MjA5MDEwODc0N30.FxegnijMue_K9jPqzY7gwNABaVpyyB6Io_ZkWLMSX9k';

// Headers comunes para Supabase
function supaHeaders(token){
  var h = {
    'apikey': SUPA_KEY,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  };
  if(token) h['Authorization'] = 'Bearer ' + token;
  else h['Authorization'] = 'Bearer ' + SUPA_KEY;
  return h;
}

// Obtener el token de sesión actual del usuario
function getSupaToken(){
  try {
    var sb = window._supabase || (window.supabase && window.supabase.createClient ? null : null);
    if(window._supabaseClient) return window._supabaseClient.auth.getSession();
    return Promise.resolve({ data: { session: null } });
  } catch(e) { return Promise.resolve({ data: { session: null } }); }
}

// ── CARGAR portfolio del usuario desde Supabase ──
window.loadPortfolioSupa = function(){
  var session = null;
  try {
    // Intentar obtener sesión del cliente Supabase global
    if(window._supabaseClient){
      window._supabaseClient.auth.getSession().then(function(res){
        if(res.data && res.data.session){
          session = res.data.session;
          _fetchPortfolio(session.access_token, session.user.id);
        } else {
          _renderPortfolioEmpty();
        }
      });
    } else {
      _renderPortfolioEmpty();
    }
  } catch(e) { _renderPortfolioEmpty(); }
};

function _fetchPortfolio(token, userId){
  fetch(SUPA_URL + '/rest/v1/portfolio?user_id=eq.' + userId + '&order=created_at.desc', {
    headers: supaHeaders(token)
  })
  .then(function(r){ return r.json(); })
  .then(function(items){ _renderPortfolioItems(items); })
  .catch(function(){ _renderPortfolioEmpty(); });
}

function _renderPortfolioEmpty(){
  var list = document.getElementById('port-list');
  if(list) list.innerHTML = '<div style="color:#8B949E;text-align:center;padding:40px 20px;font-size:13px;">Sin activos. Tocá + Agregar para comenzar.</div>';
  _updateTotals([]);
}

function _renderPortfolioItems(items){
  var list = document.getElementById('port-list');
  if(!list) return;
  if(!items || items.length === 0){ _renderPortfolioEmpty(); return; }
  
  list.innerHTML = items.map(function(item){
    var precio = window._pcPrices && window._pcPrices[item.simbolo] ? window._pcPrices[item.simbolo] : 0;
    var valor = precio > 0 ? (item.cantidad * precio) : (item.cantidad * item.precio_compra);
    var pnl = precio > 0 ? ((precio - item.precio_compra) / item.precio_compra * 100) : 0;
    var pnlColor = pnl >= 0 ? '#00D4AA' : '#FF4444';
    var pnlSign = pnl >= 0 ? '+' : '';
    return '<div style="display:flex;justify-content:space-between;align-items:center;padding:14px 16px;border-bottom:1px solid #1C2128;">' +
      '<div><div style="font-weight:700;color:#fff;font-size:14px;">' + item.simbolo + '</div>' +
      '<div style="font-size:11px;color:#8B949E;">' + item.cantidad + ' u. @ $' + item.precio_compra.toLocaleString('es-AR',{minimumFractionDigits:2,maximumFractionDigits:2}) + '</div></div>' +
      '<div style="text-align:right;">' +
      '<div style="font-size:14px;font-weight:700;color:#fff;">$' + valor.toLocaleString('es-AR',{minimumFractionDigits:2,maximumFractionDigits:2}) + '</div>' +
      '<div style="font-size:11px;color:' + pnlColor + ';">' + pnlSign + pnl.toFixed(2) + '%</div></div>' +
      '<button onclick="deletePortfolioItem('' + item.id + '')" style="background:none;border:none;color:#8B949E;font-size:18px;cursor:pointer;padding:4px 8px;">×</button>' +
      '</div>';
  }).join('');
  _updateTotals(items);
}

function _updateTotals(items){
  var total = items.reduce(function(acc, item){
    var precio = window._pcPrices && window._pcPrices[item.simbolo] ? window._pcPrices[item.simbolo] : item.precio_compra;
    return acc + (item.cantidad * precio);
  }, 0);
  var totalEl = document.querySelector('.port-total-val, [class*="total"]');
  var actEl = document.getElementById('port-activos-count');
  if(totalEl) totalEl.textContent = '$' + total.toLocaleString('es-AR',{minimumFractionDigits:2,maximumFractionDigits:2});
  if(actEl) actEl.textContent = items.length;
}

// ── AGREGAR activo al portfolio ──
window.addPortfolioItem = function(simbolo, nombre, cantidad, precioCompra, tipo){
  if(!window._supabaseClient){ alert('Necesitás iniciar sesión para guardar activos.'); return; }
  window._supabaseClient.auth.getSession().then(function(res){
    if(!res.data || !res.data.session){ alert('Iniciá sesión primero.'); return; }
    var token = res.data.session.access_token;
    var userId = res.data.session.user.id;
    fetch(SUPA_URL + '/rest/v1/portfolio', {
      method: 'POST',
      headers: supaHeaders(token),
      body: JSON.stringify({
        user_id: userId,
        simbolo: simbolo.toUpperCase(),
        nombre: nombre,
        cantidad: parseFloat(cantidad),
        precio_compra: parseFloat(precioCompra),
        tipo: tipo || 'cripto'
      })
    })
    .then(function(r){ return r.json(); })
    .then(function(){ loadPortfolioSupa(); })
    .catch(function(e){ console.error('Error agregando activo:', e); });
  });
};

// ── ELIMINAR activo del portfolio ──
window.deletePortfolioItem = function(id){
  if(!window._supabaseClient) return;
  if(!confirm('¿Eliminar este activo?')) return;
  window._supabaseClient.auth.getSession().then(function(res){
    if(!res.data || !res.data.session) return;
    var token = res.data.session.access_token;
    fetch(SUPA_URL + '/rest/v1/portfolio?id=eq.' + id, {
      method: 'DELETE',
      headers: supaHeaders(token)
    })
    .then(function(){ loadPortfolioSupa(); })
    .catch(function(e){ console.error('Error eliminando:', e); });
  });
};

// Cargar portfolio cuando el usuario se loguea
document.addEventListener('DOMContentLoaded', function(){
  setTimeout(function(){
    if(window._supabaseClient){
      window._supabaseClient.auth.onAuthStateChange(function(event, session){
        if(session) { window._supabaseClient = window._supabaseClient; loadPortfolioSupa(); }
      });
      loadPortfolioSupa();
    }
  }, 1000);
});
