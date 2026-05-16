# PLAN B IAP — Estrategias si RevenueCat NO responde el ticket
> Documento de contingencia
> Creado: 16-may-2026 00:20 AR
> Criticidad: P0 (sin esto AUREX Android no tiene valor comercial)

---

## CONTEXTO

Ticket RC enviado 15-may-2026 03:00 AR (`~/Desktop/aurex-app/briefs/TICKET_REVENUECAT_FINAL_15MAY.md`). Esperando respuesta.

Mientras tanto, AUREX Android publicado v1.0.17 no permite que usuarios compren PRO/ELITE (error "not available for purchase"). Cuando promovamos Build 33 a Producción, **el bug seguirá** porque no es bug de la UI sino del wiring RC ↔ Supabase.

Análisis trascendental encontró 2 bugs estructurales independientes del ticket pendiente. Estos se pueden arreglar SIN esperar respuesta RC.

---

## TIER 1 — Implementar fixes SIN esperar RC (Build 34)

### IAP-1 — App.js boot
```js
// Pseudocódigo
import Purchases from 'react-native-purchases';
import { supabase } from './src/lib/supabase';

useEffect(() => {
  (async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user?.id) {
      await Purchases.logIn(session.user.id);
    }
  })();
}, []);
```

### IAP-2 — LoginScreen.js post-login (2 paths)
```js
// Después de supabase.auth.signInWithPassword() exitoso:
await Purchases.logIn(data.user.id);
```
Aplicar también al magic link callback path.

### IAP-3 — SignupScreen.js post-signup
```js
// Después de supabase.auth.signUp() exitoso:
await Purchases.logIn(data.user.id);
```

### IAP-4 — PerfilScreen.js logout
```js
// Antes de supabase.auth.signOut():
await Purchases.logOut();
```

### IAP-5 — Backend webhook RC
En el endpoint `/api/webhook/revenuecat`:
```js
const userId = event.app_user_id;
if (userId.startsWith('$anonymous:')) {
  console.error('WEBHOOK_USER_ANONIMO_' + event.event.id);
  await sendTelegramAlert(`Webhook RC con user anónimo: ${userId}`);
  return res.status(200).json({ warning: 'anonymous_user' });
}
// continuar lógica normal
```

**Estado:** plan documentado, pendiente implementación Build 34.

---

## PLAN B-1 — Webhook directo Google Play Console → Supabase (bypass RC parcial)

Si después de implementar Tier 1 + 48hs SIN respuesta RC el cobro sigue roto:

### Concepto
Conectar el sistema de Real-Time Developer Notifications (RTDN) de Google Play Console **directamente** al backend de AUREX, en lugar de via webhook RevenueCat. RC sigue funcionando para iOS (Apple), pero Android va directo.

### Pasos
1. Configurar Pub/Sub en Google Cloud Console + RTDN en Play Console.
2. Crear endpoint backend `/api/webhook/google-play` que recibe los eventos.
3. Parsear `purchaseToken`, validar con Google Play Developer API (Service Account Key necesaria).
4. Actualizar `usuarios.plan` en Supabase con el plan correspondiente.
5. Frontend: en lugar de `Purchases.purchaseProduct()`, usar `BillingClient` nativo + endpoint backend para validar.

### Pros
- Independencia total de RC para Android.
- Sin "$anonymous:" porque el frontend envía el `uid` directamente.
- Logs claros del flujo.

### Contras
- ~2-3 días de implementación.
- Mantener 2 sistemas paralelos (Google direct + RC para iOS).
- Service Account Key Google Play debe configurarse (ya configurado para subir AAB).

### Estimación
2-3 días de trabajo Code. Sin OK de Fernando antes de empezar.

---

## PLAN B-2 — Reemplazo total RevenueCat con Stripe + native IAP

Si Plan B-1 no resuelve o se complica, plan más agresivo: eliminar RC completamente.

### Concepto
- **Web (PWA aurex.live):** Stripe para suscripciones (más común, mejor docs, sin fee adicional sobre Apple/Google).
- **iOS:** Apple StoreKit 2 nativo (sin RC intermediario).
- **Android:** Google Play Billing nativo (sin RC intermediario).
- **Sincronización:** webhooks de los 3 sistemas → endpoint backend AUREX → Supabase.

### Pros
- Sin dependencia de un proveedor que no responde.
- Mayor control + visibilidad logs.
- Stripe es enterprise-grade.
- Sin fee RC (sobreviven solo fees plataformas 15-30%).

### Contras
- Re-arquitectura mayor: ~1 semana de trabajo.
- Bloqueante para esta semana — Apple además ya rechazó Build 17 y tenemos que pelear el nombre.
- Requiere migrar productos existentes (Apple: 4, Android: 4 ya publicados).

### Estimación
5-7 días de trabajo Code. Plan agresivo solo si RC sigue sin responder >7 días.

---

## PLAN B-3 — Validación manual via Google Play Developer API

Plan más simple como fallback temporal.

### Concepto
Cuando un usuario compra y reporta "ya pagué pero plan sigue FREE", validar manualmente:
1. Pedir al usuario el `purchaseToken` (visible en email de Google Play).
2. Code/Fernando ejecuta script local que valida el token con Google Play API.
3. Si válido → upsert manual a `usuarios.plan` correspondiente.

### Pros
- No requiere desarrollo.
- Bypass total de RC para casos urgentes.
- Útil mientras se implementa Plan B-1 o B-2.

### Contras
- No escala (manual).
- Mala UX (usuario tiene que reportar el problema).
- Solución temporal.

### Estimación
1 día de scripting Code (validador local + función Supabase para actualizar plan).

---

## DECISIÓN MATRIX

| Escenario | Acción |
|---|---|
| RC responde + acepta error | Implementar Tier 1 + esperar fix RC + cerrar caso |
| RC responde + niega error | Implementar Tier 1 + Plan B-1 |
| RC NO responde en 48h | Implementar Tier 1 ahora + esperar 48h más |
| RC NO responde en 7 días | Implementar Plan B-1 (webhook directo Google) |
| RC NO responde en 14 días | Implementar Plan B-2 (reemplazo total) |
| Caso urgente individual | Plan B-3 (manual) en paralelo a cualquiera de los anteriores |

---

## PRÓXIMO PASO INMEDIATO

1. **Confirmar promoción Build 33 a Producción Android** (resuelve signup + UX, no IAP).
2. **Decidir cuándo arrancar Tier 1 fixes** (Build 34): mi recomendación, NO esperar respuesta RC. Implementar ahora.
3. **Decidir cuándo arrancar Plan B-1**: mi recomendación, 48hs después del envío del ticket si no hubo respuesta.

---

**Fin Plan B IAP. Documento vivo — actualizar según evolución del ticket RC.**
