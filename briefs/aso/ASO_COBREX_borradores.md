# 🔎 ASO COBREX — superficies + borradores (para máxima visibilidad de "cobrex" en búsquedas)

> **🛑 SOLO BORRADORES. NO se cambia NADA en la ficha real de iOS ni Android hasta OK de Fernando.** Objetivo: que **"cobrex" + keywords** aparezcan en la **MÁXIMA cantidad de superficies de búsqueda** (no solo pricing — todas las mejoras).
> **Cómo se trabaja:** Code armó el inventario de superficies (esta v1). **Escritorio rellena la columna "Borrador"** + confirma los "Valor actual" desde ASC/Play. **Code rellena "Opinión Code".** Fernando decide. (Si chocan en git, Code resuelve.)

---

## 🧠 NOTA ESTRATÉGICA DE CODE (lo que cambia el enfoque — leer primero)
**iOS y Android indexan DISTINTO. No es lo mismo dónde poner "cobrex" en cada uno:**
- **iOS (App Store):** la búsqueda indexa SOLO **Nombre + Subtítulo + campo Keywords**. **La descripción NO se indexa.** → "cobrex" debe estar en el nombre (ya está) y los términos valiosos en subtítulo + campo keywords. **NO repetir en el campo keywords lo que ya está en el nombre** (desperdicia caracteres — Apple ya lo indexa del nombre).
- **Android (Play Store):** Google **SÍ indexa la descripción completa** (y fuerte). → ahí "cobrex" + keywords deben aparecer **naturalmente varias veces** en la descripción corta y larga.
- **Marca "cobrex":** la API de Apple ya la da #1; el problema del front-end AR (no aparece "cobrex" solo) se resuelve metiendo el keyword en el campo (Build 39 ítem B). Esto lo refuerza en más superficies.

---

## 📱 App Store (iOS) — superficies
| Superficie | Límite | Peso en búsqueda | Valor actual | Borrador optimizado (Escritorio) | Opinión Code |
|---|---|---|---|---|---|
| **Nombre de la app** | 30 chars | ⭐⭐⭐ máximo | `Cobrex` (¿se le puede sumar 2-3 palabras clave? ej. "Cobrex: Cripto y Acciones") | _(Escritorio)_ | _(Code)_ |
| **Subtítulo** | 30 chars | ⭐⭐⭐ alto | `Real-time market data tracker` | _(Escritorio — ¿pasar a ES con keywords? ej. "Alertas de cripto y acciones")_ | _(Code)_ |
| **Campo Keywords** | 100 chars | ⭐⭐⭐ alto (no visible) | Build 39 (B): `cobrex,cripto,acciones,bolsa,trading,alertas,mercados,inversiones,cedears,IA,ETF,finanzas` | _(Escritorio — por idioma; NO repetir lo del nombre/subtítulo)_ | _(Code)_ |
| **Texto promocional** | 170 chars | ⭐ (no indexa búsqueda, sí conversión) | _(confirmar ASC)_ | _(Escritorio)_ | _(Code)_ |
| **Descripción** | 4000 chars | ⭐ bajo (iOS NO la indexa) | _(confirmar ASC)_ | _(Escritorio — legibilidad/conversión, no keyword-stuffing)_ | _(Code)_ |
| **Nombres IAP** (4 productos) | — | ⭐ | _(confirmar)_ | _(Escritorio)_ | _(Code)_ |

## 🤖 Play Store (Android) — superficies
| Superficie | Límite | Peso en búsqueda | Valor actual | Borrador optimizado (Escritorio) | Opinión Code |
|---|---|---|---|---|---|
| **Título** | 30 chars | ⭐⭐⭐ máximo | `Cobrex` (¿sumar keyword? ej. "Cobrex: Mercados y Alertas") | _(Escritorio)_ | _(Code)_ |
| **Descripción corta** | 80 chars | ⭐⭐⭐ alto (Google SÍ indexa) | _(confirmar Play)_ | _(Escritorio — meter "cobrex" + 2-3 keywords)_ | _(Code)_ |
| **Descripción completa** | 4000 chars | ⭐⭐⭐ alto (Google SÍ indexa fuerte) | _(confirmar Play)_ | _(Escritorio — "cobrex" + keywords naturales, repetidos sin spamear)_ | _(Code)_ |

## 🌐 Web (cobrex.io) — refuerzo de marca (SEO, no ASO de tienda)
| Superficie | Valor actual | Borrador (Escritorio) | Opinión Code |
|---|---|---|---|
| `<title>` + meta description | _(confirmar)_ | _(Escritorio)_ | _(Code)_ |
| H1 / texto de la landing | _(confirmar)_ | _(Escritorio)_ | _(Code)_ |

---

## ✅ Checklist de cierre (antes de pasar a Fernando para OK)
- [ ] Escritorio: valores actuales confirmados desde ASC/Play.
- [ ] Escritorio: borradores de cada superficie (iOS, Android, web).
- [ ] Code: opinión en cada superficie (respetando iOS-no-indexa-descripción vs Android-sí).
- [ ] Lo que sea metadata (keywords, subtítulo, descripciones) NO requiere build → se carga cuando Fernando dé OK. El **nombre/título** sí es más delicado (cambiarlo afecta marca + puede requerir más cuidado) → marcar aparte.
