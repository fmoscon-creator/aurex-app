# 🟠 PLAN INTEGRAL — REBRAND ANDROID "AUREX" → "COBREX" (Build 37 Android / v1.0.37) — **v2 EJECUTABLE**

> **v2 = v1 + 3 decisiones de Fernando LOCKED + info real de Play Console (Escritorio CP1) + tabla de comparación iOS vs Android.**
> **Independiente de iOS** (otra tienda; no se cruza con la revisión del Build 36 iOS). Se ejecuta cuando Fernando dé el OK final del v2.
> Base de código: `~/AurexApp` branch `dev`, 29-may-2026.

---

## 0. DECISIONES DE FERNANDO — LOCKED ✅
1. **Balanza ⚖️ + timer:** se **SACAN** de los headers de las 6 tabs en Android (igual que iOS) → más espacio + queda en **Perfil** ("Aviso Legal / Legal Notice", ya existe).
2. **Nombre en Play Store:** **full "Cobrex"** (sin conservar "AUREX"; ASO de "AUREX" será cero post-rebrand y mantenerlo confunde).
3. **`default_notification_channel_id` = `aurex_default`:** se **DEJA** (ID interno Android, invisible al usuario, no rompe canales existentes; iOS no tiene equivalente). Code + Escritorio coinciden.

**Dato confirmado para los 265 usuarios actuales de AUREX:** al actualizar a v1.0.37 ven el nombre cambiar a "Cobrex" automáticamente, **sin perder login/datos/suscripciones** (mismo `applicationId com.aurexapp`, mismos product IDs). El ícono no cambia (ya es solo símbolo). Transición transparente.

---

## 1. 📊 TABLA DE COMPARACIÓN iOS (v1.1/36) vs ANDROID (v1.0.36) — qué difiere y qué hacer

> Sacada del código real (todos los `Platform.OS` / `IS_IOS` / `BRAND_NAME`). **3 categorías:** 🔴 converger (rebrand), 🟢 dejar (diferencia legítima de plataforma, está BIEN que difieran), 🟠 bug Android a fixear.

### 🔴 A CONVERGER (esto ES el rebrand)
| # | Punto | iOS (36) HOY | Android HOY | Acción Android | Archivo |
|---|---|---|---|---|---|
| A1 | Marca mostrada | `Cobrex` | `AUREX` | → `Cobrex` | `brand.js:5` (`BRAND_NAME`) |
| A2 | Headers: nombre de marca | "Cobrex" en 8 pantallas | "AUREX" en 8 pantallas | sale solo al cambiar A1 | Login/Signup/Portfolio/Mercados/Watchlist/IA/MisAlertas/Perfil |
| A3 | Balanza ⚖️ + timer en headers | **ocultos** (`!IS_IOS`) | **visibles** | **ocultar también** (decisión 0.1) → quitar los 5 bloques `{!IS_IOS && (…)}` + timer | Portfolio:695, Watchlist:758, Mercados:874, Alertas:428, IA:312, `LiveIndicator.js:39` |
| A4 | URLs privacy/terms | `cobrex.io` | `aurex.live` | → `cobrex.io` | `brand.js:12-16` |
| A5 | Nombre bajo el ícono | `Cobrex` (CFBundleDisplayName) | `AUREX` (`app_name`) | → `Cobrex` | `strings.xml` |
| A6 | Splash nativo (logo) | logo Cobrex limpio (Build 36) | logo viejo | regenerar logo Cobrex limpio (bg `#EEF1F7` ya OK) | `assets/bootsplash/` + `drawable/bootsplash.xml` |
| A7 | Nombres visibles suscripciones | (iOS rebrandeado) | "AUREX PRO/ELITE …" | → "Cobrex PRO/ELITE …" (Play Console; product IDs NO) | Play Console |
| A8 | Listing tienda | (Cobrex) | nombre "AUREX" + desc completa con "AUREX" | → Cobrex (Play Console) | Play Console |

### 🟢 DEJAR COMO ESTÁ (diferencias de plataforma correctas — NO tocar)
| Punto | Por qué difiere (bien) | Archivo |
|---|---|---|
| `KeyboardAvoidingView behavior` ios=`padding`/android=`height` | comportamiento nativo correcto de cada SO | Login:82, Signup:123, AlertCreateModal:203 |
| `Toast`/padding tops distintos | safe areas distintas iOS/Android | Toast:80, Portfolio:1281 |
| Permiso notificaciones Android API 33 | requisito solo de Android 13+ | `pushNotifications.js:26` |
| Clave RevenueCat por plataforma | `REVENUECAT_IOS_KEY` / `_ANDROID_KEY` | `App.js:51-53` |
| Detección idioma device | API distinta por SO | `i18n.js:11` |
| Versión mostrada | iOS 1.1/36 vs Android 1.0.37 | `version.js:22` |

### 🟠 BUGS ANDROID a fixear en este build (independientes del rebrand, van juntos)
| Bug | Estado | Fix | Archivo |
|---|---|---|---|
| Crash ScreenFragment (P0) al volver de background | NO fixeado | agregar `override fun onCreate(b: Bundle?) { super.onCreate(null) }` + import Bundle | `MainActivity.kt` |
| Toolbar S24 labels cortadas | NO fixeado | `fontSize 9→8` + `tabBarAllowFontScaling:false` | `TabNavigator.js:24` |

### 🔵 FIX COMPARTIDO (beneficia iOS Build 37 + Android) — el bug de planes post-login
| Bug | Hoy | Fix | Archivo |
|---|---|---|---|
| Paywall post-login se muestra a PRO/ELITE en instalación fresca | lee `aurex_plan` de AsyncStorage (vacío en fresh install → trata como FREE) | leer RevenueCat `getCustomerInfo().entitlements.active` (`pro`/`elite`) → no abrir si ya es PRO/ELITE | `App.js:240-246` |

