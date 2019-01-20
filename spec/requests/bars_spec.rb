require 'rails_helper'
require 'support/shopify_test_helpers'

RSpec.configure do |c|
  c.include ShopifyTestHelpers
end

RSpec.describe "Bars", type: :request do
  describe "GET /bars" do
    before { login }

    it "works! (now write some real specs)" do
      get "#{ENV['API_URL']}/api/bars/jiffywelcomebar"
      expect(response).to have_http_status(200)
    end
  end
end
