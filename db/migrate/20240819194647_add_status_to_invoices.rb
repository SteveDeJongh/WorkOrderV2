class AddStatusToInvoices < ActiveRecord::Migration[7.1]
  def change
    add_column :invoices, :status, :string
  end
end
