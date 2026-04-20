# MANUAL DE ALERTAS WHATSAPP Y REPORTES DE SEGURIDAD AUREX

**Estado**: Verificado contra código real
**Última actualización**: 20/abril/2026
**Autores**: CODE + Escritorio
**Repo**: aurex-backend (server.js + alertImage.js)

---

## 1. ARQUITECTURA DEL SISTEMA

### 1.1 Componentes

| Componente | Función | Ubicación |
|-----------|---------|-----------|
| Evolution API v1.8.7 | Envío de mensajes WhatsApp | Railway servicio evo-v1 |
| server.js | Lógica de alertas, health check, crons, fallbacks | Railway servicio aurex-app |
| alertImage.js | Generación de imágenes para alertas (4 templates) | Railway servicio aurex-app |
| health_events (Supabase) | Persistencia de alertas con IDs y estados | Supabase |
| daily_reports (Supabase) | Historial de reportes diarios | Supabase |
| monthly_reports (Supabase) | Historial de reportes mensuales | Supabase |
| Fuentes Inter (TTF) | Tipografía en imágenes (Bold, Medium, Regular) | assets/fonts/ |

### 1.2 Líneas WhatsApp

| Línea | Número | Función |
|-------|--------|---------|
| Emisora (AUREX) | +54 9 11 3360 2563 | Envía alertas a usuarios |
| Admin (Fernando) | +54 9 11 6789 1320 | Recibe alertas de sistema |

### 1.3 URLs

| Servicio | URL |
|----------|-----|
| Backend API | https://aurex-app-production.up.railway.app |
| Evolution API | https://evo-v1-production.up.railway.app |

---

## 2. TIPOS DE ALERTA

### 2.1 Alertas de usuario (para clientes PRO/ELITE)

Se disparan cuando un activo alcanza el precio objetivo configurado por el usuario.

| Dato | Valor |
|------|-------|
| Trigger | Cron `checkAlertas` cada 30 segundos |
| Función | `dispararAlerta(alerta, precio)` |
| Envío | Imagen generada → fallback texto Evolution → fallback Twilio |
| Fuente precios | Binance → CryptoCompare → CoinGecko → cache |
| Análisis | Claude API genera análisis IA breve por alerta |
| Historial | Guarda en tabla `alertas_historial` |

### 2.2 Alertas de sistema (solo admin Fernando)

Se disparan automáticamente cuando un servicio crítico falla.

| Tipo | Prefijo ID | Qué monitorea | Intervalo |
|------|-----------|---------------|-----------|
| Evolution API | WA | Estado conexión WhatsApp (state = open) | 5 min |
| Supabase | DB | Query de prueba a tabla usuarios | 5 min |
| Binance | BN | Fetch BTC price con timeout 5s + fallback directo | 5 min |
| CryptoCompare | CC | Fallback crypto cuando CryptoCompare cae | 5 min |
| Cache | CA | Todas las fuentes en vivo caídas, sirviendo cache | 5 min |
| IA Signals | IA | Último cálculo > 10 minutos | 5 min |
| System | SYS | Reservado para alertas manuales | Manual |

---

## 3. SISTEMA DE IDs

### 3.1 Formato

```
[PREFIJO]-[NÚMERO DE 3 DÍGITOS]
Ejemplos: WA-001, DB-003, BN-012, CC-001, CA-001, IA-001, SYS-001
```

### 3.2 Generación

- Función: `getNextAlertId(type)`
- Lee último alert_id del tipo en Supabase
- Extrae número, incrementa +1
- Pad a 3 dígitos: 1 → 001, 42 → 042
- Si no hay registros previos: empieza en 001

### 3.3 Unicidad

- Consecutivo por tipo (WA va por su cuenta, DB por la suya)
- No se reutilizan (WA-003 nunca se repite)
- El ID aparece en: imagen, caption WhatsApp, tabla Supabase, logs

---

## 4. CICLO DE VIDA DE UNA ALERTA

### 4.1 Tres estados

