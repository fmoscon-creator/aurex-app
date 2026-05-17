# 📋 PENDIENTES AJUSTES BUILD 34 ANDROID — v1

> **Build de referencia actual:** Build 33 / v1.0.33 (PUBLICADO Play Store producción)
> **Próximo build a compilar:** Build 34 / v1.0.34 (NO compilar todavía)
> **Criterio:** ir juntando todos los temas que aparezcan, compilar UNA sola vez con todo. NO compilar un build por bug.
> **Fecha v1:** 17-may-2026 ~13:50 AR
> **Autor:** Code (Claude Code en terminal). Revisión cruzada Escritorio pendiente.

---

## 0. CHECKLIST RÁPIDO

| # | Tema | Criticidad | Fix listo | Bloqueante externo |
|---|---|---|---|---|
| 1 | Crash ScreenFragment al restaurar app | 🚨 P0 (crash en producción) | ✅ Sí (1 línea) | — |
| 2 | Labels toolbar inferior truncadas (Samsung S24) | 🟡 P2 (UI, no crash) | ⚠️ Opciones a evaluar | — |
| 3 | Tier 1 IAP (5 archivos RN + backend) | 🚨 P0 (comercial bloqueado) | ⏸ Pausado | Respuesta RC ticket #76809 |

**Decisión global:** mientras al menos UN bloqueante externo siga sin resolver, NO compilar Build 34. Seguir acumulando pendientes en este doc.

---

## 1. CRASH `ScreenFragment` al restaurar app

### 1.1 Detección

- **Fuente:** Google Play Console → Crashes & ANRs.
- **Reportado:** 17-may-2026.
- **Frecuencia:** 6 eventos en últimos 28 días.
- **Usuarios afectados:** 5.
- **Último evento:** ~3 horas antes del cierre nocturno (16-may PM ~).
- **Versiones afectadas:** v1.0.1, v1.0.7, v1.0.33 (todas las versiones publicadas con react-native-screens en su stack).
- **Dispositivos:** Samsung, Redmi, Motorola.
- **Android:** 14, 15, 16 Beta.

### 1.2 Causa raíz

`MainActivity.kt` NO tiene override del método `onCreate(Bundle?)`. Eso significa que Android usa el `onCreate` por defecto de `ReactActivity`, que llama `super.onCreate(savedInstanceState)`.

Cuando Android mata la app en background por presión de memoria y después la restaura, intenta reconstruir los `Fragment`s del stack de navegación a partir del `savedInstanceState`. La librería `react-native-screens` (usada por `@react-navigation/native-stack`) **NO soporta restauración de Fragments** y explota con:

```
java.lang.IllegalStateException: Screen fragments should never be restored.
Follow instructions from https://github.com/software-mansion/react-native-screens/issues/17
```

Es un issue archi-conocido y documentado en el propio mensaje de error. Solución oficial publicada por el equipo de software-mansion.

### 1.3 Solución (fix oficial react-native-screens)

Pasar `null` a `super.onCreate` para que Android NO restaure el state de los Fragments. Es un override de 3 líneas + 1 import.

**Archivo afectado:** `~/AurexApp/android/app/src/main/java/com/aurexapp/MainActivity.kt`

**Estado actual (líneas 1-22):**

```kotlin
package com.aurexapp

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  override fun getMainComponentName(): String = "AurexApp"

  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
```

**Diff propuesto (+ 1 import + 7 líneas, sin modificar nada existente):**

```kotlin
 package com.aurexapp

+import android.os.Bundle
 import com.facebook.react.ReactActivity
 import com.facebook.react.ReactActivityDelegate
 import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
 import com.facebook.react.defaults.DefaultReactActivityDelegate

 class MainActivity : ReactActivity() {

   override fun getMainComponentName(): String = "AurexApp"

+  /**
+   * Fix react-native-screens crash on restore:
+   * pass null to super.onCreate to prevent fragment state restoration.
+   * https://github.com/software-mansion/react-native-screens/issues/17
+   */
+  override fun onCreate(savedInstanceState: Bundle?) {
+    super.onCreate(null)
+  }

   override fun createReactActivityDelegate(): ReactActivityDelegate =
       DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
 }
```

