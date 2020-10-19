# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Mutations::UpdateBar", type: :request do
  it "updates bar instance" do
    bar = create(:bar, active: true)
    new_title = Faker::Lorem.sentence

    execute_mutation bar, title: new_title, isActive: false

    expect(bar.reload).to have_attributes(title: new_title, active: false)
  end

  it "response contains new attributes" do
    bar = create(:bar, close_button: true)
    new_attributes = {
      "title" => Faker::Lorem.sentence,
      "content" => Faker::Lorem.paragraph,
      "hasCloseButton" => false
    }

    result = execute_mutation(bar, new_attributes)

    expect(result).to match("data" => {
                              "updateBar" => {
                                "bar" => hash_including(new_attributes),
                                "userErrors" => []
                              }
                            })
  end

  it "response contains user errors if invalid record" do
    bar = create(:bar)
    variables = {
      "input" => { "id" => bar.id.to_s, title: nil }
    }

    result = execute_graphql_query(graphql_query, current_shop: bar.shop, variables: variables)

    expect(result).to match(
      "data" => {
        "updateBar" => {
          "bar" => nil,
          "userErrors" => [{ "field" => ["title"], "message" => "can't be blank" }]
        }
      }
    )
  end

  it "raises network error if bar not child of shop session" do
    bar = create(:bar)
    variables = {
      "input" => { "id" => bar.id.to_s, title: "Some valid value" }
    }

    result = execute_graphql_query(graphql_query, current_shop: create(:shop), variables: variables)

    expect(result).to match(
      "data" => { "updateBar" => nil },
      "errors" => [
        build_network_error(
          "message" => "Welcome bar does not exist",
          "extensions" => { "code" => GraphqlErrorHelper::EXTENSION_CODE_RECORD_NOT_FOUND }
        )
      ]
    )
  end

  it "returns unauthorized error if shop missing" do
    bar = create(:bar)
    variables = {
      "input" => { "id" => bar.id.to_s, title: "Some valid value" }
    }

    result = execute_graphql_query(graphql_query, operation_name: "updateBar", variables: variables)

    expect(result).to match(
      "data" => { "updateBar" => nil },
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
          }
          userErrors {
            field
            message
          }
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

  def build_network_error(options = {})
    options.reverse_merge(
      "locations" => [{ "column" => 3, "line" => 2 }],
      "path" => ["updateBar"]
    )
  end
end