| Estado | Significado | WhatsApp | Icono |
|--------|-------------|----------|-------|
| ACTIVE | Servicio caído, alerta abierta | 🚨 Imagen SYSTEM ALERT + caption | 🔴 |
| MITIGATED | Servicio caído pero datos OK via fallback | 🟡 MITIGATED + fuente fallback | 🟡 |
| RESOLVED | Servicio restaurado | ✅ RESOLVED + duración | ✅ |

### 4.2 Apertura (ACTIVE)

```
1. healthCheck() detecta fallo
2. Verifica que NO haya alerta active del mismo tipo (dedup)
3. Genera alert_id consecutivo (ej: BN-003)
4. Inserta en health_events: status=active
5. Genera imagen SYSTEM ALERT con ID
6. Envía WhatsApp imagen + caption con ID
7. Marca notified=true
```

Función: `openAlert(type, message)`

### 4.3 Mitigación (MITIGATED)

```
1. healthCheck() detecta que servicio sigue caído
2. Prueba CryptoCompare directamente (5s timeout)
3. Si CryptoCompare OK → src = 'cryptocompare'
4. Si CryptoCompare falla → prueba CoinGecko (5s timeout)
5. Si fallback activo: busca alerta active con mitigated_at IS NULL
6. Actualiza: mitigated_at + mitigation_source
7. Envía WhatsApp: "🟡 MITIGATED BN-002 — data OK via cryptocompare"
8. Si ya fue mitigado: no hace nada (idempotente)
```

Función: `mitigateAlert(type, source)`

**Clave**: El healthCheck prueba los fallbacks **directamente** en el catch block de Binance. No depende de `fetchCryptoPriceBatch` ni de que existan alertas de usuario. Es autónomo.

### 4.4 Resolución (RESOLVED)

```
1. healthCheck() detecta recuperación (servicio responde OK)
2. Busca alerta active del tipo
3. Calcula duración (resolved_at - triggered_at)
4. Actualiza: status=resolved, resolved_at, duration_seconds
5. Envía WhatsApp: "✅ RESOLVED BN-003 — Duration: 4m 32s"
6. Marca resolution_notified=true
```

Función: `resolveAlert(type)`

### 4.5 Diagrama de flujo

```
                    Servicio cae
                         │
                    ┌─────▼─────┐
                    │  ACTIVE   │  🚨 WhatsApp imagen
                    │  (alert)  │
                    └─────┬─────┘
                          │
              ┌───────────┴───────────┐
              │                       │
     Fallback activo          Servicio vuelve
     (CC/CG OK)               (Binance OK)
              │                       │
        ┌─────▼─────┐          ┌─────▼─────┐
        │ MITIGATED │          │ RESOLVED  │
        │  (datos   │  🟡      │ (cerrado) │  ✅
        │   OK via  │          └───────────┘
        │  fallback)│
        └─────┬─────┘
              │
       Servicio vuelve
              │
        ┌─────▼─────┐
        │ RESOLVED  │  ✅ WhatsApp texto + duración
        └───────────┘
```

### 4.6 Dedup

- Si ya existe una alerta `active` del mismo tipo → NO crea otra
- Dos incidentes separados = dos IDs diferentes
- Ejemplo: BN-003 (active → resolved), luego BN-004 (nuevo incidente)

### 4.7 Cooldown

- 15 minutos entre alertas repetidas del mismo tipo
- Variable: `HEALTH_COOLDOWN = 15 * 60 * 1000`
- Evita spam si un servicio parpadea

---

## 5. FALLBACK DE PRECIOS CRYPTO

### 5.1 Cadena de fallback (fetchCryptoPriceBatch)

| Orden | Fuente | Endpoint | Límite gratuito |
|-------|--------|----------|----------------|
| 1 (primaria) | Binance | `/api/v3/ticker/price` (batch) | Ilimitado |
| 2 (fallback) | CryptoCompare | `/data/pricemulti` (batch) | 100k calls/mes |
| 3 (fallback) | CoinGecko | `/api/v3/simple/price` (batch) | 10k calls/mes |
| 4 (emergencia) | Cache local | En memoria (TTL 30min) | — |

