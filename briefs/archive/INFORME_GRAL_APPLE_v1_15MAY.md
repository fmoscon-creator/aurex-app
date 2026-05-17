# INFORME GRAL CONSOLIDADO — RECHAZO APPLE + ESTADO iOS REAL
> Versión: v1
> Fecha: 15-may-2026 21:00 AR
> Autor: Code (con datos verificados de git, Info.plist, pbxproj, memoria + reporte Escritorio)

---

## 0. ACLARACIÓN PREVIA

Este documento reemplaza al `ANALISIS_RECHAZO_APPLE_15MAY_CONSOLIDADO.md` que pasé antes. **En ese documento previo cometí un error grave**: respondí preguntas sobre estrategia iOS **sin haber validado el historial real de builds**, mezclando memoria desactualizada de Build 18 con el estado actual. Fernando lo señaló y exigió que reanalice TODO con código + git + memoria verificada antes de avanzar.

Este v1 está construido SIN PRESUNCIONES — cada afirmación tiene fuente verificable (commit SHA, archivo:línea, brief documental, dato Escritorio).

---

## 1. ESTADO REAL — CADA BINARIO Y DÓNDE ESTÁ

### 1.1 iOS

| Build | versionCode | Dónde | Estado | Fecha |
|---|---|---|---|---|
| **Build 17** | 17 | App Store Review | **RECHAZADO 15-may** por Guideline 4.1(c) nombre "AUREX AI" | Enviado 24-abr |
| **Build 24** | 24 | TestFlight Internal Testing | Activo, en uso testers internos | Bump iOS 23→24 en commit `e0d00a4` |
| **Builds 25 + 26** | 24 (pbxproj sin bumpar) | NO compilados iOS | Código presente en repo, sin binario iOS | Hoy 15-may |

**Verificado:**
- `ios/AurexApp.xcodeproj/project.pbxproj` → `CURRENT_PROJECT_VERSION = 24` (dato leído ahora).
- Commits Build 25 (`0766f8e`) y Build 26 (`f160ba2`) modificaron solo `android/app/build.gradle` + `src/screens/*.js`. **No bumparon pbxproj iOS.**
- Los fixes Bug G/H/I de Build 25/26 están en código RN compartido (`src/screens/PortfolioScreen.js` y `src/screens/AlertasScreen.js`) → cuando se recompile iOS, irán al binario nuevo.

### 1.2 Android

| Build | versionCode | Dónde | Estado |
|---|---|---|---|
| **Build 17** | 17 | Producción Play Store | **Activo + BUG P0 signup nuevos usuarios no pueden registrarse** |
| **Builds 18-24** | varios | Compilados pero NO promovidos a producción | Iteraciones internas |
| **Build 21+** | 21+ | Internal Testing Play Console | Con fix signup |
| **Build 26** | 26 | AAB compilado HOY | NO subido a Play Console (pausa Android por Apple) |

---

## 2. RECHAZO APPLE — DATOS VERIFICADOS

| Campo | Valor |
|---|---|
| Submission ID | `e0e7fb35-11a4-4c1d-854c-60a80c4799e6` |
| Versión revisada | 1.0 (17) |
| Dispositivo revisión | iPhone 17 Pro Max |
| Guideline | 4.1(c) Design — Copycats |
| Mensaje literal | *"The app's name contains an icon, brand, or product name that belongs to the following developer: www.aurex.ai."* |

### 2.1 ¿Qué revisó Apple en Build 17?
- ✅ Funcionalidad básica (instaló y abrió la app, no rechazó por crash).
- ✅ Permisos.
- ✅ IAP configuration.
- ✅ Cumplimiento general de guidelines.
- ❌ Nombre = único motivo de rechazo.

**Hipótesis del por qué NO objetó otras cosas que sabemos que Build 17 tiene rotas (signup, etc.):** el reviewer probablemente usó el Demo Account que cargamos en App Review Information (cuenta ya existente, no creó cuenta nueva). El bug signup solo se reproduce al intentar registrar un email nuevo.

### 2.2 Reporte Escritorio (recibido 15-may PM)

**Trademark search USPTO** (vía Justia): 51 registros para "AUREX". Titulares: In Step Electronics, Aurex SA de CV, INDRESCO, HALLMARK FINDINGS, ADM Tronics, HarbisonWalker, otros. Categorías: aparatos eléctricos, publicidad, papel impreso, farmacéuticos, joyería, científicos. **Ninguno en software / apps móviles / fintech.** Riesgo trademark USPTO: **BAJO**.

