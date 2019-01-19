class HomeController < ShopifyApp::AuthenticatedController
  def index
    @webhooks = ShopifyAPI::Webhook.find(:all)
  end
end
