# CUADRO COMPLETO — Bugs/Ajustes Build 21 a aplicar en Build 22

Fecha cierre sesion: 15-may-2026 ~02:40 AR
Plataforma testeada: Samsung R5CR92ADDNW con Build 21 v1.0.21 (instalado desde Play Store)
Cuenta tester: aurextester12@gmail.com (License Tester activo)

---

## TABLA RESUMEN

| # | Prioridad | Pantalla / Componente | Sintoma | Causa raiz | Accion concreta Build 22 | Archivo + linea |
|---|-----------|------------------------|---------|------------|---------------------------|-----------------|
| 1 | **P0 BLOQUEANTE** | SubscriptionScreen | Tocar comprar PRO/ELITE Mensual o Anual: POP "Error / The Product is not available for Purchase". 100% reproducible en los 4 planes. RevenueCat retrieva productos OK pero NUNCA llama a `launchBillingFlow`. | NO confirmada despues de descartar 11 hipotesis. Toda la configuracion Play Console + RC + firmas + License Testing + RTDN esta correcta. Posible: propagacion <48h, o ticket a RevenueCat support. | NO requiere cambio de codigo todavia. Esperar 24-48h post-publicacion + abrir ticket RC con el informe completo. Si despues sigue fallando, debug profundo con server-side logs RC. | N/A (no es bug de codigo) |
| 2 | **P0 UX** | Modal Agregar Activo (PortfolioScreen) | Boton "Guardar" queda OCULTO bajo el teclado al completar Cantidad + Precio. Nuevo usuario no puede agregar primer activo. Fix Build 21 con ScrollView + keyboardShouldPersistTaps + Keyboard.dismiss NO alcanzo. | El boton esta dentro del ScrollView, el teclado lo tapa visualmente aunque sea tocable. | Boton "Guardar" STICKY fijo abajo del modal, FUERA del ScrollView. Estructura: `<View flex:1>` con `<ScrollView flex:1>` para campos + `<View>` boton fijo abajo. | `src/screens/PortfolioScreen.js` L1167-1248 aprox (form modal Agregar Activo) |
| 3 | **P1** | AlertasScreen (header secciones) | Contador por seccion muestra `4/$` (denominador descontando alertas bloqueadas por plan), Fernando quiere `4/5` (denominador ABSOLUTO con total real de alertas configurables sin filtrar). | L582 actual filtra el denominador con `isAlertAllowed`. | Cambiar denominador para que cuente TODAS las items de la seccion sin filtrar por plan. Activos al numerador siguen filtrando con `isAlertAllowed`. | `src/screens/AlertasScreen.js` L582 — `const totalInSec = sec.items.filter(i => isAlertAllowed(i.id)).length;` → cambiar a `sec.items.length` |
| 4 | **P1** | AlertCreateModal (Configurar alerta desde campana) | Al crear alerta de precio en campana de un activo, POP "Limite del plan PRO Pasate a ELITE" incluso cuando el usuario PRO debe poder crear alertas de precio. Bloqueo INCORRECTO. | Frontend envia `tipo: 'precio'` o `'porcentaje'` pero PLAN_LIMITS.FREE/PRO espera `'precio_objetivo'` o `'umbral'` y `'variacion_brusca'`. Backend rechaza con 403 plan_limit_reached. | Mapear en el callsite que abre AlertCreateModal: `'precio'` → `'precio_objetivo'`, `'porcentaje'` → `'variacion_brusca'`. Verificar PLAN_LIMITS en `lib/plans.js` o donde este definido. | Grep `tipo:.*precio` y `tipo:.*porcentaje` en `src/` — corregir antes de POST a `/api/alertas` |
| 5 | **P1** | IAScreen (tap candado RSI/MACD) | Tap activo en AI + tap candado "Analisis Tecnico RSI / MACD" → POP error + atras pantalla "Elige tu plan FREE $" mal renderizada (igual mal que en emulador). | Causa NO 100% diagnosticada. Probable: fallback de error renderiza un SubscriptionScreen embebido con state corrupto. Verificar el handler del tap candado. | Re-test con logcat fresh para capturar `console.error` del handler. Si es navegacion a SubscriptionScreen, asegurar que pase props correctos. Si es PlanLimitModal, alinear con el resto del UI. | `src/screens/IAScreen.js` — handler del tap candado en seccion Analisis Tecnico (grep `RSI\|MACD` + `candado\|locked\|onPress`) |
| 6 | **P2** | SubscriptionScreen handler compra | Cuando falla la compra, el Alert muestra `t('error')` como mensaje (texto generico "Error"). El `e.message` real del SDK queda oculto, dificultando debug. | L78: `Alert.alert(t('error'), e.message)` esta bien, pero `e.message` puede ser undefined o string vacio segun version SDK. | Asegurar fallback explicito: `Alert.alert('Error', e.message || e.toString() \|\| 'Error desconocido')`. Tambien loggear con `console.error('[SUB] purchase failed:', e)` para que aparezca en logcat. | `src/screens/SubscriptionScreen.js` L78 |
| 7 | **P2** | PortfolioScreen (debajo Valor Total) | Falta banner UpsellBanner cuando usuario es FREE/PRO (para promover upgrade). Antes estaba en MercadosScreen pero se removio porque saturaba precios. Pertenece en Portfolio. | Feature pendiente, no es bug. | Agregar `<UpsellBanner compact />` debajo del componente que muestra "Valor Total" en PortfolioScreen. Importar de `src/components/UpsellBanner.js`. | `src/screens/PortfolioScreen.js` — buscar `Valor Total\|valor_total` y agregar el banner inmediatamente despues |

