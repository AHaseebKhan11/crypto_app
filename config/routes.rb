Rails.application.routes.draw do

  resources :notifications, only: [:index]

  # devise_for :users
  devise_for :users, controllers: {registrations: "registrations"}
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
  get 'all_users' => 'users#all_users'
  authenticated :user do
    root to: "pages#home", as: "authenticated_root"
    get '/home' => 'pages#home'
    get '/user/:id' => 'pages#profile'
    get '/coins' => 'crypto_graphs#index'
    patch '/update_avatar' => 'users#update_avatar'
    get '/cropper' => 'users#crop'
    resources :relationships, only: [:index, :create]
  end

  match 'like', to: 'likes#like', via: :post
  match 'unlike', to: 'likes#unlike', via: :delete

  match 'retweet_modal', to: 'retweet#open_modal', via: :get

  resources :relationships, only: [:create, :destroy]
  resources :posts
  post '/search' => 'posts#search'

  get '/explore' => 'pages#explore'
end
