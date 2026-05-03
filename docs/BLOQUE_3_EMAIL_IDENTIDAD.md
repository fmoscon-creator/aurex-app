# BLOQUE 3 — Email + identidad operativa

**Generado por Code el 3-may-2026.** Formaliza en archivo lo ya acordado en chat con Fernando + validado por Escritorio durante el cierre del Bloque 2.

---

## DECISIÓN ESTRUCTURAL — UN SOLO EMAIL PRINCIPAL

**Opción A elegida**: un único email para todas las cuentas de redes sociales y servicios del Paso CERO. Sin alias por canal en `aurex.live`.

**Razones documentadas:**

1. Vamos a abrir UNA cuenta por plataforma (no 8 cuentas por idioma como en plan inicial), por lo tanto NO hay conflicto de email único por plataforma.
2. Recovery, 2FA y login concentrados en una sola Gmail = menor superficie de error.
3. Alias por canal (`twitter@aurex.live`, `instagram@aurex.live`, etc.) son útiles solo si filtramos correos entrantes por canal — no es necesidad actual.
4. Si en algún momento futuro queremos alias profesionales (correos comerciales serios `business@aurex.live`), se agregan después con DNS Cloudflare. No son bloqueantes.

---

## CREDENCIALES Y RUTAS DE RECUPERACIÓN

### Email principal único

| Campo | Valor |
|---|---|
| Email | `app.aurex@gmail.com` |
| Estado | Cuenta YA EXISTE (creada por Fernando antes del Paso CERO) |
| Password | **Gestionado solo por Fernando**. NO se escribe por chat. NO se guarda en archivos del repo. NO se comparte con Code ni con Escritorio. Regla de seguridad reforzada el 2-may-2026 (memoria persistente `feedback_credenciales.md`) |
| Quién accede | Solo Fernando |
| 2FA habilitado | Por habilitar al iniciar Paso CERO Fase C (Google Authenticator) |

### Email de recuperación (decisión clave del Bloque 3)

| Campo | Valor |
|---|---|
| Email recovery | `aurextester12@gmail.com` |
| Estado | Cuenta YA EXISTE (creada antes para tema Google Play testers) |
| Password | `AurexTester2026!` (gestionado por Fernando, no operativo en automatizaciones) |
| Por qué esta cuenta y no `fmoscon@gmail.com` | **Aísla el grafo de Google**: Google internamente conecta cuentas que comparten recovery email. Si `app.aurex@gmail.com` recibe flag de "comportamiento sospechoso" (típico en cuentas business nuevas que arrancan publicando programáticamente), el riesgo NO se propaga a la cuenta personal `fmoscon@gmail.com`. Si Fernando tiene problemas con su cuenta personal, las cuentas AUREX siguen operativas e independientes. Práctica estándar de separación entre identidad personal y corporativa |

### Teléfonos de recuperación

| Tipo | Número | Notas técnicas |
|---|---|---|
| Recovery PRINCIPAL | `+54 9 11 3360 2563` | Línea AUREX, eSIM Claro, iPhone Fernando. Ya en uso vinculada a WhatsApp Business AUREX vía Evolution API. **Recibe SMS al iPhone Fernando** (la vinculación a WhatsApp Business no bloquea SMS estándar — son canales separados) |
| Recovery RESPALDO | `+54 11 6789-1320` | Línea personal Fernando. Usar SOLO si la 2563 no recibe el SMS de verificación específico de alguna plataforma |

### Aplicación Authenticator (2FA)

| Campo | Valor |
|---|---|
| App | Google Authenticator |
| Dispositivo | iPhone Fernando |
| Estado | **A INSTALAR** al iniciar Paso CERO Fase C (Pre-requisito 0.B en la guía) |
| Alternativa | Authy o 1Password Authenticator si Fernando los prefiere — funcionan igual con códigos TOTP |
| Por qué Authenticator y no SMS | Más confiable (no depende de cobertura celular ni de la línea estar activa) + más seguro (no susceptible a SIM swap) + estándar de la industria |

