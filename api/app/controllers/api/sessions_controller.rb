class Api::SessionsController < ApplicationController
  skip_before_action :authenticate, only: :create

  def create
    @shop = Shop.by_domain_name(params[:shop])

    if @shop
      jwt = Auth.issue({ shop: @shop.id })
      cookies.signed[:jwt] = {
        value: jwt,
        httponly: true,
        expires: 1.day.from_now
      }
      render 'api/sessions/show'
    else
      render json: ['incorrect email or password'], status: 404
    end
  end

  private

  def auth_params
    params.require(:session).permit(:shop)
  end
end
