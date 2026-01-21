/**
 * 感門之盟 - 共通JavaScript
 */

// ============================================
// Configuration
// ============================================
const CONFIG = {
  SCROLL_THRESHOLD: 50,
  DEBOUNCE_DELAY: 150,
  BREAKPOINTS: {
    MOBILE: 600,
    TABLET: 900,
    DESKTOP: 1024
  },
  CAROUSEL: {
    GAP_MOBILE: 16,
    GAP_TABLET: 20,
    GAP_DESKTOP: 24,
    GAP_LARGE: 32,
    GAP_EXTRA_LARGE: 40
  },
  STREET: {
    ICON_INTERVAL_MIN: 180,
    ICON_INTERVAL_RANGE: 200,
    SEGMENT_HEIGHT_BASE: 150,
    SEGMENT_HEIGHT_RANGE: 100
  },
  ANIMATION: {
    THRESHOLD: 0.1,
    ROOT_MARGIN: '0px 0px -50px 0px'
  }
};

// ============================================
// Utility Functions
// ============================================

/**
 * Debounce function to limit execution rate
 */
function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Safe query selector with error handling
 */
function safeQuerySelector(selector, context = document) {
  try {
    return context.querySelector(selector);
  } catch (error) {
    console.warn(`Query selector failed for "${selector}":`, error);
    return null;
  }
}

/**
 * Safe query selector all with error handling
 */
function safeQuerySelectorAll(selector, context = document) {
  try {
    return context.querySelectorAll(selector);
  } catch (error) {
    console.warn(`Query selector all failed for "${selector}":`, error);
    return [];
  }
}

// ============================================
// Event Listener Management
// ============================================
const eventListeners = [];

function addManagedEventListener(target, type, handler, options) {
  target.addEventListener(type, handler, options);
  eventListeners.push({ target, type, handler, options });
}

function cleanupEventListeners() {
  eventListeners.forEach(({ target, type, handler, options }) => {
    target.removeEventListener(type, handler, options);
  });
  eventListeners.length = 0;
}

// Cleanup on page unload
window.addEventListener('pagehide', cleanupEventListeners);

// ============================================
// Initialization
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initMobileMenu();
  initTimetableTabs();
  initCourseTabs();
  initScrollAnimation();
  initCurrentPageHighlight();
  initCarousels();
  initStreetProgress();
});

// ============================================
// Navigation
// ============================================
function initNavigation() {
  try {
    const nav = safeQuerySelector('.nav');
    if (!nav) return;

    // Skip scroll effect for pages with nav-solid class
    if (nav.classList.contains('nav-solid')) return;

    const scrollHandler = () => {
      if (window.scrollY > CONFIG.SCROLL_THRESHOLD) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };

    addManagedEventListener(window, 'scroll', scrollHandler, { passive: true });
  } catch (error) {
    console.warn('Navigation initialization failed:', error);
  }
}

// ============================================
// Mobile Menu
// ============================================
function initMobileMenu() {
  try {
    const hamburger = safeQuerySelector('.hamburger');
    const mobileMenu = safeQuerySelector('.mobile-menu');
    const closeBtn = safeQuerySelector('.mobile-menu-close');

    if (!hamburger || !mobileMenu) return;

    const toggleMenu = () => {
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    };

    const closeMenu = () => {
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('active');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    };

    hamburger.addEventListener('click', toggleMenu);

    if (closeBtn) {
      closeBtn.addEventListener('click', closeMenu);
    }

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMenu();
      }
    });
  } catch (error) {
    console.warn('Mobile menu initialization failed:', error);
  }
}

// ============================================
// Timetable Tabs
// ============================================
function initTimetableTabs() {
  try {
    const tabs = safeQuerySelectorAll('.timetable-tab, .timetable-tab-book, .dictionary-index-tab');
    const days = safeQuerySelectorAll('.timetable-day');

    if (tabs.length === 0) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const day = tab.dataset.day;

        tabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        days.forEach(d => {
          d.classList.remove('active');
          if (d.dataset.day === day) {
            d.classList.add('active');
          }
        });
      });
    });
  } catch (error) {
    console.warn('Timetable tabs initialization failed:', error);
  }
}

