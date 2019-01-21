
(function () {
  'use strict';

  const API_HOSTNAME = 'conditionalwelcomebar.ngrok.io';
  const API_URL = `https://${API_HOSTNAME}`;

  const api = {
    init: function () {
      api.fetchBarsIndex(function (res) {
        const bar = api.getBarFromResponse(res);
        api.render(bar);
      });
    },
    fetchBarsIndex: function (callback) {
      const xhr = new XMLHttpRequest();
      const { shop } = window.Shopify || {};
      const shopDomain = shop.replace('.myshopify.com', '');
    
      xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          const response = JSON.parse(this.responseText);
          callback(response);
        }
      };

      xhr.open('GET', `${API_URL}/api/shops/${shopDomain}/active_bars`);
      xhr.send();
    },
    getBarFromResponse: function (response) {
      const bars = response.filter(({ pageTemplate }) => (
        pageTemplate === 'global' || pageTemplate === api.getCurrentTemplate()
      ));

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
    render: function (props) {
      console.log(props);
      api.appendStylesheet(`//${API_HOSTNAME}/css/welcomeBar.css`);

      const body = document.getElementsByTagName('body')[0];
      const bar = document.createElement('div');
      bar.classList.add('cw-bar');
      bar.id = `cwBar${props.id}`;

      bar.style.fontSize = props.fontSize;
      bar.style.color = props.fontColor;
      bar.style.paddingTop = props.paddingTop || '10px';
      bar.style.paddingBottom = props.paddingBottom || '10px';
      bar.style.paddingLeft = props.paddingLeft || '15px';
      bar.style.paddingRight = props.paddingRight || '15px';
      bar.style.textAlign = props.textAlign;
      bar.style.backgroundColor = props.backgroundColor;

      if (props.backgroundImage) {
        bar.style.backgroundImage = `url(${props.backgroundImage})`;
        bar.style.backgroundRepeat = props.backgroundImageRepeat;
        bar.style.backgroundPositionX = props.backgroundImagePositionX;
        bar.style.backgroundPositionY = props.backgroundImagePositionY;

        let imageSize = props.backgroundImageSizeX;
        if (props.backgroundImageSizeY) {
          imageSize += ` ${props.backgroundImageSizeY}`;
        }

        bar.style.backgroundSize = imageSize;
      }

      bar.innerHTML = props.content;
      body.insertBefore(bar, body.firstChild);
    }
  };

  window.welcomeBarAPI = api;

  api.init();
})();