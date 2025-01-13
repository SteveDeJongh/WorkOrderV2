FactoryBot.define do
  factory :user do
    sequence(:id) {|x| x }
    sequence(:name) {|x| "Admin#{x}"}
    sequence(:email) {|x| "admin#{x}@test.com"}
    password {"password"}
    roles {["user", "manager", "admin"]}
  end
end
