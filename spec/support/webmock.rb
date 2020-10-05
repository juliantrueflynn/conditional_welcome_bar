# frozen_string_literal: true

require "webmock/rspec"

RSpec.configure do |config|
  allowed_hosts = %w[web selenium unix]

  config.before(:suite) do
    WebMock.disable_net_connect! allow: allowed_hosts, allow_localhost: true
  end
end
