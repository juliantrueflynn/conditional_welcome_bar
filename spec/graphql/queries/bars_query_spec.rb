# frozen_string_literal: true

require "rails_helper"

describe "BarsQuery" do
  let(:query) do
    <<~GRAPHQL
      {
        bars {
          id
          title
          content
          createdAt
          updatedAt
        }
      }
    GRAPHQL
  end

  before { mutation(query, context: { current_shop: shop }) }

  context "when valid" do
    let(:shop) { create(:shop_with_bars) }

    it "responds with bars" do
      expect(gql_response.data["bars"].length).to eq(shop.bars.length)
    end

    it "responds with no errors" do
      expect(gql_response.errors).to be_nil
    end
  end

  context "when not valid" do
    let(:shop) { nil }

    it "responds with empty array" do
      expect(gql_response.data["bars"]).to eq([])
    end
  end
end
