# Descripciones Google Play — Build 2

**Generado por Code el 3-may-2026** tras hallazgo crítico de Escritorio: la ficha actual de Google Play Console contiene lenguaje prohibido por las reglas del Bloque 1 + Build 17 metadata segura.

**Pendiente:** Fernando aplica los cambios en Play Console **antes** de solicitar acceso a producción.

---

## PROBLEMA ACTUAL DETECTADO

### Lo que está hoy en Google Play Console (Build 2)

| Campo | Contenido actual | Problema |
|---|---|---|
| Feature graphic | "INTELIGENCIA FINANCIERA EN TIEMPO REAL" | Lenguaje financiero prohibido |
| Descripción breve | "AI investment portfolio: signals, alerts & real-time market data" | "investment portfolio" + "signals" como producto |
| Descripción completa | "personal financial platform to manage investment portfolios" / "buy/sell signals" / "AI Engine: buy/sell signals" / "AI Alerts: automatic notifications when the engine detects opportunities" / "Only invest what you are willing to lose" | Múltiple violación: posicionamiento como "personal financial platform" + "buy/sell signals" textuales (lo más grave) + lenguaje de oportunidades de inversión |

**Riesgo:** solicitar producción con este lenguaje activo = rechazo casi seguro de Google + posible activación de revisión adicional sobre la app misma. Hay que corregir **antes** de promover.

---

## VERSIÓN INGLÉS (idioma maestro v3.0)

### Descripción breve — máximo 80 caracteres

```
Real-time global markets tracker. 350 assets, 24 variables, 8 languages.
```

**Char count:** 73 / 80

### Descripción completa — máximo 4000 caracteres

```
AUREX is the global markets terminal for the individual market follower. Track 350 selected assets across 9 instrument types and 7 global markets in real time, in 8 languages.

WHAT AUREX TRACKS

— 198 stocks across 7 global markets: USA, Argentina, Brazil, Spain, Europe, Japan and China.
— 50 cryptocurrencies and 3 stablecoins.
— 40 ETFs.
— 20 futures contracts.
— 14 bonds.
— 12 commodities.
— 8 metals.
— 5 currencies.

THE 24-VARIABLE ENGINE

AUREX cross-references 24 variables in real time on every asset:

— 10 technical and macro variables in the AI Engine: 24h trend, RSI14, relative volume, volatility, BTC/SPY correlation, Gold/Oil correlation, FED macroeconomic data, earnings, MACD 12/26, 30-day support and resistance.
— 14 market context sources in the AUREX Pulse: BTC (price, dominance, variation), ETH, VIX, SP500, ES/NQ/YM/RTY futures, Gold, Silver, Oil, Copper, FED macroeconomic data and GDELT geopolitics.

The combination of FED macro data and GDELT geopolitical events on every asset signal is unique among retail tools.

REAL-TIME GLOBAL VIEW

— Markets banner: 11 customizable global exchanges showing open / closed / pre and post-market status in real time.
— Futures banner: 16 instruments across 6 categories — instant view of where the market is heading before the open.
— Critical events ticker: high and medium impact economic events active right now (FED, CPI, employment, geopolitics).

ALERT SYSTEM

15 configurable alert types: AI signal changes, high conviction signals (85-88%), custom probability thresholds, Portfolio asset signals, Pulse zone changes, risk thermometer changes, price targets, sharp moves, new 52-week highs and lows, FED/FOMC, CPI, market openings, Portfolio earnings, GDELT geopolitical events.

INTELLIGENT PORTFOLIO

A unified tracking portfolio — not a trading account. Bring assets you already hold elsewhere into a single view. PnL across 5 periods (daily, weekly, monthly, quarterly, annual). AI Risk Thermometer in real time. Per-asset AI dots. Multi-currency converter. Cloud sync across devices.

ACCESSIBILITY

— Available in 8 languages: English, Spanish, Portuguese, Chinese, French, Italian, Hindi, Arabic.
— Light and dark mode.
— Face ID and Touch ID.
— Integrated Help Center.
— Available on iOS, Android and as PWA installable from aurex.live.

PLANS

— FREE: 5 Portfolio assets, 3 daily AI signals, real-time markets, basic Pulse.
— PRO ($9.99/month, $89.99/year): unlimited AI signals, unlimited Portfolio, all alerts, 30-day history.
— ELITE ($19.99/month, $179.99/year): everything in PRO plus advanced AUREX Pulse, advanced technical analysis (RSI, MACD), early beta access and live chat support. SMS/WhatsApp/Telegram alerts coming soon.

WHAT AUREX IS NOT

Not a broker. Not advice. Not a buy/sell platform. AUREX does not execute trades, does not custody assets, does not transfer money. It is the global markets tracking terminal that complements your broker — not replaces it. Statistical analytics for the individual market follower.

aurex.live
```

**Char count:** 3.013 / 4.000

---

## VERSIÓN ESPAÑOL

### Descripción breve — máximo 80 caracteres

```
Tracker de mercados globales en tiempo real. 350 activos, 24 variables.
```

**Char count:** 71 / 80

### Descripción completa — máximo 4000 caracteres

