# Handles session related endpoints
class Api::V1::SessionsController < ApplicationController
  def current
    render json: current_user
  end
end
