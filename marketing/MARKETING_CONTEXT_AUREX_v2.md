# Marketing Context — AUREX

*Última actualización: 13 de mayo de 2026 — v2 (tarde AR)*
*Generado por: marketing-skills:marketing-context · Mode 1 (Auto-Draft) · revisado por Code (Claude Code)*
*Base que TODAS las demás marketing-skills (41) deben leer antes de generar cualquier asset.*

**Cambios v1 → v2:**
- X / Twitter DESBLOQUEADA (caso XAGEA-751927 resuelto el mismo 13-may en 1 día, no 3-7 estimados)
- 5 redes operativas → **6 redes operativas** (X incluida)
- Constraint "X bloqueada" removido del marketing context
- Warm-up X recomendado: primeros 3-7 días máximo 2-3 posts/día sin links externos antes de escalar

---

## 1. Product Overview

**One-liner (EN):** The global markets terminal that cross-references technical, macro, geopolitical and sentiment data in real time over 350+ selected assets in 8 languages.

**One-liner (ES):** El terminal de mercados globales que cruza datos técnicos, macroeconómicos, geopolíticos y de sentimiento en tiempo real sobre 350+ activos seleccionados en 8 idiomas.

**Qué hace (2-3 oraciones):** AUREX consolida en una sola vista 350+ activos de 7 mercados globales y 9 tipos de instrumentos, alimentados por un motor de 24 variables que cruza 10 indicadores técnico-macro con 14 fuentes de contexto de mercado (incluyendo FED macro data y GDELT geopolítico). Genera alertas configurables, seguimiento de portafolio y watchlist con 5 períodos. No ejecuta operaciones ni custodia activos — complementa al bróker, no lo reemplaza.

**Categoría de producto (la "góndola"):** Terminal de seguimiento de mercados globales (Market Intelligence Terminal). Categoría de referencia mental: Bloomberg Terminal, pero retail.

**Tipo de producto:** SaaS multiplataforma (iOS + Android + Web PWA).

**Modelo de negocio:** Freemium suscripción.
- FREE: features básicos
- PRO: features completos (precio pendiente de confirmar)
- ELITE: features premium institucionales (en "Próxima versión")

---

## 2. Target Audience

**Tipo de usuario objetivo:** Individuos (B2C retail). No B2B institucional por ahora.

**Decisores:** Cada usuario es decisor de su propia suscripción. No hay comité de compra. La decisión se toma en minutos sobre el dispositivo móvil o desktop.

**Caso de uso primario:** Inversor que opera en múltiples brokers y/o múltiples clases de activos necesita una vista cruzada UNIFICADA con contexto macro y geopolítico en tiempo real para tomar decisiones más informadas — sin tener que abrir 5 apps o tener un Bloomberg Terminal de USD 24.000/año.

**Jobs to be done:**
1. **Saber qué está pasando en TODOS mis activos a la vez** sin saltar entre 5 apps de brokers y feeds de Twitter.
2. **Entender el contexto detrás del movimiento de un precio** (no solo el chart, también macro FED + geopolítica GDELT + sentimiento).
3. **No perderme eventos críticos** (FED, CPI, earnings, geopolítica) que mueven mi cartera.

**Use cases / escenarios concretos:**
- Trader cripto que también sigue acciones US y commodities → necesita ver BTC + SP500 + oro + VIX juntos.
- Inversor LATAM con cartera mixta AR/US → necesita ver Cocos Capital + IBKR holdings en una sola vista.
- Asesor financiero independiente → necesita screenshots y reportes rápidos para sus clientes.
- Family officer que monitorea varias clases de activos para una familia patrimonial.

---

## 3. Personas

| Persona | Rol | Le importa | Su desafío | Valor que le prometemos |
|---|---|---|---|---|
| **"Diego, Trader Multi-Activo"** (35-45, AR/LATAM) | User | Ver TODO en un lugar, sin saltar apps. Velocidad de información. | Tiene 4 brokers + Tradingview + Twitter abiertos al mismo tiempo. Pierde tiempo cruzando datos. | Una vista única con 350+ activos, contexto macro+geopolítico y alertas. Recupera 1-2 horas/día. |
| **"María, Inversora Cripto+Stocks"** (28-40, global) | User | Entender por qué se movió un precio, no solo verlo. | Lee charts pero no sabe leer el contexto FED ni geopolítica. | AUREX Pulse traduce contexto macro+GDELT a una métrica clara por activo. |
| **"Roberto, Asesor Independiente"** (40-55, AR/MX/ES) | Champion + Decision Maker | Demostrar valor a sus clientes con datos rápidos. | Cada cliente le pregunta "¿cómo va mi cartera?" y le toma 30 min armar la respuesta. | Pantallazos limpios, multi-idioma, y posicionamiento profesional ante sus clientes. |
| **"Lucas, Crypto Native"** (25-35, global) | User | Señales rápidas, no quiere leer reportes largos. | Está saturado de info de baja calidad en Twitter/Telegram. | Señales destiladas con contexto y disclaimer claro: "Not advice, just data." |