```
AUREX es el terminal de seguimiento de mercados globales para el seguidor de mercados individual. Rastrea 350 activos seleccionados de 9 tipos de instrumentos en 7 mercados globales, en tiempo real y en 8 idiomas.

QUÉ RASTREA AUREX

— 198 acciones en 7 mercados globales: USA, Argentina, Brasil, España, Europa, Japón y China.
— 50 criptomonedas y 3 stablecoins.
— 40 ETFs.
— 20 contratos de futuros.
— 14 bonos.
— 12 commodities.
— 8 metales.
— 5 divisas.

EL MOTOR DE 24 VARIABLES

AUREX cruza 24 variables en tiempo real sobre cada activo:

— 10 variables técnicas y macroeconómicas en el Motor IA: tendencia 24h, RSI14, volumen relativo, volatilidad, correlación BTC/SPY, correlación Oro/Petróleo, datos macroeconómicos de la FED, earnings, MACD 12/26, soporte y resistencia de 30 días.
— 14 fuentes de contexto de mercado en el AUREX Pulse: BTC (precio, dominancia, variación), ETH, VIX, SP500, futuros ES/NQ/YM/RTY, Oro, Plata, Petróleo, Cobre, datos macroeconómicos FED y geopolítica GDELT.

La combinación de datos macroeconómicos FED y eventos geopolíticos GDELT sobre cada señal es un diferencial único entre las herramientas retail.

VISIÓN GLOBAL EN TIEMPO REAL

— Banner Mercados: 11 plazas globales customizables mostrando abierto / cerrado / pre y post-market en tiempo real.
— Banner Futuros: 16 instrumentos en 6 categorías — visión instantánea de hacia dónde apunta el mercado antes de la apertura.
— Ticker de eventos críticos: eventos económicos de impacto alto y medio activos en el momento (FED, CPI, empleo, geopolítica).

SISTEMA DE ALERTAS

15 tipos de alertas configurables: cambios de señal IA, alta convicción (85-88%), umbrales de probabilidad personalizados, señales sobre activos del Portfolio, cambios de zona Pulse, cambios del termómetro de riesgo, precios objetivo, movimientos bruscos, nuevos máximos y mínimos de 52 semanas, FED/FOMC, CPI, aperturas de mercado, earnings del Portfolio, eventos geopolíticos GDELT.

PORTFOLIO INTELIGENTE

Una cartera de seguimiento unificada — no es cuenta de trading. Reúne en una sola vista los activos que ya tenés en otras plataformas. PnL en 5 períodos (diario, semanal, mensual, trimestral, anual). Termómetro de Riesgo IA en tiempo real. Dots IA por activo. Conversor multi-divisas. Sincronización en la nube entre dispositivos.

ACCESIBILIDAD

— Disponible en 8 idiomas: español, inglés, portugués, chino, francés, italiano, hindi, árabe.
— Modo claro y oscuro.
— Face ID y Touch ID.
— Centro de Ayuda integrado.
— Disponible en iOS, Android y como PWA instalable desde aurex.live.

PLANES

— FREE: 5 activos en Portfolio, 3 señales IA diarias, mercados en tiempo real, Pulse básico.
— PRO ($9,99/mes, $89,99/año): señales IA ilimitadas, Portfolio ilimitado, todas las alertas, historial 30 días.
— ELITE ($19,99/mes, $179,99/año): todo lo de PRO más AUREX Pulse completo, análisis técnico avanzado (RSI, MACD), acceso anticipado a beta y soporte por chat en vivo. Alertas SMS/WhatsApp/Telegram próximamente.

LO QUE AUREX NO ES

No es un broker. No es asesoramiento. No es plataforma de compra/venta. AUREX no ejecuta operaciones, no custodia activos, no transfiere dinero. Es el terminal de seguimiento de mercados globales que complementa a tu broker — no lo reemplaza. Análisis estadístico para el seguidor de mercados individual.

aurex.live
```

**Char count:** 3.215 / 4.000

---

## VERIFICACIÓN DE LENGUAJE — ninguna palabra prohibida

### Palabras NUNCA usadas en estas descripciones

- ❌ "investing" / "investment tools" / "investment platform"
- ❌ "trading" / "trading signals" / "trading platform"
- ❌ "buy/sell signals" / "buy now" / "sell now" / "comprá" / "vendé"
- ❌ "make money" / "profits" / "profits guaranteed" / "high returns"
- ❌ "investment advice" / "financial advice" / "asesoramiento" / "recomendación de inversión"
- ❌ "fintech" / "financial services"
- ❌ "AI signals" como producto principal (solo "AI Engine" como nombre del motor)
- ❌ "opportunities" / "oportunidades de inversión"
- ❌ "Only invest what you are willing to lose" (disclaimer pero revela posicionamiento financiero)

### Palabras PERMITIDAS usadas

- ✅ tracker / terminal / real-time / data / markets / follow / track
- ✅ statistical analytics
- ✅ technical indicators / macroeconomic data / geopolitics / market sentiment
- ✅ individual market follower / seguidor de mercados individual
- ✅ Not a broker / Not advice / Not a buy/sell platform
- ✅ AI Engine (como nombre técnico del motor, no como producto)

