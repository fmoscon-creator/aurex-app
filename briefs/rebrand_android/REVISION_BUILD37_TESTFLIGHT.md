# REVISIÓN BUILD 37 iOS — hallazgos TestFlight (29-may-2026)

> Fernando prueba el Build 37 en TestFlight (instalación fresca). Se anotan TODOS los hallazgos → al terminar la revisión, Code hace UNA recompilación (build 38) con todo.

## Hallazgos
1. ✅ **CORREGIDO EN CÓDIGO (falta recompilar):** LoginScreen — botón secundario "No tengo cuenta — Crear cuenta gratis" estaba **hardcodeado en ES** (lo vio Fernando, salía en español con device en inglés). Code lo había SALTEADO en el 1.h.1 (estaba nombrado en el brief). Fix: `{t('no_tengo_cuenta')} — {t('crear_cuenta')}` (clave `no_tengo_cuenta` nueva 8 idiomas).
2. ✅ **VISTO (fotos Downloads/TECLADO ERROR.jpg + NO TENGO CUENTA.png):** al subir el teclado en LoginScreen, el botón "No tengo cuenta — Crear cuenta gratis" queda **tapado a la mitad** por el teclado. **Fix (build 38):** envolver el form en ScrollView (keyboardShouldPersistTaps='handled') dentro del KeyboardAvoidingView, o ajustar el KAV, para que el botón quede sobre el teclado y se pueda scrollear/tocar.
3. 📝 **DETECTADO (decidir alcance):** LoginScreen + SignupScreen tienen **mensajes de estado/error en ES hardcodeados** (`setStatus(...)`): "Email invalido", "La contraseña debe tener al menos 6 caracteres", "Las contraseñas no coinciden", "Este email ya tiene cuenta...", "Revisa tu email / Te enviamos un email...", "Respuesta inesperada", "Red:". Además hay **debug leftovers** que NO deberían mostrarse al usuario ("SDK fallo, probando fetch directo...", "Fetch OK — seteando sesion..."). → parte del §1.h.1; decidir si entran al build 38 o al audit completo.

4. 📝 **Visibilidad de los links (Fernando):** la pantalla de planes no se ve entera → hay que **scrollear** para ver los links azules "Terms of Use" / "Privacy Policy" + "Restore Purchase". **Aclaración:** NO fue el motivo del rechazo (el Build 36 NO tenía los links en el paywall; ahora sí). Que estén abajo con scroll es estándar/aceptado y los reviewers scrollean. **Mejora posible (build 38, no bloqueante):** hacerlos más visibles / que requieran menos scroll, para minimizar riesgo.

5. 🔴 **Card UpsellBanner en PERFIL sale en ES** (Fernando lo había avisado, Code lo salteó otra vez). Causa: `src/components/UpsellBanner.js` tiene **textos por defecto hardcodeados en ES** (líneas 26-30: "Pasate a PRO/ELITE — $X/mes", "Activos ilimitados · 14 tipos de alertas · Telegram...", "Cobrex Pulse completo · RSI/MACD · Alertas geopolíticas GDELT"). En Portfolio se pasan props custom (ya traducidas), pero en Perfil (`<UpsellBanner />` sin props) usa los defaults ES. **Fix (build 38):** pasar esos defaults a i18n (8 idiomas). UpsellBanner solo se usa en Portfolio + Perfil.

## Estado validación (cuadro) — REVISIÓN COMPLETA:
- ✅ A) fix rechazo: links Términos/Privacidad en paywall ABREN cobrex.io (1-4 OK). **LO CRÍTICO RESUELTO.**
- ✅ B) Portfolio inglés OK · Watchlist vacío inglés OK (validado con cuenta FREE nueva) · Signup botón inglés OK. ❌ ÚNICO pendiente: card Perfil (hallazgo #5).
- ✅ C) mail support@cobrex.io OK · 3 redes Cobrex abren OK · compartir cobrex.io OK.
- ✅ D) "Cobrex v1.1.37" OK · 6 tabs andan OK.
→ **Build 37 sano. Único bug visible = card Perfil (#5). + Login botón (#1, ya en código). + teclado (#2, falta foto). + status msgs auth (#3, decidir).**

## ✅ BUILD 38 COMPILADO Y VALIDADO (29-may) — resuelve hallazgos 1, 2, 5 + links paywall más visibles
- IPA: `~/AurexApp/backups/ipa/Build38/AurexApp.ipa` (v1.1 build 38, Cobrex, signing TX7C2F79U9). Commit `2169640`.
- Fixes incluidos: #1 botón Login→i18n · #2 teclado tapa botón (ScrollView en Login Y Signup) · #5 card Perfil UpsellBanner→i18n (8 idiomas) · links paywall más visibles (fontSize 14 + separador).
- #3 (mensajes de estado/error ES en Login/Signup + debug leftovers) → NO incluido (Fernando lo dejó afuera) → queda para audit completo §1.h.1 futuro.
- **Pendiente:** Fernando sube build 38 a TestFlight → revalida (Login botón inglés + teclado OK + Perfil card inglés + paywall links visibles) → si OK, reenvío final a Apple (build 38 + video + Novedades).
- ⚠️ Nota de naming: este es el build NÚMERO 38 (el reenvío del rechazo). Los items cosméticos deferidos (1.h.2 onboarding animado, 1.h.3 paywall fresh-install, 1.h.4 loading nativo, FAQ Grupo2, AI-Analysis Grupo3) pasan a un **build futuro (39+)**.
