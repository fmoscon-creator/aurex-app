# BRIEF BUILD 26 — Estado al 15-may-2026 19:55 AR

> Cierre antes de PAUSA Android para tratar rechazo Apple por nombre/marca.

---

## 1. Build 25 — RESULTADO TESTING REAL SAMSUNG

| Bug | Estado | Detalle |
|---|---|---|
| **G** PASATE A PRO/ELITE | ✅ PASA | Candado GDELT muestra "Pasate a ELITE" correctamente. Fix: agregar `requiredPlan={planLimitInfo.requiredPlan}` a `<PlanLimitModal>` L1070-1080 AlertasScreen. |
| **H** Modal Agregar Activo cortado | ❌ FALLA | Fix Build 25 (`KeyboardAvoidingView behavior='padding'`) no funcionó en Samsung real. Campo Precio cortado, hay que scrollear. Va a Build 26 con nuevo enfoque. |
| **I** Doble tap GUARDAR duplicaba | ✅ PASA | Guard sincrónico `if (saving) return` + `setSaving(true)` + try/finally. Spinner visible bloquea segundo tap. |

**Veredicto Build 25:** 2/3 OK. Build 25 NO va a producción. Reemplazado por Build 26.

---

## 2. Build 26 — IMPLEMENTACIÓN COMPLETA Y AAB LISTO

### Decisión Escritorio
- ❌ Opción D (librería externa `react-native-keyboard-aware-scroll-view`): descartada — dependencia innecesaria.
- ❌ Opción B fijo 60%: descartada — Z Flip 3 (pantalla angosta) quedaría chico sin teclado.
- ✅ **Opción B modificada: `maxHeight` dinámico** vía `Keyboard.addListener`.

### Diagnóstico real
- Manifest tiene `adjustResize` ✅, pero `<Modal>` RN crea Window propia que NO lo hereda.
- `KeyboardAvoidingView` en `<Modal>` Android es bug histórico RN.
- `modalCard maxHeight: 85%` se calcula sobre pantalla COMPLETA, no descontando teclado.
- Resultado Build 25: con teclado abierto, modal mide 85% de pantalla completa → bottom cortado.

### Fix Build 26 (5 cambios)

**Archivo:** `src/screens/PortfolioScreen.js`

1. **L86** — state nuevo:
```jsx
const [keyboardVisible, setKeyboardVisible] = useState(false); // Build 26 Bug H
```

2. **L630-640** — useEffect con listeners:
```jsx
useEffect(() => {
  const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
  const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
  return () => { showSub.remove(); hideSub.remove(); };
}, []);
```

3. **L1200-1202** — eliminado `<KeyboardAvoidingView>` + comentario nuevo.

4. **L1204** — `maxHeight` dinámico inline:
```jsx
<View style={[st.modalCard, { maxHeight: keyboardVisible ? '60%' : '85%' }]}>
```

5. **L1312** — eliminado cierre `</KeyboardAvoidingView>`.

**Archivo:** `android/app/build.gradle` — `versionCode 26 / versionName "1.0.26"`.

### Compilación AAB

- **Commit SHA:** `f160ba2`
- **Branch:** `dev`
- **AAB live:** `/Users/fernandomoscon/AurexApp/android/app/build/outputs/bundle/release/app-release.aab`
- **Backup:** `~/AurexApp/backups/aab/aurex-build26-FINAL-20260515_1952.aab`
- **Tamaño:** 77 MB
- **SHA256:** `19ba25154888497c1cbff01ab9d6ff1147f0f978cb8e44ac76d53fb6af94567d`
- **Build time:** 3m 21s — BUILD SUCCESSFUL
- **Timestamp AAB:** 15-may 19:50 AR

### Incidente compilación (lección)
Primer intento gradle salió `exit 0` ENGAÑOSO: gradle nunca arrancó por "Unable to locate a Java Runtime". Backup falso detectado (timestamp viejo = Build 25), borrado, y recompilado con `JAVA_HOME=/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home`. Lección reforzada: **siempre validar timestamp + tamaño + exit real, nunca cantar éxito por "exit 0"**.

### Estado Build 26
- ✅ Código implementado y commiteado.
- ✅ AAB compilado y validado (timestamp + SHA reales).
- ⏸️ **NO subido a Play Console** — pausa Android por rechazo Apple.

---

## 3. GUÍA HTML USUARIOS ANDROID — entregada

Documento para mandar a usuarios que descargaron la Android publicada y no pudieron entrar:

