# PENDING REVIEW — i18n B6 Alertas + B7 Notificaciones + elementos sueltos

---

## Resumen de cambios

1. **Línea 2608** (B6 bloque largo): reformatear en líneas separadas con `data-i18n`
2. **Líneas 2609-2643** (B6 alertas individuales): agregar `data-i18n`
3. **Líneas 2653-2691** (B7 contenido): agregar `data-i18n`
4. **Línea 2559** (Face ID / Touch ID): agregar `data-i18n`
5. **aurex-i18n.js**: agregar key `face_touch_id` (ya existe pero no está en uso en HTML)
6. **Verificación**: segundo Guardar del teléfono en B6 línea 2608

---

## Cambio 1 — Línea 2608 reformateada con data-i18n

**ANTES**: una línea de 3139 chars
**DESPUÉS**: misma estructura expandida con `data-i18n`:

```html
      <div style="padding:4px 0 14px;border-bottom:1px solid var(--border);margin-bottom:4px">
        <div style="background:rgba(212,160,23,0.06);border:1px solid rgba(212,160,23,0.25);border-radius:10px;padding:12px;margin-bottom:10px">
          <div style="font-size:11px;color:var(--gold);font-weight:700;letter-spacing:.5px;margin-bottom:4px" data-i18n="alertas_titulo_banner">⚡ TU NÚMERO, TUS ALERTAS AL INSTANTE</div>
          <div style="font-size:10px;color:var(--textSec);line-height:1.4" data-i18n="alertas_desc_banner">AUREX te avisa directo a tu celéfono cuando el mercado se mueve. Sin delays.</div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:0.5px solid var(--border);margin-bottom:10px">
          <div style="display:flex;align-items:center;gap:8px;flex:1">
            <span style="font-size:18px">📱</span>
            <div>
              <div style="font-size:13px;color:var(--text);font-weight:500" data-i18n="recibir_alertas_numero">Recibir alertas en este número</div>
              <div style="font-size:10px;color:var(--textSec);margin-top:2px" data-i18n="activar_notif_push">Activá para recibir notificaciones push</div>
            </div>
          </div>
          <div onclick="pacAlerta(this,'alerta_cel_activo')" data-on="1" style="width:44px;height:26px;background:var(--gold);border-radius:13px;display:flex;align-items:center;justify-content:flex-end;padding:0 3px;cursor:pointer"><div style="width:20px;height:20px;background:#000;border-radius:50%"></div></div>
        </div>
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px">
          <span style="font-size:10px;color:var(--textSec);font-weight:500;text-transform:uppercase;letter-spacing:.5px" data-i18n="numero_celular_label">Número de celular</span>
          <span style="font-size:11px;color:var(--green)">✓</span>
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <input id="celular-input-b6" type="hidden" />
          <select id="cel-prefix-b6" onchange="pacUpdateCelB6()" style="background:var(--bg);border:1px solid var(--border2);border-radius:10px;color:var(--text);font-size:14px;padding:12px 6px;cursor:pointer;outline:none;min-width:100px"><option value="+54" selected>🇦🇷 +54</option><option value="+1">🇺🇸 +1</option><option value="+52">🇲🇽 +52</option><option value="+55">🇧🇷 +55</option><option value="+57">🇨🇴 +57</option><option value="+56">🇨🇱 +56</option><option value="+51">🇵🇪 +51</option><option value="+58">🇻🇪 +58</option><option value="+598">🇺🇾 +598</option><option value="+595">🇵🇾 +595</option><option value="+34">🇪🇸 +34</option><option value="+44">🇬🇧 +44</option><option value="+33">🇫🇷 +33</option><option value="+39">🇮🇹 +39</option><option value="+49">🇩🇪 +49</option></select>
          <input id="cel-num-b6" style="flex:1;background:var(--bg);border:1px solid var(--border2);border-radius:10px;padding:12px;color:var(--text);font-size:14px;outline:none" type="tel" placeholder="9 11 1234-5678" oninput="pacUpdateCelB6()" />
          <button onclick="authSaveCelularB6()" style="background:var(--gold);border:none;border-radius:8px;color:#000;font-size:12px;font-weight:600;padding:10px 14px;cursor:pointer;white-space:nowrap"><span data-i18n="guardar">Guardar</span></button>
        </div>
        <div style="font-size:11px;color:var(--gold);margin-top:4px" data-i18n="necesario_alertas">* Necesario para alertas automáticas</div>
        <div id="cel-txt-b6" style="font-size:11px;color:var(--green);margin-top:4px;min-height:14px"></div>
      </div>
```

