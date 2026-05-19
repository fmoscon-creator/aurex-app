# FLUJO OFICIAL DE BUILD — AUREX iOS y ANDROID

> **Documento de referencia permanente.** Válido desde Build 25 iOS / Build 36 Android.
> **Última actualización:** 19-may-2026.
> **Origen:** Consolidación Escritorio + Code post-incidente Build 25 iOS (errores groseros en proceso crítico que destruyeron tiempo y confianza — este documento existe para que NUNCA se repitan).

---

## 0. ROLES FIJOS — NUNCA CAMBIAN

| Rol | Responsabilidad | Lo que NUNCA hace |
|---|---|---|
| **Code** (Claude Code CLI) | Todo el trabajo técnico: clean, compile, export, validación de IPA/AAB antes de entrega | NO le pasa un binario a Fernando sin validarlo antes contra el último build exitoso |
| **Fernando** | Solo sube el archivo final a la tienda (Transporter iOS, Play Console Android) + asigna grupos de testing | NO toca Xcode. NO compila. NO valida código. NO envía a revisión Android sin OK previo de Escritorio |
| **Escritorio** (Claude Desktop) | Verifica estado en App Store Connect / Play Console después de subida + valida lista de cambios Android antes de "Enviar a revisión" | NO compila. NO ejecuta nada en repos privados |

---

## 1. FLUJO iOS — TESTFLIGHT Y APP STORE

### Paso 0 — Clean obligatorio (Code)

```bash
rm -rf ~/AurexApp/ios/build/
rm -rf ~/Library/Developer/Xcode/DerivedData/AurexApp-*
cd ~/AurexApp/ios && pod install
```

**Equivalente exacto al `./gradlew clean` de Android.**
**NUNCA saltear** este paso. Sin clean, cachés viejos generan IPAs corruptos o con metadata desincronizada (causa real del bug IAP Build 35 Android — bundle JS cacheado).

**❌ NO hacer:** saltear pod install confiando en Pods cacheados de un build anterior.

### Paso 1 — Fixes + bump versiones + commit (Code)

Aplicar todos los cambios del sprint.

**Versiones iOS** (en `ios/AurexApp.xcodeproj/project.pbxproj`):
- ✅ Incrementar SOLO `CURRENT_PROJECT_VERSION` (22 → 23 → 24 → 25 → 26...)
- ✅ `MARKETING_VERSION` se mantiene SIEMPRE en `1.0`
- 🚨 **NUNCA cambiar `MARKETING_VERSION`** sin verificar primero el historial real en App Store Connect → todas las versiones anteriores subidas tenían MARKETING_VERSION = 1.0. Cambiarlo a 1.0.25 (como Code hizo erróneamente 19-may) hace que Transporter muestre bundleID raw + logo gris.

Commit en branch `dev` + push.

**❌ NO hacer:** aplicar literal lo que diga un brief o checklist anterior sin cruzar con el estado real (`grep CURRENT_PROJECT_VERSION ios/AurexApp.xcodeproj/project.pbxproj` + ver últimos builds en App Store Connect).

### Paso 2 — Archive + Export IPA (Code via CLI)

Code compila y exporta el IPA completo via `xcodebuild`:

```bash
cd ~/AurexApp/ios
xcodebuild -workspace AurexApp.xcworkspace -scheme AurexApp \
  -configuration Release -destination 'generic/platform=iOS' \
  -archivePath ~/AurexApp/backups/ipa/BuildXX/AurexApp.xcarchive \
  -allowProvisioningUpdates archive

xcodebuild -exportArchive \
  -archivePath ~/AurexApp/backups/ipa/BuildXX/AurexApp.xcarchive \
  -exportOptionsPlist ~/AurexApp/backups/ipa/BuildXX/ExportOptions.plist \
  -exportPath ~/AurexApp/backups/ipa/BuildXX/ \
  -allowProvisioningUpdates
```

ExportOptions.plist se reusa de la build anterior exitosa (`cp ~/AurexApp/backups/ipa/Build24/ExportOptions.plist ~/AurexApp/backups/ipa/BuildXX/`).

**Re-compile**: si hay que re-generar (ej. error detectado en validación), usar sufijo `_v2`, `_v3`, etc. — NUNCA `_fix` ni overwrite del path original. Convención: `Build25/`, `Build25_v2/`, `Build25_v3/`.

**❌ NO hacer:** Fernando abrir Xcode → Archive. Code hace todo via CLI.

### Paso 2.5 — VALIDACIÓN POST-EXPORT (Code) ⚠️ CRÍTICO

**Antes de avisar a Fernando que el IPA está listo**, Code DEBE validar metadata:

