# frozen_string_literal: true

require "rails_helper"

describe Mutations::UpdateBar, type: :graphql do
  context "when shopify_domain valid" do
    it "returns no errors" do
      shop = create(:shop)

      mutation mock_query(shop: shop, bar_title: "Some new title"), context: { current_shop: shop }
      errors = gql_response.data["updateBar"]["errors"]

      expect(errors.each_value.any?(&:present?)).to be false
    end

    it "updates title" do
      bar_title = "Some new title"
      shop = create(:shop)

      mutation mock_query(shop: shop, bar_title: bar_title), context: { current_shop: shop }

      expect(gql_response.data["updateBar"]["bar"]["title"]).to eq(bar_title)
    end
  end

  context "when shopify_domain not valid" do
    it "returns errors" do
      shop = create(:shop)

      mutation mock_query(shop: shop, bar_title: nil), context: { current_shop: shop }
      errors = gql_response.data["updateBar"]["errors"]

      expect(errors.each_value.any?(&:present?)).to be true
    end

    it "returns nil" do
      shop = create(:shop)

      mutation mock_query(shop: shop, bar_title: nil), context: { current_shop: shop }

      expect(gql_response.data["updateBar"]["bar"]).to be_nil
    end
  end

  def mock_query(shop:, bar_title:)
    bar_id = create(:bar, shop: shop, title: "Some old title").id
    columns = Bar.updatableable_columns.map { |name| name.camelize(:lower) }.join(" ")

    <<~GRAPHQL
      mutation {
        updateBar(input: {
          id: #{bar_id}
          title: \"#{bar_title}\"
        }) {
          bar { #{columns} }
          errors { #{columns} }
        }
      }
    GRAPHQL
  end
end
