require 'rails_helper'

RSpec.describe 'Shops', type: :request do
  describe 'CREATE /shop' do
    let!(:path) { "#{ENV['API_URL']}/api/shop" }

    it 'when valid attributes' do
      expect {
        shop = FactoryBot.attributes_for(:shop)
        post path, params: shop
      }.to change(Shop, :count).by(1)
    end

    it 'when not valid attributes' do
      expect {
        invalid_params = { shop: { shopify_domain: nil } }
        post path, params: invalid_params
      }.to_not change(Shop, :count)
    end
  end
end