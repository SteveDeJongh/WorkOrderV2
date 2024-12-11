require 'rails_helper'

RSpec.describe Customer, type: :model do
  describe "creation" do
    it "Must have a first name" do
      customer = build(:customer, first_name: nil)
      expect(customer.valid?).to be(false)
    end

    it "Must have a last name" do
      customer = build(:customer, last_name: nil)
      expect(customer.valid?).to be(false)
    end

    it "Must have a first and last name" do
      customer = build(:customer)
      expect(customer.valid?).to be(true)
    end
  end
end