```bash
cd /tmp && rm -rf ipa_check && mkdir ipa_check && cd ipa_check
unzip -q ~/AurexApp/backups/ipa/BuildXX/AurexApp.ipa
for k in CFBundleDisplayName CFBundleIdentifier CFBundleShortVersionString CFBundleVersion ITSAppUsesNonExemptEncryption; do
  echo "  $k: $(plutil -extract $k raw Payload/AurexApp.app/Info.plist 2>/dev/null)"
done
```

**Comparar SIEMPRE contra el último IPA exitoso** (ej. Build24). La ÚNICA diferencia debe ser `CFBundleVersion`. Si discrepa cualquier otra key → STOP, no entregar a Fernando.

Verificar también signing:
```bash
codesign -dv /tmp/ipa_check/Payload/AurexApp.app
```

Debe mostrar `Identifier=com.fernandomoscon.aurex` + `TeamIdentifier=TX7C2F79U9`.

### Paso 3 — Subir con Transporter (Fernando)

Abrir Transporter → botón `+` → seleccionar `~/AurexApp/backups/ipa/BuildXX/AurexApp.ipa` → esperar carga.

**🚨 SÍNTOMAS STOP — NO clickear "Entregar" si aparece cualquiera de estos:**

| Síntoma visible en Transporter | Significa | Acción |
|---|---|---|
| Logo GRIS genérico (no dorado AUREX) | Metadata IPA no coincide con App Store Connect | STOP. Eliminar de Transporter. Code re-valida Paso 2.5 |
| Texto `com.fernandomoscon.aurex` en lugar de "AUREX LIVE" / "AUREX AI" | MARKETING_VERSION nuevo no existe en App Store Connect | STOP. Code revisa MARKETING_VERSION y re-genera |
| Solo opciones "Mostrar en Finder / Eliminar" (sin "Entregar") | Fallo validación silencioso de Apple | Force-quit Transporter + reabrir + re-agregar. Si persiste: Code re-genera |
| Error rojo o warning amarillo | Validación falló | Code investiga y re-genera |

**Síntoma OK para Deliver:** logo dorado AUREX + nombre correcto ("AUREX LIVE") + versión "1.0 (XX)" + botón **ENTREGAR azul** visible.

Confirmación de upload exitoso: ítem pasa a "Entregado" en VERDE.

### Paso 4 — Verificar procesamiento (Escritorio)

App Store Connect → AUREX LIVE → TestFlight → iOS Builds.

El build tarda 5-15 minutos (a veces hasta 30 en horas pico) en pasar a "Procesado". Escritorio confirma a Fernando cuando:
- ✅ Build aparece con icono dorado AUREX (no gris genérico)
- ✅ Estado "Procesado" o "Listo para pruebas internas"
- ⚠️ Si quedó "Procesado" pero NO pasó a "Listo para pruebas internas" después de 15 min → ver Paso 5

### Paso 5 — Asignar grupo Internal Testing (Fernando) ⚠️ MANUAL

**Cuando se sube via CLI (xcodebuild), el build NO se auto-asigna al grupo de testers internos.** Fernando debe hacerlo manual:

1. App Store Connect → AUREX LIVE → TestFlight → iOS Builds
2. Click en el build XX
3. Sección "Pruebas internas" o "Grupos" → asignar grupo que ya existe (mismo que builds anteriores)
4. Estado pasa automáticamente a "Lista para probar"

### Paso 6 — Validar en iPhone (Fernando)

iPhone → TestFlight → notificación de update disponible → instalar → abrir AUREX → login fmoscon → validar fixes del sprint.

---

## 2. FLUJO ANDROID — PLAY STORE (INTERNAL TESTING Y PRODUCCIÓN)

### Paso 0 — Clean obligatorio (Code)

```bash
cd ~/AurexApp/android && ./gradlew clean
```

**NUNCA saltear.** Fue la causa raíz del bug IAP Build 35 — bundle JS cacheado del build anterior sobrevivía sin el clean, hizo perder 3 días.

**❌ NO hacer:** confiar en builds cacheados de Gradle.

### Paso 1 — Fixes + bump versiones + commit (Code)

Aplicar todos los cambios del sprint.

**Versiones Android** (en `android/app/build.gradle`):
- ✅ `versionCode` (35 → 36 → 37...)
- ✅ `versionName` ("1.0.35" → "1.0.36" → "1.0.37"...)
- Ambos suben juntos en cada build.

Commit en branch `dev` + push.

**Backup AAB obligatorio post-compile** en `~/AurexApp/backups/aab/BuildXX/`.

### Paso 2 — Compilar AAB (Code)

```bash
cd ~/AurexApp/android && ./gradlew bundleRelease
```

