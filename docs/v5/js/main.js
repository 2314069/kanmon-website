/**
 * 感門之盟 - 共通JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initNavigation();
  initMobileMenu();
  initTimetableTabs();
  initCourseTabs();
  initScrollAnimation();
  initCurrentPageHighlight();
  initCarousels();
  initStreetProgress();
});

/**
 * Navigation scroll effect
 */
function initNavigation() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  // Skip scroll effect for pages with nav-solid class
  if (nav.classList.contains('nav-solid')) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeBtn = document.querySelector('.mobile-menu-close');

  if (!hamburger || !mobileMenu) return;

  // Toggle menu
  hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('active');
    hamburger.classList.toggle('active');

    // Prevent body scroll when menu is open
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });

  // Close button
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      closeMobileMenu(hamburger, mobileMenu);
    });
  }

  // Close menu when clicking a link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu(hamburger, mobileMenu);
    });
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMobileMenu(hamburger, mobileMenu);
    }
  });
}

function closeMobileMenu(hamburger, mobileMenu) {
  hamburger.setAttribute('aria-expanded', 'false');
  mobileMenu.classList.remove('active');
  hamburger.classList.remove('active');
  document.body.style.overflow = '';
}

/**
 * Timetable tabs functionality
 */
function initTimetableTabs() {
  const tabs = document.querySelectorAll('.timetable-tab');
  const days = document.querySelectorAll('.timetable-day');

  if (tabs.length === 0) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const day = tab.dataset.day;

      // Update tab states
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Update day panels
      days.forEach(d => {
        d.classList.remove('active');
        if (d.dataset.day === day) {
          d.classList.add('active');
        }
      });
    });
  });
}

/**
 * Scroll animation using Intersection Observer
 */
function initScrollAnimation() {
  const fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  fadeElements.forEach(el => observer.observe(el));
}

/**
 * Course tabs functionality (Classroom page)
 */
function initCourseTabs() {
  const courseTabs = document.querySelectorAll('.course-tab');
  const courseContents = document.querySelectorAll('.course-content');

  if (courseTabs.length === 0) return;

  courseTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const course = tab.dataset.course;

      // Update tab states
      courseTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Update content panels
      courseContents.forEach(c => {
        c.classList.remove('active');
        if (c.dataset.course === course) {
          c.classList.add('active');
        }
      });
    });
  });
}

/**
 * Highlight current page in navigation
 */
function initCurrentPageHighlight() {
  const currentPath = window.location.pathname;
  const filename = currentPath.split('/').pop() || 'index.html';

  // Desktop navigation
  document.querySelectorAll('.nav-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === filename || (filename === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Mobile navigation
  document.querySelectorAll('.mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === filename || (filename === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/**
 * Initialize Swiper carousels
 */
function initCarousels() {
  // Check if Swiper is available
  if (typeof Swiper === 'undefined') return;

  // Gallery carousel
  const galleryCarousel = document.querySelector('.gallery-carousel');
  if (galleryCarousel) {
    new Swiper('.gallery-carousel', {
      slidesPerView: 1,
      spaceBetween: 16,
      loop: true,
      grabCursor: true,
      pagination: {
        el: '.gallery-carousel .swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.gallery-carousel .swiper-button-next',
        prevEl: '.gallery-carousel .swiper-button-prev',
      },
      breakpoints: {
        600: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        900: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
      },
    });
  }

  // Speakers carousel
  const speakersCarousel = document.querySelector('.speakers-carousel');
  if (speakersCarousel) {
    new Swiper('.speakers-carousel', {
      slidesPerView: 'auto',
      spaceBetween: 24,
      centeredSlides: false,
      loop: true,
      grabCursor: true,
      pagination: {
        el: '.speakers-carousel .swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.speakers-carousel .swiper-button-next',
        prevEl: '.speakers-carousel .swiper-button-prev',
      },
      breakpoints: {
        600: {
          spaceBetween: 32,
        },
        900: {
          spaceBetween: 40,
        },
      },
    });
  }

  // Articles carousel
  const articlesCarousel = document.querySelector('.articles-carousel');
  if (articlesCarousel) {
    new Swiper('.articles-carousel', {
      slidesPerView: 'auto',
      spaceBetween: 24,
      centeredSlides: false,
      loop: true,
      grabCursor: true,
      pagination: {
        el: '.articles-carousel .swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.articles-carousel .swiper-button-next',
        prevEl: '.articles-carousel .swiper-button-prev',
      },
      breakpoints: {
        600: {
          spaceBetween: 32,
        },
      },
    });
  }
}

/**
 * Street journey progress animation with natural curves
 */
function initStreetProgress() {
  const streetPath = document.querySelector('.street-path');
  const roadBg = document.querySelector('.road-bg');
  const roadProgress = document.querySelector('.road-progress');

  if (!streetPath || !roadBg || !roadProgress) return;

  let pathLength = 0;

  // Seeded random for consistent results
  function seededRandom(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  // Generate natural winding path
  function generateWindingPath() {
    const mainEl = document.querySelector('.street-journey');
    if (!mainEl) return;

    const totalHeight = mainEl.scrollHeight + 100; // Add extra to ensure full coverage
    const baseSegmentHeight = 150; // Smaller segments for smoother path
    let currentY = 0;
    let segmentIndex = 0;

    // Starting position
    let pathD = 'M 70 -50'; // Start above viewport
    let currentX = 70;

    // Generate irregular winding curves
    while (currentY < totalHeight) {
      // Randomize segment height (smaller range for continuity)
      const segmentHeight = baseSegmentHeight + seededRandom(segmentIndex * 7) * 100;
      const nextY = currentY + segmentHeight;

      // Irregular direction and curve amount
      const rand1 = seededRandom(segmentIndex * 13 + 1);
      const rand2 = seededRandom(segmentIndex * 17 + 2);
      const rand3 = seededRandom(segmentIndex * 23 + 3);

      // Target X position (30-110 range)
      const nextX = 30 + rand1 * 80;

      // Smooth control points for continuous curves
      const cp1x = currentX + (rand2 - 0.5) * 30;
      const cp1y = currentY + segmentHeight * 0.33;
      const cp2x = nextX + (rand3 - 0.5) * 30;
      const cp2y = currentY + segmentHeight * 0.66;

      pathD += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${nextX} ${nextY}`;

      currentX = nextX;
      currentY = nextY;
      segmentIndex++;
    }

    // Apply path to both elements
    roadBg.setAttribute('d', pathD);
    roadProgress.setAttribute('d', pathD);

    // Update SVG viewBox with padding
    streetPath.setAttribute('viewBox', `-10 -50 170 ${totalHeight + 100}`);
    streetPath.style.height = `${totalHeight}px`;

    // Get path length for progress animation
    pathLength = roadBg.getTotalLength();
    roadProgress.style.strokeDasharray = pathLength;
    roadProgress.style.strokeDashoffset = pathLength;
  }

  // Update progress on scroll
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(scrollTop / docHeight, 1);

    const offset = pathLength * (1 - progress);
    roadProgress.style.strokeDashoffset = offset;
  }

  // Initialize
  generateWindingPath();
  updateProgress();

  window.addEventListener('resize', () => {
    generateWindingPath();
    updateProgress();
  });

  window.addEventListener('scroll', updateProgress, { passive: true });
}
