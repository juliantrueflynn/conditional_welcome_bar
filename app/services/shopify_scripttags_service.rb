# frozen_string_literal: true

class ShopifyScripttagsService
  BASE_PATH = "/shopify/welcome_bar"

  def initialize(domain)
    @domain = domain
  end

  def self.call(domain = nil)
    new(domain).call
  end

  def call
    [
      {
        event: "onload",
        src: ActionController::Base.helpers.javascript_url("#{BASE_PATH}?#{query_string}", host: host)
      }
    ]
  end

  private

  def query_string
    params = {}.tap do |hash|
      hash[:cwb_api_host] = host
      hash[:domain] = @domain
      hash.compact!
    end

    params.to_query
  end

  def host
    Rails.configuration.x.app_host
  end
end
