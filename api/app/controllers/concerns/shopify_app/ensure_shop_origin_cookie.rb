module ShopifyApp
  module EnsureShopOriginCookie
    extend ActiveSupport::Concern

    included do
      before_action :set_shop_origin_cookie
    end

    def set_shop_origin_cookie
      return if cookies[:shop_origin].present? || params[:shop].blank?
      cookies[:shop_origin] = { value: params[:shop] }
    end
  end
end