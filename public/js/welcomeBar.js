
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
    style: function (node, style) {
      return Object.keys(style).filter(key => style[key]).forEach((key) => {
        node.style[key] = style[key];
      });
    },
    classList: function (node, classNames) {
      return classNames.forEach((className) => {
        node.classList.add(className);
      });
    },
    render: function (props) {
      const container = document.createElement('div');
      container.id = `cwBar${props.id}`;

      api.classList(container, [
        'cw-bar',
        `cw-bar__template-${api.getCurrentTemplate()}`,
        props.isSticky && 'cw-bar__fixed',
        props.isSticky && `cw-bar__fixed--${props.placement}`,
        props.backgroundImage && 'cw-bar__imageable',
        props.url && 'cw-bar__linkable',
        props.url && props.isFullWidthLink && 'cw-bar__linkable--w-100',
        props.url && !props.isFullWidthLink && 'cw-bar__linkable--w-auto',
      ]);

      const backgroundImage = props.backgroundImage;
      
      let imageSize = props.backgroundImageSizeX;
      if (props.backgroundImageSizeY) {
        imageSize += ` ${props.backgroundImageSizeY}`;
      }

      api.style(container, {
        fontSize: props.fontSize,
        color: props.fontColor,
        textAlign: props.textAlign,
        backgroundColor: props.backgroundColor,
        backgroundImage: backgroundImage && `url(${props.backgroundImage})`,
        backgroundRepeat: backgroundImage && props.backgroundImageRepeat,
        backgroundPositionX: backgroundImage && props.backgroundImagePositionX,
        backgroundPositionY: backgroundImage && props.backgroundImagePositionY,
        backgroundSize: backgroundImage && imageSize,
      });

      let content = document.createElement('div');

      if (props.url) {
        content = document.createElement('a');
        content.href = props.url;
      }

      if (props.url && props.isNewTablUrl) {
        content.target = '_blank';
      }

      api.classList(content, ['cw-bar__content']);
      api.style(content, { padding: `${props.paddingY} ${props.paddingX}` });

      content.innerHTML = props.content;

      const row = document.createElement('div');
      api.classList(row, ['cw-bar__row']);

      row.appendChild(content);

      if (props.hasCloseButton) {
        const buttonCloseWrapper = document.createElement('div');
        const buttonClose = document.createElement('button');

        buttonClose.setAttribute('aria-label', 'Close bar');
        buttonClose.type = 'button';
        buttonClose.innerHTML = '&times;';
        buttonClose.addEventListener('click', api.handleCloseClick);

        api.classList(buttonCloseWrapper, ['cw-bar__close']);
        api.style(buttonCloseWrapper, { paddingRight: props.paddingX });
        buttonCloseWrapper.appendChild(buttonClose);
        row.appendChild(buttonCloseWrapper);
      }

      container.appendChild(row);
      document.body.insertBefore(container, document.body.firstChild);

      if (props.isSticky) {
        const height = container.getBoundingClientRect().height;
        document.body.setAttribute('style', `margin-top: ${height}px`);
      }
    }
  };

  api.init();
})();