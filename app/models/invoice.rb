class Invoice < ApplicationRecord
  has_many :invoice_lines
  has_many :payments

  accepts_nested_attributes_for :invoice_lines, :payments
end
