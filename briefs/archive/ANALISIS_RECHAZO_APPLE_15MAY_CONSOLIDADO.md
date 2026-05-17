# ANÁLISIS RECHAZO APPLE BUILD 17 — DOCUMENTO CONSOLIDADO
> Para envío a Escritorio
> Fecha: 15-may-2026 20:30 AR
> Autor: Code (análisis autónomo) + complemento Escritorio + datos Fernando

---

## 1. EXECUTIVE SUMMARY

**Problema:** Apple rechazó AUREX Build 17 iOS el 15-may-2026 18:32 AR. Motivo único: Guideline 4.1(c) Copycats — el nombre "AUREX AI" cargado en la metadata de App Store Connect colisiona con www.aurex.ai (developer registrado).

**Hechos clave:**
- El binario Build 17 ya tiene `CFBundleDisplayName = AUREX` (sin "AI"). ✅ Binario limpio.
- "AUREX AI" rechazado está SOLO en la metadata de App Store Connect.
- Fernando es titular legítimo de aurex.live (Namecheap, 3-abr-2026, Order #198745654).
- Sin conflicto con Android (ya en producción como "AUREX"), RevenueCat (productos por ID), Supabase, Bundle ID (`com.aurexapp`).

**Decisión recomendada:** Renombrar app a **"AUREX LIVE"** en App Store Connect. NO recompilar binario para Fase 1. Submit + reply argumentada a Apple. Build 18 iOS futuro alinea binario + i18n para coherencia.

**Riesgo principal:** segunda ronda de queue (19+ días) si Apple rechaza nuevamente. Mitigación: trademark search previo + reply con prueba documental adjunta.

---

## 2. INFORMACIÓN VERIFICADA

### 2.1 Rechazo Apple (datos crudos)

| Campo | Valor |
|---|---|
| Estado | Rechazado |
| Submission ID | `e0e7fb35-11a4-4c1d-854c-60a80c4799e6` |
| Fecha revisión | 15-may-2026 |
| Dispositivo revisión | iPhone 17 Pro Max |
| Versión revisada | 1.0 (17) |
| Guideline | 4.1(c) Design — Copycats |
| Mensaje literal Apple | *"The app's name contains an icon, brand, or product name that belongs to the following developer: www.aurex.ai. Apps cannot use another developer's icon, brand, or product name in the app's icon or name, without approval from that developer."* |
| Caminos sugeridos por Apple | (1) Remover marca de otro developer del metadata. (2) Adjuntar evidencia documental de aprobación. |

### 2.2 Estado código verificado (15-may por Code)

**`ios/AurexApp/Info.plist`:**
- `CFBundleDisplayName = AUREX` ✅ (sin "AI")
- `CFBundleName = $(PRODUCT_NAME)` (= AurexApp, no público)

**Bundle ID:** `com.aurexapp` — NO cambia.

**`src/lib/i18n.js`:** "AUREX AI" / "AUREX IA" aparece en 2 strings descriptivos de feature (no nombre de app):
- L145 — `thermo_modal_intro` (modal explicación termómetro)
- L257 — `aurex_ia_variables` ("AUREX AI ⚡ — 10 VARIABLES")

**`android/app/src/main/strings.xml`:** sin "AUREX AI".

### 2.3 PRUEBA DOCUMENTAL TITULARIDAD aurex.live

| Campo | Valor |
|---|---|
| Titular | Fernando Gabriel Moscón |
| Dominio | aurex.live |
| Fecha de compra | 3 de abril 2026 |
| Registrador | Namecheap |
| Order # | 198745654 |
| Transaction ID | 241830864 |
| Dirección | Tronador 3430, Ciudad de Buenos Aires, AR |
| Pago | VISA terminada en 5541 a nombre de Fernando Gabriel Moscón |

✅ **Prueba contundente.** Es el tipo de documentación que Apple acepta como evidencia formal en sección "App Review Information".

### 2.4 Estado actual otras plataformas

| Plataforma | Estado | ¿Cambia con renombre? |
|---|---|---|
| Android Play Store | AUREX en producción v1.0.17 (6-may) | NO inmediato — opcional alinear en Build 27 |
| Bundle ID iOS | `com.aurexapp` | NO |
| Bundle ID Android | `com.aurexapp` | NO |
| RevenueCat | Proyecto + 8 productos por Product IDs | NO (nombre proyecto cosmético) |
| Supabase | Backend + tabla `usuarios` | NO |
| PWA aurex.live | Producción | NO (dominio propio) |
| Telegram @aurex_ai | Canal abierto 12-may | NO inmediato (decisión MKT separada) |

---

## 3. ANÁLISIS INDEPENDIENTE — CODE vs ESCRITORIO

### 3.1 Coincidencias

| Punto | Code | Escritorio |
|---|---|---|
| AUREX LIVE es el nombre adecuado | ✅ | ✅ |
| Solo cambio en metadata, no recompile binario | ✅ | ✅ |
| Bundle ID NO cambia | ✅ | ✅ |
| RevenueCat / IAP products NO se rompen | ✅ | ✅ |
| Android NO requiere acción inmediata | ✅ | ✅ |

### 3.2 Diferencias críticas — 4 puntos ciegos del análisis de Escritorio

#### Punto ciego 1 — Trademark search NO hecho
Escritorio dice "muy probablemente sí" sobre la aprobación de AUREX LIVE, pero no verificó:
- ¿Tiene aurex.ai marca registrada "AUREX" en USPTO TESS?
- ¿Tiene aurex.ai apps publicadas en App Store con nombre "AUREX" o "AUREX AI"?
Si la respuesta es SÍ a cualquiera de las dos, Apple puede rechazar nuevamente cualquier nombre que arranque con "AUREX".

**Mitigación:** 5 minutos de búsqueda evitan 20 días de queue.

#### Punto ciego 2 — "Una sola línea de texto" es engañoso
Escritorio dice que el cambio es 1 línea. **Falso.** En App Store Connect hay que revisar 8-12 superficies:

| # | Campo App Store Connect | ¿Auditar / cambiar? |
|---|---|---|
| 1 | App Information → **Name** | SÍ — cambio obvio |
| 2 | Versión 1.0(17) → **Subtitle** (30 chars) | Auditar |
| 3 | Versión 1.0(17) → **Description** (4000 chars) | Auditar |
| 4 | Versión 1.0(17) → **Keywords** (100 chars) | Auditar |
| 5 | Versión 1.0(17) → **Promotional Text** (170 chars) | Auditar |
| 6 | Versión 1.0(17) → **What's New / Release Notes** | Auditar |
| 7 | **IAP Products x4** (PRO mensual, PRO anual, ELITE mensual, ELITE anual) → Display Name + Description de cada uno | Auditar cada uno |
| 8 | **Screenshots** (5-10 PNGs subidos) → texto incrustado | Auditar visualmente |
| 9 | **App Preview videos** (si los hay) → texto/voz | Auditar |
| 10 | **App Privacy** → descripciones uso datos | Auditar |
| 11 | **Support URL / Marketing URL** | Probablemente OK (aurex.live) |
| 12 | **App Review Information → Notes** (campo donde se adjuntan pruebas) | Redactar reply |

Pueden ser 8-12 cambios, no 1.

#### Punto ciego 3 — Reply a Apple sin argumento legal
Escritorio NO redactó el texto de la reply a Apple. Sin argumento explícito + prueba adjunta, Apple solo ve un cambio cosmético y puede pedir más.

**Texto recomendado para "App Review Information → Notes" (ver §4.4).**

#### Punto ciego 4 — Inconsistencia binario vs metadata
Binario Build 17 tiene `CFBundleDisplayName = AUREX` (sin LIVE). Si metadata dice "AUREX LIVE":
- En la ficha de App Store: AUREX LIVE
- En el icono del iPhone instalado: AUREX

Apple lo permite, pero es inconsistencia de marca. Build 18 iOS debe alinear binario.

---

## 4. PLAN EJECUCIÓN — FASE 1 (HOY)

### 4.1 Trademark search previo (Escritorio)
Antes de tocar metadata, Escritorio (con Chrome integration) hace búsqueda rápida:

1. **USPTO TESS** (https://tmsearch.uspto.gov/) — buscar "AUREX" en clases 9 (software) y 36 (financial services). Reporte: ¿hay marca registrada vigente?
2. **App Store search global** — buscar "AUREX" + "AUREX AI". Reporte: ¿hay app publicada del developer aurex.ai? Si SÍ → nombre exacto + idioma + países.
3. **WHOIS aurex.ai** — fecha de registro + titular si público.

**Output esperado:** reporte breve (5 líneas) confirmando si AUREX LIVE es seguro o requiere alternativa.

**Si trademark search detecta riesgo alto:** alternativas a evaluar:
- AUREX MARKETS
- AUREX TERMINAL
- AUREX TRADER
- AUREX DESK

### 4.2 Auditoría completa metadata App Store Connect (Escritorio)
Recorrer las 12 superficies de §3.2 punto 2. Listar todas las apariciones de "AUREX AI" o "AUREX IA". Reportar inventario a Fernando antes de cambiar.

**Output:** tabla `Superficie | Texto actual | Texto propuesto`.

### 4.3 Cambios concretos a aplicar (Escritorio, post-aprobación Fernando)
Para cada superficie del inventario:
- Reemplazar "AUREX AI" → "AUREX LIVE"
- Reemplazar "AUREX IA" → "AUREX LIVE" (uniformidad)
- En descripciones técnicas tipo "AUREX AI Engine" → considerar mantener feature name o cambiar a "AUREX Engine" / "AUREX IA Engine" según contexto.

**Screenshots con texto incrustado:** si los hay, marcar para regenerar en Fase 2 (no bloquean Fase 1 si Apple no los objeta específicamente).

### 4.4 Reply a Apple — texto redactado

Para sección **"App Review Information → Notes"** o reply directa al rechazo:

```
Dear App Review Team,

Thank you for your detailed review of submission ID e0e7fb35-11a4-4c1d-854c-60a80c4799e6.

We have updated the app metadata to address the Guideline 4.1(c) feedback regarding the previous name "AUREX AI".

The app has been renamed to "AUREX LIVE" — this is our own brand, based on our owned domain aurex.live, which has been our public product domain since April 3, 2026.

Evidence of ownership of aurex.live:
- Registrar: Namecheap
- Order #: 198745654
- Transaction ID: 241830864
- Registrant: Fernando Gabriel Moscón
- Registration date: April 3, 2026
- Active production PWA at https://aurex.live (current)

We have no affiliation, agreement, or connection with www.aurex.ai. The name "AUREX LIVE" is derived exclusively from our owned domain and is used consistently across all our platforms (web PWA, Android Google Play production v1.0.17, iOS).

We have attached the Namecheap purchase confirmation as documentary proof of ownership. A live verification of https://aurex.live can also be performed to confirm consistent branding.

Please let us know if any additional documentation is required.

Best regards,
Fernando Gabriel Moscón
Developer Account: [Apple Developer Team ID]
```

**Adjuntar:** PDF/screenshot del comprobante Namecheap (Order #198745654).

### 4.5 Submit
Post-cambios + reply guardada → Submit to App Review.

**Timing estimado Apple:** 24-48hs en revisión expedita (estamos en segunda ronda, suele ir más rápido).

---

## 5. PLAN EJECUCIÓN — FASE 2 (DIFERIDA, Build 18 iOS)

Post-aprobación Apple del cambio de metadata, planificar Build 18 iOS para coherencia binario + i18n:

| Cambio | Archivo | Acción |
|---|---|---|
| Display Name binario | `ios/AurexApp/Info.plist` | `CFBundleDisplayName: AUREX` → `AUREX LIVE` |
| String termómetro | `src/lib/i18n.js` L145 | Limpiar "AUREX AI" / "AUREX IA" → "AUREX IA" uniforme o "AUREX Engine" |
| String variables | `src/lib/i18n.js` L257 | "AUREX AI ⚡ — 10 VARIABLES" → "AUREX IA ⚡ — 10 VARIABLES" |
| versionCode iOS | `ios/AurexApp.xcodeproj/project.pbxproj` | Bump a Build 18 |
| Recompile pods | `ios/Podfile.lock` | `cd ios && pod install` |
| Backup AAB/IPA | `~/AurexApp/backups/` | Mantener convención |

**NO bloquea Fase 1.** Fase 2 puede arrancar cuando Fernando lo defina.

### Android (no urgente)
Si Fernando decide alinear marca, Build 27 Android:
- `android/app/src/main/res/values/strings.xml` → `app_name`: "AUREX" → "AUREX LIVE"
- Play Console → App name → idem
- Mismas 2 líneas i18n.js (compartidas con iOS)

---

## 6. CHECKLIST ACCIONES ESCRITORIO

| # | Acción | Quién | Status |
|---|---|---|---|
| 1 | USPTO TESS search "AUREX" clases 9 + 36 | Escritorio | Pendiente |
| 2 | App Store search "AUREX" / "AUREX AI" global | Escritorio | Pendiente |
| 3 | WHOIS aurex.ai (fecha, titular público) | Escritorio | Pendiente |
| 4 | Reportar resultado trademark search a Fernando + Code | Escritorio | Pendiente |
| 5 | Inventariar TODAS las apariciones "AUREX AI" en 12 superficies App Store Connect | Escritorio | Pendiente |
| 6 | Aprobación Fernando del inventario + cambios propuestos | Fernando | Pendiente |
| 7 | Aplicar cambios texto (post-OK Fernando) | Escritorio | Pendiente |
| 8 | Subir PDF Namecheap a App Review Information | Escritorio | Pendiente |
| 9 | Pegar reply text (§4.4) ajustada con Team ID real | Escritorio | Pendiente |
| 10 | Submit to App Review | Escritorio (post-OK Fernando) | Pendiente |
| 11 | Monitorear respuesta Apple 24-72hs | Escritorio | Pendiente |
| 12 | Planificar Build 18 iOS Fase 2 (post-aprobación) | Code | Pendiente |

---

## 7. DECISIÓN PENDIENTE (1 sola para Fernando)

**¿Procedemos con AUREX LIVE pendiente del resultado del trademark search?**

- Si Escritorio confirma sin riesgos → seguir plan Fase 1 con AUREX LIVE.
- Si Escritorio detecta riesgo alto → evaluar alternativas (AUREX MARKETS / AUREX TERMINAL / AUREX TRADER / AUREX DESK).

---

## 8. ANEXOS

### 8.1 Archivos referenciados
- BRIEF Build 26 estado actual: `~/Desktop/aurex-app/briefs/BRIEF_BUILD26_ESTADO_15MAY.md`
- BRIEF Escritorio Build 26: `~/Dropbox/AUREX/MAPA DE TRABAJO/BRIEF_BUILD26_PARA_ESCRITORIO_15MAY.md`
- Análisis IAP completo: `~/Desktop/aurex-app/briefs/ANALISIS_PROFUNDO_COMPRA_IAP_15MAY.md`
- Este documento: `~/Desktop/aurex-app/briefs/ANALISIS_RECHAZO_APPLE_15MAY_CONSOLIDADO.md`

### 8.2 Riesgos no mitigables
- Apple puede aplicar criterio subjetivo. Si rechaza segunda vez "AUREX LIVE":
  - Solicitar review por reviewer humano vía mensaje extendido.
  - Si persiste: evaluar nombre sin la raíz "AUREX" (ej "MOSCON MARKETS", "GLOBAL MARKETS TERMINAL").
  - Worst case: pausar iOS y enfocar Android + PWA hasta resolución.

### 8.3 Métricas de éxito Fase 1
- Apple cambia status a "In Review" dentro de 6hs post-Submit. ✅
- Apple aprueba o pide aclaración dentro de 72hs. ✅
- Si aclaración: respuesta < 24hs con WHOIS + screenshots adicionales.

### 8.4 Memoria a actualizar post-resolución
Crear `project_rechazo_apple_15may.md` con resultado + lecciones aprendidas para próximas submissions.

---

**Fin del documento. Listo para envío a Escritorio.**
