require 'rails_helper'

RSpec.describe 'Shops', type: :request do
  describe '#show' do
    before(:each) { @shop = create(:shop) }

    context 'with authorization' do
      it 'gives JSON 200 status response' do
        login(@shop)
        get "/api/shops/#{@shop.shopify_domain}"
        expect(JSON.parse(response.body)['status']).to eq(200)
      end

      it 'restricts access to current user shopify domain' do
        login(@shop)
        get '/api/shops/not-users-shopify-domain.myshopify.com'
        expect(response).to have_http_status(404)
        expect(JSON.parse(response.body)['status']).to eq(404)
      end
    end

    context 'without authorization' do
      it 'tells user to redirect' do
        get "/api/shops/#{@shop.shopify_domain}"
        expect(JSON.parse(response.body)['status']).to eq(302)
      end
    end

    it 'sets csrf cookie' do
      get "/api/shops/#{@shop.shopify_domain}"
      expect(response.cookies['cwb_csrf']).to_not be_nil
    end
  end
end