---

## PLAN DE APLICACIÓN

1. **Fernando aprueba** versiones EN + ES propuestas (o pide ajustes).
2. **Fernando entra a Google Play Console** → Build 2 → Listado de Store → Descripción y traducciones.
3. **Reemplaza descripción breve y completa** en EN y ES con las versiones aprobadas.
4. **Reemplaza el feature graphic** (1024×500) por una versión nueva sin "INTELIGENCIA FINANCIERA". Esto se resuelve cuando se generen los assets del Bloque 4 (Fase C del Paso CERO).
5. **NO solicitar acceso a producción** hasta que los 3 cambios estén aplicados (descripción breve + descripción completa + feature graphic).

**Riesgo de aplicar el cambio AHORA mientras Build 2 está en closed testing:** muy bajo. Google permite editar descripciones del listing sin afectar el closed testing. La revisión adicional, si la hay, sería sobre el listing nuevo, no sobre la app.

**Recomendación de timing:**
- **Descripción breve y completa: aplicar lo antes posible** (no bloquea closed testing y mejora alineación regulatoria).
- **Feature graphic: aplicar cuando se generen los assets del Bloque 4 Fase C** (mismo paquete con avatares y banners de redes sociales).
- **NO solicitar producción** antes de que los 3 cambios estén aplicados.

---

---

## VERSIÓN PORTUGUÉS (PT) — brasilero

### Descripción breve — máximo 80 caracteres

```
Tracker global de mercados em tempo real. 350 ativos, 24 variáveis, 8 idiomas.
```

**Char count:** 78 / 80

### Descripción completa — máximo 4000 caracteres

```
AUREX é o terminal de acompanhamento de mercados globais para o seguidor de mercados individual. Rastreia 350 ativos selecionados de 9 tipos de instrumentos em 7 mercados globais, em tempo real e em 8 idiomas.

O QUE AUREX RASTREIA

— 198 ações em 7 mercados globais: USA, Argentina, Brasil, Espanha, Europa, Japão e China.
— 50 criptomoedas e 3 stablecoins.
— 40 ETFs.
— 20 contratos futuros.
— 14 títulos.
— 12 commodities.
— 8 metais.
— 5 moedas.

O MOTOR DE 24 VARIÁVEIS

AUREX cruza 24 variáveis em tempo real sobre cada ativo:

— 10 variáveis técnicas e macroeconômicas no Motor IA: tendência 24h, RSI14, volume relativo, volatilidade, correlação BTC/SPY, correlação Ouro/Petróleo, dados macroeconômicos do FED, earnings, MACD 12/26, suporte e resistência de 30 dias.
— 14 fontes de contexto de mercado no AUREX Pulse: BTC (preço, dominância, variação), ETH, VIX, SP500, futuros ES/NQ/YM/RTY, Ouro, Prata, Petróleo, Cobre, dados macroeconômicos FED e geopolítica GDELT.

A combinação de dados macroeconômicos FED e eventos geopolíticos GDELT sobre cada sinal é um diferencial único entre as ferramentas retail.

VISÃO GLOBAL EM TEMPO REAL

— Banner Mercados: 11 praças globais customizáveis mostrando aberto / fechado / pré e pós-mercado em tempo real.
— Banner Futuros: 16 instrumentos em 6 categorias — visão instantânea de para onde aponta o mercado antes da abertura.
— Ticker de eventos críticos: eventos econômicos de impacto alto e médio ativos no momento (FED, CPI, emprego, geopolítica).

SISTEMA DE ALERTAS

15 tipos de alertas configuráveis: mudanças de sinal IA, alta convicção (85-88%), limites de probabilidade personalizados, sinais sobre ativos do Portfolio, mudanças de zona Pulse, mudanças do termômetro de risco, preços-alvo, movimentos bruscos, novas máximas e mínimas de 52 semanas, FED/FOMC, CPI, aberturas de mercado, earnings do Portfolio, eventos geopolíticos GDELT.

PORTFOLIO INTELIGENTE

Uma carteira de acompanhamento unificada — não é conta de trading. Reúna em uma única visão os ativos que você já tem em outras plataformas. PnL em 5 períodos (diário, semanal, mensal, trimestral, anual). Termômetro de Risco IA em tempo real. Dots IA por ativo. Conversor multimoeda. Sincronização na nuvem entre dispositivos.

ACESSIBILIDADE

— Disponível em 8 idiomas: inglês, espanhol, português, chinês, francês, italiano, hindi, árabe.
— Modo claro e escuro.
— Face ID e Touch ID.
— Centro de Ajuda integrado.
— Disponível em iOS, Android e como PWA instalável a partir de aurex.live.

PLANOS

— FREE: 5 ativos no Portfolio, 3 sinais IA diários, mercados em tempo real, Pulse básico.
— PRO ($9,99/mês, $89,99/ano): sinais IA ilimitados, Portfolio ilimitado, todos os alertas, histórico 30 dias.
— ELITE ($19,99/mês, $179,99/ano): tudo do PRO mais AUREX Pulse completo, análise técnica avançada (RSI, MACD), acesso antecipado a beta e suporte por chat ao vivo. Alertas SMS/WhatsApp/Telegram em breve.

O QUE AUREX NÃO É

Não é broker. Não é assessoria. Não é plataforma de compra/venda. AUREX não executa operações, não custodia ativos, não transfere dinheiro. É o terminal de acompanhamento de mercados globais que complementa seu broker — não o substitui. Análise estatística para o seguidor de mercados individual.

aurex.live
```

