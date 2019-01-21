class Api::ActiveBarsController < ApplicationController
  def index
    @active_bars = Bar.with_active.with_domain_name(params[:hostname])
  end
end
