Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    get 'bars/:hostname', to: 'bars#index'
    resources :bars, only: [:show, :update, :destroy]
    get 'shops/:hostname/active_bars', to: 'active_bars#index'

    resources :shops, only: :show do
      resource :bar, only: :create
    end
  end

  root :to => 'home#index'
  mount ShopifyApp::Engine, at: '/'
end
