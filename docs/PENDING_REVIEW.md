# PENDING REVIEW — aurex-i18n.js + cambios Perfil

**Objetivo**: Sistema i18n para PWA, empezando por tab Perfil
**Archivos nuevos**: aurex-i18n.js
**Archivos modificados**: index.html (tab Perfil + Login), aurex-features.js (selector idioma)

---

## Cambio 1 — Nuevo archivo: aurex-i18n.js

Se carga en index.html antes de aurex-v3.js. Contiene:
- Objeto T con keys ES + EN (8 idiomas en futuro)
- Función `t(key)` que lee `aurex_lang` de localStorage
- Función `setLang(code)` que guarda en localStorage y re-traduce
- Función `applyTranslations()` que recorre elementos con `data-i18n`

```javascript
/* aurex-i18n.js — Sistema de internacionalización PWA AUREX
   Replica el sistema de AurexApp/src/lib/i18n.js para vanilla JS.
   Keys tomadas 1:1 de la nativa (792 keys × 8 idiomas).
   Fase 1: tab Perfil + Login (~130 keys, ES + EN).
*/

(function() {
  'use strict';

  var _lang = localStorage.getItem('aurex_lang') || 'es';
  var _listeners = [];

  // ═══ TRADUCCIONES ═══
  var T = {

    // === TABS ===
    tab_portfolio: { es: 'Portfolio', en: 'Portfolio' },
    tab_mercados: { es: 'Mercados', en: 'Markets' },
    tab_watchlist: { es: 'Watchlist', en: 'Watchlist' },
    tab_alertas: { es: 'Alertas', en: 'Alerts' },
    tab_perfil: { es: 'Perfil', en: 'Profile' },

    // === LOGIN ===
    login_subtitle: { es: 'Portfolio Tracker con IA', en: 'AI Portfolio Tracker' },
    email_placeholder: { es: 'Email', en: 'Email' },
    contrasena_placeholder: { es: 'Contraseña', en: 'Password' },
    login_btn: { es: 'Ingresar', en: 'Log in' },
    contrasena_min6: { es: 'Contraseña (mín 6 car.)', en: 'Password (min 6 chars)' },
    registro_hint_celular: { es: '* Para recibir alertas automáticas de señales IA', en: '* To receive automatic AI signal alerts' },
    crear_cuenta_btn: { es: 'Crear cuenta', en: 'Create account' },
    no_tenes_cuenta: { es: '¿No tenés cuenta?', en: "Don't have an account?" },
    registrate: { es: 'Registrate', en: 'Sign up' },
    ya_tenes_cuenta: { es: '¿Ya tenés cuenta?', en: 'Already have an account?' },
    ingresa: { es: 'Ingresá', en: 'Log in' },
    completar_campos: { es: 'Completá todos los campos', en: 'Fill in all fields' },
    completar_email_pass: { es: 'Completá email y contraseña', en: 'Enter email and password' },
    pass_min6_error: { es: 'La contraseña debe tener al menos 6 caracteres', en: 'Password must be at least 6 characters' },
    error_sesion: { es: 'Error: sesión no iniciada', en: 'Error: session not started' },
    ingresa_celular: { es: 'Ingresá un número de celular', en: 'Enter a phone number' },

    // === B1: USUARIO ===
    b1_usuario: { es: '👤 Usuario', en: '👤 User' },
    plan_free_badge: { es: 'PLAN FREE', en: 'FREE PLAN' },
    invitado: { es: 'Invitado', en: 'Guest' },
    sin_cuenta: { es: 'Sin cuenta', en: 'No account' },

    // === B2: PLAN ACTUAL ===
    b2_plan_actual: { es: '⭐ Plan actual', en: '⭐ Current plan' },
    free_label: { es: 'FREE', en: 'FREE' },
    plan_gratuito: { es: 'Plan gratuito', en: 'Free plan' },
    plan_free_desc: { es: '5 activos • 3 señales IA/día • AUREX Pulse básico', en: '5 assets • 3 AI signals/day • Basic AUREX Pulse' },
    ver_planes_btn: { es: '🚀 Ver planes y ventajas', en: '🚀 View plans and benefits' },

    // === B3: MI CUENTA ===
    b3_mi_cuenta: { es: '⚙️ Mi cuenta', en: '⚙️ My account' },
    nombre_label: { es: 'Nombre', en: 'Name' },
    tu_nombre_placeholder: { es: 'Tu nombre', en: 'Your name' },
    guardar: { es: 'Guardar', en: 'Save' },
    email_label: { es: 'Email', en: 'Email' },
    email_no_editar: { es: '🔒 El email no se puede modificar', en: '🔒 Email cannot be changed' },
    telefono_label: { es: 'Teléfono', en: 'Phone' },
    necesario_alertas: { es: '* Necesario para alertas automáticas', en: '* Required for automatic alerts' },
    contrasena_label: { es: 'Contraseña', en: 'Password' },
    nueva_contrasena: { es: 'Nueva contraseña', en: 'New password' },
    repetir_contrasena: { es: 'Repetir contraseña', en: 'Repeat password' },
    cambiar_contrasena_btn: { es: 'Cambiar contraseña', en: 'Change password' },
    contrasena_actualizada: { es: 'Contraseña actualizada', en: 'Password updated' },
    contrasenas_no_coinciden: { es: 'Las contraseñas no coinciden', en: 'Passwords do not match' },
    telefono_guardado: { es: 'Teléfono guardado', en: 'Phone saved' },

    // === B4: PREFERENCIAS ===
    b4_preferencias: { es: '🎨 Preferencias', en: '🎨 Preferences' },
    tema_label: { es: '🌓 Tema', en: '🌓 Theme' },
    tema_desc: { es: 'Elegí cómo se ve la app', en: 'Choose how the app looks' },
    tema_auto: { es: 'Auto', en: 'Auto' },
    tema_claro: { es: 'Claro', en: 'Light' },
    tema_oscuro: { es: 'Oscuro', en: 'Dark' },
    idioma_label: { es: '🌐 Idioma', en: '🌐 Language' },
    pulse_indicador: { es: '🔴 Indicador AUREX Pulse', en: '🔴 AUREX Pulse Indicator' },
    pulse_indicador_desc: { es: 'Visible en tab Mercados', en: 'Visible in Markets tab' },

    // === B5: SEGURIDAD ===
    b5_seguridad: { es: '🔒 Seguridad', en: '🔒 Security' },
    auth_2fa: { es: '📱 Autenticación en 2 pasos', en: '📱 Two-factor authentication' },
    soon_badge: { es: 'SOON', en: 'SOON' },
    auth_2fa_desc: { es: 'Protección extra al iniciar sesión', en: 'Extra protection when logging in' },
    acceso_biometrico: { es: '👁 Acceso biométrico', en: '👁 Biometric access' },
    face_touch_id: { es: 'Face ID / Touch ID', en: 'Face ID / Touch ID' },
    sesion_activa: { es: '👨‍💻 Sesión activa', en: '👨‍💻 Active session' },
    este_dispositivo: { es: 'Este dispositivo', en: 'This device' },
    sesion_actual: { es: 'Sesión actual', en: 'Current session' },
    ultimos_accesos: { es: '🕐 Últimos accesos', en: '🕐 Recent access' },
    hoy: { es: 'Hoy', en: 'Today' },

    // === B6: ALERTAS (Perfil) ===
    b6_alertas: { es: '🔔 Alertas', en: '🔔 Alerts' },
    alertas_titulo_banner: { es: '⚡ TU NÚMERO, TUS ALERTAS AL INSTANTE', en: '⚡ YOUR NUMBER, YOUR ALERTS INSTANTLY' },
    alertas_desc_banner: { es: 'AUREX te avisa directo a tu celéfono cuando el mercado se mueve. Sin delays.', en: 'AUREX alerts you directly on your phone when the market moves. No delays.' },
    recibir_alertas_numero: { es: 'Recibir alertas en este número', en: 'Receive alerts on this number' },
    activar_notif_push: { es: 'Activá para recibir notificaciones push', en: 'Activate to receive push notifications' },
    numero_celular_label: { es: 'Número de celular', en: 'Phone number' },
    recibir_notif_cuando: { es: 'Recibí notificaciones push cuando ocurra:', en: 'Receive push notifications when:' },
    alerta_precio_obj: { es: 'Precio objetivo', en: 'Target price' },
    alerta_precio_obj_desc: { es: 'Cuando un activo alcanza tu precio', en: 'When an asset reaches your target price' },
    alerta_senal_ia: { es: 'Señal IA', en: 'AI Signal' },
    alerta_senal_ia_desc: { es: 'Nueva señal de compra o venta', en: 'New buy or sell signal' },
    alerta_variacion: { es: 'Variación brusca', en: 'Sharp variation' },
    alerta_variacion_desc: { es: 'Sube o baja más del 5% en 24hs tu portafolio', en: 'Your portfolio rises or falls more than 5% in 24h' },
    alerta_pulse_extremo: { es: 'AUREX Pulse extremo', en: 'Extreme AUREX Pulse' },
    alerta_pulse_desc: { es: 'Cuando Pulse supera zona de riesgo', en: 'When Pulse exceeds risk zone' },
    alertas_requieren_plan: { es: '🔒 Las alertas push requieren plan PRO o ELITE', en: '🔒 Push alerts require PRO or ELITE plan' },

    // === B7: NOTIFICACIONES ===
    b7_notificaciones: { es: '📩 Notificaciones', en: '📩 Notifications' },
    notif_push: { es: 'Notificaciones push', en: 'Push notifications' },
    notif_push_desc: { es: 'Activá todas las notificaciones', en: 'Activate all notifications' },
    notif_resumen: { es: 'Resumen diario', en: 'Daily summary' },
    notif_resumen_desc: { es: 'Recibí un resumen de tu portafolio', en: 'Receive a summary of your portfolio' },
    notif_hora_resumen: { es: 'Hora del resumen:', en: 'Summary time:' },
    notif_newsletter: { es: 'Newsletter semanal', en: 'Weekly newsletter' },
    notif_newsletter_desc: { es: 'Análisis y novedades cada semana', en: 'Analysis and news every week' },
    notif_novedades: { es: 'Novedades AUREX', en: 'AUREX Updates' },
    notif_novedades_desc: { es: 'Updates y nuevas funciones de la app', en: 'Updates and new app features' },

    // === B8: SOPORTE ===
    b8_soporte: { es: '💬 Soporte', en: '💬 Support' },
    centro_ayuda: { es: 'Centro de ayuda', en: 'Help center' },
    centro_ayuda_desc: { es: 'Preguntas frecuentes y guías', en: 'FAQ and guides' },
    calificar_aurex: { es: 'Calificá AUREX', en: 'Rate AUREX' },
    calificar_desc: { es: 'Tu opinión nos ayuda a mejorar', en: 'Your feedback helps us improve' },
    contactar_soporte: { es: 'Contactar soporte', en: 'Contact support' },
    siguenos: { es: 'Síguenos', en: 'Follow us' },
    version_app: { es: 'Versión de la app', en: 'App version' },
    terminos_uso: { es: 'Términos de uso', en: 'Terms of use' },
    politica_privacidad: { es: 'Política de privacidad', en: 'Privacy policy' },
    disclaimer_legal: {
      es: 'AUREX no es un asesor financiero. Las señales, análisis e indicadores mostrados son generados por algoritmos automatizados y no deben interpretarse como garantía de resultados futuros. Invertir conlleva riesgos, incluida la posible pérdida del capital invertido. Consulte siempre a un asesor financiero certificado antes de tomar decisiones de inversión.',
      en: 'AUREX is not a financial advisor. The signals, analysis and indicators shown are generated by automated algorithms and should not be interpreted as a guarantee of future results. Investing involves risks, including the possible loss of invested capital. Always consult a certified financial advisor before making investment decisions.'
    },
    aviso_legal: { es: 'Aviso Legal', en: 'Legal Notice' },

    // === B9: SESIÓN ===
    b9_sesion: { es: '🚪 Sesión', en: '🚪 Session' },
    cerrar_sesion_desc: { es: 'Vas a salir de tu cuenta en este dispositivo.', en: 'You will log out from your account on this device.' },
    cerrar_sesion_btn: { es: '🚪 Cerrar sesión', en: '🚪 Log out' },
    zona_peligro: { es: '⚠ Zona de peligro', en: '⚠ Danger zone' },
    eliminar_cuenta_desc: { es: 'Eliminar tu cuenta es una acción irreversible. Se borrarán todos tus datos, portafolio y configuración.', en: 'Deleting your account is irreversible. All your data, portfolio and settings will be erased.' },
    eliminar_cuenta_btn: { es: '🗑️ Eliminar mi cuenta', en: '🗑️ Delete my account' },
    confirmar_email_elim: { es: 'Escribí tu email para confirmar:', en: 'Enter your email to confirm:' },
    cancelar: { es: 'Cancelar', en: 'Cancel' },
    confirmar_eliminacion: { es: 'Confirmar eliminación', en: 'Confirm deletion' },

    // === MODAL RATING ===
    calificar_titulo: { es: 'Calificá AUREX', en: 'Rate AUREX' },
    calificar_sub: { es: 'Tu opinión nos ayuda a mejorar la app para vos', en: 'Your feedback helps us improve the app for you' },
    enviar: { es: 'Enviar', en: 'Submit' },
    rating_excelente: { es: '¡Excelente!', en: 'Excellent!' },
    rating_muy_buena: { es: '¡Muy buena!', en: 'Very good!' },
    rating_buena: { es: 'Buena', en: 'Good' },
    rating_gracias_feedback: { es: 'Gracias por tu feedback', en: 'Thanks for your feedback' },
    rating_enviada: { es: '¡Gracias! Tu calificación fue enviada', en: 'Thanks! Your rating was submitted' }
  };

  // ═══ FUNCIONES PÚBLICAS ═══

  function t(key) {
    var entry = T[key];
    if (!entry) return key;
    return entry[_lang] || entry.es || key;
  }

  function getLang() { return _lang; }

  function setLang(code) {
    _lang = code;
    localStorage.setItem('aurex_lang', code);
    applyTranslations();
    _listeners.forEach(function(fn) { fn(code); });
  }

  function onLangChange(fn) {
    _listeners.push(fn);
    return function() { _listeners = _listeners.filter(function(f) { return f !== fn; }); };
  }

  // Recorre todos los elementos con data-i18n y aplica traducción
  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      var key = el.getAttribute('data-i18n');
      var attr = el.getAttribute('data-i18n-attr');
      if (attr === 'placeholder') {
        el.placeholder = t(key);
      } else if (attr === 'value') {
        el.value = t(key);
      } else {
        el.textContent = t(key);
      }
    });
    // Elementos con data-i18n-html (para contenido con HTML entities)
    document.querySelectorAll('[data-i18n-html]').forEach(function(el) {
      var key = el.getAttribute('data-i18n-html');
      el.innerHTML = t(key);
    });
  }

  // ═══ EXPORTS ═══
  window._i18n = { t: t, getLang: getLang, setLang: setLang, onLangChange: onLangChange, applyTranslations: applyTranslations, T: T };
  window.t = t;

  // Aplicar al cargar
  document.addEventListener('DOMContentLoaded', function() {
    applyTranslations();
  });

})();
```

