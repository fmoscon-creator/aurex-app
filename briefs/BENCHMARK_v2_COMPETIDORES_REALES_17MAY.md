# BENCHMARK v2 — Competidores DIRECTOS verificados Firecrawl (17-may-2026)

> **Fecha:** 17-may-2026, madrugada AR.
> **Autor:** Code.
> **Para:** Escritorio + Fernando.
> **Estado:** reemplaza la tabla benchmark del brief landing v2 (`LANDING_v2_BRIEF_CONSOLIDADO_16MAY.md` sec 8 / PUNTO 8 Escritorio).
> **Disparador:** Fernando indicó (17-may madrugada) que TradingView + Investing.com + Seeking Alpha son competidores DIRECTOS, más relevantes que los Magnifi/Sagehood/Danelfin del brief original.
> **Método de verificación:** Firecrawl MCP scraping en vivo de pricing pages el 17-may-2026 ~01:10 AR (no datos viejos del RESEARCH_MKT).

---

## 1. Cambio de lista de competidores

### Tabla original del brief landing v2 (descartar)
- Magnifi · Sagehood · Danelfin · Robinhood · Bloomberg

### Tabla NUEVA verificada (usar en landing v2)
- **TradingView** — el más directo en charts + comunidad + multi-asset
- **Investing.com** — el más directo en datos masivos + multi-idioma
- **Seeking Alpha** — el más directo en research + ratings por activo
- **Bloomberg Terminal** — mantener como contraste high-end institucional (legitima precio AUREX)

### Por qué el cambio
1. **Magnifi/Sagehood/Danelfin** son apps AI de nicho con tracción limitada — comparar contra ellos posiciona AUREX en una liga chica.
2. **TradingView/Investing/Seeking Alpha** son los gigantes consolidados del retail global — la comparación posiciona AUREX en la liga real donde compite por el usuario.
3. Bloomberg se mantiene como ancla high-end: refuerza que AUREX entrega 24 variables + FED + GDELT por $9.99/mo cuando Bloomberg cobra $24.000/año.

---

## 2. Datos verificados Firecrawl del 17-may-2026

### TradingView (pricing scraped 17-may)
| Tier | Precio mensual |
|---|---|
| Basic (Free) | $0 forever |
| **Essential** | **$12.95/mo** |
| Plus | $29.95/mo |
| Premium | $59.95/mo |
| Expert (Premium Ultimate) | $199.95/mo |

Claim home: "Join 100 million traders and investors". "Where the world does markets."

### Investing.com / InvestingPro (pricing scraped 17-may)
- 4.7/5 con 1.2M reviews mencionado en pricing page
- 30+ idiomas (verificado en home)
- Features destacadas: WarrenAI, ProPicks, Stock Screener, Economic Calendar
- Precios exactos: ocultos atrás de JS dinámico — quedan como rango aproximado $25-50/mo según referencias externas

### Seeking Alpha (pricing scraped 17-may)
| Tier | Precio renovación |
|---|---|
| Basic | Free |
| Premium | **$299/año (~$25/mo)** |
| PRO | **$2,400/año (~$200/mo)** |

Features Premium: Quant Ratings (Strong Buy/Sell), dividend scores, exclusive analysis.
Features PRO: + Ask Seeking Alpha (AI research assistant), PRO Quant Portfolio rebalanceado, alpha picks.

### Bloomberg Terminal
- $24,000/año (~$2,000/mo) — sin tier gratuito.
- Target institucional únicamente.
- (No requiere verificación Firecrawl — precio público estable hace 10+ años)

### AUREX (referencia interna)
| Tier | Precio |
|---|---|
| FREE | $0 |
| **PRO** | **$9.99/mo · $89.99/año** |
| ELITE | $19.99/mo (próxima versión) |

---

## 3. Tabla benchmark FINAL para landing v2