### 1.4 Impacto y efectos colaterales

- ✅ **Elimina el crash** `IllegalStateException: Screen fragments should never be restored`.
- ✅ **NO afecta** el funcionamiento normal de la app (la mayoría de apps RN modernas ya hacen esto).
- ⚠️ **Trade-off:** Android no va a restaurar el estado de navegación si mata la app por OOM. Cuando el usuario vuelva, la app inicia desde el root del navigator (tab Portfolio). Para AUREX esto es **aceptable** porque los datos de portfolio, alertas, etc. se cargan desde Supabase + AsyncStorage, no del state guardado.
- ✅ Aplicable a TODOS los dispositivos (no es fix específico Samsung/Redmi/Motorola).

### 1.5 Referencia externa

- Issue oficial: `https://github.com/software-mansion/react-native-screens/issues/17`
- README react-native-screens: sección "Android" → "Cleanup of unused fragments".

---

## 2. LABELS TOOLBAR INFERIOR TRUNCADAS — Samsung S24

### 2.1 Detección

- **Fuente:** reporte de usuario REAL (amigo de Fernando con Samsung Galaxy S24).
- **Captura referencia:** `~/Downloads/S6.jpg` (16-may 22:29).
- **Visible en:** pantalla Portfolio (estado vacío "Tu portfolio está vacío"), pero el problema aplica a CUALQUIER pantalla porque el `tabBar` es persistente.
- **Síntoma:** las labels de las pestañas del bottom tab bar aparecen cortadas con "...":
  - `Portfolio` → OK
  - `Mercad...` (cortado, debería decir "Mercados")
  - `Watchli...` (cortado, debería decir "Watchlist")
  - `IA` → OK
  - `Alertas` → OK (parece OK en la captura, pero podría cortar también en otros idiomas)
  - `Perfil` → OK

### 2.2 Causa raíz

Bottom tab navigator de `@react-navigation/bottom-tabs` con **6 tabs** distribuidas en el ancho de la pantalla. Cada tab toma `ancho_pantalla / 6`. En el Samsung S24 (412 dp aprox de ancho lógico):

- Ancho total ≈ 412 dp.
- Por tab ≈ 68 dp = ~272 px @3x densidad.
- Con `fontSize: 9` y padding interno, **las labels >7 chars** no entran completas.

Labels actuales en español (las más afectadas):

| Label key | ES | EN | FR | IT |
|---|---|---|---|---|
| `portfolio` | Portfolio (9) | Portfolio (9) | Portfolio (9) | Portfolio (9) |
| `mercados` | **Mercados (8)** | Markets (7) | Marchés (7) | **Mercati (7)** |
| `watchlist` | **Watchlist (9)** | **Watchlist (9)** | **Watchlist (9)** | **Watchlist (9)** |
| `ia` | IA (2) | AI (2) | IA (2) | IA (2) |
| `alertas` | Alertas (7) | Alerts (6) | Alertes (7) | Avvisi (6) |
| `perfil` | Perfil (6) | Profile (7) | Profil (6) | Profilo (7) |

### 2.3 Archivo afectado

`~/AurexApp/src/navigation/TabNavigator.js` (35 líneas, único archivo del bottom tab).

**Estado actual líneas 17-25:**

```jsx
<Tab.Navigator
  initialRouteName="Portfolio"
  screenOptions={{
    headerShown: false,
    tabBarStyle: { backgroundColor: '#161B22', borderTopColor: '#21262D', borderTopWidth: 0.5, paddingTop: 4 },
    tabBarActiveTintColor: '#D4A017',
    tabBarInactiveTintColor: '#8B949E',
    tabBarLabelStyle: { fontSize: 9, marginTop: 1 },
  }}
>
```

