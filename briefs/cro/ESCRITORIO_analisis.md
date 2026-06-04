# 📊 CRO Cobrex — ANÁLISIS DE ESCRITORIO (contexto de mercado)

> **Última actualización:** 03-jun-2026 — Escritorio
> Análisis autónomo e independiente. Marcado: **[DATO]** (fuente verificada) · **[HIPÓTESIS]** (a confirmar con datos de Code).
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

## E) LOGIN OBLIGATORIO — ANÁLISIS DE FRICCIÓN EN EL FUNNEL

> Sección agregada 03-jun-2026. Pregunta: ¿hay datos de usuarios que bajaron la app y no completaron el registro? ¿Qué ventaja tiene el login obligatorio?

### E.1) Flujo real del código — DATO verificado en App.js build36

**[DATO] Código fuente leído directamente: briefs/iap_audit_18may/code_snapshot_build36/App.js**

Flujo real confirmado:

    Boot → SplashView (mínimo 2s)
      → ¿'aurex_onboarding_done' en AsyncStorage?
          NO → OnboardingScreen (4 slides)
                  → botón principal → SignupScreen (mail + contraseña + confirmación)
                  → "Ya tengo cuenta" → LoginScreen
          SÍ → ¿JWT válido local? → si no → refreshSession() → si falla → LoginScreen
               si sí → biometría? → Face ID → RootNavigator (app)
      → Build 36: post-login, plan=FREE → SubscriptionScreen (fromLogin:true)
                  → "Continuar FREE" o "Saltar ✕" → Mercados

**Hallazgo [DATO]:** el login se pide DESPUÉS del onboarding de 4 slides ✅. Correcto en términos de timing.

**Problema de fricción acumulada:** un usuario nuevo hace 4 pasos antes de ver funcionalidad real:
1. Ver 4 slides de onboarding
2. Llenar formulario manual (mail + contraseña + confirmación) — SIN SSO
3. Ver pantalla de planes
4. Recién entonces: acceder a Mercados

### E.2) Por qué el login es necesario (no eliminar)

**[DATO] Justificaciones técnicas verificadas en el código:**

1. **RevenueCat identity:** sin email registrado, RC usa $RCAnonymousID. Al reinstalar o cambiar dispositivo, se pierde el estado de suscripción. Con login: Purchases.logIn(user.id) post-auth → identity estable.

2. **Persistencia de alertas:** guardadas en Supabase vinculadas al user.id. Sin cuenta, no hay recuperación cross-device.

3. **Push notifications:** token FCM/APNs se registra en backend post-login (registerForPushNotifications(s.user.id)). Sin login = sin push persistentes.

4. **Retención:** el email es el único canal directo para recuperar usuarios churned.

**Conclusión: el login obligatorio es estructuralmente necesario. No se puede eliminar sin rediseñar el backend.**

### E.3) El problema real: cómo se pide el registro

**[DATO] Código actual (SignupScreen.js verificado):** solo mail + contraseña + confirmación manual. Sin Sign in with Apple. Sin Google Sign-In. No hay SSO en ninguna pantalla.

**[DATO] Benchmarks drop en registro:**
- Signup solo con mail+contraseña manual: drop **40–60%** en el paso
- Con Apple/Google SSO como opción primaria: drop baja a **15–25%**
- Fuentes: AppsFlyer Mobile App Trends 2024, UXCam onboarding benchmarks

**[HIPÓTESIS] Estimación conservadora:** de 100 installs → 60 completan onboarding → 25–35 abandonan en el formulario de mail → ~30% del total de installs nunca llega a usar la app.

### E.4) Preguntas para Code — datos reales necesarios

Datos que Code debe completar en CODE_analisis.md o CONSOLIDADO:

1. ¿Evento "signup_started" vs "signup_completed" en Firebase/Supabase? → % que inician y no completan.

2. En RevenueCat → Customers: ¿qué % tiene $RCAnonymousID vs UUID Supabase real? → Si anonymous > 30%, hay usuarios que usan la app sin registrarse (o bug IAP-1).

3. ¿Cuántos usuarios en tabla Supabase 'usuarios' vs total de installs acumulado? → Gap = instalaron pero no completaron registro.

4. ¿Sign in with Apple o Google Sign-In en roadmap Build 39 o posterior? → Del código confirmo que hoy NO existen.

5. En Android: ¿mismo flow que iOS (mail+contraseña manual)? ¿hay Google Sign-In nativo?

6. ¿El OnboardingScreen trackea "slide_N_viewed"? → Para saber en qué slide abandona el usuario.

### E.5) Diagnóstico independiente

El login obligatorio **está bien ubicado** en el flujo (post-onboarding). El problema no es cuándo se pide sino cómo: formulario manual de mail + contraseña es la versión más friccionante del registro.

Agregar **Sign in with Apple como opción principal** en iOS resolvería la mayor parte del problema con 1 tap, sin tocar la arquitectura de identidad (Supabase OAuth acepta Apple/Google nativamente). Es la mejora de mayor impacto/esfuerzo del funnel.

Este análisis es solo diagnóstico. Cualquier cambio se decide con OK de Fernando en etapa de CRO activo.

---

## 🔎 Otros datos relevados

- **[DATO]** RevenueCat soporta geo-pricing nativo sin cambios de código.
- **[DATO]** Build 36: "Continuar FREE" y "Saltar ✕" en paywall post-login → respeta Apple 3.1.2. ✅
- **[DATO]** In-app review (Build 39 plan v3) = camino más directo para resolver el 1 rating.
- **[HIPÓTESIS]** Mercado AR es el caso más urgente para geo-pricing: cepo + salario relativo + competencia gratuita local.

---

> **Para Code cuando leas esto:** cruzá con CODE_analisis.md y generá CONSOLIDADO_CRO_v2.md. Las preguntas de la sección E.4 son las más urgentes — necesito datos reales de Supabase/RC para cuantificar el drop en registro.
