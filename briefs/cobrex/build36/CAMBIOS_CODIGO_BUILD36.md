# Build 36 iOS — Cambios de código (resumen Fernando + doble control Escritorio)

> **27-may-2026 · hecho por Code.** Para que Fernando entienda qué se hizo (sin leer código) y **Escritorio haga un doble control independiente**.
> ⚠️ Pendientes de código (NO incluidos todavía): **bootsplash limpio** + **bump de versión** (1.1 / 36).

## Cómo revisar (Escritorio)
- **Código completo (privado):** `github.com/fmoscon-creator/AurexApp`, rama **`dev`** — Fernando logueado en GitHub en el navegador. Los cambios de abajo están en esa rama.
- **El repo es PRIVADO** porque tiene claves (RevenueCat en `App.js`, etc.) → no puede ir a un repo público.
- Usá este resumen + el código para opinar archivo por archivo.

## Archivos cambiados

### 1. `src/lib/brand.js` — URLs a cobrex.io (iOS)
- **Qué:** Privacidad y Términos en iOS pasan de `aurex.live/docs/...` → `https://cobrex.io/privacy.html` y `/terms.html`. Android sigue en aurex.live.
- **Doble control:** que las 2 URLs sean las de cobrex.io que abren con candado.

### 2. Assets — íconos 3D + constelación (PNG validados, EXACTOS)
- **Qué:** se copiaron a `assets/onboarding/` los PNG validados (onb1-4 + constellation.png), **sin modificar** (mismo md5 que Dropbox).

### 3. `src/components/SplashView.js` — pantalla de carga
- **Qué:** (a) se **SACÓ "INVEST AI"** (prohibido); (b) tagline **"YOUR GLOBAL ASSETS PLATFORM"**; (c) constelación (animada) más visible; (d) logo + rueda que gira quedan igual.
- **Doble control:** que no quede "INVEST AI"; que las estrellas no tapen logo/marca/tagline (Code verificó: 0 estrellas en la zona central).

### 4. `src/screens/OnboardingScreen.js` — onboarding (4 pantallas)
- **Qué:** (a) íconos planos (SVG) → **íconos 3D (imágenes), sin anillo**; (b) **constelación de fondo**; (c) **logo más grande y más abajo**; (d) **título más grande**; (e) botón principal dorado; (f) última pantalla: botón "Ya tengo cuenta" corregido a **blanco + borde dorado + texto dorado** (antes estaba oscuro, mal en modo claro).
- **Doble control:** íconos 3D sin anillo; logo/textos legibles; botón secundario claro.

### 5. `App.js` + `src/screens/SubscriptionScreen.js` — pantalla de PLANES tras login
- **Qué:** tras login/signup se **auto-abre la pantalla de planes, SOLO a usuarios FREE** (a PRO/ELITE NO). Muestra **(A)** botón gris **"Continuar con el plan FREE →"** en la card FREE + **(C)** link **"Saltar ✕"** arriba-derecha. Ambos → entran a **Mercados**.
- **Cómo (técnico):** `App.js` marca `pendingPlansRef` en login/signup fresco (evento `SIGNED_IN` / `finishLogin`); en `NavigationContainer onReady`, si el plan guardado (`aurex_plan`) no es PRO/ELITE → `navigate('Subscription', { fromLogin:true })`. `SubscriptionScreen` usa `route.params.fromLogin` para mostrar A+C (en vez del "← Volver"); ambos hacen `goBack` → Main (Mercados, `initialRouteName="Mercados"`). Por "upgrade" desde la app NO viene `fromLogin` → sigue el "← Volver".
- **Por qué:** upsell tras login (acordado) **con salida gratis clara** (no atrapar al usuario = requisito Apple 3.1.2).
- **Doble control:** que NO aparezca a PRO/ELITE; que "Continuar FREE"/"Saltar" entren a Mercados; que el flujo de "upgrade" interno no cambie.

### 6. `src/lib/i18n.js` — 2 textos nuevos (8 idiomas)
- **Qué:** `saltar` y `continuar_free` agregados en los 8 idiomas.
- **Doble control:** que estén completos y bien traducidos en los 8.

## NO se tocó (a propósito)
- Bundle ID, product IDs IAP, claves RevenueCat (estructurales). Ícono de la app.

## Verificación de Code
- **Sintaxis:** los archivos pasan el parser de babel del proyecto (sin errores).
- **Visual:** NO se pudo (sin simulador) → se valida en **TestFlight**.

## Pendientes de código (próximos)
- **Bootsplash:** regenerar logo limpio (sin cuadrado crema) + fondo `#EEF1F7`.
- **Versión:** `MARKETING_VERSION` 1.0 → **1.1** + `CFBundleVersion` → **36**.

## Tareas de Escritorio en ASC (no son código)
- Nombre **"Cobrex" en las 8 localizaciones** (hoy 7 dicen "AUREX AI").
- Descripciones de los 4 IAP → **Cobrex** (hoy dicen "AUREX").
- URLs soporte/marketing/privacy/terms → cobrex.io.
