# PLAN BUILD 26 iOS — Bug 1 IAP + Bug 2 UX Alertas

> **Doc para revisión Escritorio antes de aplicar.** Generado 19-may-2026 post-validación Build 25 TestFlight.
> **Aplica solo a iOS Build 26.** Bug 2 (UX alertas) también va a futuro Build Android — ver §3.

---

## §1. BUG 1 — IAP iOS SubscriptionScreen no carga productos

### Síntoma reportado por Fernando
PerfilScreen → Plan Actual → tap ELITE mensual o anual → abre SubscriptionScreen → muestra solo FREE → **spinner infinito** → "Restaurar compra" visible pero sin productos cargados → no se puede comprar.

### Causa raíz confirmada (cross-validada Code + Escritorio)
**API key RevenueCat iOS incorrecta en `App.js` L21.**

| Variable | Valor actual en código | Valor correcto (validado Escritorio en RC dashboard) |
|---|---|---|
| `REVENUECAT_IOS_KEY` | `'appbf4b308ae6'` ❌ (formato legacy SDK v4 `appXXXX` sin underscore — deprecado en SDK v5+) | `'appl_zLBPCgwahGaLMonmCDvEjKZDHUh'` ✅ (formato SDK v9 actual `appl_XXXX`) |
| `REVENUECAT_ANDROID_KEY` | `'goog_HfiemofhuhAKeWYfNZfLGrlyIDp'` ✅ | **NO TOCAR** — funcionando confirmado Build 36 Android (compra real Samsung 18-may) |

### Por qué cuelga sin error visible
SDK iOS no autentica con servidor RC usando la key legacy → `Purchases.getOfferings()` queda esperando indefinidamente respuesta del handshake → spinner sin timeout. **NO tira excepción explícita** porque el handshake nunca completa, no es un error semántico.

### Fix Build 26 — 1 línea de código
**Archivo único**: `~/AurexApp/App.js`

```diff
- const REVENUECAT_IOS_KEY = 'appbf4b308ae6';
+ const REVENUECAT_IOS_KEY = 'appl_zLBPCgwahGaLMonmCDvEjKZDHUh';
```

Andoid key queda IGUAL (no se toca).

### Validación post-fix
1. Build 26 compilado + sube TestFlight
2. Instalar v1.0 (26) en iPhone fmoscon
3. Perfil → Plan Actual → tap ELITE mensual
4. SubscriptionScreen DEBE: cargar productos en <3s + mostrar planes PRO/ELITE mensual+anual con precios
5. Tap "QUIERO ELITE MENSUAL" → Apple StoreKit sheet → confirmar con TestFlight sandbox tester
6. Verificar customer info post-purchase tiene entitlement `elite` activo

### Riesgo
🟢 **Bajo**. Cambio de string aislado. Si la key nueva falla → revert a anterior + re-compile. Pero la key nueva fue verificada en RC dashboard por Escritorio.

### Tiempo estimado
**5 min** (cambio + commit + push) + compile/upload (15 min).

---

## §2. BUG 2 — UX Alertas: comportamiento + visual + leyenda

### Síntoma reportado por Fernando
1. Creó alerta BTC "abajo" con valor=$1 esperando que dispare cuando BTC bajara — **nunca disparó** (sistema interpreta como "umbral $1" no como "delta desde precio actual")
2. En lista alertas (centro alertas → click campana): no se distingue visualmente si una alerta es ALCISTA o BAJISTA — todo es texto plano sin color
3. Popup app cuando dispara: neutro, no muestra naturaleza alcista/bajista
4. Telegram: tiene emoji 🟢/🔴 pero formato pobre
5. Push notification mobile: título genérico sin distinción visual

### Causa raíz (validada con consulta Supabase real)
**Alertas reales fmoscon@gmail.com**:
- ID `805672f9`: BTC dirección=**arriba** valor_objetivo=**$1** → disparó instant (BTC > $1) ✅
- ID `4fc5c524`: BTC dirección=**abajo** valor_objetivo=**$1** → NO dispara (BTC nunca llegará a $1) ❌

**NO hay bug de backend** (el backend cumple la lógica `precio <= valor_objetivo` correctamente). El bug es **UX**: el usuario interpreta `valor_objetivo` como **"delta desde precio actual"**, el sistema lo interpreta como **"umbral absoluto"**.

### Comportamiento esperado por Fernando (decisión producto)

> *"Si BTC vale $80.000 al crear la alerta y pongo +1 → dispara cuando llega a $80.001. Si pongo -1 → dispara cuando baja a $79.999. Si entre medio sube a $85.000 y después baja, la alerta de -1 debe disparar igual al llegar a $79.999."*

