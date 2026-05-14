# PLAN DE LANZAMIENTO AUREX — FASE 1 (versión 3.0)

*Fecha: 13 de mayo de 2026, 21:30 AR*
*Versionado: v3.0 reemplaza v2.0 (que tenía errores de premisas)*
*Generado por: Code (Claude Code) aplicando skills marketing-skills + frontend-design + ui-ux-pro-max + design-taste-frontend + shadcnblocks (referencia) + full-output-enforcement*
*Base de contexto: MARKETING_CONTEXT_AUREX_v2.md (en misma carpeta)*
*Período: 13-may-2026 PM → 12-jun-2026 (30 días primera fase)*

---

## Resumen ejecutivo (3 líneas para entender todo el documento)

AUREX tiene la app Android publicada hace 7 días sin promoción (24 instalaciones, 177 países, todos desde Argentina) y un sistema de planes FREE/PRO/ELITE que NO está implementado en el código — los precios son decorativos. Antes de arrancar el marketing hay que arreglar el sistema de pagos en backend (6-8 horas Code) y construir la landing de bienvenida (6-8 horas Code) en paralelo a la actualización de la PWA. Lanzamos a redes a partir del 19-20 de mayo con producto coherente, en EN + ES paralelo, con Android como botón principal y la PWA como destino secundario.

---

## Cambios de v2 → v3 (lo que cambió y por qué)

Esta v3 incorpora 4 fuentes de feedback que la v2 no tenía:

1. **Tus 14 observaciones del 13-may** (watchlist clarificada, planes FREE/PRO/ELITE auditados, JTBD ampliado, competidores SeekingAlpha+Binance, Termómetro de Riesgo, Cartera Simulada como pilar, datos Android actualizados, cuadro de canales, etc.)
2. **Opinión cruzada de Escritorio sobre v2** (cron zero-touch solo desde semana 3, LinkedIn manual los primeros 30 días, YouTube a P2, línea de tiempo desde 13-may PM, dato 24 instalaciones)
3. **Auditoría técnica del sistema FREE/PRO/ELITE** (revelación crítica: nada está implementado en código)
4. **Verificación PayPal vs Lemon Squeezy** (la PWA usa PayPal, no Lemon Squeezy; los 4 planes PayPal están activos pero sin webhook)

---

## 1. ESTADO REAL al 13 de mayo PM (sin inventos, validado por Escritorio + auditoría Code)

### 1.1. Producto en cada canal

| Canal | Estado real | Listo para promocionar |
|---|---|---|
| **Android — Google Play, versión 1.0.17** | Publicado en producción desde 6-may. **24 instalaciones totales**. DAU 19-27. 177 países habilitados, 100% instalaciones desde Argentina. Retención 7 días: sin datos (volumen insuficiente). Acción Google pendiente: APIs "edge-to-edge" obsoletas → corregir en Build 18. | SÍ, ya. Pero NO comunicar precios PRO/ELITE hasta arreglar gating |
| **iOS — App Store, build 17** | Día 19 en cola de Apple desde el 24-abr. Forum staff respondió 11-may "investigating". ASC Resolution Center vacío al 13-may PM (validado Escritorio). Build 24 en TestFlight como respaldo. | NO, esperar aprobación Apple |
| **PWA aurex.live (producto web)** | Operativa. Paridad ~70% vs Android: tiene Pulse, Portfolio, Watchlist, alertas UI, 8 idiomas. **Le faltan 3 funciones críticas**: push, integración Telegram real, pantalla "Cómo usar AUREX". Tiempo para llevarla a paridad: 3-4 hs Code. **Sistema de pago actual: PayPal (NO Lemon Squeezy como decían los docs)**. | NO ahora, sí en 1-2 días |
| **Landing de bienvenida** (página de marketing) | NO existe. Hay que construirla. Stack decidido: HTML/CSS/JS vanilla, reutilizando aurex-i18n.js de PWA. 6-8 hs Code. | NO ahora, sí en 2-3 días |
| **Sistema FREE/PRO/ELITE** | **🔴 NO IMPLEMENTADO**. Solo decoración: UI y precios. Sin gating en backend, sin webhook RevenueCat→Supabase, sin validación de plan en endpoints. Implementación: 6-8 hs Code. | NO comunicar precios hasta gating funcional |
| **Email transaccional** | Sin configurar. Solo email de soporte. | NO, arranca en semana 3 post-landing |

### 1.2. Las 6 redes operativas — cuadro completo de canales y handles

| Red | URL pública | Handle | Display Name | Estado perfil | Validación Escritorio |
|---|---|---|---|---|---|
| **Telegram canal** | https://t.me/aurex_ai | @aurex_ai | AUREX | Abierto 12-may, 0 publicaciones | Pendiente |
| **Instagram** | https://instagram.com/aurex_live | @aurex_live | AUREX | Cuenta Business Finance, foto + bio. 0 publicaciones | Pendiente |
| **LinkedIn Company Page** | https://linkedin.com/company/aurex-fintech | aurex-fintech | AUREX | Página completa con logo, banner 1192×220, descripción EN, ubicación Buenos Aires. 0 publicaciones | Pendiente |
| **YouTube** | https://youtube.com/@aurex-fintech | @aurex-fintech | AUREX | Banner 2560×1440 + watermark 150×150 + descripciones 8 idiomas. 0 videos | Pendiente |
| **TikTok** | https://tiktok.com/@aurex_live | @aurex_live | AUREX | Cuenta abierta 13-may + Business Verification enviada (espera 3-5 días). 0 videos | Pendiente |
| **X / Twitter** | https://x.com/aurex_live | @aurex_live | AUREX | Perfil COMPLETO con foto + banner + bio 🌐 + Global + aurex.live + Cuenta Profesional Empresa categoría "Aplicación móvil" | **✅ VALIDADO 100% por Escritorio 13-may PM** |

**Email maestro de todas las cuentas**: app.aurex@gmail.com
**Display Name uniforme**: AUREX
**Nombre legal (verificaciones)**: Fernando Gabriel Moscon
**ID legal (TikTok Business)**: CUIT monotributista AFIP

---

## 2. PROBLEMA CRÍTICO descubierto el 13-may PM — Sistema de pagos roto

### 2.1. Qué hay realmente en código

Auditoría exhaustiva del 13-may PM (Code) revela que el sistema de planes existe en UI/UX pero **NO está implementado funcionalmente**:

