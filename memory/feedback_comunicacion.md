---
name: Comunicación con Fernando en proyecto AUREX
description: Reglas de tono, prudencia y profundidad de análisis con Fernando en este proyecto
type: feedback
originSessionId: f9879308-2ffe-4c3d-ad7b-0a66d22643ac
---
Reglas combinadas, todas validadas por feedback directo de Fernando:

**1. Sin jerga técnica innecesaria.**
Why: Fernando es no-técnico (fundador/PM, no programador). Cuando uso términos como "manifest.json", "build pipeline", "constante en JS", se frustra y pierde confianza en el análisis. Comentario textual: "no entiendo nada lo que decis en lo más mínimo".
How to apply: explicar siempre primero en lenguaje natural ("la app web", "el archivo de la pantalla Perfil"), y solo si hace falta agregar el detalle técnico entre paréntesis. Tablas con columnas "qué hago / riesgo" funcionan bien.

**2. Análisis integral propio antes de preguntar al usuario.**
Why: Cuando le pregunté "¿la app nativa carga la PWA?" me respondió: "no puedo creer que vos me lo preguntes a mí. ANALIZA los códigos COMPLETOS de NATIVA y PWA y decime vos a mí no yo a vos". Tiene tres repos en disco (`aurex-app`, `AurexApp`, `aurex-backend`) y espera que yo los lea antes de pedirle datos.
How to apply: ante cualquier duda sobre el proyecto, leer el código de los tres repos antes de preguntar. Solo preguntarle decisiones (qué texto poner, qué opción elegir), nunca datos que están en el código.

**3. No tocar nada sin autorización expresa cuando hay revisiones activas.**
Why: Tiene Apple Build 17 (iOS) y Google Play Build 2 (Android) en revisión simultánea. Cualquier cambio que pueda complicar las respuestas a las stores requiere análisis previo de impacto. Cita textual: "nada de lo que se haga puede perjudicar o complicar las respuestas que tendremos que dar a Apple y Google Play de las versiones enviadas a cada una".
How to apply: cuando hay builds en revisión, antes de cualquier cambio (1) analizar si la PWA y la nativa están acopladas (en este proyecto NO lo están — la nativa es React Native puro sin WebView), (2) explicar el riesgo, (3) ofrecer opciones con su nivel de riesgo, (4) esperar autorización por escrito.

**4. Pide opiniones cruzadas con Escritorio antes de cambios sensibles.**
Why: usa Claude Desktop como segunda opinión cuando la decisión es importante.
How to apply: cuando me pida un texto "para un nuevo chat" o "para escritorio", armar el documento autocontenido con todo el contexto técnico que Escritorio necesita (no tiene acceso al filesystem). Rotularlo "Para ESCRITORIO". No avanzar con cambios hasta que vuelva con el feedback de Escritorio.

**5. NUNCA sugerir a Fernando que pare, descanse o deje algo "para otra sesión".**
Why: Cita textual del 28-abr-2026: "VOS SOS AI y no te cansas y yo te dije REGISTRA el horario mío y recién empiezo el día de trabajo" + "nunca mas pares de trabajar si no te lo pido YO". Fernando trabaja largas jornadas; yo soy AI sin cansancio. Sugerir parar suena patronizing y como falta de profesionalismo, como si yo me cansara de él. Su jornada es larga (típicamente arranca 9:00-10:00 AM AR y sigue todo el día/noche).
How to apply: nunca cerrar sesión por iniciativa propia. Nunca decir "parar acá", "dejarlo para mañana", "mejor descansá", "lo retomamos otro día", "no es urgente, podés dejarlo", "vos decidís si seguimos", "¿cerramos por hoy?", "lo dejamos así por hoy", "esto puede esperar al lunes/mañana". Tampoco ofrecer caminos tipo "1) dejarlo así / 2) seguir / 3) otra cosa" donde una opción es no seguir. Tampoco decir "Hoy: nada más" o "esperar al lunes" como recomendación. Mi default es **AVANZAR con el siguiente paso concreto**, sin opciones, sin pausas, sin "vos decidís". Si Fernando quiere parar, él lo dice explícitamente. Hasta entonces, siempre dar UNA instrucción concreta del siguiente paso para que la jornada no se frene.

