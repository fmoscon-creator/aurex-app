# PLAN ARCHIVO-POR-ARCHIVO — IAP TIER 1 (Build 34 Android) — v2
> Versión: **v2** (supera v1 con review Escritorio)
> Fecha v2: 16-may-2026 02:35 AR
> Estado: **DOCUMENTADO, SIN IMPLEMENTAR** — esperando OK Fernando + Escritorio
> Autor: Code + Review Escritorio (`REVIEW_ESCRITORIO_IAP_TIER1_16MAY.md`)
> Cambios v1→v2: (1) agregado IAP-6 deleteAccount explícito; (2) reforzado orden — backend IAP-5 con webhook test validado ANTES del frontend.

---

## 0. CONTEXTO

Los 11 intentos previos de arreglar IAP fallaron porque atacaban CONFIG (productos RC, License Testers, app_user_id en distintas formas). El análisis del 15-may identificó **2 bugs estructurales nuevos** no detectados antes:

1. **Frontend nunca llama `Purchases.logIn(uid)` después de Supabase auth** → RevenueCat trata cada sesión como `$anonymous:xxxxx` distinto.
2. **Backend webhook descarta IDs `$anonymous:...` silenciosamente** → el pago efectivo en Google Play no actualiza `usuarios.plan` en Supabase, el usuario sigue en FREE.

Este plan Tier 1 ataca **estos 2 problemas raíz específicamente**.

⚠️ **No es garantía de cierre.** Si Tier 1 no resuelve, escalamos a Plan B (B-1 webhook directo Google / B-2 reemplazo total RC / B-3 manual API).

---

## 1. RESUMEN DE LOS 6 CAMBIOS

| ID | Archivo | Cambio | Tipo |
|---|---|---|---|
| IAP-1 | `App.js` L42-49 | Agregar `Purchases.logIn(uid)` al boot si hay sesión Supabase | Frontend RN |
| IAP-2 | `src/screens/LoginScreen.js` L23-69 | `Purchases.logIn(data.user.id)` post-login (2 paths) | Frontend RN |
| IAP-3 | `src/screens/SignupScreen.js` L48-71 | `Purchases.logIn(data.user.id)` post-signup exitoso | Frontend RN |
| IAP-4 | `src/screens/PerfilScreen.js` L235-251 (`logout`) | `Purchases.logOut()` antes de `supabase.auth.signOut()` | Frontend RN |
| IAP-5 | `aurex-backend/server.js` L1631-1643 | Cambiar el warn por error + alerta Telegram admin | Backend |
| **IAP-6** | `src/screens/PerfilScreen.js` L253+ (`deleteAccount`) | `Purchases.logOut()` antes de `supabase.auth.signOut()` (consistencia con IAP-4) | Frontend RN |

**Bump versión**: `android/app/build.gradle` versionCode 33 → 34 / versionName 1.0.33 → 1.0.34.

---

## 2. DETALLE POR CAMBIO

### IAP-1 — App.js boot (L42-49)

**Código actual** (`/Users/fernandomoscon/AurexApp/App.js`):
```jsx
useEffect(() => {
  Purchases.setLogLevel(LOG_LEVEL.VERBOSE);
  if (Platform.OS === 'ios') {
    Purchases.configure({ apiKey: REVENUECAT_IOS_KEY });
  } else if (Platform.OS === 'android') {
    Purchases.configure({ apiKey: REVENUECAT_ANDROID_KEY });
  }
}, []);
```

**Propuesto (Build 34)**:
```jsx
useEffect(() => {
  Purchases.setLogLevel(LOG_LEVEL.VERBOSE);
  if (Platform.OS === 'ios') {
    Purchases.configure({ apiKey: REVENUECAT_IOS_KEY });
  } else if (Platform.OS === 'android') {
    Purchases.configure({ apiKey: REVENUECAT_ANDROID_KEY });
  }
  // Build 34 IAP-1: si hay sesion Supabase al boot, identificar al usuario con RC
  (async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.id) {
        await Purchases.logIn(session.user.id);
      }
    } catch (e) {
      console.warn('[IAP-1] Purchases.logIn boot fallo:', e?.message);
    }
  })();
}, []);
```

**Notas**:
- IIFE async porque `useEffect` no puede ser async directo.
- `supabase` ya importado en App.js (verificar import).
- try/catch defensivo — si falla, app no se rompe.

---

### IAP-2 — LoginScreen.js post-login (L23-69)

**Código actual**: `signIn()` tiene 2 paths:
- **Path 1** SDK (L29-39): `supabase.auth.signInWithPassword` exitoso → return en L34.
- **Path 2** Fetch directo (L42-66): `setSession` exitoso → return en L61.