**WHOIS aurex.ai:** registrado 25-jun-2020, vence 25-jun-2026 (en menos de 2 meses). Registrador GoDaddy. **Titular oculto por privacidad (Domains By Proxy LLC).** No es identificable por WHOIS público.

**Inventario metadata App Store Connect (12 superficies):**
- ✅ Verificadas con "AUREX AI": App Name + Descripción (2 ocurrencias "AUREX AI engine")
- ⚠️ Pendientes verificación manual: Keywords, Copyright, Subtitle, What's New, IAP Display Names (4 planes)
- ✅ Sin "AUREX AI": Texto Promocional, Notas Review, Versión, Preview videos (no hay), Capturas (texto incrustado no verificable por OCR remoto — requiere revisión visual)

### 2.3 Prueba titularidad aurex.live (Fernando)

| Campo | Valor |
|---|---|
| Titular | Fernando Gabriel Moscón |
| Dominio | aurex.live |
| Fecha compra | 3-abr-2026 |
| Registrador | Namecheap |
| Order # | 198745654 |
| Transaction ID | 241830864 |
| Dirección | Tronador 3430, Ciudad de Buenos Aires, AR |
| Pago | VISA terminada en 5541, titular Fernando Gabriel Moscón |

**PWA producción:** `https://aurex.live` activa desde abril 2026, con mismo logo AUREX que la app móvil.

---

## 3. DELTA ENTRE BUILD 17 (RECHAZADO) y CÓDIGO ACTUAL (Build 25-26)

Esto es **fundamental** para decidir qué hacer. El gap entre Build 17 y código actual NO es trivial.

### 3.1 Lo que Build 17 NO TIENE (todos los commits posteriores al 17)

Verificado con `git log --oneline`:

| Commit | Build | Feature/Fix que falta en Build 17 |
|---|---|---|
| `cb0247e` | 18 | Fix bug logout + USER_ID dinámico + manejo 403 + PlanLimitModal (P0 items 1-2-5-6) |
| `d95813d` | 18 | PerfilScreen lee plan real del usuario desde backend |
| `ba3fe95` | 18 | Logout correcto en 2 screens + AlertCreateModal valida plan + JWT auth |
| `60d06c3` | 18 | SubscriptionScreen lee plan actual + bump iOS 17→18 |
| `23db695` | 18 | Hook `usePlan` compartido + filtrar alertas por plan |
| `87f41d7` | 18 | ProGuard/R8 activado + reglas RC/Firebase/Supabase/Notifee |
| `4faaa24` | 18 | Lock icon en toggles alertas premium |
| `36cfbf6` | 18 | `loadPortfolio` useCallback deps fix |
| `0ebe9f0` | 18 | `useFocusEffect` + lectura directa supabase.auth en PerfilScreen |
| `d657a32` | 20 | 8 ítems UX/iOS + acumulado push wiring + bump 1.0.20 |
| `76f0dcb` | 21 | **SignupScreen NUEVA** + 4 bugs Build 20 resueltos + bump 1.0.17 / iOS 21 |
| `ad440c4` | 22 | Items 5+7 iOS root cause (overflow:hidden + presentationStyle) + bump iOS 22 |
| `4b397fb` | 23 | Items 5+7 validados en simulator iOS antes TestFlight |
| `a4c8a05` | 24 | i18n completo "Cómo usar AUREX" 8 idiomas |
| `e0d00a4` | 24 | Bump iOS 23→24 |
| `7105fbb` | 24 | Bug E reincidente + Bug G PlanLimitModal CTA dinámico |
| `0766f8e` | 25 | Bug G re-fix callsite + Bug H behavior padding + Bug I doble tap GUARDAR |
| `f160ba2` | 26 | Bug H maxHeight dinámico modal Agregar Activo |

**Resumen impacto en producción si Build 17 sale a App Store iOS:**

- ❌ **Bug P0 SIGNUP**: nuevos usuarios no pueden registrarse (confirmado en memoria `project_bug_signup_android_14may.md`, el código base es el mismo que iOS Build 17).
- ❌ Sin push notifications iOS (el wiring vino Build 18).
- ❌ Sin JWT auth correcto → riesgo seguridad endpoints backend.
- ❌ Sin logout funcional correcto (Fernando reportó bug logout en Build 17).
- ❌ Sin PlanLimitModal → al tocar feature premium no muestra "Pasate a PRO/ELITE" correctamente.
- ❌ Sin filtrado alertas por plan → user FREE ve toggles premium habilitados.
- ❌ Sin "Cómo usar AUREX" en 8 idiomas.
- ❌ Sin Bug H (modal Agregar Activo cortado por teclado).
- ❌ Sin Bug I (doble tap GUARDAR duplica activo).
- ❌ Sin items UX iOS 5+7 (overflow + presentation modal).

