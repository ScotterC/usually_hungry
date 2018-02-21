Rails.application.routes.draw do
  devise_for :users

  resources :users, only: [:show]

  resources :lists do
    resources :items, controller: "list_items", except: :index
  end


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: "pages#index"
end
