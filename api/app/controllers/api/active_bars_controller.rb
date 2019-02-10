class Api::ActiveBarsController < ApplicationController
  def index
    @active_bars = Bar.with_active.with_shopify_domain(params[:shop_domain])
  end
end
