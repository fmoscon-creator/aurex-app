# AUREX APP

**App de senales financieras con IA — App Store Abril 2025**

Live: https://aurex.live

---

## PLAN DE ACCION — VER DETALLE COMPLETO EN [PLAN-ACCION.md](./PLAN-ACCION.md)

| Semana | Fecha | Estado |
|--------|-------|--------|
| Semana 1 | hasta 9 Abril | En curso — falta Alertas UI |
| Semana 2 | 10-16 Abril | Stripe + Screenshots + Metadata |
| Semana 3 | 17-24 Abril | Apple Developer + Xcode + React Native |
| Submit | 25 Abril+ | App Store |

---

## ARQUITECTURA — 3 REPOS

| Repo | Qué es | Deploy | URL |
|------|--------|--------|-----|
| `fmoscon-creator/aurex-app` (este) | PWA (HTML+JS) | GitHub Pages | https://aurex.live |
| `fmoscon-creator/aurex-backend` | Backend Node.js API | Railway auto-deploy | https://aurex-app-production.up.railway.app |
| `fmoscon-creator/AurexApp` | App nativa iOS | Xcode → App Store | App Store |

**IMPORTANTE:** El backend NO vive en este repo. Vive en `aurex-backend` (repo separado). Railway deploya desde ahí. Ver `DEPLOY.md` en ese repo para instrucciones.

## STACK
- PWA: HTML + JS + Supabase Auth
- Backend: Node.js + Express (repo `aurex-backend`)
- DB: Supabase
- WhatsApp: Evolution API (Railway)
- iOS: React Native (repo `AurexApp`)
