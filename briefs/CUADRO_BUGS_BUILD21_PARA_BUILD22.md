# CUADRO COMPLETO — Bugs/Ajustes Build 21 a aplicar en Build 22

Fecha cierre sesion: 15-may-2026 ~02:40 AR
Plataforma testeada: Samsung R5CR92ADDNW con Build 21 v1.0.21 (instalado desde Play Store)
Cuenta tester: aurextester12@gmail.com (License Tester activo)

---

## TABLA RESUMEN

| # | Prioridad | Pantalla / Componente | Sintoma | Causa raiz | Accion concreta Build 22 | Archivo + linea |
|---|-----------|------------------------|---------|------------|---------------------------|-----------------|
| 1 | **P0 BLOQUEANTE** | SubscriptionScreen | Tocar comprar PRO/ELITE Mensual o Anual: POP "Error / The Product is not available for Purchase". 100% reproducible en los 4 planes. RevenueCat retrieva productos OK pero NUNCA llama a `launchBillingFlow`. | NO confirmada despues de descartar 11 hipotesis. Toda la configuracion Play Console + RC + firmas + License Testing + RTDN esta correcta. Posible: propagacion <48h, o ticket a RevenueCat support. | NO requiere cambio de codigo todavia. Esperar 24-48h post-publicacion + abrir ticket RC con el informe completo. Si despues sigue fallando, debug profundo con server-side logs RC. | N/A (no es bug de codigo) |
| 2 | **P0 UX** | Modal Agregar Activo (PortfolioScreen) | Boton "Guardar" queda OCULTO bajo el teclado al completar Cantidad + Precio. Nuevo usuario no puede agregar primer activo. Fix Build 21 con ScrollView + keyboardShouldPersistTaps + Keyboard.dismiss NO alcanzo. | El boton esta dentro del ScrollView, el teclado lo tapa visualmente aunque sea tocable. | Boton "Guardar" STICKY fijo abajo del modal, FUERA del ScrollView. Estructura: `<View flex:1>` con `<ScrollView flex:1>` para campos + `<View>` boton fijo abajo. | `src/screens/PortfolioScreen.js` L1167-1248 aprox (form modal Agregar Activo) |
| 3 | **P1** | AlertasScreen (header secciones) | Contador por seccion muestra `4/$` (denominador descontando alertas bloqueadas por plan), Fernando quiere `4/5` (denominador ABSOLUTO con total real de alertas configurables sin filtrar). | L582 actual filtra el denominador con `isAlertAllowed`. | Cambiar denominador para que cuente TODAS las items de la seccion sin filtrar por plan. Activos al numerador siguen filtrando con `isAlertAllowed`. | `src/screens/AlertasScreen.js` L582 — `const totalInSec = sec.items.filter(i => isAlertAllowed(i.id)).length;` → cambiar a `sec.items.length` |
| 4 | **P1** | AlertCreateModal (Configurar alerta desde campana) | Al crear alerta de precio en campana de un activo, POP "Limite del plan PRO Pasate a ELITE" incluso cuando el usuario PRO debe poder crear alertas de precio. Bloqueo INCORRECTO. | Frontend envia `tipo: 'precio'` o `'porcentaje'` pero PLAN_LIMITS.FREE/PRO espera `'precio_objetivo'` o `'umbral'` y `'variacion_brusca'`. Backend rechaza con 403 plan_limit_reached. | Mapear en el callsite que abre AlertCreateModal: `'precio'` → `'precio_objetivo'`, `'porcentaje'` → `'variacion_brusca'`. Verificar PLAN_LIMITS en `lib/plans.js` o donde este definido. | Grep `tipo:.*precio` y `tipo:.*porcentaje` en `src/` — corregir antes de POST a `/api/alertas` |
| 5 | **P1** | IAScreen (tap candado RSI/MACD) | Tap activo en AI + tap candado "Analisis Tecnico RSI / MACD" → POP error + atras pantalla "Elige tu plan FREE $" mal renderizada (igual mal que en emulador). | Causa NO 100% diagnosticada. Probable: fallback de error renderiza un SubscriptionScreen embebido con state corrupto. Verificar el handler del tap candado. | Re-test con logcat fresh para capturar `console.error` del handler. Si es navegacion a SubscriptionScreen, asegurar que pase props correctos. Si es PlanLimitModal, alinear con el resto del UI. | `src/screens/IAScreen.js` — handler del tap candado en seccion Analisis Tecnico (grep `RSI\|MACD` + `candado\|locked\|onPress`) |
| 6 | **P2** | SubscriptionScreen handler compra | Cuando falla la compra, el Alert muestra `t('error')` como mensaje (texto generico "Error"). El `e.message` real del SDK queda oculto, dificultando debug. | L78: `Alert.alert(t('error'), e.message)` esta bien, pero `e.message` puede ser undefined o string vacio segun version SDK. | Asegurar fallback explicito: `Alert.alert('Error', e.message || e.toString() \|\| 'Error desconocido')`. Tambien loggear con `console.error('[SUB] purchase failed:', e)` para que aparezca en logcat. | `src/screens/SubscriptionScreen.js` L78 |
| 7 | **P2** | PortfolioScreen (debajo Valor Total) | Falta banner UpsellBanner cuando usuario es FREE/PRO (para promover upgrade). Antes estaba en MercadosScreen pero se removio porque saturaba precios. Pertenece en Portfolio. | Feature pendiente, no es bug. | Agregar `<UpsellBanner compact />` debajo del componente que muestra "Valor Total" en PortfolioScreen. Importar de `src/components/UpsellBanner.js`. | `src/screens/PortfolioScreen.js` — buscar `Valor Total\|valor_total` y agregar el banner inmediatamente despues |

