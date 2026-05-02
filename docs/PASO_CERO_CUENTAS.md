# PASO CERO — Apertura de cuentas AUREX

**Generado por Code el 2-may-2026.** Guía operativa para abrir las 7 cuentas de redes y servicios necesarias antes de arrancar Plan MKT v3.0+. Fernando ejecuta cada paso con apoyo en línea de Escritorio (vía Chrome). Code recibe tokens al final de cada canal y los guarda en Railway env vars.

**Tiempo total estimado:** 3-4 horas tuyas + esperar 1-3 semanas la aprobación TikTok Content Posting API (paralelo, no bloquea).

---

## 0. DATOS COMUNES (usar en TODAS las cuentas)

| Campo | Valor |
|---|---|
| **Email** | `app.aurex@gmail.com` |
| **Contraseña** | `Aurex2026!` (con `!` final por si la plataforma exige caracter especial) |
| **Teléfono principal** | `+54 9 11 3360 2563` (línea AUREX, eSIM Claro) |
| **Teléfono respaldo** | `+54 11 6789-1320` (Fernando personal) — usar SOLO si la 2563 no recibe SMS |
| **Nombre público** | `AUREX` |
| **Bio corta (130 caracteres)** | `Global markets terminal. AI signals on 350 assets in 8 languages. aurex.live` |
| **Bio larga (500 caracteres)** | `AUREX is the global markets terminal that crosses technical, macroeconomic, geopolitical and sentiment data — in real time, on 350 selected assets across 9 instrument types and 7 global markets, in 8 languages. AI signals + 24 variables + 3 real-time banners + intelligent Portfolio. Not a broker. Not advice. Statistical probabilities for the individual market follower. aurex.live` |
| **Sitio web** | `https://aurex.live` |
| **País** | Argentina |
| **Industria** | Financial Technology / Fintech / Investment Tools |
| **Foto perfil** | Logo búho v2 dorado (te lo paso a `~/Downloads/AUREX_LOGO_PROFILE.png` al iniciar) |
| **Foto portada/banner** | Plantilla AUREX navy + búho (te la paso a `~/Downloads/AUREX_BANNER.png` al iniciar) |

---

## 0.A PRE-REQUISITO #1 — Crear cuenta Gmail `app.aurex@gmail.com`

**Solo si no existe ya.** Si ya la creaste antes, saltá a 0.B.

1. Abrir https://accounts.google.com/signup en Chrome (modo normal, NO incógnito).
2. Nombre: `AUREX` / Apellido: `App`.
3. Username: `app.aurex` (verificar que el dominio sea `@gmail.com`).
4. Contraseña: `Aurex2026!`.
5. Teléfono de recuperación: `+54 9 11 3360 2563`.
6. Email de recuperación: `fmoscon@gmail.com`.
7. Aceptar términos.
8. **Verificar que llegó SMS al 2563.** Si NO llegó en 5 min, repetir con número `+54 11 6789-1320`.
9. **Avisarme por chat:** "Gmail app.aurex@gmail.com creada OK".

---

## 0.B PRE-REQUISITO #2 — Instalar Google Authenticator en tu iPhone

**Para 2FA de todas las cuentas (más seguro y confiable que SMS).**

1. App Store → buscar `Google Authenticator` → instalar.
2. Abrir, sin agregar nada todavía. Lo vamos a usar en cada canal cuando aparezca el QR de 2FA.
3. **Avisarme por chat:** "Authenticator instalado".

---

## CANAL 1 — TELEGRAM CHANNEL (5 min — el más simple, arranquemos por acá)

**Objetivo:** crear canal público `@AurexPulse` y agregar el bot existente como admin para que Code pueda publicar.

### Pasos:

