# 🚨 INFORME ESTADO REAL — APPLE BUILD 17 — 21 MAY 2026

> **Crítico.** La re-submission que se creía "enviada el 16/05" NUNCA se completó en Apple.
> Fuente de los hechos en pantalla: Escritorio leyendo App Store Connect HOY 21/05 (vía Fernando).
> Fuente de lo registrado de nuestro lado: `INFORME_GRAL_APPLE_v3_16MAY.md` + brief maestro.
> **Code NO tiene acceso a App Store Connect** — este informe cruza lo registrado vs lo que Fernando/Escritorio ven en pantalla.

---

## 0. RESUMEN EN 3 LÍNEAS

1. El rechazo de Apple (15/05, **Guideline 4.1(c) Copycats**) fue **SOLO por el nombre "AUREX AI"** (confundible con el dominio `www.aurex.ai`). **El ícono/logo NO fue objetado.**
2. El 16/05 se **cambió la metadata** (nombre → AUREX LIVE, PDF Namecheap adjunto, "Publicar manualmente" activo) **PERO** la respuesta en el hilo de mensajes **NUNCA se envió** y el envío **NUNCA se reenvió a revisión**.
3. Resultado: **6 días colgado**. Apple espera que Fernando (a) responda en el hilo y (b) presione "Volver a enviar a revisión". Acción inmediata en §4. Texto listo en §5.

---

## 1. QUÉ ESTÁ CARGADO HOY EN CONNECT (verificado por Escritorio en pantalla, 21/05)

| Elemento | Estado |
|---|---|
| **Nombre de la app** | ✅ **AUREX LIVE** (cambiado de "AUREX AI") |
| **PDF adjunto** | ✅ "COMPRA DOMINIO AUREX LIVE -namecheap-order-198745654.pdf" en *App Review Information* |
| **Manual Release** | ✅ "Publicar manualmente" seleccionado (NO se distribuye solo si Apple aprueba) |
| **Ícono** | ✅ Logo "A" dorada sobre fondo negro — sin texto ni marca de terceros. **No objetado por Apple.** |
| **Estado del envío** | App para iOS 1.0 (17) → "Listo para revisión" · botón **"Volver a enviar a revisión de apps" ACTIVO (azul)** |
| **Hilo de mensajes** | ❌ **1 solo mensaje** (el rechazo de Apple del 15/05). **SIN respuesta nuestra.** Aparece el link "Responder al equipo de revisión de apps". |

---

## 2. QUÉ SE MODIFICÓ EL 16/05 (registrado, INFORME_GRAL_APPLE_v3_16MAY.md §3-Bis)

Auditoría de 12 superficies. Cambios aplicados:
- **#1 App Name:** AUREX AI → **AUREX LIVE** ✅
- **#3 Description:** "AUREX AI engine" → "AUREX engine" ✅
- **#8 IAP Group "Nombre de la app":** AUREX AI → **AUREX LIVE** ✅
- **#11 App Review Notes:** PDF Namecheap adjunto ✅
- **Manual Release:** "Publicar manualmente" activo ✅
- Resto de superficies (subtitle, keywords, screenshots, IAP names, URLs): sin "AUREX AI" → sin cambio.

**La metadata quedó correcta.** El problema no es la metadata.

---

## 3. LA CONTRADICCIÓN / CAUSA RAÍZ DE LOS 6 DÍAS

- **El brief maestro registró** (16/05 03:30): *"Re-submission enviada, EN COLA Apple Review"* → **ESTO FUE INCORRECTO.**
- **La realidad** (confirmada hoy por Escritorio en pantalla): se editó la metadata pero **(a)** NO se pegó/envió la respuesta en el hilo "Responder al equipo de revisión", y **(b)** NO se presionó "Volver a enviar a revisión de apps".
- Apple, desde su lado, ve el envío con su rechazo **sin réplica ni reenvío** → no lo re-evalúa. Quedó **colgado 6 días**.
- **Error de Code (asumido):** los días siguientes reporté "sin novedades / esperando Apple" mirando solo el estado "Listo para revisión", **sin abrir el hilo de mensajes** para confirmar que la respuesta había salido. No validé lo esencial.

