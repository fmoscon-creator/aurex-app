# 🚨 PLAN POST-CAÍDA RAILWAY — 19-may-2026 ~20:50 AR

> **Incidente confirmado oficial Railway**: Major Outage desde 19:29 AR (22:29 UTC) por problema upstream cloud vendor. Última actualización 20:37 AR — trabajando en restaurar workloads.
>
> **Estado actual:** Backend AUREX caído, app iOS muestra FREE+vacío, Build 31 IPA esperando.
>
> **Esto NO es nuestro código.** Cuando Railway vuelva, todo debería volver solo.

---

## 🎯 PLAN — 3 acciones para implementar APENAS RAILWAY VUELVA

### ACCIÓN 1 — Railway Project Token (permanente)

**Problema actual:** Mi Railway CLI usa OAuth. OAuth necesita refrescar token cada N horas pegándole al endpoint auth de Railway. Si Railway tiene outage del auth (como ahora), me bloqueo aunque solo quiera leer logs de un servicio que sigue corriendo.

**Solución:** Project Token (API key estática, no expira, no depende de OAuth refresh).

**Pasos Fernando (2 minutos, una sola vez):**
1. Abrir `https://railway.com/account/tokens` (cuando Railway responda)
2. Click **"Create Token"**
3. Nombre: `code-cli-aurex`
4. Permission: Read + Write
5. Copiar el string completo del token (`rwy_xxx...` típicamente)
6. Guardarlo en `~/Desktop/CODE/SECRET/SECRET RAILWAY TOKEN.txt`
7. Avisame con "token listo"

**Pasos Code (1 minuto, automático):**
1. Leer token de `~/Desktop/CODE/SECRET/SECRET RAILWAY TOKEN.txt`
2. Configurar `RAILWAY_TOKEN=xxx` como env var en shell por defecto (`~/.zshrc`)
3. Probar `RAILWAY_TOKEN=xxx railway status` para confirmar funciona
4. A partir de ahí, TODOS los comandos railway funcionan sin OAuth

**Beneficio:** Próxima caída de Railway → si solo cae OAuth pero los servicios siguen, puedo seguir leyendo logs y haciendo deploys. Si Railway entero cae, igual no puedo hacer nada (pero no es por mi token).

---

### ACCIÓN 2 — Monitor externo HEALTH backend AUREX

**Problema actual:** Las alertas de monitoreo (BN-, CC-, WA-, etc.) salen DESDE DENTRO del backend. Si el backend se cae, esas alertas también se caen → nadie te avisa. Hoy te enteraste de la caída solo porque viste el plan FREE en la app.

**Solución doble redundancia (ambas gratuitas):**

#### 2A — UptimeRobot (principal)
- Plan free: 50 monitors, intervalo 5 min, alertas email + SMS + webhook (Telegram via webhook)
- URL a monitorear: `https://aurex-app-production.up.railway.app/api/health` (creamos ese endpoint si no existe)
- Alert contacts: tu email + chat Telegram `1749518554` (admin) + email Code para tracking
- Tiempo setup: 10 min

#### 2B — GitHub Action cron (backup)
- File: `.github/workflows/health-check.yml` en repo aurex-backend o aurex-app
- Cron: cada 5 min
- Step 1: `curl` al endpoint `/api/health`
- Step 2: si HTTP no es 200 → POST a Telegram bot API con mensaje a chat `1749518554`
- Tiempo setup: 15 min
- Ventaja: si UptimeRobot también cae (raro), GitHub Action sigue funcionando (es otro proveedor)

