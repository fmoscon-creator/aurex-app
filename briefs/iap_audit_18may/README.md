# 🔍 IAP AUDIT — Snapshot código real Build 35 (Android producción)

**Fecha snapshot:** 18-may-2026 ~17:00 AR
**Origen:** repo privado `~/AurexApp` (Code lo copió aquí para que Escritorio pueda leer vía raw URL)
**Build referencia:** v1.0.35 (versionCode 35) — el que Fernando tiene instalado en Samsung Z Flip 3
**Commit AurexApp más reciente:** `ac46f8e` "Build 35 DEBUG: Alert detallado para capturar error real de purchasePackage"

---

## 📂 Archivos snapshot

Los 5 archivos clave para el análisis del bug IAP RC #76809:

| Archivo | Líneas | Por qué importa |
|---|---|---|
| `App.js` | 231 | Init RC + IAP-1 `Purchases.logIn` boot |
| `LoginScreen.js` | 153 | IAP-2.1 Path 1 SDK + IAP-2.2 Path 2 fetch |
| `SignupScreen.js` | 211 | IAP-3 post-signup |
| `PerfilScreen.js` | 1110 | IAP-4 logout + IAP-6 deleteAccount |
| `SubscriptionScreen.js` | ~190 | `loadOfferings` + `handlePurchase` (donde explota el bug) + Alert debug Build 35 |

---

## 🔗 URLs raw para Escritorio

Después del próximo commit + push, los 5 archivos estarán disponibles en:

```
https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/iap_audit_18may/code_snapshot_build35/App.js
https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/iap_audit_18may/code_snapshot_build35/LoginScreen.js
https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/iap_audit_18may/code_snapshot_build35/SignupScreen.js
https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/iap_audit_18may/code_snapshot_build35/PerfilScreen.js
https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/iap_audit_18may/code_snapshot_build35/SubscriptionScreen.js
```

---

## 📋 Diff Build 33 producción → Build 35 (qué cambió en total)

```
App.js                            | 12 ++++++++++++   (IAP-1)
android/app/build.gradle          |  4 ++--           (versionCode 33→35)
src/screens/LoginScreen.js        |  8 ++++++++       (IAP-2.1 + IAP-2.2)
src/screens/PerfilScreen.js       |  6 ++++++         (IAP-4 + IAP-6)
src/screens/SignupScreen.js       |  4 ++++           (IAP-3)
src/screens/SubscriptionScreen.js | 12 +++++++++++-   (Alert IAP debug Build 35)
6 files changed, 43 insertions(+), 3 deletions(-)
```

## 📋 Diff Build 34 → Build 35 (solo Alert debug)

```
android/app/build.gradle          |  4 ++--   (versionCode 34→35)
src/screens/SubscriptionScreen.js | 12 +++++++++++-   (Alert IAP debug)
2 files changed, 13 insertions(+), 3 deletions(-)
```

---

## ✅ Validación cruzada Tier 1 vs código real (hecha por Code 18-may)

| ID | Archivo | Línea | Estado |
|---|---|---|---|
| IAP-1 | `App.js` | L42-63 | ✅ APLICADO Build 34 |
| IAP-2.1 | `LoginScreen.js` | L33 | ✅ APLICADO Build 34 |
| IAP-2.2 | `LoginScreen.js` | L64 | ✅ APLICADO Build 34 |
| IAP-3 | `SignupScreen.js` | L92 | ✅ APLICADO Build 34 |
| IAP-4 | `PerfilScreen.js` | L242 (logout) | ✅ APLICADO Build 34 |
| IAP-6 | `PerfilScreen.js` | L268 (deleteAccount) | ✅ APLICADO Build 34 |
| IAP-5 | backend `server.js` L1631-1643 | (otro repo) | ✅ APLICADO commits `1184de5` + `a722e92` |

**Tier 1 está aplicado al 100%. El bug "product not available for purchase" ocurre CON Tier 1 ya aplicado en Build 35.**

---

## 🚨 Acción pendiente real (única identificada)

Build 36 con `./gradlew clean` obligatorio + revertir Alert debug temporal del Build 35. Esto se basa en evidencia del Issue `RevenueCat/purchases-android#3039` cerrado como "Not a Bug" (resuelto con rebuild limpio del AAB sin cambios de código ni SDK).

---

## 🔁 Snapshot mantenimiento

Si Code modifica los archivos del repo privado AurexApp, debe re-copiar acá para mantener esta carpeta actualizada. Para auditorías futuras de Escritorio, mismo procedimiento: copiar a `briefs/<tema>_<fecha>/code_snapshot/`.
