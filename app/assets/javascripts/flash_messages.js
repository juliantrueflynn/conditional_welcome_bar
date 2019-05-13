document.addEventListener('DOMContentLoaded', function flash() {
  var flashElement = document.getElementById('shopify-app-flash');

  if (flashElement) {
    var flash = JSON.parse(flashElement.dataset.flash);

    if (flash.notice) {
      ShopifyApp.flashNotice(flash.notice);
    }

    if (flash.error) {
      ShopifyApp.flashError(flash.error);
    }

    document.removeEventListener('DOMContentLoaded', flash);
  }
});