#### Endpoint /api/health a crear en server.js
```js
app.get('/api/health', async (req, res) => {
  const checks = {};
  // Test 1: Supabase reachable
  try {
    const { error } = await supabase.from('usuarios').select('id', { count: 'exact', head: true }).limit(1);
    checks.supabase = error ? 'fail: ' + error.message : 'ok';
  } catch (e) { checks.supabase = 'fail: ' + e.message; }
  // Test 2: cron checkAlertas timestamp (heartbeat del cron)
  // (necesita guardar last_check_ts en memoria o Supabase)
  checks.crons = _lastCronAlertasTs ? 'ok (last: ' + new Date(_lastCronAlertasTs).toISOString() + ')' : 'fail: never ran';
  // Test 3: memory
  const mem = process.memoryUsage();
  checks.memory = (mem.heapUsed / 1024 / 1024).toFixed(0) + 'MB used';
  // Status final
  const allOk = Object.values(checks).every(v => v === 'ok' || (typeof v === 'string' && v.startsWith('ok')) || v.includes('MB'));
  res.status(allOk ? 200 : 503).json({ status: allOk ? 'healthy' : 'unhealthy', checks, ts: new Date().toISOString() });
});
```

**Beneficio:** Próxima caída → te llega alerta Telegram en ~5 min al chat admin sin que dependas de mirar la app por casualidad.

---

### ACCIÓN 3 — Fallback arquitectural para usuarios pagos (visión a futuro)

**Pregunta de Fernando:** "Imaginate que tenemos usuarios pagos y nos llega a pasar algo así más adelante????"

**Realidad cruda:** **Hoy esta caída habría afectado a TODOS los usuarios pagos por las ~2-3 horas que dura el outage.** No tenemos fallback. Las alertas no se dispararían, login fallaría, etc.

**Niveles de fallback ordenados por costo/complejidad:**

#### Nivel 1 — Mínimo viable (RECOMENDADO arrancar acá)
**Cambio:** mover los **endpoints críticos** + **cron checkAlertas** a **Supabase Edge Functions** (Deno serverless, hosteado por Supabase).

| Endpoint | Hoy | Propuesta |
|---|---|---|
| `GET /api/usuario/:id` (lee plan) | Railway | Supabase Edge Function |
| `POST /api/alertas` (crear alerta) | Railway | Supabase Edge Function |
| `GET /api/alertas/:userId` | Railway | Supabase Edge Function (o directo Supabase REST como ya usa frontend en algunos lados) |
| `cron */30s checkAlertas` | Railway | Supabase pg_cron (cron nativo de Postgres) ejecutando Edge Function |
| `cron */5min checkAlertasEvento` | Railway | Supabase pg_cron |
| Sending Telegram/WhatsApp/push | Railway | Edge Function (Deno tiene fetch nativo) |
| Servicio APIs externas (Binance, Yahoo, etc) | Railway | Edge Function |

**Lo que queda en Railway (no crítico para usuarios pagos):**
- Bot Telegram polling (recibir comandos `/start /estado`)
- Monitoring interno
- Cualquier debugging endpoint

**Beneficio:** Si Railway cae, **los usuarios pagos siguen recibiendo alertas, pueden ver plan, crear alertas, etc.** Solo se pierde el bot Telegram interactivo. Las alertas que el bot ENVÍA siguen funcionando.

**Costo:** $0 — Supabase tier gratis cubre nuestro volumen actual (alertas <86/user, cron 30s). Si volumen crece >500K invocaciones/mes, costo es ~$25/mes.

**Tiempo implementación:** ~1-2 días (no urgente, planificar próxima semana).

**Riesgo:** MEDIO. Migrar lógica de Express/Node a Deno tiene leves diferencias de API. Hay que portar funciones helper. Pero arquitectura es la misma.

#### Nivel 2 — Multi-cloud activo/pasivo (más serio)
**Cambio:** deploy mismo backend en Railway PRIMARIO + Render/Fly.io SECUNDARIO. DNS via Cloudflare con health check automático: si Railway no responde 3 veces, Cloudflare cambia DNS a Render.

**Beneficio:** transparente para usuarios, 99.99% uptime.

**Costo:** ~$10-20/mes (Render free tier limitado, podríamos necesitar plan starter).

**Tiempo implementación:** 1 semana.

