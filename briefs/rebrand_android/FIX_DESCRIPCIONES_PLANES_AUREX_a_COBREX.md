# FIX descripciones de planes AUREX → Cobrex (SIN build)

**Para:** Escritorio (operar Google Play Console + RevenueCat)
**Fecha:** 29-may-2026
**Contexto:** El card del paywall (`SubscriptionScreen.js` L233) muestra `pkg.product.description`, que sale en VIVO de Google Play Console. Hoy dice "AUREX". Se edita en la consola y la app lo refleja sin recompilar (cerrar/reabrir el paywall).

---

## ⚠️ NO TOCAR (rompe los cobros)
- **Product IDs**: `com.fernandomoscon.aurex.pro.monthly`, `...pro.annual`, `...elite.monthly2`, `...elite.annual` — quedan IGUAL aunque digan "aurex".
- **Base plan IDs**: `monthly-pro`, `annual-pro`, `monthly-elite`, `annual-elite` — IGUAL.
- **Entitlements RevenueCat**: `pro`, `elite` — IGUAL.
- **Offering identifier**: `aurex_default` — IGUAL.
- **applicationId** `com.aurexapp` — IGUAL.

Solo se cambia **texto visible** (nombre, descripción, beneficios, display names).

---

## A) GOOGLE PLAY CONSOLE — Monetización → Suscripciones (lo que se ve en el card)

Texto COMPLETO de cada campo (sin abreviaturas). Reemplazar el ACTUAL por el NUEVO, tal cual, en TODOS los idiomas cargados.

### PRO Mensual — Product ID `com.fernandomoscon.aurex.pro.monthly`
**Descripción**
- ACTUAL: `Full access to all AUREX PRO features.`
- NUEVO:  `Full access to all Cobrex PRO features.`

**Beneficios**
- ACTUAL: `Real-time alerts for 350+ assets · AUREX Pulse market signals · Watchlist & portfolio tracking`
- NUEVO:  `Real-time alerts for 350+ assets · Cobrex Pulse market signals · Watchlist & portfolio tracking`

### PRO Anual — Product ID `com.fernandomoscon.aurex.pro.annual`
**Descripción**
- ACTUAL: `Full access to all AUREX PRO features. Annual subscription, save 25%.`
- NUEVO:  `Full access to all Cobrex PRO features. Annual subscription, save 25%.`

**Beneficios**
- ACTUAL: `Real-time alerts for 350+ assets · AUREX Pulse market signals · Save 25% vs monthly plan`
- NUEVO:  `Real-time alerts for 350+ assets · Cobrex Pulse market signals · Save 25% vs monthly plan`

### ELITE Mensual — Product ID `com.fernandomoscon.aurex.elite.monthly2`
**Descripción**
- ACTUAL: `Premium AUREX AI signals. Monthly.`
- NUEVO:  `Premium Cobrex AI signals. Monthly.`

**Beneficios** — NO contiene "AUREX" → NO se cambia, queda igual:
- `AI signals with confidence scores · Full Pulse + RSI/MACD advanced · Unlimited alerts & watchlist`

### ELITE Anual — Product ID `com.fernandomoscon.aurex.elite.annual`
**Descripción**
- ACTUAL: `Premium AUREX AI signals. Annual, save 25%.`
- NUEVO:  `Premium Cobrex AI signals. Annual, save 25%.`

**Beneficios** — NO contiene "AUREX" → NO se cambia, queda igual:
- `AI signals with confidence scores · Full Pulse + RSI/MACD advanced · Save 25% vs monthly plan`

### Nombre del producto (es lo que se ve en la hoja de compra, ej. "AUREX PRO Mensual")
Cada producto tiene un Nombre por idioma. NO tengo el texto exacto verificado en los 8 idiomas, así que la regla es:
**en el Nombre de cada producto, reemplazar la palabra `AUREX` por `Cobrex` y dejar el resto igual.**
Ejemplos confirmados (en-US): `AUREX PRO Monthly → Cobrex PRO Monthly` · `AUREX ELITE Annual → Cobrex ELITE Annual`. En español: `AUREX PRO Mensual → Cobrex PRO Mensual`.

> ⚠️ Descripciones/beneficios de arriba son los verificados al 14-may (15 días). Escritorio: si el texto actual en consola difiere, aplicar igual la regla `AUREX → Cobrex` sobre lo que esté cargado, sin cambiar nada más.

---

## B) RevenueCat (interno — NO se ve en el card, pero por consistencia)
- Proyecto **"AUREX"** (ID `228caf37`) → renombrar display a "Cobrex" (opcional).
- Offering display **"AUREX PLANS"** → "Cobrex PLANS" (identifier sigue `aurex_default`).
- Display names de productos **"AUREX Pro" / "AUREX Elite"** → "Cobrex Pro" / "Cobrex Elite".

---

## D) Ícono de la FICHA de Play Store (lo que se ve en la hoja de compra de Google Play)

La hoja de compra nativa de Google Play (al tocar "Quiero PRO") muestra el **ícono de la ficha de Play Store** (asset 512×512 subido en Play Console), NO el ícono del binario. Hoy es el logo viejo con marca "AUREX".

- **Reemplazar** en Play Console → Crecimiento → Presencia en Store → Ficha principal → **Ícono de la app**.
- **Archivo nuevo (ya listo, 32-bit RGBA):** `~/Dropbox/AUREX/ANDROID/REBRAND ANDROID a COBREX/cobrex_icon_512.png`
- **Banner / gráfico de funciones (1024×500):** `~/Dropbox/AUREX/ANDROID/REBRAND ANDROID a COBREX/cobrex_banner_1024x500.png`
- Sin build. Es solo asset de la ficha.

---

## C) iOS (App Store Connect) — para no repetir en iOS
Mismos textos en los 4 productos iOS (nombres "AUREX PRO Monthly" etc. + descripciones). Aplica el mismo find/replace cuando se toque metadata iOS.
