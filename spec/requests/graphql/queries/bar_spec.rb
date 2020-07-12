# frozen_string_literal: true

require "rails_helper"

RSpec.describe "bar query type", type: :request do
  it "returns bar if current_shop valid" do
    shop = create(:shop_with_bars)
    bar = create(:bar, shop: shop)

    result = execute_graphql_query(graphql_query, current_shop: shop, variables: { id: bar.id })
    data = result.dig("data", "bar")
    attributes = {
      "id" => bar.id.to_s,
      "title" => bar.title,
      "isActive" => bar.active
    }

    expect(data).to match(hash_including(attributes))
  end

  it "returns no errors if current_shop valid" do
    shop = create(:shop_with_bars)
    bar = create(:bar, shop: shop)

    result = execute_graphql_query(graphql_query, current_shop: shop, variables: { id: bar.id })
    errors = result.dig("errors")

    expect(errors).to be_nil
  end

  it "returns nil if shop session does not match bar" do
    shop = create(:shop)
    bar = create(:bar)

    result = execute_graphql_query(graphql_query, current_shop: shop, variables: { id: bar.id })
    data = result.dig("data", "bar")

    expect(data).to be_nil
  end

  it "returns nil if no bar id matches" do
    shop = create(:shop)
    bar = build_stubbed(:bar)

    result = execute_graphql_query(graphql_query, current_shop: shop, variables: { id: bar.id })
    data = result.dig("data", "bar")

    expect(data).to be_nil
  end

  def graphql_query
    <<~GRAPHQL
      query Bar($id: ID!) {
        bar(id: $id) {
          id
          title
          content
          url
          placement
          isActive
          isSticky
          isFullWidthLink
          isNewTabUrl
          themeTemplates
          hasCloseButton
          paddingY
          paddingX
          textAlign
          textColor
          fontSize
          backgroundColor
        }
      }
    GRAPHQL
  end
end
