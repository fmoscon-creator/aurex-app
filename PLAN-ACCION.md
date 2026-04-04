# AUREX — PLAN DE ACCION APP STORE
**Actualizado: 4 de Abril 2025**
**Objetivo: Submit al App Store antes del 25 de Abril**

---

## SEMANA 1 — hasta el 9 de Abril (EN CURSO)
- [x] Pulir las 4 tabs existentes
- [x] Resolver todos los bugs pendientes
- [x] Generar iconos de la app (15 tamaños iOS en assets/icons/)
- [ ] Completar tab Alertas UI en la PWA

**Estado:** En progreso — Alertas pendiente

---

## SEMANA 2 — 10 al 16 de Abril
- [ ] Decidir e implementar Stripe (incluir ahora o dejar para v2)
- [ ] Screenshots para App Store en iPhone 6.7" (1290x2796px)
- [ ] Preparar metadata App Store: descripcion, keywords, categoria

---

## SEMANA 3 — 17 al 24 de Abril
- [ ] Comprar cuenta Apple Developer ($99/anio)
- [ ] Configurar Xcode, certificados y App ID
- [ ] Instalar entorno React Native
- [ ] Iniciar migracion PWA a React Native

---

## 25 de Abril en adelante
- [ ] React Native completo
- [ ] Submit al App Store

---

## REGLAS DE TRABAJO
1. NUNCA tocar logica, colores ni estilos generales sin analizar antes
2. Screenshot obligatorio antes de reportar cualquier cosa como OK
3. Un paso a la vez — verificar en browser, luego confirmar en iPhone
4. Informar SHA completo de cada commit
5. NUNCA reportar tick verde si se ve mal en el browser
6. Responder SIEMPRE en espanol, detallado y ordenado

---

## STACK TECNICO
- PWA: HTML + JS + Supabase Auth
- Backend: Railway (cron jobs, alertas)
- Supabase URL: https://dklljnfhlzmfsfmxrpie.supabase.co
- Repo: https://github.com/fmoscon-creator/aurex-app
- App live: https://aurex.live

---

## HISTORIAL DE COMMITS CLAVE
| SHA | Descripcion |
|-----|-------------|
| 06395666 | fix: comillas boton Cancelar compartir |
| a56ce7e0 | fix: 52w DOGE+cripto, compartir, conversor centrado |
| a2dd5ac1 | fix: compartir portfolio Mail-WhatsApp-Telegram |
| d736200c | fix: popup busqueda Mercados con precio 24h 7d IA |
| f705ca5e | fix: eliminar doble signo dolar Stable & DeFi |
| 3836f652 | feat: foto de perfil con camara y localStorage |
| 161d7fcd | feat: iconos app AUREX todos los tamaños iOS |
