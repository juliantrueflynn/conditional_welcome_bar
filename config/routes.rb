# frozen_string_literal: true

Rails.application.routes.draw do
  mount ShopifyApp::Engine, at: "/"

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  post "/graphql", to: "graphql#execute"

  get "*path", to: "static_pages#show", constraints: lambda { |request|
    !request.xhr? && request.format.html?
  }

  root to: "static_pages#show"
end