**Propuesto (Build 34)** — agregar `await Purchases.logIn(...)` **antes del return** en ambos paths:

**Path 1 (L29-35) post-éxito SDK**:
```jsx
const { data, error } = await supabase.auth.signInWithPassword({ email, password });
if (!error && data?.session) {
  // Build 34 IAP-2 Path 1: identificar usuario con RC post-login SDK
  try { await Purchases.logIn(data.user.id); } catch (e) { console.warn('[IAP-2.1] logIn fallo:', e?.message); }
  setStatus(t('entrando'));
  setLoading(false);
  if (onSuccess) onSuccess();
  return;
}
```

**Path 2 (L52-62) post-éxito fetch directo**:
```jsx
if (data.access_token) {
  setStatus('Fetch OK — seteando sesion...');
  await supabase.auth.setSession({
    access_token: data.access_token,
    refresh_token: data.refresh_token,
  });
  // Build 34 IAP-2 Path 2: identificar usuario con RC post-setSession fetch directo
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (user?.id) await Purchases.logIn(user.id);
  } catch (e) { console.warn('[IAP-2.2] logIn fallo:', e?.message); }
  setStatus(t('entrando'));
  setLoading(false);
  if (onSuccess) onSuccess();
  return;
}
```

**Notas**:
- Import nuevo necesario en LoginScreen: `import Purchases from 'react-native-purchases';` (verificar si ya está).
- Path 1 tiene `data.user.id` directo (response de `signInWithPassword`).
- Path 2 necesita `getUser()` después de `setSession` porque el response del fetch directo no incluye user object.

---

### IAP-3 — SignupScreen.js post-signup (L48-90)

**Código actual** L71-90 (cuando `data.session` viene directa):
```jsx
if (data?.session) {
  // Build 19 BUG P0 fix — Capa 1 self-heal optimista:
  // crear fila en tabla 'usuarios' (plan='FREE' default). Si falla, no bloquea
  // al user — la Capa 2 (usePlan auto-heal en 404) recupera al siguiente GET.
  try {
    const BACKEND = 'https://aurex-app-production.up.railway.app';
    await fetch(`${BACKEND}/api/usuario`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: data.user.id,
        email: data.user.email,
        ...
      })
    });
  } catch {}
  // ... resto del éxito
}
```

**Propuesto (Build 34)** — agregar `Purchases.logIn` después del POST optimista a `/api/usuario`:
```jsx
if (data?.session) {
  // ... POST /api/usuario actual ...

  // Build 34 IAP-3: identificar usuario con RC post-signup exitoso
  try {
    await Purchases.logIn(data.user.id);
  } catch (e) { console.warn('[IAP-3] logIn fallo:', e?.message); }

  // ... resto del éxito (callback onSuccess, etc.)
}
```

**Notas**:
- Import nuevo si no está: `import Purchases from 'react-native-purchases';`.
- Va DESPUÉS del POST a `/api/usuario` para garantizar que la fila Supabase existe antes de que RC mande webhook.
- **⚠️ Race condition documentada (review Escritorio, no bloqueante)**: si un usuario nuevo se registra y compra INMEDIATAMENTE después (segundos), RC puede emitir el primer evento con UID anónimo antes de que `Purchases.logIn(uid)` complete. IAP-1 (boot) cierra esta ventana en sesiones posteriores pero no en el momento exacto del registro. IAP-5 (backend alerta Telegram) actúa como red de seguridad: detecta el caso y permite rescate manual. Si Tier 1 falla recurrentemente para usuarios nuevos, Plan B-1 (webhook directo Google Play) resuelve definitivamente.

---

### IAP-4 — PerfilScreen.js logout (L235-251)

**Código actual**:
```jsx
const logout = async () => {
  try {
    try { await supabase.auth.refreshSession(); } catch {}
    await supabase.auth.signOut();
    await AsyncStorage.clear();
    Alert.alert(t('sesion_cerrada'), t('reinicia_app'));
  } catch (e) {
    console.warn('[logout] error:', e?.message);
    try { await AsyncStorage.clear(); } catch {}
  }
};
```

**Propuesto (Build 34)** — agregar `Purchases.logOut()` ANTES de `signOut()`:
```jsx
const logout = async () => {
  try {
    try { await supabase.auth.refreshSession(); } catch {}
    // Build 34 IAP-4: desidentificar RC ANTES de cerrar sesion Supabase
    try { await Purchases.logOut(); } catch (e) { console.warn('[IAP-4] Purchases.logOut fallo:', e?.message); }
    await supabase.auth.signOut();
    await AsyncStorage.clear();
    Alert.alert(t('sesion_cerrada'), t('reinicia_app'));
  } catch (e) {
    console.warn('[logout] error:', e?.message);
    try { await AsyncStorage.clear(); } catch {}
  }
};
```

