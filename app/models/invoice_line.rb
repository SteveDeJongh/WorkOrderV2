class InvoiceLine < ApplicationRecord
  belongs_to :invoice
  belongs_to :product

  validates_presence_of :invoice, :product
  validates :quantity, presence: {message: "Invoice line must have a quantity."}
  validates_numericality_of :line_total, :line_tax, :price, :discount_percentage
end
