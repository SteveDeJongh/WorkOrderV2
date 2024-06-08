class MovementService
  def initialize(resource)
    @resource = resource
  end

  def record_movement(type, change)
    InventoryMovement.create(productID: @resource.id, relation: "adj", adjustment: true, change: change, stock: @resource.stock, changeType: type, userID: 1)
  end
end