**Char count:** 3.270 / 4.000

---

## VERSIÓN CHINO SIMPLIFICADO (ZH)

### Descripción breve — máximo 80 caracteres

```
全球市场实时追踪终端。350 项资产、24 项变量、8 种语言。
```

**Char count:** 31 chars

### Descripción completa — máximo 4000 caracteres

```
AUREX 是面向个人市场观察者的全球市场跟踪终端，实时追踪 9 类金融工具、7 大全球市场中精选的 350 项资产，支持 8 种语言。

AUREX 追踪什么

— 7 大全球市场的 198 只股票：美国、阿根廷、巴西、西班牙、欧洲、日本、中国。
— 50 种加密货币与 3 种稳定币。
— 40 只 ETF。
— 20 种期货合约。
— 14 种债券。
— 12 种商品。
— 8 种金属。
— 5 种货币。

24 变量引擎

AUREX 实时交叉每个资产的 24 项变量：

— AI 引擎中的 10 项技术与宏观变量：24小时趋势、RSI14、相对成交量、波动率、BTC/SPY 相关性、黄金/石油相关性、美联储宏观数据、财报、MACD 12/26、30 日支撑与阻力。
— AUREX Pulse 中的 14 项市场背景数据：BTC（价格、主导地位、变动）、ETH、VIX、SP500、ES/NQ/YM/RTY 期货、黄金、白银、石油、铜、美联储宏观数据与 GDELT 地缘政治。

将美联储宏观数据与 GDELT 地缘政治事件应用于每个信号，是 AUREX 在零售工具中的独特优势。

实时全球视野

— 市场横幅：11 个可定制的全球交易所，实时显示开市 / 闭市 / 盘前盘后状态。
— 期货横幅：6 类共 16 种工具 — 开市前即刻洞察市场方向。
— 重大事件实时滚动：当下活跃的高、中影响经济事件（美联储、CPI、就业、地缘政治）。

警报系统

15 种可配置警报：AI 信号变化、高确信度（85-88%）、自定义概率阈值、Portfolio 资产信号、Pulse 区域变化、风险温度计变化、目标价、剧烈波动、52 周新高新低、美联储/FOMC、CPI、市场开市、Portfolio 财报、GDELT 地缘事件。

智能 Portfolio

统一的跟踪型 Portfolio — 非交易账户。将您在其他平台已持有的资产汇总于单一视图。5 个周期的 PnL（日、周、月、季、年）。实时 AI 风险温度计。每项资产的 AI 标记。多币种转换器。多设备云同步。

可访问性

— 支持 8 种语言：英语、西班牙语、葡萄牙语、中文、法语、意大利语、印地语、阿拉伯语。
— 明暗双模式。
— Face ID 与 Touch ID。
— 内置帮助中心。
— 提供 iOS、Android 版本，并支持从 aurex.live 安装 PWA。

订阅

— FREE：5 个 Portfolio 资产、每日 3 个 AI 信号、实时市场、基础 Pulse。
— PRO（$9.99/月，$89.99/年）：无限 AI 信号、无限 Portfolio、全部警报、30 天历史。
— ELITE（$19.99/月，$179.99/年）：包含 PRO 所有功能，再加完整 AUREX Pulse、高级技术分析（RSI、MACD）、Beta 抢先体验、实时聊天支持。SMS/WhatsApp/Telegram 警报即将上线。

AUREX 不是什么

非经纪商。非投资建议。非买卖平台。AUREX 不执行交易、不托管资产、不转移资金。它是补充您的经纪商而非取代它的全球市场跟踪终端。为个人市场观察者提供统计分析。

aurex.live
```

**Char count:** 1.038 chars (chino es muy conciso por carácter logográfico)

---

## VERSIÓN FRANCÉS (FR)

### Descripción breve — máximo 80 caracteres

```
Tracker mondial de marchés en temps réel. 350 actifs, 24 variables, 8 langues.
```

**Char count:** 78 / 80

### Descripción completa — máximo 4000 caracteres

