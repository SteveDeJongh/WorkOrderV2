class AddLayoutsToUserPreferences < ActiveRecord::Migration[7.1]
  def change
    add_column :user_preferences, :customer_columns, :string, default: "ID, Full Name, First Name, Last Name, Phone, Email, Address, City, Province, Country"
    add_column :user_preferences, :product_columns, :string, default: "ID, SKU, UPC, Name, Description, Price, TaxRate, Stock, Min, Max"
    add_column :user_preferences, :invoice_columns, :string, default: "ID, Customer ID, Status, Total, Tax, Balance, Updated, Created"
  end
end
