# PENDING REVIEW — i18n Fase 1: Perfil + Login

**Commit para review**: este archivo
**Archivos modificados**: index.html, aurex-features.js
**Archivo nuevo**: aurex-i18n.js
**Diff total**: index.html 87 inserciones / 84 eliminaciones, aurex-features.js 7 inserciones / 4 eliminaciones

---

## Resumen de cambios

### 1. aurex-i18n.js (NUEVO)
- IIFE con ~130 keys ES/EN
- `window.t(key)` — función de traducción
- `window._i18n.setLang(code)` — cambia idioma + aplica traducciones
- `window._i18n.applyTranslations()` — recorre `data-i18n` y `data-i18n-html`
- DOMContentLoaded aplica traducciones al cargar

### 2. index.html — script tag
- Línea 591: `<script src="aurex-i18n.js?v=1"></script>` antes de aurex-v3.js

### 3. index.html — data-i18n en Login (líneas 2258-2299)
- `login_subtitle` en subtítulo
- `email_placeholder`, `contrasena_placeholder` en inputs (data-i18n-attr="placeholder")
- `login_btn`, `crear_cuenta_btn` en botones
- `contrasena_min6` en placeholder registro
- `registro_hint_celular` en hint celular
- `no_tenes_cuenta`, `registrate` en toggle

### 4. index.html — data-i18n en B1-B9 acordeón Perfil (líneas 2315-2838)
**Títulos de sección** (9 bloques):
- B1: `b1_usuario` (data-i18n-html por emoji)
- B2: `b2_plan_actual` (data-i18n-html)
- B3: `b3_mi_cuenta`
- B4: `b4_preferencias`
- B5: `b5_seguridad` (data-i18n-html)
- B6: `b6_alertas`
- B7: `b7_notificaciones`
- B8: `b8_soporte` (data-i18n-html)
- B9: `b9_sesion` (data-i18n-html)

**Contenidos traducidos**:
- B1: `plan_free_badge`
- B2: `plan_gratuito`, `plan_free_desc`, `ver_planes_btn`
- B3: `nombre_label`, `tu_nombre_placeholder`, `guardar`, `email_label`, `email_no_editar`, `telefono_label`, `necesario_alertas`, `contrasena_label`, `nueva_contrasena`, `repetir_contrasena`, `cambiar_contrasena_btn`
- B4: `tema_label`, `tema_desc`, `tema_auto`, `tema_claro`, `tema_oscuro`, `idioma_label`, `pulse_indicador`, `pulse_indicador_desc`
- B5: `auth_2fa`, `auth_2fa_desc`, `acceso_biometrico`, `sesion_activa`, `este_dispositivo`, `sesion_actual`, `ultimos_accesos`, `hoy`
- B6: solo título (contenido en línea larga se hace en fase 2)
- B7: solo título (contenido en fase 2)
- B8: `centro_ayuda`, `centro_ayuda_desc`, `calificar_aurex`, `calificar_desc`, `contactar_soporte`, `siguenos`, `version_app`, `terminos_uso`, `politica_privacidad`, `disclaimer_legal`, `aviso_legal`
- B9: `cerrar_sesion_desc`, `cerrar_sesion_btn`, `zona_peligro`, `eliminar_cuenta_desc`, `eliminar_cuenta_btn`, `confirmar_email_elim`, `cancelar`, `confirmar_eliminacion`

### 5. index.html — pacSaveLang modificada (línea 3269)
- Agrega mapeo `es-ar` → `es`, `pt-br` → `pt`
- Llama `window._i18n.setLang(code)` en vez de solo `localStorage.setItem`
- Labels actualizados con códigos sin sufijo regional

### 6. aurex-features.js — _setIdioma modificada (línea 6309)
- Llama `window._i18n.setLang(code)` en vez de solo `localStorage.setItem`
- Agrega banderas para fr, it, hi, ar (antes solo tenía es, en, pt, zh)

---

## Patrón aplicado

**Texto simple**: `data-i18n="key"` → applyTranslations() usa textContent
**Texto con HTML/emojis**: `data-i18n-html="key"` → usa innerHTML
**Placeholders**: `data-i18n="key" data-i18n-attr="placeholder"`
**Botones**: `<span data-i18n="key">texto</span>` dentro del button (para no perder el onclick)
**Fallback**: texto español original se mantiene en el HTML

---

## NO incluido en esta fase (fase 2)

- Contenido de B6 Alertas (línea larga 2607, 3139 chars)
- Contenido de B7 Notificaciones (mismo patrón de línea larga)
- FAQ (ya tienen qen/aen, requiere refactor del objeto JS)
- Modal Rating (generado dinámicamente desde JS)
- Modal Planes (generado dinámicamente)
- JS dinámico de auth (errores, toggles login/register)

---

## Verificación de sintaxis

```
node -c aurex-i18n.js     → OK
node -c aurex-features.js → OK
```
