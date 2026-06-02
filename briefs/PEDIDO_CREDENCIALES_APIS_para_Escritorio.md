# Pedido a Escritorio — generar 3 credenciales de API (reporte Cobrex automático)
**Fecha:** 01/06/2026 · **Aprobado por Fernando.** Code conecta las APIs una vez que estén estas credenciales.

## ⚠️ SEGURIDAD (importante)
Estas credenciales son **SECRETOS**. **NO** pegarlas en el chat, **NO** commitearlas a ningún repo. El destino es **archivos locales** en `~/Desktop/CODE/SECRET/` (carpeta donde ya viven los otros secretos). Fernando descarga/guarda cada archivo ahí y avisa a Code; Code los carga en Railway.

---

## 1) App Store Connect API (iOS — descargas/activos/país/reseñas)
- **Dónde:** App Store Connect → **Usuarios y acceso** → pestaña **"Claves de API"** (Integraciones) → **Generar clave API**.
- Permisos: alcanza con **"Acceso a ventas y tendencias"** (Sales) o "Developer".
- **Resultado (3 datos):**
  - **Key ID** (texto corto, ej. `2X9R4HXF34`) — no secreto.
  - **Issuer ID** (un UUID, arriba de la lista de claves) — no secreto.
  - **Archivo `.p8`** (la clave privada — **se descarga UNA sola vez**, ⚠️ no se puede volver a bajar). → guardar como `~/Desktop/CODE/SECRET/ASC_AuthKey.p8`.
- Anotar el Key ID + Issuer ID en `~/Desktop/CODE/SECRET/ASC_API_ids.txt`.

## 2) Google Play Developer API (Android — instalaciones/activos/país/reseñas)
- **Paso A — Google Cloud Console:** crear (o reusar) un proyecto → **APIs y servicios** → habilitar **"Google Play Android Developer API"** → **Credenciales** → **Crear cuenta de servicio** → en esa cuenta, **Claves** → **Agregar clave** → **JSON** (se descarga). → guardar como `~/Desktop/CODE/SECRET/google_play_service_account.json`.
- **Paso B — Play Console (¡CLAVE, sino da error 403!):** Play Console → **Configuración** → **Usuarios y permisos** → **Invitar usuario** → pegar el **email de la cuenta de servicio** (termina en `...iam.gserviceaccount.com`, está dentro del JSON) → darle permiso de **ver estadísticas/informes financieros** (lectura). Sin este paso B la API falla aunque la cuenta esté bien creada.

## 3) RevenueCat API (MRR / suscripciones)
- **Dónde:** RevenueCat → proyecto **"AUREX"** (⚠️ todavía se llama AUREX, pendiente renombrar a Cobrex) → **Project settings** → **API keys** → usar/crear una **Secret API key (v2)**.
- → guardar como texto en `~/Desktop/CODE/SECRET/revenuecat_api_key_v2.txt`.

---

## Cuando esté todo
Fernando avisa a Code que los 4 archivos están en `~/Desktop/CODE/SECRET/`:
`ASC_AuthKey.p8` · `ASC_API_ids.txt` · `google_play_service_account.json` · `revenuecat_api_key_v2.txt`
→ Code los carga en Railway (env vars) y arma el reporte completo (descargas/activos/país/reseñas iOS+Android + MRR, con fecha de corte por el delay de 1-2 días).
