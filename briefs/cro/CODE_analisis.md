# 🛠️ CRO Cobrex — ANÁLISIS DE CODE (datos duros)

> Análisis independiente de Code (datos del producto). Escrito **sin mirar** `ESCRITORIO_analisis.md` (independencia). Marco **[DATO]** (verificado por API/código) vs **[A-VERIFICAR]**.
>
> **Última actualización:** 03-jun-2026 (primer pase)

---

## 1. EMBUDO REAL — primer pase

| Etapa | Valor | Fuente | Caída |
|---|---|---|---|
| **Instalaciones** | **77** (iOS 33 + Android 44) | [DATO] ASC Sales + Google Play | — |
| **Usuarios identificados (login)** | **36** | [DATO] RevenueCat (customers no-anónimos) | de 77 → 36 = **~47% registra** (53% no) |
| **Activación (creó ≥1 alerta / usó)** | **?** | [A-VERIFICAR] Supabase (tabla alertas) | ? |
| **Vio el paywall** | **?** | [A-VERIFICAR] ¿se trackea? (el "276" viejo era del Sheet manual 30-may) | ? |
| **Pagó alguna vez** | **2** | [DATO] RevenueCat | — |
| **Suscripción activa** | **1** (prueba propia de Fernando, Play Store, `will_not_renew`) | [DATO] RevenueCat | — |

**Contexto:** total customers RC ~320, de los cuales ~284 son anónimos ($RCAnonymousID, testing/sandbox/sesiones sin login — NO son usuarios reales). MRR $9. Ratings AR 4.8★(8) / US 5★(1) → producto bien valorado por quien lo usa.

### Lectura preliminar de Code (HIPÓTESIS, no conclusión)
- **Fuga #1 candidata — Install → Registro:** ~53% no se registra. Hay que ver en el código si el onboarding obliga a login antes de mostrar valor.
- **Fuga #2 candidata — Valor → Pago:** de 36 identificados, solo 2 pagaron alguna vez. Con muestra de 36 NO se puede afirmar que el paywall "falla" (estadísticamente indistinguible de conversión normal con poca gente).
- **Caveat madre:** el volumen sigue siendo la palanca #1. Esto es para tener la máquina lista, no para concluir con 36 usuarios.

---

## 2. ONBOARDING + PAYWALL (auditoría de código) — PENDIENTE
[A-VERIFICAR] Leer en `~/AurexApp/src`: el flujo de onboarding (¿cuántas pantallas? ¿pide login al inicio o deja explorar?), cuándo se dispara el paywall (al abrir / tras usar / por gating de tipo de alerta), qué muestra (planes, precios, trial), y qué gatea cada plan (FREE 5 alertas / PRO 14 / ELITE 15 según memoria — confirmar).

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
