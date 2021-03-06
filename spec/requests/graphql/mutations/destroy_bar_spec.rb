# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Mutations::DestroyBar", type: :request do
  it "destroys bar instance" do
    bar = create(:bar)
    shop = bar.shop

    expect do
      execute_graphql_mutation graphql_query, current_shop: shop, variables: graphql_variables(bar)
    end.to change(Bar, :count).by(-1)
  end

  it "raises execution error if bar not child of shop session" do
    bar = create(:bar)
    shop = create(:shop)

    result = execute_graphql_query(graphql_query, current_shop: shop, variables: graphql_variables(bar))

    expect(result).to match(
      "data" => { "destroyBar" => nil },
      "errors" => [
        build_network_error(
          "message" => "Welcome bar does not exist",
          "extensions" => { "code" => GraphqlErrorHelper::EXTENSION_CODE_RECORD_NOT_FOUND }
        )
      ]
    )
  end

  it "returns bar ID if bar successfully deleted" do
    bar = create(:bar)
    shop = bar.shop

    result = execute_graphql_mutation graphql_query, current_shop: shop, variables: graphql_variables(bar)

    expect(result).to match("data" => {
                              "destroyBar" => {
                                "bar" => { "id" => bar.id.to_s }
                              }
                            })
  end

  it "does not destroy bar if unauthorized error" do
    bar = create(:bar)

    expect do
      execute_graphql_mutation graphql_query, variables: graphql_variables(bar)
    end.to change(Bar, :count).by(0)
  end

  it "returns unauthorized error if shop missing" do
    result = execute_graphql_mutation(graphql_query, variables: graphql_variables)

    expect(result).to match(
      "data" => { "destroyBar" => nil },
      "errors" => [
        build_network_error(
          "message" => "Not authorized",
          "extensions" => { "code" => GraphqlErrorHelper::EXTENSION_CODE_UNAUTHENTICATED }
        )
      ]
    )
  end

  def graphql_query
    <<~GRAPHQL
      mutation DestroyBar($input: DestroyBarInput!) {
        destroyBar(input: $input) {
          bar {
            id
          }
        }
      }
    GRAPHQL
  end

  def build_network_error(options = {})
    options.reverse_merge(
      "locations" => [{ "column" => 3, "line" => 2 }],
      "path" => ["destroyBar"]
    )
  end

  def graphql_variables(bar = nil)
    bar ||= create(:bar)

    {
      "input" => {
        "id" => bar.id.to_s
      }
    }
  end
end
