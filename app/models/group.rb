# == Schema Information
#
# Table name: groups
#
#  id             :bigint(8)        not null, primary key
#  athletes_count :integer          default(0), not null
#  date           :date             not null
#  description    :text             not null
#  start_at       :time             not null
#  weigh_in_at    :time             not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  event_id       :bigint(8)
#
# Indexes
#
#  index_groups_on_event_id  (event_id)
#
# Foreign Keys
#
#  fk_rails_...  (event_id => events.id)
#

# Group Model
class Group < ApplicationRecord
  belongs_to :event
  has_one :user, through: :event

  validates_presence_of :description, :date, :weigh_in_at, :start_at
end
