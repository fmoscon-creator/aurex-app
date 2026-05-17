# ANALISIS CONSOLIDADO BUILD 25 — Code + Escritorio

Fecha: 15-may-2026 ~16:30 AR
Autor: Code consolidando analisis Tier 2 verificado por Escritorio + analisis Tier 1 IAP propio + nuevos Bug G y Bug H reportados.
Cambio operativo: Fernando solicito que **Code valide cada bug en emulador antes de compilar AAB**. No mas compilaciones a ciegas que vayan a Play Console Prueba Interna sin validacion previa.

---

## 1. RESUMEN — 6 items confirmados para Build 25

| # | Bug | Severidad | Origen | Tipo |
|---|-----|-----------|--------|------|
| **G** | PlanLimitModal sigue mostrando "PASATE A PRO" en alertas ELITE-only | P0 | Smoke test Build 24 — fix Build 24 no llego a tomar efecto | Frontend |
| **H** | Modal Agregar Activo: campo Precio cortado por teclado en Android | P0 | Smoke test Build 24 NUEVO | Frontend |
| **IAP-1** | Frontend nunca llama Purchases.logIn(uid) → user anonimo en RC | P0 pre-lanzamiento | Analisis profundo Code 15-may | Frontend |
| **IAP-2** | Backend webhook descarta usuarios anonimos silenciosamente | P0 pre-lanzamiento | Analisis profundo Code 15-may | Backend |
| **IAP-3** | Frontend no llama Purchases.logOut() en logout | P2 | Analisis profundo Code | Frontend |
| **IAP-4** | Producto fantasma `aurex.elite.monthly` (sin "2") en Play Console — verificar | P3 | Tier 2 Escritorio | Verificacion Play Console |

---

## 2. ANALISIS TIER 2 — VERIFICADO ESCRITORIO 15-may

### ITEM 1 — License Response — OK
Escritorio confirmo en Play Console > Configuracion > Prueba de licencia: `RESPOND_NORMALLY`. Lista "AUREX Testers" con 4 usuarios y checkbox activado. **No hay problema.**

### ITEM 2 — Subscription Group — NO VERIFICABLE en UI nueva
Play Console version nueva removio el campo "Grupo de suscripcion" de la vista de producto. Los grupos son implicitos en la nueva UI. Los 4 productos existen como suscripciones independientes con 1 plan basico activo en 174 paises.

### ITEM 3 — Producto fantasma `monthly` (sin "2") — DATO CRITICO NUEVO
Escritorio detecto que solo ELITE Mensual tiene sufijo `2`: `com.fernandomoscon.aurex.elite.monthly2`. Los otros 3 productos NO tienen sufijo. Esto sugiere que existio un `com.fernandomoscon.aurex.elite.monthly` (sin "2") en algun estado anterior.

**Verificacion Code 15-may 16:30 AR — grep en frontend + backend:**
- Frontend: cero ocurrencias de `aurex.elite.monthly` sin sufijo `2`.
- Frontend: SOLO existe `aurex.elite.monthly2` (con 2) en `PerfilScreen.js L494` (codigo legacy de Build 18 para forzar compra). El SubscriptionScreen actual NO hardcodea product IDs — los obtiene de `offerings.current.availablePackages` (RevenueCat).
- Backend `server.js`: cero ocurrencias de product IDs hardcodeados de elite/pro.

**Conclusion Code**: el codigo NO esta mandando ningun product ID viejo o duplicado. Si existe un producto fantasma `aurex.elite.monthly` (sin "2") sigue siendo SOLO en Play Console, no en el codigo. **Accion pendiente para Escritorio**: verificar via Chrome si en Play Console → Monetizar → Suscripciones aparece un producto `com.fernandomoscon.aurex.elite.monthly` (sin "2") en estado Inactive, Archived, o cualquier otro estado distinto a Active.

---

## 3. BUG G — analisis post-Build 24 (FALLO en smoke test)

### Que se aplico en Build 24
Tres cambios coordinados:
- **G.1** AlertasScreen L640: `setPlanLimitInfo({ visible: true, plan: userPlan, message, requiredPlan: isEliteOnly ? 'ELITE' : 'PRO' })`
- **G.2** PlanLimitModal L24-25: agregar prop `requiredPlan` + `upgradeTarget = requiredPlan || (plan === 'PRO' ? 'ELITE' : 'PRO')`
- **G.3** PlanLimitModal L26: `upgradeColor = upgradeTarget === 'ELITE' ? COLORS.gold : COLORS.proPurple`

