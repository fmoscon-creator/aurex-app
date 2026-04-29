---
name: Leer manuales antes de proponer arquitectura
description: Antes de sugerir crear/montar/diseñar cualquier sistema, leer los manuales de docs/ que ya documentan lo existente
type: feedback
originSessionId: f9879308-2ffe-4c3d-ad7b-0a66d22643ac
---
**Regla:** En este proyecto los manuales en `docs/` son la fuente de verdad de la arquitectura. Antes de proponer cualquier sistema (alertas, reportes, monitoreo, infra), leer:

1. `aurex-app/docs/MANUAL_ESTRUCTURAL.md` — repos, infra, deploys, DB, endpoints
2. `aurex-app/docs/MANUAL_ALERTAS_WHATSAPP.md` — sistema completo de alertas + reportes ya implementado
3. `aurex-backend/docs/MANUAL-CONEXIONES.md` — cadena de fallback APIs
4. `aurex-backend/docs/MONITORING.md` — sistema de monitoreo activo
5. `aurex-app/REGLAS-DE-ORO-AUREX.md` — reglas técnicas inviolables
6. `aurex-app/CONTEXTO.md` — estado vivo del proyecto
7. `aurex-app/docs/CONTEXTO_CHAT.md` — contexto inicial de chat

**Why:** Fernando se quejó textualmente: "no se puede trabajar asi.. sin que entiendan y tenga registrado y presente el funcionamiento integral y actualizado de mi proyecto". Le propuse construir un sistema de alertas WhatsApp diarias **sin saber que ya existía** uno completo, con reporte a las 8:00 AR, Evolution API, 4 templates, persistencia en Supabase. Toda esa infra ya está operativa. Yo le hice perder tiempo proponiendo crear algo que ya existe.

**How to apply:** 
- Cuando el user pida "armar un sistema de X" o "agregar alertas de Y" o "monitorear Z": GREP los manuales primero (`grep -ri "X" docs/`). Si ya está documentado, partir de ahí, no proponer crear desde cero.
- Cuando una pregunta del user sugiera infra existente ("como me llega cada día a las 8"), eso es señal directa de que YA EXISTE algo. Leer el manual antes de preguntar al user cómo está armado.
- En proyectos con docs grandes y maduros, el costo de leer 5 archivos al inicio (~10 min) es mucho menor que el costo de proponer una arquitectura paralela a la real.

**Regla complementaria — verificar antes de afirmar cualquier hecho técnico verificable:**

Cuando me toque afirmar un hecho técnico que se puede verificar con un comando rápido (estado público/privado de un repo, existencia de un archivo, valor de una env var, qué versión hay instalada, qué responde un endpoint, etc.), VERIFICAR PRIMERO con bash/curl/grep antes de afirmarlo. **Asumir** un hecho técnico verificable es la misma falla que no leer manuales: produce afirmaciones falsas que después corrijo y le hacen perder tiempo a Fernando.

**Ejemplo concreto que motivó esta regla (28-abr-2026):** Le afirmé "los repos son públicos" sin chequear. Fernando me preguntó "porqué decís públicos si son privados?". Verifiqué con `curl https://api.github.com/repos/...` y resultaron ser dos públicos y uno privado. El comando son 3 líneas y 5 segundos. La afirmación sin verificar le hizo perder tiempo y confianza. Cita textual: "NO EXISTE que trabajes inventado o no analizando TODO en profundidad".

**Segundo caso (28-abr-2026 noche):** Inventé conexión causal entre la restricción de cuenta Meta Business / WhatsApp Cloud API y los SMS de verificación que no llegaban al número AUREX (2563). Sugerí que la cuenta Cloud API restringida estaba "reteniendo los SMS". Fernando me corrigió: "esto ya estaba restringido y el WhatsApp Business antes de que vos lo arruinaras me funcionaba hoy a las 8:00 — me llegó el aviso a mi línea 1320". Tenía razón: si la Cloud API restringida no había afectado el flujo previo, no era causa del SMS bloqueado. Mi sugerencia fue especulación sin verificar.

**Lección complementaria:** No solo verificar HECHOS antes de afirmarlos, sino también **conexiones causales**. Cuando vea dos sistemas con problemas y se me ocurra que uno causa el otro, antes de decirlo: ¿hay evidencia de la conexión, o es solo correlación que estoy interpretando como causación? Si es lo segundo, decir "podría haber relación, hay que verificar" en lugar de afirmar la conexión como hecho.

**How to apply:** Antes de cada afirmación del tipo "X es así" sobre algo del proyecto, preguntarme: ¿esto lo verifiqué con un comando, o lo estoy asumiendo? Si es lo segundo, parar, ejecutar el comando, y solo entonces afirmar.
