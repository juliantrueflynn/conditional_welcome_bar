'use strict';

window.ConditionalWelcomeBar = (function () {
  var API_HOSTNAME = 'conditionalwelcomebar.ngrok.io';
  var API_URL = `https://${API_HOSTNAME}`;
  var LOADING_CLASS_NAME = 'cw-bar-html--loading';

  var enqueueScripts = function (scriptsPaths) {
    scriptsPaths.forEach(function (path) {
      var script = document.createElement('script');
      script.setAttribute('src', path);
      document.head.appendChild(script);
    });
  };

  return {
    _mount: function () {
      var xhr = new XMLHttpRequest();

      xhr.open(
        'GET',
        `${API_URL}/api/shops/${window.Shopify.shop}/active_bar?origin_pathname=${window.location.pathname}`,
        true
      );

      xhr.onloadstart = function () {
        document.body.classList.add(LOADING_CLASS_NAME);
      };

      xhr.onload = function () {
        var response = JSON.parse(this.responseText);

        if (response && response.data) {
          document.head.insertAdjacentHTML('afterbegin', response.data.htmlStyles);
          document.body.insertAdjacentHTML('afterbegin', response.data.htmlWelcomeBar);
          enqueueScripts(response.data.scriptsPaths);
          document.body.classList.remove(LOADING_CLASS_NAME);
        } else {
          document.body.classList.remove(LOADING_CLASS_NAME);
        }
      };

      xhr.send(null);
    },
  };
})();

window.ConditionalWelcomeBar._mount();