---

## Cambio 2 — Cómo se aplica en index.html

Cada string hardcodeado se reemplaza agregando `data-i18n="key"` al elemento HTML. Ejemplo:

**ANTES:**
```html
<span>⚙️ Mi cuenta</span>
```

**DESPUÉS:**
```html
<span data-i18n="b3_mi_cuenta">⚙️ Mi cuenta</span>
```

Para placeholders:
```html
<input placeholder="Tu nombre" data-i18n="tu_nombre_placeholder" data-i18n-attr="placeholder" />
```

El texto original en español se mantiene como fallback visible antes de que el JS cargue.

---

## Cambio 3 — Modificar _setIdioma en aurex-features.js

Reemplazar `window._setIdioma` (línea 6309) para que use el nuevo sistema:

```javascript
window._setIdioma = function(code) {
  window._i18n.setLang(code);
  var ov = document.getElementById('idioma-modal-overlay');
  if (ov) ov.remove();
  var flags = { es: '🇪🇸', en: '🇺🇸', pt: '🇧🇷', zh: '🇨🇳', fr: '🇫🇷', it: '🇮🇹', hi: '🇮🇳', ar: '🇦🇪' };
  var flagEl = document.getElementById('lang-flag');
  if (flagEl) flagEl.textContent = flags[code] || '🇪🇸';
};
```

