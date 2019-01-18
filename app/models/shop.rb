class Shop < ActiveRecord::Base
  include ShopifyApp::SessionStorage

  has_many :bars
end