### Causa raiz del fallo (CONFIRMADA al releer el codigo Build 24)

**El callsite del componente `<PlanLimitModal />` en AlertasScreen L1070-1079 NO le pasa la prop `requiredPlan`.** El render solo extrae 4 props del state `planLimitInfo`:

```jsx
<PlanLimitModal
  visible={planLimitInfo.visible}
  plan={planLimitInfo.plan}
  message={planLimitInfo.message}
  onClose={() => setPlanLimitInfo({ visible: false })}
  onUpgrade={() => { ... }}
/>
```

**El state ahora tiene `requiredPlan` (lo agregue en Build 24 G.1) pero la prop nunca llega al componente porque no se extrae del state al render.** Por eso el componente cae siempre al fallback `(plan === 'PRO' ? 'ELITE' : 'PRO')` y para usuarios FREE devuelve 'PRO' siempre.

### Fix Build 25 propuesto (cambio minimo de 1 linea)

En AlertasScreen.js L1070-1079, agregar la prop `requiredPlan`:
```jsx
<PlanLimitModal
  visible={planLimitInfo.visible}
  plan={planLimitInfo.plan}
  message={planLimitInfo.message}
  requiredPlan={planLimitInfo.requiredPlan}   // ← AGREGAR esta linea
  onClose={() => setPlanLimitInfo({ visible: false })}
  onUpgrade={() => { ... }}
/>
```

**Verificacion en otros 3 callsites del modal**:
- PortfolioScreen L1648-1654 — NO pasa `requiredPlan` (queda con fallback, OK porque solo se invoca para límite portfolioMax, no para tipos ELITE-only)
- WatchlistScreen L1332-1338 — idem (límite watchlistMax)
- AlertCreateModal L288-294 — idem (en teoria nunca dispara por mapeo correcto de tipos)

**Solo AlertasScreen necesita el cambio.** Los otros 3 quedan sin tocar.

### Por que paso esto en Build 24

Tier A se implemento sin tener un test runtime en device para validar G en vivo. El parse + lint dieron OK porque la prop optional no rompe sintaxis. La logica fallo silenciosamente porque el fallback es valido para el caso PRO (cuando user es FREE).

**Leccion para Build 25**: validar Bug G EN EMULADOR antes de compilar AAB. Probar tap candado Geopolitica → verificar boton dice ELITE.

---

## 4. BUG H — modal Agregar Activo cortado por teclado Android (NUEVO P0)

### Reporte de Fernando
"El modal Agregar Activo no ajusta su posición/altura cuando el teclado está abierto en Android. El campo Precio queda cortado y el usuario no puede ver los 4 campos (Nombre, Ticker, Cantidad, Precio) completos encima del botón Guardar."

### Nota Code sobre el reporte
El modal post-Build 22 tiene **2 campos en el form**, NO 4: Cantidad + Precio. El "Nombre" y "Ticker" no son campos editables — son resultado de la seleccion del activo en el buscador (se muestran en `selectedRow` arriba del form). Probable que Escritorio se haya referido al header del activo seleccionado + los 2 campos editables como "4 piezas a ver".

### Estructura actual modal Build 24 (PortfolioScreen.js L1179-1290)

```jsx
<Modal visible animationType="fade">
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}   // ← Android usa 'height'
  >
    <View style={modalOverlay}>                              // flex:1 + center+center
      <View style={modalCard}>                                // maxHeight:85%, flexDirection:column
        <View modalHeader>...</View>                          // Zona 1
        {!editingId && <TextInput buscar />}
        {addForm.simbolo ? (
          <>
            <ScrollView                                        // Zona 2 — sin flex:1 (fix Build 23)
              style={{ marginTop: 12 }}
              keyboardShouldPersistTaps="handled"
            >
              <View selectedRow />                             // simbolo + nombre del activo
              <Text fieldLabel>Cantidad</Text>
              <TextInput cantidad returnKeyType="next" />
              <Text fieldLabel>Precio compra</Text>
              <TextInput precio_compra returnKeyType="done" />
              {preview en vivo}
            </ScrollView>
            <View>                                             // Zona 3 sticky
              <TouchableOpacity saveBtn>Guardar</TouchableOpacity>
            </View>
          </>
        ) : null}
      </View>
    </View>
  </KeyboardAvoidingView>
</Modal>
```

### Hipotesis Code sobre causa raiz Bug H

**Hipotesis 1 — KeyboardAvoidingView con behavior='height' en Android no funciona bien con Modal RN.**