### 2.4 Opciones de fix (Code lista, Fernando decide cuál aplicar)

| Opción | Descripción | Pros | Contras | Riesgo |
|---|---|---|---|---|
| **A** | Bajar `fontSize: 9 → 8` + agregar `allowFontScaling: false` + `numberOfLines: 1` | Cambio mínimo (1 archivo, 1 línea), preserva legibilidad razonable, evita override del sistema | Puede seguir cortando en pantallas más chicas + en idiomas con palabras más largas | 🟢 Bajo |
| **B** | Abreviar labels en i18n (ej "Watchlist" → "Lista" / "Watch", "Portfolio" → "Cartera" / "Folio") en todos los idiomas | Asegura que SIEMPRE entran | Cambia copy en todos los idiomas, requiere validación copywriting + UX | 🟡 Medio |
| **C** | Mostrar solo iconos sin labels (`tabBarShowLabel: false`) | Diseño minimalista, problema desaparece | Pérdida de affordance — usuarios no power-users no entienden qué es cada tab solo con emoji | 🔴 Alto (UX) |
| **D** | Custom `tabBar` component con auto-fit avanzado | Control total, solución definitiva | Mucho más código, mayor superficie de bugs | 🔴 Alto (complejidad) |
| **E** | Híbrido — mostrar label si caben todas, si no ocultar (Dimensions API) | Mejor de ambos mundos | Lógica condicional complicada de testear en cada dispositivo | 🔴 Alto |

### 2.5 Recomendación técnica Code (NO definitiva — espera revisión Escritorio + Fernando)

**Opción A** como primer intento (bajo riesgo, 1 línea, reversible). Si después de Build 34 el problema persiste en Samsung S24 → escalar a Opción B (abreviar labels). Opciones C/D/E quedan como Plan B/C lejano.

**Diff Opción A (propuesto):**

```jsx
-        tabBarLabelStyle: { fontSize: 9, marginTop: 1 },
+        tabBarLabelStyle: { fontSize: 8, marginTop: 1 },
+        tabBarAllowFontScaling: false,
```

(2 cambios: bajar `fontSize` de 9 a 8 + nueva línea `tabBarAllowFontScaling: false` para que la accesibilidad del sistema NO agrande el font y vuelva a romper.)

### 2.6 Pregunta abierta para discutir con Escritorio

¿Hay una razón histórica por la cual el `fontSize` está en 9 y no más chico desde Build 1? Si nunca se discutió, opción A es la sensata. Si hubo un test de usabilidad que decidió 9 como mínimo legible, opción B (abreviar) es más segura.

---

## 3. TIER 1 IAP — placeholder (PAUSADO esperando RC)

### 3.1 Estado

- **Bug raíz:** popup "The product is not available for purchase" en los 4 productos PRO/ELITE mensual/anual Android.
- **5/5 causas conocidas RC DESCARTADAS** con evidencia (briefs `CONSOLIDADO_IAP_v2_16MAY.md`).
- **Ticket RevenueCat #76809** enviado 16-may PM con texto técnico + 6 screenshots. ESPERANDO respuesta.
- **Plan B preparado** (briefs `PLAN_B_IAP_SI_RC_NO_RESPONDE.md`) si RC no resuelve.

### 3.2 Tier 1 IAP cuando RC responda — 6 cambios documentados en plan archivo-por-archivo

| ID | Archivo | Cambio |
|---|---|---|
| IAP-1 | `~/AurexApp/App.js` | useEffect boot → `Purchases.logIn(uid)` |
| IAP-2 | `~/AurexApp/src/screens/LoginScreen.js` | Post-signIn → `Purchases.logIn(uid)` |
| IAP-3 | `~/AurexApp/src/screens/SignupScreen.js` | Post-signUp → `Purchases.logIn(uid)` |
| IAP-4 | `~/AurexApp/src/screens/PerfilScreen.js` (logout) | `Purchases.logOut()` antes de `supabase.auth.signOut()` |
| IAP-5 | Backend `~/Desktop/aurex-backend/server.js` L1631-1643 | Si `app_user_id` empieza con `$anonymous:` → alerta Telegram |
| IAP-6 | `~/AurexApp/src/screens/PerfilScreen.js` (deleteAccount) | `Purchases.logOut()` antes de borrar cuenta |

