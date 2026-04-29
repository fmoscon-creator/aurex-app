# CLAUDE.md — AUREX

> Este archivo se carga automáticamente al abrir cualquier chat de Claude Code en este repo.
> Es el "manifest" del proyecto. **Antes de hacer NADA, leer las secciones de abajo en orden.**
> Para Escritorio (Claude Desktop): subir este archivo + los manuales al Project de Claude.ai como contexto.

---

## 0. PRIMERA INSTRUCCIÓN AL ABRIR EL CHAT

Antes de responder cualquier pregunta del usuario, hacer esto:

1. Leer este archivo completo.
2. Leer `DAILY_STATUS.md` (autogenerado por cron del backend — contiene fecha actual, días transcurridos esperando Apple/Google, últimos SHA de los 3 repos, incidentes activos). Si NO existe todavía, calcular esos datos a mano con `git log -1` y `date`.
3. Leer `CONTEXTO.md` (estado vivo del proyecto).
4. Si la pregunta del usuario toca un sistema documentado (alertas WhatsApp, infraestructura, deploys, base de datos), leer el manual correspondiente (ver Sección 5) ANTES de proponer arquitectura.
5. Responder siempre en español, sin jerga técnica innecesaria.
6. NO tocar código sin autorización expresa.

---

## 0.A. ARRANQUE DE CODE Y MEMORIA PERSISTENTE

> Esta sección describe **cómo abrir Code (la CLI) y dónde vive la memoria persistente** que se carga al inicio de cada sesión. Es procedimiento operativo del usuario, no del asistente.

### Cómo arrancar Code

Siempre desde la home del usuario:

```bash
cd ~ && claude
```

NUNCA arrancar Code parado dentro de `Desktop/aurex-app`, `AurexApp`, `Desktop/aurex-backend` ni ninguna otra carpeta de proyecto. La memoria persistente está asociada al directorio desde el que se lanza Code, así que arrancar desde otro lugar deja la sesión sin contexto previo.

### Dónde vive la memoria persistente

Carpeta: `~/.claude/projects/-Users-fernandomoscon/memory/`

Contiene 7 archivos (al 28-abr-2026):

1. `MEMORY.md` — índice (apunta a los otros 6 con una línea de resumen cada uno).
2. `roles_code_escritorio.md` — diferencias entre Code (terminal) y Escritorio (Claude Desktop), cómo rotular textos cruzados.
3. `feedback_comunicacion.md` — 5 reglas de tono y trabajo (sin jerga técnica, análisis propio antes de preguntar, no tocar sin autorización con builds en revisión, opiniones cruzadas con Escritorio, nunca proponer parar la sesión).
4. `feedback_fernando_no_ejecuta.md` — Fernando solo aprueba; todo el contenido lo generan Code y Escritorio con IA + automatización.
5. `feedback_leer_manuales.md` — leer los manuales de `docs/` antes de proponer infraestructura; verificar antes de afirmar cualquier hecho técnico.
6. `feedback_servicios_terceros.md` — 4 preguntas obligatorias antes de tocar servicios con autenticación revocable (Evolution API, Apple, Google, RevenueCat, Twilio, Lemon Squeezy, Supabase service_role); nunca aceptar tokens GitHub PAT por chat.
7. `project_operativo.md` — datos operativos no sensibles (TZ AR, números WhatsApp, Telegram, identificadores Apple, webhook RevenueCat, paths de los 3 repos, crons, endpoints de testeo).

Code carga el `MEMORY.md` (índice) automáticamente al inicio de cada sesión y resuelve los archivos hermanos cuando los necesita. No hace falta pegar nada manualmente.

### Backup

Backup espejo de los 7 archivos en: `~/Desktop/aurex-memory-backup/`

Si la carpeta de memoria activa se pierde (reinstalación de Code, cambio de Mac, error de filesystem), restaurar con:

```bash
cp ~/Desktop/aurex-memory-backup/*.md ~/.claude/projects/-Users-fernandomoscon/memory/
```

---

## 1. IDENTIDAD DEL PROYECTO

| Dato | Valor |
|---|---|
| Producto | AUREX — plataforma de inversión con IA. **350 activos en Mercados** (cripto + stablecoins + acciones de 6 mercados con Argentina, Brasil/LATAM, USA, Europa, Japón, China + ETFs + materias primas + metales + futuros + bonos + divisas). **74 con señales IA propias** del motor AUREX IA. |
| Founder | Fernando G. Moscon (fmoscon@gmail.com) |
| Idioma de trabajo | Español (Argentina) — siempre responder en español |
| Zona horaria operativa | Argentina (UTC-3). Horas mencionadas sin TZ son AR. |
| Web pública | https://aurex.live (alias de https://fmoscon-creator.github.io/aurex-app) |
| Planes | FREE / PRO ($9.99/mes) / ELITE ($19.99/mes) |
| Pagos PWA | Lemon Squeezy |
| Pagos iOS | Apple In-App Purchase via RevenueCat |
| Pagos Android | Google Play Billing via RevenueCat |

