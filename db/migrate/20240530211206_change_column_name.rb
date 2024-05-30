class ChangeColumnName < ActiveRecord::Migration[7.1]
  def change
    rename_column :inventory_movements, :adjustment, :inventoryAdjustment
  end
end
