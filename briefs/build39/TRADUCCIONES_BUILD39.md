# TRADUCCIONES BUILD 39

Archivo generado por: Escritorio  
Fecha: 2026-06-08  
Build: 39 — Scope v3 cerrado  
Destino: Code cablea en i18n.js

---

## RESUMEN DE ESTADO

| Módulo | Estado | Notas |
|--------|--------|-------|
| 1.h.9 Login/Signup | ✅ LISTO | 10 claves nuevas × 8 idiomas |
| 1.h.7 FAQ Perfil | ✅ LISTO | 6 Q+A × 8 idiomas + rating modal |
| 1.h.6 AI Analysis | ⏸ BLOQUEADO | Espera estructura de Code con condicionales |

---

## DIAGNÓSTICO — STRINGS HARDCODEADOS ENCONTRADOS

### LoginScreen.js

Strings de debug/desarrollo (deben ELIMINARSE en producción):
- `"[LoginScreen] render"` — console.log debug
- `"[LoginScreen] Token:"` — console.log debug
- `"[LoginScreen] Error en login:"` — console.log debug

Strings de UI ya en ES que necesitan clave i18n:
- `"Iniciar sesión"` → ya cubierto por clave existente
- `"Email"`, `"Contraseña"` → ya cubiertos
- Los demás strings de LoginScreen ya estaban en i18n.js — OK

### SignupScreen.js — 10 strings hardcodeados ES identificados

| # | String original ES | Clave nueva sugerida |
|---|--------------------|----------------------|
| 1 | "Crear cuenta" | signup.title |
| 2 | "Nombre" | signup.name_label |
| 3 | "Tu nombre" (placeholder) | signup.name_placeholder |
| 4 | "Email" | signup.email_label |
| 5 | "Tu email" (placeholder) | signup.email_placeholder |
| 6 | "Contraseña" | signup.password_label |
| 7 | "Mínimo 6 caracteres" (placeholder) | signup.password_placeholder |
| 8 | "Registrarse" | signup.submit_button |
| 9 | "Ya tenés cuenta? Iniciá sesión" | signup.login_link |
| 10 | "Error al crear la cuenta" | signup.error_create |

---

## 1.h.9 — TRADUCCIONES LOGIN / SIGNUP

### Clave: `signup.title`

| Idioma | Traducción |
|--------|------------|
| ES | Crear cuenta |
| EN | Create account |
| PT | Criar conta |
| FR | Créer un compte |
| IT | Crea account |
| ZH | 创建账户 |
| HI | खाता बनाएं |
| AR | إنشاء حساب |

### Clave: `signup.name_label`

| Idioma | Traducción |
|--------|------------|
| ES | Nombre |
| EN | Name |
| PT | Nome |
| FR | Nom |
| IT | Nome |
| ZH | 姓名 |
| HI | नाम |
| AR | الاسم |

### Clave: `signup.name_placeholder`

| Idioma | Traducción |
|--------|------------|
| ES | Tu nombre |
| EN | Your name |
| PT | Seu nome |
| FR | Votre nom |
| IT | Il tuo nome |
| ZH | 您的姓名 |
| HI | आपका नाम |
| AR | اسمك |

### Clave: `signup.email_label`

| Idioma | Traducción |
|--------|------------|
| ES | Email |
| EN | Email |
| PT | Email |
| FR | E-mail |
| IT | Email |
| ZH | 电子邮件 |
| HI | ईमेल |
| AR | البريد الإلكتروني |

### Clave: `signup.email_placeholder`

| Idioma | Traducción |
|--------|------------|
| ES | Tu email |
| EN | Your email |
| PT | Seu email |
| FR | Votre e-mail |
| IT | La tua email |
| ZH | 您的邮箱 |
| HI | आपका ईमेल |
| AR | بريدك الإلكتروني |

### Clave: `signup.password_label`

| Idioma | Traducción |
|--------|------------|
| ES | Contraseña |
| EN | Password |
| PT | Senha |
| FR | Mot de passe |
| IT | Password |
| ZH | 密码 |
| HI | पासवर्ड |
| AR | كلمة المرور |

### Clave: `signup.password_placeholder`