Y modificar `pacSaveLang` (línea ~3282) para que también use el sistema:

```javascript
function pacSaveLang(sel) {
  var val = sel.value || sel;
  // Mapear códigos PWA a i18n
  var map = { 'es-ar': 'es', 'pt-br': 'pt' };
  var code = map[val] || val;
  window._i18n.setLang(code);
  var labels = { 'es': 'Español (Argentina)', 'en': 'English', 'pt': 'Português (BR)', 'fr': 'Français', 'it': 'Italiano', 'zh': '中文 (Mandarin)', 'hi': 'हिन्दी (Hindi)', 'ar': 'عربي (Árabe)' };
  var lbl = document.getElementById('lang-sublabel');
  if (lbl) lbl.innerHTML = labels[code] || code;
}
```

---

## Cambio 4 — Script tag en index.html

Agregar antes de aurex-v3.js (línea ~1185 aprox):

```html
<script src="aurex-i18n.js?v=1"></script>
```

---

## Notas

- El texto español original se mantiene en el HTML como fallback (si JS falla, se ve español)
- `data-i18n` se aplica gradualmente — esta fase solo cubre Perfil + Login
- Las FAQ ya tienen `qen`/`aen` — se integran en una fase posterior
- Los 8 idiomas se agregan cuando completemos ES/EN en todas las tabs
- El modal de planes (dentro de Perfil) se hace en una fase posterior por su complejidad
