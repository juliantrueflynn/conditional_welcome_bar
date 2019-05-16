class Api::ShopsController < ApplicationController
  include ShopifyApp::Authenticate
  include ShopifyApp::EnsureShopOriginCookie

  def show
    @shop = Shop.find_by_shopify_domain(params[:shopify_domain])
    set_shop_origin_cookie(params[:shopify_domain]) unless @shop.nil?

    render 'api/shops/show'
  end
end
