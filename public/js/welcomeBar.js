const { shop } = window.Shopify || {};
const apiHostname = 'conditionalwelcomebar.ngrok.io';
console.log(shop);

appendStylesheet(`https://${apiHostname}/css/welcomeBar.css`);

// TODO: Model: fetch rails api

// TODO: Controller: set conditional vars for view

// TODO: View: set HTML from controller

function appendStylesheet(hrefPathname) {
  const head = document.getElementsByTagName('head')[0];
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = hrefPathname;

  head.appendChild(link);
}