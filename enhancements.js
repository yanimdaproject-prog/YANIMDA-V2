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
      title:{tr:'Amsterdam kanalları',en:'Amsterdam canals',ar:'قنوات أمستردام'},
      text:{tr:'Kanallar, köprüler ve şehir yürüyüşleri.',en:'Canals, bridges and city walks.',ar:'قنوات وجسور ونزهات في المدينة.'},
      image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Amsterdam_canals.jpg',
      source:'https://commons.wikimedia.org/wiki/File:Amsterdam_canals.jpg',
      map:'https://www.google.com/maps/search/?api=1&query=Amsterdam+Netherlands'
    },
    {
      title:{tr:'Giethoorn',en:'Giethoorn',ar:'خيتورن'},
      text:{tr:'Su kanalları ve sakin köy havası.',en:'Canals and a peaceful village atmosphere.',ar:'قنوات مائية وأجواء قرية هادئة.'},
      image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Giethoorn_canal.jpg',
      source:'https://commons.wikimedia.org/wiki/File:Giethoorn_canal.jpg',
      map:'https://www.google.com/maps/search/?api=1&query=Giethoorn+Netherlands'
    },
    {
      title:{tr:'De Hoge Veluwe',en:'De Hoge Veluwe',ar:'منتزه دي هوخه فيلوفه'},
      text:{tr:'Doğa, orman ve uzun yürüyüşler.',en:'Nature, woodland and long walks.',ar:'الطبيعة والغابات والمشي لمسافات طويلة.'},
      image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/20161026_De_Pollen5_Hoge_Veluwe.jpg',
      source:'https://commons.wikimedia.org/wiki/File:20161026_De_Pollen5_Hoge_Veluwe.jpg',
      map:'https://www.google.com/maps/search/?api=1&query=Hoge+Veluwe+National+Park+Netherlands'
    },
    {
      title:{tr:'Rotterdam & Erasmusbrug',en:'Rotterdam & Erasmus Bridge',ar:'روتردام وجسر إيراسموس'},
      text:{tr:'Şehir manzarası ve Nieuwe Maas.',en:'City views and the Nieuwe Maas.',ar:'إطلالات المدينة ونهر نيوي ماس.'},
      image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Erasmus_Bridge_and_the_Nieuwe_Maas_River_in_Rotterdam.jpg',
      source:'https://commons.wikimedia.org/wiki/File:Erasmus_Bridge_and_the_Nieuwe_Maas_River_in_Rotterdam.jpg',
      map:'https://www.google.com/maps/search/?api=1&query=Erasmusbrug+Rotterdam+Netherlands'
    }
  ];

  window.renderExplore = function(){
    const l = (typeof lang === 'function' ? lang() : 'tr') || 'tr';
    const safe = typeof esc === 'function' ? esc : (v => String(v));
    const t = {
      tr:{title:'Hollanda’yı keşfet',desc:'Yaşadığın ülkeyi sadece haritada değil, fotoğraflarıyla da tanı.',photos:'Güzel yerler',open:'Haritada aç →',source:'Fotoğraf kaynağı',note:'Fotoğraflar Wikimedia Commons’tan, kullanım izinleriyle birlikte seçildi.'},
      en:{title:'Discover the Netherlands',desc:'Get to know the country you live in through real places and photos.',photos:'Beautiful places',open:'Open on map →',source:'Photo source',note:'Photos are selected from Wikimedia Commons with their stated reuse permissions.'},
      ar:{title:'اكتشف هولندا',desc:'تعرّف على البلد الذي تعيش فيه من خلال أماكن حقيقية وصور جميلة.',photos:'أماكن جميلة',open:'افتح على الخريطة ←',source:'مصدر الصورة',note:'تم اختيار الصور من ويكيميديا كومنز مع مراعاة شروط الاستخدام المذكورة.'}
    }[l];
    screen.innerHTML = `
      <button class="back" onclick="show('home')">${safe(typeof tr==='function'?tr('back'):'← Geri')}</button>
      <section class="explore-hero explore-hero-pro">
        <span class="eyebrow">🧭 YANIMDA</span>
        <h1>${safe(t.title)}</h1>
        <p>${safe(t.desc)}</p>
        <button class="primary" onclick="requestLocation()">📍 ${safe(typeof tr==='function'?tr('exploreLocation'):'Konumuma göre keşfet')}</button>
        <div class="explore-note">🔒 ${safe(typeof tr==='function'?tr('exploreNote'):'Konumunu kaydetmiyoruz; yalnızca arama için kullanıyoruz.')}</div>
      </section>
      <div class="section-head"><h2>${safe(t.photos)}</h2><span>🇳🇱</span></div>
      <div class="nl-photo-grid">
        ${nlPhotoPlaces.map(p=>`
          <article class="nl-photo-card">
            <img src="${p.image}" alt="${safe(p.title[l]||p.title.tr)}" loading="lazy" referrerpolicy="no-referrer" onerror="this.closest('.nl-photo-card')?.classList.add('photo-load-error');">
            <div class="nl-photo-body">
              <h3>${safe(p.title[l]||p.title.tr)}</h3>
              <p>${safe(p.text[l]||p.text.tr)}</p>
              <div class="nl-photo-actions">
                <a class="primary photo-map" href="${p.map}" target="_blank" rel="noopener">${safe(t.open)}</a>
                <a class="photo-source" href="${p.source}" target="_blank" rel="noopener">${safe(t.source)}</a>
              </div>
            </div>
          </article>`).join('')}
      </div>
      <div class="explore-note photo-license-note">${safe(t.note)}</div>
    `;
  };

  const photoCss = `
    .explore-hero-pro{margin-top:12px}
    .nl-photo-grid{display:grid;grid-template-columns:1fr;gap:14px}
    .nl-photo-card{overflow:hidden;border:1px solid var(--line);border-radius:22px;background:#0d1b2d;box-shadow:var(--shadow)}
    .nl-photo-card img{display:block;width:100%;height:190px;object-fit:cover;background:#14263d}
    .nl-photo-body{padding:15px}
    .nl-photo-body h3{margin:0 0 6px;font-size:19px}
    .nl-photo-body p{margin:0 0 13px;color:var(--muted);line-height:1.5;font-size:13px}
    .nl-photo-actions{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
    .photo-map{display:inline-flex;text-decoration:none!important;padding:10px 13px!important;font-size:13px!important}
    .photo-source{color:#aabbd0;font-size:12px;font-weight:750;text-decoration:none}
    .photo-license-note{margin-top:14px;margin-bottom:20px}.photo-load-error img{opacity:.15}.photo-load-error:after{content:'Fotoğraf yüklenemedi';display:block;padding:12px;color:#9fb0c4;font-size:12px}
    @media(min-width:700px){.nl-photo-grid{grid-template-columns:1fr 1fr}.nl-photo-card img{height:210px}}
    @media(max-width:420px){.nl-photo-card img{height:175px}.nl-photo-body{padding:14px}}
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