---

## DETALLE TECNICO POR BUG (#2 a #7)

### Bug #2 — Modal Agregar Activo: boton Guardar oculto bajo teclado

**Que esta mal exactamente:**
La estructura actual del modal de Agregar Activo en PortfolioScreen es:

```jsx
<Modal>
  <View style={modalContainer}>
    <Text>Agregar Activo</Text>
    <ScrollView keyboardShouldPersistTaps="handled">
      <TextInput placeholder="Cantidad" />
      <TextInput placeholder="Precio" />
      <TouchableOpacity onPress={saveAsset}>  ← BOTON ADENTRO DEL SCROLLVIEW
        <Text>Guardar</Text>
      </TouchableOpacity>
    </ScrollView>
  </View>
</Modal>
```

Cuando el usuario hace tap en el TextInput "Cantidad" o "Precio", el teclado virtual del Samsung ocupa ~45% de la pantalla. El ScrollView intenta auto-desplazarse para mantener el TextInput visible, pero el boton Guardar (que esta MAS abajo en el flujo del ScrollView) queda fuera del area visible Y por debajo del teclado. El usuario solo ve los inputs y NO puede llegar al boton. El fix Build 21 (agregar `keyboardShouldPersistTaps="handled"` + `Keyboard.dismiss()` antes de saveAsset) NO resuelve esto porque el problema es de POSICIONAMIENTO, no de propagacion de eventos: el boton sigue debajo del teclado.

**Como se ajusta:**
Refactorizar el modal a layout flex con dos zonas claramente separadas — la zona de inputs scrolleable arriba y el boton FIJO abajo, FUERA del ScrollView:

```jsx
<Modal>
  <View style={{ flex: 1, backgroundColor: modalBg }}>
    {/* Zona 1: header titulo (flex-shrink: 0) */}
    <View style={headerStyle}>
      <Text>Agregar Activo</Text>
    </View>

    {/* Zona 2: ScrollView con inputs (flex: 1, ocupa el espacio restante) */}
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
      keyboardShouldPersistTaps="handled"
    >
      <TextInput placeholder="Cantidad" returnKeyType="next" />
      <TextInput placeholder="Precio" returnKeyType="done" onSubmitEditing={Keyboard.dismiss} />
      {/* Cualquier otro campo aca */}
    </ScrollView>

    {/* Zona 3: boton STICKY fijo abajo (flex-shrink: 0, NO en ScrollView) */}
    <View style={{
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: Platform.OS === 'ios' ? 32 : 16,  // safe area
      borderTopWidth: 1,
      borderTopColor: borderColor,
      backgroundColor: modalBg,
    }}>
      <TouchableOpacity
        style={btnGuardar}
        onPress={() => { Keyboard.dismiss(); saveAsset(); }}
      >
        <Text>Guardar</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
```

