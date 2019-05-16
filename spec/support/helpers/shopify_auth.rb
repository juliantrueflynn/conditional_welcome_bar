module Helpers
  module ShopifyAuth
    def login(shop)
      OmniAuth.config.test_mode = true
      OmniAuth.config.add_mock(
        :shopify,
          provider: 'shopify',
          uid: shop.shopify_domain,
          credentials: { token: shop.shopify_token })
      Rails.application.env_config['omniauth.auth'] = OmniAuth.config.mock_auth[:shopify]
    
      get '/auth/shopify'
      follow_redirect!
      follow_redirect!
    end
  end
end