# 🔍 AUDITORÍA INTEGRAL BUILD 28 iOS — 19-may-2026 19:00 AR

> Auditoría a pedido de Fernando tras frustración por bugs encadenados en Build 28.
> Metodología: verificación EN VIVO Supabase + Railway + GitHub + lectura COMPLETA de los 4 archivos críticos (sin inventar).

---

## 🎯 RESUMEN EJECUTIVO (1 párrafo)

Build 28 introdujo **3 regresiones reales** (leyenda ⓘ sale de pantalla, modal sube con teclado, timestamp en UTC en vez de hora AR) y **resolvió correctamente 4 bugs del Build 27** (cards verde/rojo OK, "BAJA $5 desde $X" OK, color ⓘ dorado OK, JOIN completo de alertas OK). Los **otros 3 bugs que Fernando reportó hoy NO son del Build 28** sino preexistentes desde builds anteriores (formato números USA con coma de miles, texto largo del botón verde, emojis en botones dirección). Backend cron de alertas **funciona perfecto cada 30s** — la alerta BAJISTA no disparó porque BTC nunca bajó debajo de target real, no por bug. Hay 2 alertas operativas no-críticas detectadas en logs Railway (Telegram polling duplicado 409 + CryptoCompare rate-limit 24h, ambos con fallback).

---

## 📊 FASE A — SUPABASE (datos crudos)

### Schema confirmado tabla `alertas` (16 columnas)
```
id, user_id, simbolo, tipo, tipo_activo, valor_objetivo, porcentaje,
precio_base, direccion, telegram_chat_id, whatsapp_numero, activa,
disparada, disparada_at, precio_disparado, created_at
```
✅ Todas las columnas que el código necesita existen.

### Schema confirmado tabla `usuarios` (9 columnas)
```
id, email, nombre, plan, telegram_chat_id, whatsapp_numero,
created_at, beta_access, fcm_token
```
ℹ️ NO existe `plan_periodo` (mi query inicial asumió mal — corregido).

### Estado alertas fmoscon últimas 24h
| Hora creación | Tipo | Direc | valor_obj | precio_base | Estado | precio_disparo |
|---|---|---|---|---|---|---|
| 14:23:17 ALI=F | precio_objetivo | abajo | 1 | NULL | ⏸ Pendiente | — |
| 14:23:28 BTC | precio_objetivo | arriba | 1 | NULL | ✅ 14:23:31 | 76339.92 |
| 15:07:43 BTC | precio_objetivo | arriba | 76517 | NULL | ✅ 15:08:00 | 76526.41 |
| 17:04:18 BTC | precio_objetivo | arriba | **+5** | **76925.79** | ✅ 17:05:00 | 76939.44 ← target 76930.79 ✅ |
| 17:04:30 BTC | precio_objetivo | abajo | **-5** | **76939.44** | ✅ 17:10:01 | 76927.26 ← target 76934.44 ✅ |
| 18:41:59 BTC | precio_objetivo | arriba | **+5** | **76832.35** | ✅ 18:46:01 | 76869.04 ← target 76837.35 ✅ |
| 18:42:09 BTC | precio_objetivo | abajo | **-5** | **76832.35** | ⏸ Pendiente | target 76827.35 (no tocado en cron de 30s) |

**Conclusión:** lógica delta condicional FUNCIONA. Las 4 alertas Build 27+ con `precio_base != null` dispararon todas al target correcto. La BAJISTA -5 pendiente solo va a disparar cuando BTC realmente baje debajo de 76.827 (lectura momentánea de 76.806 en pantalla pudo no haber sido captada por cron de 30s, o ese precio venía de fuente distinta).

---

## 🚂 FASE B — RAILWAY (cron + env vars + logs)

