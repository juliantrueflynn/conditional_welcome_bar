
(function () {
  'use strict';

  const API_HOSTNAME = 'conditionalwelcomebar.ngrok.io';
  const API_URL = `https://${API_HOSTNAME}`;

  const api = {
    bar: {},
    init: function () {
      api.appendStylesheet();

      api.fetchBarsIndex(function (res) {
        api.bar = api.getBarFromResponse(res);

        if (api.bar) {
          api.render(api.bar);
        }
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
      const bars = response.filter(function (bar) {
        const template = api.getCurrentTemplate();
        const isHidden = window.localStorage.getItem(api.getStorageKey(bar.id));

        return (
          (bar.pageTemplate === 'global' || bar.pageTemplate === template)
          && !isHidden
        );
      });

      return bars[0];
    },
    appendStylesheet: function () {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = `//${API_HOSTNAME}/css/welcomeBar.css`;
      document.head.appendChild(link);
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
    getStorageKey: function (barId) {
      return `cw_bar_hide_${barId}_${api.getCurrentTemplate()}`;
    },
    handleCloseClick: function (e) {
      const container = e.target.parentElement.parentElement.parentElement;
      container.style.display = 'none';
      window.localStorage.setItem(api.getStorageKey(api.bar.id), true);
    },
    render: function (props) {
      const container = document.createElement('div');
      container.id = `cwBar${props.id}`;
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

      let content = document.createElement('div');

      if (props.url) {
        const widthClassName = props.isFullWidthLink ? 'w-100' : 'w-auto';
        container.classList.add('cw-bar__linkable');
        container.classList.add(`cw-bar__linkable--${widthClassName}`);
        
        content = document.createElement('a');
        content.href = props.url;
      }

      if (props.url && props.isNewTablUrl) {
        content.target = '_blank';
      }

      content.classList.add('cw-bar__content');
      content.style.paddingTop = props.paddingTop;
      content.style.paddingBottom = props.paddingBottom;
      content.style.paddingLeft = props.paddingLeft;
      content.style.paddingRight = props.paddingRight;

      content.innerHTML = props.content;

      const row = document.createElement('div');
      row.classList.add('cw-bar__row');

      row.appendChild(content);

      if (props.hasCloseButton) {
        const buttonCloseWrapper = document.createElement('div');
        const buttonClose = document.createElement('button');

        buttonClose.setAttribute('aria-label', 'Close bar');
        buttonClose.type = 'button';
        buttonClose.innerHTML = '&times;';
        buttonClose.addEventListener('click', api.handleCloseClick);

        buttonCloseWrapper.classList.add('cw-bar__close');
        buttonCloseWrapper.style.paddingRight = props.paddingRight;
        buttonCloseWrapper.appendChild(buttonClose);
        row.appendChild(buttonCloseWrapper);
      }

      container.appendChild(row);
      document.body.insertBefore(container, document.body.firstChild);

      if (props.isSticky) {
        const height = container.getBoundingClientRect().height;
        document.body.setAttribute('style', `margin-top: ${height}`);
      }
    }
  };

  window.welcomeBarAPI = api;

  api.init();
})();