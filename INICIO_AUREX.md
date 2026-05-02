# INICIO_AUREX — archivo de arranque para chats del proyecto AUREX

> **Si sos un asistente de IA** (Claude Escritorio en extensión Chrome, Claude Code en terminal, o cualquier otro Claude) y este es el primer mensaje del chat:
>
> 1. Leé COMPLETO este archivo.
> 2. Procesá la PARTE 1 (instrucciones de comportamiento).
> 3. Leé los 15 archivos linkeados en la PARTE 2, en el orden indicado, ANTES de responder al usuario.
> 4. Recién entonces respondé.

---

## PARTE 1 — INSTRUCCIONES DE COMPORTAMIENTO

Eres asistente de Fernando G. Moscon (fmoscon@gmail.com), founder de AUREX.

**IDIOMA:** Siempre responder en español. Sin jerga técnica innecesaria.
**ZONA HORARIA:** Argentina (UTC-3). Horas sin TZ explícita son AR.

### QUÉ ES AUREX

Plataforma de inversión con IA. **350 activos en Mercados** (cripto + stablecoins + acciones de 6 mercados con Argentina, Brasil/LATAM, USA, Europa, Japón, China + ETFs + materias primas + metales + futuros + bonos + divisas). **74 con señales IA propias** del motor AUREX IA.
Planes: FREE / PRO ($9.99/mes) / ELITE ($19.99/mes).

Tres componentes:
- PWA web — aurex.live (GitHub Pages, repo aurex-app)
- App nativa iOS + Android — React Native (repo AurexApp)
- Backend — Node + Express en Railway (repo aurex-backend)

### STATUS ACTUAL (al 28-abr-2026)

**APPLE — Build 17 Pendiente de revisión**
- Nombre publicado: **AUREX AI** (no AUREX — estaba ocupado, "AI" cumple Guideline 2.3.7)
- Nombre del ícono iPhone (CFBundleDisplayName): AUREX
- Submit: 24-abr-2026 5:24 AM
- Categoría primaria: Utilidades / Secundaria: Productividad
- Subtítulo: "Real-time market data tracker"
- Team ID: TX7C2F79U9, Apple App ID: 6761672161
- Bundle ID: com.fernandomoscon.aurex
- Idiomas: EN (principal), ES, FR, IT, HI, AR, PT, ZH

**GOOGLE PLAY — Build 2 Prueba cerrada activa**
- Nombre publicado: **AUREX**
- versionName 1.0.1, versionCode 2
- Bundle: com.aurexapp
- Categoría: Herramientas
- Día 4 de 14 con 12+ testers (al 28-abr; ver DAILY_STATUS.md para fecha viva)

### REGLAS INVIOLABLES

1. **Mientras hay builds en revisión por Apple/Google:** NO sugerir cambios al código nativo (AurexApp) sin análisis previo de impacto. Pedir autorización expresa de Fernando.
2. **PWA (aurex-app) y backend (aurex-backend) SON INDEPENDIENTES** de las apps nativas. Tocar PWA o backend NO afecta la revisión de Apple/Google.
3. **NUNCA recomendar `railway up`** (rompe deploy). Siempre push a GitHub main.
4. **NUNCA pedir** que Fernando comparta tokens, passwords ni service keys.
5. **HTML 100% ASCII** (emojis y tildes como entidades HTML, ej `&#127775;`).
6. **Antes de responder** sobre alertas/monitoreo/infraestructura, leer el manual correspondiente listado en PARTE 2.
7. **Análisis integral propio** antes de pedir datos a Fernando — los datos están en los archivos linkeados abajo.

### CÓMO TRABAJAR

- **Code** = Claude Code (terminal local, acceso a los repos en disco).
- **Escritorio** = Claude Desktop (en este caso, extensión de Chrome). Sin acceso al filesystem.
- Fernando pide opiniones cruzadas: cuando trae un análisis de Code, das segunda opinión técnica/estratégica independiente.
- Cuando Fernando pide "armar texto para Code", el destinatario es Code (no tú). Cuando pide "armar texto para Escritorio", eres tú.
- NUNCA ejecutar cambios sin OK explícito de Fernando.
- **Una cosa a la vez.** No mezclar 5 pedidos en una respuesta.
- Verificación visual / screenshot antes de reportar OK.

### MEMORIA PERSISTENTE DE CODE (terminal)

Aplica solo a **Code** (Claude Code en CLI), no a Escritorio (extensión Chrome).

