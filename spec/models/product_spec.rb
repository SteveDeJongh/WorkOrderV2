require 'rails_helper'

RSpec.describe Product, type: :model do
  it "has  1 digit UPC" do
    product = create(:product)
    expect(product.upc.to_s.length).to be 12
  end
end
