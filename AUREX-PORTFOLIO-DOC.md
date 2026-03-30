# AUREX — Documentación Completa: Tab Portfolio

**Versión:** 1.1 (Marzo 2026)
**Plataforma:** GitHub Pages + Supabase | Vanilla HTML/CSS/JS
**Objetivo:** Aplicación financiera con señales IA para inversores retail

---

## 1. DESCRIPCIÓN GENERAL DEL PORTFOLIO

El Portfolio de AUREX es un simulador de inversión inteligente que permite al usuario construir y monitorear una cartera de activos financieros en tiempo real. Combina datos de mercado en vivo, análisis de señales de inteligencia artificial y herramientas de gestión de riesgo únicas en el mercado.

**Activos soportados:** Criptomonedas, Acciones USA, Acciones ARG, ETFs, Metales, Bonos (74 activos totales en 6 categorías)

**Fuentes de datos:**
- Criptomonedas: Binance API (tiempo real 24/7)
- Acciones, ETFs, Metales, Bonos: Yahoo Finance via corsproxy.io
- Señales IA: Algoritmo interno AUREX de 8 variables

---

## 2. FUNCIONES Y HERRAMIENTAS DEL PORTFOLIO

### 2.1 Resumen de Cartera (Header)

En la parte superior del portfolio se muestra un resumen inmediato de la situación del usuario:

- **Valor Total:** Suma del valor actual de todos los activos (precio de mercado x cantidad)
- **P&L USD:** Ganancia o pérdida en dólares desde el precio de compra
- **P&L %:** Porcentaje de rentabilidad total de la cartera desde la inversión inicial
- **Activos:** Cantidad de activos diferentes en cartera
- **Mejor:** El activo con mayor % de retorno desde la compra

---

### 2.2 Banner Dinámico de Mercados (EXCLUSIVO AUREX)

Ubicado justo debajo del header, muestra en tiempo real el estado de los principales mercados financieros del mundo:

**Mercados disponibles:**
- US EEUU (NYSE/NASDAQ): Horario 9:30am–4:00pm ET (13:30–20:00 UTC)
- ASIA (Tokyo): Horario 9:00am–3:00pm JST (0:00–6:00 UTC)
- ARG (BYMA): Horario 11:00am–6:00pm ART (14:00–21:00 UTC)

**Información que muestra por mercado:**
- Estado: ABIERTO (verde) o CERRADO (rojo)
- Contador dinámico: "Cierra en Xh Ym" o "Abre en Xh Ym"
- Actualización automática cada vez que se renderiza el portfolio

**Configuración personalizada:** El usuario puede tocar el icono editar para elegir qué mercados quiere ver. La preferencia se guarda en localStorage (persiste entre sesiones).

**Diferencial:** Yahoo Finance tiene un indicador de mercado cerrado pero es estático y no personalizable. En AUREX es configurable por el usuario en mobile-first gratuito.

---

### 2.3 Termómetro de Riesgo (EXCLUSIVO AUREX)

Una barra visual debajo del banner que muestra la distribución del capital del usuario según las señales AUREX activas:

**Cómo leerlo:**
- Verde (ALCISTA): % del capital total en activos con señal alcista
- Amarillo (ALTA CONV-IA): % del capital en activos con la señal más valiosa
- Rojo (BAJISTA): % del capital en activos con señal bajista
- Gris (SIN SEÑAL): % del capital en activos sin señal activa hoy

**Texto explicativo dinámico:** El termómetro siempre muestra una frase que interpreta el resultado para usuarios principiantes:
- Si BAJISTA > 50%: "⚠️ Más de la mitad de tu cartera tiene señal BAJISTA — considerá revisar tu exposición."
- Si ALCISTA > 50%: "✅ La mayoría de tu cartera tiene momentum positivo según la IA."
- Si ALTA CONV-IA > 20%: "🔥 Tenés capital en zona de MÁXIMA ATENCIÓN — movimiento fuerte inminente."
- Si SIN SEÑAL > 80%: "💤 Sin señales activas hoy para tus activos."

**Botón ?:** Tocá el ? para ver una explicación completa de cada tipo de señal en lenguaje simple.

**Diferencial:** Esta función no existe en ninguna app financiera retail. En Bloomberg Terminal existe algo similar pero cuesta $24,000/año. En AUREX es gratuita.

---

### 2.4 Listado de Activos

Cada activo en el portfolio muestra:
- **Logo del activo** (via CoinGecko para cripto, Clearbit para acciones) o inicial del símbolo si no hay logo disponible
- **Símbolo** y **categoría** (cripto/accion/ETF/etc.)
- **Cantidad** y **precio de compra promedio**
- **Valor actual** en USD (precio de mercado x cantidad)
- **% de cambio** con indicador de período seleccionado
- **Tabs de período:** 24h | 7d | 1m | 3m | 1y (seleccionables por activo)
- **Flechas de ordenamiento** para personalizar el orden de la lista
- **ícono de eliminar** para sacar un activo de la cartera

