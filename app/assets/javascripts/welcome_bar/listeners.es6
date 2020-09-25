'use strict';

// eslint-disable-next-line prettier/prettier
;(function() {
  const container = document.querySelector('.cwb-bar');
  const button = document.getElementById('cw_bar_button');

  button && button.addEventListener('click', handleCloseClick);

  function handleCloseClick(event) {
    const target = event.currentTarget;
    const barId = target.getAttribute('data-bar-id');
    container.style.display = 'none';

    if (target.getAttribute('data-remove-body-margin') === 'true') {
      document.body.style.marginTop = '0';
    }

    window.localStorage.setItem(`cw_bar_hide_${barId}`, 'true');
    button.removeEventListener('click', handleCloseClick);
  }
})();