### 3.2 Lo que Build 24 (en TestFlight) SÍ TIENE
Todo lo anterior **excepto** los 3 fixes finales hechos hoy (Bug G re-fix L1070, Bug H maxHeight, Bug I doble tap).

### 3.3 Lo que código actual del repo TIENE (sin binario iOS compilado)
Build 24 + los 3 fixes Build 25-26. Falta solo bump iOS pbxproj a 25 o 26 + `pod install` + Archive + upload TestFlight.

---

## 4. ANÁLISIS — 3 OPCIONES REALES

### Opción A — Cambiar metadata Build 17 + Submit + Aprobar
- **Acción:** Cambiar "AUREX AI" → "AUREX LIVE" en App Store Connect (12 superficies) + reply argumentada + Submit.
- **Apple:** revisa solo cambio (24-72hs probable).
- **Si aprueba → producción iOS:** sale Build 17 ROTO a usuarios reales iOS.
  - Usuarios iPhone que descargan no pueden registrarse (bug signup).
  - Sin push iOS.
  - Bugs UX iOS varios (items 5+7, etc.).
- **Pros:** rápido, cierra el caso de rechazo.
- **Contras GRAVES:** versión rota en producción iOS. Daño reputacional. Misma situación que tenemos HOY en Android Play Store con Build 17 (donde HOY confirmamos que nuevos users no pueden entrar).
- **Mitigación:** retirar Build 17 de venta inmediatamente post-aprobación + mandar Build 25/26 iOS a Review urgente. Pero entonces Apple revisa de nuevo todo y queue ~19 días — y mientras tanto producción iOS está ROTA.

### Opción B — Aprobar Build 17 y bloquear distribución
- **Acción:** Lo mismo que Opción A, pero post-aprobación marcar "Manually release this version" y NO publicar. Mantener "ready for sale" pero sin release.
- **Apple:** aprobado pero no distribuido.
- **Beneficio:** queda un slot aprobado en historial. App Store Connect te deja tener Build 17 aprobado y al mismo tiempo mandar Build 25/26 a Review.
- **Contras:** Apple Build 17 queda como "approved/ready to distribute" → confuso para auditorías futuras. Y NO resuelve nada porque el binario que querés en producción es Build 25/26, no 17.

### Opción C — Retirar Build 17 + compilar Build 25/26 iOS + Submit con AUREX LIVE
- **Acción:**
  1. Reject Build 17 vos mismo en App Store Connect (botón "Reject Version") → libera el slot de versión.
  2. Bump pbxproj iOS a `CURRENT_PROJECT_VERSION = 25` o `26` (depende qué fixes prioricemos).
  3. `cd ios && pod install` (validar Podfile).
  4. Archive + Upload nuevo binario a App Store Connect.
  5. **En el mismo binario nuevo, ya con metadata "AUREX LIVE"**, validar primero en TestFlight Internal con Fernando.
  6. Cuando TestFlight valida OK → Submit to App Review.
- **Apple:** revisa todo de cero (queue ~19 días desde re-submit).
- **Pros:**
  - Una sola review.
  - Versión SANA en producción iOS cuando Apple apruebe.
  - Coherencia binario + metadata + nombre (todo "AUREX LIVE" desde el primer día).
  - SignupScreen + push + gating + bug fixes incluidos.
- **Contras:**
  - 19 días de queue adicional.
  - Requiere recompilar iOS (bump pbxproj + pod install + Archive + upload).
  - Sin slot iOS aprobado mientras se espera.

### Opción D — Compilar Build 26 iOS PERO submit metadata Build 17 primero (paralelo)
- **Acción:**
  1. **HOY**: cambiar metadata Build 17 → Submit (Opción A).
  2. **EN PARALELO**: compilar Build 26 iOS + subir a TestFlight Internal Testing (no requiere review Apple) → vos validás en tu iPhone.
  3. Si Apple aprueba Build 17 con cambio nombre → **NO distribuir** (Manual Release + dejar en standby).
  4. Cuando Build 26 esté validado en TestFlight → Submit a App Review como nueva versión 1.0.25 o 1.0.26.
  5. Apple aprueba esa → vos releases ESA (Build 26), Build 17 nunca llega a producción.