| Promesa de marketing | Implementación real | Resultado |
|---|---|---|
| FREE: portfolio máximo 5 activos | Sin validación en `POST /api/portfolio` | Usuario FREE puede agregar 50+ activos |
| PRO: alertas push ilimitadas | UI muestra advertencia "requiere PRO" pero NO bloquea | Cualquiera crea alertas |
| PRO: 3 alertas WhatsApp/día | Cron envía a TODOS sin contar | Manual del proyecto ya documenta "límites codificados pero el cron no los aplica" |
| ELITE: 10 alertas WhatsApp/día | Sin contador | Mismo problema |
| ELITE: API personal | Endpoint `/api/v1` abierto sin auth por plan | Cualquiera con la API key accede |
| ELITE: análisis técnico RSI/MACD | Feature **no existe en código** | Promesa vacía |

### 2.2. RevenueCat sin webhook a Supabase

- RevenueCat está integrado en iOS y Android — **recibe el pago** correctamente.
- **Pero no existe webhook** que actualice `usuarios.plan` en Supabase cuando llega un pago.
- Si alguien compra PRO en iOS/Android, RevenueCat sabe que es PRO, pero nuestro backend sigue tratándolo como FREE.

### 2.3. PWA usa PayPal, NO Lemon Squeezy

Verificación directa del 13-may PM en `index.html` de la PWA:
- 4 planes PayPal hardcodeados activos (PRO mensual P-64Y..., PRO anual P-3FG..., ELITE mensual P-9T7..., ELITE anual P-1WB...).
- HTTP 200 en los 4 links → técnicamente activos en cuenta PayPal de Fernando.
- **Lemon Squeezy NO está integrado** — era intención futura documentada pero nunca se implementó.

**¿Hubo compras reales?** Supabase tiene 6 usuarios, todos en FREE. Si alguien pagó vía PayPal, no se reflejó (porque no hay webhook). Hay que validar en el dashboard PayPal de Fernando (Escritorio vía Chrome) si hubo cobros.

### 2.4. Riesgos por plataforma

| Plataforma | Estado al 13-may PM | Riesgo concreto AHORA | Riesgo si comunicamos PRO/ELITE en MKT |
|---|---|---|---|
| **Android publicado** | 24 instalaciones, 0 compras registradas en Supabase | Bajo (sin volumen) | Alto: usuarios pagan, ven que nada cambia, piden reembolso, posible retiro de Google Play por reportes de fraude |
| **iOS Build 17 en review** | 19 días en queue, Apple staff "investigating" | Medio: reviewer puede comprar PRO en sandbox y descubrir que FREE = PRO = ELITE | Alto: rechazo Build 17 por Guidelines 3.1.1 y 3.1.2 |
| **PWA aurex.live** | PayPal hardcodeado, sin gating, no promocionada todavía | Bajo (no se promueve) | Alto: usuario paga vía PayPal, nada cambia, pide reembolso a PayPal |

### 2.5. Por qué nadie lo detectó antes — honestidad

- Los builds 1-16 priorizaron bugs visuales, push notifications, alertas — el flujo de pago nunca fue prioridad porque la app estaba en pruebas internas.
- Cuando se publicó Android Build 17 el 6-may, **no se hizo un testing end-to-end del flujo de pago real**. Falla de control de calidad.
- El manual del proyecto ya documentaba que estaba roto: *"los límites están codificados pero el cron no los aplica"* (línea 608 de MANUAL_ESTRUCTURAL.md). Estaba escrito pero no atendido.

### 2.6. Plan de arreglo (orden cerrado por Code + Escritorio)

**Orden obligatorio (no se puede invertir)**:

| Paso | Qué se hace | Dónde | Tiempo | Por qué este orden |
|---|---|---|---|---|
| 1 | Webhook RevenueCat → Supabase: cuando llega pago real, actualizar `usuarios.plan` a PRO o ELITE | Backend Railway `server.js` | 2 hs | Sin esto, todo lo demás es inútil. Apple/Google saben que pagó pero nuestro backend no |
| 2 | Validar plan en endpoints clave: `POST /api/portfolio` (max 5 si FREE), `POST /api/alertas` (límites por plan), checkAlertas cron (respetar límites WhatsApp por plan) | Backend Railway | 3 hs | Hace cumplir las promesas en backend, fuente única de verdad |
| 3 | Gating cliente en PWA: leer `usuarios.plan` y mostrar/ocultar features. Reemplazar botones PayPal por Lemon Squeezy (o reconfigurar PayPal correcto) | aurex-app HTML/JS | 2-3 hs | Cliente coherente con backend |
| 4 | Pantalla paywall + flujo upgrade desde la app (cuando alguien intenta hacer algo PRO siendo FREE) | PWA + planificar para Build 25 iOS / Build 18 Android | 1-2 hs PWA | Cierra el embudo de conversión |

**Total tiempo de arreglo**: 8-10 hs Code, repartibles en 2 días. **No afecta al Build 17 que está en review de Apple** — todo el arreglo va en backend y PWA, sin tocar el binario que ya está con Apple.

### 2.7. Lo que se necesita validar antes de arreglar (Escritorio vía Chrome)

- Dashboard PayPal de Fernando: ¿hubo compras reales en los últimos 30 días en alguno de los 4 planes? Si sí, hay que reembolsar y comunicarlo.
- Dashboard RevenueCat: ¿hay transacciones de prueba (sandbox) o reales registradas?
- Lemon Squeezy: ¿la cuenta está creada? ¿Los planes están configurados? Si no, hay que crearlos para reemplazar PayPal en PWA.

---

## 3. OBJETIVOS DEL NEGOCIO — de dónde salen los números

### 3.1. Honestidad sobre la v2

En la v2 puse "500 instalaciones + 1.000 followers en 30 días" sin justificarlo. Fernando lo cuestionó con razón. **Voy a documentar de dónde salen ahora** y ofrecer alternativas para que vos decidas.

### 3.2. Benchmarks reales del mercado fintech retail

Métricas de apps fintech en lanzamiento, primeros 30 días, sin presupuesto pago:

| Métrica | Bajo (esperable) | Medio (bueno) | Alto (excelente) |
|---|---|---|---|
| Instalaciones cross-platform | 100-300 | 500-1.000 | 2.000+ |
| Followers totales 6 redes | 200-500 | 1.000-2.000 | 5.000+ |
| Conversión FREE → PRO post-30 días | 0,5%-1% | 2%-3% | 5%+ |
| Visitas únicas a landing/sem | 100-300 | 500-1.500 | 3.000+ |

### 3.3. Mi propuesta de objetivos para AUREX Fase 1 (30 días)

