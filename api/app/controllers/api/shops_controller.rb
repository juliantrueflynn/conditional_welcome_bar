class Api::ShopsController < ApplicationController
  def create
    @shop = Shop.find_or_initialize_by_domain(params[:shopify_domain]) do |shop|
      shop.shopify_token = params[:shopify_token]
    end

    if @shop.save
      render 'api/shops/show'
    else
      render json: @shop.errors.full_messages, status: 422
    end
  end

  private

  def shop_params
    params.require(:shop).permit(:shopify_domain, :shopify_token)
  end
end
