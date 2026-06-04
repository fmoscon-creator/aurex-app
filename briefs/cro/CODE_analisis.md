# 🛠️ CRO Cobrex — ANÁLISIS DE CODE (datos duros)

> Análisis independiente de Code (datos del producto). Escrito **sin mirar** `ESCRITORIO_analisis.md` (independencia). Marco **[DATO]** (verificado por API/código) vs **[A-VERIFICAR]**.
>
> **Última actualización:** 03-jun-2026 (primer pase)

---

## 1. EMBUDO REAL — primer pase

| Etapa | Valor | Fuente | Caída |
|---|---|---|---|
| **Instalaciones** | **77** (iOS 33 + Android 44) | [DATO] ASC Sales + Google Play | — |
| **Entraron a la app (pasaron el muro de registro)** | **36** | [DATO] RevenueCat customers no-anónimos = tienen sesión Supabase | ~41 de 77 **no entraron** (nunca abrieron la app, o abandonaron en onboarding/registro) |
| **Activación (creó ≥1 alerta / usó)** | **?** | [A-VERIFICAR] Supabase (tabla alertas) | ? |
| **Vio el paywall** | **?** | [A-VERIFICAR] ¿se trackea? (el "276" viejo era del Sheet manual 30-may) | ? |
| **Pagó alguna vez** | **2** | [DATO] RevenueCat | — |
| **Suscripción activa** | **1** (prueba propia de Fernando, Play Store, `will_not_renew`) | [DATO] RevenueCat | — |

**Contexto:** total customers RC ~320, de los cuales ~284 son anónimos ($RCAnonymousID, testing/sandbox/sesiones sin login — NO son usuarios reales). MRR $9. Ratings AR 4.8★(8) / US 5★(1) → producto bien valorado por quien lo usa.

### Lectura preliminar de Code (HIPÓTESIS, no conclusión)
- **Fuga #1 candidata — Muro de registro obligatorio.** ✅ VERIFICADO EN CÓDIGO (`App.js`): el registro (mail+contraseña, Supabase) es **obligatorio**; NO hay modo invitado ni "explorar sin cuenta". Flujo: splash → onboarding → si no hay sesión → Login/Signup; solo con sesión válida se llega a `'app'`. → Hipótesis: forzar crear cuenta ANTES de mostrar valor frena a quien solo quería "probar". De 77 installs, 36 entraron; ~41 no. ⚠️ install (App Store/Play) y "36" (RC) son sistemas distintos → el 41 no es exacto; + para saber si rebotan en el onboarding o en el registro falta tracking de eventos.
- **Fuga #2 candidata — Valor → Pago:** de 36 que entraron, solo 2 pagaron alguna vez. Con muestra de 36 NO se puede afirmar que el paywall "falla" (estadísticamente indistinguible de conversión normal con poca gente).
- **Caveat madre:** el volumen sigue siendo la palanca #1. Esto es para tener la máquina lista, no para concluir con 36 usuarios.

---

## 2. ONBOARDING + PAYWALL (auditoría de código) — EN CURSO
- ✅ **Registro obligatorio confirmado** (`App.js`): splash → onboarding → **muro Login/Signup** (Supabase mail+contraseña) → `'app'` solo con sesión. **Sin modo invitado/skip.** Archivos: `OnboardingScreen.js`, `LoginScreen.js`, `SignupScreen.js`, `navigation/RootNavigator.js`.
- [A-VERIFICAR pendiente] El onboarding: ¿cuántas pantallas y qué muestra (vende valor antes del muro)? · cuándo se dispara el **paywall** (al abrir / tras usar / por gating de tipo de alerta) · qué muestra (planes, precios, trial) · gating por plan (FREE 5 alertas / PRO 14 / ELITE 15 según memoria — confirmar).

---

## 3. PRECIOS REALES EN TIENDAS + GEO-PRICING — PENDIENTE
[A-VERIFICAR] Extraer los **precios actuales reales** publicados (PRO/ELITE, mensual/anual, por país) vía RevenueCat offerings / ASC / Google Play androidpublisher. Confirmar:
- ¿Cuánto cuesta hoy cada plan? (de memoria PRO mensual = US$9.99 → la propuesta de Fernando baja PRO a 5.99 y mueve ELITE a 9.99).
- ¿Hay hoy precio único global o ya hay diferenciación por país?
- ¿Qué permite cada tienda de geo-pricing (tiers por país)?

**Propuesta tentativa de Fernando a comparar:** PRO $5.99/mes · $57.50/año · ELITE $9.99/mes · $95.90/año (−20% anual).

---

## 4. PRÓXIMOS PULLS DE CODE (en orden)
1. Embudo: contar usuarios reales en Supabase (tabla `usuarios`) + activación (tabla `alertas`) → completar etapas 3-4.
2. Auditar onboarding + paywall en el código de la app.
3. Extraer precios reales por país + capacidades de geo-pricing.