---

## 4. ACCIÓN INMEDIATA — qué hacer AHORA en App Store Connect

1. Abrir el envío **Build 17 (1.0 · 17)** → click en **"Responder al equipo de revisión de apps"**.
2. Pegar el **texto de §5**. Confirmar que el **PDF Namecheap** sigue adjunto en *App Review Information*.
3. **Enviar** la respuesta (debe quedar como 2º mensaje en el hilo).
4. Click en **"Volver a enviar a revisión de apps"**.
5. Confirmar que el estado pasa a **"Waiting for Review / En espera de revisión"** (ya NO debe decir "Listo para revisión" con botón azul).

---

## 5. TEXTO LISTO PARA ENVIAR (actualizado 21/05)

```
Dear App Review Team,

Thank you for your review of submission ID e0e7fb35-11a4-4c1d-854c-60a80c4799e6.

We have updated the app metadata to address the Guideline 4.1(c) feedback regarding the previous name "AUREX AI".

The app has been renamed to "AUREX LIVE" — this is our own brand, based on our owned domain aurex.live, which has been our public product domain and PWA since April 3, 2026.

Evidence of ownership of aurex.live:
- Registrar: Namecheap
- Order #: 198745654
- Transaction ID: 241830864
- Registrant: Fernando Gabriel Moscón
- Registration date: April 3, 2026
- Active production PWA at https://aurex.live (with the same AUREX logo)

We have no affiliation, agreement, or connection with www.aurex.ai. The name "AUREX LIVE" is derived exclusively from our owned domain and is used consistently across all our platforms:
- Web PWA (aurex.live)
- Android Google Play (current production v1.0.33; v1.0.36 currently in review)
- iOS (this submission)

The app icon is our own original design (a stylized "A") and does not contain any third-party brand, logo, or text.

We have attached the Namecheap purchase confirmation as documentary proof of ownership. A live verification of https://aurex.live can also be performed to confirm consistent branding.

Trademark search via USPTO (Justia): no registered trademark for "AUREX" in software, mobile apps, or financial services categories.

Please let us know if any additional documentation is required.

Best regards,
Fernando Gabriel Moscón
Apple Developer Team ID: TX7C2F79U9
```

---

## 6. SOBRE EL ÍCONO (duda de Fernando)

- **Apple NO objetó el ícono/logo.** El texto "icon, brand, or product name" es la **plantilla genérica** de la Guideline 4.1(c); el conflicto **concreto** citado es el **NOMBRE "AUREX AI"** vs el dominio aurex.ai.
- El logo (A dorada sobre negro) **no contiene texto ni marca de terceros** → no hay que cambiarlo, ni en Build 17 ni en Build 32.
- Blindaje extra (ya incluido en el texto de §5): se aclara explícitamente que el ícono es diseño original propio.

---

## 7. SOBRE EL BUILD 32 (en TestFlight)

- Build 32 (v1.0 · 32) está preparado/validado. Se sube **cuando Apple apruebe Build 17** con AUREX LIVE.
- **Verificar antes de subir Build 32:** que `CFBundleDisplayName` en `ios/AurexApp/Info.plist` diga **AUREX LIVE** (consistencia de nombre) y que no queden strings "AUREX AI" en i18n. El ícono NO cambia.

---

## 8. RIESGO ACTUAL

- El envío estuvo 6 días sin avanzar por nuestra omisión, NO por Apple. **Apenas se responda + reenvíe, entra a la cola de review** (24-72h típico; el historial de AUREX puede estirarlo a 3-7 días).
- Si pasan 72h sin respuesta tras el reenvío → **Expedited Review Request**.
