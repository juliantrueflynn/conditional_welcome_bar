Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  post "/graphql", to: "graphql#execute"
  mount ShopifyApp::Engine, at: '/'

  namespace :api, defaults: { format: :json } do
    resources :bars, only: [:show, :update, :destroy]

    constraints shop: /[^\/]+/ do
      get 'active_bars/:shop', to: 'active_bars#index'

      scope 'shops/:shop' do
        resources :bars, only: [:index, :create]
      end
    end

    resources :shops,
      only: :show,
      param: :shopify_domain,
      constraints: { shopify_domain: /[^\/]+/ }
  end

  # post 'auth/install', to: 'sessions#create'
  # get 'auth/install', to: 'sessions#show', constraints: { shop: /[^\/]+/ }
  # get 'auth/shopify/callback', to: 'callback#create', format: :json

  # get 'install/:shop', to: 'sessions#show', constraints: { shop: /[^\/]+/ }
  # post 'install', to: 'sessions#create'
  # post 'login/:shop', to: 'sessions#create'
  # post 'login', to: 'sessions#create'

  get '*path', to: 'application#fallback_index_html', constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
