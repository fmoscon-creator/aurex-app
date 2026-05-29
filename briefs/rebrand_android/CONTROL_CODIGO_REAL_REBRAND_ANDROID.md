# 🔎 CONTROL — CÓDIGO REAL para validar el Rebrand Android (para ESCRITORIO)

> **Para qué:** el repo nativo `AurexApp` es PRIVADO (Escritorio no lo ve en GitHub). Acá Code pega los **fragmentos REALES** (al 28-may-2026, branch `dev`) para que Escritorio valide el plan **contra el código de verdad**, no contra suposiciones. **Sin secretos** (las API keys viven en SECRET/env, no en estos archivos).
> Acompaña a `PLAN_REBRAND_ANDROID_COBREX_v1.md`.

---

## 1. `src/lib/brand.js` — el INTERRUPTOR de marca (lo central)
```js
import { Platform } from 'react-native';

// iOS muestra "Cobrex" (rebrand Apple 4.1c). Android sigue "AUREX" (publicado v1.0.36).
export const BRAND_NAME = Platform.OS === 'ios' ? 'Cobrex' : 'AUREX';

// iOS: se ocultan balanza y timer del header de las tabs. Android queda igual.
export const IS_IOS = Platform.OS === 'ios';

// iOS Build 36: migrado a cobrex.io. Android sigue aurex.live.
export const PRIVACY_URL = Platform.OS === 'ios'
  ? 'https://cobrex.io/privacy.html'
  : 'https://aurex.live/docs/privacy.html';
export const TERMS_URL = Platform.OS === 'ios'
  ? 'https://cobrex.io/terms.html'
  : 'https://aurex.live/docs/terms.html';
```
**Rebrand Android = cambiar la rama Android de `BRAND_NAME` a `'Cobrex'` + URLs a `cobrex.io`.** Decisión: ¿`IS_IOS` se aplica también a Android (ocultar balanza/timer)?

---

## 2. `android/app/src/main/res/values/strings.xml` — nombre bajo el ícono
```xml
<resources>
    <string name="app_name">AUREX</string>
    <string name="default_notification_channel_id" translatable="false">aurex_default</string>
</resources>
```
**`app_name` AUREX → Cobrex.** `default_notification_channel_id`: ID interno (no visible) — decisión si se deja.

---

## 3. `App.js` — planes post-login (el BUG que sale a PRO/ELITE)
```js
// ~línea 217: Build 36 — ofrecer planes al entrar (se filtra FREE en onReady)
pendingPlansRef.current = true;

// ~líneas 240-246: al estar listo el navigator
if (!pendingPlansRef.current) return;
pendingPlansRef.current = false;
AsyncStorage.getItem('aurex_plan')
  .then(p => {
    if (p !== 'PRO' && p !== 'ELITE') navRef.current?.navigate('Subscription', { fromLogin: true });
  })
  .catch(() => { navRef.current?.navigate('Subscription', { fromLogin: true }); });
```
**Bug:** en instalación fresca `aurex_plan` está vacío (null) → `null !== 'PRO'` → abre el paywall **aunque sea PRO/ELITE**. **Fix (compartido iOS+Android):** leer RevenueCat `getCustomerInfo().entitlements.active` en vez de AsyncStorage.

---

## 4. `android/app/src/main/java/com/aurexapp/MainActivity.kt` — crash ScreenFragment (P0)
```kotlin
class MainActivity : ReactActivity() {
  override fun getMainComponentName(): String = "AurexApp"
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
```
**Falta `onCreate`** → al restaurar la app desde background crashea (`Screen fragments should never be restored`). **Fix (3 líneas):** agregar `override fun onCreate(savedInstanceState: Bundle?) { super.onCreate(null) }` + import de `android.os.Bundle`.

---

## 5. `src/navigation/TabNavigator.js` — toolbar (labels cortadas en Samsung S24)
```js
initialRouteName="Mercados"
...
tabBarLabelStyle: { fontSize: 9, marginTop: 1 },
// 6 tabs: Portfolio 💼 / Mercados 📈 / Watchlist 👀 / IA 🤖 / Alertas 🔔 / Perfil 👤
```
**Fix:** `fontSize 9→8` + `tabBarAllowFontScaling: false`.

---

## 6. `assets/bootsplash/manifest.json` — splash nativo
```json
{ "background": "#EEF1F7", "logo": { "width": 250, "height": 250 } }
```
Fondo ya correcto (`#EEF1F7`). **Falta confirmar/regenerar el logo del bootsplash a Cobrex limpio** (como se hizo en iOS Build 36).

---

## 7. Versiones actuales
- iOS: `MARKETING_VERSION=1.1` / `CURRENT_PROJECT_VERSION=36` (en revisión Apple).
- Android: `versionCode 36` / `versionName "1.0.36"` (producción) → subir a **37 / "1.0.37"**.
- `applicationId = com.aurexapp` (NO cambia).

---

## 8. Referencia — cambios del Build 36 iOS (ya públicos en el brief §1.g.CIERRE)
Commits: `23e78b6` (onboarding 3D+constelación, splash sin INVEST AI+tagline, planes auto post-login solo-FREE, brand.js→cobrex.io, i18n) + `d50f8d6` (bootsplash logo limpio, manifest #EEF1F7, version 1.1/36). Casi todo es **código compartido** → ya está en Android.

---

**Escritorio:** validá estos fragmentos + mandá la info de Play Console/RevenueCat que pide la §6 del plan. Gracias 🙏
