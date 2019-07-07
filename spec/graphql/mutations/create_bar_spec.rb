# frozen_string_literal: true

require 'rails_helper'

describe 'CreateBar', type: :mutation do
  describe 'create mutation' do
    let(:query) do
      <<~GRAPHQL
        mutation {
          createBar(input: { shopOrigin: \"#{shop_domain}\" }) {
            bar { id }
          }
        }
      GRAPHQL
    end

    context 'when valid' do
      let(:shop_domain) { create(:shop).shopify_domain }

      it 'responds with welcome bar' do
        mutation(query)
        expect(gql_response.data['createBar']['bar']).to_not be_nil
      end

      it 'increases bar count' do
        expect { mutation(query) }.to change(Bar, :count)
      end
    end

    context 'when not valid' do
      let(:shop_domain) { 'not-in-db.myshopify.com' }

      it 'returns nil' do
        mutation(query)
        expect(gql_response.data['createBar']['bar']).to be_nil
      end

      it 'does not increase bar count' do
        expect { mutation(query) }.to_not change(Bar, :count)
      end
    end
  end
end
