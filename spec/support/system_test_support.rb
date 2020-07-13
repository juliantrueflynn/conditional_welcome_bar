# frozen_string_literal: true

Capybara.register_driver :remote_chrome do |app|
  Capybara::Selenium::Driver.new(
    app,
    browser: :remote,
    desired_capabilities: {
      chromeOptions: {
        args: %w(
          headless
          disable-gpu
          no-sandbox
          enable-features=NetworkService,NetworkServiceInProcess
          disable-dev-shm-usage
        ),
        w3c: false,
      },
    },
    url: "http://#{Rails.configuration.x.selenium_host}:#{Rails.configuration.x.selenium_port}/wd/hub"
  )
end

Capybara.configure do |config|
  config.server = :puma, { Silent: true }
  config.default_max_wait_time = 10
  config.javascript_driver = :remote_chrome
  config.server_host = Rails.configuration.x.selenium_server_host
end

# Rails System test configuration.
RSpec.configure do |config|
  config.before(:each, type: :system) do
    driven_by :rack_test
    Capybara.app_host = "http://#{Capybara.server_host}:#{Capybara.server_port}"
  end

  config.before(:each, type: :system, js: true) do |example|
    driven_by Capybara.javascript_driver
  end
end
