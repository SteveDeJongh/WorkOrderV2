# WorkOrder

### **Under Construction**

A web hosted POS and Workorder tracking app.

## Features

User accounts with permission levels, customer/product/service management, reporting.

## Languages and Libraries

The app runs as a Rails API with a React front end.

- Ruby 3.2.0
- Rails 7.1
- Devise
- JSON API serializer
- JavaScript
- TypeScript
- React
- React Query
- React Hook Form
- HTML/CSS

## Running the app.

Running the App requires Ruby 3.2.0 and Node.JS to be installed on your machine.

Pull down repo.  
Run bundle install from main directory  
Remove master.key and credentials.yml.enc files in config.  
Run `bin/rails credentials:edit`  
Run `npm install`  
Run `rails db:migrate` and `rails db:seed`  
Start the api with `Rails s` in terminal window.

Open 2nd terminal window.  
navigate to client directory  
create a `.env.development` file  
add `VITE_API_URL="http://localhost:3000/api/v1"`  
run `npm install`  
run `npm run dev` to start front end server  
Navgiate to url listed in terminal window.

### User Accounts

admin@test.com
password
