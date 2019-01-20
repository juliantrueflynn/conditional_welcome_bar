class Api::BarsController < ApplicationController
  before_action :set_bar, only: [:show, :update, :destroy]

  def index
    @bars = Bar.with_domain_name(params[:hostname])
  end

  def show
  end

  def update
  end

  def destroy
    if @bar && @bar.destroy
      render json: @bar
    else
      render json: ['not found']
    end
  end

  private

  def set_bar
    @bar = Bar.find_by(id: params[:id])
  end

  def bar_params
    params.require(:bar).permit(:id, :hostname)
  end
end
