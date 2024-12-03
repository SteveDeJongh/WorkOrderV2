class Product < ApplicationRecord
  has_many :invoice_lines
  has_many :inventory_movements
  belongs_to :tax_rate

  validates :sku, presence: {message: "Product must have a sku."}, uniqueness: {message: "Product must have a unique SKU."}
  validates :cost, presence: {message: "Product must have a cost."}
  validates :price, presence: {message: "Product must have a price."}
  validates :name, presence: {message: "Name can't be blank."}
end
