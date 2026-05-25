# 🔁 PLAN REBRAND iOS → "COBREX" — BUILD 35 (Plan B, Apple Guideline 4.1c)

> **Creado 24-may-2026 · Actualizado 25-may-2026 (v2 — Build 35).** Raw URL: `https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/PLAN_REBRAND_COBREX_24MAY.md`
> **Contexto:** Apple rechazó "Aurex/AurexLive" **3 veces** (4.1c Copycats — la raíz "Aurex" es de www.aurex.ai/Beinex). Plan B = renombrar a **COBREX**.
> **🎯 ALCANCE: SOLO iOS.** Android está publicado y funcionando como "AUREX" (v1.0.36) → **NO se toca.** Se evalúa solo SI Apple aprueba Cobrex.

---

## ⚠️ POR QUÉ ESTE PLAN ES v2 (qué salió mal con el "Build 34")

El "Build 34" cambió **todo el texto** a Cobrex (verificado) pero **NO las imágenes con "AUREX" horneado**. Un reviewer que instala "Cobrex" desde cero veía "AUREX" en el splash, en la pantalla de carga y en el onboarding → inconsistencia y riesgo de rechazo. **Build 34 queda DESCARTADO.** El build válido es **Build 35** = texto + imágenes.

Errores reconocidos:
- **Code:** ejecutó hasta compilar sin auditar las 3 superficies de imagen; la info ya estaba en `PLAN_APPLE_AUREXLIVE_REPLY_22MAY.md` (onboarding "AUREX incrustado") y no se cruzó.
- **Proceso:** el código nativo vive local (rama `dev`, sin commitear) y el remoto `AurexApp` está contaminado (`version=11`) → Escritorio no podía auditar. **Solucionado:** snapshot del código en `briefs/cobrex/code_snapshot/` (raw URLs abajo).

---

## 0. NOMBRE — COBREX (decidido por Fernando)
iOS US/AR libre · Android libre · **USPTO sin registro** · **EUIPO** solo "ECOBREX" (otro rubro, no conflicto) · `.io`/`.live` libres. Dominio se compra **solo si Apple aprueba**. Hoy se usa **aurex.live** para Privacy/Support URL (es metadata editable, no requiere rebuild).

---

## 1. 🔒 LO QUE NO SE TOCA
- **Bundle ID** `com.fernandomoscon.aurex` · **Product IDs IAP** · **RevenueCat / Supabase / Backend** · **Ícono** (la "A" dorada, sin texto) · **Repos** no se renombran.
- **`MARKETING_VERSION` = 1.0** (NUNCA cambia; solo sube `CURRENT_PROJECT_VERSION`).
- **Android** (todo).

---

## 2. 👥 ROLES + ⚠️ REGLA DE ORO
| Rol | Hace | NUNCA |
|---|---|---|
| **Code** | Código nativo, cableado de imágenes, build (clean+archive+IPA), validación binario, snapshots de auditoría, textos de Connect | — |
| **Fernando** | **Diseña las 4 pantallas de onboarding** + decide splash, sube el IPA (Transporter), saca screenshots, **da el CLIC FINAL de envío a revisión** | — |
| **Escritorio** | Ajusta la **metadata en App Store Connect** (con los textos de §7), audita el código vía snapshot | **🚨 JAMÁS aprieta el botón de envío. Prepara y avisa; el clic lo da Fernando.** |

---

## 3. ✅ HECHO Y VERIFICADO (texto)
| Ítem | Estado | Verificación |
|---|---|---|
| `brand.js` iOS → `Cobrex` (Android sigue `AUREX`) | ✅ | snapshot `brand.js` |
| `Info.plist` `CFBundleDisplayName` → `Cobrex` | ✅ | snapshot `Info.plist` |
| `pbxproj` `CURRENT_PROJECT_VERSION` (queda en 34, sube a **35** al recompilar) | ⏳ | — |
| `i18n.js` 272 reemplazos, 0 restos, bot `@Aurexalertas` intacto | ✅ | snapshot `i18n.js` (`grep -c AUREX`=0) |
| 7 pantallas + UpsellBanner: textos visibles → Cobrex / `COBREX PULSE™` / `COBREX FEAR & GREED 14X™` | ✅ | snapshot `screens/` |
| Páginas legales **vivas**: `aurex.live/docs/privacy-cobrex.html` + `terms-cobrex.html` | ✅ | HTTP 200 |
| `brand.js` PRIVACY_URL/TERMS_URL → páginas cobrex | ✅ | snapshot `brand.js` |

**Snapshot para auditoría (Escritorio):** `https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/cobrex/code_snapshot/MANIFEST.md`

---

## 4. ❌ FALTA — IMÁGENES con "AUREX" horneado (lo crítico de Build 35)
Las 3 se ven adentro de la app; el reviewer las ve al instalar. **Bloqueantes.**

