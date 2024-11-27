class Product < ApplicationRecord
  has_many :invoice_lines
  has_many :inventory_movements
  belongs_to :tax_rate
end