---

## Cambio 2 — Líneas 2609-2643 (alertas individuales)

```html
      <div style="font-size:12px;color:var(--textSec);margin:8px 0 10px" data-i18n="recibir_notif_cuando">
        Recibí notificaciones push cuando ocurra:
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:0.5px solid var(--border)">
        <div style="display:flex;align-items:center;gap:8px;flex:1">
          <span style="font-size:16px">🎯</span>
          <div><div style="font-size:13px;color:var(--text);font-weight:500" data-i18n="alerta_precio_obj">Precio objetivo</div><div style="font-size:10px;color:var(--textSec);margin-top:2px" data-i18n="alerta_precio_obj_desc">Cuando un activo alcanza tu precio</div></div>
        </div>
        <div class="pac-toggle" onclick="pacAlerta(this,'alerta_precio')" data-on="1" style="width:44px;height:26px;background:var(--gold);border-radius:13px;display:flex;align-items:center;justify-content:flex-end;padding:0 3px;cursor:pointer"><div style="width:20px;height:20px;background:#000;border-radius:50%"></div></div>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:0.5px solid var(--border)">
        <div style="display:flex;align-items:center;gap:8px;flex:1">
          <span style="font-size:16px">🤖</span>
          <div><div style="font-size:13px;color:var(--text);font-weight:500" data-i18n="alerta_senal_ia">Señal IA</div><div style="font-size:10px;color:var(--textSec);margin-top:2px" data-i18n="alerta_senal_ia_desc">Nueva señal de compra o venta</div></div>
        </div>
        <div class="pac-toggle" onclick="pacAlerta(this,'alerta_ia')" data-on="1" style="width:44px;height:26px;background:var(--gold);border-radius:13px;display:flex;align-items:center;justify-content:flex-end;padding:0 3px;cursor:pointer"><div style="width:20px;height:20px;background:#000;border-radius:50%"></div></div>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:0.5px solid var(--border)">
        <div style="display:flex;align-items:center;gap:8px;flex:1">
          <span style="font-size:16px">📉</span>
          <div><div style="font-size:13px;color:var(--text);font-weight:500" data-i18n="alerta_variacion">Variación brusca</div><div style="font-size:10px;color:var(--textSec);margin-top:2px" data-i18n="alerta_variacion_desc">Sube o baja más del 5% en 24hs tu portafolio</div></div>
        </div>
        <div class="pac-toggle" onclick="pacAlerta(this,'alerta_variacion')" data-on="1" style="width:44px;height:26px;background:var(--gold);border-radius:13px;display:flex;align-items:center;justify-content:flex-end;padding:0 3px;cursor:pointer"><div style="width:20px;height:20px;background:#000;border-radius:50%"></div></div>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0">
        <div style="display:flex;align-items:center;gap:8px;flex:1">
          <span style="font-size:16px">🔴</span>
          <div><div style="font-size:13px;color:var(--text);font-weight:500" data-i18n="alerta_pulse_extremo">AUREX Pulse extremo</div><div style="font-size:10px;color:var(--textSec);margin-top:2px" data-i18n="alerta_pulse_desc">Cuando Pulse supera zona de riesgo</div></div>
        </div>
        <div class="pac-toggle" onclick="pacAlerta(this,'alerta_pulse')" data-on="1" style="width:44px;height:26px;background:var(--gold);border-radius:13px;display:flex;align-items:center;justify-content:flex-end;padding:0 3px;cursor:pointer"><div style="width:20px;height:20px;background:#000;border-radius:50%"></div></div>
      </div>
      <div style="background:var(--bg);border-radius:8px;padding:10px 12px;margin-top:10px;border:0.5px solid var(--border)">
        <div style="font-size:10px;color:var(--textSec);text-align:center" data-i18n="alertas_requieren_plan">
          🔒 Las alertas push requieren plan PRO o ELITE
        </div>
      </div>
```

---

## Cambio 3 — Líneas 2653-2691 (B7 contenido)