Esto requiere:
1. Capturar **snapshot del precio al momento de crear la alerta** (`precio_al_crear`)
2. Lógica disparo nueva: `precio_actual ≥ precio_al_crear + valor_objetivo` (arriba) o `precio_actual ≤ precio_al_crear + valor_objetivo` (abajo, valor negativo)
3. La condición permanece activa mientras no se cumpla, sin importar las oscilaciones intermedias

### 🚨 RESTRICCIÓN EXPLÍCITA DE SCOPE (registrada por Fernando 19-may post-snapshot audit)

**Build 27 toca SOLO las ALERTAS MANUALES** (las que el usuario PRO/ELITE crea desde Portfolio/Watchlist via `AlertCreateModal.js`, guardadas en tabla `alertas` Supabase, evaluadas por `checkAlertas()` en server.js, y mostradas en `MisAlertasScreen.js` cuando se toca la campana 🔔 del header).

**Build 27 NO toca los 15 toggles del tab Alertas** (`AlertasScreen.js` con `CustomSwitch` para IA/Pulse/Eventos). Esas son alertas AUTOMÁTICAS de sistema que envían sus disparos a la sección "ALERTAS ACTIVAS" en la misma pantalla del tab — NO van a la campana del header. Flujo completamente separado, fuera del scope de Build 27.

Confirmado con código real en snapshot público:
- Capa A (NO se toca): `AlertasScreen.js` 15 toggles
- Capa B (NO se toca): `BellButton.js` campana header
- Capa C (SÍ se toca - UX 2.3): `MisAlertasScreen.js` centro admin alertas manuales
- Capa D (SÍ se toca - UX 2.2): `AlertCreateModal.js` form crear alerta manual
- Capa E (SÍ se toca - lógica 2.1 + emoji 2.3): `server.js` checkAlertas() + dispararAlerta()

---

### Sub-fixes Bug 2 (3 componentes)

#### 2.1 — Backend: `precio_al_crear` + lógica delta-desde-creación
**Archivos:**
- Supabase migration: `ALTER TABLE alertas ADD COLUMN precio_al_crear NUMERIC;`
- `~/Desktop/aurex-backend/server.js`:
  - Modificar `POST /api/alertas` (L1230) para fetchear precio actual + guardar como `precio_al_crear`
  - Modificar `checkAlertas` (L765-767): nueva condición `precio >= a.precio_al_crear + a.valor_objetivo` (arriba) o `precio <= a.precio_al_crear + a.valor_objetivo` (abajo). `valor_objetivo` puede ser positivo o negativo según dirección.
  - **Backward compat**: para alertas legacy con `precio_al_crear=NULL`, usar comportamiento viejo (umbral absoluto) hasta que el usuario las re-cree.

**Riesgo**: 🟡 Medio. Migración DB + lógica core. Validar:
- Que migración no rompa alertas existentes (default NULL)
- Que alertas nuevas con `precio_al_crear` no NULL usen nueva lógica
- Que alertas viejas sigan funcionando como antes

#### 2.2 — Frontend form crear alerta: preview vivo + leyenda ⓘ
**Archivo**: `~/AurexApp/src/components/AlertCreateModal.js`

- Cuando usuario selecciona dirección + ingresa `valor_objetivo` → mostrar preview en vivo:
  > *"BTC ahora: $94.235 — esta alerta disparará cuando llegue a $94.236 (subió $1)"*
- Icono `ⓘ` al lado de cada tipo de alerta → tap abre modal con explicación clara de TODOS los tipos:
  - **Precio objetivo**: te avisa cuando el precio sube o baja $X desde el momento de crear la alerta. *Ejemplo: BTC ahora $94.000 + alerta "+1" → te avisa al llegar a $94.001.*
  - **Variación brusca**: te avisa cuando hay un cambio rápido en % en las últimas 24h.
  - **Máximo/mínimo**: te avisa cuando el precio cerca del máximo/mínimo de 30 días.
  - **Apertura**: te avisa cuando abre el mercado de un país.
  - **RSI extremo**: te avisa cuando el indicador técnico RSI entra en zona sobrecompra/sobreventa.
  - **Alertas IA/Pulse/Eventos** (PRO/ELITE): explicación corta cada una.

**Riesgo**: 🟢 Bajo. Solo UI form, sin cambios backend.

#### 2.3 — UX visual consistente verde/rojo en 4 lugares
**Cuando dispara alerta alcista** → verde 🟢 / **bajista** → rojo 🔴 en TODOS estos puntos:

