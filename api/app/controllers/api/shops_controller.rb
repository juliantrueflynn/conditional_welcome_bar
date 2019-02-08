class Api::ShopsController < ApplicationController
  # skip_before_action :authenticate, only: :create

  def create
    @shop = Shop.find_or_initialize_by(shop_params)

    if @shop.save
      # jwt = Auth.issue({ shop: @shop.id })
      # cookies.signed[:jwt] = {
      #   value: jwt,
      #   httponly: true,
      #   expires: 1.day.from_now
      # }
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