Clave: el ScrollView esta SOLO para los inputs, y el boton vive en un View hermano FUERA del ScrollView. Al abrirse el teclado, el boton se mantiene visible arriba del teclado porque esta posicionado al final del contenedor flex del modal y RN lo respeta como sticky natural.

**Validacion en Samsung:**
Modal abre, tap Cantidad (teclado aparece), escribir numero, tap Precio (teclado sigue), escribir numero. El boton "Guardar" tiene que quedar visible y tocable EN TODO MOMENTO arriba del teclado.

---

### Bug #3 — Contador secciones Alertas: denominador descontando bloqueados

**Que esta mal exactamente:**
En `AlertasScreen.js` cada seccion tiene un header con un contador "X/Y" donde:
- X = alertas activas en esa seccion para el plan actual
- Y = total de alertas configurables en esa seccion

Codigo actual L582 (aprox):
```javascript
const totalInSec = sec.items.filter(i => isAlertAllowed(i.id)).length;
const activeInSec = sec.items.filter(i => toggles[i.id] && isAlertAllowed(i.id)).length;
```

`isAlertAllowed(i.id)` devuelve false para items que el plan actual NO permite. Por ejemplo, si el plan es PRO y una alerta requiere ELITE, esa alerta se descuenta de AMBOS numerador y denominador.

Ejemplo concreto en una seccion con 5 alertas total donde 1 requiere ELITE y el usuario es PRO con 4 activas: el codigo actual muestra **4/4** (denominador = 5 items filtrado por isAlertAllowed = 4 permitidos para PRO), cuando Fernando quiere ver **4/5** (denominador = total absoluto del catalogo).

La logica de Fernando: el usuario debe ver el TOTAL del catalogo, no el total filtrado por su plan. Asi sabe que hay 1 alerta que NO esta usando porque su plan no la permite, lo cual es informacion de upsell util.

**Como se ajusta:**
Cambiar UNICAMENTE el denominador para que NO filtre. El numerador SI sigue filtrando para no contar como "activa" una alerta que el plan ni siquiera deja usar:

```javascript
// L582 actual:
const totalInSec = sec.items.filter(i => isAlertAllowed(i.id)).length;

// Cambiar a:
const totalInSec = sec.items.length;  // total ABSOLUTO del catalogo

// activeInSec NO se toca:
const activeInSec = sec.items.filter(i => toggles[i.id] && isAlertAllowed(i.id)).length;
```

**Cuidado:**
El header global de la pantalla (L409 aprox) tambien tiene un contador `X/Y` pero ahi el comportamiento puede ser distinto — confirmar con Fernando si quiere mismo criterio (denominador absoluto) o mantener el de plan filtrado. Si es lo mismo, aplicar el cambio tambien en L409.

**Validacion en Samsung:**
Login como PRO. Abrir Alertas. Mirar contadores por seccion: deben mostrar denominador completo incluyendo alertas con candado por plan.

---

### Bug #4 — AlertCreateModal: rebote falso "Pasate a ELITE"

**Que esta mal exactamente:**
Cuando el usuario abre AlertCreateModal desde la campana de un activo (Portfolio o Watchlist) y elige crear "Alerta de Precio" (precio objetivo) o "Alerta de Porcentaje" (variacion), el modal arma el body del POST con `tipo: 'precio'` o `tipo: 'porcentaje'`.

