# frozen_string_literal: true

class StaticPagesController < ApplicationController
  include ShopifyApp::Authenticated

  before_action :set_iframe_headers

  layout 'embedded_app'

  def show; end

  private

  def set_iframe_headers
    response.headers.except!('X-Frame-Options')
  end
end
