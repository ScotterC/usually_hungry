FactoryBot.define do
  factory :user, aliases: [:owner] do
    email "foo@example.com"
    password "password"
  end
end