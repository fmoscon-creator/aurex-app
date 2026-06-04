# 🔬 Workspace CRO — Evaluación conversión/embudo Cobrex

> Carpeta de trabajo del **Brief Maestro §13**. Acá viven los análisis de por qué Cobrex tiene descargas reales pero ~0 compras de plan.

## 🛑 REGLA MADRE
**NADIE TOCA NI CAMBIA NADA** (ni app, ni paywall, ni onboarding, ni precios, ni planes, ni tiendas). Es **100% diagnóstico**. Cualquier cambio se decide **aparte**, validado, y **con OK explícito de Fernando**. Sin urgencia.

## 📁 Archivos del circuito
| Archivo | Quién lo escribe | Qué tiene |
|---|---|---|
| `ESCRITORIO_analisis.md` | **Escritorio** | Su análisis de **contexto de mercado** (precios competidores por país, best practices, lectura UX). |
| `CODE_analisis.md` | **Code** | Su análisis de **datos duros** (embudo real medido, flujo real en código, precios reales en tiendas, geo-pricing). |
| `CONSOLIDADO_CRO_vN.md` | **Code** | La **fusión** de ambos en versiones (v1, v2, …). Coincidencias = señal fuerte; discrepancias = a investigar. |

## 🔁 El circuito (se repite cada día / cada vez que hay info nueva)
1. **Escritorio** suma lo que relevó a `ESCRITORIO_analisis.md` → commit/push (o se lo pasa a Code y Code lo sube).
2. **Code** suma sus datos a `CODE_analisis.md`.
3. **Code lee ambos** → produce `CONSOLIDADO_CRO_v(N+1).md` → avisa a Fernando la versión nueva.
4. Se refina **incrementalmente**: no hace falta entregar todo de una; cada aporte mejora la versión.

## 🤝 Regla de independencia
Cada uno escribe **lo suyo SIN mirar primero la conclusión del otro** (para no contaminarse). Recién cuando ambos cargaron, Code cruza. **Fernando arbitra.**

## 🗄️ Acceso a datos (ambos, en paralelo)
**Escritorio tiene acceso DIRECTO a Supabase** (solapa abierta por Fernando) → lee él mismo las tablas (`usuarios`, `alertas`, `portfolio`, `watchlist/s`, etc.) para responder sus propias preguntas de datos. **NO depende de Code** para los números de Supabase. Code los saca por API/endpoint. Que **los dos** lleguen al mismo número por separado = validación cruzada (señal fuerte). Lo que NINGUNO puede medir: interacciones de UI (ver Mercados, clicks, taps sin completar) → no se guardan en la base.

## 🔒 Regla anti-pisarse (UN dueño por archivo)
Para que nunca haya conflictos ni confusión, **cada archivo tiene un único dueño que lo edita**:
- `ESCRITORIO_analisis.md` → **solo Escritorio**.
- `CODE_analisis.md` → **solo Code**.
- `CONSOLIDADO_CRO_vN.md` → **solo Code**.

Nadie edita el archivo del otro. Se trabaja **en paralelo** (no por turnos): Escritorio no espera a Code ni Code a Escritorio. Como cada uno toca su propio archivo, es imposible pisarse en Git.

## ✍️ Cómo marcar la info
- **[DATO]** = verificado, con fuente/link.
- **[HIPÓTESIS]** = impresión / a confirmar.
- Nunca afirmar como dato algo no verificado.
