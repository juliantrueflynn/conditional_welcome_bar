
(function () {
  'use strict';

  const API_HOSTNAME = 'conditionalwelcomebar.ngrok.io';
  const API_URL = `https://${API_HOSTNAME}`;

  const api = {
    init: function () {
      api.appendStylesheet(`//${API_HOSTNAME}/css/welcomeBar.css`);

      api.fetchBarsIndex(function (res) {
        const bar = api.getBarFromResponse(res);
        api.render(bar);
      });
    },
    fetchBarsIndex: function (callback) {
      const xhr = new XMLHttpRequest();
      const shopDomain = window.Shopify.shop.replace('.myshopify.com', '');
    
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
      const body = document.getElementsByTagName('body')[0];
      const container = document.createElement('div');

      container.classList.add('cw-bar');
      container.classList.add(`cw-bar__${props.id}`);
      container.classList.add(`cw-bar__template-${api.getCurrentTemplate()}`);

      if (props.isSticky) {
        container.classList.add('cw-bar__fixed');
        container.classList.add(`cw-bar__fixed--${props.placement}`);
      }

      container.style.fontSize = props.fontSize;
      container.style.color = props.fontColor;
      container.style.textAlign = props.textAlign;
      container.style.backgroundColor = props.backgroundColor;

      if (props.backgroundImage) {
        container.classList.add('cw-bar__imageable');
        container.style.backgroundImage = `url(${props.backgroundImage})`;
        container.style.backgroundRepeat = props.backgroundImageRepeat;
        container.style.backgroundPositionX = props.backgroundImagePositionX;
        container.style.backgroundPositionY = props.backgroundImagePositionY;

        let imageSize = props.backgroundImageSizeX;
        if (props.backgroundImageSizeY) {
          imageSize += ` ${props.backgroundImageSizeY}`;
        }

        container.style.backgroundSize = imageSize;
      }

      let bar = document.createElement('div');

      if (props.url) {
        container.classList.add('cw-bar__linkable');
        bar = document.createElement('a');
        bar.href = props.url;
      }

      bar.classList.add('cw-bar__body');
      bar.style.paddingTop = props.paddingTop || '10px';
      bar.style.paddingBottom = props.paddingBottom || '10px';
      bar.style.paddingLeft = props.paddingLeft || '15px';
      bar.style.paddingRight = props.paddingRight || '15px';
      bar.innerHTML = props.content;

      container.appendChild(bar);
      body.insertBefore(container, body.firstChild);
    }
  };

  window.welcomeBarAPI = api;

  api.init();
})();