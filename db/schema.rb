# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2025_01_24_231300) do
  create_table "customers", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "phone"
    t.string "address"
    t.string "city"
    t.string "province"
    t.string "country"
    t.string "postal"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "devise_api_tokens", force: :cascade do |t|
    t.string "resource_owner_type", null: false
    t.bigint "resource_owner_id", null: false
    t.string "access_token", null: false
    t.string "refresh_token"
    t.integer "expires_in", null: false
    t.datetime "revoked_at"
    t.string "previous_refresh_token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["access_token"], name: "index_devise_api_tokens_on_access_token"
    t.index ["previous_refresh_token"], name: "index_devise_api_tokens_on_previous_refresh_token"
    t.index ["refresh_token"], name: "index_devise_api_tokens_on_refresh_token"
    t.index ["resource_owner_type", "resource_owner_id"], name: "index_devise_api_tokens_on_resource_owner"
  end

  create_table "inventory_movements", force: :cascade do |t|
    t.string "relation"
    t.boolean "adjustment"
    t.integer "change"
    t.string "change_type"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "product_id"
    t.integer "stock"
  end

  create_table "invoice_lines", force: :cascade do |t|
    t.integer "invoice_id"
    t.integer "product_id"
    t.integer "discount_percentage"
    t.decimal "price"
    t.integer "quantity"
    t.decimal "line_total"
    t.decimal "line_tax"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "movement_created"
    t.index ["product_id"], name: "index_invoice_lines_on_product_id"
  end

  create_table "invoices", force: :cascade do |t|
    t.integer "customer_id"
    t.integer "user_id"
    t.decimal "total"
    t.decimal "balance"
    t.decimal "tax"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "status"
    t.decimal "sub_total"
  end

  create_table "payments", force: :cascade do |t|
    t.string "method"
    t.integer "invoice_id"
    t.decimal "amount"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "change"
  end

  create_table "products", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.string "sku"
    t.integer "upc"
    t.decimal "price", precision: 8, scale: 2
    t.decimal "cost", precision: 8, scale: 2
    t.integer "stock"
    t.integer "min"
    t.integer "max"
    t.boolean "inventory"
    t.integer "tax_rate_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tax_rates", force: :cascade do |t|
    t.float "percentage"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_preferences", force: :cascade do |t|
    t.integer "user_id"
    t.string "view_customers", default: "profile", null: false
    t.string "view_products", default: "profile", null: false
    t.string "view_invoices", default: "profile", null: false
    t.string "theme"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "customer_columns", default: "[{\"id\":\"ID\",\"size\":80},{\"id\":\"Full Name\",\"size\":115},{\"id\":\"First Name\",\"size\":115},{\"id\":\"Last Name\",\"size\":115},{\"id\":\"Phone\",\"size\":110},{\"id\":\"Email\",\"size\":150},{\"id\":\"Address\",\"size\":100},{\"id\":\"City\",\"size\":100},{\"id\":\"Province\",\"size\":150},{\"id\":\"Country\",\"size\":200}]"
    t.string "product_columns", default: "ID, SKU, UPC, Name, Description, Price, TaxRate, Stock, Min, Max"
    t.string "invoice_columns", default: "ID, Customer ID, Status, Total, Tax, Balance, Updated, Created"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "jti", null: false
    t.string "name"
    t.json "roles", default: [], null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["jti"], name: "index_users_on_jti", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.check_constraint "JSON_TYPE(roles) = 'array'", name: "user_roles_is_array"
  end

end