### 5.2 Comportamiento

- Cada precio incluye: `{ price, source, stale, ts }`
- `global._lastCryptoSource` se actualiza con cada fetch exitoso
- Cache de emergencia: TTL 30 minutos, marcado como `stale: true`

### 5.3 healthCheck prueba fallbacks directamente

Cuando Binance falla en el healthCheck, el catch block prueba CryptoCompare y CoinGecko **directamente** con timeout de 5 segundos cada uno, sin depender de `fetchCryptoPriceBatch`.

### 5.4 Alertas en cascada

| Situación | Alerta BN | Alerta CC | Alerta CA |
|-----------|-----------|-----------|-----------|
| Binance OK | — | — | — |
| Binance DOWN, CC OK | BN-xxx ACTIVE | — | — |
| Binance DOWN, CC DOWN, CG OK | BN-xxx ACTIVE | CC-xxx ACTIVE | — |
| Todo DOWN, sirviendo cache | BN-xxx ACTIVE | CC-xxx ACTIVE | CA-xxx ACTIVE |
| Todo DOWN, sin cache | BN-xxx ACTIVE | CC-xxx ACTIVE | CA-xxx ACTIVE (no data) |
| Binance vuelve | BN RESOLVED | CC RESOLVED | CA RESOLVED |

---

## 6. RESTAURACIÓN DE ESTADO AL REINICIAR

### 6.1 Problema

Cuando Railway redeploya, `_health = {}` se reinicia vacío. Si había una alerta activa, el servidor pierde el flag.

### 6.2 Solución: restoreHealthState()

Lee alertas `active` de Supabase y restaura `_health[type] = true`.

### 6.3 Orden de inicialización

```javascript
restoreHealthState().then(() => {
  cron.schedule('*/5 * * * *', healthCheck);
  cron.schedule('0 11 * * *', dailyHealthReport);
  cron.schedule('0 21 28-31 * *', monthlyHealthReport);
});
```

Los crons SOLO arrancan después de restaurar el estado.

---

## 7. TABLA SUPABASE: health_events

### 7.1 Columnas

| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | uuid (PK, auto) | ID interno Supabase |
| alert_id | text | ID visible: WA-001, BN-002, CC-001, CA-001 |
| type | text | evolution / supabase / binance / cryptocompare / cache / ia_stale / system |
| status | text | active / resolved |
| message | text | Descripción del problema |
| resolution_message | text | Descripción de la resolución |
| triggered_at | timestamptz | Cuándo se disparó |
| resolved_at | timestamptz | Cuándo se resolvió |
| duration_seconds | integer | Duración del incidente en segundos |
| notified | boolean | Si se envió WhatsApp de apertura |
| resolution_notified | boolean | Si se envió WhatsApp de cierre |
| mitigated_at | timestamptz | Cuándo se mitigó (fallback activo) |
| mitigation_source | text | Fuente del fallback: cryptocompare / coingecko |

### 7.2 Índices

- `idx_health_events_type_status` — búsqueda rápida por tipo + estado
- `idx_health_events_triggered` — ordenar por fecha

---

## 8. TABLA SUPABASE: daily_reports

| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | uuid (PK, auto) | ID interno |
| reported_at | timestamptz | Cuándo se generó |
| resolved_count | integer | Alertas resueltas en las últimas 24h |
| active_count | integer | Alertas activas al momento del reporte |
| total_count | integer | Total incidentes en las últimas 24h |
| report_text | text | Texto completo del reporte enviado por WhatsApp |
| events_snapshot | jsonb | Snapshot de health_events al momento del reporte |

---

## 9. TABLA SUPABASE: monthly_reports

| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | uuid (PK, auto) | ID interno |
| reported_at | timestamptz | Cuándo se generó |
| month_label | text | "Abril 2026" |
| report_text | text | Texto completo del reporte mensual |
| total_incidents | integer | Total incidentes del mes |
| resolved_count | integer | Resueltos en el mes |
| active_count | integer | Activos al cierre del mes |
| services | jsonb | Stats por servicio (uptime %, fallback %, downtime) |
| events_snapshot | jsonb | Todos los eventos del mes |

---

## 10. REPORTE DIARIO

### 10.1 Configuración

| Dato | Valor |
|------|-------|
| Función | `dailyHealthReport()` |
| Cron | `0 11 * * *` (11:00 UTC = 08:00 AM Argentina) |
| Canal | WhatsApp texto a admin |
| Persistencia | Tabla `daily_reports` en Supabase |

### 10.2 Formato del reporte

```
📊 AUREX Daily Health Report
━━━━━━━━━━━━━━━━━━

🔌 CONEXIONES ACTUALES:
✅ Railway Backend
✅ Evolution API (state: open)
✅ Supabase
🟡 Binance → Fallback CryptoCompare OK
✅ Alpha Vantage

📋 INCIDENTES ÚLTIMAS 24H:
✅ BN-001 · binance · 18/abr 14:35 · Duración: 47m 48s
🟡 BN-002 · binance · 18/abr 15:30 · Sin resolver: 20h 40m (mitigated via cryptocompare)

Total: 1 resolved, 1 active
━━━━━━━━━━━━━━━━━━
aurex.live
```

### 10.3 Bloque CONEXIONES ACTUALES

Verifica en tiempo real al generar el reporte:
- **Railway Backend**: siempre Online si el proceso corre
- **Evolution API**: fetch al endpoint connectionState, verifica state = open
- **Supabase**: query de prueba a tabla usuarios
- **Binance**: fetch con 5s timeout; si falla, muestra fallback activo (CryptoCompare/CoinGecko/cache)
- **Alpha Vantage**: check liviano con GLOBAL_QUOTE

### 10.4 Si no hubo incidentes

```
📊 AUREX Daily Health Report
━━━━━━━━━━━━━━━━━━

🔌 CONEXIONES ACTUALES:
✅ Railway Backend
✅ Evolution API (state: open)
✅ Supabase
✅ Binance
✅ Alpha Vantage

📋 INCIDENTES ÚLTIMAS 24H:
✅ No incidents in last 24h.

━━━━━━━━━━━━━━━━━━
aurex.live
```

---

## 11. REPORTE MENSUAL

### 11.1 Configuración

| Dato | Valor |
|------|-------|
| Función | `monthlyHealthReport()` → `_buildAndSendMonthlyReport()` |
| Cron | `0 21 28-31 * *` (21:00 UTC = 18:00 AR, últimos días del mes) |
| Ejecución | Solo el último día hábil del mes (no sábado ni domingo) |
| Canal | WhatsApp texto a admin |
| Persistencia | Tabla `monthly_reports` en Supabase |
| Test | `POST /api/health/test-monthly` (bypass verificación día hábil) |

### 11.2 Formato del reporte

```
📊 AUREX Monthly Report — Abril 2026
━━━━━━━━━━━━━━━━━━

📈 RESUMEN:
Total incidentes: 2
Resueltos: 1 · Activos: 1

🔌 UPTIME POR SERVICIO:
✅ Railway Backend · 100%
🟡 Binance · 1% primaria · 85% fallback
✅ CryptoCompare · 100%
✅ Price Sources · 100%
✅ Evolution API · 100%
✅ Supabase · 100%
✅ IA Signals · 100%
✅ Alpha Vantage · 100%

📋 INCIDENTES DEL MES:
🟡 BN-002 · 18/abr · 21h 54m+ (mitigated via cryptocompare)
✅ BN-001 · 18/abr · 47m 48s

━━━━━━━━━━━━━━━━━━
aurex.live
```

### 11.3 Cálculo de uptime