| Punto | Archivo | Cambio |
|---|---|---|
| **Centro alertas app** (lista al click campana) | `src/screens/AlertasScreen.js` (o `MisAlertasScreen.js`) | Card con `borderLeft` o `backgroundColor` tinte verde (#22c55e15) o rojo (#ef444415). Header "🟢 BTC — ALCISTA" o "🔴 BTC — BAJISTA". Mostrar "Configurada: SUBA $1 (desde $94.230) · Disparada: $94.234" |
| **Popup app al disparar** | Donde se muestra Alert nativo (mover a custom modal) | Modal centered (regla general) con ribbon superior verde/rojo + icono + datos claros |
| **Telegram** | `server.js` `dispararAlerta()` L644-657 | Mejorar formato actual (ya tiene 🟢/🔴): mensaje en 4 líneas con bullet visual, emoji grande, precio config vs disparado |
| **Push notification** (iOS APNS + Android FCM) | `server.js` `sendPushFCM()` payload | Prefijo emoji en title: `"🟢 BTC — $94.234"` (en lugar de `"BTC — $94.234"`) — se ve coloreado en notif center del SO |

**Riesgo**: 🟢 Bajo. Cero cambios backend logic, solo UI/strings.

### Validación post-fix Bug 2
1. Crear alerta BTC "+1" → preview muestra precio objetivo correcto + leyenda ⓘ visible
2. Esperar disparo (puede ser segundos si BTC se mueve) → popup app rojo o verde + notif push con emoji + Telegram con formato nuevo
3. Volver al centro alertas → card debe mostrar color + texto claro de configuración vs disparado
4. Crear alerta BTC "-1" → debe disparar cuando baje $1 desde el precio actual al momento de crear

### Tiempo estimado total Bug 2
- 2.1 backend: 2h
- 2.2 frontend form: 1h
- 2.3 UX visual 4 lugares: 2h
- **Total Bug 2**: **5h**

---

## §3. Scope Build 26 iOS + planificación Android

### Build 26 iOS (inmediato)
- ✅ Bug 1 (API key iOS): 5 min código + 15 min compile/upload
- ✅ Bug 2 backend (2.1): 2h
- ✅ Bug 2 frontend form (2.2): 1h
- ✅ Bug 2 UX visual (2.3): 2h
- **Total estimado**: **~5.5h** desarrollo + compile/upload TestFlight

### Build Android futuro (ej. Build 37)
**Los fixes Bug 2 (2.1 backend + 2.2 form + 2.3 UX) son cross-platform** — se aplican a ambos iOS y Android porque:
- 2.1 backend: server.js es único compartido → ya aplica a Android automáticamente
- 2.2 frontend form: `AlertCreateModal.js` es React Native, mismo código corre en iOS y Android
- 2.3 UX visual: idem (mismo componente en ambas plataformas)

**Únicamente Bug 1 (API key iOS) NO aplica a Android** porque Android tiene su key correcta.

### Pendiente agendado en `briefs/PENDIENTES_PROXIMA_SESION_20MAY.md`
> Próximo Build Android (37 o el que sea) post-aprobación Build 36 Producción: incluir Bug 2 UX alertas (subió a iOS con Build 26, debe estar también en Android porque es código compartido pero requiere re-compile + re-upload Play Store para que llegue a usuarios).

---

## §4. Riesgo combinado + estrategia

| Aspecto | Evaluación |
|---|---|
| Riesgo total Build 26 iOS | 🟡 Medio (migración DB en backend + UX nueva) |
| Mitigación riesgo backend (2.1) | Backward compat con `precio_al_crear=NULL` para alertas legacy → no rompe existentes |
| Mitigación riesgo UX (2.3) | Solo cambios visuales, no afecta lógica de disparo |
| Validación pre-upload | Code valida IPA Info.plist (Paso 2.5 del manual) + corre tests manuales en backend dev |
| Rollback plan | Si algo crítico falla en TestFlight: Build 27 con revert de fix conflictivo |

---

## §5. Para Escritorio — preguntas específicas

1. **Bug 1 fix iOS**: ¿OK cambiar solo `REVENUECAT_IOS_KEY` a `appl_zLBPCgwahGaLMonmCDvEjKZDHUh` y dejar Android intacto?
2. **Bug 2.1 backend**: ¿OK agregar columna `precio_al_crear` con backward compat NULL para legacy?
3. **Bug 2.1 lógica**: ¿OK que `valor_objetivo` ahora sea **delta** desde precio_al_crear (positivo para subir, negativo para bajar) en lugar de umbral absoluto?
4. **Bug 2.3 colores**: ¿OK verde `#22c55e` alcista / rojo `#ef4444` bajista (mismos tonos brand consistentes con el resto de la app)?
5. **Build 26 vs separar en 2 builds**: ¿hacer Build 26 con TODO junto (Bug 1 + Bug 2 completo) o partir en 2 (Build 26 solo Bug 1 urgente IAP, Build 27 después Bug 2 UX)?
6. **Migración Supabase**: ¿la corre Code directo via SQL con service key, o se prefiere via Escritorio Chrome integration al Dashboard?

---

*Doc generado por Code 19-may-2026 para revisión Escritorio antes de aplicar fixes Build 26 iOS.*
