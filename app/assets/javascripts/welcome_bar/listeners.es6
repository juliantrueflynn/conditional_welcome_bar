// eslint-disable-next-line prettier/prettier
;(function() {
  'use strict';

  const closeButton = document.getElementById('cw_bar_button');

  if (window.ConditionalWelcomeBar.onCloseClick === undefined) {
    window.ConditionalWelcomeBar.onCloseClick = (event) => {
      const container = document.getElementById('cw_bar');
      const target = event.currentTarget;
      container.style.display = 'none';

      if (target.getAttribute('data-remove-body-margin') === 'true') {
        document.body.style.marginTop = '0';
      }

      window.localStorage.setItem(
        window.ConditionalWelcomeBar.localStorageKey,
        'true'
      );

      target.removeEventListener(
        'click',
        window.ConditionalWelcomeBar.onCloseClick
      );
    };
  }

  if (closeButton) {
    closeButton.addEventListener(
      'click',
      window.ConditionalWelcomeBar.onCloseClick
    );
  }
})();
