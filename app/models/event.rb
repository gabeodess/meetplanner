# Event model
class Event < ApplicationRecord
  belongs_to :user

  validates :sanction_id, uniqueness: true
  validates_presence_of :title, :sanction_id, :fee, :start_on
end
