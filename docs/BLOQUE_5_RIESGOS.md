# BLOQUE 5 — Riesgos de apertura + mitigaciones

**Generado por Code el 3-may-2026.** Inventario formal de los riesgos asociados a abrir 7 cuentas de redes para AUREX desde cero, en simultáneo, desde un solo dispositivo iPhone con conexión IP argentina, con email único `app.aurex@gmail.com`. Mitigación específica para cada uno.

**Lección estructural integrada (incidente WA-002 del 3-may-2026):** automatización Web NO OFICIAL sobre cuentas Business = riesgo cíclico de bloqueo. Aplica más allá de WhatsApp: Twitter, Instagram, TikTok, LinkedIn tienen anti-fraud equivalente.

---

## TABLA RESUMEN — riesgos identificados

| # | Riesgo | Probabilidad | Severidad | Plataformas afectadas |
|---|---|---|---|---|
| 1 | Warm-up insuficiente de cuentas nuevas → suspensión por publicación programática | Alta | Alta | Twitter/X, Instagram, TikTok |
| 2 | Geolocalización IP argentina vs targeting USA/Global | Media | Media | Twitter/X, Meta (IG/FB), TikTok |
| 3 | Línea 2563 ya en WhatsApp Business → conflicto con verificación SMS de otras plataformas | Media | Baja-Media | Twitter (verifica SMS), Instagram (verifica SMS), TikTok |
| 4 | Múltiples cuentas creadas mismo día desde mismo IP/dispositivo → detección de bot | Alta | Alta | Meta (FB+IG en mismo dispositivo), TikTok |
| 5 | Recovery email enlazando accounts en grafo Google | Resuelto en Bloque 3 | — | Google (YouTube + Cloud) |
| 6 | Aprobaciones API pendientes bloquean timing Fase C | Media | Media | TikTok Content Posting, Meta Graph |
| 7 | Apple/Google detectan creación simultánea de cuenta Business + iPhone personal Fernando | Baja | Media | App Store Connect, Play Console |
| 8 | **NUEVO 3-may**: cualquier servicio Business + Web automatizada NO oficial = riesgo cíclico (lección WA-002) | Alta | Crítica | Twitter Web automation, Meta Graph para Reels, TikTok Content Posting, LinkedIn Marketing API |

---

## RIESGO 1 — Warm-up insuficiente de cuentas nuevas

### Descripción

Twitter/X, Instagram, TikTok tienen heurísticas anti-bot que detectan cuentas nuevas que **arrancan publicando programáticamente** (vía API) sin tener actividad orgánica humana previa. La cuenta nueva queda en período de observación. Si arranca con:

- 5+ posts el primer día
- Posts a horarios automatizados (cada 8 hs exactos)
- Cero interacciones (likes, replies, follows manuales)
- Bio + foto + cover llenados todos en menos de 5 minutos

→ la plataforma marca la cuenta como **probable bot** y aplica alguna de estas medidas:
- Suspensión temporal (24-72 hs).
- Shadow ban (los posts no aparecen en el timeline de no-followers).
- Limitación de funciones (no puede seguir cuentas, no le dan retweets en cascada).
- En el peor caso: suspensión definitiva.

### Mitigación adoptada

**Period de warm-up de 14 días** antes de habilitar automation completa por API:

| Día | Acción |
|---|---|
| Día 1 | Crear cuenta + foto perfil + bio + 1 post manual cualquiera (no AUREX, puede ser intro general "AUREX is launching soon. Real-time markets tracker.") |
| Día 2-3 | 1 post manual / día. Like a 5-10 cuentas relacionadas (Bloomberg, MarketWatch, etc.). Follow a 10 cuentas verificadas del nicho |
| Día 4-7 | 1-2 posts manuales / día con copy diverso. Replies manuales a 2-3 conversaciones / día |
| Día 8-14 | Ramp up gradual: agregar 1 post programado vía API por día. Mantener actividad manual |
| Día 15+ | Habilitar full automation (4-7 posts/día programados según calendario MKT v3.0) |

**Quién hace los posts manuales del warm-up:** Fernando los publica desde el iPhone (5-10 min/día durante 2 semanas). Son interactuables como humano.

