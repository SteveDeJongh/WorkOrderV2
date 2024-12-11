FactoryBot.define do
  factory :customer do
    first_name {"Gerald"}
    last_name {"Undone"}
    email {"gerald@undone.com"}
    phone {"111-111-1111"}
    address {"123 Street"}
    postal {"A1B 2C3"}
    country {"Canada"}
    province {"British Columbia"}
    city { "Vancouver" }
  end
end
