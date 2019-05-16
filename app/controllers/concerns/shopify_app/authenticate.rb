module ShopifyApp
  module Authenticate
    extend ActiveSupport::Concern

    included do
      include ShopifyApp::Localization
      include ShopifyApp::EnsureLoggedIn
      include ShopifyApp::EmbeddedApp
      before_action :login_again_if_different_shop
      around_action :shopify_session
    end
  end
end
