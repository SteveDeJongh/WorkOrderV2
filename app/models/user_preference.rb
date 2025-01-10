class UserPreference < ApplicationRecord
  VIEWCHOICES = %w(profile table)
  belongs_to :user

  validates :view_customers, inclusion: {in: VIEWCHOICES, message: "View must be either of: #{VIEWCHOICES}"}
  validates :view_products, inclusion: {in: VIEWCHOICES, message: "View must be either of: #{VIEWCHOICES}"}
  validates :view_invoices, inclusion: {in: VIEWCHOICES, message: "View must be either of: #{VIEWCHOICES}"}
  validates :theme, inclusion: {in: %w(dark light), message: "Must have a theme selected"}
end
