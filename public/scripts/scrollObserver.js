// public/scripts/scrollObserver.js
document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('[data-reveal]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Stop observing once it's visible to save performance
        observer.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.1, 
    rootMargin: '0px 0px -40px 0px' 
  });

  revealElements.forEach((el) => observer.observe(el));
});