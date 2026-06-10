# 🌟 BRIEF MAESTRO AUREX — Estado vivo del proyecto

> **Archivo único de seguimiento.** Reemplaza los múltiples briefs sueltos. Se actualiza con cada hito.
> **NO bump de nombre** (sin `_v1`, `_17MAY`). La historia vive en `git log`.
> **🔴🔬 PENDIENTE CRÍTICO (10-jun) — REVISAR INTEGRALMENTE LA ARQUITECTURA DE PRECIOS DE LA APP (API/Railway/código) ANTES de opinar/tocar:** se detectó una **inconsistencia grave** con lo que el 10-jun se dio por "cerrado/seguro": **la cascada de ≥3-4 fallbacks (Yahoo→TwelveData→Finnhub→FMP→AlphaVantage) alimenta las SEÑALES IA + Pulse (backend, función ~línea 720 de server.js), NO los precios que el usuario VE en la pestaña Mercados.** Los precios mostrados en Mercados — **el activo principal = ACCIONES de mercado** — van por `app fetchYahoo → /api/yahoo` = **SOLO Yahoo (server.js:2139-2143) + caché 60s (`_yTTL=60000`, server.js:2128), SIN cascada de fallbacks**; el único "fallback" es Yahoo directo desde el teléfono (sigue siendo Yahoo). **Riesgo:** si Yahoo cae o bloquea la IP de Railway → **los precios mostrados quedan en blanco** (las señales IA sí tendrían fallback, el número visible no). Esto es así HOY. **TODO:** (a) auditar integralmente API/Railway/código de TODO el flujo de precios+fallbacks (no opinar sin leer + citar línea); (b) decidir si darle a `/api/yahoo` la misma cascada que las señales (robustez real de los precios visibles); (c) **recién después** evaluar el **auto-refresh** de Mercados — análisis quedó INCONSISTENTE de Code (afirmó "directo/gratis a Yahoo" → es vía Railway; "hay que construir caché" → ya existe 60s; "seguro por caché" y luego "no hacer sin fallbacks"). **Causa raíz de las inconsistencias: opinar sin leer el código integral primero.** NO avanzar con refresh ni dar por robusto el precio de acciones hasta cerrar (a)+(b).
> **⏳ PENDIENTE VALIDAR (10-jun-2026, en 12-24 hs máx) — REVENUECAT "Could not check":** el dashboard de RevenueCat mostraba "Could not check" en el estado de los 4 productos iOS. **VERIFICADO que NO es problema real:** los 4 productos están **APPROVED** en Apple (consultado directo a la API de ASC con la subscription key `S444Z23FMB`, HTTP 200) y las credenciales en RC están **válidas**. Es un **lag cosmético de sincronización del dashboard de RC**. Se tocó el ↺ (refresh) y no cambió al instante → tarda min/horas. **Validar en 12-24h:** que el estado pase a Approved/Active en el dashboard de RC. Si a las 24h sigue "Could not check" → igual es cosmético (no bloquea compras/trial), pero revisar. La key de suscripciones válida: `Dropbox/AUREX/Apple STORE IOS/P8/" P8 de SUSCIPCIONES y COMPRAS"/SubscriptionKey_S444Z23FMB.p8` (Key ID `S444Z23FMB`, Issuer `6960762a-b3c5-4bbc-a74a-828cd50a4399`).
> **⏳ PENDIENTE DE SEGUIMIENTO (01-jun-2026) — SELLER NAME APPLE:** solicitud enviada a Apple Developer Support (Case `102905496721`) para cambiar el nombre del desarrollador de "Fernando gabriel moscon" (minúsculas) → **"Fernando Gabriel Moscón"** (mayúsculas + acento). Es lo que se ve público en la ficha App Store (DESARROLLADOR / Vendedor / Privacidad). No editable desde ASC, requiere aprobación de Apple (hasta 2 días háb.). **Seguir:** revisar mail en fmoscon@gmail.com; al confirmar, verificar la ficha pública; si no responde en 3 días háb., reabrir el caso en developer.apple.com/contact. Ver [[project_pendiente_seller_name_apple]]. + **🟢 SISTEMA DE REPORTES COBREX → TELEGRAM (01-jun, FUNCIONANDO):** reporte diario automático **12:00 AR** al grupo "Cobrex Performance" (bot @Aurexalertas_bot, chat_id `-5115002517`, `PERF_TELEGRAM_CHAT_ID` en Railway). **Todo por APIs (sin carga manual):** ✅ iOS búsqueda+ratings AR/US (iTunes) · ✅ **descargas iOS por país** (ASC Sales Reports, vendor `94182945`) · ✅ **5 últimas reseñas** (ASC, cuerpo completo + corte limpio) · ✅ **Revenue** MRR/subs/trials/activos/nuevos (RevenueCat v2). ⏳ **Android montado y deployado** (Google Play installs+activos por país, bucket `gs://pubsite_prod_7150208556536701506`) — BLOQUEADO solo por la propagación del permiso "informes masivos (solo lectura)" al bucket GCS (403 transitorio; el SA y el código ya están OK → aparece solo al propagar). 🟡 **Semanal (viernes 16h) + mensual (último día 16h) AGENDADOS** con spec día-a-día/%; implementar cuando Android funcione. Ver [[project_sistema_reportes_cobrex]].
> **✅ RESUELTO (10-jun 14:30) — Fernando devuelto a ELITE** tras validar Build 45 (había quedado en FREE a propósito para ver el paywall de inicio). Detalle histórico: su cuenta `fmoscon@gmail.com` (Supabase `usuarios`, id `174187a7-d640-459b-9426-9c28146f4e23`) está en **FREE** a propósito (para ver el paywall de inicio al testear builds — solo FREE auto-abre el paywall, `App.js:47`). **Devolverla a `ELITE` (PATCH `usuarios?email=eq.fmoscon@gmail.com` `{"plan":"ELITE"}`, key en `Dropbox/AUREX/CODE/SECRET/SECRET KEY SUPABASE.txt`) recién cuando el Build 45 esté cerrado y validado.**
> **Última actualización:** 10-jun-2026 (noche) AR — 🤖✅ **ANDROID BUILD 39 (1.0.39) VALIDADO COMPLETO en prueba interna por Fernando.** Porta todo el iOS 44+45 (footer duotone, paywall trial/USD/Gratis, 500+/Metales, reorden filtros, metales sin "Ult.cierre", catálogo 503 SHOP/ZM/TTWO) + específicos Android: **idioma SIEMPRE del dispositivo** (`i18n.js` initLang sin override del guardado — `_lang=detectDeviceLang()`) + **splash sin spinner** (`SplashView.js`). **Validado:** footer, USD+FREE "Gratis", **trial 7 días** (PRO Mensual; ELITE = PLAN ACTUAL), frases/leyenda, 500+/Metales, filtros, metales, tickers, idioma en español, splash limpio. **Trial Android:** configurado en Play Console por Escritorio (`free-trial-7days`, 7 días, "adquisición clientes nuevos", 2 mensuales activos) — RC lo lee en runtime desde Play Billing (no en su dashboard). AAB firmado `backups/aab/Build39/app-release-build39-1.0.39.aab`. **PENDIENTE para promover a PRODUCCIÓN:** (1) Escritorio carga **precios** en Play Console (PRO $4.99/$47.99 · ELITE $9.99/$95.99 + ARG $2.99/$28.99/$4.99/$47.99) + **metadata 350→500 + novedades** (`briefs/build39_android/ESCRITORIO_PLAYCONSOLE_39.md`); (2) Fernando promueve interna→producción. **Opcional Build 40:** que el paywall de INICIO (auto FREE) muestre badge "PLAN ACTUAL" además del botón "Continuar FREE" (decisión pendiente de Fernando) — código compartido, aplica iOS+Android. (Nota: download interno falló con `aurextester12` pero anduvo con `fmoscon` → revisar opt-in de aurextester12.) + ↓
> **Última actualización:** 10-jun-2026 (tarde) AR — 🍎🎉 **iOS 1.3 (Build 45) APROBADA POR APPLE — "Listo para distribución".** **Aprobada el MISMO DÍA del envío** (enviada 14:15 · submission `b6e70757-3064-402c-b96d-c3b0d108b241`). **Release AUTOMÁTICO** → se publica sola en la App Store (verificar etiqueta pública en lookup iTunes en horas). **Incluye los ajustes del Build 45** (precios paywall en USD + FREE "Gratis", disclaimer compacto, metales sin "Ult.cierre" entre semana, catálogo 503 = saca BITF/DESP/HES + agrega SHOP/ZM/TTWO) **+ metadata ficha 1.3** (descripción 350+→500+ + Novedades 1.3, 8 idiomas). **Precios nuevos** (PRO $4.99/$47.99 · ELITE $9.99/$95.99 · ARG $2.99/$28.99/$4.99/$47.99) propagan **11-jun** → revalidar. **🤖 ANDROID en paralelo:** Build 39 (1.0.39) compilado + subido a **prueba interna** (porta todo el iOS 44+45 + idioma siempre-device + splash sin spinner); pendiente validar y promover + paquete Play Console (`briefs/build39_android/`). + ↓
> **Última actualización:** 10-jun-2026 14:15 AR — 🍎🚀 **iOS 1.3 (Build 45) ENVIADO A REVISIÓN DE APPLE — "Pendiente de revisión".** **Submission ID `b6e70757-3064-402c-b96d-c3b0d108b241`** (enviado por Fernando Moscón, 10-jun 14:15). **Release AUTOMÁTICO** (publica solo al aprobar, ~24-48h; para entonces será 11-jun+ → precios nuevos ya propagados). **Build 45 = ajustes sobre Build 44 (validados en TestFlight por Fernando como FREE):** **A)** precios del paywall en **USD** (`currencyCode`+`price`, en vez del "$" ambiguo) + card FREE dice **"Gratis"**; **C)** disclaimer del paywall más compacto; **#2)** metales/futuros/divisas (`=F`/`=X`) **ya NO muestran "Ult.cierre" entre semana** (solo finde); **#3)** se sacan tickers **muertos BITF/DESP/HES** (deslistados, sin datos) y se agregan **SHOP/ZM/TTWO** (503 activos, todos con cotización; backend `activos.json` deployado a Railway — señales IA de los 3 nuevos entran solas con el cron de 10 min). **Metadata ficha 1.3 (Escritorio, 8 idiomas, GUARDADA sin enviar):** descripción **350+→500+** (×2 c/u) + **Novedades 1.3** (trial 7d, 500+/Metales, planes más claros, íconos color, idioma del teléfono). Cuenta demo `demo@cobrex.io`/`Cobrex2026` activa. Docs: `briefs/build45/`. **PENDIENTES tras enviar:** (1) 🔴 devolver a Fernando a **ELITE** (hoy está en FREE a propósito); (2) 🔴 auditar **INTEGRALMENTE la arquitectura de precios** (Mercados = Yahoo-only sin cascada — ver pendiente crítico arriba); (3) **Build 46 iOS:** disclaimer más compacto + **reordenar SHOP/ZM/TTWO alfabético** en el filtro; (4) **precios nuevos** propagan **11-jun** (revalidar en el iPhone). + ↓
> **Última actualización:** 10-jun-2026 (cierre nocturno) — 🍎✅ **BUILD 44 iOS (v1.3) COMPILADO, VALIDADO Y SUBIDO A TESTFLIGHT + revisado por Fernando → Build 45 de ajuste para MAÑANA.** **Compilación:** Archive incremental por CLI (proceso §11; simulador descartado por la lección de la Mac; validación por bundle Metro OK + revisión de código), IPA validado vs Build 43 (única diff = versión 1.3 + build 44 + signing TX7C2F79U9 OK + 8 idiomas en `CFBundleLocalizations`) → Fernando lo subió por Transporter a TestFlight. `~/AurexApp/backups/ipa/Build44/AurexApp.ipa`. **ASC 100% configurado** (Escritorio): base PRO $4.99/$47.99 · ELITE $9.99/$95.99 + **Argentina** PRO $2.99/$28.99 · ELITE $4.99/$47.99 (vigentes **11-jun**) + **free trial 7 días** (Introductory Offer "Gratis 1 semana, sin fecha final") en los 2 mensuales (`pro.monthly`, `elite.monthly2`) — RC lo lee solo, **trial CONFIRMADO funcionando en TestFlight** (botón + pantalla Apple "prueba gratis 1 semana"). **REVISIÓN de Fernando (✅ OK):** footer duotone+pill · reorden filtros · onboarding en español · paywall (período en 4 cards, botón+leyenda trial en los 2 mensuales, frase inline, cards compactas). **📋 BUILD 45 = LISTA DE AJUSTE (`briefs/build45/LISTA_AJUSTE_BUILD45_iOS.md`, se mantiene 1.3 → build 44→45):** **(A)** precios en paywall salen con **"$"** → mostrar **"USD"** (confunde con pesos) 🔴 · **(B)** Apple sheet: mensual "USD" vs anual "U$S" → investigar (config ASC/Apple) · **(C)** disclaimer gris del paywall más compacto · **(#3)** **BITF y HESS salen vacíos** (Yahoo "Not Found": HESS la compró Chevron y dejó de cotizar; BITF no encontrado) → **revisar las 161 acciones nuevas contra la fuente, sacar/corregir las muertas** (destraba señales IA: 499→503) 🔴 · **(#2)** metales muestran "últ. cierre" → verificar si correcto (futuros COMEX = referencia global) o live. **MAÑANA 11-jun:** validar precios nuevos propagados (#12) + arrancar Build 45. NADA se compila sin OK de Fernando. + ↓
> **Última actualización:** 10-jun-2026 — 🍎🛠️ **BUILD iOS EN ARMADO (post-1.2, "Build 44") — código LISTO + validado, configuración de PRECIOS/TRIAL EN CURSO en ASC.** Plan acordado: **simulador DESCARTADO** (lección Mac, §1.f línea 111) → validación por **bundle JS (Metro)** ✅ HECHO (empaquetó toda la app sin errores → 0 imports rotos / 0 crash de carga) + revisión de código → configurar ASC → **Archive → TestFlight** (Fernando ve el paywall real en su iPhone; el simulador/Metro no refleja el paywall real de StoreKit). 
> **🧱 CÓDIGO HECHO Y VALIDADO (bundle OK, no compilado nativo aún):** **(1) Footer DUOTONE** (`navigation/TabNavigator.js` reescrito) — 6 íconos SVG duotone multicolor (`react-native-svg`, **ya en Pods, no requiere `pod install`**) + **pill del activo del color de cada tab** (opción A elegida): Portfolio verde `#3FB950` · Mercados dorado `#D4A017` · Watchlist azul `#58A6FF` · IA violeta `#BC8CFF` · Alertas rojo `#FF7B72` · Perfil gris `#C9D1D9`. **(2) Paywall con FREE TRIAL** (`screens/SubscriptionScreen.js`) — botón **"🚀/👑 Quiero probar gratis 7 días"** en **MENSUAL PRO y MENSUAL ELITE** + leyenda **"Luego $X/mes, cancelás cuando quieras"** ($X = `pkg.product.priceString`, el precio real de la store) + **período (Mensual/Anual) en las 4 cards** + frase corta (Inversor activo / Inversor profesional) **inline entre plan y precio** en los mensuales (cards igual de altas que las anuales) + cards compactadas. ⚠️ `FORCE_TRIAL_DEMO=true` → **apagar antes del Archive** (el trial real lo da la Introductory Offer de ASC/RC). **(3) Onboarding idioma** — `lib/i18n.js` `_lang = detectDeviceLang()` (antes `'en'`) + `Info.plist` `CFBundleLocalizations` (8 idiomas) → **splash/onboarding/login en el idioma del teléfono** (si es uno de los 8; si no, inglés). **(4) "350+"→"500+"** (i18n 8 idiomas). **(5) +161 activos → 503 total** (`lib/assets.js`) + **categoría Metales real** (tab con precios) + backend `activos.json` cubre los 503. **(6) IA cron 5→10 min** (carga Yahoo por +161). Todo: `node --check` + parser JSX + **bundle Metro = OK**. 
> **💵 PRICING DEFINIDO HOY (10-jun):** **Base (todos los países):** PRO **$4.99/mes · ~$47.90/año** · ELITE **$9.99/mes · ~$95.90/año** (anual −20%). **Argentina (geo-pricing, más barato):** PRO **$2.99/mes · ~$28.70/año** · ELITE **$4.99/mes · ~$47.90/año**. **⚠️ AR cobra en USD** (Apple pasó Argentina a dólares) → en el iPhone los precios se ven en **dólares, NO pesos**; el geo-pricing es un precio USD menor para el territorio AR. El código muestra `pkg.product.priceString` = lo que la store devuelve (moneda la decide Apple, no el código). **Free trial:** 7 días, **SOLO mensual PRO + mensual ELITE**, **CON tarjeta**, basado en store (Introductory Offer = **reversible sin build**); al cancelar antes del día 8 no se cobra. 
> **🟠 ESTADO ASC (reporte de Escritorio 10-jun) — precios actuales son los VIEJOS/altos, NUNCA se habían tocado** (se esperaba la 1.2 con precios dinámicos + el análisis de pricing, ambos ya hechos): PRO **$9.99/$99.99** · ELITE **$19.99/$179.99** (PRO anual AR ya personalizado a $89.99). **ASC SÍ permite personalizar AR por país.** **PASOS (orden, "preguntar antes de actuar"):** **(A) EN CURSO** — instrucción enviada a Escritorio para **corregir la BASE** de los 4 productos a $4.99/$47.90/$9.99/$95.90 (es bajar precio, Apple lo aplica sin problema) → espera confirmación de valores. **(B) FALTA** — personalizar **Argentina** (los 4) al geo-pricing. **(C) FALTA en RC/ASC** — crear **Introductory Offer = free trial 7 días** en los 2 mensuales (`pro.monthly`, `elite.monthly2`). **(D) Code** — apagar `FORCE_TRIAL_DEMO` → **Archive → TestFlight**. Product IDs: `pro.monthly` · `pro.annual` · `elite.monthly2` (con "2") · `elite.annual`; Offering `aurex_default`. **Pendientes ligados:** RC "Could not check" (validar 12-24h, arriba) · **Android Build 39** (portar todo este set) · **Pulse Metales** (suma chica al backend: CATS+peso oro/plata/cobre) · refactor catálogo desde backend (diferido). + ↓
> **Última actualización:** 09-jun-2026 — 🔌✅ **ARQUITECTURA DE CONEXIONES DE DATOS reforzada y deployada (backend aurex-backend, 2 deploys a prod).** **(A) CRIPTO (53 activos):** cascada **Binance.US → OKX → Kraken → CryptoCompare → CoinGecko**. Los 4 que Binance.US no lista (INJ, TON, XMR, USDT) se ruteaban a CryptoCompare cada 2 min (quemaba ~720 llamadas/día, 61% del cupo 11k/mes) → ahora a OKX/Kraken (gratis, ∞). CryptoCompare vuelve a fallback real (~0/día). + fix FALSO ROJO en el informe (probes sin API key → CoinDesk daba 401; CryptoCompare estaba SANA). **(B) MERCADOS (297):** cascada **Yahoo → Twelve Data → Finnhub → FMP → Alpha Vantage**. Se sumó **FMP** (key `FMP_KEY` en Railway + `Dropbox/AUREX/CODE/SECRET/SECRET FMP.txt`) → cubre los 32 futuros/commodities (=F) que eran solo-Yahoo (mapeo ES=F→ESUSD…). **(C) Informe HEALTH** rediseñado: orden 1→N + cobertura (N/total) dinámica. **REDUNDANCIA: 347/350 activos con ≥2 fuentes; solo 3 (futuros divisa 6E/6J/6B) dependen solo de Yahoo.** Límites: Binance/OKX/Kraken ∞ · CryptoCompare 11k/mes · CoinGecko 10k/mes · Yahoo s/límite · TwelveData 800/día · Finnhub 60/min · FMP ~250/día · AlphaV 25/día. Docs: `Dropbox/AUREX/CONEXIONES y REPORTES DIARIOS APP/` (.docx/.html/.md). **PENDIENTE:** sumar 150 activos (350→500, prioridad ACCIONES US-listed = 4-5 fuentes seguras, sin riesgo de desborde). ↓
> **09-jun-2026 — 🍎🎉 iOS 1.2 (43) APROBADA Y PUBLICADA por Apple — LIVE en App Store** (verificado por iTunes lookup: versión 1.2, fecha 09-jun, US+AR; release automático). 🟢 **El cambio de precios queda DESBLOQUEADO** (la versión con precios dinámicos ya es la live). **PERO el cambio NO es automático: depende de la DECISIÓN de precios pendiente** — Fernando quería re-evaluar (¿más agresivo? free trial? geo-pricing?). Informe completo en `briefs/cro/REEVALUACION_PRECIOS_09JUN.md` (recomendación: mantener base $4.99/$9.99 = ya el más barato del mercado + **free trial 7 días** + **geo-pricing AR**; NO bajar la base). **Sin apuro:** la 1.2 hoy muestra los precios VIEJOS ($9.99/$19.99) de ASC de forma consistente (lectura dinámica, sin discrepancia) → Fernando decide tranquilo y recién ahí se cambian en ASC. Cron de chequeo iOS borrado (cumplió). **Pendiente:** decidir precios + validar Android Build 38 (prueba interna). + ↓
> **09-jun-2026 01:16 AR — 🤖✅ ANDROID BUILD 38 (1.0.38) COMPILADO Y SUBIDO A PRUEBA INTERNA** (Play Console: "Disponible para verificadores internos", lanzado 09-jun 01:16). **Porta TODO el iOS Build 43** (código RN compartido): i18n 8 idiomas, análisis IA traducido (direcciones+variables+justificaciones), fix crash Watchlist, orden paywall, PRONTO, analytics. **Específico Android hecho:** URL del popup de reseña → Google Play (`market://details?id=com.aurexapp`, por Platform.OS) + bump 1.0.37→**1.0.38 (38)**. **Compilado per FLUJO** (JDK 17 Homebrew, NO el 21 de Android Studio que rompe con IBM_SEMERU; clean + bundleRelease). AAB firmado: `backups/aab/Build38/app-release-build38-1.0.38-20260609_0114.aab` (+ Escritorio Desktop). **Pendiente:** validar en prueba interna (mañana) — sobre todo crash Watchlist, traducciones, IAP, y que el popup abra Google Play. ⚠️ Popup NO sale en este build (gate real 2 días; FORCE=false). Limpieza: borrados 40 AAB viejos sueltos (~3GB), quedan Build37+Build38. **edge-to-edge Android 15** = aviso no-bloqueante de RN core, diferido a build futuro [[project_pendiente_edge_to_edge_android]]. + ↓
> **09-jun-2026 00:35 AR — 🍎🚀 1.2 (43) ENVIADO A REVISIÓN DE APPLE — "Pendiente de revisión".** Submission ID `ea636c54-8769-48f8-b20a-0796dd5c0ad3`. Release **AUTOMÁTICO** (publica solo al aprobar; ~48h, mail a fmoscon@gmail.com). **Metadata 1.2 cargada y validada (8 idiomas):** subtítulo+keywords+descripción+novedades (`briefs/metadata/FICHA_8_IDIOMAS_PARA_CARGAR.md`, descripción con planes precisos = gating real del código), **categoría → Finanzas**, idioma principal Inglés (corregido), notas de revisión actualizadas (sin aurex.ai, + "no trades/no funds" por Finanzas), **demo account `demo@cobrex.io`/`Cobrex2026` VALIDADO (login OK + ELITE)**. **🔴 PENDIENTE URGENTE al aprobar:** cambiar precios en ASC a PRO $4.99/$47.90 · ELITE $9.99/$95.90 — recién con el 1.2 LIVE (trae E=precios dinámicos; el 1.1 tiene hardcoded → cambiar antes = incongruencia). Ver [[project_pendiente_cambio_precios_al_aprobar_b43]]. **Pendientes post-aprobación:** doc definitivo de planes · Android Build 38 (portar) · Web cobrex.io + PWA · Build 44 (copy "PRO push"). Changelog 39→43: `briefs/build39/CHANGELOG_iOS_39_a_43.md`. + ↓
> **08-jun-2026 (noche) AR — 🍎✅ BUILD 43 iOS = 1.2 FINAL, LISTO PARA APPLE (validado en TestFlight).** Se ejecutó toda la serie **39→43** (versión **1.2**). **Changelog completo y claro: `briefs/build39/CHANGELOG_iOS_39_a_43.md`** (mismo set a portar luego al **Android Build 38** — código RN compartido). Resumen: **39** features base (1.h.3-1.h.9 + E precios RC + D analytics + A popup reseña marca Cobrex) · **40** fixes H1-H4 (SOON→PRONTO, doble PLAN ACTUAL, descripciones paywall, detección idioma `Intl`) · **41** i18n COMPLETO de toda la app (~50 keys ×8) · **42** 🚨 fix crash Watchlist (`varDefsT` fuera de scope) + H5 (5 justificaciones del análisis IA generadas por la app, traducen, sin tocar backend) · **43** fix variables del modelo no traducían (`getLang()` en deps del useMemo) + orden paywall consistente (mensual arriba PRO+ELITE). **Resultado:** toda la app + análisis IA (direcciones+variables+justificaciones en Portfolio/IA/Watchlist) traduce en 8 idiomas, sin crashes. **REGLA NUEVA (tras crash B41):** NUNCA compilar sin revisión a fondo (scope/dependencias/runtime/eslint no-undef), ver [[feedback_revisar_a_fondo_antes_de_compilar]]. **EN MARCHA:** metadata/ficha completa en 8 idiomas (todos los campos) para enviar a revisión junto al Build 43. + ↓
> **Última actualización:** 07-jun-2026 (noche) AR — 🍎 **BUILD 39 v2 CERRADO + 🔎 ASO ARRANCADO.** **Build 39:** scope cerrado y validado por Code+Escritorio (`briefs/build39/BUILD39_DETALLE_v1.md` v2): sacado 1.h.2→Build40, A(reseña) con módulo nativo `SKStoreReviewRequest` (la lib `react-native-in-app-review` NO soporta New Arch RN0.84 → descartada), 1.h.6 estructura-primero, E +fallback getOfferings, D +DebugView. **+ ítems D (Firebase Analytics) y E (dinamización de precios).** Listo para EJECUTAR con OK de Fernando + Mac libre. **ASO** (`briefs/aso/ASO_COBREX_borradores.md`, SOLO borradores, nada se cambia live): Escritorio cargó borradores 8 idiomas + detectó **error grave: keywords EN usan 11 de 100 chars (89 desperdiciados desde lanzamiento)**. **🔑 DIRECTIVA Fernando: usar SIEMPRE los 100 chars al máximo** + ser encontrable por Cobrex/Cobrex AI/Cobrex Pulse/Cobrex IA + funciones. Code opina mañana. Ver **§14** (precios/costos). + ↓
> **07-jun-2026 AR — 💵 **NUEVO §14 ECONOMÍA (apartado fijo): COSTOS + PRECIOS.** Costo fijo app verificado = **$15.33/mes** (breakeven 2-5 usuarios → el costo NO restringe el precio; Anthropic $200 es costo de builder, no de la app). **Precios sugeridos (Code, estables, marco fijo en §14.3):** PRO **$4.99/mes · $47.90/año** · ELITE **$9.99/mes · $95.90/año** (anual −20%). Ancla = Delta $5.29 + psicología sub-$5; $4.99 es el precio más bajo CREÍBLE. Caveat: la fuga #1 es activación, no precio. Ver **§14**. + ↓
> **04-jun-2026 AR — 🔬 **EVALUACIÓN CRO/EMBUDO (§13) EN MARCHA + 🐛 BUG "usuarios fantasma" RESUELTO.** 44 cuentas auth sin fila backend → trigger Postgres permanente + heal (usuarios 48→80, 0 fantasmas; lo corrió Escritorio con OK de Fernando, verificado por Code). **Consolidado v1** (coincidencias Code+Escritorio: paywall antes del valor · sin SSO · **activación rota = fuga #1** · geo-pricing · sin analytics): `briefs/cro/CONSOLIDADO_CRO_v1.md`. **DECISIÓN: analytics (Firebase) entran SÍ O SÍ en Build 39 iOS + próximo build Android.** Sigue mañana (precios por mercado + decisiones de producto). NADA se cambia sin OK. Ver §13.7. + ↓
> **03-jun-2026 AR — 🍎 **BUILD 39 iOS — PLAN v3 CONSOLIDADO (listo, EJECUCIÓN MAÑANA).** Plan: `briefs/BUILD39_PLAN_COBREX.md` (raw: `https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/BUILD39_PLAN_COBREX.md`) — validado v1→v2→v3 con Escritorio. **Proceso:** archive por **CLI `xcodebuild`** (NO Xcode GUI), lo ejecuta **Code con OK de Fernando + Mac libre**; Code valida por **revisión de código** (NO simulador, NO trabar la Mac) + preview PNG; Fernando solo sube IPA con **Transporter** + envía a revisión. Clean = `rm DerivedData` + `pod install`. Sigue **v1.1**, solo `CFBundleVersion 38→39`. **Ajustes:** popup reseña (**`SKStoreReviewRequest` nativo** — ⚠️ falta agregar `react-native-in-app-review`, NO instalada, toca Podfile+pod install, riesgo 🔴) · 1.h.2 onboarding animado (reusar `SplashView.js`) · 1.h.3 paywall fresh-install (RC `getCustomerInfo`) · 1.h.4 loading nativo (Code edita XML `BootSplash.storyboard` directo) · 1.h.8 links sin scroll · 1.h.9 Login/Signup i18n + quitar debug · 1.h.7 FAQ i18n · 1.h.6 AI Analysis i18n (condicionales, 🔴) · **keywords ASO** (89 chars c/margen: `cobrex,cripto,acciones,bolsa,trading,alertas,mercados,inversiones,cedears,IA,ETF,finanzas`) · ficha macOS textos ahora (Escritorio, sin build) + capturas diferidas. **Canal Code↔Escritorio = GitHub** (snapshots en `briefs/build39/code_snapshot/`, traducciones en `briefs/build39/translations/`); **Dropbox NO es canal con Escritorio**. **✅ v3 APROBADA por Escritorio (03-jun)** → arrancar mañana por paso 1 (metadata) con OK de Fernando. Ver [[project_build39_ios]]. NADA se compila/envía sin OK de Fernando.
> **02-jun-2026 (PM) AR — 📊 **REPORTE PERFORMANCE MEJORADO + 🎨 MKT EN EJECUCIÓN + 🔎 búsqueda App Store.** **Reporte Telegram (grupo "Cobrex Performance"):** reformulado a SOLO DATOS (análisis/acciones van en el .md de GitHub, NO en el grupo). **Android propagó el permiso GCS → reporte COMPLETO iOS+Android por API.** Mejoras #4+#2 (acumulados + **total combinado 76 instalaciones**) validadas por **PREVIEW** (endpoint `/api/preview-cobrex-perf` que NO envía al grupo — Fernando valida cada cambio ANTES de producción; nada sale al grupo sin su OK). Pendientes reporte: #1 RC desde-lanzamiento (DESTRABADO: Escritorio dio a la key `cobrex-backend-railway` permiso customers:read) + #3 tendencia MRR. Informe `.md` profundo (con análisis) 100% por API → `cobrex-reports` commit `a6f43ad`. **🔎 Búsqueda App Store:** la API da Cobrex #1 AR/US pero el front-end AR no muestra "cobrex" (sí "cobrex ai") → causa: falta keyword "cobrex" en ES (Escritorio verificó); **fix `cobrex`+`cedears` agendado al Build 39** (keywords requieren revisión Apple, no se hace aislado; v1.1 está READY_FOR_SALE). Ver [[project_seguimiento_busqueda_appstore_cobrex]]. **🎨 MKT:** banco de assets poblado (logo Cobrex SVG, badges App Store+Google Play oficiales, fondos gráfico financiero claro/oscuro, búho v2, capturas) replicado SIEMPRE a `Dropbox/AUREX/BANCO IMAGENES REDES SOCIALES COBREX/`; **card testimonio v3 generada** (logo+fondo+badges iguales+footer 6 canales con handles). Plan **v4.6**, D0 tentativo **16-jun**. Ver [[project_sistema_reportes_cobrex]] + [[project_sistema_mkt_cobrex]].
> **02-jun-2026 AR — 📣 **SISTEMA DE MARKETING COBREX DEFINIDO (Plan v4.2) + BANCO DE ASSETS.** **Plan:** `marketing/PLAN_MKT_COBREX_v4.md` (v4.2, primera era COBREX, reemplaza el v3 AUREX obsoleto; raw: `https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/marketing/PLAN_MKT_COBREX_v4.md`). **Lugar común único Code+Escritorio:** repo `aurex-app` → `/mkt/` (Escritorio escribe `content/`; Code render+publica). **🛑 Reglas madre:** (1) NADA se publica sin **OK formal de Fernando** (estado `pendiente_ok`→`aprobado`); (2) **CERO manual** — canal sin API = en espera, sin contenido. **Prioridad de canales por AUDIENCIA AR (no técnica):** #1 **Instagram**, #2 Telegram, #3 YouTube, #4 X, #5 LinkedIn, #6 TikTok. **Design system:** 2 modos — oscuro (cobrex.io) + claro C2 "Navy&Gold" (spec en `Dropbox/AUREX/PALETA COLORES/PALETA CLARA COLORES/`) + tipos (Boldonse/Manrope/JetBrains Mono/Cormorant) + logo>búho (búho debuta pub#10/sem3). **Catálogo de 10 tipos de contenido** con ficha (qué/modo/diseño/assets/skills/quién/dónde). **🎨 BANCO DE ASSETS** `mkt/assets/` (`fuentes/`+`por-canal/` por red con formato/peso) — **SE REPLICA SIEMPRE a `Dropbox/AUREX/BANCO IMAGENES REDES SOCIALES COBREX/`** (regla fija). Videos pesados indexados al repo `cobrex` (no se duplican en Git). **HANDLES (doc oficial `Dropbox/AUREX/REDES SOCIALES/REDES SOCIALES DE COBREX/REDES_SOCIALES_COBREX.md`):** IG `cobrex.io` · TikTok `@cobrex.io` · X `cobrexio` · Telegram `cobrexio` · YouTube `@cobrex-io` (ChID `UCXb6q8eZsHPP4nu6yYm0diA`) · LinkedIn `company/cobrexio`; mail registro `cobrex@cobrex.io`. **APIs:** Telegram+X listas en Railway; IG Graph+YouTube = setup ya (horas); LinkedIn/TikTok = aprobación (semanas). **⚠️ Pendiente crítico:** plan de adquisición de audiencia (0 seguidores hoy). Ver [[project_sistema_mkt_cobrex]].
> **01-jun-2026 AR — 🟢 SISTEMA DE REPORTES COBREX → TELEGRAM FUNCIONANDO** (diario 12:00 AR, grupo "Cobrex Performance"). Por APIs: iOS búsqueda/ratings + **descargas iOS por país** (ASC Sales, vendor `94182945`) + **5 últimas reseñas** (ASC, cuerpo) + **Revenue** (RevenueCat v2). **Android montado** (Google Play installs/activos por país, bucket `pubsite_prod_7150208556536701506`) esperando que Google propague el permiso GCS de "informes masivos" (403 transitorio → aparece solo). **Semanal+mensual agendados** (viernes 16h / último día 16h, formato día-a-día con %). Commits backend (repo `aurex-backend`): descargas iOS `d6c51c4`, reseñas `e6ff631`, Android `269091c`. Ver [[project_sistema_reportes_cobrex]].
> **30-may-2026 (mañana) AR — 🍎✅ **iOS BUILD 38 (Cobrex v1.1) PUBLICADO — LIVE en App Store** (publicación automática; reemplazó la etiqueta vieja 1.0(33); submission `cccb573a`). Resolvió el rechazo del Build 36 (2.3.2 imágenes promo IAP + 3.1.2c link Términos). **REBRAND iOS CERRADO.** 🏆 **El rebrand Cobrex está COMPLETO y PUBLICADO en las 3 plataformas: iOS v1.1(38) + Android v1.0.37 + web/PWA cobrex.io.** **Habilita** el próximo build iOS (post-1.1) para sumar: popup reseña + cosméticos Build 39 (1.h.2-1.h.9) + ficha macOS.
> **30-may-2026 (madrugada) AR — 🌐✅ PWA COBREX MIGRADA A cobrex.io/app + EJE C (paridad) EN PROGRESO + SISTEMA DE REPORTES MONTADO.** **PWA:** rebrand completo (AUREX→Cobrex, sin tocar claves localStorage `aurex_*` ni backend) + mudada a **cobrex.io/app** (verificado live HTTP 200, 0 AUREX) + **redirect** aurex.live/app→cobrex.io/app. **Eje C paridad (publicado en cobrex.io/app):** ✅ gating por tipo de alerta (FREE 5/PRO 14/ELITE 15) · ✅ Mis Alertas (historial `alertas_historial` + campana/badge) · ✅ WhatsApp→SOON · ✅ filtro "Solo favoritos" en Mercados. **FALTA eje C:** gating detalle IA/Pulse · "Cómo usar" (41 claves `cu_*` × 8 idiomas) · persistir alertas · 🔴 #2 Telegram + #3 Push (backend). Trabajo en `~/Desktop/cobrex_web/app/` → repo `cobrex`. **Sistema de reportes Cobrex:** repo privado `fmoscon-creator/cobrex-reports` (+ Dropbox `/Cobrex/Reports/`) + Google Sheet `COBREX_DATA_MASTER` creado en Drive `/Cobrex/Analytics/` (⚠️ falta que **Escritorio** complete: renombrar hoja a DATOS_DIARIOS + crear hojas GEO_SEMANAL/METAS + 5 gráficos) + informe 30-may guardado + cron 9AM (frágil, de sesión). Ver [[project_sistema_reportes_cobrex]]. **Repos:** cobrex_web/aurex-app/cobrex-reports/AurexApp todos commiteados+pusheados (AurexApp ahora incluye el código del rebrand Android 1.0.37 + Build 37/38 iOS). **PENDIENTES próxima sesión (~unas horas, Fernando descansa):** (1) seguir/cerrar eje C PWA · (2) **análisis profundo con skills** (Fernando lo pidió, declarar qué skills se usan) · (3) Escritorio completa el Sheet · (4) popup reseña in-app → Build 1.0.38 Android + iOS post-1.1 · (5) ficha macOS App Store (post-PWA, [[project_pendiente_macos_appstore]]). iOS Build 38 en revisión Apple.
> **29-may-2026 (noche) AR — 🤖✅ ANDROID REBRAND → COBREX (Build 1.0.37) APROBADO Y PUBLICADO POR GOOGLE — ACTIVO EN PRODUCCIÓN** (aprobado MUY rápido, el mismo día). **Verificado:** panel Producción "Activo", versión **37 (1.0.37)**, **177 países**, primeras instalaciones; ficha pública de Google Play ya muestra **"Cobrex"** (sin AUREX), confirmado por Code vía la página pública. Salió TODO junto (build + ficha), 22 cambios, lanzamiento Producción 100%, publicación administrada OFF. **Las 3 plataformas (iOS-publicado + Android-publicado + web cobrex.io) ya unificadas en COBREX.** Promovido de Pruebas internas → Producción (mismo AAB ya probado, sin recompilar). **Incluye:** build **1.0.37** (app ya en Cobrex: app_name, ícono launcher, splash, onboarding 4 slides, balanza/timer ocultos) + **ficha 8 idiomas** (nombre + descripción Cobrex + URLs aurex.live→cobrex.io) + **ícono 512** + **banner 1024×500** + **24 capturas** (TELEFONO 1080×1920 · TABLET7 1350×2400 · TABLET10 1440×2560, en `Dropbox/AUREX/ANDROID/REBRAND ANDROID a COBREX/`) + contacto **support@cobrex.io** + sitio **cobrex.io** + dev name **"Cobrex AI"** + **paywall/4 suscripciones en Cobrex** (descripciones cambiadas en Play Console, verificado EN VIVO en el dispositivo). IDs intactos (`com.aurexapp`, product IDs `com.fernandomoscon.aurex.*`, RC `aurex_default`/`pro`/`elite`). AAB: `~/AurexApp/backups/aab/Build37/app-release-build37-1.0.37-20260529_1928.aab`. ETA Google horas–2 días → publica solo. **Frentes que quedan tras aprobar:** (a) **PWA — migrar URGENTE aurex.live→cobrex.io** (hoy sigue en aurex.live; la ficha Android ya dice "PWA from cobrex.io" → inconsistente hasta migrar); (b) **cosméticos diferidos del Build 39 iOS** (1.h.2-1.h.9) que **también habrá que portar a Android** más adelante; (c) **Plan MKT + contenido + acciones en redes (ATRASADO)**. Ver **§3.5**.
> **29-may-2026 13:13 AR — 🚀 iOS Build 38 v1.1 (38) REENVIADO A REVISIÓN** (submission `cccb573a`, "Pendiente de revisión"). **Resuelve el rechazo del Build 36:** 2.3.2 (imágenes promo de los IAP borradas) + 3.1.2c (link Términos en la descripción 8 idiomas + links Términos/Privacidad + disclosure de renovación EN EL PAYWALL). **+ 4 fixes detectados al probar en TestFlight:** botón Login→i18n, card Perfil (UpsellBanner)→i18n, teclado ya no tapa el botón (ScrollView en Login+Signup), links del paywall más visibles. **+ §1.h.1 Grupo 1 traducciones** + limpieza marca aurex→cobrex (mail `support@cobrex.io` + redes Cobrex + textos compartir cobrex.io). Respuesta + **video comprimido 2MB** adjuntos en Centro de resoluciones. **Ícono verificado LIMPIO** (símbolo dorado sin "AUREX" — confirmado en build + ficha App Store en vivo; lo que se ve con "AUREX" en el header de ASC es cache viejo del Build 17). ETA Apple 24-48h; si aprueba → publica (verificar auto/manual). **Cosméticos/bugs deferidos a BUILD 39** (1.h.2 onboarding animado · 1.h.3 paywall NO debe abrirse a PRO/ELITE · 1.h.4 loading nativo · FAQ Grupo2 · AI-Analysis Grupo3 · links paywall sin scroll 1.h.8 · status msgs Login/Signup 1.h.9). Ver §1.h + nota `REVISION_BUILD37_TESTFLIGHT.md`.
> **29-may-2026 (mañana) — 🍎 iOS Build 36 v1.1 (36) RECHAZADO por Apple** (submission `cccb573a…`, revisado en iPad Air M2). 2 motivos, ambos arreglables: **(1) Guideline 2.3.2** — las imágenes promocionales de los 4 IAP eran el ícono de la app (duplicadas) → **Escritorio las BORRÓ** (no se promocionan); **(2) Guideline 3.1.2(c)** — faltaba link a Términos de Uso (EULA) → **Escritorio lo agregó en la descripción (8 idiomas)** + **Code agregó links Términos/Privacidad + disclosure de renovación EN EL PAYWALL** (`SubscriptionScreen`). **NO es la marca — Cobrex pasó.** → **Build 37 iOS en preparación** (solo TEXTO, riesgo mínimo): fix rechazo + limpieza marca aurex→cobrex (mail `support@cobrex.io` + redes Cobrex + textos compartir cobrex.io) + **1.h.1 traducciones ES hardcodeadas** + 1.h.5 Novedades (texto de Fernando). **Deferido a Build 38:** 1.h.2/1.h.3/1.h.4 (cosméticos/riesgo). Falta: compilar 37 + video (Centro de resoluciones) + reenviar (Fernando). Ver **§1.h**.
> **28-may-2026 (tarde) — 🌐 WEB cobrex.io TERMINADA** + **🟠 registrado el próximo frente: REBRAND ANDROID → COBREX (§3.5)**. Web: landing Cobrex completa (clon de aurex.live + rebrand) con 6 links de redes, capturas, botones App Store/Play/Web y **preview de WhatsApp en español** (título "COBREX — Terminal Global de Mercados" + descripción cobertura completa + imagen hero 1200×630 con los 3 botones, header subido para minimizar negro). Repo `fmoscon-creator/cobrex`, working dir local `~/Desktop/cobrex_web`. **Memoria** consolidada en `~/.claude/projects/-Users-fernandomoscon-Dropbox-AUREX/memory/` (ver §0.a cómo iniciar sesión). **Próximos frentes (INDEPENDIENTES entre sí):** (a) **rebrand Android→Cobrex** — Android v1.0.36 ya publicado, **NO depende de iOS**, se hace cuando Fernando quiera (§3.5); (b) **Build 37 iOS** — NO enviarlo hasta que Apple RESPONDA la revisión del Build 36 iOS v1.1 (§1.h, iOS-vs-iOS). Ver §3.5 + §1 tabla.
> **28-may-2026 01:50 AR — 🚀 iOS Build 36 "Cobrex" v1.1 (36) ENVIADO A REVISIÓN APPLE** (submission ID `cccb573a-8b29-4668-8036-f4c5dfb4e437`, "Pendiente de revisión"). **Publicación AUTOMÁTICA configurada** → al aprobar publica sola en las 8 tiendas. Resuelve el bug "AUREX AI" del Build 35 (7 idiomas no-inglés mostraban "AUREX AI" en la ficha; ahora todos "Cobrex"). El envío incluye: 7 nombres corregidos + 8 Privacy URLs `cobrex.io/privacy.html` (catch crítico de Fernando: era por-idioma, Escritorio había cambiado solo inglés) + 8 URLs soporte/marketing → cobrex.io + 8 What's New + 4 IAPs renombrados (cola paralela de review) + 175 países verificados + capturas Cobrex iPhone/iPad + nuevo splash limpio + onboarding rediseñado (íconos 3D + constelación) + pantalla planes post-login (FREE puede continuar con botón gris + Skip). Cuenta demo Apple: `demo@cobrex.io` / `Cobrex2026` / plan ELITE (verificada en Supabase: creada 25-may, login exitoso confirmado). ETA review: 24-48h. Ver **§1.g.CIERRE**.
> **28-may (paralelo, mientras Apple revisa):** **🎉 REDES COBREX FASE 2 CERRADA — 6 de 6 LISTAS** · Instagram `cobrex.io` ✅ · TikTok `cobrex.io` ✅ · X `cobrexio` ✅ · Telegram canal `cobrexio` ✅ · YouTube `@cobrex-io` ✅ (Brand Account, banner ajustado a safe area 1546×423) · LinkedIn `linkedin.com/company/cobrexio` ✅ (página empresa, 20 especialidades, banner 4200×700). Bio común EN 4 puntos en todas. Banners Cobrex generados en `Dropbox/.../REDES SOCIALES DE COBREX/banners/` con paleta del template AUREX. **Próximo:** arrancar la web cobrex.io con todos los links de redes ya integrados. Ver **§1.i**.
> **27-may (previa):** **iOS Build 35 "COBREX" APROBADO POR APPLE** + **APP PUBLICADA** — Fernando lanzó release + configuró **disponibilidad 175 países**. ⚠️ **Bug detectado en producción:** ficha App Store mostraba "Cobrex" solo en inglés y "AUREX AI" en los otros 7 idiomas (nombre se carga POR IDIOMA en ASC). Build 36 lo arregla. ✅ Contratos verificados in-effect, mail `cobrex@cobrex.io` operativo (Zoho), alias support@ creado, dominio cobrex.io comprado + HTTPS LISTO con cert Let's Encrypt. Ver **§1.f** + **§1.g**.
> **25-may (previa):** iOS Build 35 ENVIADO a revisión (25/05 14:02, submission `e0e7fb35-11a4-4c1d-854c-60a80c4799e6`). Rebrand **"AurexLive" → "Cobrex"** SOLO iOS (nombre original acuñado, sin relación con aurex.ai/Beinex), tras el 3er rechazo 4.1c. Build 35 = textos Cobrex en 8 idiomas + **splash nativo COBREX** + onboarding RN + `CFBundleDisplayName=Cobrex` (v35) + 20 capturas (iPhone 6.5" 1242×2688 + iPad 13" 2048×2732). Android 36 sigue "AUREX" en producción (intacto). Ver **§1.f**. ✅ **Formulario fiscal Play Console (W-8BEN) COMPLETADO y APROBADO 25-may** (válido hasta 2029; 30% solo sobre ingresos US-sourced, resto del mundo sin retención). ⚠️ **Google Search Console: error de indexación 404 (msg WNC-20237597)** en aurex.live — 🟡 **DIFERIDO hasta que Apple resuelva** (no tocar el sitio durante la revisión; análisis + opciones en §1.f).
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

> ## 🚨 REGLA MADRE — Escritorio NUNCA toca/lee/extrae del código (no tiene acceso al código vivo)
> El código real vive en la máquina de Code (`~/AurexApp`, repo privado). **Escritorio NO lo ve** — solo ve "fotos" (snapshots) que pueden estar viejas. Por eso:
> - **Escritorio NUNCA extrae strings del código, ni traduce leyendo el código, ni audita el código por su cuenta** → trabajaría sobre algo desactualizado (pasó con las traducciones de Signup, 08-jun: tradujo un campo "Nombre" que no existe).
> - **El flujo correcto:** para CUALQUIER cosa basada en el código (traducciones, textos de UI, auditorías de strings), **Code extrae el contenido EXACTO y verbatim del código vivo y se lo pasa a Escritorio. Escritorio SOLO traduce/opina sobre esa lista.** Nunca al revés.
> - Cuando Code le pasa la estructura/lista exacta → sale bien (ej. 1.h.6 AI Analysis ✅). Cuando Escritorio "lee el código" → sale desactualizado (ej. 1.h.9 ❌). Aprendido 08-jun.

---

## 0.a 🚀 CÓMO INICIA UNA SESIÓN NUEVA DE CODE (leer SIEMPRE primero)

> **Esto resuelve "cada chat me dice algo distinto de cómo empezar".** Es el procedimiento único y definitivo. Vale tanto para Fernando (qué escribir) como para Code (qué leer antes de responder).

### 1) Comando para abrir Code (Fernando, en Terminal.app)
```
cd ~/Dropbox/AUREX
claude --add-dir ~/Downloads ~/Desktop
```
- **Arrancar SIEMPRE desde `~/Dropbox/AUREX`** (no desde el home `~`, no desde `~/AurexApp`). El directorio de arranque define qué carpeta de memoria usa Code — si cambia, la memoria "se parte" y no se autocarga (pasó: quedó repartida en 3 carpetas).
- `--add-dir` suma Escritorio y Descargas al alcance. Resultado: Code accede a `~/Dropbox/AUREX` + `~/Downloads` + `~/Desktop` (verificado: lee y escribe en los 3).

### 2) Texto para pegar como primer mensaje (Fernando)
```
Retomamos AUREX/Cobrex. Leé tu memoria consolidada y el brief maestro
(~/Dropbox/AUREX/MAPA DE TRABAJO/BRIEF_MAESTRO_AUREX.md), ponete al día
con TODOS los frentes y recién ahí respondé.
```

### 3) Qué tiene que LEER Code antes de responder (orden)
1. **MEMORIA CONSOLIDADA — fuente viva, lo más actual:**
   `~/.claude/projects/-Users-fernandomoscon-Dropbox-AUREX/memory/`
   (125 archivos al 28-may-2026: `MEMORY.md` índice + `project_*` + `feedback_*` + estados Cobrex). **Solo se autocarga si Code se abrió desde `~/Dropbox/AUREX`.** Empezar por `MEMORY.md` (índice de una línea por memoria) y abrir las relevantes al tema.
2. **BRIEF MAESTRO — estado de todos los frentes:** este archivo.
3. Para profundidad técnica → §10 "Archivos de referencia".

> ⚠️ **Carpetas de memoria viejas (NO usar como fuente, ya consolidadas acá):** `-Users-fernandomoscon/memory/` (117, hasta 26-may) y `-Users-fernandomoscon-AurexApp/memory/` (9, hasta 28-may) quedaron fusionadas en la carpeta de arriba el 28-may. El backup `~/Desktop/aurex-memory-backup/` es de 3-may = viejo, ignorar. Si en el futuro la memoria se vuelve a partir (porque se abrió Code desde otra carpeta), consolidar de nuevo en la carpeta `-Dropbox-AUREX`.

---

## 1. RESUMEN EJECUTIVO — todos los frentes en 1 tabla

| Frente | Estado | Próxima acción | Bloqueante externo |
|---|---|---|---|
| 🍎 **Apple iOS — Build 36 "Cobrex" v1.1** | 🔴 **RECHAZADO 29-may** (2.3.2 imágenes promo IAP = ícono · 3.1.2c faltaba link Términos). **NO es la marca.** Metadata ya corregida (Escritorio). Ver §1.h | — (lo reemplaza Build 37) | — |
| 🍎 **Apple iOS — Build 38 "Cobrex" v1.1 (38)** | ✅ **PUBLICADO 30-may — Cobrex v1.1 (38) LIVE en App Store** (publicación automática; reemplazó la etiqueta vieja 1.0(33)). Resolvió el rechazo del Build 36 (2.3.2 + 3.1.2c). **REBRAND iOS CERRADO.** Resuelve el rechazo del Build 36: 2.3.2 (imágenes promo IAP borradas) + 3.1.2c (link Términos en descripción 8 idiomas + links Términos/Privacidad + disclosure de renovación en el paywall). Incluye 4 fixes detectados en TestFlight del 37/38: botón Login→i18n, card Perfil (UpsellBanner)→i18n, teclado ya no tapa el botón (ScrollView Login+Signup), links paywall más visibles. Respuesta + video (`VIDEO_PLANES_COBREX_comprimido.mp4`) adjuntos. Commit `2169640` | Esperar Apple (24-48h). Si aprueba → publica (verificar auto/manual como en Build 36) | Apple Review |
| 🍎 **iOS Build 35 "Cobrex"** | ✅ **APROBADO + PUBLICADO** (26-may aprobado, 27-may publicado en 175 países). ⚠️ Quedó con bug: ficha App Store muestra "Cobrex" solo en inglés y "AUREX AI" en los otros 7 idiomas (nombre se carga POR IDIOMA en ASC; Escritorio había cambiado solo el Inglés). **Build 36 lo arregla.** Ver §1.f | — (será reemplazado al aprobar Build 36) | — |
| 🍎 **iOS Build 33 "AurexLive"** | ⚪ **SUPERADO por Build 35.** Quedó en revisión con `CFBundleDisplayName=AurexLive`; Build 35 lo reemplaza con "Cobrex". | — (histórico, ver §1.e) | — |
| 🍎 **iOS Build 32 (v1.0 · 32)** | ⚪ **SUPERADO por Build 33.** Quedó en TestFlight validado, pero con `CFBundleDisplayName="AUREX"`. Build 33 lo reemplaza con "AurexLive". | — (histórico) | — |
| 🤖 **Android Build 36 (v1.0.36)** | 🟢 **PUBLICADO en PRODUCCIÓN** + **IAP VALIDADO con compra REAL** (24-may: PRO Mensual USD 9.99 cobrado + cancelación, cuenta app.aurex). | ✅ **Formulario fiscal W-8BEN COMPLETADO y APROBADO (25-may, válido hasta 2029)** — 30% retención solo sobre ingresos US-sourced; resto del mundo sin retención (Argentina sin tratado). #90 (futuro): nombre cuenta dev + edge-to-edge | — |
| 🤖 **Android Build 33 producción** | 🟢 PUBLICADO Play Store (queda como producción hasta que 36 apruebe) | Será reemplazado por Build 36 | — |
| ✅ **IAP / RevenueCat #76809** | 🟢 **RESUELTO + VALIDADO EN PRODUCCIÓN REAL** (24-may: compra PRO Mensual USD 9.99 + cancelación, ambas OK en RevenueCat y en el dispositivo) | — (cerrado) | — |
| 🎨 **Landing aurex.live (index.html root)** | 🟢 **DEFINITIVA y lista para compartir** — 4 fixes mobile (Deslizá, MOTOR/PULSO video, footer) + card SÍ/NO rediseñado (8 idiomas) + **SEO completo** (favicon, robots, sitemap, noindex, fix noindex heredado, Search Console verificado) | **Barrido funcional pre-difusión** (newsletter/descargas/canales/cotizaciones) + copy a Build 36 (#86) | OK Fernando |
| 📋 **Plan MKT + contenido + redes** | 🟡 **ATRASADO — prioridad tras cerrar rebrand** (Fernando 29-may). Redes Cobrex ya creadas (§1.i) pero falta arrancar acciones/contenido | Leer `MARKETING_CONTEXT_AUREX` → definir canales/piezas/calendario con Fernando | — |
| 🌐 **PWA en cobrex.io/app** | 🟢 **EJE A+B HECHOS (30-may): PWA Cobrex LIVE en cobrex.io/app** — rebrand marca completo (AUREX→Cobrex en HTML/JS/manifest/10 íconos/logo, claves localStorage `aurex_*` y backend Railway intactos) + mudada a cobrex.io (verificado en vivo: HTTP 200, 78 "Cobrex"/0 "AUREX", CORS backend `*` abierto). Backup en `aurex-app/app/_backup_pre_cobrex/` | **Falta eje C (paridad con Build 37/38)** + redirect aurex.live/app→cobrex.io + sacar "INVEST AI" | — |
| 🌐 **Web cobrex.io** | 🟢 **TERMINADA (28-may)** — landing Cobrex completa (clonada de aurex.live + rebrand) + 6 links redes + capturas + botones App Store/Play/Web + **preview WhatsApp en español** (título "COBREX — Terminal Global de Mercados" + imagen hero 1200×630 con los 3 botones). Repo `fmoscon-creator/cobrex`, working dir `~/Desktop/cobrex_web` | SEO (Search Console + sitemap) cuando convenga | — |
| 🤖 **Rebrand Android → Cobrex (Build 1.0.37)** | ✅ **APROBADO + PUBLICADO 29-may — ACTIVO EN PRODUCCIÓN** (verificado: Producción "Activo", v37 (1.0.37), 177 países; ficha pública ya en "Cobrex"). Salió todo junto (build + ficha 8 idiomas + ícono/banner/24 capturas + contacto cobrex.io + dev name "Cobrex AI" + paywall Cobrex). IDs intactos. Ver §3.5 | — (cerrado). Próximo frente: **PWA→cobrex.io (urgente)** + MKT | — |
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
- **Verificado 25-may:** el build en revisión es el **35** (campo "Compilación" = 35; el título "1.0 (33)" es solo una etiqueta vieja del registro de versión, NO afecta — Apple revisa el 35). Publicación configurada en **MANUAL** ✓ (al aprobar NO sale sola → queda "Pendiente de publicación por el desarrollador" hasta que Fernando publique → permite reservar la marca Cobrex ANTES de publicar).
- **Próximo:** esperar respuesta Apple (24-48h). Si aprueba → reservar handles/dominio Cobrex (Fase 2) → recién ahí publicar manual + evaluar coherencia Android/web. Si re-rechaza → ver motivo.

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

### 📧 Mail corporativo @cobrex.io — ✅ OPERATIVO (26-may · Zoho Mail Lite)
- **Gap (Fernando, 25-may):** tiene el dominio **aurex.live** (Namecheap) pero **nunca se configuró el email del dominio** (`hola@aurex.live`, `soporte@aurex.live`…) → viene usando cuentas **Gmail "inventadas"** (fmoscon / app.aurex / support.aurex.live@gmail.com / aurextester12).
- **Cómo se hace (Escritorio):** conectar el dominio a un proveedor de email + agregar **3 registros DNS en Namecheap** (~5 min). Opciones:
  - **Google Workspace** (~USD 6/mes por cuenta) — Gmail con tu dominio; lo más profesional y lo que más conoce Fernando.
  - **Zoho Mail** (gratis hasta 5 cuentas) — para arrancar sin gastar.
  - **Namecheap Private Email** (~USD 1/mes) — básico pero suficiente.
- **Proceso:** 1) contratar el servicio · 2) Code guía los 3 registros DNS en Namecheap · 3) listo, mails `@aurex.live`.
- **🟢 EN CURSO (26-may):** Apple aprobó Cobrex → se desbloqueó. Proveedor elegido: **Zoho Mail Lite** (US$1/mo · ~$12/año). *(El "free" de Zoho ya no existe para dominios propios — lo verificó Escritorio; Google Workspace ~$84/año se descartó por caro.)*
- **Estado del setup Zoho:** plan **pagado** ✅ · dominio `cobrex.io` **verificado en Zoho** ✅ (TXT `zoho-verification=zb28958589.zmverify.zoho.com`, confirmado por dig en Google+Cloudflare) · casilla **`cobrex@cobrex.io`** creada/creándose (super-admin, display name "Cobrex").
- **✅ DNS CARGADO, VALIDADO Y VERIFICADO (26-may):** en Namecheap Advanced DNS — Escritorio ejecutó, Code validó por `dig`+`openssl`. Quedó: **MX** solo Zoho (mx pri10 / mx2 pri20 / mx3 pri50, **cero `eforward` viejos**) · **SPF** reemplazado, uno solo (`v=spf1 include:zoho.com ~all`, sin duplicar) · **DKIM** selector `zmail` (`zmail._domainkey`, clave **RSA 2048 verificada carácter-por-carácter desde el NS autoritativo de Namecheap**). `zoho-verification` intacto; A record (web parking `162.255.119.39`) sin tocar. **Zoho verificó DKIM + MX en verde** ✅. → El correo `cobrex@cobrex.io` **recibe, manda y no cae en spam**.
- **✅ Contraseña seteada (26-may)** por Fernando en el panel Usuarios de Zoho (no se pasó por chat, se guardó en SECRET/gestor). **✅ Test E2E OK (26-may):** mail Gmail→Cobrex y Cobrex→Gmail, ambos sentidos, sin spam → SPF+DKIM funcionando en vivo. El correo `cobrex@cobrex.io` está **100% operativo**.
- **✅ Alias `support@cobrex.io` → `cobrex@` CREADO (26-may) → FRENTE MAIL 100% CERRADO.** **Estructura final:** `cobrex@cobrex.io` (gestión, la usa Fernando) + `support@cobrex.io` (alias público, mismo buzón). Plan: **Zoho Mail Lite ~$15/año, 1 usuario, 10 GB**. NO tocar el DNS de la web.
- **Pendientes menores próxima sesión (cosmético/dispositivos):** 1) **firma HTML** en cobrex@ y support@ (logo fondo negro / letras doradas / "COBREX" + `www.cobrex.io`; Fernando tiene el PNG transparente — **Code puede armar el HTML**) · 2) **config iPhone Mail + Mac Mail**: IMAP `imappro.zoho.com:993` SSL / SMTP `smtppro.zoho.com:465` SSL (hosts validados por Code 26-may, resuelven a IPs Zoho US 136.143.191.x).

