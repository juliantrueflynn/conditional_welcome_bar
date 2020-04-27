# frozen_string_literal: true

module ShopifyAuthSupport
  def login(shop)
    OmniAuth.config.test_mode = true
    OmniAuth.config.add_mock(:shopify, auth_mock_attributes(shop))

    auth = OmniAuth.config.mock_auth[:shopify]
    Rails.application.env_config["omniauth.auth"] = auth

    get "/auth/shopify"
    follow_redirect!
    follow_redirect!
  end

  def auth_mock_attributes(shop)
    {
      provider: "shopify",
      uid: shop.shopify_domain,
      credentials: { token: shop.shopify_token }
    }
  end
end