Backend en `server.js` (probable) tiene un mapping PLAN_LIMITS asi:
```javascript
PLAN_LIMITS = {
  FREE: { tipos: ['precio_objetivo', 'variacion_brusca'] },
  PRO:  { tipos: ['precio_objetivo', 'variacion_brusca', 'apertura', 'cambio_senal', ...] },
  ELITE: { tipos: ['*'] }
}
```

Backend evaluador: `if (!planConfig.tipos.includes(body.tipo)) return 403 plan_limit_reached`. Como `'precio'` NO esta en ninguna lista, devuelve 403 con mensaje "ELITE-only" o "PRO o ELITE". El frontend interpreta el 403 y muestra PlanLimitModal con "Pasate a ELITE", incluso cuando el usuario es PRO y deberia poder crear esa alerta.

Es un mismatch de naming: el frontend usa nombres cortos ("precio", "porcentaje") pero el backend espera los nombres canonicos del schema ("precio_objetivo", "variacion_brusca").

**Como se ajusta:**
Localizar el callsite que arma el body del POST a `/api/alertas`. Buscar con grep:

```bash
grep -rnE "tipo:.*['\"]precio['\"]|tipo:.*['\"]porcentaje['\"]" src/
```

En cada llamada agregar un mapping defensivo antes del POST. Una opcion es crear una funcion helper en `lib/alertas.js`:

```javascript
// lib/alertas.js
export const mapTipoAlerta = (tipoUI) => {
  const map = {
    'precio': 'precio_objetivo',
    'porcentaje': 'variacion_brusca',
  };
  return map[tipoUI] || tipoUI;  // si ya es canonico, pasa de largo
};
```

Y en el callsite:
```javascript
import { mapTipoAlerta } from '../lib/alertas';

// Antes del POST:
const body = {
  ...formData,
  tipo: mapTipoAlerta(formData.tipo),  // 'precio' -> 'precio_objetivo'
};
await fetch(`${BACKEND}/api/alertas`, { method: 'POST', body: JSON.stringify(body), ... });
```

Alternativamente, si solo hay un lugar que arma el POST, hacer el mapping inline ahi mismo.

**Validacion previa antes de codear:**
Confirmar en el backend (`server.js`) los nombres EXACTOS del schema. Grep en `aurex-backend`:
```bash
grep -nE "PLAN_LIMITS|tipos:|tipo ==" server.js
```

**Validacion en Samsung:**
Login como PRO. Abrir Portfolio o Watchlist. Tap campana de un activo. Crear "Alerta de Precio" con un valor objetivo. Backend debe aceptar con 200 OK, alerta debe aparecer en MisAlertas, sin POP "Pasate a ELITE".

---

### Bug #5 — IA tap candado RSI/MACD: POP error + pantalla "Elige tu plan FREE $" mal renderizada

**Que esta mal exactamente:**
Al estar en IAScreen como FREE o PRO, hacer tap en un activo expande las "Razones" de la senal. Dentro de las razones hay una seccion "Analisis Tecnico" con candados (icono lock) en items RSI, MACD u otros indicadores tecnicos. Al hacer tap en uno de esos candados se dispara DOS cosas:

1. Un Alert.alert con texto generico "Error" (sin detalle, similar al de SubscriptionScreen — probable que sea el mismo Alert.alert reutilizado).
2. Detras del Alert, en background, se renderiza una pantalla con titulo "Elige tu plan FREE $" mal formateada (precios en posiciones raras, layout cortado, falta info). Es el mismo bug visual que aparecia en el emulador antes de los fixes de Build 21.

Causa hipotetica: el handler del tap del candado tiene un try/catch que en el catch dispara un Alert (de ahi el POP "Error"). Y antes/despues del catch hace navigation.navigate('Subscription') con algun prop o sin prop necesario. La SubscriptionScreen recibe un state corrupto y rendera incompleta.

**Como se ajusta:**
Paso 1 — diagnosticar. Capturar logcat fresh con la app abierta y tocar el candado. Buscar:
```bash
adb logcat -d | grep -iE "ReactNativeJS|console.error|aurex.*candado|aurex.*lock|IAScreen|navigate.*Subscription"
```

