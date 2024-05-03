class CreateCustomers < ActiveRecord::Migration[7.1]
  def change
    create_table :customers do |t|
      t.string :firstName
      t.string :lastName
      t.string :email
      t.string :phone
      t.string :address
      t.string :city
      t.string :province
      t.string :country
      t.string :postal

      t.timestamps
    end
  end
end
