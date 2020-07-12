# frozen_string_literal: true

require "rails_helper"

RSpec.describe "bars query type", type: :request do
  it "returns array of bars" do
    shop = create(:shop_with_bars)

    result = execute_graphql_query(graphql_query, current_shop: shop)
    data = result.dig("data", "bars")
    result_titles = data.map { |bar| bar["title"] }
    result_ids = data.map { |bar| bar["id"].to_i }

    expect(result_titles).to match_array(shop.bars.pluck(:title))
    expect(result_ids).to match_array(shop.bars.pluck(:id))
  end

  it "returns no errors if current_shop authorized" do
    shop = create(:shop_with_bars)

    result = execute_graphql_query(graphql_query, current_shop: shop)
    errors = result.dig("errors")

    expect(errors).to be_nil
  end

  it "returns empty if current_shop is not authorized" do
    create(:shop_with_bars)

    result = execute_graphql_query(graphql_query)
    errors = result.dig("data", "bars")

    expect(errors).to be_empty
  end

  it "returns no errors if current_shop is not authorized" do
    create(:shop_with_bars)

    result = execute_graphql_query(graphql_query)
    errors = result.dig("errors")

    expect(errors).to be_nil
  end

  def graphql_query
    <<~GRAPHQL
      {
        bars {
          id
          title
          content
          createdAt
          updatedAt
          __typename
        }
      }
    GRAPHQL
  end
end
