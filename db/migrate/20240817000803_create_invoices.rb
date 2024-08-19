class CreateInvoices < ActiveRecord::Migration[7.1]
  def change
    create_table :invoices do |t|
      t.integer :customer_id
      t.integer :user_id
      t.decimal :total
      t.decimal :balance
      t.decimal :tax

      t.timestamps
    end
  end
end
