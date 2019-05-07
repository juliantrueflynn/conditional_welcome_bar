class Api::ActiveBarsController < ApiController
  def index
    @active_bars = Bar.with_active.with_shopify_domain(params[:shop])
  end
end
