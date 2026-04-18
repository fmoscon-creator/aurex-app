# MANUAL DE ALERTAS WHATSAPP Y REPORTES DE SEGURIDAD AUREX

**Estado**: Verificado contra código real
**Última actualización**: 18/abril/2026
**Autores**: CODE + Escritorio
**Repo**: aurex-backend (server.js + alertImage.js)

---

## 1. ARQUITECTURA DEL SISTEMA

### 1.1 Componentes

| Componente | Función | Ubicación |
|-----------|---------|-----------|
| Evolution API v1.8.7 | Envío de mensajes WhatsApp | Railway servicio evo-v1 |
| server.js | Lógica de alertas, health check, crons | Railway servicio aurex-app |
| alertImage.js | Generación de imágenes para alertas | Railway servicio aurex-app |
| health_events (Supabase) | Persistencia de alertas con IDs | Supabase |
| Fuentes Inter (TTF) | Tipografía en imágenes | assets/fonts/ |

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
| Función | `dispararAlerta(alerta, precio)` — server.js L118 |
| Envío | Imagen generada → fallback texto Evolution → fallback Twilio |
| Fuente precios | Binance (crypto) + Alpha Vantage (stocks) |
| Análisis | Claude API genera análisis IA breve por alerta |
| Historial | Guarda en tabla `alertas_historial` |

### 2.2 Alertas de sistema (solo admin Fernando)

Se disparan automáticamente cuando un servicio crítico falla.

| Tipo | Prefijo ID | Qué monitorea | Intervalo |
|------|-----------|---------------|-----------|
| Evolution API | WA | Estado conexión WhatsApp (state = open) | 5 min |
| Supabase | DB | Query de prueba a tabla usuarios | 5 min |
| Binance | BN | Fetch BTC price con timeout 5s | 5 min |
| IA Signals | IA | Último cálculo > 10 minutos | 5 min |
| System | SYS | Reservado para alertas manuales | Manual |

---

## 3. SISTEMA DE IDs

### 3.1 Formato

```
[PREFIJO]-[NÚMERO DE 3 DÍGITOS]
Ejemplos: WA-001, DB-003, BN-012, IA-001, SYS-001
```

### 3.2 Generación

- Función: `getNextAlertId(type)` — server.js L700
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

### 4.1 Apertura

```
1. healthCheck() detecta fallo
2. Verifica que NO haya alerta active del mismo tipo (dedup)
3. Genera alert_id consecutivo (ej: BN-003)
4. Inserta en health_events: status=active
5. Genera imagen SYSTEM ALERT con ID
6. Envía WhatsApp imagen + caption con ID
7. Marca notified=true
```

Función: `openAlert(type, message)` — server.js L712

### 4.2 Resolución

```
1. healthCheck() detecta recuperación
2. Busca alerta active del tipo
3. Calcula duración (resolved_at - triggered_at)
4. Actualiza: status=resolved, duration_seconds
5. Envía WhatsApp texto: "✅ RESOLVED BN-003 — Duration: 4m 32s"
6. Marca resolution_notified=true
```

Función: `resolveAlert(type)` — server.js L738

### 4.3 Dedup

- Si ya existe una alerta `active` del mismo tipo → NO crea otra
- Dos incidentes separados = dos IDs diferentes
- Ejemplo: BN-003 (active → resolved), luego BN-004 (nuevo incidente)

### 4.4 Cooldown

- 15 minutos entre alertas repetidas del mismo tipo
- Variable: `HEALTH_COOLDOWN = 15 * 60 * 1000` — server.js L698
- Evita spam si un servicio parpadea

---

## 5. TABLA SUPABASE: health_events

### 5.1 Columnas (verificadas contra Supabase real)

| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | uuid (PK, auto) | ID interno Supabase |
| alert_id | text | ID visible: WA-001, DB-001, etc. |
| type | text | evolution / supabase / binance / ia_stale / system |
| status | text | active / resolved |
| message | text | Descripción del problema |
| resolution_message | text | Descripción de la resolución |
| triggered_at | timestamptz | Cuándo se disparó |
| resolved_at | timestamptz | Cuándo se resolvió |
| duration_seconds | integer | Duración del incidente en segundos |
| notified | boolean | Si se envió WhatsApp de apertura |
| resolution_notified | boolean | Si se envió WhatsApp de cierre |

### 5.2 Índices