| Idioma | Traducción |
|--------|------------|
| ES | Mínimo 6 caracteres |
| EN | Minimum 6 characters |
| PT | Mínimo 6 caracteres |
| FR | Minimum 6 caractères |
| IT | Minimo 6 caratteri |
| ZH | 至少6个字符 |
| HI | न्यूनतम 6 वर्ण |
| AR | 6 أحرف على الأقل |

### Clave: `signup.submit_button`

| Idioma | Traducción |
|--------|------------|
| ES | Registrarse |
| EN | Sign up |
| PT | Cadastrar |
| FR | S'inscrire |
| IT | Registrati |
| ZH | 注册 |
| HI | साइन अप करें |
| AR | إنشاء حساب |

### Clave: `signup.login_link`

| Idioma | Traducción |
|--------|------------|
| ES | ¿Ya tenés cuenta? Iniciá sesión |
| EN | Already have an account? Log in |
| PT | Já tem uma conta? Entrar |
| FR | Déjà un compte? Se connecter |
| IT | Hai già un account? Accedi |
| ZH | 已有账户？登录 |
| HI | पहले से खाता है? लॉग इन करें |
| AR | هل لديك حساب؟ تسجيل الدخول |

### Clave: `signup.error_create`

| Idioma | Traducción |
|--------|------------|
| ES | Error al crear la cuenta |
| EN | Error creating account |
| PT | Erro ao criar conta |
| FR | Erreur lors de la création du compte |
| IT | Errore nella creazione dell'account |
| ZH | 创建账户时出错 |
| HI | खाता बनाने में त्रुटि |
| AR | خطأ في إنشاء الحساب |

---

## 1.h.7 — TRADUCCIONES FAQ PERFIL

Contexto: PerfilScreen.js tiene un modal FAQ con 6 preguntas/respuestas.
Estado actual: solo ES + EN hardcodeado. Necesita 8 idiomas via i18n.

### Clave: `faq.title`

| Idioma | Traducción |
|--------|------------|
| ES | Preguntas frecuentes |
| EN | Frequently asked questions |
| PT | Perguntas frequentes |
| FR | Questions fréquentes |
| IT | Domande frequenti |
| ZH | 常见问题 |
| HI | अक्सर पूछे जाने वाले प्रश्न |
| AR | الأسئلة الشائعة |

---

### FAQ Q1 — ¿Qué es Cobrex?

**Clave pregunta:** `faq.q1`

| Idioma | Traducción |
|--------|------------|
| ES | ¿Qué es Cobrex? |
| EN | What is Cobrex? |
| PT | O que é Cobrex? |
| FR | Qu'est-ce que Cobrex? |
| IT | Cos'è Cobrex? |
| ZH | Cobrex 是什么？ |
| HI | Cobrex क्या है? |
| AR | ما هو Cobrex؟ |

**Clave respuesta:** `faq.a1`

| Idioma | Traducción |
|--------|------------|
| ES | Cobrex es una app de finanzas personales con IA que te ayuda a seguir mercados, gestionar alertas y analizar tu portafolio. |
| EN | Cobrex is an AI-powered personal finance app that helps you track markets, manage alerts, and analyze your portfolio. |
| PT | Cobrex é um app de finanças pessoais com IA que ajuda você a acompanhar mercados, gerenciar alertas e analisar seu portfólio. |
| FR | Cobrex est une app de finances personnelles avec IA qui vous aide à suivre les marchés, gérer les alertes et analyser votre portefeuille. |
| IT | Cobrex è un'app di finanza personale con IA che ti aiuta a seguire i mercati, gestire gli avvisi e analizzare il tuo portafoglio. |
| ZH | Cobrex 是一款 AI 驱动的个人理财应用，帮助您跟踪市场、管理提醒并分析您的投资组合。 |
| HI | Cobrex एक AI-संचालित व्यक्तिगत वित्त ऐप है जो आपको बाज़ारों को ट्रैक करने, अलर्ट प्रबंधित करने और अपने पोर्टफोलियो का विश्लेषण करने में मदद करता है। |
| AR | Cobrex تطبيق تمويل شخصي مدعوم بالذكاء الاصطناعي يساعدك على متابعة الأسواق وإدارة التنبيهات وتحليل محفظتك. |

