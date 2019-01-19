ShopifyApp.configure do |config|
  config.application_name = "Conditional Welcome Bar"
  config.api_key = ENV['SHOPIFY_CLIENT_API_KEY']
  config.secret = ENV['SHOPIFY_CLIENT_API_SECRET']
  config.scope = 'read_script_tags, write_script_tags'
  config.embedded_app = true
  config.after_authenticate_job = false
  config.session_repository = Shop
end
