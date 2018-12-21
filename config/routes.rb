Rails.application.routes.draw do
  devise_for :users
  resource :calculator, only: [:show]
  root 'application#index'
end