Es un quirk conocido. Cuando el modal es transparente y el padre es un Modal RN, `behavior='height'` puede no recortar el padding inferior del modalCard cuando el teclado abre. Resultado: el modalCard mantiene su altura completa (85% del screen) pero el teclado se superpone abajo, cortando los campos que estan en el fondo del ScrollView (en este caso el campo Precio + Preview + boton Guardar).

**Workaround probado en otros proyectos**:
- Usar `behavior='padding'` en Android tambien (no 'height'). Reduce el padding del KeyboardAvoidingView en lugar de la altura.
- Agregar `android:windowSoftInputMode="adjustResize"` en AndroidManifest.xml MainActivity.
- O remover el KeyboardAvoidingView y manejar manualmente con `Keyboard.addListener('keyboardDidShow', ...)`.

**Hipotesis 2 — Bug H podria ser resultado de fix Build 23 (ScrollView sin flex:1)**

Cuando saque el `flex:1` del ScrollView Zona 2 en Build 23 (porque colapsaba a 0), el ScrollView ahora toma altura natural del contenido. Si el contenido es grande (selectedRow + 2 labels + 2 TextInputs + Preview en vivo de 4 lineas), puede crecer mas alla del espacio disponible cuando el teclado abre.

Sin flex:1 el ScrollView no "encoge" cuando el espacio disponible se reduce. Resultado: contenido visible cortado abajo.

**Fix candidatos para Build 25 (sin elegir hasta OK Escritorio)**:

A. Cambiar `behavior='padding'` en Android: posible que resuelva sin tocar mas nada.
B. Volver a poner `flex:1` al ScrollView Zona 2, pero esta vez dando height definida al modalCard cuando el teclado abre (con listener `Keyboard.addListener`).
C. Reducir el preview en vivo cuando el teclado abre (esconder o colapsar para dar mas espacio a los inputs).
D. Cambiar `maxHeight: '85%'` a `height: '70%'` cuando keyboard activo.

**Recomendacion provisional**: probar opcion A primero (cambio minimo de 1 linea). Si no resuelve, probar B+C combinados.

---

## 5. ANALISIS TIER 1 IAP — confirmaciones Escritorio + callsites reales para Build 25

Escritorio confirmo los 2 bugs criticos del analisis Code. Aprobo los 4 fixes Tier 1 + los 2 commits separados (uno frontend, uno backend). Antes de tocar codigo pide ver los callsites reales.

### IAP-1 — Frontend logIn ausente

**App.js L42-49 actual**:
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

**Fix Build 25 propuesto**:
```jsx
useEffect(() => {
  (async () => {
    Purchases.setLogLevel(LOG_LEVEL.VERBOSE);
    if (Platform.OS === 'ios') {
      Purchases.configure({ apiKey: REVENUECAT_IOS_KEY });
    } else if (Platform.OS === 'android') {
      Purchases.configure({ apiKey: REVENUECAT_ANDROID_KEY });
    }
    // Build 25: identificar user en RC si ya hay session al arranque
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.id) {
        await Purchases.logIn(session.user.id);
        console.log('[Purchases] logIn at boot uid:', session.user.id);
      }
    } catch (e) {
      console.warn('[Purchases] logIn at boot fallo:', e?.message);
    }
  })();
}, []);
```

### IAP-2 — LoginScreen.js — 2 success paths

**Estado actual L30-66 (Build 23/24)**:
LoginScreen tiene 2 paths donde `onSuccess()` se llama:
- L31-34 (intento SDK): `if (!error && data?.session) { ... if (onSuccess) onSuccess(); return; }`
- L52-61 (fetch directo): `if (data.access_token) { ... if (onSuccess) onSuccess(); return; }`

Ambos paths necesitan llamar `Purchases.logIn(uid)` antes de `onSuccess()`.

**Fix Build 25 propuesto** (en cada path, ANTES de `if (onSuccess) onSuccess()`):
```jsx
const uid = data.session?.user?.id || data.user?.id;
if (uid) {
  try { await Purchases.logIn(uid); console.log('[Purchases] logIn login uid:', uid); }
  catch (e) { console.warn('[Purchases] logIn login fallo:', e?.message); }
}
```

### IAP-3 — SignupScreen.js — 1 success path

**Estado actual L75-93**:
Despues del `supabase.auth.signUp` exitoso y POST a `/api/usuario`, llama `onSuccess()`. Antes hay try/catch del POST.

