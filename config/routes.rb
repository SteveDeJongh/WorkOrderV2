Rails.application.routes.draw do
  # resources :inventory_movements
  # resources :products
  # resources :customers
  get 'pages/home'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  # API routes should be in /api/v1
  namespace :api do
    namespace :v1 do
      get 'search/customers' # /api/v1/search/products?q=query
      resources :customers
      get 'search/products'
      resources :products
      resources :inventory_movements
      get 'search/inventory_movement'
    end
  end
end
