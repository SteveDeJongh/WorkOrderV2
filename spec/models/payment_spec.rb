require 'rails_helper'

RSpec.describe Payment, type: :model do
  describe "Creation" do
    it "gets created" do
      payment = create(:payment)

      expect(%w(Cash Visa Debit Change)).to include(payment.method)
    end

    it "Must have a numeric amount" do
      payment = build(:payment, amount: "abc")
      expect(payment.valid?).to eq(false)
    end
  end
end
