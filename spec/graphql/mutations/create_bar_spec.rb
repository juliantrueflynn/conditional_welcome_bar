require 'rails_helper'

describe 'CreateBar', type: :mutation do
  describe 'create mutation' do
    context 'when valid' do
      it 'responds with welcome bar' do
        shop = create(:shop)
        mutation "mutation { createBar(input: { shopOrigin: \"#{shop.shopify_domain}\" }) { bar { id } } }"
        expect(gql_response.data['createBar']['bar']).to_not be_nil
      end

      it 'increases bar count' do
        shop = create(:shop)
        expect do
          mutation "mutation { createBar(input: { shopOrigin: \"#{shop.shopify_domain}\" }) { bar { id } } }"
        end.to change(Bar, :count).by(1)
      end
    end

    context 'when not valid' do
      it 'responds with nil' do
        mutation "mutation { createBar(input: { shopOrigin: \"not-in-db.myshopify.com\" }) { bar { id } } }"
        expect(gql_response.data['createBar']['bar']).to be_nil
      end

      it 'does not increase bar count' do
        expect do
          mutation "mutation { createBar(input: { shopOrigin: \"not-in-db.myshopify.com\" }) { bar { id } } }"
        end.to_not change(Bar, :count)
      end
    end
  end
end