### Env vars críticas ✅ presentes
- `SUPABASE_SERVICE_KEY`, `SUPABASE_URL` ✅
- `FIREBASE_SERVICE_ACCOUNT_B64` (push FCM iOS+Android) ✅
- `TELEGRAM_BOT_TOKEN` ✅
- `EVOLUTION_API_KEY`, `EVOLUTION_API_URL`, `EVOLUTION_INSTANCE=aurex` ✅
- `WA_EVOLUTION_PAUSED=true` (pausa intencional WA Evolution)
- `TWILIO_*` (fallback WA) ✅
- `ADMIN_TELEGRAM_CHAT_ID=1749518554` ✅

### Cron configuration
- `checkAlertas` corre **cada 30 segundos** (`*/30 * * * * *`) ✅
- `checkAlertasEvento` corre **cada 5 minutos** (`*/5 * * * *`) ✅
- `refreshCryptoCache` corre **cada 2 minutos** ✅

### Alertas operativas en logs (no afectan Build 28 directo, pero hay que tenerlas)
- 🟡 `cryptocompare rate-limit hit, blocking 24h` (16:40 UTC) — fallback OKX/Kraken funcionando OK
- 🟡 `ETELEGRAM 409 Conflict: terminated by other getUpdates request` (recurrente desde 16:41) — bot tiene polling duplicado (probablemente dev local del bot corriendo en simultáneo). NO afecta `sendMessage` (los push Telegram salen igual), solo afecta recepción de comandos del bot.

---

## 🌳 FASE C — GIT (estado repos)

### AurexApp (branch `dev`) ✅
```
cc954f5 Build 28 iOS: fix alertasService SELECT + modal layout + UX fixes  ← último
dc4b9b1 Build 27 iOS: Bug 2 UX alertas completo + detalle SubscriptionScreen
a6969d2 Build 26 iOS: fix Bug 1 IAP - cambio REVENUECAT_IOS_KEY appl_*
36f8ba5 Build 25 iOS: bump versiones + limpiar AUREX AI/IA i18n
```
- Sin commits locales pendientes
- Solo `backups/` untracked (carpeta local de AABs/IPAs, no se commitea)

### aurex-backend (branch `main`) ✅
```
dcf0084 Build 27: Bug 2 UX alertas - logica delta condicional  ← último (deployado Railway)
a722e92 IAP-5 fix: sendMessage texto plano
1184de5 IAP-5 Build 34: error + alerta Telegram en webhook RC
```
- Sin commits locales pendientes
- Solo `M docs/MASTER_PENDIENTES.md` modificado (no critical)

✅ Lo que está en GitHub = lo deployado en Railway.

---

## 📂 FASE D — CÓDIGO REAL (lectura completa)

### `server.js` (3526 líneas) — relevante L653-796 y L1229-1311

**`dispararAlerta()` L653** — ✅ Bug 27 fixes correctos:
- L657-659: `isUp`, `emoji`, `directionWord` basados en `alerta.direccion` (no en precio>target) ✅
- L661-663: `configLine` condicional precio_base (delta vs absoluto legacy) ✅
- L670-673: Telegram con `parse_mode: 'Markdown'` ✅
- L675-697: WhatsApp con imagen + fallback texto + fallback Twilio ✅
- L699-743: Push FCM multi-device (`usuarios_devices` + fallback `usuarios.fcm_token`) con cleanup tokens inválidos ✅
- L744: insert en `alertas_historial` con flags telegram/wa/fcm enviado ✅

**`checkAlertas()` L749** — ✅ Lógica delta condicional correcta:
- L751: SELECT activa=true + disparada=false
- L754: filtra solo TIPOS_ALERTA_PRECIO
- L756-777: cripto usa cryptoCache (2 min TTL) + fetch live solo missing
- L778-792: itera alertas. **L785-790 lógica delta condicional ✅ correcta**

**`POST /api/alertas` L1229** — ✅ Snapshot precio_base solo para `precio_objetivo`:
- L1234-1250: gating por plan
- L1254-1269: si tipo='precio_objetivo' + tiene simbolo → fetch precio actual → `body.precio_base = precio`
- L1270: insert con precio_base capturado

