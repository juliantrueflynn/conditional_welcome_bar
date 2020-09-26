# frozen_string_literal: true

ShopifyApp.configure do |config|
  config.application_name = ENV.fetch("SHOPIFY_APP_NAME", "Conditional Welcome Bar")
  config.api_key = Rails.configuration.x.shopify.api_key
  config.secret = Rails.configuration.x.shopify.secret
  config.scope = Rails.configuration.x.shopify.scope
  config.embedded_app = true
  config.after_authenticate_job = false
  config.api_version = Rails.configuration.x.shopify.api_version
  config.shop_session_repository = "Shop"
  config.enable_same_site_none = Rails.env.production?
  config.scripttags = [{
    event: "onload",
    src: ENV.fetch("SHOPIFY_SCRIPT_TAGS_SRC", "#{Rails.configuration.x.app_host}/welcome_bar.js")
  }]
end
