# frozen_string_literal: true

require "rails_helper"

describe "Mutations::CreateBar", type: :request do
  it "updates bar instance" do
    current_shop = create(:shop)

    expect do
      execute_graphql_mutation graphql_query, current_shop: current_shop
    end.to change(Bar, :count)
  end

  it "returns unauthorized error if shop missing" do
    result = execute_graphql_mutation(graphql_query)
    errors = result.dig("errors")
    unauthorized_error = {
      "locations" => [{ "column" => 3, "line" => 2 }],
      "message" => "Not authorized",
      "path" => ["createBar"]
    }

    expect(errors).to include(unauthorized_error)
  end

  it "returns no data if unauthorized error" do
    result = execute_graphql_mutation(graphql_query)
    data = result.dig("data", "createBar")

    expect(data).to be_nil
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