```html
      <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:0.5px solid var(--border)">
        <div style="display:flex;align-items:center;gap:8px;flex:1">
          <span style="font-size:18px">📲</span>
          <div><div style="font-size:13px;color:var(--text);font-weight:500" data-i18n="notif_push">Notificaciones push</div><div style="font-size:10px;color:var(--textSec);margin-top:2px" data-i18n="notif_push_desc">Activá todas las notificaciones</div></div>
        </div>
        <div onclick="pacNotif(this,'notif_push')" data-on="1" style="width:44px;height:26px;background:var(--gold);border-radius:13px;display:flex;align-items:center;justify-content:flex-end;padding:0 3px;cursor:pointer"><div style="width:20px;height:20px;background:#000;border-radius:50%"></div></div>
      </div>
      <div style="padding:10px 0;border-bottom:0.5px solid var(--border)">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div style="display:flex;align-items:center;gap:8px;flex:1">
            <span style="font-size:18px">📅</span>
            <div><div style="font-size:13px;color:var(--text);font-weight:500" data-i18n="notif_resumen">Resumen diario</div><div style="font-size:10px;color:var(--textSec);margin-top:2px" data-i18n="notif_resumen_desc">Recibí un resumen de tu portafolio</div></div>
          </div>
          <div onclick="pacNotif(this,'notif_resumen')" data-on="1" style="width:44px;height:26px;background:var(--gold);border-radius:13px;display:flex;align-items:center;justify-content:flex-end;padding:0 3px;cursor:pointer"><div style="width:20px;height:20px;background:#000;border-radius:50%"></div></div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;margin-top:8px;padding-left:34px">
          <div style="font-size:11px;color:var(--textSec)" data-i18n="notif_hora_resumen">Hora del resumen:</div>
          <div onclick="pacShowHoraPicker()" style="border:1px solid var(--gold);border-radius:6px;padding:4px 10px;cursor:pointer">
            <span id="notif-hora-display" style="font-size:12px;color:var(--gold);font-weight:600">09:00 ▾</span>
          </div>
          <input id="notif-hora" type="hidden" value="09:00" />
        </div>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:0.5px solid var(--border)">
        <div style="display:flex;align-items:center;gap:8px;flex:1">
          <span style="font-size:18px">💌</span>
          <div><div style="font-size:13px;color:var(--text);font-weight:500" data-i18n="notif_newsletter">Newsletter semanal</div><div style="font-size:10px;color:var(--textSec);margin-top:2px" data-i18n="notif_newsletter_desc">Análisis y novedades cada semana</div></div>
        </div>
        <div onclick="pacNotif(this,'notif_newsletter')" data-on="1" style="width:44px;height:26px;background:var(--gold);border-radius:13px;display:flex;align-items:center;justify-content:flex-end;padding:0 3px;cursor:pointer"><div style="width:20px;height:20px;background:#000;border-radius:50%"></div></div>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0">
        <div style="display:flex;align-items:center;gap:8px;flex:1">
          <span style="font-size:18px">🚀</span>
          <div><div style="font-size:13px;color:var(--text);font-weight:500" data-i18n="notif_novedades">Novedades AUREX</div><div style="font-size:10px;color:var(--textSec);margin-top:2px" data-i18n="notif_novedades_desc">Updates y nuevas funciones de la app</div></div>
        </div>
        <div onclick="pacNotif(this,'notif_novedades')" data-on="1" style="width:44px;height:26px;background:var(--gold);border-radius:13px;display:flex;align-items:center;justify-content:flex-end;padding:0 3px;cursor:pointer"><div style="width:20px;height:20px;background:#000;border-radius:50%"></div></div>
      </div>
```

---

## Cambio 4 — Línea 2559 (Face ID / Touch ID)

**ANTES**:
```html
            Face ID / Touch ID
```

**DESPUÉS**:
```html
            <span data-i18n="face_touch_id">Face ID / Touch ID</span>
```

---

## Keys: NO hay keys nuevas

Todas las keys usadas ya existen en aurex-i18n.js:
- `alertas_titulo_banner`, `alertas_desc_banner`, `recibir_alertas_numero`, `activar_notif_push`, `numero_celular_label`, `guardar`, `necesario_alertas`, `recibir_notif_cuando`
- `alerta_precio_obj`, `alerta_precio_obj_desc`, `alerta_senal_ia`, `alerta_senal_ia_desc`, `alerta_variacion`, `alerta_variacion_desc`, `alerta_pulse_extremo`, `alerta_pulse_desc`, `alertas_requieren_plan`
- `notif_push`, `notif_push_desc`, `notif_resumen`, `notif_resumen_desc`, `notif_hora_resumen`, `notif_newsletter`, `notif_newsletter_desc`, `notif_novedades`, `notif_novedades_desc`
- `face_touch_id`

Todas fueron definidas en el commit `1ebb850` (aurex-i18n.js original).
