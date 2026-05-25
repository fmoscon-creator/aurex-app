# 🔁 PLAN DE REBRAND iOS → "COBREX" (Plan B — Apple Guideline 4.1c)

> **24-may-2026.** Para revisión de Escritorio + ejecución coordinada. Raw URL: `https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/PLAN_REBRAND_COBREX_24MAY.md`
> **Contexto:** Apple rechazó "Aurex / AurexLive" **3 veces** (Guideline 4.1c Copycats — la raíz "Aurex" pertenece a www.aurex.ai/Beinex). Plan B = renombrar la app a **COBREX** (sin "Aurex").

---

## 0. EL NOMBRE — COBREX (decidido por Fernando 24-may)
- **Verificación consolidada (Code + Escritorio, coinciden):** iOS US/AR libre · Android libre · **USPTO sin registro** · **EUIPO**: solo existe "ECOBREX" (con E, lubricantes/química — nombre y rubro distintos, **no es conflicto**) · `.io` LIBRE · `.live` LIBRE · `.com` tomado · `.ai` LIBRE (verif. Escritorio).
- **Única homónima:** "Kobrex" (con **K**, cables de cobre, manufactura — otra grafía, otro rubro, **sin app** → no dispara 4.1c).
- **Connotación:** "REX" = rey (premium, misma energía que Aurex). "Cobra" en EN = serpiente (leve); en **ES "cobrar" = dinero** (positivo para fintech) + raíz "cobre" = metal/valor.
- **PENDIENTE de Fernando:** (1) confirmar 100% en `tmsearch.uspto.gov` + `euipo.europa.eu/eSearch`; (2) registrar dominio → **`cobrex.live`** (combina con el actual) o `cobrex.io`.

---

## 1. 🔒 LO QUE NO SE TOCA (CRÍTICO — romper esto sería catastrófico)
- **Bundle ID iOS** `com.fernandomoscon.aurex` y **Android** `com.aurexapp` → **NO cambian** (son invisibles al usuario; cambiarlos = app nueva, se pierde historial/suscripciones).
- **Product IDs de IAP** (`com.fernandomoscon.aurex.pro.monthly`, etc.) → **NO cambian.**
- **RevenueCat, Supabase, Backend (lógica), API keys** → **NO se tocan.** Suscripciones, cobros y datos siguen igual.
- **Ícono de la app** (la "A" dorada) → **NO se toca** (Apple objetó el NOMBRE, no el ícono).
- **Repos de GitHub** → no se renombran.

---

## 2. 👥 ROLES + ⚠️ REGLA DE ORO
| Rol | Hace | NUNCA hace |
|---|---|---|
| **Code** | Código nativo, build (clean+archive+IPA), validación de IPA, push de páginas legales | — |
| **Fernando** | Sube el IPA (Transporter) + asigna grupo de testing + **da el CLIC FINAL de "Enviar/Volver a enviar a revisión"** | — |
| **Escritorio** | Ajusta/modifica la **metadata en App Store Connect** + opina sobre el plan | **🚨 JAMÁS aprieta el botón final de Revisión/Envío. Deja TODO listo y avisa — el clic lo da Fernando.** |

> **Regla absoluta (Fernando):** el botón que envía a Apple a revisión lo aprieta **ÚNICAMENTE Fernando**, tras revisión conjunta. Escritorio prepara y avisa, nunca envía.

---

## 3. 🍎 FASE 1 — iOS (lo crítico para destrabar Apple) → Build 34

### 3.1 Código nativo iOS (Code) — `~/AurexApp`
| # | Archivo | Cambio |
|---|---|---|
| 1 | `src/lib/brand.js` | `BRAND_NAME` iOS: `'AurexLive'` → **`'Cobrex'`** (1 línea → cubre las 9 pantallas que ya usan la variable: Login, Signup, Portfolio, Mercados, Watchlist, IA, MisAlertas, Perfil, Alertas) |
| 2 | `ios/AurexApp/Info.plist` | `CFBundleDisplayName` → **`Cobrex`** (nombre bajo el ícono) |
| 3 | `src/lib/i18n.js` + textos hardcodeados | Reemplazar "AUREX/AurexLive" donde sea **nombre de marca visible** → "Cobrex" en los **8 idiomas** (incluye "AUREX Pulse™", "AUREX Fear & Greed 14X™", FAQ "¿Qué es AUREX?"). Code hace `grep` exhaustivo antes para no dejar ninguno. |
| 4 | `brand.js` → `PRIVACY_URL`/`TERMS_URL` | apuntar a las páginas Cobrex (ver 3.2) |
| 5 | `ios/AurexApp.xcodeproj/project.pbxproj` | bump `CURRENT_PROJECT_VERSION` 33 → **34** (`MARKETING_VERSION` queda **1.0**, NO tocar) |