- `idx_health_events_type_status` — búsqueda rápida por tipo + estado
- `idx_health_events_triggered` — ordenar por fecha

---

## 6. TEMPLATES DE IMAGEN WHATSAPP

### 6.1 Tecnología

| Componente | Librería | Función |
|-----------|----------|---------|
| Canvas | pureimage (100% JS, sin binarios nativos) | Dibuja texto, formas, fondos |
| Logo composite | sharp | Superpone logo + resize Retina 2x |
| Fuentes | Inter TTF (Bold, Medium, Regular) | Texto legible en todas las plataformas |

### 6.2 Resolución

- Canvas: 800x400 pixels
- Resize final: 1600x800 (Retina 2x, Lanczos3)
- Logo: 100px, transparente, mismo para dark y light

### 6.3 Cuatro templates

| Template | Tipo | Subtítulo | Contenido |
|----------|------|-----------|-----------|
| IA | `ia` | AI Alert | Ticker + BULLISH/BEARISH + % + Price/Target/Stop + barra probabilidad |
| Precio | `precio` | Price Alert | Ticker + TARGET REACHED + Current Price vs Target + Difference % |
| Pulse | `pulse` | AUREX Pulse | 5 cards (Global/Crypto/Stocks/Commod/Futures) con scores + zonas |
| Admin | `admin` | System Alert | Alert ID + tipo + mensaje error + timestamp |

### 6.4 Diseño visual

- **Fondo dark**: #0D1117 (como la app)
- **Fondo light**: #F5F0E8 (crema dorado AUREX)
- **Fondo admin**: #1A0808 (dark) / #FFF0F0 (light)
- **Borde superior**: 4px color acento
- **Cards**: accent bar lateral 5px + borde 2px + fondo card
- **Colores**: gold #D4A017, green #3FB950, red #F85149 (iguales dark y light)
- **Líneas header/footer**: gold 2px
- **Idioma**: Inglés, formato numérico americano

### 6.5 Captions por tipo

| Tipo | Formato caption |
|------|----------------|
| IA | `📈 BTC BULLISH 82% / 🎯 Target $72,846 / aurex.live` |
| Precio | `🎯 ETH $3,850.00 Now / +10.0% of Target / aurex.live` |
| Pulse | `💓 AUREX Pulse 72 · Greed / Global Market Sentiment / aurex.live` |
| Admin | `🚨 ALERT BN-003 — Binance DOWN / timestamp / aurex.live` |

### 6.6 Cadena de fallback

```
1. Genera imagen (pureimage) → envía via Evolution sendMedia
2. Si imagen falla → envía texto plano via Evolution sendText
3. Si Evolution falla → envía via Twilio WhatsApp
```

---

## 7. REPORTE DIARIO

### 7.1 Configuración

| Dato | Valor |
|------|-------|
| Función | `dailyHealthReport()` — server.js L806 |
| Cron | `0 11 * * *` (11:00 UTC = 08:00 AM Argentina) |
| Canal | WhatsApp texto a admin |
| Fuente datos | Tabla health_events últimas 24h |

### 7.2 Formato del reporte

```
📊 AUREX Daily Health Report
━━━━━━━━━━━━━━━━━━

✅ RESOLVED (2):
  BN-003  binance  4m
  WA-012  evolution  3m

🔴 ACTIVE (1):
  DB-007  supabase  ⚠️

Total: 2 resolved, 1 active
━━━━━━━━━━━━━━━━━━
aurex.live
```

### 7.3 Si no hubo incidentes

```
📊 AUREX Daily Health Report
━━━━━━━━━━━━━━━━━━

✅ All systems operational.
No incidents in last 24h.

aurex.live
```

### 7.4 Límite de filas

- Máximo 6 alertas resueltas visibles
- Si hay más: "... and X more"
- Alertas activas: todas visibles (son urgentes)

---

## 8. ENDPOINTS

### 8.1 WhatsApp

| Método | Ruta | Función | Auth |
|--------|------|---------|------|
| POST | `/api/whatsapp/send` | Enviar texto (numero + mensaje) | No |
| POST | `/api/whatsapp/test-image` | Enviar imagen alerta test | No |
| GET | `/api/whatsapp/status` | Estado conexión Evolution | No |
| POST | `/api/test-admin-alert` | Enviar alerta admin test | No |
| POST | `/api/test-whatsapp` | Enviar via Twilio (fallback) | No |

