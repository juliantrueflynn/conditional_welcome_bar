class SessionsController < ApplicationController
  def create
    shop = Shop.find_by_shopify_domain(params[:shop])
    session['shopify.omniauth_params'] = { shop: params[:shop] }

    if shop
      session[:shop] = shop
      session[:shopify_domain] = params[:shop]
    else
      redirect_to '/auth/shopify'
    end
  end
end
