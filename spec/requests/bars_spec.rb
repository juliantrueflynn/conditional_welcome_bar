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

  describe "CREATE /bar" do
    before { login }
    let!(:bar) { FactoryBot.attributes_for(:bar) }
    let!(:shop) { Shop.last }

    it 'when valid attributes' do
      expect {
        post "#{ENV['API_URL']}/api/shops/#{shop.id}/bar", params: { bar: bar }
      }.to change(Bar, :count).by(1)
    end

    it 'when not valid attributes' do
      expect {
        invalid_params = { bar: { title: 'Fail' } }
        post "#{ENV['API_URL']}/api/shops/#{shop.id}/bar", params: invalid_params
      }.to_not change(Bar, :count)
    end
  end

  describe "UPDATE /bar/:id" do
    let!(:attributes) { { title: 'Updated' } }
    let!(:bar) { FactoryBot.create(:bar) }

    it 'when valid attributes' do
      patch "#{ENV['API_URL']}/api/bars/#{bar.id}", params: { bar: attributes }
      bar.reload
      expect(bar.title).to eq(attributes[:title])
    end

    it 'when not valid attributes' do
      invalid_params = { title: '' }
      patch "#{ENV['API_URL']}/api/bars/#{bar.id}", params: { bar: invalid_params }
      bar.reload
      expect(bar.title).to_not eq(invalid_params[:title])
    end
  end

  describe "DELETE /bar/:id" do
    let!(:bar) { FactoryBot.create(:bar) }

    it 'change count' do
      api_url = "#{ENV['API_URL']}/api/bars/#{bar.id}"
      expect { delete api_url }.to change(Bar, :count).by(-1)
    end
  end
end