1. Abrir Telegram en tu iPhone (la app que ya usás).
2. Tocar el ícono de lápiz (esquina superior derecha) → `New Channel`.
3. Nombre del canal: `AUREX Pulse`.
4. Descripción: `Global markets terminal. AI signals + Pulse + alerts on 350 assets in 8 languages. aurex.live`.
5. Foto: subir el logo búho dorado (te lo paso a Descargas al iniciar).
6. Tipo: `Public Channel`.
7. Link: probar `@AurexPulse`. Si está ocupado, probar `@AurexPulseApp`. Avisarme cuál quedó.
8. Saltar paso "Add Members" → tocar la flechita.
9. **Agregar el bot como admin:**
   - En el canal recién creado → tocar el nombre arriba → `Administrators` → `Add Administrator`.
   - Buscar: `@Aurexalertas_bot` → seleccionar.
   - Activar todos los permisos: `Post Messages`, `Edit Messages`, `Delete Messages`, `Add Subscribers` (no obligatorio), `Manage Live Streams` (no obligatorio).
   - Guardar.

### Lo que me pasás al final:

> "Telegram OK. Canal `@AurexPulse` (o el handle que haya quedado) creado. Bot ya es admin."

**Yo (Code) pruebo enviando un mensaje de prueba al canal vía API. Si llega → token válido y configuro Railway. Si no → veo el error y te aviso.**

---

## CANAL 2 — YOUTUBE CANAL (10 min)

**Objetivo:** crear canal `@AurexAnalysis` con cuenta Google `app.aurex@gmail.com`.

### Pasos:

1. En Chrome, asegurarse de estar logueado con `app.aurex@gmail.com` (icono arriba derecha).
2. Ir a https://www.youtube.com.
3. Click en el avatar (arriba derecha) → `Create a channel`.
4. Tipo: **Brand account** (NO personal). Nombre del canal: `AUREX`.
5. Handle: `@AurexAnalysis`. Si está ocupado, probar `@AurexApp` o `@AurexGlobal`.
6. Subir foto de perfil (logo búho) y banner (plantilla AUREX).
7. Sección `About`:
   - Description: pegar la **bio larga (500 caracteres)** de la sección 0.
   - Country: Argentina.
   - Email para business inquiries: `app.aurex@gmail.com`.
   - Links: `https://aurex.live`, `https://x.com/aurex_app` (placeholder, lo agregás después de crear X).

### Habilitar API access:

8. Ir a https://console.cloud.google.com con la misma cuenta `app.aurex@gmail.com`.
9. Aceptar términos del Cloud Console.
10. Crear nuevo proyecto: nombre `AUREX-Backend`, ubicación `No organization`.
11. En el proyecto → menú lateral → `APIs & Services` → `Library` → buscar `YouTube Data API v3` → `Enable`.
12. Volver al menú lateral → `Credentials` → `+ Create Credentials` → `API Key`.
13. **Copiar el API Key generado** (formato: `AIzaSy...`, ~39 caracteres).

### Lo que me pasás al final:

> "YouTube OK. Canal `@AurexAnalysis` creado. API Key: `AIzaSy...PEGAR_ACA`."

---

## CANAL 3 — X / TWITTER + DEVELOPER API (25 min)

**Objetivo:** cuenta `@aurex_app` (o similar) + obtener API tokens v2.

### Pasos cuenta:

1. En Chrome, ir a https://x.com (cerrar sesión si hay otra cuenta abierta).
2. Click `Sign up` → continuar con email `app.aurex@gmail.com`.
3. Nombre: `AUREX`.
4. Fecha de nacimiento: usar la del proyecto (tu propia fecha real para verificación, después se puede cambiar la "exhibida").
5. Verificar email (te llega código a `app.aurex@gmail.com`).
6. Username: probar `@aurex_app`. Si ocupado: `@aurex_global`, `@aurex_markets`, `@aurex_io`. Avisarme cuál quedó.
7. Cuando pida número de teléfono: **omitir si te lo permite**, o sino usar `+54 9 11 3360 2563`.
8. Bio: pegar la **bio corta (130 caracteres)** de la sección 0.
9. Foto perfil: logo búho.
10. Banner: plantilla AUREX.
11. Ubicación: Argentina.
12. Sitio web: `https://aurex.live`.

### Pasos Developer API (en la misma sesión):

