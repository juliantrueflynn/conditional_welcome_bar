# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'ActiveBars', type: :request do
  describe '#index' do
    before { get "/api/active_bars/#{shop_domain}" }

    context 'when resource is found' do
      let(:shop_domain) { create(:shop_with_bars).shopify_domain }

      it 'shows JSON resource' do
        expect(response.content_type).to eq('application/json')
        expect(JSON.parse(response.body)['status']).to eq(200)
      end
    end

    context 'when resource is not found' do
      let(:shop_domain) { 'not-found-shop.myshopify.com' }

      it 'responds with 404' do
        expect(response).to have_http_status(404)
        expect(response.content_type).to eq('application/json')
      end
    end

    describe 'displays only active bars' do
      let(:shop_domain) do
        create(:shop_with_bars, is_active: is_active).shopify_domain
      end

      context 'when active' do
        let(:is_active) { true }

        it 'returns length of 3' do
          expect(JSON.parse(response.body)['data']['bars'].length).to eq(3)
        end
      end

      context 'when none active' do
        let(:is_active) { false }

        it 'returns length of 0' do
          expect(JSON.parse(response.body)['data']['bars'].length).to eq(0)
        end
      end
    end
  end
end
