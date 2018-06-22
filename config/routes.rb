Rails.application.routes.draw do

  resources :notifications, only: [:index]

  # devise_for :users
  devise_for :users, :controllers => {:registrations => "registrations"}
  resources :users do
    member do
      get :following, :followers
    end
  end

  get '/privacy_policy' => 'pages#privacy_policy'

  unauthenticated :user do
    root to: 'pages#index'
    get '/coins' => 'crypto_graphs#index'
  end

  authenticated :user do
    root to: "pages#home", :as => "authenticated_root"
    get '/home' => 'pages#home'
    get '/user/:id' => 'pages#profile'
    get '/coins' => 'crypto_graphs#index'
    get 'all_users' => 'users#all_users'
    patch '/update_avatar' => 'users#update_avatar'
    get '/cropper' => 'users#crop'
  end
  resources :relationships, only: [:create, :destroy]
  resources :posts
  post '/search' => 'posts#search'

  get '/explore' => 'pages#explore'
end
