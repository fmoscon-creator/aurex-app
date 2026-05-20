# 🔍 ANÁLISIS COMPETIDORES — EVIDENCIA REAL (Playwright en vivo) — 19-may-2026 22:46 AR

> Fernando pidió evidencia real verificable antes de proponer fondos/diseños.
> Code abrió cada web con Playwright (con aviso previo), screenshot + inspección de código DOM real.
> Screenshots en `briefs/landing_v4_research/competidores_screenshots/`.

---

## 🏆 1. ROBINHOOD (tu favorito) — robinhood.com

**Screenshot:** `comp_robinhood_hero.jpg`

**Lo que vi (real):**
- Fondo **negro puro** (`rgb(0,0,0)`)
- Hero: serif gigante "Get a slice of $1,000,000" + imagen 3D de láminas doradas/madera a la derecha
- Tipografías: **Martina Plantijn** (serif, títulos) + **Capsule Sans Text** (body)

**Tecnología de las animaciones (inspección DOM real):**
| Elemento | Tecnología | Detalle |
|---|---|---|
| Hero "holder que se mueve" | **VIDEO `.webm`** (1920x1080) | Hosteado en Contentful CDN. NO es WebGL ni Lottie |
| "Join a new generation of investors" | **VIDEO loop** | Confirmado en DOM, es video animado |
| Imagen fallback | JPEG | Por si el video no carga |

**🟢 REPLICABLE para AUREX:** SÍ, fácil. Los videos `.webm` se pueden generar con IA (Runway/Pika/Sora) o con After Effects, y poner como `<video autoplay loop muted>` de fondo. Es la técnica más simple y la que mejor se ve.

---

## 2. STRIPE — stripe.com

**Screenshot:** `comp_stripe_hero.jpg`

**Lo que vi (real):**
- Fondo blanco + el famoso **gradient animado** (esquina superior derecha) morado/rosa/naranja/amarillo en movimiento fluido
- Sans-serif premium **Söhne** (sohne-var)
- Texto confirmado: **"La columna vertebral del comercio internacional"** ✅ (está más abajo, con un globe/mapa)
- Logos clientes: OpenAI, Amazon, NVIDIA

**Tecnología (inspección DOM real):**
| Elemento | Tecnología | Detalle |
|---|---|---|
| Gradient hero animado | **CANVAS WebGL** | clase `hero-wave-animation__canvas` — shader generativo, NO es imagen ni video |
| Globe "columna vertebral" | CANVAS WebGL | Globo 3D girando con arcos de conexión |
| Otras secciones | CANVAS | `agentic-graphic`, `issuing-graphic`, `money-movement-graphic` (cada una su canvas animado) |

**🟡 REPLICABLE para AUREX:** PARCIAL. El gradient WebGL de Stripe es famoso y hay librerías open-source que lo replican (`stripe-gradient.js` de Kevin Hufnagl). El globe 3D es más complejo (Three.js + datos de arcos). Posible pero más trabajo.

---

## 3. COINBASE — coinbase.com + /derivatives

**Screenshot:** `comp_coinbase_hero.jpg`

**Lo que vi (real):**
- Fondo blanco, "El futuro de las finanzas está aquí" sans-serif negro grande
- iPhone mockup azul con interface mostrando $33,683.80
- Fuente: **CoinbaseDisplay** (propia)
- Form email + Registrarse (azul Coinbase)

**Sobre el "infinito de futuros perpetuos" que mencionaste:**
- El home NO lo tiene — está en página aparte (`/derivatives` o `/advanced-trade`)
- La URL `/derivatives-trading/stock-perpetuals` que abrí resultó ser solo T&C (texto legal)
- La animación del infinito está en `/derivatives` (no la capturé aún — si querés la busco)

**Tecnología (inspección DOM real):**
| Elemento | Tecnología |
|---|---|
| Hero | Imágenes JPEG/PNG (Contentful CDN) + iPhone mockup estático |
| Animaciones derivatives | (pendiente capturar — está en /derivatives) |

**🟢 REPLICABLE:** SÍ. Coinbase usa mayormente imágenes + mockups (más simple que Stripe).

---

## 📊 PATRÓN COMÚN DE LOS 3 (lo que aprendí)

| Técnica | Quién la usa | Dificultad replicar | Para AUREX |
|---|---|---|---|
| **Video `.webm` loop de fondo** | Robinhood | 🟢 Fácil | ⭐ RECOMENDADO — mejor ratio impacto/esfuerzo |
| **Gradient WebGL animado** | Stripe | 🟡 Media (hay libs open-source) | Posible para hero |
| **Globe 3D Three.js** | Stripe | 🔴 Alta | Posible pero costoso |
| **Imágenes + mockups estáticos** | Coinbase | 🟢 Fácil | Ya lo tenemos (iPhone mockup) |
| **Serif premium grande** | Robinhood (Martina Plantijn) | 🟢 Fácil | AUREX ya usa serif (Boldonse — re-evaluar) |

---

## 🛠 SKILLS QUE VOY A USAR (confirmado)

| Skill | Para qué en este proyecto |
|---|---|
| **imagegen-frontend-web** | Generar el video/imágenes de fondo estilo Robinhood (assets propios AUREX) |
| **image-to-code** | Reproducir el gradient WebGL de Stripe en código si lo elegimos |
| **high-end-visual-design** | Reglas de spacing/typography/shadows premium |
| **brandkit** | Mantener dorado/verde/negro AUREX en todo |

---

## 🎯 PROPUESTA CONCRETA PARA AUREX (basada en evidencia)

**Dado que Robinhood es tu favorito y usa VIDEO loops** (lo más replicable):

**Opción recomendada — "AUREX estilo Robinhood":**
1. Fondo negro puro (ya lo tenemos)
2. Hero con **video loop** de fondo: gráficos financieros animados / velas japonesas / números fluyendo / globo de mercados (generado con IA o stock video)
3. Serif grande premium para títulos (revisar si Boldonse o cambiar a algo tipo Martina Plantijn)
4. La imagen del iPhone que ya tenés, pero con el video animado detrás

**Lo que necesito decidir con vos:**
1. ¿Querés que genere un video de fondo con IA (estilo abstracto financiero) o preferís buscar stock video real (Pexels/Coverr gratis)?
2. ¿El video va SOLO en el hero o también en otras secciones?
3. ¿Mantenemos el iPhone mockup o lo sacamos por el video?

---

## 📁 ARCHIVOS

- Screenshots reales: `briefs/landing_v4_research/competidores_screenshots/comp_{robinhood,stripe,coinbase}_hero.jpg`
- Mockups CSS abstractos previos (descartados): `briefs/landing_v4_research/mockups_hero/`

---

*Análisis con evidencia REAL capturada vía Playwright 19-may 22:46 AR. NO inventado — cada dato viene de inspección DOM en vivo de cada web.*
