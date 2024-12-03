class TaxRate < ApplicationRecord
  has_many :products

  validates :percentage, presence: {message: "Precentage required for tax rate."}
end
