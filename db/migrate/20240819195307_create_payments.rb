class CreatePayments < ActiveRecord::Migration[7.1]
  def change
    create_table :payments do |t|
      t.string :method
      t.integer :invoice_id
      t.decimal :amount

      t.timestamps
    end
  end
end
