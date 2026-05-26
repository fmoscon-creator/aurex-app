# 🌟 BRIEF MAESTRO AUREX — Estado vivo del proyecto

> **Archivo único de seguimiento.** Reemplaza los múltiples briefs sueltos. Se actualiza con cada hito.
> **NO bump de nombre** (sin `_v1`, `_17MAY`). La historia vive en `git log`.
> **Última actualización:** 25-may-2026 AR — **🟢 iOS Build 35 "COBREX" ENVIADO a revisión de Apple (25/05 14:02 AR · submission `e0e7fb35-11a4-4c1d-854c-60a80c4799e6` · "Pendiente de revisión")**. Rebrand **"AurexLive" → "Cobrex"** SOLO iOS (nombre original acuñado, sin relación con aurex.ai/Beinex), tras el 3er rechazo 4.1c. Build 35 = textos Cobrex en 8 idiomas + **splash nativo COBREX** + onboarding RN + `CFBundleDisplayName=Cobrex` (v35) + 20 capturas (iPhone 6.5" 1242×2688 + iPad 13" 2048×2732). Android 36 sigue "AUREX" en producción (intacto). Ver **§1.f**. ✅ **Formulario fiscal Play Console (W-8BEN) COMPLETADO y APROBADO 25-may** (válido hasta 2029; 30% solo sobre ingresos US-sourced, resto del mundo sin retención). ⚠️ **Google Search Console: error de indexación 404 (msg WNC-20237597)** en aurex.live — 🟡 **DIFERIDO hasta que Apple resuelva** (no tocar el sitio durante la revisión; análisis + opciones en §1.f).
> **22-may (previa):** **🟢 iOS Build 33 "AurexLive" ENVIADO a revisión de Apple (22/05 12:53 AR · submission `e0e7fb35` · estado "Pendiente de revisión")**. Estrategia: rebrand de grafía **"AUREX LIVE" (con espacio) → "AurexLive" (pegado)** SOLO en iOS + **reply de coexistencia** (AurexNova/AurexPro conviven; aurex.ai = Beinex GRC, otro rubro). Ver **§1.e** + **§2.4-septies/octies**. · PWA: "INVEST AI" eliminado + auditoría de paridad + GATING #1 en producción · Landing definitiva · Android Build 36 publicado (intacto como "AUREX").
> **24-may:** ✅ **IAP Android VALIDADO con compra REAL** (PRO Mensual USD 9.99 + cancelación, cuenta app.aurex — bug #76809 cerrado en producción). 🔴 **PENDIENTE: formulario fiscal EEUU W-8BEN — esta semana (máx 30-may)**, sino Google retiene 30% de los pagos. + Backend: auditoría/fix de fuentes y reportes health (§8.c). Ver **§3.6**.
> **Cierre de sesión 22-may (TARDE):** Ver **§1.e CIERRE 22-MAY (TARDE) — Build 33 ENVIADO**. Cierre madrugada (PWA): **§1.d**. Documentos: `briefs/PLAN_APPLE_AUREXLIVE_REPLY_22MAY.md` · `briefs/AUDITORIA_PARIDAD_CONSOLIDADO_22MAY.md` + carpeta `briefs/paridad_pwa_22may/`.
> **Última actualización significativa previa:** Ver **§1.c ACTUALIZACIÓN 21-MAY (TARDE)** (foto landing/SEO). Hitos: **LANDING cerrada para difusión** (4 fixes mobile + card "Analizamos/No operamos" con columna SÍ + SEO completo: favicon, robots, sitemap, noindex /app+privacy, fix noindex heredado, Google Search Console verificado + indexación solicitada) · **PLAN MKT DESBLOQUEADO** (landing live) · **PWA actualización URGENTE** (sacar "INVEST AI" + paridad Build 36) · Android Build 36 PUBLICADO + monetización PayPal mapeada · iOS Build 17 en revisión, Build 32 preparado.
> **URL canónica para Escritorio:** `https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/BRIEF_MAESTRO_AUREX.md`

---

## 0. CÓMO USAR ESTE BRIEF

- **Fernando + Escritorio** abren este archivo y saben el estado actual de TODOS los frentes.
- **Code** lo actualiza cada vez que cambia algo material — no cada hora, no cada commit menor.
- Para profundidad técnica de cada frente → ver §10 "Archivos de referencia" (briefs específicos detallados).
- Para historia de cambios al brief → `git log briefs/BRIEF_MAESTRO_AUREX.md`.

---

## 1. RESUMEN EJECUTIVO — todos los frentes en 1 tabla

| Frente | Estado | Próxima acción | Bloqueante externo |
|---|---|---|---|
| 🍎 **Apple iOS — Build 35 "Cobrex"** | 🟢 **ENVIADO a revisión Apple 25/05 14:02 AR** (submission `e0e7fb35-11a4-4c1d-854c-60a80c4799e6`, **"Pendiente de revisión"**). 3er rechazo 4.1c respondido con rebrand **"AurexLive" → "Cobrex"** SOLO iOS (nombre original acuñado, sin relación con aurex.ai/Beinex). Build 35 = textos Cobrex 8 idiomas + **splash nativo COBREX** (el logo nativo seguía diciendo "AUREX" → eso invalidó Build 34) + onboarding RN + detección idioma + `CFBundleDisplayName=Cobrex` v35 + 20 capturas (iPhone 6.5"+iPad 13"). Demo ELITE `demo@cobrex.io`. Ver §1.f | **Esperar respuesta Apple (24-48h)**. Verificar opción de publicación (manual vs automática). Si **aprueba** → evaluar coherencia de marca Android/web. Si **re-rechaza** → ver motivo | Apple (en review) |
| 🍎 **iOS Build 33 "AurexLive"** | ⚪ **SUPERADO por Build 35.** Quedó en revisión con `CFBundleDisplayName=AurexLive`; Build 35 lo reemplaza con "Cobrex". | — (histórico, ver §1.e) | — |
| 🍎 **iOS Build 32 (v1.0 · 32)** | ⚪ **SUPERADO por Build 33.** Quedó en TestFlight validado, pero con `CFBundleDisplayName="AUREX"`. Build 33 lo reemplaza con "AurexLive". | — (histórico) | — |
| 🤖 **Android Build 36 (v1.0.36)** | 🟢 **PUBLICADO en PRODUCCIÓN** + **IAP VALIDADO con compra REAL** (24-may: PRO Mensual USD 9.99 cobrado + cancelación, cuenta app.aurex). | ✅ **Formulario fiscal W-8BEN COMPLETADO y APROBADO (25-may, válido hasta 2029)** — 30% retención solo sobre ingresos US-sourced; resto del mundo sin retención (Argentina sin tratado). #90 (futuro): nombre cuenta dev + edge-to-edge | — |
| 🤖 **Android Build 33 producción** | 🟢 PUBLICADO Play Store (queda como producción hasta que 36 apruebe) | Será reemplazado por Build 36 | — |
| ✅ **IAP / RevenueCat #76809** | 🟢 **RESUELTO + VALIDADO EN PRODUCCIÓN REAL** (24-may: compra PRO Mensual USD 9.99 + cancelación, ambas OK en RevenueCat y en el dispositivo) | — (cerrado) | — |
| 🎨 **Landing aurex.live (index.html root)** | 🟢 **DEFINITIVA y lista para compartir** — 4 fixes mobile (Deslizá, MOTOR/PULSO video, footer) + card SÍ/NO rediseñado (8 idiomas) + **SEO completo** (favicon, robots, sitemap, noindex, fix noindex heredado, Search Console verificado) | **Barrido funcional pre-difusión** (newsletter/descargas/canales/cotizaciones) + copy a Build 36 (#86) | OK Fernando |
| 📋 **Plan MKT** | 🟡 **DESBLOQUEADO — clave arrancar** (landing ya live; cae el bloqueante) | Leer `MARKETING_CONTEXT_AUREX` → definir canales/piezas/calendario con Fernando | — |
| 🌐 **PWA aurex.live `/app/`** | 🟡 **Actualización URGENTE** — recibe tráfico desde la landing | Sacar "INVEST AI" (texto prohibido visible) + paridad Build 36 (push/telegram/alertas/UX planes) | — |
| ⚙️ **Backend Railway** | 🟢 OK (+ OPS-4 push iOS apns + monitor 24/7) | Sin acción inmediata | — |

---

## 1.f CIERRE 25-MAY-2026 — iOS Build 35 "Cobrex" ENVIADO A REVISIÓN

> Foto más reciente del frente iOS. Reemplaza a §1.e para lo de iOS.

### 🍎 iOS Build 35 "Cobrex" — ENVIADO A REVISIÓN APPLE (25/05 14:02 AR)
- **Por qué Cobrex:** Apple rechazó 3 veces ("Aurex"/"AurexLive", Guideline 4.1c Copycats, raíz "Aurex" = aurex.ai/Beinex). Plan B = renombrar la app iOS a **"Cobrex"** (nombre original acuñado, verificado limpio en USPTO/EUIPO/tiendas). SOLO iOS; Android sigue "AUREX". Bundle ID / IAP / RevenueCat / ícono NO cambian.
- **Build 34 quedó OBSOLETO:** cambió textos pero NO las imágenes con "AUREX" horneado (el **splash nativo** mostraba el logo con la palabra AUREX). Por eso se rehízo como Build 35.
- **Build 35 — lo hecho hoy:** textos Cobrex en 8 idiomas (brand.js, i18n) · **splash nativo regenerado a COBREX** (logo + fondo claro, reemplazando el que decía AUREX) · **onboarding portado a RN puro** (sin imágenes horneadas) + detección de idioma (EN default + idioma del device) · `CFBundleDisplayName=Cobrex`, `CURRENT_PROJECT_VERSION=35`, `MARKETING_VERSION=1.0`.
- **Compilación (brief §11 FLUJO):** clean (DerivedData + ios/build + Metro) → archive + export IPA por CLI → **IPA validado** en `~/AurexApp/backups/ipa/Build35/AurexApp.ipa` (única diff vs Build 34 = `CFBundleVersion` 34→35; DisplayName=Cobrex; signing `com.fernandomoscon.aurex`/TX7C2F79U9). ⚠️ **Aprendizaje:** NO usar `-derivedDataPath` propio ni build de simulador con Metro (trabó la Mac 3 veces hoy por sobrecarga RAM + procesos zombi); compilar SIEMPRE como el brief, carpeta por defecto, incremental sobre librerías cacheadas.
- **Subido a Transporter + 20 capturas:** 10 pantallas (6 tabs Portfolio/Mercados/Watchlist/IA/Alertas/Perfil + Planes/Alertas-indicadores/Idiomas/Crear-alerta) × iPhone 6.5" (1242×2688) + iPad 13" (2048×2732), modo claro EN, en `Dropbox/AUREX/CAPTURAS PANTALLAS/IOS BUILD 35 EN CLARO/` (carpetas JPG + PNG). ⚠️ Apple rebota archivos cuya extensión no coincide con el contenido (.png con datos JPEG): se subieron como **JPG real**.
- **ENVIADO a revisión 25/05 14:02** (submission `e0e7fb35-...`, "Pendiente de revisión"). Demo ELITE `demo@cobrex.io` / `Cobrex2026`. Privacy URL en Connect → `https://aurex.live/docs/privacy-cobrex.html`.
- **Próximo:** esperar respuesta Apple (24-48h). **Verificar opción de publicación** (manual vs automática). Si aprueba → evaluar coherencia de marca con Android/web. Si re-rechaza → ver motivo.

### 🤖 Android Build 36 (v1.0.36) — EN PRODUCCIÓN (intacto como "AUREX")
- Publicado en producción + IAP validado con compra real (PRO Mensual USD 9.99 + cancelación, cuenta app.aurex). NO se toca por el rebrand iOS.
- ✅ **Formulario fiscal W-8BEN COMPLETADO y APROBADO (25-may, vence 31-dic-2029).** Persona física · Argentina · CUIT 20234475577 · sin tratado (no se reclama reducción) · certificado de actividades fuera de EE.UU. · entrega sin papeles. Resultado: 30% de retención **solo** sobre ingresos US-sourced (ventas a usuarios de EE.UU. como regalías); el resto del mundo **sin retención**. Se eliminó el riesgo de retención sobre el total. Detalle del paso a paso del W-8BEN en memoria.

### ⚠️ Google Search Console — error de indexación 404 (25-may) — 🟡 DIFERIDO
- Mail **WNC-20237597**: páginas de **aurex.live** con motivo nuevo **"No se ha encontrado (404)"**.
- **Hallazgo (auditoría Code 25-may):** dan 404 → **`/v2.html`** (la landing VIEJA, ya borrada del repo; Google la indexó cuando era la versión activa) y **`/terms.html`** (raíz: existe `/privacy.html` en raíz pero NO `/terms.html` → asimetría; los términos buenos están en `/docs/terms.html`). La landing actual **NO enlaza a ninguna** → no rompe nada visible; el aviso es **informativo, no crítico**.
- **🟡 DIFERIDO hasta que Apple resuelva Build 35** (decisión Code + Escritorio 25-may): **NO tocar el sitio durante la revisión de Apple** — si algo se rompe y el reviewer visita aurex.live = problema innecesario. El aviso no afecta la revisión.
- **Opciones para cuando se retome:**
  - **(A) Camino limpio, sin infra (recomendado):** dejar el 404 (es la respuesta HTTP correcta para una página borrada) + usar **"Eliminaciones" en Search Console** para que Google la dropee + **borrar archivos viejos del repo** que siguen vivos (`index_old_20may.html`, `/landing-v3-preview/v2.html`, `Aurex — Sistema de Identidad Visual v1.0.html`, y el duplicado `/privacy.html` de la raíz —tras chequear qué lo referencia: apps/Play Console). Canonical de legales = `/docs/`.
  - **(B) 301 real (ideal SEO, más trabajo):** poner **Cloudflare adelante del dominio** (gratis) y configurar redirects 301 reales. ⚠️ GitHub Pages NO hace 301 de servidor; el redirect meta-refresh es un parche → descartado.

### 📧 Mail corporativo @aurex.live — PENDIENTE (independiente de Apple, se puede hacer YA)
- **Gap (Fernando, 25-may):** tiene el dominio **aurex.live** (Namecheap) pero **nunca se configuró el email del dominio** (`hola@aurex.live`, `soporte@aurex.live`…) → viene usando cuentas **Gmail "inventadas"** (fmoscon / app.aurex / support.aurex.live@gmail.com / aurextester12).
- **Cómo se hace (Escritorio):** conectar el dominio a un proveedor de email + agregar **3 registros DNS en Namecheap** (~5 min). Opciones:
  - **Google Workspace** (~USD 6/mes por cuenta) — Gmail con tu dominio; lo más profesional y lo que más conoce Fernando.
  - **Zoho Mail** (gratis hasta 5 cuentas) — para arrancar sin gastar.
  - **Namecheap Private Email** (~USD 1/mes) — básico pero suficiente.
- **Proceso:** 1) contratar el servicio · 2) Code guía los 3 registros DNS en Namecheap · 3) listo, mails `@aurex.live`.
- **No depende de Apple ni de Cobrex.** Se hace hoy con aurex.live; cuando exista `cobrex.io` se repite en 5 min. Recomendación para arrancar barato: **Zoho (gratis)** o **Google Workspace** si quiere Gmail nativo — decisión de Fernando.