Con base baseline real Android (24 instalaciones en 7 días sin promoción = 3-4 instalaciones/día orgánicas):

| Objetivo | Conservador | **Recomendado** | Ambicioso |
|---|---|---|---|
| Instalaciones Android cross-platform | 200 | **400** | 700+ |
| Followers totales 6 redes | 500 | **800** | 1.500+ |
| Sesiones únicas landing/sem desde semana 2 | 100 | **300** | 800+ |
| Suscriptores email desde semana 3 | 30 | **80** | 200+ |
| Conversión FREE → PRO (cuando gating esté listo, fines de mes) | 0,5% | **1%** | 3% |

**Mi voto**: el carril "Recomendado". Es realista para AUREX como producto nuevo sin pauta paga, basado en benchmarks fintech retail.

**Vos decidís cuáles toma el plan**.

---

## 4. ICP / Target — quién es el usuario AUREX (4 personas)

| Persona | Quién es | Qué necesita de AUREX |
|---|---|---|
| **Diego, Trader Multi-Activo** (35-45, AR/LATAM) | Tiene 4 brokers + Tradingview + Twitter abiertos. Pierde 1-2 hs/día cruzando datos | Vista unificada con 350 activos, contexto macro+geo, alertas |
| **María, Inversora Cripto+Stocks** (28-40, global) | Lee charts pero no sabe leer contexto FED ni geopolítica | AUREX Pulse traduce contexto macro+GDELT a métrica visual |
| **Roberto, Asesor Independiente** (40-55, AR/MX/ES) | Cada cliente le pregunta "¿cómo va mi cartera?" y le toma 30 min armar respuesta | Screenshots limpios multi-idioma para mostrar a clientes |
| **Lucas, Crypto Native** (25-35, global) | Saturado de info crypto-bro de baja calidad | Señales destiladas con contexto y disclaimer claro |

Hipótesis. Validar con primeros usuarios reales en las primeras 4 semanas.

---

## 5. JOBS TO BE DONE AMPLIADO (con los 5 que pidió Fernando agregar)

El usuario contrata AUREX para resolver 8 trabajos concretos:

| # | Job | Cómo lo resuelve AUREX |
|---|---|---|
| 1 | Saber qué está pasando en TODOS mis activos a la vez sin saltar entre apps | Vista unificada 350 activos en 9 tipos × 7 mercados |
| 2 | Entender el contexto detrás del movimiento de un precio | AI Engine con 10 variables + AUREX Pulse con 14 fuentes |
| 3 | No perderme eventos críticos que mueven mi cartera | Ticker eventos críticos 24h en vivo + alertas configurables |
| 4 | **Saber el riesgo real de mi portafolio** | **Termómetro de Riesgo** del portfolio (color + score) |
| 5 | **Saber si el mercado está en miedo o codicia** | **Tablero AUREX Pulse** — gauge semáforo emocional (MIEDO ↔ CODICIA) por mercado y por categoría |
| 6 | **Comparar el desempeño entre activos antes de decidir** | **Función Comparar Activos en Watchlist** en 5 períodos (24h / 7d / 30d / 90d / 1a) |
| 7 | **Recibir señales accionables sin tener que estar mirando la pantalla** | **Señales IA** con disclaimer regulatorio + **alertas push en el celular + alertas Telegram** |
| 8 | **Practicar inversión sin riesgo real antes de invertir mi dinero** | **Cartera Simulada** — armá una cartera de USD X virtual y mirá su desempeño en tiempo real o en 24h/7d/1m/3m/1y |

---

## 6. FEATURES KEY DE AUREX (lo que hay que comunicar)

Listado completo de funciones que Fernando pidió incluir y comunicar en el marketing.

### 6.1. AUREX Pulse — el tablero estrella

- Gauge visual que destila 14 fuentes de contexto de mercado en una métrica única
- Semáforo emocional: MIEDO ↔ NEUTRO ↔ CODICIA
- Score 0-100 por mercado y por categoría
- **Diferenciador único en retail**: cruce FED macro + GDELT geopolítica + sentimiento + técnico

### 6.2. Termómetro de Riesgo

- Indicador visual del riesgo total del portfolio
- Color + score numérico
- Variables que considera: volatilidad histórica, concentración por sector, correlación entre activos, exposición a eventos macro futuros (FED, CPI), riesgo geopolítico (GDELT) de los países donde el portfolio tiene exposición
- Se actualiza en tiempo real conforme el usuario agrega o quita activos

### 6.3. Portfolio (con detalles)

- Seguimiento (NO custodia, NO ejecución) de activos del usuario
- 5 períodos temporales: 24h / 7d / 30d / 90d / 1a
- Valor total + ganancia/pérdida por activo y total
- Conversión entre monedas
- Compartir por Telegram, WhatsApp, email
- Funciona también con Cartera Simulada (sin dinero real)

### 6.4. Watchlist con función Comparar Activos

- Lista personalizada de activos a seguir
- Hasta 5 períodos temporales por activo (24h / 7d / 30d / 90d / 1a)
- **Función Comparar** (la pidió Fernando como pieza clave): permite comparar el desempeño de varios activos lado a lado en las 5 temporalidades
- Gancho comercial: "¿Dudás cuál es el mejor activo? Compará desempeño Acciones vs Cripto vs Metales vs Commodities vs Bonos vs ETF en distintas temporalidades y decidí con más información"

### 6.5. Señales IA (Alta Convicción)

- Generación de señales basadas en el AI Engine (10 variables técnicas + macro)
- Disclaimer regulatorio claro: "Not advice, just data"
- Categorías: Alta Convicción IA, Cambio Señal, Umbral, Cambio Zona Pulse, Termómetro Riesgo, Precio Objetivo, etc. (15 tipos en total)

### 6.6. Alertas configurables (15 tipos)

- Tipos disponibles: Alta Convicción IA, Cambio Señal, Umbral, Señal Portfolio, Cambio Zona Pulse, Por Categoría, Termómetro Riesgo, Precio Objetivo, Variación Brusca, Max/Min, FED FOMC, CPI/PBI, Apertura mercados, Earnings, Geopolítica GDELT
- Canales de entrega: push en el dispositivo + Telegram (PRO/ELITE) + WhatsApp (ELITE) + email (todos)
- Configuración por activo o por categoría

### 6.7. Banners customizables

- Banner Mercado: configurar qué activos seguir en el banner superior de la app
- Banner Futuros de Mercado: pre-market, futuros US, futuros materias primas
- Banner Eventos Críticos 24h: FED, CPI, earnings, eventos geopolíticos en vivo

