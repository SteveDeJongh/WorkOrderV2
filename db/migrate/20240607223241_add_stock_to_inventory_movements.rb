class AddStockToInventoryMovements < ActiveRecord::Migration[7.1]
  def change
    add_column :inventory_movements, :stock, :integer
  end
end
