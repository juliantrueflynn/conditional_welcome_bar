# frozen_string_literal: true

module Api
  class ActiveBarsController < ApplicationController
    before_action :set_bar

    def show
      render json: {
        data: json_data
      }
    end

    private

    def json_data
      return if @bar.blank?

      {
        html_welcome_bar: render_to_string(:show, layout: false),
        html_styles: render_to_string(partial: "api/active_bars/styles", locals: { bar: @bar }),
        scripts_paths: [helpers.asset_url("welcome_bar/listeners.js")]
      }.transform_keys { |key| key.to_s.camelize(:lower) }
    end

    def set_bar
      @bar = shop.bars.with_active.take if shop
    end

    def shop
      @_shop ||= Shop.find_by(shopify_domain: params[:shop])
    end
  end
end