- **Período**: desde el primer evento del mes hasta ahora (no el mes completo, para meses parciales)
- **Downtime**: suma de `duration_seconds` (resueltos) + elapsed (activos)
- **Mitigated time**: tiempo entre `mitigated_at` y `resolved_at` (o now si sigue activo)
- **Primary %**: `Math.max(0, (total - downtime) / total * 100)`
- **Fallback %**: `mitigated_time / total * 100`

---

## 12. ENDPOINT DE MONITOREO

### 12.1 GET /api/health/status

Endpoint público que devuelve el estado actual sin credenciales.

```
GET https://aurex-app-production.up.railway.app/api/health/status
```

### 12.2 Respuesta

```json
{
  "ok": true,
  "timestamp": "2026-04-20T...",
  "lastCryptoSource": "cryptocompare",
  "activeFlags": { "binance": true },
  "events": [...],
  "dailyReports": [...],
  "monthlyReports": [...]
}
```

| Campo | Descripción |
|-------|-------------|
| lastCryptoSource | Fuente activa: binance / cryptocompare / coingecko / cache / unknown |
| activeFlags | Estado en memoria de `_health` — servicios marcados como caídos |
| events | Últimas 20 alertas de health_events |
| dailyReports | Últimos 7 reportes diarios |
| monthlyReports | Últimos 3 reportes mensuales |

---

## 13. TEMPLATES DE IMAGEN WHATSAPP

### 13.1 Tecnología

| Componente | Librería | Función |
|-----------|----------|---------|
| Canvas | pureimage (100% JS, sin binarios nativos) | Dibuja texto, formas, fondos |
| Logo composite | sharp | Superpone logo + resize Retina 2x |
| Fuentes | Inter TTF (Bold, Medium, Regular) | Texto legible en todas las plataformas |

### 13.2 Resolución

- Canvas: 800x400 pixels
- Resize final: 1600x800 (Retina 2x, Lanczos3)
- Logo: 100px, transparente, mismo para dark y light

### 13.3 Cuatro templates

| Template | Tipo | Subtítulo | Contenido |
|----------|------|-----------|-----------|
| IA | `ia` | AI Alert | Ticker + BULLISH/BEARISH + % + Price/Target/Stop + barra probabilidad |
| Precio | `precio` | Price Alert | Ticker + TARGET REACHED + Current Price vs Target + Difference % |
| Pulse | `pulse` | AUREX Pulse | 5 cards (Global/Crypto/Stocks/Commod/Futures) con scores + zonas |
| Admin | `admin` | System Alert | Alert ID + tipo + mensaje error + timestamp |

### 13.4 Cadena de fallback

```
1. Genera imagen (pureimage) → envía via Evolution sendMedia
2. Si imagen falla → envía texto plano via Evolution sendText
3. Si Evolution falla → envía via Twilio WhatsApp
```

---

## 14. ENDPOINTS

### 14.1 WhatsApp

| Método | Ruta | Función |
|--------|------|---------|
| POST | `/api/whatsapp/send` | Enviar texto (numero + mensaje) |
| POST | `/api/whatsapp/test-image` | Enviar imagen alerta test |
| GET | `/api/whatsapp/status` | Estado conexión Evolution |
| POST | `/api/test-admin-alert` | Enviar alerta admin test |
| POST | `/api/test-whatsapp` | Enviar via Twilio (fallback) |

### 14.2 Monitoreo

| Método | Ruta | Función |
|--------|------|---------|
| GET | `/api/health/status` | Estado alertas + flags + reportes |
| POST | `/api/health/test-report` | Forzar reporte diario |
| POST | `/api/health/test-monthly` | Forzar reporte mensual |

---

## 15. CRON JOBS

| Job | Intervalo | Función |
|-----|-----------|---------|
| checkAlertas | 30 seg | Alertas de precio usuario → WhatsApp |
| calcularPulse | 5 min | Scores AUREX Pulse |
| calcularSenalesIA | 5 min | Señales IA 350 activos |
| healthCheck | 5 min | Verifica servicios → alerta/mitigar/resolver + fallbacks directo |
| dailyHealthReport | 08:00 AR (11:00 UTC) | Reporte diario + persistencia |
| monthlyHealthReport | 18:00 AR (21:00 UTC) días 28-31 | Reporte mensual último día hábil |

