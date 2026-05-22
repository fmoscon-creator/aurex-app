# 🍎 PLAN APPLE — Reply de coexistencia + cambio de nombre a "AurexLive" (Build 17)

> **22-may-2026.** Para revisión de Escritorio antes de ejecutar en App Store Connect.
> Raw URL: `https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/PLAN_APPLE_AUREXLIVE_REPLY_22MAY.md`
> Contexto completo: brief maestro §2.4-bis / §2.4-ter / §2.4-quater.

## CONTEXTO (1 párrafo)
Apple **re-rechazó** el Build 17 el 22/05 (2° rechazo, Guideline 4.1(c) Copycats) pese a la respuesta del 21/05 (argumento dominio aurex.live + PDF Namecheap). Verificamos en el App Store que **aurex.ai = Beinex Consulting, con app activa "Aurex: AI GRC & Analytics"** → por eso el dominio no alcanzó (enfrente hay un developer real). PERO también verificamos que **conviven varias "Aurex" aprobadas** (AurexNova/Finance, AurexPro/Business). **Estrategia consensuada Code + Escritorio:** (1) cambiar el nombre de "AUREX LIVE" → **"AurexLive"** (pegado, replicando el patrón que Apple aprueba) + (2) reply de **coexistencia fáctica**, SIN pedirle documentación a Apple, SIN afirmar trademark (no hay).

---

## PARTE A — TEXTO EXACTO DE LA REPLY (pegar en "Responder al equipo de revisión de apps")

> Idioma: inglés. NO afirma trademark. NO pide "qué documentación necesitan". Cita las apps con su categoría + Apple ID para que el reviewer las encuentre.

```
Dear App Review Team,

Thank you for your continued review of submission ID e0e7fb35-11a4-4c1d-854c-60a80c4799e6.

To fully address the Guideline 4.1(c) feedback, we have renamed the app to "AurexLive" — a single, distinctive compound name derived from our own product domain, aurex.live.

We respectfully note that the root "Aurex" is not exclusive to www.aurex.ai. The App Store currently lists several independent developers using this root, including:
- "AurexNova" by Delfina Pazia — Finance category (Apple ID 6771328873)
- "AurexPro" by AUREXPRO LLC — Business category

This demonstrates that names built on the "Aurex" root coexist on the App Store across multiple independent developers, including within our own Finance category. Our name "AurexLive" is a single compound word and is, in fact, more distinctive than "Aurex" used on its own.

Furthermore, our app and www.aurex.ai serve entirely different markets. www.aurex.ai (Beinex Consulting Private Limited) is an enterprise GRC, audit and analytics platform listed under Business. AurexLive is a consumer market-tracking and financial information app. There is no overlap in audience, purpose or visual branding, and therefore no likelihood of user confusion.

"AurexLive" derives exclusively from our owned domain aurex.live (registered via Namecheap on April 3, 2026, under the name Fernando Gabriel Moscón) and is used consistently across our Web PWA (aurex.live), Android (Google Play) and iOS platforms. We have no affiliation, agreement or connection with www.aurex.ai. The app icon is our own original design (a stylized "A") and contains no third-party brand, logo or text.

The Namecheap domain-ownership confirmation remains attached in App Review Information.

Best regards,
Fernando Gabriel Moscón
Apple Developer Team ID: TX7C2F79U9
```

---

## PARTE B — CAMBIO DE NOMBRE "AUREX LIVE" → "AurexLive" en las 12 superficies

> Base: inventario auditado por Escritorio el 16/05 (`INFORME_GRAL_APPLE_v3_16MAY.md` §3-BIS). Grafía objetivo: **`AurexLive`** (una palabra, CamelCase, como AurexNova/AurexPro).

| # | Superficie | Acción 22/05 |
|---|---|---|
| 1 | **App Name** | 🔴 **CAMBIAR** "AUREX LIVE" → **"AurexLive"** |
| 2 | **Subtitle** (30 chars) | Verificar visualmente; si aparece "AUREX"/"AUREX LIVE" como nombre → "AurexLive" |
| 3 | **Description** (4000 chars) | 🔴 Reemplazar el **nombre de marca** "AUREX LIVE"/"AUREX" → "AurexLive" donde se use como nombre de la app (no en prosa genérica donde no aplique) |
| 4 | **Keywords** (100 chars) | Verificar; ajustar si contiene el nombre de marca |
| 5 | **Promotional Text** (170 chars) | Verificar; ajustar si contiene el nombre de marca |
| 6 | **What's New** (release notes) | Verificar; ajustar si contiene el nombre de marca |
| 7 | **IAP Display Names x4** (PRO mensual/anual, ELITE mensual/anual) | Verificar Display Name + Description de cada uno; si dicen "AUREX LIVE" → "AurexLive" |
| 8 | **IAP Grupo "Nombre de la app"** | 🔴 **CAMBIAR** "AUREX LIVE" → **"AurexLive"** |
| 9 | **Screenshots (10)** | Revisión VISUAL: que ninguna tenga "AUREX LIVE"/"AUREX AI" incrustado en la imagen |
| 10 | **App Privacy** | Sin cambio de nombre (descripciones de uso de datos) — verificar |
| 11 | **App Review Notes** | 🔴 Pegar la reply de **PARTE A** + confirmar que el **PDF Namecheap** sigue adjunto |
| 12 | **Support URL / Marketing URL** | OK (aurex.live) — sin cambio |

