(function (Drupal) {
  'use strict';

  /**
   * Canvas theme behaviors.
   */
  Drupal.behaviors.canvasTheme = {
    attach: function (context, settings) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // IntersectionObserver for scroll-triggered animations
      const cards = context.querySelectorAll('.winner-card:not(.is-visible)');
      if (!cards.length || prefersReducedMotion) {
        // If reduced motion preferred, show all cards immediately
        if (prefersReducedMotion) {
          cards.forEach(card => card.classList.add('is-visible'));
        }
        return;
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Stagger delay based on element index within its parent
            const parent = entry.target.parentElement;
            const siblings = Array.from(parent.children);
            const index = siblings.indexOf(entry.target);
            entry.target.style.animationDelay = `${index * 0.1}s`;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      cards.forEach(card => observer.observe(card));
    }
  };

})(Drupal);