**Costo estimado en tiempo Fernando:** 5-10 min/día × 14 días × 4 cuentas (X, IG, TikTok, LinkedIn) = ~5-10 hs total distribuido en 2 semanas. **Esto es inevitable**, no hay forma de saltearlo sin asumir riesgo de suspensión.

### NO mitigamos con

- ❌ Comprar followers / engagement (detección automática + costo + viola TOS).
- ❌ Usar VPN para "simular" actividad de múltiples ubicaciones (más sospechoso, no menos).
- ❌ Automatizar el warm-up con scripts (defeats the purpose).

---

## RIESGO 2 — Geolocalización IP argentina

### Descripción

Cuando creás una cuenta Business desde IP argentina, Twitter/Instagram/TikTok asocian la cuenta como "operada desde Argentina". Eso puede:

- Restringir alcance orgánico en mercados objetivo (USA, EU) si los algoritmos priorizan content "local-first".
- Activar verificaciones extra para cuentas Business AR (Argentina tiene perfil de "alto riesgo de fraude" según reportes de comunidad).
- Limitar acceso a algunas funciones beta (Twitter Spaces monetization, IG Shopping, TikTok Creator Marketplace) que están geo-bloqueadas.

### Mitigación adoptada

**Aceptar la realidad** (no usar VPN — hace más mal que bien):

1. Crear cuentas declarando explícitamente como **país operativo: Argentina** en cada plataforma. Coherente con AUREX como persona física Fernando Moscon AR.
2. **Idioma de la app cuenta = inglés** (ya decidido en v3.0). Plataforma sabe AR pero la cuenta apunta global.
3. **Targeting orgánico via contenido**: las plataformas reasignan alcance según engagement por audiencia. Si los seguidores son globales, el alcance se globaliza.
4. **Aceptar que el alcance inicial puede ser AR-skew** durante warm-up + primeras semanas.

### Acción Code

Documentar en cada cuenta el "Country" como Argentina. NO mentir sobre eso.

---

## RIESGO 3 — Línea 2563 ya en WhatsApp Business → conflicto verificación SMS

### Descripción

Twitter, Instagram, TikTok, Facebook a veces piden verificación SMS al teléfono. Si la 2563 está vinculada a WhatsApp Business activamente, puede haber:

- SMS de verificación que se filtra al WhatsApp Business (no llega como SMS estándar).
- Detección por la plataforma de que el número "ya está en uso comercial" → pide número alternativo.
- Bloqueo de uso del 2563 si la plataforma lo categoriza como "número ya registrado en otro servicio".

**Adicionalmente — riesgo nuevo post-WA-002:** la 2563 está en watch period de WhatsApp. Cualquier evento extra sobre ese número (verificación SMS de Twitter, etc.) puede ser detectado por anti-fraud y agravar el watch period.

### Mitigación adoptada

**Estrategia escalonada:**

1. **Primera opción**: en cada plataforma, **omitir el SMS si la plataforma lo permite** (Twitter y TikTok lo permiten — solo email).
2. **Si exige SMS**: usar **+54 11 6789-1320** (Fernando personal, NO la 2563). El 1320 NO está en WhatsApp Business activo.
3. **NUNCA usar 2563 para verificación SMS de otra plataforma** mientras siga en watch period WA-002. La excepción es WhatsApp mismo (cuando se decida reactivar).

### Acción Code

Documentar en Bloque 8 (orden de apertura) el flag explícito "TELÉFONO RECOMENDADO PARA SMS = 1320, no 2563" durante todo el período de watch period WhatsApp.

---

## RIESGO 4 — Múltiples cuentas mismo día desde mismo IP/dispositivo

### Descripción

Cuando creás Twitter, Instagram, TikTok, YouTube, LinkedIn Company, Telegram channel **el mismo día desde mismo iPhone Fernando + IP residencial argentina**, las plataformas tienen heurísticas que detectan:

- Mismo device fingerprint en signups simultáneos → "bot net".
- Mismo IP origin para múltiples cuentas Business → "fraude coordinado".
- Mismo recovery phone (1320) para múltiples cuentas → "operador único", marca como sospechoso.

**Resultado posible**: una o varias de las cuentas creadas en el mismo día caen en captcha extendido o suspensión temporal antes de poder operar.

### Mitigación adoptada

**Distribuir creación en 3-4 días, NO el mismo día:**