### 🏷️ Cobrex — Plan de reservas de marca (FASE 2 · CONTINGENTE a aprobación Apple · NO ejecutar antes)
- **Regla (Code + Escritorio):** NO registrar handles/dominios/cuentas "Cobrex" hasta que Apple apruebe. Motivos: si re-rechaza, todo lo reservado queda inútil/genera trabajo de reversa; y registrar `@cobrex` público **filtra el nombre** antes de tiempo.
- **Lo que SÍ se prepara ahora:** el **listado completo** de qué reservar (6 redes/canales + handles exactos + display names + dominios `.io`/`.live` + mails) listo para ejecutar en **~15 min** el día del OK de Apple. (Listado lo está armando **Escritorio** → integrar acá cuando llegue.)
- **Verificación de disponibilidad de handles:** requiere navegar cada red → se hace **el día de la aprobación** (chequear + registrar todo junto), NO antes. Necesita autorización de Fernando llegado el momento.

---

## 1.b ACTUALIZACIÓN 18-20 MAY 2026 — foto actual (consolidada)

> Esta sección es la **foto al 20-may**. El detalle histórico (Build 25, IAP esperando RC, etc.) en §2-§4 quedó superado por lo de acá.

### 🍎 iOS
- **Build 17 (v1.0.17):** sin novedad — sigue esperando que Apple responda a la respuesta que dimos al rechazo de marca (Guideline 4.1c, "AUREX AI"→"AUREX LIVE"). Manual Release OFF.
- **Build 32 (v1.0 · 32) PREPARADO:** IPA exportado en `~/AurexApp/backups/ipa/Build32/AurexApp.ipa` (42MB, 20-may 01:37). `CURRENT_PROJECT_VERSION=32`, `MARKETING_VERSION=1.0`. Incluye el **fix del modal "Crear Alerta"** (falló en 4 builds 28-31; resuelto recién al validar en el **simulador de Xcode** antes de compilar — `KeyboardAvoidingView behavior='padding'` + overlay centrado) + fixes UX alertas (precio_base, preview, leyenda, verde/rojo) + RC iOS API key. **Queda listo para subir a Transporter/TestFlight EN CUANTO Apple responda el Build 17.**

