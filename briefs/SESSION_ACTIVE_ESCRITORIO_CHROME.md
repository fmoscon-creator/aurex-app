# SESSION ACTIVE — Escritorio (Claude Desktop + Chrome)

URL fija: https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/SESSION_ACTIVE_ESCRITORIO_CHROME.md

Ultima actualizacion: 14-may-2026 ~20:00 AR

## ESTADO CRITICO ACTUAL

Build 19 FINAL en compilacion por CODE. Reemplaza Build 18 completo. NO subir nada a Play Console hasta que Fernando haga smoke test en Samsung real.

## QUE HICIMOS HOY

Bug P0 signup resuelto: SignupScreen nueva con auth.signUp + POST /api/usuario Capa 1 try/catch + Capa 2 auto-heal en usePlan con guards session y email. Supabase confirmado: cero triggers, endpoint POST idempotente verificado en server.js L1375.

Gating corregido segun lo publicado en Play Console y PWA Perfil (verificado por Escritorio con login real fmoscon@gmail.com):

- V1 Pulse Ver variables: FREE redirige, PRO ve 14 variables con pesos, ELITE ve todo mas analisis profundo e historial
- V2/V5 Panel IA: tiering 3 niveles, textos del copy publicado
- V3 Banner Mercados: eliminado
- V4 Banner Perfil: queda
- Z1 watchlistMax FREE: 1 confirmado
- Bug contadores Alertas: activeCount y denominadores corregidos para descontar bloqueados por plan
- PlanLimitModal: agregada X de cerrar arriba + texto "Ahora no" con mejor contraste

Smoke test emulador parcial completado: D1 background 90s pasa, D2 force-stop pasa, D3 pendiente Samsung real, cross-link validado por codigo.

## PENDIENTE DECISION URGENTE

Bug modal Agregar Activo: teclado decimal-pad tapa boton Guardar en Samsung. CODE tiene fix listo (ScrollView wrapper + returnKeyType + Keyboard.dismiss). Fernando debe decidir si va en este build o en Build 20. Es severidad equivalente al bug signup: usuario nuevo se registra OK pero no puede agregar su primer activo.

## PENDIENTE SMOKE TEST EN SAMSUNG REAL

- Signup email nuevo de cero
- Login tester existente
- Persistencia sesion D3 cold reboot
- Panel IA expandido FREE PRO ELITE
- Pulse Ver variables FREE PRO ELITE
- Modal Agregar Activo teclado y boton Guardar
- Banner Perfil visible, Mercados ausente

## PENDIENTE POST BUILD FINAL

- Trigger SQL Supabase defensa 3
- Fix Logout iOS y Android App.js
- Fix PerfilScreen gating plan nativo
- Regenerar imagenes onboarding slide 4
- Reply thread Apple Forum manana 15-may 9 AM AR (Escritorio lo publica)

## CARPETA BRIEFS

Path local: /Users/fernandomoscon/Desktop/aurex-app/briefs/

Archivos:
- BRIEF_AUREX_LATEST.md (29KB)
- SESSION_ACTIVE_ESCRITORIO_CHROME.md (3KB) — este archivo
- archive/

## REGLA DE USO

Si el contexto de Escritorio se compacta: leer SESSION_ACTIVE + BRIEF_AUREX_LATEST = recuperacion completa en 2 minutos.
