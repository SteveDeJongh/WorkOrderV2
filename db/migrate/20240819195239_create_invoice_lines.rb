class CreateInvoiceLines < ActiveRecord::Migration[7.1]
  def change
    create_table :invoice_lines do |t|
      t.integer :invoice_id
      t.references :product
      t.integer :discount_percentage
      t.decimal :price
      t.integer :quantiy
      t.decimal :line_total
      t.integer :tax_rate
      t.decimal :line_tax

      t.timestamps
    end
  end
end