---

### FAQ Q2 — ¿Cómo funciona el análisis IA?

**Clave pregunta:** `faq.q2`

| Idioma | Traducción |
|--------|------------|
| ES | ¿Cómo funciona el análisis con IA? |
| EN | How does the AI analysis work? |
| PT | Como funciona a análise com IA? |
| FR | Comment fonctionne l'analyse IA? |
| IT | Come funziona l'analisi con IA? |
| ZH | AI 分析如何运作？ |
| HI | AI विश्लेषण कैसे काम करता है? |
| AR | كيف يعمل تحليل الذكاء الاصطناعي؟ |

**Clave respuesta:** `faq.a2`

| Idioma | Traducción |
|--------|------------|
| ES | Nuestro motor de IA analiza datos del mercado en tiempo real y genera señales e insights personalizados para tu portafolio. |
| EN | Our AI engine analyzes real-time market data and generates personalized signals and insights for your portfolio. |
| PT | Nosso motor de IA analisa dados de mercado em tempo real e gera sinais e insights personalizados para seu portfólio. |
| FR | Notre moteur IA analyse les données du marché en temps réel et génère des signaux et insights personnalisés pour votre portefeuille. |
| IT | Il nostro motore IA analizza i dati di mercato in tempo reale e genera segnali e insight personalizzati per il tuo portafoglio. |
| ZH | 我们的 AI 引擎实时分析市场数据，为您的投资组合生成个性化信号和见解。 |
| HI | हमारा AI इंजन वास्तविक समय में बाज़ार डेटा का विश्लेषण करता है और आपके पोर्टफोलियो के लिए व्यक्तिगत संकेत और अंतर्दृष्टि उत्पन्न करता है। |
| AR | يحلل محرك الذكاء الاصطناعي لدينا بيانات السوق في الوقت الفعلي ويولد إشارات ورؤى مخصصة لمحفظتك. |

---

### FAQ Q3 — ¿Qué incluye el plan PRO?

**Clave pregunta:** `faq.q3`

| Idioma | Traducción |
|--------|------------|
| ES | ¿Qué incluye el plan PRO? |
| EN | What does the PRO plan include? |
| PT | O que inclui o plano PRO? |
| FR | Que comprend le plan PRO? |
| IT | Cosa include il piano PRO? |
| ZH | PRO 方案包含什么？ |
| HI | PRO प्लान में क्या शामिल है? |
| AR | ماذا يتضمن الخطة PRO؟ |

**Clave respuesta:** `faq.a3`

| Idioma | Traducción |
|--------|------------|
| ES | PRO incluye alertas ilimitadas, análisis IA avanzado, acceso a todos los mercados y soporte prioritario. $4.99/mes o $47.90/año. |
| EN | PRO includes unlimited alerts, advanced AI analysis, access to all markets and priority support. $4.99/mo or $47.90/yr. |
| PT | PRO inclui alertas ilimitados, análise IA avançada, acesso a todos os mercados e suporte prioritário. $4.99/mês ou $47.90/ano. |
| FR | PRO comprend des alertes illimitées, l'analyse IA avancée, l'accès à tous les marchés et le support prioritaire. $4.99/mois ou $47.90/an. |
| IT | PRO include avvisi illimitati, analisi IA avanzata, accesso a tutti i mercati e supporto prioritario. $4.99/mese o $47.90/anno. |
| ZH | PRO 包含无限提醒、高级 AI 分析、访问所有市场和优先支持。每月 $4.99 或每年 $47.90。 |
| HI | PRO में असीमित अलर्ट, उन्नत AI विश्लेषण, सभी बाज़ारों तक पहुँच और प्राथमिकता सहायता शामिल है। $4.99/माह या $47.90/वर्ष। |
| AR | يتضمن PRO تنبيهات غير محدودة وتحليل ذكاء اصطناعي متقدم والوصول إلى جميع الأسواق ودعم ذو أولوية. $4.99/شهر أو $47.90/سنة. |

---

### FAQ Q4 — ¿Qué incluye el plan ELITE?

**Clave pregunta:** `faq.q4`

