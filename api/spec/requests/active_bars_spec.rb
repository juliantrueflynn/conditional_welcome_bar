require 'rails_helper'

RSpec.describe 'ActiveBars', type: :request do
  describe "GET /api/shop/:hostname/active_bars" do
    before do
      bar = FactoryBot.create(:bar)
      get "#{ENV['API_URL']}/api/shops/jiffywelcomebar/active_bars"
    end

    it 'show resource' do
      expect(response).to have_http_status(200)
    end
  end
end
