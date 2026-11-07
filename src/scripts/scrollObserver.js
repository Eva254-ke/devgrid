// src/scripts/scrollObserver.js
// Premium scroll observer with lazy loading and animations

function initScrollObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elements = document.querySelectorAll('[data-reveal]');
  elements.forEach((el) => observer.observe(el));

  return observer;
}

function initHeaderScrollEffect() {
  const header = document.querySelector('.apple-header');
  if (!header) return;

  let lastScroll = 0;
  let ticking = false;

  const onScroll = () => {
    lastScroll = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (lastScroll > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
        ticking = false;
      });
    }
  };

  window.addEventListener('scroll', onScroll);
}

function initSmoothScrolling() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

function initParallaxEffect() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  if (parallaxElements.length === 0) return;

  let ticking = false;

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        parallaxElements.forEach(el => {
          const speed = parseFloat(el.dataset.speed || '0.5');
          const rect = el.getBoundingClientRect();
          const scrollY = window.scrollY;
          
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const offset = (scrollY - rect.top) * speed;
            el.style.transform = `translateY(${offset}px)`;
          }
        });
        ticking = false;
      });
    }
  };

  window.addEventListener('scroll', onScroll);
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initScrollObserver();
    initHeaderScrollEffect();
    initSmoothScrolling();
    initParallaxEffect();
  });
} else {
  initScrollObserver();
  initHeaderScrollEffect();
  initSmoothScrolling();
  initParallaxEffect();
}
