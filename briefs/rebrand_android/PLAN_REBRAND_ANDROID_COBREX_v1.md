# 🟠 PLAN INTEGRAL — REBRAND ANDROID "AUREX" → "COBREX" (Build 37 Android / v1.0.37) — **v1**

> **Estado:** v1 (borrador de Code, basado en el código REAL de `~/AurexApp` al 28-may-2026). **Falta:** validación de Escritorio (código vía GitHub) + info de Play Console/RevenueCat que aporta Escritorio → con eso se arma el **v2** → Fernando aprueba → recién ahí se ejecuta.
> **NO ejecutar nada de este plan hasta tener v2 aprobado por Fernando.**
> **Independiente de iOS:** Android es otra tienda; no se cruza con la revisión del Build 36 iOS. Se puede hacer cuando Fernando decida (ver brief §3.5).

---

## 0. OBJETIVO Y PRINCIPIO RECTOR

**Objetivo:** unificar la marca — que la app Android pase de mostrarse "AUREX" a **"Cobrex"**, igual que iOS, dejando las 3 plataformas (iOS + Android + web) coherentes en COBREX. Sin romper instalaciones, suscripciones ni cobros existentes.

**Principio rector (CLAVE, verificado en código):** `AurexApp` es **React Native** → el código JavaScript de `src/` y `App.js` es **COMPARTIDO** entre iOS y Android. El rebrand de iOS (Build 36) ya tocó ese código compartido. **Por eso el rebrand Android NO es rehacer todo:** gran parte ya está. El trabajo real es:
1. Cambiar el **interruptor de marca** (`src/lib/brand.js`) para Android.
2. Los **assets nativos de Android** (nombre bajo el ícono, splash).
3. **Decidir** qué pasa con los elementos que hoy están ocultos solo en iOS.
4. Sumar **fixes pendientes** (los del Build 37 iOS que son código compartido + 2 bugs propios de Android).
5. **Metadata** de Play Console (suscripciones, capturas, URLs).
6. **Compilar + validar + publicar.**

---

## 1. ESTADO DE PARTIDA (verificado en el código real, 28-may)

| Cosa | Estado hoy | Fuente |
|---|---|---|
| Versión Android | `versionCode 36` / `versionName "1.0.36"` (publicada en producción) | `android/app/build.gradle` |
| Nombre bajo el ícono | **`AUREX`** | `android/app/src/main/res/values/strings.xml` → `app_name` |
| Interruptor de marca | `brand.js`: Android = `'AUREX'`, URLs = `aurex.live` | `src/lib/brand.js` |
| Onboarding / Splash RN / Planes / i18n | **YA tienen el diseño Build 36** (código compartido) | `src/` (commits `23e78b6`, `d50f8d6`) |
| Balanza ⚖️ + timer en headers | **Visibles en Android** (en iOS se ocultan vía `IS_IOS`) | `brand.js` `IS_IOS` |
| Splash nativo Android | bg `#EEF1F7` OK; **logo del bootsplash a confirmar/regenerar a Cobrex limpio** | `assets/bootsplash/manifest.json` + `android/.../drawable/bootsplash.xml` |
| Ícono de la app | Solo símbolo dorado, **sin texto** → sirve igual para Cobrex, NO se toca | (confirmado en iOS, mismo ícono) |
| Bug planes post-login | `App.js:240-246` lee `aurex_plan` de AsyncStorage → en instalación fresca (vacío) **se muestra a PRO/ELITE** (no debería) | `App.js` |
| Bug crash ScreenFragment (P0) | **NO fixeado** — `MainActivity.kt` no tiene `onCreate` | `MainActivity.kt` |
| Bug toolbar S24 (labels cortadas) | **NO fixeado** — `fontSize: 9` | `src/navigation/TabNavigator.js:24` |
| `applicationId` | `com.aurexapp` → **PERMANENTE, NO cambia** (no rompe nada) | `build.gradle` |

---

## 2. ROLES FIJOS (del brief §8.b — no cambian)

- **Code:** todo lo técnico de **código** — editar, compilar (clean → bundleRelease → AAB), validar el AAB. Tiene el código (repo privado local `~/AurexApp`).
- **Escritorio:** todo lo de **Play Console / RevenueCat / metadata** — relevar y cargar nombres, descripciones, capturas, suscripciones, URLs. **NO compila, NO accede al repo privado, NO toca el botón de envío.** Aporta la info de las tiendas que Code no ve.
- **Fernando:** sube el AAB final, asigna grupos de testing y **da el clic de "Enviar a revisión".** Aprueba cada checkpoint.

---