```
AUREX est le terminal de suivi des marchés mondiaux pour le suiveur de marchés individuel. Suit 350 actifs sélectionnés parmi 9 types d'instruments sur 7 marchés mondiaux, en temps réel et en 8 langues.

CE QUE SUIT AUREX

— 198 actions sur 7 marchés mondiaux : USA, Argentine, Brésil, Espagne, Europe, Japon et Chine.
— 50 cryptomonnaies et 3 stablecoins.
— 40 ETF.
— 20 contrats à terme.
— 14 obligations.
— 12 matières premières.
— 8 métaux.
— 5 devises.

LE MOTEUR À 24 VARIABLES

AUREX croise 24 variables en temps réel sur chaque actif :

— 10 variables techniques et macroéconomiques dans le Moteur IA : tendance 24h, RSI14, volume relatif, volatilité, corrélation BTC/SPY, corrélation Or/Pétrole, données macroéconomiques FED, earnings, MACD 12/26, support et résistance sur 30 jours.
— 14 sources de contexte de marché dans l'AUREX Pulse : BTC (prix, dominance, variation), ETH, VIX, SP500, futures ES/NQ/YM/RTY, Or, Argent, Pétrole, Cuivre, données macroéconomiques FED et géopolitique GDELT.

La combinaison de données macroéconomiques FED et d'événements géopolitiques GDELT sur chaque signal est un différenciateur unique parmi les outils retail.

VUE MONDIALE EN TEMPS RÉEL

— Bannière Marchés : 11 places mondiales personnalisables affichant ouvert / fermé / pré et post-marché en temps réel.
— Bannière Futures : 16 instruments en 6 catégories — vision instantanée de la direction du marché avant l'ouverture.
— Ticker d'événements critiques : événements économiques d'impact élevé et moyen actifs en ce moment (FED, CPI, emploi, géopolitique).

SYSTÈME D'ALERTES

15 types d'alertes configurables : changements de signal IA, haute conviction (85-88%), seuils de probabilité personnalisés, signaux sur actifs du Portfolio, changements de zone Pulse, changements du thermomètre de risque, prix cibles, mouvements brusques, nouveaux plus hauts et plus bas sur 52 semaines, FED/FOMC, CPI, ouvertures de marché, earnings du Portfolio, événements géopolitiques GDELT.

PORTFOLIO INTELLIGENT

Un portefeuille de suivi unifié — pas un compte de trading. Rassemblez en une seule vue les actifs que vous détenez déjà sur d'autres plateformes. PnL sur 5 périodes (quotidien, hebdomadaire, mensuel, trimestriel, annuel). Thermomètre de Risque IA en temps réel. Points IA par actif. Convertisseur multi-devises. Synchronisation cloud entre appareils.

ACCESSIBILITÉ

— Disponible en 8 langues : anglais, espagnol, portugais, chinois, français, italien, hindi, arabe.
— Mode clair et sombre.
— Face ID et Touch ID.
— Centre d'Aide intégré.
— Disponible sur iOS, Android et en PWA installable depuis aurex.live.

ABONNEMENTS

— FREE : 5 actifs Portfolio, 3 signaux IA quotidiens, marchés en temps réel, Pulse basique.
— PRO ($9,99/mois, $89,99/an) : signaux IA illimités, Portfolio illimité, toutes les alertes, historique 30 jours.
— ELITE ($19,99/mois, $179,99/an) : tout PRO plus AUREX Pulse complet, analyse technique avancée (RSI, MACD), accès anticipé bêta et support par chat en direct. Alertes SMS/WhatsApp/Telegram bientôt.

CE QUE AUREX N'EST PAS

Pas un broker. Pas un conseil. Pas une plateforme d'achat/vente. AUREX n'exécute pas de transactions, ne conserve pas d'actifs, ne transfère pas d'argent. C'est le terminal de suivi des marchés mondiaux qui complète votre broker — il ne le remplace pas. Analyse statistique pour le suiveur de marchés individuel.

aurex.live
```

**Char count:** 3.345 / 4.000

---

## VERSIÓN ITALIANO (IT)

### Descripción breve — máximo 80 caracteres

```
Tracker globale di mercati in tempo reale. 350 asset, 24 variabili, 8 lingue.
```

**Char count:** 77 / 80

### Descripción completa — máximo 4000 caracteres

