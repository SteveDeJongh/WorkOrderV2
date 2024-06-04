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

ActiveRecord::Schema[7.1].define(version: 2024_05_30_221602) do
  create_table "customers", force: :cascade do |t|
    t.string "firstName"
    t.string "lastName"
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

  create_table "inventory_movements", force: :cascade do |t|
    t.string "relation"
    t.boolean "adjustment"
    t.integer "change"
    t.string "changeType"
    t.integer "userID"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "productID"
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
    t.integer "taxrate"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
