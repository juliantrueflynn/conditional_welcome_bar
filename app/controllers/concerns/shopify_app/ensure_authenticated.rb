module ShopifyApp
  module EnsureAuthenticated
    extend ActiveSupport::Concern

    included do
      include ShopifyApp::Localization
      include ShopifyApp::EnsureLoggedIn
      include ShopifyApp::EmbeddedApp
      before_action :login_again_if_different_shop
      around_action :set_shop_session
    end

    def set_shop_session
      unless has_shop_session?
        render json: { status: 302, location: login_url }
        return
      end

      clear_top_level_oauth_cookie

      begin
        ShopifyAPI::Base.activate_session(shop_session)
        yield
      ensure
        ShopifyAPI::Base.clear_session
      end
    end

    def has_shop_session?
      return unless session[:shopify]
      @shop_session ||= ShopifyApp::SessionRepository.retrieve(session[:shopify])
    end
  end
end