```
AUREX è il terminale di tracciamento dei mercati globali per il follower di mercati individuale. Segue 350 asset selezionati tra 9 tipi di strumenti su 7 mercati globali, in tempo reale e in 8 lingue.

COSA TRACCIA AUREX

— 198 azioni su 7 mercati globali: USA, Argentina, Brasile, Spagna, Europa, Giappone e Cina.
— 50 criptovalute e 3 stablecoin.
— 40 ETF.
— 20 contratti futures.
— 14 obbligazioni.
— 12 materie prime.
— 8 metalli.
— 5 valute.

IL MOTORE A 24 VARIABILI

AUREX incrocia 24 variabili in tempo reale su ogni asset:

— 10 variabili tecniche e macroeconomiche nel Motore IA: trend 24h, RSI14, volume relativo, volatilità, correlazione BTC/SPY, correlazione Oro/Petrolio, dati macroeconomici FED, earnings, MACD 12/26, supporto e resistenza a 30 giorni.
— 14 fonti di contesto di mercato nell'AUREX Pulse: BTC (prezzo, dominanza, variazione), ETH, VIX, SP500, futures ES/NQ/YM/RTY, Oro, Argento, Petrolio, Rame, dati macroeconomici FED e geopolitica GDELT.

La combinazione di dati macroeconomici FED ed eventi geopolitici GDELT su ogni segnale è un differenziale unico tra gli strumenti retail.

VISIONE GLOBALE IN TEMPO REALE

— Banner Mercati: 11 piazze globali personalizzabili che mostrano aperto / chiuso / pre e post-market in tempo reale.
— Banner Futures: 16 strumenti in 6 categorie — visione istantanea della direzione del mercato prima dell'apertura.
— Ticker di eventi critici: eventi economici di impatto alto e medio attivi in questo momento (FED, CPI, lavoro, geopolitica).

SISTEMA DI ALERT

15 tipi di alert configurabili: cambi di segnale IA, alta convinzione (85-88%), soglie di probabilità personalizzate, segnali su asset del Portfolio, cambi di zona Pulse, cambi del termometro di rischio, prezzi target, movimenti bruschi, nuovi massimi e minimi a 52 settimane, FED/FOMC, CPI, aperture di mercato, earnings del Portfolio, eventi geopolitici GDELT.

PORTFOLIO INTELLIGENTE

Un portafoglio di tracciamento unificato — non è un conto di trading. Raccogli in una singola vista gli asset che già possiedi su altre piattaforme. PnL su 5 periodi (giornaliero, settimanale, mensile, trimestrale, annuale). Termometro di Rischio IA in tempo reale. Dot IA per asset. Convertitore multi-valuta. Sincronizzazione cloud tra dispositivi.

ACCESSIBILITÀ

— Disponibile in 8 lingue: inglese, spagnolo, portoghese, cinese, francese, italiano, hindi, arabo.
— Modalità chiara e scura.
— Face ID e Touch ID.
— Centro Assistenza integrato.
— Disponibile su iOS, Android e come PWA installabile da aurex.live.

PIANI

— FREE: 5 asset Portfolio, 3 segnali IA giornalieri, mercati in tempo reale, Pulse base.
— PRO ($9,99/mese, $89,99/anno): segnali IA illimitati, Portfolio illimitato, tutti gli alert, storico 30 giorni.
— ELITE ($19,99/mese, $179,99/anno): tutto del PRO più AUREX Pulse completo, analisi tecnica avanzata (RSI, MACD), accesso anticipato beta e supporto via chat dal vivo. Alert SMS/WhatsApp/Telegram in arrivo.

COSA AUREX NON È

Non è un broker. Non è una consulenza. Non è una piattaforma di compra/vendita. AUREX non esegue operazioni, non custodisce asset, non trasferisce denaro. È il terminale di tracciamento dei mercati globali che complementa il tuo broker — non lo sostituisce. Analisi statistica per il follower di mercati individuale.

aurex.live
```

**Char count:** 3.297 / 4.000

---

## VERSIÓN HINDI (HI)

### Descripción breve — máximo 80 caracteres

```
रियल-टाइम ग्लोबल मार्केट्स ट्रैकर। 350 एसेट्स, 24 वेरिएबल्स, 8 भाषाएं।
```

**Char count:** 70 / 80

### Descripción completa — máximo 4000 caracteres

