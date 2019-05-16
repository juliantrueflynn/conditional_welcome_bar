require 'rails_helper'

RSpec.describe 'ActiveBars', type: :request do
  describe "#index" do
    before(:each) { @shop = create(:shop_with_bars) }

    context 'when resource is found' do
      it 'responds with 200' do
        get "/api/active_bars/#{@shop.shopify_domain}"
        expect(response).to have_http_status(200)
      end

      it 'shows JSON resource' do
        get "/api/active_bars/#{@shop.shopify_domain}"
        expect(response.content_type).to eq('application/json')
        expect(JSON.parse(response.body)['status']).to eq(200)
        expect(JSON.parse(response.body)['data']['bars']).to eq([])
      end
    end

    context 'when resource is not found' do
      it 'responds with 404' do
        get '/api/active_bars/not-found-shop.myshopify.com'
        expect(response).to have_http_status(404)
        expect(response.content_type).to eq('application/json')
      end
    end

    describe 'displays only #active bars' do
      it 'has 1 #active bar' do
        @shop.bars.first.update_column(:is_active, true)
        get "/api/active_bars/#{@shop.shopify_domain}"
        expect(JSON.parse(response.body)['data']['bars'].length).to eq(1)
      end
    end
  end
end
