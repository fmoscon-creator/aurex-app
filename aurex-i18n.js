/* aurex-i18n.js — Sistema de internacionalización PWA AUREX
   Replica el sistema de AurexApp/src/lib/i18n.js para vanilla JS.
   Tab Perfil + Login completo — 8 idiomas.
*/

(function() {
  'use strict';

  var _lang = localStorage.getItem('aurex_lang') || 'es';
  var _listeners = [];

  // ═══ TRADUCCIONES ═══
  var T = {

    // === TABS ===
    tab_portfolio: { es: 'Portfolio', en: 'Portfolio', pt: 'Portfólio', zh: '投资组合', fr: 'Portfolio', it: 'Portfolio', hi: 'Portfolio', ar: 'Portfolio' },
    tab_mercados: { es: 'Mercados', en: 'Markets', pt: 'Mercados', zh: '市场', fr: 'Marchés', it: 'Mercati', hi: 'बाज़ार', ar: 'الأسواق' },
    tab_watchlist: { es: 'Watchlist', en: 'Watchlist', pt: 'Watchlist', zh: '自选列表', fr: 'Watchlist', it: 'Watchlist', hi: 'Watchlist', ar: 'Watchlist' },
    tab_alertas: { es: 'Alertas', en: 'Alerts', pt: 'Alertas', zh: '提醒', fr: 'Alertes', it: 'Avvisi', hi: 'अलर्ट', ar: 'تنبيهات' },
    tab_perfil: { es: 'Perfil', en: 'Profile', pt: 'Perfil', zh: '个人资料', fr: 'Profil', it: 'Profilo', hi: 'प्रोफ़ाइल', ar: 'الملف الشخصي' },

    // === LOGIN ===
    login_subtitle: { es: 'Portfolio Tracker con IA', en: 'AI Portfolio Tracker', pt: 'Portfolio Tracker com IA', zh: 'AI投资组合追踪器', fr: 'Portfolio Tracker avec IA', it: 'Portfolio Tracker con IA', hi: 'AI Portfolio Tracker', ar: 'Portfolio Tracker مع AI' },
    email_placeholder: { es: 'Email', en: 'Email', pt: 'Email', zh: '邮箱', fr: 'Email', it: 'Email', hi: 'ईमेल', ar: 'البريد الإلكتروني' },
    contrasena_placeholder: { es: 'Contraseña', en: 'Password', pt: 'Senha', zh: '密码', fr: 'Mot de passe', it: 'Password', hi: 'पासवर्ड', ar: 'كلمة المرور' },
    login_btn: { es: 'Ingresar', en: 'Log in', pt: 'Entrar', zh: '登录', fr: 'Se connecter', it: 'Accedi', hi: 'लॉग इन', ar: 'تسجيل الدخول' },
    contrasena_min6: { es: 'Contraseña (mín 6 car.)', en: 'Password (min 6 chars)', pt: 'Senha (mín 6 car.)', zh: '密码（至少6位）', fr: 'Mot de passe (min 6 car.)', it: 'Password (min 6 car.)', hi: 'पासवर्ड (न्यूनतम 6 अक्षर)', ar: 'كلمة المرور (6 أحرف على الأقل)' },
    registro_hint_celular: { es: '* Para recibir alertas automáticas de señales IA', en: '* To receive automatic AI signal alerts', pt: '* Para receber alertas automáticas de sinais IA', zh: '* 用于接收自动AI信号提醒', fr: '* Pour recevoir les alertes automatiques de signaux IA', it: '* Per ricevere avvisi automatici dei segnali IA', hi: '* स्वचालित AI सिग्नल अलर्ट प्राप्त करने के लिए', ar: '* لتلقي تنبيهات إشارات AI التلقائية' },
    crear_cuenta_btn: { es: 'Crear cuenta', en: 'Create account', pt: 'Criar conta', zh: '创建账户', fr: 'Créer un compte', it: 'Crea account', hi: 'खाता बनाएँ', ar: 'إنشاء حساب' },
    no_tenes_cuenta: { es: '¿No tenés cuenta?', en: "Don't have an account?", pt: 'Não tem conta?', zh: '没有账户？', fr: "Pas de compte ?", it: 'Non hai un account?', hi: 'खाता नहीं है?', ar: 'ليس لديك حساب؟' },
    registrate: { es: 'Registrate', en: 'Sign up', pt: 'Cadastre-se', zh: '注册', fr: "S'inscrire", it: 'Registrati', hi: 'साइन अप', ar: 'سجّل' },
    ya_tenes_cuenta: { es: '¿Ya tenés cuenta?', en: 'Already have an account?', pt: 'Já tem conta?', zh: '已有账户？', fr: 'Déjà un compte ?', it: 'Hai già un account?', hi: 'पहले से खाता है?', ar: 'لديك حساب بالفعل؟' },
    ingresa: { es: 'Ingresá', en: 'Log in', pt: 'Entrar', zh: '登录', fr: 'Connectez-vous', it: 'Accedi', hi: 'लॉग इन', ar: 'سجّل الدخول' },
    completar_campos: { es: 'Completá todos los campos', en: 'Fill in all fields', pt: 'Preencha todos os campos', zh: '请填写所有字段', fr: 'Remplissez tous les champs', it: 'Compila tutti i campi', hi: 'सभी फ़ील्ड भरें', ar: 'املأ جميع الحقول' },
    completar_email_pass: { es: 'Completá email y contraseña', en: 'Enter email and password', pt: 'Preencha email e senha', zh: '请输入邮箱和密码', fr: 'Entrez email et mot de passe', it: 'Inserisci email e password', hi: 'ईमेल और पासवर्ड दर्ज करें', ar: 'أدخل البريد الإلكتروني وكلمة المرور' },
    pass_min6_error: { es: 'La contraseña debe tener al menos 6 caracteres', en: 'Password must be at least 6 characters', pt: 'A senha deve ter pelo menos 6 caracteres', zh: '密码至少需要6个字符', fr: 'Le mot de passe doit contenir au moins 6 caractères', it: 'La password deve avere almeno 6 caratteri', hi: 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए', ar: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' },
    error_sesion: { es: 'Error: sesión no iniciada', en: 'Error: session not started', pt: 'Erro: sessão não iniciada', zh: '错误：会话未启动', fr: 'Erreur : session non démarrée', it: 'Errore: sessione non avviata', hi: 'त्रुटि: सत्र शुरू नहीं हुआ', ar: 'خطأ: لم يتم بدء الجلسة' },
    ingresa_celular: { es: 'Ingresá un número de celular', en: 'Enter a phone number', pt: 'Insira um número de celular', zh: '输入手机号码', fr: 'Entrez un numéro de téléphone', it: 'Inserisci un numero di cellulare', hi: 'मोबाइल नंबर दर्ज करें', ar: 'أدخل رقم هاتف محمول' },

    // === B1: USUARIO ===
    b1_usuario: { es: '👤 Usuario', en: '👤 User', pt: '👤 Usuário', zh: '👤 用户', fr: '👤 Utilisateur', it: '👤 Utente', hi: '👤 उपयोगकर्ता', ar: '👤 المستخدم' },
    plan_free_badge: { es: 'PLAN FREE', en: 'FREE PLAN', pt: 'PLANO FREE', zh: 'FREE方案', fr: 'PLAN FREE', it: 'PIANO FREE', hi: 'FREE योजना', ar: 'خطة FREE' },
    invitado: { es: 'Invitado', en: 'Guest', pt: 'Convidado', zh: '访客', fr: 'Invité', it: 'Ospite', hi: 'अतिथि', ar: 'ضيف' },
    sin_cuenta: { es: 'Sin cuenta', en: 'No account', pt: 'Sem conta', zh: '未注册', fr: 'Pas de compte', it: 'Senza account', hi: 'खाता नहीं', ar: 'بدون حساب' },

    // === B2: PLAN ACTUAL ===
    b2_plan_actual: { es: '⭐ Plan actual', en: '⭐ Current plan', pt: '⭐ Plano atual', zh: '⭐ 当前方案', fr: '⭐ Plan actuel', it: '⭐ Piano attuale', hi: '⭐ वर्तमान योजना', ar: '⭐ الخطة الحالية' },
    free_label: { es: 'FREE', en: 'FREE', pt: 'FREE', zh: 'FREE', fr: 'FREE', it: 'FREE', hi: 'FREE', ar: 'FREE' },
    plan_gratuito: { es: 'Plan gratuito', en: 'Free plan', pt: 'Plano gratuito', zh: '免费方案', fr: 'Plan gratuit', it: 'Piano gratuito', hi: 'मुफ़्त योजना', ar: 'خطة مجانية' },
    plan_free_desc: { es: '5 activos • 3 señales IA/día • AUREX Pulse básico', en: '5 assets • 3 AI signals/day • Basic AUREX Pulse', pt: '5 ativos • 3 sinais IA/dia • AUREX Pulse básico', zh: '5个资产 • 每日3个AI信号 • 基础AUREX Pulse', fr: '5 actifs • 3 signaux IA/jour • AUREX Pulse basique', it: '5 asset • 3 segnali IA/giorno • AUREX Pulse base', hi: '5 एसेट • 3 AI सिग्नल/दिन • बुनियादी AUREX Pulse', ar: '5 أصول • 3 إشارات AI/يوم • AUREX Pulse أساسي' },
    ver_planes_btn: { es: '🚀 Ver planes y ventajas', en: '🚀 View plans and benefits', pt: '🚀 Ver planos e vantagens', zh: '🚀 查看方案和优势', fr: '🚀 Voir les plans et avantages', it: '🚀 Vedi piani e vantaggi', hi: '🚀 योजनाएँ और लाभ देखें', ar: '🚀 عرض الخطط والمزايا' },

    // === B3: MI CUENTA ===
    b3_mi_cuenta: { es: '⚙️ Mi cuenta', en: '⚙️ My account', pt: '⚙️ Minha conta', zh: '⚙️ 我的账户', fr: '⚙️ Mon compte', it: '⚙️ Il mio account', hi: '⚙️ मेरा खाता', ar: '⚙️ حسابي' },
    nombre_label: { es: 'Nombre', en: 'Name', pt: 'Nome', zh: '名称', fr: 'Nom', it: 'Nome', hi: 'नाम', ar: 'الاسم' },
    tu_nombre_placeholder: { es: 'Tu nombre', en: 'Your name', pt: 'Seu nome', zh: '您的名字', fr: 'Votre nom', it: 'Il tuo nome', hi: 'आपका नाम', ar: 'اسمك' },
    guardar: { es: 'Guardar', en: 'Save', pt: 'Salvar', zh: '保存', fr: 'Enregistrer', it: 'Salva', hi: 'सहेजें', ar: 'حفظ' },
    email_label: { es: 'Email', en: 'Email', pt: 'Email', zh: '邮箱', fr: 'Email', it: 'Email', hi: 'ईमेल', ar: 'البريد الإلكتروني' },
    email_no_editar: { es: '🔒 El email no se puede modificar', en: '🔒 Email cannot be changed', pt: '🔒 O email não pode ser modificado', zh: '🔒 邮箱不可修改', fr: "🔒 L'email ne peut pas être modifié", it: "🔒 L'email non può essere modificata", hi: '🔒 ईमेल बदला नहीं जा सकता', ar: '🔒 لا يمكن تعديل البريد الإلكتروني' },
    telefono_label: { es: 'Teléfono', en: 'Phone', pt: 'Telefone', zh: '电话', fr: 'Téléphone', it: 'Telefono', hi: 'फ़ोन', ar: 'الهاتف' },
    necesario_alertas: { es: '* Necesario para alertas automáticas', en: '* Required for automatic alerts', pt: '* Necessário para alertas automáticas', zh: '* 自动提醒所需', fr: '* Nécessaire pour les alertes automatiques', it: '* Necessario per gli avvisi automatici', hi: '* स्वचालित अलर्ट के लिए आवश्यक', ar: '* مطلوب للتنبيهات التلقائية' },
    contrasena_label: { es: 'Contraseña', en: 'Password', pt: 'Senha', zh: '密码', fr: 'Mot de passe', it: 'Password', hi: 'पासवर्ड', ar: 'كلمة المرور' },
    nueva_contrasena: { es: 'Nueva contraseña', en: 'New password', pt: 'Nova senha', zh: '新密码', fr: 'Nouveau mot de passe', it: 'Nuova password', hi: 'नया पासवर्ड', ar: 'كلمة مرور جديدة' },
    repetir_contrasena: { es: 'Repetir contraseña', en: 'Repeat password', pt: 'Repetir senha', zh: '重复密码', fr: 'Répéter le mot de passe', it: 'Ripeti password', hi: 'पासवर्ड दोहराएँ', ar: 'تكرار كلمة المرور' },
    cambiar_contrasena_btn: { es: 'Cambiar contraseña', en: 'Change password', pt: 'Alterar senha', zh: '修改密码', fr: 'Changer le mot de passe', it: 'Cambia password', hi: 'पासवर्ड बदलें', ar: 'تغيير كلمة المرور' },
    contrasena_actualizada: { es: 'Contraseña actualizada', en: 'Password updated', pt: 'Senha atualizada', zh: '密码已更新', fr: 'Mot de passe mis à jour', it: 'Password aggiornata', hi: 'पासवर्ड अपडेट किया गया', ar: 'تم تحديث كلمة المرور' },
    contrasenas_no_coinciden: { es: 'Las contraseñas no coinciden', en: 'Passwords do not match', pt: 'As senhas não coincidem', zh: '密码不匹配', fr: 'Les mots de passe ne correspondent pas', it: 'Le password non corrispondono', hi: 'पासवर्ड मेल नहीं खाते', ar: 'كلمتا المرور غير متطابقتين' },
    telefono_guardado: { es: 'Teléfono guardado', en: 'Phone saved', pt: 'Telefone salvo', zh: '电话已保存', fr: 'Téléphone enregistré', it: 'Telefono salvato', hi: 'फ़ोन सहेजा गया', ar: 'تم حفظ الهاتف' },

    // === B4: PREFERENCIAS ===
    b4_preferencias: { es: '🎨 Preferencias', en: '🎨 Preferences', pt: '🎨 Preferências', zh: '🎨 偏好设置', fr: '🎨 Préférences', it: '🎨 Preferenze', hi: '🎨 प्राथमिकताएँ', ar: '🎨 التفضيلات' },
    tema_label: { es: '🌓 Tema', en: '🌓 Theme', pt: '🌓 Tema', zh: '🌓 主题', fr: '🌓 Thème', it: '🌓 Tema', hi: '🌓 थीम', ar: '🌓 المظهر' },
    tema_desc: { es: 'Elegí cómo se ve la app', en: 'Choose how the app looks', pt: 'Escolha a aparência do app', zh: '选择应用外观', fr: "Choisissez l'apparence de l'app", it: "Scegli l'aspetto dell'app", hi: 'ऐप कैसा दिखे चुनें', ar: 'اختر مظهر التطبيق' },
    tema_auto: { es: 'Auto', en: 'Auto', pt: 'Auto', zh: '自动', fr: 'Auto', it: 'Auto', hi: 'स्वचालित', ar: 'تلقائي' },
    tema_claro: { es: 'Claro', en: 'Light', pt: 'Claro', zh: '浅色', fr: 'Clair', it: 'Chiaro', hi: 'लाइट', ar: 'فاتح' },
    tema_oscuro: { es: 'Oscuro', en: 'Dark', pt: 'Escuro', zh: '深色', fr: 'Sombre', it: 'Scuro', hi: 'डार्क', ar: 'داكن' },
    idioma_label: { es: '🌐 Idioma', en: '🌐 Language', pt: '🌐 Idioma', zh: '🌐 语言', fr: '🌐 Langue', it: '🌐 Lingua', hi: '🌐 भाषा', ar: '🌐 اللغة' },
    pulse_indicador: { es: '🔴 Indicador AUREX Pulse', en: '🔴 AUREX Pulse Indicator', pt: '🔴 Indicador AUREX Pulse', zh: '🔴 AUREX Pulse 指标', fr: '🔴 Indicateur AUREX Pulse', it: '🔴 Indicatore AUREX Pulse', hi: '🔴 AUREX Pulse संकेतक', ar: '🔴 مؤشر AUREX Pulse' },
    pulse_indicador_desc: { es: 'Visible en tab Mercados', en: 'Visible in Markets tab', pt: 'Visível na aba Mercados', zh: '在市场标签页中可见', fr: "Visible dans l'onglet Marchés", it: 'Visibile nella scheda Mercati', hi: 'बाज़ार टैब में दिखाई देता है', ar: 'مرئي في تبويب الأسواق' },

    // === B5: SEGURIDAD ===
    b5_seguridad: { es: '🔒 Seguridad', en: '🔒 Security', pt: '🔒 Segurança', zh: '🔒 安全', fr: '🔒 Sécurité', it: '🔒 Sicurezza', hi: '🔒 सुरक्षा', ar: '🔒 الأمان' },
    auth_2fa: { es: '📱 Autenticación en 2 pasos', en: '📱 Two-factor authentication', pt: '📱 Autenticação em 2 etapas', zh: '📱 两步验证', fr: '📱 Authentification en 2 étapes', it: '📱 Autenticazione a 2 fattori', hi: '📱 2-चरण प्रमाणीकरण', ar: '📱 المصادقة بخطوتين' },
    soon_badge: { es: 'SOON', en: 'SOON', pt: 'SOON', zh: 'SOON', fr: 'SOON', it: 'SOON', hi: 'SOON', ar: 'SOON' },
    auth_2fa_desc: { es: 'Protección extra al iniciar sesión', en: 'Extra protection when logging in', pt: 'Proteção extra ao iniciar sessão', zh: '登录时的额外保护', fr: 'Protection supplémentaire à la connexion', it: 'Protezione extra al login', hi: 'लॉगिन पर अतिरिक्त सुरक्षा', ar: 'حماية إضافية عند تسجيل الدخول' },
    acceso_biometrico: { es: '👁 Acceso biométrico', en: '👁 Biometric access', pt: '👁 Acesso biométrico', zh: '👁 生物识别访问', fr: '👁 Accès biométrique', it: '👁 Accesso biometrico', hi: '👁 बायोमेट्रिक एक्सेस', ar: '👁 الوصول البيومتري' },
    face_touch_id: { es: 'Face ID / Touch ID', en: 'Face ID / Touch ID', pt: 'Face ID / Touch ID', zh: 'Face ID / Touch ID', fr: 'Face ID / Touch ID', it: 'Face ID / Touch ID', hi: 'Face ID / Touch ID', ar: 'Face ID / Touch ID' },
    sesion_activa: { es: '👨‍💻 Sesión activa', en: '👨‍💻 Active session', pt: '👨‍💻 Sessão ativa', zh: '👨‍💻 活跃会话', fr: '👨‍💻 Session active', it: '👨‍💻 Sessione attiva', hi: '👨‍💻 सक्रिय सत्र', ar: '👨‍💻 جلسة نشطة' },
    este_dispositivo: { es: 'Este dispositivo', en: 'This device', pt: 'Este dispositivo', zh: '此设备', fr: 'Cet appareil', it: 'Questo dispositivo', hi: 'यह डिवाइस', ar: 'هذا الجهاز' },
    sesion_actual: { es: 'Sesión actual', en: 'Current session', pt: 'Sessão atual', zh: '当前会话', fr: 'Session actuelle', it: 'Sessione attuale', hi: 'वर्तमान सत्र', ar: 'الجلسة الحالية' },
    ultimos_accesos: { es: '🕐 Últimos accesos', en: '🕐 Recent access', pt: '🕐 Últimos acessos', zh: '🕐 最近访问', fr: '🕐 Derniers accès', it: '🕐 Accessi recenti', hi: '🕐 हाल की पहुँच', ar: '🕐 آخر الدخول' },
    hoy: { es: 'Hoy', en: 'Today', pt: 'Hoje', zh: '今日', fr: "Aujourd'hui", it: 'Oggi', hi: 'आज', ar: 'اليوم' },
    navegador_web: { es: 'Navegador web', en: 'Web browser', pt: 'Navegador web', zh: '网页浏览器', fr: 'Navigateur web', it: 'Browser web', hi: 'वेब ब्राउज़र', ar: 'متصفح الويب' },

    // === B6: ALERTAS (Perfil) ===
    b6_alertas: { es: '🔔 Alertas', en: '🔔 Alerts', pt: '🔔 Alertas', zh: '🔔 提醒', fr: '🔔 Alertes', it: '🔔 Avvisi', hi: '🔔 अलर्ट', ar: '🔔 تنبيهات' },
    alertas_titulo_banner: { es: '⚡ TU NÚMERO, TUS ALERTAS AL INSTANTE', en: '⚡ YOUR NUMBER, YOUR ALERTS INSTANTLY', pt: '⚡ SEU NÚMERO, SEUS ALERTAS INSTANTÂNEOS', zh: '⚡ 您的号码，即时提醒', fr: '⚡ VOTRE NUMÉRO, VOS ALERTES INSTANTANÉMENT', it: '⚡ IL TUO NUMERO, I TUOI AVVISI ISTANTANEI', hi: '⚡ आपका नंबर, तुरंत अलर्ट', ar: '⚡ رقمك، تنبيهاتك فوراً' },
    alertas_desc_banner: { es: 'AUREX te avisa directo a tu celéfono cuando el mercado se mueve. Sin delays.', en: 'AUREX alerts you directly on your phone when the market moves. No delays.', pt: 'AUREX avisa direto no seu celular quando o mercado se move. Sem atrasos.', zh: 'AUREX在市场波动时直接通知您的手机。零延迟。', fr: 'AUREX vous alerte directement sur votre téléphone quand le marché bouge. Sans délai.', it: 'AUREX ti avvisa direttamente sul cellulare quando il mercato si muove. Senza ritardi.', hi: 'AUREX बाज़ार में बदलाव पर सीधे आपके फ़ोन पर सूचित करता है। बिना देरी।', ar: 'AUREX ينبهك مباشرة على هاتفك عندما يتحرك السوق. بدون تأخير.' },
    recibir_alertas_numero: { es: 'Recibir alertas en este número', en: 'Receive alerts on this number', pt: 'Receber alertas neste número', zh: '在此号码接收提醒', fr: 'Recevoir les alertes sur ce numéro', it: 'Ricevi avvisi su questo numero', hi: 'इस नंबर पर अलर्ट प्राप्त करें', ar: 'تلقي التنبيهات على هذا الرقم' },
    activar_notif_push: { es: 'Activá para recibir notificaciones push', en: 'Activate to receive push notifications', pt: 'Ative para receber notificações push', zh: '启用以接收推送通知', fr: 'Activer pour recevoir les notifications push', it: 'Attiva per ricevere notifiche push', hi: 'पुश सूचनाएँ प्राप्त करने के लिए सक्रिय करें', ar: 'فعّل لتلقي إشعارات Push' },
    numero_celular_label: { es: 'Número de celular', en: 'Phone number', pt: 'Número de celular', zh: '手机号码', fr: 'Numéro de téléphone', it: 'Numero di cellulare', hi: 'मोबाइल नंबर', ar: 'رقم الهاتف المحمول' },
    recibir_notif_cuando: { es: 'Recibí notificaciones push cuando ocurra:', en: 'Receive push notifications when:', pt: 'Receba notificações push quando ocorrer:', zh: '发生以下情况时接收推送通知：', fr: 'Recevez des notifications push quand :', it: 'Ricevi notifiche push quando:', hi: 'इन स्थितियों में पुश सूचनाएँ प्राप्त करें:', ar: 'تلقي إشعارات Push عند حدوث:' },
    alerta_precio_obj: { es: 'Precio objetivo', en: 'Target price', pt: 'Preço alvo', zh: '目标价格', fr: 'Prix objectif', it: 'Prezzo obiettivo', hi: 'लक्ष्य मूल्य', ar: 'السعر المستهدف' },
    alerta_precio_obj_desc: { es: 'Cuando un activo alcanza tu precio', en: 'When an asset reaches your target price', pt: 'Quando um ativo atinge seu preço', zh: '当资产达到您的价格时', fr: 'Quand un actif atteint votre prix', it: 'Quando un asset raggiunge il tuo prezzo', hi: 'जब कोई एसेट आपके मूल्य पर पहुँचता है', ar: 'عندما يصل أصل إلى سعرك' },
    alerta_senal_ia: { es: 'Señal IA', en: 'AI Signal', pt: 'Sinal IA', zh: 'AI信号', fr: 'Signal IA', it: 'Segnale IA', hi: 'AI सिग्नल', ar: 'إشارة AI' },
    alerta_senal_ia_desc: { es: 'Nueva señal de compra o venta', en: 'New buy or sell signal', pt: 'Novo sinal de compra ou venda', zh: '新的买卖信号', fr: "Nouveau signal d'achat ou de vente", it: 'Nuovo segnale di acquisto o vendita', hi: 'नया खरीद या बिक्री सिग्नल', ar: 'إشارة شراء أو بيع جديدة' },
    alerta_variacion: { es: 'Variación brusca', en: 'Sharp variation', pt: 'Variação brusca', zh: '剧烈波动', fr: 'Variation brusque', it: 'Variazione brusca', hi: 'तीव्र भिन्नता', ar: 'تغير حاد' },
    alerta_variacion_desc: { es: 'Sube o baja más del 5% en 24hs tu portafolio', en: 'Your portfolio rises or falls more than 5% in 24h', pt: 'Portfólio sobe ou desce mais de 5% em 24h', zh: '投资组合24小时内涨跌超过5%', fr: 'Le portfolio monte ou descend de plus de 5% en 24h', it: 'Il tuo portafoglio sale o scende di più del 5% in 24h', hi: '24 घंटे में आपका portfolio 5% से अधिक बढ़ता या गिरता है', ar: 'محفظتك ترتفع أو تنخفض أكثر من 5% خلال 24 ساعة' },
    alerta_pulse_extremo: { es: 'AUREX Pulse extremo', en: 'Extreme AUREX Pulse', pt: 'AUREX Pulse extremo', zh: 'AUREX Pulse 极端', fr: 'AUREX Pulse extrême', it: 'AUREX Pulse estremo', hi: 'AUREX Pulse चरम', ar: 'AUREX Pulse متطرف' },
    alerta_pulse_desc: { es: 'Cuando Pulse supera zona de riesgo', en: 'When Pulse exceeds risk zone', pt: 'Quando Pulse supera zona de risco', zh: '当Pulse超过风险区域时', fr: 'Quand Pulse dépasse la zone de risque', it: 'Quando Pulse supera la zona di rischio', hi: 'जब Pulse जोखिम ज़ोन से ऊपर जाता है', ar: 'عندما يتجاوز Pulse منطقة المخاطر' },
    alertas_requieren_plan: { es: '🔒 Las alertas push requieren plan PRO o ELITE', en: '🔒 Push alerts require PRO or ELITE plan', pt: '🔒 Alertas push requerem plano PRO ou ELITE', zh: '🔒 推送提醒需要PRO或ELITE方案', fr: '🔒 Les alertes push nécessitent le plan PRO ou ELITE', it: '🔒 Gli avvisi push richiedono il piano PRO o ELITE', hi: '🔒 पुश अलर्ट के लिए PRO या ELITE योजना आवश्यक', ar: '🔒 تنبيهات Push تتطلب خطة PRO أو ELITE' },

    // === B7: NOTIFICACIONES ===
    b7_notificaciones: { es: '📩 Notificaciones', en: '📩 Notifications', pt: '📩 Notificações', zh: '📩 通知', fr: '📩 Notifications', it: '📩 Notifiche', hi: '📩 सूचनाएँ', ar: '📩 الإشعارات' },
    notif_push: { es: 'Notificaciones push', en: 'Push notifications', pt: 'Notificações push', zh: '推送通知', fr: 'Notifications push', it: 'Notifiche push', hi: 'पुश सूचनाएँ', ar: 'إشعارات Push' },
    notif_push_desc: { es: 'Activá todas las notificaciones', en: 'Activate all notifications', pt: 'Ative todas as notificações', zh: '启用所有通知', fr: 'Activer toutes les notifications', it: 'Attiva tutte le notifiche', hi: 'सभी सूचनाएँ सक्रिय करें', ar: 'فعّل جميع الإشعارات' },
    notif_resumen: { es: 'Resumen diario', en: 'Daily summary', pt: 'Resumo diário', zh: '每日摘要', fr: 'Résumé quotidien', it: 'Riepilogo giornaliero', hi: 'दैनिक सारांश', ar: 'ملخص يومي' },
    notif_resumen_desc: { es: 'Recibí un resumen de tu portafolio', en: 'Receive a summary of your portfolio', pt: 'Receba um resumo do seu portfólio', zh: '接收投资组合摘要', fr: 'Recevez un résumé de votre portefeuille', it: 'Ricevi un riepilogo del tuo portafoglio', hi: 'अपने portfolio का सारांश प्राप्त करें', ar: 'تلقي ملخص محفظتك' },
    notif_hora_resumen: { es: 'Hora del resumen:', en: 'Summary time:', pt: 'Hora do resumo:', zh: '摘要时间:', fr: 'Heure du résumé :', it: 'Ora del riepilogo:', hi: 'सारांश का समय:', ar: 'وقت الملخص:' },
    notif_newsletter: { es: 'Newsletter semanal', en: 'Weekly newsletter', pt: 'Newsletter semanal', zh: '每周通讯', fr: 'Newsletter hebdomadaire', it: 'Newsletter settimanale', hi: 'साप्ताहिक न्यूज़लेटर', ar: 'نشرة أسبوعية' },
    notif_newsletter_desc: { es: 'Análisis y novedades cada semana', en: 'Analysis and news every week', pt: 'Análises e novidades toda semana', zh: '每周分析和新闻', fr: 'Analyses et actualités chaque semaine', it: 'Analisi e novità ogni settimana', hi: 'हर सप्ताह विश्लेषण और समाचार', ar: 'تحليلات وأخبار كل أسبوع' },
    notif_novedades: { es: 'Novedades AUREX', en: 'AUREX Updates', pt: 'Novidades AUREX', zh: 'AUREX更新', fr: 'Nouveautés AUREX', it: 'Novità AUREX', hi: 'AUREX अपडेट', ar: 'جديد AUREX' },
    notif_novedades_desc: { es: 'Updates y nuevas funciones de la app', en: 'Updates and new app features', pt: 'Atualizações e novos recursos do app', zh: '应用更新和新功能', fr: "Mises à jour et nouvelles fonctionnalités de l'application", it: "Aggiornamenti e nuove funzionalità dell'app", hi: 'ऐप अपडेट और नई सुविधाएँ', ar: 'تحديثات وميزات جديدة للتطبيق' },

    // === B8: SOPORTE ===
    b8_soporte: { es: '💬 Soporte', en: '💬 Support', pt: '💬 Suporte', zh: '💬 支持', fr: '💬 Support', it: '💬 Supporto', hi: '💬 सहायता', ar: '💬 الدعم' },
    centro_ayuda: { es: 'Centro de ayuda', en: 'Help center', pt: 'Central de ajuda', zh: '帮助中心', fr: "Centre d'aide", it: 'Centro assistenza', hi: 'सहायता केंद्र', ar: 'مركز المساعدة' },
    centro_ayuda_desc: { es: 'Preguntas frecuentes y guías', en: 'FAQ and guides', pt: 'Perguntas frequentes e guias', zh: '常见问题和指南', fr: 'Questions fréquentes et guides', it: 'Domande frequenti e guide', hi: 'अक्सर पूछे जाने वाले प्रश्न और गाइड', ar: 'الأسئلة الشائعة والأدلة' },
    calificar_aurex: { es: 'Calificá AUREX', en: 'Rate AUREX', pt: 'Avalie o AUREX', zh: '给AUREX评分', fr: 'Évaluez AUREX', it: 'Valuta AUREX', hi: 'AUREX को रेट करें', ar: 'قيّم AUREX' },
    calificar_desc: { es: 'Tu opinión nos ayuda a mejorar', en: 'Your feedback helps us improve', pt: 'Sua opinião nos ajuda a melhorar', zh: '您的意见帮助我们改进', fr: 'Votre avis nous aide à nous améliorer', it: 'La tua opinione ci aiuta a migliorare', hi: 'आपकी राय हमें बेहतर बनाने में मदद करती है', ar: 'رأيك يساعدنا على التحسين' },
    contactar_soporte: { es: 'Contactar soporte', en: 'Contact support', pt: 'Contatar suporte', zh: '联系客服', fr: 'Contacter le support', it: 'Contatta il supporto', hi: 'सहायता से संपर्क करें', ar: 'تواصل مع الدعم' },
    siguenos: { es: 'Síguenos', en: 'Follow us', pt: 'Siga-nos', zh: '关注我们', fr: 'Suivez-nous', it: 'Seguici', hi: 'हमें फ़ॉलो करें', ar: 'تابعنا' },
    version_app: { es: 'Versión de la app', en: 'App version', pt: 'Versão do app', zh: '应用版本', fr: "Version de l'application", it: "Versione dell'app", hi: 'ऐप संस्करण', ar: 'إصدار التطبيق' },
    terminos_uso: { es: 'Términos de uso', en: 'Terms of use', pt: 'Termos de uso', zh: '使用条款', fr: "Conditions d'utilisation", it: "Termini d'uso", hi: 'उपयोग की शर्तें', ar: 'شروط الاستخدام' },
    politica_privacidad: { es: 'Política de privacidad', en: 'Privacy policy', pt: 'Política de privacidade', zh: '隐私政策', fr: 'Politique de confidentialité', it: 'Informativa sulla privacy', hi: 'गोपनीयता नीति', ar: 'سياسة الخصوصية' },
    disclaimer_legal: {
      es: 'AUREX no es un asesor financiero. Las señales, análisis e indicadores mostrados son generados por algoritmos automatizados y no deben interpretarse como garantía de resultados futuros. Invertir conlleva riesgos, incluida la posible pérdida del capital invertido. Consulte siempre a un asesor financiero certificado antes de tomar decisiones de inversión.',
      en: 'AUREX is not a financial advisor. The signals, analysis and indicators shown are generated by automated algorithms and should not be interpreted as a guarantee of future results. Investing involves risks, including the possible loss of invested capital. Always consult a certified financial advisor before making investment decisions.',
      pt: 'AUREX não é um assessor financeiro. Os sinais, análises e indicadores exibidos são gerados por algoritmos automatizados e não devem ser interpretados como garantia de resultados futuros. Investir envolve riscos, incluindo a possível perda do capital investido. Consulte sempre um assessor financeiro certificado antes de tomar decisões de investimento.',
      zh: 'AUREX不是财务顾问。所显示的信号、分析和指标由自动算法生成，不应被解释为对未来结果的保证。投资涉及风险，包括可能损失投入的资金。在做出投资决策之前，请务必咨询持证财务顾问。',
      fr: "AUREX n'est pas un conseiller financier. Les signaux, analyses et indicateurs affichés sont générés par des algorithmes automatisés et ne doivent pas être interprétés comme une garantie de résultats futurs. Investir comporte des risques, y compris la perte possible du capital investi. Consultez toujours un conseiller financier certifié avant de prendre des décisions d'investissement.",
      it: "AUREX non è un consulente finanziario. I segnali, le analisi e gli indicatori mostrati sono generati da algoritmi automatizzati e non devono essere interpretati come garanzia di risultati futuri. Investire comporta rischi, inclusa la possibile perdita del capitale investito. Consultare sempre un consulente finanziario certificato prima di prendere decisioni d'investimento.",
      hi: 'AUREX एक वित्तीय सलाहकार नहीं है। दिखाए गए सिग्नल, विश्लेषण और संकेतक स्वचालित एल्गोरिदम द्वारा उत्पन्न होते हैं और भविष्य के परिणामों की गारंटी नहीं माने जाने चाहिए। निवेश में जोखिम शामिल है, जिसमें निवेशित पूँजी का संभावित नुकसान भी शामिल है। निवेश निर्णय लेने से पहले हमेशा प्रमाणित वित्तीय सलाहकार से परामर्श लें।',
      ar: 'AUREX ليس مستشاراً مالياً. الإشارات والتحليلات والمؤشرات المعروضة يتم إنشاؤها بواسطة خوارزميات آلية ولا ينبغي تفسيرها كضمان لنتائج مستقبلية. الاستثمار ينطوي على مخاطر بما في ذلك الخسارة المحتملة لرأس المال المستثمر. استشر دائماً مستشاراً مالياً معتمداً قبل اتخاذ قرارات استثمارية.'
    },
    aviso_legal: { es: 'Aviso Legal', en: 'Legal Notice', pt: 'Aviso Legal', zh: '法律声明', fr: 'Avis Juridique', it: 'Avviso Legale', hi: 'कानूनी सूचना', ar: 'إشعار قانوني' },

    // === B9: SESIÓN ===
    b9_sesion: { es: '🚪 Sesión', en: '🚪 Session', pt: '🚪 Sessão', zh: '🚪 会话', fr: '🚪 Session', it: '🚪 Sessione', hi: '🚪 सत्र', ar: '🚪 الجلسة' },
    cerrar_sesion_desc: { es: 'Vas a salir de tu cuenta en este dispositivo.', en: 'You will log out from your account on this device.', pt: 'Você sairá da sua conta neste dispositivo.', zh: '您将从此设备退出账户。', fr: 'Vous allez vous déconnecter de votre compte sur cet appareil.', it: 'Stai per uscire dal tuo account su questo dispositivo.', hi: 'आप इस डिवाइस पर अपने खाते से लॉग आउट होंगे।', ar: 'ستخرج من حسابك على هذا الجهاز.' },
    cerrar_sesion_btn: { es: '🚪 Cerrar sesión', en: '🚪 Log out', pt: '🚪 Encerrar sessão', zh: '🚪 退出登录', fr: '🚪 Se déconnecter', it: '🚪 Esci', hi: '🚪 लॉग आउट', ar: '🚪 تسجيل الخروج' },
    zona_peligro: { es: '⚠ Zona de peligro', en: '⚠ Danger zone', pt: '⚠ Zona de perigo', zh: '⚠ 危险区域', fr: '⚠ Zone de danger', it: '⚠ Zona di pericolo', hi: '⚠ खतरे का ज़ोन', ar: '⚠ منطقة خطر' },
    eliminar_cuenta_desc: { es: 'Eliminar tu cuenta es una acción irreversible. Se borrarán todos tus datos, portafolio y configuración.', en: 'Deleting your account is irreversible. All your data, portfolio and settings will be erased.', pt: 'Excluir sua conta é uma ação irreversível. Todos os seus dados, portfólio e configurações serão excluídos.', zh: '删除账户是不可逆的操作。您的所有数据、投资组合和设置将被删除。', fr: 'Supprimer votre compte est une action irréversible. Toutes vos données, votre portfolio et votre configuration seront supprimés.', it: "Eliminare il tuo account è un'azione irreversibile. Tutti i tuoi dati, portafoglio e configurazioni verranno eliminati.", hi: 'अपना खाता हटाना एक अपरिवर्तनीय कार्रवाई है। आपका सारा डेटा, portfolio और सेटिंग्स हटा दी जाएँगी।', ar: 'حذف حسابك إجراء لا رجعة فيه. سيتم حذف جميع بياناتك ومحفظتك وإعداداتك.' },
    eliminar_cuenta_btn: { es: '🗑️ Eliminar mi cuenta', en: '🗑️ Delete my account', pt: '🗑️ Excluir minha conta', zh: '🗑️ 删除我的账户', fr: '🗑️ Supprimer mon compte', it: '🗑️ Elimina il mio account', hi: '🗑️ मेरा खाता हटाएँ', ar: '🗑️ حذف حسابي' },
    confirmar_email_elim: { es: 'Escribí tu email para confirmar:', en: 'Enter your email to confirm:', pt: 'Digite seu email para confirmar:', zh: '输入您的邮箱确认：', fr: 'Saisissez votre email pour confirmer :', it: 'Inserisci la tua email per confermare:', hi: 'पुष्टि के लिए अपना ईमेल लिखें:', ar: 'اكتب بريدك الإلكتروني للتأكيد:' },
    cancelar: { es: 'Cancelar', en: 'Cancel', pt: 'Cancelar', zh: '取消', fr: 'Annuler', it: 'Annulla', hi: 'रद्द करें', ar: 'إلغاء' },
    confirmar_eliminacion: { es: 'Confirmar eliminación', en: 'Confirm deletion', pt: 'Confirmar exclusão', zh: '确认删除', fr: 'Confirmer la suppression', it: "Conferma l'eliminazione", hi: 'हटाने की पुष्टि करें', ar: 'تأكيد الحذف' },

    // === MODAL RATING ===
    calificar_titulo: { es: 'Calificá AUREX', en: 'Rate AUREX', pt: 'Avalie o AUREX', zh: '给AUREX评分', fr: 'Évaluez AUREX', it: 'Valuta AUREX', hi: 'AUREX को रेट करें', ar: 'قيّم AUREX' },
    calificar_sub: { es: 'Tu opinión nos ayuda a mejorar la app para vos', en: 'Your feedback helps us improve the app for you', pt: 'Sua opinião nos ajuda a melhorar o app para você', zh: '您的意见帮助我们为您改进应用', fr: "Votre avis nous aide à améliorer l'app pour vous", it: "La tua opinione ci aiuta a migliorare l'app per te", hi: 'आपकी राय हमें आपके लिए ऐप बेहतर बनाने में मदद करती है', ar: 'رأيك يساعدنا على تحسين التطبيق لك' },
    enviar: { es: 'Enviar', en: 'Submit', pt: 'Enviar', zh: '提交', fr: 'Envoyer', it: 'Invia', hi: 'भेजें', ar: 'إرسال' },
    rating_excelente: { es: '¡Excelente!', en: 'Excellent!', pt: 'Excelente!', zh: '优秀！', fr: 'Excellent !', it: 'Eccellente!', hi: 'उत्कृष्ट!', ar: 'ممتاز!' },
    rating_muy_buena: { es: '¡Muy buena!', en: 'Very good!', pt: 'Muito bom!', zh: '非常好！', fr: 'Très bien !', it: 'Molto bene!', hi: 'बहुत अच्छा!', ar: 'جيد جداً!' },
    rating_buena: { es: 'Buena', en: 'Good', pt: 'Bom', zh: '好', fr: 'Bien', it: 'Buona', hi: 'अच्छा', ar: 'جيد' },
    rating_gracias_feedback: { es: 'Gracias por tu feedback', en: 'Thanks for your feedback', pt: 'Obrigado pelo seu feedback', zh: '感谢您的反馈', fr: 'Merci pour votre retour', it: 'Grazie per il tuo feedback', hi: 'आपकी प्रतिक्रिया के लिए धन्यवाद', ar: 'شكراً لملاحظاتك' },
    rating_enviada: { es: '¡Gracias! Tu calificación fue enviada', en: 'Thanks! Your rating was submitted', pt: 'Obrigado! Sua avaliação foi enviada', zh: '谢谢！您的评分已提交', fr: 'Merci ! Votre note a été envoyée', it: 'Grazie! La tua valutazione è stata inviata', hi: 'धन्यवाद! आपकी रेटिंग भेज दी गई', ar: 'شكراً! تم إرسال تقييمك' },

    // === MODAL PLANES ===
    elegir_plan: { es: 'Elegir tu plan', en: 'Choose your plan', pt: 'Escolha seu plano', zh: '选择您的方案', fr: 'Choisir votre plan', it: 'Scegli il tuo piano', hi: 'अपनी योजना चुनें', ar: 'اختر خطتك' },
    planes_incluyen_pulse: { es: 'Todos los planes incluyen AUREX Pulse', en: 'All plans include AUREX Pulse', pt: 'Todos os planos incluem AUREX Pulse', zh: '所有方案均包含AUREX Pulse', fr: 'Tous les plans incluent AUREX Pulse', it: 'Tutti i piani includono AUREX Pulse', hi: 'सभी योजनाओं में AUREX Pulse शामिल है', ar: 'جميع الخطط تشمل AUREX Pulse' },
    plan_free_subtitle: { es: 'Para empezar a invertir mejor', en: 'To start investing better', pt: 'Para começar a investir melhor', zh: '开始更好地投资', fr: 'Pour commencer à mieux investir', it: 'Per iniziare a investire meglio', hi: 'बेहतर निवेश शुरू करने के लिए', ar: 'للبدء في الاستثمار بشكل أفضل' },
    plan_free_f1: { es: '5 activos en portfolio', en: '5 assets in portfolio', pt: '5 ativos no portfólio', zh: '投资组合5个资产', fr: '5 actifs dans le portfolio', it: '5 asset nel portfolio', hi: 'Portfolio में 5 एसेट', ar: '5 أصول في Portfolio' },
    plan_free_f2: { es: '3 señales IA por día', en: '3 AI signals per day', pt: '3 sinais IA por dia', zh: '每日3个AI信号', fr: '3 signaux IA par jour', it: '3 segnali IA al giorno', hi: 'प्रतिदिन 3 AI सिग्नल', ar: '3 إشارات AI يومياً' },
    plan_free_f3: { es: 'Mercados en tiempo real', en: 'Real-time markets', pt: 'Mercados em tempo real', zh: '实时市场', fr: 'Marchés en temps réel', it: 'Mercati in tempo reale', hi: 'रियल-टाइम बाज़ार', ar: 'أسواق في الوقت الحقيقي' },
    plan_free_f4_pulse: { es: 'AUREX Pulse', en: 'AUREX Pulse', pt: 'AUREX Pulse', zh: 'AUREX Pulse', fr: 'AUREX Pulse', it: 'AUREX Pulse', hi: 'AUREX Pulse', ar: 'AUREX Pulse' },
    plan_free_f4_detail: { es: '(indicador, sin detalles)', en: '(indicator, no details)', pt: '(indicador, sem detalhes)', zh: '（指标，无详情）', fr: '(indicateur, sans détails)', it: '(indicatore, senza dettagli)', hi: '(संकेतक, बिना विवरण)', ar: '(مؤشر، بدون تفاصيل)' },
    plan_free_f5: { es: 'Alertas push al celular', en: 'Push alerts to phone', pt: 'Alertas push no celular', zh: '手机推送提醒', fr: 'Alertes push sur le téléphone', it: 'Avvisi push sul cellulare', hi: 'फ़ोन पर पुश अलर्ट', ar: 'تنبيهات Push إلى الهاتف' },
    plan_free_f6: { es: 'Variables y explicación de Pulse', en: 'Pulse variables and explanation', pt: 'Variáveis e explicação do Pulse', zh: 'Pulse变量和说明', fr: 'Variables et explication de Pulse', it: 'Variabili e spiegazione di Pulse', hi: 'Pulse वेरिएबल और व्याख्या', ar: 'متغيرات وشرح Pulse' },
    plan_free_f7: { es: 'Historial de señales', en: 'Signal history', pt: 'Histórico de sinais', zh: '信号历史', fr: 'Historique des signaux', it: 'Storico segnali', hi: 'सिग्नल इतिहास', ar: 'سجل الإشارات' },
    plan_free_f8: { es: 'Sin publicidad', en: 'Ad-free', pt: 'Sem publicidade', zh: '无广告', fr: 'Sans publicité', it: 'Senza pubblicità', hi: 'कोई विज्ञापन नहीं', ar: 'بدون إعلانات' },
    ver_plan_pro: { es: 'Ver plan PRO →', en: 'View PRO plan →', pt: 'Ver plano PRO →', zh: '查看PRO方案 →', fr: 'Voir le plan PRO →', it: 'Vedi piano PRO →', hi: 'PRO योजना देखें →', ar: 'عرض خطة PRO ←' },
    mas_popular: { es: 'MÁS POPULAR', en: 'MOST POPULAR', pt: 'MAIS POPULAR', zh: '最受欢迎', fr: 'PLUS POPULAIRE', it: 'PIÙ POPOLARE', hi: 'सबसे लोकप्रिय', ar: 'الأكثر شعبية' },
    por_mes: { es: '/mes', en: '/mo', pt: '/mês', zh: '/月', fr: '/mois', it: '/mese', hi: '/माह', ar: '/شهر' },
    pro_anual_desc: { es: '$7,79/mes si pagás anual', en: '$7.79/mo if paid annually', pt: '$7,79/mês se pagar anual', zh: '年付$7.79/月', fr: '7,79$/mois si payé annuellement', it: '$7,79/mese se pagato annualmente', hi: 'वार्षिक भुगतान पर $7.79/माह', ar: '$7.79/شهر إذا دُفع سنوياً' },
    plan_pro_subtitle: { es: 'Para el inversor activo', en: 'For the active investor', pt: 'Para o investidor ativo', zh: '适合活跃投资者', fr: "Pour l'investisseur actif", it: "Per l'investitore attivo", hi: 'सक्रिय निवेशक के लिए', ar: 'للمستثمر النشط' },
    plan_pro_f1: { es: 'Activos ilimitados en portfolio', en: 'Unlimited assets in portfolio', pt: 'Ativos ilimitados no portfólio', zh: '投资组合无限资产', fr: 'Actifs illimités dans le portfolio', it: 'Asset illimitati nel portfolio', hi: 'Portfolio में असीमित एसेट', ar: 'أصول غير محدودة في Portfolio' },
    plan_pro_f2: { es: 'Señales IA ilimitadas + historial 30 días', en: 'Unlimited AI signals + 30-day history', pt: 'Sinais IA ilimitados + histórico 30 dias', zh: '无限AI信号+30天历史', fr: 'Signaux IA illimités + historique 30 jours', it: 'Segnali IA illimitati + storico 30 giorni', hi: 'असीमित AI सिग्नल + 30 दिन का इतिहास', ar: 'إشارات AI غير محدودة + سجل 30 يوم' },
    plan_pro_f3: { es: 'Alertas push al celular (precio, señal IA, variación)', en: 'Push alerts to phone (price, AI signal, variation)', pt: 'Alertas push no celular (preço, sinal IA, variação)', zh: '手机推送提醒（价格、AI信号、波动）', fr: 'Alertes push sur le téléphone (prix, signal IA, variation)', it: 'Avvisi push sul cellulare (prezzo, segnale IA, variazione)', hi: 'फ़ोन पर पुश अलर्ट (मूल्य, AI सिग्नल, भिन्नता)', ar: 'تنبيهات Push إلى الهاتف (سعر، إشارة AI، تغير)' },
    plan_pro_f4: { es: 'AUREX Pulse con variables y explicación básica', en: 'AUREX Pulse with variables and basic explanation', pt: 'AUREX Pulse com variáveis e explicação básica', zh: 'AUREX Pulse含变量和基础说明', fr: 'AUREX Pulse avec variables et explication basique', it: 'AUREX Pulse con variabili e spiegazione base', hi: 'वेरिएबल और बुनियादी व्याख्या के साथ AUREX Pulse', ar: 'AUREX Pulse مع متغيرات وشرح أساسي' },
    plan_pro_f5: { es: 'Sin publicidad', en: 'Ad-free', pt: 'Sem publicidade', zh: '无广告', fr: 'Sans publicité', it: 'Senza pubblicità', hi: 'कोई विज्ञापन नहीं', ar: 'بدون إعلانات' },
    plan_pro_f6: { es: 'Exportar portfolio (Excel/PDF)', en: 'Export portfolio (Excel/PDF)', pt: 'Exportar portfólio (Excel/PDF)', zh: '导出投资组合（Excel/PDF）', fr: 'Exporter le portfolio (Excel/PDF)', it: 'Esportare portfolio (Excel/PDF)', hi: 'Portfolio निर्यात (Excel/PDF)', ar: 'تصدير Portfolio (Excel/PDF)' },
    plan_pro_f7: { es: 'Soporte prioritario por email', en: 'Priority email support', pt: 'Suporte prioritário por email', zh: '优先邮件支持', fr: 'Support prioritaire par email', it: 'Supporto prioritario via email', hi: 'ईमेल द्वारा प्राथमिकता सहायता', ar: 'دعم أولوي عبر البريد الإلكتروني' },
    plan_pro_f8: { es: 'Pulse explicación profunda + historial', en: 'Deep Pulse explanation + history', pt: 'Pulse explicação profunda + histórico', zh: 'Pulse深度说明+历史', fr: 'Pulse explication approfondie + historique', it: 'Pulse spiegazione approfondita + storico', hi: 'Pulse गहन व्याख्या + इतिहास', ar: 'Pulse شرح معمّق + سجل' },
    plan_pro_f9: { es: 'Alertas SMS / WhatsApp', en: 'SMS / WhatsApp alerts', pt: 'Alertas SMS / WhatsApp', zh: 'SMS / WhatsApp提醒', fr: 'Alertes SMS / WhatsApp', it: 'Avvisi SMS / WhatsApp', hi: 'SMS / WhatsApp अलर्ट', ar: 'تنبيهات SMS / WhatsApp' },
    pro_mensual_btn: { es: '🚀 PRO Mensual — $9,99/mes', en: '🚀 PRO Monthly — $9.99/mo', pt: '🚀 PRO Mensal — $9,99/mês', zh: '🚀 PRO月付 — $9.99/月', fr: '🚀 PRO Mensuel — 9,99$/mois', it: '🚀 PRO Mensile — $9,99/mese', hi: '🚀 PRO मासिक — $9.99/माह', ar: '🚀 PRO شهري — $9.99/شهر' },
    pro_anual_btn: { es: '⭐ PRO Anual — $89,99/año', en: '⭐ PRO Annual — $89.99/yr', pt: '⭐ PRO Anual — $89,99/ano', zh: '⭐ PRO年付 — $89.99/年', fr: '⭐ PRO Annuel — 89,99$/an', it: '⭐ PRO Annuale — $89,99/anno', hi: '⭐ PRO वार्षिक — $89.99/वर्ष', ar: '⭐ PRO سنوي — $89.99/سنة' },
    ahorras_25: { es: '(ahorrás 25%)', en: '(save 25%)', pt: '(economize 25%)', zh: '（省25%）', fr: '(économisez 25%)', it: '(risparmi il 25%)', hi: '(25% बचाएँ)', ar: '(وفّر 25%)' },
    elite_anual_desc: { es: '$15,99/mes si pagás anual', en: '$15.99/mo if paid annually', pt: '$15,99/mês se pagar anual', zh: '年付$15.99/月', fr: '15,99$/mois si payé annuellement', it: '$15,99/mese se pagato annualmente', hi: 'वार्षिक भुगतान पर $15.99/माह', ar: '$15.99/شهر إذا دُفع سنوياً' },
    plan_elite_subtitle: { es: 'Para el inversor profesional', en: 'For the professional investor', pt: 'Para o investidor profissional', zh: '适合专业投资者', fr: "Pour l'investisseur professionnel", it: "Per l'investitore professionista", hi: 'पेशेवर निवेशक के लिए', ar: 'للمستثمر المحترف' },
    plan_elite_f1: { es: 'Todo lo incluido en PRO', en: 'Everything included in PRO', pt: 'Tudo incluído no PRO', zh: 'PRO所有功能', fr: 'Tout ce qui est inclus dans PRO', it: 'Tutto incluso nel PRO', hi: 'PRO में शामिल सब कुछ', ar: 'كل ما في PRO' },
    plan_elite_f2: { es: 'AUREX Pulse completo: variables, explicación profunda e historial', en: 'Full AUREX Pulse: variables, deep explanation and history', pt: 'AUREX Pulse completo: variáveis, explicação profunda e histórico', zh: '完整AUREX Pulse：变量、深度说明和历史', fr: 'AUREX Pulse complet : variables, explication approfondie et historique', it: 'AUREX Pulse completo: variabili, spiegazione approfondita e storico', hi: 'पूर्ण AUREX Pulse: वेरिएबल, गहन व्याख्या और इतिहास', ar: 'AUREX Pulse كامل: متغيرات وشرح معمّق وسجل' },
    plan_elite_f3: { es: 'Señales IA con nivel de confianza y razón detallada', en: 'AI signals with confidence level and detailed reasoning', pt: 'Sinais IA com nível de confiança e razão detalhada', zh: 'AI信号含置信度和详细理由', fr: 'Signaux IA avec niveau de confiance et raison détaillée', it: 'Segnali IA con livello di fiducia e motivazione dettagliata', hi: 'विश्वास स्तर और विस्तृत कारण के साथ AI सिग्नल', ar: 'إشارات AI مع مستوى الثقة والتبرير المفصّل' },
    plan_elite_f4: { es: 'Análisis técnico avanzado (RSI, MACD)', en: 'Advanced technical analysis (RSI, MACD)', pt: 'Análise técnica avançada (RSI, MACD)', zh: '高级技术分析（RSI, MACD）', fr: 'Analyse technique avancée (RSI, MACD)', it: 'Analisi tecnica avanzata (RSI, MACD)', hi: 'उन्नत तकनीकी विश्लेषण (RSI, MACD)', ar: 'تحليل تقني متقدم (RSI, MACD)' },
    plan_elite_f5: { es: 'Alertas SMS / WhatsApp / Telegram', en: 'SMS / WhatsApp / Telegram alerts', pt: 'Alertas SMS / WhatsApp / Telegram', zh: 'SMS / WhatsApp / Telegram提醒', fr: 'Alertes SMS / WhatsApp / Telegram', it: 'Avvisi SMS / WhatsApp / Telegram', hi: 'SMS / WhatsApp / Telegram अलर्ट', ar: 'تنبيهات SMS / WhatsApp / Telegram' },
    plan_elite_f6: { es: 'Acceso anticipado a funciones beta', en: 'Early access to beta features', pt: 'Acesso antecipado a funções beta', zh: '抢先体验测试功能', fr: 'Accès anticipé aux fonctionnalités bêta', it: 'Accesso anticipato alle funzionalità beta', hi: 'बीटा सुविधाओं तक शीघ्र पहुँच', ar: 'وصول مبكر إلى ميزات تجريبية' },
    plan_elite_f7: { es: 'Soporte por chat en vivo', en: 'Live chat support', pt: 'Suporte por chat ao vivo', zh: '实时聊天支持', fr: 'Support par chat en direct', it: 'Supporto via chat dal vivo', hi: 'लाइव चैट सहायता', ar: 'دعم عبر الدردشة المباشرة' },
    plan_elite_f8: { es: 'API personal para integraciones', en: 'Personal API for integrations', pt: 'API pessoal para integrações', zh: '个人API集成', fr: 'API personnelle pour les intégrations', it: 'API personale per integrazioni', hi: 'एकीकरण के लिए व्यक्तिगत API', ar: 'API شخصي للتكاملات' },
    elite_mensual_btn: { es: '👑 ELITE Mensual — $19,99/mes', en: '👑 ELITE Monthly — $19.99/mo', pt: '👑 ELITE Mensal — $19,99/mês', zh: '👑 ELITE月付 — $19.99/月', fr: '👑 ELITE Mensuel — 19,99$/mois', it: '👑 ELITE Mensile — $19,99/mese', hi: '👑 ELITE मासिक — $19.99/माह', ar: '👑 ELITE شهري — $19.99/شهر' },
    elite_anual_btn: { es: '⭐ ELITE Anual — $179,99/año', en: '⭐ ELITE Annual — $179.99/yr', pt: '⭐ ELITE Anual — $179,99/ano', zh: '⭐ ELITE年付 — $179.99/年', fr: '⭐ ELITE Annuel — 179,99$/an', it: '⭐ ELITE Annuale — $179,99/anno', hi: '⭐ ELITE वार्षिक — $179.99/वर्ष', ar: '⭐ ELITE سنوي — $179.99/سنة' },

    // === AVISO LEGAL POPUP ===
    aviso_legal_titulo: { es: '⚖️ AVISO LEGAL', en: '⚖️ LEGAL NOTICE', pt: '⚖️ AVISO LEGAL', zh: '⚖️ 法律声明', fr: '⚖️ AVIS JURIDIQUE', it: '⚖️ AVVISO LEGALE', hi: '⚖️ कानूनी सूचना', ar: '⚖️ إشعار قانوني' },
    aviso_legal_p1: {
      es: 'La información proporcionada por AUREX tiene carácter exclusivamente informativo y educativo. No constituye asesoramiento financiero, recomendación de inversión, ni oferta de compra o venta de ningún activo financiero.',
      en: 'The information provided by AUREX is exclusively informational and educational. It does not constitute financial advice, investment recommendation, or offer to buy or sell any financial asset.',
      pt: 'As informações fornecidas pela AUREX têm caráter exclusivamente informativo e educativo. Não constituem aconselhamento financeiro, recomendação de investimento, nem oferta de compra ou venda de qualquer ativo financeiro.',
      zh: 'AUREX提供的信息仅供参考和教育目的。不构成财务建议、投资推荐或任何金融资产的买卖要约。',
      fr: "Les informations fournies par AUREX sont exclusivement à caractère informatif et éducatif. Elles ne constituent pas un conseil financier, une recommandation d'investissement, ni une offre d'achat ou de vente d'un actif financier.",
      it: "Le informazioni fornite da AUREX hanno carattere esclusivamente informativo ed educativo. Non costituiscono consulenza finanziaria, raccomandazione d'investimento, né offerta di acquisto o vendita di alcun asset finanziario.",
      hi: 'AUREX द्वारा प्रदान की गई जानकारी विशेष रूप से सूचनात्मक और शैक्षिक उद्देश्यों के लिए है। यह वित्तीय सलाह, निवेश की सिफ़ारिश, या किसी भी वित्तीय एसेट को खरीदने या बेचने का प्रस्ताव नहीं है।',
      ar: 'المعلومات المقدمة من AUREX ذات طابع إعلامي وتعليمي حصرياً. لا تشكل استشارة مالية أو توصية استثمارية أو عرضاً لشراء أو بيع أي أصل مالي.'
    },
    aviso_legal_p2: {
      es: 'Las señales, análisis e indicadores mostrados son generados por algoritmos automatizados y no deben interpretarse como garantía de resultados futuros. Invertir conlleva riesgos, incluida la posible pérdida del capital invertido.',
      en: 'The signals, analysis and indicators shown are generated by automated algorithms and should not be interpreted as a guarantee of future results. Investing involves risks, including the possible loss of invested capital.',
      pt: 'Os sinais, análises e indicadores exibidos são gerados por algoritmos automatizados e não devem ser interpretados como garantia de resultados futuros. Investir envolve riscos, incluindo a possível perda do capital investido.',
      zh: '所显示的信号、分析和指标由自动算法生成，不应被解释为对未来结果的保证。投资涉及风险，包括可能损失投入的资金。',
      fr: "Les signaux, analyses et indicateurs affichés sont générés par des algorithmes automatisés et ne doivent pas être interprétés comme une garantie de résultats futurs. Investir comporte des risques, y compris la perte possible du capital investi.",
      it: 'I segnali, le analisi e gli indicatori mostrati sono generati da algoritmi automatizzati e non devono essere interpretati come garanzia di risultati futuri. Investire comporta rischi, inclusa la possibile perdita del capitale investito.',
      hi: 'दिखाए गए सिग्नल, विश्लेषण और संकेतक स्वचालित एल्गोरिदम द्वारा उत्पन्न होते हैं और भविष्य के परिणामों की गारंटी नहीं माने जाने चाहिए। निवेश में जोखिम शामिल है, जिसमें निवेशित पूँजी का संभावित नुकसान भी शामिल है।',
      ar: 'الإشارات والتحليلات والمؤشرات المعروضة يتم إنشاؤها بواسطة خوارزميات آلية ولا ينبغي تفسيرها كضمان لنتائج مستقبلية. الاستثمار ينطوي على مخاطر بما في ذلك الخسارة المحتملة لرأس المال المستثمر.'
    },
    aviso_legal_p3: {
      es: 'Consulte siempre a un asesor financiero certificado antes de tomar decisiones de inversión.',
      en: 'Always consult a certified financial advisor before making investment decisions.',
      pt: 'Consulte sempre um assessor financeiro certificado antes de tomar decisões de investimento.',
      zh: '在做出投资决策之前，请务必咨询持证财务顾问。',
      fr: "Consultez toujours un conseiller financier certifié avant de prendre des décisions d'investissement.",
      it: "Consultare sempre un consulente finanziario certificato prima di prendere decisioni d'investimento.",
      hi: 'निवेश निर्णय लेने से पहले हमेशा प्रमाणित वित्तीय सलाहकार से परामर्श लें।',
      ar: 'استشر دائماً مستشاراً مالياً معتمداً قبل اتخاذ قرارات استثمارية.'
    },
    aviso_legal_cerrar: { es: '✕ Cerrar', en: '✕ Close', pt: '✕ Fechar', zh: '✕ 关闭', fr: '✕ Fermer', it: '✕ Chiudi', hi: '✕ बंद करें', ar: '✕ إغلاق' },

    // === PORTFOLIO ===

    // Header
    port_header_title: { es: 'Portfolio', en: 'Portfolio', pt: 'Portfólio', zh: '投资组合', fr: 'Portfolio', it: 'Portfolio', hi: 'Portfolio', ar: 'Portfolio' },
    port_valor_total: { es: 'VALOR TOTAL', en: 'TOTAL VALUE', pt: 'VALOR TOTAL', zh: '总价值', fr: 'VALEUR TOTALE', it: 'VALORE TOTALE', hi: 'कुल मूल्य', ar: 'القيمة الإجمالية' },
    port_period_24h: { es: '24 horas', en: '24 hours', pt: '24 horas', zh: '24小时', fr: '24 heures', it: '24 ore', hi: '24 घंटे', ar: '24 ساعة' },
    port_period_7d: { es: '7 días', en: '7 days', pt: '7 dias', zh: '7天', fr: '7 jours', it: '7 giorni', hi: '7 दिन', ar: '7 أيام' },
    port_period_1m: { es: '1 mes', en: '1 month', pt: '1 mês', zh: '1个月', fr: '1 mois', it: '1 mese', hi: '1 महीना', ar: 'شهر واحد' },
    port_period_3m: { es: '3 meses', en: '3 months', pt: '3 meses', zh: '3个月', fr: '3 mois', it: '3 mesi', hi: '3 महीने', ar: '3 أشهر' },
    port_period_1y: { es: '1 año', en: '1 year', pt: '1 ano', zh: '1年', fr: '1 an', it: '1 anno', hi: '1 वर्ष', ar: 'سنة واحدة' },
    port_period_buy: { es: 'Desde compra', en: 'Since purchase', pt: 'Desde compra', zh: '自购买', fr: "Depuis l'achat", it: "Dall'acquisto", hi: 'खरीद से', ar: 'منذ الشراء' },
    port_activos_label: { es: 'Activos', en: 'Assets', pt: 'Ativos', zh: '资产', fr: 'Actifs', it: 'Asset', hi: 'एसेट', ar: 'أصول' },
    port_mejor_24h: { es: '🏆 Mejor 24h', en: '🏆 Best 24h', pt: '🏆 Melhor 24h', zh: '🏆 最佳24h', fr: '🏆 Meilleur 24h', it: '🏆 Migliore 24h', hi: '🏆 श्रेष्ठ 24h', ar: '🏆 الأفضل 24س' },
    port_agregar_activos: { es: 'Agregar Activos ＋', en: 'Add Assets ＋', pt: 'Adicionar Ativos ＋', zh: '添加资产 ＋', fr: 'Ajouter Actifs ＋', it: 'Aggiungi Asset ＋', hi: 'एसेट जोड़ें ＋', ar: 'إضافة أصول ＋' },
    port_conv_btn: { es: '⇄ Conv.', en: '⇄ Conv.', pt: '⇄ Conv.', zh: '⇄ 换算', fr: '⇄ Conv.', it: '⇄ Conv.', hi: '⇄ कन्व.', ar: '⇄ تحويل' },

    // Modal Detalle
    port_detalle_title: { es: 'Detalle', en: 'Detail', pt: 'Detalhe', zh: '详情', fr: 'Détail', it: 'Dettaglio', hi: 'विवरण', ar: 'التفاصيل' },

    // Modal Agregar
    port_agregar_activo: { es: 'Agregar activo', en: 'Add asset', pt: 'Adicionar ativo', zh: '添加资产', fr: 'Ajouter un actif', it: 'Aggiungi asset', hi: 'एसेट जोड़ें', ar: 'إضافة أصل' },

    // Modal Conversor
    port_conversor_title: { es: 'Conversor', en: 'Converter', pt: 'Conversor', zh: '换算器', fr: 'Convertisseur', it: 'Convertitore', hi: 'कनवर्टर', ar: 'المحوّل' },
    port_conv_monto: { es: 'Monto', en: 'Amount', pt: 'Valor', zh: '金额', fr: 'Montant', it: 'Importo', hi: 'राशि', ar: 'المبلغ' },
    port_conv_de: { es: 'De', en: 'From', pt: 'De', zh: '从', fr: 'De', it: 'Da', hi: 'से', ar: 'من' },
    port_conv_a: { es: 'A', en: 'To', pt: 'Para', zh: '到', fr: 'À', it: 'A', hi: 'को', ar: 'إلى' },
    port_conv_resultado: { es: 'Resultado', en: 'Result', pt: 'Resultado', zh: '结果', fr: 'Résultat', it: 'Risultato', hi: 'परिणाम', ar: 'النتيجة' },
    port_conv_placeholder: { es: 'Ingresá un monto para convertir', en: 'Enter an amount to convert', pt: 'Insira um valor para converter', zh: '输入要换算的金额', fr: 'Entrez un montant à convertir', it: 'Inserisci un importo da convertire', hi: 'कनवर्ट करने के लिए राशि दर्ज करें', ar: 'أدخل مبلغاً للتحويل' },
    port_conv_loading: { es: 'Obteniendo precios...', en: 'Getting prices...', pt: 'Obtendo preços...', zh: '获取价格中...', fr: 'Obtention des prix...', it: 'Ottenimento prezzi...', hi: 'मूल्य प्राप्त हो रहे हैं...', ar: 'جلب الأسعار...' },
    port_conv_live: { es: 'Precios en vivo via Binance', en: 'Live prices via Binance', pt: 'Preços ao vivo via Binance', zh: '通过Binance实时价格', fr: 'Prix en direct via Binance', it: 'Prezzi live via Binance', hi: 'Binance से लाइव मूल्य', ar: 'أسعار مباشرة عبر Binance' },
    port_conv_offline: { es: 'Precios sin conexion (aprox)', en: 'Offline prices (approx)', pt: 'Preços offline (aprox)', zh: '离线价格（近似）', fr: 'Prix hors ligne (approx)', it: 'Prezzi offline (approx)', hi: 'ऑफ़लाइन मूल्य (अनुमानित)', ar: 'أسعار دون اتصال (تقريبية)' },

    // Asset Picker
    port_picker_title: { es: 'Seleccionar activo', en: 'Select asset', pt: 'Selecionar ativo', zh: '选择资产', fr: 'Sélectionner un actif', it: 'Seleziona asset', hi: 'एसेट चुनें', ar: 'اختر أصلاً' },
    port_picker_search_placeholder: { es: 'Buscar por nombre o ticker...', en: 'Search by name or ticker...', pt: 'Buscar por nome ou ticker...', zh: '按名称或代码搜索...', fr: 'Rechercher par nom ou ticker...', it: 'Cerca per nome o ticker...', hi: 'नाम या टिकर से खोजें...', ar: 'البحث بالاسم أو الرمز...' },
    port_picker_fiat: { es: 'Monedas Fiat', en: 'Fiat Currencies', pt: 'Moedas Fiat', zh: '法定货币', fr: 'Monnaies Fiat', it: 'Valute Fiat', hi: 'फिएट मुद्राएँ', ar: 'عملات ورقية' },
    port_picker_stocks: { es: 'Acciones USA', en: 'US Stocks', pt: 'Ações EUA', zh: '美股', fr: 'Actions US', it: 'Azioni USA', hi: 'अमेरिकी स्टॉक', ar: 'أسهم أمريكية' },

    // Estado vacío
    port_empty_title: { es: 'Tu portfolio esta vacio', en: 'Your portfolio is empty', pt: 'Seu portfólio está vazio', zh: '您的投资组合为空', fr: 'Votre portfolio est vide', it: 'Il tuo portfolio è vuoto', hi: 'आपका portfolio खाली है', ar: 'محفظتك فارغة' },
    port_empty_desc: { es: 'Agrega tu primer activo para empezar a seguir tu cartera en tiempo real', en: 'Add your first asset to start tracking your portfolio in real time', pt: 'Adicione seu primeiro ativo para começar a acompanhar seu portfólio em tempo real', zh: '添加您的第一个资产以开始实时跟踪您的投资组合', fr: 'Ajoutez votre premier actif pour commencer à suivre votre portefeuille en temps réel', it: 'Aggiungi il tuo primo asset per iniziare a seguire il tuo portafoglio in tempo reale', hi: 'रियल-टाइम में अपने portfolio को ट्रैक करने के लिए अपना पहला एसेट जोड़ें', ar: 'أضف أول أصل لبدء متابعة محفظتك في الوقت الحقيقي' },
    port_empty_btn: { es: '+ Agregar primer activo', en: '+ Add first asset', pt: '+ Adicionar primeiro ativo', zh: '+ 添加第一个资产', fr: '+ Ajouter le premier actif', it: '+ Aggiungi primo asset', hi: '+ पहला एसेट जोड़ें', ar: '+ إضافة أول أصل' },

    // Cuenta requerida
    port_need_account_title: { es: 'Necesitás una cuenta', en: 'You need an account', pt: 'Você precisa de uma conta', zh: '您需要一个账户', fr: 'Vous avez besoin d\'un compte', it: 'Hai bisogno di un account', hi: 'आपको एक खाता चाहिए', ar: 'تحتاج إلى حساب' },
    port_need_account_desc: { es: 'Para guardar activos reales, creá tu cuenta gratis.', en: 'To save real assets, create your free account.', pt: 'Para salvar ativos reais, crie sua conta grátis.', zh: '要保存真实资产，请创建免费账户。', fr: 'Pour sauvegarder des actifs réels, créez votre compte gratuit.', it: 'Per salvare asset reali, crea il tuo account gratuito.', hi: 'वास्तविक एसेट सहेजने के लिए मुफ़्त खाता बनाएँ।', ar: 'لحفظ أصول حقيقية، أنشئ حسابك المجاني.' },
    port_need_account_btn: { es: 'Crear cuenta gratis →', en: 'Create free account →', pt: 'Criar conta grátis →', zh: '创建免费账户 →', fr: 'Créer un compte gratuit →', it: 'Crea account gratuito →', hi: 'मुफ़्त खाता बनाएँ →', ar: 'إنشاء حساب مجاني ←' },
    port_need_account_login: { es: 'Ya tengo cuenta', en: 'I already have an account', pt: 'Já tenho conta', zh: '我已有账户', fr: "J'ai déjà un compte", it: 'Ho già un account', hi: 'मेरा खाता पहले से है', ar: 'لدي حساب بالفعل' },

    // Modal Agregar — campos
    port_search_placeholder: { es: 'Buscar ticker o nombre (ej: IBIT, HOOD, BTC...)', en: 'Search ticker or name (e.g.: IBIT, HOOD, BTC...)', pt: 'Buscar ticker ou nome (ex: IBIT, HOOD, BTC...)', zh: '搜索代码或名称（例：IBIT, HOOD, BTC...）', fr: 'Rechercher ticker ou nom (ex : IBIT, HOOD, BTC...)', it: 'Cerca ticker o nome (es: IBIT, HOOD, BTC...)', hi: 'टिकर या नाम खोजें (उदा: IBIT, HOOD, BTC...)', ar: 'البحث بالرمز أو الاسم (مثل: IBIT, HOOD, BTC...)' },
    port_cantidad_label: { es: 'Cantidad', en: 'Quantity', pt: 'Quantidade', zh: '数量', fr: 'Quantité', it: 'Quantità', hi: 'मात्रा', ar: 'الكمية' },
    port_cantidad_placeholder: { es: 'Ej: 0.5', en: 'E.g.: 0.5', pt: 'Ex: 0.5', zh: '例：0.5', fr: 'Ex : 0.5', it: 'Es: 0.5', hi: 'उदा: 0.5', ar: 'مثال: 0.5' },
    port_precio_compra_label: { es: 'Precio de compra (USD)', en: 'Purchase price (USD)', pt: 'Preço de compra (USD)', zh: '购买价格 (USD)', fr: "Prix d'achat (USD)", it: 'Prezzo di acquisto (USD)', hi: 'खरीद मूल्य (USD)', ar: 'سعر الشراء (USD)' },
    port_precio_placeholder: { es: 'Ej: 65000', en: 'E.g.: 65000', pt: 'Ex: 65000', zh: '例：65000', fr: 'Ex : 65000', it: 'Es: 65000', hi: 'उदा: 65000', ar: 'مثال: 65000' },
    port_preview_title: { es: '📊 VISTA PREVIA', en: '📊 PREVIEW', pt: '📊 PRÉ-VISUALIZAÇÃO', zh: '📊 预览', fr: '📊 APERÇU', it: '📊 ANTEPRIMA', hi: '📊 पूर्वावलोकन', ar: '📊 معاينة' },
    port_preview_precio_mercado: { es: 'Precio actual de mercado:', en: 'Current market price:', pt: 'Preço atual de mercado:', zh: '当前市场价格：', fr: 'Prix actuel du marché :', it: 'Prezzo attuale di mercato:', hi: 'वर्तमान बाज़ार मूल्य:', ar: 'سعر السوق الحالي:' },
    port_preview_valor_sumara: { es: 'Valor que sumará al portfolio:', en: 'Value to add to portfolio:', pt: 'Valor que somará ao portfólio:', zh: '将添加到投资组合的价值：', fr: 'Valeur ajoutée au portfolio :', it: 'Valore che si aggiungerà al portfolio:', hi: 'Portfolio में जुड़ने वाला मूल्य:', ar: 'القيمة المضافة إلى Portfolio:' },
    port_preview_pnl_inicial: { es: 'P&L inicial (vs precio compra):', en: 'Initial P&L (vs purchase price):', pt: 'P&L inicial (vs preço compra):', zh: '初始盈亏（对比购买价）：', fr: "P&L initial (vs prix d'achat) :", it: 'P&L iniziale (vs prezzo acquisto):', hi: 'प्रारंभिक P&L (खरीद मूल्य बनाम):', ar: 'P&L الأولي (مقابل سعر الشراء):' },

    // Búsqueda
    port_buscando: { es: 'Buscando...', en: 'Searching...', pt: 'Buscando...', zh: '搜索中...', fr: 'Recherche...', it: 'Ricerca...', hi: 'खोज रहे हैं...', ar: 'جارٍ البحث...' },
    port_sin_resultados: { es: 'Sin resultados para "', en: 'No results for "', pt: 'Sem resultados para "', zh: '没有找到"', fr: 'Aucun résultat pour "', it: 'Nessun risultato per "', hi: 'कोई परिणाम नहीं "', ar: 'لا نتائج لـ "' },
    port_cargando: { es: 'Cargando...', en: 'Loading...', pt: 'Carregando...', zh: '加载中...', fr: 'Chargement...', it: 'Caricamento...', hi: 'लोड हो रहा है...', ar: 'جارٍ التحميل...' },

    // Validaciones
    port_err_select_activo: { es: 'Seleccioná un activo de la lista', en: 'Select an asset from the list', pt: 'Selecione um ativo da lista', zh: '请从列表中选择资产', fr: 'Sélectionnez un actif de la liste', it: 'Seleziona un asset dalla lista', hi: 'सूची से एसेट चुनें', ar: 'اختر أصلاً من القائمة' },
    port_err_cantidad: { es: 'Ingresá una cantidad mayor a 0', en: 'Enter a quantity greater than 0', pt: 'Insira uma quantidade maior que 0', zh: '请输入大于0的数量', fr: 'Entrez une quantité supérieure à 0', it: 'Inserisci una quantità maggiore di 0', hi: '0 से अधिक मात्रा दर्ज करें', ar: 'أدخل كمية أكبر من 0' },
    port_err_precio: { es: 'Ingresá un precio de compra mayor a 0', en: 'Enter a purchase price greater than 0', pt: 'Insira um preço de compra maior que 0', zh: '请输入大于0的购买价格', fr: "Entrez un prix d'achat supérieur à 0", it: 'Inserisci un prezzo di acquisto maggiore di 0', hi: '0 से अधिक खरीद मूल्य दर्ज करें', ar: 'أدخل سعر شراء أكبر من 0' },

    // Modal Duplicados
    port_dupe_title_suffix: { es: 'ya está en tu portfolio', en: 'is already in your portfolio', pt: 'já está no seu portfólio', zh: '已在您的投资组合中', fr: 'est déjà dans votre portfolio', it: 'è già nel tuo portfolio', hi: 'पहले से आपके portfolio में है', ar: 'موجود بالفعل في محفظتك' },
    port_dupe_question: { es: '¿Qué querés hacer?', en: 'What do you want to do?', pt: 'O que você quer fazer?', zh: '您想怎么做？', fr: 'Que voulez-vous faire ?', it: 'Cosa vuoi fare?', hi: 'आप क्या करना चाहते हैं?', ar: 'ماذا تريد أن تفعل؟' },
    port_dupe_actual: { es: 'ACTUAL', en: 'CURRENT', pt: 'ATUAL', zh: '当前', fr: 'ACTUEL', it: 'ATTUALE', hi: 'वर्तमान', ar: 'الحالي' },
    port_precio_compra_short: { es: 'Precio compra', en: 'Purchase price', pt: 'Preço compra', zh: '购买价格', fr: "Prix d'achat", it: 'Prezzo acquisto', hi: 'खरीद मूल्य', ar: 'سعر الشراء' },
    port_dupe_nuevo: { es: 'NUEVO', en: 'NEW', pt: 'NOVO', zh: '新', fr: 'NOUVEAU', it: 'NUOVO', hi: 'नया', ar: 'جديد' },
    port_dupe_sumar: { es: '➕ Sumar al existente', en: '➕ Add to existing', pt: '➕ Somar ao existente', zh: '➕ 合并到现有', fr: "➕ Ajouter à l'existant", it: '➕ Somma al esistente', hi: '➕ मौजूद में जोड़ें', ar: '➕ إضافة إلى الموجود' },
    port_dupe_total: { es: 'Total:', en: 'Total:', pt: 'Total:', zh: '总计：', fr: 'Total :', it: 'Totale:', hi: 'कुल:', ar: 'المجموع:' },
    port_dupe_promedio: { es: 'Precio promedio ponderado:', en: 'Weighted avg price:', pt: 'Preço médio ponderado:', zh: '加权平均价格：', fr: 'Prix moyen pondéré :', it: 'Prezzo medio ponderato:', hi: 'भारित औसत मूल्य:', ar: 'متوسط السعر المرجح:' },
    port_dupe_reemplazar: { es: '↻ Reemplazar valores', en: '↻ Replace values', pt: '↻ Substituir valores', zh: '↻ 替换数值', fr: '↻ Remplacer les valeurs', it: '↻ Sostituisci valori', hi: '↻ मान बदलें', ar: '↻ استبدال القيم' },
    port_dupe_descarta: { es: 'Descarta lo anterior · Nuevo:', en: 'Discards previous · New:', pt: 'Descarta o anterior · Novo:', zh: '丢弃之前的 · 新：', fr: "Supprime l'ancien · Nouveau :", it: 'Scarta il precedente · Nuovo:', hi: 'पिछला हटाएँ · नया:', ar: 'تجاهل السابق · جديد:' },

    // Termómetro de Riesgo
    port_thermo_title: { es: '🌡️ Termómetro de Riesgo', en: '🌡️ Risk Thermometer', pt: '🌡️ Termômetro de Risco', zh: '🌡️ 风险温度计', fr: '🌡️ Thermomètre de Risque', it: '🌡️ Termometro di Rischio', hi: '🌡️ जोखिम थर्मामीटर', ar: '🌡️ مقياس المخاطر' },
    port_thermo_desc: { es: 'Muestra cómo está distribuido el capital de tu cartera según las señales activas de AUREX IA:', en: 'Shows how your portfolio capital is distributed according to active AUREX AI signals:', pt: 'Mostra como o capital do seu portfólio está distribuído segundo os sinais ativos da AUREX IA:', zh: '显示您的投资组合资金如何根据AUREX AI活跃信号分布：', fr: 'Montre comment le capital de votre portefeuille est réparti selon les signaux actifs AUREX IA :', it: 'Mostra come il capitale del tuo portafoglio è distribuito secondo i segnali attivi di AUREX IA:', hi: 'दिखाता है कि AUREX AI सक्रिय सिग्नल के अनुसार आपका portfolio पूँजी कैसे वितरित है:', ar: 'يوضح كيف يتوزع رأس مال محفظتك وفقاً لإشارات AUREX AI النشطة:' },
    port_signal_alcista: { es: 'ALCISTA', en: 'BULLISH', pt: 'ALTISTA', zh: '看涨', fr: 'HAUSSIER', it: 'RIALZISTA', hi: 'तेज़ी', ar: 'صاعد' },
    port_thermo_alcista_desc: { es: 'La IA ve momentum positivo: precio subiendo, volumen comprador. Alta probabilidad de suba en 24-48hs.', en: 'AI sees positive momentum: price rising, buying volume. High probability of increase in 24-48h.', pt: 'A IA vê momentum positivo: preço subindo, volume comprador. Alta probabilidade de alta em 24-48h.', zh: 'AI检测到正面动能：价格上涨，买入量增加。24-48小时内上涨概率高。', fr: "L'IA voit un momentum positif : prix en hausse, volume acheteur. Forte probabilité de hausse en 24-48h.", it: "L'IA vede momentum positivo: prezzo in salita, volume acquisti. Alta probabilità di rialzo in 24-48h.", hi: 'AI सकारात्मक गति देख रहा है: मूल्य बढ़ रहा है, खरीद मात्रा। 24-48 घंटे में वृद्धि की उच्च संभावना।', ar: 'الذكاء الاصطناعي يرى زخماً إيجابياً: السعر يرتفع، حجم شراء. احتمال ارتفاع عالٍ خلال 24-48 ساعة.' },
    port_signal_alta_conv: { es: 'ALTA CONV-IA', en: 'HIGH CONV-AI', pt: 'ALTA CONV-IA', zh: '高度AI收敛', fr: 'HAUTE CONV-IA', it: 'ALTA CONV-IA', hi: 'उच्च CONV-AI', ar: 'تقارب AI عالي' },
    port_thermo_conv_desc: { es: 'La señal más valiosa y rara. Máxima atención: movimiento fuerte inminente. Solo 1-2 activos por día reciben esta señal.', en: 'The most valuable and rare signal. Maximum attention: strong move imminent. Only 1-2 assets per day receive this signal.', pt: 'O sinal mais valioso e raro. Máxima atenção: movimento forte iminente. Apenas 1-2 ativos por dia recebem este sinal.', zh: '最有价值和稀有的信号。最高关注：即将出现强烈走势。每天仅1-2个资产收到此信号。', fr: 'Le signal le plus précieux et rare. Attention maximale : mouvement fort imminent. Seuls 1-2 actifs par jour reçoivent ce signal.', it: 'Il segnale più prezioso e raro. Massima attenzione: movimento forte imminente. Solo 1-2 asset al giorno ricevono questo segnale.', hi: 'सबसे मूल्यवान और दुर्लभ सिग्नल। अधिकतम ध्यान: मजबूत चाल आसन्न। प्रतिदिन केवल 1-2 एसेट को यह सिग्नल मिलता है।', ar: 'الإشارة الأكثر قيمة وندرة. انتباه أقصى: حركة قوية وشيكة. فقط 1-2 أصول يومياً تتلقى هذه الإشارة.' },
    port_signal_bajista: { es: 'BAJISTA', en: 'BEARISH', pt: 'BAIXISTA', zh: '看跌', fr: 'BAISSIER', it: 'RIBASSISTA', hi: 'मंदी', ar: 'هابط' },
    port_thermo_bajista_desc: { es: 'La IA ve momentum negativo: precio cayendo, volumen vendedor. Alta probabilidad de baja en 24-48hs.', en: 'AI sees negative momentum: price falling, selling volume. High probability of decline in 24-48h.', pt: 'A IA vê momentum negativo: preço caindo, volume vendedor. Alta probabilidade de queda em 24-48h.', zh: 'AI检测到负面动能：价格下跌，卖出量增加。24-48小时内下跌概率高。', fr: "L'IA voit un momentum négatif : prix en baisse, volume vendeur. Forte probabilité de baisse en 24-48h.", it: "L'IA vede momentum negativo: prezzo in calo, volume vendite. Alta probabilità di ribasso in 24-48h.", hi: 'AI नकारात्मक गति देख रहा है: मूल्य गिर रहा है, बिक्री मात्रा। 24-48 घंटे में गिरावट की उच्च संभावना।', ar: 'الذكاء الاصطناعي يرى زخماً سلبياً: السعر ينخفض، حجم بيع. احتمال انخفاض عالٍ خلال 24-48 ساعة.' },
    port_signal_sin_senal: { es: 'SIN SEÑAL', en: 'NO SIGNAL', pt: 'SEM SINAL', zh: '无信号', fr: 'SANS SIGNAL', it: 'SENZA SEGNALE', hi: 'कोई सिग्नल नहीं', ar: 'بدون إشارة' },
    port_thermo_sin_senal_desc: { es: 'No hay señal activa hoy para este activo. No es una alerta, simplemente el modelo no detectó nada destacable.', en: 'No active signal today for this asset. Not an alert, the model simply did not detect anything notable.', pt: 'Não há sinal ativo hoje para este ativo. Não é um alerta, simplesmente o modelo não detectou nada notável.', zh: '今天该资产没有活跃信号。这不是警报，只是模型未检测到任何值得注意的情况。', fr: "Pas de signal actif aujourd'hui pour cet actif. Ce n'est pas une alerte, le modèle n'a simplement rien détecté de notable.", it: "Nessun segnale attivo oggi per questo asset. Non è un avviso, semplicemente il modello non ha rilevato nulla di notevole.", hi: 'आज इस एसेट के लिए कोई सक्रिय सिग्नल नहीं। यह अलर्ट नहीं है, बस मॉडल ने कुछ उल्लेखनीय नहीं पाया।', ar: 'لا إشارة نشطة اليوم لهذا الأصل. ليس تنبيهاً، ببساطة لم يكتشف النموذج شيئاً ملحوظاً.' },
    port_entendido: { es: 'Entendido', en: 'Got it', pt: 'Entendido', zh: '明白了', fr: 'Compris', it: 'Capito', hi: 'समझ गया', ar: 'فهمت' },

    // Thermo Help
    port_thermo_help_title: { es: '🌡️ Cómo leer el Termómetro', en: '🌡️ How to read the Thermometer', pt: '🌡️ Como ler o Termômetro', zh: '🌡️ 如何解读温度计', fr: '🌡️ Comment lire le Thermomètre', it: '🌡️ Come leggere il Termometro', hi: '🌡️ थर्मामीटर कैसे पढ़ें', ar: '🌡️ كيف تقرأ المقياس' },
    port_thermo_help_verde: { es: '🟢 Verde — Alcista', en: '🟢 Green — Bullish', pt: '🟢 Verde — Altista', zh: '🟢 绿色 — 看涨', fr: '🟢 Vert — Haussier', it: '🟢 Verde — Rialzista', hi: '🟢 हरा — तेज़ी', ar: '🟢 أخضر — صاعد' },
    port_thermo_help_verde_desc: { es: 'Señal confirmada de suba. Buen momento para mantener o aumentar posición.', en: 'Confirmed upward signal. Good time to hold or increase position.', pt: 'Sinal confirmado de alta. Bom momento para manter ou aumentar posição.', zh: '确认的上涨信号。持有或增加仓位的好时机。', fr: 'Signal confirmé de hausse. Bon moment pour maintenir ou augmenter la position.', it: 'Segnale confermato di rialzo. Buon momento per mantenere o aumentare la posizione.', hi: 'वृद्धि का पुष्ट सिग्नल। स्थिति बनाए रखने या बढ़ाने का अच्छा समय।', ar: 'إشارة صعود مؤكدة. وقت مناسب للاحتفاظ أو زيادة المركز.' },
    port_thermo_help_rojo: { es: '🔴 Rojo — Bajista', en: '🔴 Red — Bearish', pt: '🔴 Vermelho — Baixista', zh: '🔴 红色 — 看跌', fr: '🔴 Rouge — Baissier', it: '🔴 Rosso — Ribassista', hi: '🔴 लाल — मंदी', ar: '🔴 أحمر — هابط' },
    port_thermo_help_rojo_desc: { es: 'Señal confirmada de caída. Evaluá reducir antes de que baje más.', en: 'Confirmed downward signal. Consider reducing before it drops further.', pt: 'Sinal confirmado de queda. Avalie reduzir antes que caia mais.', zh: '确认的下跌信号。考虑在进一步下跌前减仓。', fr: 'Signal confirmé de baisse. Envisagez de réduire avant que ça baisse davantage.', it: 'Segnale confermato di ribasso. Valuta di ridurre prima che scenda ancora.', hi: 'गिरावट का पुष्ट सिग्नल। और गिरने से पहले कम करने पर विचार करें।', ar: 'إشارة هبوط مؤكدة. فكر في التقليل قبل أن ينخفض أكثر.' },
    port_thermo_help_dorado: { es: '⚡ Dorado — Sin dirección', en: '⚡ Gold — No direction', pt: '⚡ Dourado — Sem direção', zh: '⚡ 金色 — 无方向', fr: '⚡ Doré — Sans direction', it: '⚡ Oro — Senza direzione', hi: '⚡ सुनहरा — दिशाहीन', ar: '⚡ ذهبي — بدون اتجاه' },
    port_thermo_help_dorado_desc: { es: 'Movimiento fuerte inminente sin confirmar. Esperá la señal — no operar todavía.', en: 'Strong unconfirmed move imminent. Wait for signal — do not trade yet.', pt: 'Movimento forte iminente sem confirmação. Espere o sinal — não opere ainda.', zh: '即将出现未确认的强烈走势。等待信号——暂不操作。', fr: 'Mouvement fort imminent non confirmé. Attendez le signal — ne pas opérer encore.', it: 'Movimento forte imminente non confermato. Aspetta il segnale — non operare ancora.', hi: 'बिना पुष्टि के मजबूत चाल आसन्न। सिग्नल की प्रतीक्षा करें — अभी ट्रेड न करें।', ar: 'حركة قوية وشيكة غير مؤكدة. انتظر الإشارة — لا تتداول بعد.' },
    port_thermo_help_gris: { es: '⚫ Gris — Sin señal', en: '⚫ Grey — No signal', pt: '⚫ Cinza — Sem sinal', zh: '⚫ 灰色 — 无信号', fr: '⚫ Gris — Sans signal', it: '⚫ Grigio — Senza segnale', hi: '⚫ ग्रे — कोई सिग्नल नहीं', ar: '⚫ رمادي — بدون إشارة' },
    port_thermo_help_gris_desc: { es: 'La IA no tiene datos suficientes hoy. Sin acción recomendada.', en: 'AI does not have enough data today. No recommended action.', pt: 'A IA não tem dados suficientes hoje. Sem ação recomendada.', zh: '今天AI没有足够数据。无推荐操作。', fr: "L'IA n'a pas assez de données aujourd'hui. Aucune action recommandée.", it: "L'IA non ha dati sufficienti oggi. Nessuna azione raccomandata.", hi: 'आज AI के पास पर्याप्त डेटा नहीं है। कोई अनुशंसित कार्रवाई नहीं।', ar: 'الذكاء الاصطناعي ليس لديه بيانات كافية اليوم. لا إجراء موصى به.' },
    port_thermo_help_footer: { es: 'El % indica cuánto de tu capital está en cada zona. Se actualiza con precios actuales.', en: 'The % indicates how much of your capital is in each zone. Updated with current prices.', pt: 'O % indica quanto do seu capital está em cada zona. Atualizado com preços atuais.', zh: '%表示您有多少资金在每个区域。按当前价格更新。', fr: 'Le % indique combien de votre capital est dans chaque zone. Mis à jour avec les prix actuels.', it: 'La % indica quanto del tuo capitale è in ogni zona. Aggiornato con i prezzi attuali.', hi: '% दर्शाता है कि आपकी कितनी पूँजी प्रत्येक ज़ोन में है। वर्तमान मूल्यों के साथ अपडेट।', ar: 'النسبة تشير إلى مقدار رأس مالك في كل منطقة. يتم التحديث بالأسعار الحالية.' },

    // Detalle activo — 52 semanas
    port_52w_zone_low: { es: 'Precio cerca del mínimo anual — zona históricamente baja', en: 'Price near annual low — historically low zone', pt: 'Preço perto da mínima anual — zona historicamente baixa', zh: '价格接近年度最低——历史低位区', fr: 'Prix proche du minimum annuel — zone historiquement basse', it: 'Prezzo vicino al minimo annuale — zona storicamente bassa', hi: 'वार्षिक न्यूनतम के पास — ऐतिहासिक रूप से निम्न ज़ोन', ar: 'السعر قرب أدنى مستوى سنوي — منطقة منخفضة تاريخياً' },
    port_52w_zone_mid: { es: 'Precio en zona media del rango anual', en: 'Price in the middle zone of annual range', pt: 'Preço na zona média do intervalo anual', zh: '价格处于年度区间中间', fr: 'Prix dans la zone médiane de la plage annuelle', it: 'Prezzo nella zona media del range annuale', hi: 'वार्षिक रेंज के मध्य ज़ोन में मूल्य', ar: 'السعر في المنطقة الوسطى للنطاق السنوي' },
    port_52w_zone_high: { es: 'Precio cerca del máximo anual — zona históricamente alta', en: 'Price near annual high — historically high zone', pt: 'Preço perto da máxima anual — zona historicamente alta', zh: '价格接近年度最高——历史高位区', fr: 'Prix proche du maximum annuel — zone historiquement haute', it: 'Prezzo vicino al massimo annuale — zona storicamente alta', hi: 'वार्षिक अधिकतम के पास — ऐतिहासिक रूप से उच्च ज़ोन', ar: 'السعر قرب أعلى مستوى سنوي — منطقة مرتفعة تاريخياً' },
    port_52w_min: { es: '↓ Mín:', en: '↓ Min:', pt: '↓ Mín:', zh: '↓ 最低:', fr: '↓ Min :', it: '↓ Min:', hi: '↓ न्यून:', ar: '↓ أدنى:' },
    port_52w_label: { es: '52 semanas', en: '52 weeks', pt: '52 semanas', zh: '52周', fr: '52 semaines', it: '52 settimane', hi: '52 सप्ताह', ar: '52 أسبوعاً' },
    port_52w_max: { es: '→ Máx:', en: '→ Max:', pt: '→ Máx:', zh: '→ 最高:', fr: '→ Max :', it: '→ Max:', hi: '→ अधि:', ar: '→ أعلى:' },
    port_52w_pct_range: { es: '% del rango anual', en: '% of annual range', pt: '% do intervalo anual', zh: '% 年度区间', fr: '% de la plage annuelle', it: '% del range annuale', hi: '% वार्षिक रेंज', ar: '% من النطاق السنوي' },

    // Detalle — señal IA
    port_detail_objetivo: { es: 'Objetivo', en: 'Target', pt: 'Objetivo', zh: '目标', fr: 'Objectif', it: 'Obiettivo', hi: 'लक्ष्य', ar: 'الهدف' },
    port_detail_stop_loss: { es: 'Stop Loss', en: 'Stop Loss', pt: 'Stop Loss', zh: 'Stop Loss', fr: 'Stop Loss', it: 'Stop Loss', hi: 'Stop Loss', ar: 'Stop Loss' },
    port_detail_upside: { es: 'Upside', en: 'Upside', pt: 'Upside', zh: '上行空间', fr: 'Upside', it: 'Upside', hi: 'Upside', ar: 'Upside' },
    port_detail_downside: { es: 'Downside', en: 'Downside', pt: 'Downside', zh: '下行风险', fr: 'Downside', it: 'Downside', hi: 'Downside', ar: 'Downside' },
    port_sin_senal_hoy: { es: 'Sin senal activa hoy', en: 'No active signal today', pt: 'Sem sinal ativo hoje', zh: '今天无活跃信号', fr: "Pas de signal actif aujourd'hui", it: 'Nessun segnale attivo oggi', hi: 'आज कोई सक्रिय सिग्नल नहीं', ar: 'لا إشارة نشطة اليوم' },

    // Detalle — grid info
    port_pnl_usd: { es: 'P&L USD', en: 'P&L USD', pt: 'P&L USD', zh: 'P&L USD', fr: 'P&L USD', it: 'P&L USD', hi: 'P&L USD', ar: 'P&L USD' },
    port_entrada: { es: 'Entrada', en: 'Entry', pt: 'Entrada', zh: '入场', fr: 'Entrée', it: 'Ingresso', hi: 'प्रवेश', ar: 'الدخول' },
    port_min_52sem: { es: '↓ Mín 52 sem.', en: '↓ Min 52 wk', pt: '↓ Mín 52 sem.', zh: '↓ 最低52周', fr: '↓ Min 52 sem.', it: '↓ Min 52 sett.', hi: '↓ न्यून 52 सप्त.', ar: '↓ أدنى 52 أسبوع' },
    port_max_52sem: { es: '→ Máx 52 sem.', en: '→ Max 52 wk', pt: '→ Máx 52 sem.', zh: '→ 最高52周', fr: '→ Max 52 sem.', it: '→ Max 52 sett.', hi: '→ अधि 52 सप्त.', ar: '→ أعلى 52 أسبوع' },

    // Simulador
    port_sim_title: { es: 'SIMULADOR DE ESCENARIOS', en: 'SCENARIO SIMULATOR', pt: 'SIMULADOR DE CENÁRIOS', zh: '情景模拟器', fr: 'SIMULATEUR DE SCÉNARIOS', it: 'SIMULATORE DI SCENARI', hi: 'परिदृश्य सिम्युलेटर', ar: 'محاكي السيناريوهات' },
    port_sim_label: { es: 'Si el precio cambia:', en: 'If price changes:', pt: 'Se o preço mudar:', zh: '如果价格变化：', fr: 'Si le prix change :', it: 'Se il prezzo cambia:', hi: 'यदि मूल्य बदलता है:', ar: 'إذا تغير السعر:' },
    port_sim_nuevo_precio: { es: 'Nuevo precio', en: 'New price', pt: 'Novo preço', zh: '新价格', fr: 'Nouveau prix', it: 'Nuovo prezzo', hi: 'नया मूल्य', ar: 'السعر الجديد' },
    port_sim_pnl_activo: { es: 'P&L del activo', en: 'Asset P&L', pt: 'P&L do ativo', zh: '资产盈亏', fr: "P&L de l'actif", it: "P&L dell'asset", hi: 'एसेट P&L', ar: 'P&L الأصل' },
    port_sim_impacto_total: { es: 'Impacto en portfolio total', en: 'Impact on total portfolio', pt: 'Impacto no portfólio total', zh: '对总投资组合的影响', fr: 'Impact sur le portfolio total', it: 'Impatto sul portfolio totale', hi: 'कुल portfolio पर प्रभाव', ar: 'التأثير على Portfolio الكلي' },
    port_compartir: { es: 'Compartir', en: 'Share', pt: 'Compartilhar', zh: '分享', fr: 'Partager', it: 'Condividi', hi: 'शेयर करें', ar: 'مشاركة' },

    // Eliminar
    port_confirm_eliminar: { es: '¿Eliminar este activo del portfolio?', en: 'Remove this asset from portfolio?', pt: 'Excluir este ativo do portfólio?', zh: '从投资组合中删除此资产？', fr: 'Supprimer cet actif du portfolio ?', it: 'Eliminare questo asset dal portfolio?', hi: 'इस एसेट को portfolio से हटाएँ?', ar: 'حذف هذا الأصل من Portfolio؟' },

    // Editar posición
    port_item_not_found: { es: 'Item no encontrado', en: 'Item not found', pt: 'Item não encontrado', zh: '未找到项目', fr: 'Élément non trouvé', it: 'Elemento non trovato', hi: 'आइटम नहीं मिला', ar: 'العنصر غير موجود' },
    port_editar_title: { es: 'Editar', en: 'Edit', pt: 'Editar', zh: '编辑', fr: 'Modifier', it: 'Modifica', hi: 'संपादित करें', ar: 'تعديل' },
    port_err_edit_values: { es: 'Cantidad y precio deben ser mayores a 0', en: 'Quantity and price must be greater than 0', pt: 'Quantidade e preço devem ser maiores que 0', zh: '数量和价格必须大于0', fr: 'Quantité et prix doivent être supérieurs à 0', it: 'Quantità e prezzo devono essere maggiori di 0', hi: 'मात्रा और मूल्य 0 से अधिक होने चाहिए', ar: 'الكمية والسعر يجب أن تكون أكبر من 0' },

    // Long Press
    port_lp_analisis: { es: 'Análisis IA completo', en: 'Full AI Analysis', pt: 'Análise IA completa', zh: '完整AI分析', fr: 'Analyse IA complète', it: 'Analisi IA completa', hi: 'पूर्ण AI विश्लेषण', ar: 'تحليل AI كامل' },
    port_lp_editar: { es: 'Editar', en: 'Edit', pt: 'Editar', zh: '编辑', fr: 'Modifier', it: 'Modifica', hi: 'संपादित करें', ar: 'تعديل' },
    port_lp_compartir: { es: 'Compartir', en: 'Share', pt: 'Compartilhar', zh: '分享', fr: 'Partager', it: 'Condividi', hi: 'शेयर करें', ar: 'مشاركة' },
    port_lp_confirmar_eliminar: { es: 'Eliminar', en: 'Delete', pt: 'Excluir', zh: '删除', fr: 'Supprimer', it: 'Eliminare', hi: 'हटाएँ', ar: 'حذف' },

    // === TERMÓMETRO VISUAL (barra + leyenda + mensajes) ===
    port_thermo_bar_title: { es: 'TERMÓMETRO DE RIESGO', en: 'RISK THERMOMETER', pt: 'TERMÔMETRO DE RISCO', zh: '风险温度计', fr: 'THERMOMÈTRE DE RISQUE', it: 'TERMOMETRO DI RISCHIO', hi: 'जोखिम थर्मामीटर', ar: 'مقياس المخاطر' },
    port_thermo_bar_subtitle: { es: 'CAPITAL POR SEÑAL IA', en: 'CAPITAL BY AI SIGNAL', pt: 'CAPITAL POR SINAL IA', zh: '按AI信号分配资金', fr: 'CAPITAL PAR SIGNAL IA', it: 'CAPITALE PER SEGNALE IA', hi: 'AI सिग्नल अनुसार पूँजी', ar: 'رأس المال حسب إشارة AI' },
    port_thermo_leg_alcista: { es: '📈 Alcista', en: '📈 Bullish', pt: '📈 Altista', zh: '📈 看涨', fr: '📈 Haussier', it: '📈 Rialzista', hi: '📈 तेज़ी', ar: '📈 صاعد' },
    port_thermo_leg_bajista: { es: '📉 Bajista', en: '📉 Bearish', pt: '📉 Baixista', zh: '📉 看跌', fr: '📉 Baissier', it: '📉 Ribassista', hi: '📉 मंदी', ar: '📉 هابط' },
    port_thermo_leg_sindir: { es: '⚡ Sin dirección', en: '⚡ No direction', pt: '⚡ Sem direção', zh: '⚡ 无方向', fr: '⚡ Sans direction', it: '⚡ Senza direzione', hi: '⚡ दिशाहीन', ar: '⚡ بدون اتجاه' },
    port_thermo_leg_sinsenal: { es: '⚫ Sin señal', en: '⚫ No signal', pt: '⚫ Sem sinal', zh: '⚫ 无信号', fr: '⚫ Sans signal', it: '⚫ Senza segnale', hi: '⚫ कोई सिग्नल नहीं', ar: '⚫ بدون إشارة' },
    port_thermo_msg_baj50: { es: '🔴 Revisá urgente — ', en: '🔴 Urgent review — ', pt: '🔴 Revise urgente — ', zh: '🔴 紧急检查 — ', fr: '🔴 Revue urgente — ', it: '🔴 Revisione urgente — ', hi: '🔴 तत्काल समीक्षा — ', ar: '🔴 مراجعة عاجلة — ' },
    port_thermo_msg_baj50_suf: { es: ' en baja confirmada.', en: ' in confirmed decline.', pt: ' em queda confirmada.', zh: ' 确认下跌中。', fr: ' en baisse confirmée.', it: ' in ribasso confermato.', hi: ' पुष्ट गिरावट में।', ar: ' في انخفاض مؤكد.' },
    port_thermo_msg_baj50_tip: { es: 'La IA confirmó caída. Evaluá reducir posición antes de que baje más.', en: 'AI confirmed decline. Consider reducing position before further drop.', pt: 'A IA confirmou queda. Avalie reduzir posição antes que caia mais.', zh: 'AI确认下跌。考虑在进一步下跌前减仓。', fr: "L'IA a confirmé la baisse. Envisagez de réduire la position avant que ça baisse davantage.", it: "L'IA ha confermato il ribasso. Valuta di ridurre la posizione prima di ulteriori cali.", hi: 'AI ने गिरावट की पुष्टि की। और गिरने से पहले स्थिति कम करने पर विचार करें।', ar: 'الذكاء الاصطناعي أكد الانخفاض. فكر في تقليل المركز قبل المزيد من الهبوط.' },
    port_thermo_msg_baj20: { es: '⚠️ Vigilar: ', en: '⚠️ Watch: ', pt: '⚠️ Vigiar: ', zh: '⚠️ 关注：', fr: '⚠️ Surveiller : ', it: '⚠️ Vigilare: ', hi: '⚠️ नज़र रखें: ', ar: '⚠️ مراقبة: ' },
    port_thermo_msg_baj20_suf: { es: ' con señal bajista.', en: ' with bearish signal.', pt: ' com sinal baixista.', zh: ' 有看跌信号。', fr: ' avec signal baissier.', it: ' con segnale ribassista.', hi: ' मंदी सिग्नल के साथ।', ar: ' مع إشارة هبوط.' },
    port_thermo_msg_baj20_tip: { es: 'Señal débil de baja. Monitorea de cerca antes de decidir.', en: 'Weak bearish signal. Monitor closely before deciding.', pt: 'Sinal fraco de queda. Monitore de perto antes de decidir.', zh: '弱看跌信号。密切关注后再决定。', fr: 'Signal baissier faible. Surveillez de près avant de décider.', it: 'Segnale ribassista debole. Monitora attentamente prima di decidere.', hi: 'कमज़ोर मंदी सिग्नल। निर्णय से पहले करीब से देखें।', ar: 'إشارة هبوط ضعيفة. راقب عن كثب قبل اتخاذ القرار.' },
    port_thermo_msg_alc50: { es: '🟢 Buen momento — ', en: '🟢 Good time — ', pt: '🟢 Bom momento — ', zh: '🟢 好时机 — ', fr: '🟢 Bon moment — ', it: '🟢 Buon momento — ', hi: '🟢 अच्छा समय — ', ar: '🟢 وقت مناسب — ' },
    port_thermo_msg_alc50_suf: { es: ' con momentum positivo.', en: ' with positive momentum.', pt: ' com momentum positivo.', zh: ' 正面动能。', fr: ' avec momentum positif.', it: ' con momentum positivo.', hi: ' सकारात्मक गति के साथ।', ar: ' مع زخم إيجابي.' },
    port_thermo_msg_alc50_tip: { es: 'La IA confirmó suba. Buen momento para mantener o aumentar posición.', en: 'AI confirmed rise. Good time to hold or increase position.', pt: 'A IA confirmou alta. Bom momento para manter ou aumentar posição.', zh: 'AI确认上涨。持有或增加仓位的好时机。', fr: "L'IA a confirmé la hausse. Bon moment pour maintenir ou augmenter la position.", it: "L'IA ha confermato il rialzo. Buon momento per mantenere o aumentare la posizione.", hi: 'AI ने वृद्धि की पुष्टि की। स्थिति बनाए रखने या बढ़ाने का अच्छा समय।', ar: 'الذكاء الاصطناعي أكد الارتفاع. وقت مناسب للاحتفاظ أو زيادة المركز.' },
    port_thermo_msg_hc40: { es: '⚡ Esperá señal antes de operar: ', en: '⚡ Wait for signal before trading: ', pt: '⚡ Espere sinal antes de operar: ', zh: '⚡ 等待信号再操作：', fr: '⚡ Attendez le signal avant d\'opérer : ', it: '⚡ Attendi il segnale prima di operare: ', hi: '⚡ ट्रेडिंग से पहले सिग्नल की प्रतीक्षा करें: ', ar: '⚡ انتظر الإشارة قبل التداول: ' },
    port_thermo_msg_hc40_tip: { es: 'La IA está monitoreando. Confirma dirección cuando el mercado define. Volvé mañana.', en: 'AI is monitoring. Direction confirms when market defines. Check back tomorrow.', pt: 'A IA está monitorando. Confirma direção quando o mercado definir. Volte amanhã.', zh: 'AI监控中。市场明确方向后确认。明天再看。', fr: "L'IA surveille. Direction confirmée quand le marché se définit. Revenez demain.", it: "L'IA sta monitorando. Conferma la direzione quando il mercato si definisce. Torna domani.", hi: 'AI निगरानी कर रहा है। बाज़ार तय करने पर दिशा की पुष्टि। कल फिर देखें।', ar: 'الذكاء الاصطناعي يراقب. يتأكد الاتجاه عندما يحدد السوق. عد غداً.' },
    port_thermo_msg_sin70: { es: '⚫ Sin datos suficientes hoy — no operar hasta nueva señal.', en: '⚫ Not enough data today — do not trade until new signal.', pt: '⚫ Sem dados suficientes hoje — não opere até novo sinal.', zh: '⚫ 今天数据不足——等待新信号再操作。', fr: "⚫ Pas assez de données aujourd'hui — ne pas opérer jusqu'au prochain signal.", it: '⚫ Dati insufficienti oggi — non operare fino a nuovo segnale.', hi: '⚫ आज पर्याप्त डेटा नहीं — नए सिग्नल तक ट्रेड न करें।', ar: '⚫ بيانات غير كافية اليوم — لا تتداول حتى إشارة جديدة.' },
    port_thermo_msg_sin70_tip: { es: 'La IA necesita más datos. Sin acción recomendada por ahora.', en: 'AI needs more data. No recommended action for now.', pt: 'A IA precisa de mais dados. Sem ação recomendada por enquanto.', zh: 'AI需要更多数据。暂无推荐操作。', fr: "L'IA a besoin de plus de données. Aucune action recommandée pour le moment.", it: "L'IA necessita più dati. Nessuna azione raccomandata per ora.", hi: 'AI को अधिक डेटा चाहिए। अभी कोई अनुशंसित कार्रवाई नहीं।', ar: 'الذكاء الاصطناعي يحتاج مزيداً من البيانات. لا إجراء موصى به حالياً.' },
    port_thermo_msg_mix: { es: ' — cartera con señales mixtas.', en: ' — portfolio with mixed signals.', pt: ' — carteira com sinais mistos.', zh: ' — 投资组合信号混合。', fr: ' — portefeuille avec signaux mixtes.', it: ' — portafoglio con segnali misti.', hi: ' — portfolio मिश्रित सिग्नल के साथ।', ar: ' — محفظة بإشارات مختلطة.' },
    port_thermo_msg_mix_tip: { es: 'Revisá cada activo individualmente antes de operar.', en: 'Review each asset individually before trading.', pt: 'Revise cada ativo individualmente antes de operar.', zh: '操作前逐一检查每个资产。', fr: 'Examinez chaque actif individuellement avant d\'opérer.', it: 'Rivedi ogni asset individualmente prima di operare.', hi: 'ट्रेडिंग से पहले प्रत्येक एसेट की अलग समीक्षा करें।', ar: 'راجع كل أصل على حدة قبل التداول.' },

    // === SORT / ORDENAR ===
    port_sort_title: { es: 'Ordenar por', en: 'Sort by', pt: 'Ordenar por', zh: '排序方式', fr: 'Trier par', it: 'Ordina per', hi: 'इसके अनुसार क्रमबद्ध', ar: 'ترتيب حسب' },
    port_sort_btn_prefix: { es: 'Ordenar:', en: 'Sort:', pt: 'Ordenar:', zh: '排序:', fr: 'Trier:', it: 'Ordina:', hi: 'क्रम:', ar: 'ترتيب:' },
    sort_valor: { es: 'Valor', en: 'Value', pt: 'Valor', zh: '价值', fr: 'Valeur', it: 'Valore', hi: 'मूल्य', ar: 'القيمة' },
    sort_valor_d: { es: 'Valor de mercado actual', en: 'Current market value', pt: 'Valor de mercado atual', zh: '当前市场价值', fr: 'Valeur de marché actuelle', it: 'Valore di mercato attuale', hi: 'वर्तमान बाज़ार मूल्य', ar: 'القيمة السوقية الحالية' },
    sort_pct_hoy: { es: '% Hoy', en: '% Today', pt: '% Hoje', zh: '% 今日', fr: "% Aujourd'hui", it: '% Oggi', hi: '% आज', ar: '% اليوم' },
    sort_pct_hoy_d: { es: 'Mayor cambio en 24 horas', en: 'Biggest change in 24 hours', pt: 'Maior mudança em 24 horas', zh: '24小时最大变化', fr: 'Plus grand changement en 24 heures', it: 'Maggior variazione in 24 ore', hi: '24 घंटे में सबसे बड़ा बदलाव', ar: 'أكبر تغيير خلال 24 ساعة' },
    sort_pnl_usd: { es: 'P&L $', en: 'P&L $', pt: 'P&L $', zh: 'P&L $', fr: 'P&L $', it: 'P&L $', hi: 'P&L $', ar: 'P&L $' },
    sort_pnl_usd_d: { es: 'Ganancia total absoluta desde compra', en: 'Total absolute gain since purchase', pt: 'Ganho total absoluto desde compra', zh: '自购买以来的总绝对收益', fr: "Gain total absolu depuis l'achat", it: "Guadagno totale assoluto dall'acquisto", hi: 'खरीद से कुल पूर्ण लाभ', ar: 'الربح الإجمالي المطلق منذ الشراء' },
    sort_pnl_pct: { es: 'P&L %', en: 'P&L %', pt: 'P&L %', zh: 'P&L %', fr: 'P&L %', it: 'P&L %', hi: 'P&L %', ar: 'P&L %' },
    sort_pnl_pct_d: { es: 'Ganancia total en % desde compra', en: 'Total % gain since purchase', pt: 'Ganho total em % desde compra', zh: '自购买以来的总百分比收益', fr: "Gain total en % depuis l'achat", it: "Guadagno totale in % dall'acquisto", hi: 'खरीद से कुल % लाभ', ar: 'نسبة الربح الإجمالية منذ الشراء' },
    sort_senal_ia: { es: 'Señal IA', en: 'AI Signal', pt: 'Sinal IA', zh: 'AI信号', fr: 'Signal IA', it: 'Segnale IA', hi: 'AI सिग्नल', ar: 'إشارة AI' },
    sort_senal_ia_d: { es: 'ALCISTA → ALTA CONV → BAJISTA', en: 'BULLISH → HIGH CONV → BEARISH', pt: 'ALTISTA → ALTA CONV → BAIXISTA', zh: '看涨 → 高收敛 → 看跌', fr: 'HAUSSIER → HAUTE CONV → BAISSIER', it: 'RIALZISTA → ALTA CONV → RIBASSISTA', hi: 'तेज़ी → उच्च CONV → मंदी', ar: 'صاعد → تقارب عالي → هابط' },
    sort_prob: { es: 'Probabilidad', en: 'Probability', pt: 'Probabilidade', zh: '概率', fr: 'Probabilité', it: 'Probabilità', hi: 'संभावना', ar: 'الاحتمالية' },
    sort_prob_d: { es: 'Mayor confianza IA arriba', en: 'Highest AI confidence on top', pt: 'Maior confiança IA em cima', zh: '最高AI置信度在前', fr: 'Plus haute confiance IA en haut', it: 'Maggiore fiducia IA in alto', hi: 'शीर्ष पर सबसे अधिक AI विश्वास', ar: 'أعلى ثقة AI في الأعلى' },
    sort_ticker: { es: 'Ticker', en: 'Ticker', pt: 'Ticker', zh: '代码', fr: 'Ticker', it: 'Ticker', hi: 'टिकर', ar: 'الرمز' },
    sort_ticker_d: { es: 'Alfabético (A → Z)', en: 'Alphabetical (A → Z)', pt: 'Alfabético (A → Z)', zh: '字母顺序 (A → Z)', fr: 'Alphabétique (A → Z)', it: 'Alfabetico (A → Z)', hi: 'वर्णानुक्रम (A → Z)', ar: 'أبجدي (A → Z)' },
    sort_fecha: { es: 'Fecha', en: 'Date', pt: 'Data', zh: '日期', fr: 'Date', it: 'Data', hi: 'तिथि', ar: 'التاريخ' },
    sort_fecha_d: { es: 'Orden de carga original', en: 'Original load order', pt: 'Ordem de carga original', zh: '原始加载顺序', fr: "Ordre de chargement original", it: 'Ordine di caricamento originale', hi: 'मूल लोड क्रम', ar: 'ترتيب التحميل الأصلي' },
    sort_default: { es: 'Default', en: 'Default', pt: 'Default', zh: '默认', fr: 'Défaut', it: 'Default', hi: 'डिफ़ॉल्ट', ar: 'افتراضي' },
    sort_default_d: { es: 'Orden del catálogo original', en: 'Original catalog order', pt: 'Ordem do catálogo original', zh: '原始目录顺序', fr: 'Ordre du catalogue original', it: 'Ordine del catalogo originale', hi: 'मूल कैटलॉग क्रम', ar: 'ترتيب الكتالوج الأصلي' },
    sort_precio: { es: 'Precio', en: 'Price', pt: 'Preço', zh: '价格', fr: 'Prix', it: 'Prezzo', hi: 'मूल्य', ar: 'السعر' },
    sort_precio_d: { es: 'Mayor precio arriba', en: 'Highest price on top', pt: 'Maior preço em cima', zh: '最高价格在前', fr: 'Prix le plus élevé en haut', it: 'Prezzo più alto in alto', hi: 'शीर्ष पर सबसे अधिक मूल्य', ar: 'أعلى سعر في الأعلى' },
    sort_pct_7d: { es: '% 7d', en: '% 7d', pt: '% 7d', zh: '% 7天', fr: '% 7j', it: '% 7g', hi: '% 7दि', ar: '% 7أيام' },
    sort_pct_7d_d: { es: 'Mayor cambio en 7 días', en: 'Biggest change in 7 days', pt: 'Maior mudança em 7 dias', zh: '7天最大变化', fr: 'Plus grand changement en 7 jours', it: 'Maggior variazione in 7 giorni', hi: '7 दिन में सबसे बड़ा बदलाव', ar: 'أكبر تغيير خلال 7 أيام' },
    sort_pct_30d: { es: '% 30d', en: '% 30d', pt: '% 30d', zh: '% 30天', fr: '% 30j', it: '% 30g', hi: '% 30दि', ar: '% 30يوم' },
    sort_pct_30d_d: { es: 'Mayor cambio en 30 días', en: 'Biggest change in 30 days', pt: 'Maior mudança em 30 dias', zh: '30天最大变化', fr: 'Plus grand changement en 30 jours', it: 'Maggior variazione in 30 giorni', hi: '30 दिन में सबसे बड़ा बदलाव', ar: 'أكبر تغيير خلال 30 يوماً' },
    sort_upside: { es: 'Upside', en: 'Upside', pt: 'Upside', zh: '上行空间', fr: 'Upside', it: 'Upside', hi: 'Upside', ar: 'Upside' },
    sort_upside_d: { es: 'Mayor % al objetivo', en: 'Highest % to target', pt: 'Maior % ao objetivo', zh: '最高目标百分比', fr: "Plus haut % vers l'objectif", it: "Più alto % all'obiettivo", hi: 'लक्ष्य तक सबसे अधिक %', ar: 'أعلى نسبة إلى الهدف' },
    sort_default_ia_d: { es: 'Orden por confianza IA', en: 'Order by AI confidence', pt: 'Ordem por confiança IA', zh: '按AI置信度排序', fr: 'Ordre par confiance IA', it: 'Ordine per fiducia IA', hi: 'AI विश्वास के अनुसार क्रम', ar: 'ترتيب حسب ثقة AI' },

    // === MERCADOS ===

    // Búsqueda
    mkt_search_placeholder: { es: 'Buscar cualquier activo... (IBIT, HOOD, MSTR, BTC...)', en: 'Search any asset... (IBIT, HOOD, MSTR, BTC...)', pt: 'Buscar qualquer ativo... (IBIT, HOOD, MSTR, BTC...)', zh: '搜索任何资产... (IBIT, HOOD, MSTR, BTC...)', fr: 'Rechercher un actif... (IBIT, HOOD, MSTR, BTC...)', it: 'Cerca qualsiasi asset... (IBIT, HOOD, MSTR, BTC...)', hi: 'कोई भी एसेट खोजें... (IBIT, HOOD, MSTR, BTC...)', ar: 'البحث عن أي أصل... (IBIT, HOOD, MSTR, BTC...)' },
    mkt_buscando: { es: 'Buscando...', en: 'Searching...', pt: 'Buscando...', zh: '搜索中...', fr: 'Recherche...', it: 'Ricerca...', hi: 'खोज रहे हैं...', ar: 'جارٍ البحث...' },
    mkt_sin_resultados: { es: 'Sin resultados para "', en: 'No results for "', pt: 'Sem resultados para "', zh: '没有找到"', fr: 'Aucun résultat pour "', it: 'Nessun risultato per "', hi: 'कोई परिणाम नहीं "', ar: 'لا نتائج لـ "' },
    mkt_tipo_cripto: { es: 'Cripto', en: 'Crypto', pt: 'Cripto', zh: '加密', fr: 'Crypto', it: 'Crypto', hi: 'क्रिप्टो', ar: 'كريبتو' },
    mkt_tipo_accion: { es: 'Accion', en: 'Stock', pt: 'Ação', zh: '股票', fr: 'Action', it: 'Azione', hi: 'स्टॉक', ar: 'سهم' },
    mkt_tipo_etf: { es: 'ETF', en: 'ETF', pt: 'ETF', zh: 'ETF', fr: 'ETF', it: 'ETF', hi: 'ETF', ar: 'ETF' },
    mkt_tipo_activo: { es: 'Activo', en: 'Asset', pt: 'Ativo', zh: '资产', fr: 'Actif', it: 'Asset', hi: 'एसेट', ar: 'أصل' },

    // Pin Modal
    mkt_pin_title: { es: 'Editar activos destacados', en: 'Edit featured assets', pt: 'Editar ativos destacados', zh: '编辑精选资产', fr: 'Modifier les actifs en vedette', it: 'Modifica asset in evidenza', hi: 'विशेष एसेट संपादित करें', ar: 'تعديل الأصول المميزة' },
    mkt_pin_desc: { es: 'Toc\u00E1 cualquier activo para fijarlo o quitarlo de los 4 destacados', en: 'Tap any asset to pin or unpin it from the 4 featured', pt: 'Toque qualquer ativo para fixar ou remover dos 4 destacados', zh: '点击任何资产将其固定或取消固定在4个精选中', fr: "Appuyez sur un actif pour l'\u00E9pingler ou le retirer des 4 en vedette", it: 'Tocca qualsiasi asset per fissarlo o rimuoverlo dai 4 in evidenza', hi: '4 विशेष में से पिन या अनपिन करने के लिए किसी एसेट पर टैप करें', ar: 'انقر على أي أصل لتثبيته أو إزالته من الأصول الأربعة المميزة' },
    mkt_listo: { es: 'Listo', en: 'Done', pt: 'Pronto', zh: '完成', fr: 'Terminé', it: 'Fatto', hi: 'हो गया', ar: 'تم' },

    // Tabs categorías
    mkt_tab_cripto: { es: 'Cripto', en: 'Crypto', pt: 'Cripto', zh: '加密', fr: 'Crypto', it: 'Crypto', hi: 'क्रिप्टो', ar: 'كريبتو' },
    mkt_tab_acciones: { es: 'Acciones', en: 'Stocks', pt: 'Ações', zh: '股票', fr: 'Actions', it: 'Azioni', hi: 'स्टॉक', ar: 'أسهم' },
    mkt_tab_stable: { es: 'Stable & DeFi', en: 'Stable & DeFi', pt: 'Stable & DeFi', zh: 'Stable & DeFi', fr: 'Stable & DeFi', it: 'Stable & DeFi', hi: 'Stable & DeFi', ar: 'Stable & DeFi' },
    mkt_tab_futuros: { es: 'Futuros', en: 'Futures', pt: 'Futuros', zh: '期货', fr: 'Futures', it: 'Futures', hi: 'फ्यूचर्स', ar: 'العقود الآجلة' },
    mkt_tab_commodities: { es: 'Commodities', en: 'Commodities', pt: 'Commodities', zh: '大宗商品', fr: 'Matières premières', it: 'Commodities', hi: 'कमोडिटीज़', ar: 'السلع' },
    mkt_tab_divisas: { es: 'Divisas', en: 'Currencies', pt: 'Moedas', zh: '外汇', fr: 'Devises', it: 'Valute', hi: 'मुद्राएँ', ar: 'العملات' },
    mkt_tab_etf: { es: 'ETF & Bonos', en: 'ETF & Bonds', pt: 'ETF & Títulos', zh: 'ETF & 债券', fr: 'ETF & Obligations', it: 'ETF & Obbligazioni', hi: 'ETF & बॉन्ड', ar: 'ETF & سندات' },

    // Sub-filtros países
    mkt_pais_usa: { es: 'EE.UU.', en: 'USA', pt: 'EUA', zh: '美国', fr: 'USA', it: 'USA', hi: 'अमेरिका', ar: 'أمريكا' },
    mkt_pais_arg: { es: 'Argentina', en: 'Argentina', pt: 'Argentina', zh: '阿根廷', fr: 'Argentine', it: 'Argentina', hi: 'अर्जेंटीना', ar: 'الأرجنتين' },
    mkt_pais_br: { es: 'Brasil', en: 'Brazil', pt: 'Brasil', zh: '巴西', fr: 'Brésil', it: 'Brasile', hi: 'ब्राज़ील', ar: 'البرازيل' },
    mkt_pais_eu: { es: 'Europa', en: 'Europe', pt: 'Europa', zh: '欧洲', fr: 'Europe', it: 'Europa', hi: 'यूरोप', ar: 'أوروبا' },
    mkt_pais_es: { es: 'España', en: 'Spain', pt: 'Espanha', zh: '西班牙', fr: 'Espagne', it: 'Spagna', hi: 'स्पेन', ar: 'إسبانيا' },
    mkt_pais_jp: { es: 'Japón', en: 'Japan', pt: 'Japão', zh: '日本', fr: 'Japon', it: 'Giappone', hi: 'जापान', ar: 'اليابان' },
    mkt_pais_cn: { es: 'China', en: 'China', pt: 'China', zh: '中国', fr: 'Chine', it: 'Cina', hi: 'चीन', ar: 'الصين' },

    // Timeframe
    mkt_tf_ahora: { es: 'Act. ahora', en: 'Updated now', pt: 'Atual. agora', zh: '已更新', fr: 'Mis à jour', it: 'Aggiornato', hi: 'अभी अपडेट', ar: 'محدّث الآن' },
    mkt_tf_7d: { es: 'Últimos 7d', en: 'Last 7d', pt: 'Últimos 7d', zh: '最近7天', fr: 'Derniers 7j', it: 'Ultimi 7g', hi: 'पिछले 7दि', ar: 'آخر 7 أيام' },
    mkt_tf_1m: { es: 'Último mes', en: 'Last month', pt: 'Último mês', zh: '上月', fr: 'Dernier mois', it: 'Ultimo mese', hi: 'पिछला महीना', ar: 'الشهر الماضي' },
    mkt_tf_3m: { es: 'Últimos 3m', en: 'Last 3mo', pt: 'Últimos 3m', zh: '最近3月', fr: 'Derniers 3m', it: 'Ultimi 3m', hi: 'पिछले 3 महीने', ar: 'آخر 3 أشهر' },
    mkt_tf_1y: { es: 'Último año', en: 'Last year', pt: 'Último ano', zh: '去年', fr: 'Dernière année', it: 'Ultimo anno', hi: 'पिछला वर्ष', ar: 'العام الماضي' },
    mkt_editar_orden: { es: 'Editar orden', en: 'Edit order', pt: 'Editar ordem', zh: '编辑顺序', fr: "Modifier l'ordre", it: "Modifica l'ordine", hi: 'क्रम संपादित करें', ar: 'تعديل الترتيب' },

    // Edit mode banner
    mkt_edit_instrucciones: { es: 'Arrastrá para reordenar · Tocá para ocultar', en: 'Drag to reorder · Tap to hide', pt: 'Arraste para reordenar · Toque para ocultar', zh: '拖动重新排序 · 点击隐藏', fr: 'Glissez pour réorganiser · Appuyez pour masquer', it: 'Trascina per riordinare · Tocca per nascondere', hi: 'क्रम बदलने के लिए खींचें · छिपाने के लिए टैप करें', ar: 'اسحب لإعادة الترتيب · انقر للإخفاء' },

    // Filtros IA
    mkt_ia_todo: { es: 'Todo', en: 'All', pt: 'Tudo', zh: '全部', fr: 'Tout', it: 'Tutto', hi: 'सभी', ar: 'الكل' },
    mkt_ia_alcista: { es: 'Alcista', en: 'Bullish', pt: 'Altista', zh: '看涨', fr: 'Haussier', it: 'Rialzista', hi: 'तेज़ी', ar: 'صاعد' },
    mkt_ia_bajista: { es: 'Bajista', en: 'Bearish', pt: 'Baixista', zh: '看跌', fr: 'Baissier', it: 'Ribassista', hi: 'मंदी', ar: 'هابط' },
    mkt_ia_conf: { es: 'Conf. IA', en: 'AI Conf.', pt: 'Conf. IA', zh: 'AI置信', fr: 'Conf. IA', it: 'Conf. IA', hi: 'AI विश्वास', ar: 'ثقة AI' },
    mkt_ia_cripto: { es: 'Cripto', en: 'Crypto', pt: 'Cripto', zh: '加密', fr: 'Crypto', it: 'Crypto', hi: 'क्रिप्टो', ar: 'كريبتو' },
    mkt_ia_acciones: { es: 'Acciones', en: 'Stocks', pt: 'Ações', zh: '股票', fr: 'Actions', it: 'Azioni', hi: 'स्टॉक', ar: 'أسهم' },
    mkt_ia_etf: { es: 'ETF', en: 'ETF', pt: 'ETF', zh: 'ETF', fr: 'ETF', it: 'ETF', hi: 'ETF', ar: 'ETF' },
    mkt_ia_metales: { es: 'Metales', en: 'Metals', pt: 'Metais', zh: '金属', fr: 'Métaux', it: 'Metalli', hi: 'धातुएँ', ar: 'معادن' },
    mkt_ia_materias: { es: 'Mat. Primas', en: 'Raw Mat.', pt: 'Mat. Primas', zh: '原材料', fr: 'Mat. Premières', it: 'Mat. Prime', hi: 'कच्चा माल', ar: 'مواد خام' },
    mkt_ia_bonos: { es: 'Bonos', en: 'Bonds', pt: 'Títulos', zh: '债券', fr: 'Obligations', it: 'Obbligazioni', hi: 'बॉन्ड', ar: 'سندات' },

    // Banner Mercados status
    mkt_status_abierto: { es: 'ABIERTO', en: 'OPEN', pt: 'ABERTO', zh: '开市', fr: 'OUVERT', it: 'APERTO', hi: 'खुला', ar: 'مفتوح' },
    mkt_status_cerrado: { es: 'CERRADO', en: 'CLOSED', pt: 'FECHADO', zh: '休市', fr: 'FERMÉ', it: 'CHIUSO', hi: 'बंद', ar: 'مغلق' },
    mkt_edit_banner_title: { es: 'Mercados en banner', en: 'Markets in banner', pt: 'Mercados no banner', zh: 'Banner中的市场', fr: 'Marchés dans la bannière', it: 'Mercati nel banner', hi: 'बैनर में बाज़ार', ar: 'الأسواق في الشريط' },

    // AUREX Pulse
    mkt_pulse_loading: { es: 'Calculando AUREX PULSE\u2122...', en: 'Calculating AUREX PULSE\u2122...', pt: 'Calculando AUREX PULSE\u2122...', zh: '计算 AUREX PULSE\u2122...', fr: 'Calcul AUREX PULSE\u2122...', it: 'Calcolo AUREX PULSE\u2122...', hi: 'AUREX PULSE\u2122 गणना कर रहा है...', ar: 'جارٍ حساب AUREX PULSE\u2122...' },
    mkt_pulse_ver_variables: { es: '\uD83D\uDCCA Ver variables', en: '\uD83D\uDCCA View variables', pt: '\uD83D\uDCCA Ver variáveis', zh: '\uD83D\uDCCA 查看变量', fr: '\uD83D\uDCCA Voir les variables', it: '\uD83D\uDCCA Vedi variabili', hi: '\uD83D\uDCCA वेरिएबल देखें', ar: '\uD83D\uDCCA عرض المتغيرات' },

    // Pulse educativas
    mkt_pulse_edu_panico: { es: 'Pánico extremo. Históricamente zonas de oportunidad para inversores de largo plazo.', en: 'Extreme panic. Historically opportunity zones for long-term investors.', pt: 'Pânico extremo. Historicamente zonas de oportunidade para investidores de longo prazo.', zh: '极度恐慌。历史上对长期投资者来说是机会区域。', fr: "Panique extrême. Historiquement des zones d'opportunité pour les investisseurs à long terme.", it: 'Panico estremo. Storicamente zone di opportunità per investitori a lungo termine.', hi: 'अत्यधिक दहशत। ऐतिहासिक रूप से दीर्घकालिक निवेशकों के लिए अवसर क्षेत्र।', ar: 'ذعر شديد. تاريخياً مناطق فرص للمستثمرين طويلي الأمد.' },
    mkt_pulse_edu_temor: { es: 'Temor generalizado. Los inversores están vendiendo. Posibles oportunidades si el contexto es sólido.', en: 'Widespread fear. Investors are selling. Possible opportunities if context is solid.', pt: 'Temor generalizado. Os investidores estão vendendo. Possíveis oportunidades se o contexto for sólido.', zh: '普遍恐惧。投资者正在抛售。如果背景稳固，可能有机会。', fr: 'Peur généralisée. Les investisseurs vendent. Opportunités possibles si le contexte est solide.', it: 'Timore generalizzato. Gli investitori stanno vendendo. Possibili opportunità se il contesto è solido.', hi: 'व्यापक भय। निवेशक बेच रहे हैं। यदि संदर्भ ठोस है तो संभावित अवसर।', ar: 'خوف عام. المستثمرون يبيعون. فرص محتملة إذا كان السياق قوياً.' },
    mkt_pulse_edu_equilibrado: { es: 'Mercado equilibrado. Ni euforia ni pánico. Momento ideal para analizar fundamentals.', en: 'Balanced market. Neither euphoria nor panic. Ideal time to analyze fundamentals.', pt: 'Mercado equilibrado. Nem euforia nem pânico. Momento ideal para analisar fundamentos.', zh: '市场均衡。既无狂热也无恐慌。分析基本面的理想时机。', fr: 'Marché équilibré. Ni euphorie ni panique. Moment idéal pour analyser les fondamentaux.', it: 'Mercato equilibrato. Né euforia né panico. Momento ideale per analizzare i fondamentali.', hi: 'संतुलित बाज़ार। न उत्साह न दहशत। फंडामेंटल विश्लेषण का आदर्श समय।', ar: 'سوق متوازن. لا نشوة ولا ذعر. وقت مثالي لتحليل الأساسيات.' },
    mkt_pulse_edu_optimismo: { es: 'Optimismo en el mercado. Precios pueden estar elevados. Considerar toma de ganancias.', en: 'Market optimism. Prices may be elevated. Consider taking profits.', pt: 'Otimismo no mercado. Preços podem estar elevados. Considere realizar lucros.', zh: '市场乐观。价格可能偏高。考虑获利了结。', fr: 'Optimisme du marché. Les prix peuvent être élevés. Envisager de prendre des bénéfices.', it: 'Ottimismo nel mercato. I prezzi potrebbero essere elevati. Considerare di prendere profitti.', hi: 'बाज़ार में आशावाद। मूल्य ऊँचे हो सकते हैं। लाभ लेने पर विचार करें।', ar: 'تفاؤل في السوق. الأسعار قد تكون مرتفعة. فكر في جني الأرباح.' },
    mkt_pulse_edu_euforia: { es: 'Euforia extrema. Alta probabilidad de corrección próxima. Máxima precaución.', en: 'Extreme euphoria. High probability of upcoming correction. Maximum caution.', pt: 'Euforia extrema. Alta probabilidade de correção próxima. Máxima precaução.', zh: '极度狂热。即将修正的概率高。最大限度谨慎。', fr: 'Euphorie extrême. Forte probabilité de correction prochaine. Prudence maximale.', it: 'Euforia estrema. Alta probabilità di correzione imminente. Massima cautela.', hi: 'अत्यधिक उत्साह। आगामी सुधार की उच्च संभावना। अधिकतम सावधानी।', ar: 'نشوة شديدة. احتمال تصحيح وشيك عالٍ. أقصى حذر.' },

    // Pulse Info modal
    mkt_pulse_info_title: { es: '\u26A1 AUREX FEAR & GREED 14X\u2122', en: '\u26A1 AUREX FEAR & GREED 14X\u2122', pt: '\u26A1 AUREX FEAR & GREED 14X\u2122', zh: '\u26A1 AUREX FEAR & GREED 14X\u2122', fr: '\u26A1 AUREX FEAR & GREED 14X\u2122', it: '\u26A1 AUREX FEAR & GREED 14X\u2122', hi: '\u26A1 AUREX FEAR & GREED 14X\u2122', ar: '\u26A1 AUREX FEAR & GREED 14X\u2122' },
    mkt_pulse_info_subtitle: { es: 'El índice de sentimiento más completo del mercado', en: 'The most comprehensive market sentiment index', pt: 'O índice de sentimento mais completo do mercado', zh: '最全面的市场情绪指数', fr: "L'indice de sentiment de marché le plus complet", it: "L'indice di sentiment di mercato più completo", hi: 'सबसे व्यापक बाज़ार भावना सूचकांक', ar: 'مؤشر معنويات السوق الأكثر شمولاً' },
    mkt_pulse_zonas_title: { es: 'Las 5 zonas:', en: 'The 5 zones:', pt: 'As 5 zonas:', zh: '5个区域：', fr: 'Les 5 zones :', it: 'Le 5 zone:', hi: '5 ज़ोन:', ar: 'المناطق الخمس:' },
    mkt_pulse_zona_miedo_ext: { es: '\uD83D\uDD34 0-20 Miedo Extremo', en: '\uD83D\uDD34 0-20 Extreme Fear', pt: '\uD83D\uDD34 0-20 Medo Extremo', zh: '\uD83D\uDD34 0-20 极度恐惧', fr: '\uD83D\uDD34 0-20 Peur Extrême', it: '\uD83D\uDD34 0-20 Paura Estrema', hi: '\uD83D\uDD34 0-20 अत्यधिक भय', ar: '\uD83D\uDD34 0-20 خوف شديد' },
    mkt_pulse_zona_miedo: { es: '\uD83D\uDFE0 21-40 Miedo', en: '\uD83D\uDFE0 21-40 Fear', pt: '\uD83D\uDFE0 21-40 Medo', zh: '\uD83D\uDFE0 21-40 恐惧', fr: '\uD83D\uDFE0 21-40 Peur', it: '\uD83D\uDFE0 21-40 Paura', hi: '\uD83D\uDFE0 21-40 भय', ar: '\uD83D\uDFE0 21-40 خوف' },
    mkt_pulse_zona_neutral: { es: '\uD83D\uDFE1 41-60 Neutral', en: '\uD83D\uDFE1 41-60 Neutral', pt: '\uD83D\uDFE1 41-60 Neutro', zh: '\uD83D\uDFE1 41-60 中性', fr: '\uD83D\uDFE1 41-60 Neutre', it: '\uD83D\uDFE1 41-60 Neutrale', hi: '\uD83D\uDFE1 41-60 तटस्थ', ar: '\uD83D\uDFE1 41-60 محايد' },
    mkt_pulse_zona_codicia: { es: '\uD83D\uDFE2 61-80 Codicia', en: '\uD83D\uDFE2 61-80 Greed', pt: '\uD83D\uDFE2 61-80 Ganância', zh: '\uD83D\uDFE2 61-80 贪婪', fr: '\uD83D\uDFE2 61-80 Avidité', it: '\uD83D\uDFE2 61-80 Avidità', hi: '\uD83D\uDFE2 61-80 लालच', ar: '\uD83D\uDFE2 61-80 جشع' },
    mkt_pulse_zona_codicia_ext: { es: '\uD83D\uDC9C 81-100 Codicia Extrema', en: '\uD83D\uDC9C 81-100 Extreme Greed', pt: '\uD83D\uDC9C 81-100 Ganância Extrema', zh: '\uD83D\uDC9C 81-100 极度贪婪', fr: '\uD83D\uDC9C 81-100 Avidité Extrême', it: '\uD83D\uDC9C 81-100 Avidità Estrema', hi: '\uD83D\uDC9C 81-100 अत्यधिक लालच', ar: '\uD83D\uDC9C 81-100 جشع شديد' },
    mkt_pulse_vars_title: { es: 'Variables activas (12 de 14):', en: 'Active variables (12 of 14):', pt: 'Variáveis ativas (12 de 14):', zh: '活跃变量（14个中的12个）：', fr: 'Variables actives (12 sur 14) :', it: 'Variabili attive (12 su 14):', hi: 'सक्रिय वेरिएबल (14 में से 12):', ar: 'متغيرات نشطة (12 من 14):' },
    mkt_pulse_th_variable: { es: 'VARIABLE', en: 'VARIABLE', pt: 'VARIÁVEL', zh: '变量', fr: 'VARIABLE', it: 'VARIABILE', hi: 'वेरिएबल', ar: 'المتغير' },
    mkt_pulse_th_fuente: { es: 'FUENTE', en: 'SOURCE', pt: 'FONTE', zh: '来源', fr: 'SOURCE', it: 'FONTE', hi: 'स्रोत', ar: 'المصدر' },
    mkt_pulse_th_peso: { es: 'PESO', en: 'WEIGHT', pt: 'PESO', zh: '权重', fr: 'POIDS', it: 'PESO', hi: 'भार', ar: 'الوزن' },
    mkt_pulse_th_valor: { es: 'VALOR', en: 'VALUE', pt: 'VALOR', zh: '值', fr: 'VALEUR', it: 'VALORE', hi: 'मान', ar: 'القيمة' },
    mkt_pulse_var_vix: { es: 'VIX volatilidad', en: 'VIX volatility', pt: 'VIX volatilidade', zh: 'VIX 波动率', fr: 'VIX volatilité', it: 'VIX volatilità', hi: 'VIX अस्थिरता', ar: 'VIX التقلب' },
    mkt_pulse_var_oro: { es: 'Oro GC=F', en: 'Gold GC=F', pt: 'Ouro GC=F', zh: '黄金 GC=F', fr: 'Or GC=F', it: 'Oro GC=F', hi: 'सोना GC=F', ar: 'ذهب GC=F' },
    mkt_pulse_var_plata: { es: 'Plata SI=F', en: 'Silver SI=F', pt: 'Prata SI=F', zh: '白银 SI=F', fr: 'Argent SI=F', it: 'Argento SI=F', hi: 'चाँदी SI=F', ar: 'فضة SI=F' },
    mkt_pulse_var_petroleo: { es: 'Petróleo CL=F', en: 'Oil CL=F', pt: 'Petróleo CL=F', zh: '石油 CL=F', fr: 'Pétrole CL=F', it: 'Petrolio CL=F', hi: 'तेल CL=F', ar: 'نفط CL=F' },
    mkt_pulse_var_cobre: { es: 'Cobre HG=F', en: 'Copper HG=F', pt: 'Cobre HG=F', zh: '铜 HG=F', fr: 'Cuivre HG=F', it: 'Rame HG=F', hi: 'तांबा HG=F', ar: 'نحاس HG=F' },
    mkt_pulse_var_geopolitica: { es: 'Geopolítica', en: 'Geopolitics', pt: 'Geopolítica', zh: '地缘政治', fr: 'Géopolitique', it: 'Geopolitica', hi: 'भू-राजनीति', ar: 'الجيوسياسة' },
    mkt_pulse_disclaimer: { es: '* Macro FED (FRED API) y Geopolítica (GDELT Project) activos son fallback estimados. 14 variables a cobertura completa en múltiples mercados.', en: '* Macro FED (FRED API) and Geopolitics (GDELT Project) are estimated fallbacks. 14 variables for full coverage across multiple markets.', pt: '* Macro FED (FRED API) e Geopolítica (GDELT Project) são fallbacks estimados. 14 variáveis para cobertura completa em múltiplos mercados.', zh: '* 宏观FED（FRED API）和地缘政治（GDELT Project）为估算后备。14个变量覆盖多个市场。', fr: '* Macro FED (FRED API) et Géopolitique (GDELT Project) sont des fallbacks estimés. 14 variables pour couverture complète sur multiples marchés.', it: '* Macro FED (FRED API) e Geopolitica (GDELT Project) sono fallback stimati. 14 variabili per copertura completa su mercati multipli.', hi: '* मैक्रो FED (FRED API) और भू-राजनीति (GDELT Project) अनुमानित फ़ॉलबैक हैं। एकाधिक बाज़ारों में पूर्ण कवरेज के लिए 14 वेरिएबल।', ar: '* Macro FED (FRED API) والجيوسياسة (GDELT Project) هي احتياطات تقديرية. 14 متغيراً لتغطية كاملة عبر أسواق متعددة.' },

    // Ver Variables popup
    mkt_vars_title: { es: 'AUREX IA \u26A1 \u2014 10 VARIABLES', en: 'AUREX AI \u26A1 \u2014 10 VARIABLES', pt: 'AUREX IA \u26A1 \u2014 10 VARIÁVEIS', zh: 'AUREX AI \u26A1 \u2014 10 个变量', fr: 'AUREX IA \u26A1 \u2014 10 VARIABLES', it: 'AUREX IA \u26A1 \u2014 10 VARIABILI', hi: 'AUREX AI \u26A1 \u2014 10 वेरिएबल', ar: 'AUREX AI \u26A1 \u2014 10 متغيرات' },
    mkt_vars_subtitle: { es: 'Motor de señales v7 \u2014 tiempo real', en: 'Signal engine v7 \u2014 real time', pt: 'Motor de sinais v7 \u2014 tempo real', zh: '信号引擎 v7 \u2014 实时', fr: 'Moteur de signaux v7 \u2014 temps réel', it: 'Motore segnali v7 \u2014 tempo reale', hi: 'सिग्नल इंजन v7 \u2014 रियल-टाइम', ar: 'محرك الإشارات v7 \u2014 الوقت الحقيقي' },
    mkt_vars_desc: { es: 'Cada señal es el resultado de puntuar 10 variables independientes. El score total determina la dirección y la probabilidad. Rango de probabilidad: 55%\u201388%.', en: 'Each signal is the result of scoring 10 independent variables. The total score determines direction and probability. Probability range: 55%\u201388%.', pt: 'Cada sinal é o resultado de pontuar 10 variáveis independentes. O score total determina a direção e a probabilidade. Faixa de probabilidade: 55%\u201388%.', zh: '每个信号是对10个独立变量评分的结果。总分决定方向和概率。概率范围：55%\u201388%。', fr: 'Chaque signal résulte de la notation de 10 variables indépendantes. Le score total détermine la direction et la probabilité. Plage de probabilité : 55%\u201388%.', it: 'Ogni segnale è il risultato della valutazione di 10 variabili indipendenti. Lo score totale determina direzione e probabilità. Range di probabilità: 55%\u201388%.', hi: 'प्रत्येक सिग्नल 10 स्वतंत्र वेरिएबल को स्कोर करने का परिणाम है। कुल स्कोर दिशा और संभावना निर्धारित करता है। संभावना रेंज: 55%\u201388%।', ar: 'كل إشارة هي نتيجة تسجيل 10 متغيرات مستقلة. المجموع يحدد الاتجاه والاحتمالية. نطاق الاحتمالية: 55%\u201388%.' },
    mkt_vars_mercado_ahora: { es: 'Mercado ahora:', en: 'Market now:', pt: 'Mercado agora:', zh: '当前市场：', fr: 'Marché maintenant :', it: 'Mercato ora:', hi: 'बाज़ार अभी:', ar: 'السوق الآن:' },
    mkt_vars_al_alza: { es: ' al alza', en: ' bullish', pt: ' em alta', zh: ' 看涨', fr: ' haussier', it: ' al rialzo', hi: ' तेज़ी', ar: ' صاعد' },
    mkt_vars_a_la_baja: { es: ' a la baja', en: ' bearish', pt: ' em baixa', zh: ' 看跌', fr: ' baissier', it: ' al ribasso', hi: ' मंदी', ar: ' هابط' },
    mkt_var1_label: { es: '1. Tendencia 24h', en: '1. 24h Trend', pt: '1. Tendência 24h', zh: '1. 24小时趋势', fr: '1. Tendance 24h', it: '1. Tendenza 24h', hi: '1. 24 घंटे का रुझान', ar: '1. اتجاه 24 ساعة' },
    mkt_var1_desc: { es: 'Variación % del precio en las últimas 24hs. Mide el momentum inmediato.', en: 'Price % change in last 24h. Measures immediate momentum.', pt: 'Variação % do preço nas últimas 24h. Mede o momentum imediato.', zh: '过去24小时价格变化百分比。衡量即时动能。', fr: 'Variation % du prix dans les dernières 24h. Mesure le momentum immédiat.', it: 'Variazione % del prezzo nelle ultime 24h. Misura il momentum immediato.', hi: 'पिछले 24 घंटे में मूल्य % परिवर्तन। तत्काल गति को मापता है।', ar: 'نسبة تغير السعر خلال 24 ساعة. يقيس الزخم الفوري.' },
    mkt_var2_label: { es: '2. RSI14 Real', en: '2. RSI14 Real', pt: '2. RSI14 Real', zh: '2. RSI14 实时', fr: '2. RSI14 Réel', it: '2. RSI14 Reale', hi: '2. RSI14 वास्तविक', ar: '2. RSI14 حقيقي' },
    mkt_var2_desc: { es: 'Índice de Fuerza Relativa de 14 períodos desde Binance/Yahoo. Detecta sobrecompra (>70) y sobreventa (<30).', en: 'Relative Strength Index of 14 periods from Binance/Yahoo. Detects overbought (>70) and oversold (<30).', pt: 'Índice de Força Relativa de 14 períodos via Binance/Yahoo. Detecta sobrecompra (>70) e sobrevenda (<30).', zh: '来自Binance/Yahoo的14期相对强弱指数。检测超买(>70)和超卖(<30)。', fr: "Indice de Force Relative de 14 périodes depuis Binance/Yahoo. Détecte le surachat (>70) et la survente (<30).", it: 'Indice di Forza Relativa a 14 periodi da Binance/Yahoo. Rileva ipercomprato (>70) e ipervenduto (<30).', hi: 'Binance/Yahoo से 14 अवधि RSI। अधिक खरीद (>70) और अधिक बिक्री (<30) का पता लगाता है।', ar: 'مؤشر القوة النسبية 14 فترة من Binance/Yahoo. يكتشف الشراء المفرط (>70) والبيع المفرط (<30).' },
    mkt_var3_label: { es: '3. Volumen Real', en: '3. Real Volume', pt: '3. Volume Real', zh: '3. 实时成交量', fr: '3. Volume Réel', it: '3. Volume Reale', hi: '3. वास्तविक मात्रा', ar: '3. الحجم الحقيقي' },
    mkt_var3_desc: { es: 'Ratio de volumen actual vs promedio de los últimos 5 días. Confirma si el movimiento tiene convicción.', en: 'Current volume ratio vs 5-day average. Confirms if the move has conviction.', pt: 'Razão do volume atual vs média dos últimos 5 dias. Confirma se o movimento tem convicção.', zh: '当前成交量与5日均量的比率。确认走势是否有力度。', fr: 'Ratio du volume actuel vs moyenne des 5 derniers jours. Confirme si le mouvement a de la conviction.', it: 'Rapporto volume attuale vs media ultimi 5 giorni. Conferma se il movimento ha convinzione.', hi: 'वर्तमान वॉल्यूम अनुपात बनाम 5-दिन औसत। पुष्टि करता है कि चाल में दृढ़ता है।', ar: 'نسبة الحجم الحالي مقابل متوسط 5 أيام. يؤكد ما إذا كانت الحركة ذات قناعة.' },
    mkt_var4_label: { es: '4. Volatilidad', en: '4. Volatility', pt: '4. Volatilidade', zh: '4. 波动率', fr: '4. Volatilité', it: '4. Volatilità', hi: '4. अस्थिरता', ar: '4. التقلب' },
    mkt_var4_desc: { es: 'Amplitud del rango diario (high\u2013low / precio). Alta volatilidad = mayor riesgo.', en: 'Daily range amplitude (high\u2013low / price). High volatility = higher risk.', pt: 'Amplitude do range diário (high\u2013low / preço). Alta volatilidade = maior risco.', zh: '日内区间幅度（最高-最低/价格）。高波动率=更高风险。', fr: 'Amplitude du range journalier (high\u2013low / prix). Haute volatilité = risque plus élevé.', it: 'Ampiezza del range giornaliero (high\u2013low / prezzo). Alta volatilità = maggior rischio.', hi: 'दैनिक रेंज आयाम (उच्च-निम्न / मूल्य)। उच्च अस्थिरता = अधिक जोखिम।', ar: 'سعة النطاق اليومي (أعلى-أدنى / السعر). تقلب عالٍ = مخاطر أعلى.' },
    mkt_var5_label: { es: '5. Correlación BTC/SPY', en: '5. BTC/SPY Correlation', pt: '5. Correlação BTC/SPY', zh: '5. BTC/SPY相关性', fr: '5. Corrélation BTC/SPY', it: '5. Correlazione BTC/SPY', hi: '5. BTC/SPY सहसंबंध', ar: '5. ارتباط BTC/SPY' },
    mkt_var5_desc: { es: 'Para cripto: correlación con BTC. Para acciones: con S&P500. Detecta arrastre sistémico.', en: 'For crypto: correlation with BTC. For stocks: with S&P500. Detects systemic drag.', pt: 'Para cripto: correlação com BTC. Para ações: com S&P500. Detecta arraste sistêmico.', zh: '加密：与BTC的相关性。股票：与S&P500的相关性。检测系统性拖累。', fr: 'Pour crypto : corrélation avec BTC. Pour actions : avec S&P500. Détecte le drag systémique.', it: 'Per crypto: correlazione con BTC. Per azioni: con S&P500. Rileva il trascinamento sistemico.', hi: 'क्रिप्टो: BTC के साथ सहसंबंध। स्टॉक: S&P500 के साथ। प्रणालीगत प्रभाव का पता लगाता है।', ar: 'للكريبتو: الارتباط مع BTC. للأسهم: مع S&P500. يكتشف السحب المنهجي.' },
    mkt_var6_label: { es: '6. Oro / Petróleo', en: '6. Gold / Oil', pt: '6. Ouro / Petróleo', zh: '6. 黄金/石油', fr: '6. Or / Pétrole', it: '6. Oro / Petrolio', hi: '6. सोना / तेल', ar: '6. ذهب / نفط' },
    mkt_var6_desc: { es: 'Precios de activos refugio. Oro alto = aversión al riesgo. Impacta según tipo de activo.', en: 'Safe-haven asset prices. High gold = risk aversion. Impact depends on asset type.', pt: 'Preços de ativos refúgio. Ouro alto = aversão ao risco. Impacta conforme tipo de ativo.', zh: '避险资产价格。黄金高=风险厌恶。影响取决于资产类型。', fr: "Prix des actifs refuges. Or élevé = aversion au risque. Impact selon le type d'actif.", it: "Prezzi degli asset rifugio. Oro alto = avversione al rischio. Impatto secondo tipo d'asset.", hi: 'सुरक्षित-आश्रय एसेट मूल्य। सोना ऊँचा = जोखिम से बचाव। एसेट प्रकार पर निर्भर।', ar: 'أسعار أصول الملاذ الآمن. ذهب مرتفع = تجنب المخاطر. التأثير حسب نوع الأصل.' },
    mkt_var7_label: { es: '7. Macro FED', en: '7. Macro FED', pt: '7. Macro FED', zh: '7. 宏观 FED', fr: '7. Macro FED', it: '7. Macro FED', hi: '7. मैक्रो FED', ar: '7. ماكرو FED' },
    mkt_var7_desc: { es: 'Eventos macro de alto impacto programados (FOMC, CPI, PBI). Incrementa incertidumbre.', en: 'Scheduled high-impact macro events (FOMC, CPI, GDP). Increases uncertainty.', pt: 'Eventos macro de alto impacto programados (FOMC, CPI, PIB). Aumenta incerteza.', zh: '计划中的高影响宏观事件（FOMC, CPI, GDP）。增加不确定性。', fr: 'Événements macro à fort impact programmés (FOMC, CPI, PIB). Augmente l\'incertitude.', it: 'Eventi macro ad alto impatto programmati (FOMC, CPI, PIL). Aumenta l\'incertezza.', hi: 'निर्धारित उच्च-प्रभाव मैक्रो इवेंट (FOMC, CPI, GDP)। अनिश्चितता बढ़ाता है।', ar: 'أحداث ماكرو عالية التأثير مجدولة (FOMC, CPI, GDP). تزيد عدم اليقين.' },
    mkt_var8_label: { es: '8. Earnings', en: '8. Earnings', pt: '8. Earnings', zh: '8. 财报', fr: '8. Earnings', it: '8. Earnings', hi: '8. Earnings', ar: '8. الأرباح' },
    mkt_var8_desc: { es: 'Reportes de resultados próximos. Históricamente elevan la volatilidad del activo.', en: 'Upcoming earnings reports. Historically increase asset volatility.', pt: 'Relatórios de resultados próximos. Historicamente elevam a volatilidade do ativo.', zh: '即将发布的财报。历史上会增加资产波动性。', fr: "Rapports de résultats à venir. Historiquement augmentent la volatilité de l'actif.", it: "Report di risultati imminenti. Storicamente aumentano la volatilità dell'asset.", hi: 'आगामी कमाई रिपोर्ट। ऐतिहासिक रूप से एसेट अस्थिरता बढ़ाती हैं।', ar: 'تقارير أرباح قادمة. تاريخياً تزيد تقلب الأصل.' },
    mkt_var9_label: { es: '9. MACD (12/26)', en: '9. MACD (12/26)', pt: '9. MACD (12/26)', zh: '9. MACD (12/26)', fr: '9. MACD (12/26)', it: '9. MACD (12/26)', hi: '9. MACD (12/26)', ar: '9. MACD (12/26)' },
    mkt_var9_desc: { es: 'Divergencia entre EMA12 y EMA26 calculada sobre los últimos 30 días de precios de cierre. Detecta cruces de momentum.', en: 'Divergence between EMA12 and EMA26 calculated over last 30 days of closing prices. Detects momentum crossovers.', pt: 'Divergência entre EMA12 e EMA26 calculada sobre os últimos 30 dias de preços de fechamento. Detecta cruzamentos de momentum.', zh: '基于最近30天收盘价计算的EMA12和EMA26之间的背离。检测动能交叉。', fr: 'Divergence entre EMA12 et EMA26 calculée sur les 30 derniers jours de prix de clôture. Détecte les croisements de momentum.', it: 'Divergenza tra EMA12 ed EMA26 calcolata sugli ultimi 30 giorni di prezzi di chiusura. Rileva crossover di momentum.', hi: 'पिछले 30 दिनों के बंद मूल्यों पर गणना की गई EMA12 और EMA26 के बीच विचलन। गति क्रॉसओवर का पता लगाता है।', ar: 'التباعد بين EMA12 وEMA26 محسوب على آخر 30 يوم من أسعار الإغلاق. يكتشف تقاطعات الزخم.' },
    mkt_var10_label: { es: '10. Soporte / Resist. 30d', en: '10. Support / Resist. 30d', pt: '10. Suporte / Resist. 30d', zh: '10. 支撑/阻力 30天', fr: '10. Support / Résist. 30j', it: '10. Supporto / Resist. 30g', hi: '10. सपोर्ट / रेज़िस्ट. 30दि', ar: '10. دعم / مقاومة 30 يوم' },
    mkt_var10_desc: { es: 'Distancia del precio actual al máximo y mínimo de los últimos 30 días. Detecta zonas de oferta y demanda técnica.', en: 'Distance from current price to 30-day high and low. Detects technical supply and demand zones.', pt: 'Distância do preço atual ao máximo e mínimo dos últimos 30 dias. Detecta zonas de oferta e demanda técnica.', zh: '当前价格与过去30天最高最低价的距离。检测技术供需区域。', fr: 'Distance du prix actuel au max et min des 30 derniers jours. Détecte les zones techniques d\'offre et demande.', it: 'Distanza del prezzo attuale dal massimo e minimo degli ultimi 30 giorni. Rileva zone di offerta e domanda tecnica.', hi: 'वर्तमान मूल्य से 30-दिन के उच्च और निम्न तक की दूरी। तकनीकी आपूर्ति और मांग क्षेत्रों का पता लगाता है।', ar: 'المسافة من السعر الحالي إلى أعلى وأدنى 30 يوماً. يكتشف مناطق العرض والطلب الفنية.' },

    // Long Press Mercados
    mkt_lp_precio: { es: 'Precio', en: 'Price', pt: 'Preço', zh: '价格', fr: 'Prix', it: 'Prezzo', hi: 'मूल्य', ar: 'السعر' },
    mkt_lp_objetivo_ia: { es: 'Objetivo IA', en: 'AI Target', pt: 'Objetivo IA', zh: 'AI目标', fr: 'Objectif IA', it: 'Obiettivo IA', hi: 'AI लक्ष्य', ar: 'هدف AI' },
    mkt_lp_senal_ia: { es: 'Señal IA ', en: 'AI Signal ', pt: 'Sinal IA ', zh: 'AI信号 ', fr: 'Signal IA ', it: 'Segnale IA ', hi: 'AI सिग्नल ', ar: 'إشارة AI ' },
    mkt_lp_quitar_fav: { es: '★ Quitar de Favoritos', en: '★ Remove from Favorites', pt: '★ Remover dos Favoritos', zh: '★ 从收藏中移除', fr: '★ Retirer des Favoris', it: '★ Rimuovi dai Preferiti', hi: '★ पसंदीदा से हटाएँ', ar: '★ إزالة من المفضلة' },
    mkt_lp_agregar_fav: { es: '★ Agregar a Favoritos', en: '★ Add to Favorites', pt: '★ Adicionar aos Favoritos', zh: '★ 添加到收藏', fr: '★ Ajouter aux Favoris', it: '★ Aggiungi ai Preferiti', hi: '★ पसंदीदा में जोड़ें', ar: '★ إضافة إلى المفضلة' },
    mkt_lp_agregar_portfolio: { es: 'Agregar a Portfolio', en: 'Add to Portfolio', pt: 'Adicionar ao Portfólio', zh: '添加到投资组合', fr: 'Ajouter au Portfolio', it: 'Aggiungi al Portfolio', hi: 'Portfolio में जोड़ें', ar: 'إضافة إلى Portfolio' },
    mkt_lp_cerrar: { es: 'Cerrar', en: 'Close', pt: 'Fechar', zh: '关闭', fr: 'Fermer', it: 'Chiudi', hi: 'बंद करें', ar: 'إغلاق' },

    // Futuros banner
    mkt_fut_suffix: { es: ' Fut', en: ' Fut', pt: ' Fut', zh: ' 期货', fr: ' Fut', it: ' Fut', hi: ' Fut', ar: ' آجل' },
    mkt_fut_edit_title: { es: 'Futuros en banner', en: 'Futures in banner', pt: 'Futuros no banner', zh: 'Banner中的期货', fr: 'Futures dans la bannière', it: 'Futures nel banner', hi: 'बैनर में फ्यूचर्स', ar: 'العقود الآجلة في الشريط' },

    // Otros
    mkt_copiado: { es: 'Copiado al portapapeles', en: 'Copied to clipboard', pt: 'Copiado para a área de transferência', zh: '已复制到剪贴板', fr: 'Copié dans le presse-papiers', it: 'Copiato negli appunti', hi: 'क्लिपबोर्ड पर कॉपी किया गया', ar: 'تم النسخ إلى الحافظة' },
    mkt_live_hace_s: { es: '· hace ', en: '· ', pt: '· há ', zh: '· ', fr: '· il y a ', it: '· ', hi: '· ', ar: '· منذ ' },
    mkt_live_hace_min: { es: ' min', en: ' min ago', pt: ' min', zh: ' 分钟前', fr: ' min', it: ' min fa', hi: ' मिनट पहले', ar: ' دقيقة' },

    // Gauge labels (cortos)
    mkt_gauge_miedo_ext: { es: 'Miedo Extremo', en: 'Extreme Fear', pt: 'Medo Extremo', zh: '极度恐惧', fr: 'Peur Extrême', it: 'Paura Estrema', hi: 'अत्यधिक भय', ar: 'خوف شديد' },
    mkt_gauge_miedo: { es: 'Miedo', en: 'Fear', pt: 'Medo', zh: '恐惧', fr: 'Peur', it: 'Paura', hi: 'भय', ar: 'خوف' },
    mkt_gauge_neutral: { es: 'Neutral', en: 'Neutral', pt: 'Neutro', zh: '中性', fr: 'Neutre', it: 'Neutrale', hi: 'तटस्थ', ar: 'محايد' },
    mkt_gauge_codicia: { es: 'Codicia', en: 'Greed', pt: 'Ganância', zh: '贪婪', fr: 'Avidité', it: 'Avidità', hi: 'लालच', ar: 'جشع' },
    mkt_gauge_codicia_ext: { es: 'Codicia Extrema', en: 'Extreme Greed', pt: 'Ganância Extrema', zh: '极度贪婪', fr: 'Avidité Extrême', it: 'Avidità Estrema', hi: 'अत्यधिक लालच', ar: 'جشع شديد' },

    // Variables Peso label
    mkt_vars_peso: { es: 'Peso', en: 'Weight', pt: 'Peso', zh: '权重', fr: 'Poids', it: 'Peso', hi: 'भार', ar: 'الوزن' },
    mkt_vars_peso_alta: { es: 'Alta', en: 'High', pt: 'Alta', zh: '高', fr: 'Élevé', it: 'Alto', hi: 'उच्च', ar: 'عالي' },
    mkt_vars_peso_media: { es: 'Media', en: 'Medium', pt: 'Média', zh: '中', fr: 'Moyen', it: 'Medio', hi: 'मध्यम', ar: 'متوسط' },

    // Pulse filter tabs
    mkt_pulse_cat_global: { es: 'GLOBAL', en: 'GLOBAL', pt: 'GLOBAL', zh: '全球', fr: 'GLOBAL', it: 'GLOBALE', hi: 'ग्लोबल', ar: 'عالمي' },
    mkt_pulse_cat_cripto: { es: 'CRIPTO', en: 'CRYPTO', pt: 'CRIPTO', zh: '加密', fr: 'CRYPTO', it: 'CRYPTO', hi: 'क्रिप्टो', ar: 'كريبتو' },
    mkt_pulse_cat_acciones: { es: 'ACCIONES', en: 'STOCKS', pt: 'AÇÕES', zh: '股票', fr: 'ACTIONS', it: 'AZIONI', hi: 'स्टॉक', ar: 'أسهم' },
    mkt_pulse_cat_comod: { es: 'COMOD', en: 'COMMOD', pt: 'COMOD', zh: '商品', fr: 'MAT.P', it: 'COMMOD', hi: 'कमोडि', ar: 'سلع' },
    mkt_pulse_cat_futuros: { es: 'FUTUROS', en: 'FUTURES', pt: 'FUTUROS', zh: '期货', fr: 'FUTURES', it: 'FUTURES', hi: 'फ्यूचर्स', ar: 'آجلة' }
  };

  // ═══ FUNCIONES PÚBLICAS ═══

  function t(key) {
    var entry = T[key];
    if (!entry) return key;
    return entry[_lang] || entry.es || key;
  }

  function getLang() { return _lang; }

  function setLang(code) {
    _lang = code;
    localStorage.setItem('aurex_lang', code);
    applyTranslations();
    _listeners.forEach(function(fn) { fn(code); });
  }

  function onLangChange(fn) {
    _listeners.push(fn);
    return function() { _listeners = _listeners.filter(function(f) { return f !== fn; }); };
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      var key = el.getAttribute('data-i18n');
      var attr = el.getAttribute('data-i18n-attr');
      if (attr === 'placeholder') {
        el.placeholder = t(key);
      } else if (attr === 'value') {
        el.value = t(key);
      } else {
        el.textContent = t(key);
      }
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function(el) {
      var key = el.getAttribute('data-i18n-html');
      el.innerHTML = t(key);
    });
  }

  // ═══ EXPORTS ═══
  window._i18n = { t: t, getLang: getLang, setLang: setLang, onLangChange: onLangChange, applyTranslations: applyTranslations, T: T };
  window.t = t;

  document.addEventListener('DOMContentLoaded', function() {
    applyTranslations();
  });

})();