📝 PENDIENTE de validar con primeros usuarios reales (post-lanzamiento). Personas actuales = hipótesis basadas en research de competidores y ICP target.

---

## 4. Problems & Pain Points

**Problema central:** El inversor retail moderno necesita TRES tipos de información cruzada en tiempo real (técnica + macro + geopolítica) y NO TIENE UNA HERRAMIENTA que se las dé junta. Tiene que pegotear datos de Tradingview + Twitter + Bloomberg.com (gratis) + apps de brokers + news feeds. Es ineficiente, lento y propenso a perderse contexto.

**Por qué las alternativas fallan:**
- **Tradingview:** Muy bueno para charts técnicos. CERO contexto macro/geopolítico nativo.
- **Cocos Capital / Bull Market / IOL:** Cubren execution + custodia, pero la "vista de mercado" es marginal y solo del mercado local.
- **Bloomberg Terminal:** Cubre todo pero cuesta USD 24.000/año. Inaccesible para retail.
- **Twitter/Telegram:** Mucho ruido, sin curaduría, sin contexto cruzado, sin disclaimer regulatorio claro.
- **Aplicaciones especializadas por clase (CoinMarketCap solo crypto, Investing.com solo stocks):** Fragmentan en lugar de unificar.

**Lo que les cuesta:** 1-2 horas diarias de tiempo improductivo cruzando datos. Decisiones tomadas con información parcial. Pérdida de oportunidades por no ver señales cruzadas.

**Tensión emocional:** Ansiedad por "qué me estoy perdiendo", FOMO en mercados volátiles, frustración con apps fragmentadas, sensación de estar siempre un paso atrás de la información institucional.

---

## 5. Competitive Landscape

| Competidor | Tipo | Cómo se quedan cortos |
|---|---|---|
| **Tradingview** | Directo (global) | Excelente para charts. Sin cruce macro FED + geopolítica GDELT nativo. No es multi-idioma profundo. Foco profesional/trader, no inversor retail multi-activo. |
| **Cocos Capital (AR)** | Directo (LATAM) | Solo broker AR. No cubre stocks US/EU/JP/CN. Sin cruce geopolítico. Sin idiomas. |
| **Bull Market Brokers (AR)** | Directo (LATAM) | Mismo gap que Cocos: broker AR-céntrico, vista de mercado limitada. |
| **Investing.com app** | Directo (global) | Cobertura amplia pero genérica. Sin AI Engine ni Pulse. UI saturada y publicidad. |
| **Bloomberg Terminal** | Secundario (institucional) | USD 24.000/año. Inaccesible para retail. AUREX es el "Bloomberg retail". |
| **Refinitiv / FactSet** | Secundario (institucional) | Mismo gap que Bloomberg. |
| **Yahoo Finance / Google Finance** | Indirecto (gratis) | Datos sueltos sin contexto cruzado. Sin alertas configurables. Sin AI Engine. |
| **CoinMarketCap / CoinGecko** | Indirecto (crypto-only) | Solo crypto. Fragmenta la cartera real (que es mixta). |
| **Twitter / Telegram groups** | Indirecto (community) | Mucho ruido. Sin curaduría. Sin disclaimer. Sin métricas estandarizadas. |
| **Apps de bróker (IBKR, etc.)** | Indirecto | Cobertura amplia pero foco execution, no contexto. |

---

## 6. Differentiation

**Diferenciadores clave:**
1. **Combinación FED macro + GDELT geopolítica cruzada por activo** — ningún competidor retail hace esto.
2. **24 variables consolidadas** (10 técnicas/macro + 14 contexto) en una sola métrica por activo.
3. **350+ activos × 9 tipos de instrumentos × 7 mercados** en una sola vista.
4. **8 idiomas nativos** (EN, ES, PT, ZH, FR, IT, HI, AR) — Tradingview y competidores no llegan a esta profundidad.
5. **Disclaimer regulatorio claro y permanente** ("Not a broker. Not advice.") — diferenciador de credibilidad vs Twitter/Telegram.
6. **AUREX Pulse**: gauge único que destila 14 fuentes de contexto de mercado en una métrica visual.
7. **Cross-platform real** (iOS + Android + Web PWA) — no es una app convertida sino multi-plataforma desde cero.

