# frozen_string_literal: true

class StaticPagesController < ApplicationController
  include ShopifyApp::EmbeddedApp
  include ShopifyApp::RequireKnownShop

  def show
    @shop_origin = current_shopify_domain
  end
end
