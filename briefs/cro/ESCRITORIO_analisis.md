 📊 CRO Cobrex — ANÁLISIS DE ESCRITORIO (contexto de mercado)

> **Última actualización:** 03-jun-2026 — Escritorio
> Análisis autónomo e independiente. Marcado: **[DATO]** (fuente verificada) · **[HIPÓTESIS]** (a confirmar).
> **Regla madre: nada se cambia. Solo diagnóstico.**

---

## A) PRECIOS DE COMPETIDORES POR MERCADO

**Nuestros precios tentativos:** PRO **US$5.99/mes · US$57.50/año** · ELITE **US$9.99/mes · US$95.90/año** (−20% anual).

### 🇦🇷 Argentina (83% de usuarios — PRIORIDAD 1)

| Competidor | Plan free? | Precio mensual | Precio anual | Fuente |
|---|---|---|---|---|
| TradingView | ✅ | US$12.95 Essential / US$29.95 Plus / US$67.95 Premium | — | [DATO] Google SERP |
| Investing.com | ✅ | US$9.99 Pro / US$24.99 Pro+ | US$119.99 / US$299.99 | [DATO] App Store listing |
| Delta | ✅ | US$5.29 PRO | US$49.99 | [DATO] App Store listing |
| Cocos Capital | ✅ | GRATIS | GRATIS | [DATO] rankia.com.ar |
| IOL InvertirOnline | ✅ | GRATIS | GRATIS | [DATO] iol.com.ar |
| Binance | ✅ | GRATIS | GRATIS | [DATO] binance.com |

**Veredicto AR:** El usuario argentino NO compara Cobrex con TradingView. Su referencia real es Cocos e IOL, 100% gratuitos. US$5.99/mes compite contra "gratis" en su cabeza. El cepo agrava la fricción operativa. Necesita propuesta de valor muy clara o geo-pricing.

### 🌍 Otros mercados

| Mercado | Competidor ref | Su precio | PRO Cobrex | Posicionamiento |
|---|---|---|---|---|
| 🇺🇸 US | TradingView Essential | US$12.95/mes | US$5.99/mes | 54% más barato — ventaja clara |
| 🇧🇪 BE | TradingView / DEGIRO | US$12.95 / gratis | US$5.99/mes | Competitivo — Europa paga bien |
| 🇧🇷 BR | TradingView | US$12.95/mes | US$5.99/mes | OK — mayor poder adquisitivo que AR |
| 🇮🇳 IN | TradingView / Zerodha | US$12.95 / gratis | US$5.99/mes | Caro — geo-pricing recomendado |
| 🇳🇬 NG | TradingView / locales | US$12.95 / gratis | US$5.99/mes | Caro — geo-pricing recomendado |
| 🇵🇭 PH | TradingView | US$12.95/mes | US$5.99/mes | Justo pero sensible al precio |

---

## B) PODER ADQUISITIVO / CONTEXTO LOCAL

**[DATO] Argentina:** Salario mínimo jun-2026: ~$357.800 ARS ≈ USD 254. Cepo cambiario activo: fricción operativa real para pagar en USD. US$5.99/mes = ~2.4% del salario mínimo (vs ~0.3% en países desarrollados).

**[DATO] India:** Regional Price Calculator sugiere ~US$4.70/mes. Alta sensibilidad al precio.

**[DATO] Nigeria:** Regional Price Calculator sugiere ~US$3.50/mes. Alta elasticidad de precio.

**[DATO] US / Europa:** Sin restricciones de cambio, poder adquisitivo alto. US$5.99/mes es muy competitivo.

**[HIPÓTESIS]** Geo-pricing conviene para AR, IN, NG, PH. En US/EU mantener precio actual.

---

## C) BEST PRACTICES paywall / onboarding / pricing freemium

**[DATO] Benchmarks RevenueCat / AppsFlyer 2024:**
- Freemium con trial: conversión promedio **2.1%** instalaciones → pago
- Hard paywall sin trial: conversión **10.7%**
- Trial starts: **86% ocurren en las primeras 24hs** post-install
- Paywall contextual (usuario toca feature premium): convierte **5x más** que paywall al abrir
- Anchoring (mostrar plan caro primero): aumenta conversión del plan medio ~30%
- 2 planes pagos + 1 free tier = combinación óptima

**[DATO] Timing:** mejor momento = cuando el usuario intenta usar una feature premium. Trial 7 días convierte mejor que 14 en apps de finanzas.

**[HIPÓTESIS]** El paywall post-login inmediato (Build 36) es un paso en la dirección correcta, pero solo si el usuario vivió algún valor antes de ver el paywall.

---

## D) LECTURA DE UX (como usuario nuevo, desde afuera)

**Ficha App Store (app ID 6761672161, App Store US):**
- **1 rating** — bloqueador inmediato. Problema más urgente.
- **Categoría: Utilities** (no Finance) — menor visibilidad orgánica para búsquedas financieras.
- **Desarrollador: Fernando Moscon** (persona física) — genera desconfianza en apps financieras.
- **Descripción:** técnica, orientada a features. Falta gancho emocional orientado al resultado del usuario.

