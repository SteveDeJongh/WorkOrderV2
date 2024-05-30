class ChangeProductIdColumnName < ActiveRecord::Migration[7.1]
  def change
    rename_column :inventory_movements, :productId, :productID

  end
end
