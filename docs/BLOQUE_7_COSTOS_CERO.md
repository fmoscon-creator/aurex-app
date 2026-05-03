# BLOQUE 7 — Costos cero confirmados hasta approval stores

**Generado por Code el 3-may-2026.** Inventario formal de TODOS los servicios, plataformas, suscripciones y APIs que AUREX necesita para operar el Paso CERO + Plan MKT v3.0 Fase 1, con clasificación por tipo de costo. **Restricción inviolable de Fernando**: hasta tener app aprobada en stores, costos al mínimo, fijos preferiblemente, NUNCA variables agresivos.

---

## TABLA MAESTRA — costos por servicio al 3-may-2026

| # | Servicio | Tipo | Costo actual | Costo Plan MKT v3.0 ejecutándose | Bloqueo / Acción |
|---|---|---|---|---|---|
| 1 | **Railway aurex-app** (PWA + backend) | Recurrente | Plan Hobby $5/mes (ya pagás) | $5/mes (sin cambio) | ✅ activo |
| 2 | **Railway evo-v1** (Evolution WhatsApp) | Recurrente | Incluido en Hobby | Incluido | ✅ activo (en pausa por WA-002) |
| 3 | **Railway Volume `evo-v1-volume`** | Recurrente | $1.25/mes (5GB × $0.25) | $1.25/mes | ✅ creado hoy |
| 4 | **Supabase** | Recurrente | Free tier (≤500MB DB + 1GB storage + 2GB bandwidth) | Sigue Free tier para volumen actual | ✅ activo |
| 5 | **GitHub Pages (aurex.live)** | Recurrente | $0 | $0 | ✅ activo |
| 6 | **Cloudflare DNS aurex.live** | Recurrente | $0 (Free plan) | $0 | ✅ activo |
| 7 | **Dominio aurex.live registry** | Anual | ~$11/año pagado (renueva ~oct 2026) | $11/año | ✅ pago |
| 8 | **Apple Developer Program** | Anual | $99/año pagado | $99/año | ✅ pago |
| 9 | **Google Play Developer** | Único | $25 pago una vez | $0 (no recurre) | ✅ pago |
| 10 | **RevenueCat (suscripciones IAP)** | Variable según volumen | $0 (Free tier hasta $10k MTR) | $0 hasta $10k MTR (mucho margen) | ✅ activo |
| 11 | **Lemon Squeezy (PWA)** | Variable transaccional | $0 base + 5% + $0.50 por transacción cuando haya | $0 hasta primera venta | ✅ configurado, sin uso |
| 12 | **Resend (email transaccional)** | Variable según volumen | $0 (Free tier 3.000 emails/mes) | $0 mientras estemos <3.000/mes | ✅ a configurar |
| 13 | **Twilio WhatsApp (fallback)** | Variable por mensaje | $0 mientras NO se use | $0 (solo se activa si WA Evolution falla y autorizamos) | ⏸️ configurado pero pausado |
| 14 | **Twitter/X API Free tier** | Recurrente | $0 (1.500 posts/mes/app) | $0 (volumen cabe en Free tier) | ⏳ a aplicar |
| 15 | **Telegram Bot API** | Recurrente | $0 (gratis ilimitado) | $0 | ✅ activo |
| 16 | **YouTube Data API v3** | Recurrente | $0 (cuotas suficientes) | $0 | ⏳ a configurar |
| 17 | **Meta Graph API (FB + IG)** | Recurrente | $0 | $0 | ⏳ a aplicar |
| 18 | **TikTok Content Posting API** | Recurrente | $0 | $0 | ⏳ a aplicar |
| 19 | **LinkedIn Marketing API** | Recurrente | $0 | $0 (uso via Buffer Free) | ⏳ a aplicar |
| 20 | **Buffer** (scheduler IG/LinkedIn) | Recurrente | $0 (Free tier 3 cuentas + 10 posts cola) | $0 mientras Free tier alcance | ⏳ a evaluar — NO se activa si Free tier cubre |
| 21 | **ElevenLabs (voz IA videos búho)** | Variable | $0 (Free tier 10.000 caracteres/mes) | $0-5/mes según volumen | ⏳ ya tengo SECRET ELEVENLABS.txt |
| 22 | **Runway / Pika (animación búho IA)** | Variable créditos | $0 (Free tier 50-100 créditos/mes) | $0 (1-2 videos premium/semana caben en Free) | ⏳ ya tengo SECRET RUNWAY.txt |
| 23 | **Tawk.to chat (ELITE feature future)** | Recurrente | $0 (Free tier ilimitado) | $0 | ⏳ ya configurado, ELITE feature pendiente |
| 24 | **Wire services (press releases)** | Variable por release | $0 hoy | ~$300-500/release × 4-6/año = $1.500-3.000 año 1 | ⏸️ NO se activa hasta lanzamiento producción |

