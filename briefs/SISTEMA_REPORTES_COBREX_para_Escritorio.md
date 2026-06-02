# Sistema de reportes Cobrex — planteo para que Escritorio OPINE
**Fecha:** 01/06/2026 · **Para:** Escritorio · **Pide:** Fernando quiere tu opinión sobre cómo automatizar esto ANTES de avanzar.

---

## 0. El incidente de hoy (las 7 veces)
A Fernando le llegó **7 veces el mismo reporte** (búsqueda + ranking) al grupo de Telegram. **NO es el funcionamiento normal:** fue un error puntual de Code — al configurar, usó un comando que "probaba" el endpoint del reporte en un loop de espera, y cada intento del loop disparó un envío (~7 veces). El **cron real envía 1 sola vez por día**. No se repite.

## 1. Estado actual — DOS cosas desconectadas
**a) El Google Sheet `COBREX_DATA_MASTER`** (Drive /Cobrex/Analytics/): se llena **A MANO**. Hoy depende de que Escritorio entre a Play Console / ASC / RevenueCat en el navegador, lea los números y los escriba. Por eso depende de Escritorio (hoy tiene **4 filas: 29/05, 30/05, 31/05, 01/06** — Escritorio lo viene cargando a mano). Carga manual = se desactualiza si no se hace todos los días.

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

---

## 5. ✅ DECISIONES ACORDADAS (Escritorio opinó 01-jun) + correcciones técnicas

**Decisión: ir a la automatización por APIs.** El Sheet queda como **histórico/análisis**, pero el **backend lo escribe automáticamente** (además de mandar Telegram) → cero carga manual.

**Reparto:** **Escritorio genera las credenciales** (API key de ASC + service account de Google Play) desde el navegador, cuando Code esté listo. No hace falta Fernando.

**Formato Telegram:** texto compacto con emojis por secciones (📱 iOS / 🤖 Android / 💰 Revenue). NO imagen.

**Alcance final (suma a la sección 2):** incluir **RESEÑAS iOS (ASC) y Android (Play Console) del día**, no solo el rating promedio (ya hay `REVIEWS_IOS`/`REVIEWS_AND` en el Sheet).

**Validación:** control visual por **MRR** — es el dato más estable; no debería cambiar día a día salvo nueva suscripción/cancelación en RevenueCat. Si cambia sin transacción → algo está mal.

**Correcciones técnicas de Escritorio (para cuando Code conecte las APIs):**
- **ASC API key:** se genera en **ASC → Usuarios y acceso → "Claves de API"** (nombre exacto en la UI).
- **Google Play Developer API:** además de crear la service account en Google Cloud Console, **hay que darle acceso explícito en Play Console** (Configuración → Usuarios y permisos → agregar la cuenta de servicio). Sin ese 2º paso, la API da **403** aunque la service account esté bien. (Es el error más común.)
- **RevenueCat:** el proyecto todavía se llama **"AUREX"** (pendiente renombrar a Cobrex). La API key v2 está ahí.
- **⚠️ DELAY de datos (documentar en el reporte):** ASC API tiene **1-2 días** de retraso en descargas/activos; Google Play Developer API tiene **24-48h** en DAU. El reporte traerá datos de **antier**, no de hoy. El mensaje de Telegram debe **aclarar la fecha de corte** para que Fernando no piense que está roto cuando el dato del día no aparece.

**Próximo paso:** con OK de Fernando → Escritorio genera y pasa las credenciales (ASC + Google Play + RevenueCat) → Code las carga en Railway + arma el reporte completo (descargas/activos/país/reseñas iOS+Android + MRR, formato compacto, con fecha de corte) + escribe el Sheet automático.

