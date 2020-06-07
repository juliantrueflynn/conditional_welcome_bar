# frozen_string_literal: true

require "rails_helper"

RSpec.describe Types::QueryType, type: :graphql do
  include BarGraphqlColumnNamesSupport

  describe "#active_bars" do
    it "returns active bars" do
      shop = create(:shop)
      create :bar, shop: shop, active: true
      create :bar, shop: shop, active: false

      query <<~GRAPHQL
        query {
          activeBars(shopifyDomain: "#{shop.shopify_domain}") {
            #{bar_camelized_column_names}
          }
        }
      GRAPHQL

      expect(shop.bars.length).to eq(3)
      expect(gql_response.data["activeBars"].length).to eq(1)
    end

    it "returns empty array if no matches" do
      shop = create(:shop)

      query <<~GRAPHQL
        query {
          activeBars(shopifyDomain: "#{shop.shopify_domain}") {
            #{bar_camelized_column_names}
          }
        }
      GRAPHQL

      expect(shop.bars.length).to eq(1)
      expect(gql_response.data["activeBars"].length).to eq(0)
    end
  end

  describe "#bars" do
    it "returns bar query if current_shop valid" do
      shop = create(:shop_with_bars)
      query "{ bars { id title content createdAt updatedAt } }", context: { current_shop: shop }

      expect(gql_response.data["bars"].length).to eq(shop.bars.length)
    end

    it "returns no errors if current_shop valid" do
      shop = create(:shop_with_bars)
      query "{ bars { id title content createdAt updatedAt } }", context: { current_shop: shop }

      expect(gql_response.errors).to be_nil
    end

    it "returns empty if current_shop not valid" do
      query "{ bars { id title content createdAt updatedAt } }"

      expect(gql_response.data["bars"]).to be_empty
    end
  end

  describe "#bar" do
    it "returns bar if current_shop valid" do
      shop = create(:shop_with_bars)
      bar = create(:bar, shop: shop)
      mock_query = <<~GRAPHQL
        query {
          bar(id: "#{bar.id}") {
            id
            #{bar_camelized_column_names}
          }
        }
      GRAPHQL
      query mock_query, context: { current_shop: shop }

      expect(gql_response.data["bar"]["id"]).to_not be_nil
      expect(gql_response.data["bar"]["title"]).to eq(bar.title)
    end

    it "returns no errors if current_shop valid" do
      shop = create(:shop_with_bars)
      bar = create(:bar, shop: shop)
      mock_query = <<~GRAPHQL
        query {
          bar(id: \"#{bar.id}\") {
            id
            #{bar_camelized_column_names}
          }
        }
      GRAPHQL
      query mock_query, context: { current_shop: shop }

      expect(gql_response.errors).to be_nil
    end

    it "returns nil if no bar id matches" do
      shop = create(:shop)
      mock_query = <<~GRAPHQL
        query {
          bar(id: "0") {
            id
            #{bar_camelized_column_names}
          }
        }
      GRAPHQL
      query mock_query, context: { current_shop: shop }

      expect(gql_response.data["bar"]).to be_nil
    end
  end
end
