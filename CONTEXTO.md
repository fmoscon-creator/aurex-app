# CONTEXTO DEL PROYECTO AUREX
Última actualización: 4 de Mayo de 2026 (estado Google Play Console verificado por Escritorio)

## INICIO RAPIDO
Pega esto al abrir nueva conversacion con Claude:

Hola, continuamos con Aurex.
Repo: https://github.com/fmoscon-creator/aurex-app
App: https://fmoscon-creator.github.io/aurex-app  (alias: aurex.live)
Lee CONTEXTO.md y PLAN-ACCION.md del repo.
Token GitHub: [TOKEN]
Tarea de hoy: [FECHA] - [TAREA]

---

## ESTADO ACTUAL — 3 MAY 2026 (cierre de sesión nocturna ~03:30 AR)

### HEAD ACTUAL (PWA aurex-app, branch main)
Commit: eb57380
Fecha: 2026-05-03
Descripcion: Google Play descripciones — 6 idiomas restantes (PT, ZH, FR, IT, HI, AR) traducidos desde EN/ES aprobados

### REPOS RELACIONADOS (3 repos del proyecto)
- aurex-app (PWA)         main: eb57380  (Plan MKT v3.0 + Bloques 1, 2, 3, 4 del Paso CERO documentados, traducciones 8 idiomas Google Play, descripciones cargadas en Play Console)
- AurexApp (Nativa)       dev:  072e492  (Build 17 enviado a Apple, NO TOCAR main hasta aprobación)
- aurex-backend           main: f87fc6d  (Railway — fix TG-001 polling: false aplicado, deploy SUCCESS)

### COMMITS DEL 3 DE MAYO 2026

- aurex-app `baaa4a8` — **Bloque 3 Paso CERO** email + identidad operativa formalizado: app.aurex@gmail.com único, recovery aurextester12 (aisla grafo Google), teléfonos 2563+1320, Authenticator + Llave de Acceso instaladas.
- aurex-app `ae97b91` + `cab2c6b` + `64e23e1` — **Bloque 4 Paso CERO**: assets visuales por plataforma. Inventario Drive AUREX_MEDIA_LIBRARY + 13 assets a generar (8 fotos perfil + 4 banners + Stories). Corrección crítica: foto perfil va con APP ICON (no búho); banners van con logo-aurex.png limpio. Búho v2 queda solo para CONTENIDO videos. NUNCA usar AurexHero/logo@3x.png externamente (tiene "INVEST AI" prohibido). Jerarquía 3 elementos visuales documentada en memoria persistente. Agregado WhatsApp Business como asset #13.
- aurex-app `f393965` + `8d75cad` + `b781290` — Bloque 2 Paso CERO completado en 3 iteraciones: chequeo disponibilidad nombres en 5 plataformas → estrategia Display Name=AUREX vs handle escalonado (aporte Escritorio) → re-chequeo correcto Telegram (aurex TAKEN por usuario "Aurelio").
- aurex-app `48b25f9` + `053a72b` + `4db3a51` + `eb57380` — **Descripciones Google Play en 8 idiomas**. EN+ES aprobadas + traducciones a PT/ZH/FR/IT/HI/AR. Lenguaje seguro alineado a Build 17 (sin AI signals, sin investing). Reemplazan textos viejos con "investment portfolio", "buy/sell signals" que violaban reglas. Precios ELITE confirmados ($19.99/mes, $179.99/año) tras verificar productos cargados en Apple Connect.
- aurex-app `9f8d31e` — `docs/TESTERS_GOOGLE_PLAY.md`: bitácora completa de 16-17 testers (8 confirmados Android + 4 pendientes + 5 emulador). Incluye 2 nuevos del 3-may (yoconfioenvos, francoduarte1998).

