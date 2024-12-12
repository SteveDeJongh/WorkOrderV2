require 'rails_helper'

RSpec.describe MovementService, type: :model do
  describe "Initialize" do
    let(:product) { create(:product) }
    let(:user) { create(:user) }

    describe "#record_movement" do
      it "creates a movement when product stock is edited" do
        movement = MovementService.new(product, user).record_movement("ProductEdit", -1, user)
        expect(movement.user_id).to eq(user.id)
        expect(movement.product_id).to eq(product.id)
        expect(movement.stock).to eq(product.stock)
      end
    end

    describe "#record_invoice_line_movement" do
      let(:invoice_line) { create(:invoice_line, product: product)}
      it "Records invoice line movement and updates product stock" do
        oldStock = product.stock
        movement = MovementService.new(product, user).record_invoice_line_movement(invoice_line)

        expect(movement.user_id).to eq(user.id)
        expect(movement.product_id).to eq(product.id)
        expect(product.stock).to eq(oldStock - 1)
      end
    end

    describe "#caclculate stock change" do
      it "correctly caclculates" do
        change = MovementService.new(product, user)
        change = change.send(:calculateNewStockLevel, 10, 5) # Testing private method.
        expect(change).to eq(5);
      end
    end
  end
end
