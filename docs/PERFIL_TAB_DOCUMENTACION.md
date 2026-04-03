# AUREX APP — TAB PERFIL: DOCUMENTACION COMPLETA
## 9 Bloques del Acordeon — Funciones, Herramientas y Commits

**Aplicacion:** https://fmoscon-creator.github.io/aurex-app/
**Repositorio:** https://github.com/fmoscon-creator/aurex-app
**Fecha de documentacion:** Abril 2026
**HEAD commit final:** 9846297aea9fc15a258986076952d750d645a7d5

---

## HISTORIAL DE COMMITS — Tab Perfil

| # | SHA | Descripcion |
|---|-----|-------------|
| 1 | 532679d86c236a5197f73baa820390c4de17bb15 | Paso 0: auth-logged header + 9 bloques acordeon vacios |
| 2 | 0ad313b167df995cfc21f3b71a34b2fc10770d05 | Paso 0 fix: quitar header duplicado del auth-logged |
| 3 | b5156b4e96624aba47d660a5fa0e89e4d150e58b | Paso 1: Bloques 1+2 — Usuario + Plan actual |
| 4 | 279bc07b3796a697ca772b3cc3b4d8e83547afd1 | Paso 2: Modal planes FREE/PRO/ELITE + fix espacio vacio |
| 5 | d96aa8bd17afb47d8dc0ad555b0eca2b1d7af178 | Paso 3: Bloques 3+4 — Mi Cuenta + Preferencias |
| 6 | 873decdb3eca1a48949666cf94ef200be3b8a220 | Fix: idioma select 8 opciones + AUREX Pulse ON por defecto |
| 7 | 39f2651e3980e205d29b60b3f8447afb37bf08f6 | Fix: pacSaveLang innerHTML para entidades HTML |
| 8 | 7639f1330d4836693d5fd8dcbdbb885e4055af5f | Paso 4: Bloques 5+6 — Seguridad + Alertas |
| 9 | c2afff58e657aa72146284e50fefc82b2fb274ca | Fix: celular-input-b6 dedup + authSaveCelularB6 |
| 10 | 29b6382445f634f3176f4b46f065e618394db111 | Fix acordeon window scope + prefijo tel con banderas Mi Cuenta |
| 11 | 99ecc60847dabb206c0ffa449859e515650a512f | Fix regex malformado en pacAlerta |
| 12 | bfe0fb81fac687e99ec16e7008a30990d3f78d12 | Alertas: 22 paises con banderas + leyenda + toggle cel + variacion |
| 13 | 1e5ebbe9f80e28e619de2da4e0154d976839f7a4 | Paso 4: Bloques 7+8 — Notificaciones + Soporte |
| 14 | 9846297aea9fc15a258986076952d750d645a7d5 | Paso 5: Bloque 9 — Sesion + Edge Function delete-account |

---

## ARQUITECTURA GENERAL

La Tab Perfil se implementa dentro del div `auth-logged` en index.html.
Solo es visible cuando el usuario esta autenticado (display:flex).
Utiliza un acordeon de 9 bloques con clase `pac-bloque`, cada uno con:
- `pac-titulo`: header clickeable que llama a `pacToggle(id)`
- `pac-cuerpo`: contenido que se muestra/oculta con la clase `abierto`

Todas las funciones JS estan definidas en el script inline del auth-logged
y expuestas al window global mediante `window.xxx = xxx` para que los
onclick del HTML puedan invocarlas correctamente.

**Supabase Edge Function deployada:**
- Nombre: delete-account
- URL: https://dklljnfhlzmfsfmxrpie.supabase.co/functions/v1/delete-account
- Funcion: eliminar cuenta de usuario usando service_role key (nunca expuesta al frontend)

---

## BLOQUE 1 — USUARIO
**ID DOM:** pac-b1
**Funcion JS de init:** ninguna (se carga con updateUserUI al login)

