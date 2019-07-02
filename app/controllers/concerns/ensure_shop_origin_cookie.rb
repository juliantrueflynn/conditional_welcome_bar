
module EnsureShopOriginCookie
  extend ActiveSupport::Concern

  included do
    before_action :set_shop_origin_cookie
  end

  def set_shop_origin_cookie(shop = nil)
    return if cookies[:shop_origin].present?
    return unless shop.present? || params[:shop].present?
    shop_origin = shop || params[:shop]
    cookies[:shop_origin] = { value: shop_origin }
  end

  def has_shop_param_or_cookie?
    cookies[:shop_origin].present? || params[:shop].blank?
  end
end