**Cómo lo hacemos diferente:** En lugar de exponer datos crudos como Bloomberg (overload) o curar manualmente como Twitter (slow), AUREX automatiza el cruce de 24 variables y devuelve una vista unificada por activo. Es "Bloomberg automatizado para retail".

**Por qué eso es mejor (beneficios, no features):**
- Decisiones más rápidas y con más contexto.
- Cero tiempo perdido pegoteando datos.
- Disclaimer regulatorio protege al usuario (no es una "señal compra/venta" sino "datos para que vos decidas").
- Multi-idioma elimina barrera para mercados LATAM, EU, Asia y MENA.

**Por qué los usuarios eligen AUREX vs las alternativas:**
- Vs Tradingview: por el contexto macro+geopolítico nativo.
- Vs Cocos/Bull: por cobertura global multi-mercado.
- Vs Bloomberg: por precio retail accesible.
- Vs Twitter: por curaduría automatizada con disclaimer claro.

---

## 7. Objections & Anti-Personas

| Objeción | Respuesta |
|---|---|
| "¿Es una app de señales de compra/venta?" | NO. AUREX es un terminal de SEGUIMIENTO. No te dice qué comprar. Te da los datos cruzados para que vos decidas. Disclaimer: "Not a broker. Not advice." |
| "¿Reemplaza a mi bróker?" | NO. AUREX no ejecuta operaciones ni custodia activos. Complementa a tu bróker mostrándote contexto que tu bróker no te da. |
| "¿Qué tiene de distinto a Tradingview?" | Tradingview es excelente para charts técnicos. AUREX agrega 14 fuentes de contexto macro+geopolítico que Tradingview no tiene (FED, GDELT, VIX cruzado). Y suma 8 idiomas nativos. |
| "¿Por qué pagaría si Yahoo Finance es gratis?" | Yahoo te da datos sueltos sin cruce. AUREX te da los 24 variables consolidados por activo + alertas configurables + cobertura global multi-asset. |
| "¿Es regulado / legal?" | AUREX no requiere licencia financiera porque no opera, no custodia, no asesora. Es un terminal de datos. Disclaimer regulatorio claro en cada pantalla. |
| "¿Funciona offline?" | Es real-time, por definición online. La PWA aurex.live funciona en cualquier dispositivo con browser. |

**Anti-persona (NO es para):**
- Daytrader puro de scalping intra-minuto (necesita feeds institucionales premium, no contexto macro).
- Especulador crypto-only que solo quiere "shitcoin moonshots" (AUREX es anti-hype crypto-bro).
- Usuario que quiere "señales de compra/venta automáticas" — AUREX no las da por principio regulatorio.
- Trader institucional con presupuesto Bloomberg (target distinto).
- Usuario que solo opera un único bróker AR y no le interesa global (mejor que use el bróker directo).

---

## 8. Switching Dynamics (JTBD Four Forces)

**Push (frustración con su situación actual):**
- "Tengo 5 pestañas abiertas y todavía me pierdo info."
- "Mi bróker me muestra mi cartera pero no el contexto."
- "Tradingview no me dice qué dijo la FED."
- "Twitter es ruido sin disclaimer."

**Pull (qué atrae a AUREX):**
- Vista unificada multi-activo.
- AUREX Pulse como métrica visual rápida.
- Multi-idioma para mercados no-EN.
- Disclaimer regulatorio profesional.

**Habit (qué los mantiene en lo viejo):**
- Inercia de los 5 tabs abiertos.
- Suscripción Tradingview ya pagada.
- Familiaridad con su bróker actual.

**Anxiety (preocupaciones al cambiar):**
- "¿Y si los datos no son tan buenos como Bloomberg?"
- "¿Va a estar actualizado en tiempo real?"
- "¿Es seguro? ¿Le doy acceso a mis activos?"
- Respuesta clave: NO se da acceso ni custodia. AUREX es solo terminal de datos, no toca cuentas.

---

## 9. Customer Language

📝 PENDIENTE — sin verbatim de usuarios reales todavía (producto en lanzamiento). Recoger en primeras 4 semanas post-launch via:
- Telegram canal feedback
- Email respuestas a newsletter
- Reviews Google Play (10 instalaciones, 47.6% retención al 12-may)
- Comments redes sociales una vez publiquemos

