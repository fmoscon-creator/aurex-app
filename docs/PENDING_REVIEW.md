# PENDING REVIEW — Monthly Health Report

**Commit para review**: este archivo  
**Destino final**: aurex-backend/server.js  
**Autor**: CODE  
**Fecha**: 19/abril/2026  

---

## Cambio 1 — Función monthlyHealthReport()

Se agrega después de `dailyHealthReport()` (después de la línea `console.log('[HEALTH] Daily report sent + persisted');` y su `}` de cierre).

```javascript
async function monthlyHealthReport() {
  const now = new Date();
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const today = now.getDate();
  const dow = now.getDay();

  // Solo ejecutar el último día hábil del mes
  if (today === lastDay) {
    if (dow === 0 || dow === 6) return;
  } else if (today === lastDay - 1 && dow === 5) {
    // Viernes, mañana sábado es último día
  } else if (today === lastDay - 2 && dow === 5) {
    // Viernes, pasado domingo es último día
  } else {
    return;
  }

  await _buildAndSendMonthlyReport();
}

async function _buildAndSendMonthlyReport() {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const _mesesLargo = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  const monthLabel = _mesesLargo[now.getMonth()] + ' ' + now.getFullYear();

  // Eventos del mes
  const { data: events } = await supabase.from('health_events').select('*').gte('triggered_at', monthStart.toISOString()).order('triggered_at', { ascending: false });

  const allEvents = events || [];
  const resolved = allEvents.filter(e => e.status === 'resolved');
  const active = allEvents.filter(e => e.status === 'active');

  // Período real (desde primer evento o inicio de mes)
  const { data: firstEvent } = await supabase.from('health_events')
    .select('triggered_at')
    .gte('triggered_at', monthStart.toISOString())
    .order('triggered_at', { ascending: true })
    .limit(1);

  const periodStart = firstEvent && firstEvent.length > 0
    ? new Date(firstEvent[0].triggered_at)
    : monthStart;
  const totalSeconds = Math.round((now - periodStart) / 1000);

  // Stats por servicio
  const serviceTypes = ['binance', 'cryptocompare', 'cache', 'evolution', 'supabase', 'ia_stale'];
  const services = {};

  serviceTypes.forEach(function(type) {
    const typeEvents = allEvents.filter(e => e.type === type);
    const typeResolved = typeEvents.filter(e => e.status === 'resolved');
    const typeActive = typeEvents.filter(e => e.status === 'active');

    var downtime = 0;
    var mitigatedTime = 0;

    typeResolved.forEach(function(e) {
      downtime += e.duration_seconds || 0;
      if (e.mitigated_at && e.resolved_at) {
        mitigatedTime += Math.round((new Date(e.resolved_at) - new Date(e.mitigated_at)) / 1000);
      }
    });

    typeActive.forEach(function(e) {
      var elapsed = Math.round((now - new Date(e.triggered_at)) / 1000);
      downtime += elapsed;
      if (e.mitigated_at) {
        mitigatedTime += Math.round((now - new Date(e.mitigated_at)) / 1000);
      }
    });

    var primaryPct = totalSeconds > 0 ? Math.round(((totalSeconds - downtime) / totalSeconds) * 100) : 100;
    var fallbackPct = totalSeconds > 0 ? Math.round((mitigatedTime / totalSeconds) * 100) : 0;

    services[type] = {
      incidents: typeEvents.length,
      resolved: typeResolved.length,
      active: typeActive.length,
      total_downtime_sec: downtime,
      total_mitigated_sec: mitigatedTime,
      primary_pct: primaryPct,
      fallback_pct: fallbackPct
    };
  });

  // Helpers de formato
  var _meses = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  function _fmtDay(ts) {
    var d = new Date(new Date(ts).getTime() - 3 * 60 * 60 * 1000);
    return d.getDate() + '/' + _meses[d.getMonth()];
  }
  function _fmtDur(sec) {
    if (sec >= 3600) return Math.floor(sec / 3600) + 'h ' + Math.floor((sec % 3600) / 60) + 'm';
    if (sec >= 60) return Math.floor(sec / 60) + 'm ' + (sec % 60) + 's';
    return sec + 's';
  }

  var serviceLabels = {
    evolution: 'Evolution API',
    supabase: 'Supabase',
    binance: 'Binance',
    cryptocompare: 'CryptoCompare',
    cache: 'Price Sources',
    ia_stale: 'IA Signals'
  };

  // Construir mensaje
  var msg = '📊 AUREX Monthly Report — ' + monthLabel + '\n━━━━━━━━━━━━━━━━━━\n\n';

  msg += '📈 RESUMEN:\n';
  msg += 'Total incidentes: ' + allEvents.length + '\n';
  msg += 'Resueltos: ' + resolved.length + ' · Activos: ' + active.length + '\n\n';

  msg += '🔌 UPTIME POR SERVICIO:\n';
  msg += '✅ Railway Backend · 100%\n';

  serviceTypes.forEach(function(type) {
    var s = services[type];
    var label = serviceLabels[type];
    if (s.incidents === 0) {
      msg += '✅ ' + label + ' · 100%\n';
    } else if (s.fallback_pct > 0) {
      msg += '🟡 ' + label + ' · ' + s.primary_pct + '% primaria · ' + s.fallback_pct + '% fallback\n';
    } else if (s.active > 0) {
      msg += '🔴 ' + label + ' · ' + s.primary_pct + '% uptime · ' + s.active + ' activo(s)\n';
    } else {
      msg += '✅ ' + label + ' · ' + s.primary_pct + '% uptime\n';
    }
  });

  msg += '✅ Alpha Vantage · 100%\n\n';

  if (allEvents.length > 0) {
    msg += '📋 INCIDENTES DEL MES:\n';
    allEvents.slice(0, 10).forEach(function(e) {
      var day = _fmtDay(e.triggered_at);
      if (e.status === 'resolved') {
        msg += '✅ ' + e.alert_id + ' · ' + day + ' · ' + _fmtDur(e.duration_seconds || 0) + '\n';
      } else {
        var elapsed = Math.round((now - new Date(e.triggered_at)) / 1000);
        var mitInfo = e.mitigated_at ? ' (mitigated via ' + e.mitigation_source + ')' : '';
        msg += '🟡 ' + e.alert_id + ' · ' + day + ' · ' + _fmtDur(elapsed) + '+' + mitInfo + '\n';
      }
    });
    if (allEvents.length > 10) msg += '... y ' + (allEvents.length - 10) + ' más\n';
    msg += '\n';
  }

  msg += '━━━━━━━━━━━━━━━━━━\naurex.live';

  // Persistir en Supabase
  try {
    await supabase.from('monthly_reports').insert({
      reported_at: now.toISOString(),
      month_label: monthLabel,
      report_text: msg,
      total_incidents: allEvents.length,
      resolved_count: resolved.length,
      active_count: active.length,
      services: services,
      events_snapshot: allEvents
    });
  } catch(e) { console.error('[MONTHLY REPORT] Persist failed:', e.message); }

  try { await sendWhatsAppEvolution(ADMIN_WHATSAPP, msg); } catch(e) { console.error('[MONTHLY REPORT]', e.message); }
  console.log('[MONTHLY] Report sent + persisted for', monthLabel);
}
```

