# DAILY_STATUS — AUREX

**Última actualización manual:** 4 de Mayo de 2026 (Google Play Console verificado por Escritorio).

---

## ACTUALIZACIÓN 4-MAY-2026 (jornada de Build 3 Android arrancada)

### Items Build 3 completados HOY

| Item | Commit | Estado |
|---|---|---|
| Item 2 — Bug logout al minimizar | `fffd113` | ✅ |
| Item 3 — v1.0.0 hardcoded eliminado | `29abf29` | ✅ |
| Item 10 — Sacar f7+f8 ELITE del array | `29abf29` | ✅ |
| Item 4 — Tildes i18n aceptar_terminos | `f9a1029` | ✅ (parte editable) |
| Item 11 — Nota "push coming soon" en Alertas | `33c0fb5` | ✅ |
| Item 5 — Splash AurexHero sin "INVEST AI" | `31b8ca4` | ✅ |

**Total: 6 de 11 items cerrados en ~2 hs Code reales.**

### Resguardo del 4-may-2026 antes de arrancar

- Tag dev: **`backup-pre-build3-4may`** apuntando a SHA `072e492362f428824c3c4249cd6b5acabc8c9213`
- Main intacto: commit `1b319b5836176a3faa039c385c409a5d2422cc36` (binario Build 2 Closed Testing + Build 17 revisión Apple)

### Items pendientes Build 3

- **Item 1** — Android safe area (header + footer cortados): pendiente arrancar (~2 hs Code).
- **Item 4** — Imágenes onboarding (slide1-4 reemplazo de textos): esperando opinión Escritorio sobre aproximación.
- **Item 6** — Push real iOS APNS + Android FCM: lunes 5-may. **Firebase setup 100% completo HOY** ✅ (proyecto `aurex-app`, ID `aurex-app-8d985`, plan Spark gratuito).
- **Item 7** — PWA web push: después de Build 3.
- Cambios versión: `versionCode 2→3 + versionName "1.0.1"→"1.0.2"`.
- Compilar AAB Build 3 + Internal Testing track.

### ⚠️ ALERTA detectada hoy (verificar antes lunes)

**Posible discrepancia bundle iOS Firebase**: Fernando reportó que app iOS Firebase está registrada con bundle `com.aurexapp`. El bundle iOS REAL en `ios/AurexApp.xcodeproj/project.pbxproj` es `com.fernandomoscon.aurex`. Si Firebase iOS está con bundle equivocado, `GoogleService-Info.plist` NO funcionará para push porque el bundle no coincide. **Acción**: Fernando verifica antes del lunes en Firebase Console → Settings → Apps → iOS, y reconfigura si hace falta antes que Code arranque item 6.

### DEADLINE crítico
**9-may-2026**: solicitar acceso a producción Google Play (cumplido día 14 de 14 Closed Testing).

---

## ACTUALIZACIÓN 4-MAY-2026 — ESTADO GOOGLE PLAY VERIFICADO

### Lo confirmado hoy
- **Closed Testing día 9 de 14** (faltan 5 días, vencimiento ~9-may).
- Verificación desarrolladores Android: CUMPLIDA.
- Programa 15% inscripto: SÍ.
- Cuenta de Pagos / Billing configurada: SÍ.
- Listing 8 idiomas + feature graphic: PUBLICADOS automáticamente sin revisión humana.
- Publicación administrada: DESACTIVADA.

### Riesgo CRÍTICO al 4-may-2026
- Si cualquiera de los 12 testers hace **opt-out** antes del 9-may, el contador de 14 días **SE RESETEA A CERO**.
- **Acción Fernando**: monitorear que ningún tester abandone hasta el 9-may. Si alguno avisa que va a desinstalar, evaluar agregar 1-2 testers buffer ANTES que el actual haga opt-out.

### Próximo paso Google Play
- ~9-may: se habilita botón "Solicitar acceso a producción".
- Fernando completa formulario con preguntas sobre la prueba cerrada → Google revisa → aprueba.

### Estado WhatsApp 2563 al 4-may-2026
- Línea sigue en watch period crítico tras incidente WA-002 del 3-may.
- Cooldown de verificación post-unlock: ~6-7 hs según último intento. Decisión Fernando: intento próximo a definir entre HOY 22:00 AR y mañana 8:30 AR.
- env `WA_EVOLUTION_PAUSED=true` activa indefinidamente. Telegram cubre 100%.

