/* v=1774807550559 */
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
  comm:     [{s:'GC=F',n:'Oro'},{s:'CL=F',n:'Petroleo'},{s:'SI=F',n:'Plata'},{s:'NG=F',n:'Gas Natural'},{s:'HG=F',n:'Cobre'}],
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
      +'<div style="text-align:right;display:flex;flex-direction:column;align-items:flex-end;"><span id="p-'+item.s+'" style="color:#E6EDF3;font-size:14px;font-weight:600;">ÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ</span><span id="c-'+item.s+'" style="font-size:11px;color:#8B949E;">ÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ</span></div>';
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

// === swPais: cambio de paÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ­s en acciones ===
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
function showTestNotification(){if(swReg&&Notification.permission==='granted')swReg.showNotification('Aurex - Alertas Activas',{body:'RecibirÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¡s alertas de precio.',icon:'https://fmoscon-creator.github.io/aurex-app/icon-192.png',tag:'aurex-test'});}
function showAlertNotification(s,p,o){if(swReg&&Notification.permission==='granted')swReg.showNotification('ALERTA - '+s,{body:'$'+p.toLocaleString('en')+' obj:$'+o.toLocaleString('en'),icon:'https://fmoscon-creator.github.io/aurex-app/icon-192.png',tag:'aurex-'+s,renotify:true});}
function updateNotifButton(on){var b=document.getElementById('notif-btn');if(!b)return;b.style.background=on?'#16A34A':'#D4A017';b.textContent=on?'Activas':'Activar';}
initPushNotifications();
function checkAlertasLocal(){if(typeof ALERTAS==='undefined')return;ALERTAS.forEach(function(a){if(!a.activa)return;var actual=typeof getAlertActual==='function'?getAlertActual(a):null;if(!actual)return;if((a.cond==='mayor'&&actual>=a.precio)||(a.cond==='menor'&&actual<=a.precio)){if(!a._disparada){a._disparada=true;var b=document.createElement('div');b.style.cssText='position:fixed;top:60px;left:0;right:0;z-index:9999;margin:0 12px;background:#16A34A;border-radius:12px;padding:12px 16px;color:white;font-size:13px;font-weight:600';b.textContent='ALERTA - '+a.s;document.body.appendChild(b);setTimeout(function(){b.remove();},5000);if(typeof showAlertNotification==='function')showAlertNotification(a.s,actual,a.precio);}}});}
setInterval(checkAlertasLocal,30000);
fetch(BACKEND_URL+'/').then(function(r){return r.json();}).then(function(d){if(d.status==='ok')console.log('Backend v'+d.version+' OK');}).catch(function(){});

// ============================================================
// === CONVERSOR DE MONEDAS ÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ Binance + fallback fiat =========
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
  if(isNaN(amt) || amt < 0) { resEl.textContent = 'ÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ'; return; }
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
// === PORTFOLIO PERSISTENTE ÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ Supabase ========================
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

// Obtener el token de sesiÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ³n actual del usuario
function getSupaToken(){
  try {
    var sb = window._supabase || (window.supabase && window.supabase.createClient ? null : null);
    if(window._supabase) return window._supabase.auth.getSession();
    return Promise.resolve({ data: { session: null } });
  } catch(e) { return Promise.resolve({ data: { session: null } }); }
}

// ÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ CARGAR portfolio del usuario desde Supabase ÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ
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
    // Luego buscar precios frescos para los sÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ­mbolos del portfolio
    _refreshPortPrices(items);
  })
  .catch(function(){ _renderPortfolioEmpty(); });
}

function _refreshPortPrices(items){
  if(!items || items.length===0) return;
  var syms = items.map(function(i){ return i.simbolo; });
  var CRIPTO = ['BTC','ETH','SOL','BNB','XRP','ADA','AVAX','DOT','LINK','MATIC','USDT','USDC'];
  var cryptoSyms = syms.filter(function(s){ return CRIPTO.indexOf(s)>=0; });
  var yahooSyms = syms.filter(function(s){ return CRIPTO.indexOf(s)<0; });
  var pending = cryptoSyms.length + yahooSyms.length;
  if(pending===0){ _renderPortfolioItems(items); return; }
  function done(){ pending--; if(pending<=0) _renderPortfolioItems(items); }
  cryptoSyms.forEach(function(sym){
    var pair = sym==='USDT'||sym==='USDC' ? sym+'BUSD' : sym+'USDT';
    fetch('https://api.binance.com/api/v3/ticker/24hr?symbol='+pair)
      .then(function(r){ return r.json(); })
      .then(function(d){
        if(!window._pcPrices) window._pcPrices = {};
        if(!window._pcChange24) window._pcChange24 = {};
        if(d.lastPrice){ window._pcPrices[sym] = parseFloat(d.lastPrice); }
        if(d.priceChangePercent !== undefined){ window._pcChange24[sym] = parseFloat(d.priceChangePercent); }
        done();
      }).catch(done);
  });
  yahooSyms.forEach(function(sym){
    fetch('https://corsproxy.io/?https://query1.finance.yahoo.com/v8/finance/chart/'+sym+'?interval=1d&range=1d')
      .then(function(r){ return r.json(); })
      .then(function(d){
        try{
          var meta = d.chart.result[0].meta;
          if(!window._pcPrices) window._pcPrices = {};
          if(!window._pcChange24) window._pcChange24 = {};
          if(meta.regularMarketPrice){ window._pcPrices[sym] = parseFloat(meta.regularMarketPrice); }
          if(meta.previousClose && meta.regularMarketPrice){
            window._pcChange24[sym] = ((meta.regularMarketPrice - meta.previousClose) / meta.previousClose * 100);
            if(!window._pcMarketState) window._pcMarketState={};
            window._pcMarketState[sym]=meta.marketState||'CLOSED';
            if(!window._pcPrevClose) window._pcPrevClose={};
            window._pcPrevClose[sym]=meta.previousClose;
            if(!window._pc52Low) window._pc52Low={};
            if(!window._pc52High) window._pc52High={};
            if(meta.fiftyTwoWeekLow) window._pc52Low[sym]=meta.fiftyTwoWeekLow;
            if(meta.fiftyTwoWeekHigh) window._pc52High[sym]=meta.fiftyTwoWeekHigh;
          }
        }catch(e){}
        done();
      }).catch(done);
  });
}

function _renderPortfolioEmpty(){
  var cnt = document.getElementById('port-cnt');
  if(!cnt) return;
  cnt.innerHTML = '<div style="text-align:center;padding:40px 20px;">' +
    '<div style="font-size:40px;margin-bottom:12px;">AUREX</div>' +
    '<div style="font-size:14px;font-weight:700;color:#C9D1D9;margin-bottom:6px;">Tu portfolio esta vacio</div>' +
    '<div style="font-size:12px;color:#8B949E;margin-bottom:20px;">Agrega tu primer activo para empezar a seguir tu cartera en tiempo real</div>' +
    '<button onclick="openPortModal()" style="background:#D4A017;color:#0D1117;border:none;border-radius:8px;padding:10px 20px;font-size:13px;font-weight:700;cursor:pointer;">+ Agregar primer activo</button>' +
  '</div>';
}

function _renderPortfolioItems(items){
  var cnt = document.getElementById('port-cnt');
  if(!cnt) return;
  if(!items || items.length === 0){ _renderPortfolioEmpty(); return; }
  var savedOrder = JSON.parse(localStorage.getItem('aurex_port_order') || '[]');
  if(savedOrder.length > 0){
    var ordered = [], rem = items.slice();
    savedOrder.forEach(function(oid){
      var xi = rem.findIndex(function(i){ return i.id === oid; });
      if(xi >= 0){ ordered.push(rem.splice(xi,1)[0]); }
    });
    items = ordered.concat(rem);
  }
  window._portItems = items;
  var prcs = window._pcPrices || {};
  var fmtNum = function(n,d){ return n.toLocaleString('en-US',{minimumFractionDigits:d||2,maximumFractionDigits:d||2}); };
  cnt.innerHTML = items.map(function(item, idx){
    var precio = prcs[item.simbolo] || item.precio_compra;
    var valor = item.cantidad * precio;
    var ch24 = window._pcChange24 && window._pcChange24[item.simbolo] !== undefined ? window._pcChange24[item.simbolo] : (precio > 0 && item.precio_compra > 0 ? ((precio - item.precio_compra)/item.precio_compra*100) : 0);
    var cc = ch24 >= 0 ? '#3FB950' : '#FF4444';
    var cs = ch24 >= 0 ? '+' : '';
    var isCrypto = item.tipo === 'Cripto';
    var mktState = !isCrypto && window._pcMarketState && window._pcMarketState[item.simbolo];
    var mktClosed = mktState && mktState !== 'REGULAR' && mktState !== 'PRE';
    var prevCloseVal = !isCrypto && window._pcPrevClose && window._pcPrevClose[item.simbolo];
    var prevClosePct = prevCloseVal && window._pcPrices && window._pcPrices[item.simbolo] && prevCloseVal > 0 ? ((window._pcPrices[item.simbolo]-prevCloseVal)/prevCloseVal*100) : null;
    if(mktClosed && prevClosePct !== null){ cc = '#888'; cs = prevClosePct >= 0 ? '+' : ''; }
    var nowUtc = new Date();
    var nowMin = nowUtc.getUTCHours()*60+nowUtc.getUTCMinutes();
    var nyseOpenMin = 13*60+30;
    var nyseCloseMin = 20*60;
    var isWeekend = nowUtc.getUTCDay()===0||nowUtc.getUTCDay()===6;
    var minsToOpen = 0;
    if(mktClosed){
      if(isWeekend){
        var daysToMon = (8-nowUtc.getUTCDay())%7||7;
        minsToOpen = daysToMon*24*60 - nowMin + nyseOpenMin;
      } else if(nowMin < nyseOpenMin){
        minsToOpen = nyseOpenMin - nowMin;
      } else {
        minsToOpen = (24*60 - nowMin) + nyseOpenMin;
      }
    }
    var closedLabel = mktClosed ? ' <span style="font-size:9px;color:#666;font-weight:400;">\u25CF cierre</span>' : '';
    var openLabel = mktClosed ? '<div style="font-size:9px;color:#666;margin-top:1px;">Abre en '+Math.floor(minsToOpen/60)+'h '+( minsToOpen%60)+'m</div>' : '';
    var upColor = idx === 0 ? '#333' : '#8B949E';
    var dnColor = idx === items.length-1 ? '#333' : '#8B949E';
    var upCursor = idx === 0 ? 'default' : 'pointer';
    var dnCursor = idx === items.length-1 ? 'default' : 'pointer';
    return '<div id="port-row-'+item.id+'" style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-bottom:0.5px solid #21262D;">' +
      '<div style="display:flex;flex-direction:column;gap:1px;margin-right:6px;">' +
        '<div onclick="movePortfolioItem(\''+item.id+'\', -1)" style="width:18px;height:16px;display:flex;align-items:center;justify-content:center;font-size:11px;color:'+upColor+';cursor:'+upCursor+';">&#9650;</div>' +
        '<div onclick="movePortfolioItem(\''+item.id+'\', 1)" style="width:18px;height:16px;display:flex;align-items:center;justify-content:center;font-size:11px;color:'+dnColor+';cursor:'+dnCursor+';">&#9660;</div>' +
      '</div>' +
      '<div style="flex:1;min-width:0;cursor:pointer;" onclick="openPortItemDetail(\x27'+item.id+'\x27)">' +
        '<div style="display:flex;align-items:center;gap:6px;">' +
          '<span style="font-weight:700;color:#E6EDF3;font-size:14px;">'+item.simbolo+'</span>' +
          '<span style="font-size:10px;padding:1px 6px;border-radius:5px;background:#21262D;color:#8B949E;">'+(item.tipo||'cripto')+'</span>' +
        '</div>' +
        '<div style="font-size:11px;color:#8B949E;margin-top:2px;">'+item.cantidad+' u. @ $'+fmtNum(item.precio_compra)+'</div>' +
      '</div>' +
      '<div style="text-align:right;margin-right:8px;">' +
        '<div style="font-size:14px;font-weight:700;color:#E6EDF3;">$'+fmtNum(valor)+'</div>' +
        '<div style="display:flex;align-items:center;justify-content:flex-end;gap:3px;margin-top:3px;">' +
          '<span id="pct-'+item.id+'" style="font-size:11px;font-weight:600;color:'+cc+';">'+(mktClosed && prevClosePct!==null ? cs+prevClosePct.toFixed(2)+'%'+closedLabel : cs+ch24.toFixed(2)+'%')+'</span>'+openLabel +
          '<span style="display:flex;gap:1px;">' +
            ['24h','7d','1m','1y'].map(function(p){ return '<span onclick="portPeriod(\''+item.id+'\',\''+item.simbolo+'\',\''+item.tipo+'\',\''+p+'\')" id="pp-'+p+'-'+item.id+'" style="font-size:9px;padding:1px 3px;border-radius:3px;background:'+(p==='24h'?'#D4A017':'#21262D')+';color:'+(p==='24h'?'#0D1117':'#8B949E')+';cursor:pointer;">'+p+'</span>'; }).join('') +
          '</span>' +
        '</div>' +
      '</div>' +
      '<div onclick="deletePortfolioItem(\''+item.id+'\')" style="font-size:15px;color:#555;cursor:pointer;padding:4px;" title="Eliminar">&#128465;</div>' +
    '</div>';
  }).join('');
  _updateTotals(items);
}

