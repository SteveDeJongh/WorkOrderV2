FactoryBot.define do
  factory :user_preference do
    user_id { 1 }
    view_customers { "profile" }
    view_products { "profile" }
    view_invoices { "profile" }
    theme { "dark" }
  end
end
