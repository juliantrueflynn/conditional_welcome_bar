class ApplicationController < ActionController::Base
  # @TODO: Fix CSRF, this is temp commented out for omniauth
  # protect_from_forgery unless: -> { request.format.json? }

  def fallback_index_html
    render :file => 'public/index.html'
  end

  def shopify_client
    ShopifyClient::Configuration.instance
  end

  helper_method :shopify_client
end