### 🎨 Logos COBREX — kit completo generado (26-may)
- Kit de logos COBREX **calcado del de AUREX** (mismo símbolo, mismo dorado **#CB9916**, tipografía **Arial Bold** verificada empíricamente — solo cambia la palabra AUREX→COBREX). **4 sets:** CON/SIN MARCA × OSCURO/CLARO (claro = blanco frío `#EEF1F7`) + 3 transparentes. Todo en `~/Dropbox/AUREX/LOGO COBREX/`.
- **REGLA DE USO (crítica):** firma de mail / Word / PDF / documentos → versión **TRANSPARENTE** (nunca recuadro). Fondo sólido (claro/oscuro) solo para app icons / avatares de redes.
- Specs técnicas completas: `LOGO COBREX/ESPECIFICACIONES_LOGO_COBREX_AUREX_26MAY_v3.docx`. Resumen para Escritorio en GitHub: `briefs/cobrex/RESUMEN_LOGOS_COBREX.md`.

### 🌐 Convergencia web cobrex.io — EN CURSO (web MONTADA 27-may; faltan URLs Connect + build)
- Hoy la app (publicada) apunta a **aurex.live** en: URL de soporte, URL de marketing, Privacy/Terms. Funciona y Apple lo aprobó — dominio viejo, no roto.
- **Migración (en orden):**
  1. ✅ **Web cobrex.io MONTADA (27-may)** — GitHub Pages, repo **`fmoscon-creator/cobrex`**. Sitio **live** en cobrex.io: landing + `/privacy.html` + `/terms.html` (todo Cobrex, contacto **support@cobrex.io**, sin "aurex"). DNS = 4 A de GitHub (185.199.108-111.153) + CNAME `www`→`fmoscon-creator.github.io`. **🔒 Correo Zoho INTACTO** (MX/SPF/DKIM/verificación NO se tocaron, validado por dig). Cert HTTPS provisionando (~1h) → después activar "Enforce HTTPS".
  2. ⏳ PENDIENTE (Escritorio, **sin build**): actualizar en App Store Connect las URLs (soporte/marketing/privacy/terms) → `https://cobrex.io/...` (privacy.html / terms.html). Esperar a que el cert HTTPS esté listo.
  3. ⏳ PENDIENTE (Code, **en el próximo build**): links privacy/terms in-app (`brand.js`) → cobrex.io. ⚠️ "Versión 1.0 (33)" NO se toca.

### ⚠️ DETECTADO AL PUBLICAR (27-may) — revisar/arreglar mañana
- 🟡 **EN OBSERVACIÓN 24h:** en App Store Connect el **Nombre = "Cobrex"** + **capturas = Cobrex** (verificado por Escritorio; subtítulo "AI market analytics", keywords OK). **PERO la tienda PÚBLICA (IMG_2699) AÚN muestra "AUREX AI" + capturas viejas de AUREX** (con logo "aurex" arriba-izq y "Alertas por WhatsApp"). Probable **cache** de la app recién publicada → debería pasar a Cobrex al propagar. **⚠️ Si en ~24h la tienda pública NO cambia a Cobrex → es REAL: escalar (revisar otras localizaciones/versión en ASC, reenviar metadata o contactar Apple).** Reconfirmar buscando "Cobrex" en la App Store del iPhone. Ícono CONFIRMADO por Code (`icon-1024.png` Build 35) = **solo símbolo dorado, SIN texto** = el mismo emblema de Cobrex → OK, NO se toca. **🚫 No promocionar hasta que la ficha pública muestre Cobrex (esperar propagación ≤24h + reconfirmar).**
- 🔴 **Próximo BUILD iOS (Code) agrupa:** **REDISEÑO onboarding** (Fernando: "el diseño es malísimo") — en especial: (1) **logo+marca MUY chico (`AurexLogo size={60}` L80) y pegado arriba (`paddingTop: insets.top+16` L79) → agrandar + reposicionar/centrar**; (2) **los íconos de los 4 slides (gráfico↑ / campana / grilla 2×2 / medidor) son line-art SVG planos dibujados por código → "feos" → reemplazar por íconos MEJOR DISEÑADOS (3D / premium / ilustraciones; las fotos stock de Pexels NO sirven para íconos). Code los integra al código; el diseño 3D/premium se consigue vía Escritorio/set de íconos (Code en terminal no genera imágenes).** + **splash nativo** (asset `BootSplashLogo-092ad1` / `assets/bootsplash`: tiene **fondo cuadrado crema** que no matchea el fondo de pantalla → se ve un recuadro, + artefactos punto-izq/garabato-der horneados → **regenerar con logo TRANSPARENTE limpio + color de fondo del bootsplash que matchee**; aplica iOS+Android. La pantalla RN `SplashView` usa SVG limpio, esa está OK) + migración links privacy/terms in-app → cobrex.io. (Ícono NO entra: solo símbolo, ya OK.) Plan: mockup/preview → OK Fernando → validar en simulador → build.
- 🟢 **En Connect (sin build, cuando cobrex.io esté montada):** URL de soporte + URL de marketing (hoy `aurex.live`) → cobrex.io.
- ⚪ **Se dejan (no afectan al usuario):** Bundle ID `com.fernandomoscon.aurex` + SKU `AUREX2026` (estructurales, no se pueden cambiar sin migrar a app nueva). Categoría "Utilidades/Productividad" OK (cambiar a Finanzas = más escrutinio, no urgente).
- 🟡 **Onboarding: logo/marca COBREX chico y desplazado muy arriba** (IMG_2701) → bug UI en el componente onboarding → requiere **build nuevo**. Agrupar con la migración de URLs privacy/terms→cobrex.io en el próximo build.
- 🟡 **Splash: artefacto gráfico raro abajo-derecha** (IMG_2700) → revisar asset del splash.
- Capturas en `Dropbox/AUREX/ASC/IMG_2700-2709`.

### 🏷️ Cobrex — Plan de reservas de marca (FASE 2 · CONTINGENTE a aprobación Apple · NO ejecutar antes)
- **🎉 APPLE APROBÓ 26-may → Fase 2 EN EJECUCIÓN** (la regla de "no reservar antes de aprobar" ya se cumplió).
- **✅ HECHO — Dominio `cobrex.io` COMPRADO** (26-may-2026 9:19 AR · Namecheap order **203562249** · 2 años → **vence 26-may-2028** · auto-renew ON · WHOIS privacy ON · USD 100.96). **Parkeado/reservado — NO requiere DNS ni config ahora**; el DNS se configura recién al migrar la web `aurex.live`→`cobrex.io` (convergencia, post-publicación). Receipt en `Dropbox/AUREX/DOMINIO WEB/COBREX DOMINIO WEB/`.
- **Pendiente Fase 2 (en orden):** registrar `@cobrexio` en 5 redes + LinkedIn empresa "Cobrex" → ✅ contratos in-effect VERIFICADOS (27-may, todo verde) → ✅ mail @cobrex.io OPERATIVO → **publicar app** (manual, clic Fernando) → convergencia (Android+web→Cobrex). **Único paso previo a publicar que queda: reservar handles `@cobrexio`** (opcional pero recomendado).
- **Disponibilidad de handles (informe Escritorio, verificado 25/05/2026):**

| Plataforma | @cobrex | @cobrexio | @cobrexapp | @cobrexlive |
|---|---|---|---|---|
| X / Twitter | 🔴 Ocupado | 🟢 Libre | 🟢 Libre | 🟢 Libre |
| Instagram | 🔴 Ocupado | 🟢 Libre | 🟢 Libre | 🟢 Libre |
| TikTok | 🔴 Ocupado | 🟢 Libre | 🟢 Libre | 🟢 Libre |
| YouTube | 🔴 Ocupado | 🟢 Libre | 🟢 Libre | 🟢 Libre |
| Telegram | 🔴 Ocupado | 🟢 Libre | 🟢 Libre | ⚠️ Por confirmar |
| LinkedIn | 🟢 Libre | — | — | — |

- **✅ Validación Code (25-may):**
  - `@cobrex` está **ocupado en todas menos LinkedIn** → descartado como handle uniforme.
  - Para coherencia de marca el handle debe ser **el mismo en todas las redes**. Candidatos uniformes (libres en las 5 sociales): **`@cobrexio`** y **`@cobrexapp`**. `@cobrexlive` queda con duda en Telegram.
  - **🏆 Recomendación Code: `@cobrexio`** — es el único que además **coincide con el dominio `cobrex.io`** (handle = dominio = máxima coherencia y memorabilidad). 2ª opción: `@cobrexapp`.
  - **LinkedIn:** crear **página de empresa "Cobrex"** (ventaja: `@cobrex` libre ahí).
- **⚠️ Avisos para el día D:**
  - **Re-verificar disponibilidad el día del registro** — puede cambiar (alguien puede tomar `@cobrexio`/`@cobrexapp` en cualquier momento). Por eso se registra TODO junto, rápido, el día del OK de Apple.
  - Telegram `@cobrexlive` sin confirmar → si se fuera por `@cobrexlive` hay que confirmarlo primero; con `@cobrexio` se evita el problema.
  - Requiere autorización de Fernando + sesión limpia (una sola cuenta) llegado el momento.

---

## 1.g 🍎 BUILD 36 iOS "Cobrex" — TODO LO QUE VA (cierre 27-may-2026)

> **Diseño del arranque CERRADO y validado por Fernando** (claro + oscuro, 8 idiomas). Falta implementarlo en código + los ajustes de abajo. **El Build 36 usa el modo CLARO** (se ve visualmente mejor; el oscuro queda como backup).

### A) Diseño del arranque (6 pantallas) — ✅ CERRADO y GUARDADO
- **Dónde está (Dropbox — lo lee Code):** `~/Dropbox/AUREX/ONBORDING/ONBORDING BUILD 36 IOS CLARO/[idioma]/` y `.../ONBORDING BUILD 36 IOS OSCURO/[idioma]/` — **8 idiomas** (en, es, pt, it, fr, zh, hi, ar), **6 imágenes c/u**: `01_onb1` · `02_onb2` · `03_onb3` · `04_onb4` · `05_splash` · `06_loading` (= 48 por carpeta). Finales sueltos en `~/Dropbox/AUREX/ICON 3D/FINAL/` (`_ONB1_FINAL`…`_ONB4_FINAL`, `_SPLASH_FINAL`/`_SPLASH_FINAL_DARK`, `_LOADING_FINAL`/`_LOADING_FINAL_DARK`, `_CONST_v6` = constelación congelada).
- **Dónde está (GitHub — lo lee Escritorio):** repo **`fmoscon-creator/aurex-app`** → `briefs/cobrex/build36/` (modo claro EN como muestra).
- **Onboarding (4):** íconos **3D** (gráfico / campana / portfolio / gauge, **sin anillo**) · **constelación dorada** en los márgenes (idéntica en las 4, sin pisar logo/texto/botón) · **logo más grande y bajo** · **título Arial Bold tamaño 52** (igual en las 4) · botón **gold (241,194,24)** alto **93** margen **46** texto negro · **"← Back"** en pantallas 2-4 · última: **2 botones** ("Create free account" gold + "I have an account" blanco/borde dorado) + **texto legal** (`aceptar_terminos`).
- **Splash nativo (BootSplash):** logo COBREX **limpio** (sin cuadrado crema ni artefactos) · fondo `#EEF1F7` · constelación · tagline **"YOUR GLOBAL ASSETS PLATFORM"** debajo de COBREX · **SIN "INVEST AI"**.
- **Loading (SplashView):** = splash + **rueda que gira** · **SIN "INVEST AI"** · constelación **visible en claro**.

### B) Cambios de CÓDIGO en el build (Code · `OnboardingScreen.js` + `SplashView.js` + bootsplash)
1. **Onboarding:** reemplazar SVG line-art por íconos 3D + constelación + logo + colores/medidas de (A).
2. **`SplashView.js`:** **quitar "INVEST AI" (línea ~84)** + tagline + constelación visible en claro + fix timing (bootsplash tapa al SplashView).
3. **Bootsplash:** regenerar logo limpio (sin cuadrado crema), fondo `#EEF1F7` (iOS + Android).
4. **Botón secundario onboarding (`OnboardingScreen.js:130`):** hoy hardcodea `backgroundColor:'#1f2530'` (oscuro) → en **modo claro debe ser blanco + borde dorado + texto dorado**. Fix.
5. **`brand.js`:** links privacy/terms in-app → cobrex.io.

### C) ⚠️ PANTALLA DE PLANES post-login — NUEVO, HAY QUE AGREGARLO (Code)
- **Hoy NO se auto-muestra.** Verificado en código: `App.js` va `login/signup → app → tabs (Main)` directo; `RootNavigator` arranca en `Main`. **`SubscriptionScreen` existe y funciona, pero solo se abre cuando el usuario toca "upgrade" o pega contra un límite.**
- **Acordado:** tras el login/signup debe **abrirse la pantalla de planes (SubscriptionScreen)** para invitar a elegir un plan (no obligatorio, puede elegir después). **Code lo agrega** = navegar a `Subscription` la 1ª vez que entra tras signup/login.

### D) Detección de idioma del dispositivo — ✅ YA ESTÁ EN EL CÓDIGO (no requiere cambio)
- Verificado en `i18n.js`: `detectDeviceLang()` lee el idioma del device (iOS `AppleLocale`/`AppleLanguages`); si es uno de los **8** (en/es/pt/it/fr/zh/hi/ar) lo usa, **si no → EN** por default. `initLang()` usa el guardado o detecta. `App.js:102` lo aplica **antes** del onboarding → todo sale en el idioma detectado. (Loading/splash no tienen texto traducible: COBREX + tagline en inglés.)

### E) 🔴 App Store: la ficha sale "AUREX AI" en TODOS los idiomas menos inglés — REQUIERE nueva versión/build
- **Diagnóstico (Code vía iTunes Lookup API, 27-may — NO es cache):** store **US (inglés) = "Cobrex" ✅**, pero store **AR (español) = "AUREX AI" ❌** (mismo `trackId 6761672161`, v1.0(33), mismo build). El **nombre se carga POR IDIOMA**. **Error de la sesión anterior de Escritorio:** cambió **solo el Inglés** a "Cobrex" y dejó **las otras localizaciones (Español + los demás) en "AUREX AI"**.
- **⚠️ CLAVE: cambiar el NOMBRE NO es inmediato.** Apple (pantalla "Información de la app"): *"Para modificar el nombre de la app... crea una nueva versión de la app."* → **requiere nueva versión + build + revisión (~1 día)**. Editar el nombre se guarda pero no sale en la tienda hasta aprobar la versión.
- **Fix:** (1) Escritorio: ASC → Información de la app → "Información que se puede traducir" → cambiar el selector a **cada idioma** y poner **Nombre = "Cobrex"** en TODAS las localizaciones (no solo Español). (2) Code: recompilar con bump de versión. (3) Enviar a revisión.
- **Camino A (rápido, si urge):** build mínimo SOLO-nombre (sin cambios de diseño) → ~1 día → Cobrex en todas las tiendas. **Camino B:** va con el Build 36 completo. **Decisión de Fernando.**

### E-bis) 🔴 Descripciones de los IAP todavía dicen "AUREX" — ASC (Escritorio)
- **Hallazgo 27-may (Code, buscando datos reales en `Dropbox/AUREX/REVENUECAT/INFO SUSCRIPCIONES...al 14.5.docx`):** las descripciones de los 4 productos IAP en ASC dicen **"AUREX"**: *"Full access to all AUREX PRO features"*, *"Premium AUREX AI signals"*. La pantalla de planes (`SubscriptionScreen`) muestra `pkg.product.description` → en la app **Cobrex** se ven con "AUREX".
- **Datos reales:** PRO Mensual `$9.99/mes` · PRO Anual `$89.99/año` · ELITE Mensual `$19.99/mes` · ELITE Anual `$179.99/año`. Offering `aurex_default` (4 packages). IDs `com.fernandomoscon.aurex.{pro,elite}.{monthly,annual}`.
- **Fix (Escritorio, ASC, sin build):** actualizar las **descripciones (y nombres visibles) de los 4 IAP → "Cobrex"** en la(s) localización(es). Bundle ID / product IDs NO se tocan (estructurales).

### E-ter) Pantalla de PLANES post-login — ✅ DISEÑO VALIDADO (27-may)
- Auto-abrir la `SubscriptionScreen` tras login/signup (cambio en `App.js`, Code). El resto NO se rediseña. Planes reales: FREE $0 · PRO $9.99/mes·$89.99/año · ELITE $19.99/mes·$179.99/año.
- **Salida gratis (validado Fernando = A+C):** **(A)** botón **"Continuar con el plan FREE →"** en la card FREE — **fondo gris claro + texto gris oscuro** (respeta el gris `#8B949E` del FREE en Perfil), secundario (no compite con PRO/ELITE). **(C)** link **"Saltar ✕"** arriba-derecha. Ambos → entran a **Mercados** (`initialRouteName="Mercados"` confirmado en `TabNavigator.js:18`).
- Se muestran SOLO cuando se auto-abre tras login (param `fromLogin`); por "upgrade" desde la app sigue el **"← Volver"** actual.
- ⏳ PENDIENTE DEFINIR con Fernando: **¿cuándo auto-abrir?** (cada login / solo signup / solo FREE). Recomendación Code: tras signup + login **solo para usuarios FREE** (no a PRO/ELITE).

### F) URLs cobrex.io — ✅ HTTPS LISTO (27-may, destrabado)
- **HTTPS funcionando** en cobrex.io: cert Let's Encrypt `CN=cobrex.io` (válido hasta 25-ago-2026), **Enforce HTTPS activo** (HTTP→HTTPS 301). Los 3 URLs (`/`, `/privacy.html`, `/terms.html`) dan **200 con candado**. Validado por Code (curl+openssl) + Escritorio. **Bloqueante del build destrabado.** Fix que lo destrabó: borrar+re-agregar el custom domain en GitHub Pages (el cert estaba en estado `None`). DNS Namecheap y correo Zoho NO se tocaron.
- **Escritorio (ASC, sin build):** soporte/marketing/privacy/terms → `https://cobrex.io/...`.
- **Code (en el build):** `brand.js` privacy/terms → cobrex.io.

### CIERRE — BUILD 36 v1.1 (36) ENVIADO A REVISIÓN 28-may-2026 01:50 AR 🚀

**Submission ID:** `cccb573a-8b29-4668-8036-f4c5dfb4e437` · **Estado:** "Pendiente de revisión" · **Publicación:** AUTOMÁTICA al aprobar.

**Lo que se envió (todo verificado pre-clic, doble control Code+Fernando+Escritorio):**

| ✓ | Item | Detalle |
|---|---|---|
| ✅ | **Binario** | Build 36 (v1.1) firmado TX7C2F79U9, IPA en `~/AurexApp/backups/ipa/Build36/AurexApp.ipa` (22MB), subido vía Transporter |
| ✅ | **8 nombres "Cobrex"** | Resuelve el bug "AUREX AI" en 7 idiomas no-inglés del Build 35 |
| ✅ | **8 Privacy URLs** | Todas → `https://cobrex.io/privacy.html`. **Catch crítico de Fernando:** Privacy URL es por-idioma en ASC; Escritorio había cambiado solo el inglés. Sin esa observación, 7 idiomas iban con URL vieja `aurex.live/docs/privacy.html`. Fix realizado en los 8 antes del envío |
| ✅ | **8 URLs soporte/marketing** | → cobrex.io |
| ✅ | **8 What's New** | Texto: "Cobrex rebrand: new onboarding with 3D icons, fixed plan screen post-login, polished launch experience. Bug fixes." (Anotado para Build 37: pulir "corregida tras login" → "al iniciar sesión"; "lanzamiento" → "arranque") |
| ✅ | **4 IAPs renombrados** | Estado "Actualizaciones pendientes de revisión" → Apple los revisa en cola paralela. Reference names internos siguen "AUREX PRO/ELITE" (solo visibles a Fernando, no al usuario; no bloquea) |
| ✅ | **175 países activos** | Verificado en Precio y disponibilidad (no se cayó al crear v1.1) |
| ✅ | **Capturas** | 10 iPhone 6.5" + 10 iPad 13", todas Cobrex (sin AUREX) |
| ✅ | **Promo text / Copyright / Keywords** | Sin AUREX en ningún campo |
| ✅ | **Notas al revisor** | Incluye disclaimer aurex.ai + cuenta demo `demo@cobrex.io` / `Cobrex2026` / plan ELITE (verificada en Supabase 25-may; login exitoso confirmado; ELITE activo en tabla `usuarios`) |
| ✅ | **Categorías / Age rating / EULA** | OK, sin cambios |

**Cambios de código incluidos (commits en rama `dev` de `fmoscon-creator/AurexApp` PRIVADO):**
- `23e78b6` Build 36 code changes (brand, splash, onboarding, planes, i18n, assets).
- `4abe421` Build 33-35 rebrand backup (18 archivos modificados sueltos consolidados).
- `d50f8d6` Build 36 cierre (AnimatedG fix + bootsplash logo + version bump 1.0→1.1, 35→36).

**Archivos clave tocados:** `src/lib/brand.js` (URLs cobrex.io iOS), `src/components/SplashView.js` (sin "INVEST AI", tagline "YOUR GLOBAL ASSETS PLATFORM", constelación visible), `src/screens/OnboardingScreen.js` (íconos 3D + constelación PNG + logo más grande + botón secundario blanco/borde dorado), `App.js` + `src/screens/SubscriptionScreen.js` (auto-abre paywall tras login SOLO a FREE, con botón gris "Continuar FREE" + Skip ✕), `src/lib/i18n.js` (keys `saltar` y `continuar_free` en 8 idiomas), `ios/AurexApp.xcodeproj/project.pbxproj` (v1.1 / 36), `ios/AurexApp/Images.xcassets/BootSplashLogo-092ad1.imageset/*` (logo regenerado limpio sin cuadrado crema), `assets/onboarding/` (PNGs validados onb1-4 + constellation.png), `assets/bootsplash/manifest.json` (bg `#EEF1F7`).

**Lo que NO se tocó (a propósito):** Bundle ID `com.fernandomoscon.aurex`, product IDs IAP, claves RevenueCat (`appl_zLBPCgwahGaLMonmCDvEjKZDHUh`), ícono de la app, Android Build 36 (sigue "AUREX" en producción).

**Próximo paso:** esperar correo de Apple (24-48h típico).
- ✅ Si aprueba → publica automático → "AUREX AI" desaparece de las 8 tiendas en minutos.
- 🔴 Si rechaza → analizar motivo, ajustar, re-enviar.

**Aprendizajes / a no repetir:**
- 🔴 **Privacy URL es POR IDIOMA en ASC, no global**. La sección "Privacidad de la app" del sidebar es global, pero dentro de cada localización de la versión hay un campo separado. Cambiar SIEMPRE en los 8.
- 🔴 **NUNCA inventar el "What's New"**: Code inventó un sample, Escritorio lo tradujo a 8 idiomas. Quedaron 2 palabras a pulir. Para Build 37: Fernando decide la copy real, Code la pone tal cual.
- 🟢 **Cuenta demo SIEMPRE verificarla pre-envío**: existencia + password + plan. Causa #1 de rechazos de Apple es "credenciales no funcionan".

---

## 1.i 📱 REDES SOCIALES COBREX — ✅ 6 de 6 CERRADAS (28-may-2026)

> Setup de redes Fase 2 — handles registrados con coherencia de marca, **mismo bio en todas** (ver [[bio-redes-cobrex]]). Mail registro `cobrex@cobrex.io` (Zoho); cel registro `+54 9 11 7675 2222`; recupero `fmoscon@gmail.com` / `+54 9 11 6789 1320`. Doc detallado en `Dropbox/AUREX/REDES SOCIALES/REDES SOCIALES DE COBREX/REDES_SOCIALES_COBREX.md`.

| Red | Handle final | Link | Estado | Fecha | Notas |
|---|---|---|---|---|---|
| Instagram | `cobrex.io` | [instagram.com/cobrex.io](https://instagram.com/cobrex.io) | ✅ | 27-may | Cuenta Business · categoría Finanzas · bio 4 puntos · contacto cobrex@ + tel |
| TikTok | `cobrex.io` | [tiktok.com/@cobrex.io](https://tiktok.com/@cobrex.io) | ✅ | 28-may | Perfil público · bio idéntica a IG · nombre "Cobrex" |
| X (Twitter) | `cobrexio` | [x.com/cobrexio](https://x.com/cobrexio) | ✅ | 28-may | Banner oscuro 1500×500 · avatar negro · website cobrex.io · location Global |
| Telegram | `cobrexio` | [t.me/cobrexio](https://t.me/cobrexio) | ✅ | 28-may | Canal público · admin desde cel personal Fernando · sin banner (Telegram no usa) · traducción auto pendiente Nivel 3 (sistema boosts) · verificado en vivo por Code |
| YouTube | `@cobrex-io` | [youtube.com/@cobrex-io](https://youtube.com/@cobrex-io) | ✅ | 28-may | Brand Account desde Google personal Fernando · Channel ID `UCXb6q8eZsHPP4nu6yYm0diA` · banner 2560×1440 ajustado a safe area 1546×423 · descripción EN + ES traducida · email contacto support@cobrex.io |
| LinkedIn | `cobrexio` | [linkedin.com/company/cobrexio](https://linkedin.com/company/cobrexio) | ✅ | 28-may | Página empresa · admin desde LinkedIn personal Fernando · sector Servicios financieros · 0-1 empleados · sede Buenos Aires · 20 especialidades · banner formato nuevo 4200×700 · creada junto a AUREX + JORDAN PLAS |

**Bio común (EN, copiada en todas):**
```
🌎 Your Global Assets Platform.
📊 Crypto · Stocks · Markets — real time.
🔔 Smart price alerts.
📈 Portfolio & watchlist in one place.
```

**Assets generados Code 28-may** — en `Dropbox/AUREX/REDES SOCIALES/REDES SOCIALES DE COBREX/banners/`:
- `BANNER_X-TWITTER_oscuro_1500x500.png` (X header)
- `BANNER_LINKEDIN_empresa_oscuro_1128x191.png`
- `BANNER_LINKEDIN_perfil_oscuro_1584x396.png`
- `BANNER_YOUTUBE_oscuro_2560x1440.png`
- `WATERMARK_YOUTUBE_150x150.png`

Script reusable: `/tmp/generate_banners_cobrex.py` (calcado del template AUREX, paleta dorada `#D4A017`/`#FFD84D` + navy `#0D1017`/`#05070D`, fondo constelación; logo `LOGO COBREX/logo_COBREX_transparente_CON_MARCA.png`).

**Próximos pasos:** YouTube (decisión cuenta Google) + LinkedIn empresa → cerrar Fase 2. Una vez cerradas las 6, los links se cargan en el footer de la web cobrex.io.

---

## 1.j 📊 SISTEMA DE REPORTES COBREX — plan completo (01-jun-2026)

**Objetivo:** reporte diario AUTOMÁTICO de performance de Cobrex → Telegram (grupo "Cobrex Performance", 12:00 AR) + escritura automática a Google Sheet (histórico), SIN carga manual de nadie.

**Estado:**
- ✅ Reporte LIMITADO andando (cron 12:00 AR en backend Railway): posición de búsqueda iOS (AR/US) + ratings, vía API pública Apple. Grupo Telegram "Cobrex Performance" (chat_id `-5115002517`, bot `@Aurexalertas_bot`), env var `PERF_TELEGRAM_CHAT_ID` seteada.
- ✅ 3 credenciales generadas por Escritorio + **CARGADAS en Railway**: ASC API key de Ventas (`ASC_KEY_ID=ZXVAN65PXA`, `ASC_ISSUER_ID=6960762a-...`, `ASC_P8_B64`), Google Play service account (`GOOGLE_PLAY_SA_B64`), RevenueCat (`REVENUECAT_API_KEY_V2`).
- ⏳ PENDIENTE = **el código** que consulta las 3 APIs → reporte COMPLETO (paso A en curso).

**Alcance del reporte completo (acordado con Escritorio):**
- Descargas + usuarios activos: iOS + Android (separados + total).
- Apertura **por país** (iOS y Android) + totales por país.
- **Reseñas iOS (ASC) + Android (Play Console)** del día + ratings.
- Ranking de búsqueda + **MRR/suscripciones** (RevenueCat).
- Formato Telegram: **texto compacto por secciones** (📱iOS / 🤖Android / 💰Revenue), con **FECHA DE CORTE visible** (las APIs tienen delay 1-2 días → el dato es de antier, NO es error).
- El backend **escribe el Sheet** automático (histórico) además de mandar Telegram.
- **Validación:** control visual por **MRR** (estable salvo nueva sub/cancelación).

**Fuentes/APIs (credenciales ya en Railway):**
- **iOS** → App Store Connect API (JWT ES256) → Sales Reports (descargas/activos) + reseñas.
- **Android** → Google Play Developer API (OAuth service account). ⚠️ requiere acceso de la service account `cobrex-play-reporter@...` en **Play Console → Usuarios y permisos** (sino **403**) — VERIFICAR.
- **MRR/subs** → RevenueCat API.

**Reparto:** Escritorio generó credenciales (✅ hecho). Code monta el código — **paso A: por etapas (RevenueCat → ASC → Google Play)**, una API por vez, sin romper el backend (alertas/HEALTH/crons).

**⚠️ Entorno (01-jun):** macOS bloqueó el acceso de Code a la carpeta **Desktop** (TCC; el proceso corriente no toma el permiso aunque el toggle esté azul → se recupera reiniciando Code, que Fernando NO quiso). **Workaround en uso:** backend clonado en `/tmp/abk1` (de GitHub), token Railway en `Dropbox/AUREX/railway/`, credenciales en Dropbox — todo accesible sin Desktop. Detalle vivo: [[project_sistema_reportes_cobrex]].

---

## 1.h ⏳ BUILD 37 iOS — EN PREPARACIÓN (resuelve el rechazo del Build 36) + 🔵 BUILD 38 (deferido)

> **Build 36 RECHAZADO por Apple el 29-may** (2.3.2 imágenes promo IAP = ícono/duplicadas · 3.1.2c faltaba link Términos de Uso). **NO es la marca — Cobrex aprobado.** Se arma el **Build 37** para resolverlo. **Decisión de Fernando (29-may): el Build 37 lleva SOLO cambios de TEXTO (riesgo mínimo, sin lógica nueva ni nativo).** Lo cosmético/riesgoso se difiere al **Build 38**.
>
> **✅ SCOPE BUILD 37 (este):**
> - **Fix rechazo:** Escritorio borró las 4 imágenes promo + agregó link Términos en la descripción (8 idiomas) ✅ · Code agregó **links Términos/Privacidad + disclosure de renovación automática EN EL PAYWALL** (`SubscriptionScreen`, clave i18n `legal_suscripcion` en 8 idiomas) ✅.
> - **Limpieza marca aurex→cobrex** (código compartido, sirve también para Android): mail `support@cobrex.io` (Perfil + i18n) · redes Perfil (IG `cobrex.io`/X `cobrexio`/YT `@cobrex-io`) · textos de compartir `aurex.live`→`cobrex.io` (Portfolio/Watchlist/Mercados/IA). ✅ Hecho. *(Único `aurex.live` que queda en `src/` = rama Android de `brand.js`, intencional.)*
> - **1.h.1 traducciones** (ver abajo) — en curso.
> - **1.h.5 Novedades** — texto que define Fernando.
> - **Falta:** compilar 1.1 (37) + Fernando sube + adjunta video en Centro de resoluciones + reenvía.
>
> **🔵 DEFERIDO a BUILD 39+ futuro (Fernando 29-may — cosmético/riesgo; NO entran al reenvío). ⚠️ Nota: "build 38" terminó siendo el reenvío del rechazo (botón Login + card Perfil + teclado + links paywall, validado 29-may), así que estos cosméticos pasan al build 39+:**
> - **1.h.2** Onboarding: constelación animada (titilar) + logo/COBREX más grandes — *cosmético + riesgo (código de animación).*
> - **1.h.3** Paywall fresh-install: leer RevenueCat `getCustomerInfo()` en vez de AsyncStorage `aurex_plan` (hoy en instalación fresca el paywall se abre a PRO/ELITE) — *bug real pero **invisible en producción** (no hay PRO/ELITE pagos) + toca lógica de compra.*
> - **1.h.4** Loading nativo: quitar "Loading…" + spinner sol del `.storyboard` (restos del diseño viejo) — *cosmético + nativo.*
> - **1.h.7 (Grupo 2 de traducciones — FAQ)** El FAQ de Perfil ("¿Qué es Cobrex?", "¿Cómo funciona el Motor IA?", etc.) son **6 preguntas + 6 respuestas** inline **solo en ES+EN** (`PerfilScreen` ~957-962) → faltan pt/zh/hi/fr/it/ar = ~72 traducciones (idiomas difíciles, riesgo de calidad) → pasarlas a i18n con traducción revisada. Deferido del 1.h.1 (no entra al Build 37 por volumen + riesgo de traducción).
> - **1.h.6 (Grupo 3 de traducciones)** "Full AI Analysis" — las frases que justifican la señal (`PortfolioScreen` ~1454+: "Precio subió X en 24hs - momentum alcista…", "RSI14 en X…", "Volumen en línea…") están hardcodeadas en ES **con condicionales embebidos** (alcista/bajista) → reestructurarlas a i18n tiene **riesgo** → deferido del 1.h.1.
> - **1.h.8 (NUEVO 29-may, de la revisión TestFlight del build 38)** 🔵 **Pantalla de planes — links Términos/Privacidad requieren SCROLLEAR para verse.** Fernando: "nadie va a adivinar el scroll". Agregar una línea compacta "Términos · Privacidad" ARRIBA (debajo del subtítulo, visible sin scroll). En build 38 se hicieron más grandes + separador, pero siguen abajo. **NO bloqueó el reenvío** (Apple no objetó el scroll; el rechazo era que NO estaban). Mejora UX/seguridad para build 39.
> - **1.h.9 Mensajes de estado/error en ES en Login/Signup** (`setStatus(...)`: "Email inválido", "La contraseña debe tener al menos 6 caracteres", "Las contraseñas no coinciden", "Este email ya tiene cuenta…", "Revisá tu email / Te enviamos un email…", "Respuesta inesperada", "Red:") → a i18n (8 idiomas). + **quitar debug leftovers** que NO deberían mostrarse al usuario ("Fetch OK — seteando sesion…", "SDK fallo, probando fetch directo…"). Detectado en la revisión del build 37/38; deferido para no arriesgar el reenvío.
> - **Recordatorio:** **1.h.3 = el paywall NO debe abrirse a usuarios PRO/ELITE** (hoy en instalación fresca lee cache vacío y se les abre). Es el bug que Fernando vio en TestFlight. Va en build 39 con el resto.

### 1.h.1 — Auditoría completa de traducciones (strings hardcodeados en ES)

**Problema:** hay strings **hardcodeados en español** en varias pantallas que NO respetan el idioma seleccionado por el usuario. Con idioma EN seleccionado siguen apareciendo en ES.

**Casos CONCRETOS detectados por Fernando (con EN seleccionado, salen en ES):**
1. **`PortfolioScreen`** — card de "Activá análisis técnico avanzado en tu portafolio con señales IA" (o similar) → debe ir por `i18n.js` con 8 idiomas.
2. **`WatchlistScreen`** — debajo de "Your watchlist is empty", aparece en ES "Creá tu primera lista para seguir activos con señales IA".
3. **`PortfolioScreen` → long-press en activo → modal "Full AI Analysis"** → las **5 variables objetivas que lo justifican** salen en ES.
4. **`LoginScreen`** (visto en TestFlight Build 36 — IMG_2732) — botón secundario **"No tengo cuenta — Crear cuenta gratis"** sale en ES aunque el idioma esté en EN.

Fernando: *"claramente hay un montón de cosas no traducidas correctamente"* → auditoría **completa**, no parcial.

**Scope Build 37 (Code):**
1. **Grep amplio** de literales en español en `src/` (`Activá`, `Creá`, `Mirá`, `tu`, `tus`, `señales`, `con`, `para`, conjugaciones rioplatenses, etc.) — excluyendo lo que ya está en `i18n.js`.
2. Por cada string detectado: agregar clave en `i18n.js` con las **8 traducciones** (es/en/pt/it/fr/zh/hi/ar) y reemplazar el literal por `t('clave')` en el componente.
3. Verificar en TestFlight en al menos 2-3 idiomas (EN + PT + ar/zh).
4. **Bonus** (opcional): regla de lint que detecte literales `<Text>...</Text>` con palabras en español (preventivo).

**NO arrancar/enviar Build 37 iOS hasta que Apple RESPONDA (apruebe o rechace) el Build 36 iOS v1.1** (para no chocar dos builds de la MISMA app iOS en revisión simultánea). No tiene relación con Android.

### 1.h.2 — Onboarding (`OnboardingScreen.js`) — 🔵 BUILD 38 (deferido)
- **Constelación no titila / no se anima.** En las 4 onboarding la constelación se renderiza como **imagen estática** (PNG `constellation.png` como background). En el `SplashView` SÍ titila (animado). Para consistencia con el splash que Fernando validó, **la constelación del onboarding debería titilar también**. Solución: reemplazar el `<Image>` estático por estrellas RN renderizadas con `Animated.Value` (replicar el patrón de `SplashView` con ~30 dots animados; usar las mismas posiciones del `_CONST_v6.png` para mantener el patrón aprobado).
- **Logo + COBREX todavía se ven medio chicos** en las 4 ONB (Fernando, viendo IMG_2728-2731). Actualmente: `AurexLogo size={96}` + `COBREX fontSize:22`. Subir a `size={130}` + `fontSize:28` aprox, validar visualmente en TestFlight.

### 1.h.3 — Paywall post-login (`App.js`) — bug fresh install — 🔵 BUILD 38 (deferido; invisible en producción)
- **Bug visto en IMG_2734 (TestFlight Build 36):** el paywall se auto-abrió a Fernando aunque ES PRO ("Current plan" badge en PRO Mensual). Por diseño NO debe mostrarse a PRO/ELITE.
- **Causa:** `App.js` lee el plan de `AsyncStorage` (cache local con clave `aurex_plan`). En instalación fresca (TestFlight) el cache estaba vacío → trató como FREE → mostró el paywall.
- **Fix:** reemplazar la lectura de `AsyncStorage.getItem('aurex_plan')` por `Purchases.getCustomerInfo()` → leer `entitlements.active['pro']` y `['elite']` (verdad real de RevenueCat, no cache). Si RC devuelve PRO/ELITE → no abrir paywall.
- ⚠️ **En producción NO hay PRO/ELITE reales todavía** → este bug es invisible para usuarios reales, por eso NO bloquea Build 36.

### 1.h.4 — Loading screen (storyboard nativo) — artefactos heredados — 🔵 BUILD 38 (deferido)
- Visto en IMG_2727: el splash nativo muestra el logo Cobrex limpio (✅ el fix de Build 36 funcionó) PERO mantiene del storyboard antiguo un texto **"Loading…"** + un **spinner tipo sol** que NO son del diseño aprobado. Vienen del `BootSplash.storyboard` / `LaunchScreen.storyboard` (heredado de Build 35).
- **Fix:** revisar el .storyboard del bootsplash en `ios/AurexApp/` y eliminar el `UILabel "Loading..."` + el `UIActivityIndicator`. Dejar solo el logo + fondo.

### 1.h.5 — Pulir copy "What's New" (cosmético)
- El What's New del Build 36 quedó con dos palabras que conviene refinar en próximas versiones (Code inventó el sample, Escritorio tradujo, Fernando lo detectó tarde):
  - "fixed plan screen post-login" / "pantalla de plan **corregida tras login**" → es comportamiento NUEVO, no bug fix. Reescribir: "pantalla de planes **al iniciar sesión**".
  - "polished launch experience" / "experiencia de **lanzamiento** mejorada" → "lanzamiento" en ES es ambiguo (release vs arranque). Reescribir: "**arranque renovado**".
- **Para Build 37 y futuros**: el texto de What's New lo decide Fernando (Code NO inventa, regla dura — ver `feedback-nunca-inventar.md`).

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

### 3.5 ✅ Rebrand Android "AUREX" → "COBREX" — APROBADO Y PUBLICADO, ACTIVO EN PRODUCCIÓN (29-may-2026)

> **✅ CIERRE 29-may-2026 (noche AR) — APROBADO Y PUBLICADO POR GOOGLE EL MISMO DÍA.** El rebrand Android se ejecutó por fases (Code + Escritorio + Fernando), se envió a Google y **Google lo aprobó y publicó en horas**. **Verificado:** panel Producción "Activo", versión **37 (1.0.37)**, **177 países**, primeras instalaciones; la ficha pública de Google Play ya muestra **"Cobrex"** (Code lo confirmó vía la página pública). Salió **TODO junto** (build + ficha), 22 cambios, Producción 100%, promovido de Pruebas internas → Producción (mismo AAB ya probado, sin recompilar). **Con esto las 3 plataformas (iOS + Android + web) quedan unificadas en COBREX.**
>
> **Lo que se hizo y envió:**
> - **FASE 1-2 código/nativo (Code):** `brand.js` flip a Cobrex + `HIDE_HEADER_LEGAL` (oculta balanza/timer en ambas plataformas) en 5 screens + `LiveIndicator` · `strings.xml` app_name AUREX→Cobrex · `MainActivity.kt` fix crash (onCreate(null)) · TabNavigator fontSize 8 · 10 mipmaps launcher + 5 bootsplash regenerados a Cobrex · versionCode 36→37 / versionName 1.0.37.
> - **FASE 3 build (Code):** `./gradlew clean` + `bundleRelease` con **JDK 17 (Homebrew openjdk@17, NO el 21 de Android Studio)** → AAB firmado `~/AurexApp/backups/aab/Build37/app-release-build37-1.0.37-20260529_1928.aab` (59,5 MB, versionCode 37, package `com.aurexapp`, app_name Cobrex). Probado por Fernando en Internal Testing (splash + 4 onboarding + paywall, todo Cobrex).
> - **FASE 4 metadata (Escritorio en Play Console):** 4 suscripciones nombres+descripciones AUREX→Cobrex (paywall verificado EN VIVO mostrando Cobrex) · ficha 8 idiomas nombre+descripción Cobrex · URLs aurex.live→cobrex.io (2 líneas × 8 idiomas) · contacto email `support@cobrex.io` + sitio `cobrex.io` · dev name "AUREX AI"→"Cobrex AI" (nivel cuenta, lo hizo Fernando).
> - **Assets (Code):** ícono ficha `cobrex_icon_512.png` (512×512 RGBA) + banner/gráfico de funciones `cobrex_banner_1024x500.png` + **24 capturas** (8 × 3 formatos: TELEFONO 1080×1920 · TABLET7 1350×2400 · TABLET10 1440×2560, todas 9:16 con márgenes laterales del color de la app para no recortar header/tabs; en `Dropbox/AUREX/ANDROID/REBRAND ANDROID a COBREX/{TELEFONO,TABLET 7,TABLET 10} ANDROID/`).
> - **IDs intactos (NO cambian, romperían cobros):** `com.aurexapp`, product IDs `com.fernandomoscon.aurex.*`, RC `aurex_default`/`pro`/`elite`.
>
> **Pendientes tras la aprobación de Google:**
> - 🔴 **PWA — migrar URGENTE aurex.live→cobrex.io** (hoy sigue en aurex.live; la ficha ya dice "PWA installable from cobrex.io" → inconsistente hasta migrar). Ver memoria [[project_pendiente_migrar_pwa_cobrex]].
> - 🟡 **Cosméticos diferidos del Build 39 iOS** (§1.h: 1.h.2 onboarding animado · 1.h.3 paywall no a PRO/ELITE · 1.h.4 loading nativo · FAQ Grupo2 · AI-Analysis Grupo3 · 1.h.8 links paywall sin scroll · 1.h.9 status msgs Login/Signup) → **también habrá que portarlos a Android** después (mismo código RN compartido).
> - 🟡 **RevenueCat display names** (offering "AUREX PLANS" + "AUREX Pro/Elite") → Cobrex — interno/cosmético, no lo ve el usuario, no urgente.
> - 🟡 **Plan MKT + contenido + acciones en redes** (atrasado).
>
> _(Debajo, histórico del plan original.)_

### 3.5-bis 🟠 (HISTÓRICO) Plan original del frente — Unificar marca Android "AUREX" → "COBREX" (post-web)

> 📋 **PLAN INTEGRAL v1 ESCRITO (28-may)** → `MAPA DE TRABAJO/PLAN_REBRAND_ANDROID_COBREX_v1.md` + paquete de código real para control de Escritorio `CONTROL_CODIGO_REAL_REBRAND_ANDROID.md`. **Publicados en repo público** para Escritorio: `briefs/rebrand_android/` (raw: `…/main/briefs/rebrand_android/PLAN_REBRAND_ANDROID_COBREX_v1.md`). **Flujo:** Code escribió v1 (solo con código real) → Escritorio valida + manda info Play Console/RevenueCat (CP1) → v2 → Fernando aprueba → ejecutar. **Hallazgo clave:** RN = código JS compartido → el rebrand iOS Build 36 ya está en el código de Android; falta flip de `brand.js` + nativo Android + metadata. **3 decisiones pendientes de Fernando** (balanza/timer en Android, nombre listing full Cobrex vs ASO, notification channel id).

> **DECISIÓN DE FERNANDO (28-may-2026):** ahora que **iOS "Cobrex" está APROBADO y PUBLICADO** (Build 35 aprobado, Build 36 en revisión) y la **web cobrex.io quedó terminada**, hay que **unificar TODA la marca en COBREX**. Hoy la marca está dividida: iOS = Cobrex, pero **Android sigue "AUREX"** en Google Play. El próximo frente grande de trabajo es **renombrar la app Android AUREX → Cobrex**.
>
> **ORDEN ACORDADO:** 1) ✅ Web cobrex.io (hecha, 28-may) → 2) ⏳ **Rebrand Android → Cobrex**, cuando Fernando lo decida.
>
> ⚠️ **Android es TOTALMENTE INDEPENDIENTE de iOS.** Android v1.0.36 ya está publicado en Google Play hace semanas; su metadata y revisión (Google Play) **NO se cruzan** con las del App Store (iOS). El rebrand de Android **NO depende** de la revisión del Build 36 iOS ni de nada de Apple — se hace cuando se quiera. *(La única regla de "esperar la revisión" aplica a NO enviar el **Build 37 iOS** hasta que Apple responda el **Build 36 iOS** — eso es iOS-vs-iOS, misma app; ver §1.h. Nada que ver con Android.)*

**Alcance del rebrand Android (verificado en código real `~/AurexApp`):**
- **Nombre en la ficha de Google Play** (listing de la tienda): campo editable en Play Console → **metadata, NO requiere nuevo AAB**; revisión Google en horas/días.
- **Nombre debajo del ícono (en el teléfono):** sale de `app_name` en `android/app/src/main/res/values/strings.xml` → **hoy = `AUREX`** → cambiar a **`Cobrex`** + bump `versionCode` + **nuevo build + revisión Google**. Simple (1 línea + build menor).
- **Textos internos:** headers de las pantallas, i18n, splash/onboarding → portar lo mismo que se hizo en iOS Cobrex (Build 35/36) a Android. Cruzar con el código iOS ya rebrandeado.
- **Ícono:** ya es solo el símbolo dorado (sin texto) → NO se toca, sirve igual para Cobrex.
- **`applicationId` / `namespace` = `com.aurexapp`** → **PERMANENTE, NO cambia** (no tiene relación con el nombre visible; no rompe instalaciones/IAP/RC). ⚠️ NO confundir con el bundle ID iOS `com.fernandomoscon.aurex`.
- **Web/legales/redes/mail:** ya están en Cobrex (cobrex.io, support@cobrex.io, redes @cobrexio). Tras el rebrand Android, las 3 plataformas (iOS + Android + web) quedan unificadas en COBREX.

**Pendiente al arrancar:** definir si el listing Android conserva algo de "AUREX" por ASO/continuidad o se va full Cobrex (decisión de Fernando). Recomendación: full Cobrex para coherencia total.

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
**0. ⚠️ ENTORNO Java (CRÍTICO, prefijar SIEMPRE antes de `./gradlew`):** macOS no tiene JDK en PATH → gradle falla "Unable to locate a Java Runtime". Y el JDK de Android Studio (jbr) es **JDK 21, INCOMPATIBLE** (rompe con `JvmVendorSpec IBM_SEMERU`). **Usar JDK 17 de Homebrew:**
```bash
export JAVA_HOME="/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home"
export ANDROID_HOME="/opt/homebrew/share/android-commandlinetools"
export PATH="$JAVA_HOME/bin:$ANDROID_HOME/platform-tools:$PATH"
```
(+ `android/local.properties` con `sdk.dir=$ANDROID_HOME`). Detalle: memoria `project_android_local_setup.md` + `FLUJO_BUILD_IOS_ANDROID.md`. *(Aprendido 29-may build 37: jbr 21 rompió, JDK 17 anduvo.)*
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

## 13. EVALUACIÓN CONVERSIÓN / EMBUDO (CRO) — v1 (03-jun-2026) · 🔬 EN EVALUACIÓN

> **🛑 REGLA MADRE — NADIE TOCA NI CAMBIA NADA.** Mientras dure esta evaluación, **no se modifica absolutamente nada** de lo que existe hoy: ni app, ni paywall, ni onboarding, ni precios, ni planes, ni tiendas. Es **100% diagnóstico** (observar, medir, leer, analizar, verificar). Cualquier cambio futuro se decide **aparte**, recién cuando el análisis esté validado, y **siempre con OK explícito de Fernando**. Esto se evalúa **con tiempo y sin urgencia**.

### 13.1 El problema a entender
Hay **descargas reales** (~77: iOS 33 + Android 44) pero **~0 compras de plan** (1 sub activa = la prueba propia de Fernando, ya cancelada). No se sabe si la fuga está en el **paywall**, el **onboarding**, los **precios**, o si es simplemente **volumen bajo**. **Objetivo:** ubicar la(s) fuga(s) **con datos, no adivinando** — para tener la conversión afinada **ANTES** de que el MKT (D0 tentativo 16-jun) traiga tráfico, no después.

### 13.2 Caveat estadístico (no perderlo de vista)
Con **~35 usuarios reales identificados**, 0-2 pagos es **estadísticamente indistinguible** de "todo funciona pero hay poca gente". El **volumen sigue siendo la palanca principal**. Esta evaluación **prepara la máquina de conversión**, NO reemplaza al MKT. Sirve para que, cuando llegue tráfico, no se desperdicie.

### 13.3 Los 3 frentes de análisis
1. **Embudo real con datos** (RC + Supabase): `install → registro → uso/“aha” → vista de paywall → compra`. Ubicar **la caída más grande**.
2. **Auditoría del código real** de la app: **onboarding** + **paywall** — cuándo aparece, qué pide, qué muestra, cómo gatea. Leído en el código (`~/AurexApp/src`), sin suposiciones.
3. **Estructura de precios de los planes vs mercado** — **NO solo AR**. Evaluar por mercado:
   - **AR** (base, ~83% de los usuarios).
   - **Mercados con descargas reales:** iOS → 🇺🇸 US · 🇨🇱 CL · 🇧🇪 BE · Android → 🇵🇭 PH · 🇮🇳 IN · 🇳🇬 NG · 🇧🇷 BR (y otros que surjan).
   - **Los 8 mercados de idiomas configurados:** ES (AR/LatAm/España) · EN (US/UK) · PT (Brasil) · ZH (China) · FR (Francia) · IT (Italia) · HI (India) · AR-árabe (países árabes).
   - Por cada uno: **poder adquisitivo local** + **qué cobran apps financieras/competidoras comparables** + **tiers de precio de App Store / Google Play por país** (los precios se pueden configurar por región).

### 13.4 Señales preliminares (del snapshot 30-may — ⚠️ TODO A RE-VERIFICAR con datos actuales)
- **77 installs → 35 identificados = ~45% ni siquiera registran.** (¿onboarding pide login muy pronto / antes de mostrar valor?)
- **276 vistas de paywall / ~35 users ≈ 8× cada uno** y aun así no compran → **lo ven mucho y no compran** → apunta a **oferta / precio / timing**, no a "nunca aparece".
- **83% Argentina** → hipótesis fuerte: **precio en USD alto para el bolsillo AR**.
- (Son indicios, no conclusiones. El primer paso es construir el embudo real y verificar estos números.)

### 13.5 🤝 Modelo de trabajo con Escritorio — DOBLE ANÁLISIS INDEPENDIENTE
La idea: que Code y Escritorio analicen **el mismo frente desde ángulos distintos, sin verse entre sí hasta tener su propia conclusión** — así no se contaminan (uno no copia al otro) y donde **coinciden** hay señal fuerte; donde **discrepan**, hay algo para investigar más.

- **Code aporta DATOS DUROS** (tiene: código de la app + backend + APIs RC/ASC/Google Play + Supabase):
  - El **embudo real** medido (cuánta gente cae en cada etapa).
  - El **flujo real** de onboarding/paywall leído en el código.
  - La **config real de precios** publicada en las tiendas (por país).
- **Escritorio aporta CONTEXTO DE MERCADO** (tiene: browser logueado en consolas + tiendas públicas + investigación web):
  - **Benchmarks de precios** de apps competidoras/financieras por país (AR, LatAm, y cada mercado de idioma).
  - **Mejores prácticas** de paywall / onboarding / pricing freemium.
  - Lectura de **UX** desde la ficha pública + screenshots del paywall.
  - Cualquier **dato propio** que releve (reseñas de competidores, tendencias, etc.).
- **Cómo se cruza:** cada uno escribe **su** análisis en una sección **propia y claramente separada** del doc compartido en `briefs/cro/` (repo `aurex-app`). Primero cada uno completa **lo suyo** sin leer la conclusión del otro; **recién cuando ambos terminaron**, se cruzan y se reconcilian. **Canal = GitHub** (`briefs/cro/`), nunca Dropbox.
- **Fernando es el árbitro:** lee ambos análisis, decide qué se valida y qué no. **Nada se cambia** por esto (regla madre 13).

### 13.6 💲 PROPUESTA TENTATIVA DE PRECIOS (a evaluar — 03-jun) · NO se aplica, solo se compara
> Valores que Fernando quiere **evaluar** contra cada mercado y competidores. **No reemplazan nada todavía** (regla madre 13).

| Plan | Mensual | Anual (pago único) | = por mes en el anual | Ahorro vs 12× mensual |
|---|---|---|---|---|
| **PRO** | **US$ 5.99** | **US$ 57.50** | ~US$ 4.79/mes | US$ 14.38 (−20%) |
| **ELITE** | **US$ 9.99** | **US$ 95.90** | ~US$ 7.99/mes | US$ 23.98 (−20%) |

- **Lógica del anual:** `12 × mensual − 20%`. PRO 71.88 → **57.50** (ahorro 14.38). ELITE 119.88 → **95.90** (ahorro 23.98). ✅ Verificado 03-jun: ELITE anual = **95.90** (el 95.50 inicial era un typo; 95.90 es el 20% exacto).
- **⚠️ A verificar (Code):** los **precios actuales reales** publicados en las tiendas (de memoria PRO mensual estaba en US$ 9.99) → confirmar el delta exacto. Esta propuesta **parece bajar PRO** y mover **ELITE al precio que hoy tiene PRO**.

**Las 2 preguntas a responder (frente 3 — precios):**
1. **¿Cómo quedan estos precios vs los competidores, mercado por mercado?** (AR + mercados con descargas reales + los 8 de idiomas) → benchmark de qué cobran apps comparables en cada país.
2. **¿Conviene precio diferente por mercado (geo-pricing)?** Ej. AR más bajo (ajustado a poder adquisitivo / inflación / tipo de cambio) y US/Europa más alto. **Técnicamente es 100% viable:** App Store y Google Play permiten fijar **precio por país/región** (no es un precio único global). La pregunta no es *si se puede*, sino **cuál conviene en cada mercado**.

### 13.7 Estado (act. 04-jun-2026)
- ✅ **Embudo medido** (Code) + **auditoría de código** (Code: matriz FREE/PRO/ELITE, 2 caminos de alerta vía campana 🔔 en portfolio/watchlist, paywall auto post-signup, onboarding no guía a activar) + **análisis mercado/UX** (Escritorio: precios competidores, AR compite con apps gratis Cocos/IOL, geo-pricing, no SSO, 1 rating, categoría Utilities).
- ✅ **BUG "usuarios fantasma" RESUELTO** (04-jun): 44 cuentas auth sin fila backend (causa: la fila la creaba un self-heal del cliente que dependía de reabrir la app). Fix = **trigger Postgres `on_auth_user_ready`** (dispara on insert OR update of email_confirmed_at → cubre confirmación por mail, SSO Apple/Google y confirm-OFF) + heal de los 32 confirmados. **usuarios 48→80, 0 fantasmas confirmados.** SQL: `briefs/cro/fix_fantasmas.sql`. Lo corrió Escritorio en Supabase con OK de Fernando; verificado por Code (dos fuentes coinciden).
- ✅ **CONSOLIDADO v1 + v2** (v2 = cruce precios reales Code × benchmarks Escritorio 12 mercados): `briefs/cro/CONSOLIDADO_CRO_v1.md` / `CONSOLIDADO_CRO_v2.md`.
- ✅ **PRECIOS reales (Code, `/api/cro-prices`):** hoy PRO **$9.99** / ELITE **$19.99**; la propuesta de Fernando (5.99/9.99) es **−40% PRO / −50% ELITE**. **AR paga full USD sin geo-pricing** (caso #1); India/Turquía/Brasil sobre-precio. Hallazgo v2: en mercados ricos (US/FR/ES/UK/AE) el $9.99 actual YA es competitivo → la jugada fina es **geo-pricing selectivo**, no recorte global (a consensuar; Fernando inclina a recorte agresivo global de entrada para testear interés).
- ✅ **CÓMO se cambian precios:** viven en ASC/Play Console (RC solo los lee). Cambiar (global o por país) = **sin build ni revisión**; geo-pricing NO requiere productos nuevos (se editan los 4 productos existentes). **PERO** hay precios hardcodeados (Perfil/FAQ/upsell/i18n) que rompen la consistencia/geo → **dinamizarlos en Build 39 (ítem E)** = todo cero-código a futuro. Spec: `briefs/cro/CODE_analisis.md` §7.
- ✅ **COINCIDENCIAS clave** (Code+Escritorio independientes): paywall antes del valor · fricción de registro (sin SSO) · **activación rota = la fuga más grande** (≈1 real creó alerta; el precio es irrelevante si no se vive el valor) · geo-pricing necesario · sin analytics = ciegos en el medio.
- ✅ **EN BUILD 39 (decidido):** **D) Firebase Analytics** (~8 eventos funnel, también próximo Android) + **E) Dinamización de precios** (planes siempre automáticos) — sumados al plan `briefs/BUILD39_PLAN_COBREX.md`.
- ⏳ **Pendiente (sin apurar, NADA se cambia):** decidir la grilla de precios (recorte global vs geo-pricing selectivo) · arreglar pull precios iOS (Code) · decisiones de producto (SSO, mover paywall, onboarding que guíe la 1ª alerta).
- Workspace: `briefs/cro/`. **Sin cambios en producto hasta OK explícito de Fernando.**

---

## 14. 💵 ECONOMÍA — COSTOS, INFRAESTRUCTURA Y PRECIOS (apartado fijo · siempre visible)
> Datos verificados de las solapas reales de Fernando (Railway/Supabase/Namecheap/Anthropic), 07-jun-2026. **Esto NO cambia seguido — es la base estable para cualquier decisión de precio.**

### 14.1 Costo fijo mensual de la APP
| Servicio | Plan | $/mes |
|---|---|---|
| Railway | Hobby (usage-based) | 5.00 |
| Supabase | Free | 0.00 |
| Namecheap `cobrex.io` | dominio | ~1.25 |
| Namecheap `aurex.live` | dominio (⚠️ auto-renew OFF, expira abr-2027) | ~0.83 |
| Apple Developer | $99/año | 8.25 |
| RevenueCat | Free (<2.500 MTR) | 0.00 |
| ElevenLabs / Runway ML | Free | 0.00 |
| Google Play | fee único $25 (amortizado) | 0.00 |
| **TOTAL APP** | | **$15.33/mes** |

- **NO es costo de la app:** Anthropic Claude Max **$200/mes** = costo de Fernando como **builder** (desarrollo/contenido), no lo generan los usuarios → **excluido** del breakeven de la app.
- **Comisión de tiendas: 15%** (Apple Small Business Program <$1M + Google Play 15% primer $1M) → de cada $1 quedan **$0.85**.

### 14.2 Breakeven — el costo NO es restricción de precio
A cualquier precio razonable, **2–5 usuarios pagos cubren TODA la infraestructura**: $9.99→2 · $6.99→3 · $4.99→4 · $3.99→5. → **No hace falta cobrar caro para sobrevivir, ni hay riesgo de "fundirse" bajando.** El precio se decide por **estrategia (competitividad/volumen)**, NO por margen.

### 14.3 Marco ESTABLE de precio (para no volver a saltar de número en número)
El precio se deriva de 4 anclas fijas, en orden:
1. **Objetivo (Fernando):** ser **el más competitivo en precio** → volumen y tracción. (Margen no es restricción, ver 14.2.)
2. **Ancla competitiva = Delta** (el competidor DIRECTO: tracker de portfolio, NO broker ni charting): **$5.29/mes**. (TradingView $12.95 es otra categoría; brokers Cocos/IOL/Zerodha son gratis, otro modelo.)
3. **Psicología sub-$5:** $4.99 cruza el umbral "$4 vs $5". Por debajo de $4 ($3.99/$2.99) se ahorran centavos irrelevantes pero **se arriesga la credibilidad** (en finanzas, "muy barato" = "¿es confiable?").
4. **Escalón limpio PRO→ELITE = 2×.**

### 14.4 ✅ PRECIOS SUGERIDOS (Code, estable — convergen con la propuesta final de Escritorio)
| Plan | Mensual | Anual (−20%) | = por mes anual |
|---|---|---|---|
| **PRO** | **$4.99** | **$47.90** | ~$3.99 |
| **ELITE** | **$9.99** | **$95.90** | ~$7.99 |

- **PRO $4.99:** el precio más bajo CREÍBLE — claramente debajo de Delta ($5.29), cruza sub-$5, sin entrar en zona "app de juguete". (Por eso $4.99 y NO el $5.99 inventado, ni $3.99 que arriesga credibilidad.)
- **ELITE $9.99:** 2× PRO; muy por debajo de los premium (TradingView $12.95+, Investing $9.99). Es además el precio que HOY tiene PRO → reposiciona toda la grilla.
- **Anual −20%** (regla de Fernando, confirmado 07-jun). **NO más agresivo:** el recorte mensual ya es fuerte (PRO −50%), un descuento anual mayor (ej. el 33% que propuso Escritorio) sobre-descontaría y regala valor sin necesidad. 20% sobre un mensual ya bajo es de por sí muy atractivo.
- ⚠️ **Caveat madre:** la fuga #1 es **activación** (1 de ~65 creó alerta), no el precio. Este precio quita la fricción del precio para el test, pero **si tras el Build 39 + analytics la conversión no mejora, el problema es el funnel, no el precio — no seguir bajando.**

### 14.5 Cómo se APLICA el cambio de precio (operativa — son 2 cosas distintas)
1. **Build 39 ítem E (CÓDIGO, va en el build):** dinamizar los precios hardcodeados (Perfil/FAQ/i18n) → la app queda lista para mostrar cualquier precio correcto. **Prerequisito.**
2. **Cambio de precio (CONFIG de tiendas — NO build, NO código):** editar PRO **$4.99** / ELITE **$9.99** en **App Store Connect** (suscripciones) + **Play Console** (base plans). **RevenueCat NO se toca** (lee el precio de las tiendas). El anual −20% se setea como producto/precio anual en cada tienda.
3. **ORDEN OBLIGATORIO:** primero el **Build 39 (paso 1) EN PRODUCCIÓN**, después el cambio de precio (paso 2). Al revés = incongruencia (paywall $4.99 vs Perfil $9.99 hardcodeado).
4. **Quién ejecuta el paso 2:** Escritorio en las consolas (tiene ASC/Play) o Code (Play vía androidpublisher API), **con OK de Fernando**. Fernando no ejecuta. → confirma la duda de Escritorio: **el cambio de precio NO es parte del ítem E (que es solo código); es una tarea de config posterior al Build 39.**

**Pendiente menor:** `aurex.live` auto-renew OFF (expira abr-2027) — decidir si se deja morir (ya migrado a cobrex.io) o se mantiene.

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
