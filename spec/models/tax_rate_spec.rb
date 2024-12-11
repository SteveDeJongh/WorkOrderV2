require 'rails_helper'

RSpec.describe TaxRate, type: :model do
  describe "creation" do
    it "creates a valid tax_rate" do
      tax_rate = build(:tax_rate)
      expect(tax_rate.valid?).to be(true)
    end

    it "Expect the default tax_rate to be 15%" do
      tax_rate = build(:tax_rate)
      expect(tax_rate.percentage).to be(0.15);
    end
  end
end
