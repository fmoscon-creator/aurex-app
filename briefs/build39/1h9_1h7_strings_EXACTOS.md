# 1.h.9 + 1.h.7 — STRINGS EXACTOS del código VIVO (Code → Escritorio)
*08-jun · extraídos por Code de `~/AurexApp/src` (código actual). **Escritorio traduce ESTA lista; NO lee el código** (regla Brief §0).*

> **Reemplaza** lo que Escritorio tradujo antes para 1.h.9 (estaba sobre código viejo: campo "Nombre" inexistente, mensajes que faltaban). Para 1.h.7, la **a4 cambió** (sin precios + WhatsApp "próximamente") → re-traducir; el resto verificá que tu traducción coincida con el texto de abajo.

---

## 1.h.9 — SIGNUP (15 strings, ES maestro → traducir a EN/PT/FR/IT/ZH/HI/AR)
| Clave sugerida | ES (maestro) |
|---|---|
| `signup_subtitle` | Crear cuenta gratis |
| `signup_ph_email` | Email |
| `signup_ph_pass` | Contraseña (mín. 6) |
| `signup_ph_pass2` | Repetir contraseña |
| `signup_btn` | Crear cuenta |
| `signup_err_email` | Email inválido |
| `signup_err_pass_short` | La contraseña debe tener al menos 6 caracteres |
| `signup_err_pass_mismatch` | Las contraseñas no coinciden |
| `signup_err_exists` | Este email ya tiene cuenta. Tocá "Ya tengo cuenta" para entrar. |
| `signup_err_weak` | Contraseña muy débil. Usá al menos 6 caracteres con letras y números. |
| `signup_err_server` | Respuesta inesperada del servidor |
| `signup_err_prefix` | Error:  *(prefijo, queda + el mensaje técnico)* |
| `signup_net_prefix` | Red:  *(prefijo, queda + el detalle)* |
| `signup_confirm_title` | Revisá tu email |
| `signup_confirm_body` | Te enviamos un email para confirmar tu cuenta. Después volvé a ingresar. |

---

## 1.h.7 — FAQ PERFIL (6 Q + 6 A, ES maestro → 8 idiomas)
**Preguntas (las 6 coinciden con lo que ya tradujiste — confirmá):**
- `faq_q1`: ¿Qué es Cobrex?
- `faq_q2`: ¿Cómo funciona el Motor IA?
- `faq_q3`: ¿Qué es Cobrex Pulse?
- `faq_q4`: ¿Qué planes hay disponibles?
- `faq_q5`: ¿Cómo funcionan las alertas?
- `faq_q6`: ¿Es confiable el análisis de Cobrex?

**Respuestas (ES maestro — verbatim del código):**
- `faq_a1`: Cobrex es una plataforma de análisis de datos con inteligencia artificial que monitorea 350+ activos globales en tiempo real (criptomonedas, acciones, ETFs, commodities, futuros y divisas). Nuestro motor IA v7 evalúa 10 variables por activo para generar análisis estadísticos y alertas.
- `faq_a2`: El Motor IA v7 analiza 10 variables en tiempo real: Tendencia 24h, RSI14, Volumen, Volatilidad, Correlación BTC/SPY, Oro/Petróleo, Macro FED, Earnings, MACD y Soporte/Resistencia. Genera análisis estadísticos con dirección ALCISTA, BAJISTA o ALTA CONV-IA y nivel de confianza.
- `faq_a3`: Cobrex Pulse es nuestro índice de sentimiento de mercado con 14 variables ponderadas. Va de 0 (Miedo Extremo) a 100 (Codicia Extrema). Tiene 5 filtros: Global, Cripto, Acciones, Commodities y Futuros. Incluye 3 indicadores: Cobrex Pulse, BTC Sentiment y Crypto Fear & Greed.
- `faq_a4` ⚠️ **CAMBIÓ (re-traducir):** FREE: 5 activos, 3 análisis/día, Pulse básico. PRO: activos ilimitados, análisis ilimitados, alertas push, exportar portfolio. ELITE: todo lo de PRO + Pulse completo, análisis avanzado, alertas WhatsApp (próximamente), soporte prioritario.
- `faq_a5`: Las alertas te notifican cuando: un activo alcanza tu precio objetivo, cambia el análisis IA, hay variación brusca (+/-5%), o Cobrex Pulse entra en zona extrema. Podés recibirlas por push, email o WhatsApp (según tu plan).
- `faq_a6`: Cobrex es una herramienta de análisis de datos. Los análisis IA son estadísticos e informativos, no recomendaciones. Los datos de mercado son provistos por fuentes públicas. Consultá siempre a un profesional antes de tomar decisiones.

---

## NOTA sobre las claves `rating.*`
Las 4 claves `rating.*` (modal de reseña) que pusiste en 1.h.7 son del **popup de reseña = item A**, que Code todavía no construyó. Se cablean cuando A exista — guardalas, no las pierdas.
