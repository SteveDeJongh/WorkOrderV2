class MovementService
  def initialize(resource)
    @resource = resource
  end

  def record_movement(type, change, user)
    InventoryMovement.create(product_id: @resource.id, relation: "adj", adjustment: true, change: change, stock: @resource.stock, change_type: type, user_id: user.id)
  end
end
