document.addEventListener('DOMContentLoaded', function flash() {
  var flashElement = document.getElementById('shopify-app-flash');

  if (flashElement) {
    var flashJSON = JSON.parse(flashElement.dataset.flash);

    if (flash.notice) {
      window.ShopifyApp.flashNotice(flashJSON.notice);
    }

    if (flash.error) {
      window.ShopifyApp.flashError(flashJSON.error);
    }

    document.removeEventListener('DOMContentLoaded', flash);
  }
});
