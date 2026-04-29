---
name: Roles Code vs Escritorio
description: Fernando trabaja con dos asistentes Claude distintos y pide opiniones cruzadas — no confundirlos
type: reference
originSessionId: f9879308-2ffe-4c3d-ad7b-0a66d22643ac
---
Fernando usa dos asistentes Claude en paralelo en este proyecto:

- **"Code"** = Claude Code (terminal, este asistente). Tiene acceso al filesystem y los repos.
- **"Escritorio"** = Claude Desktop (app de escritorio). No tiene acceso directo al código, recibe contexto pegado por Fernando.

**Cómo trabaja:** cuando una decisión es sensible (ej. cambios que pueden afectar revisiones de Apple/Google, o decisiones técnicas con impacto), le pide a Code que prepare un texto con todo el contexto y se lo lleva a Escritorio para una segunda opinión. Después decide.

**Cómo aplicar:**
- Cuando me pida "preparame un texto para escritorio" / "para un nuevo chat", el destinatario es **Escritorio**, no yo. El rótulo del texto debe decir "Para ESCRITORIO", no "Para CODE".
- Si en un texto de Fernando aparece "Para CODE" como rótulo, ese texto está dirigido **a mí** (yo soy Code), no a otro asistente.
- Nunca rotular un texto destinado a otra IA como si fuera para mí mismo.
