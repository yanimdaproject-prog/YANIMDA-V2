/*
  YANIMDA V2 — Final professional touch-up
  Keeps the existing app.js features and adds:
  - one-time first-entry language choice for this release
  - warm, human About page
  - friendly everyday Dutch-learning introduction
  - polished mobile sizing and bottom navigation spacing
  - Netherlands place gallery using clearly licensed Wikimedia Commons images
  - clearer Dutch speech for adults and a softer/slower profile for kids
*/
(function(){
  'use strict';

  const ONBOARDING_KEY = 'yanimda_onboarding_v3';

  // This release gets a fresh first-entry experience even if an older build
  // already saved Arabic (or another language) during testing.
  const needsFreshOnboarding = !localStorage.getItem(ONBOARDING_KEY);
  if (needsFreshOnboarding) {
    localStorage.removeItem('yanimda_lang');
    if (typeof setup === 'function') setup();
  }

  if (typeof finishSetup === 'function') {
    const originalFinishSetup = finishSetup;
    window.finishSetup = function(){
      originalFinishSetup();
      if (typeof lang === 'function' && lang()) localStorage.setItem(ONBOARDING_KEY, '1');
    };
  }

  const aboutCopy = {
    tr: {
      eyebrow:'🧡 İnsan için tasarlandı', title:'Hakkımızda', quote:'Nerede olursan ol, her zaman yanında.',
      introTitle:'YANIMDA neden var?',
      intro:'Yeni bir ülkede hayat kurarken bazen en küçük şey bile zor gelebilir. Bir kelimeyi anlamak, bir yere nasıl gideceğini bulmak, günlük bir konuşmayı takip etmek veya nereden bilgi alacağını bilmek… YANIMDA tam da bu anlarda yanında olmak için var.',
      human:'Biz teknolojiyle insan arasına mesafe koymak istemiyoruz. Tam tersine, teknolojiyi günlük hayatı biraz daha kolaylaştıran, anlaşılır ve samimi bir yardımcıya dönüştürmek istiyoruz.',
      missionTitle:'Biz ne yapmak istiyoruz?',
      mission:'Hollandaca öğrenirken yalnız hissetme. Yeni bir yere giderken ne yapacağını bilememe. Günlük hayatta küçük bir konuda takılıp kalma. YANIMDA; öğrenmene, anlamana, keşfetmene ve kendi ayakların üzerinde daha rahat ilerlemene yardımcı olmak için geliştiriliyor.',
      principleTitle:'Bizim yaklaşımımız', principle:'Önce insan. Sonra teknoloji.',
      contactTitle:'Bize ulaş', contactText:'Bir fikrin, önerin, eleştirinin veya sadece söylemek istediğin bir şey varsa bize yazabilirsin. YANIMDA’yı birlikte daha iyi hale getirmek istiyoruz.', email:'yanimda.project@gmail.com',
      jobsTitle:'İş bölümü hakkında', jobs:'Gerçek iş ilanlarını yalnızca izinli, güvenilir ve sürdürülebilir bir kaynaktan sağlayabildiğimiz zaman göstereceğiz. İnsanların karşısına doğrulanmamış ilan çıkarmak istemiyoruz.'
    },
    en: {
      eyebrow:'🧡 Built around people', title:'About YANIMDA', quote:'Wherever you are, YANIMDA is always with you.',
      introTitle:'Why does YANIMDA exist?',
      intro:'Starting a new life in a new country can make even small things feel difficult. Understanding a word, finding your way somewhere, following a simple conversation or knowing where to get reliable information — YANIMDA is being built for those moments.',
      human:'We do not want technology to create distance between people. We want it to become a simple, clear and friendly helper that makes everyday life a little easier.',
      missionTitle:'What are we trying to do?',
      mission:'You should not feel alone while learning Dutch, unsure when you are going somewhere new, or stuck on a small everyday problem. YANIMDA is being built to help you learn, understand, explore and move forward with more confidence.',
      principleTitle:'Our approach', principle:'People first. Technology second.',
      contactTitle:'Talk to us', contactText:'Have an idea, suggestion, criticism or simply something you want to tell us? Write to us. We want to make YANIMDA better together.', email:'yanimda.project@gmail.com',
      jobsTitle:'About the jobs section', jobs:'We will show real job listings only when we can provide them through a permitted, reliable and sustainable source. We do not want to put unverified listings in front of people.'
    },
    ar: {
      eyebrow:'🧡 صُمّم من أجل الإنسان', title:'من نحن', quote:'أينما كنت، YANIMDA دائماً بجانبك.',
      introTitle:'لماذا يوجد YANIMDA؟',
      intro:'عندما تبدأ حياة جديدة في بلد جديد، قد تبدو أبسط الأمور صعبة أحياناً. فهم كلمة، معرفة الطريق، متابعة محادثة يومية أو معرفة أين تحصل على معلومة موثوقة… YANIMDA موجود ليكون بجانبك في هذه اللحظات.',
      human:'لا نريد أن تضع التكنولوجيا مسافة بين الناس. نريدها أن تكون مساعداً بسيطاً وواضحاً وودوداً يجعل الحياة اليومية أسهل قليلاً.',
      missionTitle:'ماذا نريد أن نفعل؟',
      mission:'لا نريدك أن تشعر بالوحدة أثناء تعلم الهولندية، أو بالحيرة عندما تذهب إلى مكان جديد، أو أن تتوقف بسبب مشكلة صغيرة في حياتك اليومية. نطوّر YANIMDA ليساعدك على التعلم والفهم والاكتشاف والتقدم بثقة أكبر.',
      principleTitle:'نهجنا', principle:'الإنسان أولاً. ثم التكنولوجيا.',
      contactTitle:'تواصل معنا', contactText:'إذا كانت لديك فكرة أو اقتراح أو ملاحظة أو حتى شيء تريد أن تخبرنا به، اكتب لنا. نريد أن نجعل YANIMDA أفضل معاً.', email:'yanimda.project@gmail.com',
      jobsTitle:'حول قسم الوظائف', jobs:'سنُظهر إعلانات وظائف حقيقية فقط عندما نستطيع توفيرها من مصدر موثوق ومصرح ومستدام. لا نريد عرض إعلانات غير موثقة للناس.'
    }
  };

  const learnIntro = {
    tr:'Burada sana kitap gibi konuşan Hollandaca değil, Hollanda’da günlük hayatta gerçekten duyacağın ve kullanacağın Hollandacayı öğretiyoruz. Kısa cümleler, doğal ifadeler ve bol tekrar. Amacımız ezberletmek değil; günlük hayatta rahatça kullanmanı sağlamak.',
    en:'Here you learn Dutch the way you are likely to hear and use it in everyday life in the Netherlands — not stiff textbook language. Short sentences, natural expressions and lots of repetition. The goal is to help you use Dutch comfortably, not simply memorize it.',
    ar:'هنا نتعلم الهولندية التي ستسمعها وتستخدمها فعلاً في الحياة اليومية في هولندا، وليس لغة الكتب الجامدة. جمل قصيرة وعبارات طبيعية وتكرار كثير. هدفنا أن تستخدم الهولندية براحة، وليس أن تحفظها فقط.'
  };
  const learnWarmTitle = {tr:'Gerçek hayatta kullanacağın Hollandaca',en:'Dutch you can use in real life',ar:'هولندية ستستخدمها في الحياة اليومية'};

  const placesGallery = [
    {id:'amsterdam', title:{tr:'Amsterdam kanalları',en:'Amsterdam canals',ar:'قنوات أمستردام'}, text:{tr:'Kanallar, köprüler ve şehir hayatı.',en:'Canals, bridges and city life.',ar:'القنوات والجسور وحياة المدينة.'}, query:'Amsterdam canals', image:'https://upload.wikimedia.org/wikipedia/commons/1/1e/Amsterdam_canals.jpg', credit:'Bachrach44 — Wikimedia Commons — Public domain', source:'https://commons.wikimedia.org/wiki/File:Amsterdam_canals.jpg'},
    {id:'giethoorn', title:{tr:'Giethoorn',en:'Giethoorn',ar:'خيتهورن'}, text:{tr:'Su yolları, köprüler ve sakin köy havası.',en:'Waterways, bridges and a peaceful village atmosphere.',ar:'الممرات المائية والجسور وأجواء القرية الهادئة.'}, query:'Giethoorn Netherlands', image:'https://upload.wikimedia.org/wikipedia/commons/e/e7/Giethoorn%2C_Netherlands.jpg', credit:'Cbliu — Wikimedia Commons — CC BY-SA 4.0', source:'https://commons.wikimedia.org/wiki/File:Giethoorn,_Netherlands.jpg'},
    {id:'kinderdijk', title:{tr:'Kinderdijk',en:'Kinderdijk',ar:'كيندردايك'}, text:{tr:'Hollanda’nın simge yel değirmenleri.',en:'The Netherlands’ iconic windmills.',ar:'طواحين الهواء الشهيرة في هولندا.'}, query:'Kinderdijk windmills', image:'https://upload.wikimedia.org/wikipedia/commons/6/6a/Kinderdijk_windmills_v6.jpg', credit:'Rudolphous — Wikimedia Commons — CC BY-SA 4.0', source:'https://commons.wikimedia.org/wiki/File:Kinderdijk_windmills_v6.jpg'},
    {id:'hogeveluwe', title:{tr:'De Hoge Veluwe',en:'De Hoge Veluwe',ar:'منتزه دي هوخه فيلوفه'}, text:{tr:'Doğa, orman ve geniş açık manzaralar.',en:'Nature, woodland and wide open landscapes.',ar:'الطبيعة والغابات والمناظر المفتوحة.'}, query:'Hoge Veluwe National Park', image:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Hoge_Veluwe.JPG/1200px-Hoge_Veluwe.JPG', credit:'Simon Péter — Wikimedia Commons — CC BY-SA', source:'https://commons.wikimedia.org/wiki/File:Hoge_Veluwe.JPG'}
  ];

  function currentLang(){return (typeof lang==='function' && lang()) || 'tr'}
  function safe(v){return typeof esc==='function'?esc(v):String(v)}
  function safeA(v){return typeof escA==='function'?escA(v):String(v).replace(/['"\\]/g,'\\$&')}

  window.renderAbout = function(){
    const l=currentLang(), c=aboutCopy[l]||aboutCopy.tr;
    screen.innerHTML=`
      <button class="back" onclick="show('home')">${safe(typeof tr==='function'?tr('back'):'← Geri')}</button>
      <section class="about-hero about-hero-pro"><span class="eyebrow">${safe(c.eyebrow)}</span><h1>${safe(c.title)}</h1><p class="about-quote">“${safe(c.quote)}”</p></section>
      <section class="about-card about-card-pro"><span class="about-label">01</span><h2>${safe(c.introTitle)}</h2><p>${safe(c.intro)}</p><p>${safe(c.human)}</p></section>
      <section class="about-card about-card-pro"><span class="about-label">02</span><h2>${safe(c.missionTitle)}</h2><p>${safe(c.mission)}</p></section>
      <section class="about-principle-pro"><span>${safe(c.principleTitle)}</span><strong>${safe(c.principle)}</strong></section>
      <section class="about-card about-card-pro"><span class="about-label">03</span><h2>💼 ${safe(c.jobsTitle)}</h2><p>${safe(c.jobs)}</p></section>
      <section class="about-contact about-contact-pro"><div class="contact-icon">✉️</div><div><h2>${safe(c.contactTitle)}</h2><p>${safe(c.contactText)}</p><a href="mailto:${safeA(c.email)}">${safe(c.email)}</a></div></section>
      <footer class="about-footer-pro"><strong>YANIMDA</strong><span>${safe(c.quote)}</span></footer>`;
  };

  window.renderLearn = function(){
    const l=currentLang(), done=typeof learned==='function'?learned():[], daily=lessons[new Date().getDate()%lessons.length];
    const total=lessons.reduce((n,x)=>n+x.words.length,0), pct=Math.min(100,Math.round(done.length/total*100));
    const t=k=>typeof tr==='function'?tr(k):k, intro=learnIntro[l]||learnIntro.tr, warm=learnWarmTitle[l]||learnWarmTitle.tr;
    screen.innerHTML=`
      <button class="back" onclick="show('home')">${safe(t('back'))}</button>
      <section class="learn-welcome"><span class="eyebrow">🇳🇱 YANIMDA</span><h1>${safe(warm)}</h1><p>${safe(intro)}</p></section>
      <div class="progress-card"><div class="progress-meta"><span>${safe(t('progress'))}</span><strong>${pct}%</strong></div><div class="progress-line"><span style="width:${pct}%"></span></div><div class="progress-meta"><span>🔥 ${typeof streak==='function'?streak():0} ${safe(t('streak'))}</span><span>${done.length} ${safe(t('words'))}</span></div></div>
      <div class="section-head"><h2>${safe(t('daily'))}</h2><span>${safe(daily.title[l])}</span></div>
      <button class="lesson-card lesson-card-feature" onclick="showLesson('${daily.id}')"><div class="top"><span class="pill">A1 · Nederlands</span><span>${daily.icon}</span></div><h3>${safe(daily.title[l])}</h3><p>${safe(daily.sub[l])}</p><div class="count">${daily.words.length} ${safe(t('lessonCount'))} · ${safe(t('start'))} →</div></button>
      <div class="section-head"><h2>${safe(t('allLessons'))}</h2><span>${lessons.length} ${safe(t('lessonCount'))}</span></div>
      <div class="lesson-grid">${lessons.map(x=>`<button class="lesson-card" onclick="showLesson('${x.id}')"><div class="top"><span class="pill">A1</span><span>${x.icon}</span></div><h3>${safe(x.title[l])}</h3><p>${safe(x.sub[l])}</p><div class="count">${x.words.length} ${safe(t('lessonCount'))}</div></button>`).join('')}</div>
      <div class="section-head"><h2>${safe(t('review'))}</h2></div><div class="review-card card"><h3>${safe(t('review'))}</h3><p>${safe(t('reviewSub'))}</p><button class="primary" style="margin-top:13px" onclick="showReview()">${safe(t('review'))} →</button></div>`;
  };

  window.renderExplore = function(){
    const l=currentLang(), t=k=>typeof tr==='function'?tr(k):k;
    const title=l==='ar'?'أماكن جميلة في هولندا':l==='en'?'Beautiful places in the Netherlands':'Hollanda’dan güzel yerler';
    const desc=l==='ar'?'صور حقيقية لأماكن يمكنك استكشافها. افتح المكان على الخريطة لمعرفة المزيد.':l==='en'?'Real images of places you can explore. Open a place on the map to learn more.':'Keşfedebileceğin yerlerden gerçek fotoğraflar. Daha fazlasını görmek için haritada aç.';
    const mapText=l==='ar'?'افتح على الخريطة':l==='en'?'Open on map':'Haritada aç';
    const creditText=l==='ar'?'Kaynak / lisans':'Kaynak / lisans';
    screen.innerHTML=`
      <button class="back" onclick="show('home')">${safe(t('back'))}</button>
      <section class="explore-hero"><span class="eyebrow">🧭 YANIMDA</span><h1>${safe(t('exploreTitle'))}</h1><p>${safe(t('exploreDesc'))}</p><button class="primary" onclick="requestLocation()">📍 ${safe(t('exploreLocation'))}</button><div class="explore-note">🔒 ${safe(t('exploreNote'))}</div></section>
      <div class="section-head"><h2>${safe(t('explore'))}</h2><span>${safe(t('search'))}</span></div>
      <div class="explore-grid">${explorePlaces.map(p=>`<button class="explore-card" onclick="openNearby('${safeA(p[1])}','${safeA(p[2])}')"><span class="explore-icon">${p[0]}</span><strong>${safe(t('exploreCategories')[p[1]])}</strong><small>${safe(t('search'))}</small></button>`).join('')}</div>
      <section class="places-gallery"><div class="gallery-heading"><span class="eyebrow">🇳🇱 YANIMDA</span><h2>${safe(title)}</h2><p>${safe(desc)}</p></div>
      <div class="places-gallery-grid">${placesGallery.map(p=>`<article class="place-photo-card"><img loading="lazy" src="${p.image}" alt="${safe(p.title[l])}" referrerpolicy="no-referrer"><div class="place-photo-body"><h3>${safe(p.title[l])}</h3><p>${safe(p.text[l])}</p><button class="ghost" onclick="openNearby('${safeA(p.id)}','${safeA(p.query)}')">📍 ${safe(mapText)}</button><a class="photo-credit" href="${p.source}" target="_blank" rel="noopener noreferrer">${safe(creditText)} · ${safe(p.credit)}</a></div></article>`).join('')}</div></section>
      <div class="explore-tip"><strong>💡 ${safe(t('explore'))}</strong><p>${safe(t('exploreDesc'))}</p></div>`;
  };

  // Speech: wait briefly for iOS/Safari voices to become available, choose a
  // Dutch voice when one exists, and use deliberately slower rates for clarity.
  function speakProfile(text, profile){
    if(!('speechSynthesis' in window)){toast((typeof tr==='function'?tr('noSpeech'):'Speech playback is not available.'));return}
    const synth=window.speechSynthesis; synth.cancel();
    let started=false;
    const start=()=>{
      if(started)return; started=true; synth.removeEventListener?.('voiceschanged',start);
      const u=new SpeechSynthesisUtterance(String(text));
      u.lang='nl-NL'; u.rate=profile.rate; u.pitch=profile.pitch; u.volume=profile.volume;
      const voices=synth.getVoices?.()||[];
      u.voice=voices.find(v=>v.lang?.toLowerCase()==='nl-nl') || voices.find(v=>v.lang?.toLowerCase().startsWith('nl')) || null;
      try{ synth.resume(); synth.speak(u); }catch(e){ toast((typeof tr==='function'?tr('noSpeech'):'Speech playback is not available.')); }
    };
    const voices=synth.getVoices?.()||[];
    if(voices.length) start(); else { synth.addEventListener?.('voiceschanged',start,{once:true}); setTimeout(start,650); }
  }
  window.speak=function(text){speakProfile(text,{rate:.76,pitch:1.0,volume:1});};
  window.speakKids=function(text){speakProfile(text,{rate:.69,pitch:1.10,volume:.92});};

  const css=`
    .about-hero-pro{padding:18px 0 10px}.about-hero-pro h1{margin-bottom:10px}.about-quote{color:#ffc0ae;font-weight:750;font-size:17px;line-height:1.5;margin:0}.about-card-pro{position:relative}.about-label{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:9px;background:rgba(255,107,61,.12);color:#ffc0ae;font-size:11px;font-weight:850;margin-bottom:9px}.about-card-pro h2{margin:0 0 9px}.about-card-pro p{color:var(--muted);line-height:1.65;margin:0 0 12px}.about-card-pro p:last-child{margin-bottom:0}.about-principle-pro{margin-top:16px;padding:22px;border-radius:21px;background:linear-gradient(135deg,#132943,#0d1b2d);border:1px solid var(--line);box-shadow:var(--shadow)}.about-principle-pro span{display:block;color:#ffc0ae;font-size:12px;font-weight:800;margin-bottom:8px}.about-principle-pro strong{font-size:25px;line-height:1.18;letter-spacing:-.4px}.about-contact-pro{display:flex;align-items:flex-start;gap:14px;margin-top:16px;padding:18px;background:#0d1b2d;border:1px solid var(--line);border-radius:20px}.contact-icon{width:44px;height:44px;flex:0 0 44px;border-radius:13px;background:rgba(255,107,61,.12);display:grid;place-items:center;font-size:20px}.about-contact-pro h2{margin:0 0 6px;font-size:19px}.about-contact-pro p{margin:0 0 10px;color:var(--muted);line-height:1.5;font-size:13px}.about-contact-pro a{color:#ffc0ae;text-decoration:none;font-weight:800;overflow-wrap:anywhere}.about-footer-pro{padding:26px 0 8px;text-align:center;color:var(--muted)}.about-footer-pro strong{display:block;color:#fff;letter-spacing:.8px;font-size:15px}.about-footer-pro span{display:block;margin-top:5px;font-size:12px}
    .learn-welcome{margin:16px 0 18px;padding:20px;border-radius:22px;background:linear-gradient(135deg,#132943,#0d1b2d);border:1px solid var(--line);box-shadow:var(--shadow)}.learn-welcome h1{font-size:clamp(25px,6.4vw,38px);line-height:1.08;margin:10px 0 9px;letter-spacing:-.7px}.learn-welcome p{margin:0;color:var(--muted);line-height:1.62;font-size:14px}.lesson-card-feature{min-height:145px}
    .places-gallery{margin-top:30px}.gallery-heading{margin-bottom:14px}.gallery-heading h2{font-size:23px;margin:7px 0}.gallery-heading p{margin:0;color:var(--muted);line-height:1.55;font-size:13px}.places-gallery-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:13px}.place-photo-card{overflow:hidden;background:#0d1b2d;border:1px solid var(--line);border-radius:20px;box-shadow:0 10px 35px rgba(0,0,0,.16)}.place-photo-card img{display:block;width:100%;height:190px;object-fit:cover;background:#122840}.place-photo-body{padding:14px}.place-photo-body h3{margin:0 0 5px;font-size:17px}.place-photo-body p{margin:0 0 12px;color:var(--muted);font-size:12px;line-height:1.45}.place-photo-body .ghost{width:100%;margin-bottom:10px}.photo-credit{display:block;color:#7f95ad;text-decoration:none;font-size:9px;line-height:1.35;overflow-wrap:anywhere}.photo-credit:hover{color:#ffc0ae}
    @media(max-width:600px){#screen{padding:18px 15px calc(104px + env(safe-area-inset-bottom))}.topbar{min-height:70px;padding:11px 14px}.logo-mark{width:38px;height:38px;border-radius:12px;font-size:17px}.brand-copy strong{font-size:18px}.brand-copy small{font-size:10px}.menu-btn{width:42px;height:42px;border-radius:13px}.hero{padding:14px 0 8px}.hero h1{font-size:clamp(31px,9.5vw,43px);margin:8px 0 9px}.hero p{font-size:16px;line-height:1.5}.hero-card{margin-top:15px;border-radius:21px;padding:17px}.hero-card strong{font-size:17px}.hero-card p{font-size:14px;margin:7px 0 12px}.primary{padding:12px 14px;border-radius:13px;font-size:14px}.section-head{margin:23px 0 11px}.section-head h2{font-size:18px}.grid{gap:10px}.card{border-radius:17px;padding:14px}.feature-card{min-height:128px}.card h3{font-size:15px;margin:8px 0 4px}.card p{font-size:12px}.stats{gap:8px}.stat{padding:11px;border-radius:15px}.stat b{font-size:20px}.bottom-nav{min-height:70px;padding:5px 7px env(safe-area-inset-bottom)}.bottom-nav button{font-size:10px;border-radius:12px}.nav-icon{font-size:20px}.setup-screen{min-height:calc(100dvh - 90px);padding:14px 0 30px}.setup-card{border-radius:23px;padding:19px}.setup-card h1{font-size:30px}.language-options{gap:8px;margin:16px 0}.lang-btn{padding:13px 7px;border-radius:15px;font-size:13px}.lang-btn span{font-size:23px}.about-card-pro{padding:16px}.about-principle-pro{padding:18px}.about-principle-pro strong{font-size:22px}.about-contact-pro{padding:15px}.learn-welcome{padding:17px;border-radius:19px}.learn-welcome h1{font-size:28px}.learn-welcome p{font-size:13.5px}.places-gallery{margin-top:26px}.places-gallery-grid{grid-template-columns:1fr;gap:12px}.place-photo-card{border-radius:18px}.place-photo-card img{height:205px}.gallery-heading h2{font-size:21px}}
    [dir="rtl"] .about-contact-pro{flex-direction:row-reverse;text-align:right}[dir="rtl"] .gallery-heading,[dir="rtl"] .place-photo-body{text-align:right}
  `;
  const style=document.createElement('style'); style.id='yanimda-final-touchup'; style.textContent=css; document.head.appendChild(style);

  if(needsFreshOnboarding) setTimeout(()=>{if(typeof setup==='function')setup();},0);
})();
