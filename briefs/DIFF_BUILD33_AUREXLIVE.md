# 🔧 DIFF PROPUESTO — Build 33 iOS "AurexLive" (PARA REVISIÓN, nada aplicado aún)

> **22-may-2026.** Propuesta de cambios para que Fernando + Escritorio revisen ANTES de aplicar/compilar.
> Raw URL: `https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/DIFF_BUILD33_AUREXLIVE.md`
> **Estado: NADA aplicado.** Espera OK de Fernando + revisión del texto de la reply por Escritorio.

## QUIÉN EJECUTA QUÉ
- **Code (yo):** solo cambios de **código/archivos** del repo (Partes A–E). NO tengo acceso a App Store Connect.
- **Fernando / Escritorio:** todos los pasos en **App Store Connect** (Parte F): metadata, adjuntar suscripciones, pegar la reply, reenviar a revisión. Y compilar/subir Build 33 desde Xcode.

---

## PARTE 1 — TEXTO DE LA REPLY A APPLE (para revisión independiente de Escritorio)

> Inglés. NO afirma trademark. NO pide documentación. Cita las apps que coexisten con su categoría + Apple ID.

```
Dear App Review Team,

Thank you for your continued review of submission ID e0e7fb35-11a4-4c1d-854c-60a80c4799e6.

To fully address the Guideline 4.1(c) feedback, we have renamed the app to "AurexLive" — a single, distinctive compound name derived from our own product domain, aurex.live. We have already updated the app name to "AurexLive" across all App Store Connect metadata.

We respectfully note that the root "Aurex" is not exclusive to www.aurex.ai. The App Store currently lists several independent developers using this root, including:
- "AurexNova" by Delfina Pazia — Finance category (Apple ID 6771328873)
- "AurexPro" by AUREXPRO LLC — Business category

This demonstrates that names built on the "Aurex" root coexist on the App Store across multiple independent developers, including within our own Finance category. Our name "AurexLive" is a single compound word and is, in fact, more distinctive than "Aurex" used on its own.

Furthermore, our app and www.aurex.ai serve entirely different markets. www.aurex.ai (Beinex Consulting Private Limited) is an enterprise GRC, audit and analytics platform listed under Business. AurexLive is a consumer market-tracking and financial information app. There is no overlap in audience, purpose or visual branding, and therefore no likelihood of user confusion.

"AurexLive" derives exclusively from our owned domain aurex.live (registered via Namecheap on April 3, 2026, under the name Fernando Gabriel Moscón) and is used consistently across our Web PWA (aurex.live), Android (Google Play) and iOS platforms. We have no affiliation, agreement or connection with www.aurex.ai. The app icon is our own original design (a stylized "A") and contains no third-party brand, logo or text.

The Namecheap domain-ownership confirmation remains attached in App Review Information.

Best regards,
Fernando Gabriel Moscón
Apple Developer Team ID: TX7C2F79U9
```

---

## PARTE 2 — DIFF DE CÓDIGO (Code, sin aplicar)

### A. `ios/AurexApp/Info.plist` (iOS-only, no toca Android)
```diff
   <key>CFBundleDisplayName</key>
-  <string>AUREX</string>
+  <string>AurexLive</string>
```

### B. NUEVO archivo `src/lib/brand.js` — marca según plataforma (centraliza la lógica)
```js
import { Platform } from 'react-native';
// iOS muestra "AurexLive" (requerimiento Apple 4.1c); Android sigue "AUREX" (publicado/aprobado).
export const BRAND_NAME = Platform.OS === 'ios' ? 'AurexLive' : 'AUREX';
export const PRIVACY_URL = Platform.OS === 'ios'
  ? 'https://aurex.live/docs/privacy-ios.html'
  : 'https://aurex.live/docs/privacy.html';
export const TERMS_URL = Platform.OS === 'ios'
  ? 'https://aurex.live/docs/terms-ios.html'
  : 'https://aurex.live/docs/terms.html';
```

### C. Headers — reemplazar el texto "AUREX" por `{BRAND_NAME}` en las 8 pantallas
> En cada archivo: agregar `import { BRAND_NAME } from '../lib/brand';` y cambiar el `<Text ...>AUREX</Text>` por `<Text ...>{BRAND_NAME}</Text>`. **Ninguna tenía `Platform` importado** → se resuelve con el import de `brand.js` (no hace falta tocar el import de `react-native`).

| Archivo | Línea | Cambio |
|---|---|---|
| `LoginScreen.js` | 85 | `>AUREX<` → `>{BRAND_NAME}<` |
| `SignupScreen.js` | 125 | idem |
| `PortfolioScreen.js` | 689 | idem |
| `MercadosScreen.js` | 869 | idem |
| `WatchlistScreen.js` | 753 | idem |
| `IAScreen.js` | 308 | idem |
| `MisAlertasScreen.js` | 145 | idem |
| `PerfilScreen.js` | 931 | idem |

> Nota: `PerfilScreen.js:872` muestra "AUREX v{APP_VERSION} ⭐" → cambiar también a `{BRAND_NAME} v{APP_VERSION} ⭐`. Los nombres de features con ™ ("AUREX PULSE™", "AUREX FEAR & GREED 14X™") **NO se tocan** (son nombres de producto/feature, no el nombre de la app; bajo principio escalonado).

### D. `PerfilScreen.js` — links de Términos/Privacidad (líneas 875-876)
```diff
-  ...Linking.openURL('https://aurex.live/docs/terms.html')...{t('terminos')}
-  ...Linking.openURL('https://aurex.live/docs/privacy.html')...{t('privacidad')}
+  ...Linking.openURL(TERMS_URL)...{t('terminos')}
+  ...Linking.openURL(PRIVACY_URL)...{t('privacidad')}
```
(+ `import { ..., TERMS_URL, PRIVACY_URL } from '../lib/brand';`)

### E. NUEVOS archivos web `docs/privacy-ios.html` y `docs/terms-ios.html`
- Copia EXACTA de `docs/privacy.html` (19× "AUREX") y `docs/terms.html` (11× "AUREX"), cambiando **solo el nombre de marca** "AUREX" → **"AurexLive"** (título `<title>`, `<span class="logo">`, y prosa "la aplicación AUREX"). Mismos estilos, mismo dominio, misma URL base.
- Los originales `privacy.html` / `terms.html` quedan **intactos** (los usa Android).

---

## PARTE 3 — PASOS EN APP STORE CONNECT (los hacen Fernando / Escritorio)
1. Subir Build 33 (compilado en Xcode con A+B+C+D aplicados).
2. Metadata → "AurexLive" (App Name #1, IAP grupo #8, y superficies con el nombre — ver `PLAN_APPLE_AUREXLIVE_REPLY_22MAY.md` Parte B).
3. Campo **Privacy Policy URL** → `https://aurex.live/docs/privacy-ios.html`.
4. **Adjuntar las 4 suscripciones** (grupo AUREX PLANES, ID 22018005) a la versión Build 33.
5. Pegar la **reply** (Parte 1) en "Responder al equipo de revisión" + confirmar PDF Namecheap.
6. Reenviar a revisión. Manual Release OFF.

## NO se toca (ver plan): capturas de la ficha, onboarding (imágenes), Android. Se dejan para si Apple los objeta.

---
**Resumen de impacto:** 1 archivo nuevo (`brand.js`) + 2 HTML nuevos + `Info.plist` (1 línea) + 9 ediciones puntuales en 8 pantallas (import + texto). **No toca:** IAP, RevenueCat, lógica de negocio, Android, backend. Reversible. **Nada aplicado hasta tu OK.**
