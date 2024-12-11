FactoryBot.define do
  factory :payment do
    invoice
    add_attribute(:method) {"Cash"}
    amount { 5.00 }
  end
end
