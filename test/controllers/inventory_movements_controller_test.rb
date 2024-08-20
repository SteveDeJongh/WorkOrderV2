require "test_helper"

class InventoryMovementsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @inventory_movement = inventory_movements(:one)
  end

  test "should get index" do
    get inventory_movements_url, as: :json
    assert_response :success
  end

  test "should create inventory_movement" do
    assert_difference("InventoryMovement.count") do
      post inventory_movements_url, params: { inventory_movement: { adjustment: @inventory_movement.adjustment, change: @inventory_movement.change, relation: @inventory_movement.relation, type: @inventory_movement.type, user_id: @inventory_movement.user_id } }, as: :json
    end

    assert_response :created
  end

  test "should show inventory_movement" do
    get inventory_movement_url(@inventory_movement), as: :json
    assert_response :success
  end

  test "should update inventory_movement" do
    patch inventory_movement_url(@inventory_movement), params: { inventory_movement: { adjustment: @inventory_movement.adjustment, change: @inventory_movement.change, relation: @inventory_movement.relation, type: @inventory_movement.type, user_id: @inventory_movement.user_id } }, as: :json
    assert_response :success
  end

  test "should destroy inventory_movement" do
    assert_difference("InventoryMovement.count", -1) do
      delete inventory_movement_url(@inventory_movement), as: :json
    end

    assert_response :no_content
  end
end