Encontrar el `console.error` (si existe) o el handler completo en `IAScreen.js`. Grep:
```bash
grep -nE "candado|locked|onPressLock|Analisis Tecnico|RSI|MACD" /Users/fernandomoscon/AurexApp/src/screens/IAScreen.js
```

Paso 2 — ajustar segun lo que se encuentre. Dos escenarios:

**Escenario A — handler navega a Subscription:**
```javascript
// Actual (hipotetico):
onPress={() => {
  navigation.navigate('Subscription');  // sin props
}}

// Ajuste:
onPress={() => {
  navigation.navigate('Subscription', { from: 'ia_analisis_tecnico' });  // con context
}}
```

Y en SubscriptionScreen leer ese prop para mostrar la pantalla correctamente sin renderer corrupto.

**Escenario B — handler intenta mostrar PlanLimitModal pero falla:**
```javascript
// Actual (hipotetico):
onPress={() => {
  if (plan !== 'ELITE') {
    setShowPlanLimitModal(true);  // pero el modal no esta importado/renderizado correctamente aca
  }
}}

// Ajuste:
// Asegurar que <PlanLimitModal visible={showPlanLimitModal} plan={plan} message={...} ... /> este renderizado en IAScreen al final del JSX.
```

Paso 3 — eliminar el Alert.alert generico del handler si no es necesario; reemplazar por el modal de plan correcto.

**Validacion en Samsung:**
Login FREE o PRO. Ir a AI. Tap en un activo. Expand razones. Tap candado RSI o MACD. Resultado esperado: aparece PlanLimitModal limpio con texto "Esta funcion requiere ELITE / Pasate a ELITE" y boton de upgrade. NO debe aparecer Alert "Error". NO debe aparecer pantalla "Elige tu plan" deformada.

---

### Bug #6 — SubscriptionScreen: Alert "Error" sin e.message real

**Que esta mal exactamente:**
Codigo actual en `SubscriptionScreen.js` L78:
```javascript
} catch (e) {
  if (!e.userCancelled) Alert.alert(t('error'), e.message);
}
```

Cuando `purchasePackage()` falla con un error donde `e.message` viene `undefined`, `null` o string vacio (puede pasar segun version de SDK o tipo de error), el Alert se muestra como:
- Titulo: "Error"
- Mensaje: (vacio)

El usuario ve un cartel inutil. Tambien, en el logcat NO aparece el objeto error completo porque no hay `console.error`, asi que para debug futuro queda imposible saber que paso.

**Como se ajusta:**
Reemplazar L78 por:
```javascript
} catch (e) {
  console.error('[SUB] purchase failed:', e);  // dispara log en logcat con objeto error completo
  if (!e.userCancelled) {
    Alert.alert(
      'Error',
      e.message || e.toString() || 'No se pudo procesar la compra. Intentalo de nuevo o contactanos.'
    );
  }
}
```

Cambios:
1. `console.error` con el objeto completo: en logcat aparece como `unknown:ReactNative: console.error: [SUB] purchase failed: {code: ..., message: ..., underlyingErrorMessage: ...}`. Critico para debug.
2. Fallback explicito en el Alert con 3 niveles: `e.message` → `e.toString()` → texto generico amigable.
3. Titulo cambia de `t('error')` a `'Error'` (mas directo, no depende de i18n).

Aplicar el MISMO patron en `handleRestore` (L92 aprox) que tambien tiene el problema.

**Validacion en Samsung:**
Forzar un error (por ejemplo intentar comprar cuando NO hay conexion). El Alert debe mostrar mensaje informativo o fallback amigable. El logcat debe tener una linea `console.error` con el objeto error completo.

---

### Bug #7 — UpsellBanner faltante en PortfolioScreen