### Plan Build 18 iOS / Build 3 Android al 4-may
- 11 items inventariados (`docs/PLAN_BUILD_18_iOS_BUILD_3_ANDROID.md` commit `02151df`).
- Versiones próximas: iOS Build 18 / MARKETING_VERSION 1.0 + Android versionCode 3 / versionName 1.0.2.
- Decisión arquitectónica final: **Opción A** (Build 18 con bugs solo, Build 19/4 con push después).
- Pendiente OK Fernando para arrancar items en branch `dev`.

---

> Archivo de bitácora viva con pendientes para mañana. NO confundir con el reporte automático que genera `dailyProjectStatusReport()` cada día a las 9:00 AR (ese se genera en runtime con datos vivos de stores, repos e incidentes).

---

## CIERRE DE SESIÓN — 3 de Mayo de 2026

### Lo que se resolvió HOY

1. **Paso CERO — Bloque 3 cerrado** (`docs/BLOQUE_3_EMAIL_IDENTIDAD.md` commit `baaa4a8`).
    - Email único: `app.aurex@gmail.com` con Google Authenticator + Llave de Acceso (Passkey) instaladas.
    - Recovery aislante: `aurextester12@gmail.com` (no enlaza con grafo Google personal).
    - Teléfonos: 2563 principal, 1320 respaldo.

2. **Paso CERO — Bloque 4 cerrado en 3 iteraciones** (`docs/BLOQUE_4_ASSETS_VISUALES.md` commits `ae97b91` + `cab2c6b` + `64e23e1`).
    - Inventario Drive AUREX_MEDIA_LIBRARY validado.
    - 13 assets a generar (8 fotos perfil + 4 banners + 1 Stories).
    - **Jerarquía visual documentada** (memoria persistente `project_assets_visuales.md`):
        - APP ICON → foto de perfil de redes (coherencia con stores).
        - LOGO CON MARCA (`logo-aurex.png` limpio sin "INVEST AI") → banners y covers.
        - BÚHO V2 → solo CONTENIDO (videos, ilustraciones).
        - AurexHero/logo@3x.png → NUNCA externamente (viola Build 17).
    - WhatsApp Business agregado como asset #13.

3. **Drive externo "AUREX LOGO CON MARCA" descubierto y documentado** — folder ID `1c2l24H49jElD4ZPSsPYzxGMxiu84qLXT`, set completo de 39 archivos profesionales del logo en todas las dimensiones de stores y redes (iOS, Android, PWA, Web Favicon, Marketing).

4. **Descripciones Google Play en 8 idiomas armadas y CARGADAS en Play Console** (`docs/GOOGLE_PLAY_DESCRIPCIONES.md` commits `48b25f9` + `053a72b` + `4db3a51` + `eb57380`).
    - EN, ES, PT, FR, IT aprobadas por Fernando + Escritorio.
    - ZH, HI, AR cargadas (validación post-publicación según Plan MKT v3.0 workflow 2.3).
    - Reemplazan listing viejo que tenía "investment portfolio", "buy/sell signals", "INTELIGENCIA FINANCIERA" — todo lenguaje prohibido por Build 17 metadata segura.
    - Lenguaje 100% alineado: tracker, terminal, real-time, data-driven view, Not a broker, Not advice.
    - Char counts dentro de límites en los 8 idiomas.

5. **Feature graphic Google Play generado** (`~/Downloads/AUREX_feature_graphic_1024x500.png`).
    - Composición: logo AUREX + tagline "Real-time global markets tracker." + datos clave + fondo navy.
    - Reemplaza el feature graphic viejo con "INTELIGENCIA FINANCIERA EN TIEMPO REAL".
    - Subido a Play Console en EN (aplica a todos los idiomas).

6. **Listing Google Play enviado a revisión** ✅ con 13 cambios (8 idiomas × descripción breve + completa, feature graphic, screenshots EN, "quita canal de comentarios" Closed Testing — los últimos 2 con confirmación pendiente Fernando).