- **Pros:**
  - Tenés Build 17 aprobado como respaldo histórico (si pasa algo con Build 26 review).
  - Build 26 va con la calidad real al mismo tiempo.
  - El nombre AUREX LIVE queda validado por Apple (review previa) → reduce riesgo segundo rechazo en Build 26.
- **Contras:**
  - Más trabajo administrativo (2 submits + manual release).
  - Necesitás controlar bien qué binario distribuís.

---

## 5. RECOMENDACIÓN CODE

**Opción D — Submit Build 17 con cambio de nombre (no distribuir) + en paralelo preparar Build 26 iOS para submit posterior.**

**Razones:**
1. Build 17 aprobado por Apple con nombre AUREX LIVE → **valida el nombre** (Apple bendice "AUREX LIVE"). Esto reduce **mucho** el riesgo de que el próximo Build 26 sea rechazado por el mismo motivo.
2. Build 26 sale a producción con calidad real (signup, push, todos los fixes).
3. Build 17 nunca llega a usuarios. Quedará archivado como "approved" pero no distribuido.
4. Si pasa algo malo con Build 26 en review, tenés Build 17 aprobado como red de seguridad (aunque sea limitada).
5. Build 26 iOS requiere compilación que conocemos (Build 24 ya está en TestFlight, no hay bloqueo técnico nuevo).

**Variación posible:** si el equipo decide que no quiere "Build 17 fantasma aprobado", entonces Opción C limpia (rechazar Build 17 + ir directo con Build 26).

---

## 6. PLAN EJECUCIÓN — OPCIÓN D (si Fernando aprueba)

### Fase 1 — HOY (Escritorio + Fernando)
1. **Escritorio** completa verificación manual de las 5 superficies App Store Connect pendientes: Keywords, Copyright, Subtitle, What's New, IAP Display Names (4 planes).
2. **Escritorio** revisa visualmente las 10 capturas de pantalla iOS — ¿alguna tiene "AUREX AI" como texto incrustado?
3. **Escritorio** reporta inventario completo a Fernando.
4. **Fernando** aprueba el inventario.
5. **Escritorio** aplica cambios texto: "AUREX AI" → "AUREX LIVE" en todas las superficies.
6. **Escritorio** sube comprobante Namecheap (PDF) a "App Review Information → Notes".
7. **Escritorio** pega reply en inglés (texto preparado en doc anterior §4.4) con datos Namecheap.
8. **Marcar "Manually release this version"** (clave para no distribuir si Apple aprueba).
9. **Submit to App Review.**

### Fase 2 — Paralelo (Code, 1-2 días)
1. **Bump pbxproj** iOS `CURRENT_PROJECT_VERSION 24 → 26` y `MARKETING_VERSION 1.0 → 1.0.26`.
2. **Cambiar Info.plist** `CFBundleDisplayName = AUREX` → `AUREX LIVE`.
3. **Limpiar i18n.js** L145 + L257 ("AUREX AI" → "AUREX IA" uniforme).
4. `cd ios && pod install`.
5. **Archive en Xcode** + upload a App Store Connect.
6. **Subir a TestFlight Internal Testing.**
7. **Fernando valida en su iPhone**: signup nuevo + push iOS + Bug H + Bug I + gating premium + login/logout.
8. Cuando OK → **Submit a App Review como versión nueva 1.0.26**.

### Fase 3 — Cuando Apple aprueba Build 26
1. Manual Release → distribuir a producción.
2. Build 17 queda archivado "approved" (sin distribuir nunca).
3. iOS producción al fin con app real.

### Fase 4 — Android
1. Subir AAB Build 26 Android a Play Console Internal Testing.
2. Validar con tester.
3. Promover a Producción Play Store (reemplaza Build 17 v1.0.17 roto).
4. Bug P0 signup + todos los fixes en producción Android al fin.

---

## 7. RESPUESTAS A LAS 4 PREGUNTAS DE FERNANDO

### 1) ¿Apple analizó todo el contenido y funciones del Build 17?
SÍ. Lo instaló y testeó. Pero solo objetó nombre. Probablemente NO testeó signup nuevo (usó Demo Account que dimos). Si re-submitimos Build 17 con cambio de nombre, hay riesgo medio de que **esta vez sí** objeten signup u otro bug — porque saben que vamos a re-revisar.

