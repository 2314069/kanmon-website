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
  const roadStones = document.querySelector('.road-stones');

  if (!streetPath || !roadBg || !roadProgress) return;

  let pathLength = 0;

  // Seeded random for consistent results
  function seededRandom(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  // Generate circular icons along the path
  function generateIcons(pathPoints) {
    if (!roadStones) return;

    // Clear existing elements
    roadStones.innerHTML = '';

    // Soft, muted colors
    const iconColors = ['#c0c0c0', '#a0a0a0', '#d0d0d0', '#b8b8b8', '#909090'];
    let iconIndex = 0;
    let lastY = 0;

    pathPoints.forEach((point, i) => {
      // Place icons at random intervals (180-380px)
      const interval = 180 + seededRandom(i * 31) * 200;

      if (point.y - lastY >= interval) {
        // Create 1-3 circles at this position
        const iconCount = 1 + Math.floor(seededRandom(iconIndex * 41) * 3);

        for (let j = 0; j < iconCount; j++) {
          const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

          // Size variation (radius: 3-8px)
          const radius = 3 + seededRandom(iconIndex * 47 + j) * 5;

          // Position offset from path (18-38px to left or right)
          const side = seededRandom(iconIndex * 59 + j) > 0.5 ? 1 : -1;
          const offset = 18 + seededRandom(iconIndex * 61 + j) * 20;
          const cx = point.x + (side * offset) + (seededRandom(iconIndex * 67 + j) - 0.5) * 10;
          const cy = point.y + (seededRandom(iconIndex * 71 + j) - 0.5) * 30;

          // Color
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
    const mainEl = document.querySelector('.street-journey');
    if (!mainEl) return;

    const totalHeight = mainEl.scrollHeight + 100; // Add extra to ensure full coverage
    const baseSegmentHeight = 150; // Smaller segments for smoother path
    let currentY = 0;
    let segmentIndex = 0;

    // Starting position (center of viewBox)
    let pathD = 'M 100 0';
    let currentX = 100;

    // Collect path points for stone placement
    const pathPoints = [{ x: currentX, y: currentY }];

    // Generate irregular winding curves
    while (currentY < totalHeight) {
      // Randomize segment height
      const segmentHeight = baseSegmentHeight + seededRandom(segmentIndex * 7) * 100;
      const nextY = currentY + segmentHeight;

      // Irregular direction and curve amount
      const rand1 = seededRandom(segmentIndex * 13 + 1);
      const rand2 = seededRandom(segmentIndex * 17 + 2);
      const rand3 = seededRandom(segmentIndex * 23 + 3);

      // Target X position (50-150 range, centered in 200px width)
      const nextX = 50 + rand1 * 100;

      // Smooth control points - keep within bounds
      const cp1x = Math.max(20, Math.min(180, currentX + (rand2 - 0.5) * 40));
      const cp1y = currentY + segmentHeight * 0.33;
      const cp2x = Math.max(20, Math.min(180, nextX + (rand3 - 0.5) * 40));
      const cp2y = currentY + segmentHeight * 0.66;

      pathD += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${nextX} ${nextY}`;

      // Store intermediate points for stone placement
      pathPoints.push({ x: cp1x, y: cp1y });
      pathPoints.push({ x: cp2x, y: cp2y });
      pathPoints.push({ x: nextX, y: nextY });

      currentX = nextX;
      currentY = nextY;
      segmentIndex++;
    }

    // Apply path to both elements
    roadBg.setAttribute('d', pathD);
    roadProgress.setAttribute('d', pathD);

    // Update SVG viewBox
    streetPath.setAttribute('viewBox', `0 0 200 ${totalHeight}`);
    streetPath.style.height = `${totalHeight}px`;

    // Get path length for progress animation
    pathLength = roadBg.getTotalLength();
    roadProgress.style.strokeDasharray = pathLength;
    roadProgress.style.strokeDashoffset = pathLength;

    // Generate icons along the path
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

  window.addEventListener('resize', () => {
    generateWindingPath();
    updateProgress();
  });

  window.addEventListener('scroll', updateProgress, { passive: true });
}
