class ChangeQuantiyColumnName < ActiveRecord::Migration[7.1]
  def change
    change_table :invoice_lines do |t|
      t.rename :quantiy, :quantity
    end
  end
end