**Hipótesis inicial de language a usar (validar luego):**
- "Vista cruzada", "terminal", "contexto macro", "mercados globales", "Pulse", "AI Engine", "watchlist".

**Words to use:**
- "Terminal", "datos", "señales de mercado", "Pulse", "AI Engine", "watchlist", "alertas configurables", "multi-mercado", "multi-idioma", "global", "tiempo real", "cruce", "contexto", "macro", "geopolítica", "FED", "GDELT", "complementa", "información".

**Words to AVOID:**
- "Señales de compra", "señales de venta", "trading", "operar", "ejecutá", "comprá", "vendé", "ganancia garantizada", "moonshot", "shitcoin", "alpha", "rugpull", "diamond hands", "to the moon", "asesoramiento", "consejo financiero", "recomendación de inversión".
- Toda jerga crypto-bro que erosiona credibilidad institucional.

**Glosario producto:**

| Término | Significado |
|---|---|
| **AUREX Pulse** | Gauge que destila 14 fuentes de contexto de mercado en una métrica visual por activo. |
| **AI Engine** | Motor que combina 10 variables técnicas y macro para análisis por activo. |
| **Termómetro** | Indicador de temperatura del mercado para un activo o grupo. |
| **Watchlist** | Lista personalizada de activos con seguimiento en hasta 5 períodos temporales. |
| **Portfolio** | Cartera de seguimiento (NO custodia) de activos del usuario. |
| **Ticker de eventos** | Banda de eventos críticos en vivo (FED, CPI, earnings, geopolítica). |
| **Alta Convicción IA** | Indicador interno de alta certeza del AI Engine sobre un activo. |
| **GDELT** | Fuente de datos geopolíticos global usada por AUREX Pulse. |

---

## 10. Brand Voice

**Tono:** Sobrio, profesional, data-driven. Inteligente sin ser pretencioso. Anti-hype.

**Estilo de comunicación:** Directo, técnico cuando hace falta, conversacional cuando educa. Idioma maestro EN (Wall Street neutro), idiomas secundarios en español NEUTRO (no rioplatense, no madrileño).

**Personalidad de marca (5 adjetivos):**
1. **Profesional** (institucional sin ser elitista)
2. **Inteligente** (data-driven, no opinión)
3. **Global** (no AR-céntrico ni US-céntrico)
4. **Transparente** (disclaimer claro siempre)
5. **Sobrio** (premium, no flashy, no crypto-bro)

**Voice DO's:**
- Mostrar datos concretos (números, métricas, cobertura).
- Comparar contra alternativas con respeto ("Tradingview es excelente para X, AUREX suma Y").
- Citar fuentes (FED, GDELT, Yahoo Finance, CoinGecko, Binance.US).
- Recordar el disclaimer regulatorio cuando corresponda.
- Usar español neutro internacional para LATAM.
- Usar inglés Wall Street neutro para mercados globales.
- Pieces narrativas explicar el "por qué" del movimiento, no solo "qué pasó".

**Voice DON'T's:**
- Jerga crypto-bro ("moon", "alpha", "diamond hands", "shitcoin").
- Promesas de retorno o ganancia.
- Lenguaje de "señales compra/venta".
- Rioplatense ("Segui", "Comparti", "vos") en localizaciones globales.
- Mayúsculas innecesarias o emojis efusivos.
- Tonos catastrofistas ni eufóricos.
- Comparaciones agresivas con competidores (no "Bloomberg es caro y obsoleto", sí "Bloomberg cuesta USD 24k; AUREX trae lo esencial en formato retail").

---

## 11. Style Guide

**Gramática y mecánica:**
- Español NEUTRO internacional (no rioplatense). Usar "tú" cuando aplique, evitar "vos".
- Tildes correctos siempre. NO omitir tildes en metadata de stores (este es un bug histórico documentado a corregir en Apple post-Build 17).
- Conjugaciones neutras: "Sigue todos tus activos" (NO "Segui"), "Comparte listas" (NO "Comparti").

**Capitalización:**
- **AUREX** siempre en mayúsculas como nombre de marca.
- **AUREX Pulse**, **AI Engine** con capitalización tipo proper noun.
- Tipos de instrumentos en minúscula: stocks, crypto, ETFs, futuros, bonos, commodities, metales, currencies.
- Acrónimos en mayúsculas: FED, CPI, GDELT, VIX, ETF.