### Contenido y funciones:
- **Avatar con inicial:** circulo dorado con la primera letra del nombre del usuario.
  Se actualiza via `auth-avatar-initial` que es seteado por `updateUserUI(user)`
  definida en aurex-features.js.
- **Nombre de usuario:** texto debajo del avatar, ID `auth-username-txt`.
- **Email:** debajo del nombre, ID `auth-email-txt`.
- **Numero de celular:** muestra el celular guardado en Supabase (user_metadata.celular),
  ID `auth-celular-txt`. Se actualiza al guardar desde Mi Cuenta o desde Alertas.

### Datos mostrados:
Todos los datos se obtienen de `window._currentUser` (objeto de sesion de Supabase)
y de `user.user_metadata` donde se guarda el nombre y el celular.

---

## BLOQUE 2 — PLAN ACTUAL
**ID DOM:** pac-b2
**Funcion JS:** `abrirModalPlanes()`, `cerrarModalPlanes()`, `planTab(p)`

### Contenido y funciones:
- **Card del plan activo:** muestra el nombre del plan (FREE / PRO / ELITE),
  su descripcion de features y el color correspondiente:
  - FREE: dorado #D4A017
  - PRO: violeta #A78BFA
  - ELITE: dorado premium #c9a84c
- **Boton "Ver planes y ventajas":** abre el modal de planes.

### Modal de planes (id: modal-planes):
- **3 tabs:** FREE | PRO | ELITE con selector de color por plan.
- **Tab FREE:** 5 activos, 3 senales IA/dia, AUREX Pulse basico.
- **Tab PRO:** 20 activos, senales ilimitadas, AUREX Pulse completo con variables,
  alertas push.
- **Tab ELITE:** activos ilimitados, senales ilimitadas, AUREX Pulse avanzado con
  explicacion, alertas SMS/WhatsApp/Telegram (badge SOON), soporte prioritario.
- **Boton "Elegir plan":** llama a `obSelectPlan(p)` (funcion existente en aurex-features.js)
  que redirige al flujo de onboarding/pago.

**NOTA IMPORTANTE para App Store:** los pagos in-app deben implementarse
via StoreKit (Apple In-App Purchase). Ver documento IOS_STORE_CHECKLIST.md.

---

## BLOQUE 3 — MI CUENTA
**ID DOM:** pac-b3
**Funcion JS de init:** `pacInitCuenta()` — llamada al abrir el bloque
**Funciones:** `pacSaveNombre()`, `authSaveCelular()`, `pacSavePwd()`,
`pacUpdateCelPrefix()`, `pacInitCelPrefix()`

### Campos y funciones:

**Nombre:**
- Input ID `input-nombre`, se precarga con `user_metadata.nombre` o prefijo del email.
- Boton Guardar llama a `pacSaveNombre()` que actualiza `user_metadata.nombre`
  en Supabase via `window._supabase.auth.updateUser()`.

**Email:**
- Muestra el email del usuario (ID `cuenta-email-txt`). Es de solo lectura.
- Subtexto: "El email no se puede modificar".

**Telefono con selector de pais:**
- `celular-input` (hidden): almacena el numero completo con prefijo (ej: +54 9 11 1234-5678).
- `cel-prefix-sel`: selector con 22 paises y sus banderas como entidades HTML.
- `cel-num-input`: input visible para el numero local sin prefijo.
- `pacUpdateCelPrefix()`: combina prefijo + numero y actualiza `celular-input`.
- `pacInitCelPrefix()`: al abrir el bloque, detecta el prefijo del numero guardado
  y precarga el select y el input correctamente.
- Boton Guardar llama a `authSaveCelular()` (aurex-features.js) que guarda en
  `user_metadata.celular` en Supabase.

**22 paises disponibles con banderas:**
Argentina (+54), USA/Canada (+1), Mexico (+52), Brasil (+55), Colombia (+57),
Chile (+56), Peru (+51), Venezuela (+58), Uruguay (+598), Paraguay (+595),
Espana (+34), UK (+44), Francia (+33), Italia (+39), Alemania (+49),
Arabia Saudita (+966), Emiratos Arabes (+971), Egipto (+20),
China (+86), India (+91), Japon (+81), Taiwan (+886).

