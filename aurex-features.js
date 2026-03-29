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
    {s:'DAI',n:'Dai',           tab:'stable'}
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
  etf:      [{s:'SPY',n:'S&P 500'},{s:'QQQ',n:'Nasdaq'},{s:'GLD',n:'Gold ETF'},{s:'TLT',n:'Bono 20Y US'},{s:'IEF',n:'Bono 7-10Y'},{s:'VTI',n:'Total Mkt'}],
  comm:     [{s:'GC=F',n:'Oro'},{s:'CL=F',n:'Petróleo'},{s:'SI=F',n:'Plata'},{s:'NG=F',n:'Gas Natural'},{s:'HG=F',n:'Cobre'}],
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
  var stableFixed={USDT:1};
  if(stableFixed[arr[0]&&arr[0].s]){
    // Stables especiales
    arr.forEach(function(item){
      var pel=document.getElementById('p-'+item.s);
      var cel=document.getElementById('c-'+item.s);
      if(item.s==='USDT'||stableFixed[item.s]){if(pel)pel.textContent='$1.0000';if(cel){cel.textContent='+0.00%';cel.style.color='#8B949E';}return;}
      fetch('https://api.binance.com/api/v3/ticker/24hr?symbol='+item.s+'USDT').then(function(r){return r.json();}).then(function(t){var pr=parseFloat(t.lastPrice);var pc=parseFloat(t.priceChangePercent)||0;if(pel)pel.textContent='$'+pr.toFixed(4);if(cel){cel.textContent=(pc>=0?'+':'')+pc.toFixed(3)+'%';cel.style.color=pc>=0?'#3FB950':'#F85149';}}).catch(function(){});
    });
    return;
  }
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
    return fetch('https://corsproxy.io/?'+encodeURIComponent('https://query1.finance.yahoo.com/v8/finance/chart/'+item.s+'?interval=1d&range=2d'))
      .then(function(r){return r.json();})
      .then(function(d){
        var meta=d.chart&&d.chart.result&&d.chart.result[0]?d.chart.result[0].meta:null;
        if(!meta)return;
        var price=meta.regularMarketPrice;if(!price)return;
        var prevClose=meta.chartPreviousClose||meta.previousClose||price;
        var pct=prevClose>0?((price-prevClose)/prevClose*100):0;
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
    if(window._supabase) return window._supabase.auth.getSession();
    return Promise.resolve({ data: { session: null } });
  } catch(e) { return Promise.resolve({ data: { session: null } }); }
}

