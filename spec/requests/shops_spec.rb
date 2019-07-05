require 'rails_helper'

RSpec.describe 'Shops', type: :request do
  describe '#show' do
    subject(:shop) { create(:shop) }

    context 'with authorization' do
      before { login(shop) }

      it 'gives JSON 200 status response' do
        get "/api/shops/#{shop.shopify_domain}"
        expect(JSON.parse(response.body)['status']).to eq(200)
      end

      it 'restricts access to current user shopify domain' do
        get '/api/shops/not-users-shopify-domain.myshopify.com'
        expect(response).to have_http_status(404)
      end
    end

    context 'without authorization' do
      it '302 status code' do
        get "/api/shops/#{shop.shopify_domain}"
        expect(response).to have_http_status(302)
      end
    end
  end
end
