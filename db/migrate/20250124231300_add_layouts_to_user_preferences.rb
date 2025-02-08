class AddLayoutsToUserPreferences < ActiveRecord::Migration[7.1]
  def change
    add_column :user_preferences, :customer_columns, :string, default: '[{"id":"ID","size":80},{"id":"Full Name","size":115},{"id":"First Name","size":115},{"id":"Last Name","size":115},{"id":"Phone","size":110},{"id":"Email","size":150},{"id":"Address","size":100},{"id":"City","size":100},{"id":"Province","size":150},{"id":"Country","size":200}]'
    add_column :user_preferences, :product_columns, :string, default: "ID, SKU, UPC, Name, Description, Price, TaxRate, Stock, Min, Max"
    add_column :user_preferences, :invoice_columns, :string, default: "ID, Customer ID, Status, Total, Tax, Balance, Updated, Created"
  end
end