| Día | Cuentas a crear | Justificación |
|---|---|---|
| Día 1 | Pre-requisitos (Gmail si no existe, Authenticator) + Telegram channel | Telegram tiene cero anti-fraud, sirve de "warm-up" del flujo |
| Día 2 | YouTube + LinkedIn Company Page | Google y LinkedIn tienen anti-fraud bajo para Business legítimos |
| Día 3 | Twitter + Facebook Page | Plataformas con anti-fraud medio |
| Día 4 | Instagram Business (vinculada a FB Page del día 3) + TikTok | Las más estrictas, último |

**Total: 4 días en lugar de 1.** Cada día Fernando dedica 30-60 min de su tiempo. Eso permite que cada plataforma "absorba" la cuenta nueva y no detecte el patrón de creación masiva.

### Riesgo aceptado

Aún con distribución en 4 días, si las plataformas comparten signals de anti-fraud (Meta entre FB+IG, etc.), pueden detectar el patrón. **No es 100% evitable**, solo se reduce probabilidad.

---

## RIESGO 5 — Recovery email enlazando accounts en grafo Google

### Estado: RESUELTO en Bloque 3

`app.aurex@gmail.com` con recovery `aurextester12@gmail.com` (NO `fmoscon@gmail.com`). Aísla el grafo de Google de la identidad personal. Ver `docs/BLOQUE_3_EMAIL_IDENTIDAD.md` para detalle.

---

## RIESGO 6 — Aprobaciones API pendientes bloquean timing Fase C

### Descripción

Para Fase C (apertura + activación de automation):

- **TikTok Content Posting API**: aprobación manual TikTok 1-3 semanas externamente. Si rechazan o demoran, plan táctico v3.0 se afecta.
- **Meta Graph API permissions** (`instagram_content_publish`, `pages_manage_posts`): App Review Meta puede tardar 3-5 días o más, especialmente si rechazan por documentación insuficiente.
- **Twitter Developer API**: free tier es auto-aprobado típicamente, pero "Elevated" access (que necesitamos para read+write robusto) puede requerir aplicación adicional.

### Mitigación adoptada

**Fallbacks en cascada documentados:**

1. **Si TikTok Content Posting NO aprueba** → uso manual mensual via Loomly (Fernando NO interviene, lo hace Code en VM remota o Loomly schedule). Documentado en Bloque 1.
2. **Si Meta Graph rechaza permisos**: fallback Buffer Business plan (~$15/mes) que ya tiene los permisos negociados con Meta. PERO costo no autorizado por Fernando — alternativa: **publicación manual de Reels desde el iPhone** durante warm-up + primer mes, hasta que Meta apruebe. Lo hace Fernando 2 veces/semana (10 min/sesión).
3. **Si Twitter Elevated rechaza**: free tier alcanza para 1.500 posts/mes/app — suficiente para nuestro volumen.

### Plan táctico

Aplicar las APIs **el mismo día de crear la cuenta**, así arranca el reloj externo de aprobación en paralelo a los 14 días de warm-up. Cuando warm-up termine, las APIs ya deberían estar aprobadas.

---

## RIESGO 7 — Apple/Google detectan creación simultánea Business + iPhone Fernando

### Descripción

Apple App Store Connect y Google Play Console ya tienen registrada la cuenta Fernando Moscon como developer. Si en simultáneo abre múltiples cuentas Business (Facebook Page, IG Business, TikTok Business, LinkedIn Company) desde el mismo iPhone, **Apple/Google puede recibir signals de "actividad comercial intensa post-aprobación"** que activen revisión adicional sobre Build 17.

**Probabilidad: baja-media.** Apple/Google generalmente NO comparten data con Meta/Twitter, pero device fingerprint + signups burst pueden ser leídos como "rampa comercial agresiva".

### Mitigación adoptada

**Ya integrado en Riesgo 4 (distribución en 4 días).** Aparte:

- NO crear las cuentas Business **antes** de que Apple apruebe Build 17. Mientras Apple revisa, pueden interpretar la actividad comercial como cambio en la naturaleza de la app.
- **Esperar luz verde Apple Build 17 antes de Fase C** del Paso CERO. Si esto agrega días al timeline, vale la pena.

### Sincronización con timeline Apple/Google

