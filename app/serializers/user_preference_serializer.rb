class UserPreferenceSerializer
  include JSONAPI::Serializer
  attributes :user_id, :theme, :view_customers, :view_products, :view_invoices, :created_at, :updated_at, :customer_columns, :product_columns, :invoice_columns
end