## 3. MECANISMO DE CONTROL CRUZADO CON ESCRITORIO (real, no de opinión)

> **Problema:** el código nativo (`AurexApp`) es **repo PRIVADO** → Escritorio NO lo ve en GitHub.
> **Solución:** Code publica los **fragmentos de código reales** en el repo PÚBLICO `aurex-app/briefs/rebrand_android/` (archivo `CONTROL_CODIGO_REAL_REBRAND_ANDROID.md`) — sin secretos. Escritorio valida CONTRA ese código real (no contra suposiciones).

**Bidireccional:**
- **Code → Escritorio:** el código real (qué hay y qué se va a cambiar).
- **Escritorio → Code:** la info que SOLO Escritorio ve en los paneles (metadata Play Console + config RevenueCat + capturas + suscripciones).
- Cada uno controla el dominio del otro. **Fernando aprueba.**

**3 CHECKPOINTS de Escritorio:**
| # | Cuándo | Qué hace Escritorio |
|---|---|---|
| **CP1** | Al recibir este v1 + paquete de código | Lee el plan, **valida el código real** vía GitHub, da su opinión, y **manda a Code la info de Play Console/RevenueCat** (ver §6). Con eso → v2. |
| **CP2** | Antes de compilar (lista final de cambios) | Revisa la lista de cambios de código (regla Android §8.b) antes del build. |
| **CP3** | Antes del envío | Verifica el estado en Play Console; Fernando da el clic final. |

---

## 4. FASES DE EJECUCIÓN (qué · cómo · quién hace · quién controla)

### FASE 0 — Análisis fino + congelar alcance + DECISIONES
| Tarea | Cómo | Hace | Controla |
|---|---|---|---|
| Auditoría diff iOS Build 36 vs código Android actual | Listar TODO lo gated por `Platform.OS`/`IS_IOS`; mapear qué se porta y qué se decide | Code | Escritorio (CP1, vs código público) + Fernando |
| Definir las decisiones de §5 | Fernando responde las 3 preguntas | Fernando | Code + Escritorio asesoran |
| **Congelar alcance** | Cerrar la lista definitiva → v2 del plan | Code | Fernando aprueba |

### FASE 1 — Código COMPARTIDO (Code, local `~/AurexApp` branch `dev`)
| Tarea | Cómo | Hace | Controla |
|---|---|---|---|
| Flip de marca Android | `brand.js`: Android `'AUREX'`→`'Cobrex'` + URLs → `cobrex.io` | Code | Escritorio (CP2) |
| Decisión balanza/timer | Según §5.1: aplicar `IS_IOS` también a Android o dejar como está | Code | Fernando |
| Fix planes post-login (bug PRO/ELITE) | `App.js:240-246`: reemplazar lectura de AsyncStorage `aurex_plan` por **RevenueCat** `getCustomerInfo().entitlements.active` → no abrir paywall a PRO/ELITE. **Sirve iOS Build 37 + Android.** | Code | Code valida en emulador |
| Fixes Build 37 iOS que son compartidos | 1.h.1 traducciones hardcodeadas ES → i18n; 1.h.2 onboarding (constelación/animación, tamaño logo) | Code | Fernando valida visual |
| Verificar onboarding/splash-RN/planes en Android | Que lo del Build 36 se vea OK en Android (ya viene del código compartido) | Code | Code (emulador) |

### FASE 2 — NATIVO Android (Code)
| Tarea | Cómo | Hace | Controla |
|---|---|---|---|
| Nombre bajo el ícono | `strings.xml` `app_name` `AUREX`→`Cobrex` | Code | Escritorio (CP2) |
| Bootsplash Android | Logo Cobrex limpio (de los assets Cobrex en Dropbox) + bg `#EEF1F7` (ya está) | Code | Fernando valida visual |
| Bug crash ScreenFragment (P0) | `MainActivity.kt`: agregar `override fun onCreate(savedInstanceState: Bundle?)` pasando `null` a `super` (3 líneas) | Code | Code |
| Bug toolbar S24 | `TabNavigator.js:24`: `fontSize 9→8` + `tabBarAllowFontScaling:false` | Code | Fernando valida en Samsung |
| `default_notification_channel_id` | Según §5.3: dejar `aurex_default` (interno, no visible) o cambiar | Code | Fernando |
| Bump versión | `build.gradle`: `versionCode 36→37` **y** `versionName "1.0.36"→"1.0.37"` (suben juntos) | Code | Escritorio (CP2) |
| Ícono | **NO se toca** (ya es solo símbolo) | — | — |

