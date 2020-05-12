# frozen_string_literal: true

ShopifyApp.configure do |config|
  config.application_name = ENV.fetch("SHOPIFY_APP_NAME", "Conditional Welcome Bar")
  config.api_key = ENV.fetch("SHOPIFY_API_KEY", nil)
  config.secret = ENV.fetch("SHOPIFY_API_SECRET", nil)
  config.scope = ENV.fetch("SHOPIFY_API_SCOPE", "write_script_tags")
  config.embedded_app = true
  config.after_authenticate_job = false
  config.api_version = ENV.fetch("SHOPIFY_API_VERSION", "2020-04")
  config.shop_session_repository = "Shop"
  config.enable_same_site_none = Rails.env.production?
  config.scripttags = [{
    event: "onload",
    src: ENV.fetch("SHOPIFY_SCRIPT_TAGS_SRC", "#{Rails.configuration.x.app_host}/welcome_bar.js")
  }]
end
