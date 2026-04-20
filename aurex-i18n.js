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
    aviso_legal_cerrar: { es: '✕ Cerrar', en: '✕ Close', pt: '✕ Fechar', zh: '✕ 关闭', fr: '✕ Fermer', it: '✕ Chiudi', hi: '✕ बंद करें', ar: '✕ إغلاق' }
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
