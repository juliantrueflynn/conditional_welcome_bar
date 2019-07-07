# frozen_string_literal: true

require 'rails_helper'

describe 'DestroyBar', type: :mutation do
  let(:query) do
    <<~GRAPHQL
      mutation {
        destroyBar(input: { id: \"#{bar_id}\" }) {
          bar { id }
        }
      }
    GRAPHQL
  end

  before { create(:bar) }

  describe 'destroy mutation' do
    let(:bar_id) { Bar.last.id }

    context 'when valid' do
      it 'decreases bar count' do
        expect { mutation(query) }.to change(Bar, :count).by(-1)
      end
    end

    context 'when not valid' do
      let(:bar_id) { Bar.last.id + 100 }

      it 'responds with nil' do
        mutation(query)
        expect(gql_response.data['destroyBar']['bar']).to be_nil
      end

      it 'does not decrease bar count' do
        expect { mutation(query) }.to_not change(Bar, :count)
      end
    end
  end
end
