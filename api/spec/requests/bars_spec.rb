require 'rails_helper'
require 'auth'

RSpec.describe 'Bars', type: :request do
  let!(:root_path) { "#{ENV['API_URL']}/api" }
  let!(:shop) { FactoryBot.create(:shop) }
  let!(:shop_domain) { shop.shopify_domain }
  let!(:headers) do
    jwt = Auth.issue({ shop: shop.id })    
    { HTTP_AUTHORIZATION: "Bearer #{jwt}" }
  end

  describe "GET /bars" do
    let!(:path) { "#{root_path}/shops/#{shop_domain}/bars" }

    it 'responds with 200' do
      get path, params: {}, headers: headers
      expect(response).to have_http_status(200)
    end
  end

  describe "GET /bar/:id" do
    let!(:bar) { FactoryBot.create(:bar, shop_id: shop.id) }
    let!(:path) { "#{root_path}/bars/#{bar.id}" }

    it 'show resource' do
      get path, params: {}, headers: headers
      expect(response).to have_http_status(200)
    end
  end

  describe "CREATE /bar" do
    let!(:bar) { FactoryBot.attributes_for(:bar, shop_id: shop.id) }
    let!(:path) { "#{root_path}/shops/#{shop_domain}/bars" }
    let!(:valid_params) { { bar: bar } }

    it 'when valid attributes' do
      expect {
        post path, params: valid_params, headers: headers
      }.to change(Bar, :count).by(1)
    end
  end

  describe "UPDATE /bar/:id" do
    let!(:path) { "#{root_path}/bars/#{bar.id}" }
    let!(:valid_params) { { title: 'Updated' } }
    let!(:invalid_params) { { title: '' } }
    let!(:bar) { FactoryBot.create(:bar) }

    it 'when valid attributes' do
      patch path, params: { bar: valid_params }, headers: headers
      bar.reload
      expect(bar.title).to eq(valid_params[:title])
    end

    it 'when not valid attributes' do
      patch path, params: { bar: invalid_params }, headers: headers
      bar.reload
      expect(bar.title).to_not eq(invalid_params[:title])
    end
  end

  describe "DELETE /bar/:id" do
    let!(:bar) { FactoryBot.create(:bar) }
    let!(:path) { "#{root_path}/bars/#{bar.id}" }

    it 'change count' do
      expect {
        delete path, params: {}, headers: headers
      }.to change(Bar, :count).by(-1)
    end
  end
end
