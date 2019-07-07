# frozen_string_literal: true

Rails.application.routes.draw do
  mount ShopifyApp::Engine, at: '/'

  namespace :api, defaults: { format: :json } do
    get 'active_bars/:shop',
        to: 'active_bars#index',
        constraints: { shop: %r{[^/]+} }

    resources :shops,
              only: :show,
              param: :shopify_domain,
              constraints: { shopify_domain: %r{[^/]+} }
  end

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql'
  end

  post '/graphql', to: 'graphql#execute'

  get '*path', to: 'static_pages#show', constraints: lambda { |request|
    !request.xhr? && request.format.html?
  }

  root to: 'static_pages#show'
end