---

## Cambio 2 — Cron mensual

Agregar dentro del `.then()` de `restoreHealthState`, después del cron de dailyHealthReport:

```javascript
  cron.schedule('0 21 28-31 * *', monthlyHealthReport); // 21:00 UTC = 18:00 AR
```

---

## Cambio 3 — Endpoint test-monthly

Agregar después de `/api/health/test-report`:

```javascript
// Test monthly report — fuerza envío manual sin verificar último día hábil
app.post('/api/health/test-monthly', async function(req, res) {
  try {
    await _buildAndSendMonthlyReport();
    res.json({ ok: true, message: 'Monthly report sent + persisted' });
  } catch(e) { res.status(500).json({ error: e.message }); }
});
```

---

## Cambio 4 — /api/health/status incluye reportes mensuales

En el endpoint `GET /api/health/status`, agregar después de la query de dailyReports:

```javascript
    // Últimos 3 reportes mensuales
    const { data: monthlyReports } = await supabase.from('monthly_reports')
      .select('reported_at,month_label,total_incidents,resolved_count,active_count,report_text')
      .order('reported_at', { ascending: false })
      .limit(3);
```

Y en el JSON de respuesta agregar:

```javascript
      monthlyReports: monthlyReports || []
```

---

## Notas

- `_buildAndSendMonthlyReport()` es una función separada para que el endpoint test-monthly pueda llamarla sin la verificación de último día hábil
- `_fmtDay` usa `3 * 60 * 60 * 1000` para UTC-3 Argentina
- Todas las propiedades de Supabase usan underscore: `triggered_at`, `duration_seconds`, `mitigated_at`, `resolved_at`, `mitigation_source`
- Los helpers `_fmtDay` y `_fmtDur` llevan underscore prefix