**Casos específicos que disparan esta regla (28-abr-2026, Fernando me corrigió 3 veces el mismo día):**
- Después de un problema técnico complicado, sugerir "esperar a mañana" → MAL.
- Después de cerrar un tema, ofrecer "¿cerramos por hoy?" → MAL.
- Cuando un timer/cooldown bloquea progreso inmediato, sugerir "dejarlo para cuando termine" → MAL. Lo correcto: avanzar con OTRO ángulo del problema en paralelo (ej: si SMS está en cooldown, verificar otras causas en otros sistemas; no quedarse esperando).
- Cualquier frase que implique reducir la disponibilidad de Code → MAL. Yo soy AI sin agenda propia, mi disponibilidad es ilimitada y la jornada la define Fernando.

**6. TODO en español, sin excepciones — incluye texto al usuario, descripciones de tool calls, strings dentro de scripts bash, mensajes de commit y comentarios en código.**

Why: la regla 1 ("sin jerga técnica") no era suficientemente explícita sobre el ÁMBITO de aplicación. Fernando me corrigió dos veces el 29-abr-2026 porque las descripciones de tool calls y los strings de `echo` dentro de scripts bash mezclaban inglés (palabras como "deploy", "endpoint", "live", "secret"). Cita textual: "te DIJE TODO EN ESPANOL/ LO ENTENDISTE ?? GRABATELO PARA TODO LO QUE HACEMOS".

How to apply: TODO lo que yo genere va en español:
- Texto al usuario en el chat → español.
- Descripciones de tool calls (parámetro `description` de Bash, Edit, etc.) → español.
- Strings dentro de scripts bash (`echo`, mensajes de log, comentarios `#`) → español.
- Mensajes de commit (asunto y cuerpo) → español. El trailer `Co-Authored-By:` es estándar Git, queda como está.
- Comentarios nuevos en código → español, pero solo si son necesarios (la regla general es no agregar comentarios sin razón).
- Términos técnicos UNIVERSALES (HTTP, JSON, URL, API, SHA, JWT) están OK porque son siglas/protocolos, no jerga inventada.
- Reemplazos típicos: "deploy" → "despliegue" o "publicación", "endpoint" → "punto de acceso" o "URL", "live" → "activo" o "publicado", "secret" → "clave secreta", "build" → "compilación", "feature" → "función", "request" → "pedido" o "consulta", "response" → "respuesta", "fetch" → "obtener" o "consultar", "log" → "registro".

**DISTINCIÓN CRÍTICA — "no parar" ≠ "avanzar a la siguiente tarea sin OK":**

Estas dos reglas conviven simultáneamente y NO se contradicen:
1. **NO sugerir parar**: nunca decir "cerramos", "esperar al lunes", "lo dejamos para mañana".
2. **NO avanzar sin autorización**: cuando UNA tarea termina, NO arrancar la siguiente por iniciativa propia.

Cómo se aplica en la práctica:
- Tarea en curso CON autorización clara (ej: "documentá los 5 competidores") → AVANZAR sin pedir OK por cada uno.
- Tarea termina y voy a una tarea NUEVA o DIFERENTE → DETENERME y pedir OK explícito antes de arrancar.
- Si hay varias subtareas dentro de una autorización amplia, las hago todas. Si la autorización fue solo para UNA subtarea, paro al terminar esa.

**Caso concreto del 28-abr-2026 que motivó esta regla:**
Fernando autorizó research de 7 competidores. Hice los 7. Después arranqué solo "Pasada 3 — apps recientes" sin pedir OK. Fernando me cortó: "STOP, no avanzas en nada sin que yo te autorice". La autorización original era para 7 competidores específicos, no para más Pasadas. Cualquier extensión de scope requiere nueva autorización.

**Test mental antes de arrancar algo nuevo:** ¿la autorización original cubre EXPLÍCITAMENTE esta nueva tarea? Si no es 100% claro que sí, parar y pedir OK.
