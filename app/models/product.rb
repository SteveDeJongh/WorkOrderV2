class Product < ApplicationRecord
  has_many :invoice_lines
  has_one :tax_rate
end