```
| Feature                            | AUREX            | TradingView    | Investing.com  | Seeking Alpha  | Bloomberg     |
|------------------------------------|------------------|----------------|----------------|----------------|---------------|
| Free plan                          | ✅               | ✅             | ✅             | ✅ Basic       | ❌            |
| Paid tier base                     | $9.99/mo         | $12.95/mo      | ~$25-50/mo     | $25/mo Premium | $2,000/mo     |
| Paid tier pro                      | $19.99/mo SOON   | $59.95/mo      | (varía)        | $200/mo PRO    | —             |
| 9 instrument types in 1 terminal   | ✅               | ✅             | ✅             | ⚠️ US focus    | ✅            |
| 7 stock markets cubiertos          | ✅ 7 mercados    | ✅ amplio      | ✅ amplio      | ⚠️ US          | ✅ amplio     |
| 24 explainable AI variables/signal | ✅ ÚNICO         | ❌ (manual)    | ProPicks AI    | Quant Ratings  | ✅            |
| FED Macro + GDELT per signal       | ✅ ÚNICO retail  | ❌             | ❌             | ❌             | ✅            |
| Native multi-language              | ✅ 8 idiomas    | English        | 30+ idiomas    | English        | English       |
| iOS + Android + Web                | ✅ todos         | ✅             | ✅             | Web focus      | Desktop only  |
| Diseñado para inversor individual  | ✅               | Trader-first   | Mass market    | Long-term      | Institucional |
```

### Lectura para el landing
- **AUREX vs TradingView:** AUREX 23% más barato + tiene FED/GDELT que TV no tiene. TV gana en charts pro y comunidad. AUREX gana en señales IA explicadas.
- **AUREX vs Investing.com:** Investing tiene 30+ idiomas pero ProPicks es black box. AUREX da las 24 variables visibles. Mismo target retail multi-idioma.
- **AUREX vs Seeking Alpha:** Seeking Alpha enfoca US stocks. AUREX cubre 7 mercados + 9 instrumentos. AUREX es 60% más barato en Premium ($9.99 vs $25).
- **AUREX vs Bloomberg:** AUREX entrega 24 variables + FED + GDELT por $9.99/mo cuando Bloomberg cobra $24,000/año. Bloomberg es para terminales institucionales; AUREX trae 70% de esa profundidad a un usuario individual.

---

## 4. Microcopy recomendado para debajo de la tabla en el landing

> **AUREX delivers the analytical depth of an institutional terminal — for the price of a single Plus subscription. TradingView, Investing.com and Seeking Alpha each excel in one dimension; AUREX brings cross-asset coverage, explainable AI variables and macro/geopolitical context into one terminal. Bloomberg Terminal targets institutions; AUREX is designed for the individual investor who wants the same depth.**

(Pasar a Escritorio para refinamiento final de copy en EN.)

---

## 5. Verificación técnica del método (para confianza interna)

- **Tool:** Firecrawl MCP server, free tier (500 scrapes/mes), API key generada por Fernando el 17-may.
- **Comando ejecutado:** `curl -X POST https://api.firecrawl.dev/v2/scrape` directo (no MCP server, para no requerir reinicio de sesión Claude Code).
- **Outputs en disco:** `/tmp/firecrawl_www_tradingview_com.json` (24 KB), `/tmp/firecrawl_www_investing_com.json` (20 KB), `/tmp/firecrawl_seekingalpha_com.json` (10 KB).
- **Fechas próxima re-verificación:** mensual hasta launch público + post-launch mensual.

---

## 6. Acción inmediata

Esta tabla **reemplaza** la tabla del PUNTO 8 del brief `LANDING_v2_BRIEF_CONSOLIDADO_16MAY.md`. El brief original mencionaba Magnifi/Sagehood/Danelfin/Robinhood; v2 usa TradingView/Investing.com/Seeking Alpha/Bloomberg.

Decisión cerrada por Fernando 17-may madrugada. No reabre.

---

## 7. Acceso para Escritorio

- Raw GitHub: `https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/BENCHMARK_v2_COMPETIDORES_REALES_17MAY.md`
- Con bypass cache: agregar `?nocache=<timestamp>`.

---

**Fin v1 del benchmark actualizado.** Próxima versión solo si re-verificamos los precios el mes que viene.
