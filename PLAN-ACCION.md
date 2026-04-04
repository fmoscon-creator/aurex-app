# AUREX — PLAN DE ACCION APP STORE
**Actualizado: 4 de Abril 2025**
**Objetivo: Submit al App Store antes del 25 de Abril**

---

## SEMANA 1 — hasta el 9 de Abril
### Foco: Pulir las 4 tabs, bugs, iconos
| Dia | Tarea | Estado |
|-----|-------|--------|
| Lun 4 Abr | Pulido tab Mercados: barra busqueda con precio/24h/7d/objetivo IA | COMPLETO |
| Lun 4 Abr | Fix doble signo dolar Stable & DeFi (USDC, DAI) | COMPLETO |
| Lun 4 Abr | Fix foto de perfil con camara y localStorage | COMPLETO |
| Lun 4 Abr | Generar iconos app AUREX — 15 tamaños iOS en assets/icons/ | COMPLETO |
| Lun 4 Abr | Fix compartir Portfolio Mail/WhatsApp/Telegram distribuidos | COMPLETO |
| Lun 4 Abr | Fix 52 semanas DOGE y otras cripto | COMPLETO |
| Lun 4 Abr | Fix velocidad ticker EVENTO CRITICO (6s) | COMPLETO |
| Lun 4 Abr | Fix boton X IA (44x44px), logo Telegram SVG | COMPLETO |
| Mar 5 - Mie 9 Abr | Confirmar en iPhone que todo funciona impecable en las 4 tabs | PENDIENTE |
| Mie 9 Abr | Cierre Semana 1 — 4 tabs listas para App Store | PENDIENTE |

**NOTA: Alertas y Watchlist se construyen MIENTRAS Apple revisa el primer submit (puede tardar 1-2 semanas). NO bloquean el submit.**

---

## SEMANA 2 — 10 al 16 de Abril
### Foco: Stripe + Screenshots + Metadata App Store

| Dia | Tarea | Detalle |
|-----|-------|---------|
| Jue 10 Abr | Decision Stripe | Implementar Stripe en PWA para cobrar suscripciones desde dia 1. Stripe cobra 2.9%+0.30 por transaccion, sin comision Apple ya que es PWA. Plan: FREE (gratis) y PREMIUM ($9.99/mes o $79/año) |
| Jue 10 Abr | Configurar cuenta Stripe | Crear cuenta en stripe.com, activar modo live, crear productos/precios |
| Vie 11 Abr | Implementar Stripe en la PWA | Boton "Ver planes" en tab Perfil lleva a checkout. Stripe Checkout hosted (sin codigo complejo). Al pagar, Supabase actualiza el plan del usuario |
| Vie 11 Abr | Webhook Stripe → Supabase | Cuando pago confirmado, actualizar campo plan en tabla users de Supabase |
| Sab 12 Abr | Probar flujo completo pago en iPhone | Verificar que al pagar el plan cambia de FREE a PREMIUM en la app |
| Dom 13 Abr | Screenshots App Store iPhone 6.7" | Tomar 5-6 capturas de pantalla en simulador o browser en 1290x2796px. Una por cada tab principal mas una de bienvenida |
| Lun 14 Abr | Metadata App Store | Nombre: AUREX. Subtitulo: Senales IA para inversores. Descripcion: 170 palabras en español e ingles. Keywords: finanzas, inversiones, señales, cripto, acciones. Categoria: Finanzas |
| Mar 15 Abr | Preparar App Store Connect | Subir iconos, screenshots, metadata, descripcion, URL privacidad |
| Mie 16 Abr | Revision y cierre Semana 2 | Todo listo para cuando React Native este compilado |

---

## SEMANA 3 — 17 al 24 de Abril
### Foco: Xcode + React Native + Build

