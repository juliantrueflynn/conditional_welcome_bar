Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :bars, only: [:show, :update, :destroy]

    constraints shop: /[^\/]+/ do
      get 'active_bars/:shop', to: 'active_bars#index'

      scope 'shops/:shop' do
        resources :bars, only: [:index, :create]
      end
    end
  end

  get 'auth/shopify/callback', to: 'callback#create', format: :json

  post 'login', to: 'sessions#create', format: :json

  get '*path', to: 'application#fallback_index_html', constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
