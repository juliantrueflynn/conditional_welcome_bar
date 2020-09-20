# frozen_string_literal: true

module Api
  class ActiveBarsController < ApplicationController
    def show
      @active_bars = Shop.find_by(shopify_domain: params[:shop]).bars.with_active

      render json: { data: @active_bars }
    end
  end
end
