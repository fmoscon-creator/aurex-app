# 🔬 CONSOLIDADO CRO Cobrex — v2 (07-jun-2026) · foco PRECIOS

> Actualiza la v1. **Novedad:** cruce de **precios reales de tiendas (Code, `/api/cro-prices`)** × **benchmarks de competidores por mercado (Escritorio, 12 mercados)**. El resto del diagnóstico (embudo, activación, bug fantasmas, analytics) sigue como en v1.
> **🛑 REGLA MADRE:** nada se cambia. Diagnóstico. Decisiones con OK explícito de Fernando.

---

## 0. ⚠️ CORRECCIÓN CLAVE DE CODE (cruce de datos)
**Escritorio evaluó todos los mercados contra el precio TENTATIVO (PRO US$5.99).** Pero el **precio ACTUAL real publicado es PRO US$9.99 / ELITE US$19.99** (verificado en Google Play, todos los países). → Los veredictos de Escritorio del tipo *"US$5.99 ≈ £4.75, muy competitivo, mantener"* **describen un precio que todavía NO está vivo.** A precio real, Cobrex está **~67% más caro** que lo que evaluó Escritorio. Hay que leer su análisis con esa lente.

## 1. 💲 CRUCE POR MERCADO (precio REAL Cobrex × competidores)
| Mercado | **Cobrex HOY (real)** | Tentativo | Competidor referencia (Escritorio) | Veredicto combinado |
|---|---|---|---|---|
| 🇦🇷 AR | **$9.99 USD** (full, sin localizar) | $5.99 | Cocos/IOL **GRATIS** | 🔴 Caro vs gratis + paga full USD. **Geo-pricing URGENTE.** |
| 🇧🇷 BR | **R$48.99** (~$8.7) | ~R$32 | Delta R$26.90 · Status Invest R$19.90 | 🟠 **Muy por encima** de los trackers locales. Geo-pricing media-alta. |
| 🇹🇷 TR | **₺539** (~$13.6) | $5.99 | TradingView ~₺250 (~$7.5) | 🟠 **Sobre-precio** (más caro que en US). Geo-pricing media. |
| 🇮🇳 IN | **₹1100** (~$13.2) | $5.99 | Zerodha/Groww gratis; ref geo ₹350-450 | 🟠 **Sobre-precio** (más caro que en US). Geo-pricing media. |
| 🇺🇸 US | **$9.99** | $5.99 | TradingView $12.95 · Investing $9.99 | 🟢 En línea con el mercado. No bajar. |
| 🇫🇷 FR | **€9.99** | ~€5.5 | TradingView €11.90 · Investing €9.20 | 🟢 Competitivo a precio real. Mantener. |
| 🇪🇸 ES | **€9.99** | $5.99 | Delta €4.99 · Investing €9.99 | 🟢 OK (Delta más barato, pero rango ok). |
| 🇮🇹 IT | **€9.99** | $5.99 | Delta ~€5 | 🟡 A precio real €9.99 está por encima de Delta. Revisar. |
| 🇬🇧 UK | **£8.99** | ~£4.75 | Delta/Freetrade | 🟡 OJO: Escritorio dijo "£4.75 muy competitivo" pero el real es **£8.99**. A £8.99 es ~en línea con TradingView, NO la ganga que sugería. |
| 🇦🇪/SA | AED 38.99 (~$10.6) | $5.99 | alto poder adquisitivo | 🟢 OK. No tocar. |
| 🇲🇦 MA | MAD109 (~$11) | $5.99 | bancarias gratis | ⚪ Poder bajo. Evaluar con volumen. |
| 🇻🇳 VN | ₫263k (~$10.4) | $5.99 | apps locales gratis | ⚪ Evaluar con analytics. |
| 🇨🇳 CN | local | — | firewall/ICP | ⚫ No priorizar. |

## 2. 🎯 HALLAZGO ESTRATÉGICO (para consensuar, NO es decisión)
Cruzando los dos análisis aparece una conclusión más fina que "bajar a $5.99 en todos lados":
- **En mercados desarrollados (US, FR, ES, IT, UK, AE/SA) el precio ACTUAL $9.99/€9.99 ya es competitivo** (TradingView $12.95, Investing $9.99). **Bajar a $5.99 ahí = dejar plata sobre la mesa** sin necesidad.
- **El problema real es selectivo:** 🇦🇷 AR (paga full USD compitiendo contra gratis) + 🇧🇷🇹🇷🇮🇳 (sobre-precio local, hoy MÁS caros que en US).
- → **La jugada más probable NO es un recorte global, es GEO-PRICING:** mantener ~$9.99 en mercados ricos + **bajar fuerte en AR + corregir BR/TR/IN**. Captura más en los ricos y desbloquea los sensibles.
- *(La propuesta de Fernando de $5.99/$9.99 global sigue siendo una opción válida — pero el dato sugiere que un recorte uniforme deja valor sin capturar en los mercados que sí pagan.)*

## 3. ✅ COINCIDENCIAS Code+Escritorio (precios)
- AR es el caso #1 y urgente para geo-pricing (los dos).
- BR/IN sobre-precio o por encima de competidores locales (Escritorio lo intuyó, Code lo confirmó con el precio real, que es aún MÁS alto que su hipótesis).
- Geo-pricing **técnicamente ya soportado** (Code: hay precios por país; Escritorio: RevenueCat/tiendas lo permiten sin código).
- Mercados desarrollados: no es ahí donde está el problema.

## 4. 🤝 DECISIÓN A CONSENSUAR (mañana, con Fernando)
**La grilla de precios objetivo por mercado.** Dos caminos:
- **(a) Recorte global** a PRO $5.99 / ELITE $9.99 (propuesta original Fernando).
- **(b) Geo-pricing selectivo** (recomendación que surge del cruce): mantener ~$9.99 en ricos + bajar en AR/BR/TR/IN.
- O un híbrido. **Nada se aplica sin OK.**

## 5. 📋 PENDIENTES
- **Code:** arreglar el pull de precios **iOS** (confirmar que espejan Android). · cerrar la verificación de los [HIPÓTESIS] de Escritorio (precios competidores TRY/INR/BRL) donde se pueda.
- **Escritorio:** los precios de competidores locales que quedaron [HIPÓTESIS] (App Store web bloqueó el scraping) — reintentar/confirmar.
- **Ambos (bloqueado):** el resto del embudo (activación) necesita las **analytics del Build 39**.
- Insumos: `briefs/cro/CODE_analisis.md` §3 (precios reales) · `briefs/cro/ESCRITORIO_analisis.md` §A (benchmarks 12 mercados).
