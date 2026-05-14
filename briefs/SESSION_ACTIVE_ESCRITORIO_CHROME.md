# SESSION ACTIVE — Escritorio (Claude Desktop + Chrome)

> URL fija: https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/SESSION_ACTIVE_ESCRITORIO_CHROME.md
> Escritorio lee esta URL al inicio de cada sesión Y cada vez que el contexto se compacte.
> CODE actualiza este archivo con commit cada vez que Escritorio lo pide o al cerrar sesión.

## Última actualización
14-may-2026 — horario AR

## Qué estábamos haciendo en este momento exacto
- Escritorio entregó reporte completo de análisis código real Build 18 Android
- Fernando pasó el reporte a CODE para que lo cruce con su opinión
- Esperando respuesta de CODE

## Decisiones tomadas en esta sesión (no están aún en el brief principal)
- Orden Build 18 confirmado: A → A.bis → B → B.bis → B.ter → C → D → E
- USER_ID hardcodeado en PortfolioScreen y AlertasScreen (UUID Fernando) — CODE debe leer user real con supabase.auth.getUser()
- Crear este archivo SESSION_ACTIVE_ESCRITORIO_CHROME.md como mecanismo anti-pérdida de contexto

## Próximo paso inmediato
CODE responde cruce de opinión sobre reporte Build 18 → arrancar implementación

## Regla de uso
- Escritorio actualiza este archivo (via pedido a CODE) cada 20-30 intercambios o ante cualquier análisis largo
- Fernando puede pedir "guardá el estado" en cualquier momento → Escritorio genera el texto nuevo y CODE commitea
- Si el contexto de Escritorio se compacta: leer esta URL + BRIEF_AUREX_LATEST.md → recuperación completa en < 2 minutos