| # | Superficie | Cuándo se ve | Archivo | Quién |
|---|---|---|---|---|
| 1 | **Splash nativo** | 1° al abrir, cada vez | `ios/AurexApp/Images.xcassets/BootSplashLogo-092ad1.imageset/` (logo + "AUREX") | **DECISIÓN** (ver §6) |
| 2 | **Pantalla de carga** | cada arranque | `src/assets/launch_header.png` ("AUREX INVEST AI") | **DECISIÓN** (ver §6) |
| 3 | **Onboarding** (4 slides) | instalación nueva | `src/assets/onboarding/v2/…` (4×8 idiomas×claro/oscuro) | **Fernando rediseña** |

> El onboarding: Fernando lo **diseña de cero** tomando estructura/info de la web. Decisión pendiente: ¿8 idiomas completos (~48 img) o solo inglés claro+oscuro (8 img, mínimo para el reviewer)?
> **Cómo se cablea (Code):** las imágenes son `require()` estáticos en `OnboardingScreen.js` y el imageset nativo; se reemplazan los archivos manteniendo nombres → 0 cambios de código, o se ajustan paths.

**App universal (iPhone + iPad):** `TARGETED_DEVICE_FAMILY = "1,2"` → iPad **sí** requiere sus propias screenshots (§5).

---

## 5. ❌ FALTA — SCREENSHOTS de la ficha (Connect)
Las actuales en Connect son del Build 17 → dicen "AUREX". Con la app "Cobrex" = inconsistencia → **rehacer.**
- **Modo claro**, de **Build 35** instalado.
- **iPhone 6.5"** (1242×2688 o 1284×2778) **obligatorio** + **iPad 13"** (2048×2732) **obligatorio** (app universal).
- **NO en la terminal** (decisión Fernando; la vez anterior dio problemas). Se sacan del dispositivo/simulador con Build 35.
- Qué capturar (10 máx): Mercados+Cobrex Pulse, IA/Señales, Portfolio, Watchlist, Alertas, Planes — las que muestren "Cobrex" en headers.

---

## 6. 📋 ORDEN DE EJECUCIÓN — BUILD 35
1. **Fernando:** rediseña las 4 imágenes de onboarding (+ define §-decisión splash). Code entrega specs exactas (dimensiones por slide/modo).
2. **DECISIÓN splash (1 y 2 de §4):** (A) los rediseña Fernando junto al onboarding, o (B) **Code los regenera** reusando el SVG del logo (`AurexLogo.js`) + texto "Cobrex" vía HTML→PNG. Recomendación Code: **B** (son simples: logo + wordmark).
3. **Code:** reemplaza las 3 superficies de imagen + bump `CURRENT_PROJECT_VERSION` 34→**35** + **clean obligatorio** (DerivedData + ios/build + Metro cache) + `pod install` + archive + export IPA.
4. **Code:** valida el binario Build 35 — metadata (Cobrex/35) + firma + **y que las imágenes nuevas estén embebidas** (no quede "AUREX" en ningún asset).
5. **Fernando:** sube Build 35 (Transporter) + saca screenshots (§5).
6. **Escritorio:** carga metadata de §7 en Connect (sin enviar).
7. **Fernando:** verifica en iPhone + **clic final** de "Volver a enviar a revisión".

---

## 7. 📝 TEXTOS EXACTOS PARA APP STORE CONNECT (listos para pegar)

> Derivados del contenido REAL de la app (FAQ de Perfil, Cobrex Pulse, planes). Escritorio los pega sin modificar.

### 7.1 App Name
`Cobrex`

### 7.2 Subtitle (30 chars máx)
`Análisis de mercados con IA` (27 chars)  ·  EN: `AI market analytics` (19)

### 7.3 Promotional Text (170 chars máx)
ES: `Seguí 350+ activos globales en tiempo real con análisis estadístico por IA, Cobrex Pulse y alertas inteligentes. Cripto, acciones, ETFs, commodities y más.`
EN: `Track 350+ global assets in real time with AI statistical analysis, Cobrex Pulse and smart alerts. Crypto, stocks, ETFs, commodities and more.`

### 7.4 Descripción larga (4000 chars máx) — ES
```
Cobrex es una plataforma de análisis de datos de mercado con inteligencia artificial. Monitorea más de 350 activos globales en tiempo real: criptomonedas, acciones, ETFs, commodities, futuros y divisas.

QUÉ HACE COBREX
• Motor IA: evalúa múltiples variables por activo para generar análisis estadístico probabilístico (no son recomendaciones de inversión).
• Cobrex Pulse: índice de sentimiento de mercado con 14 variables ponderadas, de 0 (Miedo Extremo) a 100 (Codicia Extrema), con filtros Global / Cripto / Acciones / Commodities / Futuros.
• Alertas inteligentes: te avisan cuando un activo alcanza tu precio objetivo, cambia el análisis IA, hay una variación brusca o Cobrex Pulse entra en zona extrema. Por notificación push, email o Telegram según tu plan.
• Portfolio y Watchlist: seguí tus activos y listas personalizadas con cotizaciones en vivo.
• 8 idiomas, modo claro y oscuro.

PLANES
• FREE: acceso básico a mercados y Cobrex Pulse.
• PRO y ELITE: más activos, variables, alertas e indicadores avanzados (RSI/MACD, alertas geopolíticas).

IMPORTANTE
Cobrex es una herramienta de visualización de datos y análisis estadístico con fines exclusivamente informativos y educativos. No constituye asesoramiento financiero ni recomendaciones de inversión. Toda decisión es responsabilidad exclusiva del usuario. Los patrones estadísticos pasados no garantizan resultados futuros.
```

