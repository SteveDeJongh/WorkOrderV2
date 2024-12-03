class Payment < ApplicationRecord
  belongs_to :invoice

  validates :method, inclusion: { in: %w(Cash Visa Debit Change), message: "Payment method must be either : Cash, Visa, Debit, or Change"};
  validates_numericality_of :amount, message: "Amount must be a number."
  validates_presence_of :invoice
end
