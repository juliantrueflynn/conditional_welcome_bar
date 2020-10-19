# frozen_string_literal: true

# Returns validated Shop instance from session, also activates session while fetching.
#
# Takes logic from ShopifyApp::LoginProtection concern to be used as service.
# This allows for easier GraphQL use where there's custom authentication outside of controllers.
class ShopSessionFinder
  def self.call(request_env: nil, session: nil)
    new(request_env: request_env, session: session).call
  end

  def initialize(request_env:, session:)
    @request_env = request_env || {}
    @session = session || {}
  end

  def call
    return if current_shopify_session.blank?

    activate_shop_session_and_clear!
    log_session_result

    shop_record
  end

  private

  def shop_record
    @_shop_record ||= Shop.find_by(shopify_domain: current_shopify_session.domain)
  end

  def activate_shop_session_and_clear!
    ShopifyAPI::Base.activate_session current_shopify_session
  ensure
    ShopifyAPI::Base.clear_session
  end

  def log_session_result
    if shop_record.present?
      Rails.logger.info "Shop session initialized id:#{shop_record.id}, domain:#{shop_record.domain}"
    else
      Rails.logger.warn "No shop session found for domain #{current_shopify_session.domain}"
    end
  end

  def current_shopify_session
    @_current_shopify_session ||= begin
      if shopify_domain.present?
        ShopifyApp::SessionRepository.retrieve_shop_session_by_shopify_domain(shopify_domain)
      elsif shop_id.present?
        ShopifyApp::SessionRepository.retrieve_shop_session(shop_id)
      end
    end
  end

  def shop_id
    @session["shop_id"]
  end

  def shopify_domain
    @request_env["jwt.shopify_domain"].presence || @session["shopify_domain"]
  end
end
