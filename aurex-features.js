/* v=1774768876408 */
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
  comm:     [{s:'GC=F',n:'Oro'},{s:'CL=F',n:'PetrÃÂ³leo'},{s:'SI=F',n:'Plata'},{s:'NG=F',n:'Gas Natural'},{s:'HG=F',n:'Cobre'}],
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
      +'<div style="text-align:right;display:flex;flex-direction:column;align-items:flex-end;"><span id="p-'+item.s+'" style="color:#E6EDF3;font-size:14px;font-weight:600;">Ã¢ÂÂ</span><span id="c-'+item.s+'" style="font-size:11px;color:#8B949E;">Ã¢ÂÂ</span></div>';
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

// === swPais: cambio de paÃÂ­s en acciones ===
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
function showTestNotification(){if(swReg&&Notification.permission==='granted')swReg.showNotification('Aurex - Alertas Activas',{body:'RecibirÃÂ¡s alertas de precio.',icon:'https://fmoscon-creator.github.io/aurex-app/icon-192.png',tag:'aurex-test'});}
function showAlertNotification(s,p,o){if(swReg&&Notification.permission==='granted')swReg.showNotification('ALERTA - '+s,{body:'$'+p.toLocaleString('en')+' obj:$'+o.toLocaleString('en'),icon:'https://fmoscon-creator.github.io/aurex-app/icon-192.png',tag:'aurex-'+s,renotify:true});}
function updateNotifButton(on){var b=document.getElementById('notif-btn');if(!b)return;b.style.background=on?'#16A34A':'#D4A017';b.textContent=on?'Activas':'Activar';}
initPushNotifications();
function checkAlertasLocal(){if(typeof ALERTAS==='undefined')return;ALERTAS.forEach(function(a){if(!a.activa)return;var actual=typeof getAlertActual==='function'?getAlertActual(a):null;if(!actual)return;if((a.cond==='mayor'&&actual>=a.precio)||(a.cond==='menor'&&actual<=a.precio)){if(!a._disparada){a._disparada=true;var b=document.createElement('div');b.style.cssText='position:fixed;top:60px;left:0;right:0;z-index:9999;margin:0 12px;background:#16A34A;border-radius:12px;padding:12px 16px;color:white;font-size:13px;font-weight:600';b.textContent='ALERTA - '+a.s;document.body.appendChild(b);setTimeout(function(){b.remove();},5000);if(typeof showAlertNotification==='function')showAlertNotification(a.s,actual,a.precio);}}});}
setInterval(checkAlertasLocal,30000);
fetch(BACKEND_URL+'/').then(function(r){return r.json();}).then(function(d){if(d.status==='ok')console.log('Backend v'+d.version+' OK');}).catch(function(){});

// ============================================================
// === CONVERSOR DE MONEDAS Ã¢ÂÂ Binance + fallback fiat =========
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
  if(isNaN(amt) || amt < 0) { resEl.textContent = 'Ã¢ÂÂ'; return; }
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
// === PORTFOLIO PERSISTENTE Ã¢ÂÂ Supabase ========================
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

// Obtener el token de sesiÃÂ³n actual del usuario
function getSupaToken(){
  try {
    var sb = window._supabase || (window.supabase && window.supabase.createClient ? null : null);
    if(window._supabase) return window._supabase.auth.getSession();
    return Promise.resolve({ data: { session: null } });
  } catch(e) { return Promise.resolve({ data: { session: null } }); }
}

// Ã¢ÂÂÃ¢ÂÂ CARGAR portfolio del usuario desde Supabase Ã¢ÂÂÃ¢ÂÂ
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
    // Luego buscar precios frescos para los sÃÂ­mbolos del portfolio
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
  // Si no hay sesiÃÂ³n, mostrar demo con activos de ejemplo
  var demoItems = [
    {id:'demo1', simbolo:'AAPL',  nombre:'Apple',       cantidad:10,   precio_compra:185.00, tipo:'accion'},
    {id:'demo2', simbolo:'NVDA',  nombre:'NVIDIA',      cantidad:5,    precio_compra:125.00, tipo:'accion'},
    {id:'demo3', simbolo:'BTC',   nombre:'Bitcoin',     cantidad:0.05, precio_compra:62000,  tipo:'cripto'},
    {id:'demo4', simbolo:'ETH',   nombre:'Ethereum',    cantidad:1.5,  precio_compra:3200,   tipo:'cripto'},
    {id:'demo5', simbolo:'GC=F',  nombre:'Oro (Gold)',  cantidad:2,    precio_compra:2050,   tipo:'commodity'},
    {id:'demo6', simbolo:'CL=F',  nombre:'PetrÃÂ³leo WTI',cantidad:10,   precio_compra:78.50,  tipo:'commodity'},
    {id:'demo7', simbolo:'TLT',   nombre:'Bono 20Y US', cantidad:20,   precio_compra:92.00,  tipo:'bono'}
  ];
  cnt.innerHTML = '<div style="background:#1A0D0060;border:1px dashed #D4A01740;border-radius:10px;margin:10px 14px 6px;padding:8px 14px;display:flex;align-items:center;gap:8px;">' +
    '<span style="font-size:18px;">Ã°ÂÂÂ¤</span>' +
    '<div>' +
      '<div style="font-size:11px;font-weight:700;color:#D4A017;">Modo demo Ã¢ÂÂ IniciÃÂ¡ sesiÃÂ³n para tu portfolio real</div>' +
      '<div onclick="navTo(\x27perfil\x27);authSwitchTab(\x27register\x27)" style="font-size:10px;color:#58A6FF;cursor:pointer;margin-top:2px;">Crear cuenta gratis Ã¢ÂÂ</div>' +
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
      '<div onclick="deletePortfolioItem(\'' + item.id + '\')" style="font-size:18px;color:#555;cursor:pointer;padding:4px 6px;-webkit-tap-highlight-color:rgba(0,0,0,0);">ÃÂ</div>' +
    '</div>';
  }).join('');
  _updateTotals(items);
}

