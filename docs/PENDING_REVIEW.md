# PENDING REVIEW — i18n completo: Modal Planes + Aviso Legal + auditoría final

**Commit anterior**: 4116bbb (B6+B7+FaceID)
**Este commit**: agrega modal planes, aviso legal popup, "Perfil" en header modal

---

## Cambios en aurex-i18n.js (+50 keys nuevas)

### Modal Planes (44 keys):
`elegir_plan`, `planes_incluyen_pulse`, `plan_free_subtitle`, `plan_free_f1` a `plan_free_f8`, `plan_free_f4_pulse`, `plan_free_f4_detail`, `ver_plan_pro`, `mas_popular`, `por_mes`, `pro_anual_desc`, `plan_pro_subtitle`, `plan_pro_f1` a `plan_pro_f9`, `pro_mensual_btn`, `pro_anual_btn`, `ahorras_25`, `elite_anual_desc`, `plan_elite_subtitle`, `plan_elite_f1` a `plan_elite_f8`, `elite_mensual_btn`, `elite_anual_btn`

### Aviso Legal Popup (5 keys):
`aviso_legal_titulo`, `aviso_legal_p1`, `aviso_legal_p2`, `aviso_legal_p3`, `aviso_legal_cerrar`

### Reutiliza key existente:
`tab_perfil` (para header modal planes L2906)

---

## Cambios en index.html

### Modal Planes (L2915-L3184):
- `elegir_plan`, `planes_incluyen_pulse` en header
- FREE: subtitle + 8 features + ver PRO button
- PRO: `mas_popular` badge, `por_mes`, `pro_anual_desc`, subtitle + 9 features + 2 buttons + `ahorras_25`
- ELITE: `por_mes`, `elite_anual_desc`, subtitle + 8 features + 2 buttons + `ahorras_25`

### Aviso Legal Popup (L4088-L4109):
- `aviso_legal_titulo`, `aviso_legal_p1`, `aviso_legal_p2`, `aviso_legal_p3`, `aviso_legal_cerrar`

### Header modal planes (L2906):
- `tab_perfil` en "Perfil"

---

## Auditoría final — strings SIN data-i18n (todos correctos):

| Línea | Contenido | Por qué NO se traduce |
|-------|-----------|----------------------|
| 2280-2283 | 🇲🇽 +52, 🇨🇱 +56, etc. | Prefijos telefónicos (datos) |
| 2421 | &#127462;&#127479; +54, etc. | Prefijos telefónicos (datos) |
| 2493-2500 | English, Español, Français, etc. | Nombres nativos de idiomas |
| 2789 | AUREX v1.0.0 | Nombre de app + versión |
| 3408-3412 | fmt(d), dev | Datos dinámicos JS en pacInitSeg |

**Total data-i18n en index.html: 135**
**Keys en aurex-i18n.js: ~180 (130 originales + 50 nuevas)**

---

## Verificación de sintaxis
```
node -c aurex-i18n.js → OK
```