---

## 2. STATUS ACTUAL EN STORES (último update manual: 28-abr-2026)

> Para fechas/días transcurridos en tiempo real, ver `DAILY_STATUS.md` (autogenerado).

### APPLE — Build 17

| Campo | Valor |
|---|---|
| Nombre publicado en App Store | **AUREX AI** (no "AUREX" — estaba ocupado, "AUREX AI" cumple Guideline 2.3.7) |
| Estado | Pendiente de revisión |
| Build | 17 (Marketing Version 1.0, CURRENT_PROJECT_VERSION 17) |
| Submit | 24-abr-2026, 5:24 AM AR |
| ID envío | e0e7fb35-11a4-4c1d-854c-60a80c4799e6 |
| Apple Account | fmoscon@gmail.com |
| Team ID | TX7C2F79U9 |
| Apple App ID (interno ASC) | 6761672161 |
| Bundle ID | com.fernandomoscon.aurex |
| Contacto en ASC | +54 11 6789-1320 / fmoscon@gmail.com |
| Idioma principal listing | Inglés (EE.UU.) |
| Subtítulo | "Real-time market data tracker" (intencional: alinea con Utilidades, sin lenguaje financiero) |
| Categoría primaria | Utilidades (cambiada desde Finanzas tras rechazos previos) |
| Categoría secundaria | Productividad |
| Idiomas localización (8) | EN, ES, FR, IT, HI, AR, PT, ZH |
| Metadata | Segura, sin lenguaje financiero |
| Disclaimers | Corregidos en código de Build 17 |
| Provisioning | `~/Downloads/AUREX_App_Store_Distribution.mobileprovision` (5-abr) |
| Builds TestFlight legacy | 9, 10, 11, 12, 13 (Build 9 retirado por el desarrollador) |
| Webhook ASC → RevenueCat (server-to-server notifications, V2) | `https://api.revenuecat.com/v1/incoming-webhooks/apple-server-to-server-notification/WICtYZubpcHyBpPfLnZMoagjatQAyjPD` (idéntico para producción y sandbox — práctica oficial RevenueCat) |
| Bajo el ícono en iPhone (CFBundleDisplayName) | "AUREX" (no "AUREX AI") — diferencia legítima permitida por Apple |

### GOOGLE PLAY — Build 2

| Campo | Valor |
|---|---|
| Nombre publicado en Play Store | **AUREX** |
| Estado | Prueba cerrada activa |
| Build | 2 (versionName "1.0.1", versionCode 2) |
| Categoría | Herramientas (cambiada desde Finanzas) |
| Bundle | com.aurexapp |
| Prueba cerrada | 14 días requeridos, 12+ testers activos |
| Link prueba | https://play.google.com/apps/testing/com.aurexapp |

---

## 3. LOS TRES REPOS

| Repo | Path local | Branch operativo | Deploy |
|---|---|---|---|
| **aurex-app** (PWA) | `/Users/fernandomoscon/Desktop/aurex-app` | `main` | GitHub Pages → aurex.live |
| **AurexApp** (Nativa) | `/Users/fernandomoscon/AurexApp` | `dev` (NO tocar `main` hasta aprobación Apple) | Xcode → App Store + Android Studio → Play Store |
| **aurex-backend** | `/Users/fernandomoscon/Desktop/aurex-backend` | `main` | Push a main → Railway auto-deploy |

GitHub: todos los repos bajo `github.com/fmoscon-creator/`

---

## 4. ACCESOS (REFERENCIAS — las claves NUNCA en este archivo)

> Regla de seguridad: NUNCA escribir tokens, service keys ni passwords en archivos del repo. Solo punteros a dónde están.

| Servicio | Cómo acceder |
|---|---|
| GitHub PAT | Buscar en gestor de passwords personal (1Password / Bitwarden / Notas seguras) |
| Supabase URL pública | `https://dklljnfhlzmfsfmxrpie.supabase.co` |
| Supabase anon key | Hardcodeada en `aurex-app/index.html` y `AurexApp/src/lib/supabase.js` (es pública por diseño) |
| Supabase service key | Variable de Railway `SUPABASE_SERVICE_KEY` (bypasa RLS — NO commitear) |
| Railway dashboard | https://railway.app — login con cuenta de Fernando |
| Backend Railway URL | https://aurex-app-production.up.railway.app |
| Evolution API URL | https://evo-v1-production.up.railway.app |
| App Store Connect | https://appstoreconnect.apple.com (login: fmoscon@gmail.com) |
| Google Play Console | https://play.google.com/console (login: fmoscon@gmail.com) |
| RevenueCat dashboard | https://app.revenuecat.com |
| Lemon Squeezy store | https://aurexapp.lemonsqueezy.com |