**Contrasena:**
- Dos inputs: "Nueva contrasena" y "Repetir contrasena".
- Boton "Cambiar contrasena" llama a `pacSavePwd()` que valida que ambos
  campos coincidan y llama a `window._supabase.auth.updateUser({password})`.
- Validacion: minimo 6 caracteres, deben coincidir.

---

## BLOQUE 4 — PREFERENCIAS
**ID DOM:** pac-b4
**Funciones:** `pacTogglePulse()`, `pacSaveLang(val)`, `pacInitLang()`

### Contenido y funciones:

**Modo oscuro:**
- Toggle visual (ON por defecto, app siempre en dark mode).
- Decorativo en la version actual — la app es 100% dark mode.

**Idioma:**
- Selector nativo `<select>` con 8 idiomas.
- Etiqueta del idioma seleccionado se muestra via `pacSaveLang(val)`.
- Usa `innerHTML` para renderizar correctamente las entidades HTML de los nombres.
- Los 8 idiomas disponibles: Espanol ARG, Ingles, Portugues Brasil, Frances,
  Italiano, Chino Mandarin, Hindi, Arabe.
- La seleccion se guarda en `localStorage` key `aurex_lang`.
- `pacInitLang()` precarga el idioma guardado al abrir el bloque.

**NOTA:** La internacionalizacion completa (traduccion de toda la app al idioma
seleccionado) es una tarea pendiente de alto impacto. Ver IOS_STORE_CHECKLIST.md.

**AUREX Pulse:**
- Toggle ON por defecto (activado al cargar).
- Activa/desactiva la visualizacion del indicador AUREX Pulse en la tab Mercados.
- Estado guardado en `localStorage` key `aurex_pulse_on`.
- `pacTogglePulse()` invierte el estado y persiste en localStorage.

---

## BLOQUE 5 — SEGURIDAD
**ID DOM:** pac-b5
**Funcion JS de init:** `pacInitSeg()`

### Contenido y funciones:

**Autenticacion en 2 pasos (2FA):**
- Toggle gris con badge "SOON". No funcional todavia.
- Pendiente de implementacion con Supabase MFA (TOTP).

**Acceso biometrico (Face ID / Touch ID):**
- Toggle gris con badge "SOON". No funcional todavia.
- Requiere `NSFaceIDUsageDescription` en Info.plist al implementar.

**Sesion activa:**
- Card que muestra el dispositivo detectado via `navigator.userAgent`.
- Punto verde indicando sesion activa.
- `pacInitSeg()` detecta si es iPhone, Android, Mac, Windows, etc.
  y muestra el nombre del dispositivo correctamente.

**Ultimos accesos:**
- Lista de 3 entradas generadas automaticamente con fechas/horas
  recientes (simuladas) mostrando el dispositivo y la ciudad.
- En version futura: se conectara a una tabla de Supabase con logs reales.

---

## BLOQUE 6 — ALERTAS
**ID DOM:** pac-b6
**Funcion JS de init:** `pacInitAlertas()`
**Funciones:** `pacAlerta(el, key)`, `authSaveCelularB6()`,
`syncCelularB6()`, `pacUpdateCelB6()`, `pacInitCelB6()`

### Contenido y funciones:

**Leyenda superior:**
- Card dorada con texto: "TU NUMERO, TUS ALERTAS AL INSTANTE —
  AUREX te avisa directo a tu celefono cuando el mercado se mueve. Sin delays."

**Toggle "Recibir alertas en este numero":**
- Activa/desactiva globalmente el envio de alertas al celular registrado.
- Estado guardado en localStorage key `alerta_cel_activo`.

