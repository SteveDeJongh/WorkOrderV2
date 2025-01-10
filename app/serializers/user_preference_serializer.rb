class UserPreferenceSerializer
  include JSONAPI::Serializer
  attributes :theme, :view_customers, :view_products, :view_invoices
end
