Rails.application.routes.draw do
  devise_for :users, defaults: { format: :json }
  resource :calculator, only: [:show]
  root 'application#index'
  get '*path', to: 'application#index'
end
