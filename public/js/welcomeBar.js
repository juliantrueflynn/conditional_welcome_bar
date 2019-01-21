
(function () {
  'use strict';

  const API_HOSTNAME = 'conditionalwelcomebar.ngrok.io';
  const API_URL = `https://${API_HOSTNAME}`;

  const api = {
    init: function () {
      api.appendStylesheet(`//${API_HOSTNAME}/css/welcomeBar.css`);
      api.fetchBarsIndex();
    },
    fetchBarsIndex: function () {
      const xhr = new XMLHttpRequest();
      const { shop } = window.Shopify || {};
      const shopDomain = shop.replace('.myshopify.com', '');
    
      xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          const response = JSON.parse(this.responseText);
          const bar = api.getBarFromResponse(response);
          api.insertWelcomeBar(bar);
        }
      };

      xhr.open('GET', `${API_URL}/api/shops/${shopDomain}/active_bars`);
      xhr.send();
    },
    getBarFromResponse: function (response) {
      const template = api.getCurrentTemplate();
    
      const bars = response.filter(({ pageTemplate }) => (
        pageTemplate === 'global' || pageTemplate === template
      ));
    
      console.log(bars);
      console.log(bars[0]);

      return bars[0];
    },
    appendStylesheet: function (hrefPathname) {
      const head = document.getElementsByTagName('head')[0];
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = hrefPathname;
    
      head.appendChild(link);
    },
    getCurrentTemplate: function () {
      let template;

      if (window.location.pathname === '/') {
        template = 'homepage';
      } else if (window.location.pathname === '/cart') {
        template = 'cart';
      } else if (window.location.pathname.indexOf('/products/') !== -1) {
        template = 'product';
      } else if (window.location.pathname.indexOf('/collections/') !== -1) {
        template = 'collection';
      }
    
      return template;
    },
    insertWelcomeBar: function () {
      const body = document.getElementsByTagName('body')[0];
      const bar = document.createElement('div');
      bar.classList.add('cw-bar');
      bar.innerHTML = 'WELCOME BAR HERE';
      body.insertBefore(bar, body.firstChild);
    }
  };

  window.welcomeBarAPI = api;

  api.init();
})();