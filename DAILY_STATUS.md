# DAILY_STATUS — AUREX

**Última actualización manual:** 2 de Mayo de 2026 ~18:30 AR (cierre de sesión nocturna).

> Archivo de bitácora viva con pendientes para mañana y siguientes. NO confundir con el reporte automático que genera `dailyProjectStatusReport()` cada día a las 9:00 AR (ese se genera en runtime con datos vivos de stores, repos e incidentes — leer `aurex-backend/server.js:1737` para detalle).

---

## CIERRE DE SESIÓN — 2 de Mayo de 2026

### Lo que se resolvió HOY

1. **TG-001 RESUELTO** (incidente Telegram que abrió ayer). Causa raíz: `polling: true` peleando con polling fantasma post-restart Railway. Fix `polling: false` aplicado en `aurex-backend` commit `f87fc6d`, deploy SUCCESS, verificación post-fix OK con los 5 mensajes llegando al chat 1749518554 a las 18:17 AR. **El test real es mañana 9:00 AR**: si el reporte llega normal por Telegram + WhatsApp como siempre, TG-001 queda definitivamente cerrado.

2. **PLAN_MKT v3.0 publicado** (commit `e86959b`) alineado con `AUREX_DEFINICION_ESTRATEGICA.md` (los 9 puntos aprobados por Fernando el 2-may).

3. **Revisión cruzada Escritorio del v3.0** completada: 7 observaciones A-G + mejoras narrativas + pieza nueva #31 (retención FREE→PRO) + observación G crítica sobre horarios (que Escritorio NO había pensado, levantada por Fernando). **Decisión clave**: pausar la pulida teórica del v3.1 y avanzar con el **Paso CERO real (apertura de cuentas)** primero.

4. **Paso CERO — Bloque 1 cerrado y aprobado** (`docs/BIOS_PUBLICAS_AUREX.md` v2, commit `5fac759`).
    - Bios EN + ES alineadas con Build 17 (lenguaje seguro: "tracker", sin "AI signals", sin "investing").
    - Sugerencia Escritorio aplicada: `statistical probabilities` → `data-driven view` (elimina ambigüedad regulatoria).
    - Disclaimer en 3 capas: `Not a broker. Not advice. Not a buy/sell platform.`
    - Categorías Business sin "Financial Services" en ninguna plataforma.

5. **Bloque 1 extendido — Traducciones a 6 idiomas** (`docs/BIOS_TRADUCIDAS_6_IDIOMAS.md`, commit `8d75cad`).
    - PT brasilero, ZH simplificado, FR internacional, IT estándar, HI con anglicismos comunes en finanzas indias, AR estándar moderno (MSA).
    - **Aprobadas por Escritorio**: PT, FR, IT.
    - **Pasan a validación post-publicación por engagement**: ZH, HI, AR.

6. **Paso CERO — Bloque 2 cerrado y aprobado** (`docs/BLOQUE_2_DISPONIBILIDAD_NOMBRES.md` v3, commit `b781290`).
    - **Display Name único en todas las plataformas: `AUREX`** (sin sufijo).
    - **Handle técnico — estrategia escalonada**: probar `aurex` primero en formulario en vivo, fallback `aurex_ai` confirmado FREE en YouTube + Telegram.
    - Hallazgo crítico tras corrección metodológica: **`aurex` está TAKEN en Telegram** (cuenta personal de un usuario "Aurelio"). Bug previo del chequeo (grep "If you have Telegram" solo capturaba canales). Método correcto: detectar div `tgme_page_title`.
    - Twitter/IG/TikTok: pendiente verificación en formulario en vivo durante Fase C.

7. **Memoria persistente actualizada**: nuevo archivo `feedback_credenciales.md` (regla: nunca pedir/aceptar passwords por chat ni en archivos del repo). Backup espejo OK.

