# frozen_string_literal: true

Rails.application.routes.draw do
  mount ShopifyApp::Engine, at: "/"

  mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql" if Rails.env.development?
  post "/graphql", to: "graphql#execute"

  root to: "static_pages#show"
end
