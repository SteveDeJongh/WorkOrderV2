require 'rails_helper'

RSpec.describe Product, type: :model do
  it "has  1 digit UPC" do
    product = create(:product)
    expect(product.upc.to_s.length).to be 12
  end

  describe "#create" do
    it "Product creation fails when cost is nil" do
      product = build(:product, cost: nil)
      expect(product.valid?).to be false
    end

    it "Product creation succeeds when cost is given" do
      product = build(:product, cost: 1)
      expect(product.valid?).to be true
    end
  end

  it "Product constant is #{Product::PRODUCT_CONSTANT}" do
    expect(10).to be Product::PRODUCT_CONSTANT
  end
end