### 6.8. Cartera Simulada (idea nueva que pidió Fernando)

**Propuesta de redacción**:

"Antes de invertir tu dinero real, AUREX te deja armar una **cartera simulada** con cualquier monto virtual (USD 1.000, 10.000, 100.000, lo que vos quieras). Probás tu estrategia con activos reales en tiempo real, y AUREX te muestra el desempeño en cualquier período (24h, 7 días, 1 mes, 3 meses, 1 año) — ganancias, pérdidas, riesgo, contexto. **Cuando te sientas listo, recién ahí abrís cuenta en el bróker de tu elección con la experiencia y la confianza que ya construiste con AUREX**."

**Por qué es un pilar de marketing**:
- Resuelve la fricción "¿y si pierdo dinero?" del usuario que nunca invirtió
- Convierte AUREX de "herramienta de seguimiento" a "campo de entrenamiento previo a invertir"
- Diferenciador único: ningún competidor retail tiene esto integrado al mismo nivel
- Permite onboarding sin barrera: "Probá AUREX sin gastar un peso"

### 6.9. TAP por activo (info que aparece al tocar un activo)

Cuando el usuario hace tap sobre un activo (en Portfolio, Mercado o AI):

- Datos técnicos: precio actual, variación 24h/7d/30d/1a, volumen, market cap, oscilaciones
- AI Engine: score de las 10 variables técnicas/macro
- AUREX Pulse: posición en el gauge MIEDO ↔ CODICIA
- Termómetro de Riesgo del activo individual
- Eventos críticos próximos del activo (earnings, CPI, FED si aplica)
- Sentimiento de mercado (GDELT)
- Función Compartir: por Telegram, WhatsApp, email — con disclaimer regulatorio
- Botón "Agregar a Portfolio" / "Agregar a Watchlist" / "Crear alerta"

### 6.10. Multi-idioma profundo

8 idiomas nativos: EN (maestro), ES neutro, PT, ZH simplificado, FR, IT, HI, AR

---

## 7. COMPETIDORES Y DIFERENCIACIÓN (con SeekingAlpha + Binance + Investing.com)

### 7.1. Cuadro consolidado

| Competidor | Tipo | Para qué sirve realmente | Donde se queda corto vs AUREX |
|---|---|---|---|
| **Tradingview** | Directo global | Excelente para charts técnicos | Sin AUREX Pulse (cruce FED + GDELT). Sin Termómetro de Riesgo. Sin Cartera Simulada integrada al mismo nivel. Idiomas limitados |
| **Investing.com** | Directo global | Cobertura amplia de noticias + datos sueltos | UI saturada de publicidad. Sin cruce macro/geo nativo. Sin AI Engine ni Pulse |
| **Cocos Capital (AR)** | Directo LATAM | Bróker local + vista de mercado AR | Solo mercado argentino. No cubre stocks US/EU/Asia. Sin cruce geopolítico |
| **Bull Market Brokers (AR)** | Directo LATAM | Mismo gap que Cocos: bróker AR-céntrico | Vista de mercado limitada al ámbito local |
| **Binance** | Indirecto crypto | Exchange líder cripto + sección "Markets" con precios y noticias cripto | Solo cripto. Fragmenta cartera real (que es mixta). Sin contexto macro tradicional (FED). Sin acciones, ETFs, bonos |
| **SeekingAlpha** | Indirecto análisis | Newsletter + análisis de acciones US largo formato (paywall) | Solo equities US, sin cripto seria. Análisis curado humano (lento). Sin AI Engine. Sin app móvil decente. USD 239/año el premium |
| **Bloomberg Terminal** | Secundario institucional | Cubre todo el universo + datos profesionales | USD 24.000/año. Inaccesible para retail |
| **CoinMarketCap / CoinGecko** | Indirecto crypto-only | Datos sueltos cripto | Solo cripto. Sin alertas configurables. Sin AI Engine |
| **Yahoo Finance / Google Finance** | Indirecto gratis | Datos sueltos sin contexto cruzado | Sin alertas configurables. Sin AI Engine. UI desactualizada |
| **Twitter/Telegram groups** | Indirecto comunidad | Información en tiempo real (ruidosa) | Sin curaduría. Sin disclaimer regulatorio. Sin métricas estandarizadas |

### 7.2. Mensaje de diferenciación positiva (no atacar, sumar)

**El framework**: "AUREX no reemplaza, complementa". Cada comparativa termina mostrando que AUREX se integra al ecosistema del usuario.

**Ejemplos de mensajes**:

- "Si usás Tradingview para charts, sumá AUREX para ver el contexto macro+geo que Tradingview no te muestra."
- "Si seguís a SeekingAlpha por análisis profundo, sumá AUREX para tener los datos cruzados antes de leer la opinión humana."
- "Si operás en Binance, sumá AUREX para no perderte cómo se mueve tu cripto en relación a las acciones US y el oro."
- "Si tu bróker es Cocos, sumá AUREX para ver tu cartera AR junto al mercado global."
- "Bloomberg cuesta USD 24.000 al año. AUREX trae lo esencial del Terminal en formato retail. No competimos, traducimos."

### 7.3. Piezas comparativas a producir en Fase 1 (con la skill `competitor-alternatives`)

| Pieza | Donde se publica | Cuándo |
|---|---|---|
| Blog "AUREX vs Tradingview — para retail multi-activo" | aurex.live/inicio/blog (post semana 2 cuando esté landing) | Semana 2 |
| Blog "AUREX vs Cocos Capital — vista global vs vista local" | Idem | Semana 3 |
| Blog "AUREX vs Bloomberg Terminal — la versión retail" | Idem | Semana 3 |
| Carrusel LinkedIn "5 cosas que AUREX hace y Tradingview no" | LinkedIn semana 2 | Semana 2 |
| Hilo X "El cruce FED + GDELT que ningún retail tiene" | X semana 2-3 | Semana 2-3 |

---

## 8. DECISIÓN sobre comunicación de precios PRO/ELITE en marketing

**Tres opciones reales**:

| Opción | Qué se comunica en Fase 1 | Cuándo se introduce PRO/ELITE | Requisito previo |
|---|---|---|---|
| **A. Esperar gating completo antes de arrancar MKT** | Nada durante 2-3 días, después todo con precios reales desde día 1 | Día 1 MKT | Implementar 8-10 hs gating + verificar PayPal/Lemon |
| **B. Arrancar MKT sin mencionar precios PRO/ELITE** | "AUREX gratis en Android + Web" | Semana 3-4 cuando esté gating | Cero, arranca ya. Gating se implementa en paralelo |
| **C. "PRO/ELITE en lista de espera"** | "AUREX gratis en Android + Web. Sumate a la lista de espera para PRO/ELITE — lanzamos en mayo" | Semana 3 con lanzamiento formal | Capturar emails con landing |