**Selector de telefono con banderas:**
- Mismo sistema que Mi Cuenta: 22 paises, `cel-prefix-b6` + `cel-num-b6` + `celular-input-b6`.
- `pacInitCelB6()`: precarga el numero guardado separando prefijo y numero local.
- `pacUpdateCelB6()`: combina prefijo + numero en `celular-input-b6`.
- `authSaveCelularB6()`: guarda en Supabase `user_metadata.celular` y sincroniza
  con el display del Bloque 1 y el input del Bloque 3.

**4 toggles de tipos de alerta (ON por defecto):**
1. Precio objetivo (key: alerta_precio) — cuando un activo alcanza el precio target.
2. Senal IA (key: alerta_ia) — nueva senal de compra o venta generada por la IA.
3. Variacion brusca (key: alerta_variacion) — sube o baja mas del 5% en 24hs el portafolio.
4. AUREX Pulse extremo (key: alerta_pulse) — cuando Pulse supera zona de riesgo critica.

Todos persisten en localStorage individualmente.
`pacInitAlertas()` inicializa todos los toggles desde localStorage al abrir el bloque.

**Banner informativo:**
- "Las alertas push requieren plan PRO o ELITE" — visible para usuarios FREE.

**NOTA para implementacion futura:** las alertas push reales requieren
integracion con un servicio de push notifications (FCM/APNs) y el permiso
nativo del sistema iOS via `UNUserNotificationCenter.requestAuthorization`.

---

## BLOQUE 7 — NOTIFICACIONES
**ID DOM:** pac-b7
**Funcion JS de init:** `pacInitNotif()`
**Funciones:** `pacNotif(el, key)`, `pacSaveHora()`

### Contenido y funciones:

**4 toggles de notificaciones (ON por defecto):**
1. Notificaciones push (key: notif_push) — activa todas las notificaciones.
2. Resumen diario (key: notif_resumen) — recibe un resumen del portafolio.
3. Newsletter semanal (key: notif_newsletter) — analisis y novedades cada semana.
4. Novedades AUREX (key: notif_novedades) — updates y nuevas funciones de la app.

**Selector de hora del resumen diario:**
- Input `<input type="time">` con valor default 08:00.
- `pacSaveHora()`: guarda la hora en localStorage key `notif_hora`.
- `pacInitNotif()`: precarga la hora guardada al abrir el bloque.

Todos los estados de toggle persisten en localStorage individualmente.

---

## BLOQUE 8 — SOPORTE
**ID DOM:** pac-b8
**Funciones:** `pacAbrirFaq()`, `pacCalificar()`, `pacContacto()`,
`pacRed(r)`, `pacLegal(t)`

### Contenido y funciones:

**Centro de ayuda:**
- Boton con flecha (>) que llama a `pacAbrirFaq()`.
- Muestra mensaje "Seccion FAQ proximamente" en auth-msg.
- En version futura: abre una pagina/modal con preguntas frecuentes.

**Califica AUREX:**
- Boton que llama a `pacCalificar()`.
- Muestra "Gracias por calificar AUREX!" en auth-msg.
- En version futura: redirige a la App Store para calificar.

**Contactar soporte:**
- Boton que llama a `pacContacto()`.
- Ejecuta `window.location.href = 'mailto:soporte@aurexapp.com'`.
- Abre el cliente de email del dispositivo con el mail de soporte precargado.

**Siguenos — Redes sociales:**
- 3 botones: Instagram, X/Twitter, YouTube.
- `pacRed('ig')`: abre https://instagram.com/aurexapp en nueva tab.
- `pacRed('tw')`: abre https://x.com/aurexapp en nueva tab.
- `pacRed('yt')`: abre https://youtube.com/@aurexapp en nueva tab.

**Version de la app:**
- Muestra "AUREX v1.0.0" con emoji de estrella.
- En version futura: leer version desde un archivo de configuracion.

**Links legales:**
- Terminos de uso: `pacLegal('terminos')` — muestra "Terminos proximamente".
- Politica de privacidad: `pacLegal('privacidad')` — muestra "Politica proximamente".

