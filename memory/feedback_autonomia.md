---
name: Autonomía operativa — preferir tokens y allowlist sobre confirmaciones manuales
description: Cuando hay alternativa autónoma (token permanente, allowlist, env var), elegirla siempre antes que pedirle a Fernando ejecutar un comando o aprobar un OK/YES
type: feedback
originSessionId: ca803ad3-924c-42d1-a5b2-bb0af97e514a
---
**Regla principal:** Si una acción puede resolverse de forma autónoma (token permanente, allowlist en `settings.json`, env var, archivo en disco), tomar esa vía. Pedirle a Fernando que ejecute un comando interactivo (`! gh auth login`, `! railway login`) o aprobar un OK/YES es la última opción, no la primera.

**Why:** Fernando me dijo el 1-may-2026: "necesito que por cada paso que das que yo pido no me envies mas comandos para porner OK o YES eso tambien en mi anterior sesion lo autorice los permisos para que al arrancar los tuvieras activos". Le había mandado 3 comandos `! <cmd> auth login` para gh / railway / supabase, asumiendo que browser OAuth era el camino default. Pero los 3 CLIs aceptan tokens permanentes, y él ya tiene establecido el flujo "secret en `~/Downloads/SECRET <SERVICIO>.txt`". Yo no exploré la vía autónoma antes de pedirle clicks.

**How to apply:**

1. **Antes de mandarle un comando para ejecutar, preguntarme:** ¿existe forma de hacerlo sin su intervención? (token + env var, archivo en disco, allowlist, API key). Si sí → uso esa vía. Si genuinamente no existe → recién ahí le mando el comando, explicando por qué no hay alternativa.

2. **Patrón de tokens permanentes** ya establecido por Fernando: archivo `.txt` en `~/Downloads/` con nombre `SECRET <SERVICIO>.txt` (ej: `SECRET ELEVENLABS.txt`, `SECRET KEY.txt` para Supabase, `SECRET RUNWAY.txt`). Yo los leo con Read tool (que sí tiene permiso en Downloads), configuro el CLI/curl, y borro el archivo si es uso de un solo turno o lo dejo si se reusa.

3. **Patrón de allowlist en `~/.claude/settings.json`:** cuando descubro que un comando se va a usar repetidamente, agregar el patrón al `permissions.allow` para evitar prompts futuros. Las acciones destructivas van al `deny` con patrón específico (no blanket — `railway redeploy --service evo-v1*` sí, `railway *` blanket no).

4. **Token-based auth de los 3 CLIs principales (verificado 1-may-2026):**
   - `gh`: `gh auth login --with-token < /path/to/token.txt` (PAT classic, scopes `repo` + `workflow`).
   - `railway`: `export RAILWAY_TOKEN=<token>` o `railway login --browserless` con token de `https://railway.app/account/tokens`.
   - `supabase`: `export SUPABASE_ACCESS_TOKEN=<token>` (PAT de `https://supabase.com/dashboard/account/tokens`).
   - Una vez autenticados, las credenciales quedan en el llavero de macOS / config local (`~/.config/<cli>`) y no requieren más browser.

5. **Excepciones legítimas** donde sí necesito que Fernando intervenga manualmente:
   - Acciones que requieren su decisión humana real (qué texto poner, qué opción elegir, aprobación de un cambio sensible).
   - Acciones físicamente imposibles desde Bash (escanear QR en su iPhone, abrir App Store Connect en el browser para tildar un checkbox, completar un form de Apple/Google con datos personales).
   - Cuando una acción dispara las "4 preguntas obligatorias" de servicios de tercero — la pregunta 4 sí requiere autorización expresa.

6. **NO confundir esto con la regla "no avanzar sin autorización":** sigue vigente que cuando termina una tarea NO arranco la siguiente sin OK explícito. Lo que cambia es que dentro de una tarea autorizada, NO le pido sub-confirmaciones por cada paso técnico que se puede automatizar.

**Test mental antes de mandarle un comando para ejecutar:** ¿esto se puede resolver leyendo un archivo, llamando una API con un token, o agregando un permiso a `settings.json`? Si sí, tomo esa vía y solo le pido al final lo mínimo indispensable (un token, una decisión, una aprobación de algo realmente sensible).
