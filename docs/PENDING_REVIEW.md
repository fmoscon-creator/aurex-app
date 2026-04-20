# PENDING REVIEW — Inventario strings Perfil para i18n

**Objetivo**: Listar TODOS los strings hardcodeados en español de la tab Perfil de la PWA
**Archivo fuente**: index.html (todo el Perfil está en index.html, no en features.js ni v3.js)
**Verificado contra**: código en disco, línea por línea

---

## LOGIN (estado no logueado) — líneas 2251-2300

| Línea | String | Key nativa |
|-------|--------|-----------|
| 2258 | `Portfolio Tracker con IA` | login_subtitle |
| 2261 | placeholder `Email` | email_label |
| 2263 | placeholder `Contraseña` | contrasena |
| 2267 | `Ingresar` | login_btn |
| 2274 | placeholder `Contraseña (mín 6 car.)` | contrasena_min6 |
| 2288 | `* Para recibir alertas automáticas de señales IA` | registro_hint_celular |
| 2291 | `Crear cuenta` | crear_cuenta_btn |
| 2298 | `¿No tenés cuenta?` | no_tenes_cuenta |
| 2299 | `Registrate` | registrate |

**En JS (funciones auth, ~líneas 3672-3705):**

| Línea | String | Key nativa |
|-------|--------|-----------|
| ~3680 | `¿Ya tenés cuenta?` | ya_tenes_cuenta |
| ~3681 | `Ingresá` | ingresa |
| ~3690 | `Completá todos los campos` | completar_campos |
| ~3691 | `Completá email y contraseña` | completar_email_pass |
| ~3693 | `La contraseña debe tener al menos 6 caracteres` | pass_min6_error |
| ~3700 | `Error: sesión no iniciada` | error_sesion |

---

## B1: USUARIO — líneas 2315-2358

| Línea | String | Key nativa |
|-------|--------|-----------|
| 2317 | `👤 Usuario` | b1_usuario |
| 2356 | `PLAN FREE` | plan_free_badge |
| 1166 | `Invitado` (en JS) | invitado |
| 1167 | `Sin cuenta` (en JS) | sin_cuenta |

---

## B2: PLAN ACTUAL — líneas 2361-2382

| Línea | String | Key nativa |
|-------|--------|-----------|
| 2363 | `⭐ Plan actual` | b2_plan_actual |
| 2368 | `FREE` | free_label |
| 2369 | `Plan gratuito` | plan_gratuito |
| 2372 | `5 activos • 3 señales IA/día • AUREX Pulse básico` | plan_free_desc |
| 2380 | `🚀 Ver planes y ventajas` | ver_planes_btn |

---

## B3: MI CUENTA — líneas 2384-2448

| Línea | String | Key nativa |
|-------|--------|-----------|
| 2386 | `⚙️ Mi cuenta` | b3_mi_cuenta |
| 2392 | `Nombre` | nombre_label |
| 2397 | placeholder `Tu nombre` | tu_nombre_placeholder |
| 2402 | `Guardar` | guardar |
| 2408 | `Email` | email_label |
| 2414 | `🔒 El email no se puede modificar` | email_no_editar |
| 2419 | `Teléfono` | telefono_label |
| 2420 | `Guardar` (celular) | guardar |
| 2422 | `* Necesario para alertas automáticas` | necesario_alertas |
| 2427 | `Contraseña` | contrasena_label |
| 2433 | placeholder `Nueva contraseña` | nueva_contrasena |
| 2438 | placeholder `Repetir contraseña` | repetir_contrasena |
| 2442 | `Cambiar contraseña` | cambiar_contrasena_btn |

---

## B4: PREFERENCIAS — líneas 2450-2519

| Línea | String | Key nativa |
|-------|--------|-----------|
| 2452 | `🎨 Preferencias` | b4_preferencias |
| 2459 | `🌓 Tema` | tema_label |
| 2462 | `Elegí cómo se ve la app` | tema_desc |
| 2467 | `Auto` | tema_auto |
| 2470 | `Claro` | tema_claro |
| 2473 | `Oscuro` | tema_oscuro |
| 2481 | `🌐 Idioma` | idioma_label |
| 2484 | `Español (Argentina)` | idioma_sublabel |
| 2506 | `🔴 Indicador AUREX Pulse` | pulse_indicador |
| 2509 | `Visible en tab Mercados` | pulse_indicador_desc |

---

## B5: SEGURIDAD — líneas 2521-2599

| Línea | String | Key nativa |
|-------|--------|-----------|
| 2523 | `🔒 Seguridad` | b5_seguridad |
| 2532 | `📱 Autenticación en 2 pasos` | auth_2fa |
| 2534 | `SOON` | soon_badge |
| 2538 | `Protección extra al iniciar sesión` | auth_2fa_desc |
| 2552 | `👁 Acceso biométrico` | acceso_biometrico |
| 2558 | `Face ID / Touch ID` | face_touch_id |
| 2569 | `👨‍💻 Sesión activa` | sesion_activa |
| 2575 | `Este dispositivo` | este_dispositivo |
| 2578 | `Sesión actual` | sesion_actual |
| 2587 | `🕐 Últimos accesos` | ultimos_accesos |
| 2593 | `Hoy` | hoy |
| 2594 | `Este dispositivo` | este_dispositivo |

---

## B6: ALERTAS — líneas 2601-2645