**Formato:**
- Listas con bullet `·` o `-` en redes, con guion largo `—` en docs largos.
- Números: separador de miles con coma en EN ("350,000"), con punto en ES ("350.000").
- Precios: USD con símbolo "$" delante en EN, "USD" detrás en ES.

**Términos preferidos:**

| ✅ Usar | ❌ Evitar |
|---|---|
| Terminal de mercados globales | App de trading |
| Datos cruzados | Señales |
| Seguimiento de portafolio | Trading platform |
| Alertas configurables | Alertas automáticas (suena a bot) |
| Complementa a tu bróker | Reemplaza a tu bróker |
| Multi-idioma | International |
| Multi-mercado | Cross-market |
| Real-time / tiempo real | Live (en ES) |

---

## 12. Proof Points

📝 PENDIENTE de generar — producto en pre-launch. Acumular en los primeros 90 días:

**Métricas actuales (al 12-may-2026):**
- 10 instalaciones Google Play en las primeras 34 horas
- 47.6% retención día 1
- Build 17 iOS en review desde el 24-abr (día 19 al 13-may)
- 6 redes sociales abiertas, contenido cero todavía (X desbloqueada 13-may PM AR)
- Backend Railway con cobertura 100% (53/53 crypto + 297/297 stocks) tras sprint cripto/stocks del 11-12 may

**Customers / logos notables:**
- 📝 PENDIENTE — todavía no hay usuarios identificados públicamente.

**Testimonials:**
- 📝 PENDIENTE — recoger en primeras 4 semanas post-launch.

**Value themes con evidencia:**

| Tema de valor | Proof point |
|---|---|
| **Cobertura completa** | 350+ activos × 9 tipos × 7 mercados, verificado en backend Railway (cobertura 100%). |
| **Real-time** | Refresh crypto cada 2 min via cron, stocks cache 5 min via Yahoo Finance singular. |
| **24 variables únicas** | Documentado en AUREX_FEATURES_PARA_MKT.md (cita AI Engine + Pulse). |
| **8 idiomas nativos** | Validado en Google Play (7 idiomas no-EN con contenido cargado y verificado por Escritorio). |
| **Multi-plataforma** | iOS TestFlight + Android producción (10 instalaciones) + Web PWA aurex.live operativa. |

---

## 13. Content & SEO Context

**Target keywords (clusters):**

| Cluster | Primary Keyword | Secondary Keywords | Intent |
|---|---|---|---|
| Terminal mercados globales | global markets terminal | bloomberg alternative retail, market data terminal app | Commercial |
| Multi-asset tracking | multi asset portfolio tracker | crypto stocks tracker, multi market dashboard | Commercial |
| Macro + geopolítica | macro geopolitical market analysis | FED GDELT market data, geopolitical risk dashboard | Informational |
| Mercados LATAM | terminal mercados latinoamérica | broker complement app LATAM, dashboard inversiones argentina | Commercial |
| Comparativas | aurex vs cocos capital | aurex vs tradingview, aurex vs bloomberg retail | Commercial (decision-stage) |
| Cripto + stocks | crypto stocks unified tracker | mixed portfolio dashboard, bitcoin stocks tracker | Commercial |
| AI markets | AI market intelligence app | AI engine markets retail, market sentiment AI | Informational + Commercial |

**Internal links map:**

| Page | URL | Use for | Anchor sugerido |
|---|---|---|---|
| Landing principal | aurex.live/marketing (PENDIENTE construir) | Hero + value prop | "Open AUREX terminal" |
| PWA app | aurex.live | Producto en vivo | "Try AUREX free" |
| Comparativa vs Cocos | aurex.live/vs-cocos (PENDIENTE) | Decision stage AR | "AUREX vs Cocos Capital" |
| Comparativa vs Tradingview | aurex.live/vs-tradingview (PENDIENTE) | Decision stage global | "AUREX vs Tradingview" |
| Apple Store | apps.apple.com/app/aurex-ai | iOS download | "Download for iPhone" |
| Google Play | play.google.com/store/apps/details?id=com.aurexapp | Android download | "Get it on Google Play" |
| Telegram canal | t.me/aurex_ai | Comunidad | "Join AUREX on Telegram" |
| LinkedIn | linkedin.com/company/aurex-fintech | B2B credibilidad | "Follow AUREX on LinkedIn" |

