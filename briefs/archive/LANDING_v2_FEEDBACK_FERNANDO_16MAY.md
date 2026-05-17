# LANDING v2 — FEEDBACK FERNANDO + APORTES CODE (para sumar Escritorio)

> **Fecha:** 16-may-2026, cierre noche AR.
> **Estado landing actual:** v1 LIVE en `https://aurex.live/` (commit `0243a53`). Funcional pero requiere rework profundo.
> **Para Escritorio:** este documento captura el feedback completo de Fernando + mis sugerencias técnicas de cómo implementar cada punto. **Tu rol:** revisar, sumar ideas superadoras, marcar qué falta. Después con tu input cierro v2.
> **Cero código nuevo hasta que Escritorio sume.**

---

## 0. Error crítico cometido por Code en v1 (reconocido)

**Inventé un logo SVG nuevo** en `assets/landing/logo-aurex-clean.svg` cuando el logo oficial YA EXISTÍA en el repo:

| Archivo oficial existente (Code lo ignoró) | Uso correcto |
|---|---|
| `assets/logo/aurex_logo_transparent.svg` (1.547 B) | Logo símbolo aprobado 27/03/2026 — usar sobre fondos oscuros |
| `assets/logo/aurex_logo_dark.svg` (1.571 B) | Logo símbolo con fondo radial marrón embebido |
| `logo-aurex.png` (146 KB en root) | Logo símbolo + texto "AUREX" para banners/hero |

**Acción correctiva v2:** eliminar `assets/landing/logo-aurex-clean.svg` inventado. Usar los oficiales. Header = `aurex_logo_transparent.svg`. Hero (si necesita logo grande) = `logo-aurex.png`.

**Regla violada:** memoria `project_assets_visuales.md` documentaba el logo oficial. La memoria `feedback_nunca_inventar.md` exige leer código real antes de inventar. Las dos se ignoraron en v1.

---

## 1. Feedback Fernando — 9 puntos a corregir/agregar

### Punto 1 — Logo es inventado, falta logo real
**Fernando dijo:** "el LOGO que esta es inventado, no es mi logo".
**Acción:** Reemplazar `logo-aurex-clean.svg` por logo oficial. Header → `aurex_logo_transparent.svg`. Hero → `logo-aurex.png` (grande, centrado).

### Punto 2 — Diseño demasiado plano/básico, parece plantilla AI
**Fernando dijo:** "me parece todo muy plano como sin detalle de diseno o muy basico... sino parece como algo creado artificialmente con una plantilla".
**Acción:** sumar profundidad visual con gradientes, sombras suaves, animaciones, texturas. Usar el `frontend-design` SKILL.md específicamente para "avoid generic AI slop aesthetics".

### Punto 3 — Fondo dividido en dos zonas
**Fernando dijo:** "en la parte de arriba hasta la altura de los 3 cards de Descargar IOS y Descargar Android y Intentalo en el Navegador, debería tener un fondo y quizás de ahí para abajo el fondo de constelación doradas de estrellitas que titilan unidas con líneas finas que aparecen y desaparecen".

