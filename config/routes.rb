Rails.application.routes.draw do
  get 'application/index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'application#index'

end
