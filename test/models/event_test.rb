# == Schema Information
#
# Table name: events
#
#  id          :bigint(8)        not null, primary key
#  city        :string           not null
#  closed_at   :datetime
#  description :text             not null
#  email       :string           not null
#  end_on      :date
#  fee         :decimal(8, 2)    not null
#  organizer   :string           not null
#  phone       :string           not null
#  start_on    :date             not null
#  state       :string           not null
#  street      :string           not null
#  title       :string           not null
#  zipcode     :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  sanction_id :string           not null
#  user_id     :bigint(8)        not null
#
# Indexes
#
#  index_events_on_sanction_id  (sanction_id) UNIQUE
#  index_events_on_user_id      (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#

require 'test_helper'

class EventTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