**Mi voto: Opción B (arrancar SIN precios, gating en paralelo)**.

Razones:
- Cero riesgo legal de promesa incumplida
- MKT no se demora
- Gating se completa en 2-3 días, después agregamos precios
- El mensaje "AUREX gratis ahora" es más fuerte que "AUREX USD 9,99" para arrancar
- La semana 3 anunciamos PRO/ELITE como "ahora con planes premium" — momento comunicacional

---

## 9. CONSTRUCCIÓN DE LA LANDING DE BIENVENIDA (aurex.live/inicio)

### 9.1. Qué es y para qué

Página separada de la PWA (que es el producto). Pensada solo para que alguien que NO conoce AUREX entre, lea 1-2 minutos, y decida bajar la app o probar la web.

### 9.2. Decisión técnica (cerrada Code + Escritorio 13-may)

- **Stack**: HTML + CSS + JavaScript vanilla (mismo que PWA). NO React/Vue/Astro.
- **Idiomas**: 8 idiomas reutilizando `aurex-i18n.js` de la PWA
- **Deploy**: GitHub Pages automático desde branch main de aurex-app
- **Path**: `aurex-app/marketing/` o `aurex-app/inicio/`. URL pública: `aurex.live/inicio`
- **Costo**: cero

### 9.3. Estructura — 10 bloques

| # | Bloque | Contenido |
|---|---|---|
| 1 | Encabezado fijo | Logo AUREX dorado + menú (Inicio · Funciones · Planes · FAQ · Bajar app · Selector idioma) |
| 2 | Hero principal | Título 6-8 palabras + sub 12-15 palabras + 2 botones (Google Play grande + Probar en web secundario) + captura de la app en mockup de teléfono |
| 3 | Video demo + galería | Reutilizar mosaico_lanzamiento_1080x1080.mp4 + galería 4-6 capturas reales |
| 4 | Propuesta de valor (6 bullets) | 350+ activos · 24 variables · 8 idiomas · iOS/Android/Web · AUREX Pulse · Disclaimer regulatorio claro |
| 5 | "Cómo funciona AUREX en 3 pasos" | Descargá → Configurá tu portfolio → Recibí alertas con contexto |
| 6 | Features destacadas | AUREX Pulse · AI Engine · Termómetro de Riesgo · Cartera Simulada · Portfolio · Watchlist (con función Comparar) · Alertas · Eventos críticos · Multi-idioma |
| 7 | Cartera Simulada como hero secundario | Sección destacada explicando la idea: "Probá AUREX sin gastar un peso. Armá tu cartera simulada y mirá su desempeño en tiempo real" |
| 8 | Comparativas vs competencia | Tabla concisa "AUREX vs Tradingview vs Cocos vs Bloomberg" con énfasis en cruce FED+GDELT + 8 idiomas + Cartera Simulada |
| 9 | Planes y precios (cuando gating esté listo) | Tabla FREE / PRO USD 9,99 / ELITE USD 19,99. Hasta entonces: "Gratis durante el lanzamiento" |
| 10 | FAQ + Disclaimer + Footer | 8-10 preguntas + disclaimer regulatorio extendido en cada idioma + links legales + links a redes |

### 9.4. Construcción (paso a paso)

| Paso | Quién | Skills usadas | Tiempo |
|---|---|---|---|
| 1. Referencia visual | Code | shadcnblocks (inspiración estructural) | 30 min |
| 2. Sistema de diseño (paleta + fuentes + componentes base) | Code | ui-ux-pro-max + frontend-design + minimalist-ui | 30 min |
| 3. Copy 10 bloques en inglés | Code | marketing-skills:copywriting + marketing-context | 1 hora |
| 4. Traducción a 7 idiomas | Code | aurex-i18n.js + content-humanizer | 30 min |
| 5. HTML + CSS + JS de la landing | Code | frontend-design + design-taste-frontend + high-end-visual-design + full-output-enforcement | 2-3 hs |
| 6. Imágenes + screenshots | Code | imagegen-frontend-web + brandkit | 30 min |
| 7. Validación visual con Playwright | Code + Escritorio Chrome | playwright + redesign-existing-projects | 30 min |
| 8. Aprobación final captura | Fernando | — | 15 min |
| 9. Deploy GitHub Pages | Code | — | 5 min |

**Tiempo total**: 6-8 hs Code, repartibles en 2 jornadas.

---

## 10. ACTUALIZACIÓN DE LA PWA aurex.live (paridad con Android Build 17)

Funciones que le faltan:

| Función | Tiempo Code | Cómo se valida |
|---|---|---|
| Push notifications (Firebase Web SDK + Service Worker + VAPID keys) | 1,5 hs | Playwright headless + Escritorio Chrome |
| Integración Telegram real (deep-link bot @Aurexalertas_bot + polling) | 1 hora | Test usuario real conecta y recibe alerta |
| Pantalla "Cómo usar AUREX" (6 tabs, 41 keys i18n ya existen) | 1 hora | Visual + texto correcto los 8 idiomas |

**Total**: 3,5 hs Code, en 1 jornada.

**Comunicación de la actualización (cuando esté lista)**:

EN: "AUREX on web just got better. Real-time alerts, Telegram integration, and onboarding — all working now from your browser at aurex.live."

ES: "AUREX en la web subió un escalón. Notificaciones en tiempo real, integración con Telegram y guía de uso completa — todo funcionando ahora desde tu navegador en aurex.live."

Hito comunicacional que da empuje a semana 2.

---

## 11. PLAN DE REDES — qué publica cada canal

### 11.1. Prioridad de canales (revisada con feedback Escritorio)

| Tier | Canales | Cambios vs v2 |
|---|---|---|
| 🥇 P0 (foco principal) | Telegram + X / Twitter + LinkedIn + Landing | Sin cambio |
| 🥈 P1 (presencia activa moderada) | Instagram | YouTube bajó a P2 (Escritorio: no traccionan Shorts con 0 suscriptores; mejor concentrar en P0 primero) |
| 🥉 P2 (mantener vivo) | YouTube + TikTok + Email | YouTube se suma a P2. Email arranca semana 3 post-landing |

### 11.2. Resumen por canal (con cambios Escritorio incorporados)