**Acción técnica:**
- **Zona A — Header + Hero hasta los 3 CTAs:** fondo sólido oscuro con gradiente suave radial (puede ser `radial-gradient` en CSS) + posiblemente una imagen real (captura de la app, búho v2, o composición visual con marca).
- **Zona B — De los 3 CTAs hacia abajo (todos los bloques 3-12):** **fondo de constelación dorada animada** con:
  - Estrellas pequeñas doradas (#D4A017, #F5C842) que titilan (CSS animation con opacity oscilante).
  - Líneas finas conectando estrellas que aparecen y desaparecen (SVG con stroke-dasharray + animation).
  - Densidad media (no saturado).

**Implementación:** canvas + JS vanilla con loop de animación, o SVG con animaciones CSS keyframes. Sin librerías externas (regla vanilla). Performance: 60fps, no más de 50-80 estrellas, pause cuando tab no está visible.

### Punto 4 — CTA "Try on browser" es mala frase
**Fernando dijo:** "intentalo en el navegador, que es mala esa frase, debería ser Descarga aquí o Descarga Web o algo así".

**Acción:** cambiar `cta_browser` por:
- EN: `"Use on web"` o `"Open in browser"` o `"Try the web app"`
- ES: `"Usar en la web"` o `"Abrir en el navegador"`
- Decisión final pasa por Escritorio (es el que escribe copy).

### Punto 5 — Header nav debe mostrar Redes/Canales (no Producto/Planes/Pruébalo)
**Fernando dijo:** "en el headers donde está Producto Planes y Pruébalo gratis debería estar Redes o Canales que tenemos".

**Acción:** cambiar `nav` del header:
- Eliminar: "Product", "Plans", "Try Free"
- Agregar: **"Channels"** (o "Networks" o "Social") con dropdown/links a las 6 redes activas de FASE 1:
  - Telegram (3 canales EN/ES/PT)
  - WhatsApp Business
  - X / Twitter (3 cuentas)
  - Instagram
  - YouTube
  - LinkedIn Company
  - TikTok

⚠️ **Tensión a resolver con Escritorio:** según `CONSOLIDADO_MKT_LANDING_v2_16MAY.md` FASE 0 (landing) viene ANTES de FASE 1 (canales activos). Hoy las redes están abiertas pero VACÍAS (cero contenido publicado). ¿Linkeamos a cuentas vacías o ponemos "Coming soon"?

### Punto 6 — Falta sección Screenshots/Pantallas de la app
**Fernando dijo:** "en algún lugar que los usuarios al entrar puedan ver las pantallas principales de la app o de sus principales funciones o herramientas".

**Acción:** sumar un **bloque nuevo (sería bloque 6.5 entre banners y portfolio)** con galería de capturas reales:
- Captura 1: Tab Mercados (banner 3 plazas + lista activos)
- Captura 2: Tab IA Señales (lista señales con probabilidad + Alta Convicción)
- Captura 3: Tab Portfolio (Termómetro Riesgo + Dots IA + PnL)
- Captura 4: Tab Alertas (4 bloques de tipos)
- Captura 5: AUREX Pulse (gauge + 14 variables)
- Captura 6: Onboarding multi-idioma (selector idiomas)

Formato: carrusel horizontal scrollable o grid 3×2 responsive. Capturas en frame de iPhone (mockup device frame).

**Origen de las capturas:** las puedo sacar yo de Build 33 Android via `adb screencap` (mismo método que la guía de usuarios) o usar las que ya están en `app/img/onboarding/` (6 JPGs: alertas, comparador, ia, portfolio, pulse, watchlist).

### Punto 7 — Selector idioma en header (ya está, confirmar)
**Fernando dijo:** "en el headers de arriba debería estar el card de IDIOMA DE traducción de la WEB para que al hacer select se traduzca según lo que se elija".

**Acción:** ya está implementado en v1 ✅. Confirmar que funciona end-to-end cuando estén las 7 traducciones cargadas (hoy solo EN).

### Punto 8 — Sección Benchmark / Comparativa vs competencia
**Fernando dijo:** "podríamos tener una card de benchmark o la palabra que sea adecuada para explicar las diferencias de porque AUREX es mejor que xx y xx y xxx y ahí compararnos con otras aplicaciones".

**Acción:** sumar un **bloque nuevo (sería bloque 10.5 entre planes y disclaimer)** con tabla comparativa AUREX vs competidores principales:

| Feature | AUREX | Magnifi | Sagehood | Danelfin | Robinhood | Bloomberg Terminal |
|---|---|---|---|---|---|---|
| Cobertura 9 tipos de instrumentos | ✅ | ❌ | ❌ | ❌ | Parcial | ✅ |
| 24 variables cruzadas por señal | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| FED Macro + GDELT Geopolítica | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| 8 idiomas activos | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Precio mensual | $9.99 | $14 | $9.99 | $19+ | $5 (Gold) | $24.000/año |
| 7 mercados globales | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Mobile + Web + Desktop | ✅ | App only | App only | Web only | App+Web | Desktop pro |

Fuente: `RESEARCH_MKT.md` ya tiene los 19 competidores analizados con todos estos datos. **Cero invento posible — está documentado.**

### Punto 9 — Disclaimer + "Lo que NO SOMOS" más prominente
**Fernando dijo:** "también bien claro en un lugar el DISCLAIMER y lo que NO SOMOS".

**Acción:** el bloque 11 actual (disclaimer) está al final, chico, italic, color tenue. **Hay que:**
- Hacerlo más visible (bloque dedicado con borde dorado, no nota al pie)
- Agregar lista explícita "Lo que NO SOMOS":
  - ❌ No somos un broker
  - ❌ No ejecutamos operaciones
  - ❌ No manejamos tu dinero
  - ❌ No damos asesoramiento financiero
  - ❌ No somos una app de señales de compra/venta
  - ❌ No somos solo para crypto
  - ❌ No reemplazamos a tu broker — lo complementamos

Fuente: `PLAN_MKT.md` v3.0 sec 1.1 "Lo que AUREX no es" — texto ya escrito.

### Punto 10 — Banner ticker tipo "eventos críticos" con info constante
**Fernando dijo:** "podríamos tener como un banner que tenemos de eventos críticos que pase info constante... ejemplo reseñas de clientes o calificaciones o info que vos creas conveniente".

**Acción:** sumar **ticker horizontal scrolleable** (estilo banner de Eventos Críticos de la app) con:
- Reseñas reales App Store / Play Store cuando empiecen a llegar (hoy producción tiene 0 reviews)
- Métricas en vivo: "350 active assets" / "8 languages" / "7 markets" / "Real-time data"
- Próximos eventos económicos (FED, CPI) — datos del backend `aurex-backend`
- Featured logos de medios cuando lleguen press releases (placeholder por ahora)

Posicionamiento: justo después del Hero (entre B2 y B3), full-width, altura 50px, scroll suave continuo CSS animation.

---

## 2. Aportes adicionales de Code (sugerencias técnicas)

Más allá de los 10 puntos de Fernando, propongo estos 5 puntos extras que mejoran la landing sin alejarse del feedback:

### Sugerencia Code-1 — Hero con imagen real (no solo texto)
El hero actual es 100% texto. Para sumar profundidad visual + cumplir "imagen real" del Punto 2 de Fernando: agregar a la derecha del tagline una **composición visual** con:
- Mockup de iPhone con captura real del Tab Mercados o IA Señales (Build 33).
- Detrás del mockup, primer asomo del fondo constelación dorada.
- Sobre el mockup, badge animado "Live" con dot verde pulsante.

### Sugerencia Code-2 — Botones App Store / Google Play con badges oficiales
Hoy son `<a class="btn">` con texto plano. Reemplazar por **badges oficiales** descargados de:
- App Store: `https://developer.apple.com/app-store/marketing/guidelines/` (PNG/SVG oficial)
- Google Play: `https://play.google.com/intl/en_us/badges/` (PNG/SVG oficial)

Genera más confianza visual + es lo que ven en cualquier landing pro.

### Sugerencia Code-3 — Sección "Cómo funciona" (3 pasos)
Sumar bloque entre los Banners y Portfolio:
1. **Descargá AUREX** (3s) — iOS / Android / Web
2. **Elegí tu mercado** (10s) — 350 activos, 9 tipos, 7 mercados globales
3. **Recibí tus señales** (instantáneo) — 24 variables analizadas, listas en tiempo real

Onboarding visual que explica el flujo en 30 segundos.

### Sugerencia Code-4 — Métricas Live arriba del Footer
Counter animado con datos del backend en tiempo real:
- "X activos analizados ahora"
- "Y señales generadas hoy"
- "Z usuarios activos esta semana"

Refuerza credibilidad + datos reales (no marketing fluff). Backend `aurex-backend` ya expone esos números via endpoints.

### Sugerencia Code-5 — Modo claro/oscuro toggle en header
Aunque el sistema de identidad oficial es dark-first, dar al usuario la opción de cambiar a claro puede aumentar conversión en ciertos horarios/regiones. La PWA ya tiene modo claro implementado — replicar la paleta para la landing.

**Tensión:** el `CONSOLIDADO_MKT_LANDING_v2` decidió "dark mode fijo por coherencia con identidad visual oficial". Ofrecer toggle es cambio de scope. Lo dejo como sugerencia para que decidan Escritorio + Fernando.

---

## 3. Estructura propuesta v2 (orden vertical revisado)

| # | Bloque | Estado v1 | Cambio v2 |
|---|---|---|---|
| 1 | Header sticky | ✅ | Cambiar nav (Channels), corregir logo, selector idioma ya OK |
| 2 | Hero | ✅ texto | Sumar imagen mockup iPhone + composición visual |
| 2.5 | **TICKER ROLLING** info constante | ❌ NO existe | **Nuevo (Punto 10)** |
| — | **DIVISIÓN VISUAL DE FONDOS** | ❌ | **Zona A termina acá** |
| — | — | — | **Zona B (constelación dorada animada) arranca acá** |
| 3 | Entre vos y tu broker | ✅ | Aumentar contraste, mejorar diseño |
| 4 | Cobertura 350 activos | ✅ | Mejorar visual del grid (animaciones números contando) |
| 4.5 | **SCREENSHOTS APP** carrusel | ❌ NO existe | **Nuevo (Punto 6)** |
| 5 | Motor 24 variables | ✅ | Mejorar visual con iconografía |
| 5.5 | **CÓMO FUNCIONA 3 PASOS** | ❌ NO existe | **Nuevo (Code-3)** |
| 6 | 3 Banners tiempo real | ✅ | Mejorar visual + animación scroll |
| 7 | Portfolio inteligente | ✅ | Sumar mockup visual del Portfolio |
| 8 | 15 alertas | ✅ | Mejorar visual |
| 9 | 8 idiomas | ✅ | Banderas reales (no emojis) + animación |
| 10 | Planes | ✅ | Mejorar visual de los 3 cards |
| 10.5 | **BENCHMARK vs COMPETENCIA** | ❌ NO existe | **Nuevo (Punto 8)** |
| 11 | Disclaimer + Lo que NO somos | ⚠️ chico | **Hacer prominente + lista NO SOMOS (Punto 9)** |
| 11.5 | **MÉTRICAS LIVE** | ❌ NO existe | **Nuevo (Code-4)** |
| 12 | Footer | ✅ | Sumar links a redes (Channels) cuando estén activas |

**Resultado:** de 12 bloques a 17 bloques. Aumenta profundidad sin saturar.

---

## 4. Pendiente Escritorio (tu rol)

1. **Revisar este brief completo.** ¿Algo no representa bien lo que dijo Fernando?
2. **Sumar ideas superadoras** (Fernando pidió explícitamente).
3. **Decidir tensión Punto 5** — ¿linkeamos a redes vacías o "Coming soon"?
4. **Reescribir copy EN de Bloque 11** — "Lo que NO somos" lista explícita.
5. **Escribir copy EN del nuevo Bloque 8 (Benchmark)** — la tabla. Fuente: `RESEARCH_MKT.md`.
6. **Definir copy EN del Ticker (Bloque 2.5)** — ¿qué métricas + en qué orden + cuántas frases rotativas?
7. **Validar las 5 sugerencias Code** — ¿adentro de v2 o quedan para v3?

---

## 5. Plan ejecución v2 (post-Escritorio + OK Fernando)

| # | Acción | Quién | Tiempo |
|---|---|---|---|
| 1 | Code reemplaza logo inventado por oficial `aurex_logo_transparent.svg` | Code | 5 min |
| 2 | Code implementa fondo constelación dorada animada (Zona B) | Code | 1-2 hs |
| 3 | Code captura las 6 screenshots de la app Build 33 via adb | Code | 30 min |
| 4 | Code sume Ticker rolling (Bloque 2.5) | Code | 30 min |
| 5 | Code sume bloque Screenshots App (Bloque 4.5) | Code | 30 min |
| 6 | Code sume bloque Cómo funciona 3 pasos (Bloque 5.5) | Code | 20 min |
| 7 | Code sume bloque Benchmark (Bloque 10.5) con tabla | Code | 30 min |
| 8 | Code rework Bloque 11 con "Lo que NO somos" prominente | Code | 20 min |
| 9 | Code sume Métricas Live (Bloque 11.5) | Code | 30 min |
| 10 | Code cambia nav header a "Channels" + decide "Coming soon" vs link | Code | 10 min |
| 11 | Code reemplaza botones download por badges oficiales App Store/Play | Code | 15 min |
| 12 | Code sume mockup iPhone en Hero (composición visual) | Code | 45 min |
| 13 | Code mejora general de diseño visual (Punto 2 Fernando — "no más plano") | Code | 1-2 hs |
| 14 | Smoke test local + screenshot Playwright para validación Fernando | Code | 15 min |
| 15 | OK visual Fernando | Fernando | 5 min |
| 16 | Generar traducciones a los 7 idiomas restantes via Claude API | Code | 30 min |
| 17 | Commit + push + verify live | Code | 10 min |
| **TOTAL ejecución v2** | | | **6-9 hs** |

---

## 6. Acceso para Escritorio

- Raw GitHub: `https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/LANDING_v2_FEEDBACK_FERNANDO_16MAY.md`
- Con bypass cache: agregar `?nocache=<timestamp>`.

**Esperando tu input antes de tocar UN solo archivo de código.**

---

**Fin v1 de este brief.** Próxima versión cuando llegue feedback de Escritorio + decisiones pendientes (sec 4).