| Idioma | Traducción |
|--------|------------|
| ES | ¿Qué incluye el plan ELITE? |
| EN | What does the ELITE plan include? |
| PT | O que inclui o plano ELITE? |
| FR | Que comprend le plan ELITE? |
| IT | Cosa include il piano ELITE? |
| ZH | ELITE 方案包含什么？ |
| HI | ELITE प्लान में क्या शामिल है? |
| AR | ماذا يتضمن الخطة ELITE؟ |

**Clave respuesta:** `faq.a4`

| Idioma | Traducción |
|--------|------------|
| ES | ELITE incluye todo lo de PRO más señales premium, portafolio avanzado y acceso anticipado a nuevas funciones. $9.99/mes o $95.90/año. |
| EN | ELITE includes everything in PRO plus premium signals, advanced portfolio and early access to new features. $9.99/mo or $95.90/yr. |
| PT | ELITE inclui tudo do PRO mais sinais premium, portfólio avançado e acesso antecipado a novas funcionalidades. $9.99/mês ou $95.90/ano. |
| FR | ELITE comprend tout ce que PRO offre plus des signaux premium, un portefeuille avancé et un accès anticipé aux nouvelles fonctionnalités. $9.99/mois ou $95.90/an. |
| IT | ELITE include tutto ciò che offre PRO più segnali premium, portafoglio avanzato e accesso anticipato alle nuove funzionalità. $9.99/mese o $95.90/anno. |
| ZH | ELITE 包含 PRO 的一切，还有高级信号、高级投资组合和新功能的早期访问权限。每月 $9.99 或每年 $95.90。 |
| HI | ELITE में PRO की सब कुछ शामिल है, साथ ही प्रीमियम सिग्नल, उन्नत पोर्टफोलियो और नई सुविधाओं तक जल्दी पहुँच। $9.99/माह या $95.90/वर्ष। |
| AR | يتضمن ELITE كل ما في PRO بالإضافة إلى إشارات مميزة ومحفظة متقدمة والوصول المبكر للميزات الجديدة. $9.99/شهر أو $95.90/سنة. |

---

### FAQ Q5 — ¿Puedo cancelar en cualquier momento?

**Clave pregunta:** `faq.q5`

| Idioma | Traducción |
|--------|------------|
| ES | ¿Puedo cancelar en cualquier momento? |
| EN | Can I cancel at any time? |
| PT | Posso cancelar a qualquer momento? |
| FR | Puis-je annuler à tout moment? |
| IT | Posso cancellare in qualsiasi momento? |
| ZH | 我可以随时取消吗？ |
| HI | क्या मैं किसी भी समय रद्द कर सकता हूँ? |
| AR | هل يمكنني الإلغاء في أي وقت؟ |

**Clave respuesta:** `faq.a5`

| Idioma | Traducción |
|--------|------------|
| ES | Sí. Podés cancelar cuando quieras desde la configuración de tu cuenta en App Store o Google Play. |
| EN | Yes. You can cancel anytime from your account settings in App Store or Google Play. |
| PT | Sim. Você pode cancelar a qualquer momento nas configurações da sua conta na App Store ou Google Play. |
| FR | Oui. Vous pouvez annuler à tout moment depuis les paramètres de votre compte sur l'App Store ou Google Play. |
| IT | Sì. Puoi cancellare in qualsiasi momento dalle impostazioni del tuo account sull'App Store o Google Play. |
| ZH | 是的。您可以随时在 App Store 或 Google Play 的账户设置中取消。 |
| HI | हाँ। आप App Store या Google Play में अपनी खाता सेटिंग से कभी भी रद्द कर सकते हैं। |
| AR | نعم. يمكنك الإلغاء في أي وقت من إعدادات حسابك على App Store أو Google Play. |

---

### FAQ Q6 — ¿Mis datos están seguros?

**Clave pregunta:** `faq.q6`

| Idioma | Traducción |
|--------|------------|
| ES | ¿Mis datos están seguros? |
| EN | Is my data safe? |
| PT | Meus dados estão seguros? |
| FR | Mes données sont-elles sécurisées? |
| IT | I miei dati sono al sicuro? |
| ZH | 我的数据安全吗？ |
| HI | क्या मेरा डेटा सुरक्षित है? |
| AR | هل بياناتي آمنة؟ |