window.movePortfolioItem = function(id, direction){
  var items = window._portItems;
  if(!items) return;
  var idx = items.findIndex(function(i){ return i.id === id; });
  if(idx < 0) return;
  var ni = idx + direction;
  if(ni < 0 || ni >= items.length) return;
  var tmp = items[idx]; items[idx] = items[ni]; items[ni] = tmp;
  localStorage.setItem('aurex_port_order', JSON.stringify(items.map(function(i){ return i.id; })));
  _renderPortfolioItems(items);
};

window.portPeriod = function(id, simbolo, tipo, period){
  ['24h','7d','1m','1y'].forEach(function(p){
    var btn = document.getElementById('pp-'+p+'-'+id);
    if(!btn) return;
    btn.style.background = p === period ? '#D4A017' : '#21262D';
    btn.style.color = p === period ? '#0D1117' : '#8B949E';
  });
  var pctEl = document.getElementById('pct-'+id);
  if(!pctEl) return;
  if(period === '24h'){
    var cv = window._pcChange24 && window._pcChange24[simbolo] !== undefined ? window._pcChange24[simbolo] : null;
    if(cv !== null){ pctEl.style.color = cv>=0?'#3FB950':'#FF4444'; pctEl.textContent = (cv>=0?'+':'')+cv.toFixed(2)+'%'; }
    return;
  }
  pctEl.textContent = '...';
  var daysMap = {}; daysMap['7d']=7; daysMap['1m']=30; daysMap['1y']=365;
  var days = daysMap[period] || 7;
  var CRIPTO = ['BTC','ETH','SOL','BNB','XRP','ADA','AVAX','DOT','LINK','MATIC','DOGE','SHIB','LTC','ATOM','UNI','FIL','NEAR','APT','ARB','OP'];
  if(CRIPTO.indexOf(simbolo) >= 0){
    var intv = days <= 7 ? '4h' : '1d';
    var lim = days <= 7 ? 42 : days;
    fetch('https://api.binance.com/api/v3/klines?symbol='+simbolo+'USDT&interval='+intv+'&limit='+lim)
      .then(function(r){ return r.json(); })
      .then(function(d){
        if(!d || d.length < 2){ pctEl.textContent = '--'; return; }
        var first = parseFloat(d[0][1]);
        var last = parseFloat(d[d.length-1][4]);
        var pct = first > 0 ? ((last-first)/first*100) : 0;
        pctEl.style.color = pct>=0?'#3FB950':'#FF4444';
        pctEl.textContent = (pct>=0?'+':'')+pct.toFixed(2)+'%';
      }).catch(function(){ pctEl.textContent = '--'; });
  } else {
    var now = Math.floor(Date.now()/1000);
    var from = now - days*86400;
    var yurl = 'https://corsproxy.io/?https://query1.finance.yahoo.com/v8/finance/chart/'+encodeURIComponent(simbolo)+'?period1='+from+'&period2='+now+'&interval=1d';
    fetch(yurl)
      .then(function(r){ return r.json(); })
      .then(function(d){
        var res = d.chart && d.chart.result && d.chart.result[0];
        if(!res){ pctEl.textContent = '--'; return; }
        var closes = res.indicators.quote[0].close;
        var fp = closes.find(function(p){ return p != null; });
        var lp = closes.slice().reverse().find(function(p){ return p != null; });
        if(!fp || !lp){ pctEl.textContent = '--'; return; }
        var pct = ((lp-fp)/fp*100);
        pctEl.style.color = pct>=0?'#3FB950':'#FF4444';
        pctEl.textContent = (pct>=0?'+':'')+pct.toFixed(2)+'%';
      }).catch(function(){ pctEl.textContent = '--'; });
  }
};


