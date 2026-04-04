# AUREX — CRONOGRAMA DE TRABAJO
**Actualizado: 4 de Abril 2025**
**Objetivo: Publicacion en App Store antes del 5 de Mayo 2025**

---

## SEMANA 1 — 4 al 9 de Abril — ✅ COMPLETA
**Foco: 4 tabs pulidas, bugs resueltos, iconos generados. Confirmado en iPhone.**

| Dia | Tarea | Estado |
|-----|-------|--------|
| Lunes 4 | Fix barra busqueda Mercados con precio/24h/7d/objetivo IA/senal IA | ✅ COMPLETO |
| Lunes 4 | Fix doble signo dolar Stable & DeFi (USDC, DAI) | ✅ COMPLETO |
| Lunes 4 | Fix foto de perfil con camara y localStorage | ✅ COMPLETO |
| Lunes 4 | Iconos app 15 tamaños iOS generados y subidos a GitHub en assets/icons/ | ✅ COMPLETO |
| Lunes 4 | Fix compartir Portfolio Mail/WhatsApp/Telegram distribuidos | ✅ COMPLETO |
| Lunes 4 | Fix 52 semanas DOGE y otras cripto | ✅ COMPLETO |
| Lunes 4 | Fix velocidad ticker EVENTO CRITICO (6s), boton X IA 44px, logo Telegram SVG | ✅ COMPLETO |
| Martes 5 | Revision y confirmacion en iPhone de las 4 tabs — Portfolio, Mercados, IA Senales, Perfil | ✅ COMPLETO CONFIRMADO EN IPHONE |
| Miercoles 6 | Revision visual completa de cada tab en iPhone. Detectar bugs visuales o funcionales que hayan quedado. Reportar en el chat | 🔴 PENDIENTE — Fernando revisa en iPhone y confirma |
| Jueves 7 | Si hay bugs del dia 6 se corrigen. Si no hay bugs: revision final flujo completo login → Portfolio → Mercados → IA → Perfil → Alertas (placeholder) → Watchlist (placeholder) | 🔴 PENDIENTE |
| Viernes 8 | Test de performance — verificar que precios cargan bien con 4G, graficos sparkline visibles, AUREX Pulse actualiza, sin pantallas negras ni errores en consola | 🔴 PENDIENTE |
| Sabado 9 | Cierre formal Semana 1 — 4 tabs confirmadas impecables en iPhone. Preparar accesos para Semana 2: cuenta Stripe, App Store Connect, credenciales Supabase | 🔴 PENDIENTE |

---

## SEMANA 2 — 10 al 16 de Abril
**Foco: Stripe + Screenshots + Metadata + App Store Connect cargado.**

| Dia | Tarea | Estado |
|-----|-------|--------|
| Jueves 10 | Crear cuenta en stripe.com. Activar modo live (requiere datos bancarios). Crear productos FREE (gratis) y PREMIUM ($9.99/mes y $79/año). Obtener publishable key y secret key. Definir beneficios de cada plan: FREE = 5 activos + 3 senales IA/dia + AUREX Pulse basico. PREMIUM = activos ilimitados + 300 senales IA/dia + alertas de precio + Watchlist + AUREX Pulse completo | 🔴 PENDIENTE |
| Viernes 11 | Agregar publishable key de Stripe al index.html. Construir pantalla de planes en tab Perfil — tabla visual FREE vs PREMIUM con precios y beneficios. Implementar boton "Suscribirse PREMIUM" que redirige a Stripe Checkout hosted. Configurar success_url y cancel_url. Verificar en browser que el checkout abre correctamente | 🔴 PENDIENTE |
| Sabado 12 | Implementar Webhook Stripe → Supabase en el backend Railway. El webhook recibe el evento de pago confirmado, verifica la firma de seguridad, y actualiza el campo plan del usuario en Supabase de FREE a PREMIUM. Agregar webhook secret key al backend. Probar con Stripe CLI en modo test | 🔴 PENDIENTE |
| Domingo 13 | Probar flujo completo de pago en iPhone en Safari iOS — abrir app → Perfil → Ver planes → Suscribirse PREMIUM → pagar en Stripe Checkout → volver a la app → verificar que el plan cambio a PREMIUM. Corregir bugs visuales o funcionales en mobile | 🔴 PENDIENTE |
| Lunes 14 | Tomar screenshots para App Store en resolucion iPhone 6.7" (1290x2796px). 5 capturas obligatorias: (1) pantalla bienvenida/login con logo AUREX, (2) tab Portfolio con activos reales y P&L, (3) tab Mercados con precios live y AUREX Pulse, (4) tab IA Senales con lista y detalle expandido, (5) tab Perfil con tabla FREE vs PREMIUM. Datos reales visibles, no pantallas vacias | 🔴 PENDIENTE |
| Martes 15 | Redactar metadata completa App Store. Nombre: AUREX. Subtitulo (max 30 chars): Senales IA para inversores. Descripcion en espanol (max 4000 chars): que es, funcionalidades, modelo FREE/PREMIUM, llamada a la accion. Descripcion en ingles. Keywords (max 100 chars): finanzas,inversiones,senales,cripto,acciones,bolsa,trading,IA,portfolio,mercados. Categoria primaria: Finanzas. Categoria secundaria: Productividad. Valoracion: 4+. URL privacidad. URL soporte. Notas para revisor Apple | 🔴 PENDIENTE |
| Miercoles 16 | Cargar todo en App Store Connect — icono 1024x1024, screenshots 6.7", metadata en espanol e ingles, keywords, precio FREE con in-app PREMIUM, URL privacidad y soporte, usuario demo para revisores Apple (email + password cuenta Supabase con datos reales). Verificar que no falte ningun campo requerido. Cierre formal Semana 2 | 🔴 PENDIENTE |