### 2) ¿Si mandamos Build 25/26 nuevo, Apple revisa todo de cero?
SÍ. Cualquier binario nuevo = review completa desde cero. Queue actual ~19 días (puede acelerarse en submissions consecutivas pero no garantizado).

**TestFlight Internal Testing:** NO requiere review (inmediato — vos lo usás en tu iPhone).
**App Review (producción):** SÍ requiere review completa.

### 3) ¿Conviene aprovechar y mandar Build actual con fixes en lugar de aprobar Build 17?
**SÍ — esta es la pregunta clave y la respuesta es SÍ.** Build 17 está roto (sin signup, sin push, varios bugs UX). Si Apple aprueba y se distribuye, daño reputacional iOS = mismo problema que tenemos AHORA en Android producción v1.0.17.

**Mi recomendación: Opción D arriba** — submit el cambio de nombre del Build 17 (sin distribuir si aprueba) y en paralelo preparar Build 26 iOS para submit posterior.

### 4) ¿Cambia el logo?
NO. Apple objetó **solo el texto del nombre**. El icono visual (A dorada) no fue cuestionado. Diseño visual queda igual.

---

## 8. DECISIONES PENDIENTES PARA FERNANDO

1. **¿Vamos por Opción D** (submit Build 17 cambio nombre sin distribuir + preparar Build 26 iOS) **o por Opción C** (retirar Build 17 + ir directo con Build 26 iOS)?
2. **¿AUREX LIVE confirmado** como nuevo nombre, dado que trademark search USPTO + WHOIS aurex.ai no muestran riesgo alto?

---

## 9. RIESGOS Y MITIGACIONES

| Riesgo | Probabilidad | Mitigación |
|---|---|---|
| Apple rechaza segundo intento por mismo motivo | Baja (trademark BAJO + dominio propio defendible) | Reply argumentada + WHOIS aurex.live adjunto |
| Apple rechaza Build 26 por otro motivo después | Media | Validación rigurosa en TestFlight Internal antes de submit |
| Build 17 aprobado y se distribuye por error | Baja (Manual Release activado) | Doble check Manual Release antes Submit |
| 19+ días queue retrasan iOS otra vez | Alta | Apple suele ser más rápido en re-submits (24-72hs si no hay cambios funcionales) |
| Build 26 iOS compile falla | Baja (Build 24 ya compiló OK) | Mantener Build 24 TestFlight como fallback |

---

## 10. CHECKLIST FINAL

**Antes de tocar nada:**
- [ ] Fernando decide Opción C o D.
- [ ] Escritorio completa inventario 5 superficies pendientes.
- [ ] Escritorio confirma trademark search final.
- [ ] Fernando aprueba reply text en inglés (preparado en doc previo §4.4).

**Code prepara (en paralelo, sin tocar todavía):**
- [ ] Plan archivo-por-archivo Build 26 iOS (bump pbxproj + Info.plist + i18n + pod install).
- [ ] Backup Build 24 TestFlight como fallback documentado.

**Solo después de OK Fernando+Escritorio:**
- [ ] Submit Apple (Fase 1).
- [ ] Compilación Build 26 iOS (Fase 2).

---

## 11. ANEXOS

### 11.1 Archivos referenciados
- `~/Desktop/aurex-app/briefs/BRIEF_BUILD26_ESTADO_15MAY.md`
- `~/Desktop/aurex-app/briefs/ANALISIS_PROFUNDO_COMPRA_IAP_15MAY.md`
- `~/Desktop/aurex-app/briefs/INFORME_COMPRA_IAP_15MAY_PARA_ESCRITORIO.md`
- `~/Desktop/aurex-app/briefs/TICKET_REVENUECAT_FINAL_15MAY.md`
- `~/Dropbox/AUREX/Apple STORE IOS/` (carpeta destino brief Escritorio)
- Este documento: `~/Desktop/aurex-app/briefs/INFORME_GRAL_APPLE_v1_15MAY.md`

### 11.2 Memorias relevantes consultadas
- `project_build26_15may.md`
- `project_bug_signup_android_14may.md` (confirma bug Build 17 que también afectaría iOS)
- `project_build17_ios_status.md`
- `project_build18_ios.md` (refleja estado bloqueado superado — ahora outdated)
- `project_sesion_7_8_may_2026.md`

### 11.3 Commits clave verificados
- Build 17 → 24 → 25 → 26 transcripto en §3.1 con SHA + descripción.

---

**Fin documento v1. Pendiente decisiones Fernando + Escritorio antes de avanzar.**
