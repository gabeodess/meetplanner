FactoryBot.define do
  factory :user do
    sequence(:email) { |i| "foobar#{i}@example.com" }
    password { 'iheartweightlifting' }
  end
end