### Variables de entorno en Railway (16 de usuario, lista completa en MANUAL_ESTRUCTURAL.md sección 4)

`SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `EVOLUTION_API_URL`, `EVOLUTION_API_KEY`, `EVOLUTION_INSTANCE`, `ADMIN_WHATSAPP`, `ANTHROPIC_API_KEY`, `ALPHA_VANTAGE_KEY`, `TELEGRAM_BOT_TOKEN`, `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_WHATSAPP_FROM`, `LEMONSQUEEZY_WEBHOOK_SECRET`, `FRONTEND_URL`, `PORT`, `NIXPACKS_NO_CACHE`.

### WhatsApp

- Línea emisora AUREX: +54 9 11 3360 2563 (eSIM Claro, iPhone Fernando, conectada vía Evolution API)
- Línea admin Fernando: +54 9 11 6789 1320 (su WhatsApp personal — `ADMIN_WHATSAPP=5491167891320`)
- Sistema: Evolution API v1.8.7 self-hosted en Railway (servicio `evo-v1`), instancia `aurex`

---

## 5. MANUALES — ORDEN DE LECTURA OBLIGATORIO

Antes de proponer arquitectura, alertas, monitoreo, deploys o tocar infra, leer en este orden:

| # | Archivo | Cuándo leerlo |
|---|---|---|
| 1 | `CONTEXTO.md` | Siempre. Estado vivo del proyecto. |
| 2 | `DAILY_STATUS.md` | Siempre (cuando exista). Fechas reales + SHAs frescos. |
| 3 | `docs/MANUAL_ESTRUCTURAL.md` | Para temas de repos, infra Railway, Supabase, deploys, endpoints. |
| 4 | `docs/MANUAL_ALERTAS_WHATSAPP.md` | Para temas de alertas, reportes diarios/mensuales, healthCheck. |
| 5 | `/Users/fernandomoscon/Desktop/aurex-backend/docs/MANUAL-CONEXIONES.md` | Para cadena de fallback de APIs (Binance, CryptoCompare, Kraken, CoinGecko, Yahoo). |
| 6 | `/Users/fernandomoscon/Desktop/aurex-backend/docs/MONITORING.md` | Para temas de monitoreo, IDs de alertas (BN-, CC-, WA-, etc.), umbrales CryptoCompare. |
| 7 | `REGLAS-DE-ORO-AUREX.md` | Reglas técnicas inviolables. |
| 8 | `docs/CONTEXTO_CHAT.md` | Reglas de flujo por commit, IDs DOM críticos. |

---

## 6. REGLAS INVIOLABLES

### Mientras hay builds en revisión por Apple o Google:
1. NO tocar el código nativo (`AurexApp`) sin autorización expresa y análisis previo de impacto.
2. NO tocar metadata en App Store Connect ni Google Play Console (puede mover el build a "Metadata Rejected" y mandarlo al final de la cola).
3. La PWA (`aurex-app`) y el backend (`aurex-backend`) son INDEPENDIENTES de las apps nativas — modificarlos NO afecta la revisión de Apple ni de Google.

### Infraestructura Railway:
4. NUNCA usar `railway up` (sube archivos sin Nixpacks → rompe build). SIEMPRE push a GitHub main.
5. NUNCA eliminar `nixpacks.toml` (Railway vuelve a usar Caddy en vez de Node).
6. Verificar STATUS: SUCCESS con `railway deployment list --json` después de cada push.

### Código:
7. HTML 100% ASCII — emojis y tildes como entidades HTML numéricas (`&#127775;` = ⭐, `&#225;` = á). iOS Safari es estricto.
8. Verificar que el string OLD a reemplazar aparece **exactamente 1 vez** en el archivo antes de tocar.
9. Usar `split().join()` en vez de `replace()` con strings literales.
10. Screenshot o verificación visual antes de reportar OK.
11. Informar SHA completo de cada commit.

### Seguridad:
12. NUNCA escribir tokens, service keys ni passwords en archivos del repo (público o privado).
13. Para proyectos en revisión: pedir autorización por escrito antes de cambios visibles para reviewers.