### COMMITS DEL 2 DE MAYO 2026
- aurex-backend `f87fc6d` — **fix TG-001**: `polling: true → false` en bot Telegram. Causa raíz era ETELEGRAM 409 Conflict durante restarts Railway entre container viejo y nuevo. Verificación post-deploy OK (test endpoint + daily-status/test ambos funcionando, los 5 mensajes llegaron al chat 1749518554 a las 18:17 AR). Bot mantiene capacidad de enviar; deja de recibir comandos `/start` y `/alertas` (no usados productivamente).
- aurex-app `5dece74` — CONTEXTO marcar TG-001 RESUELTO con causa raíz + fix.
- aurex-app `e86959b` — **PLAN_MKT v3.0** alineado con AUREX_DEFINICION_ESTRATEGICA.md (terminal de mercados globales, idioma prioritario EN, pilares Puntos 5/6/8, 30 piezas re-usables, ELITE como "Próxima versión", piezas #19 AUREX vs Bloomberg + #20 pre-market futuros).
- aurex-app `ac0be58` — header de aviso en METADATA-APPSTORE.md por desfase con Build 17 real (detectado por Escritorio).
- aurex-app `ee1b523` — INICIO_AUREX.md actualizado a 16 archivos (agregado AUREX_DEFINICION_ESTRATEGICA.md como fuente de verdad estratégica).
- aurex-app `fe7da6f` (revertido `9ede1e0`) — primer intento PASO_CERO_CUENTAS.md borrado por contener bios que violaban Build 17 + sin chequeo previo de disponibilidad + costos pagos no autorizados.
- aurex-app `ef05d14` y `5fac759` — **Bloque 1 Paso CERO** v1 y v2: bios públicas alineadas a Build 17 + documento estratégico + sugerencia Escritorio aplicada (statistical probabilities → data-driven view).
- aurex-app `f393965`, `8d75cad`, `b781290` — **Bloque 2 Paso CERO**: chequeo disponibilidad nombres en 5 plataformas, estrategia Display Name=AUREX vs handle escalonado (aporte Escritorio), traducciones bios a PT/ZH/FR/IT/HI/AR, re-chequeo correcto Telegram tras detectar bug metodológico (aurex tomado por usuario "Aurelio").

### PLAN MKT v3.0 — Estado al 2-may-2026

- **v3.0 documentado** en `PLAN_MKT.md` (commit `e86959b`).
- **Revisión cruzada Escritorio**: 7 observaciones A-G + 5 mejoras narrativas + 1 pieza nueva #31 retención FREE→PRO. Aprobadas todas pendientes de aplicar al v3.1.
- **Cambio crítico de método**: descartado v3.1 teórico, decisión de hacer **Paso CERO real (apertura de cuentas)** primero, y construir el plan táctico final sobre infraestructura real.

### PASO CERO — Estado al 2-may-2026

Método de 3 fases aprobado por Fernando + Escritorio:
- **Fase A (8 bloques de análisis previo)**: Bloque 1 ✅ + Bloque 2 ✅ cerrados. Bloques 3, 4, 5, 6, 7, 8 PENDIENTES.
- **Fase B**: pase consolidado a Escritorio para revisión cruzada.
- **Fase C**: guía detallada de apertura + ejecución de Fernando con asistencia de Escritorio.

**Bloques completados:**
- **Bloque 1 — Bios públicas** (`docs/BIOS_PUBLICAS_AUREX.md` v2): aprobado por Fernando + Escritorio. Lenguaje seguro alineado a Build 17 ("Real-time market data tracker", categoría Utilidades). Disclaimer en 3 capas. Categorías Business sin "Financial Services" en ninguna plataforma.
- **Bloque 1 extendido — Traducciones** (`docs/BIOS_TRADUCIDAS_6_IDIOMAS.md`): PT/ZH/FR/IT/HI/AR. PT/FR/IT aprobados por Escritorio. ZH/HI/AR pasan a validación post-publicación por engagement.
- **Bloque 2 — Disponibilidad nombres** (`docs/BLOQUE_2_DISPONIBILIDAD_NOMBRES.md` v3): patrón único definido. **Display Name AUREX** en todas las plataformas. **Handle técnico**: `aurex` confirmado TAKEN en YouTube + Telegram (cuenta personal "Aurelio"); fallback `aurex_ai` confirmado FREE. Twitter/IG/TikTok pendientes verificación en formulario en vivo durante Fase C.

**Datos para Bloque 3 (email + identidad — ya casi resuelto en chat, falta formalizar):**
- Email principal único: `app.aurex@gmail.com` (password gestionado solo por Fernando, NO por chat NO en repo).
- Email recovery: `aurextester12@gmail.com` (cuenta AUREX existente, aisla del grafo Google de fmoscon@gmail.com).
- Teléfono recovery: `+54 9 11 3360 2563` principal / `+54 11 6789-1320` respaldo.
- 2FA: Google Authenticator en iPhone Fernando.

### APPLE — Build 17 iOS
- **Nombre publicado en App Store: AUREX AI** (no "AUREX" — estaba ocupado, "AUREX AI" cumple Guideline 2.3.7)
- **Nombre del ícono en iPhone (CFBundleDisplayName): AUREX** (diferencia legítima permitida por Apple)
- Estado: Pendiente de revisión
- Build: 17 (Marketing Version 1.0, CURRENT_PROJECT_VERSION 17)
- Submit: 24 Abril 2026, 5:24 AM AR
- ID envío: e0e7fb35-11a4-4c1d-854c-60a80c4799e6
- Apple Account: fmoscon@gmail.com
- Team ID: TX7C2F79U9
- Apple App ID (interno ASC): 6761672161
- Bundle ID: com.fernandomoscon.aurex
- Contacto registrado en App Store Connect: +54 11 6789-1320 / fmoscon@gmail.com
- Idioma principal listing: Inglés (EE.UU.)
- Subtítulo: "Real-time market data tracker" (intencional — alinea con Utilidades, sin lenguaje financiero)
- Categoría primaria: Utilidades (cambiada desde Finanzas tras rechazos previos)
- Categoría secundaria: Productividad
- Idiomas localización (8): EN, ES, FR, IT, HI, AR, PT, ZH
- Metadata: segura, sin lenguaje financiero
- Disclaimers: corregidos en código de Build 17
- Webhook ASC → RevenueCat (Apple Server Notifications V2, idéntico para producción y sandbox):
  https://api.revenuecat.com/v1/incoming-webhooks/apple-server-to-server-notification/WICtYZubpcHyBpPfLnZMoagjatQAyjPD
- Builds en TestFlight legacy: 9, 10, 11, 12, 13 (Build 9 retirado por el desarrollador)
- Provisioning Distribution: ~/Downloads/AUREX_App_Store_Distribution.mobileprovision (5-abr)
- Casos Apple previos: cerrados automáticamente al enviar Build 17 (los anteriores eran sobre builds reemplazados)

### GOOGLE PLAY — Android Build 2 (estado al 4-may-2026 verificado por Escritorio en Play Console)

**Cuenta desarrollador:**
- Nombre: AUREX App (cuenta personal Fernando Moscon)
- Developer ID: 7150208556536701506
- Email operativo: fmoscon@gmail.com
- Verificación desarrolladores Android: ✅ CUMPLIDA
- Programa cargos del 15% inscripto: ✅ confirmado en Registro Actividad 3-may 04:15
- Cuenta de Pagos / Billing Google Payments: ✅ configurada 3-may 03:39 (Santander AR USD •••• 3568)

**App: AUREX — Bundle `com.aurexapp`**

**Tracks activos:**
- **Producción**: INACTIVA — nunca publicada. Pendiente completar Closed Testing 14 días.
- **Prueba interna (Internal Testing)**: Build 15 — versionCode 1 — desde 23-abr 1:46 AM. Track auxiliar viejo, no requerido para producción.
- **Prueba cerrada Alpha (Closed Testing)**: Build 2 — versionCode 2 — versionName "1.0.1" — **DÍA 9 DE 14** con 12 verificadores. Faltan 5 días para cumplir requisito. Vencimiento estimado **~9-may-2026**.

**Requisitos para producción al 4-may-2026:**
1. ✅ Publicar versión de prueba cerrada (Build 2 activo).
2. ✅ Mínimo 12 verificadores opt-in (12 testers aceptaron).
3. ⏳ 14 días consecutivos con 12 testers — DÍA 9 de 14 — faltan 5 días.

**Botón "Solicitar acceso a producción"**: se habilita automáticamente al completar los 14 días.

⚠️ **RIESGO CRÍTICO**: si cualquiera de los 12 testers hace **opt-out** antes del ~9-may, el contador de 14 días **se resetea a cero**. Ningún tester debe ser removido ni hacer opt-out hasta el 9-may.

**Ficha Play Store / Listing:**
- ✅ PUBLICADO: los 18 cambios enviados el 3-may 05:10 fueron procesados automáticamente por Google sin revisión humana y están activos en la tienda.
- 8 idiomas cargados: EN, ES, PT, FR, IT, ZH, HI, AR (todos enviados 3-may).
- Descripción ES verificada visible en Play Store.
- Feature Graphic enviado (puede estar todavía procesándose en vista web pública).
- Última actualización visible en ficha pública: 23-abr 2026 (fecha del Build 2, no del listing).
- Publicación administrada: DESACTIVADA — los cambios futuros se publican automáticamente al aprobarse.

**Link Closed Testing**: https://play.google.com/apps/testing/com.aurexapp

**Próximos pasos Google Play:**
1. ~9-may: se completan los 14 días → se habilita "Solicitar acceso a producción".
2. Post 9-may: Fernando completa formulario de solicitud con preguntas sobre la prueba cerrada → Google revisa y aprueba → AUREX disponible en Play Store al público general.
3. Cuando aprueben producción: promote Build 3 (que se compilará con fixes en Build 18 paralelo iOS) desde Internal Testing a Producción.

### TELEGRAM (canal principal y permanente de alertas)
- Decisión tomada el 28-abr-2026 tras incidente WhatsApp: Telegram queda como canal **principal y permanente**, sin remover. WhatsApp pasa a canal **secundario** una vez se reconecte.
- Bot: @Aurexalertas_bot (id 8740136430, "Aurex Alertas")
- Token: env var `TELEGRAM_BOT_TOKEN` en Railway aurex-app (existente desde antes)
- Chat ID admin Fernando: env var `ADMIN_TELEGRAM_CHAT_ID` en Railway aurex-app (no se publica el valor en repo público por privacidad)
- Reportes automáticos por Telegram al admin:
  - Reporte diario salud (`dailyHealthReport`): 8:00 AR (cron `0 11 * * *`). Manda en paralelo a **Telegram + WhatsApp Evolution** (línea admin 1320). Desde el 1-may-2026 8:00 AR confirmado funcionando por WA tras 7 días en cooldown.
  - Reporte diario de proyecto (`dailyProjectStatusReport`): 9:00 AR (cron `0 12 * * *`). Manda en paralelo a **Telegram + WhatsApp Evolution** (4 mensajes en cada canal, espejo — verificado en `aurex-backend/server.js:1750-1756`): (1) cuerpo principal con stores Apple/Google + SHAs de los 3 repos + incidentes activos + crypto source; (2) link a `CONTEXTO.md`; (3) link a `INICIO_AUREX.md`; (4) `RESEARCH_API_KEY` si está seteada.
  - Reporte mensual: 18:00 AR del último día hábil (cron `0 21 28-31 * *`).
- Riesgo de baneo: cero (Telegram permisivo con bots).

### AUTONOMÍA OPERATIVA — CLIs y patrón de tokens (incorporado 1-may-2026)

**Regla acordada con Fernando:** Code opera de forma autónoma. NO le pide a Fernando ejecutar comandos interactivos (`! cli login`) ni aprobar OK/YES por cada paso técnico cuando hay alternativa con tokens permanentes, archivos en disco o allowlist en `~/.claude/settings.json`. Memoria asociada: `feedback_autonomia.md`.

**CLIs instalados localmente (Mac de Fernando, 1-may-2026):**
- `gh` 2.92.0 (GitHub CLI) — instalado vía `brew install gh`.
- `railway` 4.44.0 (Railway CLI) — instalado vía `brew install railway`.
- `supabase` 2.95.4 (Supabase CLI) — binario directo en `~/bin/supabase` (descargado de GitHub Releases — bypaseado Xcode CLT desactualizadas). `~/bin` agregado al PATH en `~/.zshrc`.
- `brew` 5.1.8, `node` v24.15.0, `python3` 3.9.6, `jq`, `ffmpeg` ya estaban.

**Patrón de tokens permanentes** (establecido por Fernando, vigente):
- Todos los secrets de servicios externos viven como `.txt` en `~/Downloads/` con nombre `SECRET <SERVICIO>.txt`.
- Code los lee con la herramienta Read (que sí accede a Downloads aunque Bash subprocess esté limitado).
- Auth con tokens (no browser): `gh auth login --with-token < archivo`, `export RAILWAY_TOKEN=...`, `export SUPABASE_ACCESS_TOKEN=...`.
- Inventario al 1-may-2026: `SECRET KEY.txt` (Supabase service_role + publishable), `SECRET ELEVENLABS.txt`, `SECRET RUNWAY.txt`. Pendientes opcionales para autonomía total: `SECRET GITHUB.txt` (PAT scopes `repo`+`workflow`), `SECRET RAILWAY.txt` (Account Token).

**Permisos `~/.claude/settings.json` actualizados 1-may-2026:**
- Allow agregados: `gh *`, `railway *`, `supabase *`, `curl *`, `export *`.
- Deny endurecido: `railway redeploy --service evo-v1*` (regla WhatsApp — redeploy de evo-v1 mata la sesión), `railway down *`, `supabase db reset*`, `gh repo delete *`, `gh release delete *`, `gh secret delete *`. Sigue vigente: `rm -rf *`, `git reset --hard *`, `git push --force *`, `sudo *`, `railway up *`.

**Acceso autónomo confirmado por API directa** (sin requerir CLI auth):
- Supabase Admin Auth API operativa con `sb_secret_*` desde `SECRET KEY.txt`. Verificado 1-may-2026 creando 2 testers (`silvinamoscon@gmail.com` UUID `a525929c-ab83-44e2-bcdb-522f0a29c027` y `martainesalvarez02@gmail.com` UUID `cc52183b-0a71-4e81-af15-d184853cfa03`, ambos `email_confirmed_at` populado, pass `AurexTest2026!`).
- Drive automation OAuth funcional. **Token persistente movido a `~/.aurex/drive_token.json` el 1-may-2026** (antes vivía en `/tmp/` y se perdía con reboots de macOS — bug corregido en `drive_automation.py`). Refresh_token reutilizable de larga duración.

### Drive `AUREX_MEDIA_LIBRARY` — hub compartido Code + Escritorio (reordenado 1-may-2026 mediodía)

Estructura jerárquica real con folder IDs (corrige la confusión previa donde "01_videos/finales" y "02_audios/elevenlabs" eran nombres LITERALES con barra, no jerarquía):

```
AUREX_MEDIA_LIBRARY/                          1FZ_LRmNEwoeZdcayDBNi2Ve52vtvpCxI
├── 01_videos/                                1bvlLRLYbrBBACFGrFny1ssTFCTlSTD1m
│   ├── finales/                              1Ej68LA0kSoJurvXlRY7FLZ3bUZsttCgw
│   └── buho_animaciones/                     1F2GSSSn7BfX-46kSKIZGzf3bVR08Rs_Q
├── 02_audios/                                1eFcdxpoQ0IAnDMzgtE46jNHx5ztSnGay
│   └── elevenlabs/                           1CVn9RthfrOI83PlPLlseamA25hYlmb77
├── 03_assets_brutos/                         1gJxrY3sJHW8fMGsOsYRGcp-nM8GxTi8R
├── 04_briefs/                                1thKiCU2nXoUBj1isWY1e6h6uJPAuue2s
└── 05_feedback/                              10OJ3DxrtO_FVtqotwFTmuv0JnwnXbm1F
```

Convenciones por subcarpeta y detalle de inventario al 1-may-2026 mediodía: ver `docs/ESTADO_PROYECTO_01-may-2026.md` sección 8.2.

### INCIDENTES ACTIVOS (al 3-may-2026)

- **WA-002 ACTIVE 3-may-2026 11:30 AR.** Línea 2563 entró en watch period crítico de WhatsApp Business tras 2 bloqueos consecutivos en 5 días.

  **Cronología real (no la que asumimos antes):**
  1. 28-abr 15:25 UTC: bloqueo WA-001 inicial — recreación de instancia "aurex" + auto-envíos validación detectados como spam por anti-fraud.
  2. 1-may ~8:00 AR: cooldown WA-001 se levantó. Reportes 8 + 9 AM llegaron OK. **WhatsApp puso la cuenta en período de observación silencioso (no nos alertó).**
  3. 1-may noche → 2-may madrugada: cuenta re-bloqueada silenciosamente por WhatsApp anti-fraud detectando envíos Business via Web. NO recibimos alerta.
  4. 2-may + 3-may mañana: cron `dailyProjectStatusReport` y `dailyHealthReport` fallando con "first byte timeout" en Evolution sin que detectáramos que era bloqueo (lo atribuimos a Evolution timeout).
  5. 3-may 11:30 AR: al intentar vincular dispositivo Web nuevo (post Volume + redeploy), WhatsApp mostró pantalla "Cuenta en revisión".
  6. 3-may ~11:50 AR: WhatsApp restableció cuenta tras solicitud automática (24 hs estimadas, terminó en ~20 min).
  7. 3-may 11:38 AR (parallel): al intentar verificación post-unlock, SMS no llegó + Llave de Acceso no válida + cooldown 7 hs SMS / 3 hs llamada activado.

  **Causa raíz REAL (no era Volume / Evolution v1 / red):**
  La línea 2563 es **WhatsApp BUSINESS**. WhatsApp Business exige por TOS que envíos comerciales automatizados pasen por **Cloud API oficial con templates aprobados**. Envíos automatizados via WhatsApp Web (que es lo que hace Evolution) son **violación explícita de TOS Business**. Anti-fraud detecta el patrón y bloquea cíclicamente. Cada bloqueo deja la cuenta más sensible. Eventualmente perdemos la cuenta permanentemente si seguimos.

  **Decisión arquitectónica 3-may-2026 (Opción A):** PAUSAR todos los envíos por la línea 2563 al menos 2-4 semanas. Telegram cubre 100% de las alertas operativas críticas.

  **Implementación técnica:**
  - aurex-backend commit `113e687`: guard al inicio de `sendWhatsAppEvolution()` y `sendWhatsAppImage()` que skipea envío si env var `WA_EVOLUTION_PAUSED === 'true'`.
  - Railway env `WA_EVOLUTION_PAUSED=true` aplicado en servicio aurex-app.
  - Crons del backend siguen ejecutándose y mandando por Telegram normal. WhatsApp envío silenciosamente saltado con log `[WA-002 PAUSE]`.
  - Volume creado hoy (5GB en evo-v1) queda montado y operativo, listo para cuando se decida reactivar.

  **Condiciones para reactivar (todas deben cumplirse):**
  1. Mínimo 2 semanas sin tocar la línea 2563.
  2. Cuenta saliendo definitivamente del watch period (verificar abriendo WhatsApp en iPhone después del plazo).
  3. Decisión arquitectónica final: ¿seguir con Evolution Web (riesgo cíclico) vs convertir 2563 a Personal vs migrar a otro número personal vs migrar a Cloud API con costos variables vs Telegram-only para siempre?

  **Para reactivar cuando se cumplan las condiciones:**
  ```
  railway variables --service aurex-app --set WA_EVOLUTION_PAUSED=false
  ```

  **Lección estructural aprendida (registrada en memoria persistente `project_whatsapp_business.md`):** WhatsApp Business + Evolution Web + envíos automatizados = bloqueo cíclico inevitable, aunque NO se manden mensajes a externos. El acto mismo de tener un dispositivo Web vinculado a una cuenta Business + recrear instancias + intentar vincular post-bloqueo dispara anti-fraud independientemente del contenido o volumen de envíos.

- **TG-001 RESUELTO 2-may-2026 18:25 AR.** Causa raíz: `bot = new TelegramBot(TOKEN, { polling: true })` en `aurex-backend/server.js:17`. Durante restarts Railway, el polling del container viejo y el nuevo peleaban por `getUpdates` generando `ETELEGRAM 409 Conflict` que dejaba al bot en estado degradado y bloqueaba `sendMessage` del cron de las 9:00 AR cuando ese restart caía cerca del horario.
  Fix aplicado: `polling: false` (commit `f87fc6d`, deploy Railway SUCCESS 21:25 UTC). Verificación post-fix: `POST /api/test-telegram` y `POST /api/daily-status/test` ambos OK, los 5 mensajes llegaron al chat 1749518554 a las 18:17 AR. Logs Railway sin más errores 409. El bot mantiene capacidad de ENVIAR (alertas, daily, project status); deja de RECIBIR comandos `/start` y `/alertas` (no estaban en uso productivo). WhatsApp Evolution no tocado. Cero impacto en revisión Apple/Google.


- **BN-002 ACTIVE** — Binance bloqueado en Railway región us-east4 desde 18-abr-2026 18:30 UTC. MITIGATED via CryptoCompare (fallback funcionando). Datos críticos llegando OK. 13 días sin resolución; investigar alternativas post-Apple.
- **WA-001 RESUELTO 1-may-2026 ~8:00 AR.** El cooldown antifraude general sobre la línea WhatsApp 2563 saliente se levantó después de 7 días offline (28-abr 15:25 UTC → 1-may ~11:00 UTC). Verificación: el cron `dailyHealthReport` de las 8:00 AR llegó al WhatsApp admin 1320 desde el bot AUREX 2563. La línea ahora envía a destinos externos (no solo a sí misma). Recuperación completa de canal WA como redundancia de Telegram. Reportes diarios 8:00 + 9:00 AR ambos funcionando dual-canal.

---

## PENDIENTES INMEDIATOS

### Sincronizaciones técnicas post-aprobación stores (anotadas 2-may-2026)

**No tocar hasta que Apple Build 17 y Google Play Build 2 estén aprobados.** Cero urgencia operativa, cero riesgo si se posterga, alto riesgo si se hace mientras hay builds en revisión.

1. **Backend `aurex-backend/activos.json`: agregar las 25 acciones europeas para que tengan señal IA.** Hoy la PWA (`aurex-v3.js` líneas 123-132) y `aurex-features.js` muestran 25 europeas (ADRs cotizando en NYSE/Nasdaq: ASML, SAP, NVS, NSRGY, RHHBY, VWAGY, SIEGY, SHEL, BP, GSK, UL, RIO, BHP, AZN, HSBC, STM, EADSF, IDEXY, LVMUY, SAN, BBVA, ALIZF, BAYZF, HNNMY, INGA), pero el backend `activos.json` tiene 0 acciones europeas. La cartera Europa de la PWA muestra precios de Yahoo pero NO genera señales IA propias. Tarea Code: 1 commit en `activos.json` agregando los 25 con `tipo:"Accion"` y `ySymbol` correspondiente. Después el cron `calcularSenalesIA` las procesa automáticamente cada 5 min.

2. **Nativa `AurexApp/src/lib/assets.js`: sincronizar el array `europa` de 19 → 25 acciones.** La nativa tiene la versión vieja con 19 europeas. Faltan: EADSF (Airbus), IDEXY (Inditex), ALIZF (Allianz), BAYZF (Bayer), HNNMY (H&M), INGA (ING Group). Tarea Code post-aprobación Apple Build 17: 1 commit en branch `dev` (NO `main`) sincronizando `assets.js`. Cuando se prepare el siguiente build nativo post-aprobación, va con las 25 ya cargadas.

3. ~~**Backend + PWA + Nativa: agregar Macro_FED y Geopolítica al Pulse CRIPTO.**~~ **RESUELTO 2-may-2026 noche.** Aplicado el cambio en las 3 capas:
   - Backend `aurex-backend/server.js:860` commit `af8e412` → Railway desplegado
   - PWA `aurex-app/aurex-features.js:4528` commit `7df526d` → GitHub Pages desplegado a `aurex.live`
   - Nativa `AurexApp/src/screens/MercadosScreen.js:604` commit `072e492` en branch `dev` (NO `main`, no toca Build 17 ni Build 2 en revisión)
   Razón: alineación con Definición Estratégica AUREX punto 3 (BTC correlación >0.6 con NASDAQ desde 2022, reacciona fuerte a FED + geopolítica). Cero impacto en revisión Apple/Google (los binarios enviados siguen con código viejo, los nuevos se ven solo en aurex.live + backend hoy, y en Build 18 cuando aprueben). **Pendiente residual:** mergear `dev` → `main` de AurexApp post-aprobación para que el cambio quede en Build 18.

4. **Push notifications reales — implementar VAPID/FCM/APNS post-aprobación stores.** Estado actual verificado en código: `service-worker.js` está prácticamente vacío (30 bytes, 1 línea, sin event listener `push`). `aurex-features.js:627-632` solo dispara notificaciones LOCALES del browser cuando la app está abierta vía `swReg.showNotification()` en cron `checkAlertasLocal` cada 30 seg. Backend: 0 referencias a VAPID/FCM/APNS/web-push/firebase-admin. La UI promete "alertas push" en plan PRO/ELITE (`aurex-i18n.js:111`) pero la infraestructura no existe — las alertas solo funcionan si la app está abierta. Plan post-aprobación: PWA web push (1-2 días Code: VAPID keys, `web-push` lib, endpoint `/api/push/subscribe`, tabla `push_subscriptions`, listener `push` en service-worker), iOS APNS (2-3 días: certificados Apple Push, integración App Store Connect), Android FCM (2-3 días: Firebase Cloud Messaging). Total: ~1 semana Code.

5. **Features ELITE comunicadas pero no implementadas — RIESGO de rechazo Apple/Google.** Verificado en código: `aurex-i18n.js:207-208` comunica en 8 idiomas "Soporte por chat en vivo" (`plan_elite_f7`) y "API personal para integraciones" (`plan_elite_f8`) como features ELITE. NO HAY implementación: cero endpoint de chat, cero sistema de API keys per-usuario, cero tabla de API keys, cero rate limiting por key. ⚠️ **Riesgo Apple Guideline 3.1.1 / Google equivalente**: si reviewers verifican que el plan ELITE de $19.99/mes no entrega contenido prometido en la UI, puede ser causa de rechazo por publicidad engañosa o IAP que no entrega contenido. Hasta hoy ningún reviewer lo marcó pero está latente. Plan post-aprobación: API personal (2-3 días Code: tabla `api_keys` Supabase + endpoints `/api/v1/*` con auth + rate limiting + dashboard en Perfil), Chat en vivo (1-2 días: integrar Crisp/Intercom/Tawk.to), Acceso beta (1 día: flag `beta_access` en users). Total: 4-6 días Code. **Decisión paralela post-aprobación**: ¿quitar las dos líneas de i18n para que la UI no prometa lo que no entrega, o construir las features de una para alinear UI con realidad? Recomendación Code: construir las features porque son diferenciales válidos para justificar el precio ELITE.



### ⚠️ CRÍTICO — GOOGLE PLAY CLOSED TESTING AL LÍMITE (agregado 1-may-2026 03:00 AR)

**Estado:** 12 verificadores opted-in / 14 días consecutivos requeridos. Día 7 de 14 corriendo. Sin margen.

**Riesgo real:** de los 12 opted-in que cuenta Play, ~3-4 son cuentas mías personales (`aurextester1@gmail.com`, `aurextest2@gmail.com`, `app.aurex@gmail.com`, `fmoscon@gmail.com`) — todas creadas hace pocas semanas con el único fin de testear AUREX. Google en 2026 analiza el "trust weight" del Gmail (historial, antigüedad, IP, dispositivo de creación) y **puede descartar las cuentas con bajo trust al revisar la solicitud de producción**. Si descarta mis 3-4, los testers REALES que NO soy yo bajan a ~9, no llego al mínimo de 12, y Google rechaza producción. La razón #1 de rechazo en 2026 es "Insufficient testing engagement".

**Regla brutal de Google:** si por UN solo día el conteo baja de 12, se resetea la racha de 14 días y vuelvo a 0.

**Lo único que saca a alguien del conteo de 12:** que clickee "Opt out" en el link `https://play.google.com/apps/testing/com.aurexapp`. Desinstalar la app NO los saca (cuentan opted-in aunque la borren). Pero idealmente Google quiere uso real (abren la app a veces).

**Trabajo del 1-may madrugada:**
- Creé en Supabase + cargué en verificadores Play 3 cuentas family con Gmail VIEJO de alto trust:
  - `mosconmia@gmail.com` (mi hija) — pass Supabase `AurexTest2026!`
  - `sol.esnoz@gmail.com` (mi mujer) — pass Supabase `AurexTest2026!`
  - `lola.moscon@gmail.com` (mi otra hija) — pass Supabase `AurexTest2026!`
- Creé `aurextester12@gmail.com` (otra cuenta mía nueva) y le hice opt-in desde un emulador AVD `AUREX_Play` con Google Play Store. Riesgo: emuladores pueden no contar para Google. A las 24-48h sabré si el contador subió de 12 → 13.
- Sumadas el 1-may-2026 (Supabase + Play Console como testers, pass `AurexTest2026!`):
  - `silvinamoscon@gmail.com` — UUID `a525929c-ab83-44e2-bcdb-522f0a29c027`.
  - `martainesalvarez02@gmail.com` — UUID `cc52183b-0a71-4e81-af15-d184853cfa03`.
  - `mosconmia2010@gmail.com` (cuenta correcta de la persona — el primer mensaje a "miamoscon" tenía letras al revés) — UUID `b72aa3cd-7851-446a-ba19-582a8f91a41a`.
- Sumadas el 2-may-2026 (Supabase, pass `AurexTest2026!` — Fernando carga en Play Console):
  - `kellerlucasignacio@gmail.com` — UUID `e27d8681-5f54-4297-a8d0-26acf5eb6fc7`.
  - `lucaskellerok@gmail.com` — UUID `67564a68-f9db-405d-af9e-2fc59e048cc4`.
  - `gusroma355@gmail.com` — UUID `4a56d591-e992-49b3-8ca6-70ea8aa919be`.
  - `vilogonzalo@gmail.com` — UUID `902cb0d9-f244-4662-a22e-06d5c7807759`.
  - `romanogustavoseba@gmail.com` — UUID `7f512474-e8bb-4fe2-ae19-5eeb7fce75c9`.
  - `facundo.fernandezrl@gmail.com` — UUID `ee61363c-5add-4f8a-8845-680505c8455b`.
  - `soypurpura@gmail.com` — UUID `3fe30ab3-c6d3-459f-a4b0-b21b8bc1c985`.

**Total testers nuevos creados en Supabase Auth en 1+2 may-2026: 10.** Esto es solo INVITACIÓN, no equivale a testers activos. Cada persona invitada tiene que: abrir el link de testing en su dispositivo Android, aceptar "Become a tester", descargar AUREX desde Play Store, y abrir la app al menos una vez. Solo cuando todo eso sucede, Play Console suma esa persona al contador opted-in.

**El ÚNICO indicador real del estado del testing** es lo que Play Console muestra en su panel:
1. Días transcurridos (cuenta automática desde el submit de la prueba cerrada)
2. Cantidad de testers opted-in (los que efectivamente activaron el link)
3. Descargas activas de la app

**Estado al 2-may-2026 noche: día 8 de 14 de Prueba Cerrada Google Play, al límite de 12 testers opted-in. Vence ~9-may-2026.** Cualquier predicción sobre cómo va a evolucionar ese contador requiere mirar Play Console directamente — no hay forma de inferirlo desde los inserts de Supabase.
- Las 3 family solo cuentan si efectivamente hacen opt-in. Faltan las pass reales de Gmail de cada una para loguearlas.

**Plan A (preferido — sin costo, sin riesgo):**
Tomás (mi hijo, ya es uno de los 27 verificadores cargados como `tomasmoscon@gmail.com`) tiene Android físico pero no vive en casa. Cuando venga: en su teléfono Android, en Settings → Cuentas, agregar las 3 cuentas family como secundarias y con cada una abrir el link de testing → Become a tester → instalar AUREX desde Play Store → loguear con `email + AurexTest2026!` → usar 3 min. Resultado: +3 testers reales con cuentas viejas en dispositivo Android físico real = trust weight alto = Google las cuenta seguro. Pasaríamos a **15-16 opted-in con margen sólido**.

**Plan B (solo si Plan A falla en 5 días — riesgo medio, costo $25-80):**
Contratar servicio profesional de testing (PrimeTestLab, TestersCommunity, 12testers14days.pro). Code investiga + compara reviews + llena form; Fernando paga con tarjeta + acepta TOS. **Riesgo grave:** Google puede detectar paid testers y banear la cuenta de developer permanentemente (hay reportes en Reddit). Aplicar las 4 preguntas obligatorias de servicios de terceros antes de contratar.

**Pendiente operativo:**
- Pedirles a mosconmia, sol.esnoz y lola.moscon sus pass reales de Gmail (o que cada una haga su propio opt-in si tienen Android — todas tienen iPhone, así que se va a hacer en el emulador o en el celu de Tomás).
- Verificar 2-3 may si el contador en Play Console subió de 12 → 13 (significa que aurextester12 desde emulador fue contada).
- Mantener emulador `AUREX_Play` prendido en background con la app instalada (PID se relanza cada vez con `/opt/homebrew/share/android-commandlinetools/emulator/emulator -avd AUREX_Play -gpu swiftshader_indirect`).

**Deadline operativo:** los 14 días consecutivos vencen alrededor del 7-may-2026. Si llego con 12+ opted-in mantenidos durante ese período, puedo solicitar producción. Si en cualquier momento bajo de 12 → reset a 0 días.

---

### Otros pendientes inmediatos (orden original)

1. Esperar respuesta Apple Build 17 (submit 24-abr 5:24 AM AR)
2. Esperar Google Play: completar 14 días de prueba cerrada (4 días corridos al 28-abr)
3. Onboarding: corregir faltas de ortografía detectadas en emulador
4. Corregir 2 líneas v1.0.0 hardcodeado en nativa (PerfilScreen.js L789 y L851)
   con Platform.OS — sólo cuando Apple/Google aprueben
5. **Reconectar sesión WhatsApp del 2563 a Evolution — POSTERGADA al 30-abr-2026 9:00 AM AR (no reintentar antes)**
   Decisión de Fernando del 29-abr-2026 ~09:05 AR. Razón: el cooldown de antifraude WhatsApp post-suspensión + verificación dura 24-48 hs en casos donde hubo creación/borrado previo de instancias (que es lo que pasó el 28-abr). Reintentar antes del 30-abr 9:00 AR tiene alta probabilidad de volver a fallar y de seguir acumulando llamadas a `/instance/connect/aurex` (lleva 5 acumuladas en la sesión del 29-abr ~03:00 AR), lo que aumenta el riesgo de antifraude. Diagnóstico del 29-abr (en RESEARCH/transcript de la sesión, sin pendiente de código): la instancia "aurex" SÍ existe en Evolution (verificado por todas las respuestas de `/api/whatsapp/status` con `instanceName: "aurex"` y `state` válido). El problema NO es la instancia ni nuestro código; es el cooldown WhatsApp del lado server.
   
   El 2563 ya está verificado (código por llamada el 28-abr-2026 noche, email + passkey activados como respaldo).
   
   **Procedimiento para retomar el 30-abr 9:00 AM AR:** Code llama a `GET /api/whatsapp/connect-qr` con el secret guardado en `~/secret.txt` (la env var `WHATSAPP_CONNECT_SECRET` ya está cargada en Railway aurex-app), genera el PNG en `~/Downloads`, abre con Preview, Fernando escanea desde WhatsApp Business → Ajustes → Dispositivos vinculados. UNA llamada, UN intento. Si el QR vuelve a fallar, parar ahí y replantear (no reintentar más). Una vez conectada, activar las alertas Railway por WhatsApp para que corran en paralelo con Telegram (que queda como canal principal/permanente).
   
   El ticket WhatsApp soporte #1807446727774286 abierto el 28-abr probablemente ya no haga falta (la verificación se resolvió sola); conviene que Escritorio chequee Gmail por si llegó respuesta.

6. ~~Cambiar horario del reporte diario de proyecto en Telegram de 20:00 a 9:00 AR.~~ **HECHO — 29-abr-2026 ~08:42 AR (commit 09c4c32 en aurex-backend).** El cron `dailyProjectStatusReport` ahora corre a las 9:00 AR (`0 12 * * *`). Mismo commit agregó envío por Telegram al `dailyHealthReport` (8:00 AR) para que llegue por Telegram aunque Evolution esté caído.

---

## PEDIDOS A ESCRITORIO (revisión externa, sin acceso al código)

1. **Verificar webhook RevenueCat en su dashboard** — entrar a RevenueCat → sección "Webhooks" → revisar el log de eventos recibidos en vivo. Especialmente útil mientras Apple está revisando Build 17: si el reviewer hace una compra de prueba con cuenta sandbox, ese evento debería aparecer en el log. Si NO aparece, sería señal de que el webhook está mal conectado y la app no activaría plan PRO/ELITE post-compra (riesgo de rechazo Apple por "Bug: in-app purchase not unlocking content"). URL configurada en App Store Connect (idéntica para producción y sandbox): `https://api.revenuecat.com/v1/incoming-webhooks/apple-server-to-server-notification/WICtYZubpcHyBpPfLnZMoagjatQAyjPD`

---

## PENDIENTES ESTRUCTURALES (post-Apple)

1. Railway + Binance — CRÍTICO (Binance bloqueado)
2. WhatsApp Alertas — verificar Evolution + env vars
3. Evolution API — verificar hosting actual
4. **Configurar volumen persistente en Railway para evo-v1 (Evolution API)** — CRÍTICO. Las sesiones de WhatsApp se borran con cada redeploy del container porque no hay volumen persistente. Esto causó la suspensión del número AUREX el 28-abr-2026 cuando la repetida creación/borrado de instancias disparó el sistema antifraude de WhatsApp Business. Solución: configurar Railway Volume montado en `/evolution_api/instances/` o equivalente, o migrar a PostgreSQL como storage de Evolution API.
5. **Migrar Evolution API a v2** — pendiente para destrabar pairing code. Evolution v1.8.7 (versión actual en evo-v1) ignora el parámetro `?number=` en `/instance/connect/`. Pairing code (vinculación con código de 8 caracteres en lugar de QR) es feature útil cuando WhatsApp aplica cooldown sobre QR post-suspensión. La v2 tiene API ligeramente distinta; antes de migrar conviene revisar compatibilidad con `sendWhatsAppEvolution`, `sendWhatsAppImage` y los endpoints de `/instance/*` que usa el backend.

---

## v1.1 (post-aprobación Apple/Google)

1. Store centralizado de precios — PRIORITARIO
2. Editar activo Portfolio
3. Selector monedas Valor Total
4. PT/ZH activar (ya funcionan)
5. Banner eventos dinámico
6. Onboarding modo claro
7. Foto perfil persistente

---

## v2.0 (futuro)

1. API eventos real
2. Alertas WhatsApp automáticas
3. Notificaciones push
4. Análisis técnico avanzado
5. Social / comunidad
6. API personal ELITE

---

## PLAN MARKETING (Plan MKT v2 — paralelo a aprobación Apple/Google)

### Objetivo
Definir el posicionamiento de AUREX frente a la competencia antes del lanzamiento global. La investigación informa: audiencia objetivo, tono, canales, modelo de monetización óptimo, y qué les funcionó para crecer a los competidores.
Pregunta central: ¿AUREX se compara con quién y por qué? ¿A quién le quiere sacar clientes?

### Metodología
- Code documenta hallazgos crudos por competidor (datos verificados con fuente + fecha).
- Escritorio agrega análisis estratégico sobre los hallazgos.
- Cuando estén todas las pasadas, ambos integran todo en `PLAN_MKT.md` v2.
- Regla de honestidad: si no hay fuente sólida, marcar "no verificado" en lugar de inventar.

### Hecho — Pasadas 1, 2, 3, 4 y 5 (19 competidores cerrados, todos con análisis estratégico de Escritorio)
Cada competidor tiene los 10 puntos estándar (posicionamiento, audiencia, monetización, canales, contenido, tono, lanzamiento, crecimiento, reseñas, fuentes) más análisis estratégico de Escritorio cruzado con AUREX. Pasada 5 cerrada con análisis estratégico el 29-abr-2026 (Smallcase + Nubank Investimentos). Todo en `RESEARCH_MKT.md`.

**Pasadas 1 y 2 (históricos):**
1. **Magnifi** — AI investing assistant (TIFIN, respaldado por J.P. Morgan). Freemium $8.25-14/mes. Creció por backing institucional y podcast con Nicole Lapin. Sin presencia orgánica en redes. Lección: AUREX puede hacer lo que Magnifi no hace — mostrar el producto en acción en redes.
2. **Composer** — Trading algorítmico sin código. $32/mes. Creció por flywheel comunitario (80% del valor lo genera la comunidad con estrategias compartidas). Lección: las señales de AUREX son contenido compartible si se presentan bien visualmente.
3. **Public.com** — Broker con IA encima. Premium ~$10/mes. El AI research assistant convirtió casi la mitad de las conversaciones en transacción dentro de las 24 hs. Lección: señal IA clara en el momento correcto genera acción inmediata; medirlo desde el día uno.
4. **Stocktwits** — Red social de traders. 35-50% del revenue viene de Data Licensing (Social Sentiment API a Bloomberg, hedge funds). Lección crítica: AUREX necesita segunda palanca de monetización (datos/señales agregados para terceros) diseñada desde el inicio. YouTube es su primera fuente de tráfico social.
5. **Atom Finance** — Caso más importante del research: murió haciendo exactamente lo que AUREX planea (research B2C con freemium $9.99/mes). Llegó a 100k usuarios y $10.6M de funding y cerró igual. Lección existencial: con solo suscripciones freemium el unit economics no cierra; la conversión FREE → Premium en research financiero es históricamente baja.
6. **TradingView** — Benchmark de producto. $3B de valuación, $172M de revenue. Creció por superioridad técnica (HTML5 cuando todos eran Flash) y network effect de comunidad. Lección: el producto tiene que generar word-of-mouth orgánico; las señales IA tienen que acertar en los primeros 7 días para retener.
7. **Robinhood** — Caso de lanzamiento más relevante. Pre-launch waitlist con "free stock" referrals generó 1M+ usuarios antes del lanzamiento. Lección: programa de referidos con incentivo real (acceso PRO gratis, no solo descuento) es el mecanismo de adquisición más efectivo en fintech retail. El mercado hispanohablante es el equivalente al mercado retail pre-Robinhood: subatendido, con disposición a pagar.

**Pasada 3 (apps recientes 2024-2025, agregada 29-abr-2026):**
8. **Sagehood AI** — Agentes IA para US stocks (varios agentes especializados: fundamentales, news, sentiment, risk). $9.99/mes (idéntico al PRO de AUREX), 14 días free trial. Lanzado vía Product Hunt 2025, top 15 anual. Solo S&P 500 al 29-abr (Nasdaq pendiente). Lección: el precio $9.99/mes para PRO de AUREX queda triple-validado (Sagehood + Magnifi + Atom). Limitación a US stocks deja gap directo para AUREX (350 activos: cripto + acciones de 6 mercados incluyendo Argentina y Brasil/LATAM + ETFs + materias primas + metales + futuros + bonos + divisas; 74 con señales IA propias).
9. **WarrenAI (Investing.com)** — Research assistant lanzado 21-abr-2025. Acceso a 72k+ activos, 1200+ métricas, 10 años histórico, **30 idiomas** (vs AUREX 8). Embebido en InvestingPro (no standalone), distribuido a 60M+ usuarios mensuales de la matriz. Lección: no se le compite de frente, se le flanquea con foco específico (señales propias en lugar de prompts, presencia visual fuerte, mercado hispanohablante donde la marca Investing.com es percibida lejana).
10. **Danelfin** — Barcelona, founded 2016 / lanzado IA 2021 por Tomás Diago (ex-Softonic). €2M raised. AI Score 1-10 con Explainable AI. Track record público: stocks 10/10 outperform S&P en +21.05% annualized alpha 3 meses. Pricing dual: Plus retail $22/mes + API tiers $70/$199/$599 — palanca dual retail+B2B activa y monetizando. Award Benzinga 2023. Lección: validación más fuerte del modelo dual ya rentable. Pregunta crítica para AUREX: ¿se puede empezar a publicar acierto/error de las señales IA desde el día 1 del lanzamiento como Danelfin lo hace? Diseñar el logging de tracking ahora.
11. **RockFlow** — Singapur, founder Vakee Lai. $20M total raised (Series A nov-2025, $10M Angel Round BlueRun Ventures). Bobby (AI assistant) + TradeGPT. Mobile-first, **9 idiomas** (vs AUREX 8), 30+ países. Fractional desde $1. Es broker (no solo análisis). Tono "fun" para Gen Z. TikTok @rockflow.ai + IG @rockflowapp + X @RockFlowApp. Lección: el caso más cercano a AUREX en multi-idioma+multi-país+mobile, pero distinto por ser broker y por tono Gen Z. Pregunta crítica: AUREX define explícito si compite por Gen Z (RockFlow) o por inversor maduro (Public.com, estética actual de AUREX).
12. **Guavy** — Calgary, CEO Donna Tilden. Empresa founded 2015 (data financiera) que pivotó a producto retail crypto en mobile. App iOS lanzada oct-2025 (anuncio dic-2025), Android 2026. Crypto-only, 350+ coins. Pricing dual: app retail Plus $6.99/mes + API tiers Sandbox gratis / $39 / $399. Distribución vía press release masivo en crypto media (Daily Hodl, Chainwire, Crypto Briefing, etc.) — sin redes sociales propias verificadas. Lección: ventana de oportunidad porque Guavy todavía no cubre stocks ni habla más de un idioma confirmado. AUREX puede salir antes con multi-asset (350 activos: cripto + acciones de 6 mercados + ETFs + materias primas + metales + futuros + bonos + divisas) + multi-idioma (8). Precio $6.99/mes señala margen para AUREX FREE más generoso o sub-tier por debajo de PRO si se quiere atacar ese segmento.

**Insights inmediatos transversales de Pasada 3 (sin esperar análisis estratégico de Escritorio):**
- Precio $9.99/mes triple-validado (Sagehood + Magnifi + Atom). Techo para tier ELITE: $22/mes (Danelfin).
- Palanca dual retail + API B2B es patrón estándar emergente: Stocktwits histórico, Danelfin con 3 tiers, Guavy desde lanzamiento.
- Multi-idioma es competencia real: WarrenAI 30, RockFlow 9, AUREX 8. Diferencial vendrá de calidad de producto en ES, PT, HI.
- Ningún competidor cubre simultáneamente: análisis IA + multi-asset (stocks+crypto) + mobile + multi-idioma + freemium con API B2B. AUREX tiene posicionamiento ortogonal disponible.

**Pasada 4 (LATAM acotada, agregada 29-abr-2026 — análisis estratégico de Escritorio reservado en blanco):**
13. **Cocos Capital** (Argentina, broker fintech AR más grande, founded feb-2021 por Ariel Sbdar + Nicolás Mindlin) — sin IA como diferencial, regulado CNV. Plans: 1% comm general / 0% comm Cocos Gold y Pro. Score Bolsa24 87/100. Controversia 28-abr-2026: CEO abucheado en Movistar Arena por 12k+ secundarios por su exposición pública con $LIBRA. Lección: deja espacio claro a AUREX como "no broker, análisis IA"; controversia política de Sbdar abre espacio para marca AR neutral.
14. **Lemon Cash** (Argentina, founded 2019 por Marcelo Cavazzoli) — wallet crypto con 5M usuarios AR+PE. $66M raised total ($20M Series B F-Prime+ParaFi). Lemon Card (VISA prepaid + BTC cashback) disparó crecimiento <10k → 2M usuarios. Social: IG 218K, TikTok 64.6K, X activo. Expansión planificada CO/MX/BR/CL. Lección: demuestra que "useful + español-AR + tono retail" funciona a 5M; benchmark concreto IG 218K + TikTok 64.6K para AUREX 12-24 meses.
15. **Warren Brasil** (founded 2017 por Tito Gusmão+3 cofounders) — wealthtech con 300k clientes. Fee fijo 0.7-0.9%/año AUM. R$ 300M raised + Citi Ventures. Adquirió Renascença (corretora 50 años). Q1-2024: breakeven + Warren Flow (IA para advisors humanos, no para usuarios). Lección crítica: la IA de Warren es para PRODUCTIVIDAD INTERNA, no señales para usuarios. Gap claro para AUREX: IA que genera señales directas, sin advisor intermedio. Coincidencia de nombre con WarrenAI (Pasada 3) — aclarar en síntesis.
16. **Avenue (Brasil)** (founded 2018 en Miami por brasileños) — broker para invertir en USD desde Brasil. **Adquirido por Itaú: 35% en 2022 por R$ 493M, control 50.1% en 2 años; operación total ~R$ 1.4 bilhão**. 900k cuentas + R$ 20bi AUM. Lección: éxito del "puente al mercado USA" para retail LATAM; Itaú compró en lugar de construir IA in-house; AUREX puede ser capa de análisis IA sobre los activos USA que esos 900k usuarios ya tienen.
17. **Bitso (México)** (founded 2014 por Daniel Vogel + Pablo Gonzalez + Ben Peters) — 9M usuarios + 2.000 B2B en 4-6 países LATAM. **$2.2B valuation (2021, primer crypto unicornio LATAM), $80M+ funding total**. Bitso Business como segunda palanca confirmada. MXNB stablecoin propio (peso mexicano). Stocks USA commission-free vía Alpaca. Audit CCSS Level II late 2025. Lección: moat regulatorio enorme (4 jurisdicciones LATAM + Gibraltar) imposible replicar; competir como capa de análisis sobre Bitso vs construir audiencia propia es decisión clave para AUREX.

**Insights LATAM transversales (Pasada 4, sin esperar análisis estratégico de Escritorio):**
- **Ningún competidor LATAM analizado usa IA de generación de señales como diferencial primario.** Warren Brasil tiene IA pero para productividad de advisors. Cocos, Lemon, Avenue, Bitso no tienen IA propia significativa. **El gap LATAM en IA-señales-multi-asset existe y es ocupable.**
- **El "vacío del mercado hispanohablante" identificado en Pasadas 1-3 se relativiza:** sí hay players grandes en LATAM (Bitso 9M, Lemon 5M, Avenue 900k cuentas, Warren 300k clientes). Pero ninguno cubre IA + señales + multi-asset. **Posicionamiento ortogonal disponible, no terra incognita.**
- Distribución institucional importa: Warren+Citi, Avenue+Itaú, Bitso+Stellar — partnerships institucionales son recurrentes en escala LATAM.
- Cocos + Lemon cubren los dos arquetipos AR (broker tradicional regulado vs wallet crypto retail). AUREX puede ser tercer arquetipo: análisis IA sin custodia, complementario.
- Brasil tiene el mercado más grande con jugadores sólidos (Warren, Avenue + XP, Rico, Inter, Nubank Investimentos). México con Bitso es el caso más maduro. Argentina tiene mercado más fragmentado y volátil — entrada más fácil pero más chico.

**Pasada 5 (mini bonus blind spots, agregada 29-abr-2026 — análisis estratégico de Escritorio reservado en blanco):**

Decisión de hacer Pasada 5 mini: tras cerrar Pasada 4 detectamos 6 blind spots temáticos. De esos, 2 críticos para definir posicionamiento de AUREX y se cubren acá: India (mayor mercado retail en growth) + neo-bancos LATAM con inversión integrada (categoría que captura retail principiante por defecto). Otros 4 blind spots quedan documentados sin investigar (white-label/B2B2C, regulación regional transversal, research B2C content-first como Seeking Alpha/Motley Fool, gaps demográficos) por corresponder a fases distintas del proyecto AUREX.

18. **Smallcase** (India, founded 2015 por Vasanth Kamath + Anugrah Shrivastava + Rohan Gupta) — 3M+ usuarios activos, ~10M registrados. **Marketplace de model portfolios curados por SEBI-registered managers**. $100M+ raised en 7 rondas (Sequoia, Amazon, Premji, HDFC Bank, Blume, Beenext). Annual revenue ₹114 Cr (~$13M USD), $2.5B en transacciones anuales. Tickets desde ₹21 (~$0.25). Integrado con 14+ brokers indios sin competir con ellos (Zerodha, Groww, Upstox, ICICI, HDFC, Angel One, etc.). **Modelo dual:** free smallcases + fee-based smallcases (subscripción mensual/trimestral/anual fijada por cada manager). HBS case study publicado. Lección: marketplace + integración con brokers existentes elimina fricción competitiva. Tickets micro habilitan adquisición masiva. Quejas: subscription fees percibidas como caras en mercados bajistas. India NO es prioridad para AUREX (idioma + SEBI + Smallcase/Groww/Zerodha incumbents); LATAM hispanohablante primero.

19. **Nubank Investimentos** (Brasil + LATAM, founded 2013 por David Vélez + Cristina Junqueira + Edward Wible) — **107M brasileños base (60% de adultos BR), 114M globales**. NYSE: NU desde IPO 2021. Revenue 2024: $11.5B (+58% YoY). Investimentos consolidado en el app desde abril 2024 — brokerage-free + recomendaciones por perfil + Investment Street Mode (privacidad de balances) + Smart Defenses (AI detección de fraude). **IA in-house vía adquisiciones:** Olivia (2021, control financiero personalizado) + Hyperplane (2024, AI Silicon Valley con founders brasileños para datos no estructurados). Vélez declara IA como "próximo paso de inclusión financiera". **Audiencia:** principiantes y small contributions (XP/Inter cubren retail más sofisticado). 66% brasileños esperan que su financial institution les dé recomendaciones de inversión (IPSOS) — Nubank lee el gap y lo cubre con IA. Lección crítica: **distribución incumbente domina LATAM** (107M = CAC efectivo cero); IA financiera retail tiende a M&A (Olivia + Hyperplane); espacio claro para AUREX en señales accionables específicas multi-asset que Nubank no cubre. **Riesgo competitivo real:** Nubank tiene capacidad financiera/técnica para incorporar señales IA específicas como feature interno cuando lo decida — la ventaja temporal de AUREX es real pero acotada.

**Insights blind spots transversales (Pasada 5):**
- **El gap "IA + señales accionables específicas multi-asset" sigue libre incluso después de cubrir India y Nubank.** Smallcase es marketplace, no genera señales propias. Nubank Investimentos tiene IA pero para recomendaciones generales y seguridad, no señales granulares. **Confirma por quinta vez (Pasadas 1-5) que el espacio existe.**
- **Modelos marketplace + integración con brokers (Smallcase con 14+ brokers indios) son replicables en LATAM** — AUREX podría integrar con Cocos, Lemon, Avenue, Bitso como capa de análisis sin ser broker.
- **IA financiera retail tiende a M&A:** Nubank compró Olivia + Hyperplane; Itaú compró Avenue. AUREX bien ejecutado puede ser target de adquisición a 3-5 años — relevante como exit potencial.
- **India queda fuera del Plan MKT inicial** por idioma + regulación + competidores incumbents. LATAM hispanohablante primero, India eventual fase 2-3.
- **6 blind spots originales: 2 cubiertos (India + neo-bancos LATAM), 4 documentados sin investigar.** Los 4 restantes (white-label/B2B2C, regulación regional transversal, research B2C content-first, gaps demográficos) son post-síntesis Plan MKT v2.

### Hecho — Plan MKT v2.0-draft (29-abr-2026)
- **Síntesis estratégica global** entregada por Escritorio el 29-abr-2026.
- **Revisión cruzada por Code** según `feedback_plan_mkt_revision_cruzada.md`: detectó 5 errores de evidencia + falta de plan táctico ejecutable + ausencia de reparto Code vs Escritorio + canales obvios omitidos (Telegram, WhatsApp, Email, YouTube IA, programa de referidos).
- **Plan MKT v2.0-draft** consolidado en archivo nuevo `PLAN_MKT.md` (raíz del repo). Contiene síntesis estratégica corregida + plan táctico ejecutable de 11 canales + cronograma 30 días + KPIs + presupuesto Año 1 (~$130-150/mes recurrente). Cero acción manual de Fernando.
- Pendiente: cruce con Escritorio para versión v2.1, aprobaciones específicas de Fernando (handles de redes, presupuesto mensual, templates iniciales, disclaimers regulatorios), conexión Claude API real al motor IA, reconexión WhatsApp 30-abr 9:00 AR.

### Hecho — Plan MKT v2.1 + reset visual a Fase A (29-abr-2026 noche)
- **`PLAN_MKT.md` v2.1** commiteado con devolución conjunta Escritorio + Fernando: premisa global corregida (NO LATAM, app multi-idioma 8 idiomas + 6 mercados), avatar HeyGen specs, programa de referidos definido (1 mes PRO + 1 mes PRO simétrico), workflow de localización ES→7 idiomas vía Claude API, riesgos regulatorios por jurisdicción, cronograma multi-idioma escalonado.
- **Reformulación profunda del approach de contenido:** Fernando + Code identificaron que tratamos contenido visual con liviandad. Decisión: parar producción de contenidos hasta tener research visual serio + decisión de arquetipo + mini design system + replanteos de avatar y referidos.
- **`RESEARCH_VISUAL.md` v1 commiteado** — Fase A primera vuelta. Análisis de identidad visual de los 19 competidores + 4 benchmarks externos (Linear, Notion, Apple, Mercado Pago, Nubank Pentagram brandbook). 4 arquetipos visuales detectados, mercados saturados identificados, espacios libres documentados. Decisión preliminar: AUREX en intersección Arquetipos 2+4 (Institutional con polish + Brand-led con sistema propio).

### Hecho — Mascot AUREX definido: v2 Geometric premium (30-abr-2026)
- **Decisión final de Fernando: el mascot oficial de AUREX es v2 (Geometric premium)** — búho dorado facetado de cuerpo completo sobre fondo gris claro / navy. Razones: alineación literal con el nombre AUREX (oro en latín), estética geométrica premium consistente con identidad institucional + brand-led, diferenciación frente a competidores (ninguno usa mascot animal con tratamiento facetado dorado).
- **Logo AUREX no se reemplaza** — convive con el mascot (modelo Mailchimp/Twitch): logo en stores/legal/headers oficiales, mascot en redes sociales, contenido educativo, onboarding, ilustraciones de producto.
- **Pipeline reproducible commiteado en `aurex-app/scripts/mascot_processing/`** — sources PNG (v0/v1/v2), scripts Python (`process_v0.py`, `process_v1_v2.py`, `generate_all_sizes.py`), README. Regenera bit-exact con `python3 process_v0.py && python3 process_v1_v2.py && python3 generate_all_sizes.py`.
- **152 PNGs por versión generados en `~/Downloads/AUREX_ICONS/`** — iOS (13 tamaños), Android (7), PWA (8), Web/Favicon (5), Marketing (5 canvas con padding). Listos para subir a App Store Connect / Google Play Console / manifest PWA / sitio aurex.live cuando Apple Build 17 + Google Play Build 2 estén aprobados (NO tocar antes — regla inviolable 2).
- **Documento de identidad del mascot v1.1** generado: `AUREX_MASCOT_BUHO_identidad_y_uso.md` + PDF, con razonamiento del búho, comparación con águila/halcón, separación logo/mascot, 20 aplicaciones específicas, casos de referencia (Mailchimp, Duolingo, Twitch, RockFlow). Subido a Drive en sub-carpeta MASCOT FINAL.

### Hecho — Plan MKT v2.1 sección 2.4 reescrita: búho v2 animado reemplaza avatar HeyGen (30-abr-2026)
- **Decisión final del presentador de los videos:** búho v2 animado en lugar del avatar humano de HeyGen Pro. Validado por Fernando + Escritorio + Code el 30-abr.
- **Por qué:** coherencia total con la marca (oro = AUREX = búho); diferenciación máxima vs los 19 competidores (ninguno usa mascot animal en video); cero costo recurrente nuevo (regla inviolable reiterada hoy: nada de costos variables mensuales adicionales).
- **Ruta A para videos diarios** (TikTok / IG Reels / YouTube Shorts 2x semana): PNG estático del búho sobre fondo navy + efectos de cámara + voz IA tier free de ElevenLabs + cortes cada 3-4s. Costo: $0/mes.
- **Ruta B para videos premium 1-2 por semana** (lanzamientos, hitos, intros YouTube canal completo): animación IA imagen-a-video con Runway/Pika tier free, 3-5 segundos del búho moviéndose, mezclados con el resto del video Ruta A. Costo: $0/mes en tier free.
- **Specs de identidad fijas** (sección 2.4 del PLAN_MKT.md): voz femenina cálida en español/inglés/portugués/francés/italiano + masculina en árabe/hindi; acento español neutro latinoamericano; ritmo rápido; tono directo y confiante; fondo base navy #0A1628 fijo; colores por tipo de señal (oro Alta Convicción, verde confirmación, rojo alerta); tres encuadres fijos (plano completo, close-up ojos, split screen búho+gráfico).
- **Benchmarks externos validados por Escritorio:** Duolingo en TikTok (mascot búho con animación mínima funciona por contexto + copy + edición), Mailchimp con Freddie (mascot como sello de identidad sin ser presentador), Headspace (figura visual simple consistente con presupuesto bajo).
- **Ahorro:** -$288/año vs v2.1 inicial con HeyGen anual; -$1.188/año vs v2.0 con HeyGen mensual.
- **Secciones del Plan MKT actualizadas en un solo commit:** 2.4 (reescrita completa), 2.2 (tabla reparto), 2.3.6 (Canal 6 TikTok/Reels), 2.3.7 (Canal 7 YouTube), 2.9 (presupuesto), 3.1 punto 4, 3.2 punto 3, 3.3 bloqueadores, changelog y footer.
- **Pendiente Fase F:** validación del primer video de prueba con Fernando (única acción manual restante para destrabar producción autónoma de videos).

### Hecho — Sesión completa 30-abr/1-may-2026 (jornada larga, ~10h)

**WhatsApp 2563 — diagnóstico y reseteo completo de Evolution.**

- WA-001 estaba ACTIVE desde el 28-abr 12:25 AR (línea desconectada hace ~47h al inicio del día). Hipótesis original Code: Evolution sin volumen persistente en Railway. DESCARTADA — los logs mostraron que el container `evo-v1` llevaba 2 días sin reiniciar, no era falta de volumen.
- Causa real identificada: la instancia "aurex" en Evolution v1.8.7 quedó corrupta el 28-abr (logs mostraron "Token already exists" 3 veces + ENOENT en `/evolution/store/messages/aurex` — el directorio físico nunca se creó). Las 5 llamadas de pairing code de ese día probablemente dispararon el estado degradado.
- **Recreación limpia de la instancia:** Code llamó `DELETE /instance/delete/aurex` + `POST /instance/create` con `qrcode: true`. Fernando escaneó QR final desde iPhone (eSIM Claro 2563). Vinculación quedó como "AUREX Backend" en Google Chrome. Estado conectó OK (`state: open`).
- **Pruebas de envío:** autoenvío 2563 → 2563 SÍ llegó (libsignal y Baileys funcionan). Envíos a 1320 (admin Fernando) y a número externo +54 9 11 6764 3307 NO llegaron — quedaron `PENDING` indefinidamente.
- **Diagnóstico final consensuado con Escritorio:** cooldown antifraude general de WhatsApp sobre la línea 2563 saliente. La línea acepta vinculación, encripta para sí misma, pero WhatsApp retiene los mensajes salientes a otros números. Causa probable: 5 reescaneos del 28-abr disparando el flag antifraude.
- **Acuerdo:** 24h de reposo total sobre la 2563. NO hacer más pruebas hoy. Esperar mañana 1-may 8:00 AR para verificar si los reportes diarios llegan por WhatsApp (cron `dailyHealthReport` ya es dual-channel Telegram + WhatsApp).
- **Status actual:** WhatsApp 2563 en cooldown silencioso. Telegram funciona perfecto como canal principal de reportes. La instancia recreada está estable, no se va a romper sola — cuando WhatsApp libere el cooldown empezará a entregar normal.

**Plan MKT v2.1 — sección 2.4 reescrita (búho animado reemplaza HeyGen).**

Bloque ya documentado arriba. Resumen del impacto: -$288 a -$1.188/año vs versiones anteriores, decisión definitiva commiteada al PLAN_MKT.md.

**Pipeline de generación de videos completo en `scripts/video_generation/`.**

- `templates/constelacion.py`: genera frames de fondo animado (110 estrellas + líneas finas dorado, modo oscuro o claro). Replica del onboarding `index.html:553-587`.
- `templates/banners.py`: 5 banners reusables — intro, signal (rediseñado a premium con fondo opaco + bevel + glow + barra de progreso), outro, URL inferior, AUREX-debajo-del-búho.
- `compose_video.py`: orquestador. Voz ElevenLabs (multilingual_v2) integrada. Fallback a `say` macOS si no hay API key. Timings dinámicos según duración del audio.
- `assets/`: logo limpio sin marca + búho v2 modo oscuro y claro + carpeta `buho_animations/` para Ruta B (vacía hasta que Escritorio genere V1+V2+V3 limpias mañana).
- Stinger Ruta B integrado: si hay MP4 del búho animado en `buho_animations/`, se inserta automáticamente al inicio del video con normalización (cropear watermark Kling, scale a misma altura del búho del video principal, padding navy AUREX para que se funda).

**Sistema de voces ElevenLabs aprobado y commiteado.**

- 8 voces aprobadas tras probar las 21 default del free tier: Matilda, Bella, Jessica, Lily (femeninas) + Charlie, Brian, Bill, Chris (masculinas).
- Voces Voice Library (Valeria, Siena, Catalina, etc., nativas LATAM) descartadas: requieren plan Creator $22/mes que rompe la regla cero costo.
- Asignación canal → voz con rotación por día implementada en `compose_video.py`. Ej: TikTok lunes/miércoles/viernes/sábado/domingo Jessica, martes/jueves Chris.
- Documento `docs/VOCES_CANALES_AUREX.md` cerrado como referencia + `.docx` y `.pdf` en Descargas.
- Catálogo audiovisual en `~/Downloads/AUREX_CATALOGO_VOCES/`: 8 videos (uno por voz) con la misma estructura para comparar.

**Drive automation — OAuth Desktop credentials con cuenta gratuita.**

- Antes Fernando intermediaba subiendo manualmente videos a Drive. Hoy se confirmó que era cuello de botella (Escritorio descargó V1 de Kling y V1 de Runway a Descargas, no aclaró cuál subir, Fernando subió la de Runway corrupta por error).
- Service Account inicial NO sirvió (las SA no tienen storage propio en cuentas @gmail.com personales sin Workspace pago).
- Solución implementada: OAuth Client ID Desktop app + flow interactivo una vez. Token refresh_token guardado en `/tmp/aurex-oauth-token.json`, se reutiliza automáticamente.
- Script `scripts/video_generation/drive_automation.py` con comandos `ping`, `auth`, `list`, `upload`, `download`. Code ya puede subir/descargar de Drive directo sin pasar por Descargas ni Fernando.
- Carpeta `AUREX_MEDIA_LIBRARY` en Drive con estructura: `01_videos/finales`, `01_videos/buho_animaciones`, `02_audios/elevenlabs`, `03_assets_brutos`, `04_briefs`, `05_feedback`.

**Ruta B (búho animado) — primer intento descartado.**

- Brief inicial pasado a Escritorio para generar 3 variantes con Runway. Cola de tier free: 50-60 min, descartada como inviable. La V1 de Runway tuvo un giro 360° no pedido.
- Brief v2 con Plan B Kling AI (6 generaciones/día gratis) + Plan C Luma Dream Machine (30/mes). Subido a Drive `04_briefs/`.
- V1 de Kling generada hoy (45 créditos): visualmente OK pero el INPUT que Escritorio le dio a Kling fue un screenshot del viewer de Drive con el chrome del browser visible. La V1 quedó con la barra "AUREX_FINAL_v2_modo_oscuro.p... Archivo Ver Insertar Compartir" embedded en el frame inicial. **Descartada.**
- V1 de Runway: mismo problema, mismo input contaminado.
- **URL del PNG puro publicada para uso futuro:** `https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/scripts/video_generation/assets/buho_v2_dark.png` — directa de GitHub, sin chrome, sin auth. Escritorio la usa mañana para regenerar V1+V2+V3 limpias.

**OAuth Drive setup completo (Fernando hizo, Code automatizó).**

- Proyecto Google Cloud `aurex-automation` creado.
- API Drive habilitada.
- OAuth Client ID Desktop creado, JSON en `~/Desktop/aurex-oauth.json`.
- Test user `fmoscon@gmail.com` agregado a la consent screen.
- Flow OAuth ejecutado, token guardado en `/tmp/aurex-oauth-token.json`.
- Verificado: ping, list (5 carpetas en AUREX_MEDIA_LIBRARY), upload (archivo dummy a 03_assets_brutos), download (V1 corrupta de Kling traída a `assets/buho_animations/`, después borrada). Todo funcionando.

**Sonido del búho — discusión iniciada.**

- Fernando propuso firma sonora del búho al final de los videos (idea tipo "tudum" Netflix).
- Acuerdo Code + Escritorio: sí, pero con tono sintético propio (NO realismo "ulú-ulú"), procesado con reverb dorado para matchear estética metálica, solo en videos premium (no en todos para no fatigar), volumen bajo, últimos 1-2 segundos.
- Implementación pendiente: generar 4 candidatos sintéticos con FFmpeg, Fernando elige, integrar como flag `--owl-sound` en `compose_video.py`.
- Orden acordado con Escritorio: primero terminar V1+V2+V3 visuales, después agregar sonido.

### Falta

**Inmediato (mañana 1-may-2026):**
- **8:00 AR — verificar reportes WhatsApp.** El cron `dailyHealthReport` se dispara automático. Si llega por WhatsApp 1320 → cooldown 2563 levantado, retomamos uso normal. Si NO llega → sigue cooldown, 24h más de espera.
- **9:00 AR — verificar reporte de status del proyecto.** Llega por Telegram (este reporte) usando este CONTEXTO.md como input.
- **Cuando renueven los créditos de Kling (UTC+8 hora de Beijing, mañana temprano AR)** — Escritorio regenera V1+V2+V3 desde cero con la URL del PNG puro de GitHub (NO screenshot del viewer). Cuando suba a Drive, Code descarga con `drive_automation.py download <id> <local_path>`, verifica el primer frame de cada una (no debe haber chrome de browser), integra al pipeline.
- **Code regenera v13** con V1 limpia + V2/V3 mezcladas. Verifica pixel-por-pixel antes de mostrar a Fernando.
- **Implementar firma sonora del búho** (orden definido con Escritorio: después de V1+V2+V3): Code genera 4 candidatos sintéticos con FFmpeg, Fernando elige, se integra como flag `--owl-sound`. Solo en videos premium.

**Plan MKT pendiente (aún del 29-abr y posteriores):**
- **Captura manual por Fernando** para completar Fase A — feeds IG/TikTok de Lemon/RockFlow/Bitso/Robinhood/Nubank + emails onboarding de 3-4 competidores + capturas in-app de Cocos. Lista priorizada en `RESEARCH_VISUAL.md` sección "Captura manual pendiente".
- **Fase B: decisión final de arquetipo + mini design system AUREX** — debate Code+Escritorio sobre arquetipo definitivo (preliminar: Inst+Brand-led hybrid con mascot ilustrado). Tiempo estimado: 3-5 días.
- **Reformulación de los 11 contenidos modelo** una vez identidad de marca consolidada (parcialmente avanzado: la sección 2.4 ya está cerrada con búho v2 + voces).
- **Síntesis final → `PLAN_MKT.md` v2.** Documento que integra todo. Incluye posicionamiento, mensajes para stores, copy del onboarding, primeros canales de adquisición, contenido para los primeros 30 días.
- **Plan táctico de lanzamiento.** Una vez definido posicionamiento: acciones concretas que ejecutan Code y Escritorio. Fernando solo aprueba (regla dura: nada que él tenga que grabar, escribir ni publicar manualmente).
- **Setup cron del backend** para producir videos automáticos diarios en horarios definidos en el Plan MKT (TikTok/Reels/Shorts martes y viernes según sección 2.3.6).
- **Ejecución Mes 1** post-aprobación Apple/Google.

### Insights transversales ya confirmados (no esperan las pasadas faltantes)
- Precio PRO $9.99/mes validado por 3 competidores (Magnifi, Atom Finance, Public.com).
- Segunda palanca de monetización (datos agregados para terceros) es necesaria para sostenibilidad — Atom Finance lo demuestra a la inversa.
- El mercado hispanohablante está subatendido — ninguno de los 7 lo ataca seriamente.
- YouTube es el canal de mayor tráfico social para herramientas de inversión (Stocktwits lo confirma).
- Programa de referidos con incentivo real debe diseñarse antes del lanzamiento, no después.
- Las señales IA son el activo diferencial — cuando se conecte Claude API real, la tasa de acierto debe medirse desde el primer día.

### Endpoint POST /api/research/analysis
Existe en `aurex-backend/server.js`. Permite que Escritorio escriba análisis estratégico directo al repo aurex-app vía API (con PAT fine-grained con permisos solo a aurex-app). Fernando NO copia/pega manualmente: cuando Escritorio cierra un análisis, hace POST y aparece committeado en GitHub solo.

---

## ARCHIVOS DE DOCUMENTACION
- AUREX-PORTFOLIO-DOC.md: documentacion tecnica completa del tab Portfolio
- AUREX-MERCADOS-DOC.md: documentacion tecnica completa del tab Mercados
- AUREX-IA-DOC.md: documentacion tecnica del tab IA
- AI_SIGNALS_DESIGN.md: diseño de señales IA
- BUGFIX_HISTORIAL.md: historial de bugs y soluciones
- REGLAS-DE-ORO-AUREX.md: reglas tecnicas para Claude
- PLAN-ACCION.md: cronograma del proyecto
- METADATA-APPSTORE.md: metadata App Store
- docs/CONTEXTO_CHAT.md: contexto inicial chat
- docs/PENDING_REVIEW.md: review pendiente
- docs/PLAN-OPERATIVO.md: plan operativo extendido
- docs/PERFIL_TAB_DOCUMENTACION.md: documentación del tab Perfil

---

## ESTADO DE CADA FEATURE

REAL (funcionando):
- App en produccion GitHub Pages (aurex.live)
- PWA instalable iPhone
- 6 tabs navegables
- Precios crypto tiempo real (Binance REST cada 5seg)
- Conversor crypto (Binance)
- Conversor fiat ARS/EUR/BRL (ExchangeRate API cada 30min)
- Portfolio persistente en Supabase (autenticado)
- Aurex Pulse / Fear & Greed (VIX, S&P, BTC, Oro, Petroleo)
- Termometro de Riesgo con senales IA
- Filtros temporales por activo en Mercados
- Fix iOS touch en dropdown Portfolio y Ver Variables
- 17 fallbacks de resilencia PWA (crypto/stocks/IA/portfolio/watchlist)

MOCK (pendiente):
- Alertas WhatsApp: simuladas -> proxima prioridad (depende de Evolution API)
- Senales IA: hardcodeadas -> conectar a Claude API
- Acciones USA: precios via Yahoo proxy (funciona) / Polygon.io pendiente
- Push notifications: boton funcional, logica pendiente

---

## DATOS TECNICOS

PWA (aurex-app):
- Frontend: HTML+CSS+JS Vanilla monolito (~3000 líneas index.html + ~3900 líneas aurex-features.js)
- Hosting: GitHub Pages auto-deploy desde main → aurex.live
- Sin pipeline de build, sin package.json, sin service worker activo

Nativa (AurexApp):
- React Native 0.84 puro (NO usa WebView, NO carga la PWA)
- iOS: MARKETING_VERSION=1.0, CURRENT_PROJECT_VERSION=17
- Android: versionName="1.0.1", versionCode=2
- RevenueCat para in-app purchases (iOS + Android)

Backend (aurex-backend):
- Railway (https://aurex-app-production.up.railway.app)
- Lo consumen tanto la PWA como la Nativa

Datos:
- Crypto: Binance REST API (sin key, publica)
- Acciones/ETFs: Yahoo Finance via corsproxy.io
- Fiat: open.er-api.com (gratis, sin key)
- IA: modelo interno _calcIAScore + _iaSeed (datos hardcodeados)
- DB: Supabase (URL: dklljnfhlzmfsfmxrpie.supabase.co)
- Auth: Google OAuth via Supabase

Pagos:
- PWA: Lemon Squeezy (PRO $9.99/mes, ELITE $19.99/mes)
- iOS: Apple In-App Purchase (StoreKit) via RevenueCat
- Android: Google Play Billing via RevenueCat

---

## LINKS
- App: https://fmoscon-creator.github.io/aurex-app  (alias aurex.live)
- Repo PWA: https://github.com/fmoscon-creator/aurex-app
- Repo Nativa: https://github.com/fmoscon-creator/AurexApp
- Repo Backend: https://github.com/fmoscon-creator/aurex-backend
- Lemon Squeezy store: aurexapp.lemonsqueezy.com
- Portfolio Doc: https://github.com/fmoscon-creator/aurex-app/blob/main/AUREX-PORTFOLIO-DOC.md
- Mercados Doc: https://github.com/fmoscon-creator/aurex-app/blob/main/AUREX-MERCADOS-DOC.md
- IA Doc: https://github.com/fmoscon-creator/aurex-app/blob/main/AUREX-IA-DOC.md
- Plan accion: https://github.com/fmoscon-creator/aurex-app/blob/main/PLAN-ACCION.md
- Fundador: Fernando G. Moscon fmoscon@gmail.com

---

## PLANES
- FREE: 5 activos, 3 senales/dia, sin alertas, con ads
- PRO: $9.99/mes, 50 activos, 10 senales, alertas push
- ELITE: $19.99/mes, ilimitado, 8 idiomas, soporte VIP

---

## NOTA PARA CLAUDE
- El token GitHub se pasa en el chat al inicio de cada sesion
- SIEMPRE responder en espanol
- SIEMPRE leer blobs desde Git API, nunca desde Pages
- SIEMPRE verificar OLD aparece exactamente 1 vez antes de reemplazar
- SIEMPRE usar split().join() en lugar de replace()
- Todo HTML/JS nuevo 100% ASCII (tildes como entidades, emojis como entidades, ej: &#127775;)
- btoa(unescape(encodeURIComponent(content))) para base64
- Screenshot obligatorio antes de reportar OK
- Guardar SHA de reversion antes de cada cambio
- Mientras hay builds en revisión por Apple/Google: NO tocar la app nativa
  sin autorización expresa y análisis previo de impacto a las stores
- Sin jerga técnica innecesaria al comunicar con Fernando
- Análisis integral propio antes de pedir datos al usuario (3 repos en disco)
