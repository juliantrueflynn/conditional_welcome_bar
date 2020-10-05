# frozen_string_literal: true

require "capybara/rspec"
require "selenium/webdriver"

app_config = Rails.configuration.x

Capybara.register_driver :remote_chrome do |app|
  Capybara::Selenium::Driver.new(
    app,
    browser: :remote,
    desired_capabilities: {
      chromeOptions: {
        args: %w[
          headless
          disable-gpu
          no-sandbox
          enable-features=NetworkService,NetworkServiceInProcess
          disable-dev-shm-usage
        ],
        w3c: false
      }
    },
    url: "http://#{app_config.selenium_host}:#{app_config.selenium_port}/wd/hub"
  )
end

Capybara.configure do |config|
  config.server = :puma, { Silent: true }
  config.default_max_wait_time = app_config.capybara_max_wait_time
  config.javascript_driver = :remote_chrome
  config.server_host = app_config.selenium_server_host
  config.server_port = 21_001
end

RSpec.configure do |config|
  config.before(:each, type: :system) do
    driven_by :rack_test
    Capybara.app_host = "http://#{Capybara.server_host}:#{Capybara.server_port}"
  end

  config.before(:each, type: :system, js: true) do
    driven_by Capybara.javascript_driver
  end
end
