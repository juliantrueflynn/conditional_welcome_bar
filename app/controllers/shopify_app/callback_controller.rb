# frozen_string_literal: true

module ShopifyApp
  # Performs login after OAuth completes
  class CallbackController < ActionController::Base
    include ShopifyApp::LoginProtection
    include EnsureShopOriginCookie

    def callback
      if auth_hash
        login_shop
        install_scripttags

        shop_origin_cookie

        redirect_to return_address
      else
        flash[:error] = I18n.t('could_not_log_in')
        redirect_to(login_url_with_optional_shop)
      end
    end

    private

    def login_shop
      reset_session_options
      set_shopify_session
    end

    def auth_hash
      request.env['omniauth.auth']
    end

    def shop_name
      auth_hash.uid
    end

    def associated_user
      return unless auth_hash['extra'].present?

      auth_hash['extra']['associated_user']
    end

    def token
      auth_hash['credentials']['token']
    end

    def reset_session_options
      request.session_options[:renew] = true
      session.delete(:_csrf_token)
    end

    def set_shopify_session
      session_store = ShopifyAPI::Session.new(
        domain: shop_name,
        token: token,
        api_version: ShopifyApp.configuration.api_version
      )

      session[:shopify] = ShopifyApp::SessionRepository.store(session_store)
      session[:shopify_domain] = shop_name
      session[:shopify_user] = associated_user
    end

    def install_scripttags
      return unless ShopifyApp.configuration.has_scripttags?

      ScripttagsManager.queue(
        shop_name,
        token,
        ShopifyApp.configuration.scripttags
      )
    end
  end
end
