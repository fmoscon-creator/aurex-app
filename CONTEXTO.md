# CONTEXTO DEL PROYECTO AUREX
> Documento para retomar el trabajo con Claude (o cualquier colaborador) de forma inmediata.
> Última actualización: 27 de Marzo de 2026

---

## 1. QUÉ ES AUREX

**Aurex** es un Portfolio Tracker con IA orientado al mercado hispanohablante (LATAM).
- App web (PWA) desplegada en: https://fmoscon-creator.github.io/aurex-app
- Fundador: Fernando G. Moscón (fmoscon@gmail.com)
- Repo GitHub: https://github.com/fmoscon-creator/aurex-app
- Usuario GitHub: fmoscon-creator

**Propuesta de valor:** La única app de portfolio tracker con IA en español, enfocada en LATAM, con alertas activas y señales de mercado. 2-5x más barata que Bloomberg o TradingView.

**Planes:**
- FREE: funciones básicas
- PRO: $9.99/mes (o $7.99 anual)
- ELITE: $15.99/mes

---

## 2. STACK TÉCNICO

| Componente | Tecnología |
|---|---|
| Frontend | HTML + CSS + JS Vanilla (sin frameworks) |
| Hosting | GitHub Pages (gratis, deploy automático) |
| CI/CD | GitHub Actions (.github/workflows/static.yml) |
| Datos cripto | Binance WebSocket (tiempo real, gratis) |
| Datos acciones | Actualmente estáticos — Fase 3: Polygon.io $79/mes |
| IA señales | Claude API (Anthropic) — $0.003/1K tokens |
| PWA | manifest.json + service-worker.js (ya implementados) |
| Backend (futuro) | Node.js en Railway — Fase 3 |
| Auth (futuro) | Google OAuth + Firebase — Fase 2/3 |
| Pagos (futuro) | Stripe — Fase 2 |

---

## 3. ESTRUCTURA DE ARCHIVOS

```
aurex-app/
├── index.html              ← APP PRINCIPAL (todo el frontend aquí, ~1793 líneas)
├── aurex-features.js       ← Features adicionales (constelación estrellas obs1, etc.)
├── manifest.json           ← PWA manifest
├── service-worker.js       ← Push notifications (base)
├── aurex_perfil.html       ← Pantalla de perfil separada
├── aurex_simbolos_v2.html  ← Sistema de símbolos visuales
├── Aurex — Sistema de Identidad Visual v1.0.html  ← Brand guidelines
├── backend/                ← Servidor Node.js (Fase 3, en construcción)
│   └── Procfile
├── .github/workflows/      ← GitHub Actions CI/CD
└── README.md
```

**Archivo principal:** `index.html` — Contiene las 6 tabs, toda la lógica, estilos inline y scripts. Es un monolito intencionado para simplicidad de deploy.

---

## 4. LAS 6 TABS DE LA APP

1. **Mercados** — 7 categorías, precios en tiempo real via Binance WebSocket, sparklines
2. **Portfolio** — Header con PnL, distribución, 11 activos configurables
3. **Watchlist** — Buscador, reordenar, timeframes 24h/7d/1m/1a
4. **IA Señales** — Señales con justificación IA, filtros, escenarios temporales
5. **Alertas** — Alertas por %, sugeridas IA, compartir WA/TG/Mail
6. **Perfil** — Planes FREE/PRO/ELITE, modo claro/oscuro, seguridad

---

## 5. ESTADO ACTUAL Y FASES

### FASE 1 — COMPLETADA (Marzo 2026)
- ✅ App en producción con todas las features
- ✅ 6 tabs funcionales
- ✅ Datos cripto en tiempo real
- ✅ IA Señales con Claude API
- ✅ PWA (manifest + service worker)
- ✅ 45+ acciones USA estáticas
- ✅ Modo claro/oscuro
- ✅ iOS/Safari optimizado

### FASE 2 — EN CURSO (Abril 2026)
- 🔄 Semana 5: Primeros 50 usuarios — Plausible Analytics ($9/mes)
- 🔄 Semana 6: Top 5 mejoras UX por feedback
- 🔄 Semana 7: Redes sociales (Instagram + TikTok)
- 🔄 Semana 8: Stripe + Google OAuth — objetivo 10 usuarios PRO

