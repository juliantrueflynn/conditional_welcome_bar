require 'rails_helper'

describe 'BarsQuery', type: :query do
  describe 'get bars query' do
    context 'when valid' do
      it 'responds with bars' do
        shop = create(:shop_with_bars)
        mutation 'query Bars($shopifyDomain: String) { bars(shopifyDomain: $shopifyDomain) { id title content createdAt updatedAt } }',
          operation_name: 'Bars',
          variables: { shopifyDomain: shop.shopify_domain }
        expect(gql_response.data['bars'].length).to eq(shop.bars.length)
      end

      it 'responds with no errors' do
        shop = create(:shop_with_bars)
        mutation 'query Bars($shopifyDomain: String) { bars(shopifyDomain: $shopifyDomain) { id title content createdAt updatedAt } }',
          operation_name: 'Bars',
          variables: { shopifyDomain: shop.shopify_domain }
        expect(gql_response.errors).to be_nil
      end
    end

    context 'when not valid' do
      it 'responds with empty array' do
        mutation 'query Bars($shopifyDomain: String) { bars(shopifyDomain: $shopifyDomain) { id title content createdAt updatedAt } }',
          operation_name: 'Bars',
          variables: { shopifyDomain: 'shop-not-in-db.myshopify.com' }
        expect(gql_response.data['bars']).to eq([])
      end
    end
  end
end
