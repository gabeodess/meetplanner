Rails.application.routes.draw do
  namespace :api do
    defaults format: :json do
      namespace :v1 do
        get 'sessions/current'
      end
    end
  end
  devise_for :users, defaults: { format: :json }
  resource :calculator, only: [:show]
  root 'application#index'
  get '*path', to: 'application#index'
end