### Comunicación con Fernando:
14. Siempre español, sin jerga técnica innecesaria.
15. Análisis integral propio ANTES de pedir datos al user — los 3 repos están en disco, leerlos.
16. Antes de proponer un sistema X, hacer grep de los manuales — puede ya existir.
17. Un tema a la vez. No pasar 5 pedidos en paralelo.

---

## 7. PENDIENTES (vivos al 28-abr-2026)

> Lista corta acá. Detalle completo en `CONTEXTO.md`.

### Inmediatos:
1. Esperar respuesta Apple Build 17 (submit 24-abr).
2. Esperar Google Play Build 2 — completar 14 días de prueba cerrada con testers.
3. Onboarding: corregir faltas de ortografía detectadas en emulador.
4. Fix `Platform.OS` para 2 líneas v1.0.0 hardcodeadas en `AurexApp/src/screens/PerfilScreen.js` (L789 y L851) — solo cuando Apple/Google aprueben.

### Pedidos a Escritorio (revisión externa):
5. Verificar webhook RevenueCat en dashboard (sección Webhooks → log de eventos en vivo).

### Estructurales (post-aprobación Apple):
6. Railway + Binance bloqueado — CRÍTICO. BN-002 ACTIVE desde 18-abr, MITIGATED via CryptoCompare. Evaluar región Railway / hosting alternativo / proxy.
7. WhatsApp Alertas — verificar Evolution + env vars.
8. Evolution API — verificar hosting actual.

### v1.1 (post-aprobación Apple/Google):
- Store centralizado de precios (PRIORITARIO)
- Editar activo Portfolio
- Selector monedas Valor Total
- PT/ZH activar (ya funcionan)
- Banner eventos dinámico
- Onboarding modo claro
- Foto perfil persistente

### v2.0 (futuro):
- API eventos real
- Alertas WhatsApp automáticas
- Notificaciones push
- Análisis técnico avanzado
- Social / comunidad
- API personal ELITE

### PLAN MKT (paralelo a aprobación):
- PDF completo: `/Users/fernandomoscon/Downloads/AUREX PLAN MKT.pdf` (extraer texto con `pdftotext`)
- Buffer (gratis) para X / LinkedIn / Instagram / Facebook (3 canales + 10 posts en cola gratis)
- 30 posts/mes generados con Claude Chat → tabla → copy a Buffer
- Behind the scenes Instagram Stories 2x/semana
- Video análisis 60 seg TikTok+Reels 2x/semana
- Thread "cómo leer AUREX PULSE" en X 1x/semana (con Buffer auto)
- Resumen mercado diario en Telegram
- Artículo corto LinkedIn 1x/semana

---

## 8. SAFETY POINTS (puntos de reversión seguros)

> Para SHA frescos en tiempo real, ver `DAILY_STATUS.md`. Si no existe, ejecutar:
> ```bash
> git -C /Users/fernandomoscon/Desktop/aurex-app log -1 --format='%h %s'
> git -C /Users/fernandomoscon/AurexApp log -1 --format='%h %s'
> git -C /Users/fernandomoscon/Desktop/aurex-backend log -1 --format='%h %s'
> ```

Tags estables conocidos (al 18-abr-2026):

**aurex-app (PWA):**
- `safety-point-2026-04-15-pre-port-nativa`
- `safety-point-2026-04-16-perfil-login-ok`
- `safety-point-2026-04-17-pwa-arquitectura`

**AurexApp (Nativa):**
- `safety-point-2026-04-15-whatsapp-live`
- `safety-point-2026-04-16-nativa-estable`
- `safety-point-2026-04-16-i18n-perfil-completo`
- `safety-point-2026-04-16-8-idiomas-completo`
- `safety-point-2026-04-17-8idiomas-whatsapp-templates`

**aurex-backend:**
- `safety-point-2026-04-17-whatsapp-4templates`

---

## 9. CÓMO TRABAJA FERNANDO

- **Code (yo)** = Claude Code (terminal). Tiene acceso al filesystem y los repos.
- **Escritorio** = Claude Desktop (app de escritorio + Chrome). Sin acceso al filesystem.
- Fernando pide opiniones cruzadas para decisiones sensibles. Cuando arma textos "para un nuevo chat" o "para escritorio", el destinatario es **Escritorio**, no yo.
- Code y Escritorio coordinan: Code analiza el código, Escritorio da segunda opinión técnica/estratégica.
- Fernando NO valida lo técnico, valida producto. Code valida lo técnico antes de mostrar.

---

*CLAUDE.md — última actualización manual: 28-abr-2026*
*Datos dinámicos (fechas, SHAs, incidentes activos) en `DAILY_STATUS.md` (autogenerado por cron del backend).*
