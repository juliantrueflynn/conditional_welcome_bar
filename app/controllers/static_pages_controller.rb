# frozen_string_literal: true

class StaticPagesController < ApplicationController
  include ShopifyApp::Authenticated

  layout "embedded_app"

  def show
    response.headers.except!("X-Frame-Options")
  end
end
