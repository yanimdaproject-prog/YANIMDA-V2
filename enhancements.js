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

  // FINAL EXPLORE EXPERIENCE — curated, high-resolution Commons photos.
  // We use external Commons files and link to the exact source/licence page;
  // no image is copied into the repository.
  const nlPhotoPlaces = [
    {
      title:{tr:'Amsterdam — kanallar & bisikletler',en:'Amsterdam — canals & bikes',ar:'أمستردام — القنوات والدراجات'},
      text:{tr:'Amsterdam’ın en ikonik görüntülerinden biri: kanal, köprü ve bisikletler.',en:'One of Amsterdam’s most iconic scenes: a canal, bridge and bikes.',ar:'من أشهر مشاهد أمستردام: قناة وجسر ودراجات.'},
      image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Amsterdam_-_Canal%2C_Bridge_and_Bike.jpg',
      source:'https://commons.wikimedia.org/wiki/File:Amsterdam_-_Canal,_Bridge_and_Bike.jpg',
      map:'https://www.google.com/maps/search/?api=1&query=Amsterdam+Netherlands',
      credit:'Sumit Surai — CC BY-SA 4.0'
    },
    {
      title:{tr:'Giethoorn',en:'Giethoorn',ar:'خيتورن'},
      text:{tr:'Kanallar, küçük köprüler ve sakin bir köy atmosferi.',en:'Canals, little bridges and a peaceful village atmosphere.',ar:'قنوات وجسور صغيرة وأجواء قرية هادئة.'},
      image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Giethoorn_canal.jpg',
      source:'https://commons.wikimedia.org/wiki/File:Giethoorn_canal.jpg',
      map:'https://www.google.com/maps/search/?api=1&query=Giethoorn+Netherlands',
      credit:'Wikimedia Commons — CC0'
    },
    {
      title:{tr:'De Hoge Veluwe',en:'De Hoge Veluwe',ar:'منتزه دي هوخه فيلوفه'},
      text:{tr:'Orman, kumlu yollar ve geniş Hollanda doğası.',en:'Woodland, sandy paths and wide-open Dutch nature.',ar:'غابات ومسارات رملية وطبيعة هولندية واسعة.'},
      image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/De_Hoge_Veluwe_landscape.jpg',
      source:'https://commons.wikimedia.org/wiki/File:De_Hoge_Veluwe_landscape.jpg',
      map:'https://www.google.com/maps/search/?api=1&query=De+Hoge+Veluwe+Netherlands',
      credit:'Deb Collins — CC BY 2.0'
    },
    {
      title:{tr:'Rotterdam — Erasmusbrug',en:'Rotterdam — Erasmus Bridge',ar:'روتردام — جسر إيراسموس'},
      text:{tr:'Modern şehir silüeti ve Nieuwe Maas manzarası.',en:'A modern skyline and the Nieuwe Maas river.',ar:'أفق مدينة حديث ونهر نيوي ماس.'},
      image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Erasmusbrug_in_Rotterdam.jpg',
      source:'https://commons.wikimedia.org/wiki/File:Erasmusbrug_in_Rotterdam.jpg',
      map:'https://www.google.com/maps/search/?api=1&query=Erasmusbrug+Rotterdam+Netherlands',
      credit:'Wikimedia Commons — see source licence'
    },
    {
      title:{tr:'Kinderdijk — yel değirmenleri',en:'Kinderdijk — windmills',ar:'كيندرديك — طواحين الهواء'},
      text:{tr:'Hollanda’nın en tanınan manzaralarından biri: tarihi yel değirmenleri.',en:'One of the Netherlands’ most iconic landscapes: historic windmills.',ar:'من أشهر مناظر هولندا: طواحين الهواء التاريخية.'},
      image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/KinderdijkWindmills.jpg',
      source:'https://commons.wikimedia.org/wiki/File:KinderdijkWindmills.jpg',
      map:'https://www.google.com/maps/search/?api=1&query=Kinderdijk+Netherlands',
      credit:'Willard84 — CC BY 3.0'
    }
  ];

  window.renderExplore = function(){
    const l = (typeof lang === 'function' ? lang() : 'tr') || 'tr';
    const safe = typeof esc === 'function' ? esc : (v => String(v));
    const t = {
      tr:{title:'Hollanda’yı keşfet',desc:'Güzel yerleri sadece listelemeyelim. Önce gör, sonra gitmek isteyip istemediğine karar ver.',photos:'Şimdi keşfet',open:'Haritada aç',source:'Fotoğraf & lisans',note:'Fotoğraflar Wikimedia Commons’taki yeniden kullanım koşulları kontrol edilerek seçildi.',location:'Konumuma göre keşfet',locationNote:'Konumunu kaydetmiyoruz. İzin verirsen yalnızca arama için kullanılır.'},
      en:{title:'Discover the Netherlands',desc:'See beautiful places first, then decide where you want to go.',photos:'Places worth seeing',open:'Open on map',source:'Photo & licence',note:'Photos are selected from Wikimedia Commons with their stated reuse terms.',location:'Discover near me',locationNote:'Your location is not stored. If allowed, it is used only for the search.'},
      ar:{title:'اكتشف هولندا',desc:'شاهد الأماكن الجميلة أولاً، ثم قرر أين تريد الذهاب.',photos:'أماكن تستحق الزيارة',open:'افتح على الخريطة',source:'الصورة والترخيص',note:'تم اختيار الصور من ويكيميديا كومنز مع مراعاة شروط إعادة الاستخدام.',location:'اكتشف بالقرب مني',locationNote:'لا نقوم بحفظ موقعك. يُستخدم فقط للبحث إذا سمحت بذلك.'}
    }[l] || null;

    const cards = nlPhotoPlaces.map((p,i)=>`<article class="nl-photo-card ${i===0?'featured':''}">
      <div class="nl-photo-media">
        <img src="${p.image}" alt="${safe(p.title[l]||p.title.tr)}" loading="${i<2?'eager':'lazy'}" referrerpolicy="no-referrer" onerror="this.closest('.nl-photo-card')?.classList.add('photo-load-error');">
        <div class="nl-photo-shade"></div><span class="place-number">0${i+1}</span>
        <span class="place-badge">🇳🇱 Netherlands</span>
      </div>
      <div class="nl-photo-body">
        <h3>${safe(p.title[l]||p.title.tr)}</h3><p>${safe(p.text[l]||p.text.tr)}</p>
        <div class="nl-photo-actions"><a class="primary photo-map" href="${p.map}" target="_blank" rel="noopener">${safe(t.open)} →</a><a class="photo-source" href="${p.source}" target="_blank" rel="noopener">${safe(t.source)}</a></div>
        <small class="photo-credit">${safe(p.credit)}</small>
      </div>
    </article>`).join('');

    screen.innerHTML = `<button class="back" onclick="show('home')">${safe(typeof tr==='function'?tr('back'):'← Back')}</button>
      <section class="explore-hero explore-hero-pro">
        <div class="explore-orb" aria-hidden="true">🧭</div><span class="eyebrow">YANIMDA · EXPLORE</span>
        <h1>${safe(t.title)}</h1><p>${safe(t.desc)}</p>
        <button class="primary" onclick="requestLocation()">📍 ${safe(t.location)}</button>
        <div class="explore-note">🔒 ${safe(t.locationNote)}</div>
      </section>
      <div class="section-head explore-section-head"><div><span class="eyebrow">${safe(t.photos)}</span><h2>${safe(t.photos)}</h2></div><span class="explore-count">${nlPhotoPlaces.length}</span></div>
      <div class="nl-photo-grid">${cards}</div>
      <div class="explore-note photo-license-note">${safe(t.note)}</div>`;
  };

  const photoCss = `
    .explore-hero-pro{position:relative;overflow:hidden;margin-top:12px;padding:25px 20px 22px;border-radius:26px;background:radial-gradient(circle at 85% 10%,rgba(255,107,61,.28),transparent 36%),linear-gradient(145deg,#0b1728,#12243b);border:1px solid rgba(255,255,255,.08);box-shadow:0 18px 45px rgba(0,0,0,.22)}
    .explore-orb{position:absolute;right:18px;top:15px;width:66px;height:66px;display:grid;place-items:center;border-radius:22px;background:rgba(255,255,255,.08);font-size:31px;animation:yanimdaFloat 4s ease-in-out infinite}
    .explore-section-head{align-items:end}.explore-section-head h2{margin:4px 0 0}.explore-count{min-width:38px;height:38px;border-radius:13px;display:grid;place-items:center;background:rgba(255,107,61,.13);color:#ff8c68;font-weight:900}
    .nl-photo-grid{display:grid;grid-template-columns:1fr;gap:16px}.nl-photo-card{overflow:hidden;border:1px solid rgba(255,255,255,.08);border-radius:24px;background:linear-gradient(180deg,#0d1b2d,#0b1727);box-shadow:0 14px 38px rgba(0,0,0,.22);transform:translateZ(0);transition:transform .25s ease,border-color .25s ease,box-shadow .25s ease}.nl-photo-card:hover{transform:translateY(-3px);border-color:rgba(255,107,61,.4);box-shadow:0 20px 50px rgba(0,0,0,.28)}
    .nl-photo-card.featured{border-color:rgba(255,107,61,.25)}.nl-photo-media{position:relative;height:235px;overflow:hidden;background:#14263d}.nl-photo-card.featured .nl-photo-media{height:280px}.nl-photo-card img{display:block;width:100%;height:100%;object-fit:cover;transition:transform 7s ease}.nl-photo-card:hover img{transform:scale(1.045)}.nl-photo-shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.02) 30%,rgba(0,0,0,.62) 100%);pointer-events:none}.place-number{position:absolute;left:15px;bottom:13px;font-size:12px;font-weight:900;color:#fff;opacity:.82}.place-badge{position:absolute;right:12px;top:12px;padding:7px 10px;border-radius:999px;background:rgba(7,17,31,.66);backdrop-filter:blur(10px);color:#fff;font-size:11px;font-weight:800}.nl-photo-body{padding:16px}.nl-photo-body h3{margin:0 0 6px;font-size:19px;letter-spacing:-.2px}.nl-photo-body p{margin:0 0 14px;color:var(--muted);line-height:1.55;font-size:13px}.nl-photo-actions{display:flex;align-items:center;gap:10px;flex-wrap:wrap}.photo-map{display:inline-flex;text-decoration:none!important;padding:10px 13px!important;font-size:13px!important}.photo-source{color:#aabbd0;font-size:12px;font-weight:800;text-decoration:none}.photo-credit{display:block;margin-top:11px;color:#6f8299;font-size:10px;line-height:1.4}.photo-license-note{margin-top:14px;margin-bottom:24px}.photo-load-error{background:linear-gradient(135deg,#18283d,#0b1727)}.photo-load-error img{opacity:.05}.photo-load-error:after{content:'Photo unavailable — source';display:block;padding:14px;color:#9fb0c4;font-size:12px}
    @keyframes yanimdaFloat{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-5px) rotate(2deg)}}
    @media(min-width:700px){.nl-photo-grid{grid-template-columns:1.15fr 1fr}.nl-photo-card.featured{grid-row:span 2}.nl-photo-card.featured .nl-photo-media{height:100%;min-height:420px}.nl-photo-card:not(.featured) .nl-photo-media{height:190px}}
    @media(max-width:420px){.nl-photo-media{height:205px}.nl-photo-card.featured .nl-photo-media{height:245px}.nl-photo-body{padding:14px}.explore-orb{width:55px;height:55px;font-size:25px}}
    @media(prefers-reduced-motion:reduce){.explore-orb,.nl-photo-card img{animation:none;transition:none}.nl-photo-card:hover{transform:none}}
  `;
  const photoStyle=document.createElement('style'); photoStyle.id='yanimda-explore-v3'; photoStyle.textContent=photoCss; document.head.appendChild(photoStyle);

  // Product-quality dashboard: a clear next step, a calm daily goal and a
  // lightweight XP layer. This borrows proven habit mechanics without cloning
  // another app's visual identity.
  function getXP(){return Number(localStorage.getItem('yanimda_xp')||0)}
  function setXP(n){localStorage.setItem('yanimda_xp',String(Math.max(0,n)))}
  function addXP(n){setXP(getXP()+n)}
  window.getXP=getXP;
  const originalMarkLearned = window.markLearned;
  if(originalMarkLearned && !window.__yanimdaMarkWrapped){
    window.markLearned=function(w){
      const before=learned().length; originalMarkLearned(w); if(learned().length>before) addXP(10);
    };
    window.__yanimdaMarkWrapped=true;
  }

  const baseHome=window.renderHome;
  window.renderHome=function(){
    baseHome();
    const l=lang(), safe=typeof esc==='function'?esc:(v=>String(v)), done=learned().length, total=lessons.reduce((n,x)=>n+x.words.length,0), pct=Math.min(100,Math.round(done/total*100));
    const daily=lessons[new Date().getDate()%lessons.length];
    const home=document.querySelector('#screen');
    const oldHero=home.querySelector('.hero');
    if(oldHero){oldHero.classList.add('yanimda-home-hero'); oldHero.insertAdjacentHTML('beforeend',`<div class="yanimda-daily-strip"><div><span>🎯</span><div><strong>${safe(l==='en'?'Today’s goal':l==='ar'?'هدف اليوم':'Bugünün hedefi')}</strong><small>${safe(l==='en'?'5 minutes of Dutch':l==='ar'?'5 دقائق هولندية':'5 dakika Hollandaca')}</small></div></div><b>${pct}%</b></div>`)}
    const q=home.querySelector('.quick');
    const section=[...home.querySelectorAll('.section-head')].find(x=>x.textContent.includes(tr('quick')));
    if(section){section.insertAdjacentHTML('beforebegin',`<section class="mission-card"><div class="mission-character" aria-hidden="true"><div class="m-ear e1"></div><div class="m-ear e2"></div><div class="m-face"><i></i><i></i><span></span></div></div><div class="mission-copy"><span class="eyebrow">YANIMDA</span><h3>${safe(l==='en'?'Your next little step':l==='ar'?'خطوتك الصغيرة التالية':'Bir sonraki küçük adımın')}</h3><p>${safe(daily.sub[l]||daily.sub.tr)}</p><button class="primary" onclick="showLesson('${daily.id}')">${safe(l==='en'?'Start 5-minute lesson →':l==='ar'?'ابدأ درس 5 دقائق ←':'5 dakikalık derse başla →')}</button></div></section>`)}
  };

  // A calmer, more structured lesson page: listen → understand → remember.
  const baseLesson=window.renderLesson;
  window.renderLesson=function(id){
    baseLesson(id);
    const l=lessons.find(x=>x.id===id)||lessons[0], safe=typeof esc==='function'?esc:(v=>String(v));
    const cards=document.querySelector('.detail-card');
    if(!cards)return;
    cards.insertAdjacentHTML('afterbegin',`<div class="lesson-road"><span class="active">1<br><small>${safe(lang()==='en'?'Listen':lang()==='ar'?'استمع':'Dinle')}</small></span><i></i><span>2<br><small>${safe(lang()==='en'?'Understand':lang()==='ar'?'افهم':'Anla')}</small></span><i></i><span>3<br><small>${safe(lang()==='en'?'Remember':lang()==='ar'?'تذكّر':'Hatırla')}</small></span></div>`);
    const quizBtn=[...document.querySelectorAll('#screen .primary')].find(b=>b.textContent.includes(tr('quiz')));
    if(quizBtn)quizBtn.textContent='🧠 '+(lang()==='en'?'Mini challenge →':lang()==='ar'?'تحدٍ صغير ←':'Mini meydan okuma →');
  };

  // Friendly child area: keep it playful, but make the character feel like a
  // guide rather than decoration.
  const baseKids=window.renderKids;
  window.renderKids=function(){
    baseKids();
    const l=lang(), safe=typeof esc==='function'?esc:(v=>String(v));
    const hero=document.querySelector('.kids-hero');
    if(hero && !hero.querySelector('.yanimda-kid-guide')){
      hero.insertAdjacentHTML('afterbegin',`<div class="yanimda-kid-guide" aria-hidden="true"><div class="guide-star">✦</div><div class="guide-face"><i></i><i></i><span></span></div><div class="guide-bubble">${safe(l==='en'?'Hi! Let’s learn!':l==='ar'?'مرحباً! هيا نتعلم!':'Merhaba! Hadi öğrenelim!')}</div></div>`);
    }
  };

  const productCss=`
    .yanimda-home-hero{position:relative}.yanimda-daily-strip{margin-top:14px;display:flex;justify-content:space-between;align-items:center;gap:12px;padding:11px 13px;border:1px solid rgba(255,255,255,.08);border-radius:16px;background:rgba(255,255,255,.045)}.yanimda-daily-strip>div{display:flex;align-items:center;gap:9px}.yanimda-daily-strip>div>span{font-size:20px}.yanimda-daily-strip strong,.yanimda-daily-strip small{display:block}.yanimda-daily-strip strong{font-size:12px}.yanimda-daily-strip small{margin-top:2px;color:var(--muted);font-size:11px}.yanimda-daily-strip>b{font-size:18px;color:#ff8c68}.mission-card{display:flex;align-items:center;gap:14px;margin:18px 0;padding:15px;border-radius:22px;border:1px solid rgba(255,107,61,.18);background:linear-gradient(135deg,rgba(255,107,61,.12),rgba(255,255,255,.035));box-shadow:0 14px 35px rgba(0,0,0,.16)}.mission-copy{min-width:0}.mission-copy h3{margin:4px 0 5px;font-size:18px}.mission-copy p{margin:0 0 11px;color:var(--muted);font-size:12px;line-height:1.45}.mission-copy .primary{font-size:12px;padding:9px 11px}.mission-character{flex:0 0 76px;height:76px;position:relative;border-radius:24px;background:linear-gradient(145deg,#ff8b67,#ffcf7b);box-shadow:inset 0 -8px 20px rgba(0,0,0,.08);animation:yanimdaFloat 4s ease-in-out infinite}.m-ear{position:absolute;top:-7px;width:24px;height:24px;border-radius:8px 15px 4px 15px;background:#ff8b67}.m-ear.e1{left:8px;transform:rotate(-20deg)}.m-ear.e2{right:8px;transform:rotate(20deg)}.m-face{position:absolute;inset:17px 13px 12px;border-radius:50%;background:#fff0df}.m-face i{position:absolute;top:16px;width:6px;height:8px;border-radius:50%;background:#182235}.m-face i:first-child{left:15px}.m-face i:nth-child(2){right:15px}.m-face span{position:absolute;left:50%;bottom:12px;width:17px;height:8px;border-bottom:3px solid #182235;border-radius:0 0 20px 20px;transform:translateX(-50%)}.lesson-road{display:flex;align-items:center;justify-content:center;gap:7px;margin:2px 0 18px;padding:8px 5px;border-radius:16px;background:rgba(255,255,255,.035)}.lesson-road span{min-width:42px;text-align:center;color:#8193a9;font-size:11px;font-weight:900;line-height:1.2}.lesson-road span.active{color:#ff8c68}.lesson-road span:first-child{display:block}.lesson-road small{font-size:9px}.lesson-road i{width:25px;height:1px;background:rgba(255,255,255,.12)}.yanimda-kid-guide{display:flex;align-items:center;justify-content:center;gap:12px;margin:-3px 0 13px;position:relative}.guide-face{position:relative;width:62px;height:62px;border-radius:22px;background:linear-gradient(145deg,#ffcf7b,#ff8b67);box-shadow:0 9px 25px rgba(0,0,0,.15);animation:yanimdaFloat 3.5s ease-in-out infinite}.guide-face i{position:absolute;top:24px;width:5px;height:7px;border-radius:50%;background:#182235}.guide-face i:first-child{left:17px}.guide-face i:nth-child(2){right:17px}.guide-face span{position:absolute;left:50%;bottom:14px;width:15px;height:7px;border-bottom:3px solid #182235;border-radius:0 0 20px 20px;transform:translateX(-50%)}.guide-star{color:#ffd34d;font-size:22px;animation:yanimdaSpark 2s ease-in-out infinite}.guide-bubble{padding:9px 12px;border-radius:15px;background:#fff;color:#172033;font-weight:800;font-size:12px;box-shadow:0 7px 20px rgba(0,0,0,.12);position:relative}.guide-bubble:before{content:'';position:absolute;left:-6px;top:22px;border:6px solid transparent;border-right-color:#fff;border-left:0}.kids-hero{overflow:hidden}.kids-card{transition:transform .2s ease}.kids-card:hover{transform:translateY(-3px)}@keyframes yanimdaSpark{0%,100%{transform:scale(1) rotate(0)}50%{transform:scale(1.12) rotate(8deg)}}
    @media(prefers-reduced-motion:reduce){.mission-character,.guide-face,.guide-star{animation:none}.kids-card{transition:none}}
  `;
  const productStyle=document.createElement('style'); productStyle.id='yanimda-product-v3'; productStyle.textContent=productCss; document.head.appendChild(productStyle);

  // Global-facing onboarding copy: interface language is chosen first; Dutch is
  // the learning target for this Netherlands release.
  const baseSetup=window.setup;
  window.setup=function(){
    document.documentElement.lang='en';document.documentElement.dir='ltr';
    screen.innerHTML=`<div class="setup-screen"><div class="setup-card setup-card-global"><span class="eyebrow">🧡 YANIMDA · Always by your side</span><h1>Choose your language</h1><p class="sub">This is the language YANIMDA will use to explain things to you. You can change it later.</p><div class="language-options"><button class="lang-btn" data-lang="en" onclick="pickLang('en')"><span>🇬🇧</span>English</button><button class="lang-btn" data-lang="tr" onclick="pickLang('tr')"><span>🇹🇷</span>Türkçe</button><button class="lang-btn" data-lang="ar" onclick="pickLang('ar')"><span>🇸🇦</span>العربية</button></div><div class="setup-learning-note"><strong>🇳🇱 Learning now: Nederlands</strong><small>More learning languages can be added as YANIMDA grows.</small></div><button id="continueBtn" class="primary" style="width:100%" onclick="finishSetup()" disabled>Continue →</button></div></div>`;
    bottomNav.innerHTML='';drawer.innerHTML='';
  };
  if(!lang()) setTimeout(()=>window.setup(),0);

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