### FASE 3 — BUILD + VALIDACIÓN (Code + Fernando)
| Tarea | Cómo | Hace | Controla |
|---|---|---|---|
| Clean OBLIGATORIO | `cd android && ./gradlew clean` (regla dura §8.b — saltearlo causó el bug IAP) | Code | — |
| Compilar | `./gradlew bundleRelease` → AAB firmado | Code | — |
| Backup + validar AAB | Backup en `backups/aab/Build37/` + verificar `app_name=Cobrex`, versión, firma | Code | Code (vs último AAB OK) |
| Subir a track interno | Play Console → Internal Testing | Fernando | Escritorio verifica |
| Validar en dispositivo real | Probar nombre, splash, onboarding, planes (que NO salga a PRO/ELITE), toolbar S24 | Fernando | Code asiste |

### FASE 4 — METADATA Play Console (Escritorio, SIN build)
| Tarea | Cómo | Hace | Controla |
|---|---|---|---|
| Nombre del listing | AUREX → Cobrex (o lo que decida §5.2) | Escritorio | Code revisa por lectura |
| Descripción + textos | Rebrand a Cobrex | Escritorio | Code |
| Capturas | Subir capturas Cobrex (de `Dropbox/.../WEB COBREX/...` o nuevas) | Escritorio | Fernando |
| Suscripciones | Nombres/descripciones de los 4 productos hoy dicen "AUREX" (igual que iOS, ver brief §1.g E-bis) → pasar a Cobrex. **Product IDs NO se tocan.** | Escritorio | Code valida IDs |
| URLs privacy/terms | → `cobrex.io/privacy.html` y `/terms.html` | Escritorio | Code |

### FASE 5 — ENVÍO + PUBLICACIÓN (Fernando)
| Tarea | Cómo | Hace | Controla |
|---|---|---|---|
| Subir a producción + enviar | Play Console | Fernando | Escritorio verifica estado (CP3) |
| Clic final de envío | — | Fernando | — |

---

## 5. 🔴 DECISIONES PENDIENTES DE FERNANDO (definen el v2)

1. **Balanza ⚖️ + timer en los headers de Android:** ¿se ocultan como en iOS (coherencia total) o se dejan visibles como hoy? *(Recomendación Code: ocultarlas para que iOS y Android se vean igual.)*
2. **Nombre del listing en Play Store:** ¿full "Cobrex" o se conserva algo de "AUREX" por ASO/continuidad de búsquedas? *(Recomendación Code: full Cobrex para coherencia.)*
3. **`default_notification_channel_id` (`aurex_default`):** es un ID interno, NO lo ve el usuario. ¿Se deja (más seguro, no rompe canales de notificación existentes) o se renombra? *(Recomendación Code: dejarlo.)*

---

## 6. 📋 INFO QUE CODE NECESITA DE ESCRITORIO (para el v2) — CHECKPOINT 1

Escritorio, al validar este plan, por favor relevá y mandá:
1. **Listing actual de Play Console:** nombre exacto, descripción corta/larga, dónde aparece "AUREX".
2. **Suscripciones (4 productos):** nombres visibles + descripciones actuales (¿dicen "AUREX"?) + confirmar los **product IDs** (no se tocan).
3. **RevenueCat:** confirmar offering/packages Android + entitlements (`pro`, `elite`) + que el `REVENUECAT_ANDROID_KEY` sigue OK (NO pegar la key, solo confirmar que existe/funciona).
4. **Capturas actuales** en la ficha (¿cuáles hay, en qué idiomas, cuáles muestran "AUREX"?).
5. **URLs** configuradas hoy (privacy/terms/soporte) en la ficha Android.

---

## 7. ⚪ LO QUE NO SE TOCA (a propósito)
- `applicationId` / `namespace` = `com.aurexapp` (permanente; no rompe instalaciones/IAP/RC).
- Product IDs de las 4 suscripciones (estructurales).
- Claves RevenueCat / Supabase / env (viven en SECRET, nunca al repo).
- Ícono de la app (ya es solo símbolo dorado, sirve para Cobrex).
- iOS (su rebrand ya está en Build 35/36).

---

## 8. RIESGOS
| Riesgo | Mitigación |
|---|---|
| Google objeta el rename | Bajo (ya aprobó "AUREX"; "Cobrex" es más distintivo). Track interno primero. |
| Saltear el clean → bug de bundle cacheado | Clean OBLIGATORIO (regla §8.b). |
| Romper suscripciones al renombrar | NO se tocan product IDs ni applicationId → cobros intactos. |
| Reset de ASO del término "AUREX" | Decisión §5.2 (Fernando). |

---

**Fin v1.** Próximo paso: Escritorio valida (CP1) + manda info §6 → Code arma el **v2** → Fernando aprueba → ejecutar.