7. **Apple Banking confirmado activo** (`~/Downloads/SECRET_BANKING_AUREX.txt`):
    - Cuenta Santander Argentina USD activa.
    - Acuerdos comerciales ACTIVOS (apps gratuitas + apps de pago, vigencia abr 2026 → abr 2027).
    - 4 productos in-app cargados pendientes de revisión con Build 17:
        - PRO Mensual `com.fernandomoscon.aurex.pro.monthly`
        - PRO Anual `com.fernandomoscon.aurex.pro.annual`
        - ELITE Mensual `com.fernandomoscon.aurex.elite.monthly2`
        - ELITE Anual `com.fernandomoscon.aurex.elite.annual`
    - Group ID: 22018005

8. **Google Payments Merchant cargado y EN REVISIÓN**.
    - Cuenta Santander AR USD •••• 3568 (misma que Apple).
    - Resumen bancario subido.
    - CUIT/CUIL: 20234475577.
    - Wise descartada — Google AR exige cuenta CBU local en USD (igual restricción que Apple).
    - Esperar 2-7 días hábiles + posible depósito de prueba.

9. **Programa cargos del servicio del 15% INSCRIPTO** ✅ (vs 30% estándar). Aplica al primer USD 1M/año de ingresos. Ahorro máximo USD 150k/año.

10. **2 testers nuevos creados en Supabase**: `yoconfioenvos@gmail.com` + `francoduarte1998@gmail.com` (UUIDs registrados en `docs/TESTERS_GOOGLE_PLAY.md`).

11. **TESTERS_GOOGLE_PLAY.md publicado** (commit `9f8d31e`): bitácora completa con 16-17 testers (8 confirmados Android + 4 pendientes + 5 emulador). 12 contabilizados por Play Console.

12. **Memoria persistente actualizada**:
    - `project_assets_visuales.md` — jerarquía 3 elementos visuales.
    - `feedback_credenciales.md` — passwords nunca por chat ni en repo.
    - `feedback_mensajes_cortos.md` — preguntas numeradas y agrupadas al final, sin texto intercalado.
    - `project_operativo.md` — Banking Apple + Google + programa 15% inscripto.

---

## PENDIENTES PARA MAÑANA 4 DE MAYO 2026 Y SIGUIENTES

### 1. Confirmaciones críticas pendientes Fernando (HOY ya envió a revisión Google Play)

- **"Quita el canal de comentarios" del Closed Testing Alpha** — ¿intencional o accidente al navegar? Si fue accidente y Google aprueba, los testers no pueden reportar feedback. Confirmar/cancelar antes que Google apruebe.
- **"Cambiar Capturas de pantalla de teléfono" en EN** — ¿se subieron screenshots nuevos o no? Confirmar.

### 2. Esperando aprobaciones Google + Apple

| Item | Plazo esperado | Tipo de aviso |
|---|---|---|
| **Google Payments — verificación cuenta merchant** | 2-7 días hábiles | Email + posible depósito de prueba |
| **Google Play — listing nuevo** (descripciones + feature graphic + cambios cierre testing) | 24-48 hs | Email + estado en Play Console |
| **Apple Build 17** | Apple decide | Email |
| **Closed Testing día 9 de 14** | ~9-may-2026 vencimiento | Esperar |

### 3. Cuando Google apruebe merchant + listing → arrancar con productos in-app

Crear los **4 productos in-app** en Google Play Console con IDs **exactos** del código nativa (sino las compras no funcionan):
- `com.fernandomoscon.aurex.pro.monthly` — $9.99 USD/mes
- `com.fernandomoscon.aurex.pro.annual` — $89.99 USD/año
- `com.fernandomoscon.aurex.elite.monthly2` (con el "2" al final)
- `com.fernandomoscon.aurex.elite.annual` — $179.99 USD/año

### 4. Bloques 5, 6, 7, 8 del Paso CERO — pendientes de cerrar

| # | Bloque | Estimado |
|---|---|---|
| 5 | Riesgos de apertura + mitigaciones (warm-up cuentas nuevas, geolocalización IP) | 1 hs Code |
| 6 | Disclaimer regulatorio en bios (formalizar coherencia, ya integrado en Bloque 1) | 15 min |
| 7 | Costos cero confirmados hasta approval stores (Buffer pago descartado, lista exhaustiva) | 30 min |
| 8 | Orden de apertura por dependencias técnicas (Twitter primero, etc.) | 30 min |

