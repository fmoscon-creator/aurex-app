# 🍎 BUILD 39 iOS (Cobrex) — Análisis de proceso + ajustes

*Fecha: 03-jun-2026 · Autor: Code · Para validación de Escritorio + OK de Fernando · NADA se compila/envía sin OK.*
*Base: reglas y proceso ya acordados en el brief maestro (§1.h, §11 FLUJO) + memorias de proceso de build. No inventa nada — verificado contra el brief.*

---

## PARTE 1 — REGLAS Y PROCESO DE BUILD / COMPILACIÓN / TESTFLIGHT (acordado, no se cambia)

### 1.1. Reglas DURAS (no negociables)
1. **🚫 Code NUNCA compila pesado en la Mac de Fernando sin OK explícito.** Prohibido `xcodebuild archive`, build de simulador desde cero, `pod install` completo por iniciativa propia (congeló la Mac 3 veces). La compilación/archive la **dispara Fernando** cuando NO está usando la Mac.
2. **🚫 No se cambia ni "optimiza" un paso del proceso ya definido.** Se ejecuta literal. Cambios se proponen y se espera OK.
3. **👁️ Validación de Code = REVISIÓN DE CÓDIGO (sin tocar la Mac de Fernando).** Code NO abre el simulador en la pantalla de Fernando, NO compila, NO le saca capacidad. Valida analizando el código (lógica, estructura, i18n, que el cambio sea correcto) y, si hace falta ver algo visual, genera un **preview PNG liviano** (HTML→PNG, no usa la Mac). **El resultado visual final se valida en TestFlight (Fernando)**, no en el simulador.
4. **🔒 IDs que NO cambian** (rompen pagos/identidad): bundle `com.fernandomoscon.aurex`, Team `TX7C2F79U9`, product IDs `com.fernandomoscon.aurex.*`, RC `aurex_default`/`pro`/`elite`.

### 1.2. Reparto de roles
- **Code:** edita el código en `~/AurexApp/src` (repo privado `AurexApp`, branch `dev`), valida UI en simulador, deja todo listo. **No compila el release.**
- **Fernando:** dispara la compilación/archive, sube el IPA, prueba en TestFlight, aprieta "enviar a revisión". **Es el único que envía a Apple.**
- **Escritorio:** valida este plan + la metadata en ASC (keywords, ficha, textos) que NO requiere build.

### 1.3. Flujo de compilación (brief §11 FLUJO — se ejecuta TAL CUAL)
1. Code prepara los cambios de código + sube cambios al repo (`~/AurexApp`, branch `dev`).
2. **Code valida por revisión de código** (sin Mac de Fernando) + preview PNG si aplica → deja todo listo.
3. **Limpieza + compilación (Fernando):** ver detalle del clean en **§1.4** → `archive + export IPA` → IPA en `~/AurexApp/backups/ipa/Build39/AurexApp.ipa`.
   - Única diff técnica esperada vs Build 38: `CFBundleVersion` **38 → 39** (CFBundleShortVersionString sigue **1.1**). Signing `com.fernandomoscon.aurex` / `TX7C2F79U9`.
4. **Subida:** IPA → **Transporter** → App Store Connect.
5. **TestFlight:** instalar en iPhone/iPad real y **probar cada ajuste** antes de enviar a revisión.
6. **Enviar a revisión** (Fernando) + **publicación MANUAL** (al aprobar no sale solo).
7. **Backup** del IPA en `~/AurexApp/backups/ipa/Build39/`.

> **Nota de versión:** el Build 39 sigue siendo **v1.1** (mismo MarketingVersion), solo sube el número de compilación a 39. No es una versión nueva de cara al usuario, es una actualización de la 1.1.

### 1.4. CÓMO se limpia antes de compilar (el "clean") — lo ejecuta FERNANDO
Antes del archive se limpia el proyecto para que el build salga sin restos de builds anteriores (igual que se hizo en los Builds 33 y 35). **Lo dispara Fernando cuando NO está usando la Mac** (es el único momento pesado del proceso; toda la preparación de Code es liviana).

