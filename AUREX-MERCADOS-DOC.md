# AUREX - DOCUMENTACION TECNICA: TAB MERCADOS
Generado: 3 de Abril de 2026 | HEAD: 3fe0e7d34d9ad2b7b6aef903c69cb7f8b05c1998

---

## 1. DESCRIPCION GENERAL

El tab Mercados es la pantalla de exploracion de activos financieros en tiempo real.
Permite al usuario ver precios actualizados de cripto, acciones, ETFs, futuros, metales
y bonos, filtrar por mercado/pais, cambiar el periodo temporal, y acceder a un banner
de noticias e indicadores globales. Tambien incluye Aurex Pulse (Fear & Greed), un
banner combinado de contexto macro y un buscador de activos.

---

## 2. ESTRUCTURA VISUAL (de arriba a abajo)

### 2.1 TABS PRINCIPALES (Mercados / Futuros)
Dos botones alineados a la derecha, compactos, sobre el buscador.
- 'Mercados' y 'Futuros' con padding 2px 8px, font-size 10px, border-radius 10px
- Boton activo: fondo #D4A017, texto #111
- Boton inactivo: fondo #21262D, texto #8B949E
- El contenedor tiene justify-content flex-end (alineado a la derecha)
- Estilos definidos en index.html: sOn, sOff, _comboSOn, _comboSOff
- Funcion: sw(tab, el) - cambia tab activo

### 2.2 BUSCADOR
Campo de texto arriba del banner de noticias.
- Placeholder: 'Buscar activo...'
- Al escribir: filtra activos en tiempo real
- Funcion filtrado: (varia segun implementacion en index.html)

### 2.3 BANNER COMBO (mkt-combo-banner)
Banner dinamico horizontal con fondo oscuro que puede mostrar:
a) Contenido propio del mercado activo (noticias, indicadores)
b) Banner de eventos / noticias relevantes

Funcion: _renderComboBanner('mkt-combo-banner')
El contenido del banner se actualiza al cambiar de tab o pais.
El banner incluye dots de navegacion para deslizar entre items.
Funcion _comboFlip(): cambia entre sub-items del banner cada N segundos.

### 2.4 AUREX PULSE - FEAR & GREED (mkt-fear-greed)
Gauge semicircular SVG que muestra el sentimiento de mercado (0-100).

Display:
- Aguja apuntando al valor actual
- Valor numerico debajo
- Etiqueta de texto (MIEDO EXTREMO / MIEDO / NEUTRAL / AVIDEZ / AVIDEZ EXTREMA)
- Colores: <40 rojo | 40-60 dorado | >60 verde

Categorias del filtro activo (window._pulseActiveFilter):
- CRIPTO: cuando el tab activo es cripto o stable
- ACCIONES: cuando es acciones o etfs
- FUTUROS: cuando es futuros
- COMOD: cuando es metales o bonos
- GLOBAL: vista combinada

Funcion principal: _renderFearGreed(containerId)
Fuentes de datos (_fetchPulseRaw async):
- VIX (volatilidad): Yahoo Finance (^VIX)
- S&P500: Yahoo Finance (^GSPC)
- BTC: Binance (BTCUSDT)
- Oro (GC=F): Yahoo Finance
- Petroleo (CL=F): Yahoo Finance
- RSI de BTC/SPY: calculado internamente con _calcRSI14(closes)

Calculo del score:
- _calcPulseScore(raw, categoria)
- Variables con pesos diferenciados por categoria:
  - btc24h: peso 0.3 cripto, 0.05 acciones, 0.1 global
  - sp24h: peso 0.05 cripto, 0.4 acciones, 0.2 global
  - vix: peso 0.2 en acciones y global
  - gold: peso 0.3 en COMOD
  - oil: peso 0.3 en COMOD, 0.1 global
  - btcRSI: peso 0.3 en cripto
  - spyRSI: peso 0.2 en acciones

Renderizado SVG: _renderFearGreedGauge(value, color, compact, value2, value3)
Crea SVG con arcos de colores + aguja rotada segun valor.
Sub-funcion interna arcSeg(start, end, color): genera cada arco del gauge.

