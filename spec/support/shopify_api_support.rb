# frozen_string_literal: true

module ShopifyApiSupport
  def authorize_shopify!(shop)
    mock_shopify_omniauth shop
    get "/auth/shopify"
    follow_redirect!
  end

  def mock_shopify_omniauth(shop)
    credentials = { token: shop.shopify_token }
    OmniAuth.config.add_mock :shopify, provider: "shopify", uid: shop.shopify_domain, credentials: credentials
    Rails.application.env_config["omniauth.auth"] = OmniAuth.config.mock_auth[:shopify]
  end

  def execute_graphql_query(query, current_shop: nil, operation_name: nil, variables: {})
    authorize_shopify!(current_shop) if current_shop
    post_params = { query: query, operationName: operation_name, variables: variables }
    post graphql_path, params: post_params, as: :json
    JSON.parse(response.body)
  rescue JSON::ParserError
    { data: nil, errors: nil }
  end

  alias execute_graphql_mutation execute_graphql_query
end