**Notas**:
- Import nuevo si no está: `import Purchases from 'react-native-purchases';`.
- `Purchases.logOut()` resetea RC al estado anónimo, lo cual es lo correcto para que el próximo login con OTRO usuario no herede el UID del anterior.

---

### IAP-6 — PerfilScreen.js deleteAccount (L253+) — AGREGADO EN v2

**Código actual** (`src/screens/PerfilScreen.js` función `deleteAccount` L253-271):
```jsx
const deleteAccount = async () => {
  if (deleteEmail !== user?.email) { Alert.alert(t('error'), t('email_no_coincide')); return; }
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const res = await fetch('https://dklljnfhlzmfsfmxrpie.supabase.co/functions/v1/delete-account', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${session?.access_token}`, 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      Alert.alert(t('cuenta_eliminada'), t('hasta_pronto'));
      await supabase.auth.signOut();
    } else {
      ...
    }
  } catch (e) { ... }
};
```

**Propuesto (Build 34)** — agregar `Purchases.logOut()` ANTES de `signOut()`:
```jsx
if (res.ok) {
  Alert.alert(t('cuenta_eliminada'), t('hasta_pronto'));
  // Build 34 IAP-6: desidentificar RC ANTES de cerrar sesion Supabase (consistencia con IAP-4)
  try { await Purchases.logOut(); } catch (e) { console.warn('[IAP-6] Purchases.logOut fallo:', e?.message); }
  await supabase.auth.signOut();
} else { ... }
```

**Razón** (review Escritorio): si se implementa IAP-4 sin IAP-6, un usuario que elimina su cuenta NO desidentifica RC antes de cerrar sesión, lo que puede dejar el UID Supabase atado a RC indefinidamente.

---

### IAP-5 — Backend webhook RC (server.js L1631-1643)

**Código actual**:
```js
const appUserId = event.app_user_id;
if (!appUserId) {
  console.error('[RevenueCat Webhook] Sin app_user_id en evento:', event);
  return res.status(400).json({ error: 'Missing app_user_id' });
}

const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(appUserId);
if (!isUUID) {
  console.warn(`[RevenueCat Webhook] app_user_id no es UUID: ${appUserId} — quizas usuario anonymous. No se actualiza Supabase.`);
  return res.json({ ok: true, skipped: 'non-UUID app_user_id' });
}
```

**Propuesto (Build 34)** — cambiar el `warn` por `error` + alerta Telegram al admin:
```js
const appUserId = event.app_user_id;
if (!appUserId) {
  console.error('[RevenueCat Webhook] Sin app_user_id en evento:', event);
  return res.status(400).json({ error: 'Missing app_user_id' });
}

const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(appUserId);
if (!isUUID) {
  // Build 34 IAP-5: era warn + return silencioso. Ahora error + alerta Telegram admin.
  // Razon: usuario pagó pero su uid quedó como $anonymous:xxx → plan no se activa.
  // Sin alerta NO sabemos que paso. Con alerta podemos rescatar manualmente.
  console.error(`[RevenueCat Webhook] WEBHOOK_USER_ANONIMO_${event.id}: app_user_id=${appUserId} product=${event.product_id} type=${event.type}`);
  try {
    const tgChatId = process.env.ADMIN_TELEGRAM_CHAT_ID;
    if (tgChatId) {
      bot.sendMessage(tgChatId,
        `🚨 *RC Webhook user anónimo*\n\n` +
        `Event: ${event.type}\n` +
        `Product: ${event.product_id}\n` +
        `app_user_id: \`${appUserId}\`\n` +
        `Event ID: ${event.id}\n\n` +
        `Usuario PAGÓ pero RC no lo identificó. Plan NO se activó automáticamente. Rescatar manualmente.`,
        { parse_mode: 'Markdown' }
      );
    }
  } catch (e) { console.warn('[IAP-5] Telegram alert fallo:', e?.message); }
  return res.json({ ok: true, skipped: 'non-UUID app_user_id', alerted: true });
}
```

**Notas**:
- `bot` y `process.env.ADMIN_TELEGRAM_CHAT_ID` ya están disponibles en server.js (confirmado L28 + L333).
- `console.error` en lugar de `console.warn` → aparece como ERROR en Railway logs (más visible).
- Telegram alert es **non-blocking** (try/catch envolvente), no rompe el webhook si Telegram falla.
- Si Tier 1 IAP-1/2/3 funcionan bien, este IAP-5 nunca debería dispararse — pero queda como red de seguridad para casos edge (renovaciones de usuarios viejos que se registraron antes de IAP-1).

---

## 3. BUMP VERSIÓN — `android/app/build.gradle`

```
ANTES:
versionCode 33
versionName "1.0.33"

