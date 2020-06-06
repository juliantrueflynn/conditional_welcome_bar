# frozen_string_literal: true

Rails.application.configure do
  config.lograge.enabled = true
  # Store the lograge JSON files in a separate file
  config.lograge.keep_original_rails_log = true
  # Don't use the Logstash formatter since this requires logstash-event, an
  # unmaintained gem that monkey patches `Time`
  config.lograge.formatter = Lograge::Formatters::Json.new
  # Expecting this app to be run in Docker only.
  config.lograge.logger = ActiveSupport::Logger.new("/proc/1/fd/1")

  config.lograge.custom_options = lambda do |event|
    exceptions = %w[controller action format]
    params = event.payload[:params]
                  .except(*exceptions)
                  .each_pair
                  .map { |k, v| { key: k, value: v } }

    {
      time: Time.now.utc.iso8601(3),
      params: params,
      remote_ip: event.payload[:remote_ip],
      ua: event.payload[:ua]
    }
  end
end
