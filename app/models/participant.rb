# Participant (registered athlete) model
class Participant < ApplicationRecord
  belongs_to :event
  belongs_to :session
end