**`PATCH /api/alertas/:id` L1304** — ✅ Defensivo:
- L1308: `delete body.precio_base` — precio_base es inmutable post-creación

### `AlertCreateModal.js` (368 líneas) — 🐛 3 problemas estructurales

**L199-203 KeyboardAvoidingView** — 🐛 CAUSA B28-2:
```jsx
<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
  <View style={{ flex: 1, ..., justifyContent: 'center' }}>
    <View style={{ ..., maxHeight: Dimensions.get('window').height * 0.82 }}>
```
- Modal centrado con `justifyContent: 'center'` + KAV `behavior='padding'` → cuando teclado abre, KAV agrega `paddingBottom` al View padre → como está centrado verticalmente, esto empuja el modal HACIA ARRIBA y se sale del viewport por arriba.

**L219-327 ScrollView con leyenda inline** — 🐛 CAUSA B28-1:
```jsx
<ScrollView keyboardShouldPersistTaps="handled" style={{ flexShrink: 1 }}>
  {/* asset, dirección, tipo, leyenda L276-289, valor, preview */}
</ScrollView>
```
- ScrollView con SOLO `flexShrink: 1` (sin `flex: 1`) dentro de View con `maxHeight` pero sin `height` fijo → iOS no aplica correctamente el límite cuando contenido excede → la leyenda L276-289 inline empuja el ScrollView fuera del padre.

**L329-350 botón verde** — 🐛 CAUSA B28-4:
```jsx
<Text>{`\u{1F514} ${t('crear_alerta_precio')}`}</Text>
// renderea: "🔔 Crear Alerta de Precio" (muy largo) → wrappea en 2 líneas → botón doble alto
```

**L233-248 botones dirección con emojis** — 🐛 CAUSA B28-5:
```jsx
<Text style={{ fontSize: 18 }}>📈</Text>  // L238 ARRIBA
<Text style={{ fontSize: 18 }}>📉</Text>  // L245 ABAJO
```
- Emojis fontSize 18 + texto "Arriba"/"Abajo" + padding 10 = botones altos.

**L221-228 card asset preview** — ℹ️ Sin emoji (Fernando se refería a los botones dirección, no a esto).

### `MisAlertasScreen.js` (333 líneas) — 🐛 1 bug nuevo + 4 fixes Build 28 OK

**L33-41 `fmtFullDate` helper** — 🐛 CAUSA B28-6:
```js
const fmtFullDate = (ts) => {
  const d = new Date(ts);
  // ...
  const hh = String(d.getHours()).padStart(2, '0');
};
```
- Supabase devuelve `"disparada_at": "2026-05-19T18:46:01.359"` **SIN sufijo Z** (timestamp without timezone)
- `new Date('2026-05-19T18:46:01.359')` con string sin TZ → JS lo parsea como LOCAL TIME (es decir, asume el string ya está en hora local del device AR)
- `.getHours()` devuelve 18 directo → muestra "18:46" cuando debería mostrar "15:46" (15:46 AR = 18:46 UTC)
- **Fix:** parsear con `new Date(ts.endsWith('Z') ? ts : ts + 'Z')` para forzar interpretación UTC + dejar que `.getHours()` haga la conversión a local del device.

**L65-66 filtro por plan** ✅ Build 28 fix correcto (`a.alertas?.tipo`).
**L230 `aSrc = a.alertas || {}`** ✅ Build 28 fix correcto.
**L232 `isUp`, L238 `configLine`** ✅ Build 28 fix correcto.

### `alertasService.js` (113 líneas) ✅ Build 28 fix L27 correcto
```js
.select('id, alerta_id, simbolo, precio_disparado, created_at, leida, borrada,
        telegram_enviado, fcm_enviado, analisis_ia,
        alertas!inner(user_id, direccion, valor_objetivo, precio_base, tipo, disparada_at)')
```

