require 'rails_helper'

RSpec.describe InvoiceLine, type: :model do
  describe "Creation" do
    it "creates a invoice line" do
      line = build(:invoice_line)
      expect(line.valid?).to be(true)
    end

    it "requires a invoice" do
      line = build(:invoice_line, invoice: nil)
      expect(line.valid?).to be(false)
    end
  end
end
