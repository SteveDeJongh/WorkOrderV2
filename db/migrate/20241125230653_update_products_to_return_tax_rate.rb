class UpdateProductsToReturnTaxRate < ActiveRecord::Migration[7.1]
  def change
    remove_column :invoice_lines, :tax_rate_id
  end
end
