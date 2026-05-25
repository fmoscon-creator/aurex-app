# 📦 SNAPSHOT CÓDIGO COBREX — para auditoría de Escritorio

> **25-may-2026.** Copia fiel del código nativo iOS de `~/AurexApp` (rama `dev`, working tree) con los cambios de marca **AUREX/AurexLive → Cobrex**.
> El repo nativo `AurexApp` NO se pushea (su remoto `main` está contaminado con código viejo, ej. `version=11`). Este snapshot es la fuente para auditar el código real desde el cual se compila el IPA.

## ⚠️ ESTADO: el IPA "Build 34" quedó OBSOLETO
Build 34 cambió todo el **texto** a Cobrex, pero **NO** las **imágenes con "AUREX" horneado**. El build válido será **Build 35** (texto + imágenes). Ver `PLAN_REBRAND_COBREX_24MAY.md` actualizado.

## ✅ Cambios de TEXTO (verificables en estos archivos)
| Archivo | Cambio | Verificación |
|---|---|---|
| `brand.js` | `BRAND_NAME` iOS → `'Cobrex'` (Android sigue `'AUREX'`) | línea: `Platform.OS === 'ios' ? 'Cobrex' : 'AUREX'` |
| `Info.plist` | `CFBundleDisplayName` → `Cobrex` | `<string>Cobrex</string>` |
| `project.pbxproj` | `CURRENT_PROJECT_VERSION` → `34` (×2) · `MARKETING_VERSION` = `1.0` intacto | `grep CURRENT_PROJECT_VERSION` |
| `i18n.js` | **272 reemplazos** "AUREX"→"Cobrex" · **0** restos · bot `@Aurexalertas` preservado (×16) | `grep -c AUREX` = 0 · `grep -oc Cobrex` = 272 |
| `screens/*` + `components/UpsellBanner.js` | textos visibles → Cobrex / `COBREX PULSE™` / `COBREX FEAR & GREED 14X™` | — |

**NO se tocó:** bundle ID `com.fernandomoscon.aurex`, Product IDs IAP, ícono, comentarios/`console.log` internos (`[AUREX PORT]` etc, invisibles), dominio `aurex.live`, email `app.aurex@gmail.com`.

## 🔴 FALTA (va en Build 35) — 3 superficies de IMAGEN con "AUREX" horneado
1. **Splash nativo** — `ios/AurexApp/Images.xcassets/BootSplashLogo-092ad1.imageset/` (logo + "AUREX")
2. **Pantalla de carga** — `src/assets/launch_header.png` ("AUREX INVEST AI")
3. **Onboarding** — `src/assets/onboarding/v2/` (4 slides × 8 idiomas × claro/oscuro; OBS1 "AUREX", OBS2 "DISCOVER AUREX", OBS3 "WHY AUREX")

> Fernando rediseña el onboarding. Estas imágenes NO están en este snapshot (son binarias); su reemplazo + recompilación = Build 35.

## Verificación rápida (Escritorio)
```bash
grep "BRAND_NAME = Platform" brand.js          # → 'Cobrex' : 'AUREX'
grep -A1 CFBundleDisplayName Info.plist         # → <string>Cobrex</string>
grep CURRENT_PROJECT_VERSION project.pbxproj    # → 34 (×2)
grep -c AUREX i18n.js                            # → 0
```
