FactoryBot.define do
  factory :inventory_movement do
    product
    relation { "adj" }
    adjustment { true }
    change { 1 }
    stock { product.stock }
    change_type { "Invoice" }
  end
end