---

## SEMANA 3 — 17 al 24 de Abril
**Foco: Xcode + React Native + Build completo en dispositivo fisico.**

| Dia | Tarea | Estado |
|-----|-------|--------|
| Jueves 17 | Cuenta Apple Developer ✅ COMPLETO ya adquirida. Abrir Apple Developer Portal. Generar Distribution Certificate (requiere CSR desde Keychain Access en Mac). Crear App ID com.aurex.app con Push Notifications e In-App Purchase activados. Crear Provisioning Profile de distribucion App Store. Descargar e instalar en la Mac | 🔴 PENDIENTE |
| Viernes 18 | Instalar Xcode 15+ desde Mac App Store (~8GB, 1-2 horas). Instalar Node.js LTS, React Native CLI, CocoaPods. Crear proyecto base: npx react-native init AurexApp. Correr cd ios && pod install y npx react-native run-ios. Verificar que compila y abre en simulador sin errores | 🔴 PENDIENTE |
| Sabado 19 | Configurar React Navigation con 5 tabs inferiores (Portfolio, Mercados, IA, Alertas, Perfil) con iconos. Configurar Supabase en React Native con AsyncStorage para sesion persistente. Implementar pantalla login completa con email/password, registro, y logica de sesion persistente | 🔴 PENDIENTE |
| Domingo 20 | Migrar tab Portfolio — lista de activos con precios en tiempo real (Binance/Yahoo), termometro de riesgo, header valor total + variacion 24h, boton Agregar Activos, conversor de moneda, popup detalle con simulador de escenarios y compartir por WhatsApp/Telegram/Mail | 🔴 PENDIENTE |
| Lunes 21 | Migrar tab Mercados — categorias Cripto/Acciones/Stable&DeFi/Futuros/Commodities/Divisas con precios live, barra busqueda con popup detalle (precio/24h/7d/objetivo IA/senal IA), AUREX Pulse con medidor miedo/codicia, banner eventos criticos, mercados globales con estado abierto/cerrado | 🔴 PENDIENTE |
| Martes 22 | Migrar tab IA Senales — 300 senales por probabilidad, filtros (Todo/Alcista/Bajista/Conf.IA/Cripto/Acciones), panel detalle con objetivo/stop loss/downside/5 puntos analisis/simulador escenarios/compartir. Migrar tab Perfil — auth Supabase, foto perfil con react-native-image-picker, plan FREE/PREMIUM, boton Stripe, secciones Mi Cuenta/Preferencias/Seguridad | 🔴 PENDIENTE |
| Miercoles 23 | Build completo en simulador iPhone 6.7". Verificar todas las tabs, flujo login, precios en tiempo real, AUREX Pulse, detalle senales IA, conversor portfolio, foto perfil. Corregir todos los bugs visuales y funcionales — el objetivo es que se vea identico a la PWA en app nativa | 🔴 PENDIENTE |
| Jueves 24 | Configurar TestFlight en App Store Connect. Archive del build en Xcode (Product → Archive) y subir. Distribuir por TestFlight al iPhone fisico de Fernando. Prueba final completa en dispositivo real — login, Portfolio, Mercados, IA, Perfil, pago Stripe. Corregir lo que haga falta. Cierre formal Semana 3 | 🔴 PENDIENTE |

---

## DESDE EL 25 DE ABRIL EN ADELANTE
**Foco: Submit App Store + Alertas + Watchlist + Publicacion.**

**NOTA IMPORTANTE: Entre el 25 y el 30 de Abril es el momento exacto para construir Alertas y Watchlist. Apple tarda entre 24hs y 7 dias en revisar (promedio 2-3 dias habiles para primera version), lo que da tiempo para completar ambas tabs antes de que llegue la respuesta.**

