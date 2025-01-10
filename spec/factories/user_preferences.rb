FactoryBot.define do
  factory :user_preference do
    user_id { 1 }
    view { "" }
    theme { "MyString" }
  end
end
