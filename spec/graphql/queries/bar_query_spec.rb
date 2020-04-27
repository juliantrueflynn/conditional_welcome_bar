# frozen_string_literal: true

require "rails_helper"

describe "BarQuery", type: :query do
  describe "get bar query" do
    let(:query) do
      <<~GRAPHQL
        query {
          bar(id: \"#{bar_id}\") {
            id
            #{bar_column_names}
          }
        }
      GRAPHQL
    end

    before do
      shop = create(:shop)
      mutation(query, context: { current_shop: shop })
    end

    context "when valid" do
      let(:bar) { Bar.last }
      let(:bar_id) { bar.id }

      it "data responds with bar" do
        expect(gql_response.data["bar"]["id"]).to_not be_nil
        expect(gql_response.data["bar"]["title"]).to eq(bar.title)
      end

      it "responds with no errors" do
        expect(gql_response.errors).to be_nil
      end
    end

    context "when not valid" do
      let(:bar_id) { Bar.last.id + 100 }

      it "data responds with nil" do
        expect(gql_response.data["bar"]).to be_nil
      end
    end
  end

  def bar_column_names
    names = Bar.updatableable_columns
    names.map { |name| name.camelize(:lower) }.join(" ")
  end
end
