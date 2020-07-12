# frozen_string_literal: true

require "rails_helper"

RSpec.describe "POST Graphql", type: :request do
  it "sets context with current_shop" do
    shop = create(:shop)
    graphql_query = "{ bars { id } } "
    post_params = {
      operationName: nil,
      variables: {},
      query: graphql_query
    }
    context_params = hash_including(
      context: hash_including(current_shop: shop)
    )
    allow(ConditionalWelcomeBarSchema).to receive(:execute)

    authorize_shopify! shop
    post graphql_path, params: post_params

    expect(ConditionalWelcomeBarSchema).to have_received(:execute).with(graphql_query, context_params)
  end

  it "does not require authorization for every endpoint" do
    graphql_query = "{ activeBars { id } } "
    post_params = {
      operationName: nil,
      variables: {},
      query: graphql_query
    }
    context_params = hash_including(
      context: hash_including(current_shop: nil)
    )
    allow(ConditionalWelcomeBarSchema).to receive(:execute)

    post graphql_path, params: post_params

    expect(ConditionalWelcomeBarSchema).to have_received(:execute).with(graphql_query, context_params)
  end
end
