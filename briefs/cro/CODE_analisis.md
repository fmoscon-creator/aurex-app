# 🛠️ CRO Cobrex — ANÁLISIS DE CODE (datos duros)

> Análisis independiente de Code (datos del producto). Escrito **sin mirar** `ESCRITORIO_analisis.md` (independencia). Marco **[DATO]** (verificado por API/código) vs **[A-VERIFICAR]**.
>
> **Última actualización:** 03-jun-2026 (primer pase)

---

## 1. EMBUDO REAL — medido (solo usuarios REALES, excluidas 12 cuentas de prueba)

| Etapa | Reales | Fuente | Caída |
|---|---|---|---|
| **Instalaciones** | **77** (iOS 33 + Android 44) | [DATO] ASC Sales + Google Play | — |
| **Se registraron** (cuenta Supabase, NO prueba) | **36** | [DATO] Supabase `usuarios` (48 total − 12 prueba). ✅ coincide exacto con los 36 de RevenueCat | de 77 → 36: **~41 no entraron** (muro de registro obligatorio; install≠RC son sistemas distintos, 41 aprox.) |
| **Crearon ≥1 alerta** (función CENTRAL) | **1** | [DATO] Supabase `alertas` distinct user_id real | **35 de 36 NUNCA usaron la función principal** ← fuga más grande |
| **Agregaron al portfolio** | **6** | [DATO] Supabase `portfolio` distinct user_id real | (se usa más que las alertas) |
| **Pagaron un plan** | **0** reales | [DATO] todos los 36 reales están en FREE; el único pago/ELITE es cuenta de prueba de Fernando | — |

**Contexto:** total customers RC ~320 (~284 anónimos = testing/sandbox, NO reales). Ratings AR 4.8★(8) / US 5★(1) → bien valorado por quien lo usa. `alertas_disparadas` histórico = 58 (casi todo de testers).

### Lectura preliminar de Code (HIPÓTESIS, no conclusión)
- **Fuga #1 — Muro de registro obligatorio.** ✅ VERIFICADO EN CÓDIGO (`App.js`): registro (mail+contraseña, Supabase) **obligatorio**; sin modo invitado/skip. Flujo: splash → onboarding → si no hay sesión → Login/Signup; solo con sesión se llega a `'app'`. Hipótesis: pedir cuenta ANTES de mostrar valor frena a quien solo quería probar (77 → 36).
- **🔴 Fuga #2 — ACTIVACIÓN (la más grande): registrarse → usar la función central.** **De 36 reales, solo 1 creó una alerta** (portfolio: 6). **Ahora explicado por el código (§2.b):** crear una alerta exige **2-3 pasos sin guía** (agregar activo al portfolio → tocar la campana 🔔 → completar el form); no hay pantalla de "crear alerta" ni atajo desde Mercados; el onboarding (§2.d) no empuja a hacerlo. Por eso arman portfolio pero no llegan a la alerta. **La fuga NO empieza en el precio — empieza en la activación.** Si nadie pone una alerta y la ve funcionar, el precio es irrelevante.
- **🔴 Fuga #2-bis — Paywall ANTES del valor (§2.c):** al registrarse, el FREE ve el paywall **automático** (`App.js:244`) antes de usar nada → se le pide pagar sin haber vivido el producto. Sospecha fuerte de fricción temprana.
- **Fuga #3 — Precio/oferta:** queda como tercer eslabón, hoy casi inobservable porque casi nadie llega activado. 0 pagos reales sobre 36. (Acá entran los precios tentativos a evaluar — útiles, pero no mueven la aguja si no se resuelve la activación primero.)
- **Caveats honestos:** muestra chica (36 reales) → 1 vs 6 son números absolutos bajos · "creó alerta" puede sub-contar levemente si alguien creó y borró (la fila desaparece) · la heurística de "cuenta de prueba" (emails con test/aurex/demo/fmoscon) es aproximada, pero el cuadre con los 36 de RC la respalda · el volumen sigue siendo la palanca #1.

---

## 2. ONBOARDING + PAYWALL + GATING (auditoría de código) — ✅ HECHO

