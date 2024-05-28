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

Product.create(name: "Product 1" ,description: "This is product 1" ,sku: "PR0001" , upc: 111111111111, price: 10.00 , cost: 1.00, stock: 1, min: 1, max: 10, inventory: true, taxrate: 1,)
Product.create(name: "Product 2" ,description: "This is product 2" ,sku: "PR0002" , upc: 222222222222, price: 20.00 , cost: 2.00, stock: 2, min: 2, max: 20, inventory: true, taxrate: 1,)
Product.create(name: "Product 3" ,description: "This is product 3" ,sku: "PR0003" , upc: 333333333333, price: 30.00 , cost: 3.00, stock: 3, min: 3, max: 30, inventory: true, taxrate: 1,)
Product.create(name: "Product 4" ,description: "This is product 4" ,sku: "PR0004" , upc: 444444444444, price: 40.00 , cost: 4.00, stock: 4, min: 4, max: 40, inventory: true, taxrate: 1,)
Product.create(name: "Product 5" ,description: "This is product 5" ,sku: "PR0005" , upc: 555555555555, price: 50.00 , cost: 5.00, stock: 5, min: 5, max: 50, inventory: true, taxrate: 1,)
Product.create(name: "Product 6" ,description: "This is product 6" ,sku: "PR0006" , upc: 6, price: 60.00 , cost: 6.00, stock: 6, min: 6, max: 60, inventory: true, taxrate: 2,)
Product.create(name: "Product 7" ,description: "This is product 7" ,sku: "PR0007" , upc: 777777777777, price: 70.00 , cost: 7.00, stock: 7, min: 7, max: 70, inventory: true, taxrate: 2,)
Product.create(name: "Product 8" ,description: "This is product 8" ,sku: "PR0008" , upc: 888888888888, price: 80.00 , cost: 8.00, stock: 8, min: 8, max: 80, inventory: true, taxrate: 2,)
