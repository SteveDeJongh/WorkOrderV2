class UpdateColumnNames < ActiveRecord::Migration[7.1]
  def change
    change_table :customers do |t|
      t.rename :firstName, :first_name
      t.rename :lastName, :last_name
    end

    change_table :inventory_movements do |t|
      t.rename :changeType, :change_type
      t.rename :userID, :user_id
      t.rename :productID, :product_id
    end

    change_table :products do |t|
      t.rename :taxrate, :tax_rate
    end
  end
end
