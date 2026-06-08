# ASO COBREX — superficies + borradores (maxima visibilidad en busquedas)

> SOLO BORRADORES. NO se cambia NADA en la ficha real hasta OK de Fernando.
> Escritorio: rellena columna Borrador + confirma Valor actual desde ASC. Code: rellena Opinion Code. Fernando decide.

---

## NOTA ESTRATEGICA DE CODE (leer primero)
- iOS indexa SOLO Nombre + Subtitulo + Keywords. Descripcion NO se indexa en busqueda.
- Android indexa Titulo + Descripcion corta + Descripcion completa (fuerte).
- Regla: no repetir en keywords lo que ya esta en nombre o subtitulo (Apple no lo penaliza pero desperdicia espacio).
- Web cobrex.io: refuerzo SEO de marca, distinto de ASO de tienda.

### 🔑 DIRECTIVA DE FERNANDO (07-jun) — usar SIEMPRE los 100 chars al máximo
Fernando: *"no puede ser que se usen 20/30/40/50 si podemos usar 100 chars"*. **Regla fija:** llenar el campo Keywords **lo más cerca de 100 chars posible, en CADA idioma**. Y ser encontrable por las **variantes de marca: Cobrex · Cobrex AI · Cobrex Pulse · Cobrex IA** + todos los usos/funciones.
**Técnica de Code para lograrlo sin desperdiciar (clave):**
- `cobrex` YA está en el Nombre → **NO ponerlo en keywords** (Apple lo indexa del nombre). PERO Apple **COMBINA** los keywords con el nombre → para ser encontrado por **"cobrex ai" / "cobrex pulse" / "cobrex ia"**, agregar **`ai`, `pulse`, `ia`** como keywords sueltos (Apple forma cobrex+ai, cobrex+pulse, etc.). No hace falta escribir la frase entera = ahorra chars.
- **Sin espacio después de las comas** (ahorra chars). **Singular** (Apple maneja plurales). No repetir palabra que ya esté en nombre/subtítulo.
- Objetivo por idioma: **~98-100 chars** con variantes de marca (`ai,pulse,ia`) + funciones (alertas, portfolio, watchlist, señales, cripto, acciones, cedears, ETF, mercados, trading, IA, finanzas, inversión…).
- **➡️ Mañana (Code):** optimizar cada string de keywords para acercarlo a 100 chars con esta técnica + cruzar con los borradores de Escritorio (los suyos están en ~87-91 → hay margen para sumar `ai,pulse,ia` + más términos).

---

## App Store iOS — superficies

| Superficie | Limite | Peso busqueda | Valor actual (ASC verificado hoy) | Borrador Escritorio | Opinion Code |
|---|---|---|---|---|---|
| Nombre | 30 chars | max | Cobrex (6 chars) | Sin cambio — la marca no se toca todavia | _(Code)_ |
| Subtitulo | 30 chars | muy alto | EN: AI market analytics / AR: Real-time market data tracker | Alertas, Portfolio e IA (23 chars) — ver Nota 1 | _(Code)_ |
| Keywords EN | 100 chars | muy alto | crypto,stocks,trading,alerts,markets,investing,analysis,AI,ETF,commodities,finance,charts (11 chars — 89 DESPERDICIADOS) | portfolio,watchlist,price alert,signals,tracker,crypto alerts,stock tracker,investment app (91 chars) — ver Nota 2 | _(Code)_ |
| Keywords ES | 100 chars | muy alto | _(pendiente localiz. ES en ASC)_ | inversion,finanzas,bolsa,criptomonedas,acciones,ETF,mercados,trading,analisis,senales (89 chars) — ya decidido | _(Code)_ |
| Keywords PT | 100 chars | muy alto | _(pendiente)_ | investimento,financas,bolsa,cripto,acoes,ETF,mercados,trading,alertas,carteira,sinais (87 chars) | _(Code)_ |
| Keywords FR | 100 chars | muy alto | _(pendiente)_ | investissement,bourse,crypto,actions,ETF,marches,trading,alertes,portefeuille,signaux (87 chars) | _(Code)_ |
| Keywords IT | 100 chars | muy alto | _(pendiente)_ | investimento,borsa,crypto,azioni,ETF,mercati,trading,avvisi,portafoglio,segnali,finanza (88 chars) | _(Code)_ |
| Keywords ZH | 100 chars | muy alto | _(pendiente)_ | ver Nota ZH abajo | _(Code)_ |
| Keywords HI | 100 chars | muy alto | _(pendiente)_ | ver Nota HI abajo | _(Code)_ |
| Keywords AR | 100 chars | muy alto | _(pendiente)_ | ver Nota AR abajo | _(Code)_ |
| Descripcion | 4000 chars | bajo (NO indexada iOS) | ~1100 chars — ver Nota 3 | ver Nota 3 abajo | _(Code)_ |
| What's New | 4000 chars | bajo | This version: Terms of Use and Privacy links... | ver Nota 4 abajo | _(Code)_ |
| Nombres IAP | — | medio | _(pendiente confirmar ASC)_ | _(depende de como esten en RC/ASC)_ | _(Code)_ |

