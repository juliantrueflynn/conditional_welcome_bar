(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('append')) {
      return;
    }
    Object.defineProperty(item, 'append', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function append() {
        var argArr = Array.prototype.slice.call(arguments);
        var docFrag = document.createDocumentFragment();
        
        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(
            isNode ? argItem : document.createTextNode(String(argItem))
          );
        });
        
        this.appendChild(docFrag);
      }
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

(function () {
  const API_HOSTNAME = 'conditionalwelcomebar.ngrok.io';
  const API_URL = `https://${API_HOSTNAME}`;

  function createElement(selector, props) {
    const elem = document.createElement(selector);

    Object.keys(props).filter(key => props[key]).forEach((key) => {
      if (key === 'style') {
        style(elem, props.style);
      } else if (key === 'classList') {
        classList(elem, props.classList);
      } else {
        elem[key] = props[key];
      }
    });

    return elem;
  }

  function appendStylesheet() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = `//${API_HOSTNAME}/static/css/welcomeBar.css`;
    document.head.appendChild(link);
  }

  function style(node, styles) {
    return styles && Object.keys(styles)
      .filter(key => styles[key]).forEach((key) => {
        node.style[key] = styles[key];
      });
  }

  function classList(node, classNames) {
    return classNames && classNames.forEach((className) => {
      node.classList.add(className);
    });
  }

  function getCurrentTemplate() {
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
  }

  function getStorageKey(barId) {
    return `cw_bar_hide_${barId}_${getCurrentTemplate()}`;
  }

  const api = {
    bar: {},
    init: function () {
      appendStylesheet();

      api.fetchBarsIndex(function (res) {
        api.bar = api.getBarFromResponse(res);

        if (api.bar) {
          api.render(api.bar);
        }
      });
    },
    fetchBarsIndex: function (callback) {
      const xhr = new XMLHttpRequest();
    
      xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          const response = JSON.parse(this.responseText);
          callback(response);
        }
      };

      xhr.open('GET', `${API_URL}/api/active_bars/${window.Shopify.shop}`);
      xhr.send();
    },
    getBarFromResponse: function (response) {
      const bars = response.filter(function (bar) {
        const template = getCurrentTemplate();
        const isHidden = window.localStorage.getItem(getStorageKey(bar.id));

        return (
          (bar.pageTemplate === 'global' || bar.pageTemplate === template)
          && !isHidden
        );
      });

      return bars[0];
    },
    handleCloseClick: function (e) {
      const container = e.target.parentElement.parentElement.parentElement;
      container.style.display = 'none';

      if (api.bar.isSticky && api.bar.placement === 'top') {
        document.body.style.marginTop = 0;
      }

      window.localStorage.setItem(getStorageKey(api.bar.id), true);
    },
    render: function (props) {
      const image = props.backgroundImage;
      
      let imageSize = props.backgroundImageSizeX;
      if (props.backgroundImageSizeY) {
        imageSize += ` ${props.backgroundImageSizeY}`;
      }

      const container = createElement('div', {
        id: `cwBar${props.id}`,
        classList: [
          'cw-bar',
          `cw-bar__template-${getCurrentTemplate()}`,
          props.isSticky && 'cw-bar__fixed',
          props.isSticky && `cw-bar__fixed--${props.placement}`,
          props.backgroundImage && 'cw-bar__imageable',
          !!props.url && 'cw-bar__linkable', 
          !!props.url && props.isFullWidthLink && 'cw-bar__linkable--w-100', 
          !!props.url && !props.isFullWidthLink && 'cw-bar__linkable--w-auto',
        ],
        style: {
          fontSize: props.fontSize,
          color: props.textColor,
          textAlign: props.textAlign,
          backgroundColor: props.backgroundColor,
          backgroundImage: image && `url(${props.backgroundImage})`,
          backgroundRepeat: image && props.backgroundImageRepeat,
          backgroundPositionX: image && props.backgroundImagePositionX,
          backgroundPositionY: image && props.backgroundImagePositionY,
          backgroundSize: image && imageSize,
        }
      });

      const contentElSelector = props.url ? 'a' : 'div';
      const contentBody = createElement(contentElSelector, {
        style: { padding: `${props.paddingY} ${props.paddingX}` },
        classList: ['cw-bar__content'],
        href: props.url,
        target: props.isNewTablUrl,
      });

      const row = createElement('div', {
        classList: ['cw-bar__row'],
      });

      row.append(contentBody);

      if (props.hasCloseButton) {
        const buttonCloseWrapper = createElement('div', {
          classList: ['cw-bar__close'],
          style: { paddingRight: props.paddingX },
        });

        const buttonClose = createElement('button', {
          type: 'button',
          ariaLabel: 'Close bar',
          innerText: '\u00D7',
        });

        buttonClose.addEventListener('click', api.handleCloseClick);
        buttonCloseWrapper.append(buttonClose);
        row.append(buttonCloseWrapper);
      }

      contentBody.append(props.content);
      container.append(row);
      document.body.insertBefore(container, document.body.firstChild);

      if (props.isSticky) {
        const height = container.getBoundingClientRect().height;
        document.body.style.marginTop = `${height}px`;
      }
    }
  };

  api.init();
})();
