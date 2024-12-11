FactoryBot.define do
  factory :user do
    name {"Admin"}
    email {"admin@test.com"}
    password {"password"}
    roles {["user", "manager", "admin"]}
  end
end

# User.create(name: 'Admin', email: 'admin@test.com', password: "password", roles: ['user', 'manager', 'admin'])