| Red | Rol | Frecuencia | Idiomas | Cómo se publica |
|---|---|---|---|---|
| **Telegram @aurex_ai** | Feed alertas + briefings | 2-3 mensajes/día (9 / 13 / 20 hs AR) | EN primario + ES esporádico | Bot Telegram API gratis + cron Railway |
| **X / Twitter @aurex_live** | Construir audiencia FinTwit | Warm-up 2-3/día primeros 7 días + 4-6/día después | EN + ES paralelo | X API v2 tier gratis + cron Railway |
| **LinkedIn aurex-fintech** | Credibilidad B2B | 3 posts/semana (Lun + Mié + Vie 9-10 AR) | EN + ES en posts espejo | **MANUAL primeros 30 días** vía Escritorio Chrome (Escritorio: LinkedIn API tarda en aprobar). API es objetivo, no punto de partida |
| **Instagram @aurex_live** | Visual + Stories diarias | 3-4 feed/sem + Stories diarias (20-22 hs AR) | ES primario + EN en posts grandes | Meta Graph API + cron Railway |
| **YouTube @aurex-fintech** | SEO long-tail | 1 Short/sem + 1 video largo cada 3 sem (Escritorio: bajar volumen) | EN con subs auto en 7 idiomas | YouTube Data API + cron Railway |
| **TikTok @aurex_live** | Discovery viral si surge | 2/sem mientras espera Business Verification | ES primario | TikTok Content Posting API (review pendiente) + manual asistido mientras |

### 11.3. Mix de contenido (40 / 20 / 15 / 15 / 10)

| Pilar | % | Ejemplos AUREX |
|---|---|---|
| Educativo | 40% | Cómo leer AUREX Pulse / Cómo interpretar cruce FED+GDELT / Cómo armar Cartera Simulada |
| Detrás de escena | 20% | Por qué AUREX nació en AR / Cómo decidimos las 24 variables / Cómo funciona el AI Engine |
| Prueba social | 15% | 24 instalaciones desde 177 países / Retención día 1 buena / Cuando lleguen testimonios |
| Conversación | 15% | "¿Qué activo seguís más?" / "Compará tu cartera vs índice S&P 500" / "¿Bitcoin o oro como hedge?" |
| Promocional | 10% (techo) | Lanzamiento Android / Cartera Simulada como gancho / Comparativas vs competidores |

### 11.4. Calendario semana modelo (replicable)

#### Semana 1 (lunes 19 a domingo 25 de mayo) — arranque tras gating + landing listos

Por qué el lunes 19 y no el 14: necesitamos primero terminar gating + actualizar PWA + construir landing. Línea de tiempo realista en sección 12.

| Día / Hora AR | Telegram | X (warm-up) | LinkedIn | Instagram | YouTube | TikTok |
|---|---|---|---|---|---|---|
| **Lun 19** 9/13/20 | Brief AM EN + Pulse ES + cierre NY EN | Tweet 1: "Introducing AUREX" + Tweet 2: 1 datapoint cruzado | Post largo: "Why AUREX exists" (EN+ES) | — | — | — |
| **Mar 20** | TG diario | 2 tweets: 1 datapoint + 1 pregunta a FinTwit | — | Carrusel ES "Qué es AUREX en 6 slides" | — | Short ES "AUREX en 30 segundos" |
| **Mié 21** | TG diario | 2-3 tweets: cruce FED + GDELT (captura) | Post largo: "The 24-variable engine" (EN+ES) | Stories: Pulse del día | — | — |
| **Jue 22** | TG diario | 2 tweets + reply a @FedResearch | — | — | Short EN "How AUREX Pulse works" 45s | — |
| **Vie 23** | TG diario + wrap-up | Hilo 5 tweets "5 cruces macro+geo de la semana" | Carrusel: "Friday market roundup" (EN+ES) | Reel ES "Lo que pasó esta semana" | — | Short ES "Friday recap" |
| **Sáb 24** | TG light | 1-2 tweets + replies | — | Stories: Pulse weekend | — | — |
| **Dom 25** | TG: eventos próx semana | 2 tweets: "Week ahead" | — | Carrusel ES "Eventos críticos próxima semana" | — | — |

#### Semanas 2-4

A partir del lunes 26-may:
- X sale del warm-up: 4-6 tweets/día con links progresivos a aurex.live
- Empieza email (Resend o equivalente) con secuencia de bienvenida
- Empiezan piezas comparativas blog (AUREX vs Tradingview, vs Cocos, vs Bloomberg)
- Anuncio "AUREX en la web subió un escalón" (PWA actualizada)
- Cuando esté gating listo: anunciar PRO/ELITE como momento comunicacional

---

## 12. LÍNEA DE TIEMPO REAL desde 13-may PM (corregida)

### 12.1. Cronograma

| Fecha | Día sesión | Qué pasa (Code + Escritorio interno) | Qué pasa público |
|---|---|---|---|
| **Mié 14** | Hoy | Auditoría sistema FREE/PRO/ELITE completa. Plan v3 generado. Decisiones Fernando pendientes | Nada |
| **Jue 15** | +1 | Code arranca **Paso 1**: webhook RevenueCat → Supabase (2 hs) + **Paso 2**: validación plan en backend (3 hs) | Nada |
| **Vie 16** | +2 | Code arranca **Paso 3**: gating cliente PWA + reemplazar PayPal por Lemon Squeezy (2-3 hs) + arranca PWA push (1,5 hs) | Nada |
| **Sáb 17** | +3 | Code: terminar PWA push + Telegram + Cómo usar (resto 2,5 hs). Empezar construcción landing (3 hs) | Nada |
| **Dom 18** | +4 | Code: terminar landing (3-5 hs). Validación Escritorio Chrome. Aprobación Fernando | Nada |
| **Lun 19** | +5 | Code: generar primeros 14 posts semana 1. Validación Escritorio. Aprobación Fernando | **🚀 Arranque público redes**: Telegram + X warm-up + LinkedIn primer post + IG carrusel |
| **Mar 20 - Vie 23** | +6 al +9 | Code: monitoreo + ajustes + generación contenido semana 2 | Publicaciones según calendario semana 1 |
| **Sáb 24-Dom 25** | +10 al +11 | Code: revisar métricas semana 1 + preparar lote semana 2 + arranque email | Wrap-up redes |
| **Lun 26** | +12 | — | Semana 2 arranca con anuncio "PWA actualizada" + X sale de warm-up |

### 12.2. Tiempo total Code