**Comandos del clean (en orden), desde `~/AurexApp`:**
```
watchman watch-del-all                                   # 1. limpia el watcher de Metro (JS)
rm -rf ios/build                                          # 2. borra el build nativo iOS
rm -rf ~/Library/Developer/Xcode/DerivedData/AurexApp-*   # 3. borra el cache del proyecto
cd ios && pod install && cd ..                            # 4. reinstala las dependencias nativas (CocoaPods)
```
Luego, en **Xcode**: seleccionar **"Any iOS Device"** → **Product ▸ Archive** → al terminar, **Distribute App ▸ App Store Connect** → exportar el **IPA** (signing `com.fernandomoscon.aurex` / Team `TX7C2F79U9`).

⚠️ **Importante:** este clean (rm DerivedData) fuerza un build **desde cero** = **pesado** (recompila todo). Por eso lo hacés **vos, con la Mac libre**. Code **nunca** ejecuta este paso por su cuenta (la regla 1.1).

> **Alternativa más liviana (opcional, la decidís vos):** en vez del `rm DerivedData`, usar en Xcode **Product ▸ Clean Build Folder (⇧⌘K)** y archivar. Reutiliza las ~1.200 librerías ya compiladas → mucho más rápido, pero menos "desde cero". Por defecto seguimos el **clean completo** de los Builds 33/35 (más seguro contra restos); si querés el liviano, avisás.

---

## PARTE 2 — AJUSTES DEL BUILD 39 (qué · dónde · cómo · riesgo · validación)

> Leyenda riesgo: 🟢 bajo (texto/metadata) · 🟡 medio (UI/i18n) · 🔴 alto (lógica nativa/compra/animación).

