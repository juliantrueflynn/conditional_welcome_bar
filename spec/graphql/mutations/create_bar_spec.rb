# frozen_string_literal: true

require "rails_helper"

describe Mutations::CreateBar, type: :graphql do
  context "when valid shopify_domain" do
    it "increases bar count" do
      expect do
        mutation mock_query, context: { current_shop: create(:shop) }
      end.to change(Bar, :count)
    end
  end

  context "when not valid shopify_domain" do
    it "returns nil" do
      mutation mock_query, context: { current_shop: nil }

      expect(gql_response.data["createBar"]).to be_nil
    end

    it "returns errors" do
      mutation mock_query, context: { current_shop: nil }

      expect(gql_response.errors).to_not be_nil
    end

    it "does not increase bar count" do
      expect do
        mutation mock_query, context: { current_shop: nil }
      end.to_not change(Bar, :count)
    end
  end

  def mock_query
    <<~GRAPHQL
      mutation {
        createBar(input: {}) {
          bar { id }
        }
      }
    GRAPHQL
  end
end