**Clave respuesta:** `faq.a6`

| Idioma | Traducción |
|--------|------------|
| ES | Sí. Usamos encriptación de extremo a extremo y nunca compartimos tus datos con terceros. |
| EN | Yes. We use end-to-end encryption and never share your data with third parties. |
| PT | Sim. Usamos criptografia de ponta a ponta e nunca compartilhamos seus dados com terceiros. |
| FR | Oui. Nous utilisons le chiffrement de bout en bout et ne partageons jamais vos données avec des tiers. |
| IT | Sì. Utilizziamo la crittografia end-to-end e non condividiamo mai i tuoi dati con terze parti. |
| ZH | 是的。我们使用端到端加密，绝不与第三方共享您的数据。 |
| HI | हाँ। हम एंड-टू-एंड एन्क्रिप्शन का उपयोग करते हैं और आपका डेटा कभी भी तृतीय पक्षों के साथ साझा नहीं करते। |
| AR | نعم. نستخدم التشفير من طرف إلى طرف ولا نشارك بياناتك أبدًا مع أطراف ثالثة. |

---

## 1.h.7 — RATING MODAL (PerfilScreen)

Contexto: modal de calificación hardcodeado en ES. Necesita claves i18n.

### Clave: `rating.title`

| Idioma | Traducción |
|--------|------------|
| ES | ¿Te gusta Cobrex? |
| EN | Enjoying Cobrex? |
| PT | Gostando do Cobrex? |
| FR | Vous aimez Cobrex? |
| IT | Ti piace Cobrex? |
| ZH | 喜欢 Cobrex 吗？ |
| HI | क्या आप Cobrex का आनंद ले रहे हैं? |
| AR | هل تستمتع بـ Cobrex؟ |

### Clave: `rating.subtitle`

| Idioma | Traducción |
|--------|------------|
| ES | Tu opinión nos ayuda a mejorar |
| EN | Your review helps us improve |
| PT | Sua avaliação nos ajuda a melhorar |
| FR | Votre avis nous aide à nous améliorer |
| IT | La tua opinione ci aiuta a migliorare |
| ZH | 您的评价帮助我们改进 |
| HI | आपकी समीक्षा हमें सुधार करने में मदद करती है |
| AR | مراجعتك تساعدنا على التحسين |

### Clave: `rating.cta`

| Idioma | Traducción |
|--------|------------|
| ES | Calificar ahora |
| EN | Rate now |
| PT | Avaliar agora |
| FR | Évaluer maintenant |
| IT | Valuta ora |
| ZH | 立即评分 |
| HI | अभी रेट करें |
| AR | قيّم الآن |

### Clave: `rating.dismiss`

| Idioma | Traducción |
|--------|------------|
| ES | Ahora no |
| EN | Not now |
| PT | Agora não |
| FR | Pas maintenant |
| IT | Non ora |
| ZH | 暂不 |
| HI | अभी नहीं |
| AR | ليس الآن |

---

## 1.h.6 — AI ANALYSIS — BLOQUEADO

Estado: BLOQUEADO esperando que Code defina la estructura de strings con condicionales.

Acuerdo BUILD39 v3: Code estructura primero → Escritorio traduce después.

Code debe proveer:
- Lista de claves con sus condicionales (ej: plan free vs PRO vs ELITE)
- Strings base en ES o EN para cada clave
- Una vez que Code envíe eso, Escritorio completa los 8 idiomas en este mismo archivo

---

## INSTRUCCIONES PARA CODE

1. **Cablear 1.h.9** — Tomar las 10 claves de signup.* y agregarlas a i18n.js en los 8 idiomas
2. **Cablear 1.h.7** — Tomar claves faq.* + rating.* y agregarlas a i18n.js en los 8 idiomas
3. **Reemplazar hardcoded** — En SignupScreen.js y PerfilScreen.js, reemplazar strings hardcodeados por `t('clave')`
4. **Limpiar debug** — Eliminar console.log de debug en LoginScreen.js
5. **1.h.6** — Enviar estructura de strings AI Analysis a Escritorio para completar traducciones

---

*Archivo generado por Escritorio — Build 39 v3*
