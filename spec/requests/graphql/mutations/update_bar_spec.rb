# frozen_string_literal: true

require "rails_helper"

describe "Mutations::UpdateBar", type: :request do
  it "updates bar instance" do
    bar = create(:bar, active: true)
    new_title = Faker::Lorem.sentence

    execute_mutation bar, title: new_title, isActive: false

    expect(bar.reload).to have_attributes(title: new_title, active: false)
  end

  it "raises network error if bar not child of shop session" do
    bar = create(:bar)
    shop = create(:shop)
    variables = {
      "input" => { "id" => bar.id.to_s, title: "Some valid value" }
    }

    result = execute_graphql_query(graphql_query, current_shop: shop, variables: variables)
    errors = result.dig("errors")
    unauthorized_error = {
      "locations" => [{ "column" => 3, "line" => 2 }],
      "message" => "Welcome bar does not exist",
      "path" => ["updateBar"]
    }

    expect(errors).to include(unauthorized_error)
  end

  it "response contains new attributes" do
    bar = create(:bar, close_button: true)
    new_attributes = {
      "title" => Faker::Lorem.sentence,
      "content" => Faker::Lorem.paragraph,
      "hasCloseButton" => false
    }

    result = execute_mutation(bar, new_attributes)
    result_data = result.dig("data", "updateBar", "bar")

    expect(result_data).to match(hash_including(new_attributes))
  end

  it "returns empty userErrors for successful response" do
    bar = create(:bar, close_button: true)

    result = execute_mutation(bar, "hasCloseButton" => false)
    result_user_errors = result.dig("data", "updateBar", "userErrors")

    expect(result_user_errors).to be_empty
  end

  it "returns unauthorized error if shop missing" do
    bar = create(:bar)
    variables = {
      "input" => { "id" => bar.id.to_s, title: "Some valid value" }
    }

    result = execute_graphql_query(graphql_query, operation_name: "updateBar", variables: variables)
    errors = result.dig("errors")
    unauthorized_error = {
      "locations" => [{ "column" => 3, "line" => 2 }],
      "message" => "Not authorized",
      "path" => ["updateBar"]
    }

    expect(errors).to include(unauthorized_error)
  end

  it "returns no data if unauthorized error" do
    bar = create(:bar)
    variables = {
      "input" => { "id" => bar.id.to_s, title: "Some valid value" }
    }

    result = execute_graphql_query(graphql_query, operation_name: "updateBar", variables: variables)
    data = result.dig("data", "updateBar")

    expect(data).to be_nil
  end

  def graphql_query
    <<~GRAPHQL
      mutation updateBar($input: UpdateBarInput!) {
        updateBar(input: $input) {
          bar {
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
            __typename
          }
          userErrors {
            field
            message
          }
          __typename
        }
      }
    GRAPHQL
  end

  def execute_mutation(bar = nil, attributes = {})
    bar ||= create(:bar)

    variables = { "input" => attributes.dup }
    variables["input"]["id"] ||= bar.id.to_s

    execute_graphql_query graphql_query, current_shop: bar.shop, operation_name: "updateBar", variables: variables
  end
end
