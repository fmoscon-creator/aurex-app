# REVIEW ESCRITORIO — PLAN IAP TIER 1 BUILD 34
> Fecha: 16-may-2026
> Autor: Escritorio (Claude Desktop)
> Documento revisado: PLAN_IAP_TIER1_BUILD34_16MAY.md

## VEREDICTO GENERAL

El plan es solido. Los 5 cambios estan bien especificados con codigo real y son quirurgicos. Apruebo con 1 correccion obligatoria y 1 observacion.

---

## CORRECCION OBLIGATORIA

### IAP-6 — deleteAccount en PerfilScreen.js (faltante en el plan)

El documento menciona en las notas de IAP-4: "tambien revisar deleteAccount (L253) — agregar mismo Purchases.logOut() antes de signOut() ahi para consistencia".

Esto esta bien identificado pero queda como nota informal, no como cambio del plan. Si se implementa IAP-4 sin IAP-6, un usuario que elimina su cuenta NO desidentifica RC antes de cerrar sesion, lo que puede dejar el UID Supabase atado a RC indefinidamente.

IAP-6 debe ser un cambio explicito del plan:

ID: IAP-6
Archivo: src/screens/PerfilScreen.js L253 (funcion deleteAccount)
Cambio: agregar Purchases.logOut() ANTES de supabase.auth.signOut() en el flujo de deleteAccount, identico al IAP-4 en logout regular.
Tipo: Frontend RN

---

## OBSERVACION (no bloquea)

### Orden de implementacion — Backend primero es correcto

El plan propone implementar IAP-5 (backend) primero, luego frontend. Coincido. Pero agrego: el deploy de IAP-5 a Railway debe validarse con un webhook de prueba antes de implementar el frontend. Si el Telegram alert no llega, hay que investigar antes de seguir. No asumir que el deploy automatico de Railway implica que el webhook funciona.

---

## CONFIRMACIONES

- Los 5 cambios (IAP-1 a IAP-5) son correctos en logica y en codigo propuesto.
- Los try/catch defensivos en todos los puntos son correctos — app no se rompe si RC falla.
- El orden boot → login → signup → logout es el correcto para garantizar cobertura completa.
- La validacion end-to-end con compra real (no License Tester) es la unica forma de confirmar — correcto.
- Plan B documentado — correcto tenerlo listo.
- Dependencia con Build 33 en Produccion Android antes de validar — correcto.

---

## PROXIMOS PASOS PARA CODE

1. Agregar IAP-6 al plan (deleteAccount en PerfilScreen).
2. Commitear plan actualizado al repo.
3. Esperar OK Fernando sobre el plan completo (IAP-1 a IAP-6).
4. Implementar backend IAP-5 primero + validar webhook Telegram antes de frontend.
5. Luego frontend IAP-1 a IAP-6 en un solo commit.
6. Compilar AAB Build 34 + Internal Testing.
7. Validar compra real en Samsung.
