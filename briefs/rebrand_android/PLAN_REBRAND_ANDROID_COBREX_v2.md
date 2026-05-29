# 🟠 PLAN INTEGRAL — REBRAND ANDROID "AUREX" → "COBREX" (Build 37 Android / v1.0.37) — **v2 EJECUTABLE**

> **v2 = v1 + 3 decisiones de Fernando LOCKED + info real de Play Console (Escritorio CP1) + tabla de comparación iOS vs Android.**
> **Independiente de iOS** (otra tienda; no se cruza con la revisión del Build 36 iOS). Se ejecuta cuando Fernando dé el OK final del v2.
> Base de código: `~/AurexApp` branch `dev`, 29-may-2026.

---

## 0. DECISIONES DE FERNANDO — LOCKED ✅ (29-may)
1. **Balanza ⚖️ + timer:** se **SACAN** de los headers de las 6 tabs en Android (igual que iOS) → más espacio + queda en **Perfil** ("Aviso Legal / Legal Notice", ya existe). ✅
2. **Nombre en Play Store:** **full "Cobrex"** (sin conservar "AUREX"). ✅
3. **D1 — Nombre del desarrollador (cuenta Google Play):** "AUREX AI" → **"Cobrex"**. **TODO se tiene que llamar Cobrex.** ✅
> *Nota técnica menor (sin acción):* el canal interno de notificaciones (`aurex_default`) se deja como está — es un ID que el usuario NUNCA ve y cambiarlo podría resetear notificaciones de usuarios existentes. No es una decisión, es un no-tocar.

**Dato confirmado para los 265 usuarios actuales de AUREX:** al actualizar a v1.0.37 ven el nombre cambiar a "Cobrex" automáticamente, **sin perder login/datos/suscripciones** (mismo `applicationId com.aurexapp`, mismos product IDs). El ícono no cambia (ya es solo símbolo). Transición transparente.

---

## 0.b 📋 CUADRO A — CAMBIOS DENTRO DE LA APP (qué · dónde se ve · archivo)

| # | Qué cambia | Dónde lo VE el usuario | Archivo / cómo |
|---|---|---|---|
| A1 | Marca **"AUREX" → "Cobrex"** (texto del header) | Login, Signup, Portfolio, Mercados, Watchlist, IA, Mis Alertas, Perfil (headers) + Onboarding + Splash RN | `brand.js` → flip rama Android `BRAND_NAME` |
| A2 | URLs privacidad/términos **aurex.live → cobrex.io** | Perfil (links legales) + pantalla de planes | `brand.js` → `PRIVACY_URL` / `TERMS_URL` |
| A3 | **Sacar balanza ⚖️ + timer** de los headers (quedan en Perfil "Aviso Legal") | Portfolio, Mercados, Watchlist, IA, Alertas (header) | quitar los 5 `{!IS_IOS && …}` + timer de `LiveIndicator` |
| A4 | Mail soporte **→ support@cobrex.io** | Perfil → Contacto | `PerfilScreen` / `brand` *(ya hecho en código compartido del build iOS)* |
| A5 | Redes **→ cuentas Cobrex** | Perfil → Instagram/X/YouTube | *(ya hecho, compartido)* |
| A6 | Textos de compartir **→ cobrex.io** | al compartir activo/señal | Portfolio/Watchlist/Mercados/IA *(ya hecho, compartido)* |
| A7 | **Nombre bajo el ícono → Cobrex** | pantalla de inicio del teléfono | `strings.xml` → `app_name` |
| A8 | **Splash nativo → logo Cobrex limpio** | arranque de la app | bootsplash Android (assets) |
| A9 | Fix crash al volver de segundo plano | (no visible — evita un crash) | `MainActivity.kt` (override `onCreate`) |
| A10 | Toolbar con labels cortadas en Samsung S24 | barra inferior de las 6 tabs | `TabNavigator.js` (`fontSize` 9→8) |
| — | **Ícono de la app** | — | **NO cambia** (símbolo dorado) |
| — | Onboarding 3D / Splash RN / pantalla de planes | ya están en diseño Cobrex | **código compartido — ya viene del build iOS** |

> A4/A5/A6 ya están en el código compartido (los hicimos en el build iOS) → en Android salen "gratis". Lo nuevo y propio de Android es A1, A2, A3, A7, A8, A9, A10.

---

