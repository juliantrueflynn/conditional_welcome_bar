# frozen_string_literal: true

require "rails_helper"

describe "Mutations::CreateBar", type: :request do
  it "creates bar" do
    shop = create(:shop)

    expect do
      execute_graphql_mutation graphql_query, current_shop: shop
    end.to change(shop.bars, :count).by(1)
  end

  it "response contains created bar ID" do
    shop = create(:shop)

    result = execute_graphql_mutation(graphql_query, current_shop: shop)
    result_data = result.dig("data", "createBar", "bar")

    expect(result_data).to match(hash_including("id" => shop.bars.last.id.to_s))
  end

  it "returns unauthorized error if created bar invalid" do
    shop = create(:shop)
    network_error = example_network_error("message" => "There was an issue creating your welcome bar")
    invalid_bar = build(:bar, close_button: nil)
    allow(BarCreatorService).to receive(:call).with(shop).and_return(invalid_bar)

    result = execute_graphql_mutation(graphql_query, current_shop: shop)
    errors = result.dig("errors")

    expect(errors).to include(network_error)
  end

  it "returns unauthorized error if shop missing" do
    network_error = example_network_error("message" => "Not authorized")

    result = execute_graphql_mutation(graphql_query)
    errors = result.dig("errors")

    expect(errors).to include(network_error)
  end

  it "does not create bar" do
    shop = build_stubbed(:shop)

    expect do
      execute_graphql_mutation graphql_query, current_shop: shop
    end.not_to change(shop.bars, :count)
  end

  it "returns no data if unauthorized error" do
    result = execute_graphql_mutation(graphql_query)
    data = result.dig("data", "createBar")

    expect(data).to be_nil
  end

  def example_network_error(options = {})
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
