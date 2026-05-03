# BLOQUE 6 — Disclaimer regulatorio en bios

**Generado por Code el 3-may-2026.** Formaliza la coherencia regulatoria de los textos públicos de AUREX a través de TODAS las superficies: app stores, redes sociales, listings, banners, descripciones, comunicación pública.

**Decisión clave**: la frase **"Not a broker. Not advice. Not a buy/sell platform."** (EN) y su traducción cultural a 7 idiomas más (ES, PT, ZH, FR, IT, HI, AR) **es el disclaimer regulatorio inviolable de AUREX en TODOS los lugares públicos**.

---

## ¿POR QUÉ ESTE DISCLAIMER ESPECÍFICAMENTE?

### Mitigación regulatoria por jurisdicción

| Jurisdicción | Riesgo | Cómo "Not a broker. Not advice." mitiga |
|---|---|---|
| **USA — SEC** | Investment Adviser Act 1940 puede aplicar a cualquier "advice" sobre inversiones | "Not advice" elimina el flag de Investment Advice. La app es informativa/data |
| **USA — FINRA** | Si hay "broker" implícito en el lenguaje, requiere registro de broker-dealer | "Not a broker" descarta esa interpretación |
| **AR — CNV** | Régimen Asesor Global de Inversiones (AGI) si emite "señales" | "Not advice" + "statistical analytics" en lugar de "buy/sell signals" como protagonista |
| **BR — CVM + Anbima** | Recomendaciones de inversión requieren analista CVM | "Not advice" descarta interpretación como recomendación |
| **UE — MiCA** | Servicios cripto requieren registro CASP si hay custodia/ejecución | "Not a buy/sell platform" + "Not a broker" = AUREX fuera del scope CASP |
| **UE — AMF / CONSOB / BaFin** | Advice financiero regulado | App informativa fuera del scope estricto |
| **UK — FCA** | Financial Promotions Order: cualquier promoción regulada requiere autorización | Lenguaje informativo no promocional + disclaimers neutralizan |
| **México — CNBV** | Asesor en Inversiones requiere licencia | "Not advice" |
| **India — SEBI** | Investment Advisor Regulations 2013 | "Not advice" + foco analytics no recomendación |
| **Mundo árabe (Sharia compliance)** | Algunos países restringen contenido financiero especulativo | Lenguaje neutral, sin "haram" implícito (no se promete ganancia, no se recomienda crypto especulativo) |

---

## DÓNDE APARECE EL DISCLAIMER (verificación cross-platform)

### Aplicación en superficies AUREX

| Superficie | Estado |
|---|---|
| **App Store Build 17 — descripción** | Disclaimers ya integrados en metadata segura (categoría Utilidades + subtítulo "Real-time market data tracker") |
| **Google Play Build 2 — descripción nueva** | ✅ Integrado en bio larga 8 idiomas (`docs/GOOGLE_PLAY_DESCRIPCIONES.md` commit `eb57380`). Sección "WHAT AUREX IS NOT" / "LO QUE AUREX NO ES" / equivalentes |
| **Bios públicas redes sociales** | ✅ Integrado en bio corta + bio larga 8 idiomas (`docs/BIOS_PUBLICAS_AUREX.md` v2 + `BIOS_TRADUCIDAS_6_IDIOMAS.md`) |
| **Banner Twitter / YouTube / LinkedIn / Facebook** | ⏳ A integrar en plantilla composición banners (Bloque 4 plantilla logo + tagline + disclaimer fila inferior) |
| **Feature graphic Google Play** | ✅ NO incluye disclaimer literal (no entra en 1024×500) pero el lenguaje es seguro: "Real-time global markets tracker" no implica advice |
| **Splash screen interno app nativa** | ⚠️ AurexHero.png actual tiene "INVEST AI" — NO USAR EXTERNAMENTE. Pendiente regenerar splash limpio post-aprobación stores (v1.1) |
| **Email transaccional Resend** | ⏳ A integrar en footer de cada email enviado. Texto sugerido: "AUREX provides statistical analytics, not investment advice. Not a broker. aurex.live" |
| **Plantillas posts de redes (cuando se generen)** | ⏳ Plantilla #2 (señal IA card 1080×1080) debe incluir disclaimer en pie de imagen |
| **PWA aurex.live** | ⏳ A verificar — el footer del sitio web debe tener equivalente al disclaimer |

