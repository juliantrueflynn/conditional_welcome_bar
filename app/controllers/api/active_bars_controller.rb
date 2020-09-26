# frozen_string_literal: true

module Api
  class ActiveBarsController < ApplicationController
    before_action :set_bar

    def show
      render json: json_data
    end

    private

    def json_data
      {
        render_html: render_to_string(:show, layout: false),
        styles_html: render_to_string(partial: "api/active_bars/styles", locals: { bar: @bar }),
        scripts_paths: [helpers.asset_url("welcome_bar/listeners.js")],
      }.transform_keys { |key| key.to_s.camelize(:lower) }
    end

    def set_bar
      @bar = Shop.find_by(shopify_domain: params[:shop]).bars.with_active.take
    end
  end
end