### 2.a Matriz FREE / PRO / ELITE (verificada en código)
Backend `server.js:1760` (`PLAN_LIMITS`) + frontend `src/lib/usePlan.js:22` (espejo).
| Capacidad | FREE | PRO | ELITE |
|---|---|---|---|
| Activos en Portafolio | **5** | ∞ | ∞ |
| Watchlists (cantidad) | **1** | ∞ | ∞ |
| Tipos de alerta | 6 básicos (precio) | 15 (+ IA/macro) | 16 (+ geopolítica) |
| **Cantidad de alertas** | **SIN límite** | sin límite | sin límite |
| Señales IA / día | 3 | ∞ | ∞ |
| WhatsApp / día | 0 | 3 | 10 |
| Telegram alertas | ✗ | ✓ | ✓ |
| API access | ✗ | ✗ | ✓ |

- **FREE SÍ puede crear alertas de precio** (umbral, precio_objetivo='precio', variacion_brusca='porcentaje', max_min, apertura, rsi_extremo). El gating es por **TIPO**, no por cantidad. Lo bloqueado a FREE: alertas avanzadas IA/macro (alta_conviccion_ia, cambio_zona_pulse, earnings, fed_fomc, geopolitica_gdelt, etc.).

### 2.b Cómo se crea una alerta (SOLO 2 caminos)
- 🔔 campana de un activo en **Portafolio** (`PortfolioScreen.js:966` → `AlertCreateModal`).
- 🔔 campana de un activo en **Watchlist** (`WatchlistScreen.js:977` → `AlertCreateModal`).
- **NO hay pantalla dedicada de crear alerta** (`MisAlertasScreen` solo lista el histórico disparado).
- **Desde Mercados NO se crea alerta directo**: tap en un activo → se agrega al Portafolio (`PortfolioScreen.js:222`), recién ahí aparece la campana.
- ⇒ **Para crear 1 alerta hacen falta 2-3 pasos** (agregar activo → tocar campana → completar form), sin guía. **Explica que portfolio (6 reales) > alertas (1 real):** arman portfolio pero no dan el paso de la campana.

### 2.c Paywall — cuándo aparece (`SubscriptionScreen.js`)
- 🔴 **AUTOMÁTICO apenas te registrás, si sos FREE** (`App.js:244`, solo en `SIGNED_IN`, no en boot con sesión) → **paywall ANTES de usar/ver valor.** Anti-patrón clásico.
- Al chocar un límite duro (6º activo portfolio / 2ª watchlist / alerta avanzada) → backend 403 `plan_limit_reached` → `PlanLimitModal` → paywall (`AlertCreateModal.js:164`, `server.js:1382/1474/1565`).
- Tap voluntario en `UpsellBanner` (Mercados/Perfil).

### 2.d Onboarding (`OnboardingScreen.js`)
- 4 slides de **storytelling** (ícono 3D + título + subtítulo i18n). Último slide: "Empezar gratis" → Signup / "Ya tengo cuenta" → Login.
- **NO guía a crear la primera alerta ni a usar ninguna feature.** Post-onboarding: Signup → (paywall si FREE) → Mercados, con el Portafolio vacío.

### 2.e Tracking disponible
Solo se guardan en Supabase las acciones que escriben en BD (alertas, portfolio, watchlist/s, items). **NO se trackea:** ver pantallas (Mercados), búsquedas, taps sin completar, tocar la campana sin terminar el form, abrir el paywall. → "fue a Mercados / clickeó un activo / long-press" **NO es medible** sin tracking de eventos (no existe hoy).

---

## 3. PRECIOS REALES EN TIENDAS + GEO-PRICING — PENDIENTE
[A-VERIFICAR] Extraer los **precios actuales reales** publicados (PRO/ELITE, mensual/anual, por país) vía RevenueCat offerings / ASC / Google Play androidpublisher. Confirmar:
- ¿Cuánto cuesta hoy cada plan? (de memoria PRO mensual = US$9.99 → la propuesta de Fernando baja PRO a 5.99 y mueve ELITE a 9.99).
- ¿Hay hoy precio único global o ya hay diferenciación por país?
- ¿Qué permite cada tienda de geo-pricing (tiers por país)?

