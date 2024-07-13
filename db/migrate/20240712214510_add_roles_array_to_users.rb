class AddRolesArrayToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :roles, :json, default: [], null: false
    add_check_constraint :users, "JSON_TYPE(roles) = 'array'", name: 'user_roles_is_array'
  end
end
