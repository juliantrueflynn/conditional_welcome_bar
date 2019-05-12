require 'rails_helper'

RSpec.describe 'ActiveBars', type: :request do
  describe "GET /api/active_bars/:shop_domain" do
    before do
      FactoryBot.create(:bar)
      get "#{ENV['API_URL']}/api/active_bars/jiffywelcomebar"
    end

    it 'show resource' do
      expect(response).to have_http_status(200)
    end
  end
end
