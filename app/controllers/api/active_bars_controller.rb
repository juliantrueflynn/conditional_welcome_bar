class Api::ActiveBarsController < ApplicationController
  def index
    shop = Shop.by_domain_name(params[:hostname])
    @active_bars = shop.bars.with_active
  end
end
