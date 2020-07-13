# frozen_string_literal: true

module ShopifyApiSupport
  def authorize_shopify!(shop)
    mock_shopify_omniauth shop: shop
    get "/auth/shopify"
    follow_redirect!
  end

  def mock_shopify_omniauth(shop: nil, token: nil, domain: nil)
    token ||= shop&.shopify_token || SecureRandom.hex(10)
    domain ||= shop&.shopify_domain
    credentials = { token: token }
    OmniAuth.config.add_mock :shopify, provider: "shopify", uid: domain, credentials: credentials
    Rails.application.env_config["omniauth.auth"] = OmniAuth.config.mock_auth[:shopify]
  end

  def stub_script_tags_api_request
    stub_request(:get, %r{admin/api/#{ShopifyApp.configuration.api_version}/script_tags\.json})
      .to_return(status: 200, body: "", headers: {})
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