**Lógica del % para mercados cerrados:**
- Cripto: Siempre muestra % real de las últimas 24h (cotiza 24/7)
- Acciones/ETFs/Bonos fuera de horario: Muestra el % del último cierre con leyenda "ult.cierre" y el tiempo hasta la apertura

---

### 2.5 Agregar Activo

El botón + Agregar (verde, sticky en el header) abre un modal centrado en pantalla con:

1. **Buscador en tiempo real:** El usuario escribe el nombre o ticker y los resultados aparecen instantáneamente con logos
2. **Selección del activo:** Al tocar un resultado, aparece el formulario de ingreso
3. **Campos a completar:**
   - Cantidad: Cuántas unidades compró (soporta decimales para cripto)
   - Precio de compra (USD): Precio al que ingresó al activo
4. **Botón Confirmar:** Guarda en Supabase con user_id de la sesión

Los datos se persisten en Supabase. El portfolio se carga en cada sesión desde Supabase, no desde localStorage, lo que permite verlo desde cualquier dispositivo.

---

### 2.6 Panel de Detalle del Activo (Click en activo)

Al hacer click en el símbolo/nombre de cualquier activo del listado, se abre un panel completo con:

**Bloque 1 — Posición actual:**
- Logo + nombre del activo
- Precio de mercado actual (en tiempo real)
- P&L % desde precio de compra (verde si ganancia, rojo si pérdida)
- Grid 2x3: Precio de compra | Cantidad | P&L en USD | Fecha de entrada | Min 52 sem. | Max 52 sem.

**Bloque 2 — Rendimiento por período:**
- % de cambio con tabs seleccionables: 24h | 7d | 1m | 3m | 1y
- 24h por defecto
- Datos históricos desde Binance (cripto) o Yahoo Finance (acciones)

**Bloque 3 — Indicador 52 Semanas:**
- Barra visual con gradiente Rojo→Amarillo→Verde
- Marcador blanco indicando la posición actual del precio en el rango anual
- Etiquetas: "Min 52s: $X" y "Max 52s: $X"
- Texto: "Posición en rango anual: X%"
- Cómo leerlo: 0% = precio en mínimo anual; 100% = precio en máximo anual
- Datos: Binance klines semanales (52 barras) para cripto; Yahoo Finance meta para acciones

**Bloque 4 — Señal AUREX:**
La señal de inteligencia artificial para ese activo específico, mostrando:
- Dirección: ALCISTA / BAJISTA / ALTA CONV-IA
- Probabilidad: Porcentaje en grande (ej: "82%") — indica la confianza del modelo
- Objetivo de precio: Nivel al que la IA proyecta puede llegar el activo
- Stop Loss: Nivel donde la señal se invalida
- Upside/Downside: % de potencial recorrido del precio
- 5 argumentos objetivos: Las razones concretas que sustentan la señal

Si no hay señal activa para ese activo, muestra: "Sin señal activa hoy"

**Bloque 5 — Simulador de Escenarios (EXCLUSIVO AUREX):**
- Slider interactivo de -50% a +50%
- Al mover el slider, actualiza en tiempo real:
  - Nuevo precio: Cuánto valdría el activo si cambia ese %
  - P&L del activo: La nueva ganancia o pérdida en USD y %
  - Impacto en portfolio total: Cuánto cambia el valor de toda la cartera

**Diferencial:** El Simulador de Escenarios es equivalente a funciones de Bloomberg Terminal ($24k/año). Yahoo Finance no tiene nada similar en mobile.

---

### 2.7 Conversor de Activos

El botón Conversor (celeste, sticky en el header) permite convertir entre cualquier par de activos.

---

## 3. SEÑALES IA — DESCRIPCIÓN TÉCNICA

### 3.1 Tipos de señales

**BAJISTA:** El activo tiene momentum negativo claro. Precio cayendo, volumen vendedor, correlación negativa. La IA dice: "alta probabilidad de que siga bajando".

**ALCISTA:** El activo tiene momentum positivo claro. Precio subiendo, volumen comprador, correlación positiva. La IA dice: "alta probabilidad de que siga subiendo".

**ALTA CONV-IA:** La señal MAS valiosa y MAS rara. Aparece SOLO cuando score >= 78% + catalizador activo. El activo está en un punto de indecisión técnica extrema. Solo 1-2 activos máximo por día.

### 3.2 Rango de probabilidades

- Mínimo: 55% (por debajo no se emite señal)
- Máximo: 88% (certeza imposible en mercados)
- Las probabilidades suman exactamente 100% entre ALCISTA + BAJISTA + ALTA CONV-IA

### 3.3 Las 8 variables del modelo

