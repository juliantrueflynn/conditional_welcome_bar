'use strict';

window.ConditionalWelcomeBar = (function () {
  var LOADING_CLASS_NAME = 'cw-bar-html--loading';
  var LOCAL_STORAGE_KEY = 'cw_bar_view';

  var getCurrentScript = function () {
    if (document['currentScript']) {
      return document['currentScript'];
    }

    return document.querySelector('[src*="cwb_api_host"]')
  };

  var getCurrentScriptSrc = function () {
    var script = getCurrentScript();

    if (script) {
      return script.getAttribute('src');
    }
  };

  var getApiHost = function () {
    var src = getCurrentScriptSrc();

    if (src) {
      var matches = RegExp('cwb_api_host=(.*?)(?=&|$)').exec(src);

      return matches ? matches[1] : undefined;
    }
  };

  var getApiUrl = function () {
    var apiHost = getApiHost();
    var shop = window.Shopify.shop;

    if (apiHost && shop) {
      return apiHost + '/api/shops/' + shop + '/active_bar?origin_pathname=' + window.location.pathname;
    }
  };

  var enqueueScripts = function (scriptsPaths) {
    scriptsPaths.forEach(function (path) {
      var script = document.createElement('script');
      script.setAttribute('src', path);
      document.head.appendChild(script);
    });
  };

  return {
    localStorageKey: LOCAL_STORAGE_KEY,
    _mount: function () {
      var xhr = new XMLHttpRequest();
      var apiUrl = getApiUrl();

      if (!apiUrl || document.getElementById('cw_bar') || window.localStorage.getItem(LOCAL_STORAGE_KEY)) {
        return;
      }

      xhr.open('GET', apiUrl, true);

      xhr.onloadstart = function () {
        document.body.classList.add(LOADING_CLASS_NAME);
      };

      xhr.onload = function () {
        var response = JSON.parse(this.responseText);

        if (response && response.data && !document.getElementById('cw_bar')) {
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