---

## RESUMEN DE COSTOS

### Costos FIJOS recurrentes mensuales activos HOY

| Categoría | Costo |
|---|---|
| Railway Hobby plan | $5.00/mes |
| Railway Volume `evo-v1-volume` | $1.25/mes |
| **TOTAL FIJO MENSUAL** | **$6.25/mes** |

### Costos VARIABLES potenciales (NO activos hoy, se activan solo si se autoriza)

| Servicio | Trigger de activación | Costo aproximado |
|---|---|---|
| Twilio WhatsApp | Si WA Evolution falla Y autorizamos uso (lección WA-002 → no autorizado) | ~$0.005/mensaje (~$1/mes con volumen actual closed testing) |
| Resend > 3k emails/mes | Si crecemos mucho post-lanzamiento | ~$20/mes hasta 50k |
| ElevenLabs > 10k chars/mes | Si producimos muchos videos | ~$5/mes |
| Runway/Pika > Free tier | Si producimos muchos videos premium | $10-15 puntual |
| Buffer Business | Si decidimos automatizar IG/LinkedIn más allá de Free tier | $15/mes |
| Wire services press releases | Solo lanzamientos puntuales | $300-500/release |

### Costos ANUALES

| Item | Costo |
|---|---|
| Apple Developer | $99/año (renovación abril 2027) |
| Dominio aurex.live | ~$11/año (renovación octubre 2026) |
| **TOTAL ANUAL** | **$110/año** |

### Costos ÚNICOS pagados

- Google Play Developer: $25 (único, no renueva).

---

## SERVICIOS DESCARTADOS POR COSTO O RIESGO

| Servicio | Por qué se descarta |
|---|---|
| **Meta WhatsApp Cloud API** | Costo variable + riesgo de bloqueo Business + restricciones contenido. Decisión Fernando 3-may |
| **Whapi.cloud / Wassenger / WAAPI** | $10-30/mes fijo PERO usa WhatsApp Web internamente = mismo riesgo que Evolution |
| **Heygen Pro** (avatar IA video) | $24-99/mes — eliminado al adoptar búho v2 con tier free Runway/Pika (decisión 30-abr) |
| **Buffer Business plan** | $15/mes — descartado durante closed testing (Free tier alcanza). Reevaluar post-aprobación |
| **LLC USA + Mercury bank** | Setup complejo + $300-500 + $50-100/mes mantenimiento. Descartado para AUREX persona física AR (decisión 3-may) |
| **Google Payments con cuenta USA Wise** | Apple/Google AR exigen CBU local en USD. No aplica para AUREX persona física (decisión 3-may) |

---

## REGLA INVIOLABLE PARA EL PASO CERO + FASE 1

Hasta que **AUREX tenga app aprobada en App Store + Google Play producción** (no closed testing) Y **tenga al menos 100 usuarios activos pagos PRO**, NO se activan costos variables.

**Excepciones permitidas (costo fijo bajo):**
- Railway Volume $1.25/mes (lección WA-002, requerido para estabilidad).
- Reactivación de Twilio si WhatsApp Evolution NO se reactiva y necesitamos WhatsApp post-aprobación. Decisión post-fase de evaluación.

---

## OUTPUT DEL BLOQUE 7

✅ **24 servicios inventariados** con costo actual + costo proyectado en Fase 1 MKT.

✅ **Costo FIJO mensual actual confirmado: $6.25/mes** (Railway Hobby + Volume).

✅ **Costo ANUAL adicional: $110/año** (Apple Developer + dominio).

✅ **Costos variables ALL stopped** hasta autorización explícita post-aprobación stores + tracción.

✅ **6 servicios descartados** documentados con razón.

✅ **Regla inviolable formalizada**: cero variables hasta aprobación + 100 PRO pagos.

---

*BLOQUE_7_COSTOS_CERO.md — Bloque 7 cerrado el 3-may-2026. Próximo: Bloque 8 (orden de apertura por dependencias técnicas — el último).*
