/**
 * ئۇيغۇرچە كۆركەم سىيرىلما تىزىملىك (Interactive Logic)
 * Sliding Indicator Animation, Collapse/Expand, and Theme Switching
 */

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const collapseBtn = document.getElementById('collapseBtn');
  const slidingIndicator = document.getElementById('slidingIndicator');
  const navItems = document.querySelectorAll('.nav-item');
  const themeToggle = document.getElementById('themeToggle');
  const styleModeToggle = document.getElementById('styleModeToggle');

  // كۆرسىتىش رايونى ئۇنسۇرلىرى
  const previewTitle = document.getElementById('previewTitle');
  const previewDesc = document.getElementById('previewDesc');
  const previewBadge = document.getElementById('previewBadge');

  // تىزىملىك تۈرلىرىنىڭ تەپسىلاتلىرى (ئۇيغۇرچە چۈشەندۈرۈشى بىلەن)
  const menuDetails = {
    home: {
      title: 'باش بەت',
      desc: 'ئەڭ يېڭى تەۋسىيەلەر، نۆۋەتتە قىزىق نۇقتىغا ئايلانغان دۇنياۋى كىنو-تىياتىرلار ۋە مەخسۇس سىز ئۈچۈن تۈزۈلگەن مۇلازىمەتلەر توپلىمى.',
      badge: 'ئاساسىي رايون'
    },
    continue: {
      title: 'داۋاملىق كۆرۈش',
      desc: 'ئالدىنقى قېتىم كۆرۈپ يېرىم قالغان فىلىم ياكى بۆلۈملەرنى قالغان يېرىدىن داۋاملاشتۇرۇپ كۆرۈڭ. خاتىرە ساقلانغان.',
      badge: 'ساقلانغان تارىخ'
    },
    mylist: {
      title: 'كۆرۈش تىزىملىكىم',
      desc: 'سىز كېيىن كۆرۈش ئۈچۈن ساقلىۋالغان 7 دانە نادىر فىلىم ۋە ئىجادىيەت تىزىملىكى. خالىغان ۋاقىتتا قوشالايسىز ياكى ئۆچۈرەلەيسىز.',
      badge: 'خاس كوللېكسىيە'
    },
    series: {
      title: 'تېلېۋىزىيە تىياتىرلىرى',
      desc: 'دۇنيا مىقياسىدا يۇقىرى باھاغا ئېرىشكەن داڭلىق كۆپ قىسىملىق تىياتىرلار، پەسىللىك مەخسۇس ئىجادىيەتلەر ۋە قىزىقارلىق فىلىملەر.',
      badge: 'پەسىللىك تىياتىر'
    },
    movies: {
      title: 'نادىر كىنولار',
      desc: 'ھەر خىل ژانىردىكى دۇنياۋى چوڭ فىلىملەر، تەۋەككۈلچىلىك، ئىلمىي فانتازىيە، ھېسسىيات ۋە تارىخىي كىنولار جەمگاھى.',
      badge: 'كىنو فوندى'
    },
    games: {
      title: 'ئويۇنلار',
      desc: 'ئەقلىي ئىقتىدارلىق، قىزىقارلىق ۋە بوش ۋاقىتلىرىڭىزنى مەنىلىك ئۆتكۈزۈشكە ياردەم بېرىدىغان ئۆزگىچە تېپىشماق ۋە مىنى ئويۇنلار.',
      badge: 'كۆڭۈل ئېچىش'
    },
    releases: {
      title: 'يېڭى كەلگەنلەر',
      desc: 'بۇ ھەپتە ۋە بۇ ئايدا ئەڭ يېڭى تارقىتىلغان ئالدىنقى قاتاردىكى ئەسەرلەر ۋە رەسمىي ئېلان قىلىنغان ئەسەرلەر.',
      badge: 'يېڭى مەزمۇن'
    },
    popular: {
      title: 'ئالقىشلانغانلار',
      desc: 'كۆرۈرمەنلەر تەرىپىدىن ئەڭ كۆپ باھالانغان ۋە ئەڭ كۆپ ئېقىم مىقدارىغا ئېرىشكەن TOP 10 ئالقىشلىق فىلىملەر.',
      badge: 'قىزىق نۇقتا'
    },
    settings: {
      title: 'تەڭشەك مەركىزى',
      desc: 'ھېساباتىڭىزنى باشقۇرۇش، تىل تەڭشەش، رەسىم سۈپىتىنى تاللاش، مەخپىيەتلىك ۋە بىخەتەرلىك تاللانمىلىرى.',
      badge: 'سىستېما تەڭشىكى'
    },
    logout: {
      title: 'سىستېمىدىن چىقىش',
      desc: 'نۆۋەتتىكى تىزىملاتقان ھېساباتتىن بىخەتەر چېكىنىش. بارلىق سانلىق مەلۇماتلار بۇلۇتتا ساقلانغان ھالەتتە قالىدۇ.',
      badge: 'ھېسابات'
    }
  };

  /**
   * لەيلىمە قىزىل سىيرىلغۇچ بەلبېغىنىڭ ئورنىنى ھېسابلاش ۋە يۆتكەش
   * (Sliding Indicator Position Calculator)
   */
  /**
   * لەيلىمە كۆرسەتكۈچ بەلبېغىنىڭ ئورنىنى ئېنىق ھېسابلاش ۋە يۆتكەش
   * (Sliding Indicator Position Calculator - Bounding Box Match)
   */
  function moveIndicatorTo(targetItem) {
    if (!targetItem || !sidebar || !slidingIndicator) return;

    const sidebarRect = sidebar.getBoundingClientRect();
    const itemRect = targetItem.getBoundingClientRect();

    // sidebar كارتىسىغا نىسبەتەن نىشان تۈرنىڭ ئۈستى ۋە سول چېتىنى تۈز سىزىقتا ھېسابلاش
    const topOffset = itemRect.top - sidebarRect.top - (sidebar.clientTop || 0);
    const leftOffset = itemRect.left - sidebarRect.left - (sidebar.clientLeft || 0);
    const width = itemRect.width;
    const height = itemRect.height;

    slidingIndicator.style.top = `${topOffset}px`;
    slidingIndicator.style.left = `${leftOffset}px`;
    slidingIndicator.style.width = `${width}px`;
    slidingIndicator.style.height = `${height}px`;
    slidingIndicator.style.opacity = '1';
  }

  // دەسلەپكى ئاكتىپ تۈرنى تېپىش ۋە ئورۇنلاشتۇرۇش
  const activeItem = document.querySelector('.nav-item.active') || navItems[0];
  setTimeout(() => {
    moveIndicatorTo(activeItem);
  }, 100);

  // تىزىملىك تۈرلىرىنى چېكىش ھەرىكىتى
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();

      // ئالدىنقى ئاكتىپ ھالەتنى ئۆچۈرۈش ۋە يېڭىسىنى قوزغىتىش
      navItems.forEach(i => {
        i.classList.remove('active');
        i.classList.remove('animating');
      });
      item.classList.add('active');

      // بەلگىنىڭ ھەرىكىتىنى قايتا قوزغىتىش (Trigger Icon Animation)
      void item.offsetWidth; // reflow
      item.classList.add('animating');

      // سىيرىلما كۆرسەتكۈچنى يۆتكەش
      moveIndicatorTo(item);

      // كۆرسىتىش كارتىسى بار بولسا تېكىستلەرنى يېڭىلاش
      const itemId = item.getAttribute('data-id');
      const details = menuDetails[itemId];
      if (details) {
        if (previewTitle) previewTitle.textContent = details.title;
        if (previewDesc) previewDesc.textContent = details.desc;
        if (previewBadge) previewBadge.textContent = details.badge;
      }
    });
  });

  const logoBox = document.getElementById('logoBox');

  // 1. لوگونى باسقاندا تىزىملىك چوڭىيىدۇ (Expand)
  if (logoBox) {
    logoBox.addEventListener('click', (e) => {
      e.stopPropagation();
      if (sidebar.classList.contains('collapsed')) {
        sidebar.classList.remove('collapsed');

        // ئېچىلغاندا سىيرىلما ئورنىنى قايتا ماسلاشتۇرۇش
        setTimeout(() => {
          const currentActive = document.querySelector('.nav-item.active');
          moveIndicatorTo(currentActive);
        }, 400);
      }
    });
  }

  // 2. كىچىك بەلگىنى (ئوقنى) باسقاندا كەينىگە يېنىپ كىچىكلەيدۇ (Collapse)
  if (collapseBtn) {
    collapseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('collapsed');

      // كىچىكلىگەندە ياكى يېيىلغاندا سىيرىلما ئورنىنى قايتا ماسلاشتۇرۇش
      setTimeout(() => {
        const currentActive = document.querySelector('.nav-item.active');
        moveIndicatorTo(currentActive);
      }, 400);
    });
  }

  // كېچە / كۈندۈز نۇسخىسىنى ئالماشتۇرۇش (Theme Toggle)
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // سىنبەلگە ئالماشتۇرۇش
    const isDark = document.body.classList.contains('dark-mode');
    themeToggle.innerHTML = isDark
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  });

  // تاللاش پاسونىنى ئالماشتۇرۇش: چۆكمە (ئىچىگە كىرگەن) / قىزىل لەيلىمە
  styleModeToggle.addEventListener('click', () => {
    sidebar.classList.toggle('theme-red-pill');
    const isRedPill = sidebar.classList.contains('theme-red-pill');
    styleModeToggle.title = isRedPill 
      ? 'نۆۋەتتىكى پاسون: قىزىل لەيلىمە (چېكىپ چۆكمە ھالەتكە قايتۇرۇڭ)' 
      : 'نۆۋەتتىكى پاسون: ئىچىگە كىرگەن چۆكمە (رەسىمدىكىدەك)';
  });

  // كۆزنەك چوڭلۇقى ئۆزگەرسە سىيرىلما ئورنىنى ئاپتوماتىك تەڭشەش
  window.addEventListener('resize', () => {
    const currentActive = document.querySelector('.nav-item.active');
    moveIndicatorTo(currentActive);
  });

  // پۈتۈن بەت ۋە فونتلار تولۇق يۈكلەنگەندە ئورۇننى كاپالەتلەندۈرۈش
  window.addEventListener('load', () => {
    const currentActive = document.querySelector('.nav-item.active') || navItems[0];
    moveIndicatorTo(currentActive);
  });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      const currentActive = document.querySelector('.nav-item.active') || navItems[0];
      moveIndicatorTo(currentActive);
    });
  }
});
