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
        `${API_URL}/api/shops/${window.Shopify.shop}/active_bar?origin_pathname=${window.location.pathname}`
      );
      xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.LOADING) {
          document.body.classList.add('cw-bar-html--loading');
        }

        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          const response = JSON.parse(this.responseText);
          document.body.insertAdjacentHTML('afterbegin', response.renderHtml);
          enqueueScripts(response.scriptsPaths);
          document.body.classList.remove('cw-bar-html--loading');
          document.body.classList.add('cw-bar-html--loaded');
        }
      };
      xhr.send();
    },
  };
})();

window.ConditionalWelcomeBar._mount();