---

## VERSIONES OFICIALES POR IDIOMA (para reusar en cualquier lado)

### Versión EN (idioma maestro)

```
Not a broker. Not advice. Not a buy/sell platform.
Statistical analytics for the individual market follower.
```

### Versión ES

```
No es broker. No es asesoramiento. No es plataforma de compra/venta.
Análisis estadístico para el seguidor de mercados individual.
```

### Versión PT (brasilero)

```
Não é broker. Não é assessoria. Não é plataforma de compra/venda.
Análise estatística para o seguidor de mercados individual.
```

### Versión ZH (simplificado)

```
非经纪商。非投资建议。非买卖平台。
为个人市场观察者提供统计分析。
```

### Versión FR

```
Pas un broker. Pas un conseil. Pas une plateforme d'achat/vente.
Analyse statistique pour le suiveur de marchés individuel.
```

### Versión IT

```
Non è un broker. Non è una consulenza. Non è una piattaforma di compra/vendita.
Analisi statistica per il follower di mercati individuale.
```

### Versión HI

```
ब्रोकर नहीं। सलाह नहीं। खरीद/बिक्री प्लेटफॉर्म नहीं।
व्यक्तिगत मार्केट फॉलोअर के लिए स्टैटिस्टिकल एनालिटिक्स।
```

### Versión AR

```
ليس وسيطًا. ليس نصيحة. ليس منصة شراء/بيع.
تحليل إحصائي للمتابع الفردي للأسواق.
```

---

## VERSIÓN COMPACTA PARA CHAR LIMITS BAJOS

Para superficies con char count <60 (ej: bio Twitter máx 160, bio TikTok máx 80, alt text de imágenes), usar versión reducida que mantiene el "core" mitigatorio:

| Idioma | Versión compacta |
|---|---|
| EN | `Not a broker.` o `Not a broker. Not advice.` |
| ES | `No es broker.` o `No es broker. No es asesoramiento.` |
| PT | `Não é broker.` |
| ZH | `非经纪商。` |
| FR | `Pas un broker.` |
| IT | `Non è un broker.` |
| HI | `ब्रोकर नहीं।` |
| AR | `ليس وسيطًا.` |

---

## REGLA INVIOLABLE — qué NUNCA se publica

Lenguaje **prohibido en TODA superficie pública** AUREX (ya formalizado en Bloque 1, repetido aquí por reforzar):

❌ `investment advice` / `financial advice` / `consejo de inversión` / `asesoramiento financiero`
❌ `recommendation to buy/sell` / `recomendación de compra/venta`
❌ `guaranteed returns` / `make money` / `profits guaranteed` / `rentabilidad garantizada`
❌ `AI signals` (como protagonista del producto, NO como característica del motor)
❌ `investment platform` / `trading platform` / `fintech` / `plataforma de inversión`
❌ `buy now` / `sell now` / `comprá ahora` / `vendé ahora`
❌ `INTELIGENCIA FINANCIERA` (como tagline de marca)
❌ `INVEST AI` (como tagline de marca)
❌ `opportunities` / `oportunidades de inversión` (lenguaje promocional financiero)
❌ `Only invest what you are willing to lose` (es disclaimer pero **revela posicionamiento financiero**)

---

## OUTPUT DEL BLOQUE 6

✅ **Disclaimer regulatorio inviolable formalizado**: `Not a broker. Not advice. Not a buy/sell platform.` (EN) + traducciones culturales a 7 idiomas más.

✅ **Mitigación regulatoria mapeada** a 10 jurisdicciones (USA SEC/FINRA, AR CNV, BR CVM, UE MiCA/AMF/CONSOB/BaFin, UK FCA, MX CNBV, IN SEBI, Mundo Árabe).

✅ **Aplicación cross-platform documentada**: bios redes ✅ ya integrado, descripciones Google Play ✅ ya integrado. Pendientes: plantillas banners + email Resend footer + plantilla posts redes (al generarse) + PWA footer.

✅ **Versiones compactas** para superficies con char count bajo (Twitter bio, TikTok bio, alt text).

✅ **Regla inviolable** de lenguaje prohibido cross-platform.

---

*BLOQUE_6_DISCLAIMER_REGULATORIO.md — Bloque 6 cerrado el 3-may-2026. Próximo: Bloque 7 (costos cero confirmados hasta approval stores).*
