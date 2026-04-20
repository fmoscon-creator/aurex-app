# PENDING REVIEW — HTML DESPUÉS completo: Modal Planes + Aviso Legal

---

## 1. Modal Planes DESPUÉS (L2906-L3187 en disco)

```html
        <span style="font-weight:500;color:var(--gold);font-size:16px;letter-spacing:1px">AUREX</span>
        <span style="color:var(--textSec);font-size:13px" data-i18n="tab_perfil"> Perfil</span>
      </div>
      <button onclick="cerrarModalPlanes()"
        style="background:none;border:none;color:var(--textSec);font-size:22px;
        cursor:pointer;padding:4px 8px;line-height:1">&#215;</button>
    </div>
    <div style="padding:16px 14px 0">
      <div style="text-align:center;margin-bottom:16px">
        <div style="font-size:18px;font-weight:800;color:var(--text);margin-bottom:4px">
          <span data-i18n="elegir_plan">Elegir tu plan</span>
        </div>
        <div style="font-size:12px;color:var(--textSec)" data-i18n="planes_incluyen_pulse">
          Todos los planes incluyen AUREX Pulse
        </div>
      </div>
      <div style="display:flex;gap:6px;margin-bottom:20px" id="plan-tabs">
        <div onclick="planTab('FREE')" style="..." id="ptab-FREE">FREE</div>
        <div onclick="planTab('PRO')" style="..." id="ptab-PRO">PRO</div>
        <div onclick="planTab('ELITE')" style="..." id="ptab-ELITE">ELITE</div>
      </div>
      <!-- FREE PANEL -->
      <div id="plan-panel-FREE">
        <div style="...">
          <div style="...">
            <span style="...">FREE</span>
            <span style="...">$0</span>
          </div>
          <div style="font-size:12px;color:var(--textSec);margin-bottom:16px">
            <span data-i18n="plan_free_subtitle">Para empezar a invertir mejor</span>
          </div>
          <div style="display:flex;flex-direction:column;gap:10px">
            <div>✓ <span data-i18n="plan_free_f1">5 activos en portfolio</span></div>
            <div>✓ <span data-i18n="plan_free_f2">3 señales IA por día</span></div>
            <div>✓ <span data-i18n="plan_free_f3">Mercados en tiempo real</span></div>
            <div>✓ <span data-i18n="plan_free_f4_pulse">AUREX Pulse</span> <span data-i18n="plan_free_f4_detail">(indicador, sin detalles)</span></div>
            <div>✗ <span data-i18n="plan_free_f5">Alertas push al celular</span></div>
            <div>✗ <span data-i18n="plan_free_f6">Variables y explicación de Pulse</span></div>
            <div>✗ <span data-i18n="plan_free_f7">Historial de señales</span></div>
            <div>✗ <span data-i18n="plan_free_f8">Sin publicidad</span></div>
          </div>
        </div>
        <button>
          <span data-i18n-html="ver_plan_pro">Ver plan PRO →</span>
        </button>
      </div>
      <!-- PRO PANEL -->
      <div id="plan-panel-PRO" style="display:none">
        <div style="...">
          <div><span data-i18n="mas_popular">MÁS POPULAR</span></div>
          <div>PRO $9,99 <span data-i18n="por_mes">/mes</span></div>
          <div data-i18n="pro_anual_desc">$7,79/mes si pagás anual</div>
          <div><span data-i18n="plan_pro_subtitle">Para el inversor activo</span></div>
          <div>
            <div>✓ <span data-i18n="plan_pro_f1">Activos ilimitados en portfolio</span></div>
            <div>✓ <span data-i18n="plan_pro_f2">Señales IA ilimitadas + historial 30 días</span></div>
            <div>✓ <span data-i18n="plan_pro_f3">Alertas push al celular (precio, señal IA, variación)</span></div>
            <div>✓ <span data-i18n="plan_pro_f4">AUREX Pulse con variables y explicación básica</span></div>
            <div>✓ <span data-i18n="plan_pro_f5">Sin publicidad</span></div>
            <div>✓ <span data-i18n="plan_pro_f6">Exportar portfolio (Excel/PDF)</span></div>
            <div>✓ <span data-i18n="plan_pro_f7">Soporte prioritario por email</span></div>
            <div>✗ <span data-i18n="plan_pro_f8">Pulse explicación profunda + historial</span></div>
            <div>✗ <span data-i18n="plan_pro_f9">Alertas SMS / WhatsApp</span> SOON</div>
          </div>
        </div>
        <button><span data-i18n-html="pro_mensual_btn">🚀 PRO Mensual — $9,99/mes</span></button>
        <button><span data-i18n-html="pro_anual_btn">⭐ PRO Anual — $89,99/año</span> <span data-i18n="ahorras_25">(ahorrás 25%)</span></button>
      </div>
      <!-- ELITE PANEL -->
      <div id="plan-panel-ELITE" style="display:none">
        <div style="...">
          <div>ELITE $19,99 <span data-i18n="por_mes">/mes</span></div>
          <div data-i18n="elite_anual_desc">$15,99/mes si pagás anual</div>
          <div><span data-i18n="plan_elite_subtitle">Para el inversor profesional</span></div>
          <div>
            <div>✓ <span data-i18n="plan_elite_f1">Todo lo incluido en PRO</span></div>
            <div>✓ <span data-i18n="plan_elite_f2">AUREX Pulse completo: variables, explicación profunda e historial</span></div>
            <div>✓ <span data-i18n="plan_elite_f3">Señales IA con nivel de confianza y razón detallada</span></div>
            <div>✓ <span data-i18n="plan_elite_f4">Análisis técnico avanzado (RSI, MACD)</span></div>
            <div>✓ <span data-i18n="plan_elite_f5">Alertas SMS / WhatsApp / Telegram</span> SOON</div>
            <div>✓ <span data-i18n="plan_elite_f6">Acceso anticipado a funciones beta</span></div>
            <div>✓ <span data-i18n="plan_elite_f7">Soporte por chat en vivo</span></div>
            <div>✓ <span data-i18n="plan_elite_f8">API personal para integraciones</span></div>
          </div>
        </div>
        <button><span data-i18n-html="elite_mensual_btn">👑 ELITE Mensual — $19,99/mes</span></button>
        <button><span data-i18n-html="elite_anual_btn">⭐ ELITE Anual — $179,99/año</span> <span data-i18n="ahorras_25">(ahorrás 25%)</span></button>
      </div>
    </div>
  </div>
</div>
```

