require 'rails_helper'

RSpec.describe 'Shops', type: :request do
  def login(shop)
    OmniAuth.config.test_mode = true
    OmniAuth.config.add_mock(
      :shopify,
        provider: 'shopify',
        uid: shop.shopify_domain,
        credentials: { token: shop.shopify_token })
    Rails.application.env_config['omniauth.auth'] = OmniAuth.config.mock_auth[:shopify]
  
    get '/auth/shopify'
    follow_redirect!
    follow_redirect!
  end

  let!(:api_path) { '/api/shops' }

  describe 'SHOW /api/shops/:shopify_domain' do
    before(:each) { @shop = FactoryBot.create(:shop) }
    let!(:valid_url) { "#{api_path}/#{@shop.shopify_domain}" }

    context 'with authorization' do
      it 'allows user' do
        login(@shop)
        get valid_url

        expect(JSON.parse(response.body)['status']).to eq(200)
      end
    end

    context 'without authorization' do
      it 'does not allow user' do
        get valid_url
        expect(JSON.parse(response.body)['status']).to eq(302)
      end
    end

    it 'sets csrf cookie' do
      get valid_url
      expect(response.cookies['cwb_csrf']).to_not be_nil
    end
  end
end