# frozen_string_literal: true

module ShopifyAuthSupport
  def authorize_shopify!(shop)
    mock_shopify_omniauth shop
    get "/auth/shopify"
    follow_redirect!
  end

  def mock_shopify_omniauth(shop)
    credentials = { token: shop.shopify_token }
    OmniAuth.config.add_mock :shopify, provider: "shopify", uid: shop.shopify_domain, credentials: credentials
    Rails.application.env_config["omniauth.auth"] = OmniAuth.config.mock_auth[:shopify]
  end
end
