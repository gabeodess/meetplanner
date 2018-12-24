# Controller for interacting with the calculator
class CalculatorsController < ApplicationController
  skip_before_action :authenticate_user!
end