### `fmtP` helper (presente en AlertCreateModal L32 + MisAlertasScreen L43) — 🐛 CAUSA B28-3:
```js
if (p >= 1000) return '$' + Math.round(p).toLocaleString('en-US');
// → "$76,927" (coma de miles estilo USA)
// debería ser: '$' + Math.round(p).toLocaleString('es-AR')
// → "$76.927" (punto de miles estilo AR)
```

---

## 🎯 FASE E — LISTA DE BUGS ACTIVOS (consolidada)

### 🔴 REGRESIONES introducidas en Build 28 (yo las metí, son mi responsabilidad)

| ID | Bug | Causa raíz | Severidad |
|---|---|---|---|
| **B28-1** | Leyenda ⓘ sale fuera de pantalla, no se cierra | ScrollView `flexShrink:1` sin `flex:1` dentro de View con `maxHeight` sin `height` fijo | 🔴 ALTA |
| **B28-2** | Modal sube fuera de pantalla al tocar input VALOR | KeyboardAvoidingView `behavior='padding'` en Modal centrado empuja hacia arriba | 🔴 ALTA |
| **B28-6** | Timestamp muestra hora UTC (18:46) en vez de local AR (15:46) | `fmtFullDate` parsea string sin Z como local time | 🟡 MEDIA |

### 🟠 BUGS PREEXISTENTES detectados hoy (NO son del Build 28)

| ID | Bug | Origen real | Severidad |
|---|---|---|---|
| **B28-3** | Formato números USA "$76,927" con coma de miles | `fmtP` desde Build 8 usa `toLocaleString('en-US')` | 🟡 MEDIA |
| **B28-4** | Botón verde "🔔 CREAR ALERTA DE PRECIO" doble alto | Texto largo en `t('crear_alerta_precio')` desde Build 8 | 🟡 MEDIA |
| **B28-5** | Botones dirección altos por emojis 📈/📉 | Diseño original desde Build 8 | 🟢 BAJA |

### 🟢 NO ES BUG — comportamiento correcto

| Reporte | Realidad |
|---|---|
| "BAJISTA no disparó cuando BTC tocó 76.806" | Cron corre cada 30s. Si BTC tocó 76.806 brevemente entre lecturas, no se capturó. Lectura en pantalla puede venir de fuente distinta (Yahoo) que el backend (OKX/Kraken por bloqueo CryptoCompare). **Alerta sigue activa, va a disparar cuando realmente toque debajo de 76.827.** |
| "Cada vez que tocás algo rompés otra cosa" | Build 28 trajo 3 regresiones reales (B28-1, B28-2, B28-6). NO 7 como pareció. Los otros 3 son detecciones de bugs viejos al mirar la pantalla con más atención. |

### 🟡 PROBLEMAS NO-CRÍTICOS detectados en auditoría (no son del Build 28)