- **Carpeta:** `~/Desktop/CODE/guia_usuarios_android/`
  - `guia_primer_uso.html` — light mode, 2 paneles + flecha
  - `onboarding_planes.png` — captura real slide 4 (planes + 2 botones)
  - `signup.png` — captura real SignupScreen
- **Disclaimer:** "Not a broker. Not advice." al pie.
- **Estado:** entregado a Fernando para revisar y comentar.

---

## 4. INFORME CONSOLIDADO IAP — PENDIENTE BUILD 27 (sin ajustar)

> Análisis trascendental hecho 15-may. Encontró 2 bugs estructurales no detectados en hipótesis previas. **NO implementado todavía** — va a Build 27 después de resolver Apple.

### Bug raíz #1: frontend nunca llama `Purchases.logIn(uid)`
- AUREX nunca identifica al usuario Supabase contra RevenueCat.
- RC trata cada sesión como `$anonymous:xxxxx` distinto.
- Cuando usuario hace upgrade, la compra queda atada al anonymous ID, no al uid Supabase.

### Bug raíz #2: backend webhook descarta IDs anónimos silenciosamente
- Webhook RC recibe `app_user_id = $anonymous:xxx` → busca en `usuarios` → no encuentra → loguea nada y devuelve 200 OK.
- Resultado: pago efectivo en Google Play / App Store, pero `usuarios.plan` queda en FREE.

### Plan Tier 1 (5 fixes Build 27)

| ID | Archivo | Cambio |
|---|---|---|
| **IAP-1** | `App.js` | Al boot, si hay sesión Supabase, llamar `Purchases.logIn(uid)` antes de cualquier render |
| **IAP-2** | `src/screens/LoginScreen.js` | Post-login exitoso (2 paths: email/password + magic link), llamar `Purchases.logIn(uid)` |
| **IAP-3** | `src/screens/SignupScreen.js` | Post-signup exitoso, llamar `Purchases.logIn(uid)` |
| **IAP-4** | `src/screens/PerfilScreen.js` | En logout, llamar `Purchases.logOut()` antes de `supabase.auth.signOut()` |
| **IAP-5** | Backend webhook RC | Si `app_user_id` empieza con `$anonymous:` → `console.error` + alerta Telegram `WEBHOOK_USER_ANONIMO_${id}` para no perder pagos silenciosos |

### Referencias completas
- `~/Desktop/aurex-app/briefs/ANALISIS_PROFUNDO_COMPRA_IAP_15MAY.md` (329 líneas, técnico completo)
- `~/Desktop/aurex-app/briefs/INFORME_COMPRA_IAP_15MAY_PARA_ESCRITORIO.md` (283 líneas, contexto Escritorio)
- `~/Desktop/aurex-app/briefs/TICKET_REVENUECAT_FINAL_15MAY.md` (ticket support enviado 15-may 03:00 AR — esperando respuesta)

---

## 5. PRÓXIMOS PASOS

### Inmediato (PAUSA Android)
- ⏸️ Fernando pasa contexto rechazo Apple por nombre/marca.
- 🎯 Code + Escritorio analizan respuesta Apple y opinan.

### Cuando se reanude Android
1. Subir AAB Build 26 a Play Console Internal Testing.
2. Validar Bug H en Samsung real con virtual keyboard abierto.
3. Si PASA → promover a Producción.
4. Build 27 = implementar Tier 1 IAP (5 fixes).
5. Esperar respuesta RevenueCat support (ticket 15-may 03:00 AR).

### iOS pendiente
- Apple Build 17 sigue en queue desde 24-abr (19+ días).
- **NUEVO:** Apple responde HOY 15-may con rechazo por nombre/marca → tema urgente que pasa al frente.

---

## 6. MEMORIA Y FEEDBACK RELEVANTES APLICADAS HOY

- ✅ Grep código real antes de inventar (feedback_grep_antes_de_inventar.md)
- ✅ Plan archivo-por-archivo antes de tocar (feedback_plan_antes_de_tocar.md)
- ✅ Decisiones técnicas no a Fernando (Escritorio + Code consensuaron opción B modificada)
- ✅ NUNCA marcar verde sin validar fuente real (caso "exit 0" engañoso detectado y corregido)
- ✅ CERO invento (código real leído antes de proponer fix)
- ✅ Backup AAB en `~/AurexApp/backups/aab/` (no dentro de build/)
- ✅ Versionar bumps separados (Android build.gradle independiente de pbxproj iOS)