**CRITICO para App Store:** se deben crear las paginas reales de
Terminos de Uso y Politica de Privacidad con URLs publicas antes del envio a Apple.
Ver IOS_STORE_CHECKLIST.md.

---

## BLOQUE 9 — SESION
**ID DOM:** pac-b9
**Funciones:** `pacCerrarSesion()`, `pacMostrarConfElim()`,
`pacCancelarElim()`, `pacCheckElimEmail()`, `pacEliminarCuenta()`

### Contenido y funciones:

**Cerrar sesion:**
- Boton principal que llama a `pacCerrarSesion()`.
- Internamente llama a `logoutUser()` definida en aurex-features.js.
- Cierra la sesion en Supabase, limpia el estado local y vuelve a la pantalla de login.
- Subtexto: "Vas a salir de tu cuenta en este dispositivo."

**Zona de peligro — Eliminar cuenta:**
- Seccion con borde rojo y titulo "ZONA DE PELIGRO" en rojo.
- Advertencia: "Eliminar tu cuenta es una accion irreversible. Se borraran
  todos tus datos, portafolio y configuracion."
- Boton "Eliminar mi cuenta" (rojo, outline).

**Flujo de confirmacion (Apple App Store compliant):**
Al hacer click en "Eliminar mi cuenta":
1. El boton desaparece y aparece el panel de confirmacion.
2. Se muestra un input de email con borde rojo.
3. El usuario debe escribir su email EXACTO para habilitar el boton de confirmacion.
4. `pacCheckElimEmail()`: compara el input con `window._currentUser.email`
   en tiempo real. El boton "Confirmar eliminacion" solo se habilita si coinciden.
5. Al confirmar, `pacEliminarCuenta()`:
   a. Deshabilita el boton y muestra "Eliminando...".
   b. Obtiene el access_token de la sesion actual via `window._supabase.auth.getSession()`.
   c. Llama a la Supabase Edge Function `delete-account` con el token en el header.
   d. La Edge Function usa la service_role key (SERVER SIDE) para ejecutar
      `supabaseAdmin.auth.admin.deleteUser(user.id)` de forma segura.
   e. Si exito: muestra "Cuenta eliminada. Hasta pronto." y ejecuta `logoutUser()`.
   f. Si error: muestra el mensaje de error y re-habilita el boton.
6. Boton "Cancelar": llama a `pacCancelarElim()` que oculta el panel,
   muestra el boton original y limpia el input.

**Cumplimiento Apple App Store Review Guideline 5.1.1:**
Esta implementacion cumple completamente con el requisito de Apple que exige
que toda app con sistema de cuentas ofrezca eliminacion de cuenta desde dentro
de la app de forma funcional.

---

## IDs CRITICOS DEL DOM

Estos IDs son utilizados por `updateUserUI(user)` en aurex-features.js
y deben existir siempre dentro de auth-logged:

| ID | Uso |
|----|-----|
| auth-avatar-initial | Inicial del nombre en el avatar |
| auth-username-txt | Nombre del usuario |
| auth-email-txt | Email del usuario |
| auth-celular-txt | Display del celular (Bloque 1) |
| celular-input | Input hidden con numero completo (Bloque 3) |
| cel-prefix-sel | Select de pais/prefijo (Bloque 3) |
| cel-num-input | Input numero local (Bloque 3) |
| celular-input-b6 | Input hidden con numero completo (Bloque 6) |
| cel-prefix-b6 | Select de pais/prefijo (Bloque 6) |
| cel-num-b6 | Input numero local (Bloque 6) |
| cel-txt-b6 | Display del celular guardado (Bloque 6) |
| auth-msg | Mensajes de error/exito globales |
| auth-logged | Contenedor principal (display:flex cuando logueado) |
| modal-planes | Modal de planes FREE/PRO/ELITE |
| elim-confirm-panel | Panel de confirmacion de eliminacion de cuenta |
| btn-confirmar-elim | Boton de confirmacion (disabled hasta email correcto) |

