class AddproductIdToInventoryMovements < ActiveRecord::Migration[7.1]
  def change
    add_column :inventory_movements, :productId, :integer
  end
end
