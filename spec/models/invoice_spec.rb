require 'rails_helper'

RSpec.describe Invoice, type: :model do
  describe "Creation" do
    it "Creates an invoice" do
      invoice = build(:invoice)
      expect(invoice.valid?).to be(true)
    end
  end
end