---

## FUNCIONES JS GLOBALES — TABLA COMPLETA

| Funcion | Bloque | Descripcion |
|---------|--------|-------------|
| pacToggle(id) | General | Toggle abierto/cerrado de cualquier bloque |
| abrirModalPlanes() | B2 | Abre el modal de planes |
| cerrarModalPlanes() | B2 | Cierra el modal de planes |
| planTab(p) | B2 | Cambia el tab activo del modal (FREE/PRO/ELITE) |
| pacInitCuenta() | B3 | Precarga nombre, email, celular al abrir B3 |
| pacSaveNombre() | B3 | Guarda nombre en Supabase user_metadata |
| pacSavePwd() | B3 | Cambia contrasena en Supabase auth |
| pacUpdateCelPrefix() | B3 | Combina prefijo+numero en celular-input |
| pacInitCelPrefix() | B3 | Precarga el select de pais desde el numero guardado |
| pacTogglePulse() | B4 | Toggle AUREX Pulse, persiste en localStorage |
| pacSaveLang(val) | B4 | Guarda idioma seleccionado en localStorage |
| pacInitLang() | B4 | Precarga idioma guardado al abrir B4 |
| pacAlerta(el,key) | B6 | Toggle de alerta individual con persistencia |
| pacInitAlertas() | B6 | Inicializa todos los toggles + precarga celular |
| authSaveCelularB6() | B6 | Guarda celular en Supabase desde Bloque 6 |
| syncCelularB6() | B6 | Sincroniza display del celular en Bloque 6 |
| pacUpdateCelB6() | B6 | Combina prefijo+numero en celular-input-b6 |
| pacInitCelB6() | B6 | Precarga select de pais desde numero guardado B6 |
| pacInitSeg() | B5 | Detecta dispositivo, muestra sesion activa |
| pacNotif(el,key) | B7 | Toggle de notificacion individual |
| pacSaveHora() | B7 | Guarda hora del resumen diario |
| pacInitNotif() | B7 | Inicializa toggles y hora al abrir B7 |
| pacAbrirFaq() | B8 | Muestra mensaje FAQ proximamente |
| pacCalificar() | B8 | Muestra mensaje de agradecimiento |
| pacContacto() | B8 | Abre mailto:soporte@aurexapp.com |
| pacRed(r) | B8 | Abre red social en nueva tab |
| pacLegal(t) | B8 | Muestra mensaje legal proximamente |
| pacCerrarSesion() | B9 | Llama a logoutUser() |
| pacMostrarConfElim() | B9 | Muestra panel de confirmacion de eliminacion |
| pacCancelarElim() | B9 | Oculta panel, restaura boton original |
| pacCheckElimEmail() | B9 | Valida email en tiempo real, habilita boton |
| pacEliminarCuenta() | B9 | Llama Edge Function delete-account, luego logout |

---

## PENDIENTES Y PROXIMOS PASOS

Ver documento IOS_STORE_CHECKLIST.md para el analisis completo.
Los items mas criticos son:

1. Internacionalizacion (i18n) — traducir la app al idioma seleccionado en Preferencias.
2. Pagos in-app — implementar StoreKit para planes PRO y ELITE (requerido por Apple).
3. Notificaciones push reales — UNUserNotificationCenter + FCM/APNs.
4. Politica de Privacidad — URL publica real (requerido por Apple para publicar).
5. Terminos de Uso — URL publica real (requerido por Apple para publicar).
6. Biometrica (Face ID/Touch ID) — NSFaceIDUsageDescription en Info.plist.
7. Historial de accesos real — tabla en Supabase con logs de login.

---

*Documento generado automaticamente — AUREX App — Tab Perfil v1.0*
*Todos los commits realizados respetando las Reglas de Oro del proyecto:*
*100% ASCII, split().join(), verificacion OLD=1 antes de reemplazar, screenshot obligatorio.*