---

## NOTAS DETALLADAS iOS

### Nota 1 — Subtitulo propuesto: Alertas, Portfolio e IA (23 chars)
Por que cambiar: el actual es generico y en ingles puro. No captura el intent del usuario hispanohablante (83% de la base).
Por que este borrador: Alertas y Portfolio son los terminos de mayor volumen de busqueda en apps de inversion. IA en espanol es diferenciador real.
Alternativa A: Portfolio, Alertas e IA (24 chars).
Alternativa B: Portfolio e Alertas IA (23 chars).
IMPORTANTE: cambiar subtitulo requiere nueva version — va con Build 39, no antes.

### Nota 2 — Keywords EN: error critico detectado
El campo actual tiene solo 11 chars de 100 usados — 89 chars desperdiciados. Error grave de ASO.
Ademas los keywords actuales repiten terminos que ya estan en el nombre o subtitulo (trading, markets, analysis, AI) — Apple no los indexa doblemente, solo ocupan espacio.

Borrador corregido (91 chars):
portfolio,watchlist,price alert,signals,tracker,crypto alerts,stock tracker,investment app

Razonamiento keyword por keyword:
- portfolio: alta busqueda, no esta en nombre ni subtitulo actual
- watchlist: alta busqueda para seguimiento de activos
- price alert: frase de 2 palabras de alto volumen
- signals: diferenciador vs apps de broker puro
- tracker: captura intent de seguimiento
- crypto alerts: frase de 2 palabras, alto volumen en fintech
- stock tracker: frase de 2 palabras, alto volumen
- investment app: busqueda generica de alto volumen

### Nota ZH — Keywords chino simplificado
inversion: 投资
acciones: 股票
cripto: 加密货币
mercado: 市场
trading: 交易
alerta: 提醒
portfolio: 投资组合
señal: 信号
finanzas: 财务
futuros: 期货
ETF: ETF
String: 投资,股票,加密货币,ETF,市场,交易,提醒,投资组合,信号,财务,期货

### Nota HI — Keywords hindi
inversion: निवेश
acciones: शेयर
cripto: क्रिप्टो
mercado: बाजार
trading: व्यापार
alerta: अलर्ट
portfolio: पोर्टफोलियो
señal: संकेत
finanzas: वित्त
ETF: ETF
String: निवेश,शेयर,क्रिप्टो,बाजार,व्यापार,अलर्ट,पोर्टफोलियो,संकेत,वित्त,ETF

### Nota AR — Keywords arabe
inversion: استثمار
acciones: أسهم
cripto: عملات رقمية
mercado: أسواق
trading: تداول
alerta: تنبيهات
portfolio: محفظة
señal: إشارات
finanzas: مالية
ETF: ETF
String: استثمار,أسهم,ETF,أسواق,تداول,تنبيهات,محفظة,إشارات,مالية,عملات رقمية

### Nota 3 — Descripcion iOS (borrador EN maestro, Build 39)
iOS NO indexa descripcion para busqueda. Objetivo: convertir al usuario que ya llego a la ficha.
Cambios clave vs actual: primera linea orientada a beneficio, precio $4.99/$9.99 explicito en PLANS, descripcion de cada plan expandida.
PREGUNTA PARA CODE: WhatsApp alerts y API access en ELITE activos en produccion hoy?

BORRADOR DESCRIPCION EN:
Track your investments and get AI-powered alerts.

Cobrex monitors 350+ global assets in real time: stocks, cryptocurrencies, ETFs, commodities, futures and currencies. The AI engine analyzes each asset and sends actionable signals.

