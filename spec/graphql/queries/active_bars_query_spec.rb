# frozen_string_literal: true

require 'rails_helper'

describe '#active_bars', type: :query do
  let(:shop) { create(:shop) }
  let(:gql_post) { mutation(query, context: { current_shop: nil }) }
  let(:query) do
    <<~GRAPHQL
      query {
        activeBars(shopifyDomain: \"#{shop.shopify_domain}\") {
          id
          title
          content
          isActive
          url
          placement
          isSticky
          isFullWidthLink
          isNewTabUrl
          pageTemplates
          hasCloseButton
          paddingY
          paddingX
          textAlign
          textColor
          fontSize
          backgroundColor
          backgroundImage
          backgroundImageRepeat
          backgroundImageSizeX
          backgroundImageSizeY
          backgroundImagePositionX
          backgroundImagePositionY
        }
      }
    GRAPHQL
  end

  context 'when bars exist' do
    before do
      create(:bar, shop: shop, is_active: true)
      create(:bar, shop: shop, is_active: false)
      gql_post
    end

    it 'returns correct count' do
      expect(shop.bars.length).to eq(3)
      expect(gql_response.data['activeBars'].length).to eq(1)
    end
  end

  context 'when no bars exist' do
    before { gql_post }

    it 'returns empty array' do
      expect(shop.bars.length).to eq(1)
      expect(gql_response.data['activeBars'].length).to eq(0)
    end
  end
end
