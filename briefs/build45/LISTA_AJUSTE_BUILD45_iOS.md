# 🍎 LISTA DE AJUSTE — BUILD 45 iOS

> **Base:** Build 44 (v1.3) subido a TestFlight el 10-jun-2026.
> **Origen:** revisión de Fernando del Build 44 en su iPhone (10-jun, como FREE para ver el paywall de inicio).
> **Versión:** se mantiene **1.3** (aún NO publicada en App Store) → solo sube el build number **44 → 45**. Resultado: **1.3 (45)**.
> **Proceso:** igual al Build 44 → Code implementa · bundle JS OK · Archive incremental · IPA validado vs Build 44 · Fernando sube por Transporter · prueba como FREE.

---

## 🔧 AJUSTES A IMPLEMENTAR

### 1 — [A] Precios: mostrar "USD" en vez de "$"  🔴 importante
- **Problema:** en el paywall las **5 cards** (FREE + 4 pagos) muestran el precio con **"$"** → en Argentina se confunde con pesos. El cobro es en **USD**.
- **Qué hacer:** mostrar la moneda como **USD** de forma clara (ej. "USD 9.99"). Verificar si el "$" viene de `pkg.product.priceString` (formato de Apple) y reformatear de nuestro lado.
- **Archivo:** `src/screens/SubscriptionScreen.js` (+ revisar card FREE y la sección de planes en `PerfilScreen.js`).
- **Tipo:** código nuestro.

### 2 — [B] Apple sheet: "USD" (mensual) vs "U$S" (anual)
- **Problema:** al tocar comprar, la **pantalla nativa de Apple** muestra **"USD"** en los planes mensuales y **"U$S"** en los anuales (mismo dólar, distinto formato).
- **Qué hacer:** investigar el origen (config del producto en ASC / locale). **Esa pantalla la dibuja Apple** → ver si se ajusta desde ASC o es comportamiento de Apple (quizá NO fixeable desde la app).
- **Tipo:** Apple / ASC — investigar primero.

### 3 — [C] Disclaimer gris más compacto
- **Qué hacer:** achicar el alto del texto gris del disclaimer (legal) del paywall.
- **Archivo:** `src/screens/SubscriptionScreen.js` (estilos del disclaimer).
- **Tipo:** código nuestro (cosmético).

### 4 — [#3] Tickers muertos + verificar las 161 acciones nuevas  🔴 importante
- **Problema:** **BITF** y **HESS** salen vacíos (sin precio, sin gráfico, sin IA). Confirmado en la fuente: Yahoo devuelve **"Not Found"** para ambos. (HESS = la compró Chevron y dejó de cotizar; BITF = no encontrado.) Puede haber más entre las 161.
- **Qué hacer:** chequear **las 161 acciones nuevas una por una** contra la fuente de datos → **sacar las muertas / corregir símbolos errados.** Sincronizar **app** (`assets.js`) **+ backend** (`activos.json`).
- **Impacto:** destraba las señales IA → de **499 a 503** (un activo sin cotización tampoco genera señal).
- **Archivos:** `src/lib/assets.js` + `aurex-backend/activos.json`.
- **Tipo:** datos.

### 5 — [#2] Metales "últ. cierre" — verificar
- **Qué hacer:** confirmar si mostrar **"últ. cierre"** es correcto (son **futuros COMEX**, la referencia global, sí cotizan en EEUU) o si debería mostrar **precio live**. Decidir si requiere cambio.
- **Archivo:** `src/screens/MercadosScreen.js` (display de metales).
- **Tipo:** verificar (quizá sin cambio).

---

## ✅ YA QUEDÓ BIEN EN BUILD 44 (no se toca)
#1 footer color+pill · #4 reorden filtros · #6 onboarding español · #7 período en 4 cards · #8/#9 botón+leyenda trial (2 mensuales) · #10 frase inline · #11 cards compactas · #3 acciones nuevas que andan.

## ⏳ APARTE (sin build)
- **#12 — Precios nuevos** (ARG $2.99/$28.99/$4.99/$47.99 + base $4.99/$47.99/$9.99/$95.99) → propagan solos el **11-jun**, se revalidan mañana.
- **Devolver a Fernando a ELITE** (Supabase) cuando esté TODO cerrado.
- **Términos del paywall abajo** (requieren scroll) → ya están también arriba → se deja salvo decisión contraria.

---

## ORDEN SUGERIDO DE TRABAJO
1. **Investigar primero** A (origen del "$") y B (USD vs U$S) → saber qué es fixeable.
2. Implementar A + C (paywall, código nuestro).
3. Resolver #3 (chequeo de las 161 + limpieza app+backend).
4. Verificar #2 (metales) y decidir.
5. Bundle JS · Archive 1.3 (45) · validar IPA · Transporter · TestFlight.
