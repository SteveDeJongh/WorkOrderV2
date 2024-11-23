class AddSubTotalToInvoices < ActiveRecord::Migration[7.1]
  def change
    add_column :invoices, :sub_total, :decimal
  end
end