| Dia | Tarea | Estado |
|-----|-------|--------|
| Viernes 25 | Submit version 1.0 al App Store desde Xcode → App Store Connect. Verificar que todos los campos esten completos — icono, screenshots, metadata, keywords, privacidad, usuario demo. Click en "Submit for Review". Estado cambia a "Waiting for Review" | 🔴 PENDIENTE |
| Sabado 26 | Arrancar tab Alertas UI. Leer specs en GitHub. Implementar pantalla principal — lista de alertas activas (activo + condicion precio mayor/menor + valor + estado activa/inactiva). Pantalla vacia con boton "Crear primera alerta" si no hay ninguna | 🔴 PENDIENTE |
| Domingo 27 | Continuar Alertas — modal crear nueva alerta (buscar activo + condicion + valor). Guardar en Supabase para que Railway cron job la monitoree cada 5min. Implementar eliminar alerta, activar/desactivar. Notificacion push cuando precio toca el valor. Probar en iPhone | 🔴 PENDIENTE |
| Lunes 28 | Arrancar tab Watchlist UI. Leer specs en GitHub. Implementar pantalla principal — lista de favoritos con logo/nombre/ticker/precio/variacion 24h en tiempo real. Pantalla vacia con boton "Agregar primer activo". Boton agregar con buscador. Boton eliminar con papelera | 🔴 PENDIENTE |
| Martes 29 | Continuar Watchlist — ordenar por rendimiento 24h, click en activo abre popup detalle igual a Mercados. Probar Alertas y Watchlist completas en iPhone. Corregir bugs. Preparar version 1.1 | 🔴 PENDIENTE |
| Miercoles 30 | Submit version 1.1 con Alertas y Watchlist al App Store | 🔴 PENDIENTE |

**Escenario A — Apple aprueba version 1.0 antes del 30 de Abril:** Publicar inmediatamente. La version 1.1 entra en revision y se publica unos dias despues.

**Escenario B — Apple pide correcciones menores:** Corregir el mismo dia. Re-submit. Apple responde en 24-48hs en re-submissions.

**Escenario C — Apple rechaza por problema tecnico grave:** Poco probable si el build de TestFlight funciono bien en iPhone fisico. Analizar feedback, corregir y re-submit.

---

## RESUMEN CALENDARIO

| Fecha | Hito | Estado |
|-------|------|--------|
| 9 Abril | Cierre Semana 1 — 4 tabs confirmadas en iPhone | 🔴 PENDIENTE |
| 10-16 Abril | Stripe + Screenshots + Metadata + App Store Connect | 🔴 PENDIENTE |
| 17-24 Abril | React Native completo + build en iPhone fisico | 🔴 PENDIENTE |
| 25 Abril | Submit version 1.0 al App Store | 🔴 PENDIENTE |
| 26-30 Abril | Construccion Alertas y Watchlist mientras Apple revisa | 🔴 PENDIENTE |
| 28-30 Abril | Respuesta de Apple sobre version 1.0 | 🔴 PENDIENTE |
| 30 Abril | Submit version 1.1 con Alertas y Watchlist | 🔴 PENDIENTE |
| Mayo 1-5 | Publicacion en el App Store | 🔴 PENDIENTE |

---

## ESTADO ACTUAL
| Item | Estado |
|------|--------|
| Cuenta Apple Developer | ✅ COMPLETO |
| 4 tabs PWA pulidas y confirmadas iPhone | ✅ COMPLETO |
| Iconos app 15 tamaños iOS | ✅ COMPLETO |
| Bugs resueltos Semana 1 | ✅ COMPLETO |
| Stripe | 🔴 PENDIENTE — Semana 2 |
| Screenshots App Store | 🔴 PENDIENTE — Semana 2 |
| Metadata App Store | 🔴 PENDIENTE — Semana 2 |
| App Store Connect cargado | 🔴 PENDIENTE — Semana 2 |
| React Native build | 🔴 PENDIENTE — Semana 3 |
| Alertas UI | 🔴 PENDIENTE — 26-27 Abril |
| Watchlist UI | 🔴 PENDIENTE — 28-29 Abril |
| Submit App Store v1.0 | 🔴 PENDIENTE — 25 Abril |
| Publicacion | 🔴 PENDIENTE — Mayo 1-5 |

---

## STACK TECNICO
- PWA: HTML + JS vanilla + Supabase Auth
- Backend alertas: Railway (cron job cada 5min)
- DB: Supabase (PostgreSQL)
- Pagos: Stripe (por implementar Semana 2)
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
6. Responder SIEMPRE en espanol, detallado y ordenado
7. Analizar TODO el problema antes de escribir una sola linea de codigo
8. Un solo commit que resuelve todo — no commits intermedios rotos
