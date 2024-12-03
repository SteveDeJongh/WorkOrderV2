class AddChangeToPayments < ActiveRecord::Migration[7.1]
  def change
    add_column :payments, :change, :decimal
  end
end
