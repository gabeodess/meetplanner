FactoryBot.define do
  factory :group do
    association :event
    description { 'foobar' }
    date { Date.today }
    weigh_in_at { Time.now }
    start_at { 1.hour.from_now }
  end
end
