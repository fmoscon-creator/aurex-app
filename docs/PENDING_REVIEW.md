# PENDING REVIEW — aurex-i18n.js con 8 idiomas completos

**Cambio**: aurex-i18n.js reescrito con 163 keys × 8 idiomas (ES, EN, PT, ZH, FR, IT, HI, AR)
**Archivo**: aurex-i18n.js (reescritura completa)
**index.html**: sin cambios (los data-i18n ya están aplicados)

---

## Resumen

- **163 keys** con los 8 idiomas
- Traducciones tomadas de la nativa (AurexApp/src/lib/i18n.js) donde existían
- Keys que no existían en nativa: traducciones creadas consistentes con el estilo
- Sintaxis verificada: `node -c aurex-i18n.js` → OK

## Verificación

Escritorio puede verificar el archivo completo en disco: `aurex-i18n.js` (reescritura completa).

El archivo tiene la misma estructura que antes (IIFE, T object, t(), setLang(), applyTranslations()) — solo se expandieron las keys de `{ es, en }` a `{ es, en, pt, zh, fr, it, hi, ar }`.

## Secciones cubiertas

- TABS (5 keys)
- LOGIN (16 keys)
- B1 Usuario (4 keys)
- B2 Plan actual (5 keys)
- B3 Mi cuenta (15 keys)
- B4 Preferencias (10 keys)
- B5 Seguridad (13 keys)
- B6 Alertas Perfil (17 keys)
- B7 Notificaciones (10 keys)
- B8 Soporte (12 keys)
- B9 Sesión (9 keys)
- Modal Rating (8 keys)
- Modal Planes (39 keys — FREE 10, PRO 13, ELITE 12, shared 4)
- Aviso Legal popup (5 keys)
