Rails.application.routes.draw do
  CONSTRAINT_REGEX = { shopify_domain: /[^\/]+/ }.freeze

  namespace :api, defaults: { format: :json } do
    resources :bars, only: [:show, :update, :destroy]
    get 'active_bars/:shopify_domain',
      to: 'active_bars#index',
      constraints: CONSTRAINT_REGEX
    get 'shops/:shopify_domain/bars',
      to: 'bars#index',
      constraints: CONSTRAINT_REGEX
    resource :shop, only: :create

    resources :shops, only: :show do
      resource :bar, only: :create
    end
  end
end
