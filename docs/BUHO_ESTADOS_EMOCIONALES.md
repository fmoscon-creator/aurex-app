# BUHO v2 — ESTADOS EMOCIONALES Y CRUCE PLAN ↔ HECHO

> Documento de referencia para las animaciones del búho v2. Decisión cerrada
> el 1-may-2026 mediodía por Fernando + Code + Escritorio.
>
> **Antes de generar más animaciones, leer este documento. Antes de modificar
> este documento, chequear con Fernando.**

---

## 1. Catálogo emocional — DECISIÓN CERRADA 1-may-2026

3 estados, todos coherentes con marca AUREX (búho 100% dorado, ojos en almendra estilo icon oficial):

| Estado | Video Drive | Archivo local en repo | Cuándo usarlo |
|---|---|---|---|
| **confianza** (CONFIANZA ALTA / CELEBRACIÓN) | `01_videos/buho_animaciones/ALAS DORADAS con OJOS CORREGIDOS.mp4` | `assets/buho_animations/buho_confianza.mp4` | Señales Alta Convicción IA, milestones, lanzamientos, hits |
| **serio** (NEUTRAL / OBSERVADOR) | `01_videos/buho_animaciones/BUHO SERIO OBSERVADOR ...mp4` | `assets/buho_animations/buho_serio.mp4` | Posts diarios, market wrap, señales IA estándar |
| **alerta** (ADVERTENCIA / RIESGO) | `01_videos/buho_animaciones/BUHO INTIMIDANTE ...mp4` | `assets/buho_animations/buho_alerta.mp4` | Advertencias regulatorias, riesgo, caídas relevantes |

Uso desde `compose_video.py`:

```bash
python3 compose_video.py --mode dark --channel tiktok --emotion confianza --out video.mp4
python3 compose_video.py --mode dark --channel youtube --emotion serio   --out video.mp4
python3 compose_video.py --mode dark --channel linkedin --emotion alerta  --out video.mp4
```

---

## 2. Reglas de marca para regeneraciones

- Búho **siempre 100% dorado** sobre fondo navy `#0A1428`. NO alas blancas, NO plateado, NO multicolor.
- Ojos **en almendra/afilados** (estilo del icon oficial). Runway tiende a deformarlos a "ojos redondos tiernos" — siempre verificar pixel-por-pixel antes de aceptar.
- Estética **facetada premium** (geometric polygonal). NO realista, NO cartoon.

---

## 3. PNG fuente para futuras regeneraciones

Usar **siempre**: `scripts/video_generation/assets/buho_runway_clean/buho_v2_dark_tight_1080.png` (también en Drive `03_assets_brutos/`, file ID `1hfJQ6_HYxpsEQEwlcag1kxigx4w76Bfv`).

- 1080×1080, búho llena 95% del alto y 68% del ancho, padding navy uniforme 2.5%.
- Resuelve el problema del PNG anterior (búho ocupando solo 45% del frame, Runway interpretaba el margen como espacio para duplicar/achicar).

Versión 9:16 disponible (`buho_v2_dark_9x16_1080x1920.png`) si Runway exige formato vertical, pero el cuadrado funciona mejor en image-to-video.

---

## 4. Plan ORIGINAL (descartado) — solo histórico

Los 2 briefs en Drive `04_briefs/` (del 30-abr-2026) proponían **3 variantes técnicas** (V1 parpadeo, V2 breathing, V3 zoom+alas). Escritorio se desvió a variantes temáticas/emocionales propias durante la ejecución. La decisión del 1-may-2026 adopta el catálogo emocional (3 estados arriba) y descarta el plan técnico V1/V2/V3.

Si en el futuro hace falta una animación neutra técnica (parpadeo o breathing), se genera con prompt simple usando el PNG limpio.

---

## 5. Inventario completo en Drive `01_videos/buho_animaciones/` al 1-may-2026 mediodía

| Archivo Drive | Tamaño | Estado |
|---|---|---|
| ALAS DORADAS con OJOS CORREGIDOS.mp4 | 1.13 MB | ✅ ACTIVO — estado **confianza** |
| BUHO SERIO OBSERVADOR ...mp4 | 2.61 MB | ✅ ACTIVO — estado **serio** (typo OBSERAVDOR corregido el 1-may) |
| BUHO INTIMIDANTE ...mp4 | 3.08 MB | ✅ ACTIVO — estado **alerta** |
| BUHO ALAS DORADAS QUE SE ABREN OJOS REDONDOS.mp4 | 4.42 MB | ❌ DESCARTADO — movido a `descartados/` (superado por OJOS CORREGIDOS) |
| BUHO ALAS GRANDES BLANCAS.mp4 | 3.46 MB | ❌ DESCARTADO — movido a `descartados/` (alas blancas rompen marca, icon oficial es 100% dorado) |

Subcarpeta `descartados/` (folder ID `1JEg8pfV75GslX7kFaPkym6Ox5Y5qvf9s`): no borrar, queda como histórico por si en el futuro hace falta alguna referencia.

---

## 6. Roles claros para próximas iteraciones

- **Escritorio**: solo genera animaciones nuevas cuando Code le pase un brief específico en `04_briefs/`. NO inventa variantes nuevas (eso fue el origen del desorden previo). Si propone un estado nuevo, lo escribe en `05_feedback/` y se revisa con Fernando + Code.
- **Code**: arma briefs concretos cuando hace falta una animación nueva, compone los videos finales (animación + voz + banners), publica.
- **Fernando**: aprueba decisiones bloqueantes (catálogo, presupuesto, copy crítico). NO ejecuta tareas manuales en herramientas.

---

## 7. Histórico de decisiones

- **30-abr-2026**: briefs originales pidiendo V1/V2/V3 (técnicas). Escritorio empieza a generar pero se desvía a variantes temáticas durante la ejecución sin documentar.
- **1-may-2026 madrugada**: Escritorio termina los 5 videos sin alinear con el plan original. Code anterior detecta el desorden, intenta cuadro consolidado, sesión se cierra antes de bajarlo a doc.
- **1-may-2026 mediodía**: Code reconstruye el cuadro desde la evidencia (briefs + videos + nombres de archivos + verificación pixel-por-pixel de cada frame). Fernando + Escritorio + Code consensuan el catálogo de 3 estados emocionales descartando OJOS REDONDOS y ALAS BLANCAS. Decisión cerrada y commiteada.

---

*Próxima edición: solo si Fernando autoriza expandir el catálogo (4to o 5to estado) o cambiar la asignación estado → situación.*
