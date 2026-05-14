SESSION ACTIVE — Escritorio (Claude Desktop + Chrome)
URL fija: https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/SESSION_ACTIVE_ESCRITORIO_CHROME.md
Escritorio lee esta URL al inicio de cada sesión Y cada vez que el contexto se compacte.
CODE actualiza este archivo con commit cada vez que Escritorio lo pide o al cerrar sesión.
Última actualización
14-may-2026 — ~10:30 AM AR
Qué estábamos haciendo en este momento exacto
Build 18 Android: análisis de código completo terminado. Cruce CODE vs Escritorio cerrado. Scope consolidado acordado entre CODE y Escritorio. CODE listo para arrancar implementación por ítem 1.
Errores de Escritorio reconocidos en esta sesión

RevenueCat Android SÍ tiene rama else if en App.js líneas 44-46 con key goog_HfiemofhuhAKeWYfNZfLGrlyIDp. Escritorio leyó solo el snippet inicial y no vio la rama completa.
versionCode en build.gradle está en 17 (no en 1 como dijo Escritorio). Escritorio confundió bloques del gradle.

Scope Build 18 Android consolidado (CODE + Escritorio)
P0 — 4.3 hs Code:

Eliminar signInWithPassword hardcoded con credenciales fmoscon@gmail.com en PerfilScreen.js L141
USER_ID dinámico via supabase.auth.getUser() en PortfolioScreen + AlertasScreen + pasar JWT en header Authorization de cada fetch a Railway
Cargar plan real del usuario en PerfilScreen L41 via useEffect + setState
Logout correcto: refreshSession + signOut + AsyncStorage.clear + navegar a LoginScreen (PerfilScreen L136-138)
Componente PlanLimitModal.js reutilizable nuevo
Manejar 403 en PortfolioScreen.insertItem() mostrando PlanLimitModal
AlertCreateModal valida tipo_alerta contra plan antes de POST + handle 403
SubscriptionScreen lee plan actual al iniciar (no mostrar "Quiero PRO" si ya sos PRO)
Bump versionCode 17 a 18 y versionName 1.0.17 a 1.0.18

P1 — 5 hs Code:
10. useFocusEffect refresca plan al volver a screen
11. AppState listener refresca plan al volver de background
12. Ocultar toggles alertas no permitidas + lock icon
13. MisAlertasScreen filtra por plan actual
14. APIs edge-to-edge Android 15: WindowCompat + WindowInsetsControllerCompat nativo
15. Activar ProGuard + reglas RevenueCat + test device físico
Total Build 18: 9 hs Code en 2 jornadas.
Build 25 iOS: mismos P0 ítems 1-8 (sin Android-only) = 3.5 hs Code.
Próximo paso inmediato
CODE arranca ítem 1: eliminar credenciales hardcodeadas PerfilScreen.js L141.
Estado dashboards al 14-may AM
Apple Build 17: Pendiente de revisión día 21. Foro 826030: respuesta Apple staff hace 2 días, sin novedad nueva. Reply agendado 15-may 9 AM AR.
Google Play: Build 17 producción activo. 21 instalaciones totales.
Railway: online. RevenueCat webhook AUREX Backend activo y validado.
Regla de uso
Escritorio actualiza este archivo cada 20-30 intercambios o ante cualquier análisis largo.
Fernando puede pedir "guardá el estado" en cualquier momento y Escritorio genera el texto nuevo para que CODE commitee.
Si el contexto de Escritorio se compacta: leer esta URL + BRIEF_AUREX_LATEST.md = recuperación completa en menos de 2 minutos.
