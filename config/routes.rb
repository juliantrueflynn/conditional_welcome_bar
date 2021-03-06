# frozen_string_literal: true

Rails.application.routes.draw do
  mount ShopifyApp::Engine, at: "/"

  mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql" if Rails.env.development?
  post "/graphql", to: "graphql#execute"

  namespace :api do
    scope "/shops/:shop", constraints: { shop: /.*/ } do
      resource :active_bar, only: :show, param: :page_template
    end
  end

  get "*path", to: "static_pages#show", constraints: ->(request) { request.format.html? }

  root to: "static_pages#show"
end
