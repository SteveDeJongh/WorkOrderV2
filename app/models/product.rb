class Product < ApplicationRecord
  has_many :invoice_lines
  belongs_to :tax_rate
end
