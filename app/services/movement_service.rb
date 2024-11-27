class MovementService
  def initialize(product, user = nil)
    @product = product
    @user = user
  end

  def record_movement(type, change, user)
    InventoryMovement.create(product_id: @product.id, relation: "adj", adjustment: true, change: change, stock: @product.stock, change_type: type, user_id: user.id)
  end

  def record_invoice_line_movement(line)
    newStock = calculateNewStockLevel(@product.stock, line.quantity)

    InventoryMovement.create(product_id: @product.id, relation: "Invoice #{line.invoice_id}", adjustment: false, change: -line.quantity, stock: newStock, change_type: "Invoice", user_id: @user.id)

    @product.update(stock: newStock);
  end

  private

  def calculateNewStockLevel(current, change)
    return current - change
  end
end
