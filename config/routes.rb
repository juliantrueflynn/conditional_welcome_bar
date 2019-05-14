Rails.application.routes.draw do
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

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql'
  end

  post '/graphql', to: 'graphql#execute'

  get '*path', to: 'application#fallback_index_html', constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end