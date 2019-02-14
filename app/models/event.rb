# Event model
class Event < ApplicationRecord
  belongs_to :user
  has_many :groups, dependent: :destroy

  validates :sanction_id, uniqueness: true
  validates_presence_of :title, :sanction_id, :fee, :start_on, :organizer, :email, :street, :city, :state, :zipcode

  def as_json(options = {})
    super({ include: %w[groups] }.merge(options))
  end
end