**Onboarding (verificado en código build36):**
- 4 slides → Login/Signup → paywall post-login (solo usuarios FREE)
- El usuario ve valor prometido antes de registrarse ✅
- Pero es valor prometido en imágenes, no experimentado ⚠️
- Al llegar al paywall, aún no usó ninguna funcionalidad real

**[HIPÓTESIS]** Falta que el usuario experimente al menos 1 acción de valor real antes de ver el paywall.

---

## E) LOGIN OBLIGATORIO — ANÁLISIS COMPLETO CON DATOS REALES

> Última actualización: 03-jun-2026. Datos de Supabase consultados directamente por Escritorio.
> Code confirmó: no hay SSO (Apple/Google Sign-In) — solo mail+contraseña (signInWithPassword/signUp).

### E.1) Flujo real — verificado en App.js build36

**[DATO] Código fuente: briefs/iap_audit_18may/code_snapshot_build36/App.js**

    Boot → SplashView (mínimo 2s)
      → ¿'aurex_onboarding_done' en AsyncStorage?
          NO → OnboardingScreen (4 slides)
                  → botón principal → SignupScreen (mail + contraseña + confirmación)
                  → "Ya tengo cuenta" → LoginScreen
          SÍ → ¿JWT válido local? → si no → refreshSession() → si falla → LoginScreen
               si sí → biometría? → Face ID → RootNavigator (app)
      → Build 36: post-login FREE → SubscriptionScreen → "Continuar FREE" o "Saltar ✕" → Mercados

**El login se pide DESPUÉS del onboarding de 4 slides ✅ — timing correcto.**

**Fricción acumulada para usuario nuevo:**
1. Ver 4 slides
2. Llenar formulario manual (mail + contraseña + confirmación) — SIN SSO confirmado
3. Ver pantalla de planes
4. Recién entonces: Mercados

### E.2) Por qué el login es necesario (no eliminar)

**[DATO] Justificaciones técnicas en el código:**
1. **RevenueCat identity:** sin login RC usa $RCAnonymousID — se pierde al reinstalar. Con login: Purchases.logIn(user.id) → identity estable.
2. **Persistencia de alertas:** guardadas en Supabase por user.id. Sin cuenta = sin recuperación cross-device.
3. **Push notifications:** token FCM/APNs se registra post-login (registerForPushNotifications). Sin login = sin push.
4. **Retención:** el email es el único canal propio para recuperar usuarios churned.

**Conclusión: el login obligatorio es estructuralmente necesario. No se puede eliminar.**

### E.3) Datos reales de Supabase — consultados por Escritorio el 03-jun-2026

**[DATO] Queries ejecutadas directamente en SQL Editor de Supabase:**

| Métrica | Valor | Fuente |
|---|---|---|
| auth.users total (completaron el formulario de mail) | **92** | SELECT COUNT(*) FROM auth.users |
| Tabla usuarios (tienen fila en backend) | **48** | SELECT COUNT(*) FROM usuarios |
| En auth SIN fila en tabla usuarios | **44** | LEFT JOIN con WHERE u.id IS NULL |
| Plan FREE | 47 | GROUP BY plan |
| Plan ELITE | 1 | GROUP BY plan |
| Plan PRO | 0 | GROUP BY plan |
| Primer registro | 28-mar-2026 | MIN(created_at) auth.users |
| Último registro | 03-jun-2026 | MAX(created_at) auth.users |

**Crecimiento mensual (auth.users):**
| Mes | Registros nuevos |
|---|---|
| Mar-2026 | 14 |
| Abr-2026 | 29 |
| May-2026 | 48 |
| Jun-2026 | 1 (mes en curso) |

### E.4) Qué son los 44 "usuarios fantasma" — diagnóstico crítico

**[DATO] Estos 44 usuarios:**
- **Sí completaron el formulario de mail** (existen en auth.users = pasaron el SignupScreen)
- **NO tienen fila en tabla usuarios** = el POST /api/usuario al backend falló o no se ejecutó
- Esto es la "Capa 1 self-heal" del SignupScreen.js: si el POST falla, se loguea un warning pero el usuario entra igual
- Pueden intentar loguearse pero el backend responde 404 en /api/usuario/:id → la app no sabe qué plan mostrarles

**Esto NO es drop por abandono del formulario** — esos 44 completaron el registro. Es un **bug técnico de sincronización** entre Supabase auth y el backend Railway.

**Impacto real:** 44 de 92 usuarios registrados (47.8%) tienen su backend roto. Si intentan usar la app, probablemente ven errores o la app los trata como FREE sin que quede registrado. Si alguno intentó pagar, RevenueCat puede no haberlos identificado correctamente (IAP-1).

### E.5) Lo que NO podemos medir desde Supabase