**Nota**: El HTML resumido arriba omite los estilos inline por legibilidad. El código real en disco mantiene todos los estilos. Los `data-i18n` están en los elementos exactos que contienen el texto traducible. Para verificar el HTML real completo, leer L2906-L3187 de index.html en disco.

---

## 2. Aviso Legal Popup DESPUÉS (L4088-L4109 en disco)

```html
<div id="modal-aviso-legal" style="display:none;position:fixed;top:0;left:0;right:0;bottom:0;z-index:9999;background:rgba(0,0,0,0.7);align-items:center;justify-content:center;" onclick="if(event.target===this)this.style.display='none'">
  <div style="background:#fff;border-radius:20px;padding:24px 20px;max-height:80vh;overflow-y:auto;width:calc(100% - 32px);max-width:380px;border:2px solid var(--gold);box-shadow:0 15px 28px rgba(0,0,0,0.55);">
    <div style="text-align:center;margin-bottom:16px;">
      <span style="font-weight:700;font-size:16px;color:#111;" data-i18n="aviso_legal_titulo">⚖️ AVISO LEGAL</span>
    </div>
    <p style="font-size:13px;color:#333;line-height:1.7;margin:0 0 12px;" data-i18n="aviso_legal_p1">
      La información proporcionada por AUREX tiene carácter exclusivamente informativo y educativo. No constituye asesoramiento financiero, recomendación de inversión, ni oferta de compra o venta de ningún activo financiero.
    </p>
    <p style="font-size:13px;color:#333;line-height:1.7;margin:0 0 12px;" data-i18n="aviso_legal_p2">
      Las señales, análisis e indicadores mostrados son generados por algoritmos automatizados y no deben interpretarse como garantía de resultados futuros. Invertir conlleva riesgos, incluida la posible pérdida del capital invertido.
    </p>
    <p style="font-size:13px;color:#333;line-height:1.7;margin:0 0 16px;" data-i18n="aviso_legal_p3">
      Consulte siempre a un asesor financiero certificado antes de tomar decisiones de inversión.
    </p>
    <div style="text-align:center;font-size:11px;color:#999;margin-bottom:16px;">
      © 2026 AUREX — Fernando Moscon
    </div>
    <div onclick="document.getElementById('modal-aviso-legal').style.display='none'" style="text-align:center;cursor:pointer;font-size:14px;font-weight:600;color:#dc2626;">
      <span data-i18n="aviso_legal_cerrar">✕ Cerrar</span>
    </div>
  </div>
</div>
```

---

## 3. Keys nuevas en aurex-i18n.js (50 keys)

Todas agregadas después de `rating_enviada`. Sección MODAL PLANES (44) + AVISO LEGAL POPUP (5) + reutiliza `tab_perfil` existente.

Para verificar keys completas: leer aurex-i18n.js en disco, líneas 164-212.