- Arreglo sistema FREE/PRO/ELITE: 8-10 hs (días 1-3)
- Actualización PWA con 3 funciones: 3,5 hs (días 2-4)
- Construcción landing: 6-8 hs (días 3-5)
- Setup n8n + APIs + cron: 2-3 hs (días 1-3 en paralelo)
- Generación primeros 14 posts: 1-2 hs (día 5)
- **Total Code**: 20-26 hs repartibles en 5-6 jornadas

### 12.3. Tiempo total Fernando

- Aprobar el plan v3 (este documento): 30 min
- Aprobar lote contenido semana 1: 20 min
- Aprobaciones semanales después (modelo): 15-20 min/sem
- **Total semana 1**: ~1 hs Fernando

---

## 13. WORKFLOW Code / Escritorio / Fernando

| Paso | Quién | Cambio vs v2 |
|---|---|---|
| Planificación temas semanal | Code orquesta + Escritorio revisa | Sin cambio |
| Generación copy EN (idioma maestro) | Code con copywriting + content-production | Sin cambio |
| Generación visuales (carruseles, banners, búho v2) | Code con frontend-design + taste-skill + brandkit | Sin cambio |
| Traducción a 7 idiomas | Code con aurex-i18n.js + content-humanizer | Sin cambio |
| Lote semanal a Fernando | Code arma doc Markdown con copy + thumbnails | Sin cambio |
| **Aprobación de Fernando los viernes** | **Bloqueo absoluto sin OK explícito durante semanas 1 y 2** (cambio por feedback Escritorio). Cron zero-touch recién desde semana 3 si todo OK | **CAMBIO** |
| Scheduling en n8n + APIs nativas | Code | Sin cambio |
| Publicación automática | Cron Railway autónomo | Sin cambio (excepto LinkedIn) |
| **LinkedIn**: publicación manual via Chrome | **Escritorio** | **CAMBIO**: LinkedIn API es objetivo no punto de partida (feedback Escritorio) |
| Engagement (réplies, comments, DMs) | Escritorio monitorea + drafta + Code aprueba + Fernando si comercial | Sin cambio |
| Métricas semanales | Code con social-media-analyzer | Sin cambio |
| Crisis management | Fernando + Code coordinan en <1 hr | Sin cambio |

---

## 14. AUTOMATIZACIÓN — n8n + APIs nativas (cero costo)

- **n8n self-hosted en Railway**: instancia nueva sobre el mismo Railway que ya pagamos
- **APIs nativas**:
  - Telegram Bot API (gratis, sin límite)
  - X API v2 (tier gratis: 500 tweets/mes, suficiente para Fase 1)
  - LinkedIn Marketing API (acceso a Company Pages — requiere aprobación, tarda semanas → fallback manual)
  - Meta Graph API (Instagram, gratis)
  - YouTube Data API (gratis con cuota generosa)
  - TikTok Content Posting API (requiere review, 1-3 semanas)
- **Cron del backend Railway**: dispara workflows de n8n según horario por canal
- **Costo recurrente**: cero (Railway ya está pago)

---

## 15. EMAIL — desde semana 3 (post-gating + landing)

### 15.1. Estado al 13-may

- Sin proveedor configurado
- Plan original era Lemon Squeezy + Resend, pero la auditoría reveló que la PWA usa PayPal y Lemon nunca se integró

### 15.2. Decisión técnica para Fase 1

- **Proveedor email**: Resend (3.000 emails gratis/mes o USD 20/mes 50k emails)
- **Dominio remitente**: `mail.aurex.live` (subdominio dedicado)
- **Templates**: HTML simples con MJML o React Email
- **Idiomas**: 8 idiomas reutilizando aurex-i18n.js

### 15.3. Secuencias

1. **Bienvenida** (1 sola vez, inmediato al signup): agradece, recuerda botón Android + PWA, da 3 tips
2. **Newsletter semanal** (lunes 9 AR): wrap-up mercados + 3 piezas educativas + 1 evento crítico próxima semana
3. **Re-activación** (a los 14 días sin abrir app): "¿estás bien? Acá está lo último"

### 15.4. Quién lo arma

Code con email-sequence + copywriting + content-humanizer. Fernando aprueba los 3 templates en bloque, después corre automático.

---

## 16. MÉTRICAS — qué medimos (con objetivos justificados de sección 3)

### 16.1. Tabla consolidada (target "Recomendado" — Fernando puede cambiar)

| Métrica | Canal | Target 30 días | Target 90 días |
|---|---|---|---|
| Suscriptores | Telegram | 150 | 800 |
| Followers + ER | X / Twitter | 150 + 2% | 400 + 3% |
| Followers Company Page | LinkedIn | 120 | 400 |
| Followers + saves rate | Instagram | 150 + 5% | 600 + 7% |
| Suscriptores + horas | YouTube | 30 + 50 hs | 150 + 400 hs |
| Followers | TikTok | 80 | 400 |
| Sesiones únicas/sem | Landing | 300 | 1.000 |
| Suscriptores | Email | 80 | 300 |
| **Instalaciones Android cross** | Cross | **400** | **2.000** |
| **Total followers 6 redes** | Cross | **800** | **3.000** |
| Conversión FREE → PRO | App | 1% | 3% |

### 16.2. Métricas que NO medimos en Fase 1

- Impresiones puras sin engagement
- Reach sin acción
- Likes solos
- Followers que no convierten en descarga

---

## 17. CÓMO MONITOREAR USUARIOS REALES — quién, cómo, cuándo

### 17.1. Pregunta de Fernando: "¿cómo sabemos quiénes son los primeros usuarios?"

Hay 4 fuentes de información:

| Fuente | Quién accede | Qué muestra | Frecuencia |
|---|---|---|---|
| **Google Play Console** | Escritorio vía Chrome (Fernando + Escritorio comparten cuenta fmoscon@gmail.com) | Instalaciones por día/país, DAU, retención, reviews | Diario |
| **Apple App Store Connect** | Escritorio vía Chrome | Descargas (cuando aprueben Build 17), reviews, crashes | Diario post-aprobación |
| **Supabase tabla `usuarios`** | Code con service key local | Email, plan, idioma, dispositivo, fecha registro de cada usuario | A demanda |
| **GA4 en landing aurex.live/inicio** (cuando esté instalado) | Code + Escritorio via dashboard | Visitantes únicos, fuente de tráfico, conversión a botón "Descargar" | Diario |

### 17.2. Reporte diario automático (a implementar)

Cron Railway 9 AR diario manda a Telegram admin Fernando:
- Instalaciones nuevas últimas 24h
- Total usuarios Supabase
- Top 3 países que descargaron
- Cualquier review nueva en Google Play
- Cualquier crash reportado