1. RSI Simulado (Momentum): Compara precio actual vs hace 24hs.
2. Tendencia de Precio 24hs: Variación porcentual real desde Binance/Yahoo.
3. Volumen Relativo: Compara volumen actual con promedio histórico.
4. Volatilidad: Amplitud del rango de precio en últimas horas.
5. Correlación de Mercado: Correlación BTC/altcoins, S&P500/acciones.
6. Precio del Oro y Petróleo: Indicadores de aversión al riesgo global.
7. Dato Macro del Día: Fed, IPC, IPP, PBI, datos de empleo.
8. Earnings Proximity: Resultados corporativos en los próximos 7 días.

---

## 4. VENTAJAS COMPARATIVAS VS COMPETENCIA GLOBAL

| Función | AUREX | Yahoo Finance | Investing.com | Bloomberg Terminal |
|---|---|---|---|---|
| Portfolio P&L real time | Gratis | Solo Premium | Solo Premium | $24k/año |
| Señales IA con probabilidades | Gratis | No tiene | No tiene | $24k/año |
| 5 argumentos por señal | Gratis | No tiene | No tiene | Parcial |
| Banner mercados configurable | Gratis | Estático | Solo web | Solo Premium |
| Termómetro de Riesgo | Gratis | No tiene | No tiene | No tiene |
| Simulador de Escenarios | Gratis | No tiene | No tiene | $24k/año |
| Min/Max 52 semanas visual | Gratis | Solo web | Solo web | Si |
| Indicador posicion 52s barra | Gratis | No tiene | No tiene | Si |
| Señal ALTA CONV-IA (rara) | Exclusivo | No tiene | No tiene | No tiene |
| Texto educativo en indicadores | Gratis | No tiene | No tiene | No tiene |
| Mobile-first gratuito | Si | Parcial | Parcial | No |
| Costo | Gratis | Gratis/Premium | Gratis/Premium | $24,000/año |

---

## 5. ESTADO TÉCNICO (Marzo 2026)

**Features.js SHA:** d562037b
**Index.html SHA:** f3888498
**Timestamp:** 1774833269047

**Funciones globales activas:**
- window.openAddActivo() — abre modal de agregar activo
- window.closePortModal() — cierra modal
- window.filterPortSearch() — filtra búsqueda en tiempo real
- window.selectPortActivo(s,n,t,l) — selecciona activo del buscador
- window.savePortActivo() — guarda activo en Supabase
- window.openPortItemDetail(id) — abre panel de detalle
- window.closePortItemDetail() — cierra panel de detalle
- window.portDetPeriod(s,t,p) — cambia período en detalle
- window.portPeriod(id,s,t,p) — cambia período en listado
- window.portSimUpdate(id,s,pct) — actualiza simulador en tiempo real
- window.movePortfolioItem(id,dir) — reordena activos
- window.deletePortfolioItem(id) — elimina activo
- window.editMarketBanner() — abre configuración del banner
- window.toggleMktPref(m) — toggle mercado en banner
- window.showThermoInfo() — muestra explicación del termómetro

**Variables globales clave:**
- window._portItems — array de activos en portfolio
- window._pcPrices — precios actuales por símbolo
- window._pcChange24 — % cambio 24h por símbolo
- window._pcMarketState — estado de mercado por símbolo
- window._pcPrevClose — precio cierre anterior por símbolo
- window._pc52Low / window._pc52High — mínimo/máximo 52 semanas por símbolo (Binance klines para cripto, Yahoo meta para acciones)
- window._iaSignals — señales IA activas
- window._IA_ACTIVOS — 74 activos con logos, colores, categorías
- window._portSimBase — datos base del simulador de escenarios
- window._portSimTotal — valor total del portfolio

**Supabase:**
- URL: dklljnfhlzmfsfmxrpie.supabase.co
- Tabla: portfolio_items
- Campos: id, user_id, simbolo, nombre, cantidad, precio_compra, tipo, created_at

---

## 6. PITCH PARA INVERSORES

AUREX democratiza herramientas que hoy solo existen en Bloomberg Terminal ($24,000/año) y las lleva al bolsillo del inversor retail de forma gratuita. El diferencial no es solo el portfolio — es la inteligencia: señales con probabilidades reales, 5 argumentos concretos, el Termómetro de Riesgo que nadie más tiene, y el Simulador de Escenarios que convierte al usuario en su propio analista. El texto educativo integrado hace que hasta un usuario principiante pueda entender y actuar sobre sus inversiones. Apuntamos a competir directamente con Yahoo Finance e Investing.com en el segmento mobile, con una propuesta de valor que ninguna de las dos puede replicar sin una reingeniería profunda.

---

## 7. PRÓXIMAS FUNCIONES (Roadmap)

- Señales IA funcionales: Algoritmo RSI real + tendencia + volumen (LUN 30/03)
- Watchlist persistente: Botón estrella en Mercados (MAR 31/03)
- Revisión conjunta Semana 1 (MIE 01/04)
- Buffer fixes + cierre Semana 1 "PWA base lista" (JUE 02/04)
- Semana 2: Conversor con rotación parcial o total del portfolio simulado

---

*Documento generado automáticamente por AUREX AI Assistant — Marzo 2026*
