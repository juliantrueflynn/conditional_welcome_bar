# frozen_string_literal: true

require_relative "boot"

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "action_controller/railtie"
# require "action_mailer/railtie"
require "action_view/railtie"
# require "action_cable/engine"
require "sprockets/railtie"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ConditionalWelcomeBar
  class Application < Rails::Application
    config.load_defaults 6.0

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    config.x.app_host = ENV.fetch("APP_HOST", "https://conditionalwelcomebar.ngrok.io")
    config.x.cors_origins = ENV.fetch("CORS_ORIGINS", "https://conditionalwelcomebar.ngrok.io").split(",").map(&:strip)

    config.x.shopify = ActiveSupport::OrderedOptions.new.tap do |option|
      option.force_redirect = ENV.fetch("SHOPIFY_FORCE_REDIRECT", "true") == "true"
      option.debug_mode = ENV.fetch("SHOPIFY_DEBUG_MODE", "false") == "true"
    end

    config.x.selenium_host = ENV.fetch("SELENIUM_HOST", "selenium")
    config.x.selenium_port = ENV.fetch("SELENIUM_PORT", "4444")
    config.x.selenium_server_host = ENV.fetch("SELENIUM_SERVER_HOST", "web")
  end
end