13. Ir a https://developer.x.com/en/portal/dashboard.
14. Click `Sign up for Free Account`.
15. Llenar formulario:
    - Use case: **`Making a Bot`**.
    - Description (250+ caracteres): copiar este texto:
      > `AUREX is a global markets terminal that publishes AI signals, market pulse, futures pre-market data, and event alerts on financial markets. We use the X API to programmatically publish content from our backend to our official @aurex_app account: daily signals, market pulse updates, event banners (FED/CPI), pre-market futures alerts, and high-conviction AI signals. Read access is needed to monitor mentions and engagement. We will not store any user data beyond what X publicly provides.`
    - Will you make Twitter content available to government entities? `No`.
16. Aceptar Developer Agreement.
17. En el dashboard → `Projects & Apps` → click en el proyecto default creado.
18. En `Keys and tokens`:
    - Generate `API Key` and `API Secret` → **copiar ambos** (solo se muestran una vez).
    - Generate `Access Token` and `Access Token Secret` → **copiar ambos** (solo se muestran una vez). **IMPORTANTE: configurar permisos a `Read and Write` antes de generar Access Token. Si ya lo generaste con Read-only, regenerar.**
    - Bearer Token → **copiar**.

### Lo que me pasás al final:

> "Twitter OK. Username `@aurex_app` (o el que quedó). Tokens:
> API Key: `XXXXX`
> API Secret: `XXXXX`
> Access Token: `XXXXX`
> Access Token Secret: `XXXXX`
> Bearer Token: `XXXXX`"

**Yo guardo los 5 tokens en Railway env vars como `TWITTER_API_KEY`, `TWITTER_API_SECRET`, `TWITTER_ACCESS_TOKEN`, `TWITTER_ACCESS_SECRET`, `TWITTER_BEARER_TOKEN` y pruebo enviando un tweet de test.**

---

## CANAL 4 — LINKEDIN COMPANY PAGE (10 min)

**Objetivo:** crear Page "AUREX" desde tu perfil personal de LinkedIn (no requiere cuenta nueva).

### Pasos:

1. En Chrome, ir a https://www.linkedin.com loggeado con tu perfil personal de Fernando (el que ya tenés).
2. En el menú superior → `For Business` (icono cuadricula) → `Create a Company Page`.
3. Page type: `Company`.
4. Page identity:
    - Name: `AUREX`.
    - LinkedIn public URL: `linkedin.com/company/aurex-app` (si ocupado: `aurex-markets`, `aurex-global`).
    - Website: `https://aurex.live`.
5. Company details:
    - Industry: `Financial Services` (subcategoría: `Investment Management` o `Capital Markets`).
    - Company size: `2-10 employees`.
    - Company type: `Privately held`.
6. Profile details:
    - Logo: búho dorado.
    - Tagline (120 caracteres): pegar la **bio corta (130 caracteres)** de la sección 0 (recortar si hace falta).
7. Aceptar verificación "I am authorized to act on behalf of this company".
8. Click `Create page`.

### Configurar Buffer para automatización (LinkedIn Marketing API es complicada de approvar — Buffer es más simple):

9. Ir a https://buffer.com → `Sign up` con `app.aurex@gmail.com`.
10. Plan: `Essentials` ($6/mes) o `Team` ($12/mes). Empezar con Essentials, upgradear si hace falta.
11. Conectar LinkedIn Company Page recién creada (Buffer pide permiso, dar acceso).

### Lo que me pasás al final:

> "LinkedIn OK. Company Page URL: `linkedin.com/company/aurex-app`. Buffer OK conectado, plan Essentials/Team."

**Yo no necesito tokens directos para LinkedIn — Buffer maneja la conexión. Solo necesito que confirmes que Buffer ve la Page.**

---

## CANAL 5 — INSTAGRAM BUSINESS + FACEBOOK PAGE + META GRAPH API (45 min — el más complejo)

**Objetivo:** crear cuenta IG `@aurex.app`, crear Facebook Page "AUREX", vincular ambas, convertir IG a Business, obtener Meta Graph API token.

### Pasos cuenta Facebook (necesaria para vincular IG Business):

1. En Chrome, ir a https://www.facebook.com.
2. Si NO tenés cuenta personal de Fernando con `app.aurex@gmail.com`, crear una nueva con ese email. Si ya hay cuenta personal con ese email, ir a 4.
3. Nombre: `Fernando Moscon`. Fecha de nacimiento real. Género opcional.
4. Verificar email.

### Crear Facebook Page:

