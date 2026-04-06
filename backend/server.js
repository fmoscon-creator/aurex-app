require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Para el webhook de Lemon Squeezy necesitamos el raw body ANTES de parsear JSON
app.use('/webhook/lemonsqueezy', express.raw({ type: 'application/json' }));

// Para el resto de rutas usamos JSON normal
app.use(express.json());
app.use(cors());

// ─── HEALTH CHECK ────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ status: 'ok', app: 'AUREX Backend', time: new Date().toISOString() });
});

// ─── WEBHOOK LEMON SQUEEZY ───────────────────────────────────────────────────
// Lemon Squeezy llama a este endpoint cuando un pago se confirma
// Documentacion: https://docs.lemonsqueezy.com/help/webhooks
app.post('/webhook/lemonsqueezy', async (req, res) => {
  try {
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
    
    // Verificar firma de seguridad
    const signature = req.headers['x-signature'];
    if (!signature || !secret) {
      console.error('[Webhook LS] Sin firma o sin secret configurado');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(req.body);
    const digest = hmac.digest('hex');

    if (signature !== digest) {
      console.error('[Webhook LS] Firma invalida');
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // Parsear el evento
    const event = JSON.parse(req.body.toString());
    const eventName = event.meta?.event_name;
    console.log('[Webhook LS] Evento recibido:', eventName);

    // Procesar solo eventos de suscripcion creada o activada
    if (eventName === 'subscription_created' || eventName === 'subscription_updated') {
      const attrs = event.data?.attributes;
      const email = attrs?.user_email;
      const status = attrs?.status; // active, cancelled, expired, etc
      const variantName = attrs?.variant_name || '';

      if (!email) {
        console.error('[Webhook LS] No hay email en el evento');
        return res.status(400).json({ error: 'No email in event' });
      }

      // Determinar el plan segun el producto
      let nuevoPlan = 'free';
      if (status === 'active') {
        if (variantName.toLowerCase().includes('elite')) {
          nuevoPlan = 'elite';
        } else if (variantName.toLowerCase().includes('pro')) {
          nuevoPlan = 'pro';
        }
      }
      // Si la suscripcion se cancela o expira, volver a free
      if (status === 'cancelled' || status === 'expired' || status === 'past_due') {
        nuevoPlan = 'free';
      }

      console.log('[Webhook LS] Actualizando plan de', email, 'a', nuevoPlan);

      // Buscar el usuario en Supabase por email
      const { data: user, error: userError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single();

      if (userError || !user) {
        // Si no existe en profiles, buscar en auth.users
        console.log('[Webhook LS] Usuario no encontrado en profiles, buscando en auth');
        const { data: authUser, error: authError } = await supabase.auth.admin.getUserByEmail(email);
        if (authError || !authUser?.user) {
          console.error('[Webhook LS] Usuario no encontrado:', email);
          return res.status(200).json({ received: true, warning: 'User not found' });
        }
        // Crear perfil si no existe
        await supabase.from('profiles').upsert({
          id: authUser.user.id,
          email: email,
          plan: nuevoPlan,
          updated_at: new Date().toISOString()
        });
      } else {
        // Actualizar el plan en la tabla profiles
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ plan: nuevoPlan, updated_at: new Date().toISOString() })
          .eq('email', email);

        if (updateError) {
          console.error('[Webhook LS] Error al actualizar plan:', updateError.message);
          return res.status(500).json({ error: 'DB update failed' });
        }
      }

      console.log('[Webhook LS] Plan actualizado correctamente:', email, '->', nuevoPlan);
    }

    res.status(200).json({ received: true });

  } catch (err) {
    console.error('[Webhook LS] Error inesperado:', err.message);
    res.status(500).json({ error: 'Internal error' });
  }
});

// ─── CRON JOB — MONITOREO DE ALERTAS (cada 5 minutos) ───────────────────────
cron.schedule('*/5 * * * *', async () => {
  console.log('[Cron] Verificando alertas de precio...');
  try {
    const { data: alertas, error } = await supabase
      .from('alertas')
      .select('*')
      .eq('activa', true);

    if (error) {
      console.error('[Cron] Error leyendo alertas:', error.message);
      return;
    }

    if (!alertas || alertas.length === 0) {
      console.log('[Cron] Sin alertas activas');
      return;
    }

    console.log('[Cron]', alertas.length, 'alertas activas encontradas');
    // TODO: verificar precios y disparar notificaciones push
  } catch (err) {
    console.error('[Cron] Error inesperado:', err.message);
  }
});

// ─── CACHE DE SENALES IA ─────────────────────────────────────────────────────
// La PWA escribe aqui las senales calculadas, la app nativa las lee
let _iaSignalsCache = { signals: [], updatedAt: null };

app.post('/api/ia-signals', (req, res) => {
  try {
    _iaSignalsCache = { signals: req.body || [], updatedAt: new Date().toISOString() };
    res.json({ ok: true, count: _iaSignalsCache.signals.length });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/ia-signals', (req, res) => {
  res.json(_iaSignalsCache);
});

// ─── INICIAR SERVIDOR ────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('[AUREX Backend] Corriendo en puerto', PORT);
});