// ── CARGAR portfolio del usuario desde Supabase ──
window.loadPortfolioSupa = function(){
  try {
    if(window._supabase){
      window._supabase.auth.getSession().then(function(res){
        if(res.data && res.data.session){
          _fetchPortfolio(res.data.session.access_token, res.data.session.user.id);
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
  .then(function(items){
    if(!items || items.length===0){ _renderPortfolioEmpty(); return; }
    // Primero renderizar con precios de cache
    _renderPortfolioItems(items);
    // Luego buscar precios frescos para los símbolos del portfolio
    _refreshPortPrices(items);
  })
  .catch(function(){ _renderPortfolioEmpty(); });
}

function _refreshPortPrices(items){
  if(!items || items.length===0) return;
  var syms = items.map(function(i){ return i.simbolo; });
  // Separar cripto (Binance) de Yahoo
  var CRIPTO = ["BTC","ETH","SOL","BNB","XRP","ADA","AVAX","DOT","LINK","MATIC","USDT","USDC"];
  var cryptoSyms = syms.filter(function(s){ return CRIPTO.indexOf(s)>=0; });
  var yahooSyms = syms.filter(function(s){ return CRIPTO.indexOf(s)<0; });
  var pending = cryptoSyms.length + yahooSyms.length;
  if(pending===0){ _renderPortfolioItems(items); return; }
  function done(){ pending--; if(pending<=0) _renderPortfolioItems(items); }
  // Binance
  cryptoSyms.forEach(function(sym){
    var pair = sym==="USDT"||sym==="USDC" ? sym+"BUSD" : sym+"USDT";
    fetch("https://api.binance.com/api/v3/ticker/price?symbol="+pair)
      .then(function(r){ return r.json(); })
      .then(function(d){ if(d.price){ if(!window._pcPrices)window._pcPrices={}; window._pcPrices[sym]=parseFloat(d.price); } done(); })
      .catch(done);
  });
  // Yahoo Finance
  yahooSyms.forEach(function(sym){
    fetch("https://corsproxy.io/?https://query1.finance.yahoo.com/v8/finance/chart/"+sym+"?interval=1d&range=1d")
      .then(function(r){ return r.json(); })
      .then(function(d){
        try{
          var p = d.chart.result[0].meta.regularMarketPrice;
          if(p){ if(!window._pcPrices)window._pcPrices={}; window._pcPrices[sym]=parseFloat(p); }
        }catch(e){}
        done();
      })
      .catch(done);
  });
}

function _renderPortfolioEmpty(){
  var cnt = document.getElementById('port-cnt');
  if(!cnt) return;
  // Si no hay sesión, mostrar demo con activos de ejemplo
  var demoItems = [
    {id:'demo1', simbolo:'AAPL',  nombre:'Apple',       cantidad:10,   precio_compra:185.00, tipo:'accion'},
    {id:'demo2', simbolo:'NVDA',  nombre:'NVIDIA',      cantidad:5,    precio_compra:125.00, tipo:'accion'},
    {id:'demo3', simbolo:'BTC',   nombre:'Bitcoin',     cantidad:0.05, precio_compra:62000,  tipo:'cripto'},
    {id:'demo4', simbolo:'ETH',   nombre:'Ethereum',    cantidad:1.5,  precio_compra:3200,   tipo:'cripto'},
    {id:'demo5', simbolo:'GC=F',  nombre:'Oro (Gold)',  cantidad:2,    precio_compra:2050,   tipo:'commodity'},
    {id:'demo6', simbolo:'CL=F',  nombre:'Petróleo WTI',cantidad:10,   precio_compra:78.50,  tipo:'commodity'},
    {id:'demo7', simbolo:'TLT',   nombre:'Bono 20Y US', cantidad:20,   precio_compra:92.00,  tipo:'bono'}
  ];
  cnt.innerHTML = '<div style="background:#1A0D0060;border:1px dashed #D4A01740;border-radius:10px;margin:10px 14px 6px;padding:8px 14px;display:flex;align-items:center;gap:8px;">' +
    '<span style="font-size:18px;">👤</span>' +
    '<div>' +
      '<div style="font-size:11px;font-weight:700;color:#D4A017;">Modo demo — Iniciá sesión para tu portfolio real</div>' +
      '<div onclick="navTo(\x27perfil\x27);authSwitchTab(\x27register\x27)" style="font-size:10px;color:#58A6FF;cursor:pointer;margin-top:2px;">Crear cuenta gratis →</div>' +
    '</div>' +
  '</div>';
  _renderPortfolioItems(demoItems);
}

function _renderPortfolioItems(items){
  var cnt = document.getElementById('port-cnt');
  if(!cnt) return;
  if(!items || items.length === 0){ _renderPortfolioEmpty(); return; }
  var prcs = window._pcPrices || {};
  cnt.innerHTML = items.map(function(item){
    var precio = prcs[item.simbolo] || 0;
    var valor = precio > 0 ? (item.cantidad * precio) : (item.cantidad * item.precio_compra);
    var pnl = precio > 0 ? ((precio - item.precio_compra) / item.precio_compra * 100) : 0;
    var pnlColor = pnl >= 0 ? '#3FB950' : '#FF4444';
    var pnlSign = pnl >= 0 ? '+' : '';
    var fmtNum = function(n,d){ return n.toLocaleString('en-US',{minimumFractionDigits:d||2,maximumFractionDigits:d||2}); };
    return '<div style="display:flex;align-items:center;justify-content:space-between;padding:13px 14px;border-bottom:0.5px solid #21262D;-webkit-tap-highlight-color:rgba(0,0,0,0);">' +
      '<div style="flex:1;min-width:0;">' +
        '<div style="display:flex;align-items:center;gap:6px;">' +
          '<span style="font-weight:700;color:#E6EDF3;font-size:14px;">' + item.simbolo + '</span>' +
          '<span style="font-size:10px;padding:1px 6px;border-radius:5px;background:#21262D;color:#8B949E;">' + (item.tipo||'cripto') + '</span>' +
        '</div>' +
        '<div style="font-size:11px;color:#8B949E;margin-top:2px;">' + item.cantidad + ' u. @ $' + fmtNum(item.precio_compra) + '</div>' +
      '</div>' +
      '<div style="text-align:right;margin-right:8px;">' +
        '<div style="font-size:14px;font-weight:700;color:#E6EDF3;">$' + fmtNum(valor) + '</div>' +
        '<div style="font-size:11px;font-weight:600;color:' + pnlColor + ';">' + pnlSign + pnl.toFixed(2) + '%</div>' +
      '</div>' +
      '<div onclick="deletePortfolioItem(\'' + item.id + '\')" style="font-size:18px;color:#555;cursor:pointer;padding:4px 6px;-webkit-tap-highlight-color:rgba(0,0,0,0);">×</div>' +
    '</div>';
  }).join('');
  _updateTotals(items);
}

function _updateTotals(items){
  var prcs = window._pcPrices || {};
  var total = 0, totalCosto = 0, bestPct = -Infinity, bestSym = '—';
  items.forEach(function(item){
    var precio = prcs[item.simbolo] || item.precio_compra;
    total += item.cantidad * precio;
    totalCosto += item.cantidad * item.precio_compra;
    var pnl = item.precio_compra > 0 ? ((precio - item.precio_compra) / item.precio_compra * 100) : 0;
    if(pnl > bestPct){ bestPct = pnl; bestSym = item.simbolo; }
  });
  var pnlUsd = total - totalCosto;
  var pnlPct = totalCosto > 0 ? (pnlUsd / totalCosto * 100) : 0;
  var fmtNum = function(n,d){ return n.toLocaleString('en-US',{minimumFractionDigits:d||2,maximumFractionDigits:d||2}); };
  var el = function(id){ return document.getElementById(id); };
  if(el('port-total')) el('port-total').textContent = '$' + fmtNum(total);
  if(el('port-count')) el('port-count').textContent = items.length;
  if(el('port-best')) el('port-best').textContent = items.length > 0 ? (bestSym + ' ' + (bestPct>=0?'+':'') + bestPct.toFixed(1) + '%') : '—';
  if(el('port-pnl-usd')){
    el('port-pnl-usd').textContent = (pnlUsd>=0?'+':'-') + '$' + fmtNum(Math.abs(pnlUsd));
    el('port-pnl-usd').style.color = pnlUsd >= 0 ? '#3FB950' : '#FF4444';
  }
  if(el('port-pnl-pct')){
    el('port-pnl-pct').textContent = (pnlPct>=0?'+':'') + pnlPct.toFixed(2) + '%';
    el('port-pnl-pct').style.background = pnlPct >= 0 ? '#1A3A2A' : '#3A1A1A';
    el('port-pnl-pct').style.color = pnlPct >= 0 ? '#3FB950' : '#FF4444';
  }
}

// ── ABRIR / CERRAR modal Agregar activo ──
var _ACTIVOS_MODAL = [
  {g:'Cripto',items:[{s:'BTC',n:'Bitcoin'},{s:'ETH',n:'Ethereum'},{s:'SOL',n:'Solana'},{s:'BNB',n:'BNB'},{s:'XRP',n:'XRP'},{s:'ADA',n:'Cardano'},{s:'AVAX',n:'Avalanche'},{s:'DOT',n:'Polkadot'},{s:'LINK',n:'Chainlink'},{s:'MATIC',n:'Polygon'}],tipo:'cripto'},
  {g:'Acciones USA',items:[{s:'AAPL',n:'Apple'},{s:'NVDA',n:'NVIDIA'},{s:'MSFT',n:'Microsoft'},{s:'TSLA',n:'Tesla'},{s:'META',n:'Meta'},{s:'GOOGL',n:'Alphabet'},{s:'AMZN',n:'Amazon'}],tipo:'accion'},
  {g:'Acciones ARG',items:[{s:'GGAL',n:'Galicia'},{s:'YPF',n:'YPF'},{s:'BMA',n:'Macro'}],tipo:'accion'},
  {g:'ETFs',items:[{s:'SPY',n:'S&P 500'},{s:'QQQ',n:'Nasdaq 100'},{s:'GLD',n:'Gold ETF'},{s:'TLT',n:'Bono 20Y US'},{s:'IEF',n:'Bono 7-10Y'},{s:'VTI',n:'Total Mkt'}],tipo:'etf'},
  {g:'Stablecoins',items:[{s:'USDT',n:'Tether'},{s:'USDC',n:'USD Coin'}],tipo:'stable'}
];

window.openAddActivo = function(){
  // Si no hay sesión, mostrar aviso de login
  if(!window._supabase){ navTo('perfil'); return; }
  window._supabase.auth.getSession().then(function(res){
    if(!res.data || !res.data.session){
      // Mostrar mini-aviso en el portfolio y redirigir a Perfil/Login
      var cnt = document.getElementById('port-cnt');
      if(cnt){
        var old = cnt.innerHTML;
        cnt.innerHTML = '<div style="background:#1A0D00;border:1px solid #D4A01780;border-radius:12px;margin:20px 14px;padding:20px;text-align:center;">' +
          '<div style="font-size:28px;margin-bottom:8px;">🔐</div>' +
          '<div style="font-size:14px;font-weight:700;color:#D4A017;margin-bottom:6px;">Necesitás una cuenta</div>' +
          '<div style="font-size:12px;color:#8B949E;margin-bottom:16px;">Para guardar activos reales, creá tu cuenta gratis.</div>' +
          '<div onclick="navTo(\x27perfil\x27);authSwitchTab(\x27register\x27)" style="background:linear-gradient(135deg,#D4A017,#B8860B);color:#000;font-weight:800;font-size:14px;padding:12px 24px;border-radius:10px;cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0);">Crear cuenta gratis →</div>' +
          '<div onclick="navTo(\x27perfil\x27)" style="margin-top:10px;font-size:12px;color:#58A6FF;cursor:pointer;">Ya tengo cuenta</div>' +
        '</div>' + old;
        setTimeout(function(){ cnt.innerHTML = old; }, 5000);
      }
      return;
    }
    _openAddActivoModal();
  });
};
function _openAddActivoModal(){
  var modal = document.getElementById('port-modal');
  var body = document.getElementById('port-modal-body');
  var title = document.getElementById('port-modal-title');
  if(!modal || !body) return;
  if(title) title.textContent = 'Agregar activo';
  // Construir selector de activos agrupado + inputs
  var opts = _ACTIVOS_MODAL.map(function(g){
    return '<optgroup label="── ' + g.g + ' ──">' +
      g.items.map(function(a){ return '<option value="' + a.s + '|' + a.n + '|' + g.tipo + '">' + a.s + ' · ' + a.n + '</option>'; }).join('') +
    '</optgroup>';
  }).join('');
  body.innerHTML =
    '<div style="display:flex;flex-direction:column;gap:12px;">' +
      '<div>' +
        '<div style="font-size:10px;color:#555;text-transform:uppercase;letter-spacing:.5px;margin-bottom:5px;">Activo</div>' +
        '<select id="pa-sym" style="width:100%;background:#0D1117;border:0.5px solid #30363D;border-radius:9px;padding:10px 12px;color:#E6EDF3;font-size:13px;outline:none;">' + opts + '</select>' +
      '</div>' +
      '<div style="display:flex;gap:10px;">' +
        '<div style="flex:1;">' +
          '<div style="font-size:10px;color:#555;text-transform:uppercase;letter-spacing:.5px;margin-bottom:5px;">Cantidad</div>' +
          '<input id="pa-qty" type="number" min="0" step="any" placeholder="0.001" style="width:100%;background:#0D1117;border:0.5px solid #30363D;border-radius:9px;padding:10px 12px;color:#E6EDF3;font-size:16px;outline:none;box-sizing:border-box;">' +
        '</div>' +
        '<div style="flex:1;">' +
          '<div style="font-size:10px;color:#555;text-transform:uppercase;letter-spacing:.5px;margin-bottom:5px;">Precio compra (USD)</div>' +
          '<input id="pa-price" type="number" min="0" step="any" placeholder="0.00" style="width:100%;background:#0D1117;border:0.5px solid #30363D;border-radius:9px;padding:10px 12px;color:#E6EDF3;font-size:16px;outline:none;box-sizing:border-box;">' +
        '</div>' +
      '</div>' +
      '<div id="pa-err" style="font-size:11px;color:#FF4444;display:none;text-align:center;"></div>' +
      '<div onclick="savePortActivo()" style="background:linear-gradient(135deg,#D4A017,#B8860B);border-radius:12px;padding:14px;text-align:center;font-size:15px;font-weight:700;color:#000;cursor:pointer;margin-top:4px;-webkit-tap-highlight-color:rgba(0,0,0,0);touch-action:manipulation;">Guardar activo</div>' +
    '</div>';
  modal.style.display = 'flex';
}

window.closePortModal = function(){
  var modal = document.getElementById('port-modal');
  if(modal) modal.style.display = 'none';
};

window.savePortActivo = function(){
  var symEl = document.getElementById('pa-sym');
  var qtyEl = document.getElementById('pa-qty');
  var priceEl = document.getElementById('pa-price');
  var errEl = document.getElementById('pa-err');
  if(!symEl || !qtyEl || !priceEl) return;
  var parts = symEl.value.split('|');
  var simbolo = parts[0], nombre = parts[1], tipo = parts[2];
  var cantidad = parseFloat(qtyEl.value);
  var precio = parseFloat(priceEl.value);
  if(!simbolo){ showPortErr('Seleccioná un activo.'); return; }
  if(!cantidad || cantidad <= 0){ showPortErr('Ingresá una cantidad válida.'); return; }
  if(!precio || precio <= 0){ showPortErr('Ingresá un precio de compra válido.'); return; }
  if(errEl) errEl.style.display = 'none';
  addPortfolioItem(simbolo, nombre, cantidad, precio, tipo);
  closePortModal();
};

function showPortErr(msg){
  var errEl = document.getElementById('pa-err');
  if(errEl){ errEl.textContent = msg; errEl.style.display = 'block'; }
}

// ── AGREGAR activo al portfolio en Supabase ──
window.addPortfolioItem = function(simbolo, nombre, cantidad, precioCompra, tipo){
  if(!window._supabase){ alert('Necesitás iniciar sesión para guardar activos.'); return; }
  window._supabase.auth.getSession().then(function(res){
    if(!res.data || !res.data.session){ alert('Iniciá sesión primero.'); return; }
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

// ── ELIMINAR activo del portfolio ──
window.deletePortfolioItem = function(id){
  if(!window._supabase) return;
  if(!confirm('\u00bfEliminar este activo del portfolio?')) return;
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
    if(window._supabase){
      window._supabase.auth.onAuthStateChange(function(event, session){
        if(event === 'SIGNED_IN') loadPortfolioSupa();
        if(event === 'SIGNED_OUT') _renderPortfolioEmpty();
      });
      loadPortfolioSupa();
    } else {
      _renderPortfolioEmpty();
    }
  }, 1200);
});


// Picker pais custom
window.togglePaisPicker=function(){var dd=document.getElementById("reg-pais-dropdown");if(!dd)return;dd.style.display=dd.style.display==="block"?"none":"block";};
window.selectPais=function(iso,code){var fe=document.getElementById("reg-pais-flag");var ce=document.getElementById("reg-pais-code");var hd=document.getElementById("reg-celular");var dd=document.getElementById("reg-pais-dropdown");if(fe)fe.innerHTML='<img src="https://flagcdn.com/24x18/'+iso+'.png" width="24" height="18" style="border-radius:2px;vertical-align:middle;display:inline-block;" alt="'+iso+'">';if(ce)ce.textContent=code;if(hd)hd.value=code;if(dd)dd.style.display="none";window.syncPhoneField();};
window.syncPhoneField=function(){var num=document.getElementById("reg-celular-num");var hd=document.getElementById("reg-celular");if(!num||!hd)return;var prefix=hd.value.indexOf(" ")>-1?hd.value.split(" ")[0]:hd.value;hd.value=prefix+" "+num.value.trim();};
window.updatePhonePrefix=function(){};
document.addEventListener("click",function(e){var dd=document.getElementById("reg-pais-dropdown");var btn=document.getElementById("reg-pais-btn");if(!dd||!btn)return;if(!btn.contains(e.target)&&!dd.contains(e.target))dd.style.display="none";});
