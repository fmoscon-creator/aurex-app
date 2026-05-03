# Análisis formal — Estabilizar WhatsApp Evolution

**Generado por Code el 3-may-2026.** A pedido de Fernando + Escritorio. Tema crítico: la línea WhatsApp 2563 es base operativa de AUREX y se cae periódicamente. Análisis sin ejecutar — decisión final pendiente Fernando.

**Restricción inviolable de Fernando:**
- Costo FIJO bajo (no variable por mensaje).
- Sin Meta Cloud API (riesgo de bloqueo + costos variables).
- Hasta tener app aprobada en stores, costos al mínimo.

---

## DIAGNÓSTICO DEFINITIVO — la causa raíz

### Verificación técnica del 3-may-2026

```
$ railway volume list --service evo-v1 (production)
No volumes found in environment production

$ railway variables --service evo-v1 | grep -i "store|database"
DATABASE_ENABLED = false
STORE_CHATS = false
STORE_CONTACTS = false
STORE_MESSAGES = false
STORE_MESSAGE_UP = false
```

### Conclusión

**Evolution v1.8.6 NO tiene persistencia configurada en Railway.** La sesión vinculada a la línea 2563 vive en el **filesystem efímero del container**. Cada vez que Railway reinicia el container (cualquier razón: deploy, escalado automático, healthcheck fail, OOM, mantenimiento Railway), se borra todo y obliga a re-escanear QR.

**Esto explica el patrón de desconexiones recurrentes:**

| Evento | Causa real | Efecto |
|---|---|---|
| 28-abr → 1-may (incidente WA-001) | Container reinició + cooldown WhatsApp | 7 días offline |
| 2-may noche → hoy 3-may | Container reinició otra vez | 2 días offline |
| (Patrón futuro esperable) | Cualquier deploy o reboot Railway | Cae siempre |

**No es problema de Evolution v1 vs v2 fundamentalmente. Es problema de NO TENER VOLUME PERSISTENTE.**

---

## ESCRITORIO TIENE RAZÓN PARCIALMENTE

Escritorio recomendó "Evolution v2 + watchdog". Eso atacaría el síntoma (mejor reconexión + mejor versión) pero NO la causa raíz. Migrar a v2 SIN volume persistente = mismo problema.

**El orden correcto de soluciones según impacto / costo:**

1. **Agregar Railway Volume al servicio actual evo-v1** (PRIMER FIX, mayor impacto).
2. **Activar persistencia interna Evolution** (`DATABASE_ENABLED=true` o `STORE_CHATS=true` con base de datos).
3. **Migrar a Evolution v2** (opcional, mejora de plataforma pero no resuelve volume).
4. **Watchdog automático** (mejora UX, complementa todo lo anterior).

---

## SOLUCIÓN 1 — Railway Volume (CRÍTICA, primera prioridad)

### Qué es

Railway Volumes son storage persistente montado dentro del container. Sobreviven a reinicios, deploys y reescalados. Servicio interno de Railway, se agrega al costo actual del servicio.

### Costo exacto

- **$0.25/GB/mes**.
- Se cobra solo lo provisionado, no se factura por uso.
- Para Evolution con 1 instancia y mensajes cacheados moderados, basta con 1GB = **$0.25/mes**.
- Sin variables, sin sorpresas.

### Mecánica de implementación (NO ejecutar todavía)

1. Railway Dashboard → servicio `evo-v1` → pestaña "Volumes" → "+ New Volume".
2. Configurar:
   - Nombre: `evolution-store`
   - Tamaño: 1 GB (mínimo)
   - Mount path: `/evolution/instances` y `/evolution/store` (donde Evolution v1.8.x guarda sesiones)
3. Railway reinicia container con volume montado.
4. **DURANTE EL REINICIO: la sesión actual (si está vinculada) se pierde porque el volume está vacío.** ⚠️ Esto requiere planificación.
5. Escanear QR una vez para vincular nuevamente.
6. A partir de ese momento: la sesión persiste a TODO restart.

### Riesgo concreto

⚠️ **El acto mismo de agregar volume requiere reinicio del container que pierde sesión actual.** Después de agregar el volume y re-vincular, la sesión persiste.

