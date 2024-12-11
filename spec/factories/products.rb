FactoryBot.define do
  factory :product do
    sequence(:name) {|x| "Product #{x}"}
    sequence(:description) {|x| "This is product #{x}"}
    sequence(:sku) {|x| "PR000#{x}"}
    sequence(:upc) {|x| x.to_s * 12.to_i}
    sequence(:price) {|x| x * 10 }
    sequence(:cost) {|x| x }
    sequence(:stock) {|x| x }
    sequence(:min) {|x| x }
    sequence(:max) {|x| x * 10}
    inventory { true }
    tax_rate factory: :tax_rate
  end
end

# Rails console, build will instantiate a new object but not save to DB. Create will save to DB. Build will be much faster if the record does not need to presist for the tests.
