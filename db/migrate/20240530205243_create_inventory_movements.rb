class CreateInventoryMovements < ActiveRecord::Migration[7.1]
  def change
    create_table :inventory_movements do |t|
      t.string :relation
      t.boolean :adjustment
      t.integer :change
      t.string :type
      t.integer :userID

      t.timestamps
    end
  end
end
