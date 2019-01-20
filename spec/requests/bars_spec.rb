require 'rails_helper'
require 'support/shopify_test_helpers'

RSpec.configure do |c|
  c.include ShopifyTestHelpers
end

RSpec.describe 'Bars', type: :request do
  describe "GET /bars" do
    before { login }

    it 'responds with 200' do
      get "#{ENV['API_URL']}/api/bars/jiffywelcomebar"
      expect(response).to have_http_status(200)
    end
  end

  describe "GET /bar/:id" do
    before do
      login
      bar = FactoryBot.create(:bar)
      get "#{ENV['API_URL']}/api/bars/#{bar.id}"
    end

    it 'show resource' do
      expect(response).to have_http_status(200)
    end
  end

  describe "DELETE /bar/:id" do
    let!(:bar) { FactoryBot.create(:bar) }

    it 'change count' do
      destroy_api_url = "#{ENV['API_URL']}/api/bars/#{bar.id}"
      expect { delete destroy_api_url }.to change { Bar.count }.by(-1)
    end
  end
end