**Cambios seguros (mínimo): #1, #8, #11.** El resto: verificar visualmente y ajustar SOLO donde aparezca el nombre de marca.

---

## PARTE C — ORDEN DE EJECUCIÓN (en App Store Connect)

1. **Cambiar el nombre** en las superficies #1 y #8 (y las que la verificación visual marque) → **"AurexLive"**.
2. Revisar #2–#10 visualmente y ajustar lo que tenga el nombre viejo.
3. Ir al envío **Build 17 (1.0 · 17)** → **"Responder al equipo de revisión de apps"** → pegar el texto de **PARTE A**.
4. Confirmar que el **PDF Namecheap** sigue adjunto en *App Review Information*.
5. **Enviar** la respuesta (queda como nuevo mensaje en el hilo).
6. Click **"Volver a enviar a revisión de apps"**.
7. Confirmar que el estado pasa a **"En espera de revisión / Waiting for Review"**.
8. **Manual Release sigue OFF/manual** (no se distribuye solo si aprueba).

## QUÉ NO HACER (consenso)
- ❌ NO preguntarle a Apple "qué documentación adicional necesitan" (no hay papeles de titularidad que entregar).
- ❌ NO afirmar que "AUREX" es trademark propio (no está registrado).
- ❌ NO tocar el ícono (Apple no lo objetó).

## ✅ DECISIÓN (Fernando, 22-may): iOS PRIMERO con "AurexLive", ver si Apple acepta, Android DESPUÉS

> La marca "AUREX LIVE" ya estaba aceptada desde el 1er rechazo. El cambio ahora es solo de **grafía: "AUREX LIVE" (con espacio) → "AurexLive" (pegado)** — NO es un rebrand de identidad. Se hace **solo en iOS**; Android (publicado, plataforma secundaria por mercado) se decide DESPUÉS de saber si Apple acepta.

### Build 33 iOS — lo que SÍ se toca ahora
1. `ios/AurexApp/Info.plist` → `CFBundleDisplayName`: "AUREX" → **"AurexLive"** (es iOS-only, NO toca Android).
2. Bump build number → **33** (re-archivar; ícono ya limpio en Build 32; NO toca IAP/RC — bundle ID + product IDs intactos).
3. Metadata App Store Connect: App Name (#1) + IAP grupo "Nombre de la app" (#8) + cualquier superficie con el nombre → **"AurexLive"** (ver Parte B).
4. **Reply de coexistencia** (Parte A) + confirmar PDF Namecheap adjunto.
5. **Adjuntar las 4 suscripciones** (grupo AUREX PLANES, ID 22018005) a la versión Build 33 antes de enviarla a revisión.
6. Manual Release OFF.

### Lo que NO se toca en este paso (queda para DESPUÉS de saber si Apple acepta)
- **Headers internos** `<Text>AUREX</Text>` (8 pantallas, `LoginScreen`/`PortfolioScreen`/`MercadosScreen`/`WatchlistScreen`/`IAScreen`/`MisAlertasScreen`/`PerfilScreen`/`SignupScreen`): son **código React Native COMPARTIDO iOS+Android** → tocarlos cambiaría Android también. Se dejan.
- **`docs/privacy.html` / `docs/terms.html`**: compartidos iOS+Android+web. Se dejan.
- **Android** (`strings.xml`, ficha Google Play): se decide DESPUÉS.
- **Riesgo asumido (consensuado):** el reviewer puede ver "AUREX" en los headers internos = **riesgo de credibilidad secundario, NO la causa del 4.1c** (que objeta nombre + ícono). Si Apple rechazara POR el contenido interno (improbable) → recién ahí el rebrand compartido + Android.

## SI APPLE RESPONDE
- **Aprueba "AurexLive"** → recién ahí se decide el rebrand del resto (headers compartidos + privacy/terms + Android + web) para coherencia total. Ver brief §3.5 + §2.4-quinquies(D).
- **Rechaza de nuevo con el mismo boilerplate** → evaluar escalado a App Review Board (vía formal), con el historial de coexistencia ya documentado.
