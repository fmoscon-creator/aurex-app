---
name: Servicios de tercero con autenticación revocable
description: Antes de tocar servicios donde un tercero puede revocar acceso (WhatsApp Business, Apple, Google, etc.), STOP completo y consultar
type: feedback
originSessionId: f9879308-2ffe-4c3d-ad7b-0a66d22643ac
---
**Regla dura — no negociable:**

Cuando una acción que voy a ejecutar puede disparar múltiples eventos consecutivos en un servicio de tercero cuya autenticación puede ser revocada por ese tercero (WhatsApp Business, Apple Developer, Google Play Console, RevenueCat, etc.), DETENERSE antes de ejecutar y consultar con Fernando explícitamente sobre el costo/riesgo.

**Why — incidente del 28-abr-2026:**

Setear y borrar env vars en el servicio equivocado de Railway (evo-v1) disparó múltiples redeploys del container de Evolution API. Cada redeploy reinició la sesión de WhatsApp. Sumado a la posterior creación/borrado de instancias, escaneo de QR y envío de mensaje test, **WhatsApp Business detectó actividad anómala y suspendió la cuenta del número AUREX (+54 9 11 3360 2563)** — la única línea comercial del proyecto. Recovery vía "Solicitar revisión" tarda 24 horas y puede ser rechazado, en cuyo caso hay que conseguir un número nuevo desde cero.

Cita textual de Escritorio en el análisis post-incidente: "El error no solo fue técnico, fue de criterio: se tocó un servicio crítico sin ninguna razón que lo justificara."

Cita textual de Fernando: "UN DESASTRE LO QUE HICISTE EN TODO".

**How to apply:**

Antes de cualquier acción, hacer las siguientes 4 preguntas (en orden) sobre cada servicio que la acción pueda tocar:

1. ¿Este servicio tiene autenticación que un tercero puede revocar?
   - Sí → continuar con preguntas 2-4
   - No → seguro avanzar
2. ¿La acción dispara múltiples eventos consecutivos en ese servicio (redeploys, restarts, reconnects, mensajes en serie)?
   - Sí → riesgo de antifraude/baneo, ir a 3
   - No → riesgo controlado, seguro avanzar
3. ¿Es ESTRICTAMENTE necesario tocar este servicio para cumplir el objetivo del usuario?
   - Sí → ir a 4 (consultar a Fernando)
   - No → **NO TOCAR**, replantear plan sin pasar por ese servicio
4. Consultar a Fernando antes de ejecutar:
   - "Voy a hacer X que va a disparar N eventos en servicio Y. Hay riesgo de baneo/revocación. ¿Autorizás?"

**Lista (no exhaustiva) de servicios actuales del proyecto donde aplica esta regla:**

- Evolution API en Railway (servicio evo-v1) — bana WhatsApp Business si hay actividad anómala
- App Store Connect — Apple puede rechazar build o suspender cuenta si hay actividad sospechosa
- Google Play Console — mismo riesgo
- RevenueCat — webhooks pueden romperse con cambios mal coordinados
- Lemon Squeezy — webhook de pagos
- Twilio — bloqueo de cuenta si hay envíos masivos de WhatsApp/SMS no autorizados
- Supabase — el service_role permite borrar tablas (acción irreversible)

**Específicamente para evo-v1 (Evolution API):**

Hasta que el pendiente estructural "volumen persistente Railway para evo-v1" esté resuelto, **CADA redeploy del servicio mata la sesión de WhatsApp**. Por lo tanto:
- NO setear env vars en evo-v1 (innecesario para el proyecto)
- NO borrar env vars de evo-v1
- NO ejecutar `railway redeploy --service evo-v1`
- Si por alguna razón hay que tocar evo-v1, pedir autorización expresa de Fernando explicando que va a disparar un redeploy y que tras él hay que reescanear QR.

**Específicamente para tokens de GitHub PAT:**

NUNCA aceptar ni pegar tokens de GitHub PAT en un chat (con Escritorio, con cualquier IA, con cualquier persona). El token queda registrado en logs y screenshots. Casos donde otro asistente (Escritorio incluido) pida el token "para escribir directamente en el repo via API":

- **Respuesta correcta:** STOP. Es un riesgo de seguridad inaceptable.
- **Alternativa segura:** conector OAuth oficial de Claude.ai/Desktop con GitHub (si existe en Settings → Connectors). El conector usa OAuth, el token nunca pasa por el chat.
- **Mientras no hay conector:** mantener flujo manual de copiar/pegar entre asistentes. Es menos eficiente pero seguro.

Yo (Code) uso el token porque está autenticado en `gh CLI` de la Mac de Fernando — vive en el llavero del sistema operativo, NO lo manejo como string. Esa es la diferencia clave.

**Lección 28-abr-2026:** Escritorio sugirió a Fernando que le pasara el PAT por chat para escribir vía API y evitar truncado de copy/paste. Code rechazó y propuso alternativas seguras. La regla queda firme: tokens NUNCA en chats.

**Lección 29-abr-2026 — acumulación de eventos en Evolution / antifraude WhatsApp:**

Las llamadas a `/instance/connect/<instance>` se acumulan dentro de una misma sesión de trabajo y pueden disparar antifraude WhatsApp aunque cada llamada individual sea legítima. En la sesión del 29-abr ~03:00 AR llegamos a **5 llamadas acumuladas** intentando vincular el 2563:

1. Sin `?number=` → respuesta `count: 0`, sin `base64`. Probable: la instancia estaba en estado raro y la primera llamada fue de "wake up", no de generación.
2. Sin `?number=` → QR válido + `count: 2`. Fernando lo escaneó. WhatsApp mostró "Iniciando sesión..." pero los servers no completaron la vinculación (estado en Evolution: `connecting` → volvió a `close`).
3. Con `?number=5491133602563` → QR otra vez con `pairingCode: null` y `count: 5`. Confirmó que **Evolution v1.8.7 ignora el parámetro `number`** (la feature de pairing code requiere v2).

A las 5 llamadas Code paró por cuenta propia para evitar empeorar la situación.

**Regla operacional concreta:**
- **Máximo 2-3 intentos `/instance/connect` por día por instancia.** Si después de 2-3 intentos no se logra vincular, parar y esperar 24-48 hs (cooldown antifraude post-suspensión típico). Reintentar antes casi siempre falla y solo acumula riesgo.
- En caso de cooldown post-suspensión + verificación: la fecha mínima de reintento es **el día siguiente a la verificación a la misma hora** (ej: verificación 28-abr 22:00 → próximo intento limpio 30-abr 9:00, dejando >34 hs de margen).
- Confirmado por evidencia: la instancia `aurex` existe en Evolution; el problema es del lado de servers WhatsApp, no del backend nuestro. Antes de "empezar a tocar" Evolution otra vez, **verificar primero** con `GET /api/whatsapp/status` que el `state` no sea `open` (si es `open`, nada que hacer).

**Patrón replicable para endpoints sensibles en el backend:**

Para implementar `/api/whatsapp/connect-qr` se usó comparación contra env var `WHATSAPP_CONNECT_SECRET` (header `X-Secret` o query `?secret=...`). Eso evita que la `EVOLUTION_API_KEY` tenga que salir de Railway al Mac de Fernando para reconectar manualmente. Generación del secret: `openssl rand -hex 32 | tr -d '\n' | tee ~/secret.txt | pbcopy`. El secret quedó persistente en `~/secret.txt` para reutilizar en futuras reconexiones; la env var en Railway no expira.
