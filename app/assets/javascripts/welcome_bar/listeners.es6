'use strict';

// eslint-disable-next-line prettier/prettier
;(function() {
  const container = document.getElementById('cw_bar');
  const button = document.getElementById('cw_bar_button');

  if (container && button) {
    button.addEventListener('click', handleCloseClick);
  }

  function handleCloseClick(event) {
    const target = event.currentTarget;
    container.style.display = 'none';

    if (target.getAttribute('data-remove-body-margin') === 'true') {
      document.body.style.marginTop = '0';
    }

    window.localStorage.setItem(
      window.ConditionalWelcomeBar.localStorageKey,
      'true'
    );

    button.removeEventListener('click', handleCloseClick);
  }
})();
