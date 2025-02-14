class AddLayoutsToUserPreferences < ActiveRecord::Migration[7.1]
  def change
    add_column :user_preferences, :customer_columns, :string, default: '[{"id":"ID","size":80,"sequence":1},{"id":"Full Name","size":115,"sequence":2},{"id":"First Name","size":115,"sequence":3},{"id":"Last Name","size":115,"sequence":4},{"id":"Phone","size":110,"sequence":5},{"id":"Email","size":150,"sequence":6},{"id":"Address","size":100,"sequence":7},{"id":"City","size":100,"sequence":8},{"id":"Province","size":150,"sequence":9},{"id":"Country","size":200,"sequence":10}]'
    add_column :user_preferences, :product_columns, :string, default: "ID, SKU, UPC, Name, Description, Price, TaxRate, Stock, Min, Max"
    add_column :user_preferences, :invoice_columns, :string, default: "ID, Customer ID, Status, Total, Tax, Balance, Updated, Created"
  end
end