5. En el menú superior → `Pages` → `Create New Page`.
6. Page name: `AUREX`.
7. Category: `Financial Service` o `Software Company`.
8. Bio: pegar **bio corta** de la sección 0.
9. Click `Create Page`.
10. Subir logo (foto perfil) y banner.

### Crear cuenta Instagram Business:

11. En tu iPhone, abrir App Store → buscar `Instagram` → instalar (si no está).
12. Abrir Instagram → `Create new account` con email `app.aurex@gmail.com`.
13. Username: `aurex.app`. Si ocupado: `aurex_app_global`, `aurex.markets`. Avisarme cuál quedó.
14. Password: `Aurex2026!`.
15. Verificar email.
16. Una vez en la cuenta → ir a `Settings & privacy` → `Account type and tools` → `Switch to Professional Account` → `Business`.
17. Categoría: `Finance Services` o `Software`.
18. Email contacto: `app.aurex@gmail.com`.
19. **Vincular a la Facebook Page recién creada.** Cuando pida, seleccionar la Page "AUREX" creada en paso 9.

### Obtener Meta Graph API token:

20. En Chrome, ir a https://developers.facebook.com.
21. Login con tu cuenta personal Facebook.
22. `My Apps` → `Create App` → tipo `Business` → nombre `AUREX-Backend` → email `app.aurex@gmail.com`.
23. En el dashboard del app → menú lateral → `Add Products`:
    - Agregar `Instagram Graph API`.
    - Agregar `Facebook Login for Business`.
    - Agregar `Pages API`.
24. En `Settings` → `Basic` → copiar `App ID` y `App Secret`.
25. En `Tools` → `Graph API Explorer`:
    - Seleccionar el app `AUREX-Backend`.
    - Click `Generate Access Token` → seleccionar la Page "AUREX" → permisos: `pages_show_list`, `pages_read_engagement`, `pages_manage_posts`, `instagram_basic`, `instagram_content_publish`, `instagram_manage_comments`.
    - Copiar el access token corto.
26. **Convertir a Long-Lived Token** (60 días, después se renueva automático): pegar este URL en otra pestaña de Chrome reemplazando los `{}`:
    ```
    https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id={APP_ID}&client_secret={APP_SECRET}&fb_exchange_token={SHORT_TOKEN}
    ```
27. Copiar el `access_token` que devuelve. Ese es el token largo.

### Aplicar a Meta Graph API approval (puede tardar 3-5 días):

28. En el dashboard del app → `App Review` → `Permissions and Features`.
29. Solicitar approval para los 6 permisos del paso 25 (`pages_show_list`, etc.).
30. Llenar formulario de cada permiso describiendo el uso (Code te puede pasar los textos cuando llegue ese momento — por ahora aplicá con descripciones cortas).

### Lo que me pasás al final:

> "Instagram OK. Username `@aurex.app` (o el que quedó). Facebook Page creada y vinculada. Meta Graph API:
> App ID: `XXXXX`
> App Secret: `XXXXX`
> Page ID (de Facebook Page AUREX): `XXXXX`
> IG Account ID: `XXXXX`
> Long-Lived Token: `XXXXX` (válido 60 días)"

**Page ID e IG Account ID los obtenés en Graph API Explorer ejecutando `GET /me/accounts`. Si te perdés, avisame y te guio en vivo.**

---

## CANAL 6 — TIKTOK + CONTENT POSTING API (25 min + esperar 1-3 semanas aprobación)

**Objetivo:** cuenta `@aurex.app` + aplicar a Content Posting API. La aprobación TikTok tarda 1-3 semanas, no bloquea el resto del lanzamiento.

### Pasos cuenta:

1. En tu iPhone, App Store → instalar `TikTok` (si no está).
2. Abrir TikTok → `Sign up` con email `app.aurex@gmail.com`.
3. Username: `aurex.app`. Si ocupado: `aurex_app`, `aurex.markets`.
4. Password: `Aurex2026!`.
5. Foto perfil: logo búho.
6. Bio (80 caracteres): `Global markets terminal. AI signals on 350 assets. aurex.live`.
7. Convertir a cuenta business: `Settings & privacy` → `Account` → `Switch to Business Account` → categoría `Finance & Investment`.

