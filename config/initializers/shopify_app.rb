# frozen_string_literal: true

require "shopify_scripttag_src"

ShopifyApp.configure do |config|
  config.application_name = Rails.configuration.x.shopify.application_name
  config.api_key = Rails.configuration.x.shopify.api_key
  config.secret = Rails.configuration.x.shopify.secret
  config.scope = Rails.configuration.x.shopify.scope
  config.embedded_app = true
  config.after_authenticate_job = false
  config.api_version = Rails.configuration.x.shopify.api_version
  config.shop_session_repository = "Shop"
  config.allow_jwt_authentication = true
  config.enable_same_site_none = Rails.env.production?
  config.scripttags = [
    {
      event: "onload",
      src: ShopifyScripttagSrc
    }
  ]
end