Luego: **clean obligatorio** (`rm -rf DerivedData/AurexApp-* ios/build` + `pod install`) → **Archive + Export IPA vía CLI** → **validar IPA** (CFBundleDisplayName=Cobrex, Version=34, signing `com.fernandomoscon.aurex`/TX7C2F79U9) antes de entregar.

### 3.2 Páginas legales que Apple SÍ revisa (Code) — repo `aurex-app`
- Crear **`docs/privacy-cobrex.html`** + **`docs/terms-cobrex.html`** = copia exacta de las actuales + solo "AUREX/AurexLive" → "Cobrex".
- Push → URLs vivas en `aurex.live/docs/privacy-cobrex.html` (o en el dominio nuevo cuando se registre).
- **Por qué importa:** el reviewer abre la Privacy/Support URL. Deben decir **Cobrex**, NO "AUREX" (sino reactiva la inconsistencia).

### 3.3 Metadata en App Store Connect (Escritorio ajusta · Fernando OK · NO envía Escritorio)
| Campo | Acción |
|---|---|
| **App Name** | → **Cobrex** |
| **Subtitle / Promotional Text** | reemplazar nombre si aparece |
| **Descripción (corta y larga)** | reemplazar todas las "AurexLive/AUREX" (nombre de marca) → **Cobrex** |
| **Keywords** | sacar "aurex", evaluar "cobrex" |
| **Grupo de suscripciones → "Nombre de la app"** | → Cobrex (cosmético, no rompe IAP) |
| **Privacy Policy URL** | → `aurex.live/docs/privacy-cobrex.html` (o dominio nuevo) |
| **App Review Notes** | **texto nuevo** (ya NO el de coexistencia): explicar que la app se renombró a **"Cobrex"**, nombre propio sin relación con aurex.ai ni con ninguna marca de terceros. |
| **Screenshots (10)** | regenerar del Build 34 (las saca **Fernando** del iPhone — ya mostrarán "Cobrex" en los headers) |

### 3.4 Build + envío (Fernando)
1. Sube **Build 34** con Transporter (síntomas STOP: logo gris / bundleID raw / falta botón Entregar).
2. Asigna grupo Internal Testing (manual, al subir por CLI no se auto-asigna).
3. Verifica en iPhone (TestFlight) que diga "Cobrex".
4. **Reenvía a revisión** → flujo de 2 pasos: "Actualizar revisión" (deja "Listo") → **"Volver a enviar a revisión de apps"** = **CLIC FINAL DE FERNANDO.** Manual Release OFF.

---

## 4. 🔵 FASE 2 — Coherencia de marca (después de Fase 1 / en paralelo)
> Decisión de Fernando: ¿rebrand **solo iOS** (Android/web siguen "AUREX") o **total**? Recomendación: Fase 1 (iOS) YA; Fase 2 cuando se confirme, para coherencia. **Las URLs que Apple ve (3.2) van en Cobrex desde Fase 1 igual.**

- **Onboarding** (`src/assets/onboarding/v2/` — "AUREX" incrustado en las imágenes): regenerar set Cobrex (manual/diseño).
- **Android** (`android/app/src/main/res/values/strings.xml` `app_name` + `brand.js` lado Android): → Cobrex + bump versionCode/Name + `gradlew clean` + bundleRelease + Play Console (revisión Google horas/días).
- **PWA** (`app/aurex-v3.js`, `aurex-features.js`, `app/index.html`, `app/aurex-i18n.js`): "AUREX" → "Cobrex".
- **Landing** (`index.html` + `landing-i18n.json`/`assets/shared/aurex-i18n.js` 8 idiomas + **logo SVG** `assets/landing/logo-aurex-clean.svg` → confirmar si el "AUREX" es `<text>` editable o `<path>` a rediseñar).
- **Backend** (`server.js`): textos de Telegram "AUREX" → "Cobrex" (cosmético, deploy instantáneo).
- **Dominio:** registrar `cobrex.live`/`cobrex.io` y migrar URLs (o mantener `aurex.live` con contenido Cobrex).

---

## 5. 📋 ORDEN DE EJECUCIÓN
1. **Fernando:** confirma Cobrex en USPTO/EUIPO (5 min) + decide dominio.
2. **Code:** grep exhaustivo del nombre en `~/AurexApp` + cambios 3.1 + páginas legales 3.2 + clean/archive/IPA validado (Build 34).
3. **Escritorio:** metadata 3.3 en App Store Connect (ajusta/modifica) — **NO envía.**
4. **Fernando:** sube Build 34 (Transporter) + valida iPhone + **da el clic final de envío**.
5. **Fase 2** (Android/PWA/landing/backend/onboarding) según decisión solo-iOS vs total.

---

## 6. ⚠️ NOTA DE RIESGO
- **4.1c:** Cobrex no tiene app ni marca homónima → **riesgo bajo** de repetir el rechazo (muy distinto de Aurex, que chocaba con aurex.ai, developer real con app).
- **Connotación "cobra":** no afecta la aprobación de Apple; es tema de branding. En ES juega a favor ("cobrar").