**Fix Build 25 propuesto** (insertar antes de `if (onSuccess) onSuccess()` en L91):
```jsx
const uid = data.user.id;
try { await Purchases.logIn(uid); console.log('[Purchases] logIn signup uid:', uid); }
catch (e) { console.warn('[Purchases] logIn signup fallo:', e?.message); }
```

### IAP-4 — PerfilScreen.js logout — Purchases.logOut ausente

**Estado actual L235-251**:
```jsx
const logout = async () => {
  try {
    try { await supabase.auth.refreshSession(); } catch {}
    await supabase.auth.signOut();
    await AsyncStorage.clear();
    Alert.alert(t('sesion_cerrada'), t('reinicia_app'));
  } catch (e) { ... }
};
```

**Fix Build 25 propuesto** (insertar `Purchases.logOut()` ANTES de `supabase.auth.signOut()`):
```jsx
const logout = async () => {
  try {
    // Build 25: limpiar identidad de Purchases ANTES del signOut Supabase
    try { await Purchases.logOut(); console.log('[Purchases] logOut OK'); }
    catch (e) { console.warn('[Purchases] logOut fallo:', e?.message); }
    try { await supabase.auth.refreshSession(); } catch {}
    await supabase.auth.signOut();
    await AsyncStorage.clear();
    Alert.alert(t('sesion_cerrada'), t('reinicia_app'));
  } catch (e) { ... }
};
```

### IAP-5 — Backend webhook log mas visible

**Estado actual aurex-backend/server.js L1640-1643**:
```javascript
if (!isUUID) {
  console.warn(`[RevenueCat Webhook] app_user_id no es UUID: ${appUserId} — quizas usuario anonymous. No se actualiza Supabase.`);
  return res.json({ ok: true, skipped: 'non-UUID app_user_id' });
}
```

**Fix Build 25 propuesto**:
```javascript
if (!isUUID) {
  console.error(`[RevenueCat Webhook] CRITICO: app_user_id no es UUID: ${appUserId}. ` +
    `Event: ${event.type}, product: ${event.product_id}, env: ${event.environment}. ` +
    `Plan no se actualiza. Verificar que el frontend llame Purchases.logIn(uid) post-login.`);
  return res.json({ ok: true, skipped: 'non-UUID app_user_id' });
}
```

Cambios:
- `console.warn` → `console.error` (mas visible en Railway logs)
- Mensaje mas explicito con tipo de evento y environment
- TODO opcional: agregar `sendTelegramAlert()` para alertas de production (no critico para Build 25)

---

## 6. PLAN UNIFICADO BUILD 25 — 6 fixes + bump + validacion EN EMULADOR

### Cambio de proceso operativo (a pedido de Fernando)
**Code NO compila AAB ni sube a Play Console Prueba Interna hasta validar cada bug en emulador.** Cero compilaciones a ciegas.

Pasos del flujo:
1. Code implementa los 6 fixes (NO commiteado)
2. Code arranca emulador Android (probable AVD existente o `~/Library/Android/sdk/emulator/emulator -list-avds`)
3. Code instala el build dev en emulador (con `npx react-native run-android` o equivalente)
4. Code valida cada bug en emulador con screenshots/observacion directa
5. Si TODO PASA → commit + push + compile AAB + backup
6. Solo despues Fernando sube AAB a Play Console Prueba Interna
7. Smoke test final en Samsung con `aurextester12@gmail.com`

### Tabla final fixes Build 25

| # | Bug | Archivo | Cambio | Validacion emulador |
|---|-----|---------|--------|----------------------|
| **G** | Modal upgrade no pasa requiredPlan | AlertasScreen.js L1070-1079 | +`requiredPlan={planLimitInfo.requiredPlan}` prop | Tap candado Geopolitica FREE → boton dice "Pasate a ELITE" dorado |
| **H** | Modal Agregar Activo cortado teclado | PortfolioScreen.js L1180 (probable) | Cambiar `behavior='height'` → `behavior='padding'` en Android, o solucion alternativa segun lo que decida Escritorio | Abrir modal + tap Cantidad + escribir + tap Precio + escribir → ver Precio visible y boton Guardar accesible |
| **IAP-1** | Purchases.logIn at boot | App.js L42-49 | Bloque (async () => {...})() con getSession + logIn | Logcat al arranque: ver "[Purchases] logIn at boot uid: <UUID>" |
| **IAP-2** | Purchases.logIn post-login | LoginScreen.js L34 y L60 | logIn(uid) antes de onSuccess() en ambos paths | Logcat al login: "[Purchases] logIn login uid:" |
| **IAP-3** | Purchases.logIn post-signup | SignupScreen.js L91 | logIn(uid) antes de onSuccess() | Logcat al signup: "[Purchases] logIn signup uid:" |
| **IAP-4** | Purchases.logOut at logout | PerfilScreen.js L237 | logOut() antes de auth.signOut() | Logcat al logout: "[Purchases] logOut OK" |
| **IAP-5** | Backend webhook log critico | aurex-backend/server.js L1641 | console.warn → console.error mensaje explicito | No validable en emulador (necesita test webhook). Validar via Railway logs cuando llegue webhook |
| **BUMP** | Bump version | android/app/build.gradle | versionCode 24 → 25, versionName 1.0.24 → 1.0.25 | — |