**Que esta mal exactamente:**
PortfolioScreen muestra "Valor Total" del portfolio del usuario (suma de cantidad x precio actual de todos los activos). Para usuarios FREE y PRO no hay ningun banner promocional o llamado a upgrade en esa pantalla. En Build 21 se intento agregar a MercadosScreen pero se saco porque saturaba la vista de precios. La pantalla logica para tener el banner es Portfolio porque es donde el usuario ve su valor invertido y es ideal para sugerir upgrade ("Sumate a PRO para ver señales IA en estos activos").

**Como se ajusta:**
Paso 1 — verificar que `UpsellBanner` existe en `src/components/UpsellBanner.js` y soporta prop `compact`. Grep:
```bash
grep -nE "export.*UpsellBanner|compact" /Users/fernandomoscon/AurexApp/src/components/UpsellBanner.js
```

Paso 2 — en `PortfolioScreen.js`, ubicar el componente que renderea "Valor Total". Buscar con grep:
```bash
grep -nE "Valor Total|valor_total|valorTotal|currentPlan" /Users/fernandomoscon/AurexApp/src/screens/PortfolioScreen.js
```

Paso 3 — importar y agregar el banner JUSTO despues del bloque de Valor Total:
```jsx
import UpsellBanner from '../components/UpsellBanner';

// ... dentro del render, despues del Valor Total:
<View style={st.valorTotalContainer}>
  <Text style={st.label}>Valor Total</Text>
  <Text style={st.value}>{formatCurrency(valorTotal)}</Text>
</View>

{/* NUEVO en Build 22 */}
{(currentPlan === 'FREE' || currentPlan === 'PRO') && (
  <UpsellBanner compact />
)}
```

Solo mostrar el banner si el plan es FREE o PRO. Si es ELITE no se muestra (ya es el plan top).

**Cuidado:**
Confirmar con Fernando + Escritorio:
- Texto del banner para Portfolio (puede ser diferente del que se usaba en Mercados antes).
- Si tiene que ser dismissible (con X para cerrar) o permanente.

**Validacion en Samsung:**
Login FREE → ver banner UpsellBanner debajo de Valor Total con tono dorado (upgrade a PRO).
Login PRO → ver banner UpsellBanner debajo de Valor Total con tono violeta (upgrade a ELITE).
Login ELITE → NO ver banner.

---

## CONTEXTO ADICIONAL

### Lo que YA esta en Build 21 (validado por Fernando en Samsung):
- SignupScreen nueva + flow auth.signUp + POST `/api/usuario` Capa 1+2 self-heal — OK
- Onboarding 2 botones (Crear cuenta gratis dorado + Ya tengo cuenta gris) — OK
- Cross-links Login ↔ Signup — OK
- Pulse Ver variables tiering 3 niveles (FREE redirige, PRO 14 vars, ELITE +seccion extra) — OK
- UpsellBanner sacado de Mercados (saturaba precios) — OK
- Banners IA con copy ajustado ("Razonamiento detallado en señales IA — Disponible en ELITE") — OK
- PlanLimitModal con X de cerrar + "Ahora no" blanco subrayado — OK
- AlertasScreen contador header de plan (15 → 14 cuando GDELT esta bloqueado para PRO) — OK
- 11 evaluadores backend alertas no-precio (apertura, alta_conviccion_ia, etc.) — OK
- WatchlistScreen USER_ID dinamico (bug seguridad) — OK
- 5 promesas falsas eliminadas de i18n.js — OK
- Banner PWA upsell aurex.live — OK

