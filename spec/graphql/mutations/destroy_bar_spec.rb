# frozen_string_literal: true

require "rails_helper"

describe Mutations::DestroyBar do
  let(:gql_post) { mutation(gql_query, context: { current_shop: Shop.last }) }
  let(:gql_query) do
    <<~GRAPHQL
      mutation {
        destroyBar(input: { id: \"#{bar_id}\" }) {
          bar { id }
        }
      }
    GRAPHQL
  end

  before { create(:shop) }

  describe "destroy mutation" do
    let(:bar_id) { Shop.last.bars.last.id }

    context "when valid" do
      it "decreases bar count" do
        expect { gql_post }.to change(Bar, :count).by(-1)
      end
    end

    context "when not valid" do
      let(:bar_id) { Shop.last.bars.last.id + 100 }

      it "responds with nil" do
        gql_post
        expect(gql_response.data["destroyBar"]["bar"]).to be_nil
      end

      it "does not decrease bar count" do
        expect { gql_post }.to_not change(Bar, :count)
      end
    end
  end
end
