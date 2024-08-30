class Invoice < ApplicationRecord
  has_many :invoice_lines
  has_many :payments
end
