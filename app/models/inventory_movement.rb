class InventoryMovement < ApplicationRecord
  belongs_to :product

  validates_presence_of :product
  validates_numericality_of :change, :stock
  validates :change_type, inclusion: {in: %w(Invoice ProductEdit), message: "Change type must be one of Invoice, ProductEdit."}
end
