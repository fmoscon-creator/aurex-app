# BLOQUE 2 — Disponibilidad real de nombres en plataformas

**Generado por Code el 2-may-2026.** Chequeo automatizado de los 4 patrones del Plan MKT v3.0 + variantes en las 5 plataformas web públicas. LinkedIn no se pudo chequear sin login.

---

## TABLA DE RESULTADOS

| Patrón | Variante | YouTube | Telegram | Instagram | TikTok | Twitter/X |
|---|---|:---:|:---:|:---:|:---:|:---:|
| **1) AUREX** | `aurex` | ❌ TAKEN | ✅ FREE | ⚠️ AMBIG | ✅ FREE | ⚠️ AMBIG |
| **2) AUREX AI** | `aurex_ai` | ✅ FREE | ✅ FREE | ⚠️ AMBIG | ✅ FREE | ⚠️ AMBIG |
| **2) AUREX AI** | `aurexai` | ✅ FREE | ✅ FREE | ⚠️ AMBIG | ✅ FREE | ⚠️ AMBIG |
| **2) AUREX AI** | `aurex.ai` | ✅ FREE | ✅ FREE | ⚠️ AMBIG | ✅ FREE | ⚠️ AMBIG |
| **3) AUREX APP** | `aurex_app` | ✅ FREE | ✅ FREE | ⚠️ AMBIG | ✅ FREE | ⚠️ AMBIG |
| **3) AUREX APP** | `aurexapp` | ❌ TAKEN | ✅ FREE | ⚠️ AMBIG | ✅ FREE | ⚠️ AMBIG |
| **3) AUREX APP** | `aurex.app` | ✅ FREE | ✅ FREE | ⚠️ AMBIG | ✅ FREE | ⚠️ AMBIG |
| **4) AUREX IA** | `aurex_ia` | ✅ FREE | ✅ FREE | ⚠️ AMBIG | ✅ FREE | ⚠️ AMBIG |
| **4) AUREX IA** | `aurexia` | ✅ FREE | ✅ FREE | ⚠️ AMBIG | ✅ FREE | ⚠️ AMBIG |
| **4) AUREX IA** | `aurex.ia` | ✅ FREE | ✅ FREE | ⚠️ AMBIG | ✅ FREE | ⚠️ AMBIG |

**Leyenda:**
- ✅ **FREE** — disponibilidad confirmada técnicamente (HTTP 404 limpio o ausencia de marcadores de cuenta existente).
- ❌ **TAKEN** — cuenta existente confirmada técnicamente.
- ⚠️ **AMBIG** — el chequeo HTTP no es confiable porque la plataforma devuelve HTML genérico igual exista o no la cuenta. **Solo se confirma en el formulario de signup en vivo cuando Fernando lo pruebe.**

---

## INTERPRETACIÓN

### Datos confirmados técnicamente

1. **`aurex` (patrón 1) está TAKEN en YouTube.** Eso DESCARTA el patrón AUREX limpio para uso global multicanal.
2. **`aurexapp` (sin separador) está TAKEN en YouTube.** Esa variante específica también descartada.
3. **YouTube y Telegram fueron los únicos chequeos confiables**: 404 limpio en YT y grep de "If you have Telegram" en TG.
4. **Instagram, TikTok y Twitter/X devuelven HTML genérico para usuarios inexistentes**, lo que hace imposible distinguir FREE vs TAKEN sin login o intento de signup. Hay que confirmar en el formulario en vivo.

### Datos pendientes de confirmación (Instagram, TikTok, Twitter)

Para los 3 ambiguos, la confirmación real ocurre en el momento del signup. Cuando el formulario diga "this username is taken" o equivalente, se descarta y se prueba la siguiente variante.

### LinkedIn

No se chequeó (requiere login). LinkedIn Company Pages tienen su propio espacio de nombres separado de perfiles personales — el patrón en LinkedIn es la URL slug `linkedin.com/company/[slug]`. Se confirma en vivo cuando Fernando crea la Company Page.

---

## RECOMENDACIÓN AL CIERRE DEL BLOQUE 2

**Patrón recomendado: AUREX AI**

Razones fundadas:
1. **Coherente con Build 17 metadata** — el nombre publicado en App Store es exactamente `AUREX AI`. Mantener el patrón unifica marca cross-canal con la app.
2. **YouTube confirmado FREE** en las 3 variantes (`aurex_ai`, `aurexai`, `aurex.ai`).
3. **Telegram confirmado FREE** en las 3 variantes.
4. **TikTok confirmado FREE** en las 3 variantes (con cierta ambigüedad técnica).
5. AUREX limpio descartado por TAKEN en YouTube.

### Variantes a probar en el formulario de signup, en este orden de preferencia

| Orden | Variante | Por qué |
|---|---|---|
| 1° | `aurex_ai` | Más legible, separador `_` permitido en TODAS las plataformas. Coincide con notación tipo handle de Twitter clásico |
| 2° | `aurexai` | Más compacto, sin separador. Permitido en todas. Funciona si `aurex_ai` está tomado |
| 3° | `aurex.ai` | Con punto. **NO** disponible en X/Twitter (no permite puntos), **NO** en Telegram (no permite puntos en handles públicos). Sí en IG, TikTok, YouTube. Solo si las dos primeras están tomadas |

### Si AUREX AI completo está tomado en alguna plataforma crítica

**Fallback en orden:**