### FASE 3 — PLANIFICADA (Mayo-Junio 2026) — $2,000 est.
- Backend Node.js en Railway
- Push notifications (Firebase)
- App Store (Apple Developer $99/año)
- Telegram Bot @AurexBot
- Polygon.io para acciones USA RT ($79/mes)

### FASE 4 — PLANIFICADA (Jul-Sep 2026) — $8,000 est.
- AppStack SDK (Lucas Moscón — appstack.tech) para EAC
- Meta Ads + TikTok Ads con atribución 90%+
- Plan B2B $199/mes (asesores, family offices)
- API pública REST
- Acciones LatAm (BYMA, B3, BMV, BCS)
- Objetivo: 500+ usuarios, primer empleado cuando MRR > $5,000

### FASE 5 — FUTURO (2027) — $50,000+ est.
- App nativa iOS (React Native o Swift)
- Equipo contratado
- API vendida a terceros

---

## 6. HITOS CLAVE

| Hito | Estado | Fecha est. |
|---|---|---|
| App en producción | ✅ COMPLETADO | 25 Mar 2026 |
| Primer usuario pago | 🔄 PRÓXIMO | Abr-May 2026 |
| App en App Store | 📋 PLANIFICADO | Jun-Jul 2026 |
| 100 usuarios PRO ($1k MRR) | 📋 PLANIFICADO | Ago-Sep 2026 |
| Break even (~600 PRO, $6k/mes) | 📋 PLANIFICADO | Dic 2026 |
| Primer contrato B2B | 📋 PLANIFICADO | Q1 2027 |

---

## 7. INTEGRACIÓN APPSTACK (Lucas Moscón)

AppStack (appstack.tech) = infraestructura de user acquisition para apps móviles.
- **Qué hace:** EAC (Enhanced App Campaigns) en Meta, TikTok y Google con atribución 90%+
- **CAC esperado:** $5-8 vs $15-25 con campañas tradicionales
- **LTV/CAC objetivo:** 8x a 25x
- **Fase de integración:** Semanas 17-18 (Fase 4)
- **Responsable campañas:** Lucas Moscón

---

## 8. COMMITS DE REFERENCIA IMPORTANTES

| Commit | Descripción | Estado |
|---|---|---|
| `358f83b` | "fix: obs2 display none correcto" — **VERSIÓN ESTABLE** | ✅ Funciona |
| `88e7d1c` | "fix: archivo completo scripts cerrados obs2 final" | ⚠️ Tenía bugs |

> **NOTA IMPORTANTE:** Si algo se rompe en index.html, la versión de referencia es el commit `358f83b`. 
> El contenido actual de main fue restaurado a ese commit el 27 de Marzo de 2026.

---

## 9. CÓMO RETOMAR EL TRABAJO CON CLAUDE

### Mensaje de inicio para nueva sesión:
```
Hola! Continuamos trabajando en Aurex.
Repo: github.com/fmoscon-creator/aurex-app
Estoy logueado como fmoscon-creator.
Lee el archivo CONTEXTO.md del repo para ponerte al día.
Hoy quiero [describir la tarea].
```

### Lo que Claude puede hacer directamente:
- Leer y editar archivos en el repo (index.html, etc.)
- Hacer commits via la interfaz web de GitHub
- Ver el estado de la app en producción
- Acceder a la API de GitHub con la sesión del browser

### Lo que necesitás tener listo:
- Estar logueado en github.com en el browser
- Descripción clara de qué querés hacer en esa sesión

---

## 10. CONTACTO Y CONTEXTO DE NEGOCIO

- **Fundador:** Fernando G. Moscón
- **Email:** fmoscon@gmail.com
- **App live:** https://fmoscon-creator.github.io/aurex-app
- **Competidores directos:** Bloomberg ($35/mes), TradingView ($15/mes), Yahoo Finance
- **Diferencial clave:** IA en español + LATAM + alertas activas + precio 2-5x menor
- **Mercado objetivo:** Inversores hispanohablantes en LATAM y España
