class CallbackController < ApplicationController
  def create
    @shop = Shop.new(shopify_token: token, shopify_domain: shop_name)

    if @shop.save
      cookies[:shop_origin] = { value: params[:shop], httponly: true }

      session[:shop] = @shop
      session[:shopify_domain] = params[:shop]

      redirect_to root_url_with_query_string
    else
      render json: @shop.errors.full_messages, status: 422
    end
  end

  private

  def auth_hash
    request.env['omniauth.auth']
  end

  def shop_name
    auth_hash.uid
  end

  def token
    auth_hash['credentials']['token']
  end

  def root_url_with_query_string
    query_string = { shop: shop_name }.to_query
    "#{request.base_url}?#{query_string}"
  end
end