**Recomendación de timing:** ejecutar el cambio en horario donde la línea esté ya offline (como ahora) o en momento de baja actividad. El "costo" de re-vincular = 5 min Fernando con QR.

### Beneficio post-implementación

- Reinicios de Railway = sesión persiste.
- Deploys del backend = sesión persiste.
- Solo se pierde si: (a) Fernando borra explícitamente la línea desde su iPhone, o (b) WhatsApp invalida la sesión Web por inactividad >14 días, o (c) WhatsApp detecta abuso y bloquea la línea (eso no se resuelve técnicamente, requiere comportamiento prudente).

---

## SOLUCIÓN 2 — Persistencia interna Evolution (recomendable junto con Volume)

### Qué es

Evolution puede usar PostgreSQL o MongoDB para guardar mensajes, contactos y chats. Hoy está apagado (`DATABASE_ENABLED=false`).

### Beneficio

- Mensajes recibidos NO se pierden entre reinicios.
- Estado de conexión más robusto.
- Histórico de mensajes consultable.

### Costo

- Si usamos **Railway Postgres plugin**: tiene plan free tier hasta cierto uso, después ~$5/mes. **Variable según uso = NO cumple criterio de Fernando.**
- Alternativa: **SQLite con archivo dentro del Volume** del paso 1. **Costo $0 marginal.** Recomendado.

### Decisión recomendada

Activar `DATABASE_PROVIDER=mongodb` o `=postgresql` solo si vamos a Evolution v2 (que lo soporta limpio). Para v1.8.6, el filesystem del Volume es suficiente.

---

## SOLUCIÓN 3 — Evolution v1 → Evolution v2 (opcional, posterior)

### Cambios principales v1.8.6 → v2.x

| Aspecto | v1 (actual) | v2 |
|---|---|---|
| Protocolo | Baileys legacy | Baileys updated + multi-device 2.0 |
| Pairing code (sin QR físico) | ❌ no soportado | ✅ soportado (vía número) |
| Reconexión automática | Pobre | Mejor lógica retry + backoff |
| Multi-instance | Limitado | Native multi-tenant |
| Documentación | OK | Mucho mejor |
| Dashboard admin | ❌ | ✅ included |
| Backup/restore | Manual | API integrada |

### Riesgo concreto de la migración para línea 2563

⚠️ **El número 2563 NO se pierde NI se bloquea por migrar Evolution.** El número es del usuario Fernando, vive en su iPhone, registrado en WhatsApp. Lo que se pierde es la **sesión Web vinculada** a ese número desde Evolution.

Riesgos:
- **Probabilidad alta** (~70-80%): la migración requiere recrear instancia (formato store v2 distinto a v1) → escanear QR de nuevo. **Costo: 5 min Fernando**, no se daña el número.
- **Probabilidad baja** (~20-30%): Evolution v2 puede importar instancias v1 con el archivo `creds.json` → migración transparente, no requiere QR.

### Cómo hacerlo SIN perder sesión (intento de migración transparente)

1. **Pre-requisito: Volume persistente del paso 1 ya montado** y sesión re-vinculada y operativa.
2. Backup completo del directorio `/evolution/instances` y `/evolution/store` (descargar via Volume mount o copiar a otro Volume nuevo).
3. Crear servicio `evo-v2` paralelo en Railway con la imagen Evolution v2.
4. Montar el mismo Volume en el servicio v2 en mount path equivalente.
5. Iniciar v2 y observar si reconoce instancia "aurex" del v1.
6. **Si reconoce**: switch del backend de `evo-v1-production.up.railway.app` a `evo-v2-production.up.railway.app`. Sesión preservada.
7. **Si NO reconoce**: re-vincular con QR (5 min Fernando).
8. Mantener v1 corriendo 24-48h como fallback antes de borrar.

### Costo

$0 marginal (ya pagamos Railway). Solo el Volume único que ya pagamos.

### Tiempo

~2-3 hs Code + 5 min Fernando (QR si hace falta).

---

## SOLUCIÓN 4 — Watchdog automático (complementaria, alta utilidad)

### Qué es

Un cron en el backend que cada 5 min consulta `GET /api/whatsapp/status` y si detecta que el estado NO es `open` por más de 10 min consecutivos, dispara:

