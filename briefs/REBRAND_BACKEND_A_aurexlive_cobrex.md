# 🔧 Backend — rebrand `aurex.live` → `cobrex.io` (punto A) · para validación de Escritorio

*Fecha: 03-jun-2026 · Autor: Code · Repo: `fmoscon-creator/aurex-backend` (Railway) · Commit `f5a9a26`*
*Pedido por Fernando: documentar qué se detectó y qué se hizo, para que Escritorio lo revise y diga si está OK.*

---

## 1. QUÉ SE DETECTÓ
En el backend (`server.js`) había **14 referencias a `aurex.live`** (marca vieja) — la app ya es Cobrex, así que esos textos/links le llegaban a **usuarios reales** o aparecían en informes. Se agrupan en 3 tipos:

| Tipo | Cuántos | Qué era | A quién le llegaba |
|---|---|---|---|
| **`upgrade_url` del paywall** | 4 | Cuando un usuario **FREE** intenta crear una alerta PRO/ELITE, el backend responde con: `upgrade_url: 'https://aurex.live/inicio#planes'` | Usuario en la app (link "pasate a PRO") |
| **Captions de alertas (WhatsApp)** | ~8 | La firma `aurex.live` al pie de los mensajes de alertas (ej. `BTC ↑ 82% · 🎯 Target $X · aurex.live`, `💓 AUREX Pulse … · aurex.live`) | Usuarios suscriptos a alertas |
| **Footers de informes** | 2 | El `━━━ aurex.live` al pie del Daily Health Report | Telegram interno |

---

## 2. QUÉ SE HIZO (solución)
| Dónde | Cambio | Validación previa |
|---|---|---|
| **`upgrade_url`** (4) | `https://aurex.live/inicio#planes` → **`https://cobrex.io/#plans`** | Cloné cobrex.io y verifiqué: la sección de planes tiene **`id="plans"`** (anchor `#plans`, en inglés) y **NO existe `/inicio`** en cobrex.io. Por eso `/#plans` y no `/inicio#planes` (eso habría dado 404). |
| **Captions de alertas** (~8) | texto `aurex.live` → **`cobrex.io`** | Solo texto/firma, sin link funcional → sin riesgo. |
| **Footers de informes** (2) | `aurex.live` → **`cobrex.io`** | Sin riesgo. |

**Chequeos finales (todos ✅):**
- `node --check server.js` → sintaxis OK
- `grep -c aurex.live` → **0** (no quedó ninguna)
- `grep -c cobrex.io/#plans` → **4** (los 4 upgrade_url correctos)
- `grep -c cobrex.io/inicio` → **0** (NO quedó la ruta rota)

---

## 3. PARA ESCRITORIO — qué validar
1. **El `upgrade_url` del paywall → `cobrex.io/#plans`**: ¿es la ruta correcta? ¿El usuario que toca "pasate a PRO" debe ir a la **landing `cobrex.io/#plans`** (sección de planes) o preferís que vaya a la **PWA `cobrex.io/app`**? (Hoy lo dejé a la landing `#plans`, que es donde están los planes; si querés la PWA, lo cambio.)
2. **Captions de alertas**: ¿la firma `cobrex.io` está bien, o querés que sea un link a algo específico (PWA / landing)?
3. ¿Hay algún `aurex.live` que **NO** debería haberse tocado? (Revisé: los 14 eran todos la web vieja; no toqué nombres de repos como `aurex-app`/`aurex-backend`, solo el string `aurex.live`.)

> **Nota:** este cambio ya está commiteado/pusheado (`f5a9a26`). Si Escritorio detecta algo, se ajusta o se revierte. Fernando: nada más se toca del resto (informe B) hasta tu OK.
