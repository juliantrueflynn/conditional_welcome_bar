# frozen_string_literal: true

require "rails_helper"

describe Mutations::DestroyBar, type: :graphql do
  context "when shopify_domain valid" do
    it "decreases bar count" do
      shop = create(:shop)
      mock_query = <<~GRAPHQL
        mutation {
          destroyBar(input: { id: \"#{shop.bars.last.id}\" }) {
            bar { id }
          }
        }
      GRAPHQL

      expect do
        mutation(mock_query, context: { current_shop: shop })
      end.to change(Bar, :count).by(-1)
    end
  end

  context "when shopify_domain not valid" do
    it "returns nil" do
      shop = create(:shop)
      mock_query = <<~GRAPHQL
        mutation {
          destroyBar(input: { id: \"#{shop.bars.last.id + 100}\" }) {
            bar { id }
          }
        }
      GRAPHQL

      mutation(mock_query, context: { current_shop: shop })

      expect(gql_response.data["destroyBar"]["bar"]).to be_nil
    end

    it "does not decrease bar count" do
      shop = create(:shop)
      mock_query = <<~GRAPHQL
        mutation {
          destroyBar(input: { id: \"#{shop.bars.last.id + 100}\" }) {
            bar { id }
          }
        }
      GRAPHQL

      expect do
        mutation(mock_query, context: { current_shop: shop })
      end.to_not change(Bar, :count)
    end
  end
end