**Nota**: healthCheck, dailyHealthReport y monthlyHealthReport solo arrancan después de que `restoreHealthState()` complete.

---

## 16. ARCHIVOS

| Archivo | Función |
|---------|---------|
| `server.js` | Todo: endpoints, crons, alertas, health check, fallbacks, reportes |
| `alertImage.js` | 4 templates de imagen (IA, Precio, Pulse, Admin) |
| `assets/logo.png` | Logo AUREX transparente (dark mode) |
| `assets/logo-dark.png` | Logo AUREX fondo negro (light mode) |
| `assets/fonts/Inter-Bold.ttf` | Fuente bold |
| `assets/fonts/Inter-Medium.ttf` | Fuente medium |
| `assets/fonts/Inter-Regular.ttf` | Fuente regular |

---

## 17. LÍMITES POR PLAN

| Plan | Alertas WhatsApp/día | Estado |
|------|---------------------|--------|
| FREE | 0 (solo push) | Codificado, no activo |
| PRO | 3 | Codificado, no activo |
| ELITE | 10 | Codificado, no activo |

**NOTA**: Los límites están en el código pero el cron `checkAlertas` aún no los aplica.

---

## 18. TESTING

### 18.1 Enviar alerta IA test

```bash
curl -X POST https://aurex-app-production.up.railway.app/api/whatsapp/test-image \
  -H "Content-Type: application/json" \
  -d '{"numero":"5491167891320","type":"ia","symbol":"BTC","direction":"ALCISTA","probability":82,"price":67450,"target":72846,"stop":64752,"theme":"dark"}'
```

### 18.2 Verificar estado WhatsApp

```bash
curl https://aurex-app-production.up.railway.app/api/whatsapp/status
```

### 18.3 Verificar estado de salud (monitoreo)

```bash
curl https://aurex-app-production.up.railway.app/api/health/status
```

### 18.4 Forzar reporte diario

```bash
curl -X POST https://aurex-app-production.up.railway.app/api/health/test-report
```

### 18.5 Forzar reporte mensual

```bash
curl -X POST https://aurex-app-production.up.railway.app/api/health/test-monthly
```

---

## 19. INCIDENTES DOCUMENTADOS

| Fecha | ID | Tipo | Descripción | Duración | Estado |
|-------|-----|------|-------------|----------|--------|
| 17/abr 01:50 | BN-001 | Binance | Falla conexión Railway→Binance | 47m 48s | RESOLVED |
| 17/abr ~15:30 | — | Backend | Deploy roto por `railway up` desde CLI | ~1 hora | RESOLVED |
| 18/abr 15:30 | BN-002 | Binance | Falla conexión Railway→Binance (us-east4) | 45h+ | MITIGATED via cryptocompare |

### 19.1 Incidente Railway 17/abril

- **Causa**: `railway up` desde carpeta /backend subió archivos sin Node.js
- **Fix**: nixpacks.toml + NIXPACKS_NO_CACHE=1 + railway redeploy
- **Lección**: NUNCA usar `railway up`, SIEMPRE push a GitHub

### 19.2 Incidente BN-002 18/abril

- **Causa**: Binance inaccesible desde Railway us-east4 (bloqueo permanente)
- **Detección**: healthCheck abrió BN-002 automáticamente
- **Mitigación**: CryptoCompare sirviendo datos correctamente
- **Bugs corregidos**:
  1. `restoreHealthState()` sin await → fix: `.then()`
  2. healthCheck dependía de `_lastCryptoSource` de `fetchCryptoPriceBatch` → fix: prueba fallbacks directo
- **Estado**: MITIGATED, 45h+ sin resolución. Binance bloqueado permanentemente desde Railway us-east4.
- **Análisis pendiente**: Evaluar alternativas post-Apple (Railway región, hosting, proxy)

---

*Generado por CODE para AUREX — 20/abril/2026*
