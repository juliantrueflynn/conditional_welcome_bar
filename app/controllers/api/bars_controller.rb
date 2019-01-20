class Api::BarsController < ApplicationController
  def index
    @bars = Bar.with_domain_name(params[:hostname])
  end

  def show
  end

  def update
  end

  def destroy
  end

  private

  def bar_params
    params.require(:bar).permit(:id, :hostname)
  end
end