**Writing examples (referencias internas a estudiar):**
- `docs/AUREX_FEATURES_PARA_MKT.md` — fuente de verdad de features.
- `docs/BIOS_PUBLICAS_AUREX.md` v2 (commit 5fac759) — bios aprobadas por Fernando + Escritorio.
- `docs/BIOS_TRADUCIDAS_6_IDIOMAS.md` (commit 8d75cad) — traducciones validadas PT/FR/IT.
- `PLAN MKT v3.docx` en Dropbox — plan maestro de marketing.
- Descripciones cargadas en Google Play 7 idiomas no-EN (verificadas por Escritorio).
- `LINKEDIN_descripcion.txt` en redes_assets_aurex_12may (1091 chars EN).
- `YOUTUBE_descripciones_8_idiomas.txt` (8 idiomas, cada uno <1200 chars).

**Preferencias de tono y longitud:**
- Posts X: 240-280 chars o threads cortos (4-6 tweets max).
- Posts LinkedIn: 1.300-1.500 chars, párrafos cortos.
- Posts IG: caption 100-150 chars + carrousel visual.
- Stories IG: máximo 7-10 segundos lectura.
- Telegram daily: 200-300 chars + datos clave.
- Blog: 1.500-2.500 palabras con SEO + AI search optimization.
- Email newsletter: 400-600 palabras, asunto < 50 chars.

---

## 14. Goals

**Objetivo de negocio principal:**
- 30 días: 500 instalaciones cross-platform + 1.000 followers totales en las 6 redes.
- 90 días: launch completo Fase 1 → Fase 4 según Plan MKT v3 (Telegram + IG + LinkedIn + YouTube + TikTok + X + email + blog + PR).
- 180 días: 5.000 MAU + 10% conversión FREE → PRO.

**Conversion action principal:**
- Primario: Descarga de la app (Apple o Google Play).
- Secundario: Open PWA aurex.live (para usuarios sin permiso de stores o que prefieren web).
- Terciario: Join canal Telegram para nurturing.

**Métricas actuales:**
- 10 instalaciones Android producción (12-may).
- 47.6% retención día 1.
- 0 followers redes (cuentas abiertas pero vacías).
- 0 contenido publicado todavía.
- Web marketing: NO existe.

---

## Constraints operativos (críticos para todas las skills)

1. **Fernando NO ejecuta tareas manuales de contenido.** Code + Escritorio generan TODO. Fernando solo aprueba.
2. **Cero costo recurrente preferido** — automatización con APIs nativas + n8n self-hosted Railway antes que herramientas pagas (Buffer, Hootsuite, Ayrshare).
3. **Apple Build 17 en review** → NO tocar metadata App Store hasta resolución. Toda métrica iOS queda en pausa.
4. **Restricción operativa absoluta:** Cero acciones en plataformas externas sin OK explícito de Fernando.
5. **Versionar archivos siempre** (_v2, _v3, etc., nunca sobreescribir).
6. **Validar contra producto REAL, no contra documentación vieja** — `METADATA-APPSTORE.md` viejo tenía datos desactualizados que llevaron a errores en la auditoría inicial.
7. **Multi-idioma profundo desde día 1** — toda pieza maestra EN debe tener su traducción a ES + opcionalmente PT/ZH/FR/IT/HI/AR según el canal.

---

## Próximas marketing-skills a invocar (orden recomendado)

1. **`marketing-strategy-pmm`** → positioning statement + battlecard final + ICP refinado.
2. **`social-media-manager`** → estrategia + calendario multi-canal Fase 1.
3. **`content-strategy`** → topic clusters + content plan 90 días.
4. **`copywriting`** → copy de landing aurex.live/marketing.
5. **`frontend-design`** → diseño visual de landing aurex.live/marketing.
6. **`page-cro`** → optimización de conversión de landing.
7. **`social-content`** → primeros 30 posts por canal (Telegram + IG + LinkedIn + YouTube + TikTok).
8. **`x-twitter-growth`** → estrategia X específica (cuenta desbloqueada 13-may PM AR — caso XAGEA-751927 cerrado). Aplicar warm-up: primeros 3-7 días máximo 2-3 posts/día sin links externos antes de escalar.
9. **`launch-strategy`** → plan de lanzamiento Fase 1 (semana 1 post-Apple approval).
10. **`competitor-alternatives`** → páginas AUREX vs Cocos / vs Tradingview / vs Bloomberg.

---

*Fin del documento. Toda marketing-skill que se invoque después debe leer este archivo como base obligatoria antes de generar cualquier asset.*

*Versionado: este archivo es v1.0. Próximos updates como v2, v3, etc. Nunca sobreescribir.*
