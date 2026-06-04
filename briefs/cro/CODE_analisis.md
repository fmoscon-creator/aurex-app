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
- **🔴 Fuga #2 — ACTIVACIÓN (la más grande): registrarse → usar la función central.** **De 36 reales, solo 1 creó una alerta.** Cobrex ES una app de alertas → 35 de 36 se registraron y nunca vivieron el valor central. Portfolio lo usaron 6. **Implicación clave: la fuga NO empieza en el paywall ni en el precio — empieza mucho antes, en la activación.** Si nadie llega a poner una alerta y verla funcionar, el precio es irrelevante. → Re-pensar precios importa, pero NO mueve la aguja si la gente no se activa primero.
- **Fuga #3 — Paywall/precio:** queda como tercer eslabón, pero hoy es casi inobservable porque casi nadie llega activado. 0 pagos reales sobre 36.
- **Caveats honestos:** muestra chica (36 reales) → 1 vs 6 son números absolutos bajos · "creó alerta" puede sub-contar levemente si alguien creó y borró (la fila desaparece) · la heurística de "cuenta de prueba" (emails con test/aurex/demo/fmoscon) es aproximada, pero el cuadre con los 36 de RC la respalda · el volumen sigue siendo la palanca #1.

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
1. ✅ **HECHO** — Embudo real medido (usuarios reales + activación alertas/portfolio), separando cuentas de prueba. Endpoint `/api/cro-funnel`.
2. Auditar **onboarding + paywall** en el código de la app (qué muestra el onboarding antes del muro · cuándo/cómo aparece el paywall · gating por plan). → ayuda a entender la fuga #2 (por qué no se activan).
3. Extraer **precios reales por país** + capacidades de geo-pricing.
4. (Idea) ¿el onboarding/app empuja a crear la primera alerta? Si no hay un "primer alerta guiada", explica la fuga de activación.
