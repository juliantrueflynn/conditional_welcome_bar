# frozen_string_literal: true

# Returns validated Shop instance from session, also activates session while fetching.
#
# Takes logic from ShopifyApp::LoginProtection concern to be used as service.
# This allows for easier GraphQL use where there's custom authentication outside of controllers.
class ShopSessionFinderService
  def initialize(session_params)
    @session_params = session_params
  end

  def self.call(session_params)
    new(session_params).call
  end

  def call
    return if current_shopify_session.blank?

    begin
      ShopifyAPI::Base.activate_session current_shopify_session
    ensure
      ShopifyAPI::Base.clear_session
    end

    Shop.find_by(shopify_domain: current_shopify_session.domain)
  end

  private

  def current_shopify_session
    @_current_shopify_session ||= begin
      return if @session_params[:shop_id].blank? || @session_params[:shop_id].blank?

      ShopifyApp::SessionRepository.retrieve_shop_session @session_params[:shop_id]
    end
  end
end