function _updateTotals(items){
  var prcs = window._pcPrices || {};
  var total = 0, totalCosto = 0, bestPct = -Infinity, bestSym = 'Ã¢ÂÂ';
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
  if(el('port-best')) el('port-best').textContent = items.length > 0 ? (bestSym + ' ' + (bestPct>=0?'+':'') + bestPct.toFixed(1) + '%') : 'Ã¢ÂÂ';
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

// Ã¢ÂÂÃ¢ÂÂ ABRIR / CERRAR modal Agregar activo Ã¢ÂÂÃ¢ÂÂ
var _ACTIVOS_MODAL = [
  {g:'Cripto',items:[{s:'BTC',n:'Bitcoin'},{s:'ETH',n:'Ethereum'},{s:'SOL',n:'Solana'},{s:'BNB',n:'BNB'},{s:'XRP',n:'XRP'},{s:'ADA',n:'Cardano'},{s:'AVAX',n:'Avalanche'},{s:'DOT',n:'Polkadot'},{s:'LINK',n:'Chainlink'},{s:'MATIC',n:'Polygon'}],tipo:'cripto'},
  {g:'Acciones USA',items:[{s:'AAPL',n:'Apple'},{s:'NVDA',n:'NVIDIA'},{s:'MSFT',n:'Microsoft'},{s:'TSLA',n:'Tesla'},{s:'META',n:'Meta'},{s:'GOOGL',n:'Alphabet'},{s:'AMZN',n:'Amazon'}],tipo:'accion'},
  {g:'Acciones ARG',items:[{s:'GGAL',n:'Galicia'},{s:'YPF',n:'YPF'},{s:'BMA',n:'Macro'}],tipo:'accion'},
  {g:'ETFs',items:[{s:'SPY',n:'S&P 500'},{s:'QQQ',n:'Nasdaq 100'},{s:'GLD',n:'Gold ETF'},{s:'TLT',n:'Bono 20Y US'},{s:'IEF',n:'Bono 7-10Y'},{s:'VTI',n:'Total Mkt'}],tipo:'etf'},
  {g:'Stablecoins',items:[{s:'USDT',n:'Tether'},{s:'USDC',n:'USD Coin'}],tipo:'stable'}
];

window.openAddActivo = function(){
  // Si no hay sesiÃÂ³n, mostrar aviso de login
  if(!window._supabase){ navTo('perfil'); return; }
  window._supabase.auth.getSession().then(function(res){
    if(!res.data || !res.data.session){
      // Mostrar mini-aviso en el portfolio y redirigir a Perfil/Login
      var cnt = document.getElementById('port-cnt');
      if(cnt){
        var old = cnt.innerHTML;
        cnt.innerHTML = '<div style="background:#1A0D00;border:1px solid #D4A01780;border-radius:12px;margin:20px 14px;padding:20px;text-align:center;">' +
          '<div style="font-size:28px;margin-bottom:8px;">Ã°ÂÂÂ</div>' +
          '<div style="font-size:14px;font-weight:700;color:#D4A017;margin-bottom:6px;">NecesitÃÂ¡s una cuenta</div>' +
          '<div style="font-size:12px;color:#8B949E;margin-bottom:16px;">Para guardar activos reales, creÃÂ¡ tu cuenta gratis.</div>' +
          '<div onclick="navTo(\x27perfil\x27);authSwitchTab(\x27register\x27)" style="background:linear-gradient(135deg,#D4A017,#B8860B);color:#000;font-weight:800;font-size:14px;padding:12px 24px;border-radius:10px;cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0);">Crear cuenta gratis Ã¢ÂÂ</div>' +
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
    return '<optgroup label="Ã¢ÂÂÃ¢ÂÂ ' + g.g + ' Ã¢ÂÂÃ¢ÂÂ">' +
      g.items.map(function(a){ return '<option value="' + a.s + '|' + a.n + '|' + g.tipo + '">' + a.s + ' ÃÂ· ' + a.n + '</option>'; }).join('') +
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
  if(!simbolo){ showPortErr('SeleccionÃÂ¡ un activo.'); return; }
  if(!cantidad || cantidad <= 0){ showPortErr('IngresÃÂ¡ una cantidad vÃÂ¡lida.'); return; }
  if(!precio || precio <= 0){ showPortErr('IngresÃÂ¡ un precio de compra vÃÂ¡lido.'); return; }
  if(errEl) errEl.style.display = 'none';
  addPortfolioItem(simbolo, nombre, cantidad, precio, tipo);
  closePortModal();
};

function showPortErr(msg){
  var errEl = document.getElementById('pa-err');
  if(errEl){ errEl.textContent = msg; errEl.style.display = 'block'; }
}

// Ã¢ÂÂÃ¢ÂÂ AGREGAR activo al portfolio en Supabase Ã¢ÂÂÃ¢ÂÂ
window.addPortfolioItem = function(simbolo, nombre, cantidad, precioCompra, tipo){
  if(!window._supabase){ alert('NecesitÃÂ¡s iniciar sesiÃÂ³n para guardar activos.'); return; }
  window._supabase.auth.getSession().then(function(res){
    if(!res.data || !res.data.session){ alert('IniciÃÂ¡ sesiÃÂ³n primero.'); return; }
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

// Ã¢ÂÂÃ¢ÂÂ ELIMINAR activo del portfolio Ã¢ÂÂÃ¢ÂÂ
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

// Inicializar portfolio cuando hay sesiÃÂ³n
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
// SENALES IA - MOTOR COMPLETO v3 (rediseno imagen original)
// ============================================================

window._IA_FILTRO_ACTUAL = 'todo';
window._IA_BANNER_EVENTOS = [];
window._IA_BANNER_IDX = 0;
window._IA_BANNER_TIMER = null;


window._IA_ACTIVOS = [
  {s:'BTC', n:'Bitcoin', tipo:'cripto', icon:'B', color:'#F7931A', logo:'https://assets.coingecko.com/coins/images/1/small/bitcoin.png', ySymbol:'BTC-USD'},
  {s:'ETH', n:'Ethereum', tipo:'cripto', icon:'E', color:'#627EEA', logo:'https://assets.coingecko.com/coins/images/279/small/ethereum.png', ySymbol:'ETH-USD'},
  {s:'SOL', n:'Solana', tipo:'cripto', icon:'S', color:'#9945FF', logo:'https://assets.coingecko.com/coins/images/4128/small/solana.png', ySymbol:'SOL-USD'},
  {s:'BNB', n:'BNB', tipo:'cripto', icon:'B', color:'#F3BA2F', logo:'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png', ySymbol:'BNB-USD'},
  {s:'XRP', n:'Ripple', tipo:'cripto', icon:'X', color:'#00AAE4', logo:'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png', ySymbol:'XRP-USD'},
  {s:'AAPL', n:'Apple Inc.', tipo:'accion', icon:'A', color:'#A2AAAD', logo:'https://logo.clearbit.com/apple.com', ySymbol:'AAPL'},
  {s:'NVDA', n:'NVIDIA', tipo:'accion', icon:'N', color:'#76B900', logo:'https://logo.clearbit.com/nvidia.com', ySymbol:'NVDA'},
  {s:'TSLA', n:'Tesla', tipo:'accion', icon:'T', color:'#CC0000', logo:'https://logo.clearbit.com/tesla.com', ySymbol:'TSLA'},
  {s:'MSFT', n:'Microsoft', tipo:'accion', icon:'M', color:'#00A4EF', logo:'https://logo.clearbit.com/microsoft.com', ySymbol:'MSFT'},
  {s:'SPY', n:'S&P 500 ETF', tipo:'etf', icon:'S', color:'#D4A017', logo:'https://logo.clearbit.com/ssga.com', ySymbol:'SPY'},
  {s:'GLD', n:'Oro Spot', tipo:'metal', icon:'G', color:'#FFD700', logo:'https://assets.coingecko.com/coins/images/944/small/xaut.png', ySymbol:'GC=F'},
  {s:'SLV', n:'Plata Spot', tipo:'metal', icon:'S', color:'#C0C0C0', logo:'', ySymbol:'SI=F'},
  {s:'USO', n:'Petroleo WTI', tipo:'materia_prima', icon:'O', color:'#8B4513', logo:'', ySymbol:'CL=F'},
  {s:'WEAT', n:'Trigo ETF', tipo:'materia_prima', icon:'W', color:'#DAA520', logo:'', ySymbol:'ZW=F'},
  {s:'TLT', n:'Bonos 20Y EEUU', tipo:'bono', icon:'T', color:'#79C0FF', logo:'https://logo.clearbit.com/ishares.com', ySymbol:'TLT'},
  {s:'AGG', n:'Bonos Agregados', tipo:'bono', icon:'A', color:'#58A6FF', logo:'https://logo.clearbit.com/ishares.com', ySymbol:'AGG'}
];

// EVENTOS MACRO SEMANALES (fijo hasta Semana 2 con Investing.com API)
window._IA_EVENTOS = [
  {label:'EVENTO CRITICO - FED', text:'Reunion FOMC - Decision de tasas de interes - Alto impacto en todos los mercados - Se espera pausa en subas - Mercados atentos a declaraciones de Powell', tiempo:'5h 54m', impacto:'ALTO', hora:'14:00 EST', color:'#D4A017', bg:'#1A1200', border:'#D4A01760'},
  {label:'DATO MACRO - IPC EEUU', text:'Indice de Precios al Consumidor - Publicacion 8:30 EST - Estimado 3.2% interanual - Impacto alto en bonos y acciones growth - Dato clave para politica monetaria', tiempo:'3h 00m', impacto:'MEDIO', hora:'08:30 EST', color:'#3FB950', bg:'#0A1A00', border:'#3FB95060'},
  {label:'EARNINGS - NVIDIA', text:'Resultados trimestrales NVDA Q1 2026 - EPS estimado 5.58 - Ingresos estimados 24.6B - Pre-mercado manana - Alta volatilidad esperada sector tech - Opciones muestran movimiento del 8%', tiempo:'12h 00m', impacto:'ALTO', hora:'Pre-market', color:'#FF4444', bg:'#1A0000', border:'#FF444460'}
];

window._IA_BANNER_IDX = 0;
window._IA_BANNER_TIMER = null;
window._IA_FILTRO_ACTUAL = 'todo';
window._IA_PRECIOS_EXTRA = {};

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
  var t1 = document.getElementById('ia-banner-text1');
  var t2 = document.getElementById('ia-banner-text2');
  var tim = document.getElementById('ia-banner-time');
  var ticker = document.getElementById('ia-banner-ticker');
  if (!banner) return;
  banner.style.display = 'block';
  banner.style.background = ev.bg;
  banner.style.borderBottom = '1px solid ' + ev.border;
  if (lbl) { lbl.textContent = ev.label; lbl.style.color = ev.color; }
  if (t1) { t1.textContent = ev.text; t1.style.color = '#FFFFFF'; }
  if (t2) { t2.textContent = ev.text; t2.style.color = '#FFFFFF'; }
  if (tim) { tim.textContent = ev.tiempo; tim.style.color = ev.color; tim.style.borderColor = ev.color; tim.style.background = ev.color + '30'; }
  if (ticker) { ticker.style.animation = 'none'; ticker.offsetHeight; ticker.style.animation = 'tkScroll 9s linear infinite'; }
  var inner = document.getElementById('ia-banner-inner');
  if (inner) inner.style.color = ev.color;
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
  var evts = window._IA_EVENTOS || [];
  lista.innerHTML = evts.map(function(ev) {
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
  var precioBTC = datos.precioBTC || 0;
  var precioSPY = datos.precioSPY || 0;
  var btcCambio = datos.btcCambio || 0;
  var spyCambio = datos.spyCambio || 0;
  var precioOro = datos.precioOro || 2050;
  var precioPetroleo = datos.precioPetroleo || 80;
  var hayMacro = datos.hayMacro || false;
  var hayEarnings = datos.hayEarnings || false;
  var motivos = [];
  var scores = {};

  // 1. TENDENCIA 24hs REAL
  var tendencia = precio24h > 0 ? (precio - precio24h) / precio24h : 0;
  scores.tendencia = tendencia * 2;
  if (Math.abs(tendencia) > 0.001) {
    if (tendencia > 0) motivos.push('Precio subio +' + (tendencia*100).toFixed(2) + '% en las ultimas 24hs con momentum sostenido');
    else motivos.push('Precio bajo ' + (tendencia*100).toFixed(2) + '% en las ultimas 24hs con presion vendedora');
  } else {
    motivos.push('Precio lateral en las ultimas 24hs, consolidacion en rango');
  }

  // 2. RSI SIMULADO REAL (basado en tendencia real)
  var rsi = 50 + (tendencia * 300);
  rsi = Math.max(10, Math.min(90, rsi));
  var rsiScore = 0;
  if (rsi > 70) { rsiScore = -0.08; motivos.push('RSI en ' + rsi.toFixed(0) + ' - zona de sobrecompra, posible correccion tecnica'); }
  else if (rsi > 60) { rsiScore = 0.05; motivos.push('RSI en ' + rsi.toFixed(0) + ' - momentum alcista sostenido sin sobrecompra'); }
  else if (rsi < 30) { rsiScore = 0.08; motivos.push('RSI en ' + rsi.toFixed(0) + ' - zona de sobreventa, rebote tecnico probable'); }
  else if (rsi < 40) { rsiScore = -0.04; motivos.push('RSI en ' + rsi.toFixed(0) + ' - momentum bajista moderado'); }
  else { rsiScore = 0.01; motivos.push('RSI en ' + rsi.toFixed(0) + ' - zona neutral, sin senales extremas de momentum'); }
  scores.rsi = rsiScore;

  // 3. VOLUMEN RELATIVO REAL
  var volRel = volumenProm > 0 ? volumen24h / volumenProm : 1;
  var volScore = 0;
  if (volRel > 1.8 && tendencia > 0) { volScore = 0.07; motivos.push('Volumen ' + volRel.toFixed(1) + 'x promedio con precio al alza - senal de fuerza compradora'); }
  else if (volRel > 1.8 && tendencia < 0) { volScore = -0.07; motivos.push('Volumen ' + volRel.toFixed(1) + 'x promedio con precio a la baja - presion vendedora elevada'); }
  else if (volRel > 1.3) { volScore = tendencia > 0 ? 0.04 : -0.04; motivos.push('Volumen ' + volRel.toFixed(1) + 'x promedio - participacion activa del mercado'); }
  else if (volRel < 0.6) { volScore = -0.02; motivos.push('Volumen bajo (' + volRel.toFixed(1) + 'x promedio) - movimiento sin conviccion'); }
  else { volScore = 0.01; motivos.push('Volumen en linea con el promedio, sin anomalias detectadas'); }
  scores.volumen = volScore;

  // 4. VOLATILIDAD REAL (rango high-low / precio)
  var volatilidad = precio > 0 ? (high24h - low24h) / precio : 0.02;
  var volaScore = 0;
  if (volatilidad > 0.08) { volaScore = -0.03; motivos.push('Alta volatilidad (' + (volatilidad*100).toFixed(1) + '%) - riesgo elevado de movimiento brusco en ambas direcciones'); }
  else if (volatilidad > 0.04) { volaScore = tendencia > 0 ? 0.02 : -0.02; motivos.push('Volatilidad moderada (' + (volatilidad*100).toFixed(1) + '%) - rango de precio amplio'); }
  else { volaScore = 0.01; motivos.push('Baja volatilidad (' + (volatilidad*100).toFixed(1) + '%) - movimiento controlado sin grandes oscilaciones'); }
  scores.volatilidad = volaScore;

  // 5. CORRELACION DE MERCADO REAL
  var corrScore = 0;
  if (activo.tipo === 'cripto' && btcCambio !== 0) {
    if (sym === 'BTC') { corrScore = btcCambio > 0.01 ? 0.04 : btcCambio < -0.01 ? -0.04 : 0; }
    else { corrScore = btcCambio > 0.02 ? 0.05 : btcCambio > 0 ? 0.02 : btcCambio < -0.02 ? -0.05 : -0.02; }
    if (btcCambio > 0.01) motivos.push('BTC en tendencia positiva +' + (btcCambio*100).toFixed(1) + '% - correlacion favorable para altcoins');
    else if (btcCambio < -0.01) motivos.push('BTC bajo ' + (btcCambio*100).toFixed(1) + '% - presion bajista correlacionada en criptos');
    else motivos.push('BTC lateral, mercado cripto sin tendencia clara definida');
  } else if ((activo.tipo === 'accion' || activo.tipo === 'etf') && spyCambio !== 0) {
    corrScore = spyCambio > 0.005 ? 0.04 : spyCambio < -0.005 ? -0.04 : 0;
    if (spyCambio > 0.005) motivos.push('S&P500 en positivo +' + (spyCambio*100).toFixed(2) + '% - sentiment general favorable');
    else if (spyCambio < -0.005) motivos.push('S&P500 bajo ' + (spyCambio*100).toFixed(2) + '% - riesgo de arrastre en acciones');
    else motivos.push('S&P500 lateral - mercado de acciones sin tendencia definida');
  } else {
    corrScore = 0;
    motivos.push('Activo con baja correlacion directa al mercado general');
  }
  scores.correlacion = corrScore;

  // 6. ORO Y PETROLEO (riesgo global)
  var macroScore = 0;
  if (precioOro > 2100) { macroScore = activo.tipo === 'cripto' || activo.tipo === 'accion' ? -0.03 : 0.03; }
  else if (precioOro > 2000) { macroScore = 0.01; }
  if (precioPetroleo > 90) { macroScore -= 0.02; }
  // Note: this motivo replaces last one if we already have 5
  if (motivos.length < 5) {
    if (precioOro > 2100) motivos.push('Oro en $' + precioOro.toFixed(0) + ' - aversion al riesgo global, presion en activos growth');
    else motivos.push('Oro en $' + precioOro.toFixed(0) + ' - entorno de riesgo moderado, mercados estables');
  }
  scores.macro = macroScore;

  // 7. FACTOR MACRO DEL DIA
  if (hayMacro) { scores.macro -= 0.05; }

  // 8. EARNINGS PROXIMITY
  if (hayEarnings) { scores.volatilidad = (scores.volatilidad || 0) - 0.03; }

  // CALCULAR TOTAL PONDERADO
  var total = (scores.tendencia || 0) * 0.30 +
              (scores.rsi || 0) * 0.20 +
              (scores.volumen || 0) * 0.20 +
              (scores.volatilidad || 0) * 0.10 +
              (scores.correlacion || 0) * 0.15 +
              (scores.macro || 0) * 0.05;

  // CLASIFICACION - umbral dinamico
  var umbral = hayMacro ? 0.03 : 0.04;
  var direccion = total > umbral ? 'alcista' : total < -umbral ? 'bajista' : 'alta_conf';

  // PROBABILIDADES REALES
  var absScore = Math.abs(total);
  var probBase = Math.round(50 + Math.min(absScore * 300, 44));
  var probPrincipal, probAlcista, probBajista, probAltaConf;

  if (direccion === 'alcista') {
    probAlcista = probBase;
    probBajista = Math.max(5, Math.round((100 - probAlcista) * 0.7));
    probAltaConf = Math.max(3, 100 - probAlcista - probBajista);
    probPrincipal = probAlcista;
  } else if (direccion === 'bajista') {
    probBajista = probBase;
    probAlcista = Math.max(5, Math.round((100 - probBajista) * 0.7));
    probAltaConf = Math.max(3, 100 - probAlcista - probBajista);
    probPrincipal = probBajista;
  } else {
    // CONF IA = zona de indecision - probabilidades balanceadas
    probAlcista = Math.max(30, Math.round(50 + total * 200));
    probBajista = Math.max(30, Math.round(50 - total * 200));
    probAltaConf = Math.max(10, 100 - probAlcista - probBajista);
    // En CONF.IA mostramos el escenario dominante
    probPrincipal = Math.max(probAlcista, probBajista);
    if (probAlcista >= probBajista) direccion = 'alta_conf_alcista'; else direccion = 'alta_conf_bajista';
  }

  // Normalizar
  var sumProb = probAlcista + probBajista + probAltaConf;
  if (sumProb !== 100) {
    probAltaConf = Math.max(3, probAltaConf + (100 - sumProb));
  }

  // ESTRELLAS (1-5) basadas en la confianza del analisis
  var calidad = Math.min(absScore * 15 + (volRel > 1.3 ? 0.5 : 0) + (hayMacro ? -1 : 0), 5);
  var estrellas = Math.max(1, Math.min(5, Math.round(calidad + 1)));

  // OBJETIVO / STOP / UPSIDE
  var movExpected = absScore * 1.5;
  var objetivo = precio > 0 ? (precio * (1 + movExpected * (total > 0 ? 1 : -1))).toFixed(precio > 100 ? 2 : 4) : '0';
  var stop = precio > 0 ? (precio * (1 - movExpected * 0.6 * (total > 0 ? 1 : -1))).toFixed(precio > 100 ? 2 : 4) : '0';
  var upside = (movExpected * 100).toFixed(1);

  var escenarioPrincipal = direccion.indexOf('alcista') >= 0 ? 'ALCISTA' : direccion.indexOf('bajista') >= 0 ? 'BAJISTA' : 'CONF. IA';

  return {
    simbolo: sym, nombre: activo.n, tipo: activo.tipo, logo: activo.logo || '',
    icon: activo.icon || sym[0], color: activo.color || '#D4A017',
    direccion: direccion.replace('alta_conf_alcista','alta_conf').replace('alta_conf_bajista','alta_conf'),
    direccionBase: direccion,
    confianza: probPrincipal, score: total,
    prob_alcista: probAlcista, prob_bajista: probBajista, prob_alta_conf: probAltaConf,
    escenario_principal: escenarioPrincipal, prob_principal: probPrincipal,
    motivos: motivos.slice(0,5), precio: precio, rsi: parseFloat(rsi.toFixed(0)),
    volRel: parseFloat(volRel.toFixed(1)), estrellas: estrellas,
    objetivo: objetivo, stop: stop, upside: upside
  };
}

function generarSenalesIA() {
  var listEl = document.getElementById('ia-list');
  if (listEl) listEl.innerHTML = '<div style="text-align:center;padding:40px 20px;color:#8B949E;font-size:13px">Analizando mercados en tiempo real...<br><span style="font-size:11px;color:#30363D">RSI - Tendencia - Volumen - Correlacion - Macro</span></div>';

  var criptos = window._IA_ACTIVOS.filter(function(a){ return a.tipo === 'cripto'; });
  var otros = window._IA_ACTIVOS.filter(function(a){ return a.tipo !== 'cripto'; });
  var allData = {};
  var ySymbols = otros.map(function(a){ return a.ySymbol; }).filter(Boolean);
  ySymbols.push('GC=F','CL=F','SPY');

  // Fetch Binance 24hr ticker for criptos
  var bSyms = criptos.map(function(a){ return '"'+a.s+'USDT"'; }).join(',');
  var bProm = fetch('https://api.binance.com/api/v3/ticker/24hr?symbols=['+bSyms+']')
    .then(function(r){ return r.json(); })
    .then(function(data){
      data.forEach(function(d){
        var sym = d.symbol.replace('USDT','');
        allData[sym] = {
          precio: parseFloat(d.lastPrice),
          precio24h: parseFloat(d.openPrice),
          volumen24h: parseFloat(d.quoteVolume),
          volumenProm: parseFloat(d.quoteVolume) * 0.85,
          high24h: parseFloat(d.highPrice),
          low24h: parseFloat(d.lowPrice)
        };
      });
    }).catch(function(){ });

  // Fetch Yahoo Finance for stocks/ETF/metals/commodities/bonds
  var yProm = Promise.all(ySymbols.slice(0,8).map(function(sym){
    return fetch('https://query1.finance.yahoo.com/v8/finance/chart/'+encodeURIComponent(sym)+'?interval=1d&range=5d')
      .then(function(r){ return r.json(); })
      .then(function(d){
        try {
          var q = d.chart.result[0];
          var meta = q.meta;
          var closes = q.indicators.quote[0].close;
          var volumes = q.indicators.quote[0].volume;
          var validCloses = closes.filter(function(x){ return x != null; });
          var validVols = volumes.filter(function(x){ return x != null; });
          var lastClose = validCloses[validCloses.length-1] || meta.regularMarketPrice;
          var prevClose = validCloses[validCloses.length-2] || lastClose;
          var avgVol = validVols.length > 1 ? validVols.slice(0,-1).reduce(function(a,b){return a+b;},0) / (validVols.length-1) : validVols[0] || 1;
          var lastVol = validVols[validVols.length-1] || avgVol;
          var high = meta.regularMarketDayHigh || lastClose * 1.02;
          var low = meta.regularMarketDayLow || lastClose * 0.98;
          // Map ySymbol back to asset symbol
          window._IA_ACTIVOS.forEach(function(act){
            if (act.ySymbol === sym) {
              allData[act.s] = { precio: lastClose, precio24h: prevClose, volumen24h: lastVol, volumenProm: avgVol, high24h: high, low24h: low };
            }
          });
          // Store oro/petroleo/SPY
          if (sym === 'GC=F') allData['_ORO'] = lastClose;
          if (sym === 'CL=F') allData['_PETROLEO'] = lastClose;
          if (sym === 'SPY' && !allData['SPY']) allData['SPY'] = { precio: lastClose, precio24h: prevClose, volumen24h: lastVol, volumenProm: avgVol, high24h: high, low24h: low };
        } catch(e){}
      }).catch(function(){});
  }));

  Promise.all([bProm, yProm]).then(function(){
    var precioBTC = (allData['BTC'] || {}).precio || 0;
    var precio24hBTC = (allData['BTC'] || {}).precio24h || precioBTC;
    var btcCambio = precio24hBTC > 0 ? (precioBTC - precio24hBTC) / precio24hBTC : 0;
    var precioSPY = (allData['SPY'] || {}).precio || 0;
    var precio24hSPY = (allData['SPY'] || {}).precio24h || precioSPY;
    var spyCambio = precio24hSPY > 0 ? (precioSPY - precio24hSPY) / precio24hSPY : 0;
    var precioOro = allData['_ORO'] || (allData['GLD'] || {}).precio || 2050;
    var precioPetroleo = allData['_PETROLEO'] || (allData['USO'] || {}).precio || 80;
    // Macro events this week (hardcoded until Week 2)
    var hayMacro = true;
    var earningsSyms = ['NVDA','AAPL','MSFT'];
    var signals = [];
    window._IA_ACTIVOS.forEach(function(activo){
      var d = allData[activo.s] || {};
      var datos = {
        precio: d.precio || 0,
        precio24h: d.precio24h || 0,
        volumen24h: d.volumen24h || 0,
        volumenProm: d.volumenProm || 0,
        high24h: d.high24h || 0,
        low24h: d.low24h || 0,
        precioBTC: precioBTC,
        precioSPY: precioSPY,
        btcCambio: btcCambio,
        spyCambio: spyCambio,
        precioOro: precioOro,
        precioPetroleo: precioPetroleo,
        hayMacro: hayMacro,
        hayEarnings: earningsSyms.indexOf(activo.s) >= 0
      };
      if (datos.precio > 0) signals.push(_calcIAScore(activo, datos));
    });
    signals.sort(function(a,b){ return b.confianza - a.confianza; });
    window._iaSignals = signals;
    window._IA_PRECIOS = allData;
    _actualizarContadores(signals);
    _renderIALista(signals);
    _iniciarBanner();
    var upd = document.getElementById('ia-updated');
    if (upd) { var now = new Date(); upd.textContent = 'Act. ' + now.getHours() + ':' + (now.getMinutes()<10?'0':'') + now.getMinutes(); }
  });
}

function _actualizarContadores(signals) {
  var al = signals.filter(function(s){ return s.direccion === 'alcista'; }).length;
  var ba = signals.filter(function(s){ return s.direccion === 'bajista'; }).length;
  var ac = signals.filter(function(s){ return s.direccion === 'alta_conf'; }).length;
  var ea = document.getElementById('ia-num-alcista'); if(ea) ea.textContent = al;
  var eb = document.getElementById('ia-num-bajista'); if(eb) eb.textContent = ba;
  var ec = document.getElementById('ia-num-altaconf'); if(ec) ec.textContent = ac;
  var sub = document.getElementById('ia-subtitulo');
  if(sub) sub.textContent = signals.length + ' SENALES IA - ORDENADAS POR PROBABILIDAD';
}

function setIAFiltro(filtro, el) {
  window._IA_FILTRO_ACTUAL = filtro;
  var pills = document.querySelectorAll('.ia-pill');
  pills.forEach(function(p) {
    var isActive = p.getAttribute('data-filtro') === filtro;
    p.style.background = isActive ? '#D4A017' : 'transparent';
    p.style.color = isActive ? '#000' : (
      p.getAttribute('data-filtro') === 'alcista' ? '#3FB950' :
      p.getAttribute('data-filtro') === 'bajista' ? '#FF4444' :
      p.getAttribute('data-filtro') === 'alta_conf' ? '#D4A017' :
      p.getAttribute('data-filtro') === 'cripto' ? '#A78BFA' :
      p.getAttribute('data-filtro') === 'accion' ? '#58A6FF' :
      p.getAttribute('data-filtro') === 'etf' ? '#F0883E' :
      p.getAttribute('data-filtro') === 'metal' ? '#FFD700' :
      p.getAttribute('data-filtro') === 'materia_prima' ? '#C8A96E' :
      p.getAttribute('data-filtro') === 'bono' ? '#79C0FF' : '#D4A017'
    );
    p.style.borderColor = isActive ? '#D4A017' : '';
  });
  _renderIALista(window._iaSignals || []);
}

function _renderIALista(signals) {
  var listEl = document.getElementById('ia-list');
  if (!listEl) return;
  var filtro = window._IA_FILTRO_ACTUAL || 'todo';
  var filtered = signals.filter(function(s) {
    if (filtro === 'todo') return true;
    if (filtro === 'alcista') return s.direccion === 'alcista';
    if (filtro === 'bajista') return s.direccion === 'bajista';
    if (filtro === 'alta_conf') return s.direccion === 'alta_conf';
    if (filtro === 'cripto') return s.tipo === 'cripto';
    if (filtro === 'accion') return s.tipo === 'accion';
    if (filtro === 'etf') return s.tipo === 'etf';
    if (filtro === 'metal') return s.tipo === 'metal';
    if (filtro === 'materia_prima') return s.tipo === 'materia_prima';
    if (filtro === 'bono') return s.tipo === 'bono';
    return true;
  });
  if (!filtered.length) {
    listEl.innerHTML = '<div style="text-align:center;padding:40px 20px;color:#8B949E;font-size:13px">No hay senales para este filtro hoy</div>';
    return;
  }
  listEl.innerHTML = filtered.map(function(s, i) {
    var dirColor = s.direccion==='alcista'?'#3FB950':s.direccion==='bajista'?'#FF4444':'#D4A017';
    var dirBg = s.direccion==='alcista'?'#3FB95020':s.direccion==='bajista'?'#FF444420':'#D4A01720';
    var dirLabel = s.direccion==='alcista'?'ALCISTA':s.direccion==='bajista'?'BAJISTA':'CONF. IA';
    var tipoColor = s.tipo==='cripto'?'#A78BFA':s.tipo==='accion'?'#58A6FF':s.tipo==='etf'?'#F0883E':s.tipo==='metal'?'#FFD700':s.tipo==='materia_prima'?'#C8A96E':s.tipo==='bono'?'#79C0FF':'#D4A017';
    var tipoLabel = s.tipo==='cripto'?'Cripto':s.tipo==='accion'?'Acciones EEUU':s.tipo==='etf'?'ETF':s.tipo==='metal'?'Metal':s.tipo==='materia_prima'?'Mat. Prima':s.tipo==='bono'?'Bono':'Otro';
    var estrellas = '';
    for(var e=0;e<5;e++) estrellas += e < s.estrellas ? '<span style="color:#D4A017">&#9733;</span>' : '<span style="color:#30363D">&#9733;</span>';
    var precioFmt = s.precio > 10000 ? '$'+s.precio.toFixed(0) : s.precio > 100 ? '$'+s.precio.toFixed(2) : s.precio > 1 ? '$'+s.precio.toFixed(3) : '$'+s.precio.toFixed(4);
    var pct24 = s.precio > 0 && s.precio24h > 0 ? ((s.precio - s.precio24h)/s.precio24h*100).toFixed(2) : '0.00';
    var pctColor = parseFloat(pct24) >= 0 ? '#3FB950' : '#FF4444';
    var pctStr = (parseFloat(pct24) >= 0 ? '+' : '') + pct24 + '%';
    return '<div class="ia-row" id="ia-row-'+i+'" onclick="toggleIARow('+i+')" style="border-bottom:1px solid #21262D;cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0);touch-action:manipulation">' +
      '<div style="padding:12px 14px 8px">' +
        '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">' +
          '<div style="display:flex;align-items:center;gap:8px">' +
            '<div style="width:36px;height:36px;border-radius:50%;background:'+s.color+'15;border:1.5px solid '+s.color+'40;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden">' +
              (s.logo ? '<img src="'+s.logo+'" alt="'+s.simbolo+'" style="width:24px;height:24px;object-fit:contain;border-radius:50%" onerror="this.style.display=\'none\';this.nextSibling.style.display=\'flex\'">' +
              '<span style="display:none;font-size:12px;font-weight:800;color:'+s.color+'">'+s.simbolo.substring(0,1)+'</span>' :
              '<span style="font-size:12px;font-weight:800;color:'+s.color+'">'+s.simbolo.substring(0,1)+'</span>') +
            '</div>' +
            '<div>' +
              '<div style="display:flex;align-items:center;gap:5px">' +
                '<span style="font-size:14px;font-weight:700;color:#E6EDF3">'+s.simbolo+'</span>' +
                '<span style="font-size:9px;font-weight:700;background:'+dirBg+';color:'+dirColor+';border:1px solid '+dirColor+'60;border-radius:4px;padding:1px 5px">'+dirLabel+'</span>' +
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
        '<div style="display:flex;align-items:center;justify-content:space-between;margin-top:4px">' +
          '<span style="font-size:10px;color:#8B949E">PROB. IA <span style="color:'+dirColor+';font-weight:700">'+s.confianza+'%</span></span>' +
        '</div>' +
        '<div style="margin-top:4px;height:3px;background:#21262D;border-radius:2px"><div style="height:100%;width:'+Math.min(s.confianza,100)+'%;background:'+dirColor+';border-radius:2px;transition:width 0.5s"></div></div>' +
      '</div>' +
      '<div id="ia-detail-'+i+'" style="display:none;padding:0 14px 14px;background:#0D1117;border-top:1px solid #21262D">'+_buildIADetail(s)+'</div>' +
    '</div>';
  }).join('');
}

function _buildIADetail(s) {
  var dirColor = s.direccion==='alcista'?'#3FB950':s.direccion==='bajista'?'#FF4444':'#D4A017';
  var dirLabel = s.direccion==='alcista'?'ALCISTA':s.direccion==='bajista'?'BAJISTA':'CONF. IA';
  var signo = s.direccion==='alcista'?'+':s.direccion==='bajista'?'-':'*';
  var html = '<div style="padding-top:12px">';
  html += '<div style="background:'+dirColor+'15;border:1px solid '+dirColor+'40;border-radius:10px;padding:10px 12px;margin-bottom:10px">';
  html += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">';
  html += '<span style="font-size:13px;font-weight:700;color:'+dirColor+'">'+signo+' '+dirLabel+'</span>';
  html += '<span style="background:'+dirColor+';color:#000;font-size:11px;font-weight:800;border-radius:6px;padding:2px 8px">PRINCIPAL '+s.prob_principal+'%</span>';
  html += '</div>';
  html += '<div style="font-size:11px;font-weight:600;color:#8B949E;letter-spacing:0.5px;margin-bottom:6px">JUSTIFICACION DEL ANALISIS</div>';
  (s.motivos || []).slice(0,5).forEach(function(m) {
    html += '<div style="display:flex;gap:6px;margin-bottom:5px"><span style="color:'+dirColor+';flex-shrink:0;font-weight:700">-></span><span style="font-size:11px;color:#C9D1D9;line-height:1.4">'+m+'</span></div>';
  });
  html += '</div>';
  html += '<div style="display:flex;gap:8px;margin-bottom:10px">';
  html += '<div style="flex:1;background:#21262D;border-radius:8px;padding:8px;text-align:center"><div style="font-size:9px;color:#8B949E;margin-bottom:2px">Objetivo</div><div style="font-size:12px;font-weight:700;color:#3FB950">$'+s.objetivo+'</div></div>';
  html += '<div style="flex:1;background:#21262D;border-radius:8px;padding:8px;text-align:center"><div style="font-size:9px;color:#8B949E;margin-bottom:2px">Stop</div><div style="font-size:12px;font-weight:700;color:#FF4444">$'+s.stop+'</div></div>';
  html += '<div style="flex:1;background:#21262D;border-radius:8px;padding:8px;text-align:center"><div style="font-size:9px;color:#8B949E;margin-bottom:2px">Upside</div><div style="font-size:12px;font-weight:700;color:#D4A017">+'+s.upside+'%</div></div>';
  html += '</div>';
  html += '<div style="font-size:10px;color:#8B949E;margin-bottom:6px;font-weight:600">OTROS ESCENARIOS</div>';
  html += '<div style="display:flex;gap:6px">';
  if(s.direccion !== 'alcista') html += '<div style="flex:1;background:#3FB95015;border:1px solid #3FB95040;border-radius:8px;padding:6px;text-align:center"><div style="font-size:9px;color:#3FB950">ALCISTA</div><div style="font-size:13px;font-weight:700;color:#3FB950">'+s.prob_alcista+'%</div></div>';
  if(s.direccion !== 'bajista') html += '<div style="flex:1;background:#FF444415;border:1px solid #FF444440;border-radius:8px;padding:6px;text-align:center"><div style="font-size:9px;color:#FF4444">BAJISTA</div><div style="font-size:13px;font-weight:700;color:#FF4444">'+s.prob_bajista+'%</div></div>';
  if(s.direccion !== 'alta_conf') html += '<div style="flex:1;background:#D4A01715;border:1px solid #D4A01740;border-radius:8px;padding:6px;text-align:center"><div style="font-size:9px;color:#D4A017">CONF.IA</div><div style="font-size:13px;font-weight:700;color:#D4A017">'+s.prob_alta_conf+'%</div></div>';
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
