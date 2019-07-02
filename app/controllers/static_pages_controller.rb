class StaticPagesController < ApplicationController
  include ShopifyApp::Authenticate
  include EnsureShopOriginCookie

  layout "embedded_app"

  def show
    response.headers.except!('X-Frame-Options')
  end
end