---

## RIESGOS POTENCIALES IDENTIFICADOS — CON MITIGACIÓN

| Riesgo | Probabilidad | Mitigación |
|---|---|---|
| **Línea 2563 no recibe SMS** porque está vinculada a WhatsApp Business vía Evolution API | Baja — los SMS estándar son separados del canal WhatsApp Business | Fallback a 1320 inmediato. Documentado en cada paso de la guía Fase C |
| **Plataforma rechaza el número 2563** porque detecta "uso comercial activo" en WhatsApp Business | Muy baja — Twitter/IG/TikTok/YouTube/LinkedIn no chequean si un número ya está en WhatsApp Business | Si rechaza alguna, fallback 1320 |
| **Google detecta `app.aurex@gmail.com` como cuenta nueva con actividad sospechosa** y suspende temporalmente | Media — típico en cuentas Gmail nuevas que arrancan publicando vía OAuth a múltiples servicios | Recovery `aurextester12@gmail.com` resuelve la suspensión sin enlazar a `fmoscon@gmail.com` |
| **Recovery email enlaza accounts en grafo Google** | RESUELTO al usar `aurextester12@gmail.com` en vez de personal | Decisión correcta del Bloque 3 |
| **Código de Authenticator inaccesible** si Fernando pierde el iPhone | Baja, pero importante | Al instalar Authenticator, Google muestra códigos de respaldo (8-10 códigos de 8 dígitos one-time use). Fernando los guarda en `~/Downloads/SECRET_RECOVERY_CODES.txt` (formato local, no commiteado) |

---

## POLÍTICA DE GESTIÓN DE CREDENCIALES — REGLA INVIOLABLE

Aplicación literal de la memoria `feedback_credenciales.md` (creada el 2-may-2026 tras incidente del password expuesto en commits previos):

1. **Passwords nunca por chat.** Code NO los lee, NO los repite, NO los escribe en archivos.
2. **Tokens de API por canal seguro:**
   - Vía 1: chat de Code → Code los pega en Railway env vars con `railway variables --set` desde valores que no permanecen.
   - Vía 2: Fernando los guarda en `~/Downloads/SECRETS_<SERVICIO>.txt` local → Code los lee con tool Read → Code los mueve a Railway → BORRA el archivo local. Patrón establecido en `feedback_autonomia.md`.
3. **Backup de códigos de respaldo Authenticator:** `~/Downloads/SECRET_RECOVERY_CODES.txt` local, NUNCA commiteado.
4. **Si por error algún password queda en repo (incluso borrado después)**: GitHub history lo expone — rotar inmediatamente.

---

## OUTPUT DEL BLOQUE 3

✅ **Decisión de email principal único confirmada**: `app.aurex@gmail.com`.
✅ **Decisión de recovery aislante confirmada**: `aurextester12@gmail.com` (no la personal de Fernando).
✅ **Decisión de teléfonos confirmada**: 2563 principal, 1320 respaldo.
✅ **Decisión de Authenticator (no SMS)** para 2FA.
✅ **Política de credenciales formalizada** con regla inviolable y dos vías seguras de transferencia de tokens.
✅ **Riesgos identificados con mitigación específica para cada uno**.

📌 **Acción concreta pre-Fase C** (Fernando):
- Instalar Google Authenticator en iPhone (5 min).
- Confirmar que `app.aurex@gmail.com` tiene password seteado (lo sabe solo Fernando).
- Confirmar que `aurextester12@gmail.com` está accesible y operativa (con su password `AurexTester2026!`).

---

*BLOQUE_3_EMAIL_IDENTIDAD.md — Bloque 3 cerrado el 3-may-2026. Próximo: Bloque 4 (assets visuales por plataforma) — investigación de dimensiones específicas por canal y inventario de assets disponibles en Drive AUREX_MEDIA_LIBRARY vs faltantes.*
