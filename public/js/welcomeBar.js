const { shop } = window.Shopify || {};
const apiHostname = 'conditionalwelcomebar.ngrok.io';
const apiUrl = `https://${apiHostname}/api`;
const shopDomain = shop.replace('.myshopify.com', '');

appendStylesheet(`//${apiHostname}/css/welcomeBar.css`);

insertWelcomeBar();

fetchBarsIndex();

function getCurrentTemplate() {
  const path = window.location.pathname;
  let template;

  if (path === '/') {
    template = 'homepage';
  } else if (path === '/cart') {
    template = 'cart';
  } else if (path.indexOf('/products/') !== -1) {
    template = 'product';
  } else if (path.indexOf('/collections/') !== -1) {
    template = 'collection';
  }

  return template;
}

function fetchBarsIndex() {
  const request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      const response = JSON.parse(this.responseText);
      const bar = getBarFromResponse(response);
    }
  };

  request.open('GET', `${apiUrl}/shops/${shopDomain}/active_bars`);
  request.send();
}

function getBarFromResponse(response) {
  const template = getCurrentTemplate();

  const bars = response.filter(({ templateEnabled }) => (
    templateEnabled === 'global' || templateEnabled === template
  ));

  console.log(bars);
  console.log(bars[0]);

  return bars[0];
}

function insertWelcomeBar() {
  const body = document.getElementsByTagName('body')[0];
  const bar = document.createElement('div');
  bar.classList.add('cw-bar');
  bar.innerHTML = 'WELCOME BAR HERE';
  body.insertBefore(bar, body.firstChild);
}

function appendStylesheet(hrefPathname) {
  const head = document.getElementsByTagName('head')[0];
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = hrefPathname;

  head.appendChild(link);
}