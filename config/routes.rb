Rails.application.routes.draw do
  # /login /logout /signup
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  devise_scope :user do
    get "/current_user_details", to: 'users/sessions#current_user_details'
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # API routes should be in /api/v1
  namespace :api do
    namespace :v1 do
      get 'search/customers' # /api/v1/search/products?q=query
      get 'search/customerInvoices'
      resources :customers
      get 'search/products'
      get 'search/invoices'
      resources :products
      resources :inventory_movements
      get 'search/inventory_movement'
      get 'search/last_3_inventory_movements'
      resources :payments
      resources :invoice_lines
      resources :invoices
    end
  end
end
