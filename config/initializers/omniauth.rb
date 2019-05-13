Rails.application.config.middleware.use OmniAuth::Builder do
  provider :shopify,
    ENV['SHOPIFY_CLIENT_KEY'],
    ENV['SHOPIFY_CLIENT_SECRET'],
    scope: ENV['SHOPIFY_API_SCOPE'],
    callback_url: "#{ENV['APP_HOST_URL']}/auth/shopify/callback"
end

OmniAuth.config.logger = Rails.logger
