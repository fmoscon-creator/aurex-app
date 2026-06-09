# 📋 INSTRUCCIONES PARA ESCRITORIO — Cargar metadata 1.2 + Build 43 en App Store Connect

> **⛔️ REGLA MADRE (leer ANTES de todo):**
> **Escritorio NUNCA envía a revisión ni toca el botón final.** Tu trabajo es **CARGAR todo** en cada campo/idioma y dejarlo listo. El botón **"Agregar para revisión / Enviar a revisión"** lo aprieta **SOLO Fernando**, después de que vos cargues TODO y mandes un **reporte a Code y a Fernando** para que lo validemos. **Nada se envía sin esa validación.**

---

## 0. Dónde accedés
- **App Store Connect:** https://appstoreconnect.apple.com → iniciar sesión → app **Cobrex** → sección **App Store** (no TestFlight).
- **Los textos a cargar** (raw URLs):
  - Subtítulo + Descripción + Keywords (8 idiomas): `https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/metadata/FICHA_8_IDIOMAS_PARA_CARGAR.md`
  - Novedades (What's New, 8 idiomas): `https://raw.githubusercontent.com/fmoscon-creator/aurex-app/main/briefs/metadata/NOVEDADES_1.2_COBREX_8idiomas.md`

---

## 1. Crear la versión 1.2
- En App Store > la app Cobrex, crear una **nueva versión: `1.2`** (botón **"+"** / "iOS App" → Nueva versión).
- (El número de versión visible es **1.2**; el build será el **43**.)

## 2. Seleccionar el Build 43
- Dentro de la versión 1.2, en la sección **"Compilación / Build"**, elegir el build **1.2 (43)**.
- ⚠️ El build lo **sube Fernando por Transporter** (no Escritorio). Aparece para seleccionar **después** de que Apple lo procese (~5-30 min tras subirlo). Si todavía no aparece, esperar y refrescar. **Si no está, NO seguir con este paso hasta que aparezca.**

## 3. Cargar la metadata en LOS 8 IDIOMAS (localizaciones)
En App Store, arriba a la derecha hay un selector de **idioma/localización**. Por **CADA** uno de estos 8 idiomas — **Español (ES) · Inglés (EN) · Portugués (PT) · Francés (FR) · Italiano (IT) · Chino simplificado (ZH) · Hindi (HI) · Árabe (AR)** — cargar:

| Campo en ASC | Qué pegar | De dónde |
|---|---|---|
| **Subtítulo** (máx 30) | el subtítulo de ese idioma | FICHA_8_IDIOMAS |
| **Palabras clave / Keywords** (máx 100, SIN espacios) | las keywords de ese idioma (copiar EXACTO, con las comas, sin agregar espacios) | FICHA_8_IDIOMAS |
| **Descripción** | la descripción de ese idioma | FICHA_8_IDIOMAS |
| **Novedades de esta versión** | el bloque de Novedades de ese idioma | NOVEDADES_1.2 |

**Importante al cargar:**
- **Keywords:** pegar tal cual, **sin espacios** después de las comas (cada espacio cuenta como carácter). Verificar que no marque error de longitud.
- **Subtítulo:** confirmar que entra en 30 (los nuestros están en 26-29).
- **NO cambiar:** el **Nombre** (Cobrex), ni **URL de soporte / marketing** (cobrex.io). Quedan igual.
- Si un idioma no está habilitado en ASC, habilitarlo primero (Agregar idioma) y después cargar sus 4 campos.

## 4. Revisar antes de avisar
- Pasar por los 8 idiomas y confirmar que **cada uno tiene los 4 campos cargados** (subtítulo, keywords, descripción, novedades).
- Que ningún campo quede en blanco ni con error de longitud.

## 5. ⛔️ NO ENVIAR — mandar reporte
- **NO tocar "Agregar para revisión" / "Enviar a revisión".**
- Cuando esté **TODO cargado** (build 43 seleccionado + los 4 campos en los 8 idiomas), mandar un **reporte a Code y a Fernando**: confirmar idioma por idioma qué quedó cargado (o capturas). 
- Code + Fernando lo **validan**. Recién después, **Fernando** aprieta el botón final de envío a revisión.

---

_Code — 08-jun-2026. Textos verificados (descripción aprobada por Fernando, planes con gating real del código, keywords ≤100 chars)._
