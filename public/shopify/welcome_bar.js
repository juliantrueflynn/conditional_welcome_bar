window.ConditionalWelcomeBar = (function () {
  'use strict';

  var LOADING_CLASS_NAME = 'cw-bar-html--loading';

  var _getCurrentScript = function () {
    if (document['currentScript']) {
      return document['currentScript'];
    }

    return document.querySelector('[src*="cwb_api_host"]')
  };

  var _getCurrentScriptSrc = function () {
    var script = _getCurrentScript();

    if (script) {
      return script.getAttribute('src');
    }
  };

  var _getApiHost = function () {
    var src = _getCurrentScriptSrc();

    if (src) {
      var matches = RegExp('cwb_api_host=(.*?)(?=&|$)').exec(src);

      return matches ? matches[1] : undefined;
    }
  };

  var _getApiUrl = function () {
    var apiHost = _getApiHost();
    var shop = window.Shopify.shop;

    if (apiHost && shop) {
      return apiHost + '/api/shops/' + shop + '/active_bar?origin_pathname=' + window.location.pathname;
    }
  };

  var _enqueueScripts = function (scriptsPaths) {
    scriptsPaths.forEach(function (path) {
      var script = document.createElement('script');
      script.setAttribute('src', path);
      document.head.appendChild(script);
    });
  };

  return {
    localStorageKey: 'cw_bar_view',
    onLoadStart: function () {
      document.body.classList.add(LOADING_CLASS_NAME);
    },
    onLoad: function(response) {
      var response = JSON.parse(this.responseText);

      if (response && response.data && !document.getElementById('cw_bar')) {
        document.head.insertAdjacentHTML('afterbegin', response.data.htmlStyles);
        document.body.insertAdjacentHTML('afterbegin', response.data.htmlWelcomeBar);
        _enqueueScripts(response.data.scriptsPaths);
        document.body.classList.remove(LOADING_CLASS_NAME);
      } else {
        document.body.classList.remove(LOADING_CLASS_NAME);
      }
    },
    _mount: function () {
      var xhr = new XMLHttpRequest();
      var apiUrl = _getApiUrl();

      if (apiUrl && !document.getElementById('cw_bar') && !window.localStorage.getItem(this.localStorageKey)) {
        xhr.open('GET', apiUrl, true);
        xhr.onloadstart = this.onLoadStart;
        xhr.onload = this.onLoad;
        xhr.send(null);
      }
    },
  };
})();

window.ConditionalWelcomeBar._mount();
