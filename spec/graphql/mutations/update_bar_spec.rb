# frozen_string_literal: true

require "rails_helper"

describe Mutations::UpdateBar, type: :graphql do
  include BarGraphqlColumnNamesSupport

  context "when shopify_domain valid" do
    it "returns no errors" do
      shop = create(:shop)

      execute_mutation shop: shop, bar_title: "Some new title"
      errors = gql_response.data.dig("updateBar", "errors")

      expect(errors.each_value.any?(&:present?)).to be(false)
    end

    it "updates title" do
      bar_title = "Some new title"
      shop = create(:shop)

      execute_mutation shop: shop, bar_title: bar_title
      result = gql_response.data.dig("updateBar", "bar", "title")

      expect(result).to eq(bar_title)
    end
  end

  context "when shopify_domain not valid" do
    it "returns errors" do
      shop = create(:shop)

      execute_mutation shop: shop, bar_title: nil
      errors = gql_response.data.dig("updateBar", "errors")

      expect(errors.each_value.any?(&:present?)).to be(true)
    end

    it "returns nil" do
      shop = create(:shop)

      execute_mutation shop: shop, bar_title: nil

      expect(gql_response.data.dig("updateBar", "bar")).to be_nil
    end
  end

  def execute_mutation(shop:, bar_title:)
    bar_id = create(:bar, shop: shop, title: "Some old title").id
    query = <<~GRAPHQL
      mutation {
        updateBar(input: { id: #{bar_id} title: "#{bar_title}" }) {
          bar { #{bar_camelized_column_names} }
          errors { #{bar_camelized_column_names} }
        }
      }
    GRAPHQL

    mutation query, context: { current_shop: shop }
  end
end