| Item | Fecha esperada |
|---|---|
| Apple Build 17 día 10 | hoy 3-may |
| Apple decisión típica | ~10-14 días desde submit = ~7-10 may |
| Google Play closed testing día 10 de 14 | hoy |
| Google Play vencimiento testing | ~9-may |
| **Inicio recomendado Fase C** | **post-aprobación Apple + Google ≈ 12-15 may** |

---

## RIESGO 8 (NUEVO 3-may-2026) — Servicios Business + Web automation NO oficial

### Descripción

Lección estructural del incidente WA-002: **cualquier servicio comercial (Business) que sufra automation Web NO oficial dispara anti-fraud cíclicamente**. Aplica a:

- **Twitter API v2 con cuenta Business**: relativamente seguro porque la API es oficial. Riesgo bajo.
- **Meta Graph API con cuentas Business**: oficial, pero Meta tiene anti-fraud agresivo en cambios de contenido masivo. Riesgo medio.
- **TikTok Content Posting API**: oficial pero todavía joven (2024+). Heurísticas pueden ser estrictas. Riesgo medio.
- **LinkedIn Marketing API**: oficial pero requiere app review extenso. Si se aprueba, robusto.
- **WhatsApp Business + Evolution Web**: NO oficial. **CONFIRMADO de la peor categoría — incidente WA-002.** Patrón inviable.
- **Instagram via Buffer / Hootsuite**: usa la API oficial Meta Graph. Riesgo bajo si Buffer tiene approval.

### Mitigación adoptada

**Regla inviolable adoptada para AUREX (memoria persistente `project_whatsapp_business.md` y aplicable más allá de WhatsApp):**

1. **NUNCA usar automation Web NO oficial sobre cuentas Business** (Evolution Web, Selenium, Playwright headless contra plataformas comerciales).
2. **SI o SI usar APIs oficiales** (Twitter API, Meta Graph, TikTok Content Posting, YouTube Data, LinkedIn Marketing).
3. **Si una API oficial rechaza approval, plan B = uso manual** (Fernando publica desde iPhone) NO Web automation.
4. **Aceptar que la velocidad inicial será menor** que si pudiéramos automatizar todo desde día 1. La estabilidad a largo plazo lo compensa.

### Implicancias para el plan

- TikTok: si Content Posting API NO aprueba en S0, NO usamos Web automation como fallback. Manual o esperar.
- Meta IG Reels: si Meta rechaza permisos, NO usamos Buffer scraping. Manual o esperar.
- LinkedIn: solo Buffer (con su API legítima Meta) o publicación manual.

---

## OUTPUT DEL BLOQUE 5

✅ **8 riesgos identificados con mitigación específica.**

✅ **3 riesgos nuevos detectados HOY** (3-may-2026) que el v1 inicial del Paso CERO no contemplaba:
- Warm-up insuficiente (#1) — tiempo Fernando necesario 5-10 hs en 2 semanas.
- Distribución signups en 4 días (#4) — no todo el mismo día.
- **Servicios Business + Web no oficial = riesgo cíclico (#8)** — lección WA-002 aplicada cross-platform.

✅ **Sincronización con timeline Apple/Google**: Fase C arranca post-aprobación Apple Build 17 + Google Play, no antes. Eso agrega ~10 días al timeline original pero reduce riesgo Apple/Google de revisión adicional.

⏳ **Pendientes para Bloque 8** (orden de apertura por dependencias técnicas):
- Distribución en 4 días con día asignado a cada cuenta.
- Plan de warm-up por cuenta con copy del primer post manual.
- Flag explícito "TELÉFONO PARA SMS = 1320, no 2563".

---

## REGLAS OPERATIVAS APLICADAS A AUREX (regla anti-bloqueo cross-platform)

Adoptadas hoy 3-may-2026 tras incidente WA-002:

1. **Solo APIs oficiales para Business.** No Web automation NO oficial.
2. **Warm-up de 14 días en cada cuenta nueva.** Manual.
3. **Distribución de signups en 4 días.** No todo el mismo día.
4. **2563 NO se usa para verificación SMS** de plataformas distintas a WhatsApp mientras siga en watch period.
5. **Fase C post-aprobación stores.** No antes.
6. **Si una API oficial rechaza, plan B = manual.** No Web scraping.

---

*BLOQUE_5_RIESGOS.md — Bloque 5 cerrado el 3-may-2026. Próximo: Bloque 6 (disclaimer regulatorio en bios — formalizar coherencia con Bloque 1).*
