# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

Customer.create(first_name: 'Steve', last_name: 'Maestro', email: 'cust@hotmail.com', phone: "111-111-1111", address:"123 street", postal: "A1B 2C3", country:"Canada", province:"British Columbia", city: 'Vancouver')
Customer.create(first_name: 'John', last_name: 'Roberts', email: 'cust@gmail.com', phone: "222-222-2222", city: 'Montreal')
Customer.create(first_name: 'Bob', last_name: 'Gee', email: 'cust@yahoo.com', phone: "333-333-3333", city: 'Calgary')
Customer.create(first_name: 'Rob', last_name: 'Jones', email: 'cust@google.com', phone: "444-444-4444", city: 'New York')

User.create(name: 'Admin', email: 'admin@test.com', password: "password", roles: ['user', 'manager', 'admin'])
User.create(name: 'Manager', email: 'manager@test.com', password: "password", roles: ['user', 'manager'])

@user = User.first

# Add a default tax rate for "1" of 15%
TaxRate.new(percentage: 0.15).save

(1..8).each do |x|
  p = Product.create(name: "Product #{x}" ,description: "This is product #{x}" ,sku: "PR000#{x}" , upc: (x.to_s * 12).to_i, price: (x * 10) , cost: x, stock: x, min: x, max: (x * 10), inventory: true, tax_rate_id: 1,)
  MovementService.new(p).record_movement("ProductCreation", x, @user)
end

productIDs = [1,2,3,4,5,6,7,8]

250.times do |x|
  id = productIDs.sample
  product = Product.find_by(id: id)
  movements = [1 ,-1, 2, -2, 3, -3]
  movement = product.stock >= 3 ? movements.sample : 1
  product.stock = product.stock + movement
  product.save

  MovementService.new(product).record_movement("ProductEdit", movement, @user)
end

Invoice.new(customer_id: 1, user_id: 1, sub_total: 10.00, tax: 1.50, total: 11.50, balance: 6.50, status: "open").save
Invoice.new(customer_id: 2, user_id: 1, sub_total: 50.00, tax: 7.50, total: 57.50, balance: 57.50, status: "open").save
Invoice.new(customer_id: 3, user_id: 1, sub_total: 20.00, tax: 3.0, total: 23.00, balance: 2.00, status: "open").save

InvoiceLine.new(invoice_id: 1, product_id: 1, discount_percentage: 0, price: 10.00, quantity: 1, line_total: 10.00, tax_rate_id: 1, line_tax: 1.50).save
InvoiceLine.new(invoice_id: 2, product_id: 2, discount_percentage: 0, price: 20.00, quantity: 1, line_total: 20.00, tax_rate_id: 1, line_tax: 3.00).save
InvoiceLine.new(invoice_id: 2, product_id: 3, discount_percentage: 0, price: 30.00, quantity: 1, line_total: 30.00, tax_rate_id: 1, line_tax: 4.50).save
InvoiceLine.new(invoice_id: 3, product_id: 2, discount_percentage: 0, price: 20.00, quantity: 1, line_total: 20.00, tax_rate_id: 1, line_tax: 3.00).save

Payment.new(method: "Cash", invoice_id: 1, amount: 5.00).save
Payment.new(method: "Cash", invoice_id: 3, amount: 21.00).save


puts "1 admin user, 4 Customers and 8 Products created, and inventory movements created."


# Extras for testing in console.

# Invoice.new(customer_id: 1, user_id: 1, status: "open", invoice_lines_attributes: [{invoice_id: 1, product_id: 1, discount_percentage: 0, price: 10.00, quantity: 1, line_total: 10.00, tax_rate_id: 1, line_tax: 0.50 }]).save
