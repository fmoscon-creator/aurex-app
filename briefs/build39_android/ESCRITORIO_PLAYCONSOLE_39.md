# 📩 PARA ESCRITORIO — PLAY CONSOLE (Android Build 1.0.39 / Cobrex)

## 🛑 REGLA
- Escritorio **configura y GUARDA** en Play Console.
- Escritorio **NUNCA publica el release a producción** — eso lo hace **Fernando**.
- El AAB (Build 1.0.39) lo sube Fernando a **prueba abierta** primero; si valida OK, lo promueve a producción.

---

## 1) METADATA — Ficha de Play Store (se puede hacer YA)
**Cambio: "350" → "500"** en la **descripción** de Play Store, en los 8 idiomas (igual que iOS). Aparece varias veces ("350 activos" / "más de 350").
- Play Console → tu app → **Presencia en Play Store → Ficha principal** (y sus traducciones) → cambiar 350 → 500.

## 2) NOVEDADES del release 1.0.39 (al crear el release, por idioma, ≤500 caracteres)
### ES
```
• Prueba gratis de 7 días en los planes mensuales PRO y ELITE.
• Ahora 500+ activos, con nueva categoría de Metales.
• Pantalla de planes más clara.
• Navegación renovada con íconos a color.
• La app arranca en el idioma de tu teléfono.
• Mejoras y correcciones.
```
### EN
```
• 7-day free trial on the monthly PRO and ELITE plans.
• Now 500+ assets, with a new Metals category.
• Cleaner plans screen.
• Refreshed navigation with colorful icons.
• The app starts in your phone's language.
• Improvements and fixes.
```
→ Escritorio traduce los otros 6 (PT, FR, IT, ZH, HI, AR) con el mismo tono.

---

## 3) PRECIOS — ⚠️ recién cuando el Build 1.0.39 esté en PRODUCCIÓN
*(Igual que en iOS: el build nuevo lee los precios dinámicamente. Cambiarlos antes de que esté en producción puede mostrar precios incongruentes en la versión vieja. Configurar al promover a producción.)*

Play Console → **Monetizar → Suscripciones** → por cada plan base:
| Plan | Base (todos los países) | Argentina |
|---|---|---|
| PRO Mensual | **$4.99** | **$2.99** |
| PRO Anual | **$47.99** | **$28.99** |
| ELITE Mensual | **$9.99** | **$4.99** |
| ELITE Anual | **$95.99** | **$47.99** |

## 4) TRIAL 7 días — junto con los precios (en producción)
Play Console → Suscripciones → en los **2 planes MENSUALES** (PRO y ELITE) → crear **oferta de prueba gratuita (Free trial) de 7 días** para nuevos suscriptores. *(Equivalente al Introductory Offer de iOS; RevenueCat lo lee solo.)*

---

## ✅ AL TERMINAR
- (1) y (2) se pueden dejar listos ya.
- (3) y (4) se configuran al promover a producción.
- Escritorio confirma a Fernando; **Fernando hace el release/rollout.**

_Code — 10-jun-2026 (Android Build 1.0.39)._
