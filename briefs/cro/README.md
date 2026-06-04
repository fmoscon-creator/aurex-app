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

## ✍️ Cómo marcar la info
- **[DATO]** = verificado, con fuente/link.
- **[HIPÓTESIS]** = impresión / a confirmar.
- Nunca afirmar como dato algo no verificado.