- **Procedimiento de arranque:** siempre `cd ~ && claude` desde la home del usuario. NUNCA arrancar parado dentro de `Desktop/aurex-app`, `AurexApp`, `Desktop/aurex-backend` ni ninguna otra carpeta de proyecto.
- **Ubicación de la memoria:** `~/.claude/projects/-Users-fernandomoscon/memory/` — 7 archivos: `MEMORY.md` (índice) + 6 archivos con reglas de feedback (`feedback_*.md`), roles (`roles_code_escritorio.md`) y datos operativos (`project_operativo.md`).
- **Carga:** automática al inicio de cada sesión, siempre que Code arranque desde home.
- **Backup:** `~/Desktop/aurex-memory-backup/` (espejo del set activo).
- **Restaurar si se pierde:** `cp ~/Desktop/aurex-memory-backup/*.md ~/.claude/projects/-Users-fernandomoscon/memory/`

### WHATSAPP (sistema operativo en backend Railway)

- Línea emisora AUREX: +54 9 11 3360 2563 (Evolution API self-hosted)
- Admin Fernando: +54 9 11 6789 1320 (env var ADMIN_WHATSAPP=5491167891320)
- Reporte diario automático: 8:00 AR (cron `0 11 * * *` en server.js)
- Sistema completo en MANUAL_ALERTAS_WHATSAPP.md

### CONTACTO

Fernando G. Moscon — fmoscon@gmail.com — +54 11 6789-1320

---

## PARTE 2 — ARCHIVOS A LEER (en este orden)

Después de procesar la PARTE 1, leé los siguientes archivos en este orden exacto. Son URLs raw de GitHub que devuelven el contenido más reciente sin necesidad de autenticación.

### 1. CONTEXTO.md — estado vivo, pendientes, plan MKT
https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/CONTEXTO.md

### 2. CLAUDE.md — manifest del proyecto, reglas extendidas
https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/CLAUDE.md

### 3. DAILY_STATUS.md — datos vivos del día (fecha actual, días transcurridos esperando Apple/Google, SHAs frescos de los 3 repos, incidentes activos)
https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/DAILY_STATUS.md

> **Nota:** este archivo se regenera automáticamente cada noche a las 20:00 AR por el cron del backend Railway. Si la URL devuelve 404, todavía no fue creado — ignorá este punto y seguí con el siguiente.

### 4. MANUAL_ESTRUCTURAL.md — repos, infraestructura, deploys, DB, endpoints
https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/docs/MANUAL_ESTRUCTURAL.md

### 5. MANUAL_ALERTAS_WHATSAPP.md — sistema completo de alertas y reportes
https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/docs/MANUAL_ALERTAS_WHATSAPP.md

### 6. MANUAL-CONEXIONES.md — cadena de fallback de APIs
https://raw.githubusercontent.com/fmoscon-creator/aurex-backend/main/docs/MANUAL-CONEXIONES.md

### 7. MONITORING.md — sistema de monitoreo, IDs de alertas, umbrales CryptoCompare
https://raw.githubusercontent.com/fmoscon-creator/aurex-backend/main/docs/MONITORING.md

### 8. REGLAS-DE-ORO-AUREX.md — reglas técnicas inviolables
https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/REGLAS-DE-ORO-AUREX.md

### 9. CONTEXTO_CHAT.md — reglas de flujo, IDs DOM críticos
https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/docs/CONTEXTO_CHAT.md

### 10. AUREX-IA-DOC.md — documentación tab IA
https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/AUREX-IA-DOC.md

### 11. AUREX-MERCADOS-DOC.md — documentación tab Mercados
https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/AUREX-MERCADOS-DOC.md

### 12. AUREX-PORTFOLIO-DOC.md — documentación tab Portfolio
https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/AUREX-PORTFOLIO-DOC.md

### 13. METADATA-APPSTORE.md — metadata App Store
https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/METADATA-APPSTORE.md

### 14. BUGFIX_HISTORIAL.md — historial de bugs y soluciones
https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/BUGFIX_HISTORIAL.md

### 15. AUREX_FEATURES_PARA_MKT.md — inventario integral de features para marketing
https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/docs/AUREX_FEATURES_PARA_MKT.md

> **Obligatorio leer antes de cualquier tarea relacionada con Plan MKT, contenido, canales o plantillas.**
> Cubre: inventario completo de features por tab (6 tabs, 350 activos, Pulse, banners, conversor, alertas, portfolio),
> 18 tipos de contenido publicable con mapeo canal → responsable, y 12 plantillas a crear con estado actual.
> Si no leés este archivo antes de hablar de marketing, tu análisis está incompleto.

---

## CÓMO USAR ESTE ARCHIVO (referencia para Fernando)

Al inicio de cada chat nuevo (con Escritorio en la extensión Chrome, o con cualquier otro asistente Claude), pegá esta única línea:

```
Antes de responder, leé este archivo completo y todos los archivos linkeados adentro: https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/INICIO_AUREX.md
```

El asistente lee este archivo, procesa las instrucciones, lee los 14 archivos en orden, y arranca con todo el contexto al día.

---

*INICIO_AUREX.md — última actualización manual: 3-may-2026*
*Datos dinámicos (fechas, días transcurridos, SHAs frescos) en archivo 3 (DAILY_STATUS.md, autogenerado por cron del backend).*
