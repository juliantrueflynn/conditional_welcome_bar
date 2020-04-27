# frozen_string_literal: true

ShopifyApp.configure do |config|
  config.application_name = "Conditional Welcome Bar"
  config.api_key = ENV["SHOPIFY_CLIENT_KEY"]
  config.secret = ENV["SHOPIFY_CLIENT_SECRET"]
  config.scope = ENV["SHOPIFY_API_SCOPE"]
  config.embedded_app = true
  config.session_repository = Shop
  config.api_version = :unstable
  config.scripttags = [{
    event: "onload",
    src: "#{ENV['APP_HOST_URL']}/welcome_bar.js"
  }]
end
