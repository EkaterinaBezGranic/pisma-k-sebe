/* ===== FAQ Accordion ===== */
document.querySelectorAll('.faq-item__question').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var item = btn.closest('.faq-item');
    var isOpen = item.classList.contains('is-open');

    // Close all
    document.querySelectorAll('.faq-item.is-open').forEach(function (el) {
      el.classList.remove('is-open');
      el.querySelector('.faq-item__question').setAttribute('aria-expanded', 'false');
    });

    // Toggle current
    if (!isOpen) {
      item.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

/* ===== Fade-in on scroll (IntersectionObserver) ===== */
if ('IntersectionObserver' in window) {
  var fadeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.fade-in').forEach(function (el) {
    fadeObserver.observe(el);
  });
} else {
  // Fallback: show all immediately
  document.querySelectorAll('.fade-in').forEach(function (el) {
    el.classList.add('is-visible');
  });
}

/* ===== Sticky CTA visibility ===== */
var stickyCta = document.getElementById('stickyCta');
var heroSection = document.getElementById('hero');
var finalSection = document.getElementById('final');

if (stickyCta && heroSection) {
  var stickyObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.target === heroSection) {
        // Show sticky CTA when hero is NOT visible
        if (!entry.isIntersecting) {
          stickyCta.classList.add('is-visible');
        } else {
          stickyCta.classList.remove('is-visible');
        }
      }
    });
  }, { threshold: 0.1 });

  stickyObserver.observe(heroSection);
}

/* ===== Carousel (Reviews) ===== */
(function () {
  var track = document.querySelector('.carousel__track');
  if (!track) return;

  var slides = document.querySelectorAll('.carousel__slide');
  var prevBar = document.querySelector('.carousel__bar--prev');
  var nextBar = document.querySelector('.carousel__bar--next');
  var dotsContainer = document.querySelector('.carousel__dots');
  var current = 0;
  var total = slides.length;

  // Create dots
  for (var i = 0; i < total; i++) {
    var dot = document.createElement('button');
    dot.className = 'carousel__dot' + (i === 0 ? ' is-active' : '');
    dot.setAttribute('aria-label', 'Отзыв ' + (i + 1));
    dot.dataset.index = i;
    dotsContainer.appendChild(dot);
  }

  var dots = dotsContainer.querySelectorAll('.carousel__dot');

  function goTo(index) {
    // Circular: wrap around
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    current = index;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    dots.forEach(function (d, i) {
      d.classList.toggle('is-active', i === current);
    });
  }

  // Init
  goTo(0);

  prevBar.addEventListener('click', function () { goTo(current - 1); });
  nextBar.addEventListener('click', function () { goTo(current + 1); });

  dotsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('carousel__dot')) {
      goTo(Number(e.target.dataset.index));
    }
  });

  // Swipe support
  var startX = 0;
  var diffX = 0;
  track.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchmove', function (e) { diffX = e.touches[0].clientX - startX; }, { passive: true });
  track.addEventListener('touchend', function () {
    if (Math.abs(diffX) > 40) {
      goTo(diffX > 0 ? current - 1 : current + 1);
    }
    diffX = 0;
  });
})();

/* ===== Smooth scroll for anchor links ===== */
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    var targetId = link.getAttribute('href');
    if (targetId === '#') return;

    var target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});