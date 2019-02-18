class Api::SessionsController < ApplicationController
  def show
    shop = Shop.find_by_shopify_domain(params[:shop_domain])

    if shop
      @session = Auth.issue({ shop: shop.id })
      render 'api/sessions/show'
    else
      render json: ['not found'], status: 404
    end
  end
end
