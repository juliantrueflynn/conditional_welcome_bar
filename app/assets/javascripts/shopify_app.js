document.addEventListener('DOMContentLoaded', function() {
  var appElement = document.getElementById('shopify-app-init');

  if (appElement) {
    var data = appElement.dataset;
    ShopifyApp.init({
      apiKey: data.apiKey,
      shopOrigin: data.shopOrigin,
      debug: data.debug === 'true',
      forceRedirect: true
    });
  }
});
