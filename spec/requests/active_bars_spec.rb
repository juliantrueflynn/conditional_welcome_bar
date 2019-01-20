require 'rails_helper'
require 'support/shopify_test_helpers'

RSpec.configure do |c|
  c.include ShopifyTestHelpers
end

RSpec.describe 'ActiveBars', type: :request do
  describe "GET /api/shop/:hostname/active_bars" do
    before do
      login
      bar = FactoryBot.create(:bar)
      get "#{ENV['API_URL']}/api/shops/jiffywelcomebar/active_bars"
    end

    it 'show resource' do
      expect(response).to have_http_status(200)
    end
  end
end