## 0.c 📋 CUADRO B — CAMBIOS EN LA METADATA (qué · dónde en Play Console · cómo)

| # | Campo | Dónde en Play Console | Actual | Nuevo | Cómo |
|---|---|---|---|---|---|
| B1 | Nombre de la app | Ficha de Play Store principal | `AUREX` | `Cobrex` | editar, en los **8 idiomas** |
| B2 | Descripción breve | Ficha principal | "…24 variables…" (no dice AUREX) | pulir (opcional) | editar |
| B3 | Descripción completa | Ficha principal | "AUREX is…" | reemplazar **AUREX→Cobrex**, **AUREX Pulse→Cobrex Pulse**, **aurex.live→cobrex.io** | 8 idiomas |
| B4 | **Nombre del desarrollador** | Configuración → Cuenta de desarrollador | `AUREX AI` | `Cobrex` | nivel cuenta (Google puede pedir re-verificación) |
| B5 | Suscripciones (4) — **nombres** | Monetización → Suscripciones | "AUREX PRO/ELITE…" | "Cobrex PRO/ELITE…" | editar — **product IDs NO se tocan** |
| B6 | Suscripciones — **descripciones** | Monetización → Suscripciones | ⬜ ¿dicen AUREX? | Cobrex | **relevar** + editar |
| B7 | Gráfico de funciones (banner) | Ficha → Recursos gráficos | ⬜ ¿dice AUREX? | Cobrex | **Code regenera** 1024×500 |
| B8 | Capturas (Teléfono + Tablet 7" + 10") | Ficha → Recursos gráficos | AUREX/viejas (solo EN) | nuevas Cobrex | Fernando saca del teléfono → Code adapta |
| B9 | Sitio web | Ficha → detalles de contacto | ⬜ (¿aurex.live?) | cobrex.io | editar |
| B10 | Política de privacidad (URL) | Contenido de la app / Ficha | ⬜ | cobrex.io/privacy.html | editar |
| B11 | Email de contacto | Ficha → detalles de contacto | ⬜ | support@cobrex.io | editar |
| B12 | Novedades (What's New) | Ficha de la versión | — | texto que define Fernando | editar |
| B13 | RevenueCat — display names | Dashboard RevenueCat | ⬜ ¿dicen AUREX? | Cobrex | relevar + editar |
| — | Ícono (512×512) | Ficha | símbolo dorado | **NO cambia** | — |

---

## 0.d 📲 PARA FERNANDO — lo ÚNICO que falta relevar (lo demás es find/replace directo)

> **Aclaración (29-may):** casi toda la metadata es el **mismo find/replace AUREX→Cobrex** que Escritorio ejecuta directo en cada idioma — NO hace falta extraer/ver los textos (los nombres de marca no se traducen, son iguales en los 8 idiomas). El inglés ya lo tengo. Las capturas se reemplazan todas (8 × 3 formatos × EN, medidas ya conocidas). Entonces lo único genuinamente necesario:
> 1. **Gráfico de funciones (banner) actual** → Fernando lo manda (o dice si tiene texto "AUREX"). Es lo único que Code **regenera como imagen** en Cobrex (1024×500). No es find/replace.
> 2. **RevenueCat** → vistazo rápido: ¿algún display name visible dice "AUREX"? (sí/no). Los IDs/integración NO se tocan.
>
> Todo el resto (nombre, desc breve/completa, nombres+descripciones de suscripciones, URLs web/privacidad, email) = **find/replace AUREX→Cobrex / aurex.live→cobrex.io / support@cobrex.io**, ejecutado por Escritorio cuando arranque la FASE 4. No requiere relevamiento previo.

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

## 2. 📋 INVENTARIO COMPLETO DE METADATA — Play Console + RevenueCat (TODO campo)

> **Regla:** ningún campo queda sin relevar. Estado: ✅ = Escritorio ya lo pasó (CP1) · ⬜ = **FALTA que Escritorio releve y pase el valor actual** (obligatorio para ejecutar). **⚠️ El iOS Build 35 tuvo el bug "AUREX AI en 7 idiomas" justamente por NO relevar campo-por-campo y por-idioma → acá NO se repite.**

### A) Ficha de Play Store — **POR CADA IDIOMA** (confirmar las 8 localizaciones)
| Campo | Valor ACTUAL | Valor NUEVO | Quién | Estado |
|---|---|---|---|---|
| A1. Nombre app (≤30) | `AUREX` | `Cobrex` | Escritorio | ✅ (solo EN; ⬜ confirmar en los 8 idiomas) |
| A2. Desc breve (≤80) | "Real-time global markets tracker. 350 assets, 24 variables, 8 languages." | pulir opcional (no dice AUREX) | Escritorio | ✅ EN / ⬜ otros 7 idiomas |
| A3. Desc completa (≤4000) | "AUREX is the global markets terminal…" (+ "AUREX Pulse", motor, etc.) | reemplazar TODAS las menciones AUREX→Cobrex | Escritorio | ✅ EN / ⬜ otros 7 idiomas |
| A4. Novedades / "What's New" | ⬜ | copy real (la decide Fernando, Code NO inventa) | Fernando→Escritorio | ⬜ |

### B) Recursos gráficos
| Campo | Valor ACTUAL | Valor NUEVO | Quién | Estado |
|---|---|---|---|---|
| B1. Ícono (512²) | símbolo dorado sin texto | NO cambia | — | ✅ |
| B2. Gráfico de funciones (1024×500) | ⬜ **¿dice "AUREX"?** | si dice AUREX → regenerar Cobrex | Escritorio releva / Code-Fernando generan | ⬜ |
| B3. Capturas teléfono | ⬜ ¿cuáles? ¿muestran AUREX? ¿idiomas? | capturas Cobrex | Escritorio releva | ⬜ |
| B4/B5. Capturas tablet 7"/10" | ⬜ | Cobrex | Escritorio | ⬜ |
| B6. Video promo | ⬜ ¿existe? | — | Escritorio | ⬜ |

### C) Detalles de tienda / contacto
| Campo | Valor ACTUAL | Valor NUEVO | Quién | Estado |
|---|---|---|---|---|
| C1. Categoría | ⬜ | confirmar (igual) | Escritorio | ⬜ |
| C2. Etiquetas/tags | ⬜ | revisar si hay "AUREX" | Escritorio | ⬜ |
| C3. Email contacto | ⬜ | `support@cobrex.io` | Escritorio | ⬜ |
| C4. Teléfono | ⬜ | confirmar | Escritorio | ⬜ |
| C5. Sitio web | ⬜ (¿aurex.live?) | `cobrex.io` | Escritorio | ⬜ |
| C6. Política de privacidad (URL) | ⬜ (¿aurex.live?) | `cobrex.io/privacy.html` | Escritorio | ⬜ |

### D) ⚠️ Cuenta de desarrollador (lo que aparece DEBAJO del nombre)
| Campo | Valor ACTUAL | Valor NUEVO | Quién | Estado |
|---|---|---|---|---|
| D1. **Nombre del desarrollador** | **`AUREX AI`** (esto es lo que Fernando ve bajo el título) | 🔴 **DECISIÓN FERNANDO** → ¿`Cobrex`? ⚠️ afecta a TODA la cuenta (todas las apps del dev) + puede requerir revisión Google | Fernando decide / Escritorio aplica | 🔴 DECISIÓN PENDIENTE |
| D2. Email/sitio del dev | ⬜ | confirmar | Escritorio | ⬜ |

### E) Suscripciones / productos in-app
| Campo | Valor ACTUAL | Valor NUEVO | Quién | Estado |
|---|---|---|---|---|
| E1-E4. **Nombres visibles** 4 subs | "AUREX ELITE/PRO Anual/Mensual" | "Cobrex ELITE/PRO Anual/Mensual" | Escritorio | ✅ |
| E1-E4. **Descripciones** de cada sub | ⬜ **¿dicen AUREX?** | → Cobrex | Escritorio releva | ⬜ |
| E1-E4. Precios | PRO $9.99/$89.99 · ELITE $19.99/$179.99 | NO cambian | — | ✅ |
| E5. Product IDs | `com.fernandomoscon.aurex.{pro,elite}.{monthly,annual}` | **NO se tocan** (estructurales) | — | ✅ |
| E6. ¿Beneficios/features listados por plan? (por idioma) | ⬜ | revisar AUREX | Escritorio | ⬜ |
| E7. ¿Productos in-app NO-suscripción? | ⬜ confirmar si hay | — | Escritorio | ⬜ |

### F) RevenueCat
| Campo | Estado |
|---|---|
| Offering/packages Android + entitlements `pro`/`elite` | ✅ Escritorio confirma OK |
| Key Android existe/funciona | ✅ (sin pegar la key) |
| ¿Algún display name en RC dice "AUREX"? | ⬜ confirmar |

### G) Formularios/config de cuenta (confirmar que NO digan AUREX y NO se rompan)
| Campo | Estado |
|---|---|
| G1. Clasificación de contenido | ⬜ confirmar sin cambios |
| G2. Público objetivo | ⬜ |
| G3. Seguridad de datos (Data safety) | ⬜ confirmar |
| G4. Países/disponibilidad (¿175?) | ⬜ confirmar |

### 📨 PEDIDO COMPLETO A ESCRITORIO (CP1-bis — obligatorio antes de ejecutar)
> Escritorio: pasá **TODOS los campos ⬜** de arriba con su **valor actual exacto** y, donde aplique, **por cada uno de los 8 idiomas** (el bug de iOS fue por no mirar por-idioma). En especial: **D1 nombre del desarrollador**, **A1-A3 en los 8 idiomas**, **B2 gráfico de funciones**, **E1-E4 descripciones de suscripciones**, **C5/C6 URLs**. Con eso el inventario queda 100% y se puede ejecutar.

---

## 2-bis. 📱 TABLA DE COMPARACIÓN — PANTALLAS / SECTORES de la app (qué cambia en cada una)

> Qué ve el usuario en cada pantalla, hoy en Android vs cómo queda tras el rebrand. Para que Fernando revise pantalla por pantalla.

| Pantalla / sector | Android HOY | Tras rebrand | Origen del cambio |
|---|---|---|---|
| Splash nativo | logo viejo, bg crema/artefactos | logo Cobrex limpio, bg `#EEF1F7`, sin "INVEST AI", tagline | A6 (nativo) + Build 36 RN |
| Loading (SplashView RN) | "AUREX" | "COBREX" + constelación | A1 (BRAND_NAME) |
| Onboarding 1-4 | "AUREX" + (diseño viejo si quedaba) | "COBREX" + íconos 3D + constelación (Build 36 compartido) | A1 + código compartido |
| Login | header "AUREX" | "Cobrex" | A1 |
| Signup | header "AUREX" | "Cobrex" | A1 |
| Planes post-login | se auto-abre; **bug: sale a PRO/ELITE** | solo a FREE (fix RC entitlements) | 🔵 fix compartido |
| Portfolio (header) | "AUREX" + ⚖️ + timer | "Cobrex", **sin ⚖️ ni timer** | A1 + A3 |
| Mercados (header) | "AUREX" + ⚖️ + timer | "Cobrex", sin ⚖️/timer | A1 + A3 |
| Watchlist (header) | "AUREX" + ⚖️ + timer | "Cobrex", sin ⚖️/timer | A1 + A3 |
| IA (header) | "AUREX" + ⚖️ + timer | "Cobrex", sin ⚖️/timer | A1 + A3 |
| Alertas (header) | "AUREX" + ⚖️ + timer | "Cobrex", sin ⚖️/timer | A1 + A3 |
| Mis Alertas (header) | "AUREX" | "Cobrex" | A1 |
| Perfil | "AUREX v1.0.36" + balanza en header | "Cobrex v1.0.37" + **Aviso Legal/⚖️ queda en Perfil** + links privacy/terms → cobrex.io | A1 + A3 + A4 |
| Toolbar inferior (6 tabs) | labels cortadas en S24 | fontSize 8 (legible) | 🟠 bug S24 |
| Textos sueltos hardcodeados ES | aparecen en ES con idioma EN | a i18n (8 idiomas) | fix 1.h.1 |

> 👀 **Fernando: revisá pantalla por pantalla.** Si en alguna querías algo distinto, o falta algo, decímelo.

---

## 2-ter. 🌐 IDIOMAS + FORMATOS DE RECURSOS + MATRIZ DE TRADUCCIÓN (lo que faltaba)

### Idiomas cargados (8) — TODA la metadata textual va traducida en los 8
`en` (default) · `es` · `pt` · `it` · `fr` · `zh` · `hi` · `ar`.
**Regla dura:** CADA campo de texto que cambie (nombre, desc breve, desc completa, novedades, nombres y **descripciones** de las 4 suscripciones, beneficios por plan) debe quedar traducido y cargado **en los 8**. *(El bug de iOS Build 35 — "AUREX AI" en 7 idiomas — fue exactamente por no hacerlo por-idioma.)*
⬜ **Escritorio confirma:** ¿están los 8 idiomas cargados en Play Console hoy, o algunos faltan?

### Formatos de recursos gráficos — Google Play
> **DECISIÓN FERNANDO (29-may):** hoy hay capturas cargadas SOLO en **Teléfono + Tablet 10" + Tablet 7"**, y **solo en inglés (EN)**. **Se mantienen SOLO esos 3 formatos. NO se hace Android XR ni Chromebook** (Play Console los ofrece, pero no se usan). *(Corrección: Play Console SÍ tiene sección "Android XR" — no era confusión de Fernando.)*

| Recurso | Dimensión exacta | Formato | Peso máx | Cantidad | Acción |
|---|---|---|---|---|---|
| Ícono | **512×512** | PNG 32-bit | 1 MB | 1 | símbolo dorado, **NO cambia** |
| Gráfico de funciones (banner) | **1024×500** | PNG/JPG sin alpha | 1 MB | 1 | tiene "AUREX" → **Code regenera Cobrex** |
| Capturas **Teléfono** | recom. **1080×1920** | PNG/JPG | 8 MB c/u | 2-8 | ✅ cargadas (EN) → **nuevas del build Android** (FASE 3) |
| Capturas **Tablet 7"** | recom. **1200×1920** | PNG/JPG | 8 MB | hasta 8 | ✅ cargadas (EN) → nuevas del build Android |
| Capturas **Tablet 10"** | recom. **1600×2560** | PNG/JPG | 8 MB | hasta 8 | ✅ cargadas (EN) → nuevas del build Android |
| ~~Android XR~~ | — | — | — | — | ❌ **NO se usa** (decisión Fernando) |
| ~~Chromebook~~ | — | — | — | — | ❌ **NO se usa** (decisión Fernando) |
| Video promo | URL YouTube | — | — | 0-1 | ⬜ ¿hay? ¿menciona AUREX? (Escritorio confirma) |

**Resumen capturas a producir:** 3 formatos (Teléfono + Tablet 7" + Tablet 10") × **solo inglés**.

**Las 8 capturas (orden definido por Fernando — el límite de Play es 8):**
1. **Portfolio** (tab)
2. **Markets / Mercados** (tab)
3. **Watchlist** (tab)
4. **IA** (tab)
5. **Alerts / Alertas** (tab)
6. **Perfil** (tab)
7. **Idiomas** (selector de idioma)
8. **Crear alerta** (modal/pantalla)

→ **Workflow real (el de siempre, NO inventar otro):** Fernando saca **8 capturas del TELÉFONO** (del build Android en prueba interna, en inglés) y las deja en la carpeta. **Code las ADAPTA a los 3 formatos** (Teléfono 1080×1920 · Tablet 7" 1200×1920 · Tablet 10" 1600×2560) **reencuadrando/rellenando, SIN estirar ni deformar** = 24 archivos finales. **NO hace falta tablet:** Google valida dimensión+formato, no el dispositivo de origen. Es el mismo proceso que en iOS (capturas del iPhone → adaptadas a iPhone 6.5" + iPad 13").

### ⚠️ DATO DURO — el upload de imágenes fue un CAOS la vez anterior (se colgó el chat al manipular imágenes)
**Causa:** se intentaba recortar/redimensionar imágenes DENTRO del navegador. **Solución (regla para este rebrand):**
1. **Code prepara CADA imagen ya en su dimensión y peso EXACTOS** (PIL/sips, sin navegador/Chromium). Cero manipulación en Play Console.
2. **Carpeta única definida (Fernando, 29-may):** `Dropbox/AUREX/CAPTURAS PANTALLAS/ANDROID BUILD 37 MODO CLARO INGLES/` con subcarpetas: `_originales_telefono/` (Fernando deja acá las 8 del teléfono) · `telefono/` · `tablet7/` · `tablet10/` (Code deja las adaptadas) · `banner/` (Code deja el gráfico de funciones Cobrex). El ícono no cambia. Sin XR ni Chromebook.
3. **El upload lo hace FERNANDO directamente en Play Console** (no Escritorio): solo seleccionar los archivos ya listos y subir — sin tocar nada.
4. **Para que NO se cuelgue el chat (pasó la vez anterior):** Escritorio **NO manipula ni sube imágenes** (eso es lo que colgaba el navegador) → solo **mira y verifica** cada slot (imagen correcta, dimensión, sin "AUREX", idioma). El upload pesado lo hace Fernando en su navegador, **de a tandas chicas** (formato por formato), con archivos ya dimensionados (suben al instante, sin procesamiento).
5. Assets con marca "AUREX" (banner/gráfico de funciones, cualquier logo con texto) → **Code los regenera a Cobrex** desde el kit `Dropbox/AUREX/LOGO COBREX/`.

### 📸 CAPTURAS — origen, momento y quién (era un hueco del plan; resuelto)
**NO reusar las capturas de iOS.** Motivos: (a) dimensiones de iPhone/iPad no encajan en los formatos de Google Play (teléfono + tablet 7"/10"); (b) muestran barra de estado y marco de iOS → en la tienda Android se ve "raro" y Google puede objetarlo.
**Origen correcto: capturas NUEVAS del build de Android.**
**Momento: DESPUÉS de subir el build a PRUEBA INTERNA** (así son del build real ya rebrandeado, con frame y resolución Android correctos).
**Quién: Fernando saca las 8 del TELÉFONO** (no hace falta tablet) → **Code las adapta a los 3 formatos** (reencuadrar/rellenar, sin estirar). Mismo proceso de siempre (iOS = capturas del iPhone adaptadas).
**Idioma: solo inglés (default).** Google Play hace *fallback* al default para los demás idiomas → **NO hacen falta 8 sets por idioma**; se traducen solo los TEXTOS de la ficha.
**Flujo:** FASE 3 build → prueba interna → Fernando saca 8 capturas del teléfono (inglés) → **Code las adapta a Teléfono+Tablet7"+Tablet10"** → Fernando sube (FASE 4) → Escritorio verifica.

### 💡 Idea/mejora de Code (traducción) — para NO repetir el error del "What's New"
Los textos ya están traducidos profesionalmente en el código (`i18n.js`, 8 idiomas). Propongo: **Code arma los textos de metadata en los 8 idiomas tomándolos del i18n real** (no traducción manual de Escritorio — esa fue la causa del error "What's New" en iOS Build 36) → Escritorio los pega y verifica. **Excepción:** las "Novedades"/What's New las decide Fernando (regla dura, Code no inventa).

---

## 3. ROLES + CONTROL CRUZADO (sin cambios respecto al v1)

> ⚠️ **CÓMO se controla (regla de Fernando, 29-may):** el control NO es contestar solo lo que se pregunta. Code y Escritorio deben **evaluar de forma completa, integral y AUTÓNOMA**, **avisar cuando piensan distinto (con el porqué)** y **proponer mejores ideas**. **No queremos complacencia ni "sí a todo".** Un relevamiento parcial o un "ok a todo" NO es control válido.

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
| **Capturas: sacar 8 del TELÉFONO** (Portfolio/Markets/Watchlist/IA/Alertas/Perfil/Idiomas/Crear-alerta), en inglés | del build en prueba interna; dejarlas en `CAPTURAS PANTALLAS/ANDROID BUILD 37 MODO CLARO INGLES/_originales_telefono/` | Fernando | — |
| **Adaptar las 8 a los 3 formatos** (Teléfono+Tablet7"+Tablet10") sin estirar | PIL/sips, reencuadrar/rellenar → 24 archivos en sus subcarpetas | Code | Code (dimensiones) |

### FASE 4 — Metadata Play Console (Escritorio, sin build) — datos en §2
| Tarea | Hace | Controla |
|---|---|---|
| Nombre listing → Cobrex | Escritorio | Code (lectura) |
| Desc completa: reemplazar AUREX→Cobrex | Escritorio | Code |
| 4 suscripciones: nombres visibles → Cobrex | Escritorio | Code (valida IDs intactos) |
| Subir capturas Cobrex (las que tomó Fernando del Android en FASE 3, ya procesadas) | Escritorio | Fernando |
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

**Fin v2.** **AÚN NO EJECUTABLE.** Faltan 3 cosas antes de tocar código:
1. ⬜ **Escritorio** completa el inventario de metadata (todos los campos ⬜ de §2, por idioma) — CP1-bis.
2. 🔴 **Fernando** decide **D1** (nombre del desarrollador "AUREX AI" → ¿Cobrex? afecta toda la cuenta).
3. ✅/⬜ **Fernando** da el OK final al v2 completo.
Recién con eso → ejecutar FASE 1.