### Lo que NO se pudo validar en Samsung en esta sesion:
- Cold reboot persistencia sesion D3 (pendiente).
- Push notifications FCM en device real (pendiente).
- Comprar plan real con tester valido (BLOQUEADO por bug #1 de este cuadro).

---

## DEPENDENCIAS BUILD 22

- Bug #1 (compra IAP) NO requiere cambio de codigo, solo investigacion externa. **Ticket a RevenueCat support ENVIADO 15-may ~03:00 AR** (ver `briefs/TICKET_REVENUECAT_FINAL_15MAY.md`). Datos clave: RC App ID app8be7db09a7, Project ID proj228caf37, 11 hipotesis descartadas, 5 screenshots adjuntos. Respuesta esperada en `fmoscon@gmail.com` hasta 2 dias habiles.
- Bugs #2-7 son cambios de codigo independientes y se pueden agrupar en un solo Build 22 si Escritorio + Fernando aprueban. NO dependen del fix IAP.

## REGLA OPERATIVA

NO compilar Build 22 sin:
1. OK explicito de Escritorio sobre el cuadro. **DADO 15-may ~03:30 AR con condiciones (ver Seccion abajo).**
2. OK de Fernando sobre el scope. **PENDIENTE.**
3. Mockup `.md` previo en `Desktop/CODE/AurexApp/mockups/` para bugs #2 y #7 (cambios visuales). **PENDIENTE.**

---

## FEEDBACK DE ESCRITORIO + ACUERDOS BUILD 22 (15-may ~03:30 AR)

Escritorio leyo el cuadro completo desde GitHub raw y dio OK general con observaciones por bug. Resumen:

### Bug #1 — Acuerdo total
NO tocar codigo. Esperar respuesta RC. Observacion: el `bulkAcquire` skipped DOS VECES en logcat es el dato mas raro y ya esta en el ticket enviado.

### Bug #2 — Acuerdo en el fix
Patron flex 3 zonas correcto. Observacion adicional de Escritorio: el `Platform.OS === 'ios' ? 32 : 16` para paddingBottom es correcto. Considerar wrap del Modal en `KeyboardAvoidingView` con `behavior="padding"` en iOS y `behavior="height"` en Android para que el boton quede correctamente posicionado cuando el teclado sube, especialmente si el Modal tiene `position: absolute`. Para Android (Samsung, prioridad), el fix flex puro alcanza. Verificar tambien si existe un segundo modal "Editar Activo" con el mismo problema. **Verificacion Code 15-may 03:35 AR**: no se encontro modal "Editar Activo" en PortfolioScreen.js (solo el modal de Agregar). NO se necesita fix adicional para Editar.

### Bug #3 — Acuerdo + extension
Aplicar mismo criterio (denominador absoluto) tanto en headers de seccion (L582) como en el header global de la pantalla (L409). Logica de upsell consistente para ambos. NO consultar a Fernando, es decision tecnica coherente con la intencion expresada.

### Bug #4 — Diferencia importante + condicion previa
Escritorio detecto inconsistencia interna en el cuadro original (decia `'umbral'` en un lugar y `'variacion_brusca'` en otro). Pidio verificar nombres exactos en `server.js` antes de implementar el helper.

**Verificacion Code 15-may 03:35 AR contra `aurex-backend/server.js`:**

PLAN_LIMITS canonico (L1538-1560):
```javascript
PLAN_LIMITS = {
  FREE:  { alertTypes: ['umbral', 'precio_objetivo', 'variacion_brusca', 'max_min', 'apertura'] },
  PRO:   { alertTypes: [...FREE, 'alta_conviccion_ia', 'cambio_senal', 'senal_portfolio', 'cambio_zona_pulse', 'por_categoria', 'termometro_riesgo', 'fed_fomc', 'cpi_pbi', 'earnings'] },
  ELITE: { alertTypes: [...PRO, 'geopolitica_gdelt'] }
}
```

Adicional L736 (validacion runtime de alertas de precio para evaluacion, NO para creacion):
```javascript
const TIPOS_ALERTA_PRECIO = ['umbral', 'precio_objetivo', 'variacion_brusca', 'max_min', 'precio'];
```

**Conclusion del mapping:**
- `'precio'` (UI) → `'precio_objetivo'` (canonico) — **CORRECTO**. Esta en FREE/PRO/ELITE.
- `'porcentaje'` (UI) → `'variacion_brusca'` (canonico) — **CORRECTO**. Esta en FREE/PRO/ELITE.

Nota: el backend acepta `'precio'` en TIPOS_ALERTA_PRECIO (para EVALUAR alertas existentes) pero NO en PLAN_LIMITS.alertTypes (para CREAR alertas). Por eso el POST falla mientras que las alertas viejas con `tipo: 'precio'` que ya existen en DB siguen evaluandose.

Bug #4 **LISTO para implementar** con mapping confirmado.

### Bug #5 — Acuerdo + test previo a codear
Logcat fresh primero, despues codear. Escritorio agrega hipotesis concreta: probable que `navigation.navigate('Subscription')` se llame sin los props/params necesarios y SubscriptionScreen renderee con valores undefined (de ahi el "Elige tu plan FREE $" deformado). Antes de tocar codigo, Fernando deberia capturar screenshot de lo que se ve atras del Alert para confirmar si es SubscriptionScreen o PlanLimitModal.

### Bug #6 — Acuerdo + extension importante
console.error en SubscriptionScreen confirmado. Escritorio agrega: hacer grep global de TODOS los `catch (e)` en `src/screens/` y arreglar los que solo tengan `Alert.alert` sin `console.error`. **Verificacion Code 15-may 03:35 AR**: 18+ bloques `catch (e)` en src/screens/. Los siguientes screens tienen catch con Alert sin console.error o sin logging util:
- `SubscriptionScreen.js` L62, L77, L94 (loadOfferings, handlePurchase, handleRestore)
- `LoginScreen.js` L37, L64
- `SignupScreen.js` L86, L109
- `PerfilScreen.js` L111, L198, L246, L268

Recomendacion ampliada para Build 22: aplicar el patron `console.error('[Screen] action failed:', e); Alert.alert('Error', e.message || e.toString() || fallback)` en TODOS estos puntos. Tiempo estimado adicional: 15 min.

### Bug #7 — Acuerdo + texto sugerido
Banner debajo de Valor Total, NO dismissible. Texto sugerido por Escritorio:
- Plan FREE: "Activa señales IA para estos activos — disponible en PRO"
- Plan PRO: "Activa analisis tecnico avanzado en tu portfolio — disponible en ELITE"

Mas relevante que un banner generico de upgrade. Decision final del texto: Fernando.

---

## OK ESCRITORIO + CONDICIONES PARA BUILD 22

Escritorio dio OK condicional 15-may ~03:30 AR:
1. **CODE puede proceder ya sin mas verificacion**: bugs #2, #3, #6.
2. **Listo tras verificar server.js (HECHO por Code 03:35 AR)**: bug #4.
3. **Pendiente test Fernando**: bug #5 — capturar screenshot atras del Alert + nuevo logcat al tocar candado.
4. **Pendiente confirmacion Fernando**: bug #7 — texto del banner FREE y PRO.
5. **NO tocar**: bug #1 — esperar respuesta RC support.

## SCOPE PROPUESTO BUILD 22

| Tier | Bugs incluidos | Estado |
|------|----------------|--------|
| Tier A (ya listos) | #2, #3, #4, #6 | LISTOS para implementar tras OK Fernando |
| Tier B (pre-test/confirmacion) | #5 (test logcat) + #7 (texto banner) | Pendiente input Fernando |
| Tier C (externo) | #1 | Esperar respuesta RC |

Build 22 se compilara cuando Tier A + Tier B esten resueltos. Tier C NO bloquea Build 22.

---

## ARCHIVOS RELACIONADOS

- Brief operativo Build 21: `/Users/fernandomoscon/Desktop/aurex-app/briefs/BRIEF_BUILD21_ESTADO_15MAY.md`
- Informe completo bug compra IAP: `/Users/fernandomoscon/Desktop/aurex-app/briefs/INFORME_COMPRA_IAP_15MAY_PARA_ESCRITORIO.md`
- Session active Escritorio: `/Users/fernandomoscon/Desktop/aurex-app/briefs/SESSION_ACTIVE_ESCRITORIO_CHROME.md`

URLs publicas (post commit):
- Cuadro bugs: `https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/CUADRO_BUGS_BUILD21_PARA_BUILD22.md`
- Informe IAP: `https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/INFORME_COMPRA_IAP_15MAY_PARA_ESCRITORIO.md`
