# rubocop:disable Layout/EndOfLine
class ApplicationController < ActionController::Base
  before_action :authenticate_user!, except: [:index]
end
# rubocop:enable Layout/EndOfLine
