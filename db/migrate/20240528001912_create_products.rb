class CreateProducts < ActiveRecord::Migration[7.1]
  def change
    create_table :products do |t|
      t.string :name
      t.string :description
      t.string :sku
      t.integer :upc
      t.decimal :price, precision: 8, scale: 2
      t.decimal :cost, precision: 8, scale: 2
      t.integer :stock
      t.integer :min
      t.integer :max
      t.boolean :inventory
      t.integer :taxrate

      t.timestamps
    end
  end
end
