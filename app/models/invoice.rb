class Invoice < ApplicationRecord
  belongs_to :customer, optional: true
  has_many :invoice_lines
  has_many :payments

  accepts_nested_attributes_for :invoice_lines, :payments, allow_destroy: true
  validates_numericality_of :total, :balance, :tax, :sub_total
  validates :status, inclusion: {in: %w(open closed), message: "Status must be either open or closed"}
end