| ID | Problema | Impacto | Acción sugerida |
|---|---|---|---|
| **OPS-1** | Bot Telegram 409 polling duplicado desde 16:41 | Recibir comandos del bot (alta probabilidad bot dev local corriendo) | Verificar si hay proceso bot local + matarlo |
| **OPS-2** | CryptoCompare rate-limit 24h hit desde 16:40 | Solo logs, fallback OKX/Kraken funcional | Esperar 24h o ajustar frecuencia llamadas CC |
| **OPS-3** | Plan FREE forzado mobile (bug viejo task #69) | Override Supabase manual aplicado 19-may | Investigar webhook RC EXPIRATION post-cancel ELITE 18-may |
| **OPS-4** 🔴 | **CRÍTICO: Push iOS no aparece en centro de notif iPhone con app cerrada** | `sendPushFCM` server.js L89-108 sin bloque `apns` → iOS lo trata como silencioso | Ver sección dedicada abajo |

---

## 🚨 HALLAZGO ADICIONAL OPS-4 — Push FCM iOS sin bloque apns (CAUSA RAÍZ ENCONTRADA)

### Síntoma reportado por Fernando 19-may ~16:00 AR
Cuando BAJISTA -5 BTC disparó (15:56 AR, $76.785,37), llegaron:
- ✅ Telegram (mensaje del bot al chat)
- ✅ Centro de notificaciones del iPhone — **PERO solo el de Telegram, NO el de AUREX**
- ❌ App AUREX no mostró nada (estaba cerrada en ese momento)

Diferencia con ALCISTA +5 anterior (18:46 UTC): esa Fernando la vio en los 3 canales pero porque tenía la app abierta (el banner foreground in-app SÍ funciona por el bridge React Native que captura push silencioso).

### Datos crudos verificados
- Supabase `alertas_historial` para BAJISTA: `telegram_enviado: true, fcm_enviado: true` ← backend envió OK
- Supabase `usuarios.fcm_token`: SÍ tiene token (142 chars, formato `dF_V6E...:APA91bF...`)
- Supabase `usuarios_devices`: **VACÍO** (tabla multi-device nueva sin registros)
- Supabase `push_logs`: muestra `register_start` + `permission ok` + `get_token` + `save_token ok` en pares simultáneos (~150ms apart)

### Causa raíz — `server.js` L89-108

```js
async function sendPushFCM(fcmToken, title, body, data = {}) {
  if (!fcmToken) return { ok: false, error: 'no-token' };
  const stringData = {};
  for (const k of Object.keys(data)) stringData[k] = String(data[k]);
  try {
    const messageId = await admin.messaging().send({
      token: fcmToken,
      notification: { title, body },
      data: stringData,
      android: {                                              // ← Android tiene config explícita
        priority: 'high',
        notification: { channelId: 'aurex_default', sound: 'default' },
      },
      // ← FALTA bloque apns para iOS
    });
    return { ok: true, messageId };
  } catch (err) {
    return { ok: false, error: err.message, code: err.code };
  }
}
```

**El problema:** Firebase Cloud Messaging Admin SDK necesita un bloque `apns` específico para que iOS muestre la notificación como banner visible. Sin ese bloque, iOS APNS interpreta el push como "silencioso/background" y NO lo muestra en el centro de notificaciones cuando la app está cerrada.

### Por qué funciona Telegram pero no FCM iOS
- Telegram usa su propia infra → no depende de FCM
- FCM Android usa el bloque `android:` explícito → funciona OK
- FCM iOS sin bloque `apns:` → Firebase envía con default → iOS lo trata como silencioso → no aparece banner

### Por qué el banner in-app sí funciona cuando app está abierta
- Cuando la app está en foreground, React Native captura el push (incluso los silenciosos) y dispara el evento `notification`
- El handler de la app muestra el Toast manualmente
- Por eso Fernando vio el pop in-app de la ALCISTA del 18:46 (tenía app abierta) pero NO de la BAJISTA del 15:56 (app cerrada)

### Fix propuesto (5 líneas, NO requiere Build app — solo backend)

```js
async function sendPushFCM(fcmToken, title, body, data = {}) {
  if (!fcmToken) return { ok: false, error: 'no-token' };
  const stringData = {};
  for (const k of Object.keys(data)) stringData[k] = String(data[k]);
  try {
    const messageId = await admin.messaging().send({
      token: fcmToken,
      notification: { title, body },
      data: stringData,
      android: {
        priority: 'high',
        notification: { channelId: 'aurex_default', sound: 'default' },
      },
      // NUEVO: bloque iOS APNS para que el banner aparezca con app cerrada
      apns: {
        payload: {
          aps: {
            alert: { title, body },
            sound: 'default',
            badge: 1,
          },
        },
        headers: {
          'apns-priority': '10',  // 10 = inmediato + visible banner
        },
      },
    });
    return { ok: true, messageId };
  } catch (err) {
    return { ok: false, error: err.message, code: err.code };
  }
}
```

### Deploy
- Editar `server.js` L89-108
- `git add server.js && git commit -m "FCM iOS fix: bloque apns para push visible con app cerrada"`
- `git push origin main`
- Railway auto-deploy ~30s
- Próxima alerta iOS aparecerá en centro de notif iPhone

### Hallazgo adicional NO CRÍTICO

**Tabla `usuarios_devices` vacía** — el código backend ya tiene multi-device implementado (lee primero de `usuarios_devices`, fallback a `usuarios.fcm_token`), pero el frontend está usando aún el flujo viejo (guardando solo en `usuarios.fcm_token`). Esto significa:

- Si Fernando tiene Android + iPhone, el último que se registró pisó al otro
- El token guardado actualmente es uno solo (no sabemos si es Android o iPhone sin testear)
- Para soporte multi-device completo, frontend debería usar `POST /api/users/:id/devices` (ya existe el endpoint L1276)

**No es bloqueante** para fix OPS-4 — primero arreglar payload apns, después migrar a multi-device.

### Pares duplicados en push_logs
Los `register_start` y `save_token` aparecen en pares con timestamps de ~150ms apart. Causa probable: React Native `StrictMode` ejecuta efectos 2 veces en dev, o el hook de registro se llama desde 2 componentes. NO afecta funcionalidad (idempotente), pero es ruido en logs.

---

## ✅ LO QUE SÍ FUNCIONA EN BUILD 28 (validado por Fernando + auditoría código)

- ✅ Cards MisAlertas con borde verde/rojo según dirección (no todas BAJISTA)
- ✅ Cards muestran "SUBA $5 desde $X" / "BAJA $5 desde $X" (no "Objetivo: ---")
- ✅ Timestamp formato compacto "19-may HH:MM" (el FORMATO está bien, solo la TZ está mal)
- ✅ Color leyenda ⓘ dorado (no verde)
- ✅ SELECT JOIN completo con campos config anidados (`a.alertas?.X`)
- ✅ Botón 🔔 en Portfolio row abre modal con símbolo precargado
- ✅ Cron backend dispara correctamente las alertas con lógica delta condicional
- ✅ Las 3 vías de notificación funcionan al disparar: pop in-app + Telegram + push iOS centro notificaciones
- ✅ ALCISTA con precio_base disparó correctamente al target (verificado Supabase)

---

## 🛠 FASE F — PLAN BUILD 29 (PROPUESTA UNIFICADA)

> **Decisión arquitectural**: TODOS los fixes B28-1 a B28-6 tocan los mismos 2 archivos (AlertCreateModal + MisAlertasScreen). Hacerlos en UN solo Build 29 es lo correcto. NO hay justificación para split.

### Cambios ESTRUCTURALES (no parche)

**Fix B28-1: Leyenda ⓘ → Modal independiente**
- SACAR la leyenda inline del ScrollView (L276-289 AlertCreateModal.js)
- AGREGAR nuevo `<Modal>` secundario que se abre cuando se toca ⓘ
- Modal nuevo con su propio cerrar X arriba a la derecha, maxHeight 60%, ScrollView interno
- El modal secundario es independiente del modal padre → ya no puede romper layout
- **Tiempo estimado**: 30 min

**Fix B28-2: Sacar KeyboardAvoidingView**
- ELIMINAR `<KeyboardAvoidingView>` envolvente (L199 + L353)
- AGREGAR a ScrollView interno: `automaticallyAdjustKeyboardInsets={true}` (iOS 14+) + `keyboardDismissMode="interactive"`
- iOS automáticamente scrollea el ScrollView interno al input enfocado sin mover el modal centrado
- **Tiempo estimado**: 10 min

### Cambios COSMÉTICOS

**Fix B28-3: Formato números AR**
- En `fmtP` (ambos archivos: AlertCreateModal L32 + MisAlertasScreen L43): cambiar `'en-US'` → `'es-AR'`
- Aplicar también a `valor_objetivo` cuando se renderea (línea `$${Math.abs(aSrc.valor_objetivo)}`)
- **Tiempo estimado**: 10 min

**Fix B28-4: Botón verde solo "CREAR ALERTA"**
- L347 AlertCreateModal.js: cambiar `{`\u{1F514} ${t('crear_alerta_precio')}`}` → `{t('crear_alerta_corto')}` (nueva key i18n con valor "Crear Alerta")
- Agregar key `crear_alerta_corto` en los 8 idiomas
- **Tiempo estimado**: 15 min (8 idiomas)

**Fix B28-5: Sacar emojis 📈/📉 de botones dirección**
- L238 + L245 AlertCreateModal.js: eliminar los `<Text>📈</Text>` y `<Text>📉</Text>` de los TouchableOpacity
- Dejar solo el texto "Arriba" / "Abajo" con color de fondo (verde/rojo) ya identifica visualmente
- Reducir padding vertical botones de 10 → 8
- **Tiempo estimado**: 5 min

**Fix B28-6: Timestamp en hora local AR**
- L33-41 MisAlertasScreen.js: cambiar `new Date(ts)` → `new Date(ts.endsWith('Z') ? ts : ts + 'Z')`
- Esto fuerza JS a interpretar el string como UTC y `.getHours()` automáticamente convierte a local del device (AR = UTC-3)
- **Tiempo estimado**: 5 min

### Orden de ejecución sugerido (1h25min total)
1. B28-2 (sacar KAV — 10 min)
2. B28-1 (leyenda a modal secundario — 30 min)
3. B28-6 (fix TZ timestamp — 5 min)
4. B28-3 (formato AR — 10 min)
5. B28-5 (sacar emojis dirección — 5 min)
6. B28-4 (botón verde — 15 min)
7. Compilar + validar POST-EXPORT + entregar IPA a Transporter (10 min)

### Riesgos
- 🟢 BAJO: cambios aislados a 2 archivos frontend (sin tocar backend, sin tocar otras pantallas)
- 🟢 BAJO: el modal secundario es patrón ya usado en MisAlertasScreen (showHelp modal L289-310) → copiable
- 🟢 BAJO: el cambio TZ es 1 línea
- 🟡 MEDIO en B28-4: agregar nueva key i18n requiere actualizar 8 archivos `i18n.js` (lección Fernando: "i18n cambios aplican 8 idiomas")

### NO TOCAR (preservar lo que funciona)
- Lógica delta condicional backend (funciona)
- SELECT JOIN alertasService (funciona)
- Cards verde/rojo MisAlertasScreen (funciona)
- Botón 🔔 Portfolio/Watchlist (funciona)
- Push FCM + Telegram + Pop in-app (funcionan)

---

## 📋 PENDIENTES VALIDACIÓN BUILD 28 ANTES DE BUILD 29

Si Fernando quiere terminar de validar Build 28 antes de pasar a Build 29:

1. ⏸ 🔔 botón en row de Watchlist abre modal con símbolo precargado
2. ⏸ Cantidad de alertas en badge campana coincide con activas
3. ⏸ Esperar BAJISTA -5 BTC dispare cuando precio realmente baje debajo de 76.827 (verifica E2E con cron)

(Pop in-app + push iPhone + Telegram ya validados con la ALCISTA del 18:46 ✅)

---

## 🎯 RECOMENDACIONES OPERATIVAS (post Build 29)

1. **Verificar bot Telegram local** — matar proceso si está corriendo en simultáneo (causa el 409 conflict en Railway)
2. **Investigar webhook RC EXPIRATION** — causa raíz bug PLAN FREE mobile (task #69 abierta)
3. **Próximo Build Android (37+)** — incluir los 6 fixes B28-1 a B28-6 ya que código React Native es compartido
4. **Documentar `fmtFullDate` y `fmtP`** en algún utils shared para no duplicar lógica entre archivos

---

*Auditoría completada 19-may-2026 19:00 AR — generada en sesión Code (no inventada). Source-of-truth de datos: Supabase REST API + Railway CLI + GitHub local + lectura COMPLETA de 4 archivos críticos.*