Popup Variables del Modelo (Ver Variables del Modelo):
- Boton en tab IA: 'Ver Variables del Modelo'
- Funcion apertura: showIAVariablesPopup()
- Funcion cierre: _closeIAVarsPopup()
- Muestra tabla con: variable, valor actual, peso en score
- Funciona con ontouchstart + onclick en iOS
- Proteccion anti-doble-disparo heredada del sistema del portfolio

### 2.5 BANNER DE NOTICIAS (mkt-news-banner)
Banner con informacion macro/noticias relevantes para el mercado activo.
Funcion: _renderMktNewsBanner(containerId)
Se actualiza al cambiar tab o al llamar renderTab().

### 2.6 SUB-TABS: TIPOS DE ACTIVOS
Fila de botones que filtra el tipo de activo dentro de cada tab:

Tab Mercados:
- Cripto | Stable | Acciones | ETFs | Metales | Bonos
- Cada boton llama: sw(tipo, el)

Tab Futuros:
- Futuros (tab dedicado con su propia data)

### 2.7 SUB-TABS DE PAISES (swPais)
Solo visible cuando el tipo activo es 'acciones':
- USA | BR | EU | ES | JP | CN
- Funcion: swPais(pais, el)
- Internamente mapea: br->brasil, eu->europa, es->europa, jp->japon, cn->china
- Cambia el array de datos usado: DATA.acciones[paisKey]

### 2.8 FILTRO TEMPORAL (tfrow - OCULTO)
La fila tfrow (botones 24h/7d/1m/3m/1a globales) esta oculta con display:none.
En su lugar, cada activo tiene sus propios botones de periodo (ver seccion 2.9).
Funcion: stf(el, tf) - cambia el periodo global
- window._activeTf: periodo activo ('24h' | '7d' | '1m' | '3m' | '1a')
- Al cambiar periodo: llama fetchYahoo(tab, pais, tf) o fetchBinance
- Actualiza visualmente todos los .mkt-tf-btn con el nuevo periodo activo

### 2.9 LISTA DE ACTIVOS (cnt)
Cada activo se renderiza via _appendMktRow(cnt, item, tab).
La funcion verifica window._mktRenderedSyms para evitar duplicados.

Estructura de cada fila (item-row / row-{s}):

Columna izquierda:
- Logo circular 28px (img con onerror fallback SVG con letras)
- Para cripto: https://assets.coincap.io/assets/icons/{sym}@2x.png
- Para acciones: https://financialmodelingprep.com/image-stock/{sym}.png
- Fallback: SVG generado con las primeras 4 letras del ticker

Columna central (identificacion):
- Simbolo (s) en bold 14px #E6EDF3
- Nombre (n) en 11px #8B949E, max 90px con ellipsis

Columna medio (spark-{s}):
- Zona para sparkline SVG cuando llega el precio historico
- Por defecto muestra los dots IA centrados
- SVG 64x28px generado por _buildSparklineSVG(closes, isUp)

Columna derecha:
- Precio actual (p-{s}): '...' hasta cargar, luego precio formateado
- Label cierre (lbl-{s}): etiqueta 'Ult. cierre' en dorado (display:none por defecto)
- Variacion % (c-{s}): '...' hasta cargar, luego % coloreado
- Dots IA: _buildDotsHTML(_getActivoScores(item.s))
- Botones de periodo: 24h | 7d | 1m | 3m | 1a

