# Sistema de reportes Cobrex — planteo para que Escritorio OPINE
**Fecha:** 01/06/2026 · **Para:** Escritorio · **Pide:** Fernando quiere tu opinión sobre cómo automatizar esto ANTES de avanzar.

---

## 0. El incidente de hoy (las 7 veces)
A Fernando le llegó **7 veces el mismo reporte** (búsqueda + ranking) al grupo de Telegram. **NO es el funcionamiento normal:** fue un error puntual de Code — al configurar, usó un comando que "probaba" el endpoint del reporte en un loop de espera, y cada intento del loop disparó un envío (~7 veces). El **cron real envía 1 sola vez por día**. No se repite.

## 1. Estado actual — DOS cosas desconectadas
**a) El Google Sheet `COBREX_DATA_MASTER`** (Drive /Cobrex/Analytics/): se llena **A MANO**. Hoy depende de que Escritorio entre a Play Console / ASC / RevenueCat en el navegador, lea los números y los escriba. Por eso **queda desactualizado** (tiene filas del 29 y 30/05 nomás). Nadie lo llena solo.

**b) El reporte de Telegram** (backend Railway, automático): **NO usa el Sheet.** Saca datos en vivo de la **API pública de Apple**, y por eso hoy SOLO trae: **posición en búsqueda iOS (AR/US) + ratings/estrellas**. No trae descargas, ni activos, ni Android, ni países. Es lo único que se puede sacar 100% automático sin credenciales.

→ **Resultado:** el Sheet (manual, completo pero viejo) y el reporte (automático pero limitado) están desconectados. Esa es la raíz de "la info nunca está actualizada".

## 2. Lo que Fernando QUIERE recibir (alcance objetivo)
Un reporte diario que traiga, **automático y al día**:
- **Descargas** y **usuarios activos**: iOS + Android (separados).
- **Apertura por país**: iOS y Android.
- **Totales (iOS+Android)** y **por país** con apertura iOS/Android.
- (Y lo que ya hay: ranking/búsqueda + reseñas + MRR/subs.)

## 3. Qué hace falta para que sea AUTOMÁTICO y COMPLETO
Las APIs oficiales (requieren credenciales que se generan UNA vez):
| Dato | Fuente | Credencial necesaria |
|---|---|---|
| Ranking búsqueda iOS + reseñas/ratings | API pública Apple | ninguna ✅ (ya funciona) |
| Descargas / activos / país **iOS** | **App Store Connect API** | API key (JWT) que se genera en ASC → Usuarios y accesos → Claves |
| Instalaciones / activos / país **Android** | **Google Play Developer API** | service account de Google Cloud + acceso en Play Console |
| MRR / suscripciones | **RevenueCat REST API** | API key (v2) de RevenueCat |

Con esas credenciales cargadas en el backend (Railway), el sistema:
- Consulta las APIs **1 vez por día** a la hora definida (propuesto 12:00 AR).
- Arma el reporte COMPLETO (descargas/activos/país/totales iOS+Android + ranking + reseñas + MRR).
- Lo manda a Telegram + (opcional) lo guarda en el Sheet/histórico.
- **Si una API falla**, el dato se marca "[sin dato]" — nunca se inventa.

→ Con esto **se elimina la carga manual del Sheet** (Escritorio deja de tener que cargarlo).

## 4. PREGUNTAS para Escritorio (tu opinión)
1. ¿Conviene ir a la **automatización por APIs** (sección 3) y jubilar la carga manual del Sheet, o ves razón para mantener el Sheet manual?
2. ¿Las APIs de **ASC (App Store Connect)** y **Google Play Developer** las podés vos generar/configurar desde el navegador (key ASC + service account Google), o necesitás algo de Fernando/Code?
3. ¿Qué **formato** te parece mejor para el reporte de Telegram (texto compacto vs imagen/tarjeta)? Telegram no renderiza tablas.
4. ¿Algún dato adicional que sumarías o quitarías del alcance (sección 2)?
5. ¿Cómo validarías que la info esté correcta cada día (algún cruce/control)?

**Code NO avanza hasta tu opinión** (pedido de Fernando).