8. **Aprobación de Fernando + Escritorio del método del Paso CERO**: 3 fases (A análisis previo en 8 bloques → B revisión cruzada → C guía de ejecución sobre infraestructura real). Bloques 1 y 2 cerrados, faltan 6 más antes de la guía detallada.

---

## PENDIENTES PARA MAÑANA 3 DE MAYO 2026

### 1. CRÍTICO — verificar reporte Telegram 9:00 AR (test real TG-001)

**Esperado:** mañana 3-may a las 9:00 AR debe llegar el reporte `dailyProjectStatusReport` por **Telegram** + **WhatsApp 1320** simultáneamente, sin intervención manual.

**Si llega por ambos canales:** TG-001 confirmado definitivamente cerrado. Anotar en CONTEXTO.md.

**Si NO llega por Telegram:** abrir investigación profunda. Revisar logs Railway (`railway logs --service aurex-app`) específicamente entre 11:55-12:05 UTC. Posibles causas alternativas (no relacionadas a polling): cambio en `buildDailyStatus()`, env var perdida, restart Railway en ventana del cron.

### 2. Bloque 2 — verificación final pendiente (NO bloquea Bloque 3)

- Confirmar en formulario de signup en vivo (cuando Fernando ejecute Fase C) si `@aurex` está libre en Twitter/X, Instagram, TikTok. Si SÍ está libre en alguna, usarlo en esa plataforma. Si no, fallback `aurex_ai`.
- LinkedIn Company Page: chequear URL slug `linkedin.com/company/aurex` en el formulario.

### 3. Bloques 3, 4, 5, 6, 7, 8 del Paso CERO — pendientes ejecución

| # | Bloque | Output esperado | Estimado |
|---|---|---|---|
| 3 | Email + identidad operativa | Formalizar en archivo lo ya acordado en chat (email único `app.aurex@gmail.com`, recovery `aurextester12@gmail.com`, teléfonos, Authenticator). Ya está ~80% resuelto | 30 min Code |
| 4 | Assets visuales por plataforma | Listar dimensiones específicas por canal (Twitter 400×400 + 1500×500, IG 320×320, YouTube 800×800 + 2560×1440, LinkedIn 300×300 + 1128×191, TikTok 200×200), revisar qué assets están en Drive AUREX_MEDIA_LIBRARY y cuáles faltan, formato PNG/JPG | 1-2 hs Code |
| 5 | Riesgos de apertura + mitigaciones | Warm-up de cuentas nuevas, línea 2563 ya en WhatsApp Business, geolocalización IP argentina, recovery email enlazando accounts | 1 hs Code + revisión Escritorio |
| 6 | Disclaimer regulatorio en bios | Ya integrado en Bloque 1, formalizar coherencia | 15 min Code |
| 7 | Costos cero confirmados hasta approval stores | Lista exhaustiva de servicios | 30 min Code |
| 8 | Orden de apertura por dependencias técnicas | Twitter primero (define patrón en vivo), Facebook Page antes que Instagram Business, etc. | 30 min Code |

**Tras los 6 bloques:** consolidación + pase a Escritorio (Fase B) + escritura de guía detallada (Fase C) → ejecución de Fernando con asistencia Escritorio en línea (~3-4 horas).

### 4. Plan MKT v3.0 — observaciones A-G de Escritorio + #31 + #32

Pendientes de aplicar al PLAN_MKT.md como v3.1 una vez completado el Paso CERO real:
- A: pieza #19 AUREX vs Bloomberg — versión blog Mes 1 Semana 2, versión LinkedIn carrousel + IG Fase 3.
- B: programa referidos unificado a "7 días activo" en sección 2.6 y Canal 11.
- C: cascada de fallback ampliada para viernes sin Alta Convicción IA (8 niveles según las features de la app).
- D: criterios numéricos de salida Fase 1 → Fase 2 (4 condiciones).
- E: estructura `signal_history` Supabase definida con campos.
- F: política PWA aurex.live como destino único si stores demoran >2 semanas.
- G (Fernando): localización temporal por cuenta de idioma (RECHAZAR doble publicación de Escritorio); UNA cuenta por canal con publicación EN+ES en mismo post.
- #31: pieza nueva retención FREE→PRO por comportamiento.
- #32: waitlist pre-lanzamiento `aurex.live/waitlist` estilo Robinhood.

