class ApplicationController < ActionController::Base
  before_action :authenticate_user!, except: [:index]
  after_action :set_csrf_cookie

  respond_to :json

  protected

  def set_csrf_cookie
    cookies['X-CSRF-Token'] = form_authenticity_token
  end
end
