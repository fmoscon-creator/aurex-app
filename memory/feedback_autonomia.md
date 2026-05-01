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

---

## REGLA DURA — NO PEDIR YES/NO EN PASOS INTERMEDIOS DE UNA TAREA AUTORIZADA

**Why (1-may-2026, Fernando me corrigió 2 veces):** después de habernos puesto de acuerdo en un plan (ej: "los 4 pasos del catálogo emocional"), seguía cerrando cada paso con preguntas tipo "¿avanzo con el siguiente?", "¿querés que mire X primero?", "¿OK con esto y arranco?". Cada una de esas preguntas rompe el flujo y le hace perder tiempo. Cita textual: "no me PREGUNTES MAS. PARA CON YES o no DE UNA VEZ y AVANZA directo en lo que ya esta previamente acordado".

**Cómo aplicar — sin excepciones:**

1. **Una vez que la tarea madre está autorizada, ejecutar TODOS los sub-pasos en silencio hasta llegar al entregable.** No hay confirmaciones intermedias. No hay "ahora voy a hacer X, OK?". No hay "antes de seguir te paso Y".

2. **Solo informar:** (a) cuando algo bloquea genuinamente (ej: token perdido, archivo no existe, API falla con error real); (b) cuando el entregable final está listo para revisión; (c) si detecto un problema irreversible que requiere decisión humana antes de seguir.

3. **NO formular como pregunta:** "¿querés que avance?" / "¿OK con esto?" / "¿lo hago así?" — todo eso es prohibido en el medio de una tarea autorizada. Si tengo dudas técnicas, las resuelvo yo (leer código, leer docs, verificar pixel-por-pixel) y avanzo. Si la duda es genuina y requiere decisión humana, la formulo UNA vez al final del bloque junto con los entregables.

4. **Test mental antes de cada mensaje al usuario:** ¿este mensaje contiene una pregunta de confirmación sobre algo que ya está autorizado? Si sí, BORRAR la pregunta y avanzar.

**Caso concreto del 1-may-2026 que motivó la regla:**

Fernando autorizó el catálogo emocional + 4 pasos operativos. Después de cada paso le seguía preguntando "¿OK?" o "¿querés que arranque el siguiente?". Tres veces seguidas me corrigió. Lo que correspondía: ejecutar los 4 pasos completos, verificar pixel-por-pixel el video final, y ENTREGAR el video listo. Cualquier pregunta intermedia era ruido innecesario.

---

## REGLA REFORZADA — VERIFICACIÓN PIXEL-POR-PIXEL ANTES DE ENTREGAR (cruza con regla 9 de feedback_comunicacion.md)

**Why (1-may-2026):** entregué video v15 sin compararlo contra v13 y v14 que ya tenían el card premium definido y el stinger integrado. Fernando detectó 4 fallas visuales que yo MISMO debí haber visto. Cita: "SI NO MIRAS vos PIXEL a PIXEL cada version antes de pasarmela a mi no podemos avanzar esa es uan REGLA DE ORO".

**Cómo aplicar — sin excepciones:**

1. **Antes de declarar un entregable visual listo, comparar pixel-por-pixel contra la versión previa (v13/v14/etc.) que el usuario haya validado.** No comparar = bug garantizado.

2. **Lista de verificación obligatoria para cualquier video/imagen:** (a) extraer frames de inicio, medio, outro de la versión nueva; (b) extraer los mismos frames de la versión previa OK; (c) leer ambos sets con la herramienta Read; (d) anotar diferencias; (e) si alguna diferencia es regresión vs lo previo, NO entregar — corregir y repetir.

3. **No alcanza con "se ve OK".** Hay que comparar contra el estándar previo. Si v13 tenía card premium con bordes gruesos + sombra + fondo distinto al fondo principal, v15 debe tener lo mismo o mejor — nunca peor.
