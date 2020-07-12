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

    activate_shop_session_and_clear!

    if shop_record.present?
      Rails.logger.info "Shop session initialized id:#{shop_record.id}, domain:#{shop_record.domain}"
    else
      Rails.logger.warn "No shop session found for domain #{current_shopify_session.domain}"
    end

    shop_record
  end

  private

  def shop_record
    @_shop_record ||= Shop.find_by(shopify_domain: current_shopify_session.domain)
  end

  def activate_shop_session_and_clear!
    begin
      ShopifyAPI::Base.activate_session current_shopify_session
    ensure
      ShopifyAPI::Base.clear_session
    end
  end

  def current_shopify_session
    @_current_shopify_session ||= begin
      return if @session_params[:shop_id].blank? || @session_params[:shop_id].blank?

      ShopifyApp::SessionRepository.retrieve_shop_session @session_params[:shop_id]
    end
  end
end