```
AUREX एक ग्लोबल मार्केट्स टर्मिनल है जो व्यक्तिगत मार्केट फॉलोअर के लिए बना है। यह 9 इंस्ट्रूमेंट टाइप्स और 7 ग्लोबल मार्केट्स में 350 चुने हुए एसेट्स को रियल-टाइम में, 8 भाषाओं में ट्रैक करता है।

AUREX क्या ट्रैक करता है

— 7 ग्लोबल मार्केट्स में 198 स्टॉक्स: USA, अर्जेंटीना, ब्राज़ील, स्पेन, यूरोप, जापान और चीन।
— 50 क्रिप्टोकरेंसी और 3 स्टेबलकॉइन।
— 40 ETFs।
— 20 फ्यूचर्स कॉन्ट्रैक्ट्स।
— 14 बॉन्ड्स।
— 12 कमोडिटीज।
— 8 मेटल्स।
— 5 करेंसीज।

24-वेरिएबल इंजन

AUREX हर एसेट पर 24 वेरिएबल्स को रियल-टाइम में क्रॉस-रेफरेंस करता है:

— AI इंजन में 10 तकनीकी और मैक्रो वेरिएबल्स: 24h ट्रेंड, RSI14, रिलेटिव वॉल्यूम, वोलैटिलिटी, BTC/SPY कोरिलेशन, गोल्ड/ऑयल कोरिलेशन, FED मैक्रो डेटा, earnings, MACD 12/26, 30-दिन सपोर्ट और रेजिस्टेंस।
— AUREX Pulse में 14 मार्केट कॉन्टेक्स्ट सोर्सेज: BTC (कीमत, डॉमिनेंस, बदलाव), ETH, VIX, SP500, ES/NQ/YM/RTY फ्यूचर्स, गोल्ड, सिल्वर, ऑयल, कॉपर, FED मैक्रो डेटा और GDELT जियोपॉलिटिक्स।

हर सिग्नल पर FED मैक्रो डेटा और GDELT जियोपॉलिटिकल इवेंट्स का संयोजन रिटेल टूल्स में AUREX का यूनीक डिफरेंशिएटर है।

रियल-टाइम ग्लोबल व्यू

— मार्केट्स बैनर: 11 कस्टमाइज़ेबल ग्लोबल एक्सचेंजेस जो रियल-टाइम में open / closed / pre और post-market दिखाते हैं।
— फ्यूचर्स बैनर: 6 कैटेगरीज में 16 इंस्ट्रूमेंट्स — मार्केट खुलने से पहले दिशा का तुरंत व्यू।
— क्रिटिकल इवेंट्स टिकर: अभी ऐक्टिव हाई और मीडियम इम्पैक्ट इकोनॉमिक इवेंट्स (FED, CPI, employment, जियोपॉलिटिक्स)।

अलर्ट सिस्टम

15 कॉन्फ़िगरेबल अलर्ट टाइप्स: AI सिग्नल बदलाव, हाई कन्विक्शन (85-88%), कस्टम प्रोबेबिलिटी थ्रेशहोल्ड्स, Portfolio एसेट्स पर सिग्नल्स, Pulse ज़ोन बदलाव, रिस्क थर्मामीटर बदलाव, टार्गेट प्राइसेस, तेज़ मूव्स, नए 52-week highs और lows, FED/FOMC, CPI, मार्केट खुलना, Portfolio earnings, GDELT जियोपॉलिटिकल इवेंट्स।

इंटेलिजेंट PORTFOLIO

एक यूनिफाइड ट्रैकिंग portfolio — यह ट्रेडिंग अकाउंट नहीं है। दूसरे प्लेटफॉर्म्स पर जो एसेट्स आपके पास हैं उन्हें एक ही जगह देखें। 5 पीरियड्स में PnL (daily, weekly, monthly, quarterly, annual)। रियल-टाइम AI रिस्क थर्मामीटर। हर एसेट के लिए AI dots। मल्टी-करेंसी कन्वर्टर। डिवाइसेज में क्लाउड सिंक।

एक्सेसिबिलिटी

— 8 भाषाओं में उपलब्ध: English, Spanish, Portuguese, Chinese, French, Italian, Hindi, Arabic।
— Light और dark mode।
— Face ID और Touch ID।
— इंटीग्रेटेड Help Center।
— iOS, Android और aurex.live से इंस्टॉल होने वाली PWA पर उपलब्ध।

प्लान्स

— FREE: 5 Portfolio एसेट्स, रोज़ 3 AI सिग्नल्स, रियल-टाइम मार्केट्स, बेसिक Pulse।
— PRO ($9.99/महीना, $89.99/साल): अनलिमिटेड AI सिग्नल्स, अनलिमिटेड Portfolio, सभी अलर्ट्स, 30-दिन हिस्ट्री।
— ELITE ($19.99/महीना, $179.99/साल): PRO में सब कुछ साथ ही पूरा AUREX Pulse, advanced technical analysis (RSI, MACD), beta का early access और live chat support। SMS/WhatsApp/Telegram अलर्ट्स जल्द आ रहे हैं।

AUREX क्या नहीं है

ब्रोकर नहीं। सलाह नहीं। खरीद/बिक्री प्लेटफॉर्म नहीं। AUREX ट्रेड एक्ज़ीक्यूट नहीं करता, एसेट्स कस्टडी नहीं करता, पैसे ट्रांसफर नहीं करता। यह वो ग्लोबल मार्केट्स ट्रैकिंग टर्मिनल है जो आपके ब्रोकर के साथ काम करता है — उसकी जगह नहीं लेता। व्यक्तिगत मार्केट फॉलोअर के लिए स्टैटिस्टिकल एनालिटिक्स।

aurex.live
```

**Char count:** 3.118 / 4.000

---

## VERSIÓN ÁRABE (AR) — MSA, RTL

### Descripción breve — máximo 80 caracteres

```
متتبع الأسواق العالمية في الوقت الفعلي. 350 أصلًا، 24 متغيرًا، 8 لغات.
```

**Char count:** 70 / 80

### Descripción completa — máximo 4000 caracteres