> 👀 **Fernando: revisá esta tabla.** Si ves algo raro, algo que falte, o algo que querías distinto, decímelo antes de ejecutar.

---

## 2. INFO REAL DE PLAY CONSOLE (Escritorio, CP1) — para FASE 4
- **Nombre app:** `AUREX` (5/30) → **Cobrex**.
- **Desc breve (72/80):** *"Real-time global markets tracker. 350 assets, 24 variables, 8 languages."* → neutral (no dice AUREX); se puede dejar o pulir, sin urgencia.
- **Desc completa:** arranca *"AUREX is the global markets terminal…"* + varias menciones ("AUREX Pulse", motor) → **reemplazar TODAS por Cobrex**.
- **4 suscripciones (nombres visibles dicen AUREX → cambiar; product IDs NO):**
  - `…elite.annual` "AUREX ELITE Anual" → "Cobrex ELITE Anual"
  - `…elite.monthly2` "AUREX ELITE Mensual" → "Cobrex ELITE Mensual"
  - `…pro.annual` "AUREX PRO Anual" → "Cobrex PRO Anual"
  - `…pro.monthly` "AUREX PRO Mensual" → "Cobrex PRO Mensual"
- **RevenueCat:** Escritorio confirma offering/packages Android + entitlements `pro`/`elite` OK; key Android existe/funciona.

---

## 3. ROLES + CONTROL CRUZADO (sin cambios respecto al v1)
- **Code:** código (editar/compilar/validar AAB). **Escritorio:** Play Console/RevenueCat/metadata + control del código vía repo público. **Fernando:** sube AAB, asigna testing, da el clic de envío, aprueba checkpoints.
- **CP2** (antes de compilar): Escritorio revisa lista final de cambios. **CP3** (antes de enviar): Escritorio verifica estado Play Console; Fernando da el clic.

---

## 4. FASES DE EJECUCIÓN (qué · cómo · quién hace · quién controla)

### FASE 1 — Código compartido (Code, `~/AurexApp` branch `dev`)
| Tarea | Cómo | Hace | Controla |
|---|---|---|---|
| A1+A4 flip de marca | `brand.js`: Android `BRAND_NAME`→`'Cobrex'`, URLs→`cobrex.io` | Code | Escritorio CP2 |
| A3 sacar balanza+timer | quitar los 5 `{!IS_IOS && …}` (headers) + timer Android en `LiveIndicator` → ambos SO iguales | Code | Fernando (visual) |
| 🔵 fix planes post-login | `App.js:240-246`: RevenueCat entitlements en vez de AsyncStorage | Code | Code (emulador) |
| Fixes Build 37 iOS compartidos | 1.h.1 traducciones ES hardcodeadas → i18n; 1.h.2 onboarding (constelación/tamaño) | Code | Fernando |
| Verificar onboarding/splash-RN/planes en Android | que el Build 36 se vea OK en Android | Code | Code (emulador) |

### FASE 2 — Nativo Android (Code)
| Tarea | Cómo | Hace | Controla |
|---|---|---|---|
| A5 nombre ícono | `strings.xml` `app_name`→`Cobrex` | Code | Escritorio CP2 |
| A6 bootsplash | logo Cobrex limpio (assets Dropbox) + bg `#EEF1F7` (ya) | Code | Fernando (visual) |
| 🟠 crash ScreenFragment | `MainActivity.kt` onCreate(null) | Code | Code |
| 🟠 toolbar S24 | `TabNavigator.js:24` fontSize 8 + no fontScaling | Code | Fernando (Samsung) |
| `aurex_default` | **dejar** (decisión 0.3) | — | — |
| Bump versión | `build.gradle` `versionCode 36→37` + `versionName "1.0.37"` | Code | Escritorio CP2 |
| Ícono | NO se toca | — | — |

### FASE 3 — Build + validación (Code + Fernando)
| Tarea | Cómo | Hace | Controla |
|---|---|---|---|
| Clean OBLIGATORIO | `cd android && ./gradlew clean` | Code | — |
| Compilar | `./gradlew bundleRelease` → AAB | Code | — |
| Backup + validar AAB | `backups/aab/Build37/` + verificar `app_name=Cobrex`/versión/firma | Code | Code |
| Track interno + validar en dispositivo | nombre, splash, onboarding, planes (NO a PRO/ELITE), toolbar S24, balanza fuera | Fernando | Code asiste |

### FASE 4 — Metadata Play Console (Escritorio, sin build) — datos en §2
| Tarea | Hace | Controla |
|---|---|---|
| Nombre listing → Cobrex | Escritorio | Code (lectura) |
| Desc completa: reemplazar AUREX→Cobrex | Escritorio | Code |
| 4 suscripciones: nombres visibles → Cobrex | Escritorio | Code (valida IDs intactos) |
| Capturas Cobrex | Escritorio | Fernando |
| URLs privacy/terms → cobrex.io | Escritorio | Code |

### FASE 5 — Envío + publicación (Fernando)
| Tarea | Hace | Controla |
|---|---|---|
| Subir a producción + enviar | Fernando | Escritorio verifica (CP3) |
| Clic final | Fernando | — |

---

## 5. LO QUE NO SE TOCA
`applicationId com.aurexapp` · product IDs de las 4 suscripciones · claves RC/Supabase/env · ícono · iOS.

## 6. RIESGOS
| Riesgo | Mitigación |
|---|---|
| Google objeta el rename | Bajo; track interno primero |
| Saltear clean → bug bundle | Clean obligatorio |
| Romper suscripciones | No se tocan product IDs ni applicationId |

---

**Fin v2.** Pendiente: **OK final de Fernando al v2** → ejecutar FASE 1.
