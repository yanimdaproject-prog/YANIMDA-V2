/*
  YANIMDA V2 — Professional touch-up
  This layer keeps the existing app.js features and improves:
  - first-entry language selection
  - warm, human About page
  - everyday, human Dutch-learning introduction
  - compact iPhone/mobile layout
  - safer bottom navigation spacing
*/
(function(){
  'use strict';

  const ONBOARDING_KEY = 'yanimda_onboarding_v4_final';
  // Reset only older test onboarding markers so this release gets one clean language choice.
  try { ['yanimda_onboarding_v2','yanimda_onboarding_v3'].forEach(k=>localStorage.removeItem(k)); } catch(e) {}

  // The current V2 may already have an Arabic language saved from testing.
  // On this new version, show the language picker once so the first experience
  // is always intentional. After the user chooses, the selection is remembered.
  const needsFreshOnboarding = !localStorage.getItem(ONBOARDING_KEY);
  if (needsFreshOnboarding) {
    localStorage.removeItem('yanimda_lang');
    if (typeof setup === 'function') setup();
  }

  if (typeof finishSetup === 'function') {
    const originalFinishSetup = finishSetup;
    window.finishSetup = function(){
      originalFinishSetup();
      if (typeof lang === 'function' && lang()) {
        localStorage.setItem(ONBOARDING_KEY, '1');
      }
    };
  }

  const aboutCopy = {
    tr: {
      eyebrow: '🧡 İnsan için tasarlandı',
      title: 'Hakkımızda',
      quote: 'Nerede olursan ol, her zaman yanında.',
      introTitle: 'YANIMDA neden var?',
      intro: 'Yeni bir ülkede hayat kurarken bazen en küçük şey bile zor gelebilir. Bir kelimeyi anlamak, bir yere nasıl gideceğini bulmak, günlük bir konuşmayı takip etmek veya nereden bilgi alacağını bilmek… YANIMDA tam da bu anlarda yanında olmak için var.',
      human: 'Biz teknolojiyle insan arasına mesafe koymak istemiyoruz. Tam tersine, teknolojiyi günlük hayatı biraz daha kolaylaştıran, anlaşılır ve samimi bir yardımcıya dönüştürmek istiyoruz.',
      missionTitle: 'Biz ne yapmak istiyoruz?',
      mission: 'Hollandaca öğrenirken yalnız hissetme. Yeni bir yere giderken ne yapacağını bilememe. Günlük hayatta küçük bir konuda takılıp kalma. YANIMDA; öğrenmene, anlamana, keşfetmene ve kendi ayakların üzerinde daha rahat ilerlemene yardımcı olmak için geliştiriliyor.',
      principleTitle: 'Bizim yaklaşımımız',
      principle: 'Önce insan. Sonra teknoloji.',
      contactTitle: 'Bize ulaş',
      contactText: 'Bir fikrin, önerin, eleştirinin veya sadece söylemek istediğin bir şey varsa bize yazabilirsin. YANIMDA’yı birlikte daha iyi hale getirmek istiyoruz.',
      email: 'yanimda.project@gmail.com',
      jobsTitle: 'İş bölümü hakkında',
      jobs: 'Gerçek iş ilanlarını yalnızca izinli, güvenilir ve sürdürülebilir bir kaynaktan sağlayabildiğimiz zaman göstereceğiz. İnsanların karşısına doğrulanmamış ilan çıkarmak istemiyoruz.'
    },
    en: {
      eyebrow: '🧡 Built around people',
      title: 'About YANIMDA',
      quote: 'Wherever you are, YANIMDA is always with you.',
      introTitle: 'Why does YANIMDA exist?',
      intro: 'Starting a new life in a new country can make even small things feel difficult. Understanding a word, finding your way somewhere, following a simple conversation or knowing where to get reliable information — YANIMDA is being built for those moments.',
      human: 'We do not want technology to create distance between people. We want it to become a simple, clear and friendly helper that makes everyday life a little easier.',
      missionTitle: 'What are we trying to do?',
      mission: 'You should not feel alone while learning Dutch, unsure when you are going somewhere new, or stuck on a small everyday problem. YANIMDA is being built to help you learn, understand, explore and move forward with more confidence.',
      principleTitle: 'Our approach',
      principle: 'People first. Technology second.',
      contactTitle: 'Talk to us',
      contactText: 'Have an idea, suggestion, criticism or simply something you want to tell us? Write to us. We want to make YANIMDA better together.',
      email: 'yanimda.project@gmail.com',
      jobsTitle: 'About the jobs section',
      jobs: 'We will show real job listings only when we can provide them through a permitted, reliable and sustainable source. We do not want to put unverified listings in front of people.'
    },
    ar: {
      eyebrow: '🧡 صُمّم من أجل الإنسان',
      title: 'من نحن',
      quote: 'أينما كنت، YANIMDA دائماً بجانبك.',
      introTitle: 'لماذا يوجد YANIMDA؟',
      intro: 'عندما تبدأ حياة جديدة في بلد جديد، قد تبدو أبسط الأمور صعبة أحياناً. فهم كلمة، معرفة الطريق، متابعة محادثة يومية أو معرفة أين تحصل على معلومة موثوقة… YANIMDA موجود ليكون بجانبك في هذه اللحظات.',
      human: 'لا نريد أن تضع التكنولوجيا مسافة بين الناس. نريدها أن تكون مساعداً بسيطاً وواضحاً وودوداً يجعل الحياة اليومية أسهل قليلاً.',
      missionTitle: 'ماذا نريد أن نفعل؟',
      mission: 'لا نريدك أن تشعر بالوحدة أثناء تعلم الهولندية، أو بالحيرة عندما تذهب إلى مكان جديد، أو أن تتوقف بسبب مشكلة صغيرة في حياتك اليومية. نطوّر YANIMDA ليساعدك على التعلم والفهم والاكتشاف والتقدم بثقة أكبر.',
      principleTitle: 'نهجنا',
      principle: 'الإنسان أولاً. ثم التكنولوجيا.',
      contactTitle: 'تواصل معنا',
      contactText: 'إذا كانت لديك فكرة أو اقتراح أو ملاحظة أو حتى شيء تريد أن تخبرنا به، اكتب لنا. نريد أن نجعل YANIMDA أفضل معاً.',
      email: 'yanimda.project@gmail.com',
      jobsTitle: 'حول قسم الوظائف',
      jobs: 'سنُظهر إعلانات وظائف حقيقية فقط عندما نستطيع توفيرها من مصدر موثوق ومصرح ومستدام. لا نريد عرض إعلانات غير موثقة للناس.'
    }
  };

  const learnIntro = {
    tr: 'Burada sana kitap gibi konuşan Hollandaca değil, Hollanda’da günlük hayatta gerçekten duyacağın ve kullanacağın Hollandacayı öğretiyoruz. Kısa cümleler, doğal ifadeler ve bol tekrar. Amacımız ezberletmek değil; günlük hayatta rahatça kullanmanı sağlamak.',
    en: 'Here you learn Dutch the way you are likely to hear and use it in everyday life in the Netherlands — not stiff textbook language. Short sentences, natural expressions and lots of repetition. The goal is to help you use Dutch comfortably, not simply memorize it.',
    ar: 'هنا نتعلم الهولندية التي ستسمعها وتستخدمها فعلاً في الحياة اليومية في هولندا، وليس لغة الكتب الجامدة. جمل قصيرة وعبارات طبيعية وتكرار كثير. هدفنا أن تستخدم الهولندية براحة، وليس أن تحفظها فقط.'
  };

  const learnWarmTitle = {
    tr: 'Gerçek hayatta kullanacağın Hollandaca',
    en: 'Dutch you can use in real life',
    ar: 'هولندية ستستخدمها في الحياة اليومية'
  };

  window.renderAbout = function(){
    const l = (typeof lang === 'function' ? lang() : 'tr') || 'tr';
    const c = aboutCopy[l] || aboutCopy.tr;
    const safe = typeof esc === 'function' ? esc : (v => String(v));
    const safeA = typeof escA === 'function' ? escA : (v => String(v));
    screen.innerHTML = `
      <button class="back" onclick="show('home')">${safe((typeof tr==='function'?tr('back'):'← Geri'))}</button>
      <section class="about-hero about-hero-pro">
        <span class="eyebrow">${safe(c.eyebrow)}</span>
        <h1>${safe(c.title)}</h1>
        <p class="about-quote">“${safe(c.quote)}”</p>
      </section>

      <section class="about-card about-card-pro">
        <span class="about-label">01</span>
        <h2>${safe(c.introTitle)}</h2>
        <p>${safe(c.intro)}</p>
        <p>${safe(c.human)}</p>
      </section>

      <section class="about-card about-card-pro">
        <span class="about-label">02</span>
        <h2>${safe(c.missionTitle)}</h2>
        <p>${safe(c.mission)}</p>
      </section>

      <section class="about-principle-pro">
        <span>${safe(c.principleTitle)}</span>
        <strong>${safe(c.principle)}</strong>
      </section>

      <section class="about-card about-card-pro">
        <span class="about-label">03</span>
        <h2>💼 ${safe(c.jobsTitle)}</h2>
        <p>${safe(c.jobs)}</p>
      </section>

      <section class="about-contact about-contact-pro">
        <div class="contact-icon">✉️</div>
        <div>
          <h2>${safe(c.contactTitle)}</h2>
          <p>${safe(c.contactText)}</p>
          <a href="mailto:${safeA(c.email)}">${safe(c.email)}</a>
        </div>
      </section>

      <footer class="about-footer-pro">
        <strong>YANIMDA</strong>
        <span>${safe(c.quote)}</span>
      </footer>
    `;
  };

  window.renderLearn = function(){
    const l = (typeof lang === 'function' ? lang() : 'tr') || 'tr';
    const done = typeof learned === 'function' ? learned() : [];
    const daily = lessons[new Date().getDate() % lessons.length];
    const total = lessons.reduce((n,x)=>n+x.words.length,0);
    const pct = Math.min(100, Math.round(done.length/total*100));
    const safe = typeof esc === 'function' ? esc : (v => String(v));
    const back = typeof tr === 'function' ? tr('back') : '← Geri';
    const progress = typeof tr === 'function' ? tr('progress') : 'İlerleme';
    const streakText = typeof tr === 'function' ? tr('streak') : 'Günlük seri';
    const words = typeof tr === 'function' ? tr('words') : 'Öğrenilen';
    const dailyText = typeof tr === 'function' ? tr('daily') : 'Bugünün dersi';
    const allLessons = typeof tr === 'function' ? tr('allLessons') : 'Tüm dersler';
    const lessonCount = typeof tr === 'function' ? tr('lessonCount') : 'ders';
    const start = typeof tr === 'function' ? tr('start') : 'Başla';
    const review = typeof tr === 'function' ? tr('review') : 'Tekrar et';
    const reviewSub = typeof tr === 'function' ? tr('reviewSub') : 'Daha önce öğrendiklerini unutma.';
    const intro = learnIntro[l] || learnIntro.tr;
    const warmTitle = learnWarmTitle[l] || learnWarmTitle.tr;

    screen.innerHTML = `
      <button class="back" onclick="show('home')">${safe(back)}</button>
      <section class="learn-welcome">
        <span class="eyebrow">🇳🇱 YANIMDA</span>
        <h1>${safe(warmTitle)}</h1>
        <p>${safe(intro)}</p>
      </section>

      <div class="progress-card">
        <div class="progress-meta"><span>${safe(progress)}</span><strong>${pct}%</strong></div>
        <div class="progress-line"><span style="width:${pct}%"></span></div>
        <div class="progress-meta"><span>🔥 ${typeof streak==='function'?streak():0} ${safe(streakText)}</span><span>${done.length} ${safe(words)}</span></div>
      </div>

      <div class="section-head"><h2>${safe(dailyText)}</h2><span>${safe(daily.title[l])}</span></div>
      <button class="lesson-card lesson-card-feature" onclick="showLesson('${daily.id}')">
        <div class="top"><span class="pill">A1 · Nederlands</span><span>${daily.icon}</span></div>
        <h3>${safe(daily.title[l])}</h3>
        <p>${safe(daily.sub[l])}</p>
        <div class="count">${daily.words.length} ${safe(lessonCount)} · ${safe(start)} →</div>
      </button>

      <div class="section-head"><h2>${safe(allLessons)}</h2><span>${lessons.length} ${safe(lessonCount)}</span></div>
      <div class="lesson-grid">
        ${lessons.map(x=>`
          <button class="lesson-card" onclick="showLesson('${x.id}')">
            <div class="top"><span class="pill">A1</span><span>${x.icon}</span></div>
            <h3>${safe(x.title[l])}</h3>
            <p>${safe(x.sub[l])}</p>
            <div class="count">${x.words.length} ${safe(lessonCount)}</div>
          </button>`).join('')}
      </div>

      <div class="section-head"><h2>${safe(review)}</h2></div>
      <div class="review-card card">
        <h3>${safe(review)}</h3>
        <p>${safe(reviewSub)}</p>
        <button class="primary" style="margin-top:13px" onclick="showReview()">${safe(review)} →</button>
      </div>
    `;
  };

  // Professional mobile sizing. This is intentionally an override so the
  // existing design/features remain intact.
  const css = `
    .about-hero-pro{padding:18px 0 10px}
    .about-hero-pro h1{margin-bottom:10px}
    .about-quote{color:#ffc0ae;font-weight:750;font-size:17px;line-height:1.5;margin:0}
    .about-card-pro{position:relative}
    .about-label{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:9px;background:rgba(255,107,61,.12);color:#ffc0ae;font-size:11px;font-weight:850;margin-bottom:9px}
    .about-card-pro h2{margin:0 0 9px}
    .about-card-pro p{color:var(--muted);line-height:1.65;margin:0 0 12px}
    .about-card-pro p:last-child{margin-bottom:0}
    .about-principle-pro{margin-top:16px;padding:22px;border-radius:21px;background:linear-gradient(135deg,#132943,#0d1b2d);border:1px solid var(--line);box-shadow:var(--shadow)}
    .about-principle-pro span{display:block;color:#ffc0ae;font-size:12px;font-weight:800;margin-bottom:8px}
    .about-principle-pro strong{font-size:25px;line-height:1.18;letter-spacing:-.4px}
    .about-contact-pro{display:flex;align-items:flex-start;gap:14px;margin-top:16px;padding:18px;background:#0d1b2d;border:1px solid var(--line);border-radius:20px}
    .contact-icon{width:44px;height:44px;flex:0 0 44px;border-radius:13px;background:rgba(255,107,61,.12);display:grid;place-items:center;font-size:20px}
    .about-contact-pro h2{margin:0 0 6px;font-size:19px}
    .about-contact-pro p{margin:0 0 10px;color:var(--muted);line-height:1.5;font-size:13px}
    .about-contact-pro a{color:#ffc0ae;text-decoration:none;font-weight:800;overflow-wrap:anywhere}
    .about-footer-pro{padding:26px 0 8px;text-align:center;color:var(--muted)}
    .about-footer-pro strong{display:block;color:#fff;letter-spacing:.8px;font-size:15px}
    .about-footer-pro span{display:block;margin-top:5px;font-size:12px}
    .learn-welcome{margin:16px 0 18px;padding:20px;border-radius:22px;background:linear-gradient(135deg,#132943,#0d1b2d);border:1px solid var(--line);box-shadow:var(--shadow)}
    .learn-welcome h1{font-size:clamp(25px,6.4vw,38px);line-height:1.08;margin:10px 0 9px;letter-spacing:-.7px}
    .learn-welcome p{margin:0;color:var(--muted);line-height:1.62;font-size:14px}
    .lesson-card-feature{min-height:145px}
    @media (max-width:600px){
      #screen{padding:18px 15px calc(104px + env(safe-area-inset-bottom))}
      .topbar{min-height:70px;padding:11px 14px}
      .logo-mark{width:38px;height:38px;border-radius:12px;font-size:17px}
      .brand-copy strong{font-size:18px}
      .brand-copy small{font-size:10px}
      .menu-btn{width:42px;height:42px;border-radius:13px}
      .hero{padding:14px 0 8px}
      .hero h1{font-size:clamp(31px,9.5vw,43px);margin:8px 0 9px}
      .hero p{font-size:16px;line-height:1.5}
      .hero-card{margin-top:15px;border-radius:21px;padding:17px}
      .hero-card strong{font-size:17px}
      .hero-card p{font-size:14px;margin:7px 0 12px}
      .primary{padding:12px 14px;border-radius:13px;font-size:14px}
      .section-head{margin:23px 0 11px}
      .section-head h2{font-size:18px}
      .grid{gap:10px}
      .card{border-radius:17px;padding:14px}
      .feature-card{min-height:128px}
      .card h3{font-size:15px;margin:8px 0 4px}
      .card p{font-size:12px}
      .stats{gap:8px}
      .stat{padding:11px;border-radius:15px}
      .stat b{font-size:20px}
      .bottom-nav{min-height:70px;padding:5px 7px env(safe-area-inset-bottom)}
      .bottom-nav button{font-size:10px;border-radius:12px}
      .nav-icon{font-size:20px}
      .setup-screen{min-height:calc(100dvh - 90px);padding:14px 0 30px}
      .setup-card{border-radius:23px;padding:19px}
      .setup-card h1{font-size:30px}
      .language-options{gap:8px;margin:16px 0}
      .lang-btn{padding:13px 7px;border-radius:15px;font-size:13px}
      .lang-btn span{font-size:23px}
      .about-card-pro{padding:16px}
      .about-principle-pro{padding:18px}
      .about-principle-pro strong{font-size:22px}
      .about-contact-pro{padding:15px}
      .learn-welcome{padding:17px;border-radius:19px}
      .learn-welcome h1{font-size:28px}
      .learn-welcome p{font-size:13.5px}
    }
  `;
  const style=document.createElement('style');
  style.id='yanimda-professional-touchup';
  style.textContent=css;
  document.head.appendChild(style);

  // If the previous version had an old language stored but no onboarding
  // marker, make the language picker visible immediately.
  if (needsFreshOnboarding) {
    setTimeout(()=>{ if(typeof setup==='function') setup(); }, 0);
  }

  // Real Netherlands discovery photos. These are Wikimedia Commons files with
  // public-domain / CC0 status, kept as external sources so we do not copy
  // unlicensed images into the repository. Each card links back to its source.
  const nlPhotoPlaces = [
    {
      featured:true, tag:{tr:'Şehir',en:'City',ar:'مدينة'},
      title:{tr:'Amsterdam',en:'Amsterdam',ar:'أمستردام'},
      text:{tr:'Kanallar, köprüler ve şehrin kendine özgü ritmi.',en:'Canals, bridges and the city’s unmistakable rhythm.',ar:'قنوات وجسور وإيقاع المدينة المميز.'},
      image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Amsterdam_canals.jpg',
      source:'https://commons.wikimedia.org/wiki/File:Amsterdam_canals.jpg',
      map:'https://www.google.com/maps/search/?api=1&query=Amsterdam+Netherlands'
    },
    {
      tag:{tr:'Su & köy',en:'Water & village',ar:'الماء والقرية'},
      title:{tr:'Giethoorn',en:'Giethoorn',ar:'خيتورن'},
      text:{tr:'Kanalların arasında sakin bir gün geçirmek için.',en:'A peaceful day among canals and little bridges.',ar:'ليوم هادئ بين القنوات والجسور الصغيرة.'},
      image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Giethoorn_canal.jpg',
      source:'https://commons.wikimedia.org/wiki/File:Giethoorn_canal.jpg',
      map:'https://www.google.com/maps/search/?api=1&query=Giethoorn+Netherlands'
    },
    {
      tag:{tr:'Doğa',en:'Nature',ar:'طبيعة'},
      title:{tr:'De Hoge Veluwe',en:'De Hoge Veluwe',ar:'منتزه دي هوخه فيلوفه'},
      text:{tr:'Orman, açık alanlar ve uzun yürüyüşler.',en:'Woodland, open landscapes and long walks.',ar:'غابات ومساحات مفتوحة ونزهات طويلة.'},
      image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/20161026_De_Pollen5_Hoge_Veluwe.jpg',
      source:'https://commons.wikimedia.org/wiki/File:20161026_De_Pollen5_Hoge_Veluwe.jpg',
      map:'https://www.google.com/maps/search/?api=1&query=Hoge+Veluwe+National+Park+Netherlands'
    },
    {
      tag:{tr:'Şehir',en:'City',ar:'مدينة'},
      title:{tr:'Rotterdam',en:'Rotterdam',ar:'روتردام'},
      text:{tr:'Modern mimari, su manzarası ve Erasmusbrug.',en:'Modern architecture, river views and Erasmus Bridge.',ar:'عمارة حديثة وإطلالات على النهر وجسر إيراسموس.'},
      image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Erasmus_Bridge_and_the_Nieuwe_Maas_River_in_Rotterdam.jpg',
      source:'https://commons.wikimedia.org/wiki/File:Erasmus_Bridge_and_the_Nieuwe_Maas_River_in_Rotterdam.jpg',
      map:'https://www.google.com/maps/search/?api=1&query=Erasmusbrug+Rotterdam+Netherlands'
    },
    {
      tag:{tr:'Hollanda simgesi',en:'Dutch icon',ar:'رمز هولندي'},
      title:{tr:'Kinderdijk',en:'Kinderdijk',ar:'كيندرديك'},
      text:{tr:'Su yolları ve ünlü yel değirmenleri.',en:'Waterways and the Netherlands’ famous windmills.',ar:'ممرات مائية وطواحين الهواء الهولندية الشهيرة.'},
      image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Windmills_Kinderdijk,_Netherlands.jpg',
      source:'https://commons.wikimedia.org/wiki/File:Windmills_Kinderdijk,_Netherlands.jpg',
      map:'https://www.google.com/maps/search/?api=1&query=Kinderdijk+Netherlands'
    },
    {
      tag:{tr:'Deniz',en:'Seaside',ar:'البحر'},
      title:{tr:'Scheveningen',en:'Scheveningen',ar:'سخيفينينغن'},
      text:{tr:'Kuzey Denizi kıyısında yürüyüş ve gün batımı.',en:'A North Sea walk, beach and sunset.',ar:'نزهة على بحر الشمال وشاطئ وغروب الشمس.'},
      image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Scheveningen_beach.jpg',
      source:'https://commons.wikimedia.org/wiki/File:Scheveningen_beach.jpg',
      map:'https://www.google.com/maps/search/?api=1&query=Scheveningen+The+Hague+Netherlands'
    }
  ];

  window.renderExplore = function(){
    const l = (typeof lang === 'function' ? lang() : 'tr') || 'tr';
    const safe = typeof esc === 'function' ? esc : (v => String(v));
    const t = {
      tr:{title:'Hollanda’yı birlikte keşfedelim',desc:'Yaşadığın ülkeyi tanı. Güzel yerleri gör, planını yap ve gitmek istediğin yeri haritada aç.',featured:'Bugün keşfet',places:'Daha fazla yer',open:'Haritada aç',source:'Fotoğraf kaynağı',location:'Yakınımdaki yerleri bul',note:'Fotoğraflar, kullanım koşulları belirtilmiş Wikimedia Commons kaynaklarından seçildi.'},
      en:{title:'Let’s explore the Netherlands',desc:'Discover the country around you. Find beautiful places, make a plan and open them on the map.',featured:'Featured today',places:'More places',open:'Open on map',source:'Photo source',location:'Find places near me',note:'Photos are selected from Wikimedia Commons with their stated reuse permissions.'},
      ar:{title:'لنكتشف هولندا معاً',desc:'تعرّف على البلد من حولك. شاهد أماكن جميلة، خطط لرحلتك وافتح المكان على الخريطة.',featured:'اكتشف اليوم',places:'أماكن أخرى',open:'افتح على الخريطة',source:'مصدر الصورة',location:'ابحث عن أماكن قريبة',note:'تم اختيار الصور من ويكيميديا كومنز مع مراعاة شروط الاستخدام المذكورة.'}
    }[l];

    const featured=nlPhotoPlaces[0];
    const others=nlPhotoPlaces.slice(1);

    screen.innerHTML = `
      <button class="back" onclick="show('home')">${safe(typeof tr==='function'?tr('back'):'← Geri')}</button>

      <section class="explore-hero-v3">
        <div class="explore-kicker">🧭 YANIMDA · NEDERLAND</div>
        <h1>${safe(t.title)}</h1>
        <p>${safe(t.desc)}</p>
        <div class="explore-actions">
          <button class="primary" onclick="requestLocation()">📍 ${safe(t.location)}</button>
        </div>
        <div class="explore-trust">🔒 ${safe(typeof tr==='function'?tr('exploreNote'):'Konumunu kaydetmiyoruz; yalnızca arama için kullanıyoruz.')}</div>
      </section>

      <div class="section-head explore-section-head"><h2>${safe(t.featured)}</h2><span>01</span></div>

      <article class="explore-featured">
        <img src="${featured.image}" alt="${safe(featured.title[l]||featured.title.tr)}" loading="eager" decoding="async" referrerpolicy="no-referrer"
             onerror="this.closest('.explore-featured')?.classList.add('photo-load-error');">
        <div class="explore-featured-overlay"></div>
        <div class="explore-featured-content">
          <span class="explore-tag">${safe(featured.tag[l]||featured.tag.tr)}</span>
          <h2>${safe(featured.title[l]||featured.title.tr)}</h2>
          <p>${safe(featured.text[l]||featured.text.tr)}</p>
          <div class="explore-card-actions">
            <a class="explore-primary" href="${featured.map}" target="_blank" rel="noopener">📍 ${safe(t.open)}</a>
            <a class="explore-source-light" href="${featured.source}" target="_blank" rel="noopener">${safe(t.source)}</a>
          </div>
        </div>
      </article>

      <div class="section-head explore-section-head"><h2>${safe(t.places)}</h2><span>05</span></div>

      <div class="explore-place-grid">
        ${others.map((p,i)=>`
          <article class="explore-place-card">
            <div class="explore-place-image">
              <img src="${p.image}" alt="${safe(p.title[l]||p.title.tr)}" loading="lazy" decoding="async" referrerpolicy="no-referrer"
                   onerror="this.closest('.explore-place-card')?.classList.add('photo-load-error');">
              <span class="explore-tag">${safe(p.tag[l]||p.tag.tr)}</span>
            </div>
            <div class="explore-place-body">
              <h3>${safe(p.title[l]||p.title.tr)}</h3>
              <p>${safe(p.text[l]||p.text.tr)}</p>
              <div class="explore-place-bottom">
                <a href="${p.map}" target="_blank" rel="noopener">📍 ${safe(t.open)}</a>
                <a class="explore-source" href="${p.source}" target="_blank" rel="noopener">${safe(t.source)}</a>
              </div>
            </div>
          </article>`).join('')}
      </div>

      <div class="explore-license">${safe(t.note)}</div>
    `;
  };

  const photoCss = `
    .explore-hero-v3{position:relative;margin:10px 0 20px;padding:23px 20px;border:1px solid rgba(255,255,255,.07);border-radius:26px;overflow:hidden;background:radial-gradient(circle at 90% 0%,rgba(255,107,61,.18),transparent 38%),linear-gradient(145deg,#142943,#0b1727);box-shadow:0 18px 50px rgba(0,0,0,.22)}
    .explore-hero-v3:after{content:'';position:absolute;right:-70px;bottom:-100px;width:220px;height:220px;border-radius:50%;background:rgba(255,107,61,.08);filter:blur(4px)}
    .explore-kicker{position:relative;z-index:1;color:#ffb49e;font-size:11px;font-weight:850;letter-spacing:.08em;text-transform:uppercase}
    .explore-hero-v3 h1{position:relative;z-index:1;margin:10px 0 9px;font-size:clamp(28px,7vw,40px);line-height:1.05;letter-spacing:-.9px}
    .explore-hero-v3 p{position:relative;z-index:1;margin:0;max-width:620px;color:#b9c7d7;font-size:14px;line-height:1.62}
    .explore-actions{position:relative;z-index:1;margin-top:16px}
    .explore-trust{position:relative;z-index:1;margin-top:10px;color:#7f91a7;font-size:11px;line-height:1.45}
    .explore-section-head{margin-top:22px}
    .explore-featured{position:relative;min-height:365px;border-radius:26px;overflow:hidden;background:#13243a;border:1px solid rgba(255,255,255,.08);box-shadow:0 20px 55px rgba(0,0,0,.28)}
    .explore-featured>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transform:scale(1.03);animation:yanExploreKenBurns 13s ease-in-out infinite alternate}
    .explore-featured-overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(4,10,18,.04) 15%,rgba(4,10,18,.2) 38%,rgba(4,10,18,.9) 100%),linear-gradient(90deg,rgba(4,10,18,.3),transparent 60%)}
    .explore-featured-content{position:absolute;left:0;right:0;bottom:0;padding:23px 20px 20px}
    .explore-tag{display:inline-flex;padding:6px 9px;border-radius:999px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.16);backdrop-filter:blur(8px);color:#fff;font-size:10px;font-weight:850;letter-spacing:.02em}
    .explore-featured h2{margin:11px 0 5px;font-size:31px;line-height:1;letter-spacing:-.7px}
    .explore-featured p{margin:0 0 14px;color:#e6edf5;line-height:1.45;font-size:13px;max-width:480px}
    .explore-card-actions{display:flex;align-items:center;gap:13px;flex-wrap:wrap}
    .explore-primary{display:inline-flex;align-items:center;padding:10px 13px;border-radius:13px;background:#ff6b3d;color:#fff;text-decoration:none;font-size:12px;font-weight:850;box-shadow:0 8px 20px rgba(255,107,61,.2)}
    .explore-source-light{color:#d7e0ea;text-decoration:none;font-size:11px;font-weight:750}
    .explore-place-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:11px}
    .explore-place-card{overflow:hidden;border:1px solid rgba(255,255,255,.07);border-radius:20px;background:#0d1b2d;box-shadow:0 12px 30px rgba(0,0,0,.16);transition:transform .22s ease,border-color .22s ease}
    .explore-place-card:active{transform:scale(.985)}
    .explore-place-image{position:relative;height:155px;overflow:hidden;background:#14263d}
    .explore-place-image img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .45s ease}
    .explore-place-card:hover .explore-place-image img{transform:scale(1.055)}
    .explore-place-image .explore-tag{position:absolute;left:10px;top:10px}
    .explore-place-body{padding:13px}
    .explore-place-body h3{margin:0 0 5px;font-size:17px;line-height:1.12}
    .explore-place-body p{margin:0 0 12px;color:#91a3b8;font-size:12px;line-height:1.45;min-height:35px}
    .explore-place-bottom{display:flex;align-items:center;justify-content:space-between;gap:7px}
    .explore-place-bottom>a:first-child{color:#ffb49e;text-decoration:none;font-size:11px;font-weight:850}
    .explore-source{color:#72859c;text-decoration:none;font-size:10px;font-weight:700}
    .explore-license{margin:15px 2px 20px;padding:12px 13px;border-radius:14px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.055);color:#74869c;font-size:10px;line-height:1.5}
    .photo-load-error{background:linear-gradient(135deg,#132943,#0d1b2d)}
    .photo-load-error img{opacity:.08}
    @keyframes yanExploreKenBurns{from{transform:scale(1.03)}to{transform:scale(1.09)}}
    @media(max-width:420px){.explore-featured{min-height:340px}.explore-featured-content{padding:20px 16px 17px}.explore-featured h2{font-size:28px}.explore-place-image{height:140px}.explore-place-body{padding:11px}.explore-place-body h3{font-size:15px}.explore-place-body p{font-size:11px}.explore-source{display:none}}
    @media(min-width:700px){.explore-featured{min-height:430px}.explore-place-image{height:190px}}
    @media(prefers-reduced-motion:reduce){.explore-featured>img,.explore-place-image img{animation:none;transition:none}}
  `;
  const photoStyle=document.createElement('style'); photoStyle.textContent=photoCss; document.head.appendChild(photoStyle);

  // FINAL VOICE LAYER: use a Dutch nl-NL voice when available, wait for iOS/Safari
  // voices to load, and keep adult/kids delivery deliberately clear and gentle.
  function speakFinal(text, profile){
    if(!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance==='undefined'){
      if(typeof toast==='function') toast((typeof tr==='function'?tr('noSpeech'):'Speech playback is not available.'));
      return;
    }
    const synth=window.speechSynthesis;
    synth.cancel();
    let started=false;
    const start=()=>{
      if(started) return;
      started=true;
      try{ synth.removeEventListener('voiceschanged',start); }catch(e){}
      const u=new SpeechSynthesisUtterance(String(text));
      u.lang='nl-NL';
      u.rate=profile.rate;
      u.pitch=profile.pitch;
      u.volume=profile.volume;
      const voices=synth.getVoices ? synth.getVoices() : [];
      u.voice=voices.find(v=>(v.lang||'').toLowerCase()==='nl-nl') ||
               voices.find(v=>(v.lang||'').toLowerCase().startsWith('nl')) || null;
      try{ synth.resume(); synth.speak(u); }
      catch(e){ if(typeof toast==='function') toast((typeof tr==='function'?tr('noSpeech'):'Speech playback is not available.')); }
    };
    const voices=synth.getVoices ? synth.getVoices() : [];
    if(voices.length) start();
    else {
      try{ synth.addEventListener('voiceschanged',start,{once:true}); }catch(e){}
      setTimeout(start,800);
    }
  }
  window.speak=function(text){ speakFinal(text,{rate:0.74,pitch:1.0,volume:1}); };
  window.speakKids=function(text){ speakFinal(text,{rate:0.66,pitch:1.08,volume:0.95}); };

  // FINAL FIRST-ENTRY RULE: this release gets its own onboarding version.
  // Existing test data cannot silently force Arabic (or another language) on first launch.
  try{
    if(!localStorage.getItem(ONBOARDING_KEY)){
      localStorage.removeItem('yanimda_lang');
      if(typeof setup==='function') setTimeout(()=>setup(),0);
    }
  }catch(e){}

})();
