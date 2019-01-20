const { shop } = window.Shopify || {};
const apiHostname = 'conditionalwelcomebar.ngrok.io';

appendStylesheet(`https://${apiHostname}/css/welcomeBar.css`);

insertWelcomeBar();

// TODO: Model: fetch rails api

// TODO: Controller: set conditional vars for view

// TODO: View: set HTML from controller

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