### 5. Plan MKT v3.0 → v3.1 (en standby hasta cerrar Paso CERO + apertura cuentas reales)

Pendientes de aplicar al PLAN_MKT.md:
- A: pieza #19 AUREX vs Bloomberg — versión blog Mes 1, versión LinkedIn Fase 3.
- B: programa referidos unificado a "7 días activo".
- C: cascada fallback ampliada (8 niveles) para viernes sin Alta Convicción IA.
- D: criterios numéricos salida Fase 1 → Fase 2.
- E: estructura `signal_history` Supabase para track record.
- F: política PWA aurex.live como destino único si stores demoran >2 semanas.
- G (TUYA): localización temporal por cuenta de idioma (NO doble publicación).
- #31: pieza nueva retención FREE→PRO por comportamiento.
- #32: waitlist pre-lanzamiento estilo Robinhood.

### 6. Verificación TG-001 (test continuo)

- Ayer 3-may 9:00 AR el reporte llegó por Telegram + WhatsApp tras fix.
- Mañana 4-may 9:00 AR: confirmar que el reporte llega normal otra vez.
- Si llega 3 días seguidos sin error, marcar TG-001 definitivamente cerrado en CONTEXTO.

### 7. Apple Build 17 y Google Play Build 2

- Apple Build 17: día 10 al 4-may. Apple decide.
- Google Play Build 2 closed testing: día 10 de 14 al 4-may. Vence ~9-may. Decisión: si los 12 testers se mantienen activos, OK; si alguno desinstala, evaluar agregar buffer.

### 8. v1.1 (post-aprobación Apple/Google)

- Backend `activos.json`: agregar 25 acciones europeas con señal IA.
- Nativa `AurexApp/src/lib/assets.js`: sincronizar 19 → 25 europeas.
- Push notifications reales VAPID/FCM/APNS (1 semana Code).
- Merge `feature/elite-build` con API personal v1 + chat Tawk.to + acceso beta toggle + dashboard UI.
- Splash screen interno: regenerar AurexHero sin "INVEST AI" (queda interno pero limpio).
- Eliminar `Platform.OS` hardcodeadas v1.0.0 en `PerfilScreen.js` (líneas 789 y 851).

### 9. v2.0 (futuro)

- Store centralizado de precios (PRIORITARIO).
- Editar activo Portfolio.
- Selector monedas Valor Total.
- API eventos real.
- Análisis técnico avanzado.
- Social / comunidad.
- API personal ELITE pública (tier institucional según Plan MKT v3.0).

### 10. Estructurales

- BN-002 ACTIVE — Binance bloqueado en Railway desde 18-abr-2026. MITIGATED via CryptoCompare. Evaluar región Railway alternativa o proxy post-aprobación stores.
- Evolution API self-hosted: hosting actual estable, evaluar migración a Evolution v2 para soporte pairing code (pendiente estructural).

---

## CRONS Y AUTOMATIZACIONES VIVOS (sin cambios respecto a 2-may)

| Cron | Schedule UTC | Schedule AR | Estado |
|---|---|---|---|
| `dailyHealthReport` | `0 11 * * *` | 8:00 | Telegram + WhatsApp 1320 |
| `dailyProjectStatusReport` | `0 12 * * *` | 9:00 | Telegram + WhatsApp 1320 (verificado post-fix TG-001) |
| `monthlyHealthReport` | `0 21 28-31 * *` | 18:00 fin de mes | Operativo |
| `healthCheck` | `*/5 * * * *` | continuo | Operativo |
| `calcularSenalesIA` | `*/5 * * * *` | continuo | 350 activos |
| `calcularPulse` | `*/5 * * * *` | continuo | Operativo |
| `refreshCryptoCache` | `*/2 * * * *` | continuo | Fallback CryptoCompare via BN-002 |
| `checkAlertas` | `*/30 * * * * *` | continuo | Operativo |

---

*DAILY_STATUS.md — generado por Code el 3-may-2026 al cierre de sesión nocturna ~03:30 AR. Mañana 4-may al iniciar nueva sesión, leer este archivo + CONTEXTO.md para reanudar con todo el contexto.*
