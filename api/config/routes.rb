Rails.application.routes.draw do
  SHOP_CONSTRAINT = { constraints: { shop_domain: /[^\/]+/ } }.freeze

  namespace :api, defaults: { format: :json } do
    resources :bars, only: [:show, :update, :destroy]

    get 'active_bars/:shop_domain', to: 'active_bars#index', **SHOP_CONSTRAINT

    resources :shops, only: [], param: :domain, **SHOP_CONSTRAINT do
      resources :bars, only: [:index, :create]
    end

    resource :shop, only: :create
  end
end
