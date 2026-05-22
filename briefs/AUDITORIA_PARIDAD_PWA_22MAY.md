# 🔍 AUDITORÍA DE PARIDAD — PWA (app web) vs APP NATIVA (Android 1.0.36 / iOS 1.0·32)

> **Fecha:** 22-may-2026 (madrugada AR) · **Estado:** v1 (auditoría de CÓDIGO completa de las 6 tabs; validación VISUAL pendiente — ver §Método).
> **Objetivo:** que la PWA (`aurex.live/app/`) tenga PARIDAD funcional con la app nativa, porque la landing dice que es la misma experiencia.
> **Fuentes:** app nativa `~/AurexApp/src/screens/*` + `lib/*`; PWA `aurex-app/app/index.html` + `app/aurex-features.js`.
> **Para Escritorio:** raw URL `https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/AUDITORIA_PARIDAD_PWA_22MAY.md`

---

## 0. RESUMEN EJECUTIVO

- **La estructura ya está a la par:** la PWA tiene las mismas 6 tabs que el celular (Portfolio · Mercados · Watchlist · IA · Alertas · Perfil) y mucha funcionalidad replicada con alta fidelidad.
- **🔴 GAP CRÍTICO TRANSVERSAL — Gating por plan NO se aplica en la web.** En la app nativa los límites FREE/PRO/ELITE se respetan (candados 🔒, `PlanLimitModal`, backend `403 plan_limit_reached`). En la PWA, en varias pantallas el usuario FREE accede a todo sin límite (agregar activos ilimitados, ver features PRO/ELITE). **Esto rompe la monetización web** → prioridad #1.
- **Gaps de features importantes:** falta "Cómo usar AUREX" (Perfil), "Mis Alertas" historial (Alertas), flujo real Telegram/Push en la tab Alertas, menú Ordenar (Watchlist), filtro favoritos (Mercados).
- **Diferencias de plataforma esperadas (NO son gaps):** la web cobra por PayPal vs IAP de las tiendas; push web vs push nativo; biometría solo en nativa.

---

## 1. TAB IA (motor de señales) — paridad alta
**Gaps (falta en web):**
1. **Sin gating por plan en el detalle de la señal.** La nativa oculta con 🔒: motivos/justificación (PRO), variables del modelo RSI/MACD (ELITE), contexto tendencia 24h/7d/30d (PRO). La PWA muestra TODO a cualquiera → pérdida de upsell.
2. Falta botón 🔔 (campana → Mis Alertas) y ⚖️ (aviso legal) en el header de IA.
3. Falta render de sub-dirección ALCISTA/BAJISTA dentro de señales ALTA CONV-IA.
4. Bug menor: ternario de volatilidad en `varDefs` mal formado.

## 2. TAB ALERTAS — replica lo visual, falta lo funcional
**Gaps (falta en web):**
1. **Fila de canales Telegram/Push ausente** (solo hay banner WhatsApp cosmético). Falta el switch Telegram con flujo real (validar teléfono → deep-link `/start` → polling `telegram_chat_id` en Supabase) y el registro real de Push.
2. **Sin "Mis Alertas" (historial):** no lee `alertas_historial`, no hay marcar leídas/borrar, badge no-leídas ni BellButton.
3. **Umbrales hardcodeados** (prob 75 / variación 5%) — la nativa tiene inputs editables por alerta.
4. **Sin gating por plan** en los toggles (faltan candados 🔒 PRO/ELITE + modal).
5. Sin sub-selector de watchlists para el scope.

## 3. TAB MERCADOS — paridad alta
**Gaps (falta en web):**
1. Falta toggle **"Solo favoritos"** (la nativa filtra; la web tiene favoritos pero no el filtro).
2. Pin de favoritos arriba en orden default (verificar).
3. **Gating del Pulse por plan** (FREE→paywall al abrir variables) — no se halló en la web.
4. Banner de eventos críticos: confirmar marquesina animada (en web parece estático).

## 4. TAB PORTFOLIO — 🔴 gap crítico de plan
**Gaps (falta en web):**
1. **🔴 El límite de plan NO se aplica.** `addPortfolioItem` hace POST directo a Supabase REST, salteando el backend que valida `403 plan_limit_reached`. Un usuario FREE puede agregar activos ILIMITADOS (debería ser máx 5). No existe `PlanLimitModal`.
2. Add/edit/delete van directo a Supabase, no al backend con JWT (inconsistencia de validación).
3. Upsell banner genérico, no contextual a portfolio (la nativa usa copy específico).
4. "Sumar" en dedupe guarda solo en localStorage, no PATCH al backend (se pierde al recargar).

## 5. TAB WATCHLIST — paridad alta
**Gaps (falta en web):**
1. Falta el menú **"Ordenar"** (7 criterios: hoy/7d/30d/prob/señal/ticker).
2. **Sin límite de listas por plan** (`wlCreateList` inserta directo, sin chequear `watchlistMax`; FREE debería toparse).
3. Falta botón 🔔 "crear alerta puntual" por activo (en la web solo está dentro del modal detalle).

## 6. TAB PERFIL — falta la guía
**Gaps (falta en web):**
1. **🔴 Falta "Cómo usar AUREX" (bloque b3b):** la guía completa de las 6 tabs + Planes (claves i18n `cu_*` ya existen en `aurex-i18n.js`). Es el gap de contenido más grande.
2. Acceso biométrico: nativa funcional, web como SOON (aceptable como stub web).
3. Mail de soporte: unificar a `support.aurex.live@gmail.com` (hoy muestra `app.aurex@gmail.com`).

---

## PRIORIDADES SUGERIDAS (para ajustar una por una)
1. **🔴 Gating por plan en toda la PWA** (Portfolio, Alertas, IA, Watchlist, Mercados-Pulse) — comercial, lo más urgente.
2. **"Cómo usar AUREX"** en Perfil (reusar i18n `cu_*`).
3. **Alertas:** canales Telegram/Push reales + "Mis Alertas" historial + umbrales editables.
4. **IA:** gating en detalle + botones header.
5. Menores: filtro favoritos (Mercados), Ordenar (Watchlist), sub-direcciones, bugs.

---

## MÉTODO Y PENDIENTE DE VALIDACIÓN VISUAL
- ✅ Auditoría de **código**: 6 tabs comparadas (este documento).
- ✅ Captura **nativa Portfolio** obtenida del simulador iOS (iPhone 16).
- ⏳ **Capturas visuales de las otras 5 tabs (nativa) + las 6 de la PWA logueada:** PENDIENTE. La navegación automática del simulador requería `idb`, que no se pudo instalar (necesita Command Line Tools de Xcode 26.3, descarga de varios GB). Se completará con otra herramienta o capturas asistidas. La auditoría de código ya identifica los gaps accionables; el visual servirá para confirmar detalles de UI (lección del modal "Crear alerta", que solo se vio en el simulador).