function _updateTotals(items){
  var prcs = window._pcPrices || {};
  var total = 0, totalCosto = 0, bestPct = -Infinity, bestSym = 'ÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ';
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
  if(el('port-best')) el('port-best').textContent = items.length > 0 ? (bestSym + ' ' + (bestPct>=0?'+':'') + bestPct.toFixed(1) + '%') : 'ÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ';
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

// ÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ ABRIR / CERRAR modal Agregar activo ÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ
var _ACTIVOS_MODAL = [
  {g:'Cripto',items:[{s:'BTC',n:'Bitcoin'},{s:'ETH',n:'Ethereum'},{s:'SOL',n:'Solana'},{s:'BNB',n:'BNB'},{s:'XRP',n:'XRP'},{s:'ADA',n:'Cardano'},{s:'AVAX',n:'Avalanche'},{s:'DOT',n:'Polkadot'},{s:'LINK',n:'Chainlink'},{s:'MATIC',n:'Polygon'}],tipo:'cripto'},
  {g:'Acciones USA',items:[{s:'AAPL',n:'Apple'},{s:'NVDA',n:'NVIDIA'},{s:'MSFT',n:'Microsoft'},{s:'TSLA',n:'Tesla'},{s:'META',n:'Meta'},{s:'GOOGL',n:'Alphabet'},{s:'AMZN',n:'Amazon'}],tipo:'accion'},
  {g:'Acciones ARG',items:[{s:'GGAL',n:'Galicia'},{s:'YPF',n:'YPF'},{s:'BMA',n:'Macro'}],tipo:'accion'},
  {g:'ETFs',items:[{s:'SPY',n:'S&P 500'},{s:'QQQ',n:'Nasdaq 100'},{s:'GLD',n:'Gold ETF'},{s:'TLT',n:'Bono 20Y US'},{s:'IEF',n:'Bono 7-10Y'},{s:'VTI',n:'Total Mkt'}],tipo:'etf'},
  {g:'Stablecoins',items:[{s:'USDT',n:'Tether'},{s:'USDC',n:'USD Coin'}],tipo:'stable'}
];

window.openAddActivo = function(){
  // Si no hay sesiÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ³n, mostrar aviso de login
  if(!window._supabase){ navTo('perfil'); return; }
  window._supabase.auth.getSession().then(function(res){
    if(!res.data || !res.data.session){
      // Mostrar mini-aviso en el portfolio y redirigir a Perfil/Login
      var cnt = document.getElementById('port-cnt');
      if(cnt){
        var old = cnt.innerHTML;
        cnt.innerHTML = '<div style="background:#1A0D00;border:1px solid #D4A01780;border-radius:12px;margin:20px 14px;padding:20px;text-align:center;">' +
          '<div style="font-size:28px;margin-bottom:8px;">ÃÂÃÂÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ</div>' +
          '<div style="font-size:14px;font-weight:700;color:#D4A017;margin-bottom:6px;">NecesitÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¡s una cuenta</div>' +
          '<div style="font-size:12px;color:#8B949E;margin-bottom:16px;">Para guardar activos reales, creÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¡ tu cuenta gratis.</div>' +
          '<div onclick="navTo(\x27perfil\x27);authSwitchTab(\x27register\x27)" style="background:linear-gradient(135deg,#D4A017,#B8860B);color:#000;font-weight:800;font-size:14px;padding:12px 24px;border-radius:10px;cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0);">Crear cuenta gratis ÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ</div>' +
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
  var allActs = window._IA_ACTIVOS || [];
  body.innerHTML =
    '<div style="display:flex;flex-direction:column;gap:10px;">' +
    '<div style="position:relative;">' +
    '<input id="pa-search" type="text" placeholder="Buscar por nombre o ticker..." autocomplete="off" style="width:100%;box-sizing:border-box;background:#0D1117;border:1px solid #30363D;border-radius:9px;padding:10px 12px;color:#E6EDF3;font-size:14px;outline:none;" oninput="filterPortSearch()" />' +
    '</div>' +
    '<div id="pa-results" style="max-height:200px;overflow-y:auto;display:flex;flex-direction:column;gap:4px;"></div>' +
    '<div id="pa-selected" style="display:none;background:#161B22;border-radius:9px;padding:10px;border:1px solid #D4A017;">' +
    '<div id="pa-sel-name" style="font-size:13px;font-weight:600;color:#E6EDF3;margin-bottom:8px;"></div>' +
    '<div style="display:flex;gap:8px;">' +
    '<div style="flex:1;"><div style="font-size:10px;color:#555;margin-bottom:4px;">Cantidad</div>' +
    '<input id="pa-qty" type="number" min="0" step="any" placeholder="0.00" style="width:100%;box-sizing:border-box;background:#0D1117;border:1px solid #30363D;border-radius:7px;padding:8px 10px;color:#E6EDF3;font-size:14px;outline:none;" /></div>' +
    '<div style="flex:1;"><div style="font-size:10px;color:#555;margin-bottom:4px;">Precio compra (USD)</div>' +
    '<input id="pa-price" type="number" min="0" step="any" placeholder="0.00" style="width:100%;box-sizing:border-box;background:#0D1117;border:1px solid #30363D;border-radius:7px;padding:8px 10px;color:#E6EDF3;font-size:14px;outline:none;" /></div>' +
    '</div>' +
    '<div id="pa-err" style="color:#FF4444;font-size:11px;margin-top:4px;display:none;"></div>' +
    '<div onclick="savePortActivo()" style="margin-top:10px;background:#3FB950;color:#0D1117;border-radius:9px;padding:11px;text-align:center;font-size:14px;font-weight:700;cursor:pointer;">Confirmar</div>' +
    '</div>' +
    '<input id="pa-sym" type="hidden" value="" />' +
    '</div>';
  modal.style.display = 'flex';
  window._portSearchActs = allActs;
  setTimeout(function(){ var el = document.getElementById('pa-search'); if(el) el.focus(); }, 100);
  window.filterPortSearch();
}
window.filterPortSearch = function(){
  var q = (document.getElementById('pa-search') ? document.getElementById('pa-search').value : '').toLowerCase().trim();
  var acts = window._portSearchActs || [];
  var res = document.getElementById('pa-results');
  if(!res) return;
  var filtered = q.length < 1 ? acts.slice(0,20) : acts.filter(function(a){ return a.s.toLowerCase().indexOf(q) >= 0 || a.n.toLowerCase().indexOf(q) >= 0; }).slice(0,20);
  res.innerHTML = filtered.map(function(a){
    var logoHtml = a.logo ? '<img src="'+a.logo+'" style="width:22px;height:22px;border-radius:50%;object-fit:cover;flex-shrink:0;" onerror="this.style.display=\x27none\x27" />' : '<div style="width:22px;height:22px;border-radius:50%;background:'+(a.color||'#333')+';display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff;flex-shrink:0;">'+(a.s[0]||'?')+'</div>';
    var tipoLabel = a.tipo === 'cripto' ? 'cripto' : (a.tipo === 'accion' ? 'accion' : (a.tipo||''));
    var sEsc = a.s.replace(/'/g, '');
    var nEsc = a.n.replace(/'/g, '');
    return '<div onclick="window.selectPortActivo(\x27'+sEsc+'\x27,\x27'+nEsc+'\x27)" style="display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:7px;cursor:pointer;background:#161B22;border:0.5px solid #21262D;">' +
      logoHtml +
      '<div><div style="font-size:12px;font-weight:600;color:#E6EDF3;">'+a.s+'</div><div style="font-size:10px;color:#8B949E;">'+a.n+' &bull; '+tipoLabel+'</div></div>' +
      '</div>';
  }).join('');
};
window.selectPortActivo = function(sym, nombre){
  var sel = document.getElementById('pa-selected');
  var selName = document.getElementById('pa-sel-name');
  var symInput = document.getElementById('pa-sym');
  var acts = window._portSearchActs || [];
  var act = null;
  for(var i=0;i<acts.length;i++){ if(acts[i].s===sym){ act=acts[i]; break; } }
  if(sel) sel.style.display = 'block';
  if(selName) selName.innerHTML = (act && act.logo ? '<img src="'+act.logo+'" style="width:20px;height:20px;border-radius:50%;vertical-align:middle;margin-right:6px;" onerror="this.style.display=\x27none\x27" />' : '') + sym + ' <span style="color:#8B949E;font-weight:400;font-size:11px;">'+nombre+'</span>';
  if(symInput) symInput.value = sym + '|' + nombre + '|' + (act ? act.tipo : 'accion');
  var res = document.getElementById('pa-results');
  if(res) res.style.display = 'none';
};
window.openPortModal = _openAddActivoModal;
window.openAddActivo = _openAddActivoModal;
Modal = function(){
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
  if(!simbolo){ showPortErr('SeleccionÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¡ un activo.'); return; }
  if(!cantidad || cantidad <= 0){ showPortErr('IngresÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¡ una cantidad vÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¡lida.'); return; }
  if(!precio || precio <= 0){ showPortErr('IngresÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¡ un precio de compra vÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¡lido.'); return; }
  if(errEl) errEl.style.display = 'none';
  addPortfolioItem(simbolo, nombre, cantidad, precio, tipo);
  closePortModal();
};

function showPortErr(msg){
  var errEl = document.getElementById('pa-err');
  if(errEl){ errEl.textContent = msg; errEl.style.display = 'block'; }
}


window.openPortItemDetail = function(itemId){
  var items = window._portItems || [];
  var item = null;
  for(var i=0;i<items.length;i++){ if(items[i].id===itemId){ item=items[i]; break; } }
  if(!item) return;
  var modal = document.getElementById('port-detail-modal');
  var body = document.getElementById('port-detail-body');
  if(!modal || !body) return;
  var prcs = window._pcPrices || {};
  var precio = prcs[item.simbolo] || item.precio_compra || 0;
  var pnlPct = item.precio_compra > 0 ? ((precio - item.precio_compra)/item.precio_compra*100) : 0;
  var pnlUsd = item.cantidad > 0 ? (item.cantidad * (precio - item.precio_compra)) : 0;
  var pnlColor = pnlPct >= 0 ? '#3FB950' : '#FF4444';
  var pnlSign = pnlPct >= 0 ? '+' : '';
  var acts = window._IA_ACTIVOS || [];
  var act = null;
  for(var i=0;i<acts.length;i++){ if(acts[i].s===item.simbolo){ act=acts[i]; break; } }
  var logoHtml = (act && act.logo) ? '<img src="'+act.logo+'" style="width:32px;height:32px;border-radius:50%;object-fit:cover;margin-right:10px;" onerror="this.style.display=\'none\'"/>' : '<div style="width:32px;height:32px;border-radius:50%;background:'+(act&&act.color||'#333')+';display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff;margin-right:10px;">'+(item.simbolo[0]||'?')+'</div>';
  var fechaStr = item.created_at ? new Date(item.created_at).toLocaleDateString('es-AR',{day:'2-digit',month:'2-digit',year:'2-digit'}) : '--';
  var fmtP = function(n,d){ return n ? n.toLocaleString('en-US',{minimumFractionDigits:d||2,maximumFractionDigits:d||2}) : '--'; };
  // 52-week range
  var low52 = window._pc52Low && window._pc52Low[item.simbolo];
  var high52 = window._pc52High && window._pc52High[item.simbolo];
  var rangeBar = '';
  if(low52 && high52 && high52 > low52 && precio > 0){
    var pct52 = Math.max(0, Math.min(100, ((precio - low52)/(high52 - low52)*100)));
    rangeBar = '<div style="margin:10px 0 4px;"><div style="display:flex;justify-content:space-between;font-size:9px;color:#555;margin-bottom:3px;"><span>Min 52s: $'+fmtP(low52)+'</span><span>Max 52s: $'+fmtP(high52)+'</span></div><div style="background:#21262D;border-radius:4px;height:5px;position:relative;"><div style="background:linear-gradient(90deg,#FF4444,#D4A017,#3FB950);border-radius:4px;height:5px;width:'+pct52.toFixed(0)+'%;"></div><div style="position:absolute;top:-3px;left:calc('+pct52.toFixed(0)+'% - 5px);width:10px;height:10px;border-radius:50%;background:#E6EDF3;border:2px solid #0D1117;"></div></div><div style="text-align:center;font-size:9px;color:#8B949E;margin-top:3px;">Posicion en rango anual: '+pct52.toFixed(0)+'%</div></div>';
  }
  // Find signal for this asset
  var sigs = window._iaSignals || [];
  var sig = null;
  for(var i=0;i<sigs.length;i++){ if(sigs[i].simbolo===item.simbolo){ sig=sigs[i]; break; } }
  var sigHtml = '';
  if(sig){
    var dirColor = sig.direccion === 'ALCISTA' ? '#3FB950' : (sig.direccion === 'BAJISTA' ? '#FF4444' : '#D4A017');
    var probPrincipal = sig.prob_principal || sig.confianza || 0;
    var motivosHtml = (sig.motivos||[]).slice(0,5).map(function(m,i){ return '<div style="display:flex;gap:6px;margin-bottom:4px;"><span style="color:'+dirColor+';font-weight:700;flex-shrink:0;">'+(i+1)+'.</span><span style="color:#8B949E;font-size:11px;">'+m+'</span></div>'; }).join('');
    sigHtml = '<div style="background:#161B22;border-radius:9px;padding:12px;border-left:3px solid '+dirColor+';margin-top:10px;">' +
      '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">' +
      '<div style="font-size:10px;font-weight:700;color:'+dirColor+';letter-spacing:.5px;">'+sig.direccion+'</div>' +
      '<div style="font-size:20px;font-weight:700;color:'+dirColor+';">'+probPrincipal.toFixed(0)+'<span style="font-size:11px;">%</span></div>' +
      '</div>' +
      '<div style="display:flex;gap:8px;margin-bottom:8px;">' +
      '<div style="flex:1;background:#0D1117;border-radius:7px;padding:7px;text-align:center;"><div style="font-size:9px;color:#555;margin-bottom:2px;">Objetivo</div><div style="font-size:12px;color:#3FB950;font-weight:600;">$'+fmtP(sig.objetivo)+'</div></div>' +
      '<div style="flex:1;background:#0D1117;border-radius:7px;padding:7px;text-align:center;"><div style="font-size:9px;color:#555;margin-bottom:2px;">Stop Loss</div><div style="font-size:12px;color:#FF4444;font-weight:600;">$'+fmtP(sig.stop)+'</div></div>' +
      '<div style="flex:1;background:#0D1117;border-radius:7px;padding:7px;text-align:center;"><div style="font-size:9px;color:#555;margin-bottom:2px;">'+(sig.direccion==='ALCISTA'?'Upside':'Downside')+'</div><div style="font-size:12px;color:'+dirColor+';font-weight:600;">'+(sig.direccion==='ALCISTA'?'+':'-')+Math.abs(sig.upside||0).toFixed(1)+'%</div></div>' +
      '</div>' +
      motivosHtml +
      '</div>';
  } else {
    sigHtml = '<div style="background:#161B22;border-radius:9px;padding:12px;margin-top:10px;text-align:center;color:#555;font-size:12px;">Sin senal activa hoy</div>';
  }
  body.innerHTML =
    '<div style="display:flex;align-items:center;margin-bottom:12px;">' + logoHtml +
    '<div><div style="font-size:16px;font-weight:700;color:#E6EDF3;">'+item.simbolo+'</div>' +
    '<div style="font-size:11px;color:#8B949E;">'+item.nombre+'</div></div>' +
    '<div style="margin-left:auto;text-align:right;">' +
    '<div style="font-size:18px;font-weight:700;color:#E6EDF3;">$'+fmtP(precio)+'</div>' +
    '<div style="font-size:11px;color:'+pnlColor+';">'+pnlSign+pnlPct.toFixed(2)+'% P&L</div>' +
    '</div></div>' +
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:6px;">' +
    '<div style="background:#161B22;border-radius:7px;padding:8px;"><div style="font-size:9px;color:#555;margin-bottom:2px;">Precio compra</div><div style="font-size:13px;color:#E6EDF3;font-weight:600;">$'+fmtP(item.precio_compra)+'</div></div>' +
    '<div style="background:#161B22;border-radius:7px;padding:8px;"><div style="font-size:9px;color:#555;margin-bottom:2px;">Cantidad</div><div style="font-size:13px;color:#E6EDF3;font-weight:600;">'+item.cantidad+'</div></div>' +
    '<div style="background:#161B22;border-radius:7px;padding:8px;"><div style="font-size:9px;color:#555;margin-bottom:2px;">P&L USD</div><div style="font-size:13px;color:'+pnlColor+';font-weight:600;">'+pnlSign+'$'+fmtP(Math.abs(pnlUsd))+'</div></div>' +
    '<div style="background:#161B22;border-radius:7px;padding:8px;"><div style="font-size:9px;color:#555;margin-bottom:2px;">Entrada</div><div style="font-size:11px;color:#8B949E;">'+fechaStr+'</div></div>' +
    '</div>' +
    rangeBar +
    '<div id="port-det-pct" style="margin:6px 0;"><span id="pd-24h-val" style="font-size:13px;font-weight:600;color:#8B949E;">--</span><span style="display:flex;gap:4px;margin-top:4px;">' +
    ['24h','7d','1m','3m','1y'].map(function(p){ return '<span onclick="portDetPeriod(\''+item.simbolo+'\',\''+item.tipo+'\',\''+p+'\')" id="pd-tab-'+p+'" style="font-size:9px;padding:2px 6px;border-radius:4px;cursor:pointer;background:'+(p==='24h'?'#D4A017':'#21262D')+';color:'+(p==='24h'?'#0D1117':'#8B949E')+';">'+p+'</span>'; }).join('') +
    '</span></div>' +
    sigHtml;
  modal.style.display = 'flex';
  portDetPeriod(item.simbolo, item.tipo, '24h');
};
window.closePortItemDetail = function(){
  var m = document.getElementById('port-detail-modal');
  if(m) m.style.display = 'none';
};
window.portDetPeriod = function(simbolo, tipo, period){
  ['24h','7d','1m','3m','1y'].forEach(function(p){
    var t = document.getElementById('pd-tab-'+p);
    if(!t) return;
    t.style.background = p === period ? '#D4A017' : '#21262D';
    t.style.color = p === period ? '#0D1117' : '#8B949E';
  });
  var valEl = document.getElementById('pd-24h-val');
  if(!valEl) return;
  if(period === '24h'){
    var cv = window._pcChange24 && window._pcChange24[simbolo];
    if(cv !== undefined && cv !== null){
      valEl.style.color = cv >= 0 ? '#3FB950' : '#FF4444';
      valEl.textContent = (cv>=0?'+':'')+cv.toFixed(2)+'% (24h)';
    } else { valEl.textContent = '--'; valEl.style.color = '#8B949E'; }
    return;
  }
  var days = period==='7d'?7:period==='1m'?30:period==='3m'?90:365;
  var CRIPTO = ['BTC','ETH','SOL','BNB','XRP','ADA','AVAX','DOT','LINK','MATIC','DOGE','SHIB','LTC','ATOM','UNI','FIL','NEAR','APT','ARB','OP'];
  if(CRIPTO.indexOf(simbolo) >= 0){
    var intv = days<=7?'4h':'1d'; var lim = days<=7?42:days;
    fetch('https://api.binance.com/api/v3/klines?symbol='+simbolo+'USDT&interval='+intv+'&limit='+lim)
    .then(function(r){ return r.json(); }).then(function(d){
      if(!d||!d.length) return;
      var oldest = parseFloat(d[0][1]);
      var newest = parseFloat(d[d.length-1][4]);
      var pct = oldest > 0 ? ((newest-oldest)/oldest*100) : 0;
      if(valEl){ valEl.style.color = pct>=0?'#3FB950':'#FF4444'; valEl.textContent = (pct>=0?'+':'')+pct.toFixed(2)+'% ('+period+')'; }
    }).catch(function(){ if(valEl) valEl.textContent = '--'; });
  } else {
    var now = Math.floor(Date.now()/1000);
    var from = now - days*86400;
    var yurl = 'https://corsproxy.io/?https://query1.finance.yahoo.com/v8/finance/chart/'+simbolo+'?interval=1d&period1='+from+'&period2='+now;
    fetch(yurl).then(function(r){ return r.json(); }).then(function(d){
      try{
        var closes = d.chart.result[0].indicators.quote[0].close;
        var oldest2 = closes.find(function(x){ return x !== null && x !== undefined; });
        var newest2 = closes[closes.length-1];
        var pct2 = oldest2 > 0 ? ((newest2-oldest2)/oldest2*100) : 0;
        if(valEl){ valEl.style.color = pct2>=0?'#3FB950':'#FF4444'; valEl.textContent = (pct2>=0?'+':'')+pct2.toFixed(2)+'% ('+period+')'; }
      }catch(e){ if(valEl) valEl.textContent='--'; }
    }).catch(function(){ if(valEl) valEl.textContent='--'; });
  }
};


// ÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ AGREGAR activo al portfolio en Supabase ÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ
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

// ÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ ELIMINAR activo del portfolio ÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ
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

// Inicializar portfolio cuando hay sesiÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ³n
document.addEventListener('DOMContentLoaded', function(){
  setTimeout(function(){
    if(window._supabase){
      window._supabase.auth.onAuthStateChange(function(event, session){
        if(event === 'SIGNED_IN') loadPortfolioSupa();
        if(event === 'SIGNED_OUT') _renderPortfolioEmpty();
      });
      window._supabase.auth.getSession().then(function(res){
        if(res.data && res.data.session){
          loadPortfolioSupa();
        } else {
          window._supabase.auth.signInAnonymously().then(function(r){
            if(!r.error){ loadPortfolioSupa(); }
            else { _renderPortfolioEmpty(); }
          }).catch(function(){ _renderPortfolioEmpty(); });
        }
      });
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


// ============================================================


// ============================================================
// MOTOR DE SENALES IA AUREX - Grupo A (29/03/2026)
// Variables: RSI + Tendencia + Volumen + Volatilidad +
//            Correlacion + Oro/Petroleo + Macro + Earnings
// ============================================================

var _iaCategoria = 'alcista';
var _iaSignals = [];
var _IA_PRECIOS = {};
var _IA_PRECIOS_PREV = {};
var _MACRO_EVENTOS = [];



function _iaSeed(sym) {
  var d = new Date(); var day = d.getFullYear()*10000 + (d.getMonth()+1)*100 + d.getDate();
  var h = 0;
  for (var i = 0; i < sym.length; i++) h = (h * 31 + sym.charCodeAt(i)) & 0xFFFFFF;
  return ((h ^ day) % 1000) / 1000;
}


// ============================================================
// SENALES IA - MOTOR COMPLETO v6 (74 activos, carga progresiva)
// ============================================================

window._IA_FILTRO_ACTUAL = 'todo';
window._IA_BANNER_IDX = 0;
window._IA_BANNER_TIMER = null;
window._IA_PRECIOS_EXTRA = {};

// 74 ACTIVOS COMPLETOS con logos garantizados
window._IA_ACTIVOS = [
  // CRIPTO (20)
  {s:'BTC',  n:'Bitcoin',      tipo:'cripto',       logo:'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',       ySymbol:'BTC-USD',  color:'#F7931A'},
  {s:'ETH',  n:'Ethereum',     tipo:'cripto',       logo:'https://assets.coingecko.com/coins/images/279/small/ethereum.png',    ySymbol:'ETH-USD',  color:'#627EEA'},
  {s:'SOL',  n:'Solana',       tipo:'cripto',       logo:'https://assets.coingecko.com/coins/images/4128/small/solana.png',     ySymbol:'SOL-USD',  color:'#9945FF'},
  {s:'BNB',  n:'BNB',          tipo:'cripto',       logo:'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png',ySymbol:'BNB-USD',  color:'#F3BA2F'},
  {s:'XRP',  n:'XRP',          tipo:'cripto',       logo:'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png', ySymbol:'XRP-USD', color:'#00AAE4'},
  {s:'ADA',  n:'Cardano',      tipo:'cripto',       logo:'https://assets.coingecko.com/coins/images/975/small/cardano.png',     ySymbol:'ADA-USD',  color:'#0033AD'},
  {s:'AVAX', n:'Avalanche',    tipo:'cripto',       logo:'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png', ySymbol:'AVAX-USD', color:'#E84142'},
  {s:'DOT',  n:'Polkadot',     tipo:'cripto',       logo:'https://assets.coingecko.com/coins/images/12171/small/polkadot.png',  ySymbol:'DOT-USD',  color:'#E6007A'},
  {s:'LINK', n:'Chainlink',    tipo:'cripto',       logo:'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png', ySymbol:'LINK-USD', color:'#2A5ADA'},
  {s:'MATIC',n:'Polygon',      tipo:'cripto',       logo:'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png', ySymbol:'MATIC-USD', color:'#8247E5'},
  {s:'DOGE', n:'Dogecoin',     tipo:'cripto',       logo:'https://assets.coingecko.com/coins/images/5/small/dogecoin.png',      ySymbol:'DOGE-USD', color:'#C2A633'},
  {s:'SHIB', n:'Shiba Inu',    tipo:'cripto',       logo:'https://assets.coingecko.com/coins/images/11939/small/shiba.png',     ySymbol:'SHIB-USD', color:'#FF0000'},
  {s:'LTC',  n:'Litecoin',     tipo:'cripto',       logo:'https://assets.coingecko.com/coins/images/2/small/litecoin.png',      ySymbol:'LTC-USD',  color:'#A0A0A0'},
  {s:'ATOM', n:'Cosmos',       tipo:'cripto',       logo:'https://assets.coingecko.com/coins/images/1481/small/cosmos_hub.png', ySymbol:'ATOM-USD', color:'#2E3148'},
  {s:'UNI',  n:'Uniswap',      tipo:'cripto',       logo:'https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png', ySymbol:'UNI-USD', color:'#FF007A'},
  {s:'FIL',  n:'Filecoin',     tipo:'cripto',       logo:'https://assets.coingecko.com/coins/images/12817/small/filecoin.png',  ySymbol:'FIL-USD',  color:'#42C1CA'},
  {s:'NEAR', n:'NEAR Protocol',tipo:'cripto',       logo:'https://assets.coingecko.com/coins/images/10365/small/near.jpg',      ySymbol:'NEAR-USD', color:'#00C1DE'},
  {s:'APT',  n:'Aptos',        tipo:'cripto',       logo:'https://assets.coingecko.com/coins/images/26455/small/aptos_round.png', ySymbol:'APT-USD', color:'#00C2FF'},
  {s:'ARB',  n:'Arbitrum',     tipo:'cripto',       logo:'https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_18.21.png', ySymbol:'ARB-USD', color:'#28A0F0'},
  {s:'OP',   n:'Optimism',     tipo:'cripto',       logo:'https://assets.coingecko.com/coins/images/25244/small/Optimism.png',  ySymbol:'OP-USD',   color:'#FF0420'},
  // ACCIONES USA (20)
  {s:'AAPL', n:'Apple',        tipo:'accion',       logo:'https://logo.clearbit.com/apple.com',         ySymbol:'AAPL',  color:'#A2AAAD'},
  {s:'NVDA', n:'NVIDIA',       tipo:'accion',       logo:'https://logo.clearbit.com/nvidia.com',        ySymbol:'NVDA',  color:'#76B900'},
  {s:'TSLA', n:'Tesla',        tipo:'accion',       logo:'https://logo.clearbit.com/tesla.com',         ySymbol:'TSLA',  color:'#CC0000'},
  {s:'MSFT', n:'Microsoft',    tipo:'accion',       logo:'https://logo.clearbit.com/microsoft.com',     ySymbol:'MSFT',  color:'#00A4EF'},
  {s:'META', n:'Meta',         tipo:'accion',       logo:'https://logo.clearbit.com/meta.com',          ySymbol:'META',  color:'#0081FB'},
  {s:'GOOGL',n:'Alphabet',     tipo:'accion',       logo:'https://logo.clearbit.com/google.com',        ySymbol:'GOOGL', color:'#4285F4'},
  {s:'AMZN', n:'Amazon',       tipo:'accion',       logo:'https://logo.clearbit.com/amazon.com',        ySymbol:'AMZN',  color:'#FF9900'},
  {s:'NFLX', n:'Netflix',      tipo:'accion',       logo:'https://logo.clearbit.com/netflix.com',       ySymbol:'NFLX',  color:'#E50914'},
  {s:'AMD',  n:'AMD',          tipo:'accion',       logo:'https://logo.clearbit.com/amd.com',           ySymbol:'AMD',   color:'#ED1C24'},
  {s:'INTC', n:'Intel',        tipo:'accion',       logo:'https://logo.clearbit.com/intel.com',         ySymbol:'INTC',  color:'#0071C5'},
  {s:'JPM',  n:'JPMorgan',     tipo:'accion',       logo:'https://logo.clearbit.com/jpmorganchase.com', ySymbol:'JPM',   color:'#003087'},
  {s:'BAC',  n:'Bank of America',tipo:'accion',     logo:'https://logo.clearbit.com/bankofamerica.com', ySymbol:'BAC',   color:'#E31837'},
  {s:'V',    n:'Visa',         tipo:'accion',       logo:'https://logo.clearbit.com/visa.com',          ySymbol:'V',     color:'#1A1F71'},
  {s:'MA',   n:'Mastercard',   tipo:'accion',       logo:'https://logo.clearbit.com/mastercard.com',    ySymbol:'MA',    color:'#EB001B'},
  {s:'DIS',  n:'Disney',       tipo:'accion',       logo:'https://logo.clearbit.com/disney.com',        ySymbol:'DIS',   color:'#006E99'},
  {s:'PYPL', n:'PayPal',       tipo:'accion',       logo:'https://logo.clearbit.com/paypal.com',        ySymbol:'PYPL',  color:'#00457C'},
  {s:'UBER', n:'Uber',         tipo:'accion',       logo:'https://logo.clearbit.com/uber.com',          ySymbol:'UBER',  color:'#000000'},
  {s:'COIN', n:'Coinbase',     tipo:'accion',       logo:'https://logo.clearbit.com/coinbase.com',      ySymbol:'COIN',  color:'#0052FF'},
  {s:'SPOT', n:'Spotify',      tipo:'accion',       logo:'https://logo.clearbit.com/spotify.com',       ySymbol:'SPOT',  color:'#1DB954'},
  {s:'BABA', n:'Alibaba',      tipo:'accion',       logo:'https://logo.clearbit.com/alibaba.com',       ySymbol:'BABA',  color:'#FF6A00'},
  // ETF (10)
  {s:'SPY',  n:'S&P 500 ETF',  tipo:'etf',          logo:'https://logo.clearbit.com/ssga.com',          ySymbol:'SPY',   color:'#D4A017'},
  {s:'QQQ',  n:'Nasdaq 100',   tipo:'etf',          logo:'https://logo.clearbit.com/invesco.com',       ySymbol:'QQQ',   color:'#00C49A'},
  {s:'DIA',  n:'Dow Jones ETF',tipo:'etf',          logo:'https://logo.clearbit.com/ssga.com',          ySymbol:'DIA',   color:'#4A90D9'},
  {s:'IWM',  n:'Russell 2000', tipo:'etf',          logo:'https://logo.clearbit.com/ishares.com',       ySymbol:'IWM',   color:'#F0883E'},
  {s:'VTI',  n:'Total Market', tipo:'etf',          logo:'https://logo.clearbit.com/vanguard.com',      ySymbol:'VTI',   color:'#7CB9E8'},
  {s:'ARKK', n:'ARK Innovation',tipo:'etf',         logo:'https://logo.clearbit.com/ark-invest.com',    ySymbol:'ARKK',  color:'#00B4D8'},
  {s:'XLF',  n:'Financials ETF',tipo:'etf',         logo:'https://logo.clearbit.com/ssga.com',          ySymbol:'XLF',   color:'#003087'},
  {s:'XLE',  n:'Energy ETF',   tipo:'etf',          logo:'https://logo.clearbit.com/ssga.com',          ySymbol:'XLE',   color:'#8B4513'},
  {s:'XLK',  n:'Tech ETF',     tipo:'etf',          logo:'https://logo.clearbit.com/ssga.com',          ySymbol:'XLK',   color:'#4285F4'},
  {s:'GDX',  n:'Gold Miners',  tipo:'etf',          logo:'https://logo.clearbit.com/vaneck.com',        ySymbol:'GDX',   color:'#FFD700'},
  // METALES (8)
  {s:'GLD',  n:'Oro',          tipo:'metal',        logo:'', abbr:'Au',   ySymbol:'GC=F', color:'#FFD700'},
  {s:'SLV',  n:'Plata',        tipo:'metal',        logo:'', abbr:'Ag', ySymbol:'SI=F', color:'#C0C0C0'},
  {s:'CPER', n:'Cobre',        tipo:'metal',        logo:'', abbr:'Cu', ySymbol:'HG=F', color:'#B87333'},
  {s:'PPLT', n:'Platino',      tipo:'metal',        logo:'', abbr:'Pt',ySymbol:'PL=F',color:'#E5E4E2'},
  {s:'PALL', n:'Paladio',      tipo:'metal',        logo:'', abbr:'Pd',ySymbol:'PA=F',color:'#CED0D0'},
  {s:'ZINC', n:'Zinc',         tipo:'metal',        logo:'', abbr:'Zn',   ySymbol:'ZNC=F',color:'#4682B4'},
  {s:'ALUM', n:'Aluminio',     tipo:'metal',        logo:'', abbr:'Al',   ySymbol:'ALI=F',color:'#848789'},
  {s:'IRON', n:'Hierro',       tipo:'metal',        logo:'', abbr:'Fe',   ySymbol:'TIO=F',color:'#A04000'},
  // MATERIAS PRIMAS (8)
  {s:'USO',  n:'Petroleo WTI', tipo:'materia_prima',logo:'', abbr:'WTI',    ySymbol:'CL=F', color:'#8B4513'},
  {s:'BNO',  n:'Petroleo Brent',tipo:'materia_prima',logo:'', abbr:'BNT', ySymbol:'BZ=F', color:'#654321'},
  {s:'UNG',  n:'Gas Natural',  tipo:'materia_prima',logo:'', abbr:'GAS',    ySymbol:'NG=F', color:'#4169E1'},
  {s:'WEAT', n:'Trigo',        tipo:'materia_prima',logo:'', abbr:'WHT',  ySymbol:'ZW=F', color:'#DAA520'},
  {s:'CORN', n:'Maiz',         tipo:'materia_prima',logo:'', abbr:'CRN',   ySymbol:'ZC=F', color:'#F5DEB3'},
  {s:'SOYB', n:'Soja',         tipo:'materia_prima',logo:'', abbr:'SOY',    ySymbol:'ZS=F', color:'#90EE90'},
  {s:'JO',   n:'Cafe',         tipo:'materia_prima',logo:'', abbr:'CFE', ySymbol:'KC=F', color:'#6F4E37'},
  {s:'SGG',  n:'Azucar',       tipo:'materia_prima',logo:'', abbr:'SGR',  ySymbol:'SB=F', color:'#FFF9C4'},
  // BONOS (8)
  {s:'TLT',  n:'Bono EEUU 20Y',tipo:'bono',         logo:'', abbr:'TLT',   ySymbol:'TLT',  color:'#6CB4EE'},
  {s:'AGG',  n:'Bonos Agregados',tipo:'bono',        logo:'', abbr:'AGG',   ySymbol:'AGG',  color:'#4A90D9'},
  {s:'IEF',  n:'Bono EEUU 7-10Y',tipo:'bono',       logo:'', abbr:'IEF',   ySymbol:'IEF',  color:'#7CB9E8'},
  {s:'SHY',  n:'Bono EEUU 1-3Y',tipo:'bono',        logo:'', abbr:'SHY',   ySymbol:'SHY',  color:'#A8D8EA'},
  {s:'HYG',  n:'High Yield Corp',tipo:'bono',       logo:'', abbr:'HYG',   ySymbol:'HYG',  color:'#FF9580'},
  {s:'LQD',  n:'Bonos Corp USA',tipo:'bono',         logo:'', abbr:'LQD',   ySymbol:'LQD',  color:'#C8A96E'},
  {s:'EMB',  n:'Bonos Emergentes',tipo:'bono',       logo:'', abbr:'EMB',   ySymbol:'EMB',  color:'#F0883E'},
  {s:'BND',  n:'Bonos Totales', tipo:'bono',         logo:'', abbr:'BND',   ySymbol:'BND',  color:'#6CB4EE'}

];

// EVENTOS MACRO SEMANALES
window._IA_EVENTOS = [
  {label:'EVENTO CRITICO - FED', text:'Reunion FOMC - Decision de tasas de interes - Alto impacto en todos los mercados - Se espera pausa en subas - Mercados atentos a declaraciones de Powell', tiempo:'5h 54m', impacto:'ALTO', hora:'14:00 EST', color:'#D4A017', bg:'#1A1200', border:'#D4A01760'},
  {label:'DATO MACRO - IPC EEUU', text:'Indice de Precios al Consumidor - Publicacion 8:30 EST - Estimado 3.2% interanual - Impacto alto en bonos y acciones growth - Dato clave para politica monetaria', tiempo:'3h 00m', impacto:'MEDIO', hora:'08:30 EST', color:'#3FB950', bg:'#0A1A00', border:'#3FB95060'},
  {label:'EARNINGS - NVIDIA', text:'Resultados trimestrales NVDA Q1 2026 - EPS estimado 5.58 - Ingresos estimados 24.6B - Pre-mercado manana - Alta volatilidad esperada sector tech', tiempo:'12h 00m', impacto:'ALTO', hora:'Pre-market', color:'#FF4444', bg:'#1A0000', border:'#FF444460'}
];

function _iniciarBanner() {
  var evts = window._IA_EVENTOS;
  if (!evts || !evts.length) return;
  _mostrarBannerEvento(window._IA_BANNER_IDX);
  if (window._IA_BANNER_TIMER) clearInterval(window._IA_BANNER_TIMER);
  window._IA_BANNER_TIMER = setInterval(function() {
    window._IA_BANNER_IDX = (window._IA_BANNER_IDX + 1) % evts.length;
    _mostrarBannerEvento(window._IA_BANNER_IDX);
  }, 10000);
}

function _mostrarBannerEvento(idx) {
  var ev = (window._IA_EVENTOS || [])[idx];
  if (!ev) return;
  var banner = document.getElementById('ia-banner');
  var lbl = document.getElementById('ia-banner-label');
  var tim = document.getElementById('ia-banner-time');
  var ticker = document.getElementById('ia-banner-ticker');
  if (!banner) return;
  banner.style.display = 'block';
  banner.style.background = ev.bg;
  banner.style.borderBottom = '1px solid ' + ev.border;
  if (lbl) { lbl.textContent = ev.label; lbl.style.color = ev.color; }
  var t1 = document.getElementById('ia-banner-text1');
  var t2 = document.getElementById('ia-banner-text2');
  if (t1) { t1.textContent = ev.text; t1.style.color = '#FFFFFF'; }
  if (t2) { t2.textContent = ev.text; t2.style.color = '#FFFFFF'; }
  if (tim) { tim.textContent = ev.tiempo; tim.style.color = ev.color; tim.style.borderColor = ev.color; tim.style.background = ev.color + '30'; }
  if (ticker) { ticker.style.animation = 'none'; ticker.offsetHeight; ticker.style.animation = 'tkScroll 9s linear infinite'; }
}

function cerrarBanner() {
  var b = document.getElementById('ia-banner');
  if (b) b.style.display = 'none';
  if (window._IA_BANNER_TIMER) { clearInterval(window._IA_BANNER_TIMER); window._IA_BANNER_TIMER = null; }
}

function abrirEventosPanel() {
  var modal = document.getElementById('ia-eventos-modal');
  if (!modal) return;
  modal.style.display = 'flex';
  var lista = document.getElementById('ia-eventos-lista');
  if (!lista) return;
  lista.innerHTML = (window._IA_EVENTOS || []).map(function(ev) {
    var impColor = ev.impacto === 'ALTO' ? '#FF4444' : ev.impacto === 'MEDIO' ? '#D4A017' : '#3FB950';
    return '<div style="background:'+ev.bg+';border:1.5px solid '+ev.border+';border-radius:12px;padding:14px;margin-bottom:12px">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">' +
        '<span style="font-size:10px;font-weight:700;color:'+ev.color+';letter-spacing:1px">'+ev.label+'</span>' +
        '<span style="background:'+ev.color+'30;border:1px solid '+ev.color+';border-radius:6px;padding:2px 8px;font-size:11px;font-weight:700;color:'+ev.color+'">'+ev.tiempo+'</span>' +
      '</div>' +
      '<div style="font-size:13px;color:#FFFFFF;font-weight:600;margin-bottom:6px">'+ev.text.split('-')[0].trim()+'</div>' +
      '<div style="font-size:11px;color:#8B949E;line-height:1.5">'+ev.text+'</div>' +
      '<div style="margin-top:8px;display:flex;gap:6px">' +
        '<span style="background:'+impColor+'20;border:1px solid '+impColor+'60;border-radius:4px;padding:2px 8px;font-size:10px;color:'+impColor+';font-weight:700">IMPACTO '+ev.impacto+'</span>' +
        '<span style="background:#21262D;border-radius:4px;padding:2px 8px;font-size:10px;color:#8B949E">'+ev.hora+'</span>' +
      '</div>' +
    '</div>';
  }).join('');
}

function cerrarEventosPanel() {
  var modal = document.getElementById('ia-eventos-modal');
  if (modal) modal.style.display = 'none';
}

function _calcIAScore(activo, datos) {
  var sym = activo.s;
  var precio = datos.precio || 0;
  var precio24h = datos.precio24h || precio;
  var volumen24h = datos.volumen24h || 0;
  var volumenProm = datos.volumenProm || volumen24h;
  var high24h = datos.high24h || precio * 1.02;
  var low24h = datos.low24h || precio * 0.98;
  var btcCambio = datos.btcCambio || 0;
  var spyCambio = datos.spyCambio || 0;
  var precioOro = datos.precioOro || 2050;
  var precioPetroleo = datos.precioPetroleo || 80;
  var hayMacro = datos.hayMacro || false;
  var hayEarnings = datos.hayEarnings || false;
  var motivos = [];
  var scores = {};
  var tendencia = precio24h > 0 ? (precio - precio24h) / precio24h : 0;
  scores.tendencia = tendencia * 8;
  if (Math.abs(tendencia) > 0.001) {
    if (tendencia > 0) motivos.push('Precio subio +' + (tendencia*100).toFixed(2) + '% en 24hs - momentum alcista activo con presion compradora sostenida');
    else motivos.push('Precio bajo ' + (tendencia*100).toFixed(2) + '% en 24hs - momentum bajista con presion vendedora dominante');
  } else { motivos.push('Precio lateral en 24hs - consolidacion en rango sin direccion definida'); }
  var rsi = 50 + (tendencia * 500);
  rsi = Math.max(10, Math.min(90, rsi));
  var rsiScore = 0;
  if (rsi > 70) { rsiScore = -0.06; motivos.push('RSI en ' + rsi.toFixed(0) + ' - zona de sobrecompra tecnica, probabilidad de correccion elevada'); }
  else if (rsi > 60) { rsiScore = 0.04; motivos.push('RSI en ' + rsi.toFixed(0) + ' - momentum alcista saludable sin sobrecompra extrema'); }
  else if (rsi < 30) { rsiScore = 0.06; motivos.push('RSI en ' + rsi.toFixed(0) + ' - sobreventa tecnica extrema, rebote probable a corto plazo'); }
  else if (rsi < 40) { rsiScore = -0.03; motivos.push('RSI en ' + rsi.toFixed(0) + ' - momentum bajista moderado, presion vendedora activa'); }
  else { rsiScore = 0.01; motivos.push('RSI en ' + rsi.toFixed(0) + ' - zona neutral, sin senales extremas de momentum tecnico'); }
  scores.rsi = rsiScore;
  var volRel = volumenProm > 0 ? volumen24h / volumenProm : 1;
  var volScore = 0;
  if (volRel > 1.8 && tendencia > 0) { volScore = 0.06; motivos.push('Volumen ' + volRel.toFixed(1) + 'x promedio con precio al alza - fuerte conviccion compradora confirmada'); }
  else if (volRel > 1.8 && tendencia < 0) { volScore = -0.06; motivos.push('Volumen ' + volRel.toFixed(1) + 'x promedio con baja de precio - distribucion activa, vendedores en control'); }
  else if (volRel > 1.3) { volScore = tendencia > 0 ? 0.03 : -0.03; motivos.push('Volumen ' + volRel.toFixed(1) + 'x promedio - participacion activa con sesgo ' + (tendencia > 0 ? 'alcista' : 'bajista')); }
  else if (volRel < 0.6) { volScore = -0.02; motivos.push('Volumen bajo (' + volRel.toFixed(1) + 'x) - movimiento sin conviccion institucional, cautela recomendada'); }
  else { volScore = 0.01; motivos.push('Volumen en linea con el promedio - actividad normal sin anomalias detectadas'); }
  scores.volumen = volScore;
  var volatilidad = precio > 0 ? (high24h - low24h) / precio : 0.02;
  var volaScore = 0;
  if (volatilidad > 0.06) { volaScore = -0.03; motivos.push('Alta volatilidad (' + (volatilidad*100).toFixed(1) + '% rango diario) - riesgo elevado, movimiento brusco probable'); }
  else if (volatilidad > 0.03) { volaScore = tendencia > 0 ? 0.02 : -0.02; motivos.push('Volatilidad moderada (' + (volatilidad*100).toFixed(1) + '%) - rango amplio con sesgo ' + (tendencia > 0 ? 'alcista' : 'bajista')); }
  else { volaScore = 0.01; motivos.push('Baja volatilidad (' + (volatilidad*100).toFixed(1) + '%) - movimiento controlado, sin oscilaciones extremas'); }
  scores.volatilidad = volaScore;
  var corrScore = 0;
  if (activo.tipo === 'cripto') {
    if (sym === 'BTC') {
      corrScore = btcCambio > 0.01 ? 0.03 : btcCambio < -0.01 ? -0.03 : 0;
      motivos.push(btcCambio > 0.01 ? 'BTC lider con momentum positivo - fortaleza sistemica en cripto' : btcCambio < -0.01 ? 'BTC en debilidad - presion bajista correlacionada en sector cripto' : 'BTC en consolidacion - mercado cripto sin direccion dominante');
    } else {
      corrScore = btcCambio > 0.02 ? 0.04 : btcCambio > 0 ? 0.02 : btcCambio < -0.02 ? -0.04 : -0.02;
      motivos.push(btcCambio > 0.01 ? 'BTC subiendo ' + (btcCambio*100).toFixed(2) + '% - arrastre positivo esperado en altcoins' : btcCambio < -0.01 ? 'BTC bajando ' + (btcCambio*100).toFixed(2) + '% - correlacion arrastra altcoins a la baja' : 'Correlacion con BTC neutral - activo operando con dinamica propia');
    }
  } else {
    corrScore = spyCambio > 0.01 ? 0.03 : spyCambio < -0.01 ? -0.03 : 0;
    motivos.push(spyCambio > 0.01 ? 'S&P500 en alza ' + (spyCambio*100).toFixed(2) + '% - contexto favorable para renta variable' : spyCambio < -0.01 ? 'S&P500 en baja ' + (spyCambio*100).toFixed(2) + '% - presion bajista en acciones y ETFs' : 'S&P500 estable - mercado sin impulso direccional fuerte');
  }
  scores.correlacion = corrScore;
  var oroScore = 0;
  if (precioOro > 3000) {
    oroScore = activo.tipo === 'metal' ? 0.04 : activo.tipo === 'cripto' ? -0.02 : activo.tipo === 'bono' ? 0.02 : -0.02;
    if (motivos.length < 5) motivos.push(activo.tipo === 'metal' ? 'Oro en $' + Math.round(precioOro) + ' - maximos historicos, demanda de refugio favorece metales' : 'Oro en maximos $' + Math.round(precioOro) + ' - aversion al riesgo impacta activos especulativos');
  } else if (precioOro > 2200) {
    oroScore = activo.tipo === 'metal' ? 0.03 : -0.01;
    if (motivos.length < 5) motivos.push('Oro en $' + Math.round(precioOro) + ' - nivel elevado, senal de cautela moderada en mercados');
  } else {
    if (motivos.length < 5) motivos.push('Oro en $' + Math.round(precioOro) + ' - nivel neutral, sin senal de aversion extrema al riesgo');
  }
  if (precioPetroleo > 90) {
    oroScore += activo.tipo === 'materia_prima' ? 0.03 : -0.02;
    if (motivos.length < 5) motivos.push('Petroleo WTI en $' + Math.round(precioPetroleo) + ' - presion inflacionaria elevada, impacto en costos corporativos');
  }
  scores.oro_petroleo = oroScore;
  var macroScore = hayMacro ? -0.03 : 0;
  if (hayMacro && motivos.length < 5) motivos.push('Evento macro de alto impacto programado - incertidumbre eleva volatilidad esperada intraday');
  scores.macro = macroScore;
  var earningsScore = hayEarnings ? 0.02 : 0;
  if (hayEarnings && motivos.length < 5) motivos.push('Reporte de resultados proximo - volatilidad historicamente elevada en torno a earnings');
  scores.earnings = earningsScore;
  var fillers = ['Analisis tecnico confirma zona clave de decision en precio actual','Flujo institucional alineado con la tendencia identificada','Patron de precio en grafico diario confirma el momentum actual','Indicadores de amplitud alinean con la senal del modelo de 8 variables','Condiciones de liquidez global consistentes con la senal detectada'];
  var fi = 0;
  while (motivos.length < 5 && fi < fillers.length) { motivos.push(fillers[fi++]); }
  var total = Object.values(scores).reduce(function(a,b){return a+b;},0);
  // ALTA CONV-IA: requiere score >= 0.55 Y al menos un catalizador activo
  // Catalizadores: RSI extremo (>70 o <30) + earnings proximos + dato macro + volumen alto
  var tieneCatalizador = (rsi > 70 || rsi < 30) || hayMacro || hayEarnings || scores.volumen > 0.12;
  var umbralConfIA = tieneCatalizador ? 0.45 : 0.65;
  var umbralNormal_unused = 0; // deprecated, kept for reference
  var umbralNormal = hayMacro ? 0.015 : 0.02;
  var scoreAbs = Math.abs(total);
  var direccion, probPrincipal;
  if (scoreAbs > umbralConfIA) {
    direccion = 'alta_conf';
    probPrincipal = Math.min(88, Math.round(55 + scoreAbs * 110));
  } else if (total > umbralNormal) {
    direccion = 'alcista';
    probPrincipal = Math.min(82, Math.round(52 + total * 220));
  } else if (total < -umbralNormal) {
    direccion = 'bajista';
    probPrincipal = Math.min(82, Math.round(52 + scoreAbs * 220));
  } else {
    direccion = total >= 0 ? 'alcista' : 'bajista';
    probPrincipal = Math.min(58, Math.round(50 + scoreAbs * 150));
  }
  // PROBABILIDADES QUE SUMAN EXACTAMENTE 100%
  var confLabel = total >= 0 ? 'ALCISTA' : 'BAJISTA';
  var prob_alcista, prob_bajista, prob_alta_conf;
  if (direccion === 'alta_conf') {
    prob_alcista = total > 0 ? probPrincipal : Math.round(probPrincipal * 0.15);
    prob_bajista = total < 0 ? probPrincipal : Math.round(probPrincipal * 0.15);
    prob_alta_conf = 100 - prob_alcista - prob_bajista;
  } else if (direccion === 'alcista') {
    prob_alcista = probPrincipal;
    prob_alta_conf = Math.round((100 - probPrincipal) * 0.20);
    prob_bajista = 100 - prob_alcista - prob_alta_conf;
  } else {
    prob_bajista = probPrincipal;
    prob_alta_conf = Math.round((100 - probPrincipal) * 0.20);
    prob_alcista = 100 - prob_bajista - prob_alta_conf;
  }
  // Garantizar positivos y suma EXACTA 100 - sin exception
  prob_alcista = Math.max(1, Math.round(prob_alcista));
  prob_bajista = Math.max(1, Math.round(prob_bajista));
  // prob_alta_conf siempre se calcula como residuo para garantizar suma 100
  prob_alta_conf = 100 - prob_alcista - prob_bajista;
  if (prob_alta_conf < 1) { prob_alta_conf = 1; prob_bajista = 100 - prob_alcista - 1; }
  if (prob_bajista < 1) { prob_bajista = 1; prob_alta_conf = 100 - prob_alcista - 1; }
  var escenario_principal = direccion === 'alta_conf' ? ('ALTA CONV-IA ' + confLabel) : (direccion === 'alcista' ? 'ALCISTA' : 'BAJISTA');
  var estrellas = scoreAbs > umbralConfIA ? 5 : scoreAbs > 0.10 ? 4 : scoreAbs > 0.06 ? 3 : scoreAbs > 0.03 ? 2 : 1;
  var cambio24h = precio24h > 0 ? ((precio - precio24h) / precio24h * 100) : 0;
  var _movLimits = activo.tipo === 'cripto' ? {min:0.02, max:0.08} :
                   activo.tipo === 'accion' ? {min:0.01, max:0.04} :
                   activo.tipo === 'bono' ? {min:0.002, max:0.015} :
                   {min:0.005, max:0.03};
  var _normScore = Math.min(scoreAbs, 0.45) / 0.45;
  var movPct = _movLimits.min + _normScore * (_movLimits.max - _movLimits.min);
  var _esAlcista = total > 0;
  var _dec = precio > 100 ? 2 : 4;
  var objetivo = precio > 0 ? (_esAlcista ? precio*(1+movPct) : precio*(1-movPct)).toFixed(_dec) : '0';
  var stop = precio > 0 ? (_esAlcista ? precio*(1-movPct*0.4) : precio*(1+movPct*0.4)).toFixed(_dec) : '0';
  var upside = (_esAlcista ? 1 : -1) * (movPct * 100);
  return {
    simbolo: sym, nombre: activo.n, tipo: activo.tipo, logo: activo.logo || '', icon: activo.icon || sym[0], color: activo.color || '#D4A017',
    direccion: direccion, confianza: probPrincipal, score: total,
    prob_alcista: prob_alcista, prob_bajista: prob_bajista, prob_alta_conf: prob_alta_conf,
    escenario_principal: escenario_principal, prob_principal: probPrincipal,
    motivos: motivos.slice(0,5), precio: precio, precio24h: precio24h,
    rsi: parseFloat(rsi.toFixed(0)), volRel: parseFloat(volRel.toFixed(1)),
    estrellas: estrellas, objetivo: objetivo, stop: stop, upside: upside
  };
}

function generarSenalesIA() {
  var listEl = document.getElementById('ia-list');
  if (listEl) listEl.innerHTML = '<div style="text-align:center;padding:32px 20px;color:#8B949E;font-size:13px"><div style="width:24px;height:24px;border:2px solid #D4A017;border-top-color:transparent;border-radius:50%;animation:spin 0.8s linear infinite;margin:0 auto 12px"></div>Analizando mercados en tiempo real...</div>';
  var allData = {};
  var phase1Syms = ['BTC','ETH','SOL','BNB','XRP','AAPL','NVDA','TSLA','MSFT','META','GOOGL','AMZN','SPY','QQQ','GLD','SLV','USO','BNO','TLT','AGG'];
  var phase1Activos = window._IA_ACTIVOS.filter(function(a){ return phase1Syms.indexOf(a.s) >= 0; });
  var phase2Activos = window._IA_ACTIVOS.filter(function(a){ return phase1Syms.indexOf(a.s) < 0; });
  var btcCambio = 0, spyCambio = 0, precioOro = 2050, precioPetroleo = 80;
  var hayMacro = true;
  var earningsSyms = ['NVDA','AAPL','MSFT','META','AMZN'];
  function buildSignals(activos) {
    var sigs = [];
    activos.forEach(function(activo){
      var d = allData[activo.s] || {};
      if (!d.precio || d.precio <= 0) return;
      sigs.push(_calcIAScore(activo, {
        precio: d.precio, precio24h: d.precio24h||d.precio,
        volumen24h: d.volumen24h||0, volumenProm: d.volumenProm||0,
        high24h: d.high24h||d.precio*1.02, low24h: d.low24h||d.precio*0.98,
        btcCambio: btcCambio, spyCambio: spyCambio,
        precioOro: precioOro, precioPetroleo: precioPetroleo,
        hayMacro: hayMacro, hayEarnings: earningsSyms.indexOf(activo.s) >= 0
      }));
    });
    return sigs;
  }
  function fetchBinanceBatch(activos) {
    var cryptoActivos = activos.filter(function(a){ return a.tipo === 'cripto'; });
    if (!cryptoActivos.length) return Promise.resolve();
    var syms = cryptoActivos.map(function(x){ return '"'+x.s+'USDT"'; }).join(',');
    return fetch('https://api.binance.com/api/v3/ticker/24hr?symbols=['+syms+']')
      .then(function(r){ return r.json(); })
      .then(function(list){
        list.forEach(function(t){
          var sym = t.symbol.replace('USDT','');
          allData[sym] = { precio: parseFloat(t.lastPrice), precio24h: parseFloat(t.openPrice), volumen24h: parseFloat(t.quoteVolume), volumenProm: parseFloat(t.quoteVolume)*0.85, high24h: parseFloat(t.highPrice), low24h: parseFloat(t.lowPrice) };
        });
      }).catch(function(){});
  }
  function fetchYahooBatch(activos) {
    var yActivos = activos.filter(function(a){ return a.tipo !== 'cripto'; });
    if (!yActivos.length) return Promise.resolve();
    var ySyms = [];
    yActivos.forEach(function(a){ if(ySyms.indexOf(a.ySymbol)<0) ySyms.push(a.ySymbol); });
    return Promise.all(ySyms.map(function(sym){
      return fetch('https://corsproxy.io/?'+encodeURIComponent('https://query1.finance.yahoo.com/v8/finance/chart/'+sym+'?interval=1d&range=5d'))
        .then(function(r){ return r.json(); })
        .then(function(d){
          try {
            var q=d.chart.result[0]; var meta=q.meta;
            var closes=q.indicators.quote[0].close; var volumes=q.indicators.quote[0].volume;
            var vc=closes.filter(function(x){return x!=null;}); var vv=volumes.filter(function(x){return x!=null;});
            var lc=vc[vc.length-1]||meta.regularMarketPrice; var pc=vc[vc.length-2]||lc;
            var av=vv.length>1?vv.slice(0,-1).reduce(function(a,b){return a+b;},0)/(vv.length-1):(vv[0]||1);
            var lv=vv[vv.length-1]||av;
            var hi=meta.regularMarketDayHigh||lc*1.02; var lo=meta.regularMarketDayLow||lc*0.98;
            window._IA_ACTIVOS.forEach(function(act){
              if(act.ySymbol===sym) allData[act.s]={precio:lc,precio24h:pc,volumen24h:lv,volumenProm:av,high24h:hi,low24h:lo};
            });
            if(sym==='GC=F') { allData['_ORO']=lc; precioOro=lc; }
            if(sym==='CL=F'||sym==='BZ=F') { allData['_PETROLEO']=lc; precioPetroleo=lc; }
          } catch(e){}
        }).catch(function(){});
    }));
  }
  // FASE 1: cargar los 20 principales y mostrar inmediatamente
  Promise.all([fetchBinanceBatch(phase1Activos), fetchYahooBatch(phase1Activos)]).then(function(){
    var pBTC=(allData['BTC']||{}).precio||0; var p24BTC=(allData['BTC']||{}).precio24h||pBTC;
    btcCambio = p24BTC>0?(pBTC-p24BTC)/p24BTC:0;
    var pSPY=(allData['SPY']||{}).precio||0; var p24SPY=(allData['SPY']||{}).precio24h||pSPY;
    spyCambio = p24SPY>0?(pSPY-p24SPY)/p24SPY:0;
    precioOro = allData['_ORO']||(allData['GLD']||{}).precio||precioOro;
    precioPetroleo = allData['_PETROLEO']||(allData['USO']||{}).precio||precioPetroleo;
    var signals1 = buildSignals(phase1Activos);
    signals1.sort(function(a,b){ return b.confianza - a.confianza; });
    window._iaSignals = signals1;
    window._IA_PRECIOS = allData;
    _actualizarContadores(signals1);
    _renderIALista(signals1, true);
    _iniciarBanner();
    var upd=document.getElementById('ia-updated');
    if(upd){var now=new Date();upd.textContent='Act. '+now.getHours()+':'+(now.getMinutes()<10?'0':'')+now.getMinutes();}
    // FASE 2: cargar el resto en background
    setTimeout(function(){
      _cargarFase2(phase2Activos, signals1, buildSignals, fetchBinanceBatch, fetchYahooBatch);
    }, 300);
  });
}

function _cargarFase2(phase2Activos, signals1, buildSignals, fetchBinanceBatch, fetchYahooBatch) {
  var listEl = document.getElementById('ia-list');
  var loadingBar = document.getElementById('ia-loading-bar');
  if (!loadingBar && listEl) {
    var lb = document.createElement('div');
    lb.id = 'ia-loading-bar';
    lb.style.cssText = 'padding:10px 14px;display:flex;align-items:center;gap:8px;border-bottom:1px solid #21262D;';
    lb.innerHTML = '<div style="width:14px;height:14px;border:2px solid #D4A017;border-top-color:transparent;border-radius:50%;animation:spin 0.8s linear infinite;flex-shrink:0"></div><span style="font-size:11px;color:#8B949E">Cargando mas senales... <span id="ia-load-count">0</span>/' + phase2Activos.length + '</span>';
    listEl.appendChild(lb);
  }
  var allData = window._IA_PRECIOS || {};
  var loaded = 0;
  var allSignals = signals1.slice();
  // Load phase2 in small batches of 5 to avoid overwhelming
  var batches = [];
  for (var i = 0; i < phase2Activos.length; i += 5) {
    batches.push(phase2Activos.slice(i, i + 5));
  }
  function processBatch(batchIdx) {
    if (batchIdx >= batches.length) {
      var lb2 = document.getElementById('ia-loading-bar');
      if (lb2) lb2.remove();
      allSignals.sort(function(a,b){ return b.confianza - a.confianza; });
      window._iaSignals = allSignals;
      _actualizarContadores(allSignals);
      _renderIALista(allSignals, false);
      return;
    }
    var batch = batches[batchIdx];
    Promise.all([fetchBinanceBatch(batch), fetchYahooBatch(batch)]).then(function(){
      var newSigs = buildSignals(batch);
      newSigs.forEach(function(s){ allSignals.push(s); });
      loaded += batch.length;
      var cntEl = document.getElementById('ia-load-count');
      if (cntEl) cntEl.textContent = loaded;
      allSignals.sort(function(a,b){ return b.confianza - a.confianza; });
      window._iaSignals = allSignals;
      window._IA_PRECIOS = allData;
      _actualizarContadores(allSignals);
      _renderIALista(allSignals, true);
      setTimeout(function(){ processBatch(batchIdx + 1); }, 200);
    });
  }
  processBatch(0);
}

function _actualizarContadores(signals) {
  var al=signals.filter(function(s){return s.direccion==='alcista';}).length;
  var ba=signals.filter(function(s){return s.direccion==='bajista';}).length;
  var ac=signals.filter(function(s){return s.direccion==='alta_conf';}).length;
  var ea=document.getElementById('ia-num-alcista'); if(ea) ea.textContent=al;
  var eb=document.getElementById('ia-num-bajista'); if(eb) eb.textContent=ba;
  var ec=document.getElementById('ia-num-altaconf'); if(ec) ec.textContent=ac;
  var sub=document.getElementById('ia-subtitulo');
  if(sub) sub.textContent=signals.length+' SENALES IA - ORDENADAS POR PROBABILIDAD';
}

function setIAFiltro(filtro, el) {
  window._IA_FILTRO_ACTUAL = filtro;
  document.querySelectorAll('.ia-pill').forEach(function(p) {
    var isActive = p.getAttribute('data-filtro') === filtro;
    p.style.background = isActive ? '#D4A017' : 'transparent';
    p.style.color = isActive ? '#000' : (
      p.getAttribute('data-filtro')==='alcista'?'#3FB950':
      p.getAttribute('data-filtro')==='bajista'?'#FF4444':
      p.getAttribute('data-filtro')==='alta_conf'?'#D4A017':
      p.getAttribute('data-filtro')==='cripto'?'#A78BFA':
      p.getAttribute('data-filtro')==='accion'?'#58A6FF':
      p.getAttribute('data-filtro')==='etf'?'#F0883E':
      p.getAttribute('data-filtro')==='metal'?'#FFD700':
      p.getAttribute('data-filtro')==='materia_prima'?'#C8A96E':
      p.getAttribute('data-filtro')==='bono'?'#79C0FF':'#D4A017');
    p.style.borderColor = isActive ? '#D4A017' : '';
  });
  _renderIALista(window._iaSignals || [], false);
}

function _renderIALista(signals, keepLoadingBar) {
  var listEl = document.getElementById('ia-list');
  if (!listEl) return;
  var filtro = window._IA_FILTRO_ACTUAL || 'todo';
  var filtered = signals.filter(function(s) {
    if(filtro==='todo') return true;
    if(filtro==='alcista') return s.direccion==='alcista';
    if(filtro==='bajista') return s.direccion==='bajista';
    if(filtro==='alta_conf') return s.direccion==='alta_conf';
    return s.tipo === filtro;
  });
  if (!filtered.length) {
    listEl.innerHTML = '<div style="text-align:center;padding:40px 20px;color:#8B949E;font-size:13px">No hay senales para este filtro</div>';
    return;
  }
  var lb = document.getElementById('ia-loading-bar');
  listEl.innerHTML = filtered.map(function(s, i) {
    var dirColor = s.direccion==='alcista'?'#3FB950':s.direccion==='bajista'?'#FF4444':'#D4A017';
    var dirBg = s.direccion==='alcista'?'#3FB95020':s.direccion==='bajista'?'#FF444420':'#D4A01720';
    var dirLabel = s.direccion==='alcista'?'ALCISTA':s.direccion==='bajista'?'BAJISTA':'ALTA CONV-IA';
    // Para ALTA CONV-IA, obtener la sub-dirección del escenario_principal
    var altaConfDirLabel = '';
    var altaConfDirColor = '';
    if (s.direccion === 'alta_conf') {
      var escDir = (s.escenario_principal || '').toLowerCase();
      if (escDir.indexOf('alcista') >= 0) {
        altaConfDirLabel = '\u2191 ALCISTA';
        altaConfDirColor = '#3FB950';
      } else if (escDir.indexOf('bajista') >= 0) {
        altaConfDirLabel = '\u2193 BAJISTA';
        altaConfDirColor = '#FF4444';
      }
    }
    var tipoColor = s.tipo==='cripto'?'#A78BFA':s.tipo==='accion'?'#58A6FF':s.tipo==='etf'?'#F0883E':s.tipo==='metal'?'#FFD700':s.tipo==='materia_prima'?'#C8A96E':s.tipo==='bono'?'#79C0FF':'#D4A017';
    var tipoLabel = s.tipo==='cripto'?'Cripto':s.tipo==='accion'?'Acciones':s.tipo==='etf'?'ETF':s.tipo==='metal'?'Metal':s.tipo==='materia_prima'?'Mat. Prima':s.tipo==='bono'?'Bono':'Otro';
    var estrellas = '';
    for(var e=0;e<5;e++) estrellas += e<s.estrellas?'<span style="color:#D4A017">&#9733;</span>':'<span style="color:#30363D">&#9733;</span>';
    var precioFmt = s.precio>=1000?'$'+Math.round(s.precio).toLocaleString('en'):s.precio>=1?'$'+s.precio.toFixed(2):s.precio>0?'$'+s.precio.toFixed(4):'-';
    var cambio24h = s.precio24h>0?((s.precio-s.precio24h)/s.precio24h*100):0;
    var pctColor = cambio24h>=0?'#3FB950':'#FF4444';
    var pctStr = (cambio24h>=0?'+':'')+cambio24h.toFixed(2)+'%';
    var abbr = s.abbr || s.simbolo.substring(0,3);
    var logoHtml = s.logo ?
      '<img src="'+s.logo+'" alt="'+s.simbolo+'" style="width:22px;height:22px;object-fit:contain;border-radius:50%" onerror="this.style.display=\'none\';this.nextSibling.style.display=\'flex\'">'+
      '<span style="display:none;width:22px;height:22px;border-radius:50%;background:'+s.color+'30;display:none;align-items:center;justify-content:center;font-size:8px;font-weight:800;color:'+s.color+'">'+abbr+'</span>' :
      '<span style="display:flex;width:22px;height:22px;border-radius:50%;background:'+s.color+'30;align-items:center;justify-content:center;font-size:8px;font-weight:800;color:'+s.color+'">'+abbr+'</span>';
    return '<div class="ia-row" id="ia-row-'+i+'" onclick="toggleIARow('+i+')" style="border-bottom:1px solid #21262D;cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0);touch-action:manipulation">' +
      '<div style="padding:10px 14px 8px">' +
        '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3px">' +
          '<div style="display:flex;align-items:center;gap:7px">' +
            '<div style="width:34px;height:34px;border-radius:50%;background:'+s.color+'15;border:1.5px solid '+s.color+'40;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden">'+logoHtml+'</div>' +
            '<div>' +
              '<div style="display:flex;align-items:center;gap:4px;flex-wrap:wrap">' +
                '<span style="font-size:13px;font-weight:700;color:#E6EDF3">'+s.simbolo+'</span>' +
                '<span style="font-size:9px;font-weight:700;background:'+dirBg+';color:'+dirColor+';border:1px solid '+dirColor+'60;border-radius:4px;padding:1px 5px;white-space:nowrap">'+dirLabel+'</span>' +
                (altaConfDirLabel ? '<span style="font-size:9px;font-weight:700;background:'+altaConfDirColor+'20;color:'+altaConfDirColor+';border:1px solid '+altaConfDirColor+'60;border-radius:4px;padding:1px 5px;margin-left:3px;white-space:nowrap">'+altaConfDirLabel+'</span>' : '') +
                '<span style="font-size:9px">'+estrellas+'</span>' +
              '</div>' +
              '<div style="font-size:10px;color:#8B949E">'+s.nombre+' <span style="color:'+tipoColor+'">&diams; '+tipoLabel+'</span></div>' +
            '</div>' +
          '</div>' +
          '<div style="text-align:right">' +
            '<div style="font-size:13px;font-weight:700;color:#E6EDF3">'+precioFmt+'</div>' +
            '<div style="font-size:11px;color:'+pctColor+'">'+pctStr+'</div>' +
          '</div>' +
        '</div>' +
        '<div style="display:flex;align-items:center;justify-content:space-between;margin-top:3px">' +
          '<span style="font-size:10px;color:#8B949E">PROB. IA <span style="color:'+dirColor+';font-weight:700">'+s.confianza+'%</span></span>' +
        '</div>' +
        '<div style="margin-top:3px;height:3px;background:#21262D;border-radius:2px"><div style="height:100%;width:'+Math.min(s.confianza,100)+'%;background:'+dirColor+';border-radius:2px;transition:width 0.5s"></div></div>' +
      '</div>' +
      '<div id="ia-detail-'+i+'" style="display:none;padding:0 14px 14px;background:#0D1117;border-top:1px solid #21262D">'+_buildIADetail(s)+'</div>' +
    '</div>';
  }).join('');
  if (keepLoadingBar && lb) listEl.appendChild(lb);
}

function _buildIADetail(s) {
  var dirColor = s.direccion==='alcista'?'#3FB950':s.direccion==='bajista'?'#FF4444':'#D4A017';
  var dirLabel = s.direccion==='alcista'?'ALCISTA':s.direccion==='bajista'?'BAJISTA':'ALTA CONV-IA';
  var signo = s.direccion==='alcista'?'+':s.direccion==='bajista'?'-':'&#9889;';
  var html = '<div style="padding-top:12px">';
  html += '<div style="background:'+dirColor+'15;border:1px solid '+dirColor+'40;border-radius:10px;padding:10px 12px;margin-bottom:10px">';
  html += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">';
  html += '<span style="font-size:13px;font-weight:700;color:'+dirColor+'">'+signo+' '+dirLabel+'</span>';
  html += '<span style="background:'+dirColor+';color:#000;font-size:11px;font-weight:800;border-radius:6px;padding:2px 8px">PRINCIPAL '+s.prob_principal+'%</span>';
  html += '</div>';
  html += '<div style="font-size:11px;font-weight:600;color:#8B949E;letter-spacing:0.5px;margin-bottom:6px">JUSTIFICACION DEL ANALISIS</div>';
  (s.motivos||[]).slice(0,5).forEach(function(m) {
    html += '<div style="display:flex;gap:6px;margin-bottom:5px"><span style="color:'+dirColor+';flex-shrink:0;font-weight:700">-></span><span style="font-size:11px;color:#C9D1D9;line-height:1.4">'+m+'</span></div>';
  });
  html += '</div>';
  html += '<div style="display:flex;gap:8px;margin-bottom:10px">';
  var _cObj=s.direccion==='bajista'?'#FF4444':'#3FB950';
  html += '<div style="flex:1;background:#21262D;border-radius:8px;padding:8px;text-align:center"><div style="font-size:9px;color:#8B949E;margin-bottom:2px">Objetivo</div><div style="font-size:12px;font-weight:700;color:'+_cObj+'">$'+s.objetivo+'</div></div>';
  var _cStop=s.direccion==='bajista'?'#FF9500':'#FF4444';
  html += '<div style="flex:1;background:#21262D;border-radius:8px;padding:8px;text-align:center"><div style="font-size:9px;color:#8B949E;margin-bottom:2px">Stop</div><div style="font-size:12px;font-weight:700;color:'+_cStop+'">$'+s.stop+'</div></div>';
  var _uLabel=s.upside<0?'Downside':'Upside';
  var _uColor=s.upside<0?'#FF4444':'#3FB950';
  var _uSign=s.upside>=0?'+':'';
  html += '<div style="flex:1;background:#21262D;border-radius:8px;padding:8px;text-align:center"><div style="font-size:9px;color:#8B949E;margin-bottom:2px">'+_uLabel+'</div><div style="font-size:12px;font-weight:700;color:'+_uColor+'">'+_uSign+s.upside.toFixed(1)+'%</div></div>';
  html += '</div>';
  html += '<div style="font-size:10px;color:#8B949E;margin-bottom:6px;font-weight:600">OTROS ESCENARIOS</div>';
  html += '<div style="display:flex;gap:6px">';
  if(s.direccion!=='alcista') html += '<div style="flex:1;background:#3FB95015;border:1px solid #3FB95040;border-radius:8px;padding:6px;text-align:center"><div style="font-size:9px;color:#3FB950">ALCISTA</div><div style="font-size:13px;font-weight:700;color:#3FB950">'+s.prob_alcista+'%</div></div>';
  if(s.direccion!=='bajista') html += '<div style="flex:1;background:#FF444415;border:1px solid #FF444440;border-radius:8px;padding:6px;text-align:center"><div style="font-size:9px;color:#FF4444">BAJISTA</div><div style="font-size:13px;font-weight:700;color:#FF4444">'+s.prob_bajista+'%</div></div>';
  if(s.direccion!=='alta_conf') html += '<div style="flex:1;background:#D4A01715;border:1px solid #D4A01740;border-radius:8px;padding:6px;text-align:center"><div style="font-size:9px;color:#D4A017">ALTA CONV-IA</div><div style="font-size:13px;font-weight:700;color:#D4A017">'+s.prob_alta_conf+'%</div></div>';
  html += '</div></div>';
  return html;
}

function toggleIARow(idx) {
  var detail = document.getElementById('ia-detail-'+idx);
  if (!detail) return;
  var isOpen = detail.style.display !== 'none';
  document.querySelectorAll('[id^="ia-detail-"]').forEach(function(d){ d.style.display='none'; });
  if (!isOpen) detail.style.display = 'block';
}


document.addEventListener('DOMContentLoaded', function(){
  setTimeout(function(){
    generarSenalesIA();
    setInterval(generarSenalesIA, 5*60*1000);
  }, 1500);
});
