# frozen_string_literal: true

require "rails_helper"

describe Mutations::UpdateBar do
  let(:shop) { create(:shop) }
  let(:bar_id) { create(:bar, shop: shop, title: "Some old title").id }
  let(:gql_query) do
    <<~GRAPHQL
      mutation {
        updateBar(input: {
          id: #{bar_id}
          title: \"#{bar_title}\"
        }) {
          bar { #{bar_column_names} }
          errors { #{bar_column_names} }
        }
      }
    GRAPHQL
  end

  before { mutation(gql_query, context: { current_shop: shop }) }

  context "when valid" do
    let(:bar_title) { "Some new title" }

    it "responds with no errors" do
      errors = gql_response.data["updateBar"]["errors"]
      expect(errors.each_value.any?(&:present?)).to be false
    end

    it "has changed title" do
      expect(gql_response.data["updateBar"]["bar"]["title"]).to eq(bar_title)
    end
  end

  context "when not valid" do
    let(:bar_title) { nil }

    it "responds with errors" do
      errors = gql_response.data["updateBar"]["errors"]
      expect(errors.each_value.any?(&:present?)).to be true
    end

    it "responds with nil data" do
      expect(gql_response.data["updateBar"]["bar"]).to be_nil
    end
  end

  def bar_column_names
    names = Bar.updatableable_columns
    names.map { |name| name.camelize(:lower) }.join(" ")
  end
end
