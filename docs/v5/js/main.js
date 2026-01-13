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

  // Generate books along the path
  function generateBooks(pathPoints) {
    if (!roadStones) return;

    // Clear existing elements
    roadStones.innerHTML = '';

    // Book cover colors
    const bookColors = ['#8B4513', '#2F4F4F', '#800020', '#1a1a1a', '#4A4A4A', '#556B2F'];
    let bookIndex = 0;
    let lastY = 0;

    pathPoints.forEach((point, i) => {
      // Place books at random intervals (200-400px)
      const interval = 200 + seededRandom(i * 31) * 200;

      if (point.y - lastY >= interval) {
        // Create 1-2 books at this position
        const bookCount = 1 + Math.floor(seededRandom(bookIndex * 41) * 2);

        for (let j = 0; j < bookCount; j++) {
          const book = document.createElementNS('http://www.w3.org/2000/svg', 'g');

          // Book size variation (width: 8-14px, height: 12-18px)
          const bookWidth = 8 + seededRandom(bookIndex * 47 + j) * 6;
          const bookHeight = bookWidth * (1.3 + seededRandom(bookIndex * 53 + j) * 0.3);

          // Position offset from path (20-40px to left or right)
          const side = seededRandom(bookIndex * 59 + j) > 0.5 ? 1 : -1;
          const offset = 20 + seededRandom(bookIndex * 61 + j) * 20;
          const cx = point.x + (side * offset) + (seededRandom(bookIndex * 67 + j) - 0.5) * 10;
          const cy = point.y + (seededRandom(bookIndex * 71 + j) - 0.5) * 30;

          // Color
          const colorIndex = Math.floor(seededRandom(bookIndex * 73 + j) * bookColors.length);
          const bookColor = bookColors[colorIndex];

          // Rotation (slight tilt: -30 to 30 degrees)
          const rotation = (seededRandom(bookIndex * 79 + j) - 0.5) * 60;

          // Create book shape (closed book from side view)
          const bookBody = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          bookBody.setAttribute('x', cx - bookWidth / 2);
          bookBody.setAttribute('y', cy - bookHeight / 2);
          bookBody.setAttribute('width', bookWidth);
          bookBody.setAttribute('height', bookHeight);
          bookBody.setAttribute('fill', bookColor);
          bookBody.setAttribute('rx', '1');

          // Pages (lighter stripe)
          const pages = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          const pagesWidth = bookWidth * 0.15;
          pages.setAttribute('x', cx - bookWidth / 2);
          pages.setAttribute('y', cy - bookHeight / 2 + 1);
          pages.setAttribute('width', pagesWidth);
          pages.setAttribute('height', bookHeight - 2);
          pages.setAttribute('fill', '#f5f5dc');

          book.appendChild(bookBody);
          book.appendChild(pages);
          book.setAttribute('transform', `rotate(${rotation} ${cx} ${cy})`);

          roadStones.appendChild(book);
        }

        lastY = point.y;
        bookIndex++;
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

    // Generate books along the path
    generateBooks(pathPoints);
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