| # | Ajuste | Qué es / por qué | Dónde (archivo) | Cómo se hace | Riesgo | Valida |
|---|---|---|---|---|---|---|
| **A** | **Popup de reseña in-app** | Pedir reseña tras **3 días de USO ACTIVO** (días que abrió la app, no calendario), solo si no dejó reseña. Texto "¿Te está siendo útil Cobrex? Tu opinión nos ayuda a crecer 🙏" + "Dejar reseña" (abre link según plataforma) + "Ahora no" (re-preguntar en 7 días). Si toca "Dejar reseña" no aparece más. Máx **3 apariciones** totales. | nuevo componente RN + contador en AsyncStorage; usar `StoreReview` nativo de iOS o link directo | Código RN nuevo. Validar en simulador (forzar el contador a 3 días). | 🟡 | Code (revisión código) + Fernando (TestFlight) |
| **1.h.2** | Onboarding animado | Constelación que titila + logo/COBREX más grandes (cosmético). | onboarding RN | Animación RN (Animated). Validar fluidez en simulador. | 🔴 (animación) | Code (revisión código) + Fernando |
| **1.h.3** | Paywall fresh-install | En instalación fresca el paywall se abre como PRO/ELITE. Fix: leer RC `getCustomerInfo()` en vez de AsyncStorage `aurex_plan`. **Bug real pero invisible en producción** (no hay pagos PRO/ELITE reales salvo la prueba). | `SubscriptionScreen`/lógica de plan | Cambiar la fuente del plan a RevenueCat. **Toca lógica de compra → probar bien** que no rompa el flujo de gating. | 🔴 (lógica compra) | Code + Fernando (TestFlight, install fresca) |
| **1.h.4** | Loading nativo | Quitar "Loading…" + spinner sol del `.storyboard` (restos del diseño viejo). | `LaunchScreen.storyboard` / nativo iOS | Editar el storyboard. Nativo → Fernando confirma en arranque real. | 🔴 (nativo) | Code + Fernando |
| **1.h.8** | Links Términos/Privacidad sin scroll | En la pantalla de planes los links requieren scrollear ("nadie adivina el scroll"). Poner línea compacta "Términos · Privacidad" **arriba**, visible sin scroll. | `SubscriptionScreen` | Reubicar/duplicar los links arriba (debajo del subtítulo). | 🟡 (UI) | Code (revisión código) + Fernando |
| **1.h.9** | Mensajes Login/Signup a i18n | Los `setStatus(...)` ("Email inválido", "contraseña ≥6", "ya tiene cuenta", "Revisá tu email", etc.) están en ES hardcodeado → pasar a i18n (8 idiomas). **+ quitar debug leftovers** ("Fetch OK — seteando sesión…", "SDK falló, probando fetch directo…") que NO deben verse. | `LoginScreen`/`SignupScreen` + i18n | Reemplazar strings por claves i18n + traducir 8 idiomas + borrar logs visibles. | 🟡 (i18n) | Code + Escritorio (traducciones) |
| **1.h.7** | FAQ Perfil a i18n (Grupo 2) | El FAQ de Perfil (6 preguntas + 6 respuestas) está solo en ES+EN → faltan pt/zh/hi/fr/it/ar (~72 traducciones). | `PerfilScreen` (~957-962) + i18n | Pasar a i18n + traducir. **Volumen alto + riesgo de calidad de traducción.** | 🟡 (i18n volumen) | Code + Escritorio (traducciones) |
| **1.h.6** | "Full AI Analysis" a i18n (Grupo 3) | Las frases que justifican la señal ("Precio subió X…", "RSI14 en X…", "Volumen…") están en ES hardcodeado **con condicionales embebidos** (alcista/bajista) → reestructurar a i18n. | `PortfolioScreen` (~1454+) + i18n | Reestructurar con cuidado (los condicionales hacen riesgoso el i18n). | 🔴 (estructura compleja) | Code + Escritorio |
| **B** | **Keywords ASO** (búsqueda) | Agregar `cobrex`+`cedears` en ES + `cobrex` en los otros idiomas → arregla que no aparezca al buscar "cobrex" en AR. **NO es código** (metadata de la versión). | App Store Connect (no es build) | Escritorio carga las keywords en ASC junto con este envío. Texto ES listo: `cobrex,cripto,acciones,bolsa,trading,alertas,mercados,inversiones,analisis,cedears,IA,ETF,finanzas`. | 🟢 (metadata) | Escritorio (carga) |
| **C** | **Ficha macOS** | Completar el borrador de la ficha macOS (creada por error, vacía). Requiere build macOS + captura 1280×800/1440×900 + descripción. | ASC app macOS (id 6761672161) | Evaluar si entra en este ciclo o se difiere (requiere build macOS aparte). | 🟡 | Fernando decide si va ahora |

---

## PARTE 3 — ORDEN DE EJECUCIÓN PROPUESTO (de menor a mayor riesgo)
1. **Metadata sin build (en paralelo, Escritorio):** keywords ASO (B). *No depende del código.*
2. **i18n (Code + Escritorio traducciones):** 1.h.9, 1.h.7, 1.h.6 — texto, sin tocar lógica.
3. **UI (Code, validar en simulador):** 1.h.8 (links arriba), 1.h.2 (onboarding animado).
4. **Lógica/nativo (más riesgo, probar a fondo en TestFlight):** 1.h.3 (paywall fresh-install), 1.h.4 (loading nativo), A (popup reseña).
5. **Compilación (Fernando) → Transporter → TestFlight → probar TODO → enviar a revisión.**
6. **macOS (C):** decidir si entra ahora o se difiere.

> **Antes de compilar:** Code valida todo por **revisión de código** (sin tocar la Mac) + preview PNG si aplica; recién con todo listo, Fernando hace el **clean (§1.4) + archive** con la Mac libre. El resultado visual se confirma en **TestFlight**. **Nada se envía a Apple sin que Fernando lo apruebe y lo dispare.**

---

## Para Escritorio — qué validar
- ¿El proceso de la Parte 1 está completo y correcto según lo acordado?
- ¿Falta algún ajuste en la Parte 2 (o alguno no debería ir en este build)?
- ¿El orden de la Parte 3 te cierra?
- Traducciones (1.h.9 / 1.h.7 / 1.h.6): ¿las generás vos (EN maestro + revisión) y Code las cablea?
- macOS (C): ¿entra ahora o se difiere?
