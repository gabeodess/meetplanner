# API endpoint for managing Groups
class Api::V1::GroupsController < ApplicationController
  CREATE_PARAMS = %w[description date weigh_in_at start_at].freeze
  UPDATE_PARAMS = CREATE_PARAMS

  def show
    respond_with current_user.groups.find(params[:id])
  end

  def create
    event = current_user.events.find(params[:event_id])
    respond_with event.groups.create(params.require(:group).permit(CREATE_PARAMS)), location: api_v1_event_path(event)
  end

  def update
    group = current_user.groups.find(params[:id])
    group.update_attributes(params.require(:group).permit(UPDATE_PARAMS))
    respond_with group
  end

  def destroy
    group = current_user.groups.find(params[:id])
    group.destroy
    respond_with group
  end
end
