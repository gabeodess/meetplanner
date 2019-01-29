FactoryBot.define do
  factory :event do
    association :user
    title { :foobar }
    organizer { :foobar }
    sequence(:sanction_id) { |i| "foobar#{i}" }
    fee { 0 }
    start_on { Date.today }
    description { :foobar }
    street { :foobar }
    city { :foobar }
    state { :foobar }
    zipcode { '01065' }
    email { 'foo@bar.com' }
    phone { '413-423-2345' }
  end
end