### 🤖 Android
- **Build 36 (v1.0.36):** compilado (`versionCode 36` / `versionName "1.0.36"`), **enviado a revisión de Google → Producción**. Pendiente aprobación; luego subir a track Alpha (tarea #62).
- **IAP RevenueCat #76809 RESUELTO:** el bug "producto no disponible" se resolvió con **rebuild limpio (`./gradlew clean` antes de `bundleRelease`)** + fixes de higiene en Build 36. (Detalle y aclaración del post-mortem en memoria `feedback_iap_bug_resuelto_18may`.)

### ⚙️ Backend / Infra
- **OPS-4:** se agregó bloque `apns` a `sendPushFCM` en `server.js` → push iOS visible con app cerrada funcionando. Deployado en Railway (commit `242246f`).
- **Monitor 24/7:** GitHub Action (cron */5) que pinguea el backend y avisa por Telegram si cae. Verificado funcionando.
- **Acceso Railway:** por **Project Token** (archivo local SECRET, `--service aurex-app`), no OAuth. Incidente de seguridad (un token quedó commiteado al repo por error) **resuelto**: token revocado + history limpiado con force push.

### 🎨 Landing — trabajo de HOY (20-may)
- Exploración/descarga de **videos stock** (Mixkit + Pexels) para fondos del hero: operadores/pantallas de bolsa, globos, oro, mercados. Fernando filtró por color en Finder y quedaron sus elegidos.
- **Mockup `aurex_hero_VIDEO.html`** (en `~/Desktop/CODE/AurexApp/mockups/landing_v4_videos/`): copia de la v2.html real con video de fondo EN MOVIMIENTO + panel de controles en vivo (5 videos: GOLD partículas/GOLD stardust/GLOBO/PLANETA/MERCADOS · color líneas Original/Dorado/Blanco · encuadre Llenar/Completo · velocidad/opacidad/oscurecer · resumen numérico · panel movible/minimizable).
- **Decisión pendiente (#85):** casi seguro va el **GLOBO**; dorado vs blanco se define con la familia. Encuadre final = LLENAR (cover).
- **Bug agendado (#84):** en mobile, refresh salta a la sección "Cómo nos comparamos" (benchmark) en vez del header (sospechoso: `scrollIntoView` de planes / restauración de scroll).

### 🆕 NUEVO TEMA PRIORITARIO (#86)
**Actualizar la WEB (landing aurex.live) a las funciones y el estado reales de Build 32 iOS + Build 36 Android.** Las apps ya tienen features que la landing puede no reflejar (push notifications, alertas Telegram, modal de alertas, UX de planes, etc.). Alinear copy, capturas y claims de la web con lo que las apps efectivamente hacen hoy. Prioritario apenas se cierre la iteración visual de fondos.

---

## 1.c ACTUALIZACIÓN 21-MAY (TARDE) — LANDING DEFINITIVA + SEO/GOOGLE + frentes

> **Foto más reciente.** La landing quedó **lista para compartir** (`https://aurex.live`). Esto reemplaza a §1.b para lo de landing/SEO.

### 🎨 LANDING aurex.live — cerrada para difusión
Hecho hoy (todo en producción, verificado en vivo con curl + capturas):
- **Mobile (4 fixes que faltaban):** indicador **"Deslizá →"** en Comparativa y Planes · **MOTOR** con video de fondo visible (aire lateral + gap + cards translúcidas) · **PULSO** abierto en cards separadas estilo ALERTAS (video entre medio y laterales) · **FOOTER** con textura dorada al 100% del sector. Todo en media queries mobile; desktop intacto.
- **Card "Analizamos. No operamos."** rediseñado por feedback de la gente: 2 columnas **SÍ (lo que hacemos, dorado) | NO (lo que no, gris tenue)**, **cruz roja eliminada**, íconos SVG de línea fina (sin emojis), 9 claves i18n nuevas (`b11_yes_*`, `b11_no_head`) en los **8 idiomas**.
- **SEO / Google (faltaba por completo — lo detectó Fernando al buscarse):**
  - **Favicon** = logo AUREX (fondo negro + "AUREX"): `favicon.ico` multi-res en raíz + PNG 32/96 + apple-touch 180.
  - `robots.txt` + `sitemap.xml` (la landing como resultado principal).
  - **`noindex`** en `/app` (login) y en las 3 privacy → dejan de salir como links sueltos confusos en Google.
  - **🔴 Fix crítico:** la landing arrastraba `<meta robots noindex,nofollow>` del borrador → corregido a `index,follow`. **Sin esto Google nunca la iba a mostrar** aunque se compartiera.
  - **Google Search Console** dado de alta y **verificado** (meta-tag en index.html) + sitemap enviado + **indexación solicitada** (cola prioritaria). *(Confirmar con Fernando con qué cuenta Google quedó.)* Reflejo en el buscador: **horas a días**.

**Pendientes Landing / próximos pasos (en orden):**
1. **Barrido funcional pre-difusión (lo más importante):** ¿el **newsletter** guarda el mail (Formspree)? · **botones de descarga** (App Store iOS aún en revisión → ver qué hace el link; Google Play OK; Web App) · **links de canales** (Telegram/X/IG/TikTok/YT/LinkedIn) que existan y abran · **cotizaciones en vivo** (banner + Pulso) que carguen datos reales.
2. **OG/preview al compartir** por WhatsApp (imagen + título) — verificar que se vea bien.
3. **Copy a estado Build 36** (#86): alinear claims/capturas con lo que las apps hacen hoy.
4. Menores: Boldonse en títulos (#44, Fernando lo siente informal) · videos/efectos por sección (#88).

### 📋 PLAN MKT — DESBLOQUEADO, clave arrancar (Fernando: "ya es clave empezar")
La landing ya está **live y compartible** → cae el bloqueante de "esperar landing". **Es el momento de arrancar el Plan MKT.** Antes de invocar marketing-skills, leer `MARKETING_CONTEXT_AUREX` (Dropbox/AUREX/MARKETING). A definir con Fernando: canales prioritarios, primeras piezas, calendario. Frente nuevo, prioritario.

### 🌐 PWA `/app/` — ACTUALIZACIÓN URGENTE (clave, hacerla rápido)
Ahora que la landing manda tráfico a la PWA, actualizarla es prioritario:
- **Sacar "INVEST AI"** de la pantalla de login (texto de marca prohibido; lo levantó Google como descripción).
- **Paridad con Android nativo Build 36** (gap acumulado): push, alertas Telegram, modal de alertas, UX de planes, "Cómo usar AUREX".
- Que la PWA refleje el estado real de las apps, no una versión vieja.

### 🤖 ANDROID — Build 36 PUBLICADO en producción
- **v1.0.36 en producción** (21/05 7:29 AM, "Disponible en Google Play"). Incluye fix IAP #76809.
- **Monetización (informe Escritorio 21/05):** Google cobra → retiene ~15% → deposita en PayPal AUREX → retiro manual a Santander cta. cte. term. **3568** (1-5 días, USD→ARS). Detalle en `~/Dropbox/AUREX/MAPA DE TRABAJO/DOC_MONETIZACION_ANDROID_PAYPAL.md`.
- **Pendiente clave:** validar **compra IAP real** en v1.0.36 (cuenta real, refund 48h Play Console). Fernando gestionando TC + autorización del banco.
- Futuro (#90): nombre cuenta dev "AUREX AI"→"AUREX LIVE" + fix edge-to-edge.

### 🍎 iOS — Build 17 EN REVISIÓN activa
- Build 17 (v1.0.17) **en revisión** de Apple (resubmit del 21/05 que había estado 6 días colgado, ya destrabado). Manual Release ON.
- Build 32 (v1.0·32) **preparado** (IPA exportado) → subir a TestFlight apenas Apple responda el Build 17.

---

## 1.d CIERRE 22-MAY (madrugada AR) — PWA: limpieza + auditoría paridad + gating #1

> Sesión sobre la **app web (PWA, `/app/`)**. Continúa **mañana 22-may 9am AR**.

**✅ Hecho hoy (en producción salvo donde se indica):**
- **"INVEST AI" eliminado** de la PWA (splash + login) → "TERMINAL DE MERCADOS" (era texto de marca prohibido que Google levantaba).
- **Arranque en tema OSCURO** por defecto (coherencia con landing + capturas). ⏳ Validar propagación de cache (mi última captura aún daba claro; el usuario igual puede elegir en Perfil). Pendiente #91.
- **AUDITORÍA DE PARIDAD PWA vs app nativa (6 tabs)** — consenso Code+Escritorio, ambos con código real a la vista:
  - Consolidado: `briefs/AUDITORIA_PARIDAD_CONSOLIDADO_22MAY.md`
  - Capturas (18: nativas + PWA + comparaciones) + código nativa + código PWA dividido: `briefs/paridad_pwa_22may/`
  - Evidencia gating: `briefs/paridad_pwa_22may/EVIDENCIA_CODIGO_PWA_GATING.md`
- **🔴 Gating #1 HECHO y verificado EN PRODUCCIÓN:** Portfolio (FREE máx 5) + Watchlist (FREE máx 10) — `_openAddActivoModal` y `wlCreateList` ahora llaman `checkPlanLimit`/`showPaywall`. Antes un FREE no tenía tope. Commit `bf3bac7`.

**📌 Hallazgo central:** la PWA tenía TODA la infra de gating (`PLAN_LIMITS_CLIENT`, `checkPlanLimit`, `showPaywall`) pero llamada **0 veces**. El arreglo es **cablear, no construir**.

**🌅 PRÓXIMO (mañana 9am AR), en orden:**
1. **Gating Alertas por tipo (#2)** — toggles PRO/ELITE bloqueados para FREE (lock + `calculateAlerts`).
2. Límite 3 señales/día IA + Pulse detalle FREE (#3).
3. **"Cómo usar AUREX"** en Perfil (#4, falta en la PWA — reusar i18n `cu_*`).
4. Telegram conectar + Mis Alertas historial + umbrales editables (#5).
5. Menores + imágenes onboarding (#6).
Detalle completo en `AUDITORIA_PARIDAD_CONSOLIDADO_22MAY.md` §ESTADO DE EJECUCIÓN.

---

## 1.e CIERRE 22-MAY (TARDE) — 🍎 iOS Build 33 "AurexLive" ENVIADO a revisión de Apple

> **Hito del día.** Tras dos rechazos por Guideline 4.1(c) Copycats, se envió a Apple la versión **1.0 (33) "AurexLive"**. Cualquier chat nuevo: esto es lo último que pasó en iOS.

### ✅ RESULTADO
- **ENVIADO a revisión: 22-may-2026, 12:53 AR.**
- **Submission ID:** `e0e7fb35-11a4-4c1d-854c-60a80c4799e6`.
- **Estado:** "Pendiente de revisión" (en cola de Apple).
- **Publicación:** **MANUAL** (si Apple aprueba, NO se publica solo; lo decide Fernando).
- Las **4 suscripciones** (grupo AUREX PLANES, ID 22018005) van **en cola con la versión** ("Pendiente de revisión").

### 🎯 LA ESTRATEGIA (por qué "AurexLive")
El 2° rechazo (22/05) ya no objetaba la palabra "AI" sino la **raíz "AUREX"**, citando a **www.aurex.ai = Beinex Consulting** (developer real con app GRC empresarial en el App Store). El argumento "dominio propio aurex.live + AUREX LIVE" del 1er intento **no alcanzó**. Verificamos vía iTunes API que **conviven varias "Aurex" aprobadas** (AurexNova/Finance, AurexPro/Business) usando **raíz + sufijo pegado**. → Jugada elegida (consenso Code+Escritorio, OK Fernando):
1. **Rebrand de grafía SOLO en iOS:** "AUREX LIVE" (con espacio) → **"AurexLive"** (pegado, una palabra, como las que Apple SÍ aprueba). NO es rebrand de identidad.
2. **Reply de coexistencia fáctica** (en inglés): cita AurexNova (Apple ID 6771328873, Finance) + AurexPro (Business) como precedentes; aurex.ai = Beinex GRC empresarial vs AurexLive = mercados consumer (rubros distintos, sin confusión); marca derivada del dominio propio aurex.live (Namecheap, 3-abr-2026). **SIN reclamar trademark** (no hay) y **SIN pedirle documentación a Apple**.
3. **Android NO se toca** (queda como "AUREX", publicado y aprobado por Google — el conflicto es solo de Apple).

### 🛠️ QUÉ SE HIZO HOY (ejecución)
- **Build 33 compilado limpio** (rm DerivedData + ios/build + Metro + `pod install`) → IPA validado (CFBundleDisplayName=AurexLive, CFBundleVersion=33, ShortVersion=1.0, signing `com.fernandomoscon.aurex`/TX7C2F79U9) → **subido a TestFlight** (Transporter, ícono dorado OK).
- **Metadata App Store Connect → "AurexLive"**: App Name, Descripción (7 ocurrencias incl. "AurexLive Pulse/engine"), grupo de suscripciones ("Nombre de la app" = AurexLive), Privacy Policy URL → `aurex.live/docs/privacy-ios.html`.
- **`docs/privacy-ios.html` + `docs/terms-ios.html`** en repo landing = copia EXACTA de las Android + solo "AUREX"→"AurexLive" (CSS original, sin tocar las de Android).
- **Reply de coexistencia** pegada y **enviada en el hilo** de revisión + **PDF Namecheap** adjunto en App Review Information.
- **Manual Release OFF.**

### 🧩 OBSTÁCULOS DEL DÍA (resueltos) — para no repetirlos
1. **"Fondo blanco" en las páginas legales (Safari):** NO era el código — era el **Modo Lector (Reader) de Safari** auto-activado para aurex.live (botón "Resumir" lo delataba). Se resolvió desactivando *Safari → Ajustes → Sitios web → Lector → aurex.live → Desactivado*. El CSS estuvo siempre bien. (Code perdió tiempo tocando CSS + tocó sin querer las páginas de Android → revertido; lección: **diagnosticar antes de editar, no tocar lo no pedido**.)
2. **"Se ha producido un error inesperado al enviar a revisión":** era un **glitch temporal del servidor de Apple**, NO las suscripciones. **Se destrabó solo** al rato (el 2° aviso de error desapareció). Las 4 suscripciones estaban OK (en cola, con captura; la sección "Compras dentro de la app y suscripciones" no aparece en la página de versión justamente porque ya están adjuntadas/en cola).
3. **El campo "Notas" (Review Notes) de la VERSIÓN tenía el texto VIEJO** ("AUREX LIVE" separado + nombre previo "AUREX AI", sin coexistencia) — distinto del reply correcto del hilo. Lo detectó **Fernando**. Se reemplazó por el texto bueno (mismo del hilo) + Guardar.
4. **El re-envío tras rechazo es de 2 PASOS** (dato clave para el futuro):
   - **Paso A — "Actualizar revisión"** (botón azul en la página de la VERSIÓN): guarda y deja el elemento en **"Listo para revisión"**. NO es el envío final.
   - **Paso B — "Volver a enviar a revisión de apps"** (botón azul en la página del ENVÍO/submission): **este es el envío final real**. Antes estaba gris (elemento "Rechazado"); se habilitó al quedar "Listo para revisión".
   - **El clic final (Paso B) lo dio FERNANDO**, no Escritorio (regla reforzada abajo).

### 📌 REGLA REFORZADA (incidente del día)
**El botón que ENVÍA a Apple a revisión lo aprieta ÚNICAMENTE Fernando**, tras revisión conjunta con Code. Escritorio deja todo preparado y avisa, pero **NO toca ese botón** (hoy lo apretó sin OK y, aunque el glitch lo frenó, no debía). Ver [[feedback_escritorio_no_actua_solo]].

### 🌅 PRÓXIMO (iOS)
- **Esperar respuesta de Apple** (típico 24-48h). Llega al hilo de mensajes + mail. NO tocar "Cancelar envío".
- Si **aprueba "AurexLive"** → recién ahí se evalúa el **rebrand de coherencia total** (Android + web + headers internos compartidos), ver §3.5 + §2.4-quinquies(D).
- Si **re-rechaza** con el mismo boilerplate → escalar a **App Review Board** (con el historial de coexistencia ya documentado) y/o rebrand de los frentes que dejamos sin tocar (headers internos 8 pantallas, onboarding, capturas).
- **Frentes que se dejaron SIN tocar a propósito** (no fueron objetados en ningún rechazo; alto costo manual): imágenes de **Onboarding** con "AUREX" incrustado + las **10 capturas** de la ficha (las saca Fernando del iPhone). Se rehacen SOLO si Apple los objeta.

---

## 2. APPLE iOS — Build 17

### 2.1 Datos clave

| Campo | Valor |
|---|---|
| Versión | 1.0 (17) |
| Bundle ID | `com.fernandomoscon.aurex` |
| Apple Team ID | `TX7C2F79U9` |
| Submission ID activo | `e0e7fb35-11a4-4c1d-854c-60a80c4799e6` |
| Manual Release | **OFF** (no se distribuye si Apple aprueba) |
| Cuenta demo reviewer | `app.aurex@gmail.com` / `AurexTest2026!` |

### 2.2 Cronología

| Fecha (AR) | Evento |
|---|---|
| 24-abr-2026 05:24 | Submit original Build 17 |
| 15-may 18:31 | **Apple RECHAZÓ (1°)** — Guideline 4.1(c) Copycats — nombre "AUREX AI" confundible con `aurex.ai` |
| 16-may 02:00 | Fernando aprobó Opción D-modificada (cambio "AUREX AI" → "AUREX LIVE" + Manual Release OFF) |
| 16-may PM | Escritorio aplicó cambios 12 superficies App Store Connect, subió PDF Namecheap, pegó reply argumentada |
| 16-may 03:30 AR | (Se creyó "Re-submission enviada" — INCORRECTO; ver `INFORME_ESTADO_REAL_APPLE_BUILD17_21MAY.md`: nunca se reenvió, quedó 6 días colgado) |
| **21-may 01:17-01:19 AR** | **RESUBMIT REAL** (Escritorio): respuesta enviada en el hilo + reenvío a revisión. **Argumento usado:** marca propia "AUREX LIVE" derivada del **dominio aurex.live** (Namecheap order #198745654, registrado 3-abr-2026, registrante Fernando Gabriel Moscón) + PDF de compra adjunto + "no affiliation con aurex.ai" + búsqueda USPTO: **no hay trademark "AUREX" registrado** en software/apps/finanzas. Texto completo en `INFORME_ESTADO_REAL_APPLE_BUILD17_21MAY.md` §5. Estado → "Pendiente de revisión". |
| **22-may (revisado en iPhone 17 Pro Max)** | 🔴 **Apple RE-RECHAZÓ (2°)** — **Guideline 4.1(c) Copycats OTRA VEZ**: "the app's name contains an icon, brand, or product name that belongs to the following developer: **www.aurex.ai**". Apple ofrece 2 vías: (a) revisar metadata para remover la marca de terceros, o (b) si el developer (aurex.ai) lo aprobó, adjuntar evidencia documental. **CLAVE: el argumento "dominio propio aurex.live" + nombre "AUREX LIVE" NO le alcanzó a Apple. El conflicto ya no es la palabra "AI" — es la RAÍZ "AUREX" misma.** |

### 2.3 Inventario 12 superficies App Store Connect (status post-cambios)

| # | Superficie | Cambio aplicado |
|---|---|---|
| 1 | App Name | ✅ AUREX AI → **AUREX LIVE** |
| 3 | Description | ✅ "AUREX AI engine" → "AUREX engine" |
| 8 | IAP Grupo "Nombre app" | ✅ AUREX AI → **AUREX LIVE** |
| 11 | App Review Notes | ✅ Reply argumentada + adjunto Namecheap (Order #198745654) |
| 2, 4, 5, 6, 7, 9, 10, 12 | Otras superficies | OK sin cambio o verificación visual hecha |

### 2.4 Pendientes Apple

> ⚠️ DESACTUALIZADO por el 2° rechazo del 22/05 — ver §2.4-bis.

1. ~~Esperar respuesta Apple~~ → ya respondió: RE-RECHAZÓ (22/05).
2. Si aprueba → NO distribuir (Manual Release). N/A por ahora.
3. **Rechazó otra vez → análisis cruzado Code + Escritorio + Fernando (§2.4-bis).**

### 2.4-bis 🔴 ANÁLISIS DEL 2° RECHAZO (22-may) — qué cambió y qué caminos quedan

**Hecho:** Apple respondió al resubmit del 21/05 (donde argumentamos derecho propio vía **dominio aurex.live** + PDF Namecheap + USPTO sin trademark) y **volvió a rechazar — Guideline 4.1(c) Copycats**, esta vez nombrando explícitamente al developer **www.aurex.ai** como dueño de la marca.

**Lectura:**
- aurex.ai es una **empresa real y distinta** (verificado por curl: *"Aurex.ai | Intelligent GRC, Audit & Analytics Platform"*, HTTP 200 — software empresarial de auditoría/compliance con IA; otro rubro que el nuestro de mercados/inversión).
- El **camino que ya intentamos falló**: probar propiedad del *dominio* aurex.live + cambiar "AUREX AI"→"AUREX LIVE" **NO le alcanza a Apple**. Para Apple, tener un dominio ≠ tener derecho de marca, y le da prioridad a aurex.ai como brand owner.
- El conflicto **ya no es la palabra "AI"** (eso se cambió con éxito conceptual) sino la **raíz "AUREX"** en sí.

**Caminos reales que QUEDAN (a decidir con Fernando + Escritorio — NO improvisar el reply):**
1. **Carta de no-objeción de aurex.ai** — es la vía que Apple ofrece textualmente ("if you've been authorized... attach documentary evidence"). Depende de que aurex.ai acceda.
2. **Diferenciar el nombre de forma más fuerte** — no "AUREX" a secas ni "AUREX LIVE" (ya rechazado), sino algo claramente propio. Riesgo: implica re-trabajar marca en toda la app/stores.
3. **Registrar el trademark "AUREX"** en la clase fintech/software — derecho fuerte pero lento (meses) y con costo; no destraba YA.
4. **Apelar al App Review Board** argumentando coexistencia legítima (rubros/clases distintos: ellos GRC/audit, nosotros mercados/inversión consumer). Ya dijimos "no affiliation" y no alcanzó, pero una apelación formal es otro canal.

**Pendiente de Fernando (dato que define el camino):** ¿hay algún derecho de marca documentable más allá del dominio (registro en curso, uso comercial anterior, etc.)? El USPTO ya nos dio que NO hay trademark "AUREX" registrado por nadie en software/apps/finanzas — eso no nos da derecho pero tampoco se lo da formalmente a aurex.ai en USPTO.

### 2.4-ter 🔎 HALLAZGO 22/05 — qué hay realmente en el App Store (verificado por Code vía iTunes Search API)

**Quién es aurex.ai:** = **Beinex Consulting Private Limited**. **TIENEN app publicada en el App Store: "Aurex: AI GRC & Analytics"** (categoría Business; auditoría/compliance/GRC empresarial). También "Aurex - ATDD" (mismo developer). → **Por esto el argumento "dominio aurex.live" no alcanzó:** enfrente NO hay un sitio web cualquiera, hay un **developer de Apple con marca + app activa**. Apple protege a ese developer. Apelar diciendo "no hay base" NO sirve: la base existe.

**Munición a favor (coexistencia REAL, no teórica):** en el App Store conviven HOY varias "Aurex": **AurexNova (Finance)**, AurexPro (Business), AureX: Security App, Aurex (Health & Fitness), Aurex Digital Technology (2 apps). **Apple permite coexistencia de la raíz "Aurex" cuando va pegada a un distintivo** (AurexNova, AurexPro). Patrón observado: las que conviven usan **raíz + sufijo pegado**; "AUREX LIVE" deja **"AUREX" como palabra suelta = idéntica a la marca de Beinex** → probable razón de que a nosotros sí nos frene.

**Implicancia estratégica:** (a) defender con el dominio = repetir lo que ya falló; (b) el ángulo nuevo defendible es **coexistencia fáctica + rubro distinto** (ellos GRC empresarial / nosotros mercados consumer) + ninguno con trademark; (c) salida segura = nombre con raíz distintiva al estilo de las que SÍ pasan, pesando la consistencia con **Android (ya publicado como AUREX y aprobado por Google — el conflicto es SOLO de Apple)**. Recordar §2.6: Build 17 NO va a producción → no quemar la cuenta a reply tras reply; resolver la marca de fondo ANTES de Build 25.

### 2.4-quater ✅ DATOS VERIFICADOS para la reply + plan de nombre (22/05, Code vía iTunes Lookup/Search API)

**Decisión de marca (a confirmar Fernando):** App Store name **"AUREX LIVE" (con espacio) → "AurexLive" (pegado)**, replicando el patrón de las apps "Aurex+sufijo" que Apple SÍ aprueba. Pegado + reply de coexistencia es la jugada de mayor probabilidad y **no requiere documentación legal** (clave: no hay trademark ni empresa constituida — eso NO se escribe acá, ver memoria local privada).

**Precedentes a citar en la reply (verificados activos HOY, con nombre/categoría/fecha exactos):**
- **AurexNova** — developer *Delfina Pazia* — categoría **Finance** (mismo rubro nuestro) — App Store `id6771328873` — última versión publicada **20-may-2026** (2 días antes del rechazo). *El precedente más fuerte: Apple aprobó una "Aurex+sufijo" en Finance esta misma semana.*
- **AurexPro** — developer *AUREXPRO LLC* — categoría **Business** — **v6.27** (app madura, desde antes de ene-2026). *Precedente establecido/de larga data.*
- Contraparte: **"Aurex: AI GRC & Analytics"** — *Beinex Consulting Private Limited* — Business/GRC — v4.2.5 (rel 10-abr-2026). Es el developer que Apple protege; usa "Aurex" como **palabra suelta** → "AurexLive" es MÁS distintivo que su propio nombre.

**NO hacer (corregido en consenso):** NO pedirle a Apple "qué documentación adicional necesitan" — si piden titularidad legal no hay nada que entregar, empeora el caso.

**Pendiente al confirmar Fernando:** (1) texto exacto de la reply (coexistencia: citar AurexNova/Finance + AurexPro/Business con datos de arriba + rubro distinto); (2) plan de cambio "AurexLive" en las 12 superficies de App Store Connect; (3) consistencia futura del display name en `ios/AurexApp/Info.plist` para Build 25.

### 2.4-quinquies 🔬 HALLAZGOS 22/05 (Code, verificado en código + íconos reales) — 3 puntos que ni el plan inicial ni Escritorio cubrían

**(A) ÍCONO — RESUELTO (Code + Escritorio coinciden). La confusión era que mirábamos builds distintos:**
- **Build 17** (el que Apple revisó y RECHAZÓ): ícono **CON** texto "AUREX" debajo de la "A". El **header de App Store Connect muestra el ícono del Build 17** → por eso Escritorio veía texto.
- **Build 32** (en TestFlight, validado): ícono **SIN** texto — solo la "A" dorada + círculos sobre negro. Verificado por **Escritorio en TestFlight** + por **Code** (repo `icon-1024.png` 12-abr, comprobado con brillo amplificado: solo círculos, sin texto; coincide con el ícono compilado en el IPA de Build 32).
- Comparado con el ícono de Beinex (cinta azul-cyan sobre navy) → opuestos, cero confusión visual.
- **Conclusión: el ícono YA está resuelto en Build 32** (limpio, sin texto). NO hay que rehacer ningún ícono si se usa Build 32 como base. El ícono "con texto" solo vive en Build 17 (que igual no va a producción).

**(B) El agujero real de consistencia = `CFBundleDisplayName`.** El binario (Build 17 Y Build 32) muestra **"AUREX"** bajo el ícono (no "AUREX LIVE" ni "AurexLive"). Eso NO se cambia sin recompilar. Si cambiamos solo la metadata a "AurexLive", el reviewer instala una app que dice "AUREX" debajo del ícono = la palabra en disputa. Bundle ID iOS = `com.fernandomoscon.aurex`, `PRODUCT_NAME = AurexApp` (interno, no visible).

**(C) ¿El cambio de nombre afecta suscripciones / planes / RevenueCat? → NO.** (Pregunta de Fernando, verificada en código.) Lo que ata las suscripciones y RC es: **bundle ID** (`com.fernandomoscon.aurex`, no cambia) + **product IDs** de los IAP (no cambian) + **entitlements RC** (`'pro'`, `'elite'`) + offerings/packages (`Purchases.getOfferings()` / `purchasePackage`) + **API key RC** (atada al bundle ID). **Ninguno depende del display name.** El "Nombre de la app" del grupo de suscripción (superficie #8) es cosmético (lo que el usuario ve en Ajustes → Suscripciones); cambiarlo a "AurexLive" NO rompe productos, compras ni RC. Un build re-archivado con display name "AurexLive" + mismo bundle ID + mismos product IDs deja IAP/RC intactos.

**(D) 🔴 "AUREX" está ESCRITO en el header de casi TODAS las pantallas (hallazgo de Fernando, verificado en código).** Junto al logo-símbolo `<AurexLogo>` (sin palabra) hay un `<Text>AUREX</Text>` en: Login (`LoginScreen.js:85`), Signup (`:125`), Portfolio (`PortfolioScreen.js:689`), Mercados (`MercadosScreen.js:869`), Watchlist (`WatchlistScreen.js:753`), IA (`IAScreen.js:308`), Mis Alertas (`MisAlertasScreen.js:145`), Perfil (`:931` + "AUREX v{ver}"). Además "AUREX PULSE™", "AUREX FEAR & GREED 14X™", FAQ "¿Qué es AUREX?". → **El reviewer, al abrir Build 32/33, ve "AUREX" en el header de las 6 tabs + login.** Ni Code ni Escritorio lo habían evaluado.

**Implicancia REAL para la decisión (corrige lo anterior):** Build 33 **NO es "1 línea en Info.plist"**. Para que el reviewer NO vea "AUREX" al usar la app, hay que cambiar también los **headers internos** (≈8 pantallas) + decidir qué pasa con los nombres de features ("AUREX Pulse™", etc.). Eso ya es un **mini-rebrand de la identidad visible**, no un parche. Y choca con que **"AUREX" es la marca en Android (publicado en Google Play) + web (aurex.live)** → cambiar solo iOS crea divergencia de marca entre plataformas.

**DISYUNTIVA DE MARCA (decisión de negocio, solo Fernando):**
1. **Rebrand total a "AurexLive"** (iOS binario + headers + metadata + Android + web): coherencia máxima, pero es el cambio más grande y toca lo ya publicado en Android/web.
2. **"AurexLive" solo en iOS** (display name + headers internos del binario iOS), dejando Android/web como "AUREX": destraba Apple pero divergencia de marca cross-plataforma (raro a largo plazo).
3. **Pelear para mantener "AUREX"** (coexistencia/apelación, §2.4-bis/ter/quater) sin tocar nada interno: si Apple cede, marca unificada; si no cede, no se entra a iOS con "AUREX".

**Code (C) ya confirmó que cualquier re-archivo NO toca IAP/RC** (bundle ID + product IDs intactos), así que técnicamente el camino 1 o 2 es seguro para suscripciones. Lo que falta es la **decisión de marca**, que es de Fernando.

**RECOMENDACIÓN CONSOLIDADA (Code + Escritorio, 22-may):** El 4.1(c) objeta el **NOMBRE de la app + ícono**, NO el contenido interno de la UI (argumento de Escritorio: si Apple rechazara por mostrar una marca en la interfaz interna, ninguna app pasaría review). → El "AUREX" en los headers internos es **riesgo de CREDIBILIDAD secundario, no la causa del rechazo**. **Camino escalonado recomendado (menor costo primero):**
1. **Build 33** = Build 32 (ícono ya limpio) + `CFBundleDisplayName = "AurexLive"` + bump. *(Nombre bajo el ícono = lo que Apple mira.)*
2. **Metadata App Store** → "AurexLive" (12 superficies) + **reply de coexistencia** (`PLAN_APPLE_AUREXLIVE_REPLY_22MAY.md`) + privacy/terms alineados.
3. **NO tocar** los headers internos de la app ni la marca en Android/web todavía.
4. Si Apple **aprueba** → marca "AUREX" queda intacta en Android/web, cambio mínimo, listo.
5. Si Apple **rechaza otra vez citando el contenido interno** (improbable según el texto del 4.1c) → recién ahí el rebrand transversal (8 pantallas + i18n).
**Principio: NO mutilar la marca "AUREX" (ya aprobada en Google Play + web) por las dudas, antes de saber si Apple cede al cambio de nombre.** Decisión final = Fernando.

**ACTUALIZACIÓN (22-may, premisa de Fernando):** **iOS es la plataforma objetivo real por mercado; Android es secundario** (aunque aprobado/publicado v1.0.36). Esto **reduce el peso del "no tocar Android"** y reabre el rebrand completo como opción seria.

**¿Es seguro cambiar el nombre de Android estando ya publicado (v1.0.36)? — análisis:**
- **Técnicamente NO rompe nada:** `applicationId = com.aurexapp` + **product IDs Android** + RC son **inmutables** → instalaciones existentes, actualizaciones, suscripciones activas y cobros siguen igual. El nombre visible es independiente.
- **Lo que cambia:** (a) nombre en la ficha de Google Play (metadata, revisión Google horas/días); (b) nombre bajo el ícono (`strings.xml` → nuevo build + revisión).
- **Riesgo de que Google objete el rename:** bajo (ya aprobó "AUREX"; "AurexLive" es más distintivo) — pero es **lectura, no certeza**.
- **Costos blandos:** usuarios actuales ven el nombre cambiar AUREX→AurexLive (leve); se resetea algo de ASO del término "AUREX".

**Implicancia:** si iOS es el foco y cambiar Android no rompe nada técnico, el **rebrand completo a "AurexLive"** (iOS binario+headers + Android + web + privacy/terms) pasa a ser **coherente y de bajo riesgo real**, y resuelve de una los 2 temas omitidos (privacy/terms + headers). El costo es de **identidad de marca**: pasás de "AUREX" a "AurexLive" como nombre del producto. **Esa es la decisión de fondo (de negocio), de Fernando.**

**Privacy/terms (corrige contradicción previa):** el alcance depende del camino. Rebrand completo → privacy/terms SÍ se alinean a "AurexLive". Camino escalonado (solo nombre+ícono iOS) → NO se tocan (contenido compartido iOS+Android+web). Ya no hay contradicción.

### 2.4-sexies ✅ IAP iOS — LOS 4 PRODUCTOS EXISTEN (triple confirmación 22/05). Falso bloqueante de Escritorio aclarado.

Escritorio reportó el 22/05 que "Compras dentro de la app" y "Suscripciones" se ven vacías en App Store Connect → **es un error de DÓNDE miró, NO faltan productos.** Confirmado por **3 fuentes coincidentes** (documento propio de Fernando + memoria verificada por Escritorio el 14-may + `docs/SUSCRIPCIONES.md` source-of-truth):
- Grupo **AUREX PLANES — Group ID 22018005**
- PRO Mensual `com.fernandomoscon.aurex.pro.monthly` — Apple ID **6761736879** — RC iOS `prodcd14c3e521` — nivel 1 — $9.99
- PRO Anual `...pro.annual` — Apple ID **6761794509** — nivel 2 — $89.99
- ELITE Mensual `...elite.monthly2` — Apple ID **6761796966** — nivel 3 — $19.99
- ELITE Anual `...elite.annual` — Apple ID **6761798180** — nivel 4 — $179.99
- Estado: **Pendiente de revisión** (estaban en queue junto con Build 17).

**Por qué Escritorio los ve "vacíos":** (1) son **suscripciones auto-renovables** → NO aparecen en "Compras dentro de la app" (sección de consumibles), viven en **Suscripciones**; (2) el banner "Tu primera compra debe enviarse con una versión nueva… selecciónala en la página de la versión" es el aviso de la **página de la VERSIÓN** = los IAP nunca pasaron su primera review (pending), hay que adjuntarlos a una versión antes de enviar.

**Dónde verificar (Escritorio):** Monetización → **Suscripciones** → grupo "AUREX PLANES" (Group ID 22018005) / buscar los Apple IDs.

**Implicancia para Build 33 (paso real, que Escritorio acertó):** como las suscripciones estaban adjuntas a Build 17 para su primera review y Build 17 fue rechazado, **al enviar Build 33 hay que SELECCIONAR las 4 suscripciones en la sección "Compras dentro de la app y suscripciones" de la página de esa versión, antes de mandarla a revisión.** Eso es proceso normal de primera review, no un producto faltante. **No es bloqueante** del Paso 1 (Build 33 como validación de marca, Manual Release OFF, no se cobra).

### 2.4-septies ✅ EJECUTADO Y ENVIADO — Build 33 "AurexLive" (22-may, Code) → desenlace en §1.e

> **Resultado:** Build 33 compilado + validado + en TestFlight + metadata "AurexLive" + reply de coexistencia → **ENVIADO a revisión Apple 22/05 12:53** (submission `e0e7fb35`, "Pendiente de revisión"). La crónica del envío (obstáculos y flujo de 2 pasos) está en **§1.e**.

**CÓDIGO APLICADO en `~/AurexApp` local (compilado y enviado; commit/reconciliación del remoto = PENDIENTE, ver ⚠️):**
- `src/lib/brand.js` (nuevo): `BRAND_NAME` = AurexLive(iOS)/AUREX(Android), `PRIVACY_URL`/`TERMS_URL` (-ios en iOS), `IS_IOS`.
- `ios/AurexApp/Info.plist`: `CFBundleDisplayName` AUREX → **AurexLive**.
- **9 pantallas**: header → `{BRAND_NAME}` (Login, Signup, Portfolio, Mercados, Watchlist, IA, MisAlertas, Perfil, Alertas).
- **Balanza ⚖️ oculta en iOS** en las 5 tabs (`{!IS_IOS && ...}`), queda en Perfil (tarjeta "Aviso Legal"). Android la mantiene.
- **Timer oculto en iOS** en `LiveIndicator` (queda punto+LIVE). Android lo mantiene.
- Perfil: links Términos/Privacidad → `TERMS_URL`/`PRIVACY_URL`.
- IA: fix de centrado del header (logo+marca a la izquierda; campana ya no se corta).
- **Validado en simulador iOS**: IA, Portfolio, Mercados, Watchlist OK ("AurexLive" entra, sin balanza, • LIVE, campana completa).
- `docs/privacy-ios.html` + `docs/terms-ios.html` creados en repo landing (SIN push).

**Build 33:** bump `CURRENT_PROJECT_VERSION` 32→33 (`MARKETING_VERSION`=1.0 intacto). Clean completo (DerivedData + ios/build + Metro + caché) + `pod install` + Archive vía CLI → **IPA validado en `~/AurexApp/backups/ipa/Build33/AurexApp.ipa`** (CFBundleDisplayName=AurexLive · CFBundleVersion=33 · ShortVersion=1.0 · signing `com.fernandomoscon.aurex`/TX7C2F79U9) → **subido a TestFlight + metadata + reply ENVIADOS a revisión 22/05 12:53** (§1.e).

**⚠️ REMOTO `github.com/fmoscon-creator/AurexApp` CONTAMINADO:** Escritorio commiteó cambios sobre código VIEJO (pre-Build32). **NO hacer `git pull` en el local.** Compilar desde local. Reconciliar después (local = fuente de verdad). Ver [[feedback_nunca_simultaneo_github_code_escritorio]].

### 2.4-octies 📋 ESTADO DE LOS PASOS (actualizado 22-may TARDE)

1. ✅ **Build 33 a TestFlight** — HECHO (Transporter, ícono dorado OK, "1.0 (33)").
2. ✅ **Pasos en App Store Connect** — HECHO: metadata → "AurexLive" (App Name, Descripción, grupo de suscripciones), Privacy URL → `aurex.live/docs/privacy-ios.html`, reply de coexistencia + PDF Namecheap, **Manual Release OFF**, **enviado a revisión 12:53** (las 4 suscripciones van en cola con la versión, no había que re-adjuntarlas). Crónica en §1.e.
3. ✅ **`privacy-ios.html` / `terms-ios.html`** pusheados al repo landing (commit `fe50850`) → URLs vivas en aurex.live.
4. ⏳ **Commit del código nativo + reconciliar remoto `AurexApp`** — PENDIENTE (local = fuente de verdad, NO `git pull`; el remoto quedó contaminado por Escritorio con código viejo, ver §2.4-septies ⚠️).
5. ⏳ **Validar Build 33 en iPhone (TestFlight)** — Fernando ya lo ve como "1.0 (33) AurexLive"; validación funcional fina (headers sin balanza/timer, todo OK) pendiente.

### 2.5 Riesgos abiertos

| Riesgo | Probabilidad | Mitigación |
|---|---|---|
| Apple rechaza por mismo motivo | Baja | 12 superficies cambiadas + reply + comprobante Namecheap |
| Apple objeta OTRA cosa | Media | Sin garantía, monitorear |
| Apple tarda >72h | Media | Expedited Review Request preparado |
| iOS Build 25 cuando llegue su turno: 19+ días queue | Alta | Monitorear, pedir Expedited si >72h |

---

## 2.6 ESTRATEGIA SECUENCIAL iOS — Build 17 → Build 25 → Producción

### Estado actual de la estrategia

Build 17 NO fue compilado para ir a producción tal como está. Fue submitted, rechazado por la marca "AUREX AI", y re-submitted con la marca cambiada a "AUREX LIVE". **El único motivo del re-submit fue validar la marca con Apple.** Build 17 NO tiene features modernas (push, telegram, persistencia sesión, candados completos, "Cómo usar AUREX", etc.).

**Decisión estratégica vigente (Fernando + Escritorio + Code):**
- Marcamos **Manual Release OFF** en el re-submit. Si Apple aprueba, **NO publicamos automáticamente**.
- Build 17 queda como **referencia "approved-no-distribuido"** — sirve solo para confirmar que la marca está aprobada y sin observaciones pendientes.
- Recién con esa confirmación, compilamos **Build 25 iOS** con TODOS los fixes (lista §2.7).
- Build 25 va primero a **TestFlight Internal Testing** para validación nuestra (Fernando en iPhone real).
- Si TestFlight OK → Submit a Apple Review como versión nueva 1.0.25.
- Si Apple aprueba Build 25 → **ESE es el que va a producción** (no Build 17).
- Build 17 queda archivado "approved-no-distribuido".

### Flujo completo paso por paso

| Paso | Quién | Acción | Pre-requisito |
|---|---|---|---|
| 1 | Apple | Responder re-submission Build 17 (marca AUREX LIVE) | — |
| 2 | Fernando + Escritorio | Si Apple APRUEBA → confirmar que NO hay otras observaciones | Apple respondió |
| 3 | Fernando + Escritorio | Si Apple RECHAZA otra vez → analizar nuevo motivo + iterar metadata | Apple respondió |
| 4 | Code + Fernando | Solo si marca aprobada Y sin observaciones extra → compilar Build 25 iOS con todo §2.7 | Paso 2 OK + IAP funcionando en Android producción (§3 + §4) |
| 5 | Fernando | Subir Build 25 a TestFlight Internal Testing | Build 25 compilado |
| 6 | Fernando | Validar Build 25 en iPhone real (Fernando) — todos los items §2.7 | TestFlight subido |
| 7 | Fernando | Si TestFlight OK → Submit Build 25 a Apple Review como versión 1.0.25 | Paso 6 OK |
| 8 | Apple | Revisar Build 25 (típico 19+ días por historial) | — |
| 9 | Fernando | Si Apple aprueba Build 25 → **Manual Release → publicar a producción** | Apple respondió OK |

### Por qué esta secuencia y no compilar Build 25 ahora directamente

- Mandar Build 25 con tantos cambios sin tener la marca pre-aprobada → riesgo de rechazo doble (marca + alguna feature nueva).
- Mandar Build 25 sin IAP funcionando → desperdiciar slot de review (19+ días) por algo que después no se puede vender.
- Esta secuencia **separa el riesgo "marca" del riesgo "features"** — primero validamos marca con un build mínimo (17), después subimos el build con todo (25).

---

## 2.7 CONTENIDO PENDIENTE Build 25 iOS (paridad Android 1.0.33 + IAP)

> Lo que sigue es la **lista de qué tiene que tener Build 25 iOS antes de subir a TestFlight.**
> Hoy NO profundizamos en cada item — cuando llegue el momento, Code + Escritorio cruzan cada uno con el código real de Android v1.0.33 producción para garantizar paridad exacta.

### Pre-requisito ABSOLUTO antes de compilar Build 25 iOS

🚨 **IAP funcionando en Android producción (Build 36 con fix RC o Plan B aplicado).** Sin esto, Build 25 iOS no se compila — desperdiciaríamos el slot Apple Review por un build con cobro roto.

### Items pendientes Build 25 iOS

| Categoría | Detalle |
|---|---|
| **Marca / metadata** | AUREX LIVE consistente en todas las superficies App Store Connect (debe estar ya hecho cuando Apple apruebe Build 17). Limpiar `src/lib/i18n.js` L145 + L257 ("AUREX AI" / "AUREX IA"). Cambiar `ios/AurexApp/Info.plist` `CFBundleDisplayName = AUREX → AUREX LIVE`. |
| **Persistencia sesión** | Evitar deslogueo del dispositivo. Paridad Android: cold reboot, force-stop 90s, background 90s, vuelve sin pedir login. |
| **Push notifications iOS** | APNS wired y funcionando. Build 18 iOS intentó esto y falló por RNSVG vtable — pendiente resolver Podfile + pod install. |
| **Telegram alerts** | Wiring real de alertas operativas vía Telegram (paridad Android backend). |
| **Restricciones features por plan** | FREE / PRO / ELITE — tier limits aplicados en Portfolio, Mercados, Watchlist, IA, Alertas. Funcionamiento real, no decorativo. |
| **Candados visibles** | Lock icons + mensajes "Disponible en PRO/ELITE" en features bloqueadas. PlanLimitModal con copy específico (PRO vs ELITE) según el feature tocado. |
| **Tab Perfil "Cómo usar AUREX"** | Tutorial in-app dentro del tab Perfil. Paridad Android. |
| **Signup nativo** | Flujo SignupScreen funcionando + auth.signUp + POST /api/usuario Capa 1 (try/catch optimistic) + Capa 2 self-heal en usePlan. Bug P0 signup ya resuelto en Android Build 21. |
| **Onboarding 2 botones** | Slide 4 con "Crear cuenta gratis" → SignupScreen + "Ya tengo cuenta" → LoginScreen. Antes eran 3 botones cableados todos a Login. |
| **Bugs UI corregidos** | Bug H Modal Agregar Activo (teclado tapaba botón Guardar) + Bug I doble tap + cualquier bug acumulado en Android Build 33 que aplique también a iOS. |
| 🚨 **IAP funcionando** (PRO/ELITE Apple in-App Purchase) | **CRÍTICO** — cobro de planes vía Apple IAP + RevenueCat. Sin esto Build 25 no sale a producción. Depende de que Tier 1 IAP esté validado en Android + Plan B si RC nunca responde. Ver §4. |
| **Bump versiones** | `ios/AurexApp.xcodeproj/project.pbxproj`: `CURRENT_PROJECT_VERSION 24 → 25` y `MARKETING_VERSION 1.0 → 1.0.25`. |
| **Podfile + pod install** | `cd ios && pod install` validar que compile (Build 18 había problemas con RNSVG vtable — pendiente resolver). |

### Profundización pendiente

Cuando llegue el momento de compilar Build 25 iOS (después de Apple aprobar Build 17 + IAP funcionando en Android), **Code + Escritorio cruzan cada item de la tabla anterior contra el código real Android v1.0.33 producción** (`~/AurexApp/` branch `dev`, commit `c990612`) para garantizar paridad exacta — no asumir que algo funciona "como en Android" sin validarlo en el código.

---

## 3. ANDROID — Builds 33 / 34 / 35 / próximo 36

### 3.1 Estado real reconciliado (verificado 17-may 14:00 AR con Escritorio + git log)

| Build | Estado real | Contenido | Evidencia |
|---|---|---|---|
| **33 / v1.0.33** | 🟢 **PRODUCCIÓN Play Store** | Bug H fix (selectedRow + ScrollView). 20 instalaciones, 177 países. **SIN** fix IAP, **SIN** fix toolbar S24, **SIN** fix crash ScreenFragment. | Confirmado Escritorio + commit `c990612` (16-may) |
| **34 / v1.0.34** | 🟡 Solo commit, probablemente NUNCA subido a Play | IAP Tier 1 wiring frontend (Purchases.logIn/logOut) | commit `cd2f1dc` (16-may) — Escritorio no lo ve en Play Console |
| **35 / v1.0.35** | 🟡 PRUEBA INTERNA subido hace ~23h | Intento de fix IAP que **NO funcionó** (mismo bug "producto no disponible"). Por eso se escaló ticket RC #76809 con texto + 6 capturas | Confirmado Escritorio + Fernando + Play Console |
| **36 / v1.0.36** (próximo) | ⏸ NO compilado todavía | Debe incluir: fix RC IAP (cuando responda) + fix crash ScreenFragment + fix toolbar S24 + cualquier tema nuevo que aparezca | Pendiente acumular pendientes |

### 3.2 Pendientes consolidados Build 36

#### 3.2.1 🚨 P0 — Crash `ScreenFragment` al restaurar app

- **Fuente:** Google Play Console → Crashes & ANRs (reportado 17-may).
- **Métrica:** 6 eventos en 28 días, 5 usuarios afectados, último ~3h antes del cierre 16-may.
- **Versiones afectadas:** v1.0.1, 1.0.7, 1.0.33 (todas las publicadas con react-native-screens).
- **Dispositivos:** Samsung, Redmi, Motorola. Android 14, 15, 16 Beta.
- **Causa raíz:** `MainActivity.kt` no tiene override de `onCreate` — Android intenta restaurar Fragments con `react-native-screens` cuando vuelve de background → `IllegalStateException: Screen fragments should never be restored`.
- **Fix oficial (3 líneas):** override `onCreate(savedInstanceState: Bundle?)` pasando `null` a `super.onCreate`.
- **Archivo:** `~/AurexApp/android/app/src/main/java/com/aurexapp/MainActivity.kt`
- **Diff propuesto:** ver §10 "Archivos de referencia" → `PENDIENTES_AJUSTES_BUILD34_ANDROID_v1_17MAY.md` (en archive, contiene el diff completo).

#### 3.2.2 🟡 P2 — Labels toolbar inferior truncadas en Samsung S24

- **Fuente:** reporte de usuario real (amigo de Fernando con Samsung S24).
- **Captura:** `~/Downloads/S6.jpg` (16-may 22:29 AR).
- **Síntoma:** las labels del bottom tab bar aparecen cortadas con "...":
  - `Portfolio` OK · `Mercad...` (debería decir "Mercados") · `Watchli...` (debería "Watchlist") · `IA` OK · `Alertas` OK · `Perfil` OK.
- **Causa raíz:** ancho_pantalla / 6 tabs no alcanza para labels >7 chars con `fontSize: 9`.
- **Archivo:** `~/AurexApp/src/navigation/TabNavigator.js` línea 24.
- **Historia:** archivo sin cambios desde 12-abr-2026 (commit `94d0b47`). El bug está en producción Build 33.
- **Opciones de fix (Code recomienda A, decisión Fernando + Escritorio):**
  - **A** (recomendada): `fontSize 9→8` + `tabBarAllowFontScaling: false`. Cambio mínimo, 1 línea. Riesgo bajo.
  - **B**: abreviar labels en i18n ("Watchlist" → "Lista", etc.). Más invasivo, todos los idiomas.
  - **C**: solo iconos sin labels. Cambio UX grande.
  - **D**: custom `tabBar` component. Complejidad alta.
  - **E**: híbrido condicional con Dimensions API.

#### 3.2.3 🚨 P0 — Tier 1 IAP (pausado esperando RC)

- 6 cambios documentados en plan archivo-por-archivo (ver §4 IAP).
- Bloqueado por respuesta RC ticket #76809.

### 3.3 Bump versiones cuando se compile Build 36

- `~/AurexApp/android/app/build.gradle`: `versionCode 35 → 36` y `versionName "1.0.35" → "1.0.36"`.
- Backup AAB obligatorio en `~/AurexApp/backups/aab/` post-compilación.
- NO compilar Build 36 hasta tener al menos el bloqueante externo IAP resuelto (RC respondió o pasaron 72h y arrancamos Plan B).

### 3.4 Bug signup P0 (histórico, resuelto en Build 33)

Bug que bloqueaba registro de usuarios nuevos Android (onboarding slide 4 cableado a LoginScreen sin SignupScreen). **RESUELTO en Build 21** y consolidado en Build 33 producción. Histórico.

### 3.5 🔵 (CONDICIONAL) Cambiar nombre Android "AUREX" → "AurexLive" — SOLO si iOS aprueba AurexLive

> **Estado: Build 36 (v1.0.36) está AUTORIZADO y PUBLICADO en producción Google Play.** Android NO tiene el problema 4.1c de Apple (Google ya aprobó). Esto es **solo por consistencia de marca**, a evaluar **únicamente si Apple termina aceptando "AurexLive"** en iOS (ver §2.4-bis/ter/quater). NO ejecutar ahora.

**¿Es posible / complejo? — verificado en el código real (`~/AurexApp`, 22-may):**
- **Nombre en la ficha de Google Play (lo que se ve en el listing de la tienda):** campo de texto editable en Play Console. Se sube como **metadata, NO requiere nuevo AAB**; revisión Google en horas/días.
- **Nombre debajo del ícono (en el teléfono):** sale de `app_name` en `android/app/src/main/res/values/strings.xml` → **hoy = `AUREX`**. Cambiarlo a "AurexLive" requiere editar esa línea + bump `versionCode` + **nuevo build + revisión Google**. Simple (1 línea + build menor), no es proceso desde cero.
- **`applicationId` / `namespace` = `com.aurexapp`** → **PERMANENTE, NO cambia** (no tiene relación con el nombre visible). *(Verificado: Escritorio tenía razón; ⚠️ NO confundir con el bundle ID de iOS, que es `com.fernandomoscon.aurex`.)*

**Cruz con iOS (dato verificado):** el `CFBundleDisplayName` en `ios/AurexApp/Info.plist` hoy dice **`AUREX`** (no "AUREX LIVE"). Si se decide "AurexLive", ese es el valor a poner en iOS Build 25 (ya estaba como pendiente en §2.7) y en Android `strings.xml` — para que las 3 superficies (Play, App Store, ícono) queden consistentes.

**Decisión: evaluar a fondo SOLO tras superar el rechazo iOS. Por ahora queda documentado, sin tocar Android (producción estable).**

---

### 3.6 ✅ IAP VALIDADO en producción real + 🔴 PENDIENTE fiscal W-8BEN (24-may-2026)

**✅ IAP #76809 VALIDADO con compra REAL (24-may):**
- Compra real desde Android v1.0.36 con la cuenta **app.aurex@gmail** → **PRO Mensual `com.fernandomoscon.aurex.pro.monthly` · USD 9.99 cobrado** (producción, NO sandbox — verificado con el toggle "Sandbox data" OFF en RevenueCat). Registrada en RevenueCat (New Sub · Argentina · Play Store).
- **Cancelación** desde el dispositivo → procesada correctamente.
- → Ciclo compra+cancelación IAP funciona **end-to-end en producción real**. El bug que costó 3 días de bloqueo P0 queda **cerrado y validado con dinero real**.
- **Recuperar los USD 9.99 de la prueba:** Play Console → Pedidos → Reembolsar (100% dentro de 48h de la compra).

**🔴 PENDIENTE — Formulario fiscal de EEUU (W-8BEN) — HACER ESTA SEMANA (máx. 30-may-2026):**
- **Qué:** Google Play (operado por Google LLC, EEUU) exige el formulario fiscal de EEUU a todo dev que cobra. Para individuo argentino = **W-8BEN**. Verificado el 24-may en Play Console → Pagos → "Información fiscal de Estados Unidos": **NO está cargado** (sale la pantalla "Antes de comenzar" = formulario en blanco). Lo que SÍ está (verificado 22-abr) es el **perfil de pagos** (banco + dirección) — eso es OTRA cosa.
- **Por qué urgente:** sin el W-8BEN, **Google retiene hasta el 30% de los pagos** hasta aprobarlo. NO bloquea ventas, pero retiene la plata. Apareció ahora porque la compra real generó la primera transacción.
- **Cómo:** Play Console → Pagos → Configuración → Información fiscal de EEUU → "Agregar info fiscal". 15-20 min (se cae tras 1h, no guarda). Datos: Persona física · Argentina · **CUIT como foreign TIN** · **Argentina NO tiene tratado con EEUU** (no se reclama reducción) · actividad realizada fuera de EEUU.
- **Cómo se hará:** lo completa **Fernando con Code acompañando en línea** (campo por campo), idealmente con el **contador** confirmando los campos sensibles (TIN, tipo de ingreso). Es declaración jurada fiscal → no improvisar. **Code NO es asesor fiscal.**

**🟢 Mail "formas de pago alternativas" (24-may) — NO es problema:** es una función de la cuenta de Google de app.aurex **como COMPRADOR** (se activó al hacer la compra de prueba: respaldo de tarjetas si la principal falla). NO afecta a AUREX/Play Console. NO confundir con "Alternative/User Choice Billing" para devs (eso es otra cosa). Sin acción requerida.

---

## 4. IAP / REVENUECAT — Bug P0 ticket #76809

### 4.1 Síntoma reproducible

App AUREX v1.0.35 (Internal Testing) → Login `fmoscon@gmail.com` → SubscriptionScreen → tap "Quiero PRO mensual" → ~12 ms → popup "Error / The product is not available for purchase". Nunca llega a `launchBillingFlow`, nunca contacta Google Billing real, nunca dispara webhook.

### 4.2 Estado del ticket

- **Ticket RC #76809** enviado 16-may PM.
- **Contenido:** stack técnico completo + flujo reproducible + 5 causas conocidas RC descartadas + referencia Issue #3039 RC (acknowledged sin fix público).
- **6 screenshots adjuntos** (ZIP 9 MB compressed): productos Play Console, customer not found en RC dashboard, popup error Samsung Z Flip 3, Build 35 activo Internal Testing.
- **Estado:** ESPERANDO respuesta RC support. SLA típico 24-72h hábiles.
- **Confirmado por Fernando 17-may 13:30 AR:** sin novedades, RC no respondió aún.

### 4.3 Las 5 causas conocidas RC — TODAS DESCARTADAS

| # | Causa | Estado |
|---|---|---|
| 1 | País producto no incluye AR | ✅ DESCARTADO (174 países incluido AR) |
| 2 | País cuenta tester ≠ países producto | ✅ DESCARTADO (AR confirmado) |
| 3 | PIN no configurado en Samsung | ✅ DESCARTADO |
| 4 | Tester sin opt-in URL | ✅ DESCARTADO |
| 5 | Application ID mismatch | ✅ DESCARTADO (`com.aurexapp` ambos lados) |

### 4.4 Hipótesis causa raíz

Bug estructural RC SDK 9.15.1 + Google Play Billing v8 + targetSdk 36 (combo nuevo, feb 2026). Matchea Issue #3039 RC (acknowledged enero 2026 sin fix público).

### 4.5 Tier 1 IAP (6 cambios listos para implementar cuando RC responda)

| ID | Archivo | Cambio |
|---|---|---|
| IAP-1 | `~/AurexApp/App.js` | useEffect boot → `Purchases.logIn(uid)` |
| IAP-2 | `~/AurexApp/src/screens/LoginScreen.js` | Post-signIn → `Purchases.logIn(uid)` |
| IAP-3 | `~/AurexApp/src/screens/SignupScreen.js` | Post-signUp → `Purchases.logIn(uid)` |
| IAP-4 | `~/AurexApp/src/screens/PerfilScreen.js` (logout) | `Purchases.logOut()` antes de `supabase.auth.signOut()` |
| IAP-5 | `~/Desktop/aurex-backend/server.js` L1631-1643 | Alerta Telegram si `app_user_id` empieza con `$anonymous:` |
| IAP-6 | `~/AurexApp/src/screens/PerfilScreen.js` (deleteAccount) | `Purchases.logOut()` antes de borrar cuenta |

**Orden obligatorio (Escritorio):** IAP-5 backend PRIMERO → validar webhook con evento test → si OK frontend.

### 4.5.b Impacto del IAP sobre iOS Build 25

🚨 **Cruz crítica con §2.7:** el bug IAP afecta tanto Android como iOS. Aunque el ticket RC #76809 es por Android, **la causa raíz probable (combo RC SDK + Billing v8 + targetSdk 36 + Issue #3039)** puede repetirse en iOS o tener un equivalente Apple IAP no detectado. Por eso la decisión estratégica vigente es: **NO compilar Build 25 iOS hasta tener IAP funcionando confirmado en Android producción.** Una vez confirmado en Android (Build 36 con fix RC o Plan B), se valida en paralelo el flow iOS en TestFlight antes de mandar a Apple Review.

### 4.6 Plan B si RC no responde o no resuelve

| Plan | Tiempo | Descripción |
|---|---|---|
| **B-1** | 2-3 días | Webhook directo Google Play (bypass RC parcial) |
| **B-2** | 5-7 días | Reemplazo total RC con Stripe + native IAP |
| **B-3** | 1 día | Validación manual via Google Play API (temporal) |

**Decision matrix:** 0-3 días sin respuesta RC = esperar · 3-7 días = empezar B-1 · 7-14 días = ejecutar B-2 · B-3 solo puente.

### 4.7 Datos operativos RC

- Project ID RC: AUREX `228caf37`
- Android App ID RC: `app8be7db09a7`
- Webhook URL: `https://api.revenuecat.com/v1/incoming-webhooks/apple-server-to-server-notification/WICtYZubpcHyBpPfLnZMoagjatQAyjPD`

---

## 5. LANDING v3 aurex.live

### 5.1 Estado actual

- HTML codeado completo: 1.163 líneas, 72.979 bytes, vanilla HTML/CSS/JS, 18 bloques + 33 capturas EN+ES.
- **2 agregados nuevos** sobre v3 base (codeados esta sesión 17-may madrugada):
  - **Header newsletter form** con CTA dorado "Get early access" + micro-modal AJAX → Formspree `xpqnajgp` (cuenta abierta con `fmoscon@gmail.com`, notificaciones a `app.aurex@gmail.com`, free tier 50 signups/mes).
  - **Tablero "Live Market Pulse" táctico** estilo Bloomberg/Tokyo reemplazando Bloque 11.5 "By the numbers": Magnificent 7 + Crypto Top 5 (CoinGecko free API real, refresh 60s) + Commodities/Macro + reloj UTC.
- **2 PNG Playwright** generados (desktop 1440×900 + mobile 390×844).
- **Snapshot PENDIENTE REVIEW** commiteado (`a74e981`) en `briefs/landing_v3_PENDIENTE_REVIEW_17MAY/`.

### 5.2 Flujo de revisión — preview en navegador real (vigente desde 17-may 15:30 AR)

URL preview live: `https://aurex.live/landing-v3-preview/` (con `?v=N` para bust cache cuando hace falta refrescar OG en WhatsApp/Telegram).

### 5.3 Trabajo HEADER cerrado 17-may sesión nocturna (23 sub-puntos)

Todo el header rediseñado iterativamente con Fernando. Items cerrados:

| Item | Cerrado |
|---|---|
| 7-A "Features" destino correcto (bloque "Características" nuevo con 13 cards + capturas reales) | ✅ |
| 7-E Canales dropdown bug + logos OFICIALES de cada red | ✅ |
| 7-H BUG i18n 8 idiomas funcionando (con `cache: 'no-store'` fix Chrome) | ✅ |
| 7-J Borde dorado items nav | ✅ |
| 7-K Mobile: lang selector visible en header (no solo drawer) | ✅ |
| 7-L Desktop achicado: lang + Descargar app visibles | ✅ |
| 7-M Hamburguesa rectangular 62x48 + borde dorado + separación | ✅ |
| 7-N Mobile: eliminado espacio negro grande entre header y hero | ✅ |
| 7-O Renombrado "Acceso anticipado" → "Suscripción Newsletter" 8 idiomas | ✅ |
| 7-P Logo separado del borde izquierdo (safe-area-inset) | ✅ |
| 7-R Línea horizontal dorada al final del header | ✅ |
| 7-S Tabla benchmark: logos REALES con colores oficiales (AUREX/TradingView/Investing/Seeking Alpha/Bloomberg) + tildes ✓ verdes + X rojas + sin scroll desktop | ✅ |
| 7-T Drawer contraste igualado a web | ✅ |
| 7-U Planes: cards con colores REALES app Perfil (FREE gris / PRO violeta / ELITE dorado) + features list vertical + modal compra con logos Apple/Google/AUREX reales + **carousel horizontal swipeable en mobile** con 3 puntitos | ✅ |
| 7-V Balanza disclaimer ⚖️ en header (arriba visible, no FAB abajo) | ✅ |
| 7-W OG image preview link: logo 160px + disco oscuro radial detrás + meta tags acortados + cache bust con `?v=N` | ✅ |
| 7-X Card destacado "POR QUÉ SOMOS MEJORES" en hero + item Benchmark en hamburguesa | ✅ |
| 7-Y Hero label "TERMINAL GLOBAL EN VIVO" (8 idiomas) | ✅ |
| 7-Z 3 cards descarga: logos Apple+Google Play oficiales + texto i18n 8 idiomas | ✅ |
| 7-AA Hero sub: 350+, acciones primero, FED+geopolítica, push+Telegram, "a tu alcance" (8 idiomas) | ✅ |
| 7-BB Nav items altura 36px fijo desktop / 44px mobile | ✅ |
| 7-CC Canales logos en COLORES OFICIALES de cada marca | ✅ |
| 7-D Cómo Funciona: **accordion 6 tabs** con contenido REAL extraído de `~/AurexApp/src/components/ComoUsarAurexBlock.js` + 24 claves cu_* en 8 idiomas | ✅ |

### 5.4 Pendientes Landing v3 — siguen abiertos

| # | Punto |
|---|---|
| 7-B | Markets/Coverage — mejorar bordes 9 cards + frase Alertas Push/Telegram + IA con % predicción |
| 7-C | Pricing — rediseño YA HECHO (se absorbió en 7-U). Marcar como cerrado en próximo cycle |
| 7-F | Get Early Access popup newsletter — mejorar diseño (Suscripción Newsletter) |
| 7-G | Tipografía: 6 versiones del header para elegir |
| 7-I | OG v2.2 medium como fondo de zonas (ya hecho como OG image — pendiente decisión si usarlo TAMBIÉN como fondo de hero o popup) |

### 5.5 REFACTOR MAYOR pendiente (decisión Fernando 17-may 19:00)

**Landing compacta + click-to-expand, no scroll infinito.** El concepto vigente: cards/sectores abren modal o vista expandida en vez de scroll largo. Memoria: `feedback_landing_compact_click_to_expand`. Tarea grande agendada para después de cerrar ajustes puntuales actuales del header/secciones.

### 5.6 Reglas de trabajo aprendidas hoy (guardadas en memoria)

8 reglas nuevas guardadas que aplican forever:

1. `feedback_validar_pixel_x_pixel_antes_de_pasar` — matemática + curl/grep + headless ANTES de avisar "listo".
2. `feedback_i18n_cambios_aplican_8_idiomas` — EN+ES no alcanza, siempre los 8.
3. `feedback_cambios_siempre_web_y_iphone` — toda mejora visual aplica a los 2 contextos.
4. `feedback_landing_compact_click_to_expand` — concepto madre, refactor pendiente.
5. `feedback_siempre_espanol_referencia_ES` — Code escribe TODO en español + glosario EN→ES.
6. `feedback_no_abrir_pantallas_a_fernando` — Playwright headless only.
7. `feedback_validar_yo_antes_de_pasar_a_fernando` — Code es QA primero.
8. `feedback_nunca_inventar_iterar_version_a_version` — editar código real, no rediseñar desde cero.

### 5.7 Pre-requisitos para deploy a producción aurex.live

Cuando todo Landing v3 esté OK doble (Fernando + Escritorio):
- Generar OG image final (ya hecha v4 con logo 160px + disco contraste).
- Verificar links internos.
- Mover archivos de `landing-v3-preview/` al root del repo aurex-app (reemplaza index.html actual fase 0).
- Commit + push → GitHub Pages auto-deploy a aurex.live oficial.
- Test funcional: submit form newsletter `xpqnajgp` → confirmar notificación a `app.aurex@gmail.com`.
- `landing-v3-preview/` queda como referencia histórica.

### 5.3 Decisiones de diseño cerradas

- Mix v2 Stellar ajustada + v3 Tactical para OG image (decidido por Fernando).
- 18 bloques (vs 17 anteriores) incluyendo "More you can do" + carrusel 10 slides + Markets+Pulse en hero.
- Profile menu + How-to-use NO van en landing (son internos).
- 35 capturas renombradas a sistema `pantalla_idioma.jpg`.
- 4 capturas excluidas quedan como reserva.

### 5.4 Formspree (newsletter)

| Dato | Valor |
|---|---|
| Servicio | Formspree Free (50 submissions/mes) |
| Owner email login | `fmoscon@gmail.com` |
| Notification email | `app.aurex@gmail.com` |
| Form name | Aurex Newsletter |
| Form ID | `xpqnajgp` |
| Endpoint | `https://formspree.io/f/xpqnajgp` |
| Dashboard submissions | `https://formspree.io/forms/xpqnajgp/submissions` |
| Upgrade futuro | Basic $10/mes → 1.000 submissions/mes |

---

## 6. PLAN MKT v3 — pendiente, bloqueado hasta landing live

### 6.1 Estado

- **NO arrancado.** Bloqueado hasta que landing v3 esté live en aurex.live.
- Brief base: `~/Dropbox/AUREX/MARKETING/MARKETING_CONTEXT_AUREX_v1.md` (14 secciones canónicas, fuente de verdad para las 42 marketing-skills).
- Plan MKT v2 cerrado pero outdated: incorporar landing v3 + sistema captura leads Formspree.

### 6.2 Decisiones ya cerradas

- WhatsApp Business OUT de FASE 1 (decisión 14-may post incidente WA-001/WA-002).
- Buffer (free) como herramienta principal de scheduling X / LinkedIn / Instagram / Facebook.

### 6.3 Sub-pendientes cuando arranque MKT v3

- 30 posts/mes Buffer.
- Instagram Stories 2×/semana behind the scenes.
- Video análisis 60s TikTok+Reels 2×/semana.
- Thread "cómo leer AUREX PULSE" en X 1×/semana.
- Resumen mercado diario Telegram.
- Artículo corto LinkedIn 1×/semana.

---

## 7. PWA aurex.live `/app/` — paridad con la nativa EN CURSO (colgado con avance, faltan pasos)

> **Estado 22-may:** la PWA está live en `aurex.live/app/`, recibe tráfico desde la landing. Hay una **auditoría de paridad completa (código de las 6 tabs)** y el **primer gating en producción**. **Quedó con avance pero MUCHOS pasos por terminar** para igualar a la nativa actual (Android 1.0.36 / iOS Build 33).

### 7.1 Lo HECHO (22-may, en producción)
- **"INVEST AI" eliminado** (splash + login) → "TERMINAL DE MERCADOS" (texto de marca prohibido que Google levantaba).
- **Arranque en tema OSCURO** por defecto (validar propagación de cache, #91).
- **Auditoría de paridad PWA↔nativa** de las 6 tabs (consenso Code+Escritorio) → `briefs/AUDITORIA_PARIDAD_CONSOLIDADO_22MAY.md` + `briefs/AUDITORIA_PARIDAD_PWA_22MAY.md` + carpeta `briefs/paridad_pwa_22may/`.
- **🔴 GATING #1 EN PRODUCCIÓN** (commit `bf3bac7`): Portfolio (FREE máx 5) + Watchlist (FREE máx 10) ahora llaman `checkPlanLimit`/`showPaywall`. **Hallazgo central:** la PWA YA tenía toda la infra de gating (`PLAN_LIMITS_CLIENT`, `checkPlanLimit`, `showPaywall`) pero llamada **0 veces** → el trabajo es **cablear, no construir**.

### 7.2 Lo PENDIENTE (en orden — el gran bloque que falta)
1. **🔴 Gating por plan en TODA la PWA (lo más urgente, es monetización):** falta en **Alertas** (toggles PRO/ELITE), **IA** (detalle de señal: motivos/variables/contexto ocultos por plan + límite 3 señales/día FREE), **Mercados** (Pulse por plan), **Watchlist** (límite de listas). Hoy un FREE ve/usa de más en esas pantallas.
2. **"Cómo usar AUREX"** en Perfil (bloque guía 6 tabs + Planes; claves i18n `cu_*` ya existen) — gap de contenido más grande.
3. **Alertas funcional:** canales **Telegram** (validar teléfono → deep-link `/start` → polling `telegram_chat_id`) + **Push** reales + **"Mis Alertas" historial** (`alertas_historial`, leídas/borrar, badge, BellButton) + umbrales editables por alerta.
4. **IA:** botones header 🔔/⚖️ + sub-direcciones ALCISTA/BAJISTA + bug `varDefs`.
5. **Menores:** filtro "Solo favoritos" (Mercados), menú "Ordenar" (Watchlist), mail soporte → `support.aurex.live@gmail.com`, imágenes onboarding.

> Plan de ejecución detallado y priorizado: `AUDITORIA_PARIDAD_CONSOLIDADO_22MAY.md` §ESTADO DE EJECUCIÓN. Validación VISUAL de las tabs pendiente (faltó `idb`/Command Line Tools para automatizar el simulador).

**Política permanente:** cada vez que se modifica Android nativo, Code DEBE evaluar si aplica a PWA y reportarlo acá (regla `feedback_pwa_paridad_android_continua`).

---

## 8. BACKEND aurex-backend (Railway)

### 8.1 Estado

- Deploy automático push a main → Railway.
- Sin incidentes activos al 17-may.

### 8.2 Cascadas verificadas (sprint backend 11-may cerrado)

| Asset class | Cascada |
|---|---|
| Crypto | Binance → CryptoCompare → OKX → Kraken → CoinGecko |
| Stocks | Yahoo → Finnhub → Alpha Vantage |

### 8.3 Endpoints clave

- `/api/debug/sources` — estado de cada fuente
- `/api/crypto-prices` — precios cripto agregados
- `/api/usuario` — POST signup (Capa 1 try/catch optimistic + Capa 2 self-heal usePlan)
- `/webhook/revenuecat` (server.js L1601) — webhook RC

### 8.4 Datos operativos Railway

- URL: `https://aurex-app-production.up.railway.app`
- 16 variables de entorno (lista completa en `MANUAL_ESTRUCTURAL.md` §4).
- Telegram bot principal: alertas operativas + admin chat (`ADMIN_WHATSAPP=5491167891320`).

### 8.5 Bloqueo activo

**Railway + Binance bloqueado** (BN-002 ACTIVE desde 18-abr, MITIGATED via CryptoCompare). Evaluar región Railway / hosting alternativo / proxy post-aprobación Apple.

---

## 8.b FLUJO OFICIAL DE COMPILACIÓN — iOS + Android (+ 🧹 LIMPIEZA OBLIGATORIA)

> **Documento completo y permanente:** `briefs/FLUJO_BUILD_IOS_ANDROID.md` (raw: `https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/FLUJO_BUILD_IOS_ANDROID.md`). Acá va el **resumen operativo** para que cualquier chat compile sin releer todo. Nació del incidente Build 25 iOS (errores groseros) — existe para que NO se repitan.

### Roles fijos (NUNCA cambian)
- **Code:** todo lo técnico — clean, compile, export, **validación de IPA/AAB ANTES de entregar**. NO le pasa un binario a Fernando sin validarlo contra el último build exitoso.
- **Fernando:** solo **sube** el archivo final (Transporter iOS / Play Console Android) + asigna grupos de testing + **da el clic de "Enviar a revisión"**. NO toca Xcode, NO compila.
- **Escritorio:** verifica estado en App Store Connect / Play Console + valida lista de cambios Android antes de enviar. NO compila, NO ejecuta en repos privados, **NO toca el botón de envío a revisión**.

### 🧹 PASO 0 — LIMPIEZA OBLIGATORIA (el "tema de la limpieza" que dio error de IAP)
**Causa raíz del bug IAP Android Build 35** ("product not available for purchase", 3 días perdidos): un **bundle JS cacheado** del build anterior sobrevivió porque NO se limpió antes de compilar. **NUNCA saltear el clean**, sin importar lo que diga un brief o checklist.
- **Android:** `cd ~/AurexApp/android && ./gradlew clean`
- **iOS (equivalente exacto):**
  ```bash
  rm -rf ~/AurexApp/ios/build/
  rm -rf ~/Library/Developer/Xcode/DerivedData/AurexApp-*
  cd ~/AurexApp/ios && pod install
  ```
  (+ limpiar caché Metro si quedó proceso vivo). **NO confiar en Pods/Gradle/DerivedData cacheados.** Build 33 iOS se compiló con este clean completo y salió limpio.

### Flujo iOS (TestFlight / App Store)
1. **Clean** (Paso 0). 2. **Fixes + bump versión + commit**: subir SOLO `CURRENT_PROJECT_VERSION` (32→33…); **`MARKETING_VERSION` = 1.0 SIEMPRE** (cambiarlo a "1.0.25" fue el desastre de Build 25 → Transporter con logo gris + bundleID raw). 3. **Archive + Export IPA vía CLI** (`xcodebuild`, Code; Fernando NO abre Xcode) → backup en `backups/ipa/BuildXX/` (re-compile = sufijo `_v2`,`_v3`, nunca `_fix`). 4. **VALIDACIÓN post-export (CRÍTICO):** `unzip` + comparar `CFBundleDisplayName / Identifier / ShortVersion / Version` contra el último IPA exitoso → la ÚNICA diferencia debe ser `CFBundleVersion`; verificar signing `com.fernandomoscon.aurex`/TX7C2F79U9. Si discrepa otra key → STOP. 5. **Transporter (Fernando)** — síntomas STOP: logo gris, bundleID raw, falta botón Entregar. 6. **Escritorio** confirma procesado (ícono dorado). 7. **Asignar grupo Internal Testing manual** (al subir por CLI NO se auto-asigna). 8. **Validar en iPhone**.

### Flujo Android (Play Store)
1. **Clean** (`./gradlew clean`). 2. **Fixes + bump** `versionCode` **y** `versionName` (suben juntos) + commit. 3. **`./gradlew bundleRelease`** → AAB firmado → backup en `backups/aab/BuildXX/`. 4. **Escritorio verifica la lista de cambios ANTES** de "Enviar a revisión" (previene mandar cambios no intencionados, como pasó en Build 36 con el track Alpha). 5. **Fernando envía** con OK de Escritorio. 6. **Escritorio verifica estado** (ETA Google 2-24h, hasta 72h).

### Reglas permanentes (resumen)
Clean SIEMPRE · Backup SIEMPRE antes de subir · Fernando NO toca Xcode · iOS `MARKETING_VERSION`=1.0 fijo · Android versionCode+Name juntos · Code valida IPA post-export · síntomas STOP en Transporter · grupo Internal manual iOS · Escritorio valida lista Android · Code NO aplica versiones del brief literal sin cruzar el historial real de la tienda.

---

## 8.c 📡 STATUS CONEXIONES — FALLBACK — REPORTES HEALTH (Telegram diario/mensual + alerta % uso)

> **Auditoría profunda del sistema de fuentes de datos (24-may-2026, Code, sobre el código real `aurex-backend/server.js` + estado en vivo de Railway).** Repo backend: `github.com/fmoscon-creator/aurex-backend` (PÚBLICO). Endpoint estado en vivo: `aurex-app-production.up.railway.app/api/debug/sources`.
> **✅ ESTADO: IMPLEMENTADO y EN PRODUCCIÓN (24-may, deploys 1-4 a Railway) — ver §8.c.7.** Lo de §8.c.3/§8.c.4 queda como registro de la auditoría.

**🔎 Hallazgos clave de la ejecución (24-may):**
- **El ÚNICO símbolo que caía a CoinGecko era USDT** (stablecoin $1), pedido cada 2 min → quemaba ~80% del cupo Demo por 1 activo de 350. Resuelto: stablecoins (USDT/USDC/DAI) se refrescan cada 12h.
- **CoinGecko Demo NO expone el uso real por API** (verificado: `/api/v3/key` → error 10005 "PRO only"; las respuestas no traen headers de cupo). El % real del mes solo vive en el **dashboard/email** de CoinGecko. El reporte muestra el conteo interno + esa aclaración. **CryptoCompare SÍ** lo expone (`/stats/rate/limit` → dato real, hoy 16.200/11.000 = 147%, agotada).
- **Las alertas de cupo iban por WhatsApp/Evolution (PAUSADO WA-002) → nunca llegaban.** Se cablearon a **Telegram** (`notifyAdminTG`).
- **Endpoints nuevos:** `/api/debug/quotas` (uso de cupo) y **`/api/health/reports?format=text`** (reportes desde Supabase, accesibles por Code y Escritorio — NO Dropbox).

### 8.c.1 Cascada por tipo de activo — cuál está ACTIVA
| Tipo | Fuente ACTIVA | Estado | Cascada de respaldo |
|---|---|---|---|
| **Cripto** (50 + 3 stable) | **Binance.US** | 🟢 | CryptoCompare(fb1 🔴) → OKX(fb2 🟢) → Kraken(fb3 🟢) → CoinGecko(fb4 🟢) → caché |
| **Acciones / ETF / Bonos / Metales / Commodities / Forex / Futuros** (297) | **Yahoo Finance** | 🟢 | Finnhub(fb1 🟢) → Alpha Vantage(fb2 🟢, 25/día) |

- **Binance.US ≠ api.binance.com:** los **precios** usan `api.binance.us` (funciona, sin geo-block). `api.binance.com` (global) está bloqueada por Railway con **HTTP 451**.
- Binance.US NO lista 5 símbolos (`INJ, TON, USDT, XMR, RUNE`) → caen por la cascada. Hoy (verificado en vivo): INJ/TON los trae OKX, XMR Kraken, y **USDT es el ÚNICO que cae a CoinGecko**.
- **Binance.US NO sirve para stocks/ETF/etc.** (es exchange cripto puro, no cotiza renta variable/fija). Para reforzar esa cascada habría que sumar otra fuente de stocks (Twelve Data / FMP / Stooq / Polygon).

### 8.c.2 Estado + TOPE de cada fuente (la capacidad de desborde, no solo verde/rojo)
| Fuente | Rol | Tope del plan | Estado | Reset |
|---|---|---|---|---|
| Binance.US | cripto primaria | sin límite | 🟢 | — |
| CryptoCompare | cripto fb1 | **11.000/mes** | 🔴 AGOTADA (17.760/11.000) | día 1 de cada mes (cron `0 3 1 * *`) |
| OKX | cripto fb2 | sin key | 🟢 | — |
| Kraken | cripto fb3 | sin key | 🟢 | — |
| CoinGecko | cripto fb4 | **~10.000/mes (Demo)** | 🟡 ~80% | fin de mes |
| Yahoo | stocks primaria | sin límite | 🟢 | — |
| Finnhub | stocks fb1 | (verificar) | 🟢 | — |
| Alpha Vantage | stocks fb2 | **25/día** | 🟢 | diario |

### 8.c.3 🔴 Problemas detectados (auditoría 24-may)
1. **USDT quema CoinGecko:** 1 stablecoin ($1,00 fijo) pedida **720×/día** (cada 2 min) consume ~80% del cupo Demo. Por 1 activo de 350.
2. **El reporte miente sobre Binance:** el health/reporte chequea `api.binance.com` (451) en vez de `api.binance.us` (la real, OK) → muestra "Binance rojo 451" cuando la primaria está sana.
3. **6 llamadas a `api.binance.com` global** (señales IA, sentiment, klines: líneas 1998/2237/2244/2312/2474/2713) fallan con 451 → análisis degradado.
4. **Sin alerta de CoinGecko:** solo CryptoCompare tiene contador+alerta. El aviso del 80% llegó por **email del proveedor**, no por el backend.
5. **Reportes solo en Supabase** (no había backup accesible; Dropbox tenía 2 `.docx` viejos manuales).
6. **Informe mensual sin "días activos por fuente"** (el detalle que se quiere).
7. **Sin alerta genérica de agotamiento + reactivación** por fuente.

### 8.c.4 ✅ Decisiones (24-may) — a implementar en el backend
- **USDT:** dejar de pedirlo en vivo → **cache 12h (2×/día)** (o hardcode $1,00). CoinGecko cae de ~21.600/mes a ~60/mes. **[DECIDIDO]**
- **Binance:** migrar `api.binance.com` → `api.binance.us` en el health/reporte **y** en las 6 llamadas de señales/sentiment/klines → el reporte refleja la verdad. **Deadline: dejar corregido para el reporte de las 08:00 AR. [DECIDIDO · URGENTE]**
- **Alerta CoinGecko 80% / 90%** (igual que CryptoCompare). **[DECIDIDO]**
- **Mostrar el TOPE de cada fuente en el reporte** (se use o no) + % de uso → anticipa desborde, no solo verde/rojo cuando ya cayó. **[DECIDIDO]**
- **Alerta genérica de agotamiento + reactivación** para CUALQUIER fuente con límite: Telegram especial al agotarse Y al reactivarse en el reset del período (no solo CryptoCompare). **[DECIDIDO]**
- **Guardado de reportes:** **NO Dropbox** (es de uso personal de Fernando). → **Supabase (ya los guarda) + endpoint público de lectura** para que Code y Escritorio accedan sin trabas, + **export del mensual a GitHub** (repo público) como archivo durable. **[PROPUESTO por Code — a confirmar Fernando]**

### 8.c.5 Sistema de reportes Health x Telegram (cómo funciona HOY)
- **Diario** — `dailyHealthReport()`: **2×/día, 08:00 y 20:00 AR**. Numerado **#seq** (autoincrement de Supabase tabla `daily_reports` → ese es el "#51"). Contenido: conexiones por categoría + % CryptoCompare + incidentes 24h. Se manda por Telegram (`ADMIN_TELEGRAM_CHAT_ID`) y persiste en Supabase.
- **Mensual** — `monthlyHealthReport()`: **último día hábil del mes** (18:00 AR; si cae finde, el viernes previo). Persiste en `monthly_reports`. → **A mejorar** con días-activos-por-fuente (boceto 8.c.6).
- **Alerta % uso:** CryptoCompare 80/95% ✅ (ahora por Telegram). CoinGecko 80/90% ✅ (sobre conteo interno). + tope por fuente en cada reporte ✅. Todo por Telegram.
- **Tally diario** ✅ (`_tallySourceDay`, 22:00 AR) registra la fuente activa cripto+stock del día → alimenta el informe mensual. **Endpoint reportes:** `/api/health/reports`.

### 8.c.6 Boceto — INFORME MENSUAL CONSOLIDADO (objetivo: fin de mayo)
```
📊 AUREX — INFORME MENSUAL — MAYO 2026   (#M-05 · último día hábil)
━━━━━━━━━━━━━━━━━━
💰 CRIPTO (53 activos)
  Días con cada fuente ACTIVA:
   • Binance.US ...... 27 d (87%)  primaria
   • OKX ............. 3 d (10%)   fb2
   • CoinGecko ....... 1 d (3%)    fb4
  Fallbacks que entraron en juego: OKX, CoinGecko
  Límites alcanzados:
   • CryptoCompare 🔴 agotó cupo 22/05 (17.760/11.000) — fuera 9 días
   • CoinGecko 🟡 pico 80% (8.0k/10k)
  Topes: Binance.US ∞ · CryptoCompare 11k/mes · CoinGecko 10k/mes · OKX/Kraken s/key
📈 STOCKS/ETF/Bonos/Commod/Forex/Fut (297)
   • Yahoo ........... 31 d (100%) primaria
   • Finnhub / Alpha Vantage ... 0 d
  Límites alcanzados: ninguno
🚨 Incidentes del mes: N   ·   ⏱ Uptime cotizaciones: 100%
━━━━━━━━━━━━━━━━━━
```

### 8.c.7 ✅ Implementación — EJECUTADA (deploys 1-4 a Railway, 24-may)
- **Deploy 1 (`9951e68`):** USDT/stablecoins cada 12h + `api.binance.com`→`api.binance.us` en TODO (precios, señales, sentiment, klines, health, reporte). → el reporte ya no miente con el 451.
- **Deploy 2 (`d4b5477`):** contador+alerta CoinGecko 80/90%, alertas de cupo cableadas a **Telegram** (antes WhatsApp muerto), topes por fuente en el reporte, alerta de **agotamiento + reactivación** (CC+CG).
- **Deploy 3 (`55df902`):** intento de leer uso real vía API → reveló que CoinGecko Demo no lo expone (solo CryptoCompare lo da).
- **Deploy 4 (`f193e5c`):** CoinGecko sin invento (conteo interno + nota), endpoint **`/api/health/reports`** (Supabase, NO Dropbox), **tally diario** de fuente activa + sección "DÍAS ACTIVOS POR FUENTE" en el informe mensual.
- **Verificado en vivo:** 54 cripto cotizando (Binance.US activa), CryptoCompare real 147%, endpoint de reportes devuelve daily+mensual.
- **Limitación honesta:** el tally arrancó a medir el **24-may** → el informe mensual de mayo será **parcial** (24→31); el primero completo es el de **junio**. (Export del mensual a GitHub: opcional, NO implementado — los reportes ya son accesibles por el endpoint.)

---

## 9. MAPA DE ARCHIVOS — dónde vive cada cosa

### 9.1 Repos GitHub (3)

| Repo | URL | Visibilidad | Path local | Branch operativo | Deploy |
|---|---|---|---|---|---|
| **aurex-app** (PWA + landing + briefs) | `https://github.com/fmoscon-creator/aurex-app` | 🌐 PÚBLICO | `~/Desktop/aurex-app` | `main` | GitHub Pages → aurex.live |
| **AurexApp** (Nativa RN iOS+Android) | `https://github.com/fmoscon-creator/AurexApp` | 🔒 PRIVADO | `~/AurexApp` | `dev` | Xcode → App Store / Android Studio → Play Store |
| **aurex-backend** (Node Railway) | `https://github.com/fmoscon-creator/aurex-backend` | 🌐 PÚBLICO | `~/Desktop/aurex-backend` | `main` | Push main → Railway auto-deploy |

**Acceso Escritorio:** repos PÚBLICOS sí. Repo PRIVADO `AurexApp` NO (Code le pega contenido relevante si necesita).

> ⚠️ **Clon local del repo público:** puede recrearse por sesión (este chat trabajó desde un clon temporal, no desde `~/Desktop/aurex-app`, que quedó vacío). **La fuente canónica es GitHub** — si el path local está vacío, clonar de `https://github.com/fmoscon-creator/aurex-app.git` antes de editar.

### 9.2 Dropbox `~/Dropbox/AUREX/`

| Carpeta | Para qué |
|---|---|
| `MAPA DE TRABAJO/` | Briefs activos espejados de `aurex-app/briefs/` + `.docx` para Word |
| `Apple STORE IOS/` | Apple: rechazos, comprobantes, informes |
| `Apple STORE IOS/REVIEW APPLE/` | Subcarpeta proceso review actual |
| `LANDING/v3/preview/` | Screenshots iteraciones landing v3 (`_v2` es con agregados, sin sufijo es sin agregados) |
| `LANDING/v3/PENDIENTE_REVIEW_17MAY/` | Snapshot completo HTML+PNG+README pendiente review |
| `MARKETING/` | Plan MKT + contexto MKT + assets |

### 9.3 Working copies locales (no commiteados)

| Carpeta | Para qué |
|---|---|
| `~/Desktop/CODE/landing_v3/` | Working copy landing v3 (HTML + 33 capturas + logo Drive) |
| `~/Desktop/CODE/SECRET/` | Credenciales locales (Supabase, PayPal, RC) — nunca commitear |
| `~/Desktop/CODE/screenshots_rc_support/` | ZIP screenshots ticket RC #76809 |
| `~/Desktop/CODE/canvas_demos/aurex_og/` | 4 propuestas OG image generadas con Canvas |
| `~/AurexApp/backups/aab/` | Backups AAB Android (regla obligatoria) |

### 9.4 Memorias persistentes Code

`~/.claude/projects/-Users-fernandomoscon/memory/`

- `MEMORY.md` (índice, auto-cargado al inicio).
- ~25 `project_*.md` (estado vivo del proyecto, snapshots).
- ~30 `feedback_*.md` (reglas de trabajo aprendidas).
- 1 `roles_code_escritorio.md`.

Backup espejo: `~/Desktop/aurex-memory-backup/`.

---

## 10. ARCHIVOS DE REFERENCIA DETALLADA

> Briefs específicos vigentes que este brief maestro APUNTA cuando se necesita profundidad técnica.

| Tema | Archivo de referencia |
|---|---|
| Apple Build 17 análisis completo | `INFORME_GRAL_APPLE_v3_16MAY.md` |
| IAP análisis cruzado + ticket #76809 | `CONSOLIDADO_IAP_v2_16MAY.md` |
| IAP análisis técnico profundo | `ANALISIS_PROFUNDO_COMPRA_IAP_15MAY.md` |
| IAP ticket inicial RC | `TICKET_REVENUECAT_FINAL_15MAY.md` |
| IAP Plan archivo-por-archivo Tier 1 | `PLAN_IAP_TIER1_BUILD34_v2_16MAY.md` |
| IAP Plan B contingencia | `PLAN_B_IAP_SI_RC_NO_RESPONDE.md` |
| Reviews Escritorio Apple | `REVIEW_ESCRITORIO_APPLE_v2_16MAY.md` |
| Reviews Escritorio IAP | `REVIEW_ESCRITORIO_IAP_TIER1_16MAY.md` |
| Landing v3 snapshot pendiente review | `landing_v3_PENDIENTE_REVIEW_17MAY/README.md` |
| Landing v3 stack herramientas | `STACK_HERRAMIENTAS_CODE_AUREX_17MAY.md` |
| Landing v3 mapeo 35 capturas | `CAPTURAS_LANDING_v2_MAPEO_17MAY.md` |
| Landing v3 benchmark competidores | `BENCHMARK_v2_COMPETIDORES_REALES_17MAY.md` |
| Respuesta a Escritorio sobre landing | `RESPUESTA_ESCRITORIO_OK_CODEO_17MAY.md` |
| MKT consolidado v2 | `CONSOLIDADO_MKT_LANDING_v2_16MAY.md` |
| **Apple — reply coexistencia + plan "AurexLive" (Build 33)** | `PLAN_APPLE_AUREXLIVE_REPLY_22MAY.md` |
| **Build 33 — diff del rebrand iOS** | `DIFF_BUILD33_AUREXLIVE.md` |
| **Flujo oficial de compilación iOS + Android** | `FLUJO_BUILD_IOS_ANDROID.md` |
| **Paridad PWA↔nativa (auditoría 6 tabs)** | `AUDITORIA_PARIDAD_CONSOLIDADO_22MAY.md` + `AUDITORIA_PARIDAD_PWA_22MAY.md` |
| **IAP bug resuelto (rebuild limpio `gradlew clean`)** | `DOC_IAP_BUG_RESUELTO_18may2026.md` |

> Todos los briefs SUPERADOS (v1 cuando hay v2, briefs históricos absorbidos en este maestro) viven en `briefs/archive/`. NO se borran, quedan para auditoría.

---

## 11. CHECKLIST 5 LUGARES (regla `feedback_briefs_accesibles_escritorio`)

Este brief maestro cumple en cada actualización:

- [x] Local Code: `~/Desktop/aurex-app/briefs/BRIEF_MAESTRO_AUREX.md`
- [x] Dropbox: `~/Dropbox/AUREX/MAPA DE TRABAJO/BRIEF_MAESTRO_AUREX.md`
- [x] `.docx` espejo: `~/Dropbox/AUREX/MAPA DE TRABAJO/BRIEF_MAESTRO_AUREX.docx`
- [x] GitHub commit + push: cada actualización del brief
- [x] Raw URL HTTP 200 verificada post-push

---

## 12. POLÍTICA DE ACTUALIZACIÓN

### Cuándo actualizar este brief

- ✅ Aparece tema nuevo (bug, oportunidad, decisión) → agregar en sección correspondiente.
- ✅ Cambia estado de un frente (ej Apple responde, RC responde, Fernando da OK landing) → actualizar §1 + sección específica.
- ✅ Se ejecuta un hito (deploy, compilación, fix) → actualizar §1 + sección específica + mover briefs absorbidos a `archive/`.
- ✅ **Pasaron 3 horas desde el último commit del brief maestro** Y hubo cambios relevantes en la sesión → actualizar con hitos acumulados (regla `feedback_brief_maestro_actualizar_3h`).
- ❌ Commit menor de código que no cambia estado de un frente → NO actualizar.
- ❌ Cada hora "por las dudas" → NO actualizar.

### Política de frecuencia en sesiones largas (>3h)

Code mide tiempo desde el último commit del brief maestro. Si pasaron **>3h en una sesión activa con cambios relevantes**, actualiza el brief con los hitos acumulados, commit + push, reporta en 1 línea, y retoma el trabajo. Esto evita perder contexto si el chat se corta o si sesiones de 10-12h llegan al cierre sin haber consolidado.

### Mensaje de commit cuando se actualiza

```
docs(brief-maestro): <sección> — <qué cambió>

Ejemplos:
docs(brief-maestro): §4 IAP — RC respondió ticket #76809 con solución X
docs(brief-maestro): §3 Android — agregar item Z al Build 36
docs(brief-maestro): §5 Landing — Fernando dio OK visual, arranca deploy
```

### Versiones de briefs específicos

- Briefs específicos en `briefs/` (no este maestro) siguen usando `_vN` cuando hay iteraciones (ej `INFORME_GRAL_APPLE_v3`).
- Cuando se publica una nueva versión vN+1, la vN anterior se mueve a `briefs/archive/`.

---

**Fin brief maestro. Se actualiza con cada hito. Una sola URL canónica para Escritorio y Fernando.**

---

## 1.c ACTUALIZACIÓN 20-21 MAY — LANDING REDISEÑO CON VIDEO

**Regla de trabajo establecida:** aurex.live = `index.html` en la RAÍZ del repo `fmoscon-creator/aurex-app` (GitHub Pages, cache 10 min). TODO cambio se pushea ahí y se valida en S (Safari) / C (Chrome) / M (Mobile). El `landing-v3-preview/v2.html` legacy quedó desincronizado y NO se usa más.

**Secciones rediseñadas con VIDEO de fondo (autoplay vía IntersectionObserver — Safari no autoplea off-screen):**
- **HERO**: globo dorado (sesión previa).
- **COBERTURA (#markets)**: video operador (Pexels 47214) · 9 datos en Boldonse · pills al borde · card explicativo fondo negro · título 2 renglones fijos (b4_h2_a/b, 8 idiomas) · label "Cobertura" fondo negro.
- **MOTOR (#engine)**: video FLUJOS (PXFLUJOS_03) Original · opac 79 · contraste 164 · vel 112 · 2 cards (Motor IA 10 var + AUREX Pulse 14 var) en glass · ⓘ de cada chip = badge circular dorado · label "Motor" fondo negro · subtítulo dorado · header arriba con gap.
- **ALERTAS (#alerts)**: video DATOS (Pexels 47796) Dorado · opac 86 · contraste 179 · vel 132 · 4 cards glass bordes dorados textos blancos · label "Alertas" borde+letras BLANCAS · header arriba con gap.

**Otros cambios landing:**
- CARACTERÍSTICAS: grid compactado (4/fila desktop, sin emoji, texto más claro).
- PRODUCTO (#product): subida + indicador "Deslizá →" animado (scroll_hint, 8 idiomas).
- COMENZÁ (#how-it-works): Portfolio ya no arranca desplegado · bordes dorados de solapas más visibles · flecha ▾ → "Ver ▾" (how_ver, 8 idiomas, rota solo el chevron).
- Todas las secciones con video: padding-top reducido (menos scroll entre secciones).

**Videos stock:** 35 descargados a `~/Desktop/CODE/AurexApp/mockups/motor_videos/` (+ Dropbox) vía **Pexels API** (key de Fernando, guardada solo en `/tmp/pexels_key.txt` local — regenerable). Categorías: PXAI, PXFLUJOS, PXCUANT, PXMARKET, PXNET (plexus). Coverr descartado (devolvía videos irrelevantes).

**Previsualizadores** (herramienta de iteración, NO producción) en `landing_v4_videos/`: PREVIEW_cobertura.html, PREVIEW_motor.html, PREVIEW_alertas.html — video + info encima + controles color/velocidad/opacidad/contraste, arrastrables.

**Pendiente landing:** seguir secciones con video alternado (#88) · actualizar copy a Build 32/36 (#86) · backlog #41/#44/#49/#50/#52/#54.

---

## MONETIZACIÓN ANDROID (PayPal) — 21/05

Flujo confirmado: **Google Play cobra al usuario → Google retiene 15% (suscripciones) → el resto se deposita en PayPal AUREX (USD) → Fernando retira MANUALMENTE al banco (USD→ARS, 1-5 días hábiles, tipo de cambio PayPal)**. El dinero queda en PayPal sin vencimiento hasta el retiro manual.

La compra de prueba del 14/5 ($9,99, completada) fue de Fernando y **anterior a la publicación de v1.0.36** (21/05, con fix IAP #76809). Para validar el flujo en la versión publicada conviene una **compra nueva desde la app v1.0.36** (Play Store), reembolsable en Play Console dentro de 48h.

> **Detalle sensible (cuenta bancaria Santander, saldo, movimientos): `Dropbox/AUREX/MAPA DE TRABAJO/DOC_MONETIZACION_ANDROID_PAYPAL.md` — NO se sube al repo público por seguridad.**

---

## 🔁 COBREX — REBRAND iOS BUILD 35 (estado 25-may-2026)

**Plan B Apple 4.1c:** "Aurex/AurexLive" rechazado 3 veces → renombrado iOS a **COBREX** (USPTO/EUIPO limpios; dominio se compra solo si aprueba; hoy aurex.live para URLs). SOLO iOS; Android sigue "AUREX" v1.0.36 sin tocar. Bundle ID / Product IDs / IAP / RevenueCat / Supabase / ícono INTACTOS. Detalle completo: `briefs/PLAN_REBRAND_COBREX_24MAY.md` (v3).

**✅ HECHO:**
- Código texto: brand.js→Cobrex, i18n (272), 7 pantallas, NSPermissions Info.plist (cámara/FaceID/galería).
- Onboarding rediseñado (modo CLARO, logo transparente sin marca HD, 4 ganchos en código i18n 8 idiomas). **80 PNGs** archivados en `Dropbox/AUREX/ONBORDING/ONBORDING IOS BUILD 35 MODO CLARO|OSCURO/`.
- Paywall post-signup (FREE + PRO/ELITE mensual+anual), tab inicial→Mercados, ojo 👁 en repetir-contraseña signup, demo `demo@cobrex.io`/`Cobrex2026` ELITE (Supabase).
- Páginas legales Cobrex vivas (HTTP 200).
- **Connect CARGADO por Escritorio:** App Name+Subtitle, metadata 8 idiomas (TXT en `Dropbox/AUREX/METADATA IOS - ANDROID/METADATA IOS BUILD 35/` + GitHub `briefs/cobrex/`), grupo suscripciones→Cobrex, App Review (demo nuevo, notas Cobrex, PDF namecheap eliminado, publicación Manual).

**⏳ PENDIENTE Build 35 (Code — mañana):** regenerar splash nativo + launch_header a Cobrex; portar onboarding a RN + detección idioma (EN default + device); bump 34→35 + clean + archive + IPA + validar (0 "AUREX" en assets).

**⏳ PENDIENTE envío (Fernando — mañana):** sube Build 35 (Transporter) + screenshots modo claro (iPhone 6.5" + iPad 13") + 2 clics finales. Build 34 quedó OBSOLETO (le faltaban las imágenes).

**⚠️ ABIERTO:** Privacy Policy URL en Connect → está en App Information → info localizable → "URL de política de privacidad" = `https://aurex.live/docs/privacy-cobrex.html`.

**Keys nuevas:** Pexels (`SECRET KEY PEXELS.txt`) y Runway (sin créditos) en `Dropbox/AUREX/CODE/SECRET/`. El SECRET de Desktop está vacío (iCloud); usar siempre el de Dropbox.
