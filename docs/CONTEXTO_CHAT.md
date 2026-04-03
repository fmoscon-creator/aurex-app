# AUREX APP — CONTEXTO INICIAL DE CHAT
## Pegar al inicio de cada nueva conversacion con Claude

---

## IDENTIDAD
- **Desarrollador:** Fernando Moscon (fmoscon@gmail.com)
- **App:** AUREX — https://fmoscon-creator.github.io/aurex-app/
- **Repo:** https://github.com/fmoscon-creator/aurex-app
- **Token GitHub:** ghp_TU_TOKEN_AQUI
- **Supabase proyecto:** https://dklljnfhlzmfsfmxrpie.supabase.co
- **Idioma:** Responder SIEMPRE SOLO EN ESPANOL

---

## ESTADO DEL REPO — Abril 2026

| Archivo | SHA (blob) |
|---------|-----------|
| HEAD commit | 067abbc015b6935fa834477a10332bc630ca989e |
| index.html | 25a61c23761c6b615f4d6b9ababcc07ca28c04aa |
| aurex-features.js | 95c1525e9907adef1ae9c96589afed9cf271f331 |

- **index.html size:** 223.744 bytes (~198.000 chars UTF-8)
- **isLatam:** true hardcoded en aurex-features.js
- **Formato numeros:** coma decimal, punto miles — OK verificado en iPhone

---

## REGLAS TECNICAS — NUNCA VIOLAR

1. Todo HTML nuevo 100% ASCII — emojis como entidades HTML numericas
   (ej: `&#128247;`), tildes como entidades (`&#225;`=a, `&#233;`=e,
   `&#243;`=o, `&#237;`=i, `&#250;`=u, `&#241;`=n)
2. Leer blob de index.html SIEMPRE desde Git API (NO desde Pages)
3. Verificar que el string OLD aparece exactamente 1 vez antes de reemplazar
4. Usar SIEMPRE `split().join()` — NUNCA `replace()` con $ en segundo argumento
5. Verificar maxChar <= 127 en TODO el HTML nuevo antes de subir
6. index.html NO necesita cache buster
   (el Service Worker no cachea index.html, solo aurex-features.js)
7. Usar `btoa(unescape(encodeURIComponent(content)))` para base64 de contenido UTF-8

---

## FLUJO OBLIGATORIO POR CADA COMMIT

1. Leer blob API: `GET /git/blobs/{sha}`
2. Decodificar base64 en chunks de 50000 chars
3. Verificar OLD: `html.split(OLD).length - 1 === 1`
4. Construir NEW: verificar maxChar <= 127 y badChars === 0
5. Reemplazar: `html.split(OLD).join(NEW)`
6. Verificar resultado: OLD=0, NEW=1
7. Crear blob: `POST /git/blobs`
8. Crear tree: `POST /git/trees` con `base_tree: headSha`
9. Crear commit: `POST /git/commits`
10. Actualizar ref: `PATCH /git/refs/heads/main` con `force: true`
11. Esperar deploy (~60s) verificando con fetch a Pages con `cache:'no-store'`
12. Hard reload (`cmd+shift+r`) en el browser
13. Screenshot obligatorio en el chat
14. Esperar confirmacion de Fernando en iPhone

---

## REGLAS DE ORO

1. NUNCA tocar logica, colores ni estilos generales de index.html
   — solo el contenido del div correspondiente
2. Screenshot obligatorio en el chat antes de reportar cualquier cosa como OK
3. Un paso a la vez — confirmar en iPhone antes de pasar al siguiente
4. Informar SHA completo de cada commit en el chat
5. NUNCA poner tick verde si se ve mal en el browser
6. Responder SIEMPRE por escrito, detallado y ordenado, SOLO EN ESPANOL

---

## ARQUITECTURA DE LA APP

### Pantallas principales (tabs):
- Portfolio (`btn-portfolio`)
- Mercados (`btn-mercados`)
- Watchlist (`btn-watchlist`)
- IA (`btn-ia`)
- Alertas (`btn-alertas`)
- Perfil (`btn-perfil`)

### Auth:
- `auth-logged`: div visible cuando el usuario esta logueado (display:flex)
- `auth-form`: formulario de login/registro (visible cuando no logueado)
- `window._currentUser`: objeto de sesion Supabase del usuario activo
- `window._supabase`: cliente Supabase disponible globalmente
- `logoutUser()`: cierra sesion (definida en aurex-features.js)
- `updateUserUI(user)`: actualiza el DOM con datos del usuario

