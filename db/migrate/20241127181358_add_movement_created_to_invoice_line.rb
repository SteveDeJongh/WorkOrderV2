class AddMovementCreatedToInvoiceLine < ActiveRecord::Migration[7.1]
  def change
    add_column :invoice_lines, :movement_created, :boolean
  end
end
