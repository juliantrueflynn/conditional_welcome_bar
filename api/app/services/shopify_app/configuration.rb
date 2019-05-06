module ShopifyApp
  class Configuration
    include Singleton

    attr_accessor :api_key
    attr_accessor :secret
    attr_accessor :scope
    attr_accessor :scripttags
    attr_accessor :api_version

    # customise ActiveJob queue names
    attr_accessor :scripttags_manager_queue_name

    def initialize
      @api_key = ENV['SHOPIFY_CLIENT_KEY']
      @secret = ENV['SHOPIFY_CLIENT_SECRET']
      @scope = ENV['SHOPIFY_API_SCOPE']
      @api_version = :unstable
      @scripttags_manager_queue_name = Rails.application.config.active_job.queue_name
    end

    def has_scripttags?
      scripttags.present?
    end

    def self.configuration
      @configuration ||= ShopifyClient.new
    end

    def self.configuration=(config)
      @configuration = config
    end
  end
end