### 17.3. Outreach a primeros usuarios

Cuando un usuario llega a 7 días desde signup:
- Code dispara email automático (template "¿cómo va con AUREX?")
- Pide feedback breve (3 preguntas)
- Ofrece responder por Telegram al canal
- Si el usuario responde, Escritorio drafta seguimiento, Code aprueba, Fernando lee si es importante

---

## 18. RIESGOS Y MITIGACIÓN

| Riesgo | Probabilidad | Mitigación |
|---|---|---|
| Build 17 Apple rechaza por sistema FREE/PRO/ELITE roto | Media | Implementar gating ya. Apple revisa sandbox, mejor que vea sistema funcional |
| Usuario compra en PayPal antes de arreglar gating | Baja (no se promociona) | Verificar dashboard PayPal vía Escritorio. Si hubo compras, reembolsar + comunicar |
| Warm-up X falla y X re-bloquea cuenta | Media | Estricto 2-3 posts/día sin links primeros 7 días. Contactar XAGEA-751927 si flag |
| TikTok rechaza Business Verification | Baja-Media | Plan B cuenta Personal sin link en bio |
| LinkedIn API tarda o no aprueba | Alta | Plan A es manual via Escritorio Chrome — la API es objetivo, no inicio |
| Regulación financiera flag por "señales de inversión" | Media-Alta | Disclaimer "Not a broker. Not advice." en TODO. Nunca decir "comprar"/"vender" |
| Apple Build 17 sigue >30 días en queue | Media | Plan ya asume "iOS coming soon". No bloquea |
| Algoritmo Instagram penaliza cuenta nueva | Media | Cadencia conservadora 3-4 feed/sem + Stories diarias |
| Fernando no aprueba lote semanal | Baja | Bloqueo absoluto sin OK durante semanas 1-2 (Escritorio recomendado). Semana 3+ cron zero-touch si todo OK |
| Crisis de marca | Baja-Media | Protocolo: Escritorio detecta + alerta + Code+Fernando deciden en <1 hr |
| PWA no se actualiza a tiempo | Baja | Si pasa de 1 día, plan sigue con CTA Android principal. PWA se anuncia cuando lista |
| Landing no queda bien en algún idioma | Baja | Validación visual Escritorio en 8 idiomas antes de publicar |

---

## 19. APRENDIZAJES QUE DOCUMENTO (para que no se repitan)

Errores graves descubiertos en esta v3:

1. **No se hizo testing end-to-end del sistema de pagos antes de publicar Android Build 17** — el código tenía el sistema de planes como decoración. Aprendizaje: TODO flujo de pago se prueba end-to-end ANTES de publicar, no después.

2. **Documentación desactualizada llevó a inventos en el plan v2** — el plan v2 mencionaba Lemon Squeezy porque los docs decían "se va a integrar Lemon Squeezy" cuando en realidad la PWA usa PayPal. Aprendizaje: validar contra código real, no contra docs viejos.

3. **Datos de instalaciones desactualizados en brief y plan v2** — brief decía "10 instalaciones en 34 hs" cuando hoy son 24. Aprendizaje: brief se actualiza al cierre de cada sesión sí o sí (memoria nueva creada hoy).

4. **El plan v2 inventó objetivos (500 instalaciones, 1.000 followers) sin base** — Fernando lo cuestionó con razón. Aprendizaje: objetivos justificados con benchmarks reales o conversación con stakeholder.

5. **Mezclé conceptos PWA con landing en plan v2** — Fernando me corrigió que son dos cosas distintas. Aprendizaje: separar producto (PWA) de marketing (landing) en lenguaje y planificación.

6. **No incluí features clave (Termómetro, Cartera Simulada, Comparar Activos) en plan v2** — porque me basé en el contexto inicial que no las tenía documentadas. Aprendizaje: cruzar features con AUREX_FEATURES_PARA_MKT.md + memoria proyecto antes de generar plan.

---

## 20. DECISIONES QUE REQUIEREN INPUT DE FERNANDO

Las únicas decisiones que necesitan tu input antes de arrancar:

### 20.1. Objetivos de la Fase 1

¿Vamos con el carril "Recomendado" de la sección 3 (400 instalaciones + 800 followers en 30 días) o querés otro?

### 20.2. Comunicación de precios PRO/ELITE en Fase 1

¿Vamos con la **Opción B** (sección 8) — arrancar MKT sin precios PRO/ELITE, gating se implementa en paralelo, semana 3 anunciamos precios? O preferís A (esperar gating, demora 2-3 días) o C (lista de espera)?

### 20.3. Cron zero-touch los viernes

¿Vamos con el cambio recomendado por Escritorio: bloqueo absoluto sin OK explícito semanas 1-2, cron zero-touch desde semana 3 si todo va bien?

### 20.4. Cartera Simulada como pilar de marketing

¿La incorporamos como pieza central de la landing (sección 9 bloque 7) y como gancho recurrente en redes (sección 6.8)?

---

## 21. LO QUE RESUELVE CODE (sin tu input)

- Implementación del gating completo (8-10 hs)
- Actualización PWA (3,5 hs)
- Construcción landing (6-8 hs)
- Setup n8n + APIs nativas en Railway
- Generación copy + visuales + traducciones cada semana
- Validación técnica con Playwright
- Scheduling + publicación automática
- Engagement (Escritorio drafta, Code aprueba)
- Analytics semanal + ajustes
- Brand voice consistency + disclaimers regulatorios en cada pieza
- Coordinación con Escritorio para validación visual y publicación manual LinkedIn

---

## Próximos pasos inmediatos (post tus 4 decisiones)

1. Code arranca el Paso 1 del arreglo: webhook RevenueCat → Supabase (jueves 15-may)
2. En paralelo, Escritorio verifica dashboard PayPal (¿hubo compras reales?)
3. En paralelo, Code arranca construcción landing
4. Día 5 (lunes 19): primer post en redes con producto coherente

---

*Fin del Plan de Lanzamiento AUREX Fase 1 v3.0*
*Versionado: v3.0 reemplaza v2.0. Próximas iteraciones como _v4.*
*Base de contexto: MARKETING_CONTEXT_AUREX_v2.md (en misma carpeta)*
*Stack landing decidido Code + Escritorio: vanilla HTML + i18n reutilizado de PWA (memoria project_landing_stack_decision.md)*
*Sistema FREE/PRO/ELITE auditado 13-may: no implementado en código. Arreglo cerrado Code + Escritorio: orden webhook → backend → PWA Lemon Squeezy. 8-10 hs Code.*