### Aplicar a Developer API:

8. En Chrome, ir a https://developers.tiktok.com.
9. `Login` con la cuenta TikTok recién creada.
10. `Manage Apps` → `Connect an app`.
11. App name: `AUREX-Backend`.
12. Description: copiar este texto:
    > `AUREX is a global markets terminal that publishes daily AI signal videos, market analysis, and educational content on financial markets to our official @aurex.app TikTok account from our backend infrastructure.`
13. Categories: `Finance`, `Education`.
14. Aceptar términos.
15. Solicitar acceso a `Content Posting API`. Estado quedará `Pending review`.

### Lo que me pasás al final:

> "TikTok OK. Username `@aurex.app` (o el que quedó). Aplicación a Content Posting API enviada, esperando approval."

**TikTok aprueba en 1-3 semanas externamente. Mientras tanto, podemos publicar manualmente vía Loomly como fallback (te lo paso configurado cuando llegue el momento).**

---

## CANAL 7 — WHATSAPP BUSINESS

**Ya está. Línea +54 9 11 3360 2563 vinculada a Evolution API en Railway, operativa desde 1-may-2026 8:00 AR. No requiere acción.**

---

## CANAL 8 — EMAIL TRANSACCIONAL (Resend) — Code lo configura

**Vos no hacés nada acá. Code configura DNS en Cloudflare con el dominio aurex.live + cuenta Resend con `app.aurex@gmail.com`. Solo te aviso cuando esté listo.**

---

## CHECK FINAL — Lo que tengo que tener al cerrar el Paso CERO

Cuando termines, idealmente tengo:

- [ ] Telegram channel `@AurexPulse` con bot admin → publicación operativa
- [ ] YouTube canal `@AurexAnalysis` + API Key → publicación operativa
- [ ] X/Twitter `@aurex_app` + 5 tokens → publicación operativa
- [ ] LinkedIn Company Page + Buffer conectado → publicación operativa
- [ ] Instagram Business `@aurex.app` + Facebook Page + Meta Graph API tokens → publicación operativa (post-approval ~3-5 días)
- [ ] TikTok `@aurex.app` + aplicación API enviada → operativa post-approval (1-3 semanas)
- [ ] WhatsApp Business 2563 → ya operativa
- [ ] Resend (transaccional) → Code lo arma solo

---

## CÓMO PASARME LOS TOKENS

**Por chat acá** — cada vez que termines un canal, pegame los datos solicitados en la sección "Lo que me pasás al final" de ese canal. Yo los pego en Railway env vars con `railway variables --set` y pruebo conexión inmediatamente.

**Si yo no estoy disponible** y querés avanzar igual, guardalos en `~/Downloads/SECRETS_PASO_CERO.txt` con formato:

```
TELEGRAM_CHANNEL: @AurexPulse
YOUTUBE_API_KEY: AIzaSy...
TWITTER_API_KEY: ...
TWITTER_API_SECRET: ...
[etc]
```

Cuando vuelva, leo el archivo, los muevo a Railway, y borro el archivo local.

**REGLA INVIOLABLE: nunca pegues tokens en GitHub, en CONTEXTO.md, en CLAUDE.md, ni en ningún archivo del repo. Solo a chat de Code o a `~/Downloads/SECRETS_*.txt`.**

---

## ORDEN RECOMENDADO DE EJECUCIÓN

1. Pre-requisitos 0.A (crear Gmail) y 0.B (Authenticator) — 10 min.
2. Telegram (5 min) — quick win.
3. YouTube (10 min).
4. Twitter (25 min).
5. LinkedIn (10 min).
6. **Pausa si querés** (corte natural a las ~1h de empezar).
7. Instagram + Facebook + Meta Graph (45 min) — el más pesado.
8. TikTok (25 min).

**Total: 2 horas y 10 minutos de trabajo continuo + 30 min flotando entre verificaciones de email.**

---

*PASO_CERO_CUENTAS.md — generado por Code el 2-may-2026. Una vez completado, este archivo se mueve a `docs/archivo/` y queda como referencia histórica. El plan táctico v3.1 se construye sobre las cuentas reales abiertas, no antes.*
