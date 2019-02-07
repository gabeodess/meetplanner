# Group Model
class Group < ApplicationRecord
  belongs_to :event
  has_one :user, through: :event

  validates_presence_of :description, :date, :weigh_in_at, :start_at
end
