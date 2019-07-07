# frozen_string_literal: true

require 'rails_helper'

describe 'BarsQuery', type: :query do
  describe 'get bars query' do
    let(:query) do
      <<~GRAPHQL
        query {
          bars(shopifyDomain: \"#{shop_domain}\") {
            id
            title
            content
            createdAt
            updatedAt
          }
        }
      GRAPHQL
    end

    context 'when valid' do
      let(:shop) { create(:shop_with_bars) }
      let(:shop_domain) { shop.shopify_domain }

      before { mutation(query) }

      it 'responds with bars' do
        expect(gql_response.data['bars'].length).to eq(shop.bars.length)
      end

      it 'responds with no errors' do
        expect(gql_response.errors).to be_nil
      end
    end

    context 'when not valid' do
      let(:shop_domain) { 'not-in-db.myshopify.com' }

      it 'responds with empty array' do
        mutation(query)
        expect(gql_response.data['bars']).to eq([])
      end
    end
  end
end
