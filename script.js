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