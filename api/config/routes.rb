Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :bars, only: [:show, :update, :destroy]

    get 'active_bars/:shop_domain',
      to: 'active_bars#index',
      constraints: { shop_domain: /[^\/]+/ }

    resources :shops,
      only: [],
      param: :domain,
      constraints: { shop_domain: /[^\/]+/ } do
        resources :bars, only: [:index, :create]
        resource :session, only: [:show]
      end

    resource :shop, only: :create

    get '*path', to: 'application#fallback_index_html', constraints: ->(request) do
      !request.xhr? && request.format.html?
    end
  end
end