| Línea | String | Key nativa |
|-------|--------|-----------|
| 2603 | `🔔 Alertas` | b6_alertas |
| 2607 | `⚡ TU NÚMERO, TUS ALERTAS AL INSTANTE` | alertas_titulo_banner |
| 2607 | `AUREX te avisa directo a tu celéfono...` | alertas_desc_banner |
| 2607 | `Recibir alertas en este número` | recibir_alertas_numero |
| 2607 | `Activá para recibir notificaciones push` | activar_notif_push |
| 2607 | `Número de celular` | numero_celular_label |
| 2607 | `Guardar` | guardar |
| 2607 | `* Necesario para alertas automáticas` | necesario_alertas |
| 2609 | `Recibí notificaciones push cuando ocurra:` | recibir_notif_cuando |
| 2614 | `Precio objetivo` | alerta_precio_obj |
| 2614 | `Cuando un activo alcanza tu precio` | alerta_precio_obj_desc |
| 2621 | `Señal IA` | alerta_senal_ia |
| 2621 | `Nueva señal de compra o venta` | alerta_senal_ia_desc |
| 2628 | `Variación brusca` | alerta_variacion |
| 2628 | `Sube o baja más del 5% en 24hs tu portafolio` | alerta_variacion_desc |
| 2635 | `AUREX Pulse extremo` | alerta_pulse_extremo |
| 2635 | `Cuando Pulse supera zona de riesgo` | alerta_pulse_desc |
| 2641 | `🔒 Las alertas push requieren plan PRO o ELITE` | alertas_requieren_plan |

---

## B7: NOTIFICACIONES — líneas 2647-2691

| Línea | String | Key nativa |
|-------|--------|-----------|
| 2649 | `📩 Notificaciones` | b7_notificaciones |
| 2656 | `Notificaciones push` | notif_push |
| 2656 | `Activá todas las notificaciones` | notif_push_desc |
| 2664 | `Resumen diario` | notif_resumen |
| 2664 | `Recibí un resumen de tu portafolio` | notif_resumen_desc |
| 2669 | `Hora del resumen:` | notif_hora_resumen |
| 2679 | `Newsletter semanal` | notif_newsletter |
| 2679 | `Análisis y novedades cada semana` | notif_newsletter_desc |
| 2686 | `Novedades AUREX` | notif_novedades |
| 2686 | `Updates y nuevas funciones de la app` | notif_novedades_desc |

---

## B8: SOPORTE — líneas 2693-2773

| Línea | String | Key nativa |
|-------|--------|-----------|
| 2695 | `💬 Soporte` | b8_soporte |
| 2705 | `Centro de ayuda` | centro_ayuda |
| 2706 | `Preguntas frecuentes y guías` | centro_ayuda_desc |
| 2717 | `Calificá AUREX` | calificar_aurex |
| 2718 | `Tu opinión nos ayuda a mejorar` | calificar_desc |
| 2729 | `Contactar soporte` | contactar_soporte |
| 2736 | `Síguenos` | siguenos |
| 2742 | `Instagram` | (universal) |
| 2748 | `X / Twitter` | (universal) |
| 2754 | `YouTube` | (universal) |
| 2760 | `Versión de la app` | version_app |
| 2764 | `Términos de uso` | terminos_uso |
| 2765 | `Política de privacidad` | politica_privacidad |
| 2768 | Disclaimer legal (texto largo) | disclaimer_legal |
| 2778 | `Aviso Legal` | aviso_legal |

---

## B9: SESIÓN — líneas 2782-2838

| Línea | String | Key nativa |
|-------|--------|-----------|
| 2784 | `🚪 Sesión` | b9_sesion |
| 2790 | `Vas a salir de tu cuenta en este dispositivo.` | cerrar_sesion_desc |
| 2796 | `🚪 Cerrar sesión` | cerrar_sesion_btn |
| 2801 | `⚠ Zona de peligro` | zona_peligro |
| 2803 | `Eliminar tu cuenta es una acción irreversible...` | eliminar_cuenta_desc |
| 2811 | `🗑️ Eliminar mi cuenta` | eliminar_cuenta_btn |
| 2815 | `Escribí tu email para confirmar:` | confirmar_email_elim |
| 2827 | `Cancelar` | cancelar |
| 2834 | `Confirmar eliminación` | confirmar_eliminacion |

---

## JS dinámico — funciones Perfil

**FAQ (líneas ~3488-3493):**
- 6 preguntas + 6 respuestas en español (ya tienen campo `qen`/`aen` para inglés)

**Modal Rating (líneas ~3520-3541):**
- `Calificá AUREX`, `Tu opinión nos ayuda a mejorar la app para vos`
- `Enviar`, `Cancelar`
- `¡Excelente!`, `¡Muy buena!`, `Buena`, `Gracias por tu feedback`
- `¡Gracias! Tu calificación fue enviada`

---

## RESUMEN

| Sección | Strings aprox |
|---------|--------------|
| Login | 15 |
| B1 Usuario | 4 |
| B2 Plan actual | 5 |
| B3 Mi cuenta | 13 |
| B4 Preferencias | 10 |
| B5 Seguridad | 12 |
| B6 Alertas | 18 |
| B7 Notificaciones | 10 |
| B8 Soporte | 14 |
| B9 Sesión | 9 |
| JS dinámico (FAQ, Rating) | ~20 |
| **Total Perfil** | **~130 strings** |

---

## NOTAS

1. Todos los strings están en `index.html` — la tab Perfil no usa `aurex-features.js` ni `aurex-v3.js`
2. Muchos strings están en HTML entities (ej: `&#241;` = ñ, `&#237;` = í, `&#243;` = ó)
3. La línea 2607 tiene múltiples strings concatenados en una sola línea larga (bloque B6 alertas)
4. Las FAQ ya tienen `qen`/`aen` para inglés embebido en el objeto JS
5. Los strings marcados (universal) como Instagram, YouTube, X/Twitter no necesitan traducción
