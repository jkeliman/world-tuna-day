(function (Drupal) {
  'use strict';

  Drupal.behaviors.canvasTheme = {
    attach: function (context, settings) {
      // Lazy load YouTube thumbnails
      const youtubeCards = context.querySelectorAll('.winner-card__media--youtube');
      youtubeCards.forEach(function(card) {
        const img = card.querySelector('img');
        if (img && img.dataset.src) {
          img.src = img.dataset.src;
        }
      });
    }
  };
})(Drupal);
