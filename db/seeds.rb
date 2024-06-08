# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

Customer.create(firstName: 'Steve', lastName: 'Maestro', email: 'cust@hotmail.com', phone: "111-111-1111", address:"123 street", postal: "A1B 2C3", country:"Canada", province:"British Columbia", city: 'Vancouver')
Customer.create(firstName: 'John', lastName: 'Roberts', email: 'cust@gmail.com', phone: "222-222-2222", city: 'Montreal')
Customer.create(firstName: 'Bob', lastName: 'Gee', email: 'cust@yahoo.com', phone: "333-333-3333", city: 'Calgary')
Customer.create(firstName: 'Rob', lastName: 'Jones', email: 'cust@google.com', phone: "444-444-4444", city: 'New York')

(1..8).each do |x|
  p = Product.create(name: "Product #{x}" ,description: "This is product #{x}" ,sku: "PR000#{x}" , upc: (x.to_s * 12).to_i, price: (x * 10) , cost: x, stock: x, min: x, max: (x * 10), inventory: true, taxrate: 1,)
  MovementService.new(p).record_movement("ProductCreation", x)
end

productIDs = [1,2,3,4,5,6,7,8]

250.times do |x|
  id = productIDs.sample
  product = Product.find_by(id: id)
  movements = [1 ,-1, 2, -2, 3, -3]
  movement = product.stock >= 3 ? movements.sample : 1
  product.stock = product.stock + movement
  product.save

  MovementService.new(product).record_movement("ProductEdit", movement)
end

puts "4 Customers and 8 Products created, and inventory movements created."
