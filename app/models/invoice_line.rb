class InvoiceLine < ApplicationRecord
  has_one :product
end
