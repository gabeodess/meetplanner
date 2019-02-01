# REST API access to Events
class Api::V1::EventsController < ApplicationController
  CREATE_PARAMS = %w[title organizer sanction_id description start_on end_on street city state zipcode phone email fee].freeze

  skip_before_action :authenticate_user!, only: %w[search show]

  respond_to :json

  def search
    respond_with Event.ransack(params[:q]).result
  end

  def show
    respond_with Event.find(params[:id])
  end

  # POST /api/v1/events
  def create
    respond_with :api, :v1, current_user.events.create(params.require(:event).permit(*CREATE_PARAMS))
  end

  def index
    respond_with current_user.events.limit(10)
  end

  def update
    event = current_user.events.find(params[:id])
    event.update_attributes(params.require(:event).permit(*CREATE_PARAMS))
    respond_with event
  end

  def destroy
    current_user.events.find(params[:id]).destroy
    respond_with :success
  end
end
