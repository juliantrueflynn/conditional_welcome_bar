'use strict';

window.ConditionalWelcomeBar = (function () {
  const API_HOSTNAME = 'conditionalwelcomebar.ngrok.io';
  const API_URL = `https://${API_HOSTNAME}`;

  const enqueueScripts = (scriptsPaths) => {
    scriptsPaths.forEach(function (path) {
      const script = document.createElement('script');
      script.setAttribute('src', path);
      document.head.appendChild(script);
    });
  };

  return {
    _mount: function () {
      const xhr = new XMLHttpRequest();

      xhr.open(
        'GET',
        `${API_URL}/api/shops/${window.Shopify.shop}/active_bar?origin_pathname=${window.location.pathname}`,
        true
      );

      xhr.onloadstart = function () {
        document.body.classList.add('cw-bar-html--loading');
      };

      xhr.onload = function () {
        const response = JSON.parse(this.responseText);
        document.head.insertAdjacentHTML('afterbegin', response.stylesHtml);
        document.body.insertAdjacentHTML('afterbegin', response.renderHtml);
        enqueueScripts(response.scriptsPaths);
        document.body.classList.remove('cw-bar-html--loading');
      };

      xhr.send(null);
    },
  };
})();

window.ConditionalWelcomeBar._mount();
