class ChangeColumnName2 < ActiveRecord::Migration[7.1]
  def change
    rename_column :inventory_movements, :inventoryAdjustment, :adjustment
    rename_column :inventory_movements, :type, :changeType
  end
end