---

## CONTEXTO ADICIONAL

### Lo que YA esta en Build 21 (validado por Fernando en Samsung):
- SignupScreen nueva + flow auth.signUp + POST `/api/usuario` Capa 1+2 self-heal — OK
- Onboarding 2 botones (Crear cuenta gratis dorado + Ya tengo cuenta gris) — OK
- Cross-links Login ↔ Signup — OK
- Pulse Ver variables tiering 3 niveles (FREE redirige, PRO 14 vars, ELITE +seccion extra) — OK
- UpsellBanner sacado de Mercados (saturaba precios) — OK
- Banners IA con copy ajustado ("Razonamiento detallado en señales IA — Disponible en ELITE") — OK
- PlanLimitModal con X de cerrar + "Ahora no" blanco subrayado — OK
- AlertasScreen contador header de plan (15 → 14 cuando GDELT esta bloqueado para PRO) — OK
- 11 evaluadores backend alertas no-precio (apertura, alta_conviccion_ia, etc.) — OK
- WatchlistScreen USER_ID dinamico (bug seguridad) — OK
- 5 promesas falsas eliminadas de i18n.js — OK
- Banner PWA upsell aurex.live — OK

### Lo que NO se pudo validar en Samsung en esta sesion:
- Cold reboot persistencia sesion D3 (pendiente).
- Push notifications FCM en device real (pendiente).
- Comprar plan real con tester valido (BLOQUEADO por bug #1 de este cuadro).

---

## DEPENDENCIAS BUILD 22

- Bug #1 (compra IAP) NO requiere cambio de codigo, solo investigacion externa (RC support + esperar propagacion). NO bloquea compilacion Build 22.
- Bugs #2-7 son cambios de codigo independientes y se pueden agrupar en un solo Build 22 si Escritorio + Fernando aprueban.

## REGLA OPERATIVA

NO compilar Build 22 sin:
1. OK explicito de Escritorio sobre el cuadro.
2. OK de Fernando sobre el scope.
3. Mockup `.md` previo en `Desktop/CODE/AurexApp/mockups/` para bugs #2 y #7 (cambios visuales).

---

## ARCHIVOS RELACIONADOS

- Brief operativo Build 21: `/Users/fernandomoscon/Desktop/aurex-app/briefs/BRIEF_BUILD21_ESTADO_15MAY.md`
- Informe completo bug compra IAP: `/Users/fernandomoscon/Desktop/aurex-app/briefs/INFORME_COMPRA_IAP_15MAY_PARA_ESCRITORIO.md`
- Session active Escritorio: `/Users/fernandomoscon/Desktop/aurex-app/briefs/SESSION_ACTIVE_ESCRITORIO_CHROME.md`

URLs publicas (post commit):
- Cuadro bugs: `https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/CUADRO_BUGS_BUILD21_PARA_BUILD22.md`
- Informe IAP: `https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/INFORME_COMPRA_IAP_15MAY_PARA_ESCRITORIO.md`
