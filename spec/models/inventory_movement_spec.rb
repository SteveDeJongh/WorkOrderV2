require 'rails_helper'

RSpec.describe InventoryMovement, type: :model do
  describe "Creation" do
    it "creates a inventory_movement" do
      movement = build(:inventory_movement)
      expect(movement.valid?).to eq(true)
    end

    it "has a type of either #{InventoryMovement::TYPECHOICES}" do
      movement = build(:inventory_movement)
      expect(InventoryMovement::TYPECHOICES).to include(movement.change_type)
    end

    it "raises an error if the type is incorrect" do
      movement = build(:inventory_movement, change_type: "Blah")
      expect(movement.valid?).to be(false)
    end
  end
end