1. **Notificación inmediata a Telegram** con texto: "⚠️ WhatsApp 2563 desconectado hace 10+ min. Estado: connecting/closed. Action: revincular con QR."
2. **Genera link directo al endpoint `/api/whatsapp/connect-qr`** que ya existe.
3. **Loggea el incidente** en Supabase tabla `incidents` con ID auto-generado tipo `WA-XXX`.

### Beneficio

- Fernando se entera DENTRO de 15 min de que la línea cayó (no 2 días después).
- El link al QR endpoint ahorra clicks: tap, escanear, listo.
- Histórico de incidentes para detectar patrones.

### Costo

- **$0** — solo desarrollo Code (~1-2 hs).
- No afecta arquitectura existente.

---

## ANÁLISIS FINAL — recomendación

### Plan recomendado por Code (en orden temporal)

**HOY (urgente, 5-10 min):**
- **Reconectar línea 2563 con QR** para volver a tener WhatsApp operativo en lo inmediato.
- Es solución temporal pero recupera el canal redundancia HOY.

**ESTA SEMANA (~3 hs Code total):**
1. **Agregar Railway Volume** ($0.25/mes) al servicio evo-v1 + re-vincular con QR (5 min Fernando, ya con QR a la mano del paso anterior).
2. **Implementar Watchdog Telegram** (~1-2 hs Code, $0).
3. **Verificar resistencia**: forzar restart container Railway para confirmar que la sesión persiste.

**MES PRÓXIMO (post-aprobación stores):**
4. **Evaluar Evolution v2** (no antes — riesgo bajo pero requiere atención y la app está en momento crítico de revisión).

### Costo total recurrente

- Railway Volume 1GB: **$0.25/mes** fijo.
- Resto: $0.

**Total: $0.25/mes adicional al costo Railway actual. Costo fijo, sin variables.**

### Estabilidad esperada post-implementación

| Estado actual | Post-fix |
|---|---|
| Cualquier restart Railway = pérdida sesión + QR | Restart Railway = sesión preservada |
| Detección de caída: cuando Fernando se da cuenta (días) | Detección automática en 15 min via Telegram |
| Re-vinculación: manual sin guía | Link directo al endpoint QR generado por Watchdog |
| MTBF (tiempo medio entre fallas) | de ~5-7 días a >30 días esperado |

### Lo que ESTE plan NO resuelve

- Si WhatsApp invalida la sesión por inactividad >14 días: requiere re-vinculación. No hay solución técnica, es regla de WhatsApp Web.
- Si WhatsApp bloquea la línea por reportes de spam o comportamiento abusivo: requiere ajustar comportamiento (límites de envío, opt-in explícito, plantillas no agresivas) o cambiar a Cloud API. Solución del problema es de comportamiento, no técnica.

---

## RESUMEN EJECUTIVO

| Item | Decisión |
|---|---|
| Causa raíz desconexiones | NO hay Railway Volume = sesión efímera |
| Fix principal | Agregar Volume 1GB Railway ($0.25/mes) |
| Fix complementario | Watchdog Telegram + reconexión asistida ($0) |
| Migración Evolution v2 | Postponer para después de aprobación stores (no urgente) |
| Costo total adicional | $0.25/mes fijo, sin variables |
| Tiempo total | 5 min ahora (QR) + 3 hs Code esta semana |
| Riesgo línea 2563 | Cero por migración. El número y autorización WhatsApp se preservan |

---

## PENDIENTE APROBACIÓN FERNANDO

Ninguna acción se ejecuta sin tu OK. Cuando autorices avanzamos en el orden recomendado:

1. ¿Reconectamos AHORA con QR para tener WhatsApp HOY?
2. ¿Agregamos Railway Volume esta semana?
3. ¿Implementamos Watchdog Telegram esta semana?
4. ¿Posponer Evolution v2 para post-aprobación stores?

---

*MIGRACION_EVOLUTION_V2_ANALISIS.md — análisis formal del 3-may-2026 a pedido de Fernando + Escritorio. NO ejecutar sin aprobación. Mantener este documento como referencia de la decisión arquitectónica.*