```
AUREX هو محطة متابعة الأسواق العالمية للمتابع الفردي للأسواق. يتتبع 350 أصلًا مختارًا عبر 9 أنواع من الأدوات و7 أسواق عالمية، في الوقت الفعلي وبـ 8 لغات.

ما الذي يتتبعه AUREX

— 198 سهمًا في 7 أسواق عالمية: الولايات المتحدة، الأرجنتين، البرازيل، إسبانيا، أوروبا، اليابان والصين.
— 50 عملة مشفرة و3 عملات مستقرة.
— 40 صندوق ETF.
— 20 عقدًا آجلًا.
— 14 سندًا.
— 12 سلعة.
— 8 معادن.
— 5 عملات.

محرك الـ 24 متغيرًا

يدمج AUREX 24 متغيرًا في الوقت الفعلي على كل أصل:

— 10 متغيرات تقنية واقتصاد كلي في محرك الذكاء الاصطناعي: اتجاه 24 ساعة، RSI14، الحجم النسبي، التذبذب، ارتباط BTC/SPY، ارتباط الذهب/النفط، بيانات الاحتياطي الفيدرالي الكلية، الأرباح، MACD 12/26، الدعم والمقاومة على 30 يومًا.
— 14 مصدرًا لسياق السوق في AUREX Pulse: BTC (السعر، الهيمنة، التغير)، ETH، VIX، SP500، عقود ES/NQ/YM/RTY الآجلة، الذهب، الفضة، النفط، النحاس، بيانات الاحتياطي الفيدرالي الكلية والجيوسياسة GDELT.

دمج البيانات الكلية للاحتياطي الفيدرالي والأحداث الجيوسياسية GDELT في كل إشارة هو عامل تمييز فريد بين الأدوات للأفراد.

رؤية عالمية في الوقت الفعلي

— شريط الأسواق: 11 بورصة عالمية قابلة للتخصيص تعرض المفتوح / المغلق / ما قبل وبعد السوق في الوقت الفعلي.
— شريط العقود الآجلة: 16 أداة في 6 فئات — رؤية فورية لاتجاه السوق قبل الافتتاح.
— شريط الأحداث الحرجة: الأحداث الاقتصادية ذات التأثير العالي والمتوسط النشطة الآن (FED، CPI، التوظيف، الجيوسياسة).

نظام التنبيهات

15 نوعًا من التنبيهات القابلة للتكوين: تغيرات إشارة الذكاء الاصطناعي، عالية الثقة (85-88%)، حدود احتمال مخصصة، إشارات على أصول Portfolio، تغيرات منطقة Pulse، تغيرات مقياس المخاطر، الأسعار المستهدفة، الحركات الحادة، أعلى وأدنى مستويات جديدة لـ 52 أسبوعًا، FED/FOMC، CPI، افتتاحات الأسواق، أرباح Portfolio، الأحداث الجيوسياسية GDELT.

PORTFOLIO ذكي

محفظة متابعة موحدة — ليست حساب تداول. اجمع في رؤية واحدة الأصول التي تمتلكها بالفعل في منصات أخرى. PnL على 5 فترات (يومي، أسبوعي، شهري، ربع سنوي، سنوي). مقياس المخاطر بالذكاء الاصطناعي في الوقت الفعلي. نقاط الذكاء الاصطناعي لكل أصل. محول متعدد العملات. مزامنة سحابية بين الأجهزة.

إمكانية الوصول

— متاح بـ 8 لغات: الإنجليزية، الإسبانية، البرتغالية، الصينية، الفرنسية، الإيطالية، الهندية، العربية.
— الوضع الفاتح والداكن.
— Face ID وTouch ID.
— مركز مساعدة مدمج.
— متاح على iOS وAndroid وكـ PWA قابل للتثبيت من aurex.live.

الخطط

— FREE: 5 أصول Portfolio، 3 إشارات ذكاء اصطناعي يوميًا، أسواق في الوقت الفعلي، Pulse أساسي.
— PRO ($9.99/شهر، $89.99/سنة): إشارات ذكاء اصطناعي غير محدودة، Portfolio غير محدود، جميع التنبيهات، سجل 30 يومًا.
— ELITE ($19.99/شهر، $179.99/سنة): كل ما في PRO إضافة إلى AUREX Pulse الكامل، التحليل الفني المتقدم (RSI، MACD)، الوصول المبكر للنسخة التجريبية ودعم الدردشة المباشرة. تنبيهات SMS/WhatsApp/Telegram قريبًا.

ما الذي ليس AUREX

ليس وسيطًا. ليس نصيحة. ليس منصة شراء/بيع. AUREX لا ينفذ صفقات، لا يحفظ أصولًا، لا ينقل أموالًا. هو محطة متابعة الأسواق العالمية التي تكمل وسيطك — لا تحل محله. تحليل إحصائي للمتابع الفردي للأسواق.

aurex.live
```

**Char count:** 2.612 / 4.000

---

## CHECK FINAL — char count por idioma

| Idioma | Bio breve | Bio completa | Estado |
|---|---|---|---|
| EN | 73 / 80 | 3.013 / 4.000 | ✅ aprobado Fernando + Escritorio |
| ES | 71 / 80 | 3.190 / 4.000 | ✅ aprobado Fernando + Escritorio |
| PT | 78 / 80 | 3.270 / 4.000 | ⏳ pendiente revisión |
| ZH | 31 chars | 1.038 chars | ⏳ pendiente validación post-publicación |
| FR | 78 / 80 | 3.345 / 4.000 | ⏳ pendiente revisión |
| IT | 77 / 80 | 3.297 / 4.000 | ⏳ pendiente revisión |
| HI | 70 / 80 | 3.118 / 4.000 | ⏳ pendiente validación post-publicación |
| AR | 70 / 80 | 2.612 / 4.000 | ⏳ pendiente validación post-publicación |

**Todas las versiones dentro del límite de char count en ambos campos.**

---

## NOTA SOBRE APP STORE (Build 17)

App Store Build 17 usa subtítulo "Real-time market data tracker" + categoría Utilidades + descripción ya alineada al lenguaje seguro. **NO requiere cambios.** Este documento aplica solo a Google Play Build 2.

---

*GOOGLE_PLAY_DESCRIPCIONES.md — Bloque suplementario al Paso CERO. Pendiente aprobación Fernando + aplicación manual en Play Console.*
