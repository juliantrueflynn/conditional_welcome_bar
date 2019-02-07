require 'rails_helper'

RSpec.describe 'Shops', type: :request do
  describe 'CREATE /shop' do
    let!(:shop) { FactoryBot.attributes_for(:shop) }

    it 'when valid attributes' do
      expect {
        post "#{ENV['API_URL']}/api/shop", params: { shop: shop }
      }.to change(Shop, :count).by(1)
    end

    it 'when not valid attributes' do
      expect {
        invalid_params = { shop: { title: 'Fail', content: nil } }
        post "#{ENV['API_URL']}/api/shop", params: invalid_params
      }.to_not change(Shop, :count)
    end
  end
end