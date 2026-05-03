# TESTERS GOOGLE PLAY — Closed Testing Build 2

**Última actualización manual de Fernando:** 3-may-2026.

> **Password de todos los testers:** `AurexTest2026!` (estándar). NO se documenta en este archivo por regla de seguridad (`feedback_credenciales.md`); está implícita en operaciones de Code y conocida por Fernando + Escritorio.
> **Para crear nuevos testers en Supabase:** Code usa endpoint `POST /auth/v1/admin/users` con service key de `~/Downloads/SECRET KEY.txt`. Ver `feedback_autonomia.md` y `project_operativo.md`.

---

## ESTADO AL 3-MAY-2026

### Métricas Google Play Console

| Métrica | Al 1-may-2026 | Al 3-may-2026 |
|---|---|---|
| Descargas reportadas en Play Console | 11 | 15 |
| Testers contabilizados por Play Console | 12 | 12 |
| Día del closed testing | 7 | 9 |
| Plazo total (días requeridos por Google) | **VERIFICAR — Fernando reportó "17" para el 1-may y "14" para el 3-may** | — |
| Vencimiento estimado | ~9-may-2026 (si plazo = 14) | — |

> ⚠️ **Pendiente confirmar con Fernando:** discrepancia en plazo de Google Play closed testing reportado por él (¿14 o 17 días?). CONTEXTO.md actual dice 14. Si fuera 17, vence ~16-may.

### Listado completo de testers (16)

| # | Email | Tipo dispositivo | Versión instalada | Estado confirmación instalación | Notas |
|---|---|---|---|---|---|
| 1 | aurextester1@gmail.com | Emulador | Anterior a 1.5 | — | Cuenta de testing interno (no cuenta para los 12 requeridos por Google) |
| 2 | aurextest2@gmail.com | Emulador | Anterior a 1.5 | — | Cuenta de testing interno |
| 3 | aurextester12@gmail.com | Emulador | Anterior a 1.5 | — | Cuenta de testing interno (también usada como recovery email de `app.aurex@gmail.com`) |
| 4 | app.aurex@gmail.com | Emulador | Anterior a 1.5 | — | Cuenta de testing interno (también email principal del Paso CERO) |
| 5 | fmoscon@gmail.com | Emulador | Anterior a 1.5 | — | Cuenta de testing interno (también cuenta personal Fernando) |
| 6 | silvinamoscon@gmail.com | Android | 1.5 | ✅ CONFIRMADO | Real |
| 7 | martainesalvarez02@gmail.com | Android | 1.5 | ✅ CONFIRMADO | Real |
| 8 | miamoscon@gmail.com | Android | 1.5 | ✅ CONFIRMADO | Real |
| 9 | sol.esnoz@gmail.com | Android | 1.5 | ✅ CONFIRMADO | Real |
| 10 | mencochi27@gmail.com | Android | 1.5 | ✅ CONFIRMADO | Real |
| 11 | Vilogonzalo@gmail.com | Android | 1.5 | ✅ CONFIRMADO | Real |
| 12 | gusroma355@gmail.com / romanogustavoseba@gmail.com | Android | 1.5 | ✅ CONFIRMADO | Misma persona, dos mails |
| 13 | kellerlucasignacio@gmail.com | Android | 1.5 | ✅ CONFIRMADO | Real |
| 14 | lucaskellerok@gmail.com | Android | 1.5 | ⏳ PENDIENTE | Real, invitación enviada, sin confirmar instalación |
| 15 | facundo.fernandezrl@gmail.com | Android | 2.5 | ⏳ PENDIENTE | Real, invitación enviada |
| 16 | yoconfioenvos@gmail.com | Android | 2.5 | ⏳ PENDIENTE | Real, invitado el 3-may. UUID Supabase: `9d82566b-d19d-4a68-8aa2-1cc11754e14d` |
| 17 | francoduarte1998@gmail.com | Android | 2.5 | ⏳ PENDIENTE | Real, invitado el 3-may. UUID Supabase: `6e5af599-2146-4576-8274-a20929d5f47c` |

### Resumen estado de instalación

| Estado | Cuentas | Notas |
|---|---|---|
| **Emulador (testing interno)** | 5 | aurextester1, aurextest2, aurextester12, app.aurex, fmoscon |
| **Confirmado instalado en Android real** | 8 | silvinamoscon, martainesalvarez02, miamoscon, sol.esnoz, mencochi27, Vilogonzalo, gusroma355/romanogustavoseba, kellerlucasignacio |
| **Pendiente confirmar instalación** | 4 | lucaskellerok, facundo.fernandezrl, yoconfioenvos, francoduarte1998 |
| **TOTAL invitados a closed testing** | 16-17 (depende de cómo cuentan los 2 mails de gusroma) | |

> Los **12 testers que Google reporta en Play Console** corresponden a la suma de testers invitados, no necesariamente todos confirmados como instalados. Fernando hace seguimiento manual de quién instaló (columna "PENDIENTE" vs "CONFIRMADO").

---

## RIESGO ACTUAL Y MITIGACIÓN

**Vencimiento del closed testing:** ~9-may-2026 (asumiendo plazo 14 días) o ~16-may-2026 (si plazo es 17). **CONFIRMAR con Fernando.**

**Mínimo Google requerido:** 12 testers activos durante 14 días continuos.

**Riesgo:** si alguno de los 12 reportados en Play Console **desinstala antes del vencimiento**, Google puede no validar el closed testing y demorar la promoción a producción.

**Mitigación adoptada:** mantener invitaciones extra (4 pendientes al 3-may) como buffer. Si alguno de los confirmados desinstala, los 4 pendientes que terminen instalando lo compensan.

**Acción Fernando:** seguir invitando 1-2 testers más por día hasta vencimiento, sin pasar el límite de Google de 100 testers en closed testing.

---

## CÓMO CODE AGREGA UN NUEVO TESTER (referencia operativa)

Cuando Fernando dice "agrega `<email>` con contraseña de tester":

```bash
SERVICE_KEY="$(grep -oE 'sb_secret_[^ ]+' ~/Downloads/SECRET\ KEY.txt | head -1)"
curl -s -X POST "https://dklljnfhlzmfsfmxrpie.supabase.co/auth/v1/admin/users" \
  -H "Authorization: Bearer $SERVICE_KEY" \
  -H "apikey: $SERVICE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"email":"<EMAIL>","password":"AurexTest2026!","email_confirm":true}'
```

Devuelve `id` (UUID) que Code anota en este archivo.

**Después de crear en Supabase, Fernando agrega manualmente al tester en Google Play Console** (Internal/Closed testing → Testers → Email list).

---

*TESTERS_GOOGLE_PLAY.md — bitácora de testers reales y emuladores. Actualizar cada vez que se invita o se confirma instalación. Fuente de verdad para "cuántos testers reales tenemos hoy".*
