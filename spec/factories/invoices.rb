FactoryBot.define do
  factory :invoice do
    customer
    sub_total {0}
    tax {0}
    total {0}
    balance {0}
    status {"open"}
  end
end
