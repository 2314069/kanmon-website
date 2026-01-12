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
 * Street journey progress animation with curved SVG path
 */
function initStreetProgress() {
  const streetPath = document.querySelector('.street-path');
  const streetMilestone = document.querySelector('.street-milestone');
  const streetStops = document.querySelectorAll('.street-stop');

  if (!streetPath || streetStops.length === 0) return;

  // Generate curved path through all sections
  function generateCurvedPath() {
    const points = [];
    const mainEl = document.querySelector('.street-journey');
    if (!mainEl) return;

    const mainRect = mainEl.getBoundingClientRect();
    const scrollTop = window.scrollY;

    // Collect center points of each section
    streetStops.forEach((stop, index) => {
      const rect = stop.getBoundingClientRect();
      const y = rect.top + scrollTop - mainRect.top + rect.height / 2;
      // Alternate left and right for bigger S-curve
      const x = index % 2 === 0 ? 40 : 160;
      points.push({ x, y });
    });

    if (points.length < 2) return;

    // Build SVG path with smooth curves
    let pathD = `M ${points[0].x} ${points[0].y - 200}`;

    // Start curve to first point
    pathD += ` Q ${points[0].x} ${points[0].y - 100}, ${points[0].x} ${points[0].y}`;

    // Create smooth S-curves between points
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const midY = (current.y + next.y) / 2;

      // S-curve using cubic bezier
      pathD += ` C ${current.x} ${midY}, ${next.x} ${midY}, ${next.x} ${next.y}`;
    }

    // End curve
    const lastPoint = points[points.length - 1];
    pathD += ` Q ${lastPoint.x} ${lastPoint.y + 100}, ${lastPoint.x} ${lastPoint.y + 200}`;

    // Update road path elements
    const roadBase = streetPath.querySelector('.road-base');
    const roadBorder = streetPath.querySelector('.road-border');
    if (roadBase) roadBase.setAttribute('d', pathD);
    if (roadBorder) roadBorder.setAttribute('d', pathD);

    // Generate offset paths for grass on both sides
    const grassLeft = streetPath.querySelector('.road-grass-left');
    const grassRight = streetPath.querySelector('.road-grass-right');

    if (grassLeft && grassRight && points.length >= 2) {
      // Create slightly offset paths for grass
      let leftPathD = `M ${points[0].x - 20} ${points[0].y - 200}`;
      leftPathD += ` Q ${points[0].x - 20} ${points[0].y - 100}, ${points[0].x - 20} ${points[0].y}`;

      let rightPathD = `M ${points[0].x + 20} ${points[0].y - 200}`;
      rightPathD += ` Q ${points[0].x + 20} ${points[0].y - 100}, ${points[0].x + 20} ${points[0].y}`;

      for (let i = 0; i < points.length - 1; i++) {
        const current = points[i];
        const next = points[i + 1];
        const midY = (current.y + next.y) / 2;

        leftPathD += ` C ${current.x - 20} ${midY}, ${next.x - 20} ${midY}, ${next.x - 20} ${next.y}`;
        rightPathD += ` C ${current.x + 20} ${midY}, ${next.x + 20} ${midY}, ${next.x + 20} ${next.y}`;
      }

      const lastPoint = points[points.length - 1];
      leftPathD += ` Q ${lastPoint.x - 20} ${lastPoint.y + 100}, ${lastPoint.x - 20} ${lastPoint.y + 200}`;
      rightPathD += ` Q ${lastPoint.x + 20} ${lastPoint.y + 100}, ${lastPoint.x + 20} ${lastPoint.y + 200}`;

      grassLeft.setAttribute('d', leftPathD);
      grassRight.setAttribute('d', rightPathD);
    }

    // Update SVG viewBox to match content height
    const totalHeight = mainEl.scrollHeight;
    streetPath.setAttribute('viewBox', `0 0 200 ${totalHeight}`);
    streetPath.style.height = `${totalHeight}px`;
  }

  // Generate path on load and resize
  generateCurvedPath();
  window.addEventListener('resize', generateCurvedPath);

  // Show milestone
  if (streetMilestone) {
    streetMilestone.classList.add('visible');
  }

  // Track current active stop
  let currentStop = null;

  // Intersection Observer for stop detection
  const stopObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const stopNumber = entry.target.dataset.stop;

        // Update milestone number
        if (streetMilestone) {
          const numberEl = streetMilestone.querySelector('.milestone-number');
          if (numberEl && numberEl.textContent !== stopNumber) {
            numberEl.textContent = stopNumber;
            streetMilestone.classList.remove('animate');
            void streetMilestone.offsetWidth; // Force reflow
            streetMilestone.classList.add('animate');
          }
        }

        // Mark as active
        if (entry.target !== currentStop) {
          if (currentStop) {
            currentStop.classList.remove('active');
          }
          entry.target.classList.add('active');
          currentStop = entry.target;

          // Update milestone active state
          if (streetMilestone) {
            streetMilestone.classList.add('active');
          }
        }
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-40% 0px -40% 0px'
  });

  streetStops.forEach(stop => stopObserver.observe(stop));
}
