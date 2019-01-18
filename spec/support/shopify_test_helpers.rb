module ShopifyTestHelpers
  def login
    OmniAuth.config.test_mode = true
    OmniAuth.config.add_mock(
      :shopify,
      uid: 'jiffywelcomebar',
      provider: 'shopify',
      credentials: { token: 'token' },
      callback_url: ENV['API_URL'] + '/auth/shopify/callback',
    )
    Rails.application.env_config['omniauth.auth'] = OmniAuth.config.mock_auth[:shopify]

    get '/auth/shopify'
  end
end
