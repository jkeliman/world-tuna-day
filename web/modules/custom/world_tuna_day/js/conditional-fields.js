(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.worldTunaDayConditionalFields = {
    attach: function (context, settings) {
      once('conditional-fields', 'body', context).forEach(function () {
        
        // Find the category select
        var categoryField = document.querySelector('select[name="field_category"]');
        
        // Find age group wrapper
        var ageGroupWrapper = document.querySelector('#edit-field-age-group-wrapper');
        
        if (!categoryField || !ageGroupWrapper) {
          console.error('Could not find required fields');
          return;
        }

        function toggleAgeGroup() {
          var selectedValue = categoryField.value;
          console.log('Selected category:', selectedValue);
          
          // Check for literature (case-insensitive)
          if (selectedValue.toLowerCase() === 'literature') {
            ageGroupWrapper.style.display = 'block';
            ageGroupWrapper.style.visibility = 'visible';
            console.log('Showing age group');
          } else {
            ageGroupWrapper.style.display = 'none';
            console.log('Hiding age group');
          }
        }

        // Toggle on change
        categoryField.addEventListener('change', toggleAgeGroup);

        // Toggle on initial load
        toggleAgeGroup();
      });
    }
  };
})(Drupal, once);
