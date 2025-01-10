class CreateUserPreferences < ActiveRecord::Migration[7.1]
  def change
    create_table :user_preferences do |t|
      t.integer :user_id
      t.string :view_customers, default: "profile", null: false
      t.string :view_products, default: "profile", null: false
      t.string :view_invoices, default: "profile", null: false
      t.string :theme
      t.timestamps
    end
  end
end