**Riesgo:** ALTO. Mantener dos backends sincronizados (env vars, DB connections, secrets) requiere disciplina. Posibles inconsistencias si un deploy queda solo en un cloud.

#### Nivel 3 — CDN edge caching (complementario)
**Cambio:** Cloudflare Workers cachea respuestas críticas (precios cripto, listados) con TTL 30s. Si backend cae, Cloudflare sirve cache stale.

**Beneficio:** durante caída, app funciona "modo lectura" (ver datos, no crear).

**Costo:** Cloudflare Workers tier gratis suficiente.

**Tiempo:** 4-6 horas setup inicial.

**Riesgo:** BAJO si solo cachea endpoints idempotentes (GET).

#### Recomendación Code

**Para usuarios pagos:** implementar **Nivel 1 (Supabase Edge Functions)** dentro de las próximas 2 semanas. Es el cambio con mejor ratio beneficio/costo/tiempo:
- $0 costo extra
- 1-2 días implementación
- Resuelve el 80% del problema (alertas, plan, login siguen funcionando si Railway cae)
- Sin mantener 2 backends en paralelo

**Más adelante (cuando >100 usuarios pagos):** evaluar Nivel 2 si el uptime se vuelve crítico contractualmente.

**Nivel 3:** opcional, si queremos modo "solo lectura" durante caídas.

---

## 📋 ESTADO ACTUAL (situación inmediata)

| Sistema | Estado | Acción |
|---|---|---|
| Railway plataforma | 🔴 Major Outage oficial | Esperar resolución (Railway team trabajando) |
| Backend AUREX | 🔴 DOWN (404 Train no llegó) | Volverá solo cuando Railway se recupere |
| App iOS (Build 31) | 🟡 Instalada pero plan FREE forzado por backend down | Validar visual modal cuando backend vuelva |
| Supabase | 🟢 OK | — |
| GitHub | 🟢 OK | — |
| Code (CLI Railway) | 🔴 Bloqueado por OAuth 503 | Resolver con Project Token apenas Railway vuelva |

---

## 🎯 ACCIONES INMEDIATAS APENAS RAILWAY VUELVA

**Orden de ejecución (todas en la próxima sesión):**

1. **Fernando**: crear Railway Project Token y guardarlo en SECRET (2 min)
2. **Code**: configurar `RAILWAY_TOKEN` en shell (1 min)
3. **Code**: confirmar `railway status` funciona OK
4. **Fernando**: validar visualmente Build 31 modal centrado con position (modal MODAL 1+2)
5. Si Build 31 OK → cerramos sub-tema modal
6. Si Build 31 falla → Build 32 con nueva propuesta Code+Escritorio
7. **Code**: crear endpoint `/api/health` en server.js (15 min)
8. **Fernando**: setup UptimeRobot apuntando a `/api/health` (10 min)
9. **Code**: crear GitHub Action `.github/workflows/health-check.yml` (15 min)
10. **Code**: planificar migración Nivel 1 fallback (1-2 días, próxima semana)

---

## 📊 LECCIONES APRENDIDAS DE LA CAÍDA HOY

1. **Sin monitor externo no nos enteramos** — Fernando se enteró por accidente viendo plan FREE en la app
2. **Auto-heal Capa 2 enmascara el problema** — cuando `/api/usuario/:id` devuelve 404 (porque backend caído), la app cree que usuario es nuevo y le pone plan FREE default. Eso CONFUNDE al usuario (parece que perdió su sub pagada)
3. **Single point of failure crítico** — el backend Railway es el ÚNICO punto que sirve los 3 servicios: API + cron alertas + bot Telegram. Si cae, cae todo
4. **Token OAuth tiene dependencia circular** — si Railway está caído, ni siquiera puedo refrescar token para acceder al CLI

**Mitigaciones implementadas en este plan:** las 3 acciones de arriba resuelven los 4 puntos.

---

*Documento creado 19-may-2026 ~20:50 AR — Code para Fernando + Escritorio. Para ejecutar apenas Railway recupere servicio.*