**[DATO] Drop pre-registro (abandono antes de completar el mail):**
Los usuarios que llegaron al formulario y NO lo completaron **nunca se crean en auth.users** → son invisibles para Supabase. Solo se pueden medir con analytics de onboarding (Firebase/eventos de pantalla).

**¿Cuántos son?** No lo sabemos. Con los benchmarks de la industria (40–60% de drop en signup manual sin SSO), si 92 completaron el mail, potencialmente había entre 92 y 220 usuarios más que lo intentaron y abandonaron.

**[DATO confirmado por Code]** No hay SSO (Sign in with Apple / Google Sign-In) — solo mail+contraseña manual. Esto maximiza el drop en el paso de registro.

### E.6) HALLAZGO CRÍTICO: no hay analytics de ningún tipo en la app

**[DATO] Verificado leyendo imports de App.js build36 + code_snapshot cobrex:**

Imports presentes: react-native-purchases (RevenueCat), supabase, notifee, react-native-biometrics, react-navigation, bootsplash, AsyncStorage.

**No existe ninguna librería de analytics de eventos:** ni Firebase Analytics, ni Mixpanel, ni Amplitude, ni Segment, ni PostHog, ni ninguna otra. Zero líneas de logEvent, trackEvent o track() en el código analizado.

**Consecuencia directa:** la app opera completamente a ciegas sobre el comportamiento del usuario. No sabe:
- En qué slide del onboarding abandona el usuario
- Cuántos llegan al formulario de registro vs cuántos lo abren
- Cuántos tocan "Crear cuenta" vs "Ya tengo cuenta"
- Cuánto tiempo pasa el usuario en cada pantalla
- Qué features usa más dentro de la app
- Por qué los usuarios no convierten a pago

**Lo único que se puede medir hoy:**
- Installs (App Store Connect / Play Console)
- Usuarios que completaron el mail (auth.users = 92)
- Usuarios que tienen backend activo (tabla usuarios = 48)
- Usuarios que pagaron (RevenueCat = 1 ELITE)

**Esto hace imposible hacer CRO real.** Sin saber dónde se rompe el funnel, cualquier cambio es a ciegas.

**Posición de Escritorio — qué se necesita agregar:**
Antes de tocar precio, paywall o SSO, hay que instrumentar eventos mínimos. Firebase Analytics es gratuito, se integra en React Native en menos de 1 día, y da visibilidad inmediata del funnel. Los eventos mínimos son:

    onboarding_slide_viewed (slide: 1|2|3|4)
    onboarding_completed (target: signup|login)
    signup_started
    signup_completed
    login_completed
    paywall_viewed (from: login|feature)
    paywall_dismissed
    paywall_converted

Con 2 semanas de datos tenés el funnel real y podés tomar decisiones de CRO con evidencia.

Esto no es CRO activo — es infraestructura de medición. Sin esto, el CRO es opinión, no dato.

### E.7) Diagnóstico y posición de Escritorio — resumen ejecutivo

**Hay TRES problemas en orden de prioridad:**

**Prioridad 1 — Bug técnico (hacer YA, antes de CRO):**
44 usuarios con auth pero sin fila en backend. Heal batch: insertar fila plan=FREE para cada auth.users sin match en tabla usuarios. No tiene sentido optimizar adquisición si casi la mitad de los usuarios que ya se registraron están rotos.

**Prioridad 2 — Infraestructura de medición (hacer antes de cualquier cambio de CRO):**
Agregar Firebase Analytics con los 8 eventos mínimos del funnel. Sin esto no se puede medir el impacto de ningún cambio de CRO. Tiempo estimado: 1 día de Code.

**Prioridad 3 — CRO activo (para cuando Fernando dé OK, con datos de Prioridad 2):**
- Sign in with Apple (iOS) / Google Sign-In (Android) → mayor reducción de drop en registro
- Revisar timing del paywall con datos reales de funnel
- Geo-pricing para AR, IN, NG, PH

Cualquier cambio se decide con OK de Fernando.

---

## 🔎 Otros datos relevados

- **[DATO]** RevenueCat soporta geo-pricing nativo sin cambios de código.
- **[DATO]** Build 36: "Continuar FREE" y "Saltar ✕" en paywall post-login → respeta Apple 3.1.2. ✅
- **[DATO]** In-app review (Build 39 plan v3) = camino más directo para resolver el 1 rating.
- **[HIPÓTESIS]** Mercado AR es el caso más urgente para geo-pricing: cepo + salario relativo + competencia gratuita local.
- **[DATO]** 1 solo usuario ELITE en toda la base (92 registrados). 0 PRO. Tasa de conversión a pago: 1/92 = 1.08%.

---

> **Para Code:** Leé secciones E.4, E.6 y E.7. Tres prioridades antes de CRO activo: (1) heal batch de 44 usuarios, (2) agregar Firebase Analytics con 8 eventos mínimos, (3) recién después tocar funnel. Confirmá también: ¿cuántos de los 44 tienen registros en tablas de alertas, activos o watchlist?
