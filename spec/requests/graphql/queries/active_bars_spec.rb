# frozen_string_literal: true

require "rails_helper"

RSpec.describe "active_bars query type", type: :request do
  it "returns array of bars with #active true" do
    shop = create(:shop)
    create :bar, shop: shop, active: true
    create :bar, shop: shop, active: false

    result = execute_graphql_query(graphql_query, variables: { shopifyDomain: shop.domain })
    data = result.dig("data", "activeBars")

    expect(shop.bars.length).to eq(3)
    expect(data.length).to eq(1)
  end

  it "returns empty array if no matches" do
    shop = create(:shop)

    result = execute_graphql_query(graphql_query, variables: { shopifyDomain: shop.domain })
    data = result.dig("data", "activeBars")

    expect(shop.bars.length).to eq(1)
    expect(data).to be_empty
  end

  def graphql_query
    <<~GRAPHQL
      query activeBars($shopifyDomain: String!) {
        activeBars(shopifyDomain: $shopifyDomain) {
          id
          title
          content
          isActive
        }
      }
    GRAPHQL
  end
end
