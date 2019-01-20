class Api::BarsController < ApplicationController
  def index
    @bars = Bar.with_domain_name(params[:shopify_domain])
  end

  def show
  end

  def update
  end

  def destroy
  end
end