**Propuesta tentativa de Fernando a comparar:** PRO $5.99/mes · $57.50/año · ELITE $9.99/mes · $95.90/año (−20% anual).

---

## 5. 🐛 BUG "usuarios fantasma" — VERIFICADO por Code (endpoint `/api/cro-ghosts`)
Confirmado el hallazgo de Escritorio. **Solo lectura, NO se tocó nada.**
- **92** `auth.users` · **48** `usuarios` · **44 fantasmas** (auth sin fila en `usuarios`): **29 reales** + 15 prueba.
- Creados: **Mar 13 · Abr 21 · May 10 · Jun 0** → venía hace meses, pico abril; no aparece en junio (pero junio casi no tuvo altas).
- **38 de 44 con `last_sign_in_at`** → personas reales que vuelven a entrar.
- **Actividad de los fantasma:** alertas 0 · **portfolio 23 filas / 7 usuarios distintos** · watchlist 0. → **7 usaron la app** (agregan al portfolio con su user_id de auth) pese a no tener fila `usuarios`.
- **Impacto:** a esos 7 la app funciona parcial (portfolio sí), pero sin fila `usuarios` no tienen plan/identidad backend → fallan plan/gating/Telegram. Reconciliación embudo: signups reales ≈ **65** (36 con fila + 29 fantasma), no 36.
- **CAUSA RAÍZ (alta confianza, verificada en código + datos):** la fila `usuarios` se crea por un **self-heal de 2 capas** (agregado en "Build 19"):
  - *Capa 1* (`SignupScreen.js:76`): POST `/api/usuario` **solo si `data.session`** (= confirmación de email OFF). Como la confirmación está ON (`SignupScreen.js:101` "te enviamos un email"), al registrarse NO hay sesión → **Capa 1 se saltea**.
  - *Capa 2* (`usePlan.js:50`): si el GET del plan da 404, crea la fila y reintenta — pero **solo corre cuando la persona entra a la app con un build que tenga el fix**.
  - Datos: **32/44 confirmaron mail**, **12 no** (nunca entraron); **último login Mar/Abr/May, 0 en junio**. → Los 44 son **backlog histórico (Mar–May)** de cuando el heal no existía/fallaba; no volvieron con un build nuevo para auto-repararse.
- **¿Sigue pasando? NO parece.** Cero fantasmas creados o con login en junio → el código actual ya auto-repara los signups nuevos. Es un **lote histórico para limpiar 1 vez**, no una canilla abierta.
- **Fix permanente robusto (recomendado):** un **trigger de Postgres en `auth.users`** que cree la fila `usuarios` (plan FREE) al instante del signup, independiente de que la app vuelva a abrirse. Elimina la dependencia del self-heal del cliente. → así NUNCA se repite.
- **Heal batch** (crear las filas de los 44 con plan FREE + created_at del auth): seguro como limpieza one-time. Decisión: ¿los 44 o solo los 32 confirmados? **Ambas cosas (trigger + heal) escriben en BD → con OK de Fernando.** Nada tocado aún.

## 6. 📉 SIN ANALYTICS DE EVENTOS — verificado
`package.json`: están `@react-native-firebase/app` + `/messaging` (push) pero **NO `/analytics`**; cero `logEvent` en `src/`. → El drop DENTRO del onboarding/signup (qué slide, signup_started vs completed) **no es medible hoy**. Agregar `@react-native-firebase/analytics` es low-friction (Firebase ya integrado para push) pero es dependencia nativa → va en un build.

## 4. PRÓXIMOS PULLS DE CODE (en orden)
1. ✅ **HECHO** — Embudo real medido (usuarios reales + activación alertas/portfolio), separando cuentas de prueba. Endpoint `/api/cro-funnel`.
2. Auditar **onboarding + paywall** en el código de la app (qué muestra el onboarding antes del muro · cuándo/cómo aparece el paywall · gating por plan). → ayuda a entender la fuga #2 (por qué no se activan).
3. Extraer **precios reales por país** + capacidades de geo-pricing.
4. (Idea) ¿el onboarding/app empuja a crear la primera alerta? Si no hay un "primer alerta guiada", explica la fuga de activación.
