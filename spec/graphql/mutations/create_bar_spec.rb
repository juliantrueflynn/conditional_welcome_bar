# frozen_string_literal: true

require 'rails_helper'

describe 'CreateBar', type: :mutation do
  let(:gql_post) { mutation(gql_query, context: { current_shop: shop }) }
  let(:gql_query) do
    <<~GRAPHQL
      mutation {
        createBar(input: {}) {
          bar {
            id
          }
        }
      }
    GRAPHQL
  end

  context 'when valid' do
    let(:shop) { create(:shop) }

    it 'returns bar' do
      gql_post
      expect(gql_response.data['createBar']['bar']).to_not be_nil
    end

    it 'increases bar count' do
      expect { gql_post }.to change(Bar, :count)
    end
  end

  context 'when not valid' do
    let(:shop) { nil }

    it 'returns nil' do
      gql_post
      expect(gql_response.data['createBar']).to be_nil
    end

    it 'returns errors' do
      gql_post
      expect(gql_response.errors).to_not be_nil
    end

    it 'does not increase bar count' do
      expect { gql_post }.to_not change(Bar, :count)
    end
  end
end