// ============================================
// Scroll Animation
// ============================================
function initScrollAnimation() {
  try {
    const fadeElements = safeQuerySelectorAll('.fade-in');

    if (fadeElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: CONFIG.ANIMATION.THRESHOLD,
      rootMargin: CONFIG.ANIMATION.ROOT_MARGIN
    });

    fadeElements.forEach(el => observer.observe(el));
  } catch (error) {
    console.warn('Scroll animation initialization failed:', error);
  }
}

// ============================================
// Course Tabs
// ============================================
function initCourseTabs() {
  try {
    const courseTabs = safeQuerySelectorAll('.course-tab');
    const courseContents = safeQuerySelectorAll('.course-content');

    if (courseTabs.length === 0) return;

    courseTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const course = tab.dataset.course;

        courseTabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        courseContents.forEach(c => {
          c.classList.remove('active');
          if (c.dataset.course === course) {
            c.classList.add('active');
          }
        });
      });
    });
  } catch (error) {
    console.warn('Course tabs initialization failed:', error);
  }
}

// ============================================
// Current Page Highlight
// ============================================
function initCurrentPageHighlight() {
  try {
    const currentPath = window.location.pathname;
    const filename = currentPath.split('/').pop() || 'index.html';

    // Combined query for both desktop and mobile navigation
    safeQuerySelectorAll('.nav-menu a, .mobile-menu a').forEach(link => {
      const href = link.getAttribute('href');
      if (href === filename || (filename === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  } catch (error) {
    console.warn('Current page highlight initialization failed:', error);
  }
}

// ============================================
// Carousels (Swiper)
// ============================================
function initCarousels() {
  try {
    if (typeof Swiper === 'undefined') return;

    const { CAROUSEL, BREAKPOINTS } = CONFIG;

    // Gallery carousel
    if (safeQuerySelector('.gallery-carousel')) {
      new Swiper('.gallery-carousel', {
        slidesPerView: 1,
        spaceBetween: CAROUSEL.GAP_MOBILE,
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
          [BREAKPOINTS.MOBILE]: {
            slidesPerView: 2,
            spaceBetween: CAROUSEL.GAP_TABLET,
          },
          [BREAKPOINTS.TABLET]: {
            slidesPerView: 3,
            spaceBetween: CAROUSEL.GAP_DESKTOP,
          },
        },
      });
    }

    // Speakers carousel
    if (safeQuerySelector('.speakers-carousel')) {
      new Swiper('.speakers-carousel', {
        slidesPerView: 'auto',
        spaceBetween: CAROUSEL.GAP_DESKTOP,
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
          [BREAKPOINTS.MOBILE]: {
            spaceBetween: CAROUSEL.GAP_LARGE,
          },
          [BREAKPOINTS.TABLET]: {
            spaceBetween: CAROUSEL.GAP_EXTRA_LARGE,
          },
        },
      });
    }

    // Articles carousel
    if (safeQuerySelector('.articles-carousel')) {
      new Swiper('.articles-carousel', {
        slidesPerView: 'auto',
        spaceBetween: CAROUSEL.GAP_DESKTOP,
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
          [BREAKPOINTS.MOBILE]: {
            spaceBetween: CAROUSEL.GAP_LARGE,
          },
        },
      });
    }
  } catch (error) {
    console.warn('Carousel initialization failed:', error);
  }
}

// ============================================
// Street Journey Progress
// ============================================
function initStreetProgress() {
  try {
    const streetPath = safeQuerySelector('.street-path');
    const roadBg = safeQuerySelector('.road-bg');
    const roadProgress = safeQuerySelector('.road-progress');
    const roadStones = safeQuerySelector('.road-stones');

    if (!streetPath || !roadBg || !roadProgress) return;

    let pathLength = 0;
    const { STREET } = CONFIG;

    // Seeded random for consistent results
    function seededRandom(seed) {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    }

    // Generate circular icons along the path
    function generateIcons(pathPoints) {
      if (!roadStones) return;

      roadStones.innerHTML = '';

      const iconColors = ['#c0c0c0', '#a0a0a0', '#d0d0d0', '#b8b8b8', '#909090'];
      let iconIndex = 0;
      let lastY = 0;

      pathPoints.forEach((point, i) => {
        const interval = STREET.ICON_INTERVAL_MIN + seededRandom(i * 31) * STREET.ICON_INTERVAL_RANGE;

        if (point.y - lastY >= interval) {
          const iconCount = 1 + Math.floor(seededRandom(iconIndex * 41) * 3);

          for (let j = 0; j < iconCount; j++) {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

            const radius = 3 + seededRandom(iconIndex * 47 + j) * 5;
            const side = seededRandom(iconIndex * 59 + j) > 0.5 ? 1 : -1;
            const offset = 18 + seededRandom(iconIndex * 61 + j) * 20;
            const cx = point.x + (side * offset) + (seededRandom(iconIndex * 67 + j) - 0.5) * 10;
            const cy = point.y + (seededRandom(iconIndex * 71 + j) - 0.5) * 30;
            const colorIndex = Math.floor(seededRandom(iconIndex * 73 + j) * iconColors.length);

            circle.setAttribute('cx', cx);
            circle.setAttribute('cy', cy);
            circle.setAttribute('r', radius);
            circle.setAttribute('fill', iconColors[colorIndex]);

            roadStones.appendChild(circle);
          }

          lastY = point.y;
          iconIndex++;
        }
      });
    }

    // Generate natural winding path
    function generateWindingPath() {
      const mainEl = safeQuerySelector('.street-journey');
      if (!mainEl) return;

      const totalHeight = mainEl.scrollHeight + 100;
      let currentY = 0;
      let segmentIndex = 0;

      let pathD = 'M 100 0';
      let currentX = 100;

      const pathPoints = [{ x: currentX, y: currentY }];

      while (currentY < totalHeight) {
        const segmentHeight = STREET.SEGMENT_HEIGHT_BASE + seededRandom(segmentIndex * 7) * STREET.SEGMENT_HEIGHT_RANGE;
        const nextY = currentY + segmentHeight;

        const rand1 = seededRandom(segmentIndex * 13 + 1);
        const rand2 = seededRandom(segmentIndex * 17 + 2);
        const rand3 = seededRandom(segmentIndex * 23 + 3);

        const nextX = 50 + rand1 * 100;

        const cp1x = Math.max(20, Math.min(180, currentX + (rand2 - 0.5) * 40));
        const cp1y = currentY + segmentHeight * 0.33;
        const cp2x = Math.max(20, Math.min(180, nextX + (rand3 - 0.5) * 40));
        const cp2y = currentY + segmentHeight * 0.66;

        pathD += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${nextX} ${nextY}`;

        pathPoints.push({ x: cp1x, y: cp1y });
        pathPoints.push({ x: cp2x, y: cp2y });
        pathPoints.push({ x: nextX, y: nextY });

        currentX = nextX;
        currentY = nextY;
        segmentIndex++;
      }

      roadBg.setAttribute('d', pathD);
      roadProgress.setAttribute('d', pathD);

      streetPath.setAttribute('viewBox', `0 0 200 ${totalHeight}`);
      streetPath.style.height = `${totalHeight}px`;

      pathLength = roadBg.getTotalLength();
      roadProgress.style.strokeDasharray = pathLength;
      roadProgress.style.strokeDashoffset = pathLength;

      generateIcons(pathPoints);
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

    // Debounced resize handler
    const debouncedResize = debounce(() => {
      generateWindingPath();
      updateProgress();
    }, CONFIG.DEBOUNCE_DELAY);

    addManagedEventListener(window, 'resize', debouncedResize);
    addManagedEventListener(window, 'scroll', updateProgress, { passive: true });
  } catch (error) {
    console.warn('Street progress initialization failed:', error);
  }
}