#### Botones de periodo dentro del activo (.mkt-tf-btn)
NUEVO desde commit 3fe0e7d3:
- 5 spans con class='mkt-tf-btn' y data-tf='{periodo}'
- Al hacer click: stf(null, periodo) - cambia el periodo GLOBAL
- Fondo dorado (#D4A017) en el periodo activo, gris (#21262D) en los demas
- Actualizado visualmente por stf() al cambiar periodo:
  document.querySelectorAll('.mkt-tf-btn').forEach(b => b.style.background = ...)
- touch-action:manipulation para iOS
- ontouchstart + onclick para compatibilidad iPhone
- font-size 9px, padding 1px 3px, border-radius 3px

### 2.10 MODO EDICION (edit-btn / edit-banner)
Boton 'Editar orden' arriba de la lista.
- toggleEdit(): activa/desactiva modo edicion
- En modo edicion: se muestran botones arriba/abajo en cada fila para reordenar
- El banner 'edit-banner' muestra mensaje 'Arrastra para reordenar'
- Funciones: _moveRow(row, dir), con botones upBtn y dnBtn por fila
- window._editMode: boolean del estado actual

---

## 3. FUENTES DE DATOS

### 3.1 Cripto y Stable (fetchBinance)
Funcion: fetchBinance(tab)
- Usa DATA[tab] (DATA.cripto o DATA.stable)
- Para USDT y stablecoins con precio fijo: precio hardcodeado ($1.0000)
- Para el resto: Binance REST /api/v3/ticker/24hr?symbols=[...]
- Actualiza en DOM: p-{s} (precio) y c-{s} (% variacion 24h)
- Formato precio: _fmt(valor, 'usd') -> usa applyFormat para decimales
- Actualiza sparklines en spark-{s} con fetchBinanceBatch si hay datos historicos

### 3.2 Acciones, ETFs, Futuros, Metales, Bonos (fetchYahoo)
Funcion: fetchYahoo(tab, pais, tf)
- Usa DATA.acciones[paisKey] o DATA[tab]
- Proxy: corsproxy.io + Yahoo Finance /v8/finance/chart/{sym}
- Parametros segun tf: interval (1d, 4h, 1wk) + range (1d, 7d, 1mo, 3mo, 1y)
- Actualiza p-{s}, c-{s} en DOM
- Si mercado cerrado: muestra lbl-{s} ('Ult. cierre') en dorado
- Actualiza sparklines con los closes historicos
- Para tf='24h': usa priceChangePercent o calcula vs previousClose

### 3.3 Carga de background (_loadMktBackground)
Funcion: _loadMktBackground(tab, pais)
- Se llama 1200ms despues de renderTab para no bloquear UI
- Carga datos adicionales (sparklines, scores IA) para activos que ya se cargaron

---

## 4. FUNCIONES PRINCIPALES

### renderTab(tab, pais)
Funcion central que inicializa la vista del tab seleccionado.
1. Actualiza _activeTab y _activePais
2. Renderiza _renderComboBanner, _renderMktNewsBanner
3. Calcula filtro Pulse activo (pulseMap) y llama _renderFearGreed
4. Limpia cnt.innerHTML
5. Llama _appendMktRow para cada item de DATA[tab]
6. Resetea modo edicion
7. Llama fetchBinance o fetchYahoo segun el tab
8. Llama _loadMktBackground con setTimeout 1200ms

### window.sw(tab, el)
Cambia el sub-tab activo dentro de Mercados.
- Llama renderTab(tab, _activePais)
- Actualiza estilos del boton activo
- Guarda window._activeTab

### window.swPais(pais, el)
Cambia el pais en el sub-tab de Acciones.
- Llama renderTab('acciones', pais)
- Actualiza window._activePais

### window.stf(el, tf)
Cambia el filtro temporal global.
- Actualiza window._activeTf
- Actualiza estilos de .tfs .tf (tfrow original, aunque esta oculto)
- Actualiza todos los .mkt-tf-btn visualmente (fondo dorado/gris)
- Actualiza la etiqueta de tiempo en 'tf-time'
- Llama fetchBinance(tab) o fetchYahoo(tab, pais, tf)

### window.toggleEdit()
Activa o desactiva el modo de reordenamiento manual.
- Muestra/oculta edit-banner
- Agrega/remueve botones de flecha en cada fila

### window._moveRow(row, dir)
Mueve una fila del listado de activos arriba (-1) o abajo (1).

---

## 5. BANNER DE FUTUROS (_renderFuturesBanner)
Funcion: _renderFuturesBanner(containerId)
Fuentes: _fetchFuturesData() -> Yahoo Finance para futuros principales
Activos tipicos: S&P500 Fut, Nasdaq Fut, Dow Fut, Petroleo, Oro, etc.
Se actualiza al cambiar de tab y al llamar _updateTotals en Portfolio.

---

## 6. DATOS ESTATICOS (DATA)
Objeto global DATA con arrays de activos por categoria:
- DATA.cripto: [{s:'BTC', n:'Bitcoin'}, {s:'ETH', n:'Ethereum'}, ...]
- DATA.stable: [{s:'USDT', n:'Tether'}, ...]
- DATA.acciones: {usa:[...], brasil:[...], europa:[...], japon:[...], china:[...]}
- DATA.etfs: [{s:'SPY', n:'S&P 500 ETF'}, ...]
- DATA.futuros: [{s:'ES=F', n:'S&P 500 Futures'}, ...]
- DATA.metales: [{s:'GC=F', n:'Oro'}, ...]
- DATA.bonos: [{s:'^TNX', n:'Treasury 10Y'}, ...]

Cada item tiene como minimo: {s: simbolo, n: nombre}
Algunos tienen ademas: ySymbol (simbolo alternativo para Yahoo), logo, color

---

## 7. FUNCIONES GLOBALES (window.*)

| Funcion | Descripcion |
|---|---|
| sw(tab, el) | Cambia sub-tab activo |
| swPais(pais, el) | Cambia pais en acciones |
| stf(el, tf) | Cambia filtro temporal global |
| toggleEdit() | Activa/desactiva modo edicion |
| _moveRow(row, dir) | Mueve fila arriba/abajo |
| renderTab(tab, pais) | Renderiza el tab completo |
| _openBannerEdit(elId) | Abre editor del banner |
| _saveBannerEdit() | Guarda cambios del banner |
| showFearGreedInfo() | Popup info Fear & Greed |
| showIAVariablesPopup() | Popup variables del modelo Pulse |
| _closeIAVarsPopup() | Cierra popup variables |

---

## 8. VARIABLES GLOBALES

| Variable | Tipo | Descripcion |
|---|---|---|
| window._activeTab | String | Tab activo: cripto/stable/acciones/etfs/futuros/metales/bonos |
| window._activePais | String | Pais activo: usa/brasil/europa/japon/china |
| window._activeTf | String | Periodo temporal: 24h/7d/1m/3m/1a |
| window._mktRenderedSyms | Object | {SYM: true} para evitar duplicados al renderizar |
| window._pulseActiveFilter | String | Categoria del Pulse: CRIPTO/ACCIONES/FUTUROS/COMOD/GLOBAL |
| window._iaSignals | Array | Senales IA para dots y termometro |
| window._IA_ACTIVOS | Array | Activos del modelo IA con metadata |

---

## 9. AUREX PULSE - DETALLES TECNICOS

### _fetchPulseRaw() (async)
Obtiene datos crudos de multiples fuentes:
- Binance: BTCUSDT /ticker/24hr para btcPct, btcPrice, btcPrices (closes 1h)
- Yahoo ^VIX: para vix value
- Yahoo ^GSPC: para sp500Pct, spPrices (closes 1h) -> calcula spyRSI
- Yahoo GC=F: para goldPct
- Yahoo CL=F: para oilPct
- Calcula btcRSI via _calcRSI14(closes)
- Timeout de 8 segundos por fetch, usa cache si falla

### _fetchPulseForCategory(cat) (async)
Combina _fetchPulseRaw con _fetchMacroGeo para categoria especifica.

### _calcRSI14(closes)
Calcula RSI de 14 periodos a partir de array de precios.
- Retorna valor 0-100
- >70: sobrecomprado | <30: sobrevendido

### _pctToScore(pct, scale)
Convierte variacion % en score 0-100:
- 50 + (pct/scale)*50
- Limitado a [0, 100]

### _vixToScore(vix)
- 100 - (vix-10)*3.0
- VIX alto = score bajo (mas miedo)

### _goldToScore(pct)
- 50 - pct*25 (oro sube = miedo, baja = optimismo)

### _oilToScore(pct)
- 50 - abs(pct)*15 (alta volatilidad = incertidumbre)

### _renderFearGreedGauge(value, color, compact, value2, value3)
Genera el SVG del gauge:
- 5 arcos de colores de fondo (rojo, naranja, dorado, amarillo, verde)
- Aguja central rotada segun value (0=izquierda, 100=derecha)
- Valores opcionales value2/value3 para comparacion (lineas secundarias)

---

## 10. HISTORIAL DE COMMITS - SESION 3/4/2026

(mismo historial que AUREX-PORTFOLIO-DOC.md)

| SHA completo | Descripcion | Fecha UTC |
|---|---|---|
| 3fe0e7d34d9ad2b7b6aef903c69cb7f8b05c1998 | Fix: ··· UTF-8 -> ASCII en _appendMktRow | 2026-04-03T07:36:05Z |
| e1103a4578513fe2450a52597e91d5188d25fff5 | Fix: botones tf Mercados - quita + duplicado | 2026-04-03T07:31:55Z |
| ecffeec9e8dbb663d952de9c331f669081ef4d05 | Mercados: filtros tf dentro de activos + oculta tfrow | 2026-04-03T07:29:01Z |
| 2856c82023eed7b866f005c7c125fb9c69f99140 | Mercados: tabs mas chicos a la derecha | 2026-04-03T07:22:39Z |
| 40e8d4b9664cbc1450e1de34bc04539579c7314c | Fix iOS: anti-double-fire dropdown portfolio + Ver Variables | 2026-04-03T07:10:23Z |
| 55de4f84a61ab0fcfb51f759b594a7c4aa5b160c | Fix iOS: ontouchstart dropdown + Ver Variables | 2026-04-03T07:06:35Z |
| d814fb1b6df6aac6de3bfcb49cf30f1c9f995521 | Fix iOS: touch-action dropdown portfolio | 2026-04-03T06:55:05Z |
| 151ae4945061ee9b1078b0ab211e26e3d7f269ba | Mercados: tabs + paises compacto + fix Espana/Japon | 2026-04-03T06:11:35Z |
| 7a739131f06f7b814aa05221f29d8ca054bd5bff | Mercados: elimina espacio banner eventos | 2026-04-03T05:51:41Z |
| da092ddcd714cef288fbe356354324d1b9f31a18 | Fix combo banner: display switch | 2026-04-03T05:44:10Z |
| 622cd381b142a0ee9a2751ca56c99faf2fbba125 | Fix combo banner: background slide + dot onclick | 2026-04-03T05:39:54Z |
| 786d4e48d87c5bec910fe5347246d96d5edd7b34 | Mercados: banner combo + buscador arriba + pulse | 2026-04-03T05:34:59Z |
| 39dd8013b1b113f714dbeb14715b924429d25d3a | Fix popup ?: _closeThermoHelp global + iPhone | 2026-04-03T05:01:05Z |
| 0119c928c471bb1af52d861b3f0fa59705249825 | Fix popup ?: overlay+boton Entendido iPhone | 2026-04-03T04:57:50Z |
| 2663239c270f2285102b854f6f025d830b5075ba | Termometro: frases contexto + boton ? popup | 2026-04-03T04:52:28Z |
| f66572984871feea72ad31013b1e01bd5f80adf5 | Termometro: mensaje con accion concreta | 2026-04-03T04:41:53Z |
| e89aaf07d1fb7c6cbee16d0f3ad196ab0e6f5e7f | Fix _calcPortPeriod: precios historicos | 2026-04-03T04:30:41Z |
| d9b55f30499a1d25f9f1797f9190b0bbe0376134 | Fix 24h dropdown + Agregar grande | 2026-04-03T04:24:58Z |
| cc13d06b70e16db2be4613b6c3d8f14c535d8d74 | Header portfolio: badge 24h dorado | 2026-04-03T04:18:44Z |
| 628aadbde85553874a45532023946e1640c840e3 | Rediseno header portfolio: periodos visibles | 2026-04-03T04:11:31Z |

---

Generado por Claude Sonnet 4.6 - 3/04/2026