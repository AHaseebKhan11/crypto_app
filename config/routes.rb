Rails.application.routes.draw do

  devise_for :users
  resources :users do
    member do
      get :following, :followers
    end
  end

  unauthenticated :user do
    root to: 'pages#index'
  end

  authenticated :user do
    root to: "pages#home", :as => "authenticated_root"
    get '/home' => 'pages#home'
    get '/user/:id' => 'pages#profile'
    get '/coins' => 'crypto_graphs#index'
  end
  resources :relationships, only: [:create, :destroy]
  resources :posts
  post '/search' => 'posts#search'

  get '/explore' => 'pages#explore'
end
