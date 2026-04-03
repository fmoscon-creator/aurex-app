# AUREX - DOCUMENTACION TECNICA: TAB PORTFOLIO
Generado: 3 de Abril de 2026 | HEAD: 3fe0e7d34d9ad2b7b6aef903c69cb7f8b05c1998

---

## 1. DESCRIPCION GENERAL

El tab Portfolio es la pantalla central de gestion de cartera personal del usuario.
Permite ver el valor total de sus activos, el rendimiento por periodo, agregar y
eliminar activos, reordenarlos, acceder a detalles individuales y convertir monedas.
Los datos se persisten en Supabase vinculados al usuario autenticado.

---

## 2. ESTRUCTURA VISUAL (de arriba a abajo)

### 2.1 BANNER DE MERCADOS (port-market-banner)
Barra horizontal scrolleable que muestra el estado de los mercados globales.
- Cada mercado muestra: bandera, nombre, estado ABIERTO/CERRADO, tiempo hasta apertura/cierre
- Mercados: EEUU, ARG, BRASIL, LONDRES, ESPANA, ALEMANIA, FRANCIA, JAPON, CHINA, HONGKONG, ASIA
- Boton lapiz (editar) abre selector para activar/desactivar mercados
- Horarios en UTC vs reloj local del dispositivo
- Guardado en localStorage: aurex_markets_pref (array JSON de IDs)
- Funcion: _renderMarketBanner(containerId)
- Funcion edicion: editMarketBanner() -> usa port-modal generico
- Funcion toggle: toggleMktPref(nombreMercado)

### 2.2 HEADER DE VALOR TOTAL
Seccion con fondo oscuro que muestra el resumen del portfolio.

#### Badge de moneda (port-curr-badge)
- Cicla USD -> USDT -> BTC al hacer click
- Funcion: _cyclePortCurrency()
- Variable: window._portCurrency
- Actualiza: _updatePortTotalDisplay()

#### Importe grande (port-total)
- Valor total de la cartera en la moneda seleccionada
- USD: 'USD 12.345,67' | USDT: 'T 12.345,67' | BTC: 'BTC 0,18523' (5 dec)
- Si BTC no tiene precio: muestra 'BTC ---'

#### Fila de periodo y PnL
- Botones: 24h | 1m | 3m | 1y | Desde compra
- Boton activo: fondo #F59E0B, texto negro, font-weight 700
- Recalcula: diferencia USD (port-pnl-usd) y porcentaje (port-pnl-pct)
- Fuente: window._IA_PRECIOS para precios historicos
- Funcion: portTotalPeriod(btn, period)
- period valido: '24h' | '1m' | '3m' | '1y' | 'max' (= Desde compra)

#### Badge 24h con dropdown
- Muestra % cambio del total en 24h
- Click abre dropdown con periodos: 24h / 7d / 1m / 3m / 1y / Desde compra
- Proteccion anti-doble-disparo iOS:
  - window._ptTS: timestamp badge principal (umbral 350ms)
  - window._ppTS: timestamp items dropdown (umbral 350ms)
- Inicializado por: _initPortDropdowns() (llamada 50ms post-render)
- Funciones toggle: _togglePortPeriodDD(), _togglePortCurrDD()
- Funciones seleccion: _selectPortPeriod(key), _selectPortCurr(cur)

#### Fila 3: mejor activo + botones
- port-best-badge: activo con mayor % PnL (ej: 'BTC +12,3%')
- Boton '+ Agregar activos': openAddActivo()
- Boton icono conversor: openPortConversor()

### 2.3 TERMOMETRO DE RIESGO (port-thermo)
Barra horizontal de colores que visualiza distribucion del capital segun senales IA.