### 7.5 Descripción larga — EN
```
Cobrex is an AI-powered market data analytics platform. It monitors 350+ global assets in real time: cryptocurrencies, stocks, ETFs, commodities, futures and currencies.

WHAT COBREX DOES
• AI engine: evaluates multiple variables per asset to generate probabilistic statistical analysis (not investment recommendations).
• Cobrex Pulse: market sentiment index with 14 weighted variables, from 0 (Extreme Fear) to 100 (Extreme Greed), with Global / Crypto / Stocks / Commodities / Futures filters.
• Smart alerts: get notified when an asset hits your target price, the AI analysis changes, there is a sharp move, or Cobrex Pulse enters an extreme zone. Via push, email or Telegram depending on your plan.
• Portfolio & Watchlist: track your assets and custom lists with live quotes.
• 8 languages, light and dark mode.

PLANS
• FREE: basic access to markets and Cobrex Pulse.
• PRO and ELITE: more assets, variables, alerts and advanced indicators (RSI/MACD, geopolitical alerts).

IMPORTANT
Cobrex is a data visualization and statistical analysis tool for informational and educational purposes only. It does not constitute financial advice or investment recommendations. All decisions are the sole responsibility of the user. Past statistical patterns do not guarantee future results.
```

### 7.6 Keywords (100 chars máx, sin espacios, sin "aurex")
`cripto,acciones,bolsa,trading,alertas,mercados,inversiones,analisis,IA,ETF,commodities,finanzas` (95 chars)

### 7.7 App Review Notes (EN — pegar en App Review Information)
```
Dear App Review Team,

The app is named "Cobrex" — an original, coined name with no relation to any third-party brand, product or developer. It is not derived from, nor affiliated with, www.aurex.ai or any other company.

Cobrex is a consumer market-data and statistical-analysis app (informational/educational only; it does not provide financial advice). The app icon is our own original design and contains no third-party brand, logo or text.

Demo account to review all features (ELITE tier enabled):
- Email: demo@cobrex.io
- Password: [definida — la carga Escritorio en Connect; no va en repo público]

In-app purchases use standard StoreKit subscriptions. Thank you.

Fernando Gabriel Moscón — Apple Developer Team ID: TX7C2F79U9
```
> ⚠️ **Credenciales NO van en este doc público.** Las pone Escritorio/Fernando directo en Connect (el password está en `~/Desktop/CODE/SECRET/`). Ver §7.9.

### 7.8 URLs / Copyright
- **Privacy Policy URL:** `https://aurex.live/docs/privacy-cobrex.html` (viva, HTTP 200)
- **Support URL:** `https://aurex.live` (recomendación Code: home, no la privacy)
- **Marketing URL:** `https://aurex.live` (se mantiene)
- **Copyright:** `2026 Fernando Moscón` (se mantiene — es persona, no marca)

### 7.9 Datos de contacto / Demo (DECISIONES)
- **Email de contacto de revisión:** `fmoscon@gmail.com` → **se mantiene** (no tiene marca).
- **Usuario demo:** ✅ **RESUELTO** — creado `demo@cobrex.io` en Supabase (email confirmado, plan **ELITE**, login verificado OK). Reemplaza a `app.aurex@gmail.com`.
- **Password demo:** definida (`Cobrex2026` u otra que confirme Fernando) — la carga Escritorio en Connect; NO se escribe en este repo público.
- **Nombre/teléfono de contacto:** se mantienen.

### 7.10 Grupo de suscripciones
- Grupo "AUREX PLANES" (ID 22018005) → renombrar **nombre de referencia** a `Cobrex` (cosmético).
- Ruta: App Store Connect → (app) → **Suscripciones** → grupo → editar el nombre visible/referencia.
- **NO afecta** Product IDs ni suscripciones activas. Es solo el rótulo del grupo.

### 7.11 PDF adjunto en App Review
- Hay un PDF "namecheap AUREX LIVE" adjunto (justificaba el nombre viejo). Con Cobrex **no aplica y confunde** → **ELIMINAR el adjunto.** Cobrex no necesita adjunto (nombre propio sin conflicto).

---

## 8. ⚠️ RIESGO
- 4.1c con Cobrex: **bajo** (no hay app ni marca homónima, a diferencia de Aurex vs aurex.ai).
- Connotación "cobra/cobrar": no afecta aprobación; en ES juega a favor.
