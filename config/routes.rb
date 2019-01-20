Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    get 'bars/:hostname', to: 'bars#index'
    resources :bars, only: [:show, :create, :update, :destroy]
  end

  root :to => 'home#index'
  mount ShopifyApp::Engine, at: '/'
end