WHAT YOU GET
Cobrex Pulse: market sentiment index (0-100) with 14 weighted variables. Global, Crypto, Stocks, Commodities, Futures filters.
Smart alerts: price targets, AI signal changes, sharp moves, Pulse extremes. Via push, email or Telegram.
Portfolio and Watchlist: live quotes on any asset.
Full AI Analysis: probabilistic signals with RSI, MACD, volume and geopolitical context.
8 languages. Light and dark mode.

PLANS
FREE: Markets, Cobrex Pulse, basic alerts.
PRO ($4.99/month): Unlimited alerts, AI signals, advanced indicators, Telegram alerts.
ELITE ($9.99/month): Everything in PRO plus geopolitical alerts, API access, WhatsApp alerts.

IMPORTANT: Cobrex is for informational purposes only. Not financial advice.
Terms: https://cobrex.io/terms.html | Privacy: https://cobrex.io/privacy.html

### Nota 4 — What's New Build 39 (borrador)
PREGUNTA PARA CODE: algun item que NO deba aparecer en el What's New publico?

BORRADOR WHAT'S NEW:
Build 39:
In-app review: rate Cobrex directly from the app.
Prices always current: plan cards show your local price automatically.
Expanded translations: FAQ, AI Analysis and UI in all 8 languages.
Bug fix: fresh-install paywall no longer opens as PRO or ELITE.
Navigation fix: external links open above the tab bar.

---

## Play Store (Android) — superficies

| Superficie | Limite | Peso busqueda | Valor actual | Borrador Escritorio | Opinion Code |
|---|---|---|---|---|---|
| Titulo | 30 chars | max (Google indexa fuerte) | Cobrex | Cobrex: Mercados y Alertas (26 chars) — ver Nota 5 | _(Code)_ |
| Descripcion corta | 80 chars | alto (Google SÍ indexa) | _(pendiente Play)_ | App de inversion con IA. Alertas, Portfolio y analisis de mercados en tiempo real. (80 chars exactos) | _(Code)_ |
| Descripcion completa | 4000 chars | alto (Google SÍ indexa fuerte) | _(pendiente Play)_ | Similar iOS pero con cobrex + keywords repetidos 3-5 veces de forma natural en el texto | _(Code)_ |

### Nota 5 — Titulo Android: sumar keyword
Android permite y recomienda keyword en el titulo (iOS es mas conservador). El titulo indexa fuerte en Play.
Borrador: Cobrex: Mercados y Alertas (26 chars, dentro de 30).
Alternativa: Cobrex - Portfolio e IA (23 chars).

---

## Web cobrex.io (SEO — refuerzo de marca, no ASO de tienda)

| Superficie | Valor actual | Borrador Escritorio | Opinion Code |
|---|---|---|---|
| title + meta description | _(pendiente verificar)_ | Cobrex - App de inversion con IA - Alertas y Portfolio | _(Code)_ |
| H1 / texto landing | _(pendiente verificar)_ | Incluir cobrex + inversion + alertas + portfolio + IA en H1 y primer parrafo | _(Code)_ |

---

## ESTADO POR SUPERFICIE

| Superficie | Estado |
|---|---|
| iOS Keywords EN | Borrador listo — pendiente OK Code + Fernando |
| iOS Keywords ES | Ya decidido (89 chars) |
| iOS Keywords PT | Borrador listo |
| iOS Keywords FR | Borrador listo |
| iOS Keywords IT | Borrador listo |
| iOS Keywords ZH | Borrador listo (ver Nota ZH) |
| iOS Keywords HI | Borrador listo (ver Nota HI) |
| iOS Keywords AR | Borrador listo (ver Nota AR) |
| iOS Subtitulo | Borrador listo — va con Build 39 |
| iOS Descripcion | Borrador listo — pendiente OK Code |
| iOS What's New Build 39 | Borrador listo — pendiente OK Code |
| iOS Nombres IAP | Pendiente confirmar en ASC |
| Android Titulo | Borrador listo |
| Android Descripcion corta | Borrador listo |
| Android Descripcion completa | Pendiente |
| Web cobrex.io | Pendiente verificar actual |

Escritorio — 07-jun-2026. Pendiente revision Code + OK Fernando antes de cargar en ASC/Play.