DESPUÉS:
versionCode 34
versionName "1.0.34"
```

---

## 4. ORDEN DE IMPLEMENTACIÓN PROPUESTO (reforzado v2)

1. **Backend primero** (IAP-5) — deploy a Railway.
2. **🛑 VALIDACIÓN WEBHOOK ANTES DE SEGUIR (review Escritorio):**
   - Forzar evento de test en RC dashboard (Sandbox → trigger webhook).
   - Verificar que llega a Railway logs `console.error` con tag `WEBHOOK_USER_ANONIMO_`.
   - Verificar que llega alerta Telegram al admin chat.
   - **Si no llega → NO avanzar al frontend. Investigar primero** (env var `ADMIN_TELEGRAM_CHAT_ID` activa? Bot corriendo? Railway deploy OK?).
3. **Frontend RN** (IAP-1, IAP-2, IAP-3, IAP-4, IAP-6) — en un solo commit con bump 34.
4. **Compilar AAB Build 34**.
5. **Subir a Play Console Internal Testing** (no a Producción todavía).
6. **Validación end-to-end con compra real**:
   - Crear cuenta nueva en Samsung (tester con tarjeta real, NO License Tester).
   - Hacer login en la app → RC debería ver el UID Supabase ya.
   - Intentar comprar PRO mensual.
   - Verificar que el plan se activa en:
     - Dashboard RevenueCat (Customer Lists → buscar UID Supabase).
     - Supabase tabla `usuarios.plan` (debería decir PRO).
     - PerfilScreen en la app (mostrar PRO).
7. **Si OK end-to-end**: promover Build 34 a Producción Play Store (reemplaza Build 33).
8. **Si NO OK**: revisar Railway logs + Dashboard RC → escalar a Plan B.

---

## 5. VALIDACIONES PRE-IMPLEMENTACIÓN

Cosas a chequear ANTES de implementar (Code lo hace solo con grep, sin tocar código):

- [ ] Verificar que `import Purchases from 'react-native-purchases'` está en App.js (debería, ya hay `Purchases.configure`).
- [ ] Verificar si LoginScreen.js / SignupScreen.js / PerfilScreen.js ya importan `Purchases` (probablemente no → agregar import).
- [ ] Verificar que `supabase` está importado en App.js (para `getSession`).
- [ ] Verificar env var `ADMIN_TELEGRAM_CHAT_ID` activa en Railway (Fernando confirma).
- [ ] Verificar que Telegram bot está corriendo en backend (sí, L28 server.js).

---

## 6. RIESGOS

| Riesgo | Probabilidad | Mitigación |
|---|---|---|
| `Purchases.logIn` falla en algún path | Baja | try/catch defensivo en todos los puntos |
| Race condition: signup termina antes que webhook RC llegue | Media | IAP-1 boot también identifica, segunda red |
| Backend webhook tarda en deploy | Baja | Railway auto-deploy en push, ~2 min |
| Tier 1 NO arregla el cobro (los 11 intentos previos) | Media | Plan B documentado, validamos end-to-end antes de promover |
| Compra real con tarjeta cuesta dinero | N/A | Es lo correcto — sandbox NO valida el flujo de producción |

---

## 7. DEPENDENCIAS

- **Build 33 Android** debe estar en Producción Play Store antes (para que la próxima compra ocurra sobre la versión correcta del frontend).
- **Decision Apple D-modificada** NO bloquea esto — son paralelos.
- **Auditoría 12 superficies App Store Connect** (Escritorio) NO bloquea esto.

---

## 8. SIGUIENTE PASO

**ESTE PLAN ESTÁ EN STAND-BY hasta que:**
1. Auditoría 12 superficies App Store Connect: COMPLETADA por Escritorio (16-may, ver INFORME v3 §3-Bis).
2. Fernando apruebe el plan de Apple Y el plan IAP (este).
3. Se decida el orden: IAP primero, Apple primero, o ambos paralelos.

**Code NO toca código hasta tener los 3 OKs anteriores.**

---

## 9. ARCHIVOS REFERENCIADOS

- Análisis raíz: `~/Desktop/aurex-app/briefs/ANALISIS_PROFUNDO_COMPRA_IAP_15MAY.md`
- Plan B contingencia: `~/Desktop/aurex-app/briefs/PLAN_B_IAP_SI_RC_NO_RESPONDE.md`
- Ticket RC support: `~/Desktop/aurex-app/briefs/TICKET_REVENUECAT_FINAL_15MAY.md`
- INFORME Apple v2 (Fase 2): `~/Desktop/aurex-app/briefs/INFORME_GRAL_APPLE_v2_16MAY.md`

---

**Fin plan Tier 1. Pendiente aprobación.**