### 8.2 Parámetros test-image

```json
{
  "numero": "5491167891320",
  "type": "ia | precio | pulse | admin",
  "symbol": "BTC",
  "direction": "ALCISTA | BAJISTA | ALTA CONV-IA",
  "probability": 82,
  "price": 67450,
  "target": 72846,
  "stop": 64752,
  "theme": "dark | light",
  "pulseScore": 72,
  "pulseCrypto": 69,
  "pulseStocks": 85,
  "pulseCommod": 21,
  "pulseFutures": 90,
  "message": "texto para admin"
}
```

---

## 9. CRON JOBS

| Job | Intervalo | Función | Línea |
|-----|-----------|---------|-------|
| checkAlertas | 30 seg | Alertas de precio usuario → WhatsApp | L152 |
| calcularPulse | 5 min | Scores AUREX Pulse | L680 |
| calcularSenalesIA | 5 min | Señales IA 350 activos | L686 |
| healthCheck | 5 min | Verifica 4 servicios → alerta si falla | L762 |
| dailyHealthReport | 08:00 AR (11:00 UTC) | Reporte diario | L806 |

---

## 10. ARCHIVOS

| Archivo | Función |
|---------|---------|
| server.js | Todo: endpoints, crons, alertas, health check |
| alertImage.js | 4 templates de imagen (IA, Precio, Pulse, Admin) |
| assets/logo.png | Logo AUREX transparente (dark mode) |
| assets/logo-dark.png | Logo AUREX fondo negro (light mode) |
| assets/fonts/Inter-Bold.ttf | Fuente bold |
| assets/fonts/Inter-Medium.ttf | Fuente medium |
| assets/fonts/Inter-Regular.ttf | Fuente regular |

---

## 11. LÍMITES POR PLAN

| Plan | Alertas WhatsApp/día | Estado |
|------|---------------------|--------|
| FREE | 0 (solo push) | Codificado, no activo |
| PRO | 3 | Codificado, no activo |
| ELITE | 10 | Codificado, no activo |

**NOTA**: Los límites están en el código pero el cron `checkAlertas` aún no los aplica. Envía a todos los que tienen `whatsapp_numero` en la alerta.

---

## 12. TESTING

### 12.1 Enviar alerta IA test

```bash
curl -X POST https://aurex-app-production.up.railway.app/api/whatsapp/test-image \
  -H "Content-Type: application/json" \
  -d '{"numero":"5491167891320","type":"ia","symbol":"BTC","direction":"ALCISTA","probability":82,"price":67450,"target":72846,"stop":64752,"theme":"dark"}'
```

### 12.2 Verificar estado WhatsApp

```bash
curl https://aurex-app-production.up.railway.app/api/whatsapp/status
# Respuesta OK: {"instance":{"instanceName":"aurex","state":"open"}}
```

### 12.3 Enviar alerta admin test

```bash
curl -X POST https://aurex-app-production.up.railway.app/api/test-admin-alert \
  -H "Content-Type: application/json" \
  -d '{"subject":"Test","body":"Prueba del sistema de alertas"}'
```

### 12.4 Verificar health_events en Supabase

```bash
# Via API REST con service key
curl "$SUPABASE_URL/rest/v1/health_events?select=*&order=triggered_at.desc&limit=10" \
  -H "apikey: $SUPABASE_SERVICE_KEY" \
  -H "Authorization: Bearer $SUPABASE_SERVICE_KEY"
```

---

## 13. INCIDENTES DOCUMENTADOS

| Fecha | ID | Tipo | Descripción | Duración |
|-------|-----|------|-------------|----------|
| 17/abril 01:50 | BN-001 | Binance | Falla conexión Railway→Binance | ~5 min (auto-resuelto) |
| 17/abril ~15:30 | — | Backend | Deploy roto por `railway up` desde CLI | ~1 hora |

### 13.1 Incidente Railway 17/abril

- **Causa**: `railway up` desde carpeta /backend subió archivos sin Node.js
- **Fix**: nixpacks.toml + NIXPACKS_NO_CACHE=1 + railway redeploy
- **Lección**: NUNCA usar `railway up`, SIEMPRE push a GitHub
- **Documentado en**: MANUAL_ESTRUCTURAL.md Sección 3

---

*Generado por CODE para AUREX — 18/abril/2026*
