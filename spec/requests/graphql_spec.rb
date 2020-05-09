# frozen_string_literal: true

require "rails_helper"

RSpec.describe "POST Graphql", type: :request do
  it "logs shopify_domain if present" do
    shop = create(:shop)
    log_message = "Results from current_shop: #{shop.inspect}"
    post_params = {
      "operationName" => nil,
      "variables" => {},
      "query" => "{ bars { id title content createdAt updatedAt __typename } } "
    }
    allow(Rails.logger).to receive(:info)

    authorize_shopify! shop
    post "/graphql", params: { graphql: post_params }

    expect(Rails.logger).to have_received(:info).with(log_message).once
  end

  it "log does not contain shopify_domain if blank" do
    log_message = "Results from current_shop: nil"
    post_params = {
      "operationName" => nil,
      "variables" => {},
      "query" => "{ bars { id title content createdAt updatedAt __typename } } "
    }
    allow(Rails.logger).to receive(:info)

    post "/graphql", params: { graphql: post_params }

    expect(Rails.logger).to have_received(:info).with(log_message).once
  end
end