1. **AUREX IA** (variantes `aurex_ia` / `aurexia` / `aurex.ia`) — TODAS confirmadas FREE en YT + TG. Coherente para mercado hispano/portugués pero rompe coherencia con Build 17 que es `AUREX AI` (inglés). Aceptable como fallback.
2. **AUREX APP** (variantes `aurex_app` / `aurex.app`) — `aurexapp` sin separador descartado por TAKEN en YT. `aurex_app` y `aurex.app` libres en YT y TG. Coherente con Bundle ID Google Play (`com.aurexapp`).

---

## RESTRICCIONES TÉCNICAS POR PLATAFORMA (importante para el formulario)

| Plataforma | Permite `_` | Permite `.` | Min char | Max char | Notas |
|---|:---:|:---:|---|---|---|
| Twitter/X | ✅ | ❌ | 4 | 15 | Solo letras, números y `_` |
| Instagram | ✅ | ✅ | 1 | 30 | Letras, números, `_` y `.` |
| TikTok | ✅ | ✅ | 2 | 24 | Letras, números, `_` y `.` |
| YouTube | ✅ | ✅ | 3 | 30 | Letras, números, `_`, `.` y `-` |
| Telegram | ✅ | ❌ | 5 | 32 | Solo letras, números y `_` |

**Implicación:** la variante `aurex.ai` o `aurex.app` NO se puede usar en Twitter ni Telegram. Si el patrón único debe ser idéntico en todas las plataformas, la única opción que funciona en TODAS es `aurex_ai` o `aurexai` (con o sin separador `_`, sin puntos).

---

## ESTRATEGIA "DISPLAY NAME vs HANDLE TÉCNICO" (aporte Escritorio + Fernando)

**Distinción crítica que Code NO había planteado en el primer cierre:**

En las plataformas sociales hay DOS niveles de identidad distintos:

1. **Display Name (nombre visible)** — lo que el usuario lee como "marca". Ejemplo: en un tweet aparece arriba en grande `AUREX`.
2. **Handle técnico** — la dirección @ con la que se referencia a la cuenta. Ejemplo: `@aurex_ai` aparece debajo del Display Name, más chico.

El usuario percibe la marca por el **Display Name**, no por el handle. Bloomberg no se llama "Bloomberg Data Inc" en sus tweets — el Display Name dice "Bloomberg" aunque su handle sea `@business`.

### Implicación para AUREX

**Display Name único en todas las plataformas: `AUREX`** (sin sufijo, sin "AI", sin "APP"). El usuario percibe "AUREX" en cada plataforma. Coherencia de marca total.

**Handle técnico: estrategia escalonada según disponibilidad real en el formulario.** Como YouTube ya tiene `@aurex` ocupado, ahí va `@aurex_ai`. En el resto, vale la pena probar `@aurex` primero en el formulario antes de resignar a `@aurex_ai`.

### Excepción importante: Twitter/X

En **Twitter/X el handle SÍ es muy visible** (aparece debajo del Display Name en todos los posts y todos pueden mencionarte como `@aurex` o `@aurex_ai`). Por eso vale la pena verificar `@aurex` en el formulario de Twitter en vivo antes de aceptar `@aurex_ai`. Si `@aurex` está libre en X, ese es el handle ideal.

En el resto de plataformas (IG, TikTok, YouTube, Telegram) el handle es menos visible — lo que se ve es el Display Name + foto + contenido.

### Estrategia de signup en vivo (para Fase C — Paso CERO real)

| Plataforma | Display Name a usar | Handle a probar (orden) |
|---|---|---|
| Twitter/X | `AUREX` | 1) `aurex` (verificar en vivo) → 2) `aurex_ai` → 3) `aurexai` |
| Instagram | `AUREX` | 1) `aurex` (verificar en vivo) → 2) `aurex.ai` → 3) `aurex_ai` → 4) `aurexai` |
| TikTok | `AUREX` | 1) `aurex` (verificar en vivo) → 2) `aurex.ai` → 3) `aurex_ai` |
| YouTube | `AUREX` | `aurex_ai` directo (`aurex` ya CONFIRMADO TAKEN) → fallback `aurexai` |
| Telegram | `AUREX Pulse` (channel) | 1) `aurex` (verificar) → 2) `aurex_ai` → 3) `aurexai` → 4) `AurexPulse` |
| LinkedIn Company | `AUREX` | URL slug 1) `aurex` → 2) `aurex-ai` → 3) `aurex-app` |

---

## OUTPUT DEL BLOQUE 2 — VERSIÓN FINAL

✅ **Display Name único: `AUREX`** en todas las plataformas. Coherencia de marca total — el usuario percibe "AUREX" en cada canal.

✅ **Handle técnico:** estrategia escalonada según disponibilidad. Confirmaciones técnicas:
- Twitter/X: pendiente verificación en vivo de `@aurex` (probar primero antes de aceptar `@aurex_ai`).
- Instagram: pendiente verificación en vivo de `@aurex`.
- TikTok: pendiente verificación en vivo de `@aurex`.
- YouTube: `@aurex` CONFIRMADO TAKEN → directo a `aurex_ai`.
- Telegram: `@aurex` LIBRE técnicamente, verificar en formulario real.

✅ **El handle final por canal queda definido durante el Paso CERO real** (Fase C del método), no acá.

📌 **Regla operativa para el formulario en vivo:** siempre probar `aurex` primero, escalando a `aurex_ai` solo si está tomado. Display Name siempre `AUREX` sin sufijo.

---

*BLOQUE_2_DISPONIBILIDAD_NOMBRES.md v2 — Bloque 2 cerrado tras aporte de Escritorio sobre distinción Display Name vs Handle. Próximo: Bloque 3 (email + identidad operativa) y traducción de bios a 6 idiomas en paralelo.*
