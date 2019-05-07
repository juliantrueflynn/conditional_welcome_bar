class ApiController < ApplicationController
  include ShopifyApp::EnsureShopOriginCookie
end
