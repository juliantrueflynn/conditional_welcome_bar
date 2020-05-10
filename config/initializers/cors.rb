# frozen_string_literal: true

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "*"
    resource "/api/active_bars/*", headers: :any, methods: %i[get options head]
  end

  allow do
    origins Rails.configuration.x.cors_origins
    resource "*", headers: :any, methods: %i[get post put patch delete options head]
  end
end
