class Api::ShopsController < ApplicationController
  include ShopifyApp::Authenticated
  include EnsureShopOriginCookie

  def show
    @shop = Shop.find_by_shopify_domain(params[:shopify_domain])

    if @shop
      set_shop_origin_cookie(params[:shopify_domain])

      render json: { status: 200 }
    else
      render json: { status: 404, message: 'not found' }, status: 404
    end
  end
end