Genera AAB firmado en `~/AurexApp/android/app/build/outputs/bundle/release/app-release.aab`. Mover/copiar a `~/AurexApp/backups/aab/BuildXX/`.

**❌ NO hacer:** dejar el AAB dentro de `android/app/build/` (puede borrarse en el próximo build).

### Paso 3 — Subir a Play Console (Fernando)

Play Console → AUREX → track destino (Internal Testing o Producción) → Crear versión → subir AAB → completar release notes (opcional pero recomendado) → Guardar.

### Paso 4 — Escritorio verifica lista ANTES de enviar a revisión ⚠️ CRÍTICO

**Escritorio verifica en pantalla la lista de cambios que Play Console muestra antes de que Fernando presione "Enviar a revisión".** Fernando NO envía sin OK explícito de Escritorio en este paso.

**Este paso previene enviar cambios no intencionados** (como ocurrió con el track Alpha en Build 36 que se incluyó sin querer en la solicitud de review junto con Build 36 a Producción + Privacy Policy + Data Safety).

### Paso 5 — Enviar a revisión (Fernando)

Con OK de Escritorio → click "Enviar a revisión Google Play".

### Paso 6 — Verificar estado (Escritorio)

Play Console → Descripción general de la publicación → confirmar "En revisión" o "Publicada". Reportar a Fernando.

ETA aprobación Google Play típica: 2-24 horas (a veces hasta 72h en casos lentos).

---

## 3. REGLAS PERMANENTES

1. **Clean SIEMPRE antes de compilar** — iOS y Android, sin excepción, sin importar lo que diga el brief o el sprint.

2. **Backup SIEMPRE antes de subir** — IPA en `backups/ipa/BuildXX/`, AAB en `backups/aab/BuildXX/`. Si hay re-compile usar `_v2`, `_v3` (NUNCA `_fix`).

3. **Fernando NO toca Xcode** — Code hace Archive + Export completo vía CLI.

4. **iOS versiones**: `MARKETING_VERSION = 1.0` siempre. Solo sube `CURRENT_PROJECT_VERSION`. Nunca cambiar `MARKETING_VERSION` sin cruzar primero con el historial real de App Store Connect.

5. **Android versiones**: `versionCode` y `versionName` suben juntos en cada build.

6. **Code VALIDA IPA post-export** (Paso 2.5) ANTES de avisar a Fernando — comparar metadata contra último build exitoso. Si discrepa cualquier key salvo `CFBundleVersion` → STOP.

7. **Síntomas STOP en Transporter** (Paso 3) — Fernando NO hace Deliver si ve logo gris, bundleID raw, o falta botón Entregar. Avisar a Code para re-generar.

8. **Asignar grupo Internal Testing manual** (Paso 5 iOS) — cuando se sube via CLI, el build NO se auto-asigna. Fernando lo hace en App Store Connect.

9. **Escritorio verifica lista cambios Android antes de enviar a revisión** (Paso 4 Android) — previene enviar cambios no intencionados.

10. **Escritorio confirma procesamiento iOS** — verificar icono dorado AUREX correcto, no logo gris ni bundleID raw.

11. **Code NO aplica cambios de versión del brief literalmente** sin cruzar con el historial real — siempre validar contra lo que ya existe en la tienda.

---

## 4. LECCIONES APRENDIDAS (incidentes que dieron origen a este flujo)

| Build | Error | Fix incorporado al flujo |
|---|---|---|
| **Android Build 35** (16-may) | Bug IAP "product not available for purchase" por bundle JS cacheado | Paso 0: clean obligatorio `./gradlew clean` |
| **Android Build 36 review** (18-may) | Se envió track Alpha + 3 cambios más juntos al review sin verificación previa | Paso 4: Escritorio verifica lista cambios ANTES de enviar |
| **iOS Build 25** (19-may) | Code cambió `MARKETING_VERSION 1.0 → 1.0.25` literal del brief sin cruzar historial. Transporter mostró logo gris + bundleID raw. 2 IPAs descartados | Reglas 4 + 6 + 7 + 8: validar pre-export, síntomas STOP Transporter, no aplicar versiones literal |
| **iOS Build 25** (19-may) | Code dio instrucciones de 10 pasos en Xcode a Fernando cuando el flujo histórico era Code compila + Fernando solo Transporter | Roles fijos en sección 0: Fernando NO toca Xcode |
| **iOS Build 18** (4-may) | 12 intentos Podfile por bug RNSVG vtable. Push iOS no se wired hasta Build 19 (FirebaseApp.configure) | Paso 0 incluye `pod install` obligatorio + verificación post-export firma signing |

---

*Este documento es referencia permanente. Cualquier modificación requiere consenso Code + Escritorio + OK Fernando antes de actualizar.*
