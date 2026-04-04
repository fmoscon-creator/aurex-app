# AUREX - Tab Watchlist
## Especificacion Funcional Completa v2.0

## 1. Concepto y Diferenciadores
Sistema de seguimiento inteligente con senales IA por activo, listas customizables, lista principal siempre visible.
Solo AUREX tiene: senal IA en cada card, lista principal expandida, alerta WhatsApp con swipe, integracion Motor IA, historial senales IA por activo.

## 2. Arquitectura de Pantallas (5 vistas)
1. Vista Principal - Mis Listas: lista principal expandida + resto como cards
2. Vista de Lista detalle: todos los activos de esa lista con senales IA
3. Detalle de Activo modal: precio RT, grafico, senal IA, historial
4. Crear/Editar Lista: formulario nombre, color, toggle Lista Principal
5. Buscador de Activos: busqueda en tiempo real de cualquier activo global

## 3. Card de Activo - Campos Visibles
1. Logo + Ticker
2. Nombre corto
3. Precio actual tiempo real
4. Variacion pct 24h
5. Sparkline 24hs
6. Senal IA: ALCISTA/BAJISTA/NEUTRAL/ALTA CONV-IA
7. Campana alerta WhatsApp activa/inactiva

## 4. Detalle de Activo (modal)
- Precio y variaciones 24h/7d/30d
- Grafico linea o vela: 24h/7d/1m/3m/1y
- Senal IA actual + probabilidad + explicacion
- Justificacion del analisis (variables que impactan)
- Precio objetivo y Stop calculados por IA
- Historial de ultimas 5 senales IA
- Alertas WhatsApp activo/inactivo
- Agregar a lista

## 5. Acciones Swipe
- Swipe izquierda: eliminar de la lista
- Swipe derecha: toggle alerta WhatsApp
- Tap: ver detalle
- Tap largo: reordenar drag and drop

## 6. Tipos de Activos Soportados
- Acciones US: AAPL, TSLA, NVDA, MSFT - Yahoo Finance
- ETFs: SPY, QQQ, GLD, IBIT - Yahoo Finance
- Cripto: BTC, ETH, SOL, BNB, XRP - Binance API
- Metales: Oro GCF, Plata SIF - Yahoo Finance
- Futuros: ESF, NQF, CLF - Yahoo Finance
- Forex: USD/ARS, EUR/USD - Yahoo Finance (v2)
- Materias primas: JO, ALUM - Yahoo Finance

## 7. Flujos de Usuario
- Primera vez: pantalla vacia, crear primera lista, marcar como principal, agregar primer activo
- Agregar activo: entrar a lista, tap en +, buscar, seleccionar, aparece con senal IA y precio
- Cambiar Lista Principal: tap en estrella de cualquier lista
- Activar alerta: swipe derecho sobre activo
- Ver detalle y senal IA: tap en cualquier activo

## 8. Estructura Supabase

Tabla watchlists: id, user_id, name, is_primary, color, position, created_at, updated_at
Tabla watchlist_items: id, watchlist_id, ticker, asset_type, alert_active, alert_price, alert_pct, position, added_at

## 9. Prioridad Desarrollo
MVP: lista unica + agregar activos + precios RT + senal IA en card + persistencia Supabase + sparkline
V2: multiples listas + lista principal + alerta WhatsApp swipe + detalle con historial + grafico + precio objetivo
V3: tipos de alerta configurables, color por lista, ordenar por senal IA

AUREX | aurex.live | Abril 2026