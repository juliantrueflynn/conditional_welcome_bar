class Api::ActiveBarsController < ApplicationController
  def index
    shop = Shop.find_by_shopify_domain(params[:shop])

    if shop
      @active_bars = Bar.with_active.with_shopify_domain(params[:shop])
      render 'api/active_bars/index'
    else
      render json: { status: 404, message: 'not found', data: nil }, status: 404
    end
  end
end