### IDs criticos del DOM (NO renombrar):
| ID | Uso |
|----|-----|
| auth-avatar-initial | Inicial del nombre en el avatar |
| auth-username-txt | Nombre del usuario |
| auth-email-txt | Email del usuario |
| auth-celular-txt | Display del celular (Bloque 1) |
| celular-input | Input hidden numero completo (Bloque 3) |
| celular-input-b6 | Input hidden numero completo (Bloque 6) |
| auth-msg | Mensajes de error/exito globales |
| auth-logged | Contenedor principal del perfil logueado |
| modal-planes | Modal de planes FREE/PRO/ELITE |

### Colores AUREX:
| Uso | Color |
|-----|-------|
| Dorado principal | #c9a84c / #D4A017 / #F7D060 |
| Fondo oscuro | #0D1117 / #161B22 / #0d0d1a |
| Texto secundario | #8B949E / #555 |
| PRO (violeta) | #A78BFA |
| Verde exito | #2ecc71 |
| Rojo error | #e74c3c |

---

## TAB PERFIL — ESTADO COMPLETADO

Los 9 bloques del acordeon estan implementados y confirmados en iPhone:

| Bloque | ID DOM | Estado |
|--------|--------|--------|
| 1 — Usuario | pac-b1 | Completo OK |
| 2 — Plan actual + Modal FREE/PRO/ELITE | pac-b2 | Completo OK |
| 3 — Mi Cuenta (nombre/email/cel/pwd) | pac-b3 | Completo OK |
| 4 — Preferencias (idioma/dark/Pulse) | pac-b4 | Completo OK |
| 5 — Seguridad (2FA SOON/biometrica SOON) | pac-b5 | Completo OK |
| 6 — Alertas (22 paises/toggles/leyenda) | pac-b6 | Completo OK |
| 7 — Notificaciones (4 toggles + hora) | pac-b7 | Completo OK |
| 8 — Soporte (FAQ/calificar/redes/version) | pac-b8 | Completo OK |
| 9 — Sesion (cerrar + eliminar cuenta) | pac-b9 | Completo OK |

**Documentacion completa:** docs/PERFIL_TAB_DOCUMENTACION.md

---

## SUPABASE — RECURSOS

- **URL proyecto:** https://dklljnfhlzmfsfmxrpie.supabase.co
- **Edge Function delete-account:**
  https://dklljnfhlzmfsfmxrpie.supabase.co/functions/v1/delete-account
  (elimina usuario usando service_role key — Apple App Store compliant)
- **Auth:** email/password via Supabase Auth
- **user_metadata campos:** nombre, celular

---

## PROXIMOS TEMAS PENDIENTES

(Desarrollar en chat nuevo: IOS_STORE_CHECKLIST)

1. Internacionalizacion (i18n) — traducir app al idioma seleccionado
2. Pagos in-app — StoreKit para planes PRO y ELITE (requerido Apple)
3. Notificaciones push reales — UNUserNotificationCenter + FCM/APNs
4. Politica de Privacidad — URL publica real
5. Terminos de Uso — URL publica real
6. Biometrica — NSFaceIDUsageDescription en Info.plist
7. Historial de accesos real en Supabase
8. Cambiar contrasena — verificar que pacSavePwd() funciona correctamente
9. Bloque 2 — flujo de pago real para planes PRO/ELITE

---

## ERRORES CONOCIDOS Y SUS FIXES (historial)

| Error | Fix aplicado |
|-------|-------------|
| Scripts inyectados dinamicamente no se ejecutan | Agregar window.xxx=xxx al final del script |
| regex malformado k.match(/'([^']+)')/) | Corregir a k.match(/'([^']+)'/) |
| pacSaveLang con textContent no decodifica entidades | Cambiar a innerHTML |
| ID duplicado celular-input en B3 y B6 | Renombrar B6 a celular-input-b6 |
| Header duplicado (aurex-hdr-added + hdr en auth-logged) | Quitar hdr del auth-logged |
| btoa falla con chars especiales UTF-8 | Usar btoa(unescape(encodeURIComponent(content))) |
| DOM con cache vieja post-deploy | Hard reload cmd+shift+r |

---

*Generado automaticamente — AUREX App — Abril 2026*
