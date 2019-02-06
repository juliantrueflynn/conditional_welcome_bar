Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :bars, only: [:show, :update, :destroy]
    get 'shops/:shop_name/active_bars', to: 'active_bars#index'
    get 'active_bars/:shop_name', to: 'active_bars#index'
    get 'shops/:shop_name/bars', to: 'bars#index'
    resource :session, only: :create

    resources :shops, only: :show do
      resource :bar, only: :create
    end
  end
end