### Commits propuestos (siguiendo recomendacion Escritorio: 2 commits)
1. **Commit frontend** — repo AurexApp branch dev: G + H + IAP-1 + IAP-2 + IAP-3 + IAP-4 + bump 25
2. **Commit backend** — repo aurex-backend branch main: IAP-5

---

## 7. ACUERDOS Y DIFERENCIAS Code vs Escritorio

### Acuerdos completos
- Bug G fix con 1 linea (agregar prop al callsite)
- Bug H es nuevo P0 y necesita revision
- IAP-1 y IAP-2 son P0 pre-lanzamiento
- 2 commits, no 4 ni 6
- Tier 2 ítem 3 producto fantasma `monthly` sin "2" amerita verificar Play Console

### Diferencias menores
- **Numero de campos en Bug H**: Escritorio dijo 4 (Nombre, Ticker, Cantidad, Precio). Codigo real tiene 2 editables (Cantidad, Precio). Probable confusion semantica, no cambia el fix.
- **Hipotesis fix Bug H**: Code propone 4 opciones (A, B, C, D). Escritorio aun no eligio.

### Cosas pendientes de definir
1. **¿Que solucion para Bug H?** Escritorio + Code deben coordinar. Recomendacion Code: opcion A (behavior='padding' Android) primero por ser cambio minimo.
2. **¿Verificar producto fantasma `monthly` en Play Console?** Tier 2 item 3 — Escritorio puede hacerlo via Chrome ya.
3. **¿OK Fernando para que Code arranque implementacion de los 6 fixes + validacion en emulador local?**

---

## 8. RIESGOS Y MITIGACIONES

| Riesgo | Mitigacion |
|--------|------------|
| Bug H fix opcion A no resuelve | Probar opciones B/C/D en orden. Si todas fallan, refactorizar el modal a estructura distinta. |
| `Purchases.logIn` falla por error de SDK en build dev | Try/catch en cada callsite + console.warn. App sigue funcionando con anonymousID como fallback. |
| Backend webhook con `console.error` triggea alertas de monitoring innecesarias en prod | Solo se dispara cuando llega webhook con app_user_id no-UUID, lo cual NO deberia pasar post-fix IAP-1+2+3. Si pasa, es porque hay un bug real que queremos ver. |
| Validacion en emulador no replica comportamiento Samsung | Aun asi vale la pena: si falla en emulador, falla en Samsung. Si pasa en emulador, alta probabilidad de pasar en Samsung tambien. |

---

## 9. PROXIMOS PASOS — orden de ejecucion propuesto

1. **Fernando OK** sobre el plan Build 25 + cambio de proceso (validar en emulador antes de compilar).
2. **Escritorio elige opcion fix Bug H** (A/B/C/D) — Code recomienda A.
3. **Escritorio verifica Tier 2 item 3** (producto fantasma `monthly` sin "2") via Chrome.
4. **Code arranca implementacion** de los 6 fixes en disco (sin commit).
5. **Code valida en emulador** uno por uno:
   - Bug G: tap candado Geopolitica → boton ELITE
   - Bug H: modal Agregar Activo con teclado + Precio visible
   - IAP-1/2/3/4: logcat `[Purchases] logIn/logOut` apareciendo en eventos correctos
   - IAP-5: no aplica a emulador
6. **Code reporta resultados validacion** + screenshots al chat.
7. **Si TODO PASA** → 2 commits + push + compilar AAB Build 25 + backup.
8. **Fernando sube AAB** a Play Console Prueba Interna.
9. **Smoke test Samsung** con `aurextester12@gmail.com`.

---

## 10. URL publica para Escritorio

`https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/ANALISIS_CONSOLIDADO_BUILD25.md`