| Dia | Tarea | Detalle |
|-----|-------|---------|
| Jue 17 Abr | Cuenta Apple Developer | COMPLETO — ya adquirida |
| Jue 17 Abr | Configurar Xcode | Instalar Xcode 15+, aceptar licencias, instalar simuladores iPhone |
| Jue 17 Abr | Generar certificados iOS | Distribution certificate + Provisioning Profile en Apple Developer portal |
| Jue 17 Abr | Crear App ID en Apple Developer | Bundle ID: com.aurex.app, activar Push Notifications y In-App Purchase |
| Vie 18 Abr | Instalar entorno React Native | Node.js, React Native CLI, CocoaPods. Crear proyecto base: npx react-native init AurexApp |
| Vie 18 Abr | Migrar PWA a React Native — estructura base | Configurar navegacion entre tabs (React Navigation). Implementar WebView para reutilizar logica existente o migrar componente a componente |
| Sab 19 Abr | Migrar tab Portfolio a React Native | Pantalla principal con lista de activos, precios en tiempo real, termometro riesgo |
| Dom 20 Abr | Migrar tab Mercados a React Native | Lista cripto/acciones/ETF, barra busqueda con popup detalle, AUREX Pulse |
| Lun 21 Abr | Migrar tab IA Senales a React Native | Lista de 300 senales, filtros, detalle con grafico, compartir |
| Mar 22 Abr | Migrar tab Perfil a React Native | Auth Supabase, foto perfil, plan, configuracion |
| Mie 23 Abr | Build de prueba en simulador iPhone | Compilar en Xcode, verificar todas las tabs, probar en simulador 6.7" |
| Jue 24 Abr | Build en dispositivo fisico (iPhone de Fernando) | Instalar via TestFlight o cable USB, verificar funcionamiento real |

---

## SEMANA 4 — 25 de Abril en adelante
### Foco: Alertas + Watchlist + Submit

| Dia | Tarea | Detalle |
|-----|-------|---------|
| Vie 25 Abr | Submit version 1.0 al App Store | Subir build desde Xcode a App Store Connect, completar review info, usuario demo para Apple |
| Vie 25 Abr | Implementar tab Alertas UI | Conectar con backend Railway. Crear alerta de precio (por encima/debajo de valor). Listar alertas activas. Eliminar alerta. Notificacion push cuando se dispara |
| Lun 28 Abr | Implementar tab Watchlist UI | Lista de activos favoritos con precio en tiempo real. Agregar/quitar activos. Ordenar por rendimiento |
| Mie 30 Abr | Update a version 1.1 | Submit actualizacion con Alertas y Watchlist completas |

---

## ESTADO ACTUAL
- Cuenta Apple Developer: COMPLETO
- 4 tabs PWA pulidas: COMPLETO
- Iconos app (15 tamaños): COMPLETO
- Bugs resueltos y confirmados iPhone: COMPLETO
- Stripe: PENDIENTE semana 2
- Screenshots App Store: PENDIENTE semana 2
- Metadata App Store: PENDIENTE semana 2
- React Native: PENDIENTE semana 3
- Alertas UI: PENDIENTE semana 4
- Watchlist UI: PENDIENTE semana 4

---

## STACK TECNICO
- PWA: HTML + JS vanilla + Supabase Auth
- Backend alertas: Railway (cron job cada 5min)
- DB: Supabase (PostgreSQL)
- Pagos: Stripe (por implementar)
- Supabase URL: https://dklljnfhlzmfsfmxrpie.supabase.co
- Repo: https://github.com/fmoscon-creator/aurex-app
- App live: https://aurex.live

---

## REGLAS DE TRABAJO — INAMOVIBLES
1. NUNCA tocar logica, colores ni estilos generales sin analizar primero
2. Screenshot obligatorio en el chat antes de reportar cualquier cosa como OK
3. Un paso a la vez — verificar en browser, luego confirmar en iPhone
4. Informar SHA completo de cada commit
5. NUNCA poner tick verde si se ve mal en el browser
6. Responder SIEMPRE en español, detallado y ordenado
7. Analizar TODO el problema antes de escribir una sola linea de codigo
8. Un solo commit que resuelve todo — no commits intermedios rotos
