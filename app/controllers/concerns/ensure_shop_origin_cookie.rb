# frozen_string_literal: true

module EnsureShopOriginCookie
  extend ActiveSupport::Concern

  included do
    around_action :shop_origin_cookie
  end

  def shop_origin_cookie(shop = nil)
    return if cookies[:shop_origin].present?
    return unless shop.present? || params[:shop].present?

    shop_origin = shop || params[:shop]
    cookies[:shop_origin] = { value: shop_origin }
  end
end