### 5. CRÍTICO — Google Play Closed Testing al límite

- **Día 8 de 14 al 2-may-2026.**
- Vencimiento prueba cerrada: ~9 mayo 2026.
- 12 testers activos (mínimo Google requiere 12).
- **Decisión pendiente para mañana:** evaluar si se agregan 1-2 testers extra como buffer antes del vencimiento. Si los 12 actuales se mantienen activos hasta el día 14, suficiente. Si alguno desinstala, riesgo de no cumplir requerimiento.

### 6. Apple Build 17 — sin novedades

- **Día 9 en revisión** (submit 24-abr-2026 5:24 AM AR).
- Apple decide. Sin acción técnica de nuestra parte mientras esté en revisión.

### 7. 5 pendientes técnicos post-aprobación stores (anotados antes)

1. Backend `activos.json`: agregar las 25 acciones europeas para que tengan señal IA propia.
2. Nativa `AurexApp/src/lib/assets.js`: sincronizar 19 → 25 europeas.
3. ✓ RESUELTO Macro/Geo Pulse CRIPTO (commits `af8e412` backend / `7df526d` PWA / `072e492` nativa).
4. Push notifications reales VAPID/FCM/APNS (1 semana Code, post-aprobación stores).
5. Features ELITE construidas en branch `feature/elite-build` (mergear post-aprobación) — API personal + chat Tawk.to + acceso beta toggle + dashboard UI.

---

## CRONS Y AUTOMATIZACIONES VIVOS

| Cron | Schedule UTC | Schedule AR | Estado |
|---|---|---|---|
| `dailyHealthReport` (8:00 AR) | `0 11 * * *` | 8:00 | Telegram + WhatsApp 1320 — verificado 1-may + 2-may |
| `dailyProjectStatusReport` (9:00 AR) | `0 12 * * *` | 9:00 | Telegram + WhatsApp 1320 — **mañana 3-may es el test post-fix TG-001** |
| `monthlyHealthReport` | `0 21 28-31 * *` | 18:00 fin de mes | Operativo |
| `healthCheck` (cada 5 min) | `*/5 * * * *` | continuo | Operativo |
| `calcularSenalesIA` (cada 5 min) | `*/5 * * * *` | continuo | 350 activos |
| `calcularPulse` (cada 5 min) | `*/5 * * * *` | continuo | Operativo |
| `refreshCryptoCache` (cada 2 min) | `*/2 * * * *` | continuo | Fallback CryptoCompare via BN-002 mitigación |
| `checkAlertas` (cada 30 seg) | `*/30 * * * * *` | continuo | Operativo |

---

## REGLAS VIGENTES

- **NO TOCAR código nativo (AurexApp/main)** mientras Build 17 está en revisión Apple. Branch `dev` y branch `feature/elite-build` SI se pueden tocar.
- **NO TOCAR metadata App Store / Google Play Console** mientras builds están en revisión.
- **PWA (aurex-app) y backend (aurex-backend) son INDEPENDIENTES** — modificarlos NO afecta revisión Apple/Google.
- **NUNCA `railway up`** (rompe deploy Nixpacks). Siempre push a GitHub main.
- **NUNCA passwords ni tokens en chat ni en archivos del repo** (regla nueva 2-may, ver `feedback_credenciales.md` en memoria persistente).
- **Antes de planear marketing teórico**: hacer Paso CERO real primero. Decisión 2-may.

---

*DAILY_STATUS.md — generado por Code el 2-may-2026 al cierre de sesión. Mañana al iniciar nueva sesión, leer este archivo + CONTEXTO.md para reanudar con todo el contexto.*