**Plan completo:** `~/Desktop/aurex-app/briefs/PLAN_IAP_TIER1_BUILD34_v2_16MAY.md`

**Orden obligatorio (review Escritorio):** IAP-5 backend PRIMERO → validar webhook con evento de test desde RC dashboard → si OK frontend RN.

### 3.3 Bloqueante

NO arrancar implementación Tier 1 hasta tener una de estas 3 cosas:

- ✅ RC responde con solución concreta → aplicar fix + Tier 1 + compilar Build 34.
- ✅ RC responde "no podemos resolver" → arrancar Plan B-1 (webhook directo Google Play).
- ⏰ Pasan >72h hábiles sin respuesta RC → arrancar Plan B-1.

---

## 4. CÓMO SE ACTUALIZA ESTE DOC

Cada vez que aparezca un tema nuevo que deba ir en Build 34:

1. Agregar item nuevo (§4 o siguiente).
2. Incrementar versión del archivo (v1 → v2 → v3...).
3. Mantener nombre `PENDIENTES_AJUSTES_BUILD34_ANDROID_vN_17MAY.md` o cambiar fecha si es otro día.
4. Cumplir regla 5 lugares siempre.
5. Avisar a Escritorio.

---

## 5. BUMP DE VERSIONES (cuando se compile)

Al final, cuando se vaya a compilar Build 34:

- `~/AurexApp/android/app/build.gradle`: `versionCode 33 → 34` y `versionName "1.0.33" → "1.0.34"`.
- Backup AAB obligatorio en `~/AurexApp/backups/aab/` post-compilación (regla `feedback_compilacion_y_backup_aab.md`).

---

## 6. CHECKLIST 5 LUGARES

Este doc cumple (verificable al cierre):

- [ ] Local Code: `~/Desktop/aurex-app/briefs/PENDIENTES_AJUSTES_BUILD34_ANDROID_v1_17MAY.md`
- [ ] Dropbox MAPA: `~/Dropbox/AUREX/MAPA DE TRABAJO/PENDIENTES_AJUSTES_BUILD34_ANDROID_v1_17MAY.md`
- [ ] Dropbox `.docx`: `~/Dropbox/AUREX/MAPA DE TRABAJO/PENDIENTES_AJUSTES_BUILD34_ANDROID_v1_17MAY.docx`
- [ ] Commit + push GitHub: pendiente al cierre del archivo
- [ ] Raw URL HTTP 200 verificada post-push

---

## 7. ARCHIVOS DE REFERENCIA

| Tema | Archivo |
|---|---|
| Plan IAP Tier 1 v2 | `~/Desktop/aurex-app/briefs/PLAN_IAP_TIER1_BUILD34_v2_16MAY.md` |
| Plan B IAP | `~/Desktop/aurex-app/briefs/PLAN_B_IAP_SI_RC_NO_RESPONDE.md` |
| Consolidado IAP v2 (ticket RC) | `~/Desktop/aurex-app/briefs/CONSOLIDADO_IAP_v2_16MAY.md` |
| Doc cierre sesión 17-may | `~/Desktop/aurex-app/briefs/CIERRE_SESION_17MAY_STATUS_PENDIENTES.md` |
| Captura toolbar S24 | `~/Downloads/S6.jpg` |
| MainActivity.kt | `~/AurexApp/android/app/src/main/java/com/aurexapp/MainActivity.kt` |
| TabNavigator.js | `~/AurexApp/src/navigation/TabNavigator.js` |

---

**Fin v1. Próximos items se agregan en v2 cuando aparezcan. Bump cuando se compile Build 34.**
