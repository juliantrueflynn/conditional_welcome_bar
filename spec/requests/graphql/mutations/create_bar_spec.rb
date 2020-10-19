# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Mutations::CreateBar", type: :request do
  it "creates bar" do
    shop = create(:shop)

    expect do
      execute_graphql_mutation graphql_query, current_shop: shop
    end.to change(shop.bars, :count).by(1)
  end

  it "response contains created bar ID" do
    shop = create(:shop)

    result = execute_graphql_mutation(graphql_query, current_shop: shop)

    expect(result).to match(
      "data" => {
        "createBar" => { "bar" => { "id" => shop.bars.last.id.to_s } }
      }
    )
  end

  it "returns unauthorized error if created bar invalid" do
    shop = create(:shop)
    bar = build_stubbed(:bar, active: "invalid value", title: nil)
    allow(BarCreatorService).to receive(:call).and_return(bar)

    result = execute_graphql_mutation(graphql_query, current_shop: shop)

    expect(result).to match(
      "data" => { "createBar" => nil },
      "errors" => [
        build_network_error("message" => "There was an issue creating your welcome bar")
      ]
    )
  end

  it "does not create bar" do
    shop = build_stubbed(:shop)

    expect do
      execute_graphql_mutation graphql_query, current_shop: shop
    end.not_to change(shop.bars, :count)
  end

  it "returns no data if unauthorized error" do
    result = execute_graphql_mutation(graphql_query)

    expect(result).to match(
      "data" => { "createBar" => nil },
      "errors" => [
        build_network_error(
          "message" => "Not authorized",
          "extensions" => { "code" => GraphqlErrorHelper::EXTENSION_CODE_UNAUTHENTICATED }
        )
      ]
    )
  end

  def build_network_error(options = {})
    options.reverse_merge(
      "locations" => [{ "column" => 3, "line" => 2 }],
      "path" => ["createBar"]
    )
  end

  def stub_bar_creation_validation_error(shop)
    create(:bar, active: "invalid value").tap do |invalid_bar|
      allow(shop.bars).to receive(:create).and_return(invalid_bar)
    end
  end

  def graphql_query
    <<~GRAPHQL
      mutation CreateBar {
        createBar(input: {}) {
          bar {
            id
          }
        }
      }
    GRAPHQL
  end
end
