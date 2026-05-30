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

En cada producto revisar **3 campos**: Nombre, Descripción, Beneficios. Reemplazar toda aparición de **AUREX → Cobrex** en TODOS los idiomas cargados.

| # | Producto (Product ID) | Campo | ANTES | DESPUÉS |
|---|---|---|---|---|
| 1 | PRO Mensual (`...pro.monthly`) | Descripción | Full access to all **AUREX** PRO features. | Full access to all **Cobrex** PRO features. |
| 1 | PRO Mensual | Beneficios | Real-time alerts for 350+ assets · **AUREX** Pulse market signals · Watchlist & portfolio tracking | Real-time alerts for 350+ assets · **Cobrex** Pulse market signals · Watchlist & portfolio tracking |
| 2 | PRO Anual (`...pro.annual`) | Descripción | Full access to all **AUREX** PRO features. Annual subscription, save 25%. | Full access to all **Cobrex** PRO features. Annual subscription, save 25%. |
| 2 | PRO Anual | Beneficios | Real-time alerts for 350+ assets · **AUREX** Pulse market signals · Save 25% vs monthly plan | Real-time alerts for 350+ assets · **Cobrex** Pulse market signals · Save 25% vs monthly plan |
| 3 | ELITE Mensual (`...elite.monthly2`) | Descripción | Premium **AUREX** AI signals. Monthly. | Premium **Cobrex** AI signals. Monthly. |
| 3 | ELITE Mensual | Beneficios | AI signals with confidence scores · Full Pulse + RSI/MACD advanced · Unlimited alerts & watchlist | (sin AUREX — verificar igual) |
| 4 | ELITE Anual (`...elite.annual`) | Descripción | Premium **AUREX** AI signals. Annual, save 25%. | Premium **Cobrex** AI signals. Annual, save 25%. |
| 4 | ELITE Anual | Beneficios | AI signals with confidence scores · Full Pulse + RSI/MACD advanced · Save 25% vs monthly plan | (sin AUREX — verificar igual) |

> El **Nombre** del producto (ej. "AUREX PRO Monthly") también puede decir AUREX → cambiarlo a "Cobrex PRO Monthly", etc.
> ⚠️ Textos de 14-may (15 días). Escritorio: leer el texto ACTUAL real en consola y aplicar AUREX→Cobrex sobre lo que esté, por si cambió.

---

## B) RevenueCat (interno — NO se ve en el card, pero por consistencia)
- Proyecto **"AUREX"** (ID `228caf37`) → renombrar display a "Cobrex" (opcional).
- Offering display **"AUREX PLANS"** → "Cobrex PLANS" (identifier sigue `aurex_default`).
- Display names de productos **"AUREX Pro" / "AUREX Elite"** → "Cobrex Pro" / "Cobrex Elite".

---

## C) iOS (App Store Connect) — para no repetir en iOS
Mismos textos en los 4 productos iOS (nombres "AUREX PRO Monthly" etc. + descripciones). Aplica el mismo find/replace cuando se toque metadata iOS.