Segmentos:
- Verde (#3FB950): ALCISTA - capital con senal positiva
- Rojo (#F85149): BAJISTA - capital con senal negativa
- Dorado (#D4A017): ALTA CONV-IA - senal rara de alta conviccion
- Gris (#333): SIN SENAL - activos sin senal activa

Debajo de la barra:
- Frase contextual segun escenario (ej: 'Tu cartera esta en zona alcista')
- Boton ? -> popup explicativo

Funcion: _renderThermoRisk(items)
Fuentes: window._iaSignals + window._pcPrices

Popups del Termometro:
- showThermoHelp(): crea div overlay explicativo en DOM
- _closeThermoHelp(): lo elimina del DOM
- showThermoInfo(): usa port-modal generico con la misma info
Contenido popup: explica cada color (ALCISTA, ALTA CONV-IA, BAJISTA, SIN SENAL)

### 2.4 LISTA DE ACTIVOS (port-cnt)
Cada activo = div (port-row-{id}) con esta estructura:

Columna izquierda:
- Flecha arriba (triangulo): movePortfolioItem(id, -1)
- Flecha abajo: movePortfolioItem(id, 1)
- Orden guardado en localStorage: aurex_port_order

Logo:
- Con logo: imagen circular 28px (rowAct.logo)
- Sin logo: circulo de color con primera letra

Columna central (clickeable):
- Simbolo en bold 14px
- Badge tipo (Cripto / Accion / ETF)
- '2 u. @ $1.200,00'
- onclick: openPortItemDetail(itemId)

Dots IA (centro-derecha):
- _buildDotsHTML(_getActivoScores(simbolo))
- Puntos verdes (> 0.01) / rojos (< -0.01)
- Hasta 10 puntos (una variable IA por punto)

Columna derecha:
- Valor en USD (cantidad * precio actual)
- Icono papelera: deletePortfolioItem(id)

Fila inferior:
- % cambio coloreado segun periodo activo
- Si mercado cerrado: etiqueta 'Ult. cierre' en dorado
- Botones periodo: 24h | 7d | 1m | 1y
  - IDs: pp-{periodo}-{id}
  - Fondo dorado en periodo activo
  - Funcion: portPeriod(id, simbolo, tipo, period)
  - Cripto: Binance klines; Acciones: Yahoo via corsproxy.io

### 2.5 ESTADO VACIO
- Funcion: _renderPortfolioEmpty()
- Muestra mensaje + boton agregar primer activo

---

## 3. MODALES

### Modal generico (port-modal / port-modal-body)
Reutilizado para: info termometro, edicion banner mercados, errores, otros.

### Modal agregar activo
Flujo: openAddActivo() -> _openAddActivoModal()
1. Campo busqueda -> filterPortSearch() -> _buscarActivos(q, cb)
2. Lista resultados -> _renderSearchResult(a, idx, 'selectPortActivo')
3. Seleccion -> selectPortActivo(sym, nombre)
4. Campos: Simbolo, Nombre, Cantidad, Precio compra, Tipo
5. Guardar -> savePortActivo() -> addPortfolioItem() -> POST Supabase
6. Cierre -> closePortModal()

Busqueda: _buscarActivos(query, callback)
- Busca en _IA_ACTIVOS + DATA.cripto + DATA.acciones + DATA.etfs
- Devuelve hasta 10 resultados

### Modal detalle de activo (port-item-detail-overlay)
Apertura: openPortItemDetail(itemId)
Contenido:
- Precio actual + % cambio
- Precio de compra
- PnL total en USD y %
- Max/Min 52 semanas
- Estado del mercado
- Sparkline SVG (_buildSparklineSVG)
- Filtros periodo: 24h | 7d | 1m | 3m | 1y | Max
  -> portDetPeriod(simbolo, tipo, period)
- Simulador: portSimUpdate(itemId, simbolo, pctStr)
  -> muestra valor si el precio sube/baja ese %
Cierre: closePortItemDetail()

---

## 4. CONVERSOR DE MONEDAS (port-conv-modal)

Apertura: openPortConversor() | Cierre: closePortConvModal()

Monedas disponibles:
- Cripto: BTC, ETH, SOL, USDT (precios via Binance REST en vivo)
- Fiat: USD, ARS (~1195 blue), ARS_OF (~1060 oficial), EUR (~0.92), BRL (~5.70)

Logica:
- Todo pasa por USD como pivote
- Cripto->USD: monto * precio | USD->Cripto: monto / precio
- Fiat->USD: monto / tipo_cambio | USD->Fiat: monto * tipo_cambio
- Swap: swapPortConv() intercambia FROM y TO
- Calculo: updatePortConv()
- Carga precios: pcLoadPrices() (Binance + fallback offline)
- Muestra tasa: '1 FROM = X TO'

---

## 5. CARGA Y PERSISTENCIA

### Supabase
- URL: https://dklljnfhlzmfsfmxrpie.supabase.co
- Tabla: portfolio (id, user_id, simbolo, nombre, cantidad, precio_compra, tipo, created_at)
- Carga: loadPortfolioSupa() -> _fetchPortfolio(token, userId)
- Sin auth: _renderPortfolioEmpty()

### Precios en tiempo real
- _refreshPortPrices(items): cripto via Binance, acciones via Yahoo+corsproxy
- Renderiza con cache primero, actualiza con precios frescos

### localStorage
- aurex_port_order: orden personalizado (array IDs)
- aurex_markets_pref: mercados del banner (array nombres)

---

## 6. FUNCIONES GLOBALES (window.*)

| Funcion | Descripcion |
|---|---|
| loadPortfolioSupa() | Carga portfolio desde Supabase |
| openAddActivo() | Abre modal agregar activo |
| savePortActivo() | Guarda activo en Supabase |
| closePortModal() | Cierra modal generico |
| openPortItemDetail(id) | Abre detalle del activo |
| closePortItemDetail() | Cierra detalle |
| portPeriod(id,sym,tipo,p) | Cambia periodo de activo individual |
| portTotalPeriod(btn,p) | Cambia periodo del total |
| portDetPeriod(sym,tipo,p) | Periodo en vista detalle |
| portSimUpdate(id,sym,pct) | Simulador de escenario |
| movePortfolioItem(id,dir) | Reordena activo arriba/abajo |
| deletePortfolioItem(id) | Elimina activo de Supabase |
| addPortfolioItem(s,n,q,pc,t)| Agrega activo nuevo |
| openPortConversor() | Abre conversor de monedas |
| closePortConvModal() | Cierra conversor |
| updatePortConv() | Recalcula conversion |
| swapPortConv() | Intercambia FROM y TO |
| _cyclePortCurrency() | Cicla moneda total USD/USDT/BTC |
| _updatePortTotalDisplay() | Refresca importe grande |
| editMarketBanner() | Abre selector mercados banner |
| toggleMktPref(m) | Activa/desactiva mercado en banner |
| showThermoInfo() | Popup explicativo termometro |
| showThermoHelp() | Popup alt termometro |
| _closeThermoHelp() | Cierra popup termometro |
| _initPortDropdowns() | Inicializa touch en dropdown 24h |
| _togglePortPeriodDD() | Abre/cierra dropdown periodos |
| _togglePortCurrDD() | Abre/cierra dropdown monedas |
| _selectPortPeriod(key) | Selecciona periodo |
| _selectPortCurr(cur) | Selecciona moneda |
| _calcPortPeriod(period) | Calcula PnL periodo |
| filterPortSearch() | Filtra busqueda agregar activo |
| _portPickIdx(idx) | Selecciona item busqueda |
| selectPortActivo(sym,n) | Llena form con activo elegido |

---

## 7. VARIABLES GLOBALES

| Variable | Tipo | Descripcion |
|---|---|---|
| window._portItems | Array | Items del portfolio renderizados |
| window._portTotalUSD | Number | Valor total en USD |
| window._portCurrency | String | Moneda activa: USD / USDT / BTC |
| window._pcPrices | Object | Precios actuales {SYM: precio} |
| window._pcChange24 | Object | Cambio 24h {SYM: pct} |
| window._pc52Low | Object | Minimo 52 semanas {SYM: precio} |
| window._pc52High | Object | Maximo 52 semanas {SYM: precio} |
| window._pcMarketState | Object | Estado mercado {SYM: REGULAR/CLOSED} |
| window._pcMarketTime | Object | Timestamp ultimo precio {SYM: ms} |
| window._pcPrevClose | Object | Precio cierre anterior {SYM: precio} |
| window._iaSignals | Array | Senales IA activas [{simbolo, direccion, scores}] |
| window._IA_ACTIVOS | Array | Todos los activos del modelo IA |
| window._IA_PRECIOS | Object | Precios historicos {SYM: {precio, precio24h, ...}} |
| window._ptTS | Number | Timestamp anti-doble-disparo badge 24h |
| window._ppTS | Number | Timestamp anti-doble-disparo items dropdown |

---

## 8. AUREX PULSE (en Portfolio)

_renderFearGreed(containerId) se llama al actualizar totales del portfolio.
Muestra gauge semicircular SVG con score 0-100 en 'mkt-fear-greed'.
Fuentes: VIX, S&P500, BTC, Oro, Petroleo via Yahoo/Binance.
Score: _calcPulseScore(raw, categoria) | Categorias: CRIPTO/ACCIONES/FUTUROS/COMOD/GLOBAL.
Colores: >60 verde | 40-60 dorado | <40 rojo.

---

## 9. DOTS IA Y SPARKLINE

_buildDotsHTML(scores): genera puntos verdes/rojos por variable IA.
Variables: tendencia, rsi, volumen, volatilidad, correlacion, oro_petroleo,
macro, earnings, macd, soporte_resist.
_getActivoScores(sym): busca en _iaSignals, fallback sintetico via _iaSeed(sym).
_buildSparklineSVG(closes, isUp): SVG 64x28px con area + linea de precio.

---

## 10. HISTORIAL DE COMMITS - SESION 3/4/2026

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